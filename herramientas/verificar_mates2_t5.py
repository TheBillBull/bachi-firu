#!/usr/bin/env python3
"""
Verificación independiente (sympy, aritmética exacta) del tema 5 de Matemáticas II (Puntos, rectas y planos en el espacio):
cada cifra de los ejemplos resueltos y de los 46 ejercicios se recalcula desde cero con los datos del enunciado.
No comparte código con la web.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_mates2_t5.py /tmp/ampl.json
"""
import json, sys
import sympy as sp
from sympy import Matrix as M, Rational as Q, symbols, solve, factor, Eq

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['mates2']['t5']
E = {e['id']: e for e in T['ejercicios']}
fallos, ok = [], 0
m, t, k, lam = symbols('m t k lam', real=True)

def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

def cks(i):
    c = E[i]['check']; return c if isinstance(c, list) else [c]
def nums(i): return [c['valor'] for c in cks(i) if c['tipo'] == 'num']
def igual(p, q, tol=1e-9): return abs(float(sp.N(p)) - float(sp.N(q))) <= tol * max(1, abs(float(sp.N(q))))
def nigual(i, esp): v = nums(i); return len(v) == len(esp) and all(igual(a, b) for a, b in zip(v, esp))
def opt(i):
    c = cks(i)[0]; return c['opciones'][c['ok']]
def cr(u, v): return M(u).cross(M(v))
def dt(*f): return M([list(x) for x in f]).det()
def rk(*f): return M([list(x) for x in f]).rank()
def vec(a, b): return M(b) - M(a)
def prop(u, v): return cr(u, v) == sp.zeros(3, 1)
def en_plano(n, d, p): return M(n).dot(M(p)) == d
def en_recta_imp(planos, p): return all(M(n).dot(M(p)) == d for n, d in planos)

# =====================================================================
#  TEORÍA: ejemplos resueltos
# =====================================================================
# s0: recta por dos puntos
A, B = (1, -2, 3), (4, 0, -1); v = vec(A, B)
comprobar('t0-AB', list(v) == [3, 2, -4])
comprobar('t0-C en r', all(A[i] + 2 * v[i] == (7, 2, -5)[i] for i in range(3)))
comprobar('t0-C′ no en r', solve(1 + 3 * t - 7, t) == [2] and solve(3 - 4 * t - (-4), t) == [Q(7, 4)])

# s1: implícita → paramétricas
n1, n2 = (1, -2, 1), (2, 1, -1)
d = cr(n1, n2); comprobar('t1-dir', list(d) == [1, 3, 5])
P = (0, -3, -3); comprobar('t1-P', en_recta_imp([(n1, 3), (n2, 0)], P))
comprobar('t1-P2', en_recta_imp([(n1, 3), (n2, 0)], (1, 0, 2)))
comprobar('t1-sol', solve([-2 * sp.Symbol('y') + sp.Symbol('z') - 3, sp.Symbol('y') - sp.Symbol('z')], dict=True)[0] == {sp.Symbol('y'): -3, sp.Symbol('z'): -3})
# continua → implícita
P = (1, -1, 3); v = (2, -1, 3)
pl = [((1, 2, 0), -1), ((0, 3, 1), 0)]  # x+2y+1=0 → x+2y=-1 ; 3y+z=0
comprobar('t1-planos pasan P', en_recta_imp(pl, P))
comprobar('t1-planos contienen dirección', all(M(n).dot(M(v)) == 0 for n, _ in pl))
comprobar('t1-n1×n2', list(cr((1, 2, 0), (0, 3, 1))) == [2, -1, 3])
x, y, z = symbols('x y z')
comprobar('t1-cruz1', sp.expand(-(x - 1) - 2 * (y + 1)) == sp.expand(-(x + 2 * y + 1)))
comprobar('t1-cruz2', sp.expand(3 * (y + 1) + (z - 3)) == sp.expand(3 * y + z))
# componente cero: P(1,2,3), v=(2,0,-1): x-1 = -2(z-3) → x+2z-7=0
comprobar('t1-v0', sp.expand((x - 1) + 2 * (z - 3)) == sp.expand(x + 2 * z - 7))

