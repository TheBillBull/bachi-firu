// Comportamiento de los simuladores de FyQ I · tema 1 (átomo). Uso: node herramientas/pruebas/e2e_atomo.js [movil]
// Cada comprobación actúa sobre el widget como lo haría una persona (fichas, deslizadores, clic en la tabla) y compara la lectura con valores
// calculados aparte (tabla periódica, constantes de Bohr, semividas…).
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'fyq1', 't1');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t1 [data-w=${nm}]`).first();
  const lec = async (nm, rot) => W(nm).locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chip = async (nm, sel, i) => { await W(nm).locator(sel + ' .chip-btn').nth(i).click(); await p.waitForTimeout(80); };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(60); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const ver = async nm => { await W(nm).scrollIntoViewIfNeeded(); };

  // ---- tabla periódica ----
  await ver('q1_tabla');
  chk('tabla: 54 elementos en periodos 1-5', await W('q1_tabla').locator('.q1-el').count(), 54);
  chk('tabla: Na por defecto', await lec('q1_tabla', 'Elemento'), 'Sodio (Na)');
  chk('tabla: Na periodo·grupo', await lec('q1_tabla', 'Periodo'), '3 · 1');
  await W('q1_tabla').locator('.q1-el[data-z="17"]').click();
  chk('tabla: Cl nombre', await lec('q1_tabla', 'Elemento'), 'Cloro (Cl)'); chk('tabla: Cl grupo', await lec('q1_tabla', 'Periodo'), '3 · 17'); chk('tabla: Cl valencia 7', await lec('q1_tabla', 'Electrones de valencia'), '7');
  chk('tabla: Cl electronegatividad', await lec('q1_tabla', 'Electronegatividad'), '3,16');
  await W('q1_tabla').locator('.q1-el[data-z="26"]').click();
  chk('tabla: Fe periodo·grupo', await lec('q1_tabla', 'Periodo'), '4 · 8'); chk('tabla: Fe Z y masa', await lec('q1_tabla', 'Z ·'), t => /^26 · 55,845 u$/.test(t));
  chk('tabla: Fe tipo', await lec('q1_tabla', 'Tipo'), t => /bloque d$/.test(t));
  const fondo0 = await W('q1_tabla').locator('.q1-el[data-z="3"]').evaluate(e => e.style.background);
  await chip('q1_tabla', '[data-modo]', 3);
  const fondo1 = await W('q1_tabla').locator('.q1-el[data-z="3"]').evaluate(e => e.style.background);
  chk('tabla: cambiar de modo recolorea', fondo0 !== fondo1, true);
  chk('tabla: leyenda de energía de ionización', await W('q1_tabla').locator('.q1-leyenda').innerText(), t => /kJ\/mol/.test(t));
  await chip('q1_tabla', '[data-modo]', 4);
  const colHe = await W('q1_tabla').locator('.q1-el[data-z="2"]').evaluate(e => e.style.background), colF = await W('q1_tabla').locator('.q1-el[data-z="9"]').evaluate(e => e.style.background);
  chk('tabla: el flúor (máxima EN) y el He (sin EN) se pintan distinto', colHe !== colF, true);
  await W('q1_tabla').locator('.q1-el[data-z="2"]').click(); chk('tabla: He sin electronegatividad', await lec('q1_tabla', 'Electronegatividad'), '—');

  // ---- constructor de átomos ----
  await ver('q1_particulas');
  chk('partículas: Cl-35 inicial', await lec('q1_particulas', 'Nombre'), t => /^cloro-35 \(átomo neutro\)$/.test(t));
  chk('partículas: protones·neutrones·electrones', await lec('q1_particulas', 'Protones'), '17 · 18 · 17');
  chk('partículas: configuración Cl', await lec('q1_particulas', 'Configuración'), t => /3s²\s*3p⁵/.test(t));
  await range('q1_particulas', 2, -1);
  chk('partículas: Cl⁻', await lec('q1_particulas', 'Protones'), '17 · 18 · 18'); chk('partículas: carga Cl⁻', await lec('q1_particulas', 'Carga neta'), '−1'); chk('partículas: Cl⁻ es anión', await lec('q1_particulas', 'Nombre'), t => /anión \(ganó 1 e⁻\)/.test(t));
  chk('partículas: Cl⁻ configuración como el Ar', await lec('q1_particulas', 'Configuración'), t => /\[Ne\]\s*3s²\s*3p⁶/.test(t));
  await range('q1_particulas', 0, 26); await range('q1_particulas', 1, 30); await range('q1_particulas', 2, 3);
  chk('partículas: Fe³⁺ (26 p, 30 n, 23 e)', await lec('q1_particulas', 'Protones'), '26 · 30 · 23'); chk('partículas: A = 56', await lec('q1_particulas', 'Número másico'), '56');
  chk('partículas: Fe³⁺ pierde 4s y un 3d', await lec('q1_particulas', 'Configuración'), t => /3d⁵/.test(t) && !/4s/.test(t));
  chk('partículas: dibujo SVG con electrones', await W('q1_particulas').locator('svg.q1-atomo circle').count(), c => c > 20);
  await range('q1_particulas', 0, 1); await range('q1_particulas', 2, 4);
  chk('partículas: carga imposible', await lec('q1_particulas', 'Carga imposible'), t => /no se pueden quitar/.test(t));

  // ---- comparar ----
  await ver('q1_comparar');
  chk('comparar: 12C y 14C son isótopos', await lec('q1_comparar', 'Relación'), t => /isótopos/.test(t) && !/isóbaros/.test(t));
  const rel = async i => { await chip('q1_comparar', '[data-pre]', i); return lec('q1_comparar', 'Relación'); };
  chk('comparar: 40Ar y 40K isóbaros', await rel(1), t => /isóbaros/.test(t));
  chk('comparar: Na⁺ y Ne isoelectrónicos de 10 e⁻', await rel(2), t => /isoelectrónicas.*10/.test(t));
  chk('comparar: F⁻ y O²⁻ isoelectrónicos', await rel(3), t => /isoelectrónicas.*10/.test(t));
  chk('comparar: 1H y 3H isótopos', await rel(4), t => /isótopos/.test(t));
  chk('comparar: Fe²⁺ y Fe³⁺ mismo isótopo con distinta carga', await rel(5), t => /distinta carga/.test(t));
  chk('comparar: Cl⁻ y Ar isoelectrónicos de 18 e⁻', await rel(6), t => /isoelectrónicas.*18/.test(t));
  await range('q1_comparar', 1, 5); await range('q1_comparar', 0, 11);
  chk('comparar: valores imposibles', await lec('q1_comparar', 'Valores imposibles'), t => /no puede ser menor/.test(t));

  // ---- isótopos ----
  await ver('q1_isotopos');
  chk('isótopos: Cl, masa media', await lec('q1_isotopos', 'Masa atómica media'), '35,453 u'); chk('isótopos: suma 100 %', await lec('q1_isotopos', 'Suma de abundancias'), '100 %');
  await range('q1_isotopos', 0, 100); await range('q1_isotopos', 1, 0);
  chk('isótopos: 100 % de Cl-35 → 34,969 u', await lec('q1_isotopos', 'Masa atómica media'), '34,969 u');
  await range('q1_isotopos', 0, 50);
  chk('isótopos: suma ≠ 100 → aviso', await W('q1_isotopos').locator('.lec').evaluateAll(els => els.some(e => e.querySelector('small').textContent.startsWith('Suma') && /red/.test(e.className))), true);
  await chip('q1_isotopos', '[data-pre]', 1);
  chk('isótopos: otro elemento monta sus deslizadores', await W('q1_isotopos').locator('input[type=range]').count(), c => c >= 2);

  // ---- configuración ----
  await ver('q1_config');
  chk('config: Fe', await lec('q1_config', 'Configuración (llenado)'), t => /1s²\s*2s²\s*2p⁶\s*3s²\s*3p⁶\s*4s²\s*3d⁶/.test(t));
  chk('config: Fe 4 desapareados', await lec('q1_config', 'Electrones desapareados'), t => /^4 [→⟶] paramagnético/.test(t));
  chk('config: Fe periodo 4 grupo 8', await lec('q1_config', 'Posición'), t => /periodo 4, grupo 8/.test(t));
  await chip('q1_config', '[data-pre]', 2);
  chk('config: Fe²⁺ conserva 3d⁶ y pierde 4s', await lec('q1_config', 'Configuración (llenado)'), t => /3d⁶/.test(t) && !/4s/.test(t)); chk('config: Fe²⁺ 24 electrones', await lec('q1_config', 'Electrones totales'), '24');
  await chip('q1_config', '[data-pre]', 3);
  chk('config: Fe³⁺ 5 desapareados', await lec('q1_config', 'Electrones desapareados'), t => /^5 [→⟶] paramagnético/.test(t));
  await chip('q1_config', '[data-pre]', 4);
  chk('config: Cr excepción 3d⁵ 4s¹', await lec('q1_config', 'Configuración (llenado)'), t => /4s¹/.test(t) && /3d⁵/.test(t)); chk('config: Cr 6 desapareados', await lec('q1_config', 'Electrones desapareados'), t => /^6/.test(t)); chk('config: Cr avisa de la excepción', await lec('q1_config', 'Excepción'), t => /Excepción/.test(t));
  await chip('q1_config', '[data-pre]', 7);
  chk('config: Cl⁻ diamagnético', await lec('q1_config', 'Electrones desapareados'), t => /^0 [→⟶] diamagnético/.test(t));
  await chip('q1_config', '[data-pre]', 9);
  chk('config: N 3 desapareados (Hund)', await lec('q1_config', 'Electrones desapareados'), t => /^3 /.test(t));
  chk('config: cajas de orbitales', await W('q1_config').locator('.q1-orb').count(), c => c >= 5);

  // ---- números cuánticos ----
  await ver('q1_cuanticos');
  chk('cuánticos: (3,2,0,+½) permitido', await lec('q1_cuanticos', '¿Conjunto permitido'), t => /^✓/.test(t));
  chk('cuánticos: 3d admite 10 e⁻', await lec('q1_cuanticos', 'Orbitales del subnivel d'), t => /^5 [→⟶] 10 electrones/.test(t));
  chk('cuánticos: nivel 3 → 9 orbitales y 18 e⁻', [await lec('q1_cuanticos', 'Orbitales en el nivel'), await lec('q1_cuanticos', 'Electrones máximos')], t => t[0] === '9 (n²)' && t[1] === '18 (2n²)');
  await range('q1_cuanticos', 1, 3);
  chk('cuánticos: l = 3 no cabe en n = 3', await lec('q1_cuanticos', '¿Conjunto permitido'), t => /^✗/.test(t) && /l debe ir de 0 a n − 1 = 2/.test(t));
  await range('q1_cuanticos', 1, 1); await range('q1_cuanticos', 2, 2);
  chk('cuánticos: m = 2 con l = 1 no vale', await lec('q1_cuanticos', '¿Conjunto permitido'), t => /^✗/.test(t));
  await range('q1_cuanticos', 2, 0); await range('q1_cuanticos', 3, -1);
  chk('cuánticos: espín −½ en el conjunto', await lec('q1_cuanticos', 'Conjunto'), '(3, 1, 0, −½)');
  chk('cuánticos: tabla n, l, orbitales', await W('q1_cuanticos').locator('.q1-tq tbody tr').count(), 4);

  // ---- Bohr ----
  await ver('q1_bohr');
  chk('Bohr: 3→2 emisión', await lec('q1_bohr', 'Transición'), t => /^3 [→⟶] 2\s+\(emisión/.test(t)); chk('Bohr: λ(3→2) = 656,3 nm', await lec('q1_bohr', 'Longitud de onda'), '656,3 nm');
  chk('Bohr: ΔE(3→2) ≈ 1,89 eV', await lec('q1_bohr', 'ΔE'), t => /^1,89\d eV/.test(t)); chk('Bohr: visible, serie de Balmer', await lec('q1_bohr', 'Región'), t => /visible/i.test(t) && /Balmer/.test(t));
  await range('q1_bohr', 0, 1); await range('q1_bohr', 1, 3);
  chk('Bohr: 1→3 absorción', await lec('q1_bohr', 'Transición'), t => /absorción/.test(t)); chk('Bohr: λ(1→3) = 102,5 nm', await lec('q1_bohr', 'Longitud de onda'), t => /^102,[56] nm$/.test(t)); chk('Bohr: ultravioleta', await lec('q1_bohr', 'Región'), t => /ultravioleta/i.test(t) && /Lyman/.test(t));
  await range('q1_bohr', 0, 4); await range('q1_bohr', 1, 3);
  chk('Bohr: 4→3 infrarrojo (1875 nm)', await lec('q1_bohr', 'Longitud de onda'), t => /^1875,2 nm$/.test(t) || /^1\s?875,2 nm$/.test(t)); chk('Bohr: Paschen en infrarrojo', await lec('q1_bohr', 'Región'), t => /infrarrojo/i.test(t) && /Paschen/.test(t));
  await range('q1_bohr', 0, 3); await range('q1_bohr', 1, 3);
  chk('Bohr: ni = nf no hay fotón', await lec('q1_bohr', 'Transición'), t => /no hay fotón/.test(t));
  await range('q1_bohr', 0, 3); await range('q1_bohr', 1, 2); await chip('q1_bohr', '[data-serie]', 0);
  chk('Bohr: serie de Lyman dibuja sus rayas', await W('q1_bohr').locator('.q1-espectro line').count(), c => c >= 8);
  await W('q1_bohr').locator('.q1-acc button').click(); await p.waitForTimeout(1700);
  chk('Bohr: la animación termina sin errores y deja el electrón en nf', await W('q1_bohr').locator('.q1-lienzo svg circle').count(), 2);

  // ---- tendencias ----
  await ver('q1_tendencias');
  chk('tendencias: Na radio 166 pm', await lec('q1_tendencias', 'Radio covalente'), '166 pm'); chk('tendencias: periodo 3 grupo 1', await lec('q1_tendencias', 'Posición'), 'periodo 3, grupo 1');
  await range('q1_tendencias', 0, 9);
  chk('tendencias: F radio 57', await lec('q1_tendencias', 'Radio covalente'), '57 pm');
  await chip('q1_tendencias', '[data-prop]', 1);
  chk('tendencias: F 1.ª EI 1681', await lec('q1_tendencias', '1.ª energía'), t => /^1\.?681 kJ\/mol$/.test(t));
  await chip('q1_tendencias', '[data-prop]', 2);
  chk('tendencias: F EN 3,98', await lec('q1_tendencias', 'Electronegatividad'), '3,98');
  await range('q1_tendencias', 0, 10); chk('tendencias: Ne sin EN', await lec('q1_tendencias', 'Electronegatividad'), 'no definida');
  chk('tendencias: 54 elementos menos gases nobles sin dato', await W('q1_tendencias').locator('svg circle').count(), c => c >= 45);
  // el reto: ordenar de mayor a menor (se acierta tocando en el orden correcto, leído de la tabla)
  const reto = async acierta => {
    const bs = W('q1_tendencias').locator('.q1-j-op [data-z]'); const zs = await bs.evaluateAll(es => es.map(e => +e.getAttribute('data-z')));
    const prop = await W('q1_tendencias').locator('.chip-btn.on').first().innerText();
    const tabla = await p.evaluate(() => BACHI.lab.quim.EL.map(e => [e.Z, e.r, e.ie, e.en]));
    const col = /Radio/.test(prop) ? 1 : /ionización/.test(prop) ? 2 : 3;
    const orden = zs.slice().sort((a, b) => tabla.find(t => t[0] === b)[col] - tabla.find(t => t[0] === a)[col]);
    const fin = acierta ? orden : orden.slice().reverse();
    for (const z of fin) await W('q1_tendencias').locator(`.q1-j-op [data-z="${z}"]`).click();
    return W('q1_tendencias').locator('.q1-j-msg').innerText();
  };
  await chip('q1_tendencias', '[data-prop]', 0);
  chk('tendencias: reto acertado', await reto(true), t => /Correcto/.test(t));
  await W('q1_tendencias').locator('.q1-j-nv').click(); await p.waitForTimeout(60);
  chk('tendencias: reto fallado enseña el orden', await reto(false), t => /Todavía no/.test(t) && /periodo/.test(t));

  // ---- ionización sucesiva ----
  await ver('q1_ionsucesiva');
  chk('ionsuc: Mg → 2 electrones de valencia', await lec('q1_ionsucesiva', 'Electrones de valencia'), '2'); chk('ionsuc: Mg salto E2→E3', await lec('q1_ionsucesiva', 'Mayor salto'), t => /^E2 y E3/.test(t));
  const VAL = { Na: 1, Mg: 2, Al: 3, Si: 4, P: 5, Ca: 2 };
  for (const [i, s] of Object.keys(VAL).entries()) { await chip('q1_ionsucesiva', '[data-sel]', i); chk('ionsuc: ' + s, await lec('q1_ionsucesiva', 'Electrones de valencia'), String(VAL[s])); }
  chk('ionsuc: barras dibujadas', await W('q1_ionsucesiva').locator('svg rect').count(), c => c >= 5);

  // ---- decaimiento ----
  await ver('q1_decaimiento');
  chk('decaimiento: C-14 tras 3 semividas queda 12,5 %', await lec('q1_decaimiento', 'Fracción que queda'), t => /^12,5 %$/.test(t)); chk('decaimiento: 17 190 años', await lec('q1_decaimiento', 'Tiempo transcurrido'), t => /^17\.?190(,00)? años$/.test(t));
  await range('q1_decaimiento', 0, 2); chk('decaimiento: 2 semividas → 25 %', await lec('q1_decaimiento', 'Fracción que queda'), '25 %'); chk('decaimiento: desintegrado 75 %', await lec('q1_decaimiento', 'Fracción desintegrada'), '75 %');
  await chip('q1_decaimiento', '[data-pre]', 1); await range('q1_decaimiento', 0, 1);
  chk('decaimiento: yodo-131, 1 semivida = 8,02 días', await lec('q1_decaimiento', 'Tiempo transcurrido'), t => /^8,02 días$/.test(t));
  await chip('q1_decaimiento', '[data-pre]', 5); await range('q1_decaimiento', 0, 1);
  chk('decaimiento: U-238 en notación científica', await lec('q1_decaimiento', 'Tiempo transcurrido'), t => /10/.test(t) && /años/.test(t));

  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); chk('sin desborde horizontal', ov, v => v <= 1);
  console.log(mal ? mal + ' FALLOS de ' + n : n + ' comprobaciones de comportamiento del átomo correctas', '· errores JS:', errs.length ? errs : 'ninguno');
  await b.close();
  process.exit(mal || errs.length ? 1 : 0);
})();
