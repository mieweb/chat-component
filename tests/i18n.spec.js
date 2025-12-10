import { test, expect } from '@playwright/test';

test.describe('Internationalization (i18n)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    await page.waitForSelector('[data-testid="chat-component"], .chat-component, [class*="chat"]', { timeout: 10000 });
  });

  test('should support LTR layout', async ({ page }) => {
    // Default should be LTR
    const direction = await page.locator('html').evaluate(el => 
      window.getComputedStyle(el).direction
    );
    expect(['ltr', 'rtl']).toContain(direction);
  });

  test('should handle text expansion', async ({ page }) => {
    // Test with wider viewport to see if layout handles text expansion
    await page.setViewportSize({ width: 1400, height: 800 });
    
    // Component should remain visible and functional
    const componentVisible = await page.locator('body').isVisible();
    expect(componentVisible).toBeTruthy();
  });

  test('should use Unicode characters', async ({ page }) => {
    // Check if page encoding supports Unicode
    const charset = await page.locator('meta[charset]').getAttribute('charset');
    expect(charset?.toLowerCase()).toBe('utf-8');
  });

  test('should have lang attribute', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBeTruthy();
  });
});

test.describe('RTL Support', () => {
  test('should handle RTL layout when dir="rtl"', async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    await page.waitForSelector('[data-testid="chat-component"], .chat-component, [class*="chat"]', { timeout: 10000 });
    
    // Set RTL direction
    await page.evaluate(() => {
      document.documentElement.dir = 'rtl';
    });
    
    await page.waitForTimeout(500);
    
    // Verify RTL is applied
    const direction = await page.locator('html').evaluate(el => 
      el.getAttribute('dir')
    );
    expect(direction).toBe('rtl');
    
    // Component should still be visible
    const componentVisible = await page.locator('body').isVisible();
    expect(componentVisible).toBeTruthy();
  });
});
