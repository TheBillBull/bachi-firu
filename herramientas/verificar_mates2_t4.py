#!/usr/bin/env python3
"""
Verificación independiente (sympy, aritmética exacta) del tema 4 de Matemáticas II (Vectores en el espacio):
cada cifra de los ejemplos resueltos y de los 45 ejercicios se recalcula desde cero con los datos del enunciado.
No comparte código con la web.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_mates2_t4.py /tmp/ampl.json
"""
import json, sys
import sympy as sp
from sympy import Matrix as M, Rational as Q, symbols, sqrt, acos, pi, factor, solve, simplify, cbrt, Abs

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['mates2']['t4']
E = {e['id']: e for e in T['ejercicios']}
fallos, ok = [], 0
m = symbols('m', real=True)

def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

def cks(id_):
    c = E[id_]['check']; return c if isinstance(c, list) else [c]
def vnum(id_): return [c['valor'] for c in cks(id_) if c['tipo'] == 'num']
def vlis(id_): return sorted(cks(id_)[0]['valores'])
def igual(p, q, tol=1e-6): return abs(float(sp.N(p)) - float(sp.N(q))) <= tol * max(1, abs(float(sp.N(q))))
def lista_igual(l1, l2): return len(l1) == len(l2) and all(igual(p, q) for p, q in zip(l1, l2))
def opt(id_):
    c = cks(id_)[0]; return c['opciones'][c['ok']]
def ang(u, v): return sp.N(acos(M(u).dot(M(v)) / (M(u).norm() * M(v).norm())) * 180 / pi)
def cr(u, v): return M(u).cross(M(v))
def mx(u, v, w): return M([list(u), list(v), list(w)]).det()
def vec(a, b): return M(b) - M(a)

