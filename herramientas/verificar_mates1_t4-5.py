#!/usr/bin/env python3
"""
Verificación independiente (sympy / python) del refuerzo de los temas 4 (Trigonometría:
razones y resolución de triángulos) y 5 (Fórmulas trigonométricas) de Matemáticas I:
ejemplos de la teoría nueva, ejercicios g37–g48 y h37–h48, preguntas de test y de
«encuentra el error» añadidas. No comparte código con la web: cada cifra se recalcula
desde los datos del enunciado (con coordenadas, fuerza bruta sobre una malla de ángulos
o álgebra simbólica).

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_mates1_t4-5.py /tmp/ampl.json
"""
import json, math, os, sys, random, inspect
import sympy as sp

datos = json.load(open(sys.argv[1]))
T4 = datos['ampl']['mates1']['t4']
T5 = datos['ampl']['mates1']['t5']
E4 = {e['id']: e for e in T4['ejercicios']}
E5 = {e['id']: e for e in T5['ejercicios']}

fallos, ok = [], 0
def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

D = math.radians
def sd(a): return math.sin(D(a))
def cd(a): return math.cos(D(a))
def td(a): return math.tan(D(a))
def deg(r): return math.degrees(r)
def _aviso(tipo, a, b, e):
    if os.environ.get('VERBOSO'): print(f'   {tipo} falla: {a!r} vs {b!r} (tol {e}) · línea {inspect.stack()[2].lineno}')
def near(a, b, tol=0.006):
    r = abs(a - b) <= tol * max(abs(b), 1e-9)
    if not r: _aviso('near', a, b, tol)
    return r
def cerca(a, b, e):
    r = abs(a - b) <= e
    if not r: _aviso('cerca', a, b, e)
    return r
def circ(a, b): d = abs(a - b) % 360; return min(d, 360 - d)

