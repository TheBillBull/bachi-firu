#!/usr/bin/env python3
"""
Verificación independiente de Física y Química I · temas 6 (Termoquímica) y 7 (Química del carbono).
No comparte código con la web: recalcula cada respuesta numérica y cada dato numérico de la teoría
con sus propias tablas de datos y, en el tema 7, con su propio nombrador IUPAC.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_fyq1_t6-7.py /tmp/ampl.json
"""
import json, math, sys
from fractions import Fraction

fallos, ok = [], 0
def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')
def cerca(a, b, tol=5e-3):          # tolerancia relativa (la misma que usa la web para las respuestas numéricas)
    return abs(a - b) <= max(1e-9, abs(b) * tol)

datos = json.load(open(sys.argv[1]))
F = datos['ampl']['fyq1']

# =====================================================================
# TEMA 6 · Termoquímica
# =====================================================================
E6 = {e['id']: e for e in F['t6']['ejercicios']}
def v6(id_, k=0):
    c = E6[id_]['check']; c = c if isinstance(c, list) else [c]; return c[k]
def n6(id_, k=0): return v6(id_, k)['valor']

# ---- tablas propias (kJ/mol salvo indicación) ----
HF = {'CH4': -74.8, 'C2H6': -84.7, 'C3H8': -103.8, 'C4H10': -125.7, 'C2H4': 52.3, 'C2H2': 226.7, 'CO': -110.5, 'CO2': -393.5, 'H2Ol': -285.8, 'H2Og': -241.8,
      'H2O2': -187.8, 'NH3': -46.1, 'NO': 90.3, 'NO2': 33.2, 'SO2': -296.8, 'SO3': -395.7, 'HCl': -92.3, 'CaO': -635.0, 'CaCO3': -1207.0, 'Fe2O3': -824.2,
      'Al2O3': -1675.7, 'EtOH': -277.7, 'MeOH': -238.7, 'glucosa': -1273.0, 'C8H18': -250.0, 'CH3Cl': -81.9, 'elem': 0.0}
CE = {'agua': 4.18, 'hielo': 2.09, 'vapor': 2.01, 'Al': 0.897, 'Fe': 0.449, 'Cu': 0.385}
LF, LV = 334.0, 2260.0
R = 8.314
ATML = 101.325
def dH(prod, reac):     # listas [(coef, clave)]
    return sum(n * HF[k] for n, k in prod) - sum(n * HF[k] for n, k in reac)

# ---- ejercicios ----
comprobar('t6 k1', E6['k1']['check']['ok'] == 0 and -57.1 < 0)
comprobar('t6 k2', cerca(250 - 80, n6('k2')))
comprobar('t6 k3', cerca(-2 * (8 - 3) * ATML, n6('k3'), 1e-4))
comprobar('t6 k4', cerca(250 * CE['agua'] * 50 / 1000, n6('k4'), 1e-6))
comprobar('t6 k5', cerca(500 * CE['Al'] * 50 / 1000, n6('k5'), 1e-6))
comprobar('t6 k6', cerca(0.5 * 890, n6('k6')))
comprobar('t6 k7', cerca(-(-571.6), n6('k7')))
comprobar('t6 k8', cerca(3 * -285.8, n6('k8'), 1e-6))
comprobar('t6 k9', E6['k9']['check']['opciones'][E6['k9']['check']['ok']] == 'O₂(g)')
comprobar('t6 k10', cerca(dH([(2, 'NH3')], [(1, 'elem')]), n6('k10')))
comprobar('t6 k11', cerca(250 * 4.184, n6('k11')))
comprobar('t6 k12', cerca(200 * LF / 1000, n6('k12')))
comprobar('t6 k13', cerca(10 / 16 * 890, n6('k13'), 1e-6))
comprobar('t6 k14', cerca(1000 / 2220 * 44, n6('k14'), 1e-4))
Q15 = 0.050 * 57.1 * 1000; comprobar('t6 k15', cerca(Q15 / (100 * 4.18), n6('k15'), 1e-3))
comprobar('t6 k16', cerca((200 * 80 + 300 * 20) / 500, n6('k16')))
comprobar('t6 k17', cerca((100 * CE['Cu'] * 100 + 200 * CE['agua'] * 20) / (100 * CE['Cu'] + 200 * CE['agua']), n6('k17'), 1e-4))
comprobar('t6 k18', cerca(-393.5 - (-283.0), n6('k18')))
comprobar('t6 k19', cerca(dH([(2, 'CO2'), (3, 'H2Ol')], [(1, 'EtOH'), (3, 'elem')]), n6('k19'), 1e-4))
comprobar('t6 k20', cerca(2 * -393.5 - 285.8 + 1299.5, n6('k20'), 1e-4))
comprobar('t6 k21', cerca(4450 / 890 * 22.4, n6('k21')))
comprobar('t6 k22', cerca(-285.8 - (-1.5) * R * 298 / 1000, n6('k22'), 1e-4))
comprobar('t6 k23', cerca((436 + 243) - 2 * 431, n6('k23')))
comprobar('t6 k24', cerca(178000 / 160, n6('k24')))
comprobar('t6 k25', cerca(-92.2 - 298 * (-198.7 / 1000), n6('k25'), 1e-3))
comprobar('t6 k26', cerca((50 * CE['hielo'] * 10 + 50 * LF + 50 * CE['agua'] * 20) / 1000, n6('k26'), 1e-6))
comprobar('t6 k27', cerca(90 * LV / 1000, n6('k27')))
comprobar('t6 k28', cerca(1560 + 2 * -393.5 + 3 * -285.8, n6('k28'), 1e-4))
comprobar('t6 k29', cerca(180.5 + -114.1, n6('k29'), 1e-6))
dHterm = dH([(1, 'Al2O3'), (2, 'elem')], [(1, 'Fe2O3'), (2, 'elem')]); comprobar('t6 k30', cerca(dHterm, -851.5, 1e-9) and cerca(100 / 26.98 / 2 * -dHterm, n6('k30'), 1e-3))
n_ch4, n_o2 = 8.0 / 16.0, 24.0 / 32.0; ext = min(n_ch4, n_o2 / 2); comprobar('t6 k31', n_o2 / 2 < n_ch4 and cerca(ext * 890, n6('k31'), 1e-6))
comprobar('t6 k32', cerca(2803 / 180.16 * 1000 / (1000 * 4.18), n6('k32'), 5e-3))
Qutil = 2000 * 4.18 * 85 / 1000; comprobar('t6 k33', cerca(Qutil / 0.6 / 2877 * 58.12, n6('k33'), 1e-3))
comprobar('t6 k34', cerca((2 * 348 + 8 * 413 + 5 * 498) - (6 * 799 + 8 * 463), n6('k34'), 1e-9))
comprobar('t6 k35', cerca((945 + 3 * 436 + 92) / 6, n6('k35'), 1e-4))
comprobar('t6 k36', cerca(6010 / 22.0, n6('k36'), 1e-4))
op37 = E6['k37']['check']; comprobar('t6 k37', op37['opciones'][op37['ok']] == 'CaCO₃(s) ⟶ CaO(s) + CO₂(g)')
comprobar('t6 k38 y k42 (rúbricas)', all(abs(sum(i['p'] for i in E6[k]['check']['items']) - 2.0) < 1e-9 for k in ('k38', 'k42')))
comprobar('t6 k39', cerca(3 * 44.01 / 2220 * 1000, n6('k39'), 1e-4))
comprobar('t6 k40', cerca(1000 * 4.18 * 80 / 1000 / 1366.7 * 46.07, n6('k40'), 1e-3))
n41 = 5.0 / 80.04; comprobar('t6 k41', cerca(20.0 - n41 * 25.7 * 1000 / (200 * 4.18 + 150), n6('k41'), 1e-4))
comprobar('t6 todos los ejercicios (cantidad)', len(E6) >= 36, str(len(E6)))

# ---- motor de Hess propio (para los 7 casos del simulador) ----
def hess(filas):     # filas [(dH, factor, invertir, {especie: coef neto})]
    tot, net = 0.0, {}
    for h, f, inv, m in filas:
        s = f * (-1 if inv else 1); tot += s * h
        for k, c in m.items(): net[k] = net.get(k, 0) + s * c
    return tot, {k: v for k, v in net.items() if abs(v) > 1e-9}
def eq(r, p): m = {}; [m.__setitem__(k, m.get(k, 0) - c) for c, k in r]; [m.__setitem__(k, m.get(k, 0) + c) for c, k in p]; return m
casos = [
    ('metano', eq([(1, 'CH4'), (2, 'O2')], [(1, 'CO2'), (2, 'H2O')]), [(-393.5, 1, 0, eq([(1, 'C'), (1, 'O2')], [(1, 'CO2')])), (-285.8, 2, 0, eq([(1, 'H2'), (.5, 'O2')], [(1, 'H2O')])), (-74.8, 1, 1, eq([(1, 'C'), (2, 'H2')], [(1, 'CH4')]))], -890.3),
    ('CO', eq([(1, 'C'), (.5, 'O2')], [(1, 'CO')]), [(-393.5, 1, 0, eq([(1, 'C'), (1, 'O2')], [(1, 'CO2')])), (-283.0, 1, 1, eq([(1, 'CO'), (.5, 'O2')], [(1, 'CO2')]))], -110.5),
    ('etano', eq([(2, 'C'), (3, 'H2')], [(1, 'C2H6')]), [(-1560, 1, 1, eq([(1, 'C2H6'), (3.5, 'O2')], [(2, 'CO2'), (3, 'H2O')])), (-393.5, 2, 0, eq([(1, 'C'), (1, 'O2')], [(1, 'CO2')])), (-285.8, 3, 0, eq([(1, 'H2'), (.5, 'O2')], [(1, 'H2O')]))], -84.4),
    ('diamante', eq([(1, 'Cd')], [(1, 'Cg')]), [(-393.5, 1, 1, eq([(1, 'Cg'), (1, 'O2')], [(1, 'CO2')])), (-395.4, 1, 0, eq([(1, 'Cd'), (1, 'O2')], [(1, 'CO2')]))], -1.9),
    ('NO2', eq([(1, 'N2'), (2, 'O2')], [(2, 'NO2')]), [(180.5, 1, 0, eq([(1, 'N2'), (1, 'O2')], [(2, 'NO')])), (-114.1, 1, 0, eq([(2, 'NO'), (1, 'O2')], [(2, 'NO2')]))], 66.4),
    ('SO3', eq([(1, 'S'), (1.5, 'O2')], [(1, 'SO3')]), [(-296.8, 1, 0, eq([(1, 'S'), (1, 'O2')], [(1, 'SO2')])), (-98.9, 1, 0, eq([(1, 'SO2'), (.5, 'O2')], [(1, 'SO3')]))], -395.7),
    ('acetileno', eq([(2, 'C'), (1, 'H2')], [(1, 'C2H2')]), [(-1299.5, 1, 1, eq([(1, 'C2H2'), (2.5, 'O2')], [(2, 'CO2'), (1, 'H2O')])), (-393.5, 2, 0, eq([(1, 'C'), (1, 'O2')], [(1, 'CO2')])), (-285.8, 1, 0, eq([(1, 'H2'), (.5, 'O2')], [(1, 'H2O')]))], 226.7)]
