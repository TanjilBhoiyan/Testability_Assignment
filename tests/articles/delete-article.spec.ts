import { test, expect } from '@playwright/test';
import { AuthApi } from '../../api/AuthApi';
import { ArticleApi } from '../../api/ArticleApi';
import { HomePage } from '../../pages/HomePage';
import { ArticlePage } from '../../pages/ArticlePage';
import { testData } from '../../utils/test-data';

test('Delete Article successfully', async ({ page, request }) => {
  const authApi = new AuthApi(request);
  const articleApi = new ArticleApi(request);
  const homePage = new HomePage(page);
  const articlePage = new ArticlePage(page);

  // Login via API and get token
  const token = await authApi.loginAndGetToken();
  const articleTitle = `Delete Article Test ${Date.now()}`;

  // Create article via API
  const article = await articleApi.createArticle(
    token,
    articleTitle, testData.deleteArticle.description,
    testData.deleteArticle.body,
    testData.deleteArticle.tag
  );

  // Verify article created via API
  expect(article.title).toBe(articleTitle);

  // Go to Home page
  await homePage.goto();
  await homePage.clickArticleByTitle(article.title);

  // Delete Article
  await articlePage.clickDeleteArticle();
  
});


test('Should not allow user to delete another user article', async ({ page }) => {
  const homePage = new HomePage(page);
  const articlePage = new ArticlePage(page);

  // Go to Home
  await homePage.goto();

  // Go to last pagination page
  await homePage.clickLastPage();

  // Open the last article
  await homePage.clickLastArticle();

  // Verify Delete Article button is not available
  await expect(articlePage.deleteArticleButton).not.toBeVisible();
});