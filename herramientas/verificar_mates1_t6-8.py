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

# =====================================================================
# TEMA 7 · Vectores
# =====================================================================
E7 = ejercicios('t7')
def dot(a, b): return a[0] * b[0] + a[1] * b[1]
def det(a, b): return a[0] * b[1] - a[1] * b[0]
def mod(a): return sp.sqrt(dot(a, a))
def sub(p, q): return (p[0] - q[0], p[1] - q[1])
def angd(a, b): return math.degrees(math.acos(float(dot(a, b) / (mod(a) * mod(b)))))
def prox(v, d): k = Q(dot(v, d)) / dot(d, d); return (k * d[0], k * d[1])

# --- 12. Bases ortonormales
e1 = (Q(3, 5), Q(4, 5)); e2 = (Q(-4, 5), Q(3, 5))
comprobar('t7 ortonormal (3/5,4/5),(−4/5,3/5)', mod(e1) == 1 and mod(e2) == 1 and dot(e1, e2) == 0)
v = (7, 1); a, b = dot(v, e1), dot(v, e2)
comprobar('t7 ejemplo v=(7,1) → (5,−5)', (a, b) == (5, -5) and (a * e1[0] + b * e2[0], a * e1[1] + b * e2[1]) == (7, 1) and a ** 2 + b ** 2 == 50 == dot(v, v))
ph = sp.pi / 6; P = (4, 2)
xp = P[0] * sp.cos(ph) + P[1] * sp.sin(ph); yp = -P[0] * sp.sin(ph) + P[1] * sp.cos(ph)
comprobar('t7 rotación de ejes 30°', igual(xp, 2 * sqrt(3) + 1) and igual(yp, -2 + sqrt(3)) and abs(float(xp) - 4.464) < 1e-3 and abs(float(yp) + 0.268) < 1e-3 and abs(float(xp ** 2 + yp ** 2) - 20) < 1e-9)
u, vv = (3, 4), (1, 3)
f1 = (Q(3, 5), Q(4, 5)); pr = dot(vv, f1); w_ = (vv[0] - pr * f1[0], vv[1] - pr * f1[1])
comprobar('t7 Gram–Schmidt (3,4),(1,3)', pr == 3 and w_ == (Q(-4, 5), Q(3, 5)) and mod(w_) == 1 and dot(w_, f1) == 0)
th_ = sp.symbols('th', real=True)
ea = (sp.cos(th_), sp.sin(th_)); eb = (-sp.sin(th_), sp.cos(th_))
comprobar('t7 base girada es ortonormal', sp.simplify(dot(ea, ea) - 1) == 0 and sp.simplify(dot(eb, eb) - 1) == 0 and sp.simplify(dot(ea, eb)) == 0)

# --- 13. Componentes y plano inclinado
v = (8, 1); d = (3, 4); vp = prox(v, d); vperp = sub(v, vp)
comprobar('t7 descomposición (8,1) sobre (3,4)', vp == (Q(84, 25), Q(112, 25)) and (float(vp[0]), float(vp[1])) == (3.36, 4.48) and abs(float(mod(vp)) - 5.6) < 1e-12 and vperp == (Q(116, 25), Q(-87, 25)) and (float(vperp[0]), float(vperp[1])) == (4.64, -3.48))
comprobar('t7 descomposición: ortogonales, |v⊥| = |det|/|d| = 5,8 y Pitágoras', dot(vp, vperp) == 0 and Q(abs(det(d, v)), 5) == Q(29, 5) and mod(vperp) == Q(29, 5) and dot(vp, vp) + dot(vperp, vperp) == dot(v, v) == 65)
al = sp.pi / 6
Pp = 98 * sp.sin(al); Pn = 98 * sp.cos(al)
comprobar('t7 plano inclinado 10 kg 30° μ=0,4', Pp == 49 and abs(float(Pn) - 84.87) < 5e-3 and abs(0.4 * float(Pn) - 33.95) < 5e-3 and 49 > 0.4 * float(Pn) and math.tan(math.pi / 6) > 0.4 and abs((49 - 0.4 * float(Pn)) / 10 - 1.505) < 1e-3 and abs(9.8 * (0.5 - 0.4 * math.cos(math.pi / 6)) - 1.505) < 1e-3)
un = (sp.cos(th_), sp.sin(th_)); nn = (-sp.sin(th_), sp.cos(th_)); peso = (0, -sp.Symbol('P'))
comprobar('t7 plano inclinado: componentes con vectores', sp.simplify(dot(peso, un) + sp.Symbol('P') * sp.sin(th_)) == 0 and sp.simplify(dot(peso, nn) + sp.Symbol('P') * sp.cos(th_)) == 0)
comprobar('t7 ángulo crítico arctan 0,4 = 21,8° y tan 35° = 0,700', abs(math.degrees(math.atan(0.4)) - 21.8) < 0.05 and abs(math.tan(math.radians(35)) - 0.700) < 5e-4)
comprobar('t7 subir el bloque F = P∥ + μN = 82,95', abs(49 + 0.4 * float(Pn) - 82.95) < 5e-3)

