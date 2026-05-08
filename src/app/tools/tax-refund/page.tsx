import type { Metadata } from "next";
import TaxRefundClient from "./TaxRefundClient";

export const metadata: Metadata = {
  title: "退稅試算機｜日韓歐 VAT 退多少",
  description:
    "免費退稅試算工具：選國家、輸入消費金額，立刻算出可退稅多少（扣手續費後實拿）。涵蓋日本、韓國、法國、德國、義大利、英國。",
  alternates: { canonical: "/tools/tax-refund" },
};

export default function TaxRefundPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          退稅試算機
        </h1>
        <p className="text-slate-600">
          出國購物退稅實際拿多少？選國家、輸入消費金額，自動算出退稅金額與扣手續費後實拿。
        </p>
      </header>
      <TaxRefundClient />
    </div>
  );
}
