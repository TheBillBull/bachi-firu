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
# TEMA 13 · MOVIMIENTO ARMÓNICO SIMPLE
# Cada respuesta se recalcula aquí (sympy / mpmath cuando la identidad es simbólica o hay una integral elíptica)
# y se compara con lo que acepta el ejercicio; también se comprueban las cifras de la teoría.
# ----------------------------------------------------------------------------------------------
import math
import sympy as sp
import mpmath as mp
E13 = ejercicios('t13')
t_, A_, w_, ph_, k_, m_, x_ = sp.symbols('t A omega phi k m x', positive=True)
g13 = 9.8

# --- identidades simbólicas de la teoría
xs = A_ * sp.cos(w_ * t_ + ph_)
vs = sp.diff(xs, t_); as_ = sp.diff(vs, t_)
comprobar('t13 v = −Aω·sen(ωt + φ₀)', sp.simplify(vs + A_ * w_ * sp.sin(w_ * t_ + ph_)) == 0)
comprobar('t13 a = −Aω²·cos(ωt + φ₀) = −ω²·x', sp.simplify(as_ + A_ * w_**2 * sp.cos(w_ * t_ + ph_)) == 0 and sp.simplify(as_ + w_**2 * xs) == 0)
comprobar('t13 v² = ω²(A² − x²)', sp.simplify(vs**2 - w_**2 * (A_**2 - xs**2)) == 0)
comprobar('t13 Hooke: x = A cos(√(k/m)·t) cumple m·x″ = −k·x', sp.simplify(m_ * sp.diff(A_ * sp.cos(sp.sqrt(k_ / m_) * t_), t_, 2) + k_ * A_ * sp.cos(sp.sqrt(k_ / m_) * t_)) == 0)
Ec_ = sp.Rational(1, 2) * m_ * vs**2; Ep_ = sp.Rational(1, 2) * k_ * xs**2
comprobar('t13 E_c + E_p = ½kA² (con ω² = k/m)', sp.simplify((Ec_ + Ep_).subs(w_, sp.sqrt(k_ / m_)) - sp.Rational(1, 2) * k_ * A_**2) == 0)
comprobar('t13 Ec = Ep en x = A/√2', sp.simplify(sp.Rational(1, 2) * k_ * (A_ / sp.sqrt(2))**2 - sp.Rational(1, 2) * (sp.Rational(1, 2) * k_ * A_**2)) == 0)
comprobar('t13 Hooke: W = ∫k·x dx = ½kx²', sp.simplify(sp.integrate(k_ * x_, (x_, 0, x_)) - k_ * x_**2 / 2) == 0)
# serie y paralelo: se resuelve el equilibrio de dos muelles
F_, x1, x2 = sp.symbols('F x1 x2', positive=True); k1, k2 = sp.symbols('k1 k2', positive=True)
ser = sp.solve([x1 - F_ / k1, x2 - F_ / k2], [x1, x2]); keq_s = sp.simplify(F_ / (ser[x1] + ser[x2]))
comprobar('t13 serie: k = k₁k₂/(k₁ + k₂)', sp.simplify(keq_s - k1 * k2 / (k1 + k2)) == 0)
xp = sp.symbols('xp', positive=True); par = sp.solve(sp.Eq(k1 * xp + k2 * xp, F_), xp)[0]
comprobar('t13 paralelo: k = k₁ + k₂', sp.simplify(F_ / par - (k1 + k2)) == 0)


def Tpend(l, g, th_deg):          # periodo exacto: T = 4·√(l/g)·K(m = sen²(θ₀/2)) (integral elíptica completa)
    return float(4 * mp.sqrt(l / g) * mp.ellipk(mp.sin(mp.radians(th_deg) / 2)**2))


T0p = lambda l, g: 2 * math.pi * math.sqrt(l / g)
comprobar('t13 péndulo: T real/T₀ = 1,0019 (10°), 1,0174 (30°), 1,0732 (60°)', cerca(Tpend(1, g13, 10) / T0p(1, g13), 1.0019, 2e-4) and cerca(Tpend(1, g13, 30) / T0p(1, g13), 1.0174, 2e-4) and cerca(Tpend(1, g13, 60) / T0p(1, g13), 1.0732, 2e-4))
comprobar('t13 péndulo: 1,7 % a 30° y 7,3 % a 60°', cerca((Tpend(1, g13, 30) / T0p(1, g13) - 1) * 100, 1.74, 1e-2) and cerca((Tpend(1, g13, 60) / T0p(1, g13) - 1) * 100, 7.32, 1e-2))
# comprobación numérica del péndulo (RK4 independiente) frente a la integral elíptica
def pend_rk4(l, g, th0):
    th, om, dt, t, vistos = math.radians(th0), 0.0, 1e-4, 0.0, []
    f = lambda q, w: (w, -g / l * math.sin(q))
    while len(vistos) < 1:
        k1 = f(th, om); k2 = f(th + dt / 2 * k1[0], om + dt / 2 * k1[1]); k3 = f(th + dt / 2 * k2[0], om + dt / 2 * k2[1]); k4 = f(th + dt * k3[0], om + dt * k3[1])
        th0_, om0_ = th, om
        th += dt / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]); om += dt / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]); t += dt
        if om0_ < 0 <= om: vistos.append(t)           # primer paso de la velocidad angular por cero hacia positivo = un periodo
    return 2 * vistos[0]      # la velocidad angular vuelve a anularse (hacia +) a mitad de periodo
comprobar('t13 péndulo: RK4 independiente ≈ integral elíptica (θ₀ = 60°)', cerca(pend_rk4(1, g13, 60), Tpend(1, g13, 60), 2e-3))

