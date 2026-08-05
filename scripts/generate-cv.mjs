/**
 * Renders the CV to public/ as a PDF using pdfkit.
 *
 *   node scripts/generate-cv.mjs en   -> public/cv.pdf
 *   node scripts/generate-cv.mjs es   -> public/cv-es.pdf
 *
 * `npm run cv` builds both so the two editions can never drift.
 *
 * Layout mirrors a classic LaTeX-style resume: centered header, spaced-out
 * section headings with a rule, and left/right-aligned entry rows (role +
 * dates on one line, org + location in italics below, bullets underneath).
 * All wording — including section headings — comes from the locale data
 * file, so this module stays language-agnostic.
 */
import PDFDocument from "pdfkit";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const LOCALES = {
  en: { data: "./cv-data.mjs", output: "cv.pdf" },
  es: { data: "./cv-data-es.mjs", output: "cv-es.pdf" },
};

const locale = (process.argv[2] ?? "en").toLowerCase();
if (!LOCALES[locale]) {
  console.error(
    `Unknown locale "${locale}". Expected one of: ${Object.keys(LOCALES).join(", ")}`
  );
  process.exit(1);
}

const { cv } = await import(LOCALES[locale].data);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(
  __dirname,
  "..",
  "public",
  LOCALES[locale].output
);

const MARGIN = 42;
const PAGE_WIDTH = 612; // US Letter
const PAGE_HEIGHT = 792;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const INK = "#1a1a1a";
const MUTED = "#525252";
const ACCENT = "#5b21b6";

const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
  info: {
    Title: `${cv.name} — ${cv.documentTitle}`,
    Author: cv.name,
  },
  lang: locale,
});

doc.pipe(fs.createWriteStream(OUTPUT_PATH));

/** Starts a fresh page if there isn't enough room left for `minHeight`. */
function ensureSpace(minHeight) {
  const bottom = PAGE_HEIGHT - MARGIN;
  if (doc.y + minHeight > bottom) {
    doc.addPage();
  }
}

function sectionHeading(title) {
  /* Reserve room for the heading *and* a first line under it, so a heading
     can never be orphaned at the bottom of a page. */
  ensureSpace(48);
  doc.moveDown(0.25);
  doc
    .font("Times-Bold")
    .fontSize(11.5)
    .fillColor(ACCENT)
    .text(title.toUpperCase(), MARGIN, doc.y, {
      width: CONTENT_WIDTH,
      characterSpacing: 1.2,
    });
  const ruleY = doc.y + 2;
  doc
    .moveTo(MARGIN, ruleY)
    .lineTo(PAGE_WIDTH - MARGIN, ruleY)
    .lineWidth(0.75)
    .strokeColor(ACCENT)
    .stroke();
  doc.y = ruleY + 6;
}

/** One row with bold left text and regular right-aligned text (dates). */
function entryHeaderRow(left, right) {
  const y = doc.y;
  /* The date column never needs more than ~70pt, so give the title the rest
     minus a gutter — at 0.72 the longer translated titles wrapped for no
     reason while 100pt of the date column sat empty. */
  doc.font("Times-Bold").fontSize(10.5).fillColor(INK).text(left, MARGIN, y, {
    width: CONTENT_WIDTH * 0.84,
  });
  const afterLeft = doc.y;
  doc
    .font("Times-Roman")
    .fontSize(10)
    .fillColor(MUTED)
    .text(right, MARGIN, y, { width: CONTENT_WIDTH, align: "right" });
  /* Both columns start from the same baseline, so drawing the (always
     single-line) date last would rewind doc.y and let the next line overlap
     a title that wrapped. Continue below whichever column is taller. */
  doc.y = Math.max(afterLeft, doc.y);
}

function sublineRow(text) {
  doc
    .font("Times-Italic")
    .fontSize(10)
    .fillColor(MUTED)
    .text(text, MARGIN, doc.y + 2, { width: CONTENT_WIDTH });
}

function bulletLine(text) {
  const bulletIndent = 12;
  const y = doc.y;
  doc
    .font("Times-Roman")
    .fontSize(9.5)
    .fillColor(INK)
    .text("•", MARGIN, y, { width: bulletIndent });
  doc
    .font("Times-Roman")
    .fontSize(9.5)
    .fillColor(INK)
    .text(text, MARGIN + bulletIndent, y, {
      width: CONTENT_WIDTH - bulletIndent,
      align: "left",
    });
  doc.moveDown(0.18);
}

