// Prueba de comportamiento (pulsando de verdad) de los dos simuladores del tema 6 de Matemáticas II (Problemas métricos).
// Uso: node herramientas/pruebas/e2e_mates2_t6.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates2', 't6');
  let mal = 0, n = 0;
  const W = (nm, i = 0) => p.locator(`#detail-t6 [data-w=${nm}]`).nth(i);
  const lec = async (w, rot) => w.locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const chip = async (w, texto) => { await w.locator('.chip-btn', { hasText: texto }).first().click(); await p.waitForTimeout(40); };
  const rango = async (w, i, v) => { await w.locator('input[type=range]').nth(i).fill(String(v)); await p.waitForTimeout(40); };
  const trazo = async (w) => w.locator('svg.plot .p-din').first().innerHTML();
  const giro = async (w) => w.locator('label', { hasText: 'Giro' }).locator('.sl-v').innerText();
  const pie = async (w) => w.locator('.w-pie').innerText();

  // ---------- met_3d: punto y plano ----------
  let w = W('met_3d', 0); await w.scrollIntoViewIfNeeded();
  chk('plano: proyección', await lec(w, 'Proyección'), '(4, 1, 0)');
  chk('plano: simétrico', await lec(w, 'Simétrico'), '(5, 3, −2)');
  chk('plano: distancia 3', await lec(w, 'Distancia'), t => /≈ 3$/.test(t) || /3$/.test(t));
  chk('plano: valor −9', await lec(w, 'Valor'), '−9');
  chk('plano: 3 deslizadores de P + 2 de vista', await w.locator('input[type=range]').count(), 5);
  await chip(w, 'z = 0'); chk('z=0: proyección (2, 1, 0)', await lec(w, 'Proyección'), '(2, 1, 0)'); chk('z=0: simétrico (2, 1, −3)', await lec(w, 'Simétrico'), '(2, 1, −3)');
  await rango(w, 2, 0); chk('z=0, P_z=0: P está en el plano', await pie(w), t => /en el plano/.test(t)); chk('z=0, P_z=0: valor 0', await lec(w, 'Valor'), '0');
  await chip(w, '2x − y + 2z'); chk('2x−y+2z−3: proyección (1, 1, 1)', await lec(w, 'Proyección'), '(1, 1, 1)'); chk('2x−y+2z−3: simétrico', await lec(w, 'Simétrico'), '(−1, 2, −1)');
  await rango(w, 0, 0); await rango(w, 1, 0); await rango(w, 2, 0);  // P = origen
  chk('origen: valor −3', await lec(w, 'Valor'), '−3'); chk('origen: proyección (2/3, −1/3, 2/3) → decimales', await lec(w, 'Proyección'), '(0,67, −0,33, 0,67)');
  const antes = await trazo(w);
  await rango(w, 3, 90); await p.waitForTimeout(60);
  chk('plano: el giro cambia el dibujo', (await trazo(w)) !== antes, true); chk('plano: etiqueta del giro', await giro(w), t => /90/.test(t));
  const caja = await w.locator('svg.plot').boundingBox();
  await p.mouse.move(caja.x + 100, caja.y + 100); await p.mouse.down(); await p.mouse.move(caja.x + 200, caja.y + 100, { steps: 4 }); await p.mouse.up(); await p.waitForTimeout(60);
  chk('plano: arrastrar gira', await giro(w), t => !/^90/.test(t.trim()));
  await chip(w, 'Vista inicial'); chk('plano: vista inicial 35°', await giro(w), t => /35/.test(t));
  await chip(w, 'Punto y recta'); chk('modo → recta: distancia √2', await lec(w, 'Distancia'), t => /1,41/.test(t));
  chk('modo → recta: proyección', await lec(w, 'Proyección'), '(1, 2, 2)');

  // ---------- met_3d: punto y recta (segunda instancia) ----------
  w = W('met_3d', 1); await w.scrollIntoViewIfNeeded();
  chk('recta: proyección (1, 2, 2)', await lec(w, 'Proyección'), '(1, 2, 2)'); chk('recta: simétrico (0, 3, 2)', await lec(w, 'Simétrico'), '(0, 3, 2)');
  chk('recta: PP′·v = 0', await lec(w, 'PP′'), '0'); chk('recta: |QP × v| = 2√3', await lec(w, '|QP'), t => /^2√3/.test(t));
  await chip(w, 'eje Z'); chk('eje Z: proyección (0, 0, 2)', await lec(w, 'Proyección'), '(0, 0, 2)'); chk('eje Z: simétrico (−3, −1, 2)', await lec(w, 'Simétrico'), '(−3, −1, 2)');
  await rango(w, 0, 0); await rango(w, 1, 0); chk('eje Z: P en la recta', await pie(w), t => /en la recta/.test(t)); chk('eje Z: distancia 0', await lec(w, 'Distancia'), '0');
  await chip(w, 'r: (1, 0, 0)'); chk('r3: preset cambia P a (1, 2, 0): distancia √2', await lec(w, 'Distancia'), t => /1,41/.test(t));

  // ---------- met_3d: dos rectas que se cruzan (tercera instancia) ----------
  w = W('met_3d', 2); await w.scrollIntoViewIfNeeded();
  chk('cruz: producto mixto 9', await lec(w, '[Q'), '9'); chk('cruz: distancia 3', await lec(w, 'd ='), '3');
  chk('cruz: pie A', await lec(w, 'Pie A'), '(1, 2, 0)'); chk('cruz: pie B', await lec(w, 'Pie B'), '(2, 0, 2)'); chk('cruz: u × v', await lec(w, 'u × v'), '(1, −2, 2)');
  chk('cruz: 4 deslizadores + 2 de vista', await w.locator('input[type=range]').count(), 6);
  await rango(w, 3, 1); chk('cruz: altura 1 → mixto 11', await lec(w, '[Q'), '11'); await rango(w, 3, 0);
  await rango(w, 0, 2); chk('cruz: s=(2, 1, 1), u×v=(1,−2,0) → mixto 7', await lec(w, '[Q'), '7'); await rango(w, 0, 0);
  await chip(w, 'Paralelas'); chk('cruz: paralelas → aviso', await lec(w, '¿Se cruzan'), 'no: son paralelas'); chk('cruz: paralelas → distancia', await lec(w, 'Distancia entre'), '3');
  await chip(w, 'Se cortan'); chk('cruz: secantes → mixto 0', await lec(w, '[Q'), '0'); chk('cruz: secantes aviso', await pie(w), t => /se cortan/.test(t));
  await chip(w, 'Perpendiculares'); chk('cruz: perpendiculares distancia 2', await lec(w, 'd ='), '2'); chk('cruz: pie A (0, 0, 0)', await lec(w, 'Pie A'), '(0, 0, 0)');
  await chip(w, 'Ejemplo'); chk('cruz: ejemplo vuelve a 3', await lec(w, 'd ='), '3');
  chk('cruz: hay un segmento verde de la perpendicular común', await w.locator('svg.plot .c-ok').count(), t => t >= 3);

  // ---------- met_calc ----------
  w = W('met_calc'); await w.scrollIntoViewIfNeeded();
  chk('calc: ángulo entre rectas 60°', await lec(w, 'α'), '60°');
  chk('calc: 6 modos', await w.locator('[data-modo] .chip-btn').count(), 6);
  const inp = w.locator('input[type=number]');
  await inp.nth(0).fill('0'); await p.waitForTimeout(60); chk('calc: u=(0,1,0), v=(0,1,1) → 45°', await lec(w, 'α'), '45°');
  await chip(w, 'Ángulo recta-plano'); chk('calc: recta–plano 30°', await lec(w, 'α'), '30°'); chk('calc: dice seno', await w.locator('.mt6-pasos').innerText(), t => /SENO/.test(t));
  await chip(w, 'Ángulo entre planos'); chk('calc: planos 82,34°', await lec(w, 'α'), t => /^82,34/.test(t));
  await chip(w, 'Ejemplo 2'); chk('calc: planos perpendiculares 90°', await lec(w, 'α'), '90°'); chk('calc: aviso perpendiculares', await w.locator('.mt6-pasos').innerText(), t => /perpendiculares/.test(t));
  await chip(w, 'Punto a plano'); chk('calc: punto–plano distancia 3', await lec(w, 'Distancia'), '3'); chk('calc: proyección (4, 1, 0)', await lec(w, 'Proyección'), '(4, 1, 0)'); chk('calc: simétrico (5, 3, −2)', await lec(w, 'Simétrico'), '(5, 3, −2)');
  chk('calc: 7 casillas (3 + 4)', await w.locator('input[type=number]').count(), 7);
  await w.locator('input[type=number]').nth(6).fill('0'); await p.waitForTimeout(60); chk('calc: cambiar D a 0 → distancia 1', await lec(w, 'Distancia'), '1');
  await chip(w, 'Punto a recta'); chk('calc: punto–recta √2', await lec(w, 'Distancia'), t => /^1,41/.test(t)); chk('calc: proyección (1, 2, 2)', await lec(w, 'Proyección'), '(1, 2, 2)');
  await chip(w, 'Entre dos rectas'); chk('calc: se cruzan', await lec(w, 'Posición'), 'se cruzan'); chk('calc: distancia 3', await lec(w, 'Distancia'), '3'); chk('calc: pie A', await lec(w, 'Pie A'), '(1, 2, 0)');
  await chip(w, 'Ejemplo 2'); chk('calc: paralelas', await lec(w, 'Posición'), 'paralelas'); chk('calc: distancia entre paralelas 3', await lec(w, 'Distancia'), '3');

  chk('sin errores JS', errs.length, 0);
  console.log(mal ? mal + ' FALLOS de ' + n : 'todo bien · ' + n + ' comprobaciones');
  await b.close();
})();
