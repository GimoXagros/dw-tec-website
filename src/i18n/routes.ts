import type { Locale } from "./types";

type RouteKey =
  | "home"
  | "company"
  | "companyHistory"
  | "companyCapabilities"
  | "business"
  | "portfolio"
  | "contact"
  | "privacy";

const routeMap: Record<RouteKey, { ko: string; en: string }> = {
  home: { ko: "/", en: "/en/" },
  company: { ko: "/company/", en: "/en/company/" },
  companyHistory: { ko: "/company/history/", en: "/en/company/history/" },
  companyCapabilities: { ko: "/company/capabilities/", en: "/en/company/capabilities/" },
  business: { ko: "/business/", en: "/en/business/" },
  portfolio: { ko: "/portfolio/", en: "/en/portfolio/" },
  contact: { ko: "/contact/", en: "/en/contact/" },
  privacy: { ko: "/privacy/", en: "/en/privacy/" },
};

const localePrefixMap: Record<Locale, string> = {
  ko: "",
  en: "/en",
};

export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en" || pathname === "/en/") return "/";
  return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
}

export function pathForKey(key: RouteKey, locale: Locale): string {
  const value = routeMap[key];
  return locale === "en" ? value.en : value.ko;
}

export function toLocalePath(pathname: string, locale: Locale): string {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const noLocalePath = stripLocalePrefix(normalized);
  if (locale === "ko") return noLocalePath;
  return noLocalePath === "/" ? "/en/" : `/en${noLocalePath}`;
}

export function businessDetailPath(locale: Locale, slug: string): string {
  const base = localePrefixMap[locale];
  return `${base}/business/${slug}/`;
}
