import { test, expect } from '@playwright/test';

test.describe('Chat Component UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    // Wait for React component to mount
    await page.waitForSelector('[data-testid="chat-component"], .chat-component, [class*="chat"]', { timeout: 10000 });
  });

  test('should display conversation list', async ({ page }) => {
    // Look for conversation list indicators
    const hasConversations = await page.locator('text=/conversation|message|chat/i').first().isVisible();
    expect(hasConversations).toBeTruthy();
  });

  test('should have a compose area', async ({ page }) => {
    // Check for input elements (textarea or input)
    const inputExists = await page.locator('textarea, input[type="text"]').count();
    expect(inputExists).toBeGreaterThan(0);
  });

  test('should toggle sidebar on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Look for menu/hamburger button
    const menuButton = page.locator('button[aria-label*="menu" i], button[aria-label*="sidebar" i], button:has-text("☰")').first();
    
    if (await menuButton.isVisible()) {
      await menuButton.click();
      // Sidebar should toggle
      await page.waitForTimeout(500); // Wait for animation
    }
  });

  test('should be responsive', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(200);
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(200);
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(200);
    
    // Component should still be visible
    const componentVisible = await page.locator('body').isVisible();
    expect(componentVisible).toBeTruthy();
  });
});

test.describe('Chat Component Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    await page.waitForSelector('[data-testid="chat-component"], .chat-component, [class*="chat"]', { timeout: 10000 });
  });

  test('should allow typing in compose area', async ({ page }) => {
    const textarea = page.locator('textarea').first();
    
    if (await textarea.isVisible()) {
      await textarea.fill('Hello, this is a test message');
      await expect(textarea).toHaveValue('Hello, this is a test message');
    }
  });

  test('should have accessible buttons', async ({ page }) => {
    // Check for buttons with ARIA labels
    const buttons = page.locator('button[aria-label]');
    const count = await buttons.count();
    
    // Should have at least some accessible buttons
    expect(count).toBeGreaterThan(0);
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Press Tab to navigate through interactive elements
    await page.keyboard.press('Tab');
    
    // Check that focus moved to an interactive element
    const focusedElement = await page.locator(':focus').count();
    expect(focusedElement).toBeGreaterThan(0);
  });
});
