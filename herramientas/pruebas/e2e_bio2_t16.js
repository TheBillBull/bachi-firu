// Prueba pulsando de verdad: ficha «de un vistazo» del tema 16 de Biología II (plegar, móvil oscuro) y los widgets bio_hw y bio_deriva.
// Uso: node herramientas/pruebas/e2e_bio2_t16.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  const fijar = async (loc, v) => { await loc.evaluate((e, x) => { e.value = x; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v)); };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'bio2', 't16');
    const d = p.locator('#detail-t16');
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
    chk(cfg.nom + ': ficha sin desborde', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
    if (captura && cfg.nom === 'escritorio') { await vz.scrollIntoViewIfNeeded(); await vz.screenshot({ path: captura }); }

    // Hardy-Weinberg
    const wh = d.locator('[data-w=bio_hw]');
    await wh.scrollIntoViewIfNeeded();
    const slh = wh.locator('input[type=range]');
    const dat = () => wh.locator('.bio16-dato').innerText();
    const filas = () => wh.locator('.bio16-barras').innerText();
    const ver = () => wh.locator('.bio16-veredicto').innerText();
    chk(cfg.nom + ': HW: tres barras', await wh.locator('.bio16-fila').count(), 3);
    chk(cfg.nom + ': HW q = 0,5 → 25 % / 50 % / 25 %', await filas(), t => /50 %/.test(t) && (t.match(/25 %/g) || []).length === 2);
    chk(cfg.nom + ': HW q = 0,5 → máximo de heterocigotos', await ver(), t => /máximo de heterocigotos/.test(t));
    await wh.locator('.chip-btn', { hasText: 'Fibrosis' }).click();
    chk(cfg.nom + ': HW fibrosis quística → q 0,02 y portadores 3,92 %', await dat(), t => /0,02\s/.test(t) && /3,92 %/.test(t) && /1 de cada 2500/.test(t));
    chk(cfg.nom + ': HW fibrosis → barra de aa 0,04 %', await filas(), t => /0,04 %/.test(t) && /96,04 %/.test(t));
    chk(cfg.nom + ': HW fibrosis → el deslizador sigue al botón', await slh.evaluate(e => +e.value), v => Math.abs(v - 0.02) < 1e-9);
    await fijar(slh, 0.3);
    chk(cfg.nom + ': HW q = 0,3 → 2pq = 42 % y 9 %', [await dat(), await filas()], r => /42 %/.test(r[0]) && /9 %/.test(r[1]) && /1 de cada 11/.test(r[0]));
    await fijar(slh, 0.1);
    chk(cfg.nom + ': HW q = 0,1 → 18 % (1 de cada 100)', await dat(), t => /18 %/.test(t) && /1 de cada 100/.test(t));
    await fijar(slh, 0);
    chk(cfg.nom + ': HW q = 0 → todo AA', [await filas(), await ver()], r => /100 %/.test(r[0]) && /desaparecido/.test(r[1]));
    chk(cfg.nom + ': HW sin desborde', [await wh.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') await wh.screenshot({ path: captura.replace('.png', '-hw-movil.png') });

    // deriva y selección
    const wd = d.locator('[data-w=bio_deriva]');
    await wd.scrollIntoViewIfNeeded();
    const sls = wd.locator('input[type=range]');
    const dd = () => wd.locator('.bio16-dato').innerText();
    const vd = () => wd.locator('.bio16-veredicto').innerText();
    chk(cfg.nom + ': deriva: dos deslizadores', await sls.count(), 2);
    chk(cfg.nom + ': deriva: 5 líneas de población y 1 discontinua', [await wd.locator('polyline.pob').count(), await wd.locator('polyline.esp').count()], r => r[0] === 5 && r[1] === 1);
    chk(cfg.nom + ': deriva N = 20, s = 0 → sin azar q = 0,5', [await dd(), await vd()], r => /generación 40\s*0,5\s/.test(r[0]) && /solo por azar/.test(r[1]));
    const antes = await wd.locator('polyline.pob').first().getAttribute('points');
    await wd.locator('.chip-btn', { hasText: 'Otra simulación' }).click();
    const despues = await wd.locator('polyline.pob').first().getAttribute('points');
    chk(cfg.nom + ': «Otra simulación» cambia las líneas', antes !== despues, true);
    await fijar(sls.nth(0), 5);
    chk(cfg.nom + ': deriva N = 5 → alguna población pierde o fija el alelo', await dd(), t => { const m = t.match(/fijado \(q = 1\)\s*(\d+) de 5/), l = t.match(/perdido \(q = 0\)\s*(\d+) de 5/); return m && l && (+m[1] + +l[1]) >= 3; });
    await fijar(sls.nth(0), 1000);
    chk(cfg.nom + ': deriva N = 1000, s = 0 → q medio cerca de 0,5 y sin fijaciones', [await dd(), await vd()], r => { const m = r[0].match(/medio de las 5 poblaciones\s*(0,\d+)/); return m && Math.abs(parseFloat(m[1].replace(',', '.')) - 0.5) < 0.1 && /fijado \(q = 1\)\s*0 de 5/.test(r[0]) && /apenas|casi no se nota/.test(r[1]); });
    await fijar(sls.nth(1), 0.5);
    chk(cfg.nom + ': deriva N = 1000, s = 0,5 → curva sin azar q40 = 0,049', [await dd(), await vd()], r => /0,049/.test(r[0]) && /curva discontinua/.test(r[1]));
    await fijar(sls.nth(1), 1);
    chk(cfg.nom + ': deriva s = 1 → q40 = 0,024', await dd(), t => /0,024/.test(t));
    await fijar(sls.nth(0), 20);
    chk(cfg.nom + ': deriva N = 20 y s = 1 → mensaje de selección y deriva', await vd(), t => /deriva a la vez/.test(t));
    chk(cfg.nom + ': deriva sin desborde', [await wd.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') await wd.screenshot({ path: captura.replace('.png', '-deriva-movil.png') });
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los widgets correctas`);
  process.exit(mal ? 1 : 0);
})();
