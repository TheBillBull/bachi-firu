// Pulsa los controles de TODOS los widgets de Química II · tema 4 y comprueba lecturas de los 3 nuevos (q4_*).
// Uso: node herramientas/pruebas/e2e_quimica2_t4.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'quimica2', 't4');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t4 [data-w=${nm}]`).first();
  const chip = async (nm, txt) => { await W(nm).locator('.chip-btn', { hasText: txt }).first().click(); await p.waitForTimeout(80); };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(80); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? 'cond' : esp); } };
  const ok = (nm, cond, info) => chk(nm, !!cond, true) || (cond ? 0 : console.log('   ', String(info).slice(0, 220)));
  const txt = nm => W(nm).innerText();

  // ---- barrido genérico: todos los widgets, todos los chips y deslizadores ----
  const nombres = await p.locator('#detail-t4 [data-w]').evaluateAll(es => [...new Set(es.map(e => e.getAttribute('data-w')))]);
  for (const x of ['q4_angulos', 'q4_morse', 'q4_ficha', 'q2_lewis', 'q2_vsepr', 'q2_polaridad', 'q2_hibrid', 'q2_red', 'q2_bornhaber', 'q2_fuerzas', 'q2_propiedades', 'q2_metalico', 'q2_deltaen']) chk('presente ' + x, nombres.includes(x), true);
  for (const nm of nombres.filter(x => !/^(quiz|tarjetas|emparejar|clasificar|orden)$/.test(x))) {
    const w = W(nm); await w.scrollIntoViewIfNeeded();
    const nc = await w.locator('.chip-btn:not([disabled])').count();
    for (let i = 0; i < nc; i++) { try { await w.locator('.chip-btn:not([disabled])').nth(i).click({ timeout: 2000 }); } catch (e) { if (nm !== 'q4_ficha') chk(nm + ' chip ' + i + ' pulsable', e.message.slice(0, 60), 'ok'); } }
    const nr = await w.locator('input[type=range]').count();
    for (let i = 0; i < nr; i++) for (const f of [0, 1, 0.5]) await w.locator('input[type=range]').nth(i).evaluate((e, f) => { e.value = +e.min + f * (+e.max - +e.min); e.dispatchEvent(new Event('input', { bubbles: true })); }, f);
    await p.waitForTimeout(60);
    chk(nm + ' sin error tras pulsar todo', await w.locator('.w-error').count(), 0);
    chk(nm + ' no vacío', (await w.innerText()).length > 40, true);
  }

  // ---- q4_angulos ----
  const A = 'q4_angulos';
  await W(A).scrollIntoViewIfNeeded();
  await chip(A, 'Periodo 2');
  let t = await txt(A);
  ok('ángulos P2: CH4 109,5 · NH3 107 · H2O 104,5', /109,5°/.test(t) && /107°/.test(t) && /104,5°/.test(t), t.slice(0, 300));
  chk('ángulos P2: 3 puntos', await W(A).locator('circle.p-punto').count(), 3);
  await chip(A, 'Periodo 3'); t = await txt(A);
  ok('ángulos P3: PH3 93,3 y H2S 92,1', /93,3°/.test(t) && /92,1°/.test(t), t.slice(0, 300));
  await chip(A, 'Grupo 15'); t = await txt(A);
  chk('ángulos G15: 4 puntos', await W(A).locator('circle.p-punto').count(), 4);
  ok('ángulos G15: SbH3 91,7', /91,7°/.test(t), t.slice(0, 300));
  await chip(A, 'sustituyente'); t = await txt(A);
  ok('ángulos: NF3 102,3', /102,3°/.test(t), t.slice(0, 300));
  const lin0 = await W(A).locator('line.p-seg').count();
  await range(A, 0, 0);
  chk('ángulos: sin referencias hay menos líneas', await W(A).locator('line.p-seg').count() < lin0, true);
  ok('ángulos: etiqueta del deslizador cambia', /solo los ángulos/.test(await txt(A)), '');

  // ---- q4_morse ----
  const M = 'q4_morse';
  await W(M).scrollIntoViewIfNeeded();
  await chip(M, 'C–C'); await range(M, 0, 154); t = await txt(M);
  ok('morse: en r = 154 pm la energía del C–C es −347 kJ/mol', /C–C[^\n]*E\(r\) = [−-]347/.test(t.replace(/\n/g, ' ')) || /E\(r\) = [−-]347/.test(t), t.slice(0, 400));
  chk('morse: 3 curvas de C', await W(M).locator('path.p-curva').count(), 3);
  await range(M, 0, 60); t = await txt(M);
  ok('morse: a 60 pm la energía es positiva (repulsión)', /E\(r\) = \d/.test(t.replace(/−/g, '-').replace('E(r) = -', 'E(r) = X')) && /E\(r\) = \d/.test(t), t.slice(0, 300));
  await range(M, 0, 320); t = await txt(M);
  ok('morse: a 320 pm casi disociado (≈ 0)', /E\(r\) = [−-]?[0-9]\b/.test(t) || /E\(r\) = [−-][0-9]{1,2}\b/.test(t), t.slice(0, 300));
  await chip(M, 'Halógenos'); t = await txt(M);
  chk('morse halógenos: 4 curvas', await W(M).locator('path.p-curva').count(), 4);
  ok('morse: lista F–F y I–I con sus D', /F–F[^]*159/.test(t) && /I–I[^]*151/.test(t), t.slice(0, 400));
  chk('morse: el deslizador se recoloca al cambiar de grupo (r₀ del F–F = 142)', await W(M).locator('input[type=range]').first().inputValue(), '142');
  await chip(M, 'N–N'); t = await txt(M);
  ok('morse N: N≡N 945', /945/.test(t) && /110 pm/.test(t), t.slice(0, 300));
  await chip(M, 'con H'); t = await txt(M);
  ok('morse H: H–F 567', /567/.test(t), t.slice(0, 300));

  // ---- q4_ficha ----
  const F = 'q4_ficha';
  await W(F).scrollIntoViewIfNeeded();
  const paso = (k, o) => W(F).locator(`[data-p=${k}] [data-o="${o}"]`);
  await chip(F, 'H₂O');
  chk('ficha: pasos 2-4 bloqueados al principio', await W(F).locator('[data-p=g] [data-o]').first().isDisabled(), true);
  await paso('ax', 'AX₃').click(); await p.waitForTimeout(80);
  ok('ficha: respuesta mala marca ✗', /✗/.test(await txt(F)), (await txt(F)).slice(0, 300));
  chk('ficha: tras un fallo sigue bloqueado el paso 2', await W(F).locator('[data-p=g] [data-o]').first().isDisabled(), true);
  await paso('ax', 'AX₂E₂').click(); await p.waitForTimeout(80);
  chk('ficha: tras acertar se desbloquea el paso 2', await W(F).locator('[data-p=g] [data-o]').first().isDisabled(), false);
  await paso('g', 'angular').click(); await paso('h', 'sp³').click(); await p.waitForTimeout(50);
  await paso('p', 'polar').click(); await p.waitForTimeout(80);
  t = await txt(F);
  ok('ficha H2O: resumen AX₂E₂ → angular → sp³ → polar', /AX₂E₂ ⟶? ?angular|AX₂E₂.*angular.*sp³.*polar/.test(t.replace(/\n/g, ' ')), t.slice(0, 400));
  ok('ficha H2O: explicación con 1,85 D', /1,85 D/.test(t), '');
  // todas las moléculas se resuelven con su solución
  const SOL = { 'CO₂': ['AX₂', 'lineal', 'sp', 'apolar'], 'NH₃': ['AX₃E', 'pirámide trigonal', 'sp³', 'polar'], 'BF₃': ['AX₃', 'trigonal plana', 'sp²', 'apolar'], 'SO₂': ['AX₂E', 'angular', 'sp²', 'polar'], 'CHCl₃': ['AX₄', 'tetraédrica', 'sp³', 'polar'], 'HCN': ['AX₂', 'lineal', 'sp', 'polar'] };
  for (const [m, s] of Object.entries(SOL)) {
    await W(F).locator('.chips').first().locator('.chip-btn', { hasText: new RegExp('^' + m + '$') }).click(); await p.waitForTimeout(60);
    for (const [k, o] of [['ax', s[0]], ['g', s[1]], ['h', s[2]], ['p', s[3]]]) { await paso(k, o).click(); await p.waitForTimeout(40); }
    ok('ficha ' + m + ' completa', /Resumen de/.test(await txt(F)), (await txt(F)).slice(0, 200));
  }
  await W(F).locator('.chips').first().locator('.chip-btn', { hasText: /^CO₂$/ }).click(); await p.waitForTimeout(60);
  chk('ficha: al cambiar de molécula se reinicia', /Resumen de/.test(await txt(F)), false);

  // ---- reutilizados: una comprobación puntual de cada uno ----
  await W('q2_bornhaber').scrollIntoViewIfNeeded(); await chip('q2_bornhaber', 'NaCl');
  ok('Born–Haber NaCl da U = 787', /787/.test(await txt('q2_bornhaber')), '');
  await W('q2_fuerzas').scrollIntoViewIfNeeded(); await chip('q2_fuerzas', 'grupo 16');
  ok('fuerzas g16 muestra H₂O 100', /100/.test(await txt('q2_fuerzas')), '');

  const dist = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  chk('sin desborde horizontal', dist <= 1, true);
  chk('sin errores JS', errs.join(' | '), '');
  console.log(mal ? `x ${mal} fallos de ${n}` : `ok ${n} comprobaciones, todo bien`);
  await b.close(); process.exit(mal ? 1 : 0);
})();
