// Public widget identifiers supplied by the site owner, not API credentials.
const widgetURL = 'https://embed.tawk.to/6abd0adffd2d7034457f30d7/1k3p74upi';
const buttons = [...document.querySelectorAll('[data-open-chat]')];
const status = document.querySelector('[data-chat-status]');
let state = 'idle';
let timeout;

function fail() {
  if (state !== 'loading') return;
  state = 'failed';
  clearTimeout(timeout);
  for (const button of buttons) button.disabled = true;
  status.textContent = 'Chat could not load. Email Chirag instead, or reload this page to try again. A content blocker or network restriction may be preventing the widget from loading.';
}

function openChat() {
  if (state === 'ready') {
    window.Tawk_API.maximize();
    return;
  }
  if (state !== 'idle') return;
  state = 'loading';
  for (const button of buttons) button.disabled = true;
  status.textContent = 'Loading chat…';
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
  window.Tawk_API.onLoad = () => {
    clearTimeout(timeout);
    state = 'ready';
    for (const button of buttons) button.disabled = false;
    status.textContent = 'Chat is ready. Replies depend on availability; when offline, you can leave a message.';
    window.Tawk_API.maximize();
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

// Merely viewing or prerendering a page must not contact the chat provider.
for (const button of buttons) {
  button.hidden = false;
  button.addEventListener('click', openChat);
}
