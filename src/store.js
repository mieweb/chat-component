import { create } from 'zustand';

// Helper functions for time formatting
export const formatTime = (t) => {
  const d = new Date(t.replace(' ', 'T'));
  return d.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export const channelLabel = (channel) => {
  if (channel === 'portal') return 'Portal';
  if (channel === 'sms') return 'SMS';
  if (channel === 'voicemail') return 'Voicemail';
  return 'Automatic';
};

export const channelIcon = (channel) => {
  if (channel === 'voicemail') return '🔊';
  return '💬';
};

// Initial sample data
const initialConversations = [
  {
    id: 735,
    title: 'General Question',
    open: true,
    unread: true,
    lastActivity: '2025-10-29 09:30',
    thread: [
      { type: 'message', role: 'external', senderId: 100, channel: 'sms', time: '2025-10-29 08:12', text: "Good morning, I'm still having pain in my right side." },
      { type: 'ref', refType: 'doc', refId: 1001, role: 'internal', senderId: 200, channel: 'auto', time: '2025-10-29 08:30', text: 'CBC Result: WBC elevated (12.3), mild neutrophilia. Reviewed by Dr. Smith: Consistent with mild infection, recommend follow-up.' },
      { type: 'message', role: 'internal', senderId: 200, channel: 'portal', time: '2025-10-29 08:35', text: "Jane, your bloodwork shows a mild infection. I'd like to order an abdominal x-ray to check further." },
      { type: 'ref', refType: 'doc', refId: 1002, role: 'internal', senderId: 200, channel: 'auto', time: '2025-10-29 09:10', text: 'Abdominal X-ray: No acute findings. Mild constipation noted. No evidence of obstruction or free air.' },
      { type: 'message', role: 'external', senderId: 100, channel: 'portal', time: '2025-10-29 09:22', text: "Thank you for letting me know. Should I change my diet or take anything for the constipation?" },
      { type: 'message', role: 'internal', senderId: 200, channel: 'auto', time: '2025-10-29 09:30', text: "Increase your water and fiber intake. If no improvement in 2 days, let me know." },
      { type: 'ref', refType: 'doc', refId: 1003, role: 'internal', senderId: 200, channel: 'auto', time: '2025-10-29 10:05', text: 'Urinalysis: Trace leukocytes, otherwise unremarkable. Reviewed by Dr. Smith: No evidence of UTI.' }
    ]
  },
  {
    id: 736,
    title: 'Work related illness',
    open: true,
    unread: false,
    lastActivity: '2025-10-28 16:20',
    thread: [
      { type: 'message', role: 'external', senderId: 100, channel: 'portal', time: '2025-10-28 14:10', text: "I was exposed to fumes at work and now I'm coughing." },
      { type: 'ref', refType: 'doc', refId: 1004, role: 'internal', senderId: 200, channel: 'auto', time: '2025-10-28 15:05', text: 'Carboxyhemoglobin: 3.2% (slightly elevated). Reviewed by NP Lee: counsel on exposure avoidance.' },
      { type: 'ref', refType: 'doc', refId: 1005, role: 'internal', senderId: 200, channel: 'auto', time: '2025-10-28 15:40', text: 'Chest X-ray PA/LAT: Mild peribronchial thickening; no consolidation. Findings may reflect bronchitis; correlate clinically.' },
      { type: 'message', role: 'internal', senderId: 200, channel: 'sms', time: '2025-10-28 16:20', text: "Findings suggest mild bronchitis. Rest, fluids, and use your inhaler PRN. Follow up if symptoms worsen." }
    ]
  },
  {
    id: 737,
    title: 'Refill Request',
    open: false,
    unread: false,
    lastActivity: '2025-10-27 11:05',
    thread: [
      { type: 'message', role: 'external', senderId: 100, channel: 'sms', time: '2025-10-27 10:02', text: "I need a refill of my lisinopril 10 mg." },
      { type: 'ref', refType: 'rx', refId: 2001, role: 'internal', senderId: 200, channel: 'auto', time: '2025-10-27 10:40', text: 'Prescription Sent: Lisinopril 10 mg #90 with 1 refill to CVS Pharmacy. E-prescribed by Dr. Smith.' },
      { type: 'message', role: 'internal', senderId: 200, channel: 'auto', time: '2025-10-27 11:05', text: "Your refill was sent to CVS. You'll receive a confirmation soon." }
    ]
  },
  {
    id: 738,
    title: 'Appointment Request',
    open: true,
    unread: true,
    lastActivity: '2025-10-30 13:18',
    thread: [
      { type: 'message', role: 'external', senderId: 100, channel: 'portal', time: '2025-10-30 12:55', text: "Can I schedule a follow-up for next week?" },
      { type: 'ref', refType: 'appt', refId: 3001, role: 'internal', senderId: 200, channel: 'auto', time: '2025-10-30 13:10', text: 'Scheduling Note: Proposed slots: Tue 10:30 AM, Thu 2:00 PM. Coordinator will confirm.' },
      { type: 'message', role: 'internal', senderId: 200, channel: 'sms', time: '2025-10-30 13:18', text: "We have Tue 10:30 AM or Thu 2 PM available. Which do you prefer?" }
    ]
  }
];

// Zustand store
const useChatStore = create((set, get) => ({
  conversations: initialConversations,
  activeConversationId: initialConversations[0]?.id || null,
  searchQuery: '',
  sidebarOpen: false,
  currentUserId: null,
  conversationsLoading: false,
  conversationsHasMore: false,
  threadLoadingStates: {}, // { [conversationId]: { isLoading: boolean, hasMore: boolean } }

  // Get active conversation
  getActiveConversation: () => {
    const { conversations, activeConversationId } = get();
    return conversations.find(c => c.id === activeConversationId);
  },

  // Set active conversation
  setActiveConversation: (id) => {
    const intId = parseInt(id, 10);
    set({ activeConversationId: intId });
    // Mark as read
    const conversation = get().conversations.find(c => c.id === intId);
    if (conversation) {
      get().updateConversation(intId, { unread: false });
    }
  },

  // Add message to active conversation
  addMessage: (message) => {
    const { activeConversationId, conversations } = get();
    const conversation = conversations.find(c => c.id === activeConversationId);
    if (!conversation) return null;

    const now = new Date();
    const timestamp = now.toISOString().slice(0, 16).replace('T', ' ');
    
    // Ensure senderId is an integer if provided
    const senderId = message.senderId !== null && message.senderId !== undefined 
      ? parseInt(message.senderId, 10) 
      : null;
    
    // Use provided role, default to 'internal'
    const role = message.role || 'internal';
    
    const newMessage = {
      type: 'message',
      role: role,
      senderId: senderId,
      channel: message.channel || 'auto',
      time: timestamp,
      text: message.text,
    };

    const updatedConversations = conversations.map(c => {
      if (c.id === activeConversationId) {
        return {
          ...c,
          thread: [...c.thread, newMessage],
          lastActivity: timestamp,
          unread: false,
        };
      }
      return c;
    });

    set({ conversations: updatedConversations });
    return newMessage;
  },

  // Update conversation
  updateConversation: (id, updates) => {
    const intId = parseInt(id, 10);
    set(state => ({
      conversations: state.conversations.map(c =>
        c.id === intId ? { ...c, ...updates } : c
      )
    }));
  },

  // Toggle conversation open/closed
  toggleConversationStatus: (id) => {
    const intId = parseInt(id, 10);
    const conversation = get().conversations.find(c => c.id === intId);
    if (conversation) {
      get().updateConversation(intId, { open: !conversation.open });
    }
  },

  // Mark conversation as unread
  markAsUnread: (id) => {
    const intId = parseInt(id, 10);
    get().updateConversation(intId, { unread: true });
  },

  // Create new conversation
  createConversation: (title) => {
    const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
    // Generate a random integer ID (in production this would come from database AUTO_INCREMENT)
    const id = Math.floor(Math.random() * 1000000) + 1000;
    
    const newConversation = {
      id,
      title: title || 'New Conversation',
      open: true,
      unread: false,
      lastActivity: now,
      thread: [
        {
          type: 'ref',
          refType: 'appt',
          refId: null,
          role: 'internal',
          senderId: null,
          channel: 'auto',
          time: now,
          text: 'Conversation Created: New conversation initialized.'
        }
      ]
    };

    set(state => ({
      conversations: [newConversation, ...state.conversations],
      activeConversationId: id,
    }));

    return newConversation;
  },

  // Set search query
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  // Toggle sidebar (mobile)
  toggleSidebar: () => {
    set(state => ({ sidebarOpen: !state.sidebarOpen }));
  },

  setSidebarOpen: (open) => {
    set({ sidebarOpen: open });
  },

  // Set current user ID
  setCurrentUserId: (userId) => {
    const intUserId = userId !== null && userId !== undefined ? parseInt(userId, 10) : null;
    set({ currentUserId: intUserId });
  },

  // Replace entire state with new data
  loadConversations: (data) => {
    // Ensure all IDs are integers
    const conversations = (data.conversations || []).map(conv => ({
      ...conv,
      id: parseInt(conv.id, 10),
      thread: (conv.thread || []).map(item => {
        // Parse senderId in messages if present
        if (item.type === 'message' && item.senderId !== null && item.senderId !== undefined) {
          return {
            ...item,
            senderId: parseInt(item.senderId, 10)
          };
        }
        return item;
      })
    }));
    const activeId = data.activeConversationId 
      ? parseInt(data.activeConversationId, 10) 
      : conversations[0]?.id || null;
    const userId = data.currentUserId !== undefined 
      ? parseInt(data.currentUserId, 10) 
      : null;
    
    set({
      conversations,
      activeConversationId: activeId,
      ...(userId !== null && { currentUserId: userId }),
    });
  },

  // Progressive loading: Load conversation metadata only (without full threads)
  loadConversationMetadata: (conversationsList, options = {}) => {
    const { append = false, hasMore = false } = options;
    
    // Transform conversation data to include only metadata
    const conversations = conversationsList.map(conv => ({
      id: parseInt(conv.id, 10),
      title: conv.title,
      open: conv.open ?? true,
      unread: conv.unread ?? false,
      lastActivity: conv.lastActivity,
      thread: conv.thread || [], // Empty or partial thread
      threadLoaded: conv.thread && conv.thread.length > 0, // Flag to track if thread is loaded
    }));

    set(state => {
      if (append) {
        // Appending new conversations
        const existingIds = new Set(state.conversations.map(c => c.id));
        const newConversations = conversations.filter(c => !existingIds.has(c.id));
        return {
          conversations: [...state.conversations, ...newConversations],
          conversationsLoading: false,
          conversationsHasMore: hasMore,
        };
      } else {
        // Replacing - merge with existing thread data to preserve loaded threads
        const existingMap = new Map(state.conversations.map(c => [c.id, c]));
        const merged = conversations.map(conv => {
          const existing = existingMap.get(conv.id);
          if (existing && existing.threadLoaded && (!conv.thread || conv.thread.length === 0)) {
            // Preserve existing thread if new data doesn't have thread
            return {
              ...conv,
              thread: existing.thread,
              threadLoaded: existing.threadLoaded
            };
          }
          return conv;
        });
        
        return {
          conversations: merged,
          conversationsLoading: false,
          conversationsHasMore: hasMore,
          activeConversationId: state.activeConversationId || merged[0]?.id || null,
        };
      }
    });
  },

  // Set conversations loading state
  setConversationsLoading: (isLoading) => {
    set({ conversationsLoading: isLoading });
  },

  // Progressive loading: Load/append thread items for a specific conversation
  loadConversationThread: (conversationId, threadItems, options = {}) => {
    const { append = false, hasMore = false } = options;
    const intId = parseInt(conversationId, 10);
    
    // Parse thread items to ensure proper types
    const parsedItems = threadItems.map(item => {
      if (item.type === 'message' && item.senderId !== null && item.senderId !== undefined) {
        return {
          ...item,
          senderId: parseInt(item.senderId, 10)
        };
      }
      return item;
    });

    set(state => {
      const updatedConversations = state.conversations.map(conv => {
        if (conv.id === intId) {
          return {
            ...conv,
            thread: append ? [...(conv.thread || []), ...parsedItems] : parsedItems,
            threadLoaded: true,
          };
        }
        return conv;
      });

      return {
        conversations: updatedConversations,
        threadLoadingStates: {
          ...state.threadLoadingStates,
          [intId]: { isLoading: false, hasMore }
        }
      };
    });
  },

  // Set thread loading state for a specific conversation
  setThreadLoading: (conversationId, isLoading) => {
    const intId = parseInt(conversationId, 10);
    set(state => ({
      threadLoadingStates: {
        ...state.threadLoadingStates,
        [intId]: {
          ...(state.threadLoadingStates[intId] || {}),
          isLoading
        }
      }
    }));
  },

  // Get thread loading state for a conversation
  getThreadLoadingState: (conversationId) => {
    const intId = parseInt(conversationId, 10);
    return get().threadLoadingStates[intId] || { isLoading: false, hasMore: false };
  },

  // Export current state
  exportState: () => {
    const { conversations, activeConversationId, currentUserId } = get();
    return {
      conversations,
      activeConversationId,
      currentUserId,
    };
  },
}));

export default useChatStore;
