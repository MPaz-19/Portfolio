/**
 * Spanish edition of the CV. Mirrors cv-data.mjs one-to-one — if a fact
 * changes in one file it must change in the other. Technology names are
 * intentionally left untranslated, as is standard in Spanish tech resumes.
 */
export const cv = {
  documentTitle: "Hoja de Vida",

  /** Section headings, so the layout code stays language-agnostic. */
  labels: {
    summary: "Perfil Profesional",
    skills: "Habilidades Técnicas",
    experience: "Experiencia Profesional",
    projects: "Proyectos Destacados",
    education: "Educación",
    certifications: "Certificaciones",
    languages: "Idiomas",
  },

  name: "Manuel Felipe Paz Vidal",
  titles: "Ingeniero de Sistemas · Desarrollador Full Stack",
  location: "Popayán, Cauca, Colombia",
  email: "mpazvi19@gmail.com",
  links: [
    "linkedin.com/in/mpaz19",
    "github.com/MPaz-19",
    "portfolio-indol-two-88.vercel.app",
  ],

  summary:
    "Estudiante de Ingeniería de Sistemas y desarrollador full stack con experiencia práctica construyendo y desplegando aplicaciones web en producción en contextos académicos, de investigación clínica y freelance. Especializado en desarrollo backend con Node.js, Express, Java y Spring Boot, con un sólido dominio de bases de datos SQL y diseño de APIs RESTful. Con experiencia en front ends con React y TypeScript, arquitecturas de microservicios, contenedorización con Docker y despliegue en la nube sobre Vercel y AWS. Comprometido con el aprendizaje continuo, la arquitectura limpia, las pruebas automatizadas y el código honesto y bien documentado.",

  skills: [
    {
      label: "Frontend",
      items: "HTML, CSS, JavaScript, TypeScript, React, Next.js, Angular, Tailwind CSS",
    },
    {
      label: "Backend",
      items: "Node.js, Express, Java, Spring Boot, Python, C/C++, APIs RESTful, Autenticación JWT",
    },
    {
      label: "Bases de datos",
      items: "PostgreSQL, MySQL, MongoDB",
    },
    {
      label: "DevOps y Herramientas",
      items: "Git, GitHub, GitHub Actions (CI), Docker, Postman, Linux, Figma",
    },
  ],

  experience: [
    {
      role: "Práctica de Desarrollo de Software",
      period: "2023 — 2024",
      org: "Laboratorio de Software, Universidad del Cauca",
      location: "Popayán, Colombia",
      bullets: [
        "Desarrollé funcionalidades en un equipo Scrum de 5 personas con sprints semanales, aplicando metodologías ágiles para un cliente real.",
        "Modelé la base de datos relacional y construí el backend en Java/Spring Boot del proyecto del equipo.",
        "Redacté la documentación técnica y presenté las demostraciones directamente a los interesados.",
        "Introduje Git flow y las revisiones de código por pull request en el flujo de trabajo del equipo, entregando el proyecto a tiempo y con la evaluación más alta de la cohorte.",
      ],
    },
  ],

  projects: [
    {
      name: "ByMe — Marketplace de Servicios Locales",
      tag: "Proyecto en equipo · Contribuidor principal",
      period: "2026 — Presente",
      org: "Freelance / Independiente",
      location: "Popayán, Colombia",
      bullets: [
        "Lideré el desarrollo (57 de 73 commits) de un marketplace full stack que conecta clientes con profesionales locales verificados, construido con React, TypeScript y Vite.",
        "Diseñé los flujos de reseñas, reservas y verificación de documentos sobre microservicios REST detrás de un AWS API Gateway, con autenticación por roles basada en JWT para los paneles de cliente, profesional y administrador.",
        "Integré la API de Google Maps para las ubicaciones de servicio y configuré un pipeline de CI con Vitest y GitHub Actions.",
      ],
      link: "front-by-me.vercel.app · github.com/MPaz-19/Front-ByMe",
    },
    {
      name: "Gestor de Electivas Académicas — Full Stack",
      tag: "Proyecto en equipo",
      period: "2025",
      org: "FIET, Universidad del Cauca",
      location: "Popayán, Colombia",
      bullets: [
        "Construí el panel administrativo en React/TypeScript como contribuidor principal y aporté módulos del backend (Spring Boot) para un sistema que automatiza la asignación de asignaturas electivas del departamento.",
        "El backend integra la API de Google Forms para la preinscripción y un microservicio en Python para las estadísticas de asignación, con un pipeline explícito de máquina de estados para la validación de elegibilidad.",
      ],
      link: "github.com/MPaz-19/Sistema-de-Gesti-n-Acad-mica",
    },
    {
      name: "HVF Analyzer — Herramienta de Apoyo Diagnóstico Clínico",
      tag: "Proyecto de investigación en equipo",
      period: "2026",
      org: "Universidad del Cauca",
      location: "Popayán, Colombia",
      bullets: [
        "Contribuí a una aplicación de escritorio en PyQt6 que digitaliza exámenes de campo visual de Humphrey para oftalmología mediante OCR y visión por computador.",
        "Reescribí la lógica de ajuste a la rejilla y de localización de regiones del pipeline de extracción para que opere a partir del contenido del OCR en lugar de coordenadas fijas de plantilla, corrigiendo los fallos en escaneos rotados o reescalados.",
      ],
      link: null,
    },
    {
      name: "Portafolio de Desarrollador",
      tag: "Proyecto personal",
      period: "2026",
      org: "Independiente",
      location: "Popayán, Colombia",
      bullets: [
        "Diseñé y construí este portafolio (Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion) con actividad de GitHub renderizada en el servidor, casos de estudio completos de cada proyecto y SEO completo.",
        "Desplegado en Vercel con despliegues automáticos en cada push.",
      ],
      // Sin enlace aquí — la URL del portafolio ya aparece en el encabezado.
      link: null,
    },
  ],

  education: [
    {
      degree: "Ingeniería de Sistemas",
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

  languages: "Español: Nativo  ·  Inglés: Competencia profesional (B2)",
};
