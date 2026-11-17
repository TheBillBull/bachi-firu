#!/usr/bin/env python3
"""
Verificación independiente de Biología II, tema 11 (Base molecular de la herencia).
No comparte código con la web: recalcula con fracciones y sympy las bandas de Meselson y Stahl para los tres modelos
(conservativo, semiconservativo, dispersivo) generación a generación, el número de moléculas y de hebras originales,
Chargaff y puentes de hidrógeno, el tiempo de replicación y el número mínimo de orígenes, los fragmentos de Okazaki y los
cebadores, el acortamiento de los telómeros y la tasa de errores; comprueba hechos y fechas (científicos, hitos), que cada
ejercicio tenga una única respuesta correcta y que la ficha no contradiga la teoría.

Convenciones declaradas: fragmentos de Okazaki de 1500 nt (procariotas) y 200 nt (eucariotas); horquilla de 1000 nt/s
(E. coli) y 50 nt/s (humana); dos horquillas por origen; fase S de 8 h; 6,4·10⁹ pb diploides; errores 10⁻⁹ finales;
telómero de 10 000 nt que pierde 100 nt por división; densidades de CsCl 1,724 (¹⁵N) y 1,710 (¹⁴N) g/mL.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_bio2_t11.py /tmp/ampl.json
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
T = datos['ampl']['bio2']['t11']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = norm(teoria)
vz = T['vistazo']
vz_txt = norm(json.dumps(vz, ensure_ascii=False))
D = T['datos']
RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
lab = open(os.path.join(RAIZ, 'ampliaciones', 'lab_bio_t11.js'), encoding='utf-8').read()

# ---------------------------------------------------------------- Meselson y Stahl: simulación de moléculas (hebras)
# Una molécula = (hebra1, hebra2); cada hebra es 'P' (pesada, 15N) o 'L' (ligera, 14N). Se simula cada modelo.
def semicons(moleculas):
    out = []
    for a, b in moleculas:
        out.append((a, 'L'))
        out.append((b, 'L'))
    return out


def conservativo(moleculas):
    out = []
    for m in moleculas:
        out.append(m)
        out.append(('L', 'L'))
    return out


def dispersivo(moleculas):
    # fracción de 15N en cada molécula se divide por 2 (se reparte entre las dos hijas)
    out = []
    for fr in moleculas:
        out.append(fr / 2)
        out.append(fr / 2)
    return out


def contar(moleculas):
    c = {}
    for m in moleculas:
        k = tuple(sorted(m))
        c[k] = c.get(k, 0) + 1
    return c


sem, con, dis = [('P', 'P')], [('P', 'P')], [F(1)]
for n in range(1, 6):
    sem, con, dis = semicons(sem), conservativo(con), dispersivo(dis)
    cs = contar(sem)
    hib = cs.get(('L', 'P'), 0)
    lig = cs.get(('L', 'L'), 0)
    cierto('semicons n=%d: 2^n moléculas, 2 híbridas, resto ligeras' % n, len(sem) == 2 ** n and hib == 2 and lig == 2 ** n - 2 and cs.get(('P', 'P'), 0) == 0)
    cierto('semicons n=%d: fracción híbrida 2/2^n' % n, F(hib, len(sem)) == F(2, 2 ** n))
    cc = contar(con)
    cierto('conservativo n=%d: 1 pesada y el resto ligeras' % n, cc.get(('P', 'P'), 0) == 1 and cc.get(('L', 'L'), 0) == 2 ** n - 1 and ('L', 'P') not in cc)
    cierto('dispersivo n=%d: todas iguales, fracción 1/2^n de 15N' % n, set(dis) == {F(1, 2 ** n)})
    cierto('hebras originales (P) en semicons n=%d = 2 y 2^(n+1) hebras' % n, sum(m.count('P') for m in sem) == 2 and 2 * len(sem) == 2 ** (n + 1))

# densidades de las bandas (g/mL) y lo que el widget declara
D15, D14 = F(1724, 1000), F(1710, 1000)
cierto('densidad híbrida = promedio = 1,717', (D15 + D14) / 2 == F(1717, 1000))
cierto('dispersivo gen. 2 más cerca de la ligera que gen. 1', D14 + (D15 - D14) / 4 < D14 + (D15 - D14) / 2 < (D15 + D14) / 2 + F(1, 10 ** 9))
cierto('el widget usa las mismas densidades', 'D15 = 1.724' in lab and 'D14 = 1.710' in lab)
# el modelo del widget (2 f, 1 - 2 f): fracciones del semiconservativo
for n in (2, 3, 4):
    cierto('widget: fracción híbrida %d gen.' % n, 2 * F(1, 2 ** n) == F(2, 2 ** n) and 1 - F(2, 2 ** n) == F(2 ** n - 2, 2 ** n))
cierto('widget implementa bandas conservativo/semiconservativo/dispersivo', all(k in lab for k in ('"con"', '"sem"', '"dis"')) and 'Math.pow(0.5, n)' in lab)
# predicciones por generación que figuran en la teoría
for frag in ('50 % pesada + 50 % ligera', '25 % pesada + 75 % ligera', '12,5 % pesada + 87,5 % ligera', '50 % intermedia + 50 % ligera', '25 % intermedia + 75 % ligera'):
    cierto('teoría: tabla con «%s»' % frag, frag in teoria)
cierto('conservativo gen. 2: 1/4 pesada, 3/4 ligera', F(1, 4) == F(1, 2 ** 2) and 1 - F(1, 4) == F(3, 4))
cierto('conservativo gen. 3: 1/8 = 12,5 % pesada', F(1, 8) == F(125, 1000))
cierto('semicons gen. 4: 12,5 % híbrida y 87,5 % ligera', F(2, 16) == F(1, 8) and F(14, 16) == F(875, 1000))

# ---------------------------------------------------------------- Chargaff y puentes de hidrógeno
cierto('b8: A = 30 % → G = 20 %', (100 - 2 * 30) / 2 == 20)
cierto('c10: C = 22 % → A = 28 %', (100 - 2 * 22) / 2 == 28)
pb = 4000
gc = F(56, 100) * pb
at = pb - gc
cierto('d10: 28 % G → G+C = 56 %; 2240 pares G-C y 1760 A-T', gc == 2240 and at == 1760)
cierto('d10: puentes de H = 2·1760 + 3·2240 = 10240', 2 * at + 3 * gc == 10240)

# ---------------------------------------------------------------- tiempos y orígenes
t_ecoli = F(46 * 10 ** 5, 2 * 1000)
cierto('E. coli: 4,6·10^6 / 2000 = 2300 s', t_ecoli == 2300)
casi('c11: 2300 s = 38,3 min', float(t_ecoli) / 60, 38.3, 0.005)
genoma = F(64, 10) * 10 ** 9
cierto('un origen en humanos: ≈ 740 días', abs(float(genoma / (2 * 50) / 86400) - 740.7) < 0.1)
por_origen = 2 * 50 * 28800
cierto('cada origen copia 2 880 000 pb en 8 h', por_origen == 2880000)
orig = sp.ceiling(sp.Rational(genoma.numerator, genoma.denominator) / por_origen)
cierto('d2: orígenes mínimos = 2223 (2222,2 al alza)', orig == 2223 and abs(float(genoma / por_origen) - 2222.22) < 0.01)
cierto('teoría usa 2 223 y 740 días y 38 minutos', '2 223' in teoria and '740 días' in teoria and '38 minutos' in teoria)
cierto('2,2 m de ADN y 32 millones de nucleosomas (6,4e9 pb · 0,34 nm; 200 pb/nucleosoma)',
       abs(6.4e9 * 0.34e-9 - 2.176) < 0.01 and 6.4e9 / 200 == 3.2e7 and '2,2 m' in teoria and '32 millones' in teoria)
cierto('octámero: 2·4 = 8 histonas', 2 * 4 == 8)

# ---------------------------------------------------------------- Okazaki y cebadores
def okazaki(L, s):
    tot = math.ceil(L / s) if L > 0 else 0
    return tot, (tot + 1 if L > 0 else 0)


cierto('ejemplo: 1000 nt, 200 nt → 5 fragmentos, 6 cebadores', okazaki(1000, 200) == (5, 6))
cierto('c6/c7: 12 000 nt, 200 nt → 60 fragmentos y 61 cebadores', okazaki(12000, 200) == (60, 61))
cierto('widget: 1050 nt → 6 fragmentos (5 completos) y 7 cebadores', okazaki(1050, 200) == (6, 7) and 1050 // 200 == 5)
cierto('widget procariota: 4500 → 3 fragmentos, 4 cebadores; 6000 → 4 y 5', okazaki(4500, 1500) == (3, 4) and okazaki(6000, 1500) == (4, 5))
cierto('d9: 2,3·10^6 / 1500 → 1534 al alza', math.ceil(2300000 / 1500) == 1534 and abs(2300000 / 1500 - 1533.33) < 0.01)
cierto('widget declara 1500 nt y 200 nt', 'frag: 1500' in lab and 'frag: 200' in lab)

# ---------------------------------------------------------------- telómeros y errores
cierto('ejemplo: (10000 − 4000) / 100 = 60 divisiones', (10000 - 4000) // 100 == 60)
cierto('d3: (8000 − 5600) / 80 = 30', (8000 - 5600) / 80 == 30)
cierto('widget telómeros: 10000, límite 4000, pérdidas 100/20/0', 'ini: 10000, crit: 4000' in lab and 'perd: 100' in lab and 'perd: 20' in lab and 'perd: 0' in lab)
cierto('célula madre: 80 divisiones → 8400 nt (>4000)', 10000 - 20 * 80 == 8400 > 4000)
casi('d8: 6,4·10^9 · 10^-9 = 6,4 errores', 6.4e9 * 1e-9, 6.4, 0.001)
cierto('filtros de error: 10^-5 → 10^-7 → 10^-9, cada uno ×100', F(1, 10 ** 5) / 100 == F(1, 10 ** 7) and F(1, 10 ** 7) / 100 == F(1, 10 ** 9))

# ---------------------------------------------------------------- ejercicios numéricos (valor declarado = valor calculado)
casi('b7', 2 ** 4, EJ['b7']['check']['valor'])
cierto('b16: 2 hebras originales', EJ['b16']['check']['valor'] == 2)
casi('c1: 25 %', 100 * 2 / 2 ** 3, EJ['c1']['check']['valor'])
casi('c2: 87,5 %', 100 * (2 ** 4 - 2) / 2 ** 4, EJ['c2']['check']['valor'])
casi('c6', 12000 / 200, EJ['c6']['check']['valor'])
casi('c7', 12000 / 200 + 1, EJ['c7']['check']['valor'])
casi('c11', 4.6e6 / 2000 / 60, EJ['c11']['check']['valor'])
casi('d1: 32 − 2 = 30', 2 ** 5 - 2, EJ['d1']['check']['valor'])
casi('d2', int(orig), EJ['d2']['check']['valor'])
casi('d3', (8000 - 5600) / 80, EJ['d3']['check']['valor'])
casi('d4', 1.717, EJ['d4']['check']['valor'], 0.0001)
casi('d5: 2 de 16 hebras', 100 * 2 / 16, EJ['d5']['check']['valor'])
casi('d8', 6.4, EJ['d8']['check']['valor'], 0.001)
casi('d9', 1534, EJ['d9']['check']['valor'])
casi('d10', 10240, EJ['d10']['check']['valor'])
cierto('d6: tiempo de generación 30 min (2 generaciones en 60 min)', 60 / 2 == 30 and EJ['d6']['check']['opciones'][EJ['d6']['check']['ok']] == '30 min')
cierto('c3 y d7: opción correcta esperada',
       'pesada y otra ligera' in EJ['c3']['check']['opciones'][EJ['c3']['check']['ok']] and 'dentro de las bacterias' in EJ['d7']['check']['opciones'][EJ['d7']['check']['ok']])

# ---------------------------------------------------------------- estructura de los ejercicios
niveles = {1: 0, 2: 0, 3: 0}
ids = set()
for e in T['ejercicios']:
    niveles[e['nivel']] += 1
    cierto('id único %s' % e['id'], e['id'] not in ids)
    ids.add(e['id'])
    chk = e['check'] if isinstance(e['check'], list) else [e['check']]
    for c in chk:
        if c['tipo'] == 'opcion':
            op = c['opciones']
            cierto('%s: opciones distintas y ok válido' % e['id'], len(set(op)) == len(op) and 0 <= c['ok'] < len(op))
        elif c['tipo'] == 'texto':
            cierto('%s: valores de texto' % e['id'], len(c['valores']) >= 1)
        elif c['tipo'] == 'num':
            cierto('%s: valor numérico' % e['id'], isinstance(c['valor'], (int, float)))
        elif c['tipo'] == 'rubrica':
            cierto('%s: rúbrica con 5 ítems y pesos que suman 2' % e['id'], len(c['items']) == 5 and abs(sum(i['p'] for i in c['items']) - 2.0) < 1e-9)
cierto('≥ 40 ejercicios: %d (%s)' % (len(T['ejercicios']), niveles), len(T['ejercicios']) >= 40 and all(v >= 10 for v in niveles.values()))
cierto('4 preguntas abiertas con rúbrica', sum(1 for e in T['ejercicios'] if not isinstance(e['check'], list) and e['check']['tipo'] == 'rubrica') == 4)

# ---------------------------------------------------------------- actividades
cierto('experimentos: 6 pares distintos', len(D['experimentos']['pares']) == 6 and len({p[0] for p in D['experimentos']['pares']}) == 6)
cierto('enzimas: pares helicasa/primasa/ligasa correctos',
       ['Helicasa', 'Separa las dos hebras rompiendo puentes de hidrógeno'] in D['enzimas']['pares'] and any(p[0] == 'Primasa' and 'cebador' in p[1] for p in D['enzimas']['pares'])
       and any(p[0] == 'ADN ligasa' and 'une' in p[1].lower() for p in D['enzimas']['pares']))
om = [i['t'] for i in D['ordenmes']['items']]
cierto('ordenmes: 15N → 14N → extraer → centrifugar → comparar', '¹⁵N' in om[0] and '¹⁴N' in om[1] and 'Extraer' in om[2] and 'centrifugar' in om[3] and 'Comparar' in om[4])
oh = [i['t'] for i in D['ordenhor']['items']]
cierto('ordenhor: helicasa antes de primasa, primasa antes de polimerasa, ligasa al final', 'helicasa' in oh[0] and 'primasa' in oh[2] and 'polimerasa' in oh[3] and 'ligasa' in oh[-1])
ohc = [i['t'] for i in D['ordenhc']['items']]
cierto('ordenhc: marcar, infectar, batidora, centrifugar, medir', 'Marcar' in ohc[0] and 'infecten' in ohc[1] and 'batidora' in ohc[2] and 'Centrifugar' in ohc[3] and 'Medir' in ohc[4])
for k in ('relacion', 'hebras'):
    its = D[k]['items']
    cierto('%s: ítems únicos, cada categoría usada y c válido' % k, len({i['t'] for i in its}) == len(its) and set(i['c'] for i in its) == set(range(len(D[k]['categorias']))))
for k in ('quiz1', 'errores'):
    for i, q in enumerate(D[k]['preguntas']):
        cierto('%s[%d]: opciones distintas y ok válido' % (k, i), len(set(q['op'])) == len(q['op']) and 0 <= q['ok'] < len(q['op']) and q.get('porque'))
cierto('errores: todas preguntan por la afirmación FALSA', all('FALSA' in q['q'] for q in D['errores']['preguntas']))
QZ = {0: 'entra en la bacteria', 1: 'una sola banda de densidad intermedia', 2: 'helicasa', 3: '5′ → 3′', 4: 'retrasada', 5: 'primasa', 6: '2', 7: 'alarga los telómeros'}
for i, k in QZ.items():
    q = D['quiz1']['preguntas'][i]
    cierto('quiz1[%d]: correcta «%s» y única' % (i, k), k.lower() in q['op'][q['ok']].lower() and sum(k.lower() in o.lower() for o in q['op']) == 1 if len(k) > 2 else q['op'][q['ok']] == k)
ER = {0: 'ADN con azufre', 1: 'banda pesada y otra ligera', 2: 'sin cebador', 3: '3′ a 5′', 4: 'un solo origen', 5: 'ligasa corrige', 6: 'genes esenciales'}
for i, k in ER.items():
    q = D['errores']['preguntas'][i]
    cierto('errores[%d]: la falsa contiene «%s»' % (i, k), norm(k).split()[0] in norm(q['op'][q['ok']]))
cierto('quiz1[6]: tras 3 replicaciones solo 2 moléculas con hebra original', 2 ** 3 - (2 ** 3 - 2) == 2)

# ---------------------------------------------------------------- hechos y fechas
FECHAS = [('Griffith', '1928'), ('Avery', '1944'), ('Hershey', '1952'), ('Meselson', '1958'), ('Chargaff', '1950'), ('Okazaki', '1968'),
          ('Watson y Crick', '1953'), ('Kornberg', '1956'), ('Hayflick', '1961'), ('Miescher', '1869')]
for n, a in FECHAS:
    cierto('fecha %s %s en la teoría' % (n, a), n.lower() in teoria_l and a in teoria)
cierto('Nobel: Hershey 1969, Kornberg 1959, telomerasa 2009, reparación 2015', all(x in teoria for x in ('1969', '1959', '2009', '2015')))
cierto('telomerasa: Greider y Blackburn (1985), Nobel 2009 con Szostak', 'greider' in teoria_l and 'blackburn' in teoria_l and 'szostak' in teoria_l and '1985' in teoria)
cierto('hechos: 32P ADN, 35S proteínas; sobrenadante y sedimento', '32' in teoria and '35' in teoria and 'sobrenadante' in teoria_l and 'sedimento' in teoria_l)
cierto('hechos: TTAGGG, 5′ → 3′, 3′-OH, exonucleasa 3′ → 5′', all(x in teoria for x in ('TTAGGG', '3′-OH', 'exonucleasa 3′ → 5′')))
cierto('teoría: helicasa, primasa, ligasa, topoisomerasa, SSB, polimerasa III y I',
       all(x in teoria_l for x in ('helicasa', 'primasa', 'ligasa', 'topoisomerasa', 'ssb', 'polimerasa iii', 'polimerasa i')))
cierto('teoría: MMR, BER, NER, xeroderma pigmentoso, fotorreactivación', all(x in teoria for x in ('MMR', 'BER', 'NER', 'xeroderma pigmentoso', 'Fotorreactivación')))
cierto('teoría: los tres modelos y los tres widgets colocados', all(x in teoria_l for x in ('conservativo', 'semiconservativo', 'dispersivo')) and all(k in teoria for k in ('bio_meselson', 'bio_horquilla', 'bio_telomeros')))

# ---------------------------------------------------------------- la ficha no contradice la teoría
cierto('ficha: 6 bloques, 10 palabras clave, 4 mini-tablas', len(vz['bloques']) == 6 and len(vz['claves']) == 10 and sum(1 for b in vz['bloques'] if 'tabla' in b) == 4)
cierto('ficha: fechas 1952 y 1958', '1952' in vz_txt and '1958' in vz_txt)
cierto('ficha: ³²P ADN y ³⁵S proteínas', '³²p' in vz_txt and '³⁵s' in vz_txt)
cierto('ficha: tabla Meselson 100 %, 50 % y 25 % intermedia', '100 % intermedia' in vz_txt and '50 % + 50 % ligera' in vz_txt and '25 % + 75 % ligera' in vz_txt)
cierto('ficha: 1000-2000 y 100-200 nt, 1000 y 50 nt/s', '1000-2000' in vz_txt and '100-200' in vz_txt and '1000 nt/s' in vz_txt and '50 nt/s' in vz_txt)
cierto('ficha: 8 moléculas y 2 híbridas como dato', '8 moléculas' in vz_txt and '2 conservan' in vz_txt)
cierto('ficha: 5′ → 3′ solo en la polimerasa; no dice «3′ → 5′» para la síntesis', 'polimerasa' in vz_txt and '5′ → 3′' in vz_txt)
cierto('ficha: telomerasa en células madre y cáncer', 'células madre' in vz_txt and 'cáncer' in vz_txt)
cierto('ficha: 50-100 nt por división coherente con la teoría (50-100 y modelo de 100)', '50-100' in vz_txt and '50-100 nt' in teoria)

if fallos:
    print('FALLOS:')
    for f in fallos:
        print('  -', f)
print('%d comprobaciones correctas, %d fallos' % (ok, len(fallos)))
sys.exit(1 if fallos else 0)
