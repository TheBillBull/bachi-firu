#!/usr/bin/env python3
"""
Verificación independiente de Física y Química 1.º, temas 8 (cinemática), 9 (movimiento circular)
y 10 (dinámica): recalcula con math/sympy cada respuesta numérica de los ejercicios y cada dato
numérico de la teoría, sin compartir código con la web.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_fyq1_t8-10.py /tmp/ampl.json
"""
import json, math, sys
import sympy as sp

datos = json.load(open(sys.argv[1]))
fallos, ok = [], 0
g = 9.8


def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')


def cerca(a, b, tol=1e-3):
    return abs(float(a) - float(b)) <= tol * max(1.0, abs(float(b)))


def tema(t):
    return {e['id']: e for e in datos['ampl']['fyq1'][t]['ejercicios']}


def chk(E, id_, k=0):
    c = E[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[k]


def val(E, id_, k=0): return chk(E, id_, k)['valor']


def vals(E, id_, esperados, tol=1e-3):
    """Compara todos los campos numéricos de un ejercicio con los valores esperados (calculados aquí)."""
    c = E[id_]['check']; c = c if isinstance(c, list) else [c]
    comprobar(f'{id_} nº de campos', len(c) == len(esperados), f'{len(c)} vs {len(esperados)}')
    for k, (campo, esp) in enumerate(zip(c, esperados)):
        comprobar(f'{id_}[{k}] {campo.get("etiqueta", "")}', campo['tipo'] == 'num' and cerca(campo['valor'], esp, tol), f'web={campo.get("valor")} calculado={esp}')


def ok_opcion(E, id_, texto, k=0):
    c = chk(E, id_, k)
    comprobar(f'{id_} opción correcta', c['tipo'] == 'opcion' and c['opciones'][c['ok']] == texto, f'{c["opciones"][c["ok"]]!r} vs {texto!r}')


# =====================================================================
# TEMA 8 · Cinemática
# =====================================================================
E = tema('t8')
kmh = lambda v: v / 3.6
vals(E, 'c1', [72 / 3.6]); vals(E, 'c2', [45 / 2.5]); vals(E, 'c3', [-20 + 5 * 12]); vals(E, 'c4', [3000 / 25])
vals(E, 'c5', [25 - 10, (40 - 10) + (40 - 25)])
vals(E, 'c6', [kmh(100) / 8]); vals(E, 'c7', [3 * 6, 0.5 * 3 * 36])
a8 = sp.Symbol('a8'); vals(E, 'c8', [float(sp.solve(sp.Eq(20**2, 10**2 + 2 * 1.5 * sp.Symbol('x8')), sp.Symbol('x8'))[0])])
vals(E, 'c9', [math.sqrt(2 * 20 / g), g * math.sqrt(2 * 20 / g)])
vals(E, 'c10', [19.6**2 / (2 * g), 19.6 / g])
ok_opcion(E, 'c11', 'En reposo'); ok_opcion(E, 'c12', 'Frena')
# c13: media armónica
d = sp.Symbol('d', positive=True); vals(E, 'c13', [float(sp.simplify(2 * d / (d / 60 + d / 40)))])
tt = sp.Symbol('tt'); vals(E, 'c14', [float(sp.solve(20 * tt - (300 - 10 * tt), tt)[0]), 20 * float(sp.solve(20 * tt - (300 - 10 * tt), tt)[0])])
t15 = float(sp.solve(25 * (tt - 6) - 15 * tt, tt)[0]); vals(E, 'c15', [t15 - 6, 15 * t15])
vals(E, 'c16', [30**2 / (2 * 6), 30 / 6])
a17 = (20**2 - 10**2) / (2 * 200); vals(E, 'c17', [a17, (20 - 10) / a17])
vals(E, 'c18', [0.5 * 2 * 100, 0.5 * 2 * 100 / 10])
a19 = -(70**2) / (2 * 1000); vals(E, 'c19', [a19, -70 / a19])
vals(E, 'c20', [0.5 * g * 9, g * 3]); vals(E, 'c21', [20**2 / (2 * g), 2 * 20 / g]); vals(E, 'c22', [0.5 * g * 2.5**2])
vals(E, 'c23', [0.5 * 5 * 15 + 10 * 15 + 0.5 * 3 * 15]); vals(E, 'c24', [(0 - 15) / 3])
vals(E, 'c25', [float(sp.solve(20 * tt - tt**2, tt)[1]) if len(sp.solve(20 * tt - tt**2, tt)) > 1 else 0, 400])
comprobar('c25 t', sorted(sp.solve(20 * tt - tt**2, tt)) == [0, 20])
vals(E, 'c26', [25 * 0.8 + 25**2 / (2 * 6)])
tc = math.sqrt(2 * 1.25 / g); vals(E, 'c27', [tc, 3 * tc])
th = math.radians(30); vals(E, 'c28', [2 * 20 * math.sin(th) / g, 20**2 * math.sin(2 * th) / g, (20 * math.sin(th))**2 / (2 * g)])
vals(E, 'c29', [45, 15**2 / g])
comprobar('c29 máximo en 45°', max(range(1, 90), key=lambda a: math.sin(math.radians(2 * a))) == 45)
t1 = float(sp.solve(4.9 * tt**2 + 340 * tt - 340 * 3.0, tt)[1]) if False else max(sp.solve(4.9 * tt**2 + 340 * tt - 340 * 3.0, tt)); vals(E, 'c30', [4.9 * float(t1)**2])
vals(E, 'c31', [30**2 / (2 * 120)]); vals(E, 'c32', [(1350 + 150) / 25])
t33 = max(sp.solve(40 + 5 * tt - 4.9 * tt**2, tt)); vals(E, 'c33', [float(t33), abs(5 - g * float(t33))])
x34 = 5 + 4 * tt - 2 * tt**2
vals(E, 'c34', [float(sp.diff(x34, tt, 2)), float(sp.solve(sp.diff(x34, tt), tt)[0]), float(x34.subs(tt, sp.solve(sp.diff(x34, tt), tt)[0]))])
vals(E, 'c35', [float(x34.subs(tt, 3) - x34.subs(tt, 0)), (7 - 5) + (7 - (-1))])
tA = math.sqrt(160 / g); v36 = (80 - 0.5 * g * (tA - 1)**2) / (tA - 1); vals(E, 'c36', [v36])
comprobar('c36 comprobación', cerca(v36 * (tA - 1) + 0.5 * g * (tA - 1)**2, 80))
v37, a37 = 12, math.radians(40); vy = v37 * math.sin(a37); vx = v37 * math.cos(a37); t37 = max(sp.solve(2 + vy * tt - 4.9 * tt**2, tt)); vals(E, 'c37', [float(t37), vx * float(t37)])
vals(E, 'c38', [120 / (60 / 90 + 30 / 60 + 30 / 120)])
vals(E, 'c39', [0.5 * 2 * 7**2 + 14 * 3])
ok_opcion(E, 'c42', 'a la vez')

# --- teoría del tema 8 ---
comprobar('t8 teoría: conversión 54 km/h y 8 m/s', cerca(54 / 3.6, 15) and cerca(8 * 3.6, 28.8))
comprobar('t8 teoría: ida y vuelta (desplazamiento y distancia)', 25 - 10 == 15 and (40 - 10) + (40 - 25) == 45)
comprobar('t8 teoría: ciclista rapidez media 24 km/h', cerca(60 / 2.5, 24))
comprobar('t8 teoría: tres tramos 80 km/h', cerca(60 / (20 / 80 + 30 / 100 + 10 / 50), 80))
x2 = lambda t: 2 * t**2
comprobar('t8 teoría: velocidades medias hacia 12 m/s', cerca((x2(4) - x2(3)) / 1, 14) and cerca((x2(3.1) - x2(3)) / 0.1, 12.2) and cerca((x2(3.01) - x2(3)) / 0.01, 12.02))
comprobar('t8 teoría: tren 45 km y 20 min', cerca(45 / 90, 0.5) and cerca(90 / 3, 30))
comprobar('t8 teoría: eco 510 m y túnel 50 s', cerca(340 * 3.0 / 2, 510) and cerca((800 + 200) / 20, 50))
comprobar('t8 teoría: luz del Sol 500 s y año luz', cerca(1.5e11 / 3e8, 500) and abs(3.0e8 * 3.156e7 - 9.46e15) / 9.46e15 < 0.005)
comprobar('t8 teoría: aceleración AVE y frenada', cerca((70 - 20) / 50, 1.0) and cerca(72 / 3.6, 20) and cerca(252 / 3.6, 70) and cerca((0 - 25) / 10, -2.5))
comprobar('t8 teoría: trapecio y a_deportivo', cerca(100 / 3.6 / 3, 9.26, 1e-2))
comprobar('t8 teoría: frenada 90 km/h a=-5', cerca(25**2 / 10, 62.5) and cerca(25 / 5, 5) and cerca(0.5 * 25 * 5, 62.5))
comprobar('t8 teoría: adelantamiento 208 m', cerca(20 + 1.5 * 8, 32) and cerca(20 * 8 + 0.5 * 1.5 * 64, 208))
comprobar('t8 teoría: pelota que se detiene', 6 / 2 == 3 and 6 * 3 - 0.5 * 2 * 9 == 9 and 6 - 2 * 5 == -4 and 6 * 5 - 0.5 * 2 * 25 == 5 and 9 + (9 - 5) == 13)
comprobar('t8 teoría: 5.º segundo', 0.5 * 4 * 25 - 0.5 * 4 * 16 == 18 and 4 * (2 * 5 - 1) / 2 == 18)
comprobar('t8 teoría: pelota lanzada a 14,7 m/s', cerca(14.7 / 9.8, 1.5) and cerca(14.7**2 / (2 * 9.8), 11.0, 1e-2))
t_p = max(sp.solve(30 + 10 * tt - 4.9 * tt**2, tt)); comprobar('t8 teoría: puente 30 m', cerca(t_p, 3.70, 1e-2) and cerca(10 - 9.8 * float(t_p), -26.2, 1e-2) and cerca(math.sqrt(100 + 588), 26.23, 1e-3))
t_pz = max(sp.solve(4.9 * tt**2 + 340 * tt - 1530, tt)); comprobar('t8 teoría: pozo 4,5 s', cerca(t_pz, 4.24, 1e-2) and cerca(4.9 * float(t_pz)**2, 88.1, 1e-2) and cerca(0.5 * g * 4.5**2, 99.2, 1e-2))
comprobar('t8 teoría: tiempo de caída de 20 m en los astros', [round(math.sqrt(40 / gx), 1) for gx in (9.8, 1.62, 3.71, 24.8)] == [2.0, 5.0, 3.3, 1.3])
comprobar('t8 teoría: mesa 1,8 m y 4 m/s', cerca(math.sqrt(3.6 / g), 0.606, 1e-2) and cerca(4 * math.sqrt(3.6 / g), 2.42, 1e-2) and cerca(g * math.sqrt(3.6 / g), 5.94, 1e-2) and cerca(math.hypot(4, g * math.sqrt(3.6 / g)), 7.16, 1e-2) and cerca(math.degrees(math.atan(g * math.sqrt(3.6 / g) / 4)), 56.0, 1e-2))
comprobar('t8 teoría: 25 m/s a 53,13°', cerca(25 * 0.6, 15) and cerca(25 * 0.8, 20) and cerca(20 / g * 2, 4.08, 1e-2) and cerca(20**2 / (2 * g), 20.4, 1e-2) and cerca(15 * 2 * 20 / g, 61.2, 1e-2) and cerca(25**2 * math.sin(math.radians(2 * 53.13)) / g, 61.2, 1e-2) and cerca(30**2 / g, 91.8, 1e-2))
v_, a_ = 13, math.radians(40); vx_ = v_ * math.cos(a_); vy_ = v_ * math.sin(a_); t_ = max(sp.solve(2 + vy_ * tt - 4.9 * tt**2, tt)); vf = math.hypot(vx_, vy_ - g * float(t_))
comprobar('t8 teoría: lanzamiento de peso', cerca(t_, 1.92, 1e-2) and cerca(vx_ * float(t_), 19.1, 1e-2) and cerca(vf, 14.4, 1e-2) and cerca(math.sqrt(169 + 2 * g * 2), 14.4, 1e-2))
comprobar('t8 teoría: gráfica en tres tramos', cerca(12 / 4, 3) and cerca(-12 / 2, -6) and 0.5 * 4 * 12 + 6 * 12 + 0.5 * 2 * 12 == 108 and [5 + 2 * t + 0.5 * t * t for t in range(1, 5)] == [7.5, 11, 15.5, 21])
comprobar('t8 teoría: ciclistas 54 km', cerca(90 / 30, 3) and 18 * 3 == 54)
comprobar('t8 teoría: alcance con retraso 480 m', cerca(sp.solve(20 * (tt - 8) - 15 * tt, tt)[0], 32) and 15 * 32 == 480 and 120 / 5 == 24)
comprobar('t8 teoría: arranque 320 m a 40 m/s', [round(float(r), 6) for r in sorted(sp.solve(20 * tt - 1.25 * tt**2, tt))] == [0, 16] and 20 * 16 == 320 and 2.5 * 16 == 40)
comprobar('t8 teoría: dos encuentros (2 s y 5 s)', sorted(sp.solve(10 + 3 * tt - (10 * tt - tt**2), tt)) == [2, 5] and 10 + 3 * 2 == 16 and 10 + 3 * 5 == 25 and 10 - 2 * 5 == 0)
comprobar('t8 teoría: distancia de reacción y frenado', cerca(72 / 3.6, 20) and cerca(20 * 0.75, 15) and cerca(20**2 / 12, 33.3, 1e-2) and cerca(15 + 20**2 / 12, 48.3, 1e-2) and cerca(math.sqrt(400 - 2 * 6 * 25), 10) and cerca(25 * 2.5, 62.5) and cerca(120 / 3.6, 33.33, 1e-2) and cerca((120 / 3.6)**2 / 14, 79.4, 1e-2) and cerca((120 / 3.6)**2 / 2, 555.6, 1e-2))
comprobar('t8 teoría: adelantamiento 5,6 s', cerca(20 + 12 + 4 + 20, 56) and cerca(56 / 10, 5.6) and cerca(30 * 5.6, 168))
t_ad = max(sp.solve(tt**2 + 10 * tt - 158, tt)); comprobar('t8 problema 1: adelantamiento', cerca(t_ad, 8.53, 1e-2) and cerca(25 * float(t_ad) + 0.5 * float(t_ad)**2, 249.6, 1e-2) and cerca((25 + float(t_ad)) * 3.6, 120.7, 1e-2) and 30 + 15 + 4 + 30 == 79)
comprobar('t8 problema 2: v–t por tramos', [8 / 4, 0, (0 - 8) / 2, (-8 - 0) / 4] == [2, 0, -4, -2] and 0.5 * 4 * 8 + 6 * 8 + 0.5 * 2 * 8 == 72 and 0.5 * 4 * (-8) == -16 and 72 - 16 == 56 and 72 + 16 == 88)
comprobar('t8 problema 3: ascensor', cerca(1.2 * 4, 4.8) and cerca(0.5 * 1.2 * 16, 9.6) and cerca(4.8 * 6, 28.8) and cerca(4.8 / 1.6, 3) and cerca(0.5 * 4.8 * 3, 7.2) and cerca(9.6 + 28.8 + 7.2, 45.6) and 4 + 6 + 3 == 13)
t_c = math.sqrt(160 / g); comprobar('t8 problema 4: cañón', cerca(t_c, 4.04, 1e-2) and cerca(120 / t_c, 29.7, 1e-2) and cerca(g * t_c, 39.6, 1e-2) and cerca(math.hypot(120 / t_c, g * t_c), 49.5, 1e-2) and cerca(math.degrees(math.atan(g * t_c / (120 / t_c))), 53.1, 1e-2))
tA2 = math.sqrt(90 / g); comprobar('t8 problema 5: dos piedras', cerca(tA2, 3.03, 1e-2) and cerca((45 - 4.9 * (tA2 - 1)**2) / (tA2 - 1), 12.2, 1e-2))
comprobar('t8 problema 6: moto y coche', cerca(54 / 3.6, 15) and [round(float(r), 6) for r in sorted(sp.solve(1.5 * tt**2 - 15 * tt, tt))] == [0, 10] and 15 * 10 == 150 and 3 * 10 == 30 and cerca(30 * 3.6, 108))
comprobar('t8 quiz: valores', 25 - 10 == 15 and 20 == 72 / 3.6 and 30 - 5 * 4 == 10 and (30 - 10) / 5 == 4 and 0.5 * 2 * 36 == 36 and 20**2 / (2 * 5) == 40 and 10 * 3 == 30 and 0.5 * 10 * 9 == 45)
comprobar('t8 errores: 36 km/h y d/g', cerca(36 / 3.6, 10) and cerca(math.sqrt(2 * 80 / 9.8), 4.04, 1e-2) and 20 * 5 + 0.5 * 4 * 25 == 150)
comprobar('t8 clasificar y emparejar existen', len(datos['ampl']['fyq1']['t8']['datos']['clas1']['items']) == 9 and len(datos['ampl']['fyq1']['t8']['datos']['emp1']['pares']) == 8)
comprobar('t8 mínimos de contenido', len(E) >= 36 and len(datos['ampl']['fyq1']['t8']['lamina']) >= 7 and len(datos['ampl']['fyq1']['t8']['nuevas']) >= 6)

# =====================================================================
# TEMA 9 · Movimiento circular
# =====================================================================
E = tema('t9')
TAU = 2 * math.pi
rpm = lambda n: n * TAU / 60


def rel(a, b, tol=1e-2):
    """Comparación relativa (válida para cantidades muy pequeñas o muy grandes)."""
    return abs(float(a) - float(b)) <= tol * abs(float(b))


vals(E, 'c1', [225 * math.pi / 180]); vals(E, 'c2', [2.5 * 180 / math.pi]); vals(E, 'c3', [12 * TAU]); vals(E, 'c4', [3.0 * 0.25])
vals(E, 'c5', [rpm(450)]); vals(E, 'c6', [1 / 0.8, TAU / 0.8]); vals(E, 'c7', [8.0 * 0.15]); vals(E, 'c8', [0.40 + 2.5 * 6.0]); vals(E, 'c9', [15**2 / 75])
vals(E, 'c10', [TAU / 60 * 0.12], 1e-3); vals(E, 'c11', [1800 / 60, 60 / 1800]); vals(E, 'c12', [(20 - 0) / 5.0]); vals(E, 'c13', [2.0 + 0.5 * 8.0])
ok_opcion(E, 'c14', 'apunta hacia el centro de la circunferencia')
w15 = rpm(200); vals(E, 'c15', [w15 * 0.30, w15**2 * 0.30])
w_T = TAU / 86164; vals(E, 'c16', [w_T * 6.371e6 * math.cos(math.radians(60))])
w17 = TAU / 6.0; vals(E, 'c17', [math.radians(210) / w17])
vals(E, 'c18', [10 / 0.35, 2000 / (TAU * 0.35)])
T19 = 687 * 86400; vals(E, 'c19', [(TAU / T19)**2 * 2.279e11], 2e-3)
vals(E, 'c20', [math.sqrt(5.0 * 80) * 3.6])
vals(E, 'c21', [math.sqrt(9800 / 0.10) * 60 / TAU])
th22 = math.pi / 2 - 4.0 * 1.0; vals(E, 'c22', [5.0 * math.cos(th22), 5.0 * math.sin(th22)])
vals(E, 'c23', [0.5 * 1.5 * 100 / TAU]); vals(E, 'c24', [(0 - 40) / 8.0, 0.5 * (40 + 0) * 8.0])
vals(E, 'c25', [2.0 * 0.30, 5.0**2 * 0.30, math.hypot(2.0 * 0.30, 25 * 0.30)]); vals(E, 'c26', [150 * 24 / 36])
vals(E, 'c27', [1800 * 4.0 / 12.0, rpm(1800) * 0.040])
tq = sp.Symbol('tq', positive=True)
vals(E, 'c28', [float(sp.solve(sp.Eq((TAU / 40 - TAU / 50) * tq, TAU), tq)[0]), float(sp.solve(sp.Eq((TAU / 40 + TAU / 50) * tq, TAU), tq)[0])])
r29, T29 = 2.656e7, 43080; v29 = TAU * r29 / T29; vals(E, 'c29', [v29, v29**2 / r29])
v30 = 110 / 3.6; vals(E, 'c30', [v30 / 0.31 * 60 / TAU, 2 * v30])
vals(E, 'c31', [100 * 0.33 / 0.31])
vals(E, 'c32', [1800 * 24 / 48 * 15 / 60])
wf33 = rpm(1000); vals(E, 'c33', [wf33 / 12, 0.5 * wf33 * 12 / TAU, wf33**2 * 0.22])
w34 = rpm(100 / 3); vals(E, 'c34', [-w34 / 2.0, 0.5 * w34 * 2.0 / TAU])
vals(E, 'c35', [float(sp.solve(sp.Eq(6 * tq, 90 + 0.5 * tq), tq)[0])])
vals(E, 'c36', [float(sp.solve(sp.Eq(1.2 * tq, math.pi / 3 + 0.8 * tq), tq)[0]), float(sp.solve(sp.Eq(1.2 * tq, math.pi / 3 - 0.8 * tq), tq)[0])])
th37 = 2 + 3 * tq + sp.Rational(1, 2) * tq**2; w37 = sp.diff(th37, tq); vals(E, 'c37', [float(w37.subs(tq, 4)), float(th37.subs(tq, 4) - th37.subs(tq, 0)), float(w37.subs(tq, 4))**2 * 0.5])
w38 = TAU / 40; vals(E, 'c38', [w38 * 12, w38**2 * 12, 40 / 2])
r39 = 6.371e6 * math.cos(math.radians(40)); vals(E, 'c39', [w_T**2 * r39, w_T**2 * r39 / 9.8 * 100])
ok_opcion(E, 'c42', 'en línea recta, por la tangente a la circunferencia')
comprobar('t9 c40 y c41 son rúbricas', chk(E, 'c40')['tipo'] == 'rubrica' and chk(E, 'c41')['tipo'] == 'rubrica')

# --- teoría del tema 9 ---
comprobar('t9 teoría: tabla de radianes', [round(math.radians(a), 4) for a in (30, 45, 60, 90, 180, 270, 360)] == [0.5236, 0.7854, 1.0472, 1.5708, 3.1416, 4.7124, 6.2832] and cerca(math.degrees(1), 57.296, 1e-4))
comprobar('t9 teoría: cambios de unidades', cerca(150 * math.pi / 180, 2.618, 1e-3) and cerca(2.4 * 180 / math.pi, 137.5, 1e-3) and cerca(3.5 * TAU, 21.99, 1e-3))
comprobar('t9 teoría: arco de 2,5 vueltas', cerca(2.5 * TAU, 15.71, 1e-3) and cerca(2.5 * TAU * 0.30, 4.71, 1e-3) and cerca(2.5 * TAU * 0.10, 1.57, 1e-2))
comprobar('t9 teoría: 7 vueltas', cerca(14 * math.pi, 43.98, 1e-3))
comprobar('t9 teoría: agujas del reloj', rel(TAU / 60, 0.1047, 1e-3) and rel(TAU / 3600, 1.745e-3, 1e-3) and rel(TAU / 43200, 1.454e-4, 1e-3) and 3600 / 60 == 60 and 43200 / 3600 == 12)
comprobar('t9 teoría: ω media y vueltas', cerca((12.5 - 0.5) / 4, 3.0) and cerca(12.0 / TAU, 1.91, 1e-2))
comprobar('t9 teoría: tabla de conversiones', cerca(rpm(300), 31.42, 1e-3) and cerca(10 * 60 / TAU, 95.49, 1e-3) and cerca(5 * TAU, 31.42, 1e-3) and cerca(math.radians(90), 1.571, 1e-3) and cerca(60 / TAU, 9.549, 1e-3) and cerca(TAU / 60, 0.1047, 1e-3))
comprobar('t9 teoría: disco 500 rpm y 300 rpm × 5 s', cerca(rpm(500), 52.36, 1e-3) and cerca(rpm(500) * 0.030, 1.57, 1e-2) and cerca(rpm(500) * 0.055, 2.88, 1e-2) and cerca(0.055 / 0.030, 1.83, 1e-2) and cerca(rpm(500) * 0.030 * 3.6, 5.7, 2e-2) and cerca(rpm(500) * 0.055 * 3.6, 10.4, 1e-2) and cerca(rpm(300) * 5 / TAU, 25.0, 1e-3))
comprobar('t9 teoría: rueda de coche a 90 km/h', cerca(25 / 0.30, 83.3, 1e-3) and cerca(25 / 0.30 * 60 / TAU, 796, 1e-3) and cerca(1000 / (TAU * 0.30), 530, 1e-3))
lat = {0: (6371, 464.6, 1672), 40: (4880, 355.9, 1281), 66.5: (2540, 185.3, 667), 90: (0, 0, 0)}
comprobar('t9 teoría: tabla de la Tierra', all(rel(6371 * math.cos(math.radians(a)), r_, 5e-3) if r_ else abs(6371 * math.cos(math.radians(a))) < 1e-6 for a, (r_, _, _) in lat.items()) and all(rel(w_T * 6.371e6 * math.cos(math.radians(a)), v_, 5e-3) if v_ else abs(math.cos(math.radians(a))) < 1e-12 for a, (_, v_, _) in lat.items()) and all(rel(w_T * 6.371e6 * math.cos(math.radians(a)) * 3.6, kh, 5e-3) if kh else True for a, (_, _, kh) in lat.items()) and rel(w_T, 7.292e-5, 1e-3) and cerca(math.cos(math.radians(40)), 0.766, 1e-3))
comprobar('t9 teoría: volante 600 rpm', cerca(600 / 60, 10) and cerca(1 / 10, 0.10) and cerca(rpm(600), 62.83, 1e-3) and cerca(rpm(600) * 0.12, 7.54, 1e-3) and cerca(rpm(600) * 0.12 * 3.6, 27.1, 1e-2))
Tl = 27.32 * 86400; comprobar('t9 teoría: la Luna', rel(Tl, 2.360e6, 1e-3) and rel(1 / Tl, 4.236e-7, 1e-3) and rel(TAU / Tl, 2.662e-6, 1e-3))
comprobar('t9 teoría: hélice y disco duro', cerca(125.7 / TAU, 20.0, 2e-3) and cerca(1 / 20.0, 0.05) and cerca(20.0 * 60, 1200, 1e-3) and cerca(7200 / 60, 120) and rel(1 / 120, 8.33e-3, 1e-3) and cerca(TAU * 120, 753.98, 1e-4) and cerca(TAU * 120 * 0.045, 33.9, 1e-2) and cerca(TAU * 120 * 0.045 * 3.6, 122, 1e-2) and rel(1 / 120 / 2, 4.17e-3, 1e-2))
w_t = TAU / 8.0; comprobar('t9 teoría: tiovivo', cerca(w_t, 0.785, 1e-3) and cerca(w_t * 3.0, 2.36, 1e-2) and cerca(w_t * 3.0 * 3.6, 8.5, 1e-2) and cerca(w_t * 20, 15.71, 1e-3) and cerca(w_t * 20 / TAU, 2.5) and cerca(math.radians(90) / w_t, 2.0))
wb = 5 / 0.34; comprobar('t9 teoría: bicicleta 18 km/h', cerca(18 / 3.6, 5.0) and cerca(wb, 14.7, 1e-2) and cerca(wb * 60 / TAU, 140, 1e-2) and cerca(TAU * 0.34, 2.136, 1e-3) and cerca(1000 / (TAU * 0.34), 468, 1e-3) and cerca(wb / TAU, 2.34, 1e-2) and cerca(wb / TAU * 200, 468, 1e-2))
th_p = math.radians(30) + 3.0 * 0.5; comprobar('t9 teoría: posición cartesiana', cerca(math.radians(30), 0.5236, 1e-3) and cerca(th_p, 2.024, 1e-3) and cerca(math.degrees(th_p), 115.9, 1e-3) and cerca(2 * math.cos(th_p), -0.875, 1e-2) and cerca(2 * math.sin(th_p), 1.80, 1e-2) and cerca((2 * math.cos(th_p))**2 + (2 * math.sin(th_p))**2, 4.0))
th_h = math.pi / 2 - 3.0 * 0.5; comprobar('t9 teoría: sentido horario', cerca(th_h, 0.0708, 1e-2) and cerca(math.degrees(th_h), 4.06, 1e-2) and cerca(2 * math.cos(th_h), 1.995, 1e-3) and cerca(2 * math.sin(th_h), 0.141, 1e-2))
comprobar('t9 teoría: aceleración centrípeta (curva, Luna, centrifugadora)', cerca(30**2 / 150, 6.0) and cerca(30**2 / 150 / 9.8, 0.61, 1e-2) and cerca(15**2 / 150, 1.5) and rel((TAU / Tl)**2 * 3.844e8, 2.72e-3, 5e-3) and cerca(9.8 / ((TAU / Tl)**2 * 3.844e8), 3600, 2e-2) and cerca(3.844e8 / 6.371e6, 60.3, 1e-3) and cerca(rpm(3000), 314.2, 1e-3) and rel(rpm(3000)**2 * 0.15, 1.48e4, 1e-2) and cerca(rpm(3000)**2 * 0.15 / 9.8, 1510, 1e-2))
comprobar('t9 teoría: ISS y avión', cerca(7670**2 / 6.771e6, 8.69, 1e-2) and cerca(7670**2 / 6.771e6 / 9.8, 0.887, 1e-2) and cerca(TAU * 6.771e6 / 7670, 5547, 1e-3) and cerca(TAU * 6.771e6 / 7670 / 60, 92.4, 1e-3) and cerca(86400 / (TAU * 6.771e6 / 7670), 15.6, 1e-2) and cerca(250**2 / 1500, 41.7, 1e-2) and cerca(250**2 / 1500 / 9.8, 4.25, 1e-2))
comprobar('t9 teoría: arranque de rueda 120 rpm', cerca(rpm(120), 12.57, 1e-3) and cerca(rpm(120) / 5, 2.51, 1e-2) and cerca(0.5 * rpm(120) / 5 * 25, 31.4, 1e-3) and cerca(0.5 * rpm(120) / 5 * 25 / TAU, 5.0, 1e-9))
w_v = rpm(900); comprobar('t9 teoría: ventilador y disco que frena', cerca(w_v, 94.25, 1e-3) and cerca(-w_v / 20, -4.71, 1e-2) and cerca(0.5 * w_v * 20 / TAU, 150, 1e-9) and cerca(100 / 4.0, 25) and cerca(25 / TAU, 3.98, 1e-2) and cerca(10 / 2.0, 5.0))
comprobar('t9 teoría: lavadora que centrifuga', cerca(rpm(1200), 125.7, 1e-3) and cerca(rpm(1200) / 15, 8.38, 1e-2) and cerca(0.5 * rpm(1200) * 15 / TAU, 150, 1e-9) and cerca(rpm(1200)**2 * 0.25, 3948, 1e-3) and cerca(rpm(1200)**2 * 0.25 / 9.8, 403, 1e-2))
w_r = 2.0 * 3.0; comprobar('t9 teoría: punto de una rueda que arranca', cerca(w_r, 6.0) and cerca(w_r * 0.40, 2.4) and cerca(2.0 * 0.40, 0.80) and cerca(w_r**2 * 0.40, 14.4) and cerca(math.hypot(0.80, 14.4), 14.4, 1e-2) and cerca(math.degrees(math.atan(0.80 / 14.4)), 3.2, 2e-2) and cerca(0.5 * 2.0 * 9.0, 9.0) and cerca(9.0 / TAU, 1.43, 1e-2) and cerca(math.sqrt(TAU), 2.51, 1e-2) and cerca(math.sqrt(2 * TAU) - math.sqrt(TAU), 1.04, 1e-2) and cerca(math.sqrt(2 * TAU), 3.54, 1e-2))
comprobar('t9 teoría: tren de engranajes y poleas', 1200 * 20 / 40 == 600 and 600 * 15 / 45 == 200 and cerca(20 / 40 * 15 / 45, 1 / 6, 1e-9) and cerca(rpm(3000) * 0.050, 15.7, 1e-2) and cerca(15.708 / 0.15 * 60 / TAU, 1000, 1e-3) and 3000 * 5 / 15 == 1000)
comprobar('t9 teoría: marchas de bici', 70 * 44 / 16 == 192.5 and cerca(rpm(192.5), 20.16, 1e-3) and cerca(rpm(192.5) * 0.34, 6.85, 1e-2) and cerca(rpm(192.5) * 0.34 * 3.6, 24.7, 1e-2) and cerca(TAU * 0.34 * 44 / 16, 5.87, 1e-2) and cerca(70 * 44 / 32, 96.3, 1e-2) and cerca(70 * 44 / 32 * TAU / 60 * 0.34 * 3.6, 12.3, 1e-2) and cerca(TAU * 0.34 * 44 / 32, 2.94, 1e-2))
comprobar('t9 teoría: aplicaciones reales', rel(TAU / 3.15576e7, 1.991e-7, 1e-3) and rel(TAU / 3.15576e7 * 1.496e11, 2.979e4, 2e-3) and rel((TAU / 3.15576e7)**2 * 1.496e11, 5.93e-3, 1e-2) and rel(TAU / 3.15576e7 * 1.496e11 * 3.6, 107000, 5e-3) and cerca(9.8 / ((TAU / 3.15576e7)**2 * 1.496e11), 1650, 1e-2) and rel(TAU / 2.3606e6 * 3.844e8, 1023, 2e-3) and cerca(20 / 3.6 / 0.34, 16.34, 1e-3) and cerca((20 / 3.6 / 0.34)**2 * 0.34, 90.8, 1e-3) and cerca((20 / 3.6 / 0.34)**2 * 0.34 / 9.8, 9.3, 1e-2) and cerca(TAU / (20 / 3.6 / 0.34), 0.385, 1e-2) and cerca(rpm(500)**2 * 0.06, 164.5, 1e-3) and cerca(rpm(500)**2 * 0.06 / 9.8, 16.8, 1e-2) and cerca(TAU / 1800, 3.49e-3, 1e-2) and cerca(TAU / 1800 * 60, 0.209, 1e-2) and rel((TAU / 1800)**2 * 60, 7.3e-4, 1e-2) and cerca(20 / 100, 0.20) and cerca(20**2 / 100, 4.0))
comprobar('t9 teoría: peso aparente en el ecuador y geoestacionario', rel(w_T**2 * 6.371e6, 0.0339, 1e-2) and cerca(w_T**2 * 6.371e6 / 9.8 * 100, 0.35, 2e-2) and cerca(9.8 - w_T**2 * 6.371e6, 9.766, 1e-3) and rel(w_T * 4.2164e7, 3075, 1e-3) and cerca(w_T * 4.2164e7 * 3.6, 11070, 1e-3) and rel(w_T**2 * 4.2164e7, 0.224, 2e-3) and cerca(9.8 / (w_T**2 * 4.2164e7), 44, 1e-2))
Tr = 60 * 720 / (720 - 60); comprobar('t9 teoría: encuentros (reloj, corredores)', cerca(Tr, 65.45, 1e-3) and cerca(720 / Tr, 11, 1e-3) and cerca(12 / 11 * 60, 65.45, 1e-3) and cerca(Tr * 60 % 60, 27, 3e-2) and cerca(60 * 80 / (80 - 60), 240) and cerca(240 / 60, 4) and cerca(240 / 80, 3) and cerca(60 * 80 / (60 + 80), 34.3, 1e-2) and cerca(2 * Tr, 130.9, 1e-3) and cerca(3 * Tr, 196.36, 1e-3))
comprobar('t9 teoría: B por delante y periodos sinódicos', cerca((math.pi / 2) / (2.0 - 1.0), 1.57, 1e-2) and cerca(TAU / (2.0 - 1.0), 6.28, 1e-2) and cerca(365.25 * 687 / (687 - 365.25), 780, 1e-3) and cerca(27.32 * 365.25 / (365.25 - 27.32), 29.53, 1e-3))
comprobar('t9 teoría: del MCU al MAS', cerca(rpm(3000) * 0.040, 12.6, 1e-2) and cerca(rpm(3000)**2 * 0.040, 3948, 1e-3) and cerca(rpm(3000)**2 * 0.040 / 9.8, 403, 1e-2) and cerca(rpm(3000) * 0.040 * 3.6, 45, 1e-2) and cerca(math.pi / 2 / 1.5, 1.05, 1e-2) and cerca(TAU / 1.5, 4.19, 1e-2) and cerca(1.5 * 1.5, 2.25) and cerca(1.5 * 1.5**2, 3.375))
w_d = rpm(45); comprobar('t9 método: disco de 45 rpm', cerca(w_d, 4.712, 1e-3) and cerca(w_d * 0.30, 1.41, 1e-2) and cerca(w_d**2 * 0.30, 6.66, 1e-2) and cerca(w_d * 0.10, 0.471, 1e-2) and cerca(w_d**2 * 0.10, 2.22, 1e-2) and cerca(w_d * 2.0, 9.42, 1e-3) and cerca(w_d * 2.0 / TAU, 1.5) and cerca(w_d * 0.30 * 3.6, 5.1, 1e-2))
w1 = rpm(1500); comprobar('t9 EvAU 1: rueda de 40 cm', cerca(w1, 157.1, 1e-3) and cerca(1500 / 60, 25) and cerca(1 / 25, 0.04) and cerca(w1 * 0.20, 31.4, 1e-3) and cerca(w1 * 0.20 * 3.6, 113, 1e-2) and cerca(w1**2 * 0.20, 4935, 1e-3) and cerca(w1**2 * 0.20 / 9.8, 504, 1e-2) and cerca(w1 * 2.5, 392.7, 1e-3) and cerca(w1 * 2.5 / TAU, 62.5, 1e-9))
w2_ = TAU / 5400; comprobar('t9 EvAU 2: satélite de órbita baja', rel(w2_, 1.164e-3, 1e-3) and cerca(w2_ * 6.8e6, 7912, 1e-3) and cerca((w2_ * 6.8e6)**2 / 6.8e6, 9.21, 1e-2) and cerca((w2_ * 6.8e6)**2 / 6.8e6 / 9.8, 0.94, 1e-2) and cerca(w2_ * 6.8e6 * 3.6, 28500, 1e-2) and cerca((9.8 - (w2_ * 6.8e6)**2 / 6.8e6) / 9.8, 0.06, 5e-2))
w3_ = rpm(300); al3 = -w3_ / 12; w43 = w3_ + al3 * 4; comprobar('t9 EvAU 3: volante que frena', cerca(w3_, 31.42, 1e-3) and cerca(al3, -2.62, 1e-2) and cerca(0.5 * w3_ * 12 / TAU, 30, 1e-9) and cerca(w43, 20.94, 1e-3) and cerca(al3 * 0.5, -1.31, 1e-2) and cerca(w43**2 * 0.5, 219.3, 1e-3) and cerca(math.hypot(al3 * 0.5, w43**2 * 0.5), 219.3, 1e-3))
comprobar('t9 EvAU 4: dos puntos de un disco', cerca(TAU / 20, 0.314, 1e-2) and cerca(20 * 0.10, 2.0) and cerca(20 * 0.25, 5.0) and cerca(5.0 / 2.0, 2.5) and cerca(400 * 0.10, 40) and cerca(400 * 0.25, 100) and cerca(10 / 5.0, 2.0) and cerca(10 / (TAU * 0.25), 6.4, 1e-2))
r5 = 400 / TAU; comprobar('t9 EvAU 5: velódromo', cerca(r5, 63.66, 1e-3) and cerca(8 / r5, 0.1257, 1e-2) and cerca(6 / r5, 0.0942, 1e-2) and cerca(TAU / (8 / r5 - 6 / r5), 200, 1e-3) and cerca(TAU / (8 / r5 + 6 / r5), 28.6, 1e-2) and cerca(64 / r5, 1.01, 1e-2) and cerca(36 / r5, 0.566, 1e-2) and cerca(200 * 8 / 400, 4) and cerca(200 * 6 / 400, 3))
w6_ = 80 * 48 / 18; comprobar('t9 EvAU 6: cambio de marchas', cerca(w6_, 213.3, 1e-3) and cerca(rpm(w6_), 22.34, 1e-3) and cerca(rpm(w6_) * 0.33, 7.37, 1e-2) and cerca(rpm(w6_) * 0.33 * 3.6, 26.5, 1e-2) and cerca(rpm(w6_) * 0.33 * 300, 2211, 1e-3))
comprobar('t9 quiz: valores', math.pi == math.radians(180) and cerca(rpm(60), 6.28, 1e-2) and 1 / 0.5 == 2 and 10 * 0.20 == 2 and 10**2 / 5 == 20 and rel(TAU / 86164, 7.3e-5, 1e-2) and 0.5 * 3 * 16 == 24 and 30 * 10 / 30 == 10)
comprobar('t9 errores: números de los enunciados', cerca(300 * 0.20 * 3.6, 216, 1e-9) and cerca(rpm(300) * 0.20, 6.28, 1e-2) and cerca(rpm(300), 31.4, 1e-2) and cerca(rpm(300) * 0.20 * 3.6, 22.6, 1e-2) and 20**2 / 100 == 4 and 20 / 100 == 0.2 and cerca(math.radians(90) * 0.5, 0.785, 1e-2) and cerca(60 * 720 / (720 - 60), 65.45, 1e-3) and 0.5 * 2 * 9 == 9 and 2 * 3**2 == 18)
comprobar('t9 clasificar y emparejar existen', len(datos['ampl']['fyq1']['t9']['datos']['clas1']['items']) == 9 and len(datos['ampl']['fyq1']['t9']['datos']['emp1']['pares']) == 8)
comprobar('t9 mínimos de contenido', len(E) >= 36 and len(datos['ampl']['fyq1']['t9']['lamina']) >= 7 and len(datos['ampl']['fyq1']['t9']['nuevas']) >= 6)

# ----------------------------------------------------------------------------------------------
# TEMA 10 · DINÁMICA (las leyes de Newton)
# Las respuestas se obtienen aquí planteando y resolviendo con sympy las ecuaciones de Newton de cada
# problema (no con las fórmulas cerradas que usa la web), y se comparan con lo que acepta cada ejercicio.
# ----------------------------------------------------------------------------------------------
E10 = tema('t10')
rad = math.radians
A_, T_, N_, F_ = sp.symbols('A T N F')


def sol(eqs, *incog):
    s = sp.solve(eqs, incog, dict=True)[0]
    return [float(s[v]) for v in incog]


def op10(id_, correcta):
    c = chk(E10, id_)
    comprobar(f'{id_} opción correcta «{c["opciones"][c["ok"]]}»', c['tipo'] == 'opcion' and c['opciones'][c['ok']].startswith(correcta))


def rub10(id_, n):
    c = chk(E10, id_)
    comprobar(f'{id_} es una rúbrica con {n} criterios', c['tipo'] == 'rubrica' and len(c['items']) == n and abs(sum(i['p'] for i in c['items']) - 0.5 * n) < 1e-9)


# --- ★ básico
vals(E10, 'd1', [math.hypot(12, 5)])
vals(E10, 'd2', [sol([6 * A_ - 24], A_)[0]])
vals(E10, 'd3', [1200 * 2.5])
vals(E10, 'd4', [8 * 9.8, 8 * 3.71])
vals(E10, 'd5', [0.4 * 30 * 9.8])
op10('d6', '80 N'); op10('d7', 'sigue')
vals(E10, 'd8', [sol([2 * A_ - (10 - 4)], A_)[0]])
vals(E10, 'd9', [sol([0.5 * A_ - 2], A_)[0]])
vals(E10, 'd10', [10 * 9.8])
a_ = sol([20 * A_ - 40], A_)[0]; vals(E10, 'd11', [a_ * 5])
vals(E10, 'd12', [35 * 9.8])
# --- ★★ medio
Fx, Fy = 40 * math.cos(rad(60)), 40 * math.sin(rad(60)); vals(E10, 'd13', [Fx / 5, 5 * 9.8 - Fy])
v1, v2 = sp.Matrix([30, 0]), sp.Matrix([40 * math.cos(rad(60)), 40 * math.sin(rad(60))]); vals(E10, 'd14', [float((v1 + v2).norm())])
v1, v2 = sp.Matrix([20, 0]), sp.Matrix([20 * math.cos(rad(120)), 20 * math.sin(rad(120))]); vals(E10, 'd15', [float((v1 + v2).norm())])
a16 = sol([20**2 - 2 * A_ * 40], A_)[0]; vals(E10, 'd16', [1000 * a16, 20 / a16])
a17 = sol([1 * 9.8 * math.sin(rad(30)) - 1 * A_], A_)[0]; vals(E10, 'd17', [a17, math.sqrt(2 * a17 * 3)])
a18, N18 = sol([N_ - 9.8 * math.cos(rad(25)), 9.8 * math.sin(rad(25)) - 0.2 * N_ - A_], N_, A_)[::-1][0], 0; vals(E10, 'd18', [a18])
vals(E10, 'd19', [sol([N_ - 70 * 9.8 - 70 * 1.2], N_)[0], sol([N_ - 70 * 9.8 - 70 * (-1.2)], N_)[0]])
a20, T20 = sol([3 * 9.8 - T_ - 3 * A_, T_ - 2 * 9.8 - 2 * A_], A_, T_); vals(E10, 'd20', [a20, T20])
a21, T21 = sol([1 * 9.8 - T_ - 1 * A_, T_ - 4 * A_], A_, T_); vals(E10, 'd21', [a21, T21])
vals(E10, 'd22', [sol([2 * T_ * math.sin(rad(30)) - 6 * 9.8], T_)[0]])
a23, F23 = sol([30 - F_ - 4 * A_, F_ - 2 * A_], A_, F_); vals(E10, 'd23', [a23, F23])
I24 = 0.4 * (-15 - 10); vals(E10, 'd24', [abs(I24), abs(I24) / 0.02])
vals(E10, 'd25', [abs(sol([3 * 6 + 60 * A_], A_)[0])])
v26 = sol([2000 * 3 - 3000 * A_], A_)[0]; vals(E10, 'd26', [v26, 0.5 * 2000 * 9 - 0.5 * 3000 * v26**2])
v27 = max(sp.solve(A_**2 - 0.5 * 9.8 * 50, A_), key=float); vals(E10, 'd27', [float(v27) * 3.6])
a28 = 0.7 * 9.8; vals(E10, 'd28', [25**2 / (2 * a28)])
F29 = 0.6 * 50 * 9.8; vals(E10, 'd29', [F29, (F29 - 0.4 * 50 * 9.8) / 50])
vals(E10, 'd30', [600 / 80 - 9.8])
# --- ★★★ avanzado
N31 = 10 * 9.8 - 50 * math.sin(rad(30)); vals(E10, 'd31', [N31, sol([50 * math.cos(rad(30)) - 0.2 * N31 - 10 * A_], A_)[0]])
vals(E10, 'd32', [math.degrees(math.atan(0.45))])
vals(E10, 'd33', [sol([F_ - 98 * math.sin(rad(37)) - 0.25 * 98 * math.cos(rad(37))], F_)[0]])
a34, T34 = sol([T_ - 0.3 * 5 * 9.8 - 5 * A_, 3 * 9.8 - T_ - 3 * A_], A_, T_); vals(E10, 'd34', [a34, T34])
a35, T35 = sol([T_ - 6 * 9.8 * math.sin(rad(30)) - 6 * A_, 4 * 9.8 - T_ - 4 * A_], A_, T_); vals(E10, 'd35', [a35, T35])
a36 = sol([2.5 * 9.8 - T_ - 2.5 * A_, T_ - 1.5 * 9.8 - 1.5 * A_], A_, T_)[0]; t36 = math.sqrt(2 * 2 / a36); vals(E10, 'd36', [t36, a36 * t36])
vals(E10, 'd37', [sol([500 - A_ * 9.8 - A_ * 2], A_)[0]])
vals(E10, 'd38', [math.degrees(math.atan(20**2 / (80 * 9.8)))])
th39 = rad(10); sN = sp.symbols('V'); n_, f_ = sp.symbols('n f')
# curva peraltada con rozamiento (a punto de deslizar hacia fuera): n·cosθ − μ n·senθ = m g ; n·senθ + μ n·cosθ = m v²/r
s39 = sp.solve([n_ * math.cos(th39) - 0.5 * n_ * math.sin(th39) - 1 * 9.8, n_ * math.sin(th39) + 0.5 * n_ * math.cos(th39) - sN**2 / 100], [n_, sN], dict=True)
v39 = max(float(s[sN]) for s in s39); vals(E10, 'd39', [v39 * 3.6])
v1p, v2p = sol([3 * 4 - 3 * sp.symbols('x') - 1 * sp.symbols('y'), sp.symbols('y') - sp.symbols('x') - 4], sp.symbols('x'), sp.symbols('y')); vals(E10, 'd40', [v1p, v2p])
v41 = sol([0.02 * 300 - 4 * A_], A_)[0]; vals(E10, 'd41', [v41, v41**2 / (2 * 9.8) * 100])
v42 = abs(sol([8 * 250 + 800 * A_], A_)[0]); vals(E10, 'd42', [v42, v42**2 / (2 * 0.4 * 9.8)])
k43 = sol([80 * 9.8 - F_ * 50**2], F_)[0]; vals(E10, 'd43', [k43, (80 * 9.8 - k43 * 25**2) / 80])
T1_, T2_ = sol([-T_ * math.cos(rad(30)) + F_ * math.cos(rad(60)), T_ * math.sin(rad(30)) + F_ * math.sin(rad(60)) - 98], T_, F_); vals(E10, 'd44', [T1_, T2_])
vals(E10, 'd45', [sol([36 - 3 * 9.8 - 3 * A_], A_)[0]])
rub10('d46', 4); rub10('d47', 4); rub10('d48', 4)
# la máquina de Atwood general (d46), el plano liso (d47) y el ángulo crítico con sympy simbólico
m1s, m2s, gs, ths, mus = sp.symbols('m1 m2 g theta mu', positive=True)
sat = sp.solve([m2s * gs - T_ - m2s * A_, T_ - m1s * gs - m1s * A_], [A_, T_], dict=True)[0]
comprobar('d46 a = (m2 − m1)g/(m1 + m2)', sp.simplify(sat[A_] - (m2s - m1s) * gs / (m1s + m2s)) == 0)
comprobar('Atwood T = 2 m1 m2 g/(m1 + m2)', sp.simplify(sat[T_] - 2 * m1s * m2s * gs / (m1s + m2s)) == 0)
spl = sp.solve(sp.Eq(m1s * gs * sp.sin(ths), m1s * A_), A_)[0]
comprobar('d47 a = g sen θ sin masa', sp.simplify(spl - gs * sp.sin(ths)) == 0)
smu = sp.solve(sp.Eq(m1s * gs * sp.sin(ths) - mus * m1s * gs * sp.cos(ths), 0), mus)[0]
comprobar('ángulo crítico tan θ = μ', sp.simplify(smu - sp.tan(ths)) == 0)
comprobar('mínimos t10: ≥ 40 ejercicios y niveles', len(E10) >= 40 and sum(1 for e in E10.values() if e['nivel'] == 1) >= 10 and sum(1 for e in E10.values() if e['nivel'] == 3) >= 10 and all(e.get('pasos') for e in E10.values()))

# --- teoría del tema 10 (cada cifra de los ejemplos resueltos y de las tablas)
Rx, Ry = 40 - 20, 30; comprobar('t10 ej. tres fuerzas: 36,06 N y 56,3°', cerca(math.hypot(Rx, Ry), 36.06, 1e-3) and cerca(math.degrees(math.atan2(Ry, Rx)), 56.3, 1e-3))
R2 = math.sqrt(49 + 64 + 2 * 7 * 8 * math.cos(rad(60))); comprobar('t10 ej. teorema del coseno: 13 N y 32,2°', cerca(R2, 13) and cerca(math.degrees(math.atan2(8 * math.sin(rad(60)), 7 + 8 * math.cos(rad(60)))), 32.2, 1e-2))
comprobar('t10 ej. descomponer: 51,96 y 30', cerca(60 * math.cos(rad(30)), 51.96, 1e-3) and cerca(60 * math.sin(rad(30)), 30) and cerca(math.hypot(51.96, 30), 60, 1e-3))
comprobar('t10 teoría: 1 kgf, 100 g, 20 kg', cerca(0.1 * 9.8, 0.98) and cerca(20 * 9.8, 196))
Tcu = 49 / (2 * math.sin(rad(20))); comprobar('t10 ej. cuadro colgado: 71,6 N y 24,5 N', cerca(Tcu, 71.6, 1e-3) and cerca(49 / 2, 24.5) and cerca(2 * 0.3420, 0.6840, 1e-3) and cerca(5 * 9.8, 49))
comprobar('t10 ej. trineo: 1,8 m/s²', cerca((60 - 15) / 25, 1.8))
af = -20 / 8; comprobar('t10 ej. frenado: −2,5, −2500 N, 80 m', cerca(72 / 3.6, 20) and cerca(af, -2.5) and cerca(1000 * af, -2500) and cerca(20 * 8 + 0.5 * af * 64, 80))
comprobar('t10 ej. fuerza oblicua: 17,32, 3,46 y 39 N', cerca(20 * math.cos(rad(30)), 17.32, 1e-3) and cerca(20 * math.cos(rad(30)) / 5, 3.46, 3e-3) and cerca(5 * 9.8 - 10, 39))
a_c = 24 / 8; comprobar('t10 ej. dos bloques en contacto: 3 m/s², 9 N, 15 N', cerca(a_c, 3) and cerca(3 * a_c, 9) and cerca(24 - 9, 15) and cerca(5 * a_c, 15))
comprobar('t10 tabla g: pesos 97,2 · 222,6 · 588 · 1488 y kgf', cerca(60 * 1.62, 97.2) and cerca(60 * 3.71, 222.6) and cerca(60 * 9.8, 588) and cerca(60 * 24.8, 1488) and cerca(97.2 / 9.8, 10, 2e-2) and cerca(222.6 / 9.8, 23, 2e-2) and cerca(1488 / 9.8, 152, 2e-3) and cerca(1.62 / 9.8, 1 / 6, 1e-1) and cerca(3.71 / 9.8, 0.38, 1e-2) and cerca(24.8 / 9.8, 2.5, 2e-2))
comprobar('t10 ej. ascensor: 588, 648, 528 N, 0 y «kilos»', cerca(60 * 9.8, 588) and cerca(60 * 10.8, 648) and cerca(60 * 8.8, 528) and cerca(648 / 9.8, 66.1, 1e-3) and cerca(528 / 9.8, 53.9, 1e-3) and cerca(97.2 / 9.8, 9.9, 1e-2))
comprobar('t10 ISS: el peso es el 88 % (a 420 km)', cerca((6.371e6 / (6.371e6 + 4.2e5))**2, 0.88, 1.5e-2))
NN = 40 * 9.8; a5a = (250 - 0.35 * NN) / 40
comprobar('t10 ej. estático/cinético: 392, 196, 137,2, 2,82', cerca(NN, 392) and cerca(0.5 * NN, 196) and cerca(0.35 * NN, 137.2) and cerca(a5a, 2.82, 1e-3) and 180 < 196 < 250)
N_t, N_e = 196 - 40, 196 + 40
comprobar('t10 ej. tirar o empujar: 69,28 · 156/31,2/1,90 · 236/47,2/1,10', cerca(80 * math.cos(rad(30)), 69.28, 1e-3) and cerca(0.2 * N_t, 31.2) and cerca((69.28 - 31.2) / 20, 1.90, 1e-2) and cerca(0.2 * N_e, 47.2) and cerca((69.28 - 47.2) / 20, 1.10, 1e-2))
comprobar('t10 ej. distancia de frenado: 6,86; 65,6 m; 0,98; 459 m; ×7', cerca(0.7 * 9.8, 6.86) and cerca(900 / (2 * 6.86), 65.6, 1e-3) and cerca(0.1 * 9.8, 0.98) and cerca(900 / (2 * 0.98), 459, 1e-3) and cerca(459 / 65.6, 7, 1e-2) and cerca(108 / 3.6, 30))
am = (19.6 - 9.8) / 6; comprobar('t10 método: 39,2; 9,8; 1,63; 16,33', cerca(4 * 9.8, 39.2) and cerca(0.25 * 39.2, 9.8) and cerca(am, 1.63, 1e-2) and cerca(19.6 - 2 * am, 16.33, 1e-3) and cerca(9.8 + 4 * am, 16.33, 1e-3) and cerca(2 * 9.8, 19.6))
ap = 9.8 * math.sin(rad(30)); comprobar('t10 plano liso: 84,87; 4,9; 1,56 s; 7,67 m/s', cerca(98 * math.cos(rad(30)), 84.87, 1e-3) and cerca(ap, 4.9) and cerca(math.sqrt(12 / 4.9), 1.56, 1e-2) and cerca(4.9 * math.sqrt(12 / 4.9), 7.67, 1e-3) and cerca(math.sqrt(2 * 4.9 * 6), 7.67, 1e-3))
comprobar('t10 plano con rozamiento: 21,2 N; 27,8; 2,78', cerca(0.25 * 84.87, 21.2, 1e-2) and cerca(49 - 21.2, 27.8, 1e-2) and cerca(27.8 / 10, 2.78, 1e-2) and cerca(9.8 * (0.5 - 0.25 * math.cos(rad(30))), 2.78, 1e-3))
Pp = 196 * math.sin(rad(20)); Nn = 196 * math.cos(rad(20)); Fr = 0.15 * Nn
comprobar('t10 rampa: 67,04; 184,18; 27,63; 94,7 N; 104,7 N', cerca(Pp, 67.04, 1e-3) and cerca(Nn, 184.18, 1e-3) and cerca(Fr, 27.63, 1e-3) and cerca(Pp + Fr, 94.7, 1e-3) and cerca(Pp + Fr + 10, 104.7, 1e-3))
comprobar('t10 ángulo crítico: tan 31° = 0,60', cerca(math.tan(rad(31)), 0.60, 1e-2))
comprobar('t10 tabla del plano: cos 30°, sen 45°', cerca(math.cos(rad(30)), 0.866, 1e-3) and cerca(math.sin(rad(45)), 0.707, 1e-3))
comprobar('t10 Atwood 3 y 5 kg: 2,45; 36,75; 29,4; 49; 29,4 < T < 49', cerca(2 * 9.8 / 8, 2.45) and cerca(29.4 + 3 * 2.45, 36.75) and cerca(49 - 5 * 2.45, 36.75) and cerca(2 * 15 * 9.8 / 8, 36.75) and 29.4 < 36.75 < 49)
a_m = (19.6 - 11.76) / 8; comprobar('t10 mesa y colgante: 11,76; 19,6; 0,98; 17,64', cerca(0.2 * 58.8, 11.76) and cerca(a_m, 0.98) and cerca(19.6 - 2 * a_m, 17.64) and 19.6 > 11.76)
a_t = 60000 / 70000; comprobar('t10 tren: 0,857; 25 714; 8571; 34 286', cerca(a_t, 0.857, 1e-3) and cerca(30000 * a_t, 25714, 1e-3) and cerca(10000 * a_t, 8571, 1e-3) and cerca(60000 - 25714, 34286, 1e-3) and cerca(40000 * a_t, 34286, 1e-3))
comprobar('t10 piedra en horizontal: 10 N y 40 N', cerca(0.5 * 16 / 0.8, 10) and cerca(0.5 * 32**0 * 64 / 0.8, 40))
comprobar('t10 curva plana: 17,1 m/s; 61,7 km/h; hielo 7 m/s, 25 km/h', cerca(math.sqrt(0.6 * 9.8 * 50), 17.1, 1e-2) and cerca(math.sqrt(0.6 * 9.8 * 50) * 3.6, 61.7, 1e-3) and cerca(math.sqrt(0.1 * 9.8 * 50), 7, 1e-2) and cerca(7 * 3.6, 25, 1e-2))
comprobar('t10 peralte 100 m, 72 km/h: 0,408 y 22,2°', cerca(400 / 980, 0.408, 1e-2) and cerca(math.degrees(math.atan(400 / 980)), 22.2, 1e-2))
comprobar('t10 puente y valle: 7300, 12 300, 19,8 m/s', cerca(1000 * (9.8 - 2.5), 7300) and cerca(1000 * (9.8 + 2.5), 12300) and cerca(math.sqrt(9.8 * 40), 19.8, 1e-2) and cerca(10**2 / 40, 2.5))
comprobar('t10 pelota: −6 N·s, 600 N, ×400 el peso', cerca(0.15 * (-20 - 20), -6) and cerca(6 / 0.01, 600) and cerca(600 / (0.15 * 9.8), 408, 1e-2))
comprobar('t10 retroceso del astronauta: −0,2 m/s', cerca(-3 * 6 / 90, -0.2))
vf = (1000 * 20 + 4000 * 10) / 5000; comprobar('t10 choque coche-camión: 12 m/s y 40 000 J', cerca(vf, 12) and cerca(0.5 * 1000 * 400 + 0.5 * 4000 * 100, 400000) and cerca(0.5 * 5000 * vf**2, 360000) and cerca(400000 - 360000, 40000))
comprobar('t10 choque elástico 2 kg y 3 kg: −1 y 4 m/s; 25 J', cerca((2 - 3) * 5 / 5, -1) and cerca(2 * 2 * 5 / 5, 4) and cerca(2 * 5, 10) and cerca(2 * -1 + 3 * 4, 10) and cerca(0.5 * 2 * 25, 25) and cerca(0.5 * 2 * 1 + 0.5 * 3 * 16, 25))
kk = 80 * 9.8 / 55**2; comprobar('t10 paracaidista: k 0,259; 21,8; ×84; 162 N; 7,8 m/s²', cerca(kk, 0.259, 1e-2) and cerca(784 / 36, 21.8, 1e-2) and cerca(784 / 36 / kk, 84, 1e-2) and cerca(kk * 625, 162, 1e-2) and cerca((784 - kk * 625) / 80, 7.8, 1e-2))
comprobar('t10 gota: 200 m/s sin aire desde 2 km', cerca(math.sqrt(2 * 9.8 * 2000), 198, 3e-3))
# problemas tipo PAU
a1 = 9.8 * (0.5 + 0.2 * math.cos(rad(30))); d1_ = 64 / (2 * a1); a1b = 9.8 * (0.5 - 0.2 * math.cos(rad(30)))
comprobar('t10 PAU 1: 6,60; 4,85 m; 3,20; 5,57 m/s; tan 30° > μ', cerca(a1, 6.60, 1e-2) and cerca(d1_, 4.85, 1e-2) and cerca(a1b, 3.20, 1e-2) and cerca(math.sqrt(2 * a1b * d1_), 5.57, 1e-2) and math.tan(rad(30)) > 0.2 and cerca(0.5 + 0.2 * math.cos(rad(30)), 0.6732, 1e-3) and cerca(0.5 - 0.1732, 0.3268, 1e-3))
s37, c37 = math.sin(rad(37)), math.cos(rad(37)); Pp2 = 8 * 9.8 * s37; Fr2 = 0.3 * 8 * 9.8 * c37
a2_, T2b = sol([98 - T_ - 10 * A_, T_ - Pp2 - Fr2 - 8 * A_], A_, T_)
comprobar('t10 PAU 2: 47,18; 18,79; 65,97 N; m₂ > 6,73 kg; 1,78 m/s²; 80,2 N', cerca(s37, 0.6018, 1e-3) and cerca(c37, 0.7986, 1e-3) and cerca(Pp2, 47.18, 1e-3) and cerca(Fr2, 18.79, 1e-3) and cerca(Pp2 + Fr2, 65.97, 1e-3) and cerca((Pp2 + Fr2) / 9.8, 6.73, 1e-3) and cerca(a2_, 1.78, 1e-2) and cerca(T2b, 80.2, 1e-3))
comprobar('t10 PAU 3: 7910 N; 791 N; 80,7 kg; 2 s; 3 m; 6860 N', cerca(700 * 11.3, 7910) and cerca(70 * 11.3, 791) and cerca(791 / 9.8, 80.7, 1e-3) and cerca(3 / 1.5, 2) and cerca(0.5 * 1.5 * 4, 3) and cerca(700 * 9.8, 6860))
comprobar('t10 PAU 4: 123 km/h; 23,0°; 5000 N; 9408 N; 53 %', cerca(math.sqrt(0.8 * 9.8 * 150), 34.29, 1e-3) and cerca(math.sqrt(0.8 * 9.8 * 150) * 3.6, 123, 1e-2) and cerca(math.degrees(math.atan(625 / (150 * 9.8))), 23.0, 2e-3) and cerca(1200 * 625 / 150, 5000) and cerca(0.8 * 1200 * 9.8, 9408) and cerca(5000 / 9408, 0.53, 1e-2) and cerca(90 / 3.6, 25))
vv = 12 / 6; comprobar('t10 PAU 5: 2 m/s; 24 J; 0,816 m; 12 J', cerca(vv, 2) and cerca(0.5 * 2 * 36 - 0.5 * 6 * 4, 24) and cerca(24 / 36, 2 / 3, 1e-2) and cerca(vv**2 / (2 * 0.25 * 9.8), 0.816, 1e-2) and cerca(0.25 * 6 * 9.8 * 0.816, 12, 1e-2))
a6_ = (60 - 0.2 * 8 * 9.8) / 8; comprobar('t10 PAU 6: 15,68 N; 5,54 m/s²; 22,5 N; 27,7 N', cerca(0.2 * 49, 9.8) and cerca(0.2 * 29.4, 5.88) and cerca(15.68, 9.8 + 5.88) and cerca(a6_, 5.54, 1e-3) and cerca(3 * a6_ + 5.88, 22.5, 1e-2) and cerca(60 - 22.5 - 9.8, 27.7, 1e-2) and cerca(5 * a6_, 27.7, 1e-2))
# actividades y errores
comprobar('t10 errores: números de los enunciados', cerca(98 * math.cos(rad(30)), 84.9, 1e-3) and cerca(2 * 3 * 5 * 9.8 / 8, 36.75) and cerca(3 * 3, 9) and cerca(24 / 8, 3))
comprobar('t10 test: 113 N, 10 N, 15 N', cerca(70 * 1.62, 113.4, 1e-2) and cerca(math.hypot(6, 8), 10) and cerca(0.3 * 5 * 10, 15) and cerca((2 * 1)**2, 4))
dd = datos['ampl']['fyq1']['t10']
comprobar('t10 actividades: errores, test, tarjetas, parejas, clasificaciones, orden', len(dd['datos']['errores']['preguntas']) >= 10 and len(dd['datos']['quiz1']['preguntas']) >= 12 and len(dd['datos']['tj1']['cartas']) >= 14 and len(dd['datos']['emp1']['pares']) >= 7 and len(dd['datos']['cla1']['items']) >= 9 and len(dd['datos']['orden1']['items']) >= 6)
comprobar('t10 mínimos: lámina ≥ 8 y secciones nuevas ≥ 9', len(dd['lamina']) >= 8 and len(dd['nuevas']) >= 9)

print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f_ in fallos: print('  FALLO:', f_)
sys.exit(1 if fallos else 0)
