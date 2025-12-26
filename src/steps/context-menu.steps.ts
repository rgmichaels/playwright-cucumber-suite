import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ContextMenuPage } from '../pages/ContextMenuPage';

When('I click the Context Menu link', async function () {
  await Promise.all([
    this.page.waitForURL('**/context_menu'),
    this.page.click('a[href="/context_menu"]')
  ]);
});

When('I right click on the context menu box', async function () {
  const contextMenuPage = new ContextMenuPage(this.page);
  this.alertText = await contextMenuPage.triggerContextMenuAndGetAlertText();
});

Then('I should see a context menu alert', async function () {
  expect(this.alertText).toContain('You selected a context menu');
});
