import { test, expect } from "@playwright/test";
import { YCombinatorPage } from "./pageObject/yCombinatorpage/yCombinator.page";

test("Validate Hacker News articles are sorted newest to oldest", async ({ page }) => {
  const yCombinator = new YCombinatorPage(page);
  const result = await yCombinator.sortAndValidate();
  expect(result).toBe(true);
});
