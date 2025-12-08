import React, { useState, useRef, useEffect } from 'react';
import useChatStore from '../store';

const ComposeArea = ({ onMessageSent, currentUserId = null }) => {
  const [text, setText] = useState('');
  const [sendType, setSendType] = useState('auto');
  const textareaRef = useRef(null);
  
  const activeConversation = useChatStore(state => state.getActiveConversation());
  const addMessage = useChatStore(state => state.addMessage);

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
    if (!activeConversation || !text.trim()) return;

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
      handleSend();
    }
  };

  return (
    <div 
      className="chat-compose-wrapper tw-border-t tw-px-4 tw-py-3.5 tw-flex tw-flex-col tw-gap-2.5"
      style={{ borderColor: 'var(--chat-border)' }}
    >
      <textarea
        ref={textareaRef}
        className="tw-w-full tw-max-h-[320px] tw-resize-none tw-border tw-rounded-lg tw-px-3 tw-py-2.5 tw-text-[15px] tw-leading-[1.4] tw-outline-none focus:tw-border-[var(--chat-primary)] focus:tw-shadow-[0_0_0_2px_rgba(25,118,210,0.13)] tw-overflow-y-auto"
        style={{ borderColor: 'var(--chat-border)' }}
        placeholder="Type your message... Shift+Enter for newline, Enter to send."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
      />
      
      <div className="tw-flex tw-items-center tw-gap-2.5 tw-flex-wrap">
        <select
          className="tw-rounded-lg tw-px-2.5 tw-py-2 tw-border tw-text-sm"
          style={{ borderColor: 'var(--chat-border)' }}
          value={sendType}
          onChange={(e) => setSendType(e.target.value)}
          aria-label="Delivery method"
        >
          <option value="auto">Automatic</option>
          <option value="portal">Portal Message</option>
          <option value="sms">SMS Message</option>
          <option value="voicemail">Voicemail</option>
          <option value="task">Task Nurse/Other</option>
        </select>
        
        <span className="tw-text-xs tw-text-[var(--chat-muted)]">
          {text.length} chars
        </span>
        
        <div className="tw-flex-1" />
        
        <button
          type="button"
          className="tw-text-white tw-border-none tw-rounded-lg tw-px-4 tw-py-2.5 tw-text-[15px] tw-cursor-pointer hover:tw-bg-[var(--chat-primary-600)]"
          style={{ background: 'var(--chat-primary)' }}
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ComposeArea;