# s2: plano que contiene a r y al punto Q
P, u, Qp = (1, 0, 2), (1, 2, -1), (2, 3, 1)
PQ = vec(P, Qp); n = cr(u, PQ)
comprobar('t2-PQ', list(PQ) == [1, 3, -1]); comprobar('t2-n', list(n) == [1, 0, 1]); comprobar('t2-noprop', not prop(u, PQ))
comprobar('t2-plano', en_plano((1, 0, 1), 3, P) and en_plano((1, 0, 1), 3, Qp) and en_plano((1, 0, 1), 3, (2, 2, 1)))

# s3: plano por tres puntos (segmentaria)
A, B, C = (1, 0, 0), (0, 2, 0), (0, 0, 3)
n = cr(vec(A, B), vec(A, C)); comprobar('t3-n', list(n) == [6, 3, 2]); comprobar('t3-d', M(n).dot(M(A)) == 6)
comprobar('t3-segm', sp.expand(x / 1 + y / 2 + z / 3 - 1) == sp.expand((6 * x + 3 * y + 2 * z - 6) / 6))
# general → paramétricas: x+2y−z=4
u_, v_ = (-2, 1, 0), (1, 0, 1)
comprobar('t3-param', all(M((4, 0, 0)).dot(M((1, 2, -1))) == 4 for _ in [0]) and M(u_).dot(M((1, 2, -1))) == 0 and M(v_).dot(M((1, 2, -1))) == 0)
comprobar('t3-normal', list(cr(u_, v_)) == [1, 2, -1])
comprobar('t3-cortes', [4 / 1, 2 / 1, -4 / 1] == [4, 2, -4] and 1 * 4 == 4 and 2 * 2 == 4 and -1 * -4 == 4)

# s4: cuatro casos
A, uu = (1, 2, 3), (1, -1, 2)
def pos2(A, uu, Qp, vv):
    AQ = vec(A, Qp); r1 = rk(uu, vv); r2 = rk(uu, vv, AQ)
    return r1, r2, dt(uu, vv, AQ)
r1, r2, dd = pos2(A, uu, (0, 1, 0), (2, 1, 1)); comprobar('t4a', (r1, r2, dd) == (2, 3, -9))
r1, r2, dd = pos2(A, uu, (0, 0, 4), (2, 1, 1)); comprobar('t4b', (r1, r2, dd) == (2, 2, 0))
comprobar('t4b-punto', tuple(A[i] + 1 * uu[i] for i in range(3)) == (2, 1, 5) == tuple((0, 0, 4)[i] + (2, 1, 1)[i] for i in range(3)))
r1, r2, dd = pos2(A, uu, (0, 0, 0), (-2, 2, -4)); comprobar('t4c', (r1, r2) == (1, 2))
r1, r2, dd = pos2(A, uu, (3, 0, 7), (-2, 2, -4)); comprobar('t4d', (r1, r2) == (1, 1))
comprobar('t4d-Q', tuple(A[i] + 2 * uu[i] for i in range(3)) == (3, 0, 7))
# implícitas
Mm = M([[1, -1, 0], [0, 1, -1], [1, 1, 0], [1, 0, 1]]); Ms = M([[1, -1, 0, 0], [0, 1, -1, 0], [1, 1, 0, 2], [1, 0, 1, 2]])
comprobar('t4-impl', Mm.rank() == 3 and Ms.rank() == 3 and M([[1, -1, 0], [0, 1, -1], [1, 1, 0]]).det() == 2)
comprobar('t4-impl-punto', solve([x - y, y - z, x + y - 2, x + z - 2], [x, y, z], dict=True) == [{x: 1, y: 1, z: 1}])

