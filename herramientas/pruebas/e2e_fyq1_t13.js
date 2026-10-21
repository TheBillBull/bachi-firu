// Comportamiento de los simuladores de fyq1 t13 (movimiento armónico simple):
//   node herramientas/pruebas/e2e_fyq1_t13.js [movil] [oscuro]
// Los valores esperados se calculan aquí con Math (sin usar el código de la web).
const { lanzar, abrirTema } = require('./e2e_common.js');
const { contraste, esOscuro } = require('./e2e_fyq1_comun.js');
(async () => {
  const movil = process.argv.includes('movil'), oscuro = process.argv.includes('oscuro');
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 }, scheme: oscuro ? 'dark' : 'light' });
  await abrirTema(p, 'fyq1', 't13');
  let mal = 0, n = 0;
  const g = 9.8, R = Math.PI / 180, TAU = 2 * Math.PI;
  const W = nm => p.locator(`#detail-t13 [data-w=${nm}]`).first();
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
  const agm = (a, b_) => { for (let i = 0; i < 40; i++) { const t = (a + b_) / 2; b_ = Math.sqrt(a * b_); a = t; } return a; };
  const Tp = (l, gg, th) => 2 * Math.PI * Math.sqrt(l / gg) / agm(1, Math.cos(th * R / 2));

  // ---------- f13_mas: sliders A, k, m, φ₀, t (por defecto A = 0,3 m, k = 40 N/m, m = 1 kg)
  await ir('f13_mas');
  { const w = Math.sqrt(40); chk('mas: ω = √(k/m)', await lec('f13_mas', 'Frecuencia angular'), casi(w)); chk('mas: T = 2π/ω', await lec('f13_mas', 'Periodo'), casi(TAU / w)); chk('mas: f = 1/T', await lec('f13_mas', 'Frecuencia  f'), casi(w / TAU));
    chk('mas: v máx = Aω', await lec('f13_mas', 'Velocidad máxima'), casi(0.3 * w)); chk('mas: a máx = Aω²', await lec('f13_mas', 'Aceleración máxima'), casi(0.3 * 40)); chk('mas: F máx = kA', await lec('f13_mas', 'Fuerza máxima'), casi(12));
    chk('mas: x(0) = A', await lec('f13_mas', 'Elongación'), casi(0.3)); chk('mas: v(0) = 0', await lec('f13_mas', 'Velocidad v'), t => Math.abs(num(t)) < 1e-6); chk('mas: a(0) = −ω²A', await lec('f13_mas', 'Aceleración a'), casi(-12)); }
  await range('f13_mas', 1, 100); await range('f13_mas', 0, 0.2); chk('mas k = 100: ω = 10', await lec('f13_mas', 'Frecuencia angular'), casi(10)); chk('mas: v máx = 2', await lec('f13_mas', 'Velocidad máxima'), casi(2)); chk('mas: a máx = 20', await lec('f13_mas', 'Aceleración máxima'), casi(20));
  await range('f13_mas', 0, 0.5); chk('mas: el periodo no depende de A', await lec('f13_mas', 'Periodo'), casi(TAU / 10));
  await range('f13_mas', 2, 4); chk('mas: m × 4 → T × 2', await lec('f13_mas', 'Periodo'), casi(TAU / 5));
  await range('f13_mas', 2, 1); await range('f13_mas', 3, 90); chk('mas φ₀ = 90°: x(0) = 0', await lec('f13_mas', 'Elongación'), t => Math.abs(num(t)) < 1e-3); chk('mas φ₀ = 90°: v(0) = −Aω', await lec('f13_mas', 'Velocidad v'), casi(-0.5 * 10));
  await range('f13_mas', 3, 0); await range('f13_mas', 4, TAU / 10 / 4); chk('mas en t = T/4: x = 0', await lec('f13_mas', 'Elongación'), t => Math.abs(num(t)) < 0.01); chk('mas en t = T/4: v = −Aω', await lec('f13_mas', 'Velocidad v'), casi(-5, 0.02));
  // ---------- f13_fase: sliders A, ω, φ₀ (por defecto 2 m, 2 rad/s, 0°)
  await ir('f13_fase');
  chk('fase: T = 2π/ω', await lec('f13_fase', 'Periodo'), casi(Math.PI)); chk('fase: f = ω/2π', await lec('f13_fase', 'Frecuencia'), casi(1 / Math.PI)); chk('fase: x(0) = A', await lec('f13_fase', 'Elongación inicial'), casi(2)); chk('fase: parte del reposo', await lec('f13_fase', 'Velocidad inicial'), txt(/parte del reposo/));
  await chip('f13_fase', '[data-pre]', 1); chk('fase −90°: x(0) = 0', await lec('f13_fase', 'Elongación inicial'), t => Math.abs(num(t)) < 1e-3); chk('fase −90°: v(0) = +Aω hacia +', await lec('f13_fase', 'Velocidad inicial'), t => casi(4)(t) && /hacia \+/.test(t)); chk('fase −90°: primer máximo en T/4', await lec('f13_fase', 'Primer máximo'), casi(Math.PI / 4));
  await chip('f13_fase', '[data-pre]', 3); chk('fase 180°: x(0) = −A', await lec('f13_fase', 'Elongación inicial'), casi(-2)); chk('fase 180°: forma seno', await lec('f13_fase', 'En forma seno'), txt(/270°/));
  await range('f13_fase', 1, 4); await range('f13_fase', 0, 1); await range('f13_fase', 2, 60); chk('fase general: x(0) = A cos φ₀', await lec('f13_fase', 'Elongación inicial'), casi(0.5)); chk('fase general: v(0) = −Aω sen φ₀', await lec('f13_fase', 'Velocidad inicial'), casi(-4 * Math.sin(60 * R)));
  // ---------- f13_fasor: sliders A, ω, θ (por defecto 0,5 m, 4 rad/s; θ = 0 tras reiniciar)
  await ir('f13_fasor');
  chk('fasor θ = 0: x = A', await lec('f13_fasor', 'Elongación'), casi(0.5)); chk('fasor θ = 0: a = −Aω²', await lec('f13_fasor', 'Aceleración'), casi(-8));
  await range('f13_fasor', 2, 90); chk('fasor θ = 90°: x = 0', await lec('f13_fasor', 'Elongación'), t => Math.abs(num(t)) < 1e-3); chk('fasor θ = 90°: v = −Aω', await lec('f13_fasor', 'Velocidad'), casi(-2)); chk('fasor θ = 90°: a = 0', await lec('f13_fasor', 'Aceleración'), t => Math.abs(num(t)) < 1e-3);
  await range('f13_fasor', 2, 180); chk('fasor θ = 180°: a = +Aω²', await lec('f13_fasor', 'Aceleración'), casi(8)); chk('fasor: a = −ω²x', await lec('f13_fasor', 'Relación'), casi(16 * 0.5));
  await range('f13_fasor', 2, 30); { const x = 0.5 * Math.cos(30 * R); chk('fasor θ = 30°: |v| = ω√(A² − x²)', await lec('f13_fasor', 'Con x'), casi(4 * Math.sqrt(0.25 - x * x))); }
  // ---------- f13_energia: sliders A, k, m, t/T (por defecto 0,2 m, 50 N/m, 0,5 kg)
  await ir('f13_energia');
  chk('energía: E_m = ½kA²', await lec('f13_energia', 'Energía mecánica'), casi(1)); chk('energía en el extremo: E_p = E_m', await lec('f13_energia', 'Energía potencial'), t => casi(1)(t) && /100 %/.test(t)); chk('energía en el extremo: E_c = 0', await lec('f13_energia', 'Energía cinética'), t => Math.abs(num(t)) < 1e-3);
  await chip('f13_energia', '[data-pre]', 2); chk('energía: E_c = E_p', await lec('f13_energia', 'Energía cinética'), t => casi(0.5, 0.02)(t) && /50 %/.test(t)); chk('energía E_c = E_p: x = A/√2', await lec('f13_energia', 'Elongación'), casi(0.2 / Math.SQRT2, 0.02));
  await chip('f13_energia', '[data-pre]', 0); chk('energía en el centro: E_c = E_m', await lec('f13_energia', 'Energía cinética'), t => casi(1, 0.02)(t) && /100 %/.test(t)); chk('energía en el centro: v = √(2E_m/m)', await lec('f13_energia', 'Velocidad'), casi(Math.sqrt(2 * 1 / 0.5), 0.01));
  await range('f13_energia', 0, 0.4); chk('energía: A × 2 → E_m × 4', await lec('f13_energia', 'Energía mecánica'), casi(4)); chk('energía: suma constante', await lec('f13_energia', 'Comprobación'), t => /4 J/.test(t));
  await chip('f13_energia', '[data-pre]', 1); chk('energía en x = A/2: E_p = ¼E_m', await lec('f13_energia', 'Energía potencial'), t => /25 %/.test(t));
  // ---------- f13_hooke: sliders m (por defecto muelle medio k = 50 N/m, m = 0,5 kg)
  await ir('f13_hooke');
  chk('hooke: F = mg', await lec('f13_hooke', 'Fuerza'), casi(0.5 * g)); chk('hooke: x = F/k', await lec('f13_hooke', 'Alargamiento medido'), casi(0.5 * g / 50 * 100)); chk('hooke: F/x = k', await lec('f13_hooke', 'Cociente'), casi(50));
  for (const m of [0.25, 0.5, 0.75, 1.0]) { await range('f13_hooke', 0, m); await W('f13_hooke').locator('[data-bt] .chip-btn').nth(0).click(); await p.waitForTimeout(40); }
  chk('hooke: 4 medidas anotadas', await lec('f13_hooke', 'Medidas anotadas'), txt(/^4 /)); chk('hooke: k estimada ≈ 50 N/m (±10 %)', await lec('f13_hooke', 'k estimada'), casi(50, 0.1));
  await W('f13_hooke').locator('[data-bt] .chip-btn').nth(1).click(); await p.waitForTimeout(40); chk('hooke: borrar medidas', await lec('f13_hooke', 'Medidas anotadas'), txt(/^0 /));
  await chip('f13_hooke', '[data-mu]', 0); await range('f13_hooke', 0, 1.5); chk('hooke: muelle blando con masa grande → límite elástico', await lec('f13_hooke', '¡Cuidado'), txt(/límite elástico/));
  await chip('f13_hooke', '[data-mu]', 2); await range('f13_hooke', 0, 1); chk('hooke muelle duro: x = F/k', await lec('f13_hooke', 'Alargamiento medido'), casi(g / 120 * 100));
  // ---------- f13_vertical: sliders k, m, A, t (por defecto 40 N/m, 1 kg, 0,1 m, Tierra)
  await ir('f13_vertical');
  chk('vertical: Δℓ = mg/k', await lec('f13_vertical', 'Alargamiento en el equilibrio'), casi(g / 40 * 100)); chk('vertical: T = 2π√(m/k)', await lec('f13_vertical', 'Periodo'), casi(TAU / Math.sqrt(40)));
  await chip('f13_vertical', '[data-pre]', 2); chk('vertical Luna: Δℓ menor', await lec('f13_vertical', 'Alargamiento en el equilibrio'), casi(1.62 / 40 * 100, 0.02)); chk('vertical Luna: T no cambia', await lec('f13_vertical', 'Periodo'), casi(TAU / Math.sqrt(40)));
  await chip('f13_vertical', '[data-pre]', 3); chk('vertical Júpiter: Δℓ mayor', await lec('f13_vertical', 'Alargamiento en el equilibrio'), casi(24.8 / 40 * 100, 0.01)); chk('vertical Júpiter: T no cambia', await lec('f13_vertical', 'Periodo'), casi(TAU / Math.sqrt(40)));
  await range('f13_vertical', 1, 2); chk('vertical: m × 2 → Δℓ × 2', await lec('f13_vertical', 'Alargamiento en el equilibrio'), casi(2 * 24.8 / 40 * 100, 0.01)); chk('vertical: fuerza máxima k(Δℓ + A)', await lec('f13_vertical', 'Fuerza máxima'), casi(40 * (2 * 24.8 / 40 + 0.1), 0.01));
  // ---------- f13_pendulo: sliders l, θ₀, t (por defecto 1 m, 10°, Tierra)
  await ir('f13_pendulo');
  chk('péndulo: T₀ = 2π√(l/g)', await lec('f13_pendulo', 'Periodo del MAS'), casi(TAU * Math.sqrt(1 / g))); chk('péndulo: T real (10°)', await lec('f13_pendulo', 'Periodo real'), casi(Tp(1, g, 10), 0.002));
  await range('f13_pendulo', 1, 60); chk('péndulo 60°: T real', await lec('f13_pendulo', 'Periodo real'), casi(Tp(1, g, 60), 0.002)); chk('péndulo 60°: diferencia ≈ 7,3 %', await lec('f13_pendulo', 'Diferencia'), casi(7.32, 0.02));
  await range('f13_pendulo', 1, 5); await chip('f13_pendulo', '[data-pre]', 2); chk('péndulo en la Luna', await lec('f13_pendulo', 'Periodo del MAS'), casi(TAU * Math.sqrt(1 / 1.62)));
  await chip('f13_pendulo', '[data-pre]', 0); await range('f13_pendulo', 0, 4); chk('péndulo: l × 4 → T × 2', await lec('f13_pendulo', 'Periodo del MAS'), casi(2 * TAU * Math.sqrt(1 / g)));
  // ---------- f13_asociacion: sliders k₁, k₂, m (por defecto serie, 40 y 60 N/m, 1 kg)
  await ir('f13_asociacion');
  chk('serie: k = k₁k₂/(k₁ + k₂)', await lec('f13_asociacion', 'Constante equivalente'), casi(24)); chk('serie: T', await lec('f13_asociacion', 'Periodo'), casi(TAU / Math.sqrt(24))); chk('serie: x₁ + x₂', await lec('f13_asociacion', 'Alargamiento total'), casi(g / 24 * 100));
  await chip('f13_asociacion', '[data-modo]', 1); chk('paralelo: k = k₁ + k₂', await lec('f13_asociacion', 'Constante equivalente'), casi(100)); chk('paralelo: F₁ + F₂ = mg', await lec('f13_asociacion', 'Comprobación'), t => casi(g)(t)); chk('paralelo: T', await lec('f13_asociacion', 'Periodo'), casi(TAU / 10));
  await range('f13_asociacion', 0, 100); await range('f13_asociacion', 1, 100); chk('paralelo: dos iguales → 2k', await lec('f13_asociacion', 'Constante equivalente'), casi(200));
  await chip('f13_asociacion', '[data-modo]', 0); chk('serie: dos iguales → k/2', await lec('f13_asociacion', 'Constante equivalente'), casi(50));
  // ---------- f13_amortiguado: sliders ω₀, γ (por defecto 6 rad/s y 0,4 s⁻¹)
  await ir('f13_amortiguado');
  chk('amortiguado: ω_d', await lec('f13_amortiguado', 'Frecuencia amortiguada'), casi(Math.sqrt(36 - 0.16))); chk('amortiguado: 1/γ', await lec('f13_amortiguado', 'La amplitud cae'), casi(2.5)); chk('amortiguado: Q', await lec('f13_amortiguado', 'Factor de calidad'), casi(7.5));
  chk('amortiguado: régimen subamortiguado', await lec('f13_amortiguado', 'Régimen'), txt(/subamortiguado/));
  await chip('f13_amortiguado', '[data-pre]', 3); chk('amortiguado crítico', await lec('f13_amortiguado', 'Régimen'), txt(/crítico/)); await chip('f13_amortiguado', '[data-pre]', 4); chk('amortiguado sobreamortiguado', await lec('f13_amortiguado', 'Régimen'), txt(/sobreamortiguado/));
  await chip('f13_amortiguado', '[data-pre]', 0); chk('sin amortiguar: MAS', await lec('f13_amortiguado', 'Régimen'), txt(/MAS/));
  // ---------- f13_resonancia: sliders ω, γ (por defecto 9,8 rad/s y 1 s⁻¹; ω₀ = 10)
  await ir('f13_resonancia');
  { const r = 100 / Math.sqrt(Math.pow(100 - 9.8 * 9.8, 2) + Math.pow(2 * 9.8, 2)); chk('resonancia: A/A₀', await lec('f13_resonancia', 'Amplitud relativa'), casi(r)); chk('resonancia: retraso δ', await lec('f13_resonancia', 'Retraso'), casi(Math.atan2(2 * 9.8, 100 - 96.04) / R, 0.01)); }
  chk('resonancia: ω_res = √(ω₀² − 2γ²)', await lec('f13_resonancia', 'Máximo de la curva'), casi(Math.sqrt(98))); chk('resonancia: Q = 5', await lec('f13_resonancia', 'Factor de calidad'), casi(5));
  chk('resonancia: aviso', await lec('f13_resonancia', 'Situación'), txt(/resonancia/));
  await chip('f13_resonancia', '[data-pre]', 0); chk('resonancia baja frecuencia: A/A₀ ≈ 1,1', await lec('f13_resonancia', 'Amplitud relativa'), casi(100 / Math.sqrt(91 * 91 + 36), 0.01));
  await chip('f13_resonancia', '[data-pre]', 2); chk('resonancia alta frecuencia: A/A₀ < 1', await lec('f13_resonancia', 'Amplitud relativa'), casi(100 / Math.sqrt(224 * 224 + 36 * 36), 0.01));
  await chip('f13_resonancia', '[data-pre]', 4); chk('resonancia sin amortiguar: pico alto', await lec('f13_resonancia', 'Amplitud relativa'), t => num(t) > 20);
  // ---------- f13_leer: acierto y fallo
  await ir('f13_leer');
  const clic = async (i, j) => { await W('f13_leer').locator('.lg-p').nth(i).locator('.chip-btn').nth(j).click(); await p.waitForTimeout(40); return W('f13_leer').locator('.lg-p').nth(i).locator('.lg-r').innerText(); };
  chk('leer mal', await clic(0, 1), txt(/Todavía no/)); chk('leer bien', await clic(0, 0), txt(/Correcto/));
  await chip('f13_leer', '[data-sel]', 2); chk('leer gráfica C: 4.ª pregunta', await clic(3, 0), txt(/Correcto/));
  // ---------- global
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); chk('sin desborde horizontal', ov, v => v <= 1);
  const ovw = await p.evaluate(() => [...document.querySelectorAll('#detail-t13 .w[data-w^=f13_]')].filter(e => e.scrollWidth > e.clientWidth + 1).map(e => e.getAttribute('data-w'))); chk('ningún simulador desborda su tarjeta', ovw, v => v.length === 0);
  if (oscuro) chk('modo oscuro activo', await esOscuro(p), true);
  const { total, malos } = await contraste(p, '#detail-t13', 3); console.log('contraste (' + (oscuro ? 'modo oscuro' : 'modo claro') + '): ' + total + ' textos medidos, ' + malos.length + ' por debajo de 3:1', malos.slice(0, 8)); chk('contraste del texto ≥ 3:1', malos.length, v => v === 0);
  console.log(mal ? mal + ' FALLOS de ' + n : n + ' comprobaciones de comportamiento del MAS correctas', '· errores JS:', errs.length ? errs : 'ninguno', movil ? '· móvil' : '', oscuro ? '· oscuro' : '');
  await b.close();
})();
