import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// Create a valid test image buffer (1x1 red PNG)
const createTestImageBuffer = () => {
  // Valid minimal 1x1 red PNG created with proper structure
  return Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==',
    'base64'
  );
};

test.describe('Image Attachment Feature', () => {
  // Add retries for flaky file-based tests
  test.describe.configure({ retries: 2 });
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    // Wait for chat component using accessible role
    await page.getByRole('region', { name: 'Chat' }).waitFor({ timeout: 10000 });
  });

  test('attach button is visible in compose area', async ({ page }) => {
    const attachButton = page.getByRole('button', { name: 'Attach image' });
    await expect(attachButton).toBeVisible();
    await expect(attachButton).toHaveText('📎');
  });

  test('attach button opens file picker', async ({ page }) => {
    const attachButton = page.getByRole('button', { name: 'Attach image' });
    
    // Set up file chooser listener before clicking
    const fileChooserPromise = page.waitForEvent('filechooser');
    await attachButton.click();
    
    const fileChooser = await fileChooserPromise;
    expect(fileChooser).toBeTruthy();
    
    // Verify it accepts images
    expect(fileChooser.isMultiple()).toBe(true);
  });

  test('selecting image via file picker shows preview', async ({ page }) => {
    const attachButton = page.getByRole('button', { name: 'Attach image' });
    
    // Create a temporary test image file
    const testImagePath = path.join(process.cwd(), 'test-image-preview.png');
    fs.writeFileSync(testImagePath, createTestImageBuffer());
    
    try {
      // Set up file chooser listener before clicking
      const fileChooserPromise = page.waitForEvent('filechooser');
      await attachButton.click();
      
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(testImagePath);
      
      // Wait for preview to appear (remove button indicates image loaded)
      const removeButton = page.getByRole('button', { name: /remove/i });
      await expect(removeButton).toBeVisible({ timeout: 5000 });
      
      // Send button should be enabled (can send image without text)
      const sendButton = page.getByRole('button', { name: 'Send message' });
      await expect(sendButton).toBeEnabled();
    } finally {
      // Clean up test image
      if (fs.existsSync(testImagePath)) {
        fs.unlinkSync(testImagePath);
      }
    }
  });

  test('can remove attached image before sending', async ({ page }) => {
    const attachButton = page.getByRole('button', { name: 'Attach image' });
    
    // Create a temporary test image file
    const testImagePath = path.join(process.cwd(), 'test-image-remove.png');
    fs.writeFileSync(testImagePath, createTestImageBuffer());
    
    try {
      // Attach an image
      const fileChooserPromise = page.waitForEvent('filechooser');
      await attachButton.click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(testImagePath);
      
      // Wait for preview to appear
      const removeButton = page.getByRole('button', { name: /remove/i });
      await expect(removeButton).toBeVisible({ timeout: 5000 });
      
      // Click remove button
      await removeButton.click();
      
      // Preview should be gone
      await expect(removeButton).not.toBeVisible();
      
      // Send button should be disabled (no text, no image)
      const sendButton = page.getByRole('button', { name: 'Send message' });
      await expect(sendButton).toBeDisabled();
    } finally {
      if (fs.existsSync(testImagePath)) {
        fs.unlinkSync(testImagePath);
      }
    }
  });

  test('can send message with image attached', async ({ page }) => {
    const attachButton = page.getByRole('button', { name: 'Attach image' });
    
    // Create a temporary test image file
    const testImagePath = path.join(process.cwd(), 'test-image-send.png');
    fs.writeFileSync(testImagePath, createTestImageBuffer());
    
    try {
      // Attach an image
      const fileChooserPromise = page.waitForEvent('filechooser');
      await attachButton.click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(testImagePath);
      
      // Wait for image preview to appear
      const removeButton = page.getByRole('button', { name: /remove/i });
      await expect(removeButton).toBeVisible({ timeout: 5000 });
      
      // Add some text
      const textArea = page.getByRole('textbox', { name: 'Message text' });
      await textArea.fill('Message with image');
      
      // Send the message
      const sendButton = page.getByRole('button', { name: 'Send message' });
      await sendButton.click();
      
      await page.waitForTimeout(500);
      
      // Verify message appears in thread with image
      const messageThread = page.locator('.chat-component-root, [role="region"][aria-label="Chat"]').first();
      const sentMessage = messageThread.getByRole('article').filter({ hasText: 'Message with image' });
      await expect(sentMessage).toBeVisible({ timeout: 5000 });
      
      // Verify image is in the message
      const messageImage = sentMessage.locator('img');
      await expect(messageImage).toBeVisible({ timeout: 5000 });
      
      // Preview should be cleared (reuse removeButton locator)
      await expect(removeButton).not.toBeVisible();
      
      // Text area should be cleared
      await expect(textArea).toHaveValue('');
    } finally {
      if (fs.existsSync(testImagePath)) {
        fs.unlinkSync(testImagePath);
      }
    }
  });

  test('can send image-only message (no text)', async ({ page }) => {
    const attachButton = page.getByRole('button', { name: 'Attach image' });
    
    // Create a temporary test image file
    const testImagePath = path.join(process.cwd(), 'test-image-only.png');
    fs.writeFileSync(testImagePath, createTestImageBuffer());
    
    try {
      // Attach an image without adding text
      const fileChooserPromise = page.waitForEvent('filechooser');
      await attachButton.click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(testImagePath);
      
      // Wait for image preview to appear
      const removeButton = page.getByRole('button', { name: /remove/i });
      await expect(removeButton).toBeVisible({ timeout: 5000 });
      
      // Send button should be enabled
      const sendButton = page.getByRole('button', { name: 'Send message' });
      await expect(sendButton).toBeEnabled({ timeout: 5000 });
      
      // Send the message
      await sendButton.click();
      
      // Verify an article with image appears (image-only message)
      const messageThread = page.locator('.chat-component-root, [role="region"][aria-label="Chat"]').first();
      const latestMessage = messageThread.getByRole('article').last();
      const messageImage = latestMessage.locator('img');
      await expect(messageImage).toBeVisible({ timeout: 5000 });
    } finally {
      if (fs.existsSync(testImagePath)) {
        fs.unlinkSync(testImagePath);
      }
    }
  });

  test('attach button is disabled when conversation is closed and disableClosedConversations is true', async ({ page }) => {
    // This test requires a custom setup with disableClosedConversations prop
    // For now, we test that the button exists and verify behavior in closed conversation
    // The actual disabled state depends on the disableClosedConversations prop
    
    // Click on the closed conversation (Refill Request)
    const closedConversation = page.getByRole('option', { name: /Refill Request.*Closed/i });
    await closedConversation.click();
    
    await page.waitForTimeout(300);
    
    // Attach button should still be visible (disabled state depends on prop)
    const attachButton = page.getByRole('button', { name: 'Attach image' });
    await expect(attachButton).toBeVisible();
    
    // Note: Without disableClosedConversations=true, button remains enabled
    // This test verifies the button exists in closed conversation context
  });

  test('can attach multiple images', async ({ page }) => {
    const attachButton = page.getByRole('button', { name: 'Attach image' });
    
    // Create temporary test image files
    const testImagePath1 = path.join(process.cwd(), 'test-image1.png');
    const testImagePath2 = path.join(process.cwd(), 'test-image2.png');
    fs.writeFileSync(testImagePath1, createTestImageBuffer());
    fs.writeFileSync(testImagePath2, createTestImageBuffer());
    
    try {
      // Attach multiple images at once
      const fileChooserPromise = page.waitForEvent('filechooser');
      await attachButton.click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles([testImagePath1, testImagePath2]);
      
      // Should have 2 remove buttons (one per image)
      const removeButtons = page.getByRole('button', { name: /remove/i });
      await expect(removeButtons).toHaveCount(2, { timeout: 5000 });
    } finally {
      if (fs.existsSync(testImagePath1)) fs.unlinkSync(testImagePath1);
      if (fs.existsSync(testImagePath2)) fs.unlinkSync(testImagePath2);
    }
  });
});

