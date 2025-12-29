import { Page } from 'playwright';

export class DropdownPage {
  constructor(private page: Page) {}

  private dropdown = this.page.locator('#dropdown');

  async selectOption(value: string) {
    await this.dropdown.waitFor({ state: 'visible' });
    await this.dropdown.selectOption(value);
  }

  async getSelectedValue(): Promise<string> {
    return await this.dropdown.inputValue();
  }
}
