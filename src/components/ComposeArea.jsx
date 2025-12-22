import React, { useState, useRef, useEffect } from 'react';
import useChatStore from '../store';

const ComposeArea = ({ 
  onMessageSent, 
  currentUserId = null, 
  activeConversation, 
  disableClosedConversations = false,
  hideDeliveryMethod = false,
  onConversationCreated = null 
}) => {
  const [text, setText] = useState('');
  const [sendType, setSendType] = useState('auto');
  const [images, setImages] = useState([]); // Array of { id, dataUrl, file }
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const addMessage = useChatStore(state => state.addMessage);
  const conversations = useChatStore(state => state.conversations);
  const createConversation = useChatStore(state => state.createConversation);
  const getActiveConversation = useChatStore(state => state.getActiveConversation);

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

  // Handle paste event for images
  const handlePaste = (e) => {
    if (isClosed) return;
    
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setImages(prev => [...prev, {
              id: Date.now() + Math.random(),
              dataUrl: event.target.result,
              file: file,
              name: file.name || 'pasted-image.png'
            }]);
          };
          reader.readAsDataURL(file);
        }
        break; // Only handle first image
      }
    }
  };

  // Handle image files (shared by paste and drop)
  const addImageFile = (file) => {
    if (!file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setImages(prev => [...prev, {
        id: Date.now() + Math.random(),
        dataUrl: event.target.result,
        file: file,
        name: file.name || 'dropped-image.png'
      }]);
    };
    reader.readAsDataURL(file);
  };

  // Handle drag and drop
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isClosed) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (isClosed) return;

    const files = e.dataTransfer?.files;
    if (!files) return;

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        addImageFile(file);
      }
    }
  };

  // Remove an attached image
  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  // Handle file input change
  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        addImageFile(file);
      }
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleSend = () => {
    if ((!text.trim() && images.length === 0) || isClosed ) return;

    // If no conversations exist, create a new one
    let conversationToUse = activeConversation;
    let newlyCreatedConversation = false;
    
    if (!activeConversation && conversations.length === 0) {
      const newConversation = createConversation('New Conversation');
      conversationToUse = newConversation;
      newlyCreatedConversation = true;
    }

    // If still no conversation (edge case), return
    if (!conversationToUse) return;

    const message = {
      text: text.trim(),
      channel: sendType,
      senderId: currentUserId,
      images: images.map(img => ({ dataUrl: img.dataUrl, name: img.name })),
    };

    const newMessage = addMessage(message);

    // If we created a new conversation, trigger onConversationCreated with full conversation including the message
    if (newlyCreatedConversation) {
      if (onConversationCreated) {
        const updatedConversation = getActiveConversation();
        if (updatedConversation) {
          onConversationCreated({
            conversationId: updatedConversation.id,
            conversation: updatedConversation
          });
        }
      }
    } else {
      // Only call onMessageSent if we didn't just create a conversation
      if (onMessageSent && newMessage) {
        onMessageSent({
          conversationId: conversationToUse.id,
          message: newMessage,
        });
      }
    }

    setText('');
    setImages([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isClosed) {
        handleSend();
      }
    }
  };

  const canSend = (text.trim() || images.length > 0) && !isClosed;

  return (
    <div 
      className={`chat-compose-wrapper tw-border-t tw-px-3 tw-py-2 tw-flex tw-flex-col tw-gap-2 tw-relative ${
        isDragging ? 'tw-bg-blue-50' : ''
      }`}
      style={{ borderColor: 'var(--chat-border)' }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drop overlay */}
      {isDragging && (
        <div className="tw-absolute tw-inset-0 tw-border-2 tw-border-dashed tw-border-blue-400 tw-rounded tw-flex tw-items-center tw-justify-center tw-bg-blue-50 tw-bg-opacity-90 tw-z-10 tw-pointer-events-none">
          <span className="tw-text-blue-600 tw-font-medium tw-text-sm">Drop image here</span>
        </div>
      )}

      {/* Image previews */}
      {images.length > 0 && (
        <div className="tw-flex tw-gap-2 tw-flex-wrap">
          {images.map(img => (
            <div 
              key={img.id} 
              className="tw-relative tw-group"
            >
              <img 
                src={img.dataUrl} 
                alt={img.name}
                className="tw-h-16 tw-w-16 tw-object-cover tw-rounded tw-border"
                style={{ borderColor: 'var(--chat-border)' }}
              />
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                className="tw-absolute tw--top-1.5 tw--right-1.5 tw-w-5 tw-h-5 tw-rounded-full tw-bg-red-500 tw-text-white tw-text-xs tw-flex tw-items-center tw-justify-center tw-border-2 tw-border-white tw-cursor-pointer hover:tw-bg-red-600"
                aria-label={`Remove ${img.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

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
        onPaste={handlePaste}
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

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="tw-hidden"
          onChange={handleFileSelect}
          aria-hidden="true"
        />
        
        {/* Attach button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`tw-border tw-rounded tw-p-1.5 tw-text-lg tw-leading-none ${
            isClosed
              ? 'tw-bg-gray-100 tw-cursor-not-allowed tw-text-gray-400'
              : 'tw-bg-white tw-cursor-pointer tw-text-gray-600 hover:tw-bg-gray-50 hover:tw-text-gray-800'
          }`}
          style={{ borderColor: 'var(--chat-border)' }}
          aria-label="Attach image"
          title="Attach image or take photo"
          disabled={isClosed}
        >
          📎
        </button>
        
        <button
          type="button"
          className={`tw-border-none tw-rounded tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium ${
            !canSend
              ? 'tw-bg-gray-300 tw-text-gray-500 tw-cursor-not-allowed'
              : 'tw-text-white tw-cursor-pointer hover:tw-bg-[var(--chat-primary-600)]'
          }`}
          style={{ background: !canSend ? undefined : 'var(--chat-primary)' }}
          onClick={handleSend}
          aria-label="Send message"
          disabled={!canSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ComposeArea;
