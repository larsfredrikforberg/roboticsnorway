export type NewsFigure = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  /** CSS object-position when the photo is cropped into a shared frame. */
  objectPosition?: string;
};

export type TextRun = {
  text: string;
  href?: string;
};

export type NewsVideo = {
  src: string;
  poster: string;
  width: number;
  height: number;
  caption: string;
};

export type NewsBlock =
  | { type: "paragraph"; runs: TextRun[] }
  | { type: "heading"; text: string }
  | { type: "figure"; figure: NewsFigure; credit?: string }
  | { type: "gallery"; figures: NewsFigure[]; credit: string; frame?: boolean }
  | { type: "video"; video: NewsVideo; credit?: string };

export type NewsArticle = {
  slug: string;
  title: string;
  /** Calendar date, YYYY-MM-DD. */
  date: string;
  /**
   * Tie-break when two articles share a date. Higher numbers are listed first.
   */
  order: number;
  /** Short labels such as Network or Events. */
  tags?: string[];
  /** Place shown after the date. Defaults to StartupLab, Oslo. */
  place?: string;
  excerpt: string;
  /** Lead photo. Omit for text-only articles. */
  hero?: NewsFigure;
  /** Optional organisation logo, shown small on the article page. */
  logo?: NewsFigure;
  /** Optional video, shown in the article where a video block is placed. */
  video?: NewsVideo;
  /** Credit for the photographs in the article. */
  photoCredit?: string;
  blocks: NewsBlock[];
};

const hero: NewsFigure = {
  src: "/news/opening-1.jpg",
  alt: "Participants at Robotics Norway's founding meeting on 5 November 2026.",
  width: 1600,
  height: 1041,
  caption: "Participants at the founding meeting.",
};

function paragraph(text: string): NewsBlock {
  return { type: "paragraph", runs: [{ text }] };
}

function heading(text: string): NewsBlock {
  return { type: "heading", text };
}

function photo(file: string, width: number, height: number, text: string): NewsFigure {
  return { src: file, alt: text, caption: text, width, height };
}

function video(src: string, poster: string, width: number, height: number, text: string): NewsVideo {
  return { src, poster, width, height, caption: text };
}

const photoCredit = "Photos: Jonas Kloster";

