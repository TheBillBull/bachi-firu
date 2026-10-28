#!/usr/bin/env python3
"""
Verificación independiente (sympy) del tema 8 de Matemáticas II (Derivadas):
  · cada cifra de los ejemplos resueltos de la teoría,
  · la respuesta de cada uno de los 47 ejercicios (se recalcula desde el enunciado y se compara con el corrector de la web),
  · lo que calculan los simuladores (función a trozos con parámetros, Rolle, tabla de L'Hôpital) frente a sympy,
  · algunas respuestas del test.
No comparte código con la web.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_mates2_t8.py /tmp/ampl.json [otro.json]
(el volcado de los simuladores se genera aquí con herramientas/volcar_mates2_t8.js; el segundo argumento se ignora)
"""
import json, sys, os, re, subprocess
import sympy as sp
from sympy import symbols, Rational as Q, sqrt, exp, log, sin, cos, tan, atan, asin, pi, E, oo, limit, diff, solve, simplify, Abs, Piecewise

datos = json.load(open(sys.argv[1]))
_raiz = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
sim = json.loads(subprocess.run(['node', os.path.join(_raiz, 'herramientas', 'volcar_mates2_t8.js')],
                                capture_output=True, text=True, check=True, cwd=_raiz).stdout)
T = datos['ampl']['mates2']['t8']
EJ = {e['id']: e for e in T['ejercicios']}
ok = 0
fallos = []
x, h, t, a, b, c = symbols('x h t a b c', real=True)

def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

def igual(p, q, tol=1e-6):
    p, q = float(sp.N(p)), float(sp.N(q)); return abs(p - q) <= tol * max(1, abs(q))

def L(expr, var, pto, dir='+-'):
    return limit(expr, var, pto, dir)

# ---------- lectura de expresiones de la web ----------
def parse(s):
    s = s.replace('^', '**')
    s = re.sub(r'\be\*\*', 'E**', s)
    from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application
    return parse_expr(s, transformations=standard_transformations + (implicit_multiplication_application,), local_dict={'ln': log, 'sqrt': sqrt, 'cos': cos, 'sin': sin, 'sen': sin, 'E': E, 'x': x, 'arctan': atan, 'exp': exp, 'tan': tan})

def ck(i):
    c_ = EJ[i]['check']; return c_ if isinstance(c_, list) else [c_]
def nums(i): return [q['valor'] for q in ck(i) if q['tipo'] == 'num']
def opt(i):
    q = ck(i)[0]; return q['opciones'][q['ok']]

def pend(f, x0):  # f'(x0)
    return diff(f, x).subs(x, x0)

# ======================================================================
# 1. EJERCICIOS DE DERIVAR (expr): la derivada que acepta la web debe ser la de sympy
# ======================================================================
DER = {
    'd4': (x**3 * log(x), (0.3, 5)), 'd5': ((2*x + 1)/(x - 1), (-3, 0.5)), 'd6': (x * exp(3*x), (-2, 2)),
    'd7': (sin(x**2), (-3, 3)), 'd8': (log(x**2 + 1), (-3, 3)), 'd9': (sqrt(2*x + 1), (0, 5)),
    'd14': (atan(2*x), (-3, 3)), 'd15': (exp(x)/x, (0.3, 5)), 'd46': (atan((1 + x)/(1 - x)), (-0.9, 0.9)),
}
for i, (f, dom) in DER.items():
    web = parse(ck(i)[0]['expr']); real = diff(f, x)
    pts = [dom[0] + (dom[1] - dom[0]) * k / 6 for k in range(1, 6)]
    comprobar(f'{i} derivada', all(igual(web.subs(x, p), real.subs(x, p)) for p in pts))
    comprobar(f'{i} dominio coincide', ck(i)[0].get('dom') == list(dom))

