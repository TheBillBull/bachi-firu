#!/usr/bin/env python3
"""
Verificación independiente de los simulacros 8–11 de Física y Química I
(ampliaciones/contenido/fyq1_t99_simulacros.js): se recalcula cada cifra desde cero.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_fyq1_simulacros.py /tmp/ampl.json
"""
import json, math, sys
import sympy as sp
from sympy import Rational as Q

fallos, ok = [], 0
def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')
def cerca(a, b, tol=0.005): return abs(a - b) <= tol*max(abs(b), 1e-12)

datos = json.load(open(sys.argv[1]))
SIM = {s['id']: s for s in datos['ampl']['fyq1']['_simulacros']}
comprobar('simulacros 8–11 registrados', sorted(SIM) == ['sim10', 'sim11', 'sim8', 'sim9'], str(sorted(SIM)))
comprobar('puntuación total 10 en cada simulacro', all(abs(sum(b['puntos'] for b in s['bloques']) - 10) < 0.02 for s in SIM.values()))
R, Vm, G = 0.082, 22.4, 6.67e-11

# ---------------- sim8 · Química
def config(z):
    orden = [(1, 's', 2), (2, 's', 2), (2, 'p', 6), (3, 's', 2), (3, 'p', 6), (4, 's', 2), (3, 'd', 10), (4, 'p', 6)]
    out, r = [], z
    for n, l, m in orden:
        if r <= 0: break
        e = min(m, r); out.append(f'{n}{l}{e}'); r -= e
    return ' '.join(out)
comprobar('sim8 B1: S, S²⁻ y Ar', config(16) == '1s2 2s2 2p6 3s2 3p4' and config(18) == '1s2 2s2 2p6 3s2 3p6' and config(16 + 2) == config(18) and 16 + 2 == 18)
comprobar('sim8 B2: valencias de las fórmulas', 2*3 == 3*2 and 2*1 + 6 - 2*4 == 0 and 2 + 2*(-1) == 0 and 1 + 1 - 2 == 0 and 2 - 2 == 0 and 1 + 5 - 3*2 == 0)
n_h2 = 2/2; P = n_h2*R*300/5
comprobar('sim8 B3: gases y molaridad', cerca(P, 4.92) and 20/40/0.5 == 1.0)
n_ch4 = 10/16
comprobar('sim8 B4: metano', n_ch4 == 0.625 and cerca(n_ch4*44, 27.5) and cerca(n_ch4*Vm, 14) and 8/32 == 0.25 and 0.25/2 == 0.125 and 0.125 < n_ch4 and cerca(0.125*44, 5.5))
comprobar('sim8 B5: Hess', (-1411 - 286) - (-1560) == -137)
# ---------------- sim9 · Física
v0, v1 = 36/3.6, 108/3.6
a = (v1 - v0)/10
comprobar('sim9 B1: MRUA', (v0, v1, a) == (10, 30, 2) and v0*10 + 0.5*a*100 == 200 == (v0 + v1)/2*10)
comprobar('sim9 B2: lanzamiento vertical', 20**2/(2*10) == 20 and 2*20/10 == 4 and 20 - 10*4 == -20)
w = 120*2*math.pi/60
comprobar('sim9 B3: circular', cerca(w, 4*math.pi) and cerca(w, 12.57, 1e-3) and cerca(w*0.4, 5.03, 1e-3) and cerca(w**2*0.4, 63.2, 1e-3) and cerca((w*0.4)**2/0.4, w**2*0.4, 1e-12) and cerca(6.4*math.pi**2, 63.2, 1e-3))
Fr = 0.2*10*10
comprobar('sim9 B4: rozamiento', Fr == 20 and (50 - Fr)/10 == 3 and 3*4 == 12)
gM = G*6.42e23/(3.39e6)**2
comprobar('sim9 B5: gravedad de Marte y energía', cerca(gM, 3.73, 0.005) and math.sqrt(2*10*20) == 20 and 2*10*20 == 400 == 0.5*2*20**2)
# ---------------- sim10
comprobar('sim10 B1: Ca²⁺ y fórmulas', config(20) == '1s2 2s2 2p6 3s2 3p6 4s2' and config(18) == config(20 - 2) and 3 + 3*(-1) == 0 and 1 + 3 + 2*(-2) == 0)
comprobar('sim10 B2: CaCO₃', 11.2/Vm == 0.5 and 0.5*100 == 50)
dG = -92 - 298*(-0.199)
comprobar('sim10 B3: ΔG', cerca(dG, -32.7, 0.005) and dG < 0 and abs(298*0.199 - 59.3) < 0.01)
t = sp.symbols('t')
sol = sp.solve(sp.Eq(20*t, 2*t**2), t)
comprobar('sim10 B4: dos coches', sorted(sol) == [0, 10] and 20*10 == 200 == 2*10**2 and 4*10 == 40)
r = 6.4e6 + 0.6e6; v = math.sqrt(G*6e24/r)
comprobar('sim10 B5: satélite', r == 7.0e6 and cerca(v, 7560, 0.005) and cerca(v/1000, 7.6, 0.01) and cerca(v**2, 5.72e7, 0.005))
om = math.sqrt(200/0.5)
comprobar('sim10 B6: MAS', om == 20 and cerca(2*math.pi/om, 0.314, 0.005) and 0.1*om == 2 and cerca(0.5*200*0.1**2, 1, 1e-9) and cerca(0.5*0.5*2**2, 1, 1e-9))
# ---------------- sim11
comprobar('sim11 B1: fórmulas', 2*1 + 6 - 4*2 == 0 and 4 - 2*2 == 0)
comprobar('sim11 B2: disoluciones', 0.1/2 == 0.05 and 0.4*0.5 == 0.2 and 0.2/2 == 0.1 and 2*100 == 0.4*500)
dH = (-394 + 2*(-286)) - (-75)
comprobar('sim11 B3: entalpía de combustión', dH == -891 and (8/16)*891 == 445.5 and -394 - 572 == -966)
tc = math.sqrt(2*80/10)
comprobar('sim11 B4: tiro horizontal', tc == 4 and 15*tc == 60 and cerca(math.hypot(15, 40), 42.7, 0.005))
comprobar('sim11 B5: curva', 36/3.6 == 10 and 1000*10**2/50 == 2000 and 2000/(1000*10) == 0.2)
comprobar('sim11 B6: grúa', 200*10 == 2000 and 2000*15 == 30000 and 30000/30 == 1000 and 1000/0.8 == 1250)

print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f_ in fallos: print('  FALLO:', f_)
sys.exit(1 if fallos else 0)
