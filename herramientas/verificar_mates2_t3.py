#!/usr/bin/env python3
"""
Verificación independiente (sympy, aritmética exacta) del tema 3 de Matemáticas II (sistemas de ecuaciones lineales):
  · cada ejemplo resuelto de la teoría (rangos, soluciones, determinantes, discusiones),
  · la respuesta de cada ejercicio (se compara con el valor que lleva la web en su corrector),
  · lo que calculan los simuladores (Gauss, discusor, planos, Cramer, problemas) frente a sympy,
  · las actividades (test, errores, clasificar).
No comparte código con la web: recalcula todo desde cero.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      node herramientas/volcar_mates2_t3.js > /tmp/t3_sim.json
      python3 herramientas/verificar_mates2_t3.py /tmp/ampl.json /tmp/t3_sim.json
"""
import json, sys
import sympy as sp
from sympy import Matrix as M, Rational as R, symbols, eye

datos = json.load(open(sys.argv[1]))
# El volcado de los simuladores se genera aquí si no se pasa (así funciona también desde comprobar_todo.sh,
# que pasa otro JSON como segundo argumento).
import os, subprocess
_raiz = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
sim = json.loads(subprocess.run(['node', os.path.join(_raiz, 'herramientas', 'volcar_mates2_t3.js')],
                                capture_output=True, text=True, check=True, cwd=_raiz).stdout)
T3 = datos['ampl']['mates2']['t3']
ej = {e['id']: e for e in T3['ejercicios']}
ok = 0
fallos = []

def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

x, y, z, t, m, l, b = symbols('x y z t m l b')

def rangos(A, B):
    A = M(A); B = M(B)
    return A.rank(), A.row_join(B).rank()

def tipo(A, B):
    A = M(A); n = A.cols; r1, r2 = rangos(A, B)
    return 'SI' if r1 != r2 else ('SCD' if r1 == n else 'SCI')

def solve(A, B, vs=(x, y, z)):
    return sp.linsolve((M(A), M(B)), *vs)

TIPOS = {'SCD': 'SCD (solución única)', 'SCI': 'SCI (infinitas soluciones)', 'SI': 'SI (sin solución)'}

# ---------------------------------------------------------------------------------------------
# 1. Ejemplos resueltos de la teoría
# ---------------------------------------------------------------------------------------------
A = M([[2, -1, 3], [1, 0, 2], [0, 3, -1]]); B_ = M([3, 2, 3])
comprobar('ej matricial: (2,1,0) es solución', A * M([2, 1, 0]) == B_)
comprobar('ej matricial: det(A) = −4', A.det() == -4 and A.LUsolve(B_) == M([2, 1, 0]))
A2 = M([[2, 3], [1, -1]])
comprobar('ej inversa 2×2: A⁻¹ y X = (3, 2)', A2.inv() == M([[R(1, 5), R(3, 5)], [R(1, 5), R(-2, 5)]]) and A2.inv() * M([12, 1]) == M([3, 2]) and A2.det() == -5)
# Gauss con intercambio
A = [[2, 1, -1], [1, -2, 1], [3, 1, 2]]; Bv = [-1, 5, 6]
comprobar('ej Gauss SCD: solución (1,−1,2)', solve(A, Bv) == sp.FiniteSet((1, -1, 2)))
Mx = M([[1, -2, 1, 5], [2, 1, -1, -1], [3, 1, 2, 6]])
Mx[1, :] = Mx[1, :] - 2 * Mx[0, :]; Mx[2, :] = Mx[2, :] - 3 * Mx[0, :]
comprobar('ej Gauss SCD: tras F2,F3 = (0 5 −3 −11), (0 7 −1 −9)', Mx.tolist()[1] == [0, 5, -3, -11] and Mx.tolist()[2] == [0, 7, -1, -9])
Mx[2, :] = 5 * Mx[2, :] - 7 * Mx[1, :]
comprobar('ej Gauss SCD: F3 ← 5F3 − 7F2 = (0 0 16 32)', Mx.tolist()[2] == [0, 0, 16, 32])
# SCI
comprobar('ej Gauss SCI: rangos 2,2 y solución (1−λ/3, (5λ−6)/3, λ)', rangos([[1, -1, 2], [2, 1, -1], [3, 0, 1]], [3, 0, 3]) == (2, 2)
          and solve([[1, -1, 2], [2, 1, -1], [3, 0, 1]], [3, 0, 3]) == sp.FiniteSet((1 - z / 3, (5 * z - 6) / 3, z)))
sol = lambda tt: (1 - tt, 5 * tt - 2, 3 * tt)
comprobar('ej Gauss SCI: con t = 1 → (0,3,3) cumple las 3', M([[1, -1, 2], [2, 1, -1], [3, 0, 1]]) * M(sol(1)) == M([3, 0, 3]) and sol(1) == (0, 3, 3))
Mx = M([[1, -1, 2, 3], [2, 1, -1, 0], [3, 0, 1, 3]]); Mx[1, :] -= 2 * Mx[0, :]; Mx[2, :] -= 3 * Mx[0, :]
comprobar('ej Gauss SCI: (0 3 −5 −6) en F2 y F3', Mx.tolist()[1] == [0, 3, -5, -6] and Mx.tolist()[2] == [0, 3, -5, -6])
# SI
comprobar('ej Gauss SI: rangos 2 y 3', rangos([[1, 1, -1], [2, -1, 1], [3, 0, 0]], [1, 2, 5]) == (2, 3))
Mx = M([[1, 1, -1, 1], [2, -1, 1, 2], [3, 0, 0, 5]]); Mx[1, :] -= 2 * Mx[0, :]; Mx[2, :] -= 3 * Mx[0, :]
comprobar('ej Gauss SI: filas (0 −3 3 0), (0 −3 3 2)', Mx.tolist()[1] == [0, -3, 3, 0] and Mx.tolist()[2] == [0, -3, 3, 2])
# 4 ecuaciones
A4 = [[1, 1, 1], [1, -1, 1], [0, 1, -1], [2, 0, 2]]; B4 = [4, 2, -1, 6]
comprobar('ej 4×3: SCD (1,1,2), rangos 3,3', solve(A4, B4) == sp.FiniteSet((1, 1, 2)) and rangos(A4, B4) == (3, 3))
comprobar('ej 4×3: la 4.ª ecuación es F1 + F2', [a + c for a, c in zip(A4[0], A4[1])] == A4[3] and B4[0] + B4[1] == B4[3])
# 2×3
comprobar('ej 2×3: solución (1−λ, 1+λ, λ) y recta por (1,1,0) dirección (−1,1,1)', solve([[1, 2, -1], [2, -1, 3]], [3, 1]) == sp.FiniteSet((1 - z, 1 + z, z)))
# Rouché con b
Ar = [[1, 2, -1], [2, 1, 1], [3, 3, 0]]
comprobar('ej Rouché b: rg(A) = 2, det(A)=0, menor = −3', M(Ar).rank() == 2 and M(Ar).det() == 0 and M([[1, 2], [2, 1]]).det() == -3)
comprobar('ej Rouché b: det orlado = 9 − 3b', sp.expand(M([[1, 2, 1], [2, 1, 2], [3, 3, b]]).det() - (9 - 3 * b)) == 0)
comprobar('ej Rouché b: b=3 SCI, b≠3 SI', tipo(Ar, [1, 2, 3]) == 'SCI' and all(tipo(Ar, [1, 2, bb]) == 'SI' for bb in [0, 1, 2, 4, 5, -7]))
comprobar('ej Rouché b=3: solución (1−λ, λ, λ)', solve(Ar, [1, 2, 3]) == sp.FiniteSet((1 - z, z, z)))
# Homogéneos
Ah = [[1, 1, 1], [2, -1, 3], [4, 1, 5]]
comprobar('ej homogéneo: F3 = 2F1 + F2, rg 2, solución λ(−4,1,3)/3', [2 * a + c for a, c in zip(Ah[0], Ah[1])] == Ah[2] and M(Ah).rank() == 2
          and solve(Ah, [0, 0, 0]) == sp.FiniteSet((-4 * z / 3, z / 3, z)))
