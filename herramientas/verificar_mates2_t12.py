#!/usr/bin/env python3
"""
Verificación independiente (sympy) del tema 12 de Matemáticas II (Integral definida):
  · cada cifra de los ejemplos resueltos de la teoría y de los problemas EvAU,
  · la respuesta de cada ejercicio, recalculada desde el enunciado y comparada con el corrector de la web,
  · los datos de los simuladores (sumas de Riemann, área con cambio de signo, área entre curvas, función integral, valor medio),
  · las respuestas del test, de «encuentra el error» y de las actividades de emparejar y clasificar.
No comparte código con la web.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_mates2_t12.py /tmp/ampl.json [otro.json]
(el volcado de los simuladores se genera aquí con herramientas/volcar_mates2_t12.js; el segundo argumento se ignora)
"""
import json, sys, os, subprocess
import sympy as sp
from sympy import symbols, Rational as Q, sqrt, exp, log, E, pi, sin, cos, integrate, diff, solve, Abs, limit, oo

datos = json.load(open(sys.argv[1]))
_raiz = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
sim = json.loads(subprocess.run(['node', os.path.join(_raiz, 'herramientas', 'volcar_mates2_t12.js')],
                                capture_output=True, text=True, check=True, cwd=_raiz).stdout)
T = datos['ampl']['mates2']['t12']
EJ = {e['id']: e for e in T['ejercicios']}
ok = 0
fallos = []
x, t, y, a, k = symbols('x t y a k', real=True)

def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

def N(v): return float(sp.N(v, 20))
def igual(p, q, tol=2e-3):
    p, q = N(p), N(q); return abs(p - q) <= tol * max(1, abs(q))
def I(f, lo, hi, v=x): return sp.simplify(integrate(f, (v, lo, hi)))
def area(f, lo, hi, v=x):
    """∫|f| partiendo en las raíces reales interiores"""
    ps = sorted({r for r in sp.solveset(f, v, sp.Interval(lo, hi)) if r.is_real and lo < r < hi}, key=N)
    xs = [lo] + ps + [hi]
    return sp.simplify(sum(Abs(integrate(f, (v, xs[i], xs[i + 1]))) for i in range(len(xs) - 1)))
def valor_check(e):
    c = e['check']
    return c.get('valor') if isinstance(c, dict) else None

