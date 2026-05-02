import { test, expect } from "@playwright/test";

test.describe("Zoom Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4321/test-zoom");
    await page.waitForLoadState("networkidle");
  });

  test("Scatter chart should render", async ({ page }) => {
    const scatterChart = page.locator("svg").first();
    await expect(scatterChart).toBeVisible();
  });

  test("Scatter chart zoom - drag to select", async ({ page }) => {
    // Get the chart container
    const chartContainer = page.locator("svg").first();

    // Get the bounding box
    const box = await chartContainer.boundingBox();
    if (!box) throw new Error("Chart not found");

    // Calculate drag positions (roughly in the middle of the chart)
    const startX = box.x + box.width * 0.3;
    const startY = box.y + box.height * 0.3;
    const endX = box.x + box.width * 0.7;
    const endY = box.y + box.height * 0.7;

    // Perform drag
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY, { steps: 10 });

    // Check if reference area appears
    const referenceArea = page.locator('rect[stroke="red"]');
    await expect(referenceArea).toBeVisible();

    await page.mouse.up();
  });

  test("Scatter chart zoom - reset button", async ({ page }) => {
    // First, make a selection
    const chartContainer = page.locator("svg").first();
    const box = await chartContainer.boundingBox();
    if (!box) throw new Error("Chart not found");

    const startX = box.x + box.width * 0.3;
    const startY = box.y + box.height * 0.3;
    const endX = box.x + box.width * 0.7;
    const endY = box.y + box.height * 0.7;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY, { steps: 10 });
    await page.mouse.up();

    // Click reset button
    const resetButton = page.locator("button").first();
    await resetButton.click();

    // Check if reference area is gone
    const referenceArea = page.locator('rect[stroke="red"]');
    await expect(referenceArea).not.toBeVisible();
  });

  test("Line chart should render", async ({ page }) => {
    const lineCharts = page.locator("svg");
    const count = await lineCharts.count();
    expect(count).toBeGreaterThan(1); // At least scatter and line chart
  });
});
