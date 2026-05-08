export type CityZone = {
  city: string;
  country: string;
  flag: string;
  tz: string;
};

export const CITIES: CityZone[] = [
  { city: "台北", country: "台灣", flag: "🇹🇼", tz: "Asia/Taipei" },
  { city: "東京", country: "日本", flag: "🇯🇵", tz: "Asia/Tokyo" },
  { city: "大阪", country: "日本", flag: "🇯🇵", tz: "Asia/Tokyo" },
  { city: "首爾", country: "韓國", flag: "🇰🇷", tz: "Asia/Seoul" },
  { city: "香港", country: "香港", flag: "🇭🇰", tz: "Asia/Hong_Kong" },
  { city: "澳門", country: "澳門", flag: "🇲🇴", tz: "Asia/Macau" },
  { city: "新加坡", country: "新加坡", flag: "🇸🇬", tz: "Asia/Singapore" },
  { city: "曼谷", country: "泰國", flag: "🇹🇭", tz: "Asia/Bangkok" },
  { city: "胡志明", country: "越南", flag: "🇻🇳", tz: "Asia/Ho_Chi_Minh" },
  { city: "馬尼拉", country: "菲律賓", flag: "🇵🇭", tz: "Asia/Manila" },
  { city: "雅加達", country: "印尼", flag: "🇮🇩", tz: "Asia/Jakarta" },
  { city: "峇里島", country: "印尼", flag: "🇮🇩", tz: "Asia/Makassar" },
  { city: "吉隆坡", country: "馬來西亞", flag: "🇲🇾", tz: "Asia/Kuala_Lumpur" },
  { city: "上海", country: "中國", flag: "🇨🇳", tz: "Asia/Shanghai" },
  { city: "北京", country: "中國", flag: "🇨🇳", tz: "Asia/Shanghai" },
  { city: "新德里", country: "印度", flag: "🇮🇳", tz: "Asia/Kolkata" },
  { city: "杜拜", country: "阿聯", flag: "🇦🇪", tz: "Asia/Dubai" },
  { city: "伊斯坦堡", country: "土耳其", flag: "🇹🇷", tz: "Europe/Istanbul" },
  { city: "倫敦", country: "英國", flag: "🇬🇧", tz: "Europe/London" },
  { city: "巴黎", country: "法國", flag: "🇫🇷", tz: "Europe/Paris" },
  { city: "羅馬", country: "義大利", flag: "🇮🇹", tz: "Europe/Rome" },
  { city: "柏林", country: "德國", flag: "🇩🇪", tz: "Europe/Berlin" },
  { city: "馬德里", country: "西班牙", flag: "🇪🇸", tz: "Europe/Madrid" },
  { city: "莫斯科", country: "俄羅斯", flag: "🇷🇺", tz: "Europe/Moscow" },
  { city: "紐約", country: "美國", flag: "🇺🇸", tz: "America/New_York" },
  { city: "洛杉磯", country: "美國", flag: "🇺🇸", tz: "America/Los_Angeles" },
  { city: "芝加哥", country: "美國", flag: "🇺🇸", tz: "America/Chicago" },
  { city: "夏威夷", country: "美國", flag: "🇺🇸", tz: "Pacific/Honolulu" },
  { city: "多倫多", country: "加拿大", flag: "🇨🇦", tz: "America/Toronto" },
  { city: "溫哥華", country: "加拿大", flag: "🇨🇦", tz: "America/Vancouver" },
  { city: "墨西哥城", country: "墨西哥", flag: "🇲🇽", tz: "America/Mexico_City" },
  { city: "聖保羅", country: "巴西", flag: "🇧🇷", tz: "America/Sao_Paulo" },
  { city: "雪梨", country: "澳洲", flag: "🇦🇺", tz: "Australia/Sydney" },
  { city: "墨爾本", country: "澳洲", flag: "🇦🇺", tz: "Australia/Melbourne" },
  { city: "奧克蘭", country: "紐西蘭", flag: "🇳🇿", tz: "Pacific/Auckland" },
];

export function getOffsetMinutes(tz: string, at: Date = new Date()): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    timeZoneName: "longOffset",
    hour12: false,
  });
  const parts = dtf.formatToParts(at);
  const offsetPart = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT+0";
  const m = offsetPart.match(/GMT([+-])(\d{1,2}):?(\d{2})?/);
  if (!m) return 0;
  const sign = m[1] === "+" ? 1 : -1;
  const hours = parseInt(m[2] ?? "0", 10);
  const mins = parseInt(m[3] ?? "0", 10);
  return sign * (hours * 60 + mins);
}

export function formatOffsetDiff(minutes: number): string {
  if (minutes === 0) return "相同";
  const sign = minutes > 0 ? "快" : "慢";
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  if (m === 0) return `${sign} ${h} 小時`;
  return `${sign} ${h} 小時 ${m} 分`;
}

export function formatTimeAt(tz: string, at: Date = new Date()): string {
  return new Intl.DateTimeFormat("zh-TW", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  }).format(at);
}
