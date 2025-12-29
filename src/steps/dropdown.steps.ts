import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DropdownPage } from '../pages/DropdownPage';

When('I click the Dropdown link', async function () {
  const home = new HomePage(this.page);

  await Promise.all([
    this.page.waitForURL('**/dropdown'),
    home.clickDropdown()
  ]);
});

When('I select option 2 from the dropdown', async function () {
  const dropdown = new DropdownPage(this.page);
  await dropdown.selectOption('2');
});

When('I select option 1 from the dropdown', async function () {
  const dropdown = new DropdownPage(this.page);
  await dropdown.selectOption('1');
});

Then('option 1 should be selected', async function () {
  const dropdown = new DropdownPage(this.page);
  const selected = await dropdown.getSelectedValue();

  console.log('🔽 Selected dropdown value:', selected);
  expect(selected).toBe('1');
});