# ================= EJERCICIOS: valor esperado recalculado desde el enunciado =================
f_a5 = x**5 - x**3 + x
esp = {
    'a1': I(2*x + 1, 1, 3), 'a2': I(sin(x), 0, pi), 'a3': I(exp(x), 0, 1), 'a4': I(4 - x**2, 0, 2),
    'a6': I(sqrt(x), 1, 4), 'a7': I(3*x**2, 0, 2) / 2, 'a8': -(5 + 2),
    'a9': (x**2 + 1).subs(x, 2), 'a10': I(1/x, 1, E), 'a11': area(x - 1, 0, 2),
    'a12': I(2*x - x**2, 0, 2), 'a13': sum(j for j in range(4)) * 1, 'a14': I((x + 1)**3, 0, 1), 'a15': I(5, -1, 3),
    'b1': I(x*exp(x), 0, 1), 'b2': I(log(x), 1, E), 'b3': I(2*x/(x**2 + 1), 0, 1), 'b4': I(x*sqrt(x**2 + 1), 0, 1),
    'b5': area(x**3 - x, -1, 1), 'b6': area(x**2 - 4*x + 3, 0, 3),
    'b8': area(sin(x) - cos(x), 0, pi/2),
    'b9': diff(integrate(exp(-t), (t, 0, x**2)), x).subs(x, 1),
    'b11': limit(integrate(sin(t), (t, 0, x)) / x**2, x, 0), 'b12': sp.sqrt(sp.Rational(4, 3)),
    'b13': area(x**2 - 1, 0, 2), 'b14': I(1/((x + 1)*(x + 2)), 0, 1),
    'b15': Q(1, 2) * sum(Q(m, 4)**2 for m in (1, 3, 5, 7)) / 1,  # puntos medios de [0,2] con n = 4: (2j+1)/4
    'b16': I(x*sin(x), 0, pi), 'b17': area(x**2 - x**3, 0, 1),
    'c1': diff(integrate(sqrt(1 + t**2), (t, 0, x**2)), x).subs(x, 1),
    'c3': limit(integrate(1 - cos(t), (t, 0, x)) / x**3, x, 0),
    'c10': I(x**2*exp(x), 0, 1), 'c13': diff(integrate(1/(1 + t**2), (t, x, x**2)), x).subs(x, 1),
    'c14': I(sqrt(x), 0, 1), 'c16': I(exp(x)/(1 + exp(x)), 0, log(2)),
    'c12': area(x**2 - 2*x, 0, 3), 'c7': area(exp(x) - exp(-x), 0, 1),
}
# a13: suma izquierda de f(x)=x en [0,4], n=4: Δ=1, alturas 0..3
esp['a13'] = Q(4 - 0, 4) * sum(Q(j) for j in range(4))
# b15: Δ=0,5; puntos medios 0,25; 0,75; 1,25; 1,75
esp['b15'] = Q(1, 2) * sum(Q(m, 4)**2 for m in (1, 3, 5, 7))
# c2: mínimo de F(x)=∫0^x (t²−t−2)dt: F'(x)=(x−2)(x+1); mínimo en x=2
Fc2 = integrate(t**2 - t - 2, (t, 0, x)); comprobar('c2 mínimo en x=2 (F′ de − a +)', sp.diff(Fc2, x).subs(x, 1) < 0 < sp.diff(Fc2, x).subs(x, 3))
esp['c2'] = Fc2.subs(x, 2)
# c4: a con ∫0^a (3x²+2x)dx = 12, a>0
sol = [r for r in solve(sp.Eq(I(3*x**2 + 2*x, 0, a, x), 12), a) if r.is_real and r > 0]
comprobar('c4 única solución positiva', len(sol) == 1); esp['c4'] = sol[0]
# c5: parábola y=x², tangente en (2,4), eje Y
tang = sp.diff(x**2, x).subs(x, 2) * (x - 2) + 4
comprobar('c5 tangente y=4x−4', sp.expand(tang - (4*x - 4)) == 0); esp['c5'] = area(x**2 - tang, 0, 2)
# c6: x = y² y x = 3 − 2y, integrando en y
cy = sorted(solve(sp.Eq(y**2, 3 - 2*y), y)); comprobar('c6 cortes y=−3,1', cy == [-3, 1])
esp['c6'] = I(3 - 2*y - y**2, cy[0], cy[1], y)
# c8: 1/x y 1/x², x=e
comprobar('c8 corte x=1', solve(sp.Eq(1/x, 1/x**2), x) == [1]); esp['c8'] = I(1/x - 1/x**2, 1, E)
# c9: a>0 con área entre x² y ax igual a 9/2
sol9 = [r for r in solve(sp.Eq(I(a*x - x**2, 0, a, x), Q(9, 2)), a) if r.is_real and r > 0]; esp['c9'] = sol9[0]
# c11: ln x en [1,e]
mu11 = I(log(x), 1, E) / (E - 1); c11 = [r for r in solve(sp.Eq(log(x), mu11), x) if r.is_real][0]; esp['c11'] = c11
# c15: |x| y 2−x² (cortes ±1)
esp['c15'] = 2 * I(2 - x**2 - x, 0, 1)
comprobar('c15 cortes de |x| y 2−x²: x=1 (x≥0)', solve(sp.Eq(x, 2 - x**2), x).count(1) == 1)
for ident, v in esp.items():
    cv = valor_check(EJ[ident]); comprobar(f'{ident} (valor)', cv is not None and igual(cv, v), f'web={cv} sympy={N(v)}')
# listas y opciones
comprobar('b10 abscisas de extremos {1,3}', sorted(EJ['b10']['check']['valores']) == [1, 3]
          and sorted(r for r in solve(diff(integrate(t**2 - 4*t + 3, (t, 0, x)), x), x)) == [1, 3])
for ident, f in (('a5', f_a5), ('b18', x**2 * sin(x))):
    c = EJ[ident]['check']; comprobar(f'{ident} integral de impar = 0', I(f, -2 if ident == 'a5' else -pi, 2 if ident == 'a5' else pi) == 0 and c['opciones'][c['ok']] == '0')

