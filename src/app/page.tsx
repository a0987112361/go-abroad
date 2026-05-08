import Link from "next/link";
import { getAllVisaCountries } from "@/lib/visa";

const POPULAR_SLUGS = ["japan", "korea", "thailand", "usa", "vietnam", "singapore"];

export default function Home() {
  const allCountries = getAllVisaCountries();
  const popular = POPULAR_SLUGS
    .map((s) => allCountries.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          出國工具，一站搞定
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          台灣護照出國前必查：簽證規定、停留天數、入境須備文件、行李清單、旅費分攤、即時匯率。
        </p>
      </section>

      <section className="mt-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold">熱門國家簽證</h2>
          <Link href="/visa" className="text-sm text-blue-600 hover:underline">
            全部 {allCountries.length} 國 →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popular.map((c) => (
            <Link
              key={c.slug}
              href={`/visa/${c.slug}`}
              className="block p-5 border border-slate-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{c.flag}</span>
                <h3 className="text-lg font-semibold">{c.country}</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">{c.summary}</p>
              <div className="flex items-center gap-2 text-xs">
                {c.visaRequired ? (
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded">
                    需要簽證
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded">
                    免簽 {c.visaFreeStay} 天
                  </span>
                )}
                <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded">
                  護照 {c.passportValidity > 0 ? `${c.passportValidity} 個月` : "效期內"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">出國工具</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ToolCard
            href="/tools/luggage"
            emoji="🧳"
            title="行李清單產生器"
            desc="依目的地、天數、季節、活動自動生成清單，可勾選、列印、存 PDF。"
          />
          <ToolCard
            href="/tools/split-bill"
            emoji="💸"
            title="旅費分攤計算機"
            desc="一群人出去玩誰墊錢，自動算每人收支與最少轉帳次數。"
          />
          <ToolCard
            href="/tools/currency"
            emoji="💱"
            title="台幣換匯計算機"
            desc="即時匯率對 16 國貨幣，每小時更新，反向換算物價。"
          />
        </div>
      </section>
    </div>
  );
}

function ToolCard({
  href,
  emoji,
  title,
  desc,
}: {
  href: string;
  emoji: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="block p-6 border border-slate-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition"
    >
      <div className="text-3xl mb-2">{emoji}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-slate-600">{desc}</p>
    </Link>
  );
}
