import { test, expect } from '@playwright/test';

test.describe('Bootstrap Demo - newConversationLabel prop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-bootstrap.html');
    await page.waitForSelector('.chat-component-root', { timeout: 10000 });
  });

  test('should expose newConversationLabel in props editor', async ({ page }) => {
    const labelInput = page.locator('#propNewConversationLabel');
    await expect(labelInput).toBeVisible();
    await expect(page.locator('label[for="propNewConversationLabel"]')).toContainText('newConversationLabel');
  });

  test('should render custom new conversation button label when non-empty', async ({ page }) => {
    await page.locator('#propNewConversationLabel').fill('New Chat');
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(300);

    const newConversationButton = page.locator('.chat-component-root button[aria-label="Create new conversation"]').first();
    await expect(newConversationButton).toBeVisible();
    await expect(newConversationButton).toHaveText('New Chat');
  });

  test('should fall back to plus label when newConversationLabel is empty', async ({ page }) => {
    const input = page.locator('#propNewConversationLabel');

    await input.fill('Create');
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(300);

    await input.fill('');
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(300);

    const newConversationButton = page.locator('.chat-component-root button[aria-label="Create new conversation"]').first();
    await expect(newConversationButton).toBeVisible();
    await expect(newConversationButton).toHaveText('+');
  });
});
