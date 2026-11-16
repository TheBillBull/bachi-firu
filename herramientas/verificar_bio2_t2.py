#!/usr/bin/env python3
"""
Verificación independiente de Biología, tema 2 (Glúcidos).
Todo se recalcula aquí con fracciones/sympy y con hechos escritos en este archivo (no se comparte código con la web):
masas molares y condensación/hidrólisis, carbonos asimétricos y estereoisómeros (2^n) a partir de las proyecciones de Fischer,
anillos (piranosa/furanosa), poder reductor según los carbonos anoméricos del enlace, ramificaciones, energía, fechas,
cada ejercicio de opción con UNA respuesta correcta que coincide con los hechos, rúbricas, datos de actividades,
datos de los widgets (lab_bio_t2.js) y coherencia de la ficha con la teoría.

Convenio de masas: C = 12, H = 1, O = 16 (el mismo que usan los ejercicios). Energía: 1 g de glúcido ≈ 4 kcal.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_bio2_t2.py /tmp/ampl.json
"""
import json, os, re, subprocess, sys
from fractions import Fraction as Q
import sympy as sp

ok, fallos = 0, []


def cierto(nombre, cond):
    global ok
    if cond:
        ok += 1
    else:
        fallos.append(nombre)


def comp(nombre, calc, dado, tol=1e-6):
    cierto(f'{nombre}: calculado {float(calc):.6g} vs web {dado}', abs(float(calc) - float(dado)) <= tol * max(abs(float(dado)), 1e-12))


def limpio(s):
    return re.sub(r'<[^>]+>', '', s)


# ---------------------------------------------------------------- química básica (parser de fórmulas, masas)
MASA = {'C': 12, 'H': 1, 'O': 16}
SUB = str.maketrans('₀₁₂₃₄₅₆₇₈₉', '0123456789')


def formula(f):
    f = f.translate(SUB)
    c = {}
    for el, n in re.findall(r'([A-Z])(\d*)', f):
        c[el] = c.get(el, 0) + int(n or 1)
    return c


def masa(f):
    return sum(MASA[e] * n for e, n in formula(f).items())


def suma(a, b):
    return {e: a.get(e, 0) + b.get(e, 0) for e in set(a) | set(b)}


def resta(a, b):
    return {e: a.get(e, 0) - b.get(e, 0) for e in set(a) | set(b)}


H2O = formula('H2O')
GLU = formula('C6H12O6')
cierto('glucosa: fórmula C6H12O6 = C6(H2O)6', GLU == {'C': 6, 'H': 12, 'O': 6} and GLU['H'] == 2 * GLU['O'])
cierto('desoxirribosa C5H10O4: una O menos que la ribosa C5H10O5', resta(formula('C5H10O5'), formula('C5H10O4')) == {'C': 0, 'H': 0, 'O': 1})
cierto('ribosa y glucosa cumplen Cn(H2O)n', all(formula(f)['H'] == 2 * formula(f)['O'] == 2 * formula(f)['C'] for f in ('C5H10O5', 'C6H12O6')))
DISAC = resta(suma(GLU, GLU), H2O)
cierto('condensación de 2 hexosas = C12H22O11', DISAC == formula('C12H22O11'))
cierto('masa glucosa 180, agua 18, disacárido 342 = 2·180 − 18', (masa('C6H12O6'), masa('H2O'), masa('C12H22O11')) == (180, 18, 342) and 2 * 180 - 18 == 342)
cierto('el disacárido NO es C12H24O12', DISAC != formula('C12H24O12'))
cierto('hidrólisis de la sacarosa conserva la masa: 342 + 18 = 2·180', masa('C12H22O11') + masa('H2O') == 2 * masa('C6H12O6'))
cierto('residuo de polisacárido C6H10O5 = 162 = 180 − 18', masa('C6H10O5') == 162 == 180 - 18)

