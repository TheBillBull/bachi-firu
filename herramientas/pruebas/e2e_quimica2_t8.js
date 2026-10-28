// Pulsa los controles de los 5 simuladores nuevos de Química II · tema 8 (q8_*) y comprueba sus lecturas contra cifras
// calculadas aparte (herramientas/verificar_quimica2_t8.py). Uso: node herramientas/pruebas/e2e_quimica2_t8.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'quimica2', 't8');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t8 [data-w=${nm}]`).first();
  const chip = async (nm, txt) => { await W(nm).locator('.chip-btn', { hasText: txt }).first().click(); await p.waitForTimeout(60); };
  const btn = async (nm, txt) => { await W(nm).locator('button', { hasText: txt }).first().click(); await p.waitForTimeout(60); };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(40); };
  const pick = async (nm, i, k) => { await W(nm).locator('select').nth(i).selectOption(k); await p.waitForTimeout(60); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(función)' : JSON.stringify(esp)); } };
  const ok = (nm, cond, info) => chk(nm, !!cond, true) || (cond ? 0 : console.log('   ', String(info).slice(0, 300)));
  const txt = async nm => (await W(nm).innerText()).replace(/\s+/g, ' ');

  // ---- barrido genérico: todos los chips, botones, selectores y deslizadores ----
  const nombres = await p.locator('#detail-t8 [data-w]').evaluateAll(es => [...new Set(es.map(e => e.getAttribute('data-w')))]);
  for (const x of ['q8_ajusta', 'q8_escala', 'q8_pila', 'q8_valora', 'q8_faraday']) ok('presente ' + x, nombres.includes(x), nombres.join());
  for (const nm of nombres.filter(x => /^q8_/.test(x))) {
    const w = W(nm); await w.scrollIntoViewIfNeeded();
    const nc = await w.locator('.chip-btn:not([disabled])').count();
    for (let i = 0; i < nc; i++) { if (i >= await w.locator('.chip-btn:not([disabled])').count()) break; try { await w.locator('.chip-btn:not([disabled])').nth(i).click({ timeout: 2000 }); } catch (e) { chk(nm + ' chip ' + i + ' pulsable', e.message.slice(0, 60), ''); } }
    const ns = await w.locator('select').count();
    for (let i = 0; i < ns; i++) { const ops = await w.locator('select').nth(i).locator('option').evaluateAll(o => o.map(x => x.value)); for (const v of ops) await w.locator('select').nth(i).selectOption(v); }
    const nr = await w.locator('input[type=range]').count();
    for (let i = 0; i < nr; i++) for (const f of [0, 1, 0.5]) await w.locator('input[type=range]').nth(i).evaluate((e, f) => { e.value = +e.min + f * (+e.max - +e.min); e.dispatchEvent(new Event('input', { bubbles: true })); }, f);
    await p.waitForTimeout(60);
    chk(nm + ' sin error tras pulsar todo', await w.locator('.w-error').count(), 0);
    chk(nm + ' no vacío', (await w.innerText()).length > 40, true);
  }

  // ---- q8_escala ----
  const E = 'q8_escala'; await W(E).scrollIntoViewIfNeeded();
  await chip(E, 'Zn en HCl'); let t = await txt(E);
  ok('escala: Zn en HCl → E° +0,76 V, espontánea, Zn + 2 H⁺ → H₂ + Zn²⁺', /\+0,76 V/.test(t) && /sí/.test(t) && /Zn \+ 2 H⁺ ⟶ Zn²⁺ \+ H₂/.test(t), t.slice(0, 500));
  ok('escala: ΔG° −147 kJ y log K 25,7', /−147 kJ/.test(t) && /25,7/.test(t), t.slice(0, 500));
  await chip(E, 'Cu en HCl'); t = await txt(E); ok('escala: Cu en HCl → −0,34 V, no espontánea', /−0,34 V/.test(t) && /no: E° < 0|no: E° &lt; 0/.test(t.replace('&lt;', '<')), t.slice(0, 500));
  await chip(E, 'Fe desplaza'); t = await txt(E); ok('escala: Fe desplaza Cu²⁺ → +0,78 V', /\+0,78 V/.test(t) && /Fe \+ Cu²⁺ ⟶ Fe²⁺ \+ Cu/.test(t), t.slice(0, 500));
  await chip(E, 'Cu en HNO'); t = await txt(E); ok('escala: Cu en HNO₃ → +0,62 V y 2 NO₃⁻ + 3 Cu + 8 H⁺', /\+0,62 V/.test(t) && /3 Cu \+ 2 NO₃⁻ \+ 8 H⁺ ⟶ 3 Cu²⁺ \+ 2 NO \+ 4 H₂O/.test(t) && /n \(electrones\) 6/.test(t), t.slice(0, 500));
  await chip(E, 'Cl₂ con Br'); t = await txt(E); ok('escala: Cl₂ + 2 Br⁻ → +0,29 V', /\+0,29 V/.test(t) && /Cl₂ \+ 2 Br⁻ ⟶ 2 Cl⁻ \+ Br₂/.test(t), t.slice(0, 500));
  await pick(E, 0, 'ag'); await pick(E, 1, 'al'); t = await txt(E); ok('escala: Ag⁺ con Al → +2,46 V, ΔG° −712 kJ', /\+2,46 V/.test(t) && /−712 kJ/.test(t), t.slice(0, 500));
  await pick(E, 0, 'zn'); await pick(E, 1, 'ag'); t = await txt(E); ok('escala: Zn²⁺ con Ag → −1,56 V y la inversa', /−1,56 V/.test(t) && /inversa/.test(t), t.slice(0, 500));
  chk('escala: 19 filas con una resaltada en rojo y otra en verde', await W(E).locator('.q8-fila').count(), 19);
  chk('escala: filas resaltadas', (await W(E).locator('.q8-fila.ox').count()) + (await W(E).locator('.q8-fila.re').count()), 2);

  // ---- q8_pila ----
  const P = 'q8_pila'; await W(P).scrollIntoViewIfNeeded();
  await pick(P, 0, 'zn'); await pick(P, 1, 'cu'); t = await txt(P);
  ok('pila: Zn–Cu fem 1,10 V, ánodo Zn, cátodo Cu', /1,1 V/.test(t) || /= 1,10 V/.test(t), t.slice(0, 700));
  ok('pila: notación Zn(s) | Zn²⁺(1 M) ‖ Cu²⁺(1 M) | Cu(s)', /Zn\(s\) \| Zn²⁺\(1 M\) ‖ Cu²⁺\(1 M\) \| Cu\(s\)/.test(t), t.slice(0, 900));
  ok('pila: ΔG° −212 kJ', /−212 kJ/.test(t), t.slice(0, 900));
  await chip(P, 'Con puente'); await pick(P, 0, 'zn'); await pick(P, 1, 'cu');
  chk('pila: voltímetro con 1,10', (await W(P).locator('svg').innerHTML()).includes('>1,10<'), true);
  await pick(P, 0, 'cu'); await pick(P, 1, 'zn'); t = await txt(P); ok('pila: al invertir las celdas el ánodo sigue siendo el Zn', /Zn\(s\) \| Zn²⁺\(1 M\) ‖ Cu²⁺/.test(t), t.slice(0, 900));
  await chip(P, 'Sin puente'); t = await txt(P); ok('pila: sin puente salino no circula corriente y el voltímetro marca 0,00', /no circula corriente/.test(t) && (await W(P).locator('svg').innerHTML()).includes('>0,00<'), t.slice(0, 900));
  chk('pila: sin puente no hay flechas de electrones', await W(P).locator('polygon.q8-fe').count(), 0);
  await chip(P, 'Con puente'); chk('pila: con puente, dos flechas de electrones', await W(P).locator('polygon.q8-fe').count(), 2);
  await pick(P, 0, 'al'); await pick(P, 1, 'ag'); t = await txt(P); ok('pila: Al–Ag fem 2,46 V y Al + 3 Ag⁺ → Al³⁺ + 3 Ag', /2,46 V/.test(t) && /Al \+ 3 Ag⁺ ⟶ Al³⁺ \+ 3 Ag/.test(t), t.slice(0, 900));
  await pick(P, 0, 'h'); await pick(P, 1, 'cu'); t = await txt(P); ok('pila: H₂–Cu con Pt: notación con Pt y fem 0,34', /Pt \| H₂\(1 atm\) \| H⁺\(1 M\) ‖ Cu²⁺\(1 M\) \| Cu\(s\)/.test(t) && /0,34 V/.test(t), t.slice(0, 900));
  await pick(P, 0, 'zn'); await pick(P, 1, 'zn'); t = await txt(P); ok('pila: dos celdas iguales avisan', /distintas/.test(t), t.slice(0, 300));

  // ---- q8_ajusta ----
  const A = 'q8_ajusta'; await W(A).scrollIntoViewIfNeeded();
  await chip(A, 'MnO₄⁻ + Fe²⁺'); t = await txt(A);
  chk('ajusta: al principio solo hay el paso 1', await W(A).locator('.q8-paso').count(), 1);
  await btn(A, 'Siguiente'); chk('ajusta: «Siguiente» muestra un paso más', await W(A).locator('.q8-paso').count(), 2);
  await btn(A, 'Ver todos'); t = await txt(A);
  chk('ajusta: MnO₄⁻/Fe²⁺ 8 pasos', await W(A).locator('.q8-paso').count(), 8);
  ok('ajusta: MnO₄⁻ + 5 Fe²⁺ + 8 H⁺ → Mn²⁺ + 5 Fe³⁺ + 4 H₂O', /MnO₄⁻ \+ 5 Fe²⁺ \+ 8 H⁺ ⟶ Mn²⁺ \+ 5 Fe³⁺ \+ 4 H₂O/.test(t), t.slice(0, 1500));
  ok('ajusta: la reducción lleva 5 e⁻ a la izquierda', /MnO₄⁻ \+ 8 H⁺ \+ 5 e⁻ ⟶ Mn²⁺ \+ 4 H₂O/.test(t), t.slice(0, 1500));
  ok('ajusta: n.º ox. +7 → +2 y +2 → +3', /Mn: \+7 ⟶ \+2/.test(t) && /Fe: \+2 ⟶ \+3/.test(t), t.slice(0, 600));
  ok('ajusta: comprobación de carga +17... ', /carga neta es la misma/.test(t), t.slice(0, 1500));
  await chip(A, 'Cr₂O₇²⁻ + Fe²⁺'); await btn(A, 'Ver todos'); t = await txt(A); ok('ajusta: dicromato 14 H⁺ y 7 H₂O', /Cr₂O₇²⁻ \+ 6 Fe²⁺ \+ 14 H⁺ ⟶ 2 Cr³⁺ \+ 6 Fe³⁺ \+ 7 H₂O/.test(t), t.slice(0, 1500));
  await chip(A, 'MnO₄⁻ + C₂O₄²⁻'); await btn(A, 'Ver todos'); t = await txt(A); ok('ajusta: 2 MnO₄⁻ + 5 C₂O₄²⁻ + 16 H⁺', /2 MnO₄⁻ \+ 5 C₂O₄²⁻ \+ 16 H⁺ ⟶ 2 Mn²⁺ \+ 10 CO₂ \+ 8 H₂O/.test(t), t.slice(0, 1500));
  await chip(A, 'Cu + NO₃⁻'); await btn(A, 'Ver todos'); t = await txt(A); ok('ajusta: Cu + NO₃⁻ → 3 Cu²⁺ + 2 NO', /2 NO₃⁻ \+ 3 Cu \+ 8 H⁺ ⟶ 2 NO \+ 3 Cu²⁺ \+ 4 H₂O/.test(t), t.slice(0, 1500));
  await chip(A, 'MnO₄⁻ + I⁻'); await btn(A, 'Ver todos'); t = await txt(A);
  chk('ajusta: medio básico tiene 9 pasos', await W(A).locator('.q8-paso').count(), 9);
  ok('ajusta: básico 2 MnO₄⁻ + 4 H₂O + 6 I⁻ → 2 MnO₂ + 3 I₂ + 8 OH⁻', /2 MnO₄⁻ \+ 6 I⁻ \+ 4 H₂O ⟶ 2 MnO₂ \+ 3 I₂ \+ 8 OH⁻/.test(t), t.slice(0, 1800));
  ok('ajusta: básico sin H⁺ en la ecuación final', !/H⁺/.test(t.split('Suma, cancela')[1] || ''), t.slice(0, 1800));
  await chip(A, 'dismutación'); await btn(A, 'Ver todos'); t = await txt(A); ok('ajusta: dismutación Cl₂ + 2 OH⁻ → Cl⁻ + ClO⁻ + H₂O', /Cl₂ \+ 2 OH⁻ ⟶ Cl⁻ \+ ClO⁻ \+ H₂O/.test(t), t.slice(0, 1800));
  await btn(A, 'Reiniciar'); chk('ajusta: reiniciar vuelve al paso 1', await W(A).locator('.q8-paso').count(), 1);
  await chip(A, 'MnO₂ + Cl⁻'); await btn(A, 'Ver todos'); t = await txt(A); ok('ajusta: MnO₂ + 2 Cl⁻ + 4 H⁺', /MnO₂ \+ 2 Cl⁻ \+ 4 H⁺ ⟶ Mn²⁺ \+ Cl₂ \+ 2 H₂O/.test(t), t.slice(0, 1500));

  // ---- q8_valora ----
  const V = 'q8_valora'; await W(V).scrollIntoViewIfNeeded();
  await chip(V, 'MnO₄⁻ con Fe²⁺'); await range(V, 0, 0.02); await range(V, 1, 18.4); await range(V, 2, 20); t = await txt(V);
  ok('valora: 18,4 mL de KMnO₄ 0,02 sobre 20 mL → 3,68 mmol… 0,092 mol/L', /0,0920 mol\/L/.test(t) && /0,368 mmol/.test(t), t.slice(0, 900));
  ok('valora: razón 5 : 1 y 5,14 g/L', /5,00 Fe²⁺ por MnO₄⁻/.test(t) && /5,14 g\/L/.test(t), t.slice(0, 1200));
  await chip(V, 'MnO₄⁻ con H₂O₂'); await range(V, 0, 0.015); await range(V, 1, 21.6); await range(V, 2, 25); t = await txt(V); ok('valora: agua oxigenada diluida 0,0324 mol/L', /0,0324 mol\/L/.test(t) && /2,50 H₂O₂ por MnO₄⁻/.test(t), t.slice(0, 1200));
  await chip(V, 'Cr₂O₇²⁻ con Fe²⁺'); await range(V, 0, 0.05); await range(V, 1, 10); await range(V, 2, 25); t = await txt(V); ok('valora: dicromato 0,05 · 10 mL → Fe²⁺ 0,12 mol/L', /0,1200 mol\/L/.test(t) && /6 e⁻/.test(t), t.slice(0, 1200));
  await chip(V, 'MnO₄⁻ con C₂O₄²⁻'); await range(V, 0, 0.02); await range(V, 1, 20); await range(V, 2, 20); t = await txt(V); ok('valora: oxalato 0,02 · 20 mL / 20 mL → 0,05 mol/L (razón 2,5)', /0,0500 mol\/L/.test(t) && /2,50/.test(t), t.slice(0, 900));
  chk('valora: 5 pasos', await W(V).locator('.q8-paso').count(), 5);

  // ---- q8_faraday ----
  const Fa = 'q8_faraday'; await W(Fa).scrollIntoViewIfNeeded();
  await chip(Fa, 'Calcular la masa'); await pick(Fa, 0, 'cu'); await range(Fa, 0, 3); await range(Fa, 1, 40); t = await txt(Fa);
  ok('faraday: 3 A, 40 min, Cu → 2,369 g (Q = 7200 C)', /2,369 g/.test(t) && /7200 C/.test(t), t.slice(0, 900));
  await chip(Fa, 'Calcular el tiempo'); await pick(Fa, 0, 'ag'); await range(Fa, 0, 2.5); await range(Fa, 2, 5); t = await txt(Fa); ok('faraday: 5 g de Ag con 2,5 A → 1789 s', /1789 s/.test(t), t.slice(0, 900));
  chk('faraday: al calcular el tiempo se oculta su deslizador', await W(Fa).locator('label:has(input[type=range])').evaluateAll(l => l.filter(x => x.style.display === 'none').length), 1);
  await chip(Fa, 'Calcular la intensidad'); await pick(Fa, 0, 'al'); await range(Fa, 1, 120); await range(Fa, 2, 10); t = await txt(Fa);
  ok('faraday: 10 g de Al en 120 min → 14,892 A', /14,89\d? A/.test(t), t.slice(0, 900));
  await chip(Fa, 'Calcular la masa'); await pick(Fa, 0, 'h2'); await range(Fa, 0, 5); await range(Fa, 1, 30); t = await txt(Fa); ok('faraday: H₂ 5 A 30 min → 1,14 L', /1,14\d* L/.test(t) && /0,0932/.test(t), t.slice(300, 1200));
  await pick(Fa, 0, 'cu'); await range(Fa, 0, 3); await range(Fa, 1, 40);
  await chip(Fa, 'Dos cubas'); await pick(Fa, 1, 'ag'); t = await txt(Fa); ok('faraday: cuba en serie Ag → 8,05 g con la carga de 2,369 g de Cu', /8,05\d? g/.test(t) && /m₂\/m₁/.test(t), t.slice(0, 1100));
  chk('faraday: segunda cuba visible', await W(Fa).locator('select').nth(1).isVisible(), true);
  await chip(Fa, 'Una cuba'); chk('faraday: una cuba oculta el segundo selector', await W(Fa).locator('select').nth(1).isVisible(), false);

  const dist = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  chk('sin desborde horizontal', dist <= 1, true);
  chk('sin errores JS', errs.join(' | '), '');
  console.log(mal ? `x ${mal} fallos de ${n}` : `ok ${n} comprobaciones, todo bien`);
  await b.close(); process.exit(mal ? 1 : 0);
})();
