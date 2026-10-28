// Pulsa los controles de TODOS los widgets de Química II · tema 7 y comprueba las lecturas de los 6 simuladores nuevos (q7_*)
// contra cifras calculadas aparte (herramientas/verificar_quimica2_t7.py). Uso: node herramientas/pruebas/e2e_quimica2_t7.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'quimica2', 't7');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t7 [data-w=${nm}]`).first();
  const chip = async (nm, txt) => { await W(nm).locator('.chip-btn', { hasText: txt }).first().click(); await p.waitForTimeout(80); };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(80); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? esp.toString() : JSON.stringify(esp)); } };
  const ok = (nm, cond, info) => chk(nm, !!cond, true) || (cond ? 0 : console.log('   ', String(info).slice(0, 260)));
  const txt = async nm => (await W(nm).innerText()).replace(/\s+/g, ' ');

  // ---- barrido genérico: todos los chips y deslizadores de los 6 widgets ----
  const nombres = await p.locator('#detail-t7 [data-w]').evaluateAll(es => [...new Set(es.map(e => e.getAttribute('data-w')))]);
  for (const x of ['q7_escala', 'q7_calc', 'q7_distrib', 'q7_sal', 'q7_regul', 'q7_valora']) ok('presente ' + x, nombres.includes(x), nombres.join());
  for (const nm of nombres.filter(x => /^q7_/.test(x))) {
    const w = W(nm); await w.scrollIntoViewIfNeeded();
    const nc = await w.locator('.chip-btn:not([disabled])').count();
    for (let i = 0; i < nc; i++) { try { await w.locator('.chip-btn:not([disabled])').nth(i).click({ timeout: 2000 }); } catch (e) { chk(nm + ' chip ' + i + ' pulsable', e.message.slice(0, 60), ''); } }
    const nr = await w.locator('input[type=range]').count();
    for (let i = 0; i < nr; i++) for (const f of [0, 1, 0.5]) await w.locator('input[type=range]').nth(i).evaluate((e, f) => { e.value = +e.min + f * (+e.max - +e.min); e.dispatchEvent(new Event('input', { bubbles: true })); }, f);
    await p.waitForTimeout(60);
    chk(nm + ' sin error tras pulsar todo', await w.locator('.w-error').count(), 0);
    chk(nm + ' no vacío', (await w.innerText()).length > 40, true);
  }

  // ---- q7_escala ----
  const E = 'q7_escala'; await W(E).scrollIntoViewIfNeeded();
  await chip(E, 'Sangre'); let t = await txt(E);
  ok('escala: sangre pH 7,4 → [H⁺] 3,98·10⁻⁸ y [OH⁻] 2,51·10⁻⁷', /3,98·10⁻⁸/.test(t) && /2,51·10⁻⁷/.test(t) && /6,6/.test(t), t.slice(0, 400));
  chk('escala: lectura de carácter básico', /básica/.test(t), true);
  await chip(E, 'Lejía'); t = await txt(E); ok('escala: lejía 12,5 → [OH⁻] 3,16·10⁻²', /3,16·10⁻²/.test(t) && /3,16·10⁻¹³/.test(t), t.slice(0, 300));
  await chip(E, 'Agua pura'); t = await txt(E); ok('escala: agua pura neutra', /neutra/.test(t) && /\[H⁺\] 1·10⁻⁷/.test(t) && /\[OH⁻\] 1·10⁻⁷/.test(t), t.slice(0, 300));
  chk('escala: dos puntos dibujados', await W(E).locator('circle.p-punto').count(), 2);
  await range(E, 0, 3); t = await txt(E); ok('escala: pH 3 → [H⁺] 1·10⁻³ (0,001) y ácida', /ácida/.test(t) && /\[H⁺\] 1·10⁻³/.test(t), t.slice(0, 300));

  // ---- q7_calc ----
  const C = 'q7_calc'; await W(C).scrollIntoViewIfNeeded();
  await chip(C, 'Ácido fuerte'); await range(C, 0, -1); t = await txt(C);
  ok('calc: ácido fuerte 0,1 mol/L → pH 1', /pH 1,00 /.test(t), t.slice(0, 200));
  await chip(C, 'Ácido débil'); await chip(C, 'CH₃COOH'); await range(C, 0, -1); t = await txt(C);
  ok('calc: acético 0,1 → aprox 2,87, exacto 2,88, α 1,3 %', /pH \(exacto\) 2,88/.test(t) && /pH aproximado 2,87/.test(t) && /1,34 %/.test(t) && /sí, α < 5 %/.test(t.replace('&lt;', '<')), t.slice(0, 500));
  ok('calc: pasos visibles con tabla ICE', /Tabla/.test(t) && /x² \/ \(c − x\)/.test(t), t.slice(0, 300));
  await chip(C, 'HF'); t = await txt(C);
  ok('calc: HF 0,1 → exacto 2,10, aprox 2,08 y la aproximación NO vale', /pH \(exacto\) 2,10/.test(t) && /pH aproximado 2,08/.test(t) && /no, α ≥ 5 %/.test(t) && /resolver|segundo grado|ecuación/i.test(t), t.slice(0, 500));
  ok('calc: HF α exacto 7,91 %', /7,91 %/.test(t), t.slice(0, 500));
  await chip(C, 'Base débil'); await chip(C, 'NH₃'); await range(C, 0, -0.69897); t = await txt(C);
  ok('calc: NH₃ 0,2 → pH 11,28 y α 0,95 %', /pH \(exacto\) 11,28/.test(t) && /0,95 %/.test(t), t.slice(0, 400));
  await chip(C, 'Gráfico: α'); chk('calc: gráfico α con punto', await W(C).locator('circle.p-punto').count(), 1); await chip(C, 'Gráfico: pH');
  await chip(C, 'Base fuerte'); await range(C, 0, -2); t = await txt(C); ok('calc: base fuerte 0,01 → pH 12', /pH 12,00 /.test(t), t.slice(0, 200));
  await chip(C, 'Ácido fuerte'); await range(C, 0, -3.5); t = await txt(C); ok('calc: ácido fuerte muy diluido avisa del agua', /agua/.test(t) || /3,16·10⁻⁴/.test(t), t.slice(0, 300));
  await chip(C, 'Ácido débil'); await chip(C, 'CH₃COOH'); await range(C, 0, -3); t = await txt(C);
  ok('calc: acético 0,001 → α 12,5 %, la aproximación no vale', /12,5/.test(t) && /no, α ≥ 5 %/.test(t) && /pH \(exacto\) 3,90/.test(t), t.slice(0, 500));
  await range(C, 1, 4.0); t = await txt(C); ok('calc: el deslizador pK cambia la lectura (pK 4,00 → K 1,0·10⁻⁴)', /1·10⁻⁴/.test(t), t.slice(0, 400));

  // ---- q7_distrib ----
  const D = 'q7_distrib'; await W(D).scrollIntoViewIfNeeded();
  await chip(D, 'CH₃COOH'); await range(D, 0, 4.75); t = await txt(D);
  ok('distrib: acético a pH 4,75 ≈ 50 %/50 %', /CH₃COOH 50,\d %|CH₃COOH 49,\d %/.test(t) && /CH₃COO⁻ 50,\d %|CH₃COO⁻ 49,\d %/.test(t), t.slice(0, 300));
  await range(D, 0, 3.75); t = await txt(D); ok('distrib: pH una unidad por debajo domina el ácido (91 %)', /CH₃COOH 90,\d %|CH₃COOH 91,\d %/.test(t) && /Predomina CH₃COOH/.test(t), t.slice(0, 300));
  await range(D, 0, 5.75); t = await txt(D); ok('distrib: pH una unidad por encima domina la base (91 %)', /Predomina CH₃COO⁻/.test(t), t.slice(0, 300));
  await chip(D, 'H₂CO₃'); chk('distrib: H₂CO₃ dibuja 3 curvas', await W(D).locator('path.p-curva').count(), 3);
  await range(D, 0, 8.3); t = await txt(D); ok('distrib: pH 8,3 → HCO₃⁻ domina casi al 100 %', /Predomina HCO₃⁻/.test(t) && /HCO₃⁻ 9\d(,\d)? %/.test(t), t.slice(0, 300));
  await chip(D, 'NH₄⁺'); await range(D, 0, 9.25); t = await txt(D); ok('distrib: NH₄⁺ en pH 9,25 → 50 %', /NH₄⁺ 5\d,\d %/.test(t), t.slice(0, 300));

  // ---- q7_sal ----
  const S = 'q7_sal'; await W(S).scrollIntoViewIfNeeded();
  await chip(S, 'CH₃COONa'); await range(S, 0, -1); t = await txt(S);
  ok('sal: CH₃COONa 0,1 → pH 8,87 básica, K_b 5,56·10⁻¹⁰', /pH \(exacto\) 8,87/.test(t) && /básica/.test(t) && /5,56·10⁻¹⁰/.test(t), t.slice(0, 400));
  await chip(S, 'NH₄Cl'); t = await txt(S); ok('sal: NH₄Cl 0,1 → pH 5,13 ácida', /pH \(exacto\) 5,13/.test(t) && /ácida/.test(t), t.slice(0, 300));
  await chip(S, 'NaCl'); t = await txt(S); ok('sal: NaCl → 7,00 neutra y «nada se hidroliza»', /pH \(exacto\) 7/.test(t) && /neutra/.test(t) && /Ningún ion/.test(t), t.slice(0, 300));
  await chip(S, 'NaCN'); await range(S, 0, -1.30103); t = await txt(S); ok('sal: NaCN 0,05 → pH 11,00', /pH \(exacto\) 11/.test(t), t.slice(0, 300));
  await chip(S, 'NaF'); await range(S, 0, -0.30103); t = await txt(S); ok('sal: NaF 0,5 → pH 8,43', /pH \(exacto\) 8,43/.test(t), t.slice(0, 300));
  await chip(S, 'CH₃COONH₄'); t = await txt(S); ok('sal: CH₃COONH₄ → pH 7,00 (los dos se hidrolizan por igual)', /pH \(exacto\) 7/.test(t) && /los dos|dos/.test(t), t.slice(0, 400));
  await chip(S, 'NH₄CN'); t = await txt(S); ok('sal: NH₄CN → pH 9,28 y gana la base', /pH \(exacto\) 9,28/.test(t) && /Gana la base/.test(t), t.slice(0, 400));

  // ---- q7_regul ----
  const R = 'q7_regul'; await W(R).scrollIntoViewIfNeeded();
  await chip(R, 'CH₃COOH / CH₃COO⁻'); await range(R, 0, -0.69897); await range(R, 1, 0); await range(R, 2, 0); t = await txt(R);
  ok('regul: 10 + 10 mmol → pH inicial 4,74/4,75 y Henderson–Hasselbalch 4,74', /pH inicial \(exacto\) 4,7[45]/.test(t) && /Henderson–Hasselbalch 4,74/.test(t), t.slice(0, 500));
  await range(R, 2, -1); t = await txt(R);
  ok('regul: +1 mmol de HCl → tampón 4,66 frente a agua 2,00', /pH tras añadir \(exacto\) 4,6[56]/.test(t) && /Agua pura tras añadir lo mismo 2,00/.test(t) && /Henderson–Hasselbalch 4,66/.test(t), t.slice(0, 600));
  await range(R, 2, 20); t = await txt(R); ok('regul: 20 mmol de NaOH agotan un tampón de 10 + 10 mmol', /agotado/.test(t), t.slice(0, 500));
  await range(R, 2, 0); await range(R, 1, -0.30103); t = await txt(R); ok('regul: base/ácido 0,5 → pH 4,44 (HH)', /pH inicial \(exacto\) 4,4[345]/.test(t), t.slice(0, 400));
  await range(R, 1, 0); await chip(R, 'NH₄⁺ / NH₃'); t = await txt(R); ok('regul: NH₄⁺/NH₃ 1:1 → pH 9,26', /pH inicial \(exacto\) 9,2[56]/.test(t), t.slice(0, 400));
  chk('regul: dos curvas', await W(R).locator('path.p-curva').count(), 2);

  // ---- q7_valora ----
  const V = 'q7_valora'; await W(V).scrollIntoViewIfNeeded();
  await chip(V, 'HCl con NaOH'); await chip(V, 'Azul de bromotimol'); await range(V, 0, 0.1); await range(V, 1, 0.1); await range(V, 2, 1); t = await txt(V);
  ok('valora: HCl/NaOH → Veq 25 mL, pH 7 en la equivalencia y azul de bromotimol ideal', /Volumen de equivalencia 25 mL/.test(t) && /pH en la equivalencia 7/.test(t) && /Ideal/.test(t), t.slice(0, 600));
  await range(V, 2, 0.5); t = await txt(V); ok('valora: a 12,5 mL, pH 1,48', /12,5 mL · 1,48/.test(t) && /sin neutralizar/.test(t), t.slice(0, 500));
  await range(V, 2, 1.2); t = await txt(V); ok('valora: a 30 mL, pH 11,96 y exceso de NaOH', /30 mL · 11,96/.test(t) && /exceso de NaOH/.test(t), t.slice(0, 500));
  await chip(V, 'Fenolftaleína'); t = await txt(V); ok('valora: fenolftaleína en fuerte-fuerte «sirve» pero no es ideal', /Sirve/.test(t), t.slice(0, 600));
  await chip(V, 'Naranja de metilo'); t = await txt(V); ok('valora: naranja de metilo en fuerte-fuerte no sirve', /No sirve/.test(t), t.slice(0, 600));
  await chip(V, 'CH₃COOH con NaOH'); await chip(V, 'Fenolftaleína'); await range(V, 2, 1); t = await txt(V);
  ok('valora: ácido acético → pH de equivalencia 8,72 y fenolftaleína ideal', /pH en la equivalencia 8,72/.test(t) && /Ideal/.test(t) && /solo la sal/.test(t), t.slice(0, 600));
  await range(V, 2, 0.5); t = await txt(V); ok('valora: semiequivalencia del acético: pH = pK = 4,74 y mezcla reguladora', /12,5 mL · 4,7[45]/.test(t) && /reguladora/.test(t), t.slice(0, 500));
  await chip(V, 'Rojo de metilo'); t = await txt(V); ok('valora: rojo de metilo en ácido débil no sirve', /No sirve/.test(t), t.slice(0, 600));
  await chip(V, 'NH₃ con HCl'); await chip(V, 'Rojo de metilo'); await range(V, 2, 1); t = await txt(V);
  ok('valora: NH₃ con HCl → pH de equivalencia 5,28 y rojo de metilo ideal', /pH en la equivalencia 5,28/.test(t) && /Ideal/.test(t), t.slice(0, 600));
  await chip(V, 'Fenolftaleína'); t = await txt(V); ok('valora: fenolftaleína en NH₃/HCl no sirve', /No sirve/.test(t), t.slice(0, 600));
  await chip(V, 'NaOH con HCl'); await range(V, 2, 1); t = await txt(V); ok('valora: NaOH con HCl → 7', /pH en la equivalencia 7/.test(t), t.slice(0, 300));
  await chip(V, 'HCl con NaOH'); await range(V, 0, 0.2); await range(V, 1, 0.1); await range(V, 2, 1); t = await txt(V);
  ok('valora: C·V = C·V con 0,20 y 0,10 → 50 mL', /Volumen de equivalencia 50 mL/.test(t), t.slice(0, 300));
  chk('valora: curva y puntos dibujados', await W(V).locator('path.p-curva').count() >= 1 && await W(V).locator('circle.p-punto').count() >= 2, true);

  const dist = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  chk('sin desborde horizontal', dist <= 1, true);
  chk('sin errores JS', errs.join(' | '), '');
  console.log(mal ? `x ${mal} fallos de ${n}` : `ok ${n} comprobaciones, todo bien`);
  await b.close(); process.exit(mal ? 1 : 0);
})();
