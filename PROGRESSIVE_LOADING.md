# Progressive Loading Infrastructure

The chat component now supports progressive loading of conversations and thread messages. This allows you to load data incrementally rather than all at once, improving performance for large datasets.

## Overview

Progressive loading is split into two main concerns:

1. **Conversation Metadata Loading** - Load conversation list items without their full message threads
2. **Thread Loading** - Load message threads for specific conversations on-demand

## API Methods

### Store Methods

The following methods are available in the Zustand store (`useChatStore`):

#### `loadConversationMetadata(conversationsList, options)`

Load conversation metadata without full thread data.

**Parameters:**
- `conversationsList` - Array of conversation objects with metadata
- `options` - Optional configuration object
  - `append` (boolean) - If true, appends to existing conversations. If false (default), replaces all conversations
  - `hasMore` (boolean) - Indicates if more conversations are available to load

**Conversation metadata structure:**
```javascript
{
  id: 123,                    // Conversation ID (will be parsed to integer)
  title: "Conversation Title",
  reference_id: "CASE-2025-001", // Optional: external reference identifier
  open: true,                 // Whether conversation is open/active
  unread: false,              // Whether there are unread messages
  lastActivity: "2025-10-30 13:18", // Last activity timestamp
  thread: []                  // Empty or partial thread array
}
```

**Example:**
```javascript
const store = useChatStore.getState();

// Load first page of conversations
store.loadConversationMetadata([
  { id: 1, title: "Conversation 1", open: true, unread: false, lastActivity: "2025-10-30 13:18" },
  { id: 2, title: "Conversation 2", open: true, unread: true, lastActivity: "2025-10-29 09:30" }
], { hasMore: true });

// Load next page (append)
store.loadConversationMetadata([
  { id: 3, title: "Conversation 3", open: false, unread: false, lastActivity: "2025-10-28 16:20" }
], { append: true, hasMore: false });
```

#### `setConversationsLoading(isLoading)`

Set the loading state for conversations list.

**Parameters:**
- `isLoading` (boolean) - Whether conversations are currently loading

**Example:**
```javascript
store.setConversationsLoading(true);
// ... fetch conversations ...
store.loadConversationMetadata(conversations);
store.setConversationsLoading(false);
```

#### `loadConversationThread(conversationId, threadItems, options)`

Load or append thread items to a specific conversation.

**Parameters:**
- `conversationId` - ID of the conversation to load thread for
- `threadItems` - Array of thread items (messages, labs, imaging, events)
- `options` - Optional configuration object
  - `append` (boolean) - If true, appends to existing thread. If false (default), replaces thread
  - `hasMore` (boolean) - Indicates if more thread items are available to load

**Thread item types:**
```javascript
// Message
{
  type: 'message',
  role: 'external' | 'internal',
  senderId: 100,
  channel: 'sms' | 'portal' | 'voicemail' | 'auto',
  time: '2025-10-29 08:12',
  text: 'Message content'
}

// Lab result
{
  type: 'lab',
  time: '2025-10-29 08:30',
  title: 'Test Name',
  summary: 'Test results summary',
  lastComment: 'Provider comment'
}

// Imaging result
{
  type: 'imaging',
  time: '2025-10-29 09:10',
  title: 'Study Name',
  interpretation: 'Interpretation text',
  radiologist: 'Radiologist notes'
}

// Event
{
  type: 'event',
  eventType: 'appt' | 'rx' | 'other',
  time: '2025-10-27 10:40',
  title: 'Event Title',
  summary: 'Event summary',
  note: 'Additional notes'
}
```

**Example:**
```javascript
// Load full thread for conversation
store.loadConversationThread(735, [
  { type: 'message', role: 'external', senderId: 100, channel: 'sms', time: '2025-10-29 08:12', text: 'Hello' },
  { type: 'message', role: 'internal', senderId: 200, channel: 'portal', time: '2025-10-29 08:35', text: 'Response' }
]);

// Append more messages (for pagination)
store.loadConversationThread(735, [
  { type: 'message', role: 'external', senderId: 100, channel: 'portal', time: '2025-10-29 09:22', text: 'Follow-up' }
], { append: true, hasMore: false });
```

#### `setThreadLoading(conversationId, isLoading)`

Set the loading state for a specific conversation's thread.

**Parameters:**
- `conversationId` - ID of the conversation
- `isLoading` (boolean) - Whether the thread is currently loading

**Example:**
```javascript
store.setThreadLoading(735, true);
// ... fetch thread items ...
store.loadConversationThread(735, threadItems);
// Loading state is automatically set to false by loadConversationThread
```

#### `getThreadLoadingState(conversationId)`

Get the loading state for a specific conversation's thread.

**Returns:** Object with `{ isLoading: boolean, hasMore: boolean }`

**Example:**
```javascript
const state = store.getThreadLoadingState(735);
if (state.hasMore && !state.isLoading) {
  // Load more thread items
}
```

### Store State

Access these state properties:

- `conversationsLoading` (boolean) - Whether conversations list is loading
- `conversationsHasMore` (boolean) - Whether more conversations are available
- `threadLoadingStates` (object) - Map of conversation IDs to their loading states

**Example:**
```javascript
const conversationsLoading = useChatStore(state => state.conversationsLoading);
const hasMore = useChatStore(state => state.conversationsHasMore);
const threadState = useChatStore(state => state.threadLoadingStates[735]);
```

## Usage Patterns

### Pattern 1: Load Conversations Progressively

