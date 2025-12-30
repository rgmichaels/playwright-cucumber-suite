import { Page, Locator } from 'playwright';

export class EntryAdPage {
  private modal: Locator;
  private modalTitle: Locator;
  private modalBody: Locator;
  private closeButton: Locator;

  constructor(private page: Page) {
    this.modal = page.locator('.modal');
    this.modalTitle = page.locator('.modal-title');
    this.modalBody = page.locator('.modal-body');
    this.closeButton = page.locator('.modal-footer p');
  }

  async waitForPage() {
    await this.page.waitForURL('**/entry_ad');
  }

  async waitForModal() {
    await this.modal.waitFor({ state: 'visible' });
    await this.modalTitle.waitFor({ state: 'visible' });
    await this.modalBody.waitFor({ state: 'visible' });
  }

  async getModalTitle(): Promise<string> {
    const text = await this.modalTitle.textContent();
    return text?.trim() || '';
  }

  async getModalBodyText(): Promise<string> {
    const text = await this.modalBody.textContent();
    return text?.trim() || '';
  }

  async closeModal() {
    await this.closeButton.click();
    await this.modal.waitFor({ state: 'hidden' });
  }
}
