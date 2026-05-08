import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隱私權政策",
  description: "Go Abroad 隱私權政策說明：本站如何蒐集、使用與保護您的個人資料。",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 prose prose-slate">
      <h1>隱私權政策</h1>
      <p>最後更新：2026-05-08</p>

      <p>
        歡迎使用 Go Abroad（以下簡稱「本站」）。本站重視使用者個人資料隱私，特訂定本隱私權政策，說明本站如何蒐集、使用與保護您的個人資料。
      </p>

      <h2>1. 資料蒐集範圍</h2>
      <p>本站可能透過以下方式蒐集資料：</p>
      <ul>
        <li><strong>主動提供</strong>：當您透過聯絡表單留言時，會留下姓名、電子郵件等資訊</li>
        <li><strong>自動蒐集</strong>：瀏覽器類型、裝置資訊、IP 位址、瀏覽時間、瀏覽頁面等技術性資訊</li>
        <li><strong>Cookie</strong>：用於改善網站體驗、記住偏好設定</li>
      </ul>

      <h2>2. 資料使用目的</h2>
      <ul>
        <li>提供與改善網站服務</li>
        <li>分析使用者行為以優化內容</li>
        <li>回覆您的詢問</li>
        <li>顯示相關性高的廣告（透過第三方廣告服務）</li>
      </ul>

      <h2>3. 第三方服務</h2>
      <p>本站使用以下第三方服務，這些服務有各自的隱私權政策：</p>
      <ul>
        <li><strong>Google Analytics</strong>：蒐集匿名瀏覽數據</li>
        <li><strong>Google AdSense</strong>：根據您的瀏覽行為顯示相關廣告，並可能使用 Cookie</li>
        <li><strong>聯盟行銷連結</strong>：本站部分連結為聯盟連結（如 KKday、Klook、Booking.com 等），點擊後本站可能會獲得佣金，這不會增加您的費用</li>
      </ul>

      <h2>4. Cookie 政策</h2>
      <p>
        本站使用 Cookie 以提升瀏覽體驗。您可隨時透過瀏覽器設定關閉 Cookie，但部分功能可能因此無法正常運作。
      </p>

      <h2>5. 資料保護</h2>
      <p>
        本站採取合理的技術與管理措施，保護您的個人資料免於遺失、竊取、洩漏、竄改或毀損。
      </p>

      <h2>6. 您的權利</h2>
      <p>您有權查詢、更正或刪除您提供給本站的個人資料。如需行使權利，請透過 <a href="/contact">聯絡頁面</a> 與我們聯繫。</p>

      <h2>7. 政策修訂</h2>
      <p>本站保留隨時修訂本政策的權利，修訂後將公告於本頁面。建議您定期查閱以了解最新內容。</p>

      <h2>8. 聯絡資訊</h2>
      <p>對本政策有任何疑問，請至 <a href="/contact">聯絡頁面</a> 留言。</p>
    </article>
  );
}