# ================= TEORÍA: cifras de ejemplos resueltos =================
# Riemann ∫0^1 x² con suma derecha
n = symbols('n', positive=True, integer=True)
Sn = sp.summation((sp.Symbol('i') / n)**2 / n, (sp.Symbol('i'), 1, n)); Sn = sp.simplify(Sn)
comprobar('S_n = (n+1)(2n+1)/(6n²)', sp.simplify(Sn - (n + 1)*(2*n + 1)/(6*n**2)) == 0)
comprobar('S_4 = 45/96', Sn.subs(n, 4) == Q(45, 96) and abs(N(Sn.subs(n, 4)) - 0.46875) < 1e-12)
comprobar('S_10 = 0,385', abs(N(Sn.subs(n, 10)) - 0.385) < 1e-12)
comprobar('S_100 ≈ 0,338', abs(N(Sn.subs(n, 100)) - 0.338350) < 1e-5)
comprobar('lím S_n = 1/3', sp.limit(Sn, n, oo) == Q(1, 3))
si = sp.simplify(sp.summation((sp.Symbol('i') / n)**2 / n, (sp.Symbol('i'), 0, n - 1)))
comprobar('suma izquierda = (n−1)(2n−1)/(6n²)', sp.simplify(si - (n - 1)*(2*n - 1)/(6*n**2)) == 0)
comprobar('lím (1/n)Σ√(k/n) = 2/3', I(sqrt(x), 0, 1) == Q(2, 3))
comprobar('∫−2^2 (x³+3x²) = 16', I(x**3 + 3*x**2, -2, 2) == 16)
# Barrow
comprobar('∫1^4 (√x + 1/x²) = 65/12', I(sqrt(x) + 1/x**2, 1, 4) == Q(65, 12))
comprobar('∫0^1 e^{2x} = (e²−1)/2', sp.simplify(I(exp(2*x), 0, 1) - (E**2 - 1)/2) == 0 and igual((E**2 - 1)/2, 3.195, 1e-3))
comprobar('∫0^{π/4} dx/cos² = 1', I(1/cos(x)**2, 0, pi/4) == 1)
Fb = integrate(sqrt(x) + 1/x**2, x); comprobar('F(4)=16/3−1/4 y F(1)=2/3−1', (Fb.subs(x, 4), Fb.subs(x, 1)) == (Q(16, 3) - Q(1, 4), Q(2, 3) - 1))
# cambio de signo
Fx = x**4/4 - x**2/2
comprobar('F(−1),F(0),F(1),F(2) = −1/4,0,−1/4,2', [Fx.subs(x, v) for v in (-1, 0, 1, 2)] == [-Q(1, 4), 0, -Q(1, 4), 2])
comprobar('trozos 1/4, −1/4, 9/4', [I(x**3 - x, -1, 0), I(x**3 - x, 0, 1), I(x**3 - x, 1, 2)] == [Q(1, 4), -Q(1, 4), Q(9, 4)])
comprobar('neta 9/4 y área 11/4', I(x**3 - x, -1, 2) == Q(9, 4) and area(x**3 - x, -1, 2) == Q(11, 4))
comprobar('x²−4x+3: F(3)=0, F(1)=4/3, área 4/3', (integrate(x**2 - 4*x + 3, x).subs(x, 3), integrate(x**2 - 4*x + 3, x).subs(x, 1), area(x**2 - 4*x + 3, 1, 3)) == (0, Q(4, 3), Q(4, 3)))
comprobar('sen: neta 0, trozos 2 y −2, área 4', (I(sin(x), 0, 2*pi), I(sin(x), 0, pi), I(sin(x), pi, 2*pi), area(sin(x), 0, 2*pi)) == (0, 2, -2, 4))
# entre curvas
comprobar('x² y x+2: cortes −1,2 y área 9/2', solve(sp.Eq(x**2, x + 2), x) == [-1, 2] and I(x + 2 - x**2, -1, 2) == Q(9, 2))
comprobar('F de x+2−x² en 2 y −1: 10/3 y −7/6', (sp.integrate(x + 2 - x**2, x).subs(x, 2), sp.integrate(x + 2 - x**2, x).subs(x, -1)) == (Q(10, 3), -Q(7, 6)))
comprobar('x³ y x: tramos 1/4 y 1/4, área 1/2, neta 0', (I(x**3 - x, -1, 0), I(x - x**3, 0, 1), area(x - x**3, -1, 1), I(x - x**3, -1, 1)) == (Q(1, 4), Q(1, 4), Q(1, 2), 0))
comprobar('x vs x³: x > x³ en 1/2 y x³ > x en −1/2', Q(1, 2) > Q(1, 2)**3 and (-Q(1, 2))**3 > -Q(1, 2))
comprobar('sen y cos: tramos √2−1 y total 2√2−2', sp.simplify(I(cos(x) - sin(x), 0, pi/4) - (sqrt(2) - 1)) == 0 and sp.simplify(I(sin(x) - cos(x), pi/4, pi/2) - (sqrt(2) - 1)) == 0
           and sp.simplify(area(sin(x) - cos(x), 0, pi/2) - (2*sqrt(2) - 2)) == 0 and igual(2*sqrt(2) - 2, 0.828, 1e-3))
