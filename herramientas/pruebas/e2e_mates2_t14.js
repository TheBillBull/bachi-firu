// Prueba de comportamiento (pulsando de verdad) de los cinco simuladores nuevos del tema 14 de Matemáticas II (distribuciones de probabilidad).
// Uso: node herramientas/pruebas/e2e_mates2_t14.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates2', 't14');
  let mal = 0, n = 0;
  const W = (nm, i = 0) => p.locator(`#detail-t14 [data-w=${nm}]`).nth(i);
  const lec = async (w, rot) => w.locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(función)' : JSON.stringify(esp)); } };
  const chip = async (w, texto) => { await w.locator('.chip-btn', { hasText: texto }).first().click(); await p.waitForTimeout(80); };
  const slide = async (w, i, v) => { await w.locator('input[type=range]').nth(i).evaluate((el, val) => { el.value = val; el.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(80); };
  const rojas = async (w) => w.locator('svg.plot').first().locator('rect.z-red').count();
  const visible = async (w, i) => w.locator('label').nth(i).isVisible();
  const desborde = async () => p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);

  // ---------- m2t14_discreta ----------
  let w = W('m2t14_discreta'); await w.scrollIntoViewIfNeeded();
  chk('discreta: dado μ = 3,5', await lec(w, 'Media'), t => /= 3,5$/.test(t));
  chk('discreta: dado σ = 1,7078', await lec(w, 'Desviación'), '1,7078');
  chk('discreta: ΣP = 1', await lec(w, 'Comprobación'), '1');
  await chip(w, 'Suma de 2');
  chk('discreta: suma de dos dados μ = 7', await lec(w, 'Media'), t => /= 7$/.test(t));
  chk('discreta: suma de dos dados σ = 2,4152', await lec(w, 'Desviación'), '2,4152');
  await chip(w, 'Juego');
  chk('discreta: juego justo μ = 0', await lec(w, 'Media'), t => /= 0$/.test(t));
  await chip(w, 'Tabla dada');
  chk('discreta: tabla μ = 1,75', await lec(w, 'Media'), t => /= 1,75$/.test(t));
  chk('discreta: tabla σ = 0,9937', await lec(w, 'Desviación'), '0,9937');
  chk('discreta: 5 barras', await w.locator('svg.plot rect.z-pen').count(), 5);

  // ---------- m2t14_binom ----------
  w = W('m2t14_binom'); await w.scrollIntoViewIfNeeded();
  chk('binom: arranca B(10; 0,3)', await lec(w, 'Modelo'), t => /B\(10; 0,3\)/.test(t));
  chk('binom: P(X = 3) = 0,2668', await lec(w, 'Probabilidad'), t => /= 0,2668$/.test(t));
  chk('binom: una barra roja', await rojas(w), 1);
  chk('binom: b oculto en P(X = k)', await visible(w, 3), false);
  await chip(w, 'P(X ≥ k)');
  chk('binom: P(X ≥ 3) = 0,6172', await lec(w, 'Probabilidad'), t => /= 0,6172$/.test(t));
  chk('binom: barras rojas 3..10 = 8', await rojas(w), 8);
  await chip(w, 'P(X ≤ k)');
  chk('binom: P(X ≤ 3) = 0,6496', await lec(w, 'Probabilidad'), t => /= 0,6496$/.test(t));
  chk('binom: barras rojas 0..3 = 4', await rojas(w), 4);
  await chip(w, 'P(a ≤ X ≤ b)');
  chk('binom: b visible en entre', await visible(w, 3), true);
  await slide(w, 3, 5);
  chk('binom: P(3 ≤ X ≤ 5) = 0,5699', await lec(w, 'Probabilidad'), t => /= 0,5699$/.test(t));
  chk('binom: 3 barras rojas', await rojas(w), 3);
  await slide(w, 2, 8);
  chk('binom: al subir a por encima de b, b sube (8 ≤ b)', await w.locator('input[type=range]').nth(3).evaluate(e => +e.value), 8);
  await slide(w, 0, 20);
  chk('binom: media n·p = 6', await lec(w, 'Media'), '6');
  await chip(w, 'P(X = k)'); await slide(w, 0, 5); await slide(w, 1, 0.5); await slide(w, 2, 2);
  chk('binom: B(5; 0,5) P(X = 2) = 0,3125', await lec(w, 'Probabilidad'), t => /= 0,3125$/.test(t));
  chk('binom: k se recorta a n', await w.locator('input[type=range]').nth(2).evaluate(e => +e.max), 5);

  // ---------- m2t14_normal ----------
  w = W('m2t14_normal'); await w.scrollIntoViewIfNeeded();
  chk('normal: modelo pesos N(70; 8)', await lec(w, 'Modelo'), t => /N\(70; 8\)/.test(t));
  chk('normal: z = −1 al tipificar 62', await lec(w, 'Tipificación'), t => /= −1$/.test(t));
  chk('normal: Φ(−1) = 0,1587', await lec(w, 'Con la tabla'), t => /= 0,1587$/.test(t));
  chk('normal: valor exacto 0,1587', await lec(w, 'Valor exacto'), t => /^0,1587/.test(t));
  await chip(w, 'P(X ≥ a)');
  chk('normal: P(X ≥ 62) = 0,8413', await lec(w, 'Con la tabla'), t => /= 0,8413$/.test(t));
  await chip(w, 'P(a ≤ X ≤ b)');
  chk('normal: P(62 ≤ X ≤ 82) = 0,7745', await lec(w, 'Con la tabla'), t => /= 0,7745$/.test(t));
  chk('normal: b visible', await visible(w, 3), true);
  await chip(w, 'Estándar');
  chk('normal: estándar N(0; 1)', await lec(w, 'Modelo'), t => /N\(0; 1\)/.test(t));
  chk('normal: estándar P(−1 ≤ Z ≤ 1,5) = 0,7745', await lec(w, 'Con la tabla'), t => /= 0,7745$/.test(t));
  await chip(w, 'Notas');
  chk('normal: notas P(5 ≤ X ≤ 8) → z −0,67 y 1,33', await lec(w, 'Tipificación'), t => /−0,67/.test(t) && /1,33/.test(t));
  await slide(w, 1, 3);   // σ = 3
  chk('normal: tras cambiar σ el rango de a sigue siendo válido', await w.locator('input[type=range]').nth(2).evaluate(e => +e.min < +e.value && +e.value < +e.max), true);
  await chip(w, 'P(X ≤ a)'); await slide(w, 2, 6);
  chk('normal: P(X ≤ μ) = 0,5', await lec(w, 'Con la tabla'), t => /= 0,5$/.test(t));

  // ---------- m2t14_inversa ----------
  w = W('m2t14_inversa'); await w.scrollIntoViewIfNeeded();
  chk('inversa: arranca con 90 %: z = 1,28', await lec(w, 'Búsqueda'), t => /0,8997/.test(t) && /z = 1,28/.test(t));
  chk('inversa: k = 80,24', await lec(w, 'Destipifica'), t => /= 80,24$/.test(t));
  await chip(w, 'P(X ≥ k)');
  chk('inversa: P(X ≥ k) = 0,9 → z = −1,28 y k = 59,76', await lec(w, 'Destipifica'), t => /= 59,76$/.test(t));
  await chip(w, 'central'); await slide(w, 0, 0.95);
  chk('inversa: central 95 % → z = 1,96', await lec(w, 'Búsqueda'), t => /z = 1,96/.test(t));
  chk('inversa: central 95 % → [54,32; 85,68]', await lec(w, 'Destipifica'), t => /85,68/.test(t) && /54,32/.test(t));
  await chip(w, 'Tiempos'); await chip(w, 'P(X ≤ k)'); await slide(w, 0, 0.8);
  chk('inversa: tiempos 80 % → k = 28,36', await lec(w, 'Destipifica'), t => /= 28,36$/.test(t));
  await slide(w, 0, 0.2);
  chk('inversa: 20 % → z negativa', await lec(w, 'Búsqueda'), t => /z = −0,84/.test(t));

  // ---------- m2t14_aprox ----------
  w = W('m2t14_aprox'); await w.scrollIntoViewIfNeeded();
  chk('aprox: B(40; 0,5) ≈ N(20; 3,162)', await lec(w, 'Modelo'), t => /N\(20; 3,162\)/.test(t));
  chk('aprox: exacto P(X ≤ 22) = 0,7852', await lec(w, 'Valor exacto'), '0,7852');
  chk('aprox: con corrección 0,7854', await lec(w, 'Normal CON'), t => /^0,7854/.test(t));
  chk('aprox: sin corrección 0,7365', await lec(w, 'Normal SIN'), t => /^0,7365/.test(t));
  chk('aprox: condición cumplida', await lec(w, '¿Vale'), t => /✓/.test(t));
  await chip(w, 'P(X = k)');
  chk('aprox: P(X = 22) exacto 0,1031', await lec(w, 'Valor exacto'), '0,1031');
  chk('aprox: en igualdad no hay fila sin corrección', await w.locator('.lec', { hasText: 'SIN' }).count(), 0);
  await chip(w, 'P(X ≥ k)');
  chk('aprox: P(X ≥ 22) exacto 0,3179', await lec(w, 'Valor exacto'), '0,3179');
  await slide(w, 0, 20); await slide(w, 1, 0.05);
  chk('aprox: B(20; 0,05) no cumple la condición', await lec(w, '¿Vale'), t => /✗/.test(t));
  chk('aprox: k recortado a n', await w.locator('input[type=range]').nth(2).evaluate(e => +e.max), 20);

  chk('sin desborde horizontal', await desborde(), true);
  console.log(`${n} comprobaciones, ${mal} fallos · errores JS: ${errs.length ? errs.join(' | ') : 'ninguno'}`);
  await b.close(); process.exit(mal || errs.length ? 1 : 0);
})();
