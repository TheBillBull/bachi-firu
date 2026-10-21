// Comportamiento de los simuladores de fyq1 t3 (formulación y nomenclatura inorgánica):
//   node herramientas/pruebas/e2e_fyq1_t3.js [movil] [oscuro]
// 1) pruebas unitarias del normalizador de texto (B.normTexto) y del motor; 2) cada simulador: se opera como un alumno
// y se comprueba lo que muestra (los resultados esperados se calculan con el motor o están escritos a mano).
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const movil = process.argv.includes('movil'), oscuro = process.argv.includes('oscuro');
  const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 }, scheme: oscuro ? 'dark' : 'light' });
  await abrirTema(p, 'fyq1', 't3');
  let mal = 0, n = 0;
  const chk = (nm, got, esp) => { n++; const ok = typeof esp === 'function' ? esp(got) : got === esp; if (!ok) { mal++; console.log('FALLO', nm, '→', JSON.stringify(got).slice(0, 220), 'esperado', typeof esp === 'function' ? '(fn)' : JSON.stringify(esp)); } };
  const W = nm => p.locator(`#detail-t3 [data-w=${nm}]`).first();
  const ir = async nm => { await W(nm).scrollIntoViewIfNeeded(); };
  const lec = async (nm, rot) => W(nm).locator('.lec').evaluateAll((els, r) => { const e = els.find(x => x.querySelector('small').textContent.startsWith(r)); return e ? e.querySelector('b').innerText.replace(/\s+/g, ' ').trim() : null; }, rot);
  const chip = async (nm, sel, texto) => { const c = W(nm).locator(sel + ' .chip-btn').filter({ hasText: texto }).first(); await c.click(); await p.waitForTimeout(60); };

  // ---------------------------------------------------------------- 1. normalizador
  const unit = await p.evaluate(() => {
    const N = BACHI.normTexto, o = [];
    const eq = (a, c, f, esp) => o.push([a + ' ~ ' + c, (N(a, f) === N(c, f)) === esp]);
    eq('H2SO4', 'H₂SO₄', true, true); eq('Fe2(SO4)3', ' Fe₂ (SO₄)₃ ', true, true); eq('Fe3+', 'Fe³⁺', true, true); eq('Fe+3', 'Fe^3+', true, true); eq('SO42-', 'SO₄²⁻', true, true); eq('SO4 2-', 'SO₄²−', true, true);
    eq('CO', 'Co', true, false); eq('CO', 'co', true, false); eq('HCl(aq)', 'HCl', true, true); eq('NH4+', 'NH₄⁺', true, true); eq('Na+', 'Na+', true, true);
    eq('Óxido de Hierro (III)', 'oxido de hierro(III)', false, true); eq('ÁCIDO sulfúrico', 'acido sulfurico', false, true); eq('trióxido de  dihierro', 'trioxido de dihierro', false, true);
    eq('tris (tetraoxidosulfato) de dihierro', 'tris(tetraoxidosulfato) de dihierro', false, true); eq('óxido de hierro(II)', 'óxido de hierro(III)', false, false); eq('cloruro de sodio.', 'cloruro de sodio', false, true);
    eq('ion hierro(3+)', 'ion hierro(3−)', false, false); eq('ion hierro(3+)', 'Ion Hierro (3+)', false, true); eq('NaCl', 'NaCL', true, false);
    return o;
  });
  unit.forEach(([nm, ok]) => chk('normTexto ' + nm, ok, true));

  // ---------------------------------------------------------------- 2. cruce de valencias
  await ir('q3_cruce');
  chk('cruce inicial Fe+3 SO4', await lec('q3_cruce', 'Fórmula'), 'Fe₂(SO₄)₃');
  chk('cruce sistemática', await lec('q3_cruce', 'Sistemática'), 'tris(tetraoxidosulfato) de dihierro');
  chk('cruce Stock', await lec('q3_cruce', 'Stock'), 'sulfato de hierro(III)'); chk('cruce tradicional', await lec('q3_cruce', 'Tradicional'), 'sulfato férrico');
  await chip('q3_cruce', '[data-val]', '+2'); chk('cruce Fe+2 SO4', await lec('q3_cruce', 'Fórmula'), 'FeSO₄');
  await chip('q3_cruce', '[data-cat]', 'Ca'); await chip('q3_cruce', '[data-an]', 'OH⁻'); chk('cruce Ca(OH)2', await lec('q3_cruce', 'Fórmula'), 'Ca(OH)₂'); chk('cruce hidróxido: familia', await lec('q3_cruce', 'Familia'), 'Hidróxidos');
  await chip('q3_cruce', '[data-cat]', 'Cu'); await chip('q3_cruce', '[data-val]', '+1'); await chip('q3_cruce', '[data-an]', 'O²⁻'); chk('cruce Cu2O', await lec('q3_cruce', 'Fórmula'), 'Cu₂O'); chk('cruce Cu2O trad', await lec('q3_cruce', 'Tradicional'), 'óxido cuproso');
  await chip('q3_cruce', '[data-cat]', 'Al'); await chip('q3_cruce', '[data-an]', 'PO₄³⁻'); chk('cruce AlPO4 (se simplifica 3 y 3)', await lec('q3_cruce', 'Fórmula'), 'AlPO₄');
  await chip('q3_cruce', '[data-cat]', 'Na'); await chip('q3_cruce', '[data-an]', 'O₂²⁻'); chk('cruce peróxido Na2O2', await lec('q3_cruce', 'Fórmula'), 'Na₂O₂');
  await chip('q3_cruce', '[data-cat]', 'NH₄'); await chip('q3_cruce', '[data-an]', 'SO₄²⁻'); chk('cruce amonio (NH4)2SO4', await lec('q3_cruce', 'Fórmula'), '(NH₄)₂SO₄');

  // ---------------------------------------------------------------- 3. ajuste de cargas
  const aj = W('q3_ajuste').first();
  await ir('q3_ajuste');
  const ajl = async rot => lec('q3_ajuste', rot);
  chk('ajuste inicial Na/Cl neutro', await ajl('Estado'), 'Neutro y mínimo ✓');
  for (let i = 0; i < 40; i++) {                       // pulsa «Nuevo reto» hasta que salga Al/O, y lo resuelve con +/−
    const cab = await aj.locator('[data-nc]').innerText();
    if (/Al/.test(cab) && /O²/.test(await aj.locator('[data-na]').innerText())) break;
    await aj.locator('[data-nuevo]').click();
  }
  const cabAj = await aj.locator('[data-nc]').innerText();
  if (/Al/.test(cabAj)) {
    chk('ajuste reto Al/O: no neutro al principio', await ajl('Carga total'), t => t !== '0');
    await aj.locator('[data-pc2]').click(); await aj.locator('[data-pa2]').click(); await aj.locator('[data-pa2]').click();
    chk('ajuste Al/O con 2 y 3: neutro y mínimo', await ajl('Estado'), 'Neutro y mínimo ✓'); chk('ajuste fórmula Al2O3', await ajl('Fórmula'), 'Al₂O₃');
    await aj.locator('[data-pc2]').click(); await aj.locator('[data-pc2]').click(); await aj.locator('[data-pa2]').click(); await aj.locator('[data-pa2]').click(); await aj.locator('[data-pa2]').click();
    chk('ajuste 4 Al y 6 O: neutro pero simplificable', await ajl('Estado'), 'Neutro, pero se puede simplificar');
  }

  // ---------------------------------------------------------------- 4. números de oxidación
  await ir('q3_noxid');
  const noxid = W('q3_noxid');
  await noxid.locator('input').nth(1).fill('H2SO4'); await noxid.locator('input').nth(1).press('Enter'); await p.waitForTimeout(80);
  chk('noxid H2SO4 pasos', await noxid.locator('.q3-sol').innerText(), t => /\+6/.test(t) && /2·\(\+1\)/.test(t));
  for (let i = 0; i < 12; i++) {                        // 12 retos aleatorios: se resuelven con el motor
    await noxid.locator('button').filter({ hasText: 'Otro compuesto' }).click();
    const r = await p.evaluate(() => { const F = BACHI.lab.formulacion, tx = document.querySelector('#detail-t3 [data-w=q3_noxid] .q3-prob b.q3-big').innerText, c = F.hallar(BACHI.normTexto(tx, true)); const el = /\(([A-Za-z]+)\)<\/b>/.exec(document.querySelector('#detail-t3 [data-w=q3_noxid] .q3-prob').innerHTML)[1]; return { f: c.f, x: F.ecuacionOx(c, el).x }; });
    await noxid.locator('input').first().fill((r.x > 0 ? '+' : '') + r.x); await noxid.locator('button').filter({ hasText: 'Comprobar' }).click(); await p.waitForTimeout(40);
    chk('noxid reto ' + r.f, await noxid.locator('.lec').nth(2).innerText(), t => /Correcto/.test(t));
  }

  // ---------------------------------------------------------------- 5. oxoácidos
  await ir('q3_oxoacidos');
  chk('oxoácidos Cl +7', await lec('q3_oxoacidos', 'Tradicional'), 'ácido perclórico'); chk('oxoácidos Cl: sistemática', await lec('q3_oxoacidos', 'Sistemática'), 'tetraoxidoclorato de hidrógeno');
  await chip('q3_oxoacidos', '[data-ox]', '+1'); chk('oxoácidos Cl +1', await lec('q3_oxoacidos', 'Tradicional'), 'ácido hipocloroso');
  await chip('q3_oxoacidos', '[data-el]', 'P'); chk('oxoácidos P +5 orto', await lec('q3_oxoacidos', 'Tradicional'), 'ácido fosfórico');
  await W('q3_oxoacidos').locator('[data-h] .chip-btn').nth(1).click(); chk('oxoácidos P +5 meta', await lec('q3_oxoacidos', 'Tradicional'), 'ácido metafosfórico');
  chk('oxoácidos ecuación P2O5', await W('q3_oxoacidos').locator('.q3-ec').innerText(), t => /P₂O₅/.test(t) && /HPO₃/.test(t));
  await chip('q3_oxoacidos', '[data-el]', 'S'); chk('oxoácidos S +6', await lec('q3_oxoacidos', 'Tradicional'), 'ácido sulfúrico');

  // ---------------------------------------------------------------- 6. del ácido a la sal
  await ir('q3_sales');
  chk('sales H2SO4 + Na', await lec('q3_sales', 'Sal'), 'Na₂SO₄');
  await chip('q3_sales', '[data-ac]', 'H₃PO₄'); chk('sales H3PO4 − 3 H + Na', await lec('q3_sales', 'Sal'), 'Na₃PO₄');
  await chip('q3_sales', '[data-nh]', '2'); chk('sales H3PO4 − 2 H: Na2HPO4', await lec('q3_sales', 'Sal'), 'Na₂HPO₄'); chk('sales tipo sal ácida', await lec('q3_sales', 'Tipo'), 'Sales ácidas');
  await chip('q3_sales', '[data-me]', 'Ca'); chk('sales CaHPO4', await lec('q3_sales', 'Sal'), 'CaHPO₄'); chk('sales nombre', await lec('q3_sales', 'Stock'), 'hidrogenofosfato de calcio');

  // ---------------------------------------------------------------- 7. entrenador: se contesta con el motor
  // el entrenador se contesta leyendo el enunciado y calculando la respuesta con el motor
  const entrenar = async (ref, rondas) => {
    const host = p.locator('#detail-t3 [data-w=q3_entrenador]').nth(ref);
    await host.scrollIntoViewIfNeeded();
    for (let i = 0; i < rondas; i++) {
      const info = await p.evaluate(({ ref }) => {
        const host = document.querySelectorAll('#detail-t3 [data-w=q3_entrenador]')[ref], F = BACHI.lab.formulacion;
        const big = host.querySelector('.q3-prob .q3-big').innerText, txt = host.querySelector('.q3-prob').innerText, fn = /^Nombra/.test(txt);
        const sisT = /sistem/.test(txt) ? 'sist' : /Stock/i.test(txt) ? 'stock' : /tradicional/.test(txt) ? 'trad' : 'any';
        let r, resp;
        if (fn) { r = F.hallar(BACHI.normTexto(big, true)); resp = sisT === 'any' ? F.todosNombres(r)[0] : F.nombres(r, sisT)[0]; }
        else { const c = F.porNombre(big); r = c.filter(x => F.compruebaNombre(x, sisT === 'any' ? 'any' : sisT, big))[0] || c[0]; resp = r.f; }
        return { fn, f: r ? r.f : null, resp, big, txt: txt.slice(0, 80) };
      }, { ref });
      const inp = host.locator('input').first();
      await inp.fill(info.resp); await host.locator('button').filter({ hasText: 'Comprobar' }).click(); await p.waitForTimeout(25);
      chk(`entrenador[${ref}] acierta ${info.f} (${info.fn ? 'f→n' : 'n→f'})`, await host.locator('.lectura').innerText(), t => /Correcto/.test(t));
      if (i % 3 === 2) {                                   // una respuesta mala de vez en cuando: no debe romper el diagnóstico
        await host.locator('button').filter({ hasText: 'Otro' }).first().click(); await p.waitForTimeout(20);
        const malas = ['xyz', 'NaCl', 'óxido de sodio', 'Fe2O3', 'ácido sulfúrico', 'H2SO4', 'cloruro de hierro(III)', 'Ca(OH)2', 'dihidróxido de calcio', '', 'CO', 'Co'];
        await inp.fill(malas[(i * 7) % malas.length]); await host.locator('button').filter({ hasText: 'Comprobar' }).click(); await p.waitForTimeout(20);
        chk('entrenador respuesta mala: mensaje', await host.locator('.lectura').innerText(), t => /Todavía no|Escribe algo|Correcto/.test(t));
      }
      await host.locator('button').filter({ hasText: 'Otro' }).first().click(); await p.waitForTimeout(20);
    }
  };
  await entrenar(0, 18);            // óxidos
  const nEntr = await p.locator('#detail-t3 [data-w=q3_entrenador]').count();
  for (const k of [2, 4, 5, 6, 7, nEntr - 1]) if (k < nEntr) await entrenar(k, 9);
  // modo examen: 10 preguntas y nota
  const last = p.locator('#detail-t3 [data-w=q3_entrenador]').nth(nEntr - 1);
  await last.scrollIntoViewIfNeeded(); await last.locator('[data-modo] .chip-btn').filter({ hasText: 'Examen' }).click();
  for (let i = 0; i < 10; i++) {
    const info = await p.evaluate(({ ref }) => {
      const host = document.querySelectorAll('#detail-t3 [data-w=q3_entrenador]')[ref], F = BACHI.lab.formulacion;
      const big = host.querySelector('.q3-prob .q3-big').innerText, txt = host.querySelector('.q3-prob').innerText, fn = /^Nombra/.test(txt);
      const sisT = /sistem/.test(txt) ? 'sist' : /Stock/i.test(txt) ? 'stock' : /tradicional/.test(txt) ? 'trad' : 'any';
      let r, resp;
      if (fn) { r = F.hallar(BACHI.normTexto(big, true)); resp = sisT === 'any' ? F.todosNombres(r)[0] : F.nombres(r, sisT)[0]; }
      else { const c = F.porNombre(big); r = c.filter(x => F.compruebaNombre(x, sisT === 'any' ? 'any' : sisT, big))[0] || c[0]; resp = r.f; }
      return { resp };
    }, { ref: nEntr - 1 });
    await last.locator('input').first().fill(i < 7 ? info.resp : 'mal'); await last.locator('button').filter({ hasText: 'Comprobar' }).click(); await p.waitForTimeout(20);
    await last.locator('button').filter({ hasText: /Siguiente|Ver mi nota/ }).click(); await p.waitForTimeout(20);
  }
  chk('examen: nota final 7 de 10', await last.locator('.q3-prob').innerText(), t => /7 de 10/.test(t) && /Examen terminado/.test(t));

  // ---------------------------------------------------------------- 8. comparador
  await ir('q3_comparador');
  chk('comparador inicial Na2O', await W('q3_comparador').locator('.q3-form .q3-big').innerText(), 'Na₂O');
  await W('q3_comparador').locator('input').fill('Fe2O3'); await W('q3_comparador').locator('input').press('Enter'); await p.waitForTimeout(60);
  chk('comparador Fe2O3: tres sistemas', await W('q3_comparador').locator('.q3-tres').innerText(), t => /trióxido de dihierro/.test(t) && /óxido de hierro\(III\)/.test(t) && /óxido férrico/.test(t));
  await chip('q3_comparador', '[data-fam]', 'Oxoácidos'); await W('q3_comparador').locator('[data-co] .chip-btn').first().click();
  chk('comparador oxoácido: hay explicación', await W('q3_comparador').locator('.q3-expl').innerText(), t => /oxidación/.test(t));

  // ---------------------------------------------------------------- 9. ¿cuál es el error?
  await ir('q3_error');
  const er = W('q3_error');
  for (let i = 0; i < 40; i++) {
    const op = er.locator('.q3-op'); await op.nth(i % 4).click(); await p.waitForTimeout(15);
    chk('error: respuesta revisada', await er.locator('.lectura').innerText(), t => /Eso es|No era eso/.test(t));
    chk('error: una opción marcada correcta', await er.locator('.q3-op.ok').count(), 1);
    await er.locator('[data-sig]').click(); await p.waitForTimeout(10);
  }

  // ---------------------------------------------------------------- 10. parejas
  await ir('q3_pares');
  const pr = W('q3_pares');
  for (const [sis, fam] of [['Stock', 'Mezcla'], ['Sistemática', 'Óxidos'], ['Tradicional', 'Oxoácidos'], ['Stock', 'Oxisales']]) {
    await pr.locator('[data-sis] .chip-btn').filter({ hasText: sis }).first().click(); await pr.locator('[data-fam] .chip-btn').filter({ hasText: fam }).first().click(); await p.waitForTimeout(40);
    const fs = await pr.locator('[data-izq] .q3-pc').evaluateAll(l => l.map(x => x.getAttribute('data-f')));
    for (const f of fs) { await pr.locator(`[data-izq] .q3-pc[data-f="${f.replace(/"/g, '\\"')}"]`).click(); await pr.locator(`[data-der] .q3-pc[data-f="${f.replace(/"/g, '\\"')}"]`).click(); }
    chk(`parejas ${sis}/${fam} completo`, await pr.locator('.lectura').innerText(), t => /¡Completo!/.test(t) && /Fallos\s*0/.test(t.replace(/\n/g, ' ')));
  }
  await pr.locator('[data-nuevo]').click(); await pr.locator('[data-izq] .q3-pc').first().click(); await pr.locator('[data-der] .q3-pc').nth(5).click(); await p.waitForTimeout(40);
  chk('parejas: un fallo se cuenta (o acierto casual)', await pr.locator('.lectura').innerText(), t => /Fallos\s*[01]/.test(t.replace(/\n/g, ' ')));

  // ---------------------------------------------------------------- 11. familias
  await ir('q3_familia');
  const fa = W('q3_familia');
  for (let i = 0; i < 20; i++) {
    const fam = await p.evaluate(() => { const F = BACHI.lab.formulacion, host = document.querySelector('#detail-t3 [data-w=q3_familia]'); return F.hallar(BACHI.normTexto(host.querySelector('.q3-prob .q3-big').innerText, true)).fam; });
    if (i % 4 === 3) { await fa.locator('.q3-op').first().click(); } else await fa.locator(`.q3-op[data-f="${fam}"]`).click();
    await p.waitForTimeout(15);
    chk('familia: respuesta revisada', await fa.locator('.lectura').innerText(), t => /Correcto|No:/.test(t));
    await fa.locator('[data-sig]').click(); await p.waitForTimeout(10);
  }

  // ---------------------------------------------------------------- 12. árbol de decisión
  await ir('q3_decision');
  const de = W('q3_decision');
  for (let k = 0; k < 30; k++) {
    await de.locator('[data-prueba]').click();
    for (let paso = 0; paso < 8; paso++) {
      const si = await p.evaluate(() => {
        const F = BACHI.lab.formulacion, host = document.querySelector('#detail-t3 [data-w=q3_decision]');
        const f = F.hallar(BACHI.normTexto(host.querySelector('.q3-prob .q3-big').innerText, true)); const q = host.querySelectorAll('.q3-prob p')[1]; if (!q || /^Familia:/.test(q.innerText)) return null;
        const t = q.innerText, at = F.atomos(f.f) || {}, tieneMetal = Object.keys(at).some(s => F.MET[s] || s === 'NH4') || /NH4/.test(f.f), tieneO = !!at.O, tieneH = (at.H || 0) - (f.cat === 'NH4' ? 4 * f.nm : 0) > 0;
        if (/metal/i.test(t) && /amonio/.test(t)) return tieneMetal || /NH4/.test(f.f);
        if (/contiene.*oxígeno/i.test(t)) return tieneO; if (/hidrógeno\b/i.test(t) && /Contiene/i.test(t)) return tieneH;
        if (/OH/.test(t) && /hidroxilo/.test(t)) return f.fam === 'hidroxido'; if (/solo metal y oxígeno/i.test(t)) return f.fam === 'oxido' || f.fam === 'peroxido';
        if (/O₂/.test(t) && /peróxido/.test(t)) return f.fam === 'peroxido'; if (/solo al metal/i.test(t)) return f.fam === 'hidruroM';
        if (/H₂O o H₂O₂/.test(t)) return f.f === 'H2O' || f.f === 'H2O2'; if (/dos.*átomos de oxígeno/.test(t)) return f.f === 'H2O2'; if (/F, Cl, Br, I, S, Se o Te/.test(t)) return f.fam === 'hidracido';
        return false;
      });
      if (si === null) break;
      await de.locator('.ctl button').filter({ hasText: si ? 'Sí' : 'No' }).first().click(); await p.waitForTimeout(10);
    }
    chk('decisión: llega a la misma familia (' + k + ')', await de.locator('.lectura').innerText(), t => /Coincide/.test(t));
  }

  // ---------------------------------------------------------------- 13. tabla periódica
  await ir('q3_tabla');
  await W('q3_tabla').locator('.q3-el[data-s="Cl"]').click(); chk('tabla Cl: HClO4', await W('q3_tabla').locator('.q3-det').innerText(), t => /HClO₄/.test(t) && /perclórico/.test(t) && /\+7/.test(t));
  await W('q3_tabla').locator('.q3-el[data-s="Fe"]').click(); chk('tabla Fe: Fe2O3', await W('q3_tabla').locator('.q3-det').innerText(), t => /Fe₂O₃/.test(t) && /óxido férrico/.test(t));
  await W('q3_tabla').locator('.q3-el[data-s="Na"]').click(); chk('tabla Na: una sola valencia', await W('q3_tabla').locator('.q3-det').innerText(), t => /Una sola valencia/.test(t));
  await W('q3_tabla').locator('.q3-el[data-s="Ne"]').click(); chk('tabla Ne: gas noble', await W('q3_tabla').locator('.q3-det').innerText(), t => /Gas noble/.test(t));

  // ---------------------------------------------------------------- 14. línea del tiempo y generales
  await ir('q3_historia');
  chk('historia: 9 hitos', await W('q3_historia').locator('.q3-h').count(), 9);
  await W('q3_historia').locator('.q3-h').nth(2).click(); chk('historia: hito de Stock', await W('q3_historia').locator('.q3-hdet').innerText(), t => /Stock/.test(t) && /1919/.test(t));
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  chk('sin desborde horizontal', ov <= 0, true);
  console.log(`${n} comprobaciones · fallos: ${mal} · errores JS: ${errs.length ? errs : 'ninguno'}`);
  if (mal || errs.length) process.exitCode = 1;
  await b.close();
})();
