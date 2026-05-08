"use client";

import { useMemo, useState } from "react";
import { TAX_RULES, calculateRefund } from "@/lib/taxrefund";

export default function TaxRefundClient() {
  const [slug, setSlug] = useState("japan");
  const [amount, setAmount] = useState("10000");

  const rule = TAX_RULES.find((r) => r.slug === slug) ?? TAX_RULES[0];
  const spend = parseFloat(amount) || 0;
  const result = useMemo(() => calculateRefund(rule, spend), [rule, spend]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-3">選擇國家</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {TAX_RULES.map((r) => (
            <button
              key={r.slug}
              onClick={() => setSlug(r.slug)}
              className={`p-3 rounded border text-sm ${
                slug === r.slug
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-slate-300 hover:border-blue-400"
              }`}
            >
              <div className="text-2xl mb-1">{r.flag}</div>
              <div className="font-medium">{r.country}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 border border-slate-200 rounded-lg space-y-3">
        <h2 className="text-lg font-bold">輸入消費金額（{rule.currency}）</h2>
        <p className="text-xs text-slate-500">{rule.thresholdNote}</p>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{rule.flag}</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 text-2xl font-mono px-4 py-3 border border-slate-300 rounded"
            placeholder="0"
          />
          <span className="text-lg text-slate-600">{rule.currency}</span>
        </div>
      </div>

      {rule.refundRate === 0 ? (
        <div className="p-5 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="font-bold text-amber-900 mb-2">⚠️ {rule.country}已取消觀光客退稅</h3>
          {rule.notes.map((n, i) => (
            <p key={i} className="text-sm text-amber-800 mb-1">• {n}</p>
          ))}
        </div>
      ) : !result.eligible ? (
        <div className="p-5 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="font-bold text-amber-900 mb-1">未達退稅門檻</h3>
          <p className="text-sm text-amber-800">
            {rule.country}退稅門檻：{rule.threshold.toLocaleString()} {rule.currency}（你輸入 {spend.toLocaleString()}）
          </p>
        </div>
      ) : (
        <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-lg">
          <h3 className="font-bold text-emerald-900 mb-3">✅ 可退稅試算</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="消費金額" value={`${spend.toLocaleString()} ${rule.currency}`} />
            <Stat label="退稅金額" value={`${result.refund.toLocaleString()} ${rule.currency}`} tone="emerald" />
            <Stat label="服務手續費" value={`-${result.fee?.toLocaleString() ?? 0} ${rule.currency}`} tone="amber" />
            <Stat label="實際拿到" value={`${result.net.toLocaleString()} ${rule.currency}`} tone="emerald" big />
          </div>
          <p className="text-xs text-emerald-900 mt-3">
            約占消費 {(result.percentOfSpend * 100).toFixed(1)}%
          </p>
        </div>
      )}

      {rule.methods.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-3">退稅方式</h2>
          <ul className="space-y-2">
            {rule.methods.map((m, i) => (
              <li key={i} className="p-3 border border-slate-200 rounded text-sm">
                <span className="font-medium">{m.name}</span>
                <span className="text-slate-600"> — {m.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {rule.notes.length > 0 && rule.refundRate > 0 && (
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg">
          <h3 className="font-bold mb-2">注意事項</h3>
          <ul className="text-sm text-slate-700 space-y-1.5 list-disc pl-5">
            {rule.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600">
        <p className="font-medium mb-1">⚠️ 試算僅供參考</p>
        <p>各國退稅政策、手續費率、業者抽成隨時可能異動，以及不同店家可能有不同處理方式。實際退稅金額以海關 / 業者處理為準。</p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
  big,
}: {
  label: string;
  value: string;
  tone?: "emerald" | "amber";
  big?: boolean;
}) {
  const colors = {
    default: "text-slate-900",
    emerald: "text-emerald-700",
    amber: "text-amber-700",
  } as const;
  return (
    <div className="p-3 bg-white border border-slate-200 rounded">
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className={`font-mono font-semibold ${big ? "text-xl" : "text-base"} ${colors[tone ?? "default"]}`}>
        {value}
      </div>
    </div>
  );
}
