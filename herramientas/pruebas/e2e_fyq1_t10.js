// Comportamiento de los simuladores de fyq1 t10 (dinámica):
//   node herramientas/pruebas/e2e_fyq1_t10.js [movil] [oscuro]
// Los valores esperados se calculan aquí con Math (sin usar el código de la web).
const { lanzar, abrirTema } = require('./e2e_common.js');
const { contraste, esOscuro } = require('./e2e_fyq1_comun.js');
(async () => {
  const movil = process.argv.includes('movil'), oscuro = process.argv.includes('oscuro');
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 }, scheme: oscuro ? 'dark' : 'light' });
  await abrirTema(p, 'fyq1', 't10');
  let mal = 0, n = 0;
  const g = 9.8, R = Math.PI / 180;
  const W = nm => p.locator(`#detail-t10 [data-w=${nm}]`).first();
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
  const casi = (esp, tol = 0.006) => got => { const v = num(got); return Math.abs(v - esp) <= tol * Math.max(Math.abs(esp), 1e-9); };
  const txt = re => got => re.test(got || '');

  // ---------- f10_resultante: sliders F1, θ1, F2, θ2, F3, θ3, m (por defecto 3 N a 0° y 4 N a 90°, m = 2 kg)
  await ir('f10_resultante');
  chk('resultante 3-4-5: ΣFx', await lec('f10_resultante', 'ΣFx'), casi(3)); chk('resultante 3-4-5: ΣFy', await lec('f10_resultante', 'ΣFy'), casi(4));
  chk('resultante 3-4-5: módulo', await lec('f10_resultante', 'Módulo'), casi(5)); chk('resultante 3-4-5: dirección', await lec('f10_resultante', 'Dirección'), casi(Math.atan2(4, 3) / R));
  chk('resultante: a = ΣF/m', await lec('f10_resultante', 'Aceleración'), casi(2.5)); chk('resultante: suma de módulos', await lec('f10_resultante', 'Suma de los módulos'), casi(7));
  await chip('f10_resultante', '[data-pre]', 3); chk('resultante 60°: |R| = 6√3', await lec('f10_resultante', 'Módulo'), casi(Math.sqrt(36 + 36 + 2 * 36 * Math.cos(60 * R))));
  await chip('f10_resultante', '[data-pre]', 2); chk('resultante opuestas: 2 N', await lec('f10_resultante', 'Módulo'), casi(2)); chk('resultante opuestas: dirección 0° (la mayor)', await lec('f10_resultante', 'Dirección'), t => Math.abs(num(t)) < 0.2);
  await chip('f10_resultante', '[data-pre]', 5); chk('resultante equilibrio', await lec('f10_resultante', 'Módulo'), txt(/equilibrio/)); chk('resultante equilibrio: a = 0', await lec('f10_resultante', 'Aceleración'), txt(/^0 /));
  await chip('f10_resultante', '[data-pre]', 4); await range('f10_resultante', 4, 0);
  { const x = 6 + 5 * Math.cos(100 * R), y = 5 * Math.sin(100 * R); chk('resultante 3 fuerzas con F3 = 0', await lec('f10_resultante', 'Módulo'), casi(Math.hypot(x, y))); }
  // ---------- f10_segunda: sliders F, m, μ, t (por defecto F = 20 N, m = 5 kg, μ = 0)
  await ir('f10_segunda');
  chk('segunda: a = F/m', await lec('f10_segunda', 'Aceleración'), casi(4)); chk('segunda: ΣF', await lec('f10_segunda', 'Fuerza neta'), casi(20));
  await range('f10_segunda', 3, 5); chk('segunda: v = a t', await lec('f10_segunda', 'Velocidad'), casi(20)); chk('segunda: x = ½ a t²', await lec('f10_segunda', 'Posición'), casi(50));
  await range('f10_segunda', 1, 10); chk('segunda: masa doble → a mitad', await lec('f10_segunda', 'Aceleración'), casi(2));
  await range('f10_segunda', 0, -30); chk('segunda: fuerza negativa → a negativa', await lec('f10_segunda', 'Aceleración'), casi(-3));
  await range('f10_segunda', 0, 20); await range('f10_segunda', 2, 0.3); chk('segunda: F < μmg → no se mueve', await lec('f10_segunda', 'Estado'), txt(/no se mueve/)); chk('segunda: a = 0 con rozamiento estático', await lec('f10_segunda', 'Aceleración'), casi(0, 1) );
  await range('f10_segunda', 0, 40); chk('segunda con rozamiento: a = (F − μmg)/m', await lec('f10_segunda', 'Aceleración'), casi((40 - 0.3 * 10 * g) / 10)); chk('segunda: rozamiento máximo', await lec('f10_segunda', 'Rozamiento máximo'), casi(29.4));
  // ---------- f10_accion: sliders mA, mB, F, t (por defecto 40 kg, 80 kg, 150 N)
  await ir('f10_accion');
  chk('acción: aceleración de A', await lec('f10_accion', 'Aceleración de A'), casi(150 / 40)); chk('acción: aceleración de B', await lec('f10_accion', 'Aceleración de B'), casi(150 / 80));
  await range('f10_accion', 3, 4); chk('acción: v de A al final', await lec('f10_accion', 'Velocidad de A'), casi(-150 / 40 * 0.4)); chk('acción: v de B al final', await lec('f10_accion', 'Velocidad de B'), casi(150 / 80 * 0.4));
  chk('acción: cantidad de movimiento total nula', await lec('f10_accion', 'Cantidad de movimiento total'), t => Math.abs(num(t)) < 0.01); chk('acción: cociente de velocidades = mB/mA', await lec('f10_accion', 'Cociente'), casi(2));
  await range('f10_accion', 0, 100); await range('f10_accion', 2, 200); chk('acción: A más pesado → F igual en ambos', await lec('f10_accion', 'Fuerza de A sobre B'), txt(/200 N/));
  // ---------- f10_rozamiento: sliders m, μe, μc, F (por defecto 10 kg, 0,5, 0,3, 20 N)
  await ir('f10_rozamiento');
  chk('rozamiento: normal', await lec('f10_rozamiento', 'Normal'), casi(98)); chk('rozamiento: estático máximo', await lec('f10_rozamiento', 'Rozamiento estático máximo'), casi(49)); chk('rozamiento: cinético', await lec('f10_rozamiento', 'Rozamiento cinético'), casi(29.4));
  chk('rozamiento: en reposo vale F', await lec('f10_rozamiento', 'Rozamiento que actúa'), t => casi(20)(t) && /estático/.test(t)); chk('rozamiento: aceleración nula', await lec('f10_rozamiento', 'Aceleración'), t => num(t) === 0);
  await range('f10_rozamiento', 3, 60); chk('rozamiento: desliza → cinético', await lec('f10_rozamiento', 'Rozamiento que actúa'), t => casi(29.4)(t) && /cinético/.test(t)); chk('rozamiento: a = (F − μcN)/m', await lec('f10_rozamiento', 'Aceleración'), casi((60 - 29.4) / 10));
  await range('f10_rozamiento', 3, 49); chk('rozamiento: justo en el máximo aún no desliza', await lec('f10_rozamiento', 'Rozamiento que actúa'), t => casi(49)(t) && /estático/.test(t));
  await range('f10_rozamiento', 2, 0.9); chk('rozamiento: μc no supera a μe', await lec('f10_rozamiento', 'Rozamiento cinético'), casi(0.5 * 98));
  await chip('f10_rozamiento', '[data-pre]', 2); chk('rozamiento hielo: μe·N', await lec('f10_rozamiento', 'Rozamiento estático máximo'), casi(0.1 * 98)); chk('rozamiento hielo: μc·N', await lec('f10_rozamiento', 'Rozamiento cinético'), casi(0.03 * 98, 0.03));
  // ---------- f10_ascensor: sliders m, a (por defecto 70 kg, a = 0)
  await ir('f10_ascensor');
  chk('ascensor parado: N = mg', await lec('f10_ascensor', 'Lectura de la báscula'), casi(686));
  await chip('f10_ascensor', '[data-pre]', 1); chk('ascensor a = +2: N = m(g + a)', await lec('f10_ascensor', 'Lectura de la báscula'), casi(70 * 11.8)); chk('ascensor a = +2: «kilos»', await lec('f10_ascensor', 'En «kilos»'), casi(70 * 11.8 / g));
  await chip('f10_ascensor', '[data-pre]', 2); chk('ascensor a = −2', await lec('f10_ascensor', 'Lectura de la báscula'), casi(70 * 7.8));
  await chip('f10_ascensor', '[data-pre]', 4); chk('ascensor caída libre: N = 0', await lec('f10_ascensor', 'Lectura de la báscula'), t => num(t) === 0); chk('ascensor caída libre: texto', await lec('f10_ascensor', 'Sensación'), txt(/caída libre/));
  await range('f10_ascensor', 1, 0); await range('f10_ascensor', 0, 90); chk('ascensor: peso real 90 kg', await lec('f10_ascensor', 'Peso real'), casi(882));
  // ---------- f10_equilibrio: sliders m, α1, α2 (por defecto 20 kg, 40°, 40°)
  await ir('f10_equilibrio');
  chk('equilibrio simétrico: T = P/(2 sen α)', await lec('f10_equilibrio', 'Tensión T₁'), casi(196 / (2 * Math.sin(40 * R)))); chk('equilibrio: ΣFx = 0', await lec('f10_equilibrio', 'ΣFx'), t => num(t) === 0); chk('equilibrio: ΣFy = 0', await lec('f10_equilibrio', 'ΣFy'), t => num(t) === 0);
  await range('f10_equilibrio', 0, 10); await range('f10_equilibrio', 1, 30); await range('f10_equilibrio', 2, 60);
  chk('equilibrio 30°/60°: T₁', await lec('f10_equilibrio', 'Tensión T₁'), casi(49)); chk('equilibrio 30°/60°: T₂', await lec('f10_equilibrio', 'Tensión T₂'), casi(98 * Math.cos(30 * R)));
  await range('f10_equilibrio', 1, 5); await range('f10_equilibrio', 2, 5); chk('equilibrio ángulos pequeños: tensión enorme', await lec('f10_equilibrio', 'Comparación'), txt(/MAYOR/));
  // ---------- f10_plano: sliders θ, μ, m, F, t (por defecto 30°, 0,3, 5 kg, F = 0)
  await ir('f10_plano');
  chk('plano: P∥', await lec('f10_plano', 'P∥'), casi(5 * g * 0.5)); chk('plano: N = P⊥', await lec('f10_plano', 'P⊥'), casi(5 * g * Math.cos(30 * R))); chk('plano: rozamiento máximo', await lec('f10_plano', 'Rozamiento máximo'), casi(0.3 * 5 * g * Math.cos(30 * R)));
  chk('plano: a = g(sen θ − μ cos θ)', await lec('f10_plano', 'Aceleración'), casi(g * (0.5 - 0.3 * Math.cos(30 * R)))); chk('plano: estado desliza', await lec('f10_plano', 'Estado'), txt(/desliza plano abajo/));
  await chip('f10_plano', '[data-pre]', 0); chk('plano liso: a = g sen θ', await lec('f10_plano', 'Aceleración'), casi(g * 0.5));
  await chip('f10_plano', '[data-pre]', 2); chk('plano al borde: no desliza', await lec('f10_plano', 'Estado'), txt(/reposo/)); chk('plano: ángulo crítico', await lec('f10_plano', 'Ángulo crítico'), casi(Math.atan(0.51) / R, 0.01));
  await chip('f10_plano', '[data-pre]', 4); chk('plano F para v const: ΣF ≈ 0', await lec('f10_plano', 'Fuerza neta'), t => Math.abs(num(t)) < 2); // 36 N es casi 5·9,8·(0,5 + 0,3·0,866) = 36,9
  await chip('f10_plano', '[data-pre]', 3); chk('plano empujado hacia arriba: sube', await lec('f10_plano', 'Estado'), txt(/arriba/));
  { const P = 5 * g * 0.5, Fr = 0.3 * 5 * g * Math.cos(30 * R); chk('plano sube: a = (F − P∥ − Fr)/m', await lec('f10_plano', 'Aceleración'), casi((40 - P - Fr) / 5)); }
  // ---------- f10_poleas: sliders m1, m2, μ, θ, t (por defecto Atwood 3 kg y 5 kg)
  await ir('f10_poleas');
  chk('Atwood: a', await lec('f10_poleas', 'Aceleración'), casi(2 * g / 8)); chk('Atwood: T', await lec('f10_poleas', 'Tensión'), casi(2 * 3 * 5 * g / 8));
  await range('f10_poleas', 0, 5); chk('Atwood masas iguales: a = 0', await lec('f10_poleas', 'Aceleración'), t => num(t) === 0); chk('Atwood masas iguales: T = mg', await lec('f10_poleas', 'Tensión'), casi(5 * g));
  await range('f10_poleas', 0, 3); await chip('f10_poleas', '[data-modo]', 1);
  { const a = (5 - 0.2 * 3) * g / 8; chk('mesa + colgante: a', await lec('f10_poleas', 'Aceleración'), casi(a)); chk('mesa + colgante: T', await lec('f10_poleas', 'Tensión'), casi(5 * (g - a))); }
  await range('f10_poleas', 2, 0.8); await range('f10_poleas', 1, 2); chk('mesa: 2 kg no vencen 0,8·3 kg → no se mueve', await lec('f10_poleas', 'Estado'), txt(/no se mueve/)); chk('mesa quieta: T = m₂ g', await lec('f10_poleas', 'Tensión'), casi(2 * g));
  await range('f10_poleas', 1, 5); await range('f10_poleas', 2, 0.2); await chip('f10_poleas', '[data-modo]', 2);
  { const a = (5 - 3 * 0.5 - 0.2 * 3 * Math.cos(30 * R)) * g / 8; chk('plano + colgante: a', await lec('f10_poleas', 'Aceleración'), casi(a)); chk('plano + colgante: T', await lec('f10_poleas', 'Tensión'), casi(5 * (g - a))); }
  await range('f10_poleas', 1, 1); await range('f10_poleas', 2, 0); chk('plano liso + colgante ligero: m₁ baja', await lec('f10_poleas', 'Estado'), txt(/m₁ baja/));
  // ---------- f10_curva: sliders v, r, μ, θ, m (por defecto 60 km/h, 100 m, 0,6, 0°, 1000 kg)
  await ir('f10_curva');
  { const v = 60 / 3.6; chk('curva: a = v²/r', await lec('f10_curva', 'Aceleración centrípeta'), casi(v * v / 100)); chk('curva: normal = mg', await lec('f10_curva', 'Normal'), casi(9800)); chk('curva: μ necesario', await lec('f10_curva', 'μ necesario'), casi(v * v / 100 / g, 0.01)); }
  chk('curva: v máx = √(μ g r)', await lec('f10_curva', 'Velocidad máxima'), casi(Math.sqrt(0.6 * g * 100) * 3.6)); chk('curva: toma la curva', await lec('f10_curva', 'Resultado'), txt(/toma la curva/));
  await range('f10_curva', 0, 120); chk('curva a 120 km/h: derrapa', await lec('f10_curva', 'Resultado'), txt(/DERRAPA/));
  await range('f10_curva', 3, 10); { const tn = Math.tan(10 * R), v = Math.sqrt(100 * g * (tn + 0.6) / (1 - 0.6 * tn)) * 3.6; chk('curva con peralte 10°: v máx', await lec('f10_curva', 'Velocidad máxima'), casi(v)); }
  await range('f10_curva', 4, 2000); chk('curva: la masa no cambia v máx', await lec('f10_curva', 'Velocidad máxima'), casi(Math.sqrt(100 * g * (Math.tan(10 * R) + 0.6) / (1 - 0.6 * Math.tan(10 * R))) * 3.6));
  await range('f10_curva', 3, 0); await range('f10_curva', 0, 10); chk('curva muy lenta con μ pequeño sin peralte sigue agarrando', await lec('f10_curva', 'Resultado'), txt(/toma la curva/));
  // ---------- f10_choque: sliders m1, v1, m2, v2, e, t (por defecto 4 kg a 4 m/s contra 4 kg en reposo, e = 1)
  await ir('f10_choque');
  chk('choque elástico masas iguales: intercambian', await lec('f10_choque', 'Después'), t => { const m = (t || '').replace(/−/g, '-').match(/(-?\d+(?:,\d+)?)\s*;\s*(-?\d+(?:,\d+)?)/); return m && Math.abs(parseFloat(m[1].replace(',', '.'))) < 0.01 && Math.abs(parseFloat(m[2].replace(',', '.')) - 4) < 0.02; });
  chk('choque elástico: no se pierde energía', await lec('f10_choque', 'Energía perdida'), t => num(t) === 0);
  await chip('f10_choque', '[data-pre]', 1); chk('choque inelástico: v′ = 2 m/s', await lec('f10_choque', 'Después'), t => /^2 ; 2/.test(t)); chk('choque inelástico: pérdida de 16 J', await lec('f10_choque', 'Energía perdida'), casi(16));
  chk('choque: p se conserva', await lec('f10_choque', 'Cantidad de movimiento'), t => /16 [→⟶] 16/.test(t));
  await chip('f10_choque', '[data-pre]', 4); { const m1 = 6, v1 = 3, m2 = 2, v2 = -3, a = ((m1 - m2) * v1 + 2 * m2 * v2) / 8, c = ((m2 - m1) * v2 + 2 * m1 * v1) / 8; chk('choque elástico 6 kg y 2 kg', await lec('f10_choque', 'Después'), t => { const m = (t || '').replace(/−/g, '-').match(/(-?\d+(?:,\d+)?)\s*;\s*(-?\d+(?:,\d+)?)/); return m && Math.abs(parseFloat(m[1].replace(',', '.')) - a) < 0.02 && Math.abs(parseFloat(m[2].replace(',', '.')) - c) < 0.02; }); }
  await range('f10_choque', 1, -4); chk('choque: si se alejan no chocan', await lec('f10_choque', 'Aviso'), txt(/no chocan/));
  // ---------- f10_caida: sliders v límite, m, t (por defecto 55 m/s, 80 kg)
  await ir('f10_caida');
  await range('f10_caida', 2, 10); { const vl = 55, v = vl * Math.tanh(g * 10 / vl); chk('caída: v(t) = v_lím·tanh(g t/v_lím)', await lec('f10_caida', 'Velocidad v(t)'), casi(v)); chk('caída: constante k', await lec('f10_caida', 'Constante k'), casi(80 * g / 55 / 55)); chk('caída: aceleración', await lec('f10_caida', 'Aceleración'), casi(g * (1 - v * v / vl / vl), 0.01)); chk('caída: distancia', await lec('f10_caida', 'Distancia caída'), casi(vl * vl / g * Math.log(Math.cosh(g * 10 / vl)))); }
  await range('f10_caida', 0, 6); await range('f10_caida', 2, 20); chk('caída con paracaídas: casi v límite', await lec('f10_caida', 'Velocidad v(t)'), casi(6 * Math.tanh(g * 20 / 6), 0.01));
  await chip('f10_caida', '[data-pre]', 3); chk('caída pluma: tiempo al 95 %', await lec('f10_caida', 'Tiempo para alcanzar'), casi(1 / g * Math.atanh(0.95), 0.1));
  // ---------- f10_leer: acierto y fallo
  await ir('f10_leer');
  const clic = async (i, j) => { await W('f10_leer').locator('.lg-p').nth(i).locator('.chip-btn').nth(j).click(); await p.waitForTimeout(40); return W('f10_leer').locator('.lg-p').nth(i).locator('.lg-r').innerText(); };
  chk('leer mal', await clic(0, 1), txt(/Todavía no/)); chk('leer bien', await clic(0, 0), txt(/Correcto/));
  await chip('f10_leer', '[data-sel]', 1); chk('leer gráfica B: 3.ª pregunta', await clic(2, 0), txt(/Correcto/));
  // ---------- f10_dcl: marcar las fuerzas correctas y comprobar
  await ir('f10_dcl');
  const fz = async i => { await W('f10_dcl').locator('[data-fz] .chip-btn').nth(i).click(); await p.waitForTimeout(30); };
  await fz(0); await fz(1); await W('f10_dcl').locator('[data-chk]').click(); await p.waitForTimeout(60);
  chk('dcl libro: acierto', await W('f10_dcl').locator('.w-pie').innerText(), txt(/Perfecto/)); chk('dcl libro: todas verdes', await W('f10_dcl').locator('[data-fz] .chip-btn.bien').count(), 4);
  await W('f10_dcl').locator('[data-chk]').click(); await p.waitForTimeout(30); await fz(0); await fz(3); await W('f10_dcl').locator('[data-chk]').click(); await p.waitForTimeout(60);
  chk('dcl libro: fallo (inercia en vez de normal)', await W('f10_dcl').locator('.w-pie').innerText(), txt(/Casi/)); chk('dcl libro: dos fuerzas mal marcadas', await W('f10_dcl').locator('[data-fz] .chip-btn.mal').count(), 2);
  await W('f10_dcl').locator('[data-sel] .chip-btn').nth(3).click(); await p.waitForTimeout(60); chk('dcl cambia de situación', await W('f10_dcl').locator('[data-fz] .chip-btn').count(), 4);
  // ---------- global
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); chk('sin desborde horizontal', ov, v => v <= 1);
  const ovw = await p.evaluate(() => [...document.querySelectorAll('#detail-t10 .w[data-w^=f10_]')].filter(e => e.scrollWidth > e.clientWidth + 1).map(e => e.getAttribute('data-w'))); chk('ningún simulador desborda su tarjeta', ovw, v => v.length === 0);
  if (oscuro) chk('modo oscuro activo', await esOscuro(p), true);
  const { total, malos } = await contraste(p, '#detail-t10', 3); console.log('contraste (' + (oscuro ? 'modo oscuro' : 'modo claro') + '): ' + total + ' textos medidos, ' + malos.length + ' por debajo de 3:1', malos.slice(0, 8)); chk('contraste del texto ≥ 3:1', malos.length, v => v === 0);
  console.log(mal ? mal + ' FALLOS de ' + n : n + ' comprobaciones de comportamiento de dinámica correctas', '· errores JS:', errs.length ? errs : 'ninguno', movil ? '· móvil' : '', oscuro ? '· oscuro' : '');
  await b.close();
})();
