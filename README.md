# Chat Component

Demo site: https://chat-component.opensource.mieweb.org/


Video demo: https://youtube.com/shorts/oBetyZPDVvg

https://pm.mieweb.com/issues/144868


A React chat component with Tailwind CSS styling and Zustand state management, designed to be embeddable in both Bootstrap and Tailwind environments without style conflicts.

## Features

- **Self-Contained Bundle**: Includes React 19 - no external dependencies needed
- **React-based**: Modern React component architecture
- **Tailwind CSS**: Styled with Tailwind CSS with `tw-` prefix for encapsulation
- **Zustand State Management**: Efficient in-memory state management
- **Bootstrap Compatible**: No style conflicts when embedded in Bootstrap pages
- **Message Callbacks**: Bubble up new messages to parent components
- **State Export/Import**: Save and restore conversation state
- **Responsive Design**: Mobile-friendly with collapsible sidebar
- **Multi-conversation Support**: Manage multiple conversation threads
- **Rich Message Types**: Support for messages, lab results, imaging reports, and events
- **Read-Only Mode**: Display conversations without interactive controls for viewing-only scenarios

## Project Structure

- **`src/chat-component-embed.jsx`** - Entry point for building the embeddable bundle. This file defines what gets exported when the component is built into `dist/chat-component.umd.js`. It bundles React 19, ReactDOM, the ChatComponent, and the Zustand store together for self-contained distribution.

## Documentation

- **[Embedding Guide](EMBEDDING.md)** - Complete guide for embedding the component in HTML pages
- **[API Reference](#api-reference)** - Component props and store methods
- **[Examples](#examples)** - Usage examples for different frameworks

## Installation

```bash
npm install @mieweb/chat-component
```

## Quick Start

### React Application

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

### Plain HTML Page

For embedding in plain HTML pages without a build system, see the **[Embedding Guide](EMBEDDING.md)** for complete instructions including:
- Loading dependencies
- Initializing the component
- Loading conversations from your API
- Receiving messages from WebSocket/polling
- Sending messages to your backend

## Examples

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

### Read-Only Mode

Display a conversation without any interactive controls (no sidebar, compose area, or action buttons):

```jsx
import ChatComponent from '@mieweb/chat-component';

function ReadOnlyConversation() {
  const conversation = {
    id: 735,
    title: 'Patient Consultation',
    open: true,
    unread: false,
    lastActivity: '2025-12-10 14:30',
    thread: [
      { 
        type: 'message', 
        role: 'external', 
        senderId: 100, 
        sender_name: 'Jane Doe', 
        channel: 'portal', 
        time: '2025-12-10 14:10', 
        text: 'I have a question about my test results.' 
      },
      { 
        type: 'message', 
        role: 'internal', 
        senderId: 200, 
        sender_name: 'Dr. Smith', 
        channel: 'portal', 
        time: '2025-12-10 14:20', 
        text: 'Your test results look great!' 
      }
    ]
  };

  return (
    <ChatComponent 
      readOnly={true}
      conversation={conversation}
      currentUserId={100}
      height="400px"
    />
  );
}
```

### Custom Link Builder

Customize how reference links (documents, prescriptions, appointments) are generated:

```jsx
import ChatComponent from '@mieweb/chat-component';

function CustomLinksExample() {
  const buildLink = (refType, refId, item) => {
    // Build URLs based on your application's routing structure
    switch(refType) {
      case 'doc':
        return `/patient/documents/${refId}`;
      case 'rx':
        return `/patient/prescriptions/${refId}`;
      case 'appt':
        return `/patient/appointments/${refId}`;
      default:
        return `#${refType}/${refId}`;
    }
  };

  return (
    <ChatComponent 
      linkBuilder={buildLink}
      height="500px"
    />
  );
}
```

## API Reference

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialData` | `Object` | `null` | Initial conversation data to load |
| `onMessageSent` | `Function` | `null` | Callback when a new message is sent |
| `className` | `String` | `''` | Additional CSS classes for the root element |
| `height` | `String` | `'500px'` | Height of the chat component |
| `maxWidth` | `String` | `'1100px'` | Maximum width of the chat component |
| `currentUserId` | `Number` | `null` | Integer ID of the current user viewing the component |
| `readOnly` | `Boolean` | `false` | Enable read-only mode for displaying conversations without interactive controls |
| `conversation` | `Object` | `null` | Conversation object to display in read-only mode |
| `initialActiveConversationId` | `number` | `null` | ID of the conversation to show on mount |
| `onConversationOpened` | `Function` | `null` | Callback when a conversation is selected. Receives `{ conversationId, conversation }` |
| `onConversationCreated` | `Function` | `null` | Callback when a new conversation is created. Receives `{ conversationId, conversation }` |
| `onConversationClosed` | `Function` | `null` | Callback when the Close button is clicked. Receives `{ conversationId, conversation }` |
| `hideNewButton` | `boolean` | `false` | Hide the "New Conversation" button in the conversation list |
| `hideToggleButton` | `boolean` | `false` | Hide the sidebar toggle button in the top bar |
| `hideStatusToggle` | `boolean` | `false` | Hide the conversation status toggle button in the top bar |
| `showCloseButton` | `boolean` | `false` | Show a Close button instead of the Toggle Status button in the top bar |
| `disableClosedConversations` | `boolean` | `false` | When `true`, disables the compose area when a conversation's status is 'closed' |
| `hideDeliveryMethod` | `boolean` | `false` | Hide the delivery method dropdown in the compose area (useful for patient/external user views) |
| `linkBuilder` | `Function` | `null` | Custom function to build reference links. Receives `(refType, refId, item)` and returns a URL string |
| `onNewConversation` | `Function` | `null` | Custom handler for New Conversation button. Receives helper functions `{ openDialog, createConversation }` |