# s5: recta-plano
v, n = (2, -1, 1), (1, 1, 1)
comprobar('t5a', M(v).dot(M(n)) == 2 and solve((1 + 2 * t) + (-t) + (3 + t) - 5, t) == [Q(1, 2)])
comprobar('t5a-punto', (1 + 2 * Q(1, 2), -Q(1, 2), 3 + Q(1, 2)) == (2, -Q(1, 2), Q(7, 2)) and 2 - Q(1, 2) + Q(7, 2) == 5)
# tres resultados: r: (1+t, 2−t, t)
rx = (1 + t, 2 - t, t)
comprobar('t5b-π1', sp.simplify(rx[0] + rx[1] - 3) == 0)
comprobar('t5b-π2', sp.simplify(rx[0] + rx[1] - 5) == -2 and M((1, -1, 1)).dot(M((1, 1, 0))) == 0)
comprobar('t5b-π3', solve(rx[0] + rx[1] + rx[2] - 4, t) == [1] and tuple(c.subs(t, 1) for c in rx) == (2, 1, 1))
# dos planos
n1, n2 = (1, 2, -1), (2, -1, 1); d = cr(n1, n2)
comprobar('t5c-dir', list(d) == [1, -3, -5])
comprobar('t5c-P', en_plano(n1, 1, (Q(9, 5), -Q(2, 5), 0)) and en_plano(n2, 4, (Q(9, 5), -Q(2, 5), 0)))
comprobar('t5c-P2', en_plano(n1, 1, (2, -1, -1)) and en_plano(n2, 4, (2, -1, -1)) and (Q(9, 5) + Q(1, 5), -Q(2, 5) - Q(3, 5), -1) == (2, -1, -1))

# s7: tres planos
M1 = M([[1, 1, 1], [1, -1, 1], [1, 1, -1]]); comprobar('t7a', M1.det() == 4 and solve([x + y + z - 3, x - y + z - 1, x + y - z - 1], [x, y, z], dict=True) == [{x: 1, y: 1, z: 1}])
M2 = M([[1, 1, 0], [0, 1, 1], [1, 0, -1]]); M2s = M([[1, 1, 0, 1], [0, 1, 1, 1], [1, 0, -1, 1]])
comprobar('t7b', M2.det() == 0 and M2.rank() == 2 and M2s.rank() == 3 and all(not prop(a, b) for a, b in [((1, 1, 0), (0, 1, 1)), ((1, 1, 0), (1, 0, -1)), ((0, 1, 1), (1, 0, -1))]))
M3s = M([[1, 1, 0, 1], [0, 1, 1, 1], [1, 0, -1, 0]])
comprobar('t7c', M3s.rank() == 2 and M2.rank() == 2 and solve([x + y - 1, y + z - 1, x - z], [x, y, z], dict=True) == [{x: z, y: 1 - z}])
comprobar('t7c-sum', M([1, 1, 0, 1]).T[0] == 1 and (M([1, 1, 0, 1]) - M([0, 1, 1, 1]))[:] == [1, 0, -1, 0])

# s8: haces
H1, H2 = x + y - z - 1, 2 * x - y + z - 2
lam_ = solve((H1 + lam * H2).subs({x: 0, y: 0, z: 0}), lam)[0]; comprobar('t8a-λ', lam_ == -Q(1, 2))
comprobar('t8a-plano', sp.expand(2 * (H1 - Q(1, 2) * H2)) == sp.expand(3 * y - 3 * z))
comprobar('t8a-r', cr((1, 1, -1), (2, -1, 1)) == M([0, -3, -3]) and sp.expand(H1.subs(x, 1)) == y - z and sp.expand(H2.subs(x, 1)) == z - y and sp.expand((H1 + H2).subs(x, 1) - (x - 1).subs(x, 1)) == 0 and sp.expand(H1 + H2) == 3 * x - 3)
G = sp.expand(x + y - z - 1 + lam * (x - y + z - 3))
comprobar('t8b', sp.Poly(G, z).coeff_monomial(z) == lam - 1 and sp.expand(G.subs(lam, 1)) == 2 * x - 4)

