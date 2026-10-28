#!/usr/bin/env python3
"""
Verificación independiente (sympy) del tema 7 de Matemáticas II (Límites de funciones y continuidad):
recalcula desde el enunciado cada cifra de los ejemplos resueltos, de los 44 ejercicios y de los datos de los
simuladores. No comparte código con la web.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_mates2_t7.py /tmp/ampl.json
"""
import json, sys
import sympy as sp
from sympy import Rational as Q, symbols, limit, oo, sqrt, sin, cos, tan, exp, log, E, solve, Eq

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['mates2']['t7']
EJ = {e['id']: e for e in T['ejercicios']}
x, a, b, k = symbols('x a b k', real=True)
fallos, ok = [], 0

def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

def cks(i):
    c = EJ[i]['check']; return c if isinstance(c, list) else [c]
def nums(i): return [c['valor'] for c in cks(i) if c['tipo'] == 'num']
def lista(i): return [c['valores'] for c in cks(i) if c['tipo'] == 'lista'][0]
def opt(i): c = [c for c in cks(i) if c['tipo'] == 'opcion'][0]; return c['opciones'][c['ok']]
def igual(p, q, tol=1e-9): p, q = float(sp.N(p)), float(sp.N(q)); return abs(p - q) <= tol * max(1, abs(q))
def lim(f, p, d='+-'): return limit(f, x, p, d)
def veri(i, esp):
    v = nums(i); return len(v) == len(esp) and all(igual(p, q) for p, q in zip(v, esp))

# ---------------------------------------------------------------- TEORÍA: ejemplos resueltos
comprobar('s1 √(x²+3x)−x → 3/2', lim(sqrt(x**2 + 3*x) - x, oo) == Q(3, 2))
comprobar('s1 −∞: √(x²+3x)+x → −3/2', lim(sqrt(x**2 + 3*x) + x, -oo) == -Q(3, 2))
comprobar('s1 x=−1000 ≈ −1,5011', abs(float(sqrt(10**6 - 3000) - 1000) + 1.5011) < 1e-4)
comprobar('s1 dos raíces → 1', lim(sqrt(x**2 + x) - sqrt(x**2 - x), oo) == 1)
comprobar('s1 fracciones → 1/2', lim(1/(x - 1) - 2/(x**2 - 1), 1) == Q(1, 2) and sp.simplify((x + 1 - 2)/(x**2 - 1) - 1/(x + 1)) == 0)
f2 = (x**2 - x - 2)/(x**2 - 4)
comprobar('s2 factor numerador', sp.factor(x**2 - x - 2) == (x - 2)*(x + 1))
comprobar('s2 lím en 2 = 3/4', lim(f2, 2) == Q(3, 4))
comprobar('s2 en −2: laterales', lim(f2, -2, '-') == oo and lim(f2, -2, '+') == -oo)
comprobar('s2 num en −2 = 4', (x**2 - x - 2).subs(x, -2) == 4)
f3 = x/(x**2 - 4)
comprobar('s3 laterales ±2', lim(f3, 2, '+') == oo and lim(f3, 2, '-') == -oo and lim(f3, -2, '+') == oo and lim(f3, -2, '-') == -oo)
f4 = (2*x + 1)/sqrt(x**2 + 3)
comprobar('s4 ±2', lim(f4, oo) == 2 and lim(f4, -oo) == -2)
comprobar('s4 f(±1000)', abs(float(f4.subs(x, 1000)) - 2.0010) < 6e-4 and abs(float(f4.subs(x, -1000)) + 1.9990) < 6e-4)
f4b = (3*exp(x) + 1)/(exp(x) + 2)
comprobar('s4 exp: 3 y 1/2', lim(f4b, oo) == 3 and lim(f4b, -oo) == Q(1, 2))
f5 = (2*x**2 + 3*x - 1)/(x - 1)
q, r = sp.div(2*x**2 + 3*x - 1, x - 1, x)
comprobar('s5 división 2x+5 resto 4', q == 2*x + 5 and r == 4)
comprobar('s5 m,n', lim(f5/x, oo) == 2 and lim(f5 - 2*x, oo) == 5 and lim(f5/x, -oo) == 2 and lim(f5 - 2*x, -oo) == 5)
f5b = sqrt(x**2 + x)
comprobar('s5 √(x²+x) +∞', lim(f5b/x, oo) == 1 and lim(f5b - x, oo) == Q(1, 2))
comprobar('s5 √(x²+x) −∞', lim(f5b/x, -oo) == -1 and lim(f5b + x, -oo) == -Q(1, 2))
comprobar('s7 ∞/∞ (a) 3/2', lim((3*x**2 - 5*x + 1)/(2*x**2 + x), oo) == Q(3, 2))
comprobar('s7 ∞/∞ (b) 2/3', lim((2*3**x + 5)/(3**(x + 1) - 1), oo) == Q(2, 3))
comprobar('s7 0/0 (a) 4/3', lim((x**2 - 4)/(x**2 - x - 2), 2) == Q(4, 3))
comprobar('s7 0/0 (b) 1/6', lim((sqrt(x + 9) - 3)/x, 0) == Q(1, 6))
comprobar('s7 0/0 (c) 2', lim((1 - cos(2*x))/x**2, 0) == 2)
comprobar('s7 0·∞ (a) 2', lim(x*sin(2/x), oo) == 2)
comprobar('s7 0·∞ (b) 1/2', lim((x - 1)/(x**2 - 1), 1) == Q(1, 2))
comprobar('s7 1^∞ (a) e²', lim((1 + 2/x)**x, oo) == E**2 and abs(float(E**2) - 7.389) < 1e-3)
comprobar('s7 1^∞ (b) e⁸', lim(((x + 3)/(x - 1))**(2*x), oo) == E**8 and sp.simplify((x + 3)/(x - 1) - 1 - 4/(x - 1)) == 0 and abs(float(E**8) - 2981.0) < 0.1)
comprobar('s7 1^∞ (c) e³', lim((1 + 3*x)**(1/x), 0, '+') == E**3 and abs(float(E**3) - 20.09) < 0.01)
comprobar('s7 1^∞ (d) e^−1/2', lim(cos(x)**(1/x**2), 0) == exp(-Q(1, 2)) and abs(float(exp(-Q(1, 2))) - 0.6065) < 1e-4)
comprobar('s7 notables', lim(sin(x)/x, 0) == 1 and lim((1 - cos(x))/x**2, 0) == Q(1, 2) and lim(tan(x)/x, 0) == 1 and lim((exp(x) - 1)/x, 0) == 1 and lim(log(1 + x)/x, 0) == 1)
comprobar('s7 k/0', lim((x + 1)/(x - 2), 2, '+') == oo and lim((x + 1)/(x - 2), 2, '-') == -oo and lim((x + 1)/(x - 2)**2, 2) == oo)
NE = [((1 + 1/x)**x, oo, 1), ((1 + 3/x)**(2*x), oo, 6), (((x + 3)/(x - 1))**(2*x), oo, 8), (((x**2 + 1)/(x**2 - 1))**(x**2), oo, 2),
      (((x - 1)/(x + 2))**x, oo, -3), ((1 + 3*x)**(1/x), 0, 3), (cos(x)**(1/x**2), 0, -Q(1, 2))]
