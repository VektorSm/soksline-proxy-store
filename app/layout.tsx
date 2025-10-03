import type { Metadata } from "next";
import { BRAND_NAME, DEFAULT_LOCALE } from "../config/site";
import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";
import { I18nProvider } from "../lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: BRAND_NAME,
  description: "SOCKS5 proxy store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <I18nProvider>
          <HeaderNav />
          <main id="main-content">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
