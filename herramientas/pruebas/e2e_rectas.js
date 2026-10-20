const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates1', 't8');
  let mal = 0, n = 0;
  const W = nm => p.locator(`#detail-t8 [data-w=${nm}]`).first();
  const lec = async (nm, rot) => W(nm).locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chip = async (nm, sel, i) => { await W(nm).locator(sel + ' .chip-btn').nth(i).click(); await p.waitForTimeout(60); };
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const escribe = async (nm, i, t) => { const inp = W(nm).locator('.bx input[type=text], input[type=text]').nth(i); await inp.fill(t); await p.waitForTimeout(80); };
  // recta2p
  await W('recta2p').scrollIntoViewIfNeeded();
  const tabla = async nm => W(nm).locator('.rc-t tr').evaluateAll(rs => Object.fromEntries(rs.map(r => [r.querySelector('th').innerText, r.querySelector('td').innerText.replace(/\s+/g, ' ').trim()])));
  let t = await tabla('recta2p');
  chk('recta2p general', t['Ecuación general'], '2x − y − 1 = 0');
  chk('recta2p pendiente', t['Pendiente m'], t => /2/.test(t));
  // arrastre real de B
  const sv = W('recta2p').locator('svg.plot'); await sv.scrollIntoViewIfNeeded();
  const bx = await sv.boundingBox();
  const ha = await W('recta2p').locator('svg.plot .asa, svg.plot [data-asa]').count();
  console.log('asas en recta2p:', ha);
  // ecgeneral
  await W('ecgeneral').scrollIntoViewIfNeeded();
  chk('ecgeneral 3x+4y-6=0 pendiente', await lec('ecgeneral', 'Pendiente'), t => /−3\/4|-3\/4/.test(t));
  const nPre = await W('ecgeneral').locator('[data-pre] .chip-btn').count();
  const esperado = ['3x + 4y − 6 = 0', '2x − y − 1 = 0', 'x + 2y − 5 = 0', '4x − 3y + 2 = 0', 'x − 3 = 0', 'y − 2 = 0', 'x + 2y − 4 = 0', '2x − 3y + 7 = 0'];
  for (let i = 0; i < nPre; i++) { await chip('ecgeneral', '[data-pre]', i); chk('ecgeneral preset ' + i, await lec('ecgeneral', 'Ecuación general'), esperado[i]); }
  // posiciones
  await W('posiciones').scrollIntoViewIfNeeded();
  const pos = ['secantes', 'paralelas', 'coincidentes', 'secantes', 'secantes'];
  for (let i = 0; i < 5; i++) { await chip('posiciones', '[data-pre]', i); chk('posiciones ' + i, await lec('posiciones', 'Posición'), pos[i]); }
  await chip('posiciones', '[data-pre]', 3); chk('perpendiculares ángulo', await lec('posiciones', 'Ángulo'), t => /90/.test(t));
  await chip('posiciones', '[data-pre]', 0); chk('corte', await lec('posiciones', 'Resultado'), t => /1, 3/.test(t));
  // distpunto
  await W('distpunto').scrollIntoViewIfNeeded();
  chk('distpunto', await lec('distpunto', 'd(P'), t => /=/.test(t));
  console.log('distpunto:', await lec('distpunto', 'd(P'));
  // mediatriz
  await W('mediatriz').scrollIntoViewIfNeeded();
  chk('mediatriz M', await lec('mediatriz', 'Punto medio'), '(0, 2)');
  chk('mediatriz QA=QB', await lec('mediatriz', 'Distancias'), t => { const m = t.match(/([\d,]+)\s+y\s+([\d,]+)/); return m && m[1] === m[2]; });
  console.log('mediatriz:', await lec('mediatriz', 'Mediatriz'));
  // ptosnotables
  await W('ptosnotables').scrollIntoViewIfNeeded();
  const nm = ['Baricentro G', 'Ortocentro H', 'Circuncentro O', 'Incentro I'];
  for (let i = 0; i < 4; i++) { await chip('ptosnotables', '[data-modo]', i); const v = await lec('ptosnotables', nm[i].split(' ')[0]); chk('ptos ' + nm[i], v, t => t && /\(/.test(t)); console.log(nm[i], v); }
  await chip('ptosnotables', '[data-modo]', 0); chk('baricentro (0, 0,333)', await lec('ptosnotables', 'Baricentro'), '(0, 0,333)');
  // region
  await W('region').scrollIntoViewIfNeeded();
  chk('region triángulo', await lec('region', 'Región'), 'la zona verde');
  await chip('region', '[data-pre]', 4); chk('region vacía', await lec('region', 'Región'), t => /vacía/.test(t));
  await chip('region', '[data-pre]', 2); chk('region rect', await lec('region', 'Región'), 'la zona verde');
  // sobredesbordes horizontales
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  chk('sin desborde horizontal', ov, v => v <= 1);
  console.log(mal ? mal + ' FALLOS de ' + n : n + ' comprobaciones de comportamiento de rectas correctas', '· errores JS:', errs.length ? errs : 'ninguno');
  await b.close();
})();
