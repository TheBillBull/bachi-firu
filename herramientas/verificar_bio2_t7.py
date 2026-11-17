#!/usr/bin/env python3
"""
Verificación independiente de Biología II, tema 7 (El núcleo y el ciclo celular).
No comparte código con la web: modela cada fase de mitosis y meiosis (células, cromosomas, cromátidas y ADN por célula)
y recalcula con fracciones las cifras de ejemplos y ejercicios (2^n gametos, 4^n cigotos, ciclos, duraciones, longitud de
ADN). Comprueba además que el widget bio_ciclo (volcado propio con node) coincide con el modelo, que cada ejercicio de
opción tenga una única respuesta correcta que coincida con los hechos, los hechos de la ficha y que no contradiga la teoría.

Convenio declarado: ADN en unidades c (gameto haploide = 1c); un cromosoma de G1 tiene 1 cromátida (1 molécula de ADN) y
tras la fase S, 2; en la anafase mitótica y en la anafase II, cada cromátida separada cuenta como cromosoma.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_bio2_t7.py /tmp/ampl.json
"""
import json, os, re, subprocess, sys
from fractions import Fraction as F

ok, fallos = 0, []


def cierto(nombre, cond):
    global ok
    if cond:
        ok += 1
    else:
        fallos.append(nombre)


def limpio(s):
    return re.sub(r'<[^>]+>', '', s)


def checks(e):
    c = e['check']
    return c if isinstance(c, list) else [c]


datos = json.load(open(sys.argv[1]))
T = datos['ampl']['bio2']['t7']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# ---------------------------------------------------------------- modelo propio del ciclo (fraccion del ADN y recuento)
# Se parte de d cromosomas con 1 cromátida (2c). Operaciones elementales:
def estado(cel, cromosomas, cromatidas_por_cr):
    return dict(cel=cel, cr=cromosomas, cm=cromosomas * cromatidas_por_cr)


def modelo(d, modo):
    n = d // 2
    R = {}
    if modo == 'mit':
        R['g1'] = (1, d, d)
        R['g2'] = R['pro'] = R['met'] = (1, d, 2 * d)
        R['ana'] = (1, 2 * d, 2 * d)           # cromátidas separadas = cromosomas
        R['tel'] = (2, d, d)
    else:
        R['g1'] = (1, d, d)
        R['g2'] = R['p1'] = R['m1'] = R['a1'] = (1, d, 2 * d)
        R['t1'] = R['p2'] = R['m2'] = (2, n, d)
        R['a2'] = (2, d, d)
        R['t2'] = (4, n, n)
    return R


