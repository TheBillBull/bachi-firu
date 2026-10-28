// Prueba de comportamiento (pulsando de verdad) de los cinco simuladores nuevos del tema 12 de Matemáticas II (integral definida).
// Uso: node herramientas/pruebas/e2e_mates2_t12.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates2', 't12');
  let mal = 0, n = 0;
  const W = (nm, i = 0) => p.locator(`#detail-t12 [data-w=${nm}]`).nth(i);
  const lec = async (w, rot) => w.locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(función)' : JSON.stringify(esp)); } };
  const chip = async (w, texto) => { await w.locator('.chip-btn', { hasText: texto }).first().click(); await p.waitForTimeout(80); };
  const slide = async (w, i, v) => { await w.locator('input[type=range]').nth(i).evaluate((el, val) => { el.value = val; el.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(80); };
  const filas = async (w) => w.locator('.m12-t tr').count();
  const rects = async (w) => w.locator('svg.plot').first().locator('rect.p-zona').count();

  // ---------- m2t12_riemann ----------
  let w = W('m2t12_riemann'); await w.scrollIntoViewIfNeeded();
  chk('riemann: arranca con n = 4', await lec(w, 'Suma con n = 4'), t => /5,90/.test(t));
  chk('riemann: 4 rectángulos', await rects(w), 4);
  chk('riemann: exacto 9', await lec(w, 'Valor exacto'), t => /^9 /.test(t));
  await slide(w, 0, 30);
  chk('riemann: n = 30 → 30 rectángulos', await rects(w), 30);
  chk('riemann: n = 30 mejora (suma izq ≈ 8,55)', await lec(w, 'Suma con n = 30'), t => /^8,55/.test(t));
  await slide(w, 0, 1);
  await chip(w, 'Superior');
  chk('riemann: superior n = 1 → 27', await lec(w, 'Suma con n = 1'), t => /^27/.test(t));
  await chip(w, 'Inferior');
  chk('riemann: inferior n = 1 → 0', await lec(w, 'Suma con n = 1'), t => /^0/.test(t));
  await chip(w, 'Punto medio');
  chk('riemann: punto medio n = 1 → 6,75', await lec(w, 'Suma con n = 1'), t => /^6,75/.test(t));
  await chip(w, 'Trapecios'); await slide(w, 0, 2);
  chk('riemann: trapecios n = 2 de x² → 10,125', await lec(w, 'Suma con n = 2'), t => /^10,12/.test(t));
  await chip(w, '1/x en'); await chip(w, 'Izquierda'); await slide(w, 0, 1);
  chk('riemann: 1/x izq n = 1 → 1', await lec(w, 'Suma con n = 1'), t => /^1(,0+)?$/.test(t));
  chk('riemann: exacto ln 2', await lec(w, 'Valor exacto'), t => /^ln 2/.test(t));

  // ---------- m2t12_signo ----------
  w = W('m2t12_signo'); await w.scrollIntoViewIfNeeded();
  chk('signo 1: neta 4/3', await lec(w, 'Integral'), '1,333');
  chk('signo 1: área 4', await lec(w, 'Área'), '4');
  chk('signo 1: 3 trozos', await filas(w), 4);
  await slide(w, 1, 1);
  chk('signo 1 con b = 1: un solo trozo', await filas(w), 2);
  chk('signo 1 con b = 1: neta = área', await lec(w, 'Integral'), await lec(w, 'Área'));
  await chip(w, 'x³ − x');
  chk('signo 2: neta 9/4', await lec(w, 'Integral'), '2,25');
  chk('signo 2: área 11/4', await lec(w, 'Área'), '2,75');
  chk('signo 2: 3 trozos', await filas(w), 4);
  await chip(w, 'sen x');
  chk('signo 3: neta 0 en un periodo', await lec(w, 'Integral'), t => /^[−-]?0(,0+)?$/.test(t));
  chk('signo 3: área 4', await lec(w, 'Área'), t => /^(4|3,99\d)$/.test(t));
  await chip(w, 'x³ − 3x²');
  chk('signo 4: neta 0', await lec(w, 'Integral'), t => /^[−-]?0(,0+)?$/.test(t));
  chk('signo 4: área 1/2', await lec(w, 'Área'), '0,5');

  // ---------- m2t12_entre ----------
  w = W('m2t12_entre'); await w.scrollIntoViewIfNeeded();
  chk('entre 1: área 1/6', await lec(w, 'Área'), '0,167');
  chk('entre 1: 1 tramo', await filas(w), 2);
  await chip(w, 'x² y x + 2');
  chk('entre 2: área 9/2', await lec(w, 'Área'), '4,5');
  await chip(w, 'x³ y x');
  chk('entre 3: neta 0 (impar)', await lec(w, '∫ (f − g)'), t => /^[−-]?0(,0+)?$/.test(t));
  chk('entre 3: área 1/2', await lec(w, 'Área'), '0,5');
  chk('entre 3: 2 tramos', await filas(w), 3);
  await chip(w, 'sen x y cos x');
  chk('entre 4: área 2√2 − 2', await lec(w, 'Área'), '0,828');
  await chip(w, '√x y x²');
  chk('entre 5: área 1/3', await lec(w, 'Área'), '0,333');
  await slide(w, 1, 0.5);
  chk('entre 5 con b = 0,5: área menor', await lec(w, 'Área'), t => parseFloat(t.replace(',', '.')) < 0.3);

  // ---------- m2t12_fint ----------
  w = W('m2t12_fint'); await w.scrollIntoViewIfNeeded();
  chk('fint 1: F(2) = 2/3', await lec(w, 'F(2'), '0,667');
  chk('fint 1: F′(2) = −1', await lec(w, 'F′(x)'), t => /1$/.test(t) && /[−-]/.test(t));
  chk('fint 1: decrece', await lec(w, 'F en este'), t => /decrece/.test(t));
  chk('fint 1: máximo en 1 y mínimo en 3', await lec(w, 'Extremos'), t => /máx en x = 1/.test(t) && /mín en x = 3/.test(t));
  await slide(w, 0, 1);
  chk('fint 1: x = 1 → tangente horizontal', await lec(w, 'F en este'), t => /horizontal/.test(t));
  chk('fint 1: x = 1 → F = 4/3', await lec(w, 'F(1'), '1,333');
  await chip(w, 'Extremo superior x²');
  chk('fint x²: F′ = f(x²)·2x', await lec(w, 'F′(x) = f(x²)'), t => t !== null);
  chk('fint x²: tiene extremos', await lec(w, 'Extremos'), t => /m[aá]x|mín/.test(t));
  await chip(w, 'Extremo superior x');
  await chip(w, 'sen t');
  chk('fint sen: F(2) = 1 − cos 2 ≈ 1,416', await lec(w, 'F(2'), '1,416');
  await chip(w, 'e^(−t²)');
  chk('fint gauss: creciente', await lec(w, 'F en este'), t => /crece ↗/.test(t));
  chk('fint gauss: sin extremos', await lec(w, 'Extremos'), t => /ninguno/.test(t));
  await chip(w, '2t/(1 + t²)'); await chip(w, 'Extremo superior x²');
  chk('fint 2t/(1+t²) con x²: tiene mínimo en 0', await lec(w, 'Extremos'), t => /mín en x = 0/.test(t));

  // ---------- m2t12_medio ----------
  w = W('m2t12_medio'); await w.scrollIntoViewIfNeeded();
  chk('medio 1: área 9', await lec(w, 'Área'), '9');
  chk('medio 1: μ = 3', await lec(w, 'Valor medio'), '3');
  chk('medio 1: sin c revelados', await w.locator('.lec', { hasText: 'c que cumplen' }).count(), 0);
  await w.locator('button', { hasText: 'Revelar' }).click(); await p.waitForTimeout(60);
  chk('medio 1: c = 1,732', await lec(w, 'c que cumplen'), '1,732');
  await slide(w, 0, 1.7320508);
  chk('medio 1: mensaje de acierto', await w.locator('.w-pie').innerText(), t => /cumple el teorema/.test(t));
  await chip(w, 'sen x en');
  await w.locator('button', { hasText: /Revelar|Ocultar/ }).click(); await p.waitForTimeout(60);
  chk('medio 2: μ = 2/π', await lec(w, 'Valor medio'), '0,637');
  chk('medio 2: dos c', await lec(w, 'c que cumplen'), t => t !== null && /0,69\d? · 2,45\d?/.test(t));
  await chip(w, 'eˣ en');
  chk('medio 3: μ = e − 1', await lec(w, 'Valor medio'), '1,718');

  console.log(`${n} comprobaciones, ${mal} fallos · errores JS: ${errs.length ? errs.join(' | ') : 'ninguno'}`);
  await b.close(); process.exit(mal || errs.length ? 1 : 0);
})();