### linkBuilder Function

The `linkBuilder` prop allows you to customize how links are generated for attached documents, prescriptions, appointments, and other references in messages, as well as for conversations in the conversation list. If not provided, the default format `#${refType}/${refId}` is used for references, and no link button appears for conversations.

```javascript
// Example: Custom link builder
linkBuilder={(refType, refId, item) => {
  switch(refType) {
    case 'doc':
      return `/documents/${refId}`;
    case 'rx':
      return `/prescriptions/${refId}`;
    case 'appt':
      return `/appointments/${refId}`;
    case 'conversation':
      return `/conversations/${refId}`;
    default:
      return `#${refType}/${refId}`;
  }
}}
```

The function receives:
- `refType`: Type of reference (e.g., 'doc', 'rx', 'appt', 'conversation')
- `refId`: Unique identifier for the reference or conversation
- `item`: Complete item object containing all data (for messages: title, text, time, channel, etc.; for conversations: the entire conversation object)

When `linkBuilder` is provided and returns a URL for the 'conversation' refType, a right arrow button will appear on each conversation in the conversation list, allowing users to navigate to the conversation's detail page.

### onMessageSent Callback

The `onMessageSent` callback receives an object with:

```javascript
{
  conversationId: 735,
  message: {
    type: 'message',
    role: 'physician',
    channel: 'portal',
    time: '2025-10-30 14:25',
    text: 'Message text'
  }
}
```

### Callback Details

#### onMessageSent
Called when a user sends a message.

```javascript
onMessageSent={({ conversationId, message }) => {
  console.log('Message sent:', message);
  console.log('In conversation:', conversationId);
  // message includes: id, text, timestamp, senderId, channel
}}
```

#### onConversationOpened
Called when a user selects/opens a conversation.

```javascript
onConversationOpened={({ conversationId, conversation }) => {
  console.log('Opened conversation:', conversationId);
  console.log('Conversation data:', conversation);
}}
```

#### onConversationCreated
Called when a new conversation is created.

```javascript
onConversationCreated={({ conversationId, conversation }) => {
  console.log('Created conversation:', conversationId);
  console.log('Conversation data:', conversation);
}}
```

#### onConversationClosed
Called when the Close button is clicked (only when `showCloseButton` is `true`).

```javascript
onConversationClosed={({ conversationId, conversation }) => {
  console.log('Close button clicked for conversation:', conversationId);
  console.log('Conversation data:', conversation);
  // Handle conversation close action (e.g., navigate away, hide component)
}}
```

#### onNewConversation
Custom handler for the New Conversation button. Receives helper functions to control behavior:

```javascript
onNewConversation={({ openDialog, createConversation }) => {
  // Example 1: Navigate to a URL
  window.location.href = '/create-conversation';
  
  // Example 2: Open the default dialog
  openDialog();
  
  // Example 3: Create a conversation programmatically
  const newConv = createConversation('Quick Chat', true);
  
  // Example 4: Create without triggering onConversationCreated
  createConversation('Silent Create', false);
}}
```

**Helper Functions:**
- `openDialog()` - Opens the default new conversation dialog
- `createConversation(title, triggerCallback)` - Programmatically creates a conversation
  - `title` (string, optional): Conversation title, defaults to 'New Conversation'
  - `triggerCallback` (boolean, default: true): Whether to trigger `onConversationCreated` callback
  - Returns the created conversation object

**Common Use Cases:**
```javascript
// Navigate to external page
onNewConversation={() => {
  window.location.href = '/conversations/new';
}}

