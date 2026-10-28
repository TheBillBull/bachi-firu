// Vuelca a JSON lo que calcula el motor de los simuladores del tema 14 de Matemáticas II (Distribuciones de probabilidad) para verificarlo con scipy.
// Uso: node herramientas/volcar_mates2_t14.js > /tmp/t14_sim.json
const fs = require('fs'), vm = require('vm'), path = require('path');
const raiz = path.join(__dirname, '..', 'ampliaciones');
const noop = () => {};
const sandbox = { console, document: { addEventListener: noop, getElementById: () => null, head: { appendChild: noop }, createElement: () => ({ style: {}, setAttribute: noop, appendChild: noop }), createElementNS: () => ({ setAttribute: noop, appendChild: noop }) },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(raiz, 'bachi.js'), 'utf8'), sandbox, { filename: 'bachi.js' });
const B = sandbox.BACHI, T = B.lab.t14;
const out = { phi: [], inv: [], tabla: [], zt: [], pmf: [], aprox: [], disc: [] };
[-3.1, -2, -1.5, -0.8, -0.25, 0, 0.1, 0.5, 1, 1.28, 1.645, 1.96, 2.33, 2.575, 3, 4.2, 5.5].forEach(z => out.phi.push({ z, v: T.phi(z) }));
[0.05, 0.1, 0.3, 0.5, 0.8, 0.9, 0.95, 0.975, 0.99, 0.9987].forEach(p => out.inv.push({ p, v: T.phiInv(p) }));
[-1.756, -1, -0.8, 0, 0.5, 1.25, 1.37, 1.644, 1.96, 2.333, 2.58].forEach(z => out.tabla.push({ z, v: T.phiT(z) }));
[0.05, 0.1, 0.2, 0.2005, 0.5, 0.8, 0.85, 0.9, 0.95, 0.975, 0.99].forEach(p => out.zt.push({ p, v: T.zTabla(p) }));
[[10, 3, 0.3], [10, 0, 0.3], [40, 22, 0.5], [100, 50, 0.5], [225, 50, 0.2], [30, 30, 0.95], [1, 1, 0.5]].forEach(([n, k, p]) => out.pmf.push({ n, k, p, v: T.pmf(n, k, p), c: T.cdf(n, k, p) }));
[[100, 0.5, 55], [100, 0.5, 50], [40, 0.05, 2], [40, 0.5, 22], [225, 0.2, 50], [625, 0.2, 145], [900, 0.1, 76]].forEach(([n, p, k]) =>
  ['le', 'eq', 'ge'].forEach(m => { const r = T.aprox(n, p, k, m); out.aprox.push({ n, p, k, m, ex: r.ex, sin: r.sin, con: r.con, cond: r.cond, mu: r.mu, sg: r.sg }); }));
T.DISC.forEach(d => { const r = T.disc(d); out.disc.push({ x: d.x, p: d.p, mu: r.mu, sg: r.sg, sp: r.sp }); });
process.stdout.write(JSON.stringify(out));