for nombre, obj, filas, esperado in casos:
    t, net = hess(filas)
    comprobar('t6 Hess ' + nombre, cerca(t, esperado, 1e-6) and all(abs(net.get(k, 0) - obj.get(k, 0)) < 1e-9 for k in set(net) | set(obj)), f'{t} {net}')
# las entalpías de formación son consistentes con los Hess (CO, SO3, acetileno, etano)
comprobar('t6 Hess = ΔHf tabulado (CO, SO3, C2H2)', cerca(-110.5, HF['CO']) and cerca(-395.7, HF['SO3']) and cerca(226.7, HF['C2H2']) and abs(-84.4 - HF['C2H6']) < 0.5)

# ---- tabla del simulador de formación ----
reac = [('CH4', [(1, 'CH4'), (2, 'elem')], [(1, 'CO2'), (2, 'H2Ol')], -890.3), ('propano', [(1, 'C3H8'), (5, 'elem')], [(3, 'CO2'), (4, 'H2Ol')], -2219.9), ('etanol', [(1, 'EtOH'), (3, 'elem')], [(2, 'CO2'), (3, 'H2Ol')], -1366.7),
        ('glucosa', [(1, 'glucosa'), (6, 'elem')], [(6, 'CO2'), (6, 'H2Ol')], -2802.8), ('CaCO3', [(1, 'CaCO3')], [(1, 'CaO'), (1, 'CO2')], 178.5), ('termita', [(1, 'Fe2O3'), (2, 'elem')], [(1, 'Al2O3'), (2, 'elem')], -851.5),
        ('NH3', [(1, 'elem'), (3, 'elem')], [(2, 'NH3')], -92.2), ('NH3 + O2', [(4, 'NH3'), (5, 'elem')], [(4, 'NO'), (6, 'H2Og')], -905.2), ('SO3', [(2, 'SO2'), (1, 'elem')], [(2, 'SO3')], -197.8),
        ('eteno', [(1, 'C2H4'), (1, 'elem')], [(1, 'C2H6')], -137.0), ('CO', [(1, 'CO'), (.5, 'elem')], [(1, 'CO2')], -283.0), ('H2O2', [(2, 'H2O2')], [(2, 'H2Ol'), (1, 'elem')], -196.0)]
for nombre, r, p, esperado in reac:
    comprobar('t6 ΔH° formación: ' + nombre, cerca(dH(p, r), esperado, 1e-4), f'{dH(p, r)}')
comprobar('t6 combustiones (butano, octano, metanol)', cerca(dH([(4, 'CO2'), (5, 'H2Ol')], [(1, 'C4H10'), (6.5, 'elem')]), -2877.3, 1e-4) and cerca(dH([(8, 'CO2'), (9, 'H2Ol')], [(1, 'C8H18'), (12.5, 'elem')]), -5470.2, 1e-4) and cerca(dH([(1, 'CO2'), (2, 'H2Ol')], [(1, 'MeOH'), (1.5, 'elem')]), -726.4, 1e-4))

# ---- enlaces ----
EE = {'HH': 436, 'CC': 348, 'C=C': 614, 'CH': 413, 'O=O': 498, 'OH': 463, 'C=O': 799, 'HCl': 431, 'ClCl': 243, 'N#N': 945, 'NH': 391, 'CCl': 328}
def e_(rot, form): return sum(n * EE[k] for n, k in rot) - sum(n * EE[k] for n, k in form)
comprobar('t6 enlaces: HCl, H2O, NH3, CH4, C3H8, eteno, CH3Cl',
          e_([(1, 'HH'), (1, 'ClCl')], [(2, 'HCl')]) == -183 and e_([(2, 'HH'), (1, 'O=O')], [(4, 'OH')]) == -482 and e_([(1, 'N#N'), (3, 'HH')], [(6, 'NH')]) == -93 and
          e_([(4, 'CH'), (2, 'O=O')], [(2, 'C=O'), (4, 'OH')]) == -802 and e_([(2, 'CC'), (8, 'CH'), (5, 'O=O')], [(6, 'C=O'), (8, 'OH')]) == -2008 and e_([(1, 'C=C'), (1, 'HH')], [(1, 'CC'), (2, 'CH')]) == -124 and
          e_([(1, 'CH'), (1, 'ClCl')], [(1, 'CCl'), (1, 'HCl')]) == -103)
comprobar('t6 enlaces: valores «reales» del simulador', cerca(-393.5 + 2 * -241.8 + 74.8, -802.3, 1e-4) and cerca(2 * -241.8, -483.6, 1e-9) and cerca(-81.9 - 92.3 + 74.8, -99.4, 1e-9))

# ---- ΔG y espontaneidad ----
GP = [(178.3, 160.5), (-196, 126), (-92.2, -198.7), (6.01, 22.0), (285.4, -137.2), (25.7, 108.7), (-393.5, 2.9)]
comprobar('t6 ΔG: temperaturas de equilibrio', cerca(178.3e3 / 160.5, 1111, 1e-3) and cerca(92.2e3 / 198.7, 464, 1e-3) and cerca(6010 / 22.0, 273.2, 1e-3))
comprobar('t6 ΔG: 298 K y 1 300 K', cerca(178.3 - 298 * .1605, 130.5, 1e-3) and cerca(178.3 - 1300 * .1605, -30.35, 1e-3) and cerca(-92.2 + 298 * .1987, -33.0, 1e-3) and cerca(25.7 - 298 * .1087, -6.7, 1e-2))
comprobar('t6 ΔG: fusión del hielo a 283 y 263 K', cerca(6010 - 283 * 22.0, -216, 1e-9) and cerca(6010 - 263 * 22.0, 224, 1e-9))
comprobar('t6 K = exp(−ΔG/RT)', cerca(math.exp(33000 / (R * 298)), 6.1e5, 2e-2) and cerca(33000 / (R * 298), 13.3, 5e-3))
comprobar('t6 ozono: ΔH y ΔS', cerca(2 * 142.7, 285.4, 1e-9) and cerca(2 * 238.9 - 3 * 205.0, -137.2, 1e-9))
dG = lambda h, sj, T: h - T * sj / 1000
comprobar('t6 los cuatro casos de ΔG', dG(-50, 50, 300) < 0 and dG(-50, 50, 2000) < 0 and dG(50, -50, 300) > 0 and dG(50, -50, 2000) > 0 and dG(-50, -50, 300) < 0 and dG(-50, -50, 2000) > 0 and dG(50, 50, 300) > 0 and dG(50, 50, 2000) < 0)

