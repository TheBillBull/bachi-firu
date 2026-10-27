#!/usr/bin/env python3
"""
Verificación independiente (sympy) de las cifras nuevas de Química II tema 1
(ampliaciones/contenido/quimica2_t01{a,b,c,d}.js): ejemplos resueltos y ejercicios.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_quimica2_t1.py /tmp/ampl.json
"""
import json, sys
import sympy as sp
from sympy import Rational as Q

R = Q(82, 1000)
NA = Q(6022, 10) * 10**21          # 6,022e23
ok, fallos = 0, []


def cerca(a, b, tol=0.006):
    return abs(float(a) - float(b)) <= tol * max(abs(float(b)), 1e-12)


def comp(nombre, calc, dado, tol=0.006):
    global ok
    if cerca(calc, dado, tol):
        ok += 1
    else:
        fallos.append(f'{nombre}: calculado {float(calc):.5g} vs web {dado}')


def cierto(nombre, cond):
    global ok
    if cond:
        ok += 1
    else:
        fallos.append(nombre)


datos = json.load(open(sys.argv[1]))
EJ = {e['id']: e for e in datos['ampl']['quimica2']['t1']['ejercicios']}


def val(i, k=0):
    c = EJ[i]['check']
    c = c if isinstance(c, list) else [c]
    return c[k]


def num(i, calc, k=0, tol=0.006):
    comp(f'{i}[{k}]', calc, val(i, k)['valor'], tol)


def txt(i, esperado, k=0):
    cierto(f'{i}: {esperado} no está en {val(i, k)["valores"]}', esperado in val(i, k)['valores'])


Cl, Cu, Zn = Q(355, 10), Q(635, 10), Q(654, 10)
T = lambda c: c + 273
a, b = sp.symbols('a b')

