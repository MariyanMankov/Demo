const { test, expect } = require('@playwright/test');
const { User } = require("../tets_data/user");
const { ToolBar } = require("../page_objects/toolBar");
const { LoginPage } = require("../page_objects/login_page");
const { DashboardPage } = require("../page_objects/dashboard_page");


// test.use({
//   viewport: { width: 1920, height: 1200 },
// });

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loadLoginPage();
});

[
  { user: new User('Premium Complete'), type: 'Premium Complete'},
  { user: new User('Premium Collection'), type: 'Premium Collection' },
  { user: new User('Premium Single'), type: 'Premium Single' },
  { user: new User('Basic'), type: 'Basic' },
].forEach(({ user, type }) => {
  test(`Login test with ${type} user`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const toolBar = new ToolBar(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.enterEmail(user.email);
    await loginPage.enterPassword(user.password);
    await loginPage.clickLoginButton();
    await expect(toolBar.accountButtonText).toContainText( type, { timeout: 30000 });
    await expect(dashboardPage.welcomeMessage).toContainText('Welcome, ' + user.firstName, { timeout: 5000 });
  });
});
