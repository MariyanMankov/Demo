const { test, expect } = require('@playwright/test');
const { User } = require("../tets_data/user");
const { ToolBar } = require("../page_objects/toolBar");
const { LoginPage } = require("../page_objects/login_page");
const { PremiumAnswersPage } = require("../page_objects/premium_answers_page");
const { TestDataGenerator } = require("../tets_data/test_data_generator");


[
  { user: new User('Premium Complete'), type: 'Premium Complete'},
  { user: new User('Premium Collection'), type: 'Premium Collection' },
  { user: new User('Premium Single'), type: 'Premium Single' },
  { user: new User('Basic'), type: 'Basic' },
].forEach(({ user, type }) => {
  test(`Verify the Cancel button functionality for ${type} user`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const toolBar = new ToolBar(page);
    const premiumAnswersPage = new PremiumAnswersPage(page);
    const generator = new TestDataGenerator();
    await loginPage.loadLoginPage();
    await loginPage.enterEmail(user.email);
    await loginPage.enterPassword(user.password);
    await loginPage.clickLoginButton();
    await expect(toolBar.accountButtonText).toContainText(type, {timeout:30000});
    await toolBar.selectHabburgerMenuOptionAndSubOption('Premium Tools', 'Premium Answers');
    await expect(premiumAnswersPage.title).toContainText("Premium Answers", {timeout:5000});
    await premiumAnswersPage.clickQuickConsultTab();
    var questionQuantityText = await premiumAnswersPage.questionsQuantityText.textContent({timeout:3000});
    var questionQuantity = parseInt(questionQuantityText.replace(/[^0-9]/g,""));
    await premiumAnswersPage.askNewQuestionButton.click();
    await expect(premiumAnswersPage.formSubmitQuestionButton).toBeVisible({timeout:3000});
    await premiumAnswersPage.formCodeTitleInput.click();
    var sectionNumber  = "Section: " + generator.getRandomInt(9999);
    var subject  = "Tets subject: " + generator.getRandomInt(9999);
    var details  = "Test details: " + generator.getRandomInt(9999);
   
    await page.keyboard.type('2024 International Mechanical Code (IMC)');
    await expect(premiumAnswersPage.formCodeTitleResults.nth(0)).toBeVisible({timeout:15000});
    await premiumAnswersPage.formCodeTitleResults.nth(0).click();
    await premiumAnswersPage.formSectionNumberinput.fill(sectionNumber);
    await premiumAnswersPage.formQuestionSubjectInput.fill(subject);
    await premiumAnswersPage.formQuestionDetailsInput.fill(details);
    await premiumAnswersPage.formUploadAttachment('stest.png');
    await premiumAnswersPage.formAcceptTermsCheckbox.click();
    await premiumAnswersPage.formCancelButton.click();

    var questionQuantityText2 = await premiumAnswersPage.questionsQuantityText.textContent({timeout:10000});
    var questionQuantityAfterSubmit = parseInt(questionQuantityText2.replace(/[^0-9]/g,""));

    await expect(premiumAnswersPage.questionCardsSubjects.nth(0)).not.toHaveText(subject, {timeout:15000});
    await expect(premiumAnswersPage.questionCardsDetails.nth(0)).not.toHaveText(details);
    await expect(questionQuantityAfterSubmit).toEqual(questionQuantity);
  });
}); 

[
  { user: new User('Premium Complete'), type: 'Premium Complete'},
  { user: new User('Premium Collection'), type: 'Premium Collection' },
  { user: new User('Premium Single'), type: 'Premium Single' },
  { user: new User('Basic'), type: 'Basic' },
].forEach(({ user, type }) => {
  test(`Verify that the ${type} user can navigate to the Quick Consult tab`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const toolBar = new ToolBar(page);
    const premiumAnswersPage = new PremiumAnswersPage(page);
    await loginPage.loadLoginPage();
    await loginPage.enterEmail(user.email);
    await loginPage.enterPassword(user.password);
    await loginPage.clickLoginButton();
    await expect(toolBar.accountButtonText).toContainText(type, {timeout:30000});
    await toolBar.selectHabburgerMenuOptionAndSubOption('Premium Tools', 'Premium Answers');
    await expect(premiumAnswersPage.title).toContainText("Premium Answers", {timeout:5000});
    await expect(premiumAnswersPage.quickConsultTab).toBeVisible({timeout:5000});
    await premiumAnswersPage.clickQuickConsultTab();
    await expect(page).toHaveURL(process.env.URL + "quick-consult/", {timeout:5000})
  });
}); 