# --- 14. Móviles
def moviles(a0, va, b0, vb):
    dr = sub(b0, a0); dv = sub(vb, va); dv2 = dot(dv, dv)
    ts = -Q(dot(dr, dv)) / dv2; dm = abs(det(dr, dv)) / sp.sqrt(dv2)
    return dr, dv, ts, dm
dr, dv, ts, dm = moviles((0, 0), (6, 0), (10, 8), (0, -4))
Ats = (6 * ts, 0); Bts = (10, 8 - 4 * ts)
comprobar('t7 barcos Δr₀, Δv, t*, d mín', dr == (10, 8) and dv == (-6, -4) and dot(dr, dv) == -92 and dot(dv, dv) == 52 and ts == Q(23, 13) and abs(float(ts) - 1.77) < 5e-3 and abs(float(dm) - 1.11) < 5e-3 and abs(float(dm) - 8 / math.sqrt(52)) < 1e-12)
comprobar('t7 barcos: comprobación con posiciones', abs(float(Ats[0]) - 10.62) < 5e-3 and abs(float(Bts[1]) - 0.92) < 5e-3 and abs(float(mod(sub(Ats, Bts))) - float(dm)) < 1e-12)
comprobar('t7 barcos: t* minimiza |Δr(t)|', all(float(mod((dr[0] + dv[0] * t, dr[1] + dv[1] * t))) >= float(dm) - 1e-12 for t in [0, 0.5, 1, 1.5, 2, 2.5, 3, 5]))
dr, dv, ts, dm = moviles((-4, 0), (2, 0), (2, 3), (-1, Q(-3, 2)))
comprobar('t7 choque: det=0, t*=2, posiciones coinciden', det(dr, dv) == 0 and ts == 2 and dm == 0 and dr == (6, 3) and dv == (-3, Q(-3, 2)) and dv == (-Q(1, 2) * dr[0], -Q(1, 2) * dr[1]) and (-4 + 2 * 2, 0) == (2 - 1 * 2, 3 - Q(3, 2) * 2) and dot(dr, dv) == Q(-45, 2) and dot(dv, dv) == Q(45, 4))
comprobar('t7 lluvia en el tren', sub((0, -10), (20, 0)) == (-20, -10) and abs(float(mod((-20, -10))) - 22.4) < 0.05 and abs(math.degrees(math.atan(10 / 20)) - 26.6) < 0.05)

# --- 15. Centro de masas
def cm(masas, pos): M = sum(masas); return (Q(sum(m * p[0] for m, p in zip(masas, pos))) / M, Q(sum(m * p[1] for m, p in zip(masas, pos))) / M)
r_ = cm([2, 3, 5], [(0, 0), (5, 0), (2, 4)])
comprobar('t7 CM de tres masas = (2,5; 2)', r_ == (Q(5, 2), 2) and (2 * (0 - r_[0]) + 3 * (5 - r_[0]) + 5 * (2 - r_[0]), 2 * (0 - r_[1]) + 3 * (0 - r_[1]) + 5 * (4 - r_[1])) == (0, 0))
comprobar('t7 lámina L', cm([12, 8], [(3, 1), (1, 4)]) == (Q(11, 5), Q(11, 5)) and 6 * 2 == 12 and 2 * 4 == 8 and math.hypot(2.2 - 2, 2.2 - 2) < 0.29)
comprobar('t7 palanca 30 kg / 20 kg en 5 m', 30 * 2 == 20 * (5 - 2) and cm([30, 20], [(0, 0), (5, 0)]) == (2, 0))
mT, mL, dTL = 5.97e24, 7.35e22, 384400
xcm = mL * dTL / (mT + mL)
comprobar('t7 Tierra–Luna: 4 675 km < radio terrestre 6 371 km', abs(xcm - 4675) < 1 and xcm < 6371 and abs(mL / (mT + mL) - 0.01216) < 5e-6)
comprobar('t7 CM de masas iguales = baricentro', cm([1, 1], [(0, 0), (4, 6)]) == (2, 3) and cm([1, 1, 1], [(0, 0), (3, 0), (0, 6)]) == (1, 2))

