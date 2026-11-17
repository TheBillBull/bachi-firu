#!/usr/bin/env python3
"""
Verificación independiente de Biología II, tema 9 (Anabolismo: la fotosíntesis).
No comparte código con la web: recalcula con fracciones y sympy el balance del ciclo de Calvin (ATP, NADPH, fosfatos,
carbono), las cuentas del esquema en Z (H⁺, ATP, NADPH, O₂ por cada 2 e⁻), el balance de átomos y de carga de las
reacciones de la quimiosíntesis, la energía de los fotones y el rendimiento máximo teórico, el modelo de factor limitante
de los simuladores, las gráficas y experimentos de los ejemplos y ejercicios; comprueba hechos y fechas (científicos),
que cada ejercicio tenga una única respuesta correcta y que la ficha no contradiga la teoría.

Convenciones declaradas: 4 H⁺ por ATP (también se calcula con 4,67); 3 ATP y 2 NADPH por CO₂ en C3 (2 ATP + 1 ATP) y
5 ATP y 2 NADPH por CO₂ en C4 (convención de los libros); 2870 kJ/mol de glucosa (686 kcal); 2 fotones por electrón
(uno en cada fotosistema); E(kJ/mol) = h·c·N_A / λ.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_bio2_t9.py /tmp/ampl.json
"""
import json, math, re, sys, os
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


def norm(s):
    return limpio(s).lower().replace('−', '-')


datos = json.load(open(sys.argv[1]))
T = datos['ampl']['bio2']['t9']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = norm(teoria)
vz = T['vistazo']
vz_txt = norm(json.dumps(vz, ensure_ascii=False))
D = T['datos']
RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
lab = open(os.path.join(RAIZ, 'ampliaciones', 'lab_bio_t9.js'), encoding='utf-8').read()

# ---------------------------------------------------------------- ciclo de Calvin: contabilidad (fracciones)
ATP_RED, ATP_REG, NADPH_CO2 = 2, 1, 2           # por CO2
atp_co2 = ATP_RED + ATP_REG
cierto('3 ATP y 2 NADPH por CO2 (C3)', atp_co2 == 3 and NADPH_CO2 == 2)
cierto('carbono se conserva: 1 + 5 = 2·3', 1 + 5 == 2 * 3)
cierto('5 G3P (15 C) = 3 RuBP (15 C)', 5 * 3 == 3 * 5)
cierto('3 CO2 dan 1 G3P (3 C)', 3 * 1 == 1 * 3)
cierto('glucosa = 2 G3P = 6 CO2', 2 * 3 == 6 * 1)
cierto('por glucosa: 18 ATP y 12 NADPH', 6 * atp_co2 == 18 and 6 * NADPH_CO2 == 12)
cierto('3 CO2: 9 ATP y 6 NADPH', 3 * atp_co2 == 9 and 3 * NADPH_CO2 == 6)
# fosfatos libres en 3 vueltas: reducción libera 6 Pi (6 BPG -> 6 G3P); regeneración: 5 G3P (5 P) + 3 P de ATP -> 3 RuBP (6 P)
pi_reduccion = 6
pi_regen = (5 + 3) - 3 * 2
cierto('fosfatos libres en 3 vueltas = 8', pi_reduccion + pi_regen == 8 and 9 - 1 == 8)
cierto('cociente ATP/NADPH del Calvin = 3/2', F(18, 12) == F(3, 2))
cierto('C4: 5 ATP por CO2 → 30 por glucosa', 6 * 5 == 30)

