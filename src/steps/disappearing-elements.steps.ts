import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DisappearingElementsPage } from '../pages/DisappearingElementsPage';

When('I click the Disappearing Elements link', async function () {
  const home = new HomePage(this.page);

  await Promise.all([
    this.page.waitForURL('**/disappearing_elements'),
    home.clickDisappearingElements()
  ]);
});

Then('I should see the Disappearing Elements menu links', async function () {
  const disappearing = new DisappearingElementsPage(this.page);
  const texts = await disappearing.getMenuTexts();

  // These should always be present
  expect(texts).toEqual(expect.arrayContaining(['Home', 'About', 'Contact Us', 'Portfolio']));

  // "Gallery" is intentionally flaky on this page, so we don't require it in smoke.
});
