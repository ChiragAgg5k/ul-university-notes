/**
 * @file Footer section that offers live chat, explains what the provider does, and reports status.
 */
import { open } from '../chat/loader.ts';
import type { ChatStatus } from '../chat/loader.ts';
import profile from '../data/profile.json';
import { useChat } from '../hooks/useChat.ts';

const labels: Record<ChatStatus, string> = {
  idle: 'Chat with me',
  loading: 'Chat with me',
  opening: 'Opening chat…',
  ready: 'Chat with me',
  failed: 'Chat unavailable',
};

const messages: Record<ChatStatus, string> = {
  idle: '',
  loading: 'Connecting to chat… You can keep browsing.',
  opening: 'Connecting to chat… You can keep browsing.',
  ready: 'Chat is ready. Leave a message if I’m away.',
  failed:
    'Chat couldn’t connect. Reload to try again, or email Chirag. The chat service may be unavailable.',
};

export function Chat() {
  const status = useChat();
  return (
    <section aria-label="Live chat">
      <button
        className="button"
        type="button"
        aria-describedby="chat-privacy"
        disabled={status === 'opening' || status === 'failed'}
        onClick={open}
      >
        {labels[status]}
      </button>
      <p id="chat-privacy">
        Chat uses Tawk.to, which processes messages and connection data and may use cookies. After
        your first click, it loads on other pages in this tab. Close the tab to stop automatic
        loading. Don’t share sensitive information.{' '}
        <a href="https://www.tawk.to/privacy-policy/">Tawk.to privacy policy</a>.
      </p>
      <p role="status">{messages[status]}</p>
      <p>
        Prefer email? <a href={`mailto:${profile.email}`}>Email Chirag</a>.
      </p>
    </section>
  );
}