for n, (fn, p, L) in enumerate(NE):
    comprobar(f'widget e preset {n}', lim(fn, p, '+') == exp(L))
comprobar('widget e −3 ≈ 0,0498', abs(float(exp(-3)) - 0.0498) < 5e-5)
comprobar('s8 |x−2|/(x−2)', lim(sp.Abs(x - 2)/(x - 2), 2, '+') == 1 and lim(sp.Abs(x - 2)/(x - 2), 2, '-') == -1)
comprobar('s8 e^(1/x)', lim(exp(1/x), 0, '+') == oo and lim(exp(1/x), 0, '-') == 0)
comprobar('s8 trozos evitable', (x**2 + 1).subs(x, 1) == 2 and (3*x - 1).subs(x, 1) == 2)
comprobar('s8 trozos continuidad en 0 y horizontales', exp(0) == 1 and ((2*x + 1)/(x + 1)).subs(x, 0) == 1 and lim((2*x + 1)/(x + 1), oo) == 2 and lim(exp(x), -oo) == 0)
comprobar('s9 ej1 a=1', solve(Eq(6 - a, 2**2 + 1), a) == [1])
A, Bp = symbols('A Bp')
comprobar('s9 ej2', lim((x**2 - 4)/(x - 2), 2, '-') == 4 and (x**2 - 7).subs(x, 4) == 9 and solve([2*A + Bp - 4, 4*A + Bp - 9], [A, Bp]) == {A: Q(5, 2), Bp: -1})
comprobar('s9 ej3', lim((1 - cos(x))/x**2, 0, '-') == Q(1, 2) and lim(sin(2*x)/(b*x), 0, '+') == 2/b and solve(Eq(2/b, Q(1, 2)), b) == [4])
comprobar('emp 0: a=1', solve(2*a + 1 - (2**2 - 1), a) == [1])
comprobar('emp 1: a=1/2,b=3/2', solve([-A + Bp - (-1 + 2), A + Bp - (3 - 1)], [A, Bp]) == {A: Q(1, 2), Bp: Q(3, 2)})
comprobar('emp 2: a=6,b=5', lim(sin(a*x)/x, 0, '-') == a and solve(a - 6, a) == [6] and solve(b + 1 - 6, b) == [5])
comprobar('emp 3: k=1/4', lim((sqrt(x + 1) - 2)/(x - 3), 3) == Q(1, 4) and sp.simplify((sqrt(x + 1) - 2)/(x - 3) - 1/(sqrt(x + 1) + 2)) == 0)
comprobar('s10 cos x − x', cos(0) - 0 == 1 and cos(1) - 1 < 0 and abs(float(cos(1)) - 0.5403) < 1e-4 and abs(float(cos(1) - 1) + 0.4597) < 1e-4)
comprobar('s10 e^x + x − 3', (exp(0) + 0 - 3) == -2 and float(E - 2) > 0 and abs(float(E - 2) - 0.718) < 1e-3)
g10 = lambda t: t**3 - 6*t**2 + 9*t - 2
comprobar('s10 3 raíces', [g10(0), g10(1), g10(3), g10(4)] == [-2, 2, -2, 2] and len(sp.Poly(g10(x), x).real_roots()) == 3)
comprobar('s10 bisección', (1.5**3 + 1.5 - 3) == 1.875 and abs((1.25**3 + 1.25 - 3) - 0.203125) < 1e-9 and abs((1.125**3 + 1.125 - 3) + 0.4511) < 1e-3 and (1**3 + 1 - 3, 2**3 + 2 - 3) == (-1, 7))
comprobar('s10 x³+x=5', (1 + 1 - 5, 8 + 2 - 5) == (-3, 5))
h11 = x**2 - 4*x + 1
comprobar('s11 parábola [0,3]', solve(sp.diff(h11, x), x) == [2] and (h11.subs(x, 0), h11.subs(x, 3), h11.subs(x, 2)) == (1, -2, -3))
comprobar('s11 x²+1 en [0,2]', (1, 5) == (0**2 + 1, 2**2 + 1) and solve(x**2 + 1 - 3, x) == [-sqrt(2), sqrt(2)])
f12 = (2*x**2 + 3*x - 1)/(x - 1)
comprobar('s12 laterales en 1', lim(f12, 1, '+') == oo and lim(f12, 1, '-') == -oo and (2 + 3 - 1) == 4)
comprobar('s12 sin horizontal', lim(f12, oo) == oo and lim(f12, -oo) == -oo)
comprobar('s12 cortes', f12.subs(x, 0) == 1 and sorted(solve(2*x**2 + 3*x - 1, x), key=float) == sorted([(-3 - sqrt(17))/4, (-3 + sqrt(17))/4], key=float)
          and abs(float((-3 + sqrt(17))/4) - 0.281) < 1e-3 and abs(float((-3 - sqrt(17))/4) + 1.781) < 1e-3)
