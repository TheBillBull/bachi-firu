// Modo oscuro y móvil de un tema de FyQ I: contraste real (WCAG) de lecturas, etiquetas, botones y tablas, y desborde horizontal.
// Uso: node herramientas/pruebas/e2e_fyq1_oscuro.js t2 [t5 t3 t7 …]
const { lanzar, abrirTema } = require('./e2e_common.js');
const { contraste, esOscuro } = require('./e2e_fyq1_comun.js');
(async () => {
  const temas = process.argv.slice(2);
  let mal = 0;
  for (const movil of [false, true]) {
    const { b, p, errs } = await lanzar({ viewport: movil ? { width: 390, height: 844 } : { width: 1280, height: 900 }, scheme: 'dark' });
    for (const t of temas) {
      await abrirTema(p, 'fyq1', t);
      const oscuro = await esOscuro(p);
      const r = await contraste(p, `#detail-${t}`, 3);
      const ov = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      console.log(`${t} ${movil ? 'móvil' : 'escritorio'} oscuro=${oscuro} · ${r.total} elementos de texto medidos · contraste bajo: ${r.malos.length} · desborde: ${ov > 0 ? ov + ' px' : 'ninguno'}`);
      r.malos.slice(0, 6).forEach(m => console.log('   ', JSON.stringify(m)));
      if (!oscuro || r.malos.length || ov > 0) mal++;
    }
    if (errs.length) { mal++; console.log('errores JS:', errs); }
    await b.close();
  }
  console.log(mal ? `PROBLEMAS: ${mal}` : 'todo correcto en oscuro (escritorio y móvil)');
  if (mal) process.exitCode = 1;
})();
