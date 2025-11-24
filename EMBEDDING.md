# Embedding the Chat Component

This guide explains how to embed the chat component into your HTML page and integrate it with your application's data and messaging system.

## Quick Start

### 1. Include the Component Bundle

Add a single script tag to your HTML page. All dependencies (React, ReactDOM, Zustand) are bundled together:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App with Chat Component</title>
</head>
<body>
  <!-- Your existing page content -->
  <div id="chat-container"></div>

  <!-- Single bundle with all dependencies included -->
  <script src="https://unpkg.com/@mieweb/chat-component/dist/chat-component.bundle.js"></script>
  
  <script>
    // Initialize the chat component (see below)
  </script>
</body>
</html>
```

> **Note:** The bundle includes React, ReactDOM, and Zustand. You don't need to manage any dependencies separately.

### Self-Hosting Option

If you prefer to self-host the bundle:

```html
<!-- Download the bundle and host it on your server -->
<script src="/path/to/your/chat-component.bundle.js"></script>
```

You can download the bundle from the npm package or build it yourself (see [Building](#building-the-bundle) below).

### 2. Initialize the Component

```javascript
// Initialize the chat component
const ChatComponent = window.ChatComponent.default;
const useChatStore = window.ChatComponent.useChatStore;

const root = ReactDOM.createRoot(document.getElementById('chat-container'));

// Render the component
root.render(
  React.createElement(ChatComponent, {
    onMessageSent: handleMessageSent,
    height: '600px',
    maxWidth: '1200px'
  })
);

// Handle messages sent from the component
function handleMessageSent(data) {
  console.log('Message sent:', data);
  // Send to your backend API
  sendToBackend(data);
}
```

## Loading Initial Conversations

### Option 1: Load Data on Initialization

```javascript
// Your conversation data from your backend
const conversationsData = {
  conversations: [
    {
      id: 735,
      title: 'Patient: John Doe',
      open: true,
      unread: false,
      lastActivity: '2025-10-29 14:30',
      thread: [
        {
          type: 'message',
          role: 'patient',
          senderId: 100,
          channel: 'portal',
          time: '2025-10-29 14:15',
          text: 'I have a question about my medication.'
        },
        {
          type: 'message',
          role: 'physician',
          senderId: 200,
          channel: 'portal',
          time: '2025-10-29 14:30',
          text: 'Sure, what would you like to know?'
        }
      ]
    }
  ],
  activeConversationId: 735
};

// Load the data after component mounts
setTimeout(() => {
  const store = useChatStore.getState();
  store.loadConversations(conversationsData);
}, 100);
```

### Option 2: Fetch from API

```javascript
async function loadConversationsFromAPI() {
  try {
    const response = await fetch('/api/conversations');
    const data = await response.json();
    
    const store = useChatStore.getState();
    store.loadConversations(data);
  } catch (error) {
    console.error('Failed to load conversations:', error);
  }
}

// Call after component is mounted
setTimeout(loadConversationsFromAPI, 100);
```

## Receiving Messages from External Sources

To inject messages into the component (e.g., from WebSocket, SSE, or polling):

```javascript
// Example: WebSocket connection
const ws = new WebSocket('wss://your-server.com/chat');

ws.onmessage = (event) => {
  const incomingMessage = JSON.parse(event.data);
  
  // Add message to the active conversation
  const store = useChatStore.getState();
  store.addMessage({
    text: incomingMessage.text,
    channel: incomingMessage.channel || 'auto',
  });
};

// Example: Polling
setInterval(async () => {
  const response = await fetch('/api/messages/new');
  const newMessages = await response.json();
  
  const store = useChatStore.getState();
  newMessages.forEach(msg => {
    store.addMessage({
      text: msg.text,
      channel: msg.channel,
    });
  });
}, 5000); // Poll every 5 seconds
```

## Sending Messages to Your Backend

Handle the `onMessageSent` callback to send messages to your server:

```javascript
function handleMessageSent(data) {
  // data contains: { text, channel, conversationId, timestamp }
  
  fetch('/api/messages/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      conversationId: data.conversationId,
      text: data.text,
      channel: data.channel,
      timestamp: data.timestamp,
    })
  })
  .then(response => response.json())
  .then(result => {
    console.log('Message sent successfully:', result);
  })
  .catch(error => {
    console.error('Failed to send message:', error);
    // Optionally show error to user
  });
}
```

## Data Format Reference

### Conversation Object

```javascript
{
  id: 735,              // Unique conversation ID (integer)
  title: 'string',           // Display title
  open: boolean,             // true = open, false = closed
  unread: boolean,           // true if has unread messages
  lastActivity: 'string',    // Format: 'YYYY-MM-DD HH:MM'
  thread: [                  // Array of thread items (see below)
    // ... messages, labs, imaging, events
  ]
}
```

### Message Types

#### Patient/Physician Message
```javascript
{
  type: 'message',
  role: 'patient' | 'physician',
  senderId: 100,  // Integer user/patient ID
  channel: 'auto' | 'portal' | 'sms' | 'voicemail',
  time: '2025-10-29 14:30',
  text: 'Message content here'
}
```

#### Lab Result
```javascript
{
  type: 'lab',
  time: '2025-10-29 10:00',
  title: 'CBC Result',
  summary: 'WBC elevated (12.3), mild neutrophilia.',
  lastComment: 'Reviewed by Dr. Smith: Consistent with infection.'
}
```

#### Imaging Result
```javascript
{
  type: 'imaging',
  time: '2025-10-29 11:00',
  title: 'Chest X-ray',
  interpretation: 'No acute findings.',
  radiologist: 'No evidence of pneumonia.'
}
```

#### Event (Rx, Appointment, etc.)
```javascript
{
  type: 'event',
  eventType: 'rx' | 'appt' | 'other',
  time: '2025-10-29 12:00',
  title: 'Prescription Sent',
  summary: 'Lisinopril 10mg #90',
  note: 'E-prescribed to CVS Pharmacy.'
}
```

## Advanced Integration

### Listening to Store Changes

```javascript
// Subscribe to store changes
const unsubscribe = useChatStore.subscribe(
  (state) => state.conversations,
  (conversations) => {
    console.log('Conversations updated:', conversations);
    // Sync to your backend if needed
  }
);

