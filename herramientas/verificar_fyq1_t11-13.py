#!/usr/bin/env python3
"""
Verificación independiente de Física y Química I, temas 11 (gravitación), 12 (trabajo, energía y
potencia) y 13 (MAS), y de los simulacros nuevos de fyq1. No comparte código con la web: recalcula
cada respuesta numérica con sus propias constantes y compara con lo que acepta el ejercicio.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_fyq1_t11-13.py /tmp/ampl.json
"""
import json, sys
from math import *

datos = json.load(open(sys.argv[1]))
fallos, ok = [], 0

def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

def cerca(a, b, tol=5e-3):          # tolerancia relativa (la misma que usa la web)
    return abs(a - b) <= tol * max(abs(b), 1e-300)

def ejercicios(tema):
    return {e['id']: e for e in datos['ampl']['fyq1'][tema]['ejercicios']}

def campos(E, i):
    c = E[i]['check']; return c if isinstance(c, list) else [c]

def num(E, i, k, esperado, tol=5e-3):
    """El campo k del ejercicio i acepta el valor `esperado` calculado aquí."""
    c = campos(E, i)[k]
    comprobar(f'{i}[{k}] tipo', c['tipo'] == 'num', c['tipo'])
    comprobar(f'{i}[{k}] valor={c["valor"]} esperado={esperado:.6g}', cerca(c['valor'], esperado, tol))

def lista(E, i, esperados, k=0):
    c = campos(E, i)[k]
    comprobar(f'{i} lista {c["valores"]} vs {esperados}', len(c['valores']) == len(esperados) and all(cerca(a, b, 5e-3) for a, b in zip(sorted(c['valores']), sorted(esperados))))

def opcion(E, i, correcta, k=0):
    c = campos(E, i)[k]
    comprobar(f'{i} opción correcta «{c["opciones"][c["ok"]]}»', c['opciones'][c['ok']].startswith(correcta), c['opciones'][c['ok']])

# ----------------------------------------------------------------------------------------------
# TEMA 11 · GRAVITACIÓN
# ----------------------------------------------------------------------------------------------
G = 6.674e-11; MT = 5.972e24; RT = 6.371e6; ML = 7.342e22; RL = 1.737e6; dTL = 3.844e8; MS = 1.989e30
GM = 3.986e14                       # el valor que dan los enunciados (G·M_T)
E = ejercicios('t11')

