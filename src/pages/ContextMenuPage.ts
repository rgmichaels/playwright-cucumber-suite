import { Page, Dialog } from 'playwright';

export class ContextMenuPage {
  constructor(private page: Page) {}

  async triggerContextMenuAndGetAlertText(): Promise<string> {
    const hotSpot = this.page.locator('#hot-spot');
    await hotSpot.waitFor({ state: 'visible' });
    await hotSpot.scrollIntoViewIfNeeded();

    // Helps in headed runs; safe to ignore failures
    await this.page.bringToFront().catch(() => {});

    const timeoutMs = 10_000;

    const dialogTextPromise = new Promise<string>((resolve, reject) => {
      let done = false;

      const onDialog = async (dialog: Dialog) => {
        if (done) return;
        done = true;
        clearTimeout(timer);

        try {
          const msg = dialog.message();
          await dialog.accept();
          resolve(msg);
        } catch (e) {
          reject(e);
        }
      };

      const timer = setTimeout(() => {
        if (done) return;
        done = true;
        // Remove the handler so it can't fire later and surprise you
        this.page.off('dialog', onDialog);
        reject(new Error(`Dialog did not appear within ${timeoutMs}ms on ${this.page.url()}`));
      }, timeoutMs);

      this.page.once('dialog', onDialog);
    });

    await hotSpot.click({ button: 'right', force: true, noWaitAfter: true });

    return await dialogTextPromise;
  }
}