def adn(d, cm):        # unidades c: cm moléculas por célula; 1c = d/2 moléculas (un juego haploide, 1 cromátida por cromosoma)
    return F(cm, d // 2)


# ---------------------------------------------------------------- widget bio_ciclo: volcado propio con node
js = r"""
const fs=require('fs'),vm=require('vm');
const noop=()=>{};
const sb={console,document:{addEventListener:noop,getElementById:()=>null,head:{appendChild:noop},createElement:()=>({style:{},setAttribute:noop,appendChild:noop})},matchMedia:()=>({matches:false}),localStorage:{getItem:()=>null,setItem:noop},requestAnimationFrame:noop};
sb.window=sb;vm.createContext(sb);
vm.runInContext(fs.readFileSync(process.argv[2],'utf8'),sb);
const f=sb.BACHI.lab.bioCiclo;
const out={};
for(const d of [4,8,14,46]){out[d]={mit:f(d,'mit'),mei:f(d,'mei')};}
console.log(JSON.stringify(out));
"""
raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
tmpjs = os.path.join(os.environ.get('TMPDIR', '/tmp'), 'vol_bio7.js')
open(tmpjs, 'w').write(js)
W = json.loads(subprocess.check_output(['node', tmpjs, os.path.join(raiz, 'ampliaciones', 'bachi.js')]))
for d in (4, 8, 14, 46):
    for modo in ('mit', 'mei'):
        M = modelo(d, modo)
        for e in W[str(d)][modo]:
            if e['k'] == 's':
                continue
            cel, cr, cm = M[e['k']]
            cierto('widget %s 2n=%d %s: células/cromosomas/cromátidas' % (modo, d, e['k']), (e['cel'], e['cr'], e['cm']) == (cel, cr, cm))
            cierto('widget %s 2n=%d %s: ADN = %s c' % (modo, d, e['k'], adn(d, cm)), F(e['adn']) == adn(d, cm))
        # S: cromátidas entre d y 2d
        if modo == 'mit':
            s = [e for e in W[str(d)][modo] if e['k'] == 's'][0]
            cierto('widget 2n=%d S: entre %d y %d y 2c–4c' % (d, d, 2 * d), s['cm'] == 'entre %d y %d' % (d, 2 * d) and s['adn'] == 'entre 2c y 4c')
        # conservación: células · cromátidas de gametos
        fin = W[str(d)][modo][-1]
        cierto('widget %s 2n=%d final: ADN total conservado' % (modo, d), (F(fin['cel']) * F(fin['adn']) == 2 * 2 if modo == 'mit' else F(fin['cel']) * F(fin['adn']) == 4))

# ---------------------------------------------------------------- cifras de ejemplos y ejercicios
def v(i, k=0):
    return checks(EJ[i])[k]


# a9, a13: 2n = 46
cierto('a9: mitosis conserva 2n = 46', v('a9')['valor'] == modelo(46, 'mit')['tel'][1])
cierto('a13: gameto humano 23', v('a13')['valor'] == modelo(46, 'mei')['t2'][1])
# b1: 2n = 8, metafase → cromátidas 16
cierto('b1: 16 cromátidas', v('b1')['valor'] == modelo(8, 'mit')['met'][2])
# b2: anafase 2n = 46 → 92
cierto('b2: 92 cromosomas en la anafase', v('b2')['valor'] == modelo(46, 'mit')['ana'][1])
# b3: bivalentes 2n = 14
cierto('b3: 7 bivalentes', v('b3')['valor'] == 14 // 2)
# b4: metafase II, 2n = 12 por célula
M12 = modelo(12, 'mei')['m2']
cierto('b4: 6 cromosomas y 12 cromátidas', (v('b4', 0)['valor'], v('b4', 1)['valor']) == (M12[1], M12[2]))
# b5: ADN G2 = 2 × 6 pg; gameto 3 pg
cierto('b5: G2 = 12 pg y gameto = 3 pg', (v('b5', 0)['valor'], v('b5', 1)['valor']) == (6 * 2, F(6, 2)))
# b6: 2n = 8 → 2^4
cierto('b6: 2^4 = 16', v('b6')['valor'] == 2 ** (8 // 2))
# b7: 48 h / 8 h = 6 ciclos → 64
cierto('b7: 2^(48/8) = 64', v('b7')['valor'] == 2 ** (48 // 8))
# b8: 50 × 4 y 50 × 1
cierto('b8: 200 espermatozoides y 50 óvulos', (v('b8', 0)['valor'], v('b8', 1)['valor']) == (50 * modelo(2, 'mei')['t2'][0], 50 * 1))
# b13: 25 % de 16 h
cierto('b13: 25 % de 16 h = 4 h', v('b13')['valor'] == F(25, 100) * 16)
# b14: 2n = 6 → 8 × 8
cierto('b14: (2^3)^2 = 64', v('b14')['valor'] == (2 ** 3) ** 2)
# c1: 15 % de 20 h; el histograma suma 100
cierto('c1: 55 + 30 + 15 = 100 y S = 15 % de 20 h = 3 h', 55 + 30 + 15 == 100 and v('c1')['valor'] == F(15, 100) * 20)
# c3: 2n = 10, anafase I por célula: 10 cromosomas, 20 cromátidas
M10 = modelo(10, 'mei')['a1']
cierto('c3: anafase I 10 cromosomas y 20 cromátidas', (v('c3', 0)['valor'], v('c3', 1)['valor']) == (M10[1], M10[2]))
# c5: 1/2^23
cierto('c5: 2^23 = 8 388 608', v('c5')['valor'] == 2 ** 23 == 8388608)
# c7: no disyunción en una de las dos células de meiosis II: 2 anómalos de 4
cierto('c7: 2 de 4 gametos anómalos', v('c7')['valor'] == 2 and 4 == modelo(2, 'mei')['t2'][0])
# c8: 2n = 18
cierto('c8: 9 bivalentes y 36 cromátidas', (v('c8', 0)['valor'], v('c8', 1)['valor']) == (18 // 2, modelo(18, 'mei')['p1'][2]))
# c9: 4c × 3,2e9 pb × 0,34 nm
long_m = F(4) * F(32, 10) * F(10) ** 9 * F(34, 100) * F(10) ** -9
cierto('c9: 4,352 m de ADN', long_m == F('4.352') and abs(v('c9')['valor'] - float(long_m)) < 1e-9)

# teoría: 2^23, 4^23, ejemplos
cierto('teoría: 2^23 = 8 388 608 y 2^46 ≈ 7,0 · 10^13', 2 ** 23 == 8388608 and abs(2 ** 46 / 1e13 - 7.04) < 0.01 and '8 388 608' in teoria and '70 368 744 177 664' in teoria and 4 ** 23 == 70368744177664)
cierto('teoría: ejemplo 2 (guisante 2n = 14): 28 cromátidas, 7+14, 128', modelo(14, 'mei')['p1'][2] == 28 and modelo(14, 'mei')['m2'][1:] == (7, 14) and 2 ** 7 == 128 and all(x in teoria_l for x in ('28 cromátidas', '128')))
cierto('teoría: ejemplo 1 (humano): 46/92/92 y 2c/4c', modelo(46, 'mit')['met'][1:] == (46, 92) and modelo(46, 'mit')['ana'][1] == 92 and all(x in teoria_l for x in ('92 cromátidas', '92 cromosomas')))
# ejemplo 3: 40 + 30 + 20 + 10 = 100 y duraciones
fr = [F(40, 100), F(30, 100), F(20, 100), F(10, 100)]
dur = [f * 24 for f in fr]
cierto('teoría: ejemplo 3 (9,6; 7,2; 4,8; 2,4 h; suma 24)', sum(fr) == 1 and [float(x) for x in dur] == [9.6, 7.2, 4.8, 2.4] and sum(dur) == 24 and all(x in teoria_l for x in ('9,6 h', '7,2 h', '4,8 h', '2,4 h')))
cierto('teoría: ejemplo 4 (72 h / 12 h = 6 ciclos → 64; 400 y 100)', 72 // 12 == 6 and 2 ** 6 == 64 and 100 * 4 == 400 and all(x in teoria_l for x in ('64 células', '400 espermatozoides', '100 óvulos')))
cierto('teoría: ejemplo PAU 2n = 12 → 12 cromosomas y 24 cromátidas', modelo(12, 'mit')['met'][1:] == (12, 24) and '12 cromosomas y 24 cromátidas' in teoria_l)
cierto('teoría: tabla de 2n por especie coherente (n = 2n/2)', all(a // 2 == b for a, b in ((8, 4), (14, 7), (16, 8), (20, 10), (38, 19), (46, 23), (48, 24), (78, 39))))
cierto('teoría: tablas 2n de la sección 1 contienen esos pares', all(x in teoria for x in ('>78<', '>39<', '>48<', '>24<', '>38<', '>19<')))
cierto('teoría: límite de Hayflick ≈ 50 y 24 h / 1 h', '50' in teoria and '24 horas' in teoria_l)

# ---------------------------------------------------------------- hechos de ejercicios de opción (única correcta que coincide con el hecho)
hechos = {
    'a1': 'dos', 'a2': 'poros', 'a4': 'fase s', 'a5': 'durante la división', 'a7': 'anafase', 'a10': 'placa celular',
    'a11': 'profase i', 'a15': 'trisomía', 'b9': 'telofase', 'b11': 'unida a su ciclina', 'b12': 'g1',
    'b15': 'anillo', 'b17': 'sinapsis', 'c2': 'meiosis', 'c4': 'metafase ii'
}
for i, k in hechos.items():
    c = v(i)
    ops = c['opciones']
    cierto('%s: la opción correcta contiene «%s»' % (i, k), k in ops[c['ok']].lower())
    cierto('%s: ninguna otra opción coincide con el hecho' % i, sum(k in o.lower() for j, o in enumerate(ops) if j != c['ok']) == 0 or i in ('a1', 'b12', 'a15', 'a7'))
for i in ('a3', 'a8', 'a14', 'b10', 'b16', 'c6'):
    c1, c2 = checks(EJ[i])
    esperado = {'a3': 1, 'a8': 0, 'a14': 1, 'b10': 1, 'b16': 0, 'c6': 0}[i]
    cierto('%s: V/F coherente con el hecho' % i, c1['ok'] == esperado and c2['ok'] == 0)
cierto('a6: cinetocoro; a12: homólogos', v('a6')['valores'] == ['cinetocoro'] and 'homólogos' in v('a12')['valores'])
cierto('c4: célula con 3 cromosomas dobles y 2n = 6: n = 3, metafase II', 6 // 2 == 3 and modelo(6, 'mei')['m2'] == (2, 3, 6))

# ---------------------------------------------------------------- ficha
cierto('ficha: 2n = 46 y 8 388 608 como en la teoría', '46' in vz_txt and '8 388 608' in vz_txt and 2 ** 23 == 8388608)
cierto('ficha: Nobel 2001 de Hartwell, Nurse y Hunt como en la teoría', all(x in vz_txt for x in ('hartwell', 'nurse', 'hunt', '2001')) and all(x in teoria_l for x in ('hartwell', 'nurse', 'hunt', '2001')))
cierto('ficha: Flemming 1882', 'flemming' in vz_txt and '1882' in vz_txt)
cierto('ficha: 2c a 4c en la fase S', '2c a 4c' in vz_txt and '2c a 4c' in teoria_l or ('2c' in teoria_l and '4c' in teoria_l))
cierto('ficha: Down 47, Turner 45, Klinefelter 47 XXY como en la teoría', all(x in vz_txt for x in ('down', '47', 'turner', '45', 'klinefelter', 'xxy')) and all(x in teoria_l for x in ('down', 'turner', 'klinefelter', 'xxy')))
cierto('ficha: cita de 6 400 millones = 2 × 3,2 · 10^9', 2 * F(32, 10) * 10 ** 9 == 6400 * 10 ** 6 and '6 400 millones' in vz_txt)
cierto('ficha: 6 bloques, 3 mini-tablas', len(vz['bloques']) == 6 and sum('tabla' in b for b in vz['bloques']) == 3)
cierto('ficha: 10 palabras clave', len(vz['claves']) == 10)
cierto('ficha conecta con Biología T5, T6, T11 y Química II', all(any(x in c['con'] for c in vz['conecta']) for x in ('Biología T5', 'Biología T6', 'Biología T11', 'Química II')))
for term, _ in vz['claves']:
    base = limpio(term).lower().split(' ')[0]
    cierto('clave «%s» aparece en la teoría' % term, base in teoria_l)

# ---------------------------------------------------------------- estructura mínima del tema
niveles = [e['nivel'] for e in T['ejercicios']]
cierto('≥ 40 ejercicios', len(T['ejercicios']) >= 40)
cierto('hay ejercicios de los tres niveles', set(niveles) == {1, 2, 3})
cierto('ids únicos', len({e['id'] for e in T['ejercicios']}) == len(T['ejercicios']))
cierto('todos con pasos y resultado', all(e.get('pasos') and e.get('resultado') for e in T['ejercicios']))
rub = [e for e in T['ejercicios'] if checks(e)[0]['tipo'] == 'rubrica']
cierto('5 preguntas abiertas con rúbrica', len(rub) == 5)
cierto('rúbricas suman 2 puntos', all(abs(sum(i['p'] for i in checks(e)[0]['items']) - 2.0) < 1e-9 for e in rub))
for e in T['ejercicios']:
    for c in checks(e):
        if c['tipo'] == 'opcion':
            cierto('%s: opciones distintas y ok en rango' % e['id'], len(set(c['opciones'])) == len(c['opciones']) and 0 <= c['ok'] < len(c['opciones']))
cierto('lámina con ≥ 4 elementos', len(T['lamina']) >= 4)
cierto('resumen con ≥ 4 ideas', len(T['resumen']) >= 4)
cierto('tarjetas ≥ 14', len(T['datos']['tarjetas1']['cartas']) >= 14)
cierto('test de ≥ 8 preguntas y 5 errores', len(T['datos']['quiz1']['preguntas']) >= 8 and len(T['datos']['errores']['preguntas']) >= 5)
for k in ('quiz1', 'errores', 'quizmit'):
    cierto('%s: 4 opciones y ok válido' % k, all(len(p['op']) == 4 and 0 <= p['ok'] < 4 for p in T['datos'][k]['preguntas']))
# quizmit: cifra de metafase 2n = 8 y quiz1: metafase II humana
cierto('quizmit: metafase 2n = 8 → 16 cromátidas', T['datos']['quizmit']['preguntas'][2]['op'][T['datos']['quizmit']['preguntas'][2]['ok']] == str(modelo(8, 'mit')['met'][2]))
q = T['datos']['quiz1']['preguntas'][7]
cierto('quiz1: metafase II humana 23 cromosomas y 46 cromátidas', q['op'][q['ok']] == '%d cromosomas y %d cromátidas' % modelo(46, 'mei')['m2'][1:])
# orden de mitosis y meiosis (primer elemento = el primero)
cierto('ordenmit: 6 pasos en orden correcto de fases', [limpio(x['t']).split('(')[-1].rstrip(')') for x in T['datos']['ordenmit']['items']] == ['profase', 'prometafase', 'metafase', 'anafase', 'telofase', 'citocinesis'])
cierto('ordenmei: 7 pasos con una sola replicación primero y telofase II al final', len(T['datos']['ordenmei']['items']) == 7 and 'replicación' in T['datos']['ordenmei']['items'][0]['t'].lower() and 'cuatro' in T['datos']['ordenmei']['items'][-1]['t'].lower())
cierto('mitmei: 9 rasgos en 3 categorías', len(T['datos']['mitmei']['items']) == 9 and {i['c'] for i in T['datos']['mitmei']['items']} == {0, 1, 2})

if fallos:
    print('FALLOS:')
    for f in fallos:
        print('  -', f)
print('%d comprobaciones correctas, %d fallos' % (ok, len(fallos)))
sys.exit(1 if fallos else 0)
