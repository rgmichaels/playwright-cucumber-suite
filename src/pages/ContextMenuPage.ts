import { Page, Dialog } from 'playwright';

export class ContextMenuPage {
  constructor(private page: Page) {}

  async triggerContextMenuAndGetAlertText(): Promise<string> {
    const hotSpot = this.page.locator('#hot-spot');
    await hotSpot.waitFor({ state: 'visible' });
    await hotSpot.scrollIntoViewIfNeeded();

    // Make sure the page is focused (helps headed runs)
    await this.page.bringToFront().catch(() => {});

    // Create a promise that resolves when the dialog appears
    const dialogTextPromise = new Promise<string>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Dialog did not appear in time')), 10_000);

      this.page.once('dialog', async (dialog: Dialog) => {
        try {
          const msg = dialog.message();
          await dialog.accept();
          clearTimeout(timer);
          resolve(msg);
        } catch (e) {
          clearTimeout(timer);
          reject(e);
        }
      });
    });

    // Trigger the context menu (don’t auto-wait for “after” events)
    await hotSpot.click({ button: 'right', force: true, noWaitAfter: true });

    // Wait for the dialog text (and accept already happened)
    return await dialogTextPromise;
  }
}
