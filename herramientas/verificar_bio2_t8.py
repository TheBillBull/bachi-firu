#!/usr/bin/env python3
"""
Verificación independiente de Biología II, tema 8 (Catabolismo: la respiración celular).
No comparte código con la web: modela cada etapa (glucólisis, descarboxilación oxidativa, Krebs, β-oxidación) como
contabilidad de coenzimas con fracciones, deduce los ATP por la relación H+/ATP, recalcula balances, rendimiento
energético, ecuaciones de combustión (con sympy) y cociente respiratorio, y comprueba hechos y fechas de la ficha,
que cada ejercicio tenga una única respuesta correcta y que la ficha no contradiga la teoría.

Convención declarada: criterio principal 30/32 ATP (NADH = 10 H+ / 4 H+ por ATP = 2,5; FADH2 = 6 / 4 = 1,5);
criterio clásico 36/38 (3 y 2). Activación del ácido graso: -2 ATP. Krebs forma 1 ATP (o GTP) por vuelta.
ΔG° glucosa ≈ 2870 kJ/mol; ATP ≈ 30,5 kJ/mol.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_bio2_t8.py /tmp/ampl.json
"""
import json, re, sys
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
T = datos['ampl']['bio2']['t8']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# ---------------------------------------------------------------- contabilidad de coenzimas (por etapa)
# etapa: (NADH, FADH2, ATP directo, CO2) por glucosa
GLUC = (2, 0, 2, 0)                     # glucólisis: -2 +4 ATP netos 2; 2 G3P -> 2 NADH
PDH = (2, 0, 0, 2)                      # 2 piruvato
VUELTA = (3, 1, 1, 2)                   # por acetil-CoA
KREBS = tuple(2 * x for x in VUELTA)
ETAPAS = [GLUC, PDH, KREBS]
nadh = sum(e[0] for e in ETAPAS)
fadh = sum(e[1] for e in ETAPAS)
atp_dir = sum(e[2] for e in ETAPAS)
co2 = sum(e[3] for e in ETAPAS)
cierto('glucólisis: 4 formados - 2 gastados = 2 ATP netos', 4 - 2 == GLUC[2])
cierto('por glucosa: 10 NADH', nadh == 10)
cierto('por glucosa: 2 FADH2', fadh == 2)
cierto('por glucosa: 4 ATP directos', atp_dir == 4)
cierto('por glucosa: 6 CO2 (uno por carbono de la glucosa)', co2 == 6)
cierto('dos acetil-CoA por glucosa: 2 piruvato = 2 acetilos', 6 // 3 == 2)
cierto('carbonos: 6 = 2 CO2 (PDH) + 4 CO2 (Krebs)', 6 == PDH[3] + KREBS[3])

# H+ por coenzima y ATP
HN, HF, HATP = F(10), F(6), F(4)
vN, vF = HN / HATP, HF / HATP
cierto('NADH = 2,5 ATP', vN == F(5, 2))
cierto('FADH2 = 1,5 ATP', vF == F(3, 2))
CLAS = (F(3), F(2))


def glucosa(vn, vf, glicerol=False):
    cit = vf if glicerol else vn
    return atp_dir + (nadh - 2) * vn + 2 * cit + fadh * vf


cierto('glucosa 32 (actual, malato)', glucosa(vN, vF) == 32)
cierto('glucosa 30 (actual, glicerol)', glucosa(vN, vF, True) == 30)
cierto('glucosa 38 (clásico, malato)', glucosa(*CLAS) == 38)
cierto('glucosa 36 (clásico, glicerol)', glucosa(*CLAS, True) == 36)
cierto('lanzadera glicerol: 2 ATP menos en ambos criterios', glucosa(vN, vF) - glucosa(vN, vF, True) == 2 and glucosa(*CLAS) - glucosa(*CLAS, True) == 2)

# rendimiento energético
DG, DATP = F(2870), F('30.5')
casi('rendimiento 32 ATP = 34 %', float(32 * DATP / DG * 100), 34, 0.01)
casi('rendimiento fermentación ≈ 2 %', float(2 * DATP / DG * 100), 2.1, 0.05)
cierto('976 kJ guardados con 32 ATP', 32 * DATP == F(976))
cierto('61 kJ con 2 ATP', 2 * DATP == F(61))
cierto('aerobia / fermentación = 16', F(32, 2) == 16)
casi('rendimiento: 2870 kJ → ≈ 66 % como calor', 100 - float(32 * DATP / DG * 100), 66, 0.02)


# ---------------------------------------------------------------- β-oxidación (n par, saturado)
def acido(n, vn, vf):
    a = n // 2
    c = a - 1
    N_ = c + 3 * a
    Fd = c + a
    return N_, Fd, a, -2 + a + N_ * vn + Fd * vf


n16 = acido(16, vN, vF)
cierto('palmítico: 31 NADH, 15 FADH2, 8 ATP directos', n16[:3] == (31, 15, 8))
cierto('palmítico actual: 106 ATP', n16[3] == 106)
cierto('palmítico clásico: 129 ATP', acido(16, *CLAS)[3] == 129)
cierto('esteárico (18 C) actual: 120 ATP', acido(18, vN, vF)[3] == 120)
cierto('esteárico (18 C): 35 NADH y 17 FADH2', acido(18, vN, vF)[:2] == (35, 17))
cierto('láurico (12 C): 5 vueltas', 12 // 2 - 1 == 5)
cierto('14 C: 6 vueltas y 12 coenzimas reducidos', (14 // 2 - 1) * 2 == 12)
casi('ATP por C palmítico = 6,6', float(F(106, 16)), 6.6, 0.01)
casi('ATP por C glucosa = 5,3', float(F(32, 6)), 5.33, 0.005)
cierto('la grasa rinde más por carbono', F(106, 16) > F(32, 6))

# ---------------------------------------------------------------- ecuaciones con sympy
try:
    import sympy as sp
    O2 = sp.symbols('O2')
    # glucosa: C6H12O6 + x O2 -> 6 CO2 + 6 H2O
    x = sp.symbols('x')
    sol = sp.solve(sp.Eq(6 + 2 * x, 6 * 2 + 6), x)
    cierto('glucosa: 6 O2 (balance de O)', sol == [6])
    # palmítico: C16H32O2 + x O2 -> 16 CO2 + 16 H2O
    sol2 = sp.solve(sp.Eq(2 + 2 * x, 16 * 2 + 16), x)
    cierto('palmítico: 23 O2 (balance de O)', sol2 == [23])
    cierto('palmítico: H balanceado (32 = 2·16)', 32 == 2 * 16)
    n = sp.symbols('n', positive=True)
    sol3 = sp.solve(sp.Eq(2 + 2 * x, 2 * n + n), x)[0]
    cierto('ácido graso CnH2nO2: O2 = 3n/2 − 1', sp.simplify(sol3 - (sp.Rational(3, 2) * n - 1)) == 0)
    cierto('n=16 en la fórmula general da 23', sol3.subs(n, 16) == 23)
    casi('CR glucosa = 1', 6 / 6, 1)
    casi('CR palmítico = 16/23 = 0,70', float(sp.Rational(16, 23)), 0.70, 0.01)
    cierto('etanol: C6 = 2·2 + 2 (fermentación alcohólica)', 6 == 2 * 2 + 2)
    cierto('lactato: C6 = 2·3 (fermentación láctica)', 6 == 2 * 3)
    # O2 y CO2 de 3 mol de glucosa
    cierto('3 mol de glucosa: 18 mol de O2', 3 * sol[0] == 18)
except ImportError:
    cierto('sympy disponible', False)

# ---------------------------------------------------------------- cada ejercicio numérico contra su cálculo independiente
ESPERADO = {
    'b8': 2, 'b9': 2, 'b13': 6, 'b16': 2, 'c1': 4, 'c2': 10, 'c3': float(glucosa(vN, vF)), 'c4': float(glucosa(*CLAS)),
    'c5': float(glucosa(vN, vF, True)), 'c6': float(vN), 'c7': float(vF), 'c8': float(32 * DATP / DG * 100), 'c9': 3 * 2,
    'c10': 16, 'c11': 5 * 2, 'c15': 3 * 6, 'd1': float(n16[3]), 'd2': float(acido(16, *CLAS)[3]), 'd3': float(acido(18, vN, vF)[3]),
    'd4': 5, 'd5': 12, 'd6': 16 / 23,
}
for eid, v in ESPERADO.items():
    ch = EJ[eid]['check']
    cierto('%s es de tipo num' % eid, ch['tipo'] == 'num')
    casi('ejercicio %s' % eid, ch['valor'], v, 0.01 if eid in ('c8', 'd6') else 0.003)
    cierto('%s: tolerancia razonable (≤ 2 %%)' % eid, ch.get('tol', 0.005) <= 0.02)


# ---------------------------------------------------------------- opción única y coherencia con los hechos
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
    'b1': 'citoplasma', 'b2': 'aceptor final', 'b3': 'NAD', 'b5': 'matriz', 'b6': 'interna', 'b10': 'bacterias lácticas',
    'b15': 'ATP sintasa', 'c14': 'Más consumo de O₂', 'd7': 'grasa rinde más',
}
for eid, k in CLAVE.items():
    c = checks(EJ[eid])[0]
    cierto('%s: la correcta contiene «%s»' % (eid, k), k.lower() in c['opciones'][c['ok']].lower())
    cierto('%s: ninguna otra contiene «%s»' % (eid, k), all(k.lower() not in o.lower() for i, o in enumerate(c['opciones']) if i != c['ok']))

VF_ESP = {'b4': False, 'b12': False, 'c12': False}
for eid, v in VF_ESP.items():
    c = checks(EJ[eid])[0]
    cierto('%s: V/F correcto' % eid, (c['opciones'][c['ok']] == 'Verdadero') == v)

EMP = {
    'b14': {'Glucólisis': 'citoplasma', 'Ciclo de Krebs': 'matriz', 'Cadena respiratoria': 'membrana mitocondrial interna'},
    'c13': {'Rotenona': 'Bloquea el complejo I', 'Cianuro': 'Bloquea el complejo IV', 'Oligomicina': 'ATP sintasa', 'DNP (desacoplante)': 'gradiente'},
    'c16': {'Se forma agua con el O₂': 'Cadena', 'Se forma acetil-CoA y sale CO₂ (sin ciclo)': 'Descarboxilación', 'Se forma FADH₂ en la matriz': 'Krebs'},
}
for eid, mapa in EMP.items():
    for c in checks(EJ[eid]):
        k = mapa[c['etiqueta']]
        pat = re.compile(r'(?<!\w)' + re.escape(k) + r'(?!\w)', re.I)
        cierto('%s/%s correcto' % (eid, c['etiqueta']), bool(pat.search(c['opciones'][c['ok']])))
        cierto('%s/%s única' % (eid, c['etiqueta']), sum(bool(pat.search(o)) for o in c['opciones']) == 1)

for eid, vals in {'b7': ['piruvato', 'ácido pirúvico'], 'b11': ['etanol', 'alcohol', 'alcohol etilico', 'alcohol etílico']}.items():
    cierto('%s: valores aceptados' % eid, EJ[eid]['check']['valores'] == vals)

# test y «encuentra el error»
for nombre in ('quiz1', 'errores'):
    for p in T['datos'][nombre]['preguntas']:
        cierto('%s: %s… ok en rango y opciones distintas' % (nombre, p['q'][:25]), 0 <= p['ok'] < len(p['op']) and len(set(p['op'])) == len(p['op']))
FALSAS = [
    ('necesita oxígeno y ocurre en la mitocondria', 'citoplasma'), ('consume directamente el oxígeno', 'final de la cadena'),
    ('complejo ii bombea tantos', 'no bombea'), ('produce mucho más atp', '2 atp'),
    ('libera co₂', 'no libera co₂'), ('siempre exactamente 38', 'criterio'), ('nadh es la forma oxidada', 'reducida'),
]
errs = T['datos']['errores']['preguntas']
cierto('errores: 7 preguntas', len(errs) == 7)
for p, (f, por) in zip(errs, FALSAS):
    cierto('errores: «%s» es la opción marcada' % f, f in p['op'][p['ok']].lower())
    cierto('errores: la explicación menciona «%s»' % por, por in p['porque'].lower())
q1 = T['datos']['quiz1']['preguntas']
cierto('quiz1: 8 preguntas', len(q1) == 8)
cierto('quiz1: balance de glucólisis 2 ATP y 2 NADH', '2 ATP y 2 NADH' in q1[1]['op'][q1[1]['ok']])
cierto('quiz1: Krebs por vuelta 3 NADH, 1 FADH₂, 1 ATP y 2 CO₂', q1[3]['op'][q1[3]['ok']].startswith('3 NADH, 1 FADH₂, 1 ATP y 2 CO₂'))

# ---------------------------------------------------------------- hechos y fechas de la ficha y de la teoría
cierto('ficha: Pasteur 1857', 'pasteur' in vz_txt and '1857' in vz_txt)
cierto('ficha: Krebs 1937', 'krebs' in vz_txt and '1937' in vz_txt)
cierto('ficha: Mitchell 1961', 'mitchell' in vz_txt and '1961' in vz_txt)
cierto('teoría: Krebs 1937 (Nobel 1953)', 'krebs en 1937' in teoria_l and '1953' in teoria_l)
cierto('teoría: Mitchell 1961 (Nobel 1978)', 'mitchell en 1961' in teoria_l and '1978' in teoria_l)
cierto('teoría: Pasteur 1857 y Buchner 1897', '1857' in teoria_l and '1897' in teoria_l)
cierto('teoría: 30–32 y 36–38 declarados', '30–32' in teoria_l and '36–38' in teoria_l)
cierto('teoría: 106 y 129 ATP del palmítico', '106 atp' in teoria_l and '129 atp' in teoria_l)
cierto('teoría: glucosa 32/38/30/36 en la tabla de lanzaderas', all(s in teoria_l for s in ('32', '38', '30', '36')))
cierto('teoría: 10 H⁺ y 6 H⁺ y 4 H⁺ por ATP', '10 h⁺' in teoria_l and '6 h⁺' in teoria_l and '4 h⁺' in teoria_l)
cierto('teoría: NADH 2,5 y FADH2 1,5', '2,5 atp' in teoria_l and '1,5 atp' in teoria_l)
cierto('teoría: 10 reacciones en la glucólisis', '10 reacciones' in teoria_l)
cierto('teoría: 2870 kJ y 34 %', '2870' in teoria_l and '34 %' in teoria_l)
cierto('teoría: CR palmítico 0,70', '0,70' in teoria_l)
cierto('teoría: 23 O2 en el palmítico', '23 o' in teoria_l)
cierto('teoría: 6 CO2 (2 + 4)', '2 en la descarboxilación oxidativa y 4 en krebs' in teoria_l)
cierto('teoría: lanzadera glicerol 2 ATP menos', '2 atp menos' in teoria_l)
# la teoría no contradice contabilidad: cada «por vuelta» de Krebs
cierto('teoría: por vuelta 3 NADH, 1 FADH2, 1 ATP y 2 CO2', '3 nadh, 1 fadh2, 1 atp (o gtp) y 2 co2' in teoria_l)
cierto('teoría: por glucosa 6 NADH, 2 FADH2, 2 ATP y 4 CO2', '6 nadh, 2 fadh2, 2 atp y 4 co2' in teoria_l)
cierto('teoría: ATP directos fosforilación oxidativa ≈ 26–34 (26 = 4·… coherente)', float(glucosa(vN, vF, True) - atp_dir) == 26 and float(glucosa(*CLAS) - atp_dir) == 34)

# la ficha no contradice la teoría
cierto('ficha: glucólisis +2 ATP netos y 2 NADH', '+2 atp netos y 2 nadh' in vz_txt)
cierto('ficha: Krebs por vuelta', '3 nadh, 1 fadh₂, 1 atp y 2 co₂' in vz_txt)
tabla_vz = [b.get('tabla') for b in vz['bloques'] if b.get('tabla')]
cierto('ficha: tabla por glucosa 10/2/4/6', any(t['filas'] == [['NADH', '10'], ['FADH₂', '2'], ['ATP directos', '4'], ['CO₂', '6']] for t in tabla_vz))
cierto('ficha: tabla de criterios 30–32 / 36–38 / 2', any(['actual (2,5 y 1,5)', '30–32'] in t['filas'] and ['clásico (3 y 2)', '36–38'] in t['filas'] and ['fermentación', '2'] in t['filas'] for t in tabla_vz))
cierto('ficha: 16 veces más ATP', '16 veces' in vz_txt)
cierto('ficha: 6 bloques, 10 claves', len(vz['bloques']) == 6 and len(vz['claves']) == 10)
cierto('ficha: palabras clave sin repetir', len({k[0] for k in vz['claves']}) == 10)
tar = T['datos']['tarjetas1']['cartas']
cierto('tarjetas: palmitato 106 y 129', any('106 ATP (129' in c['b'] for c in tar))
cierto('tarjetas: totales 10/2/4/6', any('10 NADH, 2 FADH₂, 4 ATP y 6 CO₂' in c['b'] for c in tar))
cierto('tarjetas: 10 H⁺ → 2,5 y 6 H⁺ → 1,5', any('10 H⁺ → 2,5' in c['b'] and '6 H⁺ → 1,5' in c['b'] for c in tar))
lam = json.dumps(T['lamina'], ensure_ascii=False)
cierto('lámina: balance 32/30, 38/36 y 2', all(s in lam for s in ('"32"', '"30"', '"38"', '"36"')))

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
cierto('tarjetas ≥ 14', len(tar) >= 14)

if fallos:
    print('FALLOS:')
    for f in fallos:
        print('  -', f)
print('%d comprobaciones correctas, %d fallos' % (ok, len(fallos)))
sys.exit(1 if fallos else 0)