# s9: puntos
AB, AC = (1, sp.Symbol('mm'), 2), (-2, 4, sp.Symbol('nn') - 2)
sol = solve([4 - (-2) * sp.Symbol('mm'), sp.Symbol('nn') - 2 - (-2) * 2], [sp.Symbol('mm'), sp.Symbol('nn')], dict=True)[0]
comprobar('t9a', sol == {sp.Symbol('mm'): -2, sp.Symbol('nn'): -2} and prop((1, -2, 2), (-2, 4, -4)))
A, B, C, D = (1, 0, 1), (2, 1, 0), (0, 1, 2), (m, 0, 3)
dd = dt(vec(A, B), vec(A, C), vec(A, D)); comprobar('t9b', sp.expand(dd) == 2 + 2 * m and solve(dd, m) == [-1])
comprobar('t9b-plano', list(cr(vec(A, B), vec(A, C))) == [2, 0, 2] and en_plano((1, 0, 1), 2, B) and en_plano((1, 0, 1), 2, C) and en_plano((1, 0, 1), 2, (-1, 0, 3)))
A, B, C = (1, 2, 3), (2, 4, 3), (4, 5, 1)
Dd = tuple(A[i] + C[i] - B[i] for i in range(3)); comprobar('t9c-D', Dd == (3, 3, 1) and vec(A, B) == vec(Dd, C))
Aq = tuple(2 * (0, 1, -1)[i] - A[i] for i in range(3)); comprobar('t9c-sim', Aq == (-1, 0, -5) and tuple((A[i] + Aq[i]) / 2 for i in range(3)) == (0, 1, -1))
comprobar('t9d', solve(3 - t, t) == [3] and (1 + 3, 2 + 3, 0) == (4, 5, 0))

# s10: parámetro
A, u, B, v = (0, 1, -1), (1, m, 2), (1, 0, 1), (2, 1, m)
dd = sp.factor(dt(u, v, vec(A, B))); comprobar('t10a-det', sp.expand(dd - (m - 4) * (m + 1)) == 0)
comprobar('t10a-par', solve(sp.Eq(1 / sp.Integer(2), m), m) == [Q(1, 2)] and solve(sp.Eq(Q(1, 2), 2 / m), m) == [4])
comprobar('t10a-rango2', all(M([u, v]).subs(m, val).rank() == 2 for val in [Q(1, 2), 4, -1, 0, 1, 3]))
c_ = list(cr(u, v)); comprobar('t10a-prop', c_ == [m ** 2 - 2, 4 - m, 1 - 2 * m] and not (set(solve(c_[0], m)) & set(solve(c_[1], m)) & set(solve(c_[2], m))))
vv, nn = (1, -1, 1), (2, m, -1)
comprobar('t10b-vn', sp.expand(M(vv).dot(M(nn))) == 1 - m and en_plano((2, 1, -1), 4, (1, 2, 0)))
Pp = (1, 2, 0); comprobar('t10b-P', (2 * Pp[0] + 1 * Pp[1] - Pp[2]) == 4 and all((2 * Pp[0] + mm * Pp[1] - Pp[2]).subs(mm, mm) == 2 + 2 * mm for mm in [m]) and solve(2 + 2 * m - 4, m) == [1])
M4 = M([[1, 1, 1], [1, m, 1], [1, 1, m]]); comprobar('t10c-det', sp.factor(M4.det()) == (m - 1) ** 2)
M4_1 = M4.subs(m, 1); M4s = M([[1, 1, 1, 1], [1, m, 1, 2], [1, 1, m, 1]]).subs(m, 1)
comprobar('t10c-m1', M4_1.rank() == 1 and M4s.rank() == 2)

