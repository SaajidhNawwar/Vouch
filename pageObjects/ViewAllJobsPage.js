class ViewAllJobsPage{
    
    constructor(page)
    {
        this.page = page;
        this.viewJobs = page.locator("//span[text()='Jobs']");
        this.jobTitleLocator = page.locator("(//p[@class='leading-6 break-words text-primary-600 text-lg font-bold md:body-large-semibold'])");
        this.jobTitle = page.locator("//p[normalize-space()='Senior QA Engineer']");
        this.shareBtn = page.locator("#share-73e97ce6-1afd-408e-8d12-f8fb1df62360");
        this.copyLinkIcon = page.locator('#menuDropdown').getByRole('button');
        this.copyLink = page.getByRole('main');
    }

    async getFirstJobTitle() {
        await this.viewJobs.click();
        await this.page.waitForSelector("(//p[@class='leading-6 break-words text-primary-600 text-lg font-bold md:body-large-semibold'])");
        return await this.jobTitleLocator.first().textContent();
    }

    async generateJobAdLink() {
        await this.viewJobs.click(); 
        await this.jobTitle.hover();
        await this.shareBtn.click();
        await this.page.waitForLoadState('networkidle');
        await this.copyLinkIcon.click();
        await this.copyLink.click();
        await this.page.waitForTimeout(4000);
    }
     
}
module.exports = {ViewAllJobsPage};