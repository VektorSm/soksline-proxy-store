import React, { Suspense } from "react";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import SkipLink from "@/components/a11y/SkipLink";
import { I18nProvider } from "@/lib/i18n";

export const metadata = { title: "SoksLine", description: "Proxy store" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, backgroundColor: "#0b1220" }}>
        <Suspense fallback={null}>
          <I18nProvider>
            <SkipLink />
            <header role="banner">
              <HeaderNav />
            </header>
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </I18nProvider>
        </Suspense>
      </body>
    </html>
  );
}
