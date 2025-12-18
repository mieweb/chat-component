import { test, expect } from '@playwright/test';

test.describe('Link Builder Configuration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    await page.waitForSelector('[data-testid="chat-component"], .chat-component, [class*="chat"]', { timeout: 10000 });
  });

  test('should use default link format when linkBuilder is not provided', async ({ page }) => {
    // Look for a reference link in the demo
    const refLink = page.locator('a[href^="#"]').first();
    
    if (await refLink.count() > 0) {
      const href = await refLink.getAttribute('href');
      // Default format should be #refType/refId
      expect(href).toMatch(/^#\w+\/\d+$/);
    }
  });

  test('should use custom link format when linkBuilder is enabled', async ({ page }) => {
    // Enable custom links in demo
    const customLinksButton = page.locator('button:has-text("Enable Custom Links")');
    await customLinksButton.click();
    await page.waitForTimeout(300);
    
    // Verify the button shows active state
    await expect(page.locator('button:has-text("Custom Links Active")')).toBeVisible();
    
    // Look for reference links in messages
    const refLink = page.locator('a[href*="/documents/"], a[href*="/prescriptions/"], a[href*="/appointments/"]').first();
    
    if (await refLink.count() > 0) {
      const href = await refLink.getAttribute('href');
      // Custom format should contain full paths like /documents/123
      expect(href).toMatch(/^\/(documents|prescriptions|appointments)\/\d+/);
    }
  });

  test('should display custom link builder notification', async ({ page }) => {
    const customLinksButton = page.locator('button:has-text("Enable Custom Links")');
    await customLinksButton.click();
    await page.waitForTimeout(300);
    
    // Should show notification about custom links
    const notification = page.locator('strong:has-text("Custom Link Builder Active")');
    await expect(notification).toBeVisible();
  });

  test('should toggle custom links on and off', async ({ page }) => {
    const customLinksButton = page.locator('button:has-text("Custom Links")');
    
    // Enable
    await customLinksButton.click();
    await page.waitForTimeout(300);
    await expect(page.locator('button:has-text("Custom Links Active")')).toBeVisible();
    
    // Disable
    await customLinksButton.click();
    await page.waitForTimeout(300);
    await expect(page.locator('button:has-text("Enable Custom Links")')).toBeVisible();
  });

  test('should display conversation links when linkBuilder is provided', async ({ page }) => {
    // Enable custom links
    const customLinksButton = page.locator('button:has-text("Enable Custom Links")');
    await customLinksButton.click();
    await page.waitForTimeout(300);
    
    // Open the sidebar to see conversations
    const toggleButton = page.locator('button[aria-label*="sidebar"], button:has-text("☰")');
    if (await toggleButton.count() > 0) {
      await toggleButton.click();
      await page.waitForTimeout(300);
    }
    
    // Look for right arrow button links in conversations
    const conversationLinks = page.locator('a[aria-label="View conversation details"]');
    
    if (await conversationLinks.count() > 0) {
      // Verify the link exists and has proper href
      const firstLink = conversationLinks.first();
      await expect(firstLink).toBeVisible();
      
      const href = await firstLink.getAttribute('href');
      // Custom format for conversations should be /conversations/{id}
      expect(href).toMatch(/^\/conversations\/\d+$/);
      
      // Verify the arrow icon is present
      const svg = firstLink.locator('svg');
      await expect(svg).toBeVisible();
    }
  });

  test('should not display conversation links when linkBuilder is not provided', async ({ page }) => {
    // Make sure custom links are disabled
    const customLinksButton = page.locator('button:has-text("Custom Links")');
    if (await page.locator('button:has-text("Custom Links Active")').count() > 0) {
      await customLinksButton.click();
      await page.waitForTimeout(300);
    }
    
    // Open the sidebar to see conversations
    const toggleButton = page.locator('button[aria-label*="sidebar"], button:has-text("☰")');
    if (await toggleButton.count() > 0) {
      await toggleButton.click();
      await page.waitForTimeout(300);
    }
    
    // Verify no conversation link buttons appear
    const conversationLinks = page.locator('a[aria-label="View conversation details"]');
    await expect(conversationLinks).toHaveCount(0);
  });
});
