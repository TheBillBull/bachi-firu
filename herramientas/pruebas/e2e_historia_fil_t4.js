// Prueba pulsando de verdad: ficha «de un vistazo» del tema 4 (plegar, móvil, oscuro) y los widgets filo_causas y filo_medio.
// Uso: node herramientas/pruebas/e2e_historia_fil_t4.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'historia_fil', 't4');
    const d = p.locator('#detail-t4');
    const vz = d.locator('details.vz');
    chk(cfg.nom + ': hay una ficha', await vz.count(), 1);
    chk(cfg.nom + ': ficha tras «En 1 minuto»', await d.locator('.cab + details.vz').count(), 1);
    chk(cfg.nom + ': abierta de entrada', await vz.evaluate(e => e.open), true);
    chk(cfg.nom + ': 6 bloques numerados', await vz.locator('.vz-bl').count(), 6);
    chk(cfg.nom + ': 10 palabras clave', await vz.locator('.vz-kw dt').count(), 10);
    chk(cfg.nom + ': 2 mini-tablas', await vz.locator('.vz-bl table').count(), 2);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se pliega', await vz.evaluate(e => e.open), false);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se despliega', await vz.locator('.vz-grid').isVisible(), true);
    chk(cfg.nom + ': ficha sin desborde horizontal', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
    if (captura && cfg.nom === 'escritorio') { await vz.scrollIntoViewIfNeeded(); await vz.screenshot({ path: captura }); }

    // widget de las cuatro causas
    const wc = d.locator('[data-w=filo_causas]');
    await wc.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': causas: 4 objetos', await wc.locator('.chip-btn').count(), 4);
    chk(cfg.nom + ': causas: 4 cuadros y la final resaltada', [await wc.locator('.ft4-c').count(), await wc.locator('.ft4-c.f b').innerText()], r => r[0] === 4 && r[1].toLowerCase() === 'final');
    const causasDe = async (txt) => { await wc.locator('.chip-btn', { hasText: txt }).click(); return wc.locator('.ft4-grid').innerText(); };
    chk(cfg.nom + ': estatua → mármol y escultor', await causasDe('Estatua'), t => /Mármol/.test(t) && /escultor/.test(t));
    chk(cfg.nom + ': mesa → madera y carpintero', await causasDe('Mesa'), t => /Madera/.test(t) && /carpintero/.test(t));
    chk(cfg.nom + ': roble → llegar a roble adulto', await causasDe('Roble'), t => /roble adulto/.test(t));
    chk(cfg.nom + ': roble: potencia y acto', await wc.locator('.ft4-pa').innerText(), t => /bellota/.test(t) && /potencia/.test(t));
    chk(cfg.nom + ': gato → vivir como gato', await causasDe('Gato'), t => /gato/i.test(t) && /padres/.test(t));
    chk(cfg.nom + ': causas sin desborde', await wc.evaluate(e => e.scrollWidth <= e.clientWidth + 1), true);
    if (captura && cfg.nom !== 'escritorio') { await wc.screenshot({ path: captura.replace('.png', '-causas-movil.png') }); }

    // widget del término medio
    const wm = d.locator('[data-w=filo_medio]');
    await wm.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': medio: 5 virtudes', await wm.locator('.chip-btn').count(), 5);
    chk(cfg.nom + ': medio arranca en valentía', await wm.locator('.ft4-b.m').innerText(), t => /Valentía/.test(t));
    const trio = async (txt) => { await wm.locator('.chip-btn', { hasText: txt }).click(); return wm.locator('.ft4-b').allInnerTexts(); };
    chk(cfg.nom + ': valentía: cobardía–temeridad', await trio('Valentía'), r => /Cobardía/.test(r[0]) && /Valentía/.test(r[1]) && /Temeridad/.test(r[2]));
    chk(cfg.nom + ': generosidad: avaricia–derroche', await trio('Generosidad'), r => /Avaricia/.test(r[0]) && /Derroche/.test(r[2]));
    chk(cfg.nom + ': templanza: insensibilidad–desenfreno', await trio('Templanza'), r => /Insensibilidad/.test(r[0]) && /Desenfreno/.test(r[2]));
    chk(cfg.nom + ': veracidad: jactancia', await trio('Veracidad'), r => /Jactancia/.test(r[2]));
    chk(cfg.nom + ': amabilidad: adulación', await trio('Amabilidad'), r => /Adulación/.test(r[2]));
    chk(cfg.nom + ': medio sin desborde', [await wm.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r[0] && r[1]);
    if (captura && cfg.nom !== 'escritorio') { await wm.screenshot({ path: captura.replace('.png', '-medio-movil.png') }); }
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los widgets correctas`);
  process.exit(mal ? 1 : 0);
})();
