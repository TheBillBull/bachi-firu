#!/usr/bin/env python3
"""
Verificación independiente (sympy) de todo lo calculable que hay en
ampliaciones/mates1.js. No comparte código con la web: parsea las
expresiones por su cuenta y recalcula cada resultado desde cero.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_mates1.py /tmp/ampl.json
"""
import json, re, sys
import sympy as sp
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application, convert_xor

x = sp.symbols('x')
TR = standard_transformations + (implicit_multiplication_application, convert_xor)

def P(s):
    """Texto de alumno -> expresión sympy (e^x, sen, ln, √…)."""
    s = s.replace('sen', 'sin').replace('ln', 'log').replace('√', 'sqrt')
    s = re.sub(r'(?<![A-Za-z])e(?![A-Za-z])', 'E', s)
    return parse_expr(s, local_dict={'x': x, 'E': sp.E, 'log': sp.log, 'sin': sp.sin, 'cos': sp.cos, 'sqrt': sp.sqrt}, transformations=TR)

def igual(a, b):
    d = sp.simplify(a - b)
    if d == 0: return True
    # respaldo numérico por si simplify no llega
    return all(abs(complex((a - b).subs(x, v).evalf())) < 1e-9 for v in (0.37, 1.13, 2.41, 0.71))

fallos, ok = [], 0
def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

datos = json.load(open(sys.argv[1]))

# ---------- 1. Entrenador de derivadas: d/dx f == e ----------
for niv, nivel in datos['banco'].items():
    for it in nivel['items']:
        comprobar(f"entrenador {niv}: {it['f']}", igual(sp.diff(P(it['f']), x), P(it['e'])), f"esperado {sp.diff(P(it['f']), x)} / escrito {it['e']}")

