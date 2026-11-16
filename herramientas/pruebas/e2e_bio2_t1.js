// Prueba pulsando de verdad: ficha «de un vistazo» del tema 1 de Biología II (plegar, móvil oscuro) y los widgets bio_osmosis y bio_ph.
// Uso: node herramientas/pruebas/e2e_bio2_t1.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  const fijar = async (loc, v) => { await loc.evaluate((e, x) => { e.value = x; e.dispatchEvent(new Event('input', { bubbles: true })); }, String(v)); };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'bio2', 't1');
    const d = p.locator('#detail-t1');
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

    // ósmosis
    const wo = d.locator('[data-w=bio_osmosis]');
    await wo.scrollIntoViewIfNeeded();
    const sl = wo.locator('input[type=range]');
    const veredicto = () => wo.locator('.bio1-veredicto').innerText();
    const datos = () => wo.locator('.bio1-dato').innerText();
    chk(cfg.nom + ': ósmosis arranca isotónica', await veredicto(), t => /isotónico/.test(t) && /conserva/.test(t));
    chk(cfg.nom + ': 308 mOsm/L a 0,9 %', await datos(), t => /308 mOsm/.test(t));
    await fijar(sl, 0);
    chk(cfg.nom + ': agua destilada → hemólisis', await veredicto(), t => /Hemólisis/.test(t));
    await fijar(sl, 0.6);
    chk(cfg.nom + ': 0,6 % → hinchado', await veredicto(), t => /hipotónico/.test(t) && /hincha/.test(t));
    await fijar(sl, 3);
    chk(cfg.nom + ': 3 % → crenación y 1027 mOsm/L', [await veredicto(), await datos()], r => /Crenación/.test(r[0]) && /1027 mOsm/.test(r[1]));
    chk(cfg.nom + ': 3 % → polígono de crenación', await wo.locator('svg polygon').count(), 1);
    if (captura && cfg.nom !== 'escritorio') await wo.screenshot({ path: captura.replace('.png', '-osmosis-movil.png') });
    await wo.locator('.chip-btn', { hasText: 'vegetal' }).click();
    chk(cfg.nom + ': vegetal a 3 % → plasmólisis', await veredicto(), t => /Plasmólisis/.test(t));
    await fijar(sl, 0);
    chk(cfg.nom + ': vegetal en agua → turgencia', await veredicto(), t => /Turgencia/.test(t));
    await fijar(sl, 0.9);
    chk(cfg.nom + ': vegetal isotónica → flácida', await veredicto(), t => /flácida/.test(t));
    chk(cfg.nom + ': ósmosis sin desborde', [await wo.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r[0] && r[1]);

    // pH y tampón
    const wp = d.locator('[data-w=bio_ph]');
    await wp.scrollIntoViewIfNeeded();
    const sls = wp.locator('input[type=range]');
    chk(cfg.nom + ': pH: dos deslizadores', await sls.count(), 2);
    chk(cfg.nom + ': pH 7,4 → [H⁺] 3,98·10⁻⁸', await wp.locator('[data-a]').innerText(), t => /3,98 · 10⁻⁸/.test(t) && /sangre/.test(t));
    await fijar(sls.nth(0), 3);
    chk(cfg.nom + ': pH 3 → [H⁺] 1,00·10⁻³ ácido', await wp.locator('[data-a]').innerText(), t => /1,00 · 10⁻³/.test(t) && /ácido/.test(t));
    await fijar(sls.nth(0), 7);
    chk(cfg.nom + ': pH 7 → neutro, agua pura', await wp.locator('[data-a]').innerText(), t => /neutro/.test(t) && /agua pura/.test(t));
    await fijar(sls.nth(1), 2);
    chk(cfg.nom + ': +2 mmol/L: sangre 7,36', await wp.locator('[data-b]').innerText(), t => /7,36/.test(t) && /2,7/.test(t));
    await fijar(sls.nth(1), 0.1);
    chk(cfg.nom + ': +0,1 mmol/L: agua pH 4,00', await wp.locator('[data-b]').innerText(), t => /4,00/.test(t) && /7,40/.test(t));
    chk(cfg.nom + ': pH sin desborde', [await wp.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') await wp.screenshot({ path: captura.replace('.png', '-ph-movil.png') });
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los widgets correctas`);
  process.exit(mal ? 1 : 0);
})();
