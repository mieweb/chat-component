import { test, expect } from '@playwright/test';

test.describe('Bootstrap Demo - autoCreateConversation toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-bootstrap.html');
    await page.waitForSelector('#propAutoCreateConversation', { timeout: 10000 });
  });

  test('should expose the autoCreateConversation toggle in the props editor', async ({ page }) => {
    const toggle = page.locator('#propAutoCreateConversation');
    await expect(toggle).toBeVisible();
    await expect(toggle).toBeChecked();
    await expect(page.locator('label[for="propAutoCreateConversation"]')).toContainText('autoCreateConversation');
  });

  test('should disable auto-creation when the toggle is turned off', async ({ page }) => {
    await page.evaluate(() => {
      ChatComponent.useChatStore.getState().loadConversations({
        conversations: [],
        activeConversationId: null,
      });
    });

    await page.locator('#propAutoCreateConversation').uncheck();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(300);

    const textarea = page.locator('textarea[aria-label="Message text"]');
    const sendButton = page.locator('button[aria-label="Send message"]');

    await expect(textarea).toBeDisabled();
    await expect(sendButton).toBeDisabled();
  });
});
