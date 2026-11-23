import type { Metadata } from "next";
import { PartnerGrid } from "@/components/partner-grid";
import { partners } from "@/content/partners";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "National and international robotics networks Robotics Norway works with, including Robotics Nation, Odense Robotics, Norwegian Robotics Cluster, Necia and NLrobotics.",
};

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="max-w-2xl">
        <p className="font-heading text-sm tracking-[0.14em] text-flag uppercase">Partners</p>
        <h1 className="mt-3 font-heading text-4xl text-navy sm:text-5xl">Networks we work with</h1>
        <p className="mt-5 leading-7">
          Robotics Norway works with national and international robotics networks. These partner organisations connect companies, research communities and talent across the Nordics and Europe.
        </p>
      </div>
      <div className="mt-12">
        <PartnerGrid partners={partners} />
      </div>
    </div>
  );
}
