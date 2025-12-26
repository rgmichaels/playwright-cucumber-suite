import { Before, After, Status } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

Before(async function () {
  const headless = process.env.HEADLESS !== 'false'; // default headless in CI
  const slowMo = process.env.SLOWMO ? Number(process.env.SLOWMO) : 0;

  this.browser = await chromium.launch({ headless, slowMo });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (scenario) {
  // Screenshot on failure
  if (scenario.result?.status === Status.FAILED && this.page) {
    const dir = path.join(process.cwd(), 'reports', 'screenshots');
    fs.mkdirSync(dir, { recursive: true });

    const safeName = scenario.pickle.name
      .replace(/[^a-z0-9]+/gi, '_')
      .replace(/^_+|_+$/g, '')
      .toLowerCase();

    const fileName = `${safeName}_${Date.now()}.png`;
    const filePath = path.join(dir, fileName);

    const buffer = await this.page.screenshot({ path: filePath, fullPage: true });

    // Attach to Cucumber report
    await this.attach(buffer, 'image/png');
  }

  // Always close in safe order
  try { if (this.page) await this.page.close(); } catch {}
  try { if (this.context) await this.context.close(); } catch {}
  try { if (this.browser) await this.browser.close(); } catch {}
});
