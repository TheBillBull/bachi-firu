const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates1', 't10');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t10 [data-w=${nm}]`).first();
  const lec = async (nm, rot) => W(nm).locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chip = async (nm, sel, i) => { await W(nm).locator(sel + ' .chip-btn').nth(i).click(); await p.waitForTimeout(80); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const range = async (nm, i, v) => { await W(nm).locator('input[type=range]').nth(i).evaluate((e, v) => { e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }, v); await p.waitForTimeout(80); };
  const escribe = async (nm, i, t) => { await W(nm).locator('input[type=text]').nth(i).fill(t); await p.waitForTimeout(120); };
  // acercar: [izq, der, tipo]
  await W('acercar').scrollIntoViewIfNeeded();
  const A = [['2', '2', 'discontinuidad evitable'], ['6', '6', 'discontinuidad evitable'], ['0,25', '0,25', 'discontinuidad evitable'], ['1', '1', 'discontinuidad evitable'], ['0,5', '0,5', 'discontinuidad evitable'], ['−1', '1', 'discontinuidad de salto finito'], ['−∞', '+∞', 'discontinuidad de salto infinito (asíntota vertical)'], ['+∞', '+∞', 'discontinuidad de salto infinito (asíntota vertical)'], ['−∞', '+∞', 'discontinuidad de salto infinito (asíntota vertical)'], ['0', '+∞', 'discontinuidad de salto infinito (asíntota vertical)'], ['no se acerca a nada (oscila)', 'no se acerca a nada (oscila)', 'discontinuidad esencial (oscila)'], ['0', '0', 'discontinuidad evitable'], ['−1', '−1', 'discontinuidad evitable'], ['4', '4', 'continua']];
  for (let i = 0; i < A.length; i++) {
    await chip('acercar', '[data-pre]', i);
    const li = await lec('acercar', 'Límite por la izquierda'), ld = await lec('acercar', 'Límite por la derecha'), t = await lec('acercar', '¿Es continua');
    chk('acercar ' + i + ' izq', li, x => x.endsWith('= ' + A[i][0])); chk('acercar ' + i + ' der', ld, x => x.endsWith('= ' + A[i][1])); chk('acercar ' + i + ' tipo', t, A[i][2]);
  }
  await escribe('acercar', 0, 'x^2'); await escribe('acercar', 1, '3'); chk('acercar propio', await lec('acercar', '¿Es continua'), 'continua'); chk('acercar propio valor', await lec('acercar', 'Valor f'), '9');
  await chip('acercar', '[data-zoom]', 3);
  // infinito
  await W('infinito').scrollIntoViewIfNeeded();
  const I = [['3', '3'], ['2', '2'], ['+∞', '−∞'], ['0', '0'], ['+∞', '0'], ['0', '+∞'], ['+∞', 'no definida'], ['0', '0'], ['3/2', '−∞'], ['1', '1'], ['2,71828', '2,71828'], ['2/5', '2/5'], ['0', '−∞'], ['−∞', '+∞']];
  const num = t => t.replace('tiende a ', '');
  for (let i = 0; i < 14; i++) { await chip('infinito', '[data-pre]', i); const a = await lec('infinito', 'lím<sub>x→+∞'.replace('<sub>', '').replace('</sub>', '')), c = await lec('infinito', 'límx→−∞'); }
  await chip('infinito', '[data-pre]', 0); chk('infinito 0 +', await lec('infinito', 'lím'), t => /3/.test(t));
  const lecs = async nm => W(nm).locator('.lec').evaluateAll(els => els.map(e => e.querySelector('b').innerText.replace(/\s+/g, ' ').trim()));
  const esp = [['3', '3'], ['2', '2'], ['+∞', '−∞'], ['0', '0'], ['+∞', '0'], ['0', '+∞'], ['+∞', 'no definida'], ['0', '0'], ['1,5', '+∞'], ['1', '1'], ['2,7183', '2,7183'], ['0,4', '0,4'], ['0', '−∞'], ['−∞', '+∞']];
  for (let i = 0; i < esp.length; i++) { await chip('infinito', '[data-pre]', i); const L = await lecs('infinito'); chk('infinito ' + i, [L[0], L[1]], x => x[0].replace('tiende a ', '') === esp[i][0] && x[1].replace('tiende a ', '') === esp[i][1] || (console.log('  ', i, JSON.stringify(x)), false)); }
  // asintotas
  await W('asintotas').scrollIntoViewIfNeeded();
  await chip('asintotas', '[data-pre]', 0); chk('as oblicua', await lec('asintotas', 'Asíntotas oblicuas'), t => /y = x \+ 1/.test(t)); chk('as vertical', await lec('asintotas', 'Asíntotas verticales'), 'x = 1');
  await chip('asintotas', '[data-pre]', 3); chk('as hueco', await lec('asintotas', 'Huecos'), '(2, 4)'); chk('as horizontal', await lec('asintotas', 'Asíntotas horizontales'), t => /y = 1/.test(t));
  await chip('asintotas', '[data-pre]', 7); chk('as √(x²+1)', await lec('asintotas', 'Asíntotas oblicuas'), t => /y = x/.test(t) && /y = −x/.test(t));
  // bolzano
  await W('bolzano').scrollIntoViewIfNeeded();
  chk('bolzano conclusión', await lec('bolzano', 'Conclusión'), t => /existe al menos un c/.test(t));
  const btn = i => W('bolzano').locator('.bz-acc button').nth(i);
  await btn(0).click(); await btn(0).click(); await btn(0).click(); await p.waitForTimeout(100);
  chk('bolzano 3 pasos', await lec('bolzano', 'Raíz acorralada'), t => /\[1,125, 1,25\]/.test(t));
  await btn(1).click(); await p.waitForTimeout(150); chk('bolzano 13 pasos', await lec('bolzano', 'Aproximación'), t => /c ≈ 1,2134/.test(t));
  await btn(2).click(); chk('bolzano reinicia', await lec('bolzano', 'Raíz acorralada'), t => t === null);
  await escribe('bolzano', 0, '1/x'); await escribe('bolzano', 1, '-1'); await escribe('bolzano', 2, '1'); chk('bolzano 1/x no vale', await lec('bolzano', 'Conclusión'), t => /no es continua/.test(t));
  await chip('bolzano', '[data-pre]', 3); await escribe('bolzano', 1, '3'); await escribe('bolzano', 2, '4'); chk('bolzano sin cambio de signo', await lec('bolzano', 'Conclusión'), t => /no se puede aplicar/.test(t));
  // epsdelta
  await W('epsdelta').scrollIntoViewIfNeeded();
  chk('epsdelta no funciona', await lec('epsdelta', 'Tu δ'), t => /No funciona/.test(t)); chk('epsdelta δmax', await lec('epsdelta', 'δ máximo'), t => /0,25/.test(t));
  await range('epsdelta', 1, 0.2); chk('epsdelta funciona', await lec('epsdelta', 'Tu δ'), t => /Funciona/.test(t));
  await chip('epsdelta', '[data-pre]', 2); chk('epsdelta hueco', await lec('epsdelta', 'Reto'), t => /lím/.test(t));
  // jerarquia
  await W('jerarquia').scrollIntoViewIfNeeded(); await chip('jerarquia', '[data-pre]', 3); chk('jerarquia filas', await W('jerarquia').locator('tbody tr').count(), 6);
  // lector
  await W('leerlimites').scrollIntoViewIfNeeded();
  const clic = async (i, j) => { await W('leerlimites').locator('.lg-p').nth(i).locator('.chip-btn[data-j="' + j + '"]').click(); await p.waitForTimeout(40); return W('leerlimites').locator('.lg-p').nth(i).locator('.lg-r').innerText(); };
  chk('leerlimites mal', await clic(0, 1), t => /Todavía no/.test(t)); chk('leerlimites bien', await clic(0, 0), t => /Correcto/.test(t));
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); chk('sin desborde horizontal', ov, v => v <= 1);
  console.log(mal ? mal + ' FALLOS de ' + n : n + ' comprobaciones de comportamiento de límites correctas', '· errores JS:', errs.length ? errs : 'ninguno');
  await b.close();
})();