comprobar('integrar en y: cortes −1, 2 y 9/2', solve(sp.Eq(y**2, y + 2), y) == [-1, 2] and I(y + 2 - y**2, -1, 2, y) == Q(9, 2))
comprobar('tangente a x²+1 en (1,2) es y=2x; área 1/3', sp.expand(sp.diff(x**2 + 1, x).subs(x, 1)*(x - 1) + 2 - 2*x) == 0 and I(x**2 + 1 - 2*x, 0, 1) == Q(1, 3))
# TFC
xp = sp.Symbol('xp', positive=True); Fl = integrate(log(t), (t, 1, xp**2)); comprobar('F(x)=∫1^{x²} ln t: F′ = 4x ln x y F = 2x² ln x − x² + 1', sp.simplify(diff(Fl, xp) - 4*xp*log(xp)) == 0 and sp.simplify(Fl - (2*xp**2*log(xp) - xp**2 + 1)) == 0)
comprobar('F′ (x>0) negativa en (0,1), positiva en (1,∞)', (4*x*log(x)).subs(x, Q(1, 2)) < 0 < (4*x*log(x)).subs(x, 2))
comprobar('lím ∫0^x (e^{t²}−1)/x³ = 1/3', limit((exp(x**2) - 1) / (3*x**2), x, 0) == Q(1, 3) and limit(2*x*exp(x**2) / (6*x), x, 0) == Q(1, 3)
           and limit(sp.Integral(exp(t**2) - 1, (t, 0, x)).as_sum(1) * 0 + (sum(Q(1, sp.factorial(m)) * x**(2*m + 1) / (2*m + 1) for m in range(1, 6))) / x**3, x, 0) == Q(1, 3))
