// Prueba pulsando de verdad: ficha «de un vistazo» del tema 5 de Biología II (plegar, móvil oscuro), el esquema de empaquetamiento y el widget bio_adn.
// Uso: node herramientas/pruebas/e2e_bio2_t5.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'bio2', 't5');
    const d = p.locator('#detail-t5');
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

    // esquema de empaquetamiento (SVG estático)
    chk(cfg.nom + ': esquema de empaquetamiento: 10 textos y 5 círculos', [await d.locator('svg[aria-label^="Niveles"] text').count(), await d.locator('svg[aria-label^="Niveles"] circle').count()], r => r[0] === 10 && r[1] === 5);

    // widget bio_adn
    const wa = d.locator('[data-w=bio_adn]');
    await wa.scrollIntoViewIfNeeded();
    const inp = wa.locator('.bio5-in');
    const dat = () => wa.locator('.bio5-dato').innerText();
    const ver = () => wa.locator('.bio5-veredicto').innerText();
    const heb = () => wa.locator('.bio5-hebras').innerText();
    const cols = () => wa.locator('.bio5-par').count();
    chk(cfg.nom + ': arranca con ATGCGTACCT: 10 pares, 25 puentes, 50 %', [await cols(), await dat()], r => r[0] === 10 && /10 pb · 3,4 nm/.test(r[1]) && /25 \(/.test(r[1]) && /% DE G \+ C\s*50 %/i.test(r[1]) && /3′-TACGCATGGA-5′/.test(r[1]));
    chk(cfg.nom + ': Chargaff en la composición', await dat(), t => /A = T = 25 %/.test(t) && /C = G = 25 %/.test(t) && /A 2 · T 3 · C 3 · G 2/.test(t));
    await wa.locator('.chip-btn', { hasText: 'Rica en GC' }).click();
    chk(cfg.nom + ': rica en GC → 30 puentes, 100 %, más estable', [await inp.inputValue(), await dat(), await ver()], r => r[0] === 'GCGGCCGCGC' && /30 \(/.test(r[1]) && /% DE G \+ C\s*100 %/i.test(r[1]) && /más estable/.test(r[2]));
    await wa.locator('.chip-btn', { hasText: 'Rica en AT' }).click();
    chk(cfg.nom + ': rica en AT → 20 puentes, 0 %, menos estable', [await dat(), await ver()], r => /20 \(/.test(r[0]) && /% DE G \+ C\s*0 %/i.test(r[0]) && /menos estable/.test(r[1]));
    await inp.fill('acgtx!');
    chk(cfg.nom + ': filtra letras no válidas → ACGT, 4 pares, 10 puentes', [await inp.inputValue(), await cols(), await dat()], r => r[0] === 'ACGT' && r[1] === 4 && /10 \(/.test(r[2]) && /1,36 nm/.test(r[2]));
    await inp.fill('');
    chk(cfg.nom + ': vacío → aviso y sin columnas', [await cols(), await heb()], r => r[0] === 0 && /Escribe al menos una base/.test(r[1]));
    await wa.locator('.chip-btn', { hasText: 'Transcribir a ARN' }).click();
    await wa.locator('.chip-btn', { hasText: 'ADN→ARN' }).click();
    chk(cfg.nom + ': modo ARN: molde TACGGATTC → 5′-AUGCCUAAG-3′', [await dat(), await cols()], r => /5′-AUGCCUAAG-3′/.test(r[0]) && /Tripletes completos\s*3/i.test(r[0]) && r[1] === 9);
    chk(cfg.nom + ': modo ARN: 2 uracilos y 44,4 %', await dat(), t => /Uracilos \(U\)\s*2/i.test(t) && /44,4 %/.test(t));
    chk(cfg.nom + ': modo ARN: etiqueta de molde 3′→5′', await wa.locator('.bio5-et').innerText(), t => /molde/.test(t));
    chk(cfg.nom + ': modo ARN: aviso sobre U', await ver(), t => /ARN polimerasa/.test(t) && /U/.test(t));
    await wa.locator('.chip-btn', { hasText: 'Doble hélice' }).click();
    chk(cfg.nom + ': vuelta a doble hélice: etiqueta de hebra dada', await wa.locator('.bio5-et').innerText(), t => /5′ → 3′/.test(t));
    chk(cfg.nom + ': widget sin desborde', [await wa.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') await wa.screenshot({ path: captura.replace('.png', '-adn-movil.png') });
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha, el esquema y el widget correctas`);
  process.exit(mal ? 1 : 0);
})();
