#!/usr/bin/env python3
"""
Verificación independiente (sympy, aritmética exacta) del tema 1 de Matemáticas II (álgebra de matrices):
  · cada ejemplo resuelto de la teoría,
  · la respuesta de cada ejercicio (se compara con el valor que lleva la web en su corrector),
  · los datos de los simuladores (potencias y su fórmula, inversas, rangos según el parámetro).
No comparte código con la web: recalcula todo desde cero.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_mates2_t1.py /tmp/ampl.json
"""
import json, sys
import sympy as sp
from sympy import Matrix as M, Rational as R, eye, zeros, symbols

datos = json.load(open(sys.argv[1]))
ej = {e['id']: e for e in datos['ampl']['mates2']['t1']['ejercicios']}
ok = 0
fallos = []

def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

def vals(m):  # valores de una matriz en orden de lectura
    return [sp.nsimplify(x) for x in m]

n_, a_, m_, k_ = symbols('n a m k')

# ---------------------------------------------------------------------------------------------
# 1. Ejemplos resueltos de la teoría
# ---------------------------------------------------------------------------------------------
A = M(3, 3, lambda i, j: 2 * (i + 1) - (j + 1))
comprobar('ej aij=2i−j', A == M([[1, 0, -1], [3, 2, 1], [5, 4, 3]]))

# tipos de matrices de la tabla
S = M([[1, 2, 3], [2, 0, -1], [3, -1, 4]]); comprobar('tabla simétrica', S == S.T)
K = M([[0, 2, -3], [-2, 0, 1], [3, -1, 0]]); comprobar('tabla antisimétrica', K == -K.T)
I2 = M([[2, -2], [1, -1]]); comprobar('tabla idempotente', I2 * I2 == I2)
comprobar('tabla involutiva', M([[0, 1], [1, 0]]) ** 2 == eye(2))
comprobar('tabla nilpotente', M([[0, 1], [0, 0]]) ** 2 == zeros(2))
Q = M([[R(3, 5), R(-4, 5)], [R(4, 5), R(3, 5)]]); comprobar('tabla ortogonal', Q.T * Q == eye(2) and Q.inv() == Q.T)
comprobar('ortogonal ≠ simétrica [[1,2],[2,1]]', M([[1, 2], [2, 1]]).T * M([[1, 2], [2, 1]]) != eye(2))

# suma
A = M([[1, 2], [3, 4]]); B = M([[2, 1], [3, 5]])
X = (2 * B - A) / 3
comprobar('3X+A=2B', X == M([[1, 0], [1, 2]]) and 3 * X + A == 2 * B and 2 * B == M([[4, 2], [6, 10]]) and 2 * B - A == M([[3, 0], [3, 6]]))

# producto
A = M([[1, 1], [1, 1]]); B = M([[1, -1], [-1, 1]]); comprobar('AB=O', A * B == zeros(2))
P = M([[1, 0], [0, 0]]); Qm = M([[1, 2], [3, 4]]); Rm = M([[1, 2], [5, 6]])
comprobar('PQ=PR', P * Qm == P * Rm == M([[1, 2], [0, 0]]) and Qm != Rm)
A = M([[1, 1], [0, 1]]); B = M([[1, 0], [1, 1]])
comprobar('(A+B)²', (A + B) ** 2 == M([[5, 4], [4, 5]]) and A + B == M([[2, 1], [1, 2]]))
comprobar('A²,B²,AB,BA', A ** 2 == M([[1, 2], [0, 1]]) and B ** 2 == M([[1, 0], [2, 1]]) and A * B == M([[2, 1], [1, 1]]) and B * A == M([[1, 1], [1, 2]]))
comprobar('A²+2AB+B²≠(A+B)²', A ** 2 + 2 * A * B + B ** 2 == M([[6, 4], [4, 4]]) and A ** 2 + 2 * A * B + B ** 2 != (A + B) ** 2)
comprobar('A²+AB+BA+B²=(A+B)²', A ** 2 + A * B + B * A + B ** 2 == (A + B) ** 2)
# conmutan con [[0,1],[0,0]]
a, b, c, d = symbols('a b c d'); Xs = M([[a, b], [c, d]]); An = M([[0, 1], [0, 0]])
sol = sp.solve(list(An * Xs - Xs * An), [c, d], dict=True)[0]
comprobar('conmutan con N', sol == {c: 0, d: a} and An * Xs == M([[c, d], [0, 0]]) and Xs * An == M([[0, a], [0, c]]))

