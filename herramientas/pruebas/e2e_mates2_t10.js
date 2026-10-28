// Prueba de comportamiento (pulsando de verdad) de los cinco simuladores nuevos del tema 10 de Matemáticas II.
// Uso: node herramientas/pruebas/e2e_mates2_t10.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates2', 't10');
  let mal = 0, n = 0;
  const W = (nm, i = 0) => p.locator(`#detail-t10 [data-w=${nm}]`).nth(i);
  const lec = async (w, rot) => w.locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(función)' : JSON.stringify(esp)); } };
  const chip = async (w, texto) => { await w.locator('.chip-btn', { hasText: texto }).first().click(); await p.waitForTimeout(60); };
  const curvas = async (w, i = 0) => w.locator('svg.plot').nth(i).locator('path.p-curva').count();

  // ---------- m2t10_estudio ----------
  let w = W('m2t10_estudio'); await w.scrollIntoViewIfNeeded();
  chk('estudio: arranca en el paso 1', await w.locator('.m10-paso').innerText(), t => /1\. Dominio/.test(t));
  chk('estudio: paso 1 sin curva', await curvas(w), 0);
  chk('estudio: paso 1 muestra dominio', await lec(w, 'Dominio'), t => /1/.test(t));
  chk('estudio: anterior desactivado', await w.locator('button', { hasText: 'Paso anterior' }).isDisabled(), true);
  const sig = w.locator('[data-sig]');
  await sig.click(); await p.waitForTimeout(40);
  chk('estudio: paso 2 → cortes', await lec(w, 'Cortes'), t => /\(0, 0\)/.test(t));
  chk('estudio: paso 2 sin curva', await curvas(w), 0);
  await sig.click(); await sig.click(); await p.waitForTimeout(40);
  chk('estudio: paso 4 → extremos', await lec(w, 'Monotonía'), t => /máx \(0, 0\)/.test(t));
  chk('estudio: paso 4 sin curva aún', await curvas(w), 0);
  await sig.click(); await sig.click(); await p.waitForTimeout(40);
  chk('estudio: paso 6 → hay curva', await curvas(w), t => t >= 1);
  chk('estudio: siguiente desactivado al final', await sig.isDisabled(), true);
  await w.locator('button', { hasText: 'Paso anterior' }).click(); await p.waitForTimeout(40);
  chk('estudio: anterior quita la curva', await curvas(w), 0);
  await chip(w, '2x/(x² − 1)');
  chk('estudio: cambiar de función vuelve al paso 1', await w.locator('.m10-paso').innerText(), t => /1\. Dominio/.test(t));
  await w.locator('button', { hasText: 'gráfica completa' }).click(); await p.waitForTimeout(60);
  chk('estudio 2: inflexión (0, 0)', await lec(w, 'Curvatura'), t => /inflexión \(0, 0\)/.test(t));
  chk('estudio 2: curva dibujada', await curvas(w), t => t >= 1);
  for (const t of ['x·e', '(ln x)', 'x·√', '|x²', 'eˣ/x']) { await chip(w, t); await w.locator('button', { hasText: 'gráfica completa' }).click(); await p.waitForTimeout(40); chk('estudio ' + t + ': curva', await curvas(w), k => k >= 1); }

  // ---------- m2t10_ramas ----------
  w = W('m2t10_ramas'); await w.scrollIntoViewIfNeeded();
  chk('ramas 1: oblicua', await lec(w, 'Tipo'), 'oblicua');
  chk('ramas 1: conclusión y = x + 1', await lec(w, 'Conclusión'), t => /y = x \+ 1/.test(t));
  chk('ramas 1: tabla de 4 filas', await w.locator('.m10-t tr').count(), 5);
  await w.locator('.chip-btn', { hasText: '−∞' }).click(); await p.waitForTimeout(40);
  chk('ramas 1: −∞ también y = x + 1', await lec(w, 'Conclusión'), t => /y = x \+ 1/.test(t));
  await chip(w, '√(x² + 1)');
  chk('ramas 2: −∞ → y = −x', await lec(w, 'Conclusión'), t => /y = −x/.test(t));
  await w.locator('.chip-btn', { hasText: '+∞' }).click(); await p.waitForTimeout(40);
  chk('ramas 2: +∞ → y = x', await lec(w, 'Conclusión'), t => /y = x$|y = x\./.test(t));
  await chip(w, 'x·e');
  chk('ramas 4: +∞ horizontal', await lec(w, 'Tipo'), 'horizontal');
  await w.locator('.chip-btn', { hasText: '−∞' }).click(); await p.waitForTimeout(40);
  chk('ramas 4: −∞ parabólica', await lec(w, 'Tipo'), 'parabólica');
  await chip(w, 'ln x');
  chk('ramas 6: ln x solo +∞, parabólica', await lec(w, 'Tipo'), 'parabólica');

  // ---------- m2t10_fprima ----------
  w = W('m2t10_fprima'); await w.scrollIntoViewIfNeeded();
  chk('fprima 1: máximo en −1 y mínimo en 3', await lec(w, 'Ceros'), t => /x = −1[^·]*máximo/.test(t) && /x = 3[^·]*mínimo/.test(t));
  chk('fprima 1: inflexión en 1', await lec(w, 'Extremos de f′'), t => /x = 1 /.test(t));
  const antes = await curvas(w, 1);
  await w.locator('[data-mostrar]').click(); await p.waitForTimeout(60);
  chk('fprima: «Mostrar f» dibuja f', await curvas(w, 1), t => t > antes);
  const h0 = await w.locator('svg.plot').nth(1).innerHTML();
  await w.locator('input[type=range]').fill('2'); await p.waitForTimeout(60);
  chk('fprima: la constante cambia f', (await w.locator('svg.plot').nth(1).innerHTML()) !== h0, true);
  await chip(w, '(1 − x)'); chk('fprima 2: máximo en 1', await lec(w, 'Ceros'), t => /x = 1[^·]*máximo/.test(t));
  await chip(w, '2x/(x² + 1)'); chk('fprima 3: mínimo en 0', await lec(w, 'Ceros'), t => /x = 0[^·]*mínimo/.test(t));
  chk('fprima 3: dos inflexiones', await lec(w, 'Extremos de f′'), t => (t.match(/x = /g) || []).length === 2);
  await chip(w, 'x³ − 2x'); chk('fprima 4: tres extremos', await lec(w, 'Ceros'), t => (t.match(/x = /g) || []).length === 3);
  await chip(w, 'cuidado'); chk('fprima 5: sin extremo', await lec(w, 'Ceros'), t => /sin extremo/.test(t) && !/máximo|mínimo/.test(t));
  chk('fprima 5: inflexión en 0', await lec(w, 'Extremos de f′'), t => /x = 0 /.test(t));

  // ---------- m2t10_formula ----------
  w = W('m2t10_formula'); await w.scrollIntoViewIfNeeded();
  chk('formula 1: arranca sin cumplir', await w.locator('.m10-cond.ok').count(), 0);
  chk('formula 1: tres deslizadores', await w.locator('input[type=range]').count(), 3);
  await w.locator('[data-solve]').click(); await p.waitForTimeout(60);
  chk('formula 1: solución cumple los 3', await w.locator('.m10-cond.ok').count(), 3);
  chk('formula 1: muestra ecuaciones', await w.locator('.m10-conds').innerText(), t => /c = −2/.test(t));
  await w.locator('input[type=range]').nth(1).fill('0'); await p.waitForTimeout(40);
  chk('formula 1: cambiar b rompe una condición', await w.locator('.m10-cond.ok').count(), 2);
  await chip(w, 'x³ + ax²'); await w.locator('[data-solve]').click(); await p.waitForTimeout(60);
  chk('formula 2: solución cumple los 3', await w.locator('.m10-cond.ok').count(), 3);
  await chip(w, '(ax + b)·eˣ'); chk('formula 3: dos deslizadores', await w.locator('input[type=range]').count(), 2);
  await w.locator('[data-solve]').click(); await p.waitForTimeout(60);
  chk('formula 3: solución cumple las 2', await w.locator('.m10-cond.ok').count(), 2);
  await chip(w, 'a·ln x'); await w.locator('[data-solve]').click(); await p.waitForTimeout(60);
  chk('formula 4: solución cumple las 2', await w.locator('.m10-cond.ok').count(), 2);

  // ---------- m2t10_coherente ----------
  w = W('m2t10_coherente'); await w.scrollIntoViewIfNeeded();
  chk('coherente: tres esbozos', await w.locator('.m10-c').count(), 3);
  await w.locator('[data-c=mal]').first().click(); await p.waitForTimeout(40);
  chk('coherente: error → explicación', await w.locator('.w-pie').innerText(), t => /^No/.test(t));
  await w.locator('[data-c=ok]').click(); await p.waitForTimeout(40);
  chk('coherente: acierto', await w.locator('.w-pie').innerText(), t => /^Correcto/.test(t));
  for (const t of ['Tabla 2', 'Tabla 3']) { await chip(w, t); await w.locator('[data-c=ok]').click(); await p.waitForTimeout(40); chk('coherente ' + t, await w.locator('.w-pie').innerText(), s => /^Correcto/.test(s)); }

  // ---------- general ----------
  const desborde = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
  chk('sin desborde horizontal', desborde, false);
  chk('sin errores JS', errs.length, 0);
  if (errs.length) console.log(errs.slice(0, 3));
  console.log(mal ? `${mal} FALLOS de ${n}` : `todo bien: ${n} comprobaciones`);
  await b.close(); process.exit(mal ? 1 : 0);
})();
