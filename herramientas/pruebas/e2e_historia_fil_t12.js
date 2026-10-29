// Prueba pulsando de verdad: ficha «de un vistazo» del tema 12 (plegar, móvil, oscuro) y los widgets filo_juicios y filo_universal.
// Uso: node herramientas/pruebas/e2e_historia_fil_t12.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'historia_fil', 't12');
    const d = p.locator('#detail-t12');
    const vz = d.locator('details.vz');
    chk(cfg.nom + ': hay una ficha', await vz.count(), 1);
    chk(cfg.nom + ': ficha tras «En 1 minuto»', await d.locator('.cab + details.vz').count(), 1);
    chk(cfg.nom + ': abierta de entrada', await vz.evaluate(e => e.open), true);
    chk(cfg.nom + ': 6 bloques numerados', await vz.locator('.vz-bl').count(), 6);
    chk(cfg.nom + ': 10 palabras clave', await vz.locator('.vz-kw dt').count(), 10);
    chk(cfg.nom + ': 4 mini-tablas', await vz.locator('.vz-bl table').count(), 4);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se pliega', await vz.evaluate(e => e.open), false);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se despliega', await vz.locator('.vz-grid').isVisible(), true);
    chk(cfg.nom + ': ficha sin desborde horizontal', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
    if (captura && cfg.nom === 'escritorio') { await vz.scrollIntoViewIfNeeded(); await vz.screenshot({ path: captura }); }

    // widget «clasifica el juicio»
    const wj = d.locator('[data-w=filo_juicios]');
    await wj.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': juicios: 8 fichas de juicio + 2 + 2 respuestas', await wj.locator('.chip-btn').count(), 12);
    chk(cfg.nom + ': juicios: sin responder, pide las dos respuestas', await wj.locator('.ft12-nota').innerText(), t => /Responde a las dos/.test(t));
    const resp = async (i, txt) => { await wj.locator('.chip-btn', { hasText: i }).click(); await wj.locator('.chip-btn', { hasText: txt }).click(); return wj.locator('.ft12-nota').innerText(); };
    // 7 + 5 = 12: sintético a priori
    await wj.locator('.chip-btn', { hasText: '7 + 5' }).click();
    await wj.locator('.chip-btn', { hasText: 'No (sintético)' }).click();
    chk(cfg.nom + ': tras una sola respuesta aún pide la otra', await wj.locator('.ft12-nota').innerText(), t => /Responde a las dos/.test(t));
    await wj.locator('.chip-btn', { hasText: 'No (a priori)' }).click();
    chk(cfg.nom + ': 7+5 sintético a priori → correcto', await wj.locator('.ft12-nota').innerText(), t => /Correcto: Sintético \+ a priori/.test(t));
    chk(cfg.nom + ': la casilla sintético/a priori se marca', await wj.locator('.ft12-m > .on').innerText(), t => /Amplía y es universal/.test(t));
    // respuesta equivocada: «Hoy llueve» marcado como a priori
    await wj.locator('.chip-btn', { hasText: 'Hoy llueve' }).click();
    chk(cfg.nom + ': al cambiar de juicio se reinician las respuestas', await wj.locator('.ft12-nota').innerText(), t => /Responde a las dos/.test(t));
    await wj.locator('.chip-btn', { hasText: 'No (sintético)' }).click();
    await wj.locator('.chip-btn', { hasText: 'No (a priori)' }).click();
    chk(cfg.nom + ': error detectado', await wj.locator('.ft12-nota').innerText(), t => /Revisa, es: Sintético \+ a posteriori/.test(t));
    await wj.locator('.chip-btn', { hasText: 'Todos los cuerpos son extensos' }).click();
    await wj.locator('.chip-btn', { hasText: 'Sí (analítico)' }).click();
    await wj.locator('.chip-btn', { hasText: 'No (a priori)' }).click();
    chk(cfg.nom + ': extensos → analítico a priori', await wj.locator('.ft12-nota').innerText(), t => /Correcto: Analítico \+ a priori/.test(t));
    chk(cfg.nom + ': juicios sin desborde', [await wj.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') { await wj.screenshot({ path: captura.replace('.png', '-juicios-movil.png') }); }

    // widget «test de la ley universal»
    const wu = d.locator('[data-w=filo_universal]');
    await wu.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': universal: 5 máximas', await wu.locator('.chip-btn').count(), 5);
    chk(cfg.nom + ': universal arranca en la promesa falsa', await wu.locator('.ft12-p').first().innerText(), t => /prometeré devolverlo/.test(t));
    const veredicto = async (txt) => { await wu.locator('.chip-btn', { hasText: txt }).click(); return wu.locator('.ft12-p.v').innerText(); };
    chk(cfg.nom + ': promesa → contradicción en el concepto', await veredicto('Prometer'), t => /en el concepto/.test(t));
    chk(cfg.nom + ': talentos → contradicción en la voluntad', await veredicto('talentos'), t => /en la voluntad/.test(t));
    chk(cfg.nom + ': no ayudar → contradicción en la voluntad', await veredicto('No ayudar'), t => /en la voluntad/.test(t));
    chk(cfg.nom + ': copiar → ejemplo propio y concepto', [await veredicto('Copiar'), await wu.locator('.ft12-nota').innerText()], r => /en el concepto/.test(r[0]) && /Ejemplo nuestro/.test(r[1]));
    chk(cfg.nom + ': universal sin desborde', [await wu.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') { await wu.screenshot({ path: captura.replace('.png', '-universal-movil.png') }); }
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los widgets correctas`);
  process.exit(mal ? 1 : 0);
})();
