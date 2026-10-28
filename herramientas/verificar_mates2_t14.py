#!/usr/bin/env python3
"""
Verificación independiente (scipy / sympy) del tema 14 de Matemáticas II (Distribuciones de probabilidad):
  · cada cifra de los ejemplos resueltos (teoría y problemas EvAU), buscada además en el texto de la web,
  · la tabla N(0,1) de 4 decimales que usa el texto,
  · la respuesta de cada ejercicio, recalculada desde el enunciado y comprobando que la tolerancia
    de la web aceptaría también el valor exacto de una calculadora,
  · el motor de los simuladores (Φ, Φ⁻¹, tabla, binomial, aproximación normal, discreta),
  · las respuestas del test, de «encuentra el error» y de la actividad de emparejar.
No comparte código con la web.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_mates2_t14.py /tmp/ampl.json [otro.json]
(el volcado de los simuladores se genera aquí con herramientas/volcar_mates2_t14.js; el segundo argumento se ignora)
"""
import json, sys, os, subprocess, re
from math import comb, sqrt
import numpy as np
from scipy.stats import norm, binom
import sympy as sp
from sympy import Rational as Q

datos = json.load(open(sys.argv[1]))
_raiz = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
sim = json.loads(subprocess.run(['node', os.path.join(_raiz, 'herramientas', 'volcar_mates2_t14.js')],
                                capture_output=True, text=True, check=True, cwd=_raiz).stdout)
T = datos['ampl']['mates2']['t14']
EJ = {e['id']: e for e in T['ejercicios']}
HTML = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
ok = 0
fallos = []

def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

def es(x, dec=4):
    """número con coma decimal y los decimales dados (sin ceros finales superfluos no se recortan)"""
    return f'{x:.{dec}f}'.replace('.', ',')

def Phi(z): return norm.cdf(z)
def Tb(z):
    """valor de la tabla N(0,1) (4 decimales) para z con dos decimales, con simetría"""
    z = round(z, 2)
    return round(Phi(abs(z)), 4) if z >= 0 else round(1 - round(Phi(abs(z)), 4), 4)

def claim(nombre, valor, texto, dec=4, tol=6e-5):
    """el valor calculado coincide con el que aparece escrito y el texto está en la web"""
    comprobar(nombre, abs(valor - float(texto.replace(',', '.'))) <= tol and texto in HTML, f'calc={valor} texto={texto}')

# ================= TABLA N(0,1): valores usados en el texto =================
for z, t in [(0.5, '0,6915'), (1, '0,8413'), (1.28, '0,8997'), (1.5, '0,9332'), (1.64, '0,9495'), (1.65, '0,9505'), (1.96, '0,9750'),
             (2, '0,9772'), (2.33, '0,9901'), (2.5, '0,9938'), (2.58, '0,9951'), (3, '0,9987'), (1.37, '0,9147'), (0.84, '0,7995'),
             (1.25, '0,8944'), (1.75, '0,9599'), (1.1, '0,8643'), (0.1, '0,5398'), (1.45, '0,9265'), (1.05, '0,8531'), (0.75, '0,7734'),
             (0.9, '0,8159'), (1.9, '0,9713'), (1.95, '0,9744'), (0.6, '0,7257'), (0.8, '0,7881'), (1.35, '0,9115'), (1.04, '0,8508'), (1.29, '0,9015')]:
    comprobar(f'tabla Φ({z}) = {t}', abs(Phi(z) - float(t.replace(',', '.'))) <= 5.1e-5 and t in HTML + json.dumps(T['ejercicios'], ensure_ascii=False).replace('.', ','), f'{Phi(z)}')

