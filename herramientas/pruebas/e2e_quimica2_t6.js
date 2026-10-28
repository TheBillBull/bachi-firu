// Pulsa los controles de los widgets de Química II · tema 6 y comprueba las lecturas de los 5 nuevos (q6_*).
// Uso: node herramientas/pruebas/e2e_quimica2_t6.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'quimica2', 't6');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t6 [data-w=${nm}]`).first();
  const chip = async (nm, txt) => { await W(nm).locator('.chip-btn', { hasText: txt }).first().click(); await p.waitForTimeout(80); };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(80); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(función)' : JSON.stringify(esp)); } };
  const ok = (nm, cond, info) => { chk(nm, !!cond, true); if (!cond) console.log('   ', String(info).slice(0, 300)); };
  const txt = async nm => (await W(nm).innerText()).replace(/\n+/g, ' | ');

  // ---- barrido genérico: todos los widgets del tema (también los de antes) ----
  const nombres = await p.locator('#detail-t6 [data-w]').evaluateAll(es => [...new Set(es.map(e => e.getAttribute('data-w')))]);
  for (const x of ['eqtiempo', 'equilibrio', 'q6_alfa', 'q6_vanthoff', 'q6_inerte', 'q6_ks', 'q6_precip', 'tarjetas', 'clasificar', 'orden']) chk('presente ' + x, nombres.includes(x), true);
  for (const nm of nombres.filter(x => !/^(quiz|tarjetas|emparejar|clasificar|orden)$/.test(x))) {
    const w = W(nm); await w.scrollIntoViewIfNeeded();
    const nc = await w.locator('.chip-btn:not([disabled])').count();
    for (let i = 0; i < nc; i++) { try { await w.locator('.chip-btn:not([disabled])').nth(i).click({ timeout: 2000 }); } catch (e) { chk(nm + ' chip ' + i + ' pulsable', e.message.slice(0, 60), 'ok'); } }
    const nr = await w.locator('input[type=range]').count();
    for (let i = 0; i < nr; i++) for (const f of [0, 1, 0.5]) await w.locator('input[type=range]').nth(i).evaluate((e, f) => { e.value = +e.min + f * (+e.max - +e.min); e.dispatchEvent(new Event('input', { bubbles: true })); }, f);
    await p.waitForTimeout(60);
    chk(nm + ' sin error tras pulsar todo', await w.locator('.w-error').count(), 0);
    chk(nm + ' no vacío', (await w.innerText()).length > 40, true);
  }

  // ---- q6_alfa ----
  const A = 'q6_alfa';
  await W(A).scrollIntoViewIfNeeded();
  await chip(A, 'PCl₅'); await range(A, 0, 1); await range(A, 1, 10);
  let t = await txt(A);
  ok('alfa PCl₅ n₀ = 1, V = 10: α = 40 %', /α \| 40 %/.test(t), t.slice(0, 500));
  ok('alfa PCl₅: [PCl₅] = 0,06 M, [PCl₃] = 0,04 M', /0,06 M/.test(t) && /0,04 M/.test(t), t.slice(0, 500));
  await range(A, 1, 20); t = await txt(A);
  ok('alfa PCl₅ V = 20: α ≈ 51 % (más V, más α)', /α \| 51(,\d)? %/.test(t), t.slice(0, 500));
  await range(A, 1, 10); await range(A, 0, 2); t = await txt(A);
  ok('alfa PCl₅ n₀ = 2, V = 10: α baja a ≈ 30,5 %', /α \| 30,5 %/.test(t), t.slice(0, 500));
  await chip(A, 'N₂O₄'); await range(A, 0, 1); await range(A, 1, 10); t = await txt(A);
  ok('alfa N₂O₄ n₀ = 1, V = 10: α = 10,2 %', /α \| 10,2 %/.test(t), t.slice(0, 500));
  await chip(A, '2 HI'); await range(A, 1, 1); const t1 = await txt(A); await range(A, 1, 20); const t2 = await txt(A);
  ok('alfa HI: α = 21,3 % y no depende de V', /α \| 21,3 %/.test(t1) && /α \| 21,3 %/.test(t2), t1.slice(0, 400) + ' // ' + t2.slice(0, 400));
  ok('alfa HI: el pie dice que α no depende de V', /no depende de V/.test(t2), t2.slice(-300));
  chk('alfa: una curva y un punto', [await W(A).locator('path.p-curva').count(), await W(A).locator('circle.p-punto').count()], v => v[0] === 1 && v[1] === 1);

  // ---- q6_vanthoff ----
  const V = 'q6_vanthoff';
  await W(V).scrollIntoViewIfNeeded();
  await chip(V, 'NH₃'); await range(V, 1, 600); t = await txt(V);
  ok('vanthoff exotérmica a 600 K: K/K₃₀₀ = 9,78·10⁻⁹ y «K disminuye»', /9,78·10/.test(t) && /K disminuye/.test(t) && /exotérmica/.test(t), t.slice(0, 600));
  await chip(V, 'N₂O₄'); t = await txt(V);
  ok('vanthoff endotérmica +57 a 600 K: K/K₃₀₀ ≈ 9,2·10⁴ y «K aumenta»', /9,1[67]·10/.test(t) && /K aumenta/.test(t) && /endotérmica/.test(t), t.slice(0, 600));
  await range(V, 1, 250); t = await txt(V);
  ok('vanthoff endotérmica a 250 K: K baja al enfriar', /K disminuye/.test(t), t.slice(0, 600));
  await chip(V, 'ΔH = 0'); t = await txt(V);
  ok('vanthoff ΔH = 0: K no cambia (cociente 1)', /K no cambia/.test(t), t.slice(0, 600));
  await range(V, 1, 300); await chip(V, 'NH₃'); t = await txt(V);
  ok('vanthoff T = 300 K: «T igual»', /T igual/.test(t), t.slice(0, 600));
  chk('vanthoff: el deslizador de ΔH sigue a la ficha', await W(V).locator('input[type=range]').nth(0).inputValue(), '-92');

  // ---- q6_inerte ----
  const I = 'q6_inerte';
  await W(I).scrollIntoViewIfNeeded();
  await chip(I, 'N₂ + 3 H₂'); await chip(I, 'V constante'); await range(I, 0, 3); t = await txt(I);
  ok('inerte NH₃ a V constante: Q/K = 1 y «ninguno»', /Q \/ Kc al añadir He \| 1 \|/.test(t) && /Desplazamiento \| ninguno/.test(t), t.slice(0, 600));
  await chip(I, 'P constante'); t = await txt(I);
  ok('inerte NH₃ a P constante, 3 mol He: V 3,69 al añadir He, Q/K = 3,40 y «← reactivos»', /3,69 ⟶ 3,\d+ L/.test(t) && /3,3\d\d|3,4/.test(t) && /⟵ reactivos|← reactivos/.test(t), t.slice(0, 600));
  ok('inerte NH₃ a P constante: n(N₂) pasa de 0,78 a 0,86 (se descompone NH₃)', /0,78 \| 0,86/.test(t) && /0,44 \| 0,29/.test(t), t.slice(0, 600));
  await range(I, 0, 0); t = await txt(I);
  ok('inerte con 0 mol de He: sin desplazamiento', /Desplazamiento \| ninguno/.test(t), t.slice(0, 600));
  await range(I, 0, 3); await chip(I, 'H₂ + I₂'); t = await txt(I);
  ok('inerte HI a P constante (Δn = 0): ninguno', /Desplazamiento \| ninguno/.test(t), t.slice(0, 600));
  await chip(I, 'PCl₅'); t = await txt(I);
  ok('inerte PCl₅ a P constante: «→ productos» (Δn = +1)', /productos/.test(t.split('Desplazamiento')[1] || ''), t.slice(0, 600));
  await chip(I, 'V constante'); t = await txt(I);
  ok('inerte PCl₅ a V constante: ninguno', /Desplazamiento \| ninguno/.test(t), t.slice(0, 600));
  chk('inerte: 6 barras (3 especies × antes y después)', await W(I).locator('rect.z-pen, rect.z-ok').count(), v => v >= 6);

  // ---- q6_ks ----
  const S = 'q6_ks';
  await W(S).scrollIntoViewIfNeeded();
  await chip(S, 'AgCl'); await chip(S, 'ion común: Cl'); await range(S, 0, 2); t = await txt(S);
  ok('ks AgCl con 0,01 M de Cl⁻: s = 1,8·10⁻⁸ y s₀ = 1,34·10⁻⁵, factor 745', /1,8·10⁻⁸ M/.test(t) && /1,34·10⁻⁵ M/.test(t) && /745/.test(t), t.slice(0, 700));
  await range(S, 0, 0); t = await txt(S);
  ok('ks AgCl con 1 M de Cl⁻: s = 1,8·10⁻¹⁰', /1,8·10⁻¹⁰ M/.test(t), t.slice(0, 700));
  await chip(S, 'CaF'); t = await txt(S);
  ok('ks CaF₂: s₀ = 2,14·10⁻⁴ y Ks = 3,9·10⁻¹¹', /2,14·10⁻⁴ M/.test(t) && /3,9·10/.test(t), t.slice(0, 700));
  await chip(S, 'Ag₂CrO₄'); t = await txt(S);
  ok('ks Ag₂CrO₄: s₀ = 6,5·10⁻⁵', /6,5\d?·10⁻⁵ M/.test(t), t.slice(0, 700));
  await chip(S, 'ion común: CrO'); await range(S, 0, 1); t = await txt(S);
  ok('ks Ag₂CrO₄ con 0,1 M CrO₄²⁻: s = 1,66·10⁻⁶', /1,6\d?·10⁻⁶ M/.test(t), t.slice(0, 700));
  await chip(S, 'ion común: Ag'); t = await txt(S);
  ok('ks Ag₂CrO₄ con 0,1 M Ag⁺: s = 1,1·10⁻¹⁰', /1,1\d?·10⁻¹⁰ M/.test(t), t.slice(0, 700));
  chk('ks: curva + punto', [await W(S).locator('path.p-curva').count(), await W(S).locator('circle.p-punto').count()], v => v[0] === 1 && v[1] === 1);

  // ---- q6_precip ----
  const Pq = 'q6_precip';
  await W(Pq).scrollIntoViewIfNeeded();
  await chip(Pq, 'AgCl'); await range(Pq, 0, 4); await range(Pq, 1, 50); await range(Pq, 2, 4); await range(Pq, 3, 50); t = await txt(Pq);
  ok('precip AgCl 50+50 mL de 10⁻⁴ M: Q = 2,5·10⁻⁹, Q/Ks = 13,9, precipita', /2,5·10⁻⁹/.test(t) && /13,9/.test(t) && /precipita/.test(t.split('Veredicto')[1] || '') && !/no precipita/.test(t.split('Veredicto')[1] || ''), t.slice(0, 800));
  await range(Pq, 0, 7); await range(Pq, 2, 7); t = await txt(Pq);
  ok('precip AgCl con 10⁻⁷ M: Q = 2,5·10⁻¹⁵ y «no precipita»', /2,5·10⁻¹⁵/.test(t) && /Q < Ks: no precipita/.test(t), t.slice(0, 800));
  await range(Pq, 0, 4); await range(Pq, 2, 4); await range(Pq, 3, 200); t = await txt(Pq);
  ok('precip AgCl 50 + 200 mL: [Cl⁻] = 8·10⁻⁵ y [Ag⁺] = 2·10⁻⁵', /2·10⁻⁵ M/.test(t) && /8·10⁻⁵ M/.test(t), t.slice(0, 800));
  await chip(Pq, 'PbI'); await range(Pq, 0, 4); await range(Pq, 1, 50); await range(Pq, 2, 4); await range(Pq, 3, 50); t = await txt(Pq);
  ok('precip PbI₂ 10⁻⁴ M: Q = 5·10⁻⁵·(5·10⁻⁵)² = 1,25·10⁻¹³ no precipita', /1,25·10⁻¹³/.test(t) && /no precipita/.test(t), t.slice(0, 800));
  await range(Pq, 0, 2); await range(Pq, 2, 2); t = await txt(Pq);
  ok('precip PbI₂ 10⁻² M: Q = 1,25·10⁻⁷ precipita', /1,25·10⁻⁷/.test(t) && /Q > Ks: precipita/.test(t), t.slice(0, 800));
  chk('precip: marca de Q y de Ks (2 líneas verticales o más)', await W(Pq).locator('line.p-seg').count(), v => v >= 2);

  // ---- actividades nuevas (tarjetas, clasificar, orden) ----
  for (const nm of ['clasificar', 'orden', 'tarjetas']) { await W(nm).scrollIntoViewIfNeeded(); chk(nm + ' no vacío', (await W(nm).innerText()).length > 30, true); }

  const dist = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  chk('sin desborde horizontal', dist <= 1, true);
  chk('sin errores JS', errs.join(' | '), '');
  console.log(mal ? `x ${mal} fallos de ${n}` : `ok ${n} comprobaciones, todo bien`);
  await b.close(); process.exit(mal ? 1 : 0);
})();
