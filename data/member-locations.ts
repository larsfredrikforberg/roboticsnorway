export type LocationCertainty = "high" | "split";

export type MemberLocation = {
  companyName: string;
  city: string;
  lat: number;
  lng: number;
  certainty: LocationCertainty;
  /** Set when the pin city is a legal address that may differ from operations. */
  note?: string;
};

/**
 * City-level locations for the public members map. Coordinates are city centres,
 * not street addresses, and should be replaced if Endwell provides a GeoJSON export.
 */
export const memberLocations: MemberLocation[] = [
  { companyName: "Kinetic Blocks AS", city: "Oslo", lat: 59.9139, lng: 10.7522, certainty: "high" },
  { companyName: "Startuplab", city: "Oslo", lat: 59.9139, lng: 10.7522, certainty: "high" },
  { companyName: "Saro Robotics", city: "Trondheim", lat: 63.4305, lng: 10.3951, certainty: "high" },
  { companyName: "Humanoid.guide", city: "Stavanger", lat: 58.97, lng: 5.7331, certainty: "high" },
  {
    companyName: "Dotspot",
    city: "Sandnes",
    lat: 58.8516,
    lng: 5.7359,
    certainty: "split",
    note: "Registered in Sandnes; also lists Aker Tech House, Fornebu.",
  },
  { companyName: "Marselia Robotics", city: "Stavanger", lat: 58.97, lng: 5.7331, certainty: "high" },
  { companyName: "Runway FBU", city: "Fornebu", lat: 59.8997, lng: 10.6294, certainty: "high" },
  { companyName: "3LC", city: "Oslo", lat: 59.9139, lng: 10.7522, certainty: "high" },
  { companyName: "PPM Robotics", city: "Trondheim", lat: 63.4305, lng: 10.3951, certainty: "high" },
  { companyName: "Lito", city: "Oslo", lat: 59.9139, lng: 10.7522, certainty: "high" },
  { companyName: "Necia", city: "Moss", lat: 59.434, lng: 10.6577, certainty: "high" },
  { companyName: "Wybe Robotics", city: "Moss", lat: 59.434, lng: 10.6577, certainty: "high" },
  { companyName: "Hive Autonomy", city: "Kristiansand", lat: 58.1467, lng: 7.9956, certainty: "high" },
  { companyName: "Physical Robotics", city: "Moss", lat: 59.434, lng: 10.6577, certainty: "high" },
  { companyName: "ROBOXI", city: "Stavanger", lat: 58.97, lng: 5.7331, certainty: "high" },
  { companyName: "Mechatronics Innovation Lab", city: "Grimstad", lat: 58.3406, lng: 8.5934, certainty: "high" },
  { companyName: "Sonair", city: "Oslo", lat: 59.9139, lng: 10.7522, certainty: "high" },
  { companyName: "Kameleon Robotics", city: "Åros", lat: 59.705, lng: 10.511, certainty: "high" },
  { companyName: "Ruter AS", city: "Oslo", lat: 59.9139, lng: 10.7522, certainty: "high" },
  { companyName: "Oslo kommune, Sykehjemsetaten", city: "Oslo", lat: 59.9139, lng: 10.7522, certainty: "high" },
  { companyName: "Posten Bring", city: "Oslo", lat: 59.9139, lng: 10.7522, certainty: "high" },
  { companyName: "Norwegian Robotics Cluster", city: "Osterøy", lat: 60.509, lng: 5.541, certainty: "high" },
  { companyName: "AI Mad Lab", city: "Oslo", lat: 59.9139, lng: 10.7522, certainty: "high" },
  { companyName: "Takt Logistikk", city: "Gullaug", lat: 59.748, lng: 10.248, certainty: "high" },
  { companyName: "bluZenit", city: "Tananger", lat: 58.933, lng: 5.6, certainty: "high" },
  { companyName: "Handprint", city: "Trondheim", lat: 63.4305, lng: 10.3951, certainty: "high" },
  { companyName: "Rembrain AS", city: "Stavanger", lat: 58.97, lng: 5.7331, certainty: "high" },
  { companyName: "OEM Automatic", city: "Drammen", lat: 59.744, lng: 10.2045, certainty: "high" },
  { companyName: "Endwell", city: "Fornebu", lat: 59.8997, lng: 10.6294, certainty: "high" },
  { companyName: "Framdrift Innovasjon AS", city: "Bergen", lat: 60.3913, lng: 5.3221, certainty: "high" },
  {
    companyName: "Autonomous Retail Norway AS",
    city: "Prestfoss",
    lat: 60.043,
    lng: 9.635,
    certainty: "split",
    note: "Registered in Prestfoss; first autonomous retail project is planned at Oslo Airport.",
  },
  {
    companyName: "Proptonomy AS",
    city: "Florø",
    lat: 61.5996,
    lng: 5.0328,
    certainty: "split",
    note: "Registered in Florø; LinkedIn lists Bergen.",
  },
];