Ahm = M([[1, 1, 1], [2, m, 1], [1, 1, m]])
comprobar('ej homogéneo m: det = (m−1)(m−2)', sp.expand(Ahm.det() - (m - 1) * (m - 2)) == 0)
comprobar('ej homogéneo m=1: (0, −λ, λ)', solve(Ahm.subs(m, 1), [0, 0, 0]) == sp.FiniteSet((0, -z, z)))
comprobar('ej homogéneo m=2: (λ, −λ, 0)', solve(Ahm.subs(m, 2), [0, 0, 0]) == sp.FiniteSet((-y, y, 0)))
comprobar('ej homogéneo m≠1,2: solo la trivial', all(solve(Ahm.subs(m, v), [0, 0, 0]) == sp.FiniteSet((0, 0, 0)) for v in [0, 3, -1, R(1, 2)]))
# Discusión clásica
A1 = M([[m, 1, 1], [1, m, 1], [1, 1, m]]); B1 = M([1, m, m ** 2])
comprobar('ej clásico: det = (m−1)²(m+2)', sp.expand(A1.det() - (m - 1) ** 2 * (m + 2)) == 0 and sp.expand(A1.det() - (m ** 3 - 3 * m + 2)) == 0)
comprobar('ej clásico: m=1 SCI rango 1; m=−2 SI con rangos 2,3', rangos(A1.subs(m, 1), B1.subs(m, 1)) == (1, 1) and rangos(A1.subs(m, -2), B1.subs(m, -2)) == (2, 3))
comprobar('ej clásico: m=−2 la suma de las 3 ecuaciones da 0 = 3', sum(A1.subs(m, -2)[:, 0]) == 0 and sum(A1.subs(m, -2)[:, 1]) == 0 and sum(A1.subs(m, -2)[:, 2]) == 0 and sum(B1.subs(m, -2)) == 3)
comprobar('ej clásico: m=0 → (−1/2, 1/2, 1/2)', A1.subs(m, 0).LUsolve(B1.subs(m, 0)) == M([R(-1, 2), R(1, 2), R(1, 2)]))
comprobar('ej clásico: solución general', [sp.simplify(v) for v in A1.LUsolve(B1)] == [-(m + 1) / (m + 2), 1 / (m + 2), (m + 1) ** 2 / (m + 2)] or
          all(sp.simplify(a - c) == 0 for a, c in zip(A1.LUsolve(B1), [-(m + 1) / (m + 2), 1 / (m + 2), (m + 1) ** 2 / (m + 2)])))
# P2 (SCI y SI)
A2m = M([[1, 1, -1], [2, 3, m], [1, m, 3]]); B2 = M([1, 3, 2])
comprobar('ej P2: det = −(m−2)(m+3)', sp.expand(A2m.det() + (m - 2) * (m + 3)) == 0)
comprobar('ej P2: m=2 SCI, m=−3 SI', tipo(A2m.subs(m, 2), B2) == 'SCI' and tipo(A2m.subs(m, -3), B2) == 'SI' and rangos(A2m.subs(m, 2), B2) == (2, 2) and rangos(A2m.subs(m, -3), B2) == (2, 3))
comprobar('ej P2: orlados 0 (m=2) y 5 (m=−3), menor 1', M([[1, 1, 1], [2, 3, 3], [1, 2, 2]]).det() == 0 and M([[1, 1, 1], [2, 3, 3], [1, -3, 2]]).det() == 5 and M([[1, 1], [2, 3]]).det() == 1)
comprobar('ej P2 m=2: solución (5λ, 1−4λ, λ)', solve(A2m.subs(m, 2), B2) == sp.FiniteSet((5 * z, 1 - 4 * z, z)))
comprobar('ej P2: los otros m son SCD', all(tipo(A2m.subs(m, v), B2) == 'SCD' for v in [0, 1, -1, 5, R(1, 2)]))
# 2×2 con m
A22 = M([[1, m], [m, 4]]); B22 = M([1, 2])
comprobar('ej 2×2: det = 4 − m²; m=2 SCI; m=−2 SI', A22.det() == 4 - m ** 2 and tipo(A22.subs(m, 2), B22) == 'SCI' and tipo(A22.subs(m, -2), B22) == 'SI')
comprobar('ej 2×2 Cramer: x = 2/(m+2), y = 1/(m+2)', sp.simplify(sp.Matrix([[1, m], [2, 4]]).det() / A22.det() - 2 / (m + 2)) == 0 and sp.simplify(sp.Matrix([[1, 1], [m, 2]]).det() / A22.det() - 1 / (m + 2)) == 0
          and sp.Matrix([[1, m], [2, 4]]).det() == 4 - 2 * m and sp.Matrix([[1, 1], [m, 2]]).det() == 2 - m)
