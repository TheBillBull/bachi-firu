// Comportamiento de los simuladores del tema 11 de Física y Química I (gravitación)
//   node herramientas/pruebas/e2e_gravitacion.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'fyq1', 't11');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t11 [data-w=${nm}]`).first();
  const lec = async (nm, rot) => W(nm).locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chip = async (nm, sel, i) => { await W(nm).locator(sel + ' .chip-btn').nth(i).click(); await p.waitForTimeout(80); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(80); };
  // fuerza
  await W('f11_fuerza').scrollIntoViewIfNeeded();
  await chip('f11_fuerza', '[data-pre]', 0); chk('fuerza personas', await lec('f11_fuerza', 'Fuerza'), t => /3,27·10⁻⁷ N/.test(t));
  await chip('f11_fuerza', '[data-pre]', 3); chk('fuerza Tierra–Luna', await lec('f11_fuerza', 'Fuerza'), t => /1,98·10²⁰ N/.test(t));
  await chip('f11_fuerza', '[data-pre]', 2); chk('fuerza persona–Tierra', await lec('f11_fuerza', 'Fuerza'), t => /68[67]/.test(t));
  chk('fuerza r doble', await lec('f11_fuerza', 'Si r se duplica'), t => /÷ 4/.test(t));
  // campo
  await W('f11_campo').scrollIntoViewIfNeeded();
  chk('campo Tierra g0', await lec('f11_campo', 'g en la superficie'), '9,82 m/s²'); chk('campo h=0,5R', await lec('f11_campo', 'g a la altura'), t => /4,364 m\/s²/.test(t) && /44,4 %/.test(t));
  await range('f11_campo', 0, 1); chk('campo h=R', await lec('f11_campo', 'g a la altura'), t => /2,455 m\/s²/.test(t) && /25 %/.test(t));
  await chip('f11_campo', '[data-pre]', 1); await range('f11_campo', 0, 0); chk('campo Luna', await lec('f11_campo', 'g en la superficie'), '1,62 m/s²');
  // órbita
  await W('f11_orbita').scrollIntoViewIfNeeded();
  chk('órbita periodo', await lec('f11_orbita', 'Periodo'), '1 años'); chk('órbita cociente', await lec('f11_orbita', 'Cociente'), t => /^3 /.test(t));
  await range('f11_orbita', 0, 4); chk('órbita a=4', await lec('f11_orbita', 'Periodo'), '8 años');
  await range('f11_orbita', 1, 0); chk('órbita e=0', await lec('f11_orbita', 'Cociente'), t => /^1 /.test(t));
  // kepler 3
  await W('f11_kepler3').scrollIntoViewIfNeeded(); chk('kepler3 filas', await W('f11_kepler3').locator('tbody tr').count(), 8);
  await chip('f11_kepler3', '[data-sel]', 1); chk('kepler3 lunas', await W('f11_kepler3').locator('tbody tr').count(), 4);
  chk('kepler3 constante Júpiter', await lec('f11_kepler3', 'Constante'), t => /3,1\d*·10⁻¹⁵|3,1\d*·10⁻¹⁶/.test(t) || /10⁻¹⁵/.test(t));
  // satélite
  await W('f11_satelite').scrollIntoViewIfNeeded();
  await chip('f11_satelite', '[data-pre]', 0); chk('ISS v', await lec('f11_satelite', 'Velocidad orbital'), t => /7,66[0-9] km\/s/.test(t)); chk('ISS T', await lec('f11_satelite', 'Periodo'), t => /^9[23],\d+ min/.test(t));
  await chip('f11_satelite', '[data-pre]', 2); chk('GEO T', await lec('f11_satelite', 'Periodo'), t => /^23,9\d* h/.test(t)); chk('GEO v', await lec('f11_satelite', 'Velocidad orbital'), t => /3,07[0-9] km\/s/.test(t));
  chk('GEO energía negativa', await lec('f11_satelite', 'Em'), t => /^−/.test(t) || /−/.test(t));
  await chip('f11_satelite', '[data-pl]', 3); chk('Luna orbital', await lec('f11_satelite', 'Cuerpo central'), t => /Luna/.test(t));
  // escape
  await W('f11_escape').scrollIntoViewIfNeeded();
  chk('escape ve', await lec('f11_escape', 'Velocidad de escape'), '11,186 km/s'); chk('escape ligado', await lec('f11_escape', 'Resultado'), t => /ligado/.test(t));
  await range('f11_escape', 0, 100); chk('escape justo', await lec('f11_escape', 'Resultado'), t => /justo la velocidad de escape/.test(t));
  await range('f11_escape', 0, 120); chk('escapa', await lec('f11_escape', 'Resultado'), t => /escapa/.test(t));
  // neutro
  await W('f11_neutro').scrollIntoViewIfNeeded(); chk('neutro Tierra–Luna', await lec('f11_neutro', 'Punto neutro'), t => /3,4603·10⁸ m/.test(t) && /90,02 %/.test(t));
  await chip('f11_neutro', '[data-pre]', 3); chk('neutro masas iguales', await lec('f11_neutro', 'Punto neutro'), t => /50 %/.test(t));
  // planetas
  await W('f11_planetas').scrollIntoViewIfNeeded(); chk('planetas g Tierra', await lec('f11_planetas', 'Tierra'), '9,82 m/s²');
  await chip('f11_planetas', '[data-mag]', 1); chk('planetas peso', await lec('f11_planetas', 'Tierra'), t => /589,\d+ N/.test(t));
  await chip('f11_planetas', '[data-mag]', 2); chk('planetas ve', await lec('f11_planetas', 'Tierra'), t => /11,19 km\/s/.test(t));
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); chk('sin desborde horizontal', ov, v => v <= 1);
  console.log(mal ? mal + ' FALLOS de ' + n : n + ' comprobaciones de comportamiento (gravitación) correctas', '· errores JS:', errs.length ? errs : 'ninguno');
  await b.close();
})();
