const {test} = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');
const dataset = require('../Utils/createJobTestData.json');


for(const data of dataset)
{
test('Vouch Test', async({page})=>
{
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username,data.password);

    const createJobPage = poManager.getCreateJobPage();
    await createJobPage.enterGeneralInformation(data.jobTitle,data.jobDescription);
    await createJobPage.enterCompensationAndBenefits(data.minSalary,data.maxSalary);
    
})
}