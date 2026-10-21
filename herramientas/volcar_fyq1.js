// Vuelca a JSON los motores y bancos de datos de FyQ I (átomo, enlace y formulación) para verificarlos desde Python.
// Uso: node herramientas/volcar_fyq1.js > fyq1_motores.json
const fs = require('fs'), path = require('path');
global.window = global;
const noop = () => {};
global.document = { addEventListener: noop, createElementNS: () => ({ setAttribute: noop, appendChild: noop }) };
const raiz = path.join(__dirname, '..', 'ampliaciones');
['grafica', 'nucleo', 'ui', 'lab_atomo', 'lab_enlace', 'lab_formulacion_0motor', 'lab_qmol_0motor', 'lab_qmol_4est1', 'lab_qmol_5est2', 'lab_organica', 'lab_orgmas', 'lab_orgreacciones'].forEach(f => { const p = path.join(raiz, f + '.js'); if (fs.existsSync(p)) require(p); });
const L = global.BACHI.lab, salida = {};
if (L.quim) {
  const Q = L.quim, cfg = {}, cfgAb = {}, ion = {};
  Q.EL.forEach(e => { cfg[e.Z] = Q.cfgTxt(Q.config(e.Z, true), false); cfgAb[e.Z] = Q.cfgTxt(Q.config(e.Z, true), true); });
  [[26, 2], [26, 3], [29, 1], [29, 2], [13, 3], [17, -1], [8, -2], [25, 2], [30, 2], [50, 2], [20, 2], [16, -2], [7, -3], [11, 1], [12, 2]].forEach(([Z, q]) => { ion[Z + ',' + q] = Q.cfgTxt(Q.configIon(Z, q), false); });
  salida.quim = { EL: Q.EL, ISOTOPOS: Q.ISOTOPOS, IONSUC: Q.IONSUC, CTE: Q.CTE, RAD: Q.RAD, cfg, cfgAb, ion,
    desapareados: Object.fromEntries(Q.EL.map(e => [e.Z, Q.desapareados(Q.config(e.Z, true))])), valencia: Object.fromEntries(Q.EL.map(e => [e.Z, Q.electronesValencia(Q.config(e.Z, true))])),
    bloque: Object.fromEntries(Q.EL.map(e => [e.Z, Q.bloque(e.Z)])), bohr: { '3,2': Q.bohr(3, 2), '4,2': Q.bohr(4, 2), '2,1': Q.bohr(2, 1), '5,2': Q.bohr(5, 2), '4,3': Q.bohr(4, 3) } };
}
if (L.enlace && L.enlace.volcar) salida.enlace = L.enlace.volcar();
if (L.formulacion && L.formulacion.volcar) salida.formulacion = L.formulacion.volcar();
// Temas 4-5: banco de reacciones, ajustes y muestras de los generadores de problemas del entrenador
if (L.qmol && L.qmol.GENERADORES) {
  const Q = L.qmol;
  salida.qmol = {
    reacciones: Q.reacciones.map(r => ({ id: r.id, t: r.t, s: r.s })),
    ajustes: Q.AJUSTES.map(t => { const E = Q.ecuacion(t), A = Q.ajustar(E.reactivos, E.productos); return { txt: t, coefs: A.ok ? A.coefs : null }; }),
    tabla: Q.tabla, rendimientos: Q.RENDIMIENTOS, combustibles: Q.COMBUSTIBLES,
    generadores: Q.GENERADORES.map(g => Array.from({ length: 60 }, () => { const p = g(); return { d: p.d, r: p.r, u: p.u }; }))
  };
}
// Tema 7: motor de química orgánica (si existe su volcado)
if (L.org && L.org.volcar) salida.org = L.org.volcar();
process.stdout.write(JSON.stringify(salida));
