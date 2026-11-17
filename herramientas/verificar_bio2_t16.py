#!/usr/bin/env python3
"""
Verificación independiente de Biología II, tema 16 (Evolución).
No comparte código con la web: recalcula con fracciones/sympy cada cifra de ejemplos y ejercicios
(frecuencias alélicas contando alelos, Hardy-Weinberg, portadores, selección contra el recesivo, flujo génico,
probabilidad de fijación, recapturas de polillas, gametos por segregación independiente) y el modelo
determinista del widget bio_deriva; comprueba hechos y fechas de la ficha, que cada ejercicio tenga una única
respuesta correcta coherente con los hechos y que la ficha no contradiga la teoría.

Convenciones declaradas: dos alelos (p + q = 1); equilibrio de Hardy-Weinberg: AA = p², Aa = 2pq, aa = q²;
selección contra aa con eficacia 1 − s: q' = q(1 − s·q)/(1 − s·q²); flujo génico: q' = (1 − m)·q + m·q_fuente;
probabilidad de fijación de un alelo neutro = 1/(2N).

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_bio2_t16.py /tmp/ampl.json
"""
import json, math, re, sys
from fractions import Fraction as F
import sympy as sp

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


def checks(e):
    c = e['check']
    return c if isinstance(c, list) else [c]


datos = json.load(open(sys.argv[1]))
T = datos['ampl']['bio2']['t16']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# ---------------------------------------------------------------- Hardy-Weinberg con sympy / fracciones
q, p = sp.symbols('q p', positive=True)


def hw(q_):
    p_ = 1 - q_
    return p_ * p_, 2 * p_ * q_, q_ * q_


for q_ in (F(1, 2), F(1, 5), F(1, 10), F(3, 10), F(1, 50), F(1, 100)):
    a, h, r = hw(q_)
    cierto('H-W suma 1 para q = %s' % q_, a + h + r == 1)
cierto('H-W simbólico: p² + 2pq + q² = (p+q)²', sp.expand((p + q) ** 2) == p ** 2 + 2 * p * q + q ** 2)

# fibrosis quística 1/2500 (teoría y c4)
qfq = sp.sqrt(sp.Rational(1, 2500))
cierto('FQ: q = 0,02', qfq == sp.Rational(1, 50))
casi('FQ: portadores 2pq = 3,92 %', float(2 * (1 - qfq) * qfq * 100), 3.92, 0.001)
cierto('FQ: 1/0,0392 ≈ 25,5 («1 de cada 25 o 26»)', 25 <= 1 / 0.0392 <= 26)
casi('FQ: 98 portadores por enfermo', 0.0392 / 0.0004, 98, 0.001)
# 1/10 000
q10 = sp.sqrt(sp.Rational(1, 10000))
cierto('1/10 000: q = 0,01', q10 == sp.Rational(1, 100))
casi('1/10 000: portadores 2pq = 0,0198', float(2 * (1 - q10) * q10), 0.0198, 0.0001)
casi('1/10 000: 500 000 hab → 9900 portadores', float(2 * (1 - q10) * q10 * 500000), 9900, 0.0001)
casi('1/10 000: 500 000 hab → 50 enfermos', float(q10 ** 2 * 500000), 50, 0.0001)
casi('1/10 000: ≈ 200 portadores por enfermo', float(2 * (1 - q10) * q10 / q10 ** 2), 198, 0.001)
cierto('1/50 ≈ 0,0198 (1 de cada 50)', abs(1 / 0.0198 - 50) < 1)
# albinismo 1/20 000
casi('albinismo: q = 0,00707', float(sp.sqrt(sp.Rational(1, 20000))), 0.00707, 0.001)
cierto('widget: preset 0,007 → q² ≈ 1 de cada 20 000', abs(1 / 0.007 ** 2 - 20000) / 20000 < 0.03)
cierto('widget: preset 0,02 → q² = 1 de cada 2500', round(1 / 0.02 ** 2) == 2500)

# contar alelos (teoría 320/160/20 y b12; ejemplo 40/20/40)
def frec_a(AA, Aa, aa):
    n = AA + Aa + aa
    return F(2 * aa + Aa, 2 * n)


