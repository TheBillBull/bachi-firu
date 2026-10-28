// Vuelca a JSON lo que calcula el motor de los simuladores del tema 6 de Matemáticas II (problemas métricos)
// con todos sus ejemplos predefinidos, para verificarlo con sympy.
// Uso: node herramientas/volcar_mates2_t6.js > /tmp/t6_sim.json
const fs = require('fs'), vm = require('vm'), path = require('path');
const raiz = path.join(__dirname, '..', 'ampliaciones');
const noop = () => {};
const sandbox = { console, document: { addEventListener: noop, getElementById: () => null, head: { appendChild: noop }, createElement: () => ({ style: {}, setAttribute: noop, appendChild: noop }), createElementNS: () => ({ setAttribute: noop, appendChild: noop }) },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(raiz, 'bachi.js'), 'utf8'), sandbox, { filename: 'bachi.js' });
const G = sandbox.BACHI.lab.met;
const out = { plano: [], recta: [], cruz: [], calc: [] };
G.PRE3D.plano.forEach(p => out.plano.push({ n: p.n, D: p.D, P: p.P, proy: G.proyPlano(p.P, p.n, p.D), sim: G.simPlano(p.P, p.n, p.D), d: G.distPuntoPlano(p.P, p.n, p.D) }));
G.PRE3D.recta.forEach(p => out.recta.push({ Q: p.Q, v: p.v, P: p.P, proy: G.proyRecta(p.P, p.Q, p.v), sim: G.simRecta(p.P, p.Q, p.v), d: G.distPuntoRecta(p.P, p.Q, p.v) }));
G.PRE3D.cruz.forEach(p => { const r = G.cruzadas(p.Q1, p.u, p.Q2, p.v); out.cruz.push({ Q1: p.Q1, u: p.u, Q2: p.Q2, v: p.v, par: r.par, d: r.d, dm: r.dm === undefined ? null : r.dm, A: r.A || null, B: r.B || null }); });
G.MODOS.forEach(m => m.pres.forEach(a => { const r = G.calcula(m.k, a); out.calc.push({ k: m.k, a, res: r.res }); }));
process.stdout.write(JSON.stringify(out));
