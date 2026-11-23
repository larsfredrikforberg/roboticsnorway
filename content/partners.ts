export type Partner = {
  slug: string;
  name: string;
  country: string;
  website: string;
  logoUrl: string;
  logoSource: string;
  description: string;
  descriptionSource: string;
  contactEmail: string | null;
  contactUrl: string | null;
  memberSlug: string | null;
};

export const partners: Partner[] = [
  {
    slug: "robotics-nation",
    name: "Robotics Nation",
    country: "Finland",
    website: "https://www.roboticsnation.org",
    logoUrl: "/partners/robotics-nation.png",
    logoSource: "https://www.roboticsnation.org/Union.png",
    description:
      "Robotics Nation is a Finnish non-profit building a national talent pipeline for robotics, starting in upper secondary school. The organisation sets up student-run robotics clubs — now in 22 schools around Finland — trains teachers, and connects students through competitions and a growing national network. It treats robotics education as a public good, so that students across the country get the same chance to build, program and design robots.",
    descriptionSource: "https://www.roboticsnation.org/",
    contactEmail: null,
    contactUrl: null,
    memberSlug: null,
  },
  {
    slug: "odense-robotics",
    name: "Odense Robotics",
    country: "Denmark",
    website: "https://www.odenserobotics.dk",
    logoUrl: "/partners/odense-robotics.svg",
    logoSource: "https://www.odenserobotics.dk/wp-content/uploads/2020/11/OR-Logo-primaer.svg",
    description:
      "Odense Robotics is Denmark’s national robotics, automation and drone cluster. It helps robotics companies innovate and grow, and helps companies that want to automate find the right solutions. Together with its members — more than 440 robotics, automation and drone companies, knowledge institutions, municipalities and related organisations — the cluster works to realise the potential of Danish robotics.",
    descriptionSource: "https://www.odenserobotics.dk/what-we-do/",
    contactEmail: "info@odenserobotics.dk",
    contactUrl: null,
    memberSlug: null,
  },
  {
    slug: "norwegian-robotics-cluster",
    name: "Norwegian Robotics Cluster",
    country: "Norway",
    website: "https://robotcluster.no",
    logoUrl: "/partners/norwegian-robotics-cluster.svg",
    logoSource:
      "https://cdn.prod.website-files.com/6a0c325833b248d1d3b8b982/6a82be1dcefe39ea37ffeb74_Norwegian%20Robotics%20Cluster%20Black.svg",
    description:
      "Norwegian Robotics Cluster (Den Norske Robotklyngen) is an industry cluster whose member companies work together to strengthen productivity and competitiveness through greater use of robotics and physical AI. The cluster offers competence-building, meeting places, innovation collaboration and internationalisation, and has been admitted to the Norwegian Innovation Clusters programme. It currently has 41 member organisations.",
    descriptionSource: "https://robotcluster.no/",
    contactEmail: "post@robotcluster.no",
    contactUrl: null,
    memberSlug: "norwegian-robotics-cluster",
  },
  {
    slug: "necia",
    name: "Necia",
    country: "Norway",
    website: "https://necia.no",
    logoUrl: "/partners/necia.png",
    logoSource: "https://www.mnu-as.no/necia (logo cropped from an official event graphic on the site)",
    description:
      "Necia is a tech cluster in the Moss region that connects companies, technology providers, schools and the public sector to strengthen industrial growth and international competitiveness. It works to accelerate the introduction of automation, AI and humanoid robotics, and to build the skills and meeting places that support Norwegian industry. Its programmes include VOXTRY, a growth programme for companies with global potential and ambitions.",
    descriptionSource: "https://www.mnu-as.no/necia and https://www.mnu-as.no/necia/about",
    contactEmail: null,
    contactUrl: "https://www.mnu-as.no/necia/contact",
    memberSlug: "necia",
  },
  {
    slug: "nlrobotics",
    name: "NLrobotics",
    country: "Netherlands",
    website: "https://www.nlrobotics.nl",
    logoUrl: "/partners/nlrobotics.png",
    logoSource:
      "https://images.squarespace-cdn.com/content/v1/65ee0714c4f0f556c7dcd577/43bb138b-7a6d-469b-b2f7-129a7f2898b5/241217_logo_NLRobotics_transparant_oranje_grijs_def.png",
    description:
      "NLrobotics is the industry and network organisation accelerating robotisation in the Netherlands. It connects companies, knowledge institutions and governments to work on smart, cognitive robotics solutions for challenges such as labour shortages, an ageing population, sustainability and digitalisation. With an ecosystem of more than 700 organisations, NLrobotics is a co-initiator, together with FME and the broader robotics coalition, of the Nationale Robotica Agenda.",
    descriptionSource: "https://www.nlrobotics.nl/",
    contactEmail: "contact@nlrobotics.nl",
    contactUrl: null,
    memberSlug: null,
  },
];