cierto('teoría: 320/160/20 → p = 0,8, q = 0,2', frec_a(320, 160, 20) == F(1, 5) and 1 - frec_a(320, 160, 20) == F(4, 5))
cierto('teoría 320/160/20 está en equilibrio (320 = 0,64·500; 160 = 0,32·500; 20 = 0,04·500)', (320, 160, 20) == tuple(int(x * 500) for x in hw(F(1, 5))[:3]))
cierto('ejemplo 40/20/40 → p = q = 0,5', frec_a(40, 20, 40) == F(1, 2))
cierto('ejemplo 40/20/40: esperados 25/50/25 distintos de los observados', tuple(int(x * 100) for x in hw(F(1, 2))) == (25, 50, 25) and (40, 20, 40) != (25, 50, 25))
cierto('b12: 36/48/16 → q = 0,4 y está en equilibrio', frec_a(36, 48, 16) == F(2, 5) and tuple(int(x * 100) for x in hw(F(2, 5))) == (36, 48, 16))

# selección contra aa
def sel(q_, s_):
    return q_ * (1 - s_ * q_) / (1 - s_ * q_ ** 2)


cierto('selección letal: q/(1+q) equivale a la fórmula general con s = 1', all(sel(F(k, 10), 1) == F(k, 10) / (1 + F(k, 10)) for k in range(1, 10)))
qq = F(1, 5)
for n in range(1, 7):
    qq = sel(qq, 1)
    cierto('selección letal, n = %d: q = q0/(1+n q0)' % n, qq == F(1, 5) / (1 + n * F(1, 5)))
casi('teoría: q\' = 0,2/1,2 = 0,167', float(sel(F(1, 5), 1)), 0.167, 0.003)
casi('c15: q = 0,5 → 0,333', float(sel(F(1, 2), 1)), 0.333, 0.002)
casi('d3: q0 = 0,2, 2 generaciones → 0,143', float(F(1, 5) / (1 + 2 * F(1, 5))), 0.143, 0.003)

# modelo determinista del widget bio_deriva (40 generaciones desde q0 = 0,5)
def q40(s_):
    x = 0.5
    for _ in range(40):
        x = x * (1 - s_ * x) / (1 - s_ * x * x)
    return x


casi('widget: s = 0 → q40 = 0,5', q40(0), 0.5, 1e-9)
casi('widget: s = 0,5 → q40 = 0,049', q40(0.5), 0.049, 0.01)
casi('widget: s = 1 → q40 = 0,0238', q40(1.0), 0.0238, 0.01)
cierto('widget: con s > 0 el alelo baja siempre', q40(0.5) < 0.5 and q40(1.0) < q40(0.5))

# flujo génico (teoría y d5)
casi('flujo génico: 0,9·0,2 + 0,1·0,6 = 0,24', float(F(9, 10) * F(1, 5) + F(1, 10) * F(3, 5)), 0.24, 1e-9)
# fijación
cierto('fijación neutra: 1/(2·50) = 1 %', F(1, 2 * 50) == F(1, 100))
# segregación independiente
cierto('2^23 = 8 388 608', 2 ** 23 == 8388608)
cierto('4 pares → 16 gametos', 2 ** 4 == 16)
# 9 % recesivo
cierto('9 % aa: q = 0,3 y 2pq = 42 %', sp.sqrt(sp.Rational(9, 100)) == sp.Rational(3, 10) and 2 * F(7, 10) * F(3, 10) == F(21, 50))
# recapturas
casi('polillas contaminado: claras 16/64 = 25,0 %', 16 / 64 * 100, 25.0, 1e-9)
casi('polillas contaminado: oscuras 82/154 = 53,2 %', 82 / 154 * 100, 53.2, 0.002)
casi('polillas limpio: claras 54/393 = 13,7 %', 54 / 393 * 100, 13.7, 0.003)
casi('polillas limpio: oscuras 19/406 = 4,7 %', 19 / 406 * 100, 4.7, 0.01)
cierto('polillas: la oscura gana en el contaminado y la clara en el limpio', 82 / 154 > 16 / 64 and 54 / 393 > 19 / 406)
casi('d6: (48/80)/(10/50) = 3', (48 / 80) / (10 / 50), 3, 1e-9)

