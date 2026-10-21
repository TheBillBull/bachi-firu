#!/usr/bin/env python3
"""
Verificación independiente (sympy / fracciones exactas) de los temas 12 y 13 de Matemáticas I
(estadística bidimensional y probabilidad) y de los simulacros sim9, sim10 y sim11.
No comparte código con la web: recalcula cada resultado desde cero.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_mates1_t12-13.py /tmp/ampl.json
"""
import json, math, sys, itertools
from fractions import Fraction as Fr
import sympy as sp

datos = json.load(open(sys.argv[1]))
fallos, ok = [], 0
def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')
def cerca(a, b, tol=6e-4):
    a, b = float(a), float(b)
    return abs(a - b) <= tol * max(1.0, abs(b))

# ---------------------------------------------------------------------
# Estadística bidimensional (definiciones del curso: se divide entre n)
# ---------------------------------------------------------------------
def est(x, y, w=None):
    w = w or [1] * len(x)
    N = sum(w)
    sx = sum(Fr(a) * f for a, f in zip(x, w)); sy = sum(Fr(b) * f for b, f in zip(y, w))
    sxx = sum(Fr(a) ** 2 * f for a, f in zip(x, w)); syy = sum(Fr(b) ** 2 * f for b, f in zip(y, w)); sxy = sum(Fr(a) * Fr(b) * f for a, b, f in zip(x, y, w))
    mx, my = sx / N, sy / N
    vx, vy, cov = sxx / N - mx ** 2, syy / N - my ** 2, sxy / N - mx * my
    r = float(cov) / math.sqrt(float(vx) * float(vy)) if vx > 0 and vy > 0 else float('nan')
    m = cov / vx if vx else None
    return dict(N=N, sx=sx, sy=sy, sxx=sxx, syy=syy, sxy=sxy, mx=mx, my=my, vx=vx, vy=vy, cov=cov, r=r, m=m, a=(my - m * mx) if m is not None else None,
                mp=cov / vy if vy else None, ap=(mx - cov / vy * my) if vy else None)
def doble(xs, ys, f):
    x, y, w = [], [], []
    for i, yv in enumerate(ys):
        for j, xv in enumerate(xs): x.append(xv); y.append(yv); w.append(f[i][j])
    return est(x, y, w)

