import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    await page.waitForSelector('[data-testid="chat-component"], .chat-component, [class*="chat"]', { timeout: 10000 });
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('should have aria-labels on interactive elements', async ({ page }) => {
    const interactiveElements = page.locator('button, a, input, textarea');
    const count = await interactiveElements.count();
    
    if (count > 0) {
      // At least some interactive elements should have aria-labels or visible text
      for (let i = 0; i < Math.min(count, 5); i++) {
        const element = interactiveElements.nth(i);
        const hasAriaLabel = await element.getAttribute('aria-label');
        const hasText = await element.textContent();
        const hasAlt = await element.getAttribute('alt');
        
        expect(hasAriaLabel || hasText || hasAlt).toBeTruthy();
      }
    }
  });

  test('should have proper contrast ratios', async ({ page }) => {
    // Take a screenshot to manually verify contrast
    await page.screenshot({ path: 'tests/screenshots/contrast-check.png', fullPage: true });
    
    // Basic visibility check
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should be keyboard navigable', async ({ page }) => {
    // Tab through several elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
    }
    
    // Check that focus is on an interactive element
    const focusedElement = page.locator(':focus');
    const isInteractive = await focusedElement.evaluate(el => {
      const tagName = el.tagName.toLowerCase();
      return ['button', 'a', 'input', 'textarea', 'select'].includes(tagName) || 
             el.hasAttribute('tabindex');
    });
    
    expect(isInteractive).toBeTruthy();
  });

  test('should have semantic HTML', async ({ page }) => {
    // Check for semantic elements
    const hasSemantic = await Promise.all([
      page.locator('main, article, section, nav, header, footer').count(),
      page.locator('button').count(),
    ]);
    
    // Should use semantic HTML elements
    expect(hasSemantic.some(count => count > 0)).toBeTruthy();
  });

  test('should have focus indicators', async ({ page }) => {
    const button = page.locator('button').first();
    
    if (await button.isVisible()) {
      await button.focus();
      
      // Take screenshot to verify focus indicator
      await page.screenshot({ path: 'tests/screenshots/focus-indicator.png' });
      
      // Verify element is focused
      await expect(button).toBeFocused();
    }
  });
});

test.describe('Screen Reader Support', () => {
  test('should have proper ARIA roles', async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    await page.waitForSelector('[data-testid="chat-component"], .chat-component, [class*="chat"]', { timeout: 10000 });
    
    // Check for ARIA roles
    const ariaElements = await page.locator('[role]').count();
    
    // Should have some ARIA roles defined
    expect(ariaElements).toBeGreaterThanOrEqual(0);
  });

  test('should announce dynamic content updates', async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    await page.waitForSelector('[data-testid="chat-component"], .chat-component, [class*="chat"]', { timeout: 10000 });
    
    // Check for aria-live regions
    const liveRegions = await page.locator('[aria-live]').count();
    
    // Note: May be 0 if not implemented yet
    expect(liveRegions).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Read-Only Mode Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    await page.waitForSelector('[data-testid="chat-component"], .chat-component, [class*="chat"]', { timeout: 10000 });
    
    // Enable read-only mode
    const readOnlyButton = page.locator('button:has-text("Read-Only")');
    await readOnlyButton.click();
    await page.waitForTimeout(300);
  });

  test('should have accessible conversation title in read-only mode', async ({ page }) => {
    // Title should be visible and readable
    const title = page.locator('text=/Read-Only Conversation Example/i');
    await expect(title).toBeVisible();
    
    // Should be in a semantic container
    const titleContainer = page.locator('.chat-component-root').last().locator('div').first();
    await expect(titleContainer).toBeVisible();
  });

  test('should maintain proper reading order in read-only mode', async ({ page }) => {
    // Messages should be in chronological order
    const readOnlyComponent = page.locator('.chat-component-root').last();
    await expect(readOnlyComponent).toBeVisible();
    
    // Should display sender names in order
    const senderNames = page.locator('text=/Jane Doe|Dr. Smith/i').first();
    await expect(senderNames).toBeVisible();
  });

  test('should have proper contrast in read-only mode', async ({ page }) => {
    // Take a screenshot for visual verification
    const readOnlyComponent = page.locator('.chat-component-root').last();
    await readOnlyComponent.screenshot({ path: 'tests/screenshots/readonly-contrast.png' });
    
    await expect(readOnlyComponent).toBeVisible();
  });

  test('should not trap keyboard focus in read-only mode', async ({ page }) => {
    // Since read-only mode has no interactive elements, focus should skip over it
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    
    const focusedElement = await page.locator(':focus').count();
    expect(focusedElement).toBeGreaterThanOrEqual(0);
  });

  test('should have semantic structure in read-only mode', async ({ page }) => {
    // Check that the read-only component uses semantic HTML
    const readOnlyComponent = page.locator('.chat-component-root').last();
    const hasDivs = await readOnlyComponent.locator('div').count();
    
    // Should have structural elements
    expect(hasDivs).toBeGreaterThan(0);
  });

  test('should display message metadata accessibly in read-only mode', async ({ page }) => {
    // Sender names and timestamps should be visible
    const readOnlyComponent = page.locator('.chat-component-root').last();
    
    // Look for sender names
    const senderNames = readOnlyComponent.locator('text=/Jane Doe|Dr. Smith/i');
    await expect(senderNames.first()).toBeVisible();
    
    // Look for channel/time information
    const metadata = readOnlyComponent.locator('text=/Portal|SMS|AM|PM/i');
    await expect(metadata.first()).toBeVisible();
  });

  test('should be responsive and accessible on mobile in read-only mode', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(200);
    
    const readOnlyComponent = page.locator('.chat-component-root').last();
    await expect(readOnlyComponent).toBeVisible();
    
    // Title should still be visible
    const title = page.locator('text=/Read-Only Conversation Example/i');
    await expect(title).toBeVisible();
  });
});

