// Pulsa los controles de los 5 simuladores nuevos de Matemáticas II · tema 3 (ms_*) y comprueba sus lecturas.
// Uso: node herramientas/pruebas/e2e_mates2_t3.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates2', 't3');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t3 [data-w=${nm}]`).first();
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got).slice(0, 200), 'esperado', typeof esp === 'function' ? '(función)' : JSON.stringify(esp)); } };
  const chip = async (nm, txt) => { await W(nm).locator('.chip-btn', { hasText: txt }).first().click(); await p.waitForTimeout(60); };
  const btn = async (nm, txt) => { await W(nm).locator('button', { hasText: txt }).first().click(); await p.waitForTimeout(60); };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(60); };
  const cel = async (nm, i, j, v) => { await W(nm).locator(`input.mm-in[data-i="${i}"][data-j="${j}"]`).fill(String(v)); await p.waitForTimeout(60); };
  const lec = (nm, rot) => W(nm).evaluate((el, rot) => { const l = [...el.querySelectorAll('.lec')].find(x => x.querySelector('small').textContent.startsWith(rot)); return l ? l.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const pie = nm => W(nm).locator('.w-pie').innerText().then(t => t.replace(/\s+/g, ' '));
  const texto = nm => W(nm).innerText().then(t => t.replace(/\s+/g, ' '));
  const tipo = nm => lec(nm, 'Tipo');

  // ---- Gauss ----
  let N = 'ms_gauss';
  await W(N).scrollIntoViewIfNeeded();
  chk('gauss: paso 0', await lec(N, 'Paso'), t => /^0 de \d/.test(t));
  await btn(N, 'Siguiente');
  chk('gauss: primer paso = intercambio o eliminación con F₁', await pie(N), t => /F₂ ← 2·F₂ − F₁/.test(t));
  await btn(N, 'Todo');
  chk('gauss SCD: tipo', await tipo(N), t => /^SCD/.test(t));
  chk('gauss SCD: rg(A)', await lec(N, 'rg(A)'), '3');
  chk('gauss SCD: solución', await pie(N), t => /x = 1, y = −1, z = 2/.test(t));
  await btn(N, 'Atrás');
  chk('gauss: Atrás vuelve al sistema escalonado', await pie(N), t => /Matriz escalonada/.test(t));
  await btn(N, 'Reiniciar');
  chk('gauss: Reiniciar', await lec(N, 'Paso'), t => /^0 de/.test(t));
  await chip(N, 'SCI'); await btn(N, 'Todo');
  chk('gauss SCI: tipo', await tipo(N), t => /^SCI/.test(t));
  chk('gauss SCI: rg(A)=rg(A|B)=2', [await lec(N, 'rg(A)'), await lec(N, 'rg(A|B)')].join(), '2,2');
  chk('gauss SCI: 1 parámetro y solución', await pie(N), t => /1 parámetro/.test(t) && /x = 1 − λ\/3/.test(t) && /y = −2 \+ 5λ\/3/.test(t) && /z = λ/.test(t));
  await chip(N, 'SI'); await btn(N, 'Todo');
  chk('gauss SI: tipo', await tipo(N), t => /^SI/.test(t));
  chk('gauss SI: rangos 2 y 3', [await lec(N, 'rg(A)'), await lec(N, 'rg(A|B)')].join(), '2,3');
  chk('gauss SI: último paso dice incompatible', await pie(N), t => /incompatible/.test(t));
  await btn(N, 'Atrás');
  chk('gauss SI: fila imposible 0 = 2', await pie(N), t => /0 = 2/.test(t));
  await btn(N, 'Todo');
  chk('gauss SI: celda marcada en rojo', await W(N).locator('td.mal2').count(), t => t >= 1);
  await chip(N, '4 ecuaciones'); await btn(N, 'Todo');
  chk('gauss 4×3: SCD y solución', await pie(N), t => /x = 1, y = 1, z = 2/.test(t));
  await chip(N, '2 ecuac.'); await btn(N, 'Todo');
  chk('gauss 2×3: SCI con z libre', await pie(N), t => /x = 1 − λ, y = 1 \+ λ, z = λ/.test(t));
  await chip(N, 'Homogéneo'); await btn(N, 'Todo');
  chk('gauss homogéneo: SCI', await tipo(N), t => /^SCI/.test(t));
  chk('gauss homogéneo: solución (−4λ/3, λ/3, λ)', await pie(N), t => /x = −4λ\/3, y = λ\/3, z = λ/.test(t));
  await chip(N, 'SCD 3×3');
  await cel(N, 0, 3, 7);   // cambia el 1.er término independiente: sigue siendo SCD
  await btn(N, 'Todo');
  chk('gauss: editar b₁ = 7 → (x, y, z) distinto', await pie(N), t => /x = /.test(t) && !/x = 1, y = −1, z = 2/.test(t));
  await btn(N, 'Reiniciar');
  await cel(N, 0, 3, 'x');
  chk('gauss: texto no válido marca la celda', await W(N).locator('input.mm-in[data-i="0"][data-j="3"]').getAttribute('class'), t => /malo/.test(t));

  // ---- Discusor ----
  N = 'ms_discusor';
  await W(N).scrollIntoViewIfNeeded();
  chk('discusor p1 m=0: SCD', await tipo(N), t => /^SCD/.test(t));
  chk('discusor p1 m=0: solución', await pie(N), t => /x = −1\/2, y = 1\/2, z = 1\/2/.test(t));
  await btn(N, 'm = −2');
  chk('discusor p1 m=−2: SI con rangos 2 y 3', [await tipo(N), await lec(N, 'rg(A)'), await lec(N, 'rg(A|B)')].join('|'), t => /^SI.*\|2\|3$/.test(t));
  await btn(N, 'm = 1');
  chk('discusor p1 m=1: SCI con rango 1', [await tipo(N), await lec(N, 'rg(A)')].join('|'), t => /^SCI.*\|1$/.test(t));
  await btn(N, 'm = 0,5');
  chk('discusor p1 m=0,5: SCD', await tipo(N), t => /^SCD/.test(t));
  await range(N, 0, 8);
  chk('discusor: el deslizador cambia m a 2', await lec(N, 'm'), '2');
  await chip(N, 'Dos valores');
  await btn(N, 'm = 2');
  chk('discusor p2 m=2: SCI', await tipo(N), t => /^SCI/.test(t));
  chk('discusor p2 m=2: solución (5λ, 1 − 4λ, λ)', await pie(N), t => /x = 5λ, y = 1 − 4λ, z = λ/.test(t));
  await btn(N, 'm = −3');
  chk('discusor p2 m=−3: SI', await tipo(N), t => /^SI/.test(t));
  await chip(N, 'm en B y en A');
  await btn(N, 'm = 1');
  chk('discusor p3 m=1: SCI', await tipo(N), t => /^SCI/.test(t));
  await btn(N, 'm = 2');
  chk('discusor p3 m=2: SI', await tipo(N), t => /^SI/.test(t));
  await chip(N, 'Solo en B');
  await btn(N, 'm = 3');
  chk('discusor p4 m=3: SCI (rangos 2 y 2)', [await tipo(N), await lec(N, 'rg(A)'), await lec(N, 'rg(A|B)')].join('|'), t => /^SCI.*\|2\|2$/.test(t));
  await btn(N, 'm = 0,5');
  chk('discusor p4 m=0,5: SI', await tipo(N), t => /^SI/.test(t));
  await chip(N, '2×2');
  await btn(N, 'm = 2');
  chk('discusor p5 m=2: SCI', await tipo(N), t => /^SCI/.test(t));
  await btn(N, 'm = −2');
  chk('discusor p5 m=−2: SI', await tipo(N), t => /^SI/.test(t));
  await chip(N, 'Homogéneo');
  for (const k of [-16, -7, 0, 4, 8, 16]) { await range(N, 0, k); chk(`discusor homogéneo m=${k / 4} nunca SI`, await tipo(N), t => !/^SI/.test(t)); }

  // ---- Planos ----
  N = 'ms_planos';
  await W(N).scrollIntoViewIfNeeded();
  chk('planos: SCD', [await tipo(N), await lec(N, 'Solución')].join('|'), t => /^SCD.*\|\(1, 2, 3\)$/.test(t));
  chk('planos: dibuja 3 polígonos y un punto', [await W(N).locator('svg.ms-svg polygon').count(), await W(N).locator('svg.ms-svg circle.pto').count()].join(), '3,1');
  const antes = await W(N).locator('svg.ms-svg').innerHTML();
  await range(N, 0, 100);
  chk('planos: el giro cambia el dibujo', (await W(N).locator('svg.ms-svg').innerHTML()) !== antes, true);
  await range(N, 1, 60);
  const casos = [['Una recta', /^SCI/, /misma recta/, '2,2'], ['Prisma', /^SI/, /prisma/, '2,3'], ['2 paralelos', /^SI/, /paralelos \(distintos\)/, '2,3'], ['2 coincidentes \\+', /^SCI/, /coinciden y el tercero/, '2,2'], ['Coincidentes \\(', /^SCI/, /Los tres planos coinciden/, '1,1'], ['2 coincid\\. \\+ 1 paralelo', /^SI/, /coinciden y el tercero es paralelo/, '1,2'], ['3 paralelos', /^SI/, /paralelos y distintos/, '1,2']];
  for (const [chp, reTipo, rePie, rg] of casos) {
    await W(N).locator('.chip-btn', { hasText: new RegExp(chp) }).first().click(); await p.waitForTimeout(60);
    chk(`planos «${chp}»: tipo`, await tipo(N), t => reTipo.test(t));
    chk(`planos «${chp}»: posición`, await pie(N), t => rePie.test(t));
    chk(`planos «${chp}»: rangos`, [await lec(N, 'rg(A)'), await lec(N, 'rg(A|B)')].join(), rg);
  }
  await chip(N, 'Una recta');
  chk('planos recta: trazo grueso común', await W(N).locator('svg.ms-svg polyline.com').count(), 1);
  await chip(N, 'Un punto');
  await cel(N, 2, 3, 3);   // 3.er plano: x + 2y − z = 3 → otro punto
  chk('planos: editar el 3.er plano cambia la solución', await lec(N, 'Solución'), t => /^\(/.test(t) && t !== '(1, 2, 3)');

  // ---- Cramer ----
  N = 'ms_cramer';
  await W(N).scrollIntoViewIfNeeded();
  chk('cramer 3×3: det(A) = −16', await lec(N, 'det(A)'), '−16');
  chk('cramer: solución (1, −1, 2)', await lec(N, 'Solución'), '(1, −1, 2)');
  chk('cramer: A·X = B', await lec(N, 'A·X = B'), t => /se cumple/.test(t));
  chk('cramer: x = det(Ax)/det(A) = −16/−16', await W(N).locator('.lec', { hasText: 'det(A' }).nth(1).innerText().then(t => t.replace(/\s+/g, ' ')), t => /−16 \/ −16 = 1/.test(t));
  await chip(N, 'incógnita z');
  chk('cramer: z = −32/−16 = 2', await W(N).locator('.lec', { hasText: 'det(Az)' }).first().innerText().then(t => t.replace(/\s+/g, ' ')), t => /−32 \/ −16 = 2/.test(t));
  chk('cramer: la columna sustituida se marca (3 celdas)', await W(N).locator('[data-ai] td.col').count(), 3);
  await chip(N, '2×2');
  chk('cramer 2×2: det = −5 y solución (3, 2)', [await lec(N, 'det(A)'), await lec(N, 'Solución')].join('|'), '−5|(3, 2)');
  await chip(N, 'incógnita y');
  chk('cramer 2×2: y = −10/−5 = 2', await W(N).locator('.lec', { hasText: 'det(Ay)' }).first().innerText().then(t => t.replace(/\s+/g, ' ')), t => /−10 \/ −5 = 2/.test(t));
  await chip(N, '3×3 (x = 0)');
  chk('cramer 3×3: det −14 y solución (0, 2, 1)', [await lec(N, 'det(A)'), await lec(N, 'Solución')].join('|'), '−14|(0, 2, 1)');
  await chip(N, 'det(A) = 0');
  chk('cramer det=0: no se puede aplicar', await texto(N), t => /no se puede aplicar/.test(t));
  chk('cramer det=0: tipo SCI', await tipo(N), t => /^SCI/.test(t));
  await chip(N, '3×3');   // primero que contenga "3×3": 3×3
  await cel(N, 0, 0, 0); await cel(N, 1, 0, 0); await cel(N, 2, 0, 0);
  chk('cramer: columna x nula → det = 0', await texto(N), t => /no se puede aplicar/.test(t));

  // ---- Problemas ----
  N = 'ms_problema';
  await W(N).scrollIntoViewIfNeeded();
  chk('problema: edades, solo el primer paso visible', await W(N).locator('.ms-paso:not([hidden])').count(), 1);
  await btn(N, 'Siguiente');
  chk('problema: 2 pasos tras pulsar', await W(N).locator('.ms-paso:not([hidden])').count(), 2);
  await btn(N, 'Todo');
  chk('problema edades: SCD y solución', await texto(N), t => /SCD/.test(t) && /x = 30/.test(t) && /y = 10/.test(t));
  await btn(N, 'Atrás');
  chk('problema: Atrás oculta un paso', await W(N).locator('.ms-paso:not([hidden])').count(), 4);
  await chip(N, 'Entradas'); await btn(N, 'Todo');
  chk('problema cine: (66, 36, 18)', await texto(N), t => /x = 66/.test(t) && /y = 36/.test(t) && /z = 18/.test(t));
  await chip(N, 'Mezcla'); await btn(N, 'Todo');
  chk('problema mezcla: (40, 40, 20)', await texto(N), t => /x = 40/.test(t) && /y = 40/.test(t) && /z = 20/.test(t));
  await chip(N, 'Precios'); await btn(N, 'Todo');
  chk('problema precios: (5/2, 3/2, 2)', await texto(N), t => /x = 5\/2/.test(t) && /y = 3\/2/.test(t) && /z = 2/.test(t));
  await chip(N, 'Sin datos'); await btn(N, 'Todo');
  chk('problema fondos: SCI y solución general', await texto(N), t => /SCI/.test(t) && /x = λ, y = 6000 − 2λ, z = λ/.test(t));

  console.log(`e2e mates2 t3 (${movil ? 'móvil' : 'escritorio'}): ${n - mal}/${n} comprobaciones · errores JS: ${errs.length ? errs.join(' | ') : 'ninguno'}`);
  await b.close();
  process.exit(mal || errs.length ? 1 : 0);
})();