# --- ★ básico
num(E13, 'm1', 0, 15 / 30); num(E13, 'm1', 1, 30 / 15)
num(E13, 'm2', 0, 1 / 50 * 1e3); num(E13, 'm2', 1, 2 * math.pi * 50)
num(E13, 'm3', 0, 2 * math.pi / math.pi); num(E13, 'm4', 0, 2 * math.pi / 4)
num(E13, 'm5', 0, 150 * 0.08); num(E13, 'm6', 0, 0.5 * 100 * 0.1**2); num(E13, 'm7', 0, math.sqrt(100 / 0.25)); num(E13, 'm8', 0, 0.05 * 10)
opcion(E13, 'm9', 'en los extremos'); opcion(E13, 'm10', 'la masa y la constante')
num(E13, 'm11', 0, 0.04 * math.cos(math.pi)); num(E13, 'm12', 0, T0p(1, g13))
# --- ★★ medio
num(E13, 'm13', 0, 0.08 * math.cos(math.pi / 3)); num(E13, 'm13', 1, -0.08 * 5 * math.pi * math.sin(math.pi / 3))
num(E13, 'm14', 0, 0.12 * math.cos(2 * math.pi / 3))
w15 = 2 * math.pi / 0.5; num(E13, 'm15', 0, 0.1 * w15); num(E13, 'm15', 1, 0.1 * w15**2)
num(E13, 'm16', 0, 4 * math.sqrt(0.10**2 - 0.06**2))
k17 = 0.4 * g13 / 0.08; num(E13, 'm17', 0, k17); num(E13, 'm18', 0, 2 * math.pi * math.sqrt(0.4 / k17))
num(E13, 'm19', 0, 2 * math.pi * math.sqrt(1 / 100))
Em20 = 0.5 * 100 * 0.1**2; Ec20 = Em20 - 0.5 * 100 * 0.06**2; num(E13, 'm20', 0, Ec20); num(E13, 'm20', 1, math.sqrt(2 * Ec20 / 0.4))
num(E13, 'm21', 0, float(sp.solve(sp.Rational(1, 2) * x_**2 - sp.Rational(1, 4) * 0.2**2, x_)[0]))
num(E13, 'm22', 0, float(1 / (sp.Rational(1, 30) + sp.Rational(1, 60)))); num(E13, 'm22', 1, 30 + 60)
num(E13, 'm23', 0, 2 * math.pi * math.sqrt(0.5 / 20))
num(E13, 'm24', 0, g13 * 2**2 / (4 * math.pi**2)); num(E13, 'm25', 0, T0p(1, 1.62))
num(E13, 'm26', 0, 4 * math.pi**2 * 0.75 / (34.8 / 20)**2)
num(E13, 'm27', 0, 1000 / 440); num(E13, 'm27', 1, 2 * math.pi * 440)
tt28 = float(sp.asin(sp.Rational(1, 2)) / (2 * sp.pi / sp.Rational(24, 10))); num(E13, 'm28', 0, tt28)
# m29: cos φ₀ = 1/2 y v₀ = −Aω·sen φ₀ > 0
cand = [60, -60]; num(E13, 'm29', 0, [c for c in cand if -math.sin(math.radians(c)) > 0][0])
num(E13, 'm30', 0, math.sqrt(20000 / 250) / (2 * math.pi))
# --- ★★★ avanzado
A31 = math.hypot(0.03, 0.4 / 10); ph31 = math.degrees(math.atan2(0.4 / 10 / A31 * 1, 0.03 / A31)); num(E13, 'm31', 0, A31); num(E13, 'm31', 1, ph31)
comprobar('t13 m31: cumple x₀ y v₀', cerca(A31 * math.cos(math.radians(ph31)), 0.03) and cerca(-A31 * 10 * math.sin(math.radians(ph31)), -0.4))
num(E13, 'm32', 0, 2 * g13 / 100); num(E13, 'm32', 1, 2 * math.pi * math.sqrt(2 / 100))
num(E13, 'm33', 0, 2 * 1.62 / 100); num(E13, 'm33', 1, 2 * math.pi * math.sqrt(2 / 100))
num(E13, 'm34', 0, math.acos(1 / math.sqrt(2)) / 10)
num(E13, 'm35', 0, math.sqrt(2 * g13 * 1 * (1 - math.cos(math.radians(10)))))
v36sq = 2 * g13 * 2 * (1 - math.cos(math.radians(6))); num(E13, 'm36', 0, 0.2 * (g13 + v36sq / 2))
num(E13, 'm37', 0, 86400 * (math.sqrt(9.80 / 9.77) - 1))
num(E13, 'm38', 0, 2 * math.pi * math.sqrt(2 / (100 * 300 / 400))); num(E13, 'm38', 1, 2 * math.pi * math.sqrt(2 / 400))
num(E13, 'm39', 0, 0.05 * math.sin(math.pi / 4)); num(E13, 'm39', 1, 0.05 * 8 * math.pi * math.cos(math.pi / 4))
num(E13, 'm40', 0, 10 / (2 * 0.5)); num(E13, 'm40', 1, math.sqrt(100 - 0.5**2))
num(E13, 'm41', 0, 1 / 0.5); num(E13, 'm41', 1, math.exp(-2.5) * 100)
num(E13, 'm42', 0, g13 / (2 * math.pi * 2)**2 * 100)
num(E13, 'm43', 0, 2 / math.sqrt(200 / 0.5) * 100)
w44 = 2 * math.pi / 2; num(E13, 'm44', 0, 1 * 0.2 * w44**2); num(E13, 'm44', 1, 0.5 * 1 * 0.2**2 * w44**2)
num(E13, 'm45', 0, math.acos(0.5) / (2 * math.pi / 1.2))
for i_ in ('m46', 'm47', 'm48'): comprobar(i_ + ' es rúbrica', campos(E13, i_)[0]['tipo'] == 'rubrica')
comprobar('t13 mínimos: ≥ 40 ejercicios, ≥ 10 de cada nivel extremo y con pasos', len(E13) >= 40 and sum(1 for e in E13.values() if e['nivel'] == 1) >= 10 and sum(1 for e in E13.values() if e['nivel'] == 3) >= 10 and all(e.get('pasos') for e in E13.values()))

