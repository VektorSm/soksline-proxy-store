import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TopProductsTabs from "../components/TopProductsTabs";
import en from "../locales/en.json";
import { I18nContext, type Messages } from "../lib/i18n";

function getMessage(source: Messages, key: string): unknown {
  const segments = key.split(".");
  let current: unknown = source;
  for (const segment of segments) {
    if (typeof current !== "object" || current === null) {
      return "";
    }
    current = (current as Record<string, unknown>)[segment];
  }
  return current ?? "";
}

function renderWithI18n(ui: React.ReactElement) {
  const value = {
    locale: "en" as const,
    setLocale: () => {},
    t: (key: string) => getMessage(en, key),
  };

  return render(
    React.createElement(
      I18nContext.Provider,
      { value },
      ui
    )
  );
}

test("tabs switch content on click", async () => {
  renderWithI18n(<TopProductsTabs />);
  const user = userEvent.setup();

  const tablist = screen.getByRole("tablist");
  const tabs = within(tablist).getAllByRole("tab");
  expect(tabs).toHaveLength(3);

  expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  const initialPanel = screen.getByRole("tabpanel");
  expect(within(initialPanel).getByText("City focused")).toBeInTheDocument();

  await user.click(tabs[1]);
  expect(tabs[0]).toHaveAttribute("aria-selected", "false");
  expect(tabs[1]).toHaveAttribute("aria-selected", "true");
  const ipv6Panel = screen.getByRole("tabpanel");
  expect(within(ipv6Panel).getByText("Global IPv6 pool")).toBeInTheDocument();

  await user.click(tabs[2]);
  expect(tabs[1]).toHaveAttribute("aria-selected", "false");
  expect(tabs[2]).toHaveAttribute("aria-selected", "true");
  const rotatingPanel = screen.getByRole("tabpanel");
  expect(within(rotatingPanel).getByText("Standard rotation")).toBeInTheDocument();
});
