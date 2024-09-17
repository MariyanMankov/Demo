const { expect } = require('@playwright/test');

exports.BillingPage = class BillingPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    //Your Managed Subscriptions section----------//
    this.YMSTitle =  page.locator('//h3[contains(text(),"Your Managed Subscriptions")]');
    this.YMSLicensesSummaryText =  page.locator('//h3[contains(text(),"Your Managed Subscriptions")]/..//div[@class="v-card__title font-weight-bold subtitle-1"]');
    this.YMSLicensesSetToAuroRenewText =  page.locator('//h3[contains(text(),"Your Managed Subscriptions")]/..//div[@class="v-card__text"]//div[1]');
    this.YMSLicensesSetToExpireText =  page.locator('//h3[contains(text(),"Your Managed Subscriptions")]/..//div[@class="v-card__text"]//div[2]');
    this.YMSConfiguyreLicesesLink =  page.locator('(//h3[contains(text(),"Your Managed Subscriptions")]/..//a)[1]');
    this.YMSManagePaymentOptionsLink =  page.locator('(//h3[contains(text(),"Your Managed Subscriptions")]/..//a)[2]');
    this.YMSLicensesSummaryTextForBasicUser =  page.locator('//h3[contains(text(),"Your Managed Subscriptions")]/..//p');
    
    //Your Active Profile section----------//
    this.YAPTitle =  page.locator('//h3[contains(text(),"Your Active Profile")]');
    this.YAPType =  page.locator('//h3[contains(text(),"Your Active Profile")]/..//div[@class="v-card__title font-weight-bold subtitle-1"]');
    this.YAPInfoText =  page.locator('//h3[contains(text(),"Your Active Profile")]/..//p');
    
    //Subscriptions Table content----------//
    this.subscriptionTableColumnNames =  page.locator('xpath=//th');
    this.subscriptionTableRows =  page.locator('xpath=//tbody//tr');
    this.tableTitles =  page.locator('xpath=//tbody//tr//td[1]');
    this.tableTitlesJumpButtons =  page.locator('xpath=//tbody//tr//td[1]//a');
    this.tableTitlesStatuses =  page.locator('xpath=//tbody//tr//td[2]//span[@class="v-chip__content"]');
    this.tableTitlesLicenses =  page.locator('xpath=//tbody//tr//td[3]//span');
    this.tableBillingFrequencyDateText =  page.locator('//tbody//tr//td[4]//span[@class="caption grey--text text--darken-1"]');

    //Filter----------//
    this.selectedFilterButton =  page.locator('//button[contains(concat("", @class, ""), " v-item--active v-btn--active")]');
    this.selectedFilterText =  page.locator('//button[contains(concat("", @class, ""), " v-item--active v-btn--active")]//span[@class="v-btn__content"]');

    //Sort By----------//
    this.selectedSortByOption =  page.locator('//label[contains(text(),"Sort By")]/../..//div[@class="v-select__selection v-select__selection--comma"]');
    
  }

  async selecrRowsPerPage(text) {
    var button =  this.page.locator('//input[contains(concat("⦿", @aria-label, "⦿"), "itemsPerPageText")] /../div');
    await button.click();
    var option =  this.page.locator(`xpath=//div[.="${text}"][@class="v-list-item__title"]`);
    await option.click();
  }

  async getTotalSubscriptions() {
    var array = await await this.tableTitlesJumpButtons.all();
    return array.length;
  }

  async getTotalLicesesCout() {
    var array = await this.tableTitlesLicenses.allTextContents();
    var count = 0;
    for (let index = 0; index < array.length; index++) {
      count = count + parseInt(array[index]);
    }
    return count;
  }

  async getTotalLicesesSetToAutorenew() {
    var arrayLicenses = await this.tableTitlesLicenses.allTextContents();
    var arrayBilling = await this.tableBillingFrequencyDateText.allTextContents();
    var count = 0;
    for (let index = 0; index < arrayLicenses.length; index++) {

      if(String(arrayBilling[index]).includes('Auto-renews on')){
        count = count + parseInt(arrayLicenses[index]);
      }
    }
    return count;
  }

  async getTotalLicesesSetToExpire() {
    var arrayLicenses = await this.tableTitlesLicenses.allTextContents();
    var arrayBilling = await this.tableBillingFrequencyDateText.allTextContents();
    var count = 0;
    for (let index = 0; index < arrayLicenses.length; index++) {

      if(String(arrayBilling[index]).includes('Expires')){
        count = count + parseInt(arrayLicenses[index]);
      }
    }
    return count;
  }

  async getSelectedFilter() {
    var filterName = await this.selectedFilterButton.getAttribute('value');
    return filterName
  }

  async selectFilter(filterName) {
    var filterLocator = await this.page.locator(`//button[@value="${filterName}"]`);
    filterLocator.click();
    await expect(this.selectedFilterText).toContainText(filterName,{timeout:5000});
  }
};