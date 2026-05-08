export type InsuranceProvider = {
  id: string;
  name: string;
  shortName: string;
  url: string;
  features: string[];
  basicCoverage: {
    medical: string;
    accident: string;
    luggage: string;
    flightDelay: string;
  };
  dailyRate: { low: number; high: number };
  highlights: string[];
};

export const PROVIDERS: InsuranceProvider[] = [
  {
    id: "cathay",
    name: "國泰世紀產險",
    shortName: "國泰",
    url: "https://www.cathay-ins.com.tw/insurance/business/personal/oversea-travel/",
    features: ["線上投保", "出發前 5 分鐘可投保", "支援 LINE 客服"],
    basicCoverage: {
      medical: "100–500 萬",
      accident: "200–2,000 萬",
      luggage: "5–10 萬",
      flightDelay: "0.5–1 萬",
    },
    dailyRate: { low: 60, high: 250 },
    highlights: ["突發疾病醫療", "緊急救援", "海外旅遊不便險"],
  },
  {
    id: "shinkong",
    name: "新光產險",
    shortName: "新光",
    url: "https://www.skinsurance.com.tw/SKweb/SKweb_Personal/Travel/Travel.aspx",
    features: ["LINE 線上理賠", "App 上傳收據"],
    basicCoverage: {
      medical: "100–400 萬",
      accident: "300–2,000 萬",
      luggage: "3–8 萬",
      flightDelay: "0.5–1.2 萬",
    },
    dailyRate: { low: 55, high: 220 },
    highlights: ["理賠速度快", "支援 LINE 申請"],
  },
  {
    id: "chubb",
    name: "安達產險",
    shortName: "安達",
    url: "https://www.chubb.com/tw-zh/personal/travel-insurance.html",
    features: ["國際大廠", "海外醫療網絡廣"],
    basicCoverage: {
      medical: "200–1,000 萬",
      accident: "300–3,000 萬",
      luggage: "5–15 萬",
      flightDelay: "0.6–1.5 萬",
    },
    dailyRate: { low: 80, high: 350 },
    highlights: ["醫療上限高", "全球緊急救援", "適合長天數高保額"],
  },
  {
    id: "fubon",
    name: "富邦產險",
    shortName: "富邦",
    url: "https://www.fubon.com/insurance/products/travel/",
    features: ["線上投保", "信用卡可加投"],
    basicCoverage: {
      medical: "100–500 萬",
      accident: "200–2,000 萬",
      luggage: "3–10 萬",
      flightDelay: "0.5–1 萬",
    },
    dailyRate: { low: 60, high: 240 },
    highlights: ["客服據點多", "理賠完整"],
  },
  {
    id: "mingtai",
    name: "明台產險",
    shortName: "明台",
    url: "https://www.mingtai.com.tw/travel/",
    features: ["三井住友海上集團", "日本理賠據點多"],
    basicCoverage: {
      medical: "100–400 萬",
      accident: "200–1,500 萬",
      luggage: "3–8 萬",
      flightDelay: "0.5–1 萬",
    },
    dailyRate: { low: 55, high: 200 },
    highlights: ["去日本特別好用", "日語客服"],
  },
  {
    id: "tmnewa",
    name: "新安東京海上",
    shortName: "新安東京",
    url: "https://www.tmnewa.com.tw/travel-insurance/",
    features: ["東京海上集團", "亞洲據點多"],
    basicCoverage: {
      medical: "100–500 萬",
      accident: "200–2,000 萬",
      luggage: "3–10 萬",
      flightDelay: "0.5–1 萬",
    },
    dailyRate: { low: 60, high: 230 },
    highlights: ["亞洲行程友善", "理賠速度中上"],
  },
  {
    id: "allianz",
    name: "安聯人壽",
    shortName: "安聯",
    url: "https://www.allianz.com.tw/personal/products/travel/",
    features: ["德國集團", "歐洲據點多"],
    basicCoverage: {
      medical: "200–800 萬",
      accident: "200–2,500 萬",
      luggage: "5–12 萬",
      flightDelay: "0.6–1.2 萬",
    },
    dailyRate: { low: 75, high: 280 },
    highlights: ["歐洲旅遊優勢", "全球網絡"],
  },
];

export type Region = "asia" | "europe" | "america" | "oceania";

export const REGION_FACTORS: Record<Region, number> = {
  asia: 1.0,
  europe: 1.4,
  america: 1.5,
  oceania: 1.3,
};

export type AgeGroup = "youth" | "adult" | "senior";

export const AGE_FACTORS: Record<AgeGroup, number> = {
  youth: 0.85,
  adult: 1.0,
  senior: 1.6,
};

export type Tier = "basic" | "mid" | "high";

export const TIER_FACTORS: Record<Tier, number> = {
  basic: 1.0,
  mid: 1.5,
  high: 2.5,
};

export function estimatePrice(
  provider: InsuranceProvider,
  days: number,
  region: Region,
  age: AgeGroup,
  tier: Tier,
): { low: number; high: number } {
  const factor = REGION_FACTORS[region] * AGE_FACTORS[age] * TIER_FACTORS[tier];
  return {
    low: Math.round(provider.dailyRate.low * factor * days),
    high: Math.round(provider.dailyRate.high * factor * days),
  };
}
