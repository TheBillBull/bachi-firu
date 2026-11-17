#!/usr/bin/env python3
"""
Verificación independiente de Biología II, tema 15 (Inmunología).
No comparte código con la web: recalcula con fracciones/enumeración cada cifra de los ejercicios y de los
ejemplos (masa del IgG, sitios de unión, divisiones clonales, diluciones, cruces ABO y Rh por enumeración de
gametos, inmunidad de grupo, pérdida de CD4, compatibilidad transfusional por conjuntos) y el modelo numérico
de los widgets (respuesta primaria y secundaria; 27 de 64 combinaciones compatibles). Comprueba hechos y fechas
de la ficha frente a la teoría, que cada ejercicio de opción tenga una única respuesta correcta que coincida con
los hechos, y que todas las actividades referenciadas en la teoría existan.

Convenciones declaradas: anticuerpo IgG = 2 H de 50 kDa + 2 L de 25 kDa; compatibilidad de hematíes: los antígenos
(A, B, D) del donante deben estar contenidos en los del receptor (anti-D solo tras sensibilización, tratado
como incompatible); modelo de la respuesta: sen² de subida y caída exponencial (latencia/pico/tau declarados).

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_bio2_t15.py /tmp/ampl.json
"""
import json, math, re, sys, itertools
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
T = datos['ampl']['bio2']['t15']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()


# ---------------------------------------------------------------- genética: enumeración de gametos
def hijos(p1, p2):
    c = {}
    for a, b in itertools.product(p1, p2):
        g = tuple(sorted((a, b)))
        c[g] = c.get(g, 0) + F(1, 4)
    return c


def grupo(g):
    s = set(g)
    if s == {'A', 'B'}:
        return 'AB'
    if 'A' in s:
        return 'A'
    if 'B' in s:
        return 'B'
    return 'O'


def p_grupo(p1, p2):
    r = {}
    for g, p in hijos(p1, p2).items():
        r[grupo(g)] = r.get(grupo(g), 0) + p
    return r


def p_rh(p1, p2):
    r = {}
    for g, p in hijos(p1, p2).items():
        k = 'Rh+' if 'D' in g else 'Rh-'
        r[k] = r.get(k, 0) + p
    return r


cierto('AB × O: A = 1/2, B = 1/2, nada de AB ni O', p_grupo(('A', 'B'), ('O', 'O')) == {'A': F(1, 2), 'B': F(1, 2)})
cierto('AO × AO: O = 1/4, A = 3/4', p_grupo(('A', 'O'), ('A', 'O')) == {'A': F(3, 4), 'O': F(1, 4)})
cuatro = p_grupo(('A', 'O'), ('B', 'O'))
cierto('AO × BO: los cuatro grupos a 1/4', cuatro == {'A': F(1, 4), 'B': F(1, 4), 'AB': F(1, 4), 'O': F(1, 4)})
cierto('hijo de AA × OO es siempre AO (un abuelo O implica heterocigoto)', set(hijos(('A', 'A'), ('O', 'O')).keys()) == {('A', 'O')})
cierto('dd × Dd: Rh+ = 1/2', p_rh(('d', 'd'), ('D', 'd'))['Rh+'] == F(1, 2))
cierto('Dd × Dd: Rh+ = 3/4, Rh− = 1/4', p_rh(('D', 'd'), ('D', 'd')) == {'Rh+': F(3, 4), 'Rh-': F(1, 4)})
cierto('dd × DD: todos Rh+', p_rh(('d', 'd'), ('D', 'D')) == {'Rh+': F(1)})
cierto('O y Rh− = 1/16 (ejemplo de teoría)', cuatro['O'] * p_rh(('D', 'd'), ('D', 'd'))['Rh-'] == F(1, 16))
p_AB_Rhpos = cuatro['AB'] * p_rh(('D', 'd'), ('D', 'd'))['Rh+']
cierto('AB y Rh+ = 3/16 (d4)', p_AB_Rhpos == F(3, 16))
cierto('1/16 = 6,25 %', float(F(1, 16)) * 100 == 6.25)


# ---------------------------------------------------------------- compatibilidad transfusional por conjuntos
def antigenos(g, rh):
    base = {'A', 'B'} if g == 'AB' else ({g} if g in ('A', 'B') else set())
    return frozenset(base | ({'D'} if rh == '+' else set()))


