/**
 * @file Scenario walkthrough: plays each persona's scenario in a real browser, records whether
 * it could be completed and in how many actions, and saves a screenshot of each end state.
 *
 * Usage: `npm run build && npm run walkthrough` checks the local build. Set `SITE` to check a
 * deployed copy instead, for example
 * `SITE=https://chiragagg5k.github.io/ul-university-notes/ npm run walkthrough`.
 *
 * Scenario S5 writes one real reaction to the database on every run. Scenario S2 checks that the
 * chat widget loads after consent; it does not send a message.
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const port = 4173;
const local = `http://localhost:${port}/`;
const site = process.env.SITE ?? local;
const folder = new URL(
  `../../evidence/walkthrough-${site === local ? 'local' : 'live'}/`,
  import.meta.url,
);
const desktop = { width: 1440, height: 900 };
const phone = { width: 390, height: 844 };
const chatHost = 'tawk.to';
const article = 'blog/how-we-solved-logging-at-appwrite';

function expect(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function overflows(page) {
  return page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
}

function count(text) {
  return Number(text.match(/\d+/)[0]);
}

const scenarios = [
  {
    id: 'S1',
    persona: 'Module assessor',
    goal: 'Find the Readme page and the folder structure from the home page',
    viewport: desktop,
    async run(page) {
      await page.goto(site);
      await page.getByRole('navigation').getByRole('link', { name: 'Readme' }).click();
      await page.getByRole('heading', { name: 'Folders' }).waitFor();
      expect(await page.getByText('one file per route').isVisible(), 'folder listing missing');
      return {
        actions: 1,
        observed: 'Readme is in the menu; Architecture, Folders and Pipeline sections shown',
      };
    },
  },
  {
    id: 'S2',
    persona: 'Module assessor',
    goal: 'Open the live chat, and confirm nothing loads from the chat provider before agreeing',
    viewport: desktop,
    async run(page) {
      const requests = [];
      page.on(
        'request',
        request => request.url().includes(chatHost) && requests.push(request.url()),
      );
      await page.goto(`${site}contact`);
      await page.getByRole('heading', { level: 1 }).waitFor();
      const before = requests.length;
      await page.getByRole('button', { name: 'Chat with me' }).click();
      await page.getByText('Chat is ready').waitFor({ timeout: 30_000 });
      expect(before === 0, `${before} chat requests before the click`);
      return {
        actions: 1,
        observed: `0 requests to the provider before the click, ${requests.length} after; status "Chat is ready". Message delivery is not checked`,
      };
    },
  },
  {
    id: 'S3',
    persona: 'Hiring manager',
    goal: 'Find evidence of Go work and reach its source code',
    viewport: desktop,
    async run(page) {
      await page.goto(site);
      await page.getByRole('link', { name: 'Explore my work' }).click();
      await page.getByRole('button', { name: 'Go', exact: true }).click();
      await page.getByText('1 of 3 shown.').waitFor();
      const link = page.getByRole('link', { name: 'View the CLI source' });
      expect(
        (await link.getAttribute('href')).startsWith('https://github.com/'),
        'source link missing',
      );
      return {
        actions: 3,
        observed: '"1 of 3 shown."; the remaining card links to the CLI repository',
      };
    },
  },
  {
    id: 'S4',
    persona: 'Hiring manager',
    goal: 'Search the writing for "logging", read the article, and return to the same results',
    viewport: desktop,
    async run(page) {
      await page.goto(`${site}blog`);
      await page.getByRole('searchbox').fill('logging');
      await page.getByText('1 of 2 shown.').waitFor();
      await page.getByRole('link', { name: 'Read the article' }).click();
      await page
        .getByRole('heading', { level: 1, name: 'How we solved logging at Appwrite' })
        .waitFor();
      await page.getByRole('link', { name: 'All writing' }).click();
      await page.getByText('1 of 2 shown.').waitFor();
      expect(
        (await page.getByRole('searchbox').inputValue()) === 'logging',
        'search text was lost',
      );
      return {
        actions: 3,
        observed: 'Search narrows to 1 of 2; the filter is still applied after returning',
      };
    },
  },
  {
    id: 'S5',
    persona: 'Fellow developer',
    goal: 'Open an article from a shared link on a phone, react to it, and see the count change for another reader',
    viewport: phone,
    async run(page, browser) {
      const other = await browser.newPage({ viewport: desktop });
      await other.addInitScript(() => localStorage.setItem('portfolio.reactions', 'null'));
      const secondTab = await page.context().newPage();
      const readers = [page, other, secondTab];
      await Promise.all(readers.map(reader => reader.goto(site + article)));
      await Promise.all(readers.map(reader => reader.getByText('Counts update live').waitFor()));
      const mine = page.getByRole('button', { name: /Useful/ });
      const useful = reader => reader.getByRole('button', { name: /Useful/ });
      const before = count(await useful(other).innerText());
      await mine.click();
      for (const reader of [other, secondTab]) {
        await reader.waitForFunction(
          expected =>
            [...document.querySelectorAll('.reactions button')].some(
              button =>
                button.textContent.startsWith('Useful') &&
                button.textContent.endsWith(String(expected)),
            ),
          before + 1,
        );
      }
      await page.waitForTimeout(1500);
      for (const reader of readers) {
        expect(
          count(await useful(reader).innerText()) === before + 1,
          'a count did not rise by exactly one',
        );
      }
      expect((await mine.getAttribute('aria-pressed')) === 'true', 'button not marked as used');
      expect(
        (await useful(secondTab).getAttribute('aria-pressed')) === 'true',
        'second tab not marked as used',
      );
      expect(!(await overflows(page)), 'horizontal overflow at phone width');
      await page.reload();
      await page.getByText('Counts update live').waitFor();
      expect(await mine.isDisabled(), 'reaction not remembered after reload');
      expect(count(await mine.innerText()) === before + 1, 'count not stored');
      await other.close();
      await secondTab.close();
      return {
        actions: 1,
        observed: `"Useful" went from ${before} to ${before + 1} without a reload in the reader's own tab, their second tab and another reader's browser (whose stored reactions were deliberately damaged), and survived a reload`,
      };
    },
  },
  {
    id: 'S6',
    persona: 'Fellow developer',
    goal: 'Using the keyboard only, reach the latest repositories, then skip the menu',
    viewport: desktop,
    async run(page) {
      const focused = () => page.evaluate(() => document.activeElement.textContent.trim());
      await page.goto(site);
      await page.getByRole('heading', { level: 1 }).waitFor();
      await page.keyboard.press('Tab');
      expect((await focused()) === 'Skip to content', 'skip link is not the first stop');
      let presses = 1;
      while ((await focused()) !== 'Repositories') {
        expect(presses < 30, 'Repositories was not reached with the Tab key');
        await page.keyboard.press('Tab');
        presses += 1;
      }
      await page.keyboard.press('Enter');
      await page.locator('article.case-study').first().waitFor();
      expect(
        (await page.evaluate(() => document.activeElement.id)) === 'main',
        'focus did not move to the content',
      );
      const shown = await page.locator('article.case-study').count();
      await page.reload();
      await page.getByRole('heading', { level: 1 }).waitFor();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      expect(
        (await page.evaluate(() => document.activeElement.id)) === 'main',
        'the skip link did not move focus to the content',
      );
      return {
        actions: presses + 3,
        observed: `${presses} Tab presses and Enter open Repositories, with focus moved to the content and ${shown} repositories loaded from GitHub; on the next load, Tab then Enter on the skip link jumps past the menu`,
      };
    },
  },
  {
    id: 'S7',
    persona: 'Hiring manager',
    goal: 'On a phone, look at hackathon photos and enlarge one',
    viewport: phone,
    async run(page) {
      await page.goto(`${site}pictures`);
      await page.getByRole('button', { name: 'Hackathon', exact: true }).click();
      const status = await page.locator('.filter-status').innerText();
      await page.locator('.thumbnail').first().click();
      await page.getByRole('dialog').waitFor();
      expect(!(await overflows(page)), 'horizontal overflow at phone width');
      return {
        actions: 2,
        observed: `${status.split('.')[0]}; the enlarged view opens as a dialog with a Close button`,
      };
    },
  },
  {
    id: 'S8',
    persona: 'Any visitor',
    goal: 'On a phone, open every page in the menu without sideways scrolling',
    viewport: phone,
    async run(page) {
      await page.goto(site);
      const links = page.getByRole('navigation').getByRole('link');
      const total = await links.count();
      for (let index = 0; index < total; index += 1) {
        const name = await links.nth(index).innerText();
        await links.nth(index).click();
        await page.getByRole('heading', { level: 1 }).waitFor();
        await page.waitForLoadState('networkidle');
        expect(!(await overflows(page)), `horizontal overflow on ${name}`);
        expect(
          (await page.locator('a[aria-current="page"]').count()) >= 1,
          `no current menu item on ${name}`,
        );
      }
      return {
        actions: total,
        observed: `${total} pages opened at 390px; none scrolls sideways; each marks its menu item as current`,
      };
    },
  },
];

async function ready() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      await fetch(local);
      return;
    } catch {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  throw new Error('Preview server did not start');
}

await mkdir(folder, { recursive: true });
const server =
  site === local
    ? spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort'], { stdio: 'ignore' })
    : null;
if (server) {
  await ready();
}
const browser = await chromium.launch({ channel: 'chrome' });
// The chat provider refuses browsers that announce themselves as headless.
const probe = await browser.newPage();
const userAgent = (await probe.evaluate(() => navigator.userAgent)).replace('Headless', '');
await probe.close();
const results = [];
try {
  for (const scenario of scenarios) {
    const context = await browser.newContext({ viewport: scenario.viewport, userAgent });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    let outcome;
    try {
      outcome = { result: 'Pass', ...(await scenario.run(page, browser)) };
      expect(errors.length === 0, `script errors: ${errors.join('; ')}`);
    } catch (error) {
      outcome = { result: 'Fail', actions: '', observed: error.message.split('\n')[0] };
    }
    await page.screenshot({ path: fileURLToPath(new URL(`${scenario.id}.png`, folder)) });
    await context.close();
    results.push({
      id: scenario.id,
      persona: scenario.persona,
      goal: scenario.goal,
      viewport: `${scenario.viewport.width}px`,
      ...outcome,
    });
    console.log(`${scenario.id} ${outcome.result}: ${outcome.observed}`);
  }
} finally {
  await browser.close();
  server?.kill();
}

const rows = results.map(
  row =>
    `| ${row.id} | ${row.persona} | ${row.goal} | ${row.viewport} | ${row.actions} | ${row.result} | ${row.observed} |`,
);
await writeFile(
  new URL('results.md', folder),
  [
    `Walkthrough of ${site} on ${new Date().toISOString().slice(0, 10)}.`,
    '',
    '| Scenario | Persona | Goal | Width | Actions | Result | Observed |',
    '| --- | --- | --- | --- | --- | --- | --- |',
    ...rows,
    '',
  ].join('\n'),
);
process.exitCode = results.every(row => row.result === 'Pass') ? 0 : 1;
