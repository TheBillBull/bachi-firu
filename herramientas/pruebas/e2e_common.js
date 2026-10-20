const path = require('path');
const RAIZ = process.env.BACHI_RAIZ || path.join(__dirname, '..', '..');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
exports.lanzar = async function (opts = {}) {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: opts.viewport || { width: 1280, height: 900 }, colorScheme: opts.scheme || 'light', deviceScaleFactor: opts.dpr || 1 });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  p.on('console', m => { if (m.type() === 'error' && !/fonts\.g|ERR_|net::|Failed to load resource/.test(m.text())) errs.push('CONSOLE ' + m.text()); });
  await p.goto('file://' + RAIZ + '/index.html', { waitUntil: 'load' });
  await p.waitForTimeout(500);
  return { b, p, errs };
};
exports.abrirTema = async function (p, asig, tema) {
  await p.click('[data-view=asignaturas]');
  await p.locator(`#subjectGrid [data-goto-asig=${asig}]`).first().click();
  await p.waitForTimeout(200);
  await p.locator(`.tema-row[data-tema=${tema}] .tema-open`).click();
  await p.waitForTimeout(500);
};
