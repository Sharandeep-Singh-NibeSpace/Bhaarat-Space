import fs from "fs";
import path from "path";

function inquiriesFile() {
  // Vercel serverless FS is read-only except /tmp (ephemeral per instance).
  const dir = process.env.VERCEL
    ? "/tmp"
    : path.join(process.cwd(), "data");
  return path.join(dir, "inquiries.json");
}

export function readInquiries() {
  try {
    const parsed = JSON.parse(fs.readFileSync(inquiriesFile(), "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveInquiry(entry) {
  const file = inquiriesFile();
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const all = readInquiries();
  all.unshift(entry);
  fs.writeFileSync(file, JSON.stringify(all, null, 2), "utf8");
  return entry;
}
