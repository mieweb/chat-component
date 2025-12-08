import React from 'react';
import useChatStore from '../store';

const TopBar = () => {
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
    <div 
      className="tw-bg-white tw-border-b tw-flex tw-items-center tw-gap-2.5 tw-px-3.5 tw-py-2.5"
      style={{ borderColor: 'var(--chat-border)' }}
    >
      <button
        type="button"
        className="tw-hidden max-[900px]:tw-inline-flex tw-items-center tw-justify-center tw-w-9 tw-h-9 tw-border tw-rounded-lg tw-bg-white tw-cursor-pointer"
        onClick={toggleSidebar}
        aria-label="Open conversations"
        style={{ borderColor: 'var(--chat-border)' }}
      >
        ☰
      </button>
      
      <div className="tw-font-bold tw-flex-1">
        {activeConversation?.title || 'Clinical Timeline'}
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
          style={{ borderColor: 'var(--chat-border)' }}
        >
          Toggle
        </button>
        
        <button
          type="button"
          className="tw-px-2.5 tw-py-1.5 tw-rounded-lg tw-border tw-bg-white tw-cursor-pointer tw-text-sm"
          onClick={handleMarkUnread}
          title="Mark unread"
          style={{ borderColor: 'var(--chat-border)' }}
        >
          Mark Unread
        </button>
      </div>
    </div>
  );
};

export default TopBar;