# potencias
A = M([[1, 1], [0, 1]]); comprobar('A² y A³ de [[1,1],[0,1]]', A ** 2 == M([[1, 2], [0, 1]]) and A ** 3 == M([[1, 3], [0, 1]]))
comprobar('inducción A^n=[[1,n],[0,1]] (n=1..15)', all(A ** i == M([[1, i], [0, 1]]) for i in range(1, 16)))
N3 = M([[0, 1, 0], [0, 0, 1], [0, 0, 0]]); comprobar('nilpotente 3×3', N3 ** 2 == M([[0, 0, 1], [0, 0, 0], [0, 0, 0]]) and N3 ** 3 == zeros(3))
A = M([[1, 2, 3], [0, 1, 2], [0, 0, 1]]); N = A - eye(3)
comprobar('I+N: N, N², N³', N == M([[0, 2, 3], [0, 0, 2], [0, 0, 0]]) and N ** 2 == M([[0, 0, 4], [0, 0, 0], [0, 0, 0]]) and N ** 3 == zeros(3))
comprobar('I+N: Aⁿ=[[1,2n,2n²+n],[0,1,2n],[0,0,1]] (n=1..12)', all(A ** i == M([[1, 2 * i, 2 * i * i + i], [0, 1, 2 * i], [0, 0, 1]]) for i in range(1, 13)))
comprobar('I+N: a13(A²)=10', (A ** 2)[0, 2] == 10)
A = M([[0, -1], [1, 0]]); comprobar('periodo 4: A²=−I, A²⁰²³=[[0,1],[−1,0]]', A ** 2 == -eye(2) and A ** 2023 == M([[0, 1], [-1, 0]]) and 2023 % 4 == 3)
B = M([[1, 2], [-1, -2]]); comprobar('B²=−B y Bⁿ=(−1)^(n−1)B (n=1..12)', B ** 2 == M([[-1, -2], [1, 2]]) == -B and all(B ** i == (-1) ** (i - 1) * B for i in range(1, 13)))
F = lambda i: sp.fibonacci(i)
A = M([[1, 1], [1, 0]]); comprobar('Fibonacci Aⁿ (n=1..20)', all(A ** i == M([[F(i + 1), F(i)], [F(i), F(i - 1)]]) for i in range(1, 21)))

# traspuesta
A = M([[1, 2], [0, 3]]); B = M([[4, 0], [1, 5]])
comprobar('(AB)ᵗ=BᵗAᵗ', A * B == M([[6, 10], [3, 15]]) and (A * B).T == M([[6, 3], [10, 15]]) == B.T * A.T and A.T * B.T == M([[4, 1], [8, 17]]))
A = M([[1, 4], [2, 3]]); Ss = (A + A.T) / 2; Kk = (A - A.T) / 2
comprobar('descomposición S+K', Ss == M([[1, 3], [3, 3]]) and Kk == M([[0, 1], [-1, 0]]) and Ss + Kk == A and Ss == Ss.T and Kk == -Kk.T)
comprobar('A+Aᵗ, A−Aᵗ, AAᵗ para A aleatoria 3×3', all((lambda A: (A + A.T) == (A + A.T).T and (A - A.T) == -(A - A.T).T and A * A.T == (A * A.T).T)(M(3, 3, lambda i, j: (i * 7 + j * 5 + s) % 9 - 4)) for s in range(5)))