[
  { user: new User('Premium Complete'), type: 'Premium Complete'},
  { user: new User('Premium Collection'), type: 'Premium Collection' },
  { user: new User('Premium Single'), type: 'Premium Single' },
  { user: new User('Basic'), type: 'Basic' },
].forEach(({ user, type }) => {
  test(`Verify the tab emlements for ${type} user`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const toolBar = new ToolBar(page);
    const premiumAnswersPage = new PremiumAnswersPage(page);
    await loginPage.loadLoginPage();
    await loginPage.enterEmail(user.email);
    await loginPage.enterPassword(user.password);
    await loginPage.clickLoginButton();
    await expect(toolBar.accountButtonText).toContainText(type, {timeout:30000});
    toolBar.selectHabburgerMenuOptionAndSubOption('Premium Tools', 'Premium Answers');
    await expect(premiumAnswersPage.title).toContainText("Premium Answers", {timeout:5000});
    premiumAnswersPage.clickQuickConsultTab();
    await expect(premiumAnswersPage.quickConsultTabTitle).toContainText("Quick Consult - code questions answered by an expert", {timeout:5000});
    await expect(premiumAnswersPage.askCodeQuestionsText).toContainText("Ask code questions on any of the International Codes (I-Codes). Our ICC experts will provide a professional opinion of how the codes apply to your specific circumstances within 2 business days.", {timeout:3000});
    await expect(premiumAnswersPage.creditsText).toContainText("credits - buy credits to ask a question. Note that this is a paid service. You must buy credits to ask questions, regardless of your Premium subscription status.", {timeout:3000});
    await expect(premiumAnswersPage.askNewQuestionButton).toBeVisible({timeout:3000});
    await expect(premiumAnswersPage.purchaseCreditsButton).toBeVisible({timeout:3000});
    await expect(premiumAnswersPage.questionsQuantityText).toBeVisible({timeout:3000});
    var questionQuantityText = await premiumAnswersPage.questionsQuantityText.textContent({timeout:3000});
    var questionQuantity = parseInt(questionQuantityText.replace(/[^0-9]/g,""));
    if(questionQuantity == 0 ){
      await expect(premiumAnswersPage.questionsQuantityText).toContainText("0 questions");
      await expect(premiumAnswersPage.noQuestionsMessage).toContainText("You haven't asked any questions yet.");
    }else if(questionQuantity == 1){
      await expect(premiumAnswersPage.questionsQuantityText).toContainText("1 question");
      await expect(premiumAnswersPage.questionCards.first()).toBeVisible({timeout:3000});

    } else{
      await expect(premiumAnswersPage.questionsQuantityText).toContainText( `${questionQuantity} questions`);
      await expect(premiumAnswersPage.questionCards.first()).toBeVisible({timeout:3000});
    }
  }); 
}); 

[
  { user: new User('Premium Complete'), type: 'Premium Complete'},
  { user: new User('Premium Collection'), type: 'Premium Collection' },
  { user: new User('Premium Single'), type: 'Premium Single' },
  { user: new User('Basic'), type: 'Basic' },
].forEach(({ user, type }) => {
  test(`Verify the purchase credit button functionality for  ${type} user `, async ({ browser }) => {
    // Create a new incognito browser context
  const context = await browser.newContext();
  // Create a new page inside context.
  const page = await context.newPage();
    const loginPage = new LoginPage(page); 
    const toolBar = new ToolBar(page);
    const premiumAnswersPage = new PremiumAnswersPage(page);
    await loginPage.loadLoginPage();
    await loginPage.enterEmail(user.email);
    await loginPage.enterPassword(user.password);
    await loginPage.clickLoginButton();
    await expect(toolBar.accountButtonText).toContainText(type, {timeout:30000});
    toolBar.selectHabburgerMenuOptionAndSubOption('Premium Tools', 'Premium Answers');
    await expect(premiumAnswersPage.title).toContainText("Premium Answers", {timeout:5000});
    premiumAnswersPage.clickQuickConsultTab();
    var pagePromise =  context.waitForEvent('page');
    await premiumAnswersPage.purchaseCreditsButton.click();
    var newPage = await pagePromise; 
    await expect(newPage).toHaveURL("https://shop.iccsafe.org/", {timeout:10000})
    await context.close();
  });
}); 

