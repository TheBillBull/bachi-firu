const __fs = require('fs'); __fs.mkdirSync('shots', { recursive: true });
// Prueba genérica de un tema ampliado: monta widgets, capturas por widget, errores
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const [,, asig, tema, prefijo, vp] = process.argv;
  const { b, p, errs } = await lanzar({ viewport: vp === 'movil' ? { width: 390, height: 844 } : { width: 1280, height: 900 }, dpr: 1 });
  await abrirTema(p, asig, tema);
  const d = p.locator(`#detail-${tema}`);
  const info = await p.evaluate((t) => [...document.querySelectorAll('#detail-' + t + ' [data-w]')].map(w => w.getAttribute('data-w') + (w.getAttribute('data-ok') ? '✓' : '✗') + (w.querySelector('.w-error') ? '!ERR' : '')), tema);
  console.log('secciones:', await d.locator('.lesson-block > h3').count(), '· palabras en .ampl:', await p.evaluate(t => [...document.querySelectorAll('#detail-' + t + ' .ampl')].reduce((a, e) => a + e.innerText.split(/\s+/).length, 0), tema));
  console.log('widgets:', info.join(', '));
  const lista = await d.locator('[data-w]').all(); let i = 0;
  for (const w of lista) { const n = await w.getAttribute('data-w'); if (['quiz', 'tarjetas'].includes(n) && i > 6) { i++; continue; } await w.scrollIntoViewIfNeeded(); await p.waitForTimeout(150); await w.screenshot({ path: `shots/${prefijo}-${String(i++).padStart(2, '0')}-${n}.png` }).catch(() => {}); }
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log('desborde horizontal:', ov > 0 ? ov + ' px' : 'ninguno', '· errores JS:', errs.length ? errs : 'ninguno');
  await b.close();
})();
