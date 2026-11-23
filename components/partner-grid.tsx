import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Partner } from "@/content/partners";
import { websiteLabel } from "@/lib/text";

export function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <Card id={partner.slug} className="scroll-mt-28">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-44 shrink-0 items-center justify-center rounded-md bg-paper p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={partner.logoUrl} alt="" className="max-h-full max-w-full object-contain" />
          </div>
          <div>
            <h2 className="font-heading text-xl leading-snug text-navy">{partner.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{partner.country}</p>
            <a
              href={partner.website}
              className="mt-1 inline-block text-sm text-flag hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {websiteLabel(partner.website)}
            </a>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="leading-7 text-ink">{partner.description}</p>
        {partner.contactEmail || partner.contactUrl || partner.memberSlug ? (
          <dl className="space-y-1 text-sm">
            {partner.contactEmail || partner.contactUrl ? (
              <div>
                <dt className="inline font-heading text-navy">Contact </dt>
                <dd className="inline">
                  {partner.contactEmail ? (
                    <a
                      className="text-navy underline decoration-border underline-offset-4"
                      href={`mailto:${partner.contactEmail}`}
                    >
                      {partner.contactEmail}
                    </a>
                  ) : (
                    <a
                      className="text-navy underline decoration-border underline-offset-4"
                      href={partner.contactUrl ?? undefined}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Contact page
                    </a>
                  )}
                </dd>
              </div>
            ) : null}
            {partner.memberSlug ? (
              <div>
                <dt className="sr-only">Membership</dt>
                <dd className="inline">
                  <Link className="text-navy underline decoration-border underline-offset-4" href={`/members#${partner.memberSlug}`}>
                    Also a Robotics Norway member
                  </Link>
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function PartnerGrid({ partners }: { partners: Partner[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {partners.map((partner) => (
        <li key={partner.slug}>
          <PartnerCard partner={partner} />
        </li>
      ))}
    </ul>
  );
}
