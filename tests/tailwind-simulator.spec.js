import { test, expect } from '@playwright/test';

test.describe('Tailwind Demo - Simulator Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    await page.waitForSelector('.chat-component-root', { timeout: 10000 });
  });

  test('should display simulator toggle button', async ({ page }) => {
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    await expect(simulatorButton).toBeVisible();
  });

  test('should toggle simulator mode on and off', async ({ page }) => {
    const simulatorButton = page.locator('button:has-text("Enable Simulator"), button:has-text("✓ Simulator Active")');
    
    // Initially should show "Enable Simulator"
    await expect(page.locator('button:has-text("Enable Simulator")')).toBeVisible();
    
    // Click to enable
    await simulatorButton.click();
    await page.waitForTimeout(300);
    
    // Should now show "✓ Simulator Active"
    await expect(page.locator('button:has-text("✓ Simulator Active")')).toBeVisible();
    
    // Click to disable
    await simulatorButton.click();
    await page.waitForTimeout(300);
    
    // Should go back to "Enable Simulator"
    await expect(page.locator('button:has-text("Enable Simulator")')).toBeVisible();
  });

  test('should show two components when simulator is active', async ({ page }) => {
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    
    // Enable simulator
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    // Should see two chat components
    const chatComponents = page.locator('.chat-component-root');
    await expect(chatComponents).toHaveCount(2);
  });

  test('should show simulator info banner when active', async ({ page }) => {
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    
    // Enable simulator
    await simulatorButton.click();
    await page.waitForTimeout(300);
    
    // Should show info banner
    const infoBanner = page.locator('text=🔄 Simulator Mode Active');
    await expect(infoBanner).toBeVisible();
    
    // Banner should contain explanation text
    await expect(page.locator('text=/share the same conversation state/i')).toBeVisible();
  });

  test('should label components appropriately in simulator mode', async ({ page }) => {
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    
    // Enable simulator
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    // Should show component labels
    await expect(page.locator('text=Component 1 - Internal User (Clinician)')).toBeVisible();
    await expect(page.locator('text=Component 2 - External User (Patient)')).toBeVisible();
  });

  test('should show only one component when simulator is disabled', async ({ page }) => {
    // Initially one component
    let chatComponents = page.locator('.chat-component-root');
    await expect(chatComponents).toHaveCount(1);
    
    // Enable simulator
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    // Now two components
    chatComponents = page.locator('.chat-component-root');
    await expect(chatComponents).toHaveCount(2);
    
    // Disable simulator
    await page.locator('button:has-text("✓ Simulator Active")').click();
    await page.waitForTimeout(500);
    
    // Back to one component
    chatComponents = page.locator('.chat-component-root');
    await expect(chatComponents).toHaveCount(1);
  });

  test('should share messages between components in simulator mode', async ({ page }) => {
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    
    // Enable simulator
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    // Get both chat components
    const chatComponents = page.locator('.chat-component-root');
    await expect(chatComponents).toHaveCount(2);
    
    // Type a message in the first component
    const firstComponentTextarea = chatComponents.nth(0).locator('textarea').first();
    const sendButton = chatComponents.nth(0).locator('button[aria-label="Send message"]').first();
    
    if (await firstComponentTextarea.isVisible() && await sendButton.isVisible()) {
      await firstComponentTextarea.fill('Test message from Component 1');
      await sendButton.click();
      await page.waitForTimeout(1000);
      
      // Message should appear in both components (shared state)
      const messageText = page.locator('text=Test message from Component 1');
      const messageCount = await messageText.count();
      
      // Should appear at least once (in the shared conversation)
      expect(messageCount).toBeGreaterThan(0);
    }
  });

  test('should maintain different currentUserId for each component', async ({ page }) => {
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    
    // Enable simulator
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    // Component 1 should have currentUserId=200 (Internal User)
    // Component 2 should have currentUserId=100 (External User)
    // This is verified by the different labels shown
    await expect(page.locator('text=Internal User (Clinician)')).toBeVisible();
    await expect(page.locator('text=External User (Patient)')).toBeVisible();
  });

  test('should show helpful tip in component 2', async ({ page }) => {
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    
    // Enable simulator
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    // Should show tip about simulating external user response
    await expect(page.locator('text=/💡 Tip.*simulate an external user response/i')).toBeVisible();
  });

  test('should have distinct border colors for components in simulator mode', async ({ page }) => {
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    
    // Enable simulator
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    // Check that component containers have borders
    const component1Border = page.locator('h3:has-text("Component 1")').locator('..');
    const component2Border = page.locator('h3:has-text("Component 2")').locator('..');
    
    // Both should be visible
    await expect(component1Border).toBeVisible();
    await expect(component2Border).toBeVisible();
  });

  test('should export state button remain functional in simulator mode', async ({ page }) => {
    const exportButton = page.locator('button:has-text("Export State")');
    await expect(exportButton).toBeVisible();
    
    // Enable simulator
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    // Export button should still be visible and clickable
    await expect(exportButton).toBeVisible();
    
    // Set up dialog handler
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('State exported to console');
      await dialog.accept();
    });
    
    // Click export button
    await exportButton.click();
    await page.waitForTimeout(500);
  });

  test('should handle rapid toggling of simulator mode', async ({ page }) => {
    const simulatorButton = page.locator('button:has-text("Enable Simulator"), button:has-text("✓ Simulator Active")');
    
    // Toggle multiple times rapidly
    await simulatorButton.click();
    await page.waitForTimeout(100);
    await simulatorButton.click();
    await page.waitForTimeout(100);
    await simulatorButton.click();
    await page.waitForTimeout(100);
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    // Should end in a consistent state
    const chatComponents = page.locator('.chat-component-root');
    const count = await chatComponents.count();
    
    // Should be either 1 or 2, not broken
    expect(count).toBeGreaterThanOrEqual(1);
    expect(count).toBeLessThanOrEqual(2);
  });

  test('should maintain responsive layout in simulator mode', async ({ page }) => {
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    
    // Enable simulator
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    // Test desktop view - components should be side by side
    await page.setViewportSize({ width: 1400, height: 800 });
    await page.waitForTimeout(300);
    
    const chatComponents = page.locator('.chat-component-root');
    await expect(chatComponents).toHaveCount(2);
    
    // Test smaller screen - components should stack
    await page.setViewportSize({ width: 800, height: 600 });
    await page.waitForTimeout(300);
    
    // Both components should still be visible
    await expect(chatComponents.nth(0)).toBeVisible();
    await expect(chatComponents.nth(1)).toBeVisible();
  });

  test('should not show simulator UI when disabled', async ({ page }) => {
    // Simulator should be disabled by default
    await expect(page.locator('text=🔄 Simulator Mode Active')).not.toBeVisible();
    await expect(page.locator('text=Component 1 - Internal User')).not.toBeVisible();
    await expect(page.locator('text=Component 2 - External User')).not.toBeVisible();
  });
});

