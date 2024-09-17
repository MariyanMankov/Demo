const { expect } = require('@playwright/test');

exports.ToolBar = class ToolBar {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.accountButton =  page.locator('(//header//div[@class="v-toolbar__items"]//button)[2]');
    this.hamburgerMenuButton =  page.locator('//header//span[contains(text(),"Menu")]/..');
    this.accountButtonText =  page.locator('xpath=//header//div[@class="v-toolbar__items"]//h4');
  }

  async clickAccountButton() {
    await this.accountButton.click();
  }

  async clickHamburgerMenuButton() {
    await this.hamburgerMenuButton.click();
  }

  async selectAccoontMenuOption(accountMenuOption) {
    this.clickAccountButton();
    var accountMenuOptionButton =  this.page.locator(`(//*[@role="menuitem"]//*[contains(text(),"${accountMenuOption}")]/../../..)[1]`);
    await accountMenuOptionButton.click();
  }

  async selectHabburgerMenuOption(hamburgerMenuOption) {
    this.clickHamburgerMenuButton();
    var hamburgerMenuOptionButton =  this.page.locator(`//*[@class='v-list-item__title fs-16 font-weight-bold accent--text'][contains(text(),"${hamburgerMenuOption}")]/..`);
    await hamburgerMenuOptionButton.click();
  }

  async selectHabburgerMenuOptionAndSubOption(hamburgerMenuOption, hamburgerMenuSubOption) {
    this.clickHamburgerMenuButton();
    var hamburgerMenuOptionButton =  this.page.locator(`//*[@class='v-list-item__title fs-16 font-weight-bold accent--text'][contains(text(),"${hamburgerMenuOption}")]/..`);
    var hamburgerMenuSubOptionButton =  this.page.locator(`//*[@class='v-list-item__title fs-16 font-weight-bold accent--text'][contains(text(),"${hamburgerMenuSubOption}")]/..`);
    await hamburgerMenuOptionButton.click();
    await expect(hamburgerMenuSubOptionButton).toBeVisible({timeout:3000});
    await hamburgerMenuSubOptionButton.click();
  }
};