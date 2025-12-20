import { test, expect } from '@playwright/test';

test.describe('Dual Chat Message Display', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo-tailwind.html');
    // Wait for chat component using accessible role
    await page.getByRole('region', { name: 'Chat' }).waitFor({ timeout: 10000 });
    
    // Enable simulator mode using button text
    await page.getByRole('button', { name: 'Enable Simulator' }).click();
    await page.waitForTimeout(300);
  });

  test('message appears in both Clinic and Patient views with correct alignment and color', async ({ page }) => {
    // Get both chat component regions using accessible role
    const chatComponents = page.getByRole('region', { name: 'Chat' });
    await expect(chatComponents).toHaveCount(2);
    
    const clinicChat = chatComponents.nth(0);
    const patientChat = chatComponents.nth(1);
    
    // Send a message from Clinic (currentUserId=200)
    const testMessage = 'Test message from clinic';
    await clinicChat.getByRole('textbox', { name: 'Message text' }).fill(testMessage);
    await clinicChat.getByRole('button', { name: 'Send message' }).click();
    await page.waitForTimeout(500);
    
    // Verify message appears in both views
    const clinicMessage = clinicChat.getByRole('article').filter({ hasText: testMessage });
    const patientMessage = patientChat.getByRole('article').filter({ hasText: testMessage });
    
    await expect(clinicMessage).toBeVisible();
    await expect(patientMessage).toBeVisible();
    
    // Verify alignment: right in Clinic view, left in Patient view
    await expect(clinicMessage).toHaveAttribute('data-alignment', 'right');
    await expect(patientMessage).toHaveAttribute('data-alignment', 'left');
    
    // Verify colors - find the paragraph element containing the message
    const clinicBubble = clinicMessage.getByRole('paragraph');
    const patientBubble = patientMessage.getByRole('paragraph');
    
    // Get computed background colors
    const clinicColor = await clinicBubble.evaluate(el => getComputedStyle(el).backgroundColor);
    const patientColor = await patientBubble.evaluate(el => getComputedStyle(el).backgroundColor);
    
    // Sender's view should have different color than recipient's view
    expect(clinicColor).not.toBe(patientColor);
    expect(clinicColor).not.toBe('rgba(0, 0, 0, 0)'); // Not transparent
    expect(patientColor).not.toBe('rgba(0, 0, 0, 0)');
  });
});
