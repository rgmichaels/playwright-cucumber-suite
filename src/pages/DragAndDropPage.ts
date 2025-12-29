import { Page } from 'playwright';

export class DragAndDropPage {
  constructor(private page: Page) {}

  private columnA() {
    return this.page.locator('#column-a');
  }

  private columnB() {
    return this.page.locator('#column-b');
  }

  async getColumnHeaders(): Promise<{ a: string; b: string }> {
    const a = (await this.columnA().locator('header').innerText()).trim();
    const b = (await this.columnB().locator('header').innerText()).trim();
    return { a, b };
  }

  // Robust HTML5 drag-and-drop using DataTransfer + drag events
  async dragAontoB(): Promise<void> {
    await this.page.waitForURL('**/drag_and_drop');

    // Ensure both columns exist
    await this.columnA().waitFor({ state: 'visible' });
    await this.columnB().waitFor({ state: 'visible' });

    await this.page.evaluate(() => {
      const source = document.querySelector('#column-a') as HTMLElement | null;
      const target = document.querySelector('#column-b') as HTMLElement | null;
      if (!source || !target) throw new Error('Drag source/target not found');

      const dataTransfer = new DataTransfer();

      const fire = (el: HTMLElement, type: string) => {
        const event = new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer });
        el.dispatchEvent(event);
      };

      // HTML5 drag sequence
      fire(source, 'dragstart');
      fire(target, 'dragenter');
      fire(target, 'dragover');
      fire(target, 'drop');
      fire(source, 'dragend');
    });
  }
}
