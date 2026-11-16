// Prueba pulsando de verdad: ficha «de un vistazo» del tema 4 de Biología II (plegar, móvil oscuro) y los widgets
// bio_aminoacidos, bio_enzima y bio_factores.
// Uso: node herramientas/pruebas/e2e_bio2_t4.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  const fijar = async (loc, v) => { await loc.evaluate((e, x) => { e.value = x; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v)); };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'bio2', 't4');
    const d = p.locator('#detail-t4');
    const sinDesborde = async (w) => [await w.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)].every(Boolean);
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

    // esquema del enlace peptídico (SVG)
    chk(cfg.nom + ': esquema del enlace peptídico', await d.locator('svg.bio4-svg').count(), 1);

    // construye un péptido
    const wa = d.locator('[data-w=bio_aminoacidos]');
    await wa.scrollIntoViewIfNeeded();
    const dat = () => wa.locator('.bio4-dato').innerText();
    const ver = () => wa.locator('.bio4-veredicto').innerText();
    const aa = (k) => wa.locator('button[data-aa=' + k + ']').click();
    chk(cfg.nom + ': aminoácidos: 8 botones', await wa.locator('button[data-aa]').count(), 8);
    chk(cfg.nom + ': aminoácidos arranca vacío', await wa.locator('.bio4-cadena').innerText(), t => /vacía/.test(t));
    await aa('Gly'); await aa('Ala'); await aa('Ser');
    chk(cfg.nom + ': Gly-Ala-Ser: 3 aa, 2 enlaces, 233,22', await dat(), t => /3 \(tripéptido\)/.test(t) && /Enlaces peptídicos\s*2/i.test(t) && /233,22/.test(t));
    chk(cfg.nom + ': Gly-Ala-Ser: 20^3 = 8 000', await dat(), t => /20\^3 = 8.000/.test(t));
    await wa.locator('[data-q="0"]').click();
    await aa('Gly'); await aa('Ala'); await aa('Cys'); await aa('Cys');
    chk(cfg.nom + ': Gly-Ala-Cys-Cys: 3 enlaces y 3 H2O', await dat(), t => /4 \(tetrapéptido\)/.test(t) && /Enlaces peptídicos\s*3/i.test(t) && /agua liberadas\s*3/i.test(t));
    chk(cfg.nom + ': Gly-Ala-Cys-Cys: 352,4 g/mol', await dat(), t => /352,4[34]/.test(t));
    chk(cfg.nom + ': dos cisteínas → puente disulfuro', await ver(), t => /puente disulfuro/.test(t));
    await wa.locator('[data-q="1"]').click();
    chk(cfg.nom + ': quitar el último → 3 aa y sin aviso', [await dat(), await ver()], r => /3 \(tripéptido\)/.test(r[0]) && !/disulfuro/.test(r[1]));
    await aa('Asp'); await aa('Lys');
    chk(cfg.nom + ': Asp y Lys → 1 ácido y 1 básico', await dat(), t => /1 ácido\(s\) \(−\), 1 básico/.test(t));
    for (let i = 0; i < 12; i++) await aa('Val');
    chk(cfg.nom + ': tope de 12 residuos', await wa.locator('.bio4-cadena .aa').count(), 12);
    chk(cfg.nom + ': 12 aa → 11 enlaces', await dat(), t => /12 \(polipéptido\)/.test(t) && /Enlaces peptídicos\s*11/i.test(t));
    chk(cfg.nom + ': aminoácidos sin desborde', await sinDesborde(wa), true);
    if (captura && cfg.nom !== 'escritorio') await wa.screenshot({ path: captura.replace('.png', '-peptido-movil.png') });

    // Michaelis–Menten
    const we = d.locator('[data-w=bio_enzima]');
    await we.scrollIntoViewIfNeeded();
    const sl = we.locator('input[type=range]');
    const dE = () => we.locator('.bio4-dato').innerText();
    const vE = () => we.locator('.bio4-veredicto').innerText();
    chk(cfg.nom + ': enzima: tres deslizadores', await sl.count(), 3);
    chk(cfg.nom + ': enzima: [S] = 2 = Km → 50 µmol/min y 50 %', await dE(), t => /Velocidad v\s*50 µmol/i.test(t) && /v \/ Vmax\s*50 %/i.test(t));
    await fijar(sl.nth(0), 20);
    chk(cfg.nom + ': enzima saturada: v/Vmax 90,9 % y aviso', [await dE(), await vE()], r => /90,9 %/.test(r[0]) && /saturación/.test(r[1]));
    await fijar(sl.nth(0), 2); await fijar(sl.nth(1), 2);
    chk(cfg.nom + ': [E] ×2 → Vmax 200 y v = 100', await dE(), t => /Vmax\s*200 µmol/i.test(t) && /Velocidad v\s*100 µmol/i.test(t));
    await fijar(sl.nth(1), 1);
    await we.locator('[data-k=comp]').click();
    await fijar(sl.nth(2), 2); await fijar(sl.nth(0), 6);
    chk(cfg.nom + ': competitivo [I]/Ki = 2 → Km 6, Vmax 100, v(6) = 50', await dE(), t => /Km \(con inhibidor\)\s*6 mM/i.test(t) && /Vmax\s*100 µmol/i.test(t) && /Velocidad v\s*50 µmol/i.test(t));
    chk(cfg.nom + ': competitivo: explicación', await vE(), t => /Competitivo/.test(t) && /Km/.test(t));
    await we.locator('[data-k=nocomp]').click();
    await fijar(sl.nth(2), 1); await fijar(sl.nth(0), 2);
    chk(cfg.nom + ': no competitivo [I]/Ki = 1 → Vmax 50, Km 2, v(2) = 25', await dE(), t => /Vmax\s*50 µmol/i.test(t) && /Km \(con inhibidor\)\s*2 mM/i.test(t) && /Velocidad v\s*25 µmol/i.test(t));
    chk(cfg.nom + ': no competitivo: explicación', await vE(), t => /No competitivo/.test(t) && /no cambia/.test(t));
    chk(cfg.nom + ': enzima: curvas y punto dibujados', [await we.locator('svg path.p-curva').count(), await we.locator('svg circle.p-punto').count()], r => r[0] >= 2 && r[1] === 1);
    chk(cfg.nom + ': enzima sin desborde', await sinDesborde(we), true);
    if (captura && cfg.nom !== 'escritorio') await we.screenshot({ path: captura.replace('.png', '-enzima-movil.png') });

    // temperatura y pH
    const wf = d.locator('[data-w=bio_factores]');
    await wf.scrollIntoViewIfNeeded();
    const sf = wf.locator('input[type=range]');
    const dF = () => wf.locator('.bio4-dato').innerText();
    const vF = () => wf.locator('.bio4-veredicto').innerText();
    chk(cfg.nom + ': factores: arranca en temperatura, 37 °C → 100 %', await dF(), t => /Temperatura\s*37 °C/i.test(t) && /100 %/.test(t));
    chk(cfg.nom + ': factores: el deslizador de pH está oculto', await sf.nth(1).isVisible(), false);
    await fijar(sf.nth(0), 27);
    chk(cfg.nom + ': 27 °C → 50 % y reversible', [await dF(), await vF()], r => /50 %/.test(r[0]) && /recupera/.test(r[1]));
    await fijar(sf.nth(0), 47);
    chk(cfg.nom + ': 47 °C → 6,25 % y desnaturalización', [await dF(), await vF()], r => /6,[23] %/.test(r[0]) && /desnaturaliza/.test(r[1]));
    await wf.locator('[data-enz] .chip-btn', { hasText: 'Taq' }).click();
    await fijar(sf.nth(0), 72);
    chk(cfg.nom + ': Taq a 72 °C → 100 %', await dF(), t => /Óptimo de esta enzima\s*72 °C/i.test(t) && /100 %/.test(t));
    await wf.locator('[data-modo] .chip-btn', { hasText: 'pH' }).click();
    chk(cfg.nom + ': modo pH: deslizador de pH visible y el de T oculto', [await sf.nth(1).isVisible(), await sf.nth(0).isVisible()], r => r[0] && !r[1]);
    chk(cfg.nom + ': modo pH: eje del gráfico', await wf.locator('svg').first().innerHTML(), t => />pH</.test(t));
    await fijar(sf.nth(1), 3);
    chk(cfg.nom + ': pepsina a pH 3 → 50 %', await dF(), t => /Óptimo de esta enzima\s*2\s/i.test(t) && /50 %/.test(t));
    await wf.locator('[data-enz] .chip-btn', { hasText: 'Amilasa' }).click();
    await fijar(sf.nth(1), 6.8);
    chk(cfg.nom + ': amilasa a pH 6,8 → 100 % en su óptimo', [await dF(), await vF()], r => /100 %/.test(r[0]) && /en su óptimo/i.test(r[0]) && /Cerca del óptimo/.test(r[1]));
    await fijar(sf.nth(1), 2);
    chk(cfg.nom + ': amilasa a pH 2 → casi inactiva', await dF(), t => /Actividad relativa\s*0 %/i.test(t));
    chk(cfg.nom + ': factores sin desborde', await sinDesborde(wf), true);
    if (captura && cfg.nom !== 'escritorio') await wf.screenshot({ path: captura.replace('.png', '-factores-movil.png') });
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los widgets correctas`);
  process.exit(mal ? 1 : 0);
})();
