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
