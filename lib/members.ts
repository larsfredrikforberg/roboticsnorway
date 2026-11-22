import source from "@/data/members.source.json";
import { slugify } from "@/lib/text";
import type { MemberRecord, MembershipType } from "@/lib/types";

type SourceMember = {
  company_name: string;
  membership_kind?: MembershipType;
  affiliation?: string | null;
  website: string | null;
  website_certainty?: string;
  short_description: string | null;
  description_certainty?: string;
  contact_person: string | null;
  contact_email: string | null;
  contact_certainty?: string;
  public_contact_email?: string | null;
  public_contact_url?: string | null;
  logo_url: string | null;
  logo_certainty?: string;
  on_inception_list?: boolean;
  on_calendar_guest_list?: boolean;
  introduced_at_meeting?: boolean;
  membership_status?: string;
};

export type MemberDecision = {
  companyName: string;
  include: boolean;
  reason: string;
};

const DECLINED = new Set(["Cognite", "AutoStore", "Intek"]);

const MISSING_DESCRIPTION = "A public description has not been confirmed yet.";

export function classifyMember(member: SourceMember): MemberDecision {
  const companyName = member.company_name.trim();
  const status = member.membership_status ?? "";

  if (
    status === "calendar_guest_organisation_unknown" ||
    companyName.toLowerCase().startsWith("(unknown")
  ) {
    return {
      companyName,
      include: false,
      reason: "Organisation unknown.",
    };
  }

  if (DECLINED.has(companyName) || status.includes("declined")) {
    return {
      companyName,
      include: false,
      reason: "Declined membership.",
    };
  }

  if (
    status.startsWith("uncertain") ||
    member.description_certainty === "uncertain" ||
    member.contact_certainty === "uncertain"
  ) {
    return {
      companyName,
      include: false,
      reason: "Flagged uncertain.",
    };
  }

  if (status === "listed_on_invitation_attendance_not_verified") {
    return {
      companyName,
      include: false,
      reason:
        "Listed on the invitation, but attendance at the founding meeting was not verified.",
    };
  }

  const present =
    member.on_inception_list === true ||
    member.on_calendar_guest_list === true ||
    member.introduced_at_meeting === true ||
    status === "founding_member_listed" ||
    status === "meeting_attendee_not_on_inception_list" ||
    status === "related_cluster_guest" ||
    status === "listed_on_invitation_contact_unknown" ||
    status === "joined_by_email";

  if (!present) {
    return {
      companyName,
      include: false,
      reason: "Not recorded as present at or part of the founding meeting.",
    };
  }

  return {
    companyName,
    include: true,
    reason: "Present at or part of the founding meeting.",
  };
}

function publishedWebsite(member: SourceMember) {
  if (!member.website) return null;
  if (
    member.website_certainty === "uncertain" ||
    member.website_certainty === "unknown"
  ) {
    return null;
  }
  return member.website;
}

function publishedLogo(member: SourceMember) {
  if (!member.logo_url || member.logo_certainty !== "verified") return null;
  return member.logo_url;
}

function publishedDescription(member: SourceMember) {
  if (!member.short_description || member.description_certainty === "uncertain") {
    return MISSING_DESCRIPTION;
  }
  return member.short_description;
}

const GENERIC_LOCAL_PARTS = new Set([
  "hello",
  "hi",
  "hei",
  "info",
  "information",
  "contact",
  "kontakt",
  "contacts",
  "post",
  "postmottak",
  "firmapost",
  "mail",
  "office",
  "inbox",
  "sales",
  "salg",
  "support",
  "kundeservice",
  "kundesupport",
  "kundsupport",
  "service",
  "team",
  "admin",
  "administrasjon",
  "enquiries",
  "inquiries",
  "inquiry",
  "enquiry",
  "press",
  "presse",
  "media",
]);

