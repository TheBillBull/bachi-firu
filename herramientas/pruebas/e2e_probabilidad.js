// Comportamiento de los simuladores del tema 13 (probabilidad) en el tema real de Matemáticas I
//   node herramientas/pruebas/e2e_probabilidad.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates1', 't13');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t13 [data-w=${nm}]`).first();
  const lec = async (nm, rot) => W(nm).locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chip = async (nm, sel, i) => { await W(nm).locator(sel + ' .chip-btn').nth(i).click(); await p.waitForTimeout(80); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(80); };
  const boton = async (nm, texto) => { await W(nm).locator('button', { hasText: texto }).first().click(); await p.waitForTimeout(120); };
  const sinEsp = s => (s || '').replace(/\s+/g, '');
  const binom = (N, k, q) => { let c = 1; for (let i = 1; i <= k; i++) c = c * (N - k + i) / i; return c * Math.pow(q, k) * Math.pow(1 - q, N - k); };
  const fm = (x, d) => String(+x.toFixed(d)).replace('.', ',');

  // ---------- Laplace ----------
  await W('m13_laplace').scrollIntoViewIfNeeded();
  chk('laplace dos dados: posibles', await lec('m13_laplace', 'Casos posibles'), '36'); chk('laplace suma 7: favorables', await lec('m13_laplace', 'Casos favorables'), '6');
  chk('laplace suma 7: P', await lec('m13_laplace', 'P('), t => /^6\/36 = 1\/6 = 0,1667 = 16,67 %$/.test(t));
  chk('laplace casillas verdes', await W('m13_laplace').locator('.m13-cel.fav').count(), 6); chk('laplace 36 casillas', await W('m13_laplace').locator('.m13-cel').count(), 36);
  await chip('m13_laplace', '[data-ev]', 3); chk('laplace al menos un 6 = 11/36', await lec('m13_laplace', 'Casos favorables'), '11');
  await chip('m13_laplace', '[data-exp]', 2); chk('laplace baraja: 40 casos', await lec('m13_laplace', 'Casos posibles'), '40'); chk('laplace baraja as', await lec('m13_laplace', 'Casos favorables'), '4');
  await chip('m13_laplace', '[data-ev]', 3); chk('laplace oros o figura = 19', await lec('m13_laplace', 'Casos favorables'), '19');
  await chip('m13_laplace', '[data-ev]', 2); chk('laplace figuras = 12', await lec('m13_laplace', 'Casos favorables'), '12');
  await chip('m13_laplace', '[data-exp]', 3); chk('laplace tres monedas: 8', await lec('m13_laplace', 'Casos posibles'), '8'); chk('laplace exactamente 2 caras = 3', await lec('m13_laplace', 'Casos favorables'), '3');
  await chip('m13_laplace', '[data-exp]', 4); await chip('m13_laplace', '[data-ev]', 2); chk('laplace suceso imposible: 0 favorables', await lec('m13_laplace', 'Casos favorables'), '0');

  // ---------- Venn ----------
  await W('m13_venn').scrollIntoViewIfNeeded();
  chk('venn A', await lec('m13_venn', 'A ('), '{2, 4, 6, 8, 10, 12}'); chk('venn B', await lec('m13_venn', 'B ('), '{3, 6, 9, 12}');
  chk('venn A∪B', await lec('m13_venn', 'Operación'), '{2, 3, 4, 6, 8, 9, 10, 12}'); chk('venn P(A∪B)', await lec('m13_venn', 'Probabilidad'), '8/12 = 2/3 = 0,6667');
  chk('venn A∪B: tres regiones iluminadas', await W('m13_venn').locator('svg .m13-reg').count(), 3);
  await chip('m13_venn', '[data-op]', 1); chk('venn A∩B', await lec('m13_venn', 'Operación'), '{6, 12}'); chk('venn A∩B: sólo la lente', await W('m13_venn').locator('svg .m13-reg').count(), 1);
  await chip('m13_venn', '[data-op]', 2); chk('venn Ā', await lec('m13_venn', 'Operación'), '{1, 3, 5, 7, 9, 11}');
  await chip('m13_venn', '[data-op]', 4); chk('venn A−B', await lec('m13_venn', 'Operación'), '{2, 4, 8, 10}');
  await chip('m13_venn', '[data-op]', 6); const dm1 = await lec('m13_venn', 'Operación'); chk('venn De Morgan 1: (A∪B)ᶜ', dm1, '{1, 5, 7, 11}');
  await chip('m13_venn', '[data-op]', 0); const un = await lec('m13_venn', 'Operación');
  chk('venn De Morgan: (A∪B)ᶜ y A∪B se reparten E', un.split(',').length + dm1.split(',').length, 12);
  await chip('m13_venn', '[data-op]', 7); chk('venn De Morgan 2: (A∩B)ᶜ', await lec('m13_venn', 'Operación'), '{1, 2, 3, 4, 5, 7, 8, 9, 10, 11}');
  await chip('m13_venn', '[data-pre]', 3); await chip('m13_venn', '[data-op]', 1); chk('venn A dentro de B: A∩B = A', await lec('m13_venn', 'Operación'), '{4, 8, 12}');
  await chip('m13_venn', '[data-pre]', 4); chk('venn incompatibles', await lec('m13_venn', '¿Incompatibles'), t => /^sí/.test(t));

  // ---------- Unión ----------
  await W('m13_union').scrollIntoViewIfNeeded();
  chk('union P(A∪B)', await lec('m13_union', 'P(A ∪ B)'), '0,7 = 70 %'); chk('union ni A ni B', await lec('m13_union', 'P(ni A'), '0,3');
  chk('union no incompatibles', await lec('m13_union', '¿Incompatibles'), t => /^no/.test(t)); chk('union independientes', await lec('m13_union', '¿Independientes'), t => /^sí/.test(t));
  await range('m13_union', 2, 0); chk('union intersección 0 → incompatibles', await lec('m13_union', '¿Incompatibles'), t => /^sí/.test(t)); chk('union P(A∪B)=0,9', await lec('m13_union', 'P(A ∪ B)'), '0,9 = 90 %');
  await range('m13_union', 2, 0.1); chk('union dependientes', await lec('m13_union', '¿Independientes'), t => /^no/.test(t));
  await range('m13_union', 0, 0.9); await range('m13_union', 1, 0.9); chk('union acota la intersección (≥ P(A)+P(B)−1)', await lec('m13_union', '− P(A ∩ B)'), '− 0,8');
  chk('union unión = 1', await lec('m13_union', 'P(A ∪ B)'), '1 = 100 %');

  // ---------- Árbol ----------
  await W('m13_arbol').scrollIntoViewIfNeeded();
  chk('arbol total', await lec('m13_arbol', 'Probabilidad total'), t => /= 0,059$/.test(t)); chk('arbol Bayes', await lec('m13_arbol', 'Bayes'), t => /= 0,161 = 16,1 %$/.test(t));
  await chip('m13_arbol', '[data-pre]', 1); chk('arbol máquinas total', await lec('m13_arbol', 'Probabilidad total'), t => /= 0,032$/.test(t)); chk('arbol máquinas Bayes', await lec('m13_arbol', 'Bayes'), t => /= 0,375 = 37,5 %$/.test(t));
  await chip('m13_arbol', '[data-pre]', 2); chk('arbol lluvia total', await lec('m13_arbol', 'Probabilidad total'), t => /= 0,32$/.test(t)); chk('arbol lluvia Bayes', await lec('m13_arbol', 'Bayes'), t => /0,5625/.test(t));
  await chip('m13_arbol', '[data-pre]', 3); chk('arbol independientes', await lec('m13_arbol', '¿Independientes'), t => /^sí/.test(t));
  await range('m13_arbol', 1, 0.9); chk('arbol dependientes al mover P(B|A)', await lec('m13_arbol', '¿Independientes'), t => /^no/.test(t));
  chk('arbol 4 hojas y 3 nodos', [await W('m13_arbol').locator('svg .m13-hoja').count(), await W('m13_arbol').locator('svg .m13-nodo').count()].join(','), '4,3');

  // ---------- Urna ----------
  await W('m13_urna').scrollIntoViewIfNeeded();
  chk('urna sin reposición RR', await lec('m13_urna', 'Las dos rojas'), '5/14 = 0,3571'); chk('urna una de cada color', await lec('m13_urna', 'Una de cada color'), '15/28 = 0,5357');
  chk('urna al menos una roja', await lec('m13_urna', 'Al menos una roja'), t => /^25\/28 = 0,8929/.test(t)); chk('urna ramas suman 1', await lec('m13_urna', 'Comprobación'), 'las cuatro ramas suman 1');
  await chip('m13_urna', '[data-rep]', 1); chk('urna con reposición RR', await lec('m13_urna', 'Las dos rojas'), '25/64 = 0,3906'); chk('urna con reposición suma 1', await lec('m13_urna', 'Comprobación'), 'las cuatro ramas suman 1');
  await chip('m13_urna', '[data-rep]', 0); await range('m13_urna', 0, 2); await range('m13_urna', 1, 2); chk('urna 2R 2A sin reposición RR = 1/6', await lec('m13_urna', 'Las dos rojas'), t => /^1\/6 = 0,1667/.test(t));
  chk('urna 4 bolas dibujadas', await W('m13_urna').locator('svg .m13-bola').count(), 4);

  // ---------- Bayes (frecuencias naturales) ----------
  await W('m13_bayes').scrollIntoViewIfNeeded();
  chk('bayes 1000 puntos', await W('m13_bayes').locator('svg .m13-pto').count(), 1000); chk('bayes enfermos·sanos', await lec('m13_bayes', 'Enfermos ·'), '10 · 990');
  chk('bayes VP exacto (9,5)', await lec('m13_bayes', 'Enfermos con test positivo'), '9,5'); chk('bayes FP exacto (49,5)', await lec('m13_bayes', 'Sanos con test positivo'), '49,5');
  chk('bayes P(enfermo|positivo) = 16,1 %', await lec('m13_bayes', 'Si das positivo'), t => /= 16,1 ?%$/.test(t));
  await range('m13_bayes', 0, 0.5); chk('bayes prevalencia 50 %: 95 %', await lec('m13_bayes', 'Si das positivo'), t => /= 95 ?%$/.test(t));

  // ---------- Montecarlo (ley de los grandes números) ----------
  await W('m13_montecarlo').scrollIntoViewIfNeeded();
  chk('montecarlo parte de 0', await lec('m13_montecarlo', 'Repeticiones'), '0'); await boton('m13_montecarlo', '+1000');
  chk('montecarlo +1000', await lec('m13_montecarlo', 'Repeticiones'), '1000'); const f1 = await lec('m13_montecarlo', 'Frecuencia relativa'); chk('montecarlo frecuencia ≈ 0,5', parseFloat(f1.split('=')[1].replace(',', '.')), v => Math.abs(v - 0.5) < 0.08);
  chk('montecarlo curva dibujada', await W('m13_montecarlo').locator('svg path.p-curva.c-pen').count(), v => v >= 1);
  await chip('m13_montecarlo', '[data-exp]', 1); chk('montecarlo cambia de experimento y reinicia', await lec('m13_montecarlo', 'Repeticiones'), '0');
  await boton('m13_montecarlo', '+1000'); const f2 = await lec('m13_montecarlo', 'Frecuencia relativa'); chk('montecarlo dado 6 ≈ 1/6', parseFloat(f2.split('=')[1].replace(',', '.')), v => Math.abs(v - 1 / 6) < 0.05);
  await boton('m13_montecarlo', 'Reiniciar'); chk('montecarlo reinicia', await lec('m13_montecarlo', 'Repeticiones'), '0');
  await chip('m13_montecarlo', '[data-exp]', 4); chk('montecarlo teórica 3/8', await lec('m13_montecarlo', 'Probabilidad teórica'), t => /^3\/8 = 0,375$/.test(t));

  // ---------- Combinatoria ----------
  await W('m13_combinatoria').scrollIntoViewIfNeeded();
  chk('combinatoria V(6,3) = 120', await lec('m13_combinatoria', 'Resultado'), '120'); chk('combinatoria tipo', await lec('m13_combinatoria', 'Tipo'), 'Variaciones V(6, 3)');
  await chip('m13_combinatoria', '[data-orden]', 1); chk('combinatoria C(6,3) = 20', await lec('m13_combinatoria', 'Resultado'), '20');
  await chip('m13_combinatoria', '[data-rep]', 1); chk('combinatoria CR(6,3) = 56', await lec('m13_combinatoria', 'Resultado'), '56');
  await chip('m13_combinatoria', '[data-orden]', 0); chk('combinatoria VR(6,3) = 216', await lec('m13_combinatoria', 'Resultado'), '216');
  await chip('m13_combinatoria', '[data-rep]', 0); await range('m13_combinatoria', 0, 20); await range('m13_combinatoria', 1, 6); chk('combinatoria V(20,6) = 27 907 200', sinEsp(await lec('m13_combinatoria', 'Resultado')), '27907200');
  await chip('m13_combinatoria', '[data-orden]', 1); chk('combinatoria C(20,6) = 38 760', sinEsp(await lec('m13_combinatoria', 'Resultado')), '38760');
  chk('combinatoria: relación V = C·k!', sinEsp(await lec('m13_combinatoria', 'Relación')), t => t.includes('27907200=38760·720'));
  await range('m13_combinatoria', 0, 4); await range('m13_combinatoria', 1, 4); await range('m13_combinatoria', 0, 3); chk('combinatoria k se ajusta a n', await lec('m13_combinatoria', 'Resultado'), '1');
  await range('m13_combinatoria', 0, 8); await chip('m13_combinatoria', '[data-orden]', 1); chk('combinatoria Pascal fila n = 8', await W('m13_combinatoria').locator('.m13-pc.fila, .m13-pc.sel').count(), 9);

  // ---------- Cumpleaños ----------
  await W('m13_cumple').scrollIntoViewIfNeeded();
  chk('cumple n = 23 → 0,5073', await lec('m13_cumple', 'Probabilidad de que ALGUNOS'), t => /^0,5073 = 50,73 %$/.test(t));
  await range('m13_cumple', 0, 57); chk('cumple n = 57 → 0,9901', await lec('m13_cumple', 'Probabilidad de que ALGUNOS'), t => /^0,9901/.test(t));
  await range('m13_cumple', 0, 22); chk('cumple n = 22 → < 0,5', await lec('m13_cumple', 'Probabilidad de que ALGUNOS'), t => /^0,4757/.test(t));
  await range('m13_cumple', 0, 23); await boton('m13_cumple', 'Simular'); const sim = await lec('m13_cumple', 'Simulación'); chk('cumple simulación ≈ 507 de 1 000', parseInt(sim), v => v > 440 && v < 580);

  // ---------- Monty Hall ----------
  await W('m13_monty').scrollIntoViewIfNeeded();
  chk('monty 3 puertas', await W('m13_monty').locator('.m13-puerta').count(), 3);
  await W('m13_monty').locator('.m13-puerta').first().click(); await p.waitForTimeout(100);
  chk('monty el presentador abre UNA puerta con cabra', await W('m13_monty').locator('.m13-puerta.abierta').allInnerTexts(), t => t.length === 1 && t[0].trim() === '🐐');
  chk('monty la puerta abierta no es la elegida', await W('m13_monty').locator('.m13-puerta.abierta.elegida').count(), 0);
  await W('m13_monty').locator('[data-a=c]').click(); await p.waitForTimeout(100); chk('monty tras cambiar: resultado y reparto', await W('m13_monty').locator('.m13-msg').innerText(), t => /Cambiaste/.test(t) && /(COCHE|cabra)/.test(t));
  chk('monty marcador cambiando 1 partida', await lec('m13_monty', 'Tus partidas cambiando'), t => /^[01] de 1 = (0|100) %$/.test(t));
  await boton('m13_monty', '«cambiando»'); const sc = parseInt(await lec('m13_monty', 'Simulación: siempre cambia')); chk('monty cambiar ≈ 2/3 (667)', sc, v => v > 620 && v < 710);
  await boton('m13_monty', '«quedándome»'); const sq = parseInt(await lec('m13_monty', 'Simulación: siempre se queda')); chk('monty quedarse ≈ 1/3 (333)', sq, v => v > 290 && v < 380);

  // ---------- Binomial ----------
  await W('m13_binomial').scrollIntoViewIfNeeded();
  chk('binomial modelo', await lec('m13_binomial', 'Modelo'), 'X ~ B(10, 0,5)'); chk('binomial P(X=5)', await lec('m13_binomial', 'P(X = 5)'), t => /= 0,2461$/.test(t));
  chk('binomial P(X≤5) y P(X≥5)', [await lec('m13_binomial', 'P(X ≤'), await lec('m13_binomial', 'P(X ≥')].join(','), '0,623,0,623'); chk('binomial media y varianza', [await lec('m13_binomial', 'Media'), await lec('m13_binomial', 'Varianza')].join(','), '5,2,5');
  chk('binomial 11 barras', await W('m13_binomial').locator('svg rect.z-red, svg rect.z-pen, svg rect.z-ok').count(), 11);
  await chip('m13_binomial', '[data-pre]', 2); chk('binomial examen test: modelo', await lec('m13_binomial', 'Modelo'), 'X ~ B(20, 0,25)');
  chk('binomial examen test: P(X=5)', await lec('m13_binomial', 'P(X = 5)'), t => t.endsWith('= ' + fm(binom(20, 5, 0.25), 4))); chk('binomial examen test: media 5 y varianza 3,75', [await lec('m13_binomial', 'Media'), await lec('m13_binomial', 'Varianza')].join(','), '5,3,75');
  await range('m13_binomial', 2, 0); chk('binomial k = 0: P(X=0)', await lec('m13_binomial', 'P(X = 0)'), t => t.endsWith('= ' + fm(binom(20, 0, 0.25), 4)));
  await range('m13_binomial', 0, 4); chk('binomial n = 4: modelo', await lec('m13_binomial', 'Modelo'), 'X ~ B(4, 0,25)');

  // ---------- Contingencia ----------
  await W('m13_contingencia').scrollIntoViewIfNeeded();
  chk('contingencia totales 500', await W('m13_contingencia').locator('.m13-tot td').last().innerText(), '500'); chk('contingencia P(A∩B)', await lec('m13_contingencia', 'P(A ∩ B)'), '1/50 = 0,02');
  chk('contingencia P(A|B)', await lec('m13_contingencia', 'P(A | B)'), '1/20 = 0,05'); chk('contingencia P(B|A)', await lec('m13_contingencia', 'P(B | A)'), '1/7 = 0,1429');
  chk('contingencia dependientes', await lec('m13_contingencia', '¿Independientes'), t => /^no/.test(t));
  await chip('m13_contingencia', '[data-pre]', 1); chk('contingencia independientes', await lec('m13_contingencia', '¿Independientes'), t => /^sí/.test(t));
  await W('m13_contingencia').locator('input[type=number]').first().fill('25'); await p.waitForTimeout(100); chk('contingencia editar rompe la independencia', await lec('m13_contingencia', '¿Independientes'), t => /^no/.test(t));
  await chip('m13_contingencia', '[data-pre]', 2); chk('contingencia gimnasio P(B|A)', await lec('m13_contingencia', 'P(B | A)'), '3/25 = 0,12'); chk('contingencia gimnasio P(A|B)', await lec('m13_contingencia', 'P(A | B)'), '3/5 = 0,6');

  // ---------- sin desbordes ----------
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); chk('sin desborde horizontal de la página', ov, v => v <= 1);
  const anchos = await p.evaluate(() => [...document.querySelectorAll('#detail-t13 [data-w^=m13_]')].map(e => [e.getAttribute('data-w'), e.scrollWidth - e.clientWidth]).filter(x => x[1] > 1));
  chk('ningún simulador se desborda por los lados', anchos, a => a.length === 0);
  console.log(mal ? mal + ' FALLOS de ' + n : n + ' comprobaciones de comportamiento de probabilidad correctas' + (movil ? ' (móvil)' : ''), '· errores JS:', errs.length ? errs : 'ninguno');
  await b.close();
  process.exit(mal || errs.length ? 1 : 0);
})();
