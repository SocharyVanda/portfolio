export const profile = {
  name: "Sochary Vanda",
  initials: "SV",
  handle: "sochary.vanda",
  role: "Sophomore at Paragon International University",
  tagline: "CS student aiming toward Data Science & UX/UI design.",
  bio: "I am currently a computer science student in sophomore year. I am aiming toward data Science and UX / UI design. Despite studying something that is predominately tech and coding, I also attempt to try somethings that are transcending the domain that I am studying. My quest is to always look for where I can integrate and challenge my creativity within what I do. I want to create something that serves as both the functionality and aesthetic.",
  careerGoal: "I would love to pursue data science and UX/UI design.",
};

export const contact = {
  tel: "+855-86861152",
  emails: ["vandasochary@gmail.com", "svanda@paragoniu.edu.kh"],
};

// Spotify track id shown in the floating music player. Swap this to change
// the song — grab the id from the track's share URL:
// https://open.spotify.com/track/<id>
export const spotifyTrackId = "6A1Nh1pP7MzJOWkHAdeagG";

export const links = {
  github: "https://github.com/SocharyVanda",
  figma: "",
  linkedin: "",
  behance: "",
  telegram: "",
  cv: "/cv/portfolio.pdf",
};

export const skills = {
  tools: ["Figma", "Notion", "VS Code", "CapCut", "Canva"],
  design: ["User Research"],
  programming: ["JavaScript", "Java", "CSS", "HTML", "Python"],
};

export const education = [
  {
    title: "Bachelor of Computer Science",
    place: "Paragon International University",
    date: "2024 — 2028",
    note: "Current",
  },
  {
    title: "Above & Beyond School",
    place: "Front-end Program",
    date: "September — December 2025",
  },
  {
    title: "Highschool Diploma",
    place: "Russey Keo Highschool",
    date: "2018 — 2024",
  },
  {
    title: "English Education",
    place: "Sovannaphumi School",
    date: "2020 — 2023",
  },
];

export const achievements = [
  {
    title: "First Runner-Up, MIS Challenge (UX/UI Challenge)",
    place: "",
    date: "June 2025",
  },
  {
    title: "Techo Digital Talent Scholarship, Phnom Penh",
    place: "Awarded by Cambodia Academy of Digital Technology (CADT)",
    date: "2025",
  },
  {
    title: "First Place, Slide Presentation",
    place: "Phnom Penh Competition",
    date: "2018 — 2019",
  },
  {
    title: "First Runner-Up, Debate Competition",
    place: "Organized by the Academic Department of NTC Group",
    date: "2021 — 2022",
  },
];

export const experience = [
  {
    title: "Part-time Teacher",
    place: "S.E.T — Science Education Tutoring",
    date: "April 2025 — Present",
  },
];

export type Project = {
  icon: string;
  title: string;
  tags: string[];
  image: string;
  projectType?: string;
  client?: string;
  year?: string;
  credits?: string;
  writing: string;
};

// Pulled from your Notion projects gallery. Fill in client/year for any
// project once you have those details — fields left blank are simply
// skipped in the detail view.
export const projects: Project[] = [
  {
    icon: "🧴",
    title: "Skincare Website",
    tags: ["Researcher", "Designer", "Team"],
    image: "/projects/skincare.jpg",
    projectType: "E-commerce website",
    credits: "Team 8",
    writing:
      "Write about the GlowSkin skincare e-commerce project here — the brief, your research, the UI decisions, and what you were responsible for as part of Team 8.",
  },
  {
    icon: "🚗",
    title: "Tesla Clone",
    tags: ["Researcher", "Designer", "Team"],
    image: "/projects/tesla.jpg",
    projectType: "Website clone",
    writing:
      "Write about rebuilding the Tesla site — what you focused on cloning (layout, motion, responsiveness), and what you learned from studying the original.",
  },
  {
    icon: "☕",
    title: "BrewFinder",
    tags: [],
    image: "/projects/brewfinder.jpg",
    projectType: "Mobile app wireframe",
    credits: "KjeAddict",
    writing:
      "Write about the BrewFinder wireframes here — the problem it solves, the flows you designed, and how the deal/discount feature works.",
  },
  {
    icon: "💍",
    title: "Wedpod",
    tags: [],
    image: "/projects/wedpod.jpg",
    projectType: "Wedding planning website",
    writing:
      "Write about Wedpod — the concept (making wedding planning more memorable), the venues/vendor booking flow, and your role in the design.",
  },
  {
    icon: "🚌",
    title: "BookLan",
    tags: [],
    image: "/projects/booklan.jpg",
    projectType: "Brand identity",
    writing:
      "Write about the BookLan logo/brand identity — the concept behind the mark, the color choices, and where else the brand system was applied.",
  },
];
