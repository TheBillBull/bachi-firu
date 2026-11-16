// Prueba pulsando de verdad: ficha «de un vistazo» del tema 3 de Biología II (plegar, móvil oscuro) y el widget bio_acidograso.
// Uso: node herramientas/pruebas/e2e_bio2_t3.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  const fijar = async (loc, v) => { await loc.evaluate((e, x) => { e.value = x; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v)); };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'bio2', 't3');
    const d = p.locator('#detail-t3');
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

    // esquema de la bicapa (SVG estático de la teoría)
    chk(cfg.nom + ': esquema de bicapa con 20 cabezas', await d.locator('svg[aria-label^="Bicapa"] circle').count(), 20);

    // widget de ácidos grasos
    const wa = d.locator('[data-w=bio_acidograso]');
    await wa.scrollIntoViewIfNeeded();
    const sl = wa.locator('input[type=range]');
    const ver = () => wa.locator('.bio3-veredicto').innerText();
    const dat = () => wa.locator('.bio3-dato').innerText();
    chk(cfg.nom + ': arranca con oleico a 20 °C → líquido', await ver(), t => /oleico/.test(t) && /LÍQUIDO/.test(t) && /13 °C/.test(t));
    chk(cfg.nom + ': oleico C₁₈H₃₄O₂, 1 doble enlace', await dat(), t => /C₁₈H₃₄O₂/.test(t) && /C18:1/.test(t) && /1 \(insaturado\)/.test(t));
    chk(cfg.nom + ': 1 doble enlace dibujado', await wa.locator('svg .b3-dob').count(), 1);
    await fijar(sl, 5);
    chk(cfg.nom + ': oleico a 5 °C → sólido', await ver(), t => /SÓLIDO/.test(t));
    await wa.locator('.chip-btn', { hasText: 'Esteárico' }).click();
    await fijar(sl, 20);
    chk(cfg.nom + ': esteárico a 20 °C → sólido, 70 °C', [await ver(), await dat()], r => /SÓLIDO/.test(r[0]) && /70 °C/.test(r[1]) && /C₁₈H₃₆O₂/.test(r[1]));
    chk(cfg.nom + ': esteárico sin dobles enlaces dibujados', await wa.locator('svg .b3-dob').count(), 0);
    await fijar(sl, 75);
    chk(cfg.nom + ': esteárico a 75 °C → líquido', await ver(), t => /LÍQUIDO/.test(t));
    await wa.locator('.chip-btn', { hasText: 'Linolénico' }).click();
    chk(cfg.nom + ': linolénico: C₁₈H₃₀O₂, 3 dobles enlaces dibujados', [await dat(), await wa.locator('svg .b3-dob').count()], r => /C₁₈H₃₀O₂/.test(r[0]) && r[1] === 3);
    await fijar(sl, -15);
    chk(cfg.nom + ': linolénico a −15 °C → sólido (funde a −11)', await ver(), t => /SÓLIDO/.test(t) && /-11 °C/.test(t));
    await fijar(sl, -5);
    chk(cfg.nom + ': linolénico a −5 °C → líquido', await ver(), t => /LÍQUIDO/.test(t));
    await wa.locator('.chip-btn', { hasText: 'Palmítico' }).click();
    chk(cfg.nom + ': palmítico C₁₆H₃₂O₂ y 63 °C', await dat(), t => /C₁₆H₃₂O₂/.test(t) && /63 °C/.test(t) && /256,43/.test(t));
    chk(cfg.nom + ': widget sin desborde', [await wa.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') await wa.screenshot({ path: captura.replace('.png', '-acido-movil.png') });
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y del widget correctas`);
  process.exit(mal ? 1 : 0);
})();
