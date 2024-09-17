const { expect } = require('@playwright/test');

exports.DashboardPage = class DashboardPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.welcomeMessage =  page.locator('xpath=//h1');
  }

  async checkWelcomeMessageText(expectedMessage) {
    await expect(this.welcomeMessage).toHaveText(expectedMessage);
  }
  
};