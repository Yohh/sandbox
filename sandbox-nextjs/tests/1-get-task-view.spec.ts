import { test, expect } from "@playwright/test";
import { BASE_URL } from "./utils/consts";

test.describe("view todolist page", () => {
  test("get page title", async ({ page }) => {
    await page.goto(`${BASE_URL}/todolist`);

    await expect(page).toHaveTitle(/sandbox next.js/);
  });

  test("open modal", async ({ page }) => {
    await page.goto(`${BASE_URL}/todolist`);

    const modalButton = page.locator("id=new");
    await modalButton.click();
    await page.waitForURL(`${BASE_URL}/todolist?modal=true`);

    expect(page.url()).toBe(`${BASE_URL}/todolist?modal=true`);
  });
});
