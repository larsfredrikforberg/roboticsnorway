import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join",
  description: "How a company, organisation or individual can join Robotics Norway.",
};

const EMAIL = "lars.fredrik@kineticblocks.com";
const SUBJECT = "Membership in Robotics Norway";

export default function JoinPage() {
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`;
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <p className="font-heading text-sm tracking-[0.14em] text-flag uppercase">Membership</p>
      <h1 className="mt-3 font-heading text-4xl text-navy">Join Robotics Norway</h1>
      <p className="mt-5 leading-7">
        Membership is free and open to robotics companies and organisations in Norway, and to individuals who live in
        Norway or work for a Norwegian robotics company or in academia.
      </p>
      <p className="mt-5 leading-7">
        To join, send an email to{" "}
        <a className="text-navy underline decoration-border underline-offset-4" href={mailto}>
          {EMAIL}
        </a>{" "}
        with:
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-6 leading-7">
        <li>the name of your company or organisation, or your own name if you join as an individual</li>
        <li>a website, if you have one</li>
        <li>a sentence or two about what you do in robotics or physical AI</li>
        <li>a contact person and email</li>
      </ul>
      <p className="mt-5 leading-7">
        We add new members to the members page by hand. Individual members are listed by name, and by affiliation if
        they give one; their contact details are not published.
      </p>
      <p className="mt-10">
        <a
          className="inline-block rounded-md bg-navy px-5 py-3 font-heading text-sm text-white"
          href={mailto}
        >
          Email to join
        </a>
      </p>
    </div>
  );
}
