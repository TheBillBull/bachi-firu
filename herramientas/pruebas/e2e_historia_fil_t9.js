// Prueba pulsando de verdad: ficha «de un vistazo» del tema 9 (plegar, columnas, móvil, oscuro), el widget filo_duda
// y las actividades (ordenar, emparejar, clasificar, test), resolviéndolas con las respuestas correctas.
// Uso: node herramientas/pruebas/e2e_historia_fil_t9.js [captura.png]
const { lanzar, abrirTema } = require('./e2e_common.js');
const W = r => `[data-w][data-ref="historia_fil/t9/${r}"]`;
(async () => {
  const captura = process.argv[2];
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got)); } };
  for (const cfg of [{ nom: 'escritorio', vp: { width: 1280, height: 900 }, scheme: 'light' }, { nom: 'movil-oscuro', vp: { width: 390, height: 844 }, scheme: 'dark' }]) {
    const { b, p, errs } = await lanzar({ viewport: cfg.vp, scheme: cfg.scheme });
    await abrirTema(p, 'historia_fil', 't9');
    const d = p.locator('#detail-t9');
    const vz = d.locator('details.vz');
    chk(cfg.nom + ': ficha tras «En 1 minuto»', await d.locator('.cab + details.vz').count(), 1);
    chk(cfg.nom + ': abierta de entrada', await vz.evaluate(e => e.open), true);
    chk(cfg.nom + ': 6 bloques numerados', await vz.locator('.vz-bl').count(), 6);
    chk(cfg.nom + ': 10 palabras clave', await vz.locator('.vz-kw dt').count(), 10);
    chk(cfg.nom + ': 2 mini-tablas', await vz.locator('.vz-bl table').count(), 2);
    const cols = await vz.locator('.vz-grid').evaluate(e => getComputedStyle(e).gridTemplateColumns.split(' ').length);
    chk(cfg.nom + ': columnas (≥2 escritorio, 1 móvil)', cols, c => cfg.nom === 'escritorio' ? c >= 2 : c === 1);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se pliega', await vz.evaluate(e => e.open), false);
    await vz.locator('summary').click();
    chk(cfg.nom + ': se despliega', await vz.locator('.vz-grid').isVisible(), true);
    chk(cfg.nom + ': sin desborde horizontal (ficha)', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
    if (captura && cfg.nom === 'escritorio') { await vz.scrollIntoViewIfNeeded(); await vz.screenshot({ path: captura }); }

    // widget de la escalera de la duda
    const wd = d.locator('[data-w=filo_duda]');
    await wd.scrollIntoViewIfNeeded();
    chk(cfg.nom + ': duda: 4 escalones', await wd.locator('.chip-btn').count(), 4);
    const paso = async (txt) => { await wd.locator('.chip-btn', { hasText: txt }).click(); return wd.locator('.ft9-det').innerText(); };
    chk(cfg.nom + ': duda arranca en los sentidos', await wd.locator('.ft9-det').innerText(), t => /torre cuadrada/.test(t));
    chk(cfg.nom + ': sueño: cae la percepción, quedan las matemáticas', await paso('El sueño'), t => /Toda percepción sensible/.test(t) && /2 \+ 3 = 5/.test(t));
    chk(cfg.nom + ': genio maligno: caen las matemáticas', await paso('genio maligno'), t => /verdades matemáticas/.test(t) && /tengo que existir/.test(t));
    chk(cfg.nom + ': lo que resiste: pienso, luego existo', await paso('Lo que resiste'), t => /pienso, luego existo/.test(t) && /res cogitans/.test(t));
    chk(cfg.nom + ': duda sin desborde', await wd.evaluate(e => e.scrollWidth <= e.clientWidth + 1), true);
    if (captura && cfg.nom !== 'escritorio') { await wd.screenshot({ path: captura.replace('.png', '-duda-movil.png') }); }

    // ordenar las reglas
    const o = d.locator(W('reglas'));
    await o.scrollIntoViewIfNeeded();
    const esperado = ['Evidencia', 'Análisis', 'Síntesis', 'Enumeración'];
    for (let vuelta = 0; vuelta < 30; vuelta++) {
      const txt = (await o.locator('.or-t').allInnerTexts()).map(s => s.trim());
      const i = txt.findIndex((s, k) => !s.startsWith(esperado[k]));
      if (i < 0) break;
      const j = txt.findIndex(s => s.startsWith(esperado[i]));
      await o.locator('.or-it').nth(j).locator('.or-mv[data-d="-1"]').click();
    }
    await o.locator('[data-ok]').click();
    chk(cfg.nom + ': ordenar las reglas', await o.locator('.or-msg').innerText(), t => /✓|correcto|Perfecto/i.test(t));

    // emparejar las pruebas de Dios
    const em = d.locator(W('pruebas'));
    await em.scrollIntoViewIfNeeded();
    const pares = [['Idea de infinito', 'tanta realidad'], ['Mi imperfección', 'conservo'], ['ontológico', 'existencia es una perfección']];
    for (const [a, bb] of pares) {
      await em.locator('.em-it[data-l="a"]', { hasText: a }).click();
      await em.locator('.em-it[data-l="b"]', { hasText: bb }).click();
    }
    chk(cfg.nom + ': emparejar completado', await em.locator('.em-msg').innerText(), t => /Completado con 0 errores/.test(t));

    // clasificar sustancias e ideas
    const clasifica = async (ref, grupos, nItems) => {
      const cf = d.locator(W(ref));
      await cf.scrollIntoViewIfNeeded();
      await cf.locator('[data-ok]').click();
      chk(cfg.nom + ': ' + ref + ' incompleto avisa', await cf.locator('.or-msg').innerText(), t => new RegExp('Te faltan ' + nItems).test(t));
      for (let cat = 0; cat < grupos.length; cat++) for (const t of grupos[cat]) {
        await cf.locator('.cf-pool .cf-it', { hasText: t }).first().click();
        await cf.locator(`.cf-cat-b[data-c="${cat}"]`).click();
      }
      await cf.locator('[data-ok]').click();
      chk(cfg.nom + ': ' + ref + ' correcto', await cf.locator('.or-msg').innerText(), t => /Todo correcto/.test(t));
      chk(cfg.nom + ': ' + ref + ' 9 en verde', await cf.locator('.cf-it.ok').count(), 9);
    };
    await clasifica('sustancias', [['Dudar', 'Querer', 'Imaginar'], ['Ocupar espacio', 'Tener figura', 'Moverse'], ['Infinito', 'Perfecto', 'Garante']], 9);
    await clasifica('ideas', [['idea de Dios', 'idea de número', 'idea de infinito'], ['calor del fuego', 'ruido de un trueno', 'sabor de una naranja'], ['sirena', 'centauro', 'caballo alado']], 9);

    // test
    const qz = d.locator(W('quiz1'));
    await qz.scrollIntoViewIfNeeded();
    const ok = ['provisional', 'sentidos, sueño y genio maligno', 'tengo que existir pensando', 'cosa que piensa', 'claridad y distinción', 'facticia', 'existencia es una perfección', 'no puede ser engañador', 'la extensión', 'interacción entre alma y cuerpo'];
    for (let q = 0; q < ok.length; q++) await qz.locator(`.qz-p[data-q="${q}"] .qz-op`, { hasText: ok[q] }).click();
    chk(cfg.nom + ': test 10 de 10', await qz.locator('.qz-fin').innerText(), t => /10 de 10/.test(t));

    chk(cfg.nom + ': sin desborde horizontal (final)', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), true);
    chk(cfg.nom + ': sin errores JS', errs.length, 0);
    if (errs.length) console.log(errs.slice(0, 3));
    await b.close();
  }
  console.log(`${n - mal}/${n} comprobaciones de la ficha, el widget y las actividades correctas`);
  process.exit(mal ? 1 : 0);
})();