GR = [(g, r) for g in ('A', 'B', 'AB', 'O') for r in ('+', '-')]


def compat(d, r):
    return antigenos(*d) <= antigenos(*r)


total = sum(compat(d, r) for d in GR for r in GR)
cierto('27 de 64 combinaciones compatibles (teoría y widget)', total == 27 and len(GR) ** 2 == 64)
cierto('O− dona a los 8 grupos', all(compat(('O', '-'), r) for r in GR))
cierto('AB+ recibe de los 8 grupos', all(compat(d, ('AB', '+')) for d in GR))
donantes_B_pos = {d for d in GR if compat(d, ('B', '+'))}
cierto('d7: 4 donantes para B+ (B+, B−, O+, O−)', donantes_B_pos == {('B', '+'), ('B', '-'), ('O', '+'), ('O', '-')})
cierto('A+ a O+: incompatible (c12)', not compat(('A', '+'), ('O', '+')))
cierto('O+ solo recibe de O+ y O−', {d for d in GR if compat(d, ('O', '+'))} == {('O', '+'), ('O', '-')})
cierto('A− solo recibe de A− y O−', {d for d in GR if compat(d, ('A', '-'))} == {('A', '-'), ('O', '-')})


def antis(g):
    return {a for a in ('A', 'B') if a not in antigenos(g, '-')}


cierto('A: anti-B; B: anti-A; AB: ninguno; O: anti-A y anti-B',
       antis('A') == {'B'} and antis('B') == {'A'} and antis('AB') == set() and antis('O') == {'A', 'B'})


# ---------------------------------------------------------------- modelo de la respuesta (widget bio_respuesta)
def resp(t, t0, lag, pico, A, tau):
    s = t - t0
    if s <= lag:
        return 0.0
    if s <= pico:
        return A * math.sin(math.pi / 2 * (s - lag) / (pico - lag)) ** 2
    return A * math.exp(-(s - pico) / tau)


P1 = dict(lag=5, pico=14, A=1, tau=15)
P2 = dict(lag=2, pico=7, A=10, tau=60)
cierto('primaria: pico 1 el día 14; nada antes del día 5', abs(resp(14, 0, **P1) - 1) < 1e-12 and resp(5, 0, **P1) == 0)
cierto('secundaria: latencia 2 días < 5; pico 10 = 10 × 1', P2['lag'] < P1['lag'] and P2['A'] / P1['A'] == 10)
previo40 = resp(40, 0, **P1)
casi('anticuerpos antes del 2.º contacto (día 40) = exp(−26/15)', previo40, math.exp(-26 / 15))
cierto('widget muestra 0,18 antes del 2.º contacto', '%.2f' % previo40 == '0.18')
pico2 = P2['A'] + resp(40 + 7, 0, **P1)
cierto('pico tras el 2.º contacto a día 40 = 10,11', '%.2f' % pico2 == '10.11')
mx = max(resp(t / 10, 0, **P1) + resp(t / 10, 40, **P2) for t in range(0, 1400))
casi('máximo de la curva total a día 40 ≈ 10,11', mx, pico2, 0.001)
cierto('antígeno distinto: la curva anti-B repite la primaria (pico 1)', abs(resp(54, 40, **P1) - 1) < 1e-12)

