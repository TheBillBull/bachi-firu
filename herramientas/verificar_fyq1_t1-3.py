#!/usr/bin/env python3
"""
Verificación independiente de Física y Química I, temas 1-3 (átomo, enlace, formulación).
No comparte código con la web: vuelve a teclear las tablas de datos, recalcula cada
respuesta numérica y valida los bancos y motores de la web contra ellas.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      node herramientas/volcar_fyq1.js > /tmp/fyq1_motores.json
      python3 herramientas/verificar_fyq1_t1-3.py /tmp/ampl.json /tmp/fyq1_motores.json
"""
import json, math, re, sys
import sympy as sp

amp = json.load(open(sys.argv[1]))['ampl']['fyq1']
mot = json.load(open(sys.argv[2]))
fallos, ok = [], 0

def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

def cerca(a, b, tol=1e-9): return abs(float(a) - float(b)) <= tol * max(1.0, abs(float(b)))

def valores(tema, id_):
    ej = {e['id']: e for e in amp[tema]['ejercicios']}[id_]
    c = ej['check']; c = c if isinstance(c, list) else [c]
    return c

def num(tema, id_, k=0): return valores(tema, id_)[k]['valor']

# =====================================================================
# TEMA 1 · Estructura atómica y sistema periódico
# =====================================================================
# Tabla propia (vuelta a teclear): Z: (símbolo, masa, electronegatividad, radio covalente pm, EI1 kJ/mol)
TAB = {
 1: ('H', 1.008, 2.20, 31, 1312), 2: ('He', 4.0026, None, None, 2372), 3: ('Li', 6.94, 0.98, 128, 520), 4: ('Be', 9.0122, 1.57, 96, 900),
 5: ('B', 10.81, 2.04, 84, 801), 6: ('C', 12.011, 2.55, 76, 1086), 7: ('N', 14.007, 3.04, 71, 1402), 8: ('O', 15.999, 3.44, 66, 1314),
 9: ('F', 18.998, 3.98, 57, 1681), 10: ('Ne', 20.180, None, None, 2081), 11: ('Na', 22.990, 0.93, 166, 496), 12: ('Mg', 24.305, 1.31, 141, 738),
 13: ('Al', 26.982, 1.61, 121, 578), 14: ('Si', 28.085, 1.90, 111, 787), 15: ('P', 30.974, 2.19, 107, 1012), 16: ('S', 32.06, 2.58, 105, 1000),
 17: ('Cl', 35.45, 3.16, 102, 1251), 18: ('Ar', 39.948, None, None, 1521), 19: ('K', 39.098, 0.82, 203, 419), 20: ('Ca', 40.078, 1.00, 176, 590),
 21: ('Sc', 44.956, 1.36, 170, 633), 22: ('Ti', 47.867, 1.54, 160, 659), 23: ('V', 50.942, 1.63, 153, 651), 24: ('Cr', 51.996, 1.66, 139, 653),
 25: ('Mn', 54.938, 1.55, 139, 717), 26: ('Fe', 55.845, 1.83, 132, 763), 27: ('Co', 58.933, 1.88, 126, 760), 28: ('Ni', 58.693, 1.91, 124, 737),
 29: ('Cu', 63.546, 1.90, 132, 745), 30: ('Zn', 65.38, 1.65, 122, 906), 31: ('Ga', 69.723, 1.81, 122, 579), 32: ('Ge', 72.630, 2.01, 120, 762),
 33: ('As', 74.922, 2.18, 119, 947), 34: ('Se', 78.971, 2.55, 120, 941), 35: ('Br', 79.904, 2.96, 120, 1140), 36: ('Kr', 83.798, 3.00, None, 1351),
 37: ('Rb', 85.468, 0.82, 220, 403), 38: ('Sr', 87.62, 0.95, 195, 550), 39: ('Y', 88.906, 1.22, 190, 600), 40: ('Zr', 91.224, 1.33, 175, 640),
 41: ('Nb', 92.906, 1.6, 164, 652), 42: ('Mo', 95.95, 2.16, 154, 684), 43: ('Tc', 98, 1.9, 147, 702), 44: ('Ru', 101.07, 2.2, 146, 710),
 45: ('Rh', 102.91, 2.28, 142, 720), 46: ('Pd', 106.42, 2.20, 139, 804), 47: ('Ag', 107.87, 1.93, 145, 731), 48: ('Cd', 112.41, 1.69, 144, 868),
 49: ('In', 114.82, 1.78, 142, 558), 50: ('Sn', 118.71, 1.96, 139, 709), 51: ('Sb', 121.76, 2.05, 139, 834), 52: ('Te', 127.60, 2.1, 138, 869),
 53: ('I', 126.90, 2.66, 139, 1008), 54: ('Xe', 131.29, 2.6, None, 1170)}
JS = {e['Z']: e for e in mot['quim']['EL']}
comprobar('t1 tabla: 54 elementos', len(JS) == 54 and set(JS) == set(TAB))
for Z, (s, m, en, r, ie) in TAB.items():
    e = JS[Z]
    comprobar(f't1 tabla Z={Z}', e['s'] == s and cerca(e['m'], m) and e['en'] == en and e['r'] == r and e['ie'] == ie, f"{e}")

# Configuraciones: construcción independiente (orden por n+l, luego n) y excepciones conocidas
def orden_llenado():
    sub = [(n, l) for n in range(1, 8) for l in range(0, 4) if l < n]
    return sorted(sub, key=lambda t: (t[0] + t[1], t[0]))
ORDEN = orden_llenado()
EXC = {24: {(4, 0): 1, (3, 2): 5}, 29: {(4, 0): 1, (3, 2): 10}, 41: {(5, 0): 1, (4, 2): 4}, 42: {(5, 0): 1, (4, 2): 5}, 44: {(5, 0): 1, (4, 2): 7},
       45: {(5, 0): 1, (4, 2): 8}, 46: {(5, 0): 0, (4, 2): 10}, 47: {(5, 0): 1, (4, 2): 10}}
def config(N, exc=True):
    cfg, resto = {}, N
    for (n, l) in ORDEN:
        if resto <= 0: break
        e = min(2 * (2 * l + 1), resto); cfg[(n, l)] = e; resto -= e
    if exc and N in EXC:
        for k, v in EXC[N].items(): cfg[k] = v
    return {k: v for k, v in cfg.items() if v > 0}
def catión(Z, q):
    cfg = config(Z); q0 = q
    for k in sorted(cfg, key=lambda t: (-t[0], -t[1])):
        d = min(cfg[k], q0); cfg[k] -= d; q0 -= d
    return {k: v for k, v in cfg.items() if v > 0}
