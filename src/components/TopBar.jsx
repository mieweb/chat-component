import React from 'react';
import useChatStore from '../store';

const TopBar = ({ 
  hideToggleButton = false, 
  hideStatusToggle = false,
  showCloseButton = false,
  onConversationClosed = null
}) => {
  const activeConversation = useChatStore(state => state.getActiveConversation());
  const toggleConversationStatus = useChatStore(state => state.toggleConversationStatus);
  const markAsUnread = useChatStore(state => state.markAsUnread);
  const toggleSidebar = useChatStore(state => state.toggleSidebar);
  const sidebarOpen = useChatStore(state => state.sidebarOpen);

  const handleToggleStatus = () => {
    if (activeConversation) {
      toggleConversationStatus(activeConversation.id);
    }
  };

  const handleOpenClose = () => {
    if (!activeConversation) return;

    // If a consumer wants to be notified about closes, preserve that behavior.
    if (activeConversation.open && showCloseButton && onConversationClosed) {
      onConversationClosed({
        conversationId: activeConversation.id,
        conversation: activeConversation
      });
    }

    toggleConversationStatus(activeConversation.id);
  };

  const handleMarkUnread = () => {
    if (activeConversation) {
      markAsUnread(activeConversation.id);
    }
  };

  const isOpen = !!activeConversation?.open;
  const hasConversation = !!activeConversation;

  const iconButtonClassName =
    'tw-w-8 tw-h-8 tw-rounded-md tw-border tw-bg-white tw-cursor-pointer tw-flex tw-items-center tw-justify-center hover:tw-bg-gray-100 tw-transition-colors disabled:tw-cursor-not-allowed disabled:tw-opacity-60';

  return (
    <header 
      className="tw-bg-white tw-border-b tw-px-3 tw-py-1.5 tw-flex tw-items-center tw-justify-between tw-gap-2"
      style={{ borderColor: 'var(--chat-border)' }}
    >
      <div className="tw-flex tw-items-center tw-gap-2 tw-min-w-0">
        {!hideToggleButton && !sidebarOpen && (
          <button
            type="button"
            className="tw-w-8 tw-h-8 tw-rounded-md tw-border tw-bg-white tw-cursor-pointer tw-flex tw-items-center tw-justify-center hover:tw-bg-gray-100 tw-transition-colors min-[900px]:tw-hidden"
            onClick={toggleSidebar}
            aria-label="Toggle conversations"
            title="Toggle conversations"
            style={{ borderColor: 'var(--chat-border)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}
        <div className="tw-font-semibold tw-text-sm tw-truncate">
          {activeConversation?.title || 'Clinical Timeline'}
        </div>
      </div>
      
      <div className="tw-flex tw-gap-2 tw-items-center tw-flex-shrink-0">
        <span 
          className={`tw-text-[11px] tw-leading-4 tw-px-1.5 tw-py-0.5 tw-rounded-full ${
            isOpen
              ? 'tw-text-[var(--chat-open-text)]' 
              : 'tw-text-[var(--chat-closed-text)]'
          }`}
          style={{
            background: isOpen ? 'var(--chat-open-bg)' : 'var(--chat-closed-bg)'
          }}
        >
          {isOpen ? 'Open' : 'Closed'}
        </span>

        {!hideStatusToggle && (
          <button
            type="button"
            className={iconButtonClassName}
            onClick={showCloseButton ? handleOpenClose : handleToggleStatus}
            title={isOpen ? 'Close conversation' : 'Reopen conversation'}
            aria-label={isOpen ? 'Close conversation' : 'Reopen conversation'}
            style={{ borderColor: 'var(--chat-border)' }}
            disabled={!hasConversation}
          >
            {isOpen ? (
              // Lock icon (action: close)
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            ) : (
              // Unlock icon (action: reopen)
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 9.9-1" />
              </svg>
            )}
          </button>
        )}

        <button
          type="button"
          className={iconButtonClassName}
          onClick={handleMarkUnread}
          title="Mark conversation as unread"
          aria-label="Mark conversation as unread"
          style={{ borderColor: 'var(--chat-border)' }}
          disabled={!hasConversation}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <polyline points="3 7 12 13 21 7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
