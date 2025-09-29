import HeaderNav from "../components/HeaderNav";
import { LocaleProvider } from "../components/LocaleContext";

export const metadata = { title: "SoksLine", description: "Proxy store" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, backgroundColor: "#0b1220" }}>
        <LocaleProvider>
          <HeaderNav />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
