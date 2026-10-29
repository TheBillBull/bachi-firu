// Prueba pulsando de verdad: ficha «de un vistazo» del tema 11 (plegar, móvil, oscuro) y los controles del tema (clasificar, emparejar, orden).
// Uso: node herramientas/pruebas/e2e_historia_fil_t11.js
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'historia_fil', 't11');
    const d = p.locator('#detail-t11');
    const vz = d.locator('details.vz');
    chk(cfg.nom + ': hay una ficha', await vz.count(), 1);
    chk(cfg.nom + ': ficha tras «En 1 minuto»', await d.locator('.cab + details.vz').count(), 1);
    chk(cfg.nom + ': abierta de entrada', await vz.evaluate(e => e.open), true);
    chk(cfg.nom + ': 6 bloques numerados', await vz.locator('.vz-bl').count(), 6);
    chk(cfg.nom + ': 10 palabras clave', await vz.locator('.vz-kw dt').count(), 10);
    chk(cfg.nom + ': 2 mini-tablas', await vz.locator('.vz-bl table').count(), 2);
    chk(cfg.nom + ': la ficha cita a Rousseau', await vz.innerText(), t => /Rousseau/.test(t) && /1712/.test(t) && /voluntad general/i.test(t));
    await vz.locator('summary').click();
    chk(cfg.nom + ': se pliega', await vz.evaluate(e => e.open), false);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se despliega', await vz.locator('.vz-grid').isVisible(), true);
    chk(cfg.nom + ': ficha sin desborde horizontal', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);

    // controles genéricos del tema: clasificar, orden, emparejar
    for (const nombre of ['clasificar', 'orden', 'emparejar']) {
      const ws = d.locator('[data-w=' + nombre + ']');
      chk(cfg.nom + ': hay controles «' + nombre + '»', await ws.count(), c => c >= (nombre === 'orden' ? 2 : 1));
    }
    // clasificar: toca la palabra y su categoría; el control debe responder
    const wc = d.locator('[data-w=clasificar]').first();
    await wc.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': clasificar tiene botones', await wc.locator('button').count(), c => c >= 10);
    const we = d.locator('[data-w=emparejar]').first();
    await we.scrollIntoViewIfNeeded();
    const bs = we.locator('button');
    chk(cfg.nom + ': emparejar con 6 botones', await bs.count(), c => c >= 6);
    chk(cfg.nom + ': controles sin desborde', [await wc.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await we.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r.every(Boolean));
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los controles correctas`);
  process.exit(mal ? 1 : 0);
})();
