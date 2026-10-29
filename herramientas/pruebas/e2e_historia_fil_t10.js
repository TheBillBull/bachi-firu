// Prueba pulsando de verdad: ficha «de un vistazo» del tema 10 (plegar, móvil, oscuro) y el widget filo_hume.
// Uso: node herramientas/pruebas/e2e_historia_fil_t10.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'historia_fil', 't10');
    const d = p.locator('#detail-t10');
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

    // widget «rastrea la idea»
    const wh = d.locator('[data-w=filo_hume]');
    await wh.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': hume: 5 ideas', await wh.locator('.chip-btn').count(), 5);
    chk(cfg.nom + ': hume arranca en «Rojo»', await wh.locator('.ft10-p').first().innerText(), t => /Rojo/.test(t));
    const veredicto = async (txt) => { await wh.locator('.chip-btn', { hasText: txt }).click(); return wh.locator('.ft10-p.v').innerText(); };
    chk(cfg.nom + ': rojo → idea simple legítima', await veredicto('Rojo'), t => /simple legítima/.test(t));
    chk(cfg.nom + ': montaña de oro → compleja legítima', await veredicto('Montaña'), t => /compleja legítima/.test(t));
    chk(cfg.nom + ': unicornio → compleja legítima', await veredicto('Unicornio'), t => /compleja legítima/.test(t));
    chk(cfg.nom + ': conexión necesaria → sin impresión externa', await veredicto('Conexión'), t => /Sin impresión externa/.test(t));
    chk(cfg.nom + ': conexión: menciona hábito', await wh.locator('.ft10-nota').innerText(), t => /hábito/.test(t));
    chk(cfg.nom + ': yo → sin impresión; haz de percepciones', [await veredicto('Yo'), await wh.locator('.ft10-nota').innerText()], r => /Sin impresión/.test(r[0]) && /haz de percepciones/.test(r[1]));
    chk(cfg.nom + ': hume sin desborde', [await wh.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') { await wh.screenshot({ path: captura.replace('.png', '-hume-movil.png') }); }
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y del widget correctas`);
  process.exit(mal ? 1 : 0);
})();
