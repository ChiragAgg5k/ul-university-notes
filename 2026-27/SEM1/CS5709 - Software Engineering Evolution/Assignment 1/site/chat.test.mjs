import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('./chat.mjs', import.meta.url), 'utf8');
function setup({ consent = false, prerendering = false, blockedStorage = false } = {}) {
  const listeners = {};
  const scripts = [];
  const button = {
    hidden: true,
    disabled: false,
    addEventListener: (name, fn) => {
      listeners[name] = fn;
    },
  };
  const status = { textContent: '' };
  const window = {};
  let remembered = consent ? 'yes' : null;
  let expire;
  const document = {
    prerendering,
    querySelectorAll: () => [button],
    querySelector: () => status,
    addEventListener: (name, fn) => {
      listeners[name] = fn;
    },
    head: { append: script => scripts.push(script) },
    createElement: () => ({
      setAttribute() {},
      addEventListener(name, fn) {
        this[name] = fn;
      },
    }),
  };
  vm.runInNewContext(source, {
    document,
    window,
    Date,
    sessionStorage: {
      getItem() {
        if (blockedStorage) throw Error('blocked');
        return remembered;
      },
      setItem(key, value) {
        if (blockedStorage) throw Error('blocked');
        remembered = value;
      },
    },
    setTimeout(fn) {
      expire = fn;
      return 1;
    },
    clearTimeout() {},
  });
  let opened = 0;
  return {
    scripts,
    button,
    status,
    listeners,
    click: () => listeners.click(),
    expire: () => expire(),
    ready() {
      window.Tawk_API.maximize = () => opened++;
      window.Tawk_API.onLoad();
    },
    get opened() {
      return opened;
    },
    get remembered() {
      return remembered;
    },
  };
}

test('first visit waits for click, remembers choice and opens exactly once', () => {
  const app = setup();
  assert.equal(app.scripts.length, 0);
  app.click();
  assert.equal(app.scripts.length, 1);
  assert.equal(app.remembered, 'yes');
  assert.equal(app.button.textContent, 'Opening chat…');
  app.ready();
  assert.equal(app.opened, 1);
  app.click();
  assert.equal(app.opened, 2);
  assert.equal(app.scripts.length, 1);
});
test('returning visitor warms chat without maximizing it', () => {
  const app = setup({ consent: true });
  assert.equal(app.scripts.length, 1);
  app.ready();
  assert.equal(app.opened, 0);
  app.click();
  assert.equal(app.opened, 1);
});
test('click during background loading queues opening without another script', () => {
  const app = setup({ consent: true });
  app.click();
  app.ready();
  assert.equal(app.scripts.length, 1);
  assert.equal(app.opened, 1);
});
test('prerender never loads chat before activation', () => {
  const app = setup({ consent: true, prerendering: true });
  assert.equal(app.scripts.length, 0);
  app.listeners.prerenderingchange();
  assert.equal(app.scripts.length, 1);
});
test('blocked storage does not prevent opening chat', () => {
  const app = setup({ blockedStorage: true });
  app.click();
  app.ready();
  assert.equal(app.opened, 1);
});
test('timeout provides fallback and late load does not surprise-open chat', () => {
  const app = setup();
  app.click();
  app.expire();
  assert.match(app.status.textContent, /email Chirag/);
  assert.equal(app.button.disabled, true);
  app.ready();
  assert.equal(app.opened, 0);
  assert.equal(app.button.disabled, false);
});
test('script error provides fallback', () => {
  const app = setup();
  app.click();
  app.scripts[0].error();
  assert.match(app.status.textContent, /Chat couldn’t connect/);
});
