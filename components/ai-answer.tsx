"use client";

import { useEffect, useState } from "react";

type Source = { title: string; url: string; group: string };
type State =
  | { status: "idle" | "off" }
  | { status: "loading" }
  | { status: "streaming" | "done"; text: string; sources: Source[] }
  | { status: "error"; message: string };

const SITE = "https://roboticsnorway.org";

function localHref(url: string) {
  return url.startsWith(SITE) ? url.slice(SITE.length) || "/" : url;
}

function renderInline(text: string, keyPrefix: string) {
  const parts: React.ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let index = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1]) {
      const href = localHref(match[2]);
      const external = /^https?:/.test(href);
      parts.push(
        <a
          key={`${keyPrefix}-${index++}`}
          href={href}
          className="text-flag underline-offset-2 hover:underline"
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {match[1]}
        </a>,
      );
    } else {
      parts.push(<strong key={`${keyPrefix}-${index++}`}>{match[3]}</strong>);
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function AnswerText({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <div className="space-y-3 text-sm leading-6 text-ink">
      {blocks.map((block, b) => {
        const lines = block.split("\n").filter(Boolean);
        if (lines.length > 0 && lines.every((line) => /^\s*([-*•]|\d+\.)\s+/.test(line))) {
          return (
            <ul key={b} className="list-disc space-y-1 pl-5">
              {lines.map((line, l) => (
                <li key={l}>{renderInline(line.replace(/^\s*([-*•]|\d+\.)\s+/, ""), `${b}-${l}`)}</li>
              ))}
            </ul>
          );
        }
        return <p key={b}>{renderInline(lines.join(" "), String(b))}</p>;
      })}
    </div>
  );
}

export function AiAnswer({ query }: { query: string }) {
  const [state, setState] = useState<State>({ status: "idle" });

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();
    (async () => {
      setState({ status: "loading" });
      try {
        const response = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: query.slice(0, 300) }),
          signal: controller.signal,
        });
        if (response.status === 503 || response.status === 404) {
          setState({ status: "off" });
          return;
        }
        if (!response.ok || !response.body) {
          const body = await response.json().catch(() => null);
          setState({ status: "error", message: body?.error ?? "The AI answer is not available right now." });
          return;
        }
        let sources: Source[] = [];
        try {
          sources = JSON.parse(decodeURIComponent(response.headers.get("X-AI-Sources") ?? "[]"));
        } catch {}
        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
        let text = "";
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          text += value;
          setState({ status: "streaming", text, sources });
        }
        if (!text.trim()) {
          setState({ status: "error", message: "The AI answer is not available right now." });
          return;
        }
        setState({ status: "done", text, sources });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setState({ status: "error", message: "The AI answer is not available right now." });
        }
      }
    })();
    return () => controller.abort();
  }, [query]);

  if (!query || state.status === "idle" || state.status === "off") return null;
  const answer = state.status === "streaming" || state.status === "done" ? state : null;

  return (
    <section aria-labelledby="ai-answer" aria-live="polite" className="mt-8 max-w-3xl border border-border bg-paper p-5">
      <h2 id="ai-answer" className="font-heading text-lg text-navy">
        AI answer
      </h2>
      <div className="mt-3">
        {state.status === "loading" ? (
          <p className="text-sm text-muted-foreground">Thinking…</p>
        ) : state.status === "error" ? (
          <p className="text-sm text-muted-foreground">{state.message}</p>
        ) : answer ? (
          <>
            <AnswerText text={answer.text} />
            {answer.status === "done" && answer.sources.length > 0 ? (
              <div className="mt-4">
                <p className="font-heading text-xs tracking-wide text-muted-foreground uppercase">Sources</p>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {answer.sources.map((source) => (
                    <li key={source.url}>
                      <a href={localHref(source.url)} className="text-navy hover:underline">
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">AI-generated answer based on roboticsnorway.org. It can be wrong.</p>
    </section>
  );
}