# ---------------------------------------------------------------- cada ejercicio numérico contra su cálculo independiente
ESPERADO = {
    'b12': float(frec_a(36, 48, 16)), 'b13': 0.7, 'c1': 0.04, 'c2': float(hw(F(1, 5))[1]), 'c3': 0.01,
    'c4': float(2 * (1 - qfq) * qfq * 100), 'c5': float(hw(F(1, 10))[1] * 1000), 'c6': float(sp.sqrt(sp.Rational(1, 20000))) * 1000,
    'c9': float(F(1, 4) * 200), 'c15': float(sel(F(1, 2), 1)), 'c16': 16, 'd1': 42, 'd2': float(hw(F(1, 2))[1] * 100),
    'd3': float(F(1, 5) / (1 + 2 * F(1, 5))), 'd4': 1, 'd5': 0.24, 'd6': 3,
}
for eid, v in ESPERADO.items():
    ch = EJ[eid]['check']
    cierto('%s es de tipo num' % eid, ch['tipo'] == 'num')
    casi('ejercicio %s' % eid, ch['valor'], v, 0.004)
    cierto('%s: tolerancia razonable (≤ 2 %%)' % eid, ch.get('tol', 0.005) <= 0.02)
    cierto('%s: enunciado, pasos y resultado presentes' % eid, EJ[eid]['enunciado'] and EJ[eid]['pasos'] and EJ[eid]['resultado'])

# ---------------------------------------------------------------- teoría: cifras y hechos citados coinciden con los cálculos
for frag in ('8 388 608', '0,8', '0,2', '0,0392', '0,0004', '98 portadores', '9900', '0,0198', '0,167', '0,24', '1/(2n)' if False else '1/100',
             '25,0 %', '53,2 %', '13,7 %', '4,7 %', 'p² + 2pq + q² = 1', '1908', '1859', '1858', '1809', '1972', '1953', '1967'):
    cierto('teoría cita «%s»' % frag, frag in teoria_l)
for hecho in ('weismann', 'kettlewell', 'malthus', 'wallace', 'dobzhansky', 'mayr', 'simpson', 'oparin', 'haldane', 'miller', 'margulis',
              'atapuerca', 'archaeopteryx', 'tiktaalik', 'poliploidía', 'cuello de botella', 'efecto fundador', 'radiación adaptativa',
              'equilibrio puntuado', 'direccional', 'estabilizadora', 'disruptiva', 'prezigóticas', 'postzigóticas', 'mula'):
    cierto('teoría menciona «%s»' % hecho, hecho in teoria_l)
cierto('teoría: Darwin en el Beagle 1831-1836', '1831-1836' in teoria_l)
cierto('teoría: Mendel 1866 y redescubrimiento en 1900', '1866' in teoria_l and '1900' in teoria_l)
cierto('teoría: Dobzhansky 1937, Mayr 1942, Simpson 1944', '1937' in teoria_l and '1942' in teoria_l and '1944' in teoria_l)
cierto('teoría: Oparin 1924, Haldane 1929', '1924' in teoria_l and '1929' in teoria_l)
cierto('teoría: el antepasado común con el chimpancé NO se describe como descendencia directa', 'no descendemos de los chimpancés actuales' in teoria_l)
cierto('teoría: las cinco condiciones de Hardy-Weinberg (población grande, azar, sin selección, mutación ni migración)',
       all(t in teoria_l for t in ('muy grande', 'al azar', 'sin selección', 'sin mutaciones', 'sin migración')))
cierto('teoría: homólogos ↔ divergente y análogos ↔ convergente', 'evolución divergente' in teoria_l and 'evolución convergente' in teoria_l)
cierto('Archaeopteryx ≈ 150 millones de años', '150 millones' in teoria_l)
cierto('Lucy ≈ 3,2 millones de años y Atapuerca 850 000 / 430 000', '3,2 millones' in teoria_l and '850 000' in teoria_l and '430 000' in teoria_l)
cierto('H. sapiens ≈ 300 000 años', '300 000' in teoria_l)

# ---------------------------------------------------------------- ficha coherente con la teoría y con los hechos
FECHAS = {'Lamarck': '1809', 'Darwin y Wallace': '1858–1859', 'Hardy y Weinberg': '1908', 'Dobzhansky': '1937', 'Eldredge y Gould': '1972'}
for a in vz['autores']:
    if a['n'] in FECHAS:
        cierto('ficha: %s %s' % (a['n'], FECHAS[a['n']]), a['f'] == FECHAS[a['n']])
        base = FECHAS[a['n']][:4]
        cierto('ficha: la fecha de %s aparece en la teoría' % a['n'], base in teoria_l)
