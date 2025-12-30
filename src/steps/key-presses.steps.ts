import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { KeyPressesPage } from '../pages/KeyPressesPage';

When('I click the Key Presses link', async function () {
  const home = new HomePage(this.page);

  await Promise.all([
    this.page.waitForURL('**/key_presses'),
    home.clickKeyPresses()
  ]);
});

When('I press the {string} key', async function (key: string) {
  const keyPresses = new KeyPressesPage(this.page);
  await keyPresses.pressKey(key);
});

Then(
  'I should see the key press result {string}',
  async function (expectedText: string) {
    const keyPresses = new KeyPressesPage(this.page);
    const result = await keyPresses.getResultText();

    expect(result).toBe(expectedText);
  }
);
