import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ArticlePage } from '../../pages/ArticlePage';
import { testData } from '../../utils/test-data';


test.describe.serial('Create Article Tests', () => {
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
    await articlePage.fillArticleTitle(testData.article.title);
    // Fill Article Description
    await articlePage.fillArticleDescription(testData.article.description);
    // Fill Article Body
    await articlePage.fillArticleBody(testData.article.body);
    // Fill Article Tag
    await articlePage.fillArticleTag(testData.article.tag);
    await articlePage.clickPublishArticle();
    await expect(page.getByText(testData.article.title, { exact: true }).first()).toBeVisible();


  });
  test('Should not create article with duplicate title', async ({ page }) => {
    const homePage = new HomePage(page);
    const articlePage = new ArticlePage(page);
    // Go to Home
    await homePage.goto();
    // Click New Article
    await homePage.clickNewArticle();
    // Verify New Article page opened
    await expect(page).toHaveURL(/\/editor/);
    // Fill Article Title
    await articlePage.fillArticleTitle(testData.article.title);
    // Fill Article Description
    await articlePage.fillArticleDescription(testData.article.description);
    // Fill Article Body
    await articlePage.fillArticleBody(testData.article.body);
    // Fill Article Tag
    await articlePage.fillArticleTag(testData.article.tag);
    await articlePage.clickPublishArticle();
    // Verify duplicate title validation
    await expect(page.getByText('title must be unique', { exact: true })).toBeVisible();
  });
});