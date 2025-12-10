import React, { useEffect, useRef } from 'react';
import useChatStore, { channelIcon, channelLabel } from '../store';

const MessageItem = ({ item, currentUserId }) => {
  const time = new Date(item.time.replace(' ', 'T')).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  if (item.type === 'message') {
    // Message is on the right if current user sent it
    const isCurrentUser = item.senderId === currentUserId;
    return (
      <div 
        className={`tw-mb-5 tw-flex tw-flex-col ${
          isCurrentUser ? 'tw-items-end' : 'tw-items-start'
        }`}
      >
        {item.sender_name && (
          <div className="tw-text-xs tw-text-[#666] tw-mb-1 tw-font-medium">
            {item.sender_name}
          </div>
        )}
        <div 
          className={`tw-max-w-[75%] tw-px-3.5 tw-py-2.5 tw-rounded-2xl tw-text-[15px] ${
            isCurrentUser ? 'tw-bg-[#c8e6c9]' : 'tw-bg-[#e3f2fd]'
          } tw-text-[#222]`}
        >
          <span className="tw-text-sm tw-align-middle">{channelIcon(item.channel)}</span> 
          <span dangerouslySetInnerHTML={{ __html: item.text.replace(/\n/g, '<br>') }} />
        </div>
        <div className="tw-text-xs tw-text-[#888] tw-mt-0.5 tw-flex tw-items-center tw-gap-1.5">
          {channelLabel(item.channel)} · {time}
        </div>
      </div>
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

    return (
      <div className="tw-mb-5 tw-flex tw-flex-col tw-items-center">
        <div 
          className="tw-bg-[#f9fbe7] tw-border tw-border-l-[5px] tw-rounded-xl tw-px-4 tw-py-3 tw-max-w-[85%] tw-text-[15px] tw-shadow-sm tw-flex tw-flex-col tw-gap-1"
          style={{ borderColor: '#e6ee9c', borderLeftColor: config.borderColor }}
        >
          <div className="tw-font-bold tw-text-[#333] tw-flex tw-items-center tw-gap-2">
            <span className="tw-text-sm">{config.icon}</span>
            {item.title && (
              <span>{item.title}</span>
            )}
            {item.refId && (
              <a 
                href={`#${item.refType}/${item.refId}`}
                className="tw-text-xs tw-underline"
                style={{ color: 'var(--chat-primary)' }}
              >
                {config.label}
              </a>
            )}
          </div>
          <div className="tw-text-[#444]">
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

const MessageThread = ({ currentUserId = null, readOnlyConversation = null }) => {
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
      className="tw-flex-1 tw-p-4 tw-overflow-y-auto"
    >
      {sortedThread.map((item, index) => (
        <MessageItem key={index} item={item} currentUserId={currentUserId} />
      ))}
    </div>
  );
};

export default MessageThread;