// Custom logic then open dialog
onNewConversation={({ openDialog }) => {
  console.log('User creating new conversation');
  trackAnalytics('new_conversation_clicked');
  openDialog();
}}

// Programmatically create with custom title
onNewConversation={({ createConversation }) => {
  createConversation('Patient Inquiry - ' + new Date().toLocaleDateString());
}}
```

## State Management

The component uses Zustand for state management. You can access the store to programmatically control the component and react to changes.

### Accessing the Store

```jsx
import { useChatStore } from '@mieweb/chat-component';

function MyComponent() {
  const exportState = useChatStore(state => state.exportState);
  const loadConversations = useChatStore(state => state.loadConversations);
  const addMessage = useChatStore(state => state.addMessage);

  // Load conversations from your API
  const loadData = async () => {
    const response = await fetch('/api/conversations');
    const data = await response.json();
    loadConversations(data);
  };

  // Inject an incoming message (e.g., from WebSocket)
  const handleIncomingMessage = (message) => {
    addMessage({
      text: message.text,
      channel: message.channel || 'auto',
    });
  };

  return (
    <div>
      <button onClick={loadData}>Load Data</button>
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

For detailed examples of receiving and sending messages, see **[EMBEDDING.md](EMBEDDING.md)**.

## Data Format

### Conversation Object

```javascript
{
  id: 735,
  title: 'General Question',
  reference_id: 'CASE-2025-001',  // Optional: external reference identifier
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
  role: 'external' | 'internal' | 'system',
  senderId: 100,  // Integer user/patient ID (null for system messages)
  channel: 'portal' | 'sms' | 'voicemail' | 'auto',
  time: '2025-10-29 08:12',
  text: 'Message text'
}
```

#### Reference (Lab, Imaging, Prescription, Appointment, etc.)

```javascript
{
  type: 'ref',
  refType: 'doc' | 'rx' | 'appt',  // Document, Prescription, Appointment, etc.
  refId: 1001,  // Reference to external document/record ID
  title: 'CBC Result',  // Optional: Display title for the reference
  role: 'internal',
  senderId: 200,
  channel: 'auto',
  time: '2025-10-29 08:30',
  text: 'CBC Result: WBC elevated (12.3), mild neutrophilia. Reviewed by Dr. Smith: Consistent with mild infection, recommend follow-up.'
}
```

**Reference Types:**
- `doc` - Documents (lab results, imaging reports, clinical notes)
- `rx` - Prescriptions
- `appt` - Appointments
- Additional types can be added as needed

#### System Message

```javascript
{
  type: 'message',
  role: 'system',
  senderId: null,
  channel: 'auto',
  time: '2025-10-29 08:00',
  text: 'New conversation initialized.'
}
```

System messages are center-aligned in a yellow text box and are used for automated messages like conversation creation notifications. They use `role: 'system'` instead of `'external'` or `'internal'`.

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