E12 = {e['id']: e for e in datos['ampl']['mates1']['t12']['ejercicios']}
def c12(id_, k=0):
    c = E12[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[k]
def n12(id_, k=0): return c12(id_, k)['valor']
def ok12(id_, k=0): return c12(id_, k)['ok']
def opt12(id_, k=0): c = c12(id_, k); return c['opciones'][c['ok']]

D2 = est([1, 2, 3, 4, 5], [3, 4, 6, 7, 8])
B1 = est([1, 2, 3, 4, 5], [2, 4, 5, 4, 5])
comprobar('t12 b1', (B1['mx'], B1['my']) == (3, 4) and (n12('b1', 0), n12('b1', 1)) == (3, 4))
comprobar('t12 b2', (B1['vx'], B1['cov']) == (2, Fr(6, 5)) and (n12('b2', 0), n12('b2', 1)) == (2, 1.2))
comprobar('t12 b3', B1['vy'] == Fr(6, 5) and cerca(B1['r'], n12('b3')) and abs(B1['r'] - 0.7746) < 1e-4)
comprobar('t12 b4', abs(-0.92) >= 0.9 and opt12('b4') == 'negativa muy fuerte')
comprobar('t12 b5', opt12('b5').startswith('al aumentar x, y tiende a disminuir'))
mb6 = Fr(3) / Fr(5, 2); nb6 = 7 - mb6 * 4
comprobar('t12 b6', (mb6, nb6, mb6 * 6 + nb6) == (Fr(6, 5), Fr(11, 5), Fr(47, 5)) and (n12('b6', 0), n12('b6', 1), n12('b6', 2)) == (1.2, 2.2, 9.4))
comprobar('t12 b7', 0.8 * 2 * 5 == 8 == n12('b7'))
B8 = est([1, 2, 3, 4, 5], [10, 8, 6, 4, 2]); comprobar('t12 b8', abs(B8['r'] + 1) < 1e-12 and n12('b8') == -1)
S9 = est([150, 160, 170, 180], [50, 55, 63, 70]); S9g = est([150, 160, 170, 180], [50000, 55000, 63000, 70000])
comprobar('t12 b9', abs(S9['r'] - S9g['r']) < 1e-12 and opt12('b9') == 'no cambia')
comprobar('t12 b10', Fr(4 * 1 + 6 * 2 + 10 * 3, 20) == Fr(23, 10) and cerca(n12('b10'), 2.3))
comprobar('t12 b11', Fr(3, 4) == Fr(3, 1 + 3) and n12('b11') == 0.75)
f12 = [[2, 4], [3, 6]]; fil = [sum(r) for r in f12]; col = [sum(f12[i][j] for i in range(2)) for j in range(2)]
comprobar('t12 b12', all(Fr(fil[i] * col[j], 15) == f12[i][j] for i in range(2) for j in range(2)) and opt12('b12') == 'Sí, lo son')
comprobar('t12 b13', (D2['mx'], D2['my'], D2['cov']) == (3, Fr(28, 5), Fr(13, 5)) and abs(D2['r'] - 0.9912) < 1e-4 and [n12('b13', k) for k in range(3)] == [3, 5.6, 2.6] and cerca(D2['r'], n12('b13', 3)))
comprobar('t12 b14', (D2['m'], D2['a']) == (Fr(13, 10), Fr(17, 10)) and cerca(D2['m'] * Fr(9, 2) + D2['a'], n12('b14', 2)) and (n12('b14', 0), n12('b14', 1)) == (1.3, 1.7))
comprobar('t12 b15', cerca(D2['mp'], n12('b15', 0)) and cerca(D2['ap'] + D2['mp'] * 7, n12('b15', 1)) and abs(float(D2['mp']) - 0.7558) < 1e-4 and abs(float(D2['ap'] + D2['mp'] * 7) - 4.058) < 1e-3)
B16 = est([4, 6, 8, 10, 12], [7, 6, 4, 3, 1])
comprobar('t12 b16', cerca(B16['r'], n12('b16', 0)) and (B16['m'], B16['a'], B16['m'] * 9 + B16['a']) == (Fr(-3, 4), Fr(51, 5), Fr(69, 20)) and (n12('b16', 1), n12('b16', 2), n12('b16', 3)) == (-0.75, 10.2, 3.45))
S17 = est([150, 158, 165, 170, 176, 182], [49, 54, 60, 66, 72, 79]); S17m = est([Fr(a, 100) for a in [150, 158, 165, 170, 176, 182]], [49, 54, 60, 66, 72, 79])
comprobar('t12 b17', cerca(S17['cov'], 109.22, 1e-4) and cerca(S17m['cov'], n12('b17', 0)) and abs(S17['r'] - S17m['r']) < 1e-12 and cerca(S17['r'], n12('b17', 1)))
S18 = est([2, 3, 4, 5, 6, 7, 8, 9, 10], [87, 95, 102, 109, 115, 121, 127, 133, 138])
comprobar('t12 b18', abs(float(S18['m']) - 6.3333) < 1e-4 and abs(float(S18['a']) - 76.1111) < 1e-4 and cerca(float(S18['m'] * Fr(13, 2) + S18['a']), n12('b18', 0)) and opt12('b18', 1).startswith('extrapolación') and abs(float(S18['m'] * 30 + S18['a']) - 266.11) < 0.01 and abs(S18['r'] - 0.9983) < 1e-4)
comprobar('t12 b19', cerca(0.9 ** 2 * 100, n12('b19')))
comprobar('t12 b20', cerca(0.6 ** 2 / 0.9, n12('b20')))
x21 = sp.Rational(7, 3); y21 = sp.Rational(1, 2) * x21 + 3
comprobar('t12 b21', sp.solve(sp.Eq(sp.Symbol('x'), sp.Rational(4, 5) * (sp.Rational(1, 2) * sp.Symbol('x') + 3) - 1), sp.Symbol('x')) == [x21] and y21 == sp.Rational(25, 6) and cerca(math.sqrt(0.5 * 0.8), n12('b21', 2)) and cerca(x21, n12('b21', 0)) and cerca(y21, n12('b21', 1)))
Q = doble([1, 2], [1, 2], [[3, 1], [1, 3]]); comprobar('t12 b22', Q['cov'] == Fr(1, 8) and Q['vx'] == Fr(1, 4) and abs(Q['r'] - 0.5) < 1e-12 and n12('b22') == 0.5)
T30 = doble([1, 2, 3], [4, 6, 8], [[6, 2, 1], [3, 5, 3], [1, 3, 6]])
comprobar('t12 b23', Fr(4 * 2 + 6 * 5 + 8 * 3, 10) == Fr(31, 5) and cerca(Fr(62, 10), n12('b23')))
B24 = est([1, 2, 3, 4, 5, 6], [2, 4, 6, 8, 10, 2]); comprobar('t12 b24', (B24['sxy'], B24['syy']) == (122, 224) and abs(B24['r'] - 0.3273) < 1e-4 and cerca(B24['r'], n12('b24')))
b25 = [(0, 2), (1, 6), (2, 18), (3, 54)]; lny = [math.log(v) for _, v in b25]; E25 = est([a for a, _ in b25], lny)
comprobar('t12 b25', abs(float(E25['m']) - math.log(3)) < 1e-9 and abs(math.exp(float(E25['a'])) - 2) < 1e-9 and cerca(math.log(3), n12('b25', 0)) and cerca(2 * 3 ** 4, n12('b25', 1)))
E26 = est([math.log(v) for v in (1, 2, 3, 4)], [math.log(v) for v in (2, 8, 18, 32)]); comprobar('t12 b26', abs(float(E26['m']) - 2) < 1e-9 and abs(math.exp(float(E26['a'])) - 2) < 1e-9 and (n12('b26', 0), n12('b26', 1)) == (2, 2))
S27 = est([1, 3, 4, 6, 8], [2, 5, 6, 9, 11]); comprobar('t12 b27', cerca(S27['r'], n12('b27', 0)) and cerca(S27['m'], n12('b27', 1)) and cerca(S27['a'], n12('b27', 2)) and (S27['sx'], S27['sy'], S27['sxx'], S27['syy'], S27['sxy']) == (22, 33, 126, 267, 183))
xx, yy, mm, nn = sp.symbols('xx yy mm nn'); xs_ = [1, 2, 3, 4]; ys_ = [3, 4, 7, 6]
Ssym = sum((y - mm * x - nn) ** 2 for x, y in zip(xs_, ys_)); sol = sp.solve([sp.diff(Ssym, nn), sp.diff(Ssym, mm)], [mm, nn]); Z = est(xs_, ys_)
comprobar('t12 b28/b29 (mínimos cuadrados con sympy = fórmula)', sol[mm] == sp.Rational(Z['m'].numerator, Z['m'].denominator) and sol[nn] == sp.Rational(Z['a'].numerator, Z['a'].denominator) and Z['my'] == Z['m'] * Z['mx'] + Z['a'])
rho = sp.symbols('rho', real=True)
comprobar('t12 b30 (Var(y − m·x) = Sy²(1 − r²))', all(abs(float(Z['vy'] + (Z['m'] ** 2) * Z['vx'] - 2 * Z['m'] * Z['cov']) - float(Z['vy']) * (1 - Z['r'] ** 2)) < 1e-9 for _ in [0]))
comprobar('t12 b31', cerca(T30['cov'], n12('b31', 0)) and cerca(T30['r'], n12('b31', 1)) and T30['N'] == 30 and T30['cov'] == Fr(2, 3) and abs(T30['r'] - 0.5134) < 1e-4)
x32 = sp.solve(sp.Eq(sp.Symbol('x'), sp.Rational(3, 10) * (2 * sp.Symbol('x') + 1) + 2), sp.Symbol('x'))[0]
comprobar('t12 b32', x32 == sp.Rational(23, 4) and 2 * x32 + 1 == sp.Rational(25, 2) and cerca(math.sqrt(0.6), n12('b32', 2)) and (n12('b32', 0), n12('b32', 1)) == (5.75, 12.5))
comprobar('t12 b33', (1 * (-2) * 3, -0.8) == (n12('b33', 1), n12('b33', 0)))
comprobar('t12 b34', opt12('b34') == 'la recta de x sobre y')
S35 = est([1, 2, 3, 4, 5, 6], [12, 15, 19, 21, 26, 28])
comprobar('t12 b35', (S35['sx'], S35['sy'], S35['sxx'], S35['sxy']) == (21, 121, 91, 481) and cerca(S35['m'], n12('b35', 0)) and cerca(S35['a'], n12('b35', 1)) and cerca(S35['m'] * 7 + S35['a'], n12('b35', 2)) and abs(float(S35['m'] * 7 + S35['a']) - 31.667) < 1e-3)
comprobar('t12 b36', cerca(S18['m'], n12('b36')))
E37 = est([math.log(v) for v in (1, 2, 4, 8)], [5, 8, 11, 14]); comprobar('t12 b37', cerca(float(E37['m']), 3 / math.log(2)) and abs(float(E37['m']) - 4.3281) < 1e-4 and cerca(float(E37['a']) + float(E37['m']) * math.log(16), n12('b37', 1)) and cerca(float(E37['m']), n12('b37', 0), 1e-3))
res = [Fr(y) - D2['m'] * x - D2['a'] for x, y in zip([1, 2, 3, 4, 5], [3, 4, 6, 7, 8])]
comprobar('t12 b38', res == [0, Fr(-3, 10), Fr(2, 5), Fr(1, 10), Fr(-1, 5)] and sum(res) == 0 and sum(r * r for r in res) == Fr(3, 10) and (n12('b38', 0), n12('b38', 1)) == (-0.2, 0.3) and abs(float(5 * D2['vy'] * (1 - D2['r'] ** 2)) - 0.3) < 1e-9)
S40 = est([1, 2, 3, 4, 5, 6, 7], [2, 4, 3, 6, 5, 8, 7]); comprobar('t12 b40', (S40['mx'], S40['my'], S40['vx'], S40['vy'], S40['cov']) == (4, 5, 4, 4, Fr(25, 7)) and (S40['sxx'], S40['syy'], S40['sxy']) == (140, 203, 165) and abs(S40['r'] - 25 / 28) < 1e-12 and abs(float(S40['m']) - 0.8929) < 1e-4 and abs(float(S40['a']) - 1.4286) < 1e-4 and abs(S40['r'] ** 2 - 0.797) < 1e-3)

# ---- teoría ----
comprobar('t12 teoría: tabla de cálculo D2', (D2['sx'], D2['sy'], D2['sxx'], D2['syy'], D2['sxy']) == (15, 28, 55, 174, 97) and D2['vx'] == 2 and D2['vy'] == Fr(86, 25) and abs(D2['r'] - 0.9912) < 1e-4 and abs(math.sqrt(float(D2['vy'])) - 1.8547) < 1e-4 and sum((x - 3) * (y - Fr(28, 5)) for x, y in zip([1, 2, 3, 4, 5], [3, 4, 6, 7, 8])) == 13)
comprobar('t12 teoría: tabla 2×2 y cambio de unidades', Q['cov'] == Fr(1, 8) and Q['mx'] == Fr(3, 2) and sum(f * x * y for f, x, y in zip([3, 1, 1, 3], [1, 2, 1, 2], [1, 1, 2, 2])) == 19 and cerca(0.01 * 109.22, 1.0922, 1e-4))
D3 = est([1, 2, 3, 4, 5, 6], [18, 16, Fr(29, 2), 12, Fr(21, 2), 9])
comprobar('t12 teoría: coches', abs(float(D3['vx']) - 2.9167) < 1e-4 and abs(float(D3['vy']) - 9.8056) < 1e-4 and abs(float(D3['cov']) + 5.3333) < 1e-4 and abs(D3['r'] + 0.9973) < 1e-4 and abs(float(D3['m']) + 1.8286) < 1e-4 and abs(float(D3['a']) - 19.7333) < 1e-4)
Pa = est([-2, -1, 0, 1, 2], [4, 1, 0, 1, 4]); comprobar('t12 teoría: parábola r = 0', Pa['cov'] == 0 and Pa['r'] == 0)
comprobar('t12 teoría: determinación', cerca(D2['r'] ** 2, 0.9825, 1e-3) and cerca(0.6 ** 2, 0.36))
comprobar('t12 teoría: dos rectas de D2 y SCE', cerca(D2['mp'], 0.7558) and cerca(D2['ap'], -1.2326, 1e-3) and abs(float(D2['ap'] + D2['mp'] * 7) - 4.058) < 1e-3 and abs((7 - 1.7) / 1.3 - 4.077) < 1e-3 and cerca(float(D2['m'] * D2['mp']), D2['r'] ** 2, 1e-9))
comprobar('t12 teoría: niño', abs(float(S18['m'] * Fr(13, 2) + S18['a']) - 117.28) < 0.01)
comprobar('t12 teoría: tienda', (S35['sy'], S35['syy'], S35['sxy']) == (121, 2631, 481) and abs(float(S35['vy']) - 31.806) < 1e-3 and abs(float(S35['cov']) - 9.5833) < 1e-4 and abs(S35['r'] - 0.995) < 1e-3 and abs(float(S35['m']) - 3.2857) < 1e-4 and abs(float(S35['m'] * 15 + S35['a']) - 57.95) < 0.01)
D5 = est([1, 2, 3, 4, 5, 6], [5, 2, 6, 3, 5, 4]); comprobar('t12 teoría: sin relación', abs(float(D5['cov']) - 0.0833) < 1e-4 and abs(D5['r'] - 0.036) < 1e-3 and abs(float(D5['m']) - 0.0286) < 1e-4 and abs(float(D5['my']) - 4.1667) < 1e-4)
D4 = est([10, 15, 20, 25, 30], [80, 65, 55, 42, 30]); comprobar('t12 teoría: temperatura', (D4['sxx'], D4['syy'], D4['sxy']) == (2250, 16314, 4825) and D4['vx'] == 50 and abs(float(D4['vy']) - 303.44) < 1e-9 and D4['cov'] == -123 and abs(D4['r'] + 0.9986) < 1e-4 and (D4['m'], D4['a']) == (Fr(-246, 100), Fr(1036, 10)) and abs(float(D4['m'] * 18 + D4['a']) - 59.32) < 1e-9 and abs(float(D4['m'] * -5 + D4['a']) - 115.9) < 1e-9)
comprobar('t12 teoría: peso y altura', abs(S17['r'] - 0.9937) < 1e-4 and abs(float(S17['m']) - 0.9514) < 1e-4 and abs(float(S17['a']) + 95.386) < 1e-2 and abs(float(S17['m'] * 168 + S17['a']) - 64.45) < 0.01)
comprobar('t12 teoría: 30 alumnos', T30['mx'] == 2 and abs(float(T30['my']) - 6.0667) < 1e-4 and abs(float(T30['vx']) - 0.6667) < 1e-4 and abs(float(T30['vy']) - 2.5289) < 1e-4 and sum(f * x * y for r_, y in zip([[6, 2, 1], [3, 5, 3], [1, 3, 6]], [4, 6, 8]) for f, x in zip(r_, [1, 2, 3])) == 384 and [Fr(4 * 6 + 6 * 3 + 8 * 1, 10), Fr(4 * 2 + 6 * 5 + 8 * 3, 10), Fr(4 * 1 + 6 * 3 + 8 * 6, 10)] == [5, Fr(31, 5), 7])
ind = [[2, 4, 6], [3, 6, 9], [1, 2, 3]]; Ti = doble([1, 2, 3], [4, 6, 8], ind); filas_ = [sum(r) for r in ind]; cols_ = [sum(ind[i][j] for i in range(3)) for j in range(3)]
comprobar('t12 teoría: tabla independiente', filas_ == [12, 18, 6] and cols_ == [6, 12, 18] and all(Fr(filas_[i] * cols_[j], 36) == ind[i][j] for i in range(3) for j in range(3)) and Ti['cov'] == 0)
bact = [(0, 100), (1, 160), (2, 250), (3, 410), (4, 650), (5, 1020), (6, 1630)]; Eb = est([a for a, _ in bact], [math.log(v) for _, v in bact]); Lb = est([a for a, _ in bact], [v for _, v in bact])
comprobar('t12 teoría: bacterias', abs(float(Eb['m']) - 0.4655) < 1e-4 and abs(math.exp(float(Eb['a'])) - 100.1) < 0.1 and abs(Eb['r'] - 0.99995) < 1e-5 and abs(math.exp(0.4655) - 1.593) < 1e-3 and abs(math.exp(float(Eb['a']) + float(Eb['m']) * 8) - 4147) < 3 and abs(Lb['r'] - 0.934) < 1e-3)
kep = [(0.39, 0.24), (0.72, 0.62), (1, 1), (1.52, 1.88), (5.2, 11.86), (9.58, 29.46)]; Ek = est([math.log(a) for a, _ in kep], [math.log(b) for _, b in kep])
comprobar('t12 teoría: Kepler', abs(float(Ek['m']) - 1.4997) < 1e-3 and abs(Ek['r'] - 0.99999) < 1e-4)
apr = [(1, 30), (2, 44), (4, 58), (8, 71), (16, 86), (32, 99)]; Ea = est([math.log(a) for a, _ in apr], [b for _, b in apr])
comprobar('t12 teoría: aprendizaje', abs(float(Ea['m']) - 19.95) < 1e-2 and abs(float(Ea['a']) - 30.10) < 1e-2 and abs(Ea['r'] - 0.99988) < 1e-4 and abs(19.95 * math.log(2) - 13.8) < 0.05)
comprobar('t12 teoría: dos rectas dadas', x32 == sp.Rational(23, 4) and abs(math.sqrt(0.6) - 0.7746) < 1e-4)
comprobar('t12 quiz y errores', cerca(0.8 ** 2, 0.64) and cerca(Fr(3) / Fr(5, 2), 1.2) and cerca(0.9 * 0.4, 0.36) and cerca(math.sqrt(0.36), 0.6))


# ---------------------------------------------------------------------
# Tema 13 · Probabilidad (conteo exhaustivo con fracciones exactas)
# ---------------------------------------------------------------------
from math import comb, perm, factorial
D13 = datos['ampl']['mates1']['t13']
E13 = {e['id']: e for e in D13['ejercicios']}
def c13(id_, k=0):
    c = E13[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[k]
def n13(id_, k=0): return c13(id_, k)['valor']
def opt13(id_, k=0): c = c13(id_, k); return c['opciones'][c['ok']]
def P(casos, favorables=None):
    """Laplace por enumeración: fracción exacta de elementos de 'casos' que cumplen la condición."""
    casos = list(casos)
    return Fr(sum(1 for c in casos if favorables(c)), len(casos))
dado = list(range(1, 7)); dos = list(itertools.product(dado, dado)); tres_d = list(itertools.product(dado, repeat=3))
palos = ['oros', 'copas', 'espadas', 'bastos']; baraja = [(n, p) for p in palos for n in [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]]
mon2 = list(itertools.product('CX', repeat=2)); mon3 = list(itertools.product('CX', repeat=3))
def eq(valor_js, exacto, tol=5e-5): return abs(float(valor_js) - float(exacto)) <= tol
def binom(n, k, p): return comb(n, k) * Fr(p) ** k * (1 - Fr(p)) ** (n - k)

# ---- ejercicios ★ ----
comprobar('t13 p1', P(dado, lambda d: d > 4) == Fr(1, 3) and eq(n13('p1'), Fr(1, 3)))
comprobar('t13 p2', P(mon2, lambda m: m.count('C') == 1) == Fr(1, 2) and n13('p2') == 0.5)
comprobar('t13 p3', len(baraja) == 40 and P(baraja, lambda c: c[0] >= 10) == Fr(3, 10) and n13('p3') == 0.3)
comprobar('t13 p4', P(dos, lambda d: sum(d) == 9) == Fr(1, 9) and eq(n13('p4'), Fr(1, 9)) and [d for d in dos if sum(d) == 9] == [(3, 6), (4, 5), (5, 4), (6, 3)])
A5, B5 = {2, 4, 6}, {3, 6}; comprobar('t13 p5', A5 | B5 == {2, 3, 4, 6} and A5 & B5 == {6} and opt13('p5') == '{2, 3, 4, 6}')
comprobar('t13 p6', Fr(1) - Fr(35, 100) == Fr(65, 100) and n13('p6') == 0.65)
comprobar('t13 p7', Fr(5, 10) + Fr(3, 10) - Fr(1, 10) == Fr(7, 10) and n13('p7') == 0.7)
comprobar('t13 p8', Fr(2, 10) + Fr(45, 100) == Fr(65, 100) and n13('p8') == 0.65)
comprobar('t13 p9', Fr(4, 10) * Fr(25, 100) == Fr(1, 10) and n13('p9') == 0.1)
comprobar('t13 p10', Fr(12, 100) / Fr(4, 10) == Fr(3, 10) and n13('p10') == 0.3)
comprobar('t13 p11', opt13('p11') == 'A ∩ B̄')
comprobar('t13 p12', comb(8, 3) == 56 and 8 * 7 * 6 // 6 == 56 and n13('p12') == 56)
comprobar('t13 p13', perm(10, 3) == 720 and comb(10, 3) == 120 and n13('p13') == 720)
comprobar('t13 p14', opt13('p14') == '1,2')
# ---- ejercicios ★★ ----
comprobar('t13 p15', P(tres_d, lambda t: 6 in t) == Fr(91, 216) and len([t for t in tres_d if 6 not in t]) == 125 and eq(n13('p15'), Fr(91, 216)))
comprobar('t13 p16', Fr(5, 10) + Fr(4, 10) - Fr(7, 10) == Fr(2, 10) and 1 - Fr(7, 10) == Fr(3, 10) and (n13('p16', 0), n13('p16', 1)) == (0.2, 0.3))
comprobar('t13 p17', Fr(6, 10) - Fr(3, 10) == Fr(3, 10) and Fr(6, 10) + Fr(5, 10) - 2 * Fr(3, 10) == Fr(5, 10) and (n13('p17', 0), n13('p17', 1)) == (0.3, 0.5))
comprobar('t13 p18', P(baraja, lambda c: c[0] == 12 or c[1] == 'copas') == Fr(13, 40) and n13('p18') == 0.325)
pares = [(a, b) for a in range(40) for b in range(40) if a != b]
comprobar('t13 p19', P(pares, lambda ab: baraja[ab[0]][0] == 1 and baraja[ab[1]][0] == 1) == Fr(1, 130) and P(pares, lambda ab: baraja[ab[0]][0] != 1 and baraja[ab[1]][0] != 1) == Fr(21, 26) and eq(n13('p19', 0), Fr(1, 130)) and eq(n13('p19', 1), Fr(21, 26)))
a6 = [d for d in dos if 6 in d]; comprobar('t13 p20', len(a6) == 11 and Fr(len([d for d in a6 if sum(d) == 10]), len(a6)) == Fr(2, 11) and eq(n13('p20'), Fr(2, 11)))
comprobar('t13 p21', Fr(5, 10) + Fr(4, 10) - Fr(7, 10) == Fr(5, 10) * Fr(4, 10) and opt13('p21').startswith('Sí'))
comprobar('t13 p22', Fr(3, 10) + Fr(6, 10) - Fr(3, 10) * Fr(6, 10) == Fr(72, 100) and 1 - Fr(72, 100) == Fr(7, 10) * Fr(4, 10) == Fr(28, 100) and (n13('p22', 0), n13('p22', 1)) == (0.72, 0.28))
pB = Fr(1, 2) * Fr(2, 5) + Fr(1, 2) * Fr(4, 5); comprobar('t13 p23', pB == Fr(3, 5) and n13('p23') == 0.6)
comprobar('t13 p24', Fr(1, 2) * Fr(2, 5) / pB == Fr(1, 3) and eq(n13('p24'), Fr(1, 3)))
tiros = lambda p, n: [(c, math.prod(Fr(p) if x == 'A' else 1 - Fr(p) for x in c)) for c in itertools.product('AF', repeat=n)]
comprobar('t13 p25', sum(pr for c, pr in tiros(Fr(6, 10), 3) if c.count('A') == 2) == Fr(432, 1000) and n13('p25') == 0.432)
comprobar('t13 p26', comb(5, 2) * comb(4, 1) == 40 and Fr(40, comb(9, 3)) == Fr(10, 21) and comb(9, 3) == 84 and n13('p26', 0) == 40 and eq(n13('p26', 1), Fr(10, 21)))
comprobar('t13 p27', Fr(45 + 20, 150) == Fr(13, 30) and Fr(45, 65) == Fr(9, 13) and eq(n13('p27', 0), Fr(13, 30)) and eq(n13('p27', 1), Fr(9, 13)))
comprobar('t13 p28', sorted(c13('p28')['valores']) == [0.025, 0.1, 0.25] and P(baraja, lambda c: c[1] == 'oros') == Fr(1, 4) and P(baraja, lambda c: c[0] == 1) == Fr(1, 10) and P(baraja, lambda c: c == (1, 'oros')) == Fr(1, 40))
comprobar('t13 p29', sum(pr for c, pr in tiros(Fr(1, 2), 5) if c.count('A') == 3) == Fr(10, 32) and n13('p29') == 0.3125)
dig = list(itertools.product(range(1, 10), repeat=3)); comprobar('t13 p30', len([d for d in dig if len(set(d)) == 3]) == 504 and len(dig) == 729 and Fr(504, 729) == Fr(56, 81) and n13('p30', 0) == 504 and eq(n13('p30', 1), Fr(56, 81)))
# ---- ejercicios ★★★ ----
# p31, p32, p43, p46: se comprueban las identidades sobre todos los pares de sucesos de un espacio pequeño (todas las probabilidades de una familia de espacios)
ok_id = True; E4 = list(range(4)); subs = [frozenset(s) for r in range(5) for s in itertools.combinations(E4, r)]
pesos = [Fr(1, 10), Fr(2, 10), Fr(3, 10), Fr(4, 10)]; Pp = lambda S: sum(pesos[i] for i in S); Ef = frozenset(E4)
for Aa in subs:
    ok_id &= Pp(Ef - Aa) == 1 - Pp(Aa)
    for Bb in subs:
        ok_id &= Pp(Aa | Bb) == Pp(Aa) + Pp(Bb) - Pp(Aa & Bb) and Pp(Bb - Aa) == Pp(Bb) - Pp(Aa & Bb)
        ok_id &= (Aa & Bb == frozenset()) == (Pp(Aa & Bb) == 0)
        ok_id &= Pp(Aa & (Ef - Bb)) == Pp(Aa) - Pp(Aa & Bb)
comprobar('t13 p31/p32 (identidades en todos los pares de sucesos)', ok_id and all(isinstance(E13[k]['check'], dict) and E13[k]['check']['tipo'] == 'rubrica' for k in ('p31', 'p32', 'p43', 'p46')))
# p43: si A y B independientes (espacio producto) también A y B̄
pa, pb = Fr(3, 10), Fr(2, 5); comprobar('t13 p43', pa - pa * pb == pa * (1 - pb))
# p46: incompatibles con probabilidad positiva nunca son independientes (en el espacio de dos dados con sucesos de probabilidad positiva)
sub_d = [frozenset(s) for r in range(1, 7) for s in itertools.combinations(range(6), r)]
comprobar('t13 p46', all(not (a & b == frozenset() and Fr(len(a), 6) * Fr(len(b), 6) == Fr(len(a & b), 6)) for a in sub_d for b in sub_d))
comprobar('t13 p33', Fr(5, 10) + Fr(4, 10) + Fr(3, 10) - Fr(2, 10) - Fr(15, 100) - Fr(1, 10) + Fr(5, 100) == Fr(8, 10) and (n13('p33', 0), n13('p33', 1)) == (0.8, 0.2))
r33 = [Fr(5, 10) - Fr(2, 10) - Fr(15, 100) + Fr(5, 100), Fr(4, 10) - Fr(2, 10) - Fr(1, 10) + Fr(5, 100), Fr(3, 10) - Fr(15, 100) - Fr(1, 10) + Fr(5, 100), Fr(2, 10) - Fr(5, 100), Fr(15, 100) - Fr(5, 100), Fr(1, 10) - Fr(5, 100), Fr(5, 100)]
comprobar('t13 p33 (datos coherentes: todas las zonas ≥ 0 y suman 0,8)', all(v >= 0 for v in r33) and sum(r33) == Fr(8, 10))
pD = Fr(5, 10) * Fr(1, 100) + Fr(3, 10) * Fr(4, 100) + Fr(2, 10) * Fr(5, 100)
comprobar('t13 p34', pD == Fr(27, 1000) and Fr(3, 10) * Fr(4, 100) / pD == Fr(4, 9) and (n13('p34', 0) == 0.027) and eq(n13('p34', 1), Fr(4, 9)))
pP = Fr(2, 100) * Fr(90, 100) + Fr(98, 100) * Fr(4, 100); comprobar('t13 p35', pP == Fr(572, 10000) and abs(float(Fr(18, 1000) / pP) - 0.3147) < 1e-4 and n13('p35', 0) == 0.0572 and eq(n13('p35', 1), Fr(18, 1000) / pP))
n_min = next(n for n in range(1, 100) if 1 - Fr(5, 6) ** n > Fr(95, 100)); comprobar('t13 p36', abs(float(1 - Fr(5, 6) ** 10) - 0.8385) < 1e-4 and n_min == 17 and abs(float(1 - Fr(5, 6) ** 16) - 0.9459) < 1e-4 and abs(float(1 - Fr(5, 6) ** 17) - 0.9549) < 1e-4 and abs(math.log(0.05) / math.log(5 / 6) - 16.43) < 0.01 and eq(n13('p36', 0), 0.8385) and n13('p36', 1) == 17)
bomb = list(itertools.combinations(range(12), 3)); comprobar('t13 p37', len(bomb) == 220 and Fr(len([b for b in bomb if sum(1 for i in b if i < 4) == 2]), 220) == Fr(12, 55) and eq(n13('p37'), Fr(12, 55)))
# Monty Hall con 3 y con 4 puertas (enumeración exacta)
def monty(n_puertas, cambia):
    tot = Fr(0)
    for coche in range(n_puertas):                       # coche uniforme; el jugador elige la puerta 0
        abrir = [d for d in range(1, n_puertas) if d != coche]; restantes_opts = []
        for ab in abrir:
            restantes = [d for d in range(1, n_puertas) if d != ab]       # puertas cerradas distintas de la elegida
            if not cambia: ganar = Fr(1 if coche == 0 else 0)
            else: ganar = Fr(sum(1 for d in restantes if d == coche), len(restantes))
            tot += Fr(1, n_puertas) * Fr(1, len(abrir)) * ganar
    return tot
comprobar('t13 p38 y teoría Monty Hall', monty(3, False) == Fr(1, 3) and monty(3, True) == Fr(2, 3) and monty(4, False) == Fr(1, 4) and monty(4, True) == Fr(3, 8) and (n13('p38', 0), n13('p38', 1)) == (0.25, 0.375))
f3 = list(itertools.product('CO', repeat=3)); at2 = [f for f in f3 if f.count('C') >= 2]
comprobar('t13 p39', len(at2) == 4 and Fr(1, len(at2)) == Fr(1, 4) and n13('p39') == 0.25)
# p40: P(A ∩ B) = t es posible si las cuatro zonas son ≥ 0; el rango se obtiene recorriendo t
def posible(pa_, pb_, t): return min(t, pa_ - t, pb_ - t, 1 - pa_ - pb_ + t) >= 0
ts = [Fr(k, 100) for k in range(0, 101)]; val = [t for t in ts if posible(Fr(7, 10), Fr(5, 10), t)]
comprobar('t13 p40', min(val) == Fr(2, 10) and max(val) == Fr(5, 10) and sorted(c13('p40')['valores']) == [0.2, 0.5] and min(t for t in ts if posible(Fr(6, 10), Fr(7, 10), t)) == Fr(3, 10) and max(t for t in ts if posible(Fr(6, 10), Fr(7, 10), t)) == Fr(6, 10))
comprobar('t13 p41', abs(float(binom(8, 7, Fr(6, 10)) + binom(8, 8, Fr(6, 10))) - 0.1064) < 5e-5 and abs(float(binom(8, 7, Fr(6, 10))) - 0.08958) < 1e-5 and abs(float(binom(8, 8, Fr(6, 10))) - 0.01680) < 1e-5 and eq(n13('p41', 0), 0.1064) and n13('p41', 1) == 4.8 and sum(k * binom(8, k, Fr(6, 10)) for k in range(9)) == Fr(24, 5))
pB42 = Fr(4, 10) * Fr(5, 10) + Fr(6, 10) * Fr(2, 10); comprobar('t13 p42', pB42 == Fr(32, 100) and Fr(20, 100) / pB42 == Fr(5, 8) and Fr(5, 10) != pB42 and opt13('p42', 2) == 'No' and (n13('p42', 0), n13('p42', 1)) == (0.32, 0.625))
mon_ = [('N', 'C'), ('N', 'X'), ('D', 'C'), ('D', 'C'), ('Z', 'X'), ('Z', 'X')]            # cada moneda: 2 caras (cara/cruz) -> 6 lados equiprobables
comprobar('t13 p44', P(mon_, lambda s: s[1] == 'C') == Fr(1, 2) and Fr(len([s for s in mon_ if s == ('D', 'C')]), len([s for s in mon_ if s[1] == 'C'])) == Fr(2, 3) and n13('p44', 0) == 0.5 and eq(n13('p44', 1), Fr(2, 3)))
xx = sp.symbols('x'); comprobar('t13 p45', sp.expand(sp.binomial(4, 2) * xx ** 2 * (1 - xx) ** 2 - 6 * xx ** 2 * (1 - xx) ** 2) == 0 and c13('p45')['expr'] == '6*x^2*(1-x)^2' and binom(4, 2, Fr(1, 2)) == Fr(3, 8))
comprobar('t13: 46 ejercicios, niveles 14/16/16', len(E13) == 46 and [sum(1 for e in D13['ejercicios'] if e['nivel'] == k) for k in (1, 2, 3)] == [14, 16, 16])

# ---- teoría: sección 1 (experimentos) ----
comprobar('t13 teoría §1: tres hijos y 2ⁿ sucesos', Fr(len([f for f in f3 if f.count('C') == 2]), 8) == Fr(3, 8) and Fr(len([f for f in f3 if f.count('C') == 1]), 8) == Fr(3, 8) and 2 ** 3 == 8 and 2 ** 6 == 64 and abs(2 ** 36 / 1e10 - 6.87) < 0.01
           and len([s for r in range(4) for s in itertools.combinations([1, 2, 3], r)]) == 8 and len(list(itertools.permutations('RAV', 2))) == 6 and len(list(itertools.combinations('RAV', 2))) == 3 and 3 * 4 * 2 == 24)
comprobar('t13 teoría §1: monedas (0, 1, 2 caras = 1/4, 1/2, 1/4)', [P(mon2, lambda m: m.count('C') == k) for k in (0, 1, 2)] == [Fr(1, 4), Fr(1, 2), Fr(1, 4)] and [P(mon3, lambda m: m.count('C') == k) for k in range(4)] == [Fr(1, 8), Fr(3, 8), Fr(3, 8), Fr(1, 8)])
# ---- §2 sucesos ----
A_, B_, C_ = {2, 4, 6}, {3, 6}, {5, 6}; E_ = set(dado); c_ = lambda S: E_ - S
comprobar('t13 teoría §2: tabla del dado', A_ | B_ == {2, 3, 4, 6} and A_ & B_ == {6} and c_(A_) == {1, 3, 5} and A_ - B_ == {2, 4} and B_ - A_ == {3} and c_(A_ | B_) == {1, 5} and c_(A_) & c_(B_) == {1, 5} and A_ & C_ == {6} and A_ & B_ & C_ == {6} and c_(A_ & B_) == {1, 2, 3, 4, 5} == c_(A_) | c_(B_))
import random
sd = [set(q) for r in range(7) for q in itertools.combinations(dado, r)]; mx = random.Random(7).sample(sd, 24)
ok_dm = all(c_(a | b) == c_(a) & c_(b) and c_(a & b) == c_(a) | c_(b) for a in sd for b in sd)
comprobar('t13 teoría §2: leyes de De Morgan y distributiva (todos los pares/ternas de sucesos del dado)', ok_dm and all(a & (b | c) == (a & b) | (a & c) for a in mx for b in mx for c in mx))
comprobar('t13 teoría §2: exactamente uno, a lo sumo uno', all(((a & c_(b)) | (c_(a) & b)) == (a | b) - (a & b) and c_(a & b) == c_(a) | c_(b) for a in sd for b in sd))
# ---- §3 Laplace ----
suma = [len([d for d in dos if sum(d) == s]) for s in range(2, 13)]
comprobar('t13 teoría §3: dos dados', suma == [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1] and P(dos, lambda d: sum(d) >= 10) == Fr(1, 6) and P(dos, lambda d: d[0] == d[1]) == Fr(1, 6) and P(dos, lambda d: 6 in d) == Fr(11, 36) and P(dos, lambda d: 6 not in d) == Fr(25, 36) and P(dos, lambda d: sum(d) == 7) == Fr(1, 6))
comprobar('t13 teoría §3: dado y baraja', P(dado, lambda d: d % 2 == 0) == Fr(1, 2) and P(dado, lambda d: d > 4) == Fr(1, 3) and P(dado, lambda d: d in (2, 3, 5)) == Fr(1, 2) and P(baraja, lambda c: c[0] == 1) == Fr(1, 10) and P(baraja, lambda c: c[1] == 'oros') == Fr(1, 4) and P(baraja, lambda c: c[0] >= 10) == Fr(3, 10) and P(baraja, lambda c: c[0] == 12 or c[1] == 'copas') == Fr(13, 40) and Fr(4 * 0 + 4, 40) == Fr(1, 10))
comprobar('t13 teoría §3: diana y Laplace de la urna', Fr(4 * 1, 100) == Fr(1, 25) and Fr(11, 36) + Fr(25, 36) == 1)
# ---- §4 axiomas ----
x_ = (1 - Fr(3, 10)) / 5; comprobar('t13 teoría §4: dado trucado (cuentas)', x_ == Fr(14, 100) and 2 * x_ + Fr(3, 10) == Fr(58, 100) and 2 * x_ == Fr(28, 100))
comprobar('t13 teoría §4: Fréchet 0,6 / 0,7 y Méré', Fr(6, 10) + Fr(7, 10) > 1 and max(Fr(0), Fr(6, 10) + Fr(7, 10) - 1) == Fr(3, 10) and min(Fr(6, 10), Fr(7, 10)) == Fr(6, 10)
           and 1 - Fr(5, 6) ** 4 == Fr(671, 1296) and abs(float(1 - Fr(5, 6) ** 4) - 0.5177) < 5e-5 and abs((35 / 36) ** 24 - 0.5086) < 5e-5 and abs(1 - (35 / 36) ** 24 - 0.4914) < 5e-5 and abs(4 * (1 / 6) - 0.667) < 1e-3
           and P(list(itertools.product(dado, repeat=4)), lambda t: 6 in t) == Fr(671, 1296))
# ---- §5 unión ----
n20 = list(range(1, 21)); comprobar('t13 teoría §5: múltiplos de 2 o 3 (1–20)', P(n20, lambda n: n % 2 == 0) == Fr(10, 20) and P(n20, lambda n: n % 3 == 0) == Fr(6, 20) and P(n20, lambda n: n % 6 == 0) == Fr(3, 20) and P(n20, lambda n: n % 2 == 0 or n % 3 == 0) == Fr(13, 20) and [n for n in n20 if n % 2 and n % 3] == [1, 5, 7, 11, 13, 17, 19] and Fr(7, 20) == 1 - Fr(65, 100))
comprobar('t13 teoría §5: despejar la intersección y tabla 0,4/0,5/0,2', Fr(11, 10) - Fr(8, 10) == Fr(3, 10) and 1 - Fr(8, 10) == Fr(2, 10)
           and [Fr(4, 10) + Fr(5, 10) - Fr(2, 10), 1 - Fr(7, 10), Fr(4, 10) - Fr(2, 10), Fr(5, 10) - Fr(2, 10), Fr(9, 10) - Fr(4, 10), 1 - Fr(2, 10)] == [Fr(7, 10), Fr(3, 10), Fr(2, 10), Fr(3, 10), Fr(5, 10), Fr(8, 10)])
A3, B3, C3 = {1, 2, 3}, {2, 3, 4}, {3, 4, 5}
comprobar('t13 teoría §5: tres sucesos con el dado', A3 & B3 == {2, 3} and A3 & C3 == {3} and B3 & C3 == {3, 4} and A3 & B3 & C3 == {3} and Fr(len(A3 | B3 | C3), 6) == Fr(5, 6) and Fr(3 + 3 + 3 - 2 - 1 - 2 + 1, 6) == Fr(5, 6))
ok_ie = all(len(a | b | c) == len(a) + len(b) + len(c) - len(a & b) - len(a & c) - len(b & c) + len(a & b & c) for a in mx for b in mx for c in mx)
zonas = dict(I=30, F=15, A=10, IF=15, IA=10, FA=5, IFA=5)
comprobar('t13 teoría §5: idiomas e inclusión–exclusión', ok_ie and 60 + 40 + 30 - 20 - 15 - 10 + 5 == 90 and sum(zonas.values()) == 90 and zonas['I'] == 60 - 15 - 10 - 5 and zonas['F'] == 40 - 15 - 5 - 5 and zonas['A'] == 30 - 10 - 5 - 5 and zonas['IF'] == 20 - 5 and zonas['IA'] == 15 - 5 and zonas['FA'] == 10 - 5 and zonas['I'] + zonas['F'] + zonas['A'] == 55
           and zonas['I'] + zonas['IF'] + zonas['IA'] + zonas['IFA'] == 60 and zonas['F'] + zonas['IF'] + zonas['FA'] + zonas['IFA'] == 40 and zonas['A'] + zonas['IA'] + zonas['FA'] + zonas['IFA'] == 30)
# ---- §6 condicionada ----
comprobar('t13 teoría §6: condicionadas del dado', Fr(len({2, 4, 6} & {6}), len({2, 4, 6})) == Fr(1, 3) and Fr(len({4, 5, 6} & {2, 4, 6}), 3) == Fr(2, 3) and Fr(len({6} & {2, 4, 6}), 1) == 1)
tres_oros = Fr(10, 40) * Fr(9, 39) * Fr(8, 38); comprobar('t13 teoría §6: tres oros', tres_oros == Fr(3, 247) and abs(float(tres_oros) - 0.0121) < 5e-5 and 10 * 9 * 8 == 720 and 40 * 39 * 38 == 59280 and abs(0.25 ** 3 - 0.0156) < 5e-5
           and Fr(len([c for c in itertools.permutations(range(40), 3) if all(baraja[i][1] == 'oros' for i in c)]), 40 * 39 * 38) == tres_oros)
comprobar('t13 teoría §6: independencia de dos dados', P(dos, lambda d: d[0] == 6 and d[1] == 6) == Fr(1, 36) == Fr(1, 6) * Fr(1, 6))
maq = [(Fr(5, 10), Fr(2, 100)), (Fr(3, 10), Fr(3, 100)), (Fr(2, 10), Fr(5, 100))]; pDm = sum(a * b for a, b in maq)
comprobar('t13 teoría §6: tres máquinas', pDm == Fr(29, 1000) and [a * b / pDm for a, b in maq] == [Fr(10, 29), Fr(9, 29), Fr(10, 29)] and abs(10 / 29 - 0.3448) < 5e-5 and abs(9 / 29 - 0.3103) < 5e-5 and sum(a * b / pDm for a, b in maq) == 1)
p_pos = Fr(1, 100) * Fr(95, 100) + Fr(99, 100) * Fr(5, 100)
comprobar('t13 teoría §6: test médico', Fr(1, 100) * Fr(95, 100) == Fr(95, 10000) and Fr(99, 100) * Fr(5, 100) == Fr(495, 10000) and p_pos == Fr(59, 1000) and abs(float(Fr(95, 10000) / p_pos) - 0.161) < 5e-4 and abs(float(Fr(95, 10000) / p_pos) - 0.1610) < 1e-4 and 1000 * Fr(1, 100) * Fr(95, 100) == Fr(19, 2) and 990 * Fr(5, 100) == Fr(99, 2) and Fr(99, 2) / Fr(19, 2) > 5)
# ---- §7 combinatoria ----
comprobar('t13 teoría §7: fórmulas', 3 * 4 * 2 == 24 and factorial(10) == 3628800 and abs(factorial(20) / 1e18 - 2.43) < 0.01 and perm(8, 3) == 336 and 10 ** 4 == 10000 and factorial(5) == 120 and len(set(itertools.permutations('MAMA'))) == 6 == factorial(4) // (factorial(2) * factorial(2)) and comb(10, 3) == 120
           and len(list(itertools.combinations_with_replacement('ABC', 2))) == 6 == comb(4, 2) and len(list(itertools.combinations_with_replacement('ABCD', 3))) == 20 == comb(6, 3))
comprobar('t13 teoría §7: propiedades de C(n, k)', all(comb(n, k) == comb(n, n - k) and (k == 0 or comb(n, k) == comb(n - 1, k - 1) + comb(n - 1, k)) and sum(comb(n, j) for j in range(n + 1)) == 2 ** n for n in range(1, 25) for k in range(0, n + 1) if k <= n) and comb(49, 6) == 13983816 and comb(6, 3) * comb(5, 2) == 200
           and factorial(11) // (factorial(2) * factorial(3) * factorial(2)) == 1663200 and sp.Poly(sp.expand((sp.Symbol('a') + sp.Symbol('b')) ** 4), sp.Symbol('a'), sp.Symbol('b')).coeffs() == [1, 4, 6, 4, 1] and comb(6, 5) == 6 and perm(8, 3) == comb(8, 3) * factorial(3) and perm(6, 3) == comb(6, 3) * 6)
# ---- §8 urnas, loterías, cumpleaños ----
comprobar('t13 teoría §8: urna con y sin reposición', Fr(5, 8) ** 2 == Fr(25, 64) and abs(25 / 64 - 0.3906) < 5e-5 and Fr(5, 8) * Fr(4, 7) == Fr(5, 14) == Fr(comb(5, 2), comb(8, 2)) and abs(5 / 14 - 0.3571) < 5e-5)
hip = lambda N, R, n, k: Fr(comb(R, k) * comb(N - R, n - k), comb(N, n))
comprobar('t13 teoría §8: una mano de cartas (exactamente un as)', comb(40, 3) == 9880 and comb(36, 2) == 630 and hip(40, 4, 3, 1) == Fr(63, 247) and abs(float(hip(40, 4, 3, 1)) - 0.2551) < 5e-5 and abs(4 / 40 * 36 / 39 * 35 / 38 - 0.0850) < 5e-5 and abs(3 * 4 / 40 * 36 / 39 * 35 / 38 - 0.2551) < 5e-5
           and sum(1 for c in itertools.combinations(range(40), 3) if sum(1 for i in c if baraja[i][0] == 1) == 1) == 2520)
comprobar('t13 teoría §8: Primitiva', comb(49, 6) == 13983816 and comb(6, 5) * comb(43, 1) == 258 and comb(6, 4) * comb(43, 2) == 13545 and comb(43, 2) == 903 and abs(1 / 13983816 - 7.15e-8) < 5e-10 and abs(258 / 13983816 - 1.84e-5) < 5e-8 and abs(13545 / 13983816 - 9.69e-4) < 5e-7 and sum(comb(6, k) * comb(43, 6 - k) for k in range(7)) == comb(49, 6))
comprobar('t13 teoría §8: cinco del mismo palo', comb(40, 5) == 658008 and 4 * comb(10, 5) == 1008 and comb(10, 5) == 252 and Fr(1008, 658008) == Fr(14, 9139) and abs(1008 / 658008 - 0.00153) < 5e-6)
def cumple(n):
    p = 1.0
    for i in range(n): p *= (365 - i) / 365
    return 1 - p
comprobar('t13 teoría §8: cumpleaños', abs(cumple(23) - 0.5073) < 5e-5 and abs(1 - cumple(23) - 0.4927) < 5e-5 and abs(cumple(30) - 0.706) < 5e-4 and abs(cumple(50) - 0.970) < 5e-4 and abs(cumple(57) - 0.990) < 5e-4 and cumple(22) < 0.5 < cumple(23) and comb(23, 2) == 253)
# ---- §9 tablas y árboles ----
comprobar('t13 teoría §9: deporte y curso', 54 + 66 == 120 and 24 + 56 == 80 and 54 + 24 == 78 and 66 + 56 == 122 and Fr(78, 200) == Fr(39, 100) and Fr(54, 78) == Fr(9, 13) and abs(9 / 13 - 0.692) < 5e-4 and Fr(24, 80) == Fr(3, 10) and Fr(6, 10) * Fr(39, 100) == Fr(234, 1000) and Fr(54, 200) == Fr(27, 100) and Fr(54, 120) == Fr(45, 100))
comprobar('t13 teoría §9: reconstruir tabla', [Fr(5, 10) + Fr(4, 10) - Fr(7, 10), Fr(5, 10) - Fr(2, 10), Fr(4, 10) - Fr(2, 10), 1 - Fr(7, 10)] == [Fr(2, 10), Fr(3, 10), Fr(2, 10), Fr(3, 10)])
comprobar('t13 teoría §9: tiros libres', sum(pr for c, pr in tiros(Fr(7, 10), 3) if c.count('A') == 3) == Fr(343, 1000) and sum(pr for c, pr in tiros(Fr(7, 10), 3) if c.count('A') == 2) == Fr(441, 1000) and sum(pr for c, pr in tiros(Fr(7, 10), 3) if c.count('A') >= 1) == Fr(973, 1000) and Fr(7, 10) ** 2 * Fr(3, 10) == Fr(147, 1000))
cc = [Fr(4, 10) * Fr(7, 10), Fr(4, 10) * Fr(3, 10), Fr(6, 10) * Fr(5, 10), Fr(6, 10) * Fr(5, 10)]
comprobar('t13 teoría §9: ciencias y matemáticas', cc == [Fr(28, 100), Fr(12, 100), Fr(30, 100), Fr(30, 100)] and cc[0] + cc[2] == Fr(58, 100) and cc[0] / (cc[0] + cc[2]) == Fr(14, 29) and abs(14 / 29 - 0.483) < 5e-4 and sum(cc) == 1)
# ---- §10 incompatibles / independientes ----
indep = lambda a, b, casos: Fr(len(a & b), len(casos)) == Fr(len(a), len(casos)) * Fr(len(b), len(casos))
comprobar('t13 teoría §10: dado y monedas', indep({2, 4, 6}, {1, 2, 3, 4}, dado) and Fr(len({2, 4}), 6) == Fr(1, 3) and not indep({2, 4, 6}, {1, 2, 3}, dado) and Fr(1, 6) != Fr(1, 4)
           and Fr(4, 10) + Fr(3, 10) == Fr(7, 10) and Fr(4, 10) + Fr(3, 10) - Fr(4, 10) * Fr(3, 10) == Fr(58, 100))
Ac = {m for m in mon2 if m[0] == 'C'}; Bc = {m for m in mon2 if m[1] == 'C'}; Cc = {m for m in mon2 if m[0] == m[1]}
comprobar('t13 teoría §10: independencia por pares, no mutua', indep(Ac, Bc, mon2) and indep(Ac, Cc, mon2) and indep(Bc, Cc, mon2) and Fr(len(Ac & Bc & Cc), 4) == Fr(1, 4) and Fr(1, 2) ** 3 == Fr(1, 8) and Fr(len(Ac & Bc & Cc), 4) != Fr(1, 8))
# ---- §11 paradojas ----
comprobar('t13 teoría §11: dos hijos y 3 hijos', Fr(1, len([f for f in itertools.product('CO', repeat=2) if 'C' in f])) == Fr(1, 3) and Fr(1, len([f for f in itertools.product('CO', repeat=2) if f[0] == 'C'])) == Fr(1, 2))
comprobar('t13 teoría §11: Simpson', 81 + 192 == 273 and 87 + 263 == 350 and 234 + 55 == 289 and 270 + 80 == 350 and abs(81 / 87 - 0.931) < 5e-4 and abs(192 / 263 - 0.730) < 5e-4 and abs(234 / 270 - 0.867) < 5e-4 and abs(55 / 80 - 0.688) < 5e-4 and abs(273 / 350 - 0.780) < 5e-4 and abs(289 / 350 - 0.826) < 5e-4
           and 81 / 87 > 234 / 270 and 192 / 263 > 55 / 80 and 273 / 350 < 289 / 350)
comprobar('t13 teoría §11: falacia del jugador y tasa base', Fr(1, 2) ** 6 == Fr(1, 64) and Fr(95, 10000) / p_pos < Fr(17, 100))
# ---- §12 binomial ----
mu = sum(k * Fr(1, 6) for k in dado); var = sum(k * k * Fr(1, 6) for k in dado) - mu ** 2
comprobar('t13 teoría §12: dado', mu == Fr(7, 2) and var == Fr(35, 12) and abs(float(var) - 2.917) < 5e-4 and abs(math.sqrt(float(var)) - 1.708) < 5e-4 and sum(k * k for k in dado) == 91)
juego = Fr(2) * Fr(1, 6) + Fr(-1) * Fr(5, 6); pj = sp.symbols('pj'); comprobar('t13 teoría §12: juego justo', juego == Fr(-1, 2) and sp.solve(sp.Eq((pj - 1) * sp.Rational(1, 6) - sp.Rational(5, 6), 0), pj) == [6])
comprobar('t13 teoría §12: examen test B(10; 0,25)', abs(float(binom(10, 0, Fr(1, 4))) - 0.0563) < 5e-5 and abs(float(sum(binom(10, k, Fr(1, 4)) for k in range(6, 11))) - 0.0197) < 5e-5
           and [round(float(binom(10, k, Fr(1, 4))), 5) for k in (6, 7, 8, 9)] == [0.01622, 0.00309, 0.00039, 0.00003] and Fr(10) * Fr(1, 4) == Fr(5, 2) and 10 * Fr(1, 4) * Fr(3, 4) == Fr(15, 8) and abs(math.sqrt(1.875) - 1.369) < 5e-4)
comprobar('t13 teoría §12: piezas defectuosas', abs(0.97 ** 20 - 0.5438) < 5e-5 and abs(1 - 0.97 ** 20 - 0.4562) < 5e-5 and sum(binom(10, k, Fr(1, 4)) for k in range(11)) == 1)
# ---- §13 problemas tipo EvAU ----
pBl = Fr(1, 3) * Fr(3, 5) + Fr(2, 3) * Fr(1, 5); comprobar('t13 teoría §13: problema 1 (urnas y dado)', pBl == Fr(1, 3) and Fr(1, 3) * Fr(3, 5) / pBl == Fr(3, 5) and Fr(2, 3) * Fr(1, 5) / pBl == Fr(2, 5) and Fr(2, 6) == Fr(1, 3))
comprobar('t13 teoría §13: problema 2 (transporte)', Fr(45, 100) + Fr(30, 100) - Fr(15, 100) == Fr(6, 10) and 1 - Fr(6, 10) == Fr(4, 10) and Fr(30, 100) - Fr(15, 100) == Fr(15, 100) and Fr(15, 100) / Fr(30, 100) == Fr(1, 2) and Fr(45, 100) * Fr(30, 100) == Fr(135, 1000) != Fr(15, 100))
pMk = Fr(4, 10) * Fr(95, 100) + Fr(6, 10) * Fr(2, 100); comprobar('t13 teoría §13: problema 3 (spam)', pMk == Fr(392, 1000) and abs(float(Fr(38, 100) / pMk) - 0.9694) < 5e-5 and Fr(4, 10) * Fr(5, 100) / (1 - pMk) == Fr(2, 100) / Fr(608, 1000) and abs(0.02 / 0.608 - 0.0329) < 5e-5)
comprobar('t13 teoría §13: problema 4 (bombillas)', [hip(12, 4, 3, k) for k in range(4)] == [Fr(14, 55), Fr(28, 55), Fr(12, 55), Fr(1, 55)] and sum(hip(12, 4, 3, k) for k in range(4)) == 1 and 1 - hip(12, 4, 3, 0) == Fr(41, 55) and abs(14 / 55 - 0.2545) < 5e-5 and abs(28 / 55 - 0.5091) < 5e-5 and abs(41 / 55 - 0.7455) < 5e-5 and comb(8, 3) == 56 and comb(4, 2) * 8 == 48)
# ---- actividades ----
Q = D13['datos']['quiz1']['preguntas']
resp = lambda i: Q[i]['op'][Q[i]['ok']]
comprobar('t13 quiz1 (12 preguntas con su respuesta recalculada)', len(Q) == 12 and resp(0) == '0,15' and Fr(3, 10) * Fr(5, 10) == Fr(15, 100) and resp(1) == '0,8' and resp(4) == '0,5' and Fr(2, 10) / Fr(4, 10) == Fr(1, 2) and resp(5) == '5/36' and P(dos, lambda d: sum(d) == 8) == Fr(5, 36)
           and resp(6) == '15' and comb(6, 2) == 15 and resp(8) == '0,75' and Fr(45, 100) / Fr(60, 100) == Fr(3, 4) and resp(9) == '7/8' and 1 - Fr(1, 2) ** 3 == Fr(7, 8) and resp(10) == '0,375' and binom(4, 2, Fr(1, 2)) == Fr(3, 8) and all(len(q['op']) == 4 and 0 <= q['ok'] < 4 for q in Q))
Er = D13['datos']['errores']['preguntas']; comprobar('t13 errores (12 preguntas) y cifras citadas', len(Er) == 12 and all(len(q['op']) == 4 and q['ok'] == 1 for q in Er) and abs(1 - (5 / 6) ** 4 - 0.518) < 5e-4 and Fr(5, 8) * Fr(4, 7) == Fr(5, 14))
# clasificación de pares de sucesos del juego «Incompatibles, independientes o dependientes»
cls = D13['datos']['sucesos']['items']; Sx = lambda t: [x for x in cls if x['t'].startswith(t)][0]['c']
pa_as = Fr(4, 40) * Fr(3, 39)
comprobar('t13 clasificar sucesos', Sx('Dado: «sale 2»') == 0 and ({2} & {5} == set()) and Sx('Dado: «sale par» y «sale impar»') == 0 and ({2, 4, 6} & {1, 3, 5} == set()) and Sx('Una carta de la baraja: «es de oros»') == 0
           and Sx('Dos lanzamientos') == 1 and indep(Ac, Bc, mon2) and Sx('Dos dados: «6 en el primero»') == 1 and Sx('Moneda y dado') == 1 and Sx('Dado: «sale par» y «sale menor que 5»') == 1 and indep({2, 4, 6}, {1, 2, 3, 4}, dado)
           and Sx('Una carta de la baraja española: «es un as»') == 1 and Fr(1, 40) == Fr(4, 40) * Fr(10, 40) * 10 / 10 and Fr(1, 40) == Fr(1, 10) * Fr(1, 4)
           and Sx('Dos cartas sin devolver') == 2 and Fr(3, 39) != Fr(4, 40) and Sx('Dado: «sale par» y «sale menor que 4»') == 2 and not indep({2, 4, 6}, {1, 2, 3}, dado) and Sx('Una persona') == 2)
mc_dado = [P(dado, lambda d: d == 6), P(dado, lambda d: d % 2 == 0), P(dos, lambda d: sum(d) == 7), P(mon3, lambda m: m.count('C') == 2), P(baraja, lambda c: c[0] == 1)]
comprobar('t13 simulador de la ley de los números grandes: probabilidades teóricas', mc_dado == [Fr(1, 6), Fr(1, 2), Fr(1, 6), Fr(3, 8), Fr(1, 10)] and Fr(18, 37) + Fr(19, 37) == 1)
# ---- presets del simulador de árbol y de la tabla de contingencia (leídos del código, recalculados aquí) ----
for nombre, a_, b1_, b2_, tot_, bayes_ in [('Test médico', .01, .95, .05, .059, .161), ('Dos máquinas', .6, .02, .05, .032, .375), ('Lluvia', .3, .6, .2, .32, .5625), ('Independientes', .4, .5, .5, .5, .4)]:
    pt = a_ * b1_ + (1 - a_) * b2_
    comprobar(f't13 árbol «{nombre}»', abs(pt - tot_) < 1e-9 and abs(a_ * b1_ / pt - bayes_) < 5e-4)
for nombre, f_ in [('Vacuna y contagio', [[10, 190], [60, 240]]), ('Independientes', [[20, 30], [40, 60]]), ('Gimnasio y lesión', [[12, 8], [88, 92]])]:
    N_ = sum(map(sum, f_)); fi = [sum(r) for r in f_]; co = [f_[0][j] + f_[1][j] for j in range(2)]
    comprobar(f't13 contingencia «{nombre}»', N_ > 0 and all((Fr(fi[i] * co[j], N_) == f_[i][j]) == (nombre == 'Independientes') for i in range(2) for j in range(2)))
comprobar('t13 contingencia «Vacuna y contagio»: valores del widget', Fr(7, 50) == Fr(70, 500) and Fr(2, 5) == Fr(200, 500) and Fr(1, 50) == Fr(10, 500) and Fr(52, 100) == Fr(70 + 200 - 10, 500) and Fr(10, 200) == Fr(1, 20) and Fr(10, 70) == Fr(1, 7))
comprobar('t13 simulador de Venn (1–12, pares y múltiplos de 3)', P(range(1, 13), lambda v: v % 2 == 0 or v % 3 == 0) == Fr(2, 3) and len([v for v in range(1, 13) if v % 2 == 0 and v % 3 == 0]) == 2 and Fr(8, 12) == Fr(2, 3))
comprobar('t13 simulador de la unión (0,5 / 0,4 / 0,2)', Fr(5, 10) + Fr(4, 10) - Fr(2, 10) == Fr(7, 10) and 1 - Fr(7, 10) == Fr(3, 10) and Fr(5, 10) * Fr(4, 10) == Fr(2, 10))
comprobar('t13 simulador de urna (5 rojas, 3 azules)', [Fr(5, 8) * Fr(4, 7), Fr(5, 8) * Fr(3, 7), Fr(3, 8) * Fr(5, 7), Fr(3, 8) * Fr(2, 7)] == [Fr(5, 14), Fr(15, 56), Fr(15, 56), Fr(3, 28)] and Fr(5, 14) + Fr(3, 28) == Fr(13, 28) and 1 - Fr(3, 28) == Fr(25, 28) and Fr(15, 56) * 2 == Fr(15, 28))
comprobar('t13 simulador de Bayes (1 %, 95 %, 95 %): cantidades exactas', 1000 * Fr(1, 100) == 10 and 10 * Fr(95, 100) == Fr(19, 2) and 990 * Fr(5, 100) == Fr(99, 2) and Fr(19, 2) / (Fr(19, 2) + Fr(99, 2)) == Fr(19, 118) and abs(19 / 118 - 0.1610) < 5e-5 and Fr(1881, 2) / (Fr(1881, 2) + Fr(1, 2)) == Fr(1881, 1882) and abs(1881 / 1882 * 100 - 99.95) < 5e-3)
comprobar('t13 simulador binomial (preset 10; 0,5; 5)', binom(10, 5, Fr(1, 2)) == Fr(252, 1024) and abs(float(binom(10, 5, Fr(1, 2))) - 0.2461) < 5e-5 and abs(float(sum(binom(10, k, Fr(1, 2)) for k in range(6))) - 0.623) < 5e-4 and abs(float(sum(binom(10, k, Fr(1, 2)) for k in range(5, 11))) - 0.623) < 5e-4 and 10 * Fr(1, 2) * Fr(1, 2) == Fr(5, 2) and abs(math.sqrt(2.5) - 1.581) < 5e-4)
# ---------------------------------------------------------------------
print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f_ in fallos: print('  FALLO:', f_)
sys.exit(1 if fallos else 0)
