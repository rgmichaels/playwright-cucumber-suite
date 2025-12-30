import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { EntryAdPage } from '../pages/EntryAdPage';

When('I click the Entry Ad link', async function () {
  const home = new HomePage(this.page);

  await Promise.all([
    this.page.waitForURL('**/entry_ad'),
    home.clickEntryAd()
  ]);
});

Then('I should see the entry ad modal with expected text', async function () {
  const entryAd = new EntryAdPage(this.page);

  await entryAd.waitForPage();
  await entryAd.waitForModal();

  const title = await entryAd.getModalTitle();
  const body = await entryAd.getModalBodyText();

  expect(title).toMatch(/This is a modal window/i);
  expect(body).toMatch(/commonly used to encourage a user to take an action/i);
});

Then('I close the entry ad modal', async function () {
  const entryAd = new EntryAdPage(this.page);
  await entryAd.closeModal();
});
