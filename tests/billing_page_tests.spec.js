const { test, expect } = require('@playwright/test');
const { User } = require("../tets_data/user");
const { ToolBar } = require("../page_objects/toolBar");
const { LoginPage } = require("../page_objects/login_page");
const { BillingPage } = require("../page_objects/billing_page");
const { TitleLandingPage } = require("../page_objects/title_landing_page");


[
  { user: new User('Premium Complete'), type: 'Premium Complete'},
  { user: new User('Premium Collection'), type: 'Premium Collection' },
  { user: new User('Premium Single'), type: 'Premium Single' },
  { user: new User('Basic'), type: 'Basic' },
].forEach(({ user, type }) => {
  test(`Verify the Billing page elements for:  ${type} user`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const toolBar = new ToolBar(page);
    const billingPage = new BillingPage(page);

    await loginPage.loadLoginPage();
    await loginPage.enterEmail(user.email);
    await loginPage.enterPassword(user.password);
    await loginPage.clickLoginButton();
    await expect(toolBar.accountButtonText).toContainText( type, { timeout: 30000 });
    await toolBar.selectAccoontMenuOption('Billing');
    await expect(billingPage.YAPTitle).toHaveText("Your Active Profile: Personal");
    await expect(billingPage.YAPType).toHaveText(type);
    if(type === "Premium Complete"){
      await expect(billingPage.YAPInfoText).toHaveText("With your Premium Complete tier, you have access to all titles within the Complete subscription along with enhanced features across those titles.");
    }else if(type === "Basic"){
      await expect(billingPage.YAPInfoText).toHaveText("You have Digital Codes Basic access. You can view full contents in read only format across titles with Basic access.");
    }else {
      await expect(billingPage.YAPInfoText).toHaveText(`With your ${type} tier, you have access to Premium features across the active individual titles listed below.`);
    } 
    await expect(billingPage.tableTitles.first()).toBeVisible();
    await billingPage.selecrRowsPerPage('All');

    if(type === "Basic"){
      await expect(billingPage.YMSLicensesSummaryTextForBasicUser).toHaveText("You don't have any active managed subscriptions.");
    }else{
    var totalSubscriptions = await billingPage.getTotalSubscriptions();
    var totalActiveLicenses = await billingPage.getTotalLicesesCout();
    var totalLicensesSetToAutorenew = await billingPage.getTotalLicesesSetToAutorenew();
    var totalLicensesSetToExpire = await billingPage.getTotalLicesesSetToExpire();

    await expect(billingPage.YMSLicensesSummaryText).toHaveText(`${totalActiveLicenses} active license(s) on ${totalSubscriptions} subscription(s)`);

    if(totalLicensesSetToAutorenew > 0){
      await expect(billingPage.YMSLicensesSetToAuroRenewText).toHaveText(`${totalLicensesSetToAutorenew} license(s) set to auto-renew`);
    }else{
      await expect(billingPage.YMSLicensesSetToAuroRenewText).not.toBeAttached
    }

    if(totalLicensesSetToExpire > 0){
      await expect(billingPage.YMSLicensesSetToExpireText).toHaveText(`${totalLicensesSetToExpire} license(s) set to expire`);
    }else{
      await expect(billingPage.YMSLicensesSetToExpireText).not.toBeAttached
    }
    }
    
  });
});

[
  { user: new User('Premium Single'), type: 'Premium Single' },
].forEach(({ user, type }) => {
  test(`Verify that jump to section button is working as expected for ${type} user`, async ({browser}) => {
    // Create a new incognito browser context
    const context = await browser.newContext();
    // Create a new page inside context.
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    const toolBar = new ToolBar(page);
    const billingPage = new BillingPage(page);
  
    await loginPage.loadLoginPage();
    await loginPage.enterEmail(user.email);
    await loginPage.enterPassword(user.password);
    await loginPage.clickLoginButton();
    await expect(toolBar.accountButtonText).toContainText(type, {timeout:30000});
    await toolBar.selectAccoontMenuOption('Billing');
    await expect(billingPage.tableTitles.first()).toBeVisible({timeout:15000});
  
    const titlesList =  await billingPage.tableTitles.allTextContents();
    const jumpButtons = await billingPage.tableTitlesJumpButtons.all();
  
    for (let index = 0; index < titlesList.length; index++) {
      var expectedTitle =titlesList[index].trim();
      var pagePromise =  context.waitForEvent('page');
      await jumpButtons[index].click();
      var newPage = await pagePromise; 
      var landingPage = new TitleLandingPage(newPage);
      newPage.waitForLoadState('domcontentloaded')
      await expect(landingPage.title).toBeVisible();
      var actualTitle = await landingPage.title.textContent();
      actualTitle = actualTitle.trim();
      await expect(actualTitle).toEqual(expectedTitle);
      newPage.close();
    }
    await context.close();
  });
});