# ---------- 2. Ejercicios nuevos del tema 11 ----------
EJ = {e['id']: e for e in datos['ampl']['mates1']['t11']['ejercicios']}
def exp_de(id_, k=0):
    c = EJ[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[k]

f_d2 = 5*x**3 - 4*x**2 + 7*x - 9
comprobar('d1 TVM', (lambda f: (f.subs(x,4)-f.subs(x,1))/3)(x**2-2*x+3) == exp_de('d1')['valor'])
comprobar('d2', igual(sp.diff(f_d2, x), P(exp_de('d2')['expr'])))
comprobar('d3', igual(sp.diff(4*sp.sqrt(x), x), P(exp_de('d3')['expr'])))
comprobar('d4', sp.diff(x**3 - x, x).subs(x, 2) == exp_de('d4')['valor'])
comprobar('d5', igual(sp.diff((2*x-1)*sp.exp(x), x), P(exp_de('d5')['expr'])))
comprobar('d6', igual(sp.diff((x**2+1)/(x-3), x), P(exp_de('d6')['expr'])))
comprobar('d7', igual(sp.diff(sp.sin(x**2+1), x), P(exp_de('d7')['expr'])))
f8 = x**3 - 3*x**2 + 2
m8 = sp.diff(f8, x).subs(x, 3); tang8 = f8.subs(x, 3) + m8*(x-3)
comprobar('d8 pendiente', m8 == exp_de('d8', 0)['valor'])
comprobar('d8 tangente', igual(tang8, P(exp_de('d8', 1)['expr'])), f'real {sp.expand(tang8)}')
comprobar('d9', sorted(sp.solve(sp.diff(x**3-12*x+5, x), x)) == sorted(exp_de('d9')['valores']))
# d10: f'(x)>0 <=> x>3
comprobar('d10', sp.solve_univariate_inequality(sp.diff(x**2-6*x+5, x) > 0, x, relational=False) == sp.Interval.open(3, sp.oo) and exp_de('d10')['opciones'][exp_de('d10')['ok']] == '(3, +∞)')
a, b = sp.symbols('a b')
sol11 = sp.solve([3+2*a+b, 12+4*a+b], [a, b])
comprobar('d11', sol11[a] == sp.Rational(-9, 2) and sol11[b] == 6 and float(sol11[a]) == exp_de('d11', 0)['valor'] and exp_de('d11', 1)['valor'] == 6)
comprobar('d12', sorted(sp.solve(sp.diff(x**3-3*x, x) - 9, x)) == sorted(exp_de('d12')['valores']))
S = x**2 + (12-x)**2; x13 = sp.solve(sp.diff(S, x), x)[0]
comprobar('d13', x13 == exp_de('d13', 0)['valor'] and S.subs(x, x13) == exp_de('d13', 1)['valor'] and sp.diff(S, x, 2) > 0)
A = x*(120-2*x); x14 = sp.solve(sp.diff(A, x), x)[0]
comprobar('d14', (x14, 120-2*x14, A.subs(x, x14)) == tuple(exp_de('d14', k)['valor'] for k in range(3)) and sp.diff(A, x, 2) < 0)
f15 = x/(x**2+1); crit15 = sorted(sp.solve(sp.diff(f15, x), x))
comprobar('d15 críticos', crit15 == sorted(exp_de('d15', 0)['valores']))
comprobar('d15 tipo', sp.diff(f15, x, 2).subs(x, 1) < 0 and exp_de('d15', 1)['opciones'][exp_de('d15', 1)['ok']] == 'máximo relativo')

# ---------- 3. Ejemplos de la teoría (los que llevan cifras) ----------
h = sp.symbols('h')
comprobar('teoría: x² en 3', sp.limit(((3+h)**2-9)/h, h, 0) == 6)
comprobar('teoría: 1/x en 2', sp.limit((1/(2+h)-sp.Rational(1,2))/h, h, 0) == sp.Rational(-1, 4))
comprobar('teoría: TVM s=5t²', (5*4**2 - 5*2**2)/(4-2) == 30)
comprobar('teoría: producto', igual(sp.diff((x**2+1)*(3*x-2), x), 9*x**2-4*x+3))
comprobar('teoría: cociente', igual(sp.diff((x**2+1)/(x-1), x), (x**2-2*x-1)/(x-1)**2))
comprobar('teoría: 5/x³+4√x', igual(sp.diff(5/x**3 + 4*sp.sqrt(x), x), -15/x**4 + 2/sp.sqrt(x)))
comprobar('teoría: simplificar (x⁴−3x²)/x²', igual(sp.diff(sp.simplify((x**4-3*x**2)/x**2), x), 2*x))
comprobar('teoría: sen(3x²)', igual(sp.diff(sp.sin(3*x**2), x), 6*x*sp.cos(3*x**2)))
comprobar('teoría: e^(x²−x)', igual(sp.diff(sp.exp(x**2-x), x), (2*x-1)*sp.exp(x**2-x)))
comprobar('teoría: ln(x²+1)', igual(sp.diff(sp.log(x**2+1), x), 2*x/(x**2+1)))
comprobar('teoría: √(3x+1)', igual(sp.diff(sp.sqrt(3*x+1), x), 3/(2*sp.sqrt(3*x+1))))
comprobar('teoría: x·e^-x', igual(sp.diff(x*sp.exp(-x), x), (1-x)*sp.exp(-x)))
t1 = x**2; comprobar('teoría: tangente x² en 1', igual(t1.subs(x,1)+sp.diff(t1,x).subs(x,1)*(x-1), 2*x-1) and igual(1 + sp.Rational(-1,2)*(x-1), -x/2 + sp.Rational(3,2)))
f = x**3-2*x; comprobar('teoría: tangente x³−2x en 1', igual(f.subs(x,1)+sp.diff(f,x).subs(x,1)*(x-1), x-2))
f = x**2-4*x; x0 = sp.solve(sp.diff(f,x)-2, x)[0]; comprobar('teoría: tangente paralela', x0 == 3 and igual(f.subs(x,x0)+2*(x-x0), 2*x-9))
f = x**3-3*x; comprobar('teoría: extremos x³−3x', sp.solve(sp.diff(f,x), x) == [-1, 1] and f.subs(x,-1) == 2 and f.subs(x,1) == -2)
A = x*(20-x); comprobar('teoría: A=x(20−x)', sp.solve(sp.diff(A,x),x) == [10] and A.subs(x,10) == 100)
S = x + 36/x; comprobar('teoría: x+36/x', [s for s in sp.solve(sp.diff(S,x),x) if s > 0] == [6] and S.subs(x,6) == 12)
# widgets de optimización
V = x*(30-2*x)**2; comprobar('widget caja', sp.solve(sp.diff(V,x),x) == [5, 15] and V.subs(x,5) == 2000)
L = 2*x + 200/x; comprobar('widget corral', [s for s in sp.solve(sp.diff(L,x),x) if s > 0] == [10] and L.subs(x,10) == 40 and 200/10 == 20)
A = x*(10-x); comprobar('widget rectángulo', sp.solve(sp.diff(A,x),x) == [5] and A.subs(x,5) == 25)
# clase: TVM de x² en 1 es 2+h
comprobar('clase: TVM = 2+h', sp.simplify(((1+h)**2-1)/h - (2+h)) == 0)
# preguntas del test con cifras
comprobar('quiz: tangente x² en 2', igual(4 + 4*(x-2), 4*x-4))
comprobar('quiz: ln(5x)′', igual(sp.diff(sp.log(5*x), x), 1/x))
comprobar('quiz: x/(x+1)′', igual(sp.diff(x/(x+1), x), 1/(x+1)**2))
comprobar('quiz: e^(2x)′', igual(sp.diff(sp.exp(2*x), x), 2*sp.exp(2*x)))
for fx, dx in [(x**3, 3*x**2), (sp.exp(2*x), 2*sp.exp(2*x)), (sp.log(x**2+1), 2*x/(x**2+1)), (sp.sin(x**2), 2*x*sp.cos(x**2)), (x/(x+1), 1/(x+1)**2), (sp.sqrt(x), 1/(2*sp.sqrt(x)))]:
    comprobar(f'emparejar {fx}', igual(sp.diff(fx, x), dx))
comprobar('error: (x²+1)/x′', igual(sp.diff((x**2+1)/x, x), 1 - 1/x**2) and igual((x**2-1)/x**2, 1 - 1/x**2))
comprobar('error: tangente x² en 3', igual(9 + 6*(x-3), 6*x-9))

# ---------- 4. Simulacro 8 ----------
f = 3*x**2 - x
comprobar('sim8 b1', sp.limit((f.subs(x, 2+h) - f.subs(x, 2))/h, h, 0) == 11 and sp.diff(f, x).subs(x, 2) == 11)
comprobar('sim8 b2a', igual(sp.diff((3*x**2-1)*sp.exp(x), x), (3*x**2+6*x-1)*sp.exp(x)))
comprobar('sim8 b2b', igual(sp.diff(sp.log(x**2+1), x), 2*x/(x**2+1)))
comprobar('sim8 b2c', igual(sp.diff((x**2+1)/(x+2), x), (x**2+4*x-1)/(x+2)**2))
f = x**2 - 3*x + 1; m = sp.diff(f, x).subs(x, 1)
comprobar('sim8 b3', f.subs(x,1) == -1 and m == -1 and igual(-1 + m*(x-1), -x) and igual(-1 + (-1/m)*(x-1), x-2))
f = x**3 - 6*x**2 + 9*x + 1
comprobar('sim8 b4', sorted(sp.solve(sp.diff(f,x),x)) == [1, 3] and f.subs(x,1) == 5 and f.subs(x,3) == 1 and sp.diff(f,x,2).subs(x,1) < 0 and sp.diff(f,x,2).subs(x,3) > 0)
S = x**2 + 4*x*(32/x**2); xs = [s for s in sp.solve(sp.diff(S,x),x) if s.is_real and s > 0]
comprobar('sim8 b5', xs == [4] and S.subs(x,4) == 48 and 32/16 == 2 and sp.diff(S,x,2).subs(x,4) > 0, f'{xs}')

print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f_ in fallos: print('  FALLO:', f_)
sys.exit(1 if fallos else 0)
