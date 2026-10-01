const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escape(value) {
  return String(value).replace(/[&<>"']/g, character => entities[character]);
}

export function code(source) {
  return `<pre><code>${escape(source.trim())}</code></pre>`;
}
