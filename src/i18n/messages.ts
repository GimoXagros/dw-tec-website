import type { Locale } from "./types";
import ko from "./messages/ko";
import en from "./messages/en";

export type { Locale } from "./types";

interface MessageSchema {
  skipLink: string;
  nav: {
    company: string;
    companyChildren: {
      overview: string;
      history: string;
      capabilities: string;
    };
    business: string;
    portfolio: string;
    capabilities: string;
    contact: string;
  };
  languageSwitcher: {
    currentShort: "KOR" | "ENG";
    labelKo: string;
    labelEn: string;
    optionsLabel: string;
  };
  footer: {
    companyHeading: string;
    businessHeading: string;
    contactHeading: string;
    privacy: string;
    backTop: string;
    toTop: string;
  };
  sectionIntro: {
    home: string;
    about: string;
    company: string;
    companyHistory: string;
    capabilities: string;
    business: string;
    portfolio: string;
    contact: string;
    privacy: string;
  };
}

const messages: Record<Locale, MessageSchema> = { ko, en };

export function getMessages(locale: Locale): MessageSchema {
  return messages[locale];
}

export type { MessageSchema };
