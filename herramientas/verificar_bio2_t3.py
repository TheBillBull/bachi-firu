#!/usr/bin/env python3
"""
Verificación independiente de Biología II, tema 3 (Lípidos).
No comparte código con la web: recalcula con fracciones cada cifra de ejemplos y ejercicios (masas molares,
saponificación, hidrogenación, índices de saponificación y de yodo, energía, fórmulas CnH(2n-2k)O2, carbonos de un
triacilglicérido, cociente de Gorter y Grendel), comprueba hechos y fechas de la ficha, que cada ejercicio de opción
tenga una única respuesta correcta que coincida con los hechos, los datos del widget bio_acidograso
(fórmula, Mr y H = 2C − 2·dobles enlaces) y que la ficha no contradiga la teoría.

Convención declarada: masas atómicas C 12,011; H 1,008; O 15,999; Na 22,990; K 39,098; I 126,904.
Energía de la grasa 9 kcal/g y de los glúcidos 4 kcal/g (otros libros: 9,3 y 4,1; se acepta la idea «más del doble»).

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_bio2_t3.py /tmp/ampl.json
"""
import json, os, re, sys
from fractions import Fraction as F

ok, fallos = 0, []


def cierto(nombre, cond):
    global ok
    if cond:
        ok += 1
    else:
        fallos.append(nombre)


def casi(nombre, a, b, tol=0.005):
    cierto('%s: %s ≈ %s' % (nombre, a, b), abs(a - b) <= tol * max(abs(b), 1e-12))


def limpio(s):
    return re.sub(r'<[^>]+>', '', s)


datos = json.load(open(sys.argv[1]))
T = datos['ampl']['bio2']['t3']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# ---------------------------------------------------------------- masas molares
AT = {'C': F('12.011'), 'H': F('1.008'), 'O': F('15.999'), 'Na': F('22.990'), 'K': F('39.098'), 'I': F('126.904')}


def mr(**f):
    return sum(AT[k] * v for k, v in f.items())


M_TRIOLEINA = mr(C=57, H=104, O=6)
M_NAOH = mr(Na=1, O=1, H=1)
M_KOH = mr(K=1, O=1, H=1)
M_OLEATO = mr(C=18, H=33, O=2, Na=1)
M_GLICERINA = mr(C=3, H=8, O=3)
M_H2 = mr(H=2)
M_I2 = mr(I=2)

# composición de la trioleína: glicerina C3H5 + 3 oleoílo; C57H104O6 = C3H8O3 + 3 C18H34O2 − 3 H2O
cierto('trioleína = glicerina + 3 oleico − 3 H2O', M_TRIOLEINA == M_GLICERINA + 3 * mr(C=18, H=34, O=2) - 3 * mr(H=2, O=1))
casi('Mr trioleína 885,45', float(M_TRIOLEINA), 885.45, 0.0001)
casi('Mr NaOH 40,00', float(M_NAOH), 40.00, 0.001)
casi('Mr oleato sódico 304,45', float(M_OLEATO), 304.45, 0.0005)
casi('Mr glicerina 92,09', float(M_GLICERINA), 92.09, 0.0005)

# conservación de la masa en la saponificación
cierto('saponificación: masa reactivos = masa productos', M_TRIOLEINA + 3 * M_NAOH == M_GLICERINA + 3 * M_OLEATO)
n = F(100) / M_TRIOLEINA
casi('100 g trioleína: 0,1129 mol', float(n), 0.1129, 0.001)
casi('NaOH 13,55 g', float(3 * n * M_NAOH), 13.55, 0.001)
casi('jabón 103,15 g', float(3 * n * M_OLEATO), 103.15, 0.001)
casi('glicerina 10,40 g', float(n * M_GLICERINA), 10.40, 0.001)
cierto('100 + 13,55 = 103,15 + 10,40 (113,55 g)', abs((100 + float(3 * n * M_NAOH)) - float(3 * n * M_OLEATO + n * M_GLICERINA)) < 1e-6)
casi('H2 de la hidrogenación 0,683 g', float(3 * n * M_H2), 0.683, 0.001)
casi('índice de saponificación 190,1 mg KOH/g', float(3 * M_KOH / M_TRIOLEINA * 1000), 190.1, 0.001)
casi('índice de yodo 86,0 g/100 g', float(3 * M_I2 / M_TRIOLEINA * 100), 86.0, 0.001)
cierto('índices de la trioleína dentro del rango del aceite de oliva (185–195; 75–94)',
       185 <= float(3 * M_KOH / M_TRIOLEINA * 1000) <= 195 and 75 <= float(3 * M_I2 / M_TRIOLEINA * 100) <= 94)