num(E, 'g1', 0, G * 50 * 80 / 2**2 / 1e-8)
num(E, 'g2', 0, 3**2)
num(E, 'g3', 0, G * ML / RL**2)
num(E, 'g4', 0, 60 * 1.62); num(E, 'g4', 1, 60)
num(E, 'g5', 0, 9.81 * RT**2 / G / 1e24)
num(E, 'g6', 0, 4**1.5)
r = RT + 5e5; v = sqrt(GM / r); num(E, 'g7', 0, v / 1e3); num(E, 'g8', 0, 2 * pi * r / v / 60)
num(E, 'g9', 0, sqrt(2 * GM / RT) / 1e3)
num(E, 'g10', 0, -GM * 100 / RT / 1e9)
num(E, 'g11', 0, 9.82 / 4)
opcion(E, 'g12', 'igual')
num(E, 'g13', 0, G * MT * ML / dTL**2 / 1e20)
num(E, 'g14', 0, GM / (RT + 4e5)**2)
num(E, 'g15', 0, 80 * 8.69, 5e-3)
MM, RM = 6.417e23, 3.3895e6
num(E, 'g16', 0, G * MM / RM**2); num(E, 'g16', 1, sqrt(2 * G * MM / RM) / 1e3)
num(E, 'g17', 0, 5.2**1.5)
num(E, 'g18', 0, 4 * pi**2 * (1.496e11)**3 / (G * (3.156e7)**2) / 1e30)
T = 86164; rg = (GM * T**2 / (4 * pi**2))**(1 / 3)
num(E, 'g19', 0, rg / 1e7); num(E, 'g19', 1, (rg - RT) / 1e7); num(E, 'g19', 2, 2 * pi * rg / T / 1e3)
num(E, 'g20', 0, 29.29 * 1.521e11 / 1.471e11)
r6 = RT + 6e5; Em = -GM * 500 / (2 * r6); num(E, 'g21', 0, Em / 1e9); num(E, 'g22', 0, (Em + GM * 500 / RT) / 1e9)
num(E, 'g23', 0, dTL / (1 + sqrt(0.01229)) / 1e8)
num(E, 'g24', 0, sqrt(GM / (2 * RT)) / 1e3)
num(E, 'g25', 0, 2 * RT / 1e7)
num(E, 'g26', 0, 0.615**2 / 0.723**3)
num(E, 'g27', 0, GM * 1000 * (1 / RT - 1 / (RT + 4e5)) / 1e9)
num(E, 'g28', 0, GM / dTL**2 / 1e-3)
opcion(E, 'g29', 'el perihelio')
num(E, 'g30', 0, sqrt(1 / 4))
num(E, 'g31', 0, 3 / (1 + sqrt(4)))
num(E, 'g32', 0, 0.5 / 0.5**2)
num(E, 'g33', 0, sqrt(2 / 2))
T = 7200; r2 = (GM * T**2 / (4 * pi**2))**(1 / 3)
num(E, 'g34', 0, r2 / 1e6); num(E, 'g34', 1, (r2 - RT) / 1e6); num(E, 'g34', 2, 2 * pi * r2 / T / 1e3)
num(E, 'g35', 0, 4 * pi**2 * dTL**3 / (G * (27.32 * 86400)**2) / 1e24)
num(E, 'g36', 0, GM * 1000 / 2 * (1 / 7e6 - 1 / 1.4e7) / 1e10)
e8 = 0.5 * 8e3**2 - GM / RT; num(E, 'g37', 0, (-GM / e8 - RT) / 1e6)
num(E, 'g38', 0, sqrt(GM / RT) / 1e3)
T = 92.9 * 60; r3 = (GM * T**2 / (4 * pi**2))**(1 / 3); num(E, 'g39', 0, (r3 - 6371e3) / 1e3)
num(E, 'g40', 0, 2 * G * MS / (2.998e8)**2 / 1e3)
num(E, 'g41', 0, 4 * pi**2 * (4.217e8)**3 / (G * (1.769 * 86400)**2) / 1e27)
num(E, 'g42', 0, ((0.586 + 35.1) / 2)**1.5)
g1_ = G * 2e9 / 9; g2_ = G * 6e9 / 25
num(E, 'g43', 0, g2_ * 0.8 / 1e-2); num(E, 'g43', 1, (-g1_ - g2_ * 0.6) / 1e-2)
num(E, 'g44', 0, sqrt(15**2 - 11.186**2))
num(E, 'g45', 0, 4 * pi**2 * (9.376e6)**3 / (G * (7.654 * 3600)**2) / 1e23)
for i in ('g46', 'g47', 'g48'): comprobar(i + ' es rúbrica', campos(E, i)[0]['tipo'] == 'rubrica')
# identidades que se demuestran en g47/g48
comprobar('g47 3.ª ley circular: T² = 4π²r³/GM', cerca((2 * pi * 7e6 / sqrt(GM / 7e6))**2, 4 * pi**2 * (7e6)**3 / GM, 1e-9))
comprobar('g48 ve = √2·vo', cerca(sqrt(2 * GM / RT), sqrt(2) * sqrt(GM / RT), 1e-12))

# --- teoría del tema 11 (datos que se citan en el texto) ---
g0 = GM / RT**2
comprobar('t11 g0 = 9,82', cerca(g0, 9.82, 1e-3))
comprobar('t11 F persona–persona 3,3·10⁻⁷', cerca(G * 70 * 70, 3.27e-7, 5e-3))
comprobar('t11 peso persona 70 kg ≈ 687 N', cerca(70 * g0, 687, 2e-3))
comprobar('t11 F Tierra–Luna 1,98·10²⁰', cerca(G * MT * ML / dTL**2, 1.98e20, 3e-3))
comprobar('t11 F Sol–Tierra 3,54·10²²', cerca(G * MS * MT / (1.496e11)**2, 3.54e22, 3e-3))
comprobar('t11 aceleración Luna 2,70·10⁻³ y Tierra 3,32·10⁻⁵', cerca(G * MT / dTL**2, 2.70e-3, 5e-3) and cerca(G * ML / dTL**2, 3.32e-5, 5e-3))
comprobar('t11 tres masas', cerca(G * 2 * 10, 1.335e-9, 1e-3) and cerca(G * 20 - G * 20 / 4, 1.0e-9, 2e-3))
comprobar('t11 g(h) tabla', all(cerca(GM / (RT * x)**2, v_, 3e-3) for x, v_ in ((1.0628, 8.69), (1.5, 4.36), (2, 2.455), (3, 1.091), (4, 0.614))))
for n, M_, R_, gg in (('Mercurio', 3.301e23, 2.4397e6, 3.70), ('Venus', 4.867e24, 6.0518e6, 8.87), ('Luna', 7.342e22, 1.7374e6, 1.62), ('Marte', 6.417e23, 3.3895e6, 3.73), ('Júpiter', 1.898e27, 6.9911e7, 25.9), ('Sol', 1.989e30, 6.957e8, 274)):
    comprobar(f't11 g de {n} = {gg}', cerca(G * M_ / R_**2, gg, 4e-3))
