import { Page, Locator } from 'playwright';

export class DynamicContentPage {
  private blocks: Locator;

  constructor(private page: Page) {
    // Text content blocks on the page (may include 1 extra depending on layout)
    this.blocks = page.locator('#content .large-10.columns');
  }

  async waitForPage() {
    await this.page.waitForURL('**/dynamic_content');
    await this.blocks.first().waitFor({ state: 'visible' });
  }

  async getBlockTexts(): Promise<string[]> {
    const texts = await this.blocks.allTextContents();
    return texts.map(t => t.trim()).filter(Boolean);
  }
}