# ---------------------------------------------------------------- ácidos grasos: fórmula CnH(2n−2k)O2 y datos del widget
widget_fuente = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'ampliaciones', 'lab_bio_t3.js'), encoding='utf-8').read()
SUB = {'₀': 0, '₁': 1, '₂': 2, '₃': 3, '₄': 4, '₅': 5, '₆': 6, '₇': 7, '₈': 8, '₉': 9}
filas = re.findall(r'\{ k: "(\w+)", t: "([^"]+)", nt: "([^"]+)", c: (\d+), d: \[([^\]]*)\], f: "([^"]+)", mr: ([\d.]+), tf: (-?\d+)', widget_fuente)
cierto('widget: 5 ácidos grasos', len(filas) == 5)
TF_REF = {'pal': 63, 'est': 70, 'ole': 13, 'lin': -5, 'lnc': -11}   # tablas habituales (°C, redondeado)
for k, t, nt, c, d, f, m, tf in filas:
    c = int(c)
    dd = [int(x) for x in d.split(',') if x.strip()]
    nh = 2 * c - 2 * len(dd)
    mm = re.match(r'C([₀-₉]+)H([₀-₉]+)O₂', f)
    cc = int(''.join(str(SUB[x]) for x in mm.group(1)))
    hh = int(''.join(str(SUB[x]) for x in mm.group(2)))
    cierto('%s: fórmula %s = C%d H%d' % (t, f, c, nh), cc == c and hh == nh)
    casi('%s: Mr %s' % (t, m), float(m), float(mr(C=c, H=nh, O=2)), 0.0005)
    cierto('%s: punto de fusión %s°C acorde con tablas' % (t, tf), int(tf) == TF_REF[k])
    cierto('%s: notación %s coherente con C y dobles enlaces' % (t, nt), nt.startswith('C%d:%d' % (c, len(dd))))
    cierto('%s: dobles enlaces cada 3 carbonos (Δ9,12,15)' % t, all(b - a == 3 for a, b in zip(dd, dd[1:])))
tfs = {k: int(tf) for k, t, nt, c, d, f, m, tf in filas}
cierto('a 18 C el punto de fusión baja al añadir dobles enlaces', tfs['est'] > tfs['ole'] > tfs['lin'] > tfs['lnc'])
cierto('a 20 °C: esteárico sólido, oleico y poliinsaturados líquidos', tfs['est'] > 20 and tfs['ole'] < 20 and tfs['lin'] < 20)
cierto('a 4 °C el oleico (13 °C) solidifica; el linoleico (−5 °C) no', tfs['ole'] > 4 and tfs['lin'] < 4)
cierto('d5: único sólido a 0 °C y líquido a 20 °C es el oleico', [k for k, v in tfs.items() if 0 < v <= 20] == ['ole'])

# ---------------------------------------------------------------- cálculos de los ejercicios
casi('5: 25 g · 9 kcal/g', 25 * 9, 225)
cierto('c6: carbonos del triacilglicérido 3 + 16 + 18 + 18', 3 + 16 + 18 + 18 == 55)
cierto('c7: H del linolénico 2·18 − 2·3', 2 * 18 - 2 * 3 == 30)
cierto('c8: H2 por mol de trilinoleína 3·2', 3 * 2 == 6)
cierto('d1: 2000/4 − 2000/9 ≈ 277,8', abs((F(2000, 4) - F(2000, 9)) - F('277.78')) < F('0.01'))
cierto('teoría: 2000/9 ≈ 222 g y 500 g', '222' in teoria_l and '500 g' in teoria_l and abs(2000 / 9 - 222) < 0.5)
cierto('d2: cociente de Gorter y Grendel 9,0 / 4,5 = 2', F('9.0') / F('4.5') == 2)
cierto('9/4 = 2,25 (más del doble)', F(9, 4) == F('2.25') and F(9, 4) > 2)
cierto('palmítico+oleico+esteárico: 52 C de ácidos', 16 + 18 + 18 == 52)

