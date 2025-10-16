/**
 * TimeProofs — PDF Certificate (v0.2)
 * Generates a human-readable proof certificate as a PDF.
 * Depends on jsPDF; will auto-load from CDN if not present.
 *
 * Usage:
 *   import { downloadProofPDF, ensureJsPDF } from "./pdf-certificate.js";
 *   await ensureJsPDF();
 *   await downloadProofPDF(proofJson); // triggers browser download
 */

const JSPDF_CDN = "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js";

/**
 * Dynamically load jsPDF if not already available.
 * @returns {Promise<void>}
 */
export async function ensureJsPDF() {
  if (window.jspdf?.jsPDF) return;
  await new Promise((resolve, reject) => {
    const el = document.createElement("script");
    el.src = JSPDF_CDN;
    el.async = true;
    el.onload = () => (window.jspdf?.jsPDF ? resolve() : reject(new Error("jsPDF failed to load")));
    el.onerror = () => reject(new Error("Failed to load jsPDF from CDN"));
    document.head.appendChild(el);
  });
}

/**
 * Generate and download a PDF certificate for a proof object.
 * @param {Object} proof - { ok, hash, timestamp, signature, verify_url, type?, meta? }
 * @param {Object} [opts]
 * @param {string} [opts.filename="timeproofs-certificate.pdf"]
 * @param {string} [opts.issuer="TimeProofs"]
 * @param {string} [opts.website="https://timeproofs.vercel.app"]
 */
export async function downloadProofPDF(proof, opts = {}) {
  await ensureJsPDF();
  const { jsPDF } = window.jspdf;

  const filename = opts.filename || "timeproofs-certificate.pdf";
  const issuer = opts.issuer || "TimeProofs";
  const website = opts.website || "https://timeproofs.vercel.app";

  // Basic validation
  if (!proof || !proof.hash || !proof.timestamp || !proof.signature) {
    throw new Error("Invalid proof object. Expected { hash, timestamp, signature, ... }");
  }

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 56;
  let y = margin;

  // Helpers
  const H = (txt, size = 18) => { doc.setFont("helvetica", "bold"); doc.setFontSize(size); };
  const T = (txt, size = 11) => { doc.setFont("helvetica", "normal"); doc.setFontSize(size); };
  const line = () => { doc.setDrawColor(50); doc.line(margin, y, doc.internal.pageSize.getWidth() - margin, y); y += 16; };
  const addLabelValue = (label, value) => {
    H(label.toUpperCase(), 10); doc.text(label.toUpperCase(), margin, y);
    y += 14;
    T();
    const block = doc.splitTextToSize(String(value ?? ""), doc.internal.pageSize.getWidth() - margin * 2);
    doc.text(block, margin, y);
    y += block.length * 14 + 8;
  };

  // Header
  // Badge
  doc.setDrawColor(34, 211, 238);
  doc.setLineWidth(1.2);
  doc.roundedRect(margin, y - 8, 140, 26, 6, 6);
  H("TimeProofs Certificate", 12);
  doc.text("TimeProofs Certificate", margin + 12, y + 10);
  y += 40;

  // Title
  H("Proof of Existence", 28);
  doc.text("Proof of Existence", margin, y);
  y += 10;
  T(12);
  doc.setTextColor(120);
  doc.text("Hash locally • Timestamp via API • Verify publicly — no blockchain, no friction.", margin, y + 16);
  doc.setTextColor(0);
  y += 36;

  line();

  // Core fields
  addLabelValue("Status", proof.ok === false ? "INVALID" : "VALID");
  addLabelValue("Hash (SHA-256)", proof.hash);
  addLabelValue("Timestamp (UTC)", formatISO(proof.timestamp));
  addLabelValue("Signature (HMAC-SHA256 over hash|timestamp)", proof.signature);

  // Optional fields
  if (proof.type) addLabelValue("Type", String(proof.type));
  if (proof.meta) {
    let metaStr;
    try { metaStr = JSON.stringify(proof.meta, null, 2); } catch { metaStr = String(proof.meta); }
    addLabelValue("Meta", metaStr);
  }
  if (proof.verify_url) addLabelValue("Verify URL", proof.verify_url);

  line();

  // Footer / issuer
  H("Issuer", 12);
  doc.text(issuer, margin, y + 14);
  T(11);
  doc.text(website, margin, y + 30);
  y += 46;

  // Disclaimer
  T(10);
  doc.setTextColor(100);
  const disclaimer =
    "This certificate attests that the provided SHA-256 hash existed at the recorded time. " +
    "The signature was generated server-side using HMAC-SHA256 over `hash + timestamp`. " +
    "Anyone may verify the proof via the Verify URL without access to the original content. " +
    "No files or plaintext content were uploaded to the issuer.";
  const disclaimerLines = doc.splitTextToSize(disclaimer, doc.internal.pageSize.getWidth() - margin * 2);
  doc.text(disclaimerLines, margin, y);
  doc.setTextColor(0);

  // Save
  doc.save(filename);
}

/** Format ISO timestamp as readable UTC string (keeps source if invalid) */
function formatISO(ts) {
  try {
    const d = new Date(ts);
    if (isNaN(d.getTime())) return String(ts);
    return d.toISOString();
  } catch {
    return String(ts);
  }
    }
