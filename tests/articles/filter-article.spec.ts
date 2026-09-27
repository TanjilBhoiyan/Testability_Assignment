import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Filter Articles by Tag', async ({ page }) => {
  const homePage = new HomePage(page);

  // Go to Home page
  await homePage.goto();

  // Select tag dynamically
  const tagName = 'Test';

  // Click selected tag
  await homePage.clickTag(tagName);

  // Verify filtered article contains selected tag
  await expect(
    homePage.articlePreview.first()
  ).toContainText(tagName);
});