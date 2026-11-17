// Prueba pulsando de verdad: ficha «de un vistazo» del tema 15 de Biología II (plegar, móvil oscuro) y los widgets
// bio_respuesta, bio_anticuerpo y bio_transfusion.
// Uso: node herramientas/pruebas/e2e_bio2_t15.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  const fijar = async (loc, v) => { await loc.evaluate((e, x) => { e.value = x; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v)); };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'bio2', 't15');
    const d = p.locator('#detail-t15');
    const vz = d.locator('details.vz');
    chk(cfg.nom + ': hay una ficha', await vz.count(), 1);
    chk(cfg.nom + ': ficha tras «En 1 minuto»', await d.locator('.cab + details.vz').count(), 1);
    chk(cfg.nom + ': abierta de entrada', await vz.evaluate(e => e.open), true);
    chk(cfg.nom + ': 6 bloques numerados', await vz.locator('.vz-bl').count(), 6);
    chk(cfg.nom + ': 10 palabras clave', await vz.locator('.vz-kw dt').count(), 10);
    chk(cfg.nom + ': 6 mini-tablas', await vz.locator('.vz-bl table').count(), 6);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se pliega', await vz.evaluate(e => e.open), false);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se despliega', await vz.locator('.vz-grid').isVisible(), true);
    chk(cfg.nom + ': ficha sin desborde', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
    if (captura && cfg.nom === 'escritorio') { await vz.scrollIntoViewIfNeeded(); await vz.screenshot({ path: captura }); }

    // respuesta primaria y secundaria
    const wr = d.locator('[data-w=bio_respuesta]');
    await wr.scrollIntoViewIfNeeded();
    const ver = () => wr.locator('.bio15-veredicto').innerText();
    const dat = () => wr.locator('.bio15-dato').innerText();
    chk(cfg.nom + ': respuesta arranca con el mismo antígeno', await ver(), t => /secundaria/.test(t) && /10 veces/.test(t));
    chk(cfg.nom + ': día 40 → 0,18 y 10,11', await dat(), t => /0,18/.test(t) && /10,11/.test(t) && /2 días/.test(t));
    chk(cfg.nom + ': una curva', await wr.locator('svg polyline.cur1').count(), 1);
    await fijar(wr.locator('input[type=range]'), 60);
    chk(cfg.nom + ': día 60 → 0,05 antes del 2.º', await dat(), t => /0,05/.test(t));
    await wr.locator('.chip-btn', { hasText: "Otro antígeno" }).click();
    chk(cfg.nom + ': otro antígeno → respuesta primaria', await ver(), t => /Antígeno distinto/.test(t) && /primaria/.test(t));
    chk(cfg.nom + ': dos curvas', [await wr.locator('svg polyline.cur1').count(), await wr.locator('svg polyline.cur2').count()], r => r[0] === 1 && r[1] === 1);
    chk(cfg.nom + ': pico 1,00 y latencia 5 días', await dat(), t => /1,00 u/.test(t) && /5 días/.test(t));
    chk(cfg.nom + ': respuesta sin desborde', [await wr.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') await wr.screenshot({ path: captura.replace('.png', '-respuesta-movil.png') });

    // anticuerpo
    const wa = d.locator('[data-w=bio_anticuerpo]');
    await wa.scrollIntoViewIfNeeded();
    const va = () => wa.locator('.bio15-veredicto').innerText();
    chk(cfg.nom + ': anticuerpo arranca en región variable', await va(), t => /Región variable/.test(t));
    await wa.locator('svg polyline[data-p=ligera]').first().dispatchEvent('click');
    chk(cfg.nom + ': pulsar cadena ligera → 25 kDa', await va(), t => /ligera/.test(t) && /25 kDa/.test(t));
    await wa.locator('svg circle[data-p=sitio]').first().dispatchEvent('click');
    chk(cfg.nom + ': pulsar sitio → 2 sitios', await va(), t => /Sitio de unión/.test(t) && /2 sitios/.test(t));
    await wa.locator('.chip-btn', { hasText: 'Fragmento Fc' }).click();
    chk(cfg.nom + ': ficha Fc → constante', await va(), t => /Fc/.test(t) && /clase/.test(t));
    chk(cfg.nom + ': 8 botones y uno activo', [await wa.locator('.chip-btn').count(), await wa.locator('.chip-btn.on').count()], r => r[0] === 8 && r[1] === 1);
    chk(cfg.nom + ': anticuerpo sin desborde', [await wa.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') await wa.screenshot({ path: captura.replace('.png', '-anticuerpo-movil.png') });

    // transfusión
    const wt = d.locator('[data-w=bio_transfusion]');
    await wt.scrollIntoViewIfNeeded();
    const vt = () => wt.locator('.bio15-veredicto').innerText();
    chk(cfg.nom + ': O− → AB+ compatible, 27 de 64', [await vt(), await wt.locator('.bio15-dato').innerText()], r => /Compatible/.test(r[0]) && /27 de 64/.test(r[1]));
    await wt.locator('[data-dg] .chip-btn[data-k="A"]').click();
    await wt.locator('[data-rg] .chip-btn[data-k="O"]').click();
    await wt.locator('[data-rr] .chip-btn', { hasText: 'Rh +' }).click();
    await wt.locator('[data-dr] .chip-btn', { hasText: 'Rh −' }).click();
    chk(cfg.nom + ': A− → O+ incompatible por anti-A', await vt(), t => /Incompatible/.test(t) && /anti-A/.test(t));
    await wt.locator('[data-dr] .chip-btn', { hasText: 'Rh +' }).click();
    chk(cfg.nom + ': A+ → O+ ataca A', await wt.locator('.bio15-dato').innerText(), t => /Atacados por el receptor\s+A\s/i.test(t));
    await wt.locator('[data-dg] .chip-btn[data-k="O"]').click();
    chk(cfg.nom + ': O+ → O+ compatible', await vt(), t => /Compatible/.test(t));
    await wt.locator('[data-rr] .chip-btn', { hasText: 'Rh −' }).click();
    chk(cfg.nom + ': O+ → O− incompatible (anti-D)', await vt(), t => /Incompatible/.test(t) && /anti-D/.test(t) && /sensibilizarse/.test(t));
    chk(cfg.nom + ': transfusión sin desborde', [await wt.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') await wt.screenshot({ path: captura.replace('.png', '-transfusion-movil.png') });
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los widgets correctas`);
  process.exit(mal ? 1 : 0);
})();
