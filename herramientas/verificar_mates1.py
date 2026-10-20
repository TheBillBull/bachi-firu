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


# =====================================================================
# TEMA 1 · Números reales
# =====================================================================
from sympy import Rational as Q, sqrt, Abs, Interval, Union, oo, S, root, factorint
def cerca(a, b, tol=0.006): return abs(a - b) <= tol * max(abs(b), 1e-12)
xr = sp.symbols('x', real=True)
xp = sp.symbols('xp', positive=True)
E1 = {e['id']: e for e in datos['ampl']['mates1']['t1']['ejercicios']}
def v1(id_, k=0):
    c = E1[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[k]
def decimales(fr_, n=12): return str(sp.N(fr_, n))
def sol_ineq(e): return sp.solve_univariate_inequality(e, xr, relational=False)

comprobar('t1 n2', abs(-9) + abs(4) - abs(-3) == v1('n2')['valor'])
comprobar('t1 n3', sp.simplify(sqrt(50) - 5*sqrt(2)) == 0 and (v1('n3', 0)['valor'], v1('n3', 1)['valor']) == (5, 2))
comprobar('t1 n4', abs(0.000072 - 7.2e-5) < 1e-18 and (v1('n4', 0)['valor'], v1('n4', 1)['valor']) == (7.2, -5))
comprobar('t1 n6', Q(45, 99) == Q(5, 11) and cerca(float(Q(5, 11)), v1('n6')['valor'], 0.001) and decimales(Q(5, 11)).startswith('0.454545454'))
comprobar('t1 n7', sol_ineq(Abs(xr - 4) < 3) == Interval.open(1, 7) and v1('n7')['opciones'][v1('n7')['ok']] == '(1, 7)')
comprobar('t1 n8', sorted(sp.solve(sp.Eq(Abs(2*xr + 1), 7), xr)) == [-4, 3] and sorted(v1('n8')['valores']) == [-4, 3])
comprobar('t1 n9', sp.simplify(10/sqrt(5) - 2*sqrt(5)) == 0 and (v1('n9', 0)['valor'], v1('n9', 1)['valor']) == (2, 1))
comprobar('t1 n10', sp.simplify(3*sqrt(12) - sqrt(27) + sqrt(75) - 8*sqrt(3)) == 0 and (v1('n10', 0)['valor'], v1('n10', 1)['valor']) == (8, 3))
comprobar('t1 n11', Interval.Ropen(-2, 3).intersect(Interval.Lopen(0, 5)) == Interval.open(0, 3) and v1('n11')['opciones'][v1('n11')['ok']] == '(0, 3)')
comprobar('t1 n12', Q(295, 90) == Q(59, 18) and cerca(float(Q(59, 18)), v1('n12')['valor'], 0.001) and decimales(Q(59, 18)).startswith('3.2777777'))
comprobar('t1 n13', (Q(32, 10)*10**5 * Q(4)*Q(1, 100)) / (Q(16, 10)*10**3) == 8 == v1('n13')['valor'])
comprobar('t1 n14', sol_ineq(Abs(xr - 2) >= 3) == Union(Interval(-oo, -1), Interval(5, oo)) and v1('n14')['opciones'][v1('n14')['ok']] == '(−∞, −1] ∪ [5, +∞)')
comprobar('t1 n15', sp.simplify(4/(sqrt(5) - 1) - (sqrt(5) + 1)) == 0)
comprobar('t1 n16', sp.solve(sp.Eq(Abs(xr - 1), 2*xr + 3), xr) == [Q(-2, 3)] and cerca(float(Q(-2, 3)), v1('n16')['valor'], 0.001))
comprobar('t1 n17', sol_ineq(Abs(xr - 1) < 2*xr) == Interval.open(Q(1, 3), oo) and v1('n17')['opciones'][v1('n17')['ok']] == '(1/3, +∞)')
ea = abs(float(sp.pi) - 22/7); er = ea/float(sp.pi)*100
comprobar('t1 n18', cerca(ea, v1('n18', 0)['valor'], 0.01) and cerca(er, v1('n18', 1)['valor'], 0.01), f'{ea:.7f} {er:.5f}')
comprobar('t1 n19', sp.simplify((sqrt(3) + 1)/(sqrt(3) - 1) - (2 + sqrt(3))) == 0)

# ejemplos de la teoría
comprobar('t1 teoría: 1,24 = 31/25', Q(124, 100) == Q(31, 25))
comprobar('t1 teoría: 3,2777… atajo (327−32)/90', Q(327 - 32, 90) == Q(59, 18))
kk = sp.Symbol('k', integer=True, positive=True)
comprobar('t1 teoría: 0,999… = 1', sp.Sum(9*sp.Integer(10)**(-kk), (kk, 1, oo)).doit() == 1)
for fr_, exacto in [(Q(7, 20), True), (Q(5, 12), False), (Q(4, 9), False), (Q(1, 7), False)]:
    primos = set(factorint(fr_.q).keys())
    comprobar(f't1 teoría: {fr_} decimal {"exacto" if exacto else "periódico"}', (primos <= {2, 5}) == exacto)
comprobar('t1 teoría: 7/20 = 0,35 · 5/12 = 0,41666… · 1/7 periodo 6', decimales(Q(7, 20)) == '0.350000000000' or decimales(Q(7, 20)).startswith('0.35') and decimales(Q(5, 12)).startswith('0.416666') and sp.N(Q(1, 7), 14).evalf().__str__().startswith('0.14285714285714'))
comprobar('t1 teoría: √2+(−√2)=0 · √2·√2=2', sp.simplify(sqrt(2) + (-sqrt(2))) == 0 and sp.simplify(sqrt(2)*sqrt(2)) == 2 and not (sqrt(2) + sqrt(3)).is_rational)
comprobar('t1 teoría: 5−3x ≤ 11', sol_ineq(5 - 3*xr <= 11) == Interval(-2, oo))
comprobar('t1 teoría: sistema [−2,4)', sol_ineq(2*xr - 1 < 7).intersect(sol_ineq(3*xr + 2 >= -4)) == Interval.Ropen(-2, 4))
comprobar('t1 teoría: A∪B = [−2,5]', Interval.Ropen(-2, 3).union(Interval.Lopen(0, 5)) == Interval(-2, 5))
comprobar('t1 teoría: (0,2)∪(2,5) vs (0,2)∪[2,5)', Interval.open(0, 2).union(Interval.open(2, 5)) != Interval.open(0, 5) and Interval.open(0, 2).union(Interval.Ropen(2, 5)) == Interval.open(0, 5))
comprobar('t1 teoría: E(3;0,5) = (2,5; 3,5)', Interval.open(Q(5, 2), Q(7, 2)) == sol_ineq(Abs(xr - 3) < Q(1, 2)))
comprobar('t1 teoría: |x−1|=2x+3 → −2/3', sp.solve(sp.Eq(Abs(xr - 1), 2*xr + 3), xr) == [Q(-2, 3)] and Abs(-4 - 1) != 2*(-4) + 3)
comprobar('t1 teoría: |x−1|=|2x+3| → −4, −2/3', sorted(sp.solve(sp.Eq(Abs(xr - 1), Abs(2*xr + 3)), xr)) == [-4, Q(-2, 3)])
comprobar('t1 teoría: |2x−1|<5 → (−2,3)', sol_ineq(Abs(2*xr - 1) < 5) == Interval.open(-2, 3))
comprobar('t1 teoría: |x+2|≥3', sol_ineq(Abs(xr + 2) >= 3) == Union(Interval(-oo, -5), Interval(1, oo)))
comprobar('t1 teoría: (2/3)^-2 = 9/4', Q(2, 3)**-2 == Q(9, 4))
a_, b_ = sp.symbols('a b', positive=True)
comprobar('t1 teoría: a³b⁻²/(a⁻¹b) = a⁴/b³', sp.simplify(a_**3*b_**-2/(a_**-1*b_) - a_**4/b_**3) == 0)
comprobar('t1 teoría: ³√54 = 3³√2', sp.simplify(root(54, 3) - 3*root(2, 3)) == 0)
comprobar('t1 teoría: √(18x³) = 3x√(2x)', sp.simplify(sqrt(18*xp**3) - 3*xp*sqrt(2*xp)) == 0)
comprobar('t1 teoría: √2·³√2 = ⁶√32 = 2^(5/6)', sp.simplify(sqrt(2)*root(2, 3) - root(32, 6)) == 0 and sp.simplify(root(32, 6) - 2**Q(5, 6)) == 0)
comprobar('t1 teoría: 1/³√2 = ³√4/2', sp.simplify(1/root(2, 3) - root(4, 3)/2) == 0)
comprobar('t1 teoría: √(9+16)=5 ≠ √9+√16=7', sqrt(9 + 16) == 5 and sqrt(9) + sqrt(16) == 7)
comprobar('t1 teoría: 3,5·10⁴+4,2·10³ = 3,92·10⁴', Q(35, 10)*10**4 + Q(42, 10)*10**3 == Q(392, 100)*10**4)
comprobar('t1 teoría: errores 2 % y 0,198 %', Q(2, 10)/10 == Q(1, 50) and cerca(float(Q(1, 505)), 0.00198, 0.01))
comprobar('t1 teoría: 7,2·10⁻⁵ y 4,5·10⁻⁴', 0.000072 == 7.2e-5 and 0.00045 == 4.5e-4)

# preguntas del test y de «errores»
comprobar('t1 quiz: 0,222… = 2/9', Q(2, 9) == sp.nsimplify(Q(2, 9)) and decimales(Q(2, 9)).startswith('0.2222222'))
comprobar('t1 quiz: √8 irracional, √36 racional', sqrt(8).is_irrational and sqrt(36).is_rational)
comprobar('t1 quiz: |x−5|=2 → 3 y 7', sorted(sp.solve(sp.Eq(Abs(xr - 5), 2), xr)) == [3, 7])
comprobar('t1 quiz: 1/(√3+1) = (√3−1)/2', sp.simplify(1/(sqrt(3) + 1) - (sqrt(3) - 1)/2) == 0)
comprobar('t1 quiz: error relativo 0,5/10 = 5 %', Q(5, 10)/10 == Q(5, 100))
comprobar('t1 errores: √(−3)² = 3 · −3² = −9 · 2⁻³ = 1/8 · −2x>6 → x<−3', sqrt((-3)**2) == 3 and -3**2 == -9 and Q(2)**-3 == Q(1, 8) and sol_ineq(-2*xr > 6) == Interval.open(-oo, -3))
comprobar('t1 errores: √2+√3 ≠ √5', abs(float(sqrt(2) + sqrt(3)) - float(sqrt(5))) > 0.5 and sol_ineq(Abs(xr - 3) < 2) == Interval.open(1, 5))
# clasificación de la actividad «¿A qué conjunto pertenece?»
CL = {'0': 0, '√49': 0, '−8': 1, '−√16': 1, '3/4': 2, '0,75': 2, '0,2777…': 2, '−7/3': 2, '√10': 3, 'π + 1': 3, '2√2': 3, '0,1010010001…': 3}
VAL = {'0': S(0), '√49': sqrt(49), '−8': S(-8), '−√16': -sqrt(16), '3/4': Q(3, 4), '0,75': Q(75, 100), '0,2777…': Q(25, 90), '−7/3': Q(-7, 3), '√10': sqrt(10), 'π + 1': sp.pi + 1, '2√2': 2*sqrt(2)}
def clase(v):
    if v.is_rational is False: return 3
    if v.is_integer: return 0 if v >= 0 else 1
    return 2
ok_cl = all(clase(VAL[k]) == CL[k] for k in VAL)
items_dat = {it['t'].split(' (')[0]: it['c'] for it in datos['ampl']['mates1']['t1']['datos']['clasnum']['items']}
comprobar('t1 clasificar: clases coinciden con sympy y con los datos', ok_cl and all(items_dat[k] == CL[k] for k in CL), str([k for k in CL if items_dat.get(k) != CL[k]]))


# =====================================================================
# TEMA 2 · Sucesiones
# =====================================================================
E2 = {e['id']: e for e in datos['ampl']['mates1']['t2']['ejercicios']}
def v2(id_, k=0):
    c = E2[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[k]
n_ = sp.symbols('n', positive=True, integer=True)
def termsf(expr, N=6): return [expr.subs(n_, i) for i in range(1, N + 1)]

comprobar('t2 s1: 2n+1 → 3,5,7,9,11', termsf(2*n_ + 1, 5) == [3, 5, 7, 9, 11])
comprobar('t2 s2', 4 + 7*(-3) == v2('s2')['valor'] == -17)
comprobar('t2 s3', Q(10, 5) == v2('s3')['valor'] == 2)
a10 = 2 + 9*3; comprobar('t2 s4', 10*(2 + a10)/2 == v2('s4')['valor'] == 155)
comprobar('t2 s5: 3n−2 creciente (d = 3)', sp.simplify((3*(n_ + 1) - 2) - (3*n_ - 2)) == 3)
fib = [1, 1]
for _ in range(8): fib.append(fib[-1] + fib[-2])
comprobar('t2 s6: Fibonacci a9 = 34', fib[8] == v2('s6')['valor'] == 34)
a1_, d_ = sp.symbols('a1 d')
sol7 = sp.solve([a1_ + 4*d_ - 17, a1_ + 11*d_ - 45], [a1_, d_])
comprobar('t2 s7', (sol7[a1_], sol7[d_]) == (v2('s7', 0)['valor'], v2('s7', 1)['valor']) == (1, 4))
mult = list(range(105, 500, 7))
comprobar('t2 s8: múltiplos de 7 entre 100 y 500', mult[0] == 105 and mult[-1] == 497 and len(mult) == 57 and sum(mult) == 17157 == v2('s8')['valor'])
d9 = Q(18 - 3, 4 + 1); prog9 = [3 + k*d9 for k in range(6)]
comprobar('t2 s9', d9 == v2('s9', 0)['valor'] == 3 and prog9 == [3, 6, 9, 12, 15, 18] and prog9[3] == v2('s9', 1)['valor'] == 12)
r10 = sp.solve(sp.Eq(12*sp.Symbol('r')**3, 96), sp.Symbol('r'))
r10 = [x for x in r10 if x.is_real][0]; a10_ = 12/r10**2
comprobar('t2 s10', (r10, a10_, a10_*(r10**8 - 1)/(r10 - 1)) == (2, 3, 765) and (v2('s10', 0)['valor'], v2('s10', 1)['valor'], v2('s10', 2)['valor']) == (2, 3, 765))
comprobar('t2 s11', Q(9)/(1 - Q(1, 3)) == Q(27, 2) == v2('s11')['valor'] or float(Q(27, 2)) == v2('s11')['valor'])
comprobar('t2 s12', round(1000*1.05**10, 2) == 1628.89 == v2('s12')['valor'])
dif = sp.simplify((2*(n_ + 1) - 1)/(n_ + 2) - (2*n_ - 1)/(n_ + 1))
comprobar('t2 s13: (2n−1)/(n+1)', sp.simplify(dif - 3/((n_ + 1)*(n_ + 2))) == 0 and sp.simplify((2*n_ - 1)/(n_ + 1) - (2 - 3/(n_ + 1))) == 0 and v2('s13')['ok'] == 0)
prod14 = 1
for t_ in [2*3**k for k in range(5)]: prod14 *= t_
comprobar('t2 s14', prod14 == 1889568 == v2('s14')['valor'] == 18**5 and Q(324)**Q(5, 2) == 1889568)
tot15 = 10 + 2*sum(10*0.6**k for k in range(1, 400))
comprobar('t2 s15', abs(tot15 - 40) < 1e-9 and Q(6)/(1 - Q(6, 10)) == 15 and v2('s15')['valor'] == 40)
nn = sp.symbols('nn', positive=True)
sol16 = sp.solve(sp.Eq(2*nn**2 + 3*nn, 495), nn)
comprobar('t2 s16', sol16 == [15] and sum(5 + 4*k for k in range(15)) == 495 and 5 + 14*4 == 61 and v2('s16')['valor'] == 15)
cap17 = sum(1000*1.05**k for k in range(1, 11))
comprobar('t2 s17', abs(cap17 - 13206.79) < 0.01 and v2('s17')['valor'] == 13206.79, f'{cap17:.4f}')
comprobar('t2 s18: 0,6363… = 63/99 = 7/11', Q(63, 100)/(1 - Q(1, 100)) == Q(7, 11) and abs(float(Q(7, 11)) - v2('s18')['valor']) < 1e-12)
comprobar('t2 s19', Q(1)/(1 + Q(1, 2)) == Q(2, 3) and abs(v2('s19')['valor'] - 2/3) < 1e-12)
aa, dd = sp.symbols('aa dd')
sol20 = sp.solve([3*aa - 21, (aa - dd)*aa*(aa + dd) - 315], [aa, dd])
comprobar('t2 s20', all(sorted([s_[0] - s_[1], s_[0], s_[0] + s_[1]]) == [5, 7, 9] for s_ in sol20) and (v2('s20', 0)['valor'], v2('s20', 1)['valor']) == (5, 9))
r_ = sp.symbols('r_')
sol21 = sp.solve(2*r_**2 - 5*r_ + 2, r_)
comprobar('t2 s21', sorted(sol21) == [Q(1, 2), 2] and all(abs(sum(4*r**k for k in (-1, 0, 1)) - 14) < 1e-12 and 4**3 == 64 for r in [2, 0.5]) and (v2('s21', 0)['valor'], v2('s21', 1)['valor']) == (2, 8))
# suma geométrica: demostración y fórmula
a_, r2 = sp.symbols('a r', positive=True)
Sn = sp.summation(a_*r2**(sp.Symbol('i', integer=True)), (sp.Symbol('i', integer=True), 0, n_ - 1))
comprobar('t2 s22: fórmula Sₙ geométrica', sp.simplify(Sn.subs({a_: 3, r2: 2, n_: 8}) - 765) == 0 and sp.simplify(sp.Rational(3)*(2**8 - 1)/(2 - 1)) == 765)
# teoría
comprobar('t2 teoría: términos generales', termsf(n_/(n_ + 1), 4) == [Q(1, 2), Q(2, 3), Q(3, 4), Q(4, 5)] and termsf(n_**2 + 1, 5) == [2, 5, 10, 17, 26] and termsf((-1)**n_, 4) == [-1, 1, -1, 1] and termsf(2**n_, 4) == [2, 4, 8, 16] and termsf(3*n_ - 1, 4) == [2, 5, 8, 11] and termsf(3*2**(n_ - 1), 4) == [3, 6, 12, 24])
comprobar('t2 teoría: n/2ⁿ decreciente, cociente (n+1)/(2n)', sp.simplify((n_ + 1)/2**(n_ + 1) / (n_/2**n_) - (n_ + 1)/(2*n_)) == 0 and termsf(n_/2**n_, 3) == [Q(1, 2), Q(1, 2), Q(3, 8)])
vals = [(1 + 1/k)**k for k in range(1, 2000)]
comprobar('t2 teoría: (1+1/n)ⁿ creciente y < 3, → e', all(vals[i] < vals[i + 1] for i in range(len(vals) - 1)) and max(vals) < 3 and abs(vals[-1] - float(sp.E)) < 2e-3)
comprobar('t2 teoría: tabla de sucesiones', sp.simplify((1/(n_ + 1) - 1/n_) + 1/(n_*(n_ + 1))) == 0 and sp.limit((n_ + 1)/n_, n_, sp.oo) == 1)
comprobar('t2 teoría: Gauss 1+…+100 = 5050', sum(range(1, 101)) == 5050 and 50*101 == 5050)
comprobar('t2 teoría: ejemplo a5=17,a12=45 → a20, S20', 1 + 19*4 == 77 and 20*(1 + 77)/2 == 780)
comprobar('t2 teoría: clasificación (a)(b)(c)', [5 + 3*(k - 1) for k in range(1, 5)] == [5, 8, 11, 14] and termsf(3*n_ + 2, 4) == [5, 8, 11, 14] and [2*3**(k - 1) for k in range(1, 5)] == [2, 6, 18, 54])
seg = [(termsf(n_**2 + 1, 5)[i + 2] - termsf(n_**2 + 1, 5)[i + 1]) - (termsf(n_**2 + 1, 5)[i + 1] - termsf(n_**2 + 1, 5)[i]) for i in range(3)]
comprobar('t2 teoría: segunda diferencia constante = 2', seg == [2, 2, 2])
comprobar('t2 teoría: 1,3,7,15 = 2ⁿ−1', [2**k - 1 for k in range(1, 5)] == [1, 3, 7, 15])
comprobar('t2 teoría: interés 1000·1,05¹⁰ y duplicar 14,2 años', round(1000*1.05**10, 2) == 1628.89 and round(1628.89 - 1000, 2) == 628.89 and abs(float(sp.log(2)/sp.log(Q(105, 100))) - 14.2067) < 1e-3)
comprobar('t2 teoría: φ² = φ + 1', sp.simplify(((1 + sqrt(5))/2)**2 - ((1 + sqrt(5))/2) - 1) == 0)
fr_ = [fib[i + 1]/fib[i] for i in range(len(fib) - 1)]
comprobar('t2 teoría: Fibonacci cociente → φ', abs(fr_[-1] - float((1 + sqrt(5))/2)) < 1e-3)
# quiz
comprobar('t2 quiz: a₁₀=−11, r=1/3, S₅₀=1275, S∞=9, 16^(1/4)=2, 2000·1,03⁵', 7 + 9*(-2) == -11 and Q(27, 81) == Q(1, 3) and 50*51//2 == 1275 and Q(6)/(1 - Q(1, 3)) == 9 and 16**0.25 == 2 and round(2000*1.03**5, 2) == 2318.55)
comprobar('t2 errores: aₙ=1/n decreciente', sp.simplify((1/(n_ + 1) - 1/n_) + 1/(n_*(n_ + 1))) == 0)
comprobar('t2 pelota con simulación (suma de alturas)', abs(10 + 2*sum(10*0.6**k for k in range(1, 200)) - 10*(1.6)/(0.4)) < 1e-9)

print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f_ in fallos: print('  FALLO:', f_)
sys.exit(1 if fallos else 0)
