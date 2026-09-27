import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { SettingsPage } from '../../pages/SettingsPage';

test('Update User Settings successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const settingsPage = new SettingsPage(page);

    // Go to Home page
    await homePage.goto();

    // Click Settings
    await homePage.clickSettings();

    // Update Username
    await settingsPage.fillUsername('updated username');

    // Update Bio
    await settingsPage.fillBio(
        'QA Automation using Playwright'
    );

    // Click Update Settings
    await settingsPage.clickUpdateSettings();
    // Wait until redirected to profile page
    //await page.waitForURL(/\/profile\/.+/);
    await expect(page.getByText('QA Automation using Playwright', { exact: true })).toBeVisible();
});