# ---------------------------------------------------------------- cada ejercicio numérico contra su cálculo independiente
ESPERADO = {
    'b16': 2 * 50 + 2 * 25,
    'c14': 2 ** (96 // 12),
    'c15': round(math.log2(256)),
    'c16': 5 * 2,
    'd1': float(p_grupo(('A', 'B'), ('O', 'O'))['A']),
    'd2': float(p_grupo(('A', 'O'), ('A', 'O'))['O']),
    'd3': float(p_rh(('d', 'd'), ('D', 'd'))['Rh+']),
    'd4': float(p_AB_Rhpos),
    'd5': round((1 - 1 / 12) * 100, 1),
    'd6': (600 - 180) / 600 * 100,
    'd7': len(donantes_B_pos),
}
for eid, v in ESPERADO.items():
    ch = EJ[eid]['check']
    cierto('%s es de tipo num' % eid, ch['tipo'] == 'num')
    casi('ejercicio %s' % eid, ch['valor'], v, 0.003)
    cierto('%s: tolerancia razonable (≤ 2 %%)' % eid, ch.get('tol', 0.005) <= 0.02)
cierto('96 h / 12 h = 8 divisiones exactas', 96 % 12 == 0 and 96 // 12 == 8)
cierto('d6: 180 < 200 (criterio de SIDA) y 600 en rango normal', 180 < 200 and 500 <= 600 <= 1500)
cierto('inmunidad de grupo: R0 = 12 → 11/12', 1 - F(1, 12) == F(11, 12))
casi('sarampión R0 18: 94,4 %', (1 - 1 / 18) * 100, 94.4, 0.002)


# ---------------------------------------------------------------- ejercicios de opción: única correcta y coincide con los hechos
def checks(e):
    c = e['check']
    return c if isinstance(c, list) else [c]


ids = [e['id'] for e in T['ejercicios']]
cierto('ids únicos', len(ids) == len(set(ids)))
cierto('≥ 40 ejercicios (hay %d)' % len(ids), len(ids) >= 40)
cierto('hay ★, ★★ y ★★★', {e['nivel'] for e in T['ejercicios']} == {1, 2, 3})
cierto('≥ 4 preguntas abiertas con rúbrica', sum(1 for e in T['ejercicios'] if checks(e)[0]['tipo'] == 'rubrica') >= 4)
for e in T['ejercicios']:
    cierto('%s: tiene pasos y resultado' % e['id'], bool(e.get('pasos')) and bool(e.get('resultado')))
    for c in checks(e):
        if c['tipo'] == 'opcion':
            ops = c['opciones']
            cierto('%s: opciones distintas' % e['id'], len(set(ops)) == len(ops))
            cierto('%s: ok dentro de rango' % e['id'], 0 <= c['ok'] < len(ops))
        if c['tipo'] == 'rubrica':
            cierto('%s: rúbrica suma 1,4–2,1' % e['id'], 1.4 <= sum(i['p'] for i in c['items']) <= 2.1)

CLAVE = {
    'b1': 'innata', 'b2': 'Neutrófilo', 'b3': 'antígeno', 'b4': 'timo', 'b5': 'B y anticuerpos', 'b6': 'IgG',
    'b7': 'memoria', 'b8': 'pasiva artificial', 'b9': 'histamina', 'b10': 'alotrasplante',
    'c1': 'vecinas', 'c2': 'específicamente', 'c3': 'clase I', 'c4': 'marcan', 'c5': 'memoria', 'c6': 'placenta',
    'c9': 'hapteno', 'c10': 'Diabetes tipo 1', 'c11': 'muta', 'c12': 'anti-A', 'c13': 'anticuerpos',
    'd8': 'Primaria', 'd10': 'MHC-I',
}
for eid, k in CLAVE.items():
    c = checks(EJ[eid])[0]
    cierto('%s: la correcta contiene «%s»' % (eid, k), k.lower() in c['opciones'][c['ok']].lower())
    cierto('%s: ninguna otra contiene «%s»' % (eid, k), all(k.lower() not in o.lower() for i, o in enumerate(c['opciones']) if i != c['ok']))

VF_ESP = {'b11': False, 'b12': True, 'c7': False, 'c8': False}
for eid, v in VF_ESP.items():
    c = checks(EJ[eid])[0]
    cierto('%s: V/F correcto' % eid, (c['opciones'][c['ok']] == 'Verdadero') == v)

EMP = {
    'b15': {'IgM': 'pentámero', 'IgA': 'leche', 'IgE': 'alergias'},
    'd9': {'Hijo 1': 'sensibiliza', 'Hijo 2 si es Rh+ y no hay profilaxis': 'anti-D', 'Prevención': 'anti-D'},
    'd11': {'Contiene anticuerpos ya formados': 'Suero', 'Genera células de memoria': 'Vacuna', 'La protección dura semanas': 'Suero', 'Se usa antes de la exposición': 'Vacuna'},
}
for eid, mapa in EMP.items():
    for c in checks(EJ[eid]):
        k = mapa[c['etiqueta']]
        cierto('%s/%s correcto' % (eid, c['etiqueta']), k.lower() in c['opciones'][c['ok']].lower())
        cierto('%s/%s única' % (eid, c['etiqueta']), sum(k.lower() in o.lower() for o in c['opciones']) == 1)

for eid, vals in {'b13': ['VIH', 'vih'], 'b14': ['aglutinacion', 'aglutinación']}.items():
    cierto('%s: valores aceptados' % eid, EJ[eid]['check']['valores'] == vals)

D = T['datos']
for nombre in ('quiz1', 'errores'):
    for p in D[nombre]['preguntas']:
        cierto('%s: %s… ok en rango y opciones distintas' % (nombre, p['q'][:25]), 0 <= p['ok'] < len(p['op']) and len(set(p['op'])) == len(p['op']))
FALSAS = [
    ('genera células de memoria específicas', 'adaptativa'), ('fabrican los linfocitos t citotóxicos', 'plasmáticas'),
    ('da anticuerpos ya formados', 'suero'), ('es un anticuerpo específico', 'no es un anticuerpo'),
    ('besos y picaduras', 'no se transmite'), ('ab tiene anticuerpos anti-a y anti-b', 'ningún'),
    ('es una infección causada', 'no hay infección'),
]
errs = D['errores']['preguntas']
cierto('errores: 7 preguntas', len(errs) == 7)
for p, (f, por) in zip(errs, FALSAS):
    cierto('error «%s»: la señalada es la falsa' % f, f in p['op'][p['ok']].lower())
    cierto('error «%s»: explicación coherente' % f, por in limpio(p['porque']).lower())
q7 = D['quiz1']['preguntas'][6]
cierto('quiz: grupo O con anti-A y anti-B es lo correcto', 'anti-a y anti-b' in q7['op'][q7['ok']].lower() and antis('O') == {'A', 'B'})

# ---------------------------------------------------------------- actividades de clasificar, emparejar y ordenar
DEF = {'Piel y mucosas': 0, 'Fagocitosis por un neutrófilo': 0, 'Fiebre': 0, 'Interferón': 0, 'Producción de anticuerpos contra el tétanos': 1,
       'Linfocito T citotóxico': 1, 'Células de memoria': 1, 'Complemento': 0}
for it in D['defensas']['items']:
    cierto('defensa %s' % it['t'], DEF[it['t']] == it['c'])
INM = {'Pasar la varicela': 0, 'Pasar la gripe y quedar inmune': 0, 'IgG de la madre al feto por la placenta': 1, 'IgA de la leche materna': 1,
       'Vacuna del sarampión': 2, 'Vacuna de ARNm': 2, 'Suero antiofídico': 3, 'Inmunoglobulina anti-D tras el parto': 3}
for it in D['inmunidad']['items']:
    cierto('inmunidad %s' % it['t'], INM[it['t']] == it['c'])
ALT = {'Rinitis por polen': 0, 'Alergia al cacahuete': 0, 'Asma alérgica': 0, 'Diabetes tipo 1': 1, 'Esclerosis múltiple': 1,
       'Artritis reumatoide': 1, 'Lupus': 1, 'SIDA': 2}
for it in D['alteraciones']['items']:
    if it['t'] in ALT:
        cierto('alteración %s' % it['t'], ALT[it['t']] == it['c'])
    else:
        cierto('niño burbuja = inmunodeficiencia', 'burbuja' in it['t'] and it['c'] == 2)
for k, n in (('ig', 5), ('celulas', 6), ('hitos', 5)):
    cierto('emparejar %s: %d pares distintos' % (k, n), len(D[k]['pares']) == n and len({p[0] for p in D[k]['pares']}) == n)
HIT = {'Jenner (1796)': 'viruela', 'Metchnikoff (1882)': 'Fagocitosis', 'Behring y Kitasato (1890)': 'anticuerpos', 'Landsteiner (1901)': 'ABO', 'Köhler y Milstein (1975)': 'monoclonales'}
for a, b in D['hitos']['pares']:
    cierto('hito %s' % a, HIT[a].lower() in b.lower())
oi = [i['t'] for i in D['ordeninflamacion']['items']]
cierto('orden de la inflamación', 'microorganismos' in oi[0] and 'histamina' in oi[1] and 'dilatan' in oi[2] and 'quimiotaxis' in oi[3] and 'engloban' in oi[4] and 'repara' in oi[5])
oh = [i['t'] for i in D['ordenhumoral']['items']]
cierto('orden de la respuesta humoral', 'reconoce' in oh[0] and 'colaborador' in oh[1] and 'interleucinas' in oh[2] and 'expansión' in oh[3] and 'plasmáticas y B de memoria' in oh[4] and 'secretan' in oh[5])

fuente = open('ampliaciones/contenido/bio2_t15a.js', encoding='utf-8').read()
citadas = set(re.findall(r'w\("(?:clasificar|emparejar|orden|quiz|tarjetas)", "(\w+)"\)', fuente))
cierto('todas las actividades citadas existen (%s)' % sorted(citadas), citadas <= set(D.keys()) and len(citadas) == 11)

# ---------------------------------------------------------------- hechos y fechas: ficha frente a la teoría
FECHAS = {'Jenner': '1796', 'Metchnikoff': '1882', 'Landsteiner': '1901', 'Köhler y Milstein': '1975'}
for n, f in FECHAS.items():
    a = [x for x in vz['autores'] if x['n'] == n]
    cierto('ficha: %s %s' % (n, f), len(a) == 1 and a[0]['f'] == f)
HECHOS = [('jenner', '1796'), ('pasteur', '1885'), ('landsteiner', '1901'), ('metchnikoff', '1882'), ('behring', '1890'),
          ('köhler', '1975'), ('montagnier', '1983'), ('burnet', '1957'), ('wiener', '1940'), ('murray', '1954'), ('barnard', '1967')]
for n, f in HECHOS:
    cierto('%s ↔ %s en la misma frase de la teoría' % (n, f), re.search(n + r'[^.]{0,200}?' + f, teoria_l) is not None or re.search(f + r'[^.]{0,200}?' + n, teoria_l) is not None)
cierto('Nobel 1908, 2008, 1984, 1930 y 1987 citados', all(x in teoria_l for x in ('1908', '2008', '1984', '1930', '1987')))
cierto('viruela erradicada en 1980', 'erradicada en 1980' in teoria_l)
cierto('ficha: 6 bloques, 10 palabras clave', len(vz['bloques']) == 6 and len(vz['claves']) == 10)
cierto('ficha: ≥ 4 mini-tablas', sum(1 for b in vz['bloques'] if 'tabla' in b) >= 4)
for b in vz['bloques']:
    cierto('bloque «%s»: ≤ 3 frases de ≤ 16 palabras' % b['t'], len(b['frases']) <= 3 and all(len(limpio(f).split()) <= 16 for f in b['frases']))
for t in ('4 cadenas', 'linfocito b', 'linfocito tc', 'memoria', 'igg', 'igm', 'iga', 'ige', 'mhc', 'anti-b', 'anti-a'):
    cierto('ficha usa «%s»' % t, t in vz_txt)
for t in ('cuatro cadenas polipeptídicas', 'dos pesadas', 'dos ligeras', 'región variable', 'perforina', 'células plasmáticas', 'cd4', 'transcriptasa inversa'):
    cierto('teoría usa «%s»' % t, t in teoria_l)
cierto('latencias 5–10 y 1–3 días en ficha y teoría', all(x in vz_txt and x in teoria_l for x in ('5–10 días', '1–3 días')))
cierto('IgG atraviesa la placenta: ficha y teoría', 'atraviesa la placenta' in vz_txt and 'atraviesa la placenta' in teoria_l)
cierto('150 kDa en la teoría', '150 kda' in teoria_l)
cierto('IgM pentámero (10 sitios) y IgA dímero (4 sitios)', 'pentámero (10 sitios)' in teoria_l and 'dímero (4 sitios)' in teoria_l)
cierto('27 compatibles de 64 en la teoría', '27 son compatibles' in teoria_l)
cierto('CD4 normal 500–1500 y SIDA < 200', '500–1500' in teoria_l and '200 por µl' in teoria_l)
cierto('R0 = 12: más del 92 % en la teoría', '92–94' in teoria_l and F(11, 12) > F(92, 100))
cierto('ejemplo de la gráfica: 6 → 2 días y ×10', 'de 6 a 2 días' in teoria_l and '10 veces' in teoria_l)
cierto('ficha cita ≈ 10 veces', '10 veces' in vz_txt)
cierto('lámina: 6 láminas', len(T['lamina']) == 6)

print('%d comprobaciones correctas, %d fallos' % (ok, len(fallos)))
for f in fallos:
    print('FALLO:', f)
sys.exit(1 if fallos else 0)
