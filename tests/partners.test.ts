import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { partners } from "../content/partners";

const personalEmails = [
  "erkka@roboticsnation.org",
  "er@necia.no",
  "vidar@robotcluster.no",
  "rtf@odenserobotics.dk",
  "uch@odenserobotics.dk",
  "thijs@nlrobotics.nl",
];

test("partners lists the five agreed networks with public organisation contacts only", () => {
  assert.deepEqual(
    partners.map((partner) => partner.slug),
    ["robotics-nation", "odense-robotics", "norwegian-robotics-cluster", "necia", "nlrobotics"],
  );

  for (const partner of partners) {
    assert.ok(partner.name.length > 0);
    assert.ok(partner.country.length > 0);
    assert.ok(partner.website.startsWith("https://"));
    assert.ok(partner.description.split(/[.!?]/).filter((part) => part.trim().length > 0).length >= 2);
    assert.ok(partner.descriptionSource.includes("http"));
    assert.ok(partner.logoUrl.startsWith("/partners/"));
    const file = path.join(process.cwd(), "public", partner.logoUrl.replace(/^\//, ""));
    assert.ok(existsSync(file), `Missing logo file for ${partner.name}: ${file}`);

    if (partner.contactEmail) {
      assert.ok(
        /^(info|post|contact)@/i.test(partner.contactEmail),
        `${partner.name} should use a general organisation email, got ${partner.contactEmail}`,
      );
      assert.ok(!personalEmails.includes(partner.contactEmail.toLowerCase()));
    }
  }

  const emails = partners.map((partner) => partner.contactEmail).filter(Boolean);
  for (const email of personalEmails) {
    assert.ok(!emails.includes(email));
  }

  const roboticsNation = partners.find((partner) => partner.slug === "robotics-nation");
  assert.equal(roboticsNation?.contactEmail, null);
  assert.equal(roboticsNation?.contactUrl, null);

  const necia = partners.find((partner) => partner.slug === "necia");
  assert.equal(necia?.contactEmail, null);
  assert.equal(necia?.contactUrl, "https://www.mnu-as.no/necia/contact");

  const odense = partners.find((partner) => partner.slug === "odense-robotics");
  assert.equal(odense?.contactEmail, "info@odenserobotics.dk");

  const cluster = partners.find((partner) => partner.slug === "norwegian-robotics-cluster");
  assert.equal(cluster?.contactEmail, "post@robotcluster.no");

  const nl = partners.find((partner) => partner.slug === "nlrobotics");
  assert.equal(nl?.contactEmail, "contact@nlrobotics.nl");
});