ESPERADO = {'c1': float(M_TRIOLEINA), 'c2': float(3 * n * M_NAOH), 'c3': float(3 * n * M_OLEATO), 'c4': float(n * M_GLICERINA),
            'c5': 225, 'c6': 55, 'c7': 30, 'c8': 6, 'c9': float(3 * n * M_H2), 'd1': float(F(2000, 4) - F(2000, 9)), 'd2': 2,
            'd3': float(3 * M_KOH / M_TRIOLEINA * 1000), 'd4': float(3 * M_I2 / M_TRIOLEINA * 100)}
for eid, v in ESPERADO.items():
    ch = EJ[eid]['check']
    cierto('%s es de tipo num' % eid, ch['tipo'] == 'num')
    casi('ejercicio %s' % eid, ch['valor'], v, 0.003)
    cierto('%s: tolerancia razonable (≤ 2 %%)' % eid, ch.get('tol', 0.005) <= 0.02)

# ---------------------------------------------------------------- ejercicios de opción: única correcta y coincide con los hechos
def checks(e):
    c = e['check']
    return c if isinstance(c, list) else [c]


for e in T['ejercicios']:
    for c in checks(e):
        if c['tipo'] == 'opcion':
            ops = c['opciones']
            cierto('%s: opciones distintas' % e['id'], len(set(ops)) == len(ops))
            cierto('%s: ok dentro de rango' % e['id'], 0 <= c['ok'] < len(ops))

CLAVE = {
    'b1': 'insolubles en agua', 'b2': 'triacilglicérido', 'b3': 'dobles enlaces', 'b5': '3', 'b6': 'reserva', 'b9': 'fosfolípido',
    'b10': 'bicapa', 'b11': 'esteroide', 'b14': 'vitamina d', 'b16': 'oleico', 'c10': '20 carbonos y 4 dobles', 'c12': 'micelas',
    'c14': 'hidrogena', 'c15': 'no se evapora', 'd5': '(oleico)', 'd6': 'más ácidos grasos insaturados', 'd7': '180 es más insaturado',
}
for eid, k in CLAVE.items():
    c = checks(EJ[eid])[0]
    cierto('%s: la correcta contiene «%s»' % (eid, k), k.lower() in c['opciones'][c['ok']].lower())
    if k != '3':
        cierto('%s: ninguna otra contiene «%s»' % (eid, k), all(k.lower() not in o.lower() for i, o in enumerate(c['opciones']) if i != c['ok']))
cierto('b5: la correcta es exactamente 3', checks(EJ['b5'])[0]['opciones'][checks(EJ['b5'])[0]['ok']] == '3')
cierto('d7: el de 180 es el más insaturado (el de 80 no)', checks(EJ['d7'])[0]['opciones'][checks(EJ['d7'])[0]['ok']].startswith('El de 180'))

VF_ESP = {'b4': True, 'b7': True, 'b15': False, 'c11': True}
for eid, v in VF_ESP.items():
    c = checks(EJ[eid])[0]
    cierto('%s: V/F correcto' % eid, (c['opciones'][c['ok']] == 'Verdadero') == v)

EMP = {
    'b13': {'Triacilglicérido': 'Reserva', 'Cera': 'Impermeabiliza', 'Colesterol': 'fluidez'},
    'c13': {'Micela': 'una cola', 'Bicapa': 'Doble lámina', 'Liposoma': 'Vesícula'},
    'c16': {'Hidrólisis enzimática (lipasa)': 'Glicerina y ácidos grasos', 'Saponificación': 'Glicerina y jabón', 'Hidrogenación': 'más saturada'},
}
for eid, mapa in EMP.items():
    for c in checks(EJ[eid]):
        k = mapa[c['etiqueta']]
        cierto('%s/%s correcto' % (eid, c['etiqueta']), k.lower() in c['opciones'][c['ok']].lower())
        cierto('%s/%s única' % (eid, c['etiqueta']), sum(k.lower() in o.lower() for o in c['opciones']) == 1)

