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


# =====================================================================
# TEMA 3 · Álgebra
# =====================================================================
E3 = {e['id']: e for e in datos['ampl']['mates1']['t3']['ejercicios']}
def v3(id_, k=0):
    c = E3[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[k]
def num3(id_, k=0): return v3(id_, k)['valor']
def vals3(id_, k=0): return sorted(v3(id_, k)['valores'])
def raices_reales(e): return sorted(sp.real_roots(sp.Poly(sp.expand(e), x)))
def cerca_lista(a, b, tol=1e-9): return len(a) == len(b) and all(abs(float(i) - float(j)) < tol for i, j in zip(sorted(a), sorted(b)))
y, z = sp.symbols('y z')
def coefs(e, g=2):
    pl = sp.Poly(sp.expand(e), x); return [pl.coeff_monomial(x**k) for k in range(g, -1, -1)]

# ---- ejercicios ★
comprobar('t3 e1', (3*x**4 - 2*x + 5).subs(x, -1) == 10 == num3('e1'))
comprobar('t3 e2', coefs((2*x**2 - 3*x + 1) - (x**2 + 5*x - 4)) == [1, -8, 5] and (num3('e2', 0), num3('e2', 1), num3('e2', 2)) == (1, -8, 5))
comprobar('t3 e3', coefs((x + 4)**2)[1:] == [8, 16] == [num3('e3', 0), num3('e3', 1)])
comprobar('t3 e4', sp.factor(x**2 - 49) == (x - 7)*(x + 7) and v3('e4')['ok'] == 0 and v3('e4')['opciones'][0] == '(x − 7)(x + 7)')
q5, r5 = sp.div(x**3 - 4*x**2 + x + 6, x - 2, x)
comprobar('t3 e5', r5 == 0 == num3('e5') and q5 == x**2 - 2*x - 3)
comprobar('t3 e6', sorted(sp.solve(x**2 - 5*x + 6, x)) == vals3('e6') == [2, 3])
comprobar('t3 e7', sorted(sp.solve(3*x**2 - 12, x)) == vals3('e7') == [-2, 2])
s8 = sp.solve([x + y - 10, x - y - 2], [x, y]); comprobar('t3 e8', (s8[x], s8[y]) == (6, 4) == (num3('e8', 0), num3('e8', 1)))
comprobar('t3 e9', sp.solve_univariate_inequality(2*x - 3 > 7, x, relational=False) == sp.Interval.open(5, sp.oo) and v3('e9')['opciones'][v3('e9')['ok']] == '(5, +∞)')
comprobar('t3 e10', sp.log(32, 2) == 5 == num3('e10', 0) and sp.solve(2**x - 16, x) == [4] and num3('e10', 1) == 4)
# ---- ejercicios ★★
comprobar('t3 e11', sp.expand((x - 2)*(x**2 + 2*x + 4)) == x**3 - 8 and coefs((x - 2)*(x**2 + 2*x + 4), 2) == [0, 0, -8] and (num3('e11', 0), num3('e11', 1), num3('e11', 2)) == (0, 0, -8))
q12, r12 = sp.div(2*x**3 + x**2 - 5*x + 2, x**2 + x - 2, x)
comprobar('t3 e12', q12 == 2*x - 1 and r12 == 0 and (num3('e12', 0), num3('e12', 1), num3('e12', 2)) == (2, -1, 0))
comprobar('t3 e13', raices_reales(x**3 - 6*x**2 + 11*x - 6) == vals3('e13') == [1, 2, 3])
comprobar('t3 e14', sp.factor(x**3 - x**2 - 4*x + 4) == (x - 2)*(x - 1)*(x + 2) and raices_reales(x**3 - x**2 - 4*x + 4) == vals3('e14') == [-2, 1, 2])
k = sp.symbols('k')
comprobar('t3 e15', sp.solve((x**3 + 3*x**2 + k*x - 6).subs(x, -3), k) == [-2] and num3('e15') == -2 and sp.factor((x**3 + 3*x**2 - 2*x - 6)) == (x + 3)*(x**2 - 2))
comprobar('t3 e16', (x**5 - 2*x**3 + x - 7).subs(x, -1) == -7 == num3('e16') and sp.rem(x**5 - 2*x**3 + x - 7, x + 1, x) == -7)
comprobar('t3 e17', sorted(sp.solve(2*x**2 - 7*x + 3, x)) == [Q(1, 2), 3] and cerca_lista(v3('e17')['valores'], [3, 0.5]))
comprobar('t3 e18', sp.solve(sp.discriminant(x**2 - 6*x + k, x), k) == [9] == [num3('e18')])
comprobar('t3 e19', sorted(sp.solve(x**4 - 13*x**2 + 36, x)) == [-3, -2, 2, 3] == vals3('e19'))
s20 = sp.solve([2*x + 3*y - 13, 3*x - y - 3], [x, y]); comprobar('t3 e20', (s20[x], s20[y]) == (2, 3) == (num3('e20', 0), num3('e20', 1)))
sol21 = sp.solve(1/x + 1/(x + 2) - Q(3, 4), x)
comprobar('t3 e21', sorted(sol21) == [Q(-4, 3), 2] and cerca_lista(v3('e21')['valores'], [2, -4/3]) and all(s not in (0, -2) for s in sol21))
sol22 = [t for t in sp.solve((sp.sqrt(2*x - 1) + 2 - x), x)]
comprobar('t3 e22', sol22 == [5] == [num3('e22')] and (sp.sqrt(2*1 - 1) + 2 - 1) != 0)
sol23 = sp.solve(2**(2*x) - 5*2**x + 4, x)
comprobar('t3 e23', sorted(sol23) == [0, 2] == vals3('e23'))
sol24 = [t for t in sp.solve(sp.log(x + 2, 3) + sp.log(x - 4, 3) - 3, x) if t.is_real]
comprobar('t3 e24', sol24 == [7] == [num3('e24')] and sp.log(9, 3) + sp.log(3, 3) == 3)
comprobar('t3 e25', sp.solve_univariate_inequality(x**2 - x - 6 < 0, x, relational=False) == sp.Interval.open(-2, 3) and v3('e25')['opciones'][v3('e25')['ok']] == '(−2, 3)')
comprobar('t3 e26', sorted(sp.solve(x + 1/x - Q(10, 3), x)) == [Q(1, 3), 3] and cerca_lista(v3('e26')['valores'], [3, 1/3]))
# ---- ejercicios ★★★
a_, b_ = sp.symbols('a b')
s27 = sp.solve([(x**3 + a_*x**2 + b_*x - 6).subs(x, 1), (x**3 + a_*x**2 + b_*x - 6).subs(x, -3)], [a_, b_])
comprobar('t3 e27', (s27[a_], s27[b_]) == (4, 1) == (num3('e27', 0), num3('e27', 1)) and sp.factor(x**3 + 4*x**2 + x - 6) == (x - 1)*(x + 2)*(x + 3))
p28 = x**4 - 3*x**3 - 3*x**2 + 11*x - 6
comprobar('t3 e28', sp.factor(p28) == (x - 3)*(x - 1)**2*(x + 2) and sorted(sp.roots(p28).keys()) == vals3('e28', 0) == [-2, 1, 3] and sp.roots(p28)[1] == 2 and num3('e28', 1) == 1)
comprobar('t3 e29', sp.simplify(sp.cancel((x**3 - x)/(x**2 - 2*x + 1)) - x*(x + 1)/(x - 1)) == 0 and v3('e29')['opciones'][v3('e29')['ok']] == 'x(x + 1)/(x − 1)')
comprobar('t3 e30', sp.solve(sp.together(x + 3/(x - 3) - 3 - 3/(x - 3)), x) == [3] and sp.denom(sp.together(x + 3/(x - 3))).subs(x, 3) == 0 and v3('e30')['opciones'][v3('e30')['ok']] == 'No tiene solución')
ec31 = [t for t in sp.solve(sp.sqrt(2*x + 3) - sp.sqrt(x + 1) - 1, x)]
comprobar('t3 e31', sorted(ec31) == [-1, 3] == vals3('e31') and all(abs(float(sp.sqrt(2*t + 3) - sp.sqrt(t + 1) - 1)) < 1e-12 for t in (-1, 3)))
tt = sp.Symbol('tt', positive=True); sol32 = [sp.log(t_, 2) for t_ in sp.solve(tt + 2/tt - 3, tt)]; comprobar('t3 e32', sorted(sol32) == [0, 1] == vals3('e32') and all(abs(float(2**v + 2**(1 - v)) - 3) < 1e-12 for v in (0, 1)))
sol33 = [t for t in sp.solve(sp.log(x**2 - 4, 10) - sp.log(x + 2, 10) - 1, x) if t.is_real and (t**2 - 4) > 0 and (t + 2) > 0]
comprobar('t3 e33', sol33 == [12] == [num3('e33')] and abs(float(sp.log(140, 10) - sp.log(14, 10)) - 1) < 1e-12)
ineq34 = sp.solve_univariate_inequality((x**2 - x - 6)/(x - 1) <= 0, x, relational=False)
comprobar('t3 e34', ineq34 == sp.Union(sp.Interval(-sp.oo, -2), sp.Interval.Lopen(1, 3)) and v3('e34')['opciones'][v3('e34')['ok']] == '(−∞, −2] ∪ (1, 3]')
s35 = sp.solve([x**2 + y**2 - 34, x - y - 2], [x, y])
comprobar('t3 e35', sorted(s[0] for s in s35) == vals3('e35', 0) == [-3, 5] and sorted(s[1] for s in s35) == vals3('e35', 1) == [-5, 3])
t36 = sp.solve(1/x + 1/(x - 5) - Q(1, 6), x)
comprobar('t3 e36', sorted(t36) == [2, 15] and num3('e36') == 15 and Q(1, 15) + Q(1, 10) == Q(1, 6))
mm = sp.symbols('m')
comprobar('t3 e37', sp.solve_univariate_inequality(mm**2 - 16 > 0, mm, relational=False) == sp.Union(sp.Interval.open(-sp.oo, -4), sp.Interval.open(4, sp.oo)) and v3('e37')['opciones'][v3('e37')['ok']] == '(−∞, −4) ∪ (4, +∞)')
s38 = sp.solve([x + y + z - 6, 2*x - y + z - 6, x + 2*y - z - 1], [x, y, z])
comprobar('t3 e38', (s38[x], s38[y], s38[z]) == (2, 1, 3) == (num3('e38', 0), num3('e38', 1), num3('e38', 2)))
comprobar('t3 e39 (Vieta)', sp.simplify(sum(sp.solve(a_*x**2 + b_*x + sp.Symbol('c'), x)) + b_/a_) == 0 and sp.simplify(sp.Mul(*sp.solve(a_*x**2 + b_*x + sp.Symbol('c'), x)) - sp.Symbol('c')/a_) == 0)
p40 = sp.expand(2*(x - 1)*(x + 2)*(x - Q(1, 2)))
comprobar('t3 e40', coefs(p40, 3) == [2, 1, -5, 2] and (num3('e40', 0), num3('e40', 1), num3('e40', 2)) == (1, -5, 2))

# ---- teoría: números de los ejemplos
comprobar('t3 teoría: suma, resta y producto de polinomios', sp.expand((3*x**3 - 2*x**2 + 5*x - 1) + (-x**3 + 4*x**2 - x + 7)) == 2*x**3 + 2*x**2 + 4*x + 6 and sp.expand((3*x**3 - 2*x**2 + 5*x - 1) - (-x**3 + 4*x**2 - x + 7)) == 4*x**3 - 6*x**2 + 6*x - 8 and sp.expand((2*x**2 - 3*x + 1)*(x**2 + 4*x - 2)) == 2*x**4 + 5*x**3 - 15*x**2 + 10*x - 2)
comprobar('t3 teoría: truco P(1)', ((2 - 3 + 1)*(1 + 4 - 2)) == 0 and (2 + 5 - 15 + 10 - 2) == 0)
comprobar('t3 teoría: divisiones', sp.div(x**3 - 2*x**2 - 5*x + 6, x**2 + x - 2, x) == (x - 3, 0) and sp.div(2*x**3 - x**2 + 3*x - 4, x**2 + 1, x) == (2*x - 1, x - 3))
comprobar('t3 teoría: Ruffini x+3', sp.div(x**3 + 2*x**2 - 5*x - 6, x + 3, x) == (x**2 - x - 2, 0) and sp.factor(x**3 + 2*x**2 - 5*x - 6) == (x - 2)*(x + 1)*(x + 3))
comprobar('t3 teoría: Ruffini con huecos', sp.div(2*x**4 - 3*x**2 + x - 6, x - 2, x) == (2*x**3 + 4*x**2 + 5*x + 11, 16) and (2*x**4 - 3*x**2 + x - 6).subs(x, 2) == 16)
comprobar('t3 teoría: divisor (2x−1)', sp.div(2*x**3 + 3*x**2 + 4*x - 3, 2*x - 1, x) == (x**2 + 2*x + 3, 0) and sp.div(2*x**3 + 3*x**2 + 4*x - 3, x - Q(1, 2), x)[0] == 2*x**2 + 4*x + 6)
comprobar('t3 teoría: parámetros', sp.solve((x**3 + k*x**2 - 4*x + 4).subs(x, 2), k) == [-1] and sp.factor(x**3 - x**2 - 4*x + 4) == (x - 1)*(x - 2)*(x + 2) and (x**4 - 3*x**2 + 2*x + 5).subs(x, -2) == 5)
s_ab = sp.solve([(x**3 + a_*x**2 + b_*x + 6).subs(x, 1), (x**3 + a_*x**2 + b_*x + 6).subs(x, -2)], [a_, b_])
comprobar('t3 teoría: dos parámetros', (s_ab[a_], s_ab[b_]) == (-2, -5) and sp.factor(x**3 - 2*x**2 - 5*x + 6) == (x - 1)*(x + 2)*(x - 3))
comprobar('t3 teoría: identidades', sp.expand((3*x - 5)**2) == 9*x**2 - 30*x + 25 and sp.expand((x - 2)**3) == x**3 - 6*x**2 + 12*x - 8 and 99**2 == 9801 and 101*99 == 9999 and 1002**2 == 1004004 and sp.factor(x**2 + 10*x + 25) == (x + 5)**2 and sp.factor(4*x**2 - 12*x + 9) == (2*x - 3)**2 and sp.factor(3*x**3 - 12*x) == 3*x*(x - 2)*(x + 2) and sp.factor(x**4 - 16) == (x - 2)*(x + 2)*(x**2 + 4) and sp.factor(x**3 + 8) == (x + 2)*(x**2 - 2*x + 4) and sp.factor(8*x**3 - 27) == (2*x - 3)*(4*x**2 + 6*x + 9))
comprobar('t3 teoría: racionalizar y completar cuadrado', sp.simplify(1/(sp.sqrt(5) - 2) - (sp.sqrt(5) + 2)) == 0 and sp.expand((x + 3)**2 - 4) == x**2 + 6*x + 5 and sp.expand((x + 5)**4) == x**4 + 20*x**3 + 150*x**2 + 500*x + 625)
comprobar('t3 teoría: binomio de Pascal', sp.expand((x + 1)**4) == x**4 + 4*x**3 + 6*x**2 + 4*x + 1)
comprobar('t3 teoría: factorización de 2x³−3x²−3x+2', sp.factor(2*x**3 - 3*x**2 - 3*x + 2) == (x - 2)*(x + 1)*(2*x - 1) and sp.div(2*x**3 - 3*x**2 - 3*x + 2, x + 1, x) == (2*x**2 - 5*x + 2, 0))
comprobar('t3 teoría: raíz doble', sp.factor(x**3 - 3*x**2 + 4) == (x + 1)*(x - 2)**2 and sp.div(x**3 - 3*x**2 + 4, x + 1, x) == (x**2 - 4*x + 4, 0))
rr = sp.expand((x - 1)*(x - 2)*(x + 3))
comprobar('t3 teoría: polinomio con raíces 1, 2, −3 y Cardano–Vieta', rr == x**3 - 7*x + 6 and 1 + 2 - 3 == 0 and 1*2 + 1*(-3) + 2*(-3) == -7 and 1*2*(-3) == -6)
p4 = x**4 - 2*x**3 - 7*x**2 + 8*x + 12
comprobar('t3 teoría: grado 4', sp.factor(p4) == (x - 3)*(x - 2)*(x + 1)*(x + 2) and sp.div(p4, x + 1, x) == (x**3 - 3*x**2 - 4*x + 12, 0) and sum([-2, -1, 2, 3]) == 2 and (-2)*(-1)*2*3 == 12)
# segundo grado
comprobar('t3 teoría: incompletas e inc. con parámetro', sp.factor(5*x**2 - 20*x) == 5*x*(x - 4) and sp.solve(3*x**2 - 27, x) == [-3, 3] and sp.solve(x**2 + 4, x) == [-2*sp.I, 2*sp.I])
comprobar('t3 teoría: x(x+5)=3(x+4)', sorted(sp.solve(x*(x + 5) - 3*(x + 4), x)) == [-1 - sp.sqrt(13), -1 + sp.sqrt(13)] and 4 + 48 == 52)
comprobar('t3 teoría: suma y producto, ecuación con soluciones 3 y −5', sp.expand((x - 3)*(x + 5)) == x**2 + 2*x - 15 and 3 + (-5) == -2 and 3*(-5) == -15)
comprobar('t3 teoría: parámetros k (Δ)', sp.solve(sp.discriminant(x**2 + k*x + 9, x), k) == [-6, 6] and sp.solve_univariate_inequality(16 - 4*k < 0, k, relational=False) == sp.Interval.open(4, sp.oo))
comprobar('t3 teoría: rectángulo perímetro 30, área 56', sorted(sp.solve(x*(15 - x) - 56, x)) == [7, 8] and 2*(7 + 8) == 30)
comprobar('t3 teoría: bicuadradas', sorted(sp.solve(x**4 + x**2 - 6, x)) == [-sp.sqrt(2), sp.sqrt(2)] if False else [r for r in sp.solve(x**4 + x**2 - 6, x) if r.is_real] == [-sp.sqrt(2), sp.sqrt(2)] and sorted(sp.solve(x**6 - 7*x**3 - 8, x), key=lambda r: float(sp.re(r)))[0] is not None and 2**6 - 7*2**3 - 8 == 0 and (-1)**6 - 7*(-1)**3 - 8 == 0 and sorted(sp.solve(sp.Symbol('t')**2 - 5*sp.Symbol('t') + 6, sp.Symbol('t'))) == [2, 3] and 4 - 5*2 + 6 == 0 and 9 - 5*3 + 6 == 0)
comprobar('t3 teoría: fórmula de 2.º grado (completar cuadrado)', sp.simplify(((-b_ + sp.sqrt(b_**2 - 4*a_*sp.Symbol('c')))/(2*a_))*a_**2*4 - 2*a_*(-b_ + sp.sqrt(b_**2 - 4*a_*sp.Symbol('c')))) == 0 and sp.simplify(a_*((-b_ + sp.sqrt(b_**2 - 4*a_*sp.Symbol('c')))/(2*a_))**2 + b_*((-b_ + sp.sqrt(b_**2 - 4*a_*sp.Symbol('c')))/(2*a_)) + sp.Symbol('c')) == 0)
# sistemas
s_a = sp.solve([x + 2*y - 7, 3*x - y - 7], [x, y]); comprobar('t3 teoría: sistema x+2y=7, 3x−y=7', s_a == {x: 3, y: 2} and (3, 2) == (3, 2))
comprobar('t3 teoría: sistema con parámetro', sp.Matrix([[1, 2], [2, 4]]).det() == 0 and sp.Matrix([[1, 2, 4], [2, 4, 8]]).rank() == 1 and sp.Matrix([[1, 2, 4], [2, 4, 9]]).rank() == 2)
comprobar('t3 teoría: x+y=5, xy=6', sorted(sp.solve([x + y - 5, x*y - 6], [x, y])) == [(2, 3), (3, 2)])
comprobar('t3 teoría: x²+y²=25, x−y=1', sorted(sp.solve([x**2 + y**2 - 25, x - y - 1], [x, y])) == [(-3, -4), (4, 3)])
comprobar('t3 teoría: Gauss', sp.solve([x + y + z - 6, 2*x - y + z - 3, x + 2*y - z - 2], [x, y, z]) == {x: 1, y: 2, z: 3} and (-3*2 - 3) == -9 and (2 - 2*3) == -4)
# fracciones algebraicas y ecuaciones
comprobar('t3 teoría: simplificar (x²−9)/(x²+x−6)', sp.cancel((x**2 - 9)/(x**2 + x - 6)) == (x - 3)/(x - 2) and sp.solve(x**2 + x - 6, x) == [-3, 2] and sp.cancel((x**2 + 2*x + 1)/(x**2 - 1)) == (x + 1)/(x - 1))
comprobar('t3 teoría: operaciones con fracciones', sp.simplify(1/(x - 1) + 2/(x + 1) - (3*x - 1)/(x**2 - 1)) == 0 and sp.simplify(x/(x - 2) - 2/(x**2 - 2*x) - (x**2 - 2)/(x*(x - 2))) == 0 and sp.simplify((x**2 - 4)/(x + 1)*(x + 1)/(x - 2) - (x + 2)) == 0 and sp.simplify(x/(x + 2)/((x - 1)/(x + 2)**2) - x*(x + 2)/(x - 1)) == 0)
comprobar('t3 teoría: ecuaciones racionales', sorted(sp.solve(1/x + 1/(x + 2) - Q(3, 4), x)) == [Q(-4, 3), 2] and sp.solve(x/(x - 1) - 2/(x + 1) - 2/(x**2 - 1), x) == [0] and sp.simplify(x/(x - 1) - 2/(x + 1) - 2/(x**2 - 1)).subs(x, 0) == 0)
comprobar('t3 teoría: x/(x−1) − 2/(x+1) = 2/(x²−1) → x²−x = 0', sp.expand(x*(x + 1) - 2*(x - 1) - 2) == x**2 - x)
comprobar('t3 teoría: irracionales', [r for r in sp.solve(sp.sqrt(x + 6) - x, x)] == [3] and sp.solve(sp.sqrt(x + 7) - sp.sqrt(x - 2) - 1, x) == [18] and sp.sqrt(25) - sp.sqrt(16) == 1 and sorted(sp.solve(x**2 - x - 6, x)) == [-2, 3])
comprobar('t3 teoría: exponenciales', sp.solve(3**(x - 1) - 27, x) == [4] and sp.solve(2**(x + 1) + 2**x - 12, x) == [2] and [r for r in sp.solve(4**x - 3*2**x - 4, x) if r.is_real] == [2] and abs(float(sp.log(7, 10)/sp.log(5, 10)) - 1.2091) < 1e-3)
comprobar('t3 teoría: logaritmos', sp.log(8, 2) == 3 and sp.log(sp.Rational(1, 1000), 10) == -3 and sp.log(81, 3) == 4 and abs(float(sp.log(5, 2)) - 2.3219) < 1e-3 and [r for r in sp.solve(sp.log(x + 3, 2) + sp.log(x - 3, 2) - 4, x) if r.is_real and r > 3] == [5] and sp.solve(2*sp.log(x) - sp.log(x + 6), x) == [3] and sp.solve(sp.log(2*x - 1, 3) - 2, x) == [5])
# inecuaciones
comprobar('t3 teoría: inecuaciones de 1.º y 2.º grado', sp.solve_univariate_inequality(3*x - 7 < 2*x + 5, x, relational=False) == sp.Interval.open(-sp.oo, 12) and sp.solve_univariate_inequality(-2*x + 6 >= 0, x, relational=False) == sp.Interval(-sp.oo, 3) and sp.solve_univariate_inequality(x**2 - 3*x - 4 >= 0, x, relational=False) == sp.Union(sp.Interval(-sp.oo, -1), sp.Interval(4, sp.oo)))
comprobar('t3 teoría: inecuaciones racionales', sp.solve_univariate_inequality((x - 1)/(x + 2) > 0, x, relational=False) == sp.Union(sp.Interval.open(-sp.oo, -2), sp.Interval.open(1, sp.oo)) and sp.solve_univariate_inequality((x**2 - 4)/(x**2 - 1) <= 0, x, relational=False) == sp.Union(sp.Interval.Ropen(-2, -1), sp.Interval.Lopen(1, 2)) and sp.solve_univariate_inequality((x - 1)*(x + 2)*(x - 4) < 0, x, relational=False) == sp.Union(sp.Interval.open(-sp.oo, -2), sp.Interval.open(1, 4)))
comprobar('t3 teoría: sistema de inecuaciones', sp.Interval.open(2, sp.oo).intersect(sp.Interval.open(-5, 5)) == sp.Interval.open(2, 5))
# problemas
comprobar('t3 teoría: problemas', 35 + 37 + 39 == 111 and sp.solve(3*x + 10 - 2*(x + 10), x) == [10] and sp.solve(4*x + 6*(20 - x) - 104, x) == [8] and sp.solve(60*(x + 2) - 90*x, x) == [4] and 90*4 == 360 == 60*6 and Q(1, 6) + Q(1, 3) == Q(1, 2) and Q(1, 4) - Q(1, 12) == Q(1, 6) and sorted(sp.solve(x*(x + 3) - 40, x)) == [-8, 5] and sp.solve(8*x + 5*(120 - x) - 810, x) == [70])
# quiz y errores
comprobar('t3 quiz y errores', (x**3 - 2*x + 1).subs(x, 1) == 0 and sp.factor(x**3 - 2*x**2 - 5*x + 6) == (x - 1)*(x - 3)*(x + 2) and sp.discriminant(x**2 - 4*x + 4, x) == 0 and sp.Matrix([[1, 2, 4], [2, 4, 9]]).rank() == 2 and sp.log(32, 2) == 5 and sp.expand((x - 3)*(x + 5)) == x**2 + 2*x - 15 and (x**3 + k*x**2 - 4*x + 4).subs({x: 2, k: -1}) == 0 and (x + 5)**2 != x**2 + 25 and (6**2, 1 + 25) == (36, 26) and sp.log(10, 10) == 1 and abs(float(sp.log(21, 10)) - 1.3222) < 1e-3 and sp.discriminant(x**2 - 4*x + 5, x) == -4)
comprobar('t3 error: −2x>6 → x<−3', sp.solve_univariate_inequality(-2*x > 6, x, relational=False) == sp.Interval.open(-sp.oo, -3))
comprobar('t3 error: (x²+1)/(x²−1) no simplifica', sp.cancel((x**2 + 1)/(x**2 - 1)) == (x**2 + 1)/(x**2 - 1) and ((3**2 + 1)/(3**2 - 1)) == 1.25)
# metodos/clasificar: coherencia de la teoría (las categorías de «tipos» coinciden con soluciones comprobadas)
comprobar('t3 tipos: soluciones de las ecuaciones de la actividad', sorted(sp.solve(x**2 - 5*x + 6, x)) == [2, 3] and sorted(sp.solve(x**4 - 5*x**2 + 4, x)) == [-2, -1, 1, 2] and sp.solve(2**(x + 1) - 16, x) == [3] and sorted(sp.solve(5*x**3 - 10*x**2, x)) == [0, 2] and sp.solve(sp.sqrt(2*x + 1) - (x - 1), x) == [4] and sp.solve(x/(x - 3) - 2, x) == [6] and sp.solve(sp.sqrt(x) + 3 - 8, x) == [25] and sp.solve(sp.log(x - 5, 2) - 3, x) == [13])


# =====================================================================
# TEMA 4 · Trigonometría: razones y resolución de triángulos
# =====================================================================
import math
E4 = {e['id']: e for e in datos['ampl']['mates1']['t4']['ejercicios']}
def v4(id_, k=0):
    c = E4[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[k]
def n4(id_, k=0): return v4(id_, k)['valor']
D = math.radians
def sd(a): return math.sin(D(a))
def cd(a): return math.cos(D(a))
def td(a): return math.tan(D(a))
def near(a, b, tol=0.006): return abs(a - b) <= tol * max(abs(b), 1e-9)

comprobar('t4 g1', near(math.hypot(5, 12), n4('g1', 0), 1e-9) and near(5/12, n4('g1', 1), 0.002))
comprobar('t4 g2', near(math.sqrt(1 - 0.36), n4('g2', 0), 1e-9) and near(0.6/0.8, n4('g2', 1), 1e-9))
comprobar('t4 g3', near(135*math.pi/180, n4('g3', 0), 0.002) and near(5*math.pi/6*180/math.pi, n4('g3', 1), 1e-9) and sp.Rational(135, 180) == sp.Rational(3, 4))
comprobar('t4 g4', sp.simplify(sp.sin(sp.pi/3)*sp.cos(sp.pi/6) + sp.cos(sp.pi/3)*sp.sin(sp.pi/6)) == 1 == n4('g4'))
comprobar('t4 g5', 180 < 200 < 270 and sd(200) < 0 and cd(200) < 0 and v4('g5')['ok'] == 0)
comprobar('t4 g6', sp.sin(5*sp.pi/6) == sp.Rational(1, 2) and n4('g6') == 0.5)
comprobar('t4 g7', near(30*td(60), n4('g7'), 0.001))
comprobar('t4 g8', near(math.sqrt(1 - 0.36), n4('g8'), 1e-9))
comprobar('t4 g9', near(4*sd(70), n4('g9', 0), 0.003) and near(4*cd(70), n4('g9', 1), 0.003))
comprobar('t4 g10', 2*5 == n4('g10', 0) and sp.Rational(1, 2)*25*2 == n4('g10', 1))
comprobar('t4 g11', near(-math.sqrt(1 - 9/25), n4('g11', 0), 1e-9) and near(3/5/(-4/5), n4('g11', 1), 1e-9))
c12 = -1/math.sqrt(5); s12 = 2*c12
comprobar('t4 g12', near(s12, n4('g12', 0), 0.002) and near(c12, n4('g12', 1), 0.002) and abs(s12**2 + c12**2 - 1) < 1e-12 and abs(s12/c12 - 2) < 1e-12)
comprobar('t4 g13', sp.simplify(sp.cos(sp.rad(210))*sp.sin(sp.rad(300)) - sp.Rational(3, 4)) == 0 and n4('g13') == 0.75)
comprobar('t4 g14', sp.sin(11*sp.pi/6) == -sp.Rational(1, 2) and sp.cos(7*sp.pi/3) == sp.Rational(1, 2) and (n4('g14', 0), n4('g14', 1)) == (-0.5, 0.5))
xs15 = [a for a in range(0, 360) if abs(sd(a) - 0.5) < 1e-12]
comprobar('t4 g15', xs15 == [30, 150] == sorted(v4('g15')['valores']))
Cg = 180 - 40 - 65; k16 = 12/sd(Cg)
comprobar('t4 g16', Cg == 75 and near(k16*sd(40), n4('g16', 0), 0.002) and near(k16*sd(65), n4('g16', 1), 0.002))
comprobar('t4 g17', near(math.sqrt(81 + 36 - 108*cd(50)), n4('g17'), 0.001))
comprobar('t4 g18', near(math.degrees(math.acos((36 + 49 - 81)/(2*6*7))), n4('g18'), 0.001))
comprobar('t4 g19', near(0.5*8*11*sd(40), n4('g19'), 0.001))
comprobar('t4 g20', math.sqrt(21*8*7*6) == 84 == n4('g20'))
h21 = 50/(math.sqrt(3) - 1)
comprobar('t4 g21', near(h21, n4('g21'), 0.001) and abs(h21/(h21 + 50) - td(30)) < 1e-12)
comprobar('t4 g22', near(math.sqrt(144 + 81 - 216*cd(110)), n4('g22'), 0.001))
comprobar('t4 g23', near(54*sd(50), n4('g23'), 0.001))
comprobar('t4 g24', near(math.degrees(math.atan(0.08)), n4('g24', 0), 0.002) and near(100*td(10), n4('g24', 1), 0.002))
# g25: caso ambiguo
B1 = math.degrees(math.asin(10*sd(40)/8)); B2 = 180 - B1
cs = sorted([8*sd(180 - 40 - Bx)/sd(40) for Bx in (B1, B2)], reverse=True)
comprobar('t4 g25', n4('g25', 0) == 2 and 10*sd(40) < 8 < 10 and near(cs[0], sorted(v4('g25', 1)['valores'])[1], 0.003) and near(cs[1], sorted(v4('g25', 1)['valores'])[0], 0.005))
comprobar('t4 g26', near(10*sd(40), n4('g26', 0), 0.001) and n4('g26', 1) == 10)
comprobar('t4 g27', near(10/(2*sd(60)), n4('g27'), 0.001))
k29 = 100/sd(43)
comprobar('t4 g29', near(k29*sd(75), n4('g29', 0), 0.001) and near(k29*sd(62), n4('g29', 1), 0.001) and 180 - 62 - 75 == 43)
comprobar('t4 g30', near(math.sqrt(36**2 + 48**2 - 2*36*48*cd(80)), n4('g30'), 0.001))
comprobar('t4 g31', near(2*10*sd(18), n4('g31', 0), 0.002) and near(10*cd(18), n4('g31', 1), 0.002) and abs(10/(2*10*sd(18)) - (1 + math.sqrt(5))/2) < 1e-9)
comprobar('t4 g32', near(80/td(25) - 80/td(40), n4('g32'), 0.001))
comprobar('t4 g33', near(6*0.5*36*sd(60), n4('g33'), 0.001) and sp.simplify(54*sp.sqrt(3) - 6*sp.Rational(1, 2)*36*sp.sin(sp.pi/3)) == 0)
t_ = sp.symbols('t'); r34 = sp.solve(t_**2 - sp.Rational(7, 5)*t_ + sp.Rational(12, 25), t_)
comprobar('t4 g34', sorted(r34) == [sp.Rational(3, 5), sp.Rational(4, 5)] and sorted([10*r for r in r34]) == [6, 8] == sorted(v4('g34')['valores']))
comprobar('t4 g35', near(2*math.degrees(math.atan(5/12)), n4('g35'), 0.001))

# teoría y quiz
comprobar('t4 teoría: resolución con hipotenusa 12 y 35°', near(12*sd(35), 6.88, 0.001) and near(12*cd(35), 9.83, 0.001) and abs(6.88**2 + 9.83**2 - 144) < 0.2)
comprobar('t4 teoría: catetos 5 y 12', math.hypot(5, 12) == 13 and near(math.degrees(math.atan(5/12)), 22.62, 0.001) and near(90 - math.degrees(math.atan(5/12)), 67.38, 0.001))
comprobar('t4 teoría: cateto 8 y 40°', near(8*td(40), 6.71, 0.001) and near(8/cd(40), 10.44, 0.001))
comprobar('t4 teoría: pendiente y escalera', near(math.degrees(math.atan(0.08)), 4.57, 0.002) and near(100*td(10), 17.63, 0.002) and near(5*sd(65), 4.53, 0.003) and near(5*cd(65), 2.11, 0.003))
comprobar('t4 teoría: grados-minutos', 35 + 27/60 == 35.45 and 12 + 18/60 == 12.3)
comprobar('t4 teoría: arco y sector', sp.Rational(135, 180) == sp.Rational(3, 4) and 5*180/6 == 150 and 2*5 == 10 and sp.Rational(1, 2)*25*2 == 25)
comprobar('t4 teoría: notables desde triángulos', sp.sin(sp.pi/4) == sp.sqrt(2)/2 and sp.sqrt(1 + 1) == sp.sqrt(2) and sp.sqrt(4 - 1) == sp.sqrt(3) and sp.tan(sp.pi/6) == sp.sqrt(3)/3 and sp.tan(sp.pi/3) == sp.sqrt(3) and all(sp.sin(sp.rad(a)) == sp.sqrt(k)/2 for a, k in [(0, 0), (30, 1), (45, 2), (60, 3), (90, 4)]))
comprobar('t4 teoría: tabla de notables', [sp.sin(sp.rad(a)) for a in (0, 30, 45, 60, 90)] == [0, sp.Rational(1, 2), sp.sqrt(2)/2, sp.sqrt(3)/2, 1] and [sp.cos(sp.rad(a)) for a in (0, 30, 45, 60, 90)] == [1, sp.sqrt(3)/2, sp.sqrt(2)/2, sp.Rational(1, 2), 0])
comprobar('t4 teoría: relación fundamental', abs(math.sqrt(1 - 9/25) - 4/5) < 1e-12 and sp.Rational(1, 5) + sp.Rational(4, 5) == 1 and (sp.Rational(-12, 13))**2 + (sp.Rational(-5, 13))**2 == 1 and sp.Rational(-12, 13)/sp.Rational(-5, 13) == sp.Rational(12, 5))
comprobar('t4 teoría: reducciones', sp.sin(sp.rad(210)) == -sp.Rational(1, 2) and sp.cos(sp.rad(315)) == sp.sqrt(2)/2 and sp.tan(sp.rad(120)) == -sp.sqrt(3) and sp.sin(sp.rad(1110)) == sp.Rational(1, 2) and sp.cos(sp.rad(-60)) == sp.Rational(1, 2) and sp.cos(7*sp.pi/3) == sp.Rational(1, 2) and 1110 - 3*360 == 30)
comprobar('t4 teoría: complementarios y equivalencias', abs(sd(70) - cd(20)) < 1e-12 and all(abs(sd(180 - a) - sd(a)) < 1e-12 and abs(cd(180 - a) + cd(a)) < 1e-12 and abs(sd(180 + a) + sd(a)) < 1e-12 and abs(cd(360 - a) - cd(a)) < 1e-12 and abs(td(90 - a) - 1/td(a)) < 1e-9 and abs(cd(90 + a) + sd(a)) < 1e-12 for a in (20, 33, 71)))
comprobar('t4 teoría: ecuaciones simples', [a for a in range(360) if abs(cd(a) - 0.5) < 1e-12] == [60, 300] and [a for a in range(360) if abs(td(a) - 1) < 1e-9] == [45, 225])
comprobar('t4 teoría: teorema del seno 40°, 65°, 12', near(12/sd(75), 12.423, 0.001) and near(12.423*sd(40), 7.99, 0.003) and near(12.423*sd(65), 11.26, 0.003) and 180 - 40 - 65 == 75)
comprobar('t4 teoría: radio circunscrito', 10/sd(30) == 20.000000000000004 or abs(10/sd(30) - 20) < 1e-9)
comprobar('t4 teoría: caso ambiguo 8, 10, 40°', abs(10*sd(40) - 6.43) < 0.005 and near(B1, 53.46, 0.001) and near(B2, 126.54, 0.001) and near(8*sd(180 - 40 - B1)/sd(40), 12.42, 0.002) and near(8*sd(180 - 40 - B2)/sd(40), 2.90, 0.005))
comprobar('t4 teoría: 0 y 1 solución', 10*sd(40)/5 > 1 and near(10*sd(40)/12, 0.5357, 0.001) and near(math.degrees(math.asin(10*sd(40)/12)), 32.39, 0.002) and 40 + (180 - 32.39) > 180)
comprobar('t4 teoría: coseno LLL 7,5,8', near(math.degrees(math.acos((25 + 64 - 49)/80)), 60, 1e-9) and near(math.degrees(math.acos(88/112)), 38.21, 0.001) and near(180 - 60 - 38.21, 81.79, 0.001))
a_l = math.sqrt(39)
Bl = math.degrees(math.acos((39 + 25 - 49)/(2*a_l*5)))
comprobar('t4 teoría: coseno LAL 7,5,60', abs(a_l**2 - (49 + 25 - 70*0.5)) < 1e-9 and near(Bl, 76.10, 0.001) and near(180 - 60 - Bl, 43.90, 0.001) and near(5/sd(180 - 60 - Bl), 7.21, 0.002) and near(a_l/sd(60), 7.21, 0.002))
comprobar('t4 teoría: clasificar triángulo 4,5,8', 4**2 + 5**2 < 8**2 and 8 < 4 + 5)
comprobar('t4 teoría: demostración del coseno', sp.simplify(sp.expand((sp.Symbol('b')*sp.cos(sp.Symbol('A')) - sp.Symbol('c'))**2 + (sp.Symbol('b')*sp.sin(sp.Symbol('A')))**2) - (sp.Symbol('b')**2 + sp.Symbol('c')**2 - 2*sp.Symbol('b')*sp.Symbol('c')*sp.cos(sp.Symbol('A')))) == 0)
comprobar('t4 teoría: áreas', near(0.5*8*11*sd(40), 28.28, 0.001) and math.sqrt(21*8*7*6) == 84 and abs(0.5*5*8*sd(60) - 10*math.sqrt(3)) < 1e-9 and abs(math.sqrt(10*3*5*2) - 10*math.sqrt(3)) < 1e-9 and near(54*sd(50), 41.37, 0.001) and near(54*math.sqrt(3), 93.53, 0.001))
comprobar('t4 teoría: aplicaciones', near(3/td(40), 3.58, 0.002) and near(50/(math.sqrt(3) - 1), 68.30, 0.001) and near(100/sd(43), 146.63, 0.001) and near(146.63*sd(75), 141.63, 0.001) and near(146.63*sd(62), 129.46, 0.002) and near(math.sqrt(36**2 + 48**2 - 2*36*48*cd(80)), 54.77, 0.001) and near(80/td(25), 171.55, 0.001) and near(80/td(40), 95.34, 0.001) and near(80/td(25) - 80/td(40), 76.2, 0.002))
comprobar('t4 quiz y errores', near(math.sqrt(1 - 0.36)/0.6, 4/3, 1e-12) and sp.cos(sp.rad(210)) == -sp.sqrt(3)/2 and near(10*sd(40), 6.43, 0.002) and near(30*math.sqrt(3), 51.96, 0.001) and abs(math.sin(30) - (-0.988)) < 1e-3 and abs(sd(30) - 0.5) < 1e-12 and abs(sd(60) - 2*sd(30)) > 0.1 and sd(150) > 0 and 4**2 + 5**2 == 41)
# clasificar de notables: las categorías de la actividad coinciden con sympy
CAT = ["1/2", "√2/2", "√3/2", "√3/3", "1", "√3", "−1/2", "−√3/2"]
VAL = [sp.Rational(1, 2), sp.sqrt(2)/2, sp.sqrt(3)/2, sp.sqrt(3)/3, 1, sp.sqrt(3), -sp.Rational(1, 2), -sp.sqrt(3)/2]
FUN = {'sen': sp.sin, 'cos': sp.cos, 'tan': sp.tan}
ok_not = True
for it in datos['ampl']['mates1']['t4']['datos']['notables']['items']:
    fn, ang = it['t'].split(' '); ang = int(ang.replace('°', ''))
    ok_not = ok_not and sp.simplify(FUN[fn](sp.rad(ang)) - VAL[it['c']]) == 0
comprobar('t4 notables: cada razón en su categoría', ok_not)

print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f_ in fallos: print('  FALLO:', f_)
sys.exit(1 if fallos else 0)
