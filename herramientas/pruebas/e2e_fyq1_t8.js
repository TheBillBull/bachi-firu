// Comportamiento de los simuladores de fyq1 t8 (cinemática): node herramientas/pruebas/e2e_fyq1_t8.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'fyq1', 't8');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t8 [data-w=${nm}]`).first();
  const lec = async (nm, rot) => W(nm).locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chip = async (nm, sel, i) => { await W(nm).locator(sel + ' .chip-btn').nth(i).click(); await p.waitForTimeout(80); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(80); };
  const ir = async nm => { await W(nm).scrollIntoViewIfNeeded(); };

  // f8_movil: sliders x0, v0, a, t
  await ir('f8_movil');
  await range('f8_movil', 3, 5); chk('movil x(5)', await lec('f8_movil', 'Posición'), 'x = 45 m'); chk('movil v(5)', await lec('f8_movil', 'Velocidad'), t => /v = 14 m\/s/.test(t)); chk('movil acelera', await lec('f8_movil', 'Aceleración'), t => /acelera/.test(t));
  await range('f8_movil', 1, -10); await range('f8_movil', 3, 10); chk('movil x(10) con v0=-10', await lec('f8_movil', 'Posición'), 'x = 0 m');
  chk('movil distancia con cambio de sentido', await lec('f8_movil', 'Distancia'), t => /50 m/.test(t) && /ha cambiado de sentido/.test(t));
  await chip('f8_movil', '[data-modo]', 0); chk('movil MRU: v constante', await lec('f8_movil', 'Velocidad'), t => /v = −10 m\/s/.test(t)); chk('movil MRU: a=0', await lec('f8_movil', 'Aceleración'), t => /a = 0 m\/s²/.test(t));
  // f8_encuentro
  await ir('f8_encuentro');
  chk('encuentro 0', await lec('f8_encuentro', 'Encuentro'), t => /t = 10 s, en x = 200 m/.test(t));
  await chip('f8_encuentro', '[data-pre]', 1); chk('encuentro alcance', await lec('f8_encuentro', 'Encuentro'), t => /t = 9 s, en x = 225 m/.test(t));
  await chip('f8_encuentro', '[data-pre]', 2); chk('encuentro reposo', await lec('f8_encuentro', 'Encuentro'), t => /t = 20 s, en x = 400 m/.test(t));
  await chip('f8_encuentro', '[data-pre]', 3); chk('encuentro frena', await lec('f8_encuentro', 'Encuentro'), t => /t = 6,18 s/.test(t));
  await chip('f8_encuentro', '[data-pre]', 4); chk('encuentro ninguno', await lec('f8_encuentro', 'Encuentro'), t => /no se encuentran/.test(t));
  // f8_graficas
  await ir('f8_graficas');
  chk('graficas t=8 Δx', await lec('f8_graficas', 'Desplazamiento'), 'Δx = 55 m'); await range('f8_graficas', 0, 20); chk('graficas t=20 Δx', await lec('f8_graficas', 'Desplazamiento'), 'Δx = 150 m');
  await chip('f8_graficas', '[data-pre]', 1); await range('f8_graficas', 0, 16); chk('graficas vuelve Δx', await lec('f8_graficas', 'Desplazamiento'), 'Δx = 38 m'); chk('graficas vuelve distancia', await lec('f8_graficas', 'Distancia'), '74 m');
  await chip('f8_graficas', '[data-pre]', 2); await range('f8_graficas', 0, 6); chk('graficas parada', await lec('f8_graficas', 'Velocidad'), 'v = 0 m/s');
  // f8_caida
  await ir('f8_caida');
  chk('caida tvuelo', await lec('f8_caida', 'Tiempo de vuelo'), '2,86 s'); chk('caida v impacto', await lec('f8_caida', 'Velocidad al llegar'), t => /−28 m\/s/.test(t));
  await chip('f8_caida', '[data-astro]', 1); chk('caida luna', await lec('f8_caida', 'Tiempo de vuelo'), '7,03 s');
  await chip('f8_caida', '[data-astro]', 0); await range('f8_caida', 0, 0); await range('f8_caida', 1, 10); chk('caida hmax', await lec('f8_caida', 'Altura máxima'), t => /5,1 m/.test(t)); chk('caida tvuelo lanz', await lec('f8_caida', 'Tiempo de vuelo'), '2,04 s');
  // f8_parabolico
  await ir('f8_parabolico');
  chk('parab alcance', await lec('f8_parabolico', 'Alcance'), '62,81 m'); chk('parab tv', await lec('f8_parabolico', 'Tiempo de vuelo'), '3,28 s'); chk('parab hmax', await lec('f8_parabolico', 'Altura máxima'), t => /13,18 m/.test(t));
  await range('f8_parabolico', 1, 50); chk('parab complementario', await lec('f8_parabolico', 'Alcance'), '62,81 m'); await range('f8_parabolico', 1, 45); chk('parab 45°', await lec('f8_parabolico', 'Alcance'), '63,78 m');
  await chip('f8_parabolico', '[data-astro]', 1); chk('parab luna', await lec('f8_parabolico', 'Alcance'), t => /385,8|385,7/.test(t));
  // f8_frenado
  await ir('f8_frenado');
  chk('frenado total', await lec('f8_frenado', 'Distancia de detención'), '63,39 m'); chk('frenado df', await lec('f8_frenado', 'Distancia de frenado'), t => /44,64 m/.test(t)); chk('frenado choque', await lec('f8_frenado', 'Obstáculo'), t => /CHOQUE/.test(t) && /6,9 m\/s/.test(t));
  await range('f8_frenado', 1, 70); chk('frenado sin choque', await lec('f8_frenado', 'Obstáculo'), t => /Se detiene a 6,6 m/.test(t));
  await chip('f8_frenado', '[data-suelo]', 3); chk('frenado hielo', await lec('f8_frenado', 'Distancia de frenado'), t => /312,5 m/.test(t));
  // f8_ecuaciones
  await ir('f8_ecuaciones');
  chk('ecuaciones Δx', await lec('f8_ecuaciones', 'incógnitas'), t => /Δx = 25 m/.test(t) && /v = 10 m\/s/.test(t));
  const F = W('f8_ecuaciones'); const fila = k => F.locator(`.f8-ec-f[data-k="${k}"]`);
  await fila('t').locator('[data-tog]').click(); await fila('v').locator('[data-tog]').click(); await fila('v').locator('input').fill('10'); await p.waitForTimeout(100);
  chk('ecuaciones t', await lec('f8_ecuaciones', 'incógnitas'), t => /Δx = 25 m/.test(t) && /t = 5 s/.test(t));
  await fila('v0').locator('input').fill('20'); await fila('a').locator('[data-tog]').click(); await fila('x').locator('[data-tog]').click(); await fila('x').locator('input').fill('40'); await fila('v').locator('input').fill('0'); await p.waitForTimeout(100);
  chk('ecuaciones sin tiempo', await lec('f8_ecuaciones', 'incógnitas'), t => /a = −5 m\/s²/.test(t) && /t = 4 s/.test(t));
  await fila('v').locator('[data-tog]').click(); await p.waitForTimeout(80); chk('ecuaciones 4 datos', await lec('f8_ecuaciones', 'Elige exactamente'), t => !!t);
  // f8_unidades
  await ir('f8_unidades'); chk('unidades', await lec('f8_unidades', 'km/h → m/s'), t => /72 km\/h = 20 m\/s/.test(t));
  // f8_leerxt
  await ir('f8_leerxt');
  const clic = async (i, j) => { await W('f8_leerxt').locator('.lg-p').nth(i).locator('.chip-btn').nth(j).click(); await p.waitForTimeout(40); return W('f8_leerxt').locator('.lg-p').nth(i).locator('.lg-r').innerText(); };
  chk('leerxt mal', await clic(0, 1), t => /Todavía no/.test(t)); chk('leerxt bien', await clic(0, 0), t => /Correcto/.test(t));
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); chk('sin desborde horizontal', ov, v => v <= 1);
  console.log(mal ? mal + ' FALLOS de ' + n : n + ' comprobaciones de comportamiento de cinemática correctas', '· errores JS:', errs.length ? errs : 'ninguno');
  await b.close();
})();