```javascript
import useChatStore from './store';

async function loadInitialConversations() {
  const store = useChatStore.getState();
  
  store.setConversationsLoading(true);
  
  try {
    const response = await fetch('/api/conversations?limit=20&offset=0');
    const data = await response.json();
    
    store.loadConversationMetadata(data.conversations, {
      hasMore: data.hasMore
    });
  } catch (error) {
    console.error('Failed to load conversations:', error);
  } finally {
    store.setConversationsLoading(false);
  }
}

async function loadMoreConversations() {
  const store = useChatStore.getState();
  const currentCount = store.conversations.length;
  
  store.setConversationsLoading(true);
  
  try {
    const response = await fetch(`/api/conversations?limit=20&offset=${currentCount}`);
    const data = await response.json();
    
    store.loadConversationMetadata(data.conversations, {
      append: true,
      hasMore: data.hasMore
    });
  } catch (error) {
    console.error('Failed to load more conversations:', error);
  } finally {
    store.setConversationsLoading(false);
  }
}
```

### Pattern 2: Load Thread on Demand

```javascript
async function loadThreadWhenNeeded(conversationId) {
  const store = useChatStore.getState();
  const conversation = store.conversations.find(c => c.id === conversationId);
  
  // Check if thread is already loaded
  if (conversation?.threadLoaded) {
    return;
  }
  
  store.setThreadLoading(conversationId, true);
  
  try {
    const response = await fetch(`/api/conversations/${conversationId}/thread`);
    const data = await response.json();
    
    store.loadConversationThread(conversationId, data.thread, {
      hasMore: data.hasMore
    });
  } catch (error) {
    console.error('Failed to load thread:', error);
    store.setThreadLoading(conversationId, false);
  }
}

// Use in component
function ConversationList() {
  const setActiveConversation = useChatStore(state => state.setActiveConversation);
  
  const handleSelectConversation = async (conversationId) => {
    setActiveConversation(conversationId);
    await loadThreadWhenNeeded(conversationId);
  };
  
  // ... render conversations
}
```

### Pattern 3: Infinite Scroll for Thread Messages

```javascript
async function loadMoreThreadMessages(conversationId) {
  const store = useChatStore.getState();
  const conversation = store.conversations.find(c => c.id === conversationId);
  const threadState = store.getThreadLoadingState(conversationId);
  
  if (!threadState.hasMore || threadState.isLoading) {
    return;
  }
  
  const currentCount = conversation?.thread?.length || 0;
  store.setThreadLoading(conversationId, true);
  
  try {
    const response = await fetch(
      `/api/conversations/${conversationId}/thread?limit=20&offset=${currentCount}`
    );
    const data = await response.json();
    
    store.loadConversationThread(conversationId, data.thread, {
      append: true,
      hasMore: data.hasMore
    });
  } catch (error) {
    console.error('Failed to load more messages:', error);
    store.setThreadLoading(conversationId, false);
  }
}
```

### Pattern 4: React Component Integration

```javascript
import React from 'react';
import useChatStore from '../store';

function MessageThread() {
  const activeConversationId = useChatStore(state => state.activeConversationId);
  const conversation = useChatStore(state => 
    state.conversations.find(c => c.id === activeConversationId)
  );
  const threadState = useChatStore(state => 
    state.threadLoadingStates[activeConversationId]
  );
  
  // Load thread when conversation becomes active
  React.useEffect(() => {
    if (activeConversationId && !conversation?.threadLoaded) {
      loadThreadWhenNeeded(activeConversationId);
    }
  }, [activeConversationId, conversation?.threadLoaded]);
  
  if (!conversation) return null;
  
  return (
    <div className="message-thread">
      {threadState?.isLoading && conversation.thread.length === 0 && (
        <div className="loading">Loading messages...</div>
      )}
      
      {conversation.thread.map((item, idx) => (
        <ThreadItem key={idx} item={item} />
      ))}
      
      {threadState?.hasMore && (
        <button 
          onClick={() => loadMoreThreadMessages(activeConversationId)}
          disabled={threadState.isLoading}
        >
          {threadState.isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
```

## Backward Compatibility

The existing `loadConversations(data)` method continues to work for loading full conversations with all thread data at once. This is useful for:

- Development/testing with sample data
- Small datasets that don't need progressive loading
- Existing integrations that provide complete data upfront

```javascript
// Still works - loads everything at once
store.loadConversations({
  conversations: [
    {
      id: 1,
      title: "Conversation",
      open: true,
      unread: false,
      lastActivity: "2025-10-30 13:18",
      thread: [/* full thread array */]
    }
  ],
  activeConversationId: 1,
  currentUserId: 200
});
```

## Best Practices

1. **Load conversation metadata first** - Show users the list of conversations quickly
2. **Load threads on-demand** - Only load thread details when a conversation is opened
3. **Use pagination** - Load threads in chunks to avoid overwhelming the UI
4. **Track loading states** - Show loading indicators to provide feedback
5. **Cache loaded data** - Use the `threadLoaded` flag to avoid reloading
6. **Handle errors gracefully** - Always wrap API calls in try/catch blocks
7. **Clean up state** - Reset loading states appropriately

## Migration Guide

If you have existing code using `loadConversations`, you can migrate to progressive loading:

**Before:**
```javascript
// Load everything at once
const data = await fetchAllConversationsWithThreads();
store.loadConversations(data);
```

**After:**
```javascript
// Load conversations first
const conversations = await fetchConversationMetadata();
store.loadConversationMetadata(conversations);

// Load thread when needed
async function onConversationSelected(id) {
  const thread = await fetchConversationThread(id);
  store.loadConversationThread(id, thread);
}
```

This approach reduces initial load time and improves perceived performance.
