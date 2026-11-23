import MiniSearch from "minisearch";
import type { SearchDocument, SearchGroup } from "@/lib/types";

const GROUP_ORDER: SearchGroup[] = ["Charter", "News", "Documents", "Members", "Partners"];

const STOPWORDS = new Set([
  "a",
  "about",
  "after",
  "all",
  "also",
  "am",
  "an",
  "and",
  "another",
  "any",
  "are",
  "as",
  "at",
  "av",
  "be",
  "been",
  "before",
  "being",
  "between",
  "but",
  "by",
  "can",
  "could",
  "de",
  "den",
  "det",
  "did",
  "do",
  "does",
  "doing",
  "done",
  "during",
  "ei",
  "en",
  "er",
  "et",
  "for",
  "fra",
  "from",
  "had",
  "has",
  "have",
  "having",
  "here",
  "how",
  "hva",
  "hvem",
  "hvilke",
  "hvilken",
  "hvor",
  "i",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "jeg",
  "just",
  "may",
  "me",
  "med",
  "might",
  "more",
  "most",
  "must",
  "my",
  "no",
  "not",
  "når",
  "of",
  "og",
  "om",
  "on",
  "only",
  "or",
  "eller",
  "other",
  "our",
  "over",
  "på",
  "shall",
  "should",
  "so",
  "some",
  "som",
  "such",
  "than",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "til",
  "to",
  "too",
  "us",
  "very",
  "vi",
  "was",
  "we",
  "were",
  "what",
  "when",
  "where",
  "which",
  "who",
  "whom",
  "whose",
  "why",
  "will",
  "with",
  "within",
  "without",
  "would",
  "yes",
  "you",
  "your",
]);

const GROUP_TERMS: Record<string, SearchGroup> = {
  article: "News",
  articles: "News",
  charter: "Charter",
  document: "Documents",
  documents: "Documents",
  member: "Members",
  members: "Members",
  news: "News",
  partner: "Partners",
  partners: "Partners",
};

const MIN_TERM_LENGTH = 3;
const SHORT_KEEP = new Set(["ai", "eu"]);

function isUsableTerm(term: string) {
  const lower = term.toLowerCase();
  return lower.length >= MIN_TERM_LENGTH || SHORT_KEEP.has(lower) || SHORT_KEEP.has(foldTerm(lower));
}

