import type { Metadata } from "next";

import LoginPage from "./LoginPage";

export const metadata: Metadata = {
  title: "Log in | SoksLine",
  description:
    "Access the SoksLine dashboard to manage proxies, billing, and support tickets.",
};

export default function Page() {
  return <LoginPage />;
}
