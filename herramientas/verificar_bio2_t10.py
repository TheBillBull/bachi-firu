#!/usr/bin/env python3
"""
Verificación independiente de Biología II, tema 10 (Genética mendeliana).
No comparte código con la web: modela cada cruce enumerando gametos y combinaciones con fracciones exactas
(fractions.Fraction), recalcula toda proporción y probabilidad de ejemplos y ejercicios (monohíbridos, dihíbridos,
trihíbridos, intermedia, ABO, ligada al X, ligamiento con recombinación, binomial, probabilidad condicionada en
árboles), comprueba hechos y fechas de la ficha, que cada ejercicio tenga una única respuesta correcta y que la ficha
no contradiga la teoría.

Convención declarada: dominancia completa A > a salvo que se diga otra cosa; ABO con I^A, I^B (codominantes) e i;
daltonismo X^D / X^d; el sexo de cada hijo es ½ y ½; los gametos de un heterocigoto salen al 50 % (genes independientes).

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_bio2_t10.py /tmp/ampl.json
"""
import itertools, json, re, sys
from fractions import Fraction as F
from math import comb, gcd

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
T = datos['ampl']['bio2']['t10']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()


# ---------------------------------------------------------------- motor de cruces (enumeración pura)
def gametos(gen):
    """gen = 'AaBb' → lista de gametos con repetición (uno por combinación de cromosomas)."""
    pares = [gen[i:i + 2] for i in range(0, len(gen), 2)]
    return [''.join(c) for c in itertools.product(*pares)]


def cruce(g1, g2):
    """dict genotipo→probabilidad (Fraction); genotipo 'AaBb' con la mayúscula primero en cada gen."""
    a, b = gametos(g1), gametos(g2)
    res = {}
    for x, y in itertools.product(a, b):
        gen = ''.join(''.join(sorted([x[i], y[i]])) for i in range(len(x)))
        res[gen] = res.get(gen, 0) + F(1, len(a) * len(b))
    return res


def fen_completa(gen):
    """Fenotipo con dominancia completa: tupla de bool (¿tiene alelo dominante?) por gen."""
    return tuple(any(c.isupper() for c in gen[i:i + 2]) for i in range(0, len(gen), 2))


def fenotipos(cr):
    r = {}
    for g, p in cr.items():
        r[fen_completa(g)] = r.get(fen_completa(g), 0) + p
    return r


def prob(cr, pred):
    return sum(p for g, p in cr.items() if pred(g))