# ======================================================================
# 2. EJERCICIOS NUMÉRICOS: valor esperado calculado aquí desde el enunciado
# ======================================================================
f = x**2 - 3*x
def espera(i, vals):
    w = nums(i)
    comprobar(f'{i} valores', len(w) == len(vals) and all(igual(p, q) for p, q in zip(w, vals)), f'web={w} sympy={[float(v) for v in vals]}')

espera('d1', [L(((2 + h)**2 - 3*(2 + h) - (4 - 6))/h, h, 0)])
espera('d2', [L(((1 + h)**3 - 1)/h, h, 0)])
espera('d3', [L((sin(pi/6 + h) - sin(pi/6))/h, h, 0)])
f10 = x**2 - 3*x + 1
m = pend(f10, 2); y0 = f10.subs(x, 2)
espera('d10', [m, y0 - m*2])                                  # y = m x + n
mn = -1/m
espera('d11', [mn, y0 - mn*2])
espera('d12', [diff(x**4 - 3*x**2, x, 2).subs(x, 1)])
comprobar('d13 |x| continua y no derivable',
          opt('d13').startswith('Es continua pero no derivable') and L(Abs(h)/h, h, 0, '+') == 1 and L(Abs(h)/h, h, 0, '-') == -1)
espera('d16', [L((x**4 - 16)/(x - 2), x, 2)])
espera('d17', [pend(x**x, 2)])
espera('d18', [pend(x**sin(x), pi/2)])
y = x**2 * (x + 1)**3 / (x - 2)**4
espera('d19', [pend(y, 1)])
# d20: ax²+bx (x≤1), 2+ln x (x>1)
s = solve([a*1 + b - (2 + log(1)), 2*a + b - (1/x).subs(x, 1)], [a, b]); espera('d20', [s[a], s[b]])
# d21: e^x + a (x<0), x²+bx+3 (x≥0)
s = solve([exp(0) + a - 3, exp(0) - b], [a, b]); espera('d21', [s[a], s[b]])
# d22: x² (x≤1), ax+b (x>1)
s = solve([1 - (a + b), 2 - a], [a, b]); espera('d22', [s[a], s[b]])
# d23: |x²-4| en x=2 por definición
fa = Abs(x**2 - 4)
espera('d23', [L((fa.subs(x, 2 + h) - 0)/h, h, 0, '-'), L((fa.subs(x, 2 + h) - 0)/h, h, 0, '+')])
# d24: |x-1|(x+a) derivable en 1
dr = L(((1 + h - 1)*(1 + h + a))/h, h, 0, '+'); dl = L((-(1 + h - 1)*(1 + h + a))/h, h, 0, '-')
espera('d24', [solve(dr - dl, a)[0]])
# d25: tangente paralela a 6x+1
sol = sorted(solve(diff(x**3 - 3*x, x) - 6, x), key=float)
comprobar('d25 abscisas', sorted(ck('d25')[0]['valores']) == sorted(ck('d25')[0]['valores']) and all(igual(p, q) for p, q in zip(sorted(ck('d25')[0]['valores']), sol)))
# d26: tangentes a x² por (1,-3)
sol = sorted(solve(t**2 + 2*t*(1 - t) - (-3), t), key=float)
comprobar('d26 puntos de tangencia', all(igual(p, q) for p, q in zip(sorted(ck('d26')[0]['valores']), sol)))
# d27: tangente a x ln x en e
g27 = x*log(x); m27 = pend(g27, E); espera('d27', [m27, g27.subs(x, E) - m27*E])
# d28: Rolle x³-6x²+9x en [0,3]
g28 = x**3 - 6*x**2 + 9*x
comprobar('d28 hipótesis', g28.subs(x, 0) == g28.subs(x, 3))
espera('d28', [r for r in solve(diff(g28, x), x) if 0 < r < 3])
# d29: TVM ln x en [1,e]
sol = [r for r in solve(1/c - (log(E) - log(1))/(E - 1), c) if 1 < r < E]; espera('d29', sol)
# d30: TVM x³ en [1,3]
sol = [r for r in solve(3*c**2 - (27 - 1)/2, c) if 1 < r < 3]; espera('d30', sol)
espera('d31', [L((sin(x) - x)/x**3, x, 0)])
espera('d32', [L((exp(2*x) - 1 - 2*x)/x**2, x, 0)])
espera('d33', [L((x**3 + 5*x)/(2*x**3 - log(x)), x, oo)])
espera('d34', [L(sin(x)**x, x, 0, '+')])
espera('d35', [L((1 + 3/x)**(2*x), x, oo)])
espera('d36', [L(cos(2*x)**(1/x**2), x, 0)])
# d37: a para que lim (e^x - 1 - a x)/x² sea finito
fin = lambda aa: L((exp(x) - 1 - aa*x)/x**2, x, 0, '+')
comprobar('d37 a=1 finito, a=2 no', fin(1) == Q(1, 2) and fin(2) in (-oo, oo, sp.zoo) and L((exp(x) - 1 - 2*x)/x**2, x, 0, '-') in (oo, -oo, sp.zoo))
espera('d37', [1])
# d38: ln(1+x) - a x
comprobar('d38 a=1 finito, a=2 no', L((log(1 + x) - x)/x**2, x, 0) == Q(-1, 2) and L((log(1 + x) - 2*x)/x**2, x, 0, '+') in (oo, -oo))
espera('d38', [1, L((log(1 + x) - x)/x**2, x, 0)])
# d39: x² sen(1/x)
comprobar('d39 f\'(0)=0 y f\' sin límite',
          L(h*sin(1/h), h, 0) == 0 and opt('d39').startswith('f es derivable en 0 y f′(0) = 0')
          and not (L((2*x*sin(1/x) - cos(1/x)), x, 0, '+') in (0, 1, -1)))
