// Prueba pulsando de verdad: ficha «de un vistazo» del tema 9 de Biología II (plegar, móvil oscuro) y los widgets
// bio_esquemaz, bio_calvin, bio_fotofactores y bio_c3c4cam.
// Uso: node herramientas/pruebas/e2e_bio2_t9.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  const fijar = async (loc, v) => { await loc.evaluate((e, x) => { e.value = x; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v)); };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'bio2', 't9');
    const d = p.locator('#detail-t9');
    const sinDesborde = async (w) => [await w.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)].every(Boolean);
    // ficha
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

    // esquema en Z
    const wz = d.locator('[data-w=bio_esquemaz]');
    await wz.scrollIntoViewIfNeeded();
    const slz = wz.locator('input[type=range]');
    const tx = () => wz.locator('.bio9-texto').innerText();
    const da = () => wz.locator('.bio9-dato').innerText();
    chk(cfg.nom + ': Z paso 1 (PSII)', await tx(), t => /fotosistema II/.test(t));
    chk(cfg.nom + ': Z paso 1 sin productos', await da(), t => /ATP formado\s*0/i.test(t) && /NADPH formado\s*0/i.test(t));
    await fijar(slz, 2);
    chk(cfg.nom + ': Z paso 2 fotólisis → ½ O₂ y 2 H⁺', [await tx(), await da()], r => /Fotólisis/i.test(r[0]) && /0,5/i.test(r[1]) && /bombeados al lumen\s*2/i.test(r[1]));
    await fijar(slz, 4);
    chk(cfg.nom + ': Z paso 4 b₆f → 6 H⁺', await da(), t => /bombeados al lumen\s*6/i.test(t));
    await fijar(slz, 8);
    chk(cfg.nom + ': Z paso 8 → 1 NADPH', await da(), t => /NADPH formado\s*1/i.test(t));
    await fijar(slz, 9);
    chk(cfg.nom + ': Z paso 9 → ATP ≈ 1,5', [await tx(), await da()], r => /ATP sintasa/.test(r[0]) && /≈ 1,5/.test(r[1]));
    chk(cfg.nom + ': Z dibuja los nodos', await wz.locator('svg rect.b9-nodo').count(), t => t >= 10);
    if (captura && cfg.nom !== 'escritorio') await wz.screenshot({ path: captura.replace('.png', '-z-movil.png') });
    await wz.locator('.chip-btn', { hasText: 'Flujo cíclico' }).click();
    chk(cfg.nom + ': cíclico: 5 pasos como máximo', await slz.evaluate(e => e.max), '5');
    chk(cfg.nom + ': cíclico vuelve al paso 1 (solo PSI)', await tx(), t => /solo el fotosistema I/.test(t));
    await fijar(slz, 5);
    chk(cfg.nom + ': cíclico final: ATP ≈ 1 sin NADPH ni O₂', await da(), t => /≈ 1(?!,)/i.test(t) && /NADPH formado\s*0/i.test(t) && /O₂ liberado\s*0/i.test(t));
    await wz.locator('.chip-btn', { hasText: 'Flujo acíclico' }).click();
    chk(cfg.nom + ': acíclico: 9 pasos', await slz.evaluate(e => e.max), '9');
    chk(cfg.nom + ': Z sin desborde', await sinDesborde(wz), true);

    // Calvin
    const wc = d.locator('[data-w=bio_calvin]');
    await wc.scrollIntoViewIfNeeded();
    const slc = wc.locator('input[type=range]');
    const dc = () => wc.locator('.bio9-dato').innerText();
    const vc = () => wc.locator('.bio9-veredicto').innerText();
    chk(cfg.nom + ': Calvin con 3 CO₂ → 9 ATP, 6 NADPH, 1 G3P', await dc(), t => /ATP gastado\s*9 \(6 reducción \+ 3 regeneración\)/i.test(t) && /NADPH gastado\s*6/i.test(t) && /G3P que salen del ciclo\s*1/i.test(t) && /Glucosa formada\s*0,5/i.test(t));
    await fijar(slc, 6);
    chk(cfg.nom + ': 6 CO₂ → 1 glucosa, 18 ATP, 12 NADPH', [await dc(), await vc()], r => /ATP gastado\s*18/i.test(r[0]) && /NADPH gastado\s*12/i.test(r[0]) && /1 glucosa/i.test(r[1]));
    await fijar(slc, 4);
    chk(cfg.nom + ': 4 CO₂ → sin triosa entera', await vc(), t => /aún no sale/.test(t));
    await wc.locator('.chip-btn', { hasText: 'C4' }).click();
    await fijar(slc, 6);
    chk(cfg.nom + ': C4, 6 CO₂ → 30 ATP', await dc(), t => /ATP gastado\s*30/i.test(t) && /NADPH gastado\s*12/i.test(t));
    await fijar(slc, 12);
    chk(cfg.nom + ': 12 CO₂ → 2 glucosas', await vc(), t => /2 glucosa/.test(t) && /60 ATP/.test(t));
    chk(cfg.nom + ': Calvin sin desborde', await sinDesborde(wc), true);

    // factores
    const wf = d.locator('[data-w=bio_fotofactores]');
    await wf.scrollIntoViewIfNeeded();
    const sf = wf.locator('input[type=range]');
    const vf = () => wf.locator('.bio9-veredicto').innerText();
    chk(cfg.nom + ': factores: 3 deslizadores', await sf.count(), 3);
    chk(cfg.nom + ': inicial → 50 %, limita la luz', await vf(), t => /50 %/.test(t) && /luz/.test(t));
    await fijar(sf.nth(0), 1500); await fijar(sf.nth(2), 30);
    chk(cfg.nom + ': 1500 µmol, 30 °C → limita el CO₂ (67 %)', await vf(), t => /67 %/.test(t) && /Factor limitante: CO₂/.test(t));
    await fijar(sf.nth(1), 800); await fijar(sf.nth(2), 10);
    chk(cfg.nom + ': 800 ppm, 10 °C → limita la temperatura (17 %)', await vf(), t => /17 %/.test(t) && /temperatura/.test(t));
    await fijar(sf.nth(2), 30);
    chk(cfg.nom + ': todo al máximo → nada limita', await vf(), t => /100 %/.test(t) && /nada limita/.test(t));
    await wf.locator('.chip-btn', { hasText: 'C4' }).click();
    await fijar(sf.nth(0), 750); await fijar(sf.nth(1), 400); await fijar(sf.nth(2), 35);
    chk(cfg.nom + ': C4 750 µmol, 400 ppm, 35 °C → 50 %, luz', await vf(), t => /50 %/.test(t) && /luz/.test(t));
    const trazo = async () => wf.locator('.w-plot svg path').count();
    chk(cfg.nom + ': la gráfica tiene curva', await trazo(), t => t >= 1);
    await wf.locator('.chip-btn', { hasText: 'frente al CO₂' }).click();
    chk(cfg.nom + ': curva frente al CO₂ sin errores', await trazo(), t => t >= 1);
    await wf.locator('.chip-btn', { hasText: 'temperatura' }).click();
    chk(cfg.nom + ': curva frente a la temperatura', await trazo(), t => t >= 1);
    if (captura && cfg.nom !== 'escritorio') await wf.screenshot({ path: captura.replace('.png', '-factores-movil.png') });
    chk(cfg.nom + ': factores sin desborde', await sinDesborde(wf), true);

    // C3, C4 y CAM
    const wm = d.locator('[data-w=bio_c3c4cam]');
    await wm.scrollIntoViewIfNeeded();
    const hs = wm.locator('input[type=range]');
    const dm = () => wm.locator('.bio9-dato').innerText();
    const vm = () => wm.locator('.bio9-veredicto').innerText();
    chk(cfg.nom + ': C3 templado a las 12 h: abiertos, fotorrespiración moderada', [await wm.locator('svg').evaluate(e => e.textContent), await dm()], r => /abiertos/.test(r[0]) && /moderada/.test(r[1]));
    await wm.locator('.chip-btn', { hasText: 'Calor' }).click();
    chk(cfg.nom + ': C3 con calor: casi cerrados, fotorrespiración ALTA', [await wm.locator('svg').evaluate(e => e.textContent), await dm()], r => /casi cerrados/.test(r[0]) && /ALTA/.test(r[1]));
    await wm.locator('.chip-btn', { hasText: 'C4' }).click();
    chk(cfg.nom + ': C4 con calor: fotorrespiración muy baja y PEP', [await dm(), await vm()], r => /muy baja/.test(r[0]) && /PEP carboxilasa/.test(r[0]) && /ESPACIO/.test(r[1]));
    await wm.locator('.chip-btn', { hasText: 'CAM' }).click();
    chk(cfg.nom + ': CAM a las 12 h: cerrados, usa el malato', [await wm.locator('svg').evaluate(e => e.textContent), await dm()], r => /cerrados/.test(r[0]) && /malato/.test(r[1]));
    await fijar(hs, 2);
    chk(cfg.nom + ': CAM a las 2 h: abiertos, PEP carboxilasa → malato', [await wm.locator('svg').evaluate(e => e.textContent), await dm(), await vm()], r => /abiertos/.test(r[0]) && /PEP carboxilasa: CO₂ → malato/.test(r[1]) && /TIEMPO/.test(r[2]));
    await wm.locator('.chip-btn', { hasText: 'C3' }).click();
    chk(cfg.nom + ': C3 a las 2 h: cerrados y sin fotorrespiración', [await wm.locator('svg').evaluate(e => e.textContent), await dm()], r => /cerrados/.test(r[0]) && /ninguna/.test(r[1]));
    if (captura && cfg.nom !== 'escritorio') await wm.screenshot({ path: captura.replace('.png', '-c3c4cam-movil.png') });
    chk(cfg.nom + ': C3/C4/CAM sin desborde', await sinDesborde(wm), true);
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los widgets correctas`);
  process.exit(mal ? 1 : 0);
})();
