#!/usr/bin/env python3
"""
Verificación independiente (sympy) del tema 9 de Matemáticas II (Aplicaciones de la derivada):
recalcula desde el enunciado cada cifra de los ejemplos resueltos, de los 44 ejercicios y de los datos de los
simuladores (m2_signos, m2_absolutos, m2_parametros, m2_problema, m2_lhopital). No comparte código con la web.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_mates2_t9.py /tmp/ampl.json
"""
import json, sys
import sympy as sp
from sympy import Rational as Q, symbols, limit, oo, sqrt, sin, cos, tan, exp, log, E, pi, solve, diff

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['mates2']['t9']
EJ = {e['id']: e for e in T['ejercicios']}
x, a, b, c, p, r, h, t = symbols('x a b c p r h t', real=True)
fallos, ok = [], 0

def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

def cks(i):
    k = EJ[i]['check']; return k if isinstance(k, list) else [k]
def nums(i): return [k['valor'] for k in cks(i) if k['tipo'] == 'num']
def lista(i): return [k['valores'] for k in cks(i) if k['tipo'] == 'lista'][0]
def opt(i): k = [k for k in cks(i) if k['tipo'] == 'opcion'][0]; return k['opciones'][k['ok']]
def igual(u, v, tol=2e-3): u, v = float(sp.N(u)), float(sp.N(v)); return abs(u - v) <= tol * max(1, abs(v))
def veri(i, esp): v = nums(i); return len(v) == len(esp) and all(igual(u, w) for u, w in zip(v, esp))
def crit(f, lo=-oo, hi=oo):
    return [s for s in solve(diff(f, x), x) if s.is_real and lo < s < hi]
def inflex(f): return [s for s in solve(diff(f, x, 2), x) if s.is_real]
def cambia(g, s):  # g cambia de signo en s
    e = Q(1, 10**6)
    return sp.sign(sp.N(g.subs(x, s - e), 30)) * sp.sign(sp.N(g.subs(x, s + e), 30)) < 0
def absolutos(f, lo, hi, extra=()):
    cand = [lo, hi] + [s for s in crit(f, lo, hi)] + list(extra)
    v = [f.subs(x, s) for s in cand]
    return max(v), min(v)

