// Monta widgets sueltos en una página limpia y hace capturas. Uso: node e2e_montaje.js <claro|oscuro> <movil|escritorio> w1,w2,... [prefijo]
const { lanzar } = require('./e2e_common.js');
(async () => {
  const oscuro = process.argv[2] === 'oscuro', movil = process.argv[3] === 'movil', nombres = (process.argv[4] || '').split(',').filter(Boolean), pref = process.argv[5] || 'mnt';
  require('fs').mkdirSync('shots', { recursive: true });
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1100, height: 900 }, scheme: oscuro ? 'dark' : 'light' });
  await p.evaluate((n) => {
    const cont = document.createElement('div'); cont.id = 'ban'; cont.className = 'ampl'; cont.style.cssText = 'max-width:720px;margin:0 auto;padding:10px;background:var(--sheet)';
    n.forEach(x => { const d = document.createElement('div'); d.setAttribute('data-w', x); d.id = 'w-' + x; cont.appendChild(d); });
    [...document.body.children].forEach(c => { if (!/^(STYLE|SCRIPT)$/.test(c.tagName)) c.style.display = 'none'; });
    document.body.appendChild(cont); BACHI.montar(cont);
  }, nombres);
  await p.waitForTimeout(300);
  for (const n of nombres) {
    const r = await p.evaluate((n) => { const e = document.getElementById('w-' + n); return { err: !!e.querySelector('.w-error'), lec: e.querySelectorAll('.lec').length, svg: !!e.querySelector('svg.plot'), ancho: e.scrollWidth - e.clientWidth }; }, n);
    console.log(n.padEnd(14), JSON.stringify(r));
    await p.locator('#w-' + n).screenshot({ path: `shots/${pref}_${n}${oscuro ? '_osc' : ''}${movil ? '_mov' : ''}.png` });
  }
  console.log('errores JS:', errs.length ? errs : 'ninguno');
  await b.close();
})();
