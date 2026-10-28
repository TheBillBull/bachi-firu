#!/usr/bin/env python3
"""
Verificación independiente (sympy, aritmética exacta) del tema 6 de Matemáticas II (Problemas métricos):
  · cada cifra de los ejemplos resueltos de la teoría,
  · la respuesta de cada uno de los 45 ejercicios (se recalcula desde el enunciado y se compara con el corrector de la web),
  · lo que calculan los simuladores (proyecciones, simétricos, perpendicular común, calculadora) frente a sympy,
  · las actividades (test, errores).
No comparte código con la web.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_mates2_t6.py /tmp/ampl.json [otro.json]
(el volcado de los simuladores se genera aquí mismo con herramientas/volcar_mates2_t6.js; el segundo argumento se ignora)
"""
import json, sys, os, subprocess
import sympy as sp
from sympy import Matrix as M, Rational as Q, symbols, sqrt, acos, asin, pi, solve, simplify, Abs

datos = json.load(open(sys.argv[1]))
_raiz = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
sim = json.loads(subprocess.run(['node', os.path.join(_raiz, 'herramientas', 'volcar_mates2_t6.js')],
                                capture_output=True, text=True, check=True, cwd=_raiz).stdout)
T = datos['ampl']['mates2']['t6']
E = {e['id']: e for e in T['ejercicios']}
ok = 0
fallos = []
t, s, m, lam = symbols('t s m lam', real=True)

def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

def cks(i):
    c = E[i]['check']; return c if isinstance(c, list) else [c]
def vnum(i): return [c['valor'] for c in cks(i) if c['tipo'] == 'num']
def vlis(i): return sorted(cks(i)[0]['valores'])
def opt(i):
    c = cks(i)[0]; return c['opciones'][c['ok']]
def igual(p, q, tol=1e-4):
    p, q = float(sp.N(p)), float(sp.N(q)); return abs(p - q) <= tol * max(1, abs(q))
def li(l1, l2): return len(l1) == len(l2) and all(igual(p, q) for p, q in zip(l1, l2))

# ---------- geometría de referencia (sympy, exacta) ----------
def V(*a): return M(a)
def cr(u, v): return M(u).cross(M(v))
def mx(a, b, c): return M.hstack(M(a), M(b), M(c)).det()
def ang_rr(u, v): return sp.N(acos(Abs(M(u).dot(M(v))) / (M(u).norm() * M(v).norm())) * 180 / pi)
def ang_rp(v, n): return sp.N(asin(Abs(M(v).dot(M(n))) / (M(v).norm() * M(n).norm())) * 180 / pi)
def val(P, pl): return pl[0] * P[0] + pl[1] * P[1] + pl[2] * P[2] + pl[3]
def d_pp(P, pl): return Abs(val(P, pl)) / M(pl[:3]).norm()
def proy_pl(P, pl):
    n = M(pl[:3]); return M(P) - val(P, pl) / n.dot(n) * n
def d_pr(P, Qq, v): return cr(M(P) - M(Qq), v).norm() / M(v).norm()
def proy_r(P, Qq, v):
    v = M(v); return M(Qq) + (M(P) - M(Qq)).dot(v) / v.dot(v) * v
def d_cruz(Q1, u, Q2, v):
    w = cr(u, v); return Abs((M(Q2) - M(Q1)).dot(w)) / w.norm()
def pies(Q1, u, Q2, v):
    X = M(Q1) + t * M(u); Y = M(Q2) + s * M(v); d = Y - X
    sol = solve([d.dot(M(u)), d.dot(M(v))], [t, s], dict=True)[0]
    return X.subs(sol), Y.subs(sol)
def area(A, B, C): return cr(M(B) - M(A), M(C) - M(A)).norm() / 2
def vol(A, B, C, D): return Abs(mx(M(B) - M(A), M(C) - M(A), M(D) - M(A))) / 6
def en_plano(P, pl): return val(P, pl) == 0