for eid, vals in {'b8': ['éster', 'ester'], 'b12': ['saponificación', 'saponificacion']}.items():
    cierto('%s: valores aceptados' % eid, EJ[eid]['check']['valores'] == vals)

# ---------------------------------------------------------------- test y «encuentra el error»
for nombre in ('quiz1', 'errores'):
    for p in T['datos'][nombre]['preguntas']:
        cierto('%s: %s… ok en rango y opciones distintas' % (nombre, p['q'][:25]), 0 <= p['ok'] < len(p['op']) and len(set(p['op'])) == len(p['op']))
FALSAS = [
    ('Todos los lípidos contienen ácidos grasos', 'no tienen ácidos grasos'),
    ('Los insaturados tienen la cadena recta', 'doblada'),
    ('enlaces glucosídicos', 'éster'),
    ('Son completamente apolares', 'anfipáticos'),
    ('Se saponifica porque contiene ácidos grasos', 'no tiene ácidos grasos'),
    ('hidrólisis ácida', 'alcalina'),
    ('flip-flop de los fosfolípidos es rapidísimo', 'flipasas'),
]
errs = T['datos']['errores']['preguntas']
cierto('errores: 7 preguntas', len(errs) == 7)
for p, (f, por) in zip(errs, FALSAS):
    cierto('error «%s»: la señalada es la falsa' % f, f.lower() in p['op'][p['ok']].lower())
    cierto('error «%s»: explicación coherente' % f, por.lower() in limpio(p['porque']).lower())
cierto('quiz1: 8 preguntas', len(T['datos']['quiz1']['preguntas']) == 8)

# ---------------------------------------------------------------- clasificar, ordenar, emparejar
FAM = {'Triacilglicérido': 0, 'Fosfolípido': 0, 'Cera de abeja': 0, 'Esfingomielina': 0, 'Colesterol': 1, 'Testosterona': 1, 'β-caroteno': 1, 'Vitamina D': 1}
for it in T['datos']['familias']['items']:
    cierto('familia %s' % it['t'], FAM[it['t']] == it['c'])
cierto('familias: 8 elementos', len(T['datos']['familias']['items']) == 8)
o = [i['t'] for i in T['datos']['ordentg']['items']]
cierto('orden del triacilglicérido', '–OH' in o[0] and '–COOH' in o[1] and 'éster' in o[2] and 'segundo y el tercer' in o[3] and '3 H₂O' in o[4])
cierto('emparejar reacciones: 5 pares y saponificación con NaOH', len(T['datos']['reacciones']['pares']) == 5 and any(a == 'Saponificación' and 'NaOH' in b for a, b in T['datos']['reacciones']['pares']))

# ---------------------------------------------------------------- ficha coherente con la teoría y con los hechos
def autor(n):
    return [a for a in vz['autores'] if a['n'] == n][0]


cierto('Chevreul 1823', autor('Chevreul')['f'] == '1823')
cierto('Gorter y Grendel 1925', autor('Gorter y Grendel')['f'] == '1925')
cierto('Singer y Nicolson 1972', autor('Singer y Nicolson')['f'] == '1972')
for f in ('1925', '1972'):
    cierto('la teoría cita %s' % f, f in teoria_l)
cierto('ficha: 6 bloques', len(vz['bloques']) == 6)
cierto('ficha: 10 palabras clave', len(vz['claves']) == 10)
cierto('ficha: ≤ 3 frases por bloque', all(len(b['frases']) <= 3 for b in vz['bloques']))
cierto('ficha: frases cortas (≤ 16 palabras)', all(len(limpio(f).split()) <= 16 for b in vz['bloques'] for f in b['frases']))
for b in vz['bloques']:
    if 'tabla' in b:
        cierto('ficha: tabla de 2 columnas en «%s»' % b['t'], all(len(f) == 2 for f in b['tabla']['filas']))
