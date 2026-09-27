import { test, expect } from '@playwright/test';
import { AuthApi } from '../../api/AuthApi';
import { ArticleApi } from '../../api/ArticleApi';
import { HomePage } from '../../pages/HomePage';
import { ArticlePage } from '../../pages/ArticlePage'

test('Edit Article successfully', async ({ page, request }) => {
    const authApi = new AuthApi(request);
    const articleApi = new ArticleApi(request);
    const homePage = new HomePage(page);
    const articlePage = new ArticlePage(page);

    // Login via API and get token
    const token = await authApi.loginAndGetToken();

    // Generate unique article title
    const articleTitle = `Edit Article Test ${Date.now()}`;

    // Create article via API
    const article = await articleApi.createArticle(
        token, articleTitle,
        'Article created for edit testing',
        'This article will be edited using Playwright.',
        'edit-test'
    );

    // Verify article created via API
    expect(article.title).toBe(articleTitle);

    // Go to Home page
    await homePage.goto();

    // Click API-created article
    await homePage.clickArticleByTitle(article.title);
    // Click Edit Article button
    await articlePage.clickEditArticle();
    // Generate unique updated title
    const updatedTitle = `Updated Article ${Date.now()}`;
    // Update Article Title
    await articlePage.fillArticleTitle(updatedTitle);
    // Update Article Description
    await articlePage.fillArticleDescription(
        'Updated article description'
    );
    // Update Article Body
    await articlePage.fillArticleBody(
        'This article has been edited using Playwright.'
    );
    // Publish updated article
    await articlePage.clickPublishArticle();

});