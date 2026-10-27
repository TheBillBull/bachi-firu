// Comportamiento de los simuladores del tema 12 (estadística bidimensional)
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates1', 't12');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t12 [data-w=${nm}]`).first();
  const lec = async (nm, rot) => W(nm).locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chip = async (nm, sel, i) => { await W(nm).locator(sel + ' .chip-btn').nth(i).click(); await p.waitForTimeout(80); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(80); };
  const escribe = async (nm, i, t) => { await W(nm).locator('input[type=text]').nth(i).fill(t); await p.waitForTimeout(120); };
  const baja = async nm => { await W(nm).locator('svg.plot, table').first().scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, -200)); await p.waitForTimeout(200); };

  // nube
  await W('m12_nube').scrollIntoViewIfNeeded();
  chk('nube r', await lec('m12_nube', 'Coeficiente'), '0,9488'); chk('nube puntos', await lec('m12_nube', 'Puntos'), '12'); chk('nube relación', await lec('m12_nube', 'Relación'), 'positiva muy fuerte');
  await chip('m12_nube', '[data-pre]', 2); chk('nube negativa', await lec('m12_nube', 'Relación'), t => /negativa/.test(t));
  await chip('m12_nube', '[data-pre]', 3); chk('nube nula', await lec('m12_nube', 'Relación'), 'prácticamente nula');
  await chip('m12_nube', '[data-pre]', 4); chk('nube parábola r≈0', await lec('m12_nube', 'Relación'), t => /nula|débil/.test(t));
  await chip('m12_nube', '[data-pre]', 5); chk('nube atípico', await lec('m12_nube', 'Puntos'), '11');
  await baja('m12_nube');
  const sv = await W('m12_nube').locator('svg.plot').boundingBox();
  await p.mouse.click(sv.x + sv.width * 0.8, sv.y + sv.height * 0.3); await p.waitForTimeout(100); chk('nube añade punto con clic', await lec('m12_nube', 'Puntos'), '12');
  await W('m12_nube').locator('.ctl .chip-btn, .ctl button').first().click(); await p.waitForTimeout(80); chk('nube quita el último', await lec('m12_nube', 'Puntos'), '11');
  const h0 = await W('m12_nube').locator('.p-asa').first().boundingBox();
  const antes = await lec('m12_nube', 'Coeficiente');
  await p.mouse.move(h0.x + h0.width / 2, h0.y + h0.height / 2); await p.mouse.down(); await p.mouse.move(h0.x + h0.width / 2 + sv.width * 0.1, h0.y + h0.height / 2 - sv.height * 0.25, { steps: 6 }); await p.mouse.up(); await p.waitForTimeout(80);
  chk('nube arrastre cambia r', await lec('m12_nube', 'Coeficiente'), t => t !== antes);
  await W('m12_nube').locator('.p-asa').nth(1).focus(); const a2 = await lec('m12_nube', 'Covarianza'); await p.keyboard.press('ArrowUp'); await p.keyboard.press('ArrowUp'); await p.waitForTimeout(60);
  chk('nube teclado ↑ cambia covarianza', await lec('m12_nube', 'Covarianza'), t => t !== a2);
  // mínimos cuadrados
  await W('m12_minimos').scrollIntoViewIfNeeded();
  chk('minimos veredicto inicial', await lec('m12_minimos', 'Veredicto'), t => /veces el mínimo/.test(t));
  await W('m12_minimos').locator('button.btn-comprobar').click(); await p.waitForTimeout(80);
  chk('minimos recta de regresión', await lec('m12_minimos', 'Veredicto'), t => /Es la recta de regresión/.test(t)); chk('minimos mínimo', await lec('m12_minimos', 'Mínimo posible'), t => /5,679/.test(t) && /0,893/.test(t));
  // tabla
  await W('m12_tabla').scrollIntoViewIfNeeded();
  chk('tabla r=1', await lec('m12_tabla', 'Coeficiente r'), t => /= 1$/.test(t)); chk('tabla covarianza', await lec('m12_tabla', 'Covarianza'), t => /= 5$/.test(t));
  await chip('m12_tabla', '[data-pre]', 1); chk('tabla r estudio', await lec('m12_tabla', 'Coeficiente r'), t => /0,9912/.test(t)); chk('tabla recta', await lec('m12_tabla', 'Recta de y sobre x'), t => /1,3·x \+ 1,7/.test(t));
  await escribe('m12_tabla', 0, '1; 2; 3; 4'); await escribe('m12_tabla', 1, '2; 4; 6; 8'); chk('tabla datos propios', await lec('m12_tabla', 'Coeficiente r'), t => /= 1$/.test(t));
  await escribe('m12_tabla', 1, '2; 4; 6'); chk('tabla datos incompletos', await lec('m12_tabla', 'Revisa'), t => !!t);
  // doble
  await W('m12_doble').scrollIntoViewIfNeeded();
  chk('doble marginal x', await lec('m12_doble', 'Distribución marginal de x'), '1: 10 · 2: 10 · 3: 10'); chk('doble no indep.', await lec('m12_doble', '¿Independientes'), t => /^No/.test(t));
  chk('doble r', await lec('m12_doble', 'Covarianza'), t => /0,667 · 0,513/.test(t)); chk('doble condicionada media', await lec('m12_doble', 'Y condicionada'), t => /= 5$/.test(t));
  await chip('m12_doble', '[data-cond]', 1); chk('doble condicionada x=2', await lec('m12_doble', 'Y condicionada'), t => /= 6,2$/.test(t));
  await chip('m12_doble', '[data-pre]', 1); chk('doble independientes', await lec('m12_doble', '¿Independientes'), t => /^Sí/.test(t));
  await W('m12_doble').locator('input[type=number]').first().fill('9'); await p.waitForTimeout(100); chk('doble editar rompe independencia', await lec('m12_doble', '¿Independientes'), t => /^No/.test(t));
  // atípicos
  await W('m12_atipicos').scrollIntoViewIfNeeded();
  chk('atipicos sin', await lec('m12_atipicos', 'Sin el punto'), t => /r = 0,9/.test(t)); chk('atipicos con (punto en (9,1))', await lec('m12_atipicos', 'Con el punto'), t => /r = (0,[0-5]|−)/.test(t));
  // predicción
  await W('m12_prediccion').scrollIntoViewIfNeeded();
  chk('prediccion interpola', await lec('m12_prediccion', 'Tipo de estimación'), t => /^interpolación/.test(t));
  await range('m12_prediccion', 0, 40); chk('prediccion extrapola', await lec('m12_prediccion', 'Tipo de estimación'), t => /^extrapolación/.test(t) && /absurda/.test(t)); chk('prediccion 40 años', await lec('m12_prediccion', 'Predicción'), t => /329|329,4/.test(t) || /3\d\d/.test(t));
  // adivina
  await W('m12_adivina').scrollIntoViewIfNeeded();
  const ops = W('m12_adivina').locator('.m12-op .chip-btn'); chk('adivina 4 opciones', await ops.count(), 4);
  await ops.first().click(); await p.waitForTimeout(80); chk('adivina da r real', await lec('m12_adivina', 'Era otra') || await lec('m12_adivina', '✓ Correcto'), t => /r real/.test(t));
  chk('adivina marcador', await lec('m12_adivina', 'Marcador'), t => /de 1$/.test(t));
  await W('m12_adivina').locator('button.btn-comprobar').click(); await p.waitForTimeout(80); chk('adivina otra nube', await W('m12_adivina').locator('.m12-op .chip-btn.bien').count(), 0);
  // dos rectas
  await W('m12_dosrectas').scrollIntoViewIfNeeded();
  await range('m12_dosrectas', 0, 1); chk('dosrectas r=1 coinciden', await lec('m12_dosrectas', 'Qué se ve'), t => /coinciden/.test(t));
  await range('m12_dosrectas', 0, 0); chk('dosrectas r=0 perpendiculares', await lec('m12_dosrectas', 'Qué se ve'), t => /perpendiculares/.test(t));
  await range('m12_dosrectas', 0, 0.7); chk('dosrectas producto = r²', await lec('m12_dosrectas', 'Producto'), t => /0,49/.test(t));
  // unidades
  await W('m12_unidades').scrollIntoViewIfNeeded();
  const rr = async () => W('m12_unidades').locator('tbody tr').last().locator('td').nth(0).innerText();
  const r0 = await rr(); await range('m12_unidades', 0, 0.01); chk('unidades: r no cambia al reescalar', await W('m12_unidades').locator('tbody tr').last().locator('td').nth(1).innerText(), r0);
  await range('m12_unidades', 0, -1); chk('unidades: r cambia de signo', await W('m12_unidades').locator('tbody tr').last().locator('td').nth(1).innerText(), t => t.startsWith('−'));
  // curva
  await W('m12_curva').scrollIntoViewIfNeeded();
  chk('curva bacterias: mejor exponencial', await lec('m12_curva', 'Mejor modelo'), t => /Exponencial/.test(t));
  await chip('m12_curva', '[data-pre]', 1); chk('curva planetas: mejor potencial', await lec('m12_curva', 'Mejor modelo'), t => /Potencial/.test(t));
  await chip('m12_curva', '[data-pre]', 2); chk('curva aprendizaje: mejor logarítmica', await lec('m12_curva', 'Mejor modelo'), t => /Logarítmica/.test(t));
  await chip('m12_curva', '[data-mod]', 3); chk('curva ecuación log', await lec('m12_curva', 'Ecuación'), t => /19,95/.test(t));
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); chk('sin desborde horizontal', ov, v => v <= 1);
  console.log(mal ? mal + ' FALLOS de ' + n : n + ' comprobaciones de comportamiento de estadística correctas', '· errores JS:', errs.length ? errs : 'ninguno');
  await b.close();
})();
