const {test} = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');

test('Vouch Test', async({page})=>
{
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin("saajidh.nawwar+admin@ascentic.se","Saaj@123");

    const createJobPage = poManager.getCreateJobPage();
    await createJobPage.enterGeneralInformation("Software Engineer","Looking for SEs");
    
})