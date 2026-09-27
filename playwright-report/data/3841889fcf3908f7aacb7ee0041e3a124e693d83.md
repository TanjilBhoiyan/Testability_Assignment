# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: articles\edit-article.spec.ts >> Should not edit article with duplicate title
- Location: tests\articles\edit-article.spec.ts:44:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('title must be unique', { exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('title must be unique', { exact: true }) with timeout 5000ms
  - waiting for getByText('title must be unique', { exact: true })

```

```yaml
- navigation:
  - link "conduit":
    - /url: /
- heading "Test Article 1790516199427" [level=1]
- link:
  - /url: /profile/updated12
  - img
- link "updated12":
  - /url: /profile/updated12
- text: September 27, 2026
- link " Edit Article":
  - /url: /editor/Test-Article-1790516199427-73859
- button " Delete Article"
- paragraph: This article has been edited using Playwright.
- list
- separator
- link:
  - /url: /profile/updated12
  - img
- link "updated12":
  - /url: /profile/updated12
- text: September 27, 2026
- link " Edit Article":
  - /url: /editor/Test-Article-1790516199427-73859
- button " Delete Article"
- list
- group:
  - textbox "Write a comment..."
  - img
  - button "Post Comment"
- contentinfo:
  - link "conduit":
    - /url: /
  - text: © 2026. An interactive learning project from
  - link "RealWorld OSS Project":
    - /url: https://github.com/gothinkster/realworld
  - text: . Code licensed under MIT. Hosted by
  - link "Bondar Academy":
    - /url: https://bondaracademy.com
  - text: .
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { AuthApi } from '../../api/AuthApi';
  3  | import { ArticleApi } from '../../api/ArticleApi';
  4  | import { HomePage } from '../../pages/HomePage';
  5  | import { ArticlePage } from '../../pages/ArticlePage'
  6  | import { testData } from '../../utils/test-data';
  7  | 
  8  | test('Edit Article successfully', async ({ page, request }) => {
  9  |     const authApi = new AuthApi(request);
  10 |     const articleApi = new ArticleApi(request);
  11 |     const homePage = new HomePage(page);
  12 |     const articlePage = new ArticlePage(page);
  13 | 
  14 |     // Login via API and get token
  15 |     const token = await authApi.loginAndGetToken();
  16 |     const articleTitle = `Edit Article Test ${Date.now()}`;
  17 | 
  18 |     const article = await articleApi.createArticle(
  19 |         token, articleTitle,
  20 |         'Article created for edit testing',
  21 |         'This article will be edited using Playwright.',
  22 |         'edit-test'
  23 |     );
  24 | 
  25 |     // Verify article created via API
  26 |     expect(article.title).toBe(articleTitle);
  27 |     await homePage.goto();
  28 |     await homePage.clickArticleByTitle(article.title);
  29 |     await page.waitForTimeout(3000);
  30 |     await articlePage.clickEditArticle();
  31 |     //const updatedTitle = `Updated Article ${Date.now()}`;
  32 |     // Update Article Title
  33 |     await articlePage.fillArticleTitle(testData.editArticle.title);
  34 |     // Update Article Description
  35 |     await articlePage.fillArticleDescription(testData.editArticle.description);
  36 |     // Update Article Body
  37 |     await articlePage.fillArticleBody(testData.editArticle.body);
  38 |     // Publish updated article
  39 |     await articlePage.clickPublishArticle();
  40 |     
  41 |     await expect(page.getByText(testData.editArticle.title, { exact: true }).first()).toBeVisible();
  42 | 
  43 | });
  44 | test('Should not edit article with duplicate title', async ({ page, request }) => {
  45 |     const authApi = new AuthApi(request);
  46 |     const articleApi = new ArticleApi(request);
  47 |     const homePage = new HomePage(page);
  48 |     const articlePage = new ArticlePage(page);
  49 | 
  50 |     // Login via API and get token
  51 |     const token = await authApi.loginAndGetToken();
  52 |     const articleTitle = `Edit Article Test ${Date.now()}`;
  53 | 
  54 |     const article = await articleApi.createArticle(
  55 |         token, articleTitle,
  56 |         'Article created for edit testing',
  57 |         'This article will be edited using Playwright.',
  58 |         'edit-test'
  59 |     );
  60 | 
  61 |     // Verify article created via API
  62 |     expect(article.title).toBe(articleTitle);
  63 |     await homePage.goto();
  64 |     await homePage.clickArticleByTitle(article.title);
  65 |     await page.waitForTimeout(3000);
  66 |     await articlePage.clickEditArticle();
  67 |     //const updatedTitle = `Updated Article ${Date.now()}`;
  68 |     // Update Article Title
  69 |     await articlePage.fillArticleTitle(testData.article.title);
  70 |     // Update Article Description
  71 |     await articlePage.fillArticleDescription(testData.editArticle.description);
  72 |     // Update Article Body
  73 |     await articlePage.fillArticleBody(testData.editArticle.body);
  74 |     // Publish updated article
  75 |     await articlePage.clickPublishArticle();
  76 |     
> 77 |     await expect(page.getByText('title must be unique', { exact: true })).toBeVisible();
     |                                                                           ^ Error: expect(locator).toBeVisible() failed
  78 | 
  79 | });
  80 | 
```