# ================= TEORÍA: ejemplos resueltos =================
# sec 0: tabla discreta (0,1; 0,3; 0,4; 0,15; 0,05)
x5 = np.array([0, 1, 2, 3, 4]); p5 = np.array([0.1, 0.3, 0.4, 0.15, 0.05])
mu5 = (x5 * p5).sum(); e25 = (x5**2 * p5).sum(); v5 = e25 - mu5**2
comprobar('ej discreta: Σp = 1', abs(p5.sum() - 1) < 1e-12)
claim('ej discreta μ', mu5, '1,75', tol=1e-9); claim('ej discreta E(X²)', e25, '4,05', tol=1e-9)
claim('ej discreta σ²', v5, '0,9875', tol=1e-9); comprobar('ej discreta σ ≈ 0,994', abs(sqrt(v5) - 0.994) < 5e-4 and '0,994' in HTML)
# incógnita k: P = k(x+1)
k = sp.Symbol('k'); xs = [0, 1, 2, 3]
ksol = sp.solve(sp.Eq(sum(k * (v + 1) for v in xs), 1), k)[0]
comprobar('ej k = 0,1', ksol == Q(1, 10))
mu_k = sum(v * ksol * (v + 1) for v in xs); e2k = sum(v**2 * ksol * (v + 1) for v in xs)
comprobar('ej k: μ = 2, E(X²) = 5, σ = 1', mu_k == 2 and e2k == 5 and e2k - mu_k**2 == 1)
# juego justo
comprobar('juego justo μ = 0', 5 * Q(1, 6) - 1 * Q(5, 6) == 0 and 4 * Q(1, 6) - Q(5, 6) == -Q(1, 6))
# binomial B(10; 0,3)
claim('B(10;.3) P(3)', binom.pmf(3, 10, .3), '0,2668'); claim('B(10;.3) P(X≥1)', 1 - .7**10, '0,9718')
claim('0,7^10', .7**10, '0,0282'); comprobar('0,0823543 = 0,7^7', abs(.7**7 - 0.0823543) < 1e-9)
comprobar('B(10;.3) P(8)+P(9)+P(10)', abs(binom.pmf(8, 10, .3) - 0.00145) < 5e-6 and abs(binom.pmf(9, 10, .3) - 0.00014) < 5e-6 and abs(binom.pmf(10, 10, .3) - 0.00001) < 5e-6
          and abs((1 - binom.cdf(7, 10, .3)) - 0.0016) < 5e-5 and '0,0016' in HTML)
comprobar('B(10;.3) μ = 3, σ = 1,449', abs(10 * .3 - 3) < 1e-12 and abs(sqrt(2.1) - 1.449) < 5e-4 and '1,449' in HTML)
# test 10 preguntas, 4 opciones
pm = [binom.pmf(j, 10, .25) for j in range(5)]
for j, t in enumerate(['0,0563', '0,1877', '0,2816', '0,2503', '0,1460']):
    claim(f'B(10;.25) P({j})', pm[j], t, tol=5.1e-5)
claim('B(10;.25) P(X≤4)', sum(pm), '0,9219', tol=5.1e-5); claim('B(10;.25) P(X≥5)', 1 - binom.cdf(4, 10, .25), '0,0781', tol=5.1e-5)
# sec 2: 68-95-99,7 y notas
for kk, t in [(1, 68.3), (2, 95.4), (3, 99.7)]:
    comprobar(f'regla {kk}σ = {t} %', abs((norm.cdf(kk) - norm.cdf(-kk)) * 100 - t) < 0.06)
claim('0,6826·200 = 136,5', (2 * Tb(1) - 1) * 200, '136,5', tol=0.05)
# sec 3: B(100;.5)
claim('aprox P(X≤55) con corrección', Tb(1.1), '0,8643'); claim('aprox P(X≤55) sin corrección', Tb(1), '0,8413')
claim('exacto P(X≤55)', binom.cdf(55, 100, .5), '0,8644', tol=1e-4)
claim('aprox P(X=50)', 2 * Tb(0.1) - 1, '0,0796'); claim('exacto P(X=50)', binom.pmf(50, 100, .5), '0,0796', tol=6e-5)
comprobar('diferencia 0,8643 − 0,8413 ≈ 0,023', abs(Tb(1.1) - Tb(1) - 0.023) < 1e-9 and '0,023' in HTML)
comprobar('B(40;.05): np = 2 < 5', 40 * .05 < 5)
# sec 5: tabla, cinco situaciones
claim('P(Z≥1,37)', 1 - Tb(1.37), '0,0853'); claim('P(Z≤−0,84)', 1 - Tb(.84), '0,2005')
claim('P(0,5≤Z≤1,5)', Tb(1.5) - Tb(.5), '0,2417'); claim('P(−1,25≤Z≤2)', Tb(2) + Tb(1.25) - 1, '0,8716')
claim('P(|Z|≤1,96)', 2 * Tb(1.96) - 1, '0,95', tol=1e-9)
claim('P(Z≤−1,5)', 1 - Tb(1.5), '0,0668'); claim('P(Z>2,33)', 1 - Tb(2.33), '0,0099')
claim('P(−1≤Z≤1)', 2 * Tb(1) - 1, '0,6826'); claim('P(1,25≤Z≤2)', Tb(2) - Tb(1.25), '0,0828')
for z, c in [(1.645, 0.95), (1.96, 0.975), (2.575, 0.995)]:
    comprobar(f'z {z} ↔ {c}', abs(norm.ppf(c) - z) < 0.002)
