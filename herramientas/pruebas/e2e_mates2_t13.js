// Prueba de comportamiento (pulsando de verdad) de los simuladores del tema 13 de Matemáticas II
// (m2_venn_prob, m2_total_bayes) y de un control de cada widget reutilizado de Matemáticas I
// (m13_contingencia, m13_bayes, m13_urna).
// Uso: node herramientas/pruebas/e2e_mates2_t13.js [movil]
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv[2] === 'movil';
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  await abrirTema(p, 'mates2', 't13');
  let mal = 0, n = 0;
  const W = (nm, i = 0) => p.locator(`#detail-t13 [data-w=${nm}]`).nth(i);
  const lec = async (w, rot) => w.locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const chip = async (w, texto) => { await w.locator('.chip-btn', { hasText: texto }).first().click(); await p.waitForTimeout(80); };
  const rango = async (w, i, v) => { await w.locator('input[type=range]').nth(i).fill(String(v)); await p.waitForTimeout(80); };
  const sinDesborde = async () => p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);

  // ---------- m2_venn_prob ----------
  let w = W('m2_venn_prob'); await w.scrollIntoViewIfNeeded();
  chk('venn: arranca con P(A ∪ B) = 0,70', await lec(w, 'P(A ∪ B)'), '0,7');
  chk('venn: independientes de entrada', await lec(w, '¿Independientes'), t => /^sí/.test(t));
  chk('venn: ninguno = 0,30', await lec(w, 'P(Ā ∩ B̄)'), '0,3');
  chk('venn: P(A | B) = 0,5', await lec(w, 'P(A | B)'), '0,5');
  await chip(w, 'Incompatibles');
  chk('venn: incompatibles, P(A ∩ B) = 0', await lec(w, 'P(A ∩ B)'), '0');
  chk('venn: incompatibles ⟹ marca incompatibles', await lec(w, '¿Incompatibles'), t => /^sí/.test(t));
  chk('venn: incompatibles ⟹ no independientes', await lec(w, '¿Independientes'), t => /^no/.test(t));
  chk('venn: unión 0,70 (0,3 + 0,4)', await lec(w, 'P(A ∪ B)'), '0,7');
  await chip(w, 'A dentro de B');
  chk('venn: A ⊂ B, P(B | A) = 1', await lec(w, 'P(B | A)'), '1');
  chk('venn: A ⊂ B, unión = P(B) = 0,50', await lec(w, 'P(A ∪ B)'), '0,5');
  await w.locator('.chip-btn', { hasText: /^Dependientes$/ }).click(); await p.waitForTimeout(80);            // 0,60 / 0,50 / 0,40
  chk('venn: dependientes, exactamente uno = 0,30', await lec(w, 'Exactamente uno'), '0,3');
  // La intersección queda acotada: bajar P(B) a 0,30 obliga a P(A ∩ B) ≤ 0,30
  await rango(w, 1, 30);
  chk('venn: al bajar P(B), P(A ∩ B) se recorta a 0,30', await lec(w, 'P(A ∩ B)'), '0,3');
  chk('venn: rango máximo del deslizador de la intersección', await w.locator('input[type=range]').nth(2).getAttribute('max'), '30');
  await rango(w, 0, 90); await rango(w, 1, 80);   // la intersección mínima pasa a ser 0,70
  chk('venn: P(A) = 0,9 y P(B) = 0,8 fuerzan P(A ∩ B) ≥ 0,70', await lec(w, 'P(A ∩ B)'), '0,7');
  chk('venn: aviso de rango', await w.locator('.m2p-aviso').innerText(), t => /entre 0,7 y 0,8/.test(t));
  await chip(w, 'Independientes');
  await chip(w, 'Exactamente uno');
  chk('venn: «exactamente uno» ilumina 2 regiones', await w.locator('.m13-reg').count(), 2);
  chk('venn: lectura de la operación', await lec(w, 'Región iluminada'), t => /^0,5 /.test(t));
  await chip(w, 'Ninguno');
  chk('venn: «ninguno» ilumina el universo', await w.locator('.m13-reg').count(), 1);
  await chip(w, 'A ∪ B');
  chk('venn: «al menos uno» ilumina 3 regiones', await w.locator('.m13-reg').count(), 3);
  chk('venn: sin desborde', await sinDesborde(), true);

  // ---------- m2_total_bayes ----------
  w = W('m2_total_bayes'); await w.scrollIntoViewIfNeeded();
  chk('árbol: P(B₃) = 0,2', await lec(w, 'P(B₃)'), '0,2');
  chk('árbol: total 0,031', await lec(w, 'Total'), t => /= 0,031$/.test(t));
  chk('árbol: Bayes M₃ = 12/31', await lec(w, 'Bayes: P(B₃'), t => /= 0,3871$/.test(t));
  chk('árbol: 6 hojas, 2 resaltadas ×3 (las de A)', await w.locator('.m2p-hoja.sel').count(), 3);
  await chip(w, 'Dado Ā');
  chk('árbol: dado Ā, el denominador es P(Ā) = 0,969', await lec(w, 'Bayes: P(B₁'), t => /0,969/.test(t));
  chk('árbol: dado Ā, P(M₁ | Ā) = 0,5057', await lec(w, 'Bayes: P(B₁'), t => /= 0,5057$/.test(t));
  await chip(w, 'Dado A');
  await chip(w, 'Solo dos');
  chk('árbol: dos máquinas, total 0,032', await lec(w, 'Total'), t => /= 0,032$/.test(t));
  chk('árbol: dos máquinas, P(M₂ | D) = 0,625', await lec(w, 'Bayes: P(B₂'), t => /= 0,625$/.test(t));
  chk('árbol: dos máquinas, B₃ sin fila de Bayes', await w.locator('.lec', { hasText: 'Bayes: P(B₃' }).count(), 0);
  await chip(w, 'A no depende');
  chk('árbol: independiente, posterior = prior', await lec(w, 'Bayes: P(B₁'), t => /= 0,5$/.test(t));
  await chip(w, 'Test por grupos');
  chk('árbol: edades, total 0,0230', await lec(w, 'Total'), t => /= 0,023$/.test(t));
  // mover deslizadores: P(B₁) = 80 ⟹ P(B₂) se recorta a 20, P(B₃) = 0
  await rango(w, 0, 80);
  chk('árbol: P(B₁) = 80 deja P(B₃) = 0,0000 o más', await lec(w, 'P(B₃)'), t => /^0(,\d+)?$/.test(t));
  await rango(w, 0, 60); await rango(w, 1, 30);
  await rango(w, 2, 0); await rango(w, 3, 0); await rango(w, 4, 100);
  chk('árbol: con q = (0, 0, 1) toda la A viene de B₃: Bayes 1', await lec(w, 'Bayes: P(B₃'), t => /= 1$/.test(t));
  chk('árbol: sin desborde', await sinDesborde(), true);

  // ---------- widgets reutilizados de Matemáticas I ----------
  w = W('m13_contingencia'); await w.scrollIntoViewIfNeeded();
  chk('contingencia: monta con la tabla', await w.locator('input[type=number]').count(), 4);
  await w.locator('input[type=number]').nth(0).fill('20'); await p.waitForTimeout(80);
  chk('contingencia: cambiar una casilla cambia P(A ∩ B)', await lec(w, 'P(A ∩ B)'), t => /^2\/51 = 0,0392/.test(t));
  w = W('m13_bayes'); await w.scrollIntoViewIfNeeded();
  chk('bayes 1000: positivo ⟹ ≈ 16 %', await lec(w, 'Si das positivo'), t => /16,1\d? %/.test(t));
  await rango(w, 0, 0.2);
  chk('bayes 1000: prevalencia 20 % sube el valor predictivo', await lec(w, 'Si das positivo'), t => /8\d,\d+ %/.test(t));
  w = W('m13_urna'); await w.scrollIntoViewIfNeeded();
  chk('urna: sin reposición, dos rojas 5/14', await lec(w, 'Las dos rojas'), t => /^5\/14/.test(t));
  await chip(w, 'Con reposición');
  chk('urna: con reposición, dos rojas 25/64', await lec(w, 'Las dos rojas'), t => /^25\/64/.test(t));

  chk('sin errores JS', errs.length, 0);
  console.log(mal ? mal + ' FALLOS de ' + n : 'todo bien · ' + n + ' comprobaciones');
  await b.close();
})();
