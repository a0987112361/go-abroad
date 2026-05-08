"use client";

import { useMemo, useState } from "react";

export type Rates = Record<string, number>;

const POPULAR = [
  { code: "USD", label: "美元", flag: "🇺🇸" },
  { code: "JPY", label: "日圓", flag: "🇯🇵" },
  { code: "KRW", label: "韓元", flag: "🇰🇷" },
  { code: "THB", label: "泰銖", flag: "🇹🇭" },
  { code: "VND", label: "越南盾", flag: "🇻🇳" },
  { code: "PHP", label: "菲律賓披索", flag: "🇵🇭" },
  { code: "IDR", label: "印尼盾", flag: "🇮🇩" },
  { code: "MYR", label: "馬來西亞令吉", flag: "🇲🇾" },
  { code: "SGD", label: "新加坡幣", flag: "🇸🇬" },
  { code: "HKD", label: "港幣", flag: "🇭🇰" },
  { code: "EUR", label: "歐元", flag: "🇪🇺" },
  { code: "GBP", label: "英鎊", flag: "🇬🇧" },
  { code: "AUD", label: "澳幣", flag: "🇦🇺" },
  { code: "NZD", label: "紐元", flag: "🇳🇿" },
  { code: "CAD", label: "加幣", flag: "🇨🇦" },
  { code: "CNY", label: "人民幣", flag: "🇨🇳" },
];

export default function CurrencyClient({
  rates,
  updatedAt,
}: {
  rates: Rates;
  updatedAt: string;
}) {
  const [twdAmount, setTwdAmount] = useState("1000");
  const [highlight, setHighlight] = useState<string>("USD");

  const amount = parseFloat(twdAmount) || 0;

  const conversions = useMemo(
    () =>
      POPULAR.map((p) => ({
        ...p,
        rate: rates[p.code],
        value: rates[p.code] ? amount * rates[p.code] : null,
      })),
    [amount, rates],
  );

  const reverseAmount = (foreignAmount: number, code: string) => {
    const rate = rates[code];
    if (!rate) return 0;
    return foreignAmount / rate;
  };

  return (
    <div className="space-y-6">
      <div className="p-5 bg-blue-50 border border-blue-200 rounded-lg">
        <label className="block text-sm font-medium mb-2">換算金額（新台幣 NT$）</label>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🇹🇼</span>
          <input
            type="number"
            value={twdAmount}
            onChange={(e) => setTwdAmount(e.target.value)}
            className="flex-1 text-2xl font-mono px-4 py-3 border border-blue-300 rounded bg-white"
          />
          <span className="text-lg text-slate-600">TWD</span>
        </div>
        <p className="text-xs text-slate-500 mt-2">匯率更新時間：{updatedAt}（每小時更新一次）</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {conversions.map((c) => (
          <button
            key={c.code}
            onClick={() => setHighlight(c.code)}
            className={`text-left p-4 border rounded-lg transition ${
              highlight === c.code
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                : "border-slate-200 bg-white hover:border-blue-400"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{c.flag}</span>
              <span className="font-medium text-sm">
                {c.label} ({c.code})
              </span>
            </div>
            {c.value !== null ? (
              <>
                <div className="font-mono text-lg font-semibold">
                  {c.value.toLocaleString(undefined, {
                    maximumFractionDigits: c.code === "VND" || c.code === "IDR" || c.code === "JPY" || c.code === "KRW" ? 0 : 2,
                  })}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  1 TWD = {c.rate?.toFixed(4)} {c.code}
                </div>
              </>
            ) : (
              <div className="text-sm text-slate-400">無資料</div>
            )}
          </button>
        ))}
      </div>

      <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg">
        <h2 className="text-lg font-bold mb-3">反向換算（外幣 → 台幣）</h2>
        <p className="text-xs text-slate-500 mb-3">假設在當地看到 1,000 元商品，等於台幣多少：</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-300">
              <th className="text-left py-2">幣別</th>
              <th className="text-right py-2">當地 1,000</th>
              <th className="text-right py-2">當地 100</th>
            </tr>
          </thead>
          <tbody>
            {POPULAR.filter((p) => rates[p.code]).map((p) => (
              <tr key={p.code} className="border-b border-slate-200">
                <td className="py-2">
                  {p.flag} {p.label}
                </td>
                <td className="text-right font-mono">
                  NT${" "}
                  {Math.round(reverseAmount(1000, p.code)).toLocaleString()}
                </td>
                <td className="text-right font-mono text-slate-600">
                  NT${" "}
                  {Math.round(reverseAmount(100, p.code)).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">
        ※ 匯率資料來自 exchangerate-api.com。實際銀行兌換或刷卡會有手續費與買賣價差，請以銀行公告為準。
      </p>
    </div>
  );
}
