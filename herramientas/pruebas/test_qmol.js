// Prueba del motor de química cuantitativa (B.lab.qmol) sin navegador
const path = require('path');
const RAIZ = process.env.BACHI_RAIZ || path.join(__dirname, '..', '..');
global.window = global;
global.document = { addEventListener() {}, createElementNS() { return { setAttribute() {}, appendChild() {} }; }, body: { contains() { return true; } } };
for (const f of ['grafica', 'nucleo', 'ui', 'lab_qmol']) require(RAIZ + '/ampliaciones/' + f + '.js');
const Q = BACHI.lab.qmol; let mal = 0;
function chk(n, got, esp) { if (JSON.stringify(got) !== JSON.stringify(esp)) { mal++; console.log('FALLO', n, '→', JSON.stringify(got), 'esperado', JSON.stringify(esp)); } }
chk('H2O', Q.leer('H2O').elems, { H: 2, O: 1 }); chk('Ca(OH)2', Q.leer('Ca(OH)2').elems, { Ca: 1, O: 2, H: 2 }); chk('Al2(SO4)3', Q.leer('Al₂(SO₄)₃').elems, { Al: 2, S: 3, O: 12 });
chk('CuSO4·5H2O', Q.leer('CuSO4·5H2O').elems, { Cu: 1, S: 1, O: 9, H: 10 }); chk('CuSO4.5H2O', Q.leer('CuSO4.5H2O').elems, { Cu: 1, S: 1, O: 9, H: 10 });
chk('Co', Q.leer('Co').elems, { Co: 1 }); chk('CO', Q.leer('CO').elems, { C: 1, O: 1 }); chk('NaCl', Q.leer('NaCl').elems, { Na: 1, Cl: 1 });
chk('error', Q.leer('Xy2').ok, false); chk('error paréntesis', Q.leer('Ca(OH2').ok, false); chk('(NH4)2SO4', Q.leer('(NH4)2SO4').elems, { N: 2, H: 8, S: 1, O: 4 }); chk('Fe(NO3)3', Q.leer('Fe(NO3)3').elems, { Fe: 1, N: 3, O: 9 });
chk('M H2O', Q.masaMolar('H2O'), 18); chk('M CaCO3', Q.masaMolar('CaCO3'), 100); chk('M H2SO4', Q.masaMolar('H2SO4'), 98); chk('M CuSO4·5H2O', Q.masaMolar('CuSO4·5H2O'), 249.5); chk('M exacta H2O', Math.round(Q.masaMolar('H2O', 'ex') * 1000) / 1000, 18.015);
chk('sub', Q.sub('Al2(SO4)3'), 'Al₂(SO₄)₃'); chk('sub coef', Q.sub('2H2O'), '2H₂O'); chk('sub 12', Q.sub('C6H12O6'), 'C₆H₁₂O₆'); chk('sub hidrato', Q.sub('CuSO4·5H2O'), 'CuSO₄·5H₂O');
const aj = s => { const e = Q.ecuacion(s); const r = Q.ajustar(e.reactivos, e.productos); return r.ok ? r.coefs : r.error; };
chk('N2+H2', aj('N2 + H2 -> NH3'), [1, 3, 2]); chk('CH4', aj('CH4 + O2 → CO2 + H2O'), [1, 2, 1, 2]); chk('Fe+O2', aj('Fe + O2 → Fe2O3'), [4, 3, 2]); chk('C3H8', aj('C3H8 + O2 → CO2 + H2O'), [1, 5, 3, 4]);
chk('KMnO4', aj('KMnO4 + HCl → KCl + MnCl2 + Cl2 + H2O'), [2, 16, 2, 2, 5, 8]); chk('Al+H2SO4', aj('Al + H2SO4 → Al2(SO4)3 + H2'), [2, 3, 1, 3]); chk('C6H12O6', aj('C6H12O6 + O2 → CO2 + H2O'), [1, 6, 6, 6]);
chk('Ca(OH)2+H3PO4', aj('Ca(OH)2 + H3PO4 → Ca3(PO4)2 + H2O'), [3, 2, 1, 6]); chk('C2H6O', aj('C2H6O + O2 → CO2 + H2O'), [1, 3, 2, 3]); chk('Fe2O3+CO', aj('Fe2O3 + CO → Fe + CO2'), [1, 3, 2, 3]); chk('NH3+O2', aj('NH3 + O2 → NO + H2O'), [4, 5, 4, 6]);
chk('imposible', typeof aj('H2 + O2 → NaCl'), 'string'); chk('ya ajustada', aj('2H2 + O2 -> 2H2O'), [2, 1, 2]); chk('octano', aj('C8H18 + O2 → CO2 + H2O'), [2, 25, 16, 18]);
chk('recuento', Q.recuento(['H2', 'O2'], ['H2O'], [2, 1, 2]), [{ e: 'H', izq: 4, der: 4 }, { e: 'O', izq: 2, der: 2 }]);
chk('texto', Q.textoEcuacion(['H2', 'O2'], ['H2O'], [2, 1, 2]), '2 H₂ + O₂ → 2 H₂O');
const c = Q.composicion('H2O'); chk('comp H', Math.round(c.filas[0].pct * 100) / 100, 11.11);
chk('sci', Q.sci(6.022e23), '6,022·10²³'); chk('cs', Q.cs(0.0012345, 3), 0.00123);
console.log(mal ? mal + ' FALLOS' : 'motor qmol correcto');
