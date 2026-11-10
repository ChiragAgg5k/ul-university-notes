/**
 * @file Loads the Tawk.to chat widget on request and reports its progress.
 *
 * The widget is third-party code that sets cookies, so nothing is requested until the visitor
 * clicks. The choice is remembered for the tab, after which the widget loads in the background.
 * This is a small external store: React reads it through `useChat`.
 */
const widgetURL = 'https://embed.tawk.to/6abd0adffd2d7034457f30d7/1k3p74upi';
const consentKey = 'portfolio.chat.enabled';
const patience = 20_000;

export type ChatStatus = 'idle' | 'loading' | 'opening' | 'ready' | 'failed';

interface Widget {
  onLoad?: () => void;
  maximize?: () => void;
}

declare global {
  interface Window {
    Tawk_API?: Widget;
    Tawk_LoadStart?: Date;
  }
}

let status: ChatStatus = 'idle';
const listeners = new Set<() => void>();

function change(next: ChatStatus): void {
  status = next;
  for (const listener of listeners) {
    listener();
  }
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function currentStatus(): ChatStatus {
  return status;
}

/**
 * True when the visitor already opened the chat in this tab. Storage can be blocked, which
 * counts as no.
 */
export function remembered(): boolean {
  try {
    return sessionStorage.getItem(consentKey) === 'yes';
  } catch {
    return false;
  }
}

/**
 * Requests the widget script once. `open` decides whether the conversation window should open
 * when the widget is ready, or stay closed so background loading does not interrupt reading.
 */
export function load(open: boolean): void {
  if (status !== 'idle') {
    return;
  }
  change(open ? 'opening' : 'loading');
  const fail = () => {
    if (status === 'loading' || status === 'opening') {
      change('failed');
    }
  };
  const timer = setTimeout(fail, patience);
  window.Tawk_API = window.Tawk_API ?? {};
  window.Tawk_LoadStart = new Date();
  window.Tawk_API.onLoad = () => {
    clearTimeout(timer);
    const shouldOpen = status === 'opening';
    change('ready');
    if (shouldOpen) {
      window.Tawk_API?.maximize?.();
    }
  };
  const script = document.createElement('script');
  script.async = true;
  script.src = widgetURL;
  script.setAttribute('crossorigin', '*');
  script.addEventListener('error', fail, { once: true });
  document.head.append(script);
}

/**
 * Handles a click on the chat button: records consent, then opens or loads the widget.
 */
export function open(): void {
  try {
    sessionStorage.setItem(consentKey, 'yes');
  } catch {
    // Storage is optional; the visitor simply clicks again on the next visit.
  }
  if (status === 'ready') {
    window.Tawk_API?.maximize?.();
  } else if (status === 'loading') {
    change('opening');
  } else {
    load(true);
  }
}
