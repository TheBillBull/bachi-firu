// Prueba pulsando de verdad: ficha «de un vistazo» del tema 7 de Biología II (plegar, móvil oscuro), los dos esquemas SVG y el widget bio_ciclo.
// Uso: node herramientas/pruebas/e2e_bio2_t7.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'bio2', 't7');
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
    chk(cfg.nom + ': ficha sin desborde', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
    if (captura && cfg.nom === 'escritorio') { await vz.scrollIntoViewIfNeeded(); await vz.screenshot({ path: captura }); }

    // esquemas SVG estáticos
    chk(cfg.nom + ': esquema del cromosoma: 8 textos y 4 figuras', [await d.locator('svg[aria-label^="Esquema de un cromosoma"] text').count(), await d.locator('svg[aria-label^="Esquema de un cromosoma"] path, svg[aria-label^="Esquema de un cromosoma"] ellipse').count()], r => r[0] === 8 && r[1] === 4);
    chk(cfg.nom + ': gráfica de ADN: 2 curvas', await d.locator('svg[aria-label^="Cantidad de ADN"] polyline').count(), 2);
    chk(cfg.nom + ': esquemas sin desborde', await p.evaluate(() => [...document.querySelectorAll('.bio7-svg')].every(s => s.getBoundingClientRect().width <= window.innerWidth + 1)), true);

    // widget bio_ciclo (hay varias copias: se prueba la primera)
    chk(cfg.nom + ': 3 copias del widget en la teoría', await d.locator('[data-w=bio_ciclo]').count(), 3);
    const wa = d.locator('[data-w=bio_ciclo]').first();
    await wa.scrollIntoViewIfNeeded();
    const dat = () => wa.locator('.bio7-dato').innerText();
    const ver = () => wa.locator('.bio7-veredicto').innerText();
    const gl = () => wa.locator('.bio7-gl').count();
    const fase = t => wa.locator('.chip-btn', { hasText: t }).first().click();
    chk(cfg.nom + ': arranca mitosis 2n = 8 en G1: 8 cromosomas, 8 cromátidas, 2c, 1 célula', [await gl(), await dat()], r => r[0] === 8 && /Cromosomas por célula\s*8/i.test(r[1]) && /Cromátidas por célula\s*8/i.test(r[1]) && /ADN por célula\s*2c/i.test(r[1]) && /Células en este momento\s*1/i.test(r[1]));
    await fase('Metafase');
    chk(cfg.nom + ': metafase: 8 cromosomas, 16 cromátidas, 4c', [await gl(), await dat()], r => r[0] === 8 && /Cromátidas por célula\s*16/i.test(r[1]) && /ADN por célula\s*4c/i.test(r[1]));
    await fase('Anafase');
    chk(cfg.nom + ': anafase: 16 cromosomas, 4c', [await gl(), await dat(), await ver()], r => r[0] === 16 && /Cromosomas por célula\s*16/i.test(r[1]) && /ADN por célula\s*4c/i.test(r[1]) && /cromátida hermana/.test(r[2]));
    await fase('Telofase y citocinesis');
    chk(cfg.nom + ': telofase: 2 células, 8 cromosomas, 2c', await dat(), t => /Células en este momento\s*2/i.test(t) && /Cromosomas por célula\s*8/i.test(t) && /ADN por célula\s*2c/i.test(t));
    await wa.locator('[data-fase] .chip-btn', { hasText: /^S$/ }).click();
    chk(cfg.nom + ': fase S: entre 8 y 16 cromátidas, entre 2c y 4c', await dat(), t => /entre 8 y 16/.test(t) && /entre 2c y 4c/.test(t));
    await wa.locator('.chip-btn', { hasText: '2n = 46' }).click();
    await fase('Anafase');
    chk(cfg.nom + ': humano en anafase: 92 cromosomas', [await gl(), await dat()], r => r[0] === 92 && /Cromosomas por célula\s*92/i.test(r[1]));
    await wa.locator('.chip-btn', { hasText: 'Meiosis' }).click();
    chk(cfg.nom + ': al cambiar a meiosis hay 10 fases', await wa.locator('[data-fase] .chip-btn').count(), 10);
    await fase('Profase I');
    chk(cfg.nom + ': profase I humana: 23 bivalentes y 92 cromátidas', [await wa.locator('.bio7-biv').count(), await dat()], r => r[0] === 23 && /Cromátidas por célula\s*92/i.test(r[1]) && /4c/.test(r[1]));
    await fase('Telofase I');
    chk(cfg.nom + ': telofase I: 2 células, 23 cromosomas, 46 cromátidas, 2c, haploide', await dat(), t => /Células en este momento\s*2/i.test(t) && /Cromosomas por célula\s*23/i.test(t) && /Cromátidas por célula\s*46/i.test(t) && /ADN por célula\s*2c/i.test(t) && /haploide/.test(t));
    await fase('Anafase II');
    chk(cfg.nom + ': anafase II: 46 cromosomas por célula', await dat(), t => /Cromosomas por célula\s*46/i.test(t) && /Células en este momento\s*2/i.test(t));
    await fase('Telofase II');
    chk(cfg.nom + ': telofase II: 4 células, 23 cromosomas, 23 cromátidas, 1c', [await dat(), await gl()], r => /Células en este momento\s*4/i.test(r[0]) && /Cromátidas por célula\s*23/i.test(r[0]) && /ADN por célula\s*1c/i.test(r[0]) && r[1] === 23);
    await wa.locator('.chip-btn', { hasText: 'Mitosis' }).click();
    chk(cfg.nom + ': vuelta a mitosis: 7 fases y vuelve a G1', [await wa.locator('[data-fase] .chip-btn').count(), await dat()], r => r[0] === 7 && /ADN por célula\s*2c/i.test(r[1]));
    chk(cfg.nom + ': widget sin desborde', [await wa.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') await wa.screenshot({ path: captura.replace('.png', '-ciclo-movil.png') });
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha, los esquemas y el widget correctas`);
  process.exit(mal ? 1 : 0);
})();