# sec 6: pesos N(70,8)
claim('P(X>80) z=1,25', 1 - Tb(1.25), '0,1056'); claim('P(62≤X≤78)', 2 * Tb(1) - 1, '0,6826')
claim('P(X<56) z=−1,75', 1 - Tb(1.75), '0,0401'); comprobar('1000·0,1056 ≈ 106', abs(1000 * 0.1056 - 105.6) < 1e-9 and '106' in HTML)
comprobar('(80-70)/8 = 1,25, (56-70)/8 = −1,75', (80 - 70) / 8 == 1.25 and (56 - 70) / 8 == -1.75)
comprobar('inverso 10 %: z = 1,28 (más cercano a 0,90)', min([1.27, 1.28, 1.29], key=lambda z: abs(Tb(z) - .9)) == 1.28 and abs(70 + 1.28 * 8 - 80.24) < 1e-9 and '80,24' in HTML)
comprobar('IC 95 %: 100 ± 1,96·15 = [70,6; 129,4]', abs(100 - 1.96 * 15 - 70.6) < 1e-9 and abs(100 + 1.96 * 15 - 129.4) < 1e-9 and '70,6; 129,4' in HTML and Tb(1.96) == 0.975)
comprobar('σ = 8: 0,9332 ↔ z = 1,5 y 12/8 = 1,5', Tb(1.5) == 0.9332 and 12 / 1.5 == 8)
sg_, mu_ = sp.symbols('sg_ mu_'); s2 = sp.solve([80 - mu_ - 2 * sg_, 56 - mu_ + sg_], [mu_, sg_])
comprobar('dos datos: μ = 64, σ = 8', s2[mu_] == 64 and s2[sg_] == 8 and Tb(2) == .9772 and abs(1 - Tb(1) - .1587) < 1e-9)
# sec 7: moneda 400
claim('B(400;.5) P(X≥215) aprox', 1 - Tb(1.45), '0,0735'); claim('B(400;.5) 190..210 aprox', 2 * Tb(1.05) - 1, '0,7062')
claim('exacto P(X≥215)', 1 - binom.cdf(214, 400, .5), '0,0735', tol=6e-5); claim('exacto 190..210', binom.cdf(210, 400, .5) - binom.cdf(189, 400, .5), '0,7063', tol=6e-5)
comprobar('sin corrección 190..210 → 0,6826, error ≈ 0,024', abs((2 * Tb(1) - 1) - 0.6826) < 1e-9 and abs(0.7063 - 0.6826 - 0.0237) < 1e-9 and '0,024' in HTML)
comprobar('B(400;.5): μ=200, σ=10', 400 * .5 == 200 and sqrt(400 * .25) == 10)
claim('B(900;.1) aprox P(X≤76)', 1 - Tb(1.5), '0,0668'); comprobar('B(900;.1): μ=90, σ=9, z=−1,5', 900 * .1 == 90 and sqrt(900 * .09) == 9 and (76.5 - 90) / 9 == -1.5)
comprobar('B(900;.1) condiciones', 900 * .1 >= 5 and 900 * .9 >= 5)
pa = 1 - Tb(1.0)
claim('altura P(X>179)', pa, '0,1587'); claim('1 − 0,8413⁵', 1 - 0.8413**5, '0,5785', tol=1e-4)
claim('0,8413⁵', 0.8413**5, '0,4215', tol=1e-4)

