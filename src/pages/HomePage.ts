
import { Page } from 'playwright';

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
  }

  async clickABTesting() {
    await this.page.locator('a[href="/abtest"]').click();
  }
}
