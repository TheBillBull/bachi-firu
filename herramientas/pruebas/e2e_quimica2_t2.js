// Pulsa los controles de TODOS los widgets de Química II · tema 2 y comprueba las lecturas de los 3 nuevos (qq2_*).
// Uso: node herramientas/pruebas/e2e_quimica2_t2.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'quimica2', 't2');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t2 [data-w=${nm}]`).first();
  const chip = async (nm, txt) => { await W(nm).locator('.chip-btn', { hasText: txt }).first().click(); await p.waitForTimeout(80); };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(80); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(función)' : JSON.stringify(esp)); } };
  const ok = (nm, cond, info) => chk(nm, !!cond, true) || (cond ? 0 : console.log('   ', String(info).slice(0, 220)));
  const lec = async nm => (await W(nm).locator('.lectura').innerText()).replace(/\s+/g, ' ');
  const caja = (i, j) => W('qq2_llenar').locator(`.q2-caja[data-i="${i}"][data-j="${j}"]`);
  const pulsa = async (i, j, k = 1) => { for (let x = 0; x < k; x++) await caja(i, j).click(); };
  const comprueba = async () => { await W('qq2_llenar').locator('button', { hasText: 'Comprobar' }).click(); await p.waitForTimeout(80); return lec('qq2_llenar'); };

  // ---- barrido genérico: todos los widgets del tema ----
  const nombres = await p.locator('#detail-t2 [data-w]').evaluateAll(es => [...new Set(es.map(e => e.getAttribute('data-w')))]);
  for (const x of ['qq2_fotoel', 'qq2_broglie', 'qq2_llenar', 'q1_bohr', 'q1_cuanticos', 'q1_config']) chk('presente ' + x, nombres.includes(x), true);
  for (const nm of nombres.filter(x => !/^(quiz|tarjetas|emparejar|clasificar|orden)$/.test(x))) {
    const w = W(nm); await w.scrollIntoViewIfNeeded();
    const nc = await w.locator('.chip-btn').count();
    for (let i = 0; i < nc; i++) { try { await w.locator('.chip-btn').nth(i).click({ timeout: 2000 }); } catch (e) { chk(nm + ' chip ' + i + ' pulsable', e.message.slice(0, 60), 'ok'); } }
    const nr = await w.locator('input[type=range]').count();
    for (let i = 0; i < nr; i++) for (const f of [0, 1, 0.5]) await w.locator('input[type=range]').nth(i).evaluate((e, f) => { e.value = +e.min + f * (+e.max - +e.min); e.dispatchEvent(new Event('input', { bubbles: true })); }, f);
    await p.waitForTimeout(60);
    chk(nm + ' sin error tras pulsar todo', await w.locator('.w-error').count(), 0);
    chk(nm + ' no vacío', (await w.innerText()).length > 40, true);
  }

  // ---- qq2_fotoel ----
  const F = 'qq2_fotoel';
  await W(F).scrollIntoViewIfNeeded();
  await chip(F, 'Na'); await range(F, 0, 300); await range(F, 1, 50);
  let t = await lec(F);
  ok('fotoel Na 300 nm: Ec = 1,84 eV', /1,84 eV/.test(t), t.slice(0, 300));
  ok('fotoel Na: umbral 539 nm', /539 nm/.test(t), t.slice(0, 300));
  ok('fotoel Na: v = 8,0·10⁵ m/s', /8,0\d*·10⁵ m\/s/.test(t), t);
  await range(F, 1, 100); t = await lec(F);
  ok('fotoel: con el doble de intensidad la Ec no cambia', /1,84 eV/.test(t), t.slice(0, 200));
  ok('fotoel: con el doble de intensidad hay 100 fotoelectrones relativos', /100 \(unidades relativas\)/.test(t), t);
  await chip(F, 'Cs'); await range(F, 0, 600);
  t = await lec(F); ok('fotoel Cs 600 nm (2,07 eV < 2,1): no hay emisión', /NO se arranca/.test(t), t.slice(0, 300));
  await chip(F, 'Zn'); await range(F, 0, 400); await range(F, 1, 100);
  t = await lec(F); ok('fotoel Zn 400 nm, máxima intensidad: sigue sin emitir', /NO se arranca/.test(t), t.slice(0, 300));
  await range(F, 0, 200); t = await lec(F);
  ok('fotoel Zn 200 nm: Ec ≈ 1,9 eV (6,2 − 4,3)', /1,9\d? eV/.test(t) && !/NO se arranca/.test(t), t.slice(0, 300));

  // ---- qq2_broglie ----
  const D = 'qq2_broglie';
  await W(D).scrollIntoViewIfNeeded();
  await chip(D, 'Electrón'); await range(D, 0, 6.35);
  t = await lec(D); ok('broglie e⁻ a 2,19·10⁶ m/s: λ ≈ 3,2·10⁻¹⁰ m', /3,2\d*·10⁻¹⁰ m/.test(t), t.slice(0, 300));
  ok('broglie e⁻: es comparable a un átomo', /efectos ondulatorios importantes/.test(t), t.slice(0, 300));
  await range(D, 1, 1); const t1 = await lec(D); await range(D, 1, 10); const t10 = await lec(D);
  ok('broglie: cambiar Δv cambia la Δx mínima', t1 !== t10, t1.slice(0, 200));
  await chip(D, 'Pelota'); t = await lec(D);
  ok('broglie pelota: λ ~ 10⁻³⁴ m y no se nota', /10⁻³⁴ m/.test(t) && /no se nota/.test(t), t.slice(0, 300));
  await chip(D, 'Protón'); t = await lec(D);
  ok('broglie protón responde', /λ = h\/\(m·v\)/.test(t), t.slice(0, 200));

  // ---- qq2_llenar ----
  const L = 'qq2_llenar';
  await W(L).scrollIntoViewIfNeeded();
  await chip(L, 'N');
  t = await comprueba(); ok('llenar: vacío → pide 7 electrones', /exactamente 7/.test(t), t);
  await pulsa(0, 0, 3); await pulsa(1, 0, 3); await pulsa(2, 0); await pulsa(2, 1); await pulsa(2, 2);
  chk('llenar: 7 electrones colocados', /7 \/ 7/.test(await lec(L)), true);
  t = await comprueba(); ok('llenar N correcto', /Correcto/.test(t) && /3 desapareados/.test(t), t);
  await W(L).locator('button', { hasText: 'Vaciar' }).click(); await p.waitForTimeout(80);
  chk('llenar: «Vaciar» deja 0 electrones', /0 \/ 7/.test(await lec(L)), true);
  await pulsa(0, 0, 3); await pulsa(1, 0, 3); await pulsa(2, 0, 3); await pulsa(2, 1);
  t = await comprueba(); ok('llenar: aparear antes de tiempo → Hund', /Hund/.test(t), t);
  await W(L).locator('button', { hasText: 'Vaciar' }).click();
  await pulsa(0, 0, 3); await pulsa(1, 0, 3); await pulsa(2, 0); await pulsa(2, 1); await pulsa(3, 0);
  t = await comprueba(); ok('llenar: 3s antes de completar 2p → Aufbau', /Aufbau/.test(t), t);
  await W(L).locator('button', { hasText: 'Vaciar' }).click();
  await pulsa(0, 0, 3); await pulsa(1, 0, 3); await pulsa(2, 0, 1); await pulsa(2, 1, 2); await pulsa(2, 2);
  t = await comprueba(); ok('llenar: espines mezclados en el 2p → Hund', /Hund/.test(t), t);
  await chip(L, 'Cr');
  await W(L).locator('button', { hasText: 'Mostrar solución' }).click(); await p.waitForTimeout(80);
  t = await lec(L); ok('llenar Cr: solución con excepción 4s¹ 3d⁵ y 6 desapareados', /4s¹/.test(t) && /3d⁵/.test(t) && /6 desapareados/.test(t), t);
  t = await comprueba(); ok('llenar Cr: la solución mostrada se comprueba como correcta', /Correcto/.test(t), t);
  await chip(L, 'Fe³⁺');
  await W(L).locator('button', { hasText: 'Mostrar solución' }).click(); await p.waitForTimeout(80);
  t = await lec(L); ok('llenar Fe³⁺: 3d⁵ y 5 desapareados, sin 4s', /3d⁵/.test(t) && /5 desapareados/.test(t) && !/4s/.test(t), t);
  await chip(L, 'Cl⁻'); t = await lec(L); ok('llenar Cl⁻: pide 18 electrones', /0 \/ 18/.test(t), t);

  const dist = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  chk('sin desborde horizontal', dist <= 1, true);
  chk('sin errores JS', errs.join(' | '), '');
  console.log(mal ? `x ${mal} fallos de ${n}` : `ok ${n} comprobaciones, todo bien`);
  await b.close(); process.exit(mal ? 1 : 0);
})();
