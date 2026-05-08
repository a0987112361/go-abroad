import type { Metadata } from "next";
import TimezoneClient from "./TimezoneClient";

export const metadata: Metadata = {
  title: "世界時差查詢｜台北 vs 各國城市即時時間",
  description:
    "免費時差查詢工具：選來源 / 目標城市，立刻看到雙邊現在時間與時差。自動處理日光節約時間（DST）。",
  alternates: { canonical: "/tools/timezone" },
};

export default function TimezonePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          世界時差查詢
        </h1>
        <p className="text-slate-600">
          想跟在國外的朋友視訊？查飛機降落時當地是幾點？選兩個城市，馬上看時差。
        </p>
      </header>
      <TimezoneClient />
    </div>
  );
}
