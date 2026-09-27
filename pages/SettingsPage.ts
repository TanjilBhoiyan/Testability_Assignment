import { Page, Locator } from '@playwright/test';

export class SettingsPage {
  readonly page: Page;
  readonly profilePictureInput: Locator;
  readonly usernameInput: Locator;
  readonly bioInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly updateSettingsButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.profilePictureInput = page.getByPlaceholder(
      'URL of profile picture'
    );

    this.usernameInput = page.getByPlaceholder('Username');

    this.bioInput = page.getByPlaceholder(
      'Short bio about you'
    );

    this.emailInput = page.getByPlaceholder('Email');

    this.passwordInput = page.getByPlaceholder(
      'New Password'
    );

    this.updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings'
    });
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillBio(bio: string) {
    await this.bioInput.fill(bio);
  }

  async clickUpdateSettings() {
    await this.updateSettingsButton.click();
  }
  async fillEmail(email: string) {
  await this.emailInput.fill(email);
}
}