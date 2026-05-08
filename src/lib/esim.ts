export type EsimProvider = {
  id: string;
  name: string;
  logo: string;
  url: string;
  features: string[];
  pros: string[];
  cons: string[];
  referralCode?: string;
  referralNote?: string;
};

export type EsimPlan = {
  providerId: string;
  region: string;
  data: string;
  days: number;
  priceUSD: number;
  priceTWD: number;
  hotspot: boolean;
  unlimited?: boolean;
};

export const PROVIDERS: EsimProvider[] = [
  {
    id: "airalo",
    name: "Airalo",
    logo: "📡",
    url: "https://www.airalo.com/?referral=EELCAK4639",
    features: ["全球 200+ 國", "App 直接購買啟用", "支援 24 小時客服"],
    pros: ["國家覆蓋最廣", "App 介面直觀", "輸入推薦碼 EELCAK4639 首購折抵 US$3"],
    cons: ["部分國家速度只到 4G", "用完不可加購要重買"],
    referralCode: "EELCAK4639",
    referralNote: "結帳時輸入此推薦碼，首次購買折抵 US$3（約 NT$100）",
  },
  {
    id: "holafly",
    name: "Holafly",
    logo: "🌐",
    url: "https://esim.holafly.com/",
    features: ["大多吃到飽", "WhatsApp 客服 24/7", "100+ 目的地"],
    pros: ["真正吃到飽（不限速）", "客服回應快", "適合重度用戶"],
    cons: ["相對貴", "部分方案不能熱點分享"],
  },
  {
    id: "saily",
    name: "Saily",
    logo: "⛵",
    url: "https://saily.com/",
    features: ["NordVPN 旗下", "150+ 目的地", "App 操作簡單"],
    pros: ["大廠背書、品質穩定", "價格中等偏低"],
    cons: ["品牌新，評價樣本少"],
  },
  {
    id: "nomad",
    name: "Nomad",
    logo: "🧳",
    url: "https://www.getnomad.app/",
    features: ["170+ 目的地", "5G 支援多國"],
    pros: ["5G 覆蓋率高", "價格透明"],
    cons: ["客服回應慢"],
  },
  {
    id: "ubigi",
    name: "Ubigi",
    logo: "🚀",
    url: "https://cellulardata.ubigi.com/",
    features: ["Transatel 旗下", "200+ 目的地"],
    pros: ["大電信商網路品質", "可加購"],
    cons: ["介面較舊", "中文資訊少"],
  },
  {
    id: "klook-esim",
    name: "Klook eSIM",
    logo: "🎫",
    url: "https://www.klook.com/zh-TW/activity-search/?keyword=eSIM&aid=120721",
    features: ["透過 Klook 平台", "中文客服", "搭配行程一起買"],
    pros: ["中文購買流程", "搭機票/住宿有時優惠"],
    cons: ["價格未必最低", "供應商不固定"],
  },
  {
    id: "kkday-esim",
    name: "KKday eSIM",
    logo: "🎟️",
    url: "https://www.kkday.com/zh-tw/product/list?keyword=eSIM",
    features: ["KKday 平台", "中文客服"],
    pros: ["LINE 客服", "支援多種付款"],
    cons: ["價格未必最低"],
  },
  {
    id: "chunghwa-roam",
    name: "中華電信漫遊",
    logo: "📞",
    url: "https://www.cht.com.tw/home/consumer/roaming",
    features: ["原號漫遊", "電話、簡訊保留"],
    pros: ["電話接得到", "不用換 SIM"],
    cons: ["流量單價貴 5–10 倍", "部分國家只有 4G"],
  },
];

export const PLANS: EsimPlan[] = [
  // Japan
  { providerId: "airalo", region: "japan", data: "5GB", days: 30, priceUSD: 16, priceTWD: 530, hotspot: true },
  { providerId: "airalo", region: "japan", data: "10GB", days: 30, priceUSD: 26, priceTWD: 850, hotspot: true },
  { providerId: "holafly", region: "japan", data: "吃到飽", days: 7, priceUSD: 27, priceTWD: 880, hotspot: false, unlimited: true },
  { providerId: "holafly", region: "japan", data: "吃到飽", days: 15, priceUSD: 47, priceTWD: 1530, hotspot: false, unlimited: true },
  { providerId: "saily", region: "japan", data: "5GB", days: 30, priceUSD: 13, priceTWD: 430, hotspot: true },
  { providerId: "klook-esim", region: "japan", data: "10GB", days: 8, priceUSD: 14, priceTWD: 460, hotspot: true },
  { providerId: "kkday-esim", region: "japan", data: "5GB", days: 8, priceUSD: 11, priceTWD: 360, hotspot: true },
  // Korea
  { providerId: "airalo", region: "korea", data: "5GB", days: 30, priceUSD: 17, priceTWD: 560, hotspot: true },
  { providerId: "holafly", region: "korea", data: "吃到飽", days: 7, priceUSD: 27, priceTWD: 880, hotspot: false, unlimited: true },
  { providerId: "saily", region: "korea", data: "10GB", days: 30, priceUSD: 21, priceTWD: 690, hotspot: true },
  { providerId: "klook-esim", region: "korea", data: "5GB", days: 5, priceUSD: 9, priceTWD: 290, hotspot: true },
  // Thailand
  { providerId: "airalo", region: "thailand", data: "10GB", days: 30, priceUSD: 16, priceTWD: 530, hotspot: true },
  { providerId: "holafly", region: "thailand", data: "吃到飽", days: 10, priceUSD: 34, priceTWD: 1110, hotspot: false, unlimited: true },
  { providerId: "kkday-esim", region: "thailand", data: "8GB", days: 8, priceUSD: 8, priceTWD: 260, hotspot: true },
  // USA
  { providerId: "airalo", region: "usa", data: "10GB", days: 30, priceUSD: 26, priceTWD: 850, hotspot: true },
  { providerId: "holafly", region: "usa", data: "吃到飽", days: 10, priceUSD: 47, priceTWD: 1530, hotspot: false, unlimited: true },
  { providerId: "saily", region: "usa", data: "10GB", days: 30, priceUSD: 19, priceTWD: 620, hotspot: true },
  // Europe (multi-country)
  { providerId: "airalo", region: "europe", data: "10GB", days: 30, priceUSD: 25, priceTWD: 820, hotspot: true },
  { providerId: "holafly", region: "europe", data: "吃到飽", days: 10, priceUSD: 47, priceTWD: 1530, hotspot: false, unlimited: true },
  { providerId: "saily", region: "europe", data: "10GB", days: 30, priceUSD: 22, priceTWD: 720, hotspot: true },
  { providerId: "ubigi", region: "europe", data: "10GB", days: 30, priceUSD: 21, priceTWD: 690, hotspot: true },
  // Southeast Asia (multi)
  { providerId: "airalo", region: "sea", data: "5GB", days: 30, priceUSD: 18, priceTWD: 590, hotspot: true },
  { providerId: "saily", region: "sea", data: "10GB", days: 30, priceUSD: 24, priceTWD: 790, hotspot: true },
];

export const REGIONS: { value: string; label: string; flag: string }[] = [
  { value: "japan", label: "日本", flag: "🇯🇵" },
  { value: "korea", label: "韓國", flag: "🇰🇷" },
  { value: "thailand", label: "泰國", flag: "🇹🇭" },
  { value: "usa", label: "美國", flag: "🇺🇸" },
  { value: "europe", label: "歐洲（多國）", flag: "🇪🇺" },
  { value: "sea", label: "東南亞（多國）", flag: "🌏" },
];
