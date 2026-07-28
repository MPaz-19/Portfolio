import type { Project } from "@/types";

/* ────────────────────────────────────────────────────────────
 * Projects — the heart of this portfolio.
 *
 * Sourced from Manuel's real repositories. A couple of these were
 * built with a team (university coursework and a clinical research
 * project); each case study is upfront about team size and which
 * part Manuel owned, based on actual commit history.
 * ──────────────────────────────────────────────────────────── */

export const projects: Project[] = [
  {
    slug: "front-byme",
    name: "ByMe",
    tagline: "Marketplace to find and book trusted local professionals in Popayán.",
    description:
      "A services marketplace connecting clients with verified local professionals (electricians, plumbers, tutors and more) — search, booking, document verification and a two-way review system.",
    problem:
      "Finding a trustworthy local professional in Popayán mostly happens through word of mouth, with no way to compare, book or verify who you're hiring. ByMe formalizes that discovery, booking and trust loop.",
    image: "/images/projects/front-byme.svg",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "MUI",
      "Radix UI",
      "React Router",
      "Google Maps API",
      "Vitest",
    ],
    difficulty: "Advanced",
    status: "Maintained",
    links: {
      demo: "https://front-by-me.vercel.app",
      repo: "https://github.com/MPaz-19/Front-ByMe",
    },
    caseStudy: {
      objective:
        "Build a production-ready marketplace where clients can search verified professionals by service and location, request and track bookings, and leave reviews — while professionals manage their profile, documents and incoming requests from their own dashboard. Built with a small team; I drove most of the feature work end to end (57 of the repo's 73 commits), including the review system, document verification flow, password recovery and the test suite.",
      architecture:
        "A Vite + React + TypeScript SPA deployed on Vercel, talking to a set of REST microservices (auth, professionals/requests, reviews) through an AWS API Gateway. Role-based routing renders separate dashboards for clients, professionals and admins behind an auth context backed by JWT. Location features use the Google Maps API for picking and displaying addresses. UI is composed with MUI and Radix primitives, forms with React Hook Form, and the whole thing is covered by a Vitest + Testing Library suite wired into GitHub Actions CI.",
      architectureHighlights: [
        "Vite + React + TypeScript SPA, deployed on Vercel.",
        "REST microservices behind AWS API Gateway (auth, professionals/requests, reviews).",
        "JWT auth context with protected routes per role (client / professional / admin).",
        "Google Maps API for address picking and location display.",
        "React Hook Form + Radix/MUI component layer.",
        "Vitest + Testing Library suite, run automatically via GitHub Actions on every push/PR.",
      ],
      screenshots: [
        {
          src: "/images/projects/front-byme.svg",
          alt: "ByMe professional listing",
          caption: "Professional search and listing",
        },
        {
          src: "/images/placeholder-screenshot-1.svg",
          alt: "ByMe booking flow",
          caption: "Booking flow and request tracking",
        },
        {
          src: "/images/placeholder-screenshot-2.svg",
          alt: "ByMe professional dashboard",
          caption: "Professional dashboard",
        },
      ],
      features: [
        "Search and filter professionals by service and location.",
        "Booking flow with request states (pending, accepted, cancelled, completed).",
        "Professional document upload and account verification.",
        "Two-way review system between clients and professionals.",
        "Google Maps picker for service locations.",
        "Password recovery (forgot + reset) and role-based dashboards.",
      ],
      challenges: [
        {
          challenge:
            "The API client prefixed every request with a base URL that already included /auth, so authenticated calls silently hit double-prefixed paths like /auth/auth/....",
          solution:
            "Removed the hardcoded baseURL from the shared Axios instance and made each service module responsible for its own full path, eliminating the double-prefix class of bugs entirely.",
        },
        {
          challenge:
            "The review system initially exposed and mixed up professionalId and userId, letting a client accidentally rate the wrong entity and producing duplicate reviews in the sidebar.",
          solution:
            "Separated the two identifiers explicitly through the review DTOs and the rating modal, and de-duplicated the reviews feed at the service layer instead of trusting the UI to filter correctly.",
        },
        {
          challenge:
            "Client and professional dashboards fetched overlapping data through ad hoc calls, and an internal client UUID was visible in the UI where it shouldn't have been.",
          solution:
            "Introduced an enriched ServiceRequestDTO on the backend side of the flow so the frontend could drop a redundant caching hook, order requests by date, and stop leaking internal IDs to the client-facing views.",
        },
      ],
      learnings: [
        "Structuring a frontend around independently deployed microservices instead of a single backend.",
        "Writing a real Vitest suite (auth, services, search utilities) and wiring it into CI so regressions fail the PR, not production.",
        "Debugging state-transition bugs (booking status, review identity) that only show up once real users start clicking around.",
        "Shipping incremental fixes to a live app (Vercel) without breaking the professional/admin flows already in use.",
      ],
    },
  },
  {
    slug: "sistema-gestion-academica",
    name: "Academic Electives Manager — Frontend",
    tagline: "Staff dashboard for running a university's elective-course assignment process.",
    description:
      "A React dashboard for the Electronics and Telecommunications Engineering Department (FIET) at Universidad del Cauca, used by staff to manage electives, academic periods and the multi-step process that validates and assigns them to students.",
    problem:
      "Assigning elective courses to hundreds of students each semester involves cross-checking preregistration forms, academic records and eligibility rules — previously juggled across spreadsheets and Postman calls. This dashboard gives staff one guided interface for the whole process.",
    image: "/images/projects/sistema-gestion-academica.svg",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Radix UI",
      "Recharts",
      "Axios",
    ],
    difficulty: "Intermediate",
    status: "Completed",
    links: {
      demo: "",
      repo: "https://github.com/MPaz-19/Sistema-de-Gesti-n-Acad-mica",
    },
    caseStudy: {
      objective:
        "Give department staff a single dashboard to manage departments, programs, electives and academic periods, and to drive the backend's multi-step processing pipeline (load academic records → resolve inconsistencies → calculate progress → validate eligibility → publish) without touching the database directly. Built for a university course project alongside a teammate; I was the lead contributor (10 of the repo's 14 commits), owning the electives/offer management, the period module and the processing wizard.",
      architecture:
        "A Vite + React + TypeScript SPA that is the companion frontend to the sistema-electivas Spring Boot API — its typed API client mirrors the backend's DTOs (electives, programs, periods, academic-progress records) module for module. Navigation is organized around a sidebar with one screen per domain module (departments, programs, electives, periods, processing, statistics/reports), and Recharts renders the assignment-distribution reports the backend computes.",
      architectureHighlights: [
        "Vite + React + TypeScript SPA, typed API client kept in sync with the backend's DTOs.",
        "Sidebar-navigation layout with one module per domain concept.",
        "Processing screen mirrors the backend's period state machine step by step.",
        "Recharts-based statistics and assignment-distribution reports.",
        "Radix UI component primitives shared with the ByMe project's design language.",
      ],
      screenshots: [
        {
          src: "/images/projects/sistema-gestion-academica.svg",
          alt: "Academic dashboard statistics view",
          caption: "Statistics and assignment-distribution reports",
        },
        {
          src: "/images/placeholder-screenshot-1.svg",
          alt: "Academic dashboard electives module",
          caption: "Electives and offer management",
        },
        {
          src: "/images/placeholder-screenshot-2.svg",
          alt: "Academic dashboard processing wizard",
          caption: "Step-by-step processing wizard",
        },
      ],
      features: [
        "CRUD screens for departments, programs, electives and academic periods.",
        "Guided processing wizard: SIMCA record upload → inconsistency resolution → progress calculation → eligibility validation → publish.",
        "Searchable elective picker when adding an offer to a period.",
        "Assignment-distribution statistics and reports with charts.",
        "UI state that reflects the backend period's current status, preventing staff from skipping steps.",
      ],
      challenges: [
        {
          challenge:
            "The backend models the assignment process as a strict state machine per period; if the UI let staff trigger an action out of order, the API would reject it with an opaque error.",
          solution:
            "Made each processing screen read the period's current backend state and only expose the action valid for that state, turning an API-level constraint into a guided, impossible-to-misuse wizard.",
        },
        {
          challenge:
            "Adding an elective to a period's offer meant scrolling a long unfiltered list, and the add-offer dialog had no reliable way to back out of a selection.",
          solution:
            "Added an inline searchable picker for electives and a proper close/cancel action on the dialog, cutting a multi-step task down to a couple of clicks.",
        },
      ],
      learnings: [
        "Keeping a frontend's types honest against a teammate's backend as its DTOs evolved week to week.",
        "Designing UI for a multi-step backend workflow, not just CRUD screens.",
        "Reading API state machines as a contract the UI has to respect, not just as data to render.",
      ],
    },
  },
  {
    slug: "sistema-electivas",
    name: "Academic Electives Manager — API",
    tagline: "Spring Boot REST API that validates and assigns elective courses to students.",
    description:
      "The backend for the same academic system: a Spring Boot API that ingests academic records, cross-checks them against Google Forms preregistrations, applies eligibility rules, and hands off statistics to a companion Python service.",
    problem:
      "Manually reconciling Google Forms responses with the university's academic records (SIMCA) to decide who's eligible for which elective was slow and error-prone, with inconsistencies (inactive students, wrong program codes) discovered too late in the semester.",
    image: "/images/projects/sistema-electivas.svg",
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "Google Forms API",
      "Apache POI",
      "Python",
    ],
    difficulty: "Advanced",
    status: "Completed",
    links: {
      demo: "",
      repo: "https://github.com/MPaz-19/Sistema-electivas",
    },
    caseStudy: {
      objective:
        "Automate the elective-assignment process for FIET at Universidad del Cauca: create and close Google Forms for preregistration, ingest and validate academic records exported from the university's SIMCA system, calculate each student's degree progress and eligibility, and generate assignment reports. Built with a small team where a teammate led the overall design; my contribution focused on the department/elective CRUD modules, validation and exception handling, and the Google Forms integration client.",
      architecture:
        "A layered Spring Boot 3 (Java 21) application organized as one package per domain concept — department, program, elective, academic period, processing/validation, reports — each with its own controller, service, repository and mapper, backed by PostgreSQL via JPA. Spring Security guards the API, and two external integrations sit behind dedicated clients: a Google Forms client (OAuth2 service account) that creates, reads and closes preregistration forms, and a REST call to a separate Python microservice that computes assignment-distribution statistics, keeping heavy aggregation out of the transactional API. Excel ingestion/export goes through Apache POI.",
      architectureHighlights: [
        "Spring Boot 3 / Java 21, one domain module per concept (elective, program, period, processing…).",
        "PostgreSQL + Spring Data JPA, Spring Security on every endpoint.",
        "Google Forms API client (OAuth2 service account) to create/read/close preregistration forms.",
        "Statistics delegated to a separate Python microservice over REST, called from MotorPythonClient.",
        "SIMCA CSV/Excel ingestion and reporting via Apache POI.",
        "Academic period modeled as an explicit state machine driving the validation pipeline.",
      ],
      screenshots: [
        {
          src: "/images/projects/sistema-electivas.svg",
          alt: "Sistema Electivas API documentation view",
          caption: "REST API for the elective-assignment pipeline",
        },
        {
          src: "/images/placeholder-screenshot-1.svg",
          alt: "Sistema Electivas processing pipeline",
          caption: "Academic-period processing pipeline",
        },
      ],
      features: [
        "Dynamic Google Form creation and closing per academic period.",
        "SIMCA CSV/Excel ingestion with automatic inconsistency detection.",
        "Staff workflow to correct or discard inconsistent student records.",
        "Automatic degree-progress and eligibility ('nivelación') calculation.",
        "Assignment-distribution statistics via a companion Python microservice.",
        "Excel report generation for departments, programs and periods.",
      ],
      challenges: [
        {
          challenge:
            "Student records came from three different sources (Google Forms responses, SIMCA CSV exports and the internal database) that didn't always agree on student codes, causing batch validation to fail outright on the first mismatch.",
          solution:
            "Modeled inconsistencies as explicit states (INCONSISTENTE_SIMCA, DATOS_NO_CARGADOS) instead of exceptions, so a batch load surfaces every mismatch at once and staff can correct or discard each record individually before re-running validation.",
        },
        {
          challenge:
            "Computing assignment-distribution statistics per program and semester was CPU-heavy aggregation work that didn't belong inside the transactional request path of the main API.",
          solution:
            "Delegated that computation to a separate Python microservice reached over REST (MotorPythonClient), keeping the Java service focused on domain rules and letting the statistics engine evolve independently.",
        },
        {
          challenge:
            "Eligibility rules ('nivelación') combine credit thresholds, semester counts and elective/thesis exclusions — encoding them as scattered boolean flags would have made the process impossible to audit.",
          solution:
            "Modeled each academic period as an explicit state machine (load → validate → calculate progress → calculate eligibility → publish), so every transition is intentional, logged and only valid from the correct prior state.",
        },
      ],
      learnings: [
        "Structuring a Spring Boot codebase as isolated domain modules instead of the classic controller/service/repository layers cutting across everything.",
        "Integrating a third-party OAuth2 API (Google Forms) behind a single client class the rest of the app never has to know about.",
        "Designing idempotent, resumable batch-validation workflows instead of all-or-nothing imports.",
        "Splitting a monolith's heavy computation into a companion service instead of overloading the main API.",
      ],
    },
  },
  {
    slug: "fv-humphrey",
    name: "HVF Analyzer",
    tagline: "Desktop tool that digitizes and reviews Humphrey visual field exams for ophthalmology.",
    description:
      "A PyQt6 desktop application that turns scanned Humphrey Visual Field exam reports into structured, reviewable data — sensitivity matrix, reliability indices and patient data — using OCR and computer vision, as diagnostic support for ophthalmologists.",
    problem:
      "Ophthalmology clinics track glaucoma progression from Humphrey visual field exams stored as scanned PDFs or photos. Reading the sensitivity matrix and reliability indices by hand for every visit is slow and error-prone across hundreds of patients.",
    image: "/images/projects/fv-humphrey.svg",
    technologies: [
      "Python",
      "PyQt6",
      "OpenCV",
      "SQLAlchemy",
      "PostgreSQL",
      "Docker",
      "RapidOCR",
      "pytest",
    ],
    difficulty: "Advanced",
    status: "In Progress",
    links: {
      demo: "",
      repo: "",
    },
    caseStudy: {
      objective:
        "Build clinical-support desktop software that imports batches of Humphrey visual field exams, extracts the 24-2 sensitivity matrix and reliability indices via OCR, and gives clinicians a side-by-side review screen to correct low-confidence fields before confirming results — always as support, never as the final diagnosis. This is a university research project run by a small team (repository kept private due to patient-data sensitivity); my contribution was a targeted but load-bearing fix to the extraction pipeline: rewriting how the OCR output gets mapped onto the exam's grid and report regions.",
      architecture:
        "A layered PyQt6 application: app/ui for windows and widgets (login, upload, side-by-side review), app/services for auth/config/upload/image handling, app/extraction for the OCR and computer-vision pipeline (segmentation, grid fitting, sensitivity matrix, reliability, validation, folder batch import), and app/repository for SQLAlchemy data access — repositories never commit, leaving transaction boundaries to the caller via get_session(). PostgreSQL 18 runs in Docker; OCR runs on RapidOCR (PP-OCR models over ONNXRuntime) combined with OpenCV and PyMuPDF for PDF rasterization, with python-docx used to cross-check each result against the clinic's reference report. The suite has 20 pytest modules, with OCR-heavy tests gated behind a marker since they need the real (private) dataset.",
      architectureHighlights: [
        "PyQt6 desktop app with a clinical 'medical' theme.",
        "Layered structure: ui / services / extraction / repository / models.",
        "SQLAlchemy repositories that never commit — the caller owns the transaction boundary.",
        "PostgreSQL 18 in Docker; RapidOCR (ONNXRuntime) + OpenCV + PyMuPDF for OCR/rasterization.",
        "python-docx cross-check against each patient's reference report.",
        "20 pytest modules; OCR tests excluded by default via a pytest marker.",
      ],
      screenshots: [
        {
          src: "/images/projects/fv-humphrey.svg",
          alt: "HVF Analyzer review screen",
          caption: "Side-by-side sensitivity grid review",
        },
        {
          src: "/images/placeholder-screenshot-1.svg",
          alt: "HVF Analyzer batch import",
          caption: "Folder-based batch import with OCR progress",
        },
      ],
      features: [
        "Folder-based batch import of visual-field exams with background OCR.",
        "Side-by-side manual review UI to correct low-confidence extracted fields.",
        "24-2 sensitivity-matrix digitization with grayscale-map crop.",
        "Cross-check against each patient's reference .docx report.",
        "Role-based authentication and an insert-only, immutable audit log.",
      ],
      challenges: [
        {
          challenge:
            "Grouping OCR tokens into grid rows by their y-coordinate broke on the 24-2 test's center rows, where digits print staggered around the fixation cross and the OCR read them as spurious extra rows.",
          solution:
            "Replaced row-grouping with nearest-neighbor fitting: every OCR token is matched to its true cell in the known 54-cell canonical 24-2 grid in normalized, scale- and position-independent space, so staggered center digits land in the right cell and empty cells are simply left blank.",
        },
        {
          challenge:
            "Anchoring report regions (sensitivity matrix, deviation maps, grayscale map) to a fixed template bounding box failed as soon as a photo changed framing, scale or angle.",
          solution:
            "Derived regions from content instead: cluster the numeric tokens, split them into vertical bands by the natural gaps between report blocks, then separate groups by horizontal density — using reliable text landmarks as safety bounds — so localization is robust to translation, scale and moderate rotation.",
        },
        {
          challenge:
            "The original OCR engine (PaddleOCR) crashed on some CPUs due to oneDNN issues, and ran far too slowly without that backend.",
          solution:
            "Switched to RapidOCR (the same PP-OCR models running on ONNXRuntime instead), matching accuracy at roughly 6-7 seconds per image without the CPU-specific crashes.",
        },
      ],
      learnings: [
        "Writing scale- and rotation-invariant computer-vision heuristics instead of relying on fixed template coordinates.",
        "Working inside an existing layered architecture and respecting its conventions (no-commit repositories, explicit transaction boundaries).",
        "Evaluating OCR engines on real hardware constraints, not just benchmark accuracy.",
        "Building diagnostic-support software responsibly — the tool assists, the clinician always decides.",
      ],
    },
  },
];

/** Look up a project by slug (used by /projects/[slug]). */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
