
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { HomePage } from '../pages/HomePage';
import { ABTestingPage } from '../pages/ABTestingPage';
import { AddRemoveElementsPage } from '../pages/AddRemoveElementsPage';
import { BasicAuthPage } from '../pages/BasicAuthPage';
import { BrokenImagesPage } from '../pages/BrokenImagesPage';
import { CheckboxesPage } from '../pages/CheckBoxesPage';

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

When(/^I click the Add Remove Elements link$/, async function () {
  const home = new HomePage(this.page);
  await home.clickAddRemoveElements();
});

Then(/^I should see the Add Remove Elements page text$/, async function () {
  const page = new AddRemoveElementsPage(this.page);
  expect(await page.hasHeader()).toBeTruthy();
});

When(/^I add an element$/, async function () {
  const page = new AddRemoveElementsPage(this.page);
  await page.clickAddElement();
});

Then(/^I should see a Delete button$/, async function () {
  const page = new AddRemoveElementsPage(this.page);
  expect(await page.isDeleteButtonVisible()).toBeTruthy();
});

When(/^I delete the element$/, async function () {
  const page = new AddRemoveElementsPage(this.page);
  await page.clickDelete();
});

Then(/^I should not see a Delete button$/, async function () {
  const page = new AddRemoveElementsPage(this.page);
  expect(await page.isDeleteButtonVisible()).toBeFalsy();
});

Given(/^I navigate to the Basic Auth page with valid credentials$/, async function () {
  const authPage = new BasicAuthPage(this.browser);
  this.page = await authPage.openWithCredentials();
});

Then(/^I should see the Basic Auth success message$/, async function () {
  await expect(this.page.locator('p')).toHaveText(
    'Congratulations! You must have the proper credentials.'
  );
});

When(/^I click the Broken Images link$/, async function () {
  const home = new HomePage(this.page);
  await home.clickBrokenImages();
});

Then(/^I should detect broken images$/, async function () {
  const brokenImagesPage = new BrokenImagesPage(this.page);

  const { broken, ok } = await brokenImagesPage.findBrokenImages();

  // Helpful output for debugging / demo purposes
  console.log(`Images OK: ${ok.length}`);
  console.log(`Images broken: ${broken.length}`);
  if (broken.length) {
    console.log("Broken image URLs:");
    broken.forEach((u) => console.log(` - ${u}`));
  }

  // Since this page is designed to have broken images, assert at least 1
  expect(broken.length).toBeGreaterThan(0);
});

When(/^I click the Checkboxes link$/, async function () {
  const home = new HomePage(this.page);
  await home.clickCheckboxes();
});

Then(/^I should see 2 checkboxes on the page$/, async function () {
  const checkboxesPage = new CheckboxesPage(this.page);
  const count = await checkboxesPage.getCheckboxCount();
  expect(count).toBe(2);
});
