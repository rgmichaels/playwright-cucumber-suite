import { Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

setDefaultTimeout(30_000);

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race<T>([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    )
  ]);
}

Before(async function () {
  const headless = process.env.HEADLESS !== 'false'; // default headless in CI
  const slowMo = process.env.SLOWMO ? Number(process.env.SLOWMO) : 0;

  this.browser = await chromium.launch({ headless, slowMo });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (scenario) {
  // Screenshot on failure + attach to report
  if (scenario.result?.status === Status.FAILED && this.page) {
    const dir = path.join(process.cwd(), 'reports', 'screenshots');
    fs.mkdirSync(dir, { recursive: true });

    const safeName = scenario.pickle.name
      .replace(/[^a-z0-9]+/gi, '_')
      .replace(/^_+|_+$/g, '')
      .toLowerCase();

    const fileName = `${safeName}_${Date.now()}.png`;
    const filePath = path.join(dir, fileName);

    try {
      // Playwright returns Buffer for screenshot()
      const buffer: Buffer = await withTimeout(
        this.page.screenshot({ path: filePath, fullPage: true }),
        5_000
      );
      await this.attach(buffer, 'image/png');
    } catch {
      // ignore screenshot failures (page crashed, already closed, etc.)
    }
  }

  // Always close in safe order: page -> context -> browser
  try {
    if (this.page) await withTimeout(this.page.close({ runBeforeUnload: true }), 5_000);
  } catch {}

  try {
    if (this.context) await withTimeout(this.context.close(), 5_000);
  } catch {}

  try {
    if (this.browser) await withTimeout(this.browser.close(), 5_000);
  } catch {}
});
