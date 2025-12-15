import React from 'react';
import useChatStore from '../store';

const TopBar = ({ hideToggleButton = false }) => {
  const activeConversation = useChatStore(state => state.getActiveConversation());
  const toggleConversationStatus = useChatStore(state => state.toggleConversationStatus);
  const markAsUnread = useChatStore(state => state.markAsUnread);
  const toggleSidebar = useChatStore(state => state.toggleSidebar);

  const handleToggleStatus = () => {
    if (activeConversation) {
      toggleConversationStatus(activeConversation.id);
    }
  };

  const handleMarkUnread = () => {
    if (activeConversation) {
      markAsUnread(activeConversation.id);
    }
  };

  return (
    <header 
      className="tw-bg-white tw-border-b tw-px-3.5 tw-py-2.5 tw-flex tw-items-center tw-justify-between"
      style={{ borderColor: 'var(--chat-border)' }}
    >
      <div className="tw-flex tw-items-center tw-gap-2">
        {!hideToggleButton && (
          <button
            className="tw-border-none tw-bg-transparent tw-cursor-pointer tw-p-1.5 tw-rounded-md hover:tw-bg-gray-100 tw-transition-colors"
            onClick={toggleSidebar}
            aria-label="Open conversations"
            title="Open conversations"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}
        <div className="tw-font-bold">
          {activeConversation?.title || 'Clinical Timeline'}
        </div>
      </div>
      
      <div className="tw-flex tw-gap-2 tw-items-center">
        <span 
          className={`tw-text-xs tw-px-2 tw-py-0.5 tw-rounded-full ${
            activeConversation?.open 
              ? 'tw-text-[var(--chat-open-text)]' 
              : 'tw-text-[var(--chat-closed-text)]'
          }`}
          style={{
            background: activeConversation?.open ? 'var(--chat-open-bg)' : 'var(--chat-closed-bg)'
          }}
        >
          {activeConversation?.open ? 'Open' : 'Closed'}
        </span>
        
        <button
          type="button"
          className="tw-px-2.5 tw-py-1.5 tw-rounded-lg tw-border tw-bg-white tw-cursor-pointer tw-text-sm"
          onClick={handleToggleStatus}
          title="Toggle Open/Closed"
          aria-label="Toggle conversation status"
          style={{ borderColor: 'var(--chat-border)' }}
        >
          Toggle
        </button>
        
        <button
          type="button"
          className="tw-px-2.5 tw-py-1.5 tw-rounded-lg tw-border tw-bg-white tw-cursor-pointer tw-text-sm"
          onClick={handleMarkUnread}
          title="Mark unread"
          aria-label="Mark conversation as unread"
          style={{ borderColor: 'var(--chat-border)' }}
        >
          Mark Unread
        </button>
      </div>
    </header>
  );
};

export default TopBar;
