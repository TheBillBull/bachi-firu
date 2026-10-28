// Pulsa los controles de los 5 simuladores nuevos de Matemáticas II · tema 1 (mm_*) y comprueba sus lecturas.
// Uso: node herramientas/pruebas/e2e_mates2_t1.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates2', 't1');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t1 [data-w=${nm}]`).first();
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got).slice(0, 160), 'esperado', typeof esp === 'function' ? '(función)' : JSON.stringify(esp)); } };
  const chip = async (nm, txt) => { await W(nm).locator('.chip-btn', { hasText: txt }).first().click(); await p.waitForTimeout(60); };
  const btn = async (nm, txt) => { await W(nm).locator('button', { hasText: txt }).first().click(); await p.waitForTimeout(60); };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(60); };
  const cel = async (nm, mat, i, j, v) => { await W(nm).locator(`input.mm-in[data-m=${mat}][data-i="${i}"][data-j="${j}"]`).fill(String(v)); await p.waitForTimeout(60); };
  const lec = async (nm, rot) => { const l = W(nm).locator('.lec', { hasText: rot }).first(); return (await l.locator('b').innerText()).replace(/\s+/g, ' ').trim(); };
  const pie = nm => W(nm).locator('.w-pie').innerText().then(t => t.replace(/\s+/g, ' '));
  const texto = nm => W(nm).innerText().then(t => t.replace(/\s+/g, ' '));

  // ---- producto ----
  let N = 'mm_producto';
  await W(N).scrollIntoViewIfNeeded();
  chk('producto: tema A·B existe 2×2', await lec(N, 'A·B'), t => /existe: 2×2/.test(t));
  chk('producto: A·B ≠ B·A', await lec(N, '¿A·B'), 'no');
  await btn(N, 'Siguiente');
  chk('producto: primer elemento 1·5 + 2·7 = 19', await pie(N), t => /1·5 \+ 2·7 = 19/.test(t));
  await btn(N, 'Siguiente');
  chk('producto: segundo elemento (1,2) = 22', await pie(N), t => /\(A·B\)12 = .*= 22/.test(t));
  await btn(N, 'Todo');
  chk('producto: resultado completo 19 22 43 50', await W(N).locator('[data-c] td').allInnerTexts().then(a => a.join(',')), '19,22,43,50');
  await cel(N, 'A', 0, 0, 2); await btn(N, 'Todo');
  chk('producto: editar a₁₁ = 2 → 2·5 + 2·7 = 24', await W(N).locator('[data-c] td').first().innerText(), '24');
  await chip(N, 'No conmutan'); await btn(N, 'Todo');
  chk('producto: No conmutan → 2 1 1 1', await W(N).locator('[data-c] td').allInnerTexts().then(a => a.join(',')), '2,1,1,1');
  await chip(N, 'AB = O'); await btn(N, 'Todo');
  chk('producto: AB = O', await W(N).locator('[data-c] td').allInnerTexts().then(a => a.join(',')), '0,0,0,0');
  await chip(N, '2×3 por 3×2'); await btn(N, 'Todo');
  chk('producto: 2×3 por 3×2 → 5 1 4 2', await W(N).locator('[data-c] td').allInnerTexts().then(a => a.join(',')), '5,1,4,2');
  chk('producto: B·A existe 3×3', await lec(N, 'B·A'), t => /existe: 3×3/.test(t));
  chk('producto: A·B y B·A de distinto tamaño', await lec(N, '¿A·B'), t => /distinto tamaño/.test(t));
  await chip(N, 'No se puede');
  chk('producto: dimensiones incompatibles → no existe', await lec(N, 'A·B'), 'no existe');
  await btn(N, 'Siguiente');
  chk('producto: aviso de dimensiones', await pie(N), t => /tiene 3 columnas y B tiene 2 filas/.test(t));
  await range(N, 1, 2); await range(N, 2, 2);
  chk('producto: deslizadores → A 2×2, B 2×3 existe 2×3', await lec(N, 'A·B'), t => /existe: 2×3/.test(t));
  await cel(N, 'A', 0, 0, 'x');
  chk('producto: texto no válido marca la celda', await W(N).locator('input.mm-in[data-m=A][data-i="0"][data-j="0"]').getAttribute('class'), t => /malo/.test(t));

  // ---- potencias ----
  N = 'mm_potencias';
  await W(N).scrollIntoViewIfNeeded();
  const pres = await W(N).locator('.chip-btn').allInnerTexts();
  chk('potencias: 9 presets', pres.length, 9);
  for (const t of pres) {
    await chip(N, t);
    for (const k of [1, 2, 3, 4, 7, 12]) {
      await range(N, 0, k);
      const c = await lec(N, 'Fórmula del patrón');
      chk(`potencias «${t}» n=${k} coincide con la fórmula`, c, x => /coincide/.test(x) && !/NO/.test(x));
    }
  }
  await chip(N, 'Fibonacci'); await range(N, 0, 10);
  chk('potencias: Fibonacci A¹⁰ contiene 89 55 34', await W(N).locator('.mm-pot.ult td').allInnerTexts().then(a => a.join(',')), '89,55,55,34');
  await chip(N, 'Giro'); await range(N, 0, 4);
  chk('potencias: giro A⁴ = I', await W(N).locator('.mm-pot.ult td').allInnerTexts().then(a => a.join(',')), '1,0,0,1');

  // ---- gauss ----
  N = 'mm_gauss';
  await W(N).scrollIntoViewIfNeeded();
  await chip(N, '2×2');
  chk('gauss: paso 0', await lec(N, 'Paso'), t => /^0 de/.test(t));
  await btn(N, 'Siguiente');
  chk('gauss: paso 1 avanza', await lec(N, 'Paso'), t => /^1 de/.test(t));
  await btn(N, 'Atrás');
  chk('gauss: atrás vuelve al paso 0', await lec(N, 'Paso'), t => /^0 de/.test(t));
  await btn(N, 'Todo');
  chk('gauss 2×2: A⁻¹ encontrada', await lec(N, 'Resultado'), 'A⁻¹ encontrada');
  chk('gauss 2×2: comprobación A·A⁻¹ = I', await lec(N, 'Comprobación'), t => /✓/.test(t));
  chk('gauss 2×2: A⁻¹ = 3 −1 −5 2', await W(N).locator('[data-amp] td[data-j="2"], [data-amp] td[data-j="3"]').allInnerTexts().then(a => a.join(',').replace(/−/g, '-')), '3,-1,-5,2');
  await chip(N, '3×3'); await btn(N, 'Todo');
  chk('gauss 3×3: A⁻¹ encontrada', await lec(N, 'Resultado'), 'A⁻¹ encontrada');
  chk('gauss 3×3: contiene 6/11', await texto(N), t => /6 ?11/.test(t));
  chk('gauss 3×3: pasos 7', await lec(N, 'Paso'), t => /^7 de 7/.test(t));
  await chip(N, 'con intercambio'); await btn(N, 'Todo');
  chk('gauss con intercambio: encontrada', await lec(N, 'Resultado'), 'A⁻¹ encontrada');
  await chip(N, 'con intercambio'); await btn(N, 'Siguiente');
  chk('gauss con intercambio: primer paso es un intercambio', await pie(N), t => /↔/.test(t));
  await chip(N, '2×2 sin inversa'); await btn(N, 'Todo');
  chk('gauss 2×2 singular', await lec(N, 'Resultado'), 'A no es invertible');
  await chip(N, '3×3 sin inversa'); await btn(N, 'Todo');
  chk('gauss 3×3 singular', await lec(N, 'Resultado'), 'A no es invertible');
  chk('gauss singular: botón Todo desactivado al final', await W(N).locator('button', { hasText: 'Todo' }).isDisabled(), true);
  await chip(N, '2×2'); await cel(N, 'A', 0, 0, 1); await cel(N, 'A', 0, 1, 1); await btn(N, 'Todo');
  chk('gauss: editar A = [[1,1],[5,3]] → encontrada y comprobada', await lec(N, 'Comprobación'), t => /✓/.test(t));
  await cel(N, 'A', 1, 0, 2); await cel(N, 'A', 1, 1, 2); await btn(N, 'Todo');
  chk('gauss: editar A = [[1,1],[2,2]] → singular', await lec(N, 'Resultado'), 'A no es invertible');

  // ---- ecuaciones ----
  N = 'mm_ecuacion';
  await W(N).scrollIntoViewIfNeeded();
  const formas = await W(N).locator('[data-pre] .chip-btn').allInnerTexts();
  chk('ecuación: 6 formas', formas.length, 6);
  for (const f of formas) {
    await chip(N, f);
    chk(`ecuación «${f}» cumple la ecuación`, await lec(N, '¿Cumple'), 'sí');
  }
  await chip(N, 'AX = B');
  chk('ecuación AX=B: X = A⁻¹B = 3 1 −2 −1', await W(N).locator('[data-res] table').first().locator('td').allInnerTexts().then(a => a.join(',').replace(/−/g, '-')), '3,1,-2,-1');
  await btn(N, 'orden equivocado');
  chk('ecuación AX=B: orden equivocado no cumple', await lec(N, '¿Cumple'), 'no');
  await btn(N, 'Volver');
  chk('ecuación AX=B: volver al orden correcto', await lec(N, '¿Cumple'), 'sí');
  await chip(N, 'XA = B'); await btn(N, 'orden equivocado');
  chk('ecuación XA=B: orden equivocado no cumple', await lec(N, '¿Cumple'), 'no');
  await chip(N, 'AX = B');
  await cel(N, 'A', 0, 0, 1); await cel(N, 'A', 0, 1, 2); await cel(N, 'A', 1, 0, 2); await cel(N, 'A', 1, 1, 4);
  chk('ecuación: A singular avisa', await texto(N), t => /no tiene inversa/.test(t));

  // ---- rango ----
  N = 'mm_rango';
  await W(N).scrollIntoViewIfNeeded();
  chk('rango p1 a=0 → 3', await lec(N, 'Rango de M'), '3');
  await range(N, 0, 2);
  chk('rango p1 a=1 → 1', await lec(N, 'Rango de M'), '1');
  await range(N, 0, -4);
  chk('rango p1 a=−2 → 2', await lec(N, 'Rango de M'), '2');
  chk('rango p1 valores críticos −2 y 1', await lec(N, 'Valores de a'), '−2, 1');
  await chip(N, '2×3'); await range(N, 0, 4);
  chk('rango p2 a=2 → 1', await lec(N, 'Rango de M'), '1');
  await range(N, 0, 1);
  chk('rango p2 a=0,5 → 2', await lec(N, 'Rango de M'), '2');
  await chip(N, 'cíclica'); await range(N, 0, -2);
  chk('rango p3 a=−1 → 2', await lec(N, 'Rango de M'), '2');
  await chip(N, '3×4'); await range(N, 0, -4);
  chk('rango p4 a=−2 → 3 (la 4.ª columna lo sube)', await lec(N, 'Rango de M'), '3');
  await range(N, 0, 2);
  chk('rango p4 a=1 → 1', await lec(N, 'Rango de M'), '1');
  chk('rango: gráfica presente', await W(N).locator('svg.plot').count(), 1);

  // ---- barrido genérico + desborde ----
  for (const nm of ['mm_producto', 'mm_potencias', 'mm_gauss', 'mm_ecuacion', 'mm_rango']) {
    chk(nm + ' sin error', await W(nm).locator('.w-error').count(), 0);
    const ow = await W(nm).evaluate(e => e.scrollWidth - e.clientWidth);
    chk(nm + ' sin desborde interno', ow, v => v <= 1);
  }
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  chk('sin desborde horizontal de página', ov, v => v <= 1);
  console.log(mal ? mal + ' FALLOS de ' + n : n + ' comprobaciones de comportamiento de mates2 t1 correctas', '· errores JS:', errs.length ? errs : 'ninguno');
  await b.close();
})();
