# Attic - Removed Code

This directory contains code that has been removed from the active codebase but preserved for historical reference.

## Test.html, script.js, styles.css (Removed 2025-11-13)

**Why removed:** Replaced with React implementation

**Context:** The original vanilla JavaScript implementation with custom CSS has been fully replaced by the React-based component with Tailwind CSS. The legacy files were:
- `Test.html` - Original HTML page with inline styles
- `script.js` - Vanilla JavaScript for conversation management
- `styles.css` - Custom CSS styles

**Why replaced:**
- Modern React architecture with component-based design
- Zustand for better state management
- Tailwind CSS with `tw-` prefix for style encapsulation
- Better compatibility with modern frameworks (Bootstrap, Tailwind)
- Easier to maintain and extend
- Better developer experience

**Original purpose:** Demonstrated a clinical messaging interface with conversation sidebar using vanilla JavaScript.

## demo-bootstrap.jsx (Removed 2025-11-13)

**Why removed:** Replaced with pure HTML version (`demo-bootstrap.html`)

**Context:** The Bootstrap demo was originally implemented as a React JSX file, but was converted to a plain HTML page to better demonstrate how developers can embed the component without a build system. The HTML version:
- Shows cleaner embedding pattern
- Demonstrates vanilla JavaScript integration
- Provides better reference for developers using plain HTML
- Removes duplicate functionality (JSX version was redundant)

The Tailwind demo (`demo-tailwind.jsx`) was kept because it includes unique simulator functionality for testing two-way conversations.

**Original purpose:** Demonstrated embedding the chat component in a Bootstrap environment using React JSX.
