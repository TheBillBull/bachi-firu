#!/usr/bin/env python3
"""
Verificación independiente de Biología II, tema 6 (La célula).
No comparte código con la web: recalcula con fracciones/potencias cada cifra de ejemplos, ejercicios y widgets
(relación superficie/volumen, aumentos y tamaño real, ciclos de la bomba Na+/K+, factor de [H+] del lisosoma,
osmolaridad, microtúbulos de centriolos y flagelos, genes del ADN mitocondrial, curvas del widget de transporte),
comprueba hechos y fechas (teoría celular, Singer–Nicolson, Margulis, Palade), que cada ejercicio de opción tenga
una única respuesta correcta coherente con los hechos, y que la ficha no contradiga la teoría.

Convención declarada: Mr(NaCl) = 22,99 + 35,45 = 58,44; NaCl da 2 partículas; interior del hematíe ≈ 308 mOsm/L;
modelo del widget: difusión simple v = 3·S; con proteína v = 100·S/(2 + S) (S en mM, unidades arbitrarias).

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_bio2_t6.py /tmp/ampl.json
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


def checks(e):
    c = e['check']
    return c if isinstance(c, list) else [c]


datos = json.load(open(sys.argv[1]))
T = datos['ampl']['bio2']['t6']
EJ = {e['id']: e for e in T['ejercicios']}
D = T['datos']
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# ---------------------------------------------------------------- relación superficie/volumen (cubo)
def sv(L):
    return F(6 * L * L, L ** 3)


cierto('S/V: L=1 → 6; L=10 → 3/5; L=100 → 3/50', sv(1) == 6 and sv(10) == F(3, 5) and sv(100) == F(3, 50))
cierto('teoría: superficies y volúmenes de la tabla', all(f in teoria_l for f in ('600 µm²', '1000 µm³', '60 000 µm²', '1 000 000 µm³')))
cierto('c1 S/V cubo 10 µm = 0,6', float(sv(10)) == 0.6)
cierto('c2 relación 6 / 0,6 = 10', sv(1) / sv(10) == 10)
cierto('d6 lado ×2: superficie ×4, volumen ×8, S/V ×1/2', F(6 * 2 ** 2, 6) == 4 and 2 ** 3 == 8 and F(4, 8) == F(1, 2) and sv(2) / sv(1) == F(1, 2))
cierto('S/V baja 10 veces cuando L sube ×10 (teoría)', sv(1) / sv(10) == 10 and sv(10) / sv(100) == 10 and 'baje 10 veces' in teoria_l)

# ---------------------------------------------------------------- aumentos y tamaños
aum = F(3 * 10000, 15)                       # 3 cm = 30 000 µm
cierto('aumentos 30 000 µm / 15 µm = 2000', aum == 2000)
cierto('teoría (b): 4 mm / 2000 = 2 µm', F(4 * 1000) / aum == 2 and '30 000 / 15 = <b>2000' in teoria)
cierto('c3: 4 cm / 20 000 = 2 µm', F(4 * 10000, 20000) == 2)
cierto('resolución: óptico 0,2 µm = 200 nm = 1000 × electrónico 0,2 nm', F(200) / F('0.2') == 1000 and '≈ 0,2 µm' in teoria_l and '≈ 0,2 nm' in teoria_l)

# ---------------------------------------------------------------- bomba Na+/K+
cierto('c4: 100 ciclos → 300 Na+', 100 * 3 == 300)
cierto('c5: 1200 Na+ / 3 = 400 ATP', F(1200, 3) == 400)
cierto('d7: 150 ciclos/s · 60 · 3 = 27 000 Na+ y 18 000 K+', 150 * 60 * 3 == 27000 and 150 * 60 * 2 == 18000 and '18 000 K' in EJ['d7']['resultado'])
cierto('teoría: 3 Na+ y 2 K+ por ciclo', 'saca 3 na' in teoria_l and 'mete 2 k' in teoria_l)

# ---------------------------------------------------------------- pH del lisosoma y osmolaridad
casi('c6: 10^(7,2−5) = 158,5', 10 ** (7.2 - 5), 158.49, 0.002)
cierto('teoría: lisosoma pH ≈ 5 y citosol ≈ 7,2', 'ph ≈ 5' in teoria_l and '≈ 7,2' in teoria_l)
MR = F('22.99') + F('35.45')


def mosm(pc):
    return float(F(pc) * 10 / MR * 2 * 1000)


casi('c7: NaCl 0,3 % = 102,7 mOsm/L', mosm('0.3'), 102.67, 0.002)
cierto('c7: 102,7 < 308 → hipotónica', mosm('0.3') < 308)
casi('0,9 % = 308 mOsm/L (interior del hematíe, como en T1)', mosm('0.9'), 308, 0.002)

# ---------------------------------------------------------------- citoesqueleto, centriolos, genes mitocondriales
cierto('c12: flagelo 9 dobletes + 2 = 20 microtúbulos', 9 * 2 + 2 == 20 and '20 microtúbulos en total' in teoria_l)
cierto('c13: centriolo 9 × 3 = 27; diplosoma 54', 9 * 3 == 27 and 2 * 27 == 54 and '27 microtúbulos' in teoria_l)
cierto('c15: 37 − 13 − 2 = 22 genes de ARNt', 37 - 13 - 2 == 22)
cierto('teoría: 16 569 pb y 37 genes (13, 22, 2)', '16 569' in teoria_l and '13 de proteínas, 22 de arnt y 2 de arnr' in teoria_l)
cierto('teoría cita 7 nm, 8–12 nm y 25 nm', all(f in teoria_l for f in ('≈ 7 nm', '8–12 nm', '25 nm')))
cierto('c14: orden 7 < 10 < 25 nm (actina, intermedios, microtúbulos)', 7 < 10 < 25)
cierto('c16: 60S + 40S forman 80S pero 60 + 40 ≠ 80', 60 + 40 != 80 and 'no suman 80' in teoria_l)
cierto('teoría: 80S (60S y 40S) y 70S (50S y 30S)', all(f in teoria_l for f in ('80s', '60s', '40s', '70s', '50s', '30s')))

# ---------------------------------------------------------------- Gorter y Grendel
cierto('c8: 0,60 / 0,30 = 2 → bicapa', F('0.60') / F('0.30') == 2 and 'el doble' in teoria_l)

# ---------------------------------------------------------------- modelo cinético del widget y del ejemplo PAU
def vs(S):
    return F(3) * S


def vf(S):
    return F(100) * S / (2 + S)


cierto('c18: v(6) = 75', vf(6) == 75)
cierto('ejemplo A: v = 3, 6, 15, 30 para S = 1, 2, 5, 10', [vs(S) for S in (1, 2, 5, 10)] == [3, 6, 15, 30])
cierto('ejemplo B: 33,3; 50; 71,4; 83,3', [round(float(vf(S)), 1) for S in (1, 2, 5, 10)] == [33.3, 50.0, 71.4, 83.3])
cierto('ejemplo: v/S constante en A y variable en B', len({vs(S) / S for S in (1, 2, 5, 10)}) == 1 and len({vf(S) / S for S in (1, 2, 5, 10)}) == 4)
S_cruce = F(100, 3) - 2
casi('d5: 3S = 100S/(2+S) → S = 31,33', float(S_cruce), 31.33, 0.002)
cierto('d5: en S = 31,33 las dos velocidades coinciden', vs(S_cruce) == vf(S_cruce))
cierto('widget: S=2 → 6 y 50; S=20 → 60 y 90,9', vs(2) == 6 and vf(2) == 50 and vs(20) == 60 and round(float(vf(20)), 1) == 90.9)
cierto('widget: en 0–20 mM la facilitada va siempre por encima de la simple (no hay cruce)', all(vs(S) < vf(S) for S in range(1, 21)))

# ---------------------------------------------------------------- hechos y fechas de la teoría y de la ficha
for frag in ('1665', '1674', '1831', '1838', '1839', '1855', '1925', '1935', '1972', '1967', '1898', '1974', '1906', 'omnis cellula e cellula',
             'singer y nicolson', 'margulis', 'palade', 'gorter y grendel', 'frye', 'ramón y cajal', 'camillo golgi', 'hooke', 'schleiden',
             'schwann', 'virchow', 'albert claude', 'christian de duve'):
    cierto('teoría cita «%s»' % frag, frag in teoria_l)
cierto('Palade: tiempos 3, 17, 37 y 117 min', all(t in teoria_l for t in ('≈ 3 min', '≈ 17 min', '≈ 37 min', '≈ 117 min')))
cierto('Frye–Edidin: 40 minutos a 37 °C', '40 minutos' in teoria_l and '37 °c' in teoria_l)
cierto('catalasa: 2 H2O2 → 2 H2O + O2 (4 H y 4 O a cada lado)', '2 h2o2 → 2 h2o + o2' in teoria_l and 2 * 2 == 2 * 2 and 2 * 2 == 2 * 1 * 2 and 2 * 2 == 2 * 1 + 2 * 1)
cierto('teoría: 9 tripletes y 9 dobletes periféricos + 2', '9 tripletes' in teoria_l and '9 dobletes periféricos + 2' in teoria_l)
cierto('teoría: la mitocondria apareció antes que el cloroplasto', 'apareció antes' in teoria_l)
for f in ('1665', '1838–1839', '1855', '1972', '1967'):
    cierto('ficha cita %s' % f, f in vz_txt)
cierto('ficha: bomba 3 Na⁺ / 2 K⁺ (dos formas) y 16 569 pb con 37 genes', '3 na' in vz_txt and '2 k' in vz_txt and '16 569' in vz_txt and '37 genes' in vz_txt)
cierto('ficha: 4–6 bloques, 6–10 claves', 4 <= len(vz['bloques']) <= 6 and 6 <= len(vz['claves']) <= 10)
cierto('ficha: frases cortas (≤ 15 palabras) y ≤ 3 por bloque', all(len(limpio(f).split()) <= 15 for b in vz['bloques'] for f in b['frases']) and all(len(b['frases']) <= 3 for b in vz['bloques']))
for k in ('mosaico fluido', 'transporte activo', 'difusión facilitada', 'endosimbiótica', 'lisosoma', 'aparato de golgi'):
    cierto('ficha y teoría comparten «%s»' % k, k in vz_txt and k in teoria_l)
cierto('ficha/teoría: sin centriolos solo en plantas con flor', 'plantas con flor' in vz_txt and 'plantas con flor' in teoria_l)

# ---------------------------------------------------------------- orden de las actividades
anios = [int(re.match(r'\d{4}', it['nota']).group()) for it in D['ordenteoria']['items']]
cierto('ordenteoria: años 1665, 1831, 1838, 1855, 1972 en orden', anios == [1665, 1831, 1838, 1855, 1972])
tx = [i['t'] for i in D['ordensec']['items']]
pos = lambda clave: next(i for i, t in enumerate(tx) if clave in t)
cierto('ordensec: ARNm → RER → vesícula → Golgi → vesícula de secreción → exocitosis', pos('ARNm') < pos('acopla al RER') < pos('vesícula de transporte') < pos('Golgi') < pos('vesícula de secreción') < pos('Exocitosis') and len(tx) == 6)

# ---------------------------------------------------------------- estructura mínima del tema
niveles = [e['nivel'] for e in T['ejercicios']]
cierto('≥ 40 ejercicios', len(T['ejercicios']) >= 40)
cierto('hay ejercicios de los tres niveles', set(niveles) == {1, 2, 3})
cierto('ids únicos', len({e['id'] for e in T['ejercicios']}) == len(T['ejercicios']))
cierto('todos con pasos y resultado', all(e.get('pasos') and e.get('resultado') for e in T['ejercicios']))
rub = [e for e in T['ejercicios'] if checks(e)[0]['tipo'] == 'rubrica']
cierto('5 preguntas abiertas con rúbrica', len(rub) == 5)
cierto('rúbricas suman 2 puntos', all(abs(sum(i['p'] for i in checks(e)[0]['items']) - 2.0) < 1e-9 for e in rub))
cierto('lámina ≥ 4, resumen ≥ 4, tarjetas ≥ 14', len(T['lamina']) >= 4 and len(T['resumen']) >= 4 and len(D['tarjetas1']['cartas']) >= 14)
cierto('todas las actividades de datos se usan en la teoría', all(('bio2/t6/' + k) in teoria for k in D))

# ---------------------------------------------------------------- numéricos contra su cálculo independiente
ESPERADO = {'b16': 2000, 'c1': 0.6, 'c2': 10, 'c3': 2, 'c4': 300, 'c5': 400, 'c6': 10 ** 2.2, 'c7': mosm('0.3'), 'c8': 2, 'c12': 20,
            'c13': 54, 'c15': 22, 'c18': 75, 'd5': float(S_cruce), 'd7': 27000}
for eid, v in ESPERADO.items():
    ch = EJ[eid]['check']
    cierto('%s es de tipo num' % eid, ch['tipo'] == 'num')
    casi('ejercicio %s' % eid, ch['valor'], v, 0.003)
    cierto('%s: tolerancia razonable (≤ 2 %%)' % eid, ch.get('tol', 0.005) <= 0.02)
for c, v in zip(EJ['d6']['check'], (4, 8, 0.5)):
    casi('d6 %s' % c['etiqueta'], c['valor'], v)

# ---------------------------------------------------------------- opción: única correcta y coincide con los hechos
for e in T['ejercicios']:
    for c in checks(e):
        if c['tipo'] == 'opcion':
            ops = c['opciones']
            cierto('%s: opciones distintas y ok en rango' % e['id'], len(set(ops)) == len(ops) and 0 <= c['ok'] < len(ops))

CLAVE = {
    'b1': 'virus', 'b2': 'hooke', 'b3': 'núcleo', 'b5': 'hacia el agua', 'b6': 'simple', 'b7': 'activo', 'b8': 'RER → Golgi',
    'b9': 'digerir', 'b10': 'mitocondria', 'b15': 'celulosa', 'c11': 'circular', 'c14': 'Microfilamentos de actina, intermedios, microtúbulos',
    'c16': '40S', 'd2': 'lateralmente', 'd3': 'RER → Golgi → vesículas', 'd4': 'una sola membrana',
}
for eid, k in CLAVE.items():
    c = checks(EJ[eid])[0]
    cierto('%s: la correcta contiene «%s»' % (eid, k), k.lower() in c['opciones'][c['ok']].lower())
    cierto('%s: ninguna otra contiene «%s»' % (eid, k), all(k.lower() not in o.lower() for i, o in enumerate(c['opciones']) if i != c['ok']))
cierto('d4: la marcada contradice los hechos (doble membrana, ribosomas 70S)', 'doble membrana' in teoria_l and 'ribosomas 70s' in teoria_l)

VF_ESP = {'b4': False, 'b13': False, 'c9': False, 'c17': False}
for eid, v in VF_ESP.items():
    c = checks(EJ[eid])[0]
    cierto('%s: V/F correcto' % eid, (c['opciones'][c['ok']] == 'Verdadero') == v)

EMP = {
    'b14': {'Aparato de Golgi': 'empaqueta', 'Retículo liso': 'lípidos', 'Mitocondria': 'ATP'},
    'c10': {'Entrada de glucosa por una permeasa (a favor de gradiente)': 'facilitada', 'Salida de 3 Na⁺ por una ATPasa': 'activo', 'Entrada de O₂': 'simple'},
    'd1': {'Sustancia A': 'simple', 'Sustancia B': 'facilitada', 'Sustancia C': 'activo'},
}
for eid, mapa in EMP.items():
    for c in checks(EJ[eid]):
        k = mapa[c['etiqueta']]
        cierto('%s/%s correcto' % (eid, c['etiqueta'][:20]), k.lower() in c['opciones'][c['ok']].lower())
        cierto('%s/%s única' % (eid, c['etiqueta'][:20]), sum(k.lower() in o.lower() for o in c['opciones']) == 1)

for eid, vals in {'b11': ['cloroplasto', 'cloroplastos'], 'b12': ['tubulina', 'tubulinas']}.items():
    cierto('%s: valores aceptados' % eid, EJ[eid]['check']['valores'] == vals)

# test y «encuentra el error»
for nombre in ('quiz1', 'errores'):
    for p in D[nombre]['preguntas']:
        cierto('%s: %s… ok en rango y opciones distintas' % (nombre, p['q'][:25]), 0 <= p['ok'] < len(p['op']) and len(set(p['op'])) == len(p['op']))
FALSAS = [('no tienen ribosomas', '70s'), ('proteínas están fijas', 'lateralmente'), ('facilitada gasta atp', 'pasiva'),
          ('rel tiene ribosomas', 'sin ribosomas'), ('tiene una sola membrana', 'doble membrana'),
          ('núcleo procede de una bacteria', 'no el núcleo'), ('célula animal tiene pared', 'célula vegetal')]
for fr, pq in FALSAS:
    hay = [p for p in D['errores']['preguntas'] if fr in p['op'][p['ok']].lower().replace('el rel', 'rel')]
    cierto('errores: «%s» marcada como falsa con su motivo' % fr, len(hay) == 1 and pq in hay[0]['porque'].lower())
cierto('quiz: la correcta de la bomba es 3 Na⁺ fuera y 2 K⁺ dentro', any('saca 3 Na⁺ y mete 2 K⁺' == p['op'][p['ok']] for p in D['quiz1']['preguntas']))
cierto('quiz: la correcta del cilio es 9 dobletes + 2', any('9 dobletes periféricos + 2' in p['op'][p['ok']] for p in D['quiz1']['preguntas']))

# clasificar: categorías válidas, elementos únicos y coherentes con la teoría
for k in ('celulas', 'membranas', 'transportes'):
    d = D[k]
    cierto('%s: categorías válidas y elementos únicos' % k, all(0 <= i['c'] < len(d['categorias']) for i in d['items']) and len({i['t'] for i in d['items']}) == len(d['items']))
cierto('membranas: reparto 3 / 4 / 3', [sum(i['c'] == c for i in D['membranas']['items']) for c in (0, 1, 2)] == [3, 4, 3])
cierto('membranas: de una membrana RER, Golgi, lisosoma y vacuola', {i['t'] for i in D['membranas']['items'] if i['c'] == 1} == {'Retículo endoplasmático', 'Aparato de Golgi', 'Lisosoma', 'Vacuola central'})
cierto('membranas: de doble membrana núcleo, mitocondria y cloroplasto', {i['t'] for i in D['membranas']['items'] if i['c'] == 2} == {'Mitocondria', 'Cloroplasto', 'Núcleo'})
for k in ('orgfun', 'cientificos'):
    pares = D[k]['pares']
    cierto('%s: pares únicos' % k, len({p[0] for p in pares}) == len(pares) and len({p[1] for p in pares}) == len(pares))

if fallos:
    print('FALLOS:')
    for f in fallos:
        print('  -', f)
print('%d comprobaciones correctas, %d fallos' % (ok, len(fallos)))
sys.exit(1 if fallos else 0)
