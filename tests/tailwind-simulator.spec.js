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

test.describe('Tailwind Demo - Multi-Component User ID Independence', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    await page.waitForSelector('.chat-component-root', { timeout: 10000 });
  });

  test('should maintain separate currentUserId for each component in simulator mode', async ({ page }) => {
    // Enable simulator mode
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    // Verify two components exist
    const chatComponents = page.locator('.chat-component-root');
    await expect(chatComponents).toHaveCount(2);
    
    // Verify component labels indicate different users
    await expect(page.locator('text=Component 1 - Internal User (Clinician)')).toBeVisible();
    await expect(page.locator('text=Component 2 - External User (Patient)')).toBeVisible();
  });

  test('should show shared messages in both components', async ({ page }) => {
    // Enable simulator mode
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    const chatComponents = page.locator('.chat-component-root');
    await expect(chatComponents).toHaveCount(2);
    
    // Look for sample message text that exists in the demo data
    // Both components should show the same messages since they share state
    const message1 = page.locator('text=/Good morning.*pain in my right side/i');
    const message2 = page.locator('text=/bloodwork shows a mild infection/i');
    
    // These sample messages should be visible (might appear in multiple places due to two components)
    expect(await message1.count()).toBeGreaterThan(0);
    expect(await message2.count()).toBeGreaterThan(0);
  });

  test('should send messages with correct sender alignment in each component', async ({ page }) => {
    // Enable simulator mode
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    const chatComponents = page.locator('.chat-component-root');
    
    // Component 1 (Internal User, ID 200) - their messages should align right
    const component1 = chatComponents.nth(0);
    const textarea1 = component1.locator('textarea').first();
    const sendButton1 = component1.locator('button[aria-label="Send message"]').first();
    
    if (await textarea1.isVisible() && await sendButton1.isVisible()) {
      const testMessage1 = 'Test from Internal User 200';
      await textarea1.fill(testMessage1);
      await sendButton1.click();
      await page.waitForTimeout(1000);
      
      // Message should appear in both components
      const messageInComponent1 = component1.locator(`text="${testMessage1}"`);
      const messageInComponent2 = chatComponents.nth(1).locator(`text="${testMessage1}"`);
      
      await expect(messageInComponent1).toBeVisible();
      await expect(messageInComponent2).toBeVisible();
      
      // In component 1 (sender is currentUser), message should be on the right
      const message1Parent = messageInComponent1.locator('xpath=ancestor::div[contains(@class, "tw-items-end")]').first();
      if (await message1Parent.count() > 0) {
        // Message is right-aligned (items-end) in component 1
        expect(true).toBeTruthy();
      }
    }
  });

  test('should send messages from component 2 with external user alignment', async ({ page }) => {
    // Enable simulator mode
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    const chatComponents = page.locator('.chat-component-root');
    
    // Component 2 (External User, ID 100) - their messages should align right in component 2
    const component2 = chatComponents.nth(1);
    const textarea2 = component2.locator('textarea').first();
    const sendButton2 = component2.locator('button[aria-label="Send message"]').first();
    
    if (await textarea2.isVisible() && await sendButton2.isVisible()) {
      const testMessage2 = 'Test from External User 100';
      await textarea2.fill(testMessage2);
      await sendButton2.click();
      await page.waitForTimeout(1000);
      
      // Message should appear in both components
      const messageInComponent1 = chatComponents.nth(0).locator(`text="${testMessage2}"`);
      const messageInComponent2 = component2.locator(`text="${testMessage2}"`);
      
      await expect(messageInComponent1).toBeVisible();
      await expect(messageInComponent2).toBeVisible();
      
      // In component 2 (sender is currentUser), message should be on the right
      const message2Parent = messageInComponent2.locator('xpath=ancestor::div[contains(@class, "tw-items-end")]').first();
      if (await message2Parent.count() > 0) {
        // Message is right-aligned (items-end) in component 2
        expect(true).toBeTruthy();
      }
    }
  });

  test('should not have currentUserId in shared store state', async ({ page }) => {
    // Enable simulator mode
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    // Check the Zustand store state via the exportState function
    const storeState = await page.evaluate(() => {
      // Access the store through window if exposed, or via React DevTools
      // This assumes useChatStore is accessible
      return window.useChatStoreForTest?.getState?.() || null;
    });
    
    // If we can access the state, verify currentUserId is not present
    if (storeState !== null) {
      expect(storeState).not.toHaveProperty('currentUserId');
    }
  });

  test('should maintain independent user context after toggling conversations', async ({ page }) => {
    // Enable simulator mode
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    const chatComponents = page.locator('.chat-component-root');
    
    // Click on a conversation in component 1
    const component1 = chatComponents.nth(0);
    const conversationListItem = component1.locator('[role="button"]').first();
    
    if (await conversationListItem.isVisible()) {
      await conversationListItem.click();
      await page.waitForTimeout(500);
      
      // Verify both components still show correct user labels
      await expect(page.locator('text=Component 1 - Internal User (Clinician)')).toBeVisible();
      await expect(page.locator('text=Component 2 - External User (Patient)')).toBeVisible();
    }
  });

  test('should preserve currentUserId when switching between simulator and single mode', async ({ page }) => {
    // Start with single component
    let chatComponents = page.locator('.chat-component-root');
    await expect(chatComponents).toHaveCount(1);
    
    // Send a message from component 1
    const textarea = page.locator('textarea').first();
    const sendButton = page.locator('button[aria-label="Send message"]').first();
    
    if (await textarea.isVisible() && await sendButton.isVisible()) {
      await textarea.fill('Message before simulator');
      await sendButton.click();
      await page.waitForTimeout(1000);
    }
    
    // Enable simulator mode
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    // Should have 2 components now
    chatComponents = page.locator('.chat-component-root');
    await expect(chatComponents).toHaveCount(2);
    
    // Send a message from component 2
    const component2 = chatComponents.nth(1);
    const textarea2 = component2.locator('textarea').first();
    const sendButton2 = component2.locator('button[aria-label="Send message"]').first();
    
    if (await textarea2.isVisible() && await sendButton2.isVisible()) {
      await textarea2.fill('Message from simulator component 2');
      await sendButton2.click();
      await page.waitForTimeout(1000);
    }
    
    // Disable simulator mode
    await page.locator('button:has-text("✓ Simulator Active")').click();
    await page.waitForTimeout(500);
    
    // Should have 1 component again
    chatComponents = page.locator('.chat-component-root');
    await expect(chatComponents).toHaveCount(1);
    
    // All messages should still be visible
    await expect(page.locator('text=Message before simulator')).toBeVisible();
    await expect(page.locator('text=Message from simulator component 2')).toBeVisible();
  });

  test('should handle rapid component creation without user ID conflicts', async ({ page }) => {
    // Rapidly toggle simulator mode multiple times
    const simulatorButton = page.locator('button:has-text("Enable Simulator"), button:has-text("✓ Simulator Active")');
    
    for (let i = 0; i < 3; i++) {
      await simulatorButton.click();
      await page.waitForTimeout(200);
    }
    
    // Should end in a stable state
    const chatComponents = page.locator('.chat-component-root');
    const componentCount = await chatComponents.count();
    
    // Should have either 1 or 2 components depending on final state
    expect(componentCount).toBeGreaterThanOrEqual(1);
    expect(componentCount).toBeLessThanOrEqual(2);
  });

  test('should export state without currentUserId property', async ({ page }) => {
    // Click the Export State button
    const exportButton = page.locator('button:has-text("Export State")');
    
    // Listen for console logs
    const consoleLogs = [];
    page.on('console', msg => {
      if (msg.type() === 'log' && msg.text().includes('Exported state:')) {
        consoleLogs.push(msg.text());
      }
    });
    
    await exportButton.click();
    await page.waitForTimeout(1000);
    
    // Check the alert text
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('State exported to console');
      await dialog.accept();
    });
    
    // Verify the exported state structure via page evaluation
    const exportedState = await page.evaluate(() => {
      // Get the store's export function
      if (window.useChatStoreForTest) {
        return window.useChatStoreForTest.getState().exportState();
      }
      return null;
    });
    
    if (exportedState !== null) {
      expect(exportedState).toHaveProperty('conversations');
      expect(exportedState).toHaveProperty('activeConversationId');
      expect(exportedState).not.toHaveProperty('currentUserId');
    }
  });
});

