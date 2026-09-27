import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { SettingsPage } from '../../pages/SettingsPage';
import { testData } from '../../utils/test-data';

test('Update User Settings successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const settingsPage = new SettingsPage(page);

    // Go to Home page
    await homePage.goto();
    // Click Settings
    await homePage.clickSettings();
    // Update Username
    await settingsPage.fillUsername(testData.settings.username);
    // Update Bio
    await settingsPage.fillBio(testData.settings.bio);

    // Click Update Settings
    await settingsPage.clickUpdateSettings();
    // Wait until redirected to profile page
    //await page.waitForURL(/\/profile\/.+/);
    await expect(page.getByText('QA Automation using Playwright', { exact: true })).toBeVisible();
});

test('Should not update settings with invalid email', async ({ page }) => {
  const homePage = new HomePage(page);
  const settingsPage = new SettingsPage(page);
  // Go to Home page
  await homePage.goto();
  // Click Settings
  await homePage.clickSettings();
  // Enter invalid email
  await settingsPage.fillEmail('abc');
  // Click Update Settings
  await settingsPage.clickUpdateSettings();
  // Verify user remains on Settings page
  await expect(page).toHaveURL(/\/settings/);
});