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
    slug: "veien-til-fysisk-ki",
    title: "Veien til fysisk KI: Norwegian Robotics Cluster event on physical AI",
    date: "2026-11-28",
    order: 1,
    tags: ["Events"],
    place: "Vestlandshuset, Bergen",
    excerpt:
      "On Tuesday 1 December, Norwegian Robotics Cluster hosts the breakfast meeting Veien til fysisk KI at Vestlandshuset in Bergen. The programme looks at adaptive systems that point towards physical AI, with cases from Retrams, Zivid and TYO Automation. Registration is open.",
    hero: photo(
      "/news/veien-til-fysisk-ki.jpg",
      960,
      548,
      "A robot arm reaches into warehouse storage bins. Lead image from the Norwegian Robotics Cluster event page for Veien til fysisk KI.",
    ),
    photoCredit: "Image: Norwegian Robotics Cluster",
    blocks: [
      {
        type: "paragraph",
        runs: [
          { text: "On Tuesday 1 December 2026, " },
          { text: "Norwegian Robotics Cluster", href: "https://www.robotcluster.no/arrangementer/veien-til-fysisk-ki" },
          { text: " is holding the breakfast meeting Veien til fysisk KI at Vestlandshuset, Vestre Strømkaien 13, in Bergen. The meeting runs from 08:00 to 10:00, with registration, breakfast and mingling from 08:00 and a welcome at 08:30." },
        ],
      },
      paragraph(
        "Physical AI, as the organisers define it, is artificial intelligence that can independently solve physical tasks, for example through robots. The programme looks at how advanced AI-based systems are already used to solve complex physical tasks, and at the new possibilities opening up with models that connect vision, language and action — large behaviour models, or vision-language-action models — which are now developing rapidly. The meeting will open with a short recap of the first breakfast in the series, Fysisk KI – den neste revolusjonen, so that those who did not attend earlier can follow the programme.",
      ),
      heading("The programme"),
      paragraph(
        "Bård Sandal, director of business, planning and innovation at Vestland County Municipality, gives the welcome. He will talk about how the county's work with regional development actors is meant, among other things, to increase the use of artificial intelligence in industry and other sectors.",
      ),
      paragraph(
        "Vidar Tufteland, managing director of the Robotics Competence Centre (Kompetansesenteret for robotteknologi, KORT) and cluster lead of Norwegian Robotics Cluster, will give a short recap of the first meeting and some highlights from recent technology development. He will then turn to the day's theme: adaptive systems that point towards physical AI, and give an overview of where the market stands and what is changing.",
      ),
      paragraph(
        "Stein Asle Øvrebotn, founder and managing director of Retrams AS, will present an AI-based solution for identifying and sorting surgical equipment. The solution was developed for the health sector, but the organisers note that the technology has transfer value to other industries. Johannes Møgster, CTO of Retrams, will talk about the opportunities the company sees as its team begins to experiment with models for physical AI.",
      ),
      paragraph(
        "Jørgen Hjemmen Andersen, application engineer at Zivid AS, will talk about advanced 3D cameras and machine-vision technology that let robots perceive their physical surroundings and form a basis for intelligent handling of objects, with concrete examples and his perspectives on how physical AI can open new possibilities.",
      ),
      paragraph(
        "Steffen Viddal, CTO of TYO Automation Viddal AS, will go through an ongoing development project on adaptive robot grippers that automatically adapt to different objects and tasks, intended to increase flexibility in the use of robots.",
      ),
      paragraph(
        "The meeting closes with a sofa conversation, Utvikleren møter forskeren, between a technologist and a researcher on the opportunities, challenges and the road ahead towards physical AI, including how vision-language-action (VLA) models will change robotics and when the technology will be mature enough for practical use. There will also be time for questions from the audience. Johannes Møgster, CTO of Retrams AS / Mojo Tech, and Daniel Schäle, a PhD research fellow at HVL Robotics, take part. The conversation is moderated by Espen Børhaug, head of communications at Bergen Næringsråd. The meeting is chaired by Anette Larsen, project manager at the Robotics Competence Centre.",
      ),
      heading("Register"),
      paragraph(
        "The breakfast meeting is the second in a series on physical AI organised by Norwegian Robotics Cluster in collaboration with the Robotics Competence Centre, Industriutvikling Vest, Bergen Næringsråd, Næringsalliansen, Vestland County Municipality and the Western Norway University of Applied Sciences (Høgskulen på Vestlandet). The first meeting is being staged again in Florø on 28 January. A third meeting, En ny hverdag med fysisk KI, is planned for the new year and will look at the development of humanoids.",
      ),
      {
        type: "paragraph",
        runs: [
          { text: "The full programme is on the " },
          { text: "event page", href: "https://www.robotcluster.no/arrangementer/veien-til-fysisk-ki" },
          { text: ". " },
          { text: "Register with Bergen Næringsråd", href: "https://www.bergen-chamber.no/arrangementer/moeteserie-veien-til-fysisk-ki/registration" },
          { text: "." },
        ],
      },
    ],
  },
  {
    slug: "ilya-orlov-robot-data-lab-bangkok",
    title: "Ilya Orlov's long road to a robot data lab in Bangkok",
    date: "2026-11-26",
    order: 2,
    tags: ["Network"],
    place: "Bangkok",
    excerpt:
      "After CoRL 2026 in Austin, Ilya Orlov wrote that raw hours of robot data are getting cheap, and that the durable bet is teleoperation data and physical infrastructure. That is why FileMarket, the company he founded, is building a robot data collection centre in Bangkok. The path there ran through a crypto wallet, a Techstars pivot, and a call centre in Kathmandu.",
    hero: photo(
      "/news/ilya-orlov-filemarket-kathmandu.jpg",
      1536,
      1024,
      "FileMarket's offices in Lazimpat, Kathmandu, with the company name on the facade. Kathmandu remains the company's main collection hub.",
    ),
    photoCredit: "Photos: FileMarket",
    blocks: [
      paragraph(
        "After four days at the Conference on Robot Learning in Austin this month, Ilya Orlov came back with a clear conclusion. Almost every major talk, he wrote, came back to data. Egocentric human video is now a foundation layer for robot models. Raw, generic hours are getting cheap. The durable bet, in his view, is teleoperation data and physical infrastructure.",
      ),
      {
        type: "paragraph",
        runs: [
          { text: "\"That's why we're building a robot data collection center in Bangkok,\" he wrote after the conference, in a " },
          {
            text: "report published on LinkedIn",
            href: "https://www.linkedin.com/pulse/raw-hours-getting-cheap-what-robot-labs-want-from-data-ilya-orlov-xyh2c",
          },
          { text: "." },
        ],
      },
      {
        type: "paragraph",
        runs: [
          { text: "Orlov is the founder and chief executive of " },
          { text: "FileMarket", href: "https://filemarket.ai" },
          { text: ", a company that organises robotics training data for AI labs and robot makers. He is based in Bangkok and has been building startups for about 15 years. The new centre is meant for collecting teleoperation data and running evaluations, the work he now thinks robot labs will pay for as bulk video becomes a commodity." },
        ],
      },
      {
        type: "figure",
        credit: "Photo: FileMarket",
        figure: photo(
          "/news/ilya-orlov.jpg",
          640,
          640,
          "Ilya Orlov, founder and chief executive of FileMarket.",
        ),
      },
      heading("A theory about data, then a call centre"),
      paragraph(
        "The road there was not a straight line. In a post this autumn he went back to the beginning. He started launching digital projects in 2012, and by 2014 startups were his full-time life. In 2016 he went deep into blockchain, convinced that giving people control over their own data could change society. \"I love political philosophy,\" he wrote, \"so an interest in permissionless, programmable open databases became a theory about humanity's future. Fairly modest ambitions.\"",
      ),
      paragraph(
        "FileMarket began in 2022 as a way for people to store, share and sell files through a crypto wallet, with on-chain provenance. The aim was to make people the custodians of their digital assets. In 2024 the company joined Techstars and pivoted. The idea, he says, stayed the same: help people monetise their data. This time, people could contribute images and videos, get paid, and build crowdsourced datasets that AI companies would buy.",
      ),
      paragraph("That was how FileMarket became a data collection company."),
      {
        type: "figure",
        credit: "Photo: FileMarket",
        figure: photo(
          "/news/ilya-orlov-filemarket-team.jpg",
          1320,
          968,
          "Orlov, front and centre in a Techstars hoodie, with the FileMarket team in Kathmandu.",
        ),
      },
      paragraph(
        "In 2025 he was living in Kathmandu when Evgenii joined him. They had a paying client and opened a call centre to collect speech data. \"Somewhere between wanting to change the data economy and running a call centre in Nepal, my days had become quite different from what I'd imagined.\"",
      ),
      paragraph(
        "They recruited people, managed collection, checked quality and delivered to clients. \"You quickly learn that selling something and executing it are two separate skills. Ideally, you need both at once.\"",
      ),
      {
        type: "figure",
        credit: "Photo: Ilya Orlov / FileMarket",
        figure: photo(
          "/news/ilya-orlov-filemarket-kathmandu-rooftop.jpg",
          800,
          600,
          "Orlov, third from the left, with colleagues overlooking Kathmandu.",
        ),
      },
      paragraph(
        "By the end of that year they realised the same pipeline worked for video. Physical AI companies needed recordings of people doing things in the real world. Kathmandu remains FileMarket's main collection hub. The company now lists a 15-person core team, more than 3,000 project-based contributors, and 120 custom capture rigs. On its website it says it has delivered more than 40,000 hours of accepted first-person video for a leading US humanoid robotics company, in a project involving more than 1,000 contributors.",
      ),
      {
        type: "figure",
        credit: "Photo: FileMarket",
        figure: photo(
          "/news/ilya-orlov-filemarket-egocentric.jpg",
          1280,
          720,
          "A first-person recording of packing goods into a carton, of the kind FileMarket collects to train robot models.",
        ),
      },
      paragraph(
        "The company collects first-person video of real tasks, handheld-gripper demonstrations and teleoperation on robot hardware, and, for custom projects, hand and tactile data. It works with collection partners across regions and says it runs projects around a shared specification for capture, quality checks, consent and licensing.",
      ),
      paragraph(
        "A group chat Orlov started has grown into a community of more than 500 startup founders and industry people in physical AI and data collection. \"Many of us compete, collaborate, and help each other deliver projects. It's a funny industry that way.\"",
      ),
      heading("What he heard at CoRL"),
      paragraph(
        "Orlov spent 9 to 12 November at CoRL 2026 in Austin listening for what robot learning teams actually want from data, and published the long report afterwards.",
      ),
      paragraph(
        "NVIDIA's EgoScale, he noted, showed a scaling law: robot performance rose with hours of human egocentric data. Their recipe used about 50 hours of human video plus four hours of robot teleoperation. AgiBot put the division of labour simply, in his notes: \"Human videos teach dynamics, robot trajectories teach actions.\"",
      ),
      paragraph(
        "The message that mattered most for collectors, he wrote, came from Russ Tedrake of MIT and Walden Robotics: mid-training data is being commoditised, there is now a huge ecosystem of data providers, and the cost is going down. NVIDIA and Lightwheel are each open-sourcing 100,000 hours of human or egocentric data. \"If your business is raw, generic hours, the price floor is moving toward zero.\"",
      ),
      paragraph(
        "What buyers will pay for next, in his ranking, is force, torque and touch; failure, recovery and intervention data; dexterous, heavy-payload capture useful for humanoids; occupational egocentric data from real workplaces; and, over time, data from robots already in deployment. \"In the limit, deployed robot data will dwarf everything else,\" Tedrake said, in Orlov's notes.",
      ),
      paragraph(
        "His own read of the room is that demand for diverse egocentric, UMI and teleoperation data stays heavy into 2028, then shifts toward targeted top-ups, annotation and evaluation, and later toward deployment data and fleet services. \"The bulk-data boom is real, but it is a phase. The durable value sits in physical infrastructure: specialized data, real-world evaluation and deployment support.\"",
      ),
      paragraph(
        "That is the bet behind the Bangkok centre. He has also said he wants robotics arenas there to host competitions and games. \"If we're building robotics arenas, we should have some fun with them.\" An earlier post mentioned plans that start with robot Muay Thai.",
      ),
      paragraph(
        "Robotics Norway spoke with Orlov this week, after he had published the CoRL report. For a Norwegian robotics network, the interest is practical. Training data, and the physical work of collecting it, is now a central constraint in robot learning, not a side issue. FileMarket's path, from a theory about data ownership to a call centre in Kathmandu and a planned lab in Bangkok, is one version of how that industry is being built.",
      ),
      {
        type: "paragraph",
        runs: [
          { text: "He also filmed the trip, from a Waymo ride to the expo floor. The video is on " },
          { text: "YouTube", href: "https://youtu.be/LQov0DgtJlE" },
          { text: "." },
        ],
      },
    ],
  },
  {
    slug: "five-lessons-ai-product-startuplab",
    title: "Five lessons from taking an AI product from zero to millions in revenue",
    date: "2026-11-26",
    order: 1,
    tags: ["Events"],
    place: "StartupLab, Oslo",
    excerpt:
      "At StartupLab's AI X Breakfast, Pradeep Sankaran, chief product officer at Puzzel and formerly senior vice president of product at Gelato, shared five lessons from taking an AI quoting product from a prototype to more than €1 million in signed annual recurring revenue. Asked about robotics, he said that if it is the brain of the hardware, he does not see why the same approach would be any different.",
    hero: photo(
      "/news/five-lessons-ai-product-startuplab.jpg",
      1600,
      1200,
      "Pradeep Sankaran at AI X Breakfast at StartupLab, in front of a slide on how cheap it has become to produce code, and how that is not the same as building something people will pay for.",
    ),
    photoCredit: "Photos: Lars-Fredrik Forberg",
    blocks: [
      {
        type: "paragraph",
        runs: [
          { text: "This morning at " },
          { text: "StartupLab", href: "https://www.startuplab.no" },
          { text: " in Oslo, Christina Wiig opened another AI X Breakfast, the biweekly series on building with AI. Robotics Norway has a partner programme with StartupLab." },
        ],
      },
      {
        type: "paragraph",
        runs: [
          { text: "She introduced Pradeep Sankaran, who joined " },
          { text: "Puzzel", href: "https://www.puzzel.com" },
          { text: ", a customer experience and contact centre company, as chief product officer in October. Before that he spent eight years at Gelato, latterly as senior vice president of product, as the company grew from a small team to more than €100 million in revenue. He had also been an entrepreneur in residence at StartupLab." },
        ],
      },
      paragraph(
        "\"It has never been cheaper to produce code,\" he said, standing in front of GitHub charts climbing through 2026. \"But what matters is really building something that people will actually pay for.\"",
      ),
      paragraph(
        "He drew on the AI Estimator, a quoting engine from his last two years at Gelato. Manufacturers and printers still take a day, sometimes a week, to answer a simple question: how much would this cost? The product was meant to get a quote back in seconds.",
      ),
      heading("Find what they'll actually pay for"),
      paragraph(
        "The risk, in a phrase they used at Gelato, was building an empty airport: a beautiful terminal, and nobody who wants to fly there.",
      ),
      paragraph(
        "Before writing any code, the team spoke to 30 customers. The most common request was one tool that would solve everything. \"One tool to solve it all is like the worst insight that you can get from a customer to try and build for it,\" he said.",
      ),
      paragraph(
        "They flew customers to Madrid and sat them in a room for eight hours. The real pressure was fixed cost: they needed to fill machines and people, and therefore to win more jobs. Speed and better pricing would help.",
      ),
      paragraph(
        "\"Get commitment or willingness to pay before you build. That is the most important part.\" For most B2B products, a Silicon Valley Product Group rule of thumb is about six customers who will sign a paper: a profitable price, a specific pain, a date. The team aimed for six and signed more.",
      ),
      heading("Build at the edge of what's possible"),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg",
        figure: photo(
          "/news/five-lessons-ai-product-startuplab-the-edge.jpg",
          1600,
          1200,
          "Sankaran points to the edge on a slide of a Norwegian fjord: safe ground, the edge, and too far out.",
        ),
      },
      paragraph(
        "Adding a chat bubble to a knowledge base and calling yourself an AI company is \"safe ground,\" he said: the technology works, and nobody pays for it. The place to build is at the edge of what the models can do, about three to six months out.",
      ),
      paragraph(
        "When they first put the estimator on GPT-4, it handled about 60 percent of cases, \"which is absolutely useless,\" he said. \"You have to solve 100 percent of a customer's problem. They don't care whether it's AI hallucinating or it just means your product doesn't work.\" Then the models improved. GPT-4o, and the ones after it, let the team strip out guardrails and leave more of the judgment to the model. At Puzzel, the current bet is voice: that in about three months a call to a bank can still sound like AI, but do the job.",
      ),
      paragraph(
        "Knowing where that edge will be is \"more art than science,\" he said later: spend time with the technology yourself, and do not take benchmarks on trust.",
      ),
      heading("Make agents team members, not tools"),
      paragraph(
        "Most people still use the web version of ChatGPT, he said, and start from scratch every time. \"It's a smart intern. I am babysitting it every single minute or hour.\"",
      ),
      paragraph(
        "To make an intern useful you would not reintroduce the company every morning. Agents need the same: context, skills, orchestration, and inputs from systems such as a CRM or Jira. He called the working setup a Team OS: markdown files in Git or a shared drive, connections to the company's tools, and routines that sync call notes and email, so the intern can find answers without being asked.",
      ),
      paragraph(
        "He also described a newer Personal OS: an hourly sync, a daily check that confidential material stays put, and a weekly lint that moves stale notes to the back of the brain.",
      ),
      heading("Don't celebrate the prototype"),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg",
        figure: photo(
          "/news/five-lessons-ai-product-startuplab-prototype.jpg",
          1600,
          1200,
          "Lesson four: don't celebrate the prototype. Never been easier to prototype, never been harder to reach revenue.",
        ),
      },
      paragraph(
        "The estimator prototype blew people's minds. Buyers signed letters of intent worth more than €1 million in annual recurring revenue, conditional on delivery, and it felt like a milestone. \"That was the mistake,\" he said, \"because 99 percent plus of the work actually comes after that.\"",
      ),
      paragraph(
        "Price calculation has to be deterministic: the same job must return the same answer every time. When the first version produced decimal-level discrepancies, customers said they could never use it. Parsing messy requests could stay non-deterministic; that was where the model earned its keep. The price engine had to be written back as proper code.",
      ),
      heading("Become the builder"),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg",
        figure: photo(
          "/news/five-lessons-ai-product-startuplab-become-the-builder.jpg",
          1600,
          1200,
          "Lesson five: become the builder, cutting the handoffs between customer, product manager, designer and engineer.",
        ),
      },
      paragraph(
        "The last lesson was the human collaboration tax: every handoff slows an early AI product down. For new AI products, his team had no dedicated designer and no QA. The requirements document became a markdown file plus a prototype, then a short meeting with the pilot customers. Anyone could push a simple change; a proper engineer had to review every pull request.",
      ),
      paragraph(
        "AI does not replace product sense, he said, or deep system expertise. The shift from manager to player-coach was uncomfortable. It was also, he said, more fun.",
      ),
      heading("The brain of the hardware"),
      paragraph(
        "In the questions, someone asked whether a Team OS could take in physical AI, knowledge of work on construction sites and in hospitals, and later plug that into robotics. Sankaran said he is not a hardware person at the moment, though he used to be. \"But for me, if it's the brain of the hardware, I don't see why it would be any different.\"",
      ),
      paragraph(
        "The same questions apply: how you give an agent the context to act, and what must be exact.",
      ),
    ],
  },
  {
    slug: "lito-touch-data-for-robots",
    title: "Lito is collecting the touch data robots still lack",
    date: "2026-11-24",
    order: 1,
    tags: ["Network"],
    place: "StartupLab, Oslo",
    excerpt:
      "Lito, a Robotics Norway member at StartupLab, builds handheld grippers with touch sensors that record how people handle objects. The data is used to train robot models. This week the team is mounting new sensors, and on 1 December cofounder Thomas Sørensen travels to San Francisco.",
    hero: photo(
      "/news/lito-touch-data-for-robots.jpg",
      1600,
      1067,
      "Hands handling a soft fabric, from Lito's website.",
    ),
    photoCredit: "Photo: Lito, from lito.so",
    blocks: [
      {
        type: "paragraph",
        runs: [
          { text: "Lito, a member of Robotics Norway, builds handheld grippers with touch sensors that record how people handle things: video, movement and what the fingers feel. The recordings are used to train robot models. The company is based at StartupLab in Oslo, where it is part of the Mad House accelerator, and describes itself as a robotics data lab. Its site is " },
          { text: "lito.so", href: "https://lito.so/" },
          { text: "." },
        ],
      },
      paragraph(
        "\"Robots have become good at seeing, but almost no data today includes touch, and that is where many tasks fail, such as inserting a plug or holding something fragile,\" says Thomas Sørensen, cofounder and CEO.",
      ),
      paragraph(
        "According to Lito, the grippers are wireless and record people doing real manipulation tasks from the same view and grip a robot will have. Each recording captures stereo video, motion and gripper opening, together with the tactile signal of what the fingers feel. A pipeline checks every session automatically and turns it into training-ready datasets for robotics labs and companies. The team tests the data on its own robot arms before delivering it.",
      ),
      paragraph(
        "Lito was founded by Sørensen and Ludvig Øvrevik, the CTO, both from NTNU, with Ivar and Gabriel on the team. Shifter listed the company among those present when Robotics Norway was founded at StartupLab on 5 November.",
      ),
      paragraph(
        "This week the team is mounting new touch sensors on the grippers. On 1 December, Sørensen travels to San Francisco to meet the companies that train robot models.",
      ),
    ],
  },
  {
    slug: "runway-fbu-lab-demo-day",
    title: "Demo Day at Runway FBU's Industrial AI & Robotics Lab",
    date: "2026-11-23",
    order: 3,
    tags: ["Events"],
    place: "Aker Tech House, Fornebu",
    excerpt:
      "On Thursday 3 December, Runway FBU's Industrial AI & Robotics Lab presents its first cohort at Aker Tech House in Fornebu. Fifteen companies will pitch what they have built and tested over six months. Registration is on Luma.",
    hero: photo(
      "/news/runway-fbu-lab-demo-day.jpg",
      1403,
      1402,
      "The official poster for Industrial AI & Robotics Lab Demo Day on 3 December 2026 at Aker Tech House, Fornebu.",
    ),
    photoCredit: "Image: Runway FBU, from the official Luma event page",
    blocks: [
      paragraph(
        "Runway FBU, a Robotics Norway member, is hosting Industrial AI & Robotics Lab Demo Day on Thursday 3 December 2026 at Aker Tech House in Fornebu. The event runs from 16:00 to 22:00 and brings together more than 100 curated industry decision-makers, founders and investors. Fifteen companies from the Lab's first cohort will present what they have built and tested over six months. If a team catches a guest's attention, the organisers will help connect them to explore a pilot, partnership or investment. The afternoon is hosted by Sagar Chandna of Runway FBU / RunwayVC.",
      ),
      heading("The Lab"),
      {
        type: "paragraph",
        runs: [
          { text: "The Industrial AI & Robotics Lab is a six-month applied programme at Aker Tech House, running from June to December 2026. According to " },
          { text: "Runway FBU", href: "https://runwayfbu.com/lab" },
          { text: ", it brings technical founders together with industry partners to build, test and pilot industrial AI, autonomy and robotics on real problems, with real data and in real operating environments. The Lab is not an accelerator, and it does not take automatic equity. Runway FBU also runs a Tech Hub with more than 60 industrial tech companies at the same address, and is related to the venture fund RunwayVC." },
        ],
      },
      paragraph(
        "The Lab is made possible with support from Innovation Norway and the partners Aker BP, Aker BioMarine, NorSea Group, Danske Bank, NTNU, UiT, HUB Ocean, REV Ocean, Accenture, Telenor, Energy Valley, Bærum Municipality and Akershus County Council.",
      ),
      heading("The programme"),
      paragraph(
        "Welcome drinks in the Tech Hub begin at 16:00. At 16:30, Maria Katarina T. Michelsen will talk about six months inside the Lab: how it works, what the first cohort achieved, and what was learned from bringing founders and industry together.",
      ),
      paragraph(
        "From 16:40, Matts Johansen, CEO of Aker BioMarine, will speak about what the company has gained from the Lab, including how first meetings turned into pilot agreements, and what those pilots have delivered so far. Aker BP then joins Michelsen on stage to discuss what it is like to be a Lab partner, what working directly with founders has opened up for the company, and where it sees opportunities for AI and robotics in oil and gas.",
      ),
      paragraph(
        "From 17:00 to 18:15 the 15 Lab companies give short pitches on what they have built, what they have tested and what comes next. The companies on the programme are Digel, Saro Robotics, Eyer, TasteForge, Midpilot, Marselia Robotics, Availant, Palindrome AI, 3D Components, SASTECH, Lodestone Labs, Bevisera, Endwell, ANOX and Arctech Robotics.",
      ),
      {
        type: "paragraph",
        runs: [
          { text: "Three of them are also Robotics Norway members: Saro Robotics, Marselia Robotics and Endwell. Sondre Bø Kongsgård, who started Endwell, will present why Endwell was started. Endwell has also built a " },
          { text: "workspace for the robotics landscape in Norway", href: "/news/endwell-robotics-norway-workspace" },
          { text: "." },
        ],
      },
      paragraph(
        "At 18:15 the hosts will explain how Lab partners help shape which companies are scouted for the next cohort, and what it takes to join. From 18:30 to 22:00 there is food, drinks and time to meet the founders in the Cognite Lounge.",
      ),
      heading("Register on Luma"),
      {
        type: "paragraph",
        runs: [
          { text: "The event takes place at Aker Tech House, John Strandruds Vei 10, 1360 Fornebu. Registration is subject to host approval. " },
          { text: "Register on Luma", href: "https://luma.com/w3ct1r90" },
          { text: "." },
        ],
      },
    ],
  },
  {
    slug: "odense-robotics-gateway",
    title: "Odense Robotics, a gateway to Denmark's robotics, automation and drone industry",
    date: "2026-11-23",
    order: 2,
    tags: ["Network"],
    place: "Denmark",
    excerpt:
      "After a meeting with Odense Robotics, Robotics Norway looks at Denmark's national cluster — more than 440 companies, startups and knowledge institutions, the Insight Report 2026, and the International Drone Show in Odense on 2–3 June 2027.",
    hero: photo(
      "/news/odense-robotics-universal-robots-ur3.jpg",
      1600,
      1067,
      "A UR3 collaborative robot from Universal Robots, Odense, Denmark.",
    ),
    logo: photo("/news/odense-robotics-logo.png", 1184, 472, "Odense Robotics logo"),
    photoCredit: "Photos: Caio.st.oliveira / Wikimedia Commons (CC BY-SA 4.0); Odense Robotics; International Drone Show",
    blocks: [
      paragraph(
        "Robotics Norway president Lars-Fredrik Forberg met Odense Robotics on 23 November 2026. Rasmus Festersen, the cluster's chief commercial officer, followed up with a short briefing on the organisation, its annual Insight Report, and upcoming events.",
      ),
      paragraph(
        "Odense Robotics is Denmark's national cluster for robotics, automation and drones. It brings together more than 440 companies, startups, knowledge institutions and other actors across the ecosystem. Its focus is to strengthen innovation, growth and international scaling, and to build stronger links between technology, talent, capital and the market. Building on Denmark's robotics environment, the cluster works to develop the country's position as an international frontrunner in robotics, automation and physical AI, and describes itself as a gateway to the Danish robot, drone and automation industry.",
      ),
      paragraph(
        "The cluster is headquartered in Odense on Funen, with hubs in Northern Jutland, Central Jutland, Zealand and Southern Jutland.",
      ),
      heading("The Danish industry in figures"),
      {
        type: "paragraph",
        runs: [
          { text: "The wider industry is described in the Odense Robotics Insight Report 2026, the cluster's annual analysis, published in April. It draws on national statistics and a survey of member companies. The report is available from " },
          { text: "odenserobotics.dk", href: "https://www.odenserobotics.dk/publications-and-reports-and-analyses/" },
          { text: "." },
        ],
      },
      paragraph(
        "According to the report, Denmark had 667 robot, automation and drone companies and 20,300 people working in the industry. Turnover grew by 4.4% to EUR 4.8 billion in 2024, and exports rose by about 8% to EUR 2.6 billion. That is a clear slowdown from 2023, when turnover grew by 24% and exports by 39%. Companies remained optimistic: 48% expected higher turnover in 2025, and one in four anticipated growth above 20%.",
      ),
      paragraph(
        "The industry is also changing shape. 37% of companies reported expanding into new industries and application areas; among those, nearly half were targeting defence, space and security. 53% developed and launched new technological products in the past year. 58% pointed to artificial intelligence as a key trend for the year ahead, and 20% highlighted embodied AI. 64% of companies aim to increase sales to public customers.",
      ),
      {
        type: "figure",
        credit: "Image: Odense Robotics",
        figure: photo(
          "/news/odense-robotics-insight-report-2026.jpg",
          1600,
          1067,
          "The Odense Robotics Insight Report 2026, the cluster's annual analysis of Denmark's robotics, automation and drone industry.",
        ),
      },
      paragraph(
        "In the cluster's announcement of the report, CEO Søren Elmer Kristensen placed the slower growth in a global market marked by uncertainty, competition and geopolitical tension. \"The Danish robotics industry is born global, but a stronger domestic market can become an important lever – especially at a time when export markets are more uncertain. There is significant potential in both the public sector and among SMEs, where automation still lags behind. If we can accelerate implementation at home, it can strengthen companies and increase productivity across society.\"",
      ),
      heading("Events, and the International Drone Show"),
      {
        type: "paragraph",
        runs: [
          { text: "Odense Robotics publishes a calendar of events it hosts, takes part in or partners on at " },
          { text: "odenserobotics.dk/events", href: "https://www.odenserobotics.dk/events/" },
          { text: ". Festersen also pointed to the International Drone Show, which returns to Odense on 2–3 June 2027." },
        ],
      },
      {
        type: "paragraph",
        runs: [
          { text: "The show is jointly organised by Odense Robotics and UAS Denmark Test Center and is held at Hans Christian Andersen Airport. The official site describes it as Northern Europe's leading event for drones and unmanned systems. The 2026 edition brought 1,500 participants from 41 countries and around 170 exhibitors to Odense. Details for 2027 are at " },
          { text: "internationaldroneshow.com", href: "https://internationaldroneshow.com/" },
          { text: "." },
        ],
      },
      {
        type: "figure",
        credit: "Photo: International Drone Show",
        figure: photo(
          "/news/odense-robotics-international-drone-show.jpg",
          1600,
          850,
          "A drone demonstration at the International Drone Show in Odense. The next edition is on 2–3 June 2027.",
        ),
      },
      {
        type: "paragraph",
        runs: [
          { text: "Odense Robotics is at " },
          { text: "odenserobotics.dk", href: "https://www.odenserobotics.dk/" },
          { text: "." },
        ],
      },
    ],
  },
  {
    slug: "endwell-robotics-norway-workspace",
    title: "Endwell has built a workspace for the robotics landscape in Norway",
    date: "2026-11-23",
    order: 1,
    tags: ["Network"],
    place: "Fornebu",
    excerpt:
      "Endwell, a Robotics Norway member, has created a workspace in its app with an overview of Robotics Norway companies and of robotics initiatives in Norway. Members can join the workspace through an invitation link.",
    hero: photo(
      "/news/endwell-norway-map.png",
      1600,
      1000,
      "A map of Robotics Norway member organisations, grouped by city.",
    ),
    photoCredit: "Map: Robotics Norway",
    blocks: [
      paragraph(
        "Endwell provides a collaborative platform connecting humans, agents and robots. The company's website focuses on one use case, plug and abandonment of offshore wells, but the platform itself is generic. Endwell is part of Runway FBU's AI & Robotics Lab, and joined Robotics Norway in November 2026.",
      ),
      paragraph(
        "Sondre Bø Kongsgård, who started Endwell, has built a workspace in the Endwell app with an overview of Robotics Norway companies and of robotics initiatives in Norway more generally, including public developments such as Equinor's marine robotics centre at Kårstø.",
      ),
      {
        type: "paragraph",
        runs: [
          { text: "Robotics Norway members can " },
          {
            text: "join the Robotics Norway workspace",
            href: "https://app.endwell.ai/join#aD4_JxCdPh0gFf9xSI_ri82tJ6hq27kS",
          },
          {
            text: " on Endwell. Create an account with your email and ask to join. The workspace's administrators approve each request, and new people join as guests, who can read and comment. Organisations that want to add or update their own information can ask to be made members.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          { text: "A map of Robotics Norway's member organisations is also on the " },
          { text: "members page", href: "/members" },
          { text: ", with a link to the app." },
        ],
      },
      paragraph(
        "Kongsgård will present why Endwell was started at Industrial AI & Robotics Lab Demo Day on 3 December at Aker Tech House in Fornebu, hosted by RunwayFBU, where Endwell is one of the 15 lab companies on the programme.",
      ),
      {
        type: "paragraph",
        runs: [
          { text: "Demo Day is listed at " },
          { text: "luma.com/w3ct1r90", href: "https://luma.com/w3ct1r90" },
          { text: "." },
        ],
      },
    ],
  },
  {
    slug: "norway-on-stage-at-slush",
    title: "Norway on stage at Slush",
    date: "2026-11-23",
    order: 0,
    tags: ["Events"],
    place: "Slush, Helsinki",
    excerpt:
      "Ingeborg Sofie Bogen, co-founder and COO of Saro Robotics, pitched at Innovation Norway's Look to Norway side event at Slush in Helsinki on 18 November 2026. She describes strong investor interest in hardware and a high appetite for European robotics. The same programme put Space Lab and Andøya Space on stage. On the exhibition floor, Robotics Norway president Lars-Fredrik Forberg also met Allonic, Pink Robotics and Swiss company coprod, which came out of stealth on 23 November.",
    hero: {
      ...photo(
        "/news/norway-on-stage-at-slush-ingeborg-bogen.jpg",
        1200,
        1600,
        "Ingeborg Sofie Bogen, co-founder and COO of Saro Robotics, pitching on the Oslo&Co stage at Innovation Norway's Look to Norway side event at Slush in Helsinki, with slides of offshore industrial inspection.",
      ),
      objectPosition: "center 60%",
    },
    photoCredit: "Photos: Lars-Fredrik Forberg / Robotics Norway",
    blocks: [
      {
        type: "paragraph",
        runs: [
          {
            text: "Ingeborg Sofie Bogen, co-founder and COO of Saro Robotics, pitched at Innovation Norway's Look to Norway side event at Slush in Helsinki on 18 November 2026. ",
          },
          { text: "Saro Robotics", href: "https://sarorobotics.space/" },
          {
            text: ", a Robotics Norway member based in Trondheim, is building autonomous pipe-climbing robots for the inspection of industrial infrastructure. Earlier this year, Saro Robotics won DNB's 100 Pitches competition.",
          },
        ],
      },
      paragraph(
        "After the trip, Bogen wrote to Robotics Norway that the energy at Slush was incredible, and that robotics is hotter than ever. \"Investors clearly want a hardware angle in their portfolios right now, and robotics is a natural fit,\" she said. \"The general optimism is high, and you really get the feeling that Europe is onto something big.\" She reported good conversations, especially with European venture funds from France and Germany, as well as American and Asian investors who are actively scouting what is being built in Europe.",
      ),
      paragraph(
        "\"For Saro Robotics, a major highlight was pitching at Innovation Norway's Look to Norway event. The theme was space, and the ambitions in the room were really bold. It was a great platform to showcase what we're building and see how Norway is positioning itself on the global stage.\"",
      ),
      paragraph(
        "Beyond the investor meetings, she said, a big takeaway was how valuable it is to connect with robotics founders from other countries. Meeting founders from other ecosystems was a reminder of how important it is to keep expanding the international network, and of how much there is to learn from how others tackle the same engineering and scaling challenges. \"The global appetite for European hardware is strong, and I'm excited to see what's next for the wider Norwegian robotics community,\" she wrote.",
      ),
      heading("Space Lab, Andøya Space and Look to Norway"),
      paragraph(
        "Look to Norway at Slush took place on Wednesday 18 November 2026, from 14:00 to 16:00, in the Partner Side Event Wing at Messukeskus in Helsinki. It was the fourth time Innovation Norway had gathered Norwegian startups and international investors at the event, and this year's theme was space. The English-language programme was organised with DNB, BI Norwegian Business School, Oslo&Co, 6AM, KUPA and StartupLab, and hosted by Helene Friis, marketing director at Innovation Norway. It opened with a talk from Andøya Space, followed by a founder and investor conversation between Space Lab and Skyfall Ventures, and closed with pitches from Havguard, Bev/Art and Saro Robotics.",
      ),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/norway-on-stage-at-slush-look-to-norway.jpg",
          1600,
          1200,
          "Helene Friis, marketing director at Innovation Norway, hosts Look to Norway at Slush on 18 November 2026, with partners DNB, BI, Oslo&Co, 6AM, KUPA and StartupLab.",
        ),
      },
      paragraph(
        "Ketil Olsen, CEO of Andøya Space, spoke under the title \"Turning Arctic Challenges into Strategic Advantage\".",
      ),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/norway-on-stage-at-slush-andoya.jpg",
          1600,
          1200,
          "Ketil Olsen, CEO of Andøya Space, presents \"Turning Arctic Challenges into Strategic Advantage\" at Look to Norway at Slush.",
        ),
      },
      paragraph(
        "Daniel Cau Varming, founder and CEO of Space Lab, then joined Jon Kåre Stene, partner and co-founder of Skyfall Ventures, for a conversation titled \"Building big. Betting early.\" Space Lab is developing Draken, a reusable rocket planned for launch from the sea. A slide during the panel showed the Draken vessel. On the same programme, Bogen pitched for Saro Robotics, alongside pitches from Havguard and Bev/Art.",
      ),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/norway-on-stage-at-slush-spacelab-draken.jpg",
          1200,
          1600,
          "Daniel Cau Varming, founder and CEO of Space Lab, and Jon Kåre Stene, partner and co-founder of Skyfall Ventures, in conversation under an image of Space Lab's Draken rocket at Innovation Norway's Look to Norway side event at Slush in Helsinki.",
        ),
      },
      heading("Robotics on the exhibition floor"),
      paragraph(
        "Away from the Norway programme, the robotics exhibition at Slush was one of the strongest parts of the event, according to Robotics Norway president Lars-Fredrik Forberg, who attended Slush and Look to Norway.",
      ),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/norway-on-stage-at-slush-allonic.jpg",
          1200,
          1600,
          "Áron Kecskés and Benedek Tasi of Allonic with the company's tendon-driven robotic hand at Slush.",
        ),
      },
      {
        type: "paragraph",
        runs: [
          { text: "At the booth of Hungarian company " },
          { text: "Allonic", href: "https://allonic.co/" },
          {
            text: ", Benedek Tasi, co-founder and CEO, and Áron Kecskés showed a tendon-driven robotic hand produced with the company's 3D tissue-braiding process.",
          },
        ],
      },
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/norway-on-stage-at-slush-pink-robotics.jpg",
          1200,
          1600,
          "Clemens Engelhardt of Pink Robotics with the company's humanoid at Slush 2026.",
        ),
      },
      {
        type: "paragraph",
        runs: [
          { text: "Nearby, the German company " },
          { text: "Pink Robotics", href: "https://www.pink-robotics.com/" },
          {
            text: " showed its humanoid, with Clemens Engelhardt at the stand. The company takes a different route from much of the field. According to the team, Pink Robotics built its robot very quickly without any external data, training it with reinforcement learning alone. The company works with a German logistics company on deploying robots in warehouses. At the stand, the team said they do not understand why other developers rely on egocentric data, the first-person human video that many humanoid companies collect to train their robots.",
          },
        ],
      },
      {
        type: "paragraph",
        runs: [
          { text: "Swiss company " },
          { text: "coprod", href: "https://coprod.co/" },
          {
            text: ", an EPFL spin-out Forberg met at the exhibition, came out of stealth on 23 November 2026 with a 6 million dollar pre-seed round led by Founderful and PROTOTYPE, with participation from General Catalyst, Pace Ventures, Tiny Supercomputer Investment Company, Kima Ventures, SDAC, Unruly Capital and Venturekick, as well as angel investors including Hugging Face founder Thomas Wolf. The company is building a modular hardware stack — power, battery, motion and sensing — on a single real-time EtherCAT bus with one software API, with the aim of making it simpler and cheaper to build purpose-built robots. At Slush, the founders described the EtherCAT stack as a basis they would like to see become a wider standard.",
          },
        ],
      },
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/norway-on-stage-at-slush-coprod.jpg",
          900,
          1600,
          "coprod's white bipedal robot, marked CO-PROD, hangs from a crane in the Partner Side Event Wing at Slush, with a glowing circular purple sensor on its torso.",
        ),
      },
      {
        type: "video",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        video: video(
          "/news/norway-on-stage-at-slush-coprod.mp4",
          "/news/norway-on-stage-at-slush-coprod.jpg",
          1080,
          1920,
          "The coprod bipedal robot, marked CO-PROD, is demonstrated hanging from a crane in the Partner Side Event Wing at Slush, lifting and extending one leg.",
        ),
      },
    ],
  },
  {
    slug: "teaching-robots-to-listen",
    title: "Teaching robots to listen",
    date: "2026-11-24",
    order: 0,
    tags: ["Network"],
    place: "Oslo",
    excerpt:
      "How an Oslo team turned two decades of Norwegian ultrasound research into a safety sensing layer for physical AI. Sonair, a member of Robotics Norway, contributed this article about the people and the story behind ADAR One, a 3D ultrasonic sensor already at work on commercial robots.",
    hero: photo(
      "/news/teaching-robots-to-listen-adar-one.jpg",
      1600,
      900,
      "A Sonair team member holds ADAR One, the company's first product.",
    ),
    photoCredit: "Photos: Sonair",
    blocks: [
      paragraph("This is a contributed article from Sonair, a member of Robotics Norway."),
      paragraph(
        "If you have ever watched a bat hunt at dusk, you already get the idea behind Sonair. Sound goes where light struggles. It doesn't care about glare, dust or glass. It just comes back and tells you what is there.",
      ),
      paragraph(
        "We are a team in Oslo, with a small commercial crew in Denmark and colleagues in Germany, building a sensor that gives robots that same sense. It is called ADAR, short for acoustic detection and ranging, and it lets a robot hear the space around it in 3D.",
      ),
      paragraph(
        "And this is not a lab project. ADAR One — our first product — is certified and already at work on robots in commercial deployment. More on that further down.",
      ),
      heading("It started in a lab"),
      paragraph(
        "Our story doesn't begin with a startup. It begins at SINTEF MiNaLab in Oslo, where researchers have worked on piezoelectric microsystems since 2002.",
      ),
      paragraph(
        "One of them was Frode Tyholdt, now one of our founders. Over many years, Frode and the team at MiNaLab managed to shrink high quality ultrasonic transducers from around 15 mm to just 2 mm. Make the transducers small enough, place them close enough together, and you can steer sound and do 3D beamforming in air. Nobody had done that commercially before.",
      ),
      paragraph(
        "The other half of the story came from industry. Knut Sandven, Sonair's CEO, had already built GasSecure, a safety sensor company based on MEMS technology, and seen it acquired by a German industrial safety company. When he went looking for what was next, the stars aligned. SINTEF had patented sensor technology that was ready to leave the lab. The robotics wave was building. And the engineering team he had built at GasSecure, people who had already taken a safety product all the way to market together, was ready to go again. So he brought them back together and started Sonair.",
      ),
      paragraph(
        "Put those together with roughly 25 years of ultrasound research across SINTEF, NTNU and UiO, support from Norwegian and European research programmes, and investors willing to back deep tech, and you get Sonair. It took time. That is how real technology gets built, and Norway turns out to be quite good at the long game.",
      ),
      heading("Why safety, and why now"),
      paragraph(
        "Robots are leaving their cages. AMRs, cleaning robots and the first humanoids are moving into warehouses, hospitals, shops and offices, sharing floor space with people who never signed up to work next to a machine.",
      ),
      paragraph(
        "The brains are getting better fast. Physical AI is moving from demo to deployment. But there is a catch that anyone who has tried to scale a fleet knows well: a robot that can't be trusted around people stays in the pilot. Insurers ask about it. Integrators ask about it. The person walking past it in the corridor feels it, whether they ask or not.",
      ),
      paragraph(
        "So for us, safety isn't the box you tick at the end. It is what lets you go from ten robots to ten thousand.",
      ),
      paragraph(
        "That is why we think of ADAR as a safety sensing layer. One compact sensor with a 180 by 180 degree field of view, 4 m range and 50 Hz update rate, certified to SIL 2 and PL d (IEC 61508, ISO 13849 and IEC 61496). It picks up glass, shiny surfaces and things in dusty or badly lit spaces that optical sensors can miss. It doesn't take pictures, which matters a lot in a hospital or a school. And because one sensor can do a job that used to need several, the safety architecture gets simpler and easier to certify.",
      ),
      paragraph(
        "A small detail our engineers are proud of: ADAR is the first safety certified embedded system written in Rust.",
      ),
      heading("The people"),
      paragraph(
        "Walk around our office and you meet an unusual mix. Researchers who have spent their careers on ultrasound and signal processing. Embedded engineers who chose a new language for safety critical code because they thought it was the right call, then did the work to prove it. Product people who come from the established safety sensor world and know exactly what a certification audit feels like.",
      ),
      heading("What we are working on right now"),
      paragraph(
        "The sensor is out of the lab and on real robots. Cleanfix in Switzerland runs ADAR on autonomous industrial cleaning machines, and beRobox has built it into its PALTZ palletizing system. Earlier this year ADAR won the Best Product award at LogiMAT.",
      ),
      {
        type: "figure",
        credit: "Photo: Sonair",
        figure: photo(
          "/news/teaching-robots-to-listen-cleaning-robot.jpg",
          1600,
          900,
          "An autonomous industrial cleaning robot sharing a warehouse floor with a person.",
        ),
      },
      {
        type: "figure",
        credit: "Photo: Sonair",
        figure: photo(
          "/news/teaching-robots-to-listen-berobox-paltz.jpg",
          1600,
          900,
          "The beRobox PALTZ palletizing system, with a 3D safety field shown around the robot arm.",
        ),
      },
      paragraph(
        "Right now we are focused on three things: getting ADAR into more fleets through integrators and partners, making it easy for robot builders to design it in from day one, and humanoids, where a small sensor that can sit flush in the body opens up new options.",
      ),
      {
        type: "paragraph",
        runs: [
          { text: "If you are building robots in Norway and want to see what it means to hear in 3D, come say hi. Sonair is at " },
          { text: "sonair.com", href: "https://sonair.com" },
          { text: "." },
        ],
      },
    ],
  },
  {
    slug: "humanoid-full-stack-playbook",
    title: "What makes us human? Humanoid builds robots to take on the work that holds us back",
    date: "2026-11-19",
    order: 4,
    tags: ["Events"],
    place: "Slush, Helsinki",
    excerpt:
      "At Slush in Helsinki, Artem Sokolov, founder and CEO of Humanoid, argued that hardware, AI, data and deployment have to be built as one system if humanoid robots are to work thousands of times a shift, not just once on stage. Robotics Norway president Lars-Fredrik Forberg attended the keynote, The full-stack playbook, on 19 November 2026.",
    hero: photo(
      "/news/humanoid-full-stack-playbook.jpg",
      1600,
      1200,
      "Artem Sokolov (Humanoid) on the Builder Stage at Slush, presenting The full-stack playbook.",
    ),
    photoCredit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
    blocks: [
      paragraph(
        "Robotics Norway president Lars-Fredrik Forberg attended The full-stack playbook, a keynote by Artem Sokolov, founder and CEO of Humanoid, on the Builder Stage at Slush in Helsinki on Thursday 19 November 2026, day 2 of the event. Humanoid, founded in London in May 2024, is valued at 1.35 billion dollars after a 152 million dollar Series A in July 2025, with 270 million dollars raised to date. The company has more than 350 people in London, Boston, San Diego and Vancouver.",
      ),
      paragraph(
        "Sokolov's argument was that a useful general-purpose robot cannot be built with scripted control, and that hardware or AI alone will not be enough. \"The future of physical AI won't be defined by hardware or AI alone. It will be defined by how well they work together,\" he said. Full stack, as he described it, means hardware, AI, data and deployment built as one system, with one company accountable for the result.",
      ),
      heading("The work that still needs a body"),
      paragraph(
        "Even in the digital age, Sokolov said, the world still runs on physical work, and there are not enough people to do it. By 2030, 85 million jobs could go unfulfilled, and by 2050 there will be 1.6 billion people over the age of 65, more than twice as many as today. About three million people die each year from accidents and disease at work. People also spend more than 60 billion hours a day on unpaid housework and care. Humanoid robots, he argued, can fill jobs that stay empty and take on work that harms people, in a world of factories, tools and homes designed for the human form. The human shape also helps with training, because most of the training data comes from people.",
      ),
      paragraph(
        "The timing, he said, is now right. A robot can run on a single end-to-end AI model and work on its own with the reliability industry needs, and with reinforcement learning a new skill can be taught in one working day. The constraint is no longer only the brain. Hardware supply is the bottleneck: the entire industry, he said, will produce only around five million robots by 2032, too few for the demand. A design principle he set out was to build hardware today for the AI that will exist in three years.",
      ),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/humanoid-two-platforms.jpg",
          1600,
          1200,
          "Artem Sokolov (Humanoid) sets out two platforms — a wheeled factory robot and a shared KinetIQ brain — on a path from plants in 2027 to homes in 2031.",
        ),
      },
      paragraph(
        "Humanoid is developing two platforms, with KinetIQ as a shared end-to-end AI framework. The first is a wheeled industrial robot, which Sokolov called the deployment engine that builds the business and trains the intelligence. The plan is to start with physical tasks in manufacturing, warehousing, logistics and retail in 2027, move into services such as hospitality and healthcare in 2029, and reach households in 2031, as assistants and companions. The company is also developing a bipedal home platform. The goal, he said, is a general-purpose robot that can handle 90 percent of industrial tasks by the end of 2027.",
      ),
      heading("Hardware, tested before the metal is cut"),
      paragraph(
        "The stack has four parts: hardware, co-designed with AI from the first sketch; AI, with KinetIQ as one brain for the whole fleet; data, from simulation, teleoperation, deployment and reinforcement learning in one loop; and deployment, a capability factory that turns a customer's task into a robot skill.",
      ),
      paragraph(
        "On hardware, Humanoid uses digital twins and simulation before any metal is cut, in a six-week iteration cycle, testing concepts in NVIDIA Isaac Sim against worst-case scenarios. Sokolov said the company built its first industrial robot in seven months, against an industry average of 18 to 24 months. A walking policy transferred from simulation to a bipedal prototype in 48 hours. The core product on stage was the wheeled robot: a 20-kilogram bimanual lift, actuators co-developed with Schaeffler, and batteries the robot swaps itself, in two 750 watt-hour modules of about seven kilograms each, for up to 99 percent availability.",
      ),
      heading("KinetIQ, and robots that practise the job"),
      paragraph(
        "KinetIQ is a four-layer architecture. System 3 coordinates the fleet and sits under the customer's business systems and a fleet-management layer. System 2 handles planned actions and reasoning. System 1 is a vision-language-action model for learned skills such as pick-and-place, kitting, navigation and inspection. System 0 is whole-body control and motion. One brain runs the entire fleet, and skills transfer across all robots.",
      ),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/humanoid-kinetiq-architecture.jpg",
          1600,
          1200,
          "Artem Sokolov (Humanoid) describes KinetIQ, a four-layer brain that runs the whole fleet, from body stability up to fleet coordination.",
        ),
      },
      paragraph(
        "Models are first trained on simulation and human demonstrations, then improved with reinforcement learning on real robots. That practice layer is called KinetIQ Ascend. Robots practise real production tasks around the clock and learn from their own successes and failures, driving the vision-language-action policies towards a target of 99.9 percent success at human or superhuman speed. On a bimanual tote-handling task, four days of real-world training took the success rate from 77.8 percent to 98.9 percent, with 20 times fewer failures, and raised throughput 2.3 times, from 122 to 279 totes an hour. The gains also transferred to objects the robot had not seen, at around 40 percent faster on new products.",
      ),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/humanoid-kinetiq-ascend.jpg",
          1600,
          1200,
          "Artem Sokolov (Humanoid) shows how KinetIQ Ascend lifted a handling task from 77.8 percent to 98.9 percent success in four days of practice.",
        ),
      },
      paragraph(
        "Data is treated as a moat. The aim is to build the world's largest industrial robotics dataset and also to sell data to frontier AI labs. The four sources are simulation and synthetic data, teleoperation, wearable devices — Humanoid showed proprietary UMI devices — and real robot data from customer sites, which Sokolov described as the most valuable and the hardest to get, because it depends on trust. The company is also building robot gyms and a partner network to lower the cost of collection.",
      ),
      heading("From proofs of concept to a factory contract"),
      paragraph(
        "In the past 18 months, Humanoid has completed 11 successful proofs of concept with global industrial companies. The next step is long-term deployment. With the tools of its capability factory, Sokolov said, a customer can add a new task in a couple of days instead of paying for a custom automation project. He pointed to one bin-picking case at more than 800 units an hour, described as human parity, through simulation-to-real reinforcement learning.",
      ),
      paragraph(
        "In May, Humanoid signed a binding agreement with Schaeffler in Germany to deploy wheeled robots across its plants. The slide put the target at 1,850 units, with a potential value of around 300 million dollars. Schaeffler had completed two proofs of concept, Sokolov said, then signed a contract, then invested in the company. Humanoid is in conversation with 130 companies, and 80 of them are in advanced discussions. The same slide showed 33,650 non-binding pre-orders secured to date.",
      ),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/humanoid-schaeffler-commitments.jpg",
          1600,
          1200,
          "Artem Sokolov (Humanoid) presents a binding agreement with Schaeffler for about 1,850 wheeled robots, alongside a wider pipeline of customer conversations.",
        ),
      },
      paragraph(
        "Manufacturing is planned in steps. From 2027, Bosch will build the next generation of the wheeled robot as contract manufacturer, with a first-year volume of 543 units. Schaeffler supplies the actuators. In 2028 the plan is 4,995 units a year, with Delta and the start of mass production; then 30,000 units in 2029 and 150,000 a year by 2030.",
      ),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/humanoid-path-to-scale.jpg",
          1600,
          1200,
          "Artem Sokolov (Humanoid) maps a path to 150,000 robots a year by 2030, with Bosch as contract manufacturer from 2027 and a robot-as-a-service offer.",
        ),
      },
      paragraph(
        "The company sells robot-as-a-service first: a monthly fee, around 4,800 dollars for a mass-produced wheeled robot, with no upfront spending, and Humanoid taking care of maintenance, software updates and new skills. That, Sokolov said, cuts labour costs on the tasks the robot takes over by at least 50 percent. A purchase option was also shown, at 70,000 dollars a unit plus a 20,000 dollar annual software fee, with an estimated customer payback of 1.2 years.",
      ),
      heading("Reliability, scale and trust"),
      paragraph(
        "Sokolov closed with three things he had learned. First, reliability: \"A demo has to work once. The factory needs it to work thousands of times every shift.\" That takes reliability, safety, uptime and smooth integration, which is why, he said, only the full stack works, and one company must be accountable for the whole result. Second, scale takes general-purpose robots that learn new skills, a turnkey offer, and industrial partners who can manufacture at volume, which is why Humanoid works with Bosch and Schaeffler. \"Making one robot that works is hard. Making thousands that work every day is much harder.\" Third, customers need trust and education as much as technology.",
      ),
      {
        type: "paragraph",
        runs: [
          {
            text: "\"We are not building robots because we want the world to become more robotic. We are building robots because we want the world to become more human,\" he said, in a future where machines take on repetitive and dangerous work and people have more time to create, explore and be with the people they love. Humanoid is at ",
          },
          { text: "thehumanoid.ai", href: "https://thehumanoid.ai" },
          { text: "." },
        ],
      },
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/humanoid-what-makes-us-human.jpg",
          1600,
          1200,
          "From Humanoid's film \"What makes us human?\", shown during the talk: What makes us human? Is it what we do? Or what we are capable of? We have always been curious. We ask questions. We explore. And learn. That's how we move forward. Generation after generation. But somewhere along the way, we created a world where people spend their days doing the same things again and again. Working in places that are too cold. Too hot. Too dangerous. Every year, nearly 3 million people die because of their work. And when the working day ends, another one begins. Cooking, cleaning, tidying. 60 billion hours of unpaid labour. Every single day. But is that what makes us human? We don't think so. We believe our greatest strength is not repetition. It's imagination. Our ability to question what exists. To see what could be, and to make it happen. So what if we could change the way we work? What if machines could take on the tasks that hold us back? Not to replace what makes us human, but to give us more room. More time to think. To create. To move forward. Because the future of work isn't just about what machines can do. It's about what humans can become.",
        ),
      },
    ],
  },
  {
    slug: "eu-inc-fund-physical-ai",
    title: "EU Inc. is Europe's chance to fund physical AI — if member states do not break the standard",
    date: "2026-11-19",
    order: 3,
    tags: ["Events"],
    place: "Slush, Helsinki",
    excerpt:
      "At the Industrial Renaissance Summit at Slush in Helsinki, Andreas Klinger of Prototype warned that a late change by EU Council member states could break EU Inc., a proposed European company standard meant to let founders raise capital globally from day one. Robotics Norway president Lars-Fredrik Forberg attended the later sessions on how to build, fund and scale physical AI.",
    hero: photo(
      "/news/industrial-renaissance-summit-session-03.jpg",
      1600,
      1200,
      "The panel on building, funding and scaling physical AI, moderated by Joseph Michael (Google Cloud), with Andreas Klinger (Prototype), Tom Hubregtsen and Fran Infante (Voltrac), Andreas Kupke (LightQ) and Carlota Ochoa Neven du Mont (Extantia).",
    ),
    photoCredit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
    blocks: [
      {
        type: "paragraph",
        runs: [
          {
            text: "Robotics Norway president Lars-Fredrik Forberg attended later sessions of the Industrial Renaissance Summit on Thursday 19 November 2026, day 2 of Slush in Helsinki. ",
          },
          { text: "In the morning sessions", href: "/news/industrial-renaissance-summit-slush" },
          {
            text: ", the summit looked at industrial transformation and robots already at work in factories. The later programme turned to how Europe builds, funds and scales physical AI. On that panel, Andreas Klinger of Prototype argued that EU Inc., a proposed European company standard, should make it possible for founders to raise capital globally from day one, and warned that a change added by Council member states could break the core idea. Norwegian robotics founders should follow the proposal closely.",
          },
        ],
      },
      heading("How to build, fund and scale physical AI"),
      paragraph(
        "The panel, How to Build, Fund, and Scale Physical AI, was moderated by Joseph Michael of Google Cloud. The panelists were Andreas Klinger of Prototype, Tom Hubregtsen and Fran Infante of Voltrac, Andreas Kupke of LightQ, and Carlota Ochoa Neven du Mont of Extantia.",
      ),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/industrial-renaissance-summit-session-03-names.jpg",
          1600,
          1200,
          "Carlota Ochoa Neven du Mont (Extantia) and Andreas Kupke (LightQ) on the panel.",
        ),
      },
      paragraph(
        "Asked to rate end-to-end automation of a manufacturing plant on a scale of one to ten, Fran of Voltrac gave a seven, Tom a four, and Klinger a nine, but only for highly constrained use cases. Serial and automotive manufacturing is close to fully automatable today, the panelists said, while dynamic, unstructured environments are still years away, and household robots doing general tasks were described as \"pure marketing,\" three to five years out. Doing a backflip is easier than grabbing a glass: a backflip depends on the robot's own actuators and a single policy, whereas grasping requires dynamic perception and adaptation.",
      ),
      paragraph(
        "Physical AI is having its moment, the panel argued, because software breakthroughs in computer vision and reasoning over the last two to five years now make it possible to go from a photo to video, to a 3D scene, to simulation, to predicted actions. Prototyping automation with a camera, Claude or ChatGPT, and a hardware loop \"wasn't possible even half a year ago.\" One speaker called that \"completely insane.\" Hardware iteration has compressed as well. China's clean-tech boom deepened supply chains for batteries, actuators and components, costs have fallen, and electrification has made machines energy-viable. Vertical integration now takes far less capital. Voltrac described going from concept to architecture in three days, against two months previously, with major components, suppliers and renders in two to three days using AI. LightQ said photonic chip design can now be done in two hours, against two to three years with 3,000 engineers, with AI used across idea, design, engineering, verification and tape-out.",
      ),
      paragraph(
        "The main bottlenecks, they said, are data for autonomy, sensors such as lidar and radar, and edge compute fast enough for real-time reaction. Kupke described LightQ's work as temporal spectral computing, with light-based compute and memory as one entity, aimed at massive parallelism at high speed and efficiency. Where high autonomy is required, teleoperation still dominates. Fran's view was that time spent performing real tasks is the bottleneck more than data availability.",
      ),
      heading("What investors want, and why EU Inc. matters"),
      paragraph(
        "Physical AI investment reached 50 billion dollars this year, five times the level of two years ago, a figure also cited in the morning session. Hardware is now attractive to venture investors, the panel said, because software ideas are easy to replicate with AI, while hardware has engineering moats, more predictable timelines, and problems of one or two orders of magnitude to solve. Results in this \"frontier tech,\" as opposed to deep tech, are visible within two to five years, which fits a venture window. The physical AI category will likely fragment next year, as climate tech once did, and hardware and software will stop being treated as separate categories. Ochoa Neven du Mont said the ChatGPT moment for physical AI is still one to two years away. Capital into hardware will grow ten times or more, with Europe's re-industrialisation as a driver.",
      ),
      paragraph(
        "Klinger put the moat in blunt terms: \"Obsession, ambition, and bias to action is a moat. Everything else is a note in a pitch deck.\" On diligence, he said: \"If they need a spreadsheet to convince me, they already lost me.\" Investors, the panel said, look for a deep technical team paired with a commercial founder who has an execution track record, obsession with one field when it was \"uncool,\" and full-stack thinking that uses a point solution as a wedge but aims to rethink an industry. Voltrac was cited as a talent combination that sounds like a joke: a defence and aerospace engineer and a quantum machine-learning engineer from Google, building a tractor. Long tenure and a cohesive culture matter especially in deep tech; Synapticon was cited as having average tenure of more than six years, with many people staying more than ten.",
      ),
      paragraph(
        "Klinger also made a political case for EU Inc., a grassroots movement to create a standard that lets founders fundraise globally from day one. It is now a formal European Commission proposal, he said, supported by the president, the Commission and prime ministers. The risk, as he described it, is that Council member states have added a change allowing free choice of registration, which would remove the standard hub and break the core idea. He argued for slowing the process and fixing it before a final vote, and appealed to the room: \"If you're friends with a Finance Minister or Justice Minister, please reach out.\" The proposal is aimed at founders in EU member states. Norwegian robotics founders should follow it, because how Europe makes it easy, or hard, to build and fund physical AI companies will shape the market they operate in.",
      ),
      heading("Robots learning on the job"),
      paragraph(
        "Nikolai Ensslen of Vesoma spoke with Yair Reem of Extantia in a session titled The New Workforce: Robots Learning on the Job.",
      ),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/industrial-renaissance-summit-session-04.jpg",
          1600,
          1200,
          "Nikolai Ensslen (Vesoma) in conversation with Yair Reem (Extantia) about robots learning on the job.",
        ),
      },
      paragraph(
        "Ensslen's thesis is that supervised and imitation learning cannot scale to physical AI. The physical world is orders of magnitude larger than language, he said, and would need 24 million times more data than large language models required. Simulation has the same triviality problem. Self-learning through reinforcement learning is the point. \"Hands are the reason we're intelligent,\" he said; embodied learning is the key. Models such as Astra reason well, he argued, but are too slow for physical execution.",
      ),
      paragraph(
        "He contrasted a skill-based approach with vision-language-action models. A VLA model can train 500 times on a screwdriver and still not know it can use one, he said, while a reinforcement-learning agent may find 500 ways that do not work, but generalises once it finds what does. Reinforcement learning is data-inefficient but far more performant, at over four times the speed of state-of-the-art VLA. In Vesoma's setup, vision-language models instruct the reinforcement-learning agent what to practise, with no human in the loop. A robot learned to walk in three hours, not six months, through sim-to-real transfer, with a natural gait self-learned by AI rather than motion-captured from humans. Hand skills were also shown: the motion was awkward, but faster and with a higher success rate than imitation.",
      ),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/industrial-renaissance-summit-locomotion.jpg",
          1600,
          2133,
          "Nikolai Ensslen (Vesoma) on how a robot learned to walk in three hours rather than six months.",
        ),
      },
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/industrial-renaissance-summit-vla-rl.jpg",
          1600,
          1200,
          "Nikolai Ensslen (Vesoma) argues that reinforcement learning outperforms vision-language-action models for physical skills.",
        ),
      },
      paragraph(
        "Vesoma is testing on a third-party Unitree G1 and plans to launch its own hardware, Vesoma 1, in a few weeks. Ensslen's target is robotic labour at scale solved within 12 months, and a mass-producible product by 2028, starting with manufacturing and logistics. His commitment: \"Next year, Model 1 will sit next to me on stage.\"",
      ),
      paragraph(
        "On Europe and China, Ensslen described China as a supply-chain accelerator, not only a competitor. Before Covid, he said, China needed the West; since then, China sells to the West. Vesoma blends sourcing, using Chinese factories for speed and cost and European ones for technology and reliability. \"Substantial innovation still comes from Europe and the US.\" Vesoma is bringing senior European talent back from the United States and Asia, including a head of design, Marcelo, who designed Tesla Optimus Gen 3, Cartwheel Yogi and Actronic Apollo, a co-founder from DeepMind in London, and Martin Lindner, described as one of the fathers of reinforcement learning, heading AI.",
      ),
      paragraph(
        "The panel also argued that Europe's manufacturing muscle is underestimated, in Germany, Eastern Europe and among hidden champions, and that a deep laser and photonics ecosystem in Hamburg, with 3,000 research scientists on campus, is little known even locally. \"We are so bad at marketing,\" one speaker said. There is also a cultural problem: in Europe, researchers who start companies are seen as having \"failed.\" Voltrac said it was proud to build in Europe, citing farming clients, EU tailwinds, and access to tooling and talent.",
      ),
      heading("Closing words"),
      paragraph(
        "Sebastian Heitmann of Extantia and Itxaso Araque of Google closed the summit. The tone has changed, they said: founders are talking about customers, leasing models and insurance, and robots at work, not only demo videos. It is \"not science fiction anymore.\" The workforce story is that robots are replacing jobs that no longer have people, not displacing workers. Europe's fragmentation was reframed as a strength: smaller, specialised producers can compete precisely because of it. The hardest step, left open for the networking that followed, is going from a lab model to a robot that can run a full factory shift.",
      ),
      {
        type: "figure",
        credit: "Photo: Lars-Fredrik Forberg / Robotics Norway",
        figure: photo(
          "/news/industrial-renaissance-summit-closing.jpg",
          1600,
          1200,
          "Sebastian Heitmann (Extantia) and Itxaso Araque (Google) close the Industrial Renaissance Summit.",
        ),
      },
    ],
  },
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
