import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getAllVisaSlugs,
  getVisaCountry,
  type VisaCountry,
} from "@/lib/visa";

type Params = { country: string };

export function generateStaticParams(): Params[] {
  return getAllVisaSlugs().map((country) => ({ country }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { country } = await params;
  let data: VisaCountry;
  try {
    data = getVisaCountry(country);
  } catch {
    return {};
  }
  const title = `${data.country}簽證｜台灣護照赴${data.country}最新規定`;
  return {
    title,
    description: data.summary,
    alternates: {
      canonical: `/visa/${data.slug}`,
    },
    openGraph: {
      title,
      description: data.summary,
      type: "article",
    },
  };
}

export default async function VisaCountryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { country } = await params;
  let data: VisaCountry;
  try {
    data = getVisaCountry(country);
  } catch {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${data.country}簽證｜台灣護照赴${data.country}最新規定`,
    description: data.summary,
    datePublished: data.updated,
    dateModified: data.updated,
    author: {
      "@type": "Organization",
      name: "Go Abroad",
    },
    about: {
      "@type": "Country",
      name: data.country,
      identifier: data.countryCode,
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          首頁
        </Link>
        {" / "}
        <Link href="/visa" className="hover:text-blue-600">
          簽證查詢
        </Link>
        {" / "}
        <span className="text-slate-700">{data.country}</span>
      </nav>

      <header className="mb-8 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-5xl">{data.flag}</span>
          <div>
            <h1 className="text-3xl font-bold">
              {data.country}（{data.countryEn}）
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              更新日期：{data.updated}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <Stat
            label="是否需要簽證"
            value={data.visaRequired ? "需要" : "免簽"}
            tone={data.visaRequired ? "amber" : "emerald"}
          />
          <Stat
            label="可停留天數"
            value={data.visaFreeStay > 0 ? `${data.visaFreeStay} 天` : "依類型"}
          />
          <Stat
            label="護照效期"
            value={
              data.passportValidity > 0
                ? `${data.passportValidity} 個月`
                : "涵蓋停留期"
            }
          />
          <Stat label="費用" value={data.fees} />
        </div>
      </header>

      <div className="prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-a:text-blue-600 prose-table:text-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.content}</ReactMarkdown>
      </div>

      <aside className="mt-12 p-5 bg-blue-50 border border-blue-200 rounded-lg text-sm">
        <p className="font-medium mb-1">⚠️ 資訊參考用，請以官方為準</p>
        <p className="text-slate-700">
          簽證規定隨時可能變動，出發前請至{" "}
          <a
            href={data.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            官方網站
          </a>{" "}
          確認最新規定。
        </p>
      </aside>
    </article>
  );
}

function Stat({
  label,
  value,
  tone = "slate",
}: {
  label: string;
  value: string;
  tone?: "slate" | "emerald" | "amber";
}) {
  const tones = {
    slate: "bg-slate-50 border-slate-200 text-slate-900",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-900",
    amber: "bg-amber-50 border-amber-200 text-amber-900",
  };
  return (
    <div className={`p-3 rounded border ${tones[tone]}`}>
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