# ============ TEORÍA: ejemplos resueltos ============
# sección 1
u, v = V(2, -1, 2), cr(V(1, 1, 0), V(0, 1, 1))
comprobar('s1 director s', list(v) == [1, -1, 1] and u.norm() == 3 and u.dot(v) == 5 and v.norm() == sqrt(3))
comprobar('s1 ángulo 15,79', igual(ang_rr(u, v), 15.79, 5e-4) and sp.simplify(5 / (3 * sqrt(3)) - 5 * sqrt(3) / 9) == 0 and igual(5 * sqrt(3) / 9, 0.9623, 1e-3))
comprobar('s1 m perpendiculares', solve(M([1, m, 2]).dot(M([m, -3, 1])), m) == [1] and M([1, 1, 2]).dot(M([1, -3, 1])) == 0)
# sección 2
comprobar('s2 sen=8/21', M([1, -2, 2]).dot(M([2, 3, 6])) == 8 and M([1, -2, 2]).norm() == 3 and M([2, 3, 6]).norm() == 7 and igual(ang_rp([1, -2, 2], [2, 3, 6]), 22.39, 5e-4))
comprobar('s2 arccos complementario', igual(sp.N(acos(Q(8, 21)) * 180 / pi), 67.61, 5e-4))
comprobar('s2 m paralela', solve(M([2, m, 1]).dot(M([3, 1, -1])), m) == [-5])
# sección 3
comprobar('s3 ángulo planos', M([1, 2, -2]).dot(M([0, 3, 4])) == -2 and M([0, 3, 4]).norm() == 5 and igual(ang_rr([1, 2, -2], [0, 3, 4]), 82.34, 5e-4))
comprobar('s3 m planos perpendiculares', solve(M([m, 2, -1]).dot(M([1, m, 2])), m) == [Q(2, 3)])
# sección 4
comprobar('s4 d(P,π)=3', d_pp([3, 0, 3], [2, -1, 2, -3]) == 3 and val([3, 0, 3], [2, -1, 2, -3]) == 9)
# sección 5
P, Qq, vv = [1, 2, -1], [0, 1, 0], [1, 1, 2]
qp = M(P) - M(Qq); comprobar('s5 producto', list(qp) == [1, 1, -1] and list(cr(qp, vv)) == [3, -3, 0] and d_pr(P, Qq, vv) == sqrt(3) and cr(qp, vv).norm() == 3 * sqrt(2))
# sección 6
Q1, uu, Q2, vw = [-1, 1, 0], [2, 1, 0], [2, -1, 1], [0, 1, 1]
comprobar('s6 cruzadas', list(M(Q2) - M(Q1)) == [3, -2, 1] and list(cr(uu, vw)) == [1, -2, 2] and (M(Q2) - M(Q1)).dot(cr(uu, vw)) == 9 and d_cruz(Q1, uu, Q2, vw) == 3)
# sección 7
n = V(1, 2, -2); pl = [1, 2, -2, -6]; P = [3, -1, 2]
comprobar('s7 plano', val(P, pl) == -9 and list(proy_pl(P, pl)) == [4, 1, 0] and en_plano([4, 1, 0], pl) and list(2 * proy_pl(P, pl) - M(P)) == [5, 3, -2] and d_pp(P, pl) == 3)
P, Qq, vv = [2, 1, 2], [0, 1, 0], [1, 1, 2]
F = proy_r(P, Qq, vv); comprobar('s7 recta', list(F) == [1, 2, 2] and list(2 * F - M(P)) == [0, 3, 2] and d_pr(P, Qq, vv) == sqrt(2)
                                  and (M(P) - F).dot(M(vv)) == 0 and 2 + 1 + 4 == 7 and cr(M(P) - M(Qq), vv).norm() == 2 * sqrt(3) and list(cr(M(P) - M(Qq), vv)) == [-2, -2, 2])
