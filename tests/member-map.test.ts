import assert from "node:assert/strict";
import test from "node:test";
import { memberLocations } from "../data/member-locations";
import {
  clusterMembers,
  isOnMembersMap,
  mappedMembers,
  mappedMembersAbroad,
  mappedMembersOnMainland,
} from "../lib/member-map";
import { publicMembers } from "../lib/members";

test("every public organisation has a city on the map, and individuals do not", () => {
  const organisations = publicMembers().filter((member) => member.membershipType !== "individual");
  const individuals = publicMembers().filter((member) => member.membershipType === "individual");
  const names = new Set(memberLocations.map((location) => location.companyName));

  assert.equal(organisations.length, memberLocations.length);
  for (const member of organisations) {
    assert.ok(names.has(member.companyName), member.companyName);
  }
  for (const member of individuals) {
    assert.equal(names.has(member.companyName), false, member.companyName);
  }

  const mapped = mappedMembers(publicMembers());
  assert.equal(mapped.length, organisations.length);
  const mainland = mappedMembersOnMainland(publicMembers());
  const abroad = mappedMembersAbroad(publicMembers());
  assert.equal(mainland.length + abroad.length, organisations.length);
  const clusters = clusterMembers(mainland);
  const pinned = clusters.reduce((sum, cluster) => sum + cluster.members.length, 0);
  assert.equal(pinned, mainland.length);
  assert.ok(clusters.some((cluster) => cluster.label.includes("Oslo")));
  assert.ok(clusters.some((cluster) => cluster.label.includes("Trondheim")));
  const oid = mapped.find((member) => member.companyName === "O-ID");
  assert.equal(oid?.city, "Tokyo");
  assert.equal(oid ? isOnMembersMap(oid) : true, false);
  assert.ok(abroad.some((member) => member.companyName === "O-ID"));
  assert.equal(
    clusters.some((cluster) => cluster.members.some((member) => member.companyName === "O-ID")),
    false,
  );
});
