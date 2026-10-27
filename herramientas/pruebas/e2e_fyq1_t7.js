// Comportamiento de los simuladores de FyQ I · tema 7 (química del carbono). Uso: node herramientas/pruebas/e2e_fyq1_t7.js [movil]
// Actúa sobre cada widget como lo haría una persona y compara la lectura con cuentas hechas aparte (nombres, fórmulas, masas, energías).
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'fyq1', 't7');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t7 [data-w=${nm}]`).first();
  const lec = async (nm, rot) => W(nm).locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chip = async (nm, sel, i) => { await W(nm).locator(sel + ' .chip-btn').nth(i).click(); await p.waitForTimeout(70); };
  const chipTxt = async (nm, sel, txt) => { await W(nm).locator(sel + ' .chip-btn', { hasText: txt }).first().click(); await p.waitForTimeout(70); };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(50); };
  const elige = async (nm, label) => { await W(nm).locator('select').first().selectOption({ label }); await p.waitForTimeout(80); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const cerca = (a, c, t = 0.006) => Math.abs(a - c) <= t * Math.max(1, Math.abs(c));
  const digitos = s => parseInt(String(s).replace(/\D/g, ''), 10);
  const num = s => parseFloat(String(s).replace(/\s/g, '').replace(/[^\d,.\-−]/g, '').replace('−', '-').replace(',', '.'));
  const SUBS = '₀₁₂₃₄₅₆₇₈₉', f = txt => txt.replace(/\d/g, d => SUBS[+d]);
  const ver = async nm => { await W(nm).scrollIntoViewIfNeeded(); };
  const MASA = { C: 12.011, H: 1.008, O: 15.999, N: 14.007, Cl: 35.45 };
  const masa = (c) => Object.keys(c).reduce((a, k) => a + c[k] * MASA[k], 0);

  // ---- constructor ----
  await ver('q7_constructor');
  chk('constructor: inicial pentano', await lec('q7_constructor', 'Nombre IUPAC'), 'pentano');
  const PRE = [['butano', 'C4H10', { C: 4, H: 10 }], ['2-metilbutano', 'C5H12', { C: 5, H: 12 }], ['but-2-eno', 'C4H8', { C: 4, H: 8 }], ['propino', 'C3H4', { C: 3, H: 4 }], ['etanol', 'C2H6O', { C: 2, H: 6, O: 1 }], ['propan-2-ol', 'C3H8O', { C: 3, H: 8, O: 1 }],
    ['propanona', 'C3H6O', { C: 3, H: 6, O: 1 }], ['ácido etanoico', 'C2H4O2', { C: 2, H: 4, O: 2 }], ['2,2,4-trimetilpentano', 'C8H18', { C: 8, H: 18 }], ['etanal', 'C2H4O', { C: 2, H: 4, O: 1 }], ['3-metilhexano', 'C7H16', { C: 7, H: 16 }],
    ['etanamina', 'C2H7N', { C: 2, H: 7, N: 1 }], ['1,2-dicloroetano', 'C2H4Cl2', { C: 2, H: 4, Cl: 2 }], ['buta-1,3-dieno', 'C4H6', { C: 4, H: 6 }]];
  for (let i = 0; i < PRE.length; i++) {
    await chip('q7_constructor', '[data-pre]', i);
    const [nom, form, cnt] = PRE[i];
    chk(`constructor: ${nom} nombre`, await lec('q7_constructor', 'Nombre IUPAC'), t => t.startsWith(nom));
    chk(`constructor: ${nom} fórmula ${form} y masa`, [(await lec('q7_constructor', 'Fórmula molecular')).replace(/\s/g, ''), num(await lec('q7_constructor', 'Masa molar'))], a => a[0] === f(form) && cerca(a[1], masa(cnt), 0.001));
  }
  await chip('q7_constructor', '[data-pre]', 0);
  chk('constructor: grado de insaturación de C₄H₈ (but-2-eno) = 1', (await (async () => { await chip('q7_constructor', '[data-pre]', 2); return lec('q7_constructor', 'Grado de insaturación'); })()), '1');
  await W('q7_constructor').locator('input[type=range]').evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, 3);
  await p.waitForTimeout(60);
  await chip('q7_constructor', '[data-grp]', 1);                                       // alcohol
  await W('q7_constructor').locator('[data-gpos]').selectOption('2'); await p.waitForTimeout(60);
  chk('constructor: 3 C + OH en C2 → propan-2-ol (o but-2-eno con OH…)', await lec('q7_constructor', 'Nombre IUPAC'), t => /propan-2-ol|but-2-en-2-ol|prop/.test(t));

  // ---- nombrar / familias (las respuestas se leen del propio widget y se comprueba el cableado) ----
  for (const nm of ['q7_nombrar', 'q7_grupos']) {
    await ver(nm);
    let buenos = 0;
    for (let i = 0; i < 12; i++) {
      const ok = await W(nm).locator('[data-ops]').getAttribute('data-ok');
      await W(nm).locator('.q7-op[data-t="' + ok + '"]').first().click();
      if (/Correcto/.test(await W(nm).locator('.q7-res').innerText())) buenos++;
      await W(nm).locator('button', { hasText: 'Siguiente molécula' }).click();
    }
    chk(`${nm}: 12 aciertos con la opción marcada como correcta`, buenos, 12);
    const ops = await W(nm).locator('.q7-op').allInnerTexts();
    chk(`${nm}: 4 opciones distintas`, new Set(ops).size, 4);
  }
  await ver('q7_reto');
  await W('q7_reto').locator('button', { hasText: 'Comprobar' }).click();
  chk('reto: el primer reto (butano) se resuelve con la cadena de 4 C inicial', await W('q7_reto').locator('.q7-res').innerText(), t => /Correcto/.test(t));
  await W('q7_reto').locator('button', { hasText: 'Otro reto' }).click();
  await W('q7_reto').locator('button', { hasText: 'Comprobar' }).click();
  chk('reto: una molécula sin construir no se da por buena', await W('q7_reto').locator('.q7-res').innerText(), t => /Todavía no|no es posible/.test(t));
  await W('q7_reto').locator('button', { hasText: 'Pista' }).click();
  chk('reto: la pista aparece', await W('q7_reto').locator('.q7-res').innerText(), t => /^Pista/.test(t));

  // ---- series homólogas ----
  await ver('q7_serie');
  chk('serie: butano −0,5 °C gas', [await lec('q7_serie', 'Compuesto'), num(await lec('q7_serie', 'Punto de ebullición')), await lec('q7_serie', 'Estado')], a => a[0] === 'butano' && a[1] === -0.5 && a[2] === 'gas');
  await range('q7_serie', 0, 5);
  chk('serie: pentano 36,1 líquido, +36,6 °C respecto del butano', [await lec('q7_serie', 'Compuesto'), num(await lec('q7_serie', 'Punto de ebullición')), await lec('q7_serie', 'Estado'), await lec('q7_serie', 'Incremento')], a => a[0] === 'pentano' && a[1] === 36.1 && a[2] === 'líquido' && /36,6/.test(a[3]));
  chk('serie: fórmula C₅H₁₂ y masa 72,15', [(await lec('q7_serie', 'Fórmula (n')).replace(/\s/g, ''), num(await lec('q7_serie', 'Masa molar'))], a => a[0] === f('C5H12') && cerca(a[1], 72.151, 0.001));
  await chipTxt('q7_serie', '[data-fam]', 'Alcoholes'); await range('q7_serie', 0, 3);
  chk('serie: propan-1-ol 97,2 °C', [await lec('q7_serie', 'Compuesto'), num(await lec('q7_serie', 'Punto de ebullición'))], a => a[0] === 'propan-1-ol' && a[1] === 97.2);
  await chipTxt('q7_serie', '[data-fam]', 'Ácidos'); await range('q7_serie', 0, 10);
  chk('serie: ácido decanoico sólido a 25 °C, 270 °C', [await lec('q7_serie', 'Compuesto'), await lec('q7_serie', 'Estado'), num(await lec('q7_serie', 'Punto de ebullición'))], a => a[0] === 'ácido decanoico' && a[1] === 'sólido' && a[2] === 270);
  await chipTxt('q7_serie', '[data-fam]', 'Alquinos'); await range('q7_serie', 0, 2);
  chk('serie: etino C₂H₂', [await lec('q7_serie', 'Compuesto'), (await lec('q7_serie', 'Fórmula (n')).replace(/\s/g, '')], a => a[0] === 'etino' && a[1] === f('C2H2'));

  // ---- grado de insaturación ----
  await ver('q7_insaturacion');
  const IDH = [['etano', 0], ['eteno', 1], ['etino', 2], ['ciclohexano', 1], ['hex-1-eno', 1], ['benceno', 4], ['propanona', 1], ['cloroetano', 0], ['etanamina', 0], ['naftaleno', 7], ['glucosa', 1], ['ácido etanoico', 1]];
  for (const [t, v] of IDH) { await chipTxt('q7_insaturacion', '[data-pre]', t); chk(`insaturación: ${t} = ${v}`, await lec('q7_insaturacion', 'Grado de insaturación'), String(v)); }
  await chipTxt('q7_insaturacion', '[data-pre]', 'benceno'); await range('q7_insaturacion', 1, 5);
  chk('insaturación: C₆H₅ (H impar) es imposible', await lec('q7_insaturacion', 'Qué significa'), t => /imposible/.test(t));
  await range('q7_insaturacion', 1, 14);
  chk('insaturación: C₆H₁₄ es un alcano (0)', await lec('q7_insaturacion', 'Grado de insaturación'), '0');
  await range('q7_insaturacion', 1, 16);
  chk('insaturación: C₆H₁₆ (negativo) es imposible', await lec('q7_insaturacion', 'Qué significa'), t => /imposible/.test(t));

  // ---- polímeros ----
  await ver('q7_polimeros');
  chk('polímeros: PE, monómero 28,05 g/mol y n = 100 → 2 805', [num((await lec('q7_polimeros', 'Monómero')).match(/M = ([\d,]+)/)[1]), digitos(await lec('q7_polimeros', 'Masa molar'))], a => a[0] === 28.05 && a[1] === 2805);
  await chipTxt('q7_polimeros', '[data-mon]', 'cloruro'); await range('q7_polimeros', 0, 3);
  chk('polímeros: PVC, 62,50 g/mol y n = 1 000 → 62 500', [num((await lec('q7_polimeros', 'Monómero')).match(/M = ([\d,]+)/)[1]), digitos(await lec('q7_polimeros', 'Masa molar'))], a => cerca(a[0], masa({ C: 2, H: 3, Cl: 1 }), 0.001) && a[1] === 62496 || a[1] === 62500 || cerca(a[1], 62500, 0.001));
  chk('polímeros: 2 000 carbonos en la cadena', digitos(await lec('q7_polimeros', 'Átomos de carbono')), 2000);
  await chipTxt('q7_polimeros', '[data-mon]', 'politetrafluoro'); await range('q7_polimeros', 0, 0);
  chk('polímeros: teflón, n = 1 → M del C₂F₄ = 100,02', num((await lec('q7_polimeros', 'Monómero')).match(/M = ([\d,]+)/)[1]), t => cerca(t, masa({ C: 2 }) + 4 * 18.998, 0.001));

  // ---- quiralidad ----
  await ver('q7_quiral');
  const QX = [1, 0, 1, 1, 1, 0, 1, 0, 0, 2, 2, 2, 0, 1, 1, 1];
  for (let i = 0; i < QX.length; i++) {
    await chip('q7_quiral', '[data-mol]', i);
    const t = await lec('q7_quiral', 'Carbonos asimétricos');
    chk(`quiral: molécula ${i} → ${QX[i]}`, QX[i] === 0 ? t === 'ninguno' : digitos(t) === QX[i], true);
    chk(`quiral: molécula ${i}, marcas dibujadas`, await W('q7_quiral').locator('svg text.red, svg text').filter({ hasText: '*' }).count(), QX[i]);
  }

  // ---- isómeros ----
  await ver('q7_isomeria');
  const CONT = [2, 3, 5, 4, 2, 3, 7, 4, 2, 6, 4];
  for (let i = 0; i < CONT.length; i++) {
    await chip('q7_isomeria', '[data-form]', i);
    chk(`isómeros: grupo ${i} tiene ${CONT[i]} isómeros y misma fórmula`, await lec('q7_isomeria', 'Isómeros de esta fórmula'), t => digitos(t.split('·')[0]) === CONT[i] && /sí/.test(t));
    chk(`isómeros: grupo ${i} muestra ${CONT[i]} fichas`, await W('q7_isomeria').locator('[data-iso] .chip-btn').count(), CONT[i]);
  }
  await chip('q7_isomeria', '[data-form]', 6);                                       // C4H10O
  for (let k = 0; k < 7; k++) { await chip('q7_isomeria', '[data-iso]', k); chk(`isómeros C₄H₁₀O ${k}: fórmula`, (await lec('q7_isomeria', 'Fórmula molecular')).replace(/\s/g, ''), f('C4H10O')); }
  await chip('q7_isomeria', '[data-form]', 3); await chip('q7_isomeria', '[data-iso]', 2);
  chk('isómeros: trans-but-2-eno hierve a 0,9 °C', num(await lec('q7_isomeria', 'Punto de ebullición')), 0.9);

  // ---- combustión ----
  await ver('q7_combustion');
  const DH = { metano: 890, etano: 1560, propano: 2220, butano: 2877, hexano: 4163, octano: 5470, eteno: 1411, etino: 1300, metanol: 726, etanol: 1367, 'propan-1-ol': 2021 };
  const FORM = { metano: [1, 4, 0], etano: [2, 6, 0], propano: [3, 8, 0], butano: [4, 10, 0], hexano: [6, 14, 0], octano: [8, 18, 0], eteno: [2, 4, 0], etino: [2, 2, 0], metanol: [1, 4, 1], etanol: [2, 6, 1], 'propan-1-ol': [3, 8, 1] };
  const ORD = ['metano', 'etano', 'propano', 'butano', 'hexano', 'octano', '2,2,4-trimetilpentano', 'eteno', 'etino', 'metanol', 'etanol', 'propan-1-ol'];
  for (const [nom, [C, Hh, O]] of Object.entries(FORM)) {
    await chip('q7_combustion', '[data-pre]', ORD.indexOf(nom));
    const M = masa({ C, H: Hh, O }), nn = 1000 / M, nO2 = nn * (C + Hh / 4 - O / 2);
    chk(`combustión: 1 kg de ${nom} → O₂`, num((await lec('q7_combustion', 'Oxígeno necesario')).split('=')[0]), t => cerca(t, nO2, 0.002));
    chk(`combustión: 1 kg de ${nom} → energía y poder calorífico`, [digitos((await lec('q7_combustion', 'Energía desprendida')).split('kJ')[0]), num(await lec('q7_combustion', 'Poder calorífico'))], a => cerca(a[0], nn * DH[nom], 0.002) && cerca(a[1], DH[nom] / M, 0.003));
    chk(`combustión: 1 kg de ${nom} → CO₂`, num((await lec('q7_combustion', 'CO₂ emitido')).split('=')[0]), t => cerca(t, nn * C, 0.002));
  }
  await chip('q7_combustion', '[data-pre]', 2);
  chk('combustión: ecuación del propano', (await W('q7_combustion').locator('.q5-ecuacion').innerText()).replace(/\s/g, ''), t => t === 'C₃H₈+5O₂⟶3CO₂+4H₂O' || t === 'C₃H₈+5O₂→3CO₂+4H₂O');
  await chip('q7_combustion', '[data-pre]', 3);
  chk('combustión: ecuación del butano con coeficientes enteros (2, 13, 8, 10)', (await W('q7_combustion').locator('.q5-ecuacion').innerText()).replace(/\s/g, ''), t => /^2C₄H₁₀\+13O₂.?8CO₂\+10H₂O$/.test(t));
  await range('q7_combustion', 0, 2000);
  chk('combustión: 2 kg de butano → doble de energía', digitos((await lec('q7_combustion', 'Energía desprendida')).split('kJ')[0]), t => cerca(t, 2000 / masa({ C: 4, H: 10 }) * 2877, 0.002));

  // ---- reacciones ----
  await ver('q7_reacciones');
  const prod = async () => W('q7_reacciones').locator('.q7-mol-n').allInnerTexts();
  chk('reacciones: propeno + HBr → 2-bromopropano (Markovnikov)', await prod(), a => a.join('|') === 'propeno|2-bromopropano');
  chk('reacciones: balance de átomos ✓', await lec('q7_reacciones', 'Balance'), t => /✓/.test(t) && !/✗/.test(t));
  const ADIC = [['eteno', 'H₂', 'etano'], ['eteno', 'Br₂', '1,2-dibromoetano'], ['propeno', 'HCl', '2-cloropropano'], ['but-1-eno', 'H₂O', 'butan-2-ol'], ['but-2-eno', 'HBr', '2-bromobutano'], ['propeno', 'H₂O', 'propan-2-ol'], ['propeno', 'Cl₂', '1,2-dicloropropano']];
  for (const [r, reag, esp] of ADIC) {
    await elige('q7_reacciones', r); await chipTxt('q7_reacciones', '[data-reag]', reag);
    chk(`reacciones: ${r} + ${reag} → ${esp}`, (await prod())[1], esp);
    chk(`reacciones: ${r} + ${reag} conserva los átomos`, await lec('q7_reacciones', 'Balance'), t => /✓/.test(t));
  }
  await elige('q7_reacciones', 'etino'); await chipTxt('q7_reacciones', '[data-reag]', 'HCl');
  chk('reacciones: etino + 1 HCl → cloroeteno', (await prod())[1], 'cloroeteno');
  await chipTxt('q7_reacciones', '[data-eq]', '2 equivalentes');
  chk('reacciones: etino + 2 HCl → 1,1-dicloroetano (Markovnikov dos veces)', (await prod())[1], '1,1-dicloroetano');
  await chipTxt('q7_reacciones', '[data-reag]', 'Br₂');
  chk('reacciones: etino + 2 Br₂ → 1,1,2,2-tetrabromoetano', (await prod())[1], '1,1,2,2-tetrabromoetano');
  chk('reacciones: balance etino + 2 Br₂ ✓', await lec('q7_reacciones', 'Balance'), t => /✓/.test(t));
  await chipTxt('q7_reacciones', '[data-tipo]', 'Halogenación');
  await elige('q7_reacciones', 'propano');
  chk('reacciones: propano + Cl₂ (C1) → 1-cloropropano', (await prod())[1], '1-cloropropano');
  await range('q7_reacciones', 0, 2);
  chk('reacciones: propano + Cl₂ (C2) → 2-cloropropano', (await prod())[1], '2-cloropropano');
  chk('reacciones: propano da dos monocloroderivados', await lec('q7_reacciones', 'Todos los monoderivados'), t => /1-cloropropano/.test(t) && /2-cloropropano/.test(t));
  await chipTxt('q7_reacciones', '[data-tipo]', 'Hidrólisis'); await elige('q7_reacciones', 'bromoetano');
  chk('reacciones: bromoetano + NaOH → etanol', (await prod())[1], 'etanol');
  chk('reacciones: hidrólisis conserva los átomos', await lec('q7_reacciones', 'Balance'), t => /✓/.test(t));
  await chipTxt('q7_reacciones', '[data-tipo]', 'Eliminación');
  await elige('q7_reacciones', 'butan-2-ol');
  chk('reacciones: butan-2-ol → but-2-eno (Saytzeff)', (await prod())[1], 'but-2-eno');
  await elige('q7_reacciones', '2-bromobutano');
  chk('reacciones: 2-bromobutano → but-2-eno', (await prod())[1], 'but-2-eno');
  chk('reacciones: eliminación conserva los átomos', await lec('q7_reacciones', 'Balance'), t => /✓/.test(t));
  await chipTxt('q7_reacciones', '[data-tipo]', 'Oxidación');
  await elige('q7_reacciones', 'etanol');
  chk('reacciones: etanol → etanal → ácido etanoico', await prod(), a => a.join('|') === 'etanol|etanal|ácido etanoico');
  await elige('q7_reacciones', 'propan-2-ol');
  chk('reacciones: propan-2-ol → propanona', await prod(), a => a.join('|') === 'propan-2-ol|propanona');
  await elige('q7_reacciones', '2-metilpropan-2-ol');
  chk('reacciones: 2-metilpropan-2-ol no se oxida', await prod(), a => /no hay reacción/.test(a.join('|')));
  await chipTxt('q7_reacciones', '[data-tipo]', 'Esterificación');
  chk('reacciones: etanoico + etanol → etanoato de etilo', await prod(), a => a.join('|') === 'ácido etanoico|etanol|etanoato de etilo');
  chk('reacciones: esterificación conserva los átomos', await lec('q7_reacciones', 'Balance'), t => /✓/.test(t));
  await range('q7_reacciones', 1, 1); await range('q7_reacciones', 2, 3);
  chk('reacciones: metanoico + propan-1-ol → metanoato de propilo', (await prod())[2], 'metanoato de propilo');

  console.log(`${n - mal}/${n} comprobaciones de comportamiento correctas · errores JS: ${errs.length ? errs : 'ninguno'}`);
  if (mal || errs.length) process.exitCode = 1;
  await b.close();
})();