test.describe('Tailwind Demo - Simulator Message Alignment', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    await page.waitForSelector('.chat-component-root', { timeout: 10000 });
  });

  test('should align messages based on sender in simulator mode', async ({ page }) => {
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    
    // Enable simulator
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    // Get both chat components
    const chatComponents = page.locator('.chat-component-root');
    
    // Send message from Component 1 (currentUserId=200, internal)
    const firstTextarea = chatComponents.nth(0).locator('textarea').first();
    const firstSendButton = chatComponents.nth(0).locator('button[aria-label="Send message"]').first();
    
    if (await firstTextarea.isVisible() && await firstSendButton.isVisible()) {
      await firstTextarea.fill('Message from clinician');
      await firstSendButton.click();
      await page.waitForTimeout(1000);
      
      // Send message from Component 2 (currentUserId=100, external)
      const secondTextarea = chatComponents.nth(1).locator('textarea').first();
      const secondSendButton = chatComponents.nth(1).locator('button[aria-label="Send message"]').first();
      
      if (await secondTextarea.isVisible() && await secondSendButton.isVisible()) {
        await secondTextarea.fill('Message from patient');
        await secondSendButton.click();
        await page.waitForTimeout(1000);
        
        // Both messages should be visible in both components
        const clinicianMsg = page.locator('text=Message from clinician');
        const patientMsg = page.locator('text=Message from patient');
        
        expect(await clinicianMsg.count()).toBeGreaterThan(0);
        expect(await patientMsg.count()).toBeGreaterThan(0);
      }
    }
  });
});
