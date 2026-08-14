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
    title: "Front-end Program",
    place: "Above & Beyond School",
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
  title: string;
  tags: string[];
  image: string;
  color: string;
  projectType?: string;
  client?: string;
  year?: string;
  credits?: string;
  tools?: string[];
  writing: string;
  reflection?: string[];
  link?: { label: string; href: string };
};

// Pulled straight from your Notion project pages. Fields left blank (client,
// year, tools, reflection, link) are simply skipped in the detail view —
// fill them in per project whenever you have them.
export const projects: Project[] = [
  {
    title: "Skincare Website",
    tags: ["Researcher", "Designer", "Team"],
    image: "/projects/skincare.jpg",
    color: "#3f7d58",
    projectType: "E-commerce website — MIS Challenge",
    credits: "Team 8",
    tools: ["Notion", "Figma"],
    writing:
      "This project was done as a team whose main goal is to create a skincare website. Before the design stage, we as a team work together to conduct a user research to identify user pain point, our target audience and consider users experience after they click on our website.",
    reflection: [
      "The project taught me a lot about team work.",
      "I get to learn more about how to use various tools in Figma due to the trial and errors and also being guided by those who are more experience than I am.",
    ],
  },
  {
    title: "Tesla Clone",
    tags: ["Researcher", "Designer", "Team"],
    image: "/projects/tesla.jpg",
    color: "#b91c1c",
    projectType: "Website clone",
    writing:
      "Write about rebuilding the Tesla site here — what you focused on cloning (layout, motion, responsiveness), and what you learned from studying the original.",
  },
  {
    title: "BrewFinder",
    tags: [],
    image: "/projects/brewfinder.jpg",
    color: "#7f1d1d",
    projectType: "Mobile app wireframe",
    credits: "KjeAddict",
    tools: ["Notion", "Figma", "Discord for communication"],
    writing:
      "BrewFinder is an app that helps cafe-hopper find the most personalized cafe shops.",
    reflection: [
      "The project taught me a lot about team work.",
      "I get to learn more about how to use various tools in Figma due to the trial and errors and also being guided by those who are more experience than I am.",
    ],
  },
  {
    title: "Wedpod",
    tags: [],
    image: "/projects/wedpod.jpg",
    color: "#92400e",
    projectType: "Wedding planning website",
    writing:
      "WedPod is a wedding planner that enables the groom and bride to plan their wedding venue.",
  },
  {
    title: "BookLan",
    tags: [],
    image: "/projects/booklan.jpg",
    color: "#1e3a8a",
    projectType: "Mobile app",
    writing:
      "BookLan is a mobile application that helps people who are on the road see the incoming bus and book them on the spot.",
    link: {
      label: "View Figma prototype",
      href: "https://www.figma.com/design/e6fx794L1o7bO24l9gcjP2/MIS-Challenge---2026?node-id=372-25570&t=bXyNLY0IRSAJ4ZsM-1",
    },
  },
];