cierto('ficha: 6 autores/hitos incluyendo «Qué estudia»', len(vz['autores']) == 6)
cierto('ficha: 6 bloques', len(vz['bloques']) == 6)
cierto('ficha: al menos 3 mini-tablas', sum(1 for b in vz['bloques'] if 'tabla' in b) >= 3)
cierto('ficha: frases ≤ 15 palabras y ≤ 3 por bloque', all(len(b['frases']) <= 3 and all(len(limpio(f).split()) <= 15 for f in b['frases']) for b in vz['bloques']))
cierto('ficha: 10 palabras clave', len(vz['claves']) == 10)
for term, _ in vz['claves']:
    base = term.lower().split(' ')[0]
    cierto('clave «%s» aparece en la teoría' % term, base in teoria_l)
cierto('ficha: fórmula de Hardy-Weinberg igual que la teoría', 'p² + 2pq + q² = 1' in vz_txt and 'p² + 2pq + q² = 1' in teoria_l)
cierto('ficha: homólogo → divergente / análogo → convergente igual que la teoría', 'divergente' in vz_txt and 'convergente' in vz_txt)
cierto('ficha: conecta con T7, T10–T11, T12–T13 y Química II', all(any(k in c['con'] for c in vz['conecta']) for k in ('T7', 'T10', 'T12', 'Química II')))
cierto('ficha: mecanismos selección, deriva, flujo, mutación', all(k in vz_txt for k in ('selección natural', 'deriva genética', 'flujo génico', 'mutación')))
cierto('ficha: la cita recuerda que evolucionan las poblaciones', 'poblaciones' in vz['cita']['txt'].lower())

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
cierto('lámina: ejemplo de Hardy-Weinberg coherente (1/10 000 → q = 0,01; 2pq = 0,0198)', 'q = 0,01' in json.dumps(T['lamina'], ensure_ascii=False) and '0,0198' in json.dumps(T['lamina'], ensure_ascii=False))

# ---------------------------------------------------------------- ejercicios de opción: única correcta y coincide con los hechos
for e in T['ejercicios']:
    for c in checks(e):
        if c['tipo'] == 'opcion':
            ops = c['opciones']
            cierto('%s: opciones distintas' % e['id'], len(set(ops)) == len(ops))
            cierto('%s: ok dentro de rango' % e['id'], 0 <= c['ok'] < len(ops))

CLAVE = {
    'b1': 'uso y desuso', 'b2': 'wallace', 'b3': 'no cambian', 'b5': 'población', 'b6': 'mutación', 'b7': 'homólogos',
    'b8': 'análogos', 'b11': 'vestigial', 'b15': 'selección natural', 'b16': 'molecular', 'c7': 'actúe la selección',
    'c10': 'cuello de botella', 'c12': 'barrera geográfica', 'c14': 'efecto fundador', 'd7': 'convergente',
}
for eid, k in CLAVE.items():
    c = checks(EJ[eid])[0]
    cierto('%s: la correcta contiene «%s»' % (eid, k), k.lower() in c['opciones'][c['ok']].lower())
    cierto('%s: ninguna otra contiene «%s»' % (eid, k), all(k.lower() not in o.lower() for i, o in enumerate(c['opciones']) if i != c['ok']))
# b6: la recombinación y la segregación no crean alelos; c7 NO es condición; b16 molecular
cierto('b6: las otras opciones son procesos que reordenan alelos', all(o in ('La recombinación', 'La segregación independiente', 'El entrecruzamiento') for i, o in enumerate(checks(EJ['b6'])[0]['opciones']) if i != 0))

VF_ESP = {'b4': False, 'b10': False, 'c8': False, 'c13': False}
for eid, v in VF_ESP.items():
    c = checks(EJ[eid])[0]
    cierto('%s: V/F correcto' % eid, (c['opciones'][c['ok']] == 'Verdadero') == v)
    j = checks(EJ[eid])[1]
    cierto('%s: justificación única marcada' % eid, 0 <= j['ok'] < len(j['opciones']))