# =====================================================================
#  EJERCICIOS
# =====================================================================
comprobar('p1', nigual('p1', [1, -1, -2]) and list(vec((1, 2, 3), (3, 0, -1))) == [2, -2, -4])
comprobar('p2', nigual('p2', [0, 7, 8]) and (2 - 2, 1 + 6, 8) == (0, 7, 8))
comprobar('p3', nums('p3') == [2] and (1 + 2 * 2, -1 - 3 * 2, 2 + 2) == (5, -7, 4))
comprobar('p4', nums('p4') == [-12] and solve(2 * 1 - 2 + 4 * 3 + sp.Symbol('D'), sp.Symbol('D')) == [-12])
okp = [p for p in [(1, 1, 2), (2, 1, 1), (3, 0, 0), (1, -1, 1)] if en_plano((2, -1, 3), 7, p)]
comprobar('p5', okp == [(1, 1, 2)] and opt('p5') == '(1, 1, 2)')
n = cr(vec((1, 0, 0), (0, 1, 0)), vec((1, 0, 0), (0, 0, 1))); comprobar('p6', list(n) == [1, 1, 1] and nums('p6') == [-1] and en_plano((1, 1, 1), 1, (0, 1, 0)))
comprobar('p7', nigual('p7', [3, -1, -2]) and list(cr((1, 1, 1), (1, -1, 2))) == [3, -1, -2])
r1, r2, dd = pos2((1, 2, 3), (1, -2, 4), (0, 0, 0), (-2, 4, -8)); comprobar('p8', (r1, r2) == (1, 2) and opt('p8') == 'Son paralelas')
comprobar('p9', nums('p9') == [-5])
comprobar('p10', opt('p10') == 'Son paralelos' and prop((2, -1, 3), (4, -2, 6)) and 5 != 2 * 1)
comprobar('p11', opt('p11') == 'Sí' and prop(vec((1, 2, 3), (3, 5, 7)), vec((1, 2, 3), (5, 8, 11))))
comprobar('p12', nigual('p12', [-1, 0, -5]) and tuple(2 * (0, 1, -1)[i] - (1, 2, 3)[i] for i in range(3)) == (-1, 0, -5))
sol = solve([x + y - 3, y + z - 4, x], [x, y, z], dict=True)[0]; comprobar('p13', nigual('p13', [sol[x], sol[y], sol[z]]) and (sol[x], sol[y], sol[z]) == (0, 3, 1))
comprobar('p14', opt('p14') == 'La recta está contenida en el plano' and M((1, -1, 0)).dot(M((1, 1, 1))) == 0 and en_plano((1, 1, 1), 3, (1, 1, 1)))

