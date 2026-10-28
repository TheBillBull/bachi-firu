// Vuelca a JSON lo que calculan los simuladores del tema 12 de Matemáticas II (Integral definida) para verificarlo con sympy.
// Uso: node herramientas/volcar_mates2_t12.js > /tmp/t12_sim.json
const fs = require('fs'), vm = require('vm'), path = require('path');
const raiz = path.join(__dirname, '..', 'ampliaciones');
const noop = () => {};
const sandbox = { console, document: { addEventListener: noop, getElementById: () => null, head: { appendChild: noop }, createElement: () => ({ style: {}, setAttribute: noop, appendChild: noop }), createElementNS: () => ({ setAttribute: noop, appendChild: noop }) },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(raiz, 'bachi.js'), 'utf8'), sandbox, { filename: 'bachi.js' });
const B = sandbox.BACHI, T = B.lab.t12, F = B.lab.fun;
const g = ex => F.leer(ex).g;
const out = { riemann: [], signo: [], entre: [], fint: [], medio: [] };
T.riemann.forEach(P => {
  const f = g(P.ex), r = { ex: P.ex, a: P.a, b: P.b, I: P.I, sumas: [] };
  [1, 4, 10, 25].forEach(n => ['izq', 'der', 'med', 'tra', 'inf', 'sup'].forEach(m => r.sumas.push({ n, m, s: T.suma(f, P.a, P.b, n, m).s })));
  out.riemann.push(r);
});
T.signo.forEach(P => {
  const c = T.signoCalc(P.ex, P.a, P.b);
  out.signo.push({ ex: P.ex, a: P.a, b: P.b, neta: c.neta, area: c.area, cortes: c.tr.map(q => q.a).concat([c.tr[c.tr.length - 1].b]) });
});
T.entre.forEach(P => {
  const c = T.entreCalc(P.f, P.g, P.a, P.b);
  out.entre.push({ f: P.f, g: P.g, a: P.a, b: P.b, neta: c.neta, area: c.area, cortes: c.tr.map(q => q.a).concat([c.tr[c.tr.length - 1].b]) });
});
T.fint.forEach(P => {
  const f = g(P.ex), Fu = u => T.simpson(f, P.a, u, Math.max(20, Math.ceil(Math.abs(u - P.a) * 40)));
  const xs = [0.5, 1, 2, 2.5], r = { ex: P.ex, a: P.a, T: P.T, F: xs.map(x => ({ x, v: Fu(x), vcuad: Fu(x * x) })) };
  r.ext = T.ceros(f, P.T[0], P.T[1]).map(z => ({ x: z, de: f(z - 1e-3) > 0 ? 'max' : 'min' }));
  const dG = x => 2 * x * f(x * x), R = Math.sqrt(P.T[1]);
  r.extcuad = T.ceros(dG, -R, R).map(z => ({ x: z, de: dG(z - 1e-3) > 0 ? 'max' : 'min' }));
  out.fint.push(r);
});
T.medio.forEach(P => {
  const c = T.medioCalc(P.ex, P.a, P.b);
  out.medio.push({ ex: P.ex, a: P.a, b: P.b, I: c.I, mu: c.mu, cs: c.cs });
});
process.stdout.write(JSON.stringify(out));
