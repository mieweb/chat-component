import React from 'react';
import useChatStore from '../store';
import ConversationList from './ConversationList';
import MessageThread from './MessageThread';
import ComposeArea from './ComposeArea';
import TopBar from './TopBar';
import '../styles.css';

const ChatComponent = ({ 
  initialData = null,
  onMessageSent = null,
  className = '',
  height = '500px',
  maxWidth = '1100px'
}) => {
  const sidebarOpen = useChatStore(state => state.sidebarOpen);
  const setSidebarOpen = useChatStore(state => state.setSidebarOpen);
  const loadConversations = useChatStore(state => state.loadConversations);

  // Load initial data if provided
  React.useEffect(() => {
    if (initialData) {
      loadConversations(initialData);
    }
  }, [initialData, loadConversations]);

  const handleBackdropClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div 
      className={`chat-component-root tw-flex tw-relative tw-overflow-hidden tw-border tw-rounded-lg ${className}`}
      style={{ 
        height,
        maxWidth,
        background: 'var(--chat-bg)',
        borderColor: 'var(--chat-border)',
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
        color: 'var(--chat-text)'
      }}
    >
      {/* Sidebar */}
      <aside 
        className={`tw-flex tw-flex-col tw-bg-white tw-border-r tw-transition-transform tw-duration-300 tw-ease-in-out ${
          sidebarOpen 
            ? 'tw-translate-x-0 tw-absolute tw-top-0 tw-bottom-0 tw-left-0 tw-z-[1001] tw-shadow-2xl' 
            : 'tw-w-[300px] tw-translate-x-0 max-[900px]:tw-absolute max-[900px]:tw--translate-x-full max-[900px]:tw-top-0 max-[900px]:tw-bottom-0 max-[900px]:tw-left-0 max-[900px]:tw-z-[1001]'
        }`}
        style={{ 
          borderColor: 'var(--chat-border)',
          maxWidth: sidebarOpen ? '360px' : '300px',
          width: sidebarOpen ? '84vw' : '300px'
        }}
      >
        <ConversationList />
      </aside>

      {/* Backdrop for mobile */}
      <div 
        className={`tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-40 tw-transition-opacity tw-duration-200 tw-z-[1000] ${
          sidebarOpen ? 'tw-opacity-100 tw-pointer-events-auto' : 'tw-opacity-0 tw-pointer-events-none'
        }`}
        onClick={handleBackdropClick}
      />

      {/* Main content */}
      <main className="tw-flex tw-flex-col tw-flex-1 tw-h-full">
        <TopBar />
        
        <div className="tw-flex tw-flex-1 tw-overflow-hidden tw-h-full">
          <div className="tw-flex tw-flex-col tw-flex-1 tw-bg-white tw-m-3.5 tw-rounded-lg tw-shadow-sm tw-overflow-hidden">
            <MessageThread />
            <ComposeArea onMessageSent={onMessageSent} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatComponent;
