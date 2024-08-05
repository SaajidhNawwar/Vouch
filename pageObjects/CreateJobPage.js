const { expect } = require('@playwright/test');
const dataset = require('../Utils/createJobTestData.json');

class CreateJobPage {
    constructor(page) 
    {
        this.page = page;
        this.viewAllJobsBtn = page.locator("//span[text()='Jobs']");
        this.createJobBtn = page.locator("//button[text()='Create a job']");
        this.jobAdTitle = page.locator("#title");
        this.jobAdDescription = page.locator("div[role='textbox']")

        this.seniorityDropdown = page.getByPlaceholder("Select seniority");
        this.selectSeniority = page.locator("//label[text()='Senior']");
        this.closeSeniorityDropdown = page.locator("//p[normalize-space()='Seniority']");

        this.industryDropdown = page.getByPlaceholder("Search or add a new industry");
        this.selectITIndustry = page.locator("input[id='9']");
        this.closeIndustryDropdown = page.locator("//p[normalize-space()='Industry']");

        this.remoteStatusDropdown = page.locator("//div[contains(@class,'grow pl-2.5')]");
        this.selectHybridRemote = page.locator("//li[text()='Hybrid remote']");
        this.closeRemoteStatusDropdown = page.locator("//div[text()='Remote status']");

        this.locationsDropdown = page.locator("(//div[contains(@class,'react-dropdown-select-content react-dropdown-select-type-multi')])[3]");
        this.selectColombo = page.locator("//label[text()='Colombo']");
        this.closeLocationDropdown = page.locator("//div[contains(text(),'Locations')]");

        this.goToCompensationAndBenefits = page.locator("//p[contains(text(),'Compensation')]");
        this.enableCompensation = page.locator("input[name='compensationCheck']"); //capture by name 
        this.clickCurrencyDropdown = page.locator("//p[normalize-space()='Select currency']");
        this.selectSEK = page.locator("//li[normalize-space()='SEK']");
        this.enterMinSalary = page.locator("#minSalary");
        this.enterMaxSalary = page.locator("#maxSalary");

        this.enableCompanyBenefits = page.locator("input[name='companyBenefitsCheck']");
        this.selectPaidVacation = page.locator("//label[contains(text(),'Paid vacation')]");
        this.selectHRCourses = page.locator("//label[contains(text(),'HR Courses')]")

        this.goToReferralBonus = page.getByText('Referral bonus');
        this.openDropdown = page.locator("//div[contains(@class,'grow pl-2.5')]");
        this.chooseReferralAmount = page.getByText('20,000 SEK');

        this.reviewPage = page.getByText('Review');
        this.BtnFinish = page.getByRole('button', { name: 'Finish' });
        this.viewAllJobs = page.locator("//span[text()='Jobs']");
        this.jobTitles = page.locator("(//p[@class='leading-6 break-words text-primary-600 text-lg font-bold md:body-large-semibold'])").first();
    }

    async enterGeneralInformation(jobAd, jobDescription) {
        await this.viewAllJobsBtn.click();
        //Assertion to verify user is in jobs overview page. Verify with URL
        await expect(this.page).toHaveURL('https://test.recruit.vouch.global/jobs/overview');

        await this.createJobBtn.click();
        await this.page.waitForLoadState('networkidle');
        await this.jobAdTitle.fill(jobAd);
        await this.jobAdDescription.fill(jobDescription);

        await this.seniorityDropdown.click();
        await this.seniorityDropdown.pressSequentially("Senio");
        await this.selectSeniority.click();
        await this.closeSeniorityDropdown.click();

        await this.industryDropdown.click();
        await this.selectITIndustry.click();
        await this.closeIndustryDropdown.click();

        await this.remoteStatusDropdown.click();
        await this.selectHybridRemote.click();
        await this.closeIndustryDropdown.click();

        await this.locationsDropdown.click();
        await this.locationsDropdown.pressSequentially("Col");
        await this.selectColombo.click();
        await this.closeLocationDropdown.click();

    }

    async enterCompensationAndBenefits(minSalary, maxSalary) {
        await this.goToCompensationAndBenefits.click();
        await this.enableCompensation.check();
        await this.clickCurrencyDropdown.click();
        await this.selectSEK.click();
        await this.enterMinSalary.fill(minSalary);
        await this.enterMaxSalary.fill(maxSalary);
        await this.enableCompanyBenefits.check();
        await this.selectPaidVacation.check();
        await this.selectHRCourses.check();
    }

    async selectReferralBonus() {
        await this.goToReferralBonus.click();
        await this.openDropdown.click();
        await this.chooseReferralAmount.click();
        await this.page.waitForTimeout(2000);
    }

    async reviewAndPublish() {
        await this.reviewPage.click();
        await this.BtnFinish.click();
        await expect(this.page.locator("//p[text()='Job ad created!']")).toBeVisible();
    }

}
module.exports = { CreateJobPage };