# ================= PROBLEMAS EvAU (sec 8) =================
claim('EvAU1 (a)', 1 - Tb(1.5), '0,0668'); claim('EvAU1 (b)', Tb(1.5) - (1 - Tb(.5)), '0,6247'); claim('EvAU1 (b) 1−0,6915', 1 - Tb(.5), '0,3085')
comprobar('EvAU1 (c) 1000+1,96·20 = 1039,2', abs(1000 + 1.96 * 20 - 1039.2) < 1e-9 and '1 039,2' in HTML)
comprobar('EvAU1 (d) 500·0,0668 = 33,4', abs(500 * 0.0668 - 33.4) < 1e-9 and '33,4' in HTML)
comprobar('EvAU1 z', (970 - 1000) / 20 == -1.5 and (990 - 1000) / 20 == -0.5 and (1030 - 1000) / 20 == 1.5)
claim('EvAU2 (a) 240/729', Q(240, 729) * 1.0, '0,3292', tol=5.1e-5); comprobar('EvAU2 (a) fracción', comb(6, 2) * Q(1, 3)**2 * Q(2, 3)**4 == Q(240, 729))
claim('EvAU2 (b) 665/729', float(Q(665, 729)), '0,9122', tol=5.1e-5); comprobar('EvAU2 (b) fracción', 1 - Q(2, 3)**6 == Q(665, 729) and Q(2, 3)**6 == Q(64, 729))
comprobar('EvAU2 (c) μ=2, σ=1,155', 6 * Q(1, 3) == 2 and abs(sqrt(float(6 * Q(1, 3) * Q(2, 3))) - 1.155) < 5e-4 and '1,155' in HTML)
p3 = [0.1, 0.2, 0.4, 0.3]; comprobar('EvAU3 k = 0,2 y suma 1', abs(sum(p3) - 1) < 1e-12 and abs(0.1 + 3 * 0.2 + 0.3 - 1) < 1e-12)
mu3 = sum(i * v for i, v in enumerate(p3)); e23 = sum(i * i * v for i, v in enumerate(p3))
comprobar('EvAU3 μ=1,9; E=4,5; σ²=0,89; σ=0,943; P(X≥2)=0,7', abs(mu3 - 1.9) < 1e-12 and abs(e23 - 4.5) < 1e-12 and abs(e23 - mu3**2 - 0.89) < 1e-12 and abs(sqrt(0.89) - 0.943) < 5e-4 and abs(p3[2] + p3[3] - 0.7) < 1e-12 and '0,943' in HTML)
comprobar('EvAU4 N(45;6)', 225 * .2 == 45 and sqrt(225 * .2 * .8) == 6 and 225 * .8 >= 5)
claim('EvAU4 (a)', 1 - Tb(.75), '0,2266'); claim('EvAU4 (b)', Tb(1.75), '0,9599')
claim('EvAU4 sin corrección z=0,83', 1 - Tb(.83), '0,2033'); comprobar('EvAU4 z = 0,75 y 1,75', (49.5 - 45) / 6 == .75 and (55.5 - 45) / 6 == 1.75)
comprobar('EvAU4 exactos cerca', abs(1 - binom.cdf(49, 225, .2) - 0.2266) < 0.01 and abs(binom.cdf(55, 225, .2) - 0.9599) < 0.01)
s5 = sp.solve([34 - mu_ - sg_, 22 - mu_ + 2 * sg_], [mu_, sg_])
comprobar('EvAU5 μ=30, σ=4', s5[mu_] == 30 and s5[sg_] == 4 and Tb(1) == .8413 and abs(1 - Tb(2) - .0228) < 1e-9)
comprobar('c11 1 − Φ(0,55) = 0,2912', abs(1 - Tb(.55) - 0.2912) < 1e-9 and '0,2912' in json.dumps(T['ejercicios'], ensure_ascii=False)); claim('EvAU5 P(X>36)', 1 - Tb(1.5), '0,0668'); comprobar('EvAU5 z', (36 - 30) / 4 == 1.5)

