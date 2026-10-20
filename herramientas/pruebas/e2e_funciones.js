const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates1', 't9');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t9 [data-w=${nm}]`).first();
  const lec = async (nm, rot) => W(nm).locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chip = async (nm, sel, i) => { await W(nm).locator(sel + ' .chip-btn').nth(i).click(); await p.waitForTimeout(80); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const escribe = async (nm, i, t) => { await W(nm).locator('input[type=text]').nth(i).fill(t); await p.waitForTimeout(100); };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(80); };

  // dominio
  await W('dominio').scrollIntoViewIfNeeded();
  const D = ['ℝ − {3}', '[2, +∞)', '(−1, +∞)', '[−2, 2]', 'ℝ − {−2, 2}', '(1, +∞)', 'ℝ', '[0, 4) ∪ (4, +∞)', '[−2, 3]', '(−∞, −1) ∪ (1, +∞)'];
  for (let i = 0; i < D.length; i++) { await chip('dominio', '[data-pre]', i); chk('dominio ' + i, await lec('dominio', 'Dominio'), D[i]); }
  await escribe('dominio', 0, '|x|/x'); chk('dominio |x|/x', await lec('dominio', 'Dominio'), 'ℝ − {0}');
  await escribe('dominio', 0, 'log_2(x-1)'); chk('dominio log_2(x-1)', await lec('dominio', 'Dominio'), '(1, +∞)');
  await escribe('dominio', 0, '((((x'); chk('dominio error', await lec('dominio', 'Revisa'), t => !!t);
  // analisis
  await W('analisis').scrollIntoViewIfNeeded();
  chk('analisis x^3-3x máx', await lec('analisis', 'Máximos'), '(−1, 2)'); chk('analisis mín', await lec('analisis', 'Mínimos'), '(1, −2)');
  chk('analisis impar', await lec('analisis', 'Simetría'), t => /impar/.test(t));
  await chip('analisis', '[data-pre]', 1); chk('analisis parábola mín', await lec('analisis', 'Mínimos'), '(2, −1)'); chk('analisis ceros', await lec('analisis', 'Cortes con el eje X'), t => /1/.test(t) && /3/.test(t));
  await chip('analisis', '[data-pre]', 2); chk('analisis 1/(x-2) asíntotas', await lec('analisis', 'Asíntotas'), t => /vertical x = 2/.test(t) && /horizontal y = 0/.test(t)); chk('1/(x-2) dominio', await lec('analisis', 'Dominio'), 'ℝ − {2}');
  await chip('analisis', '[data-pre]', 3); chk('analisis e^x', await lec('analisis', 'Asíntotas'), t => /horizontal y = 0/.test(t)); chk('e^x corte Y', await lec('analisis', 'Corte con el eje Y'), '(0, 1)');
  await chip('analisis', '[data-pre]', 4); chk('analisis ln', await lec('analisis', 'Asíntotas'), t => /vertical x = 0/.test(t)); chk('ln dominio', await lec('analisis', 'Dominio'), '(0, +∞)');
  await chip('analisis', '[data-pre]', 6); chk('analisis |x-1| mín', await lec('analisis', 'Mínimos'), '(1, 0)');
  await chip('analisis', '[data-pre]', 8); chk('(x²−1)/(x²+1) par', await lec('analisis', 'Simetría'), t => /par: /.test(t)); chk('(x²−1)/(x²+1) asíntota', await lec('analisis', 'Asíntotas'), t => /y = 1/.test(t)); chk('mínimo', await lec('analisis', 'Mínimos'), '(0, −1)');
  await chip('analisis', '[data-pre]', 10); chk('hueco (x²−1)/(x−1) dominio', await lec('analisis', 'Dominio'), 'ℝ − {1}'); chk('hueco sin asíntota vertical', await lec('analisis', 'Asíntotas'), 'ninguna');
  // trozos
  await W('trozos').scrollIntoViewIfNeeded();
  chk('trozos abs', await lec('trozos', 'Continuidad'), t => /continua/.test(t));
  await chip('trozos', '[data-sel]', 1); chk('trozos salto', await lec('trozos', 'Continuidad'), t => /salto de 1/.test(t));
  await chip('trozos', '[data-sel]', 2); chk('trozos k=1 salto', await lec('trozos', 'Continuidad'), t => /salto de 2/.test(t));
  await range('trozos', 1, 2); chk('trozos k=2 continua', await lec('trozos', 'Continuidad'), t => /continua/.test(t) && !/salto/.test(t));
  await chip('trozos', '[data-sel]', 3); chk('trozos hueco', await lec('trozos', 'Continuidad'), t => /evitable/.test(t));
  await chip('trozos', '[data-sel]', 4); chk('trozos elec', await lec('trozos', 'Continuidad'), t => (t.match(/continua/g) || []).length === 2);
  await chip('trozos', '[data-sel]', 5); chk('trozos parte entera', await lec('trozos', 'Continuidad'), t => /salto de 1/.test(t));
  // cuadrática
  await W('cuadratica').scrollIntoViewIfNeeded();
  chk('cuadratica general', await lec('cuadratica', 'Forma general'), 'f(x) = x² − 4x + 3'); chk('cuadratica factorizada', await lec('cuadratica', 'Forma factorizada'), 'f(x) = (x − 1)(x − 3)'); chk('cuadratica Δ', await lec('cuadratica', 'Discriminante'), t => /^4/.test(t));
  await range('cuadratica', 0, -1); chk('a=−1 máximo', await lec('cuadratica', 'Abre'), t => /abajo/.test(t));
  // arrastre del vértice con ratón
  await W('cuadratica').locator('svg.plot').scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, -220)); await p.waitForTimeout(300); const hv = W('cuadratica').locator('.p-asa').first(); const bb = await hv.boundingBox(); const sv = await W('cuadratica').locator('svg.plot').boundingBox();
  await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.mouse.down(); await p.mouse.move(bb.x + bb.width / 2 + sv.width * 0.1, bb.y + bb.height / 2 + sv.height * 0.1, { steps: 5 }); await p.mouse.up();
  chk('arrastre vértice cambia', await lec('cuadratica', 'Vértice'), t => !/^\(2, −1\)/.test(t));
  // transformar
  await W('transformar').scrollIntoViewIfNeeded();
  chk('transformar fórmula', await lec('transformar', 'Función base'), t => /\(x − 2\)² \+ 1/.test(t));
  await chip('transformar', '[data-base]', 1); chk('transformar |x|', await lec('transformar', 'Función base'), t => /\|x − 2\| \+ 1/.test(t));
  await chip('transformar', '[data-mod]', 1); chk('|f|', await lec('transformar', 'Función base'), t => /y = \|/.test(t));
  // expolog
  await W('expolog').scrollIntoViewIfNeeded(); chk('expolog P', await lec('expolog', 'Punto P'), t => /2,828/.test(t));
  // modelo
  await W('modelo').scrollIntoViewIfNeeded(); chk('modelo t*', await lec('modelo', 'Se alcanza'), t => /23,45/.test(t));
  await chip('modelo', '[data-pre]', 2); chk('modelo medicamento', await lec('modelo', 'Se alcanza'), t => /8,5/.test(t));
  // inversa
  await W('inversa').scrollIntoViewIfNeeded(); chk('inversa', await lec('inversa', 'Inversa'), 'f⁻¹(x) = (x − 3)/2');
  await chip('inversa', '[data-sel]', 4); chk('x² no inyectiva', await lec('inversa', 'Prueba'), t => /2 puntos/.test(t) && /NO es inyectiva/.test(t));
  await chip('inversa', '[data-sel]', 5); chk('hom 1 punto', await lec('inversa', 'Prueba'), t => /1 punto/.test(t));
  // compuesta
  await W('compuesta').scrollIntoViewIfNeeded(); chk('compuesta fg', await lec('compuesta', '(f∘g)'), t => /\(x \+ 1\)²/.test(t) && /ℝ/.test(t));
  await chip('compuesta', '[data-sel]', 3); chk('ln∘x² dominio', await lec('compuesta', '(f∘g)'), t => /ℝ − \{0\}/.test(t)); chk('(ln x)² dominio', await lec('compuesta', '(g∘f)'), t => /\(0, \+∞\)/.test(t));
  await chip('compuesta', '[data-sel]', 1); chk('√(x−4)', await lec('compuesta', '(f∘g)'), t => /\[4, \+∞\)/.test(t));
  // interseccion
  await W('interseccion').scrollIntoViewIfNeeded(); chk('interseccion x²=x+2', await lec('interseccion', 'Solución'), t => /x = −1/.test(t) && /x = 2/.test(t));
  await chip('interseccion', '[data-modo]', 1); chk('x² > x+2', await lec('interseccion', 'Solución'), '(−∞, −1) ∪ (2, +∞)');
  await chip('interseccion', '[data-modo]', 2); chk('x² < x+2', await lec('interseccion', 'Solución'), '(−1, 2)');
  await chip('interseccion', '[data-pre]', 2); await chip('interseccion', '[data-modo]', 0); chk('e^x = x+2', await lec('interseccion', 'Solución'), t => /−1,8414/.test(t) && /1,1462/.test(t));
  // hiperbola
  await W('hiperbola').scrollIntoViewIfNeeded(); chk('hiperbola asíntotas', await lec('hiperbola', 'Asíntota vertical'), t => /x = 1/.test(t)); chk('hiperbola horiz', await lec('hiperbola', 'Asíntota horizontal'), t => /y = 2/.test(t));
  await chip('hiperbola', '[data-pre]', 0); chk('1/x', await lec('hiperbola', 'Asíntota vertical'), t => /x = 0/.test(t));
  // ondas
  await W('ondas').scrollIntoViewIfNeeded(); chk('ondas amplitud', await lec('ondas', 'Amplitud'), '2'); chk('ondas periodo', await lec('ondas', 'Periodo'), t => /2π/.test(t));
  await chip('ondas', '[data-fun]', 2); chk('tan periodo', await lec('ondas', 'Periodo'), t => /π/.test(t) && !/2π/.test(t));
  // leer gráfica
  await W('leergrafica').scrollIntoViewIfNeeded();
  const clic = async (i, j) => { await W('leergrafica').locator('.lg-p').nth(i).locator('.chip-btn').nth(j).click(); await p.waitForTimeout(40); return W('leergrafica').locator('.lg-p').nth(i).locator('.lg-r').innerText(); };
  chk('leergrafica mal', await clic(0, 1), t => /Todavía no/.test(t)); chk('leergrafica bien', await clic(0, 0), t => /Correcto/.test(t));
  // galería
  await W('galeria').scrollIntoViewIfNeeded(); await chip('galeria', '[data-sel]', 5); chk('galería inversa', await lec('galeria', 'Asíntotas'), t => /x = 0/.test(t));
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); chk('sin desborde horizontal', ov, v => v <= 1);
  console.log(mal ? mal + ' FALLOS de ' + n : n + ' comprobaciones de comportamiento de funciones correctas', '· errores JS:', errs.length ? errs : 'ninguno');
  await b.close();
})();
