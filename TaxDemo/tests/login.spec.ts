import { test, expect } from '@playwright/test';
import { LoginPage } from './page-objects/LoginPage';

test.describe('Tax app login', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('student', 'Password123');
    await loginPage.expectLoggedIn();
    await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
  });

  test('login fails with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('student', 'WrongPassword123');
    await loginPage.expectErrorContains('Your password is invalid!');
    await expect(page).toHaveURL('https://practicetestautomation.com/practice-test-login/');
  });

  test('login fails with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', '');
    await loginPage.expectErrorContains('Your username is invalid!');
    await expect(page).toHaveURL('https://practicetestautomation.com/practice-test-login/');
  });

  test('login fails with SQL injection payload', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("' OR '1'='1", 'pass');
    await loginPage.expectErrorContains('Your username is invalid!');
    await expect(page).toHaveURL('https://practicetestautomation.com/practice-test-login/');
  });

  // The practice site does not expose a "Forgot password" link on login.
  // Keeping this check as a comment for future reference if UI changes:
  // test('forgot password link is not applicable on this site', async ({ page }) => {
  //   const loginPage = new LoginPage(page);
  //   await expect(loginPage.forgotPasswordLink).toHaveCount(0);
  //   await expect(page).toHaveURL('https://practicetestautomation.com/practice-test-login/');
  // });
});