# ---------------------------------------------------------------- Fischer: carbonos asimétricos y estereoisómeros
# R/L = lado del OH en cada carbono de la cadena (None = no asimétrico). Escrito a mano desde los libros.
FISCHER = {
    'glu': dict(n=6, ald=True, cad=[None, 'R', 'L', 'R', 'R', None], form='C6H12O6'),
    'gal': dict(n=6, ald=True, cad=[None, 'R', 'L', 'L', 'R', None], form='C6H12O6'),
    'man': dict(n=6, ald=True, cad=[None, 'L', 'L', 'R', 'R', None], form='C6H12O6'),
    'fru': dict(n=6, ald=False, cad=[None, None, 'L', 'R', 'R', None], form='C6H12O6'),
    'rib': dict(n=5, ald=True, cad=[None, 'R', 'R', 'R', None], form='C5H10O5'),
    'des': dict(n=5, ald=True, cad=[None, None, 'R', 'R', None], form='C5H10O4'),
}


def nast(k):
    return sum(1 for x in FISCHER[k]['cad'] if x)


def serie(k):
    ult = [x for x in FISCHER[k]['cad'] if x][-1]      # asimétrico más lejano del carbonilo
    return 'D' if ult == 'R' else 'L'


def enant(k):
    return [None if x is None else ('L' if x == 'R' else 'R') for x in FISCHER[k]['cad']]


cierto('C* glucosa 4, galactosa 4, fructosa 3, ribosa 3, desoxirribosa 2', [nast(k) for k in ('glu', 'gal', 'fru', 'rib', 'des')] == [4, 4, 3, 3, 2])
cierto('estereoisómeros 2^n: glucosa 16, fructosa 8, forma cíclica de la glucosa 2^5 = 32', (2 ** nast('glu'), 2 ** nast('fru'), 2 ** (nast('glu') + 1)) == (16, 8, 32))
cierto('todas son de la serie D', all(serie(k) == 'D' for k in FISCHER))
cierto('L-glucosa es enantiómero: todos los OH al revés y serie L', all((a is None and b is None) or a != b for a, b in zip(FISCHER['glu']['cad'], enant('glu'))) and [x for x in enant('glu') if x][-1] == 'L')
dif = lambda a, b: [i + 1 for i, (x, y) in enumerate(zip(FISCHER[a]['cad'], FISCHER[b]['cad'])) if x != y]
cierto('glucosa y galactosa: epímeros en C4', dif('glu', 'gal') == [4])
cierto('glucosa y manosa: epímeros en C2', dif('glu', 'man') == [2])
cierto('glucosa y fructosa: misma fórmula y distinto grupo (isómeros de función)', FISCHER['glu']['form'] == FISCHER['fru']['form'] and FISCHER['glu']['ald'] != FISCHER['fru']['ald'])
cierto('desoxirribosa = ribosa sin el OH del C2', FISCHER['rib']['cad'][1] == 'R' and FISCHER['des']['cad'][1] is None and FISCHER['rib']['cad'][2:] == FISCHER['des']['cad'][2:])
# anillo: carbono anomérico = el del carbonilo; el anillo se cierra con el OH del C5 (hexosas) o del C4 (pentosas)
ANOM = {'glu': 1, 'gal': 1, 'fru': 2, 'rib': 1, 'des': 1}
CIERRE = {'glu': 5, 'gal': 5, 'fru': 5, 'rib': 4, 'des': 4}
lados = lambda k: CIERRE[k] - ANOM[k] + 2        # carbonos del anillo + el oxígeno
cierto('anillos: glucosa piranosa (6), fructosa, ribosa y desoxirribosa furanosa (5)', [lados(k) for k in ('glu', 'gal', 'fru', 'rib', 'des')] == [6, 6, 5, 5, 5])
cierto('el carbono anomérico es el del carbonilo: C1 en las aldosas, C2 en la fructosa', all((ANOM[k] == 1) == FISCHER[k]['ald'] for k in ANOM))
# traducción Fischer → Haworth: derecha = abajo, izquierda = arriba (serie D)
cierto('Haworth de la glucosa: C2 abajo, C3 arriba, C4 abajo', ['abajo' if FISCHER['glu']['cad'][i] == 'R' else 'arriba' for i in (1, 2, 3)] == ['abajo', 'arriba', 'abajo'])

