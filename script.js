// Sample data model
const conversations = [
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

// Utilities
function formatTime(t) {
  const d = new Date(t.replace(' ', 'T'));
  return d.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function channelLabel(channel) {
  if (channel === 'portal') return 'Portal';
  if (channel === 'sms') return 'SMS';
  if (channel === 'voicemail') return 'Voicemail';
  return 'Automatic';
}

function channelIcon(channel) {
  if (channel === 'voicemail') return '🔊';
  return '💬';
}

// State
let activeId = conversations[0]?.id || null;

// Elements
const convListEl = document.getElementById('convList');
const chatThreadEl = document.getElementById('chatThread');
const titleAreaEl = document.getElementById('titleArea');
const statusChipEl = document.getElementById('statusChip');
const toggleOpenBtn = document.getElementById('toggleOpenBtn');
const markUnreadBtn = document.getElementById('markUnreadBtn');
const composeBox = document.getElementById('composeBox');
const charCount = document.getElementById('charCount');
const sendTypeEl = document.getElementById('sendType');
const sendBtn = document.getElementById('sendBtn');
const newConvBtn = document.getElementById('newConvBtn');
const newConvDialog = document.getElementById('newConvDialog');
const newConvTitle = document.getElementById('newConvTitle');
const convSearch = document.getElementById('convSearch');
const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
const backdrop = document.getElementById('backdrop');

function getActive() {
  return conversations.find(c => c.id === activeId);
}

// Render Conversation List
function renderConvList() {
  const q = (convSearch.value || '').toLowerCase();
  convListEl.innerHTML = '';
  conversations
    .filter(c => !q || c.title.toLowerCase().includes(q))
    .sort((a, b) => (a.lastActivity < b.lastActivity ? 1 : -1))
    .forEach(c => {
      const li = document.createElement('div');
      li.className = 'conv-item' + (c.id === activeId ? ' active' : '');
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', c.id === activeId ? 'true' : 'false');
      li.addEventListener('click', () => selectConversation(c.id));

      const avatar = document.createElement('div');
      avatar.className = 'avatar';
      avatar.textContent = c.title.slice(0,1).toUpperCase();

      const body = document.createElement('div');
      body.style.flex = '1';

      const title = document.createElement('div');
      title.className = 'conv-title';
      title.textContent = c.title;

      const meta = document.createElement('div');
      meta.className = 'conv-meta';
      const date = document.createElement('span');
      date.textContent = formatTime(c.lastActivity);
      const chip = document.createElement('span');
      chip.className = 'chip ' + (c.open ? 'open' : 'closed');
      chip.textContent = c.open ? 'Open' : 'Closed';

      meta.append(date, chip);
      body.append(title, meta);

      li.append(avatar);
      if (c.unread) {
        const dot = document.createElement('div');
        dot.className = 'unread-dot';
        li.append(dot);
      } else {
        const spacer = document.createElement('div');
        spacer.style.width = '8px';
        spacer.style.height = '8px';
        li.append(spacer);
      }
      li.append(body);

      convListEl.append(li);
    });
}

// Render Thread
function renderThread() {
  const c = getActive();
  if (!c) return;
  titleAreaEl.textContent = c.title;
  statusChipEl.textContent = c.open ? 'Open' : 'Closed';
  statusChipEl.className = 'chip ' + (c.open ? 'open' : 'closed');

  chatThreadEl.innerHTML = '';
  c.thread
    .slice()
    .sort((a, b) => (a.time < b.time ? -1 : 1))
    .forEach(item => {
      if (item.type === 'message') {
        const m = document.createElement('div');
        m.className = 'message ' + (item.role === 'patient' ? 'patient' : 'physician');
        m.innerHTML = `
          <div class="bubble">
            <span class="icon">${channelIcon(item.channel)}</span> ${item.text.replace(/\n/g, '<br>')}
          </div>
          <div class="meta">
            ${channelLabel(item.channel)} · ${new Date(item.time.replace(' ','T')).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
          </div>
        `;
        chatThreadEl.append(m);
      } else if (item.type === 'lab') {
        const e = document.createElement('div');
        e.className = 'event event-lab';
        e.innerHTML = `
          <div class="event-card">
            <div class="event-title"><span class="icon">🧪</span>
              <a href="#lab?${encodeURIComponent(item.title)}" class="event-link"> ${item.title}</a>
            </div>
            <div class="event-summary">
              ${item.summary}<br>
              <em>Last comment:</em> "${item.lastComment}"
            </div>
            <div class="event-meta">
              ${new Date(item.time.replace(' ','T')).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})} · Lab result
            </div>
          </div>
        `;
        chatThreadEl.append(e);
      } else if (item.type === 'imaging') {
        const e = document.createElement('div');
        e.className = 'event event-xray';
        e.innerHTML = `
          <div class="event-card">
            <div class="event-title"><span class="icon">🩻</span>
              <a href="#imaging?${encodeURIComponent(item.title)}" class="event-link">${item.title}</a>
            </div>
            <div class="event-summary">
              <strong>Interpretation:</strong> ${item.interpretation}<br>
              <em>Radiologist:</em> "${item.radiologist}"
            </div>
            <div class="event-meta">
              ${new Date(item.time.replace(' ','T')).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})} · Imaging
            </div>
          </div>
        `;
        chatThreadEl.append(e);
      } else if (item.type === 'event') {
        const e = document.createElement('div');
        const cls = item.eventType === 'rx' ? 'event-rx' : 'event-lab';
        e.className = 'event ' + cls;
        const icon = item.eventType === 'rx' ? '💊' : '🗓️';
        const tag = item.eventType === 'rx' ? 'Prescription' : 'Event';
        e.innerHTML = `
          <div class="event-card">
            <div class="event-title"><span class="icon">${icon}</span>
              <a href="#event?${encodeURIComponent(item.title)}" class="event-link">${item.title}</a>
            </div>
            <div class="event-summary">
              ${item.summary}${item.note ? `<br><em>${item.note}</em>` : ''}
            </div>
            <div class="event-meta">
              ${new Date(item.time.replace(' ','T')).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})} · ${tag}
            </div>
          </div>
        `;
        chatThreadEl.append(e);
      }
    });

  // mark as read on open
  c.unread = false;
  renderConvList();
  chatThreadEl.scrollTop = chatThreadEl.scrollHeight;
}

function selectConversation(id) {
  activeId = id;
  closeSidebar();
  renderConvList();
  renderThread();
}

function updateCharCount() {
  charCount.textContent = (composeBox.value || '').length + ' chars';
}

function autoGrow(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 320) + 'px';
}

function sendMessage() {
  const c = getActive();
  if (!c) return;
  const text = (composeBox.value || '').trim();
  if (!text) return;

  let channel = sendTypeEl.value;
  if (channel === 'auto') channel = 'auto';

  const now = new Date();
  const ts = now.toISOString().slice(0,16).replace('T',' ');

  c.thread.push({ type: 'message', role: 'physician', channel, time: ts, text });
  c.lastActivity = ts;
  c.unread = false;

  composeBox.value = '';
  autoGrow(composeBox);
  updateCharCount();

  renderConvList();
  renderThread();
}

function createConversation(title) {
  const now = new Date().toISOString().slice(0,16).replace('T',' ');
  const id = 'c' + Math.random().toString(36).slice(2,8);
  conversations.unshift({
    id, title, open: true, unread: false, lastActivity: now,
    thread: [
      { type: 'event', eventType: 'appt', time: now, title: 'Conversation Created', summary: 'New conversation initialized.', note: '' }
    ]
  });
  selectConversation(id);
}

// Mobile sidebar controls
function openSidebar() {
  sidebar.classList.add('open');
  backdrop.classList.add('show');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  backdrop.classList.remove('show');
}

// Event Listeners
toggleOpenBtn.addEventListener('click', () => {
  const c = getActive();
  if (!c) return;
  c.open = !c.open;
  statusChipEl.textContent = c.open ? 'Open' : 'Closed';
  statusChipEl.className = 'chip ' + (c.open ? 'open' : 'closed');
  renderConvList();
});

markUnreadBtn.addEventListener('click', () => {
  const c = getActive();
  if (!c) return;
  c.unread = true;
  renderConvList();
});

composeBox.addEventListener('input', () => { autoGrow(composeBox); updateCharCount(); });
composeBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

sendBtn.addEventListener('click', sendMessage);
newConvBtn.addEventListener('click', () => {
  newConvTitle.value = '';
  if (typeof newConvDialog.showModal === 'function') {
    newConvDialog.showModal();
  } else {
    const title = prompt('Conversation title:') || '';
    createConversation((title || '').trim() || 'New Conversation');
  }
});

document.getElementById('createConvBtn').addEventListener('click', (e) => {
  e.preventDefault();
  const title = (newConvTitle.value || '').trim() || 'New Conversation';
  newConvDialog.close();
  createConversation(title);
});

convSearch.addEventListener('input', renderConvList);
hamburger.addEventListener('click', openSidebar);
backdrop.addEventListener('click', closeSidebar);

// Initial render
renderConvList();
renderThread();
autoGrow(composeBox);
updateCharCount();