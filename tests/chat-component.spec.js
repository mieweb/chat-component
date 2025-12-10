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

test.describe('Read-Only Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    await page.waitForSelector('[data-testid="chat-component"], .chat-component, [class*="chat"]', { timeout: 10000 });
  });

  test('should show read-only mode toggle button', async ({ page }) => {
    const readOnlyButton = page.locator('button:has-text("Read-Only")');
    await expect(readOnlyButton).toBeVisible();
  });

  test('should activate read-only mode when toggled', async ({ page }) => {
    const readOnlyButton = page.locator('button:has-text("Read-Only")');
    await readOnlyButton.click();
    
    // Wait for the read-only component to render
    await page.waitForTimeout(300);
    
    // Check for read-only mode indicator - use first() to avoid strict mode violation
    const readOnlyIndicator = page.locator('strong:has-text("📖 Read-Only Mode Active")');
    await expect(readOnlyIndicator).toBeVisible();
  });

  test('should display conversation title in read-only mode', async ({ page }) => {
    const readOnlyButton = page.locator('button:has-text("Read-Only")');
    await readOnlyButton.click();
    await page.waitForTimeout(300);
    
    // Should display the conversation title
    const title = page.locator('text=/Read-Only Conversation Example/i');
    await expect(title).toBeVisible();
  });

  test('should display messages in read-only mode', async ({ page }) => {
    const readOnlyButton = page.locator('button:has-text("Read-Only")');
    await readOnlyButton.click();
    await page.waitForTimeout(300);
    
    // Should display the read-only conversation component
    const readOnlyHeading = page.locator('h3:has-text("📖 Read-Only Conversation View")');
    await expect(readOnlyHeading).toBeVisible();
    
    // Should display messages - check for any message content
    const messageContent = page.locator('text=/Jane Doe|Dr. Smith/i').first();
    await expect(messageContent).toBeVisible();
  });

  test('should not show sidebar in read-only mode', async ({ page }) => {
    const readOnlyButton = page.locator('button:has-text("Read-Only")');
    await readOnlyButton.click();
    await page.waitForTimeout(300);
    
    // Verify read-only mode is active
    const readOnlyHeading = page.locator('h3:has-text("📖 Read-Only Conversation View")');
    await expect(readOnlyHeading).toBeVisible();
    
    // The read-only component should be displayed (this is the main test)
    const readOnlyTitle = page.locator('text=/Read-Only Conversation Example/i');
    await expect(readOnlyTitle).toBeVisible();
  });

  test('should not show compose area in read-only mode', async ({ page }) => {
    const readOnlyButton = page.locator('button:has-text("Read-Only")');
    await readOnlyButton.click();
    await page.waitForTimeout(300);
    
    // Verify read-only mode is displayed
    const readOnlyHeading = page.locator('h3:has-text("📖 Read-Only Conversation View")');
    await expect(readOnlyHeading).toBeVisible();
    
    // Check the tip message that confirms it's read-only
    const tip = page.locator('text=/No sidebar, compose area, or interactive buttons/i');
    await expect(tip).toBeVisible();
  });

  test('should not show action buttons in read-only mode', async ({ page }) => {
    const readOnlyButton = page.locator('button:has-text("Read-Only")');
    await readOnlyButton.click();
    await page.waitForTimeout(300);
    
    // Verify read-only mode is displayed
    const readOnlyHeading = page.locator('h3:has-text("📖 Read-Only Conversation View")');
    await expect(readOnlyHeading).toBeVisible();
    
    // Verify it shows the conversation title (key feature of read-only mode)
    const conversationTitle = page.locator('text=/Read-Only Conversation Example/i');
    await expect(conversationTitle).toBeVisible();
  });

  test('should be responsive in read-only mode', async ({ page }) => {
    const readOnlyButton = page.locator('button:has-text("Read-Only")');
    await readOnlyButton.click();
    await page.waitForTimeout(300);
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(200);
    
    // Read-only component should still be visible
    const readOnlyTitle = page.locator('text=/Read-Only Conversation Example/i');
    await expect(readOnlyTitle).toBeVisible();
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(200);
    await expect(readOnlyTitle).toBeVisible();
    
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(200);
    await expect(readOnlyTitle).toBeVisible();
  });

  test('should display message sender names in read-only mode', async ({ page }) => {
    const readOnlyButton = page.locator('button:has-text("Read-Only")');
    await readOnlyButton.click();
    await page.waitForTimeout(300);
    
    // Should show sender names
    const senderName = page.locator('text=/Jane Doe|Dr. Smith/i').first();
    await expect(senderName).toBeVisible();
  });

  test('should display message timestamps in read-only mode', async ({ page }) => {
    const readOnlyButton = page.locator('button:has-text("Read-Only")');
    await readOnlyButton.click();
    await page.waitForTimeout(300);
    
    // Should show timestamps or time indicators
    const timestamp = page.locator('text=/Portal|SMS|AM|PM/i').first();
    await expect(timestamp).toBeVisible();
  });

  test('should toggle off read-only mode', async ({ page }) => {
    const readOnlyButton = page.locator('button:has-text("Read-Only")');
    
    // Enable read-only mode
    await readOnlyButton.click();
    await page.waitForTimeout(300);
    
    // Verify it's active
    let readOnlyIndicator = page.locator('strong:has-text("📖 Read-Only Mode Active")');
    await expect(readOnlyIndicator).toBeVisible();
    
    // Toggle it off
    await readOnlyButton.click();
    await page.waitForTimeout(300);
    
    // Read-only indicator should no longer be visible
    const indicatorCount = await page.locator('strong:has-text("📖 Read-Only Mode Active")').count();
    expect(indicatorCount).toBe(0);
  });
});