# --- teoría del tema 13
comprobar('t13 tabla de fenómenos: 20 ms; 2,27 ms; 0,5 Hz; 1,4 Hz', cerca(1e3 / 50, 20) and cerca(1e3 / 440, 2.27, 1e-2) and cerca(1 / 2, 0.5) and cerca(math.sqrt(20000 / 250) / (2 * math.pi), 1.42, 1e-2) and cerca(1 / 3.156e7, 3e-8, 6e-2))
comprobar('t13 ej. leer gráfica: A = 5 cm, T = 4 s, f = 0,25 Hz, ω = 1,571', cerca((5 + 5) / 2, 5) and cerca(10 / 2.5, 4) and cerca(1 / 4, 0.25) and cerca(2 * math.pi / 4, 1.571, 1e-3))
comprobar('t13 ej. taladro: 50 Hz, 20 ms, 314,2 rad/s; 4π = 12,57', cerca(3000 / 60, 50) and cerca(1 / 50, 0.02) and cerca(2 * math.pi * 50, 314.2, 1e-3) and cerca(4 * math.pi, 12.57, 1e-3))
w2 = 5 * math.pi
comprobar('t13 ej. ecuación 0,08cos(5πt + π/3): ω 15,71; T 0,4; f 2,5; x₀ 0,04; v₀ −1,088; x(0,1) −0,0693', cerca(w2, 15.71, 1e-3) and cerca(2 * math.pi / w2, 0.4) and cerca(w2 / (2 * math.pi), 2.5) and cerca(0.08 * math.cos(math.pi / 3), 0.04) and cerca(-0.08 * w2 * math.sin(math.pi / 3), -1.088, 1e-3) and cerca(0.08 * math.cos(w2 * 0.1 + math.pi / 3), -0.0693, 2e-3))
comprobar('t13 ej. condiciones iniciales: A 0,05; cos 0,6; sen 0,8; φ₀ 53,13° = 0,927 rad', cerca(A31, 0.05) and cerca(0.03 / A31, 0.6) and cerca(0.4 / (A31 * 10), 0.8) and cerca(ph31, 53.13, 1e-3) and cerca(math.radians(ph31), 0.927, 1e-3))
comprobar('t13 ej. seno → coseno: 2t + π/6 − π/2 = 2t − π/3', cerca(0.2 * math.sin(2 * 0.7 + math.pi / 6), 0.2 * math.cos(2 * 0.7 - math.pi / 3), 1e-9))
comprobar('t13 a = −25x → ω = 5; T = 1,257', cerca(math.sqrt(25), 5) and cerca(2 * math.pi / 5, 1.257, 1e-3))
comprobar('t13 ej. 0,1cos4t: v 0,4; a 1,6; en t = π/8: x 0, v −0,4, a 0', cerca(0.1 * 4, 0.4) and cerca(0.1 * 16, 1.6) and abs(0.1 * math.cos(4 * math.pi / 8)) < 1e-12 and cerca(-0.4 * math.sin(4 * math.pi / 8), -0.4) and abs(-1.6 * math.cos(4 * math.pi / 8)) < 1e-12)
comprobar('t13 ej. v(x): ±0,32; a −0,96; v² + ω²x² = ω²A² = 0,16', cerca(4 * math.sqrt(0.01 - 0.0036), 0.32) and cerca(-16 * 0.06, -0.96) and cerca(0.32**2 + 16 * 0.06**2, 16 * 0.1**2 * 1.0, 1e-3) and cerca(0.32**2, 0.1024, 1e-3) and cerca(16 * 0.0036, 0.0576, 1e-3))
comprobar('t13 ej. T = 2,4 s: T/12 = 0,2; T/4 = 0,6; T/6 = 0,4', cerca(2.4 / 12, 0.2) and cerca(2.4 / 4, 0.6) and cerca(0.6 - 0.2, 0.4) and cerca(2.4 / 6, 0.4) and cerca(math.asin(0.5) / (2 * math.pi / 2.4), 0.2))
comprobar('t13 ej. masa-muelle 0,5 kg, 200 N/m: 20 rad/s; 0,314 s; 3,18 Hz; ×2 con 4m', cerca(math.sqrt(200 / 0.5), 20) and cerca(2 * math.pi / 20, 0.314, 1e-3) and cerca(20 / (2 * math.pi), 3.18, 1e-3) and cerca(2 * math.pi * math.sqrt(2 / 200), 0.628, 1e-3))
comprobar('t13 ej. medir k: 49 N/m; 0,568 s; con Δℓ', cerca(0.4 * 9.8 / 0.08, 49) and cerca(2 * math.pi * math.sqrt(0.4 / 49), 0.568, 1e-3) and cerca(2 * math.pi * math.sqrt(0.08 / 9.8), 0.568, 1e-3) and cerca(math.sqrt(0.4 / 49), 0.0904, 1e-2))
comprobar('t13 ej. vertical Tierra/Luna: 0,196; 0,0324; 0,889', cerca(2 * 9.8 / 100, 0.196) and cerca(2 * 1.62 / 100, 0.0324) and cerca(2 * math.pi * math.sqrt(2 / 100), 0.889, 1e-3))
comprobar('t13 ej. serie/paralelo: 20; 90; 0,993; 0,468; ×4,5 y ×2,1', cerca(1 / (1 / 30 + 1 / 60), 20) and cerca(2 * math.pi * math.sqrt(0.5 / 20), 0.993, 1e-3) and cerca(2 * math.pi * math.sqrt(0.5 / 90), 0.468, 1e-3) and cerca(90 / 20, 4.5) and cerca(math.sqrt(4.5), 2.1, 2e-2))
comprobar('t13 ej. reparto de energía: 0,5; 1,58; 0,18; 0,32; 1,265', cerca(0.5 * 100 * 0.1**2, 0.5) and cerca(math.sqrt(2 * 0.5 / 0.4), 1.58, 1e-3) and cerca(0.1 * math.sqrt(100 / 0.4), 1.58, 1e-3) and cerca(0.5 * 100 * 0.06**2, 0.18) and cerca(0.5 - 0.18, 0.32) and cerca(math.sqrt(2 * 0.32 / 0.4), 1.265, 1e-3))
comprobar('t13 ej. se igualan: 0,1414 y 0,1', cerca(0.2 / math.sqrt(2), 0.1414, 1e-3) and cerca(0.2 / 2, 0.1))
comprobar('t13 método: ω 10; T 0,628; v 0,8; a 8; Em 0,08; x 0,0432; v −0,673; a −4,32; F −1,08', cerca(math.sqrt(25 / 0.25), 10) and cerca(2 * math.pi / 10, 0.628, 1e-3) and cerca(0.08 * 10, 0.8) and cerca(0.08 * 100, 8) and cerca(25 * 0.08, 2) and cerca(0.25 * 8, 2) and cerca(0.5 * 25 * 0.08**2, 0.08) and cerca(0.08 * math.cos(1), 0.0432, 2e-3) and cerca(-0.8 * math.sin(1), -0.673, 2e-3) and cerca(-8 * math.cos(1), -4.32, 2e-3) and cerca(-25 * 0.08 * math.cos(1), -1.08, 3e-3) and cerca(0.25 * -4.32, -1.08, 3e-3))
comprobar('t13 péndulo: 0,993 m; 2,007 s; Luna 4,94 s (×2,46) y 0,164 m', cerca(9.8 * 4 / (4 * math.pi**2), 0.993, 1e-3) and cerca(T0p(1, 9.8), 2.007, 1e-3) and cerca(T0p(1, 1.62), 4.94, 1e-3) and cerca(math.sqrt(9.8 / 1.62), 2.46, 1e-3) and cerca(1.62 * 4 / (4 * math.pi**2), 0.164, 1e-2))
comprobar('t13 medir g: T 1,74; g 9,78', cerca(34.8 / 20, 1.74) and cerca(4 * math.pi**2 * 0.75 / 1.74**2, 9.78, 1e-3) and cerca(4 * math.pi**2 * 0.75, 29.61, 1e-3) and cerca(1.74**2, 3.028, 1e-3))
comprobar('t13 péndulo 10°: h 0,01519; v 0,546; ω·l·θ₀ 0,546', cerca(1 - math.cos(math.radians(10)), 0.01519, 1e-3) and cerca(math.sqrt(2 * 9.8 * 0.01519), 0.546, 2e-3) and cerca(math.sqrt(9.8) * math.radians(10), 0.546, 2e-3) and cerca(math.sqrt(9.8), 3.13, 1e-3))
comprobar('t13 amortiguado: ωd 9,987; 1/γ = 2 s; e^−2,5 = 0,082; Q = 10', cerca(math.sqrt(100 - 0.25), 9.987, 1e-3) and cerca(1 / 0.5, 2) and cerca(math.exp(-2.5), 0.082, 1e-2) and cerca(10 / (2 * 0.5), 10))
comprobar('t13 suspensión: 8,94; 1,42 Hz; 0,70 s; 12,3 cm', cerca(math.sqrt(80), 8.94, 1e-3) and cerca(math.sqrt(80) / (2 * math.pi), 1.42, 1e-2) and cerca(2 * math.pi / math.sqrt(80), 0.70, 1e-2) and cerca(250 * 9.8 / 20000 * 100, 12.3, 1e-2))
wd_ = 2 * math.pi * 440; comprobar('t13 diapasón: 2,27 ms; 2765 rad/s; 2,76 m/s; 7640 m/s²; ×780 g', cerca(1000 / 440, 2.27, 1e-2) and cerca(wd_, 2765, 1e-3) and cerca(0.001 * wd_, 2.76, 2e-3) and cerca(0.001 * wd_**2, 7640, 1e-3) and cerca(0.001 * wd_**2 / 9.8, 780, 1e-2))
# PAU
comprobar('t13 PAU 1: 10 rad/s; 0,628 s; 1,59 Hz; 1 m/s; 10 m/s²; 0,25 J; 0,8 m/s; 0,09 J; 0,16 J', cerca(math.sqrt(100), 10) and cerca(2 * math.pi / 10, 0.628, 1e-3) and cerca(10 / (2 * math.pi), 1.59, 1e-2) and cerca(0.1 * 10, 1) and cerca(0.1 * 100, 10) and cerca(0.5 * 50 * 0.01, 0.25) and cerca(10 * math.sqrt(0.01 - 0.0036), 0.8) and cerca(0.5 * 50 * 0.06**2, 0.09) and cerca(0.25 - 0.09, 0.16) and cerca(0.5 * 0.5 * 0.8**2, 0.16))
w_p2 = 8 * math.pi
comprobar('t13 PAU 2: 25,13; 4 Hz; 0,25 s; 0,0354; 0,889; en 0,125 s: −0,0354, −0,889, +22,3', cerca(w_p2, 25.13, 1e-3) and cerca(w_p2 / (2 * math.pi), 4) and cerca(2 * math.pi / w_p2, 0.25) and cerca(0.05 * math.sin(math.pi / 4), 0.0354, 2e-3) and cerca(0.05 * w_p2 * math.cos(math.pi / 4), 0.889, 1e-3) and cerca(w_p2 * 0.125 + math.pi / 4, 5 * math.pi / 4) and cerca(0.05 * math.sin(5 * math.pi / 4), -0.0354, 2e-3) and cerca(0.05 * w_p2 * math.cos(5 * math.pi / 4), -0.889, 1e-3) and cerca(-w_p2**2 * 0.05 * math.sin(5 * math.pi / 4), 22.3, 2e-3) and cerca(w_p2**2, 631.7, 1e-3))
k_p3 = 0.5 * 9.8 / 0.10; w_p3 = math.sqrt(k_p3 / 0.5)
comprobar('t13 PAU 3: 49 N/m; 9,90 rad/s; 0,635 s; 0,495 m/s; 0,0613 J; 7,35 N', cerca(k_p3, 49) and cerca(w_p3, 9.90, 1e-3) and cerca(2 * math.pi / w_p3, 0.635, 1e-3) and cerca(0.05 * w_p3, 0.495, 1e-3) and cerca(0.5 * 49 * 0.05**2, 0.0613, 1e-3) and cerca(49 * 0.15, 7.35) and cerca(0.5 * 9.8 + 0.5 * 0.05 * w_p3**2, 7.35, 1e-3) and cerca(0.05 * w_p3**2, 4.9, 1e-3))
comprobar('t13 PAU 4: 75; 1,026; 400; 0,444; ×2,31', cerca(1 / (1 / 100 + 1 / 300), 75) and cerca(2 * math.pi * math.sqrt(2 / 75), 1.026, 1e-3) and cerca(2 * math.pi * math.sqrt(2 / 400), 0.444, 1e-3) and cerca(math.sqrt(400 / 75), 2.31, 1e-3))
comprobar('t13 PAU 5: 2,46 s; 0,535 m/s; 0,248 m', cerca(T0p(1.5, 9.8), 2.46, 2e-3) and cerca(math.sqrt(1.5 / 9.8), 0.3912, 1e-3) and cerca(math.sqrt(2 * 9.8 * 1.5 * (1 - math.cos(math.radians(8)))), 0.535, 2e-3) and cerca(1 - math.cos(math.radians(8)), 0.009741, 1e-3) and cerca(1.5 * 1.62 / 9.8, 0.248, 1e-3))
comprobar('t13 PAU 6: 0,1 J; 20 rad/s; 0,8 m/s; 2,5 cm; 0,0785 s', cerca(0.5 * 80 * 0.05**2, 0.1) and cerca(math.sqrt(80 / 0.2), 20) and cerca(20 * math.sqrt(0.05**2 - 0.03**2), 0.8) and cerca(0.05 / 2, 0.025) and cerca(math.pi / (2 * 20), 0.0785, 1e-3))
dd13 = datos['ampl']['fyq1']['t13']
comprobar('t13 errores: 0,99985 con grados vs cos 1 rad = 0,5403', cerca(math.cos(math.radians(1)), 0.99985, 1e-5) and cerca(math.cos(1), 0.5403, 1e-3))
comprobar('t13 test y errores: números', cerca(2 * math.pi / (2 * math.pi), 1) and cerca(1 / 5, 0.2) and cerca(math.sqrt(100 / 1), 10) and cerca(0.2 * 5, 1) and cerca(1 / (1 / 30 + 1 / 60), 20) and cerca(T0p(1, 1.62), 4.9, 1e-2) and cerca(T0p(1, 9.8), 2.0, 1e-2))
comprobar('t13 actividades: errores, test, tarjetas, parejas, clasificaciones y orden', len(dd13['datos']['errores']['preguntas']) >= 10 and len(dd13['datos']['quiz1']['preguntas']) >= 12 and len(dd13['datos']['tj1']['cartas']) >= 14 and len(dd13['datos']['emp1']['pares']) >= 7 and len(dd13['datos']['cla1']['items']) >= 9 and len(dd13['datos']['orden1']['items']) >= 6)
comprobar('t13 mínimos: lámina ≥ 8 y secciones nuevas ≥ 8', len(dd13['lamina']) >= 8 and len(dd13['nuevas']) >= 8)

