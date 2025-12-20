import React, { useState, useRef, useEffect } from 'react';
import useChatStore from '../store';

const ComposeArea = ({ 
  onMessageSent, 
  currentUserId = null, 
  activeConversation, 
  disableClosedConversations = false,
  hideDeliveryMethod = false 
}) => {
  const [text, setText] = useState('');
  const [sendType, setSendType] = useState('auto');
  const textareaRef = useRef(null);

  const addMessage = useChatStore(state => state.addMessage);

  // Fix: Use 'open' property instead of 'status', and add null check
  const isClosed = disableClosedConversations && activeConversation && !activeConversation.open;

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 320);
      textareaRef.current.style.height = newHeight + 'px';
    }
  }, [text]);

  // Set initial height on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }, []);

  const handleSend = () => {
    if (!text.trim() || isClosed || !activeConversation) return;

    const message = {
      text: text.trim(),
      channel: sendType,
      senderId: currentUserId, // Include sender ID if provided
    };

    const newMessage = addMessage(message);

    // Call the callback if provided
    if (onMessageSent && newMessage) {
      onMessageSent({
        conversationId: activeConversation.id,
        message: newMessage,
      });
    }

    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isClosed) {
        handleSend();
      }
    }
  };

  return (
    <div 
      className="chat-compose-wrapper tw-border-t tw-px-3 tw-py-2 tw-flex tw-flex-col tw-gap-2"
      style={{ borderColor: 'var(--chat-border)' }}
    >
      <textarea
        ref={textareaRef}
        className={`tw-w-full tw-max-h-[320px] tw-resize-none tw-border tw-rounded-lg tw-px-3 tw-py-2 tw-text-sm tw-leading-[1.4] tw-outline-none tw-overflow-y-auto ${
          isClosed 
            ? 'tw-bg-gray-100 tw-cursor-not-allowed tw-text-gray-500' 
            : 'focus:tw-border-[var(--chat-primary)] focus:tw-shadow-[0_0_0_2px_rgba(25,118,210,0.13)]'
        }`}
        style={{ borderColor: 'var(--chat-border)' }}
        placeholder={isClosed ? "Conversation closed" : "Type a message..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        aria-label="Message text"
        disabled={isClosed}
      />
      
      <div className="tw-flex tw-items-center tw-gap-2 tw-flex-wrap">
        {!hideDeliveryMethod && (
          <select
            className={`tw-rounded tw-px-2 tw-py-1.5 tw-border tw-text-xs ${
              isClosed ? 'tw-bg-gray-100 tw-cursor-not-allowed tw-text-gray-500' : ''
            }`}
            style={{ borderColor: 'var(--chat-border)' }}
            value={sendType}
            onChange={(e) => setSendType(e.target.value)}
            aria-label="Delivery method"
            disabled={isClosed}
          >
            <option value="auto">Auto</option>
            <option value="portal">Portal</option>
            <option value="sms">SMS</option>
            <option value="voicemail">Voicemail</option>
            <option value="task">Task</option>
          </select>
        )}
        
        <span className="tw-text-xs tw-text-[var(--chat-muted)]">
          {text.length} chars
        </span>
        
        <div className="tw-flex-1" />
        
        <button
          type="button"
          className={`tw-border-none tw-rounded tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium ${
            !text.trim() || isClosed
              ? 'tw-bg-gray-300 tw-text-gray-500 tw-cursor-not-allowed'
              : 'tw-text-white tw-cursor-pointer hover:tw-bg-[var(--chat-primary-600)]'
          }`}
          style={{ background: !text.trim() || isClosed ? undefined : 'var(--chat-primary)' }}
          onClick={handleSend}
          aria-label="Send message"
          disabled={!text.trim() || isClosed}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ComposeArea;
