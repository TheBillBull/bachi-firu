// Vuelca a JSON lo que calculan los simuladores del tema 8 de Matemáticas II (Derivadas) para verificarlo con sympy.
// Uso: node herramientas/volcar_mates2_t8.js > /tmp/t8_sim.json
const fs = require('fs'), vm = require('vm'), path = require('path');
const raiz = path.join(__dirname, '..', 'ampliaciones');
const noop = () => {};
const sandbox = { console, document: { addEventListener: noop, getElementById: () => null, head: { appendChild: noop }, createElement: () => ({ style: {}, setAttribute: noop, appendChild: noop }), createElementNS: () => ({ setAttribute: noop, appendChild: noop }) },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(raiz, 'bachi.js'), 'utf8'), sandbox, { filename: 'bachi.js' });
const T = sandbox.BACHI.lab.t8, D = sandbox.BACHI.lab.der;
const out = { trozos: [], rolle: [], hopital: [] };
T.trozos.forEach(p => {
  const a = p.sol[0], b = p.par.length > 1 ? p.sol[1] : 0, c = p.c;
  out.trozos.push({ t: p.t, c, sol: p.sol, npar: p.par.length,
    // en la solución
    L: p.L(c, a, b), R: p.R(c, a, b), dL: p.dL(c, a, b), dR: p.dR(c, a, b),
    // con la solución y a los lados (identifican la función) y con otro valor de los parámetros
    Lm: p.L(c - 0.5, a, b), Rm: p.R(c + 0.5, a, b), dLm: p.dL(c - 0.5, a, b), dRm: p.dR(c + 0.5, a, b),
    v: p.v, L0: p.L(c, p.v[0], p.v[1] || 0), R0: p.R(c, p.v[0], p.v[1] || 0), dL0: p.dL(c, p.v[0], p.v[1] || 0), dR0: p.dR(c, p.v[0], p.v[1] || 0) });
});
T.rolle.forEach(p => {
  const ok = p.cont && p.der && Math.abs(p.f(p.a) - p.f(p.b)) < 1e-9;
  out.rolle.push({ t: p.t, a: p.a, b: p.b, fa: p.f(p.a), fb: p.f(p.b), ok, cs: ok ? D.cambios(x => D.d1(p.f, x), p.a + 1e-6, p.b - 1e-6, 1200).map(e => e.x) : [] });
});
T.hopital.forEach(p => out.hopital.push({ t: p.t, lim: p.lim, xs: p.xs, fg: p.xs.map(x => p.f(x) / p.g(x)), dfdg: p.xs.map(x => p.df(x) / p.dg(x)) }));
process.stdout.write(JSON.stringify(out));
