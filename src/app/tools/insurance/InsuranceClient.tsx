"use client";

import { useState } from "react";
import {
  PROVIDERS,
  estimatePrice,
  type AgeGroup,
  type Region,
  type Tier,
} from "@/lib/insurance";

const REGIONS: { value: Region; label: string; flag: string }[] = [
  { value: "asia", label: "亞洲", flag: "🌏" },
  { value: "europe", label: "歐洲", flag: "🇪🇺" },
  { value: "america", label: "美洲", flag: "🌎" },
  { value: "oceania", label: "大洋洲", flag: "🇦🇺" },
];

const AGES: { value: AgeGroup; label: string }[] = [
  { value: "youth", label: "0–17 / 學生" },
  { value: "adult", label: "18–60 歲" },
  { value: "senior", label: "60 歲以上" },
];

const TIERS: { value: Tier; label: string; desc: string }[] = [
  { value: "basic", label: "基本", desc: "醫療 100 萬以下" },
  { value: "mid", label: "中階", desc: "醫療 200–500 萬 + 不便險" },
  { value: "high", label: "高階", desc: "醫療 500 萬以上 + 完整不便險" },
];

export default function InsuranceClient() {
  const [days, setDays] = useState(7);
  const [region, setRegion] = useState<Region>("asia");
  const [age, setAge] = useState<AgeGroup>("adult");
  const [tier, setTier] = useState<Tier>("mid");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title={`旅遊天數：${days} 天`}>
          <input
            type="range"
            min={1}
            max={60}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full"
          />
        </Card>

        <Card title="目的地區域">
          <div className="grid grid-cols-4 gap-2">
            {REGIONS.map((r) => (
              <button
                key={r.value}
                onClick={() => setRegion(r.value)}
                className={`px-2 py-2 rounded border text-sm ${
                  region === r.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-slate-300 hover:border-blue-400"
                }`}
              >
                <span className="block text-lg">{r.flag}</span>
                {r.label}
              </button>
            ))}
          </div>
        </Card>

        <Card title="年齡">
          <div className="grid grid-cols-3 gap-2">
            {AGES.map((a) => (
              <button
                key={a.value}
                onClick={() => setAge(a.value)}
                className={`px-2 py-2 rounded border text-sm ${
                  age === a.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-slate-300 hover:border-blue-400"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </Card>

        <Card title="保障級別">
          <div className="grid grid-cols-3 gap-2">
            {TIERS.map((t) => (
              <button
                key={t.value}
                onClick={() => setTier(t.value)}
                className={`px-2 py-2 rounded border text-xs ${
                  tier === t.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-slate-300 hover:border-blue-400"
                }`}
              >
                <div className="font-medium text-sm">{t.label}</div>
                <div className={tier === t.value ? "text-blue-100" : "text-slate-500"}>
                  {t.desc}
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-3">7 家保險公司估價</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-300 bg-slate-50">
                <th className="text-left py-3 px-3">保險公司</th>
                <th className="text-left py-3 px-3">醫療</th>
                <th className="text-left py-3 px-3">意外</th>
                <th className="text-left py-3 px-3">行李</th>
                <th className="text-left py-3 px-3">班機延誤</th>
                <th className="text-right py-3 px-3">估價</th>
                <th className="py-3 px-3"></th>
              </tr>
            </thead>
            <tbody>
              {PROVIDERS.map((p) => {
                const price = estimatePrice(p, days, region, age, tier);
                return (
                  <tr key={p.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="py-3 px-3">
                      <div className="font-medium">{p.shortName}</div>
                      <div className="text-xs text-slate-500">{p.name}</div>
                    </td>
                    <td className="py-3 px-3 text-xs">{p.basicCoverage.medical}</td>
                    <td className="py-3 px-3 text-xs">{p.basicCoverage.accident}</td>
                    <td className="py-3 px-3 text-xs">{p.basicCoverage.luggage}</td>
                    <td className="py-3 px-3 text-xs">{p.basicCoverage.flightDelay}</td>
                    <td className="py-3 px-3 text-right font-mono">
                      <div className="font-semibold">
                        ${price.low.toLocaleString()}–${price.high.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-500">{days} 天合計</div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="nofollow sponsored noopener"
                        className="text-blue-600 hover:underline text-xs whitespace-nowrap"
                      >
                        前往投保 →
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-3">各家特色</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PROVIDERS.map((p) => (
            <div key={p.id} className="p-4 border border-slate-200 rounded-lg">
              <h3 className="font-semibold mb-2">{p.shortName}</h3>
              <ul className="text-xs text-slate-600 space-y-0.5 mb-2">
                {p.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
              <p className="text-xs text-emerald-700">
                <strong>賣點：</strong>
                {p.highlights.join("、")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 bg-amber-50 border border-amber-200 rounded text-sm">
        <h3 className="font-bold text-amber-900 mb-2">⚠️ 怎麼選旅平險</h3>
        <ul className="text-amber-800 space-y-1 list-disc pl-5">
          <li>**醫療額度**：歐美建議 500 萬以上，亞洲 200 萬即可（醫療費用差異大）</li>
          <li>**突發疾病醫療**：很多基本款不含此項，務必確認</li>
          <li>**不便險**：班機延誤、行李遺失，自由行強烈建議加</li>
          <li>**信用卡免費贈送**：部分白金卡、世界卡持卡人刷卡買機票贈送，但通常保額不夠</li>
          <li>**何時買最便宜**：通常出發前 1–14 天購買最便宜，不必太早</li>
        </ul>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600">
        <p className="font-medium mb-1">⚠️ 估價僅供參考</p>
        <p>
          實際保費依保險公司方案、年齡、保障項目組合不同，請以保險公司官網最終結算金額為準。本站不收取資料、不代為投保。
        </p>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 border border-slate-200 rounded-lg">
      <p className="text-sm font-medium mb-3">{title}</p>
      {children}
    </div>
  );
}