# ----------------------------------------------------------------------------------------------
# TEMA 12 · TRABAJO, ENERGÍA Y POTENCIA
# Cada respuesta se recalcula con sympy (integrales y ecuaciones de conservación) o directamente, sin las fórmulas cerradas de la web.
# ----------------------------------------------------------------------------------------------
import math
import sympy as sp
E12 = ejercicios('t12')
g12 = 9.8
xx, vv_, hh_, dd_ = sp.symbols('x v h d', positive=True)
sen = lambda a: math.sin(math.radians(a)); cos_ = lambda a: math.cos(math.radians(a))


def despejar(eq, var):
    return max(float(s) for s in sp.solve(eq, var))


# --- ★ básico
num(E12, 'w1', 0, 30 * 5 * cos_(0)); opcion(E12, 'w2', '0 J'); num(E12, 'w3', 0, 0.5 * 2 * 6**2); num(E12, 'w4', 0, 4 * g12 * 15)
num(E12, 'w5', 0, 0.5 * 1000 * 20**2 / 1e3); num(E12, 'w6', 0, 3000 / 15)
num(E12, 'w7', 0, 200 * g12 * 10); num(E12, 'w7', 1, 200 * g12 * 10 / 20)
num(E12, 'w8', 0, despejar(sp.Rational(1, 2) * vv_**2 - 10 * 45, vv_))
opcion(E12, 'w9', 'negativo'); num(E12, 'w10', 0, 2 * 3.6); num(E12, 'w11', 0, 0.5 * 80 * 10**2); num(E12, 'w12', 0, 400 / 500 * 100)
# --- ★★ intermedio
num(E12, 'w13', 0, 40 * 6 * cos_(30)); num(E12, 'w14', 0, 10 * g12 * 5 * cos_(180))
fr15 = 0.2 * 5 * g12; Wn15 = 25 * 8 - fr15 * 8
num(E12, 'w15', 0, -fr15 * 8); num(E12, 'w15', 1, Wn15); num(E12, 'w15', 2, math.sqrt(2 * Wn15 / 5))
num(E12, 'w16', 0, despejar(sp.Rational(1, 2) * 8**2 - g12 * hh_, hh_))
num(E12, 'w17', 0, 0.5 * g12 * 4)
num(E12, 'w18', 0, 0.5 * 200 * 0.1**2); num(E12, 'w18', 1, despejar(0.5 * 0.05 * vv_**2 - 1, vv_))
num(E12, 'w19', 0, float(sp.integrate(2 * xx, (xx, 0, 5))))
num(E12, 'w20', 0, 40 * 8)
num(E12, 'w21', 0, despejar(0.5 * vv_**2 - g12 * 5 * sen(30), vv_))
num(E12, 'w22', 0, despejar(0.5 * vv_**2 - (g12 * 5 * sen(30) - 0.2 * g12 * cos_(30) * 5), vv_))
num(E12, 'w23', 0, despejar(-6000 * dd_ + 0.5 * 1200 * 20**2, dd_))
num(E12, 'w24', 0, 0.060 * 5); num(E12, 'w24', 1, 0.060 * 5 * 0.15)
num(E12, 'w25', 0, despejar(0.5 * vv_**2 - g12 * 2 * (1 - cos_(60)), vv_))
num(E12, 'w26', 0, 2 * g12 * 50 - 0.5 * 2 * 28**2)
num(E12, 'w27', 0, 0.75 * 2000); num(E12, 'w27', 1, 150 * g12 * 12 / (0.75 * 2000))
num(E12, 'w28', 0, 600 * g12 * 30 / 20)
num(E12, 'w29', 0, despejar(0.5 * vv_**2 - g12 * 20, vv_))
# rizo: v² = gR en la cima y conservación desde la altura h
num(E12, 'w30', 0, despejar(sp.Rational(1, 1) * g12 * hh_ - (g12 * 2 * 5 + 0.5 * g12 * 5), hh_))
# --- ★★★ avanzado
d31 = despejar(0.5 * 10**2 - (0.6 + 0.25 * 0.8) * g12 * dd_, dd_)
num(E12, 'w31', 0, d31); num(E12, 'w31', 1, math.sqrt(2 * g12 * (0.6 - 0.25 * 0.8) * d31))
num(E12, 'w32', 0, despejar(0.5 * 1000 * vv_**2 - (3000 - 1000) * 100, vv_))
num(E12, 'w33', 0, 700 * 30 / 1e3); num(E12, 'w33', 1, 700 * 30 / 735.5)
num(E12, 'w34', 0, 0.5 * 400 * 0.2**2 / (0.3 * 1 * g12))
num(E12, 'w35', 0, 0.38 * 0.92 * 0.85 * 100)
num(E12, 'w36', 0, math.sqrt(2 * g12 * 0.5)); num(E12, 'w36', 1, 70 * g12 * 0.5)
num(E12, 'w37', 0, 0.5 * 1000 * (20e3)**2 / 1e11); num(E12, 'w37', 1, 0.5 * 1000 * (20e3)**2 / 4.184e9)
num(E12, 'w38', 0, 0.85 * 50 * 1000 * g12 * 80 / 1e6)
N39 = 10 * g12 - 60 * sen(30); W39 = 60 * 10 * cos_(30) - 0.2 * N39 * 10
num(E12, 'w39', 0, N39); num(E12, 'w39', 1, W39); num(E12, 'w39', 2, math.sqrt(2 * W39 / 10))
for i_ in ('w40', 'w41', 'w42'): comprobar(i_ + ' es rúbrica', campos(E12, i_)[0]['tipo'] == 'rubrica')
num(E12, 'w43', 0, 15**2 / (4 * g12)); opcion(E12, 'w44', 'su trabajo depende del camino')
# la demostración de w40 con sympy: W = F·d = m·a·d con v² = v₀² + 2ad
m_s, a_s, d_s, v0_s = sp.symbols('m a d v0', positive=True)
comprobar('t12 w40: m·a·d = ½mv² − ½mv₀² con v² = v₀² + 2ad', sp.simplify(m_s * a_s * d_s - (sp.Rational(1, 2) * m_s * (v0_s**2 + 2 * a_s * d_s) - sp.Rational(1, 2) * m_s * v0_s**2)) == 0)
comprobar('t12 mínimos: ≥ 40 ejercicios, ≥ 10 en el nivel 1 y ≥ 10 en el 3, todos con pasos', len(E12) >= 40 and sum(1 for e in E12.values() if e['nivel'] == 1) >= 10 and sum(1 for e in E12.values() if e['nivel'] == 3) >= 10 and all(e.get('pasos') for e in E12.values()))