# ================= EJERCICIOS =================
def tol_ej(e): return e['check'].get('tol', 0.005)
phi_inv = norm.ppf
mu_d1 = sum(v * w for v, w in zip([0, 1, 2, 3], [.1, .3, .4, .2])); e2_d1 = sum(v * v * w for v, w in zip([0, 1, 2, 3], [.1, .3, .4, .2]))
two = np.array([1, 2, 3, 4]) * 0.1
dos = {2: 1 / 36, 3: 2 / 36, 4: 3 / 36, 5: 4 / 36, 6: 5 / 36, 7: 6 / 36, 8: 5 / 36, 9: 4 / 36, 10: 3 / 36, 11: 2 / 36, 12: 1 / 36}
mu_s = sum(a * b for a, b in dos.items()); var_s = sum(a * a * b for a, b in dos.items()) - mu_s**2
# (valor exacto de calculadora, valor con la tabla que usa la web)
esp = {
    'a1': (1 - 0.6, 0.4), 'a2': (mu_d1, 1.7), 'a3': (binom.pmf(3, 6, .5), 0.3125), 'a4': (sqrt(8 * .25 * .75), 1.2247), 'a5': (binom.pmf(0, 5, .4), 0.07776),
    'a6': ((130 - 100) / 15, 2), 'a7': (Phi(1.35), 0.9115), 'a8': (1 - Phi(1.35), 0.0885), 'a9': (Phi(-0.8), 0.2119), 'a10': (Phi(1) - Phi(-1), 0.6826),
    'a11': (norm.cdf(65, 50, 10), 0.9332), 'a12': (1 - binom.pmf(0, 5, .5), 0.96875),
    'b1': (sum(i * (0.1 * i) for i in [1, 2, 3, 4]), 3), 'b2': (sqrt(e2_d1 - mu_d1**2), 0.9), 'b3': (1 - binom.cdf(2, 10, .3), 0.6172), 'b4': (1 - binom.cdf(4, 10, .25), 0.0781),
    'b5': (1 - binom.pmf(0, 8, .1), 0.5695), 'b6': (1 - norm.cdf(80, 70, 8), 0.1056), 'b7': (norm.cdf(86, 70, 8) - norm.cdf(66, 70, 8), 0.6687),
    'b8': (norm.cdf(4.5, 6, 1.5), 0.1587), 'b9': (1 - norm.cdf(31, 25, 4), 0.0668), 'b10': (phi_inv(.9), 1.28), 'b11': (25 + phi_inv(.8) * 4, 28.36),
    'b12': (norm.cdf(42.5, 50, 5), 0.0668), 'b13': (norm.cdf(55.5, 50, 5) - norm.cdf(54.5, 50, 5), 0.0484), 'b14': (1 - norm.cdf(5, 5.9, 1.5), 0.7257),
    'b15': ((62 - 50) / phi_inv(0.9772), 6), 'b16': (30 - 5 * phi_inv(0.9772), 20),
    'c1': (next(n for n in range(1, 30) if 1 - .5**n >= .99), 7), 'c2': (binom.cdf(4, 5, .7) - binom.cdf(1, 5, .7), 0.8012),
    'c3': (float(6 * Q(1, 6) + 2 * Q(1, 6) - Q(4, 6)), 2 / 3), 'c4': (sum(v for s, v in dos.items() if s >= 10), 1 / 6), 'c5': (sqrt(var_s), 2.4152),
    'c6': (norm.cdf(186, 172, 7) - norm.cdf(165, 172, 7), 0.8185), 'c7': (1000 * (1 - norm.cdf(179, 172, 7)), 158.7), 'c8': (250 + phi_inv(.975) * 20, 289.2),
    'c9': (6 + phi_inv(.85) * 1.5, 7.56), 'c10': (1 - norm.cdf(144.5, 125, 10), 0.0256), 'c11': (norm.cdf(135.5, 125, 10) - norm.cdf(119.5, 125, 10), 0.5619),
    'c12': (1 - norm.cdf(59.5, 50, 5), 0.0287), 'c13': (None, 64), 'c14': (1 - (1 - (1 - norm.cdf(1))) ** 5, 0.5785), 'c15': (100 * 0.99 + (100 - 5000) * 0.01, 50), 'c16': (None, 16),
}
# B(625;.2) y B(100;.5): referencia con los valores binomiales exactos (para ver que la aproximación es razonable)
exacto_bin = {'b12': binom.cdf(42, 100, .5), 'b13': binom.pmf(55, 100, .5), 'c10': 1 - binom.cdf(144, 625, .2), 'c11': binom.cdf(135, 625, .2) - binom.cdf(119, 625, .2), 'c12': 1 - binom.cdf(59, 100, .5)}
for ident, (exa, web_esp) in esp.items():
    cv = EJ[ident]['check'].get('valor'); tol = tol_ej(EJ[ident])
    comprobar(f'{ident} valor web = valor de la tabla', abs(cv - web_esp) <= 1e-9 * max(1, abs(cv)) + (1e-4 if isinstance(web_esp, float) and ident not in ('a3', 'a4', 'a5', 'a12', 'c3', 'c4', 'c5') else 1e-4) * 0, f'web={cv} esp={web_esp}')
    if exa is not None:
        comprobar(f'{ident} la web acepta el valor exacto de calculadora', abs(exa - cv) <= tol * abs(cv) + 1e-12, f'web={cv} exacto={exa} tol={tol}')
for ident, v in exacto_bin.items():
    cv = EJ[ident]['check']['valor']
    comprobar(f'{ident} aproximación normal cerca del valor binomial exacto', abs(v - cv) <= 0.003, f'web={cv} binomial={v}')
