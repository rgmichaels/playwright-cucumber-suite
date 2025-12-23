import { Page } from 'playwright';

export class AddRemoveElementsPage {
  constructor(private page: Page) {}

  async hasHeader(): Promise<boolean> {
    return this.page.locator('h3', { hasText: 'Add/Remove Elements' }).isVisible();
  }

  async clickAddElement() {
    await this.page.locator('button:has-text("Add Element")').click();
  }

  async clickDelete() {
    await this.page.locator('button:has-text("Delete")').click();
  }

  async isDeleteButtonVisible(): Promise<boolean> {
    return this.page.locator('button:has-text("Delete")').isVisible();
  }
}
