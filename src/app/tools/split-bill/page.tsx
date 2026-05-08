import type { Metadata } from "next";
import SplitBillClient from "./SplitBillClient";

export const metadata: Metadata = {
  title: "旅費分攤計算機｜出國分帳免吵架",
  description:
    "免費旅費分攤工具：輸入成員、誰墊錢，自動算出每人收支與最少轉帳次數。出國旅遊、聚餐 AA 必備。",
  alternates: { canonical: "/tools/split-bill" },
};

export default function SplitBillPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          旅費分攤計算機
        </h1>
        <p className="text-slate-600">
          一群人出去玩，誰墊了什麼一筆筆輸入。系統自動算出每人收支、誰該轉給誰多少錢，**最少轉帳次數**。
        </p>
      </header>
      <SplitBillClient />
    </div>
  );
}
