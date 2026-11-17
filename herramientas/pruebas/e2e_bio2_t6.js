// Prueba pulsando de verdad: ficha «de un vistazo» del tema 6 de Biología II (plegar, móvil oscuro) y los widgets bio_celula, bio_transporte y bio_secrecion.
// Uso: node herramientas/pruebas/e2e_bio2_t6.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  const fijar = async (loc, v) => { await loc.evaluate((e, x) => { e.value = x; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v)); };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'bio2', 't6');
    const d = p.locator('#detail-t6');
    const sinDesborde = async w => [await w.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)].every(Boolean);

    // ---- ficha de un vistazo
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

    // ---- bio_celula
    const wc = d.locator('[data-w=bio_celula]');
    await wc.scrollIntoViewIfNeeded();
    const verC = () => wc.locator('.bio6-veredicto').innerText();
    const presC = () => wc.locator('.bio6-pres').innerText();
    chk(cfg.nom + ': célula arranca animal con la membrana', await verC(), t => /Membrana plasmática/.test(t) && /bicapa/.test(t));
    chk(cfg.nom + ': animal → 11 orgánulos en la lista', await wc.locator('[data-lista] .chip-btn').count(), 11);
    await wc.locator('[data-lista] .chip-btn', { hasText: 'Núcleo' }).click();
    chk(cfg.nom + ': núcleo: envoltura con poros; animal sí, procariota no', [await verC(), await presC()], r => /poros/.test(r[0]) && /Animal ✓/.test(r[1]) && /Procariota ✗/.test(r[1]));
    await wc.locator('svg g[data-k=golgi]').click();
    chk(cfg.nom + ': pulsar el Golgi en el dibujo', await verC(), t => /Aparato de Golgi/.test(t) && /cis/.test(t));
    chk(cfg.nom + ': el Golgi queda marcado en el dibujo', await wc.locator('svg g.on[data-k=golgi]').count(), 1);
    await wc.locator('svg g[data-k=mito] ellipse').first().click();
    chk(cfg.nom + ': pulsar la mitocondria', await verC(), t => /Mitocondria/.test(t) && /crestas/.test(t));
    await wc.locator('[data-tipo] .chip-btn', { hasText: 'Vegetal' }).click();
    chk(cfg.nom + ': vegetal → 12 orgánulos y hay cloroplasto en el dibujo', [await wc.locator('[data-lista] .chip-btn').count(), await wc.locator('svg g[data-k=cloro]').count()], r => r[0] === 12 && r[1] === 1);
    chk(cfg.nom + ': vegetal sin centriolos ni lisosomas', [await wc.locator('svg g[data-k=cent]').count(), await wc.locator('svg g[data-k=liso]').count()], r => r[0] === 0 && r[1] === 0);
    await wc.locator('svg g[data-k=cloro] ellipse').first().click();
    chk(cfg.nom + ': cloroplasto: tilacoides; vegetal sí, animal no', [await verC(), await presC()], r => /tilacoides/.test(r[0]) && /Vegetal ✓/.test(r[1]) && /Animal ✗/.test(r[1]));
    await wc.locator('[data-lista] .chip-btn', { hasText: 'Vacuola' }).click();
    chk(cfg.nom + ': vacuola central → tonoplasto', await verC(), t => /Vacuola central/.test(t) && /tonoplasto/.test(t));
    await wc.locator('[data-tipo] .chip-btn', { hasText: 'Procariota' }).click();
    chk(cfg.nom + ': procariota → 6 elementos, sin núcleo', [await wc.locator('[data-lista] .chip-btn').count(), await wc.locator('svg g[data-k=nuc]').count()], r => r[0] === 6 && r[1] === 0);
    chk(cfg.nom + ': al cambiar de tipo, se elige un elemento que existe', await verC(), t => /Pared celular|Membrana|Ribosomas/.test(t));
    await wc.locator('svg g[data-k=nucleoide]').click();
    chk(cfg.nom + ': nucleoide: ADN circular; solo procariota', [await verC(), await presC()], r => /circular/.test(r[0]) && /Procariota ✓/.test(r[1]) && /Animal ✗/.test(r[1]));
    await wc.locator('[data-lista] .chip-btn', { hasText: 'Ribosomas' }).click();
    chk(cfg.nom + ': ribosomas 70S en procariota (presentes en los tres)', [await verC(), await presC()], r => /70S/.test(r[0]) && /Animal ✓/.test(r[1]) && /Procariota ✓/.test(r[1]));
    chk(cfg.nom + ': célula sin desborde', await sinDesborde(wc), true);
    if (captura && cfg.nom !== 'escritorio') await wc.screenshot({ path: captura.replace('.png', '-celula-movil.png') });

    // ---- bio_transporte
    const wt = d.locator('[data-w=bio_transporte]');
    await wt.scrollIntoViewIfNeeded();
    const sl = wt.locator('input[type=range]');
    const verT = () => wt.locator('.bio6-veredicto').innerText();
    const datT = () => wt.locator('.bio6-dato').innerText();
    const lecT = () => wt.locator('.bio6-lect').innerText();
    chk(cfg.nom + ': transporte arranca en difusión simple', [await verT(), await datT()], r => /Difusión simple/.test(r[0]) && /A favor/.test(r[1]));
    chk(cfg.nom + ': simple a 2 mM → v = 6', await lecT(), t => /2 mM/.test(t) && /v = 6 u/.test(t));
    await fijar(sl, 20);
    chk(cfg.nom + ': simple a 20 mM → v = 60,0 (no se satura)', await lecT(), t => /v = 60 u/.test(t));
    await wt.locator('[data-tipo] .chip-btn', { hasText: 'facilitada' }).click();
    chk(cfg.nom + ': facilitada a 20 mM → 90,9 (91 % de Vmax)', await lecT(), t => /v = 90,9/.test(t) && /90,9 % de V/.test(t));
    await fijar(sl, 2);
    chk(cfg.nom + ': facilitada a 2 mM → 50,0 (mitad de Vmax)', await lecT(), t => /v = 50 u/.test(t) && /50 % de V/.test(t));
    chk(cfg.nom + ': facilitada → proteína, sin ATP, canal en el dibujo', [await datT(), await wt.locator('svg').first().textContent()], r => /Canal o permeasa/.test(r[0]) && /canal/.test(r[1]));
    await wt.locator('[data-tipo] .chip-btn', { hasText: 'activo' }).click();
    chk(cfg.nom + ': activo → en contra, ATP, bomba', [await datT(), await verT()], r => /En contra/.test(r[0]) && /Sí/.test(r[0]) && /Bomba/.test(r[0]) && /cianuro/.test(r[1]));
    chk(cfg.nom + ': activo con ATP a 2 mM → 50,0', await lecT(), t => /v = 50 u/.test(t));
    await wt.locator('[data-atp] .chip-btn', { hasText: 'Sin ATP' }).click();
    chk(cfg.nom + ': activo sin ATP → v = 0,0 y aviso en rojo', [await lecT(), await wt.locator('.bio6-veredicto.mal').count()], r => /v = 0 u/.test(r[0]) && r[1] === 1);
    chk(cfg.nom + ': el dibujo dice «sin ATP: parada»', await wt.locator('svg').first().textContent(), t => /sin ATP: parada/.test(t));
    await wt.locator('[data-tipo] .chip-btn', { hasText: 'facilitada' }).click();
    chk(cfg.nom + ': la facilitada no depende del ATP (sigue en 50,0)', await lecT(), t => /v = 50 u/.test(t));
    await wt.locator('[data-tipo] .chip-btn', { hasText: 'En masa' }).click();
    chk(cfg.nom + ': en masa → vesículas; la curva se oculta', [await verT(), await wt.locator('.w-plot').isVisible()], r => /endocitosis/.test(r[0]) && /exocitosis/.test(r[0]) && r[1] === false);
    chk(cfg.nom + ': en masa → dibujo con endocitosis y exocitosis', await wt.locator('svg').first().textContent(), t => /endocitosis/.test(t) && /exocitosis/.test(t));
    chk(cfg.nom + ': transporte sin desborde', await sinDesborde(wt), true);
    if (captura && cfg.nom !== 'escritorio') { await wt.locator('[data-tipo] .chip-btn', { hasText: 'activo' }).click(); await wt.screenshot({ path: captura.replace('.png', '-transporte-movil.png') }); }

    // ---- bio_secrecion
    const ws = d.locator('[data-w=bio_secrecion]');
    await ws.scrollIntoViewIfNeeded();
    const verS = () => ws.locator('.bio6-veredicto').innerText();
    const dot = () => ws.locator('.b6-dot').evaluate(e => [e.getAttribute('cx'), e.getAttribute('cy')].join(','));
    chk(cfg.nom + ': secreción arranca en el núcleo', [await verS(), await dot()], r => /1\. Núcleo/.test(r[0]) && /ARNm/.test(r[0]) && r[1] === '50,60');
    chk(cfg.nom + ': 7 pasos numerados', await ws.locator('[data-pasos] .chip-btn').count(), 7);
    await ws.locator('.bio6-botones .chip-btn', { hasText: 'Anterior' }).click();
    chk(cfg.nom + ': «Anterior» en el paso 1 no hace nada', await verS(), t => /1\. Núcleo/.test(t));
    await ws.locator('.bio6-botones .chip-btn', { hasText: 'Siguiente' }).click();
    chk(cfg.nom + ': siguiente → péptido señal y RER resaltado', [await verS(), await ws.locator('g.b6-el.on[data-el=rer]').count()], r => /péptido señal/.test(r[0]) && r[1] === 1);
    await ws.locator('[data-pasos] [data-k="4"]').click();
    chk(cfg.nom + ': paso 5 → Golgi (cis)', [await verS(), await ws.locator('g.b6-el.on[data-el=gol]').count()], r => /Aparato de Golgi/.test(r[0]) && /cis/.test(r[0]) && r[1] === 1);
    await ws.locator('[data-pasos] [data-k="6"]').click();
    chk(cfg.nom + ': paso 7 secreción → exocitosis y punto fuera', [await verS(), await dot()], r => /Exocitosis/.test(r[0]) && /fuera de la célula/.test(r[0]) && r[1] === '305,95');
    await ws.locator('[data-dest] .chip-btn', { hasText: 'lisosoma' }).click();
    chk(cfg.nom + ': destino lisosoma → hidrolasas a pH ≈ 5', [await verS(), await dot()], r => /lisosoma/.test(r[0]) && /pH ≈ 5/.test(r[0]) && r[1] === '205,158');
    await ws.locator('[data-dest] .chip-btn', { hasText: 'membrana' }).click();
    chk(cfg.nom + ': destino membrana → queda en ella', [await verS(), await dot()], r => /la proteína queda en ella/.test(r[0]) && r[1] === '285,95');
    await ws.locator('[data-pasos] [data-k="5"]').click();
    chk(cfg.nom + ': paso 6 de membrana → anclada en la vesícula', await verS(), t => /anclada/.test(t));
    await ws.locator('.bio6-botones .chip-btn', { hasText: 'Reiniciar' }).click();
    chk(cfg.nom + ': reiniciar vuelve al paso 1', [await verS(), await dot()], r => /1\. Núcleo/.test(r[0]) && r[1] === '50,60');
    chk(cfg.nom + ': secreción sin desborde', await sinDesborde(ws), true);
    if (captura && cfg.nom !== 'escritorio') { await ws.locator('[data-pasos] [data-k="4"]').click(); await ws.screenshot({ path: captura.replace('.png', '-secrecion-movil.png') }); }

    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los widgets correctas`);
  process.exit(mal ? 1 : 0);
})();
