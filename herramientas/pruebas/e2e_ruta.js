// Pulsa los cuatro botones de «Ruta de estudio» (Explora, Comprueba, Practica, Repasa) de cada tema ampliado
// y comprueba que hacen algo: desplazan la página o cambian a la pestaña correcta.
// Uso: node e2e_ruta.js [asig:t1,t2,...] ...   (sin argumentos: todos los temas de mates1 y fyq1)
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const { b, p, errs } = await lanzar();
  const args = process.argv.slice(2);
  const lista = args.length ? args.map(a => [a.split(':')[0], a.split(':')[1].split(',')]) :
    [['mates1', 't1 t2 t3 t4 t5 t6 t7 t8 t9 t10 t11 t12 t13'.split(' ')], ['fyq1', 't1 t2 t3 t4 t5 t6 t7 t8 t9 t10 t11 t12 t13'.split(' ')]];
  let malos = 0, total = 0;
  for (const [asig, temas] of lista) {
    for (const tema of temas) {
      await abrirTema(p, asig, tema);
      for (const paso of ['explora', 'comprueba', 'ejercicios', 'lamina']) {
        total++;
        // vuelve a la pestaña de temario y arriba del todo para partir del mismo estado
        await p.evaluate(() => { const t = document.querySelector('.tab[data-panel="temario"]'); if (t) t.click(); window.scrollTo(0, 0); });
        await p.waitForTimeout(150);
        const btn = p.locator(`#detail-${tema} [data-bx-ir="${paso}"]`).first();
        if (!(await btn.count())) { console.log(`  FALTA el botón ${paso} en ${asig} ${tema}`); malos++; continue; }
        const y0 = await p.evaluate(() => window.scrollY);
        await btn.scrollIntoViewIfNeeded(); await p.waitForTimeout(100);
        const y1 = await p.evaluate(() => window.scrollY);
        await btn.click(); await p.waitForTimeout(900);
        const r = await p.evaluate((paso) => {
          const panel = paso === 'lamina' ? 'laminas' : paso;
          const act = document.querySelector('.tab.active'); const vis = id => { const e = document.getElementById('panel-' + id); return !!e && !e.hidden && e.offsetParent !== null; };
          return { y: window.scrollY, pestana: act ? act.getAttribute('data-panel') : null, visible: vis(panel === 'explora' || panel === 'comprueba' ? 'temario' : panel) };
        }, paso);
        let ok;
        if (paso === 'explora' || paso === 'comprueba') ok = r.pestana === 'temario' && Math.abs(r.y - y1) > 20;
        else ok = r.pestana === (paso === 'lamina' ? 'laminas' : 'ejercicios') && r.visible;
        if (!ok) { malos++; console.log(`  NO FUNCIONA «${paso}» en ${asig} ${tema}: ${JSON.stringify(r)} (y antes ${y1})`); }
      }
    }
  }
  console.log(`botones de la ruta de estudio: ${total - malos}/${total} funcionan · errores JS: ${errs.length ? errs : 'ninguno'}`);
  await b.close();
  process.exit(malos || errs.length ? 1 : 0);
})();