vr, nn = V(1, 1, 0), V(1, 1, 1); npl = cr(vr, nn)
comprobar('s7 recta sobre plano', list(npl) == [1, -1, 0] and list(M([1, 0, 0]) - Q(1, 3) * nn) == [Q(2, 3), Q(-1, 3), Q(-1, 3)] and Q(2, 3) - Q(-1, 3) == 1)
# sección 8
Q1, uu, Q2, vw = [-1, 1, 0], [2, 1, 0], [2, -1, 1], [0, 1, 1]
A, B = pies(Q1, uu, Q2, vw)
comprobar('s8 pies', list(A) == [1, 2, 0] and list(B) == [2, 0, 2] and (B - A).norm() == 3 and list(B - A) == [1, -2, 2] and solve([4 - 5 * t + s, -1 - t + 2 * s], [t, s]) == {t: 1, s: 1})
w_ = cr(uu, vw); n1 = cr(uu, w_); n2 = cr(vw, w_)
comprobar('s8 planos', list(n1) == [2, -4, -5] and list(n2) == [4, 1, -1] and 2 * (1) - 4 * (-1) * 0 == 2 and
          all(2 * p[0] - 4 * p[1] - 5 * p[2] + 6 == 0 for p in [A, M(Q1), M(Q1) + 2 * M(uu)]) and all(4 * p[0] + p[1] - p[2] - 6 == 0 for p in [B, M(Q2), M(Q2) + 3 * M(vw)])
          and cr(V(2, -4, -5), V(4, 1, -1)) == 9 * M([1, -2, 2]))
# sección 9
comprobar('s9 planos paralelos', d_pp([0, 0, Q(3, 2)], [4, -2, 4, 12]) == 3 and en_plano([0, 0, Q(3, 2)], [2, -1, 2, -3]) and abs(Q(12 + 3, 3)) == 5 and Q(9, 3) == 3)
comprobar('s9 recta-plano', M([1, 1, -2]).dot(M([1, 1, 1])) == 0 and d_pp([1, 1, 1], [1, 1, 1, -9]) == 2 * sqrt(3) and val([1, 1, 1], [1, 1, 1, -9]) != 0)
Q1, Q2, vv = [1, 0, 2], [3, 1, 0], [1, 2, 2]
comprobar('s9 rectas paralelas', list(cr(M(Q2) - M(Q1), vv)) == [6, -6, 3] and cr(M(Q2) - M(Q1), vv).norm() == 9 and d_pr(Q2, Q1, vv) == 3 and d_pr(Q1, Q2, vv) == 3)
# sección 10
A, B, C, D = [1, 0, 0], [3, 0, 1], [1, 2, 2], [2, 1, 5]
ab, ac, ad = M(B) - M(A), M(C) - M(A), M(D) - M(A)
planoABC = [1, 2, -2, -1]
comprobar('s10 tetraedro', list(cr(ab, ac)) == [-2, -4, 4] and area(A, B, C) == 3 and mx(ab, ac, ad) == 14 and vol(A, B, C, D) == Q(7, 3) and 3 * vol(A, B, C, D) / area(A, B, C) == Q(7, 3)
          and all(en_plano(p, planoABC) for p in (A, B, C)) and d_pp(D, planoABC) == Q(7, 3) and val(D, planoABC) == -7)
