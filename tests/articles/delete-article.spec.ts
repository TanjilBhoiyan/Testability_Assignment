import { test, expect } from '@playwright/test';
import { AuthApi } from '../../api/AuthApi';
import { ArticleApi } from '../../api/ArticleApi';
import { HomePage } from '../../pages/HomePage';
import { ArticlePage } from '../../pages/ArticlePage';

test('Delete Article successfully', async ({ page, request }) => {
  const authApi = new AuthApi(request);
  const articleApi = new ArticleApi(request);
  const homePage = new HomePage(page);
  const articlePage = new ArticlePage(page);

  // Login via API and get token
  const token = await authApi.loginAndGetToken();

  // Generate unique article title
  const articleTitle = `Delete Article Test ${Date.now()}`;

  // Create article via API
  const article = await articleApi.createArticle(
    token,
    articleTitle,
    'Article created for delete testing',
    'This article will be deleted using Playwright.',
    'delete-test'
  );

  // Verify article created via API
  expect(article.title).toBe(articleTitle);

  // Go to Home page
  await homePage.goto();

  // Click API-created article
  await homePage.clickArticleByTitle(article.title);

  // Click Delete Article button
  await articlePage.clickDeleteArticle();
});