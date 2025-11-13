# Chat Component

A React chat component with Tailwind CSS styling and Zustand state management, designed to be embeddable in both Bootstrap and Tailwind environments without style conflicts.

## Features

- **React-based**: Modern React component architecture
- **Tailwind CSS**: Styled with Tailwind CSS with `tw-` prefix for encapsulation
- **Zustand State Management**: Efficient in-memory state management
- **Bootstrap Compatible**: No style conflicts when embedded in Bootstrap pages
- **Message Callbacks**: Bubble up new messages to parent components
- **State Export/Import**: Save and restore conversation state
- **Responsive Design**: Mobile-friendly with collapsible sidebar
- **Multi-conversation Support**: Manage multiple conversation threads
- **Rich Message Types**: Support for messages, lab results, imaging reports, and events

## Installation

```bash
npm install @mieweb/chat-component
```

## Quick Start

### Basic Usage

```jsx
import ChatComponent from '@mieweb/chat-component';

function App() {
  const handleMessageSent = (data) => {
    console.log('New message:', data);
    // Handle the new message (e.g., send to server)
  };

  return (
    <ChatComponent 
      onMessageSent={handleMessageSent}
      height="500px"
      maxWidth="1100px"
    />
  );
}
```

### Usage in Bootstrap Page

```jsx
import ChatComponent from '@mieweb/chat-component';

function BootstrapPage() {
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Chat Interface</h5>
          <ChatComponent 
            height="500px"
            maxWidth="100%"
          />
        </div>
      </div>
    </div>
  );
}
```

### Usage in Tailwind Page

```jsx
import ChatComponent from '@mieweb/chat-component';

function TailwindPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Chat Interface</h2>
        <ChatComponent 
          height="500px"
          maxWidth="100%"
        />
      </div>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialData` | `Object` | `null` | Initial conversation data to load |
| `onMessageSent` | `Function` | `null` | Callback when a new message is sent |
| `className` | `String` | `''` | Additional CSS classes for the root element |
| `height` | `String` | `'500px'` | Height of the chat component |
| `maxWidth` | `String` | `'1100px'` | Maximum width of the chat component |

### onMessageSent Callback

The `onMessageSent` callback receives an object with:

```javascript
{
  conversationId: 'c1',
  message: {
    type: 'message',
    role: 'physician',
    channel: 'portal',
    time: '2025-10-30 14:25',
    text: 'Message text'
  }
}
```

## State Management

The component uses Zustand for state management. You can access the store directly:

```jsx
import { useChatStore } from '@mieweb/chat-component';

function MyComponent() {
  const exportState = useChatStore(state => state.exportState);
  const loadConversations = useChatStore(state => state.loadConversations);

  const handleExport = () => {
    const state = exportState();
    console.log('Current state:', state);
    // Save to localStorage, send to server, etc.
  };

  const handleLoad = (savedState) => {
    loadConversations(savedState);
  };

  return (
    <div>
      <button onClick={handleExport}>Export</button>
      {/* ... */}
    </div>
  );
}
```

### Available Store Methods

- `getActiveConversation()`: Get the currently active conversation
- `setActiveConversation(id)`: Set the active conversation by ID
- `addMessage(message)`: Add a message to the active conversation
- `updateConversation(id, updates)`: Update a conversation
- `toggleConversationStatus(id)`: Toggle conversation open/closed
- `markAsUnread(id)`: Mark a conversation as unread
- `createConversation(title)`: Create a new conversation
- `setSearchQuery(query)`: Set the search query
- `toggleSidebar()`: Toggle the sidebar (mobile)
- `loadConversations(data)`: Load conversation data
- `exportState()`: Export current state

## Data Format

### Conversation Object

```javascript
{
  id: 'c1',
  title: 'General Question',
  open: true,
  unread: false,
  lastActivity: '2025-10-29 09:30',
  thread: [
    // Message items (see below)
  ]
}
```

### Message Types

#### Regular Message

```javascript
{
  type: 'message',
  role: 'patient' | 'physician',
  channel: 'portal' | 'sms' | 'voicemail' | 'auto',
  time: '2025-10-29 08:12',
  text: 'Message text'
}
```

#### Lab Result

```javascript
{
  type: 'lab',
  time: '2025-10-29 08:30',
  title: 'CBC Result',
  summary: 'WBC elevated (12.3)',
  lastComment: 'Reviewed by Dr. Smith'
}
```

#### Imaging Report

```javascript
{
  type: 'imaging',
  time: '2025-10-29 09:10',
  title: 'Abdominal X-ray',
  interpretation: 'No acute findings',
  radiologist: 'No evidence of obstruction'
}
```

#### Event

```javascript
{
  type: 'event',
  eventType: 'rx' | 'appt',
  time: '2025-10-27 10:40',
  title: 'Prescription Sent',
  summary: 'Lisinopril 10 mg #90',
  note: 'E-prescribed by Dr. Smith'
}
```

## Loading Custom Data

```jsx
import ChatComponent, { useChatStore } from '@mieweb/chat-component';

function App() {
  const loadConversations = useChatStore(state => state.loadConversations);

  const handleLoadData = () => {
    const customData = {
      conversations: [
        {
          id: 'custom1',
          title: 'Custom Conversation',
          open: true,
          unread: false,
          lastActivity: '2025-10-30 14:00',
          thread: [
            {
              type: 'message',
              role: 'patient',
              channel: 'portal',
              time: '2025-10-30 14:00',
              text: 'Hello!'
            }
          ]
        }
      ],
      activeConversationId: 'custom1'
    };
    
    loadConversations(customData);
  };

  return (
    <div>
      <button onClick={handleLoadData}>Load Custom Data</button>
      <ChatComponent />
    </div>
  );
}
```

## Style Encapsulation

The component uses Tailwind CSS with the `tw-` prefix to avoid conflicts with Bootstrap or other CSS frameworks. Additionally:

- Tailwind's `preflight` (base/reset styles) is disabled
- Custom CSS variables are scoped to `.chat-component-root`
- All component styles are prefixed and isolated

This ensures the component can be safely embedded in any environment without causing style conflicts.

## Development

### Running the Demo

```bash
npm install
npm run dev
```

Then visit:
- Tailwind demo: http://localhost:5173/demo-tailwind.html
- Bootstrap demo: http://localhost:5173/demo-bootstrap.html

### Building

```bash
npm run build
```

This creates the production build in the `dist/` directory.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

ISC

## Contributing

Contributions are welcome! Please submit issues and pull requests to the GitHub repository.
