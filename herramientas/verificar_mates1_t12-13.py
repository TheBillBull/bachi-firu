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
print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f_ in fallos: print('  FALLO:', f_)
sys.exit(1 if fallos else 0)
