import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "聯絡我們",
  description: "Go Abroad 聯絡資訊：資訊勘誤、合作提案、廣告刊登請來信。",
  alternates: { canonical: "/contact" },
};

const CONTACT_EMAIL = "hello@go-abroad.tw";

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 prose prose-slate">
      <h1>聯絡我們</h1>

      <p>感謝您願意與我們聯繫，請依以下情境選擇對應方式：</p>

      <h2>📧 電子郵件</h2>
      <p>
        通用聯絡：<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>

      <h2>常見來信類型</h2>

      <h3>1. 簽證資訊勘誤</h3>
      <p>
        如果發現本站簽證資訊有誤、過時，請來信告知。請附上：
      </p>
      <ul>
        <li>頁面網址</li>
        <li>哪段資訊有誤</li>
        <li>正確資訊出處（官方網站連結）</li>
      </ul>

      <h3>2. 商業合作 / 廣告刊登</h3>
      <p>歡迎旅遊相關品牌洽談合作（業配文、Banner 廣告、聯盟方案）。請來信告知：</p>
      <ul>
        <li>公司名稱與業務範圍</li>
        <li>合作形式</li>
        <li>預算範圍</li>
      </ul>

      <h3>3. 內容投稿</h3>
      <p>
        若您有實際出國經驗想分享（例如某國最新入境流程、特殊簽證申請心得），歡迎來信。
      </p>

      <h3>4. 其他</h3>
      <p>
        媒體採訪、技術合作、學術引用等其他用途也歡迎來信討論。
      </p>

      <h2>回覆時間</h2>
      <p>
        我們會盡快回覆，一般工作日 1–3 天內。週末與國定假日可能延遲。
      </p>
    </article>
  );
}