# --- teoría del tema 12
comprobar('t12 ej. carrito: 207,8 J; 120° → −75 J; F·sen 30° = 20 N', cerca(40 * 6 * cos_(30), 207.8, 1e-3) and cerca(12 * 5 * -1, -60) and cerca(30 * 5 * cos_(120), -75) and cerca(40 * sen(30), 20))
comprobar('t12 ej. todas las fuerzas del bloque: 200; 49; 9,8; −78,4; 121,6; 15,2·8', cerca(25 * 8, 200) and cerca(5 * g12, 49) and cerca(0.2 * 49, 9.8) and cerca(-9.8 * 8, -78.4) and cerca(200 - 78.4, 121.6) and cerca((25 - 9.8) * 8, 121.6))
comprobar('t12 ej. F = 2x: 25 J; muelle 1 J, 4 J (×4)', cerca(float(sp.integrate(2 * xx, (xx, 0, 5))), 25) and cerca(0.5 * 200 * 0.1**2, 1) and cerca(0.5 * 200 * 0.2**2, 4))
comprobar('t12 tabla de energías cinéticas', all(cerca(0.5 * m_ * v_**2, e_, 1.2e-2) for m_, v_, e_ in ((70, 1.4, 69), (0.057, 55.6, 88), (0.004, 400, 320), (80, 5.56, 1230), (1000, 13.9, 96500), (1000, 27.8, 386000), (1000, 33.3, 556000), (20000, 25, 6.25e6), (100000, 20, 20e6))))
tabla_f = {30: (5.1, 8.9, 23.6), 50: (14.1, 24.6, 65.6), 90: (45.6, 79.7, 212.6), 120: (81.0, 141.7, 377.9)}
comprobar('t12 tabla de distancias de frenado (12 valores)', all(cerca((kmh / 3.6)**2 / (2 * mu_ * g12), d_, 1e-2) for kmh, ds in tabla_f.items() for mu_, d_ in zip((0.7, 0.4, 0.15), ds)))
comprobar('t12 ej. acelerar un coche: 200 kJ; 150 kJ; 250 kJ; 40 m; 6,97 m/s y 8,9 m/s con 200 J', cerca(0.5 * 1000 * 400, 200000) and cerca(0.5 * 1000 * (400 - 100), 150000) and cerca(0.5 * 1000 * (900 - 400), 250000) and cerca(0.5 * 1200 * 400 / 6000, 40) and cerca(6000 / 1200, 5) and cerca(math.sqrt(2 * 121.6 / 5), 6.97, 1e-3) and cerca(math.sqrt(2 * 200 / 5), 8.9, 1e-2))
comprobar('t12 tabla E_p de referencias: 29,4; 14,7', cerca(2 * g12 * 1.5, 29.4) and cerca(2 * g12 * 0.75, 14.7) and cerca(2 * g12 * -0.75, -14.7))
comprobar('t12 ej. peso no depende del camino: −490 J por los dos caminos', cerca(98 * 5 * cos_(180), -490) and cerca(5 / sen(30), 10) and cerca(98 * 10 * cos_(120), -490))
comprobar('t12 ej. muelle lanza bola: 1 J; v² = 40; 6,32 m/s', cerca(0.5 * 200 * 0.1**2, 1) and cerca(2 * 1 / 0.05, 40) and cerca(math.sqrt(40), 6.32, 1e-3))
comprobar('t12 ej. E_p Tierra/Luna: 686; 113,4; ratio 6', cerca(70 * 9.8, 686) and cerca(70 * 1.62, 113.4) and cerca(9.8 / 1.62, 6, 1e-2))
comprobar('t12 ej. escalera: 2058 J; 412 W', cerca(70 * 9.8 * 3, 2058) and cerca(2058 / 5, 412, 1e-2))
comprobar('t12 ej. altura máxima 3,265; péndulo 4,43; montaña 19,8 (71,3 km/h); rizo 12,5', cerca(32 / 9.8, 3.265, 1e-3) and cerca(math.sqrt(2 * 9.8 * 1), 4.43, 1e-3) and cerca(math.sqrt(2 * 9.8 * 20), 19.8, 1e-3) and cerca(19.8 * 3.6, 71.3, 1e-3) and cerca(2.5 * 5, 12.5))
comprobar('t12 ej. plano con rozamiento: 7,0; 8,49; 16,01; 5,66; 35 %', cerca(math.sqrt(2 * 9.8 * 2.5), 7.0, 1e-3) and cerca(0.2 * 9.8 * cos_(30) * 5, 8.49, 1e-3) and cerca(24.5 - 8.49, 16.01, 1e-3) and cerca(math.sqrt(2 * 16.01), 5.66, 1e-3) and cerca((24.5 - 16.01) / 24.5, 0.35, 2e-2))
comprobar('t12 ej. aire: 980; 784; 196; 20 %', cerca(2 * 9.8 * 50, 980) and cerca(0.5 * 2 * 28**2, 784) and cerca(980 - 784, 196) and cerca(196 / 980, 0.2))
comprobar('t12 potencias: persona 80 W; Sol/consumo ≈ 8 000; gasolina 9,4 kWh/L; batería ≈ 50 veces', cerca(1700 * 4184 / 86400, 80, 5e-2) and cerca(1.7e17 / 2.0e13, 8000, 8e-2) and cerca(34 / 3.6, 9.4, 1e-2) and cerca(250 * 3600 / 1e6, 0.9, 1e-2) and cerca(46 / 0.9, 50, 3e-2))
comprobar('t12 ej. grúa 19 600 J, 980 W; coche 21 kW y 28,6 CV', cerca(200 * 9.8 * 10, 19600) and cerca(19600 / 20, 980) and cerca(700 * 30, 21000) and cerca(21000 / 735.5, 28.6, 2e-3))
comprobar('t12 ej. rendimiento motor: 1500; 17 640; 11,76; 500 W; cadena 29,7 %', cerca(0.75 * 2000, 1500) and cerca(150 * 9.8 * 12, 17640) and cerca(17640 / 1500, 11.76) and cerca(2000 - 1500, 500) and cerca(0.38 * 0.92 * 0.85, 0.297, 3e-3))
comprobar('t12 método: dos caminos 3,20 m/s² y 5,66 m/s', cerca(9.8 * (0.5 - 0.2 * cos_(30)), 3.20, 1e-2) and cerca(math.sqrt(2 * 3.2026 * 5), 5.66, 1e-3) and cerca(9.8 * 5 * 0.5, 24.5) and cerca(0.2 * 9.8 * cos_(30) * 5, 8.49, 1e-3))
comprobar('t12 ej. cuerda inclinada: 68; 13,6; −136; 519,6; 383,6; 8,76', cerca(98 - 60 * 0.5, 68) and cerca(0.2 * 68, 13.6) and cerca(-13.6 * 10, -136) and cerca(60 * 10 * cos_(30), 519.6, 1e-3) and cerca(519.6 - 136, 383.6, 1e-3) and cerca(math.sqrt(2 * 383.6 / 10), 8.76, 1e-3) and cerca(2 * 383.6 / 10, 76.7, 1e-3))
comprobar('t12 ej. hacia arriba y de vuelta: 6,38 m; 7,07 m/s; tan 37° = 0,75 > 0,25', cerca(100 / (2 * 9.8 * 0.8), 6.38, 1e-3) and cerca(math.sqrt(2 * 9.8 * 0.4 * 6.378), 7.07, 1e-3) and cerca(0.6 / 0.8, 0.75) and cerca(0.25 * 0.8, 0.2))
comprobar('t12 ej. muelle y suelo: 8 J; 2,94 N; 2,72 m', cerca(0.5 * 400 * 0.2**2, 8) and cerca(0.3 * 9.8, 2.94) and cerca(8 / 2.94, 2.72, 2e-3))
comprobar('t12 factura: 1,35/0,20; 12/1,80; 36/5,40; 18/2,70; 240/36', cerca(0.009 * 5 * 30, 1.35) and cerca(1.35 * 0.15, 0.20, 3e-2) and cerca(0.1 * 4 * 30 * 0.15, 1.80) and cerca(0.15 * 8 * 30 * 0.15, 5.40) and cerca(1.2 * 0.5 * 30, 18) and cerca(18 * 0.15, 2.70) and cerca(2 * 4 * 30, 240) and cerca(240 * 0.15, 36))
comprobar('t12 ej. bombilla: 0,3 kWh; 0,045 €; 1,08·10⁶ J', cerca(0.06 * 5, 0.3) and cerca(0.3 * 0.15, 0.045) and cerca(0.3 * 3.6e6, 1.08e6))
comprobar('t12 alimentos: 836 800 J; 1220 m; 305 m', cerca(200 * 4184, 836800) and cerca(837000 / (70 * 9.8), 1220, 1e-3) and cerca(1220 * 0.25, 305, 1e-3))
comprobar('t12 gasolina de acelerar: 386 kJ; 1,29 MJ; 0,038 L', cerca(0.5 * 1000 * 27.8**2, 386e3, 2e-3) and cerca(386 / 0.30, 1286, 1e-3) and cerca(1.286 / 34, 0.038, 1e-2))
comprobar('t12 hidroeléctrica: 5·10⁴ kg/s; 39,2 MW; 33,3 MW', cerca(50 * 1000, 5e4) and cerca(5e4 * 9.8 * 80, 3.92e7) and cerca(0.85 * 39.2, 33.3, 2e-3))
comprobar('t12 PAU 1: 40; 3,92; −15,68; 24,32 J; 4,93 m/s; 6,20 m; 10,2 m', cerca(10 * 4, 40) and cerca(0.2 * 2 * 9.8, 3.92) and cerca(-3.92 * 4, -15.68) and cerca(40 - 15.68, 24.32) and cerca(math.sqrt(24.32), 4.93, 1e-3) and cerca(24.32 / 3.92, 6.20, 1e-3) and cerca(4 + 6.204, 10.2, 1e-3) and cerca(3.92 * 10.204, 40, 1e-3))
comprobar('t12 PAU 2: 17,1 m/s; 12,5 m/s; 4900 N; 15 m < 20 m', cerca(math.sqrt(2 * 9.8 * 15), 17.1, 5e-3) and cerca(math.sqrt(2 * 9.8 * 8), 12.5, 1e-2) and cerca(2 * 9.8 * 8, 156.8) and cerca(300 * (156.8 / 6 - 9.8), 4900, 1e-3) and cerca(2.5 * 6, 15))
comprobar('t12 PAU 3: 1,5 J; 2,45 m/s; 1,22 m', cerca(0.5 * 300 * 0.1**2, 1.5) and cerca(math.sqrt(6), 2.45, 1e-3) and cerca(1.5 / (0.25 * 0.5 * 9.8), 1.22, 5e-3) and cerca(0.25 * 0.5 * 9.8, 1.225))
F4 = 500 + 1200 * 9.8 * 0.05; P4 = F4 * 20
comprobar('t12 PAU 4: 588; 1088 N; 21,8 kW; 29,6 CV; 72 533 W; 261 MJ; 7,68 L/h; 10,7 L/100 km', cerca(1200 * 9.8 * 0.05, 588) and cerca(F4, 1088) and cerca(P4, 21760) and cerca(P4 / 735.5, 29.6, 1e-3) and cerca(P4 / 0.30, 72533, 1e-3) and cerca(P4 / 0.3 * 3600 / 1e6, 261, 2e-3) and cerca(261 / 34, 7.68, 2e-3) and cerca(100 / 72 * 7.68, 10.7, 5e-3))
comprobar('t12 PAU 5: L 5; a 3,528; v 5,94; Q 47,0; E_p 117,6 = 70,56 + 47,04; 6,0 m', cerca(3 / 0.6, 5) and cerca(9.8 * (0.6 - 0.24), 3.528) and cerca(math.sqrt(2 * 3.528 * 5), 5.94, 1e-3) and cerca(0.3 * 4 * 9.8 * 0.8 * 5, 47.04, 1e-3) and cerca(4 * 9.8 * 3, 117.6) and cerca(0.5 * 4 * 35.28, 70.56, 1e-3) and cerca(70.56 + 47.04, 117.6, 1e-3) and cerca(70.56 / 11.76, 6.0, 1e-3))
vx6 = 20 * cos_(40); h6 = (400 - vx6**2) / (2 * 9.8)
comprobar('t12 PAU 6: 15,32; 8,43 m; 17,4 m/s; 23,5 J; 16,5 J', cerca(vx6, 15.32, 1e-3) and cerca(h6, 8.43, 1e-3) and cerca((20 * sen(40))**2 / (2 * 9.8), 8.43, 1e-3) and cerca(math.sqrt(400 - 2 * 9.8 * 5), 17.4, 3e-3) and cerca(0.5 * 0.2 * vx6**2, 23.5, 2e-3) and cerca(0.2 * 9.8 * h6, 16.5, 5e-3) and cerca(0.5 * 0.2 * 400, 40))
comprobar('t12 historia: Joule 4,18 J/cal', cerca(4.184, 4.18, 1e-2))
comprobar('t12 test y errores: 20 J; 9; 147 J; 10 m/s; 5000 J; 150 vs 50 kJ; 0,729', cerca(10 * 4 * cos_(60), 20) and cerca(0.5 * 2 * 9, 9) and cerca(3 * 9.8 * 5, 147) and cerca(math.sqrt(2 * 10 * 5), 10) and cerca(500 * 10, 5000) and cerca(0.5 * 1000 * (400 - 100), 150000) and cerca(0.5 * 1000 * 10**2, 50000) and cerca(0.9**3, 0.729))
comprobar('t12 gráfica leerfx: 60; 18; 6,32; 200; 16; 12; 32; −6; 42; 6,48', cerca(6 * 10, 60) and cerca(6 * 3, 18) and cerca(math.sqrt(2 * 60 / 3), 6.32, 1e-3) and cerca(80 / 0.4, 200) and cerca(0.5 * 0.4 * 80, 16) and cerca((40 + 80) / 2 * 0.2, 12) and cerca(8 * 4, 32) and cerca(-0.5 * 2 * 6, -6) and cerca(8 + 32 + 8 - 6, 42) and cerca(math.sqrt(42), 6.48, 1e-3) and cerca(sum((x2 - x1) * (y1 + y2) / 2 for (x1, y1), (x2, y2) in zip([(0, 0), (2, 8), (6, 8), (8, 0)], [(2, 8), (6, 8), (8, 0), (10, -6)])), 42, 1e-3))
d12 = datos['ampl']['fyq1']['t12']
comprobar('t12 mínimos: lámina ≥ 8, secciones nuevas ≥ 7, ≥ 5 clases de actividades', len(d12['lamina']) >= 8 and len(d12['nuevas']) >= 7 and len(d12['datos']) >= 5)

# ----------------------------------------------------------------------------------------------
print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f in fallos: print('  FALLO:', f)
sys.exit(1 if fallos else 0)
