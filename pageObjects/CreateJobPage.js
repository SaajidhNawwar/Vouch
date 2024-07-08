class CreateJobPage
{
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
    }

    async enterGeneralInformation(jobAd,jobDescription)
    {
        await this.viewAllJobsBtn.click();
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
        await this.page.pause();
    }

}
module.exports = {CreateJobPage};