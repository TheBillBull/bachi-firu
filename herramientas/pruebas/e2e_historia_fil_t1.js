// Prueba pulsando de verdad: ficha «de un vistazo» (plegar, móvil, oscuro, impresión) y el widget filo_parmenides.
// Uso: node herramientas/pruebas/e2e_historia_fil_t1.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'historia_fil', 't1');
    const d = p.locator('#detail-t1');
    const vz = d.locator('details.vz');
    chk(cfg.nom + ': hay una ficha', await vz.count(), 1);
    chk(cfg.nom + ': ficha tras «En 1 minuto»', await d.locator('.cab + details.vz').count(), 1);
    chk(cfg.nom + ': abierta de entrada', await vz.evaluate(e => e.open), true);
    chk(cfg.nom + ': 6 bloques numerados', await vz.locator('.vz-bl').count(), 6);
    chk(cfg.nom + ': 10 palabras clave', await vz.locator('.vz-kw dt').count(), 10);
    const cols = await vz.locator('.vz-grid').evaluate(e => getComputedStyle(e).gridTemplateColumns.split(' ').length);
    chk(cfg.nom + ': columnas (3 escritorio, 1 móvil)', cols, cfg.nom === 'escritorio' ? 3 : 1);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se pliega', await vz.evaluate(e => e.open), false);
    chk(cfg.nom + ': plegada oculta el cuerpo', await vz.locator('.vz-grid').isVisible(), false);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se despliega', await vz.locator('.vz-grid').isVisible(), true);
    chk(cfg.nom + ': sin desborde horizontal', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
    const bg = await vz.evaluate(e => getComputedStyle(e).backgroundColor);
    chk(cfg.nom + ': fondo según tema', bg, cfg.scheme === 'dark' ? 'rgb(24, 27, 54)' : 'rgb(255, 255, 255)');
    if (captura) {
      await vz.scrollIntoViewIfNeeded();
      await vz.screenshot({ path: cfg.nom === 'escritorio' ? captura : captura.replace('.png', '-movil.png') });
    }
    // widget de Parménides
    const wd = d.locator('[data-w=filo_parmenides]');
    await wd.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': parménides arranca en paso 1', (await wd.locator('.cnt').innerText()), 'Paso 1 de 6');
    await wd.locator('[data-sig]').click(); await wd.locator('[data-sig]').click();
    chk(cfg.nom + ': siguiente avanza a 3', (await wd.locator('.cnt').innerText()), 'Paso 3 de 6');
    chk(cfg.nom + ': 3 pasos visibles', await wd.locator('.ft1-p.vis').count(), 3);
    await wd.locator('[data-ant]').click();
    chk(cfg.nom + ': anterior vuelve a 2', (await wd.locator('.cnt').innerText()), 'Paso 2 de 6');
    await wd.locator('.chip-btn', { hasText: 'atomista' }).click();
    chk(cfg.nom + ': vista atomista marca el paso 2 como ruptura', await wd.locator('.ft1-p.rompe').count(), 1);
    for (let i = 0; i < 6; i++) await wd.locator('[data-sig]').click();
    chk(cfg.nom + ': tope en 6', (await wd.locator('.cnt').innerText()), 'Paso 6 de 6');
    chk(cfg.nom + ': atomista rompe pasos 2 y 5', await wd.locator('.ft1-p.rompe').count(), 2);
    chk(cfg.nom + ': conclusión atomista', await wd.locator('.ft1-p').last().innerText(), t => /átomos/.test(t));
    chk(cfg.nom + ': widget sin desborde', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
    if (cfg.nom === 'escritorio') {
      // impresión: la ficha sola, 3 columnas; se despliega aunque estuviera plegada
      await vz.locator('summary').click();      // plegada
      await p.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
      chk('impresión: beforeprint despliega la ficha', await vz.evaluate(e => e.open), true);
      await p.evaluate(() => window.dispatchEvent(new Event('afterprint')));
      chk('impresión: afterprint restaura (plegada)', await vz.evaluate(e => e.open), false);
      await vz.locator('summary').click();
      // botón real: window.print se intercepta (lanza) para que la página quede en modo «solo ficha» y medirla
      await p.evaluate(() => { window.__printOrig = window.print; window.print = () => { throw new Error('stop'); }; });
      await vz.locator('[data-vz-print]').click().catch(() => {});
      await p.waitForTimeout(200);
      for (let i = errs.length - 1; i >= 0; i--) if (String(errs[i]).includes('stop')) errs.splice(i, 1);  // el lanzamiento provocado
      await p.emulateMedia({ media: 'print' });
      chk('impresión: resto de la página fuera (display:none, no ocupa hojas)', await p.locator('.topbar').first().evaluate(e => getComputedStyle(e).display), 'none');
      chk('impresión: ficha visible', await vz.locator('.vz-grid').evaluate(e => getComputedStyle(e).display !== 'none'), true);
      chk('impresión: 3 columnas', await vz.locator('.vz-grid').evaluate(e => getComputedStyle(e).gridTemplateColumns.split(' ').length), 3);
      chk('impresión: botón de imprimir oculto', await vz.locator('.vz-pie').evaluate(e => getComputedStyle(e).display), 'none');
      const pdf = await p.pdf({ format: 'A4', printBackground: true });
      const hojas = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
      chk('impresión: la ficha cabe en 1 hoja (sin hojas en blanco), hojas=' + hojas, hojas, 1);
      await p.emulateMedia({ media: 'screen' });
      await p.evaluate(() => { window.print = window.__printOrig; window.dispatchEvent(new Event('afterprint')); });
      chk('impresión: tras imprimir la página vuelve a la normalidad', await p.evaluate(() => !document.querySelector('.vz-fuera') && !document.body.classList.contains('vz-solo')), true);
    }
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y del widget correctas`);
  process.exit(mal ? 1 : 0);
})();