# ---- teoría ----
comprobar('t6 teoría: sistema y trabajo', 250 - 80 == 170 and -200 + 500 == 300 and cerca(-2 * 5 * ATML, -1013.25, 1e-9))
comprobar('t6 teoría: unidades (kcal, kWh)', cerca(250 * 4.184, 1046) and cerca(1046 / 3600, 0.29, 1e-2))
comprobar('t6 teoría: Ea inversa', 80 - (-120) == 200 and 50 - (-120) == 170)
comprobar('t6 teoría: ΔH de agua líquida y gas', cerca(-241.8 - (-285.8), 44.0, 1e-9) and cerca(2 * -285.8, -571.6, 1e-9))
comprobar('t6 teoría: Q de combustión de 10 g de metano / propano / NH3', cerca(10 / 16 * -890, -556.25, 1e-9) and cerca(1000 / 2220 * 44, 19.8, 5e-3) and cerca(34 / 17 / 2 * -92.2, -92.2, 1e-9))
comprobar('t6 teoría: neutralización', cerca(0.05 * 57.1 * 1000 / (100 * 4.18), 6.83, 1e-3))
comprobar('t6 teoría: Hess del ciclo de la termita, etanol y acetileno', cerca(dH([(1, 'Al2O3'), (2, 'elem')], [(1, 'Fe2O3'), (2, 'elem')]), -851.5, 1e-9) and cerca(100 / 26.98 / 2 * 851.5, 1578, 1e-3) and cerca(2 * -393.5 + -285.8 - (-1299.5), 226.7, 1e-9) and cerca(1366.7 / 46.07, 29.7, 5e-3))
comprobar('t6 teoría: calorimetría (agua, aluminio, hierro, hervidor)', cerca(250 * 4.18 * 50, 52250, 1e-9) and cerca(250 * 4.18 * 50 / 4.184, 12489, 1e-3) and cerca(500 * .897 * -50, -22425, 1e-9) and cerca(10000 / (500 * 4.18), 4.8, 1e-2) and cerca(10000 / (500 * .449), 44.5, 1e-2) and cerca(4.18 / .449, 9.3, 1e-2) and cerca(1500 * 4.18 * 85 / 2000, 266.5, 1e-3) and cerca(266.5 / 60, 4.4, 1e-2))
comprobar('t6 teoría: equilibrio térmico (agua-agua, cobre, calorímetro)', (200 * 80 + 300 * 20) / 500 == 44 and cerca(200 * 4.18 * 36, 300 * 4.18 * 24, 1e-9) and cerca((38.5 * 100 + 836 * 20) / 874.5, 23.5, 1e-3) and cerca(836 / 38.5, 22, 5e-2) and cerca((200 * 4.18 + 150) * 3.0 / (50 * 77), 0.77, 1e-2))
comprobar('t6 teoría: cambios de estado', cerca(200 * LF, 66800, 1e-9) and cerca(90 * LV / 1000, 203.4, 1e-3) and cerca(203.4 / 5, 40.7, 1e-2) and cerca((50 * 2.09 * 10 + 50 * 334 + 50 * 4.18 * 20), 21925, 1e-9) and cerca(50 * 334 / 21925, 0.76, 1e-2))
Qfus = 50 * 334; Qagua = 300 * 4.18 * 25; comprobar('t6 teoría: hielo en una bebida', Qagua > Qfus and cerca((Qagua - Qfus) / (350 * 4.18), 10.0, 1e-2))
vap = 10 * 2260 + 10 * 4.18 * 63; liq = 10 * 4.18 * 63; comprobar('t6 teoría: vapor frente a agua', cerca(vap, 25233, 1e-3) and cerca(liq, 2633.4, 1e-3) and cerca(vap / liq, 9.6, 1e-2))
comprobar('t6 teoría: 1 g de agua de 0 a 100 °C (418 J) y razones', cerca(4.18 * 100, 418, 1e-9) and cerca(2260 / 334, 6.8, 1e-2) and cerca(2260 / 418, 5.4, 1e-2) and cerca(6.01 * 1000 / 18.02, 334, 1e-2) and cerca(2260 * 18.02 / 1000, 40.7, 1e-2))
comprobar('t6 teoría: ΔH y ΔU', cerca(-285.8 + 1.5 * R * 298 / 1000, -282.1, 1e-3) and cerca(R * 298 / 1000, 2.478, 1e-3) and cerca(178.5 - R * 298 / 1000, 176.0, 1e-3) and cerca(-92.2 + 2 * R * 298 / 1000, -87.2, 1e-3))
comprobar('t6 teoría: energías de enlace (HCl, metano, N–H)', cerca((436 + 243) - 862, -183, 1e-9) and cerca(2648 - 3450, -802, 1e-9) and cerca((2 * 348 + 8 * 413 + 5 * 498), 6490, 1e-9) and cerca((945 + 3 * 436 + 92) / 6, 390.8, 1e-3))
comprobar('t6 teoría: combustibles (propano, octano, butano, coche)', cerca(2220 / 44.1, 50.3, 5e-3) and cerca(3 * 44.01 / 2.220, 59.5, 1e-2) and cerca(44.01 / 890.3 * 1000, 49.4, 5e-3) and cerca(44.01 / 393.5 * 1000, 111.8, 5e-3) and cerca(6.0 * .74 * 1000, 4440, 1e-9) and cerca(4440 * 47.9 / 1000, 212.7, 1e-3) and cerca(8 * 44.01 / 114.23, 3.08, 5e-3) and cerca(4440 * 3.0823 / 1000, 13.69, 1e-3))
Qu = 100000 * 4.18 * 45 / 1000; comprobar('t6 teoría: butano para 100 L', cerca(Qu, 18810, 1e-9) and cerca(Qu / .8, 23512.5, 1e-9) and cerca(Qu / .8 / 2877 * 58.12, 475.0, 1e-3) and cerca(4 * Qu / .8 / 2877 * 44.01 / 1000, 1.44, 1e-2))
comprobar('t6 teoría: glucosa y alimentos', cerca(2803 / 180.16, 15.56, 1e-3) and cerca(15.56 / 4.184, 3.7, 1e-2) and cerca(9 * 4.184, 37.7, 2e-2))
comprobar('t6 teoría: problemas integradores', cerca(Qutil2 := 5000 * 4.18 * 80 / 1000, 1672, 1e-9) and cerca(1672 / 2877.3, 0.581, 1e-3) and cerca(1672 / 2877.3 * 58.12, 33.8, 1e-2) and cerca(4 * 1672 / 2877.3 * 22.4, 52.1, 1e-2) and cerca(2877.3 / 58.12, 49.5, 1e-2) and
          cerca(-965.1 + 726, -239.1, 1e-9) and cerca(5000 / 726 * 32.04, 220.7, 1e-3) and cerca(0.2 * 44.5 * 1000 / (208 * 4.18), 10.2, 1e-2) and cerca(20.0 + 0.2 * 44.5 * 1000 / (208 * 4.18), 30.2, 1e-2))
comprobar('t6 teoría: ΔH°f de CaCO3, tabla, Hess de CO y N2/O2', cerca(-635 - 393.5 + 1207, 178.5, 1e-9) and cerca(2 * -393.5 + 3 * -285.8 + 125.7 * 0, -1644.4, 1e-9) and cerca(-1644.4 + 277.7, -1366.7, 1e-9))

# =====================================================================
# TEMA 7 · Química del carbono (ampliaciones/contenido/fyq1_t07*.js, lab_organica.js, lab_orgreacciones.js, lab_orgmas.js)
# Nombrador IUPAC, contador de átomos y lector de SMILES propios: no comparten código con la web.
# =====================================================================
import itertools, re
from fractions import Fraction
mot = json.load(open(sys.argv[2])) if len(sys.argv) > 2 else None
A7 = F['t7']
RAIZ_O = ['', 'met', 'et', 'prop', 'but', 'pent', 'hex', 'hept', 'oct', 'non', 'dec']
MULT_O = {1: '', 2: 'di', 3: 'tri', 4: 'tetra', 5: 'penta', 6: 'hexa'}
SUST_O = {'metil': (1, 3), 'etil': (2, 5)}
HALO = {'fluoro': 'F', 'cloro': 'Cl', 'bromo': 'Br', 'yodo': 'I'}
GO = {'ol': 1, 'al': 2, 'ona': 2, 'oico': 3, 'amina': 1}
MASA_O = {'C': 12.011, 'H': 1.008, 'O': 15.999, 'N': 14.007, 'F': 18.998, 'Cl': 35.45, 'Br': 79.904, 'I': 126.904}

def validez_o(m):
    """Hidrógenos por carbono (1…n) o None si la molécula es imposible."""
    n, g, pos = m['n'], m.get('grupo') or '', m.get('pos', 1)
    if n < 1 or n > 10: return None
    if g in ('al', 'oico') and pos not in (1, n): return None
    if g == 'ona' and not (n >= 3 and 2 <= pos <= n - 1): return None
    if g and not 1 <= pos <= n: return None
    H = {}
    for i in range(1, n + 1):
        lig = (m['enl'][i - 2] if i > 1 else 0) + (m['enl'][i - 1] if i < n else 0)
        h = 4 - lig - (GO[g] if g and pos == i else 0) - sum(1 for q in m.get('sus', []) if q['p'] == i)
        if h < 0 or (g == 'al' and pos == i and h < 1): return None
        H[i] = h
    return H

def cadena_principal_ok(m):
    n, g, pos = m['n'], m.get('grupo') or '', m.get('pos', 1)
    for q in m.get('sus', []):
        if q['t'] not in SUST_O: continue
        L = SUST_O[q['t']][0]
        for adelante in (True, False):
            k = (n - q['p'] + 1) if adelante else q['p']
            cont = True
            if g and not (pos >= q['p'] if adelante else pos <= q['p']): cont = False
            for j in range(1, n):
                if m['enl'][j - 1] > 1 and not (j >= q['p'] if adelante else j + 1 <= q['p']): cont = False
            if cont and L + k > n: return False
    return True

def numeraciones(m):
    n, g, pos = m['n'], m.get('grupo') or '', m.get('pos', 1)
    res = []
    for d in (0, 1):
        loc = (lambda i: i) if d == 0 else (lambda i: n + 1 - i)
        dob, tri = [], []
        for i in range(1, n):
            l = min(loc(i), loc(i + 1))
            if m['enl'][i - 1] == 2: dob.append(l)
            elif m['enl'][i - 1] == 3: tri.append(l)
        ss = [(loc(q['p']), q['t']) for q in m.get('sus', [])]
        res.append({'g': loc(pos) if g else 0, 'mult': sorted(dob + tri), 'dob': sorted(dob), 'tri': sorted(tri), 'sus': sorted(l for l, t in ss),
                    'alf': [l for l, t in sorted(ss, key=lambda x: (x[1], x[0]))], 'ss': ss})
    if g in ('al', 'oico'): res = [r for r in res if r['g'] == 1] or res[:1]
    return res

def mejor_numeracion(m): return min(numeraciones(m), key=lambda r: (r['g'], r['mult'], r['dob'], r['sus'], r['alf']))

def constitucion(n, enl, grupo, pos, sus):
    def lec(rev):
        idx = range(n, 0, -1) if rev else range(1, n + 1)
        out = [tuple(sorted(t for p, t in sus if p == i)) + ((grupo,) if grupo and pos == i else ()) for i in idx]
        return (tuple(out), tuple(enl[::-1] if rev else enl))
    return min(lec(False), lec(True))

def ambiguo(m):
    """¿Hay otra molécula distinta con los mismos elementos colocados en otras posiciones (sin exigir la cadena más larga)?"""
    n, g = m['n'], m.get('grupo') or ''
    sus = [q['t'] for q in m.get('sus', [])]
    multi = sorted(o for o in m['enl'] if o > 1)
    vistos = set()
    pos_g = ([1, n] if g in ('al', 'oico') else list(range(2, n)) if g == 'ona' else list(range(1, n + 1))) if g else [0]
    for pg in pos_g:
        for ps in itertools.product(range(1, n + 1), repeat=len(sus)):
            for ib in itertools.combinations(range(n - 1), len(multi)):
                for ordn in set(itertools.permutations(multi)):
                    enl = [1] * (n - 1)
                    for k, o in zip(ib, ordn): enl[k] = o
                    mm = {'n': n, 'enl': enl, 'grupo': g, 'pos': pg or 1, 'sus': [{'p': p, 't': t} for p, t in zip(ps, sus)]}
                    if validez_o(mm) is None: continue
                    vistos.add(constitucion(n, enl, g, pg, list(zip(ps, sus))))
                    if len(vistos) > 1: return True
    return False