# ---------------------------------------------------------------- esquema en Z (por cada 2 e⁻)
h_fotolisis = 2 * 1                    # 1 H2O -> 1/2 O2 + 2 H+ + 2 e-
h_b6f = 4
h_aci = h_fotolisis + h_b6f
cierto('acíclico: 6 H⁺ por 2 e⁻', h_aci == 6)
cierto('acíclico: 1,5 ATP (4 H⁺/ATP)', F(h_aci, 4) == F(3, 2))
casi('acíclico: ≈ 1,29 ATP con 4,67 H⁺/ATP', h_aci / 4.67, 1.2857, 0.003)
cierto('cíclico: 4 H⁺ → 1 ATP', F(h_b6f, 4) == 1)
cierto('12 NADPH = 24 e⁻ = 12 H2O = 6 O2', 12 * 2 == 24 and 24 // 2 == 12 and F(24, 4) == 6)
cierto('el acíclico (4 H⁺/ATP) cubre 1,5 ATP/NADPH = cociente del Calvin', F(h_aci, 4) == F(18, 12))
cierto('lab: acíclico h=6 con ATP 1,5 y cíclico h=4 con ATP 1', 'h: 6, o2: 0.5, nadph: 1, atp: 1.5' in lab and 'h: 4, o2: 0, nadph: 0, atp: 1 ' in lab)

# balance de oxígeno: 6 O2 = 12 átomos de O
cierto('6 O2 = 12 átomos de O = 12 H2O', 6 * 2 == 12 == 12 * 1)
# marcaje 18O: 12 O del CO2: 6 en la glucosa y 6 en 6 H2O
cierto('marcaje: 12 O del CO2, 6 en glucosa, el resto (6) en el agua', 6 * 2 - 6 == 6)

# ---------------------------------------------------------------- reacciones de la quimiosíntesis (átomos y carga)
def especie(txt):
    """'2 Fe^2+' → (coeficiente, fórmula, carga). La carga se escribe tras «^»."""
    m = re.match(r'^(\d+)?\s*(.+)$', txt.strip())
    coef = int(m.group(1)) if m.group(1) else 1
    f, _, q = m.group(2).partition('^')
    carga = 0
    if q:
        mq = re.match(r'^(\d*)([+-])$', q)
        carga = (int(mq.group(1)) if mq.group(1) else 1) * (1 if mq.group(2) == '+' else -1)
    return coef, f, carga


def cuenta(base):
    at = {}
    for el, n in re.findall(r'([A-Z][a-z]?)(\d*)', base):
        at[el] = at.get(el, 0) + (int(n) if n else 1)
    return at


def balanceada(izq, der):
    def tot(lado):
        at, q = {}, 0
        for sp_ in lado:
            c, base, carga = especie(sp_)
            for el, n in cuenta(base).items():
                at[el] = at.get(el, 0) + c * n
            q += c * carga
        return at, q
    return tot(izq) == tot(der)


reacciones = {
    'Nitrosomonas': (['2 NH4^+', '3 O2'], ['2 NO2^-', '4 H^+', '2 H2O']),
    'Nitrobacter': (['2 NO2^-', 'O2'], ['2 NO3^-']),
    'sulfobacterias 1': (['2 H2S', 'O2'], ['2 S', '2 H2O']),
    'sulfobacterias 2': (['2 S', '3 O2', '2 H2O'], ['2 H2SO4']),
    'ferrobacterias': (['4 Fe^2+', 'O2', '4 H^+'], ['4 Fe^3+', '2 H2O']),
    'hidrógeno': (['2 H2', 'O2'], ['2 H2O']),
    'fotosíntesis anoxigénica (átomos)': (['CO2', '2 H2S'], ['CH2O', '2 S', 'H2O']),
    'fotosíntesis (global)': (['6 CO2', '12 H2O'], ['C6H12O6', '6 O2', '6 H2O']),
}
for nom, (i, d) in reacciones.items():
    cierto('reacción balanceada: %s' % nom, balanceada(i, d))
cierto('detector de balance: una reacción mal escrita falla', not balanceada(['NH4^+', 'O2'], ['NO2^-', 'H2O']))
for frag in ('2 nh4+ + 3 o2 → 2 no2- + 4 h+ + 2 h2o', '2 no2- + o2 → 2 no3-', '2 h2s + o2 → 2 s + 2 h2o',
             '2 s + 3 o2 + 2 h2o → 2 h2so4', '4 fe2+ + o2 + 4 h+ → 4 fe3+ + 2 h2o', '2 h2 + o2 → 2 h2o',
             '6 co2 + 12 h2o + luz → c6h12o6 + 6 o2 + 6 h2o'):
    cierto('teoría cita «%s»' % frag, frag in teoria_l)

# ---------------------------------------------------------------- energía de los fotones y rendimiento
h, c, NA = sp.Float('6.62607015e-34'), sp.Float('299792458'), sp.Float('6.02214076e23')
HCNA = float(h * c * NA * 1e9 / 1e3)        # kJ·nm/mol
casi('h·c·N_A = 119 627 kJ·nm/mol', HCNA, 119627, 0.0002)


def E(lam):
    return HCNA / lam


casi('fotón de 680 nm: 175,9 kJ/mol', E(680), 175.9, 0.002)
casi('fotón de 430 nm: ≈ 278 kJ/mol', E(430), 278, 0.003)
cierto('el fotón azul tiene más energía que el rojo', E(430) > E(680))
fotones = 12 * 2 * 2
cierto('fotones por glucosa = 12 NADPH · 2 e⁻ · 2 fotones = 48', fotones == 48 and 48 // 6 == 8)
cierto('686 kcal ≈ 2870 kJ', abs(686 * 4.184 - 2870) < 2)
casi('energía luminosa mínima 48 · 175,9 ≈ 8444', 48 * 175.9, 8444, 0.001)
rend = 2870 / (48 * E(680))
casi('rendimiento máximo ≈ 34 %', rend * 100, 34, 0.01)
cierto('pH 5 frente a 8: factor 1000', 10 ** (8 - 5) == 1000)

# ---------------------------------------------------------------- modelo de los simuladores (factor limitante)
P = {'c3': dict(lsat=1000, cdiv=6, topt=30, tan=15), 'c4': dict(lsat=1500, cdiv=2, topt=35, tan=15)}


def tasa(tipo, I, C, Tc):
    p = P[tipo]
    luz = min(100, 100 * I / p['lsat'])
    co2 = min(100, C / p['cdiv'])
    tem = 100 * math.exp(-((Tc - p['topt']) / p['tan']) ** 2)
    return min(luz, co2, tem), (luz, co2, tem)


v, (a, b_, c_) = tasa('c3', 500, 400, 25)
casi('C3 500/400/25 → 50 %', v, 50, 0.001)
cierto('C3 500/400/25 limita la luz', a < b_ and a < c_)
casi('temperatura a 25 °C ≈ 89,5 %', c_, 89.5, 0.002)
v, (a, b_, c_) = tasa('c3', 1500, 400, 30)
casi('C3 1500/400/30 → 66,7 %', v, 66.67, 0.001)
cierto('limita el CO₂', b_ < a and b_ < c_)
v, (a, b_, c_) = tasa('c3', 1500, 800, 10)
casi('C3 1500/800/10 → 16,9 %', v, 16.9, 0.005)
cierto('limita la temperatura', c_ < a and c_ < b_)
v, _ = tasa('c4', 750, 400, 35)
casi('C4 750/400/35 → 50 %', v, 50, 0.001)
v, _ = tasa('c3', 2000, 1000, 30)
casi('todo al máximo → 100 %', v, 100, 0.001)
cierto('lab: parámetros del modelo coinciden', all(s in lab for s in ('luzSat: 1000, co2Div: 6, tOpt: 30, tAn: 15', 'luzSat: 1500, co2Div: 2, tOpt: 35, tAn: 15')))
cierto('lab: C4 gasta 5 ATP por CO₂, C3 3', 'tipo === "c4" ? 5 : 3' in lab)

# ---------------------------------------------------------------- experimentos y gráficas de la teoría
bruta400 = 4.5 + 2.0
casi('curva de luz: bruta a 400 µmol = 6,5', bruta400, 6.5)
cierto('teoría: bruta = neta + respiración con 6,5', '6,5 µl/cm²·h' in teoria_l)
# interpolación del punto de compensación (ejercicio c10)
x = sp.symbols('x')
sol = sp.solve(sp.Eq(-sp.Rational(3, 2) + (x - 40) * sp.Rational(2, 40), 0), x)[0]
cierto('interpolación: punto de compensación 70 µmol', sol == 70)

# ---------------------------------------------------------------- hechos y fechas
hechos = [('priestley', '1771'), ('ingenhousz', '1779'), ('engelmann', '1882'), ('hill', '1937'), ('ruben y kamen', '1941')]
tabla_hist = norm(re.search(r'1771.*?1941.*?agua</b>', teoria, re.S).group(0)) if re.search(r'1771.*?1941.*?agua</b>', teoria, re.S) else ''
for quien, anio in hechos:
    cierto('hecho: %s %s' % (quien, anio), re.search(anio + r'[^0-9]{0,30}' + quien, tabla_hist) is not None)
for frag in ('winogradsky (1887)', 'mitchell (1961)', 'nobel en 1978', 'margulis, 1967', 'calvin, 1961', 'en 1977', 'blackman (1905)', '2400 millones'):
    cierto('teoría cita «%s»' % frag, frag in teoria_l)
cierto('ficha: Ruben y Kamen 1941', any(a['n'] == 'Ruben y Kamen' and a['f'] == '1941' for a in vz['autores']))
cierto('ficha: Calvin, Nobel 1961', any(a['n'] == 'Calvin' and '1961' in a['f'] for a in vz['autores']))
cierto('ficha: Hill 1937 coherente con la teoría', 'hill 1937' in vz_txt and '1937' in teoria_l)
for frag in ('p680', 'p700', 'rubisco', 'fotólisis', 'fotofosforilación', 'ciclo de calvin', 'factor limitante', 'fotorrespiración', 'quimiosíntesis', 'plastocianina', 'ferredoxina', 'peps' if False else 'pep carboxilasa'):
    cierto('teoría contiene «%s»' % frag, frag in teoria_l)
for frag in ('18 atp y 12 nadph', '3 atp (2 + 1)', 'oxalacetato', 'malato', 'vaina', 'lumen', 'estroma'):
    cierto('teoría contiene «%s»' % frag, frag in teoria_l)
cierto('ficha: 18 ATP y 12 NADPH', '18 atp y 12 nadph' in vz_txt)
cierto('ficha: cíclico solo ATP, acíclico ATP + NADPH + O₂', 'solo atp' in vz_txt and 'atp + nadph + o₂' in vz_txt)
cierto('ficha: estomas CAM de noche, C4 espacio, CAM tiempo', 'cam: tiempo' in vz_txt and 'c4: espacio' in vz_txt)
cierto('ficha: maíz C4 y cactus CAM, trigo C3', 'maíz' in vz_txt and 'cactus' in vz_txt and 'trigo' in vz_txt)
cierto('pigmentos: clorofila a 430 y 660 nm (violeta-azul y rojo)', '≈ 430 nm' in teoria_l and '≈ 660 nm' in teoria_l and 400 <= 430 <= 500 and 620 <= 660 <= 750)
cierto('pigmentos: el verde (500–570 nm) se refleja', '500–570' in teoria_l)
cierto('P680 y P700: el número es la longitud de onda', 'p680' in teoria_l and 'p700' in teoria_l)

# ---------------------------------------------------------------- estructura mínima del tema
def checks(e):
    cc = e['check']
    return cc if isinstance(cc, list) else [cc]


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
cierto('tarjetas ≥ 14', len(D['tarjetas1']['cartas']) >= 14)
cierto('ficha: 6 bloques, 10 claves, 3 tablas', len(vz['bloques']) == 6 and len(vz['claves']) == 10 and sum(1 for b in vz['bloques'] if 'tabla' in b) == 3)
cierto('ficha: cada bloque ≤ 3 frases', all(len(b['frases']) <= 3 for b in vz['bloques']))
cierto('teoría monta bio_esquemaz, bio_calvin, bio_fotofactores y bio_c3c4cam', all(k in (json.dumps(T['secciones']) + json.dumps(T['nuevas'])) for k in ('bio_esquemaz', 'bio_calvin', 'bio_fotofactores', 'bio_c3c4cam')))

# ---------------------------------------------------------------- opciones: única respuesta correcta
for e in T['ejercicios']:
    for cc in checks(e):
        if cc['tipo'] == 'opcion':
            ops = cc['opciones']
            cierto('%s: opciones distintas' % e['id'], len(set(ops)) == len(ops))
            cierto('%s: índice válido' % e['id'], 0 <= cc['ok'] < len(ops))

CLAVES = {'b1': 'tilacoide', 'b2': 'estroma', 'b3': 'agua', 'b4': 'clorofila a', 'b5': 'ATP y NADPH', 'b12': 'inorgánicos',
          'b13': 'maíz', 'b17': 'refleja', 'c13': 'otro factor', 'c14': 'de noche', 'c18': 'lumen', 'd10': 'sube el o₂'}
for eid, k in CLAVES.items():
    cc = checks(EJ[eid])[0]
    cierto('%s: la correcta contiene «%s»' % (eid, k), k.lower() in cc['opciones'][cc['ok']].lower())
    cierto('%s: ninguna otra contiene «%s»' % (eid, k), all(k.lower() not in o.lower() for i, o in enumerate(cc['opciones']) if i != cc['ok']))
cc = checks(EJ['b11'])[0]
cierto('b11: la correcta es O₂', cc['opciones'][cc['ok']] == 'O₂')

VERDAD = {'b6': False, 'b7': False, 'b14': False, 'c11': False, 'c17': True}
for eid, v in VERDAD.items():
    cc = checks(EJ[eid])[0]
    cierto('%s: V/F correcto' % eid, (cc['opciones'][cc['ok']] == 'Verdadero') == v)

MULTI = {'b10': ['tilacoide', 'estroma', 'lumen'], 'c12': ['acíclico', 'acíclico', 'ambos'], 'c15': ['Carboxilación', 'Reducción', 'Regeneración']}
for eid, ks in MULTI.items():
    for cc, k in zip(checks(EJ[eid]), ks):
        cierto('%s/%s correcto' % (eid, cc['etiqueta']), k.lower() in cc['opciones'][cc['ok']].lower())
        cierto('%s/%s única' % (eid, cc['etiqueta']), sum(k.lower() in o.lower() for o in cc['opciones']) == 1)

# ---------------------------------------------------------------- numéricos recalculados
atp_glu, nadph_glu = 6 * 3, 6 * 2
ESP = {
    'b15': 3, 'b16': 2,
    'c1': 12 * 3, 'c2': 12 * 2, 'c3': 18 // 6, 'c4': 2 * 6, 'c5': (12 * 2) // 2, 'c6': 3 * (24 // 4), 'c7': 10 ** (8 - 5),
    'c8': HCNA / 680, 'c9': 5 + 3, 'c10': 70, 'c16': 18 / 12, 'c19': 6 * 5, 'c20': 9 // 3,
    'd1': rend * 100, 'd2': 12 * 2 * 2, 'd3': 9 - 1, 'd4': 12 - 6, 'd5': 2.0 / (6.0 + 2.0) * 100,
    'd6': tasa('c3', 500, 400, 25)[0], 'd7': tasa('c3', 1500, 400, 30)[0], 'd8': tasa('c3', 1500, 800, 10)[0], 'd9': tasa('c4', 750, 400, 35)[0],
}
for eid, val in ESP.items():
    cc = checks(EJ[eid])[0]
    cierto('%s: tipo numérico' % eid, cc['tipo'] == 'num')
    tol = cc.get('tol', 0.005)
    cierto('%s: valor %s ≈ %s' % (eid, cc['valor'], round(val, 3)), abs(cc['valor'] - val) <= max(tol, 0.005) * max(abs(val), 1e-12) + 1e-9)
cierto('b15/c1: concuerdan con ATP por glucosa 18', atp_glu == 18 and nadph_glu == 12)
cierto('c9: respiración + neta = bruta (8)', 3 + 5 == 8)

# ---------------------------------------------------------------- datos de actividades
for k in ('relacion', 'fases', 'c3c4cam'):
    d = D[k]
    cierto('%s: categorías e ítems válidos' % k, all(0 <= it['c'] < len(d['categorias']) for it in d['items']))
cierto('fases: fotólisis y NADPH en la luminosa; RuBisCO y regeneración en Calvin',
       all(next(i['c'] for i in D['fases']['items'] if i['t'] == t) == c for t, c in
           (('Fotólisis del agua', 0), ('Formación de NADPH', 0), ('Carboxilación con RuBisCO', 1), ('Regeneración de la RuBP', 1), ('Síntesis de almidón', 1))))
cierto('relacion: cloroplasto/NADPH fotosíntesis; mitocondria/NADH respiración; quimiosmosis las dos',
       all(next(i['c'] for i in D['relacion']['items'] if i['t'] == t) == c for t, c in
           (('Cloroplasto', 0), ('NADPH', 0), ('Mitocondria', 1), ('NADH y FADH₂', 1), ('Quimiosmosis (ATP sintasa)', 2))))
cierto('c3c4cam: trigo C3, maíz C4, cactus CAM',
       all(next(i['c'] for i in D['c3c4cam']['items'] if i['t'] == t) == c for t, c in (('Trigo', 0), ('Maíz', 1), ('Cactus', 2), ('Separación en el espacio', 1), ('Separación en el tiempo', 2))))
for k in ('pigmentos', 'quimio'):
    cierto('%s: pares con términos distintos' % k, len({p[0] for p in D[k]['pares']}) == len(D[k]['pares']) and len({p[1] for p in D[k]['pares']}) == len(D[k]['pares']))
cierto('quimio: Nitrosomonas NH₄⁺ → NO₂⁻ y Nitrobacter NO₂⁻ → NO₃⁻',
       ['Nitrosomonas', 'NH₄⁺ → NO₂⁻'] in D['quimio']['pares'] and ['Nitrobacter', 'NO₂⁻ → NO₃⁻'] in D['quimio']['pares'])
oz = [i['t'] for i in D['ordenz']['items']]
cierto('ordenz: PSII antes que fotólisis, PSI al final', 'fotosistema II' in oz[0] and 'Fotólisis' in oz[1] and 'NADPH' in oz[-1] and 'fotosistema I' in oz[-2])
oc = [i['t'] for i in D['ordencalvin']['items']]
cierto('ordencalvin: carboxilación primero, regeneración al final', 'une el CO₂' in oc[0] and 'regeneran' in oc[-1])
for k in ('quiz1', 'errores'):
    for i, q in enumerate(D[k]['preguntas']):
        cierto('%s[%d]: opciones distintas y ok válido' % (k, i), len(set(q['op'])) == len(q['op']) and 0 <= q['ok'] < len(q['op']) and q.get('porque'))
cierto('errores: todas preguntan por la afirmación FALSA', all('FALSA' in q['q'] for q in D['errores']['preguntas']))
QZ = {0: 'agua', 1: 'tilacoides', 2: 'RuBisCO', 3: 'solo ATP', 4: '18 ATP y 12 NADPH', 5: 'de noche', 7: 'amonio'}
for i, k in QZ.items():
    q = D['quiz1']['preguntas'][i]
    cierto('quiz1[%d]: correcta «%s» y única' % (i, k), k.lower() in q['op'][q['ok']].lower() and sum(k.lower() in o.lower() for o in q['op']) == 1)
ER = {0: 'procede del CO₂', 1: 'solo de noche', 2: 'Produce NADPH y O₂', 3: 'en el estroma', 4: 'abren los estomas de día', 5: 'absorben la luz verde', 6: 'solo respiran de noche'}
for i, k in ER.items():
    q = D['errores']['preguntas'][i]
    cierto('errores[%d]: la falsa contiene «%s»' % (i, k), k.lower() in q['op'][q['ok']].lower())

if fallos:
    print('FALLOS:')
    for f in fallos:
        print('  -', f)
print('%d comprobaciones correctas, %d fallos' % (ok, len(fallos)))
sys.exit(1 if fallos else 0)