comprobar('F″ de ∫0^x e^{−t²} = −2x e^{−x²}; F′(0) = 1', sp.simplify(diff(exp(-x**2), x) + 2*x*exp(-x**2)) == 0 and exp(-0) == 1)
comprobar('√π/2 ≈ 0,886', abs(N(sqrt(pi)/2) - 0.8862) < 1e-4 and abs(N(integrate(exp(-t**2), (t, 0, oo))) - 0.886227) < 1e-5)
# Valor medio
comprobar('x² en [0,3]: μ = 3, c = √3 ≈ 1,732', I(x**2, 0, 3) == 9 and I(x**2, 0, 3) / 3 == 3 and abs(N(sqrt(3)) - 1.732) < 1e-3)
mu2 = I(sin(x), 0, pi) / pi; c1 = sp.asin(mu2)
comprobar('sen en [0,π]: μ=2/π≈0,637; c ≈ 0,690 y 2,452', abs(N(mu2) - 0.637) < 1e-3 and abs(N(c1) - 0.690) < 1e-3 and abs(N(pi - c1) - 2.452) < 1e-3 and igual(sin(pi - c1), mu2, 1e-12))
# a en f=ax²+1
aa = solve(sp.Eq(I(a*x**2 + 1, 0, 3, x) / 3, 7), a); comprobar('μ = 3a + 1 y a = 2; c = √3', aa == [2] and sp.simplify(I(a*x**2 + 1, 0, 3, x) / 3 - (3*a + 1)) == 0 and solve(sp.Eq(2*x**2 + 1, 7), x) == [-sqrt(3), sqrt(3)])
# Técnicas
comprobar('∫0^1 2x/(1+x²) = ln 2', sp.simplify(I(2*x/(1 + x**2), 0, 1) - log(2)) == 0 and igual(log(2), 0.693, 1e-3))
comprobar('∫0^1 x√(1+x²) = (2√2−1)/3 ≈ 0,610', sp.simplify(I(x*sqrt(1 + x**2), 0, 1) - (2*sqrt(2) - 1)/3) == 0 and igual((2*sqrt(2) - 1)/3, 0.610, 1e-3))
comprobar('∫0^{π/2} sen cos = 1/2', I(sin(x)*cos(x), 0, pi/2) == Q(1, 2))
comprobar('partes: 1, 1, π', (I(x*exp(x), 0, 1), I(log(x), 1, E), I(x*sin(x), 0, pi)) == (1, 1, pi))
comprobar('∫0^1 1/((x+1)(x+2)) = ln(4/3) ≈ 0,288', sp.simplify(I(1/((x + 1)*(x + 2)), 0, 1) - log(Q(4, 3))) == 0 and sp.apart(1/((x + 1)*(x + 2))) == 1/(x + 1) - 1/(x + 2) and igual(log(Q(4, 3)), 0.288, 1e-2))
comprobar('∫0^3|x−1| = 5/2', area(x - 1, 0, 3) == Q(5, 2))
fpt = sp.Piecewise((x**2, x <= 1), (2 - x, True)); comprobar('a trozos: 1/3 + 1/2 = 5/6', I(x**2, 0, 1) + I(2 - x, 1, 2) == Q(5, 6))
comprobar('∫0^2|x²−1| = 2/3 + 4/3 = 2', (I(1 - x**2, 0, 1), I(x**2 - 1, 1, 2), area(x**2 - 1, 0, 2)) == (Q(2, 3), Q(4, 3), 2))
# Parámetros
comprobar('a²+a = 6, a = 2', solve(sp.Eq(a**2 + a, 6), a) == [-3, 2])
comprobar('kx−x²: área k³/6 y k = 6', sp.simplify(I(k*x - x**2, 0, k) - k**3/6) == 0 and solve(sp.Eq(k**3/6, 36), k)[0] == 6 or 6 in solve(sp.Eq(k**3/6, 36), k))
comprobar('eˣ, e, eje Y: área 1', I(E - exp(x), 0, 1) == 1)
comprobar('1/x, x, x=2: 3/2 − ln 2 ≈ 0,807', sp.simplify(I(x - 1/x, 1, 2) - (Q(3, 2) - log(2))) == 0 and igual(Q(3, 2) - log(2), 0.807, 1e-3))
# Volúmenes
comprobar('volúmenes 8π, π/3, π²/2', (pi*I(x, 0, 4), pi*I(x**2, 0, 1), sp.simplify(pi*I(sin(x)**2, 0, pi))) == (8*pi, pi/3, pi**2/2) and igual(8*pi, 25.13, 1e-3) and igual(pi**2/2, 4.93, 1e-3))
# Problemas EvAU
F1 = integrate(t**2 - 2*t - 3, (t, 0, x))
comprobar('P1: F = x³/3 − x² − 3x', sp.expand(F1 - (x**3/3 - x**2 - 3*x)) == 0)
comprobar('P1: F′ = (x−3)(x+1); extremos x=−1 (máx), 3 (mín)', sp.factor(diff(F1, x)) == (x - 3)*(x + 1) and diff(F1, x).subs(x, -2) > 0 > diff(F1, x).subs(x, 0) and diff(F1, x).subs(x, 4) > 0)
comprobar('P1: F(−1) = 5/3, F(3) = −9, F(1) = −11/3; F″ = 2x − 2', (F1.subs(x, -1), F1.subs(x, 3), F1.subs(x, 1), sp.expand(diff(F1, x, 2))) == (Q(5, 3), -9, -Q(11, 3), 2*x - 2))
F2 = integrate(x**3 - 3*x**2 + 2*x, x)
comprobar('P2: F(1)=1/4, F(0)=F(2)=0; integral 0, área 1/2', (F2.subs(x, 1), F2.subs(x, 0), F2.subs(x, 2), area(x**3 - 3*x**2 + 2*x, 0, 2), I(x**3 - 3*x**2 + 2*x, 0, 2)) == (Q(1, 4), 0, 0, Q(1, 2), 0))
comprobar('P2: raíces 0,1,2', sorted(solve(x**3 - 3*x**2 + 2*x, x)) == [0, 1, 2])
comprobar('P3: primitiva (x−1)eˣ; tramos −1+2/e y 1; área 2−2/e ≈ 1,264', sp.simplify(diff((x - 1)*exp(x), x) - x*exp(x)) == 0
           and sp.simplify(I(x*exp(x), -1, 0) - (-1 + 2/E)) == 0 and I(x*exp(x), 0, 1) == 1 and sp.simplify(area(x*exp(x), -1, 1) - (2 - 2/E)) == 0
           and igual(-1 + 2/E, -0.264, 1e-3) and igual(2 - 2/E, 1.264, 1e-3) and sp.simplify(I(x*exp(x), -1, 1) - 2/E) == 0 and igual(2/E, 0.736, 1e-3))