# ---------------- ejercicios ----------------
num('c1', Q(49, 98) * 4 * NA / 10**24)
num('c2', 44 / NA * 10**23)
num('c3', Q(20, 40) / Q(1, 2))
num('c4', Q(40, 100) * Q(1, 4) * 56)
d, r = Q(184, 100), Q(96, 100)
num('c5', 1000 * d * r / 98)
num('c6', Q(18, 180) / Q(1, 4))
n = Q(117, 10) / Q(585, 10); nw = Q(90, 18)
num('c7', n / (n + nw))
num('c8', Q(8, 32) * Q(224, 10))
num('c9', Q(1, 2) * R * T(27) / 2)
num('c10', Q(2, 10) * R * T(127) / 4)
num('c11', Q(6, 10) * 250 / 6)
num('c12', 6 * Q(2, 3))
num('c13', 4 * Q(1, 4))
cierto('c14', Q(12, 10) / 12 / (Q(2, 10) / 1) == Q(1, 2))
txt('c14', 'CH2')
d, r = Q(138, 100), Q(63, 100)
n = 1000 * d * r / 63
num('c15', n, 0)
num('c15', n / (1000 * d * (1 - r) / 1000), 1)
num('c16', (Q(150, 1000) * Q(2, 10) + Q(250, 1000) * Q(6, 10)) / Q(4, 10))
num('c17', Q(1, 10) * Q(3, 10) * 3, 0)
num('c17', 2 * Q(3, 10), 1)
d, r = Q(184, 100), Q(96, 100)
M1 = 1000 * d * r / 98
num('c18', Q(1, 10) * Q(500, 1000) / M1 * 1000)
num('c19', Q(289, 100) * R * T(27))
num('c20', 16 * 2 / (R * T(127)))
nT = Q(4, 2) + Q(28, 28); PT = nT * R * T(27) / 20
num('c21', PT, 0)
num('c21', PT / 3, 1)
num('c22', Q(32, 10) / 32 * R * T(20) / Q(740, 760))
num('c23', Q(1, 2) * 2 * Q(50, 1000) * R * T(25))
num('c24', Q(12, 24) / 2 * Q(224, 10), 0)
num('c24', Q(12, 24) * 40, 1)
nH, nO = Q(6, 2), Q(40, 32)
cierto('c25 limitante O2', nO < nH / 2)
num('c25', 2 * nO * 18, 0)
num('c25', (nH - 2 * nO) * 2, 1)
num('c26', Q(25) * Q(80, 100) / Zn * Q(224, 10))
num('c27', Q(98) / (Q(200, 100) * 56) * 100)
x = sp.symbols('x')
sol = sp.solve(sp.Eq((Q(500, 100) - Q(320, 100)) / 18 / (Q(320, 100) / (Cu + 32 + 64)), x), x)[0]
num('c28', sol)
nC = Q(440, 100) / 44; nHh = 2 * Q(270, 100) / 18; nOo = (Q(230, 100) - nC * 12 - nHh) / 16
comp('c29 C/O', nC / nOo, 2); comp('c29 H/O', nHh / nOo, 6); comp('c29 M', 2 * 12 + 6 + 16, 46)
txt('c29', 'C2H6O')
cierto('c30 más moléculas H2', Q(10, 2) > Q(10, 32))
cierto('c30 la opción correcta menciona H', 'H' in val('c30')['opciones'][val('c30')['ok']])
num('c31', Q(50, 1000) * Q(2, 10) * 2 / Q(250, 1000))
mm = Q(78, 100) * 28 + Q(21, 100) * 32 + Q(1, 100) * 40
num('c32', mm, 0)
num('c32', mm / (R * T(25)), 1)
d, r = Q(118, 100), Q(36, 100)
M1 = 1000 * d * r / (Cl + 1)
num('c33', M1, 0)
num('c33', Q(1, 10) * 500 / M1, 1)
nMg = Q(5, 24); nHCl = Q(15, 10) * Q(1, 10)
nH2 = min(nMg, nHCl / 2)
cierto('c34 limitante HCl', nHCl / 2 < nMg)
num('c34', nH2 * R * T(27), 0)
num('c34', (nMg - nH2) * 24, 1)
nCa = Q(50) * Q(9, 10) / 100; nHc = Q(2) * Q(2, 10)
cierto('c35 limitante HCl', nHc / 2 < nCa)
num('c35', nHc / 2 * R * T(25), 1)
s = sp.solve([a + b - 8, a / 100 + b / 84 - Q(192, 100) / Q(224, 10)], [a, b])
num('c36', s[a], 0); num('c36', s[b], 1)
s = sp.solve([a + b - 20, a / 2 + 2 * b - 22], [a, b])
num('c37', s[a], 0); num('c37', s[b], 1)
nC = Q(264, 100) / 44; nHh = 2 * Q(144, 100) / 18; nOo = (Q(120, 100) - nC * 12 - nHh) / 16
Mm = Q(60, 100) * R * T(127) / Q(328, 1000)
num('c38', Mm, 0)
comp('c38 C/O', nC / nOo, 3); comp('c38 H/O', nHh / nOo, 8); comp('c38 M(C3H8O)', 36 + 8 + 16, 60)
txt('c38', 'C3H8O', 1)
d, r = Q(114, 100), Q(20, 100)
n = 1000 * d * r / 98; mw = 1000 * d * (1 - r)
num('c39', n, 0); num('c39', n / (mw / 1000), 1); num('c39', n / (n + mw / 18), 2)
nA = Q(25, 1000) * Q(4, 10); nB = Q(60, 1000) * Q(5, 10)
cierto('c40 sobra NaOH', nB > 2 * nA)
num('c40', (nB - 2 * nA) / Q(85, 1000))
num('c41', Q(65, 65) * Q(3, 2) * Q(8, 10) * R * T(127))
num('c42', Q(125, 10) / (Cu + 32 + 64 + 90) / Q(1, 4))
num('c43', (100 - 60) + 30)
m = Q(15, 10)
num('c44', m / ((1000 + m * 98) / Q(109, 100) / 1000))
nZn = Q(20) * Q(9, 10) / Zn; nHCl = Q(200, 1000) * Q(5, 10)
num('c46', min(nZn, nHCl / 2) * Q(8, 10) * R * T(27) / Q(750, 760))
num('c47', 2 * 2 / (R * T(27)) * (14 + 4 + Cl))
nT = Q(2, 10) + Q(3, 10) + Q(5, 10); PT = nT * R * T(100) / 5
num('c48', PT, 0); num('c48', PT * Q(3, 10), 1)
M1 = 1000 * Q(119, 100) * Q(37, 100) / (Cl + 1)
comp('c45 M', M1, 12.06); comp('c45 V', Q(5, 10) * 250 / M1, 10.36)