# ---------------------------------------------------------------- disacáridos: poder reductor según carbonos anoméricos del enlace
# (azúcar 1, carbono 1, azúcar 2, carbono 2). Reductor si queda ≥ 1 carbono anomérico libre (no participa en el enlace).
DIS = {
    'Maltosa': ('glu', 1, 'glu', 4), 'Celobiosa': ('glu', 1, 'glu', 4), 'Lactosa': ('gal', 1, 'glu', 4), 'Sacarosa': ('glu', 1, 'fru', 2),
}
anom_en_enlace = lambda d: (d[1] == ANOM[d[0]]) + (d[3] == ANOM[d[2]])
REDUCTOR = {n: anom_en_enlace(d) < 2 for n, d in DIS.items()}
cierto('reductores: maltosa, celobiosa y lactosa sí; sacarosa no', REDUCTOR == {'Maltosa': True, 'Celobiosa': True, 'Lactosa': True, 'Sacarosa': False})
cierto('enlace monocarbonílico (1 anomérico) en maltosa, celobiosa y lactosa; dicarbonílico (2) en sacarosa', [anom_en_enlace(DIS[n]) for n in ('Maltosa', 'Celobiosa', 'Lactosa', 'Sacarosa')] == [1, 1, 1, 2])

# ---------------------------------------------------------------- cargar datos de la web
ruta = sys.argv[1] if len(sys.argv) > 1 else None
if not ruta or not os.path.exists(ruta):
    raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    ruta = os.path.join(os.environ.get('TMPDIR', '/tmp'), 'ampl_bio2_t2.json')
    with open(ruta, 'w') as f:
        subprocess.run(['node', os.path.join(raiz, 'herramientas', 'volcar_ampliaciones.js')], stdout=f, check=True)
datos = json.load(open(ruta))
T = datos['ampl']['bio2']['t2']
EJ = {e['id']: e for e in T['ejercicios']}
D = T['datos']
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# ---------------------------------------------------------------- datos de los widgets (lab_bio_t2.js) frente a los hechos de arriba
raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
lab = open(os.path.join(raiz, 'ampliaciones', 'lab_bio_t2.js'), encoding='utf-8').read()
for k, d in FISCHER.items():
    m = re.search(r'\{ k: "%s", t: "[^"]+", tipo: "([^"]+)", n: (\d), f: "([^"]+)", fis: \[([^\]]+)\], cierre: (\d)(?:, ani: (\d))?' % k, lab)
    if k == 'man':
        continue
    cierto(f'widget: azúcar {k} presente', m is not None)
    if not m:
        continue
    tipo, n, f, fis, cierre, ani = m.groups()
    cadena = [x.strip().strip('"') for x in fis.split(',')]
    lados_w = [x if x in ('R', 'L') else None for x in cadena]
    cierto(f'widget {k}: cadena de Fischer coincide con los libros', lados_w == d['cad'] and len(cadena) == d['n'] == int(n))
    cierto(f'widget {k}: fórmula {d["form"]}', f.translate(SUB) == d['form'])
    cierto(f'widget {k}: cierre de anillo en C{CIERRE[k]} y carbono anomérico C{ANOM[k]}', int(cierre) == CIERRE[k] and (int(ani) if ani else 1) == ANOM[k])
    cierto(f'widget {k}: aldosa/cetosa en el nombre del tipo', ('aldo' in tipo) == d['ald'] and ('ceto' in tipo) != d['ald'])