# ================================================================= TEORÍA: ejemplos resueltos
# Rolle
f = x**3 - x
comprobar('rolle f(±1)=0', f.subs(x, -1) == 0 == f.subs(x, 1) and sorted(solve(diff(f, x), x)) == [-1/sqrt(3), 1/sqrt(3)] and abs(1/float(sqrt(3)) - 0.577) < 1e-3)
f = x**3 - 6*x**2 + a*x
aa = solve(f.subs(x, 3) - f.subs(x, 0), a)[0]
comprobar('rolle a=9', aa == 9 and f.subs(x, 3).subs(a, aa) == 0)
fp = sp.factor(diff(f.subs(a, 9), x))
comprobar('rolle c=1', sp.expand(fp - 3*(x - 1)*(x - 3)) == 0 and sorted(solve(fp, x)) == [1, 3])
f = x**2 ; g23 = sp.cbrt(x**2)
comprobar("rolle x^(2/3)", g23.subs(x, -1) == 1 == g23.subs(x, 1) and sp.simplify(diff(sp.cbrt(x)**2, x).subs(x, 8) - Q(1, 3)) == 0 and sp.simplify(diff(sp.cbrt(x)**2, x).subs(x, 27) - Q(2, 9)) == 0)
f = x**3 + 3*x - 1
comprobar('rolle raíz única', f.subs(x, 0) == -1 and f.subs(x, 1) == 3 and diff(f, x) == 3*x**2 + 3 and len(sp.Poly(f, x).real_roots()) == 1)
# valor medio
f = sqrt(x)
comprobar('vm √x [1,4] c=9/4', (f.subs(x, 4) - f.subs(x, 1))/3 == Q(1, 3) and solve(diff(f, x) - Q(1, 3), x) == [Q(9, 4)])
f = log(x)
comprobar('vm ln [1,e] c=e−1', solve(diff(f, x) - 1/(E - 1), x) == [E - 1] and 1 < float(E - 1) < float(E) and abs(float(E - 1) - 1.718) < 1e-3)
comprobar('vm |x−1| [0,3]', Q(2 - 1, 3) == Q(1, 3) and abs(0 - 1) == 1)
comprobar('vm ln(1+x)<x', sp.simplify(diff(log(1 + t), t) - 1/(1 + t)) == 0 and all(log(1 + v) < v for v in [Q(1, 10), 1, 5, 100]))
# L'Hôpital
comprobar('lh (e^x−1−x)/x² = 1/2', limit((exp(x) - 1 - x)/x**2, x, 0) == Q(1, 2) and limit((exp(x) - 1)/(2*x), x, 0) == Q(1, 2) and abs(float((exp(Q(1, 100)) - 1 - Q(1, 100))/Q(1, 100)**2) - 0.50167) < 1e-5)
comprobar('lh x ln x → 0', limit(x*log(x), x, 0, '+') == 0 and sp.simplify(diff(log(x), x)/diff(1/x, x) + x) == 0)
comprobar('lh 1/x−1/sen x → 0', limit(1/x - 1/sin(x), x, 0) == 0 and sp.simplify(diff(sin(x) - x, x) - (cos(x) - 1)) == 0 and sp.simplify(diff(x*sin(x), x) - (sin(x) + x*cos(x))) == 0)
comprobar('lh x^x → 1', limit(x**x, x, 0, '+') == 1)
comprobar('lh cos^(1/x²) → e^−1/2', limit(cos(x)**(1/x**2), x, 0) == exp(-Q(1, 2)) and abs(float(exp(-Q(1, 2))) - 0.6065) < 1e-4 and limit(-tan(x)/(2*x), x, 0) == -Q(1, 2))
comprobar('lh trampa (x+sen x)/x', limit((x + sin(x))/x, x, oo) == 1 and diff(x + sin(x), x) == 1 + cos(x))
comprobar('lh (x+1)/(x+2) en 0', limit((x + 1)/(x + 2), x, 0) == Q(1, 2))