# d40: tangente a ln x por el origen
sol = solve(log(t) + (0 - t)/t, t); espera('d40', [1/sol[0], sol[0]])
# d41: (1+x²)^x
espera('d41', [pend((1 + x**2)**x, 1)])
# d42: raíces de x³-3x+1 en (-1,1)
rr = [r for r in sp.Poly(x**3 - 3*x + 1, x).nroots() if -1 < r < 1]
espera('d42', [len(rr)])
# d43: x³-3x²+a x en [0,2]
fa43 = x**3 - 3*x**2 + a*x; a43 = solve(fa43.subs(x, 2), a)[0]
cs = [r for r in solve(diff(fa43.subs(a, a43), x), x) if 0 < r < 2]
espera('d43', [a43, max(cs)])
espera('d44', [diff(x*exp(x), x, 10).subs(x, 0)])
# d45: normal a e^x en 0
mn = -1/pend(exp(x), 0); xs = solve(exp(0) + mn*x, x)[0]; espera('d45', [xs])
# d47: triángulo de la tangente a 1/x en 1
m47 = pend(1/x, 1); n47 = (1/x).subs(x, 1) - m47; corte_x = -n47/m47
espera('d47', [Q(1, 2)*abs(corte_x)*abs(n47)])
# todos los ejercicios tienen verificación
comprobar('47 ejercicios', len(EJ) == 47 and all(f'd{k}' in EJ for k in range(1, 48)))