comprobar('ej 2×2 Cramer m=0: (1, 1/2)', A22.subs(m, 0).LUsolve(B22) == M([1, R(1, 2)]))
# P3 (A y B con m)
A3 = M([[1, 1, 1], [m, 2, 1], [1, 1, m]]); B3 = M([3, 4, m + 2])
comprobar('ej P3: det = −(m−1)(m−2); m=1 SCI (2,2); m=2 SI (2,3)', sp.expand(A3.det() + (m - 1) * (m - 2)) == 0 and rangos(A3.subs(m, 1), B3.subs(m, 1)) == (2, 2) and rangos(A3.subs(m, 2), B3.subs(m, 2)) == (2, 3))
comprobar('ej P3 m=1: (2−λ, 1, λ)', solve(A3.subs(m, 1), B3.subs(m, 1)) == sp.FiniteSet((2 - z, 1, z)))
comprobar('ej P3 m=2: orlado (columnas 1, 3, B) = 1', M([[1, 1, 3], [2, 1, 4], [1, 2, 4]]).det() == 1 and M([[1, 1], [2, 1]]).det() == -1)
comprobar('ej P3 m=0 Cramer: det −2, (1/2, 3/2, 1)', A3.subs(m, 0).det() == -2 and A3.subs(m, 0).LUsolve(B3.subs(m, 0)) == M([R(1, 2), R(3, 2), 1]))
# Cramer 3×3 z
Ac = M([[2, 1, -1], [1, -2, 1], [3, 1, 2]]); Bc = M([-1, 5, 6])
dets = []
for i in range(3):
    Ai = Ac.copy(); Ai[:, i] = Bc; dets.append(Ai.det())
comprobar('ej Cramer: det(A) = −16; det(Ax,Ay,Az) = −16, 16, −32', Ac.det() == -16 and dets == [-16, 16, -32])
# Subsistema Cramer en SCI (m = 1 del P3)
comprobar('ej subsistema: x = 2−λ, y = 1', M([[1, 1], [1, 2]]).det() == 1 and sp.expand(M([[3 - l, 1], [4 - l, 2]]).det() - (2 - l)) == 0 and sp.expand(M([[1, 3 - l], [1, 4 - l]]).det() - 1) == 0)
# 1 ecuación, dos parámetros
comprobar('ej plano x+2y−z=4: (4−2λ+μ, λ, μ); λ=1, μ=2 → 4', all((4 - 2 * a + c) + 2 * a - c == 4 for a in range(-2, 3) for c in range(-2, 3)) and (4 - 2 + 2) + 2 * 1 - 2 == 4)
comprobar('ej X_p + X_h: homogéneo del SCI = t(−1,5,3)', all(M([[1, -1, 2], [2, 1, -1], [3, 0, 1]]) * M([-1, 5, 3]) == M([0, 0, 0]) for _ in [0]) and M([[1, -1, 2], [2, 1, -1], [3, 0, 1]]) * M([1, -2, 0]) == M([3, 0, 3]))
# Problemas con enunciado
comprobar('ej cine: (66, 36, 18)', solve([[1, 1, 1], [8, 5, 4], [0, 1, -2]], [120, 780, 0]) == sp.FiniteSet((66, 36, 18)) and 8 * 66 + 5 * 36 + 4 * 18 == 780)
Mx = M([[1, 1, 1, 120], [8, 5, 4, 780], [0, 1, -2, 0]]); Mx[1, :] -= 8 * Mx[0, :]
comprobar('ej cine: F2 ← F2 − 8F1 = (0 −3 −4 −180)', Mx.tolist()[1] == [0, -3, -4, -180]); Mx[2, :] = 3 * Mx[2, :] + Mx[1, :]
comprobar('ej cine: F3 ← 3F3 + F2 = (0 0 −10 −180)', Mx.tolist()[2] == [0, 0, -10, -180])
comprobar('ej edades: (30, 10), 40 = 2·20', solve([[1, -3], [1, -2]], [0, 10], (x, y)) == sp.FiniteSet((30, 10)) and 30 + 10 == 2 * (10 + 10))
comprobar('ej mezcla incompatible: rangos 2,3 y con x−z=20 el coste sería 760', rangos([[1, 1, 1], [6, 8, 10], [1, 0, -1]], [100, 820, 20]) == (2, 3)
          and all(6 * a + 8 * (100 - a - c) + 10 * c == 800 - 2 * (a - c) for a in range(0, 50) for c in range(0, 50) if a + c <= 100))
# Geometría
comprobar('ej rectas: x+y=3, 2x+2y=7 son SI', tipo([[1, 1], [2, 2]], [3, 7]) == 'SI' and tipo([[1, 1], [2, 2]], [3, 6]) == 'SCI')
comprobar('ej geometría P2: m=2 haz, m=−3 prisma (sin normales proporcionales)',
          M([[1, 1, -1], [2, 3, 2], [1, 2, 3]]).rank() == 2 and M([[1, 1, -1], [2, 3, -3], [1, -3, 3]]).rank() == 2
          and all(M([a, c]).rank() == 2 for a, c in [([1, 1, -1], [2, 3, 2]), ([1, 1, -1], [1, 2, 3]), ([2, 3, 2], [1, 2, 3]), ([1, 1, -1], [2, 3, -3]), ([1, 1, -1], [1, -3, 3]), ([2, 3, -3], [1, -3, 3])]))
# EvAU redactado
Ae = M([[1, 1, 1], [m, 1, 1], [1, m, 1]]); Be = M([m + 1, 1, m])
comprobar('ej EvAU: det = (m−1)²; m=1 SI (1,2); m=0 → (0,1,0)', sp.expand(Ae.det() - (m - 1) ** 2) == 0 and rangos(Ae.subs(m, 1), Be.subs(m, 1)) == (1, 2) and Ae.subs(m, 0).LUsolve(Be.subs(m, 0)) == M([0, 1, 0]))
comprobar('ej EvAU: los demás m son SCD', all(tipo(Ae.subs(m, v), Be.subs(m, v)) == 'SCD' for v in [0, 2, -1, 5, R(1, 2)]))
# Tabla de problemas (frases)
comprobar('tabla frases: 7,6 €/kg × 100 kg = 760 €', R(76, 10) * 100 == 760)
# Observación rg(A) ≤ rg(A|B) ≤ rg(A)+1
import random
random.seed(5); okr = True
for _ in range(80):
    A_ = M(3, 3, lambda i, j: random.randint(-2, 2)); B_ = M(3, 1, lambda i, j: random.randint(-2, 2)); r1, r2 = rangos(A_, B_)
    okr = okr and r1 <= r2 <= r1 + 1
