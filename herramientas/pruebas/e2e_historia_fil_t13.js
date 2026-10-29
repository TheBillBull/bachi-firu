// Prueba pulsando de verdad: ficha «de un vistazo» del tema 13 (plegar, móvil, oscuro) y los controles del tema (clasificar, emparejar, orden).
// Uso: node herramientas/pruebas/e2e_historia_fil_t13.js
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'historia_fil', 't13');
    const d = p.locator('#detail-t13');
    const vz = d.locator('details.vz');
    chk(cfg.nom + ': hay una ficha', await vz.count(), 1);
    chk(cfg.nom + ': ficha tras «En 1 minuto»', await d.locator('.cab + details.vz').count(), 1);
    chk(cfg.nom + ': abierta de entrada', await vz.evaluate(e => e.open), true);
    chk(cfg.nom + ': 6 bloques numerados', await vz.locator('.vz-bl').count(), 6);
    chk(cfg.nom + ': 10 palabras clave', await vz.locator('.vz-kw dt').count(), 10);
    chk(cfg.nom + ': 3 mini-tablas', await vz.locator('.vz-bl table').count(), 3);
    chk(cfg.nom + ': la ficha cita a Marx', await vz.innerText(), t => /Marx/.test(t) && /1818/.test(t) && /plusvalía/i.test(t));
    await vz.locator('summary').click();
    chk(cfg.nom + ': se pliega', await vz.evaluate(e => e.open), false);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se despliega', await vz.locator('.vz-grid').isVisible(), true);
    chk(cfg.nom + ': ficha sin desborde horizontal', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);

    // controles genéricos del tema: clasificar, orden, emparejar
    for (const nombre of ['clasificar', 'orden', 'emparejar']) {
      const ws = d.locator('[data-w=' + nombre + ']');
      chk(cfg.nom + ': hay controles «' + nombre + '»', await ws.count(), c => c >= (nombre === 'emparejar' ? 1 : 2));
    }
    // clasificar: toca la palabra y su categoría; el control debe responder
    const wc = d.locator('[data-w=clasificar]').first();
    await wc.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': clasificar tiene botones', await wc.locator('button').count(), c => c >= 10);
    const wq = d.locator('[data-w=clasificar]').nth(1);
    await wq.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': clasificar de 3 categorías', await wq.locator('button').count(), c => c >= 9);
    const we = d.locator('[data-w=emparejar]').first();
    await we.scrollIntoViewIfNeeded();
    const bs = we.locator('button');
    chk(cfg.nom + ': emparejar con 8 botones', await bs.count(), c => c >= 8);
    // pulsa de verdad: clasifica todo en los dos clasificar y empareja los cuatro aspectos de la alienación
    const INFRA = { 'Una fábrica con sus máquinas': 0, 'La Constitución del país': 1, 'El contrato de trabajo asalariado': 0, 'La religión dominante': 1, 'Quién posee la tierra': 0, 'La moral de la época': 1, 'Los conocimientos técnicos para producir': 0, 'La ley que protege la propiedad privada': 1, 'El sistema educativo y sus ideas': 1, 'La fuerza de trabajo de los obreros': 0 };
    const QUIEN = { 'La historia es el despliegue del Espíritu': 0, 'El Estado representa el interés universal': 0, 'Su dialéctica es idealista': 0, 'Dios es una proyección de la esencia humana': 1, 'Su materialismo es contemplativo': 1, 'Su «hombre» es un individuo abstracto': 1, 'El ser social determina la conciencia': 2, 'De lo que se trata es de transformar el mundo': 2, 'La historia se explica por el modo de producción': 2 };
    for (const [w, mapa] of [[wc, QUIEN], [wq, INFRA]]) {
      await w.scrollIntoViewIfNeeded();
      for (const [txt, cat] of Object.entries(mapa)) {
        await w.locator('.cf-pool .cf-it', { hasText: txt }).first().click();
        await w.locator('.cf-cat-b').nth(cat).click();
      }
      chk(cfg.nom + ': clasificar, pool vacío tras pulsar todo', await w.locator('.cf-pool .cf-it').count(), 0);
      await w.locator('[data-ok]').click();
      chk(cfg.nom + ': clasificar, «¡Todo correcto!»', await w.locator('.or-msg').innerText(), t => /Todo correcto/.test(t));
    }
    const PARES = [['Respecto al producto', 'Lo que fabrica no le pertenece'], ['Respecto a la actividad', 'El trabajo es forzado: solo un medio para sobrevivir'], ['Respecto al ser genérico', 'Pierde su capacidad de trabajar libre y creativamente'], ['Respecto a los otros', 'Los trabajadores compiten y se enfrentan a quien los emplea']];
    await we.scrollIntoViewIfNeeded();
    for (const [a, b2] of PARES) {
      await we.locator('.em-it[data-l=a]', { hasText: a }).click();
      await we.locator('.em-it[data-l=b]', { hasText: b2 }).click();
    }
    chk(cfg.nom + ': emparejar, completado sin errores', await we.locator('.em-msg').innerText(), t => /Completado con 0 errores/.test(t));
    chk(cfg.nom + ': controles sin desborde', [await wc.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await we.evaluate(e => e.scrollWidth <= e.clientWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)], r => r.every(Boolean));
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha y de los controles correctas`);
  process.exit(mal ? 1 : 0);
})();
