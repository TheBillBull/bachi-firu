// Pulsa los controles de TODOS los widgets de Química II · tema 1 y comprueba lecturas de los 4 nuevos (qq1_*).
// Uso: node herramientas/pruebas/e2e_quimica2_t1.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'quimica2', 't1');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t1 [data-w=${nm}]`).first();
  const chip = async (nm, txt) => { await W(nm).locator('.chip-btn', { hasText: txt }).first().click(); await p.waitForTimeout(80); };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(60); };
  const campo = async (nm, i, v) => { await W(nm).locator('input[type=text]').nth(i).fill(String(v)); await p.waitForTimeout(80); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const nums = s => (String(s).match(/\d[\d.]*(?:,\d+)?/g) || []).map(x => parseFloat(x.replace(/\.(?=\d{3}\b)/g, '').replace(',', '.')));
  const ok = (nm, cond, info) => chk(nm, !!cond, true) || (cond ? 0 : console.log('   ', String(info).slice(0, 200)));
  const cerca = (a, b2, t = 0.01) => Math.abs(a - b2) <= t * Math.max(1, Math.abs(b2));
  const val = (nm, k) => W(nm).locator(`.qm-nodo[data-k=${k}] .qm-val`).innerText();

  // ---- barrido genérico: todos los widgets del tema, todos los chips, deslizadores y selectores ----
  const nombres = await p.locator('#detail-t1 [data-w]').evaluateAll(es => [...new Set(es.map(e => e.getAttribute('data-w')))]);
  const prop = ['qq1_mapa', 'qq1_mezcla', 'qq1_densidad', 'qq1_curvalim', 'q4_disolucion', 'q4_dilucion', 'q4_dalton', 'q4_empirica', 'q5_gases', 'q5_limitante', 'q5_rendimiento', 'q5_mapa'];
  for (const x of prop) chk('presente ' + x, nombres.includes(x), true);
  for (const nm of nombres.filter(x => !/^(quiz|tarjetas|emparejar|clasificar|orden)$/.test(x))) {
    const w = W(nm); await w.scrollIntoViewIfNeeded();
    const nc = await w.locator('.chip-btn').count();
    for (let i = 0; i < nc; i++) { try { await w.locator('.chip-btn').nth(i).click({ timeout: 2000 }); } catch (e) { chk(nm + ' chip ' + i + ' pulsable', e.message.slice(0, 60), 'ok'); } }
    const nr = await w.locator('input[type=range]').count();
    for (let i = 0; i < nr; i++) for (const f of [0, 1, 0.5]) await w.locator('input[type=range]').nth(i).evaluate((e, f) => { e.value = +e.min + f * (+e.max - +e.min); e.dispatchEvent(new Event('input', { bubbles: true })); }, f);
    const ns = await w.locator('select').count();
    for (let i = 0; i < ns; i++) { const ops = await w.locator('select').nth(i).locator('option').evaluateAll(o => o.map(x => x.value)); for (const v of ops) await w.locator('select').nth(i).selectOption(v); }
    await p.waitForTimeout(60);
    chk(nm + ' sin error tras pulsar todo', await w.locator('.w-error').count(), 0);
    chk(nm + ' no vacío', (await w.innerText()).length > 40, true);
  }

  // ---- qq1_mapa ----
  const M = 'qq1_mapa';
  await W(M).scrollIntoViewIfNeeded();
  await chip(M, 'Masas de examen'); await chip(M, 'H₂O');
  chk('mapa H2O 36 g → 2 mol', cerca(nums(await val(M, 'n'))[0], 2), true);
  await W(M).locator('.qm-nodo[data-k=n]').click(); await p.waitForTimeout(100);
  chk('mapa: pulsar «mol» la hace dato', await W(M).locator('.qm-nodo[data-k=n]').getAttribute('aria-pressed'), 'true');
  await W(M).locator('.qm-nodo[data-k=n] input').fill('0,5'); await p.waitForTimeout(100);
  ok('mapa 0,5 mol de H2O → 9 g', cerca(nums(await val(M, 'm'))[0], 9), await val(M, 'm') + ' / n=' + await W(M).locator('.qm-nodo[data-k=n]').innerText() + ' / sustancia=' + await W(M).locator('input[type=text]').first().inputValue());
  await chip(M, 'CO₂');
  await chip(M, 'otra presión'); await p.waitForTimeout(100);
  chk('mapa: deslizadores T y P visibles con «otra presión»', await W(M).locator('input[type=range]').first().isVisible(), true);
  await range(M, 0, 25); await range(M, 1, 1);
  await W(M).locator('.qm-nodo[data-k=m]').click(); await p.waitForTimeout(100);
  await W(M).locator('.qm-nodo[data-k=m] input').fill('11'); await p.waitForTimeout(100);
  ok('mapa CO2 11 g, 25 °C 1 atm → 6,11 L', cerca(nums(await val(M, 'V'))[0], 6.109), await val(M, 'V'));
  await range(M, 0, 100);
  ok('mapa: a 100 °C V = 7,65 L', cerca(nums(await val(M, 'V'))[0], 7.646), await val(M, 'V'));
  await chip(M, 'normales');
  chk('mapa CN: 0,25 mol → 5,6 L', cerca(nums(await val(M, 'V'))[0], 5.6), true);
  await chip(M, 'H₂O');
  chk('mapa: el agua no es gas (tarjeta de gas desactivada)', await W(M).locator('.qm-nodo[data-k=V]').isDisabled(), true);
  await chip(M, 'Glucosa'); await W(M).locator('.qm-nodo[data-k=D]').click(); await p.waitForTimeout(100);
  chk('mapa glucosa: pulsar volumen de disolución la hace dato', await W(M).locator('.qm-nodo[data-k=D]').getAttribute('aria-pressed'), 'true');

  // ---- qq1_mezcla ----
  const Z = 'qq1_mezcla';
  await W(Z).scrollIntoViewIfNeeded();
  const txtZ = async () => (await W(Z).locator('.lectura').innerText()).replace(/\s+/g, ' ');
  await chip(Z, 'Masas de examen'); await chip(Z, 'CaCO');
  await range(Z, 0, 10); await range(Z, 1, 40);
  let t = await txtZ();
  ok('mezcla carbonatos 10 g, 40 % de A → x = 4,00 g', /x = 4(,00)? g/.test(t), t.slice(0, 260));
  ok('mezcla: V de CO2 = 2,496 L', /2,496/.test(t), t.slice(0, 260));
  await range(Z, 1, 100);
  t = await txtZ(); ok('mezcla 100 % A → 2,24 L', /2,24\d* L/.test(t), t.slice(0, 200));
  await chip(Z, 'Zn + Al'); await range(Z, 1, 40);
  t = await txtZ(); ok('mezcla Zn+Al, 10 g, 40 % → x = 4,00 g', /x = 4(,00)? g/.test(t) && /6(,00)? g/.test(t), t.slice(0, 260));
  await chip(Z, 'NaCl + KCl');
  t = await txtZ(); ok('mezcla NaCl+KCl responde', /AgCl/.test(t), t.slice(0, 160));

  // ---- qq1_densidad ----
  const D = 'qq1_densidad';
  await W(D).scrollIntoViewIfNeeded();
  const txtD = async () => (await W(D).innerText()).replace(/\s+/g, ' ');
  await chip(D, 'Masas de examen'); await chip(D, 'Condiciones normales');
  let td = await txtD();
  ok('densidad CN: aire 1,29 g/L', /1,2\d+ g\/L/.test(td), td.slice(0, 300));
  await campo(D, 0, '1,80');
  td = await txtD(); ok('densidad: d=1,80 a 273 K y 1 atm → M = 40,3', /40,2/.test(td), td.slice(td.indexOf('Aire a esas'), td.indexOf('Aire a esas') + 500));
  await chip(D, 'Aire cali'); td = await txtD();
  ok('densidad: aire caliente usa 373 K', /373/.test(td), td.slice(0, 200));
  await range(D, 1, 3);
  chk('densidad: subir P sin error', await W(D).locator('.w-error').count(), 0);
  await campo(D, 0, '-3'); td = await txtD(); ok('densidad: valor negativo da aviso', /positiva/.test(td), td.slice(-200));

  // ---- qq1_curvalim ----
  const C = 'qq1_curvalim';
  await W(C).scrollIntoViewIfNeeded();
  const txtC = async () => (await W(C).locator('.lectura').innerText()).replace(/\s+/g, ' ');
  const sel = W(C).locator('select').first();
  const ops = await sel.locator('option').evaluateAll(o => o.map(x => x.value));
  chk('curva limitante: 5 reacciones', ops.length, 5);
  await sel.selectOption('haber'); await range(C, 0, 2); await range(C, 1, 3);
  let tc = await txtC();
  ok('curva: lectura con reactivo limitante', /Reactivo limitante/.test(tc), tc.slice(0, 160));
  await range(C, 1, 0); tc = await txtC(); ok('curva: con B=0 no se forma nada', /Se forma [^ ]+ 0 mol/.test(tc), tc.slice(0, 200));
  await range(C, 1, 12); tc = await txtC(); ok('curva: con B de sobra hay lectura de sobrante', /Queda sin reaccionar/.test(tc), tc.slice(0, 200));

  const dist = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  chk('sin desborde horizontal', dist <= 1, true);
  chk('sin errores JS', errs.join(' | '), '');
  console.log(mal ? `x ${mal} fallos de ${n}` : `ok ${n} comprobaciones, todo bien`);
  await b.close(); process.exit(mal ? 1 : 0);
})();
