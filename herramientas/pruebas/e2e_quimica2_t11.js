// Pulsa los controles de los 2 simuladores nuevos de Química II · tema 11 (q11_cadena y q11_red)
// y comprueba sus lecturas contra cifras calculadas aparte (herramientas/verificar_quimica2_t11.py). Uso: node herramientas/pruebas/e2e_quimica2_t11.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'quimica2', 't11');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t11 [data-w=${nm}]`).first();
  const chip = async (nm, txt) => { await W(nm).locator('.chip-btn', { hasText: txt }).first().click(); await p.waitForTimeout(60); };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(40); };
  const txt = async nm => (await W(nm).innerText()).replace(/\s+/g, ' ');
  const chk = (nm, got, esp) => { n++; if (got !== esp) { mal++; console.log('FALLO', nm, '->', JSON.stringify(got), 'esperado', JSON.stringify(esp)); } };
  const ok = (nm, cond, info) => { n++; if (!cond) { mal++; console.log('FALLO', nm, String(info).slice(0, 400)); } };

  // ---- q11_cadena ----
  const C = 'q11_cadena'; await W(C).scrollIntoViewIfNeeded();
  let t = await txt(C);
  ok('cadena: arranca en adición con PE, n = 100, M = 2 800', /n = 100/.test(t) && /M\(polímero\) = n · M\(monómero\) 2 800 g\/mol/.test(t) && /nada: no se pierde ningún átomo/.test(t), t.slice(0, 700));
  await chip(C, 'Cloroeteno'); t = await txt(C); ok('cadena: PVC n = 100 → 6 250', /62,5 g\/mol/.test(t) && /6 250 g\/mol/.test(t), t.slice(0, 700));
  await chip(C, 'Estireno'); t = await txt(C); ok('cadena: PS → 10 400', /10 400 g\/mol/.test(t), t.slice(0, 700));
  await chip(C, 'Tetrafluoroeteno'); t = await txt(C); ok('cadena: PTFE → 10 000', /10 000 g\/mol/.test(t), t.slice(0, 700));
  await chip(C, 'Metacrilato'); t = await txt(C); ok('cadena: PMMA → 10 000 (M = 100)', /M = 100,0 g\/mol/.test(t), t.slice(0, 700));
  await range(C, 0, 0); t = await txt(C); ok('cadena: n = 1', /n = 1\b/.test(t), t.slice(0, 300)); chk('cadena: n = 1 → un solo monómero dibujado', await W(C).locator('.q11-b.a').count(), 1);
  await range(C, 0, 40); t = await txt(C); ok('cadena: n = 10 000 → 1 000 000 g/mol (PMMA)', /n = 10 000/.test(t) && /1 000 000 g\/mol/.test(t), t.slice(0, 700));
  chk('cadena: con n grande se dibujan 3 monómeros como mucho', await W(C).locator('.q11-b.a').count(), 3);
  await range(C, 0, 20);
  await chip(C, 'Condensación'); t = await txt(C);
  ok('cadena: nailon 6,6, n = 100: 199 H₂O, unidad 226, M ≈ 22 600', /199 moléculas de agua/.test(t) && /146 \+ 116 − 36 = 226/.test(t) && /22 600 g\/mol/.test(t) && /amida/.test(t), t.slice(0, 900));
  chk('cadena: nailon muestra 4 monómeros (A, B, A, B) con n ≥ 2', await W(C).locator('.q11-b.a, .q11-b.b').count(), 4);
  await chip(C, 'PET'); t = await txt(C); ok('cadena: PET unidad 192, M ≈ 19 200, 199 H₂O', /166 \+ 62 − 36 = 192/.test(t) && /19 200 g\/mol/.test(t) && /199 moléculas/.test(t), t.slice(0, 900));
  await chip(C, 'PLA'); t = await txt(C); ok('cadena: PLA unidad 72, 99 H₂O, M ≈ 7 200', /90 − 18 = 72/.test(t) && /99 moléculas/.test(t) && /7 200 g\/mol/.test(t), t.slice(0, 900));
  await chip(C, 'Péptido'); t = await txt(C); ok('cadena: péptido unidad 57, 99 H₂O, M ≈ 5 700, enlace peptídico', /75 − 18 = 57/.test(t) && /99 moléculas/.test(t) && /5 700 g\/mol/.test(t) && /peptídico/.test(t), t.slice(0, 900));
  await chip(C, 'Almidón'); t = await txt(C); ok('cadena: almidón unidad 162, M ≈ 16 200, glucosídico', /180 − 18 = 162/.test(t) && /16 200 g\/mol/.test(t) && /glucosídico/.test(t), t.slice(0, 900));
  await range(C, 0, 0); t = await txt(C); ok('cadena: n = 1 con un monómero: 0 moléculas de agua', /0 moléculas de agua/.test(t), t.slice(0, 700));
  await chip(C, 'Nailon'); t = await txt(C); ok('cadena: nailon n = 1: 1 molécula de agua (2n − 1)', /: 1 molécula de agua/.test(t), t.slice(0, 700));
  await range(C, 0, 40); await chip(C, 'Nailon'); t = await txt(C); ok('cadena: nailon n = 10 000 → 19 999 H₂O y 2 260 000 g/mol', /19 999 moléculas/.test(t) && /2 260 000 g\/mol/.test(t), t.slice(0, 900));
  await chip(C, 'Adición'); t = await txt(C); ok('cadena: de vuelta a adición se reinicia en PE', /eteno, M = 28,0/.test(t), t.slice(0, 500));

  // ---- q11_red ----
  const R = 'q11_red'; await W(R).scrollIntoViewIfNeeded();
  t = await txt(R); ok('red: arranca en 0 % termoplástico, 0 puentes', /Termoplástico/.test(t) && /Puentes entre cadenas 0/.test(t), t.slice(0, 500));
  chk('red: 0 puentes dibujados', await W(R).locator('svg line.pte').count(), 0);
  chk('red: 4 cadenas', await W(R).locator('svg polyline.cad').count(), 4);
  await chip(R, 'Goma'); t = await txt(R); ok('red: goma vulcanizada (10 %) = elastómero, 3 puentes', /Elastómero/.test(t) && /Puentes entre cadenas 3/.test(t) && /recupera la forma/.test(t), t.slice(0, 500));
  chk('red: 3 puentes dibujados', await W(R).locator('svg line.pte').count(), 3);
  chk('red: el deslizador sigue al preset (10)', await W(R).locator('input[type=range]').inputValue(), '10');
  await chip(R, 'Ebonita'); t = await txt(R); ok('red: ebonita (40 %) = termoestable, 9 puentes', /Termoestable/.test(t) && /Puentes entre cadenas 9/.test(t), t.slice(0, 500));
  await chip(R, 'Baquelita'); t = await txt(R); ok('red: baquelita (90 %) 21 puentes', /Puentes entre cadenas 21/.test(t) && /no se disuelve/.test(t), t.slice(0, 500));
  chk('red: 21 puentes dibujados', await W(R).locator('svg line.pte').count(), 21);
  await range(R, 0, 25); t = await txt(R); ok('red: 25 % sigue siendo elastómero (límite)', /Elastómero/.test(t), t.slice(0, 300));
  await range(R, 0, 30); t = await txt(R); ok('red: 30 % ya es termoestable', /Termoestable/.test(t), t.slice(0, 300));
  await range(R, 0, 100); chk('red: 100 % → 24 puentes', await W(R).locator('svg line.pte').count(), 24);
  await range(R, 0, 0); chk('red: de nuevo 0 puentes', await W(R).locator('svg line.pte').count(), 0);

  const dist = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  chk('sin desborde horizontal', dist <= 1, true);
  chk('sin errores JS', errs.join(' | '), '');
  console.log(mal ? `x ${mal} fallos de ${n}` : `ok ${n} comprobaciones, todo bien`);
  await b.close(); process.exit(mal ? 1 : 0);
})();
