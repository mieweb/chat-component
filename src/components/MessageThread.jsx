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

  if (item.type === 'lab') {
    return (
      <div className="tw-mb-5 tw-flex tw-flex-col tw-items-center">
        <div 
          className="tw-bg-[#f9fbe7] tw-border tw-border-l-[5px] tw-border-l-[#64b5f6] tw-rounded-xl tw-px-4 tw-py-3 tw-max-w-[85%] tw-text-[15px] tw-shadow-sm tw-flex tw-flex-col tw-gap-1"
          style={{ borderColor: '#e6ee9c', borderLeftColor: '#64b5f6' }}
        >
          <div className="tw-font-bold tw-text-[#333]">
            <span className="tw-text-sm">🧪</span>{' '}
            <a 
              href={`#lab?${encodeURIComponent(item.title)}`}
              className="tw-text-xs tw-underline tw-ml-2"
              style={{ color: 'var(--chat-primary)' }}
            >
              {item.title}
            </a>
          </div>
          <div className="tw-text-[#444]">
            {item.summary}
            <br />
            <em>Last comment:</em> "{item.lastComment}"
          </div>
          <div className="tw-text-xs tw-text-[#888] tw-mt-0.5">
            {time} · Lab result
          </div>
        </div>
      </div>
    );
  }

  if (item.type === 'imaging') {
    return (
      <div className="tw-mb-5 tw-flex tw-flex-col tw-items-center">
        <div 
          className="tw-bg-[#f9fbe7] tw-border tw-border-l-[5px] tw-border-l-[#ffb74d] tw-rounded-xl tw-px-4 tw-py-3 tw-max-w-[85%] tw-text-[15px] tw-shadow-sm tw-flex tw-flex-col tw-gap-1"
          style={{ borderColor: '#e6ee9c', borderLeftColor: '#ffb74d' }}
        >
          <div className="tw-font-bold tw-text-[#333]">
            <span className="tw-text-sm">🩻</span>{' '}
            <a 
              href={`#imaging?${encodeURIComponent(item.title)}`}
              className="tw-text-xs tw-underline tw-ml-2"
              style={{ color: 'var(--chat-primary)' }}
            >
              {item.title}
            </a>
          </div>
          <div className="tw-text-[#444]">
            <strong>Interpretation:</strong> {item.interpretation}
            <br />
            <em>Radiologist:</em> "{item.radiologist}"
          </div>
          <div className="tw-text-xs tw-text-[#888] tw-mt-0.5">
            {time} · Imaging
          </div>
        </div>
      </div>
    );
  }

  if (item.type === 'event') {
    const isRx = item.eventType === 'rx';
    const icon = isRx ? '💊' : '🗓️';
    const tag = isRx ? 'Prescription' : 'Event';
    const borderColor = isRx ? '#80cbc4' : '#64b5f6';

    return (
      <div className="tw-mb-5 tw-flex tw-flex-col tw-items-center">
        <div 
          className="tw-bg-[#f9fbe7] tw-border tw-border-l-[5px] tw-rounded-xl tw-px-4 tw-py-3 tw-max-w-[85%] tw-text-[15px] tw-shadow-sm tw-flex tw-flex-col tw-gap-1"
          style={{ borderColor: '#e6ee9c', borderLeftColor: borderColor }}
        >
          <div className="tw-font-bold tw-text-[#333]">
            <span className="tw-text-sm">{icon}</span>{' '}
            <a 
              href={`#event?${encodeURIComponent(item.title)}`}
              className="tw-text-xs tw-underline tw-ml-2"
              style={{ color: 'var(--chat-primary)' }}
            >
              {item.title}
            </a>
          </div>
          <div className="tw-text-[#444]">
            {item.summary}
            {item.note && (
              <>
                <br />
                <em>{item.note}</em>
              </>
            )}
          </div>
          <div className="tw-text-xs tw-text-[#888] tw-mt-0.5">
            {time} · {tag}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const MessageThread = ({ currentUserId = null }) => {
  const activeConversation = useChatStore(state => state.getActiveConversation());
  const threadRef = useRef(null);

  // Auto-scroll to bottom when conversation changes or new messages arrive
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [activeConversation?.thread]);

  if (!activeConversation) {
    return (
      <div className="tw-flex-1 tw-p-4 tw-overflow-y-auto tw-flex tw-items-center tw-justify-center tw-text-[var(--chat-muted)]">
        No conversation selected
      </div>
    );
  }

  const sortedThread = [...activeConversation.thread].sort((a, b) => 
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
