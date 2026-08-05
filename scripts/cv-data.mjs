/**
 * English CV content, kept separate from layout (generate-cv.mjs) so it's
 * easy to update without touching PDF-drawing code. Mirrors the facts
 * already published in src/content/*.ts and src/config/site.config.ts.
 *
 * The Spanish edition lives in cv-data-es.mjs and must stay in sync.
 */
export const cv = {
  documentTitle: "Resume",

  /** Section headings, so the layout code stays language-agnostic. */
  labels: {
    summary: "Professional Summary",
    skills: "Technical Skills",
    experience: "Professional Experience",
    projects: "Featured Projects",
    education: "Education",
    certifications: "Certifications",
    languages: "Languages",
  },

  name: "Manuel Felipe Paz Vidal",
  titles: "Systems Engineer · Full Stack Developer",
  location: "Popayán, Cauca, Colombia",
  email: "mpazvi19@gmail.com",
  links: [
    "linkedin.com/in/mpaz19",
    "github.com/MPaz-19",
    "portfolio-indol-two-88.vercel.app",
  ],

  summary:
    "Systems Engineering student and full stack developer with hands-on experience building and shipping production web applications across academic, clinical-research and freelance settings. Specialized in backend development with Node.js, Express, Java and Spring Boot, with a strong command of SQL databases and RESTful API design. Experienced with React and TypeScript front ends, microservice architectures, containerization with Docker, and cloud deployment on Vercel and AWS. A committed continuous learner who values clean architecture, automated testing, and honest, well-documented code.",

  skills: [
    {
      label: "Frontend",
      items: "HTML, CSS, JavaScript, TypeScript, React, Next.js, Angular, Tailwind CSS",
    },
    {
      label: "Backend",
      items: "Node.js, Express, Java, Spring Boot, Python, C/C++, RESTful APIs, JWT Authentication",
    },
    {
      label: "Databases",
      items: "PostgreSQL, MySQL, MongoDB",
    },
    {
      label: "DevOps & Tools",
      items: "Git, GitHub, GitHub Actions (CI), Docker, Postman, Linux, Figma",
    },
  ],

  experience: [
    {
      role: "Software Development Practice",
      period: "2023 — 2024",
      org: "University Software Lab, Universidad del Cauca",
      location: "Popayán, Colombia",
      bullets: [
        "Developed features in a 5-person Scrum team with weekly sprints, following agile methodologies for a real stakeholder.",
        "Modeled the relational database and built the Java/Spring Boot backend for the team's project.",
        "Wrote technical documentation and presented demos directly to stakeholders.",
        "Introduced Git flow and pull-request code reviews to the team's workflow, delivering the project on time with the highest evaluation in the cohort.",
      ],
    },
  ],

  projects: [
    {
      name: "ByMe — Local Services Marketplace",
      tag: "Team Project · Lead Contributor",
      period: "2026 — Present",
      org: "Freelance / Independent",
      location: "Popayán, Colombia",
      bullets: [
        "Led development (57 of 73 commits) of a full-stack marketplace connecting clients with verified local professionals, built with React, TypeScript and Vite.",
        "Designed the review, booking and document-verification flows across REST microservices behind an AWS API Gateway, with JWT-based role auth for client, professional and admin dashboards.",
        "Integrated the Google Maps API for service locations and set up a Vitest + GitHub Actions CI pipeline.",
      ],
      link: "front-by-me.vercel.app · github.com/MPaz-19/Front-ByMe",
    },
    {
      name: "Academic Electives Manager — Full Stack",
      tag: "Team Project",
      period: "2025",
      org: "FIET, Universidad del Cauca",
      location: "Popayán, Colombia",
      bullets: [
        "Built the React/TypeScript dashboard as lead contributor and contributed backend modules (Spring Boot) for a system that automates elective-course assignment for the department.",
        "Backend integrates the Google Forms API for preregistration and a companion Python microservice for assignment statistics, with an explicit state-machine pipeline for eligibility validation.",
      ],
      link: "github.com/MPaz-19/Sistema-de-Gesti-n-Acad-mica",
    },
    {
      name: "HVF Analyzer — Clinical Diagnostic Support Tool",
      tag: "Team Research Project",
      period: "2026",
      org: "Universidad del Cauca",
      location: "Popayán, Colombia",
      bullets: [
        "Contributed to a PyQt6 desktop application that digitizes Humphrey visual-field exams for ophthalmology using OCR and computer vision.",
        "Rewrote the extraction pipeline's grid-fitting and region-localization logic to work from OCR content instead of fixed template coordinates, fixing failures on rotated or rescaled scans.",
      ],
      link: null,
    },
    {
      name: "Developer Portfolio",
      tag: "Personal Project",
      period: "2026",
      org: "Independent",
      location: "Popayán, Colombia",
      bullets: [
        "Designed and built this portfolio (Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion) with server-rendered GitHub activity, full project case studies and complete SEO.",
        "Deployed on Vercel with automatic deploys on every push.",
      ],
      // No link here — the portfolio URL is already in the header.
      link: null,
    },
  ],

  education: [
    {
      degree: "B.Eng. in Systems Engineering",
      period: "2021 — 2025",
      org: "Universidad del Cauca",
      location: "Popayán, Colombia",
    },
  ],

  certifications: [
    {
      name: "Fundamentos de Ciberseguridad",
      issuer: "Cisco Networking Academy",
      year: "2025",
    },
  ],

  languages: "Spanish: Native  ·  English: Professional working proficiency (B2)",
};