function entryBlock({ left, right, org, location, bullets, link }) {
  ensureSpace(46);
  entryHeaderRow(left, right);
  sublineRow(location ? `${org} — ${location}` : org);
  doc.moveDown(0.2);
  for (const bullet of bullets) {
    ensureSpace(14);
    bulletLine(bullet);
  }
  if (link) {
    ensureSpace(12);
    doc
      .font("Times-Italic")
      .fontSize(9)
      .fillColor(ACCENT)
      .text(link, MARGIN, doc.y, { width: CONTENT_WIDTH });
  }
  doc.moveDown(0.3);
}

/* ── Header ───────────────────────────────────────────────── */
doc.font("Times-Bold").fontSize(22).fillColor(INK).text(cv.name, {
  align: "center",
});
doc.moveDown(0.15);
doc
  .font("Times-Roman")
  .fontSize(11.5)
  .fillColor(MUTED)
  .text(cv.titles, { align: "center" });
doc.moveDown(0.15);
doc
  .font("Times-Roman")
  .fontSize(9.5)
  .fillColor(MUTED)
  .text(`${cv.location}  ·  ${cv.email}`, { align: "center" });
doc.moveDown(0.1);
doc
  .font("Times-Roman")
  .fontSize(9.5)
  .fillColor(ACCENT)
  .text(cv.links.join("  ·  "), { align: "center" });

/* ── Summary ─────────────────────────────────────────────── */
sectionHeading(cv.labels.summary);
/* `align: "justify"` makes pdfkit encode inter-word gaps as pure
   kerning offsets with no space glyph, so copy-paste and ATS resume
   parsers see the whole paragraph as one run-on word. Left-aligned
   text keeps real space characters in the PDF's text layer. */
doc
  .font("Times-Roman")
  .fontSize(9.8)
  .fillColor(INK)
  .text(cv.summary, MARGIN, doc.y, { width: CONTENT_WIDTH, align: "left" });

/* ── Technical Skills ─────────────────────────────────────── */
sectionHeading(cv.labels.skills);
/* Measure the widest label instead of hardcoding a column width —
   translated labels ("DevOps y Herramientas:") are far longer than the
   English ones and would otherwise collide with the items column. */
const labelWidth =
  Math.max(
    ...cv.skills.map((group) =>
      doc.font("Times-Bold").fontSize(9.8).widthOfString(`${group.label}:`)
    )
  ) + 10;
for (const group of cv.skills) {
  ensureSpace(14);
  const y = doc.y;
  doc
    .font("Times-Bold")
    .fontSize(9.8)
    .fillColor(INK)
    .text(`${group.label}:`, MARGIN, y, { width: labelWidth, continued: false });
  doc
    .font("Times-Roman")
    .fontSize(9.8)
    .fillColor(INK)
    .text(group.items, MARGIN + labelWidth, y, {
      width: CONTENT_WIDTH - labelWidth,
    });
  doc.moveDown(0.15);
}

/* ── Professional Experience ─────────────────────────────── */
/* Skipped entirely while there's no experience to list, so the CV never
   shows an orphaned heading with nothing under it. */
if (cv.experience.length > 0) {
  sectionHeading(cv.labels.experience);
  for (const job of cv.experience) {
    entryBlock({
      left: job.role,
      right: job.period,
      org: job.org,
      location: job.location,
      bullets: job.bullets,
    });
  }
}

/* ── Featured Projects ────────────────────────────────────── */
sectionHeading(cv.labels.projects);
for (const project of cv.projects) {
  entryBlock({
    left: `${project.name}  (${project.tag})`,
    right: project.period,
    org: project.org,
    location: project.location,
    bullets: project.bullets,
    link: project.link,
  });
}

/* ── Education ────────────────────────────────────────────── */
sectionHeading(cv.labels.education);
for (const edu of cv.education) {
  ensureSpace(30);
  entryHeaderRow(edu.degree, edu.period);
  sublineRow(`${edu.org} — ${edu.location}`);
  doc.moveDown(0.25);
}

/* ── Certifications ───────────────────────────────────────── */
sectionHeading(cv.labels.certifications);
for (const cert of cv.certifications) {
  ensureSpace(14);
  bulletLine(`${cert.name} — ${cert.issuer} (${cert.year})`);
}

/* ── Languages ────────────────────────────────────────────── */
sectionHeading(cv.labels.languages);
doc.font("Times-Roman").fontSize(9.8).fillColor(INK).text(cv.languages, MARGIN, doc.y, {
  width: CONTENT_WIDTH,
});

doc.end();

doc.on("end", () => {
  console.log(`CV written to ${OUTPUT_PATH}`);
});
