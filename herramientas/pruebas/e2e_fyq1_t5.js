// Comportamiento de los simuladores de FyQ I · tema 5 (estequiometría). Uso: node herramientas/pruebas/e2e_fyq1_t5.js [movil]
// Actúa sobre cada widget como lo haría una persona y compara la lectura con cuentas hechas aparte (masas de examen).
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'fyq1', 't5');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t5 [data-w=${nm}]`).first();
  const lec = async (nm, rot) => W(nm).locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chip = async (nm, sel, i) => { await W(nm).locator(sel + ' .chip-btn').nth(i).click(); await p.waitForTimeout(80); };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(60); };
  const campo = async (nm, i, v) => { const el = W(nm).locator('input[type=text]').nth(i); await el.fill(String(v)); await p.waitForTimeout(80); };
  const elige = async (nm, valor) => { await W(nm).locator('select').first().selectOption(valor); await p.waitForTimeout(100); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const nums = s => (String(s).match(/\d[\d.]*(?:,\d+)?/g) || []).map(x => parseFloat(x.replace(/\.(?=\d{3}\b)/g, '').replace(',', '.')));
  const cerca = (a, b, t = 0.006) => Math.abs(a - b) <= t * Math.max(1, Math.abs(b));
  const ver = async nm => { await W(nm).scrollIntoViewIfNeeded(); };
  const ids = await W('q5_tabla').locator('select option').evaluateAll(o => o.map(x => x.value));
  const M = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, Ca: 40, Fe: 56, Zn: 65.4, Ag: 108 };

  // ---- ajuste ----
  await ver('q5_ajuste');
  chk('ajuste: N₂ + H₂ → NH₃ sin ajustar', await lec('q5_ajuste', 'Estado'), t => /Todavía no/.test(t));
  const plus = async (i, k) => { for (let j = 0; j < k; j++) { await W('q5_ajuste').locator(`[data-i='${i}'][data-d='1']`).click(); } await p.waitForTimeout(60); };
  await plus(1, 2); await plus(2, 1);
  chk('ajuste: N₂ + 3 H₂ → 2 NH₃ ajustada', await lec('q5_ajuste', 'Estado'), t => /Ajustada|✓/.test(t) && !/Todavía/.test(t));
  chk('ajuste: la ecuación actual lleva los coeficientes', await lec('q5_ajuste', 'Ecuación actual'), t => /3 H₂/.test(t) && /2 NH₃/.test(t));
  await chip('q5_ajuste', '[data-pre]', 2);                                      // propano
  chk('ajuste: cambiar de preset reinicia los coeficientes', await lec('q5_ajuste', 'Estado'), t => /Todavía no/.test(t));
  await plus(1, 4); await plus(2, 2); await plus(3, 3);                           // 1 C3H8 + 5 O2 → 3 CO2 + 4 H2O
  chk('ajuste: propano 1, 5, 3, 4', await lec('q5_ajuste', 'Estado'), t => /Ajustada|✓/.test(t) && !/Todavía/.test(t));

  // ---- cadena masa → mol → mol → masa ----
  await ver('q5_tabla');
  chk('tabla: 6 g de H₂ → 1 mol de N₂ → 28 g y 22,4 L', await lec('q5_tabla', 'Cadena'), t => /= 6 \/ 2 = 3 mol/.test(t) && /1 · 28 = 28 g/.test(t) && /22,4 L/.test(t));
  chk('tabla: Lavoisier', await lec('q5_tabla', 'Comprobación de Lavoisier'), t => /✓/.test(t));
  for (const id of ids) {
    await elige('q5_tabla', id);
    chk(`tabla: ${id} conserva la masa`, await lec('q5_tabla', 'Comprobación de Lavoisier'), t => t === null || /✓/.test(t));
  }

  // ---- reactivo limitante ----
  await ver('q5_limitante');
  const LIM = { agua: [[2, 1], 'H₂', 'O₂'], haber: [[1, 3], 'N₂', 'H₂'], metano: [[1, 2], 'CH₄', 'O₂'], hierroS: [[1, 1], 'Fe', 'S'], magnesio: [[2, 1], 'Mg', 'O₂'], zinc: [[1, 2], 'Zn', 'HCl'],
    carbonato: [[1, 2], 'CaCO₃', 'HCl'], termita: [[2, 1], 'Al', 'Fe₂O₃'], oxido: [[4, 3], 'Fe', 'O₂'], agcl: [[1, 1], 'AgNO₃', 'NaCl'], neut2: [[1, 2], 'H₂SO₄', 'NaOH'], etanol: [[1, 3], 'C₂H₅OH', 'O₂'] };
  const opts = await W('q5_limitante').locator('select option').evaluateAll(o => o.map(x => x.value));
  let probadas = 0;
  for (const id of opts) {
    if (!LIM[id]) continue; probadas++;
    await elige('q5_limitante', id);
    for (const [a, bb] of [[3, 5], [7, 2.5]]) {
      await range('q5_limitante', 0, a); await range('q5_limitante', 1, bb);
      const [c0, c1] = LIM[id][0], xi = Math.min(a / c0, bb / c1), lim = a / c0 <= bb / c1 ? LIM[id][1] : LIM[id][2];
      const lt = await lec('q5_limitante', 'Reactivo limitante');
      if (a / c0 !== bb / c1) chk(`limitante: ${id} (${a}, ${bb}) → ${lim}`, lt, t => t.replace(/\s/g, '').startsWith(lim));
      chk(`limitante: ${id} (${a}, ${bb}) ocurre ${xi} veces`, nums(await lec('q5_limitante', 'La reacción ocurre'))[0], t => cerca(t, xi, 0.01));
    }
  }
  chk('limitante: las 12 reacciones del widget probadas', probadas, 12);
  await elige('q5_limitante', 'haber'); await range('q5_limitante', 0, 1); await range('q5_limitante', 1, 6);
  chk('limitante: N₂ 1 mol + H₂ 6 mol → NH₃ 2 mol = 34 g', await lec('q5_limitante', 'Se forma'), t => /2 mol = 34 g/.test(t));
  chk('limitante: sobran 3 mol de H₂ = 6 g', await lec('q5_limitante', 'Sobra de H₂'), t => /3 mol = 6 g/.test(t));

  // ---- pureza y rendimiento ----
  await ver('q5_rendimiento');
  chk('rendimiento: caliza 500 g al 90 %, real 220 g → 87,3 %', await lec('q5_rendimiento', '5)'), t => /87,3 %/.test(t));
  await elige('q5_rendimiento', await W('q5_rendimiento').locator('select option').nth(1).getAttribute('value'));
  await campo('q5_rendimiento', 0, 1000); await campo('q5_rendimiento', 1, 80); await campo('q5_rendimiento', 2, 500);
  chk('rendimiento: 1000 g de Fe₂O₃ del 80 % → 800 g, 5 mol, 10 mol de Fe, 560 g', [await lec('q5_rendimiento', '1)'), await lec('q5_rendimiento', '3)'), await lec('q5_rendimiento', '4)')], a => /800 g/.test(a[0]) && /10 mol/.test(a[1]) && /560 g/.test(a[2]));
  chk('rendimiento: 500/560 = 89,29 %', await lec('q5_rendimiento', '5)'), t => /89,29 %/.test(t));
  await chip('q5_rendimiento', '[data-modo]', 1); await campo('q5_rendimiento', 3, 80);
  chk('rendimiento: con η = 80 % la masa real es 448 g', await lec('q5_rendimiento', '5)'), t => /448/.test(t));
  await chip('q5_rendimiento', '[data-modo]', 0); await campo('q5_rendimiento', 2, 700);
  chk('rendimiento: más del 100 % se avisa', await lec('q5_rendimiento', 'Aviso'), t => t !== null && /100 %/.test(t));

  // ---- gases ----
  await ver('q5_gases');
  chk('gases: 6 L de N₂ → 18 L de H₂ y 12 L de NH₃', [await lec('q5_gases', 'V(H₂)'), await lec('q5_gases', 'V(NH₃)')], a => /18 L/.test(a[0]) && /12 L/.test(a[1]));
  await range('q5_gases', 0, 10);
  chk('gases: 10 L de N₂ → 30 L y 20 L', [await lec('q5_gases', 'V(H₂)'), await lec('q5_gases', 'V(NH₃)')], a => /30 L/.test(a[0]) && /20 L/.test(a[1]));

  // ---- disoluciones ----
  await ver('q5_disoluciones');
  chk('disoluciones: HCl 100 mL 0,5 M + NaOH 80 mL 0,5 M → limita NaOH, 0,04 mol = 2,34 g', [await lec('q5_disoluciones', 'Reactivo limitante'), await lec('q5_disoluciones', 'Se forma NaCl')], a => a[0] === 'NaOH' && /0,04 mol = 2,34 g/.test(a[1]) && /0,2222 M/.test(a[1]));
  await range('q5_disoluciones', 0, 40);
  chk('disoluciones: HCl 40 mL → limita HCl, 0,02 mol = 1,17 g, concentración 0,1667 M', [await lec('q5_disoluciones', 'Reactivo limitante'), await lec('q5_disoluciones', 'Se forma NaCl')], a => a[0] === 'HCl' && /0,02 mol = 1,17 g/.test(a[1]) && /0,1667 M/.test(a[1]));
  chk('disoluciones: sobran 0,02 mol de NaOH = 0,8 g', await lec('q5_disoluciones', 'Sobra de NaOH'), t => /0,02 mol = 0,8 g/.test(t));

  // ---- combustión ----
  await ver('q5_combustion');
  await chip('q5_combustion', '[data-pre]', 0);                                    // metano, 1 kg
  chk('combustión: 1 kg de CH₄ → 62,5 mol, O₂ 125 mol = 4 000 g = 2 800 L', [await lec('q5_combustion', 'Moles de CH'), await lec('q5_combustion', 'Oxígeno necesario')], a => /62,5/.test(a[0]) && /125/.test(a[1]) && /4000/.test(a[1].replace(/[\s.]/g, '')) && /2800/.test(a[1].replace(/[\s.]/g, '')));
  chk('combustión: aire = 2 800/0,21 = 13 333 L', await lec('q5_combustion', 'Aire necesario'), t => /13333/.test(t.replace(/[\s.]/g, '')));
  chk('combustión: CO₂ 62,5 mol = 2 750 g; agua 125 mol = 2 250 g', [await lec('q5_combustion', 'Se forma CO'), await lec('q5_combustion', 'Se forma agua')], a => /2750/.test(a[0].replace(/[\s.]/g, '')) && /2250/.test(a[1].replace(/[\s.]/g, '')));
  await chip('q5_combustion', '[data-modo]', 1);
  chk('combustión incompleta (CH₄ → CO): O₂ 93,75 mol = 3 000 g', await lec('q5_combustion', 'Oxígeno necesario'), t => /93,75/.test(t) && /3000/.test(t.replace(/[\s.]/g, '')));
  await chip('q5_combustion', '[data-modo]', 0);
  const COMBS = [['C₂H₆', 30, 3.5], ['C₃H₈', 44, 5], ['C₄H₁₀', 58, 6.5], ['C₈H₁₈', 114, 12.5], ['C₂H₅OH', 46, 3], ['C₂H₂', 26, 2.5], ['C₆H₁₂O₆', 180, 6]];
  for (let i = 0; i < COMBS.length; i++) {
    await chip('q5_combustion', '[data-pre]', i + 1);
    const [f, Mm, k] = COMBS[i], nn = 1000 / Mm;
    chk(`combustión: 1 kg de ${f} → O₂ ${k}·n`, nums(await lec('q5_combustion', 'Oxígeno necesario'))[0], t => cerca(t, nn * k, 0.002));
  }

  // ---- mapa y práctica ----
  await ver('q5_mapa');
  const nEj = await W('q5_mapa').locator('[data-ej] .chip-btn').count();
  chk('mapa: 5 ejemplos de plan', nEj, 5);
  for (let i = 0; i < nEj; i++) { await chip('q5_mapa', '[data-ej]', i); chk(`mapa: ejemplo ${i} muestra un plan`, (await W('q5_mapa').innerText()).length, t => t > 400); }
  await ver('q5_practica');
  let buenos = 0;
  for (let i = 0; i < 24; i++) {
    await W('q5_practica').locator('button', { hasText: 'Ver solución' }).click();
    const txt = await W('q5_practica').locator('.result-box').innerText();
    const val = nums(txt.replace('Resultado', ''))[0];
    await W('q5_practica').locator('input[type=text]').fill(String(val).replace('.', ','));
    await W('q5_practica').locator('button', { hasText: 'Comprobar' }).click();
    const t = await lec('q5_practica', '✓') ;
    if (await W('q5_practica').locator('.lec', { hasText: 'Correcto' }).count()) buenos++;
    await W('q5_practica').locator('button', { hasText: 'Otro problema' }).click();
  }
  chk('práctica: 24 problemas, todos aceptan su solución', buenos, 24);

  console.log(`${n - mal}/${n} comprobaciones de comportamiento correctas · errores JS: ${errs.length ? errs : 'ninguno'}`);
  if (mal || errs.length) process.exitCode = 1;
  await b.close();
})();
