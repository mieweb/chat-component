import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatComponent, { useChatStore } from '../src/index';

function DemoApp() {
  const exportState = useChatStore(state => state.exportState);

  const handleMessageSent = (data) => {
    console.log('New message sent:', data);
  };

  const handleExport = () => {
    const state = exportState();
    console.log('Exported state:', state);
    alert('State exported to console. Check the browser console for details.');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Chat Component Demo - Tailwind Environment</h1>
      <p>This demo shows the chat component in a Tailwind CSS environment.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleExport}
          style={{
            padding: '10px 20px',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Export State
        </button>
      </div>

      <ChatComponent 
        onMessageSent={handleMessageSent}
        height="500px"
        maxWidth="1100px"
      />

      <div style={{ marginTop: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Component Features:</h3>
        <ul>
          <li>State managed with Zustand</li>
          <li>Styled with Tailwind CSS (prefixed with 'tw-')</li>
          <li>Messages bubble up via onMessageSent callback</li>
          <li>State can be exported/imported</li>
          <li>Bootstrap-compatible (no style conflicts)</li>
        </ul>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DemoApp />
  </React.StrictMode>
);
