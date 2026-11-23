import assert from "node:assert/strict";
import test from "node:test";
import { simulateReadableStream } from "ai";
import { MockLanguageModelV4 } from "ai/test";
import corpus from "../data/search-corpus.json";
import {
  buildUserPrompt,
  createAskHandler,
  isAiSearchEnabled,
  MAX_OUTPUT_TOKENS,
  normalizeQuestion,
  RateLimiter,
  redactPrivate,
  retrieveContext,
  SYSTEM_PROMPT,
} from "../lib/ask";
import type { SearchCorpus } from "../lib/types";

const data = corpus as SearchCorpus;

function mockModel(text: string, calls: unknown[] = []) {
  return new MockLanguageModelV4({
    doStream: async (options) => {
      calls.push(options);
      return {
        stream: simulateReadableStream({
          chunks: [
            { type: "text-start", id: "t" },
            { type: "text-delta", id: "t", delta: text },
            { type: "text-end", id: "t" },
            {
              type: "finish",
              finishReason: { unified: "stop", raw: undefined },
              logprobs: undefined,
              usage: {
                inputTokens: { total: 10, noCache: 10, cacheRead: undefined, cacheWrite: undefined },
                outputTokens: { total: 5, text: 5, reasoning: undefined },
              },
            },
          ],
        }),
      };
    },
  });
}

function ask(question: unknown, ip = "1.2.3.4") {
  return new Request("https://roboticsnorway.org/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify({ question }),
  });
}

test("retrieval sends the Trondheim members as context", () => {
  const context = retrieveContext(data.searchDocuments, "who are the members in trondheim?");
  assert.ok(context.length > 0 && context.length <= 8);
  const top = context.slice(0, 3).map((doc) => doc.title);
  for (const name of ["Handprint", "PPM Robotics", "Saro Robotics"]) {
    assert.ok(top.some((title) => title.includes(name)), `${name} in top 3: ${top.join(", ")}`);
  }
  assert.ok(context.every((doc) => doc.url.startsWith("https://roboticsnorway.org")));
  assert.ok(context.every((doc) => doc.text.length <= 901));
});

test("prompt builder numbers documents, includes URLs and the question", () => {
  const prompt = buildUserPrompt("Who?", [
    { title: "A", url: "https://roboticsnorway.org/a", group: "News", text: "Alpha" },
    { title: "B", url: "https://roboticsnorway.org/b", group: "Members", text: "Beta" },
  ]);
  assert.match(prompt, /\[1\] A \(News\)\nURL: https:\/\/roboticsnorway.org\/a\nAlpha/);
  assert.match(prompt, /\[2\] B \(Members\)/);
  assert.match(prompt, /Question: Who\?$/);
  assert.match(buildUserPrompt("x", []), /no matching documents/);
  assert.match(SYSTEM_PROMPT, /ONLY from the numbered context/);
  assert.match(SYSTEM_PROMPT, /Never reveal personal contact details/);
});

test("private contact details are redacted, generic mailboxes kept", () => {
  const out = redactPrivate("Mail hello@3lc.ai or ola.nordmann@firma.no, call +47 938 345 627.");
  assert.match(out, /hello@3lc\.ai/);
  assert.doesNotMatch(out, /ola\.nordmann/);
  assert.doesNotMatch(out, /938/);
  for (const doc of retrieveContext(data.searchDocuments, "kinetic blocks")) {
    assert.doesNotMatch(doc.text, /938 345 627/);
  }
});

test("question validation and kill switch", () => {
  assert.equal(normalizeQuestion("  hi  there ").ok, true);
  assert.equal(normalizeQuestion("").ok, false);
  assert.equal(normalizeQuestion(42).ok, false);
  assert.equal(normalizeQuestion("x".repeat(301)).ok, false);
  assert.equal(isAiSearchEnabled({ AI_SEARCH_ENABLED: "true", ANTHROPIC_API_KEY: "k" }), true);
  assert.equal(isAiSearchEnabled({ AI_SEARCH_ENABLED: "false", ANTHROPIC_API_KEY: "k" }), false);
  assert.equal(isAiSearchEnabled({ AI_SEARCH_ENABLED: "true" }), false);
});

test("rate limiter allows 10 per window per key", () => {
  const limiter = new RateLimiter(10, 1000);
  for (let i = 0; i < 10; i += 1) assert.equal(limiter.take("a", 0).ok, true);
  assert.equal(limiter.take("a", 0).ok, false);
  assert.equal(limiter.take("b", 0).ok, true);
  assert.equal(limiter.take("a", 1000).ok, true);
});

test("handler streams the mocked answer with sources and token cap", async () => {
  const calls: { maxOutputTokens?: number; prompt?: unknown }[] = [];
  const POST = createAskHandler({
    documents: data.searchDocuments,
    getModel: () => mockModel("Handprint, PPM Robotics and Saro Robotics.", calls),
    enabled: () => true,
  });
  const response = await POST(ask("who are the members in trondheim?"));
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "Handprint, PPM Robotics and Saro Robotics.");
  const sources = JSON.parse(decodeURIComponent(response.headers.get("X-AI-Sources") ?? "[]"));
  assert.ok(sources.some((source: { title: string }) => source.title.includes("Handprint")));
  assert.equal(calls[0].maxOutputTokens, MAX_OUTPUT_TOKENS);
  assert.match(JSON.stringify(calls[0].prompt), /Question: who are the members in trondheim\?/);
});

test("handler rejects when off, bad input and over the rate limit", async () => {
  const off = createAskHandler({ documents: data.searchDocuments, getModel: () => mockModel("x"), enabled: () => false });
  assert.equal((await off(ask("hello"))).status, 503);

  const POST = createAskHandler({
    documents: data.searchDocuments,
    getModel: () => mockModel("ok"),
    enabled: () => true,
    perIp: new RateLimiter(2, 60_000),
  });
  assert.equal((await POST(ask("x".repeat(301)))).status, 400);
  assert.equal((await POST(ask("robots", "9.9.9.9"))).status, 200);
  assert.equal((await POST(ask("robots", "9.9.9.9"))).status, 200);
  const limited = await POST(ask("robots", "9.9.9.9"));
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get("Retry-After")) > 0);
});