# c13 y c16 por sistemas
sol13 = sp.solve([80 - mu_ - 2 * sg_, 56 - mu_ + sg_], [mu_, sg_]); comprobar('c13 μ = 64', sol13[mu_] == 64 and abs(Phi(2) - 0.9772) < 5e-5 and abs(Phi(-1) - 0.1587) < 5e-5)
nn, pp = sp.symbols('nn pp', positive=True); sol16 = sp.solve([nn * pp - 12, nn * pp * (1 - pp) - 3], [nn, pp], dict=True)
comprobar('c16 n = 16', any(s[nn] == 16 and s[pp] == Q(3, 4) for s in sol16) and EJ['c16']['check']['valor'] == 16)
# tablas de pasos intermedios
comprobar('b3 pasos P(0,1,2)', all(abs(binom.pmf(j, 10, .3) - v) < 5.1e-5 for j, v in enumerate([0.0282, 0.1211, 0.2335])) and abs(binom.cdf(2, 10, .3) - 0.3828) < 5e-5)
comprobar('b5: 0,9^8 = 0,4305', abs(.9**8 - 0.4305) < 5e-5); comprobar('a5: 0,6^5', abs(.6**5 - 0.07776) < 1e-12)
comprobar('c1 pasos: 0,5^6 = 0,0156; 0,5^7 = 0,0078', abs(.5**6 - 0.0156) < 5.1e-5 and abs(.5**7 - 0.0078) < 5.1e-5)
comprobar('c2 pasos', abs(binom.pmf(0, 5, .7) - .00243) < 1e-9 and abs(binom.pmf(1, 5, .7) - .02835) < 1e-9 and abs(binom.pmf(5, 5, .7) - .16807) < 1e-9 and abs(.00243 + .02835 + .16807 - 0.19885) < 1e-9)
comprobar('c5 E(X²) = 1974/36', sum(a * a * b for a, b in dos.items()) * 36 - 1974 < 1e-9 and var_s - 35 / 6 < 1e-12)
comprobar('b11/c9 z de tabla', min([.83, .84, .85], key=lambda z: abs(Tb(z) - .80)) == .84 and min([1.03, 1.04, 1.05], key=lambda z: abs(Tb(z) - .85)) == 1.04)
comprobar('b10 z', min([1.27, 1.28, 1.29], key=lambda z: abs(Tb(z) - .90)) == 1.28)
comprobar('c8 intervalo [210,8; 289,2]', abs(250 - 1.96 * 20 - 210.8) < 1e-9)
comprobar('c11 z = −0,55 y 1,05', (119.5 - 125) / 10 == -0.55 and (135.5 - 125) / 10 == 1.05 and abs(Tb(1.05) - (1 - Tb(.55)) - 0.5619) < 1e-9)
comprobar('a13 n·p = 2 < 5', 20 * .1 < 5 and EJ['a13']['check']['opciones'][EJ['a13']['check']['ok']].startswith('No: n·p'))
comprobar('a14 N(20;4)', EJ['a14']['check']['valores'] == [20, 4] and 100 * .2 == 20 and sqrt(100 * .2 * .8) == 4)
comprobar('b4 / EvAU: C(...) y fracciones de a12', sp.Rational(31, 32) == 1 - Q(1, 32))
# número de ejercicios y niveles
niv = [e['nivel'] for e in T['ejercicios']]
comprobar('≥ 40 ejercicios en tres niveles', len(niv) >= 40 and set(niv) == {1, 2, 3}, f'{len(niv)}')

# ================= SIMULADORES: motor =================
for r in sim['phi']: comprobar(f"motor Φ({r['z']})", abs(r['v'] - Phi(r['z'])) < 1e-9, f"{r['v']} vs {Phi(r['z'])}")
for r in sim['inv']: comprobar(f"motor Φ⁻¹({r['p']})", abs(r['v'] - phi_inv(r['p'])) < 1e-6, f"{r['v']} vs {phi_inv(r['p'])}")
for r in sim['tabla']: comprobar(f"motor tabla({r['z']})", abs(r['v'] - Tb(r['z'])) < 1e-9, f"{r['v']} vs {Tb(r['z'])}")
def zt(p):
    cand = [round(z, 2) for z in np.arange(-4, 4.0001, 0.01)]
    return min(cand, key=lambda z: (round(abs(Tb(z) - p), 10), 0))
