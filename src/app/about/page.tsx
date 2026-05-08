import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於我們",
  description: "Go Abroad 是台灣護照旅人專屬的出國工具站，整理簽證、入境、行李等實用資訊。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 prose prose-slate">
      <h1>關於 Go Abroad</h1>
      <p>
        Go Abroad 是專為台灣護照旅人設計的出國工具站，整理各國簽證、入境規定、行李清單等實用資訊，希望讓出國前的準備變得更輕鬆。
      </p>

      <h2>我們提供什麼</h2>
      <ul>
        <li><strong>簽證查詢</strong>：免簽 / 落地簽 / 電子簽證的最新規定，標明更新日期</li>
        <li><strong>行李清單產生器</strong>：依目的地、季節、活動智慧生成清單</li>
        <li>更多工具陸續推出中</li>
      </ul>

      <h2>資料來源</h2>
      <p>
        本站內容主要來自各國駐台代表處公告、外交部領事事務局、官方旅遊資訊網。簽證規定隨時可能異動，<strong>出發前請務必至官方網站確認最新規定</strong>。
      </p>

      <h2>免責聲明</h2>
      <p>
        本站資訊僅供參考，因簽證、入境政策變動頻繁，本站不保證資訊百分之百即時準確。實際入境結果以海關當下決定為準，本站不負任何法律責任。
      </p>

      <h2>聯絡我們</h2>
      <p>
        資訊有誤或想合作？請至 <a href="/contact">聯絡頁面</a> 留言。
      </p>
    </article>
  );
}
