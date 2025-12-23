
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { HomePage } from '../pages/HomePage';
import { ABTestingPage } from '../pages/ABTestingPage';

Given('I am on the home page', async function (this: CustomWorld) {
  const home = new HomePage(this.page);
  await home.navigate();
});

When(/^I click the A\/B Testing link$/, async function (this: CustomWorld) {
  const home = new HomePage(this.page);
  await home.clickABTesting();
});

Then(/^I should see the A\/B Test Control text$/, async function (this: CustomWorld) {
  // NOTE: that page can be Control or Variation 1; this keeps it stable.
  await expect(this.page.locator('h3')).toHaveText(/A\/B Test (Control|Variation 1)/);
});


Then('I should see the Elemental Selenium link', async function (this: CustomWorld) {
  const abPage = new ABTestingPage(this.page);
  expect(await abPage.hasElementalSeleniumLink()).toBeTruthy();
});
