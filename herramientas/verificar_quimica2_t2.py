#!/usr/bin/env python3
"""
Verificación independiente (sympy) de las cifras nuevas de Química II tema 2
(ampliaciones/contenido/quimica2_t02{a,b,c}.js y laboratorios qq2_*): ejemplos resueltos, ejercicios, tablas.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_quimica2_t2.py /tmp/ampl.json
"""
import json, sys
import sympy as sp
from sympy import Rational as Q, sqrt, pi

h = Q(6626, 1) * Q(1, 10**37)           # 6,626e-34
c = 3 * 10**8
e = Q(1602, 1000) * Q(1, 10**19)         # 1,602e-19
me = Q(9109, 1000) * Q(1, 10**31)
RH = Q(1097, 1000) * 10**7
NA = Q(6022, 1000) * 10**23
nm = Q(1, 10**9)
ok, fallos = 0, []


def cerca(a, b, tol=0.006):
    return abs(float(a) - float(b)) <= tol * max(abs(float(b)), 1e-300)


def comp(nombre, calc, dado, tol=0.006):
    global ok
    if cerca(calc, dado, tol):
        ok += 1
    else:
        fallos.append(f'{nombre}: calculado {float(calc):.6g} vs web {dado}')


def cierto(nombre, cond):
    global ok
    if cond:
        ok += 1
    else:
        fallos.append(nombre)


datos = json.load(open(sys.argv[1]))
T2 = datos['ampl']['quimica2']['t2']
EJ = {x['id']: x for x in T2['ejercicios']}


def val(i, k=0):
    ck = EJ[i]['check']
    ck = ck if isinstance(ck, list) else [ck]
    return ck[k]


def num(i, calc, k=0, tol=0.006):
    comp(f'{i}[{k}]', calc, val(i, k)['valor'], tol)


# ---------------- física del átomo ----------------
def inv_lam(nf, ni):
    return RH * (Q(1, nf**2) - Q(1, ni**2))


def lam_nm(nf, ni):
    return 1 / inv_lam(nf, ni) / nm


def En(n, Z=1):
    return -Q(136, 10) * Z**2 / n**2        # eV


def E_foton_J(lam):                      # lam en nm
    return h * c / (lam * nm)


# ---------------- configuraciones (independientes de la web) ----------------
ORDEN = [(1, 0), (2, 0), (2, 1), (3, 0), (3, 1), (4, 0), (3, 2), (4, 1), (5, 0), (4, 2), (5, 1)]
EXC = {24: {(4, 0): 1, (3, 2): 5}, 29: {(4, 0): 1, (3, 2): 10}}


def config(Z, q=0):
    N = Z - q
    if q > 0:
        base = config(Z, 0)
        quitar = q
        for sub in sorted(base, key=lambda s: (-s[0], -s[1])):
            k = min(base[sub], quitar)
            base[sub] -= k
            quitar -= k
        return {s: v for s, v in base.items() if v > 0}
    cfg, resto = {}, N
    for (n, l) in ORDEN:
        if resto <= 0:
            break
        k = min(2 * (2 * l + 1), resto)
        cfg[(n, l)] = k
        resto -= k
    if q == 0 and Z in EXC:
        cfg.update(EXC[Z])
    return {s: v for s, v in cfg.items() if v > 0}


def desap(cfg):
    t = 0
    for (n, l), k in cfg.items():
        o = 2 * l + 1
        t += k if k <= o else 2 * o - k
    return t


