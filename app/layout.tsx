import HeaderNav from "../components/HeaderNav";

export const metadata = { title: "SoksLine", description: "Proxy store" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, backgroundColor: "#0b1220" }}>
        <HeaderNav />
        {children}
      </body>
    </html>
  );
}
