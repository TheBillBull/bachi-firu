// Prueba pulsando de verdad: ficha «de un vistazo» del tema 14 de Biología II (plegar, móvil oscuro) y los widgets bio_crecimiento y bio_ciclo_viral.
// Uso: node herramientas/pruebas/e2e_bio2_t14.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  const fijar = async (loc, v) => { await loc.evaluate((e, x) => { e.value = x; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v)); };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'bio2', 't14');
    const d = p.locator('#detail-t14');
    const vz = d.locator('details.vz');
    chk(cfg.nom + ': hay una ficha', await vz.count(), 1);
    chk(cfg.nom + ': ficha tras «En 1 minuto»', await d.locator('.cab + details.vz').count(), 1);
    chk(cfg.nom + ': abierta de entrada', await vz.evaluate(e => e.open), true);
    chk(cfg.nom + ': 6 bloques numerados', await vz.locator('.vz-bl').count(), 6);
    chk(cfg.nom + ': 10 palabras clave', await vz.locator('.vz-kw dt').count(), 10);
    chk(cfg.nom + ': 5 mini-tablas', await vz.locator('.vz-bl table').count(), 5);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se pliega', await vz.evaluate(e => e.open), false);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se despliega', await vz.locator('.vz-grid').isVisible(), true);
    chk(cfg.nom + ': ficha sin desborde', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
    if (captura && cfg.nom === 'escritorio') { await vz.scrollIntoViewIfNeeded(); await vz.screenshot({ path: captura }); }

    // crecimiento
    const wc = d.locator('[data-w=bio_crecimiento]');
    await wc.scrollIntoViewIfNeeded();
    const sc = wc.locator('input[type=range]');
    const dato = () => wc.locator('.bio14-dato').innerText();
    const ver = () => wc.locator('.bio14-veredicto').innerText();
    chk(cfg.nom + ': calc: 3 deslizadores', await sc.count(), 3);
    chk(cfg.nom + ': calc inicial g=20, 120 min → n=6, N=64', await dato(), t => /\n?6\b/.test(t) && /64/.test(t));
    await fijar(sc.nth(2), 180);
    chk(cfg.nom + ': 180 min → 9 generaciones y 512', await dato(), t => /512/.test(t));
    await fijar(sc.nth(0), 3);
    await fijar(sc.nth(1), 30);
    await fijar(sc.nth(2), 180);
    chk(cfg.nom + ': N0=1000, g=30, 180 min → 64 000', await dato(), t => /64\s?000/.test(t));
    await fijar(sc.nth(1), 5);
    await fijar(sc.nth(2), 240);
    chk(cfg.nom + ': 48 generaciones → aviso teórico', await ver(), t => /teórica/.test(t));
    chk(cfg.nom + ': calc dibuja curva y punto', [await wc.locator('svg path.p-curva').count(), await wc.locator('svg circle.p-punto').count()], r => r[0] >= 2 && r[1] >= 1);
    await wc.locator('.chip-btn', { hasText: 'Curva por fases' }).click();
    const sh = wc.locator('input[type=range]');
    chk(cfg.nom + ': fases: un deslizador', await sh.count(), 1);
    await fijar(sh, 1);
    chk(cfg.nom + ': 1 h → latencia', await dato(), t => /Latencia/.test(t));
    await fijar(sh, 5);
    chk(cfg.nom + ': 5 h → exponencial', await dato(), t => /Exponencial/.test(t));
    await fijar(sh, 8);
    chk(cfg.nom + ': 8 h → 4,1 · 10⁶', await dato(), t => /4,1 · 10⁶/.test(t));
    await fijar(sh, 12);
    chk(cfg.nom + ': 12 h → estacionaria', await dato(), t => /Estacionaria/.test(t));
    await fijar(sh, 20);
    chk(cfg.nom + ': 20 h → declive', await dato(), t => /Declive/.test(t));
    await wc.locator('.chip-btn', { hasText: 'lineal' }).click();
    chk(cfg.nom + ': escala lineal pinta', await wc.locator('.w-plot').getAttribute('data-esc'), 'lin');
    chk(cfg.nom + ': crecimiento sin desborde', [await wc.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') await wc.screenshot({ path: captura.replace('.png', '-crec-movil.png') });

    // ciclos virales
    const wv = d.locator('[data-w=bio_ciclo_viral]');
    await wv.scrollIntoViewIfNeeded();
    const paso = () => wv.locator('.bio14-dato').innerText();
    const sig = () => wv.locator('button', { hasText: 'Siguiente' }).click();
    chk(cfg.nom + ': lítico arranca en adsorción', await paso(), t => /Paso 1 de 5/i.test(t) && /Adsorción/i.test(t));
    await sig(); await sig();
    chk(cfg.nom + ': paso 3 síntesis', await paso(), t => /Paso 3 de 5/i.test(t) && /Síntesis/i.test(t));
    await sig(); await sig();
    chk(cfg.nom + ': paso 5 lisis (muere)', [await paso(), await wv.locator('.bio14-veredicto').innerText()], r => /Lisis/i.test(r[0]) && /muere/i.test(r[1]));
    await sig();
    chk(cfg.nom + ': no pasa del último paso', await paso(), t => /Paso 5 de 5/i.test(t));
    await wv.locator('button', { hasText: 'Anterior' }).click();
    chk(cfg.nom + ': anterior vuelve al 4', await paso(), t => /Paso 4 de 5/i.test(t));
    await wv.locator('.chip-btn', { hasText: 'lisogénico' }).click();
    chk(cfg.nom + ': lisogénico vuelve al paso 1', await paso(), t => /Paso 1 de 5/i.test(t));
    await sig();
    chk(cfg.nom + ': integración (profago)', [await paso(), await wv.locator('svg').innerHTML()], r => /Integración/i.test(r[0]) && /b14-vir/i.test(r[1]));
    await sig(); await sig();
    chk(cfg.nom + ': inducción', await paso(), t => /Inducción/i.test(t));
    await wv.locator('.chip-btn', { hasText: 'Retrovirus' }).click();
    chk(cfg.nom + ': retrovirus 6 pasos', await paso(), t => /Paso 1 de 6/i.test(t));
    await sig(); await sig();
    chk(cfg.nom + ': transcripción inversa', await paso(), t => /Transcripción inversa/i.test(t));
    await sig(); await sig(); await sig();
    chk(cfg.nom + ': gemación', await paso(), t => /Paso 6 de 6/i.test(t) && /gemación/i.test(t));
    chk(cfg.nom + ': virus sin desborde', [await wv.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') await wv.screenshot({ path: captura.replace('.png', '-virus-movil.png') });
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los widgets correctas`);
  process.exit(mal ? 1 : 0);
})();