# Sec. 5: monotonía
f = x**3 - 3*x**2 - 9*x + 5
fp = diff(f, x)
comprobar('s5 factor f′', sp.expand(fp - 3*(x + 1)*(x - 3)) == 0 and [fp.subs(x, v) for v in (-2, 0, 4)] == [15, -9, 15])
comprobar('s5 extremos cúbico', f.subs(x, -1) == 10 and f.subs(x, 3) == -22 and diff(f, x, 2).subs(x, -1) == -12 and diff(f, x, 2).subs(x, 3) == 12)
f = x*log(x)
comprobar('s5 x ln x', solve(diff(f, x), x) == [exp(-1)] and f.subs(x, exp(-1)) == -exp(-1) and abs(float(exp(-1)) - 0.368) < 1e-3)
comprobar('s5 x^(2/3)', sp.simplify(diff(x**Q(2, 3), x) - 2/(3*sp.cbrt(x))) == 0)
comprobar('s5 tabla derivadas orden par', diff(x**4, x, 4) == 24 and diff(-x**4, x, 4) == -24 and diff(x**3, x, 3) == 6 and diff(x**4, x, 3).subs(x, 0) == 0)
f = x**2/(x - 1)
comprobar('s5 x²/(x−1) extremos', f.subs(x, 0) == 0 and f.subs(x, 2) == 4)
# Sec. 6
f = x**4 - 4*x**3
comprobar('s6 x⁴−4x³ f″', sp.factor(diff(f, x, 2)) == 12*x*(x - 2) and sp.factor(diff(f, x)) == 4*x**2*(x - 3) and f.subs(x, 2) == -16 and f.subs(x, 3) == -27 and diff(f, x, 2).subs(x, 3) == 36)
comprobar('s6 x⁴−4x³ inflexiones', sorted(inflex(f)) == [0, 2] and all(cambia(diff(f, x, 2), s) for s in (0, 2)) and not cambia(diff(f, x), 0))
f = exp(-x**2)
comprobar('s6 gauss', sp.simplify(diff(f, x, 2) - (4*x**2 - 2)*exp(-x**2)) == 0 and sorted(inflex(f)) == [-1/sqrt(2), 1/sqrt(2)] and abs(float(exp(-Q(1, 2))) - 0.607) < 1e-3 and diff(f, x, 2).subs(x, 0) == -2)
comprobar('s6 x⁴ no inflexión', not cambia(diff(x**4, x, 2), 0) and diff(x**4, x, 2).subs(x, 0) == 0)
f = x**3 - 3*x**2 + 2*x
comprobar('s6 tangente inflexión', inflex(f) == [1] and f.subs(x, 1) == 0 and diff(f, x).subs(x, 1) == -1)
# Sec. 7
f = x**3 - 6*x**2 + 9*x + 1
comprobar('s7 cúbico [0,5]', [f.subs(x, v) for v in (0, 1, 3, 5)] == [1, 5, 1, 21] and sp.expand(diff(f, x) - 3*(x - 1)*(x - 3)) == 0 and absolutos(f, 0, 5) == (21, 1))
g = sp.Abs(x**2 - 1)
vals = {v: g.subs(x, v) for v in (-2, -1, 0, 1, 2)}
comprobar('s7 |x²−1|', vals == {-2: 3, -1: 0, 0: 1, 1: 0, 2: 3})
comprobar('s7 |x²−1| angulares', diff(x**2 - 1, x).subs(x, 1) == 2 and diff(1 - x**2, x).subs(x, 1) == -2)
comprobar('s7 trozos', [x**2 for x in (-1, 0, 1)] == [1, 0, 1] and 2 - 3 == -1 and 2 - 1 == 1 and diff(x**2, x).subs(x, 1) == 2 and diff(2 - x, x) == -1)
f = x + 1/x
comprobar('s7 x+1/x mínimo 2', sorted(solve(diff(f, x), x)) == [-1, 1] and f.subs(x, 1) == 2 and diff(f, x, 2).subs(x, 1) == 2 and limit(f, x, 0, '+') == oo and limit(f, x, oo) == oo)
comprobar('s7 1/x en [1,3]', (1/Q(1), 1/Q(3)) == (1, Q(1, 3)))
# Sec. 8
f = x**3 + a*x**2 + b*x + c
sol = solve([diff(f, x, 2).subs(x, -1), diff(f, x).subs(x, 1), f.subs(x, 0) - 2], [a, b, c], dict=True)[0]
fs = f.subs(sol)
comprobar('s8 cúbico a,b,c', sol == {a: 3, b: -9, c: 2} and fs == x**3 + 3*x**2 - 9*x + 2)
comprobar('s8 cúbico verif.', sp.expand(diff(fs, x) - 3*(x + 3)*(x - 1)) == 0 and diff(fs, x, 2).subs(x, 1) == 12 and fs.subs(x, 1) == -3 and fs.subs(x, -1) == 13 and sp.expand(diff(fs, x, 2) - 6*(x + 1)) == 0)
f = a*log(x) + b*x**2 + x
sol = solve([diff(f, x).subs(x, 1), diff(f, x).subs(x, 2)], [a, b], dict=True)[0]
fs = f.subs(sol)
comprobar('s8 a ln x + b x² + x', sol == {a: -Q(2, 3), b: -Q(1, 6)} and diff(fs, x, 2).subs(x, 1) == Q(1, 3) and diff(fs, x, 2).subs(x, 2) == -Q(1, 6))
f = a*x**3 + b*x**2
sol = solve([f.subs(x, 1) - 3, diff(f, x).subs(x, 1) - 5], [a, b], dict=True)[0]
fs = f.subs(sol)
comprobar('s8 tangente pendiente 5', sol == {a: -1, b: 4} and sp.expand(5*(x - 1) + 3) == 5*x - 2 and fs == -x**3 + 4*x**2)
# Sec. 9
S = 2*pi*r**2 + 2000/r
rs = [v for v in solve(diff(S, r), r) if v.is_real][0]
comprobar('s9 lata 1 L', igual(rs, 5.419, 1e-3) and rs**3 == 500/pi and diff(S, r, 2).subs(r, rs) > 0 and igual(1000/(pi*rs**2), 2*rs, 1e-9) and igual(1000/(pi*rs**2), 10.84, 1e-3) and igual(S.subs(r, rs), 553.6, 1e-3))
d2 = x**2 + (x**2 - 3)**2
comprobar('s9 parábola (0,3)', sp.expand(d2) == x**4 - 5*x**2 + 9 and sorted(solve(diff(d2, x), x)) == sorted([0, sqrt(Q(5, 2)), -sqrt(Q(5, 2))]) and diff(d2, x, 2).subs(x, 0) == -10 and igual(diff(d2, x, 2).subs(x, sqrt(Q(5, 2))), 20, 1e-9)
          and d2.subs(x, sqrt(Q(5, 2))) == Q(11, 4) and igual(sqrt(Q(11, 4)), 1.66, 1e-2) and igual(sqrt(Q(5, 2)), 1.581, 1e-3) and d2.subs(x, 0) == 9)
