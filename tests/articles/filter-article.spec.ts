import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { testData } from '../../utils/test-data';

test('Filter Articles by Tag', async ({ page }) => {
  const homePage = new HomePage(page);

  // Go to Home page
  await homePage.goto();

  // Select tag dynamically
   const tagName = testData.filterArticle.tag;

  // Click selected tag
  await homePage.clickTag(tagName);

  // Verify filtered article contains selected tag
  await expect(homePage.articlePreview.first()).toContainText(tagName);
});

test('Should not display articles from other tags after filtering by a tag', async ({ page }) => {
  const homePage = new HomePage(page);

  // Go to Home page
  await homePage.goto();

  // Select tag
  const tagName = testData.filterArticle.tag;

  // Click selected tag
  await homePage.clickTag(tagName);

  // Verify filtered article does not contain another tag
  await expect(
    homePage.articlePreview.first()
  ).not.toContainText('playwright');
});