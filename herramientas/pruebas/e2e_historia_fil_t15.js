// Prueba pulsando de verdad: ficha «de un vistazo» del tema 15 (plegar, móvil, oscuro) y los controles del tema (clasificar, emparejar, orden).
// Uso: node herramientas/pruebas/e2e_historia_fil_t15.js
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'historia_fil', 't15');
    const d = p.locator('#detail-t15');
    const vz = d.locator('details.vz');
    chk(cfg.nom + ': hay una ficha', await vz.count(), 1);
    chk(cfg.nom + ': ficha tras «En 1 minuto»', await d.locator('.cab + details.vz').count(), 1);
    chk(cfg.nom + ': abierta de entrada', await vz.evaluate(e => e.open), true);
    chk(cfg.nom + ': 6 bloques numerados', await vz.locator('.vz-bl').count(), 6);
    chk(cfg.nom + ': 10 palabras clave', await vz.locator('.vz-kw dt').count(), 10);
    chk(cfg.nom + ': 3 mini-tablas', await vz.locator('.vz-bl table').count(), 3);
    chk(cfg.nom + ': la ficha cita a los cinco autores', await vz.innerText(), t => /Husserl/.test(t) && /Heidegger/.test(t) && /Sartre/.test(t) && /1913/.test(t) && /mala fe/i.test(t));
    await vz.locator('summary').click();
    chk(cfg.nom + ': se pliega', await vz.evaluate(e => e.open), false);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se despliega', await vz.locator('.vz-grid').isVisible(), true);
    chk(cfg.nom + ': ficha sin desborde horizontal', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);

    // controles genéricos del tema: clasificar (x2), orden, emparejar
    const ESENCIA = { 'Un cortapapeles': 0, 'Un reloj de pulsera': 0, 'Una mesa hecha por un carpintero': 0, 'Un cuchillo de cocina': 0, 'Una persona cualquiera': 1, 'Alguien que se vuelve valiente con sus actos': 1, 'Tú, que te defines por lo que eliges': 1, 'Un ser humano arrojado al mundo': 1 };
    const MALAFE = { '«Yo soy así, no puedo cambiar»': 0, '«No tenía otra opción»': 0, '«Es mi destino»': 0, 'El camarero que cree ser «solo» camarero': 0, '«Lo he decidido yo y me hago responsable»': 1, 'Reconocer que podría haber elegido otra cosa': 1, 'Asumir las consecuencias de mis actos sin excusas': 1, 'Aceptar la angustia de tener que elegir': 1 };
    const wcs = d.locator('[data-w=clasificar]');
    chk(cfg.nom + ': hay 2 controles «clasificar»', await wcs.count(), 2);
    for (const [i, mapa] of [[0, ESENCIA], [1, MALAFE]]) {
      const w = wcs.nth(i);
      await w.scrollIntoViewIfNeeded();
      chk(cfg.nom + ': clasificar ' + i + ' tiene 8 elementos', await w.locator('.cf-pool .cf-it').count(), 8);
      // primero un error a propósito: el control debe avisar y no darlo por bueno
      const [primero, cat0] = Object.entries(mapa)[0];
      await w.locator('.cf-pool .cf-it', { hasText: primero }).first().click();
      await w.locator('.cf-cat-b').nth(1 - cat0).click();
      await w.locator('[data-ok]').click();
      chk(cfg.nom + ': clasificar ' + i + ' no da por buena una clasificación errónea', await w.locator('.or-msg').innerText(), t => !/Todo correcto/.test(t));
      // toca el elemento mal colocado (marcado en rojo) y llévalo a su categoría
      await w.locator('.cf-it', { hasText: primero }).first().click();
      await w.locator('.cf-cat-b').nth(cat0).click();
      for (const [txt, cat] of Object.entries(mapa)) {
        const it = w.locator('.cf-pool .cf-it', { hasText: txt });
        if (await it.count()) { await it.first().click(); await w.locator('.cf-cat-b').nth(cat).click(); }
      }
      await w.locator('[data-ok]').click();
      chk(cfg.nom + ': clasificar ' + i + ', pool vacío', await w.locator('.cf-pool .cf-it').count(), 0);
      chk(cfg.nom + ': clasificar ' + i + ', «¡Todo correcto!»', await w.locator('.or-msg').innerText(), t => /Todo correcto/.test(t));
    }
    const wo = d.locator('[data-w=orden]');
    await wo.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': orden con 6 autores', await wo.locator('li, .or-it').count(), c => c >= 6);
    const we = d.locator('[data-w=emparejar]').first();
    await we.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': emparejar con 10 botones', await we.locator('button').count(), c => c >= 10);
    const PARES = [['Investigaciones lógicas', 'Husserl'], ['Ser y tiempo', 'Heidegger'], ['El ser y la nada', 'Sartre'], ['El segundo sexo', 'Beauvoir'], ['El mito de Sísifo', 'Camus']];
    for (const [a, b2] of PARES) {
      await we.locator('.em-it[data-l=a]', { hasText: a }).click();
      await we.locator('.em-it[data-l=b]', { hasText: b2 }).click();
    }
    chk(cfg.nom + ': emparejar, completado sin errores', await we.locator('.em-msg').innerText(), t => /Completado con 0 errores/.test(t));
    chk(cfg.nom + ': controles sin desborde', [await wcs.nth(0).evaluate(e => e.scrollWidth <= e.clientWidth + 1), await we.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r.every(Boolean));
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los controles correctas`);
  process.exit(mal ? 1 : 0);
})();
