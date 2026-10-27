// Monta widgets sueltos en una página vacía y comprueba que no fallan.
//   node herramientas/pruebas/e2e_montaje.js nombre1,nombre2 [movil|escritorio] [carpetaCapturas]
const { lanzar } = require('./e2e_common.js');
const fs = require('fs');
(async () => {
  const nombres = (process.argv[2] || '').split(',').filter(Boolean), movil = process.argv[3] === 'movil', dir = process.argv[4] || 'shots';
  fs.mkdirSync(dir, { recursive: true });
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1100, height: 900 } });
  await p.evaluate((n) => {
    const cont = document.createElement('div'); cont.id = 'ban'; cont.className = 'ampl'; cont.style.cssText = 'max-width:720px;margin:0 auto;padding:10px;background:var(--sheet)';
    n.forEach(x => { const d = document.createElement('div'); d.setAttribute('data-w', x); d.id = 'w-' + x; cont.appendChild(d); });
    [...document.body.children].forEach(c => { if (!/^(STYLE|SCRIPT)$/.test(c.tagName)) c.style.display = 'none'; }); document.body.appendChild(cont); BACHI.montar(cont);
  }, nombres);
  await p.waitForTimeout(300);
  for (const n of nombres) {
    const r = await p.evaluate((n) => { const e = document.getElementById('w-' + n); return { err: !!e.querySelector('.w-error'), lec: e.querySelectorAll('.lec').length, svg: !!e.querySelector('svg.plot'), ancho: e.scrollWidth - e.clientWidth }; }, n);
    console.log(n.padEnd(16), JSON.stringify(r));
    const el = p.locator('#w-' + n); await el.scrollIntoViewIfNeeded(); await el.screenshot({ path: `${dir}/${n}${movil ? '_m' : ''}.png` });
  }
  console.log('errores JS:', errs.length ? errs : 'ninguno');
  await b.close();
})();
