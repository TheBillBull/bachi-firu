// Prueba de comportamiento (pulsando de verdad) de los simuladores del tema 9 de Matemáticas II
// (m2_signos, m2_absolutos, m2_parametros, m2_problema, m2_lhopital) y de dos reutilizados de Matemáticas I (valormedio, optimizar2).
// Uso: node herramientas/pruebas/e2e_mates2_t9.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates2', 't9');
  let mal = 0, n = 0;
  const W = (nm, i = 0) => p.locator(`#detail-t9 [data-w=${nm}]`).nth(i);
  const lec = async (w, rot) => w.locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const chip = async (w, texto) => { await w.locator('.chip-btn', { hasText: texto }).first().click(); await p.waitForTimeout(80); };
  const rango = async (w, i, v) => { await w.locator('input[type=range]').nth(i).fill(String(v)); await p.waitForTimeout(80); };
  const sinDesborde = async () => p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);

  // ---------- m2_signos ----------
  let w = W('m2_signos'); await w.scrollIntoViewIfNeeded();
  chk('signos: arranca con f′ > 0', await lec(w, 'f′(x)'), t => /crece/.test(t) && !/decrece/.test(t));
  chk('signos: máximo en −1', await lec(w, 'Máximos'), t => /x = −1/.test(t));
  chk('signos: mínimo en 3', await lec(w, 'Mínimos'), t => /x = 3/.test(t));
  chk('signos: inflexión en 1', await lec(w, 'Inflexiones'), t => /x = 1/.test(t));
  await rango(w, 0, 0);
  chk('signos: en x = 0, f′ = −9 decrece', await lec(w, 'f′(x)'), t => /−9/.test(t) && /decrece/.test(t));
  chk('signos: en x = 0, f″ = −6 cóncava', await lec(w, 'f″(x)'), t => /−6/.test(t) && /cóncava/.test(t));
  await rango(w, 0, 3);
  chk('signos: en x = 3, f″ = 12 convexa', await lec(w, 'f″(x)'), t => /12/.test(t) && /convexa/.test(t));
  await chip(w, 'x⁴ − 4x³');
  chk('signos: x⁴−4x³ sin máximos', await lec(w, 'Máximos'), 'ninguno');
  chk('signos: x⁴−4x³ mínimo en 3', await lec(w, 'Mínimos'), t => /x = 3/.test(t));
  chk('signos: x⁴−4x³ inflexiones 0 y 2', await lec(w, 'Inflexiones'), t => /x = 0/.test(t) && /x = 2/.test(t));
  await chip(w, 'e^(−x²)');
  chk('signos: gauss máximo en 0', await lec(w, 'Máximos'), t => /x = 0/.test(t));
  chk('signos: gauss dos inflexiones', await lec(w, 'Inflexiones'), t => /−0,707/.test(t) && /0,707/.test(t));
  chk('signos: sin desborde', await sinDesborde(), true);

  // ---------- m2_absolutos ----------
  w = W('m2_absolutos'); await w.scrollIntoViewIfNeeded();
  chk('abs: máximo 21 en x = 5', await lec(w, 'Máximo absoluto'), t => /^21 en x = 5$/.test(t));
  chk('abs: mínimo 1 en x = 0 y x = 3', await lec(w, 'Mínimo absoluto'), t => /^1 en x = 0 y x = 3$/.test(t));
  chk('abs: 4 candidatos', await w.locator('.m9-t tbody tr').count(), 4);
  await rango(w, 1, 2);
  chk('abs: [0, 2] → 3 candidatos', await w.locator('.m9-t tbody tr').count(), 3);
  chk('abs: [0, 2] máximo 5 en x = 1', await lec(w, 'Máximo absoluto'), t => /^5 en x = 1$/.test(t));
  chk('abs: [0, 2] mínimo 1 en x = 0', await lec(w, 'Mínimo absoluto'), t => /^1 en x = 0$/.test(t));
  chk('abs: fila del máximo resaltada', await w.locator('.m9-t tr.m9-max').count(), 1);
  await chip(w, '|x² − 1|');
  chk('abs: |x²−1| 5 candidatos', await w.locator('.m9-t tbody tr').count(), 5);
  chk('abs: |x²−1| máximo 3 en ±2', await lec(w, 'Máximo absoluto'), t => /^3 en x = −2 y x = 2$/.test(t));
  chk('abs: |x²−1| mínimo 0 en ±1', await lec(w, 'Mínimo absoluto'), t => /^0 en x = −1 y x = 1$/.test(t));
  await chip(w, 'x² si');
  chk('abs: trozos máximo 1 en −1 y 1', await lec(w, 'Máximo absoluto'), t => /^1 en x = −1 y x = 1$/.test(t));
  chk('abs: trozos mínimo −1 en 3', await lec(w, 'Mínimo absoluto'), t => /^−1 en x = 3$/.test(t));
  chk('abs: sin desborde', await sinDesborde(), true);

  // ---------- m2_parametros ----------
  w = W('m2_parametros'); await w.scrollIntoViewIfNeeded();
  chk('par: arranca sin cumplir', await lec(w, 'Conclusión'), t => /Todavía no/.test(t));
  await rango(w, 0, -6);
  chk('par: a = −6 cumple la inflexión', await lec(w, 'Condiciones'), t => /se cumple/.test(t) && /falta/.test(t));
  chk('par: a = −6 y b = 0 aún no', await lec(w, 'Conclusión'), t => /Todavía no/.test(t));
  await rango(w, 1, 9);
  chk('par: a = −6 y b = 9 cumple todo', await lec(w, 'Conclusión'), t => /a = −6 y b = 9/.test(t) && /todas/.test(t));
  await rango(w, 1, 10);
  chk('par: b = 10 lo rompe', await lec(w, 'Conclusión'), t => /Todavía no/.test(t));
  await w.locator('.btn-comprobar', { hasText: 'Mostrar la solución' }).click(); await p.waitForTimeout(80);
  chk('par: solución con cálculo', [await lec(w, 'Conclusión'), await lec(w, 'Cómo se calcula')].join('|'), t => /a = −6 y b = 9/.test(t) && /f″\(2\) = 12 \+ 2a = 0/.test(t));
  await w.locator('.chip-btn', { hasText: 'Reiniciar' }).click(); await p.waitForTimeout(80);
  chk('par: reiniciar quita el cálculo', await lec(w, 'Cómo se calcula'), null);
  await chip(w, 'a·ln x');
  await rango(w, 0, -4); await rango(w, 1, 2);
  chk('par: a ln x + b x² resuelto', await lec(w, 'Conclusión'), t => /a = −4 y b = 2/.test(t));
  await chip(w, '(ax + b)');
  await rango(w, 0, 4); await rango(w, 1, 0);
  chk('par: (ax+b)/(x²+1) resuelto', await lec(w, 'Conclusión'), t => /a = 4 y b = 0/.test(t));
  chk('par: sin desborde', await sinDesborde(), true);

  // ---------- m2_problema ----------
  w = W('m2_problema'); await w.scrollIntoViewIfNeeded();
  chk('prob: arranca con la caja', await w.locator('.m9-enun').innerText(), t => /Caja abierta/.test(t));
  chk('prob: sin pasos al inicio', await w.locator('.m9-sol li').count(), 0);
  await w.locator('.btn-comprobar', { hasText: 'Siguiente paso' }).click(); await p.waitForTimeout(80);
  await w.locator('.btn-comprobar', { hasText: 'Siguiente paso' }).click(); await p.waitForTimeout(80);
  chk('prob: 2 pasos', await w.locator('.m9-sol li').count(), 2);
  for (let i = 0; i < 5; i++) { await w.locator('.btn-comprobar', { hasText: 'Siguiente paso' }).click(); await p.waitForTimeout(40); }
  chk('prob: tope de 5 pasos', await w.locator('.m9-sol li').count(), 5);
  chk('prob: la respuesta final habla de 1024', await w.locator('.m9-sol li').last().innerText(), t => /1024/.test(t));
  await w.locator('.chip-btn', { hasText: 'Reiniciar pasos' }).click(); await p.waitForTimeout(80);
  chk('prob: reiniciar vacía los pasos', await w.locator('.m9-sol li').count(), 0);
  await rango(w, 0, 4);
  chk('prob: x = 4 da V ≈ 1024', await lec(w, 'Tu valor'), t => /1024/.test(t));
  await chip(w, 'Lata de 500');
  chk('prob: cambia a la lata', await w.locator('.m9-enun').innerText(), t => /500 cm/.test(t));
  chk('prob: la lata es un mínimo', await lec(w, 'Función objetivo'), t => /2πr²/.test(t));
  await chip(w, 'Ventana');
  chk('prob: ventana', await w.locator('.m9-enun').innerText(), t => /Ventana normanda/.test(t));
  await chip(w, 'Distancia');
  await w.locator('.btn-comprobar', { hasText: 'Siguiente paso' }).click(); await p.waitForTimeout(80);
  chk('prob: distancia, paso 1 menciona d²', await w.locator('.m9-sol li').first().innerText(), t => /d²/.test(t));
  chk('prob: sin desborde', await sinDesborde(), true);

  // ---------- m2_lhopital ----------
  w = W('m2_lhopital'); await w.scrollIntoViewIfNeeded();
  chk('lh: sen x/x, 4 filas y 3 columnas', [await w.locator('.m9-t tbody tr').count(), await w.locator('.m9-t thead th').count()].join(','), '4,3');
  chk('lh: sen x/x último ≈ 1', await w.locator('.m9-t tbody tr').last().locator('td').nth(1).innerText(), t => /^1(,0+)?$|^0,9999/.test(t.trim()));
  await chip(w, '(eˣ − 1 − x)');
  chk('lh: eˣ−1−x: 4 columnas', await w.locator('.m9-t thead th').count(), 4);
  chk('lh: eˣ−1−x: f″/g″ → 0,5', await w.locator('.m9-t tbody tr').last().locator('td').nth(3).innerText(), t => /^0,500/.test(t.trim()));
  chk('lh: límite 1/2', await lec(w, 'Límite'), '1/2');
  await chip(w, 'x² / eˣ');
  chk('lh: x²/eˣ límite 0', await lec(w, 'Límite'), '0');
  await chip(w, 'TRAMPA');
  chk('lh: trampa avisa', await lec(w, 'Límite'), t => /no tiene límite/.test(t));
  const col = await w.locator('.m9-t tbody tr').evaluateAll(trs => trs.map(t => t.querySelectorAll('td')[2].innerText));
  chk('lh: trampa, f′/g′ no converge', new Set(col).size > 2, true);
  chk('lh: sin desborde', await sinDesborde(), true);

  // ---------- reutilizados de Matemáticas I ----------
  w = W('valormedio'); await w.scrollIntoViewIfNeeded();
  chk('valormedio: monta y lee la pendiente', await lec(w, 'Pendiente'), t => t != null);
  w = W('optimizar2'); await w.scrollIntoViewIfNeeded();
  await w.locator('.btn-comprobar', { hasText: 'Mostrar' }).click(); await p.waitForTimeout(80);
  chk('optimizar2: muestra el óptimo', await lec(w, 'Óptimo'), t => t != null);
  chk('optimizar2: sin desborde', await sinDesborde(), true);

  chk('sin errores JS', errs.length, 0);
  console.log(mal ? mal + ' FALLOS de ' + n : 'todo bien · ' + n + ' comprobaciones');
  await b.close();
})();
