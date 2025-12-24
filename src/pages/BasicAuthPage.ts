import { Browser } from 'playwright';

export class BasicAuthPage {
  constructor(private browser: Browser) {}

  async openWithCredentials() {
    const context = await this.browser.newContext({
      httpCredentials: {
        username: 'admin',
        password: 'admin'
      }
    });

    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth');

    return page;
  }
}
