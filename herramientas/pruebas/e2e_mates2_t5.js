// Prueba de comportamiento (pulsando de verdad) de los tres simuladores del tema 5 de Matemáticas II (Puntos, rectas y planos).
// Uso: node herramientas/pruebas/e2e_mates2_t5.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates2', 't5');
  let mal = 0, n = 0;
  const W = (nm, i = 0) => p.locator(`#detail-t5 [data-w=${nm}]`).nth(i);
  const lec = async (w, rot) => w.locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const chip = async (w, texto) => { await w.locator('.chip-btn', { hasText: texto }).first().click(); await p.waitForTimeout(40); };
  const rango = async (w, i, v) => { await w.locator('input[type=range]').nth(i).fill(String(v)); await p.waitForTimeout(40); };
  const trazo = async (w) => w.locator('svg.plot').first().innerHTML();
  const giro = async (w) => w.locator('label', { hasText: 'Giro' }).locator('.sl-v').innerText();
  const par = async (w) => [await lec(w, 'rango {u, v}'), await lec(w, 'rango {u, v, AQ}')].join();

  // ---------- esp_rectas ----------
  let w = W('esp_rectas'); await w.scrollIntoViewIfNeeded();
  chk('rectas: arranca cruzándose', await lec(w, 'Posición'), 'cruzan');
  chk('rectas: det = −2', await lec(w, 'det'), '−2');
  chk('rectas: rangos 2 y 3', await par(w), '2,3');
  chk('rectas: no hay punto de corte', await lec(w, 'Punto de corte'), null);
  await chip(w, 'Se cortan'); chk('rectas: cortan', await lec(w, 'Posición'), 'secantes'); chk('rectas: punto (2, 1, 1)', await lec(w, 'Punto de corte'), '(2, 1, 1)'); chk('rectas: det 0', await lec(w, 'det'), '0');
  chk('rectas: rangos 2 y 2', await par(w), '2,2');
  await chip(w, 'Paralelas'); chk('rectas: paralelas', await lec(w, 'Posición'), 'paralelas'); chk('rectas: rangos 1 y 2', await par(w), '1,2');
  await chip(w, 'Coincidentes'); chk('rectas: coincidentes', await lec(w, 'Posición'), 'coincidentes'); chk('rectas: rangos 1 y 1', await par(w), '1,1');
  await chip(w, 'Se cortan'); await rango(w, 0, 3); chk('rectas: Q_x = 3 → se cruzan (det 1)', [await lec(w, 'Posición'), await lec(w, 'det')].join(), 'cruzan,1');
  await rango(w, 0, 2); chk('rectas: Q_x = 2 vuelve a cortar', await lec(w, 'Posición'), 'secantes');
  const antes = await trazo(w); await rango(w, 6, 90); await p.waitForTimeout(60);
  chk('rectas: el giro cambia el dibujo', (await trazo(w)) !== antes, true);
  const caja = await w.locator('svg.plot').boundingBox();
  await p.mouse.move(caja.x + 100, caja.y + 100); await p.mouse.down(); await p.mouse.move(caja.x + 200, caja.y + 100, { steps: 4 }); await p.mouse.up(); await p.waitForTimeout(60);
  chk('rectas: arrastrar gira', await giro(w), t => !/^90/.test(t.trim()));
  await chip(w, 'Vista inicial'); chk('rectas: vista inicial 35°', await giro(w), t => /35/.test(t));
  await chip(w, 'Paralelas'); await rango(w, 3, 0); await rango(w, 4, 0); await rango(w, 5, 0);
  chk('rectas: v nulo da aviso', await lec(w, 'Aviso'), t => /no es un vector director/.test(t));

  // ---------- esp_planos: recta y plano (primera instancia) ----------
  w = W('esp_planos', 0); await w.scrollIntoViewIfNeeded();
  chk('rp: secantes', await lec(w, 'Posición'), 'secantes'); chk('rp: v·n = 2', await lec(w, 'v · n'), '2');
  chk('rp: punto de corte (1, −1, 3)', await lec(w, 'Punto de corte'), '(1, −1, 3)'); chk('rp: t = 1', await lec(w, 'Valor de t'), '1');
  await chip(w, 'Paralelos'); chk('rp: paralelos', await lec(w, 'Posición'), t => /paralelos/.test(t)); chk('rp: v·n = 0', await lec(w, 'v · n'), '0');
  await chip(w, 'Recta contenida'); chk('rp: contenida', await lec(w, 'Posición'), t => /contenida/.test(t));
  await chip(w, 'Perpendiculares'); chk('rp: perpendiculares v·n = 3', await lec(w, 'v · n'), '3'); chk('rp: t = 2/3', await lec(w, 'Valor de t'), t => /2/.test(t) && /3/.test(t));
  await chip(w, 'Recta contenida'); await rango(w, 6, 3); chk('rp: d = 3 la hace paralela', await lec(w, 'Posición'), t => /paralelos/.test(t));
  await rango(w, 6, 1); chk('rp: d = 1 contenida otra vez', await lec(w, 'Posición'), t => /contenida/.test(t));
  const antes2 = await trazo(w); await rango(w, 7, 90); chk('rp: el giro cambia el dibujo', (await trazo(w)) !== antes2, true);
  await chip(w, 'Dos planos'); chk('modo → dos planos', await lec(w, 'Posición'), 'secantes'); chk('pp: recta común (3, −1, −2)', await lec(w, 'Recta común'), '(3, −1, −2)');
  await chip(w, 'Paralelos'); chk('pp: paralelos', await lec(w, 'Posición'), 'paralelos'); await chip(w, 'Coincidentes'); chk('pp: coincidentes', await lec(w, 'Posición'), 'coincidentes');
  await chip(w, 'Perpendiculares'); chk('pp: perpendiculares secantes', await lec(w, 'Posición'), 'secantes');
  await chip(w, 'Recta y plano'); chk('modo → recta y plano vuelve', await lec(w, 'v · n'), '2');

  // ---------- esp_planos: dos planos (segunda instancia) ----------
  w = W('esp_planos', 1); await w.scrollIntoViewIfNeeded();
  chk('pp(2): arranca en dos planos secantes', await lec(w, 'Posición'), 'secantes'); chk('pp(2): rango de normales 2', await lec(w, 'rango de (n₁, n₂)'), '2');
  await rango(w, 3, 2); await rango(w, 4, 2); await rango(w, 5, 2); await rango(w, 6, 6); chk('pp(2): n₂ = (2,2,2), d = 6 → coincidentes', await lec(w, 'Posición'), 'coincidentes');
  await rango(w, 6, 5); chk('pp(2): d = 5 → paralelos', await lec(w, 'Posición'), 'paralelos');
  await rango(w, 3, 0); await rango(w, 4, 0); await rango(w, 5, 0); chk('pp(2): n nulo da aviso', await lec(w, 'Aviso'), t => /no define un plano/.test(t));

  // ---------- esp_formas: recta ----------
  w = W('esp_formas', 0); await w.scrollIntoViewIfNeeded();
  const eqs = async () => w.locator('.esp-eqs').innerText();
  chk('formas: 5 filas de resultado', await w.locator('.esp-eqs li').count(), 5);
  chk('formas: paramétricas del ejemplo', await eqs(), t => /x = 1 \+ 2t/.test(t) && /y = 2 \+ t/.test(t) && /z = 3 − t/.test(t));
  chk('formas: n₁ × n₂ ∥ v', await lec(w, 'n₁ × n₂'), 'sí');
  const inp = w.locator('input[type=number]');
  await inp.nth(4).fill('0'); await p.waitForTimeout(60);
  chk('formas: v_y = 0 → aviso de componente nula', await eqs(), t => /y = 2/.test(t) && /componente de v es 0/.test(t));
  await inp.nth(3).fill('0'); await inp.nth(4).fill('0'); await inp.nth(5).fill('0'); await p.waitForTimeout(60);
  chk('formas: v nulo da aviso', await lec(w, 'Aviso'), t => /no puede ser nulo/.test(t));
  await chip(w, 'Eje OZ'); chk('formas: eje OZ → director (0, 0, 1)', await lec(w, 'Director v'), '(0, 0, 1)');
  chk('formas: eje OZ: implícita con x = 0 e y = 0', await eqs(), t => /x = 0/.test(t) && /y = 0/.test(t));
  await chip(w, 'Plano por tres'); chk('formas: modo plano del ejemplo', await lec(w, 'Plano'), 'x − y + z − 3 = 0');
  await chip(w, 'Puntos en los ejes'); chk('formas: plano x+y+z−1 = 0', await lec(w, 'Plano'), 'x + y + z − 1 = 0');
  await chip(w, 'Alineados'); chk('formas: alineados da aviso', await lec(w, 'Aviso'), t => /alineados/.test(t));
  // segunda instancia ya en modo plano
  w = W('esp_formas', 1); await w.scrollIntoViewIfNeeded();
  chk('formas(2): arranca en plano', await lec(w, 'Plano'), 'x − y + z − 3 = 0');
  await w.locator('input[type=number]').nth(0).fill('2'); await p.waitForTimeout(60);
  chk('formas(2): cambiar A_x = 2 cambia el plano', await lec(w, 'Plano'), t => t !== 'x − y + z − 3 = 0');

  chk('sin errores JS', errs.length, 0);
  console.log(mal ? mal + ' FALLOS de ' + n : 'todo bien · ' + n + ' comprobaciones');
  await b.close();
})();
