#!/usr/bin/env python3
"""
Verificación independiente (sympy, aritmética exacta) del tema 2 de Matemáticas II (Determinantes):
cada cifra de los ejemplos resueltos, de los ejercicios y de las actividades se recalcula desde cero.
No comparte código con la web.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_mates2_t2.py /tmp/ampl.json
"""
import json, sys, itertools
import sympy as sp
from sympy import Matrix as M, Rational as Q, symbols, factor, sqrt, eye, zeros, simplify

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['mates2']['t2']
E = {e['id']: e for e in T['ejercicios']}
fallos, ok = [], 0
m, a, k, x = symbols('m a k x')

def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

def chk(id_, i=0):
    c = E[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[i]
def val(id_): return chk(id_)['valor']
def vals(id_): return sorted(chk(id_)['valores'])
def igual(p, q, tol=1e-6): return abs(float(sp.N(p)) - float(sp.N(q))) <= tol * max(1, abs(float(sp.N(q))))
def lista_igual(l1, l2): return len(l1) == len(l2) and all(igual(p, q) for p, q in zip(sorted(l1), sorted(l2)))
def opt(id_):
    c = chk(id_); return c['opciones'][c['ok']]

# ============ TEORÍA: ejemplos resueltos ============
comprobar('2x2 a', M([[3, -2], [5, 4]]).det() == 22)
comprobar('2x2 b', M([[-2, 3], [1, -6]]).det() == 9)
f = sp.factor(M([[m, 2], [1, m + 1]]).det())
comprobar('2x2 param', sp.expand(M([[m, 2], [1, m + 1]]).det() - (m**2 + m - 2)) == 0 and sp.solve(m**2 + m - 2, m) in ([-2, 1], [1, -2]) or sorted(sp.solve(m**2 + m - 2, m)) == [-2, 1])
comprobar('2x2 param m=1 filas iguales', M([[1, 2], [1, 2]]).det() == 0)
# Sarrus
S1 = M([[2, 1, 3], [0, -1, 4], [1, 2, -2]])
comprobar('Sarrus1 suman', (2*-1*-2, 1*4*1, 3*0*2) == (4, 4, 0) and 8 == 4 + 4 + 0)
comprobar('Sarrus1 restan', (3*-1*1, 1*0*-2, 2*4*2) == (-3, 0, 16) and -3 + 0 + 16 == 13)
comprobar('Sarrus1 det', S1.det() == -5 == 8 - 13)
S2 = M([[-1, 2, 3], [4, 0, -2], [1, -3, 5]])
comprobar('Sarrus2 suman', (-1*0*5, 2*-2*1, 3*4*-3) == (0, -4, -36))
comprobar('Sarrus2 restan', (3*0*1, 2*4*5, -1*-2*-3) == (0, 40, -6) and 34 == 0 + 40 - 6)
comprobar('Sarrus2 det', S2.det() == -74 == -40 - 34)
# propiedades (a,b,c… simbólicas)
Asym = sp.Matrix(3, 3, symbols('a1:10'))
d0 = Asym.det()
def con_filas(f1, f2, f3): return sp.Matrix([list(f1), list(f2), list(f3)])
r = Asym.row
B1 = con_filas(2*r(0), r(2), r(1) + 5*r(0))
comprobar('ej filas 2F1,F3,F2+5F1 = -2|A| -> -8 con |A|=4', sp.simplify(B1.det() + 2*d0) == 0 and -2*4 == -8)
comprobar('|2A| orden 3 = 8|A|', sp.simplify((2*Asym).det() - 8*d0) == 0)
comprobar('|2A^-1 A^t| con |A|=3 -> 8', 2**3 * Q(1, 3) * 3 == 8)
# comprobación numérica con matriz concreta de det 3
A3 = M([[1, 0, 0], [0, 3, 0], [0, 0, 1]])
comprobar('|2 A^-1 A^t| matriz concreta', (2*A3.inv()*A3.T).det() == 8)
A2n = M([[-2, 0, 0], [0, 1, 0], [0, 0, 1]])
comprobar('|3A^2| con |A|=-2', (3*A2n**2).det() == 108 == 27*4)
comprobar('|(-A)^-1| con |A|=-2', ((-A2n).inv()).det() == Q(1, 2))
circ = M([[1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]])
comprobar('circulante 4x4 = 160', circ.det() == 160)
comprobar('circulante: columna sumada', all(sum(circ.row(i)) == 10 for i in range(4)))
sub = M([[1, 1, -3], [2, -2, -2], [-1, -1, -1]])
tras = M([[1, 2, 3, 4], [1, 3, 4, 1], [1, 4, 1, 2], [1, 1, 2, 3]])
comprobar('circulante: tras sacar 10 y restar F1', [list(tras.row(i) - tras.row(0)) for i in (1, 2, 3)] == [[0, 1, 1, -3], [0, 2, -2, -2], [0, -1, -1, -1]])
comprobar('circulante: 3x3 = 16 (suma 10, resta -6)', sub.det() == 16 and (1*-2*-1 + 1*-2*-1 + -3*2*-1) == 10 and (-3*-2*-1 + 1*2*-1 + 1*-2*-1) == -6 and 10*16 == 160)
aa, bb, cc = symbols('aa bb cc')
cero = M([[1, aa, bb + cc], [1, bb, aa + cc], [1, cc, aa + bb]])
comprobar('det 0 sin desarrollar (1 a b+c)', sp.simplify(cero.det()) == 0)
# rango
RA = M([[1, 2, -1], [2, a, -2], [3, 6, a]])
comprobar('rango param det', sp.expand(RA.det() - (a**2 - a - 12)) == 0 and sp.expand((a - 4)*(a + 3) - (a**2 - a - 12)) == 0)
comprobar('rango param Sarrus partes', (a*a*1, 2*-2*3, -1*2*6) == (a**2, -12, -12) and (-1*a*3, 2*2*a, 1*-2*6) == (-3*a, 4*a, -12))
comprobar('rango a=4', RA.subs(a, 4).rank() == 2 and M([[1, -1], [3, 4]]).det() == 7)
comprobar('rango a=-3', RA.subs(a, -3).rank() == 2 and M([[1, 2], [2, -3]]).det() == -7)
comprobar('rango a=-3 F3 = 3F1', RA.subs(a, -3).row(2) == 3*RA.subs(a, -3).row(0))
comprobar('rango a=4 F2 = 2F1', RA.subs(a, 4).row(1) == 2*RA.subs(a, 4).row(0))
comprobar('rango a generico =3', all(RA.subs(a, v).rank() == 3 for v in (0, 1, 2, 5, -1)))
R34 = M([[1, 0, 2, 1], [2, 1, 3, 0], [3, 1, a, 1]])
comprobar('3x4 menor 2x2', M([[1, 0], [2, 1]]).det() == 1)
comprobar('3x4 menor 3 primeras cols = a-5', sp.expand(R34[:, :3].det() - (a - 5)) == 0)
R5 = R34.subs(a, 5)
menores = [R5[:, list(c)].det() for c in itertools.combinations(range(4), 3)]
comprobar('3x4 a=5 todos los menores 3x3 = 0', all(v == 0 for v in menores) and R5.rank() == 2, str(menores))
comprobar('3x4 a=5 columnas (1,2,4),(1,3,4),(2,3,4)', R5[:, [0, 1, 3]].det() == 0 and R5[:, [0, 2, 3]].det() == 0 and R5[:, [1, 2, 3]].det() == 0)
comprobar('3x4 a!=5 rango 3', all(R34.subs(a, v).rank() == 3 for v in (0, 1, 4, 6)))
# inversa
A = M([[1, 2, 0], [3, 1, 2], [0, 1, 4]])
comprobar('inversa A det -22', A.det() == -22 and 1*1*4 + 2*2*0 + 0*3*1 - (0*1*0 + 2*3*4 + 1*2*1) == -22)
cof = A.cofactor_matrix()
comprobar('inversa A cofactores', cof.tolist() == [[2, -12, 3], [-8, 4, -1], [4, -2, -5]])
comprobar('inversa A adj^t', cof.T.tolist() == [[2, -8, 4], [-12, 4, -2], [3, -1, -5]])
comprobar('inversa A final', A.inv() == cof.T / -22 and A.inv().tolist() == [[Q(-1, 11), Q(4, 11), Q(-2, 11)], [Q(6, 11), Q(-2, 11), Q(1, 11)], [Q(-3, 22), Q(1, 22), Q(5, 22)]])
comprobar('inversa A menores individuales', (M([[1, 2], [1, 4]]).det(), M([[3, 2], [0, 4]]).det(), M([[3, 1], [0, 1]]).det(), M([[2, 0], [1, 4]]).det(), M([[1, 0], [0, 4]]).det(), M([[1, 2], [0, 1]]).det(), M([[2, 0], [1, 2]]).det(), M([[1, 0], [3, 2]]).det(), M([[1, 2], [3, 1]]).det()) == (2, 12, 3, 8, 4, 1, 4, 2, -5))
C = M([[1, 2, 3], [0, 1, 4], [5, 6, 0]])
comprobar('inversa C det 1', C.det() == 1 and (40 - 39) == 1)
comprobar('inversa C', C.inv().tolist() == [[-24, 18, 5], [20, -15, -4], [-5, 4, 1]] and C.adjugate().tolist() == [[-24, 18, 5], [20, -15, -4], [-5, 4, 1]])
comprobar('inversa C comprobación fila', (1*-24 + 2*20 + 3*-5) == 1)
AX = M([[1, 2], [3, 5]]); BX = M([[1, 0], [2, 1]])
comprobar('AX=B', AX.det() == -1 and AX.inv().tolist() == [[-5, 2], [3, -1]] and (AX.inv()*BX).tolist() == [[-1, 2], [1, -1]])
comprobar('XA=B', (BX*AX.inv()).tolist() == [[-5, 2], [-7, 3]] and (BX*AX.inv()) != (AX.inv()*BX))
# adjuntos
D7 = M([[2, 1, 0], [1, 3, 1], [0, 1, 2]])
comprobar('3x3 primera fila', D7.det() == 8 and M([[3, 1], [1, 2]]).det() == 5 and -M([[1, 1], [0, 2]]).det() == -2 and 2*5 + 1*-2 == 8)
comprobar('3x3 Sarrus comprobación', (12 + 0 + 0) - (0 + 2 + 2) == 8)
F4 = M([[1, 2, -1, 3], [2, 5, 0, 1], [-1, 0, 3, 2], [3, 1, 2, 4]])
comprobar('4x4 ceros det -165', F4.det() == -165)
F4b = F4.copy()
F4b[1, :] = F4[1, :] - 2*F4[0, :]; F4b[2, :] = F4[2, :] + F4[0, :]; F4b[3, :] = F4[3, :] - 3*F4[0, :]
comprobar('4x4 ceros filas', F4b.tolist() == [[1, 2, -1, 3], [0, 1, 2, -5], [0, 2, 2, 5], [0, -5, 5, -5]] and F4b.det() == F4.det())
sub3 = M([[1, 2, -5], [2, 2, 5], [-5, 5, -5]])
comprobar('4x4 ceros 3x3 = -165', sub3.det() == -165 and (-10 - 50 - 50, 50 - 20 + 25) == (-110, 55))
F4c = M([[2, 0, 1, 3], [1, 2, 0, 1], [0, 1, 0, 2], [3, 0, 0, 1]])
comprobar('4x4 col 3 det 10', F4c.det() == 10 and M([[1, 2, 1], [0, 1, 2], [3, 0, 1]]).det() == 10 and (1 + 12 + 0) - (3 + 0 + 0) == 10)
comprobar('fila falsa suma 0', 2*D7.cofactor(1, 0) + 1*D7.cofactor(1, 1) + 0*D7.cofactor(1, 2) == 0 and D7.cofactor(1, 0) == -2 and D7.cofactor(1, 1) == 4)
# parámetro
P1 = M([[1, 1, m], [1, m, 1], [m, 1, 1]])
comprobar('param |A| = -(m-1)^2(m+2)', sp.expand(P1.det() + (m - 1)**2*(m + 2)) == 0)
comprobar('param Sarrus partes', (m + m + m) == 3*m and sp.expand(-m**3 + 3*m - 2 - P1.det()) == 0)
comprobar('param raíces', sorted(sp.solve(P1.det(), m)) == [-2, 1])
comprobar('param Ruffini m=1', 1 - 3 + 2 == 0 and sp.expand((m - 1)*(m**2 + m - 2) - (m**3 - 3*m + 2)) == 0)
comprobar('param m=1 rg1', P1.subs(m, 1).rank() == 1)
comprobar('param m=-2 rg2', P1.subs(m, -2).rank() == 2 and M([[1, 1], [1, -2]]).det() == -3 and P1.subs(m, -2).det() == 0)
P10 = P1.subs(m, 0)
comprobar('param m=0 inversa', P10.det() == -2 and P10.adjugate().tolist() == [[-1, -1, 1], [-1, 1, -1], [1, -1, -1]] and P10.inv().tolist() == [[Q(1, 2), Q(1, 2), Q(-1, 2)], [Q(1, 2), Q(-1, 2), Q(1, 2)], [Q(-1, 2), Q(1, 2), Q(1, 2)]])
V = M([[1, 1, 1], [x, 2, 3], [x**2, 4, 9]])
comprobar('Vandermonde (x-2)(x-3)', sp.expand(V.det() - (x**2 - 5*x + 6)) == 0 and sorted(sp.solve(V.det(), x)) == [2, 3])
comprobar('Vandermonde partes', sp.expand((18 + 3*x**2 + 4*x) - (2*x**2 + 9*x + 12) - (x**2 - 5*x + 6)) == 0)
comprobar('Vandermonde columnas iguales', V.subs(x, 2)[:, 0] == V.subs(x, 2)[:, 1] and V.subs(x, 3)[:, 0] == V.subs(x, 3)[:, 2])
P3 = M([[a, 2, 1], [1, a, 0], [0, 1, 1]])
comprobar('param a^2-1', sp.expand(P3.det() - (a**2 - 1)) == 0 and (a*a*1 + 2*0*0 + 1*1*1, 0 + 2*1*1 + a*0*1) == (a**2 + 1, 2))
# geometría
comprobar('área triángulo 19/2', M([[4, 1], [1, 5]]).det() == 19 and (4, 1) == (5 - 1, 2 - 1) and (1, 5) == (2 - 1, 6 - 1) and float(Q(19, 2)) == 9.5)
Ak = M([[1, 2, 1], [3, k, 1], [-1, -4, 1]])
comprobar('alineados k=8', sp.expand(Ak.det() - (2*k - 16)) == 0 and sp.solve(Ak.det(), k) == [8] and Q(8 - 2, 3 - 1) == Q(-4 - 2, -1 - 1))
comprobar('alineados Sarrus partes', (k - 2 - 12, -k + 6 - 4) == (k - 14, -k + 2) and sp.expand((k - 14) - (-k + 2) - (2*k - 16)) == 0)
vol = M([[1, 2, 0], [0, 1, 3], [2, 0, 1]])
comprobar('paralelepípedo 13', vol.det() == 13 and (1 + 12 + 0, 0) == (13, 0) and round(float(Q(13, 6)), 2) == 2.17)
cop = M([[-1, 1, 0], [-1, 0, 1], [1, 2, -3]])
comprobar('coplanarios det 0', cop.det() == 0 and (0 + 1 + 0) - (0 - 2 + 3) == 0 and all(px + py + pz == 1 for (px, py, pz) in [(1, 0, 0), (0, 1, 0), (0, 0, 1), (2, 2, -3)]))
comprobar('vectores AB AC AD', (0-1, 1-0, 0) == (-1, 1, 0) and (0-1, 0, 1) == (-1, 0, 1) and (2-1, 2-0, -3-0) == (1, 2, -3))
# problemas
comprobar('P1 |3A^-1B^2|', 27 * Q(1, 2) * 9 == Q(243, 2))
comprobar('P1 |A^t B^-1|', 2 * Q(1, -3) == Q(-2, 3))
comprobar('P1 |Adj A| = 4', 2**(3 - 1) == 4)
# Adj(A) con matriz concreta det 2
Ac = M([[2, 0, 0], [0, 1, 0], [0, 0, 1]])
comprobar('|Adj A| = |A|^(n-1) concreto', Ac.adjugate().det() == Ac.det()**2)
Bm = M([[1, m, 0], [0, 1, m], [m, 0, 1]])
comprobar('P2 |B| = 1+m^3', sp.expand(Bm.det() - (1 + m**3)) == 0 and sp.factor(Bm.det()) == (m + 1)*(m**2 - m + 1))
comprobar('P2 raíces reales', sp.solve(Bm.det(), m).__len__() == 3 and [r for r in sp.solve(Bm.det(), m) if r.is_real] == [-1] and 1 - 4 < 0)
comprobar('P2 m=-1 rango 2', Bm.subs(m, -1).rank() == 2 and M([[1, -1], [0, 1]]).det() == 1 and Bm.subs(m, -1).det() == 0)
comprobar('P2 inversa m=1', Bm.subs(m, 1).det() == 2 and Bm.subs(m, 1).inv().tolist() == [[Q(1, 2), Q(-1, 2), Q(1, 2)], [Q(1, 2), Q(1, 2), Q(-1, 2)], [Q(-1, 2), Q(1, 2), Q(1, 2)]])
A34 = M([[1, 2], [3, 4]])
comprobar('P3 XA-2X=I', (A34 - 2*eye(2)).tolist() == [[-1, 2], [3, 2]] and (A34 - 2*eye(2)).det() == -8 and (A34 - 2*eye(2)).inv().tolist() == [[Q(-1, 4), Q(1, 4)], [Q(3, 8), Q(1, 8)]])
Xs = (A34 - 2*eye(2)).inv()
comprobar('P3 X cumple', Xs*A34 - 2*Xs == eye(2))
comprobar('P4 antisimétrica 3x3', all(sp.Matrix(3, 3, lambda i, j: (symbols('s%d%d' % (min(i, j), max(i, j))) * (1 if i < j else -1 if i > j else 0))).det() == 0 for _ in [0]))
comprobar('P4 A^2=A -> det 0 o 1', sorted(sp.solve(x**2 - x, x)) == [0, 1])
comprobar('P5 área m^2', sorted(sp.solve(sp.Eq(m**2 - 6, 4), m)) == sorted([-sqrt(10), sqrt(10)]) and sorted(sp.solve(sp.Eq(m**2 - 6, -4), m)) == sorted([-sqrt(2), sqrt(2)]) and M([[m, 2], [3, m]]).det() == m**2 - 6)
comprobar('P5 valores aprox', igual(sqrt(10), 3.16, 0.005) and igual(sqrt(2), 1.41, 0.005))

# ============ EJERCICIOS ============
comprobar('d1', val('d1') == M([[4, -3], [2, 5]]).det() == 26)
comprobar('d2', val('d2') == M([[-2, 3], [1, -6]]).det() == 9)
comprobar('d3', val('d3') == C.det() == 1 and 0 + 40 + 0 == 40 and 15 + 0 + 24 == 39)
d4 = M([[2, 0, 1], [1, 3, 2], [0, -1, 1]])
comprobar('d4', val('d4') == d4.det() == 9 and (2*3*1 + 0 + 1*1*-1, 0 + 0 + 2*2*-1) == (5, -4))
comprobar('d5', val('d5') == M([[3, 5, 7], [0, -2, 1], [0, 0, 4]]).det() == -24)
comprobar('d6', igual(val('d6'), sp.solve(M([[x, 2], [3, 4]]).det(), x)[0]) and sp.solve(M([[x, 2], [3, 4]]).det(), x)[0] == Q(3, 2))
d7 = M([[1, 2, 3], [4, 5, 6], [5, 7, 9]])
comprobar('d7', d7.det() == 0 and opt('d7').startswith('0') and d7.row(0) + d7.row(1) == d7.row(2))
comprobar('d8', val('d8') == (3*M([[1, 0], [0, -4]])).det() == -36)
comprobar('d9', val('d9') == (2*M([[5, 0, 0], [0, 1, 0], [0, 0, 1]])).det() == 40)
comprobar('d10', igual(val('d10'), Q(1, 6)))
comprobar('d11', val('d11') == (M([[7, 0], [0, 1]])*M([[-2, 0], [0, 1]])).det() == -14)
d12 = M([[1, 2, 3], [4, 5, 6], [7, 8, 10]])
comprobar('d12', val('d12') == d12.cofactor(1, 2) == 6 and M([[1, 2], [7, 8]]).det() == -6)
comprobar('d13', val('d13') == M([[1, 0, 2], [0, 1, 3]]).rank() == 2)
comprobar('d14', val('d14') == Q(abs(M([[4, 2], [1, 5]]).det()), 2) == 9)
comprobar('d15', val('d15') == M([[2, 1, 1, 1], [1, 2, 1, 1], [1, 1, 2, 1], [1, 1, 1, 2]]).det() == 5)
d16 = M([[3, 1, 0, 2], [1, 2, 0, 1], [2, 0, 1, 4], [0, 1, 0, 5]])
comprobar('d16', val('d16') == d16.det() == 24 and M([[3, 1, 2], [1, 2, 1], [0, 1, 5]]).det() == 24 and (30 + 0 + 2, 0 + 5 + 3) == (32, 8))
Ad = M([[2, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]])
comprobar('d17', val('d17') == (3*Ad.inv()*Ad.T).det() == 81)
Ae = M([[-2, 0, 0], [0, 1, 0], [0, 0, 1]])
comprobar('d18', val('d18') == (Ae**3 * (-Ae).T).det() == -16 and (-2)**3 * 2 == -16)
Af = Asym
comprobar('d19', sp.simplify(con_filas(3*r(1), r(0), r(2) - 4*r(1)).det() + 3*d0) == 0 and val('d19') == -15 == -3*5)
d20 = M([[m, 1, 0], [1, m, 1], [0, 1, m]])
comprobar('d20', sp.expand(d20.det() - (m**3 - 2*m)) == 0 and lista_igual(vals('d20'), [float(r) for r in sp.solve(d20.det(), m)]))
comprobar('d21', lista_igual(vals('d21'), sp.solve(M([[a, 3], [2, a + 1]]).det(), a)) and sp.factor(M([[a, 3], [2, a + 1]]).det()) == (a - 2)*(a + 3))
d22 = M([[x, 1, 1], [1, x, 1], [1, 1, x]])
comprobar('d22', lista_igual(vals('d22'), sp.solve(d22.det(), x)) and sp.factor(d22.det()) == (x - 1)**2*(x + 2))
d23 = M([[2, 1], [5, 3]])
comprobar('d23', d23.det() == 1 and sorted(d23.inv().tolist()[0] + d23.inv().tolist()[1]) == vals('d23'))
comprobar('d24', sorted(C.inv().row(0).tolist()[0]) == vals('d24') and C.cofactor(0, 0) == -24 and C.cofactor(1, 0) == 18 and C.cofactor(2, 0) == 5)
comprobar('d25', lista_igual(vals('d25'), [float(v) for v in D7.inv().row(0)]) and (D7.cofactor(0, 0), D7.cofactor(1, 0), D7.cofactor(2, 0)) == (5, -2, 1))
d26 = M([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
comprobar('d26', val('d26') == d26.rank() == 2 and d26.det() == 0 and d26.row(2) == 2*d26.row(1) - d26.row(0) and M([[1, 2], [4, 5]]).det() == -3)
d27 = M([[1, a, 2], [2, 1, a], [1, 1, 1]])
comprobar('d27', sp.expand(d27.det() - (a**2 - 3*a + 3)) == 0 and (9 - 12) < 0 and all(r.is_real is False for r in sp.solve(d27.det(), a)) and opt('d27').startswith('Para ninguno') and (a**2 + 5 - (3*a + 2) - d27.det()).expand() == 0)
d28 = d23.inv() * M([[1, 2], [0, 1]])
comprobar('d28', sorted(d28.tolist()[0] + d28.tolist()[1]) == vals('d28') and d28.tolist() == [[3, 5], [-5, -8]] and d23 * d28 == M([[1, 2], [0, 1]]))
d29 = M([[1, 1, 0], [0, 2, 1], [1, 0, 3]])
comprobar('d29', igual(val('d29'), Q(abs(d29.det()), 6)) and d29.det() == 7 and (6 + 1 + 0, 0) == (7, 0))
d30 = M([[3, k - 1], [-3, -3]])
comprobar('d30', val('d30') == sp.solve(d30.det(), k)[0] == 4 and Q(4 - 1, 5 - 2) == Q(-2 - 1, -1 - 2))
comprobar('d31', val('d31') == M([[3, 1, 1], [1, 3, 1], [1, 1, 3]]).det() == 20 == 27 - 9 + 2 and 27 + 1 + 1 - 9 == 20)
comprobar('d32', all(simplify(Mq.det()**2 - 1) == 0 for Mq in [M([[0, 1], [1, 0]]), M([[sp.cos(1), -sp.sin(1)], [sp.sin(1), sp.cos(1)]]), M([[0, -1], [1, 0]]), M([[-1, 0], [0, 1]])]))
Aq, Bq = M([[2, 0, 0], [0, 1, 0], [0, 0, 1]]), M([[-3, 0, 0], [0, 1, 0], [0, 0, 1]])
comprobar('d33', val('d33') == (Aq**2 * Bq.inv() * (2*Bq.T)).det() == 32)
comprobar('d34', val('d34') == (2*eye(3)).det() == 8 and (2*eye(3))**2 == 2*(2*eye(3)))
comprobar('d35', val('d35') == (2*Aq).adjugate().det() == 256 and (2*Aq).det() == 16)
d36 = M([[1, 2, 3, 1], [2, 4, a, 2], [3, 6, 9, a]])
m134 = d36[:, [0, 2, 3]].det(); m234 = d36[:, [1, 2, 3]].det()
comprobar('d36 menores', sp.expand(m134 - (a - 3)*(a - 6)) == 0 and sp.expand(m234 - 2*(a - 3)*(a - 6)) == 0 and sp.expand(d36[:, [0, 1, 2]].det()) == 0 and sp.expand(d36[:, [0, 1, 3]].det()) == 0)
comprobar('d36 rangos', lista_igual(vals('d36'), [3, 6]) and [d36.subs(a, v).rank() for v in (3, 6)] == [2, 2] and all(d36.subs(a, v).rank() == 3 for v in (0, 1, 2, 4, 5, 7)))
comprobar('d36 menores 2x2', M([[1, 3], [2, 6]]).det() == 0 and M([[1, 3], [2, a]]).subs(a, 3).det() == -3 and M([[1, 1], [3, a]]).subs(a, 6).det() == 3)
d37 = M([[1, 1, 2], [2, 1, 1], [1, 2, 1]])
comprobar('d37', d37.det() == 4 and igual(val('d37'), d37.inv()[0, 0]) and d37.cofactor(0, 0) == -1)
comprobar('d38', val('d38') == M([[1, 1, 1], [1, 3, 6], [1, 9, 36]]).det() == 30 == (3 - 1)*(6 - 1)*(6 - 3))
aV, bV, cV = symbols('aV bV cV')
comprobar('d38 fórmula', sp.expand(M([[1, 1, 1], [aV, bV, cV], [aV**2, bV**2, cV**2]]).det() - (bV - aV)*(cV - aV)*(cV - bV)) == 0)
d39 = M([[m - 1, 2], [3, m - 1]])
sol39 = sorted(set(sp.solve(sp.Eq(d39.det(), 5), m) + sp.solve(sp.Eq(d39.det(), -5), m)), key=lambda r: float(sp.N(r)))
enteros = [r for r in sol39 if r.is_integer]
comprobar('d39', lista_igual(vals('d39'), enteros) and sp.expand(d39.det() - ((m - 1)**2 - 6)) == 0 and enteros == [0, 2] and len(sol39) == 4)
comprobar('d40', val('d40') == Ad.adjugate().det() == 8)
Ax, Bx = M([[-3, 0, 0], [0, 1, 0], [0, 0, 1]]), M([[2, 0, 0], [0, 1, 0], [0, 0, 1]])
comprobar('d41', igual(val('d41'), ((Ax*Bx).inv()*Ax**2).det()) and ((Ax*Bx).inv()*Ax**2).det() == Q(-3, 2))
d42 = (A34 + eye(2)).inv() * M([[1, 0], [0, 2]])
comprobar('d42', lista_igual(vals('d42'), [float(v) for v in d42]) and (A34 + eye(2)).det() == 4 and (A34 + eye(2))*d42 == M([[1, 0], [0, 2]]) and A34*d42 + d42 == M([[1, 0], [0, 2]]))
comprobar('d43', all((Mq.inv()).det() == 1/Mq.det() for Mq in [M([[1, 2], [3, 5]]), M([[2, 1, 0], [1, 3, 1], [0, 1, 2]]), M([[1, 2, 0], [3, 1, 2], [0, 1, 4]])]))
dd44 = M([[1, 1, 1], [aa, bb, cc], [bb + cc, aa + cc, aa + bb]])
comprobar('d44', sp.simplify(dd44.det()) == 0 and sp.expand((dd44.row(1) + dd44.row(2) - (aa + bb + cc)*dd44.row(0)).norm()) == 0)
comprobar('d45', opt('d45').startswith('A no tiene inversa') and M([[1, 2], [2, 4]]).det() == 0 and M([[1, 2], [2, 4]]).rank() == 1)

# ============ ACTIVIDADES (test, errores, tarjetas) ============
Q1 = T['datos']['quiz1']['preguntas']
def correcta(q): return q['op'][q['ok']]
comprobar('quiz1 q1', correcta(Q1[0]) == '22' and M([[3, -2], [5, 4]]).det() == 22)
comprobar('quiz1 q2', correcta(Q1[1]) == '32' and 2**3*4 == 32)
comprobar('quiz1 q3', correcta(Q1[2]) == '1' and Q(1, 5) * 5 == 1)
comprobar('quiz1 q6', correcta(Q1[5]) == '−8' and 2*(-1)*4 == -8 and M([[2, 5, 1], [0, -1, 3], [0, 0, 4]]).det() == -8)
comprobar('quiz1 q10', correcta(Q1[9]) == '5' and abs(M([[3, 1], [1, 2]]).det()) == 5)
comprobar('quiz1 q11', correcta(Q1[10]) == '27' and 3**(4 - 1) == 27 and Ad.adjugate().det() == 8 == 2**3)
comprobar('quiz1 q9', correcta(Q1[8]).startswith('como mucho 2') and max(Mq.rank() for Mq in [M([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), M([[1, 1, 1], [1, 1, 1], [1, 1, 1]]), zeros(3)]) <= 2)
comprobar('quiz1 q12 signo', (-1)**(2 + 3) == -1 and correcta(Q1[11]) == '−')
comprobar('quiz1 q5', M([[1, 2, 3], [4, 5, 6], [5, 7, 9]]).det() == 0 and correcta(Q1[4]) == '0')
Er = T['datos']['errores']['preguntas']
comprobar('errores e1', (2*M([[5, 0, 0], [0, 1, 0], [0, 0, 1]])).det() == 40 == 8*5)
comprobar('errores e2', (eye(2) + eye(2)).det() == 4 and eye(2).det() + eye(2).det() == 2)
comprobar('errores e4', M([[2, 1], [5, 3]]).adjugate().tolist() == [[3, -1], [-5, 2]] and M([[2, 1], [5, 3]]).cofactor_matrix().tolist() == [[3, -5], [-1, 2]] and M([[2, 1], [5, 3]]).det() == 1)
comprobar('errores e5', M([[1, 2], [2, 4]]).det() == 0 and M([[1, 2], [2, 4]]) != zeros(2))
comprobar('errores e6', (BX*AX.inv()) != (AX.inv()*BX) and ((BX*AX.inv())*AX) == BX)
M7 = M([[2, 3], [1, 4]]); M7b = M7.copy(); M7b[1, :] = 3*M7[1, :] + M7[0, :]
comprobar('errores e7', M7b.det() == 3*M7.det())
comprobar('errores e8', all((Mq.inv()).det() == 1/Mq.det() != -Mq.det() for Mq in [M([[1, 2], [3, 5]])]))
M9 = M([[1, 2], [3, 4]]); M9b = M9.copy(); M9b[0, :] = 2*M9[0, :]; M9b[1, :] = 3*M9[1, :]
comprobar('errores e9', M9b.det() == 6*M9.det() != 5*M9.det())
# detalles de ejercicios: pasos del enunciado
comprobar('d19 sentido', val('d19') == -15)
comprobar('d29 volumen aprox', abs(val('d29') - 7/6) < 1e-3)
comprobar('d33 valores parciales', Q(4) * Q(-1, 3) * (8 * -3) == 32)
comprobar('d41 parciales', Q(1, (-3)*2) == Q(-1, 6) and (-3)**2 == 9)

# ============ Cobertura: cada ejercicio tiene paso y resultado, y hay ≥ 40 ============
comprobar('≥ 40 ejercicios', len(E) >= 40 and all(E[i]['pasos'] and E[i]['resultado'] for i in E))
comprobar('niveles 1-2-3', {e['nivel'] for e in E.values()} == {1, 2, 3})

print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f in fallos: print('  FALLO:', f)
