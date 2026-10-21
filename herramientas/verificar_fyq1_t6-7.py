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
# TEMA 7 · Química del carbono (se completa en la segunda parte del script)
# =====================================================================

# --- fin ---
print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f_ in fallos: print('  FALLO:', f_)
sys.exit(1 if fallos else 0)