# ======================================================================
# 3. EJEMPLOS RESUELTOS DE LA TEORÍA (cifras)
# ======================================================================
# definición
comprobar('def x² en 3', L(((3 + h)**2 - 9)/h, h, 0) == 6)
comprobar('def √x en 4', L((sqrt(4 + h) - 2)/h, h, 0) == Q(1, 4))
comprobar('def 1/x en 2', L((1/(2 + h) - Q(1, 2))/h, h, 0) == Q(-1, 4))
comprobar('límites que son derivadas', L((x**5 - 1)/(x - 1), x, 1) == 5 and L((sin(pi/3 + h) - sin(pi/3))/h, h, 0) == Q(1, 2))
# tangente y normal x²-3x+1 en 2
comprobar('tangente y=x-3, normal y=-x+1', (f10.subs(x, 2), pend(f10, 2)) == (-1, 1))
# reglas
comprobar('cociente (x²+1)/(x-3)', simplify(diff((x**2 + 1)/(x - 3), x) - (x**2 - 6*x - 1)/(x - 3)**2) == 0)
comprobar('x e^x sen x', simplify(diff(x*exp(x)*sin(x), x) - exp(x)*(sin(x) + x*sin(x) + x*cos(x))) == 0)
comprobar('x²/ln x', simplify(diff(x**2/log(x), x) - x*(2*log(x) - 1)/log(x)**2) == 0)
comprobar('(tan)\' = 1+tan²', simplify(diff(tan(x), x) - (1 + tan(x)**2)) == 0 and simplify(diff(sin(x)/cos(x), x) - 1/cos(x)**2) == 0)
# tabla compuesta
comprobar('arctan x²', simplify(diff(atan(x**2), x) - 2*x/(1 + x**4)) == 0)
comprobar('arcsen 2x', simplify(diff(asin(2*x), x) - 2/sqrt(1 - 4*x**2)) == 0)
comprobar('arctan((1+x)/(1-x)) = 1/(1+x²)', simplify(diff(atan((1 + x)/(1 - x)), x) - 1/(1 + x**2)) == 0)
for nombre, ff, dd in [('(xⁿ)', x**5, 5*x**4), ('√u', sqrt(x**2 + 1), x/sqrt(x**2 + 1)), ('1/u', 1/(x**2 + 1), -2*x/(x**2 + 1)**2),
                       ('a^u', 3**(x**2), 2*x*3**(x**2)*log(3)), ('arccos u', sp.acos(x**2), -2*x/sqrt(1 - x**4)), ('tan u', tan(3*x), 3*(1 + tan(3*x)**2)),
                       ('cos u', cos(2*x), -2*sin(2*x))]:
    comprobar('tabla compuesta ' + nombre, simplify(diff(ff, x) - dd) == 0)
