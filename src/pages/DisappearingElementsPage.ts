import { Page } from 'playwright';

export class DisappearingElementsPage {
  constructor(private page: Page) {}

  private menuLinks() {
    return this.page.locator('ul li a');
  }

  async getMenuTexts(): Promise<string[]> {
    const links = this.menuLinks();
    const count = await links.count();
    const texts: string[] = [];

    for (let i = 0; i < count; i++) {
      texts.push((await links.nth(i).innerText()).trim());
    }

    return texts;
  }
}