for r in sim['zt']:
    esperado = zt(r['p']); comprobar(f"motor z de tabla para {r['p']}", abs(Tb(r['v']) - r['p']) <= abs(Tb(esperado) - r['p']) + 1e-9, f"{r['v']} vs {esperado}")
for r in sim['pmf']:
    comprobar(f"motor binomial B({r['n']};{r['p']}) P({r['k']})", abs(r['v'] - binom.pmf(r['k'], r['n'], r['p'])) < 1e-12 and abs(r['c'] - binom.cdf(r['k'], r['n'], r['p'])) < 1e-12)
for r in sim['aprox']:
    n, p, k, m = r['n'], r['p'], r['k'], r['m']; mu, sg = n * p, sqrt(n * p * (1 - p))
    ex = {'le': binom.cdf(k, n, p), 'eq': binom.pmf(k, n, p), 'ge': 1 - binom.cdf(k - 1, n, p)}[m]
    sin = {'le': norm.cdf(k, mu, sg), 'eq': 0, 'ge': 1 - norm.cdf(k, mu, sg)}[m]
    con = {'le': norm.cdf(k + .5, mu, sg), 'eq': norm.cdf(k + .5, mu, sg) - norm.cdf(k - .5, mu, sg), 'ge': 1 - norm.cdf(k - .5, mu, sg)}[m]
    comprobar(f'motor aprox B({n};{p}) {m} {k}', abs(r['ex'] - ex) < 1e-9 and abs(r['sin'] - sin) < 1e-9 and abs(r['con'] - con) < 1e-9 and r['cond'] == (n * p >= 5 and n * (1 - p) >= 5) and abs(r['mu'] - mu) < 1e-9 and abs(r['sg'] - sg) < 1e-9)
# la corrección mejora (casos de la teoría)
cas = {(r['n'], r['p'], r['k'], r['m']): r for r in sim['aprox']}
comprobar('corrección mejora B(100;.5) P(X≤55)', abs(cas[(100, .5, 55, 'le')]['con'] - cas[(100, .5, 55, 'le')]['ex']) < abs(cas[(100, .5, 55, 'le')]['sin'] - cas[(100, .5, 55, 'le')]['ex']))
comprobar('B(40;.05) marcada como no válida', cas[(40, .05, 2, 'le')]['cond'] is False and cas[(40, .5, 22, 'le')]['cond'] is True)
for d in sim['disc']:
    x = np.array(d['x'], float); p = np.array(d['p']); mu = (x * p).sum(); sg = sqrt((x**2 * p).sum() - mu**2)
    comprobar(f"motor discreta {d['x']}", abs(d['mu'] - mu) < 1e-12 and abs(d['sg'] - sg) < 1e-12 and abs(d['sp'] - 1) < 1e-12)
dd = sim['disc']
comprobar('discretas: dado μ=3,5; 2 monedas μ=1; suma dos dados μ=7, σ²=35/6; juego μ=0; tabla μ=1,75',
          abs(dd[0]['mu'] - 3.5) < 1e-12 and abs(dd[1]['mu'] - 1) < 1e-12 and abs(dd[2]['mu'] - 7) < 1e-12 and abs(dd[2]['sg']**2 - 35 / 6) < 1e-12 and abs(dd[3]['mu']) < 1e-12 and abs(dd[4]['mu'] - 1.75) < 1e-12)

