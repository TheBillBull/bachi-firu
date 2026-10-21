// Comportamiento de los simuladores del tema 4 de Física y Química I (mol, gases, disoluciones).
// Monta cada uno suelto, manipula sus controles y comprueba las lecturas contra los valores esperados.
//   node herramientas/pruebas/e2e_qmol4.js
const { lanzar } = require('./e2e_common.js');
let fallos = 0, aciertos = 0;
function ok(nombre, cond, extra) { if (cond) { aciertos++; console.log('  ✓', nombre); } else { fallos++; console.log('  ✗', nombre, extra === undefined ? '' : '→ ' + JSON.stringify(extra)); } }

(async () => {
  const { b, p, errs } = await lanzar({ viewport: { width: 1100, height: 1000 } });
  const nombres = ['q4_lavoisier', 'q4_proporciones', 'q4_mol', 'q4_masamolar', 'q4_empirica', 'q4_gas', 'q4_leyesgas', 'q4_dalton', 'q4_disolucion', 'q4_dilucion', 'q4_practica'];
  await p.evaluate((n) => {
    const cont = document.createElement('div'); cont.id = 'ban'; cont.className = 'ampl'; cont.style.cssText = 'max-width:720px;margin:0 auto;padding:10px;background:var(--sheet)';
    n.forEach(x => { const d = document.createElement('div'); d.setAttribute('data-w', x); d.id = 'w-' + x; cont.appendChild(d); });
    [...document.body.children].forEach(c => { if (!/^(STYLE|SCRIPT)$/.test(c.tagName)) c.style.display = 'none'; });
    document.body.appendChild(cont); BACHI.montar(cont);
  }, nombres);
  await p.waitForTimeout(400);
  const W = (n) => p.locator('#w-' + n);
  // lectura por rótulo (texto parcial del <small>) → texto del <b>
  const lec = (n, rot) => p.evaluate(([n, rot]) => { const e = [...document.querySelectorAll('#w-' + n + ' .lec')].find(x => x.querySelector('small').textContent.includes(rot)); return e ? e.querySelector('b').textContent.replace(/\s+/g, ' ').trim() : null; }, [n, rot]);
  const todas = (n) => p.evaluate((n) => [...document.querySelectorAll('#w-' + n + ' .lec')].map(x => x.textContent.replace(/\s+/g, ' ').trim()).join(' | '), n);
  const ficha = async (n, txt) => { await W(n).locator('.chip-btn', { hasText: txt }).first().click(); await p.waitForTimeout(80); };
  const campo = async (n, etq, v) => { const i = W(n).locator(`input[aria-label="${etq}"]`).first(); await i.fill(String(v)); await p.waitForTimeout(80); };
  const num = (s) => s == null ? NaN : parseFloat(s.replace(/\./g, '').replace(',', '.').replace(/[^\d.\-]/g, ''));

  console.log('Montaje');
  for (const n of nombres) ok(n + ' sin error', await p.evaluate((n) => !document.querySelector('#w-' + n + ' .w-error') && document.querySelector('#w-' + n).children.length > 0, n));

  console.log('q4_mol');
  ok('H2O 36 g → 18 g/mol', (await lec('q4_mol', 'Masa molar')) === '18 g/mol', await lec('q4_mol', 'Masa molar'));
  ok('H2O 36 g → 2 mol', (await lec('q4_mol', 'Cantidad de sustancia')) === '2 mol', await lec('q4_mol', 'Cantidad de sustancia'));
  await campo('q4_mol', 'Fórmula:', 'CO2'); await campo('q4_mol', 'Cantidad:', '44');
  ok('CO2 44 g → 44 g/mol y 1 mol', (await lec('q4_mol', 'Masa molar')) === '44 g/mol' && (await lec('q4_mol', 'Cantidad de sustancia')) === '1 mol', await todas('q4_mol'));
  await ficha('q4_mol', 'moles'); await campo('q4_mol', 'Cantidad:', '0,5');
  const masaExacta = await p.evaluate(() => { const e = [...document.querySelectorAll('#w-q4_mol .lec')].find(x => x.querySelector('small').textContent.trim() === 'Masa'); return e ? e.querySelector('b').textContent.trim() : null; });
  ok('CO2 0,5 mol → 22 g', masaExacta === '22 g', masaExacta);
  await campo('q4_mol', 'Fórmula:', 'H2O(');
  ok('fórmula mal escrita da aviso', /Revisa|error|paréntesis/i.test(await todas('q4_mol')), await todas('q4_mol'));
  await campo('q4_mol', 'Fórmula:', 'H2O');

  console.log('q4_masamolar');
  await campo('q4_masamolar', 'Fórmula:', 'Ca(OH)2');
  ok('Ca(OH)2 → 74', /74/.test(await lec('q4_masamolar', 'Masa molar')), await lec('q4_masamolar', 'Masa molar'));
  await campo('q4_masamolar', 'Fórmula:', 'CuSO4·5H2O');
  ok('CuSO4·5H2O → 249,5', /249,5/.test(await lec('q4_masamolar', 'Masa molar')), await lec('q4_masamolar', 'Masa molar'));
  await campo('q4_masamolar', 'Fórmula:', 'C6H12O6');
  ok('glucosa → 180', /180/.test(await lec('q4_masamolar', 'Masa molar')), await lec('q4_masamolar', 'Masa molar'));
  await ficha('q4_masamolar', 'decimales'); await campo('q4_masamolar', 'Fórmula:', 'H2O');
  ok('masas decimales: H2O → 18,015', /18,01/.test(await lec('q4_masamolar', 'Masa molar')), await lec('q4_masamolar', 'Masa molar'));
  ok('el selector se sincroniza con q4_mol (H2O → 18,015)', /18,01/.test(await lec('q4_mol', 'Masa molar')), await lec('q4_mol', 'Masa molar'));
  await ficha('q4_masamolar', 'de examen');

  console.log('q4_empirica');
  ok('glucosa: empírica CH2O', /CH₂O/.test(await lec('q4_empirica', 'empírica') || ''), await todas('q4_empirica'));
  ok('glucosa: molecular C6H12O6', /C₆H₁₂O₆/.test(await lec('q4_empirica', 'molecular') || ''), await todas('q4_empirica'));
  await ficha('q4_empirica', 'Óxido de hierro');
  ok('óxido de hierro(III): Fe2O3', /Fe₂O₃/.test(await todas('q4_empirica')), await todas('q4_empirica'));
  await ficha('q4_empirica', 'Benceno');
  ok('benceno: empírica CH, molecular C6H6', /C₆H₆/.test(await todas('q4_empirica')), await todas('q4_empirica'));
  await ficha('q4_empirica', 'Análisis por combustión');
  ok('combustión: da fórmula', /C/.test(await todas('q4_empirica')) && !(await W('q4_empirica').locator('.w-error').count()), await todas('q4_empirica'));

  console.log('q4_gas');
  ok('arranca y muestra presión', /atm/.test(await todas('q4_gas')), await todas('q4_gas'));

  console.log('q4_leyesgas');
  ok('Boyle: P·V = 24,6 atm·L', /24,6/.test(await todas('q4_leyesgas')), await todas('q4_leyesgas'));
  await ficha('q4_leyesgas', 'Charles');
  ok('Charles: V/T constante', /V ?\/ ?T/.test(await todas('q4_leyesgas')), await todas('q4_leyesgas'));
  await ficha('q4_leyesgas', 'Gay-Lussac');
  ok('Gay-Lussac: P/T constante', /P ?\/ ?T/.test(await todas('q4_leyesgas')), await todas('q4_leyesgas'));
  await ficha('q4_leyesgas', 'combinada');
  await campo('q4_leyesgas', 'P1', '1'); await campo('q4_leyesgas', 'V1', '10'); await campo('q4_leyesgas', 'T1', '300');
  await campo('q4_leyesgas', 'P2', ''); await campo('q4_leyesgas', 'V2', '5'); await campo('q4_leyesgas', 'T2', '400');
  ok('combinada: P2 = 2,667 atm', /2,66|2,67/.test(await todas('q4_leyesgas')), await todas('q4_leyesgas'));
  await campo('q4_leyesgas', 'P2', '2'); await campo('q4_leyesgas', 'V2', '');
  ok('combinada: V2 con P2 = 2 → 6,667 L', /6,6/.test(await todas('q4_leyesgas')), await todas('q4_leyesgas'));

  console.log('q4_dalton');
  ok('mezcla: P = 8,61 atm', /8,61/.test(await lec('q4_dalton', 'Presión total')), await lec('q4_dalton', 'Presión total'));
  ok('fracciones molares 0,571 · 0,286 · 0,143', /0,571/.test(await todas('q4_dalton')) && /0,286/.test(await todas('q4_dalton')) && /0,143/.test(await todas('q4_dalton')), await todas('q4_dalton'));
  await ficha('q4_dalton', 'sobre agua');
  ok('sobre agua: resta presión de vapor', /mmHg/.test(await todas('q4_dalton')) && /vapor/i.test(await todas('q4_dalton')), await todas('q4_dalton'));

  console.log('q4_disolucion');
  await ficha('q4_disolucion', 'clorhídrico');
  const mHCl = await lec('q4_disolucion', 'Molaridad');
  ok('HCl comercial: ≈ 12,06 mol/L', Math.abs(num(mHCl) - 12.06) < 0.1, mHCl);
  await ficha('q4_disolucion', 'Suero fisiológico');
  ok('suero: ≈ 0,154 mol/L', Math.abs(num(await lec('q4_disolucion', 'Molaridad')) - 0.154) < 0.005, await lec('q4_disolucion', 'Molaridad'));
  await campo('q4_disolucion', 'Masa soluto (g)', '2000');
  ok('soluto > disolución: aviso', /imposible|supera|Revisa/i.test(await todas('q4_disolucion')), await todas('q4_disolucion'));

  console.log('q4_dilucion');
  ok('diluir 6 M → 1 M en 500 mL: V₁ = 83,33 mL', /83,3/.test(await lec('q4_dilucion', 'Volumen de concentrada')), await lec('q4_dilucion', 'Volumen de concentrada'));
  await ficha('q4_dilucion', 'Mezclar');
  ok('mezcla 200 mL 0,5 M + 300 mL 2 M = 1,4 M', /1,4/.test(await lec('q4_dilucion', 'Molaridad de la mezcla')), await lec('q4_dilucion', 'Molaridad de la mezcla'));
  await ficha('q4_dilucion', 'sólido');
  ok('preparar 250 mL 0,5 M de NaCl: ≈ 7,3 g', /7,3/.test(await lec('q4_dilucion', 'Masa que hay que pesar')), await lec('q4_dilucion', 'Masa que hay que pesar'));

  console.log('q4_practica (24 problemas; respuesta tomada de «Ver solución»)');
  let buenas = 0, intentos = 0; const vistos = new Set();
  const sup = { '⁰': 0, '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9, '⁻': '-' };
  for (let i = 0; i < 24; i++) {
    const enun = await W('q4_practica').locator('.q4-enun').innerText(); vistos.add(enun.slice(0, 18));
    await W('q4_practica').locator('button', { hasText: 'Ver solución' }).click();
    const r = (await W('q4_practica').locator('.result-box').innerText()).replace('Resultado', '').trim();
    const mm = r.match(/([\d,]+)·10([⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+)/);
    await W('q4_practica').locator('input').first().fill(mm ? mm[1] + '*10^' + [...mm[2]].map(c => sup[c]).join('') : r.split(' ')[0]);
    await W('q4_practica').locator('button', { hasText: 'Comprobar' }).click();
    const t = await todas('q4_practica'); intentos++; if (/Correcto/.test(t)) buenas++; else console.log('     fallo con', enun.slice(0, 70), '→', r);
    await W('q4_practica').locator('button', { hasText: 'Otro problema' }).click();
  }
  ok(`respuesta correcta aceptada (${buenas}/${intentos})`, buenas === intentos);
  ok('genera varios tipos de problema distintos', vistos.size >= 4, [...vistos]);

  console.log('q4_lavoisier / q4_proporciones');
  ok('Lavoisier: reactivos = productos (cerrado)', /20 g/.test(await todas('q4_lavoisier')), await todas('q4_lavoisier'));
  await ficha('q4_lavoisier', 'abierto');
  ok('Lavoisier: sistema abierto responde', (await todas('q4_lavoisier')).length > 0);
  ok('Proust: lectura con proporciones', /:/.test(await todas('q4_proporciones')), await todas('q4_proporciones'));
  await ficha('q4_proporciones', 'Dalton');
  ok('Dalton: razón de masas con enteros pequeños', /\d ?: ?\d/.test(await todas('q4_proporciones')), await todas('q4_proporciones'));

  ok('sin errores JS', errs.length === 0, errs);
  console.log(`\n${aciertos} comprobaciones correctas, ${fallos} fallos`);
  await b.close();
  process.exit(fallos ? 1 : 0);
})();