# ================= EJERCICIOS =================
cierto('a1', 4**2 == val('a1')['valor'] == sum(2 * l + 1 for l in range(4)))
cierto('a3', val('a3')['valor'] == 2 * 3**2)
cierto('a4 desapareados Cl', desap(config(17)) == val('a4', 1)['valor'])
cierto('a4 config Cl', config(17) == {(1, 0): 2, (2, 0): 2, (2, 1): 6, (3, 0): 2, (3, 1): 5})
num('a5', En(2))
num('a6', E_foton_J(500) / Q(1, 10**19))
num('a7', c / (600 * nm) / 10**14)
cierto('a8 Fe3+ 3d5', config(26, 3)[(3, 2)] == val('a8')['valor'])
cierto('a9 Mn', desap(config(25)) == val('a9')['valor'])
cierto('a10 Na+', config(11, 1) == {(1, 0): 2, (2, 0): 2, (2, 1): 6})
cierto('a12 S valencia', sum(v for (n, l), v in config(16).items() if n == 3) == val('a12')['valor'])
num('a13', h * 3 * 10**15 / Q(1, 10**18))
cierto('a14 4f', 2 * 3 + 1 == val('a14')['valor'])
# Enunciado a2: conjunto (3,2,-3,1/2) → |m| > l
cierto('a2 no válido', abs(-3) > 2 and val('a2')['ok'] == 1)

num('b1', lam_nm(2, 3))
num('b2', En(4) - En(1))
num('b3', 1 / (RH / 4) / nm)
num('b4', 1 / RH / nm)
W_Na = Q(23, 10) * e
num('b5', h * c / W_Na / nm)
Ef = E_foton_J(300)
num('b6', (Ef - W_Na) / e)
num('b7', sqrt(2 * (Ef - W_Na) / me) / 10**5)
num('b8', h / (me * Q(22, 10) * 10**6) / Q(1, 10**10))
num('b9', h / (Q(57, 1000) * 40) / Q(1, 10**34))
cierto('b10 opción 0 es 3p', val('b10')['ok'] == 0 and 3 > 1 >= 0 and abs(-1) <= 1)
cierto('b11 Fe2+', desap(config(26, 2)) == val('b11')['valor'])
cierto('b12 Cr', config(24) == {(1, 0): 2, (2, 0): 2, (2, 1): 6, (3, 0): 2, (3, 1): 6, (4, 0): 1, (3, 2): 5})
dia = {nm_: desap(config(Z, q)) for nm_, (Z, q) in {'Cu2+': (29, 2), 'Zn2+': (30, 2), 'Fe3+': (26, 3), 'Cr3+': (24, 3)}.items()}
cierto('b13 diamagnético = Zn2+', [k for k, v in dia.items() if v == 0] == ['Zn2+'] and val('b13')['ok'] == 1)
num('b14', E_foton_J(400) * NA / 1000)
num('b15', c * inv_lam(1, 3) / 10**15)
num('b16', -En(1, 2))

