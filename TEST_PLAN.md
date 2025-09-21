1. Objective

Validate that the Hacker News “newest” page displays articles correctly, supports pagination, and shows articles in newest-to-oldest order.

2. Scope

✅ Page load and navigation

✅ Article display (title, link, timestamp)

✅ Pagination via “More” button

✅ Sorting order validation

❌ Out of scope: user login, comments, profiles, mobile app

3. Environment

Browser: Chrome, firefox, webkit (latest), 

Device: Desktop / Laptop

Tools: Playwright for automation, browser dev tools for manual checks

4. Test Scenarios

Verify page loads and title contains “Hacker News”

Verify URL is correct (/newest)

Verify at least 30 articles display on first load

Verify each article has a title, link, and timestamp

Verify clicking “More” loads next batch of articles

Verify we can collect 100 articles across pages

Verify articles are sorted from newest → oldest

5. Test Data

URL: https://news.ycombinator.com/newest

Expected: ≥30 articles per page

Timestamp format: “X minutes/hours/days ago”

6. Execution

Run automated Playwright script to fetch 100 articles and validate sorting.

Perform spot checks manually (clicking “More,” validating titles/links).

7. Pass/Fail Criteria

Pass if: 100 articles collected, all with titles/links/timestamps, and sorted newest → oldest.

Fail if: Article count <100, missing data, or sorting is incorrect.

8. Risks

Time precision: articles posted within the same minute may appear swapped.

Network issues may affect pagination.

9. Results Summary

✅ Page loads fast, articles display correctly

✅ Pagination works, 100 articles collected

⚠️ Minor: sorting isn’t always perfect when multiple articles posted at same time