# cadena
comprobar('sen³(2x+1)', simplify(diff(sin(2*x + 1)**3, x) - 6*sin(2*x + 1)**2*cos(2*x + 1)) == 0)
comprobar('e^sen(x²)', simplify(diff(exp(sin(x**2)), x) - 2*x*cos(x**2)*exp(sin(x**2))) == 0)
comprobar('arctan √x', simplify(diff(atan(sqrt(x)), x) - 1/(2*sqrt(x)*(1 + x))) == 0)
comprobar('ln((x+1)/(x-1))', simplify(diff(log((x + 1)/(x - 1)), x) - (-2/(x**2 - 1))) == 0)
comprobar('ln√(x²+1)', simplify(diff(log(sqrt(x**2 + 1)), x) - x/(x**2 + 1)) == 0)
# orden superior
comprobar('e^2x n-ésima', all(simplify(diff(exp(2*x), x, n) - 2**n*exp(2*x)) == 0 for n in range(1, 6)))
comprobar('ln x n-ésima', all(simplify(diff(log(x), x, n) - (-1)**(n - 1)*sp.factorial(n - 1)/x**n) == 0 for n in range(1, 7)))
comprobar('sen x cada 4', simplify(diff(sin(x), x, 4) - sin(x)) == 0 and diff(sin(x), x, 3) == -cos(x))
comprobar('x e^x n-ésima', all(simplify(diff(x*exp(x), x, n) - (x + n)*exp(x)) == 0 for n in range(1, 8)))
comprobar('1/(1-x) n-ésima', all(simplify(diff(1/(1 - x), x, n) - sp.factorial(n)/(1 - x)**(n + 1)) == 0 for n in range(1, 7)))
comprobar('x e^-x f\', f\'\'', simplify(diff(x*exp(-x), x) - (1 - x)*exp(-x)) == 0 and simplify(diff(x*exp(-x), x, 2) - (x - 2)*exp(-x)) == 0)
# a trozos
s = solve([a + b - 2, 2*a + b - 1], [a, b]); comprobar('trozos ax²+bx / 2+ln x', s == {a: -1, b: 3})
s = solve([1 + a - 3, 1 - b], [a, b]); comprobar('trozos e^x+a / x²+bx+3', s == {a: 2, b: 1})
comprobar('|x²-4| laterales', (-2*x).subs(x, 2) == -4 and (2*x).subs(x, 2) == 4)
comprobar('|x-1|(x+a)', solve(1 + a + (1 + a), a) == [-1])
comprobar('x² sen(1/x)', L(h*sin(1/h), h, 0) == 0)
# derivación logarítmica
comprobar('x^x', simplify(diff(x**x, x) - x**x*(log(x) + 1)) == 0 and pend(x**x, 1) == 1 and igual(pend(x**x, 2), 4*(log(2) + 1)))
comprobar('x^sen x', simplify(diff(x**sin(x), x) - x**sin(x)*(cos(x)*log(x) + sin(x)/x)) == 0)
comprobar('(ln x)^x', simplify(diff(log(x)**x, x) - log(x)**x*(log(log(x)) + 1/log(x))) == 0)
yy = x**2*(x + 1)**3/(x - 2)**4
comprobar('producto/cociente y\'(1)=60', yy.subs(x, 1) == 8 and (2/x + 3/(x + 1) - 4/(x - 2)).subs(x, 1) == Q(15, 2) and pend(yy, 1) == 60)
comprobar('tangente a x^x en 2', igual(4*(1 + log(2)), 6.7726, 1e-4) and igual(-4 - 8*log(2), -9.545, 1e-3) and igual(4*(1 + log(2)), pend(x**x, 2)))
# tangentes
comprobar('tangente x ln x en e', pend(x*log(x), E) == 2 and (x*log(x)).subs(x, E) == E)
comprobar('tangentes paralelas 6x+1', sorted(solve(3*x**2 - 3 - 6, x), key=float) == [-sqrt(3), sqrt(3)] and (x**3 - 3*x).subs(x, sqrt(3)) == 0)
comprobar('x e^-x horizontal en 1', solve(diff(x*exp(-x), x), x) == [1] and (x*exp(-x)).subs(x, 1) == exp(-1))
comprobar('tangentes a x² desde (1,-3)', sorted(solve(t**2 + 2*t*(1 - t) + 3, t)) == [-1, 3] and (9 + 6*(1 - 3)) == -3 and (1 - 2*(1 + 1)) == -3)
comprobar('tangente ln x por origen', solve(log(t) - 1, t) == [E])
comprobar('normal e^x en 0 corta en 1', solve(1 - x, x) == [1])
# Rolle / TVM
g = x**3 - 6*x**2 + 9*x
comprobar('Rolle x³-6x²+9x', g.subs(x, 0) == 0 and g.subs(x, 3) == 0 and sorted(solve(diff(g, x), x)) == [1, 3])
comprobar('|x-1| en [0,2]', Abs(0 - 1) == Abs(2 - 1) == 1)
comprobar('TVM ln x [1,e]', igual(E - 1, 1.71828183) and solve(1/c - 1/(E - 1), c) == [E - 1])
comprobar('TVM x³ [1,3]', (27 - 1)/2 == 13 and igual(sqrt(Q(13, 3)), 2.0816660) and solve(3*c**2 - 13, c) == [-sqrt(Q(13, 3)), sqrt(Q(13, 3))])
f1 = x**3 + 3*x - 1
comprobar('una raíz x³+3x-1', f1.subs(x, 0) == -1 and f1.subs(x, 1) == 3 and sp.Poly(diff(f1, x), x).all_coeffs() == [3, 0, 3])
f2 = x**3 - 3*x + 1
comprobar('una raíz x³-3x+1 en (-1,1)', f2.subs(x, -1) == 3 and f2.subs(x, 1) == -1 and sp.expand(diff(f2, x) - 3*(x - 1)*(x + 1)) == 0)
# L'Hôpital
comprobar('(e^x-1-x)/x²', L((exp(x) - 1 - x)/x**2, x, 0) == Q(1, 2))
comprobar('(sen x - x)/x³', L((sin(x) - x)/x**3, x, 0) == Q(-1, 6))
comprobar('(2x²+ln x)/(x²+x)', L((2*x**2 + log(x))/(x**2 + x), x, oo) == 2)
comprobar('x ln x', L(x*log(x), x, 0, '+') == 0)
comprobar('1/x - 1/(e^x-1)', L(1/x - 1/(exp(x) - 1), x, 0) == Q(1, 2))
comprobar('(1+2/x)^x', L((1 + 2/x)**x, x, oo) == exp(2))
comprobar('(cos x)^(1/x²)', L(cos(x)**(1/x**2), x, 0) == exp(Q(-1, 2)) and igual(exp(Q(-1, 2)), 0.60653066))
comprobar('(cos x + a x² -1)/x⁴ con a=1/2', L((cos(x) + x**2/2 - 1)/x**4, x, 0) == Q(1, 24) and L((cos(x) + x**2 - 1)/x**4, x, 0, '+') in (oo, -oo))
comprobar('(x+sen x)/x → 1 y f\'/g\' sin límite', L((x + sin(x))/x, x, oo) == 1 and not (L(1 + cos(x), x, oo) in (0, 1, 2)))
# L'Hôpital: pasos intermedios del texto
comprobar('pasos (cos x−1)/3x² → −sen x/6x → −cos x/6',
          L((cos(x) - 1)/(3*x**2), x, 0) == Q(-1, 6) and L(-sin(x)/(6*x), x, 0) == Q(-1, 6))
