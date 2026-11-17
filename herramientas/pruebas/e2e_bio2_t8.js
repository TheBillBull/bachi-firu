// Prueba pulsando de verdad: ficha «de un vistazo» del tema 8 de Biología II (plegar, móvil oscuro) y los widgets bio_ruta, bio_atp y bio_cadena.
// Uso: node herramientas/pruebas/e2e_bio2_t8.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  const fijar = async (loc, v) => { await loc.evaluate((e, x) => { e.value = x; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v)); };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'bio2', 't8');
    const d = p.locator('#detail-t8');
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
    const sinDesborde = async w => [await w.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)];

    // ruta de cuatro etapas
    const wr = d.locator('[data-w=bio_ruta]');
    await wr.scrollIntoViewIfNeeded();
    const rd = () => wr.locator('.bio8-dato').innerText();
    const rv = () => wr.locator('.bio8-veredicto').innerText();
    chk(cfg.nom + ': ruta arranca en glucólisis (citoplasma, NADH 2)', await rd(), t => /Citoplasma/.test(t) && /NADH 2 · FADH₂ 0/.test(t) && /ATP 2 · CO₂ 0/.test(t));
    chk(cfg.nom + ': ruta: zona citoplasma activa', await wr.locator('.bio8-zonas div').evaluateAll(a => a.map(x => x.className)), r => r[0] === 'on' && r[1] === '' && r[2] === '');
    await wr.locator('.chip-btn', { hasText: 'Descarboxilación' }).click();
    chk(cfg.nom + ': descarboxilación: 2 CO₂ y matriz', await rd(), t => /Matriz/.test(t) && /CO₂ 2/.test(t) && /NADH 4/.test(t));
    await wr.locator('.chip-btn', { hasText: 'Krebs' }).click();
    chk(cfg.nom + ': Krebs: NADH 10, FADH₂ 2, ATP 4, CO₂ 6', await rd(), t => /NADH 10 · FADH₂ 2/.test(t) && /ATP 4 · CO₂ 6/.test(t));
    await wr.locator('.chip-btn', { hasText: 'Cadena' }).click();
    chk(cfg.nom + ': cadena: membrana interna y 28/34 ATP', [await rd(), await rv()], r => /Membrana mitocondrial interna/.test(r[0]) && /28/.test(r[1]) && /34/.test(r[1]));
    chk(cfg.nom + ': ruta: zona membrana activa', await wr.locator('.bio8-zonas div').evaluateAll(a => a.map(x => x.className)), r => r[2] === 'on' && r[0] === '');
    chk(cfg.nom + ': ruta sin desborde', await sinDesborde(wr), r => r[0] && r[1]);

    // balance de ATP
    const wa = d.locator('[data-w=bio_atp]');
    await wa.scrollIntoViewIfNeeded();
    const tot = () => wa.locator('tr.tot').innerText();
    const dat = () => wa.locator('.bio8-dato').innerText();
    const chip = t => wa.locator('.chip-btn', { hasText: t }).click();
    chk(cfg.nom + ': ATP: glucosa 30/32 malato = 32', await tot(), t => /32 ATP/.test(t));
    chk(cfg.nom + ': ATP: 6 CO₂, 6 O₂ y 34 %', await dat(), t => /CO₂ liberado\s*6/i.test(t) && /O₂ consumido\s*6/i.test(t) && /34(,0)? %/.test(t));
    chk(cfg.nom + ': ATP: tabla con 3 etapas', await wa.locator('.bio8-tab tr').count(), 5);
    await chip('Criterio 36/38');
    chk(cfg.nom + ': ATP: 36/38 malato = 38', await tot(), t => /38 ATP/.test(t));
    await chip('Lanzadera glicerol');
    chk(cfg.nom + ': ATP: 36/38 glicerol = 36', await tot(), t => /36 ATP/.test(t));
    await chip('Criterio 30/32');
    chk(cfg.nom + ': ATP: 30/32 glicerol = 30', await tot(), t => /30 ATP/.test(t));
    await chip('Fermentación láctica');
    chk(cfg.nom + ': ATP: láctica = 2 ATP, 0 CO₂', [await tot(), await dat()], r => /2 ATP/.test(r[0]) && /CO₂ liberado\s*0/i.test(r[1]));
    chk(cfg.nom + ': ATP: fermentación oculta lanzadera y criterio', await wa.locator('.chip-btn', { hasText: 'Criterio 36/38' }).isVisible(), false);
    await chip('Fermentación alcohólica');
    chk(cfg.nom + ': ATP: alcohólica = 2 ATP, 2 CO₂', [await tot(), await dat()], r => /2 ATP/.test(r[0]) && /CO₂ liberado\s*2/i.test(r[1]));
    await chip('Ácido graso');
    chk(cfg.nom + ': ATP: ácido graso 16 C = 106', [await tot(), await dat()], r => /106 ATP/.test(r[0]) && /CO₂ liberado\s*16/i.test(r[1]) && /O₂ consumido\s*23/i.test(r[1]));
    await fijar(wa.locator('input[type=range]'), 18);
    chk(cfg.nom + ': ATP: 18 C = 120', await tot(), t => /120 ATP/.test(t));
    await fijar(wa.locator('input[type=range]'), 16);
    await chip('Criterio 36/38');
    chk(cfg.nom + ': ATP: palmitato clásico = 129', await tot(), t => /129 ATP/.test(t));
    chk(cfg.nom + ': ATP sin desborde', await sinDesborde(wa), r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') await wa.screenshot({ path: captura.replace('.png', '-atp-movil.png') });

    // cadena e inhibidores
    const wc = d.locator('[data-w=bio_cadena]');
    await wc.scrollIntoViewIfNeeded();
    const med = () => wc.locator('[data-m]').innerText();
    const cv = () => wc.locator('.bio8-veredicto').innerText();
    const cchip = t => wc.locator('.chip-btn', { hasText: t }).click();
    chk(cfg.nom + ': cadena normal 60/60/60', await med(), t => /Consumo de O₂: 60/.test(t) && /Gradiente de H⁺: 60/.test(t) && /ATP: 60/.test(t));
    await cchip('Rotenona');
    chk(cfg.nom + ': rotenona + NADH: se para', await med(), t => /ATP: 3/.test(t));
    await cchip('Succinato');
    chk(cfg.nom + ': rotenona + succinato: sigue (60)', [await med(), await cv()], r => /ATP: 60/.test(r[0]) && /complejo II/.test(r[1]));
    await cchip('Cianuro');
    chk(cfg.nom + ': cianuro + succinato: se para', await med(), t => /Consumo de O₂: 3/.test(t) && /ATP: 3/.test(t));
    await cchip('Oligomicina');
    chk(cfg.nom + ': oligomicina: gradiente 100, ATP 0, O₂ 15', await med(), t => /Gradiente de H⁺: 100/.test(t) && /ATP: 0/.test(t) && /Consumo de O₂: 15/.test(t));
    await cchip('DNP');
    chk(cfg.nom + ': desacoplante: O₂ 100, gradiente 5, ATP 3', [await med(), await cv()], r => /Consumo de O₂: 100/.test(r[0]) && /Gradiente de H⁺: 5/.test(r[0]) && /calor/.test(r[1]));
    await cchip('Antimicina');
    chk(cfg.nom + ': antimicina: todo bajo', await med(), t => /ATP: 3/.test(t));
    chk(cfg.nom + ': cadena sin desborde', await sinDesborde(wc), r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') await wc.screenshot({ path: captura.replace('.png', '-cadena-movil.png') });
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los widgets correctas`);
  process.exit(mal ? 1 : 0);
})();
