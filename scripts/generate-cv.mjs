/**
 * Generates public/cv.pdf from cv-data.mjs using pdfkit.
 * Run with: npm run cv
 *
 * Layout mirrors a classic LaTeX-style resume: centered header, small-caps
 * section headings with a rule, and left/right-aligned entry rows (role +
 * dates on one line, org + location in italics below, bullets underneath).
 */
import PDFDocument from "pdfkit";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cv } from "./cv-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "..", "public", "cv.pdf");

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
    Title: `${cv.name} — Resume`,
    Author: cv.name,
  },
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
  ensureSpace(30);
  doc.moveDown(0.35);
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
  doc.y = ruleY + 8;
}

/** One line with bold left text and regular right-aligned text (dates). */
function entryHeaderRow(left, right) {
  const y = doc.y;
  doc.font("Times-Bold").fontSize(10.5).fillColor(INK).text(left, MARGIN, y, {
    width: CONTENT_WIDTH * 0.72,
  });
  doc
    .font("Times-Roman")
    .fontSize(10)
    .fillColor(MUTED)
    .text(right, MARGIN, y, { width: CONTENT_WIDTH, align: "right" });
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
  doc.moveDown(0.25);
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

/* ── Professional Summary ────────────────────────────────── */
sectionHeading("Professional Summary");
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
sectionHeading("Technical Skills");
for (const group of cv.skills) {
  ensureSpace(14);
  const y = doc.y;
  const labelWidth = 105;
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
sectionHeading("Professional Experience");
for (const job of cv.experience) {
  entryBlock({
    left: job.role,
    right: job.period,
    org: job.org,
    location: job.location,
    bullets: job.bullets,
  });
}

/* ── Featured Projects ────────────────────────────────────── */
sectionHeading("Featured Projects");
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
sectionHeading("Education");
for (const edu of cv.education) {
  ensureSpace(30);
  entryHeaderRow(edu.degree, edu.period);
  sublineRow(`${edu.org} — ${edu.location}`);
  doc.moveDown(0.25);
}

/* ── Certifications ───────────────────────────────────────── */
sectionHeading("Certifications");
for (const cert of cv.certifications) {
  ensureSpace(14);
  bulletLine(`${cert.name} — ${cert.issuer} (${cert.year})`);
}

/* ── Languages ────────────────────────────────────────────── */
sectionHeading("Languages");
doc.font("Times-Roman").fontSize(9.8).fillColor(INK).text(cv.languages, MARGIN, doc.y, {
  width: CONTENT_WIDTH,
});

doc.end();

doc.on("end", () => {
  console.log(`CV written to ${OUTPUT_PATH}`);
});
