import { APIRequestContext, expect } from '@playwright/test';
export class AuthApi {
    readonly request: APIRequestContext;
    constructor(request: APIRequestContext) {
        this.request = request;
    }
    async loginAndGetToken(): Promise<string> {
        const response = await this.request.post('https://conduit-api.bondaracademy.com/api/users/login',
            {
                data: {
                    user: {
                        email: process.env.TEST_EMAIL,
                        password: process.env.TEST_PASSWORD,
                    },
                },
            }
        );

        // Verify login API is successful
        expect(response.status()).toBe(200);
        // Get response body
        const responseBody = await response.json();
        // Return authentication token
        return responseBody.user.token;
    }
}