comprobar('rg(A) ≤ rg(A|B) ≤ rg(A) + 1 (80 sistemas aleatorios)', okr)

# ---------------------------------------------------------------------------------------------
# 2. Ejercicios: respuesta esperada, calculada aquí, frente al valor del corrector de la web
# ---------------------------------------------------------------------------------------------
def esp(id_, *valores):
    e = ej[id_]; chk = e['check'] if isinstance(e['check'], list) else [e['check']]
    comprobar(f'{id_} número de campos', len(chk) == len(valores), f'{len(chk)} frente a {len(valores)}')
    for i, (c, v) in enumerate(zip(chk, valores)):
        nombre = f'{id_}[{i}]'
        if c['tipo'] == 'num':
            comprobar(nombre, abs(float(v) - c['valor']) < 1e-4, f"{c['valor']} frente a {float(v)}")
        elif c['tipo'] == 'lista':
            comprobar(nombre, sorted(float(q) for q in v) == sorted(c['valores']), f"{c['valores']} frente a {v}")
        elif c['tipo'] == 'opcion':
            comprobar(nombre, c['opciones'][c['ok']] == v, f"{c['opciones'][c['ok']]} frente a {v}")

# ★ básicos
A = M([[1, -2, 3], [2, 1, 0], [0, 1, -1]]); Bb = M([4, 5, -1])
esp('b1', '3×4' if A.row_join(Bb).shape == (3, 4) else '?', A[0, 1], A[1, 2], Bb[2])
def es_sol(P, A_, B_): return list(M(A_) * M(P) - M(B_))
def cumple(P, A_, B_): return [int(v == 0) for v in es_sol(P, A_, B_)]
c = cumple([1, 2, -1], [[1, 1, 1], [2, -1, 0], [1, 0, -1]], [2, 0, 2])
esp('b2', 'Sí, cumple las tres' if c == [1, 1, 1] else ('No, falla la primera' if c[0] == 0 else 'No, falla la segunda' if c[1] == 0 else 'No, falla la tercera'))
c = cumple([1, 1, 1], [[1, 2, -1], [3, -1, 0], [1, 1, 1]], [2, 2, 4])
esp('b3', 'Sí, cumple las tres' if c == [1, 1, 1] else ('No, falla la primera' if c[0] == 0 else 'No, falla la segunda' if c[1] == 0 else 'No, falla la tercera'))
esp('b4', TIPOS['SI'] if rangos([[1, 0, 0], [0, 1, 0], [1, 1, 0]], [0, 0, 1]) == (2, 3) else '?')   # un ejemplo con rg 2 y 3
esp('b5', TIPOS['SCI'], 4 - 2)
esp('b6', *[solve([[3, 2], [1, -1]], [7, 4], (x, y)).args[0][i] for i in range(2)])
Ab = M([[2, 1], [1, 3]]); Bb = M([5, 5])
dx = M([[5, 1], [5, 3]]).det(); dy = M([[2, 5], [1, 5]]).det()
esp('b7', Ab.det(), dx / Ab.det(), dy / Ab.det())
esp('b8', *solve([[1, 1, 1], [1, -1, 0], [0, 1, -1]], [6, -1, -1]).args[0])
s9 = solve([[1, -2], [3, -6]], [0, 0], (x, y)); esp('b9', 'Infinitas' if rangos([[1, -2], [3, -6]], [0, 0]) == (1, 1) else '?', list(s9)[0][0].subs(y, 3))
esp('b10', 'No, siempre admite la solución trivial' if all(tipo(M(3, 3, lambda i, j: random.randint(-2, 2)), [0, 0, 0]) != 'SI' for _ in range(40)) else '?')
esp('b11', *M([[2, 1], [1, 1]]).LUsolve(M([3, 2])))
comprobar('b11 A⁻¹ dada', M([[2, 1], [1, 1]]).inv() == M([[1, -1], [-1, 2]]))
s12 = solve([[1, 1], [1, -1]], [25, 7], (x, y)).args[0]; esp('b12', s12[0], s12[1])
esp('b13', 'Paralelas distintas' if tipo([[1, 1], [2, 2]], [3, 7]) == 'SI' else '?')
esp('b14', 'Solo la trivial (0, 0, 0)' if M([[1, 2, 0], [0, 1, 1], [3, 0, 1]]).det() != 0 else '?')   # ejemplo con det ≠ 0
comprobar('b14: det ≠ 0 ⇒ rg = 3 = n', M([[1, 2, 0], [0, 1, 1], [3, 0, 1]]).det() == 7 and tipo(M([[1, 2, 0], [0, 1, 1], [3, 0, 1]]), [0, 0, 0]) == 'SCD')
# ★★ intermedios
esp('m1', *solve([[2, 1, -1], [1, -2, 1], [3, 1, 2]], [-1, 5, 6]).args[0])
Am2 = [[1, -1, 2], [2, 1, -1], [3, 0, 1]]; Bm2 = [3, 0, 3]; s = list(solve(Am2, Bm2))[0]
esp('m2', TIPOS[tipo(Am2, Bm2)], 3 - M(Am2).rank(), s[0].subs(z, 3), s[1].subs(z, 3))
Am3 = [[1, 1, -1], [2, -1, 1], [3, 0, 0]]; Bm3 = [1, 2, 5]; esp('m3', *rangos(Am3, Bm3), TIPOS[tipo(Am3, Bm3)])
esp('m4', *solve(A4, B4).args[0])
s = list(solve([[1, 2, -1], [2, -1, 3]], [3, 1]))[0]; esp('m5', TIPOS['SCI'], s[0].subs(z, 2), s[1].subs(z, 2))
Am6 = M([[1, 2, 1], [2, -1, 3], [1, 1, 4]]); Bm6 = M([5, 1, 6]); s6 = Am6.LUsolve(Bm6)
d6 = []
for i in range(3):
    Ai = Am6.copy(); Ai[:, i] = Bm6; d6.append(Ai.det())
