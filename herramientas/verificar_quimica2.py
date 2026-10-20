#!/usr/bin/env python3
"""
Verificación independiente (sympy) de las cifras de ampliaciones/quimica2.js
y de las constantes del simulador de equilibrio (lab_equilibrio.js).

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_quimica2.py /tmp/ampl.json
"""
import json, sys, math
import sympy as sp

x = sp.symbols('x', positive=True)
R_ATM = 0.082
ok, fallos = 0, []
def comprobar(nombre, cond, det=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {det}')
def cerca(a, b, tol=0.006): return abs(a - b) <= tol * max(abs(b), 1e-12)

datos = json.load(open(sys.argv[1]))
EJ = {e['id']: e for e in datos['ampl']['quimica2']['t6']['ejercicios']}
def v(id_, k=0):
    c = EJ[id_]['check']; c = c if isinstance(c, list) else [c]
    return c[k]

# ---------- ejercicios ----------
comprobar('q1 Kc', (1.2**2) / (0.2*0.2) == v('q1')['valor'] or cerca((1.2**2)/(0.2*0.2), v('q1')['valor']))
comprobar('q3 1/K', cerca(1/0.08, v('q3')['valor']))
kp = 280 * (R_ATM*1000)**(-1)
comprobar('q4 Kp', cerca(kp, v('q4')['valor']), f'{kp:.4f}')
# q5: H2 + I2 <=> 2HI, c0 = 0.5, Kc = 54
sol = [s for s in sp.solve(sp.Eq((2*x)**2/(sp.Rational(1, 2)-x)**2, 54), x) if s < sp.Rational(1, 2)][0]
comprobar('q5 [H2]', cerca(float(0.5 - sol), v('q5', 0)['valor']), f'{float(0.5-sol):.4f}')
comprobar('q5 [HI]', cerca(float(2*sol), v('q5', 1)['valor']), f'{float(2*sol):.4f}')
# q6: alpha y Kc
alpha = (2.0 - 1.2) / 2.0
kc6 = (0.8/10)**2 / (1.2/10)
comprobar('q6 α', cerca(alpha, v('q6', 0)['valor']))
comprobar('q6 Kc', cerca(kc6, v('q6', 1)['valor'], 0.01), f'{kc6:.5f}')
# q7: PCl5, c0 = 0.2, Kc = 0.04
s7 = [s for s in sp.solve(sp.Eq(x**2/(sp.Rational(1, 5)-x), sp.Rational(1, 25)), x) if s > 0][0]
comprobar('q7 [PCl3]', cerca(float(s7), v('q7', 0)['valor']), f'{float(s7):.5f}')
comprobar('q7 α', cerca(float(s7)/0.2, v('q7', 1)['valor']), f'{float(s7)/0.2:.4f}')
comprobar('q7 aproximación (error 25 %)', abs(math.sqrt(0.04*0.2) - float(s7)) / float(s7) > 0.24)
comprobar('q9 Q', cerca(0.3**2/(0.5*1.0**3), v('q9', 0)['valor']) and 0.3**2/(0.5*1.0**3) > 0.08 and v('q9', 1)['ok'] == 1)
# q8: Le Chatelier de la síntesis de NH3 (Δn = -2, exotérmica): respuestas esperadas a..f
esperado_q8 = [1, 0, 2, 0, 0, 2]
comprobar('q8 respuestas', [c['ok'] for c in EJ['q8']['check']] == esperado_q8)

# ---------- ejemplos de la teoría ----------
comprobar('teoría: Kc SO3', cerca(0.40**2 / (0.20**2 * 0.10), 40))
comprobar('teoría: Kp N2O4', cerca(4.6e-3 * (R_ATM*298), 0.112, 0.01), f'{4.6e-3*R_ATM*298:.4f}')
comprobar('teoría: Q = 16', 2.0**2/(0.5*0.5) == 16)
s1 = [s for s in sp.solve(sp.Eq((2*x)**2/(1-x)**2, 54), x) if s < 1][0]
comprobar('teoría ICE1 x', cerca(float(s1), 0.786, 0.002), f'{float(s1):.4f}')
comprobar('teoría ICE1 [H2],[HI]', cerca(float(1-s1), 0.214, 0.003) and cerca(float(2*s1), 1.57, 0.003))
comprobar('teoría ICE1 comprobación', cerca(1.57**2/0.214**2, 54, 0.02))
comprobar('teoría PCl5 Kc', cerca(0.04*0.04/0.06, 0.0267, 0.003))
s3 = [s for s in sp.solve(sp.Eq((2*x)**2/(sp.Rational(1, 10)-x), sp.Rational(46, 10000)), x) if s > 0][0]
comprobar('teoría N2O4 x', cerca(float(s3), 0.0102, 0.01), f'{float(s3):.5f}')
comprobar('teoría N2O4 [NO2], [N2O4], α', cerca(float(2*s3), 0.0203, 0.01) and cerca(float(0.1-s3), 0.0898, 0.01) and cerca(float(s3)/0.1, 0.10, 0.03))
comprobar('teoría N2O4: x es el 10 % (> 5 %)', float(s3)/0.1 > 0.05)
comprobar('teoría: √0,08', cerca(math.sqrt(0.08), 0.283, 0.003))
comprobar('teoría: 1/0,08', 1/0.08 == 12.5)
comprobar('teoría: ICE 4x²+4,6e-3x−4,6e-4', abs(float(sp.solve(4*x**2 + sp.Rational(46, 10000)*x - sp.Rational(46, 10**5), x)[-1]) - float(s3)) < 1e-9)

# ---------- constantes del simulador ----------
# van 't Hoff: ln(K2/K1) = -(ΔH/R)(1/T2 - 1/T1) → el sentido debe coincidir con el signo de ΔH
def K(T, K0, T0, dH): return K0 * math.exp(-(dH*1000/8.314) * (1/T - 1/T0))
comprobar('simulador NH3 exotérmica: K baja al subir T', K(850, 0.08, 750, -92.2) < 0.08 < K(650, 0.08, 750, -92.2))
comprobar('simulador NO2 endotérmica: K sube al subir T', K(373, 4.6e-3, 298, 57.2) > 4.6e-3 > K(280, 4.6e-3, 298, 57.2))
comprobar('simulador NO2: Kp(298) ≈ 0,113 atm (dato de tablas)', cerca(4.6e-3 * R_ATM * 298, 0.113, 0.03))
comprobar('simulador NH3: Kc(773 K) ≈ 0,06 a partir de Kp ≈ 1,45e-5 atm⁻² (dato de tablas)', cerca(1.45e-5 * (0.08206*773)**2, K(773, 0.08, 750, -92.2), 0.30), f'{1.45e-5*(0.08206*773)**2:.4f} vs {K(773,0.08,750,-92.2):.4f}')
# ΔH de formación: 2·(−46,1) = −92,2; NO2: 2·33,2 − 9,2 = +57,2; HI(g) de I2(g): 2·26,5 − 62,4 = −9,4
comprobar('entalpías', cerca(2*-46.1, -92.2, 0.001) and cerca(2*33.2 - 9.2, 57.2, 0.001) and cerca(2*26.5 - 62.4, -9.4, 0.001))

print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f in fallos: print('  FALLO:', f)
sys.exit(1 if fallos else 0)