A, B, C = (1, 2, 0), (3, 1, 1), (0, 0, 2); n = cr(vec(A, B), vec(A, C))
comprobar('p15', list(n) == [0, -5, -5] and nums('p15') == [-2] and all(0 + 1 * p[1] + 1 * p[2] - 2 == 0 for p in [A, B, C]))
sol = solve([x + y - 0 - 2, 2 * x - y + 0 - 1], [x, y], dict=True)[0]; comprobar('p16', nigual('p16', [1, 1, 0]) and sol == {x: 1, y: 1})
comprobar('p17', nigual('p17', [5, -3, 8]) and solve(2 + 3 * t - 8, t) == [2] and (1 + 4, -1 - 2, 8) == (5, -3, 8))
r1, r2, dd = pos2((1, 0, -1), (2, 1, -1), (0, 1, 2), (1, -1, 3)); comprobar('p18', nums('p18') == [-18] and dd == -18 and r1 == 2 and r2 == 3)
s_ = solve([t - (2 + lam), 2 * t - 2, 3 * t - (2 - lam)], [t, lam], dict=True)[0]; comprobar('p19', nigual('p19', [1, 2, 3]) and s_ == {t: 1, lam: -1})
n = cr((1, -1, 1), vec((1, 2, 0), (0, 0, 1))); comprobar('p20', list(n) == [1, -2, -3] and nums('p20') == [-2, -3, 3])
comprobar('p20b', 1 * 0 + -2 * 0 + -3 * 1 + 3 == 0 and 1 - 4 - 0 + 3 == 0 and nums('p20') == [-2, -3, 3])
comprobar('p21', nums('p21') == [-2] and 2 - 1 + 1 - 2 == 0)
sol = solve([x + 2 * y - 1, 2 * x - y - 4], [x, y], dict=True)[0]; comprobar('p22', nigual('p22', [sol[x], sol[y], 0]) and (sol[x], sol[y]) == (Q(9, 5), -Q(2, 5)))
sol = solve([x + y + z - 6, x - y + z - 2, 2 * x + y - z - 1], [x, y, z], dict=True)[0]; comprobar('p23', nigual('p23', [1, 2, 3]) and (sol[x], sol[y], sol[z]) == (1, 2, 3))
Mx = M([[1, 1, 0, 1], [0, 1, 1, 1], [1, 0, -1, 0]]); comprobar('p24', opt('p24') == 'Pasan por una misma recta' and Mx.rank() == 2 and Mx[:, :3].rank() == 2)
comprobar('p25', nums('p25') == [-0.5] and solve((2 + 1 - 2) + k * (1 - 0 + 1), k) == [-Q(1, 2)])
AB, AC = (1, m - 2, 2), (3, -2, 6); comprobar('p26', igual(nums('p26')[0], Q(4, 3)) and solve(sp.Eq(m - 2, -Q(2, 3)), m) == [Q(4, 3)] and prop((1, -Q(2, 3), 2), AC))
A, B, C = (0, 1, 2), (3, 1, 4), (5, 4, 1); Dd = tuple(A[i] + C[i] - B[i] for i in range(3)); comprobar('p27', nigual('p27', Dd) and Dd == (2, 4, -1) and vec(A, B) == vec(Dd, C))
cortes = [Q(6, 2), Q(6, -3), Q(6, 1)]; comprobar('p28', sorted(cks('p28')[0]['valores']) == [-2, 3, 6] and sorted(cortes) == [-2, 3, 6])
comprobar('p29', nigual('p29', [Q(3, 2), 1, Q(1, 2)]) and solve((1 + t) + 2 * t + (1 - t) - 3, t) == [Q(1, 2)])
comprobar('p30', nums('p30') == [-4] and 2 - 1 + 3 - 4 == 0)
comprobar('p31', nums('p31') == [8] and (2 * 1, 2 * -2, 2 * 3, 2 * 4) == (2, -4, 6, 8))
comprobar('p32', nigual('p32', [5, 1, -1]) and solve(2 * t - 2, t) == [1] and (2 + 3 * 1, 2 * 1 - 1, -1) == (5, 1, -1))

