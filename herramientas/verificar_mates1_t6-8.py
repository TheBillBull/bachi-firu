#!/usr/bin/env python3
"""
Verificación independiente (sympy / fracciones exactas) del refuerzo de los temas 6, 7 y 8 de Matemáticas I
(números complejos, vectores y rectas): cada cifra de los ejemplos resueltos y de los ejercicios nuevos
se recalcula desde cero. No comparte código con la web.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_mates1_t6-8.py /tmp/ampl.json
"""
import json, math, sys, itertools
from fractions import Fraction as Fr
import sympy as sp
from sympy import I, sqrt, pi, exp, Rational as Q

datos = json.load(open(sys.argv[1]))
fallos, ok = [], 0
def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')
def cerca(a, b, tol=6e-4):
    a, b = complex(a), complex(b)
    return abs(a - b) <= tol * max(1.0, abs(b))
def igual(a, b, tol=1e-9):
    return abs(complex(sp.N(a - b))) < tol

def ejercicios(tema):
    return {e['id']: e for e in datos['ampl']['mates1'][tema]['ejercicios']}
def check(E, id_, k=0):
    c = E[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[k]
def nums(E, id_):
    c = E[id_]['check']; c = c if isinstance(c, list) else [c]
    return [x['valor'] for x in c]
def opt(E, id_, k=0):
    c = check(E, id_, k); return c['opciones'][c['ok']]
def lista(E, id_, k=0):
    return sorted(check(E, id_, k)['valores'])
def pasos_y_resultado(E, ids, tema):
    for i in ids:
        e = E[i]
        comprobar(f'{tema} {i} tiene pasos y resultado', len(e.get('pasos', [])) >= 1 and bool(e.get('resultado')))

# =====================================================================
# TEMA 6 · Números complejos
# =====================================================================
E6 = ejercicios('t6')
x, m, t_ = sp.symbols('x m t')
def polar(z):  # módulo y argumento en grados (0, 360)
    z = complex(sp.N(z)); a = math.degrees(math.atan2(z.imag, z.real)) % 360
    return abs(z), (0 if abs(a - 360) < 1e-9 else a)

# --- 13. Euler
comprobar('t6 euler e^{iπ} = −1', igual(exp(I * pi), -1))
comprobar('t6 euler e^{iπ/2} = i', igual(exp(I * pi / 2), I))
comprobar('t6 euler e^{i3π/2} = −i', igual(exp(3 * I * pi / 2), -I) and igual(exp(-I * pi / 2), -I))
comprobar('t6 euler tabla 2e^{iπ/3} = 1+√3 i', igual(2 * exp(I * pi / 3), 1 + sqrt(3) * I))
comprobar('t6 euler tabla √2 e^{iπ/4} = 1+i', igual(sqrt(2) * exp(I * pi / 4), 1 + I))
z0 = -1 + sqrt(3) * I
r0, a0 = polar(z0)
comprobar('t6 euler ejemplo −1+i√3 = 2e^{i2π/3}', abs(r0 - 2) < 1e-9 and abs(a0 - 120) < 1e-9 and igual(2 * exp(2 * I * pi / 3), z0))
comprobar('t6 euler ejemplo 3e^{iπ/6}', igual(3 * exp(I * pi / 6), 3 * sqrt(3) / 2 + Q(3, 2) * I) and abs(float(3 * sqrt(3) / 2) - 2.598) < 1e-3)
comprobar('t6 euler producto 6i', igual(2 * exp(I * pi / 6) * 3 * exp(I * pi / 3), 6 * I))
comprobar('t6 euler cociente 2i', igual(4 * exp(5 * I * pi / 6) / (2 * exp(I * pi / 3)), 2 * I))
comprobar('t6 euler potencia 16', igual((sqrt(2) * exp(I * pi / 4)) ** 8, 16))
a_, b_ = sp.symbols('a b', real=True)
comprobar('t6 euler cos(a+b)', sp.simplify(sp.expand_trig(sp.cos(a_ + b_)) - (sp.cos(a_) * sp.cos(b_) - sp.sin(a_) * sp.sin(b_))) == 0)
comprobar('t6 euler sen(a+b)', sp.simplify(sp.expand_trig(sp.sin(a_ + b_)) - (sp.sin(a_) * sp.cos(b_) + sp.cos(a_) * sp.sin(b_))) == 0)
comprobar('t6 euler ángulo doble', sp.simplify(sp.expand_trig(sp.cos(2 * a_)) - (sp.cos(a_) ** 2 - sp.sin(a_) ** 2)) == 0 and sp.simplify(sp.expand_trig(sp.sin(2 * a_)) - 2 * sp.sin(a_) * sp.cos(a_)) == 0)
th = sp.symbols('theta', real=True)
comprobar('t6 euler cos = (e^{iθ}+e^{−iθ})/2', sp.simplify(sp.expand_complex((exp(I * th) + exp(-I * th)) / 2) - sp.cos(th)) == 0)
comprobar('t6 euler sen = (e^{iθ}−e^{−iθ})/(2i)', sp.simplify(sp.expand_complex((exp(I * th) - exp(-I * th)) / (2 * I)) - sp.sin(th)) == 0)
comprobar('t6 euler θ=π/3: e^{iπ/3}+e^{−iπ/3} = 1', igual(exp(I * pi / 3) + exp(-I * pi / 3), 1))
comprobar('t6 euler i^i = e^{−π/2} ≈ 0,2079', abs(complex(sp.N(I ** I)) - math.exp(-math.pi / 2)) < 1e-12 and abs(math.exp(-math.pi / 2) - 0.2079) < 5e-5)
fas = 3 + 4 * I; rf, af = polar(fas)
comprobar('t6 fasores 3+4i = 5 ∠53,13°', abs(rf - 5) < 1e-9 and abs(af - 53.13) < 5e-3)
comprobar('t6 fasores 3cos ωt + 4cos(ωt+90°) = 5cos(ωt+53,13°)', all(abs(3 * math.cos(w) + 4 * math.cos(w + math.pi / 2) - 5 * math.cos(w + math.radians(53.13))) < 2e-3 for w in [0.3, 1.1, 2.0, 4.0, 5.5]))
comprobar('t6 fasores 230 + 230e^{i120°} = 230e^{i60°}', igual(230 + 230 * exp(2 * I * pi / 3), 230 * exp(I * pi / 3)))

# --- 14. Transformaciones
P = 4 + I; c = 1 - 2 * I
comprobar('t6 transf giro 90° de 4+i alrededor de 1−2i = −2+i', igual(c + I * (P - c), -2 + I) and igual(abs(P - c), abs(-2 + I - c)) and igual(abs(P - c), 3 * sqrt(2)))
z = 3 + 2 * I
comprobar('t6 transf simetría x=1', igual(2 * 1 - sp.conjugate(z), -1 + 2 * I))
comprobar('t6 transf simetría y=x', igual(I * sp.conjugate(z), 2 + 3 * I))
comprobar('t6 transf simetría y=−1', igual(sp.conjugate(z) + 2 * (-1) * I, 3 - 4 * I))
comprobar('t6 transf simetría y=−1 (geométrica)', 2 * (-1) - 2 == -4 and (2 - (-1)) == 3 and (-4 - (-1)) == -3)
comprobar('t6 transf simetría recta por 0 a φ = e^{2iφ}z̄ (φ=45°)', igual(exp(2 * I * pi / 4) * sp.conjugate(z), I * sp.conjugate(z)))
A, Bq, A2, B2 = 1, I, 2 + 3 * I, -1 + 2 * I
a_ = sp.simplify((A2 - B2) / (A - Bq)); b_ = sp.simplify(A2 - a_ * A)
comprobar('t6 transf semejanza a = 1+2i', igual(a_, 1 + 2 * I) and igual(b_, 1 + I) and igual(a_ * Bq + b_, B2) and igual(a_ * A + b_, A2))
comprobar('t6 transf semejanza razón √5, ángulo 63,43°', abs(float(abs(complex(sp.N(a_)))) - math.sqrt(5)) < 1e-12 and abs(polar(a_)[1] - 63.4349) < 1e-3)
zf = sp.simplify(b_ / (1 - a_))
comprobar('t6 transf semejanza punto fijo −1/2+i/2', igual(zf, Q(-1, 2) + I / 2) and igual(a_ * zf + b_, zf))
comprobar('t6 transf dos espejos = giro 180°', all(igual(-sp.conjugate(sp.conjugate(zz)), -zz) for zz in [3 + 2 * I, -1 + 5 * I]))
comprobar('t6 transf dos espejos = giro 2β en general', all(igual(exp(2 * I * f2) * sp.conjugate(exp(2 * I * f1) * sp.conjugate(zz)), exp(2 * I * (f2 - f1)) * zz) for f1, f2, zz in [(0.3, 1.1, 2 + I), (0.7, 0.2, -3 + 4 * I)]))
r2, a2 = polar((2 * exp(I * pi / 6)) ** 2); r3, a3 = polar(1 / (2 * exp(I * pi / 6)))
comprobar('t6 transf z² y 1/z de 2∠30°', abs(r2 - 4) < 1e-9 and abs(a2 - 60) < 1e-9 and abs(r3 - 0.5) < 1e-9 and abs(a3 - 330) < 1e-9)
comprobar('t6 transf la tabla: simetrías conservan distancias, z↦az+b las multiplica por |a|', all(abs(abs(sp.conjugate(p) - sp.conjugate(q)) - abs(p - q)) < 1e-12 and abs(abs((2 + I) * p + 1 - ((2 + I) * q + 1)) - sqrt(5) * abs(p - q)) < 1e-9 for p, q in [(1 + 2 * I, 3 - I), (-2 + I, 4 + 4 * I)]))

# --- 15. Polinomios
comprobar('t6 polin (x−2)(x²−2x+10)', sp.expand((x - 2) * (x ** 2 - 2 * x + 10)) == x ** 3 - 4 * x ** 2 + 14 * x - 20)
raices = sp.solve(x ** 3 - 4 * x ** 2 + 14 * x - 20, x)
comprobar('t6 polin raíces 2, 1±3i', sorted([complex(sp.N(r)) for r in raices], key=lambda c_: (c_.real, c_.imag)) == sorted([2, 1 + 3j, 1 - 3j], key=lambda c_: (c_.real, c_.imag)) or all(any(abs(complex(sp.N(r)) - s) < 1e-9 for r in raices) for s in [2, 1 + 3j, 1 - 3j]))
comprobar('t6 polin Vieta: suma 4 y producto 20', igual(2 + (1 + 3 * I) + (1 - 3 * I), 4) and igual(2 * (1 + 3 * I) * (1 - 3 * I), 20))
p3 = x ** 3 - 3 * x ** 2 + 7 * x - 5
comprobar('t6 polin 1+2i es raíz de x³−3x²+7x−5', igual(p3.subs(x, 1 + 2 * I), 0) and igual(p3.subs(x, 1 - 2 * I), 0) and p3.subs(x, 1) == 0)
comprobar('t6 polin factor (x−1)(x²−2x+5)', sp.expand((x - 1) * (x ** 2 - 2 * x + 5)) == p3 and igual((1 + 2 * I) * (1 - 2 * I), 5))
comprobar('t6 polin x⁴+4', sp.expand((x ** 2 + 2 * x + 2) * (x ** 2 - 2 * x + 2)) == x ** 4 + 4 and sp.expand((x ** 2 + 2) ** 2 - (2 * x) ** 2) == x ** 4 + 4)
rs = sp.solve(x ** 4 + 4, x)
comprobar('t6 polin raíces de x⁴+4 = ±1±i', all(any(abs(complex(sp.N(r)) - s) < 1e-9 for r in rs) for s in [1 + 1j, -1 + 1j, -1 - 1j, 1 - 1j]))
comprobar('t6 polin x²−2x+m: Δ y m=5', sp.discriminant(x ** 2 - 2 * x + m, x) == 4 - 4 * m and all(igual((x ** 2 - 2 * x + 5).subs(x, s), 0) for s in [1 + 2 * I, 1 - 2 * I]) and abs(abs(1 + 2j) - math.sqrt(5)) < 1e-12)
comprobar('t6 polin x²−2x+m: raíces 1±i√(m−1)', sp.simplify(((x ** 2 - 2 * x + m).subs(x, 1 + I * sqrt(m - 1)))) == 0)

# --- 16. Polígonos regulares
w3 = exp(2 * pi * I / 3)
v1 = (1 + I) + 3 * w3; v2 = (1 + I) + 3 * w3 ** 2
comprobar('t6 polig triángulo vértices', igual(v1, Q(-1, 2) + (1 + 3 * sqrt(3) / 2) * I) and igual(v2, Q(-1, 2) + (1 - 3 * sqrt(3) / 2) * I) and abs(float(sp.im(v1)) - 3.598) < 1e-3 and abs(float(sp.im(v2)) + 1.598) < 1e-3)
comprobar('t6 polig triángulo lado 3√3', all(abs(abs(complex(sp.N(p - q))) - 3 * math.sqrt(3)) < 1e-9 for p, q in [(4 + I, v1), (v1, v2), (v2, 4 + I)]) and abs(2 * 3 * math.sin(math.pi / 3) - 3 * math.sqrt(3)) < 1e-12 and abs(3 * math.sqrt(3) - 5.196) < 1e-3)
sols = sp.solve(x ** 6 - 64, x)
comprobar('t6 polig z⁶=64', all(any(abs(complex(sp.N(r)) - s) < 1e-9 for r in sols) for s in [2, 1 + 1j * math.sqrt(3), -1 + 1j * math.sqrt(3), -2, -1 - 1j * math.sqrt(3), 1 - 1j * math.sqrt(3)]))
comprobar('t6 polig hexágono lado 2, perímetro 12, área 6√3', abs(2 * 2 * math.sin(math.pi / 6) - 2) < 1e-12 and abs((6 / 2) * 4 * math.sin(math.pi / 3) - 6 * math.sqrt(3)) < 1e-12 and abs(6 * math.sqrt(3) - 10.39) < 5e-3)
comprobar('t6 polig (z−1)³=8', all(igual(((s - 1) ** 3), 8) for s in [3, sqrt(3) * I, -sqrt(3) * I]) and len(sp.solve((x - 1) ** 3 - 8, x)) == 3)
comprobar('t6 polig cos72° = (√5−1)/4', abs(math.cos(math.radians(72)) - (math.sqrt(5) - 1) / 4) < 1e-12)
comprobar('t6 polig suma de raíces n-ésimas de 1 = 0 y producto (−1)^{n+1}', all(abs(sum(complex(sp.N(exp(2 * pi * I * k / n))) for k in range(n))) < 1e-9 and abs(sp.N(sp.prod([exp(2 * pi * I * k / n) for k in range(n)])) - (-1) ** (n + 1)) < 1e-9 for n in range(2, 9)))

# --- 17. Problemas de examen
comprobar('t6 P1 (1+i√3)⁶/(√3−i)⁴ = −2+2√3 i', igual((1 + I * sqrt(3)) ** 6 / (sqrt(3) - I) ** 4, -2 + 2 * sqrt(3) * I) and igual((1 + I * sqrt(3)) ** 6, 64) and igual((sqrt(3) - I) ** 4, 16 * exp(I * math.radians(240))))
exp_ = sp.expand_complex((m + 2 * I) / (1 - I))
mr = sp.symbols('mr', real=True)
e2 = sp.expand_complex((mr + 2 * I) / (1 - I))
comprobar('t6 P2 (m+2i)/(1−i) = [(m−2)+(m+2)i]/2', sp.simplify(e2 - ((mr - 2) + (mr + 2) * I) / 2) == 0)
comprobar('t6 P2 (a) real m=−2 → −2', sp.solve(sp.im(e2), mr) == [-2] and igual(e2.subs(mr, -2), -2))
comprobar('t6 P2 (b) imaginario puro m=2 → 2i', sp.solve(sp.re(e2), mr) == [2] and igual(e2.subs(mr, 2), 2 * I))
comprobar('t6 P2 (c) módulo √10: m=±4', sorted(sp.solve(sp.Eq(sp.re(e2) ** 2 + sp.im(e2) ** 2, 10), mr)) == [-4, 4] and igual(e2.subs(mr, 4), 1 + 3 * I) and igual(e2.subs(mr, -4), -3 - I))
w = -8 + 8 * sqrt(3) * I
rw, aw = polar(w)
sols = sp.solve(x ** 4 - w, x)
esperadas = [sqrt(3) + I, -1 + sqrt(3) * I, -sqrt(3) - I, 1 - sqrt(3) * I]
comprobar('t6 P3 w=16∠120° y soluciones', abs(rw - 16) < 1e-9 and abs(aw - 120) < 1e-9 and all(any(igual(r, s) for r in sols) for s in esperadas) and all(igual(s ** 4, w) for s in esperadas))
comprobar('t6 P3 cuadrado de lado 2√2', all(abs(abs(complex(sp.N(esperadas[i] - esperadas[(i + 1) % 4]))) - 2 * math.sqrt(2)) < 1e-9 for i in range(4)) and abs(2 * 2 * math.sin(math.pi / 4) - 2 * math.sqrt(2)) < 1e-12 and abs(2 * math.sqrt(2) - 2.83) < 5e-3)
Ap, Bp = 1 + I, 3 + I
Cs = [Ap + (Bp - Ap) * exp(s * I * pi / 3) for s in (1, -1)]
comprobar('t6 P4 triángulo equilátero', igual(Cs[0], 2 + (1 + sqrt(3)) * I) and igual(Cs[1], 2 + (1 - sqrt(3)) * I) and all(abs(abs(complex(sp.N(C_ - Ap))) - 2) < 1e-9 and abs(abs(complex(sp.N(C_ - Bp))) - 2) < 1e-9 for C_ in Cs))
X, Y = sp.symbols('X Y', real=True)
comprobar('t6 P5 |z−1| ≤ |z−i| ⇔ x ≥ y', sp.expand((X - 1) ** 2 + Y ** 2 - (X ** 2 + (Y - 1) ** 2)) == -2 * X + 2 * Y and abs(0.5 * math.pi * 4 - 2 * math.pi) < 1e-12 and abs(2 * math.pi - 6.28) < 5e-3)
comprobar('t6 P5 círculo de Apolonio', sp.expand(((X + 2) ** 2 + Y ** 2) - 4 * ((X - 1) ** 2 + Y ** 2)) == sp.expand(-3 * X ** 2 + 12 * X - 3 * Y ** 2) and sp.expand(X ** 2 - 4 * X + Y ** 2 - ((X - 2) ** 2 + Y ** 2 - 4)) == 0)

# --- Ejercicios nuevos j37–j49
r, a = polar(-1 + I)
comprobar('t6 j37', abs(r - nums(E6, 'j37')[0]) < 5e-5 and abs(math.radians(a) - nums(E6, 'j37')[1]) < 5e-5 and abs(math.radians(a) - 3 * math.pi / 4) < 1e-12)
pp = 2 * exp(I * pi / 6) * 3 * exp(I * pi / 3); r, a = polar(pp)
comprobar('t6 j38', abs(r - nums(E6, 'j38')[0]) < 1e-9 and abs(a - nums(E6, 'j38')[1]) < 1e-9)
b_, c_ = sp.symbols('b c', real=True); sol = sp.solve([sp.re((2 + 3 * I) ** 2 + b_ * (2 + 3 * I) + c_), sp.im((2 + 3 * I) ** 2 + b_ * (2 + 3 * I) + c_)], [b_, c_])
comprobar('t6 j39', [sol[b_], sol[c_]] == nums(E6, 'j39') == [-4, 13])
v = I * sp.conjugate(3 + 2 * I)
comprobar('t6 j40', [sp.re(v), sp.im(v)] == nums(E6, 'j40') == [2, 3])
comprobar('t6 j41', nums(E6, 'j41') == [1] and p3.subs(x, 1) == 0 and igual(p3.subs(x, 1 + 2 * I), 0) and sorted(sp.Poly(p3, x).all_roots(), key=lambda q: str(q)) is not None and sp.simplify(sum([1 + 2 * I, 1 - 2 * I, 1]) - 3) == 0)
cuad = [1 + I + 2 * I ** k for k in range(4)]
comprobar('t6 j42', nums(E6, 'j42') == [8, 1] and igual(cuad[1], 1 + 3 * I) and abs(abs(complex(sp.N(cuad[0] - cuad[1]))) ** 2 - 8) < 1e-9 and max(sp.im(q) for q in cuad) == 3 and sp.re(1 + 3 * I) == 1)
rts = sp.solve(x ** 3 + 27, x); rp = [q for q in rts if sp.im(sp.N(q)) > 1e-9][0]
comprobar('t6 j43', cerca(sp.re(sp.N(rp)), nums(E6, 'j43')[0]) and cerca(sp.im(sp.N(rp)), nums(E6, 'j43')[1], 2e-3) and abs(float(sp.im(sp.N(rp))) - 3 * math.sqrt(3) / 2) < 1e-9 and len([q for q in rts if sp.im(sp.N(q)) > 1e-9]) == 1)
comprobar('t6 j44', cerca(8 * math.pi, nums(E6, 'j44')[0], 2e-4) and abs(math.pi * 9 - math.pi * 1 - 8 * math.pi) < 1e-12)
comprobar('t6 j45', cerca(complex(sp.N(I ** I)).real, nums(E6, 'j45')[0], 2e-3))
a_, b_ = sp.simplify(((3 + I) - (2 + 4 * I)) / (1 - I)), None
b_ = sp.simplify((3 + I) - a_)
zf = sp.simplify(b_ / (1 - a_))
comprobar('t6 j46', igual(a_, 2 - I) and igual(b_, 1 + 2 * I) and igual(a_ * I + b_, 2 + 4 * I) and cerca(abs(complex(sp.N(a_))), nums(E6, 'j46')[0]) and abs(polar(a_)[1] - 360 - nums(E6, 'j46')[1]) < 5e-3 and cerca(sp.re(zf), nums(E6, 'j46')[2]) and cerca(sp.im(zf), nums(E6, 'j46')[3]) and igual(a_ * zf + b_, zf))
fs = 3 + 4 * sp.exp(-I * pi / 2); rfs, afs = polar(fs)
comprobar('t6 j47', abs(rfs - 5) < 1e-9 and nums(E6, 'j47')[0] == 5 and abs((afs - 360) + nums(E6, 'j47')[1]) < 5e-3 and all(abs(3 * math.cos(w) + 4 * math.sin(w) - 5 * math.cos(w - math.radians(53.13))) < 2e-3 for w in [0.2, 1.3, 2.2, 3.9]))
sim = sp.expand_complex(exp(I * pi / 3) * sp.conjugate(4 + 2 * I))
comprobar('t6 j48', cerca(sp.re(sim), nums(E6, 'j48')[0], 2e-3) and cerca(sp.im(sim), nums(E6, 'j48')[1], 2e-3) and igual(sp.re(sim), 2 + sqrt(3)) and igual(sp.im(sim), 2 * sqrt(3) - 1) and abs(abs(complex(sp.N(sim))) ** 2 - 20) < 1e-9)
comprobar('t6 j49 (rúbrica)', check(E6, 'j49')['tipo'] == 'rubrica' and all(abs(sum(complex(sp.N(exp(2 * pi * I * k / n))) for k in range(n))) < 1e-9 for n in range(2, 12)))
pasos_y_resultado(E6, [f'j{k}' for k in range(37, 50)], 't6')
# test y errores nuevos
Q6 = datos['ampl']['mates1']['t6']['datos']
def preg(tema, clave, texto_ini):
    qs = [q for q in datos['ampl']['mates1'][tema]['datos'][clave]['preguntas'] if q['q'].startswith(texto_ini)]
    return qs[0] if qs else None
q = preg('t6', 'quiz1', 'e<sup>iπ</sup> vale')
comprobar('t6 test e^{iπ}', q and q['op'][q['ok']] == '−1' and igual(exp(I * pi), -1))
q = preg('t6', 'quiz1', '2e<sup>iπ/3</sup> en forma binómica')
comprobar('t6 test 2e^{iπ/3}', q and q['op'][q['ok']] == '1 + √3·i' and igual(2 * exp(I * pi / 3), 1 + sqrt(3) * I))
q = preg('t6', 'quiz1', 'El conjunto de los z con |z − 1| = |z + 1|')
comprobar('t6 test mediatriz de 1 y −1 es x=0', q and q['op'][q['ok']].startswith('el eje imaginario') and sp.expand((X - 1) ** 2 + Y ** 2 - ((X + 1) ** 2 + Y ** 2)) == -4 * X)
q = preg('t6', 'quiz1', 'La suma de las cinco raíces quintas')
comprobar('t6 test suma raíces quintas', q and q['op'][q['ok']] == '0' and abs(sum(complex(sp.N(exp(2 * pi * I * k * 0.2 * 1))) for k in range(5))) < 1e-9 and abs(sum(complex(sp.N(sp.root(3 + 4 * I, 5) * exp(2 * pi * I * k / 5))) for k in range(5))) < 1e-9)
q = preg('t6', 'errores', 'Un alumno calcula e<sup>iπ/2</sup>')
comprobar('t6 error e^{iπ/2} = i', q and 'i' in q['op'][q['ok']] and igual(exp(I * pi / 2), I))
q = preg('t6', 'errores', 'Un alumno afirma que la simetría respecto del eje imaginario')
comprobar('t6 error simetría eje imaginario −z̄', q and 'z ↦ −z̄' in q['op'][q['ok']] and igual(-sp.conjugate(3 + 2 * I), -3 + 2 * I))

# ==== FIN DE LOS TEMAS ====
print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f in fallos: print('  FALLO:', f)