# ---------------- ejemplos de la teoría ----------------
comp('ej NH3 átomos H', Q(34, 10) / 17 * NA * 3 / 10**23, 3.61)
comp('ej hidrato masa', Q(1, 10) * (Cu + 32 + 64 + 90), 24.95)
comp('ej hidrato agua %', Q(90) / (Cu + 32 + 64 + 90), 0.36, 0.01)
comp('ej CO2 n', Q(56, 10) / Q(224, 10), 0.25); comp('ej CO2 g', Q(1, 4) * 44, 11)
comp('ej CO2 moléc', Q(1, 4) * NA / 10**23, 1.5055, 0.001)
comp('ej CO2 átomos O', Q(1, 4) * 2 * NA / 10**23, 3.01, 0.002)
r = Q(37, 100); n = 1190 * r / Q(365, 10); mw = 1190 * (1 - r)
comp('ej HCl M', n, 12.06); comp('ej HCl m(HCl)', 1190 * r, 440.3)
comp('ej HCl agua kg', mw / 1000, 0.7497, 0.001); comp('ej HCl molal', n / (mw / 1000), 16.09)
comp('ej HCl mol agua', mw / 18, 41.65); comp('ej HCl x', n / (n + mw / 18), 0.2246, 0.002)
comp('ej molal→M', 2 / ((1000 + 80) / Q(106, 100) / 1000), 1.96, 0.003)
comp('ej molal V mL', Q(1080) / Q(106, 100), 1018.9, 0.001)
comp('ej diluir HCl', Q(5, 10) * 250 / Q(1206, 100), 10.4, 0.005)
comp('ej mezcla', (Q(5, 10) * Q(2, 10) + 2 * Q(3, 10)) / Q(5, 10), 1.4)
comp('ej n gas', 2 * 5 / (R * 300), 0.407, 0.002)
comp('ej mmHg V', Q(3, 2) * R * 293 / Q(740, 760), 37.0, 0.003)
comp('ej mmHg V (62,4)', Q(15, 10) * Q(624, 10) * 293 / 740, 37.1, 0.003)
comp('ej masa molar gas', Q(110, 100) * R * 300 / Q(615, 1000), 44.0, 0.003)
nHe, nO2 = Q(8, 4), Q(16, 32); nT = nHe + nO2; P = nT * R * 300 / 10
comp('ej p tot', P, 6.15); comp('ej pHe', P * nHe / nT, 4.92); comp('ej pO2', P * nO2 / nT, 1.23)
comp('ej Zn V', Q(2, 10) * R * 298, 4.89, 0.002); comp('ej Zn CN', Q(2, 10) * Q(224, 10), 4.48)
comp('ej H2SO4/NaOH', Q(8, 10) * Q(25, 1000) / 2 / Q(5, 10) * 1000, 20)
comp('ej CO2 740 V', Q(2) * Q(50, 1000) / 2 * R * 293 / Q(740, 760), 1.23, 0.004)
nAl, nCl2 = Q(100, 10) / 27, Q(100, 10) / 71
comp('ej Al nAl', nAl, 0.370, 0.002); comp('ej Al nCl2', nCl2, 0.1408, 0.002)
comp('ej AlCl3 mol', nCl2 * 2 / 3, 0.0939, 0.002); comp('ej AlCl3 g', nCl2 * 2 / 3 * (27 + 3 * Cl), 12.5, 0.003)
comp('ej Al reacciona', nCl2 * 2 / 3 * 27, 2.54, 0.003); comp('ej Al sobra', 10 - nCl2 * 2 / 3 * 27, 7.46, 0.003)
comp('ej Zn/HCl V', Q(5, 100) * R * 298, 1.22, 0.004); comp('ej Zn sobra g', Q(5, 100) * Zn, 3.27, 0.002)
comp('ej caliza V', Q(153, 100) * R * 298, 37.4, 0.002)
comp('ej rend NH3', Q(85, 10) / (Q(14, 28) * 2 * 17) * 100, 50)
comp('ej CHO H/C', Q(67, 10) / (Q(400, 10) / 12), 2.01, 0.003)
comp('ej comb C', Q(2200, 1000) / 44 * 12, 0.600); comp('ej comb H', 2 * Q(900, 1000) / 18, 0.100)
comp('ej comb O', (Q(150, 100) - Q(6, 10) - Q(1, 10)) / 16, 0.0500)
nH2O = (Q(500, 100) - Q(319, 100)) / 18; nsal = Q(319, 100) / (Cu + 32 + 64)
comp('ej x agua', nH2O, 0.1006, 0.002); comp('ej x sal', nsal, 0.0200, 0.002); comp('ej x', nH2O / nsal, 5.03, 0.003)
nco2 = Q(250, 100) / Q(224, 10)
s = sp.solve([a + b - 10, a / 100 + b / 84 - nco2], [a, b])
comp('ej carb CO2', nco2, 0.1116, 0.002); comp('ej carb x', s[a], 3.91, 0.003); comp('ej carb y', s[b], 6.09, 0.003)
nh = Q(1446, 1000) / (R * 298)
s = sp.solve([a + b - Q(150, 100), a / Zn + Q(3, 2) * b / 27 - nh], [a, b])
comp('ej aleación nH2', nh, 0.0592, 0.002); comp('ej aleación Zn', s[a], 0.600, 0.01); comp('ej aleación Al', s[b], 0.900, 0.01)
s = sp.solve([a + b - 10, 2 * a + Q(7, 2) * b - 26], [a, b])
comp('ej gases CH4', s[a], 6); comp('ej gases C2H6', s[b], 4)

print(f'Cifras verificadas: {ok}; fallos: {len(fallos)}')
for f in fallos:
    print('  FALLO', f)
sys.exit(1 if fallos else 0)
