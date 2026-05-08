export type Climate = "cold" | "mild" | "warm" | "tropical";
export type Season = "spring" | "summer" | "autumn" | "winter";
export type Activity =
  | "sightseeing"
  | "business"
  | "beach"
  | "hiking"
  | "ski"
  | "photography"
  | "shopping";

export type LuggageForm = {
  destination: string;
  climate: Climate;
  season: Season;
  days: number;
  activities: Activity[];
  needsVisa: boolean;
  needsAdapter: boolean;
  voltage: string;
};

export type ChecklistItem = {
  name: string;
  required?: boolean;
  qty?: string;
  tip?: string;
};

type ItemDef = {
  name: string;
  required?: boolean;
  qty?: (form: LuggageForm) => string;
  tip?: string;
  show?: (form: LuggageForm) => boolean;
};

type Section = {
  title: string;
  items: ItemDef[];
};

const SECTIONS: Section[] = [
  {
    title: "證件與金融",
    items: [
      { name: "護照（效期 6 個月以上）", required: true },
      { name: "電子機票列印本或截圖", required: true },
      { name: "住宿訂房確認信", required: true },
      {
        name: "簽證 / E-Visa 列印本",
        show: (f) => f.needsVisa,
        tip: "建議列印 + 手機備份",
      },
      { name: "身分證", required: true },
      { name: "國際駕照", show: (f) => f.activities.includes("sightseeing") },
      { name: "護照影本（與正本分開放）" },
      {
        name: "信用卡（建議帶兩張不同銀行）",
        required: true,
        tip: "出國前先打電話開卡通知",
      },
      { name: "外幣現金", tip: "建議在台灣先換好至少 1/3 預算" },
      { name: "旅遊保險投保證明" },
    ],
  },
  {
    title: "衣物（依天數）",
    items: [
      {
        name: "內衣褲",
        required: true,
        qty: (f) => `${Math.min(f.days, 7)} 套`,
        tip: "超過 7 天可帶 7 套加洗滌包",
      },
      {
        name: "襪子",
        qty: (f) => `${Math.min(f.days, 7)} 雙`,
      },
      {
        name: "T-shirt / 短袖上衣",
        qty: (f) => `${Math.min(Math.ceil(f.days / 1.5), 7)} 件`,
        show: (f) => f.climate !== "cold",
      },
      {
        name: "薄長袖 / 襯衫",
        qty: (f) => `${Math.min(Math.ceil(f.days / 2), 5)} 件`,
        show: (f) => f.climate === "mild" || f.activities.includes("business"),
      },
      {
        name: "毛衣 / 厚長袖",
        qty: () => "2–3 件",
        show: (f) => f.climate === "cold" || f.season === "winter",
      },
      {
        name: "外套（防風 / 保暖）",
        show: (f) => f.climate === "cold" || f.climate === "mild" || f.season === "winter",
        tip: "羽絨外套可壓縮節省空間",
      },
      {
        name: "雨衣 / 折疊雨傘",
        show: (f) =>
          f.climate === "tropical" || f.season === "spring" || f.season === "summer",
      },
      {
        name: "長褲 / 牛仔褲",
        qty: () => "2–3 件",
      },
      {
        name: "短褲",
        qty: () => "2–3 件",
        show: (f) => f.climate === "warm" || f.climate === "tropical",
      },
      {
        name: "正式服裝",
        show: (f) => f.activities.includes("business"),
        tip: "西裝建議用西裝袋並反摺收納",
      },
      {
        name: "泳裝 / 海灘服",
        show: (f) => f.activities.includes("beach"),
      },
      {
        name: "運動服 / 排汗衣",
        show: (f) => f.activities.includes("hiking"),
      },
      {
        name: "滑雪外套 / 防水褲",
        show: (f) => f.activities.includes("ski"),
        tip: "可在當地租用，省行李空間",
      },
      {
        name: "睡衣",
        qty: () => "1–2 套",
      },
    ],
  },
  {
    title: "鞋與配件",
    items: [
      { name: "舒適好走步行鞋", required: true },
      {
        name: "拖鞋 / 海灘鞋",
        show: (f) => f.activities.includes("beach") || f.climate === "tropical",
      },
      {
        name: "登山鞋",
        show: (f) => f.activities.includes("hiking"),
      },
      { name: "雪靴", show: (f) => f.activities.includes("ski") },
      { name: "正式皮鞋", show: (f) => f.activities.includes("business") },
      { name: "墨鏡", show: (f) => f.climate !== "cold" },
      {
        name: "圍巾 / 手套 / 毛帽",
        show: (f) => f.climate === "cold" || f.season === "winter",
      },
      { name: "遮陽帽", show: (f) => f.climate === "warm" || f.climate === "tropical" },
      { name: "口罩數片", tip: "飛機 / 人多場合適用" },
    ],
  },
  {
    title: "3C 電子產品",
    items: [
      { name: "手機 + 充電線", required: true },
      {
        name: "萬國轉接頭",
        show: (f) => f.needsAdapter,
        tip: "建議買含 USB-C / USB-A 的多孔款",
      },
      {
        name: "變壓器",
        show: (f) => f.voltage === "110V" || f.voltage === "220V",
        tip: "確認電器是否支援當地電壓 (台灣 110V，多數歐洲、泰國 220V)",
      },
      { name: "行動電源", required: true, tip: "上飛機只能放隨身行李，不可托運" },
      { name: "耳機", required: true },
      { name: "相機 + 記憶卡 + 備用電池", show: (f) => f.activities.includes("photography") },
      { name: "筆電 + 充電器", show: (f) => f.activities.includes("business") },
      { name: "讀卡機 / 雲端備份" },
      { name: "SIM 卡 / eSIM 啟用碼", required: true, tip: "推薦 eSIM 省去換卡麻煩" },
    ],
  },
  {
    title: "盥洗用品",
    items: [
      { name: "牙刷 + 牙膏（旅行裝）", required: true },
      { name: "洗面乳 / 卸妝", qty: () => "100ml 以下" },
      { name: "洗髮 / 沐浴 / 護髮", tip: "飯店多有提供，可考慮不帶" },
      { name: "刮鬍刀" },
      { name: "梳子" },
      { name: "化妝品 / 保養品（小瓶分裝）" },
      { name: "保溼噴霧 / 護唇膏" },
      {
        name: "防曬乳 SPF 50+",
        show: (f) =>
          f.climate === "warm" || f.climate === "tropical" || f.activities.includes("ski"),
      },
      { name: "毛巾（飯店通常有提供）" },
    ],
  },
  {
    title: "藥品與健康",
    items: [
      { name: "個人常用處方藥", tip: "建議帶處方箋影本" },
      { name: "感冒藥 / 退燒藥" },
      { name: "止痛藥（普拿疼等）" },
      { name: "腸胃藥 / 止瀉藥", required: true, tip: "出國容易水土不服" },
      { name: "暈車 / 暈船藥" },
      { name: "OK 繃 + 小傷口處理", required: true },
      {
        name: "防蚊液（含 DEET）",
        show: (f) => f.climate === "tropical" || f.climate === "warm",
      },
      { name: "蚊蟲叮咬藥膏", show: (f) => f.climate === "tropical" || f.climate === "warm" },
      { name: "綜合維他命" },
    ],
  },
  {
    title: "行李配件",
    items: [
      { name: "行李箱（依天數選大小）", required: true },
      { name: "隨身後背包 / 斜背包", required: true },
      { name: "行李秤（避免超重）" },
      { name: "TSA 行李鎖" },
      { name: "行李吊牌（含緊急聯絡）" },
      { name: "壓縮袋 / 收納包" },
      { name: "塑膠袋（裝髒衣服）" },
      { name: "折疊購物袋", show: (f) => f.activities.includes("shopping") },
    ],
  },
  {
    title: "其他常被忘記的東西",
    items: [
      { name: "充電傳輸線備用", tip: "出門前再三檢查" },
      { name: "面紙 / 濕紙巾" },
      { name: "保溫瓶 / 折疊水壺" },
      { name: "零食（飛機餐前墊胃）" },
      { name: "頸枕 / 眼罩 / 耳塞", show: (f) => f.days >= 3 },
      { name: "原子筆（填入境卡用）" },
      { name: "紀念品交換禮", show: (f) => f.activities.includes("business") },
    ],
  },
];

