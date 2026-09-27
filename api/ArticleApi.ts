import { APIRequestContext, expect } from '@playwright/test';

export class ArticleApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createArticle(
    token: string,
    title: string,
    description: string,
    body: string,
    tag: string
  ) {
    const response = await this.request.post(
      'https://conduit-api.bondaracademy.com/api/articles/',
      {
        headers: {
          Authorization: `Token ${token}`,
        },

        data: {
          article: {
            title: title,
            description: description,
            body: body,
            tagList: [tag],
          },
        },
      }
    );

    // Verify article created successfully
    expect(response.status()).toBe(201);

    // Get response body
    const responseBody = await response.json();

    // Return created article
    return responseBody.article;
  }
}