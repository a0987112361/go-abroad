export type TaxRule = {
  slug: string;
  country: string;
  flag: string;
  currency: string;
  vatRate: number;
  refundRate: number;
  threshold: number;
  thresholdNote: string;
  serviceFeeRate: number;
  notes: string[];
  methods: { name: string; description: string }[];
};

export const TAX_RULES: TaxRule[] = [
  {
    slug: "japan",
    country: "日本",
    flag: "🇯🇵",
    currency: "JPY",
    vatRate: 0.10,
    refundRate: 0.10,
    threshold: 5000,
    thresholdNote: "同店家、同一天、未稅 5,000 円以上（一般物品 + 消耗品合計）",
    serviceFeeRate: 0.015,
    notes: [
      "日本是「免稅店即時退稅」制：在貼有 Tax-Free 標示的店家結帳時直接以未稅價購買",
      "需出示護照（電子護照晶片掃描），無需填單",
      "消耗品（食品、飲料、化妝品、藥品）會用透明袋密封，**離境前不可拆封**",
      "2026 年起改為「離境退稅」制（傳聞）— 改成在機場退稅，請以政策公告為準",
    ],
    methods: [
      { name: "店家即時退稅（現行）", description: "結帳時直接以未稅價購買，最常見方式" },
      { name: "百貨公司專櫃退稅", description: "先付含稅價，再到百貨內的退稅櫃台辦" },
    ],
  },
  {
    slug: "korea",
    country: "韓國",
    flag: "🇰🇷",
    currency: "KRW",
    vatRate: 0.10,
    refundRate: 0.07,
    threshold: 30000,
    thresholdNote: "同店家、同一天購買 30,000 韓元以上（≈ NT$700）",
    serviceFeeRate: 0.025,
    notes: [
      "韓國有「即時退稅 (Tax Refund)」與「機場退稅」兩種",
      "即時退稅門檻：單筆 30,000–500,000 韓元，超過要走機場退稅",
      "退稅金額 = 退稅率 × 消費金額（非 VAT 全額），實際退 7–8%",
      "Global Blue / Global Tax Free 等業者會收手續費",
    ],
    methods: [
      { name: "即時退稅 (Instant Refund)", description: "結帳時店家直接退現金，最方便" },
      { name: "機場退稅機 (Kiosk)", description: "在仁川/金浦機場用 Kiosk 自助退稅" },
      { name: "市區退稅 (Downtown Refund)", description: "明洞、東大門等市區退稅站，需信用卡押金" },
    ],
  },
  {
    slug: "france",
    country: "法國",
    flag: "🇫🇷",
    currency: "EUR",
    vatRate: 0.20,
    refundRate: 0.12,
    threshold: 100,
    thresholdNote: "同店家、同一天購買 €100.01 以上",
    serviceFeeRate: 0.04,
    notes: [
      "歐盟最低退稅門檻 €100.01（2021 年起）",
      "需在 3 個月內離境歐盟並完成退稅",
      "Global Blue / Planet 等服務商會收手續費，實際退 11–13%",
      "離境前到機場 PABLO 機台掃單據蓋章，否則退不了",
    ],
    methods: [
      { name: "PABLO 機台 (機場)", description: "戴高樂、奧利機場自助掃單據認證" },
      { name: "Global Blue / Planet", description: "委託業者代辦，退到信用卡或現金" },
    ],
  },
  {
    slug: "germany",
    country: "德國",
    flag: "🇩🇪",
    currency: "EUR",
    vatRate: 0.19,
    refundRate: 0.105,
    threshold: 50,
    thresholdNote: "同店家、同一天購買 €50.01 以上",
    serviceFeeRate: 0.04,
    notes: [
      "德國門檻較低（€50.01），是申根區裡較友善的退稅國",
      "VAT 19%，扣手續費後實退約 10–11%",
      "需在 3 個月內離境歐盟",
      "在法蘭克福、慕尼黑機場海關蓋章",
    ],
    methods: [
      { name: "海關蓋章 + 業者退款", description: "機場海關蓋章後到 Global Blue / Planet 櫃台退" },
      { name: "Digital VAT (部分商家)", description: "部分商家支援電子退稅，免紙本" },
    ],
  },
  {
    slug: "italy",
    country: "義大利",
    flag: "🇮🇹",
    currency: "EUR",
    vatRate: 0.22,
    refundRate: 0.13,
    threshold: 70,
    thresholdNote: "同店家、同一天購買 €70.01 以上",
    serviceFeeRate: 0.05,
    notes: [
      "義大利 VAT 高達 22%，但服務手續費也高",
      "實退約 12–14%",
      "OTELLO 系統電子認證，不需排隊蓋章（部分機場）",
      "需在 3 個月內離境歐盟",
    ],
    methods: [
      { name: "OTELLO 電子認證", description: "羅馬、米蘭等大機場可線上認證，免排隊" },
      { name: "海關蓋章", description: "傳統紙本流程" },
    ],
  },
  {
    slug: "uk",
    country: "英國",
    flag: "🇬🇧",
    currency: "GBP",
    vatRate: 0.20,
    refundRate: 0.0,
    threshold: 0,
    thresholdNote: "❌ 已取消觀光客退稅（2021 年 1 月起）",
    serviceFeeRate: 0,
    notes: [
      "英國脫歐後於 2021 年起**取消觀光客 VAT 退稅**",
      "目前無法退英國的 VAT",
      "若有商家標示「免稅」是針對居民或外交豁免，**觀光客不適用**",
    ],
    methods: [],
  },
];

export function calculateRefund(rule: TaxRule, spend: number) {
  if (rule.refundRate === 0) return { eligible: false, refund: 0, net: 0, percentOfSpend: 0 };
  if (spend < rule.threshold) return { eligible: false, refund: 0, net: 0, percentOfSpend: 0 };
  const refund = spend * rule.refundRate;
  const fee = spend * rule.serviceFeeRate;
  const net = refund - fee;
  return {
    eligible: true,
    refund: Math.round(refund),
    fee: Math.round(fee),
    net: Math.round(net),
    percentOfSpend: net / spend,
  };
}
