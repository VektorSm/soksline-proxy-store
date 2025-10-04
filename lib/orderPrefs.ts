export type OrderPrefs = {
  service: 'static-isp' | 'static-ipv6' | 'rotating';
  plan?: 'basic' | 'dedicated' | 'premium';
  duration?: 'monthly' | 'yearly';
  tierId?: string;
};

const KEY = 'soks:lastOrder';

export function saveOrderPrefs(p: OrderPrefs) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {}
}

export function loadOrderPrefs(): OrderPrefs | null {
  try {
    return JSON.parse(localStorage.getItem(KEY) || 'null');
  } catch {
    return null;
  }
}
