import React, { Suspense } from "react";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import { I18nProvider } from "@/lib/i18n";

export const metadata = { title: "SoksLine", description: "Proxy store" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, backgroundColor: "#0b1220" }}>
        <Suspense fallback={null}>
          <I18nProvider>
            <HeaderNav />
            {children}
            <Footer />
          </I18nProvider>
        </Suspense>
      </body>
    </html>
  );
}
