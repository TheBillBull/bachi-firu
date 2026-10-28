// Prueba pulsando de verdad: ficha «de un vistazo» del tema 6 (plegar, columnas, móvil, oscuro) y las actividades
// (clasificar, emparejar, ordenar, test), resolviéndolas con las respuestas correctas.
// Uso: node herramientas/pruebas/e2e_historia_fil_t6.js
const { lanzar, abrirTema } = require('./e2e_common.js');
const W = r => `[data-w][data-ref="historia_fil/t6/${r}"]`;
(async () => {
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'historia_fil', 't6');
    const d = p.locator('#detail-t6');
    const vz = d.locator('details.vz');
    chk(cfg.nom + ': ficha tras «En 1 minuto»', await d.locator('.cab + details.vz').count(), 1);
    chk(cfg.nom + ': abierta de entrada', await vz.evaluate(e => e.open), true);
    chk(cfg.nom + ': 6 bloques numerados', await vz.locator('.vz-bl').count(), 6);
    chk(cfg.nom + ': 10 palabras clave', await vz.locator('.vz-kw dt').count(), 10);
    chk(cfg.nom + ': 3 mini-tablas', await vz.locator('.vz-bl table').count(), 3);
    const cols = await vz.locator('.vz-grid').evaluate(e => getComputedStyle(e).gridTemplateColumns.split(' ').length);
    chk(cfg.nom + ': columnas (3 escritorio, 1 móvil)', cols, cfg.nom === 'escritorio' ? 3 : 1);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se pliega', await vz.evaluate(e => e.open), false);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se despliega', await vz.locator('.vz-grid').isVisible(), true);
    chk(cfg.nom + ': sin desborde horizontal (ficha)', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);

    // clasificar los deseos
    const cf = d.locator(W('ciudades'));
    await cf.scrollIntoViewIfNeeded();
    await cf.locator('[data-ok]').click();
    chk(cfg.nom + ': clasificar incompleto avisa', await cf.locator('.or-msg').innerText(), t => /Te faltan 6/.test(t));
    const grupos = [['Amor a Dios hasta', 'Busca la paz', 'Vive según Dios'], ['Amor a sí mismo', 'Busca el poder', 'Vive según sí mismo']];
    for (let cat = 0; cat < 2; cat++) for (const t of grupos[cat]) {
      await cf.locator('.cf-pool .cf-it', { hasText: t }).first().click();
      await cf.locator(`.cf-cat-b[data-c="${cat}"]`).click();
    }
    await cf.locator('[data-ok]').click();
    chk(cfg.nom + ': clasificar correcto', await cf.locator('.or-msg').innerText(), t => /Todo correcto/.test(t));
    chk(cfg.nom + ': clasificar 6 en verde', await cf.locator('.cf-it.ok').count(), 6);

    // emparejar
    const em = d.locator(W('posturas'));
    await em.scrollIntoViewIfNeeded();
    const pares = [['Tertuliano', 'Rechazo'], ['Justino', 'Aprovechamiento'], ['Agustín', 'Síntesis']];
    for (const [a, bb] of pares) {
      await em.locator('.em-it[data-l="a"]', { hasText: a }).click();
      await em.locator('.em-it[data-l="b"]', { hasText: bb }).click();
    }
    chk(cfg.nom + ': emparejar completado', await em.locator('.em-msg').innerText(), t => /Completado con 0 errores/.test(t));

    // ordenar
    const o = d.locator(W('camino'));
    await o.scrollIntoViewIfNeeded();
    const esperado = ['354', '386', '410', '413', '430'];
    for (let vuelta = 0; vuelta < 30; vuelta++) {
      const txt = (await o.locator('.or-t').allInnerTexts()).map(s => s.trim());
      const i = txt.findIndex((s, k) => !s.startsWith(esperado[k]));
      if (i < 0) break;
      const j = txt.findIndex(s => s.startsWith(esperado[i]));
      await o.locator('.or-it').nth(j).locator('.or-mv[data-d="-1"]').click();
    }
    await o.locator('[data-ok]').click();
    chk(cfg.nom + ': ordenar el camino de Agustín', await o.locator('.or-msg').innerText(), t => /✓|correcto|Perfecto/i.test(t));

    // test
    const qz = d.locator(W('quiz1'));
    await qz.scrollIntoViewIfNeeded();
    const ok = ['los Padres de la Iglesia', 'Hipona', 'si me equivoco, existo', 'en la mente de Dios', 'cómo conocemos verdades eternas', 'privación de bien', 'del uso del libre albedrío', 'la necesidad de la gracia', 'el amor', 'lineal, con sentido'];
    for (let q = 0; q < ok.length; q++) await qz.locator(`.qz-p[data-q="${q}"] .qz-op`, { hasText: ok[q] }).click();
    chk(cfg.nom + ': test 10 de 10', await qz.locator('.qz-fin').innerText(), t => /10 de 10/.test(t));

    chk(cfg.nom + ': sin desborde horizontal (final)', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de las actividades correctas`);
  process.exit(mal ? 1 : 0);
})();
