import {
  test, expect,
  type Page
} from '@playwright/test';

// import { fetchForecast } from './util/location';

export async function setupLocation(page: Page) {
  await page.goto('/');
  await page.getByPlaceholder('Enter a location, e.g. Hanoi').click();
  await page.getByPlaceholder('Enter a location, e.g. Hanoi').fill('hanoi');
}

export async function fetchForecast(page: Page) {
  await setupLocation(page)
  await page.getByRole('option', { name: 'Hanoi (VN)' }).click();
  await page.getByRole('button', { name: 'Get weather in Hanoi' }).click();
  await expect(page.locator('[data-testid="forecast-day"]:first-child')).toBeVisible();
}

test.beforeEach(async ({ page }) => {
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