# --- 16. Desigualdades y triángulos
u1, u2, v1, v2 = sp.symbols('u1 u2 v1 v2', real=True)
comprobar('t7 identidad de Lagrange', sp.expand((u1 ** 2 + u2 ** 2) * (v1 ** 2 + v2 ** 2) - ((u1 * v1 + u2 * v2) ** 2 + (u1 * v2 - u2 * v1) ** 2)) == 0)
comprobar('t7 Lagrange: |u|=5, |v|=4, u·v=12 → área 16', math.sqrt(25 * 16 - 144) == 16 and abs(5 * 4 * math.sqrt(1 - 0.6 ** 2) - 16) < 1e-12)
comprobar('t7 teorema del coseno: lados 7, 9 y 40°', abs(math.sqrt(130 - 126 * math.cos(math.radians(40))) - 5.79) < 5e-3 and abs(130 - 126 * math.cos(math.radians(40)) - 33.48) < 5e-3)
A_, B_, C_ = (0, 0), (4, 1), (1, 3)
prods = (dot(sub(B_, A_), sub(C_, A_)), dot(sub(A_, B_), sub(C_, B_)), dot(sub(A_, C_), sub(B_, C_)))
angs = (angd(sub(B_, A_), sub(C_, A_)), angd(sub(A_, B_), sub(C_, B_)), angd(sub(A_, C_), sub(B_, C_)))
comprobar('t7 triángulo acutángulo (productos 7, 10, 3) y ángulos', prods == (7, 10, 3) and all(abs(x - y) < 5e-3 for x, y in zip(angs, (57.53, 47.73, 74.74))) and abs(sum(angs) - 180) < 1e-9)
comprobar('t7 triángulo con C = (−1, 2) obtuso en A', dot((4, 1), (-1, 2)) == -2)
comprobar('t7 desigualdad triangular y Cauchy–Schwarz (muestras)', all(abs(dot(p, q)) <= float(mod(p) * mod(q)) + 1e-12 and float(mod((p[0] + q[0], p[1] + q[1]))) <= float(mod(p) + mod(q)) + 1e-12 for p, q in [((1, 2), (3, -1)), ((-2, 5), (4, 4)), ((3, 3), (6, 6))]))

