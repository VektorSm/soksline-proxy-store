import { expect, test } from "@playwright/test";

test("language switcher toggles locale and persists", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "RU" }).click();
  await expect(page.getByRole("link", { name: "Купить" })).toBeVisible();

  await page.reload();
  await expect(page.getByRole("link", { name: "Купить" })).toBeVisible();

  const stored = await page.evaluate(() => window.localStorage.getItem("lang"));
  expect(stored).toBe("ru");
});
