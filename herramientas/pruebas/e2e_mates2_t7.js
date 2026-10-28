// Prueba de comportamiento (pulsando de verdad) de los simuladores nuevos del tema 7 de Matemáticas II
// (m2_empalme, m2_numero_e) y de dos reutilizados de Matemáticas I (bolzano, trozos).
// Uso: node herramientas/pruebas/e2e_mates2_t7.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates2', 't7');
  let mal = 0, n = 0;
  const W = (nm, i = 0) => p.locator(`#detail-t7 [data-w=${nm}]`).nth(i);
  const lec = async (w, rot) => w.locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const chip = async (w, texto) => { await w.locator('.chip-btn', { hasText: texto }).first().click(); await p.waitForTimeout(60); };
  const rango = async (w, i, v) => { await w.locator('input[type=range]').nth(i).fill(String(v)); await p.waitForTimeout(60); };
  const sinDesborde = async () => p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);

  // ---------- m2_empalme ----------
  let w = W('m2_empalme'); await w.scrollIntoViewIfNeeded();
  chk('empalme: arranca discontinua (a = 0)', await lec(w, 'Conclusión'), t => /no es continua/.test(t));
  await rango(w, 0, 1);
  chk('empalme: a = 1 la hace continua', await lec(w, 'Conclusión'), t => /continua en todo/.test(t) && /a = 1/.test(t));
  await rango(w, 0, 2);
  chk('empalme: a = 2 vuelve a romperla', await lec(w, 'Conclusión'), t => /no es continua/.test(t));
  chk('empalme: se ve el salto', await lec(w, 'Empalmes'), t => /salto de 2/.test(t));
  await w.locator('.btn-comprobar', { hasText: 'Mostrar la solución' }).click(); await p.waitForTimeout(60);
  chk('empalme: la solución sale con cálculo', [await lec(w, 'Conclusión'), await lec(w, 'Cómo se calcula')].join('|'), t => /continua en todo/.test(t) && /2a \+ 1 = 3/.test(t));
  await w.locator('.chip-btn', { hasText: 'Reiniciar' }).click(); await p.waitForTimeout(60);
  chk('empalme: reiniciar quita el cálculo', await lec(w, 'Cómo se calcula'), null);
  await chip(w, 'Dos parámetros');
  chk('empalme: dos deslizadores', await w.locator('input[type=range]').count(), 2);
  await rango(w, 0, 0.5); chk('empalme: a = 0,5 solo no basta', await lec(w, 'Conclusión'), t => /no es continua/.test(t));
  await rango(w, 1, 1.5); chk('empalme: a = 0,5 y b = 1,5 es continua', await lec(w, 'Conclusión'), t => /continua en todo/.test(t) && /b = 1,5/.test(t));
  await chip(w, 'sen(ax)');
  chk('empalme: sen(ax) arranca rota', await lec(w, 'Conclusión'), t => /no es continua/.test(t));
  await rango(w, 0, 6); chk('empalme: a = 6 arregla el lado izquierdo', await lec(w, 'Empalmes'), t => /por la izquierda 6/.test(t));
  await rango(w, 1, 5); chk('empalme: a = 6 y b = 5 es continua', await lec(w, 'Conclusión'), t => /continua en todo/.test(t));
  await chip(w, 'Hueco');
  await w.locator('.btn-comprobar', { hasText: 'Mostrar la solución' }).click(); await p.waitForTimeout(60);
  chk('empalme: hueco k = 0,25 continua', await lec(w, 'Conclusión'), t => /continua en todo/.test(t) && /k = 0,25/.test(t));
  await rango(w, 0, 0.5); chk('empalme: k = 0,5 deja un hueco', await lec(w, 'Conclusión'), t => /no es continua/.test(t));
  chk('empalme: sin desborde', await sinDesborde(), true);

  // ---------- m2_numero_e ----------
  w = W('m2_numero_e'); await w.scrollIntoViewIfNeeded();
  chk('e: arranca (1+1/x)^x, L = 1', await lec(w, 'L = lím'), '1');
  chk('e: 6 filas de tabla en el infinito', await w.locator('.m7-t tbody tr').count(), 6);
  chk('e: la última fila se acerca a e', await w.locator('.m7-t tbody tr').last().locator('td').nth(1).innerText(), t => /^2,7182/.test(t.trim()));
  await chip(w, '((x+3)/(x−1))');
  chk('e: L = 8', await lec(w, 'L = lím'), '8'); chk('e: resultado e^8 ≈ 2980,95', await lec(w, 'Resultado'), t => /2980,9/.test(t));
  await chip(w, '((x−1)/(x+2))');
  chk('e: L = −3', await lec(w, 'L = lím'), '−3'); chk('e: e^−3 ≈ 0,04979', await lec(w, 'Resultado'), t => /0,0497/.test(t));
  await chip(w, '(1 + 3x)');
  chk('e: en 0, 5 filas', await w.locator('.m7-t tbody tr').count(), 5);
  chk('e: en 0, el último valor ≈ 20,08', await w.locator('.m7-t tbody tr').last().locator('td').nth(1).innerText(), t => /^20,0/.test(t.trim()));
  await chip(w, '(cos x)');
  chk('e: cos^(1/x²): L = −0,5', await lec(w, 'L = lím'), '−0,5'); chk('e: resultado ≈ 0,6065', await lec(w, 'Resultado'), t => /0,6065/.test(t));
  chk('e: sin desborde', await sinDesborde(), true);

  // ---------- bolzano (reutilizado) ----------
  w = W('bolzano'); await w.scrollIntoViewIfNeeded();
  await w.locator('.btn-comprobar', { hasText: 'Dividir' }).click(); await p.waitForTimeout(60);
  chk('bolzano: un paso en la tabla', await w.locator('.bz-tab tbody tr').count(), 1);
  await w.locator('.chip-btn', { hasText: '10 pasos' }).click(); await p.waitForTimeout(60);
  chk('bolzano: 11 pasos', await w.locator('.bz-tab tbody tr').count(), 11);
  await w.locator('.chip-btn', { hasText: 'Reiniciar' }).click(); await p.waitForTimeout(60);
  chk('bolzano: reiniciar vacía la tabla', await w.locator('.bz-tab tbody tr').count(), 0);

  // ---------- trozos (reutilizado) ----------
  w = W('trozos'); await w.scrollIntoViewIfNeeded();
  await chip(w, 'Con salto');
  chk('trozos: salto detectado', await lec(w, 'Evaluación'), t => t != null);
  chk('trozos: sin desborde', await sinDesborde(), true);

  chk('sin errores JS', errs.length, 0);
  console.log(mal ? mal + ' FALLOS de ' + n : 'todo bien · ' + n + ' comprobaciones');
  await b.close();
})();