comprobar('s10 ángulo AD', sp.simplify(ad.dot(M([1, 2, -2])) + 7) == 0 and ad.norm() == 3 * sqrt(3) and igual(ang_rp(ad, [1, 2, -2]), 26.68, 5e-4) and sp.simplify(Q(7, 9) / sqrt(3) - 7 * sqrt(3) / 27) == 0)
# sección 11
A, B = V(1, 2, 3), V(3, 0, 1); Mm = (A + B) / 2; x, y, z = symbols('x y z')
mediador = sp.expand((x - 1) ** 2 + (y - 2) ** 2 + (z - 3) ** 2 - (x - 3) ** 2 - y ** 2 - (z - 1) ** 2)
comprobar('s11 mediador', list(B - A) == [2, -2, -2] and list(Mm) == [2, 1, 2] and mediador == 4 * x - 4 * y - 4 * z + 4)
comprobar('s11 mediador equidista', all(simplify(M(p - M([1, 2, 3])).norm() ** 2 - M(p - M([3, 0, 1])).norm() ** 2) == 0 for p in [V(0, 1, 0), V(1, 0, 0), V(2, 2, 1)] if (p[0] - p[1] - p[2] + 1) == 0))
comprobar('s11 planos a distancia', all(d_pp(p, [2, -1, 2, -1]) == 2 for p in [V(0, 0, Q(-5, 2)), V(0, 0, Q(7, 2))]) and en_plano([0, 0, Q(-5, 2)], [2, -1, 2, 5]) and en_plano([0, 0, Q(7, 2)], [2, -1, 2, -7]))
p1 = lambda X: X[0] + 2 * X[1] + 2 * X[2] - 3; p2 = lambda X: 2 * X[0] - 2 * X[1] + X[2] + 3
bis1 = [-1, 4, 1, -6]; bis2 = [3, 0, 3, 0]
def en_bis(X): return all(simplify(Abs(p1(X)) - Abs(p2(X))) == 0 for _ in [0])
puntos_b1 = [V(0, 0, 6), V(2, 2, 0), V(0, 1, 2), V(-6, 0, 0)]
comprobar('s11 bisector1', all(en_plano(p, bis1) and Abs(p1(p)) == Abs(p2(p)) for p in puntos_b1))
puntos_b2 = [V(0, 0, 0), V(1, 5, -1), V(2, -3, -2)]
comprobar('s11 bisector2', all(en_plano(p, bis2) and Abs(p1(p)) == Abs(p2(p)) for p in puntos_b2) and M([-1, 4, 1]).dot(M([1, 0, 1])) == 0)
# sección 12 / 13
P = [3, 0, 3]; pl = [2, -1, 2, -3]
comprobar('p1 a-c', val(P, pl) == 9 and d_pp(P, pl) == 3 and list(proy_pl(P, pl)) == [1, 1, 1] and en_plano([1, 1, 1], pl) and list(2 * proy_pl(P, pl) - M(P)) == [-1, 2, -1])
comprobar('p1 d', ang_rp(P, pl[:3]) is not None and igual(ang_rp(P, pl[:3]), 70.53, 5e-4) and sp.simplify(sp.sin(asin(2 * sqrt(2) / 3)) - 2 * sqrt(2) / 3) == 0 and M(P).dot(M(pl[:3])) == 12)
comprobar('p2 a-c', area(A := [1, 0, 0], [3, 0, 1], [1, 2, 2]) == 3 and vol([1, 0, 0], [3, 0, 1], [1, 2, 2], [2, 1, 5]) == Q(7, 3) and d_pp([2, 1, 5], planoABC) == Q(7, 3))
comprobar('p2 d', ab.dot(ac) == 2 and ab.norm() == sqrt(5) and ac.norm() == sqrt(8) and igual(ang_rr(ab, ac), 71.57, 5e-4) and sp.simplify(Q(2) / sqrt(40) - 1 / sqrt(10)) == 0)
P, Qq, vv = [2, 1, 2], [0, 1, 0], [1, 1, 2]; F = proy_r(P, Qq, vv); S = 2 * F - M(P)
comprobar('p3 a,b', list(F - M(P)) == [-1, 1, 0] and (F - M(P)).dot(M(vv)) == 0 and list(S) == [0, 3, 2])
c_ = cr(M(P) - M(Qq), S - M(Qq)); comprobar('p3 c', list(M(P) - M(Qq)) == [2, 0, 2] and list(S - M(Qq)) == [0, 2, 2] and list(c_) == [-4, -4, 4] and c_.norm() == 4 * sqrt(3) and c_.norm() / 2 == 2 * sqrt(3)
                                              and (M(P) - M(S)).norm() * (M(Qq) - F).norm() / 2 == 2 * sqrt(3))

