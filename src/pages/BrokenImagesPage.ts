import { Page } from 'playwright';

export class BrokenImagesPage {
  constructor(private page: Page) {}

  async getImageSrcs(): Promise<string[]> {
    const srcs = await this.page.locator('img').evaluateAll((imgs) =>
      imgs
        .map((img) => (img as HTMLImageElement).src)
        .filter((src) => !!src)
    );
    return srcs;
  }

  async findBrokenImages(): Promise<{ broken: string[]; ok: string[] }> {
    const srcs = await this.getImageSrcs();

    const results = await Promise.all(
      srcs.map(async (url) => {
        try {
          const resp = await this.page.request.get(url);
          const status = resp.status();
          // treat non-2xx/3xx as broken
          const ok = status >= 200 && status < 400;
          return { url, ok, status };
        } catch {
          return { url, ok: false, status: -1 };
        }
      })
    );

    const broken = results.filter((r) => !r.ok).map((r) => r.url);
    const ok = results.filter((r) => r.ok).map((r) => r.url);

    return { broken, ok };
  }
}
