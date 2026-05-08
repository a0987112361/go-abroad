import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type VisaFrontmatter = {
  slug: string;
  country: string;
  countryEn: string;
  countryCode: string;
  flag: string;
  visaRequired: boolean;
  visaFreeStay: number;
  visaTypes?: string[];
  purpose?: string[];
  extraDocs?: string[];
  passportValidity: number;
  fees: string;
  processingTime: string;
  officialUrl: string;
  updated: string | Date;
  summary: string;
};

export type VisaCountry = Omit<VisaFrontmatter, "updated"> & {
  updated: string;
  content: string;
};

const VISA_DIR = path.join(process.cwd(), "src", "content", "visa");

export function getAllVisaSlugs(): string[] {
  return fs
    .readdirSync(VISA_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getVisaCountry(slug: string): VisaCountry {
  const file = fs.readFileSync(path.join(VISA_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(file);
  const fm = data as VisaFrontmatter;
  const updated =
    fm.updated instanceof Date
      ? (fm.updated as Date).toISOString().slice(0, 10)
      : String(fm.updated);
  return { ...fm, updated, content };
}

export function getAllVisaCountries(): VisaCountry[] {
  return getAllVisaSlugs()
    .map((slug) => getVisaCountry(slug))
    .sort((a, b) => a.country.localeCompare(b.country, "zh-Hant"));
}
