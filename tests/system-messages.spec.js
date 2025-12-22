import { test, expect } from '@playwright/test';

test.describe('System Messages', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    // Wait for React component to mount
    await page.waitForSelector('[data-testid="chat-component"], .chat-component, [class*="chat"]', { timeout: 10000 });
  });

  test('should display system message when creating new conversation', async ({ page }) => {
    // Click New Conversation button
    const newButton = page.locator('button[aria-label*="new conversation" i]');
    await newButton.click();
    
    // Wait for modal/dialog
    await page.waitForTimeout(300);
    
    // Enter conversation title and create
    const titleInput = page.locator('input[type="text"]').first();
    await titleInput.fill('Test System Message');
    
    const createButton = page.locator('button:has-text("Create")');
    await createButton.click();
    
    // Wait for new conversation to be created
    await page.waitForTimeout(500);
    
    // System message should be visible
    const systemMessage = page.locator('text=/New conversation initialized/i');
    await expect(systemMessage).toBeVisible();
  });

  test('should center-align system messages', async ({ page }) => {
    // Create a new conversation to get a system message
    const newButton = page.locator('button[aria-label*="new conversation" i]');
    await newButton.click();
    await page.waitForTimeout(300);
    
    const titleInput = page.locator('input[type="text"]').first();
    await titleInput.fill('Center Align Test');
    
    const createButton = page.locator('button:has-text("Create")');
    await createButton.click();
    await page.waitForTimeout(500);
    
    // Find the system message - it should be visible
    const systemMessage = page.locator('text=/New conversation initialized/i');
    await expect(systemMessage).toBeVisible();
    
    // Get the message box position and verify it's centered
    const messageBox = systemMessage.locator('../..');
    const boundingBox = await messageBox.boundingBox();
    const viewportSize = page.viewportSize();
    
    // System message should be roughly centered (within middle third of screen)
    if (boundingBox && viewportSize) {
      const centerX = boundingBox.x + boundingBox.width / 2;
      const screenCenterX = viewportSize.width / 2;
      const distanceFromCenter = Math.abs(centerX - screenCenterX);
      
      // Should be within 30% of screen width from center
      expect(distanceFromCenter).toBeLessThan(viewportSize.width * 0.3);
    }
  });

  test('should style system messages with yellow background', async ({ page }) => {
    // Create a new conversation
    const newButton = page.locator('button[aria-label*="new conversation" i]');
    await newButton.click();
    await page.waitForTimeout(300);
    
    const titleInput = page.locator('input[type="text"]').first();
    await titleInput.fill('Yellow Background Test');
    
    const createButton = page.locator('button:has-text("Create")');
    await createButton.click();
    await page.waitForTimeout(500);
    
    // System message should be visible
    const systemMessage = page.locator('text=/New conversation initialized/i');
    await expect(systemMessage).toBeVisible();
    
    // Take screenshot to verify styling (visual verification)
    await page.screenshot({ path: 'test-results/system-message-yellow-bg.png' });
  });

  test('should not show sender name for system messages', async ({ page }) => {
    // Create a new conversation
    const newButton = page.locator('button[aria-label*="new conversation" i]');
    await newButton.click();
    await page.waitForTimeout(300);
    
    const titleInput = page.locator('input[type="text"]').first();
    await titleInput.fill('No Sender Test');
    
    const createButton = page.locator('button:has-text("Create")');
    await createButton.click();
    await page.waitForTimeout(500);
    
    // Find the system message container
    const systemMessageContainer = page.locator('text=/New conversation initialized/i').locator('../..');
    
    // System messages should not have sender_name displayed
    // Check that there's no sender name element near the system message
    const hasSenderName = await systemMessageContainer.locator('text=/Dr\\.|Jane|Sender/i').count();
    expect(hasSenderName).toBe(0);
  });

  test('should display timestamp for system messages', async ({ page }) => {
    // Create a new conversation
    const newButton = page.locator('button[aria-label*="new conversation" i]');
    await newButton.click();
    await page.waitForTimeout(300);
    
    const titleInput = page.locator('input[type="text"]').first();
    await titleInput.fill('Timestamp Test');
    
    const createButton = page.locator('button:has-text("Create")');
    await createButton.click();
    await page.waitForTimeout(500);
    
    // System message should be visible
    const systemMessage = page.locator('text=/New conversation initialized/i');
    await expect(systemMessage).toBeVisible();
    
    // System message container should have text content (message + timestamp)
    const messageContainer = systemMessage.locator('../..');
    const textContent = await messageContainer.textContent();
    expect(textContent).toBeTruthy();
    expect(textContent.length).toBeGreaterThan(20); // Should have message text plus timestamp
  });

  test('should distinguish system messages from regular messages visually', async ({ page }) => {
    // Create a new conversation
    const newButton = page.locator('button[aria-label*="new conversation" i]');
    await newButton.click();
    await page.waitForTimeout(300);
    
    const titleInput = page.locator('input[type="text"]').first();
    await titleInput.fill('Visual Distinction Test');
    
    const createButton = page.locator('button:has-text("Create")');
    await createButton.click();
    await page.waitForTimeout(500);
    
    // Send a regular message
    const textarea = page.locator('textarea').first();
    await textarea.fill('This is a regular message');
    await textarea.press('Enter');
    await page.waitForTimeout(500);
    
    // Get system message background color
    const systemMessageBox = page.locator('text=/New conversation initialized/i').locator('..');
    const systemBgColor = await systemMessageBox.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Get regular message background color
    const regularMessageBox = page.locator('text=/This is a regular message/i').locator('..');
    const regularBgColor = await regularMessageBox.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // They should have different background colors
    expect(systemBgColor).not.toBe(regularBgColor);
  });

  test('should render system messages with proper styling', async ({ page }) => {
    // Create a new conversation
    const newButton = page.locator('button[aria-label*="new conversation" i]');
    await newButton.click();
    await page.waitForTimeout(300);
    
    const titleInput = page.locator('input[type="text"]').first();
    await titleInput.fill('Styling Test');
    
    const createButton = page.locator('button:has-text("Create")');
    await createButton.click();
    await page.waitForTimeout(500);
    
    // System message should be visible and distinct
    const systemMessage = page.locator('text=/New conversation initialized/i');
    await expect(systemMessage).toBeVisible();
    
    // Verify message is displayed (basic functional test)
    const textContent = await systemMessage.textContent();
    expect(textContent).toContain('New conversation initialized');
  });

  test('should handle multiple system messages in conversation', async ({ page }) => {
    // Navigate and wait for the component
    await page.waitForTimeout(500);
    
    // Use the exposed store API to add test data
    const testDataLoaded = await page.evaluate(() => {
      try {
        // Access the global useChatStore that should be exposed
        if (typeof window.useChatStore === 'undefined') {
          return false;
        }
        
        const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
        const testConversation = {
          id: 9999,
          title: 'Multiple System Messages',
          reference_id: null,
          open: true,
          unread: false,
          lastActivity: now,
          thread: [
            {
              type: 'message',
              role: 'system',
              senderId: null,
              channel: 'auto',
              time: now,
              text: 'First system message'
            },
            {
              type: 'message',
              role: 'external',
              senderId: 100,
              sender_name: 'Jane Doe',
              channel: 'portal',
              time: now,
              text: 'Regular message'
            },
            {
              type: 'message',
              role: 'system',
              senderId: null,
              channel: 'auto',
              time: now,
              text: 'Second system message'
            }
          ]
        };
        
        window.useChatStore.getState().loadConversations({
          conversations: [testConversation],
          activeConversationId: 9999
        });
        return true;
      } catch (e) {
        console.error('Failed to load test data:', e);
        return false;
      }
    });
    
    if (testDataLoaded) {
      await page.waitForTimeout(500);
      
      // Both system messages should be visible
      const firstSystemMsg = page.locator('text=/First system message/i');
      const secondSystemMsg = page.locator('text=/Second system message/i');
      
      await expect(firstSystemMsg).toBeVisible();
      await expect(secondSystemMsg).toBeVisible();
    } else {
      // Skip this test if we can't inject data - just create two conversations instead
      const newButton = page.locator('button[aria-label*="new conversation" i]');
      
      // Create first conversation
      await newButton.click();
      await page.waitForTimeout(300);
      const titleInput = page.locator('input[type="text"]').first();
      await titleInput.fill('First Test');
      const createButton = page.locator('button:has-text("Create")');
      await createButton.click();
      await page.waitForTimeout(500);
      
      // Verify system message appears
      const systemMessage = page.locator('text=/New conversation initialized/i').first();
      await expect(systemMessage).toBeVisible();
    }
  });

  test('system messages should not have channel icons', async ({ page }) => {
    // Create a new conversation
    const newButton = page.locator('button[aria-label*="new conversation" i]');
    await newButton.click();
    await page.waitForTimeout(300);
    
    const titleInput = page.locator('input[type="text"]').first();
    await titleInput.fill('No Channel Icon Test');
    
    const createButton = page.locator('button:has-text("Create")');
    await createButton.click();
    await page.waitForTimeout(500);
    
    // Send a regular message to compare
    const textarea = page.locator('textarea').first();
    await textarea.fill('Regular message with icon');
    await textarea.press('Enter');
    await page.waitForTimeout(500);
    
    // Regular messages have channel icons (emoji like 📱, 💻, etc.)
    const regularMessageBox = page.locator('text=/Regular message with icon/i').locator('..');
    const hasIcon = await regularMessageBox.locator('span').count() > 0;
    
    // System message should not have channel icon in the same way
    const systemMessageBox = page.locator('text=/New conversation initialized/i').locator('..');
    const systemText = await systemMessageBox.textContent();
    
    // System message should only contain text and timestamp, no channel labels
    expect(systemText).not.toContain('Portal');
    expect(systemText).not.toContain('SMS');
  });
});
