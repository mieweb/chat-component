import { test, expect } from '@playwright/test';

test.describe('Chat Component Demo', () => {
  test('should load demo menu page', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle(/Chat Component - Demo Menu/);
    await expect(page.locator('h1')).toContainText('Chat Component Demo');
  });

  test('should have links to all demo versions', async ({ page }) => {
    await page.goto('/');
    
    // Check for demo links
    await expect(page.locator('a[href="demo-tailwind.html"]')).toBeVisible();
    await expect(page.locator('a[href="demo-bootstrap.html"]')).toBeVisible();
  });

  test('should navigate to Tailwind demo', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="demo-tailwind.html"]');
    
    // Wait for navigation
    await page.waitForURL('**/demo-tailwind.html');
    await expect(page).toHaveTitle(/Chat Component - Tailwind Demo/);
  });

  test('should navigate to Bootstrap demo', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="demo-bootstrap.html"]');
    
    // Wait for navigation
    await page.waitForURL('**/demo-bootstrap.html');
    await expect(page).toHaveTitle(/Chat Component - Bootstrap Demo/);
  });
});
