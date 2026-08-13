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
  chapter: string;
  title: string;
  subtitle: string;
  accent: string;
  writing: string;
};

export const projects: Project[] = [
  {
    chapter: "Chapter 1",
    title: "UX/UI Case Study",
    subtitle: "MIS Challenge — First Runner-Up",
    accent: "#f2c14e",
    writing:
      "Write about the MIS challenge project here — the problem, your research, wireframes, and the final design decisions.",
  },
  {
    chapter: "Chapter 2",
    title: "Front-End Build",
    subtitle: "Above & Beyond — Front-end Program",
    accent: "#e0574c",
    writing:
      "Write about a front-end project you shipped during the program — stack used, challenges, and what you'd improve.",
  },
  {
    chapter: "Chapter 3",
    title: "Product Design",
    subtitle: "Figma prototype",
    accent: "#4e8bf2",
    writing:
      "Write about a Figma prototype — user research, flows, and the prototype link.",
  },
  {
    chapter: "Chapter 4",
    title: "Data Science Exploration",
    subtitle: "Python notebook",
    accent: "#8b8b8b",
    writing:
      "Write about a data science exercise — dataset, approach, and findings.",
  },
  {
    chapter: "Chapter 5",
    title: "Teaching & Mentorship",
    subtitle: "S.E.T tutoring",
    accent: "#3fb28f",
    writing:
      "Write about your teaching experience at S.E.T — what you taught and what you learned from it.",
  },
  {
    chapter: "Chapter 6",
    title: "Personal Project",
    subtitle: "Coming soon",
    accent: "#8a5cf6",
    writing: "Write about your next project here.",
  },
];
