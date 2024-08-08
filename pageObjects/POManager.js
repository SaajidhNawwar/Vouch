const { LoginPage } = require('./LoginPage');
const { CreateJobPage } = require('./CreateJobPage');
const { ViewAllJobsPage } = require('./ViewAllJobsPage')
const { VoucherPage } = require('./VoucherPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.createJobPage = new CreateJobPage(this.page);
        this.viewAllJobsPage = new ViewAllJobsPage(this.page);
        this.voucherPage = new VoucherPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getCreateJobPage() {
        return this.createJobPage;
    }

    getViewAllJobsPage() {
        return this.viewAllJobsPage;
    }

    getVoucherPage() {
        return this.voucherPage;
    }
}

module.exports = { POManager };