comprobar('quiz 5/2', lim((5*x**2 - 3)/(2*x**2 + x), oo) == Q(5, 2))
comprobar('quiz √(x²+1)−x → 0', lim(sqrt(x**2 + 1) - x, oo) == 0)
comprobar('quiz sen4x/2x', lim(sin(4*x)/(2*x), 0) == 2)
comprobar('quiz (1+1/x)^3x', lim((1 + 1/x)**(3*x), oo) == E**3)
comprobar('quiz (x²−9)/(x−3)', lim((x**2 - 9)/(x - 3), 3) == 6)
comprobar('quiz oblicua 3x+6', sp.div(3*x**2 + 1, x - 2, x) == (3*x + 6, 13))
comprobar('quiz 1/x', lim(1/x, 0, '-') == -oo)
comprobar('quiz k', solve(1 + k - 3, k) == [2])
comprobar('quiz e^x/x^5', lim(exp(x)/x**5, oo) == oo)
comprobar('empar', lim((3*x**2 + 1)/(x**2 - 5), oo) == 3 and lim(sin(5*x)/x, 0) == 5 and lim((x**4 + 1)/exp(x), oo) == 0 and lim(1/(x - 2), 2, '-') == -oo)
comprobar('clas', lim((x**2 - 3*x + 2)/(x**2 - 1), 1) == -Q(1, 2) and lim((sqrt(x) - 2)/(x - 4), 4) == Q(1, 4) and lim((2*x**3 - x)/(x**3 + 5), oo) == 2
          and lim((3**x + 1)/(3**(x + 1) - 2), oo) == Q(1, 3) and lim(((x + 1)/(x - 1))**x, oo) == E**2 and lim((1 + 2*x)**(1/x), 0, '+') == E**2)
