import { test } from '@playwright/test';
import { HomePage } from './HomePage';

test('Edit Article successfully', async ({ page }) => {
  const homePage = new HomePage(page);

  // Go to Home page
  await homePage.goto();

  // Click the created article
  await homePage.clickArticle();
});