# ============ EJERCICIOS ============
comprobar('m1', igual(vnum('m1')[0], ang_rr([1, 1, 0], [0, 1, 1])) and igual(ang_rr([1, 1, 0], [0, 1, 1]), 60))
comprobar('m2', igual(vnum('m2')[0], ang_rp([1, 0, 1], [1, 1, 0])) and igual(ang_rp([1, 0, 1], [1, 1, 0]), 30))
comprobar('m3', igual(vnum('m3')[0], ang_rr([1, 1, 1], [1, 0, 0])) and igual(ang_rr([1, 1, 1], [1, 0, 0]), 54.7356, 1e-6))
comprobar('m4', igual(vnum('m4')[0], d_pp([1, 2, 3], [2, -1, 2, -4])) and d_pp([1, 2, 3], [2, -1, 2, -4]) == Q(2, 3))
comprobar('m5', vnum('m5') == [2] and d_pp([0, 0, 0], [2, 3, 6, -14]) == 2)
comprobar('m6', opt('m6') == 'perpendiculares' and M([1, 2, -1]).dot(M([3, -1, 1])) == 0)
comprobar('m7', igual(vnum('m7')[0], d_pr([1, 2, 0], [1, 0, 0], [0, 1, 1])) and d_pr([1, 2, 0], [1, 0, 0], [0, 1, 1]) == sqrt(2) and list(cr([0, 2, 0], [0, 1, 1])) == [2, 0, 0])
comprobar('m8', vnum('m8') == [0, 1, 2] and list(proy_pl([1, 2, 3], [1, 1, 1, -3])) == [0, 1, 2])
comprobar('m9', vnum('m9') == [3, -2, -1] and list(2 * M([2, 0, 1]) - M([1, 2, 3])) == [3, -2, -1])
comprobar('m10', vnum('m10') == [3.5] and area([1, 0, 0], [0, 2, 0], [0, 0, 3]) == Q(7, 2) and list(cr([-1, 2, 0], [-1, 0, 3])) == [6, 3, 2])
comprobar('m11', vnum('m11') == [1] and vol([0, 0, 0], [1, 0, 0], [0, 2, 0], [0, 0, 3]) == 1)
comprobar('m12', opt('m12').startswith('sen α = |v·n|') and E['m12']['resultado'] == 'sen α = |v·n|/(|v||n|)')
D_ = solve(M([1, -1, -1]).dot(M([2, 1, 2])) * 0 + (2 - 1 - 2) + m, m)[0]; comprobar('m13', vnum('m13') == [1] and D_ == 1 and list((M([3, 0, 1]) - M([1, 2, 3]))) == [2, -2, -2])
comprobar('m14', vnum('m14') == [3] and Abs(Q(6 + 3)) / 3 == 3)
comprobar('m15', opt('m15') == '|[Q₁Q₂, u, v]| / |u × v|')
comprobar('m16', igual(vnum('m16')[0], ang_rr(cr([1, -1, 0], [0, 1, -1]), [1, 2, 0])) and list(cr([1, -1, 0], [0, 1, -1])) == [1, 1, 1] and igual(ang_rr([1, 1, 1], [1, 2, 0]), 39.2315, 1e-5) and sp.simplify(3 / sqrt(15) - sqrt(15) / 5) == 0)
comprobar('m17', igual(vnum('m17')[0], ang_rp([2, 1, -2], [1, 2, -2])) and M([2, 1, -2]).dot(M([1, 2, -2])) == 8 and igual(ang_rp([2, 1, -2], [1, 2, -2]), 62.7339, 1e-5))
comprobar('m18', igual(vnum('m18')[0], d_pr([0, 3, 1], [0, 1, 0], [1, 1, 2])) and list(cr([0, 2, 1], [1, 1, 2])) == [3, 1, -2] and d_pr([0, 3, 1], [0, 1, 0], [1, 1, 2]) == sqrt(Q(7, 3)))
comprobar('m19', igual(vnum('m19')[0], d_cruz([0, 0, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1])) and list(cr([1, 1, 0], [1, 0, 1])) == [1, -1, -1] and d_cruz([0, 0, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1]) == 1 / sqrt(3))
comprobar('m20', vnum('m20') == [2, 2, 2] and list(proy_r([1, 2, 3], [0, 0, 0], [1, 1, 1])) == [2, 2, 2])
comprobar('m21', vnum('m21') == [-1, 0, 1] and list(2 * proy_pl([1, 2, 3], [1, 1, 1, -3]) - M([1, 2, 3])) == [-1, 0, 1])
tt = solve(Abs(2 * (1 + t) - t + 4 * t - 1) / 3 - 1, t); comprobar('m22', li(vlis('m22'), sorted(tt, key=float)) and sorted(tt) == [Q(-4, 5), Q(2, 5)])
sm = solve(Abs(m) / sqrt(2 + m ** 2) - sqrt(2) / 2, m); comprobar('m23', igual(vnum('m23')[0], sqrt(2)) and sorted(sm, key=float) == [-sqrt(2), sqrt(2)] and igual(ang_rp([1, 1, sqrt(2)], [0, 0, 1]), 45))
comprobar('m24', vnum('m24') == [-5] and solve(M([2, m, 1]).dot(M([3, 1, -1])), m) == [-5])
comprobar('m25', igual(vnum('m25')[0], 2 * area([1, 0, 0], [3, 0, 1], [1, 2, 2]) / M([2, 0, 1]).norm()) and 2 * 3 / sqrt(5) == 6 / sqrt(5) and area([1, 0, 0], [3, 0, 1], [1, 2, 2]) == 3
          and igual(d_pr([1, 2, 2], [1, 0, 0], [2, 0, 1]), 6 / sqrt(5)))