comprobar('err (x+1)−x, 2x−x, x−(x+3)', lim((x + 1) - x, oo) == 1 and lim(2*x - x, oo) == oo and lim(x - (x + 3), oo) == -3)
comprobar('err √(x²+3x)/x en −∞', lim(sqrt(x**2 + 3*x)/x, -oo) == -1 and lim(sin(3*x)/x, 0) == 3)
comprobar('err f(x)=x+k,3,5−x', 5 - 1 == 4 and solve(1 + k - 3, k) == [2] and 4 != 3)
comprobar('err horiz 2 sin oblicua', lim((2*x**2 + 1)/(x**2 - 1)/x, oo) == 0 and lim((2*x**2 + 1)/(x**2 - 1), oo) == 2)

# ---------------------------------------------------------------- EJERCICIOS
comprobar('e01', veri('e01', [lim((4*x**3 - 2*x)/(x**3 + 7), oo)]))
comprobar('e02', veri('e02', [lim((x**2 - 4)/(x - 2), 2)]))
comprobar('e03', veri('e03', [lim((x**2 - 9)/(x**2 - x - 6), 3)]) and sp.factor(x**2 - x - 6) == (x - 3)*(x + 2))
comprobar('e04', veri('e04', [lim((2*x + 1)/sqrt(x**2 + 3), oo), lim((2*x + 1)/sqrt(x**2 + 3), -oo)]))
comprobar('e05', veri('e05', [lim((2*x**3 - x)/(5*x**3 + 4*x**2), oo)]))
comprobar('e06', opt('e06') == '+∞' and lim(2/(x - 1)**2, 1) == oo)
comprobar('e07', veri('e07', [lim((sqrt(x + 4) - 2)/x, 0)]))
comprobar('e08', veri('e08', [lim((3*x - 1)/(x + 2), oo)]) and lim((3*x - 1)/(x + 2), -oo) == 3)
comprobar('e09', sorted(lista('e09')) == [-3, 3] and sp.solve(x**2 - 9, x) == [-3, 3] and (3 + 1, -3 + 1) == (4, -2))
comprobar('e10', veri('e10', [lim((x**2 - 1)/(x - 1), 1)]))
comprobar('e11', veri('e11', [lim(sin(5*x)/(2*x), 0)]))
comprobar('e12', veri('e12', [lim((1 - cos(x))/(3*x**2), 0)]))
comprobar('e13', veri('e13', [lim(x - sqrt(x**2 - 4*x), oo)]))
comprobar('e14', veri('e14', [lim((1 + 4/x)**x, oo)]) and abs(float(E**4) - 54.598) < 1e-3)
comprobar('e15', veri('e15', [lim(sqrt(x**2 + 5*x) - x, oo)]))
comprobar('e16', veri('e16', [lim(((x + 1)/(x - 2))**x, oo)]) and abs(float(E**3) - 20.086) < 1e-3)
comprobar('e17', veri('e17', [lim((1 + 2*x)**(3/x), 0, '+')]) and abs(float(E**6) - 403.43) < 1e-2)
comprobar('e18', veri('e18', [lim(x*sin(3/x), oo)]))
comprobar('e19', veri('e19', [lim(1/(x - 2) - 4/(x**2 - 4), 2)]))
comprobar('e20', veri('e20', [lim((sqrt(1 + x) - sqrt(1 - x))/x, 0)]))
comprobar('e21', veri('e21', [lim((x**3 - 8)/(x**2 - 4), 2)]) and sp.factor(x**3 - 8) == (x - 2)*(x**2 + 2*x + 4))
comprobar('e22', veri('e22', [lim(tan(3*x)/(2*x), 0)]))
comprobar('e23', veri('e23', [lim((4**(x + 1) + 2**x)/(2*4**x - 1), oo)]))
q, r = sp.div(3*x**2 - x + 2, x + 1, x)
comprobar('e24', veri('e24', [3, -4]) and q == 3*x - 4 and r == 6 and lim((3*x**2 - x + 2)/(x + 1)/x, oo) == 3 and lim((3*x**2 - x + 2)/(x + 1) - 3*x, oo) == -4)
f25 = (x**2 - 2*x)/(x**2 - 1)
comprobar('e25', veri('e25', [lim(f25, oo)]) and sorted(lista('e25')) == [-1, 1] and (1 - 2, 1 + 2) == (-1, 3))
f26 = (x**2 + x - 6)/(x**2 - 9)
comprobar('e26', veri('e26', [lim(f26, -3)]) and opt('e26') == 'Salto infinito' and lim(f26, 3, '+') == oo and lim(f26, 3, '-') == -oo)
comprobar('e27', veri('e27', [solve(1 + a - 4, a)[0]]))
comprobar('e28', veri('e28', [lim((sqrt(2*x + 1) - 3)/(x - 4), 4)]))
cu = lambda t: t**3 - 3*t + 1
comprobar('e29', [cu(n) for n in range(-2, 3)] == [-1, 3, 1, -1, 3] and sorted(lista('e29')) == [-2, 0, 1] and len(sp.Poly(cu(x), x).real_roots()) == 3)
c30 = lambda t: t**3 - 2*t - 5
comprobar('e30', veri('e30', [c30(Q(5, 2))]) and (c30(2), c30(3)) == (-1, 16) and opt('e30') == '[2; 2,5]')
s31 = solve([-A + Bp - 1, A + Bp - 2], [A, Bp]); comprobar('e31', veri('e31', [s31[A], s31[Bp]]))
comprobar('e32', veri('e32', [6, 5]) and lim(sin(a*x)/x, 0) == a and solve(b + 1 - 6, b) == [5])
comprobar('e33', veri('e33', [lim(cos(2*x)**(1/x**2), 0)]) and abs(float(exp(-2)) - 0.1353) < 1e-4)
comprobar('e34', veri('e34', [lim(sqrt(x**2 + 3*x) - sqrt(x**2 - x), oo)]))
comprobar('e35', veri('e35', [lim(((x**2 + 1)/(x**2 - 1))**(x**2), oo)]) and abs(float(E**2) - 7.389) < 1e-3)
f36 = (2*x**3 - x**2 + 1)/(x**2 + x)
comprobar('e36', sorted(lista('e36')) == [-1, 0] and veri('e36', [lim(f36/x, oo), lim(f36 - 2*x, oo)]) and
          ((2*x**3 - x**2 + 1).subs(x, 0), (2*x**3 - x**2 + 1).subs(x, -1)) == (1, -2) and lim(f36/x, -oo) == 2 and lim(f36 - 2*x, -oo) == -3)
