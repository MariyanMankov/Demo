const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  
  constructor(page) {
    this.page = page;
    this.acceptTermsAcceptButton =  page.locator('xpath=//div[@id = "adroll_consent_container"]//a[@id = "adroll_consent_accept"]//div[@class = "adroll_button_text"]');
    this.cookiesAcceptButton =  page.locator('xpath=//div[@aria-label="Cookie Consent Prompt"]//button[contains(text(),"Accept")]');
    this.emailField = page.locator('css=#emailAddress');
    this.passwordField = page.locator('//input[@id = "password"]');
    this.loginButton = page.locator('css=button[class = "v-btn v-btn--block v-btn--contained theme--light v-size--large primary"]')
  }

  async loadLoginPage() {
    await this.page.goto('/' + 'login');
    // if(process.env.NAME === 'stage' || process.env.NAME === 'prod'){
    //     await this.acceptTermsAcceptButton.click();
    // }
    await this.cookiesAcceptButton.click();
  }

  async enterEmail(email) {
    await this.emailField.fill(email);
  }
  async enterPassword(password) {
    await this.passwordField.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
  
};