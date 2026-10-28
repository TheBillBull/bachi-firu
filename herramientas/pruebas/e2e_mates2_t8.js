// Prueba de comportamiento (pulsando de verdad) de los tres simuladores nuevos del tema 8 de Matemáticas II (Derivadas).
// Uso: node herramientas/pruebas/e2e_mates2_t8.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates2', 't8');
  let mal = 0, n = 0;
  const W = (nm, i = 0) => p.locator(`#detail-t8 [data-w=${nm}]`).nth(i);
  const lec = async (w, rot) => w.locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(función)' : JSON.stringify(esp)); } };
  const chip = async (w, texto) => { await w.locator('.chip-btn', { hasText: texto }).first().click(); await p.waitForTimeout(40); };
  const rango = async (w, i, v) => { await w.locator('input[type=range]').nth(i).fill(String(v)); await p.waitForTimeout(40); };
  const pie = async (w) => w.locator('.w-pie').innerText();

  // ---------- m2t8_trozos ----------
  let w = W('m2t8_trozos'); await w.scrollIntoViewIfNeeded();
  chk('trozos: arranca sin empalmar (a = b = 0): no continua', await lec(w, '¿Continua'), t => /^no/.test(t));
  chk('trozos: 2 deslizadores', await w.locator('input[type=range]').count(), 2);
  await w.locator('[data-solve]').click(); await p.waitForTimeout(40);
  chk('trozos 1: botón solución → derivable', await lec(w, '¿Derivable'), t => /^sí: f′\(1\) = 1/.test(t));
  chk('trozos 1: continua', await lec(w, '¿Continua'), 'sí');
  chk('trozos 1: sliders puestos a a = −1, b = 3', [await w.locator('.sl-v').nth(0).innerText(), await w.locator('.sl-v').nth(1).innerText()], v => /−1/.test(v[0]) && /3/.test(v[1]));
  await rango(w, 1, 2); chk('trozos 1: cambiar b a 2 rompe la continuidad', await lec(w, '¿Continua'), t => /^no/.test(t));
  await rango(w, 0, 0); await rango(w, 1, 2); chk('trozos 1: a = 0, b = 2 continua pero con pico', await lec(w, '¿Derivable'), t => /punto angular/.test(t));
  await chip(w, 'Exponencial'); await w.locator('[data-solve]').click(); await p.waitForTimeout(40);
  chk('trozos 2: solución → derivable f′(0) = 1', await lec(w, '¿Derivable'), t => /^sí: f′\(0\) = 1/.test(t));
  await chip(w, 'Recta y parábola'); await w.locator('[data-solve]').click(); await p.waitForTimeout(40);
  chk('trozos 3: solución → derivable f′(2) = 4', await lec(w, '¿Derivable'), t => /^sí: f′\(2\) = 4/.test(t));
  await chip(w, 'valor absoluto');
  chk('trozos 4: oculta el segundo deslizador', await w.locator('input[type=range]').nth(1).evaluate(e => e.closest('label,div').offsetParent === null || getComputedStyle(e.closest('label,div')).display === 'none'), true);
  chk('trozos 4: a = 2 inicial → no derivable (punto angular)', await lec(w, '¿Derivable'), t => /punto angular/.test(t));
  await w.locator('[data-solve]').click(); await p.waitForTimeout(40);
  chk('trozos 4: a = −1 → derivable con f′(1) = 0', await lec(w, '¿Derivable'), t => /^sí: f′\(1\) = 0/.test(t));
  const antes = await w.locator('svg.plot').innerHTML(); await rango(w, 0, 1.5); chk('trozos 4: mover a cambia el dibujo', (await w.locator('svg.plot').innerHTML()) !== antes, true);

  // ---------- m2t8_rolle ----------
  w = W('m2t8_rolle'); await w.scrollIntoViewIfNeeded();
  chk('rolle 1: c = 2', await lec(w, 'Puntos c'), t => /c = 2(,0+)?$/.test(t));
  chk('rolle 1: f(a) = f(b)', await lec(w, '3)'), t => /sí$/.test(t));
  await chip(w, 'x³ − 3x'); chk('rolle 2: c = 1', await lec(w, 'Puntos c'), t => /c = 1(,0+)?$/.test(t));
  await chip(w, 'cos x'); chk('rolle 3: c = π ≈ 3,1416', await lec(w, 'Puntos c'), t => /^c = 3,14/.test(t));
  await chip(w, '|x| en'); chk('rolle 4: no derivable', await lec(w, '2)'), 'no'); chk('rolle 4: no se aplica', await pie(w), t => /No se puede aplicar Rolle/.test(t) && /punto angular/.test(t));
  await chip(w, 'x² en [0, 1]'); chk('rolle 5: f(0) ≠ f(1)', await lec(w, '3)'), t => /no$/.test(t)); chk('rolle 5: sin c', await lec(w, 'Puntos c'), t => /no se puede aplicar/.test(t));
  await chip(w, '1/x²'); chk('rolle 6: no continua', await lec(w, '1)'), 'no');
  await chip(w, 'x² − 4x'); chk('rolle: vuelve al primero', await lec(w, 'Puntos c'), t => /^c = 2/.test(t));

  // ---------- m2t8_hopital ----------
  w = W('m2t8_hopital'); await w.scrollIntoViewIfNeeded();
  chk('hopital 1: límite 1 y forma 0/0', [await lec(w, 'Límite'), await lec(w, 'Indeterminación')], v => v[0] === '1' && v[1] === '0/0');
  chk('hopital 1: tabla de 4 filas', await w.locator('tbody tr').count(), 4);
  chk('hopital 1: última fila de f/g ≈ 1', await w.locator('tbody tr').last().locator('td').nth(1).innerText(), t => /^(1|0,9999)$/.test(t));
  await chip(w, '(1 − cos x)'); chk('hopital 2: límite 1/2', await lec(w, 'Límite'), '1/2'); chk('hopital 2: pasos mencionan segunda derivada', await lec(w, 'Derivando'), t => /otra vez/.test(t));
  await chip(w, 'eˣ / x²'); chk('hopital 5: ∞/∞ y +∞', [await lec(w, 'Indeterminación'), await lec(w, 'Límite')], v => v[0] === '∞/∞' && v[1] === '+∞');
  await chip(w, 'ln x / x'); chk('hopital 6: límite 0', await lec(w, 'Límite'), '0');
  await chip(w, 'x·ln x'); chk('hopital 7: límite 0 y fila 0,001 ≈ −0,0069', [await lec(w, 'Límite'), await w.locator('tbody tr').last().locator('td').nth(1).innerText()], v => v[0] === '0' && /^−0,0069/.test(v[1]));

  // ---------- general ----------
  const desborde = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
  chk('sin desborde horizontal', desborde, false);
  chk('sin errores JS', errs.length, 0);
  if (errs.length) console.log(errs.slice(0, 3));
  console.log(mal ? `${mal} FALLOS de ${n}` : `todo bien: ${n} comprobaciones`);
  await b.close(); process.exit(mal ? 1 : 0);
})();
