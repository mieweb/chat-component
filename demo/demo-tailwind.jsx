import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import ChatComponent from '../src/index';
import useChatStore from '../src/store';

function DemoApp() {
  const [simulatorMode, setSimulatorMode] = useState(false);
  const [pendingMessage2, setPendingMessage2] = useState(null);
  
  const store1 = useChatStore();
  const exportState = useChatStore(state => state.exportState);

  // Inject incoming messages from component 2
  useEffect(() => {
    if (pendingMessage2) {
      const addMessage = useChatStore.getState().addMessage;
      addMessage({
        text: `[From Patient] ${pendingMessage2.text}`,
        channel: pendingMessage2.channel,
      });
      setPendingMessage2(null);
    }
  }, [pendingMessage2]);

  const handleMessageSent1 = (data) => {
    console.log('Component 1 (Physician) - Message sent:', data);
  };

  const handleMessageSent2 = (data) => {
    console.log('Component 2 (Patient) - Message sent:', data);
    
    if (simulatorMode) {
      // Send message back to component 1
      setTimeout(() => {
        setPendingMessage2(data);
      }, 500);
    }
  };

  const handleExport = () => {
    const state = exportState();
    console.log('Exported state:', state);
    alert('State exported to console. Check the browser console for details.');
  };

  const toggleSimulator = () => {
    setSimulatorMode(!simulatorMode);
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
            Both components share the same conversation state. Send messages from Component 2 (patient view) 
            and they will appear in Component 1 prefixed with "[From Patient]". This simulates external messages 
            coming into the component.
          </p>
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
              📋 Component 1 - Main View (Physician)
            </h3>
          )}
          <ChatComponent 
            onMessageSent={handleMessageSent1}
            height="500px"
            maxWidth="100%"
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
              👤 Component 2 - Patient Simulator
            </h3>
            <ChatComponent 
              onMessageSent={handleMessageSent2}
              height="500px"
              maxWidth="100%"
            />
            <div style={{
              marginTop: '10px',
              padding: '10px',
              background: '#f8f9fa',
              borderRadius: '6px',
              fontSize: '13px',
              color: '#666'
            }}>
              💡 Tip: Send a message here to simulate an external patient response
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
