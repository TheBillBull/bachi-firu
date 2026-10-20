// Para cada ejercicio ampliado de un tema: rellena la respuesta CORRECTA según los datos y comprueba que el corrector la acepta.
// También valida la coherencia de test, tarjetas, emparejar, clasificar y orden.
const { lanzar } = require('./e2e_common.js');
(async () => {
  const [,, asig, ...temas] = process.argv;
  const { b, p, errs } = await lanzar();
  let malos = 0, total = 0;
  await p.click('[data-view=asignaturas]'); await p.locator(`#subjectGrid [data-goto-asig=${asig}]`).first().click(); await p.waitForTimeout(150);
  // coherencia de datos de actividades
  const incoh = await p.evaluate(([asig, temas]) => {
    const out = [];
    temas.forEach(t => {
      const d = (BACHI.ampl[asig] || {})[t]; if (!d) { out.push(t + ': SIN AMPLIACIÓN'); return; }
      Object.keys(d.datos || {}).forEach(k => {
        const x = d.datos[k];
        if (x.preguntas) x.preguntas.forEach((q, i) => { if (!(q.ok >= 0 && q.ok < q.op.length)) out.push(`${t}/${k} pregunta ${i + 1}: ok fuera de rango`); if (new Set(q.op).size !== q.op.length) out.push(`${t}/${k} pregunta ${i + 1}: opciones repetidas`); if (!q.porque) out.push(`${t}/${k} pregunta ${i + 1}: sin explicación`); });
        if (x.items && x.categorias) x.items.forEach((it, i) => { if (!(it.c >= 0 && it.c < x.categorias.length)) out.push(`${t}/${k} item ${i + 1}: categoría fuera de rango`); });
        if (x.pares) { const a = x.pares.map(p => p[0]), b = x.pares.map(p => p[1]); if (new Set(a).size !== a.length || new Set(b).size !== b.length) out.push(`${t}/${k}: pares repetidos`); }
        if (x.cartas) { const a = x.cartas.map(c => c.a); if (new Set(a).size !== a.length) out.push(`${t}/${k}: tarjetas con anverso repetido`); }
      });
      (d.ejercicios || []).forEach(e => { if (!e.id) out.push(t + ': ejercicio sin id'); if (!e.pasos || !e.pasos.length) out.push(`${t}/${e.id}: sin pasos`); if (!e.resultado) out.push(`${t}/${e.id}: sin resultado`); });
      const ids = (d.ejercicios || []).map(e => e.id); if (new Set(ids).size !== ids.length) out.push(t + ': ids de ejercicio repetidos');
    });
    return out;
  }, [asig, temas]);
  console.log(incoh.length ? 'INCOHERENCIAS:\n  ' + incoh.join('\n  ') : 'datos de actividades coherentes');
  malos += incoh.length;
  await p.click('.tab[data-panel=ejercicios]'); await p.waitForTimeout(300);
  for (const t of temas) {
    const lista = await p.evaluate(([asig, t]) => (BACHI.ampl[asig][t].ejercicios || []).map(e => ({ id: e.id, check: e.check })), [asig, t]);
    let ok = 0;
    for (const e of lista) {
      if (!e.check) continue; total++;
      const a = p.locator(`[data-bx="${asig}/${t}/${e.id}"]`); await a.scrollIntoViewIfNeeded();
      const campos = Array.isArray(e.check) ? e.check : [e.check];
      if (campos[0].tipo === 'rubrica') { await a.locator('button[type=submit]').click(); for (const cb of await a.locator('[data-rp]').all()) await cb.check(); }
      else {
        for (let i = 0; i < campos.length; i++) {
          const c = campos[i], el = a.locator(`[data-k="${i}"]`);
          if (c.tipo === 'opcion') await el.selectOption(String(c.ok));
          else if (c.tipo === 'num') await el.fill(String(c.valor).replace('.', ','));
          else if (c.tipo === 'expr') await el.fill(c.expr);
          else if (c.tipo === 'lista') await el.fill(c.valores.join(', ').replace(/\./g, ','));
        }
        await a.locator('button[type=submit]').click();
      }
      const r = await a.evaluate(el => el.classList.contains('resuelto'));
      if (r) ok++; else { malos++; console.log('  NO ACEPTA su propia respuesta:', t, e.id, JSON.stringify(e.check).slice(0, 120)); }
    }
    console.log(`${t}: ${ok}/${lista.filter(e => e.check).length} ejercicios aceptan su respuesta correcta`);
  }
  console.log(malos ? `PROBLEMAS: ${malos}` : 'todo coherente', '· errores JS:', errs.length ? errs : 'ninguno');
  await b.close();
})();
