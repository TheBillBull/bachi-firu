// Prueba de comportamiento (pulsando de verdad) de los cinco simuladores del tema 2 de Matemáticas II (Determinantes).
// Uso: node herramientas/pruebas/e2e_mates2_t2.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates2', 't2');
  let mal = 0, n = 0;
  const W = (nm, i = 0) => p.locator(`#detail-t2 [data-w=${nm}]`).nth(i);
  const lec = async (w, rot) => w.locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const chip = async (w, texto) => { await w.locator('.chip-btn', { hasText: texto }).first().click(); await p.waitForTimeout(40); };
  const rango = async (w, i, v) => { await w.locator('input[type=range]').nth(i).fill(String(v)); await p.waitForTimeout(40); };

  // ---------- det_geom ----------
  let w = W('det_geom'); await w.scrollIntoViewIfNeeded();
  chk('geom 2D área inicial', await lec(w, 'Área del paralelogramo'), t => /= 5$/.test(t));
  chk('geom 2D orientación +', await lec(w, 'Orientación'), t => /antihoraria/.test(t));
  await w.locator('svg.plot .p-asa').first().focus(); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(40);
  chk('geom 2D flecha → u=(3,5;1) área 6', await lec(w, 'Área del paralelogramo'), t => /= 6$/.test(t));
  await chip(w, 'Intercambio'); chk('geom 2D u↔v: área 5', await lec(w, 'Área del paralelogramo'), t => /= 5$/.test(t)); chk('geom 2D u↔v: horaria', await lec(w, 'Orientación'), t => /horaria \(−\)/.test(t));
  await chip(w, 'Proporcionales'); chk('geom 2D proporcionales det 0', await lec(w, 'det(u, v)'), t => /= 0$/.test(t)); chk('geom 2D colineales', await lec(w, 'Orientación'), t => /colineales/.test(t));
  await chip(w, 'Cuadrado'); chk('geom 2D cuadrado área 4', await lec(w, 'Área del paralelogramo'), t => /= 4$/.test(t));
  await chip(w, '3D'); await rango(w, 2, 2);
  chk('geom 3D det 8', await lec(w, 'det(u, v, w)'), '8'); chk('geom 3D altura 2', await lec(w, 'Altura'), '2');
  await rango(w, 0, 3); chk('geom 3D w_x no cambia volumen', await lec(w, 'Volumen'), t => /= 8$/.test(t));
  await rango(w, 2, -1); chk('geom 3D w_z=−1 det −4', await lec(w, 'det(u, v, w)'), '-4'.replace('-', '−'));
  chk('geom 3D inversa', await lec(w, 'Orientación'), t => /inversa/.test(t));
  await rango(w, 2, 0); chk('geom 3D coplanarios', await lec(w, 'Orientación'), t => /coplanarios/.test(t));

  // ---------- det_props ----------
  w = W('det_props'); await w.scrollIntoViewIfNeeded();
  chk('props |A| inicial −22', await lec(w, '|A| ahora'), '−22');
  await chip(w, 'Intercambiar'); chk('props intercambio → 22', await lec(w, '|A| ahora'), '22');
  await chip(w, 'a ← a + k·b'); chk('props suma múltiplo no cambia', await lec(w, '|A| ahora'), '22');
  await chip(w, 'Multiplicar fila a'); chk('props fila × 2 → 44', await lec(w, '|A| ahora'), '44');
  await chip(w, 'Multiplicar toda'); chk('props toda × 2 → 352', await lec(w, '|A| ahora'), '352');
  await chip(w, 'Trasponer'); chk('props traspuesta no cambia', await lec(w, '|A| ahora'), '352');
  chk('props ningún ✗ en el registro', await w.locator('.dt-log').innerText(), t => !/✗/.test(t) && (t.match(/✓/g) || []).length === 5);
  await chip(w, 'Reiniciar'); chk('props reiniciar', await lec(w, '|A| ahora'), '−22');
  await rango(w, 0, 0); await chip(w, 'Multiplicar fila a'); chk('props fila × 0 → 0', await lec(w, '|A| ahora'), '0');
  chk('props sin inversa', await lec(w, '¿Tiene inversa'), t => /^no/.test(t));
  await chip(w, 'Reiniciar'); await chip(w, 'fila b = F1'); await chip(w, 'Intercambiar');
  chk('props a = b avisa', await w.locator('.w-pie').innerText(), t => /distintas/.test(t));
  await chip(w, 'Triangular'); chk('props triangular −6', await lec(w, '|A| ahora'), '−6');

  // ---------- det_adjuntos (desarrollo y inversa) ----------
  w = W('det_adjuntos', 1); await w.scrollIntoViewIfNeeded();
  chk('adj matriz 3×3 inicial', await lec(w, '|A| por esta línea'), '−22');
  for (const l of ['Fila 1', 'Fila 2', 'Fila 3', 'Columna 1', 'Columna 2', 'Columna 3']) { await w.locator('[data-lin] .chip-btn', { hasText: l }).first().click(); chk('adj desarrollo ' + l + ' = −22', await lec(w, '|A| por esta línea'), '−22'); }
  await chip(w, '3×3 con ceros'); chk('adj línea con más ceros', await lec(w, 'Línea con más ceros'), t => /1 cero\)/.test(t));
  await chip(w, '4×4'); for (const l of ['Fila 1', 'Fila 3', 'Fila 4', 'Columna 3', 'Columna 4']) { await w.locator('[data-lin] .chip-btn', { hasText: l }).first().click(); chk('adj 4×4 ' + l + ' = 10', await lec(w, '|A| por esta línea'), '10'); }
  chk('adj 4×4 mejor línea', await lec(w, 'Línea con más ceros'), t => /3 ceros/.test(t));
  chk('adj 4×4: sólo 4 chips de línea+4', await w.locator('[data-lin] .chip-btn').count(), 8);
  w = W('det_adjuntos', 0); await w.scrollIntoViewIfNeeded();
  chk('inv arranca en modo inversa', await w.locator('[data-paso] .chip-btn').first().isVisible(), true);
  const celdas = async () => w.locator('[data-mats] .dt-bloque').nth(1).locator('.matrix-cell').allInnerTexts();
  await chip(w, '3×3 (|A| = 1)');
  const paso = async (t) => w.locator('[data-paso] .chip-btn', { hasText: t }).click();
  const c1 = async () => (await celdas()).map(x => x.replace(/\s/g, ''));
  await paso('Menores'); chk('inv menores M11, M12 = −24, −20', (await c1()).slice(0, 2), r => r[0] === '−24' && r[1] === '−20');
  await paso('Adjuntos'); chk('inv adjuntos A11, A12 = −24, 20', (await c1()).slice(0, 2), r => r[0] === '−24' && r[1] === '20');
  await paso('Traspuesta'); chk('inv traspuesta [0][1] = 18', (await c1()).slice(0, 2), r => r[0] === '−24' && r[1] === '18');
  await paso('Dividir'); chk('inv final = (−24, 18, 5)', (await c1()).slice(0, 3), r => r.join() === '−24,18,5');
  await chip(w, '3×3 (−22)'); chk('inv |A| = −22 con fracciones', (await celdas())[0].replace(/\s/g, ''), t => /11/.test(t) && /−1/.test(t));
  await chip(w, 'Singular'); chk('inv singular no existe', await w.locator('[data-mats]').innerText(), t => /no existe/.test(t)); chk('inv singular lectura', await lec(w, '¿Tiene inversa'), t => /^no/.test(t));

  // ---------- det_param ----------
  w = W('det_param'); await w.scrollIntoViewIfNeeded();
  chk('param rg genérico 3', await lec(w, 'rg A(m)'), '3');
  await chip(w, 'm = 1'); chk('param m=1 rg 1', await lec(w, 'rg A(m)'), '1'); chk('param m=1 det 0', await lec(w, '|A(m)|'), t => /^0/.test(t)); chk('param m=1 sin inversa', await lec(w, '¿Tiene inversa'), t => /^no/.test(t));
  await chip(w, 'm = −2'); chk('param m=−2 rg 2', await lec(w, 'rg A(m)'), '2');
  await rango(w, 0, 0.5); chk('param m=0,5 rg 3 e inversa', await lec(w, '¿Tiene inversa'), 'sí');
  await chip(w, 'Tridiagonal'); await chip(w, 'm = √2'); chk('param tridiagonal √2 rg 2', await lec(w, 'rg A(m)'), '2'); await chip(w, 'm = 0'); chk('param tridiagonal 0 rg 2', await lec(w, 'rg A(m)'), '2');
  await chip(w, 'Una sola raíz'); await chip(w, 'm = 4'); chk('param m=4 rg 2', await lec(w, 'rg A(m)'), '2'); chk('param muestra valores', await lec(w, 'Valores que anulan'), 'm = 4');
  await chip(w, '2×2'); await chip(w, 'm = 2'); chk('param 2×2 m=2 rg 1', await lec(w, 'rg A(m)'), '1');

  // ---------- det_calc ----------
  w = W('det_calc'); await w.scrollIntoViewIfNeeded();
  chk('calc |2A⁻¹Aᵗ| con |A|=3 → 8', await lec(w, 'Resultado'), '8');
  await chip(w, 'n = 4'); chk('calc n=4 → 16', await lec(w, 'Resultado'), '16');
  await chip(w, 'Orden n = 2'); chk('calc n=2 → 4', await lec(w, 'Resultado'), '4');
  await chip(w, 'Multiplicar por B'); chk('calc con |B|=2 → 8', await lec(w, 'Resultado'), '8');
  await rango(w, 0, 0); chk('calc |A|=0 con A⁻¹ no existe', await lec(w, 'Resultado'), 'no existe');
  await rango(w, 0, 2); await rango(w, 2, 2); await rango(w, 3, 0); chk('calc k=2,p=2,q=0,n=2,|B|=2,|A|=2 → 4·4·2 = 32', await lec(w, 'Resultado'), '32');
  await rango(w, 0, -2); await rango(w, 2, -1); await rango(w, 3, 1); await chip(w, 'Sin B'); chk('calc |A|=−2: exponente 0 → k²', await lec(w, 'Resultado'), '4');

  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  chk('sin desborde horizontal', ov, v => v <= 1);
  console.log(mal ? mal + ' FALLOS de ' + n : n + ' comprobaciones de comportamiento de determinantes correctas', '· errores JS:', errs.length ? errs : 'ninguno');
  await b.close();
})();
