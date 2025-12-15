import React, { useState } from 'react';
import useChatStore, { formatTime } from '../store';

const ConversationList = ({ onConversationOpened = null, onNewConversationClick = null, hideNewButton = false }) => {
  const conversations = useChatStore(state => state.conversations);
  const activeConversationId = useChatStore(state => state.activeConversationId);
  const setActiveConversation = useChatStore(state => state.setActiveConversation);
  const setSidebarOpen = useChatStore(state => state.setSidebarOpen);
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectConversation = (id) => {
    const conversation = conversations.find(c => c.id === id);
    setActiveConversation(id);
    setSidebarOpen(false);
    
    // Trigger callback if provided
    if (onConversationOpened && conversation) {
      onConversationOpened({
        conversationId: id,
        conversation: conversation
      });
    }
  };

  const filteredConversations = conversations
    .filter(c => !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => (a.lastActivity < b.lastActivity ? 1 : -1));

  return (
    <div className="tw-flex tw-flex-col tw-h-full">
      <div 
        className="tw-flex tw-items-center tw-justify-between tw-px-4 tw-py-3.5 tw-border-b tw-font-semibold"
        style={{ borderColor: 'var(--chat-border)' }}
      >
        <span>Conversations</span>
        {!hideNewButton && (
          <button
            type="button"
            className="tw-px-2.5 tw-py-2 tw-rounded-lg tw-border-none tw-text-white tw-cursor-pointer"
            style={{ background: 'var(--chat-primary)' }}
            onClick={onNewConversationClick}
            aria-label="Create new conversation"
          >
            + New
          </button>
        )}
      </div>

      <div 
        className="tw-p-2.5 tw-px-3 tw-border-b"
        style={{ borderColor: 'var(--chat-border)' }}
      >
        <input
          type="search"
          className="tw-w-full tw-px-3 tw-py-2.5 tw-rounded-lg tw-border"
          style={{ borderColor: 'var(--chat-border)' }}
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search conversations"
        />
      </div>

      <div className="tw-overflow-y-auto tw-h-full">
        {filteredConversations.map(conversation => (
          <div
            key={conversation.id}
            className={`tw-flex tw-items-start tw-gap-2.5 tw-px-3.5 tw-py-3 tw-border-b tw-cursor-pointer ${
              conversation.id === activeConversationId 
                ? 'tw-bg-[#eef6ff]' 
                : 'hover:tw-bg-[#fafbff]'
            }`}
            style={{ borderColor: 'var(--chat-border)' }}
            onClick={() => handleSelectConversation(conversation.id)}
            role="option"
            aria-selected={conversation.id === activeConversationId}
          >
            <div 
              className="tw-w-7 tw-h-7 tw-rounded-full tw-bg-[#dbeafe] tw-flex tw-items-center tw-justify-center tw-text-sm tw-text-[#1d4ed8]"
            >
              {conversation.title.slice(0, 1).toUpperCase()}
            </div>

            {conversation.unread ? (
              <div className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-[#ef4444] tw-mt-1.5 tw-flex-shrink-0" />
            ) : (
              <div className="tw-w-2 tw-h-2 tw-flex-shrink-0" />
            )}

            <div className="tw-flex-1">
              <div className="tw-font-semibold">{conversation.title}</div>
              <div className="tw-text-xs tw-text-[var(--chat-muted)] tw-flex tw-gap-2 tw-flex-wrap">
                <span>{formatTime(conversation.lastActivity)}</span>
                <span 
                  className={`tw-text-xs tw-px-2 tw-py-0.5 tw-rounded-full ${
                    conversation.open 
                      ? 'tw-text-[var(--chat-open-text)]' 
                      : 'tw-text-[var(--chat-closed-text)]'
                  }`}
                  style={{
                    background: conversation.open ? 'var(--chat-open-bg)' : 'var(--chat-closed-bg)'
                  }}
                >
                  {conversation.open ? 'Open' : 'Closed'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
