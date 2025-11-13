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
    id: 'c1',
    title: 'General Question',
    open: true,
    unread: true,
    lastActivity: '2025-10-29 09:30',
    thread: [
      { type: 'message', role: 'patient', channel: 'sms', time: '2025-10-29 08:12', text: "Good morning, I'm still having pain in my right side." },
      { type: 'lab', time: '2025-10-29 08:30', title: 'CBC Result', summary: 'WBC elevated (12.3), mild neutrophilia.', lastComment: 'Reviewed by Dr. Smith: Consistent with mild infection, recommend follow-up.' },
      { type: 'message', role: 'physician', channel: 'portal', time: '2025-10-29 08:35', text: "Jane, your bloodwork shows a mild infection. I'd like to order an abdominal x-ray to check further." },
      { type: 'imaging', time: '2025-10-29 09:10', title: 'Abdominal X-ray', interpretation: 'No acute findings. Mild constipation noted.', radiologist: 'No evidence of obstruction or free air.' },
      { type: 'message', role: 'patient', channel: 'portal', time: '2025-10-29 09:22', text: "Thank you for letting me know. Should I change my diet or take anything for the constipation?" },
      { type: 'message', role: 'physician', channel: 'auto', time: '2025-10-29 09:30', text: "Increase your water and fiber intake. If no improvement in 2 days, let me know." },
      { type: 'lab', time: '2025-10-29 10:05', title: 'Urinalysis', summary: 'Trace leukocytes, otherwise unremarkable.', lastComment: 'Reviewed by Dr. Smith: No evidence of UTI.' }
    ]
  },
  {
    id: 'c2',
    title: 'Work related illness',
    open: true,
    unread: false,
    lastActivity: '2025-10-28 16:20',
    thread: [
      { type: 'message', role: 'patient', channel: 'portal', time: '2025-10-28 14:10', text: "I was exposed to fumes at work and now I'm coughing." },
      { type: 'lab', time: '2025-10-28 15:05', title: 'Carboxyhemoglobin', summary: '3.2% (slightly elevated).', lastComment: 'Reviewed by NP Lee: counsel on exposure avoidance.' },
      { type: 'imaging', time: '2025-10-28 15:40', title: 'Chest X-ray PA/LAT', interpretation: 'Mild peribronchial thickening; no consolidation.', radiologist: 'Findings may reflect bronchitis; correlate clinically.' },
      { type: 'message', role: 'physician', channel: 'sms', time: '2025-10-28 16:20', text: "Findings suggest mild bronchitis. Rest, fluids, and use your inhaler PRN. Follow up if symptoms worsen." }
    ]
  },
  {
    id: 'c3',
    title: 'Refill Request',
    open: false,
    unread: false,
    lastActivity: '2025-10-27 11:05',
    thread: [
      { type: 'message', role: 'patient', channel: 'sms', time: '2025-10-27 10:02', text: "I need a refill of my lisinopril 10 mg." },
      { type: 'event', eventType: 'rx', time: '2025-10-27 10:40', title: 'Prescription Sent', summary: 'Lisinopril 10 mg #90 with 1 refill to CVS Pharmacy.', note: 'E-prescribed by Dr. Smith.' },
      { type: 'message', role: 'physician', channel: 'auto', time: '2025-10-27 11:05', text: "Your refill was sent to CVS. You'll receive a confirmation soon." }
    ]
  },
  {
    id: 'c4',
    title: 'Appointment Request',
    open: true,
    unread: true,
    lastActivity: '2025-10-30 13:18',
    thread: [
      { type: 'message', role: 'patient', channel: 'portal', time: '2025-10-30 12:55', text: "Can I schedule a follow-up for next week?" },
      { type: 'event', eventType: 'appt', time: '2025-10-30 13:10', title: 'Scheduling Note', summary: 'Proposed slots: Tue 10:30 AM, Thu 2:00 PM.', note: 'Coordinator will confirm.' },
      { type: 'message', role: 'physician', channel: 'sms', time: '2025-10-30 13:18', text: "We have Tue 10:30 AM or Thu 2 PM available. Which do you prefer?" }
    ]
  }
];

// Zustand store
const useChatStore = create((set, get) => ({
  conversations: initialConversations,
  activeConversationId: initialConversations[0]?.id || null,
  searchQuery: '',
  sidebarOpen: false,

  // Get active conversation
  getActiveConversation: () => {
    const { conversations, activeConversationId } = get();
    return conversations.find(c => c.id === activeConversationId);
  },

  // Set active conversation
  setActiveConversation: (id) => {
    set({ activeConversationId: id });
    // Mark as read
    const conversation = get().conversations.find(c => c.id === id);
    if (conversation) {
      get().updateConversation(id, { unread: false });
    }
  },

  // Add message to active conversation
  addMessage: (message) => {
    const { activeConversationId, conversations } = get();
    const conversation = conversations.find(c => c.id === activeConversationId);
    if (!conversation) return null;

    const now = new Date();
    const timestamp = now.toISOString().slice(0, 16).replace('T', ' ');
    
    const newMessage = {
      type: 'message',
      role: 'physician',
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
    set(state => ({
      conversations: state.conversations.map(c =>
        c.id === id ? { ...c, ...updates } : c
      )
    }));
  },

  // Toggle conversation open/closed
  toggleConversationStatus: (id) => {
    const conversation = get().conversations.find(c => c.id === id);
    if (conversation) {
      get().updateConversation(id, { open: !conversation.open });
    }
  },

  // Mark conversation as unread
  markAsUnread: (id) => {
    get().updateConversation(id, { unread: true });
  },

  // Create new conversation
  createConversation: (title) => {
    const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const id = 'c' + Math.random().toString(36).slice(2, 8);
    
    const newConversation = {
      id,
      title: title || 'New Conversation',
      open: true,
      unread: false,
      lastActivity: now,
      thread: [
        {
          type: 'event',
          eventType: 'appt',
          time: now,
          title: 'Conversation Created',
          summary: 'New conversation initialized.',
          note: ''
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

  // Replace entire state with new data
  loadConversations: (data) => {
    set({
      conversations: data.conversations || [],
      activeConversationId: data.activeConversationId || data.conversations?.[0]?.id || null,
    });
  },

  // Export current state
  exportState: () => {
    const { conversations, activeConversationId } = get();
    return {
      conversations,
      activeConversationId,
    };
  },
}));

export default useChatStore;
