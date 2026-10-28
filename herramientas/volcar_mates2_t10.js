// Vuelca a JSON lo que calculan los simuladores del tema 10 de Matemáticas II (Estudio de funciones) para verificarlo con sympy.
// Uso: node herramientas/volcar_mates2_t10.js > /tmp/t10_sim.json
const fs = require('fs'), vm = require('vm'), path = require('path');
const raiz = path.join(__dirname, '..', 'ampliaciones');
const noop = () => {};
const sandbox = { console, document: { addEventListener: noop, getElementById: () => null, head: { appendChild: noop }, createElement: () => ({ style: {}, setAttribute: noop, appendChild: noop }), createElementNS: () => ({ setAttribute: noop, appendChild: noop }) },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(raiz, 'bachi.js'), 'utf8'), sandbox, { filename: 'bachi.js' });
const B = sandbox.BACHI, T = B.lab.t10, D = B.lab.der, F = B.lab.fun;
const out = { estudio: T.estudio, ramas: T.ramas, coherente: T.coherente, fprima: [], formula: [] };
T.fprima.forEach(p => {
  const d = F.leer(p.d).g, X = p.X;
  out.fprima.push({ t: p.t, d: p.d, f0: p.f0, X, tang: p.tang,
    ceros: D.cambios(d, -X, X).map(e => ({ x: e.x, de: e.de })),
    infl: D.cambios(x => D.d1(d, x), -X, X).map(e => ({ x: e.x, de: e.de })) });
});
T.formula.forEach(p => {
  const sol = p.sol, res = p.conds.map(c => c.res(sol));
  const pert = p.pars.map((_, k) => { const q = sol.slice(); q[k] += 1; return p.conds.map(c => c.res(q)); });
  out.formula.push({ t: p.t, sol, res, pert, npar: p.pars.length, ncond: p.conds.length,
    f: [0.5, 1.5, 3, 4].map(x => p.f(x, sol)), rg: p.rg });
});
process.stdout.write(JSON.stringify(out, (k, v) => typeof v === 'function' ? undefined : (typeof v === 'number' && !isFinite(v) ? String(v) : v)));
