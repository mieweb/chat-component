import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import ChatComponent from '../src/chat-component-embed';
import useChatStore from '../src/store';

function DemoApp() {
  const [simulatorMode, setSimulatorMode] = useState(false);
  const [showReadOnly, setShowReadOnly] = useState(false);
  
  const exportState = useChatStore(state => state.exportState);

  // Sample conversation for read-only mode
  const readOnlyConversation = {
    id: 999,
    title: 'Read-Only Conversation Example',
    open: true,
    unread: false,
    lastActivity: '2025-12-10 14:30',
    thread: [
      { type: 'message', role: 'external', senderId: 100, sender_name: 'Jane Doe', channel: 'portal', time: '2025-12-10 14:10', text: "I have a question about my recent test results." },
      { type: 'ref', refType: 'doc', refId: 5001, title: 'Lab Results', role: 'internal', senderId: 200, channel: 'auto', time: '2025-12-10 14:15', text: 'Complete Blood Count: All values within normal limits. Reviewed by Dr. Smith.' },
      { type: 'message', role: 'internal', senderId: 200, sender_name: 'Dr. Smith', channel: 'portal', time: '2025-12-10 14:20', text: "Your test results look great! Everything is within the normal range." },
      { type: 'message', role: 'external', senderId: 100, sender_name: 'Jane Doe', channel: 'portal', time: '2025-12-10 14:25', text: "That's wonderful news, thank you!" },
      { type: 'message', role: 'internal', senderId: 200, sender_name: 'Dr. Smith', channel: 'portal', time: '2025-12-10 14:30', text: "You're welcome! Let me know if you have any other questions." }
    ]
  };

  const handleMessageSent1 = (data) => {
    console.log('Component 1 (Physician) - Message sent:', data);
  };

  const handleMessageSent2 = (data) => {
    console.log('Component 2 (Patient) - Message sent:', data);
  };

  const handleExport = () => {
    const state = exportState();
    console.log('Exported state:', state);
    alert('State exported to console. Check the browser console for details.');
  };

  const toggleSimulator = () => {
    setSimulatorMode(!simulatorMode);
  };

  const toggleReadOnly = () => {
    setShowReadOnly(!showReadOnly);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ 
        padding: '1rem', 
        background: '#04a454', 
        color: 'white', 
        textAlign: 'center',
        marginBottom: '20px',
        borderRadius: '8px'
      }}>
        <a href="/index.html" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          ← Back to Demo Menu
        </a>
      </div>
      
      <h1>Chat Component Demo - Tailwind Environment</h1>
      <p>This demo shows the chat component in a Tailwind CSS environment with dual-component simulation.</p>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button 
          type="button"
          onClick={handleExport}
          style={{
            padding: '10px 20px',
            background: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Export State
        </button>
        
        <button 
          type="button"
          onClick={toggleSimulator}
          style={{
            padding: '10px 20px',
            background: simulatorMode ? '#04a454' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: simulatorMode ? 'bold' : 'normal'
          }}
        >
          {simulatorMode ? '✓ Simulator Active' : 'Enable Simulator'}
        </button>
        
        <button 
          type="button"
          onClick={toggleReadOnly}
          style={{
            padding: '10px 20px',
            background: showReadOnly ? '#9c27b0' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: showReadOnly ? 'bold' : 'normal'
          }}
        >
          {showReadOnly ? '✓ Read-Only Active' : 'Show Read-Only Mode'}
        </button>
      </div>

      {simulatorMode && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          background: '#d4edda', 
          borderRadius: '8px',
          border: '2px solid #04a454'
        }}>
          <strong>🔄 Simulator Mode Active</strong>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
            Both components share the same conversation state. Messages from each component will appear 
            with proper alignment based on the sender's ID. This simulates a two-way conversation 
            between internal users (clinicians) and external users (patients/family).
          </p>
        </div>
      )}

      {showReadOnly && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          background: '#f3e5f5', 
          borderRadius: '8px',
          border: '2px solid #9c27b0'
        }}>
          <strong>📖 Read-Only Mode Active</strong>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
            This demonstrates the read-only mode where a conversation object is passed directly to the 
            component. No sidebar, compose area, or interactive controls are shown - just the conversation 
            title and messages.
          </p>
        </div>
      )}

      {showReadOnly && (
        <div style={{ 
          marginBottom: '30px',
          border: '3px solid #9c27b0',
          borderRadius: '12px',
          padding: '15px'
        }}>
          <h3 style={{ 
            marginTop: '0',
            marginBottom: '15px', 
            color: '#9c27b0',
            fontSize: '18px'
          }}>
            📖 Read-Only Conversation View
          </h3>
          <ChatComponent 
            readOnly={true}
            conversation={readOnlyConversation}
            height="400px"
            maxWidth="100%"
            currentUserId={100}
          />
          <div style={{
            marginTop: '10px',
            padding: '10px',
            background: '#f8f9fa',
            borderRadius: '6px',
            fontSize: '13px',
            color: '#666'
          }}>
            💡 Notice: No sidebar, compose area, or interactive buttons - only the conversation title and messages
          </div>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: simulatorMode ? 'repeat(auto-fit, minmax(450px, 1fr))' : '1fr',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <div style={{ 
          border: simulatorMode ? '3px solid #1976d2' : 'none',
          borderRadius: '12px',
          padding: simulatorMode ? '15px' : '0'
        }}>
          {simulatorMode && (
            <h3 style={{ 
              marginTop: '0',
              marginBottom: '15px', 
              color: '#1976d2',
              fontSize: '18px'
            }}>
              📋 Component 1 - Internal User (Clinician)
            </h3>
          )}
          <ChatComponent 
            onMessageSent={handleMessageSent1}
            height="500px"
            maxWidth="100%"
            currentUserId={200}
          />
        </div>
        
        {simulatorMode && (
          <div style={{ 
            border: '3px solid #04a454',
            borderRadius: '12px',
            padding: '15px'
          }}>
            <h3 style={{ 
              marginTop: '0',
              marginBottom: '15px', 
              color: '#04a454',
              fontSize: '18px'
            }}>
              👤 Component 2 - External User (Patient)
            </h3>
            <ChatComponent 
              onMessageSent={handleMessageSent2}
              height="500px"
              maxWidth="100%"
              currentUserId={100}
            />
            <div style={{
              marginTop: '10px',
              padding: '10px',
              background: '#f8f9fa',
              borderRadius: '6px',
              fontSize: '13px',
              color: '#666'
            }}>
              💡 Tip: Send a message here to simulate an external user response
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Component Features:</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>State managed with Zustand</li>
          <li>Styled with Tailwind CSS (prefixed with 'tw-')</li>
          <li>Messages bubble up via onMessageSent callback</li>
          <li>State can be exported/imported</li>
          <li>Bootstrap-compatible (no style conflicts)</li>
          <li><strong>Simulator mode for testing two-way conversations between components</strong></li>
          <li><strong>Read-only mode for displaying conversations without interactive controls</strong></li>
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
