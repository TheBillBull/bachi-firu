// Prueba de comportamiento (pulsando de verdad) de los simuladores del tema 11 de Matemáticas II
// (m2_familia, m2_partes, m2_fracciones).
// Uso: node herramientas/pruebas/e2e_mates2_t11.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates2', 't11');
  let mal = 0, n = 0;
  const W = (nm, i = 0) => p.locator(`#detail-t11 [data-w=${nm}]`).nth(i);
  const lec = async (w, rot) => w.locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const chip = async (w, texto) => { await w.locator('.chip-btn', { hasText: texto }).first().click(); await p.waitForTimeout(80); };
  const rango = async (w, i, v) => { await w.locator('input[type=range]').nth(i).fill(String(v)); await p.waitForTimeout(80); };
  const sinDesborde = async () => p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);

  // ---------- m2_familia ----------
  let w = W('m2_familia'); await w.scrollIntoViewIfNeeded();
  chk('familia: pendiente de 2x−3 en x₀ = 2 es 1', await lec(w, 'Pendiente'), '1');
  chk('familia: C necesaria 3', await lec(w, 'C que hace'), t => /= 3$/.test(t));
  chk('familia: arranca sin pasar', await lec(w, '¿Pasa'), t => /Aún no/.test(t));
  await w.locator('.btn-comprobar', { hasText: 'Ajustar C' }).click(); await p.waitForTimeout(80);
  chk('familia: tras ajustar, pasa por el punto', await lec(w, '¿Pasa'), t => /^Sí/.test(t));
  chk('familia: F(x₀) = 1', await lec(w, 'F(x₀)'), '1');
  await rango(w, 0, -2);
  chk('familia: C = −2 deja de pasar', await lec(w, '¿Pasa'), t => /Aún no/.test(t));
  chk('familia: la pendiente no depende de C', await lec(w, 'Pendiente'), '1');
  await rango(w, 1, 3);
  chk('familia: pendiente en x₀ = 3 es 3', await lec(w, 'Pendiente'), '3');
  await chip(w, 'cos x');
  chk('familia: cos x, F = sen x', await lec(w, 'Una primitiva'), t => /sen x/.test(t));
  chk('familia: cos x, pendiente en 0 es 1', await lec(w, 'Pendiente'), '1');
  await w.locator('.btn-comprobar', { hasText: 'Ajustar C' }).click(); await p.waitForTimeout(80);
  chk('familia: cos x, C = 2 pasa por (0, 2)', await lec(w, '¿Pasa'), t => /^Sí/.test(t));
  await chip(w, '1/x');
  chk('familia: 1/x, C necesaria 2', await lec(w, 'C que hace'), t => /= 2$/.test(t));
  await chip(w, 'x·eˣ');
  chk('familia: x·eˣ, F(0)+C con y₀ = 1 → C = 2', await lec(w, 'C que hace'), t => /= 2$/.test(t));
  chk('familia: sin desborde', await sinDesborde(), true);

  // ---------- m2_partes ----------
  w = W('m2_partes'); await w.scrollIntoViewIfNeeded();
  chk('partes: arranca sin veredicto', await w.locator('.m11-veredicto').isHidden(), true);
  await w.locator('.m11-opc .chip-btn').nth(0).click(); await p.waitForTimeout(80);
  chk('partes: u = x es buena', await w.locator('.m11-veredicto').innerText(), t => /^Buena elección/.test(t));
  chk('partes: v = eˣ', await lec(w, 'v'), 'eˣ');
  chk('partes: integral que queda ∫ eˣ dx', await lec(w, 'Integral que queda'), t => /∫ eˣ dx/.test(t));
  chk('partes: muestra el resultado', await w.locator('.m11-sol').innerText(), t => /\(x − 1\)·eˣ/.test(t));
  await w.locator('.m11-opc .chip-btn').nth(1).click(); await p.waitForTimeout(80);
  chk('partes: u = eˣ es mala', await w.locator('.m11-veredicto').innerText(), t => /^Mala elección/.test(t) && /SUBIDO/.test(t));
  chk('partes: mala elección no da solución', await w.locator('.m11-sol').innerText(), '');
  await chip(w, 'x·ln x');
  chk('partes: cambiar de integral reinicia', await w.locator('.m11-veredicto').isHidden(), true);
  await w.locator('.m11-opc .chip-btn').nth(1).click(); await p.waitForTimeout(80);
  chk('partes: x ln x con u = x es mala', await w.locator('.m11-veredicto').innerText(), t => /Círculo vicioso/.test(t));
  await w.locator('.m11-opc .chip-btn').nth(0).click(); await p.waitForTimeout(80);
  chk('partes: x ln x con u = ln x es buena', await w.locator('.m11-veredicto').innerText(), t => /^Buena/.test(t));
  await chip(w, 'eˣ·cos x');
  await w.locator('.m11-opc .chip-btn').nth(1).click(); await p.waitForTimeout(80);
  chk('partes: eˣ cos x también vale con u = eˣ', await w.locator('.m11-veredicto').innerText(), t => /^Buena/.test(t) && /criterio/.test(t));
  chk('partes: cíclica, resultado ½', await w.locator('.m11-sol').innerText(), t => /½·eˣ·\(sen x \+ cos x\)/.test(t));
  await chip(w, 'arctg x');
  chk('partes: arctg tiene dos opciones', await w.locator('.m11-opc .chip-btn').count(), 2);
  chk('partes: sin desborde', await sinDesborde(), true);

  // ---------- m2_fracciones ----------
  w = W('m2_fracciones'); await w.scrollIntoViewIfNeeded();
  chk('fracciones: arranca sin coincidir', await lec(w, 'Diferencia'), t => !/coincide/.test(t));
  await rango(w, 0, 2); await rango(w, 1, 3);
  chk('fracciones: A = 2, B = 3 coincide', await lec(w, 'Diferencia'), t => /coincide/.test(t));
  chk('fracciones: muestra los valores correctos', await lec(w, 'Valor correcto'), t => /A = 2/.test(t) && /B = 3/.test(t));
  await rango(w, 1, 2);
  chk('fracciones: B = 2 ya no coincide', await lec(w, 'Diferencia'), t => !/coincide/.test(t));
  chk('fracciones: da pista', await lec(w, 'Valor correcto'), t => /Quita denominadores/.test(t));
  await w.locator('.btn-comprobar', { hasText: 'Siguiente paso' }).click(); await p.waitForTimeout(60);
  chk('fracciones: 1 paso', await w.locator('.m11-sol li').count(), 1);
  await w.locator('.btn-comprobar', { hasText: 'Siguiente paso' }).click(); await p.waitForTimeout(60);
  chk('fracciones: 2 pasos', await w.locator('.m11-sol li').count(), 2);
  await w.locator('.chip-btn', { hasText: 'Ver todos' }).click(); await p.waitForTimeout(60);
  chk('fracciones: 5 pasos', await w.locator('.m11-sol li').count(), 5);
  chk('fracciones: el último da la primitiva', await w.locator('.m11-sol li').last().innerText(), t => /2·ln\|x−1\| \+ 3·ln\|x\+2\|/.test(t));
  await w.locator('.chip-btn', { hasText: 'Reiniciar' }).click(); await p.waitForTimeout(60);
  chk('fracciones: reiniciar borra pasos', await w.locator('.m11-sol li').count(), 0);
  chk('fracciones: reiniciar pone A = 0', await lec(w, 'Tu descomposición'), t => /A = 0/.test(t));
  await chip(w, 'Hay que dividir');
  chk('fracciones: caso con tres parámetros', await w.locator('input[type=range]:visible').count(), 3);
  await rango(w, 0, 1); await rango(w, 1, -1); await rango(w, 2, 2);
  chk('fracciones: Q = 1, A = −1, B = 2 coincide', await lec(w, 'Diferencia'), t => /coincide/.test(t));
  await chip(w, 'Raíz doble');
  await chip(w, 'Raíz doble');
  await rango(w, 0, 0.5); await rango(w, 1, 1); await rango(w, 2, 0.5);
  chk('fracciones: doble A = ½, B = 1, C = ½ coincide', await lec(w, 'Diferencia'), t => /coincide/.test(t));
  await chip(w, 'irreducible');
  await rango(w, 0, 2); await rango(w, 1, -2); await rango(w, 2, -2);
  chk('fracciones: irreducible 2, −2, −2 coincide', await lec(w, 'Diferencia'), t => /coincide/.test(t));
  await rango(w, 2, -1);
  chk('fracciones: irreducible C = −1 no coincide', await lec(w, 'Diferencia'), t => !/coincide/.test(t));
  chk('fracciones: sin desborde', await sinDesborde(), true);

  chk('sin errores JS', errs.length, 0);
  console.log(mal ? mal + ' FALLOS de ' + n : 'todo bien · ' + n + ' comprobaciones');
  await b.close();
})();
