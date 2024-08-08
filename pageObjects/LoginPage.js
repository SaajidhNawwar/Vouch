const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator("#email");
        this.password = page.locator("#password")
        this.signIn = page.locator("#next")
        this.expectedText = "Let’s create a job";
    }

    async goTo() {
        await this.page.goto("https://test.recruit.vouch.global");
    }

    async validLogin(username, password) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signIn.click();
        await this.page.waitForLoadState('networkidle');
        //Assertion to check if expected and actual text are the same
        try {
            const actualText = await this.page.locator("//div[@class='flex items-center justify-center gap-2']").textContent();
            if (actualText === this.expectedText) {
                console.log('Expected and actual text are same');
            }
            else {
                console.log('Expected and actual text are not the same');
            }
        } catch (error) {
            console.error('Error during assertion:', error);
        }
    }
}
module.exports = { LoginPage };