# tabla de disacáridos del widget
for nom, d in DIS.items():
    m = re.search(r'n: "%s", e: "([^"]+)", d: "[^"]+", red: (true|false), c1: (\d), c2: (\d)' % nom, lab)
    cierto(f'widget disac {nom}: presente', m is not None)
    if m:
        cierto(f'widget disac {nom}: reductor {REDUCTOR[nom]} y carbonos {d[1]},{d[3]}', (m.group(2) == 'true') == REDUCTOR[nom] and (int(m.group(3)), int(m.group(4))) == (d[1], d[3]))
# muestras del laboratorio: Fehling positivo si hay azúcar reductor libre; Lugol si hay almidón
MUESTRAS = {'glu': (True, 0), 'fru': (True, 0), 'lac': (True, 0), 'sac': (False, 0), 'almi': (False, 1), 'cel': (False, 0), 'sach': (True, 0)}
for k, (fe, lu) in MUESTRAS.items():
    m = re.search(r'\{ k: "%s", t: "[^"]+", fe: (true|false), lu: (\d)' % k, lab)
    cierto(f'widget lab {k}: Fehling {fe} y Lugol {lu}', bool(m) and (m.group(1) == 'true') == fe and int(m.group(2)) == lu)
cierto('Fehling: lactosa reduce y sacarosa no (coherente con la tabla de disacáridos)', MUESTRAS['lac'][0] == REDUCTOR['Lactosa'] and MUESTRAS['sac'][0] == REDUCTOR['Sacarosa'])
cierto('sacarosa hidrolizada = glucosa + fructosa, ambas reductoras', MUESTRAS['sach'][0] and MUESTRAS['glu'][0] and MUESTRAS['fru'][0])

# ---------------------------------------------------------------- cifras de los ejemplos resueltos de la teoría
n_sac = Q(171, masa('C12H22O11'))
cierto('ejemplo sacarosa 171 g = 0,50 mol; agua 9 g; glucosa y fructosa 90 g y la masa se conserva',
       n_sac == Q(1, 2) and n_sac * 18 == 9 and n_sac * 180 == 90 and 171 + 9 == 90 + 90)
cierto('teoría: 342 g/mol, 0,50 mol, 9 g y 90 g presentes', all(x in limpio(teoria) for x in ('342 g/mol', '0,50 mol', '9 g', '90 g')))
cierto('ejemplo estereoisómeros: 16, 32 y 8 en la teoría', all(x in limpio(teoria) for x in ('= <b>16' .replace('<b>', ''), '= 32', '= 8')))
nramas = 3000 // 20
cierto('ejemplo amilopectina: 2999 aguas, 150 α(1→6), 2849 α(1→4), 3000·162 ≈ 4,9·10^5',
       (3000 - 1, nramas, 3000 - 1 - nramas) == (2999, 150, 2849) and abs(3000 * 162 - 4.9e5) / 4.9e5 < 0.01)
cierto('teoría: 2999, 150 y 2849 presentes', all(x in limpio(teoria) for x in ('2999', '150 enlaces', '2849')))
cierto('ejemplo etiqueta del yogur: 12 g · 4 = 48 kcal', 12 * 4 == 48 and '48 kcal' in limpio(teoria))
cierto('ejemplo PAU: sacarosa 180 + 180 − 18 = 342 y 4 apartados', '342 g/mol' in limpio(teoria) and all(x in teoria for x in ('<b>a)</b>', '<b>b)</b>', '<b>c)</b>', '<b>d)</b>')))

# ---------------------------------------------------------------- ejercicios numéricos (valor de la web = valor recalculado)
def num(i, k=0):
    c = EJ[i]['check']
    c = c if isinstance(c, list) else [c]
    return c[k]['valor']