comprobar('m6 Cramer = LU', [d / Am6.det() for d in d6] == list(s6))
esp('m6', Am6.det(), *s6)
d7 = sp.solve(A22.det(), m); esp('m7', d7, TIPOS[tipo(A22.subs(m, 2), B22)], TIPOS[tipo(A22.subs(m, -2), B22)])
d8 = sp.solve(A3.det(), m); esp('m8', d8, TIPOS[tipo(A3.subs(m, 1), B3.subs(m, 1))], TIPOS[tipo(A3.subs(m, 2), B3.subs(m, 2))])
d9 = sp.solve(Ahm.det(), m); s91 = list(solve(Ahm.subs(m, 1), [0, 0, 0]))[0]; s92 = list(solve(Ahm.subs(m, 2), [0, 0, 0]))[0]
esp('m9', d9, s91[1].subs(z, 5), s92[0].subs(y, 3))
s10 = solve([[1, 1, 1], [1, -2, 0], [0, 1, -4]], [120, -10, 0]).args[0]; esp('m10', *s10)
comprobar('m10: abuelo 70 = 2·40 − 10 y padre 40 = 4·10', s10 == (70, 40, 10) and 70 == 2 * 40 - 10 and 40 == 4 * 10)
s11 = solve([[3, 2, 1], [1, 4, 2], [2, 1, 3]], [17, 24, 22]).args[0]; esp('m11', *s11)
comprobar('m11: det(A) = 25', M([[3, 2, 1], [1, 4, 2], [2, 1, 3]]).det() == 25)
Am12 = [[1, 1, 1], [2, 2, 2], [1, -1, 0]]; Bm12 = [1, 5, 0]
esp('m12', 'Dos paralelos y uno secante' if rangos(Am12, Bm12) == (2, 3) and M([[1, 1, 1], [2, 2, 2]]).rank() == 1 and M([[1, 1, 1, 1], [2, 2, 2, 5]]).rank() == 2 else '?')
Am13 = [[1, -1, 1], [2, 1, -1], [3, 0, 0]]; Bm13 = [2, 1, 3]; s13 = list(solve(Am13, Bm13))[0]
comprobar('m13: haz, ninguna pareja proporcional', rangos(Am13, Bm13) == (2, 2) and all(M([Am13[i] + [Bm13[i]], Am13[j] + [Bm13[j]]]).rank() == 2 for i, j in [(0, 1), (0, 2), (1, 2)]))
esp('m13', 'Una recta (haz de planos)', s13[1].subs(z, 3))
Am14 = [[1, 2, -1], [2, 1, 1], [3, 3, 0]]
esp('m14', 3, TIPOS[tipo(Am14, [1, 2, 5])])
comprobar('m14: b=3 es el único valor compatible', [bb for bb in range(-5, 12) if tipo(Am14, [1, 2, bb]) != 'SI'] == [3])
Am15 = M([[1, 2], [3, 5]]); Ai15 = Am15.inv(); s15 = Ai15 * M([1, 2])
esp('m15', Ai15[0, 0], Ai15[0, 1], Ai15[1, 0], Ai15[1, 1], s15[0], s15[1])
a_ = symbols('a'); Am16 = M([[1, 1], [2, a_]])
esp('m16', sp.solve(Am16.det(), a_)[0], TIPOS[tipo(Am16.subs(a_, 3), [2, 4])])
comprobar('m16: a=2 SCI; a ≠ 2 SCD', tipo(Am16.subs(a_, 2), [2, 4]) == 'SCI' and all(tipo(Am16.subs(a_, v), [2, 4]) == 'SCD' for v in [0, 1, 3, -4]))
esp('m17', 3 - M([[1, -2, 1]]).rank(), 4 + 2 * 1 - 2)
# ★★★ EvAU
Ad1 = M([[m, m + 1, 2], [0, 1, -1], [-1, m + 1, 2]]); Bd1 = M([m, 1, m])
rd1 = sorted(sp.roots(sp.Poly(sp.expand(Ad1.det()), m)).keys())
comprobar('d1: det = (m+1)(m+3)', sp.expand(Ad1.det() - (m + 1) * (m + 3)) == 0)
sd1 = Ad1.subs(m, 0).LUsolve(Bd1.subs(m, 0))
esp('d1', rd1, TIPOS[tipo(Ad1.subs(m, -1), Bd1.subs(m, -1))], TIPOS[tipo(Ad1.subs(m, -3), Bd1.subs(m, -3))], *sd1)
comprobar('d1: los demás m son SCD', all(tipo(Ad1.subs(m, v), Bd1.subs(m, v)) == 'SCD' for v in [-5, -2, 0, 1, 4, R(1, 2)]))
Ad2 = M([[-1, -1, m], [m - 1, 2, 0], [-1, -1, 2]]); Bd2 = M([m, -1, m])
rd2 = sorted(sp.roots(sp.Poly(sp.expand(Ad2.det()), m)).keys())
comprobar('d2: det = −(m−2)(m−3)', sp.expand(Ad2.det() + (m - 2) * (m - 3)) == 0)
sd2 = Ad2.subs(m, 0).LUsolve(Bd2.subs(m, 0))
esp('d2', rd2, TIPOS[tipo(Ad2.subs(m, 2), Bd2.subs(m, 2))], TIPOS[tipo(Ad2.subs(m, 3), Bd2.subs(m, 3))], *sd2)
comprobar('d2: los demás m son SCD', all(tipo(Ad2.subs(m, v), Bd2.subs(m, v)) == 'SCD' for v in [-5, -2, 0, 1, 4, R(5, 2)]))
Ad3 = M([[m, 1, 0], [0, m, 1], [1, 0, m]]); Bd3 = M([1, 0, 0])
reales = [v for v in sp.roots(sp.Poly(sp.expand(Ad3.det()), m), multiple=True) if v.is_real]
comprobar('d3: det = (m+1)(m²−m+1) y única raíz real −1', sp.expand(Ad3.det() - (m + 1) * (m ** 2 - m + 1)) == 0 and reales == [-1] and (m ** 2 - m + 1).subs(m, 0) > 0 and sp.discriminant(m ** 2 - m + 1, m) < 0)
sd3 = Ad3.subs(m, 1).LUsolve(Bd3)
esp('d3', -1 if tipo(Ad3.subs(m, -1), Bd3) == 'SI' else '?', *sd3)
Ad4 = M([[a_, 1, 1], [1, a_, 1], [1, 1, a_]])
rd4 = sorted(sp.roots(sp.Poly(sp.expand(Ad4.det()), a_)).keys())
s42 = list(solve(Ad4.subs(a_, -2), [0, 0, 0]))[0]
comprobar('d4: det = (a−1)²(a+2)', sp.expand(Ad4.det() - (a_ - 1) ** 2 * (a_ + 2)) == 0)
esp('d4', rd4, s42[1].subs(z, 4), 3 - Ad4.subs(a_, 1).rank())
comprobar('d4: a = −2 → (λ,λ,λ)', s42 == (z, z, z))
Ad5 = [[1, 1, 1], [1, 2, 3], [1, 3, 5]]
comprobar('d5: compatible solo si m = 3', [mm for mm in range(-6, 12) if tipo(Ad5, [1, 2, mm]) != 'SI'] == [3] and M(Ad5).det() == 0 and M(Ad5).rank() == 2)
s5 = list(solve(Ad5, [1, 2, 3]))[0]
esp('d5', 3, s5[0].subs(z, 2), s5[1].subs(z, 2))
comprobar('d5: solución (λ, 1−2λ, λ)', s5 == (z, 1 - 2 * z, z))
Ad6 = [[1, 1, 1], [1, 3, 5]]; Bd6 = [10000, 30000]
s6 = list(solve(Ad6, Bd6))[0]
comprobar('d6: 1 %,3 %,5 % → x+3y+5z = 30000 y solución (λ, 10000−2λ, λ)', s6 == (z, 10000 - 2 * z, z) and R(1, 100) * 2500 + R(3, 100) * 5000 + R(5, 100) * 2500 == 300)
lam_max = sp.solve(10000 - 2 * z, z)[0]; lam_y = sp.solve(sp.Eq(10000 - 2 * z, 2 * z), z)[0]
esp('d6', TIPOS['SCI'] if rangos(Ad6, Bd6) == (2, 2) else '?', lam_max, lam_y, 10000 - 2 * lam_y, lam_y)
Ad7 = M([[1, 2, 1], [2, 4, 2], [1, -1, 0]])
comprobar('d7: m=2 SCI (dos coincidentes), m≠2 SI (dos paralelos)', all(tipo(Ad7, [1, mm, 0]) == 'SI' for mm in [0, 1, 3, -2]) and tipo(Ad7, [1, 2, 0]) == 'SCI'
          and M([[1, 2, 1, 1], [2, 4, 2, 2]]).rank() == 1 and M([[1, 2, 1, 1], [2, 4, 2, 3]]).rank() == 2)
