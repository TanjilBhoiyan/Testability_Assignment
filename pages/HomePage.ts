import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly newArticleLink: Locator;
  readonly articleTitle: Locator;
  readonly settingsLink: Locator;
  readonly popularTags: Locator;
  readonly articlePreview: Locator;
  readonly paginationLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    // New Article link
    this.newArticleLink = page.getByRole('link', { name: 'New Article', });
    // Created Playwright article
    this.articleTitle = page.getByRole('link', { name: 'Playwright Test Article', exact: true, });
    // Settings link
    this.settingsLink = page.getByRole('link', { name: 'Settings', });
    // Popular Tags section
    this.popularTags = page.locator('.sidebar');
    // Article preview
    this.articlePreview = page.locator('div.article-preview');
    this.paginationLinks = page.locator('.pagination .page-link');
  }

  // Go to Home page
  async goto() {
    await this.page.goto('/');
  }

  // Click New Article
  async clickNewArticle() {
    await this.newArticleLink.click();
  }

  // Click Playwright Test Article
  async clickArticle() {
    await this.articleTitle.click();
  }

  // Click any article using its title
  async clickArticleByTitle(title: string) {
    await this.page.getByText(title, { exact: true }).click();
  }

  // Click Settings
  async clickSettings() {
    await this.settingsLink.click();
  }

  // Click tag dynamically
  async clickTag(tagName: string) {
    await this.popularTags.getByText(tagName, { exact: true }).click();
  }
  async clickLastPage() {
  const count = await this.paginationLinks.count();

  if (count > 0) {
    const lastPage = this.paginationLinks.nth(count - 1);

    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      lastPage.click(),
    ]);
  }
}
  async clickLastArticle() {
  await this.articlePreview.last().click();
}
}