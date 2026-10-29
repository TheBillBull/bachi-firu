// Prueba pulsando de verdad: ficha «de un vistazo» del tema 14 (plegar, móvil, oscuro) y los controles del tema:
// clasificar (apolíneo/dionisíaco y señores/esclavos), orden (metamorfosis y cronología) y emparejar (obras).
// Uso: node herramientas/pruebas/e2e_historia_fil_t14.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'historia_fil', 't14');
    const d = p.locator('#detail-t14');
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

    // clasificar: pulsa cada elemento y su categoría según los datos; debe salir «Todo correcto»
    const cls = d.locator('[data-w=clasificar]');
    chk(cfg.nom + ': 2 controles «clasificar»', await cls.count(), 2);
    for (let k = 0; k < 2; k++) {
      const wc = cls.nth(k);
      await wc.scrollIntoViewIfNeeded();
      const ref = await wc.getAttribute('data-ref');
      const dat = await p.evaluate(r => { const o = BACHI.ampl.historia_fil.t14.datos[r.split('/').pop()]; return { cats: o.categorias, items: o.items }; }, ref);
      // sin clasificar nada, «Comprobar» avisa
      await wc.locator('[data-ok]').click();
      chk(cfg.nom + ': clasificar ' + k + ' avisa si faltan', await wc.locator('.or-msg').innerText(), t => /Te faltan 10/.test(t));
      for (const it of dat.items) {
        await wc.locator('.cf-pool .cf-it', { hasText: it.t }).first().click();
        await wc.locator('.cf-cat-b').nth(it.c).click();
      }
      await wc.locator('[data-ok]').click();
      chk(cfg.nom + ': clasificar ' + k + ' todo correcto', await wc.locator('.or-msg').innerText(), t => /Todo correcto/.test(t));
      chk(cfg.nom + ': clasificar ' + k + ' sin desborde', await wc.evaluate(e => e.scrollWidth <= e.clientWidth + 1), true);
    }
    // un fallo a propósito: coloca mal un elemento y comprueba que lo marca
    const w0 = cls.nth(0);
    await w0.locator('[data-rei]').click();
    for (const it of (await p.evaluate(() => BACHI.ampl.historia_fil.t14.datos.apodio.items))) {
      await w0.locator('.cf-pool .cf-it', { hasText: it.t }).first().click();
      await w0.locator('.cf-cat-b').nth(it.t === 'Escultura' ? 1 : it.c).click();
    }
    await w0.locator('[data-ok]').click();
    chk(cfg.nom + ': clasificar detecta el fallo (9 de 10)', await w0.locator('.or-msg').innerText(), t => /9 de 10/.test(t));

    // orden: ordena con los botones ↑ y comprueba el mensaje
    const ords = d.locator('[data-w=orden]');
    chk(cfg.nom + ': 2 controles «orden»', await ords.count(), 2);
    for (let k = 0; k < 2; k++) {
      const wo = ords.nth(k);
      await wo.scrollIntoViewIfNeeded();
      const nit = await wo.locator('.or-it').count();
      for (let i = 1; i < nit; i++) {
        for (let j = i; j > 0; j--) {
          const ks = await wo.locator('.or-it').evaluateAll(l => l.map(x => +x.getAttribute('data-k')));
          if (ks[j] > ks[j - 1]) break;
          await wo.locator('.or-it').nth(j).locator('.or-mv[data-d="-1"]').click();
        }
      }
      await wo.locator('[data-ok]').click();
      chk(cfg.nom + ': orden ' + k + ' correcto', await wo.locator('.or-msg').innerText(), t => /Orden perfecto/.test(t));
      chk(cfg.nom + ': orden ' + k + ' sin desborde', await wo.evaluate(e => e.scrollWidth <= e.clientWidth + 1), true);
    }

    // emparejar: une cada obra con su idea
    const we = d.locator('[data-w=emparejar]').first();
    await we.scrollIntoViewIfNeeded();
    const pares = await p.evaluate(() => BACHI.ampl.historia_fil.t14.datos.obras.pares);
    chk(cfg.nom + ': emparejar con 10 botones', await we.locator('.em-it').count(), 10);
    // primero un error a propósito
    await we.locator('.em-it[data-l=a]', { hasText: pares[0][0] }).click();
    await we.locator('.em-it[data-l=b]', { hasText: pares[1][1] }).click();
    chk(cfg.nom + ': emparejar cuenta el error', await we.locator('.em-msg').innerText(), t => /0 de 5/.test(t));
    for (const [a, c] of pares) {
      await we.locator('.em-it[data-l=a]', { hasText: a }).click();
      await we.locator('.em-it[data-l=b]', { hasText: c }).click();
    }
    chk(cfg.nom + ': emparejar completado', await we.locator('.em-msg').innerText(), t => /Completado/.test(t));
    chk(cfg.nom + ': controles sin desborde', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
    if (captura && cfg.nom !== 'escritorio') { await cls.nth(1).screenshot({ path: captura.replace('.png', '-clasificar-movil.png') }); }
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los controles correctas`);
  process.exit(mal ? 1 : 0);
})();
