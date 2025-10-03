import { expect, test } from "@playwright/test";

test("top products tabs respond to clicks and arrow keys", async ({ page }) => {
  await page.goto("/");

  const tablist = page.getByRole("tablist");
  const tabs = tablist.getByRole("tab");

  await expect(tabs).toHaveCount(3);
  await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("City focused");

  await tabs.nth(1).click();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Global IPv6 pool");

  // Arrow navigation to the rotating tab.
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Standard rotation");

  const outlineStyle = await page.evaluate(() => {
    const active = document.activeElement as HTMLElement | null;
    if (!active) return "";
    const styles = window.getComputedStyle(active);
    return `${styles.outlineStyle}|${styles.outlineWidth}`;
  });

  expect(outlineStyle).toContain("solid");
  expect(outlineStyle).toMatch(/solid\|\d+px/);
});
