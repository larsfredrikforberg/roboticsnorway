import assert from "node:assert/strict";
import test from "node:test";
import corpus from "../data/search-corpus.json";
import { charter } from "../content/charter";
import { articlesByDate, compareArticles, getArticle } from "../content/news";
import { groupHits, searchDocuments } from "../lib/search";
import type { SearchCorpus } from "../lib/types";

const data = corpus as SearchCorpus;

test("search corpus matches the public charter", () => {
  assert.equal(data.charter.intro, charter.intro);
  assert.equal(data.charter.points.length, 6);
});

test("search finds charter, documents and members", () => {
  const confidential = searchDocuments(data.searchDocuments, "confidential");
  assert.ok(confidential.some((hit) => hit.group === "Charter" && hit.title === "Trust between members"));

  const charterDoc = searchDocuments(data.searchDocuments, "Membership is free");
  assert.ok(charterDoc.some((hit) => hit.href === "/documents/charter"));

  const english = searchDocuments(data.searchDocuments, "de minimis");
  assert.ok(english.some((hit) => hit.group === "Documents"));

  const saro = searchDocuments(data.searchDocuments, "Saro Robotics");
  assert.equal(saro[0]?.title, "Saro Robotics");
  assert.equal(saro[0]?.group, "Members");
  assert.equal(groupHits(saro)[0]?.group, "Members");
});

test("news sorts newest first and breaks date ties by order", () => {
  const sorted = [
    { date: "2026-11-05", order: 1 },
    { date: "2026-11-05", order: 3 },
    { date: "2026-11-06", order: 0 },
    { date: "2026-10-01", order: 9 },
  ].sort(compareArticles);
  assert.deepEqual(
    sorted.map((article) => `${article.date}:${article.order}`),
    ["2026-11-06:0", "2026-11-05:3", "2026-11-05:1", "2026-10-01:9"],
  );
});

test("humanoids at work is featured ahead of the founding article", () => {
  const sorted = articlesByDate().filter((article) => article.date === "2026-11-05");
  assert.equal(sorted[0]?.slug, "humanoids-at-work");
  assert.equal(sorted[1]?.slug, "robotics-norway-is-founded");
  assert.ok((sorted[0]?.order ?? 0) > (sorted[1]?.order ?? 0));
});

test("search finds the founding news article", () => {
  const article = getArticle("robotics-norway-is-founded");
  assert.ok(article);
  const text = article.blocks
    .flatMap((block) => {
      if (block.type === "paragraph") return [block.runs.map((run) => run.text).join("")];
      if (block.type === "heading") return [block.text];
      return [];
    })
    .join("\n");
  assert.match(text, /Five hundred robot labs\. The charter calls for labs/);
  assert.match(text, /What the meeting agreed/);
  assert.match(text, /Around 30 companies and organisations took part/);
  const agreed = text.indexOf("What the meeting agreed");
  const minutesLink = text.indexOf("full minutes of the founding meeting");
  const taken = text.indexOf("Taken together, the points describe");
  const agenda = text.indexOf("The agenda of the founding meeting covered");
  assert.ok(taken < agreed && agreed < minutesLink && minutesLink < agenda);

  const minutes = data.documents.find((document) => document.slug === "founding-meeting-minutes");
  assert.ok(minutes);
  assert.equal(
    minutes.link,
    "https://docs.google.com/document/d/1-pAQCUOvl1dilJpSmy71cnD_6kyUWEN35i8tzrYDHSk/edit",
  );
  assert.match(minutes.summary ?? "", /steering group and next steps/);
  assert.ok(minutes.text.length < 400);

  const hits = searchDocuments(data.searchDocuments, "founding meeting StartupLab");
  const news = hits.find((hit) => hit.href === "/news/robotics-norway-is-founded");
  assert.ok(news);
  assert.equal(news.group, "News");
  assert.equal(news.title, "Robotics Norway is founded");
  assert.equal(groupHits([news])[0]?.group, "News");
});

test("Lito is newest, then Sonair, then Demo Day, Odense, Endwell and Norway at Slush, and the steering group article has no photos", () => {
  const newest = articlesByDate()[0];
  assert.equal(newest?.slug, "lito-touch-data-for-robots");
  assert.equal(newest?.date, "2026-11-24");
  assert.ok(newest?.hero);
  const sameDay24 = articlesByDate().filter((article) => article.date === "2026-11-24");
  assert.deepEqual(
    sameDay24.map((article) => article.slug),
    ["lito-touch-data-for-robots", "teaching-robots-to-listen"],
  );
  const sameDay = articlesByDate().filter((article) => article.date === "2026-11-23");
  assert.deepEqual(
    sameDay.map((article) => article.slug),
    [
      "runway-fbu-lab-demo-day",
      "odense-robotics-gateway",
      "endwell-robotics-norway-workspace",
      "norway-on-stage-at-slush",
    ],
  );
  const morning = getArticle("industrial-renaissance-summit-slush");
  assert.ok(morning?.video);
  const steering = getArticle("steering-group-meeting-12-november-2026");
  assert.equal(steering?.hero, undefined);
});

