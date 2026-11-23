import { anthropic } from "@ai-sdk/anthropic";
import corpus from "@/data/search-corpus.json";
import { createAskHandler, DEFAULT_ANTHROPIC_MODEL } from "@/lib/ask";
import type { SearchCorpus } from "@/lib/types";

export const maxDuration = 30;

const data = corpus as SearchCorpus;

export const POST = createAskHandler({
  documents: data.searchDocuments,
  getModel: () => anthropic(process.env.ANTHROPIC_MODEL || DEFAULT_ANTHROPIC_MODEL),
});
