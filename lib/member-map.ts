import { memberLocations, type MemberLocation } from "@/data/member-locations";
import { norwayMainland } from "@/data/norway-mainland";
import type { MemberRecord } from "@/lib/types";

export const ENDWELL_APP_URL = "https://app.endwell.ai/";
/** Invitation link for the Robotics Norway workspace, with unlimited duration. */
export const ENDWELL_JOIN_URL = "https://app.endwell.ai/join#aD4_JxCdPh0gFf9xSI_ri82tJ6hq27kS";

export type MappedMember = {
  slug: string;
  companyName: string;
  city: string;
  lat: number;
  lng: number;
  certainty: MemberLocation["certainty"];
};

export type CityCluster = {
  id: string;
  label: string;
  lat: number;
  lng: number;
  members: MappedMember[];
};

const CLUSTER_KM = 20;

function haversineKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const toRad = (degrees: number) => (degrees * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h =
    sinLat * sinLat +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * sinLng * sinLng;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export function mappedMembers(members: MemberRecord[]): MappedMember[] {
  const byName = new Map(memberLocations.map((location) => [location.companyName, location]));
  return members
    .filter((member) => member.membershipType !== "individual")
    .map((member) => {
      const location = byName.get(member.companyName);
      if (!location) {
        throw new Error(`Missing map location for ${member.companyName}`);
      }
      return {
        slug: member.slug,
        companyName: member.companyName,
        city: location.city,
        lat: location.lat,
        lng: location.lng,
        certainty: location.certainty,
      };
    });
}

/** Mainland Norway as drawn on the members map. Locations abroad are not pinned. */
export function isOnMembersMap(location: Pick<MemberLocation, "lat" | "lng">) {
  return location.lat >= 57.8 && location.lat <= 71.4 && location.lng >= 4 && location.lng <= 32;
}

export function mappedMembersOnMainland(members: MemberRecord[]): MappedMember[] {
  return mappedMembers(members).filter(isOnMembersMap);
}

export function mappedMembersAbroad(members: MemberRecord[]): MappedMember[] {
  return mappedMembers(members).filter((member) => !isOnMembersMap(member));
}

export function clusterMembers(members: MappedMember[]): CityCluster[] {
  const parent = members.map((_, index) => index);

  function find(index: number): number {
    if (parent[index] !== index) parent[index] = find(parent[index]);
    return parent[index];
  }

  function union(a: number, b: number) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) parent[rootB] = rootA;
  }

  for (let i = 0; i < members.length; i += 1) {
    for (let j = i + 1; j < members.length; j += 1) {
      if (haversineKm(members[i].lat, members[i].lng, members[j].lat, members[j].lng) <= CLUSTER_KM) {
        union(i, j);
      }
    }
  }

  const groups = new Map<number, MappedMember[]>();
  members.forEach((member, index) => {
    const root = find(index);
    const group = groups.get(root) ?? [];
    group.push(member);
    groups.set(root, group);
  });

  return [...groups.values()].map((group) => {
    const sorted = [...group].sort((a, b) => a.companyName.localeCompare(b.companyName, "en"));
    const counts = new Map<string, number>();
    for (const member of sorted) {
      counts.set(member.city, (counts.get(member.city) ?? 0) + 1);
    }
    const cities = [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "nb"))
      .map(([city]) => city);
    const label = cities.length <= 2 ? cities.join(" / ") : `${cities[0]} area`;
    const lat = sorted.reduce((sum, member) => sum + member.lat, 0) / sorted.length;
    const lng = sorted.reduce((sum, member) => sum + member.lng, 0) / sorted.length;
    return {
      id: cities.join("-").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      label,
      lat,
      lng,
      members: sorted,
    };
  });
}

/** Equirectangular projection centred on mainland Norway. */
const ORIGIN_LAT = 64.5;
const ORIGIN_LNG = 13;
const COS_ORIGIN = Math.cos((ORIGIN_LAT * Math.PI) / 180);

export function project(lat: number, lng: number): [number, number] {
  return [(lng - ORIGIN_LNG) * COS_ORIGIN, lat - ORIGIN_LAT];
}

export type PlacedCluster = CityCluster & {
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  side: "right" | "left";
};

export type MapLayout = {
  width: number;
  height: number;
  paths: string[];
  clusters: PlacedCluster[];
};