B_ = (p - 20)*(400 - 5*p)
comprobar('s9 beneficio borde', sp.expand(B_) == -5*p**2 + 500*p - 8000 and solve(diff(B_, p), p) == [50] and B_.subs(p, 20) == 0 and B_.subs(p, 40) == 4000 and B_.subs(p, 50) == 4500 and diff(B_, p).subs(p, 30) > 0 and diff(B_, p).subs(p, 40) > 0)
# Sec. 10
f = x**2/(x - 1)
comprobar('s10 estudio completo', sp.simplify(f - (x + 1 + 1/(x - 1))) == 0 and sp.factor(diff(f, x)) == x*(x - 2)/(x - 1)**2 and sp.simplify(diff(f, x, 2) - 2/(x - 1)**3) == 0
          and limit(f, x, 1, '-') == -oo and limit(f, x, 1, '+') == oo and limit(f - (x + 1), x, oo) == 0 and limit(f - (x + 1), x, -oo) == 0
          and diff(f, x, 2).subs(x, 0) == -2 and diff(f, x, 2).subs(x, 2) == 2 and not solve(2/(x - 1)**3, x))
comprobar('s10 signos f′', [diff(f, x).subs(x, v) > 0 for v in (-1, Q(1, 2), Q(3, 2), 3)] == [True, False, False, True])

