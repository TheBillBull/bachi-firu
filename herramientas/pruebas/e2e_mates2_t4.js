// Prueba de comportamiento (pulsando de verdad) de los tres simuladores del tema 4 de Matemáticas II (Vectores en el espacio).
// Uso: node herramientas/pruebas/e2e_mates2_t4.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates2', 't4');
  let mal = 0, n = 0;
  const W = (nm, i = 0) => p.locator(`#detail-t4 [data-w=${nm}]`).nth(i);
  const lec = async (w, rot) => w.locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const chip = async (w, texto) => { await w.locator('.chip-btn', { hasText: texto }).first().click(); await p.waitForTimeout(40); };
  const rango = async (w, i, v) => { await w.locator('input[type=range]').nth(i).fill(String(v)); await p.waitForTimeout(40); };
  const trazo = async (w) => w.locator('svg.plot .p-din').first().innerHTML();
  const giro = async (w) => w.locator('label', { hasText: 'Giro' }).locator('.sl-v').innerText();

  // ---------- vec_3d, modo escalar (primera instancia) ----------
  let w = W('vec_3d', 0); await w.scrollIntoViewIfNeeded();
  chk('esc: u·v = 8', await lec(w, 'u · v'), '8');
  chk('esc: ángulo 32,5°', await lec(w, 'Ángulo'), t => /^32,5/.test(t));
  chk('esc: proyección de u sobre v', await lec(w, 'Proyección'), t => t === '(1,78, 1,78, 0,89)');
  await chip(w, 'Perpendiculares'); chk('esc: perpendiculares u·v=0', await lec(w, 'u · v'), '0'); chk('esc: ángulo 90°', await lec(w, 'Ángulo'), t => /^90/.test(t));
  await chip(w, 'Obtuso'); chk('esc: obtuso u·v=−3', await lec(w, 'u · v'), '−3'); chk('esc: obtuso nota', await w.locator('.w-pie').innerText(), t => /obtuso/.test(t));
  await chip(w, 'Paralelos'); chk('esc: paralelos ángulo 0', await lec(w, 'Ángulo'), t => /^0/.test(t));
  await rango(w, 0, 3); chk('esc: slider u_x=3 → u·v=16', await lec(w, 'u · v'), '16');
  const antes = await trazo(w);
  await rango(w, 6, 90); await p.waitForTimeout(60);
  chk('esc: el giro cambia el dibujo', (await trazo(w)) !== antes, true);
  chk('esc: etiqueta del giro 90°', await giro(w), t => /90/.test(t));
  const caja = await w.locator('svg.plot').boundingBox();
  await p.mouse.move(caja.x + 100, caja.y + 100); await p.mouse.down(); await p.mouse.move(caja.x + 200, caja.y + 100, { steps: 4 }); await p.mouse.up(); await p.waitForTimeout(60);
  chk('esc: arrastrar gira (Giro ≠ 90°)', await giro(w), t => !/^90/.test(t.trim()));
  await chip(w, 'Vista inicial'); chk('esc: vista inicial 35°', await giro(w), t => /35/.test(t));
  await chip(w, 'u × v'); chk('modo → u × v: arranca con (1, −2, 4)', await lec(w, 'u × v'), '(1, −2, 4)');
  await chip(w, '[u, v, w]'); chk('modo → mixto: det 8', await lec(w, '[u, v, w]'), '8');
  chk('modo mixto: 9 deslizadores de componentes + 2 de vista', await w.locator('input[type=range]').count(), 11);

  // ---------- vec_3d, modo vectorial (segunda instancia) ----------
  w = W('vec_3d', 1); await w.scrollIntoViewIfNeeded();
  chk('cruz: u × v', await lec(w, 'u × v'), '(1, −2, 4)');
  chk('cruz: área = √21', await lec(w, '|u × v|'), t => /^√21 ≈ 4,58$/.test(t));
  chk('cruz: área del triángulo', await lec(w, 'Área del triángulo'), '2,29');
  chk('cruz: u·(u×v) = 0', await lec(w, 'u · (u × v)'), '0'); chk('cruz: v·(u×v) = 0', await lec(w, 'v · (u × v)'), '0');
  await chip(w, 'Intercambio'); chk('cruz: v × u = −(u × v)', await lec(w, 'u × v'), '(−1, 2, −4)');
  await chip(w, 'Perpendiculares'); chk('cruz: (2,0,0)×(0,3,0) = (0,0,6)', await lec(w, 'u × v'), '(0, 0, 6)'); chk('cruz: área 6', await lec(w, '|u × v|'), t => /^6 ≈ 6$/.test(t));
  await chip(w, 'Paralelos'); chk('cruz: paralelos → (0,0,0)', await lec(w, 'u × v'), '(0, 0, 0)'); chk('cruz: paralelos aviso', await w.locator('.w-pie').innerText(), t => /paralelos/.test(t));
  chk('cruz: paralelos → 2 puntas', await w.locator('svg.plot .p-punta').count(), 2);
  await chip(w, 'Ejemplo'); chk('cruz: hay 3 puntas de flecha', await w.locator('svg.plot .p-punta').count(), 3);

  // ---------- vec_3d, modo mixto (tercera instancia) ----------
  w = W('vec_3d', 2); await w.scrollIntoViewIfNeeded();
  chk('mixto: det 8', await lec(w, '[u, v, w]'), '8'); chk('mixto: volumen 8', await lec(w, 'Volumen del paralelepípedo'), '8'); chk('mixto: tetraedro 1,33', await lec(w, 'Volumen del tetraedro'), '1,33');
  chk('mixto: orientación directa', await lec(w, 'Orientación'), t => /directa/.test(t));
  chk('mixto: 6 caras', await w.locator('svg.plot .p-zona').count(), 6);
  await chip(w, 'Caja'); chk('mixto: caja 2·3·2 = 12', await lec(w, '[u, v, w]'), '12');
  await chip(w, 'Coplanarios'); chk('mixto: coplanarios 0', await lec(w, '[u, v, w]'), '0'); chk('mixto: coplanarios texto', await lec(w, 'Orientación'), t => /coplanarios/.test(t));
  await chip(w, 'Orientación inversa'); chk('mixto: inversa −8', await lec(w, '[u, v, w]'), '−8'); chk('mixto: inversa texto', await lec(w, 'Orientación'), t => /inversa/.test(t));
  chk('mixto: volumen sigue positivo', await lec(w, 'Volumen del paralelepípedo'), '8');
  await rango(w, 8, 2); chk('mixto: w_z=2 con w=(0,1,2): det 8', await lec(w, '[u, v, w]'), '8');

  // ---------- vec_param ----------
  w = W('vec_param'); await w.scrollIntoViewIfNeeded();
  chk('param: coplanarios, raíces 1 y 2 como botones', await w.locator('[data-raiz] .chip-btn').allInnerTexts(), t => t.length === 2 && /1/.test(t[0]) && /2/.test(t[1]));
  await chip(w, 'm = 2'); chk('param: m=2 → [u,v,w]=0', await lec(w, '[u, v, w]'), '0'); chk('param: m=2 rango 2', await lec(w, 'Rango'), '2'); chk('param: m=2 conclusión', await lec(w, 'Conclusión'), t => /coplanarios/.test(t));
  await chip(w, 'm = 1'); chk('param: m=1 → 0', await lec(w, '[u, v, w]'), '0');
  await rango(w, 0, 3); chk('param: m=3 → −2', await lec(w, '[u, v, w]'), '−2'); chk('param: m=3 forman base', await lec(w, 'Conclusión'), t => /base/.test(t));
  await chip(w, 'Perpendiculares'); await rango(w, 0, 3); chk('param ⟂: m=3 → u·v = 9−4 = 5', await lec(w, 'u · v'), '5');
  await chip(w, 'm = −2'); chk('param ⟂: m=−2 → 0', await lec(w, 'u · v'), '0'); chk('param ⟂: conclusión', await lec(w, 'Conclusión'), t => /perpendiculares/.test(t));
  await chip(w, 'Base de ℝ³'); await chip(w, 'm = 0'); chk('param base: m=0 → det 0', await lec(w, '[u, v, w]'), '0'); chk('param base: rango 2', await lec(w, 'Rango'), '2');
  await chip(w, 'm = √2'); chk('param base: m=√2 → det 0', await lec(w, '[u, v, w]'), '0');
  await rango(w, 0, 1); chk('param base: m=1 → det −1', await lec(w, '[u, v, w]'), '−1'); chk('param base: rango 3', await lec(w, 'Rango'), '3');
  await chip(w, 'Área'); chk('param área: sin botones de raíz', await w.locator('[data-raiz]').evaluate(e => getComputedStyle(e).display), 'none');
  await rango(w, 0, 2); chk('param área: m=2 → |u×v|² = 16+4+1 = 21', await lec(w, '|u × v|²'), '21');

  // ---------- vec_calc ----------
  w = W('vec_calc'); await w.scrollIntoViewIfNeeded();
  chk('calc: u·v = 8', await lec(w, 'u · v'), '8'); chk('calc: u × v', await lec(w, 'u × v'), '(7, 10, −9)'); chk('calc: [u,v,w] = 1', await lec(w, '[u, v, w]'), '1'); chk('calc: rango 3', await lec(w, 'Rango'), '3');
  chk('calc: pasos visibles', await w.locator('.vc-pasos li').count(), 8);
  await chip(w, 'Coplanarios'); chk('calc: coplanarios [u,v,w] = 0', await lec(w, '[u, v, w]'), '0'); chk('calc: rango 2', await lec(w, 'Rango'), '2'); chk('calc: aviso coplanarios', await w.locator('.vc-pasos').innerText(), t => /coplanarios/.test(t));
  await chip(w, 'Caja'); chk('calc: caja 24', await lec(w, '[u, v, w]'), '24'); chk('calc: volumen del tetraedro 4', await w.locator('.vc-pasos').innerText(), t => /tetraedro = 4/.test(t));
  const inp = w.locator('input[type=number]');
  const vals = ['1', '1', '0', '1', '0', '1'];
  for (let i = 0; i < 6; i++) await inp.nth(i).fill(vals[i]);
  await p.waitForTimeout(60);
  chk('calc: escribir u=(1,1,0), v=(1,0,1) → u·v = 1', await lec(w, 'u · v'), '1'); chk('calc: ángulo 60°', await w.locator('.vc-pasos').innerText(), t => /60°/.test(t));
  await inp.nth(0).fill('0.5'); await p.waitForTimeout(60); chk('calc: decimales u=(0,5;1;0) → u·v = 0,5', await lec(w, 'u · v'), '0,5');
  await chip(w, 'Perpendiculares'); chk('calc: perpendiculares u·v=0', await lec(w, 'u · v'), '0'); chk('calc: aviso perpendiculares', await w.locator('.vc-pasos').innerText(), t => /perpendiculares/.test(t));

  chk('sin errores JS', errs.length, 0);
  console.log(mal ? mal + ' FALLOS de ' + n : 'todo bien · ' + n + ' comprobaciones');
  await b.close();
})();