export const articles: NewsArticle[] = [
  {
    slug: "industrial-renaissance-summit-slush",
    title: "The Industrial Renaissance Summit at Slush: physical AI moves into the factory",
    date: "2026-11-19",
    order: 2,
    tags: ["Events"],
    place: "Slush, Helsinki",
    excerpt:
      "Robotics Norway president Lars-Fredrik Forberg attended the Industrial Renaissance Summit on day 2 of Slush in Helsinki on 19 November 2026. Hosted by Extantia and Google Cloud and moderated by BBC journalist Maddie Savage, the morning focused on industrial transformation, robotics and physical AI.",
    hero: photo(
      "/news/industrial-renaissance-summit-session-01.jpg",
      1600,
      1200,
      "From left: moderator Maddie Savage (BBC), Alexander Stevens (Motion), Jan-Erik Solheim (STAIR) and Fabian Kurz (Qualia) in the panel The New Factory: Where Physical AI Is Working Today.",
    ),
    video: video(
      "/news/industrial-renaissance-summit-galbot-demo.mp4",
      "/news/industrial-renaissance-summit-galbot-demo-poster.jpg",
      1080,
      1920,
      "Motion's Galbot S1 palletizes grey crates on stage at the Industrial Renaissance Summit.",
    ),
    photoCredit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
    blocks: [
      paragraph(
        "Robotics Norway president Lars-Fredrik Forberg attended the Industrial Renaissance Summit on Thursday 19 November 2026, day 2 of Slush in Helsinki. The summit was hosted by Extantia, a Berlin-based venture firm focused on resilience and sustainability, and by Google Cloud, and moderated by BBC journalist Maddie Savage, who is based in Stockholm. The morning focused on industrial transformation, robotics and physical AI.",
      ),
      heading("Intelligence moves off the screen"),
      paragraph(
        "Kathryn Van Nys of Google Cloud opened by describing foundational intelligence moving from screens into factories, energy grids and robotics. According to Van Nys, more than 50 billion dollars flowed into physical AI this year alone, around five times the level of two years ago, and 11 percent of all venture funding now goes into embodied intelligence. She contrasted a software market of around 15 trillion dollars with a physical economy of 50 to 100 trillion, and cited three drivers: just-in-time trade shattered by the pandemic, with reshoring viable only if factories become software-defined; Europe's elevated energy costs and critical mineral mines that take more than 16 years to come online; and an 85 million skilled-worker shortage projected by 2030, with a third of Europe's manufacturing workforce aged 50 to 64. Europe's unfair advantage, she argued, is its precision mechatronics heritage and a large industrial base including Valmet, Nokia, ABB and Siemens. Google's stack, as she described it, spans DeepMind models such as Gemini Robotics, Veo and Genie; Google Cloud; Intrinsic, recently open-sourced under Apache 2.0.",
      ),
      heading("An industrial renaissance"),
      paragraph(
        "Sebastian Heitmann of Extantia said industry was long seen as the villain, and that technology now makes harmony with the planet and good jobs possible. He updated three pillars: electrons, now also about energy independence; molecules, for resource independence; and physical AI, the ability to build locally. Britain held 23 percent of global manufacturing by 1880 and then lost it through globalisation, he said. China now accounts for around 31 percent, and, according to Heitmann, 54 percent of all robots sold globally went to China last year. AI, robotics and 3D printing mean labour costs no longer determine where a factory is built. Battery-pack costs, he said, have fallen from more than 1,000 dollars per kilowatt-hour in 2010 to around 108 dollars today. Europe, he argued, needs massive investment in compute, energy, robots and capital.",
      ),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/industrial-renaissance-summit-54-percent.jpg",
          1600,
          1200,
          "Sebastian Heitmann of Extantia presents a slide stating that 54 percent of the world's new industrial robots went into China in 2024, beside a chart of robots per 10,000 manufacturing employees.",
        ),
      },
      heading("Physical AI in the factory today"),
      paragraph(
        "The first panel brought together Jan-Erik Solheim of STAIR in Malmö, Alexander Stevens of Motion in Brussels, and Fabian Kurz of Qualia in Copenhagen. Stevens said Motion's customers are 40 percent food and beverage, 30 percent heavy industry and 30 percent warehouse logistics. Solheim described STAIR's spatial intelligence layer as real-time tracking of robots, trucks and goods flow. Kurz said Qualia trains foundation models for robotics companies in manufacturing, agriculture and hospitals.",
      ),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/industrial-renaissance-summit-panel.jpg",
          1600,
          1200,
          "The Session 01 panel on stage, with side screens showing Maddie Savage, Alex Stevens of Motion, Fabian Kurz of Qualia and Jan-Erik Solheim of STAIR.",
        ),
      },
      paragraph(
        "The panelists argued that robots fill a genuine labour gap, can restock warehouses overnight without night shifts, and offer full traceability. Motion's Galbot S1 weighs 320 kilograms and has a 50-kilogram payload, which Stevens said is the heaviest on the market, and uses lidar to slow down near people. Kurz said people quickly anthropomorphize robots; naming them is practical, but making them look human is unnecessary. Motion starts with trade union presentations before deployment, trains operators with cameras and AR glasses, and supports sites by remote teleoperation.",
      ),
      heading("A humanoid on stage"),
      paragraph(
        "Stevens then demonstrated the Galbot S1 palletizing on stage. The robot, he said, ships to a warehouse customer in Belgium next week.",
      ),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/industrial-renaissance-summit-galbot-extantia.jpg",
          1600,
          2133,
          "A Galbot robot raises its arm on the Extantia stage, beside a table with a grey crate and a member of the Motion team.",
        ),
      },
      {
        type: "video",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        video: video(
          "/news/industrial-renaissance-summit-galbot-demo.mp4",
          "/news/industrial-renaissance-summit-galbot-demo-poster.jpg",
          1080,
          1920,
          "Motion's Galbot S1 palletizes grey crates on stage at the Industrial Renaissance Summit.",
        ),
      },
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/industrial-renaissance-summit-galbot-pallets.jpg",
          1600,
          2133,
          "A Galbot robot stands over grey crates stacked on a blue pallet, with the Google Cloud backdrop behind it.",
        ),
      },
      paragraph(
        "According to Stevens, Europe needs around 800,000 humanoids by 2040 to fill a 2.4 million manufacturing-worker gap projected by the European Commission. China installed around 350,000 robots last year, he said, against around 60,000 in Europe. He presented MotionOS, built on Google Cloud and Gemini, for qualification from customer video, digital-twin planning, VR training, safety certification and fleet management. Motion leases its robots, which cost 100,000 to 150,000 euros today, and grew from six to 50 customers within two months of its pre-seed announcement. Hardware is mostly imported from China by sea; the biggest sustainability impact would come from reshoring production to Europe. Stevens argued that robots should drive deflation and make goods cheaper.",
      ),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/industrial-renaissance-summit-record-operators.jpg",
          1600,
          2133,
          "Alexander Stevens of Motion on stage in front of a slide titled Record the operators, showing Motion's data agent and headset captures.",
        ),
      },
      paragraph(
        "For Norway, the labour shortages and the case for building more production locally speak directly to a country that already has an industrial base to build on.",
      ),
    ],
  },
  {
    slug: "robotics-nation-talent-pipeline",
    title: "Robotics Nation is building a talent pipeline for robotics, starting in school",
    date: "2026-11-19",
    order: 1,
    tags: ["Network"],
    place: "Voima Ventures",
    excerpt:
      "Robotics Norway president Lars-Fredrik Forberg met Erkka Lehtonen, president of the Finnish non-profit Robotics Nation, at Voima Ventures on 17 November 2026. Robotics Nation is building a national talent pipeline for robotics, starting in upper secondary school, with student-run clubs now in 22 schools.",
    hero: photo(
      "/news/robotics-nation-vex.jpg",
      558,
      539,
      "Students around a VEX robotics field during a qualification match.",
    ),
    logo: photo("/news/robotics-nation-logo.png", 1167, 1235, "Robotics Nation logo"),
    photoCredit: "Image: Robotics Nation",
    blocks: [
      paragraph(
        "Robotics Norway president Lars-Fredrik Forberg met Erkka Lehtonen, president of Robotics Nation, at Voima Ventures on 17 November 2026. Robotics Nation ry is a Finnish non-profit based in Espoo.",
      ),
      paragraph("Lehtonen describes the work as follows:"),
      paragraph(
        "\"Robotics Nation ry is a Finnish non-profit building the world's first national talent pipeline for robotics, starting in upper secondary school. We set up student-run robotics clubs, now in 22 schools around the country, and connect them through competitive robotics, physical AI hackathons and a growing national network.\"",
      ),
      paragraph(
        "\"Why: Robotics and physical AI will reshape industry in the coming years, and the Nordics need far more people who can build these systems. Most teenagers never touch a robot until university, if ever. We change that. Our clubs work like small startups: students design, build, compete, train and finetune robots and models. They leave upper secondary school with real skills and a clear path into engineering, research or founding the next robotics company. A strong Nordic robotics industry starts with talent, and we're building it from the ground up.\"",
      ),
      {
        type: "figure",
        credit: "Image: Robotics Nation",
        figure: photo(
          "/news/robotics-nation-clubs-map.png",
          699,
          536,
          "Active Robotics Nation clubs in Finland: 22 schools around the country.",
        ),
      },
      paragraph(
        "Robotics Norway is interested in how a similar talent pipeline could take shape in Norway, and in Nordic cooperation on this work.",
      ),
      {
        type: "paragraph",
        runs: [
          { text: "Read more at " },
          {
            text: "roboticsnation.org",
            href: "https://www.roboticsnation.org/",
          },
          { text: "." },
        ],
      },
    ],
  },
  {
    slug: "one-million-humanoids-in-norway-by-2050",
    title: "One million humanoids in Norway by 2050 – are we ready?",
    date: "2026-11-17",
    order: 1,
    tags: ["Commentary"],
    place: "Shifter",
    excerpt:
      "In a commentary in Shifter, Robotics Norway president Lars-Fredrik Forberg writes that Norway could have around one million humanoids by 2050, and that regulation, test arenas and skills need to be in place by 2035.",
    hero: photo(
      "/news/one-million-humanoids.jpg",
      1200,
      683,
      "People seated on wooden steps at a Robotics Norway gathering.",
    ),
    photoCredit: "Photo: Mia Sandnes Nilsen",
    blocks: [
      paragraph(
        "In a commentary published in Shifter on 17 November 2026, Lars-Fredrik Forberg, president of Robotics Norway, asks whether Norway is ready for a future with around one million humanoid robots.",
      ),
      paragraph(
        "China has made the technology behind humanoid robots a national priority in a five-year plan adopted in March, he writes. Chinese manufacturers talk openly about a robot in every home, and the first household robots are due to enter ordinary homes in Wuhan in early 2027. Chinese companies delivered around 90 percent of all humanoids sold worldwide last year.",
      ),
      paragraph(
        "Morgan Stanley estimates that the world will have nearly one billion humanoids by 2050. With the same robot density the bank expects in the United States, Norway would then have around one million. Regulation, test arenas and skills therefore need to be in place by 2035, Forberg argues.",
      ),
      paragraph(
        "Robots that do physical work in nursing homes, hospitals and industry will become infrastructure in a country where Statistics Norway estimates that health and care services will lack 42,400 full-time equivalents in 2040, and where the working-age population starts to fall from the mid-2030s, he writes, citing the government. A country that depends on robots in elderly care without controlling the software, the data or the spare parts has given up part of its freedom of action in a crisis, and robots therefore belong in emergency preparedness planning, not only in procurement departments.",
      ),
      paragraph(
        "Most of the humanoids taken into use in Norway will probably be produced in China, the United States or Germany, because mass production requires supply chains and capital Norway does not have. Norway's opportunity, he argues, lies in the layers that decide whether a robot actually works in a given work operation: collecting consent-based data on how health workers, operators and hotel staff do their jobs, using that data to train robot policies, and scaling up when the technology is mature.",
      ),
      paragraph(
        "The City of Oslo's nursing home agency plans to build a \"robot gym\" where robots can be tested and trained in a controlled environment before they meet residents. Robotics Norway supports the establishment of 500 robot labs in Norway, preferably one in each municipality, so that nursing homes, schools, companies and founders can try robots on their own work operations, collect data under shared rules for consent and ownership, and share experience.",
      ),
      paragraph(
        "Forberg writes that the government and the Storting should adopt a national plan for robotics and physical artificial intelligence with the same weight as the National Transport Plan, fund robot labs and test arenas with health and care as the first priority, clarify the rules for collecting and owning work data, let municipalities and health trusts be first customers through innovative procurement, and include robots in the national preparedness plans. The decisions that determine whether Norway becomes a competent user of robots, and a supplier of data and services, or only a market for other countries' technology, must be taken in this and the next parliamentary term, he concludes.",
      ),
      {
        type: "paragraph",
        runs: [
          { text: "Read the commentary in Shifter (in Norwegian): " },
          {
            text: "1 million humanoider i Norge i 2050 – er vi klare?",
            href: "https://www.shifter.no/kommentar/1-million-humanoider-i-norge-i-2050-er-vi-klare/482979",
          },
          { text: "." },
        ],
      },
    ],
  },
  {
    slug: "steering-group-meeting-12-november-2026",
    title: "Steering group plans study trips and a robot strategy",
    date: "2026-11-12",
    order: 1,
    tags: ["Network", "Steering group"],
    excerpt:
      "The Robotics Norway steering group met on 12 November 2026, approved the charter and started planning trips to Grimstad, Odense, the United States and China.",
    blocks: [
      paragraph(
        "The steering group of Robotics Norway met on 12 November 2026. It approved the network's charter, confirmed that the website and member register are in order, and started planning the study trips that the charter promises members.",
      ),
      heading("Who took part"),
      paragraph(
        "Lars-Fredrik Forberg (Kinetic Blocks) organised the meeting. Also present were Christian Rokseth (Humanoid.guide), Eva Helen Rognskog (Necia), Daniel Kjøle Skogland and Kristian from Saro Robotics, Julian Alexander Hahn (Wybe Robotics), Vidar Tufteland (Norwegian Robotics Cluster), Lene Merethe Liodden (Mechatronics Innovation Lab) and Kristian Hesthaug (StartupLab). Maria Katarina Michelsen (Runway FBU) could not attend.",
      ),
      heading("What we discussed"),
      paragraph(
        "Study trips took most of the time. A visit to Grimstad is planned for around the turn of the year, and Lene and Lars-Fredrik will draft an agenda with input from the steering group. A short survey will gauge members' interest. A trip to Odense is planned for January, with a planning meeting for those interested on 23 November at 11:00.",
      ),
      paragraph(
        "Further out, Lars-Fredrik and Vidar will sketch a possible trip to the United States in May together with the Norwegian Robotics Cluster. Maria will sketch a trip to Shanghai and Shenzhen. Julian knows Agibot, and the group wants to draw on Innovation Norway's office in China and on Norway's embassies and consulates there.",
      ),
      {
        type: "paragraph",
        runs: [
          { text: "Lars-Fredrik presented the proposal " },
          { text: "A door to the Bay Area", href: "/projects" },
          {
            text: ". Companies that want to take part sign a letter of intent and prepare a company presentation.",
          },
        ],
      },
      heading("Ideas on the table"),
      paragraph(
        "One million robots in Norway by 2035. The group sees robots as critical infrastructure and believes the government needs a national robot strategy.",
      ),
      paragraph(
        "Events. Saro Robotics plans a physical AI hackathon in mid-January. Robotics Norway will support a large humanoid and robotics event in Norway, and the group discussed the Norwegian championship in AI (NM i KI), which aims to get one per cent of the population to take part.",
      ),
      paragraph(
        "Courses for members. The network wants to arrange robotics courses and webinars with Norwegian companies on robot policies, evaluations, hardware and similar topics, and make them available to members.",
      ),
      paragraph(
        "Membership and services. Vidar, Lene and Eva will write a short text on what it takes to become a member, to be published on this site. Lars-Fredrik and Lene will draft what the network can offer, including services from suppliers among the members.",
      ),
      {
        type: "paragraph",
        runs: [
          { text: "Want to take part? See how to " },
          { text: "join Robotics Norway", href: "/join" },
          { text: "." },
        ],
      },
    ],
  },
  {
    slug: "humanoids-at-work",
    title: "Humanoids at work: Startuplab and IMD Alumni Club of Norway bring physical AI to Norwegian business",
    date: "2026-11-05",
    order: 2,
    tags: ["Events"],
    place: "Startuplab, Oslo",
    excerpt:
      "Startuplab and IMD Alumni Club of Norway gathered business leaders, startups and robots to explore what humanoids can do at work.",
    hero: photo(
      "/news/humanoids-1.jpg",
      1600,
      966,
      "Marie Mostad, CEO of Startuplab, opens Humanoids at work in front of a full house.",
    ),
    photoCredit: photoCredit,
    blocks: [
      paragraph(
        "The 1990s gave us the PC, the 2000s the internet, then came the smartphone, and now AI. Will humanoids shape the 2030s and beyond?",
      ),
      paragraph(
        "On 5 November, Startuplab and the IMD Alumni Club of Norway hosted \"Humanoids at work\" for Startuplab's Corporate Innovation Network. The aim was to lower the threshold, take the edge off what can feel intimidating, and get people thinking about testing and using robots in their own businesses. The event brought together large companies, startups and scale-ups. Marie Mostad, CEO of Startuplab, opened the afternoon.",
      ),
      heading("The money is moving in"),
      paragraph(
        "Capital is pouring into the field. More funding has already been raised for humanoid robotics in 2026 than in 2024 and 2025 combined. According to Christian Rokseth, founder of Humanoid.guide, a new humanoid is launched roughly every day. Even so, most of the activity is still about research and showing up at events. But that is how every new technology starts.",
      ),
      {
        type: "gallery",
        frame: false,
        credit: photoCredit,
        figures: [
          photo(
            "/news/humanoids-2.jpg",
            1600,
            1096,
            "Lars-Fredrik Forberg, IMD Alumni Club and Kinetic Blocks, presents the charter for Robotics Norway.",
          ),
          photo(
            "/news/humanoids-3.jpg",
            1600,
            1040,
            "Christian Rokseth, Humanoid.guide, on the humanoid makers to know in China, the USA and Europe.",
          ),
        ],
      },
      heading("From observing to doing"),
      paragraph(
        "Robotics is not new, and the industry is well under way. As Sigrid Kjønnø Schaanning of Cognite showed, robots are moving from observing, for example on inspection rounds on oil platforms, to carrying out tasks that until now have been reserved for people. Fine motor skills, the fingertip feel humans train from infancy, are being practised hard, and progress is fast.",
      ),
      {
        type: "figure",
        credit: photoCredit,
        figure: photo(
          "/news/humanoids-4.jpg",
          1600,
          1028,
          "Sigrid Kjønnø Schaanning, Cognite, on robotics and autonomous industry.",
        ),
      },
      heading("Will we be replaced?"),
      paragraph(
        "In the panel, moderated by Christina Wiig of Startuplab, Marcus Horn (Dotspot) and Lone Werness Bekkeheien (Marselia Robotics) pointed out that many people in the field look forward to getting rid of boring tasks, and believe it will free up time for more important work. As with generative AI, the key is to let employees decide and become the experts on what should be automated, and how. Mandate, budget and ownership belong in the line organisation. In other words: good change management.",
      ),
      paragraph(
        "This matters to all of us. Half of the world economy is physical work, and sectors such as health, hospitality and mobility need more hands. Imagine a humanoid that cleans and tidies, so home care workers have time to sit down with the elderly. \"People will now get more time for people,\" said Julian Alexander Hahn of Wybe.",
      ),
      {
        type: "figure",
        credit: photoCredit,
        figure: photo(
          "/news/humanoids-5.jpg",
          1600,
          1096,
          "From left: Sigrid Kjønnø Schaanning (Cognite), Marcus Horn (Dotspot), Lone Werness Bekkeheien (Marselia Robotics), Christian Rokseth (Humanoid.guide) and moderator Christina Wiig (Startuplab).",
        ),
      },
      heading("A late visitor from Moss"),
      paragraph(
        "Julian Alexander Hahn, founder of Wybe Robotics in Moss, arrived at the very end with a humanoid in tow. Wybe builds what it calls robotic employees. It starts as software on a small on-premises device, the Wybe Node, which handles calls, emails, scheduling and follow-ups around the clock in more than 30 languages. When a role needs hands, the same \"brain\" can be given a humanoid body for cleaning, reception or security. Wybe buys the robot bodies from hardware partners and installs its own software, safety systems and intelligence at its R&D lab in Moss. Consumers can now reserve a Wybe for the home, guided at first through VR teleoperation, with deliveries to Norwegian homes planned before the new year.",
      ),
      {
        type: "gallery",
        frame: false,
        credit: photoCredit,
        figures: [
          photo(
            "/news/humanoids-8.jpg",
            1600,
            1066,
            "Julian Alexander Hahn of Wybe Robotics (right) presents the Wybe, steered by a colleague wearing a VR headset.",
          ),
          photo(
            "/news/humanoids-7.jpg",
            1600,
            1146,
            "A member of the Wybe team tries VR teleoperation of the humanoid.",
          ),
        ],
      },
      heading("Missed this time: Per Ivar Selvaag"),
      paragraph(
        "Per Ivar Selvaag, former VP of Design at 1X Technologies, where he led the design of the NEO home humanoid, and a lead designer at BMW before that, was due to speak but was ill on the day. His planned talk argued that the uncanny valley is a business problem, not an aesthetic one: whether people accept a humanoid in their home or workplace comes down to design. We hope to hear him at a later event.",
      ),
      heading("What should you do?"),
      paragraph(
        "Those who start early gain a big advantage when the technology matures. Do you have tasks that are physical, repetitive, boring or unsafe? Map them. Collect data. Test. Robot Garden at Fornebu is a physical test arena for industry, and digital simulations take you a long way. Lars-Fredrik Forberg, who also presented the Robotics Norway network and its charter at the event, is building Kinetic Blocks, a marketplace for robot training data.",
      ),
      paragraph(
        "And at home? Many are waiting for their Neo from 1X, and you can now also rent one through Wybe in time for Christmas. Perhaps 2026 is the last year you sort your own laundry.",
      ),
      paragraph(
        "Bettina Lycke of Startuplab closed the afternoon, and the conversation continued over mingling with humans and humanoids alike.",
      ),
      {
        type: "figure",
        credit: photoCredit,
        figure: photo("/news/humanoids-6.jpg", 1600, 926, "Guests meet the humanoid after the talks."),
      },
      paragraph(
        "Thanks to everyone who took part, and especially to Christian Rokseth (Humanoid.guide), Sigrid Kjønnø Schaanning (Cognite), Lars-Fredrik Forberg (Kinetic Blocks), Marcus Horn (Dotspot), Lone Werness Bekkeheien (Marselia Robotics), Julian Alexander Hahn (Wybe Robotics), and the driving force Christina Wiig (Startuplab).",
      ),
    ],
  },
  {
    slug: "robotics-norway-is-founded",
    title: "Robotics Norway is founded",
    date: "2026-11-05",
    order: 1,
    tags: ["Network"],
    excerpt:
      "Participants met in person and online at StartupLab in Oslo on 5 November 2026 for the founding meeting of the Robotics Norway network.",
    hero,
    photoCredit: photoCredit,
    blocks: [
      paragraph(
        "On 5 November 2026, Robotics Norway held its founding meeting at StartupLab in Oslo. Participants joined in person and online. The public charter from the meeting describes Robotics Norway as the network and cluster for Norwegian companies that build robots, physical AI, and the data and software around them.",
      ),
      paragraph(
        "The charter states the purpose of the network. It is to give members a shared route to buyers, partners, talent and investors, at home and abroad. It is written for companies and organisations in robotics and physical AI, and it is also open to individuals who join as private members. The wording is the English text from the founding-meeting slides, whose title is CHARTER / WHAT ROBOTICS NORWAY WILL BE. That text is published on this site.",
      ),
      paragraph("The charter has six points."),
      paragraph(
        "Open membership. The network is open to companies and organisations in robotics and physical AI, and to individuals as private members.",
      ),
      paragraph(
        "Run by its members. Members elect the steering group and take turns as administrator, one year at a time.",
      ),
      paragraph(
        "Five hundred robot labs. The charter calls for labs in Norwegian cities where members test, collect data and demonstrate, starting at StartupLab. The heading on the slide is 500 robot labs.",
      ),
      paragraph(
        "Study trips. Members are to make joint trips to Odense, San Francisco and Shenzhen to meet clusters, buyers and manufacturers together.",
      ),
      paragraph(
        "A door to the Bay Area. The charter describes a funded project, led by Innovation Norway, that introduces Norwegian robotics companies to the Bay Area.",
      ),
      paragraph(
        "Trust between members. Market information shared in the network stays confidential, and every member runs its own business freely.",
      ),
      {
        type: "gallery",
        credit: photoCredit,
        figures: [
          {
            src: "/news/opening-2.jpg",
            alt: "Lars-Fredrik Forberg, who chaired the founding meeting, presents next steps for Robotics Norway to participants in the room and online.",
            width: 1600,
            height: 1066,
            caption:
              "Lars-Fredrik Forberg, who chaired the founding meeting, presents next steps for Robotics Norway to participants in the room and online.",
          },
          {
            src: "/news/opening-3.jpg",
            alt: "Participants exchange ideas beside the staircase during the founding meeting.",
            width: 1600,
            height: 1052,
            caption: "Exchanging ideas beside the staircase.",
          },
          {
            src: "/news/opening-4.jpg",
            alt: "Participants network outside the StartupLab Hardware space.",
            width: 1600,
            height: 1012,
            caption: "Outside StartupLab Hardware.",
          },
          {
            src: "/news/opening-5.jpg",
            alt: "Lars-Fredrik Forberg chaired the founding meeting of Robotics Norway.",
            width: 976,
            height: 1600,
            caption: "Lars-Fredrik Forberg chaired the founding meeting of Robotics Norway.",
            objectPosition: "center 18%",
          },
        ],
      },
      paragraph(
        "Taken together, the points describe a network run by its members. They elect the steering group and take turns as administrator, one year at a time. They share a route to buyers, partners, talent and investors in Norway and abroad. Market information shared among them stays confidential, and each member runs its own business freely. The practical work named in the charter is robot labs in Norwegian cities, starting at StartupLab, joint study trips to Odense, San Francisco and Shenzhen, and a funded Bay Area project led by Innovation Norway. The same six headings are published on the front page of this site.",
      ),
      heading("What the meeting agreed"),
      paragraph(
        "Around 30 companies and organisations took part, in the room and online, from startups to Ruter, Posten Bring, Cognite and Oslo kommune. The participants backed the initiative and agreed on three things.",
      ),
      paragraph(
        "A small steering group was formed, with Daniel Kjøle Skogland (Saro Robotics), Eva (Necia), Christian Rokseth (Humanoid.guide) and Runway FBU confirmed, and others invited to join. Four to five companies signed up their interest in \"A door to the Bay Area\", and a letter of intent is now going out so the network can apply to Innovation Norway. Around 16 people raised their hands for a study trip to Shenzhen, which will be coordinated with the Norwegian Robotics Cluster.",
      ),
      paragraph(
        "Robotics Norway is meant to complement existing networks such as the Norwegian Robotics Cluster and Necia, not compete with them, and members are free to take part in several. Before any new labs are built, the network will map the robot labs and test arenas that already exist across Norway.",
      ),
      {
        type: "paragraph",
        runs: [
          { text: "Read the " },
          {
            text: "full minutes of the founding meeting",
            href: "https://docs.google.com/document/d/1-pAQCUOvl1dilJpSmy71cnD_6kyUWEN35i8tzrYDHSk/edit",
          },
          { text: "." },
        ],
      },
      paragraph(
        "The agenda of the founding meeting covered adopting the charter, the \"A door to the Bay Area\" project, administration, the budget and a steering group. Participants were there in person at StartupLab and online.",
      ),
      {
        type: "paragraph",
        runs: [
          {
            text: "Companies, organisations and individuals who want to take part can find out how to join on the ",
          },
          { text: "Join page", href: "/join" },
          {
            text: ". The projects anchored in the network, including \"A door to the Bay Area\", are described on the ",
          },
          { text: "Projects page", href: "/projects" },
          { text: "." },
        ],
      },
      {
        type: "paragraph",
        runs: [
          { text: "Read Shifter's coverage of the founding meeting (in Norwegian): " },
          {
            text: "Starter nytt robotikk-nettverk",
            href: "https://www.shifter.no/nyheter/starter-nytt-robotikk-nettverk/481686",
          },
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug) ?? null;
}

export function compareArticles(a: Pick<NewsArticle, "date" | "order">, b: Pick<NewsArticle, "date" | "order">) {
  const byDate = b.date.localeCompare(a.date);
  if (byDate !== 0) return byDate;
  return (b.order ?? 0) - (a.order ?? 0);
}

export function articlesByDate() {
  return [...articles].sort(compareArticles);
}

export function formatNewsDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) return isoDate;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function articlePlainText(article: NewsArticle) {
  const parts = [
    article.excerpt,
    article.tags?.join(", "),
    article.hero?.caption,
    article.video?.caption,
    article.photoCredit,
  ].filter((part): part is string => Boolean(part));
  for (const block of article.blocks) {
    if (block.type === "paragraph") {
      parts.push(block.runs.map((run) => run.text).join(""));
    } else if (block.type === "heading") {
      parts.push(block.text);
    } else if (block.type === "figure") {
      parts.push(block.figure.caption);
      if (block.credit) parts.push(block.credit);
    } else if (block.type === "video") {
      parts.push(block.video.caption);
      if (block.credit) parts.push(block.credit);
    } else {
      parts.push(...block.figures.map((figure) => figure.caption));
      parts.push(block.credit);
    }
  }
  return parts.join("\n\n");
}

export function articleBodyWordCount(article: NewsArticle) {
  const text = article.blocks
    .flatMap((block) => (block.type === "paragraph" ? [block.runs.map((run) => run.text).join("")] : []))
    .join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}
