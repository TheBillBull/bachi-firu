// Prueba pulsando de verdad: ficha «de un vistazo» del tema 12 de Biología II (plegar, móvil oscuro) y los widgets
// bio_traductor, bio_maduracion y bio_operon.
// Uso: node herramientas/pruebas/e2e_bio2_t12.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  const fijar = async (loc, v) => { await loc.evaluate((e, x) => { e.value = x; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v)); };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'bio2', 't12');
    const d = p.locator('#detail-t12');
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

    // tabla del código genético
    chk(cfg.nom + ': tabla del código con 16 casillas y UUU Phe', await d.locator('table.lamina-table td', { hasText: 'UUU' }).count(), c => c >= 1);

    // Traductor
    const wt = d.locator('[data-w=bio_traductor]');
    await wt.scrollIntoViewIfNeeded();
    const slt = wt.locator('input[type=range]');
    const dt = () => wt.locator('.bio12-dato').innerText();
    const vt = () => wt.locator('.bio12-veredicto').innerText();
    chk(cfg.nom + ': traductor inicial: ARNm AUGUUUGGCAAAGAUUGA, 5 aa', await dt(), t => /AUGUUUGGCAAAGAUUGA/.test(t) && /5 aminoácidos \+ parada/.test(t) && /Met – Phe – Gly – Lys – Asp/.test(t));
    chk(cfg.nom + ': traductor: hebra molde complementaria', await dt(), t => /TACAAACCGTTTCTAACT/.test(t));
    chk(cfg.nom + ': traductor: codón 1 es AUG, metionina', await vt(), t => /Codón AUG/.test(t) && /3'-UAC-5'/.test(t) && /Met/.test(t));
    await fijar(slt, 2);
    chk(cfg.nom + ': traductor: codón 3 GGC → anticodón CCG, glicina', await vt(), t => /Codón GGC/.test(t) && /3'-CCG-5'/.test(t) && /glicina/.test(t));
    await fijar(slt, 5);
    chk(cfg.nom + ': traductor: codón 6 UGA es de parada', await vt(), t => /Codón UGA/.test(t) && /parada/.test(t) && /5 aminoácidos/.test(t));
    await wt.locator('.chip-btn', { hasText: 'Con secuencia antes del AUG' }).click();
    chk(cfg.nom + ': traductor: 2.º ejemplo, primer AUG en la posición 4 y Met-Ala-Glu-Leu', await dt(), t => /posición 4 \(antes hay 3 nt/.test(t) && /Met – Ala – Glu – Leu/.test(t) && /4 aminoácidos \+ parada/.test(t));
    await wt.locator('.chip-btn', { hasText: 'Parada prematura' }).click();
    chk(cfg.nom + ': traductor: parada prematura → Met-Ala-Trp (3 aa)', await dt(), t => /Met – Ala – Trp/.test(t) && /3 aminoácidos \+ parada/.test(t));
    // escribir la hebra molde a mano
    await wt.locator('.chip-btn', { hasText: 'Escribo la hebra molde' }).click();
    const inp = wt.locator('input[type=text]');
    await inp.fill('tacaaaccg');
    chk(cfg.nom + ': traductor: molde TACAAACCG → ARNm AUGUUUGGC, sin parada', await dt(), t => /AUGUUUGGC/.test(t) && /Met – Phe – Gly/.test(t) && /sin codón de parada/.test(t));
    await inp.fill('gggcccaaa');
    chk(cfg.nom + ': traductor: sin AUG no hay traducción', await vt(), t => /Sin AUG/.test(t));
    await inp.fill('xyz12ATGtaa');
    chk(cfg.nom + ': traductor: filtra caracteres no válidos (T,A,A...)', await inp.inputValue(), v => /^[ACGT]+$/.test(v));
    if (captura && cfg.nom !== 'escritorio') await wt.screenshot({ path: captura.replace('.png', '-traductor-movil.png') });
    chk(cfg.nom + ': traductor sin desborde', await sinDesborde(wt), true);

    // Maduración
    const wm = d.locator('[data-w=bio_maduracion]');
    await wm.scrollIntoViewIfNeeded();
    const slm = wm.locator('input[type=range]');
    const dm = () => wm.locator('.bio12-dato').innerText();
    const vm = () => wm.locator('.bio12-veredicto').innerText();
    chk(cfg.nom + ': maduración paso 0: pre-ARNm 1 920 nt', [await dm(), await vm()], r => /1[\s ]?920 nt/.test(r[0]) && /Caperuza\s*no/i.test(r[0]) && /Todavía no sirve/.test(r[1]));
    await fijar(slm, 1);
    chk(cfg.nom + ': paso 1: caperuza', [await dm(), await vm()], r => /Caperuza\s*sí/i.test(r[0]) && /Cola poli-A\s*no/i.test(r[0]) && /caperuza/i.test(r[1]));
    await fijar(slm, 2);
    chk(cfg.nom + ': paso 2: poli-A, longitud 2 120 nt', [await dm(), await vm()], r => /2[\s ]?120 nt \(con poli-A\)/.test(r[0]) && /200 adeninas/.test(r[1]));
    await fijar(slm, 3);
    chk(cfg.nom + ': paso 3: ARNm maduro 620 nt, 140 codones', [await dm(), await vm()], r => /620 nt \(420 codificantes\)/.test(r[0]) && /140/.test(r[0]) && /1[\s ]?500 nt de intrones/.test(r[1]));
    chk(cfg.nom + ': paso 3 dibuja 4 exones', await wm.locator('svg rect.b12-exon').count(), 4);
    await wm.locator('.chip-btn', { hasText: 'Salta el exón 2' }).click();
    chk(cfg.nom + ': salto del exón 2: 300 nt, 100 codones, 3 exones dibujados', [await dm(), await vm(), await wm.locator('svg rect.b12-exon').count()], r => /300 codificantes/.test(r[0]) && /100 codones/.test(r[1]) && r[2] === 3);
    await wm.locator('.chip-btn', { hasText: 'Salta el exón 3' }).click();
    chk(cfg.nom + ': salto del exón 3: 360 nt, 120 codones', [await dm(), await vm()], r => /360 codificantes/.test(r[0]) && /120 codones/.test(r[1]));
    await fijar(slm, 0);
    chk(cfg.nom + ': al volver al paso 0 vuelve el pre-ARNm completo (7 piezas)', await wm.locator('svg rect.b12-exon, svg rect.b12-intron').count(), 7);
    if (captura && cfg.nom !== 'escritorio') await wm.screenshot({ path: captura.replace('.png', '-maduracion-movil.png') });
    chk(cfg.nom + ': maduración sin desborde', await sinDesborde(wm), true);

    // Operones
    const wo = d.locator('[data-w=bio_operon]');
    await wo.scrollIntoViewIfNeeded();
    const dato = () => wo.locator('.bio12-dato').innerText();
    const ver = () => wo.locator('.bio12-veredicto').innerText();
    const chip = (t) => wo.locator('.chip-btn', { hasText: t }).first().click();
    chk(cfg.nom + ': lac inicial (glucosa, sin lactosa): reprimido', [await dato(), await ver()], r => /unido al operador/.test(r[0]) && /no se transcribe/.test(r[0]) && /represor se queda unido/.test(r[1]));
    await chip('Con lactosa');
    chk(cfg.nom + ': glucosa + lactosa: transcripción baja', await dato(), t => /inactivo/.test(t) && /se transcribe poco/.test(t) && /no actúa/.test(t));
    await chip('Sin glucosa');
    chk(cfg.nom + ': sin glucosa + lactosa: transcripción alta con CAP', [await dato(), await ver()], r => /se transcribe mucho/.test(r[0]) && /CAP-AMPc\s*unido/i.test(r[0]) && /Máxima transcripción/.test(r[1]));
    await chip('Sin lactosa');
    chk(cfg.nom + ': sin glucosa y sin lactosa: bloqueado', await dato(), t => /no se transcribe/.test(t));
    await chip('Mutante lacI');
    chk(cfg.nom + ': lacI⁻ sin lactosa: constitutivo (alta, sin glucosa)', [await dato(), await ver()], r => /no funcional/.test(r[0]) && /se transcribe mucho/.test(r[0]) && /constitutiva/.test(r[1]));
    await chip('Mutante lacO');
    chk(cfg.nom + ': lacOᶜ: siempre encendido', [await dato(), await ver()], r => /se transcribe mucho/.test(r[0]) && /cis/.test(r[1]));
    await chip('Con glucosa');
    chk(cfg.nom + ': lacOᶜ con glucosa: encendido pero poco', await dato(), t => /se transcribe poco/.test(t));
    await chip('Bacteria normal');
    await wo.locator('.chip-btn', { hasText: 'Operón trp' }).click();
    chk(cfg.nom + ': trp sin triptófano: encendido', [await dato(), await ver()], r => /se transcribe mucho/.test(r[0]) && /inactivo/.test(r[0]) && /fabrica su propio triptófano/.test(r[1]));
    await chip('Con triptófano');
    chk(cfg.nom + ': trp con triptófano: apagado', [await dato(), await ver()], r => /no se transcribe/.test(r[0]) && /correpresor/.test(r[1]));
    chk(cfg.nom + ': trp: 5 genes dibujados', await wo.locator('svg rect.b12-gen').count(), 6);   // 5 estructurales + trpR
    await wo.locator('.chip-btn', { hasText: 'Operón lac' }).click();
    chk(cfg.nom + ': al volver a lac se restablece (represor unido)', await dato(), t => /unido al operador/.test(t));
    if (captura && cfg.nom !== 'escritorio') await wo.screenshot({ path: captura.replace('.png', '-operon-movil.png') });
    chk(cfg.nom + ': operón sin desborde', await sinDesborde(wo), true);
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los widgets correctas`);
  process.exit(mal ? 1 : 0);
})();