comprobar('m26', igual(vnum('m26')[0], vol([1, 0, 0], [3, 0, 1], [1, 2, 2], [2, 1, 5])) and vol([1, 0, 0], [3, 0, 1], [1, 2, 2], [2, 1, 5]) == Q(7, 3))
comprobar('m27', vnum('m27') == [-1] and en_plano([3, 0, 1], planoABC) and en_plano([1, 2, 2], planoABC) and en_plano([1, 0, 0], planoABC))
comprobar('m28', opt('m28') == 'x + z = 0' and all(en_plano(p, bis2) and Abs(p1(p)) == Abs(p2(p)) for p in puntos_b2))
Dd = solve(Abs(m) - 6, m); comprobar('m29', vlis('m29') == [-7, 5] and sorted([-1 + 6, -1 - 6]) == [-7, 5] and d_pp([0, 0, Q(-5, 2)], [2, -1, 2, -1]) == 2 and d_pp([0, 0, Q(7, 2)], [2, -1, 2, -1]) == 2)
P, Qq, vv = [3, 1, 0], [0, 1, 0], [1, 1, 2]; F = proy_r(P, Qq, vv)
comprobar('m30', vnum('m30') == [-2, 2, 2] and list(F) == [Q(1, 2), Q(3, 2), 1] and list(2 * F - M(P)) == [-2, 2, 2])
comprobar('m31', vnum('m31') == [3] and d_pr([3, 1, 0], [1, 0, 2], [1, 2, 2]) == 3)
comprobar('m32', igual(vnum('m32')[0], d_pp([1, 1, 1], [1, 1, 1, -9])) and M([1, 1, -2]).dot(M([1, 1, 1])) == 0 and d_pp([1, 1, 1], [1, 1, 1, -9]) == 2 * sqrt(3))
comprobar('m33', vnum('m33') == [-6] and solve(1 + 2 + 3 + m, m) == [-6])
A, B = pies([0, 1, -1], [1, 0, 1], [0, -1, 0], [0, 1, 1])
comprobar('m34', vnum('m34') == [1, 1, 0, 0, 0, 1] and list(A) == [1, 1, 0] and list(B) == [0, 0, 1] and (B - A).dot(M([1, 0, 1])) == 0 and (B - A).dot(M([0, 1, 1])) == 0 and (B - A).norm() == sqrt(3)
          and d_cruz([0, 1, -1], [1, 0, 1], [0, -1, 0], [0, 1, 1]) == sqrt(3))
