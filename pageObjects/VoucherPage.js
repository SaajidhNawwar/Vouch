
class VoucherPage {
    constructor(page) {
        this.page = page;
        this.btnYes = page.locator("(//button[contains(@class,'btn-custom-primary')])");
        this.btnGoToLinkedInLoginPage = page.locator("(//button[contains(@class,'btn-custom-primary')])[2]");
        this.btnGetStarted = page.locator("(//button[contains(@class,'btn-custom-primary')])[2]");
        this.txtCandidateFirstName = page.locator("#firstName");
        this.btnNext = page.locator("(//button[contains(@class,'rounded-full w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48 h-14 bg-primary text-white')])");
        this.txtLastName = page.locator("#lastName");
        this.openRelationshipDropdown = page.locator("//div[contains(@class,'css-19bb58m')]");
        this.selectRelationship = page.getByText("Ni har studerat tillsammans").nth(1);
        this.txtMotivation = page.locator("#motivation");
        this.selectShareLinkBtn = page.locator("(//div[contains(@class,'shrink md:flex-1')])[2]");
        this.btnSubmit = page.locator("(//button[contains(@class,'rounded-full')])[2]");
    }

    async loginToLinkedIn(username, password) {
        console.log('Logging in to LinkedIn with:', username, password); // Debugging log

        await this.btnYes.click();
        await this.btnGoToLinkedInLoginPage.click();
        const [linkedInPage] = await Promise.all([      //using Promise to wait till all asynchronous operations are over and capture it into an array
            this.page.context().waitForEvent('page')
        ]);

        await linkedInPage.waitForLoadState();
        await linkedInPage.fill('input#username', username);
        await linkedInPage.fill('input#password', password);
        await linkedInPage.click("//button[normalize-space()='Sign in']");
        await linkedInPage.waitForNavigation();
    }

    async recommendCandidate() {
        await this.btnGetStarted.click();
        await this.txtCandidateFirstName.fill("Micheal");
        await this.btnNext.click();
        await this.txtLastName.fill("Bispling");
        await this.btnNext.click();
        await this.openRelationshipDropdown.click();
        await this.selectRelationship.click();
        await this.btnNext.click();
        await this.txtMotivation.fill("Micheal has over 5 years of experience in the field of QA.");
        await this.btnNext.click();
        await this.selectShareLinkBtn.click();
        await this.btnSubmit.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
    }
}
module.exports = { VoucherPage };