[
  { user: new User('Premium Complete'), type: 'Premium Complete'},
  { user: new User('Premium Collection'), type: 'Premium Collection' },
  { user: new User('Premium Single'), type: 'Premium Single' },
].forEach(({ user, type }) => {
  test(`Verify the Billing page Active filter is selected when ${type} user lands on the page`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const toolBar = new ToolBar(page);
    const billingPage = new BillingPage(page);

    await loginPage.loadLoginPage();
    await loginPage.enterEmail(user.email);
    await loginPage.enterPassword(user.password);
    await loginPage.clickLoginButton();
    await expect(toolBar.accountButtonText).toContainText( type, { timeout: 30000 });
    await toolBar.selectAccoontMenuOption('Billing');

    await expect(await billingPage.getSelectedFilter()).toEqual('Active')
  });
});

[
  { user: new User('Premium Complete'), type: 'Premium Complete'},
  { user: new User('Premium Collection'), type: 'Premium Collection' },
  { user: new User('Premium Single'), type: 'Premium Single' },
].forEach(({ user, type }) => {
  test(`Verify the Billing page filter functionality for: ${type} user`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const toolBar = new ToolBar(page);
    const billingPage = new BillingPage(page);

    await loginPage.loadLoginPage();
    await loginPage.enterEmail(user.email);
    await loginPage.enterPassword(user.password);
    await loginPage.clickLoginButton();
    await expect(toolBar.accountButtonText).toContainText( type, { timeout: 30000 });
    await toolBar.selectAccoontMenuOption('Billing');

    await expect(billingPage.tableTitles.first()).toBeVisible({timeout:15000});
    await billingPage.selecrRowsPerPage('All');

    var totalActiveSubscriptions = await billingPage.getTotalSubscriptions();
    if(totalActiveSubscriptions > 0){
      var array = await  billingPage.tableTitlesStatuses.allTextContents();
      for (let index = 0; index < array.length; index++) {
        var status = array[index];
        await expect(status.trim()).toEqual("Active");
      }
    } 

    await billingPage.selectFilter("Inactive");
    await billingPage.selecrRowsPerPage('All');
    var totalInactiveSubscriptions = await billingPage.getTotalSubscriptions();
    if(totalActiveSubscriptions > 0){
      var array = await  billingPage.tableTitlesStatuses.allTextContents();
      for (let index = 0; index < array.length; index++) {
        var status = array[index];
        await expect(status).not.toEqual("Active");
      }
    } 

    await billingPage.selectFilter("All");
    await billingPage.selecrRowsPerPage('All');
    var totalSubscriptions = await billingPage.getTotalSubscriptions();
    await expect(totalActiveSubscriptions + totalInactiveSubscriptions).toEqual(totalSubscriptions);
  });
});


[
  { user: new User('Premium Complete'), type: 'Premium Complete'},
  { user: new User('Premium Collection'), type: 'Premium Collection' },
  { user: new User('Premium Single'), type: 'Premium Single' },
].forEach(({ user, type }) => {
  test(`Verify the Sort By filter on page load is 'Billing Date' for: ${type} user`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const toolBar = new ToolBar(page);
    const billingPage = new BillingPage(page);

    await loginPage.loadLoginPage();
    await loginPage.enterEmail(user.email);
    await loginPage.enterPassword(user.password);
    await loginPage.clickLoginButton();
    await expect(toolBar.accountButtonText).toContainText( type, { timeout: 30000 });
    await toolBar.selectAccoontMenuOption('Billing');

    await expect(billingPage.tableTitles.first()).toBeVisible({timeout:15000});

    await expect(billingPage.selectedSortByOption).toContainText('Billing Date');
  });
});