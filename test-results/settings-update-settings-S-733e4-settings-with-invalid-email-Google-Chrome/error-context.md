# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: settings\update-settings.spec.ts >> Should not update settings with invalid email
- Location: tests\settings\update-settings.spec.ts:26:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/sdfsdfsd/
Received string:  "https://conduit.bondaracademy.com/settings"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × locator resolved to <html data-critters-container="">…</html>
       - unexpected value "https://conduit.bondaracademy.com/settings"

```

```yaml
- navigation:
  - link "conduit":
    - /url: /
  - list:
    - listitem:
      - link "Home":
        - /url: /
    - listitem:
      - link " New Article":
        - /url: /editor
    - listitem:
      - link " Settings":
        - /url: /settings
    - listitem:
      - link "updated11":
        - /url: /profile/updated11
        - img
        - text: updated11
- heading "Your Settings" [level=1]
- list
- group:
  - group:
    - textbox "URL of profile picture"
  - group:
    - textbox "Username"
  - group:
    - textbox "Short bio about you"
  - group:
    - textbox "Email": abc
  - group:
    - textbox "New Password"
  - button "Update Settings"
- separator
- button "Or click here to logout."
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
  2  | import { HomePage } from '../../pages/HomePage';
  3  | import { SettingsPage } from '../../pages/SettingsPage';
  4  | import { testData } from '../../utils/test-data';
  5  | 
  6  | test('Update User Settings successfully', async ({ page }) => {
  7  |     const homePage = new HomePage(page);
  8  |     const settingsPage = new SettingsPage(page);
  9  | 
  10 |     // Go to Home page
  11 |     await homePage.goto();
  12 |     // Click Settings
  13 |     await homePage.clickSettings();
  14 |     // Update Username
  15 |     await settingsPage.fillUsername(testData.settings.username);
  16 |     // Update Bio
  17 |     await settingsPage.fillBio(testData.settings.bio);
  18 | 
  19 |     // Click Update Settings
  20 |     await settingsPage.clickUpdateSettings();
  21 |     // Wait until redirected to profile page
  22 |     //await page.waitForURL(/\/profile\/.+/);
  23 |     await expect(page.getByText('QA Automation using Playwright', { exact: true })).toBeVisible();
  24 | });
  25 | 
  26 | test('Should not update settings with invalid email', async ({ page }) => {
  27 |   const homePage = new HomePage(page);
  28 |   const settingsPage = new SettingsPage(page);
  29 | 
  30 |   // Go to Home page
  31 |   await homePage.goto();
  32 | 
  33 |   // Click Settings
  34 |   await homePage.clickSettings();
  35 | 
  36 |   // Enter invalid email
  37 |   await settingsPage.fillEmail('abc');
  38 | 
  39 |   // Click Update Settings
  40 |   await settingsPage.clickUpdateSettings();
  41 | 
  42 |   // Verify user remains on Settings page
> 43 |   await expect(page).toHaveURL(/\/sdfsdfsd/);
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  44 | });
```