num('c1', lam_nm(2, 4), 0); num('c1', En(4) - En(2), 1); num('c1', c * inv_lam(2, 4) / 10**14, 2)
num('c2', lam_nm(2, 5)); cierto('c2 visible', 380 < float(lam_nm(2, 5)) < 780 and val('c2', 1)['ok'] == 0)
Ec3 = h * c * (1 / (250 * nm) - 1 / (350 * nm))
num('c3', Ec3 / e, 0); num('c3', sqrt(2 * Ec3 / me) / 10**5, 1)
W4 = h * Q(12, 10) * 10**15 - Q(31, 10) * Q(1, 10**19)
num('c4', W4 / Q(1, 10**19), 0); num('c4', W4 / h / 10**14, 1); num('c4', c / (W4 / h) / nm, 2)
Ef5 = E_foton_J(600) / e
cierto('c5 E < W', Ef5 < Q(21, 10) and val('c5')['ok'] == 1)
dv6 = h / (4 * pi * me * Q(1, 10**10))
num('c6', dv6 / 10**5, 0); num('c6', dv6 / (Q(22, 10) * 10**6) * 100, 1)
num('c7', h / (4 * pi * Q(10, 1000) * Q(3, 100)) / Q(1, 10**31))
p8 = sqrt(2 * me * e * 100)
num('c8', h / p8 / Q(1, 10**10))
cfg33 = config(33)
cierto('c9 Z=33, grupo 15, 3 desap', sum(cfg33.values()) == 33 and desap(cfg33) == 3 and (2 + 3) + 10 == 15 and val('c9')['valores'] == [33, 15, 3])
cierto('c10 l=1 Cl', sum(v for (n, l), v in config(17).items() if l == 1) == val('c10')['valor'])
cierto('c11 Cu', [desap(config(29)), desap(config(29, 1)), desap(config(29, 2))] == val('c11')['valores'])
cierto('c12', {k: sum(config(Z, q).values()) for k, (Z, q) in {'S2-': (16, -2), 'Cl-': (17, -1), 'K+': (19, 1), 'Na+': (11, 1)}.items()} == {'S2-': 18, 'Cl-': 18, 'K+': 18, 'Na+': 10} and val('c12')['ok'] == 3)
nf13 = sp.symbols('n', positive=True)
sol = sp.solve(sp.Eq(Q(136, 10) * (1 - 1 / nf13**2), Q(1209, 100)), nf13)
cierto('c13', abs(float(sol[0]) - 3) < 0.01 and val('c13')['valor'] == 3)
cierto('c14', 4 * 3 // 2 == val('c14')['valor'] == len([(i, f) for i in range(1, 5) for f in range(1, i)]))
comp('c15[0]', lam_nm(2, 3), val('c15')['valores'][0]); comp('c15[1]', 4 / RH / nm, val('c15')['valores'][1])
E16 = Q(136, 10) * (1 - Q(1, 4))
Ec16 = E16 - Q(47, 10)
num('c16', Ec16, 0); num('c16', sqrt(2 * Ec16 * e / me) / 10**6, 1)

# ================= EJEMPLOS Y TEXTO (cifras impresas) =================
# sec. 5: escala (canica 1 cm → 1 km)
comp('escala atomo', Q(1, 100) * 10**5, 1000)                        # m
# sec. 6: tabla de series
comp('Lyman 2→1', lam_nm(1, 2), 121.5); comp('Lyman límite', 1 / RH / nm, 91.2)
comp('Balmer 3→2', lam_nm(2, 3), 656.3); comp('Balmer límite', 4 / RH / nm, 364.6)
comp('Paschen 4→3', lam_nm(3, 4), 1875); comp('Paschen límite', 9 / RH / nm, 820.4)
# ejemplo 4→2
il = inv_lam(2, 4)
comp('4→2 1/λ', il, 2.057e6); comp('4→2 λ', 1 / il / nm, 486.2); comp('4→2 ν', c * il, 6.17e14)
comp('4→2 E J', h * c * il, 4.09e-19); comp('4→2 E eV', h * c * il / e, 2.55); comp('4→2 niveles', En(4) - En(2), 2.55)
# ionización
comp('ioniz J', Q(136, 10) * e, 2.18e-18); comp('ioniz kJ/mol', Q(136, 10) * e * NA / 1000, 1312, 0.003)
comp('ioniz λ', h * c / (Q(136, 10) * e) / nm, 91.2, 0.01)
cierto('n líneas n=4', 4 * 3 // 2 == 6)
comp('He+ ioniz', -En(1, 2), 54.4)
# sec. 7: sodio con 300 nm
comp('Na E J', Ef, 6.626e-19); comp('Na E eV', Ef / e, 4.14); comp('Na W J', W_Na, 3.685e-19)
comp('Na λ0', h * c / W_Na / nm, 539, 0.003); comp('Na Ec eV', (Ef - W_Na) / e, 1.84, 0.003)
comp('Na Ec J', Ef - W_Na, 2.94e-19); comp('Na v', sqrt(2 * (Ef - W_Na) / me), 8.0e5, 0.01)
# W desde Ec
comp('W eV', W4 / e, 3.03); comp('ν0', W4 / h, 7.32e14); comp('λ0', c / (W4 / h) / nm, 410, 0.005); comp('hν', h * Q(12, 10) * 10**15, 7.951e-19)
# 400 nm
comp('400nm E eV', Q(12408, 10) / 400, 3.10, 0.002)
cierto('400nm metales', [m for m, w in {'Cs': 2.1, 'Na': 2.3, 'Ca': 2.9, 'Zn': 4.3, 'Cu': 4.7, 'Pt': 5.6}.items() if 3.102 > w] == ['Cs', 'Na', 'Ca'])
comp('Cs Ec 400', 3.102 - 2.1, 1.00, 0.01)
comp('hc eV nm', h * c / e / nm, 1240.8, 0.001)
# sec. 8: De Broglie
comp('Bohr λ', h / (me * Q(219, 100) * 10**6), 3.32e-10, 0.003)
comp('Bohr perímetro', 2 * pi * Q(529, 10000) * nm, 3.32e-10, 0.005)
comp('pelota λ', h / (Q(57, 1000) * 40), 2.9e-34, 0.01)
comp('100 V Ec', e * 100, 1.602e-17); comp('100 V p', p8, 5.40e-24); comp('100 V λ', h / p8, 1.23e-10, 0.005)
comp('Δv electrón', dv6, 5.8e5, 0.01); comp('% de v', dv6 / (Q(22, 10) * 10**6) * 100, 26, 0.02)
comp('Δx bala', h / (4 * pi * Q(10, 1000) * Q(3, 100)), 1.76e-31, 0.005)
# Co y modelo 3
cfg27 = config(27)
cierto('Co Z=27 3d7', sum(cfg27.values()) == 27 and cfg27[(3, 2)] == 7 and desap(cfg27) == 3 and desap(config(27, 3)) == 4)
comp('3→1 E eV', Q(136, 10) * (1 - Q(1, 9)), 12.09); comp('3→1 λ', lam_nm(1, 3), 102.6, 0.002)
comp('Zn Ec', Q(136, 10) * (1 - Q(1, 9)) - Q(43, 10), 7.79, 0.002); comp('Zn Ec J', (Q(136, 10) * (1 - Q(1, 9)) - Q(43, 10)) * e, 1.25e-18, 0.005)
# Se (Z=34), Cu iones, O
cfg34 = config(34)
cierto('Se', sum(cfg34.values()) == 34 and cfg34[(4, 1)] == 4 and cfg34[(3, 2)] == 10 and desap(cfg34) == 2 and 2 + 4 + 10 == 16)
cierto('O 2p4 → 2 desap', desap(config(8)) == 2)
cierto('Cu series', [desap(config(29)), desap(config(29, 1)), desap(config(29, 2))] == [1, 0, 1])
cierto('N 3 desap', desap(config(7)) == 3)
cierto('Fe3+ = 23 e', sum(config(26, 3).values()) == 23)
cierto('Cr 6 desap', desap(config(24)) == 6)
cierto('S 2 desap', desap(config(16)) == 2)
# orbitales: nivel n tiene n² orbitales y 2n² e; capacidades
cierto('capacidades', [2 * (2 * l + 1) for l in range(4)] == [2, 6, 10, 14] and [n**2 for n in (1, 2, 3, 4)] == [1, 4, 9, 16])
# nodos: 1s 0 radial, 2s 1 radial, 2p 1 angular (l)
cierto('nodos', (1 - 0 - 1, 2 - 0 - 1, 2 - 1 - 1) == (0, 1, 0))
# quiz: 250 nm, 700 nm, 550 nm
comp('quiz 250', Q(12408, 10) / 250, 4.96, 0.002); comp('quiz 700', Q(12408, 10) / 700, 1.77, 0.005); comp('quiz 550', Q(12408, 10) / 550, 2.26, 0.005)
comp('quiz 4→1 λ', lam_nm(1, 4), 97, 0.01)
comp('cr umbral cs 600', Q(12408, 10) / Q(21, 10), 591, 0.002)
# tabla del widget qq2_fotoel: pendiente h en eV por 1e14 Hz
comp('pendiente', h * 10**14 / e, 0.4136, 0.001)

print(f'Cifras verificadas: {ok}; fallos: {len(fallos)}')
for f in fallos:
    print('  FALLO', f)
sys.exit(1 if fallos else 0)
