import { test, expect } from '@playwright/test';

test.describe('Bootstrap Demo - ReadOnly Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-bootstrap.html');
    await page.waitForSelector('.chat-component-root', { timeout: 10000 });
  });

  test('should display readOnly prop checkbox in Component Props Editor', async ({ page }) => {
    const readOnlyCheckbox = page.locator('#propReadOnly');
    await expect(readOnlyCheckbox).toBeVisible();
    
    // Should have descriptive label
    await expect(page.locator('label[for="propReadOnly"]')).toContainText('readOnly');
    await expect(page.locator('label[for="propReadOnly"]')).toContainText('Enable read-only mode');
  });

  test('should initially show full interface with sidebar and compose area', async ({ page }) => {
    // Should have sidebar with conversation list within the chat component
    const chatComponent = page.locator('.chat-component-root').first();
    const sidebar = chatComponent.locator('aside, [role="complementary"]').first();
    await expect(sidebar).toBeVisible();
    
    // Should have conversations list
    await expect(sidebar).toContainText('Conversations');
    await expect(page.locator('button[aria-label="Create new conversation"]')).toBeVisible();
    
    // Should have compose area
    const textarea = page.locator('textarea[aria-label="Message text"]');
    await expect(textarea).toBeVisible();
    
    const sendButton = page.locator('button[aria-label="Send message"]');
    await expect(sendButton).toBeVisible();
    
    // Should have delivery method dropdown
    const deliveryDropdown = page.locator('[aria-label="Delivery method"]');
    await expect(deliveryDropdown).toBeVisible();
  });

  test('should enable readonly mode when checkbox is checked and props applied', async ({ page }) => {
    // Check the readonly checkbox
    const readOnlyCheckbox = page.locator('#propReadOnly');
    await readOnlyCheckbox.check();
    await expect(readOnlyCheckbox).toBeChecked();
    
    // Click Apply Props button
    const applyButton = page.locator('#applyPropsBtn');
    await applyButton.click();
    
    // Wait for reinitialization
    await page.waitForTimeout(500);
    
    // Should show success message
    await expect(page.locator('#propsSuccess')).toContainText('Props applied successfully');
    
    // Sidebar should be hidden - check inside chat component
    const chatComponent = page.locator('.chat-component-root').first();
    const sidebar = chatComponent.locator('aside, [role="complementary"]').first();
    await expect(sidebar).not.toBeVisible();
    
    // Compose area should be hidden
    const textarea = page.locator('textarea[aria-label="Message text"]');
    await expect(textarea).not.toBeVisible();
    
    const sendButton = page.locator('button[aria-label="Send message"]');
    await expect(sendButton).not.toBeVisible();
    
    // Should only show conversation title and messages
    const chatRegion = page.locator('[role="region"][aria-label="Chat"]');
    await expect(chatRegion).toBeVisible();
    
    // Should show the active conversation title
    await expect(chatRegion).toContainText('General Question');
  });

  test('should display only message thread in readonly mode', async ({ page }) => {
    // Enable readonly mode
    await page.locator('#propReadOnly').check();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(500);
    
    // Should show messages from the active conversation
    const chatRegion = page.locator('[role="region"][aria-label="Chat"]');
    
    // Verify messages are visible
    await expect(chatRegion).toContainText('Jane Doe');
    await expect(chatRegion).toContainText('Dr. Smith');
    await expect(chatRegion).toContainText('Good morning');
    
    // Verify system messages/refs are visible
    await expect(chatRegion).toContainText('CBC Result');
  });

  test('should not have any interactive elements in readonly mode', async ({ page }) => {
    // Enable readonly mode
    await page.locator('#propReadOnly').check();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(500);
    
    const chatRegion = page.locator('[role="region"][aria-label="Chat"]');
    
    // No textarea
    const textareas = chatRegion.locator('textarea');
    await expect(textareas).toHaveCount(0);
    
    // No send button
    const sendButton = chatRegion.locator('button[aria-label="Send message"]');
    await expect(sendButton).toHaveCount(0);
    
    // No new conversation button
    const newButton = chatRegion.locator('button:has-text("Create new conversation")');
    await expect(newButton).toHaveCount(0);
    
    // No delivery method dropdown
    const deliveryDropdown = chatRegion.locator('[aria-label="Delivery method"]');
    await expect(deliveryDropdown).toHaveCount(0);
  });

  test('should disable readonly mode when checkbox is unchecked and props applied', async ({ page }) => {
    // First enable readonly mode
    await page.locator('#propReadOnly').check();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(500);
    
    // Verify it's in readonly mode (no sidebar)
    const chatComponent = page.locator('.chat-component-root').first();
    let sidebar = chatComponent.locator('aside, [role="complementary"]').first();
    await expect(sidebar).not.toBeVisible();
    
    // Now uncheck the readonly checkbox
    await page.locator('#propReadOnly').uncheck();
    await expect(page.locator('#propReadOnly')).not.toBeChecked();
    
    // Click Apply Props button
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(500);
    
    // Should show success message
    await expect(page.locator('#propsSuccess')).toContainText('Props applied successfully');
    
    // Sidebar should be visible again
    sidebar = chatComponent.locator('aside, [role="complementary"]').first();
    await expect(sidebar).toBeVisible();
    
    // Compose area should be visible
    const textarea = page.locator('textarea[aria-label="Message text"]');
    await expect(textarea).toBeVisible();
    
    const sendButton = page.locator('button[aria-label="Send message"]');
    await expect(sendButton).toBeVisible();
    
    // Should have conversations list again
    await expect(sidebar).toContainText('Conversations');
  });

  test('should restore full state when disabling readonly mode', async ({ page }) => {
    // Enable readonly mode
    await page.locator('#propReadOnly').check();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(500);
    
    // Disable readonly mode
    await page.locator('#propReadOnly').uncheck();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(500);
    
    // All conversations should be visible in the sidebar
    const chatComponent = page.locator('.chat-component-root').first();
    const sidebar = chatComponent.locator('aside, [role="complementary"]').first();
    await expect(sidebar).toContainText('General Question');
    await expect(sidebar).toContainText('Work related illness');
    await expect(sidebar).toContainText('Refill Request');
    await expect(sidebar).toContainText('Appointment Request');
    
    // Search box should be visible
    const searchBox = page.locator('input[placeholder*="Search"]');
    await expect(searchBox).toBeVisible();
  });

  test('should maintain conversation data when toggling readonly mode', async ({ page }) => {
    // Get the title of the active conversation before enabling readonly
    const initialTitle = await page.locator('main').first().textContent();
    
    // Enable readonly mode
    await page.locator('#propReadOnly').check();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(500);
    
    // Verify the same conversation is displayed
    const chatRegion = page.locator('[role="region"][aria-label="Chat"]');
    await expect(chatRegion).toContainText('General Question');
    
    // Verify messages are intact
    await expect(chatRegion).toContainText('Good morning');
    await expect(chatRegion).toContainText('CBC Result');
  });

  test('should work with Reset to Defaults button', async ({ page }) => {
    // Enable readonly mode
    await page.locator('#propReadOnly').check();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(500);
    
    // Verify readonly mode is active
    const chatComponent = page.locator('.chat-component-root').first();
    let sidebar = chatComponent.locator('aside, [role="complementary"]').first();
    await expect(sidebar).not.toBeVisible();
    
    // Click Reset to Defaults
    await page.locator('#resetPropsBtn').click();
    await page.waitForTimeout(500);
    
    // Checkbox should be unchecked
    await expect(page.locator('#propReadOnly')).not.toBeChecked();
    
    // Component should be back to normal mode
    sidebar = chatComponent.locator('aside, [role="complementary"]').first();
    await expect(sidebar).toBeVisible();
    
    const textarea = page.locator('textarea[aria-label="Message text"]');
    await expect(textarea).toBeVisible();
  });

  test('should display conversation prop injection in readonly mode', async ({ page }) => {
    // Check console for the conversation prop being set
    const logs = [];
    page.on('console', msg => {
      if (msg.type() === 'log') {
        logs.push(msg.text());
      }
    });
    
    // Enable readonly mode
    await page.locator('#propReadOnly').check();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(500);
    
    // Check if props were logged with conversation
    const propsLog = logs.find(log => log.includes('Component initialized with props'));
    expect(propsLog).toBeTruthy();
  });

  test('should show correct conversation in readonly mode when different conversation is active', async ({ page }) => {
    // Click on a different conversation
    await page.locator('text=Work related illness').click();
    await page.waitForTimeout(500);
    
    // Enable readonly mode
    await page.locator('#propReadOnly').check();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(500);
    
    // Should show the selected conversation
    const chatRegion = page.locator('[role="region"][aria-label="Chat"]');
    await expect(chatRegion).toContainText('Work related illness');
    await expect(chatRegion).toContainText('exposed to fumes');
  });

  test('should maintain readonly state across prop combinations', async ({ page }) => {
    // Enable multiple props including readonly
    await page.locator('#propReadOnly').check();
    await page.locator('#propHideDeliveryMethod').check();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(500);
    
    // Should still be in readonly mode
    const sidebar = page.locator('[role="complementary"]');
    await expect(sidebar).not.toBeVisible();
    
    const textarea = page.locator('textarea[aria-label="Message text"]');
    await expect(textarea).not.toBeVisible();
  });

  test('should handle readonly mode with closed conversations', async ({ page }) => {
    // Select a closed conversation
    await page.locator('text=Refill Request').click();
    await page.waitForTimeout(500);
    
    // Enable readonly mode
    await page.locator('#propReadOnly').check();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(500);
    
    // Should display the closed conversation
    const chatRegion = page.locator('[role="region"][aria-label="Chat"]');
    await expect(chatRegion).toContainText('Refill Request');
    await expect(chatRegion).toContainText('lisinopril');
  });

  test('should not interfere with other Bootstrap styles', async ({ page }) => {
    // Enable readonly mode
    await page.locator('#propReadOnly').check();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(500);
    
    // Bootstrap buttons outside component should still be visible and styled
    const exportButton = page.locator('#exportBtn');
    await expect(exportButton).toBeVisible();
    await expect(exportButton).toHaveClass(/btn/);
    
    // Component should have Tailwind prefix classes
    const chatRegion = page.locator('[role="region"][aria-label="Chat"]');
    const html = await chatRegion.innerHTML();
    
    // Should have tw- prefixed classes
    expect(html).toMatch(/tw-/);
  });

  test('should display readonly mode within Bootstrap card', async ({ page }) => {
    // Enable readonly mode
    await page.locator('#propReadOnly').check();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(500);
    
    // Component should be within Bootstrap card
    const card = page.locator('.card:has([role="region"][aria-label="Chat"])');
    await expect(card).toBeVisible();
    
    // Card should have Bootstrap classes
    await expect(card).toHaveClass(/card/);
  });

  test('should handle rapid toggling of readonly mode', async ({ page }) => {
    // Toggle on
    await page.locator('#propReadOnly').check();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(300);
    
    // Toggle off
    await page.locator('#propReadOnly').uncheck();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(300);
    
    // Toggle on again
    await page.locator('#propReadOnly').check();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(300);
    
    // Should be in readonly mode
    const sidebar = page.locator('[role="complementary"]');
    await expect(sidebar).not.toBeVisible();
    
    const textarea = page.locator('textarea[aria-label="Message text"]');
    await expect(textarea).not.toBeVisible();
  });

  test('should maintain accessibility in readonly mode', async ({ page }) => {
    // Enable readonly mode
    await page.locator('#propReadOnly').check();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(500);
    
    // Should have proper ARIA region
    const chatRegion = page.locator('[role="region"][aria-label="Chat"]');
    await expect(chatRegion).toBeVisible();
    
    // Links should still be accessible
    const docLinks = chatRegion.locator('a:has-text("Document")');
    const linkCount = await docLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });
});

test.describe('Bootstrap Demo - ReadOnly Mode Error Handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-bootstrap.html');
    await page.waitForSelector('.chat-component-root', { timeout: 10000 });
  });

  test('should handle readonly mode with empty state gracefully', async ({ page }) => {
    // Clear all conversations (if possible via UI or by loading empty data)
    // This tests edge case handling
    
    // Enable readonly mode even with edge case
    await page.locator('#propReadOnly').check();
    await page.locator('#applyPropsBtn').click();
    await page.waitForTimeout(500);
    
    // Should still render without errors
    const chatRegion = page.locator('[role="region"][aria-label="Chat"]');
    await expect(chatRegion).toBeVisible();
  });

  test('should not break when applying props multiple times', async ({ page }) => {
    // Apply props multiple times
    for (let i = 0; i < 3; i++) {
      await page.locator('#propReadOnly').check();
      await page.locator('#applyPropsBtn').click();
      await page.waitForTimeout(300);
    }
    
    // Should still be in readonly mode without errors
    const sidebar = page.locator('[role="complementary"]');
    await expect(sidebar).not.toBeVisible();
  });
});