[
  { user: new User('Premium Complete'), type: 'Premium Complete'},
  { user: new User('Premium Collection'), type: 'Premium Collection' },
  { user: new User('Premium Single'), type: 'Premium Single' },
  { user: new User('Basic'), type: 'Basic' },
].forEach(({ user, type }) => {
  test(`Verify ask new question button functionality for ${type} user`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const toolBar = new ToolBar(page);
    const premiumAnswersPage = new PremiumAnswersPage(page);
    await loginPage.loadLoginPage();
    await loginPage.enterEmail(user.email);
    await loginPage.enterPassword(user.password);
    await loginPage.clickLoginButton();
    await expect(toolBar.accountButtonText).toContainText(type, {timeout:30000});
    await toolBar.selectHabburgerMenuOptionAndSubOption('Premium Tools', 'Premium Answers');
    await expect(premiumAnswersPage.title).toContainText("Premium Answers", {timeout:5000});
    await premiumAnswersPage.clickQuickConsultTab();
    await premiumAnswersPage.askNewQuestionButton.click();
    await expect.soft(page).toHaveURL(process.env.URL + "quick-consult/ask-question", {timeout:5000})
    await expect.soft(premiumAnswersPage.formSectionTitiles.first()).toContainText("Code Title and Section");
    await expect.soft(premiumAnswersPage.formSectionTitiles.nth(1)).toContainText("Question");
    await expect.soft(premiumAnswersPage.formSectionText.nth(0)).toContainText("Required fields*");
    await expect.soft(premiumAnswersPage.formSectionText.nth(1)).toContainText("Select the International Codes (I-Code) that your question applies to.");
    await expect.soft(premiumAnswersPage.formSectionText.nth(2)).toContainText("Include all the information the ICC team would need to answer your question.");
    await expect.soft(premiumAnswersPage.formCodeTitleInput).toBeVisible({timeout:3000});
    await expect.soft(premiumAnswersPage.formSectionNumberinput).toBeVisible({timeout:3000});
    await expect.soft(premiumAnswersPage.formQuestionSubjectInput).toBeVisible({timeout:3000});
    await expect.soft(premiumAnswersPage.formQuestionDetailsInput).toBeVisible({timeout:3000});
    await expect.soft(premiumAnswersPage.formAttachmentsInput).toBeAttached({timeout:3000});
    await expect.soft(premiumAnswersPage.formAcceptTermsCheckbox).toBeVisible({timeout:3000});
    await expect.soft(premiumAnswersPage.formSubmitQuestionButton).toBeVisible({timeout:3000});
    await expect.soft(premiumAnswersPage.formCancelButton).toBeVisible({timeout:3000});
  });
}); 

[
  { user: new User('Premium Complete'), type: 'Premium Complete'},
  { user: new User('Premium Collection'), type: 'Premium Collection' },
  { user: new User('Premium Single'), type: 'Premium Single' },
  { user: new User('Basic'), type: 'Basic' },
].forEach(({ user, type }) => {
  test(`Verify the quick consult question filters for ${type} user`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const toolBar = new ToolBar(page);
    const premiumAnswersPage = new PremiumAnswersPage(page);
    await loginPage.loadLoginPage();
    await loginPage.enterEmail(user.email);
    await loginPage.enterPassword(user.password);
    await loginPage.clickLoginButton();
    await expect(toolBar.accountButtonText).toContainText(type, {timeout:30000});
    await toolBar.selectHabburgerMenuOptionAndSubOption('Premium Tools', 'Premium Answers');
    await expect(premiumAnswersPage.title).toContainText("Premium Answers", {timeout:5000});
    await premiumAnswersPage.clickQuickConsultTab();
    
    await premiumAnswersPage.selectQuickConsultFilter("Submitted")
    var questionSubmitedQuantityText = await premiumAnswersPage.questionsQuantityText.textContent({timeout:3000});
    var submitedQuantity = parseInt(questionSubmitedQuantityText.replace(/[^0-9]/g,""));

    var allChips = await premiumAnswersPage.questionCardsChips.allTextContents();
    for (let index = 0; index < allChips.length; index++) {
      const chipText = allChips[index];
      await expect(chipText).toEqual("Submitted");
    }

    await premiumAnswersPage.selectQuickConsultFilter("In Progress")
    var questionInProgressQuantityText = await premiumAnswersPage.questionsQuantityText.textContent({timeout:3000});
    var inProgressQuantity = parseInt(questionInProgressQuantityText.replace(/[^0-9]/g,""));

    allChips = await premiumAnswersPage.questionCardsChips.allTextContents();
    for (let index = 0; index < allChips.length; index++) {
      const chipText = allChips[index];
      await expect(chipText).toEqual("In Progress");
    }

    await premiumAnswersPage.selectQuickConsultFilter("Answered")
    var questionAnsweredQuantityText = await premiumAnswersPage.questionsQuantityText.textContent({timeout:3000});
    var answeredQuantity = parseInt(questionAnsweredQuantityText.replace(/[^0-9]/g,""));

    allChips = await premiumAnswersPage.questionCardsChips.allTextContents();
    for (let index = 0; index < allChips.length; index++) {
      const chipText = allChips[index];
      await expect(chipText).toEqual("Answered");
    }

    await premiumAnswersPage.selectQuickConsultFilter("All")
    var questionAllQuantityText = await premiumAnswersPage.questionsQuantityText.textContent({timeout:3000});
    var allQuantity = parseInt(questionAllQuantityText.replace(/[^0-9]/g,""));

    await expect(submitedQuantity + inProgressQuantity + answeredQuantity).toEqual(allQuantity);
  });
}); 

