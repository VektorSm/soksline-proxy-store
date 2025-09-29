import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TopProductsTabs from "../components/TopProductsTabs";
import { LocaleProvider } from "../components/LocaleContext";

test("переключение вкладок меняет активную и контент", async () => {
  render(
    <LocaleProvider initialLocale="en">
      <TopProductsTabs />
    </LocaleProvider>
  );
  const user = userEvent.setup();

  const tablist = screen.getByRole("tablist", { name: /Product categories/i });
  const tabs = within(tablist).getAllByRole("tab");
  expect(tabs).toHaveLength(3);

  expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  const initialPanel = screen.getByRole("tabpanel");
  expect(within(initialPanel).getByText("US / EU (shared pool)")).toBeInTheDocument();

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