esp('d7', 2, 'Dos coincidentes y el tercero los corta en una recta', 'Dos paralelos distintos y un tercero secante')
esp('d8', 'No: el sistema es incompatible' if rangos([[1, 1, 1], [6, 8, 10], [1, 0, -1]], [100, 820, 20]) == (2, 3) else '?')
s9 = solve([[1, 1, 1], [1, -1, -1], [0, 1, -1]], [60, 10, 5]).args[0]
comprobar('d9: m + a + b = 60, m − a − b = 10, a − b = 5 → (35, 15, 10)', s9 == (35, 15, 10))
comprobar('d9: dentro de 10 años 45 = 25 + 20', 35 + 10 == (15 + 10) + (10 + 10))
esp('d10', A3.subs(m, 0).det(), *A3.subs(m, 0).LUsolve(B3.subs(m, 0)))
dd = []
for i in range(3):
    Ai = A3.subs(m, 0).copy(); Ai[:, i] = B3.subs(m, 0); dd.append(Ai.det())
comprobar('d10: det(Ax, Ay, Az) = −1, −3, −2', dd == [-1, -3, -2])
Ad11 = lambda bb: ([[1, 1], [2, -1], [3, 2]], [2, 1, bb])
bb5 = [bb for bb in range(-5, 12) if tipo(*Ad11(bb)) != 'SI']
esp('d11', bb5[0], *solve([[1, 1], [2, -1]], [2, 1], (x, y)).args[0], TIPOS[tipo(*Ad11(6))])
comprobar('d11: solo b = 5 es compatible', bb5 == [5])
a12 = [aa for aa in range(-5, 12) if M([[1, 2, 3], [2, 4, aa]]).rank() == 1]
comprobar('d12: a = 6 normales proporcionales; coinciden con b = 8', a12 == [6] and M([[1, 2, 3, 4], [2, 4, 6, 8]]).rank() == 1 and all(M([[1, 2, 3, 4], [2, 4, 6, bb]]).rank() == 2 for bb in [0, 7, 9]))
esp('d12', a12[0], 8)
A13 = [[1, 1, 1], [1, -1, -1], [0, 1, -1]]; s13 = solve(A13, [180, 0, 10]).args[0]  # A + B + C = 180; A − B − C = 0; B − C = 10
esp('d13', *s13)
comprobar('d13: 90 = 50 + 40, 50 = 40 + 10', s13 == (90, 50, 40) and 90 == 50 + 40 and 50 == 40 + 10)

# ---------------------------------------------------------------------------------------------
# 3. Simuladores: lo que calcula la web frente a sympy
# ---------------------------------------------------------------------------------------------
def mat(rows):
    return M([[sp.nsimplify(c.replace('−', '-')) for c in r] for r in rows])

from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application
TRANS = standard_transformations + (implicit_multiplication_application,)
L_ = symbols('L')
def expr_web(txt_):
    """'1 − λ/3' → expresión sympy en L (λ)."""
    return parse_expr(txt_.replace('−', '-').replace('λ', 'L'), local_dict={'L': L_}, transformations=TRANS)

for g in sim['gauss']:
    Ag = mat(g['A']); n = g['n']; A_ = Ag[:, :n]; B_ = Ag[:, n]
    tp = tipo(A_, B_); r1, r2 = rangos(A_, B_)
    comprobar(f"gauss {g['k']}: tipo y rangos de la web", g['web']['tipo'] == tp and g['web']['rA'] == r1 and g['web']['rAB'] == r2, f"{g['web']} frente a {tp},{r1},{r2}")
    if tp != 'SI':
        vs = symbols('x1:%d' % (n + 1)); sols = sp.linsolve((A_, B_), *vs)
        # cada solución de la web, con λ = 0,1,2, debe cumplir el sistema
        libres = n - r1
        webs = []
        for s_ in g['web']['sol']:
            webs.append(s_.split(' = ', 1)[1])
        okc = True
        for lv in [0, 1, 2, -3]:
            punto = [expr_web(w_).subs(L_, lv) for w_ in webs]
            okc = okc and (A_ * M(punto) == B_)
        comprobar(f"gauss {g['k']}: la solución de la web cumple el sistema para varios λ", okc, str(webs))
        comprobar(f"gauss {g['k']}: nº de parámetros = n − rg", libres == (0 if tp == 'SCD' else n - r1))
    # la última matriz escalonada (antes del resumen) debe tener el mismo rango y ser escalonada
    E = mat(g['ultima'])
    comprobar(f"gauss {g['k']}: matriz escalonada con mismo rango de la ampliada y escalonada", E.rank() == Ag.rank() and all(
        (next((j for j in range(E.cols) if E[i, j] != 0), 99) < next((j for j in range(E.cols) if E[i + 1, j] != 0), 99)) or all(v == 0 for v in E.row(i + 1)) for i in range(E.rows - 1)))
    comprobar(f"gauss {g['k']}: la escalonada tiene las mismas soluciones", tp == 'SI' or sp.linsolve((E[:, :n], E[:, n]), *symbols('x1:%d' % (n + 1))) == sp.linsolve((A_, B_), *symbols('x1:%d' % (n + 1))))

