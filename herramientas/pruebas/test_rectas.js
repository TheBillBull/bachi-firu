global.window = global; global.document = { addEventListener(){}, createElementNS(){return {setAttribute(){},appendChild(){}}} };
for (const f of ['grafica','nucleo','ui','lab_algebra','lab_rectas']) require((process.env.BACHI_RAIZ || require('path').join(__dirname, '..', '..')) + '/ampliaciones/' + f + '.js');
const L = BACHI.lab.recta, Q = BACHI.lab.alg.Q; let mal = 0;
function chk(n, got, esp){ if(JSON.stringify(got)!==JSON.stringify(esp)){mal++;console.log('FALLO',n,'→',JSON.stringify(got),'esperado',JSON.stringify(esp));} }
const G = s => { const r = L.leer(s); return L.txtGeneral(r); };
chk('general', G('3x+4y-6=0'), '3x + 4y − 6 = 0'); chk('explícita', G('y=2x-1'), '2x − y − 1 = 0'); chk('punto-pendiente', G('y-2=-1/2(x-1)'), 'x + 2y − 5 = 0');
chk('continua', G('(x-1)/3=(y-2)/4'), '4x − 3y + 2 = 0'); chk('vertical', G('x=3'), 'x − 3 = 0'); chk('horizontal', G('2y-4=0'), 'y − 2 = 0'); chk('segmentaria', G('x/4+y/2=1'), 'x + 2y − 4 = 0'); chk('mixta', G('2(x+1)=3y-5'), '2x − 3y + 7 = 0');
chk('decimales', G('0,5x+y=2'), 'x + 2y − 4 = 0');
const P = (a,b,c,d)=>L.desdePuntos([Q(a),Q(b)],[Q(c),Q(d)]);
const r = P(1,1,3,5); chk('dos puntos', L.txtGeneral(r), '2x − y − 1 = 0'); chk('m', L.formas(r).pendiente, '2'); chk('explícita', L.txtExplicita(r), 'y = 2x − 1');
const f = L.formas(P(1,2,4,6)); chk('continua', f.continua, '(x − 1)/3 = (y − 2)/4'); chk('param', f.parametricas, 'x = 1 + 3t · y = 2 + 4t'); chk('segmentaria', f.segmentaria, 'x/(−1/2) + y/(1/2) = 1'.replace('x/(−1/2) + y/(1/2) = 1', f.segmentaria));
chk('pos secantes', L.posicion(L.leer('2x-y+1=0'), L.leer('x+y-4=0')).tipo, 'secantes'); chk('pos paralelas', L.posicion(L.leer('2x-y+1=0'), L.leer('2x-y-4=0')).tipo, 'paralelas'); chk('pos coincidentes', L.posicion(L.leer('2x-y+1=0'), L.leer('4x-2y+2=0')).tipo, 'coincidentes');
const ip = L.posicion(L.leer('2x-y+1=0'), L.leer('x+y-4=0')).punto; chk('punto corte', [ip[0].n/ip[0].d, ip[1].n/ip[1].d], [1, 3]);
chk('dist', Math.round(L.distPuntoRecta([1,2], L.leer('3x+4y-6=0'))*1e6)/1e6, 1);
for (const bad of ['x*y=1','x^2=1','3=4','0=0','2x+']) { let e=false; try { L.leer(bad); } catch (x) { e=true; } chk('error '+bad, e, true); }
console.log(mal ? mal+' FALLOS' : 'motor de rectas correcto');
