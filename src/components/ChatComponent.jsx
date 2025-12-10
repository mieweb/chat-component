import React from 'react';
import useChatStore from '../store';
import ConversationList from './ConversationList';
import MessageThread from './MessageThread';
import ComposeArea from './ComposeArea';
import TopBar from './TopBar';
import '../styles.css';

const ChatComponent = ({ 
  initialData = null,
  initialActiveConversationId = null,
  onMessageSent = null,
  onConversationOpened = null, // Callback when a conversation is opened/selected
  onConversationCreated = null, // Callback when a new conversation is created
  className = '',
  height = '500px',
  maxWidth = '1100px',
  currentUserId = null // Identifier for the current user viewing this component
}) => {
  const [showNewDialog, setShowNewDialog] = React.useState(false);
  const [newConvTitle, setNewConvTitle] = React.useState('');
  
  const sidebarOpen = useChatStore(state => state.sidebarOpen);
  const setSidebarOpen = useChatStore(state => state.setSidebarOpen);
  const loadConversations = useChatStore(state => state.loadConversations);
  const createConversation = useChatStore(state => state.createConversation);
  const setCurrentUserId = useChatStore(state => state.setCurrentUserId);
  const storedCurrentUserId = useChatStore(state => state.currentUserId);
  const setActiveConversation = useChatStore(state => state.setActiveConversation);

  // Sync currentUserId prop with store
  React.useEffect(() => {
    setCurrentUserId(currentUserId);
  }, [currentUserId, setCurrentUserId]);

  // Load initial data if provided
  React.useEffect(() => {
    if (initialData) {
      loadConversations(initialData);
    }
  }, [initialData, loadConversations]);

  // Set initial active conversation if provided
  React.useEffect(() => {
    if (initialActiveConversationId !== null) {
      setActiveConversation(initialActiveConversationId);
    }
  }, [initialActiveConversationId, setActiveConversation]);

  const handleBackdropClick = () => {
    setSidebarOpen(false);
  };

  const handleCreateConversation = () => {
    const title = newConvTitle.trim() || 'New Conversation';
    const newConversation = createConversation(title);
    setShowNewDialog(false);
    setNewConvTitle('');
    
    // Trigger callback if provided
    if (onConversationCreated && newConversation) {
      onConversationCreated({
        conversationId: newConversation.id,
        conversation: newConversation
      });
    }
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
        <ConversationList 
          onConversationOpened={onConversationOpened}
          onNewConversationClick={() => setShowNewDialog(true)}
        />
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
            <MessageThread currentUserId={storedCurrentUserId} />
            <ComposeArea onMessageSent={onMessageSent} currentUserId={storedCurrentUserId} />
          </div>
        </div>
      </main>

      {/* New Conversation Modal - centered within chat component */}
      {showNewDialog && (
        <div 
          className="tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-z-[2000]"
          onClick={() => setShowNewDialog(false)}
        >
          <div 
            className="tw-bg-white tw-rounded-lg tw-p-6 tw-min-w-[320px] tw-max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="tw-mt-0 tw-mb-4 tw-text-lg tw-font-semibold">Create Conversation</h3>
            <label className="tw-block tw-mb-1">Title</label>
            <input
              type="text"
              className="tw-w-full tw-px-2.5 tw-py-2 tw-border tw-rounded-lg"
              style={{ borderColor: 'var(--chat-border)' }}
              placeholder="e.g., General Question"
              value={newConvTitle}
              onChange={(e) => setNewConvTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateConversation();
                } else if (e.key === 'Escape') {
                  setShowNewDialog(false);
                }
              }}
              autoFocus
            />
            <div className="tw-flex tw-gap-2 tw-mt-3">
              <button
                type="button"
                className="tw-flex-1 tw-px-2.5 tw-py-2 tw-border tw-rounded-lg tw-bg-white tw-cursor-pointer"
                style={{ borderColor: 'var(--chat-border)' }}
                onClick={() => setShowNewDialog(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="tw-flex-1 tw-px-2.5 tw-py-2 tw-border-none tw-rounded-lg tw-text-white tw-cursor-pointer"
                style={{ background: 'var(--chat-primary)' }}
                onClick={handleCreateConversation}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