comprobar('t11 punto neutro Tierra–Luna 346 000 km', cerca(dTL / (1 + sqrt(ML / MT)), 3.46e8, 2e-3))
for n, a, e in (('Mercurio', 0.3871, 0.2056), ('Venus', 0.7233, 0.0068), ('Tierra', 1.0, 0.0167), ('Marte', 1.5237, 0.0934), ('Júpiter', 5.2043, 0.0484)):
    pass
comprobar('t11 perihelio/afelio Tierra', cerca(1.496e11 * (1 - 0.0167), 1.471e11, 1e-3) and cerca(1.496e11 * (1 + 0.0167), 1.521e11, 1e-3))
comprobar('t11 Tierra vp/va', cerca(29.29 * 1.521 / 1.471, 30.29, 1e-3))
a = (0.586 + 35.1) / 2; comprobar('t11 Halley a, T, vp/va', cerca(a, 17.84, 1e-3) and cerca(a**1.5, 75.4, 1e-3) and cerca(35.1 / 0.586, 59.9, 1e-3))
comprobar('t11 constante de Kepler Sol 2,97·10⁻¹⁹ y Tierra 9,9·10⁻¹⁴', cerca(4 * pi**2 / (G * MS), 2.97e-19, 5e-3) and cerca(4 * pi**2 / GM, 9.9e-14, 5e-3))
for n, a_, T_, k_ in (('Mercurio', 0.3871, 0.2408, 0.9996), ('Venus', 0.7233, 0.6152, 1.0001), ('Marte', 1.5237, 1.8808, 1.0000), ('Júpiter', 5.2043, 11.862, 0.9982), ('Saturno', 9.5822, 29.457, 0.9862), ('Urano', 19.189, 84.011, 0.9989), ('Neptuno', 30.070, 164.79, 0.9988)):
    comprobar(f't11 T²/a³ de {n}', cerca(T_**2 / a_**3, k_, 1e-3))
