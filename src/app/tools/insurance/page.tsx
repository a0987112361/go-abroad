import type { Metadata } from "next";
import InsuranceClient from "./InsuranceClient";

export const metadata: Metadata = {
  title: "旅遊保險比較｜7 家旅平險方案估價",
  description:
    "出國旅遊保險比較：國泰、新光、安達、富邦、明台、新安東京、安聯 7 家旅平險方案保障項目、費率區間一次看。輸入天數、目的地、年齡，立刻估價。",
  alternates: { canonical: "/tools/insurance" },
};

export default function InsurancePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          旅遊保險比較
        </h1>
        <p className="text-slate-600">
          輸入旅遊天數、目的地、年齡、保障級別，立刻看到 7 家旅平險公司的估價區間。包含醫療、意外、行李、班機延誤等保障項目對照。
        </p>
      </header>
      <InsuranceClient />
    </div>
  );
}
