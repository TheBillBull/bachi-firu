// Prueba pulsando de verdad: ficha «de un vistazo» del tema 16 (plegar, móvil, oscuro) y los controles del tema (clasificar, emparejar, orden).
// Uso: node herramientas/pruebas/e2e_historia_fil_t16.js
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'historia_fil', 't16');
    const d = p.locator('#detail-t16');
    const vz = d.locator('details.vz');
    chk(cfg.nom + ': hay una ficha', await vz.count(), 1);
    chk(cfg.nom + ': ficha tras «En 1 minuto»', await d.locator('.cab + details.vz').count(), 1);
    chk(cfg.nom + ': abierta de entrada', await vz.evaluate(e => e.open), true);
    chk(cfg.nom + ': 6 bloques numerados', await vz.locator('.vz-bl').count(), 6);
    chk(cfg.nom + ': 10 palabras clave', await vz.locator('.vz-kw dt').count(), 10);
    chk(cfg.nom + ': 2 mini-tablas', await vz.locator('.vz-bl table').count(), 2);
    chk(cfg.nom + ': la ficha cita a Ortega', await vz.innerText(), t => /Ortega/.test(t) && /1883/.test(t) && /circunstancia/i.test(t));
    await vz.locator('summary').click();
    chk(cfg.nom + ': se pliega', await vz.evaluate(e => e.open), false);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se despliega', await vz.locator('.vz-grid').isVisible(), true);
    chk(cfg.nom + ': ficha sin desborde horizontal', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);

    // clasificar: idea o creencia
    const wc = d.locator('[data-w=clasificar]').first();
    await wc.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': clasificar tiene botones', await wc.locator('button').count(), c => c >= 6);
    const MAPA = { 'Una teoría científica': 0, 'Que el suelo me sostendrá': 1, 'Un argumento nuevo sobre política': 0, 'Que mañana habrá clase': 1, 'Una hipótesis que formulas': 0, 'Que las cosas siguen existiendo': 1 };
    for (const [txt, cat] of Object.entries(MAPA)) {
      await wc.locator('.cf-pool .cf-it', { hasText: txt }).first().click();
      await wc.locator('.cf-cat-b').nth(cat).click();
    }
    chk(cfg.nom + ': clasificar, pool vacío tras pulsar todo', await wc.locator('.cf-pool .cf-it').count(), 0);
    await wc.locator('[data-ok]').click();
    chk(cfg.nom + ': clasificar, «¡Todo correcto!»', await wc.locator('.or-msg').innerText(), t => /Todo correcto/.test(t));

    // emparejar: autor y concepto
    const we = d.locator('[data-w=emparejar]').first();
    await we.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': emparejar con 8 botones', await we.locator('button').count(), c => c >= 8);
    for (const [a, b2] of [['Ortega', 'Razón vital e histórica'], ['Zambrano', 'Razón poética'], ['Zubiri', 'Inteligencia sentiente'], ['Unamuno', 'Sentimiento trágico de la vida']]) {
      await we.locator('.em-it[data-l=a]', { hasText: a }).click();
      await we.locator('.em-it[data-l=b]', { hasText: b2 }).click();
    }
    chk(cfg.nom + ': emparejar, completado sin errores', await we.locator('.em-msg').innerText(), t => /Completado con 0 errores/.test(t));

    // orden: obras de Ortega, subiendo cada elemento a su sitio con las flechas
    const wo = d.locator('[data-w=orden]').first();
    await wo.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': orden con 5 elementos', await wo.locator('.or-it').count(), 5);
    for (let pos = 0; pos < 5; pos++) {
      for (let guard = 0; guard < 6; guard++) {
        const ks = await wo.locator('.or-it').evaluateAll(els => els.map(e => +e.getAttribute('data-k')));
        const at = ks.indexOf(pos);
        if (at <= pos) break;
        await wo.locator('.or-it').nth(at).locator('.or-mv[data-d="-1"]').click();
      }
    }
    await wo.locator('[data-ok]').click();
    chk(cfg.nom + ': orden, «¡Orden perfecto!»', await wo.locator('.or-msg').innerText(), t => /Orden perfecto/.test(t));
    chk(cfg.nom + ': controles sin desborde', [await wc.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await we.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await wo.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r.every(Boolean));
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los controles correctas`);
  process.exit(mal ? 1 : 0);
})();
