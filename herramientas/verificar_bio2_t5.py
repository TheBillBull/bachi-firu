#!/usr/bin/env python3
"""
Verificación independiente de Biología II, tema 5 (Ácidos nucleicos).
No comparte código con la web: recalcula con fracciones cada cifra de ejemplos y ejercicios (Chargaff, hebra
complementaria, puentes de hidrógeno, longitud y vueltas, enlaces fosfodiéster, plásmido, transcripción, nucleosomas,
longitud del ADN humano, Tm), comprueba la tabla de Chargaff, los hechos y fechas de la ficha, que cada ejercicio de
opción tenga una única respuesta correcta que coincida con los hechos, los preajustes del widget bio_adn y que la
ficha no contradiga la teoría.

Convención declarada: ADN-B de 0,34 nm por par de bases y 10 pb por vuelta (en realidad 10,5; se usa 10 como en
Selectividad); 200 pb por nucleosoma (146 en el núcleo + ADN de unión); Tm ≈ 69,3 + 0,41·%GC (Marmur–Doty).

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_bio2_t5.py /tmp/ampl.json
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
T = datos['ampl']['bio2']['t5']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# ---------------------------------------------------------------- funciones de biología molecular (propias)
COMP = {'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'}
COMP_ARN = {'A': 'U', 'T': 'A', 'C': 'G', 'G': 'C'}


def complementaria(s):          # misma lectura de izquierda a derecha (hebra opuesta escrita 3'→5')
    return ''.join(COMP[x] for x in s)


def puentes(s):
    return sum(2 if x in 'AT' else 3 for x in s)


def gc(s):
    return F(sum(x in 'GC' for x in s), len(s))


PBN = F('0.34')    # nm por par de bases

# ---------------------------------------------------------------- Chargaff y porcentajes
a = F(30); g_ = (100 - 2 * a) / 2
cierto('ejemplo Chargaff: A 30 → T 30, G = C = 20', g_ == 20 and 2 * a + 2 * g_ == 100)
cierto('c2: G = 20 %', EJ['c2']['check']['valor'] == 20)
cierto('c3: C 28 → A = (100 − 56)/2 = 22', (100 - 2 * 28) / 2 == 22 and EJ['c3']['check']['valor'] == 22)
# d7: una hebra A20 T30 G25 C25
h1 = {'A': 20, 'T': 30, 'G': 25, 'C': 25}
cierto('d7: suma 100', sum(h1.values()) == 100)
cierto('d7: %A en la complementaria = %T de la hebra 1 = 30', h1['T'] == 30 == EJ['d7']['check'][0]['valor'])
cierto('d7: %A del dúplex = (20 + 30)/2 = 25', F(h1['A'] + h1['T'], 2) == 25 == EJ['d7']['check'][1]['valor'])

# tabla de Chargaff de la teoría
TAB = {'humano': (30.9, 29.4, 19.9, 19.8), 'coli': (26.0, 23.9, 24.9, 25.2), 'levadura': (31.3, 32.9, 18.7, 17.1)}
for k, (A, Tm, G, C) in TAB.items():
    cierto('Chargaff %s: suma 100' % k, abs(A + Tm + G + C - 100) < 0.05)
    cierto('Chargaff %s: A ≈ T y G ≈ C (±2,2 puntos)' % k, abs(A - Tm) <= 2.2 and abs(G - C) <= 2.2)
RAZ = {'humano': ('1,05', '1,01', '1,52'), 'coli': ('1,09', '0,99', '1,00'), 'levadura': ('0,95', '1,09', '1,79')}
for k, (A, Tm, G, C) in TAB.items():
    esp = ('%.2f' % (A / Tm), '%.2f' % (G / C), '%.2f' % ((A + Tm) / (G + C)))
    cierto('Chargaff %s: razones %s' % (k, RAZ[k]), tuple(x.replace('.', ',') for x in esp) == RAZ[k])
    for r in RAZ[k]:
        cierto('teoría cita la razón %s de %s' % (r, k), r in limpio(teoria))
    cierto('teoría cita %s' % str(A).replace('.', ','), str(A).replace('.', ',') in limpio(teoria))
cierto('(A+T)/(G+C) varía entre especies', len({RAZ[k][2] for k in RAZ}) == 3)

# ---------------------------------------------------------------- secuencias
cierto('c1: complementaria de ATCGGATC = TAGCCTAG', complementaria('ATCGGATC') == 'TAGCCTAG' and 'TAGCCTAG' in EJ['c1']['check']['valores'])
cierto('ejemplo: leída 5′→3′ la complementaria es GATCCGAT', complementaria('ATCGGATC')[::-1] == 'GATCCGAT')
cierto('ejemplo: 4 pares A–T y 4 C–G → 20 puentes', puentes('ATCGGATC') == 20 == 4 * 2 + 4 * 3)
cierto('teoría: 5′-ATCGGA-3′ ↔ 3′-TAGCCT-5′ ↔ 5′-TCCGAT-3′', complementaria('ATCGGA') == 'TAGCCT' and complementaria('ATCGGA')[::-1] == 'TCCGAT')
cierto('c4: ATGCGC → 16 puentes', puentes('ATGCGC') == 16 == EJ['c4']['check']['valor'])
molde = 'TACGGATTC'
arn = ''.join(COMP_ARN[x] for x in molde)
cierto('c9 y ejemplo: ARNm de TACGGATTC = AUGCCUAAG', arn == 'AUGCCUAAG' and 'AUGCCUAAG' in EJ['c9']['check']['valores'])
cierto('transcripción: 9 nt = 3 codones AUG·CCU·AAG', len(arn) == 9 and [arn[i:i + 3] for i in range(0, 9, 3)] == ['AUG', 'CCU', 'AAG'])
cierto('ARNm sin T y U = nº de A del molde', 'T' not in arn and arn.count('U') == molde.count('A'))

# ---------------------------------------------------------------- longitudes, vueltas, enlaces
casi('c5: 1000 pb = 340 nm', float(1000 * PBN), 340, 0.0001)
cierto('c5 valor', EJ['c5']['check']['valor'] == 340)
cierto('c6/ejemplo: 1000 pb / 10 = 100 vueltas de 3,4 nm = 340 nm', F(1000, 10) == 100 and 100 * F('3.4') == 1000 * PBN and EJ['c6']['check']['valor'] == 100)
cierto('3,4 nm por vuelta = 10 · 0,34', 10 * PBN == F('3.4'))
cierto('c7: n − 1 = 19', 20 - 1 == 19 == EJ['c7']['check']['valor'])
cierto('ejemplo: doble hélice de 20 pb → 2·19 = 38 fosfodiésteres', 2 * (20 - 1) == 38)
# E. coli
ecoli = F(46, 10) * 10 ** 6 * PBN / 10 ** 6      # mm: nm·1e-6
casi('E. coli: 4,6e6 pb → 1,564 mm', float(F(46, 10) * 10 ** 6 * PBN * F(1, 10 ** 6)), 1.564, 0.0001)
cierto('E. coli: ≈ 780 veces la bacteria de 2 µm (782)', round(float(F('1.564') / F('0.002'))) == 782)
# humano
nh = F(64, 10) * 10 ** 9
metros = nh * PBN * F(1, 10 ** 9)
casi('d1: ADN humano 2,176 m', float(metros), 2.176, 0.0001)
casi('d1 valor', EJ['d1']['check']['valor'], float(metros), 0.001)
cierto('compactación ≈ 360 000 (2,176 m / 6 µm = 362 667)', 350000 < float(metros / F('6e-6')) < 370000)
cierto('c16: 6,4e9 / 200 = 3,2e7 = 32 millones', nh / 200 == 32 * 10 ** 6 and EJ['c16']['check']['valor'] == 32)
# plásmido
tot = 2 * 3000
gcn = tot * F(40, 100)
G = gcn / 2
A = (tot - gcn) / 2
cierto('c8: plásmido 3000 pb, 40 % GC → A = 1800', A == 1800 == EJ['c8']['check']['valor'] and G == 1200)
cierto('plásmido: 1200·3 + 1800·2 = 7200 puentes', G * 3 + A * 2 == 7200)
# Tm
tm = lambda p: F('69.3') + F('0.41') * p
cierto('Tm 40 % = 85,7; 60 % = 93,9', tm(40) == F('85.7') and tm(60) == F('93.9'))
casi('d2: Tm 50 % = 89,8', EJ['d2']['check']['valor'], float(tm(50)), 0.001)
cierto('Tm crece con %GC (más puentes por par)', tm(60) > tm(40) and 3 > 2)
# media de puentes por par en M1
cierto('M1: 2·0,54 + 3·0,46 = 2,46', F(2) * F('0.54') + 3 * F('0.46') == F('2.46'))
for m in ({'A': 27, 'T': 27, 'G': 23, 'C': 23}, {'A': 25, 'T': 30, 'G': 24, 'C': 21}, {'A': 22, 'U': 28, 'G': 31, 'C': 19}):
    cierto('muestra %s suma 100' % m, sum(m.values()) == 100)
for e_id, m in (('d3', {'A': 20, 'T': 20, 'G': 30, 'C': 30}), ('d4', {'A': 25, 'T': 30, 'G': 24, 'C': 21})):
    cierto('%s: suma 100' % e_id, sum(m.values()) == 100)
cierto('d4 monocatenario (A≠T y G≠C)', 25 != 30 and 24 != 21)

# ---------------------------------------------------------------- preajustes del widget bio_adn
widget = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'ampliaciones', 'lab_bio_t5.js'), encoding='utf-8').read()
pre = re.findall(r'\{ k: "(\w+)", t: "([^"]+)", s: "([ACGT]+)" \}', widget)
cierto('widget: 4 preajustes', len(pre) == 4)
ESP_PRE = {'ATGCGTACCT': (25, 50.0), 'GCGGCCGCGC': (30, 100.0), 'TATAAATATA': (20, 0.0), 'TACGGATTC': (22, 44.4)}
for k, t, s in pre:
    cierto('preajuste %s (%s): solo A, C, G, T y ≤ 20 bases' % (k, s), set(s) <= set('ACGT') and len(s) <= 20)
    cierto('preajuste %s: puentes y %%GC esperados' % s, s in ESP_PRE and puentes(s) == ESP_PRE[s][0] and round(float(gc(s)) * 100, 1) == ESP_PRE[s][1])
cierto('el widget usa 2 y 3 puentes y 0,34 nm', '0.34' in widget and '2 * (c.A + c.T) + 3 * gc' in widget)
cierto('el widget transcribe con U (A→U, T→A, C→G, G→C)', 'A: "U", T: "A", C: "G", G: "C"' in widget)

# ---------------------------------------------------------------- ejercicios
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
    'b1': 'pentosa, base nitrogenada y grupo fosfato', 'b2': 'fosfodiéster', 'b4': 'adenina y guanina', 'b5': '3', 'b8': 'transferencia',
    'b9': 'ribosómico', 'b13': 'nucleosoma', 'b14': 'interior', 'b16': 'circular, sin histonas', 'c10': 'caperuza en el extremo 5′',
    'c12': 'octámero', 'c14': 'muy condensada', 'c15': 'el adn, porque contiene fósforo', 'd3': 'compatible con un adn bicatenario',
    'd4': 'adn monocatenario', 'd5': 'el adn entra', 'd6': 'y es más rico',
}
for eid, k in CLAVE.items():
    c = checks(EJ[eid])[0]
    cierto('%s: la correcta contiene «%s»' % (eid, k), k.lower() in c['opciones'][c['ok']].lower())
    if eid not in ('b5', 'b14'):
        cierto('%s: ninguna otra contiene «%s»' % (eid, k), all(k.lower() not in o.lower() for i, o in enumerate(c['opciones']) if i != c['ok']))
cierto('b5: C–G = 3 puentes (opción exacta)', checks(EJ['b5'])[0]['opciones'][checks(EJ['b5'])[0]['ok']] == '3')
cierto('d6: más Tm = más G+C', checks(EJ['d6'])[0]['opciones'][checks(EJ['d6'])[0]['ok']].startswith('Y es más rico'))

VF_ESP = {'b3': False, 'b6': True, 'b10': False, 'b15': True, 'c13': True}
for eid, v in VF_ESP.items():
    c = checks(EJ[eid])[0]
    cierto('%s: V/F correcto' % eid, (c['opciones'][c['ok']] == 'Verdadero') == v)
    j = checks(EJ[eid])[1]
    cierto('%s: justificación correcta en la posición 0 y única' % eid, j['ok'] == 0)

EMP = {
    'b11': {'ARNm': 'copia de un gen', 'ARNt': 'aminoácidos', 'ARNr': 'ribosomas'},
    'c11': {'Desoxirribosa': 'ADN', 'Uracilo': 'ARN', 'Doble hélice': 'ADN'},
}
for eid, mapa in EMP.items():
    for c in checks(EJ[eid]):
        k = mapa[c['etiqueta']]
        cierto('%s/%s correcto' % (eid, c['etiqueta']), k.lower() in c['opciones'][c['ok']].lower())
        cierto('%s/%s única' % (eid, c['etiqueta']), sum(k.lower() == o.lower() or (len(k) > 3 and k.lower() in o.lower()) for o in c['opciones']) == 1)
for eid, vals in {'b7': ['ribosa'], 'b12': ['Watson y Crick', 'Crick y Watson', 'Watson and Crick', 'Watson, Crick']}.items():
    cierto('%s: valores aceptados' % eid, EJ[eid]['check']['valores'] == vals)

# ---------------------------------------------------------------- test y «encuentra el error»
for nombre in ('quiz1', 'errores'):
    for p in T['datos'][nombre]['preguntas']:
        cierto('%s: %s… ok en rango y opciones distintas' % (nombre, p['q'][:25]), 0 <= p['ok'] < len(p['op']) and len(set(p['op'])) == len(p['op']))
FALSAS = [
    ('El nucleósido es el nucleótido con el grupo fosfato', 'sin fosfato'),
    ('La timina es una base púrica', 'pirimidínica'),
    ('Las dos hebras son paralelas', 'antiparalelas'),
    ('A + T siempre es igual a G + C', 'depende de la especie'),
    ('Los procariotas tienen nucleosomas', 'no tienen histonas'),
    ('El ARNr transporta los aminoácidos', 'arnt'),
    ('Rompe los enlaces fosfodiéster', 'covalentes'),
]
errs = T['datos']['errores']['preguntas']
cierto('errores: 7 preguntas', len(errs) == 7)
for p, (f, por) in zip(errs, FALSAS):
    cierto('error «%s»: la señalada es la falsa' % f, f.lower() in p['op'][p['ok']].lower())
    cierto('error «%s»: explicación coherente' % f, por.lower() in limpio(p['porque']).lower())
Q = T['datos']['quiz1']['preguntas']
cierto('quiz1: 8 preguntas', len(Q) == 8)
q4 = Q[3]
cierto('quiz1 C 20 % → A 30 %', q4['op'][q4['ok']] == '30 %' and (100 - 2 * 20) / 2 == 30)

# ---------------------------------------------------------------- clasificar, ordenar, emparejar
BASES = {'Adenina': 0, 'Guanina': 0, 'Citosina': 1, 'Timina': 1, 'Uracilo': 1}
for it in T['datos']['bases']['items']:
    cierto('base %s: púrica/pirimidínica' % it['t'], BASES[it['t']] == it['c'])
cierto('bases: 5 elementos', len(T['datos']['bases']['items']) == 5)
RASGOS = {'Desoxirribosa': 0, 'Timina': 0, 'Doble hélice': 0, 'Histonas': 0, 'Ribosa': 1, 'Uracilo': 1, 'Cadena simple': 1, 'Trébol con anticodón': 1}
for it in T['datos']['adnarn']['items']:
    cierto('rasgo %s' % it['t'], RASGOS[it['t']] == it['c'])
o = [i['t'] for i in T['datos']['ordenpoli']['items']]
cierto('orden del fosfodiéster', '3′' in o[0] and '5′' in o[1] and 'reacciona' in o[2] and 'fosfodiéster' in o[3] and 'agua' in o[3] and '5′→3′' in o[4])
o = [i['t'] for i in T['datos']['ordenempaq']['items']]
tam = [int(re.search(r'\((\d+) nm\)', x).group(1)) for x in o if re.search(r'\((\d+) nm\)', x)]
cierto('orden del empaquetamiento: tamaños 2 < 11 (nucleosomas) y el resto en orden', 'Doble hélice' in o[0] and 'nucleosomas' in o[1] and '30 nm' in o[2] and 'Bucles' in o[3] and 'Cromosoma' in o[4])
cierto('tamaños 2, 11, 300, 1400 crecientes', tam == sorted(tam) and tam == [2, 11, 300, 1400])
cierto('emparejar ARN: 5 pares', len(T['datos']['arn']['pares']) == 5 and T['datos']['arn']['pares'][1][0] == 'ARNt' and 'anticodón' in T['datos']['arn']['pares'][1][1])

# ---------------------------------------------------------------- hechos y fechas (ficha y teoría)
def autor(n):
    return [x for x in vz['autores'] if x['n'] == n][0]


FECHAS = {'Miescher': '1869', 'Hershey y Chase': '1952', 'Watson y Crick': '1953'}
for n, f in FECHAS.items():
    cierto('ficha: %s %s' % (n, f), autor(n)['f'] == f)
for f in ('1869', '1928', '1944', '1950', '1952', '1953', '1962', '1958', '1969', '1982', '1983', '1989', '2006'):
    cierto('la teoría cita el año %s' % f, f in teoria_l)
cierto('Nobel 1962 (Watson, Crick, Wilkins) y Franklin fallecida en 1958 coherentes con la cronología', 1953 < 1958 < 1962)
cierto('Hershey–Chase: 32P en ADN y 35S en proteína en teoría y ejercicios', '32p' in teoria_l and '35s' in teoria_l and 'proteínas marcadas con 35s' in teoria_l)
cierto('ribosomas 70S = 50S+30S y 80S = 60S+40S; S no se suma', 50 + 30 != 70 and 60 + 40 != 80 and all(x in teoria_l for x in ('70s', '50s', '30s', '80s', '60s', '40s')))
cierto('%ARN celular 5 + 15 + 80 = 100 (ARNm, ARNt, ARNr)', 5 + 15 + 80 == 100 and '80 %' in teoria_l and '15 %' in teoria_l and '5 %' in teoria_l)
cierto('histonas nucleosoma: 4 tipos × 2 = 8', 4 * 2 == 8 and 'octámero' in teoria_l and 'h2a' in teoria_l)
cierto('146 pb ≈ 1,65 vueltas y ≈ 200 pb por nucleosoma en la teoría', '146' in teoria_l and '1,65' in teoria_l and '200 pb' in teoria_l)
cierto('niveles 2, 11, 30, 300, 700 y 1400 nm en teoría', all(x in teoria_l for x in ('2 nm', '11 nm', '30 nm', '300 nm', '700 nm', '1400 nm')))
cierto('ADN-B: 2 nm, 0,34 nm, 3,4 nm y 10 pb por vuelta en teoría', all(x in teoria_l for x in ('2 nm', '0,34 nm', '3,4 nm', '10 pares de bases por vuelta')))
cierto('2 puentes A–T y 3 C–G en la teoría', 'a–t unidas por 2 puentes' in teoria_l or 'a–t unidas por 2' in teoria_l)
cierto('teoría: Tm 69,3 + 0,41, 85,7 y 93,9', all(x in teoria_l for x in ('69,3 + 0,41', '85,7', '93,9')))
cierto('teoría cita los resultados 2,18 m, 1,564 mm, 32 millones, 7200, 38, 19, 340 nm, 100 vueltas, 20 puentes',
       all(x in teoria_l for x in ('2,18 m', '1,564 mm', '32 millones', '7200', '38', '19', '340 nm', '100 vueltas', '20')))
cierto('teoría: 5′-AUGCCUAAG-3′ y 3′-TAGCCTAG-5′', 'augccuaag' in teoria_l.replace('-', '') and 'tagcctag' in teoria_l.replace('-', ''))
cierto('teoría: Cech 1982, Altman 1983 (ribozimas), Nobel 1989', 'cech' in teoria_l and 'altman' in teoria_l)

# ---------------------------------------------------------------- ficha coherente con la teoría
cierto('ficha: 6 bloques', len(vz['bloques']) == 6)
cierto('ficha: 10 palabras clave', len(vz['claves']) == 10)
cierto('ficha: ≤ 3 frases por bloque', all(len(b['frases']) <= 3 for b in vz['bloques']))
cierto('ficha: frases cortas (≤ 16 palabras)', all(len(limpio(f).split()) <= 16 for b in vz['bloques'] for f in b['frases']))
for b in vz['bloques']:
    if 'tabla' in b:
        cierto('ficha: tabla de 2 columnas en «%s»' % b['t'], all(len(f) == 2 for f in b['tabla']['filas']))
cierto('ficha: ≥ 3 mini-tablas', sum('tabla' in b for b in vz['bloques']) >= 3)
cierto('ficha: 2 y 3 puentes como en la teoría', '2' in [f[1] for f in vz['bloques'][1]['tabla']['filas']] and '3' in [f[1] for f in vz['bloques'][1]['tabla']['filas']])
cierto('ficha: medidas 2 nm, 0,34 nm, 10 pb como en la teoría', all(x in vz_txt for x in ('2 nm', '0,34 nm', '10 pb')))
cierto('ficha: 146 pb, H2A, H2B, H3, H4 y 30 nm como en la teoría', all(x in vz_txt for x in ('146', 'h2a', 'h2b', 'h3', 'h4', '30 nm')))
cierto('ficha: 360 000 coincide con 2,176 m / 6 µm', '360 000' in vz_txt and '360 000' in teoria_l)
cierto('ficha: ≈ 2 m de ADN y 6 µm como la teoría', '2 m' in vz_txt and '6 µm' in vz_txt and '6 µm' in teoria_l)
cierto('ficha: púricas A, G y pirimidínicas C, T, U', vz['bloques'][0]['tabla']['filas'][0] == ['A, G', 'C, T, U'])
cierto('ficha: ADN A, G, C, T y ARN A, G, C, U', ['A, G, C, T', 'A, G, C, U'] in vz['bloques'][5]['tabla']['filas'])
cierto('ficha conecta con Biología T1, T11, T12 y Química II', all(any(x in c['con'] for c in vz['conecta']) for x in ('Biología T1', 'Biología T11', 'Biología T12', 'Química II')))
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
cierto('lámina con ≥ 4 elementos', len(T['lamina']) >= 4)
cierto('resumen con ≥ 4 ideas', len(T['resumen']) >= 4)
cierto('tarjetas ≥ 14', len(T['datos']['tarjetas1']['cartas']) >= 14)

if fallos:
    print('FALLOS:')
    for f in fallos:
        print('  -', f)
print('%d comprobaciones correctas, %d fallos' % (ok, len(fallos)))
sys.exit(1 if fallos else 0)
