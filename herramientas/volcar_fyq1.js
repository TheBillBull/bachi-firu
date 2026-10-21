// Vuelca a JSON los motores y bancos de datos de FyQ I (átomo, enlace y formulación) para verificarlos desde Python.
// Uso: node herramientas/volcar_fyq1.js > fyq1_motores.json
const fs = require('fs'), path = require('path');
global.window = global;
const noop = () => {};
global.document = { addEventListener: noop, createElementNS: () => ({ setAttribute: noop, appendChild: noop }) };
const raiz = path.join(__dirname, '..', 'ampliaciones');
['grafica', 'nucleo', 'ui', 'lab_atomo', 'lab_enlace', 'lab_formulacion'].forEach(f => { const p = path.join(raiz, f + '.js'); if (fs.existsSync(p)) require(p); });
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
process.stdout.write(JSON.stringify(salida));