// Unsubscribe when done
// unsubscribe();
```

### Programmatically Controlling the Component

```javascript
const store = useChatStore.getState();

// Switch to a different conversation
store.setActiveConversation('conv-456');

// Mark conversation as unread
store.markAsUnread('conv-123');

// Toggle conversation open/closed status
store.toggleConversationStatus('conv-123');

// Create a new conversation
const newConv = store.createConversation('New Patient: Jane Smith');

// Export current state (for debugging or persistence)
const currentState = store.exportState();
console.log(currentState);
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Medical Chat System</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 20px;
      background: #f5f5f5;
    }
    #chat-container {
      max-width: 1200px;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <h1>Medical Chat System</h1>
  <div id="chat-container"></div>

  <!-- Single bundle with all dependencies included -->
  <script src="https://unpkg.com/@mieweb/chat-component/dist/chat-component.bundle.js"></script>
  
  <script>
    const ChatComponent = window.ChatComponent.default;
    const useChatStore = window.ChatComponent.useChatStore;
    
    // Initialize component
    const root = ReactDOM.createRoot(document.getElementById('chat-container'));
    root.render(
      React.createElement(ChatComponent, {
        onMessageSent: handleMessageSent,
        height: '600px',
        maxWidth: '100%'
      })
    );
    
    // Load initial data
    loadInitialData();
    
    // Setup WebSocket for real-time messages
    setupWebSocket();
    
    async function loadInitialData() {
      try {
        const response = await fetch('/api/conversations');
        const data = await response.json();
        
        setTimeout(() => {
          const store = useChatStore.getState();
          store.loadConversations(data);
        }, 100);
      } catch (error) {
        console.error('Failed to load conversations:', error);
      }
    }
    
    function handleMessageSent(data) {
      fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => console.log('Message sent:', result))
      .catch(error => console.error('Send failed:', error));
    }
    
    function setupWebSocket() {
      const ws = new WebSocket('wss://your-server.com/chat');
      
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const store = useChatStore.getState();
        
        store.addMessage({
          text: message.text,
          channel: message.channel || 'auto',
        });
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  </script>
</body>
</html>
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onMessageSent` | `function` | `undefined` | Callback when user sends a message. Receives `{ text, channel, conversationId, timestamp }` |
| `height` | `string` | `'600px'` | CSS height value for the component |
| `maxWidth` | `string` | `'1100px'` | Maximum width of the component |

## Styling

The component uses Tailwind CSS with the `tw-` prefix to avoid conflicts with your existing styles. All styles are scoped to the component.

If you need to override styles, you can use CSS specificity:

```css
/* Override specific styles if needed */
#chat-container .tw-bg-blue-500 {
  background-color: your-custom-color !important;
}
```

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android 80+

## Troubleshooting

### Component doesn't render
- Ensure all dependencies are loaded before initializing
- Check browser console for errors
- Verify the container element exists: `document.getElementById('chat-container')`

### Messages not appearing
- Check that `addMessage()` is called after the component mounts
- Verify the message format matches the expected schema
- Use `console.log(useChatStore.getState())` to inspect current state

### State not persisting
- The component uses in-memory state only
- Implement your own persistence by listening to state changes and syncing to localStorage or backend

## Building the Bundle

If you want to build the bundle yourself or customize it:

```bash
# Clone the repository
git clone https://github.com/mieweb/chat-component.git
cd chat-component

# Install dependencies
npm install

# Build the bundle (creates dist/chat-component.bundle.js)
npm run build:bundle

# The bundle includes:
# - React and ReactDOM
# - Zustand state management
# - All component code and styles
# - No external dependencies required
```

The bundle exposes the component on `window.ChatComponent`:

```javascript
window.ChatComponent = {
  default: ChatComponent,      // Main component
  useChatStore: useChatStore   // Store hook
}
```

## Need Help?

- Check the demo files in `/demo` for working examples
- Review the source code in `/src` for implementation details
- Open an issue on GitHub for bugs or feature requests
