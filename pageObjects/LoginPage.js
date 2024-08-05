const {expect} = require('@playwright/test');


class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.userName = page.locator("#email");
        this.password = page.locator("#password")
        this.signIn = page.locator("#next")
    }

    async goTo()
    {
        await this.page.goto("https://test.recruit.vouch.global");
    }

    async validLogin(username,password)
    {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signIn.click();
        await this.page.waitForLoadState('networkidle');
        //await expect(this.page.locator("//p[contains(@class,'mt-2 text-white')]")).toHaveText('How Vouch works in 3 easy steps');
    }
}
module.exports = {LoginPage};