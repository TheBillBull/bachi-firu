// Prueba pulsando de verdad: ficha «de un vistazo» del tema 11 de Biología II (plegar, móvil oscuro) y los widgets
// bio_meselson, bio_horquilla y bio_telomeros.
// Uso: node herramientas/pruebas/e2e_bio2_t11.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  const fijar = async (loc, v) => { await loc.evaluate((e, x) => { e.value = x; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v)); };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'bio2', 't11');
    const d = p.locator('#detail-t11');
    const sinDesborde = async (w) => [await w.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)].every(Boolean);
    // ficha
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

    // Meselson y Stahl
    const wm = d.locator('[data-w=bio_meselson]');
    await wm.scrollIntoViewIfNeeded();
    const slm = wm.locator('input[type=range]');
    const dm = () => wm.locator('.bio11-dato').innerText();
    const vm = () => wm.locator('.bio11-veredicto').innerText();
    const tubos = () => wm.locator('svg rect.b11-tubo').count();
    chk(cfg.nom + ': Meselson inicial (semicons., gen. 1): 1 banda intermedia', [await dm(), await vm(), await tubos()], r => /Bandas en el tubo\s*1/i.test(r[0]) && /100 % intermedio/i.test(r[0]) && /lo explica/.test(r[1]) && r[2] === 2);
    await fijar(slm, 2);
    chk(cfg.nom + ': semicons. gen. 2: 50 % + 50 %', [await dm(), await vm()], r => /Bandas en el tubo\s*2/i.test(r[0]) && /50 % intermedio/.test(r[0]) && /50 % ligero/.test(r[0]) && /lo explica/.test(r[1]));
    await fijar(slm, 3);
    chk(cfg.nom + ': semicons. gen. 3: 25 % + 75 %', await dm(), t => /25 % intermedio/.test(t) && /75 % ligero/.test(t));
    await fijar(slm, 4);
    chk(cfg.nom + ': semicons. gen. 4: 12,5 % + 87,5 %', await dm(), t => /12,5 % intermedio/.test(t) && /87,5 % ligero/.test(t));
    chk(cfg.nom + ': 5 tubos dibujados en gen. 4', await tubos(), 5);
    await wm.locator('[data-k=con]').click();
    await fijar(slm, 1);
    chk(cfg.nom + ': conservativo gen. 1: NO lo explica, 2 bandas', [await dm(), await vm()], r => /Bandas en el tubo\s*2/i.test(r[0]) && /50 % pesado/.test(r[0]) && /NO lo explica/.test(r[1]));
    await wm.locator('[data-k=dis]').click();
    chk(cfg.nom + ': dispersivo gen. 1: coincide con lo observado pero no basta', await vm(), t => /lo explica/.test(t) && /generación 2/.test(t));
    await fijar(slm, 2);
    chk(cfg.nom + ': dispersivo gen. 2: NO lo explica (una sola banda)', [await dm(), await vm()], r => /Bandas en el tubo\s*1/i.test(r[0]) && /NO lo explica/.test(r[1]));
    await fijar(slm, 0);
    chk(cfg.nom + ': gen. 0: todo pesado', await dm(), t => /100 % pesado/.test(t));
    if (captura && cfg.nom !== 'escritorio') await wm.screenshot({ path: captura.replace('.png', '-meselson-movil.png') });
    chk(cfg.nom + ': Meselson sin desborde', await sinDesborde(wm), true);

    // Horquilla
    const wh = d.locator('[data-w=bio_horquilla]');
    await wh.scrollIntoViewIfNeeded();
    const slh = wh.locator('input[type=range]');
    const dh = () => wh.locator('.bio11-dato').innerText();
    const vh = () => wh.locator('.bio11-veredicto').innerText();
    chk(cfg.nom + ': horquilla eucariota 1000 nt → 5 fragmentos, 6 cebadores', await dh(), t => /5 fragmentos de Okazaki/.test(t) && /Cebadores de ARN\s*6/i.test(t) && /polimerasas δ y ε/.test(t));
    await fijar(slh, 1050);
    chk(cfg.nom + ': 1050 nt → 6 fragmentos (5 completos y 1 en construcción), 7 cebadores', await dh(), t => /6 fragmentos de Okazaki \(5 completos y 1 en construcción\)/.test(t) && /Cebadores de ARN\s*7/i.test(t));
    chk(cfg.nom + ': dibuja fragmentos de la retrasada', await wh.locator('svg rect.b11-ok, svg rect.b11-now').count(), 6);
    await fijar(slh, 0);
    chk(cfg.nom + ': 0 nt → sin fragmentos', [await dh(), await vh()], r => /0 fragmentos/.test(r[0]) && /aún no ha empezado/.test(r[1]));
    await wh.locator('.chip-btn', { hasText: 'Procariota' }).click();
    chk(cfg.nom + ': procariota: máx. 6000 y 4500 nt → 3 fragmentos, 4 cebadores', [await slh.evaluate(e => e.max), await dh()], r => r[0] === '6000' && /3 fragmentos de Okazaki/.test(r[1]) && /Cebadores de ARN\s*4/i.test(r[1]) && /polimerasa III/.test(r[1]));
    await fijar(slh, 6000);
    chk(cfg.nom + ': procariota 6000 nt → 4 fragmentos, 5 cebadores', await dh(), t => /4 fragmentos de Okazaki/.test(t) && /Cebadores de ARN\s*5/i.test(t));
    await wh.locator('.chip-btn', { hasText: 'Eucariota' }).click();
    chk(cfg.nom + ': vuelve a eucariota (máx. 2000, 1000 nt)', [await slh.evaluate(e => e.max), await dh()], r => r[0] === '2000' && /5 fragmentos/.test(r[1]));
    if (captura && cfg.nom !== 'escritorio') await wh.screenshot({ path: captura.replace('.png', '-horquilla-movil.png') });
    chk(cfg.nom + ': horquilla sin desborde', await sinDesborde(wh), true);

    // Telómeros
    const wt = d.locator('[data-w=bio_telomeros]');
    await wt.scrollIntoViewIfNeeded();
    const slt = wt.locator('input[type=range]');
    const dt = () => wt.locator('.bio11-dato').innerText();
    const vt = () => wt.locator('.bio11-veredicto').innerText();
    chk(cfg.nom + ': somática 20 divisiones → 8000 nt, quedan 40', [await dt(), await vt()], r => /8[\s ]?000 nt tras 20 divisiones/.test(r[0]) && /quedan 40 divisiones/.test(r[1]));
    await fijar(slt, 60);
    chk(cfg.nom + ': somática 60 divisiones → 4000 nt, senescencia', [await dt(), await vt()], r => /4[\s ]?000 nt tras 60/.test(r[0]) && /Senescencia/.test(r[1]));
    await wt.locator('.chip-btn', { hasText: 'Madre' }).click();
    chk(cfg.nom + ': madre 60 divisiones → 8800 nt, sigue dividiéndose', [await dt(), await vt()], r => /8[\s ]?800 nt tras 60/.test(r[0]) && /telomerasa compensa/.test(r[1]));
    await wt.locator('.chip-btn', { hasText: 'Cancerosa' }).click();
    await fijar(slt, 80);
    chk(cfg.nom + ': cancerosa 80 divisiones → 10000 nt, sin límite', [await dt(), await vt()], r => /10[\s ]?000 nt tras 80/.test(r[0]) && /sin límite/.test(r[1]));
    if (captura && cfg.nom !== 'escritorio') await wt.screenshot({ path: captura.replace('.png', '-telomeros-movil.png') });
    chk(cfg.nom + ': telómeros sin desborde', await sinDesborde(wt), true);
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los widgets correctas`);
  process.exit(mal ? 1 : 0);
})();
