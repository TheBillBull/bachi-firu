// Prueba pulsando de verdad: ficha «de un vistazo» del tema 10 de Biología II (plegar, móvil oscuro) y los widgets bio_cruce, bio_abo, bio_xlig y bio_pedigri.
// Uso: node herramientas/pruebas/e2e_bio2_t10.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  const fijar = async (loc, v) => { await loc.evaluate((e, x) => { e.value = x; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v)); };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'bio2', 't10');
    const d = p.locator('#detail-t10');
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
    const sinDesborde = async w => [await w.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)];

    // ---- cuadro de Punnett
    const wc = d.first().locator('[data-w=bio_cruce]').first();
    await wc.scrollIntoViewIfNeeded();
    const dat = () => wc.locator('[data-d]').innerText();
    const filas = sel => wc.locator(sel + ' tr').count();
    const cc = (t, ctx) => (ctx || wc).locator('.chip-btn', { hasText: t }).first().click();
    chk(cfg.nom + ': Punnett mono Aa × Aa: 3 : 1 y 1 : 2 : 1', await dat(), t => /fenotípica\s*3 : 1/i.test(t) && /genotípica\s*1 : 2 : 1/i.test(t));
    chk(cfg.nom + ': Punnett mono: cuadro 2 × 2 y 2 fenotipos', [await filas('[data-pun]'), await filas('[data-prop]')], r => r[0] === 3 && r[1] === 3);
    await wc.locator('[data-p1] .chip-btn[data-k=AA]').click();
    await wc.locator('[data-p2] .chip-btn[data-k=aa]').click();
    chk(cfg.nom + ': AA × aa: todo Aa (1 clase)', await dat(), t => /fenotípica\s*1\s/i.test(t + ' ') && /Genotipos distintos\s*1 \(Aa 1\)/i.test(t));
    await wc.locator('[data-p1] .chip-btn[data-k=Aa]').click();
    await wc.locator('[data-p2] .chip-btn[data-k=aa]').click();
    chk(cfg.nom + ': Aa × aa: 1 : 1', await dat(), t => /fenotípica\s*1 : 1/i.test(t));
    await wc.locator('[data-p2] .chip-btn[data-k=Aa]').click();
    await cc('Dominancia intermedia');
    chk(cfg.nom + ': intermedia: 1 : 2 : 1 y roja, rosa, blanca', [await dat(), await wc.locator('[data-prop]').innerText()], r => /fenotípica\s*1 : 2 : 1/i.test(r[0]) && /roja/.test(r[1]) && /rosa/.test(r[1]) && /blanca/.test(r[1]));
    await cc('Dihíbrido');
    chk(cfg.nom + ': dihíbrido: 9 : 3 : 3 : 1, 9 genotipos, 16 casillas', [await dat(), await filas('[data-pun]')], r => /fenotípica\s*9 : 3 : 3 : 1/i.test(r[0]) && /Genotipos distintos\s*9 /i.test(r[0]) && /Casillas\s*16/i.test(r[0]) && r[1] === 5);
    await cc('cruce prueba');
    chk(cfg.nom + ': cruce prueba dihíbrido: 1 : 1 : 1 : 1', await dat(), t => /fenotípica\s*1 : 1 : 1 : 1/i.test(t));
    await wc.locator('[data-di] .chip-btn[data-k="2"]').click();
    chk(cfg.nom + ': AABB × aabb: F₁ toda AaBb', await dat(), t => /Genotipos distintos\s*1 \(AaBb 1\)/i.test(t));
    await wc.locator('[data-di] .chip-btn[data-k="3"]').click();
    chk(cfg.nom + ': AaBb × Aabb: 3 : 3 : 1 : 1', await dat(), t => /fenotípica\s*3 : 3 : 1 : 1/i.test(t));
    await cc('Genes ligados');
    chk(cfg.nom + ': ligados r=10 cis: 450/450/50/50', await wc.locator('[data-prop]').innerText(), t => /450/.test(t) && /\b50\b/.test(t) && /parental/.test(t) && /recombinante/.test(t));
    chk(cfg.nom + ': ligados: distancia 10 cM', await dat(), t => /10 cM/.test(t) && /45 %/.test(t) && /5 %/.test(t));
    await fijar(wc.locator('input[type=range]'), 0);
    chk(cfg.nom + ': r=0: ligamiento completo', await wc.locator('.bio10-veredicto').innerText(), t => /Sin recombinación/.test(t));
    await fijar(wc.locator('input[type=range]'), 50);
    chk(cfg.nom + ': r=50: 1 : 1 : 1 : 1 e independientes', [await wc.locator('.bio10-veredicto').innerText(), await wc.locator('[data-prop]').innerText()], r => /1 : 1 : 1 : 1/.test(r[0]) && (r[1].match(/250/g) || []).length === 4);
    await fijar(wc.locator('input[type=range]'), 20);
    await cc('Trans');
    chk(cfg.nom + ': trans r=20: parentales 400 (Ab y aB) y recombinantes 100', await wc.locator('[data-prop]').innerText(), t => (t.match(/400/g) || []).length === 2 && (t.match(/\b100\b/g) || []).length === 2);
    chk(cfg.nom + ': Punnett sin desborde', await sinDesborde(wc), r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') { await cc('Dihíbrido'); await wc.screenshot({ path: captura.replace('.png', '-punnett-movil.png') }); }

    // ---- grupos sanguíneos
    const wa = d.locator('[data-w=bio_abo]');
    await wa.scrollIntoViewIfNeeded();
    const aprop = () => wa.locator('[data-prop]').innerText();
    const aver = () => wa.locator('.bio10-veredicto').innerText();
    chk(cfg.nom + ': ABO AO × BO: los cuatro grupos a ¼', [await aprop(), await aver()], r => /Grupo AB\s*1\/4/.test(r[0]) && /Grupo O\s*1\/4/.test(r[0]) && /los cuatro grupos/.test(r[1]));
    await wa.locator('[data-p1] .chip-btn[data-k=AB]').click();
    await wa.locator('[data-p2] .chip-btn[data-k=OO]').click();
    chk(cfg.nom + ': AB × O: solo A y B, ½ y ½; imposible AB y O', [await aprop(), await aver()], r => /Grupo A\s*1\/2/.test(r[0]) && /Grupo B\s*1\/2/.test(r[0]) && !/Grupo O/.test(r[0]) && /Imposible: AB, O/.test(r[1]));
    await wa.locator('[data-p1] .chip-btn[data-k=OO]').click();
    chk(cfg.nom + ': O × O: solo O', [await aprop(), await aver()], r => /Grupo O\s*1\b/.test(r[0]) && /Imposible: A, B, AB/.test(r[1]));
    await wa.locator('[data-p1] .chip-btn[data-k=AO]').click();
    await wa.locator('[data-p2] .chip-btn[data-k=AO]').click();
    chk(cfg.nom + ': AO × AO: ¾ A y ¼ O', await aprop(), t => /Grupo A\s*3\/4/.test(t) && /Grupo O\s*1\/4/.test(t));
    chk(cfg.nom + ': ABO sin desborde', await sinDesborde(wa), r => r[0] && r[1]);

    // ---- ligada al X
    const wx = d.locator('[data-w=bio_xlig]');
    await wx.scrollIntoViewIfNeeded();
    const xprop = () => wx.locator('[data-prop]').innerText();
    const xver = () => wx.locator('.bio10-veredicto').innerText();
    chk(cfg.nom + ': portadora × sano: ½ de los hijos varones daltónicos', [await xprop(), await xver()], r => /hijo daltónico\s*1\/4\s*1\/2/.test(r[0]) && /1\/2 de los hijos varones y 0 de las hijas/.test(r[1]));
    await wx.locator('[data-m] .chip-btn[data-k=MM]').click();
    chk(cfg.nom + ': afectada × sano: todos los hijos varones daltónicos', [await xprop(), await xver()], r => /hijo daltónico\s*1\/2\s*1\b/.test(r[0]) && /: 1 de los hijos varones y 0 de las hijas/.test(r[1]));
    await wx.locator('[data-m] .chip-btn[data-k=NN]').click();
    await wx.locator('[data-p] .chip-btn[data-k=M]').click();
    chk(cfg.nom + ': sana × afectado: hijas portadoras, hijos sanos', [await xprop(), await xver()], r => /hija portadora\s*1\/2/.test(r[0]) && /hijo sano\s*1\/2/.test(r[0]) && /Ningún descendiente estará afectado/.test(r[1]));
    await wx.locator('[data-m] .chip-btn[data-k=NM]').click();
    chk(cfg.nom + ': portadora × afectado: ¼ hija daltónica', await xprop(), t => /hija daltónica\s*1\/4\s*1\/2/.test(t));
    await wx.locator('[data-car] .chip-btn[data-k=hem]').click();
    chk(cfg.nom + ': hemofilia: usa el rótulo de hemofílico y los alelos H/h', [await xprop(), await wx.locator('[data-m]').innerText()], r => /hija hemofílica\s*1\/4/.test(r[0]) && /hijo hemofílico/.test(r[0]) && /XH/.test(r[1].replace(/\s/g, '')));
    chk(cfg.nom + ': ligada al X sin desborde', await sinDesborde(wx), r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') await wx.screenshot({ path: captura.replace('.png', '-x-movil.png') });

    // ---- árboles genealógicos
    const wp = d.locator('[data-w=bio_pedigri]');
    await wp.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': árbol 1: 4 cuadrados, 4 círculos, 3 afectados', await wp.locator('svg').evaluate(s => [s.querySelectorAll('rect').length, s.querySelectorAll('circle').length, [...s.querySelectorAll('rect,circle')].filter(e => /var\(--pen\)/.test(e.getAttribute('style'))).length]), r => r[0] === 4 && r[1] === 4 && r[2] === 3);
    chk(cfg.nom + ': árbol sin deducción al principio', await wp.locator('[data-sal]').innerText(), t => t.trim() === '');
    await wp.locator('.chip-btn', { hasText: 'Ver la deducción' }).click();
    chk(cfg.nom + ': árbol 1: recesivo autosómico y 8 personas', [await wp.locator('[data-regla]').innerText(), await wp.locator('[data-prop] tr').count()], r => /Autosómico recesivo/.test(r[0]) && /descarta/.test(r[0]) && r[1] === 9);
    await wp.locator('.chip-btn', { hasText: 'Árbol 2' }).click();
    chk(cfg.nom + ': árbol 2: dominante, 4 afectados', [await wp.locator('[data-regla]').innerText(), await wp.locator('svg').evaluate(s => [...s.querySelectorAll('rect,circle')].filter(e => /var\(--pen\)/.test(e.getAttribute('style'))).length)], r => /Autosómico dominante/.test(r[0]) && r[1] === 4);
    await wp.locator('.chip-btn', { hasText: 'Árbol 3' }).click();
    chk(cfg.nom + ': árbol 3: ligado al X y genotipos X^D', [await wp.locator('[data-regla]').innerText(), await wp.locator('[data-prop]').innerText()], r => /ligado al X/.test(r[0]) && /XD\s*Xd|XDXd/.test(r[1].replace(/\s+/g, '')));
    await wp.locator('.chip-btn', { hasText: 'Solo el árbol' }).click();
    chk(cfg.nom + ': vuelve a ocultar la deducción', await wp.locator('[data-sal]').innerText(), t => t.trim() === '');
    chk(cfg.nom + ': árboles sin desborde', await sinDesborde(wp), r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') { await wp.locator('.chip-btn', { hasText: 'Ver la deducción' }).click(); await wp.screenshot({ path: captura.replace('.png', '-arbol-movil.png') }); }

    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los widgets correctas`);
  process.exit(mal ? 1 : 0);
})();
