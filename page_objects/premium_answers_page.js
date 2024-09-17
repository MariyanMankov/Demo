const { expect } = require('@playwright/test');

exports.PremiumAnswersPage = class PremiumAnswersPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title =  page.locator('//h1[.="Premium Answers"]');

    //Quck console tab//
    this.quickConsultTab =  page.locator('//div[@class="v-slide-group__content v-tabs-bar__content"]//div[@role="tab"][2]');
    this.quickConsultTabTitle =  page.locator('//h2[@class="mb-5"]');
    this.askCodeQuestionsText  = page.locator('//h2[@class="mb-5"]/..//p[1]');
    this.creditsText = page.locator('//h2[@class="mb-5"]/..//p[2]');
    this.askNewQuestionButton = page.locator('//h2[@class="mb-5"]/..//span[contains(text(),"Ask New Question")]/..');
    this.purchaseCreditsButton = page.locator('//h2[@class="mb-5"]/..//span[contains(text(),"Purchase Credits")]/..');
    this.questionsQuantityText = page.locator('//div[@class="pa-2"]//h2');
    this.noQuestionsMessage = page.locator('//div[@class="pa-2"]//p');
    this.questionCards = page.locator('//div[@class="pa-2"]//div[@class="border pa-4 mb-4 v-sheet theme--light"]');
    this.questionCardsSubjects = page.locator('//div[@class="pa-2"]//div[@class="border pa-4 mb-4 v-sheet theme--light"]//a');
    this.questionCardsDates = page.locator('//div[@class="pa-2"]//div[@class="border pa-4 mb-4 v-sheet theme--light"]//time');
    this.questionCardsDetails = page.locator('//div[@class="pa-2"]//div[@class="border pa-4 mb-4 v-sheet theme--light"]//p[2]');
    this.questionCardsChips = page.locator('//div[@class="pa-2"]//div[@class="border pa-4 mb-4 v-sheet theme--light"]//span[@class = "v-chip__content"]');
    
    
    //Quck console tab - ask questions form//
    this.formTitle = page.locator('//form//h5');
    this.formSectionTitiles = page.locator('//form//h6');
    this.formSectionText = page.locator('//form//p');
    this.formCodeTitleInput = page.locator('//form//input[@placeholder="Start typing to Search"]');
    this.formCodeTitleResults = page.locator('//div[@role="option"]');
    this.formSectionNumberinput = page.locator('//form//label[.="Section Number*"]/..//input');
    this.formQuestionSubjectInput = page.locator('//form//label[.="Question Subject*"]/..//input');
    this.formQuestionDetailsInput = page.locator('//form//textarea');
    this.formAttachmentsInput = page.locator('//form//input[@type="file"]');
    this.formAttachmentsIcon = page.locator('//form//button[@class="v-icon notranslate v-icon--link mdi mdi-paperclip theme--light"]');
    this.formAcceptTermsCheckbox = page.locator('//form//input[@role="checkbox"]/..');
    this.formAcceptTermsCheckbox = page.locator('//form//input[@role="checkbox"]/..');
    this.formSubmitQuestionButton = page.locator('//form//span[contains(text(),"Submit Question")]/..');
    this.formCancelButton = page.locator('//form//span[contains(text(),"Cancel")]/..');
    
    //Quck console tab - question details//
    this.detailsSubject = page.locator('//h2[@class="oxygen"]');
    this.detailsDate = page.locator('(//h2[@class="oxygen"]/../..//p)[1]');
    this.detailsQuestionDetail = page.locator('(//h2[@class="oxygen"]/../..//p)[3]');
    this.detailsQuestionTitle = page.locator('(//h2[@class="oxygen"]/../..//p)[4]');
    this.detailsQuestionTitleSection = page.locator('(//h2[@class="oxygen"]/../..//p)[5]');
    this.detailsAttachments = page.locator('//h2[@class="oxygen"]/../..//a');
    this.detailsChip = page.locator('//h2[@class="oxygen"]/../..//span[@class="v-chip__content"]');
  }

  async loadPremiumAnswersPage() {
    await this.page.goto('/' + 'premium-answers', { vtimeout: 15000 });
    await expect(this.title).toContainText("Premium Answers", {timeout:15000});
  }

  async clickQuickConsultTab() {
    await this.quickConsultTab.click();
  }

  async selectQuickConsultFilter(filter) {
    var option = String(filter).replaceAll(" ", "");
    var filterButton = await this.page.locator(`//button[@value="${option}"]`);
    await filterButton.click({timeout:5000});
  }

  async formUploadAttachment(fileName) {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.formAttachmentsIcon.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("./tets_data/files/"+fileName);
  }

};

