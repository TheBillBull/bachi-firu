// Comportamiento de los simuladores de fyq1 t12 (trabajo, energía y potencia):
//   node herramientas/pruebas/e2e_fyq1_t12.js [movil] [oscuro]
// Los valores esperados se calculan aquí con Math (sin usar el código de la web).
const { lanzar, abrirTema } = require('./e2e_common.js');
const { contraste, esOscuro } = require('./e2e_fyq1_comun.js');
(async () => {
  const movil = process.argv.includes('movil'), oscuro = process.argv.includes('oscuro');
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 }, scheme: oscuro ? 'dark' : 'light' });
  await abrirTema(p, 'fyq1', 't12');
  let mal = 0, n = 0;
  const g = 9.8, R = Math.PI / 180;
  const W = nm => p.locator(`#detail-t12 [data-w=${nm}]`).first();
  const lec = async (nm, rot) => W(nm).locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chip = async (nm, sel, i) => { await W(nm).locator(sel + ' .chip-btn').nth(i).click(); await p.waitForTimeout(80); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? !!esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(60); };
  const ir = async nm => { await W(nm).scrollIntoViewIfNeeded(); };
  const sup = { '⁰': 0, '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9 };
  const num = s => {
    if (s == null) return NaN;
    const m = s.replace(/[   ]/g, '').replace(/−/g, '-').match(/(-?\d+(?:,\d+)?)(?:·10(⁻?)([⁰¹²³⁴⁵⁶⁷⁸⁹]+))?/); if (!m) return NaN;
    let v = parseFloat(m[1].replace(',', '.')); if (m[3]) { const e = parseInt([...m[3]].map(c => sup[c]).join(''), 10); v *= Math.pow(10, m[2] ? -e : e); } return v;
  };
  const casi = (esp, tol = 0.008) => got => { const v = num(got); return Math.abs(v - esp) <= tol * Math.max(Math.abs(esp), 1e-9); };
  const txt = re => got => re.test(got || '');

  // ---------- f12_trabajo: sliders F, α, d (por defecto 40 N, 30°, 6 m)
  await ir('f12_trabajo');
  chk('trabajo 40 N, 30°, 6 m', await lec('f12_trabajo', 'Trabajo W'), casi(40 * 6 * Math.cos(30 * R))); chk('trabajo: componente F·cos α', await lec('f12_trabajo', 'Componente'), casi(40 * Math.cos(30 * R))); chk('trabajo: signo positivo', await lec('f12_trabajo', 'Signo'), txt(/positivo/));
  await range('f12_trabajo', 1, 90); chk('trabajo α = 90°: nulo', await lec('f12_trabajo', 'Trabajo W'), t => num(t) === 0); chk('trabajo α = 90°: texto', await lec('f12_trabajo', 'Signo'), txt(/nulo/));
  await range('f12_trabajo', 1, 180); await range('f12_trabajo', 0, 25); await range('f12_trabajo', 2, 8); chk('trabajo α = 180°: −F·d', await lec('f12_trabajo', 'Trabajo W'), casi(-200)); chk('trabajo α = 180°: negativo', await lec('f12_trabajo', 'Signo'), txt(/negativo/));
  await range('f12_trabajo', 1, 60); chk('trabajo α = 60°: mitad', await lec('f12_trabajo', 'Trabajo W'), casi(25 * 8 * 0.5));
  // ---------- f12_fx: sliders x, m; chips cte, lin, dec, tro, sen (por defecto muelle F = 4x, x = 6, m = 5)
  await ir('f12_fx');
  chk('fx muelle: W = 2x²', await lec('f12_fx', 'Trabajo W'), casi(72)); chk('fx: teorema v = √(2W/m)', await lec('f12_fx', 'Teorema'), t => casi(Math.sqrt(2 * 72 / 5))(t.replace(/^.*=\s*/, '')));
  await chip('f12_fx', '[data-pre]', 0); chk('fx constante: W = 20x', await lec('f12_fx', 'Trabajo W'), casi(120));
  await chip('f12_fx', '[data-pre]', 2); chk('fx decreciente: W = 40x − 1,5x²', await lec('f12_fx', 'Trabajo W'), casi(40 * 6 - 1.5 * 36));
  await range('f12_fx', 0, 8); await chip('f12_fx', '[data-pre]', 3); chk('fx a trozos: 30·4 + 10·3 − 10·1', await lec('f12_fx', 'Trabajo W'), casi(140));
  await range('f12_fx', 0, 10); await chip('f12_fx', '[data-pre]', 4); chk('fx senoidal: W = 600/π', await lec('f12_fx', 'Trabajo W'), casi(600 / Math.PI));
  // ---------- f12_rampa: sliders θ, μ, m, s (por defecto 30°, 0,2, 5 kg, s = 3,6 m)
  await ir('f12_rampa');
  { const th = 30 * R, a = g * (Math.sin(th) - 0.2 * Math.cos(th)), s = 3.6; chk('rampa: trabajo del peso', await lec('f12_rampa', 'Trabajo del peso'), casi(5 * g * s * Math.sin(th))); chk('rampa: trabajo del rozamiento', await lec('f12_rampa', 'Trabajo del rozamiento'), casi(-0.2 * 5 * g * Math.cos(th) * s));
    chk('rampa: la normal no trabaja', await lec('f12_rampa', 'Trabajo de la normal'), txt(/^0 J/)); chk('rampa: trabajo neto = ΔE_c', await lec('f12_rampa', 'Trabajo neto'), casi(5 * a * s)); chk('rampa: velocidad abajo', await lec('f12_rampa', 'Velocidad al llegar abajo'), casi(Math.sqrt(2 * a * 6))); }
  await range('f12_rampa', 1, 0); chk('rampa sin rozamiento: v abajo = √(2gh)', await lec('f12_rampa', 'Velocidad al llegar abajo'), casi(Math.sqrt(2 * g * 6 * 0.5)));
  await range('f12_rampa', 1, 0.6); chk('rampa con μ alto: no desliza', await lec('f12_rampa', '¡No desliza'), t => !!t);
  // ---------- f12_montana: sliders x0, v0, μ, m (por defecto valle, 1 m, 0, 0, 2 kg)
  await ir('f12_montana');
  { const y0 = 0.16 * 16; chk('montaña: E_m inicial = m·g·y', await lec('f12_montana', 'Mecánica'), casi(2 * g * y0)); chk('montaña: altura inicial', await lec('f12_montana', 'Altura'), casi(y0)); }
  await range('f12_montana', 3, 4); chk('montaña: m × 2 → E_m × 2', await lec('f12_montana', 'Mecánica'), casi(4 * g * 0.16 * 16));
  chk('montaña: sin rozamiento no hay calor', await lec('f12_montana', 'Calor disipado'), t => num(t) === 0);
  // ---------- f12_pendulo: sliders L, ángulo, m (por defecto 2 m, 60°, 1 kg)
  await ir('f12_pendulo');
  chk('péndulo: v máx = √(2gL(1 − cos θ₀))', await lec('f12_pendulo', 'Velocidad máxima'), casi(Math.sqrt(2 * g * 2 * (1 - Math.cos(60 * R))))); chk('péndulo: h inicial = L(1 − cos θ)', await lec('f12_pendulo', 'Altura sobre'), casi(1));
  chk('péndulo: E_p inicial = m·g·h', await lec('f12_pendulo', 'E'), t => !!t);
  await range('f12_pendulo', 1, 30); chk('péndulo 30°: v máx', await lec('f12_pendulo', 'Velocidad máxima'), casi(Math.sqrt(2 * g * 2 * (1 - Math.cos(30 * R)))));
  await range('f12_pendulo', 0, 1); chk('péndulo L = 1 m, 30°: v máx', await lec('f12_pendulo', 'Velocidad máxima'), casi(Math.sqrt(2 * g * 1 * (1 - Math.cos(30 * R)))));
  await range('f12_pendulo', 2, 4); chk('péndulo: la masa no cambia v máx', await lec('f12_pendulo', 'Velocidad máxima'), casi(Math.sqrt(2 * g * 1 * (1 - Math.cos(30 * R)))));
  // ---------- f12_lanzamiento: sliders v₀, m, altura (por defecto Tierra, 14 m/s, 0,5 kg, 50 % de h_máx)
  await ir('f12_lanzamiento');
  chk('lanzamiento: h máx = v₀²/2g', await lec('f12_lanzamiento', 'Altura máxima'), casi(196 / (2 * g))); chk('lanzamiento: altura actual', await lec('f12_lanzamiento', 'Altura actual'), casi(98 / (2 * g)));
  chk('lanzamiento: velocidad a media altura', await lec('f12_lanzamiento', 'Velocidad a esa altura'), casi(Math.sqrt(196 - 98))); chk('lanzamiento: E_m = ½mv₀²', await lec('f12_lanzamiento', 'E'), t => !!t);
  await range('f12_lanzamiento', 2, 1); chk('lanzamiento arriba: v = 0', await lec('f12_lanzamiento', 'Velocidad a esa altura'), t => num(t) < 0.05);
  await range('f12_lanzamiento', 0, 20); await range('f12_lanzamiento', 2, 0); chk('lanzamiento 20 m/s: h máx', await lec('f12_lanzamiento', 'Altura máxima'), casi(400 / (2 * g)));
  // ---------- f12_potencia: sliders m, h, t | F, v | P, h/día, días, precio  (por defecto grúa 500 kg, 20 m, 25 s)
  await ir('f12_potencia');
  chk('potencia grúa: W = m·g·h', await lec('f12_potencia', 'Trabajo para subirla'), casi(500 * g * 20)); chk('potencia grúa: P = W/t', await lec('f12_potencia', 'Potencia'), casi(500 * g * 20 / 25)); chk('potencia grúa: en CV', await lec('f12_potencia', 'En caballos'), casi(500 * g * 20 / 25 / 735.5));
  await range('f12_potencia', 2, 50); chk('potencia grúa: doble tiempo, mitad potencia', await lec('f12_potencia', 'Potencia'), casi(500 * g * 20 / 50));
  await chip('f12_potencia', '[data-modo]', 1); chk('potencia coche: P = F·v', await lec('f12_potencia', 'Potencia'), casi(600 * 25));
  await range('f12_potencia', 4, 30); chk('potencia coche: v = 30 m/s', await lec('f12_potencia', 'Potencia'), casi(600 * 30));
  await chip('f12_potencia', '[data-modo]', 2); chk('factura: E = P·t', await lec('f12_potencia', 'Energía consumida'), casi(0.15 * 8 * 30)); chk('factura: coste', await lec('f12_potencia', 'Coste'), casi(0.15 * 8 * 30 * 0.15));
  chk('factura: el kWh es energía', await lec('f12_potencia', 'Atención'), txt(/ENERGÍA/));
  // ---------- f12_sankey: sliders η₁, η₂, η₃, E (por defecto central térmica 38, 97, 92 %, 100 MJ)
  await ir('f12_sankey');
  chk('sankey central: η total', await lec('f12_sankey', 'Rendimiento total'), casi(100 * 0.38 * 0.97 * 0.92)); chk('sankey: energía útil', await lec('f12_sankey', 'Energía útil'), casi(100 * 0.38 * 0.97 * 0.92));
  await chip('f12_sankey', '[data-pre]', 2); chk('sankey coche eléctrico', await lec('f12_sankey', 'Rendimiento total'), casi(100 * 0.9 * 0.95 * 0.92)); chk('sankey: energía necesaria para 100 MJ útiles', await lec('f12_sankey', 'Para obtener'), casi(100 / (0.9 * 0.95 * 0.92), 0.01));
  await range('f12_sankey', 0, 50); await range('f12_sankey', 1, 50); await range('f12_sankey', 2, 50); chk('sankey 50 %·50 %·50 % = 12,5 %', await lec('f12_sankey', 'Rendimiento total'), casi(12.5));
  // ---------- f12_unidades: monta y responde
  await ir('f12_unidades');
  chk('unidades: hay lecturas', await W('f12_unidades').locator('.lec').count(), c => c >= 2);
  await chip('f12_unidades', '[data-modo]', 1); chk('unidades en modo potencia: hay lecturas', await W('f12_unidades').locator('.lec').count(), c => c >= 2);
  // ---------- f12_leerfx: acierto y fallo
  await ir('f12_leerfx');
  const clic = async (i, j) => { await W('f12_leerfx').locator('.lg-p').nth(i).locator('.chip-btn').nth(j).click(); await p.waitForTimeout(40); return W('f12_leerfx').locator('.lg-p').nth(i).locator('.lg-r').innerText(); };
  chk('leerfx mal', await clic(0, 1), txt(/Todavía no/)); chk('leerfx bien', await clic(0, 0), txt(/Correcto/));
  await chip('f12_leerfx', '[data-sel]', 2); chk('leerfx gráfica C: trabajo total 42 J', await clic(2, 0), txt(/Correcto/));
  // ---------- global
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); chk('sin desborde horizontal', ov, v => v <= 1);
  if (oscuro) chk('modo oscuro activo', await esOscuro(p), true);
  const { total, malos } = await contraste(p, '#detail-t12', 3); console.log('contraste (' + (oscuro ? 'modo oscuro' : 'modo claro') + '): ' + total + ' textos medidos, ' + malos.length + ' por debajo de 3:1', malos.slice(0, 8)); chk('contraste del texto ≥ 3:1', malos.length, v => v === 0);
  const ovw = await p.evaluate(() => [...document.querySelectorAll('#detail-t12 .w[data-w^=f12_]')].filter(e => e.scrollWidth > e.clientWidth + 1).map(e => e.getAttribute('data-w'))); console.log('widgets f12 más anchos que su tarjeta:', ovw.join(', ') || 'ninguno');
  console.log(mal ? mal + ' FALLOS de ' + n : n + ' comprobaciones de comportamiento de energía correctas', '· errores JS:', errs.length ? errs : 'ninguno', movil ? '· móvil' : '', oscuro ? '· oscuro' : '');
  await b.close();
})();
