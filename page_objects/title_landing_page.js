const { expect } = require('@playwright/test');

exports.TitleLandingPage = class TitleLandingPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title =  page.locator('xpath=//div[@id="contentOverview"]//h2');
  }

  async waitFforTheTitleToBeVisible() {
    await this.page.waitForLoadState('networkidle');
  }
};