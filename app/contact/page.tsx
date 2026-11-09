import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the administrator and steering group of Robotics Norway.",
};

const steeringGroup = [
  { person: "Lars-Fredrik Forberg", organisation: "Kinetic Blocks", url: "https://kineticblocks.com" },
  { person: "Christian Rokseth", organisation: "Humanoid.guide", url: "https://humanoid.guide" },
  { person: "Eva Helen Rognskog", organisation: "Necia", url: "https://necia.no" },
  { person: "Maria Katarina Michelsen", organisation: "Runway FBU", url: "https://runwayfbu.com" },
  { person: "Daniel", organisation: "Saro Robotics", url: "https://www.sarorobotics.com" },
  { person: "Julian Alexander Hahn", organisation: "Wybe Robotics", url: "https://wybe.me" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="font-heading text-sm tracking-[0.14em] text-flag uppercase">Contact</p>
      <h1 className="mt-3 font-heading text-4xl text-navy sm:text-5xl">Lars-Fredrik Forberg</h1>
      <p className="mt-4 font-heading text-xl text-navy">Administrator</p>
      <p className="mt-6 leading-7">
        Lars-Fredrik Forberg is the administrator contact for Robotics Norway. He facilitated the founding meeting at Startuplab in Oslo on 5 November 2026.
      </p>
      <p className="mt-6">
        <a
          className="font-heading text-lg text-flag hover:underline"
          href="mailto:lars.fredrik@kineticblocks.com"
        >
          lars.fredrik@kineticblocks.com
        </a>
      </p>

      <h2 className="mt-16 font-heading text-3xl text-navy">Steering group</h2>
      <p className="mt-4 leading-7">
        The steering group was formed at the founding meeting. Members elect the steering group, and questions to it go through the administrator.
      </p>
      <ul className="mt-6 divide-y divide-navy/10 border-y border-navy/10">
        {steeringGroup.map((member) => (
          <li key={member.organisation} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between">
            <span className="font-heading text-lg text-navy">{member.person}</span>
            <a className="text-flag hover:underline" href={member.url}>
              {member.organisation}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
