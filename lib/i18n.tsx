"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "../config/site";
import en from "../locales/en.json";
import ru from "../locales/ru.json";

const MESSAGES = { en, ru } as const satisfies Record<Locale, Record<string, unknown>>;

export type Messages = typeof en;

type MessageValue =
  | string
  | number
  | boolean
  | null
  | MessageValue[]
  | { [key: string]: MessageValue };

type InterpolationValues = Record<string, string | number>;

type I18nContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: <T = MessageValue>(key: string, values?: InterpolationValues) => T;
};

export const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "lang";

function isLocale(value: string | null): value is Locale {
  return value !== null && SUPPORTED_LOCALES.includes(value as Locale);
}

function getMessage(source: Record<string, unknown>, key: string): MessageValue {
  const segments = key.split(".");
  let current: unknown = source;

  for (const segment of segments) {
    if (typeof current !== "object" || current === null) {
      return "";
    }
    current = (current as Record<string, unknown>)[segment];
  }

  return (current as MessageValue) ?? "";
}

function interpolate(value: string, values?: InterpolationValues) {
  if (!values) {
    return value;
  }

  return value.replace(/\{(\w+)\}/g, (_, token: string) => {
    const resolved = values[token];
    return resolved !== undefined ? String(resolved) : `{${token}}`;
  });
}

type I18nProviderProps = {
  children: ReactNode;
};

export function I18nProvider({ children }: I18nProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) {
      return;
    }

    const paramLocale = searchParams.get("lang");
    const storedLocale = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;

    if (isLocale(paramLocale)) {
      setLocaleState(paramLocale);
    } else if (isLocale(storedLocale)) {
      setLocaleState(storedLocale);
    } else {
      setLocaleState(DEFAULT_LOCALE);
    }

    setInitialized(true);
  }, [initialized, searchParams]);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    const paramLocale = searchParams.get("lang");
    if (isLocale(paramLocale) && paramLocale !== locale) {
      setLocaleState(paramLocale);
    }
  }, [initialized, locale, searchParams]);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, locale);
    }
  }, [initialized, locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);

      const params = new URLSearchParams(searchParams.toString());
      if (next === DEFAULT_LOCALE) {
        params.delete("lang");
      } else {
        params.set("lang", next);
      }

      const query = params.toString();
      router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });

      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next);
      }
    },
    [pathname, router, searchParams]
  );

  const messages = useMemo(() => MESSAGES[locale], [locale]);

  const translate = useCallback(
    <T = MessageValue>(key: string, values?: InterpolationValues): T => {
      const raw = getMessage(messages, key);
      if (typeof raw === "string") {
        return interpolate(raw, values) as T;
      }
      return raw as T;
    },
    [messages]
  );

  const value = useMemo<I18nContextValue>(() => ({ locale, setLocale, t: translate }), [locale, setLocale, translate]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
}
