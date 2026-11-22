import "server-only";

import { asc, eq, sql } from "drizzle-orm";
import { databaseConfigured, getDb } from "@/lib/db";
import { members } from "@/lib/db/schema";
import {
  applyPublicContactPolicy,
  internalMembers,
  publicMembers,
  PUBLIC_DIRECTORY_EXCLUSIONS,
} from "@/lib/members";
import { slugify } from "@/lib/text";
import type { MemberRecord, MemberStatus, MembershipType } from "@/lib/types";

type MemberRow = typeof members.$inferSelect;

function mapRow(row: MemberRow): MemberRecord {
  const status: MemberStatus =
    row.status === "approved" || row.status === "rejected" ? row.status : "pending";
  const membershipType: MembershipType = row.membershipType === "individual" ? "individual" : "organisation";
  return {
    id: String(row.id),
    slug: slugify(row.companyName),
    membershipType,
    companyName: row.companyName,
    affiliation: row.affiliation,
    website: row.website,
    logoUrl: row.logoUrl,
    description: row.description,
    contactPerson: row.contactPerson,
    contactEmail: row.contactEmail,
    contactUrl: null,
    status,
    source: row.source === "founding" ? "founding" : "application",
    joinedAt: row.joinedAt ? row.joinedAt.toISOString() : null,
  };
}

function publiclyListedMembers(records: MemberRecord[]) {
  const directory = new Map(publicMembers().map((item) => [item.companyName.toLowerCase(), item]));
  return records
    .filter((member) => !PUBLIC_DIRECTORY_EXCLUSIONS.has(member.companyName))
    .map((member) => applyPublicContactPolicy(member, directory));
}

export async function getPublicMembers() {
  if (!databaseConfigured()) return publicMembers();
  try {
    const db = getDb();
    if (!db) return publicMembers();
    const rows = await db
      .select()
      .from(members)
      .where(eq(members.status, "approved"))
      .orderBy(asc(members.companyName));
    return publiclyListedMembers(rows.map(mapRow));
  } catch (error) {
    console.error("Member database unavailable. Using the bundled founding list.", error);
    return publicMembers();
  }
}

export async function listAllMembers() {
  const db = getDb();
  if (!db) return { database: false as const, members: internalMembers() };
  const rows = await db.select().from(members).orderBy(asc(members.companyName));
  return { database: true as const, members: rows.map(mapRow) };
}

export async function getMember(id: string) {
  const db = getDb();
  if (!db) return null;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) return null;
  const rows = await db.select().from(members).where(eq(members.id, numericId)).limit(1);
  return rows[0] ? mapRow(rows[0]) : null;
}

export async function findMemberByCompanyName(companyName: string) {
  const db = getDb();
  if (!db) return null;
  const rows = await db
    .select()
    .from(members)
    .where(sql`lower(${members.companyName}) = ${companyName.toLowerCase()}`)
    .limit(1);
  return rows[0] ? mapRow(rows[0]) : null;
}