# ============ TEORÍA: ejemplos resueltos ============
# sección 1
AB = vec([1, 2, -1], [4, 0, 3])
comprobar('t1 AB', list(AB) == [3, -2, 4]); comprobar('t1 |AB|', AB.norm() == sqrt(29) and igual(AB.norm(), 5.39, 5e-3))
comprobar('t1 punto medio', list((M([1, 2, -1]) + M([4, 0, 3])) / 2) == [Q(5, 2), 1, 1])
u = M([2, -3, 6]); comprobar('t1 |u|=7', u.norm() == 7); comprobar('t1 unitario', list(u / 7) == [Q(2, 7), Q(-3, 7), Q(6, 7)])
comprobar('t1 módulo 14 sentido contrario', list(-2 * u) == [-4, 6, -12] and M([-4, 6, -12]).norm() == 14)
A, B_, C = M([1, 0, 2]), M([3, 1, 1]), M([4, 3, 0]); D = A + C - B_
comprobar('t1 paralelogramo D', list(D) == [2, 2, 1]); comprobar('t1 AB=DC', B_ - A == C - D)
a, b, c = M([1, 2, 3]), M([2, 4, 5]), M([4, 8, 9])
comprobar('t1 alineados AC=3AB', (c - a) == 3 * (b - a))
# sección 2
u, v = [2, -1, 2], [1, 2, -2]
comprobar('t2 u·v', M(u).dot(M(v)) == -4 and M(u).norm() == 3 and M(v).norm() == 3)
comprobar('t2 ángulo 116,39', igual(ang(u, v), 116.39, 1e-4))
comprobar('t2 cubo 70,53', igual(ang([1, 1, 1], [1, 1, -1]), 70.53, 1e-4) and M([1, 1, 1]).dot(M([1, 1, -1])) == 1)
u, v = M([3, 4, 0]), M([1, 2, 2]); pr = u.dot(v) / v.dot(v) * v
comprobar('t2 proyección', u.dot(v) == 11 and v.dot(v) == 9 and list(pr) == [Q(11, 9), Q(22, 9), Q(22, 9)] and (u - pr).dot(v) == 0 and igual(Q(11, 3), 3.67, 1e-3))
# sección 3
u, v = [1, 2, 3], [4, -1, 2]; c_ = cr(u, v)
comprobar('t3 u×v', list(c_) == [7, 10, -9] and M(u).dot(c_) == 0 and M(v).dot(c_) == 0)
comprobar('t3 |u×v|=√230', c_.norm() == sqrt(230) and igual(c_.norm(), 15.17, 1e-3))
comprobar('t3 Lagrange', M(u).dot(M(u)) * M(v).dot(M(v)) - M(u).dot(M(v)) ** 2 == 230 and M(u).dot(M(v)) == 8 and M(u).dot(M(u)) == 14 and M(v).dot(M(v)) == 21)
A, B_, C = [1, 0, 1], [2, 2, 0], [0, 1, 3]; AB, AC = vec(A, B_), vec(A, C)
comprobar('t3 AB,AC', list(AB) == [1, 2, -1] and list(AC) == [-1, 1, 2]); n_ = AB.cross(AC)
comprobar('t3 AB×AC', list(n_) == [5, -1, 3] and n_.norm() == sqrt(35)); comprobar('t3 área', igual(n_.norm() / 2, 2.96, 3e-3))
un = n_ / n_.norm(); comprobar('t3 unitario', [igual(x, y, 2e-3) for x, y in zip(un, [0.845, -0.169, 0.507])] == [True] * 3)
comprobar('t3 altura', igual(n_.norm() / AB.norm(), 2.42, 3e-3) and AB.norm() == sqrt(6) and igual(sqrt(sp.Rational(35, 6)), n_.norm() / AB.norm()))
# sección 4
A, B_, C, D = [1, 0, 0], [0, 2, 0], [0, 0, 3], [1, 1, 1]; AB, AC, AD = vec(A, B_), vec(A, C), vec(A, D)
comprobar('t4 aristas', list(AB) == [-1, 2, 0] and list(AC) == [-1, 0, 3] and list(AD) == [0, 1, 1])
d = mx(AB, AC, AD); comprobar('t4 [AB,AC,AD]=5', d == 5 and Q(5, 6) == Abs(d) / 6 and igual(Q(5, 6), 0.833, 1e-3))
cc = AB.cross(AC); comprobar('t4 AB×AC=(6,3,2) módulo 7', list(cc) == [6, 3, 2] and cc.norm() == 7)
comprobar('t4 altura 5/7', 3 * (Abs(d) / 6) / (cc.norm() / 2) == Q(5, 7) and igual(Q(5, 7), 0.714, 1e-3))
dd = mx([1, 2, 3], [-1, 0, 1], [2, 4, m - 1]); comprobar('t4 coplanarios m=7', sp.expand(dd - (2 * m - 14)) == 0 and solve(dd, m) == [7])
# sección 5
comprobar('t5 w=3u-2v', 3 * M([1, 0, 1]) - 2 * M([0, 1, 2]) == M([3, -2, -1]))
a_, b_ = symbols('a b'); comprobar('t5 w=(1,1,1) no es CL', solve([a_ - 1, b_ - 1, a_ + 2 * b_ - 1], [a_, b_], dict=True) == [])
comprobar('t5 dependientes det 0', mx([1, 2, 3], [2, 1, 0], [4, 5, 6]) == 0 and 2 * M([1, 2, 3]) + M([2, 1, 0]) == M([4, 5, 6]))
dm = mx([1, 1, m], [1, m, 1], [m, 1, 1]); comprobar('t5 param det', sp.expand(dm + (m - 1) ** 2 * (m + 2)) == 0)
comprobar('t5 rangos m=1,-2', M([[1, 1, 1]] * 3).rank() == 1 and M([[1, 1, -2], [1, -2, 1], [-2, 1, 1]]).rank() == 2 and sum(M([[1, 1, -2], [1, -2, 1], [-2, 1, 1]]).T * M([1, 1, 1])) == 0)
# sección 6
Bm = M([[1, 1, 0], [0, 1, 1], [1, 0, 1]]); comprobar('t6 det base=2', Bm.det() == 2)
sol = Bm.T.solve(M([3, 4, 5])); comprobar('t6 coordenadas (1,3,2)', list(sol) == [1, 3, 2] and sol[0] * M([1, 1, 0]) + sol[1] * M([0, 1, 1]) + sol[2] * M([1, 0, 1]) == M([3, 4, 5]))
e1, e2, e3 = M([1, 2, 2]), M([2, 1, -2]), M([2, -2, 1])
comprobar('t6 ortogonal', e1.dot(e2) == 0 and e1.dot(e3) == 0 and e2.dot(e3) == 0 and e1.norm() == 3)
w_ = M([3, 0, 6]); cs = [w_.dot(e) / 9 for e in (e1, e2, e3)]
comprobar('t6 coordenadas ortogonal', [w_.dot(e) for e in (e1, e2, e3)] == [15, -6, 12] and cs == [Q(5, 3), Q(-2, 3), Q(4, 3)] and sum((c * e for c, e in zip(cs, (e1, e2, e3))), sp.zeros(3, 1)) == w_)
comprobar('t6 base con parámetro', sp.expand(mx([1, m, 0], [0, 1, m], [m, 0, 1]) - (1 + m ** 3)) == 0 and solve(1 + m ** 3, m) == [-1] and M([[1, -1, 0], [0, 1, -1], [-1, 0, 1]]).det() == 0)
# sección 7
u1, v1 = M([1, 1, 0]), M([1, m, 1])
comprobar('t7 P1 producto y módulos', sp.expand(u1.dot(v1) - (1 + m)) == 0 and v1.norm() == sqrt(m ** 2 + 2))
comprobar('t7 P1 ecuación', sp.expand(4 * (1 + m) ** 2 - 2 * (m ** 2 + 2) - 2 * (m ** 2 + 4 * m)) == 0 and sorted(solve(m ** 2 + 4 * m, m)) == [-4, 0])
comprobar('t7 P1 solo m=0', [x for x in (0, -4) if igual(ang([1, 1, 0], [1, x, 1]), 60, 1e-9)] == [0] and igual(ang([1, 1, 0], [1, -4, 1]), 120, 1e-9))
cp = cr([1, 1, 0], [m, 0, 1]); comprobar('t7 P2 u×v', list(cp) == [1, -1, -m] and sorted(solve(m ** 2 + 2 - 6, m)) == [-2, 2])
dp3 = mx([1, 1, 1], [0, 2, 1], [m, 0, 3]); comprobar('t7 P3 det 6-m', sp.expand(dp3 - (6 - m)) == 0 and sorted(solve(Abs(6 - m) - 12, m)) == [-6, 18] if False else sorted([solve(6 - m - 12, m)[0], solve(6 - m + 12, m)[0]]) == [-6, 18])
dp4 = mx([m, 1, 0], [1, m, 1], [0, 1, m]); comprobar('t7 P4 det m³-2m', sp.expand(dp4 - (m ** 3 - 2 * m)) == 0 and sorted(solve(dp4, m), key=lambda x: float(x)) == [-sqrt(2), 0, sqrt(2)])
# sección 8
A, B_, C = [2, 0, 1], [3, 2, -1], [1, 1, 2]; AB, AC = vec(A, B_), vec(A, C)
comprobar('t8 P5 vectores', list(AB) == [1, 2, -2] and list(AC) == [-1, 1, 1] and AB.norm() == 3 and AC.norm() == sqrt(3))
comprobar('t8 P5 ángulo', AB.dot(AC) == -1 and igual(ang(AB, AC), 101.10, 1e-4))
n_ = AB.cross(AC); comprobar('t8 P5 área/altura/unitario', list(n_) == [4, 1, 3] and n_.norm() == sqrt(26) and igual(n_.norm() / 2, 2.55, 3e-3) and igual(n_.norm() / 3, 1.70, 3e-3) and all(igual(x, y, 2e-3) for x, y in zip(n_ / n_.norm(), [0.784, 0.196, 0.588])))
A, B_, Dd, E_ = [0, 0, 0], [2, 0, 0], [1, 2, 0], [1, 1, 3]
comprobar('t8 P6 C, base, volumen', list(M(B_) + M(Dd) - M(A)) == [3, 2, 0] and cr(B_, Dd).norm() == 4 and Q(1, 3) * 4 * 3 == 4 and mx(B_, Dd, E_) == 12 and Q(12, 3) == 4)
n_ = cr([1, 2, 2], [2, 1, -2]); comprobar('t8 P7', list(n_) == [-6, 6, -3] and n_.norm() == 9 and list(6 * n_ / 9) == [-4, 4, -2] and M([-4, 4, -2]).norm() == 6)
comprobar('t8 P8', 9 + 12 + 16 == 37 and 9 - 12 + 16 == 13 and Q(6, 12) == Q(1, 2) and igual(sqrt(37), 6.08, 2e-3) and igual(sqrt(13), 3.61, 2e-3))