for d in sim['discusor']:
    n = d['n']; crit = sorted(d['crit']); cambia = []
    ok_tipos = True; ok_crit = True
    for c in d['casos']:
        Aug = mat(c['A']); A_ = Aug[:, :n]; B_ = Aug[:, n]
        tp = tipo(A_, B_); ok_tipos = ok_tipos and (tp == c['web'])
    comprobar(f"discusor {d['k']}: el tipo que da la web coincide con sympy en los 33 valores de m", ok_tipos)
    # críticos reales: raíces de det(A) si es cuadrada; si no, los valores donde cambia el tipo (en la rejilla de cuartos)
    tipos_por_m = {c['m']: c['web'] for c in d['casos']}
    for c in crit:
        tp_c = tipos_por_m[float(c)]
        comprobar(f"discusor {d['k']}: m = {c} es crítico (su tipo ≠ SCD)", tp_c != 'SCD')
    comprobar(f"discusor {d['k']}: fuera de los críticos es SCD" if d['k'] not in ('p4', 'p6') else f"discusor {d['k']}: el resto de valores tiene un único tipo",
              all(tipos_por_m[mm] == ('SCD') for mm in tipos_por_m if mm not in crit) if d['k'] not in ('p4',) else all(tipos_por_m[mm] == 'SI' for mm in tipos_por_m if mm not in crit))
# matrices con m simbólico para comprobar los determinantes escritos
DET = {
    'p1': (M([[m, 1, 1], [1, m, 1], [1, 1, m]]), (m - 1) ** 2 * (m + 2)),
    'p2': (M([[1, 1, -1], [2, 3, m], [1, m, 3]]), -(m - 2) * (m + 3)),
    'p3': (M([[1, 1, 1], [m, 2, 1], [1, 1, m]]), -(m - 1) * (m - 2)),
    'p4': (M([[1, 1, 1], [1, 2, 3], [1, 3, 5]]), 0),
    'p5': (M([[1, m], [m, 4]]), (2 - m) * (2 + m)),
    'p6': (M([[1, 1, 1], [2, m, 1], [1, 1, m]]), (m - 1) * (m - 2)),
}
for d in sim['discusor']:
    Ad, det_esp = DET[d['k']]
    comprobar(f"discusor {d['k']}: determinante mostrado ({d['det']})", sp.expand(Ad.det() - det_esp) == 0)

comprobar('discusor: valores críticos declarados = raíces de det(A) (cuadradas con m)',
          all(sorted(sim_d['crit']) == sorted(int(v) for v in sp.roots(sp.Poly(DET[sim_d['k']][1], m)).keys()) for sim_d in sim['discusor'] if sim_d['k'] not in ('p4', 'p6')) and
          sorted(next(q for q in sim['discusor'] if q['k'] == 'p6')['crit']) == [1, 2])

for p in sim['planos']:
    Aug = mat(p['A']); A_ = Aug[:, :3]; B_ = Aug[:, 3]
    tp = tipo(A_, B_); r1, r2 = rangos(A_, B_)
    comprobar(f"planos {p['k']}: tipo y rangos de la web", p['web']['tipo'] == tp and p['web']['rA'] == r1 and p['web']['rAB'] == r2)
    prop = lambda i, j, withB: M([list(Aug.row(i)) if withB else list(A_.row(i)), list(Aug.row(j)) if withB else list(A_.row(j))]).rank() == 1
    par = [(i, j) for i in range(3) for j in range(i + 1, 3) if prop(i, j, False)]
    coin = [(i, j) for (i, j) in par if prop(i, j, True)]
    if tp == 'SCD': esperado = 'único punto'
    elif tp == 'SCI' and r1 == 2: esperado = 'coinciden y el tercero' if par else 'misma recta'
    elif tp == 'SCI': esperado = 'Los tres planos coinciden'
    elif r1 == 1: esperado = 'coinciden y el tercero es paralelo' if coin else 'paralelos y distintos'
    else: esperado = 'paralelos (distintos)' if par else 'prisma'
    comprobar(f"planos {p['k']}: descripción de la posición «{esperado}»", esperado in p['web']['txt'], p['web']['txt'])
# los ejemplos del enunciado: el preset «haz» usa x+y+z=3, x−y=1, 2x+z=4 (suma de las dos primeras)
comprobar('planos: preset haz = suma de las dos primeras filas', mat(next(p for p in sim['planos'] if p['k'] == 'haz')['A'])[2, :] == mat(next(p for p in sim['planos'] if p['k'] == 'haz')['A'])[0, :] + mat(next(p for p in sim['planos'] if p['k'] == 'haz')['A'])[1, :])
pr = mat(next(p for p in sim['planos'] if p['k'] == 'pri')['A'])
comprobar('planos: prisma: 3 rectas de corte paralelas y distintas (dirección común, sin punto común)',
          rangos(pr[:, :3], pr[:, 3]) == (2, 3) and all(M([pr[i, :3], pr[j, :3]]).rank() == 2 for i, j in [(0, 1), (0, 2), (1, 2)]))
comprobar('planos: punto (1,2,3) del preset SCD', solve(mat(next(p for p in sim['planos'] if p['k'] == 'scd')['A'])[:, :3], mat(next(p for p in sim['planos'] if p['k'] == 'scd')['A'])[:, 3]) == sp.FiniteSet((1, 2, 3)))