def razon(valores):
    den = 1
    for v in valores:
        den = den * v.denominator // gcd(den, v.denominator)
    ent = [int(v * den) for v in valores]
    g = 0
    for e in ent:
        g = gcd(g, e)
    return ' : '.join(str(e // g) for e in ent)


# ---------------------------------------------------------------- leyes de Mendel
cierto('1.ª ley: AA × aa → 100 % Aa', cruce('AA', 'aa') == {'Aa': 1})
c2 = cruce('Aa', 'Aa')
cierto('2.ª ley: genotipos ¼ AA, ½ Aa, ¼ aa', c2 == {'AA': F(1, 4), 'Aa': F(1, 2), 'aa': F(1, 4)})
cierto('2.ª ley: fenotipos ¾ dominante, ¼ recesivo', sorted(fenotipos(c2).values()) == [F(1, 4), F(3, 4)])
cierto('proporción genotípica 1 : 2 : 1', razon([c2['AA'], c2['Aa'], c2['aa']]) == '1 : 2 : 1')
c3 = cruce('AaBb', 'AaBb')
fe = fenotipos(c3)
cierto('3.ª ley: 9 : 3 : 3 : 1', sorted(fe.values(), reverse=True) == [F(9, 16), F(3, 16), F(3, 16), F(1, 16)])
cierto('dihíbrido: 16 casillas, 9 genotipos, 4 fenotipos', len(gametos('AaBb')) ** 2 == 16 and len(c3) == 9 and len(fe) == 4)
cierto('dihíbrido: 4 gametos distintos AB, Ab, aB, ab', sorted(set(gametos('AaBb'))) == ['AB', 'Ab', 'aB', 'ab'])
cierto('cruce prueba de Aa: ½ : ½', cruce('Aa', 'aa') == {'Aa': F(1, 2), 'aa': F(1, 2)})
cierto('cruce prueba del dihíbrido: 1 : 1 : 1 : 1', sorted(cruce('AaBb', 'aabb').values()) == [F(1, 4)] * 4)
cierto('regla del producto en dihíbrido (A_B_ = ¾·¾)', prob(c3, lambda g: fen_completa(g) == (True, True)) == F(3, 4) * F(3, 4))
cierto('atajo: P(AaBb) = ½·½ = ¼; P(AABB) = 1/16', c3['AaBb'] == F(1, 4) and c3['AABB'] == F(1, 16))
cierto('ejemplo: lisa y Bb = 3/8', prob(c3, lambda g: fen_completa(g)[0] and g[2:] == 'Bb') == F(3, 8))
cierto('ejemplo: AABb = 1/8; rugosa amarilla 3/16', c3['AABb'] == F(1, 8) and prob(c3, lambda g: g[:2] == 'aa' and fen_completa(g)[1]) == F(3, 16))
cierto('widget: AaBb × Aabb → 3 : 1 : 3 : 1 (genes independientes)', razon(sorted(fenotipos(cruce('AaBb', 'Aabb')).values(), reverse=True)) == '3 : 3 : 1 : 1')
cierto('widget: AABB × aabb → F1 toda AaBb', cruce('AABB', 'aabb') == {'AaBb': 1})

# tabla n genes: gametos 2^n, casillas 4^n, genotipos 3^n, fenotipos 2^n
for n, gen in ((1, 'Aa'), (2, 'AaBb'), (3, 'AaBbCc')):
    cr = cruce(gen, gen)
    cierto('n=%d: 2ⁿ gametos' % n, len(set(gametos(gen))) == 2 ** n)
    cierto('n=%d: 4ⁿ casillas' % n, len(gametos(gen)) ** 2 == 4 ** n)
    cierto('n=%d: 3ⁿ genotipos' % n, len(cr) == 3 ** n)
    cierto('n=%d: 2ⁿ fenotipos' % n, len(fenotipos(cr)) == 2 ** n)
tri = cruce('AaBbCc', 'AaBbCc')
cierto('trihíbrido: A_B_C_ = 27/64 y aabbcc = 1/64', prob(tri, lambda g: fen_completa(g) == (True, True, True)) == F(27, 64) and tri['aabbcc'] == F(1, 64))

# datos históricos de Mendel
cierto('Mendel: 5474 / 1850 = 2,96', abs(5474 / 1850 - 2.96) < 0.005)
cierto('Mendel: 315+108+101+32 = 556', 315 + 108 + 101 + 32 == 556)
cierto('Mendel: esperados 312,75 : 104,25 : 104,25 : 34,75', [float(F(556 * k, 16)) for k in (9, 3, 3, 1)] == [312.75, 104.25, 104.25, 34.75])
for s in ('5.474', '1.850', '2,96', '315', '108', '101', '32', '556', '312,75', '104,25', '34,75'):
    cierto('teoría contiene %s' % s, s in limpio(teoria))

# ---------------------------------------------------------------- probabilidades de la teoría
cierto('2 hijos aa seguidos 1/16', F(1, 4) ** 2 == F(1, 16))
cierto('al menos un aa en 3 hijos = 37/64', 1 - F(3, 4) ** 3 == F(37, 64))
cierto('portador entre los sanos = 2/3', F(1, 2) / F(3, 4) == F(2, 3))
cierto('1200 plantas: 900 lisas, 300 AA, 600 Aa; 600/900 = 2/3', (1200 * F(3, 4), 1200 * F(1, 4), 1200 * F(1, 2)) == (900, 300, 600) and F(600, 900) == F(2, 3))
cierto('exactamente 1 aa de 4 hijos = 27/64 (orden fijo 27/256)', comb(4, 1) * F(1, 4) * F(3, 4) ** 3 == F(27, 64) and F(1, 4) * F(3, 4) ** 3 == F(27, 256))
cierto('sanos hijos de portadores: 2/3·2/3·1/4 = 1/9', F(2, 3) * F(2, 3) * F(1, 4) == F(1, 9))
cierto('II-2 (2/3) × portadora, hijo aa = 1/6', F(2, 3) * F(1, 4) == F(1, 6))
for s in ('27/64', '37/64', '27/256', '1/9', '1/6', '3/8', '3/16', '1/8', '9/16'):
    cierto('teoría contiene %s' % s, s in limpio(teoria))

# ---------------------------------------------------------------- dominancia intermedia y letal
cierto('intermedia: F₂ 1 : 2 : 1 (un fenotipo por genotipo)', sorted(cruce('Aa', 'Aa').values()) == [F(1, 4), F(1, 4), F(1, 2)])
cierto('rosa × blanca: ½ rosa, ½ blanca', cruce('Aa', 'aa') == {'Aa': F(1, 2), 'aa': F(1, 2)})
let = {g: p for g, p in cruce('Aa', 'Aa').items() if g != 'AA'}
tot = sum(let.values())
cierto('letal: entre los nacidos 2 : 1', {g: p / tot for g, p in let.items()} == {'Aa': F(2, 3), 'aa': F(1, 3)})
cierto('letal: 90 vivos → 30 grises', 90 * F(1, 3) == 30)


# ---------------------------------------------------------------- grupos ABO
def grupo(gen):
    return 'AB' if ('A' in gen and 'B' in gen) else 'A' if 'A' in gen else 'B' if 'B' in gen else 'O'


def abo(g1, g2):
    res = {}
    for x, y in itertools.product(g1, g2):
        gr = grupo(x + y)
        res[gr] = res.get(gr, 0) + F(1, 4)
    return res


GEN = ['AA', 'AO', 'BB', 'BO', 'AB', 'OO']
cierto('grupos: genotipos A, B, AB, O correctos', [grupo(g) for g in GEN] == ['A', 'A', 'B', 'B', 'AB', 'O'])
cierto('AB × O: solo A o B (½ y ½)', abo('AB', 'OO') == {'A': F(1, 2), 'B': F(1, 2)})
cierto('AO × BO: ¼ de cada grupo', abo('AO', 'BO') == {'A': F(1, 4), 'B': F(1, 4), 'AB': F(1, 4), 'O': F(1, 4)})
cierto('madre A con hijo O: solo puede ser AO', [g for g in ('AA', 'AO') if any(abo(g, p).get('O', 0) > 0 for p in GEN)] == ['AO'])
posibles = {g for g in GEN if abo('AO', g).get('O', 0) > 0}
cierto('madre AO, hijo O: padre A (AO), B (BO) u O (OO), no AB ni homocigotos', {grupo(g) for g in posibles} == {'A', 'B', 'O'} and not ({'AB', 'AA', 'BB'} & posibles))
cierto('hijo O de padre A y madre B: ambos con i (AO y BO)', [(p, m) for p in ('AA', 'AO') for m in ('BB', 'BO') if abo(p, m).get('O', 0) > 0] == [('AO', 'BO')])
cierto('BO × AO: P(O) = 1/4', abo('BO', 'AO')['O'] == F(1, 4))
cierto('AB × AB: no hay grupo O', 'O' not in abo('AB', 'AB'))
antig = {'A': {'A'}, 'B': {'B'}, 'AB': {'A', 'B'}, 'O': set()}
recibe = {r: sorted(d for d in antig if antig[d] <= antig[r]) for r in antig}
cierto('compatibilidad: A recibe de A y O', recibe['A'] == ['A', 'O'])
cierto('compatibilidad: B recibe de B y O', recibe['B'] == ['B', 'O'])
cierto('compatibilidad: AB recibe de todos', recibe['AB'] == ['A', 'AB', 'B', 'O'])
cierto('compatibilidad: O solo recibe de O', recibe['O'] == ['O'])
cierto('teoría: AB receptor universal y O donante universal', 'receptor universal' in teoria_l and 'donante universal' in teoria_l)


# ---------------------------------------------------------------- ligada al X
def xlig(madre, padre):
    """madre: dos alelos 'D'/'d'; padre: 'D' o 'd'. Probabilidades por clase sobre el total."""
    res = {}
    for a in madre:
        for b in (padre, 'Y'):
            if b == 'Y':
                c = 'hijo sano' if a == 'D' else 'hijo afectado'
            else:
                c = {'DD': 'hija sana', 'Dd': 'hija portadora', 'dd': 'hija afectada'}[''.join(sorted([a, b], key=lambda z: z.islower()))]
            res[c] = res.get(c, 0) + F(1, 4)
    return res


r = xlig(('D', 'd'), 'D')
cierto('portadora × sano: ¼ hijo afectado, ¼ hija portadora, sin hijas afectadas', r.get('hijo afectado') == F(1, 4) and r.get('hija portadora') == F(1, 4) and 'hija afectada' not in r)
cierto('portadora × sano: entre los varones, 50 % afectados', r['hijo afectado'] / (r['hijo afectado'] + r['hijo sano']) == F(1, 2))
cierto('afectada × sano: todos los hijos varones afectados, hijas portadoras', xlig(('d', 'd'), 'D') == {'hijo afectado': F(1, 2), 'hija portadora': F(1, 2)})
cierto('sana × afectado: hijas portadoras, hijos sanos', xlig(('D', 'D'), 'd') == {'hija portadora': F(1, 2), 'hijo sano': F(1, 2)})
cierto('portadora × afectado: ¼ de cada clase', xlig(('D', 'd'), 'd') == {'hija portadora': F(1, 4), 'hija afectada': F(1, 4), 'hijo sano': F(1, 4), 'hijo afectado': F(1, 4)})
cierto('hemofilia: dos hijos varones hemofílicos seguidos = 1/16', F(1, 4) ** 2 == F(1, 16))
cierto('hija afectada con padre sano es imposible en recesivo ligado al X', all(xlig(m, 'D').get('hija afectada', 0) == 0 for m in (('D', 'D'), ('D', 'd'), ('d', 'd'))))
cierto('daltonismo: 8 % de varones → q² = 0,64 % de mujeres (< 1 %)', abs(0.08 ** 2 - 0.0064) < 1e-12 and 0.08 ** 2 < 0.01)


# ---------------------------------------------------------------- ligamiento
def lig(r, cis=True):
    par, rec = F(100 - r, 200), F(r, 200)
    return ({'AB': par, 'ab': par, 'Ab': rec, 'aB': rec} if cis else {'Ab': par, 'aB': par, 'AB': rec, 'ab': rec})


cierto('Morgan: total 2300 y recombinantes 391', 965 + 944 + 206 + 185 == 2300 and 206 + 185 == 391)
cierto('Morgan: r = 17 %', F(391, 2300) == F(17, 100))
cierto('r = 0: solo parentales', lig(0)['Ab'] == 0 and lig(0)['AB'] == F(1, 2))
cierto('r = 50: 1 : 1 : 1 : 1', set(lig(50).values()) == {F(1, 4)})
cierto('r = 20 cis, 1000 hijos: 400/400/100/100', {k: int(v * 1000) for k, v in lig(20).items()} == {'AB': 400, 'ab': 400, 'Ab': 100, 'aB': 100})
cierto('r = 20, 500 hijos: Ab = 50', lig(20)['Ab'] * 500 == 50)
cierto('trans r=10: parentales Ab y aB 45 %, recombinantes 5 %', lig(10, False)['Ab'] == F(9, 20) and lig(10, False)['AB'] == F(1, 20))
cierto('ligamiento: 450/460/45/45 → r = 9 %', F(45 + 45, 1000) == F(9, 100) and 450 + 460 + 45 + 45 == 1000)
for r in (0, 10, 17, 25, 50):
    cierto('widget r=%d: cuatro clases suman 100 %%' % r, sum(lig(r).values()) == 1)
cierto('A–B 4, B–C 6, A–C 10: B en medio (4 + 6 = 10)', 4 + 6 == 10 and max(4, 6, 10) == 10)
cierto('teoría: 1 % de recombinación = 1 cM', '1 % de recombinación = 1 centimorgan' in teoria_l)


# ---------------------------------------------------------------- árboles genealógicos (los del widget)
def hijo_posible(gm, gp, gh):
    return any(''.join(sorted([a, b])) == ''.join(sorted(gh)) for a in gm for b in gp)


cierto('árbol 1 (AR): II-1 aa de Aa × Aa; III-1 aa y III-2 Aa de Aa × aa',
       hijo_posible('Aa', 'Aa', 'aa') and hijo_posible('Aa', 'aa', 'aa') and hijo_posible('Aa', 'aa', 'Aa'))
cierto('árbol 1: II-2 sano de Aa × Aa → 1/3 AA, 2/3 Aa', cruce('Aa', 'Aa')['AA'] / F(3, 4) == F(1, 3) and cruce('Aa', 'Aa')['Aa'] / F(3, 4) == F(2, 3))
cierto('árbol 1: III-2 sana de Aa × aa solo puede ser Aa', cruce('Aa', 'aa').get('AA', 0) == 0)
cierto('árbol 2 (AD): Aa × aa da Aa y aa; un hijo aa excluye AA en el afectado', set(cruce('Aa', 'aa')) == {'Aa', 'aa'} and cruce('AA', 'aa').get('aa', 0) == 0)
cierto('árbol 3 (XR): madre X^D X^d × padre X^D Y: hijos afectados, hijas no', xlig(('D', 'd'), 'D').get('hijo afectado') == F(1, 4) and xlig(('D', 'd'), 'D').get('hija afectada', 0) == 0)
cierto('árbol 3: hijas de X^D X^d × X^D Y son X^D X^D o X^D X^d', {k for k in xlig(('D', 'd'), 'D') if k.startswith('hija')} == {'hija sana', 'hija portadora'})
cierto('teoría: hija afectada con padre sano descarta ligado al X', 'hija afectada' in teoria_l and 'padre sano' in teoria_l)

# ---------------------------------------------------------------- cada ejercicio numérico contra su cálculo independiente
XA = xlig(('D', 'd'), 'D')
ESPERADO = {
    'b4': 100 * float(prob(cruce('AA', 'aa'), lambda g: g == 'Aa')),
    'b5': 100 * float(cruce('Aa', 'Aa')['aa']),
    'b6': 100 * float(prob(cruce('Aa', 'Aa'), lambda g: fen_completa(g) == (True,))),
    'b9': 100 * float(cruce('Aa', 'aa')['aa']),
    'b11': len(set(gametos('AaBb'))),
    'b15': float(1200 * cruce('Aa', 'Aa')['aa']),
    'c1': 100 * float(cruce('Aa', 'Aa')['aa']),
    'c2': 100 * float(F(1, 4) ** 3),
    'c3': 100 * float(1 - F(3, 4) ** 3),
    'c4': 100 * float(F(1, 2) / F(3, 4)),
    'c5': 100 * float(prob(c3, lambda g: fen_completa(g) == (True, True))),
    'c6': 100 * float(c3['aabb']),
    'c7': 100 * float(c3['AaBb']),
    'c8': 100 * float(cruce('AaBb', 'aabb')['aabb']),
    'c9': 100 * float(prob(cruce('AABb', 'aaBb'), lambda g: fen_completa(g) == (True, True))),
    'c10': len(set(gametos('AaBbCc'))),
    'c11': len(tri),
    'c12': 100 * float(prob(tri, lambda g: fen_completa(g) == (True, True, True))),
    'c16': 100 * float(abo('BO', 'AO')['O']),
    'c17': 100 * float(XA['hijo afectado']),
    'c18': 100 * float(XA['hijo afectado'] / (XA['hijo afectado'] + XA['hijo sano'])),
    'c19': 100 * float(xlig(('d', 'd'), 'D')['hijo afectado'] / (xlig(('d', 'd'), 'D')['hijo afectado'])),
    'c21': 100 * float(cruce('Aa', 'aa')['Aa']),
    'd1': 100 * 391 / 2300,
    'd2': float(lig(20)['Ab'] * 500),
    'd4': 100 * float(F(2, 3) * F(2, 3) * F(1, 4)),
    'd5': 100 * float(F(2, 3) * F(1, 4)),
    'd6': 100 * float(comb(4, 1) * F(1, 4) * F(3, 4) ** 3),
    'd7': 100 * float(xlig(('D', 'd'), 'd')['hija afectada']),
    'd8': 100 * float(F(1, 4) ** 2),
    'd10': float(800 * c3['aabb']),
    'd11': float(90 * F(1, 3)),
    'd12': float(640 * prob(c3, lambda g: fen_completa(g) == (True, False))),
    'd13': 100 * float(prob(tri, lambda g: fen_completa(g) == (True, True, False))),
}
for eid, v in ESPERADO.items():
    ch = EJ[eid]['check']
    cierto('%s es de tipo num' % eid, ch['tipo'] == 'num')
    casi('ejercicio %s' % eid, ch['valor'], v, 0.003)
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
    'b1': 'formas alternativas', 'b2': 'heterocigoto', 'b7': 'AaBb × AaBb', 'b8': 'codominancia', 'b13': 'toda rosa', 'b16': 'madre',
    'c14': 'I^A i', 'c15': 'Solo A o B', 'c22': 'letal', 'd9': 'Padre I^A i y madre I^B i',
}
for eid, k in CLAVE.items():
    c = checks(EJ[eid])[0]
    cierto('%s: la correcta contiene «%s»' % (eid, k), k.lower() in c['opciones'][c['ok']].lower())
    if eid == 'b7':
        cierto('b7: ninguna otra opción es exactamente el dihíbrido AaBb × AaBb (comparación sensible a mayúsculas)', all('AaBb × AaBb' not in o for i, o in enumerate(c['opciones']) if i != c['ok']))
    elif eid not in ('c14', 'd9'):   # en estos las opciones incorrectas comparten parte del texto (se comprueban con el modelo)
        cierto('%s: ninguna otra contiene «%s»' % (eid, k), all(k.lower() not in o.lower() for i, o in enumerate(c['opciones']) if i != c['ok']))
cierto('d3: la correcta es exactamente «B»', checks(EJ['d3'])[0]['opciones'][checks(EJ['d3'])[0]['ok']] == 'B')
c14 = checks(EJ['c14'])[0]
cierto('c14: opción correcta I^A i y las demás son genotipos que no encajan', c14['opciones'][c14['ok']] == 'I^A i' and set(c14['opciones']) == {'I^A i', 'I^A I^A', 'I^A I^B', 'ii'})
cierto('c15: AB × O da solo A y B', set(abo('AB', 'OO')) == {'A', 'B'})
cierto('d9: único par (padre A, madre B) con hijo O es AO × BO', [(p, m) for p in ('AA', 'AO') for m in ('BB', 'BO') if abo(p, m).get('O', 0) > 0] == [('AO', 'BO')])
cierto('c22: 2 : 1 es la señal de un letal (Aa × Aa sin AA)', {g: p / tot for g, p in let.items()} == {'Aa': F(2, 3), 'aa': F(1, 3)})
cierto('b13: roja × blanca da toda Aa (intermedio)', cruce('AA', 'aa') == {'Aa': 1})
cierto('b16: el fenotipo de los hijos varones depende solo de la madre (no del alelo del padre)', all('hijo afectado' not in xlig(('D', 'D'), pa) and 'hijo sano' not in xlig(('d', 'd'), pa) for pa in ('D', 'd')))

VF_ESP = {'b3': True, 'b12': False, 'c20': False}
for eid, v in VF_ESP.items():
    c = checks(EJ[eid])[0]
    cierto('%s: V/F correcto' % eid, (c['opciones'][c['ok']] == 'Verdadero') == v)
cierto('b3: aa es el único genotipo con fenotipo recesivo', [g for g in ('AA', 'Aa', 'aa') if not fen_completa(g)[0]] == ['aa'])
cierto('b12: el daltonismo es más frecuente en varones (8 % frente a 0,64 %)', 0.08 > 0.08 ** 2)
cierto('c20: padre X^d Y × madre X^D X^D nunca da hijo afectado', xlig(('D', 'D'), 'd').get('hijo afectado', 0) == 0)

EMP = {
    'b14': {'AA': 'dominante', 'Aa': 'Heterocigoto', 'aa': 'recesivo'},
    'c13': {'Grupo AB': 'I^A I^B', 'Grupo O': 'ii', 'Grupo B': 'I^B I^B o I^B i'},
}
for eid, mapa in EMP.items():
    for c in checks(EJ[eid]):
        k = mapa[c['etiqueta']]
        pat = re.compile(r'(?<!\w)' + re.escape(k) + r'(?!\w)', re.I)
        cierto('%s/%s correcto' % (eid, c['etiqueta']), bool(pat.search(c['opciones'][c['ok']])))
        cierto('%s/%s única' % (eid, c['etiqueta']), sum(bool(pat.search(o)) for o in c['opciones']) == 1)

cierto('b10: valores aceptados', 'cruce prueba' in EJ['b10']['check']['valores'] and 'retrocruzamiento' in EJ['b10']['check']['valores'])

# test y «encuentra el error»
for nombre in ('quiz1', 'errores'):
    for p in T['datos'][nombre]['preguntas']:
        cierto('%s: %s… ok en rango y opciones distintas' % (nombre, p['q'][:25]), 0 <= p['ok'] < len(p['op']) and len(set(p['op'])) == len(p['op']))
quiz_ok = [p['op'][p['ok']] for p in T['datos']['quiz1']['preguntas']]
cierto('test: AB × O da A o B', 'A o B' in quiz_ok)
cierto('test: cruce prueba del dihíbrido es 1 : 1 : 1 : 1', '1 : 1 : 1 : 1' in quiz_ok)
cierto('test: dihíbrido de 16 casillas y 9 : 3 : 3 : 1', any(v.startswith('16 casillas y proporción 9 : 3 : 3 : 1') for v in quiz_ok))
FALSAS = {
    'primera ley': 'Se cumple siempre', 'F₂ de un monohíbrido': 'La proporción genotípica es 3 : 1', 'tercera ley': 'Se cumple siempre',
    'grupos sanguíneos': 'El grupo O es I^A I^B', 'ligada al X': 'Un varón hereda el X de su padre', 'dominancia intermedia': 'La F₂ da 3 : 1',
    'ligamiento': 'Los recombinantes son los más abundantes',
}
for tema, frase in FALSAS.items():
    pr = [p for p in T['datos']['errores']['preguntas'] if tema in p['q']]
    cierto('errores/%s: la «falsa» es la marcada' % tema, len(pr) == 1 and pr[0]['op'][pr[0]['ok']].startswith(frase))
cierto('errores: 7 preguntas', len(T['datos']['errores']['preguntas']) == 7)

# actividades de clasificar / emparejar / orden
for nom in ('tipos', 'herencias'):
    d = T['datos'][nom]
    cierto('%s: categorías de los ítems válidas' % nom, all(0 <= i['c'] < len(d['categorias']) for i in d['items']))
    cierto('%s: todas las categorías con ≥ 2 ítems' % nom, all(sum(1 for i in d['items'] if i['c'] == k) >= 2 for k in range(len(d['categorias']))))
cierto('tipos: 3 : 1 es dominancia completa', any(i['t'] == 'La F₂ da 3 : 1' and i['c'] == 0 for i in T['datos']['tipos']['items']))
cierto('herencias: hija afectada de padre sano → autosómico recesivo', any('Hija afectada de padre sano' in i['t'] and i['c'] == 0 for i in T['datos']['herencias']['items']))
cierto('herencias: padres afectados con hijo sano → dominante', any('Dos padres afectados' in i['t'] and i['c'] == 1 for i in T['datos']['herencias']['items']))
cierto('herencias: nunca de padre a hijo varón → ligado al X', any('padre a hijo' in i['t'] and i['c'] == 2 for i in T['datos']['herencias']['items']))
cierto('emparejar vocab: pares sin repetir', len({p[0] for p in T['datos']['vocab']['pares']}) == len(T['datos']['vocab']['pares']))
cierto('orden método: 6 pasos y Punnett antes de responder', len(T['datos']['ordenmetodo']['items']) == 6 and 'Punnett' in T['datos']['ordenmetodo']['items'][4]['t'])
cierto('orden Mendel: P, F₁, autofecundación, F₂, conteo 3 : 1', len(T['datos']['ordenmendel']['items']) == 5 and '3 : 1' in T['datos']['ordenmendel']['items'][4]['t'])

# ---------------------------------------------------------------- hechos y fechas de la ficha (y su coherencia con la teoría)
cierto('ficha: Mendel 1865–1866, Morgan 1910, Sturtevant 1913', '1865–1866' in vz_txt and '1910' in vz_txt and '1913' in vz_txt)
cierto('teoría: mismas fechas (1865–1866, 1910, 1913) que la ficha', all(s in limpio(teoria) for s in ('1865–1866', '1910–1913', '(1913)')))
cierto('teoría: Mendel 1822–1884, Morgan 1866–1945, Landsteiner 1901, Johannsen 1909, redescubrimiento 1900, Sutton y Boveri',
       all(s in limpio(teoria) for s in ('1822–1884', '1866–1945', '1901', '1909', '1900', 'Sutton', 'Boveri')))
cierto('teoría: reina Victoria 1819–1901', '1819–1901' in limpio(teoria))
cierto('cronología coherente: 1822 < 1865 < 1900 < 1902 < 1909 < 1910 < 1913', 1822 < 1865 < 1900 < 1902 < 1909 < 1910 < 1913 and 1884 - 1822 == 62)
cierto('ficha: 6 bloques, 10 claves, sin repetir', len(vz['bloques']) == 6 and len(vz['claves']) == 10 and len({k[0] for k in vz['claves']}) == 10)
cierto('ficha: 2ⁿ gametos, 3ⁿ genotipos y 2ⁿ fenotipos (AaBb: 4, 9, 4)', '2ⁿ gametos, 3ⁿ genotipos y 2ⁿ fenotipos' in vz_txt and '4 gametos, 9 genotipos, 4 fenotipos' in vz_txt)
cierto('ficha: 3 : 1, 9 : 3 : 3 : 1, 1 : 1 : 1 : 1, 1 : 2 : 1, 2/3', all(s in vz_txt for s in ('3 : 1', '9 : 3 : 3 : 1', '1 : 1 : 1 : 1', '1 : 2 : 1', '2/3')))
cierto('ficha: tabla de leyes (¾ y ¼, ½ y ½) coincide con el modelo', '¾ dominante · ¼ recesivo' in vz_txt and '½ · ½' in vz_txt and cruce('Aa', 'aa')['aa'] == F(1, 2))
cierto('ficha: 1 % = 1 cM', '1 % de recombinación = 1 cm' in vz_txt)
cierto('ficha y teoría: la portadora transmite el alelo a la mitad de sus hijos', 'mitad de sus hijos' in vz_txt and 'al 50 % de sus hijos' in teoria_l)
tar = T['datos']['tarjetas1']['cartas']
cierto('tarjetas ≥ 14', len(tar) >= 14)
cierto('tarjetas: 2ⁿ, 3ⁿ, 2ⁿ', any('2ⁿ gametos, 3ⁿ genotipos y 2ⁿ fenotipos' in c['b'] for c in tar))
cierto('tarjetas: hijo sano de portadores 2/3', any('2/3' in c['b'] for c in tar))
cierto('tarjetas: letal 2 : 1', any('2 : 1' in c['b'] for c in tar))
lam = json.dumps(T['lamina'], ensure_ascii=False)
cierto('lámina: 3 : 1, 9 : 3 : 3 : 1, 1 : 2 : 1, 2 : 1, 1 : 1 : 1 : 1', all(s in lam for s in ('3 : 1', '9 : 3 : 3 : 1', '1 : 2 : 1', '2 : 1', '1 : 1 : 1 : 1')))

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
cierto('ejercicios numéricos con probabilidades ≥ 25', sum(1 for e in T['ejercicios'] if checks(e)[0]['tipo'] == 'num') >= 25)

if fallos:
    print('FALLOS:')
    for f in fallos:
        print('  -', f)
print('%d comprobaciones correctas, %d fallos' % (ok, len(fallos)))
sys.exit(1 if fallos else 0)