comprobar('P4: μ = 3a+1 = 7 ⟹ a = 2, c = √3', I(2*x**2 + 1, 0, 3) / 3 == 7)
comprobar('P5: límite 1/2 y primitiva (1+x)ln(1+x) − x', limit(log(1 + x) / (2*x), x, 0) == Q(1, 2) and limit((1/(1 + x)) / 2, x, 0) == Q(1, 2)
           and sp.simplify(diff((1 + x)*log(1 + x) - x, x) - log(1 + x)) == 0 and sp.series((1 + x)*log(1 + x) - x, x, 0, 4).removeO() == x**2/2 - x**3/6)
# Resumen de a11, c14 etc ya arriba. Tarjeta/preguntas
comprobar('quiz: ∫−3^3 x⁵ = 0; d/dx ∫0^{x³} sen = 3x² sen(x³); valor medio de x en [0,4] = 2; área x²−1 = 4/3',
          I(x**5, -3, 3) == 0 and sp.simplify(diff(integrate(sin(t), (t, 0, x**3)), x) - 3*x**2*sin(x**3)) == 0 and I(x, 0, 4) / 4 == 2 and area(x**2 - 1, -1, 1) == Q(4, 3))
comprobar('quiz: ∫0^2 3x² = 8; cambio t=1+x²: límites 1 y 2', I(3*x**2, 0, 2) == 8 and (1 + 0**2, 1 + 1**2) == (1, 2))
comprobar('errores: ∫−1^2 → 9/4 vs 11/4', I(x**3 - x, -1, 2) == Q(9, 4) and area(x**3 - x, -1, 2) == Q(11, 4))
comprobar('errores: ∫0^3 (x−1) = 3/2', I(x - 1, 0, 3) == Q(3, 2))
comprobar('errores: ∫0^2 2x e^{x²} = e⁴ − 1 (límites 0..4)', sp.simplify(I(2*x*exp(x**2), 0, 2) - (E**4 - 1)) == 0 and sp.simplify(integrate(exp(t), (t, 0, 4)) - (E**4 - 1)) == 0)
comprobar('errores: área x y x³ en [−1,1] = 1/2', area(x - x**3, -1, 1) == Q(1, 2))
comprobar('errores: μ de x² en [0,3] = 3', I(x**2, 0, 3) / 3 == 3)
comprobar('errores: sen x toma 2/π dos veces en [0,π]', len([r for r in sp.solveset(sp.Eq(sin(x), 2/pi), x, sp.Interval(0, pi))]) == 2)
comprobar('errores: ∫−1^1 dx/x² diverge (no −2)', integrate(1/x**2, (x, 0, 1)) == oo)
# Emparejar y clasificar
comprobar('emparejar: 1, 1, ln 2, 2, 5/2, 0, (√x → 2/3)', (I(x*exp(x), 0, 1), I(sqrt(x), 0, 1), I(2*x/(1 + x**2), 0, 1), I(sin(x), 0, pi), area(x - 1, 0, 3), I(x**3, -2, 2)) == (1, Q(2, 3), log(2), 2, Q(5, 2), 0))
clas = [(I(sin(x), 0, pi), 1), (I(log(x), 1, E), 1), (I(x**2, -1, 1), 1), (I(sin(x), pi, 2*pi), -1), (I(log(x), 0, 1), -1), (I(x**2, 3, 0), -1),
        (I(x**3, -2, 2), 0), (I(cos(x), 0, 2*pi), 0), (I(sin(x), -pi, pi), 0)]
comprobar('clasificar: signos de las nueve integrales', [int(sp.sign(v)) for v, _ in clas] == [s for _, s in clas])

