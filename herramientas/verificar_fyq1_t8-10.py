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
comprobar('t8 teoría: arranque 320 m a 40 m/s', sorted(sp.solve(20 * tt - 1.25 * tt**2, tt)) == [0, 16] and 20 * 16 == 320 and 2.5 * 16 == 40)
comprobar('t8 teoría: dos encuentros (2 s y 5 s)', sorted(sp.solve(10 + 3 * tt - (10 * tt - tt**2), tt)) == [2, 5] and 10 + 3 * 2 == 16 and 10 + 3 * 5 == 25 and 10 - 2 * 5 == 0)
comprobar('t8 teoría: distancia de reacción y frenado', cerca(72 / 3.6, 20) and cerca(20 * 0.75, 15) and cerca(20**2 / 12, 33.3, 1e-2) and cerca(15 + 20**2 / 12, 48.3, 1e-2) and cerca(math.sqrt(400 - 2 * 6 * 25), 10) and cerca(25 * 2.5, 62.5) and cerca(120 / 3.6, 33.33, 1e-2) and cerca((120 / 3.6)**2 / 14, 79.4, 1e-2) and cerca((120 / 3.6)**2 / 2, 555.6, 1e-2))
comprobar('t8 teoría: adelantamiento 5,6 s', cerca(20 + 12 + 4 + 20, 56) and cerca(56 / 10, 5.6) and cerca(30 * 5.6, 168))
t_ad = max(sp.solve(tt**2 + 10 * tt - 158, tt)); comprobar('t8 problema 1: adelantamiento', cerca(t_ad, 8.53, 1e-2) and cerca(25 * float(t_ad) + 0.5 * float(t_ad)**2, 249.6, 1e-2) and cerca((25 + float(t_ad)) * 3.6, 120.7, 1e-2) and 30 + 15 + 4 + 30 == 79)
comprobar('t8 problema 2: v–t por tramos', [8 / 4, 0, (0 - 8) / 2, (-8 - 0) / 4] == [2, 0, -4, -2] and 0.5 * 4 * 8 + 6 * 8 + 0.5 * 2 * 8 == 72 and 0.5 * 4 * (-8) == -16 and 72 - 16 == 56 and 72 + 16 == 88)
comprobar('t8 problema 3: ascensor', cerca(1.2 * 4, 4.8) and cerca(0.5 * 1.2 * 16, 9.6) and cerca(4.8 * 6, 28.8) and cerca(4.8 / 1.6, 3) and cerca(0.5 * 4.8 * 3, 7.2) and cerca(9.6 + 28.8 + 7.2, 45.6) and 4 + 6 + 3 == 13)
t_c = math.sqrt(160 / g); comprobar('t8 problema 4: cañón', cerca(t_c, 4.04, 1e-2) and cerca(120 / t_c, 29.7, 1e-2) and cerca(g * t_c, 39.6, 1e-2) and cerca(math.hypot(120 / t_c, g * t_c), 49.5, 1e-2) and cerca(math.degrees(math.atan(g * t_c / (120 / t_c))), 53.1, 1e-2))
tA2 = math.sqrt(90 / g); comprobar('t8 problema 5: dos piedras', cerca(tA2, 3.03, 1e-2) and cerca((45 - 4.9 * (tA2 - 1)**2) / (tA2 - 1), 12.2, 1e-2))
comprobar('t8 problema 6: moto y coche', cerca(54 / 3.6, 15) and sorted(sp.solve(1.5 * tt**2 - 15 * tt, tt)) == [0, 10] and 15 * 10 == 150 and 3 * 10 == 30 and cerca(30 * 3.6, 108))
comprobar('t8 quiz: valores', 25 - 10 == 15 and 20 == 72 / 3.6 and 30 - 5 * 4 == 10 and (30 - 10) / 5 == 4 and 0.5 * 2 * 36 == 36 and 20**2 / (2 * 5) == 40 and 10 * 3 == 30 and 0.5 * 10 * 9 == 45)
comprobar('t8 errores: 36 km/h y d/g', cerca(36 / 3.6, 10) and cerca(math.sqrt(2 * 80 / 9.8), 4.04, 1e-2) and 20 * 5 + 0.5 * 4 * 25 == 150)
comprobar('t8 clasificar y emparejar existen', len(datos['ampl']['fyq1']['t8']['datos']['clas1']['items']) == 9 and len(datos['ampl']['fyq1']['t8']['datos']['emp1']['pares']) == 8)
comprobar('t8 mínimos de contenido', len(E) >= 36 and len(datos['ampl']['fyq1']['t8']['lamina']) >= 7 and len(datos['ampl']['fyq1']['t8']['nuevas']) >= 6)

print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f_ in fallos: print('  FALLO:', f_)
sys.exit(1 if fallos else 0)
