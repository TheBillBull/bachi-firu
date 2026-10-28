// Pulsa los controles de los 6 simuladores nuevos de Química II · tema 9 (q2t9_*) y comprueba sus lecturas contra cifras
// calculadas aparte (herramientas/verificar_quimica2_t9.py). Uso: node herramientas/pruebas/e2e_quimica2_t9.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'quimica2', 't9');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t9 [data-w=${nm}]`).first();
  const chip = async (nm, txt) => { await W(nm).locator('.chip-btn', { hasText: txt }).first().click(); await p.waitForTimeout(60); };
  const btn = async (nm, txt) => { await W(nm).locator('button', { hasText: txt }).first().click(); await p.waitForTimeout(60); };
  const pick = async (nm, i, k) => { await W(nm).locator('select').nth(i).selectOption(k); await p.waitForTimeout(60); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(función)' : JSON.stringify(esp)); } };
  const ok = (nm, cond, info) => { chk(nm, !!cond, true); if (!cond) console.log('   ', String(info).slice(0, 400)); };
  const txt = async nm => (await W(nm).innerText()).replace(/\s+/g, ' ');
  const nombres = await p.locator('#detail-t9 [data-w]').evaluateAll(es => [...new Set(es.map(e => e.getAttribute('data-w')))]);
  const NEW = ['q2t9_prioridad', 'q2t9_nombre', 'q2t9_hibrida', 'q2t9_cistrans', 'q2t9_espejo', 'q2t9_fuerzas'];
  for (const x of NEW) ok('presente ' + x, nombres.includes(x), nombres.join());

  // ---- barrido genérico: todo chip sin errores ----
  for (const nm of NEW) {
    const w = W(nm); await w.scrollIntoViewIfNeeded();
    const nc = await w.locator('.chip-btn:not([disabled])').count();
    for (let i = 0; i < nc; i++) { try { await w.locator('.chip-btn:not([disabled])').nth(i).click({ timeout: 2000 }); } catch (e) { chk(nm + ' chip ' + i, 'no pulsable', 'ok'); } }
    chk(nm + ' sin error', await w.locator('.w-error').count(), 0);
    chk(nm + ' no vacío', (await w.innerText()).length > 40, true);
  }

  // ---- q2t9_hibrida ----
  const Hb = 'q2t9_hibrida'; await W(Hb).scrollIntoViewIfNeeded();
  const casos = [['propeno', '1 / 2 / 0', /8 σ · 1 π/], ['propadieno', '0 / 2 / 1', /6 σ · 2 π/], ['but-1-en-3-ino', '0 / 2 / 2', /7 σ · 3 π/], ['etino', '0 / 0 / 2', /3 σ · 2 π/], ['eteno', '0 / 2 / 0', /5 σ · 1 π/], ['etano', '2 / 0 / 0', /7 σ · 0 π/], ['propanal', '2 / 1 / 0', /9 σ · 1 π/], ['ácido etanoico', '1 / 1 / 0', /7 σ · 1 π/], ['etanonitrilo', '1 / 0 / 1', /5 σ · 2 π/]];
  for (const [m, esp, sp] of casos) {
    await chip(Hb, m); let t = await txt(Hb);
    ok(`hibrida ${m}: oculta la respuesta al elegir`, /Mostrar hibridación/.test(t) && !t.includes(esp), t.slice(0, 300));
    await btn(Hb, 'Mostrar hibridación'); t = await txt(Hb);
    ok(`hibrida ${m}: sp³/sp²/sp = ${esp}`, t.includes(esp), t.slice(0, 400));
    ok(`hibrida ${m}: σ y π`, sp.test(t), t.slice(0, 400));
  }
  chk('hibrida: etiquetas en el dibujo al mostrar', (await W(Hb).locator('svg text').evaluateAll(es => es.map(e => e.textContent))).filter(x => /^sp/.test(x)).length >= 2, true);
  await btn(Hb, 'Ocultar'); chk('hibrida: ocultar quita las etiquetas', (await W(Hb).locator('svg text').evaluateAll(es => es.map(e => e.textContent))).filter(x => /^sp/.test(x)).length, 0);

  // ---- q2t9_cistrans ----
  const Ct = 'q2t9_cistrans'; await W(Ct).scrollIntoViewIfNeeded();
  await chip(Ct, 'but-2-eno'); let t = await txt(Ct); ok('cistrans: but-2-eno sí, cis y trans', /sí: cada carbono/.test(t) && /cis y trans/.test(t) && /3,7 °C/.test(t), t);
  await chip(Ct, '1,1-dicloroeteno'); t = await txt(Ct); ok('cistrans: 1,1-dicloroeteno no (C2 con dos Cl)', /no: el C2 tiene dos grupos iguales \(Cl y Cl\)/.test(t), t);
  await chip(Ct, '2-metilbut-2-eno'); t = await txt(Ct); ok('cistrans: 2-metilbut-2-eno no', /no: el C2 tiene dos grupos iguales \(CH₃ y CH₃\)/.test(t), t);
  await chip(Ct, '1-bromo-2-cloroeteno'); t = await txt(Ct); ok('cistrans: 1-bromo-2-cloroeteno sí y se nombra con Z/E', /sí/.test(t) && /Z\/E/.test(t), t);
  await chip(Ct, '1,2-dicloroeteno'); t = await txt(Ct); ok('cistrans: 1,2-dicloroeteno cis 60,3 / trans 47,5', /cis y trans/.test(t) && /60,3/.test(t) && /47,5/.test(t), t);
  await chip(Ct, 'propeno'); t = await txt(Ct); ok('cistrans: propeno no', /no: el C2 tiene dos grupos iguales \(H y H\)/.test(t), t);
  await pick(Ct, 0, 'CH3'); await pick(Ct, 1, 'Cl'); await pick(Ct, 2, 'H'); await pick(Ct, 3, 'Br'); t = await txt(Ct);
  ok('cistrans: selectores → CH₃/Cl y H/Br: sí', /sí: cada carbono/.test(t), t);
  await pick(Ct, 2, 'Br'); t = await txt(Ct); ok('cistrans: CH₃/Cl y Br/Br: no (C3)', /no: el C3 tiene dos grupos iguales \(Br y Br\)/.test(t), t);
  chk('cistrans: al tocar un selector se deselecciona el preset', await W(Ct).locator('.chip-btn.on').count(), 0);
  await pick(Ct, 0, 'Cl'); await pick(Ct, 1, 'H'); await pick(Ct, 2, 'Cl'); await pick(Ct, 3, 'H'); t = await txt(Ct); ok('cistrans: Cl/H y Cl/H: sí, cis y trans', /cis y trans/.test(t), t);

  // ---- q2t9_espejo ----
  const Es = 'q2t9_espejo'; await W(Es).scrollIntoViewIfNeeded();
  await chip(Es, 'CHFClBr'); t = await txt(Es); ok('espejo: CHFClBr quiral y B no superponible', /sí \(4 grupos distintos\)/.test(t) && /no: es su enantiómero/.test(t), t);
  await btn(Es, 'Girar B'); t = await txt(Es); ok('espejo: girar B 180° no lo hace coincidir', /no: es su enantiómero/.test(t), t);
  await btn(Es, 'Intercambiar'); t = await txt(Es); ok('espejo: girar + intercambiar → coincide', /sí: es la misma molécula/.test(t), t);
  await btn(Es, 'Girar B'); t = await txt(Es); ok('espejo: solo intercambiar → coincide', /sí: es la misma molécula/.test(t), t);
  await btn(Es, 'Intercambiar'); t = await txt(Es); ok('espejo: deshacer el intercambio → no', /no: es su enantiómero/.test(t), t);
  await btn(Es, 'Girar B'); await btn(Es, 'Volver'); t = await txt(Es); ok('espejo: volver restablece', /no: es su enantiómero/.test(t) && /B \(espejo de A\)/.test(t), t);
  for (const m of ['ácido láctico', 'alanina', 'butan-2-ol']) { await chip(Es, m); t = await txt(Es); ok(`espejo: ${m} quiral`, /sí \(4 grupos distintos\)/.test(t) && /no: es su enantiómero/.test(t), t); }
  await chip(Es, 'CH₂ClBr'); t = await txt(Es); ok('espejo: CH₂ClBr no quiral y B coincide', /no \(grupos repetidos\)/.test(t) && /sí: es la misma molécula/.test(t), t);
  chk('espejo: dibujo con cuña (path) y línea discontinua', (await W(Es).locator('svg path').count() >= 1) && (await W(Es).locator('svg line[stroke-dasharray]').count() >= 2), true);

  // ---- q2t9_fuerzas ----
  const Fz = 'q2t9_fuerzas'; await W(Fz).scrollIntoViewIfNeeded();
  await chip(Fz, 'M ≈ 60'); chk('fuerzas: 6 compuestos de M ≈ 60', await W(Fz).locator('.q9-fila').count(), 6);
  await W(Fz).locator('.q9-fila', { hasText: 'propan-1-ol' }).click(); t = await txt(Fz);
  ok('fuerzas: propan-1-ol 60,1 g/mol, puentes de H, 97,2 °C', /60,1 g\/mol/.test(t) && /puentes de hidrógeno/.test(t) && /97,2 °C/.test(t), t);
  await W(Fz).locator('.q9-fila', { hasText: 'butano' }).click(); t = await txt(Fz); ok('fuerzas: butano 58,1 g/mol, London, −0,5 °C', /58,1 g\/mol/.test(t) && /London/.test(t) && /−?0,5 °C/.test(t), t);
  await W(Fz).locator('.q9-fila', { hasText: 'propanona' }).click(); t = await txt(Fz); ok('fuerzas: propanona dipolo–dipolo, 56,1', /dipolo–dipolo/.test(t) && /56,1 °C/.test(t), t);
  const ancho = await W(Fz).locator('.q9-fila').evaluateAll(es => es.map(e => parseFloat(e.querySelector('.q9-pista').style.width)));
  ok('fuerzas: la barra crece con la Teb (orden de la tabla)', ancho.every((x, i) => i === 0 || x >= ancho[i - 1]), ancho.join());
  await chip(Fz, 'Ramificación'); chk('fuerzas: ramificación: 3 isómeros', await W(Fz).locator('.q9-fila').count(), 3);
  await chip(Fz, 'Alcohol frente'); t = await txt(Fz); ok('fuerzas: dimetil éter −24,8 °C', /dimetil éter/.test(t) && /−24,8 °C/.test(t), t);
  await W(Fz).locator('.q9-fila', { hasText: 'etanol' }).click(); t = await txt(Fz); ok('fuerzas: etanol 46,1 g/mol, 78,4 °C', /46,1 g\/mol/.test(t) && /78,4 °C/.test(t), t);

  // ---- q2t9_prioridad y q2t9_nombre: se comprueba la corrección del propio juego contra el banco ----
  const bancoOk = await p.evaluate(() => BACHI.lab.q9.MOLS.map(m => ({ n: m.n, g0: m.g[0], gs: m.g })));
  for (const [nm, modo] of [['q2t9_prioridad', 'prio'], ['q2t9_nombre', 'nom']]) {
    await W(nm).scrollIntoViewIfNeeded();
    let aciertos = 0, fallosJ = 0;
    for (let r = 0; r < 14; r++) {
      const ops = W(nm).locator('.q7-op'); const k = await ops.count();
      const i = r % k; const elegido = (await ops.nth(i).innerText()).trim();
      await ops.nth(i).click(); await p.waitForTimeout(40);
      const res = (await W(nm).locator('.q7-res').innerText()).replace(/\s+/g, ' ');
      const nombre = (/Es (.+?)(?::|\. Llevas)/.exec(res) || [])[1];
      const mol = bancoOk.find(m => m.n === nombre);
      const esperado = modo === 'prio' ? mol && mol.g0 === elegido : mol && mol.n === elegido;
      const dijoOk = /Correcto/.test(res);
      if (!mol || dijoOk !== !!esperado) { fallosJ++; console.log('  juego', nm, 'ronda', r, JSON.stringify([elegido, res.slice(0, 120)])); }
      if (dijoOk) aciertos++;
      chk(`${nm} ronda ${r}: se marca la correcta`, await W(nm).locator('.q7-op.bien').count(), 1);
      await btn(nm, 'Siguiente');
    }
    chk(nm + ': el juego corrige bien', fallosJ, 0);
    ok(nm + ': ni todo acierto ni todo fallo (se barajan las opciones)', aciertos > 0 && aciertos < 14, aciertos);
  }
  await W('q2t9_prioridad').scrollIntoViewIfNeeded();
  await W('q2t9_prioridad').locator('.q7-op').first().click();
  chk('prioridad: tras responder, la escala marca el grupo que manda', await W('q2t9_prioridad').locator('.q9-esc .mand').count(), 1);

  const dist = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  chk('sin desborde horizontal', dist <= 1, true);
  chk('sin errores JS', errs.join(' | '), '');
  console.log(mal ? `x ${mal} fallos de ${n}` : `ok ${n} comprobaciones, todo bien`);
  await b.close(); process.exit(mal ? 1 : 0);
})();