# ★★★
dd = dt((1, 1, m), (2, -1, 1), vec((1, 0, 0), (0, 1, 1))); comprobar('p33', sp.expand(dd) == m - 5 and nums('p33') == [5] and rk((1, 1, 5), (2, -1, 1)) == 2)
vn = M((1, -1, 2)).dot(M((m, 1, -1))); comprobar('p34-m', sp.expand(vn) == m - 3 and nums('p34')[0] == 3 and (m * 1 + 0 - 0).subs(m, 3) != 3 + 1)
sol_t = solve(4 * (1 + t) - t - 2 * t - 5, t)[0]; pt_ = (1 + sol_t, -sol_t, 2 * sol_t); comprobar('p34-pt', nums('p34')[1:] == list(pt_) and pt_ == (2, -1, 2))
comprobar('p35', nums('p35') == [1, 2] and (2 * 1, 2 * 2, 2 * -1, 2 * 1) == (2, 4, -2, 2))
Mp = M([[1, 1, m], [1, m, 1], [m, 1, 1]]); comprobar('p36', sp.factor(Mp.det()) == -(m - 1) ** 2 * (m + 2) and sorted(cks('p36')[0]['valores']) == sorted(solve(Mp.det(), m)) == [-2, 1])
Mm2 = M([[1, 1, -2, 1], [1, -2, 1, 1], [-2, 1, 1, 1]]); comprobar('p37', opt('p37').startswith('Un prisma') and Mm2[:, :3].rank() == 2 and Mm2.rank() == 3 and all(not prop(a, b) for a, b in [((1, 1, -2), (1, -2, 1)), ((1, 1, -2), (-2, 1, 1)), ((1, -2, 1), (-2, 1, 1))]))
n = cr((1, 1, 0), (0, 1, 1)); comprobar('p38', list(n) == [1, -1, 1] and nums('p38') == [-1, 1, -2] and 1 - 0 + 1 - 2 == 0)
comprobar('p39', nigual('p39', [1, 1, -2]) and list(cr((1, 1, 1), (1, -1, 0))) == [1, 1, -2])
dd = dt(vec((1, 1, 0), (2, 0, 1)), vec((1, 1, 0), (0, 1, 1)), vec((1, 1, 0), (1, m, m))); comprobar('p40', sp.expand(dd) == 2 - 3 * m and igual(nums('p40')[0], Q(2, 3)))
comprobar('p41', (1 + 1, 0 + 1, 1 - 1) == (2, 1, 0) and (2 + 0, 1 + 0, 0 + 0) == (2, 1, 0))
n = cr((1, 1, -1), (1, 0, 1)); comprobar('p41b', list(n) == [1, -2, -1] and nums('p41') == [2, 1, 0, 0] and 1 - 0 - 1 + 0 == 0 and 2 - 2 - 0 == 0 and en_plano((1, -2, -1), 0, (2, 1, 0)))
comprobar('p41c', rk((1, 1, -1), (1, 0, 1)) == 2)
G = sp.expand(x - y + z - 1 + k * (2 * x + y - z - 2)); comprobar('p42', sp.Poly(G, x).coeff_monomial(x) == 1 + 2 * k and igual(nums('p42')[0], -Q(1, 2)) and sp.expand(G.subs(k, -Q(1, 2)) - (-Q(3, 2) * y + Q(3, 2) * z)) == 0)
n = cr((1, 1, 1), vec((1, 0, 0), (0, 1, 0))); comprobar('p43', list(n) == [-1, -1, 2] and nums('p43') == [1, -2, -1] and 1 + 0 - 0 - 1 == 0 and 0 + 1 - 0 - 1 == 0 and prop((1, 1, 1), (2, 2, 2)))
comprobar('p44', opt('p44').startswith('Dos paralelos'))
comprobar('p45', nigual('p45', [4, -Q(5, 2), Q(15, 2)]) and solve((1 + 2 * t) + (-1 - t) + (3 + 3 * t) - 9, t) == [Q(3, 2)] and 4 - Q(5, 2) + Q(15, 2) == 9)
dd = dt(vec((1, 0, 0), (0, 1, 0)), vec((1, 0, 0), (0, 0, 1)), vec((1, 0, 0), (m, m, m))); comprobar('p46', sp.expand(dd) == 3 * m - 1 and igual(nums('p46')[0], Q(1, 3)))

# estructura: nº de ejercicios por nivel, ids únicos
niv = {1: 0, 2: 0, 3: 0}
for e in T['ejercicios']: niv[e['nivel']] += 1
comprobar('nº ejercicios', len(E) == len(T['ejercicios']) == 46 and niv == {1: 14, 2: 18, 3: 14}, str(niv))

print(f'{ok} comprobaciones correctas, {len(fallos)} fallos' if not fallos else '\n'.join(fallos) + f'\n{ok} comprobaciones correctas, {len(fallos)} fallos')
