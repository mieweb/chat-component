import React, { useEffect, useRef } from 'react';
import useChatStore, { channelIcon, channelLabel } from '../store';

const MessageItem = ({ item, currentUserId, linkBuilder }) => {
  const time = new Date(item.time.replace(' ', 'T')).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  if (item.type === 'message') {
    // System messages are center-aligned
    if (item.role === 'system') {
      return (
        <div className="tw-mb-5 tw-flex tw-flex-col tw-items-center">
          <div 
            className="tw-bg-[#fff9c4] tw-border tw-border-[#fff59d] tw-rounded-xl tw-px-4 tw-py-2.5 tw-max-w-[85%] max-[480px]:tw-max-w-[96%] tw-text-[15px] tw-shadow-sm tw-text-center"
          >
            <div className="tw-text-[#666]">
              <span dangerouslySetInnerHTML={{ __html: item.text.replace(/\n/g, '<br>') }} />
            </div>
            <div className="tw-text-xs tw-text-[#888] tw-mt-1">
              {time}
            </div>
          </div>
        </div>
      );
    }

    // Message is on the right if current user sent it
    const isCurrentUser = item.senderId === currentUserId;
    const senderLabel = item.sender_name || (isCurrentUser ? 'You' : 'Other');
    const hasImages = item.images && item.images.length > 0;
    const hasText = item.text && item.text.trim();
    
    return (
      <article 
        role="article"
        aria-label={`Message from ${senderLabel}`}
        data-alignment={isCurrentUser ? 'right' : 'left'}
        className={`tw-mb-5 tw-flex tw-flex-col ${
          isCurrentUser ? 'tw-items-end' : 'tw-items-start'
        } tw-min-w-0`}
      >
        {item.sender_name && (
          <div className="tw-text-xs tw-text-[#666] tw-mb-1 tw-font-medium">
            {item.sender_name}
          </div>
        )}
        {/* Images */}
        {hasImages && (
          <div className={`tw-flex tw-flex-wrap tw-gap-1 tw-mb-1 ${isCurrentUser ? 'tw-justify-end' : 'tw-justify-start'}`}>
            {item.images.map((img, idx) => (
              <a 
                key={idx}
                href={img.dataUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tw-block"
              >
                <img 
                  src={img.dataUrl} 
                  alt={img.name || `Image ${idx + 1}`}
                  className="tw-max-w-[200px] tw-max-h-[200px] tw-rounded-lg tw-object-cover tw-cursor-pointer hover:tw-opacity-90"
                />
              </a>
            ))}
          </div>
        )}
        {/* Text bubble */}
        {hasText && (
          <p 
            className={`tw-max-w-[75%] max-[480px]:tw-max-w-[92%] tw-px-3.5 tw-py-2.5 tw-rounded-2xl tw-text-[15px] ${
              isCurrentUser ? 'tw-bg-[#c8e6c9]' : 'tw-bg-[#e3f2fd]'
            } tw-text-[#222] tw-whitespace-pre-wrap tw-break-words`}
          >
            <span className="tw-text-sm tw-align-middle">{channelIcon(item.channel)}</span> 
            <span dangerouslySetInnerHTML={{ __html: item.text.replace(/\n/g, '<br>') }} />
          </p>
        )}
        {/* Channel icon only when no text but has images */}
        {!hasText && hasImages && (
          <div className="tw-text-sm tw-text-[#888]">
            {channelIcon(item.channel)}
          </div>
        )}
        <div className="tw-text-xs tw-text-[#888] tw-mt-0.5 tw-flex tw-items-center tw-gap-1.5">
          {channelLabel(item.channel)} · {time}
        </div>
      </article>
    );
  }

  if (item.type === 'ref') {
    // Determine styling based on refType
    const refConfig = {
      doc: { icon: '📄', label: 'Document', borderColor: '#64b5f6' },
      rx: { icon: '💊', label: 'Prescription', borderColor: '#80cbc4' },
      appt: { icon: '🗓️', label: 'Appointment', borderColor: '#64b5f6' },
    };
    
    const config = refConfig[item.refType] || { icon: '📎', label: 'Reference', borderColor: '#64b5f6' };
    
    // Build link using custom linkBuilder or default format
    const linkHref = item.refId 
      ? (linkBuilder ? linkBuilder(item.refType, item.refId, item) : `#${item.refType}/${item.refId}`)
      : null;

    return (
      <div className="tw-mb-5 tw-flex tw-flex-col tw-items-center">
        <div 
          className="tw-bg-[#f9fbe7] tw-border tw-border-l-[5px] tw-rounded-xl tw-px-4 tw-py-3 tw-max-w-[85%] max-[480px]:tw-max-w-[96%] tw-text-[15px] tw-shadow-sm tw-flex tw-flex-col tw-gap-1 tw-min-w-0"
          style={{ borderColor: '#e6ee9c', borderLeftColor: config.borderColor }}
        >
          <div className="tw-font-bold tw-text-[#333] tw-flex tw-items-center tw-gap-2 tw-flex-wrap tw-min-w-0">
            <span className="tw-text-sm">{config.icon}</span>
            {item.title && (
              <span className="tw-break-words">{item.title}</span>
            )}
            {linkHref && (
              <a 
                href={linkHref}
                className="tw-text-xs tw-underline tw-break-all"
                style={{ color: 'var(--chat-primary)' }}
              >
                {config.label}
              </a>
            )}
          </div>
          <div className="tw-text-[#444] tw-break-words">
            <span dangerouslySetInnerHTML={{ __html: item.text.replace(/\n/g, '<br>') }} />
          </div>
          <div className="tw-text-xs tw-text-[#888] tw-mt-0.5 tw-flex tw-items-center tw-gap-1.5">
            {channelLabel(item.channel)} · {time}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const MessageThread = ({ currentUserId = null, readOnlyConversation = null, linkBuilder = null }) => {
  const activeConversation = useChatStore(state => state.getActiveConversation());
  const threadRef = useRef(null);

  // Use readOnlyConversation if provided, otherwise use activeConversation from store
  const conversation = readOnlyConversation || activeConversation;

  // Auto-scroll to bottom when conversation changes or new messages arrive
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [conversation?.thread]);

  if (!conversation) {
    return (
      <div className="tw-flex-1 tw-p-4 tw-overflow-y-auto tw-flex tw-items-center tw-justify-center tw-text-[var(--chat-muted)]">
        No conversation selected
      </div>
    );
  }

  const sortedThread = [...conversation.thread].sort((a, b) => 
    a.time < b.time ? -1 : 1
  );

  return (
    <div 
      ref={threadRef}
      className="tw-flex-1 tw-p-4 max-[480px]:tw-p-2.5 tw-overflow-y-auto tw-overflow-x-hidden tw-min-w-0"
    >
      {sortedThread.map((item, index) => (
        <MessageItem key={index} item={item} currentUserId={currentUserId} linkBuilder={linkBuilder} />
      ))}
    </div>
  );
};

export default MessageThread;
