import { Page, Locator } from '@playwright/test';

export class ArticlePage {
    readonly page: Page;
    readonly articleTitleInput: Locator;
    readonly articleDescriptionInput: Locator;
    readonly articleBodyInput: Locator;
    readonly tagsInput: Locator;
    readonly publishArticleButton: Locator;
    readonly editArticleButton: Locator;
    readonly deleteArticleButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.articleTitleInput = page.getByPlaceholder('Article Title');

        this.articleDescriptionInput = page.getByPlaceholder("What's this article about?");
        this.articleBodyInput = page.getByPlaceholder('Write your article (in markdown)');
        this.publishArticleButton = page.getByRole('button', {name: 'Publish Article',});
        this.tagsInput = page.getByPlaceholder('Enter tags');
        this.editArticleButton = page.getByRole('link', {name: 'Edit Article'});
        this.deleteArticleButton = page.getByRole('button', {name: 'Delete Article'});
    }
    async clickDeleteArticle() 
    {
        await this.deleteArticleButton.first().click();
    }
    async clickEditArticle() 
    {
        await this.editArticleButton.first().click();
    }

    async fillArticleTitle(title: string) {
        await this.articleTitleInput.fill(title);
    }

    async fillArticleDescription(description: string) {
        await this.articleDescriptionInput.fill(description);
    }

    async fillArticleBody(body: string) {
        await this.articleBodyInput.fill(body);
    }

    async fillArticleTag(tag: string) {
        await this.tagsInput.fill(tag);
    }
    async clickPublishArticle() {
        await this.publishArticleButton.click();
    }
}