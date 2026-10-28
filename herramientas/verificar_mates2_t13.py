#!/usr/bin/env python3
"""
Verificación independiente (fracciones exactas de Python + sympy) del tema 13 de Matemáticas II (Azar y probabilidad):
 - cada ejercicio con respuesta numérica: el valor que acepta la web se recalcula desde el enunciado con
   enumeración de casos (dados, cartas, urnas) o con las fórmulas, sin compartir código con la web;
 - cada cifra de los ejemplos resueltos de la teoría;
 - los datos de los simuladores (m2_venn_prob, m2_total_bayes): sus preajustes son coherentes
   (regiones del Venn en [0, 1] y suman 1; las posteriores de Bayes suman 1 y coinciden con el recuento por enumeración);
 - las cifras de las preguntas de las actividades.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_mates2_t13.py /tmp/ampl.json
"""
import json, sys, itertools
from fractions import Fraction as Fr
from math import comb, factorial, perm
import sympy as sp

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['mates2']['t13']
EJ = {e['id']: e for e in T['ejercicios']}
fallos, ok = [], 0

def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

def valor(id_, i=0):
    c = EJ[id_]['check']
    c = c if isinstance(c, list) else [c]
    return c[i]['valor']

def ej(id_, esperado, i=0):
    v = valor(id_, i)
    comprobar(f'{id_}[{i}]', abs(v - float(esperado)) < 1e-9, f'web={v} esperado={float(esperado)}')

F = Fr
# ---------------------------------------------------------------- por enumeración
dos = list(itertools.product(range(1, 7), repeat=2))
def prob(suc, esp): return F(sum(1 for o in esp if suc(o)), len(esp))
ej('e1', prob(lambda d: d % 3 == 0 or d % 2 == 0, range(1, 7)))
# baraja española: 4 palos x (1..7, 10, 11, 12)
baraja = [(n, p) for p in range(4) for n in [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]]
ej('e2', prob(lambda c: c[0] >= 10 or c[0] == 1, baraja))
ej('e15', prob(lambda o: sum(o) == 8, dos))
ej('e16', prob(lambda o: 6 in o, dos))
ej('e43', prob(lambda o: 6 in o, list(itertools.product(range(1, 7), repeat=3))))
# ---------------------------------------------------------------- unión y De Morgan (modelo explícito de 4 regiones)
def regiones(pa, pb, pab):
    return {'a': pa - pab, 'i': pab, 'b': pb - pab, 'n': 1 - pa - pb + pab}
