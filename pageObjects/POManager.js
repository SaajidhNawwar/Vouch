const {LoginPage} = require('./LoginPage');
const {CreateJobPage} = require('./CreateJobPage');
const {ViewAllJobsPage} = require('./ViewAllJobsPage')

class POManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.createJobPage = new CreateJobPage(this.page);
        this.viewAllJobsPage = new ViewAllJobsPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }
 
    getCreateJobPage()
    {
        return this.createJobPage;
    }

    getViewAllJobsPage()
    {
        return this.viewAllJobsPage;
    }
}

module.exports = {POManager};