# ================================================================= SIMULADORES (datos propios)
# m2_signos: extremos e inflexiones citados en las notas
f = x**3 - 3*x**2 - 9*x + 5
comprobar('sig cúbico', sorted(crit(f)) == [-1, 3] and inflex(f) == [1])
f = x*exp(-x)
comprobar('sig x e^−x', crit(f) == [1] and inflex(f) == [2])
f = x**4 - 4*x**3
comprobar('sig x⁴−4x³', sorted(crit(f)) == [0, 3] and not cambia(diff(f, x), 0) and sorted(inflex(f)) == [0, 2])
f = log(x)/x
comprobar('sig ln x/x', crit(f) == [E] and inflex(f) == [exp(Q(3, 2))] and abs(float(E) - 2.718) < 1e-3 and abs(float(exp(Q(3, 2))) - 4.482) < 1e-3)
f = exp(-x**2)
comprobar('sig gauss', crit(f) == [0] and sorted(inflex(f)) == [-1/sqrt(2), 1/sqrt(2)])
f = x**3
comprobar('sig x³', diff(f, x).subs(x, 0) == 0 == diff(f, x, 2).subs(x, 0) and cambia(diff(f, x, 2), 0) and not cambia(diff(f, x), 0))
# m2_absolutos: las funciones en su intervalo por defecto
f = x**3 - 6*x**2 + 9*x + 1
comprobar('abs 1', absolutos(f, 0, 5) == (21, 1))
comprobar('abs 3', absolutos(x/(x**2 + 1), 0, 3) == (Q(1, 2), 0))
comprobar('abs 4', absolutos(x*exp(-x), 0, 3) == (exp(-1), 0) and igual(3*exp(-3), 0.149, 1e-2))
# m2_parametros: soluciones
f = x**3 + a*x**2 + b*x
s = solve([diff(f, x).subs(x, 1), diff(f, x, 2).subs(x, 2)], [a, b], dict=True)[0]
comprobar('par 1', s == {a: -6, b: 9} and diff(f.subs(s), x, 2).subs(x, 1) == -6)
f = a*x**3 + b*x
s = solve([f.subs(x, 1) + 2, diff(f, x).subs(x, 1)], [a, b], dict=True)[0]
comprobar('par 2', s == {a: 1, b: -3} and diff(f.subs(s), x, 2).subs(x, 1) == 6)
f = a*log(x) + b*x**2
s = solve([f.subs(x, 1) - 2, diff(f, x).subs(x, 1)], [a, b], dict=True)[0]
comprobar('par 3', s == {a: -4, b: 2} and diff(f.subs(s), x, 2).subs(x, 1) == 8)
f = (a*x + b)/(x**2 + 1)
s = solve([f.subs(x, 1) - 2, diff(f, x).subs(x, 1)], [a, b], dict=True)[0]
fs = f.subs(s)
comprobar('par 4', s == {a: 4, b: 0} and sorted(crit(fs)) == [-1, 1] and fs.subs(x, 1) == 2 and fs.subs(x, -1) == -2)
# m2_problema
V = x*(24 - 2*x)**2
comprobar('prob caja', sorted(solve(diff(V, x), x)) == [4, 12] and sp.expand(diff(V, x) - 12*(x - 4)*(x - 12)) == 0)
comprobar('prob caja 2', diff(V, x, 2).subs(x, 4) == -96 and V.subs(x, 4) == 1024 and sp.expand(diff(V, x, 2)) == 24*x - 192 and 24 - 8 == 16)
S = 2*pi*r**2 + 1000/r
rs = [v for v in solve(diff(S, r), r) if v.is_real][0]
comprobar('prob lata 500', rs**3 == 250/pi and igual(rs, 4.30, 5e-3) and igual(500/(pi*rs**2), 8.60, 5e-3) and igual(500/(pi*rs**2), 2*rs, 1e-9) and igual(S.subs(r, rs), 348.7, 1e-3) and diff(S, r, 2).subs(r, rs) > 0)
A = x*(600 - 3*x)/2
comprobar('prob cercado', solve(diff(A, x), x) == [100] and A.subs(x, 100) == 15000 and (600 - 300)/2 == 150 and diff(A, x, 2) == -3 and 3*100 + 2*150 == 600)
Bp = (p - 20)*(400 - 5*p)
comprobar('prob beneficio', solve(diff(Bp, p), p) == [50] and Bp.subs(p, 50) == 4500 and 400 - 5*50 == 150 and Bp.subs(p, 20) == 0 == Bp.subs(p, 80))
d2 = (x - 4)**2 + x
comprobar('prob distancia', solve(diff(d2, x), x) == [Q(7, 2)] and d2.subs(x, Q(7, 2)) == Q(15, 4) and d2.subs(x, 0) == 16 and igual(sqrt(Q(15, 4)), 1.94, 1e-2) and igual(sqrt(Q(7, 2)), 1.87, 1e-2))
yv = (6 - 2*x - pi*x)/2
A = 2*x*yv + pi*x**2/2
comprobar('prob ventana', sp.simplify(A - (6*x - (2 + pi/2)*x**2)) == 0 and solve(diff(A, x), x) == [6/(4 + pi)] and igual(6/(4 + pi), 0.840, 1e-3) and sp.simplify(A.subs(x, 6/(4 + pi)) - 18/(4 + pi)) == 0
          and igual(18/(4 + pi), 2.52, 1e-3) and igual(6/(2 + pi), 1.167, 1e-3) and sp.simplify(yv.subs(x, 6/(4 + pi)) - 6/(4 + pi)) == 0)
