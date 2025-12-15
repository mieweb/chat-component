# Sample Data Configuration

## Overview

The chat component store now starts **empty by default** when embedded in applications. Sample conversation data is only injected in demo environments for testing and demonstration purposes.

## Files

### `src/sample-data.js`
Contains the sample conversation data that was previously hard-coded in the store. This module exports:
- `sampleConversations` - Array of demo conversation objects
- `sampleActiveConversationId` - Default active conversation ID
- `sampleCurrentUserId` - Default current user ID
- `getDemoInitialState()` - Helper function that returns complete demo state

### `src/store.js`
The Zustand store now initializes with empty state:
```javascript
conversations: [],
activeConversationId: null,
currentUserId: null,
```

## Demo Configuration

### Tailwind Demo (`demo/demo-tailwind.jsx`)
Loads sample data on mount using a `useEffect` hook:
```javascript
useEffect(() => {
  const demoData = getDemoInitialState();
  useChatStore.getState().loadConversations(demoData);
}, []);
```

### Bootstrap Demo (`demo-bootstrap.html`)
Injects sample data via inline script after the component bundle loads:
```javascript
const sampleData = { /* ... sample conversations ... */ };
ChatComponent.useChatStore.getState().loadConversations(sampleData);
```

## Embedding in Production

When embedding the component in your application, the store starts empty. You should:

1. Load conversation data from your backend API
2. Use `loadConversations()` or `loadConversationMetadata()` to populate the store
3. Set the `currentUserId` prop to identify the current user

Example:
```javascript
import ChatComponent from '@mieweb/chat-component';
import { useChatStore } from '@mieweb/chat-component';

// Fetch your data
const conversationData = await fetchConversations();

// Load into store
useChatStore.getState().loadConversations({
  conversations: conversationData,
  activeConversationId: conversationData[0]?.id,
  currentUserId: currentUser.id
});

// Render component
<ChatComponent 
  onMessageSent={handleMessage}
  currentUserId={currentUser.id}
/>
```

## Benefits

- **Clean embeddings**: No demo data pollutes production applications
- **Smaller initial bundle**: Sample data only loaded when needed
- **Flexible demos**: Easy to modify demo data without touching store logic
- **Single source of truth**: Sample data defined in one place (`sample-data.js`)
