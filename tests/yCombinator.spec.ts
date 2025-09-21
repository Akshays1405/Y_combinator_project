import { test, expect } from "@playwright/test";
import { YCombinatorPage } from "./pageObject/yCombinatorpage/yCombinator.page";

test("Validate Hacker News articles are sorted newest to oldest", async ({ page }) => {
  const yCombinator = new YCombinatorPage(page);
  const result = await yCombinator.sortAndValidate();
  expect(result).toBe(true);
   //! Here the test fails because the articles are not sorted from newest to oldest, because each time i run the test, some articles are sorted differently in the order of new to old which is displayed in the time stamp.
});
