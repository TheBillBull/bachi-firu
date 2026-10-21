// Comportamiento de los simuladores de FyQ I · tema 2 (enlace químico). Uso: node herramientas/pruebas/e2e_fyq1_t2.js [movil]
// Cada comprobación actúa sobre el widget como lo haría una persona (fichas, deslizadores, botones) y compara la lectura con valores
// calculados aparte (electronegatividades de Pauling, electrones de valencia, TRPECV, Kapustinskii, regresión de los hidruros…).
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'fyq1', 't2');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t2 [data-w=${nm}]`).first();
  const lec = async (nm, rot) => W(nm).locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chip = async (nm, sel, i) => { await W(nm).locator(sel + ' .chip-btn').nth(i).click(); await p.waitForTimeout(80); };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(60); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const num = s => parseFloat(String(s).replace(/[^\d,.-]/g, '').replace(',', '.'));
  const digitos = s => parseInt(String(s).replace(/\D/g, ''), 10);
  const ver = async nm => { await W(nm).scrollIntoViewIfNeeded(); };

  // ---- electronegatividad ----
  await ver('q2_deltaen');
  chk('deltaen: NaCl inicial', [await lec('q2_deltaen', 'Diferencia'), await lec('q2_deltaen', 'Tipo de enlace')], a => a[0] === '2,23' && a[1] === 'iónico');
  chk('deltaen: carácter iónico NaCl 71 %', await lec('q2_deltaen', 'Carácter'), '71 %');
  await chip('q2_deltaen', '[data-pre]', 1);                                     // HCl
  chk('deltaen: HCl Δχ 0,96 polar 21 %', [await lec('q2_deltaen', 'Diferencia'), await lec('q2_deltaen', 'Tipo de enlace'), await lec('q2_deltaen', 'Carácter')], a => a[0] === '0,96' && /polar/.test(a[1]) && a[2] === '21 %');
  await chip('q2_deltaen', '[data-pre]', 2);                                     // H2
  chk('deltaen: H₂ apolar', [await lec('q2_deltaen', 'Diferencia'), await lec('q2_deltaen', 'Tipo de enlace')], a => a[0] === '0' && /apolar/.test(a[1]));
  await chip('q2_deltaen', '[data-pre]', 4);                                     // HF
  chk('deltaen: HF Δχ 1,78 polar (no hay metal)', [await lec('q2_deltaen', 'Diferencia'), await lec('q2_deltaen', 'Tipo de enlace')], a => a[0] === '1,78' && /polar/.test(a[1]) && !/apolar/.test(a[1]));
  await chip('q2_deltaen', '[data-pre]', 7);                                     // RbF
  chk('deltaen: RbF iónico 92 %', [await lec('q2_deltaen', 'Tipo de enlace'), await lec('q2_deltaen', 'Carácter')], a => a[0] === 'iónico' && a[1] === '92 %');
  await chip('q2_deltaen', '[data-pre]', 9);                                     // Al–Cl
  chk('deltaen: Al–Cl Δχ 1,55 covalente polar (metal y no metal por debajo de 1,7)', [await lec('q2_deltaen', 'Diferencia'), await lec('q2_deltaen', 'Tipo de enlace')], a => a[0] === '1,55' && /polar/.test(a[1]));
  await chip('q2_deltaen', '[data-pre]', 10);                                    // Fe–Fe
  chk('deltaen: Fe–Fe metálico', await lec('q2_deltaen', 'Tipo de enlace'), 'metálico');
  await range('q2_deltaen', 0, 6); await range('q2_deltaen', 1, 6);
  chk('deltaen: dos carbonos, Δχ 0,00 apolar', [await lec('q2_deltaen', 'Diferencia'), await lec('q2_deltaen', 'Tipo de enlace')], a => a[0] === '0' && /apolar/.test(a[1]));

  // ---- Lewis ----
  await ver('q2_lewis');
  const orden = ['H2', 'F2', 'O2', 'N2', 'HCl', 'H2O', 'NH3', 'CH4', 'CO2', 'HCN', 'H2S', 'C2H4', 'C2H2', 'CH2O', 'CH3OH', 'H2O2', 'BF3', 'BeCl2', 'PCl3', 'PCl5', 'SF6', 'SO2', 'SO3', 'O3', 'CO', 'NH4', 'H3O', 'OH', 'CN', 'NO3', 'CO3', 'SO4', 'NO', 'XeF2', 'SF4', 'ClF3', 'XeF4'];
  const esperados = { CO2: 16, NH4: 8, SO2: 18, NO3: 24, O3: 18, BF3: 24, PCl5: 40, SF6: 48, SO4: 32, XeF2: 22, NO: 11, H2O: 8, CN: 10, CO3: 24 };
  for (const [f, e] of Object.entries(esperados)) {
    await chip('q2_lewis', '[data-sel]', orden.indexOf(f));
    chk(`lewis: ${f} e⁻ de valencia`, +(((await lec('q2_lewis', '1.')).match(/= (\d+) e/) || [])[1]), e);
  }
  await chip('q2_lewis', '[data-sel]', orden.indexOf('NO3'));
  chk('lewis: NO₃⁻ cargas formales (+1, 0, −1, −1)', await lec('q2_lewis', '4.'), t => /\+1/.test(t) && /−1/.test(t));
  await chip('q2_lewis', '[data-sel]', orden.indexOf('BF3'));
  chk('lewis: BF₃ octeto incompleto', await lec('q2_lewis', 'Octeto'), t => /incompleto/.test(t));
  await chip('q2_lewis', '[data-sel]', orden.indexOf('SF6'));
  chk('lewis: SF₆ octeto expandido', await lec('q2_lewis', 'Octeto'), t => /expandido/.test(t));
  await chip('q2_lewis', '[data-sel]', orden.indexOf('NO'));
  chk('lewis: NO radical', await lec('q2_lewis', 'Octeto'), t => /radical|impar|desapareado/i.test(t));
  // el reto: se resuelve con el motor aparte (electrones de valencia y pares libres)
  const reto = await W('q2_lewis').locator('.q2-juego p').first().innerText();
  const norm = s => s.replace(/[₀-₉]/g, c => String(c.charCodeAt(0) - 0x2080)).replace(/[⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹]/g, '');
  const sol = await p.evaluate(txt => { const t = txt.replace(/[₀-₉]/g, c => String(c.charCodeAt(0) - 0x2080)).replace(/[⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹]/g, ''); const V = BACHI.lab.enlace.volcar().MOL; const m = Object.values(V).find(x => !x.a.some(a => a[2]) && t.includes('en total en ' + x.f.replace(/\^.*$/, '') + ' (')); return m ? [m.analisis.total, m.analisis.libres] : null; }, reto);
  chk('lewis: el reto es resoluble con el motor', sol !== null, true);
  if (sol) {
    await W('q2_lewis').locator('[data-t]').fill('1'); await W('q2_lewis').locator('[data-l]').fill('99'); await W('q2_lewis').locator('[data-c]').click();
    chk('lewis: respuesta mala → «Todavía no»', await W('q2_lewis').locator('.q2-msg').innerText(), t => /Todavía no/.test(t));
    await W('q2_lewis').locator('[data-t]').fill(String(sol[0])); await W('q2_lewis').locator('[data-l]').fill(String(sol[1])); await W('q2_lewis').locator('[data-c]').click();
    chk('lewis: respuesta buena → «Correcto»', await W('q2_lewis').locator('.q2-msg').innerText(), t => /Correcto/.test(t));
  }

  // ---- TRPECV ----
  await ver('q2_vsepr');
  const GEO = [['lineal', 'sp'], ['trigonal plana', 'sp²'], ['angular', 'sp²'], ['tetraédrica', 'sp³'], ['pirámide trigonal', 'sp³'], ['angular', 'sp³'], ['bipirámide trigonal', 'sp³d'], ['balancín', 'sp³d'], ['forma de T', 'sp³d'], ['lineal', 'sp³d'], ['octaédrica', 'sp³d²'], ['pirámide cuadrada', 'sp³d²'], ['plana cuadrada', 'sp³d²']];
  for (let i = 0; i < GEO.length; i++) {
    await chip('q2_vsepr', '[data-sel]', i);
    const g = await lec('q2_vsepr', 'Geometría molecular'), h = await lec('q2_vsepr', 'Hibridación');
    chk(`vsepr: ficha ${i} ${GEO[i][0]}`, [g.startsWith(GEO[i][0]), h === GEO[i][1]], a => a[0] && a[1]);
  }
  await chip('q2_vsepr', '[data-sel]', 5);
  chk('vsepr: AX₂E₂ ángulo ≈ 104,5° (H₂O)', await lec('q2_vsepr', 'Ángulos'), t => /104,5/.test(t));
  await chip('q2_vsepr', '[data-sel]', 3);
  chk('vsepr: AX₄ 109,5°', await lec('q2_vsepr', 'Ángulos'), t => /109,5/.test(t));
  const antes = await W('q2_vsepr').locator('svg').first().innerHTML(); await range('q2_vsepr', 0, 120);
  chk('vsepr: girar cambia el dibujo', antes !== await W('q2_vsepr').locator('svg').first().innerHTML(), true);

  // ---- polaridad ----
  await ver('q2_polaridad');
  const POL = ['hcl', 'hf', 'co2', 'becl2', 'h2o', 'h2s', 'so2', 'bf3', 'so3', 'nh3', 'pcl3', 'ch4', 'ccl4', 'ch3cl', 'ch2cl2', 'chcl3', 'pcl5', 'sf4', 'clf3', 'xef2', 'sf6', 'xef4'];
  const polares = new Set(['hcl', 'hf', 'h2o', 'h2s', 'so2', 'nh3', 'pcl3', 'ch3cl', 'ch2cl2', 'chcl3', 'sf4', 'clf3']);
  for (let i = 0; i < POL.length; i++) {
    await chip('q2_polaridad', '[data-sel]', i);
    const r = await lec('q2_polaridad', '¿Molécula polar?');
    chk(`polaridad: ${POL[i]} ${polares.has(POL[i]) ? 'polar' : 'apolar'}`, /^SÍ/.test(r), polares.has(POL[i]));
  }
  await chip('q2_polaridad', '[data-sel]', 2);
  chk('polaridad: CO₂ suma 0', await lec('q2_polaridad', 'Suma vectorial'), '0');
  await chip('q2_polaridad', '[data-sel]', 4);
  chk('polaridad: H₂O μ = 1,85 D', await lec('q2_polaridad', 'Momento dipolar'), t => /1,85/.test(t));

  // ---- red iónica ----
  await ver('q2_red');
  chk('red: NaCl d = 283 pm y 787 kJ/mol de tablas', [num(await lec('q2_red', 'Distancia')), digitos(await lec('q2_red', 'Energía reticular de tablas'))], a => a[0] === 283 && a[1] === 787);
  chk('red: NaCl Kapustinskii 746', digitos(await lec('q2_red', 'Energía reticular estimada')), 746);
  await range('q2_red', 0, 5); await range('q2_red', 1, 4);                     // Mg²⁺ y O²⁻
  chk('red: MgO d = 212 pm, tablas 3 791, Kapustinskii 3 799', [num(await lec('q2_red', 'Distancia')), digitos(await lec('q2_red', 'Energía reticular de tablas')), digitos(await lec('q2_red', 'Energía reticular estimada'))], a => a[0] === 212 && a[1] === 3791 && a[2] === 3799);
  await range('q2_red', 0, 4); await range('q2_red', 1, 0);                     // Cs⁺ y F⁻
  chk('red: CsF (catión mayor) → CN 8, no 12', await lec('q2_red', 'Razón'), t => /CN 8/.test(t) && !/12/.test(t));
  await range('q2_red', 0, 4); await range('q2_red', 1, 1);                     // Cs⁺ y Cl⁻
  chk('red: CsCl CN 8:8', await lec('q2_red', 'Razón'), t => /0,92/.test(t) && /8:8/.test(t));

  // ---- Born–Haber ----
  await ver('q2_bornhaber');
  chk('born-haber: NaCl suma 376 y U 787', [digitos(await lec('q2_bornhaber', 'Suma de los pasos')), digitos(await lec('q2_bornhaber', 'Energía reticular U'))], a => a[0] === 376 && a[1] === 787);
  await chip('q2_bornhaber', '[data-sel]', 4);                                    // MgO
  chk('born-haber: MgO suma 3 189 y U 3 791', [digitos(await lec('q2_bornhaber', 'Suma de los pasos')), digitos(await lec('q2_bornhaber', 'Energía reticular U'))], a => a[0] === 3189 && a[1] === 3791);
  await chip('q2_bornhaber', '[data-sel]', 6);                                    // CaCl2
  chk('born-haber: CaCl₂ U 2 254', digitos(await lec('q2_bornhaber', 'Energía reticular U')), 2254);

  // ---- propiedades ----
  await ver('q2_propiedades');
  const cls = async i => { await chip('q2_propiedades', '[data-pre]', i); return (await lec('q2_propiedades', 'Tipo de sustancia')).toLowerCase(); };
  chk('propiedades: NaCl iónico', await cls(0), t => /iónic/.test(t));
  chk('propiedades: Fe metálico', await cls(4), t => /metal/.test(t));
  chk('propiedades: diamante reticular', await cls(8), t => /covalente/.test(t) && /red/.test(t));
  chk('propiedades: H₂O molecular', await cls(12), t => /molecular/.test(t));

  // ---- fuerzas intermoleculares ----
  await ver('q2_fuerzas');
  chk('fuerzas: grupo 16 predice −92 °C para el agua', await lec('q2_fuerzas', 'Tendencia'), t => /−92/.test(t));
  chk('fuerzas: diferencia +192 °C', await lec('q2_fuerzas', 'Diferencia'), t => /192/.test(t));
  await chip('q2_fuerzas', '[data-sel]', 3);                                      // grupo 17
  const xs = [3, 4, 5], ys = [-85, -67, -35], mx = 4, my = ys.reduce((a, c) => a + c) / 3, pend = xs.reduce((a, x, i) => a + (x - mx) * (ys[i] - my), 0) / 2, pred = Math.round(my + pend * (2 - mx));
  chk(`fuerzas: grupo 17 predice ${pred} °C para el HF`, await lec('q2_fuerzas', 'Tendencia'), t => t.replace('−', '-').includes(String(pred)));

  // ---- metal frente a cristal iónico ----
  await ver('q2_metalico');
  chk('metálico: 4 V → 40 %', await lec('q2_metalico', 'Intensidad'), '40 %');
  await range('q2_metalico', 0, 8);
  chk('metálico: 8 V → 80 % (ley de Ohm)', await lec('q2_metalico', 'Intensidad'), '80 %');

  // ---- hibridación ----
  await ver('q2_hibrid');
  await chip('q2_hibrid', '[data-hib]', 0);
  chk('hibrid: sp 2 híbridos, 2 p, 180°', [await lec('q2_hibrid', 'Orbitales híbridos'), (await lec('q2_hibrid', 'Orbitales p')).charAt(0), await lec('q2_hibrid', 'Ángulo')], a => a[0] === '2' && a[1] === '2' && a[2] === '180°');
  await chip('q2_hibrid', '[data-hib]', 1);
  chk('hibrid: sp² 3 híbridos, 1 p, 120°', [await lec('q2_hibrid', 'Orbitales híbridos'), (await lec('q2_hibrid', 'Orbitales p')).charAt(0), await lec('q2_hibrid', 'Ángulo')], a => a[0] === '3' && a[1] === '1' && a[2] === '120°');
  await chip('q2_hibrid', '[data-hib]', 2);
  chk('hibrid: sp³ 4 híbridos, 0 p, 109,5°', [await lec('q2_hibrid', 'Orbitales híbridos'), (await lec('q2_hibrid', 'Orbitales p')).charAt(0), await lec('q2_hibrid', 'Ángulo')], a => a[0] === '4' && a[1] === '0' && a[2] === '109,5°');
  const SP = [[4, 0], [7, 0], [5, 1], [3, 2], [1, 2], [1, 1], [2, 2], [2, 2], [3, 1], [2, 0], [3, 0], [3, 0], [12, 3], [7, 1]];
  for (let i = 0; i < SP.length; i++) {
    await chip('q2_hibrid', '[data-mol]', i);
    const tot = await W('q2_hibrid').locator('.q2-sp tbody tr:last-child td b').allInnerTexts();
    chk(`hibrid: molécula ${i} σ y π`, [parseInt(tot[1]), parseInt(tot[2])], a => a[0] === SP[i][0] && a[1] === SP[i][1]);
  }
  await chip('q2_hibrid', '[data-mol]', 3);
  await W('q2_hibrid').locator('[data-s]').fill('3'); await W('q2_hibrid').locator('[data-p]').fill('2'); await W('q2_hibrid').locator('[data-c]').click();
  chk('hibrid: reto σ/π del etino', await W('q2_hibrid').locator('.q2-msg').innerText(), t => /Correcto/.test(t));

  console.log(`${n - mal}/${n} comprobaciones de comportamiento correctas · errores JS: ${errs.length ? errs : 'ninguno'}`);
  if (mal || errs.length) process.exitCode = 1;
  await b.close();
})();
