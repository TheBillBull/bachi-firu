global.window = global; global.document = { addEventListener(){}, createElementNS(){return {setAttribute(){},appendChild(){}}} };
const R = process.env.BACHI_RAIZ || require('path').join(__dirname, '..', '..');
for (const f of ['grafica','nucleo','ui','lab_numeros2']) require(R + '/ampliaciones/' + f + '.js');
const N = BACHI.lab.num2; let mal = 0;
const chk = (n, g, e) => { if (JSON.stringify(g) !== JSON.stringify(e)) { mal++; console.log('FALLO', n, '→', JSON.stringify(g), 'esperado', JSON.stringify(e)); } };
const G = s => { const r = N.generatriz(s); return r && r.n + '/' + r.d; };
chk('0,(3)', G('0,(3)'), '1/3'); chk('0,(45)', G('0,(45)'), '5/11'); chk('2,(18)', G('2,(18)'), '24/11'); chk('0,2(7)', G('0,2(7)'), '5/18'); chk('3,2(7)', G('3,2(7)'), '59/18'); chk('1,0(36)', G('1,0(36)'), '57/55'); chk('0,(9)', G('0,(9)'), '1/1'); chk('12,5', G('12,5'), '25/2'); chk('0,125', G('0,125'), '1/8'); chk('-0,(6)', G('-0,(6)'), '-2/3'); chk('mal', G('abc'), null);
const D = (p, q) => N.txtDecimal(N.decimal(p, q));
chk('1/7', D(1, 7), '0,(142857)'); chk('1/3', D(1, 3), '0,(3)'); chk('5/12', D(5, 12), '0,41(6)'); chk('1/8', D(1, 8), '0,125'); chk('22/7', D(22, 7), '3,(142857)'); chk('7/30', D(7, 30), '0,2(3)'); chk('-1/4', D(-1, 4), '−0,25');
const Rz = (f, ...a) => N.racionalizar(f, ...a);
for (const [f, a] of [[1, [3, 2, 0, 5, 0]], [2, [4, 3, 1, 2, 0]], [2, [4, 3, -1, 2, 0]], [3, [6, 1, 1, 5, 3]], [3, [10, 2, -1, 2, 3]], [2, [2, 1, 1, 3, 0]]]) { const r = Rz(f, ...a); const ev = f === 1 ? a[0] / (a[1] * Math.sqrt(a[3])) : f === 2 ? a[0] / (a[1] + a[2] * Math.sqrt(a[3])) : a[0] / (a[1] * Math.sqrt(a[3]) + a[2] * Math.sqrt(a[4])); if (Math.abs(ev - r.val) > 1e-9) { mal++; console.log('FALLO racionalizar', f, a, ev, r.val); } console.log(f, a.join(','), r.txt0, '=', r.res); }
console.log(mal ? mal + ' FALLOS' : 'laboratorio de números II correcto');
