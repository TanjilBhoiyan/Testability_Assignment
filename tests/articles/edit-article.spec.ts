import { test, expect } from '@playwright/test';
import { AuthApi } from '../../api/AuthApi';
import { ArticleApi } from '../../api/ArticleApi';
import { HomePage } from '../../pages/HomePage';
import { ArticlePage } from '../../pages/ArticlePage'
import { testData } from '../../utils/test-data';


test.describe.serial('Create Article Tests', () => {
    test('Edit Article successfully', async ({ page, request }) => {
        const authApi = new AuthApi(request);
        const articleApi = new ArticleApi(request);
        const homePage = new HomePage(page);
        const articlePage = new ArticlePage(page);

        // Login via API and get token
        const token = await authApi.loginAndGetToken();
        const articleTitle = `Edit Article Test ${Date.now()}`;

        const article = await articleApi.createArticle(
            token, articleTitle,
            'Article created for edit testing',
            'This article will be edited using Playwright.',
            'edit-test'
        );

        // Verify article created via API
        expect(article.title).toBe(articleTitle);
        await homePage.goto();
        await homePage.clickArticleByTitle(article.title);
        await page.waitForTimeout(3000);
        await articlePage.clickEditArticle();
        //const updatedTitle = `Updated Article ${Date.now()}`;
        // Update Article Title
        await articlePage.fillArticleTitle(testData.editArticle.title);
        // Update Article Description
        await articlePage.fillArticleDescription(testData.editArticle.description);
        // Update Article Body
        await articlePage.fillArticleBody(testData.editArticle.body);
        // Publish updated article
        await articlePage.clickPublishArticle();

        await expect(page.getByText(testData.editArticle.title, { exact: true }).first()).toBeVisible();

    });
    test('Should not edit article with duplicate title', async ({ page, request }) => {
        const authApi = new AuthApi(request);
        const articleApi = new ArticleApi(request);
        const homePage = new HomePage(page);
        const articlePage = new ArticlePage(page);

        // Login via API and get token
        const token = await authApi.loginAndGetToken();
        const articleTitle = `Edit Article Test ${Date.now()}`;

        const article = await articleApi.createArticle(
            token, articleTitle,
            'Article created for edit testing',
            'This article will be edited using Playwright.',
            'edit-test'
        );

        // Verify article created via API
        expect(article.title).toBe(articleTitle);
        await homePage.goto();
        await homePage.clickArticleByTitle(article.title);
        await page.waitForTimeout(3000);
        await articlePage.clickEditArticle();
        //const updatedTitle = `Updated Article ${Date.now()}`;
        // Update Article Title
        await articlePage.fillArticleTitle(testData.article.title);
        // Update Article Description
        await articlePage.fillArticleDescription(testData.editArticle.description);
        // Update Article Body
        await articlePage.fillArticleBody(testData.editArticle.body);
        // Publish updated article
        await articlePage.clickPublishArticle();

        await expect(page.getByText('title must be unique', { exact: true })).toBeVisible();

    });

});
