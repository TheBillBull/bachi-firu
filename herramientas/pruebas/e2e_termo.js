// Comportamiento de los simuladores del tema 6 de Física y Química I (termoquímica)
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'fyq1', 't6');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t6 [data-w=${nm}]`).first();
  const lec = async (nm, rot) => W(nm).locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chip = async (nm, sel, i) => { await W(nm).locator(sel + ' .chip-btn').nth(i).click(); await p.waitForTimeout(80); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(80); };

  // primer principio
  await W('q6_primer').scrollIntoViewIfNeeded();
  chk('primer ΔU', await lec('q6_primer', 'Energía interna'), t => /50 J/.test(t) && /aumenta/.test(t));
  await chip('q6_primer', '[data-pre]', 1); chk('compresión ΔU', await lec('q6_primer', 'Energía interna'), t => /60 J/.test(t));
  await chip('q6_primer', '[data-pre]', 3); chk('enfría ΔU', await lec('q6_primer', 'Energía interna'), t => /−70 J/.test(t) && /disminuye/.test(t));
  chk('trabajo de expansión', await lec('q6_primer', 'W = −p'), t => /−3 atm·L/.test(t) && /−304/.test(t));
  // diagrama
  await W('q6_diagrama').scrollIntoViewIfNeeded();
  chk('diagrama exotérmica', await lec('q6_diagrama', 'Tipo'), t => /exotérmica/.test(t)); chk('diagrama Ea inversa', await lec('q6_diagrama', 'Eₐ de la reacción inversa'), t => /190 kJ/.test(t));
  await chip('q6_diagrama', '[data-pre]', 1); chk('diagrama endotérmica', await lec('q6_diagrama', 'Tipo'), t => /endotérmica/.test(t));
  await chip('q6_diagrama', '[data-cat]', 1); chk('catalizador baja Ea', await lec('q6_diagrama', 'Eₐ de la reacción directa'), t => /con catalizador/.test(t));
  // calor
  await W('q6_calor').scrollIntoViewIfNeeded(); chk('calor agua', await lec('q6_calor', 'Q = m'), t => /33440 J/.test(t));
  await chip('q6_calor', '[data-sus]', 3); chk('calor hierro', await lec('q6_calor', 'Q = m'), t => /3592 J/.test(t));
  // mezcla
  await W('q6_mezcla').scrollIntoViewIfNeeded(); chk('mezcla Te', await lec('q6_mezcla', 'Temperatura de equilibrio'), t => /24,85 °C/.test(t));
  // cambio de estado
  await W('q6_cambio').scrollIntoViewIfNeeded(); chk('cambio estado', await lec('q6_cambio', 'Estado'), t => /agua \+ vapor/.test(t)); chk('cambio T', await lec('q6_cambio', 'Temperatura'), '100 °C');
  await range('q6_cambio', 1, 1); chk('cambio hielo', await lec('q6_cambio', 'Estado'), t => /hielo/.test(t));
  await range('q6_cambio', 1, 100); chk('cambio vapor', await lec('q6_cambio', 'Estado'), t => /vapor de agua/.test(t));
  // Hess
  await W('q6_hess').scrollIntoViewIfNeeded();
  const exp = ['−890,3', '−110,5', '−84,4', '−1,9', '+66,4', '−395,7', '+226,7'];
  for (let i = 0; i < exp.length; i++) {
    await chip('q6_hess', '[data-pre]', i);
    chk('hess ' + i + ' sin solución', await lec('q6_hess', '¿Coincide'), t => /Todavía no/.test(t));
    await W('q6_hess').locator('.q6-acc button').nth(0).click(); await p.waitForTimeout(80);
    chk('hess ' + i + ' solución', await lec('q6_hess', '¿Coincide'), t => /Sí/.test(t) && t.includes('ΔH = ' + exp[i] + ' kJ'));
  }
  // un fallo típico: no invertir
  await chip('q6_hess', '[data-pre]', 1); await W('q6_hess').locator('.q6-hrow').nth(0).locator('select').selectOption('1'); await W('q6_hess').locator('.q6-hrow').nth(1).locator('select').selectOption('1');
  chk('hess sin invertir falla', await lec('q6_hess', '¿Coincide'), t => /Todavía no/.test(t));
  await W('q6_hess').locator('.q6-hrow').nth(1).locator('[data-inv]').click(); await p.waitForTimeout(60);
  chk('hess invertida acierta', await lec('q6_hess', '¿Coincide'), t => /Sí/.test(t) && /−110,5/.test(t));
  // formación
  await W('q6_formacion').scrollIntoViewIfNeeded();
  chk('formación metano', await lec('q6_formacion', 'ΔH° ='), t => /−890,3 kJ/.test(t)); chk('formación masa', await lec('q6_formacion', 'Calor para'), t => /−555 kJ/.test(t));
  await chip('q6_formacion', '[data-pre]', 4); chk('formación CaCO₃', await lec('q6_formacion', 'ΔH° ='), t => /\+178 kJ|\+178,0 kJ/.test(t) || /178/.test(t));
  await chip('q6_formacion', '[data-pre]', 5); chk('formación termita', await lec('q6_formacion', 'ΔH° ='), t => /−851,5 kJ/.test(t));
  await chip('q6_formacion', '[data-pre]', 7); chk('formación NH₃ ox', await lec('q6_formacion', 'ΔH° ='), t => /−905,2 kJ/.test(t));
  // enlaces
  await W('q6_enlaces').scrollIntoViewIfNeeded(); chk('enlaces HCl', await lec('q6_enlaces', 'ΔH ≈'), t => /−183 kJ/.test(t));
  await chip('q6_enlaces', '[data-pre]', 3); chk('enlaces metano', await lec('q6_enlaces', 'ΔH ≈'), t => /−802 kJ/.test(t));
  await chip('q6_enlaces', '[data-pre]', 4); chk('enlaces propano', await lec('q6_enlaces', 'ΔH ≈'), t => /−2008 kJ/.test(t));
  // espontaneidad
  await W('q6_espontaneidad').scrollIntoViewIfNeeded(); chk('esp caliza T', await lec('q6_espontaneidad', 'Temperatura de equilibrio'), t => /1111 K/.test(t)); chk('esp ΔG298', await lec('q6_espontaneidad', 'ΔG a'), t => /\+130,5 kJ/.test(t) && /no espontánea/.test(t));
  await range('q6_espontaneidad', 0, 1300); chk('esp ΔG1300', await lec('q6_espontaneidad', 'ΔG a'), t => /−30,3 kJ/.test(t) && /espontánea/.test(t));
  await chip('q6_espontaneidad', '[data-pre]', 3); chk('esp hielo T', await lec('q6_espontaneidad', 'Temperatura de equilibrio'), t => /273 K/.test(t));
  await chip('q6_espontaneidad', '[data-pre]', 4); chk('esp ozono', await lec('q6_espontaneidad', 'Caso'), t => /nunca espontánea/.test(t));
  // combustibles
  await W('q6_combustibles').scrollIntoViewIfNeeded(); chk('comb Q útil', await lec('q6_combustibles', 'Calor útil'), t => /4180 kJ/.test(t)); chk('comb Q total', await lec('q6_combustibles', 'Calor que hay que producir'), t => /5971 kJ/.test(t));
  await chip('q6_combustibles', '[data-sel]', 0); chk('comb hidrógeno sin CO₂', await lec('q6_combustibles', 'CO₂ emitido'), t => /^0 kg/.test(t));
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); chk('sin desborde horizontal', ov, v => v <= 1);
  console.log(mal ? mal + ' FALLOS de ' + n : n + ' comprobaciones de comportamiento de termoquímica correctas', '· errores JS:', errs.length ? errs : 'ninguno');
  await b.close();
})();