for c in sim['cramer']:
    Aug = mat(c['A']); n = len(c['A'][0]) - 1; A_ = Aug[:, :n]; B_ = Aug[:, n]
    comprobar(f"cramer {c['k']}: det(A) de la web", sp.nsimplify(c['detWeb'].replace('−', '-')) == A_.det())
    comprobar(f"cramer {c['k']}: tipo de la web", c['web']['tipo'] == tipo(A_, B_))
    if A_.det() != 0:
        sx = A_.LUsolve(B_); dd = []
        for i in range(n):
            Ai = A_.copy(); Ai[:, i] = B_; dd.append(Ai.det() / A_.det())
        comprobar(f"cramer {c['k']}: Cramer = solución", dd == list(sx))
        comprobar(f"cramer {c['k']}: la web da la misma solución", [sp.nsimplify(s_.split(' = ')[1].replace('−', '-')) for s_ in c['web']['sol']] == list(sx))

esperado_prob = {'e': (30, 10), 'c': (66, 36, 18), 'm': (40, 40, 20), 'p': (R(5, 2), R(3, 2), 2)}
for pr_ in sim['problemas']:
    Aug = mat(pr_['A']); n = pr_['n']; A_ = Aug[:, :n]; B_ = Aug[:, n]
    comprobar(f"problema {pr_['k']}: tipo", pr_['web']['tipo'] == tipo(A_, B_), pr_['web']['tipo'])
    if pr_['k'] in esperado_prob:
        comprobar(f"problema {pr_['k']}: solución {esperado_prob[pr_['k']]}", tuple(sp.nsimplify(s_.split(' = ')[1].replace('−', '-')) for s_ in pr_['web']['sol']) == esperado_prob[pr_['k']])
# enunciados con números: cada dato de los cuatro problemas del simulador
comprobar('problema edades: 30 = 3·10 y 40 = 2·20', 30 == 3 * 10 and 30 + 10 == 2 * (10 + 10))
comprobar('problema cine: 8·66 + 5·36 + 4·18 = 780', 8 * 66 + 5 * 36 + 4 * 18 == 780 and 66 + 36 + 18 == 120 and 36 == 2 * 18)
comprobar('problema mezcla: 6·40 + 8·40 + 10·20 = 760 = 7,6·100', 6 * 40 + 8 * 40 + 10 * 20 == 760 == R(76, 10) * 100 and 40 + 40 + 20 == 100 and 40 == 2 * 20)
comprobar('problema precios: 2·2,5 + 1,5 + 2 = 8,5; 2,5 + 3 + 2 = 7,5; 2,5 + 1,5 + 6 = 10', 2 * R(5, 2) + R(3, 2) + 2 == R(17, 2) and R(5, 2) + 2 * R(3, 2) + 2 == R(15, 2) and R(5, 2) + R(3, 2) + 6 == 10)
comprobar('problema fondos: (λ, 6000−2λ, λ); con y = 3x → (1200, 3600, 1200) y 240 € de intereses',
          list(solve([[1, 1, 1], [1, 2, 3]], [6000, 12000]))[0] == (z, 6000 - 2 * z, z) and R(2, 100) * 1200 + R(4, 100) * 3600 + R(6, 100) * 1200 == 240 and 6000 - 2 * 1200 == 3 * 1200 and 1200 + 3600 + 1200 == 6000)

# ---------------------------------------------------------------------------------------------
# 4. Actividades
# ---------------------------------------------------------------------------------------------
cl = T3['datos']['rangos']
CAT = cl['categorias']
import re
def cls_texto(t):
    if 'Al escalonar' in t:
        return 'SI' if '(0 0 0 | 5)' in t else ('SCD' if '3 pivotes en 3' in t else 'SCI')
    if t.startswith('Homogéneo'):
        return 'SCD' if 'det(A) ≠ 0' in t else 'SCI'
    mn = int(re.search(r'(\d) incógnitas', t).group(1))
    mi = re.search(r'rg\(A\) = rg\(A\|B\) = (\d)', t)
    if mi: ra = rab = int(mi.group(1))
    else: ra = int(re.search(r'rg\(A\) = (\d)', t).group(1)); rab = int(re.search(r'rg\(A\|B\) = (\d)', t).group(1))
    return 'SI' if ra != rab else ('SCD' if ra == mn else 'SCI')
for it in cl['items']:
    t_ = it['t']; c_ = CAT[it['c']]; e = cls_texto(t_)
    comprobar(f"clasificar «{t_[:50]}»", e == c_, f'{e} frente a {c_}')
q = T3['datos']['quiz1']['preguntas']
comprobar('test: rangos 2 y 3 (3×3) = incompatible', q[0]['op'][q[0]['ok']] == 'incompatible' and rangos([[1, 0, 0], [0, 1, 0], [1, 1, 0]], [0, 0, 1]) == (2, 3))
comprobar('test: 4 incógnitas con rg 2 → 2 parámetros', q[3]['op'][q[3]['ok']] == '2' and 4 - 2 == 2)
comprobar('test: (m−1)(m+3) → críticos 1 y −3', sorted(sp.solve((m - 1) * (m + 3), m)) == [-3, 1] and q[5]['op'][q[5]['ok']] == 'm ≠ 1 y m ≠ −3')
comprobar('test: 4×3 con rg 3 = SCD (ejemplo)', q[11]['op'][q[11]['ok']] == 'compatible determinado' and tipo(A4, B4) == 'SCD')
comprobar('test: 2 ecuaciones y 3 incógnitas compatible ⇒ SCI (100 sistemas aleatorios)',
          all(tipo(M(2, 3, lambda i, j: random.randint(-2, 2)), M(2, 1, lambda i, j: random.randint(-2, 2))) != 'SCD' for _ in range(100)))
comprobar('test: orlado 0 ⇒ rg(A|B) = 2 (ejemplo b = 3)', q[10]['op'][q[10]['ok']] == '2' and rangos(Ar, [1, 2, 3]) == (2, 2))
comprobar('errores: x=2y no cumple; planos x+y+z=1 y 2x+2y+2z=2 coinciden', tipo([[1, 1, 1], [2, 2, 2]], [1, 2]) == 'SCI' and tipo([[1, 1, 1], [2, 2, 2]], [1, 5]) == 'SI')
comprobar('errores: fila (0 0 0 | 0) en un SCD/SCI (4×3 de la teoría)', tipo(A4, B4) == 'SCD' and rangos(A4, B4)[0] == 3)
comprobar('errores: det(A) = 0 con parámetro solo en B y SCI en b=3', M(Ar).det() == 0 and tipo(Ar, [1, 2, 3]) == 'SCI')
comprobar('errores: 2 ecuaciones 3 incógnitas rg=2 → SCI', tipo([[1, 2, -1], [2, -1, 3]], [3, 1]) == 'SCI')

if fallos:
    print('FALLOS:'); [print('  ', f) for f in fallos]
    print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
    sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos')
