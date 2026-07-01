import { test, expect } from '@playwright/test';

test.describe('Bootstrap Demo - disableAutoCreateConversation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-bootstrap.html');
    await page.waitForFunction(() => {
      return typeof window.ChatComponent !== 'undefined' && typeof window.initializeComponent === 'function';
    }, { timeout: 10000 });

    await page.evaluate(() => {
      initializeComponent({ disableAutoCreateConversation: true });
      ChatComponent.useChatStore.getState().loadConversations({
        conversations: [],
        activeConversationId: null,
      });
    });

    await page.waitForTimeout(200);
    await page.waitForSelector('textarea[aria-label="Message text"]', { timeout: 10000 });
  });

  test('should disable message textarea and send button when there is no active conversation', async ({ page }) => {
    const textarea = page.locator('textarea[aria-label="Message text"]');
    const sendButton = page.locator('button[aria-label="Send message"]');

    await expect(textarea).toBeVisible();
    await expect(sendButton).toBeVisible();
    await expect(textarea).toBeDisabled();
    await expect(sendButton).toBeDisabled();
  });

  test('should enable compose controls after creating a conversation', async ({ page }) => {
    await page.locator('button[aria-label="Create new conversation"]').first().click();
    await page.locator('input[placeholder="e.g., General Question"]').fill('New Chat');
    await page.locator('button:has-text("Create")').click();

    const textarea = page.locator('textarea[aria-label="Message text"]');
    const sendButton = page.locator('button[aria-label="Send message"]');

    await expect(textarea).toBeEnabled();
    await expect(sendButton).toBeDisabled();
  });
});