# ================= SIMULADORES =================
tx = {'sin(x)': sin(x), 'x^2': x**2, 'sqrt(x)': sqrt(x), '1/x': 1/x, 'e^x': exp(x)}
for P in sim['riemann']:
    f = tx[P['ex']]; lo, hi = sp.nsimplify(P['a'], [pi]) if P['a'] != 0 else 0, (pi if abs(P['b'] - 3.14159265) < 1e-6 else sp.nsimplify(P['b']))
    ex = I(f, lo, hi); comprobar(f"riemann {P['ex']}: exacto web", igual(P['I'], ex, 1e-9), f"{P['I']} vs {N(ex)}")
    for s in P['sumas']:
        nn, m = s['n'], s['m']; h = (hi - lo) / nn
        xi = [lo + i*h for i in range(nn + 1)]
        if m == 'izq': v = h * sum(f.subs(x, xi[i]) for i in range(nn))
        elif m == 'der': v = h * sum(f.subs(x, xi[i + 1]) for i in range(nn))
        elif m == 'med': v = h * sum(f.subs(x, (xi[i] + xi[i + 1]) / 2) for i in range(nn))
        elif m == 'tra': v = h * sum((f.subs(x, xi[i]) + f.subs(x, xi[i + 1])) / 2 for i in range(nn))
        else:
            # f monótona en el intervalo salvo sen x: se usa el mínimo/máximo exactos en cada subintervalo
            def ext(i, mx):
                cand = [f.subs(x, xi[i]), f.subs(x, xi[i + 1])]
                if P['ex'] == 'sin(x)' and xi[i] <= pi/2 <= xi[i + 1]: cand.append(1)
                return max(cand, key=N) if mx else min(cand, key=N)
            v = h * sum(ext(i, m == 'sup') for i in range(nn))
        comprobar(f"riemann {P['ex']} n={nn} {m}", igual(s['s'], v, 1e-6), f"web={s['s']} sympy={N(v)}")
    # monotonía: inf ≤ exacto ≤ sup
    for nn in (1, 4, 10, 25):
        ss = {s['m']: s['s'] for s in P['sumas'] if s['n'] == nn}
        comprobar(f"riemann {P['ex']} n={nn}: s ≤ I ≤ S", ss['inf'] <= N(ex) + 1e-9 <= ss['sup'] + 2e-9)
txs = {'x^2-4*x+3': x**2 - 4*x + 3, 'x^3-x': x**3 - x, 'x^3-3*x^2+2*x': x**3 - 3*x**2 + 2*x, 'sin(x)': sin(x)}
for P in sim['signo']:
    f = txs[P['ex']]; hi = 2*pi if P['ex'] == 'sin(x)' else P['b']; lo = P['a']
    comprobar(f"signo {P['ex']}: neta", igual(P['neta'], I(f, lo, hi), 1e-6), f"{P['neta']} vs {N(I(f, lo, hi))}")
    comprobar(f"signo {P['ex']}: área", igual(P['area'], area(f, lo, hi), 1e-4), f"{P['area']} vs {N(area(f, lo, hi))}")
    ceros_int = sorted(r for r in solve(f, x) if r.is_real and lo < N(r) < N(hi) - 1e-3)
    comprobar(f"signo {P['ex']}: cortes", len(P['cortes']) - 2 == len(ceros_int) and all(abs(c - N(r)) < 1e-6 for c, r in zip(P['cortes'][1:-1], ceros_int)), f"{P['cortes']} vs {ceros_int}")
tf = {'x': x, 'x^2': x**2, 'x+2': x + 2, 'x^3': x**3, 'cos(x)': cos(x), 'sin(x)': sin(x), 'sqrt(x)': sqrt(x)}
for P in sim['entre']:
    f, g = tf[P['f']], tf[P['g']]; hi = pi/2 if abs(P['b'] - 1.5708) < 1e-3 else P['b']; lo = P['a']
    h = f - g
    comprobar(f"entre {P['f']}/{P['g']}: neta", igual(P['neta'], I(h, lo, hi), 1e-3), f"{P['neta']} vs {N(I(h, lo, hi))}")
    comprobar(f"entre {P['f']}/{P['g']}: área", igual(P['area'], area(h, lo, hi), 1e-3), f"{P['area']} vs {N(area(h, lo, hi))}")
    cortes = sorted({r for r in sp.solveset(sp.Eq(f, g), x, sp.Interval(lo, hi)) if lo < N(r) < N(hi)}, key=N)
    comprobar(f"entre {P['f']}/{P['g']}: cortes", len(P['cortes']) - 2 == len(cortes) and all(abs(c - N(r)) < 2e-3 for c, r in zip(P['cortes'][1:-1], cortes)), f"{P['cortes']} vs {cortes}")
