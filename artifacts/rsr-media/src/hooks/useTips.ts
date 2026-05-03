// RSR Media — Local tip inbox storage.
// Tips submitted via the Hotline page are stored here in localStorage.
// Device-local until a POST /api/tips backend endpoint is connected.

export interface Tip {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  location: string;
  summary: string;
  links: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  contactAllowed: boolean;
  tipType: string;
  status: 'new' | 'reviewed' | 'archived';
}

const TIPS_KEY = 'rsr_media_tips';

export function loadTips(): Tip[] {
  try {
    const raw = localStorage.getItem(TIPS_KEY);
    return raw ? (JSON.parse(raw) as Tip[]) : [];
  } catch {
    return [];
  }
}

export function saveTip(data: Omit<Tip, 'id' | 'createdAt' | 'status'>): Tip {
  const tips = loadTips();
  const tip: Tip = {
    ...data,
    id: `tip_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  tips.unshift(tip);
  localStorage.setItem(TIPS_KEY, JSON.stringify(tips));
  return tip;
}

export function updateTipStatus(id: string, status: Tip['status']): void {
  const tips = loadTips();
  const idx = tips.findIndex(t => t.id === id);
  if (idx !== -1) {
    tips[idx] = { ...tips[idx], status };
    localStorage.setItem(TIPS_KEY, JSON.stringify(tips));
  }
}

export function deleteTip(id: string): void {
  const filtered = loadTips().filter(t => t.id !== id);
  localStorage.setItem(TIPS_KEY, JSON.stringify(filtered));
}

export function buildMailtoBody(tip: Tip): string {
  return [
    'RSR HOTLINE SUBMISSION (DEVICE-LOCAL COPY)',
    `ID: ${tip.id}`,
    `DATE: ${new Date(tip.createdAt).toLocaleString()}`,
    '---',
    `TYPE: ${tip.tipType.toUpperCase()}`,
    `TOPIC: ${tip.topic}`,
    `URGENCY: ${tip.urgency.toUpperCase()}`,
    tip.location ? `LOCATION: ${tip.location}` : '',
    '---',
    'SUMMARY:',
    tip.summary,
    tip.links ? `\nLINKS / EVIDENCE:\n${tip.links}` : '',
    '---',
    'CONTACT',
    tip.name ? `Name: ${tip.name}` : 'Name: not provided',
    tip.email ? `Email: ${tip.email}` : 'Email: not provided',
    tip.phone ? `Phone: ${tip.phone}` : 'Phone: not provided',
    `Can contact: ${tip.contactAllowed ? 'YES' : 'NO'}`,
  ].filter(Boolean).join('\n');
}
