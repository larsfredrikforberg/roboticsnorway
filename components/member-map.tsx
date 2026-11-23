"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { ENDWELL_APP_URL, labelSide, layoutMap, type CityCluster } from "@/lib/member-map";
import { cn } from "cn";

export type MemberMapProps = {
  clusters: CityCluster[];
};

export function MemberMap({ clusters }: MemberMapProps) {
  const titleId = useId();
  const layout = useMemo(() => layoutMap(clusters), [clusters]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = layout.clusters.find((cluster) => cluster.id === activeId) ?? null;
  const total = clusters.reduce((sum, cluster) => sum + cluster.members.length, 0);

  return (
    <section aria-labelledby={titleId} className="rounded-2xl border border-border bg-white p-5 sm:p-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-heading text-sm tracking-[0.14em] text-flag uppercase">Across Norway</p>
        <h2 className="mt-2 font-heading text-3xl text-navy sm:text-4xl">Members on the map</h2>
        <p className="mt-4 leading-7 text-ink">
          {total} member organisations, grouped by city. The map shows Robotics Norway
          members only. A broader landscape of robotics initiatives in Norway lives in
          Endwell&apos;s app.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href={ENDWELL_APP_URL}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "h-11 bg-flag px-5 text-white hover:bg-flag/90")}
          >
            Open the Endwell app
          </a>
          <Link href="/news/endwell-robotics-norway-workspace" className="inline-flex h-11 items-center text-sm text-flag hover:underline">
            Read the news story
          </Link>
        </div>
      </div>
      <div className="mt-10">
        <div className="mx-auto max-w-[560px]">
          <svg
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            role="img"
            aria-labelledby={titleId}
            className="mx-auto h-auto w-full"
          >
            <title id={titleId}>Map of Robotics Norway member organisations in Norway</title>
            {layout.paths.map((d, index) => (
              <path key={index} d={d} className="fill-[#e8eef6] stroke-navy/70" strokeWidth="1.1" strokeLinejoin="round" />
            ))}
            {layout.clusters.map((cluster) => {
              const selected = cluster.id === activeId;
              const side = cluster.side ?? labelSide(cluster, layout.width);
              const labelX = cluster.labelX ?? (side === "right" ? cluster.x + 12 : cluster.x - 12);
              const labelY = cluster.labelY ?? cluster.y + 4;
              return (
                <g key={cluster.id}>
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor={side === "right" ? "start" : "end"}
                    className="fill-navy font-heading text-[13px] tracking-wide"
                  >
                    {cluster.label}
                    <tspan className="fill-navy/60"> {cluster.members.length}</tspan>
                  </text>
                  <a
                    href={`#cluster-${cluster.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveId(cluster.id === activeId ? null : cluster.id);
                    }}
                  >
                    <circle
                      cx={cluster.x}
                      cy={cluster.y}
                      r={selected ? 8 : 6.5}
                      className={selected ? "fill-flag stroke-white" : "fill-flag/90 stroke-white"}
                      strokeWidth="1.6"
                    />
                    <title>{`${cluster.label}: ${cluster.members.length} organisations`}</title>
                  </a>
                </g>
              );
            })}
          </svg>
          {/* Click targets as buttons overlaid via a second list for accessibility */}
          <ul className="sr-only">
            {layout.clusters.map((cluster) => (
              <li key={cluster.id}>
                <button type="button" onClick={() => setActiveId(cluster.id === activeId ? null : cluster.id)}>
                  {cluster.label}, {cluster.members.length} organisations
                </button>
              </li>
            ))}
          </ul>
        </div>
        <ClusterList
          clusters={layout.clusters}
          activeId={activeId}
          onSelect={(id) => setActiveId(id === activeId ? null : id)}
        />
        {active ? (
          <p className="sr-only" role="status">
            {active.label}: {active.members.map((member) => member.companyName).join(", ")}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function ClusterList({
  clusters,
  activeId,
  onSelect,
}: {
  clusters: CityCluster[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const ordered = [...clusters].sort((a, b) => b.members.length - a.members.length || a.label.localeCompare(b.label, "nb"));

  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
      {ordered.map((cluster) => {
        const open = cluster.id === activeId;
        return (
          <li key={cluster.id} id={`cluster-${cluster.id}`} className="rounded-xl border border-border">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => onSelect(cluster.id)}
              className="flex w-full items-baseline justify-between gap-3 px-4 py-3 text-left"
            >
              <span className="font-heading text-navy">{cluster.label}</span>
              <span className="text-sm text-muted-foreground">{cluster.members.length}</span>
            </button>
            {open ? (
              <ul className="space-y-1 border-t border-border px-4 py-3">
                {cluster.members.map((member) => (
                  <li key={member.slug}>
                    <Link href={`#${member.slug}`} className="text-sm text-flag hover:underline">
                      {member.companyName}
                    </Link>
                    {member.city !== cluster.label ? (
                      <span className="text-sm text-muted-foreground"> · {member.city}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
