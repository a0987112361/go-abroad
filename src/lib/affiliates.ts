export const AFFILIATES = {
  klook: { aid: "120721" },
  airalo: { referralCode: "EELCAK4639" },
} as const;

export function klookUrl(path: string = "/zh-TW/", subId?: string): string {
  const url = new URL(path, "https://www.klook.com");
  url.searchParams.set("aid", AFFILIATES.klook.aid);
  if (subId) url.searchParams.set("aff_adid", subId);
  return url.toString();
}

export function airaloUrl(path: string = "/"): string {
  const url = new URL(path, "https://www.airalo.com");
  url.searchParams.set("referral", AFFILIATES.airalo.referralCode);
  return url.toString();
}

export function klookSearch(query: string, subId?: string): string {
  return klookUrl(
    `/zh-TW/search/?query=${encodeURIComponent(query)}`,
    subId,
  );
}

export function klookCountry(countryName: string, subId?: string): string {
  return klookSearch(countryName, subId);
}

export const AFFILIATE_LINK_REL = "nofollow sponsored noopener";
