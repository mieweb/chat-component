// Sample conversation data for demo purposes
// This data can be loaded into the store for demonstrations

export const sampleConversations = [
  {
    id: 735,
    title: 'General Question',
    reference_id: 'CASE-2025-001',
    open: true,
    unread: true,
    lastActivity: '2025-10-29 09:30',
    thread: [
      { type: 'message', role: 'external', senderId: 100, sender_name: 'Jane Doe', channel: 'sms', time: '2025-10-29 08:12', text: "Good morning, I'm still having pain in my right side." },
      { type: 'ref', refType: 'doc', refId: 1001, title: 'CBC Result', role: 'internal', senderId: 200, channel: 'auto', time: '2025-10-29 08:30', text: 'CBC Result: WBC elevated (12.3), mild neutrophilia. Reviewed by Dr. Smith: Consistent with mild infection, recommend follow-up.' },
      { type: 'message', role: 'internal', senderId: 200, sender_name: 'Dr. Smith', channel: 'portal', time: '2025-10-29 08:35', text: "Jane, your bloodwork shows a mild infection. I'd like to order an abdominal x-ray to check further." },
      { type: 'ref', refType: 'doc', refId: 1002, title: 'Abdominal X-ray', role: 'internal', senderId: 200, channel: 'auto', time: '2025-10-29 09:10', text: 'Abdominal X-ray: No acute findings. Mild constipation noted. No evidence of obstruction or free air.' },
      { type: 'message', role: 'external', senderId: 100, sender_name: 'Jane Doe', channel: 'portal', time: '2025-10-29 09:22', text: "Thank you for letting me know. Should I change my diet or take anything for the constipation?" },
      { type: 'message', role: 'internal', senderId: 200, sender_name: 'Dr. Smith', channel: 'auto', time: '2025-10-29 09:30', text: "Increase your water and fiber intake. If no improvement in 2 days, let me know." },
      { type: 'ref', refType: 'doc', refId: 1003, title: 'Urinalysis', role: 'internal', senderId: 200, channel: 'auto', time: '2025-10-29 10:05', text: 'Urinalysis: Trace leukocytes, otherwise unremarkable. Reviewed by Dr. Smith: No evidence of UTI.' }
    ]
  },
  {
    id: 736,
    title: 'Work related illness',
    reference_id: 'CASE-2025-002',
    open: true,
    unread: false,
    lastActivity: '2025-10-28 16:20',
    thread: [
      { type: 'message', role: 'external', senderId: 100, sender_name: 'Jane Doe', channel: 'portal', time: '2025-10-28 14:10', text: "I was exposed to fumes at work and now I'm coughing." },
      { type: 'ref', refType: 'doc', refId: 1004, title: 'Carboxyhemoglobin Test', role: 'internal', senderId: 200, channel: 'auto', time: '2025-10-28 15:05', text: 'Carboxyhemoglobin: 3.2% (slightly elevated). Reviewed by NP Lee: counsel on exposure avoidance.' },
      { type: 'ref', refType: 'doc', refId: 1005, title: 'Chest X-ray PA/LAT', role: 'internal', senderId: 200, channel: 'auto', time: '2025-10-28 15:40', text: 'Chest X-ray PA/LAT: Mild peribronchial thickening; no consolidation. Findings may reflect bronchitis; correlate clinically.' },
      { type: 'message', role: 'internal', senderId: 200, sender_name: 'Dr. Smith', channel: 'sms', time: '2025-10-28 16:20', text: "Findings suggest mild bronchitis. Rest, fluids, and use your inhaler PRN. Follow up if symptoms worsen." }
    ]
  },
  {
    id: 737,
    title: 'Refill Request',
    reference_id: null,
    open: false,
    unread: false,
    lastActivity: '2025-10-27 11:05',
    thread: [
      { type: 'message', role: 'external', senderId: 100, sender_name: 'Jane Doe', channel: 'sms', time: '2025-10-27 10:02', text: "I need a refill of my lisinopril 10 mg." },
      { type: 'ref', refType: 'rx', refId: 2001, title: 'Prescription: Lisinopril 10mg', role: 'internal', senderId: 200, channel: 'auto', time: '2025-10-27 10:40', text: 'Prescription Sent: Lisinopril 10 mg #90 with 1 refill to CVS Pharmacy. E-prescribed by Dr. Smith.' },
      { type: 'message', role: 'internal', senderId: 200, sender_name: 'Dr. Smith', channel: 'auto', time: '2025-10-27 11:05', text: "Your refill was sent to CVS. You'll receive a confirmation soon." }
    ]
  },
  {
    id: 738,
    title: 'Appointment Request',
    reference_id: 'APPT-2025-145',
    open: true,
    unread: true,
    lastActivity: '2025-10-30 13:18',
    thread: [
      { type: 'message', role: 'external', senderId: 100, sender_name: 'Jane Doe', channel: 'portal', time: '2025-10-30 12:55', text: "Can I schedule a follow-up for next week?" },
      { type: 'ref', refType: 'appt', refId: 3001, title: 'Follow-up Appointment', role: 'internal', senderId: 200, channel: 'auto', time: '2025-10-30 13:10', text: 'Scheduling Note: Proposed slots: Tue 10:30 AM, Thu 2:00 PM. Coordinator will confirm.' },
      { type: 'message', role: 'internal', senderId: 200, sender_name: 'Dr. Smith', channel: 'sms', time: '2025-10-30 13:18', text: "We have Tue 10:30 AM or Thu 2 PM available. Which do you prefer?" }
    ]
  }
];

export const sampleActiveConversationId = 735;

// Helper function to get initial demo state
export function getDemoInitialState() {
  return {
    conversations: sampleConversations,
    activeConversationId: sampleActiveConversationId,
  };
}