export function isGenericCompanyEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const trimmed = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return false;
  const local = trimmed.split("@")[0] ?? "";
  if (GENERIC_LOCAL_PARTS.has(local)) return true;
  return /postmottak|firmapost|kundeservice|kundesupport|kundsupport|kundesenter|kontaktoss/.test(local);
}

function publishedPublicContact(member: SourceMember) {
  const email = member.public_contact_email?.trim() || null;
  const url = member.public_contact_url?.trim() || null;
  return {
    contactPerson: null,
    contactEmail: email,
    contactUrl: email ? null : url,
  };
}

function membershipTypeOf(member: SourceMember): MembershipType {
  return member.membership_kind === "individual" ? "individual" : "organisation";
}

function baseRecord(member: SourceMember): Omit<MemberRecord, "contactPerson" | "contactEmail" | "contactUrl"> {
  const membershipType = membershipTypeOf(member);
  const affiliation = member.affiliation?.trim() || null;
  return {
    id: slugify(member.company_name),
    slug: slugify(member.company_name),
    membershipType,
    companyName: member.company_name,
    affiliation: membershipType === "individual" ? affiliation : null,
    website: publishedWebsite(member),
    logoUrl: publishedLogo(member),
    description: publishedDescription(member),
    status: "approved",
    source: "founding",
    joinedAt: "2026-11-05T09:00:00.000Z",
  };
}

export function toPublicMember(member: SourceMember): MemberRecord {
  const membershipType = membershipTypeOf(member);
  const contact =
    membershipType === "individual"
      ? { contactPerson: null, contactEmail: null, contactUrl: null }
      : publishedPublicContact(member);
  return {
    ...baseRecord(member),
    contactPerson: contact.contactPerson,
    contactEmail: contact.contactEmail,
    contactUrl: contact.contactUrl,
  };
}

/** Internal record for admin export and seeding: keeps person contacts from the source. */
export function toInternalMember(member: SourceMember): MemberRecord {
  return {
    ...baseRecord(member),
    contactPerson: member.contact_person,
    contactEmail: member.contact_email,
    contactUrl: null,
  };
}

const sourceMembers = source.members as SourceMember[];

export function memberDecisions() {
  return sourceMembers.map(classifyMember);
}

export function excludedMembers() {
  return memberDecisions().filter((decision) => !decision.include);
}

function includedSourceMembers() {
  return sourceMembers.filter((member) => classifyMember(member).include);
}

export function publicMembers(): MemberRecord[] {
  return includedSourceMembers()
    .map(toPublicMember)
    .sort((a, b) => a.companyName.localeCompare(b.companyName, "en"));
}

export function internalMembers(): MemberRecord[] {
  return includedSourceMembers()
    .map(toInternalMember)
    .sort((a, b) => a.companyName.localeCompare(b.companyName, "en"));
}

export const PUBLIC_DIRECTORY_EXCLUSIONS = new Set(["Innovation Norway"]);

export function applyPublicContactPolicy(member: MemberRecord, publicByName?: Map<string, MemberRecord>): MemberRecord {
  if (PUBLIC_DIRECTORY_EXCLUSIONS.has(member.companyName)) {
    return member;
  }
  if (member.membershipType === "individual") {
    return { ...member, contactPerson: null, contactEmail: null, contactUrl: null };
  }
  const directory = publicByName ?? new Map(publicMembers().map((item) => [item.companyName.toLowerCase(), item]));
  const fromSource = directory.get(member.companyName.toLowerCase());
  if (fromSource) {
    return {
      ...member,
      contactPerson: null,
      contactEmail: fromSource.contactEmail,
      contactUrl: fromSource.contactUrl,
    };
  }
  const email = isGenericCompanyEmail(member.contactEmail) ? member.contactEmail : null;
  return { ...member, contactPerson: null, contactEmail: email, contactUrl: null };
}

export const declinedOutsideMemberRows =
  source.declined_according_to_invitation.map((entry) => entry.company_name);

export const missingDescription = MISSING_DESCRIPTION;
