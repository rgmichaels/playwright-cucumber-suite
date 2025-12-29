
import { Page } from 'playwright';

export class HomePage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/');
  }

  async clickABTesting() {
    await this.page.locator('a[href="/abtest"]').click();
  }

  async clickAddRemoveElements() {
  await this.page.locator('a[href="/add_remove_elements/"]').click();
}

async clickBrokenImages() {
  await this.page.locator('a[href="/broken_images"]').click();
}

async clickCheckboxes() {
  await this.page.locator('a[href="/checkboxes"]').click();
}

async clickDisappearingElements() {
  await this.page.locator('a[href="/disappearing_elements"]').click();
}

async clickDragAndDrop() {
  await this.page.locator('a[href="/drag_and_drop"]').click();
}


}