const PAD_LEFT = 88;
const PAD_RIGHT = 96;
const PAD_TOP = 28;
const PAD_BOTTOM = 24;

export function layoutMap(clusters: CityCluster[], width = 560, height = 780): MapLayout {
  const projected = norwayMainland.flatMap((polygon) => polygon.flatMap((ring) => ring.map(([lng, lat]) => project(lat, lng))));
  const xs = projected.map(([x]) => x);
  const ys = projected.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const innerW = width - PAD_LEFT - PAD_RIGHT;
  const innerH = height - PAD_TOP - PAD_BOTTOM;
  const scale = Math.min(innerW / (maxX - minX), innerH / (maxY - minY));
  const offsetX = PAD_LEFT + (innerW - (maxX - minX) * scale) / 2;
  const offsetY = PAD_TOP + (innerH - (maxY - minY) * scale) / 2;

  function toSvg(lat: number, lng: number): [number, number] {
    const [x, y] = project(lat, lng);
    return [offsetX + (x - minX) * scale, offsetY + (maxY - y) * scale];
  }

  const paths = norwayMainland.map((polygon) =>
    polygon
      .map((ring) => {
        const commands = ring.map(([lng, lat], index) => {
          const [x, y] = toSvg(lat, lng);
          return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
        });
        return `${commands.join(" ")} Z`;
      })
      .join(" "),
  );

  const placed = clusters.map((cluster) => {
    const [x, y] = toSvg(cluster.lat, cluster.lng);
    return { ...cluster, x, y, labelX: 0, labelY: 0, side: "right" as "right" | "left" };
  });

  const boxes: { left: number; right: number; top: number; bottom: number }[] = [];
  const charW = 7.2;
  for (const cluster of placed.sort((a, b) => a.y - b.y || a.x - b.x)) {
    const tw = cluster.label.length * charW + 18;
    // Keep labels on the same side of the country as the pin, so east-coast
    // names do not stretch across the mainland.
    const preferRight = cluster.lng >= 7.5;
    const rightFirst: { side: "right" | "left"; dx: number; dy: number }[] = [
      { side: "right", dx: 12, dy: 4 },
      { side: "right", dx: 12, dy: -14 },
      { side: "right", dx: 12, dy: 18 },
      { side: "right", dx: 12, dy: -26 },
      { side: "right", dx: 12, dy: 30 },
      { side: "left", dx: -12, dy: 4 },
    ];
    const leftFirst: { side: "right" | "left"; dx: number; dy: number }[] = [
      { side: "left", dx: -12, dy: 4 },
      { side: "left", dx: -12, dy: -14 },
      { side: "left", dx: -12, dy: 18 },
      { side: "right", dx: 12, dy: 4 },
      { side: "right", dx: 12, dy: -14 },
      { side: "right", dx: 12, dy: 18 },
    ];
    const candidates = preferRight ? rightFirst : leftFirst;
    let chosen = candidates[0];
    for (const candidate of candidates) {
      const labelX = cluster.x + candidate.dx;
      const left = candidate.side === "right" ? labelX : labelX - tw;
      const right = candidate.side === "right" ? labelX + tw : labelX;
      const top = cluster.y + candidate.dy - 10;
      const bottom = cluster.y + candidate.dy + 10;
      const fits = left > 2 && right < width - 2;
      const hits = boxes.some(
        (box) => left < box.right && right > box.left && top < box.bottom && bottom > box.top,
      );
      if (fits && !hits) {
        chosen = candidate;
        break;
      }
    }
    cluster.side = chosen.side;
    cluster.labelX = cluster.x + chosen.dx;
    cluster.labelY = cluster.y + chosen.dy;
    const left = chosen.side === "right" ? cluster.labelX : cluster.labelX - tw;
    const right = chosen.side === "right" ? cluster.labelX + tw : cluster.labelX;
    boxes.push({ left, right, top: cluster.y + chosen.dy - 10, bottom: cluster.y + chosen.dy + 10 });
  }

  return {
    width,
    height,
    paths,
    clusters: placed,
  };
}

export function labelSide(cluster: { side?: "right" | "left"; x: number; label: string }, width: number) {
  if (cluster.side) return cluster.side;
  const rightFits = cluster.x + 12 + cluster.label.length * 6.2 < width - 8;
  return rightFits ? "right" : "left";
}