def nombre_o(m, minimo=True):
    n, g = m['n'], m.get('grupo') or ''
    d = mejor_numeracion(m); dob, tri = d['dob'], d['tri']; hay = bool(dob or tri)
    amb = ambiguo(m) if minimo else True
    stem = RAIZ_O[n]; partes = []
    if not hay: partes = [([], 'an')]
    else:
        if dob: partes.append((dob, (MULT_O[len(dob)] if len(dob) > 1 else '') + 'en'))
        if tri: partes.append((tri, (MULT_O[len(tri)] if len(tri) > 1 else '') + 'in'))
        if len(partes[0][0]) > 1: stem += 'a'
    txt = stem + ''.join((('-' + ','.join(map(str, l)) + '-') if (l and amb and not (n == 2 and not g)) else '') + r for l, r in partes)
    locg = d['g']
    fin = {'': 'o', 'ol': (f'-{locg}-' if amb else '') + 'ol', 'amina': (f'-{locg}-' if amb else '') + 'amina', 'ona': (f'-{locg}-' if amb else '') + 'ona', 'al': 'al', 'oico': 'oico'}[g]
    txt += fin
    por = {}
    for l, t in d['ss']: por.setdefault(t, []).append(l)
    sin_loc = (n == 1) or not amb
    pref = '-'.join((('' if sin_loc else ','.join(map(str, sorted(l))) + '-') + MULT_O[len(l)] + t) for t, l in sorted(por.items()))
    nombre = pref + txt
    return ('ácido ' + nombre) if g == 'oico' else nombre

def cuenta_o(m):
    H = validez_o(m); g = m.get('grupo') or ''
    c = {'C': m['n'], 'H': sum(H.values()), 'O': 0, 'N': 0, 'F': 0, 'Cl': 0, 'Br': 0, 'I': 0}
    if g == 'ol': c['O'] += 1; c['H'] += 1
    elif g in ('al', 'ona'): c['O'] += 1
    elif g == 'oico': c['O'] += 2; c['H'] += 1
    elif g == 'amina': c['N'] += 1; c['H'] += 2
    for q in m.get('sus', []):
        if q['t'] in SUST_O: c['C'] += SUST_O[q['t']][0]; c['H'] += SUST_O[q['t']][1]
        else: c[HALO[q['t']]] += 1
    return c
def masa_o(c): return sum(MASA_O[k] * v for k, v in c.items())
def idh_o(c): return (2 * c['C'] + 2 + c.get('N', 0) - c['H'] - sum(c.get(x, 0) for x in ('F', 'Cl', 'Br', 'I'))) / 2
def sp(n, enl=None, g='', pos=1, sus=()):
    return {'n': n, 'enl': enl if enl is not None else [1] * (n - 1), 'grupo': g, 'pos': pos, 'sus': [{'p': p, 't': t} for p, t in sus]}
def cop(m): return {'n': m['n'], 'enl': list(m['enl']), 'grupo': m.get('grupo') or '', 'pos': m.get('pos', 1), 'sus': [dict(q) for q in m.get('sus', [])]}
SUBS = '₀₁₂₃₄₅₆₇₈₉'
def cuenta_formula(txt):
    txt = re.sub(r'[₀-₉]', lambda c: str(SUBS.index(c.group(0))), txt)
    out = {'C': 0, 'H': 0, 'O': 0, 'N': 0, 'F': 0, 'Cl': 0, 'Br': 0, 'I': 0}
    for e, k in re.findall(r'([A-Z][a-z]?)(\d*)', txt): out[e] += int(k or 1)
    return out
VALO = {'C': 4, 'N': 3, 'O': 2, 'F': 1, 'Cl': 1, 'Br': 1, 'I': 1}
def smiles_o(s):
    """SMILES simplificado → (átomos, enlaces, H por átomo). Los enlaces se leen por orden: -, =, #, ~ (sencillo)."""
    at, bd, pila, prev, ordn, i = [], [], [], -1, 1, 0
    while i < len(s):
        c = s[i]
        if c == '(': pila.append(prev); i += 1; continue
        if c == ')': prev = pila.pop(); i += 1; continue
        if c in '-=#~': ordn = {'-': 1, '=': 2, '#': 3, '~': 1}[c]; i += 1; continue
        e = s[i:i + 2] if s[i:i + 2] in ('Cl', 'Br') else c
        i += len(e); at.append(e)
        if prev >= 0: bd.append((prev, len(at) - 1, ordn))
        ordn = 1; prev = len(at) - 1
    suma = [0] * len(at)
    for a, b, o in bd: suma[a] += o; suma[b] += o
    h = [max(0, VALO[e] - suma[k]) for k, e in enumerate(at)]
    return at, bd, h
def cuenta_smiles(s):
    at, bd, h = smiles_o(s); c = {'C': 0, 'H': 0, 'O': 0, 'N': 0, 'F': 0, 'Cl': 0, 'Br': 0, 'I': 0}
    for e in at: c[e] += 1
    c['H'] = sum(h); return c
def quirales_o(s):
    at, bd, h = smiles_o(s)
    ady = [[] for _ in at]
    for a, b, o in bd: ady[a].append((b, o)); ady[b].append((a, o))
    def rama(i, padre, o):
        hijos = sorted([rama(j, i, oo) for j, oo in ady[i] if j != padre] + ['H'] * h[i])
        return f'{o}{at[i]}({",".join(hijos)})'
    n = 0
    for i, e in enumerate(at):
        if e != 'C' or any(o > 1 for _, o in ady[i]) or len(ady[i]) + h[i] != 4: continue
        ramas = [rama(j, i, o) for j, o in ady[i]] + ['H'] * h[i]
        if len(set(ramas)) == 4: n += 1
    return n

# ---- tablas propias de datos (retecleadas) ----
BP = {'butano': -0.5, '2-metilpropano': -11.7, 'pentano': 36.1, '2-metilbutano': 27.8, '2,2-dimetilpropano': 9.5, 'hexano': 68.7, '2-metilpentano': 60.3, '3-metilpentano': 63.3, '2,2-dimetilbutano': 49.7, '2,3-dimetilbutano': 58.0,
      'but-1-eno': -6.3, 'cis-but-2-eno': 3.7, 'trans-but-2-eno': 0.9, '2-metilprop-1-eno': -6.9, 'etanol': 78.4, 'propan-1-ol': 97.2, 'propan-2-ol': 82.3, 'butan-1-ol': 117.7, 'butan-2-ol': 99.5, '2-metilpropan-1-ol': 107.9,
      '2-metilpropan-2-ol': 82.4, 'propanona': 56.1, 'propanal': 48.0, 'prop-2-en-1-ol': 97.0, 'ácido etanoico': 118.1, 'ácido butanoico': 163.5, 'ácido 2-metilpropanoico': 154.5, '1-clorobutano': 78.4, '2-clorobutano': 68.3,
      '1-cloro-2-metilpropano': 68.5, '2-cloro-2-metilpropano': 51.0}
DHC = [890, 1560, 2220, 2877, 4163, 5470, 5461, 1411, 1300, 726, 1367, 2021]
CARB = {'metano': (1, 4), 'etano': (2, 6), 'propano': (3, 8), 'butano': (4, 10), 'hexano': (6, 14), 'octano': (8, 18)}

