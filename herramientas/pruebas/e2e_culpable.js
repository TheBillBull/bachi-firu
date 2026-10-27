// Localiza qué elementos de un tema se salen del ancho de la pantalla en móvil.
//   node herramientas/pruebas/e2e_culpable.js fyq1 t11
const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const [asig, tema] = [process.argv[2], process.argv[3]];
  const { b, p } = await lanzar({ viewport: { width: 390, height: 844 } });
  await abrirTema(p, asig, tema);
  const r = await p.evaluate((tema) => {
    const raiz = document.body, W = document.documentElement.clientWidth, out = [];
    raiz.querySelectorAll('*').forEach(e => {
      const r = e.getBoundingClientRect();
      if (r.width > 0 && r.right > W + 1 && !(e instanceof SVGElement && !e.closest('[data-w]'))) {
        // ¿está dentro de un contenedor con scroll propio o recortado?
        let c = e.parentElement, recortado = false;
        while (c && c !== raiz) { const s = getComputedStyle(c); if (/(auto|scroll|hidden)/.test(s.overflowX) && c.getBoundingClientRect().right <= W + 1) { recortado = true; break; } c = c.parentElement; }
        if (!recortado) out.push(e.tagName + '.' + String(e.className && e.className.baseVal !== undefined ? e.className.baseVal : e.className).slice(0, 40) + ' · right=' + Math.round(r.right) + ' · ' + (e.closest('[data-w]') ? 'widget ' + e.closest('[data-w]').getAttribute('data-w') : 'texto') + ' · ' + e.textContent.slice(0, 40).replace(/\s+/g, ' '));
      }
    });
    return { W, scroll: document.documentElement.scrollWidth, out: out.slice(0, 25) };
  }, tema);
  console.log(JSON.stringify(r, null, 1));
  await b.close();
})();
