// Comportamiento de los simuladores de fyq1 t9 (movimiento circular):
//   node herramientas/pruebas/e2e_fyq1_t9.js [movil] [oscuro]
// Los valores esperados se calculan aquí con Math (sin usar el código de la web).
const { lanzar, abrirTema } = require('./e2e_common.js');
const { contraste, esOscuro } = require('./e2e_fyq1_comun.js');
(async () => {
  const movil = process.argv.includes('movil'), oscuro = process.argv.includes('oscuro');
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 }, scheme: oscuro ? 'dark' : 'light' });
  await abrirTema(p, 'fyq1', 't9');
  let mal = 0, n = 0;
  const TAU = 2 * Math.PI;
  const W = nm => p.locator(`#detail-t9 [data-w=${nm}]`).first();
  const lec = async (nm, rot) => W(nm).locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chip = async (nm, sel, i) => { await W(nm).locator(sel + ' .chip-btn').nth(i).click(); await p.waitForTimeout(80); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? !!esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(80); };
  const ir = async nm => { await W(nm).scrollIntoViewIfNeeded(); };
  // primer número de una lectura (coma decimal, espacios como separador de miles, ·10ⁿ opcional)
  const sup = { '⁰': 0, '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9 };
  const num = s => {
    if (s == null) return NaN;
    const m = s.replace(/[   ]/g, '').replace(/−/g, '-').match(/(-?\d+(?:,\d+)?)(?:·10(⁻?)([⁰¹²³⁴⁵⁶⁷⁸⁹]+))?/); if (!m) return NaN;
    let v = parseFloat(m[1].replace(',', '.')); if (m[3]) { const e = parseInt([...m[3]].map(c => sup[c]).join(''), 10); v *= Math.pow(10, m[2] ? -e : e); } return v;
  };
  const casi = (esp, tol = 0.006) => got => { const v = num(got); return Math.abs(v - esp) <= tol * Math.max(Math.abs(esp), 1e-12); };

  // ---------- f9_arco: θ en grados, r en m (por defecto 90° y 2 m)
  await ir('f9_arco');
  chk('arco 90°: rad', await lec('f9_arco', 'Ángulo en radianes'), casi(Math.PI / 2)); chk('arco 90°: s', await lec('f9_arco', 'Longitud del arco'), casi(Math.PI / 2 * 2));
  await range('f9_arco', 0, 180); chk('arco 180°: rad', await lec('f9_arco', 'Ángulo en radianes'), casi(Math.PI)); chk('arco 180°: s', await lec('f9_arco', 'Longitud del arco'), casi(Math.PI * 2));
  await range('f9_arco', 1, 3); chk('arco r=3: s', await lec('f9_arco', 'Longitud del arco'), casi(Math.PI * 3)); chk('arco circunferencia', await lec('f9_arco', 'Circunferencia'), t => casi(TAU * 3)(t.replace(/^.*=\s*/, '')));
  await range('f9_arco', 0, 360); chk('arco 360°: una vuelta', await lec('f9_arco', 'Fracción de vuelta'), casi(1));
  // ---------- f9_unidades
  await ir('f9_unidades');
  chk('unidades 300 rpm → rad/s', await lec('f9_unidades', 'ω en rad/s'), casi(300 * TAU / 60)); chk('unidades 300 rpm → Hz', await lec('f9_unidades', 'Frecuencia'), casi(5)); chk('unidades 300 rpm → T', await lec('f9_unidades', 'Periodo'), casi(0.2));
  await chip('f9_unidades', '[data-un]', 1); chk('unidades 5 Hz → rpm', await lec('f9_unidades', 'Revoluciones'), casi(300)); chk('unidades 5 Hz → rad/s', await lec('f9_unidades', 'ω en rad/s'), casi(5 * TAU));
  await chip('f9_unidades', '[data-un]', 3); chk('unidades 360°/s → rad/s', await lec('f9_unidades', 'ω en rad/s'), casi(TAU)); chk('unidades 360°/s → rpm', await lec('f9_unidades', 'Revoluciones'), casi(60));
  await chip('f9_unidades', '[data-un]', 4); chk('unidades T=2 s → ω', await lec('f9_unidades', 'ω en rad/s'), casi(Math.PI)); chk('unidades T=2 s → f', await lec('f9_unidades', 'Frecuencia'), casi(0.5));
  await W('f9_unidades').locator('input[type=text]').fill('0,5'); await p.waitForTimeout(80); chk('unidades T=0,5 (coma decimal)', await lec('f9_unidades', 'ω en rad/s'), casi(4 * Math.PI));
  await W('f9_unidades').locator('input[type=text]').fill('abc'); await p.waitForTimeout(80); chk('unidades entrada no numérica', await lec('f9_unidades', 'Escribe un número'), t => !!t);
  // ---------- f9_mcu: r, ω, θ₀, t (por defecto r = 1 m, ω = 2 rad/s)
  await ir('f9_mcu');
  chk('mcu T', await lec('f9_mcu', 'Periodo'), casi(Math.PI)); chk('mcu v', await lec('f9_mcu', 'Velocidad lineal'), casi(2)); chk('mcu a_c', await lec('f9_mcu', 'Aceleración centrípeta'), casi(4));
  await range('f9_mcu', 1, 4); chk('mcu ω×2 → a_c×4', await lec('f9_mcu', 'Aceleración centrípeta'), casi(16)); chk('mcu ω×2 → v×2', await lec('f9_mcu', 'Velocidad lineal'), casi(4));
  await range('f9_mcu', 0, 2); chk('mcu r=2, ω=4: a_c', await lec('f9_mcu', 'Aceleración centrípeta'), casi(32)); chk('mcu r=2, ω=4: v', await lec('f9_mcu', 'Velocidad lineal'), casi(8));
  await range('f9_mcu', 3, 3); chk('mcu θ = ωt', await lec('f9_mcu', 'Ángulo recorrido'), casi(12)); chk('mcu arco s = θ r', await lec('f9_mcu', 'Longitud de arco'), casi(24));
  await range('f9_mcu', 1, -2); chk('mcu sentido horario', await lec('f9_mcu', 'Sentido'), t => /horario/.test(t) && !/antihorario/.test(t)); chk('mcu rapidez con ω<0', await lec('f9_mcu', 'Velocidad lineal'), casi(4));
  // ---------- f9_vectores: Δθ, ω (por defecto 60° y 2 rad/s; r = 2 m → v = 4 m/s)
  await ir('f9_vectores');
  chk('vectores |Δv| exacto', await lec('f9_vectores', '|Δv| exacto'), casi(2 * 4 * Math.sin(Math.PI / 6))); chk('vectores aproximación', await lec('f9_vectores', 'Aproximación'), casi(4 * Math.PI / 3));
  chk('vectores a media', await lec('f9_vectores', 'Aceleración media'), casi(2 * 4 * Math.sin(Math.PI / 6) / (Math.PI / 3 / 2))); chk('vectores a_c', await lec('f9_vectores', 'Aceleración centrípeta'), casi(8));
  await range('f9_vectores', 0, 5); const rr = 2 * Math.sin(5 * Math.PI / 360) / (5 * Math.PI / 180);
  chk('vectores Δθ→0: cociente → 1', await lec('f9_vectores', 'Aceleración centrípeta'), t => { const m = t.match(/= (\d,\d+)\)/); return !!m && Math.abs(parseFloat(m[1].replace(',', '.')) - rr) < 2e-3 && rr > 0.999; });
  // ---------- f9_mcua: r, ω₀, α, t (por defecto 1,5 m, 1 rad/s, 0,75 rad/s²)
  await ir('f9_mcua');
  await range('f9_mcua', 3, 4); chk('mcua ω(4)', await lec('f9_mcua', 'Velocidad angular'), casi(1 + 0.75 * 4)); chk('mcua θ(4)', await lec('f9_mcua', 'Ángulo'), casi(1 * 4 + 0.5 * 0.75 * 16));
  chk('mcua a_t', await lec('f9_mcua', 'Aceleración tangencial'), casi(0.75 * 1.5)); chk('mcua a_n', await lec('f9_mcua', 'Aceleración normal'), casi(16 * 1.5)); chk('mcua |a|', await lec('f9_mcua', 'Aceleración total'), casi(Math.hypot(0.75 * 1.5, 16 * 1.5))); chk('mcua v', await lec('f9_mcua', 'Velocidad lineal'), casi(4 * 1.5));
  await range('f9_mcua', 2, -2); await range('f9_mcua', 3, 3); chk('mcua frenando ω(3) = 1 − 6', await lec('f9_mcua', 'Velocidad angular'), casi(-5));
  // ---------- f9_engranajes (por defecto: 20 y 30 dientes, 60 rpm)
  await ir('f9_engranajes');
  chk('engranajes rueda 2 = 40 rpm', await lec('f9_engranajes', 'Rueda 2'), t => /40 rpm/.test(t) && /sentido contrario/.test(t)); chk('engranajes relación', await lec('f9_engranajes', 'Relación'), t => Math.abs(num(t.replace(/^[^=]*=[^=]*=/, '')) - 20 / 30) < 2e-3);
  await range('f9_engranajes', 2, 40); chk('engranajes 20/40 → 30 rpm', await lec('f9_engranajes', 'Rueda 2'), t => /30 rpm/.test(t));
  await chip('f9_engranajes', '[data-modo]', 1); chk('poleas: ω₂ = ω₁r₁/r₂', await lec('f9_engranajes', 'Polea 2'), t => Math.abs(num(t.replace(/^.*?m · /, '')) - 60 * 0.8 / 1.4) < 0.1 && /mismo sentido/.test(t)); chk('poleas: v correa', await lec('f9_engranajes', 'Velocidad de la correa'), casi(60 * TAU / 60 * 0.8, 0.006));
  await chip('f9_engranajes', '[data-modo]', 2); chk('bici: rueda trasera', await lec('f9_engranajes', 'Rueda trasera'), t => /192,5 rpm/.test(t)); chk('bici: velocidad', await lec('f9_engranajes', 'Velocidad de la bici'), t => /6,85 m\/s/.test(t) && /24,7 km\/h/.test(t)); chk('bici: avance por pedalada', await lec('f9_engranajes', 'Avance'), casi(TAU * 0.34 * 44 / 16));
  // ---------- f9_aplic
  await ir('f9_aplic');
  chk('aplic Tierra ω', await lec('f9_aplic', 'ω = 2π/T'), casi(TAU / 86164)); chk('aplic Tierra v', await lec('f9_aplic', 'v = ω·r'), casi(TAU / 86164 * 6.371e6)); chk('aplic Tierra a_c', await lec('f9_aplic', 'a'), casi((TAU / 86164) ** 2 * 6.371e6));
  await chip('f9_aplic', '[data-sel]', 2); chk('aplic Luna a_c', await lec('f9_aplic', 'a'), casi((TAU / 2.3606e6) ** 2 * 3.844e8));
  await chip('f9_aplic', '[data-sel]', 5); chk('aplic lavadora a_c', await lec('f9_aplic', 'a'), casi((1200 * TAU / 60) ** 2 * 0.25)); chk('aplic lavadora en g', await lec('f9_aplic', 'En múltiplos'), casi((1200 * TAU / 60) ** 2 * 0.25 / 9.8));
  await chip('f9_aplic', '[data-sel]', 7); chk('aplic coche curva ω', await lec('f9_aplic', 'ω = 2π/T'), casi(20 / 100));
  // ---------- f9_proyeccion: A, ω, φ, t (por defecto 1,5 m, 1,5 rad/s)
  await ir('f9_proyeccion');
  chk('proyección x(0)', await lec('f9_proyeccion', 'Posición'), casi(1.5)); chk('proyección T', await lec('f9_proyeccion', 'Periodo'), casi(TAU / 1.5)); chk('proyección Aω', await lec('f9_proyeccion', 'Elongación máxima'), t => /A = 1,5 m/.test(t) && /2,25 m\/s/.test(t));
  await range('f9_proyeccion', 3, 2.1); chk('proyección x(2,1) = A cos(ωt)', await lec('f9_proyeccion', 'Posición'), casi(1.5 * Math.cos(1.5 * 2.1))); chk('proyección a = −ω²x', await lec('f9_proyeccion', 'Aceleración'), casi(-(1.5 ** 2) * 1.5 * Math.cos(1.5 * 2.1)));
  // ---------- f9_coincidencia
  await ir('f9_coincidencia');
  chk('coincidencia reloj 65,45 min', await lec('f9_coincidencia', 'Se encuentran cada'), t => /65,45/.test(t) && /1 h 5,45 min/.test(t));
  await chip('f9_coincidencia', '[data-pre]', 1); chk('coincidencia corredores 200 s', await lec('f9_coincidencia', 'Se encuentran cada'), t => /^200 s/.test(t));
  await chip('f9_coincidencia', '[data-pre]', 2); chk('coincidencia opuestos 22,2 s', await lec('f9_coincidencia', 'Se encuentran cada'), t => /22,22/.test(t));
  await W('f9_coincidencia').locator('.ctl > .chip-btn').first().click(); await p.waitForTimeout(80); chk('coincidencia invertir → mismo sentido', await lec('f9_coincidencia', 'Se encuentran cada'), t => /^200 s/.test(t));
  await chip('f9_coincidencia', '[data-pre]', 3); chk('coincidencia Tierra–Marte 780 d', await lec('f9_coincidencia', 'Se encuentran cada'), t => /779,88|779,9|780/.test(t));
  // ---------- f9_honda: soltar la cuerda
  await ir('f9_honda');
  chk('honda con cuerda: a_c = ω²r', await lec('f9_honda', 'Estado'), t => /Con cuerda/.test(t) && Math.abs(num(t.replace(/^.*?=\s*ω²·r\s*=\s*/, '')) - 3 * 3 * 2) < 0.2);
  chk('honda v = ω r', await lec('f9_honda', 'Velocidad'), casi(6));
  await W('f9_honda').locator('.an-barra [data-p]').click(); await p.waitForTimeout(450);
  await W('f9_honda').locator('.an-barra .chip-btn', { hasText: 'Soltar' }).click(); await p.waitForTimeout(500);
  chk('honda sin cuerda: MRU', await lec('f9_honda', 'Estado'), t => /Sin cuerda: MRU/.test(t)); const dist = num(((await lec('f9_honda', 'Estado')) || '').replace(/^.*Recorrido/, '')); chk('honda se ha alejado por la tangente', dist, d => d > 0.5);
  chk('honda botón de soltar desactivado', await W('f9_honda').locator('.an-barra .chip-btn', { hasText: 'Soltar' }).isDisabled(), true);
  await W('f9_honda').locator('.an-barra [data-r]').click(); await p.waitForTimeout(100); chk('honda reiniciar', await lec('f9_honda', 'Estado'), t => /Con cuerda/.test(t));
  // ---------- f9_leergraf: acierto y fallo
  await ir('f9_leergraf');
  const clic = async (i, j) => { await W('f9_leergraf').locator('.lg-p').nth(i).locator('.chip-btn').nth(j).click(); await p.waitForTimeout(40); return W('f9_leergraf').locator('.lg-p').nth(i).locator('.lg-r').innerText(); };
  chk('leergraf mal', await clic(0, 1), t => /Todavía no/.test(t)); chk('leergraf bien', await clic(0, 0), t => /Correcto/.test(t));
  // ---------- global
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); chk('sin desborde horizontal', ov, v => v <= 1);
  if (oscuro) {
    chk('modo oscuro activo', await esOscuro(p), true);
    const { total, malos } = await contraste(p, '#detail-t9', 3); console.log('contraste (modo oscuro): ' + total + ' textos medidos, ' + malos.length + ' por debajo de 3:1', malos.slice(0, 8)); chk('contraste del texto ≥ 3:1', malos.length, v => v === 0);
  } else {
    const { total, malos } = await contraste(p, '#detail-t9', 3); console.log('contraste (modo claro): ' + total + ' textos medidos, ' + malos.length + ' por debajo de 3:1', malos.slice(0, 8)); chk('contraste del texto ≥ 3:1', malos.length, v => v === 0);
  }
  console.log(mal ? mal + ' FALLOS de ' + n : n + ' comprobaciones de comportamiento de movimiento circular correctas', '· errores JS:', errs.length ? errs : 'ninguno', movil ? '· móvil' : '', oscuro ? '· oscuro' : '');
  await b.close();
})();
