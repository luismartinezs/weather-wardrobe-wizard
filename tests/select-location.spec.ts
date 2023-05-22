import { test, expect } from '@playwright/test';

import { setupLocation } from './util/location';

test.beforeEach(async ({ page }) => {
  await setupLocation(page);
});

test('User can enter a location name in the input field and it populates a dropdown with up to 5 options', async ({ page }) => {
  const options = await page.locator('[role="option"]').all();
  expect(options.length).toBeLessThanOrEqual(5);
});

test('Dropdown options are correctly formatted as "location name (country acronym)"', async ({ page }) => {
  const options = await page.locator('role=option').elementHandles();
  for (let option of options) {
    const optionText = await option.textContent();
    expect(optionText).toMatch(/.+ \(\w\w\)$/);
  }
});

test('User can select an option from the dropdown', async ({ page }) => {
  const input = page.locator('input[placeholder="Enter a location, e.g. Hanoi"]');
  await page.getByRole('option', { name: 'Hanoi (VN)' }).click();
  expect(await input.inputValue()).toBe('Hanoi');
});

test('"Get weather in {location}" button becomes enabled once an option is selected', async ({ page }) => {
  await page.getByRole('option', { name: 'Hanoi (VN)' }).click();
  const button = await page.getByRole('button', { name: 'Get weather in Hanoi' });
  expect(await button.isEnabled()).toBeTruthy();
});
