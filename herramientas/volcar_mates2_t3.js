// Vuelca a JSON los datos de los simuladores del tema 3 de Matemáticas II (sistemas lineales)
// y lo que calcula el motor de la web con ellos, para verificarlo con sympy.
// Uso: node herramientas/volcar_mates2_t3.js > /tmp/t3_sim.json
const fs = require('fs'), vm = require('vm'), path = require('path');
const raiz = path.join(__dirname, '..', 'ampliaciones');
const noop = () => {};
const sandbox = { console, document: { addEventListener: noop, getElementById: () => null, head: { appendChild: noop }, createElement: () => ({ style: {}, setAttribute: noop, appendChild: noop }), createElementNS: () => ({ setAttribute: noop, appendChild: noop }) },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(raiz, 'bachi.js'), 'utf8'), sandbox, { filename: 'bachi.js' });
const B = sandbox.BACHI, T = B.lab.mt, S = B.lab.ms;
const txt = M => M.map(r => r.map(x => T.txt(x)));
const res = (A, n) => { const r = S.resuelve(A, n); return { tipo: r.tipo, rA: r.rA, rAB: r.rAB, sol: r.sol.map(s => s.nom + ' = ' + s.txt) }; };
const out = { gauss: [], discusor: [], planos: [], cramer: [], problemas: [] };
S.PRES_G.forEach(p => { const A = T.de(p.A), pasos = S.gauss(A, p.n); out.gauss.push({ k: p.k, A: txt(A), n: p.n, web: res(A, p.n), ultima: txt(pasos[pasos.length - 2].M), pasos: pasos.length }); });
S.PRES_D.forEach(p => {
  const d = { k: p.k, n: p.n, crit: p.crit, det: p.det, pl: p.pl, casos: [] };
  for (let k = -16; k <= 16; k++) {
    const m = k / 4, fr = p.f(m).map(r => r.map(x => T.F(Math.round(x * 16), 16)));
    d.casos.push({ m, A: txt(fr), web: S.tipoEn(p, m).tipo });
  }
  out.discusor.push(d);
});
S.PRES_P.forEach(p => { const A = T.de(p.A), pos = S.posicion(A); out.planos.push({ k: p.k, t: p.t, A: txt(A), web: { tipo: pos.r.tipo, rA: pos.r.rA, rAB: pos.r.rAB, txt: pos.txt } }); });
S.PRES_C.forEach(p => { const A = T.de(p.A), n = p.n; out.cramer.push({ k: p.k, A: txt(A), n, detWeb: T.txt(S.det(A.map(r => r.slice(0, n)))), web: res(A, n) }); });
S.PROB.forEach(p => { const A = T.de(p.A); out.problemas.push({ k: p.k, A: txt(A), n: p.n, web: res(A, p.n) }); });
process.stdout.write(JSON.stringify(out));