[
  { user: new User('Premium Complete'), type: 'Premium Complete'},
  { user: new User('Premium Collection'), type: 'Premium Collection' },
  { user: new User('Premium Single'), type: 'Premium Single' },
  { user: new User('Basic'), type: 'Basic' },
].forEach(({ user, type }) => {
  test(`Verify the submiit question button functionality for ${type} user`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const toolBar = new ToolBar(page);
    const premiumAnswersPage = new PremiumAnswersPage(page);
    const generator = new TestDataGenerator();
    await loginPage.loadLoginPage();
    await loginPage.enterEmail(user.email);
    await loginPage.enterPassword(user.password);
    await loginPage.clickLoginButton();
    await expect(toolBar.accountButtonText).toContainText(type, {timeout:30000});
    await toolBar.selectHabburgerMenuOptionAndSubOption('Premium Tools', 'Premium Answers');
    await expect(premiumAnswersPage.title).toContainText("Premium Answers", {timeout:5000});
    await premiumAnswersPage.clickQuickConsultTab();
    var questionQuantityText = await premiumAnswersPage.questionsQuantityText.textContent({timeout:3000});
    var questionQuantity = parseInt(questionQuantityText.replace(/[^0-9]/g,""));
    await premiumAnswersPage.askNewQuestionButton.click();
    await expect(premiumAnswersPage.formSubmitQuestionButton).toBeVisible({timeout:3000});
    await premiumAnswersPage.formCodeTitleInput.click();

    var title  = '2024 International Mechanical Code (IMC)';
    var sectionNumber  = "Section: " + generator.getRandomInt(9999);
    var subject  = "Tets subject: " + generator.getRandomInt(9999);
    var details  = "Test details: " + generator.getRandomInt(9999);
    var timestamp  = generator.getMonth(true)+' '+ generator.getDate(true)+', '+generator.getYear();
    var attachmentFile  = 'stest.png';
   
    await page.keyboard.type(title);
    await expect(premiumAnswersPage.formCodeTitleResults.nth(0)).toBeVisible({timeout:15000});
    await premiumAnswersPage.formCodeTitleResults.nth(0).click();
    await premiumAnswersPage.formSectionNumberinput.fill(sectionNumber);
    await premiumAnswersPage.formQuestionSubjectInput.fill(subject);
    await premiumAnswersPage.formQuestionDetailsInput.fill(details);
    await premiumAnswersPage.formUploadAttachment(attachmentFile);
    await premiumAnswersPage.formAcceptTermsCheckbox.click();
    await premiumAnswersPage.formSubmitQuestionButton.click();

    var questionQuantityText2 = await premiumAnswersPage.questionsQuantityText.textContent({timeout:10000});
    var questionQuantityAfterSubmit = parseInt(questionQuantityText2.replace(/[^0-9]/g,""));

    premiumAnswersPage.selectQuickConsultFilter('All');

    await expect(premiumAnswersPage.questionCardsSubjects.nth(0)).toHaveText(subject, {timeout:15000});
    await expect(premiumAnswersPage.questionCardsDetails.nth(0)).toHaveText(details);
    await expect(premiumAnswersPage.questionCardsChips.nth(0)).toHaveText("Submitted");
    await expect(premiumAnswersPage.questionCardsDates.nth(0)).toHaveText(timestamp);
    await expect(questionQuantityAfterSubmit).toBeGreaterThan(questionQuantity);

    await premiumAnswersPage.questionCardsSubjects.nth(0).click();

    await expect(premiumAnswersPage.detailsQuestionTitle).toHaveText(title, {timeout:15000});
    await expect(premiumAnswersPage.detailsQuestionTitleSection).toHaveText(sectionNumber, {timeout:3000});
    await expect(premiumAnswersPage.detailsSubject).toHaveText(subject, {timeout:3000});
    await expect(premiumAnswersPage.detailsQuestionDetail).toHaveText(details);
    await expect(premiumAnswersPage.detailsChip).toHaveText("Submitted");
    await expect(premiumAnswersPage.detailsDate).toContainText(timestamp);
  });
}); 