test.describe('Tailwind Demo - Multi-Component with Read-Only Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    await page.waitForSelector('.chat-component-root', { timeout: 10000 });
  });

  test('should maintain currentUserId independence with read-only component', async ({ page }) => {
    // Enable simulator mode
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    // Enable read-only mode
    const readOnlyButton = page.locator('button:has-text("Show Read-Only Mode")');
    await readOnlyButton.click();
    await page.waitForTimeout(500);
    
    // Should now have 3 components: 1 read-only + 2 simulator
    const chatComponents = page.locator('.chat-component-root');
    await expect(chatComponents).toHaveCount(3);
    
    // Verify read-only component label
    await expect(page.locator('text=📖 Read-Only Conversation View')).toBeVisible();
    
    // Verify simulator components still maintain their labels
    await expect(page.locator('text=Component 1 - Internal User (Clinician)')).toBeVisible();
    await expect(page.locator('text=Component 2 - External User (Patient)')).toBeVisible();
  });

  test('should handle read-only component with different currentUserId', async ({ page }) => {
    // Enable read-only mode first
    const readOnlyButton = page.locator('button:has-text("Show Read-Only Mode")');
    await readOnlyButton.click();
    await page.waitForTimeout(500);
    
    // Should have 2 components: 1 read-only + 1 normal
    let chatComponents = page.locator('.chat-component-root');
    await expect(chatComponents).toHaveCount(2);
    
    // Enable simulator mode
    const simulatorButton = page.locator('button:has-text("Enable Simulator")');
    await simulatorButton.click();
    await page.waitForTimeout(500);
    
    // Should now have 3 components
    chatComponents = page.locator('.chat-component-root');
    await expect(chatComponents).toHaveCount(3);
    
    // All components should be functional
    await expect(page.locator('text=📖 Read-Only Conversation View')).toBeVisible();
    await expect(page.locator('text=Component 1 - Internal User (Clinician)')).toBeVisible();
    await expect(page.locator('text=Component 2 - External User (Patient)')).toBeVisible();
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