r = regiones(F(5, 10), F(4, 10), F(2, 10))
comprobar('datos e3: unión 0,7 con pab=0,2', r['a'] + r['i'] + r['b'] == F(7, 10))
ej('e3', r['i']); ej('e4', r['n']); ej('e5', 1 - r['i'])
ej('e6', 1 - (F(35, 100) + F(45, 100)))
ej('e13', F(5, 10) + F(6, 10) - F(5, 10) * F(6, 10))
# ---------------------------------------------------------------- combinatoria
ej('e7', perm(5, 3)); ej('e8', comb(8, 3))
comprobar('podio 8·7·6', perm(8, 3) == 336)
comprobar('MAMA 4!/(2!2!)', factorial(4) // (factorial(2) ** 2) == 6)
ej('e17', F(comb(10, 2) * comb(30, 3), comb(40, 5)))
comprobar('t17 cifras', comb(40, 5) == 658008 and comb(10, 2) * comb(30, 3) == 182700 and comb(30, 3) == 4060 and F(182700, 658008) == F(5075, 18278))
ej('e18', 1 - F(comb(6, 3), comb(10, 3)))
comprobar('comisión 20/120', comb(6, 3) == 20 and comb(10, 3) == 120)
ej('e19', F(2 * factorial(4), factorial(5)))
# Ana y Luis juntos por enumeración
perms = list(itertools.permutations(range(5)))
ej('e19', prob(lambda p: abs(p.index(0) - p.index(1)) == 1, perms))
ej('e42', F(comb(4, 2) * comb(6, 1), comb(10, 3)))
# ---------------------------------------------------------------- urnas
R, A = 5, 3
ej('e9', F(R, R + A) * F(R - 1, R + A - 1)); ej('e10', F(R, R + A) ** 2)
# 2.ª roja sin reposición, por enumeración de ordenaciones de las 8 bolas
bolas = ['R'] * 5 + ['A'] * 3
orden = set(itertools.permutations(range(8), 2))
rr = sum(1 for (i, j) in orden if bolas[i] == 'R' and bolas[j] == 'R'); r2 = sum(1 for (i, j) in orden if bolas[j] == 'R'); n = len(orden)
ej('e36', F(r2, n)); ej('e37', F(rr, r2))
comprobar('t9 con reposición 25/64 ≈ 0,391', abs(float(F(25, 64)) - 0.390625) < 1e-12 and abs(float(F(5, 14)) - 0.357142) < 1e-5)
# urna al azar: dos urnas (e14)
ej('e14', F(1, 2) * F(2, 5) + F(1, 2) * F(4, 5))
# U1 -> U2 por enumeración de las bolas de U1 y luego de las 6 de U2
u1 = ['B'] * 4 + ['N'] * 6
tot = F(0); b1b2 = F(0)
for i, b in enumerate(u1):
    u2 = ['B'] * 3 + ['N'] * 2 + [b]
    pb = F(u2.count('B'), 6)
    tot += F(1, 10) * pb
    if b == 'B': b1b2 += F(1, 10) * pb
ej('e32', tot); ej('e33', b1b2 / tot)
comprobar('t17/30 y 8/17', tot == F(17, 30) and b1b2 / tot == F(8, 17))
# ---------------------------------------------------------------- tiradores
ps = [F(8, 10), F(7, 10), F(6, 10)]
ning = (1 - ps[0]) * (1 - ps[1]) * (1 - ps[2])
ej('e20', 1 - ning)
exact1 = sum(ps[k] * (1 - ps[(k + 1) % 3]) * (1 - ps[(k + 2) % 3]) for k in range(3))
ej('e21', exact1)
comprobar('tres tiradores: los tres 0,336', ps[0] * ps[1] * ps[2] == F(336, 1000))
# por enumeración de los 8 resultados
tot1 = F(0); tot0 = F(0)
for res in itertools.product([0, 1], repeat=3):
    p = F(1)
    for k, x in enumerate(res): p *= ps[k] if x else 1 - ps[k]
    if sum(res) == 1: tot1 += p
    if sum(res) == 0: tot0 += p
comprobar('tiradores enumerando', tot1 == F(188, 1000) and tot0 == F(24, 1000))
# ---------------------------------------------------------------- independencia / incompatibilidad
x = sp.symbols('x')
sol = sp.solve(sp.Eq(F(3, 10) + x - F(3, 10) * x, F(58, 100)), x)[0]
ej('e22', sol)
ej('e23', F(58, 100) - F(3, 10))
# ---------------------------------------------------------------- condicionadas
pa, pb, pab = F(6, 10), F(5, 10), F(2, 10)
ej('e11', pab / pb); ej('e12', pab / pa); ej('e31', (pa - pab) / (1 - pb))
comprobar('t3: P(A|B)<P(A)<P(A|B̄); unión 0,9', pab / pb < pa < (pa - pab) / (1 - pb) and pa + pb - pab == F(9, 10))
# tabla 200 alumnos (e24-e26)
chicas_dep, chicas = 50, 120
chicas_nodep = chicas - chicas_dep; chicos_dep = 80 - chicas_dep; chicos_nodep = 80 - chicos_dep
comprobar('tabla 200: casillas', (chicas_nodep, chicos_dep, chicos_nodep) == (70, 30, 50) and chicas_dep + chicas_nodep + chicos_dep + chicos_nodep == 200)
ej('e24', F(chicas_dep, 80)); ej('e25', F(chicas_dep, chicas))
ind = F(chicas, 200) * F(80, 200)
comprobar('e26 no independientes (0,24 ≠ 0,25)', ind == F(24, 100) and F(chicas_dep, 200) == F(25, 100))
comprobar('e26 opción correcta es la 2.ª', EJ['e26']['check']['ok'] == 1)
# ---------------------------------------------------------------- total y Bayes
prev, sens, fp = F(1, 100), F(95, 100), F(5, 100)
pmas = prev * sens + (1 - prev) * fp
ej('e27', pmas); ej('e28', prev * sens / pmas)
comprobar('test: 9,5 / 49,5 / 59', (1000 * prev * sens, 990 * fp, 1000 * pmas) == (F(19, 2), F(99, 2), 59))
causas = [F(50, 100), F(30, 100), F(20, 100)]; q = [F(2, 100), F(3, 100), F(6, 100)]
pD = sum(c * x_ for c, x_ in zip(causas, q))
ej('e29', pD); ej('e30', causas[2] * q[2] / pD)
comprobar('fábrica: hojas y posteriores', [c * x_ for c, x_ in zip(causas, q)] == [F(10, 1000), F(9, 1000), F(12, 1000)] and
          [c * x_ / pD for c, x_ in zip(causas, q)] == [F(10, 31), F(9, 31), F(12, 31)] and sum(c * x_ / pD for c, x_ in zip(causas, q)) == 1)
comprobar('fábrica: media simple 3,67 % ≠ 3,1 %', abs(float(sum(q) / 3) - 0.0366667) < 1e-6 and pD == F(31, 1000))
comprobar('fábrica: P(M1|correcta) ≈ 0,506', abs(float(causas[0] * (1 - q[0]) / (1 - pD)) - 0.50567595) < 1e-7)
# moneda trucada
pc = F(1, 2) * F(8, 10) + F(1, 2) * F(1, 2)
ej('e34', pc); ej('e35', F(1, 2) * F(8, 10) / pc)
# test con falsos negativos
pe = F(2, 100); pneg = pe * F(1, 10) + (1 - pe) * F(96, 100)
ej('e38', pe * F(1, 10) / pneg)
comprobar('test negativo: 0,9428', pneg == F(9428, 10000))
# partición {A, Ā}
pa, b1, b2 = F(7, 10), F(5, 10), F(2, 10)
pB = pa * b1 + (1 - pa) * b2
ej('e39', pB); ej('e40', pa * b1 / pB)
comprobar('e40 = 35/41', pa * b1 / pB == F(35, 41))
# transporte público (sec. 8): 350/410
comprobar('transporte: 350/410 = 35/41', F(350, 410) == F(35, 41) and 700 * F(1, 2) == 350 and 300 * F(1, 5) == 60)
# e41
pab = F(6, 10) * F(1, 2); pA = F(85, 100) - F(6, 10) + pab
ej('e41', pA)
comprobar('t7: no independientes (0,33 ≠ 0,3), unión 0,85', pA * F(6, 10) == F(33, 100) and pab == F(3, 10) and pA + F(6, 10) - pab == F(85, 100))
# sensibilidad e46
s = sp.symbols('s')
sol = sp.solve(sp.Eq(F(1, 10) * s / (F(1, 10) * s + F(9, 10) * F(5, 100)), F(1, 2)), s)[0]
ej('e46', sol)
# ---------------------------------------------------------------- opciones y respuestas con letras
def opcion(id_, i, ok_):
    comprobar(f'{id_} opción {ok_}', EJ[id_]['check'][i]['ok'] == ok_ if isinstance(EJ[id_]['check'], list) else EJ[id_]['check']['ok'] == ok_)
opcion('e44', 0, 0); opcion('e45', 0, 0); opcion('e47', 0, 0)
# e44: incompatibles con probabilidades no nulas nunca son independientes (muestreo exhaustivo de enteros)
comprobar('e44 exhaustivo', all(0 != F(a, 20) * F(b, 20) for a in range(1, 20) for b in range(1, 20)))
# e45/e47 por identidad en el modelo de cuatro regiones, con muchos valores
import random
random.seed(7)
muestras = []
while len(muestras) < 300:
    pa_ = F(random.randint(1, 99), 100); pb_ = F(random.randint(1, 99), 100)
    lo, hi = max(0, pa_ + pb_ - 1), min(pa_, pb_)
    if lo > hi: continue
    muestras.append((pa_, pb_, lo + (hi - lo) * F(random.randint(0, 10), 10)))
RG = [(m, regiones(*m)) for m in muestras]
comprobar('300 muestras: regiones >= 0 y suman 1', all(all(v >= 0 for v in rg.values()) and sum(rg.values()) == 1 for m, rg in RG))
comprobar('300 muestras: no los dos = 1 - P(A∩B) (De Morgan)', all(rg['a'] + rg['b'] + rg['n'] == 1 - m[2] for m, rg in RG))
comprobar('300 muestras: exactamente uno = P(A)+P(B)-2P(A∩B)', all(rg['a'] + rg['b'] == m[0] + m[1] - 2 * m[2] for m, rg in RG))
comprobar('300 muestras: ninguno = 1 - P(A∪B) (De Morgan)', all(rg['n'] == 1 - (m[0] + m[1] - m[2]) for m, rg in RG))
# ---------------------------------------------------------------- EvAU múltiple
pa, pb, pu = F(4, 10), F(5, 10), F(7, 10)
pi_ = pa + pb - pu; rg = regiones(pa, pb, pi_)
ej('e48', pi_, 0); ej('e48', pi_ / pb, 1); ej('e48', rg['n'], 2); ej('e48', rg['b'] / (1 - pa), 3)
comprobar('e48 independientes (opción 0)', pa * pb == pi_ and EJ['e48']['check'][4]['ok'] == 0)
# e49
pX, pY = F(2, 6), F(4, 6); pr = pX * F(3, 4) + pY * F(1, 4)
ej('e49', pr, 0); ej('e49', pX * F(3, 4) / pr, 1)
# ejemplos de teoría: dos dados suma 7 o dobles; dados par/múltiplo 3
ps7 = prob(lambda o: sum(o) == 7, dos); pdob = prob(lambda o: o[0] == o[1], dos)
comprobar('t1: 1/6, 6/36 + 6/36 = 1/3, disjuntos', ps7 == F(1, 6) and prob(lambda o: sum(o) == 7 or o[0] == o[1], dos) == F(1, 3) and ps7 + pdob == F(1, 3))
par = prob(lambda d: d % 2 == 0, range(1, 7)); m3 = prob(lambda d: d % 3 == 0, range(1, 7)); pm = prob(lambda d: d % 6 == 0, range(1, 7))
comprobar('t7: par y múltiplo de 3 independientes', par * m3 == pm)
comprobar('t7: par y {5,6} independientes', par * prob(lambda d: d >= 5, range(1, 7)) == prob(lambda d: d % 2 == 0 and d >= 5, range(1, 7)))
comprobar('t7: par y {4,5,6} dependientes (1/3 ≠ 1/4)', prob(lambda d: d % 2 == 0 and d > 3, range(1, 7)) == F(1, 3) and par * prob(lambda d: d > 3, range(1, 7)) == F(1, 4))
comprobar('t1: P(A∩B) ≥ 0,7+0,6−1 = 0,3', F(7, 10) + F(6, 10) - 1 == F(3, 10))
# De Morgan ejemplo: P(Ā∪B̄)=0,8, P(Ā∩B̄)=0,3, P(A)=0,5 → P(B)=0,4
pab = 1 - F(8, 10); pu = 1 - F(3, 10); comprobar('t6: De Morgan → P(B)=0,4', pu - F(5, 10) + pab == F(4, 10))
# ---------------------------------------------------------------- preajustes de los simuladores (leídos del JS)
import re, os
raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
js = open(os.path.join(raiz, 'ampliaciones', 'lab_mates2_t13.js'), encoding='utf8').read()
venn = re.findall(r'\{ k: "(\w+)", t: "([^"]+)", a: (\d+), b: (\d+), i: (\d+) \}', js)
comprobar('venn: 5 preajustes leídos', len(venn) == 5)
for k, t, a, b, i in venn:
    a, b, i = int(a), int(b), int(i)
    rg = regiones(F(a, 100), F(b, 100), F(i, 100))
    comprobar(f'venn {k}: regiones en [0,1] y suman 1', all(0 <= v <= 1 for v in rg.values()) and sum(rg.values()) == 1)
    comprobar(f'venn {k}: etiqueta coherente', {'ind': i * 100 == a * b, 'inc': i == 0, 'sub': i == min(a, b), 'dep': i * 100 != a * b and i > 0, 'cub': a + b - i == 100}[k])
tre = re.findall(r'\{ k: "(\w+)", t: "[^"]+", p: \[(\d+), (\d+)\], q: \[(\d+), (\d+), (\d+)\]', js)
comprobar('árbol: 4 preajustes leídos', len(tre) == 4)
for k, p1, p2, qa, qb, qc in tre:
    p = [F(int(p1), 100), F(int(p2), 100)]; p.append(1 - sum(p)); qq = [F(int(qa), 100), F(int(qb), 100), F(int(qc), 100)]
    hojas = [pk * qk for pk, qk in zip(p, qq)]; tot = sum(hojas)
    comprobar(f'árbol {k}: P(B3) ≥ 0', p[2] >= 0)
    post = [h / tot for h in hojas]
    comprobar(f'árbol {k}: posteriores suman 1', sum(post) == 1)
    # recuento por población (m = 1.000.000 de piezas) coincide con Bayes
    pobl = [int(1000000 * pk) for pk in p]; af = [pobl[j] * qq[j] for j in range(3)]
    comprobar(f'árbol {k}: recuento por población', all(abs(af[j] / sum(af) - post[j]) < 1e-9 for j in range(3)))
    if k == 'fab': comprobar('árbol fab = fábrica de la teoría', tot == F(31, 1000) and post[2] == F(12, 31))
    if k == 'dos': comprobar('árbol dos = ejemplo original (0,032; 0,625)', tot == F(32, 1000) and post[1] == F(5, 8))
    if k == 'edad': comprobar('árbol edad: los adultos son los más probables entre los enfermos', max(range(3), key=lambda j: post[j]) == 1)
    if k == 'ind': comprobar('árbol ind: posterior = prior', post == p)
# ---------------------------------------------------------------- preguntas de las actividades
comprobar('quiz: 7/8 tres monedas', 1 - F(1, 2) ** 3 == F(7, 8))
comprobar('quiz: C(7,2)=21, V(7,2)=42', comb(7, 2) == 21 and perm(7, 2) == 42)
comprobar('quiz: unión independiente 0,8', F(6, 10) + F(5, 10) - F(6, 10) * F(5, 10) == F(8, 10))
comprobar('quiz: reyes oros o copas 2/40', F(2, 40) == F(1, 20))
comprobar('error: 3 dados 91/216 ≈ 0,421', 1 - F(5, 6) ** 3 == F(91, 216) and abs(float(F(91, 216)) - 0.4213) < 1e-4)
comprobar('error: 2.ª roja 5/8', F(5, 8) * F(4, 7) + F(3, 8) * F(5, 7) == F(5, 8))
comprobar('quiz test médico ≈ 0,161', abs(float(F(95, 10000) / F(590, 10000)) - 0.161) < 1e-3)
# P(A|B)=P(B|A) ⇒ P(A)=P(B): sympy
a_, b_, c_ = sp.symbols('a b c', positive=True)
comprobar('error: P(A|B)=P(B|A) ⇒ P(A)=P(B)', sp.simplify(sp.solve(sp.Eq(c_ / b_, c_ / a_), a_)[0] - b_) == 0)

if fallos:
    print('FALLOS:'); [print(' ', f) for f in fallos]; sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos')
