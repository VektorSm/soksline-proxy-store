import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TopProductsTabs from "../components/TopProductsTabs";

test("переключение вкладок меняет активную", async () => {
  render(<TopProductsTabs />);
  const user = userEvent.setup();

  const tabs = screen.getAllByRole("tab"); // ожидаем 3 штуки
  expect(tabs).toHaveLength(3);

  // 0 — ISP, 1 — IPv6, 2 — Rotating
  expect(tabs[0]).toHaveAttribute("aria-selected", "true");

  await user.click(tabs[1]);
  expect(tabs[1]).toHaveAttribute("aria-selected", "true");

  await user.click(tabs[2]);
  expect(tabs[2]).toHaveAttribute("aria-selected", "true");
});
