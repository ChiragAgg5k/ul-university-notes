// Invoke with a Playwright Page; defaults to the local server documented in README.
// Playwright is supplied by the caller, not shipped to the browser.
export async function checkPortfolio(page, base = 'http://127.0.0.1:5709') {
  await page.goto(`${base}/knowledge.html`);
  for (const [skill, count] of [
    ['Go', 1],
    ['APIs', 2],
    ['All', 3],
  ]) {
    const button = page.getByRole('button', { name: skill, exact: true });
    await button.focus();
    await page.keyboard.press('Space');
    if ((await page.locator('.case-study:visible').count()) !== count)
      throw new Error(`${skill}: wrong result count`);
    if ((await button.getAttribute('aria-pressed')) !== 'true')
      throw new Error(`${skill}: wrong pressed state`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth))
    throw new Error('Horizontal overflow');
  const context = await page.context().browser().newContext({ javaScriptEnabled: false });
  try {
    const plain = await context.newPage();
    await plain.goto(`${base}/knowledge.html`);
    if ((await plain.locator('.case-study:visible').count()) !== 3)
      throw new Error('No-script content missing');
    if (await plain.locator('[data-project-filter]').isVisible())
      throw new Error('No-script controls exposed');
  } finally {
    await context.close();
  }
  await page.goto(`${base}/blog.html`);
  await page.getByRole('link', { name: 'Read the article' }).first().click();
  if (!page.url().endsWith('/blog-logging.html')) throw new Error('Article navigation failed');
  return 'Filter, keyboard, mobile, no-script fallback and article navigation passed';
}