export type Checklist = { title: string; items: ChecklistItem[] }[];

export function generateChecklist(form: LuggageForm): Checklist {
  return SECTIONS.map((section) => ({
    title: section.title,
    items: section.items
      .filter((i) => !i.show || i.show(form))
      .map<ChecklistItem>((i) => ({
        name: i.name,
        required: i.required,
        qty: i.qty ? i.qty(form) : undefined,
        tip: i.tip,
      })),
  })).filter((s) => s.items.length > 0);
}

export const DESTINATIONS: Record<
  string,
  { label: string; climate: Climate; needsVisa: boolean; voltage: string; needsAdapter: boolean }
> = {
  japan: { label: "日本", climate: "mild", needsVisa: false, voltage: "100V", needsAdapter: false },
  korea: { label: "韓國", climate: "mild", needsVisa: false, voltage: "220V", needsAdapter: true },
  thailand: { label: "泰國", climate: "tropical", needsVisa: false, voltage: "220V", needsAdapter: true },
  vietnam: { label: "越南", climate: "tropical", needsVisa: true, voltage: "220V", needsAdapter: true },
  philippines: { label: "菲律賓", climate: "tropical", needsVisa: false, voltage: "220V", needsAdapter: false },
  indonesia: { label: "印尼", climate: "tropical", needsVisa: true, voltage: "220V", needsAdapter: true },
  malaysia: { label: "馬來西亞", climate: "tropical", needsVisa: false, voltage: "240V", needsAdapter: true },
  singapore: { label: "新加坡", climate: "tropical", needsVisa: false, voltage: "230V", needsAdapter: true },
  hongkong: { label: "香港", climate: "warm", needsVisa: false, voltage: "220V", needsAdapter: true },
  macau: { label: "澳門", climate: "warm", needsVisa: false, voltage: "220V", needsAdapter: true },
  usa: { label: "美國", climate: "mild", needsVisa: true, voltage: "120V", needsAdapter: false },
  canada: { label: "加拿大", climate: "cold", needsVisa: true, voltage: "120V", needsAdapter: false },
  uk: { label: "英國", climate: "mild", needsVisa: true, voltage: "230V", needsAdapter: true },
  australia: { label: "澳洲", climate: "warm", needsVisa: true, voltage: "230V", needsAdapter: true },
  newzealand: { label: "紐西蘭", climate: "mild", needsVisa: true, voltage: "230V", needsAdapter: true },
  france: { label: "法國", climate: "mild", needsVisa: false, voltage: "230V", needsAdapter: true },
  italy: { label: "義大利", climate: "mild", needsVisa: false, voltage: "230V", needsAdapter: true },
  germany: { label: "德國", climate: "cold", needsVisa: false, voltage: "230V", needsAdapter: true },
  europe: { label: "歐洲（其他）", climate: "cold", needsVisa: false, voltage: "230V", needsAdapter: true },
  other: { label: "其他", climate: "mild", needsVisa: false, voltage: "220V", needsAdapter: true },
};
