// Pulsa los controles de TODOS los widgets de Química II · tema 5 y comprueba las lecturas de los 5 nuevos (q5_*).
// Uso: node herramientas/pruebas/e2e_quimica2_t5.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'quimica2', 't5');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t5 [data-w=${nm}]`).first();
  const chip = async (nm, txt) => { await W(nm).locator('.chip-btn', { hasText: txt }).first().click(); await p.waitForTimeout(80); };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(80); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? 'cond' : JSON.stringify(esp)); } };
  const ok = (nm, cond, info) => { chk(nm, !!cond, true); if (!cond) console.log('   ', String(info).slice(0, 260)); };
  const txt = nm => W(nm).innerText();

  // ---- barrido genérico ----
  const nombres = await p.locator('#detail-t5 [data-w]').evaluateAll(es => [...new Set(es.map(e => e.getAttribute('data-w')))]);
  for (const x of ['q5_curvas', 'q5_tabla', 'q5_maxwell', 'q5_arrhenius', 'q5_mecanismo', 'q6_diagrama']) chk('presente ' + x, nombres.includes(x), true);
  for (const nm of nombres.filter(x => !/^(quiz|tarjetas|emparejar|clasificar|orden|q5_tabla)$/.test(x))) {
    const w = W(nm); await w.scrollIntoViewIfNeeded();
    const nc = await w.locator('.chip-btn:not([disabled])').count();
    for (let i = 0; i < nc; i++) { try { await w.locator('.chip-btn:not([disabled])').nth(i).click({ timeout: 2000 }); } catch (e) { chk(nm + ' chip ' + i + ' pulsable', e.message.slice(0, 60), 'ok'); } }
    const nr = await w.locator('input[type=range]').count();
    for (let i = 0; i < nr; i++) for (const f of [0, 1, 0.5]) await w.locator('input[type=range]').nth(i).evaluate((e, f) => { e.value = +e.min + f * (+e.max - +e.min); e.dispatchEvent(new Event('input', { bubbles: true })); }, f);
    await p.waitForTimeout(60);
    chk(nm + ' sin error tras pulsar todo', await w.locator('.w-error').count(), 0);
    chk(nm + ' no vacío', (await w.innerText()).length > 40, true);
  }

  // ---- q5_curvas: k = 0,1; t1 = 2; t2 = 8; orden 1 en N2O5 (a = 2) ----
  const C = 'q5_curvas';
  await W(C).scrollIntoViewIfNeeded();
  await chip(C, '2 N₂O₅'); await chip(C, 'orden 1');
  await range(C, 0, 0.1); await range(C, 1, 2); await range(C, 2, 8);
  let t = await txt(C);
  ok('curvas: v instantánea en t1 = 0,067 (e^-0,4·0,1)', /0,067 mol/.test(t), t.slice(0, 500));
  ok('curvas: v media 2–8 s = 0,039', /0,039/.test(t), t.slice(0, 500));
  chk('curvas: 3 curvas de especies', await W(C).locator('path.p-curva').count(), 3);
  await chip(C, 'orden 0'); await range(C, 2, 4); t = await txt(C);
  ok('curvas orden 0: v instantánea = v media = k = 0,1', (t.match(/0,1 mol/g) || []).length >= 2, t.slice(0, 500));
  await chip(C, 'orden 2'); await range(C, 2, 8); t = await txt(C);
  ok('curvas orden 2: v inst. t1 = 0,1/(1,4)^2 = 0,051', /0,051 mol/.test(t), t.slice(0, 500));
  await chip(C, 'N₂ + 3 H₂'); await chip(C, 'orden 1'); t = await txt(C);
  chk('curvas Haber: 3 especies', await W(C).locator('path.p-curva').count(), 3);
  ok('curvas Haber: lista N₂, H₂ y NH₃', /N₂[^]*H₂[^]*NH₃/.test(t), t.slice(0, 400));
  ok('curvas Haber: H₂ se gasta 3 veces más rápido (÷ 3) y NH₃ ÷ 2', /H₂: [−-][0-9,]+ ÷ 3/.test(t) && /NH₃: [0-9,]+ ÷ 2/.test(t), t.slice(0, 600));
  await range(C, 1, 17);
  chk('curvas: al subir t1 por encima de t2, t2 se desplaza (t2 > t1)', (await W(C).locator('input[type=range]').nth(2).inputValue()) * 1 > 17, true);

  // ---- q5_tabla ----
  const T = 'q5_tabla';
  await W(T).scrollIntoViewIfNeeded();
  const orden = async (q, nn) => { await W(T).locator(`[data-q="${q}"][data-n="${nn}"]`).click(); await p.waitForTimeout(40); };
  const comprueba = async () => { await W(T).locator('[data-ok]').click(); await p.waitForTimeout(60); return txt(T); };
  await chip(T, 'A + B → C'); await chip(T, 'Comparar 1 y 2'); t = await txt(T);
  ok('tabla d1: 1 y 2 → n(A) = 2', /n\(A\) = 2/.test(t), t.slice(0, 600));
  await chip(T, 'Comparar 1 y 3'); t = await txt(T);
  ok('tabla d1: 1 y 3 → m(B) = 1', /m\(B\) = 1/.test(t), t.slice(0, 600));
  await chip(T, 'Comparar 1 y 4'); t = await txt(T);
  ok('tabla d1: 1 y 4 → no se aísla', /no se aísla/.test(t), t.slice(0, 600));
  t = await comprueba(); ok('tabla: sin elegir pide elegir', /Falta/.test(t), t.slice(0, 300));
  await orden(0, 1); await orden(1, 1); t = await comprueba(); ok('tabla d1: mal (1,1) → Todavía no y señala A', /Todavía no/.test(t) && /Revisa A/.test(t) && !/Revisa B/.test(t), t.slice(-300));
  await orden(0, 2); await orden(1, 1); t = await comprueba(); ok('tabla d1: (2,1) → Correcto con k = 0,5', /Correcto/.test(t) && /0,5 L²/.test(t) && /orden total 3/.test(t), t.slice(-300));
  await chip(T, 'A + B → D'); await chip(T, 'Comparar 1 y 3'); t = await txt(T);
  ok('tabla d2: 1 y 3 → B orden 0', /m\(B\) = 0/.test(t), t.slice(0, 600));
  await orden(0, 1); await orden(1, 0); t = await comprueba(); ok('tabla d2: (1,0) → k = 0,04 s⁻¹', /Correcto/.test(t) && /0,04 s⁻¹/.test(t), t.slice(-300));
  await chip(T, '2 NO'); await orden(0, 2); await orden(1, 1); t = await comprueba(); ok('tabla d3: (2,1) → k = 0,3', /Correcto/.test(t) && /0,3 L²/.test(t), t.slice(-300));
  chk('tabla: 4 filas de experimentos', await W(T).locator('tbody tr').count(), 4);
  await chip(T, 'A + B → C'); ok('tabla: al cambiar de tabla se borra el resultado', !/Correcto/.test(await txt(T)), '');

  // ---- q5_maxwell ----
  const M = 'q5_maxwell';
  await W(M).scrollIntoViewIfNeeded();
  await chip(M, 'Eₐ = 20'); t = await txt(M);
  ok('maxwell: Ea 20, 310 K → 1,42·10⁻³ y ×1,28', /1,42·10⁻³/.test(t) && /×1,28/.test(t), t.slice(0, 500));
  await chip(M, 'Eₐ = 50'); t = await txt(M);
  ok('maxwell: Ea 50, 600 K → 1,66·10⁻⁴ y ×1,63·10⁴', /1,66·10⁻⁴/.test(t) && /×1,63·10⁴/.test(t), t.slice(0, 500));
  ok('maxwell: a 300 K, 1,02·10⁻⁸', /1,02·10⁻⁸/.test(t), t.slice(0, 500));
  await chip(M, 'Eₐ = 10'); t = await txt(M);
  ok('maxwell: Ea 10 a 300 K → 4,6 %, cociente ×1', /4,6 %/.test(t) && /×1\b/.test(t), t.slice(0, 500));
  chk('maxwell: hay una zona sombreada', (await W(M).locator('path.p-zona').count()) >= 1, true);
  await chip(M, 'Ampliar la cola'); t = await txt(M);
  ok('maxwell: con la cola ampliada aparece la escala vertical ×', /vertical ampliada ×/.test(t), t.slice(0, 300));
  await chip(M, 'Vista completa'); t = await txt(M);
  ok('maxwell: vista completa quita la ampliación', !/vertical ampliada/.test(t), t.slice(0, 300));
  await range(M, 0, 250); t = await txt(M);
  ok('maxwell: a 250 K el cociente es menor que 1', /×0,/.test(t), t.slice(0, 500));

  // ---- q5_arrhenius ----
  const A = 'q5_arrhenius';
  await W(A).scrollIntoViewIfNeeded();
  await range(A, 0, 60); await range(A, 1, 300); await range(A, 2, 320); t = await txt(A);
  ok('arrhenius: Ea 60, 300→320 → ×4,5 (ln = 1,503)', /4,5\b/.test(t) && /1,503/.test(t), t.slice(0, 500));
  ok('arrhenius: pendiente −7217 K', /−7217|−7\s?217/.test(t.replace(/ /g, ' ')), t.slice(0, 500));
  await range(A, 0, 100); await range(A, 1, 300); await range(A, 2, 400); t = await txt(A);
  ok('arrhenius: Ea 100, 300→400 → ≈ 2,2·10⁴', /2,2\d?·10⁴/.test(t), t.slice(0, 500));
  await chip(A, 'k frente a T'); t = await txt(A);
  ok('arrhenius: la vista k–T mantiene lecturas', /k₂ \/ k₁/.test(t), t.slice(0, 300));
  chk('arrhenius: una curva en k–T', await W(A).locator('path.p-curva').count(), 1);
  await range(A, 0, 50); await range(A, 1, 300); await range(A, 2, 310); t = await txt(A);
  ok('arrhenius: Ea 50, 300→310 → ×1,91', /1,91/.test(t), t.slice(0, 400));
  await chip(A, 'ln k frente a 1/T');
  chk('arrhenius: vuelve a la vista ln (una curva)', await W(A).locator('path.p-curva').count(), 1);

  // ---- q5_mecanismo ----
  const K = 'q5_mecanismo';
  await W(K).scrollIntoViewIfNeeded();
  await chip(K, 'NO₂ + CO'); await chip(K, 'lenta es la 1'); t = await txt(K);
  ok('mecanismo m1: lenta 1 → v = k[NO₂]² y coincide', /v = k\[NO₂\]²/.test(t.replace(/\n/g, ' ')) && /Sí/.test(t), t.slice(0, 700));
  await chip(K, 'lenta es la 2'); t = await txt(K);
  ok('mecanismo m1: lenta 2 → ley con NO₃ y «No»', /\[NO₃\]\[CO\]/.test(t) && /No: la etapa 2/.test(t), t.slice(0, 700));
  await chip(K, 'lenta es la 1');
  await chip(K, '2 NO₂ + F₂'); t = await txt(K);
  ok('mecanismo m2: v = k[NO₂][F₂]', /v = k\[NO₂\]\[F₂\]/.test(t.replace(/\n/g, ' ')), t.slice(0, 700));
  await chip(K, '2 H₂O₂'); t = await txt(K);
  ok('mecanismo m3: catalizador I⁻ en la ley', /v = k\[H₂O₂\]\[I⁻\]/.test(t.replace(/\n/g, ' ')) && /catalizador/.test(t), t.slice(0, 700));
  chk('mecanismo: perfil con 1 curva', await W(K).locator('path.p-curva').count(), 1);

  // ---- q6_diagrama (reutilizado) ----
  await W('q6_diagrama').scrollIntoViewIfNeeded(); await chip('q6_diagrama', 'Con catalizador');
  ok('q6_diagrama: con catalizador muestra Eₐ inversa', /inversa/.test(await txt('q6_diagrama')), '');

  const dist = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  chk('sin desborde horizontal', dist <= 1, true);
  chk('sin errores JS', errs.join(' | '), '');
  console.log(mal ? `x ${mal} fallos de ${n}` : `ok ${n} comprobaciones, todo bien`);
  await b.close(); process.exit(mal ? 1 : 0);
})();
