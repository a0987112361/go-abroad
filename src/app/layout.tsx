import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_NAME = "Go Abroad｜出國工具站";
const SITE_DESCRIPTION =
  "台灣護照出國工具集：簽證資訊、入境規定、行李清單、旅費試算，最新最完整。";
const SITE_URL = "https://go-abroad.tw";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s｜${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ["簽證", "免簽", "台灣護照", "出國", "旅遊", "入境規定"],
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <header className="border-b border-slate-200">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              ✈️ Go Abroad
            </Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/visa" className="hover:text-blue-600">
                簽證查詢
              </Link>
              <Link href="/tools/luggage" className="hover:text-blue-600">
                行李清單
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 mt-16">
          <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-slate-500 space-y-3">
            <nav className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/about" className="hover:text-blue-600">關於</Link>
              <Link href="/contact" className="hover:text-blue-600">聯絡</Link>
              <Link href="/privacy" className="hover:text-blue-600">隱私權政策</Link>
              <Link href="/terms" className="hover:text-blue-600">服務條款</Link>
            </nav>
            <p>
              © {new Date().getFullYear()} Go Abroad — 出國工具站。簽證規定可能異動，請以官方公告為準。
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