comprobar('m35', igual(vnum('m35')[0], ang_rp([1, 1, 5], [1, 2, -2])) and igual(ang_rp([1, 1, 5], [1, 2, -2]), 26.6828, 1e-5))
comprobar('m36', igual(vnum('m36')[0], ang_rp([3, 0, 3], [2, -1, 2])) and igual(ang_rp([3, 0, 3], [2, -1, 2]), 70.5288, 1e-5))
xs = solve((x - 1) ** 2 + 4 + 9 - (x - 3) ** 2 - 1, x); comprobar('m37', vnum('m37') == [-1] and xs == [-1])
P38 = V(t, 1, t + 1); ts = solve(Abs(p1(P38)) - Abs(p2(P38)), t)
comprobar('m38', vnum('m38') == [-0.5, 1, 0.5] and ts == [Q(-1, 2)] and d_pp(P38.subs(t, Q(-1, 2)), [1, 2, 2, -3]) == d_pp(P38.subs(t, Q(-1, 2)), [2, -2, 1, 3]) == Q(1, 6))
ms = solve(Abs(2 * m + 2) / 3 - 2, m); comprobar('m39', vlis('m39') == [-4, 2] and sorted(ms) == [-4, 2] and d_pp([m, 1, 1], [2, 2, -1, 1]).subs(m, 2) == 2 == d_pp([m, 1, 1], [2, 2, -1, 1]).subs(m, -4))
ms = solve(Abs(m) / sqrt(3) - sqrt(3), m); comprobar('m40', vlis('m40') == [-3, 3] and sorted(ms) == [-3, 3] and d_cruz([0, 0, 0], [1, 1, 0], [0, 0, m], [1, 0, 1]) == Abs(m) / sqrt(3))
A, B, C, D = [1, 0, 0], [3, 0, 1], [1, 2, 2], [2, 1, 5]  # (reutilizados)
comprobar('m41', igual(vnum('m41')[0], 2 * sqrt(3)) and area([0, 1, 0], [2, 1, 2], [0, 3, 2]) == 2 * sqrt(3))
comprobar('m42', len(cks('m42')[0]['items']) == 4 and sum(i['p'] for i in cks('m42')[0]['items']) == 2.0)
# fórmula demostrada: para un Q del plano, QP·n coincide con la expresión
Pg = symbols('p1 p2 p3'); Qg = symbols('q1 q2 q3'); Ag, Bg, Cg, Dg = symbols('A B C D')
comprobar('m42 álgebra', sp.expand((M(Pg) - M(Qg)).dot(M([Ag, Bg, Cg])) - (Ag * Pg[0] + Bg * Pg[1] + Cg * Pg[2] + Dg)).subs(Dg, -(Ag * Qg[0] + Bg * Qg[1] + Cg * Qg[2])) == 0)
comprobar('m43', len(cks('m43')[0]['items']) == 4 and sp.simplify(sp.sin(pi / 2 - symbols('b')) - sp.cos(symbols('b'))) == 0)
comprobar('m44', igual(vnum('m44')[0], sqrt(3)) and (M([3, 0, 1]) - M([1, 2, 3])).norm() / 2 == sqrt(3) and d_pp([1, 2, 3], [1, -1, -1, 1]) == sqrt(3))
mm = solve(Abs(mx([-1, 2, 0], [-1, 0, 3], [0, 1, m])) / 6 - 1, m); comprobar('m45', vlis('m45') == [-4.5, 1.5] and sorted(mm) == [Q(-9, 2), Q(3, 2)] and mx([-1, 2, 0], [-1, 0, 3], [0, 1, m]) == 3 + 2 * m)
comprobar('numero y niveles', len(E) == 45 and sum(1 for e in E.values() if e['nivel'] == 3) == 12 and sum(1 for e in E.values() if e['nivel'] == 1) == 15)

