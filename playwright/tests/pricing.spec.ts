import { expect, test } from "@playwright/test";

test("rotating pricing shows per GB total", async ({ page }) => {
  await page.goto("/pricing/rotating-residential");

  const firstCard = page.getByRole("article").first();
  await expect(firstCard.getByRole("heading", { level: 3, name: "10 GB" })).toBeVisible();
  await expect(firstCard).toContainText("10 GB — $4.90/GB (Total $49.00)");
});
