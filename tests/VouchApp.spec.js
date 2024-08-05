const {test,expect} = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');
const dataset = require('../Utils/createJobTestData.json');


for(const data of dataset)
{
test('Vouch Test', async({page})=>
{
    const poManager = new POManager(page);

    //Login
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username,data.password);

    //Create Job
    const createJobPage = poManager.getCreateJobPage();
    await createJobPage.enterGeneralInformation(data.jobTitle,data.jobDescription);
    await createJobPage.enterCompensationAndBenefits(data.minSalary,data.maxSalary);
    await createJobPage.selectReferralBonus();
    await createJobPage.reviewAndPublish();

    //Verify Job
    const viewAllJobsPage = poManager.getViewAllJobsPage();
    const createdJobTitle = await viewAllJobsPage.getFirstJobTitle();
    console.log('Created Job Title:', createdJobTitle);
    expect(data.jobTitle.includes(createdJobTitle)).toBeTruthy();

})
}