export function foldTerm(term: string) {
  return term
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function tokenizeText(text: string) {
  const parts = text.split(/[^\p{L}\p{N}@._+-]+/u).filter(Boolean);
  const tokens: string[] = [];
  for (const part of parts) {
    tokens.push(part);
    if (/[@._+-]/.test(part)) {
      for (const piece of part.split(/[^\p{L}\p{N}]+/u).filter(Boolean)) {
        tokens.push(piece);
      }
    }
  }
  return tokens;
}

function processTerm(term: string) {
  const lower = term.toLowerCase();
  if (!isUsableTerm(lower)) return null;
  const folded = foldTerm(lower);
  return folded !== lower ? [lower, folded] : lower;
}

export type ParsedQuery = {
  terms: string[];
  groupBoost: SearchGroup | null;
};

export function parseQuery(query: string): ParsedQuery {
  const terms: string[] = [];
  const groups = new Set<SearchGroup>();
  for (const raw of tokenizeText(query)) {
    const lower = raw.toLowerCase();
    if (!isUsableTerm(lower)) continue;
    if (STOPWORDS.has(lower) || STOPWORDS.has(foldTerm(lower))) continue;
    const group = GROUP_TERMS[lower] ?? GROUP_TERMS[foldTerm(lower)];
    if (group) {
      groups.add(group);
      continue;
    }
    if (!terms.includes(lower)) terms.push(lower);
  }
  return { terms, groupBoost: groups.size === 1 ? [...groups][0] : null };
}

const searchOptions = {
  boost: { title: 3, location: 4, meta: 1.6 },
  prefix: (term: string) => term.length >= 3,
  fuzzy: (term: string) => (term.length >= 5 ? 0.2 : false),
  weights: { fuzzy: 0.2, prefix: 0.5 },
  combineWith: "OR" as const,
};

export function createSearchIndex(documents: SearchDocument[]) {
  const index = new MiniSearch<SearchDocument>({
    idField: "id",
    fields: ["title", "text", "meta", "location"],
    storeFields: ["title", "text", "group", "href", "meta", "location"],
    tokenize: tokenizeText,
    processTerm,
    searchOptions,
  });
  index.addAll(documents);
  return index;
}

export type SearchHit = SearchDocument & { score: number; snippet: string };

function fieldTokens(value: string | undefined) {
  return tokenizeText(value ?? "").map((token) => token.toLowerCase());
}

function termMatch(tokens: string[], term: string): "exact" | "prefix" | null {
  const folded = foldTerm(term);
  let prefix: "prefix" | null = null;
  for (const token of tokens) {
    const foldedToken = foldTerm(token);
    if (token === term || foldedToken === folded) return "exact";
    if (term.length >= 3 && (token.startsWith(term) || foldedToken.startsWith(folded))) {
      prefix = "prefix";
    }
  }
  return prefix;
}

function documentTokens(document: SearchDocument) {
  return {
    title: fieldTokens(document.title),
    location: fieldTokens(document.location),
    meta: fieldTokens(document.meta),
    text: fieldTokens(document.text),
  };
}

function rankScore(document: SearchDocument, terms: string[], groupBoost: SearchGroup | null, base: number) {
  if (terms.length === 0) {
    return groupBoost && document.group === groupBoost ? 1 : 0;
  }
  const tokens = documentTokens(document);
  let matched = 0;
  let weight = 0;
  for (const term of terms) {
    const title = termMatch(tokens.title, term);
    const location = termMatch(tokens.location, term);
    const meta = termMatch(tokens.meta, term);
    const text = termMatch(tokens.text, term);
    const best = title ?? location ?? meta ?? text;
    if (!best) continue;
    matched += 1;
    if (title === "exact") weight += 8;
    else if (location === "exact") weight += 7;
    else if (title === "prefix") weight += 5;
    else if (location === "prefix") weight += 4.5;
    else if (meta === "exact" || text === "exact") weight += 3;
    else weight += 1.5;
  }
  if (matched === 0) return 0;
  const coverage = matched / terms.length;
  let score = (base + weight) * (1 + matched * 4) * (0.15 + coverage);
  if (groupBoost && document.group === groupBoost) score *= 6;
  return score;
}

export function searchDocuments(documents: SearchDocument[], query: string) {
  const trimmed = query.trim();
  if (!trimmed) return [] as SearchHit[];
  const { terms, groupBoost } = parseQuery(trimmed);
  if (terms.length === 0 && !groupBoost) return [] as SearchHit[];

  if (terms.length === 0 && groupBoost) {
    return documents
      .filter((document) => document.group === groupBoost)
      .map((document) => ({
        ...document,
        score: 1,
        snippet: snippet(document.text, trimmed),
      }));
  }

  const index = createSearchIndex(documents);
  const hits = new Map<string, SearchHit>();
  for (const result of index.search(terms.join(" "))) {
    const document = documents.find((item) => item.id === result.id);
    const stored = document ?? {
      id: String(result.id),
      group: result.group as SearchGroup,
      title: String(result.title ?? ""),
      text: String(result.text ?? ""),
      href: String(result.href ?? ""),
      meta: String(result.meta ?? ""),
      location: String(result.location ?? ""),
    };
    const score = rankScore(stored, terms, groupBoost, result.score);
    if (score <= 0) continue;
    hits.set(stored.id, {
      ...stored,
      score,
      snippet: snippet(stored.text, trimmed),
    });
  }

  // MiniSearch may miss a city-only document if a term was folded only on one side;
  // also guarantee whole-word/prefix coverage even when BM25 returns nothing.
  for (const document of documents) {
    if (hits.has(document.id)) continue;
    const score = rankScore(document, terms, groupBoost, 0);
    if (score <= 0) continue;
    hits.set(document.id, {
      ...document,
      score,
      snippet: snippet(document.text, trimmed),
    });
  }

  return [...hits.values()].sort((a, b) => b.score - a.score);
}

export function groupHits(hits: SearchHit[]) {
  return GROUP_ORDER.map((group) => ({
    group,
    hits: hits.filter((hit) => hit.group === group),
  }))
    .filter((group) => group.hits.length > 0)
    .sort((a, b) => (b.hits[0]?.score ?? 0) - (a.hits[0]?.score ?? 0));
}

export function significantTerms(query: string) {
  const { terms } = parseQuery(query);
  if (terms.length > 0) return terms;
  return tokenizeText(query)
    .map((term) => term.toLowerCase())
    .filter((term) => term.length > 1 && !STOPWORDS.has(term));
}

export function snippet(text: string, query: string, radius = 110) {
  const clean = text.replace(/\s+/g, " ").trim();
  const terms = significantTerms(query);
  const lower = clean.toLowerCase();
  const folded = foldTerm(lower);
  let index = -1;
  for (const term of terms) {
    const foldedTerm = foldTerm(term);
    index = lower.indexOf(term);
    if (index < 0) index = folded.indexOf(foldedTerm);
    if (index >= 0) break;
  }
  if (index < 0) {
    return clean.length > radius * 2 ? `${clean.slice(0, radius * 2)}…` : clean;
  }
  const start = Math.max(0, index - radius);
  const end = Math.min(clean.length, index + radius);
  return `${start > 0 ? "…" : ""}${clean.slice(start, end)}${end < clean.length ? "…" : ""}`;
}

export function webSearchHref(query: string) {
  const q = `${query.trim()} robotics Norway`.replace(/\s+/g, " ");
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}

export function highlightTerms(text: string, query: string) {
  const terms = significantTerms(query).sort((a, b) => b.length - a.length);
  if (terms.length === 0) return [{ text, match: false }];
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "ig");
  return text.split(pattern).filter(Boolean).map((part) => ({
    text: part,
    match: terms.some((term) => part.toLowerCase() === term.toLowerCase() || foldTerm(part) === foldTerm(term)),
  }));
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
