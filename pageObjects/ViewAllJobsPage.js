class ViewAllJobsPage{
    
    constructor(page)
    {
        this.page = page;
        this.viewJobs = page.locator("//span[text()='Jobs']");
        this.jobTitleLocator = page.locator("(//p[@class='leading-6 break-words text-primary-600 text-lg font-bold md:body-large-semibold'])");
    }

    async getFirstJobTitle() {
        await this.viewJobs.click();
        await this.page.waitForSelector("(//p[@class='leading-6 break-words text-primary-600 text-lg font-bold md:body-large-semibold'])");
        return await this.jobTitleLocator.first().textContent();
    }
     
}
module.exports = {ViewAllJobsPage};