const { lanzar, abrirTema } = require('./e2e_common.js');
(async () => {
  const [,, asig, tema] = process.argv;
  const { b, p } = await lanzar({ viewport: { width: 390, height: 844 } });
  await abrirTema(p, asig, tema);
  const r = await p.evaluate((t) => {
    const W = window.innerWidth, out = [];
    document.querySelectorAll('#detail-' + t + ' *').forEach(e => {
      const rc = e.getBoundingClientRect();
      if (rc.right > W + 1 && rc.width > 0) {
        // solo el más externo
        let anc = e.parentElement, hijo = false; while (anc && anc.id !== 'detail-' + t) { const ra = anc.getBoundingClientRect(); if (ra.right > W + 1) { hijo = true; break; } anc = anc.parentElement; }
        if (!hijo) out.push(e.tagName + '.' + (e.className || '') + ' ' + Math.round(rc.right) + ' · ' + (e.textContent || '').trim().slice(0, 50));
      }
    });
    return [W, document.documentElement.scrollWidth, out.slice(0, 12)];
  }, tema);
  console.log(JSON.stringify(r, null, 1));
  await b.close();
})();
