import { type Page, expect } from '@playwright/test';

export async function setupLocation(page: Page) {
  await page.goto('/');
  await page.waitForSelector('[placeholder="Enter a location, e.g. Hanoi"]');
  await page.getByPlaceholder('Enter a location, e.g. Hanoi').click();
  await page.getByPlaceholder('Enter a location, e.g. Hanoi').fill('hanoi');
}

export async function fetchForecast(page: Page) {
  await setupLocation(page)
  await page.getByRole('option', { name: 'Hanoi (VN)' }).click();
  await page.getByRole('button', { name: 'Get weather in Hanoi' }).click();
  await expect(page.locator('[data-testid="forecast-day"]:first-child')).toBeVisible();
}