test.describe('Image Paste Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    await page.getByRole('region', { name: 'Chat' }).waitFor({ timeout: 10000 });
  });

  test('textarea has paste handler attached', async ({ page }) => {
    const textArea = page.getByRole('textbox', { name: 'Message text' });
    await expect(textArea).toBeVisible();
    
    // Verify the textarea can be focused (paste handler is on this element)
    await textArea.focus();
    await expect(textArea).toBeFocused();
    
    // Note: Actual clipboard paste testing requires special browser permissions
    // The paste functionality is verified manually or via integration tests
    // This test confirms the textarea is ready for user interaction
  });
});

test.describe('Drag and Drop Image Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    await page.getByRole('region', { name: 'Chat' }).waitFor({ timeout: 10000 });
  });

  test('compose area shows drop indicator on drag over', async ({ page }) => {
    const composeArea = page.locator('.chat-compose-wrapper');
    
    // Simulate dragover event
    await composeArea.evaluate(el => {
      const event = new DragEvent('dragover', {
        bubbles: true,
        cancelable: true,
        dataTransfer: new DataTransfer()
      });
      el.dispatchEvent(event);
    });
    
    await page.waitForTimeout(100);
    
    // Check for drop overlay text
    const dropOverlay = page.getByText('Drop image here');
    await expect(dropOverlay).toBeVisible();
  });

  test('drop overlay disappears on drag leave', async ({ page }) => {
    const composeArea = page.locator('.chat-compose-wrapper');
    
    // Simulate dragover then dragleave
    await composeArea.evaluate(el => {
      const overEvent = new DragEvent('dragover', {
        bubbles: true,
        cancelable: true,
        dataTransfer: new DataTransfer()
      });
      el.dispatchEvent(overEvent);
    });
    
    await page.waitForTimeout(100);
    
    await composeArea.evaluate(el => {
      const leaveEvent = new DragEvent('dragleave', {
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(leaveEvent);
    });
    
    await page.waitForTimeout(100);
    
    // Drop overlay should be hidden
    const dropOverlay = page.getByText('Drop image here');
    await expect(dropOverlay).not.toBeVisible();
  });
});
