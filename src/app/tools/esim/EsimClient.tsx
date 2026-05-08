"use client";

import { useMemo, useState } from "react";
import { PLANS, PROVIDERS, REGIONS } from "@/lib/esim";

type SortKey = "price" | "data" | "days";

export default function EsimClient() {
  const [region, setRegion] = useState("japan");
  const [sort, setSort] = useState<SortKey>("price");

  const plans = useMemo(() => {
    const filtered = PLANS.filter((p) => p.region === region);
    return filtered.sort((a, b) => {
      if (sort === "price") return a.priceTWD - b.priceTWD;
      if (sort === "days") return b.days - a.days;
      return 0;
    });
  }, [region, sort]);

  const provider = (id: string) => PROVIDERS.find((p) => p.id === id)!;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-bold mb-3">選擇目的地</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {REGIONS.map((r) => (
            <button
              key={r.value}
              onClick={() => setRegion(r.value)}
              className={`p-3 rounded border text-sm ${
                region === r.value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-slate-300 hover:border-blue-400"
              }`}
            >
              <div className="text-2xl mb-1">{r.flag}</div>
              <div className="font-medium">{r.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">方案比較（{plans.length} 個）</h2>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="text-sm border border-slate-300 rounded px-3 py-1.5"
          >
            <option value="price">價格低 → 高</option>
            <option value="days">天數多 → 少</option>
          </select>
        </div>

        {plans.length === 0 ? (
          <p className="text-sm text-slate-500">此目的地暫無方案資料</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-50">
                  <th className="text-left py-3 px-3">廠商</th>
                  <th className="text-left py-3 px-3">流量</th>
                  <th className="text-left py-3 px-3">天數</th>
                  <th className="text-right py-3 px-3">價格 (TWD)</th>
                  <th className="text-center py-3 px-3">熱點</th>
                  <th className="py-3 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {plans.map((p, i) => {
                  const pv = provider(p.providerId);
                  return (
                    <tr key={i} className="border-b border-slate-200 hover:bg-slate-50">
                      <td className="py-3 px-3">
                        <span className="text-xl mr-2">{pv.logo}</span>
                        <span className="font-medium">{pv.name}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-mono">{p.data}</span>
                        {p.unlimited && (
                          <span className="ml-1 text-xs px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                            吃到飽
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono">{p.days} 天</td>
                      <td className="py-3 px-3 text-right font-mono font-semibold">
                        ${p.priceTWD.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-center">
                        {p.hotspot ? "✅" : "❌"}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <a
                          href={pv.url}
                          target="_blank"
                          rel="nofollow sponsored noopener"
                          className="text-blue-600 hover:underline text-xs"
                        >
                          前往購買 →
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-bold mb-3">廠商特色比較</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROVIDERS.map((p) => (
            <div key={p.id} className="p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{p.logo}</span>
                <a
                  href={p.url}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="text-lg font-semibold hover:text-blue-600"
                >
                  {p.name} →
                </a>
              </div>
              <ul className="text-sm text-slate-600 space-y-1 mb-3">
                {p.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
              <div className="text-xs space-y-1">
                <div className="text-emerald-700">
                  <strong>優點：</strong>
                  {p.pros.join("、")}
                </div>
                <div className="text-amber-700">
                  <strong>缺點：</strong>
                  {p.cons.join("、")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
        <p className="font-medium mb-1">⚠️ 價格僅供參考</p>
        <p>
          eSIM 廠商常有促銷、訂閱優惠、首購折扣，實際價格以該廠官網結帳金額為準。本站可能透過聯盟連結獲得佣金，但不影響你的購買費用。
        </p>
      </div>
    </div>
  );
}