comp('b13 masa glucosa', masa('C6H12O6'), num('b13'))
comp('b14 moles en 90 g', Q(90, 180), num('b14'))
comp('c1 masa sacarosa', masa('C12H22O11'), num('c1'))
comp('c2 glucosa de 171 g de sacarosa', Q(171, 342) * 180, num('c2'))
comp('c3 C* glucosa', nast('glu'), num('c3'))
comp('c4 estereoisómeros glucosa', 2 ** nast('glu'), num('c4'))
comp('c5 estereoisómeros fructosa', 2 ** nast('fru'), num('c5'))
comp('c6 aguas en 500 glucosas', 500 - 1, num('c6'))
comp('c7 masa de 100 glucosas', 100 * 180 - 99 * 18, num('c7'))
comp('c14 energía de 25 g', 25 * 4, num('c14'))
comp('d1 α(1→6)', 3000 // 20, num('d1', 0))
comp('d1 α(1→4)', 3000 - 1 - 3000 // 20, num('d1', 1))
comp('d2 ramas', 12000 // 10, num('d2', 0))
comp('d2 aguas', 12000 - 1, num('d2', 1))
comp('d3 glucosa de 3,24 g de almidón', Q(324, 100) / 162 * 180, num('d3'))
cierto('d3: agua consumida 0,36 g = 0,020 mol y se conserva la masa', Q(324, 100) / 162 * 18 == Q(36, 100) and Q(324, 100) + Q(36, 100) == Q(36, 10))
comp('d4 agua consumida por 3,42 g de maltosa', Q(342, 100) / 342 * 18, num('d4', 0))
comp('d4 glucosa obtenida', Q(342, 100) / 342 * 2 * 180, num('d4', 1))
cierto('d4: la masa se conserva (3,42 + 0,18 = 3,60)', Q(342, 100) + Q(18, 100) == Q(360, 100))
comp('d8 C* de la glucosa cíclica', nast('glu') + 1, num('d8'))
cierto('símbolo sympy: 2^4 = 16 y 2^5 = 32 (sympy)', sp.Integer(2) ** 4 == 16 and sp.Integer(2) ** 5 == 32)
cierto('c7 simbólico: 180n − 18(n−1) con n = 100', sp.expand(180 * sp.Symbol('n') - 18 * (sp.Symbol('n') - 1)).subs('n', 100) == 16218)

# ---------------------------------------------------------------- ejercicios de opción: una única respuesta correcta que coincide con los hechos
RESP = {   # id (o id, índice de campo) → texto de la opción correcta (escrito aquí a partir de los hechos)
    'b1': 'Cₙ(H₂O)ₙ', 'b2': 'Glucosa', 'b5': 'una molécula de agua', 'b6': 'el glucógeno', 'b7': 'estructural',
    ('b8', 0): 'Verdadero', ('b8', 1): 'Son isómeros', 'b9': 'la lactosa', 'b11': 'Lugol', 'b12': 'La celulosa',
    ('b4', 0): 'Pentosa', ('b4', 1): 'Hexosa', ('b4', 2): 'Triosa', ('b4', 3): 'Hexosa',
    ('c8', 0): 'Falso', ('c8', 1): 'Sus dos carbonos anoméricos', ('c9', 0): 'Verdadero', ('c9', 1): 'El OH anomérico de su glucosa',
    'c10': 'epímeros', 'c11': 'anómeros', 'c12': 'El ácido hidroliza', 'c15': 'lactasa', 'c16': 'C2',
    ('c13', 0): 'Reserva vegetal', ('c13', 1): 'Reserva animal', ('c13', 2): 'Estructural vegetal', ('c13', 3): 'Estructural en artrópodos',
    ('d5', 0): 'Positivo', ('d5', 1): 'Negativo', ('d5', 2): 'Negativo', ('d5', 3): 'Positivo',
    ('d6', 0): 'Falso', ('d6', 1): 'Los dos son polímeros de glucosa', 'd7': 'mutarrotación', 'd9': 'El enlace es β', 'd10': 'Pasa al intestino grueso',
}
vistos = set()
for clave, esperado in RESP.items():
    i, k = (clave, 0) if isinstance(clave, str) else clave
    c = EJ[i]['check']
    c = c if isinstance(c, list) else [c]
    c = c[k]
    cierto(f'{i}[{k}]: opción de tipo "opcion"', c['tipo'] == 'opcion')
    cierto(f'{i}[{k}]: opciones distintas entre sí', len(set(c['opciones'])) == len(c['opciones']))
    cierto(f'{i}[{k}]: la correcta es «{esperado}»', limpio(c['opciones'][c['ok']]).startswith(limpio(esperado)))
    cierto(f'{i}[{k}]: ninguna otra opción empieza igual que la correcta', sum(1 for o in c['opciones'] if limpio(o).startswith(limpio(esperado))) == 1)
    vistos.add(i)
# ejercicios de texto
cierto('b3 acepta glucosídico; b10 desoxirribosa', 'glucosídico' in EJ['b3']['check']['valores'] and 'desoxirribosa' in EJ['b10']['check']['valores'])
# ejercicios de opción presentes en la web pero sin hecho declarado arriba (para no dejar ninguno sin verificar)
sin = [e['id'] for e in T['ejercicios'] if e['id'] not in vistos and e['check'] != 0 and (e['check'] if isinstance(e['check'], dict) else e['check'][0])['tipo'] == 'opcion']
cierto(f'todos los ejercicios de opción tienen hecho declarado (faltan: {sin})', not sin)

# ---------------------------------------------------------------- niveles y rúbricas
niv = [e['nivel'] for e in T['ejercicios']]
cierto(f'≥ 40 ejercicios ({len(niv)}) y los tres niveles', len(niv) >= 40 and {1, 2, 3} <= set(niv) and len(set(e['id'] for e in T['ejercicios'])) == len(niv))
rub = [e for e in T['ejercicios'] if (e['check'] if isinstance(e['check'], dict) else e['check'][0])['tipo'] == 'rubrica']
cierto(f'{len(rub)} preguntas abiertas con rúbrica (3 a 5)', 3 <= len(rub) <= 5)
for e in rub:
    s = sum(i['p'] for i in e['check']['items'])
    cierto(f'{e["id"]}: la rúbrica suma 2 puntos ({s:.2f})', abs(s - 2.0) < 1e-9)
cierto('todos los ejercicios llevan pasos y resultado', all(e.get('pasos') and e.get('resultado') for e in T['ejercicios']))

# ---------------------------------------------------------------- actividades (datos)
CLAS = {'Glucosa': 0, 'Fructosa': 0, 'Ribosa': 0, 'Galactosa': 0, 'Sacarosa': 1, 'Lactosa': 1, 'Maltosa': 1, 'Almidón': 2, 'Glucógeno': 2, 'Celulosa': 2, 'Quitina': 2}
cierto('clasificar tipos: 11 glúcidos bien clasificados', {i['t']: i['c'] for i in D['tipos']['items']} == CLAS and D['tipos']['categorias'] == ['Monosacárido', 'Disacárido', 'Polisacárido'])
FUN = {'Almidón': 0, 'Inulina': 0, 'Glucógeno': 1, 'Celulosa': 2, 'Quitina': 2, 'Peptidoglucano (pared bacteriana)': 2}
cierto('clasificar funciones: reserva vegetal, animal y estructural', {i['t']: i['c'] for i in D['funciones']['items']} == FUN)
cierto('isomería: los cuatro pares', {tuple(p) for p in D['isomeria']['pares']} == {('Enantiómeros', 'D-glucosa y L-glucosa'), ('Epímeros', 'Glucosa y galactosa'), ('Isómeros de función', 'Glucosa y fructosa'), ('Anómeros', 'α-glucosa y β-glucosa')})
cierto('disacáridos: pares coinciden con los hechos',
       {tuple(p) for p in D['disacaridos']['pares']} == {('Maltosa', 'Glucosa + glucosa, α(1→4)'), ('Celobiosa', 'Glucosa + glucosa, β(1→4)'), ('Lactosa', 'Galactosa + glucosa, β(1→4)'), ('Sacarosa', 'Glucosa + fructosa, α(1→β2)')})
ENLACE = {'Maltosa': 'α(1→4)', 'Celobiosa': 'β(1→4)', 'Lactosa': 'β(1→4)', 'Sacarosa': 'α(1→β2)'}
MONOS = {'Maltosa': ['glucosa', 'glucosa'], 'Celobiosa': ['glucosa', 'glucosa'], 'Lactosa': ['galactosa', 'glucosa'], 'Sacarosa': ['glucosa', 'fructosa']}
for nom, d in DIS.items():
    par = [p for p in D['disacaridos']['pares'] if p[0] == nom][0][1].lower()
    cierto(f'disacáridos: {nom}: enlace {ENLACE[nom]} con los carbonos {d[1]} y {d[3]}', ENLACE[nom] in par and re.findall(r'\d', ENLACE[nom]) == [str(d[1]), str(d[3])])
    cierto(f'disacáridos: {nom}: monosacáridos {MONOS[nom]}', all(m in par for m in MONOS[nom]) and par.count('+') == 1)
orden_cic = [limpio(i['t']).lower() for i in D['ciclacion']['items']]
cierto('ciclación: abierta → C5 se acerca → hemiacetal → C1 asimétrico → α/β', ['abierta' in orden_cic[0], 'oh del c5' in orden_cic[1], 'hemiacetal' in orden_cic[2], 'anomérico' in orden_cic[3], 'α' in orden_cic[4] and 'β' in orden_cic[4]] == [True] * 5)
orden_alm = [limpio(i['t']).lower() for i in D['almidon']['items']]
cierto('digestión del almidón: boca → estómago → intestino → maltasa → absorción', [('boca' in orden_alm[0]), ('estómago' in orden_alm[1]), ('pancreática' in orden_alm[2]), ('maltasa' in orden_alm[3]), ('sangre' in orden_alm[4])] == [True] * 5)
# quiz y errores: la correcta coincide con el hecho; las demás no
QUIZ = ['aldosa', 'La fructosa', 'epímeros', 'C1', 'β(1→4)', 'el glucógeno', 'La sacarosa', 'una molécula de agua', 'almidón', 'C₁₂H₂₂O₁₁']
for q, esp in zip(D['quiz1']['preguntas'], QUIZ):
    cierto(f'test: «{esp}» es la correcta y única', q['op'][q['ok']] == esp and len(set(q['op'])) == 4)
cierto('test: 10 preguntas', len(D['quiz1']['preguntas']) == 10)
ERR = ['Los hidratos de carbono contienen moléculas de agua unidas', 'D y L indican hacia dónde gira la luz polarizada', 'La glucosa forma una furanosa de cinco lados', 'Se forma por hidrólisis',
       'Es un azúcar reductor', 'El almidón y la celulosa se diferencian en que están formados por monómeros distintos', 'Los humanos digerimos la celulosa con la enzima celulasa', 'El almidón da Fehling positivo']
for q, esp in zip(D['errores']['preguntas'], ERR):
    cierto(f'encuentra el error: «{esp[:40]}…» es la falsa', q['op'][q['ok']] == esp and len(set(q['op'])) == 4)
cierto('encuentra el error: 8 preguntas', len(D['errores']['preguntas']) == 8)
tarj = {c['a']: limpio(c['b']).lower() for c in D['tarjetas1']['cartas']}
cierto('tarjetas: 12, y la sacarosa y la celulosa con sus enlaces', len(tarj) == 12 and 'α(1→β2)' in tarj['Sacarosa'] and 'β(1→4)' in tarj['Celulosa'] and '8–12' in tarj['Glucógeno'])

# ---------------------------------------------------------------- ficha de un vistazo: hechos y coherencia con la teoría
VIDAS = {'Emil Fischer': (1852, 1919, 'Nobel de Química 1902'), 'Walter Haworth': (1883, 1950, 'Nobel 1937'), 'Claude Bernard': (1813, 1878, 'glucógeno hepático, 1857')}
for a in vz['autores']:
    n = a['n']
    nac, mue, hito = VIDAS[n]
    cierto(f'ficha: {n} {nac}–{mue}', a['f'] == f'{nac}–{mue}' and hito in a['l'] and mue > nac)
cierto('cronología: Fischer, Bernard, Haworth; Fischer premio Nobel antes que Haworth; el glucógeno (1857) se descubre en vida de Bernard',
       1813 < 1852 < 1883 and 1902 < 1937 and 1813 < 1857 < 1878)
cierto('ficha: 6 bloques, 10 claves, ≤ 3 frases por bloque', len(vz['bloques']) == 6 and len(vz['claves']) == 10 and all(len(b['frases']) <= 3 for b in vz['bloques']))
cierto('ficha: frases cortas (≤ 15 palabras)', all(len(limpio(f).split()) <= 15 for b in vz['bloques'] for f in b['frases']))
for dato in ('4 kcal', '8–12', '12–30', '20–30', '70–80'):
    cierto(f'ficha/teoría: «{dato}»', dato in teoria_l or dato.replace('–', '-') in teoria_l or dato in limpio(json.dumps(T['datos'], ensure_ascii=False)).lower() or dato in vz_txt)
cierto('teoría: ramas de la amilopectina (12–30) y del glucógeno (8–12)', '12–30' in teoria_l and '8–12' in teoria_l)
for term in ('carbono anomérico', 'piranosa', 'furanosa', 'epímeros', 'enlace o-glucosídico', 'azúcar reductor', 'amilosa', 'amilopectina', 'glucógeno', 'celulosa', 'aldosa', 'cetosa'):
    cierto(f'ficha/teoría: «{term}» aparece en la teoría', term in teoria_l)
claves_ficha = {limpio(k).lower(): limpio(v).lower() for k, v in vz['claves']}
cierto('ficha: glucógeno con ramas cada 8–12 y amilopectina con α(1→6)', '8–12' in claves_ficha['glucógeno'] and 'α(1→6)' in claves_ficha['amilosa / amilopectina'])
tab_dis = ' '.join(limpio(' '.join(f)) for b in vz['bloques'] if b['t'] == 'Enlace O-glucosídico' for f in b['tabla']['filas']).lower()
cierto('ficha: maltosa glucosa+glucosa α(1→4), lactosa galactosa+glucosa β(1→4), sacarosa glucosa+fructosa α(1→β2)',
       'maltosa glucosa + glucosa, α(1→4)' in tab_dis and 'lactosa galactosa + glucosa, β(1→4)' in tab_dis and 'sacarosa glucosa + fructosa, α(1→β2)' in tab_dis)
lam = limpio(json.dumps(T['lamina'], ensure_ascii=False))
cierto('lámina: sacarosa no reductora y masa 342 con 180 + 180 − 18', 'Sacarosa", "Glc + Fru", "α(1→β2)", "no"' in lam and '180 + 180 − 18' in lam and '342' in lam)
# la teoría dice lo mismo que los hechos en los puntos delicados
cierto('teoría: D-glucosa (+), D-fructosa levógira (−)', 'levógira' in teoria_l and 'dextrógira' in teoria_l)
cierto('teoría: sacarosa +66,5°, glucosa +52,7°, fructosa −92°; α +112°, β +19° → +52,7°', all(x in teoria_l for x in ('+66,5', '+52,7', '−92', '+112', '+19')))
cierto('teoría: epímeros glucosa/galactosa C4 y glucosa/manosa C2', 'glucosa y galactosa (c4)' in teoria_l and 'glucosa y manosa (c2)' in teoria_l)
cierto('teoría: maltosa, celobiosa, lactosa y sacarosa con sus enlaces', all(x in teoria_l for x in ('α(1→4)', 'β(1→4)', 'α(1→β2)')))
cierto('teoría: 4 kcal/g (≈ 17 kJ)', '4 kcal' in teoria_l and '17 kj' in teoria_l.replace('≈ ', ''))

# ---------------------------------------------------------------- resultado
if fallos:
    print('FALLOS:')
    for f in fallos:
        print(' -', f)
    print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
    sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos')