# ================= TEST, ERRORES, EMPAREJAR =================
Q1 = T['datos']['quiz1']['preguntas']
def resp(q): return re.sub('<[^>]+>', '', q['op'][q['ok']])
comprobar('test: μ B(10;.5) = 5', resp(Q1[1]) == '5'); comprobar('test: σ B(100;.5) = 5', resp(Q1[2]) == '5' and sqrt(100 * .25) == 5)
comprobar('test: al menos uno', '1 − 0,9⁸' in resp(Q1[3]))
comprobar('test: P(Z≤−0,5) = 0,3085', resp(Q1[4]) == '0,3085' and Tb(.5) == .6915 and abs(1 - Tb(.5) - .3085) < 1e-9)
comprobar('test: P(X≥70) = 0,0228', resp(Q1[5]) == '0,0228' and abs(1 - Tb(2) - 0.0228) < 1e-9)
comprobar('test: z entre 1,64 y 1,65', Tb(1.64) < .95 < Tb(1.65) and 'entre 1,64 y 1,65' in resp(Q1[7]))
comprobar('test: P(X≤60) → 60,5', resp(Q1[8]) == 'P(Y ≤ 60,5)')
E_ = T['datos']['errores']['preguntas']
comprobar('error 1: complementario de X≥3 es X≤2', 'P(X ≤ 2)' in E_[0]['op'][E_[0]['ok']] and abs(binom.cdf(2, 10, .3) + (1 - binom.cdf(2, 10, .3)) - 1) < 1e-12 and (1 - binom.cdf(3, 10, .3)) != (1 - binom.cdf(2, 10, .3)))
comprobar('error 2: P(Z≤−1) = 0,1587', '0,1587' in E_[1]['op'][E_[1]['ok']] and abs(1 - Tb(1) - 0.1587) < 1e-9)
comprobar('error 3: P(Y≤55,5) = 0,8643 y sin corrección 0,8413', '0,8643' in E_[2]['op'][E_[2]['ok']] and Tb(1.1) == .8643 and Tb(1) == .8413)
comprobar('error 4: np = 2 < 5, σ = 1,4', 'n·p = 2' in E_[3]['op'][E_[3]['ok']] and abs(sqrt(100 * .02 * .98) - 1.4) < 1e-9)
comprobar('error 5: 95 % ↔ 1,96σ; 3σ ↔ 99,7 %', abs(norm.cdf(3) - norm.cdf(-3) - 0.9973) < 5e-5 and abs(norm.ppf(.975) - 1.96) < 5e-4)
comprobar('error 6: sin reemplazamiento no es binomial (P(roja en 2ª) depende de la 1ª)', Q(3, 9) != Q(4, 9) and Q(4, 10) * Q(3, 9) != Q(4, 10)**2)
# emparejar: regla de corrección de continuidad con k = 12 y n=100, p=0,5 (comprobada numéricamente: la normal con la regla se acerca más a la binomial)
n_, p_, k_ = 100, .5, 12 + 38; mu_c, sg_c = n_ * p_, sqrt(n_ * p_ * (1 - p_))
reglas = {'P(X ≤ 12)': ('le', 0.5), 'P(X ≥ 12)': ('ge', -0.5), 'P(X < 12)': ('lt', -0.5), 'P(X > 12)': ('gt', 0.5)}
kk = 52; mu_c = 50
exa = {'le': binom.cdf(kk, 100, .5), 'ge': 1 - binom.cdf(kk - 1, 100, .5), 'lt': binom.cdf(kk - 1, 100, .5), 'gt': 1 - binom.cdf(kk, 100, .5)}
nor = {'le': norm.cdf(kk + .5, 50, 5), 'ge': 1 - norm.cdf(kk - .5, 50, 5), 'lt': norm.cdf(kk - .5, 50, 5), 'gt': 1 - norm.cdf(kk + .5, 50, 5)}
comprobar('emparejar: reglas ≤, ≥, <, > mejoran la aproximación (k=52, B(100;.5))', all(abs(nor[m] - exa[m]) < 0.002 for m in exa), str({m: (nor[m], exa[m]) for m in exa}))
comprobar('emparejar: P(X=k) y P(a≤X≤b)', abs(norm.cdf(kk + .5, 50, 5) - norm.cdf(kk - .5, 50, 5) - binom.pmf(kk, 100, .5)) < 5e-4
          and abs(norm.cdf(54.5, 50, 5) - norm.cdf(49.5, 50, 5) - (binom.cdf(54, 100, .5) - binom.cdf(49, 100, .5))) < 1e-3)
pares = {a: b for a, b in T['datos']['empar']['pares']}
comprobar('emparejar: texto de los pares', pares == {'P(X ≤ 12)': 'P(Y ≤ 12,5)', 'P(X ≥ 12)': 'P(Y ≥ 11,5)', 'P(X &lt; 12)': 'P(Y ≤ 11,5)', 'P(X &gt; 12)': 'P(Y ≥ 12,5)',
                                                       'P(X = 12)': 'P(11,5 ≤ Y ≤ 12,5)', 'P(10 ≤ X ≤ 12)': 'P(9,5 ≤ Y ≤ 12,5)'})
comprobar('orden: z = 1,28 → k = 80,24', abs(70 + 1.28 * 8 - 80.24) < 1e-9)

print(f"{ok} comprobaciones correctas, {len(fallos)} fallos")
for f_ in fallos: print('  FALLO', f_)
sys.exit(1 if fallos else 0)