# ============ EJERCICIOS ============
comprobar('v1', vnum('v1') == [vec([2, -1, 3], [5, 3, -9]).norm()] and vec([2, -1, 3], [5, 3, -9]).norm() == 13)
comprobar('v2', vnum('v2') == [M([2, -1, 3]).dot(M([1, 4, -2]))] and vnum('v2') == [-8])
comprobar('v3', vnum('v3') == [M([2, 3, 6]).norm()] and M([2, 3, 6]).norm() == 7)
pares = [([1, 2, 3], [3, 0, -1]), ([1, 1, 1], [1, 2, 3]), ([2, 0, 1], [1, 1, 1]), ([1, -1, 2], [2, 1, 1])]
perp = [i for i, (a, b) in enumerate(pares) if M(a).dot(M(b)) == 0]
comprobar('v4', perp == [0] and cks('v4')[0]['ok'] == 0)
comprobar('v5', vnum('v5') == list(cr([1, 2, 0], [0, 1, 3])) == [6, -3, 1])
comprobar('v6', vnum('v6') == [mx([1, 2, 0], [0, 1, 3], [2, 0, 1])] and vnum('v6') == [13])
comprobar('v7', igual(vnum('v7')[0], cr([1, 1, 0], [0, 1, 1]).norm()) and cr([1, 1, 0], [0, 1, 1]).norm() == sqrt(3))
comprobar('v8', vnum('v8') == [Q(18, 6)] and vnum('v8') == [3])
comprobar('v9', vnum('v9') == list((M([1, -3, 4]) + M([5, 1, -2])) / 2) == [3, -1, 1])
un = M([3, 0, 4]) / M([3, 0, 4]).norm(); comprobar('v10', lista_igual(vlis('v10'), sorted(un)) and list(un) == [Q(3, 5), 0, Q(4, 5)])
comprobar('v11', M([-2, 4, -6]) == -2 * M([1, -2, 3]) and cks('v11')[0]['ok'] == 0 and cr([1, -2, 3], [-2, 4, -6]) == sp.zeros(3, 1))
comprobar('v12', M([1, 1, 0]) + M([0, 1, 1]) == M([1, 2, 1]) and mx([1, 1, 0], [0, 1, 1], [1, 2, 1]) == 0 and cks('v12')[0]['ok'] == 0)
comprobar('v13', cks('v13')[0]['ok'] == 0 and 'paralelos' in opt('v13'))
comprobar('v14', igual(vnum('v14')[0], ang([1, 1, 0], [1, 0, 0])) and igual(ang([1, 1, 0], [1, 0, 0]), 45))
comprobar('v15', igual(vnum('v15')[0], ang([2, -1, 2], [1, 2, -2]), 1e-5))
sol = solve(M([m, 2, -1]).dot(M([3, m, 4])), m); comprobar('v16', sol == [Q(4, 5)] and igual(vnum('v16')[0], sol[0]))
sol = solve(M([m, 2, 1]).dot(M([m, -3, 2])), m); comprobar('v17', lista_igual(vlis('v17'), sorted(sol)) and sorted(sol) == [-2, 2])
u, v = M([3, 4, 0]), M([1, 2, 2]); pr = u.dot(v) / v.dot(v) * v; comprobar('v18', lista_igual(vnum('v18'), list(pr)))
n_ = cr([1, 2, -1], [-1, 1, 2]); un = n_ / n_.norm(); comprobar('v19', lista_igual(vnum('v19'), list(un)) and un[0] > 0 and list(n_) == [5, -1, 3])
n_ = vec([1, 0, 1], [2, 2, 0]).cross(vec([1, 0, 1], [0, 1, 3])); comprobar('v20', igual(vnum('v20')[0], n_.norm() / 2) and n_.norm() == sqrt(35))
comprobar('v21', vnum('v21') == list(M([1, 0, 2]) + M([4, 3, 0]) - M([3, 1, 1])) == [2, 2, 1])
A, B_, C, D = [0, 0, 0], [1, 2, 0], [0, 1, 3], [2, 1, 1]
d = mx(vec(A, B_), vec(A, C), vec(A, D)); comprobar('v22', d == 10 and igual(vnum('v22')[0], Abs(d) / 6))
dd = mx([1, 2, 3], [-1, 0, 1], [2, 4, m - 1]); comprobar('v23', solve(dd, m) == [7] and vnum('v23') == [7] and vec([1, 1, 1], [2, 3, 4]).T.tolist() == [[1, 2, 3]] and vec([1, 1, 1], [0, 1, 2]).T.tolist() == [[-1, 0, 1]] and vec([1, 1, 1], [3, 5, m]).T.tolist() == [[2, 4, m - 1]])
a_, b_ = symbols('a b'); s = solve(list(a_ * M([1, 0, 1]) + b_ * M([0, 1, 2]) - M([3, -2, -1])), [a_, b_], dict=True)
comprobar('v24', s == [{a_: 3, b_: -2}] and vnum('v24') == [3, -2])
dm = mx([1, 1, m], [1, m, 1], [m, 1, 1]); comprobar('v25', lista_igual(vlis('v25'), sorted(solve(dm, m))) and sorted(solve(dm, m)) == [-2, 1])
dm = mx([1, m, 0], [0, 1, m], [m, 0, 1]); comprobar('v26', solve(dm, m) == [-1] or [r for r in solve(dm, m) if r.is_real] == [-1]); comprobar('v26 valor', vnum('v26') == [-1])
Bm = M([[1, 1, 0], [0, 1, 1], [1, 0, 1]]); sol = Bm.T.solve(M([5, 6, 7])); comprobar('v27', vnum('v27') == list(sol) == [2, 4, 3])
cp = cr([1, m, 0], [0, 1, 1]); comprobar('v28', list(cp) == [m, -1, 1] and [r for r in solve(m ** 2 + 2 - 11, m) if r > 0] == [3] and vnum('v28') == [3])
dd = mx([1, 0, 1], [0, 1, 1], [1, 1, m]); comprobar('v29', sp.expand(dd - (m - 2)) == 0 and lista_igual(vlis('v29'), sorted([solve(m - 2 - 3, m)[0], solve(m - 2 + 3, m)[0]])) and vlis('v29') == [-1, 5] and Abs(5 - 2) / 6 == Q(1, 2) and Abs(-1 - 2) / 6 == Q(1, 2))
cands = solve(M([1, 0, 1]).dot(M([m, 1, 0])) ** 2 * 4 - M([1, 0, 1]).norm() ** 2 * M([m, 1, 0]).norm() ** 2, m)
comprobar('v30', sorted(cands) == [-1, 1] and igual(ang([1, 0, 1], [1, 1, 0]), 60) and igual(ang([1, 0, 1], [-1, 1, 0]), 120) and vnum('v30') == [1])
comprobar('v31', vnum('v31')[0] == 2 * 3 * sp.sin(pi / 6) and igual(vnum('v31')[1], 2 * 3 * sp.cos(pi / 6)))
n_ = cr([2, 1, 2], [0, 3, 4]); comprobar('v32', list(n_) == [-2, -8, 6] and igual(vnum('v32')[0], n_.norm() / M([2, 1, 2]).norm()) and M([2, 1, 2]).norm() == 3)
A, B_, C, D = [0, 0, 0], [1, 2, 0], [0, 1, 3], [2, 1, 1]
n_ = cr(B_, C); V_ = Q(10, 6); comprobar('v33', list(n_) == [6, -3, 1] and igual(vnum('v33')[0], 3 * V_ / (n_.norm() / 2)) and igual(vnum('v33')[0], 10 / sqrt(46)))
u, v = sp.symbols('u v')
# v34: identidad de Lagrange con vectores simbólicos
x1, x2, x3, y1, y2, y3 = symbols('x1 x2 x3 y1 y2 y3'); U_, V__ = M([x1, x2, x3]), M([y1, y2, y3])
comprobar('v34 Lagrange simbólica', sp.expand(U_.cross(V__).dot(U_.cross(V__)) - (U_.dot(U_) * V__.dot(V__) - U_.dot(V__) ** 2)) == 0)
comprobar('v35 rúbrica y sen²+cos²=1', sp.simplify(sp.sin(symbols('t')) ** 2 + sp.cos(symbols('t')) ** 2) == 1 and cks('v35')[0]['tipo'] == 'rubrica')
dd = mx([1, 0, 0], [0, 2, 0], [0, 0, m]); comprobar('v36', dd == 2 * m and lista_igual(vlis('v36'), sorted(solve(Abs(2 * m) - 12, m) if False else [solve(2 * m - 12, m)[0], solve(2 * m + 12, m)[0]])) and vlis('v36') == [-6, 6])
cp = cr([1, 1, 0], [0, m, 1]); comprobar('v37', list(cp) == [1, -1, m] and sp.expand(cp.dot(cp) - (2 + m ** 2)) == 0 and lista_igual(vlis('v37'), sorted(solve(m ** 2 + 2 - 9, m), key=float)) and sorted(solve(m ** 2 - 7, m), key=float) == [-sqrt(7), sqrt(7)])
w_ = cr([1, 1, 0], [0, 1, 1]); comprobar('v38', list(w_) == [1, -1, 1] and w_.norm() == sqrt(3) and vnum('v38') == [1, -1, 1] and w_.dot(M([1, 1, 0])) == 0 and w_.dot(M([0, 1, 1])) == 0)
e1, e2, e3 = M([1, 2, 2]), M([2, 1, -2]), M([2, -2, 1]); w_ = M([6, 3, 0]); cs = [w_.dot(e) / 9 for e in (e1, e2, e3)]
comprobar('v39', lista_igual(vnum('v39'), cs) and cs == [Q(4, 3), Q(5, 3), Q(2, 3)] and sum((c * e for c, e in zip(cs, (e1, e2, e3))), sp.zeros(3, 1)) == w_)
comprobar('v40', lista_igual(vnum('v40'), [sqrt(4 - 6 + 9), sqrt(4 + 6 + 9)]) and 4 - 6 + 9 == 7 and 4 + 6 + 9 == 19)
x, z = symbols('x z'); s = solve([x + z, 2 * x ** 2 + z ** 2 - 1], [x, z], dict=True)
comprobar('v41', lista_igual(vlis('v41'), sorted([d[x] for d in s], key=float)) and len(s) == 2)
dd = mx([1, 2, m], [m, 1, 2], [2, m, 1]); comprobar('v42', sp.expand(dd - (m ** 3 - 6 * m + 9)) == 0 and sp.factor(dd) == (m + 3) * (m ** 2 - 3 * m + 3) and [r for r in solve(dd, m) if r.is_real] == [-3] and vnum('v42') == [-3])
comprobar('v43 linealidad simbólica', sp.expand(U_.dot(symbols('al') * V__ + symbols('be') * M([symbols('z1'), symbols('z2'), symbols('z3')])) - (symbols('al') * U_.dot(V__) + symbols('be') * U_.dot(M([symbols('z1'), symbols('z2'), symbols('z3')])))) == 0)
comprobar('v44', vnum('v44') == [2 * 1 + Q(1) * 2 * Q(1, 2) - 4] and vnum('v44') == [-1])
dd = mx([1, m, 0], [0, 1, m], [m, 0, 1]); sol = sorted([r for r in solve(Abs(dd) - 9, m) if r.is_real], key=float) if False else sorted([solve(1 + m ** 3 - 9, m)[0]] + [r for r in solve(1 + m ** 3 + 9, m) if r.is_real], key=float)
comprobar('v45', lista_igual(vlis('v45'), sol) and igual(sol[0], -cbrt(10)) and sol[1] == 2)

print(f'{ok} comprobaciones correctas, {len(fallos)} fallos' if not fallos else '\n'.join(fallos) + f'\n{ok} comprobaciones correctas, {len(fallos)} fallos')