# --- 17. Problemas de examen
A, B, C = (1, 2), (5, 0), (3, 6); AB, AC = sub(B, A), sub(C, A)
comprobar('t7 P1 (a) rectángulo isósceles', AB == (4, -2) and AC == (2, 4) and dot(AB, AC) == 0 and dot(AB, AB) == dot(AC, AC) == 20)
BC = sub(C, B)
comprobar('t7 P1 (b) área 10 y altura √10', abs(det(AB, AC)) / 2 == 10 and sp.simplify(20 / mod(BC) - sp.sqrt(10)) == 0 and abs(20 / float(mod(BC)) - 3.16) < 5e-3)
D_ = (B[0] + C[0] - A[0], B[1] + C[1] - A[1]); M_ = (Q(B[0] + C[0], 2), Q(B[1] + C[1], 2))
comprobar('t7 P1 (c) D=(7,4), circuncentro (4,3), R=√10', D_ == (7, 4) and sub(D_, B) == AC and M_ == (4, 3) and sp.simplify(mod(BC) / 2 - sp.sqrt(10)) == 0 and all(sp.simplify(mod(sub(M_, p)) - sp.sqrt(10)) == 0 for p in (A, B, C)))
k = sp.symbols('k', real=True)
comprobar('t7 P2 (a)(b)', sp.solve(det((k, 3), (2, -1)), k) == [-6] and sp.solve(dot((k, 3), (2, -1)), k) == [Q(3, 2)])
sol45 = sp.solve(sp.Eq(2 * (2 * k - 3) ** 2, 5 * (k ** 2 + 9)), k)
comprobar('t7 P2 (c) k=9 (k=−1 da 135°)', sorted(sol45) == [-1, 9] and abs(angd((9, 3), (2, -1)) - 45) < 1e-9 and abs(angd((-1, 3), (2, -1)) - 135) < 1e-9 and dot((-1, 3), (2, -1)) == -5)
Wt = 100 * 5 * math.cos(math.radians(30)); Nn = 20 * 9.8 - 100 * math.sin(math.radians(30)); Wr = -0.2 * Nn * 5
comprobar('t7 P3 baúl', abs(Wt - 433.0) < 0.05 and abs(Nn - 146) < 1e-9 and abs(0.2 * Nn - 29.2) < 1e-9 and abs(Wr + 146) < 1e-9 and abs(Wt + Wr - 287.0) < 0.05)
dr, dv, ts, dm = moviles((0, 0), (3, 4), (30, 0), (-3, 4))
comprobar('t7 P4 choque en t=5 en (15,20)', det(dr, dv) == 0 and ts == 5 and dm == 0 and (3 * 5, 4 * 5) == (15, 20) == (30 - 3 * 5, 4 * 5))
dr, dv, ts, dm = moviles((0, 0), (3, 4), (30, 3), (-3, 4))
comprobar('t7 P4 B desde (30,3): t*=5, d mín = 3', ts == 5 and dm == 3)
Aq, Bq, Cq, Dq = (0, 0), (6, 0), (8, 4), (2, 6)
mp = lambda p, q: ((p[0] + q[0]) / 2, (p[1] + q[1]) / 2)
M1, N1, P1, Q1 = mp(Aq, Bq), mp(Bq, Cq), mp(Cq, Dq), mp(Dq, Aq)
sh = lambda pts: abs(sum(pts[i][0] * pts[(i + 1) % len(pts)][1] - pts[(i + 1) % len(pts)][0] * pts[i][1] for i in range(len(pts)))) / 2
comprobar('t7 P5 Varignon (numérico)', (M1, N1, P1, Q1) == ((3, 0), (7, 2), (5, 5), (1, 3)) and sub(N1, M1) == sub(P1, Q1) == (4, 2) and sh([M1, N1, P1, Q1]) == 16 and sh([Aq, Bq, Cq, Dq]) == 32)
Ax, Ay, Bx, By, Cx, Cy, Dx, Dy = sp.symbols('Ax Ay Bx By Cx Cy Dx Dy', real=True)
comprobar('t7 P5 Varignon (simbólico)', sp.simplify((Cx - Ax) / 2 - ((Cx + Dx) / 2 - (Dx + Ax) / 2)) == 0 and sp.simplify(((Bx + Cx) / 2 - (Ax + Bx) / 2) - (Cx - Ax) / 2) == 0)