tfi = {'t^2-4*t+3': t**2 - 4*t + 3, 'sin(t)': sin(t), 'e^(-t^2)': exp(-t**2), '2*t/(1+t^2)': 2*t/(1 + t**2)}
for P in sim['fint']:
    f = tfi[P['ex']]
    for q in P['F']:
        ex1 = integrate(f, (t, P['a'], q['x'])); ex2 = integrate(f, (t, P['a'], q['x']**2))
        comprobar(f"fint {P['ex']} F({q['x']})", igual(q['v'], ex1, 1e-6), f"{q['v']} vs {N(ex1)}")
        comprobar(f"fint {P['ex']} F({q['x']}²)", igual(q['vcuad'], ex2, 1e-6), f"{q['vcuad']} vs {N(ex2)}")
    # extremos de F: ceros de f con cambio de signo en el intervalo
    Tmin, Tmax = P['T']
    cer = [k_*pi for k_ in range(-1, 4) if Tmin < k_*N(pi) < Tmax] if P['ex'] == 'sin(t)' else sorted(r for r in solve(f, t) if r.is_real and Tmin < N(r) < Tmax)
    cer = [r for r in cer if sp.sign(f.subs(t, r - Q(1, 1000))) != sp.sign(f.subs(t, r + Q(1, 1000)))]
    comprobar(f"fint {P['ex']}: extremos de F", len(P['ext']) == len(cer) and all(abs(e['x'] - N(r)) < 1e-6 for e, r in zip(P['ext'], cer)), f"{P['ext']} vs {cer}")
    for e, r in zip(P['ext'], cer):
        tipo = 'max' if f.subs(t, r - Q(1, 1000)) > 0 else 'min'
        comprobar(f"fint {P['ex']}: tipo en {N(r):.3f}", e['de'] == tipo)
    # extremos de G(x) = F(x²): G′ = 2x f(x²)
    dG = 2*x*f.subs(t, x**2); R = sqrt(Tmax)
    cg = sorted([0] + [s_*sqrt(k_*pi) for k_ in range(1, 4) for s_ in (-1, 1) if k_*N(pi) < Tmax]) if P['ex'] == 'sin(t)' else sorted(r for r in solve(dG, x) if r.is_real and -N(R) < N(r) < N(R))
    cg = [r for r in cg if sp.sign(dG.subs(x, r - Q(1, 1000))) != sp.sign(dG.subs(x, r + Q(1, 1000)))]
    comprobar(f"fint {P['ex']}: extremos de G(x²)", len(P['extcuad']) == len(cg) and all(abs(e['x'] - N(r)) < 1e-6 for e, r in zip(sorted(P['extcuad'], key=lambda z: z['x']), cg)), f"{P['extcuad']} vs {cg}")
tm = {'x^2': x**2, 'sin(x)': sin(x), 'e^x': exp(x), 'x^3-3*x': x**3 - 3*x}
for P in sim['medio']:
    f = tm[P['ex']]; hi = pi if abs(P['b'] - 3.14159265) < 1e-6 else P['b']; lo = P['a']
    ex = I(f, lo, hi); mu = ex / (hi - lo)
    comprobar(f"medio {P['ex']}: ∫", igual(P['I'], ex, 1e-6)); comprobar(f"medio {P['ex']}: μ", igual(P['mu'], mu, 1e-6))
    cs = sorted(N(r) for r in sp.Poly(f - mu, x).nroots() if abs(sp.im(r)) < 1e-12 and lo <= sp.re(r) <= N(hi)) if f.is_polynomial(x) else \
        sorted(N(r) for r in ([sp.asin(mu), pi - sp.asin(mu)] if P['ex'] == 'sin(x)' else [log(mu)]))
    comprobar(f"medio {P['ex']}: c", len(cs) == len(P['cs']) and all(abs(a1 - b1) < 1e-5 for a1, b1 in zip(cs, sorted(P['cs']))), f"{cs} vs {P['cs']}")
    comprobar(f"medio {P['ex']}: f(c) = μ", all(igual(f.subs(x, c), mu, 1e-5) for c in P['cs']))

print(f"{ok} comprobaciones correctas, {len(fallos)} fallos")
for f_ in fallos: print('  FALLO', f_)
sys.exit(1 if fallos else 0)
