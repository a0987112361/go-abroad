import type { Metadata } from "next";
import CurrencyClient, { type Rates } from "./CurrencyClient";

export const metadata: Metadata = {
  title: "台幣換匯計算機｜即時匯率 16 國貨幣",
  description:
    "免費台幣換匯計算機：輸入金額，立刻看到對美金、日幣、韓元、泰銖、歐元、英鎊等 16 種貨幣的換算結果。匯率每小時更新。",
  alternates: { canonical: "/tools/currency" },
};

export const revalidate = 3600;

async function getRates(): Promise<{ rates: Rates; updatedAt: string }> {
  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/TWD", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("rate fetch failed");
    const data = (await res.json()) as { rates: Rates; date: string };
    return { rates: data.rates, updatedAt: data.date };
  } catch {
    return {
      rates: {
        USD: 0.031, JPY: 4.6, KRW: 42, THB: 1.1, VND: 770, PHP: 1.75,
        IDR: 490, MYR: 0.14, SGD: 0.041, HKD: 0.24, EUR: 0.029, GBP: 0.024,
        AUD: 0.047, NZD: 0.051, CAD: 0.043, CNY: 0.22,
      },
      updatedAt: "離線備用匯率",
    };
  }
}

export default async function CurrencyPage() {
  const { rates, updatedAt } = await getRates();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          台幣換匯計算機
        </h1>
        <p className="text-slate-600">
          輸入新台幣金額，立刻看到對 16 國主要貨幣的換算結果。每小時更新匯率。
        </p>
      </header>

      <CurrencyClient rates={rates} updatedAt={updatedAt} />
    </div>
  );
}
