# Playwright Tests

This directory contains end-to-end tests for the chat component using Playwright.

## Test Files

### `demo.spec.js`
Tests the demo menu page and navigation between different demo versions.

### `chat-component.spec.js`
Tests the core functionality of the chat component:
- UI rendering
- Conversation list display
- Compose area functionality
- Responsive design
- User interactions

### `accessibility.spec.js`
Tests accessibility features:
- ARIA labels and roles
- Keyboard navigation
- Focus indicators
- Semantic HTML
- Screen reader support

### `i18n.spec.js`
Tests internationalization support:
- LTR/RTL layouts
- Unicode character support
- Text expansion handling
- Language attributes

### `tailwind-simulator.spec.js`
Tests the Tailwind demo simulator functionality:
- Simulator toggle button
- Dual component rendering
- Shared state between components
- Message alignment based on sender
- Component labeling (Internal vs External user)
- Responsive layout in simulator mode
- Rapid toggling stability

### `system-messages.spec.js`
Tests system message functionality:
- System message creation when new conversation is created
- Center alignment of system messages
- Yellow background styling (distinct from regular messages)
- No sender name displayed for system messages
- Timestamp display
- Visual distinction from regular messages
- Proper rendering with text-center alignment
- Handling multiple system messages in a conversation
- No channel icons displayed for system messages

### `link-builder.spec.js`
Tests custom link builder functionality for references.

### `bootstrap-readonly.spec.js`
Tests readonly mode functionality in Bootstrap demo:
- ReadOnly prop checkbox in Component Props Editor
- Enabling/disabling readonly mode via props
- Sidebar and compose area visibility toggling
- Message thread display in readonly mode
- No interactive elements in readonly mode
- State restoration when disabling readonly mode
- Conversation data preservation during toggles
- Reset to Defaults button functionality
- Conversation prop injection in readonly mode
- Handling different active conversations in readonly mode
- Readonly mode with prop combinations
- Handling closed conversations in readonly mode
- Bootstrap/Tailwind style isolation
- Rapid toggling stability
- Accessibility in readonly mode
- Error handling and edge cases

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run specific test file
```bash
npx playwright test tests/chat-component.spec.js
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Debug tests
```bash
npx playwright test --debug
```

### View test report
```bash
npx playwright show-report
```

## Test Structure

All tests follow Playwright's best practices:
- Use `test.describe()` to group related tests
- Use `test.beforeEach()` for common setup
- Use appropriate selectors (prefer data-testid, then accessible selectors)
- Include proper assertions with `expect()`
- Handle async operations with `await`

## Screenshots

The `screenshots/` directory stores screenshots taken during accessibility tests for manual verification of visual aspects like contrast ratios and focus indicators.

## Test Coverage

### Component Tests

#### ChatComponent
- ✅ Renders with default props
- ✅ Loads initial data correctly
- ✅ Sets initial active conversation
- ✅ Syncs currentUserId with store
- ✅ Triggers onMessageSent callback
- ✅ Triggers onConversationOpened callback
- ✅ Triggers onConversationCreated callback
- ✅ Renders in read-only mode
- ✅ Hides New button when hideNewButton is true
- ✅ Hides toggle button when hideToggleButton is true
- ✅ Hides delivery method dropdown when hideDeliveryMethod is true
- ✅ Disables compose area for closed conversations when disableClosedConversations is true

## Running Specific Tests

```bash
# Test callbacks
npm test -- --grep "callbacks"

# Test read-only mode
npm test -- --grep "read-only"

# Test UI controls
npm test -- --grep "hideNewButton|hideToggleButton"

# Test closed conversation behavior
npm test -- --grep "disableClosedConversations"
```