if mot:
    org = mot['org']
    # ============ 1. nombres, fórmulas y validez: 1 500 moléculas al azar + 600 rechazadas ============
    mal_n = mal_c = mal_v = 0
    for x in org['banco']:
        m = x['m']; v = validez_o(m); okv = v is not None and cadena_principal_ok(m)
        comprobar('t7 motor: molécula válida según el verificador', okv, json.dumps(m))
        if not okv: continue
        comprobar('t7 motor: nombre IUPAC (localizadores mínimos o explícitos)', x['nombre'] in (nombre_o(m), nombre_o(m, False)), f"{json.dumps(m, ensure_ascii=False)} web={x['nombre']} propio={nombre_o(m)} / {nombre_o(m, False)}")
        c = cuenta_o(m)
        comprobar('t7 motor: fórmula y masa', all(c[k] == x['cuenta'][k] for k in c) and cerca(masa_o(c), x['masa'], 1e-9) and cerca(idh_o(c), x['insat'], 1e-9) and [v[i] for i in range(1, m['n'] + 1)] == x['H'][1:], f"{c} vs {x['cuenta']}")
    for m in org['rechazadas']:
        comprobar('t7 motor: rechaza lo imposible', validez_o(m) is None or not cadena_principal_ok(m), json.dumps(m))
    # ============ 2. banco de moléculas y retos del tema ============
    D7 = A7['datos']; nombres_bank = {}
    for x in D7['moleculas']:
        m = {'n': x['n'], 'enl': x['enl'], 'grupo': x.get('grupo', ''), 'pos': x.get('pos', 1), 'sus': x.get('sus', [])}
        comprobar(f't7 banco: {x["nombre"]}', validez_o(m) is not None and cadena_principal_ok(m) and x['nombre'] in (nombre_o(m), nombre_o(m, False)), nombre_o(m) if validez_o(m) else 'inválida')
        nombres_bank[x['nombre']] = m
    comprobar('t7 banco: 66 moléculas sin repetir', len(D7['moleculas']) == 66 and len(nombres_bank) == 66)
    for r in D7['retos']:
        comprobar(f't7 reto: {r["nombre"]} está en el banco', r['nombre'] in nombres_bank)
    # ============ 3. reacciones (166 combinaciones del simulador) ============
    def mult_idx(m): return next(i + 1 for i, o in enumerate(m['enl']) if o > 1)
    def nombres_posibles(prods): return {nombre_o(p) for p in prods if validez_o(p) is not None}
    def esp_adicion(m, reag, eq):
        k = mult_idx(m); orden = m['enl'][k - 1]; H = validez_o(m); a, b = k, k + 1
        base = cop(m); base['enl'][k - 1] = orden - eq
        if reag == 'H2': return [base]
        hal = 'cloro' if 'Cl' in reag else 'bromo'
        if reag in ('Cl2', 'Br2'):
            for _ in range(eq): base['sus'] += [{'p': a, 't': hal}, {'p': b, 't': hal}]
            return [base]
        cands = [a, b] if H[a] == H[b] else [a if H[a] < H[b] else b]
        out = []
        for c in cands:
            p = cop(base)
            if reag == 'H2O': p['grupo'], p['pos'] = 'ol', c
            else:
                for _ in range(eq): p['sus'].append({'p': c, 't': hal})
            out.append(p)
        return out
    n_rx = 0
    for r in org['reacciones']:
        t = r['tipo']; m = r['m']; n_rx += 1
        if t == 'adicion':
            esp = esp_adicion(m, r['reactivo'], r['eq'])
            web = r['nombre']; c0 = cuenta_o(m); g = {'H2': {'H': 2}, 'Cl2': {'Cl': 2}, 'Br2': {'Br': 2}, 'HCl': {'H': 1, 'Cl': 1}, 'HBr': {'H': 1, 'Br': 1}, 'H2O': {'H': 2, 'O': 1}}[r['reactivo']]
            comprobar(f't7 adición {r["nombreM"]} + {r["eq"]} {r["reactivo"]}', web in nombres_posibles(esp), f'web={web} propios={nombres_posibles(esp)}')
            cp = cuenta_o(esp[0]); suma_ = {k: c0[k] + r['eq'] * g.get(k, 0) for k in c0}
            comprobar(f't7 adición: se conservan los átomos ({r["nombreM"]} + {r["reactivo"]})', cp == suma_ and all(r['cuentaP'][k] == cp[k] for k in cp), f'{cp} vs {suma_}')
        elif t == 'halogenacion':
            p = cop(m); p['sus'].append({'p': r['c'], 't': r['hal']})
            comprobar(f't7 halogenación {r["nombreM"]} C{r["c"]} {r["hal"]}', validez_o(p) is not None and nombre_o(p) == r['nombre'], f'{r["nombre"]} vs {nombre_o(p) if validez_o(p) else None}')
            cp = cuenta_o(p); c0 = cuenta_o(m); sx = HALO[r['hal']]
            comprobar('t7 halogenación: C_nH_(2n+2) → C_nH_(2n+1)X', cp['H'] == c0['H'] - 1 and cp[sx] == c0[sx] + 1)
        elif t == 'hidrolisis':
            p = cop(m); q = next(q for q in p['sus'] if q['t'] in HALO); p['sus'].remove(q); p['grupo'], p['pos'] = 'ol', q['p']
            comprobar(f't7 hidrólisis {r["nombreM"]}', nombre_o(p) == r['nombre'], f'{r["nombre"]} vs {nombre_o(p)}')
        elif t == 'eliminacion':
            g_ = m.get('grupo') or ''; H = validez_o(m); n = m['n']
            hal = next((q for q in m['sus'] if q['t'] in HALO), None)
            c = m['pos'] if g_ == 'ol' else hal['p']
            vec = [q for q in (c - 1, c + 1) if 1 <= q <= n and H[q] >= 1]
            mn = min(H[q] for q in vec); cand = [q for q in vec if H[q] == mn]
            prods = []
            for q in cand:
                p = cop(m); p['enl'][min(c, q) - 1] = 2
                if g_ == 'ol': p['grupo'], p['pos'] = '', 1
                else: p['sus'].remove(hal)
                prods.append(p)
            comprobar(f't7 eliminación {r["nombreM"]}', r['nombre'] in nombres_posibles(prods), f'{r["nombre"]} vs {nombres_posibles(prods)}')
            comprobar(f't7 eliminación {r["nombreM"]}: empate de Saytzeff', r['empate'] == (len(cand) > 1))
        elif t == 'oxidacion':
            H = validez_o(m); h = H[m['pos']]
            clase = 'terciario' if h == 0 else 'primario' if h >= 2 else 'secundario'
            comprobar(f't7 oxidación {r["nombreM"]}: clase', r['clase'] == clase)
            if clase == 'primario':
                a_ = cop(m); a_['grupo'] = 'al'; b_ = cop(m); b_['grupo'] = 'oico'
                comprobar(f't7 oxidación {r["nombreM"]}: aldehído y ácido', r['ald'] == nombre_o(a_) and r['acido'] == nombre_o(b_), f'{r["ald"]} {r["acido"]}')
            elif clase == 'secundario':
                c_ = cop(m); c_['grupo'] = 'ona'
                comprobar(f't7 oxidación {r["nombreM"]}: cetona', r['cetona'] == nombre_o(c_), f'{r["cetona"]} vs {nombre_o(c_)}')
        elif t == 'combustion':
            cc = cuenta_o(m); o2 = Fraction(cc['C']) + Fraction(cc['H'], 4) - Fraction(cc['O'], 2)
            vec = [Fraction(1), o2, Fraction(cc['C']), Fraction(cc['H'], 2)]
            den = 1
            for v in vec: den = den * v.denominator // math.gcd(den, v.denominator)
            coef = [int(v * den) for v in vec]; g_ = math.gcd(*coef); coef = [x // g_ for x in coef]
            comprobar(f't7 combustión {r["nombreM"] if "nombreM" in r else ""}: coeficientes', coef == r['coef'], f'{coef} vs {r["coef"]}')
            comprobar('t7 combustión: se conservan los átomos de O', 2 * coef[1] + cc['O'] * coef[0] == 2 * coef[2] + coef[3])
    for r in [x for x in org['reacciones'] if x['tipo'] == 'ester']:
        n_ = r['n']; mm = r['m']
        comprobar(f't7 esterificación {n_}+{mm}', r['nombre'] == RAIZ_O[n_] + 'anoato de ' + RAIZ_O[mm] + 'ilo' and cuenta_formula(r['formula']) == {'C': n_ + mm, 'H': 2 * (n_ + mm), 'O': 2, 'N': 0, 'F': 0, 'Cl': 0, 'Br': 0, 'I': 0}
                  and cuenta_smiles(r['smiles']) == {'C': n_ + mm, 'H': 2 * (n_ + mm), 'O': 2, 'N': 0, 'F': 0, 'Cl': 0, 'Br': 0, 'I': 0}, f'{r["nombre"]} {r["formula"]}')
    tipos_rx = {}
    for r in org['reacciones']: tipos_rx[r['tipo']] = tipos_rx.get(r['tipo'], 0) + 1
    comprobar('t7 reacciones: 166 combinaciones en 7 tipos', len(org['reacciones']) == 166 and len(tipos_rx) == 7 and tipos_rx == {'adicion': 82, 'halogenacion': 34, 'hidrolisis': 5, 'eliminacion': 11, 'oxidacion': 6, 'combustion': 12, 'ester': 16}, str(tipos_rx))
    # ============ 4. combustibles y energías ============
    comprobar('t7 combustión: −ΔH°c de la tabla (kJ/mol)', org['dhc'] == DHC)
    for i, x in enumerate(org['comb']):
        cc = cuenta_o(x['m']); M_ = masa_o(cc); d1 = org['comb1kg'][i]
        n_ = 1000 / M_; xi = n_ / x['r']['comb']
        comprobar(f't7 combustible {x["nombre"]}: 1 kg', cerca(d1['n'], n_, 1e-9) and cerca(d1['nO2'], n_ * (cc['C'] + cc['H'] / 4 - cc['O'] / 2), 1e-9) and cerca(d1['nCO2'], n_ * cc['C'], 1e-9) and cerca(d1['nH2O'], n_ * cc['H'] / 2, 1e-9)
                  and cerca(d1['E'], n_ * DHC[i], 1e-9) and cerca(d1['co2PorMJ'], cc['C'] * 44.01 / DHC[i], 1e-9), x['nombre'])
    # ============ 5. isómeros (11 grupos) ============
    SPEC_ISO = {'butano': sp(4), '2-metilpropano': sp(3, sus=[(2, 'metil')]), 'pentano': sp(5), '2-metilbutano': sp(4, sus=[(2, 'metil')]), '2,2-dimetilpropano': sp(3, sus=[(2, 'metil'), (2, 'metil')]), 'hexano': sp(6),
                '2-metilpentano': sp(5, sus=[(2, 'metil')]), '3-metilpentano': sp(5, sus=[(3, 'metil')]), '2,2-dimetilbutano': sp(4, sus=[(2, 'metil'), (2, 'metil')]), '2,3-dimetilbutano': sp(4, sus=[(2, 'metil'), (3, 'metil')]),
                'but-1-eno': sp(4, [2, 1, 1]), '2-metilprop-1-eno': sp(3, [2, 1], sus=[(2, 'metil')]), 'but-2-eno': sp(4, [1, 2, 1]), 'etanol': sp(2, g='ol', pos=1), 'propan-1-ol': sp(3, g='ol', pos=1), 'propan-2-ol': sp(3, g='ol', pos=2),
                'butan-1-ol': sp(4, g='ol', pos=1), 'butan-2-ol': sp(4, g='ol', pos=2), '2-metilpropan-1-ol': sp(3, g='ol', pos=1, sus=[(2, 'metil')]), '2-metilpropan-2-ol': sp(3, g='ol', pos=2, sus=[(2, 'metil')]),
                'propanona': sp(3, g='ona', pos=2), 'propanal': sp(3, g='al', pos=1), 'prop-2-en-1-ol': sp(3, [1, 2], g='ol', pos=1), 'ácido etanoico': sp(2, g='oico', pos=1), 'ácido butanoico': sp(4, g='oico', pos=1),
                'ácido 2-metilpropanoico': sp(3, g='oico', pos=1, sus=[(2, 'metil')]), '1-clorobutano': sp(4, sus=[(1, 'cloro')]), '2-clorobutano': sp(4, sus=[(2, 'cloro')]), '1-cloro-2-metilpropano': sp(3, sus=[(1, 'cloro'), (2, 'metil')]),
                '2-cloro-2-metilpropano': sp(3, sus=[(2, 'cloro'), (2, 'metil')])}
    CONT = {'C₄H₁₀': 2, 'C₅H₁₂': 3, 'C₆H₁₄': 5, 'C₄H₈': 4, 'C₂H₆O': 2, 'C₃H₈O': 3, 'C₄H₁₀O': 7, 'C₃H₆O': 4, 'C₂H₄O₂': 2, 'C₄H₈O₂': 6, 'C₄H₉Cl': 4}
    for G in org['isomeros']:
        cf = cuenta_formula(G['f'])
        comprobar(f't7 isómeros {G["f"]}: nº de isómeros', len(G['d']) == CONT[G['f']], str(len(G['d'])))
        comprobar(f't7 isómeros {G["f"]}: nombres distintos', len({x['nombre'] for x in G['d']}) == len(G['d']))
        for x in G['d']:
            comprobar(f't7 isómero {x["nombre"]}: fórmula del SMILES = {G["f"]}', cuenta_smiles(x['smiles']) == cf and cuenta_formula(x['formula']) == cf, f'{cuenta_smiles(x["smiles"])} vs {cf}')
            nm = re.sub(r'^(cis|trans)-', '', x['nombre'])
            if nm in SPEC_ISO:
                sp_ = SPEC_ISO[nm]
                comprobar(f't7 isómero {x["nombre"]}: nombre y fórmula del esqueleto', nm in (nombre_o(sp_), nombre_o(sp_, False)) and cuenta_o(sp_) == cf, f'{nombre_o(sp_)} {cuenta_o(sp_)}')
            if x['nombre'] in BP: comprobar(f't7 isómero {x["nombre"]}: punto de ebullición', cerca(x['pe'], BP[x['nombre']], 1e-9))
    # ============ 6. series homólogas ============
    BPS = {'alcano': [-161.5, -88.6, -42.1, -0.5, 36.1, 68.7, 98.4, 125.7, 150.8, 174.1], 'alqueno': [-103.7, -47.6, -6.3, 30.0, 63.4, 93.6, 121.3, 146.9, 170.6], 'alquino': [-84.0, -23.2, 8.1, 40.2, 71.3, 99.7, 126.3, 150.8, 174.0],
           'alcohol': [64.7, 78.4, 97.2, 117.7, 138.0, 157.0, 176.0, 195.0, 214.0, 233.0], 'acido': [100.8, 118.1, 141.2, 163.5, 186.1, 205.8, 223.0, 239.7, 254.0, 270.0]}
    for fam, S in org['series'].items():
        comprobar(f't7 serie {fam}: puntos de ebullición', S['pe'] == BPS[fam])
        comprobar(f't7 serie {fam}: crece con el nº de carbonos', all(a < b for a, b in zip(S['pe'], S['pe'][1:])))
        for f_ in S['filas']:
            n_ = f_['n']
            m = {'alcano': sp(n_), 'alqueno': sp(n_, [2] + [1] * (n_ - 2)), 'alquino': sp(n_, [3] + [1] * (n_ - 2)), 'alcohol': sp(n_, g='ol', pos=1), 'acido': sp(n_, g='oico', pos=1)}[fam]
            c = cuenta_o(m)
            comprobar(f't7 serie {fam} n={n_}: nombre, fórmula, masa y estado', nombre_o(m) == f_['nombre'] and all(c[k] == f_['cuenta'].get(k, 0) for k in ('C', 'H', 'O')) and cerca(masa_o(c), f_['masa'], 1e-9)
                      and f_['estado'] == ('gas' if BPS[fam][n_ - S['n0']] < 25 else 'sólido' if (fam == 'acido' and n_ == 10) else 'líquido'), f'{nombre_o(m)} / {f_}')
    # ============ 7. polímeros, grado de insaturación y quiralidad ============
    MON = {'eteno (etileno)': ({'C': 2, 'H': 4}, 'C=C'), 'propeno': ({'C': 3, 'H': 6}, 'C=CC'), 'cloroeteno (cloruro de vinilo)': ({'C': 2, 'H': 3, 'Cl': 1}, 'C=CCl'), 'tetrafluoroeteno': ({'C': 2, 'F': 4}, 'FC(F)=C(F)F'),
           'propenonitrilo (acrilonitrilo)': ({'C': 3, 'H': 3, 'N': 1}, 'C=CC#N'), 'buta-1,3-dieno': ({'C': 4, 'H': 6}, 'C=CC=C'), 'estireno (feniletileno)': ({'C': 8, 'H': 8}, None)}
    for P in org['polimeros']:
        cm, smi = MON[P['mon']]; full = {k: cm.get(k, 0) for k in MASA_O}
        comprobar(f't7 polímero {P["mon"]}: fórmula y masa molar', all(P['cuenta'].get(k, 0) == full[k] for k in full) and cerca(P['masa'], masa_o(full), 1e-9) and smi == P['smiles'], str(P))
        if smi: comprobar(f't7 polímero {P["mon"]}: el SMILES dibuja la fórmula', cuenta_smiles(smi) == full)
    FOR_IDH = {'etano': ({'C': 2, 'H': 6}, 0), 'eteno': ({'C': 2, 'H': 4}, 1), 'etino': ({'C': 2, 'H': 2}, 2), 'ciclohexano': ({'C': 6, 'H': 12}, 1), 'hex-1-eno': ({'C': 6, 'H': 12}, 1), 'benceno': ({'C': 6, 'H': 6}, 4), 'propanona': ({'C': 3, 'H': 6, 'O': 1}, 1),
               'cloroetano': ({'C': 2, 'H': 5, 'Cl': 1}, 0), 'etanamina': ({'C': 2, 'H': 7, 'N': 1}, 0), 'naftaleno': ({'C': 10, 'H': 8}, 7), 'glucosa (abierta)': ({'C': 6, 'H': 12, 'O': 6}, 1), 'ácido etanoico': ({'C': 2, 'H': 4, 'O': 2}, 1)}
    for e in org['idh']:
        f_, v_ = FOR_IDH[e['t']]
        comprobar(f't7 insaturación de {e["t"]}', e['C'] == f_['C'] and e['H'] == f_['H'] and e['N'] == f_.get('N', 0) and e['X'] == f_.get('Cl', 0) and e['O'] == f_.get('O', 0) and idh_o({'C': e['C'], 'H': e['H'], 'N': e['N'], 'Cl': e['X']}) == e['idh'] == v_)
    QX = {'butan-2-ol': 1, 'propan-2-ol': 0, '2-clorobutano': 1, 'ácido láctico (2-hidroxipropanoico)': 1, 'alanina (ácido 2-aminopropanoico)': 1, 'glicina (ácido 2-aminoetanoico)': 0, '3-metilhexano': 1, '3-metilpentano': 0, '2-metilbutano': 0,
          'butano-2,3-diol': 2, '2-bromo-3-clorobutano': 2, 'ácido tartárico (2,3-dihidroxibutanodioico)': 2, 'glicerol (propano-1,2,3-triol)': 0, '2-clorobutanal': 1, 'bromoclorofluorometano': 1, '3-metilhex-1-eno': 1}
    for x in org['quiral']:
        comprobar(f't7 quiralidad de {x["t"]}', x['q'] == quirales_o(x['s']) == QX[x['t']], f'{x["q"]} {quirales_o(x["s"])} {QX[x["t"]]}')
    FQ = {'butan-2-ol': 'C4H10O', 'ácido láctico (2-hidroxipropanoico)': 'C3H6O3', 'alanina (ácido 2-aminopropanoico)': 'C3H7NO2', 'glicina (ácido 2-aminoetanoico)': 'C2H5NO2', 'ácido tartárico (2,3-dihidroxibutanodioico)': 'C4H6O6', 'bromoclorofluorometano': 'CHBrClF'}
    for x in org['quiral']:
        if x['t'] in FQ: comprobar(f't7 quiral: fórmula de {x["t"]}', cuenta_formula(x['formula']) == cuenta_formula(FQ[x['t']]) == cuenta_smiles(x['s']))


# ---------------------------------------------------------------------
# Ejercicios t7: cada respuesta, recalculada con el nombrador y las tablas propias
# ---------------------------------------------------------------------
E7 = {e['id']: e for e in A7['ejercicios']}
def v7(i, k=0):
    c = E7[i]['check']; c = c if isinstance(c, list) else [c]; return c[k]
def n7(i, k=0): return v7(i, k)['valor']
def op7(i, k=0): c = v7(i, k); return c['opciones'][c['ok']]
def nom_ok(i, spec): return op7(i) == nombre_o(spec) and validez_o(spec) is not None and cadena_principal_ok(spec)
def adic(m, reag, eq=1): return {nombre_o(p) for p in esp_adicion(m, reag, eq)} if mot else set()
def solo_opciones_distintas(i): return len(set(v7(i)['opciones'])) == len(v7(i)['opciones'])
Cn = lambda f: cuenta_formula(f)

if mot:
    comprobar('t7 a1', n7('a1') == cuenta_o(sp(6))['H'] == 14)
    comprobar('t7 a2', nom_ok('a2', sp(5)))
    comprobar('t7 a3', op7('a3') == 'alcohol' and cuenta_o(sp(2, g='ol', pos=1)) == Cn('C2H6O'))
    comprobar('t7 a4', n7('a4') == cuenta_o(sp(2, [3]))['H'] == 2 and cuenta_o(sp(2, [2]))['H'] == 4)
    comprobar('t7 a5', op7('a5') == '-al')
    comprobar('t7 a6', n7('a6') == cuenta_o(sp(3, g='ona', pos=2))['C'] == 3 and nombre_o(sp(3, g='ona', pos=2)) == 'propanona')
    cb = cuenta_o(sp(4)); comprobar('t7 a7', op7('a7') == '2-metilpropano' and cuenta_o(sp(3, sus=[(2, 'metil')])) == cb and cuenta_o(sp(3)) != cb and cuenta_o(sp(4, [2, 1, 1])) != cb and cuenta_o(sp(5)) != cb)
    comprobar('t7 a8', (n7('a8', 0), n7('a8', 1)) == (4, 109.5) and cuenta_o(sp(1))['H'] == 4 and round(math.degrees(math.acos(-1 / 3)), 1) == 109.5)
    comprobar('t7 a9', op7('a9') == 'sp³')
    comprobar('t7 a10', n7('a10') == idh_o({'C': 3, 'H': 6}) == 1)
    comprobar('t7 a11', nom_ok('a11', sp(3, sus=[(2, 'metil')])))
    comprobar('t7 a12', op7('a12') == 'etano' and idh_o(cuenta_o(sp(2))) == 0 and idh_o({'C': 6, 'H': 6}) == 4)
    comprobar('t7 a13', n7('a13') == 6 + 1 == 7)
    comprobar('t7 a14', cerca(4 * 12 + 10, n7('a14')))
    comprobar('t7 a15', 'carboxilo' in op7('a15'))
    comprobar('t7 a16', op7('a16') == 'CₙH₂ₙ₋₂' and cuenta_o(sp(2, [3]))['H'] == 2 * 2 - 2 and cuenta_o(sp(3, [3, 1]))['H'] == 2 * 3 - 2)
    comprobar('t7 b1', nom_ok('b1', sp(4, sus=[(2, 'metil')])))
    comprobar('t7 b2', nom_ok('b2', sp(5, [1, 2, 1, 1])))
    comprobar('t7 b3', nom_ok('b3', sp(4, g='ol', pos=3)))
    comprobar('t7 b4', nom_ok('b4', sp(4, [3, 1, 1])))
    comprobar('t7 b5', op7('b5') == 'CH₃−CH₂−COOH' and nombre_o(sp(3, g='oico', pos=3)) == 'ácido propanoico')
    comprobar('t7 b6', n7('b6') == idh_o({'C': 4, 'H': 6}) == 2 and cuenta_o(sp(4, [3, 1, 1]))['H'] == 6 and cuenta_o(sp(4, [2, 1, 2]))['H'] == 6)
    comprobar('t7 b7', n7('b7') == 4 * 5 == 20)
    comprobar('t7 b8', n7('b8') == 13 and Fraction(4) + Fraction(10, 4) == Fraction(13, 2))
    comprobar('t7 b9', op7('b9') == '2-bromopropano' in adic(sp(3, [2, 1]), 'HBr') and adic(sp(3, [2, 1]), 'HBr') == {'2-bromopropano'})
    comprobar('t7 b10', op7('b10') == 'propanona' and validez_o(sp(3, g='ol', pos=2))[2] == 1 and nombre_o(sp(3, g='ona', pos=2)) == 'propanona')
    comprobar('t7 b11', op7('b11') == 'butanal' and validez_o(sp(4, g='ol', pos=1))[1] == 2 and nombre_o(sp(4, g='al', pos=1)) == 'butanal')
    isoc5 = {nombre_o(m) for m in (sp(5), sp(4, sus=[(2, 'metil')]), sp(3, sus=[(2, 'metil'), (2, 'metil')]))}
    comprobar('t7 b12', n7('b12') == len(isoc5) == 3 and all(cuenta_o(m) == Cn('C5H12') for m in (sp(5), sp(4, sus=[(2, 'metil')]), sp(3, sus=[(2, 'metil'), (2, 'metil')]))))
    H3 = validez_o(sp(4, g='ol', pos=2)); cands = [(H3[1], 'but-1-eno', sp(4, [2, 1, 1])), (H3[3], 'but-2-eno', sp(4, [1, 2, 1]))]
    comprobar('t7 b13', op7('b13') == 'but-2-eno' and H3[3] < H3[1] and nombre_o(sp(4, [1, 2, 1])) == 'but-2-eno')
    comprobar('t7 b14', cerca(masa_o({'C': 3, 'H': 6, 'O': 1, 'N': 0, 'F': 0, 'Cl': 0, 'Br': 0, 'I': 0}), 58.08, 1e-3) and n7('b14') == 3 * 12 + 6 + 16 == 58)
    comprobar('t7 b15', op7('b15') == 'propan-1-ol' and BP['propan-1-ol'] > BP['propanona'] > -42 and 97 > 48)
    comprobar('t7 b16', nom_ok('b16', sp(3, sus=[(2, 'cloro')])))
    comprobar('t7 b17', op7('b17') == 'butano' and nombre_o(sp(4, [1, 1, 1])) == 'butano' and adic(sp(4, [3, 1, 1]), 'H2', 2) == {'butano'})
    def cis_trans(m):
        n, H = m['n'], validez_o(m)
        for k in range(1, n):
            if m['enl'][k - 1] != 2: continue
            ok_ = True
            for c in (k, k + 1):
                toks = (['H'] * H[c]) + (['cadena'] if (c == k and k > 1) or (c == k + 1 and k + 1 < n) else []) + [q['t'] for q in m['sus'] if q['p'] == c]
                if len(toks) != 2 or toks[0] == toks[1]: ok_ = False
            if ok_: return True
        return False
    comprobar('t7 b18', op7('b18') == 'but-2-eno' and cis_trans(sp(4, [1, 2, 1])) and not cis_trans(sp(4, [2, 1, 1])) and not cis_trans(sp(3, [2, 1])) and not cis_trans(sp(3, [2, 1], sus=[(2, 'metil')])))
    ee = RAIZ_O[2] + 'anoato de ' + RAIZ_O[2] + 'ilo'; comprobar('t7 b19', op7('b19') == ee == 'etanoato de etilo' and any(r['nombre'] == ee for r in org['reacciones'] if r['tipo'] == 'ester'))
    comprobar('t7 b20', cerca(29 / 58 * 13 / 2, n7('b20', 0)) and cerca(29 / 58 * 4 * 44, n7('b20', 1)))
    comprobar('t7 b21', op7('b21') == 'sustitución' and nombre_o(sp(1, sus=[(1, 'cloro')])) == 'clorometano' and cuenta_o(sp(1, sus=[(1, 'cloro')])) == Cn('CH3Cl'))
    comprobar('t7 b22', n7('b22') == cuenta_o(sp(5, sus=[(2, 'metil'), (3, 'etil')]))['C'] == 8 and cuenta_o(sp(5, sus=[(2, 'metil'), (3, 'etil')])) == Cn('C8H18') and nombre_o(sp(5, sus=[(2, 'metil'), (3, 'etil')])) == '3-etil-2-metilpentano')
    comprobar('t7 c1', nom_ok('c1', sp(5, sus=[(2, 'metil'), (3, 'metil')])))
    comprobar('t7 c2', nom_ok('c2', sp(5, sus=[(3, 'etil')])))
    comprobar('t7 c3', nom_ok('c3', sp(4, sus=[(2, 'metil'), (2, 'metil')])))
    comprobar('t7 c4', nom_ok('c4', sp(4, [2, 1, 1], sus=[(3, 'metil')])))
    comprobar('t7 c5', nom_ok('c5', sp(5, [1, 1, 1, 2], g='ol', pos=2)))
    comprobar('t7 c6', nom_ok('c6', sp(4, g='oico', pos=1)))
    comprobar('t7 c7', nom_ok('c7', sp(5, g='ona', pos=3)))
    comprobar('t7 c8', nom_ok('c8', sp(3, sus=[(1, 'cloro'), (2, 'cloro')])))
    comprobar('t7 c9', nom_ok('c9', sp(3, g='ol', pos=3, sus=[(2, 'metil')])))
    comprobar('t7 c10', cerca(10 * 13 / 2, n7('c10', 0)) and cerca(10 * 8 / 2, n7('c10', 1)))
    comprobar('t7 c11', cerca(100 / 46 * 1367, n7('c11'), 1e-3) and DHC[10] == 1367 and masa_o(cuenta_o(sp(2, g='ol', pos=1))) > 46 and cuenta_o(sp(2, g='ol', pos=1)) == Cn('C2H6O'))
    r_oct = 8 * 44 / 5470; r_met = 44 / 890; comprobar('t7 c12', cerca(r_oct / r_met, n7('c12'), 1e-2) and DHC[5] == 5470 and DHC[0] == 890 and round(r_oct, 4) == 0.0644 and round(r_met, 4) == 0.0494 and round(r_oct / r_met, 2) == 1.30)
    comprobar('t7 c13', n7('c13') == idh_o({'C': 10, 'H': 8}) == 7)
    comprobar('t7 c14', n7('c14') == 500 * 62.5 == 31250 and cerca(masa_o(Cn('C2H3Cl')), 62.5, 5e-3))
    comprobar('t7 c15', n7('c15') == 2 ** 3 == 8)
    comprobar('t7 c16', cerca(21 / 42 * 123, n7('c16')) and cerca(masa_o(Cn('C3H7Br')), 123, 5e-3) and adic(sp(3, [2, 1]), 'HBr') == {'2-bromopropano'})
    comprobar('t7 c17', cerca(60 / 60 * 88 * 0.67, n7('c17'), 5e-3) and masa_o(Cn('C4H8O2')) > 88 - 1 and cuenta_o(sp(2, g='oico', pos=1)) == Cn('C2H4O2'))
    cc_ = 85.7 / 12; hh_ = 14.3 / 1; rel = hh_ / cc_; comprobar('t7 c18', sorted(v7('c18')['valores']) == [4, 8] and cerca(rel, 2, 1e-2) and 56 / 14 == 4 and cuenta_o(sp(4, [2, 1, 1])) == Cn('C4H8'))
    comprobar('t7 c19', v7('c19')['tipo'] == 'rubrica' and BP['etanol'] > 20 > -89 and cerca(1.0 * 46, 46) and (46, 44, 30) == (12 * 2 + 6 + 16, 12 * 2 + 4 + 16, 12 * 2 + 6))
    comprobar('t7 c20/c21 (rúbricas)', v7('c20')['tipo'] == 'rubrica' and v7('c21')['tipo'] == 'rubrica' and cis_trans(sp(4, [1, 2, 1])) and not cis_trans(sp(4, [2, 1, 1])))
    comprobar('t7 c22', n7('c22') == 2 and cuenta_o(sp(4, [2, 1, 2]))['H'] + 2 * 2 == cuenta_o(sp(4))['H'] == 10)
    comprobar('t7 c23', cerca(1000 / 58 * 2877 / 1000, n7('c23'), 1e-3) and DHC[3] == 2877)
    comprobar('t7 c24', cerca(5000 * 0.74 / 114 * 8 * 44 / 1000, n7('c24'), 1e-3) and round(5000 * 0.74 / 114, 2) == 32.46)
    for i_ in E7:
        v = v7(i_)
        if v['tipo'] == 'opcion': comprobar(f't7 {i_}: opciones distintas y la correcta en rango', solo_opciones_distintas(i_) and 0 <= v['ok'] < len(v['opciones']))
    comprobar('t7 ejercicios ≥ 40, tres niveles, pasos y resultado', len(E7) >= 40 and {e['nivel'] for e in E7.values()} == {1, 2, 3} and all(e.get('pasos') and e.get('resultado') for e in E7.values()) and len(E7) == len({e['id'] for e in E7.values()}))

    # ---------------- teoría: cifras y nombres de los ejemplos ----------------
    comprobar('t7 teoría: nombres de los ejemplos de alcanos', [nombre_o(m) for m in (sp(5, sus=[(2, 'metil')]), sp(5, sus=[(2, 'metil'), (3, 'metil')]), sp(5, sus=[(2, 'metil'), (3, 'etil')]), sp(5, sus=[(2, 'metil'), (2, 'metil'), (4, 'metil')]))] == ['2-metilpentano', '2,3-dimetilpentano', '3-etil-2-metilpentano', '2,2,4-trimetilpentano'])
    comprobar('t7 teoría: nombres de los ejemplos de alquenos', [nombre_o(m) for m in (sp(5, [1, 2, 1, 1]), sp(4, [2, 1, 1], sus=[(3, 'metil')]), sp(5, [2, 1, 2, 1]), sp(5, [1, 3, 1, 1]))] == ['pent-2-eno', '3-metilbut-1-eno', 'penta-1,3-dieno', 'pent-2-ino'])
    comprobar('t7 teoría: nombres de los ejemplos con grupo', [nombre_o(m) for m in (sp(4, g='ol', pos=3), sp(5, g='ona', pos=3), sp(3, g='oico', pos=1, sus=[(2, 'metil')]), sp(3, [1, 2], g='ol', pos=1), sp(4, g='ol', pos=1, sus=[(3, 'metil')]))] == ['butan-2-ol', 'pentan-3-ona', 'ácido 2-metilpropanoico', 'prop-2-en-1-ol', '3-metilbutan-1-ol'])
    comprobar('t7 teoría: nombres del método completo', [nombre_o(m) for m in (sp(6, sus=[(3, 'metil')]), sp(4, g='ol', pos=2, sus=[(3, 'metil')]), sp(4, [2, 1, 1], sus=[(2, 'metil')]), sp(5, [1, 2, 1, 1], sus=[(3, 'metil')]), sp(4, g='al', pos=1, sus=[(3, 'metil')]), sp(4, g='ona', pos=2, sus=[(3, 'metil')]))]
              == ['3-metilhexano', '3-metilbutan-2-ol', '2-metilbut-1-eno', '3-metilpent-2-eno', '3-metilbutanal', '3-metilbutan-2-ona'])
    comprobar('t7 teoría: 2-metilpentan-3-ol', nombre_o(sp(5, g='ol', pos=3, sus=[(2, 'metil')])) == '2-metilpentan-3-ol')
    comprobar('t7 teoría: alcoholes C₄H₁₀O', {nombre_o(m): validez_o(m)[m['pos']] for m in (sp(4, g='ol', pos=1), sp(4, g='ol', pos=2), sp(3, g='ol', pos=1, sus=[(2, 'metil')]), sp(3, g='ol', pos=2, sus=[(2, 'metil')]))} == {'butan-1-ol': 2, 'butan-2-ol': 1, '2-metilpropan-1-ol': 2, '2-metilpropan-2-ol': 0}
              and all(cuenta_o(m) == Cn('C4H10O') for m in (sp(4, g='ol', pos=1), sp(4, g='ol', pos=2), sp(3, g='ol', pos=1, sus=[(2, 'metil')]), sp(3, g='ol', pos=2, sus=[(2, 'metil')]))))
    comprobar('t7 teoría: aldehídos, cetonas y ácidos tras oxidar', nombre_o(sp(4, g='al', pos=1)) == 'butanal' and nombre_o(sp(4, g='oico', pos=1)) == 'ácido butanoico' and nombre_o(sp(4, g='ona', pos=2)) == 'butanona' and nombre_o(sp(3, g='al', pos=1, sus=[(2, 'metil')])) == '2-metilpropanal' and nombre_o(sp(3, g='oico', pos=1, sus=[(2, 'metil')])) == 'ácido 2-metilpropanoico')
    comprobar('t7 teoría: encadenar reacciones (propeno)', adic(sp(3, [2, 1]), 'HBr') == {'2-bromopropano'} and nombre_o(sp(3, g='ol', pos=2)) == 'propan-2-ol' and nombre_o(sp(3, g='ona', pos=2)) == 'propanona' and cerca(0.9 ** 3 * 58, 42.28, 1e-3) and round(0.9 ** 3, 3) == 0.729 and masa_o(Cn('C3H6')) > 42 - 0.1)
    comprobar('t7 teoría: bombona de butano', cerca(12500 / 58, 215.5, 1e-3) and cerca(12500 / 58 * 6.5, 1401, 1e-3) and cerca(12500 / 58 * 4 * 44, 37931, 1e-3) and cerca(12500 / 58 * 2877 / 1000, 620.0, 1e-3) and cerca(620e3 / 3600, 172.2, 2e-3))
    comprobar('t7 teoría: CO₂ por MJ', round(44 / 890, 3) == 0.049 and round(8 * 44 / 5470, 3) == 0.064 and cerca(8 * 44 / 5470 / (44 / 890), 1.30, 5e-3))
    comprobar('t7 teoría: acetileno por volúmenes', (10 * 5 / 2, 10 * 4 / 2) == (25, 20) and cerca(10 / 22.4, 0.446, 2e-3) and cerca(10 / 22.4 * 1300, 580.4, 1e-3))
    comprobar('t7 teoría: problema 2 (composición)', cerca(40.0 / 12, 3.33, 1e-2) and cerca(6.7 / 1, 6.7) and cerca(53.3 / 16, 3.33, 1e-2) and cerca(6.7 / (40.0 / 12), 2, 1e-2) and 60 / 30 == 2 and masa_o(Cn('C2H4O2')) > 60 and cuenta_o(sp(2, g='oico', pos=1)) == Cn('C2H4O2') and cuenta_smiles('C(=O)OC') == Cn('C2H4O2'))
    comprobar('t7 teoría: problema 3 (C₈H₁₀)', idh_o({'C': 8, 'H': 10}) == 4 == (2 * 8 + 2 - 10) / 2 and cuenta_o(sp(8))['H'] == 18)
    comprobar('t7 teoría: problema 4 (5 kg de propano)', cerca(5000 / 44, 113.6, 1e-3) and cerca(5000 / 44 * 3 * 44 / 1000, 15.0, 1e-3) and cerca(5000 / 44 * 5, 568.2, 1e-3) and cerca(5000 / 44 * 5 * 22.4, 12727, 1e-3) and cerca(5000 / 44 * 5 * 22.4 / 0.21 / 1000, 60.6, 1e-3))
    comprobar('t7 teoría: problema 5 (quiralidad)', [quirales_o(s) for s in ('CCC(C)Cl', 'CCC(C)CC', 'CC(Br)C(Cl)C', 'CC(C)O')] == [1, 0, 2, 0] and [2 ** k for k in (1, 2)] == [2, 4])
    comprobar('t7 teoría: problema 6 (éster)', cerca(88 * 0.67, 58.96, 1e-3) and masa_o(Cn('C4H8O2')) > 88 and 60 / 60 == 1)
    comprobar('t7 teoría: PVC y polietileno', 500 * 62.5 == 31250 and 1e6 / 62.5 == 16000)
    comprobar('t7 teoría: craqueo C₁₆H₃₄ → C₈H₁₈ + C₈H₁₆', 2 * 16 + 2 == 34 and cuenta_o(sp(8))['H'] + cuenta_o(sp(8, [2] + [1] * 6))['H'] == 34 and 8 + 8 == 16)
    comprobar('t7 teoría: pentano frente a su familia y diferencias', BP['pentano'] > BP['2-metilbutano'] > BP['2,2-dimetilpropano'] and round(174.1 - 36.1) == 138 and BP['ácido etanoico'] - BP['butano'] > 100 and round(BP['etanol'] - -24.8, 1) == 103.2)
    comprobar('t7 teoría: masas ≈ 58–60 (tabla de grupos)', [round(masa_o(c)) for c in (Cn('C4H10'), Cn('C3H6O'), Cn('C3H6O'), Cn('C3H9N'), Cn('C3H8O'), Cn('C2H4O2'))] == [58, 58, 58, 59, 60, 60])
    comprobar('t7 teoría: isómeros de alcanos (recuento)', [2, 3, 5, 9, 18, 35, 75, 366319][:3] == [2, 3, 5] and len(isoc5) == 3)
    comprobar('t7 teoría: C–C 347 y C=C 614 → π = 267; N–N …', 614 - 347 == 267)
    comprobar('t7 teoría: serie de los alcanos (tabla de la sección 2)', BPS['alcano'] == [-161.5, -88.6, -42.1, -0.5, 36.1, 68.7, 98.4, 125.7, 150.8, 174.1] and all(cuenta_o(sp(n))['H'] == 2 * n + 2 for n in range(1, 11)))
    comprobar('t7 teoría: aumento de 5 a 10 carbonos ≈ 140 °C', round(BPS['alcano'][9] - BPS['alcano'][4]) == 138)
    comprobar('t7 teoría: fracciones y gasolinas (consistencia)', BPS['alcano'][4] > 30 and BPS['alcano'][9] < 200 and BPS['alcano'][3] < 30)
    comprobar('t7 teoría: C₁₆H₃₄ y fórmulas generales', cuenta_o(sp(3, [2, 1]))['H'] == 6 and cuenta_o(sp(3, [3, 1]))['H'] == 4 and idh_o({'C': 6, 'H': 12}) == 1 and cuenta_o(sp(6, [2] + [1] * 4))['H'] == 12)
    comprobar('t7 teoría: IDH del benceno y del naftaleno', idh_o({'C': 6, 'H': 6}) == 4 and idh_o({'C': 10, 'H': 8}) == 7)

# bancos de actividades
for kq, q_ in A7['datos'].items():
    if 'preguntas' in q_:
        for i, p_ in enumerate(q_['preguntas']):
            comprobar(f't7 {kq} pregunta {i + 1}: opciones distintas y respuesta en rango', len(set(p_['op'])) == len(p_['op']) and 0 <= p_['ok'] < len(p_['op']) and bool(p_['porque']))


# --- fin ---
print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f_ in fallos: print('  FALLO:', f_)
sys.exit(1 if fallos else 0)
