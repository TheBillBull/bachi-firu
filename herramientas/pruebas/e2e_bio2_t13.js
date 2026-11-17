// Prueba pulsando de verdad: ficha «de un vistazo» del tema 13 de Biología II (plegar, móvil oscuro) y los widgets
// bio_mutacion, bio_restriccion y bio_pcr.
// Uso: node herramientas/pruebas/e2e_bio2_t13.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  const fijar = async (loc, v) => { await loc.evaluate((e, x) => { e.value = x; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v)); };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'bio2', 't13');
    const d = p.locator('#detail-t13');
    const sinDesborde = async (w) => [await w.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)].every(Boolean);
    // ficha
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

    // Mutación génica
    const wm = d.locator('[data-w=bio_mutacion]');
    await wm.scrollIntoViewIfNeeded();
    const slm = wm.locator('input[type=range]');
    const dm = () => wm.locator('.bio13-dato').innerText();
    const vm = () => wm.locator('.bio13-veredicto').innerText();
    const mu = () => wm.locator('.bio13-mut').innerText();
    chk(cfg.nom + ': inicial: GAG→GUG, cambio de sentido, falciforme, Val', [await vm(), await mu()], r => /cambio de sentido/.test(r[0]) && /anemia falciforme/.test(r[0]) && /Met–Val–His–Leu–Thr–Pro–Val–Glu/.test(r[1]));
    await wm.locator('[data-c] [data-k=sil]').click();
    chk(cfg.nom + ': silenciosa', [await vm(), await mu()], r => /silenciosa/i.test(r[0]) && /GAA/.test(r[0]) && /Met–Val–His–Leu–Thr–Pro–Glu–Glu/.test(r[1]));
    await wm.locator('[data-c] [data-k=sin]').click();
    chk(cfg.nom + ': sin sentido: proteína de 6 aa', [await vm(), await dm(), await mu()], r => /sin sentido/i.test(r[0]) && /6 aminoácidos/.test(r[0]) && /mutante\s*6/i.test(r[1].replace(/\n/g, ' ')) && /Met–Val–His–Leu–Thr–Pro \(parada\)/.test(r[2]));
    await wm.locator('[data-c] [data-k=mar]').click();
    chk(cfg.nom + ': inserción: desplazamiento del marco, Met–Val–Ala–Pro–Asp–Ser', [await vm(), await mu(), await slm.evaluate(e => e.value)], r => /desplazamiento del marco/.test(r[0]) && /inserción/.test(r[0]) && /Met–Val–Ala–Pro–Asp–Ser \(parada\)/.test(r[1]) && r[2] === '7');
    await wm.locator('[data-c] [data-k=del]').click();
    chk(cfg.nom + ': deleción: marco, sin parada', [await vm(), await mu(), await dm()], r => /desplazamiento del marco/.test(r[0]) && /deleción/.test(r[0]) && /Met–Val–His–Leu–Leu–Leu–Arg–Ser…/.test(r[1]) && /sin parada/.test(r[2]));
    await wm.locator('[data-m] [data-k=sub]').click();
    await fijar(slm, 20);
    await wm.locator('[data-b] [data-k=A]').click();
    chk(cfg.nom + ': misma base → sin cambio', await vm(), t => /No hay cambio/.test(t));
    await wm.locator('[data-b] [data-k=G]').click();
    chk(cfg.nom + ': GAG→GGG (Gly), cambio de sentido', await vm(), t => /cambio de sentido/.test(t) && /Gly/.test(t));
    await fijar(slm, 1);
    await wm.locator('[data-b] [data-k=C]').click();
    chk(cfg.nom + ': AUG→CUG: se destruye el inicio', await vm(), t => /codón de inicio/.test(t));
    await fijar(slm, 25);
    await wm.locator('[data-b] [data-k=G]').click();
    chk(cfg.nom + ': UAA→GAA: pierde la parada', await vm(), t => /Se pierde la parada/.test(t));
    if (captura && cfg.nom !== 'escritorio') await wm.screenshot({ path: captura.replace('.png', '-mutacion-movil.png') });
    chk(cfg.nom + ': mutación sin desborde', await sinDesborde(wm), true);

    // Restricción
    const wr = d.locator('[data-w=bio_restriccion]');
    await wr.scrollIntoViewIfNeeded();
    const dr = () => wr.locator('.bio13-dato').innerText();
    const vr = () => wr.locator('.bio13-veredicto').innerText();
    chk(cfg.nom + ': EcoRI lineal: 3 fragmentos 3000, 2000, 1000', await dr(), t => /Cortes\s*2/i.test(t) && /Fragmentos\s*3/i.test(t) && /3[\s ]?000 pb · 2[\s ]?000 pb · 1[\s ]?000 pb/.test(t) && /6[\s ]?000 pb/.test(t));
    chk(cfg.nom + ': el gel dibuja 3 carriles', await wr.locator('svg rect.b13-pozo').count(), 3);
    await wr.locator('[data-f] [data-k=bam]').click();
    chk(cfg.nom + ': BamHI lineal: 3800 y 2200', await dr(), t => /Fragmentos\s*2/i.test(t) && /3[\s ]?800 pb · 2[\s ]?200 pb/.test(t));
    await wr.locator('[data-f] [data-k=eb]').click();
    chk(cfg.nom + ': EcoRI+BamHI lineal: 4 fragmentos (3000, 1200, 1000, 800)', await dr(), t => /Fragmentos\s*4/i.test(t) && /3[\s ]?000 pb · 1[\s ]?200 pb · 1[\s ]?000 pb · 800 pb/.test(t));
    await wr.locator('[data-f] [data-k=tres]').click();
    chk(cfg.nom + ': las tres lineal: 5 fragmentos, 1200 doble, 4 bandas', [await dr(), await vr()], r => /Cortes\s*4/i.test(r[0]) && /Fragmentos\s*5/i.test(r[0]) && /1[\s ]?200 pb \(×2/.test(r[0]) && /solo ves 4 bandas/.test(r[1]));
    await wr.locator('[data-t] [data-k=cir]').click();
    chk(cfg.nom + ': las tres circular: 4 fragmentos (2200, 1800, 1200, 800)', [await dr(), await vr()], r => /Fragmentos\s*4/i.test(r[0]) && /2[\s ]?200 pb · 1[\s ]?800 pb · 1[\s ]?200 pb · 800 pb/.test(r[0]) && /Todas las bandas distintas/.test(r[1]));
    await wr.locator('[data-f] [data-k=eco]').click();
    chk(cfg.nom + ': EcoRI circular: 2 fragmentos (4000 y 2000)', await dr(), t => /Fragmentos\s*2/i.test(t) && /4[\s ]?000 pb · 2[\s ]?000 pb/.test(t));
    await wr.locator('[data-f] [data-k=bam]').click();
    chk(cfg.nom + ': BamHI circular: se linealiza, 1 fragmento de 6000', [await dr(), await vr()], r => /Fragmentos\s*1/i.test(r[0]) && /6[\s ]?000 pb/.test(r[0]) && /se linealiza/.test(r[1]));
    if (captura && cfg.nom !== 'escritorio') await wr.screenshot({ path: captura.replace('.png', '-restriccion-movil.png') });
    chk(cfg.nom + ': restricción sin desborde', await sinDesborde(wr), true);

    // PCR
    const wp = d.locator('[data-w=bio_pcr]');
    await wp.scrollIntoViewIfNeeded();
    const slp = wp.locator('input[type=range]');
    const dp = () => wp.locator('.bio13-dato').innerText();
    const vp = () => wp.locator('.bio13-veredicto').innerText();
    chk(cfg.nom + ': PCR inicial: 10 ciclos → 1024 copias, 1004 exactas, 20 min', await dp(), t => /1[\s ]?024/.test(t) && /1[\s ]?004/.test(t) && /20 min/.test(t));
    await fijar(slp, 20);
    chk(cfg.nom + ': 20 ciclos → 1 048 576', await dp(), t => /1[\s ]?048[\s ]?576/.test(t) && /1[\s ]?048[\s ]?536/.test(t) && /40 min/.test(t));
    await fijar(slp, 3);
    chk(cfg.nom + ': 3 ciclos → 8 copias, 2 exactas', [await dp(), await vp()], r => /Copias de la región diana\s*8\b/i.test(r[0]) && /Del tamaño exacto\s*2\b/i.test(r[0]) && /Crecimiento exponencial/.test(r[1]));
    await fijar(slp, 2);
    chk(cfg.nom + ': 2 ciclos → 4 copias, 0 exactas, aún no hay exactas', [await dp(), await vp()], r => /Copias de la región diana\s*4\b/i.test(r[0]) && /Del tamaño exacto\s*0\b/i.test(r[0]) && /Todavía no hay/.test(r[1]));
    await fijar(slp, 0);
    chk(cfg.nom + ': 0 ciclos', await vp(), t => /Sin ciclos/.test(t));
    await fijar(slp, 10);
    await wp.locator('[data-n0] [data-k="100"]').click();
    chk(cfg.nom + ': 100 moléculas, 10 ciclos → 102 400', await dp(), t => /102[\s ]?400/.test(t));
    await wp.locator('[data-n0] [data-k="1"]').click();
    await wp.locator('[data-e] [data-k="0.9"]').click();
    chk(cfg.nom + ': eficiencia 90 %, 10 ciclos → 613 copias, sin exactas', await dp(), t => /Copias de la región diana\s*613\b/i.test(t) && /Del tamaño exacto\s*—/i.test(t));
    await wp.locator('[data-e] [data-k="1"]').click();
    await fijar(slp, 35);
    chk(cfg.nom + ': 35 ciclos → 34 359 738 368 y meseta', [await dp(), await vp()], r => /34[\s ]?359[\s ]?738[\s ]?368/.test(r[0]) && /meseta/.test(r[1]));
    if (captura && cfg.nom !== 'escritorio') await wp.screenshot({ path: captura.replace('.png', '-pcr-movil.png') });
    chk(cfg.nom + ': PCR sin desborde', await sinDesborde(wp), true);
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los widgets correctas`);
  process.exit(mal ? 1 : 0);
})();
