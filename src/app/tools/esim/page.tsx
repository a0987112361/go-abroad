import type { Metadata } from "next";
import EsimClient from "./EsimClient";

export const metadata: Metadata = {
  title: "出國 eSIM 比較｜Airalo / Holafly / Saily 等 8 家方案一次看",
  description:
    "出國 eSIM 完整比較：Airalo、Holafly、Saily、Nomad、Ubigi、Klook eSIM、KKday eSIM 等熱門廠商方案，包含日本、韓國、泰國、美國、歐洲等熱門目的地。",
  alternates: { canonical: "/tools/esim" },
};

export default function EsimPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          出國 eSIM 比較
        </h1>
        <p className="text-slate-600">
          選目的地，立刻看到 8 家熱門 eSIM 廠商方案、流量、天數、價格、是否支援熱點分享。一次比完不再亂買。
        </p>
      </header>
      <EsimClient />
    </div>
  );
}
