import { Page } from 'playwright';

export class KeyPressesPage {
  constructor(private page: Page) {}

  async pressKey(key: string): Promise<void> {
    const input = this.page.locator('#target');
    await input.click();
    await this.page.keyboard.press(key);
  }

  async getResultText(): Promise<string> {
    return this.page.locator('#result').innerText();
  }
}
