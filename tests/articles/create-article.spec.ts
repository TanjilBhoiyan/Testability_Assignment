import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ArticlePage } from '../../pages/ArticlePage';

test('Create New Article successfully', async ({ page }) => {
  const homePage = new HomePage(page);
  const articlePage = new ArticlePage(page);

  // Go to Home
  await homePage.goto();
  // Click New Article
  await homePage.clickNewArticle();
  // Verify New Article page opened
  await expect(page).toHaveURL(/\/editor/);
  // Fill Article Title
  await articlePage.fillArticleTitle('Playwright Test Article1');
  // Fill Article Description
  await articlePage.fillArticleDescription('This is a Playwright automation test');
  // Fill Article Body
  await articlePage.fillArticleBody('This article was created using Playwright automation.');
  // Fill Article Tag
  await articlePage.fillArticleTag('playwright');
  await articlePage.clickPublishArticle();

  
    // assertion add kora lagbe 

});