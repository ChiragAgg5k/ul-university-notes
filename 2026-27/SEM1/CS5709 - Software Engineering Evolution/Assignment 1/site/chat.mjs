// Public widget identifiers supplied by the site owner, not API credentials.
const widgetURL = 'https://embed.tawk.to/6abd0adffd2d7034457f30d7/1k3p74upi';
const consentKey = 'portfolio.chat.enabled';
const buttons = [...document.querySelectorAll('[data-open-chat]')];
const status = document.querySelector('[data-chat-status]');
let state = 'idle';
let timeout;
let openWhenReady = false;

function rememberedChoice() {
  try { return sessionStorage.getItem(consentKey) === 'yes'; }
  catch { return false; }
}

function fail() {
  if (state !== 'loading') return;
  state = 'failed';
  openWhenReady = false;
  clearTimeout(timeout);
  for (const button of buttons) {
    button.disabled = true;
    button.textContent = 'Chat unavailable';
  }
  status.textContent = 'Chat couldn’t connect. Reload to try again, or email Chirag. The chat service may be unavailable.';
}

function loadChat() {
  if (state !== 'idle') return;
  state = 'loading';
  status.textContent = 'Connecting to chat… You can keep browsing.';
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
  window.Tawk_API.onLoad = () => {
    clearTimeout(timeout);
    state = 'ready';
    for (const button of buttons) {
      button.disabled = false;
      button.textContent = 'Chat with me';
    }
    status.textContent = 'Chat is ready. Leave a message if I’m away.';
    // Background loading must not interrupt reading by opening the conversation.
    if (openWhenReady) window.Tawk_API.maximize();
  };
  const script = document.createElement('script');
  script.async = true;
  script.src = widgetURL;
  script.charset = 'UTF-8';
  script.setAttribute('crossorigin', '*');
  script.addEventListener('error', fail, { once: true });
  timeout = setTimeout(fail, 20000);
  document.head.append(script);
}

function openChat() {
  if (state === 'failed') return;
  try { sessionStorage.setItem(consentKey, 'yes'); } catch { /* Storage is optional. */ }
  if (state === 'ready') {
    window.Tawk_API.maximize();
    return;
  }
  openWhenReady = true;
  for (const button of buttons) {
    button.textContent = 'Opening chat…';
    button.disabled = true;
  }
  loadChat();
}

function activate() {
  for (const button of buttons) {
    button.hidden = false;
    button.addEventListener('click', openChat);
  }
  // Only returning, opted-in visitors contact the provider before clicking.
  if (rememberedChoice()) loadChat();
}

// Do not create sessions in speculative, invisible documents, even after opt-in.
if (document.prerendering) document.addEventListener('prerenderingchange', activate, { once: true });
else activate();
