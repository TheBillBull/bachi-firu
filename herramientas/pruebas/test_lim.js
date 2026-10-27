global.window = global; global.document = { addEventListener(){}, createElementNS(){return {setAttribute(){},appendChild(){}}} };
for (const f of ['grafica','nucleo','ui','lab_funciones','lab_limites']) require((process.env.BACHI_RAIZ || require('path').join(__dirname, '..', '..')) + '/ampliaciones/' + f + '.js');
const F = BACHI.lab.fun, Lm = BACHI.lab.lim; let mal = 0;
function chk(n, got, esp){ if(JSON.stringify(got)!==JSON.stringify(esp)){mal++;console.log('FALLO',n,'→',JSON.stringify(got),'esperado',JSON.stringify(esp));} }
const lat = (s, a, d) => { const q = F.leer(s); const r = Lm.lateral(q.g, a, d, q.gi); return r.tipo === 'lim' ? r.L : r.tipo === 'inf' ? (r.signo > 0 ? '+inf' : '-inf') : r.tipo; };
const casos = [
 ['(x^2-1)/(x-1)',1,2,2],['(x^2-9)/(x-3)',3,6,6],['(sqrt(x+4)-2)/x',0,0.25,0.25],['sin(x)/x',0,1,1],['(1-cos(x))/x^2',0,0.5,0.5],['|x|/x',0,-1,1],['1/x',0,'-inf','+inf'],['1/x^2',0,'+inf','+inf'],
 ['1/(x-2)',2,'-inf','+inf'],['e^(1/x)',0,0,'+inf'],['sin(1/x)',0,'osc','osc'],['x*sin(1/x)',0,0,0],['(x^2-4x+3)/(x^2-1)',1,-1,-1],['x^2',2,4,4],['ln(x)',0,'indef','-inf'],['1000x',0,0,0],['x+1',2,3,3],['(x^3-8)/(x-2)',2,12,12],['tan(x)',Math.PI/2,'+inf','-inf'],['x^2*ln(x)',0,'indef',0]
];
casos.forEach(([s,a,l,r]) => { chk('izq '+s, lat(s,a,-1), l); chk('der '+s, lat(s,a,1), r); });
const est = (s,a)=>Lm.estudio(F.leer(s).g,a).tipo;
chk('continua x^2', est('x^2',2),'continua'); chk('evitable', est('(x^2-1)/(x-1)',1),'discontinuidad evitable'); chk('salto', est('|x|/x',0),'discontinuidad de salto finito'); chk('infinito', est('1/x',0),'discontinuidad de salto infinito (asíntota vertical)'); chk('esencial', est('sin(1/x)',0),'discontinuidad esencial (oscila)'); chk('sqrt en 0', est('sqrt(x)',0),'sólo definida a un lado'); chk('fuera', est('sqrt(x)',-2),'fuera del dominio'); chk('1/x^2', est('1/x^2',0),'discontinuidad de salto infinito (asíntota vertical)');
const as = s => { const r = Lm.asintotas(F.leer(s).g); return { v: r.vert, h: r.H.map(h=>[h.lado,h.y]), o: r.O.map(o=>[o.lado,o.m,o.n]), hu: r.huecos.map(h=>[h[0],Math.round(h[1]*1e3)/1e3]) }; };
console.log(JSON.stringify(as('(x^2+1)/(x-1)')), JSON.stringify(as('(2x^2+1)/x')), JSON.stringify(as('1/(x-2)')), JSON.stringify(as('(x^2-4)/(x^2-3x+2)')), JSON.stringify(as('(x^2-1)/(x^2-4)')), JSON.stringify(as('e^x/(x)')), JSON.stringify(as('(3x+1)/(x-2)')), JSON.stringify(as('sqrt(x^2+1)')), JSON.stringify(as('x+1/x')), JSON.stringify(as('ln(x)')), JSON.stringify(as('x^2')), JSON.stringify(as('(x^3+1)/(x^2)')), JSON.stringify(as('(2x^2-3x)/(x+1)')));
console.log(mal ? mal+' FALLOS' : 'motor de límites correcto');