EMP = {
    'b14': {'Lamarck': 'uso y desuso', 'Darwin': 'selección natural', 'Eldredge y Gould': 'equilibrio puntuado'},
    'c11': {'Direccional': 'antibiótico', 'Estabilizadora': 'peso al nacer', 'Disruptiva': 'pico muy grande'},
}
for eid, mapa in EMP.items():
    for c in checks(EJ[eid]):
        k = mapa[c['etiqueta']]
        cierto('%s/%s correcto' % (eid, c['etiqueta']), k.lower() in c['opciones'][c['ok']].lower())
        cierto('%s/%s única' % (eid, c['etiqueta']), sum(k.lower() in o.lower() for o in c['opciones']) == 1)

cierto('b9: valores aceptados', 'deriva genética' in EJ['b9']['check']['valores'] and 'deriva' in EJ['b9']['check']['valores'])

# test y «encuentra el error»: única correcta
for nombre in ('quiz1', 'errores'):
    for pq in T['datos'][nombre]['preguntas']:
        cierto('%s: %s… ok en rango y opciones distintas' % (nombre, pq['q'][:25]), 0 <= pq['ok'] < len(pq['op']) and len(set(pq['op'])) == len(pq['op']))
QUIZ = ['herencia de lo adquirido', 'ya existe', 'crea alelos nuevos', '0,01', 'selección natural', 'población pequeña', 'análogos', 'aislamiento geográfico']
for pq, k in zip(T['datos']['quiz1']['preguntas'], QUIZ):
    cierto('quiz «%s»: correcta contiene «%s»' % (pq['q'][:25], k), k in pq['op'][pq['ok']].lower())
    cierto('quiz «%s»: única' % pq['q'][:25], sum(k in o.lower() for o in pq['op']) == 1)
cierto('quiz: q = 0,1 → 0,01 (0,18 = 2pq y 0,81 = p²)', hw(F(1, 10)) == (F(81, 100), F(18, 100), F(1, 100)))
FALSAS = [
    ('darwin explicó el cuello largo', 'lamarck'), ('mutaciones aparecen como respuesta', 'al azar'),
    ('análogos prueban un antepasado común', 'homólogos'), ('frecuencias alélicas cambian cada generación', 'se mantienen'),
    ('recupera enseguida', 'pierde variabilidad'), ('mula es una especie porque es fértil', 'estéril'),
    ('cambian de un día para otro', 'miles de años'),
]
errs = T['datos']['errores']['preguntas']
cierto('errores: 7 preguntas', len(errs) == 7)
for pq, (f, por) in zip(errs, FALSAS):
    cierto('error «%s»: la señalada es la falsa' % f, f in pq['op'][pq['ok']].lower())
    cierto('error «%s»: explicación coherente' % f, por in limpio(pq['porque']).lower())

# actividades de clasificar, emparejar, ordenar
MEC = {'Polillas oscuras': 0, 'Bacterias resistentes': 0, 'Una epidemia': 1, 'Unos pocos colonos': 1, 'Individuos de una población migran': 2, 'Polen': 2}
for it in T['datos']['mecanismos']['items']:
    esp = [v for k, v in MEC.items() if it['t'].startswith(k)]
    cierto('mecanismo «%s»' % it['t'][:30], len(esp) == 1 and esp[0] == it['c'])
HOM = {'Brazo humano': 0, 'Aleta de ballena y pata': 0, 'Ala de ave': 1, 'Aleta de tiburón': 1, 'Apéndice': 2, 'Huesos de la pelvis': 2}
for it in T['datos']['homologia']['items']:
    esp = [v for k, v in HOM.items() if it['t'].startswith(k)]
    cierto('homología «%s»' % it['t'][:30], len(esp) == 1 and esp[0] == it['c'])
ords = [i['t'] for i in T['datos']['ordenseleccion']['items']]
cierto('orden de la selección natural', 'varían' in ords[0] and 'más descendientes de los que' in ords[1] and 'hereda' in ords[2] and 'ventajosas dejan' in ords[3] and 'más frecuentes' in ords[4])
CIENT = ['uso y desuso', 'selección natural', 'cola', 'frecuencias constantes', 'equilibrio puntuado']
for par, k in zip(T['datos']['cientificos']['pares'], CIENT):
    cierto('científico «%s»' % par[0], k in par[1].lower())

if fallos:
    print('FALLOS:')
    for f in fallos:
        print('  -', f)
print('%d comprobaciones correctas, %d fallos' % (ok, len(fallos)))
sys.exit(1 if fallos else 0)
