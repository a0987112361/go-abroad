import type { Metadata } from "next";
import Link from "next/link";
import { getAllVisaCountries } from "@/lib/visa";

export const metadata: Metadata = {
  title: "簽證查詢｜台灣護照各國簽證一覽",
  description:
    "台灣護照赴各國簽證、免簽、停留天數、入境規定總整理。日本、韓國、泰國、越南、菲律賓最新資訊。",
  alternates: {
    canonical: "/visa",
  },
};

export default function VisaIndexPage() {
  const countries = getAllVisaCountries();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          台灣護照各國簽證查詢
        </h1>
        <p className="text-slate-600">
          收錄熱門國家的簽證類型、停留天數、護照效期需求、必備文件。
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-300">
              <th className="text-left py-3 px-3">國家</th>
              <th className="text-left py-3 px-3">簽證</th>
              <th className="text-left py-3 px-3">停留天數</th>
              <th className="text-left py-3 px-3">護照效期</th>
              <th className="text-left py-3 px-3">費用</th>
              <th className="text-left py-3 px-3"></th>
            </tr>
          </thead>
          <tbody>
            {countries.map((c) => (
              <tr
                key={c.slug}
                className="border-b border-slate-200 hover:bg-slate-50"
              >
                <td className="py-3 px-3">
                  <Link
                    href={`/visa/${c.slug}`}
                    className="flex items-center gap-2 font-medium hover:text-blue-600"
                  >
                    <span className="text-2xl">{c.flag}</span>
                    {c.country}
                  </Link>
                </td>
                <td className="py-3 px-3">
                  {c.visaRequired ? (
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs">
                      需要
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs">
                      免簽
                    </span>
                  )}
                </td>
                <td className="py-3 px-3">
                  {c.visaFreeStay > 0 ? `${c.visaFreeStay} 天` : "依簽證類型"}
                </td>
                <td className="py-3 px-3 text-slate-600">
                  {c.passportValidity > 0
                    ? `${c.passportValidity} 個月以上`
                    : "涵蓋停留期間"}
                </td>
                <td className="py-3 px-3 text-slate-600">{c.fees}</td>
                <td className="py-3 px-3 text-right">
                  <Link
                    href={`/visa/${c.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    詳細 →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 mt-6">
        ※ 本表為一般觀光目的之資訊，商務、留學、打工度假等特殊用途請查閱對應簽證規定。簽證政策可能異動，請以官方公告為準。
      </p>
    </div>
  );
}
