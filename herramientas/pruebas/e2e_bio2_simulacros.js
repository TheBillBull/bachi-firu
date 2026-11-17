// Prueba en navegador de los simulacros de Biología II: aparecen los 8 (5 originales + sim6–sim8), se abren,
// cada pregunta muestra su solución al pulsar el botón real y no hay errores de consola.
// Uso: node herramientas/pruebas/e2e_bio2_simulacros.js [movil]
const { lanzar } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  let mal = 0, n = 0;
  const ok = (nm, cond, info) => { n++; if (!cond) { mal++; console.log('FALLO', nm, String(info === undefined ? '' : info).slice(0, 300)); } };

  await p.click('[data-view=asignaturas]');
  await p.locator('#subjectGrid [data-goto-asig=bio2]').first().click();
  await p.waitForTimeout(300);
  await p.click('.tab[data-panel=simulacros]');
  await p.waitForTimeout(300);

  const tabs = p.locator('#simulacrosTabs .tab');
  ok('aparecen 8 simulacros', (await tabs.count()) === 8, await tabs.count());
  const titulos = await tabs.allInnerTexts();
  ok('los 5 originales siguen primero', titulos.slice(0, 5).every((t, i) => t.trim() === 'Simulacro ' + (i + 1)), titulos.join(' | '));
  ok('sim6–sim8 al final con su título', [6, 7, 8].every((k, i) => titulos[5 + i].includes('Simulacro ' + k + ' · Biología II (formato PAU Madrid 2026)')), titulos.slice(5).join(' | '));

  // originales intactos: el primero sigue teniendo sus bloques
  await tabs.nth(0).click(); await p.waitForTimeout(150);
  ok('sim1 original: sigue mostrando bloques', (await p.locator('#simulacrosPanel .exam-block').count()) > 0);

  for (const k of [6, 7, 8]) {
    await tabs.nth(k - 1).click(); await p.waitForTimeout(200);
    const bloques = p.locator('#simulacrosPanel .exam-block');
    ok(`sim${k}: 9 preguntas`, (await bloques.count()) === 9, await bloques.count());
    const cab = await p.locator('#simulacrosPanel .exam-head h3').allInnerTexts();
    ok(`sim${k}: orden 1, 2A, 2B ... 5B`, ['Pregunta 1', 'Pregunta 2A', 'Pregunta 2B', 'Pregunta 3A', 'Pregunta 3B', 'Pregunta 4A', 'Pregunta 4B', 'Pregunta 5A', 'Pregunta 5B']
      .every((e, i) => cab[i].includes(e)), cab.join(' | '));
    const pts = await p.locator('#simulacrosPanel .exam-head .pts').allInnerTexts();
    ok(`sim${k}: cada pregunta de 2 puntos`, pts.length === 9 && pts.every(t => /2/.test(t) && !/2[,.]5/.test(t)), pts.join(' | '));
    const callout = await p.locator('#simulacrosPanel .callout').first().innerText();
    ok(`sim${k}: el aviso suma 18 puntos (9 bloques)`, /18/.test(callout), callout);
    const enun1 = await bloques.nth(0).locator('.exercise-statement').innerText();
    ok(`sim${k}: instrucciones oficiales y enlace UAM`, /90 min/.test(enun1) && /Cinco preguntas/.test(enun1) && /reparto deducido/.test(enun1)
      && (await bloques.nth(0).locator('.exercise-statement a[href*="uam.es"]').count()) === 2, enun1.slice(0, 200));
    // cada solución está oculta y se muestra con el botón real
    for (let i = 0; i < 9; i++) {
      const bl = bloques.nth(i), btn = bl.locator('.btn-solucion'), sol = bl.locator('.solucion');
      ok(`sim${k} p${i}: solución oculta al inicio`, await sol.isHidden());
      await btn.scrollIntoViewIfNeeded(); await btn.click(); await p.waitForTimeout(40);
      ok(`sim${k} p${i}: solución visible tras pulsar`, await sol.isVisible());
      ok(`sim${k} p${i}: botón dice «Ocultar»`, /Ocultar/.test(await btn.innerText()));
      const t = await sol.innerText();
      ok(`sim${k} p${i}: solución con criterios de puntuación`, /Criterios de puntuación/.test(t) && t.length > 300, t.length);
      if (i === 8) { await btn.click(); await p.waitForTimeout(40); ok(`sim${k}: se oculta al pulsar de nuevo`, await sol.isHidden()); }
    }
    // la caja de respuesta acepta texto
    const ta = bloques.nth(1).locator('textarea.sim-respuesta');
    await ta.fill('prueba'); ok(`sim${k}: textarea editable`, (await ta.inputValue()) === 'prueba');
    // sin desbordes horizontales en móvil
    if (movil) ok(`sim${k}: sin desborde horizontal`, await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
  }

  // contenidos clave visibles en la interfaz (tabla de datos y solución con cifras)
  await tabs.nth(5).click(); await p.waitForTimeout(150);
  ok('sim6 p1: tabla de datos cinética enzimática', (await p.locator('#simulacrosPanel .exam-block').nth(0).locator('table.lamina-table').count()) === 1);
  await p.locator('#simulacrosPanel .exam-block').nth(6).locator('.btn-solucion').click();
  ok('sim6 p4B: la solución muestra el péptido Met-Gly-Asp-Leu', /Met-Gly-Asp-Leu/.test(await p.locator('#simulacrosPanel .exam-block').nth(6).locator('.solucion').innerText()));

  ok('sin errores de consola', errs.length === 0, errs.join(' // '));
  console.log(`${n} comprobaciones, ${mal} fallos`);
  await b.close();
  process.exit(mal ? 1 : 0);
})();
