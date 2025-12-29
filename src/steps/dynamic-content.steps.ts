import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DynamicContentPage } from '../pages/DynamicContentPage';

When('I click the Dynamic Content link', async function () {
  const home = new HomePage(this.page);

  await Promise.all([
    this.page.waitForURL('**/dynamic_content'),
    home.clickDynamicContent()
  ]);
});

Then('I should see 3 dynamic content paragraphs with text', async function () {
  const dynamicContent = new DynamicContentPage(this.page);

  await dynamicContent.waitForPage();
  const blocks = await dynamicContent.getBlockTexts();

  // Page sometimes contains an extra wrapper block — ensure we have at least 3
  expect(blocks.length).toBeGreaterThanOrEqual(3);

  // Validate the first 3 meaningful dynamic paragraphs
  const paragraphs = blocks.slice(0, 3);

  for (const text of paragraphs) {
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    expect(wordCount).toBeGreaterThan(2);
  }
});
