import { Page } from 'playwright';

export class CheckboxesPage {
  constructor(private page: Page) {}

  async getCheckboxCount(): Promise<number> {
    return this.page.locator('input[type="checkbox"]').count();
  }
}