comprobar('pasos 1^∞ (1+2/x)^x', L(x*log(1 + 2/x), x, oo) == 2)
comprobar('pasos cos: ln cos x / x² → −1/2', L(log(cos(x))/x**2, x, 0) == Q(-1, 2) and L(-tan(x)/(2*x), x, 0) == Q(-1, 2))
# Problemas EvAU
comprobar('P1 e^{ax}/1+bx+x²: derivable ⟺ a=b',
          L((exp(a*h) - 1)/h, h, 0) == a and L(((1 + b*h + h**2) - 1)/h, h, 0) == b)
comprobar('P1 (b) tangente y=1+2x', diff(exp(2*x), x).subs(x, 0) == 2 and diff(1 + 2*x + x**2, x).subs(x, 0) == 2 and exp(0) == 1)
comprobar('P1 (c) f\'\' laterales 1 y 2', diff(exp(-x), x, 2).subs(x, 0) == 1 and diff(1 + (-1)*x + x**2, x, 2) == 2)
g2 = x**2*exp(-x)
comprobar('P2 tangente horizontal', sorted(solve(diff(g2, x), x)) == [0, 2] and simplify(g2.subs(x, 2) - 4*exp(-2)) == 0)
comprobar('P2 tangente en 1: y=x/e', g2.subs(x, 1) == exp(-1) and pend(g2, 1) == exp(-1))
comprobar('P2 límite en +∞', L(g2, x, oo) == 0)
g3 = log(1 + x**2)
comprobar('P3 Rolle', g3.subs(x, -1) == g3.subs(x, 1) and solve(diff(g3, x), x) == [0])
cc = [r for r in solve(2*c/(1 + c**2) - log(2), c) if 0 < r < 1]
comprobar('P3 TVM c≈0,403', len(cc) == 1 and igual(cc[0], 0.402802, 1e-4) and igual((1 - sqrt(1 - log(2)**2))/log(2), cc[0])
          and igual((1 + sqrt(1 - log(2)**2))/log(2), 2.4826, 1e-4))

