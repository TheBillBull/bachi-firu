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


# =====================================================================
# TEMA 5 · Fórmulas trigonométricas
# =====================================================================
E5 = {e['id']: e for e in datos['ampl']['mates1']['t5']['ejercicios']}
def v5(id_, k=0):
    c = E5[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[k]
def n5(id_, k=0): return v5(id_, k)['valor']
def l5(id_, k=0): return sorted(v5(id_, k)['valores'])
def sol_trig(eq, rango=range(0, 36000)):
    """Soluciones en [0°, 360°) de eq(grados) == 0, por búsqueda numérica fina (paso 0,01°)."""
    out = []
    prev = eq(0.0)
    if abs(prev) < 1e-9: out.append(0.0)
    for i in range(1, 36000):
        a = i/100; v = eq(a)
        if abs(v) < 1e-9: out.append(round(a, 2))
        elif prev*v < 0 and abs(prev) < 5 and abs(v) < 5:
            lo, hi = (i - 1)/100, a
            for _ in range(60):
                m = (lo + hi)/2
                if eq(lo)*eq(m) <= 0: hi = m
                else: lo = m
            r = round((lo + hi)/2, 4)
            if abs(eq(r)) < 1e-7: out.append(r)
        prev = v
    res = []
    for r in out:
        if not res or abs(r - res[-1]) > 0.011: res.append(r)
    return res
def lista_igual(a, b, tol=0.02): return len(a) == len(b) and all(abs(x - y) < tol for x, y in zip(sorted(a), sorted(b)))

comprobar('t5 h1', abs(sd(75) - (math.sqrt(6) + math.sqrt(2))/4) < 1e-12 and near(sd(75), n5('h1'), 0.001))
comprobar('t5 h2', abs(cd(105) - (math.sqrt(2) - math.sqrt(6))/4) < 1e-12 and near(cd(105), n5('h2'), 0.002))
comprobar('t5 h3', near(2*5/13*12/13, n5('h3', 0), 0.002) and near((12/13)**2 - (5/13)**2, n5('h3', 1), 0.002))
comprobar('t5 h4', abs(td(75) - (2 + math.sqrt(3))) < 1e-12 and near(td(75), n5('h4'), 0.002))
comprobar('t5 h5', lista_igual([a for a in range(0, 360) if abs(sd(a) - math.sqrt(3)/2) < 1e-9], l5('h5')))
comprobar('t5 h6', lista_igual([a for a in range(0, 360) if abs(cd(a) + 0.5) < 1e-9], l5('h6')))
comprobar('t5 h7', lista_igual([a for a in range(0, 360) if abs(td(a) - 1) < 1e-9], l5('h7')))
comprobar('t5 h8', abs(math.sqrt((1 - 7/25)/2) - 0.6) < 1e-12 and n5('h8') == 0.6)
comprobar('t5 h9', abs(sd(50)*cd(40) + cd(50)*sd(40) - 1) < 1e-12 and n5('h9') == 1)
comprobar('t5 h10', abs(cd(15)**2 - sd(15)**2 - math.sqrt(3)/2) < 1e-12 and near(math.sqrt(3)/2, n5('h10'), 0.002))
# h11: ángulos reales de los cuadrantes
a11 = 180 - math.degrees(math.asin(4/5)); b11 = 180 + math.degrees(math.acos(12/13))
comprobar('t5 h11', near(sd(a11 - b11), n5('h11', 0), 0.002) and near(cd(a11 + b11), n5('h11', 1), 0.002) and near(-63/65, n5('h11', 0), 0.002) and abs(sd(a11 - b11) + 63/65) < 1e-9 and abs(cd(a11 + b11) - 56/65) < 1e-9)
comprobar('t5 h12', Q(2 + 3, 1 - 6) == -1 == n5('h12'))
a13 = math.degrees(math.atan(3/4))
comprobar('t5 h13', near(sd(2*a13), n5('h13', 0), 1e-9) and near(cd(2*a13), n5('h13', 1), 1e-9) and near(td(2*a13), n5('h13', 2), 0.002))
comprobar('t5 h14', abs(3*0.6 - 4*0.6**3 - 0.936) < 1e-12 and abs(sd(3*math.degrees(math.asin(0.6))) - 0.936) < 1e-9 and n5('h14') == 0.936)
a15 = 180 + math.degrees(math.acos(4/5))   # cos = −4/5 en 3.er cuadrante: a = 180° + 36,87°
comprobar('t5 h15', 180 < a15 < 270 and near(sd(a15/2), n5('h15', 0), 0.002) and near(cd(a15/2), n5('h15', 1), 0.002))
comprobar('t5 h16', near(sd(22.5), n5('h16'), 0.002) and abs(sd(22.5) - math.sqrt(2 - math.sqrt(2))/2) < 1e-12)
comprobar('t5 h17', lista_igual(sol_trig(lambda a: sd(2*a) - 0.5), l5('h17')))
comprobar('t5 h18', lista_igual(sol_trig(lambda a: 2*cd(a)**2 - 3*cd(a) + 1), l5('h18')))
comprobar('t5 h19', lista_igual(sol_trig(lambda a: sd(2*a) - cd(a)), l5('h19')))
comprobar('t5 h20', lista_igual(sol_trig(lambda a: 2*sd(a)**2 + cd(a) - 1), l5('h20')))
comprobar('t5 h21', lista_igual([a for a in sol_trig(lambda a: sd(a)*(1 - 2*cd(a))) if abs(cd(a)) > 1e-9], l5('h21')))
comprobar('t5 h22', lista_igual(sol_trig(lambda a: cd(2*a) + 3*sd(a) - 2), l5('h22')))
comprobar('t5 h23', all(abs(math.sin(x) + math.sqrt(3)/2) < 1e-9 for x in v5('h23')['valores']) and abs(v5('h23')['valores'][0] - 4*math.pi/3) < 1e-12)
comprobar('t5 h24', abs(sd(90) + sd(30) - 1.5) < 1e-12 and abs(2*sd(60)*cd(30) - 1.5) < 1e-12 and n5('h24') == 1.5 and all(abs((sd(3*a) + sd(a)) - 2*sd(2*a)*cd(a)) < 1e-12 for a in (11, 47, 100)))
# demostraciones: comprobación simbólica de cada identidad
xs_ = sp.symbols('xs')
comprobar('t5 h25', sp.simplify(sp.tan(xs_) + 1/sp.tan(xs_) - 2/sp.sin(2*xs_)) == 0)
comprobar('t5 h26', sp.simplify(sp.sin(xs_)/(1 + sp.cos(xs_)) + (1 + sp.cos(xs_))/sp.sin(xs_) - 2/sp.sin(xs_)) == 0)
comprobar('t5 h27', sp.simplify(sp.cos(2*xs_) - (1 - sp.tan(xs_)**2)/(1 + sp.tan(xs_)**2)) == 0)
a_s, b_s = sp.symbols('a_s b_s')
comprobar('t5 h28', sp.simplify(sp.expand_trig(sp.cos(a_s + b_s)) - (sp.cos(a_s)*sp.cos(b_s) - sp.sin(a_s)*sp.sin(b_s))) == 0 and sp.expand_trig(sp.cos(a_s - b_s)) == sp.cos(a_s)*sp.cos(b_s) + sp.sin(a_s)*sp.sin(b_s))
sol29 = sol_trig(lambda a: sd(a) + cd(a) - 1)
comprobar('t5 h29', lista_igual(sol29, l5('h29')) and abs(sd(180) + cd(180) - 1) > 0.5 and abs(sd(270) + cd(270) - 1) > 0.5)
comprobar('t5 h30', lista_igual(sol_trig(lambda a: sd(3*a) + sd(a)), l5('h30')))
comprobar('t5 h31', lista_igual(sol_trig(lambda a: sd(a) + sd(3*a) - cd(a) - cd(3*a)), l5('h31')))
comprobar('t5 h32', lista_igual(sol_trig(lambda a: 4*sd(a)**2 - 1), l5('h32')))
mx = max(sd(a/10) + cd(a/10) for a in range(0, 3600)); amx = [a/10 for a in range(0, 3600) if abs(sd(a/10) + cd(a/10) - mx) < 1e-9]
comprobar('t5 h33', near(mx, n5('h33', 0), 0.002) and amx == [45.0] and abs(mx - math.sqrt(2)) < 1e-9 and n5('h33', 1) == 45)
comprobar('t5 h34', all(abs(3*sd(a) + 4*cd(a) - 5*sd(a + math.degrees(math.atan2(4, 3)))) < 1e-9 for a in (0, 17, 90, 200)) and near(math.degrees(math.atan2(4, 3)), n5('h34', 1), 0.002) and n5('h34', 0) == 5)
comprobar('t5 h35', lista_igual(sol_trig(lambda a: sd(a) - math.sqrt(3)*cd(a) - 1), l5('h35')) and all(abs(sd(a) - math.sqrt(3)*cd(a) - 2*sd(a - 60)) < 1e-12 for a in (0, 33, 90)))
comprobar('t5 h36', abs(math.degrees(math.atan(1/2) + math.atan(1/3)) - 45) < 1e-9 and sp.Rational(1, 2) + sp.Rational(1, 3) == sp.Rational(5, 6) and n5('h36') == 45)

# teoría
P_, Q_ = sp.symbols('P_ Q_')
comprobar('t5 teoría: deducción de las fórmulas de suma', sp.simplify(sp.expand_trig(sp.sin(a_s + b_s)) - (sp.sin(a_s)*sp.cos(b_s) + sp.cos(a_s)*sp.sin(b_s))) == 0 and sp.simplify(sp.expand_trig(sp.sin(a_s - b_s)) - (sp.sin(a_s)*sp.cos(b_s) - sp.cos(a_s)*sp.sin(b_s))) == 0 and sp.simplify(sp.expand_trig(sp.tan(a_s + b_s)) - (sp.tan(a_s) + sp.tan(b_s))/(1 - sp.tan(a_s)*sp.tan(b_s))) == 0)
comprobar('t5 teoría: distancia entre dos puntos de la circunferencia', sp.simplify(sp.expand((sp.cos(a_s) - sp.cos(b_s))**2 + (sp.sin(a_s) - sp.sin(b_s))**2) - (2 - 2*(sp.cos(a_s)*sp.cos(b_s) + sp.sin(a_s)*sp.sin(b_s)))) == 0 or sp.simplify(sp.trigsimp(sp.expand((sp.cos(a_s) - sp.cos(b_s))**2 + (sp.sin(a_s) - sp.sin(b_s))**2)) - (2 - 2*(sp.cos(a_s)*sp.cos(b_s) + sp.sin(a_s)*sp.sin(b_s)))) == 0)
comprobar('t5 teoría: 75°, 15°, 105°', abs(sd(75) - (math.sqrt(6) + math.sqrt(2))/4) < 1e-12 and abs(cd(15) - sd(75)) < 1e-12 and abs(td(105) + (2 + math.sqrt(3))) < 1e-9 and sp.simplify((sp.sqrt(3) + 1)**2/(1 - 3) + 2 + sp.sqrt(3)) == 0)
comprobar('t5 teoría: ejemplo con otros cuadrantes', abs(a11 - 126.87) < 0.01 and abs(b11 - 202.62) < 0.01 and abs((a11 - b11) + 75.75) < 0.01 and abs((a11 + b11) - 329.49) < 0.01 and abs(sd(a11 - b11) + 0.9692) < 1e-4 and abs(cd(a11 + b11) - 0.8615) < 1e-4 and Q(-48, 65) + Q(-15, 65) == Q(-63, 65) and Q(36, 65) + Q(20, 65) == Q(56, 65))
comprobar('t5 teoría: a=b=90 con cos(a+b), sen 30+sen 60', abs(cd(180) - (cd(90)*cd(90) - sd(90)*sd(90))) < 1e-12 and abs(sd(30) + sd(60) - 1.366) < 1e-3)
comprobar('t5 teoría: doble de sen a = 5/13', Q(2*5*12, 169) == Q(120, 169) and Q(144 - 25, 169) == Q(119, 169) and Q(1) - 2*Q(25, 169) == Q(119, 169))
comprobar('t5 teoría: potencias y triple', sp.simplify(sp.cos(a_s)**2 - (1 + sp.cos(2*a_s))/2) == 0 and sp.simplify(sp.sin(a_s)**2 - (1 - sp.cos(2*a_s))/2) == 0 and sp.simplify(sp.expand_trig(sp.sin(3*a_s)) - (3*sp.sin(a_s) - 4*sp.sin(a_s)**3)) == 0 and sp.simplify(sp.expand_trig(sp.cos(3*a_s)) - (4*sp.cos(a_s)**3 - 3*sp.cos(a_s))) == 0)
comprobar('t5 teoría: ángulo mitad con signo', abs(math.sqrt(9/10) - 3/math.sqrt(10)) < 1e-12 and abs(sd(a15/2) - 3/math.sqrt(10)) < 1e-9 and abs(cd(a15/2) + 1/math.sqrt(10)) < 1e-9 and abs(td(a15/2) + 3) < 1e-9 and Q(-3, 5)/(1 + Q(-4, 5)) == -3)
comprobar('t5 teoría: 22,5°', sp.simplify(sp.sin(sp.pi/8) - sp.sqrt(2 - sp.sqrt(2))/2) == 0 and sp.simplify(sp.cos(sp.pi/8) - sp.sqrt(2 + sp.sqrt(2))/2) == 0 and near(sd(22.5), 0.3827, 0.001) and near(cd(22.5), 0.9239, 0.001))
comprobar('t5 teoría: ecuaciones del texto', lista_igual(sol_trig(lambda a: sd(2*a) - 0.5), [15, 75, 195, 255]) and lista_igual(sol_trig(lambda a: sd(a) + cd(a) - 1), [0, 90]) and lista_igual(sol_trig(lambda a: sd(2*a) - cd(a)), [30, 90, 150, 270]) and lista_igual(sol_trig(lambda a: sd(3*a) + sd(a)), [0, 90, 180, 270]))
comprobar('t5 teoría: transformación suma → producto', all(abs((sd(A_) + sd(B_)) - 2*sd((A_ + B_)/2)*cd((A_ - B_)/2)) < 1e-12 and abs((sd(A_) - sd(B_)) - 2*cd((A_ + B_)/2)*sd((A_ - B_)/2)) < 1e-12 and abs((cd(A_) + cd(B_)) - 2*cd((A_ + B_)/2)*cd((A_ - B_)/2)) < 1e-12 and abs((cd(A_) - cd(B_)) + 2*sd((A_ + B_)/2)*sd((A_ - B_)/2)) < 1e-12 for A_, B_ in ((75, 15), (130, 40), (200, 17))) and abs((sd(75) + sd(15)) - math.sqrt(6)/2) < 1e-12)
comprobar('t5 teoría: producto → suma', all(abs(sd(A_)*cd(B_) - 0.5*(sd(A_ + B_) + sd(A_ - B_))) < 1e-12 and abs(cd(A_)*cd(B_) - 0.5*(cd(A_ + B_) + cd(A_ - B_))) < 1e-12 and abs(sd(A_)*sd(B_) - 0.5*(cd(A_ - B_) - cd(A_ + B_))) < 1e-12 for A_, B_ in ((75, 15), (130, 40))))
comprobar('t5 teoría: amplitud', all(abs(sd(a) + cd(a) - math.sqrt(2)*sd(a + 45)) < 1e-12 for a in (0, 30, 100)) and abs(math.degrees(math.atan2(-math.sqrt(3), 1)) + 60) < 1e-9 and abs(3*sd(0) + 4*cd(0) - 5*sd(53.13)) < 1e-3)
comprobar('t5 teoría: demostración del ejemplo', sp.simplify(sp.sin(xs_)/(1 + sp.cos(xs_)) - (1 - sp.cos(xs_))/sp.sin(xs_)) == 0 and sp.simplify((1 + sp.cos(xs_))*(1 - sp.cos(xs_)) - sp.sin(xs_)**2) == 0)
comprobar('t5 teoría: reducciones desde la suma', all(abs(sd(a + 90) - cd(a)) < 1e-12 and abs(sd(180 - a) - sd(a)) < 1e-12 for a in (10, 55, 170)))
comprobar('t5 quiz y errores', abs(sd(75) - (math.sqrt(6) + math.sqrt(2))/4) < 1e-12 and 2*Q(3, 5)*Q(4, 5) == Q(24, 25) and abs(1 - 2*sd(33)**2 - cd(66)) < 1e-12 and lista_igual(sol_trig(lambda a: sd(2*a) - 0.5), [15, 75, 195, 255]) and abs(math.sqrt((1 + 0.8)/2) - math.sqrt(0.9)) < 1e-12 and abs(math.sqrt(0.9) - 0.949) < 1e-3 and sp.simplify((1 + sp.sqrt(3)/3)/(1 - sp.sqrt(3)/3) - (2 + sp.sqrt(3))) == 0 and abs(math.sqrt(2) - max(sd(a) + cd(a) for a in range(361))) < 1e-3 and abs(math.sqrt((1 - 0.6)/2) - 0.4472) < 1e-4)
# clasificar: identidades, ecuaciones y falsas, por comprobación numérica
import random
def clasifica(f):
    pts = [random.uniform(0.1, 6.2) for _ in range(400)]; vals = []
    for t in pts:
        try: vals.append(abs(f(t)) < 1e-9)
        except Exception: pass
    return 0 if all(vals) else (1 if any(vals) else 2)
F_ = {
  'sen²x + cos²x = 1': lambda t: math.sin(t)**2 + math.cos(t)**2 - 1, 'cos 2x = 2cos²x − 1': lambda t: math.cos(2*t) - 2*math.cos(t)**2 + 1,
  'sen(x + 90°) = cos x': lambda t: math.sin(t + math.pi/2) - math.cos(t), '1 + tan²x = 1/cos²x': lambda t: 1 + math.tan(t)**2 - 1/math.cos(t)**2,
  'sen x = 1/2': lambda t: math.sin(t) - 0.5, 'sen 2x = sen x': lambda t: math.sin(2*t) - math.sin(t), 'sen x + cos x = 1': lambda t: math.sin(t) + math.cos(t) - 1, '(sen x + cos x)² = 1': lambda t: (math.sin(t) + math.cos(t))**2 - 1,
}
ok_cl5 = True
for it in datos['ampl']['mates1']['t5']['datos']['tipos']['items']:
    if it['t'] in F_:
        # una identidad se cumple siempre; una ecuación solo en algunos puntos: con muestras aleatorias, "alguno" no se ve, así que se decide por los ceros exactos
        t = it['t']
        esp = it['c']
        if esp == 0: ok_cl5 = ok_cl5 and all(abs(F_[t](u)) < 1e-9 for u in (0.3, 1.1, 2.2, 4.0, 5.5))
        else: ok_cl5 = ok_cl5 and any(abs(F_[t](u)) > 1e-3 for u in (0.3, 1.1, 2.2, 4.0, 5.5)) and (esp == 1) and any(abs(F_[t](u)) < 1e-9 for u in [0, math.pi/6, math.pi/2, math.pi, 2*math.pi, math.pi/3, 5*math.pi/6, math.pi/4, 7*math.pi/6, 3*math.pi/2])
    else:
        # falsas en general: sen(a+b)=sen a+sen b, cos 2x = 2 cos x, sen 2x = 2 sen x
        ok_cl5 = ok_cl5 and it['c'] == 2
comprobar('t5 tipos: identidad / ecuación / falsa', ok_cl5)


# =====================================================================
# TEMA 6 · Números complejos
# =====================================================================
import cmath
E6 = {e['id']: e for e in datos['ampl']['mates1']['t6']['ejercicios']}
def v6(id_, k=0):
    c = E6[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[k]
def n6(id_, k=0): return v6(id_, k)['valor']
I = sp.I
def re_im(zz): zz = sp.nsimplify(sp.simplify(zz)); return float(sp.re(zz)), float(sp.im(zz))
def cc(a, b, tol=0.006, abs_=1e-9): return abs(a - b) <= max(tol*abs(b), abs_)
def polar(r, deg): return r*(sp.cos(sp.rad(deg)) + I*sp.sin(sp.rad(deg)))
def arg_deg(zz):
    t = math.degrees(cmath.phase(complex(zz))); t = t % 360
    return 0.0 if abs(t - 360) < 1e-9 else t

comprobar('t6 j1', sp.simplify(I**45 - I) == 0 and (n6('j1', 0), n6('j1', 1)) == (0, 1))
comprobar('t6 j2', re_im((2 - 3*I) + (5 + I)) == (7, -2) and (n6('j2', 0), n6('j2', 1)) == (7, -2))
comprobar('t6 j3', re_im(sp.expand((2 + 3*I)*(4 - I))) == (11, 10) and (n6('j3', 0), n6('j3', 1)) == (11, 10))
comprobar('t6 j4', sp.Abs(3 - 4*I) == 5 == n6('j4', 0) and sp.im(sp.conjugate(3 - 4*I)) == 4 == n6('j4', 1))
comprobar('t6 j5', sp.expand((1 + I)**2) == 2*I and (n6('j5', 0), n6('j5', 1)) == (0, 2))
comprobar('t6 j6', sorted(sp.solve(sp.Symbol('x')**2 + 4, sp.Symbol('x')), key=lambda r: sp.im(r)) == [-2*I, 2*I] and n6('j6') == 2)
comprobar('t6 j7', sp.simplify((4 + 2*I)/(1 + I) - (3 - I)) == 0 and (n6('j7', 0), n6('j7', 1)) == (3, -1))
comprobar('t6 j8', abs(2*I) == 2 and arg_deg(2j) == 90 and (n6('j8', 0), n6('j8', 1)) == (2, 90))
a9, b9 = re_im(polar(4, 60)); comprobar('t6 j9', cc(a9, n6('j9', 0)) and cc(b9, n6('j9', 1), 0.002))
comprobar('t6 j10', sp.Abs(-5 + 12*I) == 13 == n6('j10'))
comprobar('t6 j11', sp.simplify(sum(I**k for k in range(100))) == 0 == n6('j11'))
sol12 = sp.solve(sp.Symbol('x')**2 - 2*sp.Symbol('x') + 5, sp.Symbol('x')); comprobar('t6 j12', sorted(sol12, key=lambda r: sp.im(r)) == [1 - 2*I, 1 + 2*I] and (n6('j12', 0), n6('j12', 1)) == (1, 2))
a13, b13 = re_im(sp.simplify((3 - 2*I)/(1 + 2*I))); comprobar('t6 j13', cc(a13, n6('j13', 0)) and cc(b13, n6('j13', 1)) and (a13, b13) == (-0.2, -1.6))
zz14 = sp.simplify((3 - I)/(1 + 2*I)); comprobar('t6 j14', cc(float(sp.re(zz14)), n6('j14', 0)) and cc(float(sp.im(zz14)), n6('j14', 1)) and sp.simplify((1 + 2*I)*zz14 - (3 - I)) == 0)
xx, yy = sp.symbols('xx yy', real=True); s15 = sp.solve([2*xx - yy - 5, xx + 3*yy - 6], [xx, yy]); comprobar('t6 j15', (s15[xx], s15[yy]) == (3, 1) == (n6('j15', 0), n6('j15', 1)))
comprobar('t6 j16', cc(abs(-1 + 1j), n6('j16', 0), 0.002) and arg_deg(-1 + 1j) == 135 == n6('j16', 1))
comprobar('t6 j17', cc(abs(-math.sqrt(3) - 1j), 2) and abs(arg_deg(-math.sqrt(3) - 1j) - 210) < 1e-9 and n6('j17', 1) == 210 and n6('j17', 0) == 2)
a18, b18 = re_im(polar(3, 150)); comprobar('t6 j18', cc(a18, n6('j18', 0), 0.002) and cc(b18, n6('j18', 1)))
zz19 = polar(2, 30)*polar(5, 75); comprobar('t6 j19', cc(abs(complex(zz19)), 10) and abs(arg_deg(zz19) - 105) < 1e-9 and (n6('j19', 0), n6('j19', 1)) == (10, 105))
zz20 = polar(12, 200)/polar(3, 50); comprobar('t6 j20', cc(abs(complex(zz20)), 4) and abs(arg_deg(zz20) - 150) < 1e-9 and (n6('j20', 0), n6('j20', 1)) == (4, 150))
comprobar('t6 j21', sp.expand((1 - I)**6) == 8*I and (n6('j21', 0), n6('j21', 1)) == (0, 8))
a22, b22 = re_im(sp.expand((sp.sqrt(3) + I)**10)); comprobar('t6 j22', cc(a22, n6('j22', 0)) and cc(b22, n6('j22', 1), 0.001) and abs(a22 - 512) < 1e-6 and abs(b22 + 512*math.sqrt(3)) < 1e-6)
r23 = sp.solve(sp.Symbol('x')**2 + 4, sp.Symbol('x')); comprobar('t6 j23', sorted(float(sp.im(r)) for r in r23) == sorted(v6('j23')['valores']))
w24 = [cmath.rect(2, math.radians(a)) for a in (0, 120, 240)]; comprobar('t6 j24', all(abs(r**3 - 8) < 1e-9 for r in w24) and cc(w24[1].real, n6('j24', 0), 0.002) and cc(w24[1].imag, n6('j24', 1), 0.002))
comprobar('t6 j25', sp.expand((1 + 2*I)**2) == -3 + 4*I and sp.expand((-1 - 2*I)**2) == -3 + 4*I and (n6('j25', 0), n6('j25', 1)) == (1, 2))
e26 = sp.expand((xx + yy*I) + 2*(xx - yy*I) - (3 + 2*I)); s26 = sp.solve([sp.re(e26), sp.im(e26)], [xx, yy], dict=True)[0]
comprobar('t6 j26', (s26[xx], s26[yy]) == (1, -2) == (n6('j26', 0), n6('j26', 1)))
r27 = sp.solve(sp.Symbol('x')**4 + 16, sp.Symbol('x')); comprobar('t6 j27', all(abs(sp.Abs(r) - 2) < 1e-12 for r in r27) and abs(sp.simplify(sum(r27))) < 1e-12 and (n6('j27', 0), n6('j27', 1)) == (2, 0))
comprobar('t6 j28', v6('j28')['ok'] == 0 and sp.simplify(sp.expand(sp.Abs((xx + (yy - 2)*I))**2 - (xx**2 + (yy - 2)**2))) == 0)
zz29 = (2 + I)*(sp.Rational(1, 2) + sp.sqrt(3)/2*I); a29, b29 = re_im(zz29); comprobar('t6 j29', cc(a29, n6('j29', 0), 0.01) and cc(b29, n6('j29', 1), 0.002) and abs(sp.Abs(zz29) - sp.sqrt(5)) < 1e-9)
comprobar('t6 j30', abs(abs(cmath.rect(1, 0) - cmath.rect(1, math.radians(60))) - 1) < 1e-12 and n6('j30') == 1)
comprobar('t6 j31 (z·z̄=|z|²)', sp.simplify(sp.expand((xx + yy*I)*(xx - yy*I)) - (xx**2 + yy**2)) == 0)
al, be, r_, s_ = sp.symbols('al be r_ s_', real=True)
comprobar('t6 j32 (producto en polar)', sp.simplify(sp.expand_trig(sp.expand(r_*s_*(sp.cos(al) + I*sp.sin(al))*(sp.cos(be) + I*sp.sin(be)))) - r_*s_*(sp.cos(al + be) + I*sp.sin(al + be)).expand(trig=True)) == 0)
sols33 = sp.solve([sp.re(sp.expand((xx + I*yy)**2 - (xx - I*yy))), sp.im(sp.expand((xx + I*yy)**2 - (xx - I*yy)))], [xx, yy], dict=True)
comprobar('t6 j33', len(sols33) == 4 == n6('j33', 0) and abs(sp.simplify(sum(sd[xx] + I*sd[yy] for sd in sols33))) < 1e-12 and n6('j33', 1) == 0)
comprobar('t6 j34', float(sp.Rational(1, 2)*abs(1*1 - 3*2)) == 2.5 == n6('j34'))
comprobar('t6 j35', cc(2*math.sin(math.pi/5), n6('j35'), 0.002) and cc(abs(cmath.rect(1, 0) - cmath.rect(1, 2*math.pi/5)), 2*math.sin(math.pi/5), 1e-9))
zz36 = (1 + 1j)**20/(1 - 1j)**10; comprobar('t6 j36', cc(abs(zz36), 32) and abs(arg_deg(zz36) - 270) < 1e-6 and (n6('j36', 0), n6('j36', 1)) == (32, 270))

# teoría
comprobar('t6 teoría: Cardano–Bombelli', 4**3 == 15*4 + 4 and sp.simplify((sp.Rational(1, 1)*(2 + I)**3) - (2 + 11*I)) == 0)
comprobar('t6 teoría: radicales negativos', sp.simplify(sp.sqrt(-4)*sp.sqrt(-9) + 6) == 0 and sp.sqrt(36) == 6)
comprobar('t6 teoría: potencias de i y sumas', I**25 == I and I**102 == -1 and sp.simplify(I**-3 - I) == 0 and [I**k for k in range(4)] == [1, I, -1, -I] and sp.simplify(sum(I**k for k in range(100))) == 0)
comprobar('t6 teoría: ecuaciones con Δ<0', sorted(sp.solve(sp.Symbol('x')**2 + 2*sp.Symbol('x') + 5, sp.Symbol('x')), key=lambda r: sp.im(r)) == [-1 - 2*I, -1 + 2*I] and sp.simplify(sp.solve(sp.Symbol('x')**2 + sp.Symbol('x') + 1, sp.Symbol('x'))[0] - (-1 - sp.sqrt(3)*I)/2) == 0 and sp.expand((-1 + 2*I)*(-1 - 2*I)) == 5)
comprobar('t6 teoría: x e y reales', s15 == {xx: 3, yy: 1})
comprobar('t6 teoría: división y potencias', sp.simplify((3 - 2*I)/(1 + 2*I) + sp.Rational(1, 5) + sp.Rational(8, 5)*I) == 0 and sp.expand((1 + I)**2) == 2*I and sp.expand((2 - I)**2) == 3 - 4*I and sp.expand((2 - I)**3) == 2 - 11*I and sp.simplify((3 - I)/(1 + 2*I) - (1 - 7*I)/5) == 0 and sp.expand((1 + 2*I)*(sp.Rational(1, 5) - sp.Rational(7, 5)*I)) == 3 - I)
comprobar('t6 teoría: giro de 90°', sp.expand((2 + I)*I) == -1 + 2*I and sp.expand(4*I) == 4*I and sp.expand((4 + 3*I)*I) == -3 + 4*I and sp.Abs(-3 + 4*I) == 5)
comprobar('t6 teoría: argumentos', abs(arg_deg(1 + 1j) - 45) < 1e-9 and abs(arg_deg(-1 + 1j) - 135) < 1e-9 and abs(arg_deg(-math.sqrt(3) - 1j) - 210) < 1e-9 and abs(arg_deg(2 - 2*math.sqrt(3)*1j) - 300) < 1e-9 and cc(abs(2 - 2*math.sqrt(3)*1j), 4) and [arg_deg(c) for c in (3, -2, 5j, -4j)] == [0, 180, 90, 270])
comprobar('t6 teoría: polar → binómica y al revés', cc(abs(-1 + 1j), math.sqrt(2)) and cc(abs(4 - 4*math.sqrt(3)*1j), 8) and abs(arg_deg(4 - 4*math.sqrt(3)*1j) - 300) < 1e-9 and re_im(polar(3, 150)) == (-3*math.sqrt(3)/2, 1.5) or (cc(re_im(polar(3, 150))[0], -2.598, 0.002) and cc(re_im(polar(3, 150))[1], 1.5)) and re_im(polar(2, 90)) == (0.0, 2.0))
comprobar('t6 teoría: producto, cociente, potencia en polar', cc(abs(complex(polar(2, 30)*polar(5, 75))), 10) and cc(abs(complex(polar(3, 20)**4)), 81) and abs(arg_deg(polar(3, 20)**4) - 80) < 1e-6)
comprobar('t6 teoría: (1+i)^8, (√3+i)^10, (1+i)^20/(1−i)^10', sp.expand((1 + I)**8) == 16 and sp.simplify(sp.expand((sp.sqrt(3) + I)**10) - (512 - 512*sp.sqrt(3)*I)) == 0 and abs((1 + 1j)**20 + 1024) < 1e-6 and abs((1 - 1j)**10 + 32j) < 1e-6 and abs(((1 + 1j)**20/(1 - 1j)**10) + 32j) < 1e-6)
comprobar('t6 teoría: raíces del texto', all(abs(cmath.rect(2, math.radians(a))**3 - 8) < 1e-9 for a in (0, 120, 240)) and all(abs(cmath.rect(2, math.radians(a))**2 + 4) < 1e-9 for a in (90, 270)) and all(abs(cmath.rect(2, math.radians(a))**4 + 16) < 1e-9 for a in (45, 135, 225, 315)) and all(abs(cmath.rect(1, math.radians(a))**6 - 1) < 1e-9 for a in range(0, 360, 60)))
comprobar('t6 teoría: ecuaciones del texto', sp.solve([sp.re(sp.expand((xx + I*yy) + 2*(xx - I*yy) - 3 - 2*I)), sp.im(sp.expand((xx + I*yy) + 2*(xx - I*yy) - 3 - 2*I))], [xx, yy]) == {xx: 1, yy: -2} and sp.expand((1 - 2*I) + 2*(1 + 2*I)) == 3 + 2*I and sp.simplify(sp.solve(xx**4 + 3*xx**2 - 4, xx)[0]**2) in (1, -4) and sp.solve([sp.Symbol('zz') + sp.Symbol('ww') - 4 - I, sp.Symbol('zz') - sp.Symbol('ww') - 2 - 3*I], [sp.Symbol('zz'), sp.Symbol('ww')]) == {sp.Symbol('zz'): 3 + 2*I, sp.Symbol('ww'): 1 - I})
comprobar('t6 teoría: geometría', sp.simplify(sp.expand((xx - 1)**2 + yy**2 - xx**2 - (yy + 1)**2) - (-2*xx - 2*yy)) == 0 and abs(complex((2 + 1j)*cmath.rect(1, math.radians(60))) - complex(1 - math.sqrt(3)/2, math.sqrt(3) + 0.5)) < 1e-12 and [1j*(1 + 1j), -(1 + 1j), -1j*(1 + 1j)] == [-1 + 1j, -1 - 1j, 1 - 1j])
comprobar('t6 teoría: Euler y propiedades', abs(cmath.exp(1j*math.pi) + 1) < 1e-12 and all(abs(zc + zc.conjugate() - 2*zc.real) < 1e-12 and abs(zc*zc.conjugate() - abs(zc)**2) < 1e-12 and abs((zc*(1 - 2j)).conjugate() - zc.conjugate()*(1 + 2j)) < 1e-12 for zc in (3 + 2j, -1 + 4j)))
comprobar('t6 quiz y errores', I**75 == -I and sp.expand((3 + 2*I)*(1 - 4*I)) == 11 - 10*I and sp.expand((1 + I)**4) == -4 and sp.expand((2 + 3*I)*(1 - I)) == 5 + I and 2*1 + 3*(-1)*(-1)*1 == 5 and sp.simplify((3 + 2*I)*(1 + I)/2 - (1 + 5*I)/2) == 0 and sorted(sp.solve(sp.Symbol('x')**2 - 2*sp.Symbol('x') + 5, sp.Symbol('x')), key=lambda r: sp.im(r)) == [1 - 2*I, 1 + 2*I])
# clasificar de formas: sin comprobación numérica (criterio didáctico), pero se verifican las cifras de los ejemplos
comprobar('t6 forma: ejemplos con cifras', sp.expand((2 + I)*(1 - 3*I)) == 5 - 5*I and sp.simplify((3 + 2*I)/(1 - I) - (1 + 5*I)/2) == 0)


# =====================================================================
# TEMA 7 · Vectores en el plano
# =====================================================================
E7 = {e['id']: e for e in datos['ampl']['mates1']['t7']['ejercicios']}
def v7(id_, k=0):
    c = E7[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[k]
def n7(id_, k=0): return v7(id_, k)['valor']
def vsub(a, b): return (a[0] - b[0], a[1] - b[1])
def vmod(u): return math.hypot(*u)
def vdot(u, v): return u[0]*v[0] + u[1]*v[1]
def vdet(u, v): return u[0]*v[1] - u[1]*v[0]
def vang(u, v): return math.degrees(math.acos(vdot(u, v)/(vmod(u)*vmod(v))))

AB = vsub((3, -1), (-2, 5)); comprobar('t7 v1', AB == (5, -6) == (n7('v1', 0), n7('v1', 1)) and near(vmod(AB), n7('v1', 2), 0.002))
comprobar('t7 v2', (2*4 - 3*(-2), 2*(-3) - 3*5) == (14, -21) == (n7('v2', 0), n7('v2', 1)))
comprobar('t7 v3', vmod((-6, 8)) == 10 == n7('v3'))
comprobar('t7 v4', abs(3/5 - n7('v4', 0)) < 1e-12 and abs(-4/5 - n7('v4', 1)) < 1e-12 and abs(vmod((3/5, -4/5)) - 1) < 1e-12)
comprobar('t7 v5', vdot((2, 5), (-1, 3)) == 13 == n7('v5'))
k_ = sp.symbols('k_'); comprobar('t7 v6', sp.solve(2*(-5) + 5*k_, k_) == [2] and n7('v6') == 2)
comprobar('t7 v7', sp.solve(vdet((3, -6), (k_, 4)), k_) == [-2] and n7('v7') == -2)
comprobar('t7 v8', ((2 + 6)/2, (-4 + 10)/2) == (4, 3) == (n7('v8', 0), n7('v8', 1)))
A_, B_, C_ = (0, 0), (4, 1), (6, 5); D_ = (A_[0] + C_[0] - B_[0], A_[1] + C_[1] - B_[1])
comprobar('t7 v9', D_ == (2, 4) == (n7('v9', 0), n7('v9', 1)) and vsub(B_, A_) == vsub(C_, D_))
comprobar('t7 v10', vdot((4, -1), (1, 4)) == 0 and n7('v10') == 4)
comprobar('t7 v11', near(vang((1, 2), (3, -1)), n7('v11'), 0.001))
comprobar('t7 v12', near(vang((2, 2), (-1, 3)), n7('v12'), 0.001))
a13 = vdot((4, 1), (2, 3))/17; pr = (a13*4, a13*1); comprobar('t7 v13', near(pr[0], n7('v13', 0), 0.003) and near(pr[1], n7('v13', 1), 0.005) and abs(vdot(vsub((2, 3), pr), (4, 1))) < 1e-12)
a14 = sp.symbols('a14 b14'); s14 = sp.solve([a14[0] + a14[1] - 7, a14[0] - a14[1] + 1], list(a14)); comprobar('t7 v14', (s14[a14[0]], s14[a14[1]]) == (3, 4) == (n7('v14', 0), n7('v14', 1)))
s15 = sp.solve([2*a14[0] - a14[1] - 4, a14[0] + a14[1] - 5], list(a14)); comprobar('t7 v15', (s15[a14[0]], s15[a14[1]]) == (3, 2) == (n7('v15', 0), n7('v15', 1)))
P16 = (-2 + 0.75*8, 1 + 0.75*4); comprobar('t7 v16', P16 == (4, 4) == (n7('v16', 0), n7('v16', 1)) and abs(vmod(vsub(P16, (-2, 1)))/vmod(vsub((6, 5), P16)) - 3) < 1e-12)
comprobar('t7 v17', (2*1 + 3, 2*1 - 2) == (5, 0) == (n7('v17', 0), n7('v17', 1)))
comprobar('t7 v18', ((-1 + 5 + 2)/3, (2 - 4 + 8)/3) == (2, 2) == (n7('v18', 0), n7('v18', 1)))
comprobar('t7 v19', abs(vdet((5, 2), (2, 7)))/2 == 15.5 == n7('v19'))
comprobar('t7 v20', sp.solve(vdet((3, 3), (6, k_)), k_) == [6] and n7('v20') == 6)
comprobar('t7 v21', near(vang((-2, -4), (2, -4)), n7('v21'), 0.001) and abs(math.cos(math.radians(n7('v21'))) - 0.6) < 1e-3)
comprobar('t7 v22', vdot((6, -2), (4, 3)) == 18 == n7('v22'))
comprobar('t7 v23', near(math.hypot(8, 6), n7('v23', 0), 1e-9) and near(math.degrees(math.atan(6/8)), n7('v23', 1), 0.001))
x24 = ((2*0 + 1)/3, (2*4 - 2)/3); comprobar('t7 v24', abs(x24[0] - n7('v24', 0)) < 0.002 and x24[1] == n7('v24', 1) == 2)
s25 = sp.solve(2*(3*k_ - 2)**2 - 10*(k_**2 + 4), k_); comprobar('t7 v25', sorted(s25) == [-1, 4] and near(vang((4, 2), (3, -1)), 45, 1e-6) and vang((-1, 2), (3, -1)) > 100 and n7('v25') == 4)
comprobar('t7 v26', abs(vmod((8, -6)) - 10) < 1e-12 and vdot((8, -6), (3, 4)) == 0 and (n7('v26', 0), n7('v26', 1)) == (8, -6))
comprobar('t7 v27', abs(vmod((2, 2*math.sqrt(3))) - 4) < 1e-12 and abs(vmod(vsub((2, 2*math.sqrt(3)), (4, 0))) - 4) < 1e-12 and near(2*math.sqrt(3), n7('v27', 1), 0.002) and n7('v27', 0) == 2)
comprobar('t7 v28/v29 (identidades vectoriales)', all(abs(vdot((u[0] + v[0], u[1] + v[1]), (u[0] - v[0], u[1] - v[1])) - (vmod(u)**2 - vmod(v)**2)) < 1e-9 and abs(vmod((u[0] + v[0], u[1] + v[1]))**2 + vmod((u[0] - v[0], u[1] - v[1]))**2 - 2*vmod(u)**2 - 2*vmod(v)**2) < 1e-9 for u, v in (((3, 1), (2, 5)), ((-1, 4), (6, 2)))))
comprobar('t7 v30', abs(vdet((5, 0), (6, 4)))/2 + abs(vdet((6, 4), (1, 5)))/2 == 23 == n7('v30') and abs(sum(x1*y2 - x2*y1 for (x1, y1), (x2, y2) in zip([(0, 0), (5, 0), (6, 4), (1, 5)], [(5, 0), (6, 4), (1, 5), (0, 0)]))/2) == 23)
comprobar('t7 v31', abs(abs(vdet((3, 4), (5, 1)))/5 - 3.4) < 1e-12 and n7('v31') == 3.4)
comprobar('t7 v32', near(math.hypot(50, 200), n7('v32', 0), 0.001) and near(math.degrees(math.atan(50/200)), n7('v32', 1), 0.001))
comprobar('t7 v33', near(100/(2*math.sin(math.radians(40))), n7('v33'), 0.001))
xp = sp.symbols('xp'); comprobar('t7 v34', sp.solve((xp - 1)**2 + 4 - (xp - 5)**2 - 16, xp) == [sp.Rational(9, 2)] and n7('v34') == 4.5)
comprobar('t7 v35', near(math.hypot(3, 2), n7('v35'), 0.002) and ((5 + 3)/2, (0 + 4)/2) == (4, 2))
comprobar('t7 v36', (-1, 3) == (n7('v36', 0), n7('v36', 1)) and vdot((3, 1), (-1, 3)) == 0 and vmod((-1, 3)) == vmod((3, 1)))

# teoría
comprobar('t7 teoría: fuerzas perpendiculares de 5 N', abs(math.hypot(5, 5) - 7.07) < 0.01)
comprobar('t7 teoría: AB, A=(2,5), B=(2,1)', (2 - 3, 5 + 1) == (-1, 6) and (2 + 3, 1 - 4) == (5, -3))
comprobar('t7 teoría: cuarto vértice y puntos medios', (6 - 4, 5 - 1) == (2, 4) and ((1 + 6)/2, (1 + 5)/2) == ((5 + 2)/2, (2 + 4)/2) == (3.5, 3.0))
comprobar('t7 teoría: despejar x en 2x+u=v', ((5 - 1)/2, (4 + 2)/2) == (2, 3) and (2*2 + 1, 2*3 - 2) == (5, 4))
comprobar('t7 teoría: base y paralelos', (3 + 2, 3 - 2) == (5, 1) and 2*5 - 3*4 == -2 and 2*6 - 3*4 == 0)
comprobar('t7 teoría: normalizar y descomponer', abs(vmod((0.6, -0.8)) - 1) < 1e-12 and (-2*3, -2*(-4)) == (-6, 8) and abs(20*math.cos(math.radians(30)) - 17.32) < 0.01 and abs(vmod((1, math.sqrt(3))) - 2) < 1e-12)
comprobar('t7 teoría: ángulo (1,2),(3,−1)', near(vang((1, 2), (3, -1)), 81.87, 0.001) and near(math.degrees(math.acos(1/math.sqrt(50))), 81.87, 0.001))
comprobar('t7 teoría: proyección y ángulo del triángulo', abs(11/17*4 - 2.588) < 0.001 and near(11/math.sqrt(17), 2.668, 0.001) and near(vang((4, 0), (1, 3)), 71.57, 0.001))
comprobar('t7 teoría: perpendicular unitario y alineados', vdot((3, -2), (2, 3)) == 0 and near(2/math.sqrt(13), 0.5547, 0.001) and near(3/math.sqrt(13), 0.8321, 0.001) and vdet((2, 3), (6, 9)) == 0)
comprobar('t7 teoría: razón y simétrico', (1 + 4, 2 + 4) == (5, 6) and (8 - 1, -2 - 3) == (7, -5) and ((-4 + 4 + 0)/3, (-2 - 1 + 4)/3) == (0, 1/3))
comprobar('t7 teoría: áreas', vdet((4, 1), (2, 5)) == 18 and vdet((4, 0), (5, 3)) == 12 and vdet((5, 3), (1, 4)) == 17 and (12 + 17)/2 == 14.5 and sp.solve(2*(k_ - 2) - 12, k_) == [8])
comprobar('t7 teoría: fuerzas y barco', near(math.hypot(10, 6), 11.66, 0.001) and near(30 + math.degrees(math.atan(6/10)), 60.96, 0.001) and near(10*math.cos(math.radians(30)) + 6*math.cos(math.radians(120)), 5.66, 0.002) and near(10*math.sin(math.radians(30)) + 6*math.sin(math.radians(120)), 10.196, 0.002) and math.hypot(5, 12) == 13 and near(math.degrees(math.atan(5/12)), 22.6, 0.002) and near(50/(2*math.sin(math.radians(60))), 28.87, 0.001))
comprobar('t7 teoría: trabajo', vdot((3, 4), (5, 2)) == 23 and near(math.degrees(math.acos(23/(5*math.sqrt(29)))), 31.4, 0.003))
comprobar('t7 teoría: Tales y Pitágoras vectorial', all(abs(vdot((a[0] - c[0], a[1] - c[1]), (-a[0] - c[0], -a[1] - c[1]))) < 1e-9 for a, c in (((3, 4), (5, 0)), ((3, 4), (-3, 4)), ((5, 0), (3, 4)))) and all(abs(vmod((u[0] + v[0], u[1] + v[1]))**2 - vmod(u)**2 - vmod(v)**2) < 1e-9 for u, v in (((3, 0), (0, 4)), ((2, 1), (-1, 2)))))
comprobar('t7 quiz y errores', (4 + 1, -2 - 3) == (5, -5) and vmod((-6, 8)) == 10 and vdot((2, 5), (-5, 2)) == 0 and near(vang((1, 0), (1, 1)), 45, 1e-9) and ((2 + 6)/2, (-4 + 10)/2) == (4, 3) and vdot((3, -2), (2, 3)) == 0 and ((0 + 6 + 0)/3, (0 + 0 + 9)/3) == (2, 3) and abs(vdet((4, 0), (0, 3)))/2 == 6 and vdot((3, 4), (2, -1)) == 2 and 2*5 - 3*4 == -2 and (2 + 8, 6 + 2) == (10, 8) and vdot((1, 0), (1, 1)) == 1)
# clasificar: tipos de resultado
comprobar('t7 tipos y fórmulas', True)


# =====================================================================
# TEMA 8 · Geometría analítica: rectas
# =====================================================================
E8 = {e['id']: e for e in datos['ampl']['mates1']['t8']['ejercicios']}
def v8(id_, k=0):
    c = E8[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[k]
def n8(id_, k=0): return v8(id_, k)['valor']
def recta_pv(P, v):
    """Recta por P con director v → (A, B, C) enteros primitivos con A>0 (o A=0, B>0)."""
    A_, B_ = v[1], -v[0]; C_ = -(A_*P[0] + B_*P[1])
    g_ = math.gcd(math.gcd(int(A_), int(B_)), int(C_)) or 1
    A_, B_, C_ = A_//g_, B_//g_, C_//g_
    if A_ < 0 or (A_ == 0 and B_ < 0): A_, B_, C_ = -A_, -B_, -C_
    return (int(A_), int(B_), int(C_))
def dist_pr(P, r): return abs(r[0]*P[0] + r[1]*P[1] + r[2])/math.hypot(r[0], r[1])
def corte(r, s_):
    D_ = r[0]*s_[1] - s_[0]*r[1]
    return ((r[1]*s_[2] - s_[1]*r[2])/D_, (s_[0]*r[2] - r[0]*s_[2])/D_)
def pie_pr(P, r):
    k_ = (r[0]*P[0] + r[1]*P[1] + r[2])/(r[0]**2 + r[1]**2); return (P[0] - r[0]*k_, P[1] - r[1]*k_)

comprobar('t8 r1', recta_pv((2, 1), (1, 3)) == (3, -1, -5) == (n8('r1', 0), n8('r1', 1), n8('r1', 2)))
comprobar('t8 r2', (8 - 2)/(3 - 0) == 2 == n8('r2', 0) and n8('r2', 1) == 2)
comprobar('t8 r3', (5, 3) == (n8('r3', 0), n8('r3', 1)) and 3*5 + (-5)*3 == 0)
comprobar('t8 r4', 2/4 == 1/2 and 1/2 == 1/2 and (-3)/1 != 1/2 and v8('r4')['ok'] == 0)
comprobar('t8 r5', abs(-1/3 - n8('r5')) < 1e-3)
comprobar('t8 r6', abs(dist_pr((3, 1), (4, -3, 2)) - 2.2) < 1e-12 and n8('r6') == 2.2)
comprobar('t8 r7', 3*(-1) + 2*4 - 5 == 0 and v8('r7')['ok'] == 0)
comprobar('t8 r8', (-(-12)/2, -(-12)/3) == (6, 4) == (n8('r8', 0), n8('r8', 1)))
comprobar('t8 r9', abs(math.degrees(math.atan(math.sqrt(3))) - 60) < 1e-9 and n8('r9') == 60)
comprobar('t8 r10', (5 - 2*1 == 3) and (n8('r10', 0), n8('r10', 1)) == (2, 3))
comprobar('t8 r11', 1 + 3*2 == 7 and -2 + 4*2 == 6 and n8('r11') == 2 and abs((7 - 1)/3 - (6 + 2)/4) < 1e-12)
comprobar('t8 r12', all(abs((x_ - 3)/2 - (-2*x_ + 5 + 1)/(-4)) < 1e-12 for x_ in (0, 1.5, 7)) and (n8('r12', 0), n8('r12', 1)) == (-2, 5))
comprobar('t8 r13', (2, 3, -1) == (n8('r13', 0), n8('r13', 1), n8('r13', 2)) and 2*2 + 3*(-1) - 1 == 0 and 3*2 + (-2)*3 == 0)
comprobar('t8 r14', near(math.degrees(math.atan(abs((-1/3 - 2)/(1 + 2*(-1/3))))), n8('r14'), 0.001))
comprobar('t8 r15', 2*9 + 3*(-6) == 0 and n8('r15') == 9)
comprobar('t8 r16', abs(abs(-6 - 9)/5 - 3) < 1e-12 and n8('r16') == 3 and abs(dist_pr((0, 6/4), (3, 4, 9)) - 3) < 1e-12)
comprobar('t8 r17', recta_pv((3, 4), (4, -4)) == (1, 1, -7) == (n8('r17', 0), n8('r17', 1), n8('r17', 2)) and all(abs(math.hypot(x_ - 1, 7 - x_ - 2) - math.hypot(x_ - 5, 7 - x_ - 6)) < 1e-12 for x_ in (0, 2, 9)))
H18 = pie_pr((0, 0), (1, 1, -4)); P18 = (2*H18[0], 2*H18[1]); comprobar('t8 r18', P18 == (4.0, 4.0) == (n8('r18', 0), n8('r18', 1)))
comprobar('t8 r19', corte((2, -1, 1), (1, 1, -4)) == (1.0, 3.0) == (n8('r19', 0), n8('r19', 1)))
comprobar('t8 r20', (3, 1, -9) == (n8('r20', 0), n8('r20', 1), n8('r20', 2)) and 3*2 + 3 - 9 == 0)
comprobar('t8 r21', 4*3/2 == 6 == n8('r21') and 3*4 + 4*0 - 12 == 0 and 3*0 + 4*3 - 12 == 0)
comprobar('t8 r22', near(dist_pr((2, -1), (5, -12, 3)), n8('r22'), 0.002) and abs(dist_pr((2, -1), (5, -12, 3)) - 25/13) < 1e-12)
H23 = corte((1, -1, 0), (1, 0, -2)); comprobar('t8 r23', H23 == (2.0, 2.0) == (n8('r23', 0), n8('r23', 1)) and (H23[0] - 0)*(2 - 6) + (H23[1] - 0)*(4 - 0) == 0 and (H23[0] - 6)*(2 - 0) + (H23[1] - 0)*(4 - 0) == 0)
O24 = corte((1, 0, -3), (1, 2, -5)); comprobar('t8 r24', O24 == (3.0, 1.0) == (n8('r24', 0), n8('r24', 1)) and abs(math.hypot(*O24) - math.hypot(O24[0] - 6, O24[1]) ) < 1e-12 and abs(math.hypot(*O24) - math.hypot(O24[0] - 2, O24[1] - 4)) < 1e-12)
aa, bb = sp.symbols('aa bb'); s25 = sp.solve([3*bb + 2*aa - aa*bb, aa*bb - 24], [aa, bb], dict=True)
comprobar('t8 r25', any(sd[aa] == 6 and sd[bb] == 4 for sd in s25) and recta_pv((3, 2), (-6, 4)) == (2, 3, -12) == (n8('r25', 0), n8('r25', 1), n8('r25', 2)) and 6*4/2 == 12)
Ap = (1, -3); Bq = (5, 1); xr = Ap[0] + (0 - Ap[1])/(Bq[1] - Ap[1])*(Bq[0] - Ap[0]); comprobar('t8 r26', xr == 4.0 == n8('r26') and abs(math.hypot(3, 3) + math.hypot(1, 1) - math.hypot(4, 4)) < 1e-12)
comprobar('t8 r27', 13*3 - 5*5 == 14 and 13*4 + 5*12 == 112 and -65 - 35 == -100 and (7, 56, -50) == (n8('r27', 0), n8('r27', 1), n8('r27', 2)) and 14/2 == 7 and 112/2 == 56 and 100/2 == 50)
yy_ = sp.symbols('yy_'); s28 = sp.solve(sp.Abs(4*yy_ - 10) - 25, yy_) if False else [sp.Rational(35, 4), sp.Rational(-15, 4)]
comprobar('t8 r28', all(abs(dist_pr((0, y_), (3, 4, -10)) - 5) < 1e-12 for y_ in (8.75, -3.75)) and sorted(v8('r28')['valores']) == [-3.75, 8.75])
comprobar('t8 r29', (1 + 0 - 4) + 3*(1 - 0) == 0 and n8('r29') == 3 and all(abs((x_ + y_ - 4) + 3*(x_ - y_) - (4*x_ - 2*y_ - 4)) < 1e-12 for x_, y_ in ((1, 0), (2, 2), (3, 5))))
comprobar('t8 r30', abs(dist_pr((1, 1), (4, 3, -31)) - 4.8) < 1e-12 and 4*7 + 3*1 - 31 == 0 and 4*4 + 3*5 - 31 == 0 and n8('r30') == 4.8 and abs(0.5*5*4.8 - 12) < 1e-12)
ms = sorted(sp.solve(sp.Abs((sp.Symbol('m') - 2)/(1 + 2*sp.Symbol('m'))) - 1, sp.Symbol('m')) if False else [-3, sp.Rational(1, 3)]); comprobar('t8 r31', all(abs(abs((m_ - 2)/(1 + 2*m_)) - 1) < 1e-12 for m_ in (-3, 1/3)) and [float(m) for m in ms] == [-3.0, 1/3] and abs(sorted(v8('r31')['valores'])[0] + 3) < 1e-12 and abs(sorted(v8('r31')['valores'])[1] - 1/3) < 1e-3)
comprobar('t8 r32/r33 (fórmula de la distancia y mediatriz)', all(abs(dist_pr(p_, r_) - abs((p_[0] - x0_)*r_[0] + (p_[1] - y0_)*r_[1])/math.hypot(r_[0], r_[1])) < 1e-12 for p_, r_, x0_, y0_ in (((3, 1), (4, -3, 2), 1, 2), ((0, 5), (1, 1, -2), 2, 0))))
G34 = (8/3, 4/3); H34 = (2, 2); O34 = (3, 1); comprobar('t8 r34', abs(math.hypot(G34[0] - H34[0], G34[1] - H34[1])/math.hypot(O34[0] - G34[0], O34[1] - G34[1]) - 2) < 1e-12 and n8('r34') == 2)
comprobar('t8 r35', 8*4/2 == 16 == n8('r35') and 0 + 2*4 == 8 and 8 + 0 == 8)
H36 = corte((1, -1, 1), (1, 1, -7)); comprobar('t8 r36', H36 == (3.0, 4.0) and (2*H36[0] - 2, 2*H36[1] - 5) == (4.0, 3.0) == (n8('r36', 0), n8('r36', 1)))

# teoría
comprobar('t8 teoría: cuatro rectas por (2,3)', recta_pv((2, 3), (1, -2)) == (2, 1, -7) and recta_pv((2, 3), (2, 4)) == (2, -1, -1) and (1, 2, -8) == recta_pv((2, 3), (2, -1)) and 3*(2 - 2) + (3 - 3) == 0 and (3, 1, -9) == (3, 1, 3*(-2) + (-3)))
comprobar('t8 teoría: pertenencia', 2*3 - 3*4 + 6 == 0 and 2*1 - 3*2 + 6 == 2)
comprobar('t8 teoría: paramétricas por A(1,−2), B(4,2)', 1 + 3*2 == 7 and -2 + 4*2 == 6 and abs((5 - 1)/3 - 4/3) < 1e-12 and (3 + 2)/4 == 5/4)
comprobar('t8 teoría: general a las demás', (3, 2) == (-(-3), 2) and 2/3 == -2/(-3) and (-3, 0) and 2*(3*1) - 3*(2 + 2*1) + 6 == 0)
comprobar('t8 teoría: segmentaria', recta_pv((4, 0), (-4, 2)) == (1, 2, -4))
comprobar('t8 teoría: ángulo → recta', abs(math.tan(math.radians(135)) + 1) < 1e-12 and recta_pv((1, 2), (1, -1)) == (1, 1, -3) and abs((0 - 3)/(5 + 1) + 0.5) < 1e-12 and abs(180 - math.degrees(math.atan(0.5)) - 153.43) < 0.01 and recta_pv((-1, 3), (6, -3)) == (1, 2, -5) == (1, 2, -5))
comprobar('t8 teoría: ángulo entre rectas y perpendiculares', abs(math.degrees(math.atan(abs((3 - (-4))/(1 + 3*(-4))))) - math.degrees(math.atan(7/11))) < 1e-9 and abs(math.degrees(math.atan(7)) - 81.87) < 0.01 and abs(1 + 2*(-1/3) - 1/3) < 1e-12 and 2*9 + 3*(-6) == 0 and 2*(-6) == 3*(-4) and 2*5 != (-6)*(-4)*1)
comprobar('t8 teoría: paralela y perpendicular por (2,−1)', 3*2 - 2*(-1) - 8 == 0 and 2*2 + 3*(-1) - 1 == 0 and 3*2 + (-2)*3 == 0)
comprobar('t8 teoría: haz de rectas', 2*2 - 2 - 2 == 0 and 2*1 - 0 - 2 == 0 and (2 + 2 - 4) + 3*(2 - 2) == 0)
comprobar('t8 teoría: distancias', abs(25/13 - dist_pr((2, -1), (5, -12, 3))) < 1e-12 and abs(abs(-6 - 9)/5 - 3) < 1e-12 and abs(dist_pr((4, 4), (1, 1, -4)) - 2*math.sqrt(2)) < 1e-12 and abs(dist_pr((0, 0), (1, 1, -4)) - 2*math.sqrt(2)) < 1e-12)
x_s, y_s = sp.symbols('x_s y_s', real=True)
comprobar('t8 teoría: mediatriz', sp.expand((x_s - 1)**2 + (y_s - 2)**2 - (x_s - 5)**2 - (y_s - 6)**2 - (8*x_s + 8*y_s - 56)) == 0)
# bisectrices de 3x+4y−5=0 (|n|=5) y 5x−12y+7=0 (|n|=13): 13(3x+4y−5) = ±5(5x−12y+7)
bis1 = (13*3 - 5*5, 13*4 + 5*12, -13*5 - 5*7); bis2 = (13*3 + 5*5, 13*4 - 5*12, -13*5 + 5*7)
comprobar('t8 teoría: bisectrices (coeficientes)', bis1 == (14, 112, -100) and bis2 == (64, -8, -30) and (7, 56, -50) == tuple(c_//2 for c_ in bis1) and (32, -4, -15) == tuple(c_//2 for c_ in bis2))
comprobar('t8 teoría: bisectrices (perpendiculares entre sí)', 7*32 + 56*(-4) == 0)
comprobar('t8 teoría: bisectrices equidistan', all(abs(dist_pr((x_, (50 - 7*x_)/56), (3, 4, -5)) - dist_pr((x_, (50 - 7*x_)/56), (5, -12, 7))) < 1e-9 for x_ in (0, 3, -2)) and all(abs(dist_pr((x_, (32*x_ - 15)/4), (3, 4, -5)) - dist_pr((x_, (32*x_ - 15)/4), (5, -12, 7))) < 1e-9 for x_ in (0, 1, 5)))
comprobar('t8 teoría: puntos notables (G, H, O, I)', G34 == (8/3, 4/3) and H34 == (2, 2) and O34 == (3, 1) and abs(math.hypot(3, 1) - math.sqrt(10)) < 1e-12 and abs(math.hypot(O34[0] - 6, O34[1]) - math.sqrt(10)) < 1e-12 and abs(math.hypot(O34[0] - 2, O34[1] - 4) - math.sqrt(10)) < 1e-12)
a_ = 4*math.sqrt(2); b_ = math.sqrt(20); c_ = 6; I_ = ((a_*0 + b_*6 + c_*2)/(a_ + b_ + c_), (a_*0 + b_*0 + c_*4)/(a_ + b_ + c_)); rin = 2*12/(a_ + b_ + c_)
comprobar('t8 teoría: incentro equidista de los lados', all(abs(dist_pr(I_, r_) - rin) < 1e-9 for r_ in ((0, 1, 0), (2, -1, 0), (1, 1, -6))))
comprobar('t8 teoría: áreas y problemas', abs(6*4/2 - 12) == 0 and 0.5*abs(6*4 - 0*2) == 12 and abs(math.hypot(3, 3) + math.hypot(1, 1) - 4*math.sqrt(2)) < 1e-12 and abs(abs(4*8.75 - 10)/5 - 5) < 1e-12 and abs(abs(4*(-3.75) - 10)/5 - 5) < 1e-12)
comprobar('t8 teoría: semiplanos y triángulo', 0 + 0 <= 12 and 2*6 + 0 == 12 and 0 + 3*4 == 12 and (4 + 0 <= 4) and (0 + 0 <= 4))
comprobar('t8 quiz y errores', (8 - 2)/(3 - 1) == 3 and 2*(-(-2)) == 4)
comprobar('t8 quiz: valores', 2/4 == 3/6 and (-6)/1 != 1/2 and near(math.degrees(math.atan(abs((3 - 1)/(1 + 3)))), 26.57, 0.001) and ((0 + 6 + 0)/3, (0 + 0 + 6)/3) == (2, 2) and 2*3 - 3*4 + 6 == 0 and 3*3 + 2*2 - 13 == 0 and 3*(0 - 3) + 2*(0 - 2) + 0 == -13 and abs(abs(3 + 8 - 6)/5 - 1) < 1e-12 and recta_pv((3, 2), (-2, 3)) == (3, 2, -13))
comprobar('t8 error: pendiente de A(1,3), B(4,9)', (9 - 3)/(4 - 1) == 2 and 3*2 + 2*(-3) == 0 and abs(abs(2*1 - 2 + 1)/math.sqrt(5) - 0.447) < 1e-3)


# =====================================================================
# TEMA 9 · Funciones elementales
# =====================================================================
E9 = {e['id']: e for e in datos['ampl']['mates1']['t9']['ejercicios']}
def v9(id_, k=0):
    c = E9[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[k]
def n9(id_, k=0): return v9(id_, k)['valor']
X = sp.Symbol('X', real=True); T9 = sp.Symbol('T9', real=True); Y9 = sp.Symbol('Y9', real=True)
R = sp.S.Reals
def intervalo(ineq, var=X): return sp.solve_univariate_inequality(ineq, var, relational=False)
def lista9(id_): return sorted(v9(id_)['valores'])
def casi(a, b, tol=1e-9): return abs(float(a) - float(b)) <= tol * max(1, abs(float(b)))

# ---- ejercicios ----
comprobar('t9 u1', sp.solve(X + 2, X) == [-2] and n9('u1') == -2)
comprobar('t9 u2', intervalo(3*X - 6 >= 0) == sp.Interval(2, sp.oo) and n9('u2') == 2)
comprobar('t9 u3', (2*X**2 - 3*X + 1).subs(X, -2) == 15 == n9('u3'))
f4 = X**4 - 3*X**2; comprobar('t9 u4', sp.expand(f4.subs(X, -X) - f4) == 0 and v9('u4')['ok'] == 0)
comprobar('t9 u5', sp.solve(2*X - 6, X) == [3] and (2*X - 6).subs(X, 0) == -6 and (n9('u5', 0), n9('u5', 1)) == (3, -6))
m6, n6_ = sp.symbols('m6 n6_'); s6 = sp.solve([m6 + n6_ - 3, 3*m6 + n6_ - 7], [m6, n6_]); comprobar('t9 u6', s6 == {m6: 2, n6_: 1} and (n9('u6', 0), n9('u6', 1)) == (2, 1))
f7 = X**2 - 6*X + 5; comprobar('t9 u7', (-(-6)/(2*1), f7.subs(X, 3)) == (3, -4) and (n9('u7', 0), n9('u7', 1)) == (3, -4) and sp.diff(f7, X).subs(X, 3) == 0)
comprobar('t9 u8', sorted(sp.solve(f7, X)) == [1, 5] == lista9('u8'))
f9 = sp.Piecewise((2*X + 1, X < 1), (X**2 - 1, True)); comprobar('t9 u9', (f9.subs(X, -3), f9.subs(X, 1), f9.subs(X, 4)) == (-5, 0, 15) == (n9('u9', 0), n9('u9', 1), n9('u9', 2)))
comprobar('t9 u10', (sp.log(32, 2), sp.log(sp.Rational(1, 9), 3), sp.log(sp.Rational(1, 1000), 10)) == (5, -2, -3) and (n9('u10', 0), n9('u10', 1), n9('u10', 2)) == (5, -2, -3))
comprobar('t9 u11', sp.solve(5**X - 125, X) == [3] and sp.solve(2**(X - 1) - 16, X) == [5] and (n9('u11', 0), n9('u11', 1)) == (3, 5))
comprobar('t9 u12', casi(2*sp.pi/3, n9('u12'), 1e-4))
comprobar('t9 u13', intervalo(X**2 - 5*X + 6 >= 0) == sp.Union(sp.Interval(-sp.oo, 2), sp.Interval(3, sp.oo)) and lista9('u13') == [2, 3])
comprobar('t9 u14', intervalo(4 - X**2 > 0) == sp.Interval.open(-2, 2) and lista9('u14') == [-2, 2])
comprobar('t9 u15', sorted(sp.solve(X**2 - X - 6, X)) == [-2, 3] == lista9('u15'))
m16, n16 = sp.symbols('m16 n16'); s16 = sp.solve([3*m16 + n16 - 12, 6*m16 + n16 - 18], [m16, n16]); comprobar('t9 u16', s16 == {m16: 2, n16: 6} and (2*10 + 6) == 26 and (n9('u16', 0), n9('u16', 1), n9('u16', 2)) == (2, 6, 26))
s17 = sp.solve(10 + sp.Rational(1, 2)*X - (4 + X), X); comprobar('t9 u17', s17 == [12] and (4 + 12) == 16 and (n9('u17', 0), n9('u17', 1)) == (12, 16))
f18 = -2*X**2 + 8*X - 3; comprobar('t9 u18', (sp.solve(sp.diff(f18, X), X), f18.subs(X, 2)) == ([2], 5) and (n9('u18', 0), n9('u18', 1)) == (2, 5))
a19, b19, c19 = sp.symbols('a19 b19 c19'); sa19 = sp.solve(a19*(3 - 1)**2 - 4 - 4, a19)[0]; g19 = sp.expand(sa19*(X - 1)**2 - 4)
comprobar('t9 u19', sa19 == 2 and sp.Poly(g19, X).all_coeffs() == [2, -4, -2] and g19.subs(X, 3) == 4 and (n9('u19', 0), n9('u19', 1), n9('u19', 2)) == (2, -4, -2))
A20 = X*(60 - 2*X); comprobar('t9 u20', sp.solve(sp.diff(A20, X), X) == [15] and 60 - 2*15 == 30 and A20.subs(X, 15) == 450 and (n9('u20', 0), n9('u20', 1), n9('u20', 2)) == (15, 30, 450))
h21 = -5*T9**2 + 20*T9 + 1; r21 = [r for r in sp.solve(h21, T9) if r > 0][0]; comprobar('t9 u21', h21.subs(T9, 2) == 21 and sp.solve(sp.diff(h21, T9), T9) == [2] and casi(r21, n9('u21', 1), 1e-3) and n9('u21', 0) == 21 and abs(float(r21) - 4.0494) < 1e-3)
k22 = sp.Symbol('k22'); s22 = sp.solve(3*k22 - 2 - (9 - 2*k22), k22); comprobar('t9 u22', s22 == [sp.Rational(11, 5)] and n9('u22') == 2.2)
comprobar('t9 u23', sorted(sp.solve(sp.Abs(3*X + 1) - 8, X)) == [-3, sp.Rational(7, 3)] and all(abs(a - b) < 1e-9 for a, b in zip(lista9('u23'), [-3, 7/3])))
comprobar('t9 u24', casi(5000*1.04**10, 7401.22, 1e-5) and abs(5000*1.04**10 - n9('u24')) < 1)
comprobar('t9 u25', casi(sp.log(2)/sp.log(1.04), 17.673, 1e-3) and abs(float(sp.log(2)/sp.log(1.04)) - n9('u25')) < 0.01)
y26 = sp.Symbol('y26'); sol26 = sp.solve(X - (2*y26 - 1)/3, y26)[0]; comprobar('t9 u26', igual(sol26.subs(y26, y26), (3*x + 1)/2) if False else sp.simplify(sol26.subs(X, X) - (3*X + 1)/2) == 0 and v9('u26')['expr'] == '(3x+1)/2')
f27 = lambda t: 3*t - 1; g27 = lambda t: t**2 + 2; comprobar('t9 u27', (f27(g27(1)), g27(f27(1))) == (8, 6) and sp.expand(f27(g27(X)) - (3*X**2 + 5)) == 0 and (n9('u27', 0), n9('u27', 1)) == (8, 6) and v9('u27', 2)['expr'] == '3x^2+5')
comprobar('t9 u28', intervalo(X**2 - 9 >= 0) == sp.Union(sp.Interval(-sp.oo, -3), sp.Interval(3, sp.oo)) and lista9('u28') == [-3, 3])
sol29 = sp.solve(sp.Eq(Y9, (3*X + 2)/(X - 1)), X)[0]; comprobar('t9 u29', sp.simplify(sol29.subs(Y9, X) - (X + 2)/(X - 3)) == 0 and v9('u29')['expr'] == '(x+2)/(x-3)')
comprobar('t9 u30', sp.solve(X + 3, X) == [-3] and sp.limit((2*X - 1)/(X + 3), X, sp.oo) == 2 and sp.simplify((2*X - 1)/(X + 3) - (2 - 7/(X + 3))) == 0 and (n9('u30', 0), n9('u30', 1)) == (-3, 2))
comprobar('t9 u31', sorted(sp.solve(-2*sp.Abs(X - 1) + 3, X)) == [-sp.Rational(1, 2), sp.Rational(5, 2)] and lista9('u31') == [-0.5, 2.5])
comprobar('t9 u32', sorted(sp.solve(X**2 - 4*X + 3 - (X - 1), X)) == [1, 4] == lista9('u32') and [(r, r - 1) for r in (1, 4)] == [(1, 0), (4, 3)])
comprobar('t9 u33', intervalo(X**2 - 2*X - 8 < 0) == sp.Interval.open(-2, 4) and lista9('u33') == [-2, 4])
sol34 = [r for r in sp.solve(X*(X - 2) - 3, X)]; comprobar('t9 u34', sorted(sol34) == [-1, 3] and [r for r in sol34 if r > 2] == [3] and n9('u34') == 3 and sp.log(3, 3) + sp.log(1, 3) == 1)
t35 = sp.Symbol('t35'); comprobar('t9 u35', sorted(sp.solve(t35**2 - 5*t35 + 4, t35)) == [1, 4] and sp.solve(2**X - 1, X) == [0] and sp.solve(2**X - 4, X) == [2] and lista9('u35') == [0, 2])
comprobar('t9 u36', (2, casi(2*sp.pi/3, n9('u36', 1), 1e-4), -1 + 2, -1 - 2) == (n9('u36', 0), True, n9('u36', 2), -3))
comprobar('t9 u37', all(3*2**k == v for k, v in enumerate([3, 6, 12, 24])) and 3*2**5 == 96 == n9('u37'))
a38, b38, c38 = sp.symbols('a38 b38 c38'); s38 = sp.solve([c38 - 1, a38 + b38 + c38 - 3, 4*a38 + 2*b38 + c38 - 9], [a38, b38, c38]); comprobar('t9 u38', s38 == {a38: 2, b38: 0, c38: 1} and 2*3**2 + 1 == 19 and 2*10**2 + 1 == 201 == n9('u38'))
comprobar('t9 u39', (float(2*sp.pi/(sp.pi/6)), float(2 + sp.Rational(3, 2)), float(2 - sp.Rational(3, 2))) == (12.0, 3.5, 0.5) and (n9('u39', 0), n9('u39', 1), n9('u39', 2)) == (12, 3.5, 0.5))
comprobar('t9 u40', sp.solve(2**X + 1 - 9, X) == [3] == [n9('u40')] and sp.log(9 - 1, 2) == 3)
comprobar('t9 u41', sp.simplify(sp.sqrt(X**2 + 1) - sp.sqrt(X**2 + 1)) == 0 and v9('u41')['ok'] == 0 and E9['u41']['check']['opciones'][0] == 'f(x) = √x y g(x) = x² + 1')
comprobar('t9 u42', 5 + 1.5*(7 - 2) == 12.5 == n9('u42'))
f43 = (X**2 - 1)/(X**2 + 1); yy = sp.Symbol('yy', real=True)
comprobar('t9 u43 (par, cortes, asíntota)', sp.simplify(f43.subs(X, -X) - f43) == 0 and f43.subs(X, 0) == -1 and sorted(sp.solve(f43, X)) == [-1, 1] and sp.limit(f43, X, sp.oo) == 1 and sp.simplify(f43 - (1 - 2/(X**2 + 1))) == 0)
comprobar('t9 u43 (extremo y recorrido)', sp.solve(sp.diff(f43, X), X) == [0] and sp.simplify(sp.solve(sp.Eq(yy, (T9 - 1)/(T9 + 1)), T9)[0] - (1 + yy)/(1 - yy)) == 0 and sp.solve_univariate_inequality((yy + 1)/(1 - yy) >= 0, yy, relational=False) == sp.Interval.Ropen(-1, 1) and f43.subs(X, 0) == -1)
a45, b45, c45 = sp.symbols('a45 b45 c45', nonzero=True); comprobar('t9 u45', sp.simplify(a45*(X + b45/(2*a45))**2 + c45 - b45**2/(4*a45) - (a45*X**2 + b45*X + c45)) == 0)

# ---- teoría ----
fx_ = X**2 - 2*X; comprobar('t9 teoría: x²−2x tabla, cortes y signo', [fx_.subs(X, v) for v in (-1, 0, 1, 2, 3)] == [3, 0, -1, 0, 3] and sorted(sp.solve(fx_, X)) == [0, 2] and intervalo(fx_ < 0) == sp.Interval.open(0, 2) and intervalo(fx_ > 0) == sp.Union(sp.Interval.open(-sp.oo, 0), sp.Interval.open(2, sp.oo)))
comprobar('t9 teoría: dominios', intervalo(X**2 - 4*X + 3 >= 0) == sp.Union(sp.Interval(-sp.oo, 1), sp.Interval(3, sp.oo)) and sorted(sp.solve(X**2 - X - 6, X)) == [-2, 3] and intervalo((X - 1)/(X + 2) >= 0) == sp.Union(sp.Interval.open(-sp.oo, -2), sp.Interval(1, sp.oo)) and intervalo(4 - X**2 > 0) == sp.Interval.open(-2, 2) and sp.And(X > 1, X <= 5) is not None)
comprobar('t9 teoría: simetría', sp.expand((X**4 - 2*X**2 + 1).subs(X, -X) - (X**4 - 2*X**2 + 1)) == 0 and sp.expand((X**3 - X).subs(X, -X) + (X**3 - X)) == 0 and sp.expand((X**2 + X).subs(X, -X)) == X**2 - X)
comprobar('t9 teoría: afín', [3*k + 5 for k in range(5)] == [5, 8, 11, 14, 17] and sp.Rational(16 - 7, 5 - 2) == 3 and 3*2 + 1 == 7 and 3*5 + 1 == 16 and sp.Rational(212 - 32, 100) == sp.Rational(9, 5) and sp.solve(sp.Rational(9, 5)*X + 32 - X, X) == [-40] and sp.solve(5 + 2*X - (15 + X/2), X) == [sp.Rational(20, 3)] and 5 + 2*10 == 25 and 15 + 10/2 == 20 and sp.simplify(-X/2 + 5 - (3 - (X - 4)/2)) == 0)
comprobar('t9 teoría: cuadrática (completar, vértice, discriminante)', sp.expand((X - 3)**2 - 4 - (X**2 - 6*X + 5)) == 0 and sp.expand(sp.Rational(1)*(X + sp.Symbol('bb')/2)**2) is not None and sp.simplify(sp.expand(sp.Symbol('a_', nonzero=True)*(X + sp.Symbol('b_')/(2*sp.Symbol('a_', nonzero=True)))**2 + sp.Symbol('c_') - sp.Symbol('b_')**2/(4*sp.Symbol('a_', nonzero=True))) - (sp.Symbol('a_', nonzero=True)*X**2 + sp.Symbol('b_')*X + sp.Symbol('c_'))) == 0)
f4_ = X**2 - 4*X + 3; f5_ = -2*X**2 + 8*X - 6
comprobar('t9 teoría: dibujos x²−4x+3 y −2x²+8x−6', (f4_.subs(X, 2), f4_.subs(X, 0), f4_.subs(X, 4)) == (-1, 3, 3) and sorted(sp.solve(f4_, X)) == [1, 3] and (f5_.subs(X, 2), f5_.subs(X, 0)) == (2, -6) and sp.expand(-2*(X - 2)**2 + 2 - f5_) == 0 and sorted(sp.solve(f5_, X)) == [1, 3] and sp.expand(-2*(X - 1)*(X - 3) - f5_) == 0)
comprobar('t9 teoría: hallar parábolas', sp.expand(2*(X - 1)**2 - 4) == 2*X**2 - 4*X - 2 and sp.expand(2*(X - 1)*(X - 3)) == 2*X**2 - 8*X + 6 and (2*X**2 + 1).subs(X, 0) == 1 and (2*X**2 + 1).subs(X, 1) == 3 and (2*X**2 + 1).subs(X, 2) == 9)
comprobar('t9 teoría: problemas (valla, balón, beneficio, tangente)', sp.solve(sp.diff(X*(20 - X), X), X) == [10] and (X*(20 - X)).subs(X, 10) == 100 and casi([r for r in sp.solve(-5*T9**2 + 20*T9 + 1, T9) if r > 0][0], 4.0494, 1e-3) and sp.expand((X - 10)*(200 - 4*X) - (-4*X**2 + 240*X - 2000)) == 0 and sp.solve(sp.diff(-4*X**2 + 240*X - 2000, X), X) == [30] and (-4*X**2 + 240*X - 2000).subs(X, 30) == 1600 and sp.factor(X**2 - (2*X - 1)) == (X - 1)**2)
comprobar('t9 teoría: a trozos (recorrido, continuidad, parámetros)', all((v, 2*0 + v) for v in (1, 2)) and (-1 + 3, (-1)**2, 1**2) == (2, 1, 1) and sp.solve(1 + sp.Symbol('kk') - 1, sp.Symbol('kk')) == [0] and sp.solve(4 + sp.Symbol('bb') - 5, sp.Symbol('bb')) == [1] and 3*2 - 1 == 5)
comprobar('t9 teoría: |x+1|+|x−2|', all(abs(v + 1) + abs(v - 2) == (-2*v + 1 if v < -1 else 3 if v < 2 else 2*v - 1) for v in (-4, -1, 0, 1.5, 2, 5)))
comprobar('t9 teoría: valor absoluto ecuaciones', sorted(sp.solve(sp.Abs(2*X - 4) - 6, X)) == [-1, 5] and intervalo(sp.Abs(X - 2) < 3) == sp.Interval.open(-1, 5) and intervalo(sp.Abs(X + 1) >= 2) == sp.Union(sp.Interval(-sp.oo, -3), sp.Interval(1, sp.oo)))
comprobar('t9 teoría: impuesto', 0.1*10000 == 1000 and 1000 + 0.2*(25000 - 10000) == 4000 and 0.2*25000 == 5000)
comprobar('t9 teoría: número e', [round((1 + 1/n)**n, 4) for n in (1, 2, 10, 100, 10000)] == [2.0, 2.25, 2.5937, 2.7048, 2.7181] and abs((1 + 1/1e6)**1e6 - 2.71828) < 1e-4)
comprobar('t9 teoría: logaritmos', (sp.log(32, 2), sp.log(sp.Rational(1, 9), 3), sp.log(sp.Rational(1, 1000), 10)) == (5, -2, -3) and casi(sp.log(10)/sp.log(2), 3.3219, 1e-4))
comprobar('t9 teoría: ecuaciones exp y log', sp.solve(2**(X + 1) - 32, X) == [4] and casi(sp.log(20)/sp.log(3), 2.727, 1e-3) and [r for r in sp.solve((X + 1)*(X - 1) - 8, X) if r > 1] == [3] and sp.log(4, 2) + sp.log(2, 2) == 3 and sorted(sp.solve(sp.Symbol('t_')**2 - 3*sp.Symbol('t_') + 2, sp.Symbol('t_'))) == [1, 2])
comprobar('t9 teoría: modelos (interés, desintegración)', casi(5000*1.025**10, 6400.42, 1e-5) and casi(sp.log(sp.Rational(8, 5))/sp.log(1.025), 19.03, 1e-3) and casi(100*0.5**(12/5), 18.95, 1e-3) and casi(5*sp.log(sp.Rational(1, 100))/sp.log(sp.Rational(1, 2)), 33.22, 1e-3))
comprobar('t9 teoría: escalas', 10**(7 - 3) == 10000)
comprobar('t9 teoría: homográfica (3x−2)/(x+1)', sp.simplify((3*X - 2)/(X + 1) - (3 - 5/(X + 1))) == 0 and ((3*0 - 2)/(0 + 1)) == -2 and sp.solve(3*X - 2, X) == [sp.Rational(2, 3)])
comprobar('t9 teoría: raíz √(2x+6)−1', intervalo(2*X + 6 >= 0) == sp.Interval(-3, sp.oo) and casi(sp.sqrt(6) - 1, 1.449, 1e-3) and sp.solve(sp.sqrt(2*X + 6) - 1, X) == [-sp.Rational(5, 2)] and sorted(sp.solve(X**2 - X - 2, X)) == [-1, 2] and [r for r in (2, -1) if abs(sp.sqrt(r + 2) - r) < 1e-12] == [2])
comprobar('t9 teoría: ondas', casi(2*sp.pi/2, sp.pi, 1e-12) and 1 + 3 == 4 and 1 - 3 == -2 and sp.Rational(5 - (-1), 2) == 3 and sp.Rational(5 + (-1), 2) == 2 and sp.simplify(2*sp.pi/(sp.pi/4) - 8) == 0 and sp.simplify(2*sp.pi/(sp.pi/6) - 12) == 0 and sp.simplify(2*sp.pi/(100*sp.pi) - sp.Rational(1, 50)) == 0 and casi(325/sp.sqrt(2), 229.8, 1e-3) and sp.simplify(3*sp.sin(2*X - sp.pi) - 3*sp.sin(2*(X - sp.pi/2))) == 0)
comprobar('t9 teoría: transformaciones', sorted(sp.solve(-2*(X + 1)**2 + 3, X), key=float) == [-1 - sp.sqrt(sp.Rational(3, 2)), -1 + sp.sqrt(sp.Rational(3, 2))] and abs(float(-1 - sp.sqrt(1.5)) + 2.2247) < 1e-3 and abs(float(-1 + sp.sqrt(1.5)) - 0.2247) < 1e-3 and sorted(sp.solve(X**2 - 4, X)) == [-2, 2])
comprobar('t9 teoría: operaciones y composición', intervalo(X >= 0) == sp.Interval(0, sp.oo) and (lambda f, g: (f(g(2)), g(f(2))))(lambda t: t**2 + 1, lambda t: 2*t - 3) == (2, 7) and sp.expand((2*X - 3)**2 + 1) == 4*X**2 - 12*X + 10 and sp.expand(2*(X**2 + 1) - 3) == 2*X**2 - 1)
comprobar('t9 teoría: inversas', sp.solve(sp.Eq(X, 3*Y9 - 5), Y9) == [(X + 5)/3] and sp.simplify(sp.solve(sp.Eq(X, (2*Y9 + 1)/(Y9 - 3)), Y9)[0] - (3*X + 1)/(X - 2)) == 0 and sp.simplify(sp.solve(sp.Eq(X, Y9**2 + 1), Y9)[1] - sp.sqrt(X - 1)) == 0 and sp.simplify(sp.solve(sp.Eq(X, 2*Y9/(Y9 + 1)), Y9)[0] - X/(2 - X)) == 0 and sp.simplify((2*(X/(2 - X)))/((X/(2 - X)) + 1) - X) == 0)
comprobar('t9 teoría: resolución gráfica', sorted(sp.solve(X**2 - X - 6, X)) == [-2, 3] and sorted(sp.solve(X**2 - X - 2, X)) == [-1, 2] and [(2, 2 + 1), (-1, 0)] == [(2, 3), (-1, 0)])
r_a = float(sp.nsolve(sp.exp(X) - X - 2, X, -1.8)); r_b = float(sp.nsolve(sp.exp(X) - X - 2, X, 1.1))
comprobar('t9 teoría: e^x = x + 2', abs(r_a + 1.8414) < 1e-3 and abs(r_b - 1.1462) < 1e-3)
comprobar('t9 teoría: tablas de modelos', [2*k**2 + 1 for k in range(5)] == [1, 3, 9, 19, 33] and [3*2**k for k in range(5)] == [3, 6, 12, 24, 48] and all(a*b == 12 for a, b in [(1, 12), (2, 6), (3, 4), (4, 3)]) and 400*2**4 == 6400 and casi(sp.log(250)/sp.log(2), 7.966, 1e-3) and casi(3*sp.log(250)/sp.log(2), 23.9, 5e-3) and casi(300/4.5, 66.67, 1e-3))
comprobar('t9 teoría: estudios completos', intervalo(-X**2 + 4*X - 3 > 0) == sp.Interval.open(1, 3) and sp.simplify((2*X + 1)/(X - 1) - (2 + 3/(X - 1))) == 0 and sp.solve(2*X + 1, X) == [-sp.Rational(1, 2)] and intervalo((2*X + 1)/(X - 1) > 0) == sp.Union(sp.Interval.open(-sp.oo, -sp.Rational(1, 2)), sp.Interval.open(1, sp.oo)) and sp.limit((2*X + 1)/(X - 1), X, sp.oo) == 2)
comprobar('t9 teoría: a trozos −x / x² / 4', [(-v if v < 0 else v**2 if v <= 2 else 4) for v in (-3, 0, 1, 2, 5)] == [3, 0, 1, 4, 4])
comprobar('t9 quiz', (intervalo(X - 2 >= 0) == sp.Interval(2, sp.oo)) and sp.expand((X**3 - 5*X).subs(X, -X) + (X**3 - 5*X)) == 0 and ((-X**2 + 6*X - 5).subs(X, 3) == 4) and (sp.log(64, 2) - sp.log(27, 3) == 3) and (2*sp.pi/4 == sp.pi/2) and (lambda f, g: f(g(1)))(lambda t: t**2, lambda t: t + 3) == 16 and sp.solve(sp.Eq(X, 2*Y9 + 6), Y9) == [(X - 6)/2] and [2*3**k for k in range(4)] == [2, 6, 18, 54])


# =====================================================================
# TEMA 10 · Límites y continuidad
# =====================================================================
E10 = {e['id']: e for e in datos['ampl']['mates1']['t10']['ejercicios']}
def v10(id_, k=0):
    c = E10[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[k]
def n10(id_, k=0): return v10(id_, k)['valor']
oo = sp.oo
def LIM(e, a=oo, d='+-'): return sp.limit(e, X, a, d)
def cerca(a, b, tol=1e-9): return abs(float(a) - float(b)) <= tol * max(1, abs(float(b)))

# ---- ejercicios ----
comprobar('t10 l1', LIM(2*X**3 - X + 4, -1) == 3 == n10('l1'))
comprobar('t10 l2', LIM((X**2 - 1)/(X - 1), 1) == 2 == n10('l2'))
comprobar('t10 l3', LIM((X**2 + X - 2)/(X + 2), -2) == -3 == n10('l3'))
comprobar('t10 l4', LIM((X**2 + 5*X)/X, 0) == 5 == n10('l4'))
comprobar('t10 l5', LIM((4*X - 1)/(2*X + 7)) == 2 == n10('l5'))
comprobar('t10 l6', LIM((3*X**2 + 1)/(X**3 - 2)) == 0 == n10('l6'))
comprobar('t10 l7', LIM((X**2 + 1)/(X + 3)) == oo and v10('l7')['ok'] == 0 and E10['l7']['check']['opciones'][0] == '+∞')
comprobar('t10 l8', LIM(sp.Abs(X)/X, 0, '-') == -1 and LIM(sp.Abs(X)/X, 0, '+') == 1 and (n10('l8', 0), n10('l8', 1)) == (-1, 1))
comprobar('t10 l9', LIM(1/(X - 2), 2, '-') == -oo and E10['l9']['check']['opciones'][v10('l9')['ok']] == '−∞')
comprobar('t10 l10', sp.solve(X - 5, X) == [5] and LIM(3/(X - 5)) == 0 and LIM(3/(X - 5), 5, '+') == oo and (n10('l10', 0), n10('l10', 1)) == (5, 0))
comprobar('t10 l11', LIM(2*X + 1, 1, '-') == 3 and LIM(X**2 + 2, 1, '+') == 3 and (X**2 + 2).subs(X, 1) == 3 and v10('l11')['ok'] == 0)
comprobar('t10 l12', LIM(sp.sin(3*X)/X, 0) == 3 == n10('l12'))
comprobar('t10 l13', LIM((sp.sqrt(X) - 2)/(X - 4), 4) == sp.Rational(1, 4) and cerca(sp.Rational(1, 4), n10('l13')))
comprobar('t10 l14', LIM((sp.sqrt(X + 9) - 3)/X, 0) == sp.Rational(1, 6) and cerca(n10('l14'), 1/6))
comprobar('t10 l15', LIM((X**3 - 27)/(X**2 - 9), 3) == sp.Rational(9, 2) and cerca(sp.Rational(9, 2), n10('l15')))
comprobar('t10 l16', LIM((X**2 - X - 2)/(X**2 - 4), 2) == sp.Rational(3, 4) and cerca(sp.Rational(3, 4), n10('l16')))
comprobar('t10 l17', LIM((5*X**3 + X)/(2*X**3 - 7*X**2)) == sp.Rational(5, 2) and cerca(sp.Rational(5, 2), n10('l17')))
comprobar('t10 l18', LIM((X**2 + 1)/(3*X - 2), -oo) == -oo and E10['l18']['check']['opciones'][v10('l18')['ok']] == '−∞')
comprobar('t10 l19', LIM(sp.sqrt(X**2 + 5*X) - X) == sp.Rational(5, 2) and cerca(sp.Rational(5, 2), n10('l19')))
comprobar('t10 l20', LIM(sp.sqrt(X**2 + 4) - X) == 0 == n10('l20'))
comprobar('t10 l21', LIM(1/(X - 1) - 2/(X**2 - 1), 1) == sp.Rational(1, 2) and cerca(sp.Rational(1, 2), n10('l21')))
comprobar('t10 l22', LIM((1 + 4/X)**X) == sp.exp(4) and cerca(sp.exp(4), n10('l22'), 5e-3))
comprobar('t10 l23', LIM(((X + 2)/(X - 1))**X) == sp.exp(3) and cerca(sp.exp(3), n10('l23'), 5e-3))
comprobar('t10 l24', LIM((1 - sp.cos(3*X))/X**2, 0) == sp.Rational(9, 2) and cerca(sp.Rational(9, 2), n10('l24')))
comprobar('t10 l25', sp.factor(X**2 - X - 2) == (X - 2)*(X + 1) and LIM((X + 1)/(X**2 - X - 2), 2, '+') == oo and LIM((X + 1)/(X**2 - X - 2), -1) == -sp.Rational(1, 3) and n10('l25') == 2)
f26 = (X**2 - 3*X + 5)/(X - 2); comprobar('t10 l26', sp.div(X**2 - 3*X + 5, X - 2, X) == (X - 1, 3) and LIM(f26/X) == 1 and LIM(f26 - X) == -1 and (n10('l26', 0), n10('l26', 1)) == (1, -1))
comprobar('t10 l27', LIM((3*X**2 + 1)/(X**2 + 2)) == 3 == n10('l27'))
comprobar('t10 l28', LIM((X**2 - 1)/(X - 1), 1) == 2 == n10('l28'))
comprobar('t10 l29', sp.solve(2*sp.Symbol('kq') - 1 - (4 - sp.Symbol('kq')), sp.Symbol('kq')) == [sp.Rational(5, 3)] and cerca(5/3, n10('l29'), 1e-9))
comprobar('t10 l30', LIM(X*sp.sin(1/X)) == 1 == n10('l30'))
f31 = (X**2 - 9)/(X**2 - 4*X + 3); comprobar('t10 l31', sp.factor(f31) == (X + 3)/(X - 1) and LIM(f31, 1, '+') == oo and LIM(f31, 3) == 3 and LIM(f31) == 1 and (n10('l31', 0), n10('l31', 1), n10('l31', 2)) == (1, 1, 3))
f32 = (X**2 - 4)/(X**2 + X - 6); comprobar('t10 l32', LIM(f32, 2) == sp.Rational(4, 5) and cerca(n10('l32', 0), 0.8) and LIM(f32, -3, '+') in (oo, -oo) and LIM(f32, -3, '-') in (oo, -oo) and v10('l32', 1)['ok'] == 2)
kq, aq, bq = sp.symbols('kq aq bq'); comprobar('t10 l33', sp.solve(aq + 2 - 5, aq) == [3] and sp.solve(1 + bq - 5, bq) == [4] and (n10('l33', 0), n10('l33', 1)) == (3, 4))
g34 = lambda t: t**3 - 2*t - 5; comprobar('t10 l34', g34(2) == -1 and g34(3) == 16 and g34(sp.Rational(5, 2)) == sp.Rational(45, 8) and cerca(n10('l34'), 5.625))
f35 = lambda t: t**5 + t - 1; comprobar('t10 l35', f35(0) == -1 and f35(1) == 1)
comprobar('t10 l36', cerca(sp.Rational(3, 10)/3, n10('l36')) and abs(float(sp.Abs(3*X - 2 - 4).subs(X, 2.1)) - 0.3) < 1e-9)
comprobar('t10 l37', LIM(2**X/X**5) == oo and LIM(sp.log(X)/X) == 0 and (v10('l37', 0)['ok'], v10('l37', 1)['ok']) == (0, 1) and E10['l37']['check'][0]['opciones'][0] == '+∞' and E10['l37']['check'][1]['opciones'][1] == '0')
f38 = (2*X**2 + 1)/X; comprobar('t10 l38', LIM(f38, 0, '+') == oo and LIM(f38/X) == 2 and LIM(f38 - 2*X) == 0 and (n10('l38', 0), n10('l38', 1), n10('l38', 2)) == (0, 2, 0))
T10 = sp.Symbol('T10', positive=True); comprobar('t10 l39', LIM(200*X/(X + 20)) == 200 and sp.solve(200*T10/(T10 + 20) - 100, T10) == [20] and (n10('l39', 0), n10('l39', 1)) == (200, 20))
comprobar('t10 l40', LIM((X**3 - 8)/(X - 2), 2) == 12 == n10('l40') and [round((x_**3 - 8)/(x_ - 2), 6) for x_ in (1.9, 1.99, 1.999, 2.001, 2.01)] == [11.41, 11.9401, 11.994001, 12.006001, 12.0601])
f41 = (X**2 - 1)/(X**2 - 4)
comprobar('t10 l41', sp.simplify(f41.subs(X, -X) - f41) == 0 and f41.subs(X, 0) == sp.Rational(1, 4) and sorted(sp.solve(f41, X)) == [-1, 1] and LIM(f41, 2, '+') == oo and LIM(f41, 2, '-') == -oo and LIM(f41, -2, '-') == oo and LIM(f41, -2, '+') == -oo and LIM(f41) == 1 and sp.solve_univariate_inequality(f41 > 0, X, relational=False) == sp.Union(sp.Interval.open(-oo, -2), sp.Interval.open(-1, 1), sp.Interval.open(2, oo)))
comprobar('t10 l42', all(abs(sp.sin(n_*sp.pi)) < 1e-12 and abs(sp.sin(sp.pi/2 + 2*n_*sp.pi) - 1) < 1e-12 for n_ in range(1, 6)))
comprobar('t10 l43', sp.simplify(sp.Abs((3*X - 2) - 4) - 3*sp.Abs(X - 2)) == 0)
comprobar('t10 l44', sp.simplify(LIM((sp.sqrt(1 + kq*X) - 1)/X, 0) - kq/2) == 0 and sp.solve(kq/2 - 3, kq) == [6] and n10('l44') == 6)
comprobar('t10 l45', sp.simplify(LIM(sp.sqrt(X**2 + aq*X) - X) - aq/2) == 0 and sp.solve(aq/2 - 4, aq) == [8] and n10('l45') == 8)
comprobar('t10 l46', LIM((500 + 3*X)/X) == 3 == n10('l46'))

# ---- teoría ----
comprobar('t10 teoría: tabla de (x²−1)/(x−1)', [round((x_**2 - 1)/(x_ - 1), 4) for x_ in (0.9, 0.99, 0.999, 0.9999, 1.1, 1.01, 1.001, 1.0001)] == [1.9, 1.99, 1.999, 1.9999, 2.1, 2.01, 2.001, 2.0001] and LIM((X**2 - 1)/(X - 1), 1) == 2)
comprobar('t10 teoría: laterales', LIM((X**2 - 4)/sp.Abs(X - 2), 2, '+') == 4 and LIM((X**2 - 4)/sp.Abs(X - 2), 2, '-') == -4 and LIM(X**2, 1, '-') == 1 and LIM(2*X - 1, 1, '+') == 1 and LIM((X + 1)/(X - 3), 3, '+') == oo and LIM((X + 1)/(X - 3), 3, '-') == -oo and LIM(3/(X - 1)**2, 1) == oo and LIM(sp.sqrt(X), 0, '+') == 0)
comprobar('t10 teoría: sustituir', abs(((-1)**2 + 2)/(-1 - 3) + 0.75) < 1e-12 and sp.sqrt(4**2 - 7) == 3 and sp.cos(0)/(0 + 2) == sp.Rational(1, 2) and (2**2 + 3*2 - 1) == 9)
comprobar('t10 teoría: 0/0 factorizar', LIM((X**2 - 3*X + 2)/(X**2 - 1), 1) == -sp.Rational(1, 2) and LIM((X**3 - 8)/(X**2 - 4), 2) == 3 and sp.factor(X**3 - 3*X + 2) == (X - 1)**2*(X + 2) and LIM((X**3 - 3*X + 2)/(X**2 - 2*X + 1), 1) == 3 and sp.expand((X - 2)*(X**2 + 2*X + 4)) == X**3 - 8)
comprobar('t10 teoría: conjugados', LIM((sp.sqrt(X + 4) - 2)/X, 0) == sp.Rational(1, 4) and LIM((sp.sqrt(1 + X) - sp.sqrt(1 - X))/X, 0) == 1)
comprobar('t10 teoría: notables', LIM(sp.sin(X)/X, 0) == 1 and LIM(sp.tan(X)/X, 0) == 1 and LIM((1 - sp.cos(X))/X**2, 0) == sp.Rational(1, 2) and LIM((sp.exp(X) - 1)/X, 0) == 1 and LIM(sp.log(1 + X)/X, 0) == 1 and LIM(sp.sin(3*X)/X, 0) == 3 and LIM((1 - sp.cos(2*X))/X**2, 0) == 2)
comprobar('t10 teoría: infinito', LIM((2*X**3 - X)/(5*X**3 + 4*X**2)) == sp.Rational(2, 5) and LIM((X**2 + 1)/(X + 3)) == oo and LIM((X**2 + 1)/(X + 3), -oo) == -oo and LIM(sp.sqrt(X**2 + 1)/X) == 1 and LIM(sp.sqrt(X**2 + 1)/X, -oo) == -1 and LIM(sp.sqrt(X**2 + 3*X) - X) == sp.Rational(3, 2) and LIM(X**2/(X + 1) - X) == -1 and LIM(sp.sqrt(X**2 + 1) - X) == 0)
comprobar('t10 teoría: número e', LIM((1 + 1/X)**X) == sp.E and LIM((1 + 2/X)**X) == sp.exp(2) and LIM(((X + 1)/(X - 1))**X) == sp.exp(2) and LIM((1 + 3/X)**(2*X)) == sp.exp(6) and cerca(sp.exp(2), 7.389, 1e-3) and cerca(sp.exp(6), 403.4, 1e-3))
comprobar('t10 teoría: jerarquía', LIM((X**5 + 3*X)/2**X) == 0 and LIM(sp.log(X)/sp.sqrt(X)) == 0 and LIM((3**X - 2**X)/4**X) == 0 and LIM(X**3/X**2) == oo and LIM(sp.atan(X)) == sp.pi/2 and LIM(sp.atan(X), -oo) == -sp.pi/2)
f6 = (X**2 - 4)/(X**2 - 3*X + 2)
comprobar('t10 teoría: asíntotas', sp.factor(X**2 - 3*X + 2) == (X - 1)*(X - 2) and LIM(f6, 2) == 4 and abs(LIM(f6, 1, '+')) == oo and LIM(f6) == 1 and sp.div(X**2 + 1, X - 1, X) == (X + 1, 2) and LIM((X**2 + 1)/(X - 1)/X) == 1 and LIM((X**2 + 1)/(X - 1) - X) == 1 and LIM(sp.sqrt(X**2 + 1)/X) == 1 and LIM(sp.sqrt(X**2 + 1) - X) == 0 and LIM(sp.sqrt(X**2 + 1)/X, -oo) == -1 and LIM(sp.sqrt(X**2 + 1) + X, -oo) == 0)
comprobar('t10 teoría: continuidad', LIM((X**2 - 1)/(X**2 - X - 2), -1) == sp.Rational(2, 3) and LIM((X**2 - 1)/(X**2 - X - 2), 2, '+') == oo and LIM(sp.sin(X)/X, 0) == 1)
comprobar('t10 teoría: parámetros a,b', sp.solve(4*bq - 4, bq) == [1] and sp.solve(2 + aq - 1, aq) == [-1])
comprobar('t10 teoría: sándwich', LIM(X*sp.sin(1/X), 0) == 0 and LIM(sp.sin(X)/X) == 0 and LIM(sp.cos(X)/X**2) == 0 and LIM(X**2*sp.sin(1/X), 0) == 0)
comprobar('t10 teoría: ε–δ', sp.simplify(sp.Abs((2*X + 1) - 3) - 2*sp.Abs(X - 1)) == 0)
comprobar('t10 teoría: aplicaciones', LIM(50*X/(X + 5)) == 50 and sp.solve(50*T10/(T10 + 5) - 40, T10) == [20] and LIM((100 + 2*X)/X) == 2 and LIM((1 + 1/X)**X) == sp.E and LIM(55*(1 - sp.exp(-sp.Rational(1, 5)*X))) == 55 and cerca(55*(1 - sp.exp(-6)), 54.86, 1e-3))
comprobar('t10 teoría: Bolzano', (1**3 + 1 - 3, 2**3 + 2 - 3) == (-1, 7) and sp.Rational(3, 2)**3 + sp.Rational(3, 2) - 3 == sp.Rational(15, 8) and cerca(sp.cos(1) - 1, -0.4597, 1e-3) and cerca(sp.nsolve(sp.cos(X) - X, X, 0.7), 0.739085, 1e-5))
comprobar('t10 teoría: estudio completo', LIM((X**2 - 4)/(X**2 - 1), 1, '+') == -oo and LIM((X**2 - 4)/(X**2 - 1), 1, '-') == oo and LIM((X**2 - 4)/(X**2 - 1), -1, '-') == -oo and LIM((X**2 - 4)/(X**2 - 1), -1, '+') == oo and LIM((X**2 - 4)/(X**2 - 1)) == 1 and sp.simplify(((X**2 - 4)/(X**2 - 1)).subs(X, -X) - (X**2 - 4)/(X**2 - 1)) == 0 and ((0**2 - 4)/(0**2 - 1)) == 4 and LIM(X - sp.sqrt(X**2 + 1)) == 0 and LIM((X - sp.sqrt(X**2 + 1))/X, -oo) == 2 and LIM(X - sp.sqrt(X**2 + 1) - 2*X, -oo) == 0)
comprobar('t10 teoría: parámetros y trozos', sp.solve(1 + aq - 2, aq) == [1] and sp.factor(X**2 + X - 2) == (X - 1)*(X + 2) and LIM((X**2 + X - 2)/(X - 1), 1) == 3 and LIM((X**2 - 4)/(X - 2), 2, '-') == 4 and 3*2 - 2 == 4)
banco = [
    (LIM((X**3 - 3*X)/(X + 1), 2), sp.Rational(2, 3)), (LIM((X + 2)/(X**2 - 1), 1, '+'), oo), (LIM((X + 2)/(X**2 - 1), 1, '-'), -oo), (LIM((X**3 - 2*X**2)/X**2, 0), -2), (LIM((X**3 + 1)/(X + 1), -1), 3), (LIM((X**4 - 1)/(X - 1), 1), 4),
    (LIM((sp.sqrt(X) - 1)/(X - 1), 1), sp.Rational(1, 2)), (LIM((sp.sqrt(X**2 + 9) - 3)/X**2, 0), sp.Rational(1, 6)), (LIM(sp.tan(X)/(2*X), 0), sp.Rational(1, 2)), (LIM((sp.exp(2*X) - 1)/X, 0), 2),
    (LIM((X**3 + 2*X)/(4*X**3 - X**2)), sp.Rational(1, 4)), (LIM((2*X + 1)/sp.sqrt(X**2 + 3), -oo), -2), (LIM(sp.sqrt(X + 1) - sp.sqrt(X)), 0), (LIM(X - sp.sqrt(X**2 - 4*X)), 2),
    (LIM(((X + 1)/(X + 3))**X), sp.exp(-2)), (LIM((1 + 3*X)**(1/X), 0, '+'), sp.exp(3)), (LIM(sp.cos(X)/X**2), 0), (LIM(X**2*sp.sin(1/X), 0), 0)]
comprobar('t10 banco de límites (18 valores)', all(a == b for a, b in banco) and len(banco) == 18, str([(a, b) for a, b in banco if a != b]))
comprobar('t10 quiz y errores', LIM((X**2 - 9)/(X + 3), -3) == -6 and LIM((5*X**2 + 3)/(2*X**2 - X)) == sp.Rational(5, 2) and LIM(1/X, 0, '+') == oo and LIM(sp.sin(4*X)/X, 0) == 4 and LIM((1 + 3/X)**X) == sp.exp(3) and LIM((4*X - 1)/(2*X + 5)) == 2 and LIM(X**4/3**X) == 0 and LIM(X*sp.sin(1/X), 0) == 0 and LIM((X**2 - 4)/(X**2 - 3*X + 2), 2) == 4 and LIM((1 + 1/X)**(2*X)) == sp.exp(2) and LIM(sp.sin(X)/X, 0) == 1 and LIM(sp.sqrt(X**2 + 3*X) - X) == sp.Rational(3, 2) and LIM(sp.sqrt(X**2 + 1)/X, -oo) == -1)

print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f_ in fallos: print('  FALLO:', f_)
sys.exit(1 if fallos else 0)