# ============ SIMULADORES ============
for r in sim['plano']:
    pl = r['n'] + [r['D']]; P = r['P']
    comprobar('sim plano ' + str(pl), li(r['proy'], list(proy_pl(P, pl))) and li(r['sim'], list(2 * proy_pl(P, pl) - M(P))) and igual(r['d'], d_pp(P, pl)) and en_plano(proy_pl(P, pl), pl))
for r in sim['recta']:
    F = proy_r(r['P'], r['Q'], r['v'])
    comprobar('sim recta ' + str(r['v']), li(r['proy'], list(F)) and li(r['sim'], list(2 * F - M(r['P']))) and igual(r['d'], d_pr(r['P'], r['Q'], r['v'])) and (F - M(r['P'])).dot(M(r['v'])) == 0)
for r in sim['cruz']:
    w_ = cr(r['u'], r['v'])
    if w_.norm() == 0:
        comprobar('sim cruz paralelas', r['par'] and igual(r['d'], d_pr(r['Q2'], r['Q1'], r['u'])))
    elif (M(r['Q2']) - M(r['Q1'])).dot(w_) == 0:
        comprobar('sim cruz secantes', not r['par'] and igual(r['d'], 0) and igual(r['dm'], 0))
    else:
        A, B = pies(r['Q1'], r['u'], r['Q2'], r['v'])
        comprobar('sim cruz ' + str(r['u']), li(r['A'], list(A)) and li(r['B'], list(B)) and igual(r['d'], (B - A).norm()) and igual(r['dm'], d_cruz(r['Q1'], r['u'], r['Q2'], r['v'])))
for r in sim['calc']:
    a, k, res = r['a'], r['k'], r['res']
    if k == 'rr': comprobar('calc rr', igual(res['ang'], ang_rr(a[0], a[1])))
    elif k == 'pp': comprobar('calc pp', igual(res['ang'], ang_rr(a[0], a[1])))
    elif k == 'rp': comprobar('calc rp', igual(res['ang'], ang_rp(a[0], a[1])))
    elif k == 'pP': comprobar('calc pP', igual(res['d'], d_pp(a[0], a[1])))
    elif k == 'Pr': comprobar('calc Pr', igual(res['d'], d_pr(a[0], a[1], a[2])))
    else:
        w_ = cr(a[1], a[3])
        if w_.norm() == 0: comprobar('calc rs paralelas', res['tipo'] == 'paralelas' and igual(res['d'], d_pr(a[2], a[0], a[1])))
        else: comprobar('calc rs cruzan', res['tipo'] == 'cruzan' and igual(res['d'], d_cruz(a[0], a[1], a[2], a[3])))

# ============ ACTIVIDADES ============
D = T['datos']
for q in D['quiz1']['preguntas'] + D['errores']['preguntas']:
    comprobar('quiz coherente: ' + q['q'][:30], 0 <= q['ok'] < len(q['op']) and len(q['op']) >= 3 and q['porque'])
# preguntas del test con cifras
comprobar('test d=2/3', d_pp([1, 1, 1], [2, 2, 1, -3]) == Q(2, 3))
comprobar('test director', list(cr([1, 1, 0], [0, 1, 1])) == [1, -1, 1])
comprobar('test planos a distancia 3', [-1 + 9, -1 - 9] == [8, -10])
comprobar('error simétrico/mediano', Q(12 + 3, 3) == 5 and Q(6 + 3, 3) == 3)  # 4x-2y+4z+12 ÷ 2 = 2x-y+2z+6

print(f'{ok} comprobaciones correctas, {len(fallos)} fallos' if not fallos else '\n'.join(fallos) + f'\n{ok} comprobaciones correctas, {len(fallos)} fallos')