# m2_lhopital: límites
comprobar('lh1', limit(sin(x)/x, x, 0) == 1 and limit((exp(x) - 1 - x)/x**2, x, 0) == Q(1, 2) and limit(log(x)/x**2, x, oo) == 0 and limit(x**2/exp(x), x, oo) == 0 and limit((tan(x) - x)/x**3, x, 0) == Q(1, 3))
comprobar('lh2 derivadas', sp.simplify(diff(tan(x) - x, x) - (1/cos(x)**2 - 1)) == 0 and sp.simplify(diff(1/cos(x)**2 - 1, x) - 2*sin(x)/cos(x)**3) == 0)

# ================================================================= EJERCICIOS
f = x**2 - 4*x + 3
comprobar('e01', veri('e01', [2]) and crit(f) == [2] and diff(f, x, 2) == 2)
f = x**3 - 12*x
comprobar('e02', sorted(lista('e02')) == sorted(crit(f)))
comprobar('e03', veri('e03', [16]) and f.subs(x, -2) == 16 and diff(f, x, 2).subs(x, -2) < 0)
f = x**3 - 3*x**2
comprobar('e04', veri('e04', [1]) and inflex(f) == [1] and f.subs(x, 1) == -2)
f = x**4 - 2*x**2
mins = [s for s in crit(f) if diff(f, x, 2).subs(x, s) > 0]
comprobar('e05', sorted(lista('e05')) == sorted(mins) and 0 not in mins and diff(f, x, 2).subs(x, 0) < 0)
comprobar('e06', opt('e06') == 'Un máximo relativo')
f = 2*x**3 - 6*x + 1
comprobar('e07', veri('e07', list(absolutos(f, 0, 2))) and absolutos(f, 0, 2) == (5, -3))
f = x**2 - 6*x + 8
comprobar('e08', veri('e08', [3]) and f.subs(x, 2) == 0 == f.subs(x, 4) and solve(diff(f, x), x) == [3])
comprobar('e09', veri('e09', [2/sqrt(3)]) and [s for s in solve(3*x**2 - 4, x) if 0 < s < 2] == [2/sqrt(3)])
comprobar('e10', veri('e10', [2]) and limit((x**2 - 1)/log(x), x, 1) == 2)
P = x*(30 - x)
comprobar('e11', veri('e11', [15, 225]) and solve(diff(P, x), x) == [15] and P.subs(x, 15) == 225)
Ar = x*(18 - x)
comprobar('e12', veri('e12', [81]) and solve(diff(Ar, x), x) == [9] and Ar.subs(x, 9) == 81)
f = x - log(x)
comprobar('e13', veri('e13', [1, 1]) and solve(diff(f, x), x) == [1] and f.subs(x, 1) == 1 and diff(f, x, 2).subs(x, 1) > 0)
comprobar('e14', opt('e14') == 'Convexa (∪)' and diff(exp(x), x, 2) == exp(x))
f = x**3 - 6*x**2 + 9*x + 2
comprobar('e15', veri('e15', [f.subs(x, 1), f.subs(x, 3)]) and (f.subs(x, 1), f.subs(x, 3)) == (6, 2) and diff(f, x, 2).subs(x, 1) < 0 < diff(f, x, 2).subs(x, 3))
f = x/(x**2 + 1)
comprobar('e16', veri('e16', [1, Q(1, 2)]) and sorted(crit(f)) == [-1, 1] and f.subs(x, 1) == Q(1, 2) and diff(f, x, 2).subs(x, 1) < 0)
f = x**2*exp(-x)
comprobar('e17', veri('e17', [4*exp(-2)]) and sorted(crit(f)) == [0, 2] and diff(f, x, 2).subs(x, 2) < 0 and f.subs(x, 2) == 4*exp(-2) and diff(f, x, 2).subs(x, 0) > 0)
f = x**4 - 8*x**2 + 3
comprobar('e18', all(igual(u, w) for u, w in zip(sorted(lista('e18')), sorted(inflex(f)))) and len(lista('e18')) == len(inflex(f)) == 2)
f = x**3 - 3*x**2 + 2
comprobar('e19', veri('e19', [2, -2]) and absolutos(f, -1, 3) == (2, -2) and [f.subs(x, v) for v in (-1, 0, 2, 3)] == [-2, 2, -2, 2])
f = log(x)/x
comprobar('e20', veri('e20', [1/E, 0]) and absolutos(f, 1, E**2) == (1/E, 0) and igual(f.subs(x, E**2), 0.271, 1e-2))
f = x**3 + a*x + b
s = solve([diff(f, x).subs(x, 2), f.subs(x, 2) + 5], [a, b], dict=True)[0]
comprobar('e21', veri('e21', [s[a], s[b]]) and s == {a: -12, b: 11} and diff(f, x, 2).subs(x, 2) == 12)
f = a*x**2 + b*x + c
s = solve([f.subs(x, 0) - 1, f.subs(x, 1), diff(f, x).subs(x, 1)], [a, b, c], dict=True)[0]
comprobar('e22', veri('e22', [s[a], s[b], s[c]]) and s == {a: 1, b: -2, c: 1})
Ar = 2*x*(12 - x**2)
comprobar('e23', veri('e23', [2, 32]) and sorted(solve(diff(Ar, x), x)) == [-2, 2] and Ar.subs(x, 2) == 32 and diff(Ar, x, 2).subs(x, 2) < 0)
Pm = 2*x + 1800/x
comprobar('e24', veri('e24', [30, 120]) and [s for s in solve(diff(Pm, x), x) if s > 0] == [30] and Pm.subs(x, 30) == 120)
S = 2*pi*r**2 + 660/r
rs = [v for v in solve(diff(S, r), r) if v.is_real][0]
comprobar('e25', veri('e25', [rs, S.subs(r, rs)]) and rs**3 == 165/pi and igual(330/(pi*rs**2), 2*rs, 1e-9) and igual(2*rs, 7.49, 5e-3))
d2 = x**2 + (2*x + 3)**2
xs = solve(diff(d2, x), x)[0]
comprobar('e26', veri('e26', [xs, sqrt(d2.subs(x, xs))]) and xs == -Q(6, 5) and d2.subs(x, xs) == Q(9, 5) and sp.simplify(sqrt(Q(9, 5)) - 3/sqrt(5)) == 0)
f = x**2 + a*x + 3
s = solve(f.subs(x, 1) - f.subs(x, 5), a)[0]
comprobar('e27', veri('e27', [s, solve(diff(f.subs(a, s), x), x)[0]]) and s == -6 and solve(diff(f.subs(a, s), x), x) == [3])
comprobar('e28', veri('e28', [Q(1, 6)]) and limit((x - sin(x))/x**3, x, 0) == Q(1, 6))
comprobar('e29', veri('e29', [2]) and limit((exp(2*x) - 1 - 2*x)/x**2, x, 0) == 2)
comprobar('e30', veri('e30', [Q(1, 2)]) and limit(1/x - 1/(exp(x) - 1), x, 0) == Q(1, 2))
f = x**2/(x - 1)
comprobar('e31', veri('e31', [0, 4]) and f.subs(x, 0) == 0 and f.subs(x, 2) == 4 and sorted(crit(f)) == [0, 2])
f = exp(x)/x
comprobar('e32', veri('e32', [1, E]) and crit(f) == [1] and f.subs(x, 1) == E and diff(f, x, 2).subs(x, 1) > 0)
f = x**2*exp(-x)
comprobar('e33', sp.simplify(diff(f, x, 2) - (x**2 - 4*x + 2)*exp(-x)) == 0 and all(igual(u, w) for u, w in zip(sorted(lista('e33')), sorted(inflex(f)))) and sorted(inflex(f)) == sorted([2 + sqrt(2), 2 - sqrt(2)]))
f = x + 4/x
comprobar('e34', veri('e34', [2, 4]) and [s for s in solve(diff(f, x), x) if s > 0] == [2] and f.subs(x, 2) == 4 and limit(f, x, 0, '+') == oo)
f = x + 2*cos(x)
ma, mi = absolutos(f, 0, pi)
comprobar('e35', veri('e35', [ma, mi]) and igual(ma, pi/6 + sqrt(3), 1e-9) and igual(mi, 5*pi/6 - sqrt(3), 1e-9) and igual(f.subs(x, 0), 2) and igual(f.subs(x, pi), pi - 2))
cands = [0, 5, 2, 4]
fa = lambda v: abs(v**2 - 4*v)
comprobar('e36', veri('e36', [5, 0]) and max(fa(v) for v in cands) == 5 and min(fa(v) for v in cands) == 0 and [fa(v) for v in cands] == [0, 5, 4, 0])
f = x**3 + a*x**2 + b*x + c
s = solve([diff(f, x).subs(x, -1), diff(f, x).subs(x, 3), f.subs(x, 0) - 5], [a, b, c], dict=True)[0]
fs = f.subs(s)
comprobar('e37', veri('e37', [s[a], s[b], s[c]]) and s == {a: -3, b: -9, c: 5} and diff(fs, x, 2).subs(x, -1) < 0 < diff(fs, x, 2).subs(x, 3))
f = a*exp(x) + b*x
s = solve([f.subs(x, 0) - 1, diff(f, x).subs(x, log(2))], [a, b], dict=True)[0]
fs = f.subs(s)
comprobar('e38', veri('e38', [s[a], s[b]]) and s == {a: 1, b: -2} and diff(fs, x, 2).subs(x, log(2)) > 0 and igual(fs.subs(x, log(2)), 0.614, 1e-3))
A2 = x**2*(100 - x**2)/4
xs = [s for s in solve(diff(A2, x), x) if s > 0][0]
comprobar('e39', veri('e39', [25]) and xs**2 == 50 and A2.subs(x, xs) == 625 and sqrt(A2.subs(x, xs)) == 25)
V = pi*(9*h - h**3/4)
hs = [s for s in solve(diff(V, h), h) if s > 0][0]
comprobar('e40', veri('e40', [hs, V.subs(h, hs)]) and hs == 2*sqrt(3) and sp.simplify(V.subs(h, hs) - 12*sqrt(3)*pi) == 0 and 9 - hs**2/4 == 6 and diff(V, h, 2).subs(h, hs) < 0)
Tt = sqrt(9 + x**2)/3 + (6 - x)/5
comprobar('e41', veri('e41', [Q(9, 4), 2]) and diff(Tt, x).subs(x, Q(9, 4)) == 0 and Tt.subs(x, Q(9, 4)) == 2 and Tt.subs(x, 0) == Q(11, 5) and igual(Tt.subs(x, 6), 2.236, 1e-3) and diff(Tt, x, 2).subs(x, Q(9, 4)) > 0)
q = 1000 - 10*p
Bn = p*q - (2000 + 20*q)
comprobar('e42', veri('e42', [60, 14000]) and sp.expand(Bn) == -10*p**2 + 1200*p - 22000 and solve(diff(Bn, p), p) == [60] and Bn.subs(p, 60) == 14000)
f = x**3 + 3*x - 1
comprobar('e43', opt('e43') == 'Exactamente una' and len(sp.Poly(f, x).real_roots()) == 1 and f.subs(x, 0) < 0 < f.subs(x, 1))
f = x**2*log(x)
xs = [s for s in solve(diff(f, x), x) if s.is_real and s > 0][0]
comprobar('e44', veri('e44', [xs, f.subs(x, xs)]) and sp.simplify(xs - exp(-Q(1, 2))) == 0 and sp.simplify(f.subs(x, xs) + 1/(2*E)) == 0 and diff(f, x, 2).subs(x, xs) > 0)

niv = {1: 0, 2: 0, 3: 0}
for e in T['ejercicios']: niv[e['nivel']] += 1
comprobar('nº ejercicios', len(EJ) == len(T['ejercicios']) == 44 and niv == {1: 14, 2: 16, 3: 14}, str(niv))
print(f'{ok} comprobaciones correctas, {len(fallos)} fallos' if not fallos else '\n'.join(fallos) + f'\n{ok} comprobaciones correctas, {len(fallos)} fallos')