comprobar('e37', opt('e37').startswith('f no es continua') and (1/(0 - 1), 1/(2 - 1)) == (-1, 1))
comprobar('e38', (0*1 - 1, float(E) - 1 > 0) == (-1, True) and abs(float(E) - 1 - 1.718) < 1e-3)
comprobar('e39', opt('e39') == 'Salto infinito' and lim(exp(1/x), 0, '+') == oo and lim(exp(1/x), 0, '-') == 0)
f40 = (x**2 - 4*x)/sp.Abs(x - 4)
comprobar('e40', veri('e40', [abs(lim(f40, 4, '+') - lim(f40, 4, '-'))]) and lim(f40, 4, '+') == 4 and lim(f40, 4, '-') == -4)
a41 = solve(1 + a + 2, a)[0]
comprobar('e41', veri('e41', [a41, lim((x**2 + a41*x + 2)/(x - 1), 1)]) and sp.factor(x**2 - 3*x + 2) == (x - 1)*(x - 2))
a42 = symbols('a42', positive=True)
comprobar('e42', veri('e42', [6]) and lim(sqrt(x**2 + 6*x + 1) - x, oo) == 3 and lim(sqrt(x**2 + a42*x + 1) - x, oo) == a42/2)
comprobar('e43', veri('e43', [2, 3]) and lim((2*x**2 + 3*x + 1)/(x - 1)/x, oo) == 2 and lim((2*x**2 + 3*x + 1)/(x - 1) - 2*x, oo) == 5
          and sp.div(2*x**2 + 3*x + 1, x - 1, x)[0] == 2*x + 5)
d44 = x**3 - 3*x
vals = {t: d44.subs(x, t) for t in [0, 1, 2]}
comprobar('e44', veri('e44', [max(vals.values()), min(vals.values())]) and solve(sp.diff(d44, x), x) == [-1, 1] and vals == {0: 0, 1: -2, 2: 2})

niv = {1: 0, 2: 0, 3: 0}
for e in T['ejercicios']: niv[e['nivel']] += 1
comprobar('nº ejercicios', len(EJ) == len(T['ejercicios']) == 44 and niv == {1: 14, 2: 16, 3: 14}, str(niv))
print(f'{ok} comprobaciones correctas, {len(fallos)} fallos' if not fallos else '\n'.join(fallos) + f'\n{ok} comprobaciones correctas, {len(fallos)} fallos')
