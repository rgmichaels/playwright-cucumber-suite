
import { Page } from 'playwright';

export class ABTestingPage {
  constructor(private page: Page) {}

  async hasControlText() {
    return this.page.locator('h3:has-text("A/B Test Control")').isVisible();
  }

  async hasElementalSeleniumLink() {
    return this.page.locator('a', { hasText: 'Elemental Selenium' }).isVisible();
  }
}
