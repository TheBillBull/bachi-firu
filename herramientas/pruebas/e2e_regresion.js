const { lanzar } = require('./e2e_common.js');
const D = require('./load.js');   // datos ORIGINALES (pagina.html) para comparar
(async () => {
  const { b, p, errs } = await lanzar();
  const ASIG = D.SUBJECTS.map(s => s.id);
  let malos = 0;
  for (const id of ASIG) {
    await p.click('[data-view=asignaturas]');
    await p.locator(`#subjectGrid [data-goto-asig=${id}]`).first().click();
    await p.waitForTimeout(150);
    const d = D.ASIGNATURAS_DATA[id];
    // pestañas
    const res = {};
    for (const tab of ['temario', 'laminas', 'ejercicios', 'videos', 'simulacros']) {
      await p.click(`.tab[data-panel=${tab}]`); await p.waitForTimeout(120);
      res[tab] = await p.locator(`#panel-${tab}`).evaluate(e => e.children.length);
    }
    // número de ejercicios mostrados vs originales (+ nuevos)
    await p.click('.tab[data-panel=ejercicios]');
    const mostrados = await p.locator('#panel-ejercicios .exercise').count();
    const originales = Object.values(d.ejercicios).reduce((a, v) => a + v.length, 0);
    const nuevos = await p.evaluate((id) => Object.values((BACHI.ampl[id] || {})).reduce((a, t) => a + ((t && t.ejercicios) ? t.ejercicios.length : 0), 0), id);
    const okEj = mostrados === originales + nuevos;
    // simulacros mostrados
    const nSim = (d.simulacros || []).length;
    await p.click('.tab[data-panel=simulacros]');
    const simMostrados = await p.locator('#simulacrosTabs .tab').count();
    const nuevosSim = await p.evaluate((id) => ((BACHI.ampl[id] || {})._simulacros || []).length, id);
    const okSim = simMostrados === nSim + nuevosSim;
    // abrir todos los temas uno a uno y contar secciones
    await p.click('.tab[data-panel=temario]');
    let okSec = true;
    for (const t of d.temas) {
      const row = p.locator(`.tema-row[data-tema=${t.id}] .tema-open`);
      await row.click(); await p.waitForTimeout(30);
      const secs = await p.locator(`#detail-${t.id} .lesson-block > h3`).count();
      const extra = await p.evaluate(([a, tt]) => { const x = (BACHI.ampl[a] || {})[tt]; return x ? (x.nuevas || []).length : 0; }, [id, t.id]);
      if (secs !== d.content[t.id].secciones.length + extra) { okSec = false; console.log('   secciones distintas en', id, t.id, secs, d.content[t.id].secciones.length + extra); }
      await row.click();
    }
    if (!(okEj && okSim && okSec)) malos++;
    console.log(`${okEj && okSim && okSec ? 'OK ' : 'MAL'} ${id.padEnd(13)} ejercicios ${mostrados}/${originales}+${nuevos} · simulacros ${simMostrados}/${nSim}+${nuevosSim} · temas ${d.temas.length}`);
  }
  // otras vistas
  for (const v of ['inicio', 'redaccion', 'ingles', 'lecturas']) { await p.click(`[data-view=${v}]`); await p.waitForTimeout(150); }
  const resumen = await p.evaluate(() => document.getElementById('heroSub') ? document.getElementById('heroSub').innerText : '');
  console.log('inicio:', resumen.replace(/\s+/g, ' ').slice(0, 90));
  console.log(malos ? `${malos} asignaturas con diferencias` : 'todo coincide', '· errores JS:', errs.length ? errs : 'ninguno');
  await b.close();
})();
