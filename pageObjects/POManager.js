const {LoginPage} = require('./LoginPage');
const {CreateJobPage} = require('./CreateJobPage');

class POManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.createJobPage = new CreateJobPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getCreateJobPage()
    {
        return this.createJobPage;
    }
}

module.exports = {POManager};