import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly rememberMeCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    // Strong, explicit selectors for https://practicetestautomation.com/practice-test-login/
    this.usernameInput = page.locator('input#username, input[name="username"]');
    this.passwordInput = page.locator('input#password, input[name="password"]');
    this.loginButton = page.locator('button#submit, button[type="submit"], button:has-text("Submit"), button:has-text("Login")');
    this.errorMessage = page.locator('#error, .show, .error, .validation-error').first();
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot password|reset password/i }).first().or(page.locator('a:has-text("Forgot password"), a:has-text("Reset password")'));
    this.rememberMeCheckbox = page.getByLabel(/remember me/i).first().or(page.locator('input[type="checkbox"][name="remember"], input#rememberMe'));
  }

  async goto() {
    await this.page.goto('/practice-test-login/');
    await Promise.all([
      this.usernameInput.waitFor({ state: 'visible', timeout: 5000 }),
      this.passwordInput.waitFor({ state: 'visible', timeout: 5000 }),
      this.loginButton.waitFor({ state: 'visible', timeout: 5000 }),
    ]);
  }

  async login(username: string, password: string, remember = false) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    if (remember) {
      await this.rememberMeCheckbox.check();
    }
    await this.loginButton.click();
  }

  async expectErrorContains(text: string) {
    const errorWithText = this.page.locator('#error, .show, .error, .validation-error').filter({ hasText: text }).first();
    await errorWithText.waitFor({ state: 'visible', timeout: 10000 });
    await expect(errorWithText).toContainText(text, { timeout: 5000 });
  }

  async expectLoggedIn() {
    // Validate the exact post-login URL on practice-test-login site.
    await this.page.waitForURL('https://practicetestautomation.com/logged-in-successfully/', { timeout: 10000 });
  }
}