test("the public member search corpus has no personal contacts and no Innovation Norway card", () => {
  const members = data.searchDocuments.filter((document) => document.group === "Members");
  assert.equal(
    members.some((document) => document.title === "Innovation Norway"),
    false,
  );
  assert.ok(members.some((document) => document.title === "Norwegian Robotics Cluster"));
  const blob = members.map((document) => `${document.meta}\n${document.text}`).join("\n");
  for (const email of [
    "ingeborg@sarorobotics.com",
    "lars.fredrik@kineticblocks.com",
    "laksiyab@gmail.com",
    "kristoffer.gjerde@cognite.com",
    "geir.haugum@innovationnorway.no",
    "vidar@robotcluster.no",
    "crokseth@gmail.com",
    "stian@o-id.net",
  ]) {
    assert.equal(blob.toLowerCase().includes(email.toLowerCase()), false, email);
  }
  const saro = members.find((document) => document.title === "Saro Robotics");
  assert.ok(saro);
  assert.match(saro.meta, /contact@sarorobotics.com/);
});

test("search finds partner networks", () => {
  const hits = searchDocuments(data.searchDocuments, "Robotics Nation Finland");
  const partner = hits.find((hit) => hit.href === "/partners#robotics-nation");
  assert.ok(partner);
  assert.equal(partner?.group, "Partners");
  assert.equal(partner?.title, "Robotics Nation");

  const odense = searchDocuments(data.searchDocuments, "info@odenserobotics.dk");
  assert.ok(odense.some((hit) => hit.href === "/partners#odense-robotics" && hit.group === "Partners"));
});

const TRONDHEIM_MEMBERS = ["Saro Robotics", "PPM Robotics", "Handprint"];

test("natural questions find members by city instead of letter fragments", () => {
  const question = searchDocuments(data.searchDocuments, "who are the members in trondheim?");
  const questionTop = question.slice(0, 3);
  assert.equal(questionTop.length, 3);
  assert.deepEqual(
    questionTop.map((hit) => hit.title).sort(),
    [...TRONDHEIM_MEMBERS].sort(),
  );
  assert.ok(questionTop.every((hit) => hit.group === "Members"));

  const city = searchDocuments(data.searchDocuments, "trondheim");
  const cityTop = city.slice(0, 3).map((hit) => hit.title);
  for (const name of TRONDHEIM_MEMBERS) {
    assert.ok(cityTop.includes(name), `expected ${name} among top results for "trondheim", got ${cityTop.join(", ")}`);
  }

  const oslo = searchDocuments(data.searchDocuments, "robots in oslo");
  assert.ok(oslo.length > 0);
  assert.ok(
    oslo.some((hit) => hit.group === "Members" && /oslo/i.test(`${hit.title} ${hit.meta} ${hit.text}`)),
    "expected an Oslo member among results for robots in Oslo",
  );
  const firstOslo = `${oslo[0].title} ${oslo[0].meta} ${oslo[0].text}`;
  assert.match(firstOslo, /oslo/i);

  const news = searchDocuments(data.searchDocuments, "founding meeting StartupLab");
  const founding = news.find((hit) => hit.href === "/news/robotics-norway-is-founded");
  assert.ok(founding);
  assert.equal(founding.group, "News");
  assert.equal(founding.title, "Robotics Norway is founded");

  assert.deepEqual(searchDocuments(data.searchDocuments, "a"), []);
  assert.deepEqual(searchDocuments(data.searchDocuments, "w"), []);
  assert.deepEqual(searchDocuments(data.searchDocuments, "?"), []);
});

test("member organisations are indexed by city, including Norwegian letters", () => {
  const saro = data.searchDocuments.find((document) => document.title === "Saro Robotics");
  assert.ok(saro);
  assert.match(`${saro.meta} ${saro.text}`, /Trondheim/);

  const oid = data.searchDocuments.find((document) => document.title === "O-ID");
  assert.ok(oid);
  assert.match(`${oid.meta} ${oid.text}`, /Tokyo/);

  const kameleon = searchDocuments(data.searchDocuments, "åros");
  assert.ok(kameleon.some((hit) => hit.title === "Kameleon Robotics" && hit.group === "Members"));
  const ascii = searchDocuments(data.searchDocuments, "aros");
  assert.ok(ascii.some((hit) => hit.title === "Kameleon Robotics" && hit.group === "Members"));
});