cierto('ficha: ≥ 3 mini-tablas', sum('tabla' in b for b in vz['bloques']) >= 3)
cierto('ficha: 9 kcal/g y 4 kcal/g igual que la teoría', '9 kcal' in vz_txt and '4 kcal' in vz_txt and '9 kcal/g' in teoria_l and '4 kcal/g' in teoria_l)
cierto('ficha: «tres» ácidos grasos / 3 H₂O coherente con la teoría', '3 h₂o' in vz_txt and '3 h2o' in teoria_l)
cierto('ficha: colesterol de 4 anillos y C27H46O de la teoría', '4 anillos' in vz_txt and 'c27h46o' in teoria_l and 'cuatro anillos' in teoria_l)
cierto('ficha: saponificación grasa + 3 NaOH como en la teoría', '3 naoh' in vz_txt and '3 naoh' in teoria_l)
cierto('ficha: ácidos esenciales linoleico ω-6 y linolénico ω-3 como en la teoría', 'ω-6' in vz_txt and 'ω-3' in vz_txt and 'ω-6' in teoria_l and 'ω-3' in teoria_l)
cierto('ficha: bicapa, micela y liposoma presentes en la teoría', all(x in teoria_l for x in ('bicapa', 'micela', 'liposoma')))
for term, _ in vz['claves']:
    base = limpio(term).lower().split(' ')[0]
    cierto('clave «%s» aparece en la teoría' % term, base in teoria_l)
cierto('ficha conecta con Biología T1, T6 y Química II', all(any(x in c['con'] for c in vz['conecta']) for x in ('Biología T1', 'Biología T6', 'Química II')))
cierto('ficha: clave de ácido graso con –COOH', any('–COOH' in d for t, d in vz['claves']))

# ---------------------------------------------------------------- teoría: cifras citadas coinciden con los cálculos
for frag in ('885,45', '13,55', '103,2', '10,40', '0,683', '190,1', '86,0', '55 c', '9 kcal/g', '278 g', '70 °c', '13 °c', '−11 °c', '5 nm', 'c27h46o'):
    cierto('teoría cita «%s»' % frag, frag in teoria_l)
cierto('teoría: 113,55 g en reactivos y productos', '113,55' in teoria_l)
cierto('teoría: la fórmula oleico C18H34O2, linoleico C18H32O2, linolénico C18H30O2', all(x in teoria_l for x in ('c₁₈h₃₄o₂', 'c₁₈h₃₂o₂', 'c₁₈h₃₀o₂')) or all(x in teoria_l for x in ('c18h34o2', 'c18h32o2', 'c18h30o2')))
cierto('teoría: 3 + 16 + 18 + 18 = 55', '3 + 16 + 18 + 18' in teoria_l)
cierto('teoría: ejemplo de enrancimiento/otros: lipasas', 'lipasa' in teoria_l)

# ---------------------------------------------------------------- estructura mínima del tema
niveles = [e['nivel'] for e in T['ejercicios']]
cierto('≥ 40 ejercicios', len(T['ejercicios']) >= 40)
cierto('hay ejercicios de los tres niveles', set(niveles) == {1, 2, 3})
cierto('ids únicos', len({e['id'] for e in T['ejercicios']}) == len(T['ejercicios']))
cierto('todos con pasos y resultado', all(e.get('pasos') and e.get('resultado') for e in T['ejercicios']))
rub = [e for e in T['ejercicios'] if checks(e)[0]['tipo'] == 'rubrica']
cierto('5 preguntas abiertas con rúbrica', len(rub) == 5)
cierto('rúbricas suman 2 puntos', all(abs(sum(i['p'] for i in checks(e)[0]['items']) - 2.0) < 1e-9 for e in rub))
cierto('lámina con ≥ 4 elementos', len(T['lamina']) >= 4)
cierto('resumen con ≥ 4 ideas', len(T['resumen']) >= 4)
cierto('tarjetas ≥ 14', len(T['datos']['tarjetas1']['cartas']) >= 14)

if fallos:
    print('FALLOS:')
    for f in fallos:
        print('  -', f)
print('%d comprobaciones correctas, %d fallos' % (ok, len(fallos)))
sys.exit(1 if fallos else 0)
