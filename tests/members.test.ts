import assert from "node:assert/strict";
import test from "node:test";
import { excludedMembers, internalMembers, missingDescription, publicMembers } from "../lib/members";

test("public members are the founding organisations that were present", () => {
  const names = publicMembers().map((member) => member.companyName);
  assert.deepEqual(names, [
    "3LC",
    "AI Mad Lab",
    "Alex Moltzau",
    "Autonomous Retail Norway AS",
    "bluZenit",
    "Dotspot",
    "Endwell",
    "Framdrift Innovasjon AS",
    "Handprint",
    "Hive Autonomy",
    "Humanoid.guide",
    "Kameleon Robotics",
    "Kinetic Blocks AS",
    "Kristoffer Gjerde",
    "Laksiya Balasubramaniam",
    "Lito",
    "Marselia Robotics",
    "Mechatronics Innovation Lab",
    "Necia",
    "Norwegian Robotics Cluster",
    "O-ID",
    "OEM Automatic",
    "Oslo kommune, Sykehjemsetaten",
    "Physical Robotics",
    "Posten Bring",
    "PPM Robotics",
    "Proptonomy AS",
    "Rembrain AS",
    "ROBOXI",
    "Runway FBU",
    "Ruter AS",
    "Saro Robotics",
    "Sonair",
    "Startuplab",
    "Takt Logistikk",
    "Wybe Robotics",
  ]);
  assert.equal(names.includes("Innovation Norway"), false);
  assert.ok(names.includes("Norwegian Robotics Cluster"));
});

test("uncertain, declined, private and unknown entries are excluded", () => {
  const reasons = Object.fromEntries(
    excludedMembers().map((entry) => [entry.companyName, entry.reason]),
  );
  assert.equal(reasons["Fisker Robotics"], "Flagged uncertain.");
  assert.equal(reasons.Cognite, "Declined membership.");
  assert.equal(reasons["Laksiya Balasubramaniam"], undefined);
  assert.match(reasons["(unknown organisation)"], /unknown/i);
  assert.equal(Object.keys(reasons).length, 3);
  assert.equal(reasons["Innovation Norway"], undefined);
});

test("published websites and unconfirmed logos", () => {
  const byName = Object.fromEntries(publicMembers().map((member) => [member.companyName, member]));
  assert.equal(byName["Marselia Robotics"].website, "https://marseliarobotics.com");
  assert.equal(byName.Sonair.logoUrl, null);
  assert.equal(byName["Physical Robotics"].contactEmail, null);
  assert.equal(byName["Physical Robotics"].contactUrl, "https://www.physicalrobotics.com/contact");
  assert.equal(byName.Dotspot.description, missingDescription);
  assert.equal(byName.Dotspot.website, "https://dotspot.ai");
  assert.equal(byName["Oslo kommune, Sykehjemsetaten"].website, "https://www.oslo.kommune.no/");
  assert.equal(byName["Saro Robotics"].contactEmail, "contact@sarorobotics.com");
  assert.equal(byName["Saro Robotics"].contactPerson, null);
  assert.equal(byName["Endwell"].contactEmail, "hello@endwell.ai");
  assert.equal(byName["O-ID"].website, "https://o-id.net");
  assert.equal(byName["O-ID"].logoUrl, "/members/o-id-logo.png");
  assert.equal(byName["O-ID"].contactEmail, "contact@o-id.net");
  assert.equal(byName["O-ID"].contactPerson, null);
  assert.match(
    byName["O-ID"].description,
    /modular, field-serviceable humanoid robots/,
  );
  assert.equal(byName["Kinetic Blocks AS"].contactEmail, "sales@kineticblocks.com");
  assert.equal(byName["Laksiya Balasubramaniam"].membershipType, "individual");
  assert.equal(byName["Kristoffer Gjerde"].membershipType, "individual");
  assert.equal(byName["Alex Moltzau"].membershipType, "individual");
  assert.equal(byName["Laksiya Balasubramaniam"].affiliation, "Industrial Product Developer, Robotics and AI");
  assert.equal(byName["Kristoffer Gjerde"].affiliation, "Director, Strategic Accounts, Cognite");
  assert.equal(
    byName["Alex Moltzau"].affiliation,
    "The Norwegian Government AI Unit; Visiting Policy Fellow at the University of Cambridge",
  );
  assert.equal(byName["Alex Moltzau"].website, "https://www.csap.cam.ac.uk/network/alex-moltzau/");
  assert.equal(byName["Alex Moltzau"].contactEmail, null);
  assert.equal(byName["Alex Moltzau"].contactPerson, null);
  assert.equal(byName.Cognite, undefined);
});

test("public organisation cards expose only generic company contacts, never a person", () => {
  const personal = [
    "lars.fredrik@kineticblocks.com",
    "kristian@startuplab.no",
    "ingeborg@sarorobotics.com",
    "crokseth@gmail.com",
    "marcus.horn@dotspot.ai",
    "lone@marseliarobotics.com",
    "hanna@runwayfbu.com",
    "per.arne.jensen@3lc.ai",
    "trygve.thomessen@ppm.no",
    "thomas@lito.so",
    "er@necia.no",
    "julian@wybe.me",
    "oskar.mykland@hiveautonomy.no",
    "magnus@roboxi.com",
    "Jayant@mil-as.no",
    "tor@sonair.com",
    "lars.kjelling@kameleongruppen.no",
    "vibeke.harlem@ruter.no",
    "johnny.advocaat@sye.oslo.kommune.no",
    "camilla.de.verdier@bring.com",
    "vidar@robotcluster.no",
    "emil@aimadlab.com",
    "geir.haugum@innovationnorway.no",
    "gjermund@taktlogistikk.no",
    "Arve.Martinsen@bluzenit.com",
    "morzhakov@rembrain.ai",
    "mattias.andersson@oemautomatic.se",
    "courtney@autonomousretailnorway.no",
    "laksiyab@gmail.com",
    "kristoffer.gjerde@cognite.com",
    "alex.moltzau@gmail.com",
    "stian@o-id.net",
  ].map((email) => email.toLowerCase());

  for (const member of publicMembers()) {
    assert.equal(member.contactPerson, null, member.companyName);
    if (member.membershipType === "individual") {
      assert.equal(member.contactEmail, null, member.companyName);
      assert.equal(member.contactUrl, null, member.companyName);
      continue;
    }
    if (member.contactEmail) {
      assert.equal(personal.includes(member.contactEmail.toLowerCase()), false, member.contactEmail);
      assert.equal(member.contactUrl, null, member.companyName);
    }
  }
});

test("internal source contacts are still available for admin export", () => {
  const byName = Object.fromEntries(internalMembers().map((member) => [member.companyName, member]));
  assert.equal(byName["Saro Robotics"].contactEmail, "ingeborg@sarorobotics.com");
  assert.equal(byName["Saro Robotics"].contactPerson, "Ingeborg Sofie Bogen");
  assert.equal(byName["Kinetic Blocks AS"].contactEmail, "lars.fredrik@kineticblocks.com");
  assert.equal(byName["Laksiya Balasubramaniam"].contactEmail, "laksiyab@gmail.com");
  assert.equal(byName["Alex Moltzau"].contactEmail, "alex.moltzau@gmail.com");
  assert.equal(byName["Alex Moltzau"].contactPerson, "Alex Moltzau");
  assert.equal(byName["Innovation Norway"], undefined);
});