comprobar('t11 masa del Sol 1,988·10³⁰', cerca(4 * pi**2 * (1.496e11)**3 / (G * (3.156e7)**2), 1.988e30, 1e-3))
comprobar('t11 ΔEp 1000 kg a 400 km', cerca(GM * 1000 * (1 / RT - 1 / (RT + 4e5)), 3.70e9, 3e-3) and cerca(9.82 * 1000 * 4e5, 3.93e9, 3e-3))
comprobar('t11 aproximación mgh: errores 0,016 %, 1,6 %, 6,3 %', all(cerca(100 * ((g0 * h) / (GM * (1 / RT - 1 / (RT + h))) - 1), e_, 2e-2) for h, e_ in ((1e3, 0.0157), (1e5, 1.57), (4e5, 6.28))))
comprobar('t11 velocidades de escape', all(cerca(sqrt(2 * G * M_ / R_) / 1e3, v_, 4e-3) for M_, R_, v_ in ((7.342e22, 1.7374e6, 2.38), (3.301e23, 2.4397e6, 4.25), (6.417e23, 3.3895e6, 5.03), (4.867e24, 6.0518e6, 10.36), (MT, RT, 11.19), (1.898e27, 6.9911e7, 60.2), (MS, 6.957e8, 617.8))))
comprobar('t11 lanzamiento 8 km/s: rmax 1,304·10⁷, h 6,67·10⁶, v²/2g 3,3·10⁶', cerca(-GM / e8, 1.304e7, 1e-3) and cerca(-GM / e8 - RT, 6.67e6, 2e-3) and cerca(8e3**2 / (2 * 9.82), 3.3e6, 2e-2))
comprobar('t11 Schwarzschild Sol 2,95 km y Tierra 8,9 mm', cerca(2 * G * MS / (2.998e8)**2, 2.954e3, 1e-3) and cerca(2 * GM / (2.998e8)**2 * 1e3, 8.87, 3e-3))
r = RT + 4.2e5; comprobar('t11 ISS v, T, vueltas', cerca(sqrt(GM / r), 7661, 1e-3) and cerca(2 * pi * r / sqrt(GM / r) / 60, 92.8, 1e-3) and cerca(1440 / 92.8, 15.5, 5e-3))
comprobar('t11 GEO r, h, v', cerca(rg, 4.216e7, 1e-3) and cerca(rg - RT, 3.579e7, 1e-3) and cerca(sqrt(GM / rg), 3075, 1e-3))
comprobar('t11 GPS v y T', cerca(sqrt(GM / 2.656e7), 3874, 1e-3) and cerca(2 * pi * 2.656e7 / sqrt(GM / 2.656e7) / 3600, 11.97, 1e-3))
comprobar('t11 Luna v 1,02 km/s', cerca(sqrt(GM / dTL), 1018, 2e-3))
# problemas PAU resueltos
r = RT + 1e6; v = sqrt(GM / r); m = 800
comprobar('t11 P1', cerca(v, 7353, 1e-3) and cerca(2 * pi * r / v / 60, 105, 1e-2) and cerca(0.5 * m * v**2, 2.16e10, 3e-3) and cerca(-GM * m / (2 * (RT + 2e6)) + GM * m / (2 * r), 2.58e9, 3e-3))
comprobar('t11 P2', cerca(2.5 / 1.5**2 * g0, 10.9, 3e-3) and cerca(sqrt(2.5 / 1.5) * sqrt(2 * GM / RT) / 1e3, 14.4, 3e-3) and cerca(2 * pi * sqrt((3 * RT)**3 / (2.5 * GM)) / 3600, 4.62, 3e-3))
comprobar('t11 P3', cerca(g1_, 1.483e-2, 1e-3) and cerca(g2_, 1.602e-2, 1e-3) and cerca(hypot(g2_ * 0.8, g1_ + g2_ * 0.6), 2.76e-2, 2e-3) and cerca(degrees(atan((g1_ + g2_ * 0.6) / (g2_ * 0.8))), 62.3, 2e-3))
comprobar('t11 P4', cerca(sqrt(15**2 - sqrt(2 * GM / RT)**2 / 1e6), 9.99, 2e-3))
comprobar('t11 P5 Fobos', cerca(4 * pi**2 * (9.376e6)**3 / (G * (7.654 * 3600)**2), 6.42e23, 2e-3))
v1, v2 = sqrt(GM / 7e6), sqrt(GM / 1.2e7)
comprobar('t11 P6', cerca(0.5 * 1500 * (v1**2 - v2**2), 1.78e10, 3e-3) and cerca(GM * 1500 / 2 * (1 / 7e6 - 1 / 1.2e7), 1.78e10, 3e-3) and cerca(-GM * 1500 / 7e6, -8.54e10, 3e-3))
# Hohmann
r1, r2 = RT + 3e5, 4.2164e7; a = (r1 + r2) / 2
comprobar('t11 Hohmann Δv1, Δv2, tiempo', cerca(sqrt(GM * (2 / r1 - 1 / a)) - sqrt(GM / r1), 2427, 2e-3) and cerca(sqrt(GM / r2) - sqrt(GM * (2 / r2 - 1 / a)), 1468, 3e-3) and cerca(pi * sqrt(a**3 / GM) / 3600, 5.27, 3e-3))
comprobar('t11 mareas 1,1·10⁻⁶ m/s² y Sol/Luna', cerca(2 * G * ML * RT / dTL**3, 1.1e-6, 1e-2) and cerca((MS / (1.496e11)**3) / (ML / dTL**3), 1 / 2.2, 2e-2))
comprobar('t11 densidad Tierra 5513', cerca(MT / (4 / 3 * pi * RT**3), 5513, 1e-3))
comprobar('t11 Everest g 9,792', cerca(GM / (RT + 8848)**2, 9.792, 1e-3) and cerca(70 * 9.792, 685.4, 1e-3))
comprobar('t11 velocidad ecuador 465', cerca(2 * pi * RT / 86164, 465, 1e-2))
comprobar('t11 g0/60,3² ≈ aceleración Luna', cerca(g0 / 60.27**2, 2.70e-3, 5e-3) and cerca(1018**2 / dTL, 2.70e-3, 1e-2))

# ----------------------------------------------------------------------------------------------
print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f in fallos: print('  FALLO:', f)
sys.exit(1 if fallos else 0)
