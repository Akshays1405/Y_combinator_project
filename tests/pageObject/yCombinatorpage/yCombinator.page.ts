import { Page } from "@playwright/test";
import { Helper } from "../utils/helper";

export class YCombinatorPage {
  constructor(private page: Page, private helper = new Helper(page)) {}

  async goto() {
    await this.page.goto("https://news.ycombinator.com/newest", { waitUntil: "networkidle" });
  }

  async extractArticlesOnPage() {
    return this.page.$$eval("tr.athing", rows =>
      rows.map(row => {
        const title = row.querySelector<HTMLAnchorElement>(".titleline a");
        const time = row.nextElementSibling?.querySelector<HTMLAnchorElement>(".age a");
        return title && time
          ? { title: title.textContent?.trim(), link: title.href, timeText: time.textContent?.trim() }
          : null;
      }).filter(Boolean)
    );
  }

  async extract100Articles() {
    const articles: any[] = [];

    while (articles.length < 100) {
      const pageArticles = await this.extractArticlesOnPage();
      articles.push(...pageArticles);

      if (articles.length >= 100) break;

      const more = this.page.locator('a[href*="newest"]:has-text("More")');
      if (!(await more.isVisible())) break;

      await more.click();
      await this.page.waitForLoadState("networkidle");
    }

    // add rank
    return articles.slice(0, 100).map((a, i) => ({ rank: i + 1, ...a }));
  }

  async sortAndValidate() {
    await this.goto();
    const articles = await this.extract100Articles();

    if (articles.length !== 100) return false;
    return this.helper.validateSorting(articles);
  }
}