SUP = {'⁰': 0, '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9}
def analiza(txt):
    """'[Ar] 4s² 3d⁶' o '1s² 2s²…' → dict {(n,l): e}, expandiendo el gas noble."""
    out = {}
    m = re.match(r'\[(\w+)\]', txt)
    if m:
        N = {'He': 2, 'Ne': 10, 'Ar': 18, 'Kr': 36, 'Xe': 54}[m.group(1)]
        out.update(config(N, False))
    for n, l, e in re.findall(r'(\d)([spdf])([⁰¹²³⁴⁵⁶⁷⁸⁹]+)', txt):
        out[(int(n), 'spdf'.index(l))] = int(''.join(str(SUP[c]) for c in e))
    return out
for Z in range(1, 55):
    comprobar(f't1 config Z={Z} (llenado)', analiza(mot['quim']['cfg'][str(Z)]) == config(Z), mot['quim']['cfg'][str(Z)])
    comprobar(f't1 config Z={Z} (abreviada)', analiza(mot['quim']['cfgAb'][str(Z)]) == config(Z) or Z == 2, mot['quim']['cfgAb'][str(Z)])
    c = config(Z)
    # posición independiente
    c0 = config(Z, False)                      # el periodo sale del llenado de Madelung (Pd acaba en 4d¹⁰ sin 5s)
    nmax = max(n for (n, l) in c0); ult = max(c0, key=lambda t: ORDEN.index(t))
    if Z == 2: g = 18
    elif ult[1] == 0: g = c.get((nmax, 0), 0)
    elif ult[1] == 1: g = 10 + c.get((nmax, 0), 0) + c.get((nmax, 1), 0)
    else: g = c.get((nmax, 0), 0) + c.get((nmax - 1, 2), 0)
    comprobar(f't1 posición Z={Z}', (JS[Z]['p'], JS[Z]['g']) == (nmax, g), f"{JS[Z]['p']},{JS[Z]['g']} vs {nmax},{g}")
    des = sum(v if v <= 2 * l + 1 else 2 * (2 * l + 1) - v for (n, l), v in c.items() for v in [v] for l in [l])
    des = sum((v if v <= (2 * l + 1) else 2 * (2 * l + 1) - v) for (n, l), v in c.items())
    comprobar(f't1 desapareados Z={Z}', mot['quim']['desapareados'][str(Z)] == des)
    nreal = max(n for (n, l) in c)             # capa más externa realmente ocupada (en Pd es la n = 4, con 18 e⁻)
    val = sum(v for (n, l), v in c.items() if n == nreal)
    comprobar(f't1 valencia Z={Z}', mot['quim']['valencia'][str(Z)] == val)
for k, txt in mot['quim']['ion'].items():
    Z, q = map(int, k.split(','))
    esperado = catión(Z, q) if q > 0 else config(Z - q, False)
    comprobar(f't1 ion {k}', analiza(txt) == esperado, txt)

# Isótopos del motor: abundancias suman 100 y masa media = tabla
for s, d in mot['quim']['ISOTOPOS'].items():
    iso = d['iso']; tot = sum(i[2] for i in iso)
    Z = [z for z, t in TAB.items() if t[0] == s][0]
    media = sum(i[1] * i[2] for i in iso) / tot
    comprobar(f't1 isótopos {s}', abs(tot - 100) < 0.02 and abs(media - TAB[Z][1]) < 0.02 and d['Z'] == Z and all(i[0] == round(i[1]) for i in iso), f'{media} vs {TAB[Z][1]}')

# Constantes y Bohr (independiente)
RH, h, c, e, NA = 1.097e7, 6.626e-34, 3.00e8, 1.602e-19, 6.022e23
def lam(ni, nf): return 1e9 / (RH * abs(1 / nf**2 - 1 / ni**2))
for k, v in mot['quim']['bohr'].items():
    ni, nf = map(int, k.split(','))
    comprobar(f't1 Bohr {k}', cerca(v['lambda'], lam(ni, nf), 1e-9) and cerca(v['E'], h * c / (lam(ni, nf) * 1e-9), 1e-9))
comprobar('t1 Bohr: Balmer α 656,3 · Lyman α 121,5 · Paschen α 1875 · β 486,2', [round(lam(3, 2), 1), round(lam(2, 1), 1), round(lam(4, 3)), round(lam(4, 2), 1)] == [656.3, 121.5, 1875, 486.2])
# energías de ionización sucesivas: el mayor salto da los electrones de valencia
VAL = {'Na': 1, 'Mg': 2, 'Al': 3, 'Si': 4, 'P': 5, 'Ca': 2}
for s, v in mot['quim']['IONSUC'].items():
    salto = max(range(1, len(v)), key=lambda i: v[i] / v[i - 1])
    comprobar(f't1 EI sucesivas {s}', salto == VAL[s] and all(v[i] > v[i - 1] for i in range(1, len(v))), str(v))
# semividas
RAD = {'c14': 5730, 'i131': 8.02, 'co60': 5.27, 'h3': 12.32, 'tc99': 6.01, 'u238': 4.468e9}
comprobar('t1 semividas', all(cerca(mot['quim']['RAD'][k]['T'], v) for k, v in RAD.items()))

# ---------------------------------------------------------------------
# Ejercicios t1
# ---------------------------------------------------------------------
t = 't1'
Eq = lambda i, k=0: num(t, i, k)
comprobar('t1 a1', 37 - 17 == Eq('a1') == 20)
comprobar('t1 a2', (26, 56 - 26, 26 - 3) == (Eq('a2', 0), Eq('a2', 1), Eq('a2', 2)))
comprobar('t1 a3', config(16)[(3, 1)] == Eq('a3') == 4)
comprobar('t1 a4', valores(t, 'a4')[0]['ok'] == 0 and valores(t, 'a4')[0]['opciones'][0] == '¹²C y ¹⁴C')
comprobar('t1 a5', sum(v for (n, l), v in config(15).items() if n == 3) == Eq('a5') == 5)
comprobar('t1 a6', (JS[19]['p'], JS[19]['g']) == (Eq('a6', 0), Eq('a6', 1)) == (4, 1))
r_al = {s: t_[3] for s, t_ in [(TAB[z][0], TAB[z]) for z in TAB]}
comprobar('t1 a7', valores(t, 'a7')[0]['opciones'][valores(t, 'a7')[0]['ok']] == min(['Na', 'Mg', 'Al', 'Cl'], key=lambda s: r_al[s]) == 'Cl')
comprobar('t1 a8', 12 - sum(v for (n, l), v in config(12).items() if n == 3) * 0 == 12 and Eq('a8') == 2 and sum(v for (n, l), v in config(12).items() if n == 3) == 2)
comprobar('t1 a9', 2 * (2 * 2 + 1) == Eq('a9') == 10)
comprobar('t1 a10', cerca(63 * 0.70 + 65 * 0.30, Eq('a10')) and cerca(Eq('a10'), 63.6))
comprobar('t1 a11', 3**2 == Eq('a11') == 9 and sum(2 * l + 1 for l in range(3)) == 9)
comprobar('t1 a12', 17 + 1 == 18 and valores(t, 'a12')[0]['opciones'][0] == 'Cl⁻' and sum(config(9).values()) + 1 == 10)
comprobar('t1 a13', sum(catión(26, 3).values()) == 23 and catión(26, 3)[(3, 2)] == 5 == Eq('a13', 0) and Eq('a13', 1) == 5)
comprobar('t1 a14', (config(24)[(4, 0)], config(24)[(3, 2)]) == (Eq('a14', 0), Eq('a14', 1)) == (1, 5))
c33 = config(33); comprobar('t1 a15', (10 + c33[(4, 0)] + c33[(4, 1)], c33[(4, 0)] + c33[(4, 1)]) == (Eq('a15', 0), Eq('a15', 1)) == (15, 5))
comprobar('t1 a16', 18 + 2 + 10 + 2 == Eq('a16') == 32 and TAB[32][0] == 'Ge')
m_mg = 23.985 * 0.7899 + 24.986 * 0.1000 + 25.983 * 0.1101; comprobar('t1 a17', cerca(m_mg, Eq('a17'), 5e-3) and abs(m_mg - 24.305) < 5e-3)
x = sp.Symbol('x'); sol = sp.solve(78.92 * x + 80.92 * (1 - x) - 79.90, x)[0]; comprobar('t1 a18', cerca(100 * sol, Eq('a18'), 5e-3))
comprobar('t1 a19', cerca(lam(3, 2), Eq('a19'), 5e-3))
comprobar('t1 a20', cerca(h * c / 656e-9 * 1e19, Eq('a20'), 5e-3))
comprobar('t1 a21', cerca(13.6 * e * NA / 1000, Eq('a21'), 5e-3) and cerca(13.6 * e * NA / 1000, mot['quim']['EL'][0]['ie'], 5e-3))
def slater(Z, nmax_cfg):
    pass
# Slater para ns np: misma capa 0,35; n−1: 0,85; ≤ n−2: 1,00
def zef(Z, objetivo_n):
    c = config(Z); S = 0.0
    misma = sum(v for (n, l), v in c.items() if n == objetivo_n and l <= 1) - 1
    S += 0.35 * misma + 0.85 * sum(v for (n, l), v in c.items() if n == objetivo_n - 1) + 1.00 * sum(v for (n, l), v in c.items() if n <= objetivo_n - 2)
    return Z - S
comprobar('t1 a22', cerca(zef(11, 3), Eq('a22'), 1e-9) and cerca(zef(11, 3), 2.2, 1e-9))
comprobar('t1 a23', cerca(zef(17, 3), Eq('a23'), 1e-9) and cerca(zef(17, 3), 6.1, 1e-9))
comprobar('t1 a24', valores(t, 'a24')[0]['opciones'][0] == 'Be' and TAB[4][4] > TAB[5][4])
ie = mot['quim']['IONSUC']['Mg']; comprobar('t1 a25', [738, 1451, 7733, 10543] == ie[:4] and max(range(1, 4), key=lambda i: ie[i] / ie[i - 1]) == Eq('a25') == 2)
comprobar('t1 a26', 2 * (2 * 2 + 1) == Eq('a26') == 10)
comprobar('t1 a27', valores(t, 'a27')[0]['ok'] == 1 and valores(t, 'a27')[0]['opciones'][1] == '(2, 2, 0, +½)')
comprobar('t1 a28', cerca(5730 * math.log2(100 / 25), Eq('a28')) and Eq('a28') == 11460)
comprobar('t1 a29', sum(v if v <= 2 * l + 1 else 4 * l + 2 - v for (n, l), v in catión(25, 2).items()) == Eq('a29') == 5)
rad_ion = {'O2-': 140, 'F-': 133, 'Na+': 102, 'Mg2+': 72}
comprobar('t1 a30', valores(t, 'a30')[0]['opciones'][valores(t, 'a30')[0]['ok']] == 'O²⁻' and max(rad_ion, key=rad_ion.get) == 'O2-' and all(sum(config(Z - q if q < 0 else Z).values()) - (q if q > 0 else 0) == 10 for Z, q in [(8, -2), (9, -1), (11, 1), (12, 2)]))
sol = sp.solve(62.93 * (1 - x) + 64.93 * x - 63.55, x)[0]; comprobar('t1 a31', cerca(100 * sol, Eq('a31'), 5e-3))
comprobar('t1 a32', cerca(lam(5, 2), Eq('a32'), 5e-3))
comprobar('t1 a33', cerca(1e9 / RH, Eq('a33'), 5e-3))
comprobar('t1 a34', cerca(lam(4, 2), Eq('a34'), 5e-3))
comprobar('t1 a35', cerca(c / (656.3e-9) / 1e14, Eq('a35'), 5e-3))
comprobar('t1 a36', TAB[12][4] > TAB[11][4] and TAB[12][4] > TAB[13][4] and cerca(zef(11, 3), 2.2) and cerca(zef(12, 3), 2.85))
comprobar('t1 a37', config(24, False)[(3, 2)] == 4 and config(24)[(3, 2)] == 5 and config(29)[(3, 2)] == 10)
comprobar('t1 a38', (166 > 102, 102 < 181, 'Na+' in rad_ion))
comprobar('t1 a39', sum([2, 8, 2]) == Eq('a39') == 12)
c26 = config(26); comprobar('t1 a40', (sum(c26.values()), max(n for n, l in c26), c26[(4, 0)] + c26[(3, 2)]) == (Eq('a40', 0), Eq('a40', 1), Eq('a40', 2)) == (26, 4, 8))
comprobar('t1 a41', 738 + 1451 == Eq('a41') == 2189)
comprobar('t1 a42', cerca(13.6 / 4, Eq('a42')))
m_ne = 19.992 * 0.9048 + 20.994 * 0.0027 + 21.991 * 0.0925; comprobar('t1 a44', cerca(m_ne, Eq('a44'), 5e-3))
mel = 9.109e-31; comprobar('t1 a45', cerca(h / (mel * 1.0e6) * 1e9, Eq('a45'), 5e-3))
comprobar('t1 a46', cerca(h / (4 * math.pi) / (mel * 1e-10) / 1e5, Eq('a46'), 5e-3))
comprobar('t1 a47', cerca(200 * 0.5 ** (16.04 / 8.02), Eq('a47'), 1e-3))
# Ejercicios: nº y niveles
ej1 = amp['t1']['ejercicios']
comprobar('t1 ejercicios ≥ 36 y de los tres niveles', len(ej1) >= 36 and {e['nivel'] for e in ej1} == {1, 2, 3} and len({e['id'] for e in ej1}) == len(ej1))

# ---------------------------------------------------------------------
# Teoría t1: cifras de los ejemplos
# ---------------------------------------------------------------------
comprobar('t1 teoría: electrones del C-12', cerca(6 * 0.000549 / 12, 2.7e-4, 0.03) and cerca(6 * 0.000549, 0.00329, 5e-3))
comprobar('t1 teoría: masa media Cl y Mg', cerca(34.9689 * 0.7576 + 36.9659 * 0.2424, 35.45, 5e-4) and cerca(23.985 * 0.7899 + 24.986 * 0.1 + 25.983 * 0.1101, 24.305, 1e-4))
comprobar('t1 teoría: Br abundancias', cerca(sp.solve(78.92 * x + 80.92 * (1 - x) - 79.90, x)[0], 0.51, 1e-3))
p35, p37 = 0.7576, 0.2424; comprobar('t1 teoría: Cl2', [round(p35**2, 3), round(2 * p35 * p37, 3), round(p37**2, 3)] == [0.574, 0.367, 0.059])
comprobar('t1 teoría: semividas', 3 * 5730 == 17190 and cerca(5730 * math.log2(100 / 12.5), 17190) and cerca(100 * 0.5 ** (24 / 8.02), 12.6, 5e-3) and 800 * 0.5 ** 3 == 100 and 800 - 100 == 700)
comprobar('t1 teoría: Zef Na, Cl, Mg, Al', [round(zef(Z, 3), 2) for Z in (11, 17, 12, 13)] == [2.2, 6.1, 2.85, 3.5])
comprobar('t1 teoría: cocientes EI de Al', [round(1817 / 578, 1), round(2745 / 1817, 1), round(11577 / 2745, 1)] == [3.1, 1.5, 4.2])
comprobar('t1 teoría: Bohr 3→2 y ionización', cerca(lam(3, 2), 656.3, 5e-4) and cerca(c / (lam(3, 2) * 1e-9) / 1e14, 4.571, 1e-3) and cerca(h * c / (lam(3, 2) * 1e-9), 3.03e-19, 5e-3) and cerca(h * c / (lam(3, 2) * 1e-9) / e, 1.89, 5e-3)
          and cerca(13.6 * e, 2.18e-18, 5e-3) and cerca(13.6 * e * NA / 1000, 1312, 5e-3))
comprobar('t1 teoría: absorción 1→3', cerca(lam(3, 1), 102.55, 1e-3) and cerca(13.6 * 8 / 9, 12.09, 1e-3))
comprobar('t1 teoría: series (límites)', [round(1e9 / RH * n**2, 1) for n in (1, 2, 3, 4, 5)] == [91.2, 364.6, 820.4, 1458.5, 2278.9] and [round(lam(n + 1, n), 1) for n in (1, 2, 3, 4, 5)] == [121.5, 656.3, 1875.2, 4051.5, 7458.4])
comprobar('t1 teoría: niveles y radios de Bohr', [round(-13.6 / n**2, 2) for n in (1, 2, 3, 4, 5)] == [-13.6, -3.4, -1.51, -0.85, -0.54] and [round(0.0529 * n**2, 4) for n in (1, 2, 3, 4, 5)] == [0.0529, 0.2116, 0.4761, 0.8464, 1.3225])
comprobar('t1 teoría: sodio 589 nm', cerca(h * c / 589e-9, 3.38e-19, 5e-3) and cerca(h * c / 589e-9 / e, 2.11, 5e-3) and cerca(h * c / 589e-9 * NA / 1000, 203, 5e-3))
comprobar('t1 teoría: fotón violeta, De Broglie, incertidumbre', cerca(h * c / 400e-9, 4.97e-19, 5e-3) and cerca(h * c / 400e-9 / e, 3.10, 5e-3) and cerca(h / (mel * 1e6), 7.27e-10, 5e-3) and cerca(h / (0.145 * 40), 1.14e-34, 5e-3)
          and cerca(math.sqrt(2 * e * 100 / mel), 5.93e6, 5e-3) and cerca(h / (mel * math.sqrt(2 * e * 100 / mel)), 1.23e-10, 5e-3) and cerca(h / (4 * math.pi), 5.27e-35, 5e-3)
          and cerca(h / (4 * math.pi) / (mel * 1e-10), 5.8e5, 1e-2) and cerca(h / (4 * math.pi) / (0.145 * 1e-3), 3.6e-31, 1e-2))
comprobar('t1 teoría: problemas PAU', sum([2, 2, 6, 2, 6, 2, 7]) == 27 and cerca(1.097e7 * (1 / 4 - 1 / 16), 2.057e6, 1e-3) and cerca(lam(4, 2), 486.2, 1e-3) and cerca(13.6 * (1 / 4 - 1 / 16), 2.55, 1e-3)
          and cerca(sp.solve(62.93 * x + 64.93 * (1 - x) - 63.55, x)[0], 0.69, 1e-2) and cerca(h * c / (13.6 * e) * 1e9, 91.2, 5e-3))
comprobar('t1 teoría: isótopos de los ejemplos (nucleones)', [27 - 13, 32 - 16, 56 - 26] == [14, 16, 30] and [13 - 3, 16 + 2, 26 - 2] == [10, 18, 24])
comprobar('t1 teoría: relaciones isótopos/isóbaros/isótonos/isoelectrónicos', (13 - 6 == 14 - 7 == 7) and (39 - 19 == 40 - 20 == 20) and (11 - 1 == 10) and (12 - 2 == 10) and (16 + 2 == 18 == 18))
comprobar('t1 quiz: valores', cerca(10.01 * 0.2 + 11.01 * 0.8, 10.81, 1e-3) and cerca(13.6 * (1 - 1 / 16), 12.75, 1e-3) and [round(13.6 * (1 / 4 - 1 / 9), 2), round(13.6 * (1 / 9 - 1 / 25), 2), round(13.6 * 0.75, 1)] == [1.89, 0.97, 10.2] and round(4562 / 496, 1) == 9.2 and 59 - 27 == 32 and 27 - 3 == 24)

# =====================================================================
# TEMA 2 · Enlace químico (ampliaciones/contenido/fyq1_t02*.js + lab_enlace*.js)
# Datos y cálculos vueltos a teclear: no se comparte código con la web.
# =====================================================================
import itertools
from math import gcd, exp, sqrt, cos, sin, pi as PI, acos, degrees, log
ENm = mot['enlace']
EN_ = {TAB[z][0]: TAB[z][2] for z in TAB if TAB[z][2] is not None}
EN_.update({'Cs': 0.79})
METALES = {'Li', 'Na', 'K', 'Rb', 'Cs', 'Be', 'Mg', 'Ca', 'Sr', 'Ba', 'Al', 'Fe', 'Cu', 'Zn', 'Ag'}
def tipo_enlace(a, b):
    if a in METALES and b in METALES: return 'metalico'
    d = abs(EN_[a] - EN_[b])
    if (a in METALES) != (b in METALES): return 'ionico' if d >= 1.7 else 'polar'
    return 'apolar' if d < 0.4 else 'polar'
SIMB = {z: TAB[z][0] for z in TAB}
for z1, z2, d_web, pct_web, clave in ENm['pares']:
    a, b = SIMB[z1], SIMB[z2]
    d = abs(EN_[a] - EN_[b])
    comprobar(f't2 Δχ {a}–{b}', cerca(d_web, d, 1e-9) and cerca(pct_web, 100 * (1 - exp(-d * d / 4)), 1e-9), f'{d_web} vs {d}')
    comprobar(f't2 tipo {a}–{b}', clave == tipo_enlace(a, b), f'{clave} vs {tipo_enlace(a, b)}')

# ---- Lewis: electrones de valencia, pares, cargas formales, octeto ----
VAL = {'H': 1, 'Li': 1, 'Be': 2, 'B': 3, 'C': 4, 'N': 5, 'O': 6, 'F': 7, 'Na': 1, 'Mg': 2, 'Al': 3, 'Si': 4, 'P': 5, 'S': 6, 'Cl': 7, 'K': 1, 'Ca': 2, 'Br': 7, 'I': 7, 'Xe': 8, 'Kr': 8, 'Ar': 8}
def ev_formula(f, q):
    """'CO2', 'NH4^+', 'SO4^2-' → electrones de valencia totales."""
    f = re.sub(r'\^.*$', '', f)
    return sum(VAL[s] * (int(n) if n else 1) for s, n in re.findall(r'([A-Z][a-z]?)(\d*)', f)) - q
for k, m in ENm['MOL'].items():
    at, bd, q = m['a'], m['b'], m['q']
    tot = ev_formula(m['f'], q)
    sim = [s for s, lp, ue in at]
    comprobar(f't2 Lewis {m["f"]}: nº de átomos y fórmula', sorted(sim) == sorted(s for s, n in re.findall(r'([A-Z][a-z]?)(\d*)', re.sub(r'\^.*$', '', m['f'])) for _ in range(int(n) if n else 1)))
    ncomp = sum(2 * lp + ue for s, lp, ue in at) + sum(2 * o for i, j, o in bd)
    comprobar(f't2 Lewis {m["f"]}: electrones contados = valencia total', ncomp == tot == m['analisis']['total'] == m['analisis']['cuenta'], f'{ncomp} vs {tot}')
    fc = []
    for i, (s, lp, ue) in enumerate(at):
        enl = sum(o for a_, b_, o in bd if i in (a_, b_))
        fc.append(VAL[s] - (2 * lp + ue + enl))
    comprobar(f't2 Lewis {m["f"]}: cargas formales', fc == m['analisis']['fc'] and sum(fc) == q, f'{fc} vs {m["analisis"]["fc"]}')
    for i, (s, lp, ue) in enumerate(at):
        e = 2 * lp + ue + 2 * sum(o for a_, b_, o in bd if i in (a_, b_))
        obj = 2 if s == 'H' else 8
        cls = 'radical' if ue % 2 else ('completo' if e == obj else ('expandido' if e > obj else 'incompleto'))
        comprobar(f't2 Lewis {m["f"]}: octeto de {s}{i}', cls == m['analisis']['octeto'][i], f'{cls} vs {m["analisis"]["octeto"][i]}')
    # geometría: dominios del átomo con más vecinos (el central) frente a la clave n,m de la web
    if m['g']:
        vec = [sum(1 for a_, b_, o in bd if i in (a_, b_)) for i in range(len(at))]
        c = max(range(len(at)), key=lambda i: (vec[i], at[i][1]))
        comprobar(f't2 TRPECV {m["f"]}: dominios del átomo central', m['g'] == f'{vec[c]},{at[c][1]}', f"{m['g']} vs {vec[c]},{at[c][1]}")

# ---- TRPECV: tabla propia (nombre, ángulo ideal, hibridación) y vectores propios ----
VS = {(2, 0): ('lineal', 180, 'sp'), (3, 0): ('trigonal plana', 120, 'sp²'), (2, 1): ('angular', 120, 'sp²'), (4, 0): ('tetraédrica', 109.5, 'sp³'),
      (3, 1): ('pirámide trigonal', 109.5, 'sp³'), (2, 2): ('angular', 109.5, 'sp³'), (5, 0): ('bipirámide trigonal', 90, 'sp³d'),
      (4, 1): ('balancín (tetraedro distorsionado)', 90, 'sp³d'), (3, 2): ('forma de T', 90, 'sp³d'), (2, 3): ('lineal', 180, 'sp³d'),
      (6, 0): ('octaédrica', 90, 'sp³d²'), (5, 1): ('pirámide cuadrada', 90, 'sp³d²'), (4, 2): ('plana cuadrada', 90, 'sp³d²')}
for key, g in ENm['GEOM'].items():
    if g['n'] == 1: continue
    n, mm = map(int, key.split(','))
    nom, ang, hib = VS[(n, mm)]
    comprobar(f't2 GEOM {key}', g['nombre'] == nom and g['hib'] == hib and g['sn'] == n + mm, f"{g['nombre']} {g['hib']}")
    if (n, mm) in [(2, 0), (3, 0), (4, 0), (6, 0)]:
        comprobar(f't2 GEOM {key}: ángulo', cerca(g['angulos'][0], ang, 1e-3), str(g['angulos']))
    # el número de híbridos coincide con el nº de dominios: sp→2, sp²→3, sp³→4, sp³d→5, sp³d²→6
    comprobar(f't2 GEOM {key}: híbridos = dominios', {'sp': 2, 'sp²': 3, 'sp³': 4, 'sp³d': 5, 'sp³d²': 6}[hib] == n + mm)
ax, eq_ = (0, 0, 1), [(cos(2 * PI * k / 3), sin(2 * PI * k / 3), 0) for k in range(3)]
VEC = {(1, 0): [(1, 0, 0)], (2, 0): [(1, 0, 0), (-1, 0, 0)], (3, 0): [(cos(PI / 2 + 2 * PI * k / 3), sin(PI / 2 + 2 * PI * k / 3), 0) for k in range(3)],
       (2, 1): [(cos(PI / 2 + PI / 3), sin(PI / 2 + PI / 3), 0), (cos(PI / 2 - PI / 3), sin(PI / 2 - PI / 3), 0)],
       (4, 0): [(1, 1, 1), (1, -1, -1), (-1, 1, -1), (-1, -1, 1)], (3, 1): [(1, 1, 1), (1, -1, -1), (-1, 1, -1)], (2, 2): [(1, 1, 1), (1, -1, -1)],
       (5, 0): [ax, (0, 0, -1)] + eq_, (4, 1): [ax, (0, 0, -1), eq_[0], eq_[1]], (3, 2): [ax, (0, 0, -1), eq_[0]], (2, 3): [ax, (0, 0, -1)],
       (6, 0): [(1, 0, 0), (-1, 0, 0), (0, 1, 0), (0, -1, 0), (0, 0, 1), (0, 0, -1)], (5, 1): [(1, 0, 0), (-1, 0, 0), (0, 1, 0), (0, -1, 0), (0, 0, 1)],
       (4, 2): [(1, 0, 0), (-1, 0, 0), (0, 1, 0), (0, -1, 0)]}
def unit(v): n = sqrt(sum(x * x for x in v)); return tuple(x / n for x in v)
def ang(u, v): return degrees(acos(max(-1, min(1, sum(a * b for a, b in zip(unit(u), unit(v)))))))
for key, vs in VEC.items():
    if key == (1, 0): continue
    angs = sorted({round(ang(u, v), 1) for u, v in itertools.combinations(vs, 2)})
    comprobar(f't2 GEOM {key}: ángulos ideales entre ligandos', angs == sorted({round(a, 1) for a in ENm['GEOM'][f'{key[0]},{key[1]}']['angulos']}), f'{angs}')

# ---- Polaridad: suma vectorial propia de los dipolos de enlace ----
for k, p in ENm['POL'].items():
    n_, m_ = map(int, p['g'].split(','))
    vs = VEC[(n_, m_)]
    deltas = [EN_[l] - EN_[p['c']] for l in p['l']]
    s = [sum(d * unit(v)[i] for d, v in zip(deltas, vs)) for i in range(3)]
    mag = sqrt(sum(x * x for x in s))
    comprobar(f't2 polaridad {k}', cerca(mag, p['mag'], 1e-6) and (mag > 1e-9) == p['polar'], f"{mag} vs {p['mag']}")
# polaridad de la teoría (tabla de la sección 8 y problemas)
POLTEO = {'co2': False, 'h2o': True, 'bf3': False, 'nh3': True, 'ccl4': False, 'chcl3': True, 'sf6': False, 'sf4': True, 'xef4': False, 'so2': True, 'xef2': False}
for k, v in POLTEO.items(): comprobar(f't2 teoría: polaridad de {k}', ENm['POL'][k]['polar'] == v)

# ---- Red iónica: Kapustinskii, cociente de radios, índice de coordinación ----
CAT = {c[0]: (c[1], c[2]) for c in ENm['CATIONES']}
ANI = {a[0]: (a[1], a[2]) for a in ENm['ANIONES']}
def kap(rp, rm, x, y, nu): d = rp + rm; return 120250 * nu * x * y / d * (1 - 34.5 / d)
def cn(r):
    r = min(r, 1 / r)                                   # pequeño/grande: la regla de los radios no admite cocientes > 1
    return 3 if r < 0.225 else 4 if r < 0.414 else 6 if r < 0.732 else 8
n_sales = 0
for cat, (x, rp) in CAT.items():
    for an, (y, rm) in ANI.items():
        g = gcd(x, y); nu = (y + x) // g
        f = cat + (str(y // g) if y // g > 1 else '') + an + (str(x // g) if x // g > 1 else '')
        s = ENm['SALES'][f]; n_sales += 1
        comprobar(f't2 red {f}', s['d'] == rp + rm and s['nu'] == nu and cerca(s['kap'], kap(rp, rm, x, y, nu), 1e-9) and cerca(s['razon'], rp / rm, 1e-9) and s['cn'] == cn(rp / rm), str(s))
comprobar('t2 red: nº de sales', n_sales == len(ENm['SALES']) == 60)
RET_PROPIAS = {'NaCl': (787, 801), 'LiF': (1036, 845), 'MgO': (3791, 2852), 'CsCl': (659, 645), 'KCl': (715, 770), 'NaF': (923, 993), 'KF': (821, 858), 'KBr': (682, 734)}
for f, v in RET_PROPIAS.items():
    if v: comprobar(f't2 energía reticular de tablas {f}', ENm['RET'][f] == list(v), str(ENm['RET'][f]))
# Born–Haber: U = Σ pasos − ΔHf, con los datos reescritos
BHP = {'NaCl': ([107, 496, 122, -349], -411, 787), 'KCl': ([89, 419, 122, -349], -437, 718), 'LiF': ([159, 520, 79, -328], -617, 1047), 'NaF': ([107, 496, 79, -328], -574, 928),
       'MgO': ([148, 738 + 1451, 249, -141, 744], -602, 3791), 'MgCl2': ([148, 738 + 1451, 2 * 122, 2 * -349], -641, 2524), 'CaCl2': ([178, 590 + 1145, 2 * 122, 2 * -349], -795, 2254)}
for f, (ps, hf, U) in BHP.items():
    b = ENm['BH'][f]
    comprobar(f't2 Born–Haber {f}', b['pasos'] == ps and b['hf'] == hf and b['U'] == sum(ps) - hf == U, str(b))
# ---- Propiedades y clasificación de sustancias ----
for s in ENm['SUST']:
    cs, cf, m_, tf = s['cs'], s['cf'], s['m'], s['tf']
    if cs and m_: cl = 'metalico'
    elif cs: cl = 'reticular'
    elif cf: cl = 'ionico'
    else: cl = 'reticular' if tf > 1500 else 'molecular'
    comprobar(f't2 sustancia {s["f"]}', s['clase'] == cl == s['tipo'], f"{s['clase']} {cl} {s['tipo']}")
# ---- Fuerzas intermoleculares: puntos de ebullición (retecleados) ----
FZ = {'g14': [-162, -112, -88, -52], 'g15': [-33, -88, -62, -17], 'g16': [100, -60, -41, -2], 'g17': [20, -85, -67, -35], 'nobles': [-269, -246, -186, -153, -108],
      'halogenos': [-188, -34, 59, 184], 'alcanos': [-162, -89, -42, -1, 36, 69, 98, 126, 151, 174]}
for k, v in FZ.items(): comprobar(f't2 fuerzas {k}', ENm['FZA'][k]['y'] == v)
for k in ('nobles', 'halogenos', 'alcanos'): comprobar(f't2 fuerzas {k}: crece con el tamaño', all(a < b for a, b in zip(FZ[k], FZ[k][1:])))
comprobar('t2 fuerzas: el grupo 16 sin el agua crece hacia abajo, y el agua rompe la tendencia', FZ['g16'][1] < FZ['g16'][2] < FZ['g16'][3] and FZ['g16'][0] > FZ['g16'][3])
x_ = [3, 4, 5]; y_ = [-60, -41, -2]; mx = sum(x_) / 3; my = sum(y_) / 3
pend = sum((a - mx) * (b - my) for a, b in zip(x_, y_)) / sum((a - mx) ** 2 for a in x_)
comprobar('t2 teoría: el agua extrapolada hervería hacia −90 °C', round(my + pend * (2 - mx)) == -92 and -95 < my + pend * (2 - mx) < -85)
for t_, d_ in [('Pentano', [36, 28, 9.5]), ('C₂H₆O', [78, -24])]:
    comprobar(f't2 isómeros {t_}', any(i['t'].startswith(t_) and [x[1] for x in i['d']] == d_ for i in ENm['ISOMEROS']))
comprobar('t2 teoría: etanol − éter = 102 °C; HF − HCl = 105 °C', 78 - (-24) == 102 and 20 - (-85) == 105)
# ---- σ y π ----
SP = {'CH4': (4, 0), 'C2H6': (7, 0), 'C2H4': (5, 1), 'C2H2': (3, 2), 'N2': (1, 2), 'O2': (1, 1), 'CO2': (2, 2), 'HCN': (2, 2), 'CH2O': (3, 1), 'H2O': (2, 0), 'NH3': (3, 0), 'BF3': (3, 0), 'C6H6': (12, 3), 'CH3COOH': (7, 1)}
for f, (sg, pp) in SP.items():
    comprobar(f't2 σ/π {f}', (ENm['SIGPI'][f]['sigma'], ENm['SIGPI'][f]['pi']) == (sg, pp), str(ENm['SIGPI'][f]))
# el número de enlaces σ es el número de enlaces entre átomos
for f, atomos in {'CH4': 5, 'C2H6': 8, 'C2H4': 6, 'C2H2': 4, 'N2': 2, 'CO2': 3, 'HCN': 3, 'CH2O': 4, 'H2O': 3, 'NH3': 4}.items():
    if f in ('C2H6', 'C2H4', 'C2H2', 'CH4', 'H2O', 'NH3', 'CO2', 'HCN', 'CH2O', 'N2'):
        comprobar(f't2 σ de {f} = nº de enlaces del grafo', SP[f][0] == atomos - 1 or f in ('C2H4', 'C2H6'), f'{SP[f][0]} vs {atomos - 1}')

# ---------------------------------------------------------------------
# Ejercicios t2 (cada respuesta, recalculada)
# ---------------------------------------------------------------------
t = 't2'
Eq = lambda i, k=0: num(t, i, k)
def lp_(f, s): return next(a[1] for k, m in ENm['MOL'].items() if m['f'] == f for a in m['a'] if a[0] == s)
Op = lambda i, k=0: valores(t, i)[k]['opciones'][valores(t, i)[k]['ok']]
E_ = EN_
comprobar('t2 a1', cerca(E_['Cl'] - E_['H'], Eq('a1')) and tipo_enlace('H', 'Cl') == 'polar')
comprobar('t2 a2', Op('a2') == 'Iónico' and tipo_enlace('K', 'Br') == 'ionico' and cerca(E_['Br'] - E_['K'], 2.14))
comprobar('t2 a3', (ev_formula('H2S', 0), 6 - 2) == (Eq('a3', 0), 2 * Eq('a3', 1)) and Eq('a3', 1) == 2)
comprobar('t2 a4', 2 + Eq('a4') * (-1) == 0 and Eq('a4') == 2)
comprobar('t2 a5', Op('a5', 0) == 'Tetraédrica' and VS[(4, 0)][0].startswith('tetra') and cerca(Eq('a5', 1), degrees(acos(-1 / 3)), 1e-3) and round(degrees(acos(-1 / 3)), 1) == 109.5)
comprobar('t2 a6', (1, 2) == (Eq('a6', 0), Eq('a6', 1)) == (SP['N2'][0], SP['N2'][1]))
comprobar('t2 a7', Op('a7') == 'NH₃' and 'NH₃' not in ('CH₄', 'H₂S', 'HCl'))
comprobar('t2 a8', Op('a8') == 'NaCl')
comprobar('t2 a9', 5 - 3 == 2 and lp_('NH3', 'N') == Eq('a9') == 1)
comprobar('t2 a10', Op('a10') == 'sp²' and VS[(3, 0)][2] == 'sp²')
comprobar('t2 a11', ev_formula('CO2', 0) == Eq('a11') == 16)
comprobar('t2 a12', Op('a12') == 'Kr' and FZ['nobles'][1] < FZ['nobles'][2] < FZ['nobles'][3])
comprobar('t2 a13', Eq('a13') == 3 == VAL['Al'])
comprobar('t2 a14', ENm['MOL']['o2']['b'][0][2] == Eq('a14') == 2)
comprobar('t2 a15', Op('a15') == 'SiO₂' and [s['clase'] for s in ENm['SUST'] if s['f'] == 'SiO2'] == ['reticular'])
comprobar('t2 b1', (3 * 2, 2 * 3) == (6, 6) and (Eq('b1', 0), Eq('b1', 1)) == (3, 2) and 3 * 2 - 2 * 3 == 0)
comprobar('t2 b2', ev_formula('NO3', -1) == Eq('b2', 0) == 24 and 5 - (0 + 4) == Eq('b2', 1) == 1)
comprobar('t2 b3', Op('b3') == 'NH₃' and ENm['MOL']['nh3']['g'] == '3,1' and all(ENm['MOL'][k]['g'] == '4,0' for k in ('ch4', 'nh4')))
comprobar('t2 b4', Op('b4') == 'CCl₄' and not ENm['POL']['ccl4']['polar'] and ENm['POL']['chcl3']['polar'] and ENm['POL']['h2o']['polar'])
comprobar('t2 b5', Op('b5') == 'sp' and ENm['MOL']['hcn']['g'] == '2,0')
comprobar('t2 b6', (9, 3) == (Eq('b6', 0), Eq('b6', 1)) and 5 + 1 + 1 + 1 + 1 == 9 and 1 + 2 == 3 and 4 + 5 + 1 == 10 and 10 - 1 == 9)
comprobar('t2 b7', valores(t, 'b7')[0]['ok'] == 0 and FZ['alcanos'][2] < 20 < 78)
comprobar('t2 b8', cerca(Eq('b8'), (2 * 2 / (72 + 140)) / (1 / (102 + 181)), 1e-2) and cerca(3791 / 787, 4.82, 5e-3) and cerca(4 * 283 / 212, 5.34, 1e-3))
comprobar('t2 b9', 436 + 158 - 2 * 567 == Eq('b9') == -540)
comprobar('t2 b10', 2 * 436 + 498 - 4 * 463 == Eq('b10') == -482)
comprobar('t2 b11', 89 + 419 + 122 - 349 + 437 == Eq('b11') == 718 == ENm['BH']['KCl']['U'])
comprobar('t2 b12', 'deslocaliz' in valores(t, 'b12')[0]['opciones'][valores(t, 'b12')[0]['ok']])
comprobar('t2 b13', 7 - 3 == 4 and (7 - 3) // 2 == Eq('b13') == 2 and ENm['MOL']['clf3']['g'] == '3,2')
comprobar('t2 b14', Op('b14') == 'Lineal' and ENm['MOL']['xef2']['g'] == '2,3' and VS[(2, 3)][0] == 'lineal')
comprobar('t2 b15', 20 - (-85) == Eq('b15') == 105)
comprobar('t2 b16', Op('b16') == 'Covalente reticular')
comprobar('t2 b17', (2 + 1) / 2 == Eq('b17') == 1.5)
comprobar('t2 b18', Op('b18') == 'Pentano' and 36 > 9.5)
# c-ejercicios
fc_o3 = sorted([6 - (2 + 3), 6 - (4 + 2), 6 - (6 + 1)])
comprobar('t2 c1', fc_o3 == sorted(valores(t, 'c1')[0]['valores']) == [-1, 0, 1] and sum(fc_o3) == 0 and sorted(ENm['MOL']['o3']['analisis']['fc']) == [-1, 0, 1])
comprobar('t2 c2', ev_formula('SO4', -2) == Eq('c2', 0) == 32 and 6 - (0 + 4) == Eq('c2', 1) == 2 and 2 + 4 * (6 - (6 + 1)) == -2)
comprobar('t2 c3', Op('c3') == 'Plana cuadrada' and ev_formula('ICl4', -1) == 36 and (36 - 2 * 4 - 4 * 6) == 4 and VS[(4, 2)][0] == 'plana cuadrada')
comprobar('t2 c4', Op('c4') == 'SF₄' and ENm['POL']['sf4']['polar'] and not any(ENm['POL'][k]['polar'] for k in ('sf6', 'xef4', 'xef2')))
mu_ion = 1.602e-19 * 92e-12 / 3.336e-30
comprobar('t2 c5', cerca(100 * 1.82 / mu_ion, Eq('c5'), 5e-3) and round(100 * 1.82 / mu_ion, 1) == 41.2)
comprobar('t2 c6', cerca(kap(102, 133, 1, 1, 2), Eq('c6'), 2e-3) and round(kap(102, 133, 1, 1, 2)) == 873)
comprobar('t2 c7', 178 + (590 + 1145) + 2 * 122 + 2 * -349 + 795 == Eq('c7') == 2254 == ENm['BH']['CaCl2']['U'])
comprobar('t2 c8', 4 * 413 + 614 + 3 * 498 - (4 * 799 + 4 * 463) == Eq('c8') == -1288 and (4 * 413 + 614 + 3 * 498, 4 * 799 + 4 * 463) == (3760, 5048))
comprobar('t2 c9', FZ['g14'][0] < FZ['g17'][1] < FZ['g17'][0] < FZ['g16'][0] and valores(t, 'c9')[0]['ok'] == 0)
comprobar('t2 c10', cerca(100 * (1 - exp(-(3.98 - 0.79) ** 2 / 4)), Eq('c10'), 5e-3) and round(100 * (1 - exp(-(3.98 - 0.79) ** 2 / 4)), 1) == 92.1)
ur = {'CsCl': 659, 'NaCl': 787, 'LiF': 1036, 'MgO': 3791}
comprobar('t2 c11', sorted(ur, key=ur.get) == ['CsCl', 'NaCl', 'LiF', 'MgO'] and [ENm['RET'][k][0] for k in ('CsCl', 'NaCl', 'LiF', 'MgO')] == [659, 787, 1036, 3791] and 76 + 133 == 209 and 167 + 181 == 348)
comprobar('t2 c15', cerca(2 * 463 / 40.7, Eq('c15'), 2e-3))
comprobar('t2 c16', cerca(0.5 * 945, Eq('c16')) and 14 / 28 == 0.5)
ej2 = amp['t2']['ejercicios']
comprobar('t2 ejercicios ≥ 40 y de los tres niveles', len(ej2) >= 40 and {e['nivel'] for e in ej2} == {1, 2, 3} and len({e['id'] for e in ej2}) == len(ej2) and all(e.get('pasos') and e.get('resultado') for e in ej2))

# ---------------------------------------------------------------------
# Teoría t2: cifras de los ejemplos y de las tablas
# ---------------------------------------------------------------------
comprobar('t2 teoría: Δχ de la tabla', [round(abs(E_['O'] - E_['C']), 2), round(E_['Cl'] - E_['Na'], 2), round(E_['O'] - E_['Mg'], 2), round(E_['F'] - E_['H'], 2), round(E_['Cl'] - E_['H'], 2), round(E_['C'] - E_['H'], 2)] == [0.89, 2.23, 2.13, 1.78, 0.96, 0.35])
comprobar('t2 teoría: KBr, HBr', round(E_['Br'] - E_['K'], 2) == 2.14 and round(E_['Br'] - E_['H'], 2) == 0.76 and round(E_['Cl'] - E_['Al'], 2) == 1.55)
comprobar('t2 teoría: carácter iónico NaCl 71 % y HCl 21 %', round(100 * (1 - exp(-2.23 ** 2 / 4))) == 71 and round(100 * (1 - exp(-0.96 ** 2 / 4))) == 21)
comprobar('t2 teoría: balance Na→Na⁺ y Cl→Cl⁻', 496 - 349 == 147)
comprobar('t2 teoría: cociente de radios NaCl 0,56 y CsCl 0,92', round(102 / 181, 2) == 0.56 and round(167 / 181, 2) == 0.92 and cn(102 / 181) == 6 and cn(167 / 181) == 8)
comprobar('t2 teoría: MgO ≈ 4,8 veces NaCl; LiF > NaF > KF', round(3791 / 787, 1) == 4.8 and ENm['RET']['LiF'][0] > ENm['RET']['NaF'][0] > ENm['RET']['KF'][0] and (1036, 923, 821) == tuple(ENm['RET'][k][0] for k in ('LiF', 'NaF', 'KF')))
comprobar('t2 teoría: Born–Haber NaCl 787', 107 + 496 + 122 - 349 + 411 == 787)
comprobar('t2 teoría: Born–Haber MgO 3791', 148 + 2189 + 249 - 141 + 744 + 602 == 3791 and 738 + 1451 == 2189)
comprobar('t2 teoría: Kapustinskii KCl 672', cerca(kap(138, 181, 1, 1, 2), 672.4, 1e-3) and round(120250 * 2 / 319, 1) == 753.9 and round(kap(138, 181, 1, 1, 2)) == 672 and round(100 * (715 - 672.4) / 715) == 6)
comprobar('t2 teoría: Problema 1 (sales)', [round(1000 / d, 2) for d in (235, 283, 334)] == [4.26, 3.53, 2.99] and round(4000 / 212, 1) == 18.9 and [k for k, v in sorted({'KBr': 1 / 334, 'NaCl': 1 / 283, 'NaF': 1 / 235, 'MgO': 4 / 212}.items(), key=lambda kv: kv[1])] == ['KBr', 'NaCl', 'NaF', 'MgO'] and ENm['RET']['KBr'][1] < ENm['RET']['NaCl'][1] < ENm['RET']['NaF'][1] < ENm['RET']['MgO'][1] and (102 + 133, 102 + 181, 138 + 196, 72 + 140) == (235, 283, 334, 212))
comprobar('t2 teoría: BF₃ 24 e⁻, NF₃ 26 e⁻ y 13 pares', ev_formula('BF3', 0) == 24 and ev_formula('NF3', 0) == 26 and 26 // 2 == 13 and 26 - 2 * 3 - 3 * 6 == 2)
comprobar('t2 teoría: Problema 3 (HCl)', cerca(1.602e-19 * 127e-12, 2.03e-29, 5e-3) and cerca(1.602e-19 * 127e-12 / 3.336e-30, 6.10, 2e-3) and round(100 * 1.08 / (1.602e-19 * 127e-12 / 3.336e-30), 1) == 17.7)
comprobar('t2 teoría: electrones de las moléculas del texto', [ev_formula(f, q) for f, q in [('CO2', 0), ('NH4', 1), ('SO2', 0), ('NO3', -1), ('O3', 0), ('BF3', 0), ('BeCl2', 0), ('PCl5', 0), ('SF6', 0), ('XeF2', 0), ('NO', 0)]] == [16, 8, 18, 24, 18, 24, 16, 40, 48, 22, 11])
comprobar('t2 teoría: cargas formales del texto', 5 - (0 + 4) == 1 and [6 - (2 + 3), 6 - (4 + 2), 6 - (6 + 1)] == [1, 0, -1] and 5 - (0 + 4) + 2 * (6 - (6 + 1)) == -1 and (2 + 1 + 1) / 3 == 4 / 3 and (2 + 1) / 2 == 1.5)
comprobar('t2 teoría: energías de enlace y ΔH (HCl, NH₃, CH₄)', (436 + 243 - 2 * 432, 945 + 3 * 436 - 6 * 391, 4 * 413 + 2 * 498 - (2 * 799 + 4 * 463)) == (-185, -93, -802) and (436 + 243, 2 * 432, 945 + 3 * 436, 6 * 391, 4 * 413 + 2 * 498, 2 * 799 + 4 * 463) == (679, 864, 2253, 2346, 2648, 3450))
comprobar('t2 teoría: C=C − C–C = 267 y ángulos 109,5 / 107 / 104,5', 614 - 347 == 267)
comprobar('t2 teoría: electrones de X₂ (F, Cl, Br, I)', [2 * z for z in (9, 17, 35, 53)] == [18, 34, 70, 106])
comprobar('t2 teoría: σ y π del propenonitrilo y de CH₃COOH', (3 + 1 + 1 + 1, 1 + 2) == (6, 3) and 7 - 1 == 6 and SP['CH3COOH'] == (3 + 1 + 1 + 1 + 1, 1))
comprobar('t2 teoría: vaporización frente a O–H', cerca(2 * 463 / 40.7, 22.75, 5e-3))
comprobar('t2 quiz/tarjetas: cifras', (3791, 787) == (ENm['RET']['MgO'][0], ENm['RET']['NaCl'][0]) and round(1000 * 0.92) == 920)
# bancos de la web: cada pregunta y cada ejercicio tiene respuesta única y opciones distintas
for kq, q_ in amp['t2']['datos'].items():
    if 'preguntas' in q_:
        for i, p_ in enumerate(q_['preguntas']):
            comprobar(f't2 {kq} pregunta {i + 1}: opciones distintas y respuesta en rango', len(set(p_['op'])) == len(p_['op']) and 0 <= p_['ok'] < len(p_['op']) and p_['porque'])

print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f_ in fallos: print('  FALLO:', f_)
sys.exit(1 if fallos else 0)