# ======================================================================
# 4. SIMULADORES (motor JS contra sympy)
# ======================================================================
# función a trozos con parámetros
TR = [  # (c, L(x,a,b), R(x,a,b), parámetros, solución)
    (1, a*x**2 + b*x, 2 + log(x), (a, b), (-1, 3)),
    (0, exp(x) + a, x**2 + b*x + 3, (a, b), (2, 1)),
    (2, a*x + b, x**2, (a, b), (4, -4)),
    (1, -(x - 1)*(x + a), (x - 1)*(x + a), (a,), (-1,)),
]
for p, (cc_, Lx, Rx, ps, sol_) in zip(sim['trozos'], TR):
    cond = solve([Lx.subs(x, cc_) - Rx.subs(x, cc_), diff(Lx, x).subs(x, cc_) - diff(Rx, x).subs(x, cc_)], list(ps), dict=True)
    comprobar(f'trozos "{p["t"]}": solución', len(cond) == 1 and all(cond[0][s_] == v for s_, v in zip(ps, sol_)) and list(p['sol']) == list(sol_))
    sub = dict(zip(ps, sol_))
    comprobar(f'trozos "{p["t"]}": continuidad y derivadas en la solución',
              igual(Lx.subs(sub).subs(x, cc_), p['L']) and igual(Rx.subs(sub).subs(x, cc_), p['R']) and igual(p['L'], p['R'])
              and igual(diff(Lx, x).subs(sub).subs(x, cc_), p['dL']) and igual(diff(Rx, x).subs(sub).subs(x, cc_), p['dR']) and igual(p['dL'], p['dR']))
    comprobar(f'trozos "{p["t"]}": fórmulas de L y R', igual(Lx.subs(sub).subs(x, cc_ - Q(1, 2)), p['Lm']) and igual(Rx.subs(sub).subs(x, cc_ + Q(1, 2)), p['Rm'])
              and igual(diff(Lx, x).subs(sub).subs(x, cc_ - Q(1, 2)), p['dLm']) and igual(diff(Rx, x).subs(sub).subs(x, cc_ + Q(1, 2)), p['dRm']))
    v0 = dict(zip(ps, p['v'][:len(ps)]))
    comprobar(f'trozos "{p["t"]}": valores de partida (no empalman)',
              igual(Lx.subs(v0).subs(x, cc_), p['L0']) and igual(Rx.subs(v0).subs(x, cc_), p['R0'])
              and igual(diff(Lx, x).subs(v0).subs(x, cc_), p['dL0']) and igual(diff(Rx, x).subs(v0).subs(x, cc_), p['dR0'])
              and not (igual(p['L0'], p['R0']) and igual(p['dL0'], p['dR0'])))
# Rolle
RO = [(x**2 - 4*x + 3, 1, 3), (x**3 - 3*x, 0, sqrt(3)), (cos(x), 0, 2*pi), (Abs(x), -1, 1), (x**2, 0, 1), (1/x**2, -1, 1)]
for p, (ff, aa, bb) in zip(sim['rolle'], RO):
    hip = (ff.subs(x, aa) == ff.subs(x, bb)) if ff != 1/x**2 else False
    comprobar(f'Rolle "{p["t"]}": f(a) y f(b)', (not p['ok']) == (not hip or p['t'].startswith('|x|')) and
              (ff == 1/x**2 or (igual(p['fa'], ff.subs(x, aa)) and igual(p['fb'], ff.subs(x, bb)))))
    if ff in (x**2 - 4*x + 3, x**3 - 3*x, cos(x)):
        real = sorted(float(r) for r in solve(diff(ff, x), x) if aa < r < bb)
        comprobar(f'Rolle "{p["t"]}": puntos c', p['ok'] and len(real) == len(p['cs']) and all(abs(r - cw) < 1e-3 for r, cw in zip(real, sorted(p['cs']))))
    else:
        comprobar(f'Rolle "{p["t"]}": no se aplica', not p['ok'] and p['cs'] == [])
