import { test, expect } from "@playwright/test";

import { fetchForecast } from "./util/location";

test.beforeEach(async ({ page }) => {
  await fetchForecast(page);
});

test.only('Weather forecast widget loads after the user clicks the "Get weather in {location}" button and shows 5 days', async ({
  page,
}) => {
  const forecastDays = await page.locator('[data-testid="forecast-day"]');
  const count = await forecastDays.count();

  expect(count).toBeGreaterThanOrEqual(5);
});

test("Each day's forecast includes the necessary elements", async ({
  page,
}) => {
  const forecastDays = await page.locator('[data-testid="forecast-day"]');
  for (let i = 0; i < (await forecastDays.count()); i++) {
    const forecastDay = forecastDays.nth(i);
    await expect(forecastDay).toHaveText(/.+/);
    await expect(forecastDay.locator("img")).toBeVisible();
  }
});

test("User can toggle between metric and imperial units", async ({ page }) => {
  const maxTempElements = await page.locator('[data-testid="max-temp"]').all();

  for (const element of maxTempElements) {
    await expect(element).toHaveText(/.+C$/);
  }

  await page.locator('[data-testid="unit-switch"]').click();

  for (const element of maxTempElements) {
    await expect(element).toHaveText(/.+F$/);
  }
});
