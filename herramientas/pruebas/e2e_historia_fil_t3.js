// Prueba pulsando de verdad: ficha «de un vistazo» del tema 3 (plegar, columnas, móvil, oscuro) y el widget filo_caverna.
// Uso: node herramientas/pruebas/e2e_historia_fil_t3.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'historia_fil', 't3');
    const d = p.locator('#detail-t3');
    const vz = d.locator('details.vz');
    chk(cfg.nom + ': hay una ficha', await vz.count(), 1);
    chk(cfg.nom + ': ficha tras «En 1 minuto»', await d.locator('.cab + details.vz').count(), 1);
    chk(cfg.nom + ': abierta de entrada', await vz.evaluate(e => e.open), true);
    chk(cfg.nom + ': 6 bloques numerados', await vz.locator('.vz-bl').count(), 6);
    chk(cfg.nom + ': 10 palabras clave', await vz.locator('.vz-kw dt').count(), 10);
    chk(cfg.nom + ': 2 mini-tablas', await vz.locator('.vz-bl table').count(), 2);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se pliega', await vz.evaluate(e => e.open), false);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se despliega', await vz.locator('.vz-grid').isVisible(), true);
    chk(cfg.nom + ': ficha sin desborde horizontal', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
    if (captura && cfg.nom === 'escritorio') { await vz.scrollIntoViewIfNeeded(); await vz.screenshot({ path: captura }); }

    // widget de la caverna
    const wd = d.locator('[data-w=filo_caverna]');
    await wd.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': caverna: 6 etapas', await wd.locator('.chip-btn').count(), 6);
    chk(cfg.nom + ': caverna arranca en las sombras (eikasía activa)', await wd.locator('.ft3-n.on b').innerText(), 'Imaginación');
    chk(cfg.nom + ': caverna: 4 niveles de la línea', await wd.locator('.ft3-n').count(), 4);
    const nivelDe = async (txt) => { await wd.locator('.chip-btn', { hasText: txt }).click(); return wd.locator('.ft3-n.on b').allInnerTexts(); };
    chk(cfg.nom + ': giro → creencia', await nivelDe('2 Giro'), r => r.length === 1 && r[0] === 'Creencia');
    chk(cfg.nom + ': reflejos → razonamiento', await nivelDe('3 Reflejos'), r => r.length === 1 && r[0] === 'Razonamiento');
    chk(cfg.nom + ': seres reales → inteligencia', await nivelDe('4 Seres reales'), r => r.length === 1 && r[0] === 'Inteligencia');
    chk(cfg.nom + ': Sol → inteligencia y menciona el Bien', await nivelDe('5 Sol'), r => r[0] === 'Inteligencia');
    chk(cfg.nom + ': Sol: la ficha dice Idea de Bien', await wd.locator('.ft3-det').innerText(), t => /Idea de Bien/.test(t));
    chk(cfg.nom + ': regreso → ningún nivel activo', await nivelDe('6 Regreso'), r => r.length === 0);
    chk(cfg.nom + ': regreso: menciona a Sócrates', await wd.locator('.ft3-det').innerText(), t => /Sócrates/.test(t));
    chk(cfg.nom + ': widget sin desborde', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
    chk(cfg.nom + ': widget no se sale de su caja', await wd.evaluate(e => e.scrollWidth <= e.clientWidth + 1), true);
    if (captura && cfg.nom !== 'escritorio') { await wd.screenshot({ path: captura.replace('.png', '-movil.png') }); }
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y del widget correctas`);
  process.exit(mal ? 1 : 0);
})();
