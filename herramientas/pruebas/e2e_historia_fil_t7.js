// Prueba pulsando de verdad: ficha «de un vistazo» del tema 7 (plegar, móvil, oscuro) y el widget filo_vias.
// Uso: node herramientas/pruebas/e2e_historia_fil_t7.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'historia_fil', 't7');
    const d = p.locator('#detail-t7');
    const vz = d.locator('details.vz');
    chk(cfg.nom + ': hay una ficha', await vz.count(), 1);
    chk(cfg.nom + ': ficha tras «En 1 minuto»', await d.locator('.cab + details.vz').count(), 1);
    chk(cfg.nom + ': abierta de entrada', await vz.evaluate(e => e.open), true);
    chk(cfg.nom + ': 6 bloques numerados', await vz.locator('.vz-bl').count(), 6);
    chk(cfg.nom + ': 10 palabras clave', await vz.locator('.vz-kw dt').count(), 10);
    chk(cfg.nom + ': 3 mini-tablas', await vz.locator('.vz-bl table').count(), 3);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se pliega', await vz.evaluate(e => e.open), false);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se despliega', await vz.locator('.vz-grid').isVisible(), true);
    chk(cfg.nom + ': ficha sin desborde horizontal', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
    if (captura && cfg.nom === 'escritorio') { await vz.scrollIntoViewIfNeeded(); await vz.screenshot({ path: captura }); }

    // widget de las cinco vías
    const wv = d.locator('[data-w=filo_vias]');
    await wv.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': vías: 5 fichas', await wv.locator('.chip-btn').count(), 5);
    chk(cfg.nom + ': vías: 3 cuadros y el primer término resaltado', [await wv.locator('.ft7-c').count(), await wv.locator('.ft7-c.f b.t').innerText()], r => r[0] === 3 && /primer término/i.test(r[1]));
    const vía = async (txt) => { await wv.locator('.chip-btn', { hasText: txt }).click(); return wv.locator('.ft7-det').innerText(); };
    chk(cfg.nom + ': movimiento → primer motor inmóvil', await vía('Movimiento'), t => /primer motor inmóvil/.test(t) && /vagón/.test(t));
    chk(cfg.nom + ': causa eficiente → primera causa', await vía('Causa eficiente'), t => /primera causa eficiente/.test(t) && /tus padres/.test(t));
    chk(cfg.nom + ': contingencia → ser necesario', await vía('Contingencia'), t => /ser necesario/.test(t) && /vela/.test(t));
    chk(cfg.nom + ': grados → ser máximamente perfecto', await vía('Grados'), t => /máximamente perfecto/.test(t));
    chk(cfg.nom + ': finalidad → inteligencia ordenadora (flecha y arquero)', await vía('Orden'), t => /inteligencia ordenadora/.test(t) && /arquero/.test(t));
    chk(cfg.nom + ': vías sin desborde', [await wv.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') { await wv.screenshot({ path: captura.replace('.png', '-vias-movil.png') }); }
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y del widget correctas`);
  process.exit(mal ? 1 : 0);
})();
