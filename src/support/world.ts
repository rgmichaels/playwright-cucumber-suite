
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { setWorldConstructor, World } from '@cucumber/cucumber';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  async init() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async cleanup() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
