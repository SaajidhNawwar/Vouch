const {test,expect} = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');
const dataset = require('../Utils/createJobTestData.json');


for (const data of dataset) {
    createJobTest(data);
    //shareJobAd(data);
}

function createJobTest(data) {
    test.describe(`Create new job for ${data.jobTitle}`, () => {
        let poManager;

        test.beforeEach(async ({ page }) => {
            poManager = new POManager(page);
            const loginPage = poManager.getLoginPage();
            await loginPage.goTo();
            await loginPage.validLogin(data.username, data.password);
        });

        test('should create a new job', async ({ page }) => {
            const createJobPage = poManager.getCreateJobPage();
            await createJobPage.enterGeneralInformation(data.jobTitle, data.jobDescription);
            await createJobPage.enterCompensationAndBenefits(data.minSalary, data.maxSalary);
            await createJobPage.selectReferralBonus();
            await createJobPage.reviewAndPublish();
            await createJobPage.notifyEmployees();

            // Verify Job
            const viewAllJobsPage = poManager.getViewAllJobsPage();
            const createdJobTitle = await viewAllJobsPage.getFirstJobTitle();
            console.log('Created Job Title:', createdJobTitle);
            expect(data.jobTitle.includes(createdJobTitle)).toBeTruthy();
        });
    });
}

function shareJobAd(data) {
    test.describe('Generate job ad link', ()=> {
        let poManager;
        let jobAdLink;

        test.beforeEach(async ({ page }) => {
            poManager = new POManager(page);
            const loginPage = poManager.getLoginPage();
            await loginPage.goTo();
            await loginPage.validLogin(data.username, data.password);
        });

        test('Should copy the job link and open in a new context', async({page,browser})=> {
            const viewAllJobsPage = poManager.getViewAllJobsPage();
            jobAdLink = await viewAllJobsPage.generateJobAdLink();
            console.log("Job Link: ",jobAdLink);

            //Verify jobLink is present
            if(!jobAdLink) {
                throw new Error('JobLink is not captured');
            }
 
            //Open a new window and navigate to copied job link
            const context = await browser.newContext();
            const newPage = await context.newPage();
            await newPage.goto(jobAdLink);
            await newPage.waitForLoadState('networkidle');
            await newPage.waitForTimeout(2500);
        })
    }) 
}