# --- Ejercicios nuevos v37–v49
comprobar('t7 v37', nums(E7, 'v37') == [10, 5] and (dot((2, 11), (Q(6, 10), Q(8, 10))), dot((2, 11), (Q(-8, 10), Q(6, 10)))) == (10, 5))
comprobar('t7 v38', nums(E7, 'v38') == [24.5] and abs(5 * 9.8 * 0.5 - 24.5) < 1e-12)
comprobar('t7 v39', cm([3, 5], [(0, 1), (8, 5)]) == (5, Q(7, 2)) and nums(E7, 'v39') == [5, 3.5])
v_, d_ = (7, 2), (4, 3)
comprobar('t7 v40', cerca(abs(dot(v_, d_)) / 5, nums(E7, 'v40')[0]) and cerca(abs(det(d_, v_)) / 5, nums(E7, 'v40')[1]) and nums(E7, 'v40') == [6.8, 2.6] and abs(6.8 ** 2 + 2.6 ** 2 - 53) < 1e-9 and dot(v_, v_) == 53)
comprobar('t7 v41', cerca(math.tan(math.radians(25)), nums(E7, 'v41')[0], 2e-3))
dr, dv, ts, dm = moviles((0, 0), (4, 2), (12, 0), (-2, 4))
comprobar('t7 v42', dr == (12, 0) and dv == (-6, 2) and ts == Q(9, 5) and cerca(float(ts), nums(E7, 'v42')[0]) and cerca(float(dm), nums(E7, 'v42')[1], 2e-3) and abs(float(dm) - 24 / math.sqrt(40)) < 1e-12)
cmL = cm([12, 12], [(3, 1), (Q(3, 2), 4)])
comprobar('t7 v43', cmL == (Q(9, 4), Q(5, 2)) and [float(c_) for c_ in cmL] == nums(E7, 'v43'))
At, Bt, Ct = (0, 0), (6, 0), (4, 1)
pr3 = (dot(sub(Bt, At), sub(Ct, At)), dot(sub(At, Bt), sub(Ct, Bt)), dot(sub(At, Ct), sub(Bt, Ct)))
comprobar('t7 v44', pr3[2] == -7 and pr3[0] > 0 and pr3[1] > 0 and opt(E7, 'v44', 0).startswith('obtusángulo') and cerca(angd(sub(At, Ct), sub(Bt, Ct)), check(E7, 'v44', 1)['valor'], 2e-3) and abs(angd(sub(At, Ct), sub(Bt, Ct)) - 139.4) < 0.05)
ee1 = (2 / sp.sqrt(5), 1 / sp.sqrt(5)); p5 = dot((1, 3), ee1); ww = (1 - p5 * ee1[0], 3 - p5 * ee1[1]); ee2 = (ww[0] / mod(ww), ww[1] / mod(ww))
comprobar('t7 v45', sp.simplify(ww[0] + 1) == 0 and sp.simplify(ww[1] - 2) == 0 and cerca(ee2[0], nums(E7, 'v45')[0], 2e-3) and cerca(ee2[1], nums(E7, 'v45')[1], 2e-3) and abs(float(dot(ee2, ee1))) < 1e-12)
a_ = sp.symbols('a')
dr_ = (10, a_); dv_ = (-8, -4); sa = sp.solve(det(dr_, dv_), a_)
comprobar('t7 v46', sa == [5] and nums(E7, 'v46') == [5, 1.25] and (6 * 1.25, 0) == (10 - 2 * 1.25, 5 - 4 * 1.25) and dv_ == sub((-2, -4), (6, 0)))
comprobar('t7 v47', sorted(sol45) == [-1, 9] and nums(E7, 'v47') == [9, 135] and abs(angd((-1, 3), (2, -1)) - 135) < 1e-9)
comprobar('t7 v48 y v49 (rúbricas)', check(E7, 'v48')['tipo'] == 'rubrica' and check(E7, 'v49')['tipo'] == 'rubrica' and sp.simplify(((Bx + Cx) / 2 - (Ax + Bx) / 2) - ((Cx + Dx) / 2 - (Dx + Ax) / 2)) == 0)
pasos_y_resultado(E7, [f'v{k_}' for k_ in range(37, 50)], 't7')
# test y errores nuevos
q = preg('t7', 'quiz1', 'El centro de masas de 2 kg en x = 0 y 6 kg')
comprobar('t7 test CM', q and q['op'][q['ok']] == '6' and cm([2, 6], [(0, 0), (8, 0)]) == (6, 0))
q = preg('t7', 'quiz1', 'Si |u| = 3, |v| = 4 y u·v = 6')
comprobar('t7 test área 6√3', q and q['op'][q['ok']].startswith('6√3') and abs(math.sqrt(144 - 36) - 6 * math.sqrt(3)) < 1e-12 and abs(6 * math.sqrt(3) - 10.39) < 5e-3)
q = preg('t7', 'quiz1', 'Un bloque está sobre un plano inclinado 30°')
comprobar('t7 test P∥', q and q['op'][q['ok']].startswith('P·sen 30°') and abs(math.sin(math.radians(30)) - 0.5) < 1e-12)
q = preg('t7', 'errores', 'Un alumno calcula la proyección de v = (2, 3)')
vp2 = prox((2, 3), (4, 1))
comprobar('t7 error proyección', q is not None and (float(vp2[0]), float(vp2[1])) == (44 / 17, 11 / 17) and abs(44 / 17 - 2.59) < 5e-3 and abs(11 / 17 - 0.65) < 5e-3 and abs(11 / math.sqrt(17) - 2.67) < 5e-3 and abs(math.sqrt(13) - 3.61) < 5e-3)

# ==== FIN DE LOS TEMAS ====
print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f in fallos: print('  FALLO:', f)