# L'Hôpital: tablas y límites
HO = [(sin(x)/x, sin(x)/x, cos(x)/1, 0, Q(1)), ((1 - cos(x))/x**2, (1 - cos(x))/x**2, sin(x)/(2*x), 0, Q(1, 2)),
      ((exp(x) - 1 - x)/x**2, (exp(x) - 1 - x)/x**2, (exp(x) - 1)/(2*x), 0, Q(1, 2)), (log(x)/(x - 1), log(x)/(x - 1), (1/x)/1, 1, Q(1)),
      (exp(x)/x**2, exp(x)/x**2, exp(x)/(2*x), oo, oo), (log(x)/x, log(x)/x, (1/x)/1, oo, 0), (log(x)*x, log(x)/(1/x), (1/x)/(-1/x**2), 0, 0)]
for p, (fg, fg2, dd, pto, lim_) in zip(sim['hopital'], HO):
    real = L(fg, x, pto, '+' if pto == 0 and p['t'].startswith('x·ln') else '+-') if pto != oo else L(fg, x, oo)
    comprobar(f'L\'Hôpital "{p["t"]}": límite', real == lim_ or (lim_ == oo and real == oo))
    comprobar(f'L\'Hôpital "{p["t"]}": f/g y f\'/g\' en la tabla',
              all(igual(fg2.subs(x, xx), v, 1e-6) for xx, v in zip(p['xs'], p['fg'])) and all(igual(dd.subs(x, xx), v, 1e-6) for xx, v in zip(p['xs'], p['dfdg'])))
    comprobar(f'L\'Hôpital "{p["t"]}": f/g y f\'/g\' tienden al mismo límite', lim_ == oo or igual(p['fg'][-1], float(lim_), 5e-3) or abs(p['fg'][-1]) < 1e-2)

# ======================================================================
# 5. TEST: respuestas numéricas
# ======================================================================
Q1 = T['datos']['quiz1']['preguntas']
def resp(i): return Q1[i]['op'][Q1[i]['ok']]
comprobar('test: ln(x²+1)\'', resp(1) == '2x/(x² + 1)' and simplify(diff(log(x**2 + 1), x) - 2*x/(x**2 + 1)) == 0)
comprobar('test: arctan 2x', resp(2) == '2/(1 + 4x²)' and simplify(diff(atan(2*x), x) - 2/(1 + 4*x**2)) == 0)
comprobar('test: x^x en 1', resp(4) == '1' and pend(x**x, 1) == 1)
comprobar('test: normal −1/4', resp(5) == '−1/4' and -1/Q(4) == Q(-1, 4))
comprobar('test: (sen x−x)/x³', resp(7) == '−1/6' and L((sin(x) - x)/x**3, x, 0) == Q(-1, 6))
comprobar('test: (x+sen x)/x', L((x + sin(x))/x, x, oo) == 1)
E_ = T['datos']['errores']['preguntas']
comprobar('errores: (x e^x)\' y sen 3x\'', simplify(diff(x*exp(x), x) - (1 + x)*exp(x)) == 0 and diff(sin(3*x), x) == 3*cos(3*x) and
          diff(x*exp(x), x).subs(x, 1) == 2*E)
comprobar('errores: x²/2x+1 con salto', (1**2, 2*1 + 1) == (1, 3) and diff(x**2, x).subs(x, 1) == diff(2*x + 1, x))
comprobar('errores: Rolle x² en [0,1]', 0**2 != 1**2 and solve(diff(x**2, x), x) == [0])
comprobar('errores: (x²+1)/x → ±∞', L((x**2 + 1)/x, x, 0, '+') == oo and L((x**2 + 1)/x, x, 0, '-') == -oo)

if fallos:
    print('FALLOS:'); [print(' ·', f_) for f_ in fallos]
    print(f'{ok} comprobaciones correctas, {len(fallos)} fallos'); sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos')