def chk(E, id_, k=0):
    c = E[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[k]
def nv(E, id_, k=0): return chk(E, id_, k)['valor']
def lv(E, id_): return sorted(chk(E, id_)['valores'])

def ceros(f, h=0.01):
    """Ceros de f (en grados) en [0°, 360°): cambios de signo y mínimos de |f| (raíces dobles)."""
    N = int(round(360 / h)); xs = [i * h for i in range(N + 1)]; ys = [f(x) for x in xs]
    raw = []
    for i in range(N):
        y0, y1 = ys[i], ys[i + 1]
        if abs(y0) < 1e-13: raw.append(xs[i]); continue
        if y0 * y1 < 0:
            a, b = xs[i], xs[i + 1]
            for _ in range(60):
                m = (a + b) / 2
                if f(a) * f(m) <= 0: b = m
                else: a = m
            raw.append((a + b) / 2)
    for i in range(1, N):
        a0, a1, a2 = abs(ys[i - 1]), abs(ys[i]), abs(ys[i + 1])
        if a1 <= a0 and a1 <= a2 and a1 < 1e-3:
            lo, hi = xs[i - 1], xs[i + 1]
            for _ in range(80):
                m1, m2 = lo + (hi - lo) / 3, hi - (hi - lo) / 3
                if abs(f(m1)) < abs(f(m2)): hi = m2
                else: lo = m1
            xm = (lo + hi) / 2
            if abs(f(xm)) < 1e-9: raw.append(xm)
    out = []
    for r in sorted(raw):
        r = r % 360
        if not any(circ(r, q) < 0.02 for q in out): out.append(r)
    return sorted(out)

def mismos(sol, claim, e=0.011):
    return len(sol) == len(claim) and all(circ(a, b) <= e for a, b in zip(sorted(sol), sorted(claim)))

# =====================================================================
# 0. Estructura: objetivos de cantidad
# =====================================================================
comprobar('t4: ≥ 46 ejercicios', len(E4) >= 46, len(E4))
comprobar('t5: ≥ 46 ejercicios', len(E5) >= 46, len(E5))
for nombre, E, nuevos in (('t4', E4, [f'g{i}' for i in range(37, 49)]), ('t5', E5, [f'h{i}' for i in range(37, 49)])):
    for i in nuevos:
        e = E[i]
        comprobar(f'{nombre} {i} tiene pasos y resultado', bool(e.get('pasos')) and bool(e.get('resultado')) and (chk(E, i)['tipo'] == 'rubrica' or bool(e.get('pistas'))))
    comprobar(f'{nombre}: ≥ 14 ejercicios ★★★', sum(1 for e in E.values() if e['nivel'] == 3) >= 14)
comprobar('t4: +3 en errores y +6 en test', len(T4['datos']['errores']['preguntas']) == 11 and len(T4['datos']['quiz1']['preguntas']) == 16)
comprobar('t5: +3 en errores y +6 en test', len(T5['datos']['errores']['preguntas']) == 10 and len(T5['datos']['quiz1']['preguntas']) == 16)
comprobar('t4: laminas ≥ 10', len(T4['lamina']) >= 10)
comprobar('t5: laminas ≥ 9', len(T5['lamina']) >= 9)

# =====================================================================
# TEMA 4 · teoría nueva
# =====================================================================
# --- 11. Del valor al ángulo
comprobar('t4 §11 arcsen(−0,8)', cerca(deg(math.asin(-0.8)), -53.13, 0.0051))
comprobar('t4 §11 sen α = −0,8 en el 3.er cuadrante', cerca(180 + 53.13, 233.13, 0.0051) and sd(233.13) < 0 and cd(233.13) < 0 and cerca(360 - 53.13, 306.87, 0.0051))
cC = (49 + 81 - 144) / (2 * 7 * 9)
comprobar('t4 §11 triángulo 7, 9, 12', cerca(cC, -1 / 9, 1e-12) and cerca(deg(math.acos(cC)), 96.38, 0.0051) and cerca(math.sqrt(1 - cC * cC), 0.9938, 5e-5) and cerca(deg(math.asin(math.sqrt(1 - cC * cC))), 83.62, 0.0051) and cerca(180 - 83.62, 96.38, 1e-9))
comprobar('t4 §11 tan x = −2', cerca(deg(math.atan(-2)), -63.43, 0.0051) and cerca(180 + deg(math.atan(-2)), 116.57, 0.0051) and cerca(360 + deg(math.atan(-2)), 296.57, 0.0051) and cerca(td(116.57), -2, 0.002))
comprobar('t4 §11 tabla de rangos', cerca(deg(math.acos(.5)), 60, 1e-9) and cerca(deg(math.acos(-.5)), 120, 1e-9) and cerca(deg(math.asin(-.5)), -30, 1e-9) and cerca(deg(math.atan(-1)), -45, 1e-9))
comprobar('t4 §11 rango de arcsen/arccos/arctan (muestreo)', all(-90 <= deg(math.asin(k / 50)) <= 90 and 0 <= deg(math.acos(k / 50)) <= 180 and -90 < deg(math.atan(k)) < 90 for k in range(-50, 51)))

# --- secciones[5]: clasificar triángulos
def mayor_cos(a, b, c):
    l = sorted([a, b, c]); return (l[0] ** 2 + l[1] ** 2 - l[2] ** 2) / (2 * l[0] * l[1])
comprobar('t4 clasificar 5, 6, 7 (acutángulo)', 49 < 25 + 36 and cerca(deg(math.acos(mayor_cos(5, 6, 7))), 78.46, 0.0051))
comprobar('t4 clasificar 4, 5, 8 (obtusángulo)', 64 > 16 + 25 and cerca(mayor_cos(4, 5, 8), -0.575, 1e-12) and cerca(deg(math.acos(mayor_cos(4, 5, 8))), 125.10, 0.0051))
comprobar('t4 desigualdad triangular 3, 4, 8', 3 + 4 < 8)

# --- 12. Radianes
comprobar('t4 §12 −750°', (-750) % 360 == 330 and sp.simplify(sp.sin(sp.rad(-750)) + sp.Rational(1, 2)) == 0)
comprobar('t4 §12 47π/6', sp.Rational(47, 6) - 6 == sp.Rational(11, 6) and 47 == 3 * 12 + 11 and sp.simplify(sp.cos(47 * sp.pi / 6) - sp.sqrt(3) / 2) == 0 and sp.simplify(sp.cos(11 * sp.pi / 6) - sp.sqrt(3) / 2) == 0)
fam = [50 + 360 * k for k in range(-5, 6) if -400 <= 50 + 360 * k <= 800]
comprobar('t4 §12 coterminales con 50°', fam == [-310, 50, 410, 770] and sp.Rational(5, 18) * 180 == 50)
w_ = 120 * 2 * math.pi / 60
comprobar('t4 §12 rueda', cerca(w_, 12.57, 0.0051) and cerca(w_ * 0.35, 4.40, 0.0051) and cerca(w_ * 0.35 * 3.6, 15.8, 0.05))
r_, th_ = 6, 2
cuerda = 2 * r_ * math.sin(th_ / 2); sector = r_ * r_ * th_ / 2; tri_ = r_ * r_ * math.sin(th_) / 2
comprobar('t4 §12 segmento circular', cerca(r_ * th_, 12, 0) and cerca(cuerda, 10.10, 0.0051) and cerca(sector, 36, 0) and cerca(tri_, 16.37, 0.0051) and cerca(sector - tri_, 19.63, 0.0051))
# comprobar la cuerda por coordenadas
P1, P2 = (r_ * math.cos(0), r_ * math.sin(0)), (r_ * math.cos(th_), r_ * math.sin(th_))
comprobar('t4 §12 cuerda por coordenadas', cerca(math.dist(P1, P2), cuerda, 1e-9))
comprobar('t4 §12 aguja minutera', cerca(25 / 60 * 2 * math.pi, 5 * math.pi / 6, 1e-12) and cerca(1.2 * 5 * math.pi / 6, math.pi, 1e-12) and cerca(0.5 * 1.44 * 5 * math.pi / 6, 1.88, 0.0051) and cerca(0.6 * math.pi, 1.88, 0.0051))

# --- 13. Medidas de un triángulo
a_, b_, c_ = sp.symbols('a b c', positive=True)
s_ = (a_ + b_ + c_) / 2
comprobar('t4 §13 Herón: 16S² = 4b²c² − (b²+c²−a²)² = 16·s(s−a)(s−b)(s−c)',
          sp.expand(4 * b_**2 * c_**2 - (b_**2 + c_**2 - a_**2)**2 - 16 * s_ * (s_ - a_) * (s_ - b_) * (s_ - c_)) == 0)
# mediana: por coordenadas simbólicas A=(0,0), B=(c,0), C=(u,v) con b=|AC|, a=|BC|; mediana desde A al punto medio de BC
cc, u, v = sp.symbols('cc u v', real=True)
bb2 = u**2 + v**2; aa2 = (u - cc)**2 + v**2; ma2 = ((cc + u) / 2)**2 + (v / 2)**2
comprobar('t4 §13 mediana m_a² = (2b² + 2c² − a²)/4', sp.simplify(ma2 - (2 * bb2 + 2 * cc**2 - aa2) / 4) == 0)
def heron(a, b, c): s = sp.Rational(a + b + c, 2); return sp.sqrt(s * (s - a) * (s - b) * (s - c))
S1 = heron(13, 14, 15)
comprobar('t4 §13 13,14,15: S, alturas, R, r', S1 == 84 and sp.Rational(2 * 84, 13) == sp.Rational(168, 13) and cerca(float(sp.Rational(168, 13)), 12.92, 0.0051) and sp.Rational(2 * 84, 14) == 12 and sp.Rational(2 * 84, 15) == sp.Rational(56, 5) and cerca(float(sp.Rational(56, 5)), 11.2, 1e-12) and sp.Rational(13 * 14 * 15, 4 * 84) == sp.Rational(65, 8) and cerca(float(sp.Rational(65, 8)), 8.125, 1e-12) and sp.Rational(84, 21) == 4)
A1 = deg(math.acos((14**2 + 15**2 - 13**2) / (2 * 14 * 15))); B1 = deg(math.acos((13**2 + 15**2 - 14**2) / (2 * 13 * 15))); C1 = 180 - A1 - B1
comprobar('t4 §13 13,14,15: ángulos', cerca(sd(A1), 0.8, 1e-9) and cerca(A1, 53.13, 0.0051) and cerca((13**2 + 15**2 - 14**2) / (2 * 13 * 15), 0.5077, 5e-5) and cerca(B1, 59.49, 0.0051) and cerca(C1, 67.38, 0.0051) and cerca(13 / (2 * sd(A1)), 8.125, 1e-9))
comprobar('t4 §13 mediana sobre el lado 14', cerca(0.5 * math.sqrt(2 * 13**2 + 2 * 15**2 - 14**2), 12.17, 0.0051) and 2 * 13**2 + 2 * 15**2 - 14**2 == 592)
# comprobación por coordenadas: A=(0,0), B=(14,0), C con |AC|=15, |BC|=13  → mediana desde C al punto medio de AB (lado 14)
Cx = (15**2 - 13**2 + 14**2) / (2 * 14); Cy = math.sqrt(15**2 - Cx**2)
comprobar('t4 §13 mediana por coordenadas y circunradio', cerca(math.dist((Cx, Cy), (7, 0)), 0.5 * math.sqrt(592), 1e-9) and cerca(Cy * 14 / 2, 84, 1e-9))
S2 = heron(8, 15, 17)
comprobar('t4 §13 8,15,17', S2 == 60 and sp.Rational(8 * 15 * 17, 4 * 60) == sp.Rational(17, 2) and sp.Rational(60, 20) == 3 == sp.Rational(8 + 15 - 17, 2) and 8**2 + 15**2 == 17**2)

# --- 14. Rumbos
comprobar('t4 §14 20 km a 040°', cerca(20 * sd(40), 12.86, 0.0051) and cerca(20 * cd(40), 15.32, 0.0051))
comprobar('t4 §14 notación de cuadrante (N 40° E = 040°, S 30° O = 210°)', 180 + 30 == 210)
def pos(d, rumbo): return (d * sd(rumbo), d * cd(rumbo))   # (este, norte)
p1 = pos(20, 40); p2 = (p1[0] + pos(30, 100)[0], p1[1] + pos(30, 100)[1])
dist = math.hypot(*p2); reg = (deg(math.atan2(-p2[0], -p2[1]))) % 360
comprobar('t4 §14 dos tramos (coordenadas)', cerca(dist, 43.59, 0.0051) and cerca(reg, 256.59, 0.0051) and cerca(pos(30, 100)[0], 29.54, 0.0051) and cerca(pos(30, 100)[1], -5.21, 0.0051) and cerca(p2[0], 42.40, 0.0051) and cerca(p2[1], 10.11, 0.0051))
comprobar('t4 §14 dos tramos (teorema del coseno y del seno)', cerca(math.sqrt(20**2 + 30**2 - 2 * 20 * 30 * cd(120)), dist, 1e-9) and 400 + 900 + 600 == 1900 and cerca(deg(math.asin(30 * sd(120) / dist)), 36.59, 0.0051) and cerca(30 * sd(120) / dist, 0.596, 5e-4) and cerca(40 + 36.59, 76.59, 1e-9) and cerca(76.59 + 180, 256.59, 1e-9))
# faro: A=(0,0), B=(0,6); visual desde A rumbo 040°, desde B rumbo 070°
t_, s_f = sp.symbols('t s', real=True)
sol_f = sp.solve([t_ * sp.sin(sp.rad(40)) - s_f * sp.sin(sp.rad(70)), t_ * sp.cos(sp.rad(40)) - (6 + s_f * sp.cos(sp.rad(70)))], [t_, s_f], dict=True)[0]
BF = float(sol_f[s_f]); AF = float(sol_f[t_])
comprobar('t4 §14 faro y dos marcaciones', cerca(BF, 7.71, 0.0051) and cerca(BF * sd(70), 7.25, 0.0051) and cerca(AF * sd(40), BF * sd(70), 1e-9) and cerca(180 - 40 - 110, 30, 0))
va = pos(240, 60); vw = pos(50, 120); vs = (va[0] + vw[0], va[1] + vw[1])
comprobar('t4 §14 avión y viento', cerca(math.hypot(*vs), 268.5, 0.051) and cerca(vs[0], 251.15, 0.0051) and cerca(vs[1], 95, 1e-9) and cerca(deg(math.atan2(*vs)), 69.3, 0.051) and 240**2 + 50**2 + 2 * 240 * 50 * 0.5 == 72100 and cerca(deg(math.asin(50 * sd(120) / math.hypot(*vs))), 9.28, 0.0051) and cerca(50 * sd(120) / math.hypot(*vs), 0.1613, 5e-4))
comprobar('t4 §14 el error típico da 26,5 km', cerca(math.sqrt(20**2 + 30**2 - 2 * 20 * 30 * cd(60)), 26.46, 0.0051))

# --- 15. Polígonos, cuadriláteros y espacio
n8 = 8; R8 = 5 / (2 * sd(180 / n8)); ap8 = 5 / (2 * td(180 / n8))
ver8 = [(R8 * math.cos(2 * math.pi * k / n8), R8 * math.sin(2 * math.pi * k / n8)) for k in range(n8)]
def shoelace(P): return abs(sum(P[i][0] * P[(i + 1) % len(P)][1] - P[(i + 1) % len(P)][0] * P[i][1] for i in range(len(P)))) / 2
comprobar('t4 §15 octógono', cerca(R8, 6.53, 0.0051) and cerca(ap8, 6.04, 0.0051) and cerca(0.5 * 40 * ap8, 120.71, 0.0051) and cerca(0.5 * 8 * R8**2 * sd(45), 120.71, 0.0051) and cerca(math.dist(ver8[0], ver8[1]), 5, 1e-9) and cerca(shoelace(ver8), 0.5 * 40 * ap8, 1e-9))
# terreno ABCD (§15): AB=6, BC=8, ∠B=70°, CD=7, DA=5; D al otro lado de AC respecto de B
def cuadrilatero(AB, BC, Bang, CD, DA):
    A = (0.0, 0.0); B = (AB, 0.0)
    C = (AB + BC * math.cos(D(180 - Bang)), BC * math.sin(D(180 - Bang)))
    # D: |D−A| = DA, |D−C| = CD, y en el semiplano opuesto a B respecto de la recta AC
    dx, dy = C[0] - A[0], C[1] - A[1]; L = math.hypot(dx, dy)
    x = (DA**2 - CD**2 + L**2) / (2 * L); h = math.sqrt(DA**2 - x**2)
    ux, uy = dx / L, dy / L; nx, ny = -uy, ux
    cand = [(x * ux + sg * h * nx, x * uy + sg * h * ny) for sg in (1, -1)]
    side = lambda P: dx * (P[1] - A[1]) - dy * (P[0] - A[0])
    Dp = [q for q in cand if side(q) * side(B) < 0][0]
    return A, B, C, Dp, L
A_, B_, C_, D_, L_ = cuadrilatero(6, 8, 70, 7, 5)
comprobar('t4 §15 terreno ABCD (coordenadas y shoelace)', cerca(L_, 8.195, 0.0005) and cerca(math.dist(C_, D_), 7, 1e-9) and cerca(math.dist(D_, A_), 5, 1e-9) and cerca(shoelace([A_, B_, C_, D_]), 39.97, 0.0051) and cerca(0.5 * 6 * 8 * sd(70), 22.55, 0.0051) and cerca(shoelace([A_, C_, D_]), 17.42, 0.0051) and cerca(math.sqrt(10.0977 * 1.9023 * 3.0977 * 5.0977), 17.42, 0.0051))
comprobar('t4 §15 cubo', cerca(deg(math.atan(1 / math.sqrt(2))), 35.26, 0.0051) and cerca(deg(math.asin(1 / math.sqrt(3))), 35.26, 0.0051) and cerca(float(sp.atan(1 / sp.sqrt(2)) - sp.asin(1 / sp.sqrt(3))), 0, 1e-12))
comprobar('t4 §15 pirámide', cerca(deg(math.atan(12 / 5)), 67.38, 0.0051) and math.hypot(12, 5) == 13 and cerca(deg(math.atan(12 / (5 * math.sqrt(2)))), 59.49, 0.0051) and cerca(math.sqrt(144 + 50), 13.93, 0.0051))
comprobar('t4 §15 antena', cerca(60 * td(25), 27.98, 0.0051) and cerca(60 * td(40), 50.35, 0.0051) and cerca(60 * (td(40) - td(25)), 22.37, 0.0051))

# --- 16. Problemas de examen
a2 = 10**2 + 14**2 - 2 * 10 * 14 * cd(50); aa = math.sqrt(a2); cB = (a2 + 100 - 196) / (2 * aa * 10); BB = deg(math.acos(cB)); CC = 180 - 50 - BB
comprobar('t4 P1 BC y ángulos', cerca(280 * cd(50), 179.98, 0.0051) and cerca(a2, 116.02, 0.0051) and cerca(aa, 10.77, 0.0051) and cerca(cB, 0.0929, 0.002) and cerca(BB, 84.67, 0.0051) and cerca(CC, 45.33, 0.0051) and 14 > aa > 10 and BB > 50 > CC)
SS = 0.5 * 10 * 14 * sd(50)
comprobar('t4 P1 área y altura (por coordenadas)', cerca(SS, 53.62, 0.0051) and cerca(2 * SS / 10, 10.72, 0.0051) and cerca(abs(14 * sd(50)), 10.72, 0.0051))
AG = 500 * sd(48) / sd(70); BG = 500 * sd(62) / sd(70)
# por coordenadas: A=(0,0), B=(500,0), globo = intersección de rayos a 62° desde A y a 180°−48° desde B
Gx = 500 * td(48) / (td(62) + td(48)); Gy = Gx * td(62)
comprobar('t4 P2 globo', cerca(180 - 62 - 48, 70, 0) and cerca(AG, 395.4, 0.051) and cerca(AG * sd(62), 349.1, 0.051) and cerca(BG, 469.8, 0.051) and cerca(BG * sd(48), 349.1, 0.051) and cerca(Gy, 349.13, 0.0051) and cerca(math.hypot(Gx, Gy), AG, 1e-9))
xx, yy = sp.symbols('xx yy', real=True)
sol3 = sp.solve([xx + yy - 28, xx**2 + yy**2 - 400], [xx, yy], dict=True)
comprobar('t4 P3 catetos 12 y 16', sorted([sol3[0][xx], sol3[0][yy]]) == [12, 16] and 12 + 16 + 20 == 48 and sp.Rational(784 - 768) == 16 and cerca(deg(math.asin(0.6)), 36.87, 0.0051))
sB = 12 * 0.5 / 9; B1_ = deg(math.asin(sB)); B2_ = 180 - B1_
c1 = 9 * sd(180 - 30 - B1_) / 0.5; c2 = 9 * sd(180 - 30 - B2_) / 0.5
comprobar('t4 P4 dos triángulos', 12 * 0.5 < 9 < 12 and cerca(sB, 0.6667, 5e-4) and cerca(B1_, 41.81, 0.0051) and cerca(B2_, 138.19, 0.0051) and cerca(180 - 30 - B1_, 108.19, 0.0051) and cerca(c1, 17.10, 0.0051) and cerca(180 - 30 - B2_, 11.81, 0.0051) and cerca(c2, 3.68, 0.0051) and 30 + B2_ < 180)
# comprobar los dos triángulos del P4 con el teorema del coseno (a² = b² + c² − 2bc cos A)
comprobar('t4 P4 cada triángulo cumple el teorema del coseno', all(cerca(9**2, 12**2 + c**2 - 2 * 12 * c * cd(30), 1e-9) for c in (c1, c2)))

# =====================================================================
# TEMA 4 · ejercicios g37–g48
# =====================================================================
comprobar('t4 g37', sp.Rational(61, 4) - 14 == sp.Rational(5, 4) and 61 == 7 * 8 + 5 and cerca(nv(E4, 'g37', 0), 5 * math.pi / 4, 0.002 * 5 * math.pi / 4) and cerca(nv(E4, 'g37', 1), float(sp.sin(61 * sp.pi / 4)), 0.002))
comprobar('t4 g38', cerca(deg(math.acos(-0.5)), 120, 1e-9) and nv(E4, 'g38') == 240 and cerca(cd(240), -0.5, 1e-9) and cerca(cd(120), cd(240), 1e-9))
p1_ = pos(25, 60); p2_ = (p1_[0] + pos(40, 160)[0], p1_[1] + pos(40, 160)[1])
comprobar('t4 g39', near(math.hypot(*p2_), nv(E4, 'g39', 0), 0.0005) and near((deg(math.atan2(-p2_[0], -p2_[1]))) % 360, nv(E4, 'g39', 1), 0.0005) and cerca(math.sqrt(25**2 + 40**2 - 2 * 25 * 40 * cd(80)), math.hypot(*p2_), 1e-9) and cerca(2225 - 2000 * cd(80), 1877.70, 0.0051))
S_g40 = heron(9, 10, 17)
comprobar('t4 g40', S_g40 == 36 and cerca(float(S_g40), nv(E4, 'g40', 0), 1e-12) and cerca(36 / 18, nv(E4, 'g40', 1), 1e-12) and cerca(float(sp.Rational(9 * 10 * 17, 4 * 36)), nv(E4, 'g40', 2), 1e-12) and sp.Rational(9 * 10 * 17, 4 * 36) == sp.Rational(85, 8) and cerca(sd(deg(math.acos((81 + 100 - 289) / 180))), 0.8, 1e-9) and cerca(0.5 * 9 * 10 * 0.8, 36, 1e-12))
comprobar('t4 g41', near(40 * (td(50) - td(35)), nv(E4, 'g41'), 0.0005) and cerca(40 * td(35), 28.01, 0.0051) and cerca(40 * td(50), 47.67, 0.0051))
th80 = D(80)
comprobar('t4 g42', near(0.5 * 100 * (th80 - math.sin(th80)), nv(E4, 'g42'), 0.0005) and cerca(0.5 * 100 * th80, 69.81, 0.0051) and cerca(0.5 * 100 * sd(80), 49.24, 0.0051))
comprobar('t4 g43', near(45 * 2 * math.pi / 60, nv(E4, 'g43', 0), 0.0005) and near(45 * 2 * math.pi / 60 * 0.12, nv(E4, 'g43', 1), 0.0005) and cerca(1.5 * math.pi, 4.712, 0.0005))
dg = math.sqrt(3**2 + 4**2 + 12**2)
comprobar('t4 g44', dg == nv(E4, 'g44', 0) == 13 and near(deg(math.asin(12 / 13)), nv(E4, 'g44', 1), 0.0005) and near(deg(math.atan(12 / 5)), nv(E4, 'g44', 1), 0.0005))
# g45: A=(0,0), B=(0,10); rumbo 030° desde A y 075° desde B
sol45 = sp.solve([t_ * sp.sin(sp.rad(30)) - s_f * sp.sin(sp.rad(75)), t_ * sp.cos(sp.rad(30)) - (10 + s_f * sp.cos(sp.rad(75)))], [t_, s_f], dict=True)[0]
BF45 = float(sol45[s_f])
comprobar('t4 g45', near(BF45, nv(E4, 'g45', 0), 0.0005) and near(BF45 * sd(75), nv(E4, 'g45', 1), 0.0005) and cerca(float(sol45[t_]) * sd(30), BF45 * sd(75), 1e-9) and cerca(BF45, 5 * math.sqrt(2), 1e-9))
A46, B46, C46, D46, L46 = cuadrilatero(50, 70, 60, 60, 45)
comprobar('t4 g46', near(L46, nv(E4, 'g46', 0), 0.0005) and near(shoelace([A46, B46, C46, D46]), nv(E4, 'g46', 1), 0.0005) and cerca(math.dist(C46, D46), 60, 1e-9) and cerca(math.dist(D46, A46), 45, 1e-9) and cerca(0.5 * 50 * 70 * sd(60), 1515.54, 0.0051) and 3900 == 50**2 + 70**2 - 2 * 50 * 70 * 0.5)
# g47: S = abc/(4R) con un triángulo cualquiera (coordenadas) y simbólicamente
for P in ((0, 0, 7, 1, 2, 5), (0, 0, 9, 0, 3, 4), (1, 2, 8, 3, 4, 9)):
    x1, y1, x2, y2, x3, y3 = P
    pa, pb, pc = math.dist((x2, y2), (x3, y3)), math.dist((x1, y1), (x3, y3)), math.dist((x1, y1), (x2, y2))
    Sx = shoelace([(x1, y1), (x2, y2), (x3, y3)])
    # circunradio por el circuncentro (resolviendo el sistema), sin usar las fórmulas del enunciado
    ux, uy = sp.symbols('ux uy', real=True)
    cen = sp.solve([(ux - x1)**2 + (uy - y1)**2 - (ux - x2)**2 - (uy - y2)**2, (ux - x1)**2 + (uy - y1)**2 - (ux - x3)**2 - (uy - y3)**2], [ux, uy], dict=True)[0]
    Rr = math.hypot(float(cen[ux]) - x1, float(cen[uy]) - y1)
    comprobar(f't4 g47 S = abc/(4R) en {P}', cerca(Sx, pa * pb * pc / (4 * Rr), 1e-9))
comprobar('t4 g47 rúbrica de 4 pasos', len(chk(E4, 'g47')['items']) == 4)
R48 = 8 / (2 * sd(36)); ap48 = 4 / td(36)
ver5 = [(R48 * math.cos(2 * math.pi * k / 5), R48 * math.sin(2 * math.pi * k / 5)) for k in range(5)]
comprobar('t4 g48', near(R48, nv(E4, 'g48', 0), 0.0005) and near(ap48, nv(E4, 'g48', 1), 0.0005) and near(shoelace(ver5), nv(E4, 'g48', 2), 0.0005) and cerca(math.dist(ver5[0], ver5[1]), 8, 1e-9) and cerca(math.hypot(R48 * cd(36), 0) , R48 * cd(36), 0) and cerca(R48 * cd(36), ap48, 1e-9))

# =====================================================================
# TEMA 4 · test y «encuentra el error» nuevos
# =====================================================================
Q4 = T4['datos']['quiz1']['preguntas']; X4 = T4['datos']['errores']['preguntas']
def opt(P, i): return P[i]['op'][P[i]['ok']]
comprobar('t4 test 11: arccos(−1/2) = 120°', cerca(deg(math.acos(-0.5)), 120, 1e-9) and opt(Q4, 10) == '120°')
comprobar('t4 test 12: otro ángulo con sen 0,6', cerca(180 - deg(math.asin(0.6)), 143.13, 0.0051) and opt(Q4, 11) == '143,13°')
comprobar('t4 test 13: 100 km este + 100 km sur', cerca(math.hypot(100, 100), 141.4, 0.051) and opt(Q4, 12) == '141,4 km' and cerca(math.hypot(*[a + b for a, b in zip(pos(100, 90), pos(100, 180))]), 141.42, 0.0051))
comprobar('t4 test 14: Herón 5, 12, 13', heron(5, 12, 13) == 30 and opt(Q4, 13) == '30')
comprobar('t4 test 15: R de un triángulo rectángulo de hipotenusa 10', sp.Rational(10, 2) == 5 and opt(Q4, 14) == '5' and cerca(10 / (2 * sd(90)), 5, 1e-9))
comprobar('t4 test 16: 3 rad está en el 2.º cuadrante', 90 < deg(3) < 180 and cerca(deg(3), 171.9, 0.051) and opt(Q4, 15) == '2.º')
cc_ = (16 + 25 - 64) / 40
comprobar('t4 error 9: triángulo 4, 5, 8', cerca(cc_, -0.575, 1e-12) and cerca(deg(math.acos(cc_)), 125.1, 0.051) and cerca(deg(math.asin(math.sqrt(1 - cc_**2))), 54.9, 0.051) and 'obtuso' in opt(X4, 8))
comprobar('t4 error 10: rumbos 040° y 100°', cerca(math.sqrt(900 + 400 - 1200 * cd(60)), 26.46, 0.0051) and cerca(math.sqrt(1300 + 600), 43.59, 0.0051) and '43,59' in opt(X4, 9))
comprobar('t4 error 11: arco de 60° y radio 3', cerca(D(60) * 3, math.pi, 1e-12) and cerca(math.pi, 3.14, 0.0051) and cerca(2 * math.pi * 3 / 6, math.pi, 1e-12) and 'π/3 rad' in opt(X4, 10) and '3,14' in opt(X4, 10))

# =====================================================================
# TEMA 5 · teoría nueva
# =====================================================================
random.seed(5)
# --- 9. Rombo y pulsaciones
for _ in range(20):
    A, Bq = random.uniform(0, 360), random.uniform(0, 360)
    comprobar('t5 §9 rombo (suma de vectores unitarios)', cerca(sd(A) + sd(Bq), 2 * sd((A + Bq) / 2) * cd((A - Bq) / 2), 1e-12) and cerca(cd(A) + cd(Bq), 2 * cd((A + Bq) / 2) * cd((A - Bq) / 2), 1e-12) and cerca(math.hypot(cd(A) + cd(Bq), sd(A) + sd(Bq)), 2 * abs(cd((A - Bq) / 2)), 1e-12))
comprobar('t5 §9 cos 75° + cos 15° y sen 105° − sen 15°', cerca(cd(75) + cd(15), math.sqrt(6) / 2, 1e-12) and cerca(cd(75) + cd(15), 1.2247, 5e-5) and cerca(sd(105) - sd(15), math.sqrt(2) / 2, 1e-12) and cerca(sd(105) - sd(15), 0.7071, 5e-5))
tt = sp.symbols('tt', real=True)
for tv in (0.0123, 0.1, 0.337, 0.9):
    lhs = math.sin(2 * math.pi * 440 * tv) + math.sin(2 * math.pi * 444 * tv); rhs = 2 * math.cos(4 * math.pi * tv) * math.sin(884 * math.pi * tv)
    comprobar('t5 §9 diapasones 440/444', cerca(lhs, rhs, 1e-9) and cerca(2 * math.pi * 442 * tv, 884 * math.pi * tv, 1e-9))
comprobar('t5 §9 pulsaciones: envolvente 2|cos 4πt| con máximos cada 0,25 s', all(cerca(abs(math.cos(4 * math.pi * k * 0.25)), 1, 1e-9) for k in range(8)) and abs(444 - 440) == 4)
comprobar('t5 §9 sen 75°·cos 15°', cerca(sd(75) * cd(15), (2 + math.sqrt(3)) / 4, 1e-12) and cerca(sd(75) * cd(15), 0.9330, 5e-5) and cerca(0.5 * (sd(90) + sd(60)), sd(75) * cd(15), 1e-12))
f9 = lambda x: cd(5 * x) - cd(x)
comprobar('t5 §9 cos 5x − cos x = 0', mismos(ceros(f9), [0, 60, 90, 120, 180, 240, 270, 300]))
comprobar('t5 §9 cos 5x − cos x = −2 sen 3x sen 2x', all(cerca(cd(5 * x) - cd(x), -2 * sd(3 * x) * sd(2 * x), 1e-12) for x in (11, 47.5, 203, 333)))

# --- 10. Ecuaciones de 2.º grado
S3 = math.sqrt(3)
comprobar('t5 §10 2sen²x + 3sen x − 2 = 0', mismos(ceros(lambda x: 2 * sd(x)**2 + 3 * sd(x) - 2), [30, 150]))
x_ = sp.symbols('x_')
tq = sp.symbols('tq')
comprobar('t5 §10 raíces de 2t² + 3t − 2', sorted(sp.solve(2 * tq**2 + 3 * tq - 2, tq)) == [-2, sp.Rational(1, 2)] and sp.sqrt(9 + 16) == 5)
comprobar('t5 §10 2sen²x = 3cos x', mismos(ceros(lambda x: 2 * sd(x)**2 - 3 * cd(x)), [60, 300]) and sorted(sp.solve(2 * tq**2 + 3 * tq - 2, tq)) == [-2, sp.Rational(1, 2)])
comprobar('t5 §10 cos 2x + 5cos x + 3 = 0', mismos(ceros(lambda x: cd(2 * x) + 5 * cd(x) + 3), [120, 240]) and sorted(sp.solve(2 * tq**2 + 5 * tq + 2, tq)) == [-2, sp.Rational(-1, 2)] and 25 - 16 == 9)
comprobar('t5 §10 tan²x − (1 + √3)tan x + √3 = 0', mismos(ceros(lambda x: sd(x)**2 - (1 + S3) * sd(x) * cd(x) + S3 * cd(x)**2), [45, 60, 225, 240]) and sorted(sp.solve(tq**2 - (1 + sp.sqrt(3)) * tq + sp.sqrt(3), tq), key=float) == [1, sp.sqrt(3)])
comprobar('t5 §10 4sen²x − 4sen x + 1 = 0 (raíz doble)', mismos(ceros(lambda x: 4 * sd(x)**2 - 4 * sd(x) + 1), [30, 150]) and sp.discriminant(4 * tq**2 - 4 * tq + 1, tq) == 0 and 16 - 16 == 0)

# --- 11. a·sen x + b·cos x = c
phi = deg(math.atan2(4, 3))
comprobar('t5 §11 3sen x + 4cos x = 5R·sen(x+φ)', cerca(phi, 53.13, 0.0051) and all(cerca(3 * sd(x) + 4 * cd(x), 5 * sd(x + phi), 1e-12) for x in (0, 17, 133, 250)))
comprobar('t5 §11 3sen x + 4cos x = 5', mismos(ceros(lambda x: 3 * sd(x) + 4 * cd(x) - 5), [36.87], 0.011) and cerca(90 - phi, 36.87, 0.0051))
sol2 = ceros(lambda x: 3 * sd(x) + 4 * cd(x) - 2)
comprobar('t5 §11 3sen x + 4cos x = 2', mismos(sol2, [103.29, 330.45], 0.006) and cerca(deg(math.asin(0.4)), 23.58, 0.0051) and cerca(180 - deg(math.asin(0.4)), 156.42, 0.0051) and cerca(3 * sd(103.29) + 4 * cd(103.29), 2, 0.001))
comprobar('t5 §11 3sen x + 4cos x = 6 sin solución', ceros(lambda x: 3 * sd(x) + 4 * cd(x) - 6) == [] and max(3 * sd(x / 10) + 4 * cd(x / 10) for x in range(3600)) <= 5 + 1e-12)
cx1 = (16 + math.sqrt(256 + 500)) / 50; cx2 = (16 - math.sqrt(256 + 500)) / 50
cands = [deg(math.acos(cx1)), 360 - deg(math.acos(cx1)), deg(math.acos(cx2)), 360 - deg(math.acos(cx2))]
vals = [3 * sd(x) + 4 * cd(x) for x in cands]
comprobar('t5 §11 elevando al cuadrado: 25cos²x − 16cos x − 5 = 0', sp.expand((9 * (1 - tq**2)) - (4 - 16 * tq + 16 * tq**2)) == -25 * tq**2 + 16 * tq + 5 and cerca(cx1, 0.8699, 5e-5) and cerca(cx2, -0.2299, 5e-5) and sp.sqrt(256 + 500) > 27.49 and cerca(math.sqrt(756), 27.50, 0.0051))
comprobar('t5 §11 candidatos 29,55 / 330,45 / 103,29 / 256,71', all(cerca(a, b, 0.006) for a, b in zip(cands, [29.55, 330.45, 103.29, 256.71])) and cerca(vals[0], 4.96, 0.0051) and cerca(vals[1], 2, 1e-9) and cerca(vals[2], 2, 1e-9) and cerca(vals[3], -3.84, 0.0051) and cerca(3 * sd(29.55), 1.4787, 0.001))
tsym = sp.symbols('tsym', real=True)
comprobar('t5 §11 t = tan(x/2): sen x, cos x, tan x', all(cerca(sd(x), 2 * td(x / 2) / (1 + td(x / 2)**2), 1e-9) and cerca(cd(x), (1 - td(x / 2)**2) / (1 + td(x / 2)**2), 1e-9) and cerca(td(x), 2 * td(x / 2) / (1 - td(x / 2)**2), 1e-9) for x in (20, 70, 140, 250)))
comprobar('t5 §11 √3sen x + cos x = 1', mismos(ceros(lambda x: S3 * sd(x) + cd(x) - 1), [0, 120]) and cerca(S3 * sd(180) + cd(180), -1, 1e-12) and sp.expand((2 * sp.sqrt(3) * tsym + 1 - tsym**2) - (1 + tsym**2)) == -2 * tsym**2 + 2 * sp.sqrt(3) * tsym and mismos(ceros(lambda x: 2 * sd(x + 30) - 1), [0, 120]))

# --- 12. Sistemas (fuerza bruta sobre la malla entera de grados)
def malla(dom, f_eq, paso=1):
    return [(x, y) for x in range(dom[0], dom[1] + 1, paso) for y in range(dom[0], dom[1] + 1, paso) if f_eq(x, y)]
s1 = malla((0, 180), lambda x, y: x + y == 120 and abs(sd(x) + sd(y) - 1.5) < 1e-9)
comprobar('t5 §12 x + y = 120°, sen x + sen y = 3/2', sorted(s1) == [(30, 90), (90, 30)] and cerca(S3 * cd(30), 1.5, 1e-12))
s2 = malla((0, 180), lambda x, y: x + y == 120 and x > y and abs(sd(x) * sd(y) - 0.25) < 1e-9)
comprobar('t5 §12 x + y = 120°, sen x·sen y = 1/4', s2 == [(105, 15)] and cerca(sd(105) * sd(15), 0.25, 1e-12) and cerca(0.5 * (cd(90) - cd(120)), 0.25, 1e-12))
s3 = malla((0, 90), lambda x, y: abs(sd(x) * cd(y) - 0.75) < 1e-9 and abs(cd(x) * sd(y) - 0.25) < 1e-9)
comprobar('t5 §12 sen x·cos y = 3/4, cos x·sen y = 1/4', s3 == [(60, 30)] and cerca(sd(90), 1, 0) and cerca(sd(30), 0.75 - 0.25, 1e-12) and cerca(sd(60) * cd(30), 0.75, 1e-12))
s4 = malla((1, 89), lambda x, y: x > y and abs(sd(x) + sd(y) - math.sqrt(6) / 2) < 1e-9 and abs(cd(x) + cd(y) - math.sqrt(6) / 2) < 1e-9)
comprobar('t5 §12 sen x + sen y = cos x + cos y = √6/2', s4 == [(75, 15)] and cerca(2 * sd(45) * cd(30), math.sqrt(6) / 2, 1e-12) and cerca(math.sqrt(2) * math.sqrt(3) / 2, math.sqrt(6) / 2, 1e-12))
# unicidad con malla de medio grado para el sistema 3 (por si hubiera soluciones no enteras)
s3b = [(x / 2, y / 2) for x in range(0, 181) for y in range(0, 181) if abs(sd(x / 2) * cd(y / 2) - 0.75) < 1e-9 and abs(cd(x / 2) * sd(y / 2) - 0.25) < 1e-9]
comprobar('t5 §12 el sistema 3 no tiene más soluciones (malla de 0,5°)', s3b == [(60.0, 30.0)])

# --- 13. Identidades (numéricas en muchos puntos y simbólicas)
xs_ = [random.uniform(1, 89) for _ in range(40)] + [random.uniform(100, 350) for _ in range(40)]
xs_ = [x for x in xs_ if abs(cd(x)) > 1e-3 and abs(sd(x)) > 1e-3 and abs(1 - sd(x)) > 1e-3 and abs(cd(2 * x)) > 1e-3 and abs(cd(x) + cd(3 * x)) > 1e-3]
comprobar('t5 §13 (1 + sen x)/cos x = cos x/(1 − sen x)', all(cerca((1 + sd(x)) / cd(x), cd(x) / (1 - sd(x)), 1e-8 * max(1, abs((1 + sd(x)) / cd(x)))) for x in xs_))
comprobar('t5 §13 cos⁴x − sen⁴x = cos 2x', all(cerca(cd(x)**4 - sd(x)**4, cd(2 * x), 1e-12) for x in xs_) and sp.simplify(sp.cos(x_)**4 - sp.sin(x_)**4 - sp.cos(2 * x_)) == 0)
comprobar('t5 §13 (sen x + sen 3x)/(cos x + cos 3x) = tan 2x', all(cerca((sd(x) + sd(3 * x)) / (cd(x) + cd(3 * x)), td(2 * x), 1e-7 * max(1, abs(td(2 * x)))) for x in xs_))
comprobar('t5 §13 sen 3x/sen x − cos 3x/cos x = 2', all(cerca(sd(3 * x) / sd(x) - cd(3 * x) / cd(x), 2, 1e-8) for x in xs_))
comprobar('t5 §13 el numerador sen 3x cos x − cos 3x sen x = sen 2x = 2 sen x cos x', all(cerca(sd(3 * x) * cd(x) - cd(3 * x) * sd(x), sd(2 * x), 1e-12) and cerca(sd(2 * x), 2 * sd(x) * cd(x), 1e-12) for x in xs_))
comprobar('t5 §13 (1 + sen x)(1 − sen x) = cos²x; sen x + sen 3x = 2 sen 2x cos x; cos x + cos 3x = 2 cos 2x cos x', all(cerca((1 + sd(x)) * (1 - sd(x)), cd(x)**2, 1e-12) and cerca(sd(x) + sd(3 * x), 2 * sd(2 * x) * cd(x), 1e-12) and cerca(cd(x) + cd(3 * x), 2 * cd(2 * x) * cd(x), 1e-12) for x in xs_))

# --- 14. Retos
comprobar('t5 §14 ángulo entre y = 3x − 1 e y = −x/2 + 4', cerca(abs((-0.5 - 3) / (1 + 3 * -0.5)), 7, 1e-12) and cerca(deg(math.atan(7)), 81.87, 0.0051))
# ángulo entre rectas con vectores directores (independiente de la fórmula de la tangente)
def ang_rectas(m1, m2):
    u, v = (1, m1), (1, m2); c = abs(u[0] * v[0] + u[1] * v[1]) / (math.hypot(*u) * math.hypot(*v)); return deg(math.acos(min(1, c)))
comprobar('t5 §14 ángulo entre rectas con vectores directores', cerca(ang_rectas(3, -0.5), 81.87, 0.0051) and cerca(ang_rectas(1, 1 / 3), 26.565, 0.0005) and cerca(ang_rectas(2, 1 / 3), 45, 1e-9))
s18 = sp.sin(sp.pi / 10); c36 = sp.cos(sp.pi / 5)
comprobar('t5 §14 sen 18° y cos 36° exactos', sp.N(s18 - (sp.sqrt(5) - 1) / 4, 30) == 0 and sp.N(c36 - (1 + sp.sqrt(5)) / 4, 30) == 0)
sv = sp.symbols('sv')
th = sp.symbols('th')
comprobar('t5 §14 sen 3θ = cos 2θ ⇒ 4s³ − 2s² − 3s + 1 = (s − 1)(4s² + 2s − 1)', sp.expand((sv - 1) * (4 * sv**2 + 2 * sv - 1) - (4 * sv**3 - 2 * sv**2 - 3 * sv + 1)) == 0 and sp.simplify(sp.expand_trig(sp.sin(3 * th)) - (3 * sp.sin(th) - 4 * sp.sin(th)**3)) == 0 and sp.simplify(sp.expand_trig(sp.cos(2 * th)) - (1 - 2 * sp.sin(th)**2)) == 0 and cerca(sd(54), cd(36), 1e-12) and 3 * 18 + 2 * 18 == 90 and set(sp.solve(4 * sv**2 + 2 * sv - 1, sv)) == {(-1 + sp.sqrt(5)) / 4, (-1 - sp.sqrt(5)) / 4})
comprobar('t5 §14 cos 36° = 1 − 2sen²18° = (1 + √5)/4 y 6 − 2√5', sp.simplify(1 - 2 * ((sp.sqrt(5) - 1) / 4)**2 - (1 + sp.sqrt(5)) / 4) == 0 and sp.expand((sp.sqrt(5) - 1)**2) == 6 - 2 * sp.sqrt(5) and cerca(0.3090, float(s18), 5e-5) and cerca(0.8090, float(c36), 5e-5))

# --- 15. Problemas de examen
aa_, bb_ = math.pi - math.asin(3 / 5), math.pi + math.acos(5 / 13)      # a en el 2.º cuadrante, b en el 3.er
comprobar('t5 P1 sen(a+b), cos(a+b), tan(a+b), cos(a−b)', cerca(math.sin(aa_ + bb_), 33 / 65, 1e-12) and cerca(math.cos(aa_ + bb_), 56 / 65, 1e-12) and cerca(math.tan(aa_ + bb_), 33 / 56, 1e-12) and cerca(math.cos(aa_ - bb_), -16 / 65, 1e-12) and cerca(math.cos(aa_), -4 / 5, 1e-12) and cerca(math.sin(bb_), -12 / 13, 1e-12) and 1089 + 3136 == 65**2)
comprobar('t5 P1 a + b en el 1.er cuadrante', 0 < (deg(aa_ + bb_)) % 360 < 90)
comprobar('t5 P2 sen x + sen 2x + sen 3x = 0', mismos(ceros(lambda x: sd(x) + sd(2 * x) + sd(3 * x)), [0, 90, 120, 180, 240, 270]))
fP3 = lambda x: cd(2 * x) - 3 * cd(x)
v3 = [(fP3(i / 100), i / 100) for i in range(36000)]
comprobar('t5 P3 máximo y mínimo de cos 2x − 3cos x', cerca(max(v3)[0], 4, 1e-9) and circ(max(v3)[1], 180) < 0.01 and cerca(min(v3)[0], -17 / 8, 1e-5) and (circ(min(v3)[1], deg(math.acos(0.75))) < 0.02 or circ(min(v3)[1], 360 - deg(math.acos(0.75))) < 0.02) and cerca(deg(math.acos(0.75)), 41.41, 0.0051) and cerca(360 - deg(math.acos(0.75)), 318.59, 0.0051) and sp.Rational(2 * 9, 16) - sp.Rational(9, 4) - 1 == sp.Rational(-17, 8))
comprobar('t5 P4 tan(x/2) = (1 − cos x)/sen x y tan 15°', all(cerca(td(x / 2), (1 - cd(x)) / sd(x), 1e-12) for x in (20, 70, 140, 250)) and cerca(td(15), 2 - S3, 1e-12) and cerca(td(15), 0.2679, 5e-5) and sp.simplify(sp.tan(sp.pi / 12) - (2 - sp.sqrt(3))) == 0)

# =====================================================================
# TEMA 5 · ejercicios h37–h48
# =====================================================================
comprobar('t5 h37', near(cd(75) + cd(15), nv(E5, 'h37'), 0.0005) and cerca(math.sqrt(6) / 2, nv(E5, 'h37'), 1e-4))
comprobar('t5 h38', near(ang_rectas(1, 1 / 3), nv(E5, 'h38'), 0.0005) and cerca(deg(math.atan(0.5)), 26.565, 0.0005))
comprobar('t5 h39', mismos(ceros(lambda x: 2 * sd(x)**2 - 3 * cd(x)), lv(E5, 'h39')))
comprobar('t5 h40', mismos(ceros(lambda x: cd(2 * x) + 5 * cd(x) + 3), lv(E5, 'h40')))
comprobar('t5 h41', mismos(ceros(lambda x: sd(x)**2 - (1 + S3) * sd(x) * cd(x) + S3 * cd(x)**2), lv(E5, 'h41')))
comprobar('t5 h42', mismos(ceros(lambda x: cd(x) + cd(3 * x) - cd(2 * x)), lv(E5, 'h42')))
comprobar('t5 h43', nv(E5, 'h43', 0) == abs(440 - 444) and nv(E5, 'h43', 1) == (440 + 444) / 2 and all(cerca(math.sin(2 * math.pi * 440 * q) + math.sin(2 * math.pi * 444 * q), 2 * math.cos(math.pi * 4 * q) * math.sin(2 * math.pi * 442 * q), 1e-9) for q in (0.013, 0.2, 0.77)))
comprobar('t5 h44', s3 == [(nv(E5, 'h44', 0), nv(E5, 'h44', 1))] and s3b == [(60.0, 30.0)])
comprobar('t5 h45', s2 == [(nv(E5, 'h45', 0), nv(E5, 'h45', 1))])
comprobar('t5 h46', mismos(ceros(lambda x: 3 * sd(x) + 4 * cd(x) - 2), lv(E5, 'h46'), 0.011))
comprobar('t5 h47 (rúbrica de 4 pasos; la identidad se cumple)', len(chk(E5, 'h47')['items']) == 4 and all(cerca(sd(3 * x) / sd(x) - cd(3 * x) / cd(x), 2, 1e-8) for x in xs_))
comprobar('t5 h48', cerca(float(s18), nv(E5, 'h48', 0), 0.002) and cerca(float(c36), nv(E5, 'h48', 1), 0.002) and cerca(1 - 2 * 0.3090**2, 0.8090, 5e-4) and cerca(sd(18), 0.5 * (math.sqrt(5) - 1) / 2, 1e-12))

# =====================================================================
# TEMA 5 · test y «encuentra el error» nuevos
# =====================================================================
Q5 = T5['datos']['quiz1']['preguntas']; X5 = T5['datos']['errores']['preguntas']
comprobar('t5 test 11: cos A − cos B', all(cerca(cd(A) - cd(Bq), -2 * sd((A + Bq) / 2) * sd((A - Bq) / 2), 1e-12) for A, Bq in ((70, 20), (200, 33), (301, 111))) and opt(Q5, 10).startswith('−2·sen'))
comprobar('t5 test 12: 256 y 260 Hz', abs(256 - 260) == 4 and (256 + 260) / 2 == 258 and opt(Q5, 11) == '4')
comprobar('t5 test 13: 2sen²x − sen x − 1 = 0 tiene 3 soluciones', len(ceros(lambda x: 2 * sd(x)**2 - sd(x) - 1)) == 3 and opt(Q5, 12) == '3')
comprobar('t5 test 14: 3sen x + 4cos x = c ⇔ |c| ≤ 5', math.hypot(3, 4) == 5 and max(3 * sd(x / 10) + 4 * cd(x / 10) for x in range(3600)) <= 5 + 1e-12 and cerca(min(3 * sd(x / 10) + 4 * cd(x / 10) for x in range(3600)), -5, 1e-3) and opt(Q5, 13) == '|c| ≤ 5')
comprobar('t5 test 15: ángulo entre y = 2x e y = x/3', cerca(ang_rectas(2, 1 / 3), 45, 1e-9) and opt(Q5, 14) == '45°')
comprobar('t5 test 16: con tan(x/2) se comprueba x = 180°', cerca(math.cos(D(90)), 0, 1e-12) and opt(Q5, 15).startswith('x = 180°'))
comprobar('t5 error 8: 2sen²x + 3sen x − 2 = 0, raíz −2', sorted(sp.solve(2 * tq**2 + 3 * tq - 2, tq)) == [-2, sp.Rational(1, 2)] and 'descarta' in opt(X5, 7))
comprobar('t5 error 9: sen 3x + sen x ≠ sen 4x', cerca(sd(30) + sd(30), 1, 1e-12) and cerca(sd(60), 0.866, 5e-4) and all(cerca(sd(3 * x) + sd(x), 2 * sd(2 * x) * cd(x), 1e-12) for x in (10, 77)) and not cerca(sd(3 * 10) + sd(10), sd(40), 1e-6) and '2·sen 2x·cos x' in opt(X5, 8))
comprobar('t5 error 10: 3sen x + 4cos x = 6 sin solución', 6 / 5 == 1.2 and 'no tiene solución' in opt(X5, 9))

print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f_ in fallos: print('  FALLO:', f_)
sys.exit(1 if fallos else 0)
