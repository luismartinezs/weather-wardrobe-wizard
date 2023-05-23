import { test, expect } from '@playwright/test';

import { fetchForecast } from './util/location';

test.beforeEach(async ({ page }) => {
  page.on('console', console.log);
  await fetchForecast(page);
});

test('Clothing suggestions widget loads after the user clicks the "Get weather in {location}" button', async ({ page }) => {
  await expect(await page.locator('[data-testid="clothing-suggestions"]')).toBeVisible();
});

test('App shows at least one clothing item, and the clothing item has a text label inside', async ({ page }) => {
  const clothingItems = await page.locator('[data-testid="clothing-item"]').all();
  await expect(clothingItems.length).toBeGreaterThan(0);

  await expect(clothingItems[0].locator('p')).toHaveText(/\w+/);
});
