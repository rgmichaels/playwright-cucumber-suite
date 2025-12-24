import { Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';

Before(async function () {
  const headless = process.env.HEADLESS !== 'false'; // default true
  const slowMo = process.env.SLOWMO ? Number(process.env.SLOWMO) : 0;

  this.browser = await chromium.launch({ headless, slowMo });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  try { if (this.page) await this.page.close(); } catch {}
  try { if (this.context) await this.context.close(); } catch {}
  try { if (this.browser) await this.browser.close(); } catch {}
});