# inversa
A = M([[1, 2, 3], [0, 1, 4], [1, 0, 6]])
comprobar('Gauss-Jordan 3×3: det 11 e inversa', A.det() == 11 and A.inv() == M([[6, -12, 5], [4, 3, -4], [-1, 2, 1]]) / 11)
# pasos intermedios de la ampliada
def ampl(A): return A.row_join(eye(A.rows))
Mx = ampl(A)
Mx[2, :] = Mx[2, :] - Mx[0, :]; comprobar('GJ paso F3−F1', Mx == M([[1, 2, 3, 1, 0, 0], [0, 1, 4, 0, 1, 0], [0, -2, 3, -1, 0, 1]]))
Mx[0, :] = Mx[0, :] - 2 * Mx[1, :]; Mx[2, :] = Mx[2, :] + 2 * Mx[1, :]
comprobar('GJ paso F1−2F2, F3+2F2', Mx == M([[1, 0, -5, 1, -2, 0], [0, 1, 4, 0, 1, 0], [0, 0, 11, -1, 2, 1]]))
Mx[2, :] = Mx[2, :] / 11; comprobar('GJ F3÷11', list(Mx[2, :]) == [0, 0, 1, R(-1, 11), R(2, 11), R(1, 11)])
Mx[0, :] = Mx[0, :] + 5 * Mx[2, :]; Mx[1, :] = Mx[1, :] - 4 * Mx[2, :]
comprobar('GJ final', Mx == M([[1, 0, 0, R(6, 11), R(-12, 11), R(5, 11)], [0, 1, 0, R(4, 11), R(3, 11), R(-4, 11)], [0, 0, 1, R(-1, 11), R(2, 11), R(1, 11)]]))
comprobar('GJ comprobación fila1·col1=11/11 y fila1·col2=0', (A[0, :] * M([6, 4, -1]))[0] == 11 and (A[0, :] * M([-12, 3, 2]))[0] == 0)
A = M([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); Mx = A.copy()
Mx[1, :] = Mx[1, :] - 4 * Mx[0, :]; Mx[2, :] = Mx[2, :] - 7 * Mx[0, :]
comprobar('singular: pasos', list(Mx[1, :]) == [0, -3, -6] and list(Mx[2, :]) == [0, -6, -12] and list(Mx[2, :] - 2 * Mx[1, :]) == [0, 0, 0] and A.rank() == 2 and A.det() == 0)
A = M([[3, 5], [1, 2]]); comprobar('inversa 2×2 atajo', A.det() == 1 and A.inv() == M([[2, -5], [-1, 3]]) and A * M([[2, -5], [-1, 3]]) == eye(2))
A = M([[1, 1], [0, 1]]); B = M([[2, 1], [1, 1]])
comprobar('(AB)⁻¹=B⁻¹A⁻¹', A * B == M([[3, 2], [1, 1]]) and (A * B).det() == 1 and (A * B).inv() == M([[1, -2], [-1, 3]]) == B.inv() * A.inv()
          and A.inv() == M([[1, -1], [0, 1]]) and B.inv() == M([[1, -1], [-1, 2]]) and A.inv() * B.inv() == M([[2, -3], [-1, 2]]))
A = M([[1, 2], [0, 1]]); comprobar('A²−2A+I=O → A⁻¹=2I−A', A ** 2 - 2 * A + eye(2) == zeros(2) and 2 * eye(2) - A == M([[1, -2], [0, 1]]) == A.inv() and A * (2 * eye(2) - A) == eye(2))
Ap = M([[1, a_], [2, 4]]); comprobar('inversa con parámetro: det=4−2a', sp.expand(Ap.det()) == 4 - 2 * a_ and Ap.subs(a_, 1).inv() == M([[2, R(-1, 2)], [-1, R(1, 2)]]))

# ecuaciones
A = M([[2, 1], [5, 3]]); B = M([[1, 0], [2, 1]])
comprobar('AX=B, XA=B', A.det() == 1 and A.inv() == M([[3, -1], [-5, 2]]) and A.inv() * B == M([[1, -1], [-1, 2]]) and B * A.inv() == M([[3, -1], [1, 0]])
          and A * M([[1, -1], [-1, 2]]) == B and M([[3, -1], [1, 0]]) * A == B)
A = M([[1, 2], [0, 1]]); B = M([[1, 0], [1, 1]]); C = M([[3, 1], [2, 3]])
Xx = A.inv() * (C - B); comprobar('AX+B=C', C - B == M([[2, 1], [1, 2]]) and A.inv() == M([[1, -2], [0, 1]]) and Xx == M([[0, -3], [1, 2]]) and A * Xx + B == C)
A = M([[1, 2], [3, 4]]); Xx = (A + eye(2)).inv() * 4 * eye(2)
comprobar('AX+X=4I', (A + eye(2)) == M([[2, 2], [3, 5]]) and (A + eye(2)).det() == 4 and (A + eye(2)).inv() == M([[5, -2], [-3, 2]]) / 4 and Xx == M([[5, -2], [-3, 2]]) and A * Xx + Xx == 4 * eye(2))
Aa = M([[3, 3], [0, 6]]); Bb = M([[0, 3], [3, 0]]); X1, Y1 = symbols('X1 Y1')
Xx = (Aa + Bb) / 3; Yy = Xx - Bb
comprobar('sistema 2X+Y=A, X−Y=B', Aa + Bb == M([[3, 6], [3, 6]]) and Xx == M([[1, 2], [1, 2]]) and Yy == M([[1, -1], [-2, 2]]) and 2 * Xx + Yy == Aa and Xx - Yy == Bb)

# rango
comprobar('rango [[1,2,3],[2,4,6],[1,0,1]] = 2', M([[1, 2, 3], [2, 4, 6], [1, 0, 1]]).rank() == 2)
Mr = M([[1, 2, 3], [2, 4, 6], [1, 0, 1]]); Mr[1, :] -= 2 * Mr[0, :]; Mr[2, :] -= Mr[0, :]; comprobar('rango: F3−F1=(0,−2,−2)', list(Mr[2, :]) == [0, -2, -2] and list(Mr[1, :]) == [0, 0, 0])
Mr = M([[1, 2, 0, 1], [2, 1, 3, 0], [3, 3, 3, 1]]); comprobar('rango 3×4 = 2 y F3=F1+F2', Mr.rank() == 2 and Mr[2, :] == Mr[0, :] + Mr[1, :])
Mr[1, :] -= 2 * Mr[0, :]; Mr[2, :] -= 3 * Mr[0, :]; comprobar('rango 3×4: filas intermedias', list(Mr[1, :]) == [0, -3, 3, -2] and list(Mr[2, :]) == [0, -3, 3, -2])
Mp = M([[1, 1, a_], [1, a_, 1], [a_, 1, 1]])
comprobar('rango parámetro: det = −(a−1)²(a+2)', sp.factor(Mp.det()) == -(a_ - 1) ** 2 * (a_ + 2))
Gp = Mp.copy(); Gp[1, :] -= Gp[0, :]; Gp[2, :] -= a_ * Gp[0, :]
comprobar('rango parámetro: filas tras F2−F1, F3−aF1', [sp.expand(x) for x in Gp[1, :]] == [0, a_ - 1, 1 - a_] and [sp.expand(x) for x in Gp[2, :]] == [0, 1 - a_, sp.expand(1 - a_ ** 2)])
Gp[2, :] += Gp[1, :]; comprobar('rango parámetro: pivote (1−a)(a+2)', sp.expand(Gp[2, 2] - (1 - a_) * (a_ + 2)) == 0 and Gp[2, 0] == 0 and sp.expand(Gp[2, 1]) == 0)
comprobar('rango p1: a=1→1, a=−2→2, otros→3', Mp.subs(a_, 1).rank() == 1 and Mp.subs(a_, -2).rank() == 2 and all(Mp.subs(a_, v).rank() == 3 for v in [0, 2, -1, 3, R(1, 2)])
          and list((Mp.subs(a_, -2).rref()[0])[:2, :]) == [1, 0, -1, 0, 1, -1])
Np = M([[1, a_, 2], [a_, 4, 2 * a_]]); Gn = Np.copy(); Gn[1, :] -= a_ * Gn[0, :]
comprobar('rango 2×3: fila 2 = (0, 4−a², 0)', [sp.expand(x) for x in Gn[1, :]] == [0, 4 - a_ ** 2, 0] and Np.subs(a_, 2).rank() == 1 and Np.subs(a_, -2).rank() == 1 and Np.subs(a_, 0).rank() == 2)

# contexto
Ap = M([[2, 1, 0], [1, 1, 1]]); c = M([3, 5, 2]); p = M([[100, 50]])
comprobar('taller: A·c, p·A, total', Ap * c == M([11, 10]) and p * Ap == M([[250, 150, 50]]) and (p * Ap * c)[0] == 1600 and (p * (Ap * c))[0] == 1600)
G = M([[0, 1, 1], [1, 0, 1], [0, 1, 0]]); comprobar('grafo: A²', G ** 2 == M([[1, 1, 1], [0, 2, 1], [1, 0, 1]]) and (G ** 2)[1, 1] == 2)

# ---------------------------------------------------------------------------------------------
# 2. Simuladores: datos de los presets
# ---------------------------------------------------------------------------------------------
POT = [
    (M([[2, 0], [0, -1]]), lambda n: M([[2 ** n, 0], [0, (-1) ** n]])),
    (M([[1, 1], [0, 1]]), lambda n: M([[1, n], [0, 1]])),
    (M([[2, 1], [0, 2]]), lambda n: M([[2 ** n, n * 2 ** (n - 1)], [0, 2 ** n]])),
    (M([[1, 1, 1], [0, 1, 1], [0, 0, 1]]), lambda n: M([[1, n, n * (n + 1) // 2], [0, 1, n], [0, 0, 1]])),
    (N3, lambda n: N3 if n == 1 else (N3 ** 2 if n == 2 else zeros(3))),
    (M([[2, -2], [1, -1]]), lambda n: M([[2, -2], [1, -1]])),
    (M([[0, 1], [1, 0]]), lambda n: M([[0, 1], [1, 0]]) if n % 2 else eye(2)),
    (M([[0, -1], [1, 0]]), lambda n: [None, M([[0, -1], [1, 0]]), -eye(2), M([[0, 1], [-1, 0]]), eye(2)][n % 4 or 4]),
    (M([[1, 1], [1, 0]]), lambda n: M([[F(n + 1), F(n)], [F(n), F(n - 1)]])),
]
for i, (Am, f) in enumerate(POT):
    comprobar(f'preset potencias {i} (n=1..12)', all(Am ** k == f(k) for k in range(1, 13)))
GJ = [M([[2, 1], [5, 3]]), M([[1, 2, 3], [0, 1, 4], [1, 0, 6]]), M([[0, 1, 2], [1, 0, 3], [4, -3, 8]])]
comprobar('presets de Gauss-Jordan invertibles (det 1, 11 y -9... )', all(g.det() != 0 and g * g.inv() == eye(g.rows) for g in GJ) and GJ[0].inv() == M([[3, -1], [-5, 2]]) and GJ[1].det() == 11)
comprobar('det del preset con intercambio ≠ 0', M([[0, 1, 2], [1, 0, 3], [4, -3, 8]]).det() != 0)
comprobar('presets sin inversa', M([[1, 2], [2, 4]]).det() == 0 and M([[1, 2, 3], [4, 5, 6], [7, 8, 9]]).det() == 0)
EQ_A = M([[2, 1], [5, 3]]); EQ_B = M([[4, 1], [9, 2]]); EQ_C = M([[1, 2], [3, 4]])
comprobar('preset ecuaciones: A, B invertibles; A+I y A−I invertibles', all(x.det() != 0 for x in [EQ_A, EQ_B, EQ_A + eye(2), EQ_A - eye(2)]) and EQ_A.inv() * EQ_B == M([[3, 1], [-2, -1]]))
rangp = [
    (lambda a: M([[1, 1, a], [1, a, 1], [a, 1, 1]]), {1: 1, -2: 2}, 3),
    (lambda a: M([[1, a, 2], [a, 4, 2 * a]]), {2: 1, -2: 1}, 2),
    (lambda a: M([[a, 1, 0], [0, a, 1], [1, 0, a]]), {-1: 2}, 3),
    (lambda a: M([[1, 1, 1, a], [1, a, 1, 1], [a, 1, 1, 1]]), {1: 1}, 3),
]
for i, (f, crit, mx) in enumerate(rangp):
    r = {R(k, 2): f(R(k, 2)).rank() for k in range(-8, 9)}
    comprobar(f'preset rango {i}: rango según a (a = −4…4 de medio en medio)', all(v == crit.get(k, mx) for k, v in r.items()), str(r))

# ---------------------------------------------------------------------------------------------
# 3. Ejercicios: respuesta esperada, calculada aquí, frente al valor del corrector de la web
# ---------------------------------------------------------------------------------------------
def esp(id_, *valores):
    """valores: números, listas (lista de valores) o textos (opción); se compara con la lista `check`."""
    e = ej[id_]; chk = e['check'] if isinstance(e['check'], list) else [e['check']]
    comprobar(f'{id_} número de campos', len(chk) == len(valores), f'{len(chk)} frente a {len(valores)}')
    for i, (c, v) in enumerate(zip(chk, valores)):
        nombre = f'{id_}[{i}]'
        if c['tipo'] == 'num':
            comprobar(nombre, abs(float(v) - c['valor']) < 1e-9, f"{c['valor']} frente a {float(v)}")
        elif c['tipo'] == 'lista':
            comprobar(nombre, sorted(float(x) for x in v) == sorted(c['valores']), f"{c['valores']} frente a {v}")
        elif c['tipo'] == 'expr':
            f1 = sp.sympify(c['expr'].replace('^', '**'), locals={'n': n_});
            comprobar(nombre, all(sp.simplify(f1.subs(n_, t) - v.subs(n_, t)) == 0 for t in range(1, 8)), f"{c['expr']} frente a {v}")
        elif c['tipo'] == 'opcion':
            comprobar(nombre, c['opciones'][c['ok']] == v, f"{c['opciones'][c['ok']]} frente a {v}")
        elif c['tipo'] == 'rubrica':
            comprobar(nombre, True)

A = M([[2, -1, 0], [3, 4, 5]]); esp('b1', '2×3', A[0, 1], A[1, 2])
Ab = M(2, 3, lambda i, j: (i + 1) ** 2 - (j + 1)); esp('b2', Ab[1, 0], sum(Ab))
esp('b3', *vals(2 * M([[1, 2], [3, 4]]) - 3 * M([[0, -1], [2, 1]])))
m32, m24 = M.zeros(3, 2), M.zeros(2, 4)
ok_ab = m32.shape[1] == m24.shape[0]; ok_ba = m24.shape[1] == m32.shape[0]
esp('b4', f'{m32.shape[0]}×{m24.shape[1]}' if ok_ab else 'no existe', 'no existe' if not ok_ba else 'existe')
esp('b5', *vals(M([[1, 2], [0, 1]]) * M([[3, 0], [1, 4]])), 'No')
comprobar('b5 AB≠BA', M([[1, 2], [0, 1]]) * M([[3, 0], [1, 4]]) != M([[3, 0], [1, 4]]) * M([[1, 2], [0, 1]]) and M([[3, 0], [1, 4]]) * M([[1, 2], [0, 1]]) == M([[3, 6], [1, 6]]))
esp('b6', *vals(M([[1, 0, 2], [-1, 3, 1]]) * M([[3, 1], [2, 1], [1, 0]])))
At = M([[1, 2, 3], [4, 5, 6]]).T; esp('b7', At[2, 0], At[1, 1])
esp('b8', *vals(M([[3, 1], [5, 2]]).inv()))
esp('b9', sp.solve(1 * 6 - 2 * k_, k_)[0])
Dg = M([[2, 0], [0, 3]]) ** 3; esp('b10', *vals(Dg))
nil = lambda X: next(i for i in range(1, 10) if X ** i == zeros(X.rows))
esp('b11', nil(M([[0, 1], [0, 0]])), nil(N3))
esp('b12', M([[1, 2], [2, 4]]).rank(), M([[1, 2, 3], [0, 1, 1], [1, 3, 4]]).rank())
esp('b13', *vals(M([[1, 1], [0, 1]]).inv() * M([3, 2])))
b14 = [M([[0, 2], [-2, 0]]), M([[0, 2], [2, 0]]), M([[1, 2], [-2, 1]]), M([[0, 2], [-2, 1]])]
comprobar('b14 solo la primera es antisimétrica', [x == -x.T for x in b14] == [True, False, False, False])
esp('b14', 'filas (0, 2) y (−2, 0)')
esp('b15', *vals(M([[1, 2, 3], [0, 1, -1]]) * M([2, 1, 1])))

esp('c1', *vals(M([[1, -1], [2, 3]]) ** 2))
Ac = M([[1, 2], [0, 1]]); Bc = M([[1, 0], [3, 1]]); esp('c2', *vals(Ac * Bc - Bc * Ac))
Ax = M([[2, 0], [0, 3]]); a, b, c, d = symbols('a b c d'); Xs = M([[a, b], [c, d]])
sol = sp.solve(list(Ax * Xs - Xs * Ax), [b, c], dict=True)[0]
esp('c3', sol[b], sol[c], 2 if sol == {b: 0, c: 0} else None)
esp('c4', *vals((M([[1, 2], [3, 4]]) * M([[0, 1], [1, 0]])).T))
Ac5 = M([[1, 2, 0], [0, 1, 3]]); esp('c5', *vals(Ac5 * Ac5.T)); comprobar('c5 simétrica', Ac5 * Ac5.T == (Ac5 * Ac5.T).T)
Ai = M([[1, 1, 0], [0, 1, 1], [1, 0, 1]]).inv(); esp('c6', Ai[0, 0], Ai[1, 2], Ai[2, 0])
esp('c7', *vals(M([[1, 0], [2, 1]]) * M([[1, 2], [1, 3]]).inv()))
esp('c8', *vals(M([[2, 1], [1, 1]]).inv() * (M([[4, 3], [1, 5]]) - M([[1, 1], [0, 2]]))))
aa = symbols('aa'); Am = M([[2, -2], [aa, -1]]); sc9 = sp.solve(list(Am ** 2 - Am), aa, dict=True); comprobar('c9 única solución', sc9 == [{aa: 1}]); esp('c9', sc9[0][aa])
x_, y_, z_, w_ = symbols('x_ y_ z_ w_'); Ak = M([[x_, 2, y_], [z_, 0, -3], [1, w_, x_]])
s10 = sp.solve(list(Ak + Ak.T), [x_, y_, z_, w_], dict=True)[0]; esp('c10', s10[y_], s10[z_], s10[w_]); comprobar('c10 x=0', s10[x_] == 0)
A11 = M([[2, 1], [-1, 0]]); comprobar('c11 A²−2A+I=O', A11 ** 2 - 2 * A11 + eye(2) == zeros(2) and A11 ** 2 == M([[3, 2], [-2, -1]]) and 2 * A11 == M([[4, 2], [-2, 0]]))
esp('c11', *vals(A11.inv()))
A12 = M([[1, 0], [3, 1]]); comprobar('c12 patrón', all(A12 ** i == M([[1, 0], [3 * i, 1]]) for i in range(1, 25)) and A12 ** 2 == M([[1, 0], [6, 1]]) and A12 ** 3 == M([[1, 0], [9, 1]]))
esp('c12', 3 * n_, (A12 ** 20)[1, 0])
B13 = M([[2, 0], [0, 3]]); esp('c13', 2 ** n_, 3 ** n_); comprobar('c13 diag', all(B13 ** i == M([[2 ** i, 0], [0, 3 ** i]]) for i in range(1, 9)))
M14 = M([[1, 1, 1], [1, m_, 1], [1, 1, m_]]); comprobar('c14 det=(m−1)²', sp.factor(M14.det()) == (m_ - 1) ** 2)
G14 = M14.copy(); G14[1, :] -= G14[0, :]; G14[2, :] -= G14[0, :]; comprobar('c14 filas', [sp.expand(x) for x in G14[1, :]] == [0, m_ - 1, 0] and [sp.expand(x) for x in G14[2, :]] == [0, 0, m_ - 1])
comprobar('c14 rangos', M14.subs(m_, 1).rank() == 1 and all(M14.subs(m_, v).rank() == 3 for v in [0, 2, -1, 5]))
esp('c14', 1, M14.subs(m_, 1).rank())
X15 = M([[1, 2], [3, 4]]) + M([[0, 1], [1, 0]]); esp('c15', *vals(X15)); comprobar('c15 sustitución', 2 * X15 - M([[1, 2], [3, 4]]) == M([[0, 1], [1, 0]]) + X15)
esp('c16', *vals(M([[10, 20, 5], [8, 15, 12]]) * M([3, 4, 5])))
esp('c17', *vals(M([[2, 4], [1, 3]]).inv()))

A1 = M([[1, 1, 0], [0, 1, 1], [0, 0, 1]]); N1 = A1 - eye(3)
comprobar('d1 patrón (n=1..15)', all(A1 ** i == M([[1, i, i * (i - 1) // 2], [0, 1, i], [0, 0, 1]]) for i in range(1, 16)) and N1 ** 3 == zeros(3) and N1 ** 2 == M([[0, 0, 1], [0, 0, 0], [0, 0, 0]]))
esp('d1', n_ * (n_ - 1) / 2, (A1 ** 10)[0, 2])
A2 = M([[3, 1], [0, 3]]); comprobar('d2 3I+N', all(A2 ** i == 3 ** i * eye(2) + i * 3 ** (i - 1) * M([[0, 1], [0, 0]]) for i in range(1, 9))); esp('d2', *vals(A2 ** 5))
A3 = M([[0, 1], [-1, 0]]); comprobar('d3 periodo', A3 ** 2 == -eye(2) and A3 ** 4 == eye(2) and 2025 % 4 == 1); esp('d3', *vals(A3 ** 2025))
A4 = M([[1, 1], [1, 0]]); comprobar('d4 A¹⁰', A4 ** 10 == M([[89, 55], [55, 34]]) and F(10) == 55); esp('d4', (A4 ** 10)[0, 1])
S5 = M([[3, 1], [2, 0]]); D5 = M([[1, -1], [0, 2]]); A5 = (S5 + D5) / 2; B5 = (S5 - D5) / 2
comprobar('d5 B', B5 == M([[1, 1], [1, -1]]) and A5 + B5 == S5 and A5 - B5 == D5 and 2 * A5 == M([[4, 0], [2, 2]])); esp('d5', *vals(A5))
A6 = M([[3, 1], [0, 4]]); B6 = M([[1, 2], [3, 4]]); X6 = B6 * (A6 - 2 * eye(2)).inv()
comprobar('d6 pasos', A6 - 2 * eye(2) == M([[1, 1], [0, 2]]) and (A6 - 2 * eye(2)).inv() == M([[1, R(-1, 2)], [0, R(1, 2)]]) and X6 * A6 - 2 * X6 == B6); esp('d6', *vals(X6))
A7 = M([[1, 1], [1, 0]]); comprobar('d7 A²=A+I', A7 ** 2 == A7 + eye(2) == M([[2, 1], [1, 1]]) and A7 * (A7 - eye(2)) == eye(2)); esp('d7', *vals(A7.inv()))
A8 = M([[aa, 1], [4, aa]]); esp('d8', sp.solve(A8.det(), aa))
Mp = M([[1, 1, a_], [1, a_, 1], [a_, 1, 1]])
esp('d9', sp.solve(Mp.det(), a_), Mp.subs(a_, -2).rank(), Mp.subs(a_, 1).rank())
M10 = M([[1, 2, -1, 3], [2, 4, a_, 6], [-1, -2, 1, -3]]); comprobar('d10 F3=−F1', M10[2, :] == -M10[0, :])
G10 = M10.copy(); G10[1, :] -= 2 * G10[0, :]; comprobar('d10 F2−2F1', [sp.expand(x) for x in G10[1, :]] == [0, 0, a_ + 2, 0] and M10.subs(a_, -2).rank() == 1 and M10.subs(a_, 0).rank() == 2)
esp('d10', sp.solve(a_ + 2, a_)[0])
cnt = sum(1 for p1 in (0, 1) for p2 in (0, 1) if (M([[p1, 0], [0, p2]])) ** 2 == M([[p1, 0], [0, p2]])); comprobar('d11 búsqueda: x²=x → x∈{0,1}', set(sp.solve(sp.Symbol('t') ** 2 - sp.Symbol('t'))) == {0, 1}); esp('d11', cnt)
Ai12 = M([[1, 2], [0, 1]]); Bi12 = M([[1, 0], [3, 1]]); esp('d12', *vals(Bi12 * Ai12)); comprobar('d12 (AB)⁻¹', (Ai12.inv() * Bi12.inv()).inv() == Bi12 * Ai12 and Ai12 * Bi12 == M([[7, 2], [3, 1]]))
Aq = M([[0, 1], [-1, 0]]); comprobar('d13 numérico: A antisimétrica ⇒ A² simétrica', all((lambda A: A == -A.T and A ** 2 == (A ** 2).T)(M([[0, p, q], [-p, 0, r], [-q, -r, 0]])) for p in range(-2, 3) for q in range(-2, 3) for r in range(-2, 3)))
A14 = M([[1, 1], [0, 1]]); B14 = M([[1, 0], [1, 1]]); X14 = A14.inv() * B14 * A14
comprobar('d14 pasos', A14.inv() * B14 == M([[0, -1], [1, 1]]) and A14 * X14 * A14.inv() == B14); esp('d14', *vals(X14))
N15 = M([[0, 1, 1], [0, 0, 1], [0, 0, 0]]); comprobar('d15', N15 ** 2 == M([[0, 0, 1], [0, 0, 0], [0, 0, 0]]) and N15 ** 3 == zeros(3) and (eye(3) - N15).inv() == eye(3) + N15 + N15 ** 2 == M([[1, 1, 2], [0, 1, 1], [0, 0, 1]]))
esp('d15', (eye(3) - N15).inv()[0, 2])

# todos los ejercicios del tema tienen verificación
tocados = {k for k in ej}
comprobar('cobertura: 47 ejercicios', len(ej) == 47, str(len(ej)))

# ---------------------------------------------------------------------------------------------
# 4. Actividades: cada afirmación numérica de test y clasificar
# ---------------------------------------------------------------------------------------------
cl = datos['ampl']['mates2']['t1']['datos']['tipos']
import re
def matriz_de_html(t):
    """lee la matriz que T.m escribió como tabla HTML: devuelve lista de filas con Rational"""
    filas = re.findall(r'<tr>(.*?)</tr>', t)
    out = []
    for f in filas:
        celdas = re.findall(r'<td[^>]*>(.*?)</td>', f)
        fila = []
        for ce in celdas:
            ce = ce.replace('−', '-')
            fr = re.search(r"class='num'>(\d+)</span><span class='den'>(\d+)", ce)
            if fr: v = R(int(fr.group(1)), int(fr.group(2))) * (-1 if re.sub(r'<[^>]+>', '', ce).strip().startswith('-') else 1)
            else: v = R(int(re.sub(r'<[^>]+>', '', ce)))
            fila.append(v)
        out.append(fila)
    return M(out)
for it in cl['items']:
    X = matriz_de_html(it['t']); c = it['c']
    cum = [X == X.T, X == -X.T, X * X == X, X.T * X == eye(X.rows)]
    comprobar(f"clasificar {it['t'][:60]}", cum[c] and sum(cum) == 1, str(cum))
q = datos['ampl']['mates2']['t1']['datos']['quiz1']['preguntas']
comprobar('test: a₁₂ de A⁵⁰ = 50', M([[1, 1], [0, 1]]) ** 50 == M([[1, 50], [0, 1]]) and q[11]['op'][q[11]['ok']] == '50')
comprobar('test: rango de [[1,2],[2,4]] = 1', M([[1, 2], [2, 4]]).rank() == 1 and q[4]['op'][q[4]['ok']] == '1')
comprobar('test: A²=I ⇒ A²⁰²³=A (con el giro de intercambio)', M([[0, 1], [1, 0]]) ** 2023 == M([[0, 1], [1, 0]]))
comprobar('errores: [[0,1],[0,0]]² = O, [[1,1],[0,1]]⁵ = [[1,5],[0,1]]', M([[0, 1], [0, 0]]) ** 2 == zeros(2) and M([[1, 1], [0, 1]]) ** 5 == M([[1, 5], [0, 1]]))
comprobar('errores: AB=AC con A=[[1,0],[0,0]]', M([[1, 0], [0, 0]]) * M([[1, 2], [3, 4]]) == M([[1, 0], [0, 0]]) * M([[1, 2], [5, 6]]))
comprobar('errores: [[0,2],[−2,3]] no antisimétrica', M([[0, 2], [-2, 3]]) != -M([[0, 2], [-2, 3]]).T)
comprobar('emparejar: soluciones simbólicas (X con matrices aleatorias invertibles)', all((lambda A, B, C, X: (
    A * (A.inv() * B) == B and (B * A.inv()) * A == B and A * (A.inv() * (C - B)) + B == C and (A + eye(2)) * ((A + eye(2)).inv() * B) == A * ((A + eye(2)).inv() * B) + (A + eye(2)).inv() * B
    and A * (A.inv() * C * B.inv()) * B == C and (B * (A - eye(2)).inv()) * A - (B * (A - eye(2)).inv()) == B))(
        M([[2, 1], [5, 3]]), M([[4, 1], [9, 2]]), M([[1, 2], [3, 4]]), None) for _ in [0]))

total = ok + len(fallos)
if fallos:
    print('FALLOS:'); [print('  ', f) for f in fallos]
    print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
    sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos')
