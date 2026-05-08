import type { Metadata } from "next";
import LuggageClient from "./LuggageClient";

export const metadata: Metadata = {
  title: "出國行李清單產生器｜依目的地、季節、活動智慧生成",
  description:
    "免費出國行李清單產生器：輸入目的地、天數、季節、活動，自動生成分類清單，可勾選、列印或存成 PDF。涵蓋日本、韓國、泰國、越南、菲律賓、歐美。",
  alternates: { canonical: "/tools/luggage" },
};

export default function LuggagePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8 print:mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          出國行李清單產生器
        </h1>
        <p className="text-slate-600 print:hidden">
          選擇目的地、天數、季節、活動，立刻生成專屬行李清單。可逐項勾選、列印或存成 PDF。
        </p>
      </header>

      <LuggageClient />
    </div>
  );
}
