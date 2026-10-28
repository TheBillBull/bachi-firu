// Pulsa los controles de los 3 simuladores nuevos de Química II · tema 10 (q10_*) y de los motores de FyQ I reutilizados (q7_*)
// y comprueba sus lecturas contra cifras calculadas aparte (herramientas/verificar_quimica2_t10.py). Uso: node herramientas/pruebas/e2e_quimica2_t10.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'quimica2', 't10');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t10 [data-w=${nm}]`).first();
  const chip = async (nm, txt) => { await W(nm).locator('.chip-btn', { hasText: txt }).first().click(); await p.waitForTimeout(60); };
  const btn = async (nm, txt) => { await W(nm).locator('button', { hasText: txt }).first().click(); await p.waitForTimeout(60); };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(40); };
  const pick = async (nm, i, k) => { await W(nm).locator('select').nth(i).selectOption(k); await p.waitForTimeout(60); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(función)' : JSON.stringify(esp)); } };
  const ok = (nm, cond, info) => chk(nm, !!cond, true) || (cond ? 0 : console.log('   ', String(info).slice(0, 300)));
  const txt = async nm => (await W(nm).innerText()).replace(/\s+/g, ' ');


  // ---- barrido genérico: todos los chips, selectores y deslizadores de los widgets del tema ----
  const nombres = await p.locator('#detail-t10 [data-w]').evaluateAll(es => [...new Set(es.map(e => e.getAttribute('data-w')))]);
  for (const x of ['q10_markov', 'q10_induc', 'q10_ester', 'q7_reacciones', 'q7_combustion']) ok('presente ' + x, nombres.includes(x), nombres.join());
  for (const nm of nombres.filter(x => /^q(10|7)_/.test(x))) {
    const w = W(nm); await w.scrollIntoViewIfNeeded();
    const nc = await w.locator('.chip-btn:not([disabled])').count();
    for (let i = 0; i < nc; i++) { if (i >= await w.locator('.chip-btn:not([disabled])').count()) break; try { const c = w.locator('.chip-btn:not([disabled])').nth(i); if (await c.isVisible()) await c.click({ timeout: 2000 }); } catch (e) { chk(nm + ' chip ' + i, 'no se pudo pulsar', 'ok'); } }
    const ns = await w.locator('select').count();
    for (let i = 0; i < ns; i++) { const ops = await w.locator('select').nth(i).locator('option').evaluateAll(o => o.map(x => x.value)); if (!(await w.locator('select').nth(i).isVisible())) continue; for (const v of ops) await w.locator('select').nth(i).selectOption(v); }
    const nr = await w.locator('input[type=range]').count();
    for (let i = 0; i < nr; i++) if (await w.locator('input[type=range]').nth(i).isVisible()) for (const f of [0, 1, 0.5]) await w.locator('input[type=range]').nth(i).evaluate((e, f) => { e.value = +e.min + f * (+e.max - +e.min); e.dispatchEvent(new Event('input', { bubbles: true })); }, f);
    await p.waitForTimeout(60);
    chk(nm + ' sin error tras pulsar todo', await W(nm).locator('.w-error').count(), 0);
    chk(nm + ' no vacío', (await W(nm).innerText()).length > 40, true);
  }

  // ---- q10_markov ----
  const K = 'q10_markov'; await W(K).scrollIntoViewIfNeeded();
  await chip(K, /^Propeno$/); await chip(K, 'HBr'); let t = await txt(K);
  ok('markov: propeno + HBr → 2-bromopropano principal, 1-bromopropano minoritario, carbocatión secundario', /producto principal 2-bromopropano/i.test(t) && /producto minoritario 1-bromopropano/i.test(t) && /secundario \(el otro sería primario\)/i.test(t), t.slice(0, 600));
  ok('markov: diferencia 24 kcal/mol (42 − 18)', /24 kcal\/mol/i.test(t), t.slice(0, 600));
  await chip(K, '2-Metilpropeno'); t = await txt(K); ok('markov: 2-metilpropeno → 2-bromo-2-metilpropano, terciario, 42 kcal/mol', /producto principal 2-bromo-2-metilpropano/i.test(t) && /terciario/i.test(t) && /42 kcal\/mol/i.test(t), t.slice(0, 600));
  await chip(K, 'H₂O'); t = await txt(K); ok('markov: hidratación → 2-metilpropan-2-ol', /2-metilpropan-2-ol/i.test(t) && /2-metilpropan-1-ol/i.test(t), t.slice(0, 600));
  await chip(K, 'HCl'); await chip(K, '2-Metilbut-2-eno'); t = await txt(K); ok('markov: 2-metilbut-2-eno + HCl → 2-cloro-2-metilbutano (terciario frente a secundario, 18 kcal/mol)', /2-cloro-2-metilbutano/i.test(t) && /18 kcal\/mol/i.test(t), t.slice(0, 600));
  await chip(K, 'Pent-2-eno'); t = await txt(K); ok('markov: pent-2-eno → dos productos equivalentes (2- y 3-clorop.)', /producto equivalente/i.test(t) && /los dos carbocationes son secundarios/i.test(t), t.slice(0, 600));
  await chip(K, /^But-2-eno$/); t = await txt(K); ok('markov: but-2-eno simétrico → un solo producto', /ninguno: el alqueno es simétrico/i.test(t) && /2-clorobutano/i.test(t), t.slice(0, 600));
  chk('markov: dos curvas en el perfil si hay dos carbocationes distintos', (await chip(K, /^Propeno$/), await W(K).locator('svg path.p-curva').count()), 2);
  chk('markov: una sola curva si son iguales', (await chip(K, 'Pent-2-eno'), await W(K).locator('svg path.p-curva').count()), 1);

  // ---- q10_induc ----
  const I = 'q10_induc'; await W(I).scrollIntoViewIfNeeded();
  await chip(I, 'Nº de Cl'); t = await txt(I);
  ok('induc: 4 filas, Cl₃CCOOH 0,66 el más fuerte, CH₃COOH 4,76 el más débil', /Cl₃CCOOH 0,66/.test(t) && /CH₃COOH \(pKa 4,76\)/.test(t), t.slice(0, 600));
  chk('induc: 4 barras', await W(I).locator('.q10-fila').count(), 4);
  ok('induc: razón de Ka 12589 (10^4,10)', /× 12589/.test(t), t.slice(0, 700));
  await chip(I, 'Qué halógeno'); t = await txt(I); ok('induc: el F es el más fuerte (pKa 2,59)', /FCH₂COOH \(pKa 2,59\)/.test(t), t.slice(0, 600)); chk('induc: 5 barras', await W(I).locator('.q10-fila').count(), 5);
  await chip(I, 'Distancia'); t = await txt(I); ok('induc: 2-clorobutanoico 2,84 el más fuerte; sin Cl 4,82 el más débil', /2-clorobutanoico \(pKa 2,84\)/.test(t) && /butanoico \(sin Cl\) \(pKa 4,82\)/.test(t), t.slice(0, 600));
  await chip(I, 'Grupos dadores'); t = await txt(I); ok('induc: HCOOH 3,75 el más fuerte; (CH₃)₃CCOOH 5,03 el más débil', /HCOOH \(pKa 3,75\)/.test(t) && /\(CH₃\)₃CCOOH \(pKa 5,03\)/.test(t), t.slice(0, 600));

  // ---- q10_ester ----
  const S = 'q10_ester'; await W(S).scrollIntoViewIfNeeded();
  await range(S, 0, 1); await range(S, 1, 1); t = await txt(S);
  ok('ester: 1 mol + 1 mol → 0,667 mol de éster, rendimiento 66,7 %', /0,667 mol/.test(t) && /66,7 %/.test(t) && /Comprobación de K 4,00/.test(t), t.slice(0, 700));
  await range(S, 1, 10); t = await txt(S); ok('ester: 1 mol de ácido + 10 mol de etanol → 0,974 mol, 97,4 %', /0,974 mol/.test(t) && /97,4 %/.test(t) && /Comprobación de K 4,00/.test(t), t.slice(0, 700));
  await range(S, 0, 2); await range(S, 1, 1); t = await txt(S); ok('ester: 2 mol de ácido + 1 de etanol → reactivo limitante etanol, 1 mol; K = 4', /Comprobación de K 4,00/.test(t) && /Rendimiento \(sobre el reactivo limitante\) 8\d,\d %/.test(t), t.slice(0, 700));
  chk('ester: curva y punto', (await W(S).locator('svg path.p-curva').count()) >= 1 && (await W(S).locator('svg circle.p-punto').count()) >= 1, true);

  // ---- q7_reacciones (reutilizado) ----
  const R = 'q7_reacciones'; await W(R).scrollIntoViewIfNeeded();
  await chip(R, 'Oxidación'); t = await txt(R); ok('reacciones: oxidación muestra dicromato', /K₂Cr₂O₇/.test(t), t.slice(0, 500));
  await chip(R, 'Esterificación'); t = await txt(R); ok('reacciones: esterificación muestra éster + agua', /ster/.test(t) && /agua/.test(t), t.slice(0, 500));
  await chip(R, 'Eliminación'); t = await txt(R); ok('reacciones: eliminación muestra Saytzeff o alqueno', /eno/.test(t), t.slice(0, 500));

  // ---- q7_combustion (reutilizado) ----
  const C = 'q7_combustion'; await W(C).scrollIntoViewIfNeeded(); t = await txt(C); ok('combustión: da ecuación con O₂', /O₂/.test(t) && /CO₂/.test(t), t.slice(0, 400));

  const dist = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  chk('sin desborde horizontal', dist <= 1, true);
  chk('sin errores JS', errs.join(' | '), '');
  console.log(mal ? `x ${mal} fallos de ${n}` : `ok ${n} comprobaciones, todo bien`);
  await b.close(); process.exit(mal ? 1 : 0);
})();
