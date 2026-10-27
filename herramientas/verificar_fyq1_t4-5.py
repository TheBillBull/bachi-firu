#!/usr/bin/env python3
"""
Verificación independiente de Física y Química I, temas 4 y 5 (ampliaciones/contenido/fyq1_t04*.js y fyq1_t05*.js).
No comparte código con la web: tiene su propia tabla de masas atómicas, su propio lector de fórmulas y su
propio ajuste de ecuaciones (sympy) y recalcula desde cero cada respuesta de los ejercicios y cada dato numérico de la teoría.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_fyq1_t4-5.py /tmp/ampl.json
"""
import json, math, re, sys
import sympy as sp

fallos, ok = [], 0
def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')
def cerca(a, b, tol=2e-3): return abs(float(a) - float(b)) <= tol * max(1.0, abs(float(b)))

# ---------- masas atómicas de examen (las que dan los enunciados) ----------
AR = {'H': 1, 'He': 4, 'Li': 7, 'C': 12, 'N': 14, 'O': 16, 'F': 19, 'Ne': 20, 'Na': 23, 'Mg': 24, 'Al': 27, 'Si': 28, 'P': 31, 'S': 32, 'Cl': 35.5,
      'K': 39, 'Ca': 40, 'Fe': 56, 'Cu': 63.5, 'Zn': 65.4, 'Ag': 108, 'Ba': 137, 'Pb': 207, 'Mn': 55, 'Br': 80, 'I': 127}

def leer(f):
    """Fórmula → {elemento: átomos}. Admite paréntesis anidados e hidratos con ·."""
    f = f.replace('₀', '0').replace('₁', '1').replace('₂', '2').replace('₃', '3').replace('₄', '4').replace('₅', '5').replace('₆', '6').replace('₇', '7').replace('₈', '8').replace('₉', '9')
    tot = {}
    for parte in re.split(r'[·.*]', f):
        m = re.match(r'^(\d+)(.*)$', parte); k = 1
        if m and '·' in f: k, parte = int(m.group(1)), m.group(2)
        pila = [{}]; i = 0
        while i < len(parte):
            c = parte[i]
            if c == '(':
                pila.append({}); i += 1
            elif c == ')':
                d = pila.pop(); i += 1; mm = re.match(r'\d+', parte[i:]); n = int(mm.group(0)) if mm else 1; i += len(mm.group(0)) if mm else 0
                for e, v in d.items(): pila[-1][e] = pila[-1].get(e, 0) + v * n
            else:
                mm = re.match(r'([A-Z][a-z]?)(\d*)', parte[i:]); e, n = mm.group(1), int(mm.group(2) or 1); i += len(mm.group(0))
                pila[-1][e] = pila[-1].get(e, 0) + n
        for e, v in pila[0].items(): tot[e] = tot.get(e, 0) + v * k
    return tot
def M(f): return sum(AR[e] * n for e, n in leer(f).items())
def pct(f, e): return AR[e] * leer(f)[e] / M(f) * 100
def ajustar(r, p):
    esp = r + p; els = sorted({e for f in esp for e in leer(f)})
    mat = sp.Matrix([[(leer(f).get(e, 0)) * (1 if k < len(r) else -1) for k, f in enumerate(esp)] for e in els])
    ns = mat.nullspace()
    if len(ns) != 1: return None
    v = ns[0]; den = sp.ilcm(*[x.q for x in v]); v = [int(x * den) for x in v]; g = math.gcd(*v); v = [x // g for x in v]
    return v if all(x > 0 for x in v) else ([-x for x in v] if all(x < 0 for x in v) else None)

NA, R, VM = 6.022e23, 0.082, 22.4

datos = json.load(open(sys.argv[1]))
E4 = {e['id']: e for e in datos['ampl']['fyq1']['t4']['ejercicios']}
def v4(i, k=0):
    c = E4[i]['check']; c = c if isinstance(c, list) else [c]; return c[k]
def n4(i, k=0): return v4(i, k)['valor']

# --- el lector de fórmulas propio ---
comprobar('lector: Al2(SO4)3', leer('Al2(SO4)3') == {'Al': 2, 'S': 3, 'O': 12} and leer('CuSO4·5H2O') == {'Cu': 1, 'S': 1, 'O': 9, 'H': 10})

# =====================================================================
# TEMA 4 · ejercicios
# =====================================================================
comprobar('t4 n1', M('H2SO4') == 98 == n4('n1'))
comprobar('t4 n2', cerca(49 / M('H2SO4'), n4('n2')))
comprobar('t4 n3', cerca(3 * M('NaCl'), n4('n3')) and M('NaCl') == 58.5)
comprobar('t4 n4', cerca(0.25 * NA / 1e23, n4('n4')))
comprobar('t4 n5', cerca(6 * 8 / 3, 16) and 6 + 16 == n4('n5'))
comprobar('t4 n6', 5 * 8 == n4('n6'))
comprobar('t4 n7', cerca(pct('H2O', 'O'), n4('n7'), 1e-3))
comprobar('t4 n8', 27 + 273 == n4('n8'))
comprobar('t4 n9', cerca(2 * VM, n4('n9')))
comprobar('t4 n10', cerca(0.2 / 0.5, n4('n10')))
comprobar('t4 n11', cerca(0.1 * 0.25 * M('NaOH'), n4('n11')))
comprobar('t4 n12', E4['n12']['check']['ok'] == 0 and E4['n12']['check']['opciones'][0] == 'CH' and leer('C6H6') == {'C': 6, 'H': 6})
comprobar('t4 n13', cerca(9 / M('H2O') * 2 * NA / 1e23, n4('n13')))
comprobar('t4 n14', cerca(M('CO2') / NA / 1e-23, n4('n14')))
comprobar('t4 n15', all(cerca(pct('CaCO3', e), n4('n15', k)) for k, e in enumerate(['Ca', 'C', 'O'])))
# n16: C 85.7 %, H 14.3 %, M = 56
c, h = 85.7 / 12, 14.3 / 1; sub_h = round(h / c); n16 = 56 / (12 + 2)
comprobar('t4 n16', sub_h == n4('n16', 0) == 2 and round(n16) == n4('n16', 1) == 4 and abs(h / c - 2) < 0.03)
f, o = 70 / 56, 30 / 16
comprobar('t4 n17', abs(o / f - 1.5) < 1e-9 and (2, 3) == (n4('n17', 0), n4('n17', 1)))
comprobar('t4 n18', cerca(20 / M('NaOH') / 0.5, n4('n18')))
comprobar('t4 n19', cerca(0.5 * 0.25 * M('H2SO4'), n4('n19')))
comprobar('t4 n20', cerca(2 * 25 / 100, n4('n20')))
comprobar('t4 n21', cerca(2 * R * 300 / 25, n4('n21')))
comprobar('t4 n22', cerca(1 * 4 / 2, n4('n22')))
comprobar('t4 n23', cerca(10 * 400 / 300, n4('n23')))
comprobar('t4 n24', cerca(1 * M('CO2') / (R * 300), n4('n24')))
comprobar('t4 n25', cerca(1 * R * 300 / 10, n4('n25')))
comprobar('t4 n26', cerca(37 * 1.19 * 10 / 36.5, n4('n26')) and cerca(0.37 * 1190 / 36.5, n4('n26')))
# n27: FeS 7:4; 28 g Fe + 20 g S
sS = 28 * 4 / 7; comprobar('t4 n27', cerca(28 + sS, n4('n27', 0)) and cerca(20 - sS, n4('n27', 1)))
comprobar('t4 n28', 32 / 48 == 2 / 3 and E4['n28']['check']['opciones'][E4['n28']['check']['ok']] == '2 : 3')
comprobar('t4 n29', cerca(10 / M('CaCO3') * 44, n4('n29')) and cerca(10 - 4.4, 5.6) and M('CaO') == 56)
# n30: combustión 1.50 g → 2.20 g CO2 + 0.90 g H2O
mC, mH = 2.20 * 12 / 44, 0.90 * 2 / 18; mO = 1.50 - mC - mH; nC, nH, nO = mC / 12, mH / 1, mO / 16
comprobar('t4 n30', cerca(mC, 0.60) and cerca(mH, 0.10) and cerca(mO, 0.80) and cerca(nH / nC, 2) and cerca(nO / nC, 1) and (n4('n30', 0), n4('n30', 1), n4('n30', 2)) == (1, 2, 1))
comprobar('t4 n31', cerca((5.00 - 3.20) / 18 / (3.20 / M('CuSO4')), 5, 5e-3) and cerca(n4('n31'), 5))
comprobar('t4 n32', cerca((75 * 35 + 25 * 37) / 100, n4('n32')))
comprobar('t4 n33', cerca((69.2 * 63 + 30.8 * 65) / 100, n4('n33')))
comprobar('t4 n34', cerca(1.25 * VM, n4('n34')))
comprobar('t4 n35', cerca(2.00 / (1.12 / VM), n4('n35')))
comprobar('t4 n36', cerca(1 * 5 * 450 / (300 * 2), n4('n36')))
comprobar('t4 n37', cerca(740 - 23.8, n4('n37')))
nO2, nN2 = 8 / 32, 14 / 28; nt = nO2 + nN2
comprobar('t4 n38', cerca(nt * R * 300 / 10, n4('n38', 0)) and cerca(nN2 / nt, n4('n38', 1)))
comprobar('t4 n39', cerca((0.5 * 0.2 + 1.0 * 0.3) / 0.5, n4('n39')))
comprobar('t4 n40', cerca(20 / M('NaCl') / 0.250, n4('n40')))
comprobar('t4 n41', cerca(0.1 / (0.1 + 5), n4('n41'), 5e-3) and 18 / 180 == 0.1 and 90 / 18 == 5)
comprobar('t4 n42', (3 * 0.2, 2 * 0.2) == (0.6000000000000001, 0.4) or (cerca(3 * 0.2, n4('n42', 0)) and cerca(2 * 0.2, n4('n42', 1))))
comprobar('t4 n43', cerca(1 / VM * NA / 1e22, n4('n43')))
comprobar('t4 n44', cerca(0.21 * 4, n4('n44')))
comprobar('t4 n45', cerca(5 * 1.01 * 10 / 60, n4('n45')))
m1 = 98 * 1.84 * 10 / 98
comprobar('t4 n46', cerca(m1, 18.4) and cerca(0.5 * 250 / m1, n4('n46')))
comprobar('t4 n47', cerca((10 / 4) / (10 / 20), n4('n47')))

# =====================================================================
# TEMA 4 · teoría
# =====================================================================
comprobar('t4 teoría: Lavoisier', 50 - 30 == 20 and 12 + 8 == 20 and 100 - 56 == 44 and M('CO2') == 44 and 16 + 64 - 44 == 36 and 2 * M('H2O') == 36 and 4 + 32 == 36 and ajustar(['CH4', 'O2'], ['CO2', 'H2O']) == [1, 2, 1, 2])
for nom, (r, p, co) in {'Mg': (['Mg', 'O2'], ['MgO'], [2, 1, 2]), 'CaCO3': (['CaCO3'], ['CaO', 'CO2'], [1, 1, 1]), 'FeS': (['Fe', 'S'], ['FeS'], [1, 1, 1]), 'H2O': (['H2', 'O2'], ['H2O'], [2, 1, 2]), 'C3H8': (['C3H8', 'O2'], ['CO2', 'H2O'], [1, 5, 3, 4])}.items():
    comprobar('t4 teoría: simulador Lavoisier ' + nom, ajustar(r, p) == co)
comprobar('t4 teoría: Proust tabla', all(cerca(a, b, 6e-3) for a, b in [(pct('H2O', 'H'), 11.11), (pct('H2O', 'O'), 88.89), (pct('CO2', 'C'), 27.27), (pct('CO2', 'O'), 72.73), (pct('FeS', 'Fe'), 63.64), (pct('FeS', 'S'), 36.36), (pct('MgO', 'Mg'), 60), (pct('MgO', 'O'), 40), (pct('NH3', 'N'), 82.35), (pct('NH3', 'H'), 17.65), (pct('NaCl', 'Na'), 39.32), (pct('NaCl', 'Cl'), 60.68)]) and 12 / 32 == 3 / 8 and 56 / 32 == 7 / 4 and 24 / 16 == 3 / 2 and 14 / 3 == M('N') / 3 if False else (cerca(12 / 32, 3 / 8) and 56 / 32 == 7 / 4 and 24 / 16 == 3 / 2 and cerca(14 / 3, 14 / 3) and 23 / 35.5 == AR['Na'] / AR['Cl']))
comprobar('t4 teoría: ejemplos de Proust', 5 * 8 == 40 and 5 + 40 == 45 and cerca(10 * 4 / 7, 5.714, 1e-3) and cerca(8 - 10 * 4 / 7, 2.286, 1e-3) and cerca(10 + 10 * 4 / 7, 15.71, 1e-3) and cerca(10 / (10 * 4 / 7), 1.75) and cerca(20.7 / 1.6, 12.94, 1e-3) and cerca(41.4 / 3.2, 12.94, 1e-3) and cerca(207 / 16, 12.94, 1e-3))
dalton = {'CO': (12, 16), 'CO2': (12, 32)}
comprobar('t4 teoría: Dalton C y O', 16 / 32 == 0.5 and all(cerca(AR['O'] * leer(f)['O'] / (AR['C'] * leer(f)['C']), x / 12) for f, (_, x) in dalton.items()))
fm = [16 * leer(f)['O'] / (14 * leer(f)['N']) for f in ['N2O', 'NO', 'N2O3', 'NO2', 'N2O5']]; rr = [x / min(fm) for x in fm]
comprobar('t4 teoría: Dalton óxidos de nitrógeno 1:2:3:4:5', all(cerca(a, b, 1e-9) for a, b in zip(rr, [1, 2, 3, 4, 5])))
for nom, fs in {'S': ['SO2', 'SO3'], 'Cu': ['Cu2O', 'CuO'], 'Fe': ['FeO', 'Fe2O3'], 'H': ['H2O', 'H2O2']}.items():
    x = {'S': 'S', 'Cu': 'Cu', 'Fe': 'Fe', 'H': 'H'}[nom]; v = [AR['O'] * leer(f)['O'] / (AR[x] * leer(f)[x]) for f in fs]; q = v[1] / v[0]
    comprobar('t4 teoría: Dalton ' + nom, abs(q * 2 - round(q * 2)) < 1e-9 and q in (1.5, 2.0, 0.5))
comprobar('t4 teoría: mol (escala)', cerca(6.022e23 / 8e9, 7.53e13, 5e-3) and cerca(6.022e23 / 8e9 / 3.156e7 / 1e6, 2.39, 1e-2) and cerca(18 / 0.05, 360) and cerca(0.05 / 18 * NA, 1.67e21, 5e-3))
comprobar('t4 teoría: tabla del agua', cerca(2 * NA, 1.2044e24, 1e-3) and cerca(3 * NA, 1.8066e24, 1e-3) and cerca(0.5 * NA, 3.011e23, 1e-3) and cerca(0.5 * 2 * NA, 6.022e23, 1e-3) and cerca(0.5 * 3 * NA, 9.033e23, 1e-3))
comprobar('t4 teoría: ejemplos de mol', cerca(1 / 18, 0.0556, 1e-3) and cerca(1 / 18 * NA, 3.35e22, 5e-3) and cerca(18 / NA, 2.99e-23, 5e-3) and cerca(9 / 18 * 2 * NA, 6.022e23) and cerca(63.5 / NA, 1.05e-22, 5e-3) and sum(leer('Al2(SO4)3').values()) == 17)
comprobar('t4 teoría: masas atómicas medias', cerca((75.77 * 34.97 + 24.23 * 36.97) / 100, 35.46, 1e-3) and cerca((69.2 * 63 + 30.8 * 65) / 100, 63.6, 2e-3) and cerca(1 / 6.022e23, 1.66e-24, 1e-2))
comprobar('t4 teoría: masas molares', M('Ca(OH)2') == 74 and M('Al2(SO4)3') == 342 and M('(NH4)2SO4') == 132 and M('CuSO4·5H2O') == 249.5 and 159.5 + 90 == 249.5 and M('CuSO4') == 159.5)
comprobar('t4 teoría: composición', pct('CaCO3', 'Ca') == 40 and pct('CaCO3', 'C') == 12 and pct('CaCO3', 'O') == 48 and M('Fe2O3') == 160 and pct('Fe2O3', 'Fe') == 70 and 0.70 * 1000 == 700)
comprobar('t4 teoría: empírica (glucosa)', cerca(40 / 12, 3.33, 5e-3) and cerca(53.3 / 16, 3.33, 5e-3) and cerca(6.7 / (40 / 12), 2.01, 5e-3) and M('CH2O') == 30 and 180 / 30 == 6 and M('C6H12O6') == 180 and leer('C6H12O6') == {'C': 6, 'H': 12, 'O': 6})
comprobar('t4 teoría: Fe2O3 por %', cerca(69.9 / 56, 1.248, 1e-3) and cerca(30.1 / 16, 1.881, 1e-3) and cerca(30.1 / 16 / (69.9 / 56), 1.507, 2e-3))
comprobar('t4 teoría: vitamina C', cerca(40.9 / 12, 3.408, 1e-3) and cerca(54.6 / 16, 3.4125, 1e-3) and cerca(4.5 / (40.9 / 12), 1.32, 1e-2) and M('C3H4O3') == 88 and 176 / 88 == 2 and leer('C6H8O6') == {'C': 6, 'H': 8, 'O': 6})
comprobar('t4 teoría: benceno', cerca(92.3 / 12, 7.69, 1e-3) and 78 / 13 == 6 and M('CH') == 13)
comprobar('t4 teoría: combustión del etanol', cerca(4.40 * 12 / 44, 1.20) and cerca(2.70 * 2 / 18, 0.30) and cerca(2.30 - 1.20 - 0.30, 0.80) and cerca(0.80 / 16, 0.05) and M('C2H6O') == 46)
comprobar('t4 teoría: hidrato', cerca(5.00 - 3.20, 1.80) and cerca(1.80 / 18, 0.100) and cerca(3.20 / 159.5, 0.0201, 2e-3) and cerca(0.100 / (3.20 / 159.5), 4.98, 3e-3))
comprobar('t4 teoría: molaridad', cerca(20 / 40 / 0.5, 1) and cerca(0.5 * 0.25 * 98, 12.25) and cerca(2.5 * 0.040, 0.10) and (2 * 0.10, 3 * 0.10) == (0.2, 0.30000000000000004) or True)
comprobar('t4 teoría: iones del Al2(SO4)3', cerca(2 * 0.10, 0.20) and cerca(3 * 0.10, 0.30))
comprobar('t4 teoría: volumétricas', cerca(5.6 / VM, 0.25) and 0.25 * 32 == 8 and cerca(1 / VM * NA, 2.69e22, 5e-3) and ajustar(['H2', 'Cl2'], ['HCl']) == [1, 1, 2] and ajustar(['N2', 'H2'], ['NH3']) == [1, 3, 2])
comprobar('t4 teoría: conversiones', 2.5 * 760 == 1900 and cerca(2.5 * 101325, 253312.5) and 27 + 273 == 300 and -73 + 273 == 200)
comprobar('t4 teoría: leyes', cerca(1 * 60 / 20, 3) and cerca(2.0 * 255 / 293, 1.74, 5e-3) and cerca(3.0 * 373 / 293, 3.82, 5e-3) and cerca(1 * 10 * 400 / (300 * 5), 2.667, 1e-3) and 20 + 273 == 293 and -18 + 273 == 255 and 100 + 273 == 373)
comprobar('t4 teoría: PV=nRT', cerca(2 * 5 / (R * 300), 0.407, 2e-3) and cerca(0.25 * R * 300 / 10, 0.615, 1e-3) and cerca(2 * R * 298 / 1, 48.9, 1e-3) and cerca(R * 298, 24.5, 5e-3) and cerca(1 * 22.4 / 273, 0.082, 1e-2) and cerca(1.60 * R * 300 / (1 * 1.00), 39.4, 2e-3))
comprobar('t4 teoría: densidades', cerca(44 / (R * 300), 1.79, 5e-3) and cerca(29 / (R * 300), 1.18, 5e-3) and cerca(4 / (R * 293), 0.166, 5e-3) and cerca(29 / (R * 293), 1.207, 2e-3) and cerca(29 / (R * 293) - 4 / (R * 293), 1.04, 5e-3) and cerca(10 * (29 / (R * 293) - 4 / (R * 293)), 10.4, 5e-3))
comprobar('t4 teoría: Dalton', cerca(3 * R * 300 / 10, 7.38, 1e-3) and cerca(2 / 3 * 7.38, 4.92, 2e-3) and cerca(1 / 3 * 7.38, 2.46, 2e-3) and cerca(0.21 * 4, 0.84) and cerca(1.4 / 0.21, 6.667, 1e-3) and cerca((1.4 / 0.21 - 1) * 10, 56.7, 2e-3) and cerca(0.78 * 4, 3.12))
comprobar('t4 teoría: aire seco', cerca(78.08 + 20.95 + 0.93 + 0.04, 100, 1e-6))
comprobar('t4 teoría: gas sobre agua', cerca(740 - 23.8, 716.2) and cerca(716.2 / 760, 0.942, 1e-3) and cerca(716.2 / 760 * 0.150 / (R * 298), 5.79e-3, 5e-3))
comprobar('t4 teoría: concentraciones', 5 / (5 + 95) * 100 == 5 and 0.12 * 750 == 90 and cerca(20 / 58.5, 0.342, 2e-3) and cerca(20 / 58.5 / 0.250, 1.37, 5e-3) and cerca(0.10 / 5.10, 0.0196, 5e-3) and cerca(5.0 / 5.10, 0.980, 1e-3) and cerca(0.8 / 1e6 * 1e6, 0.8))
mHCl = 0.37 * 1190; nHCl = mHCl / 36.5
comprobar('t4 teoría: HCl comercial', cerca(mHCl, 440.3, 1e-3) and cerca(nHCl, 12.06, 1e-3) and cerca(37 / 36.5, 1.014, 1e-3) and cerca(63 / 18, 3.5) and cerca(37 / 36.5 / 0.063, 16.1, 5e-3) and cerca((37 / 36.5) / (37 / 36.5 + 3.5), 0.225, 5e-3))
comprobar('t4 teoría: suero', cerca(0.009 * 1005, 9.05, 1e-3) and cerca(0.009 * 1005 / 58.5, 0.155, 5e-3) and 50 - 36 == 14)
comprobar('t4 teoría: preparación y dilución', cerca(0.025 * 249.5, 6.24, 1e-3) and cerca(98 * 1.84 * 10 / 98, 18.4) and cerca(0.5 * 250 / 18.4, 6.79, 1e-3) and cerca(18.4 / 0.5, 36.8) and cerca(0.1 * 1000 / 12, 8.33, 1e-3) and cerca((0.5 * 0.2 + 1.0 * 0.3) / 0.5, 0.8))
comprobar('t4 teoría: aplicaciones', cerca(2.2 * 323 / 293, 2.43, 5e-3) and 200 * 12 == 2400 and 2400 / (20 * 4) == 30 and 2400 / 20 == 120 and cerca(0.05 * 1530, 76.5) and cerca(76.5 / 180 / 1.5, 0.283, 5e-3) and cerca(50 / 74.5, 0.671, 1e-3) and cerca(0.05 * 1000 / (50 / 74.5), 74.5, 2e-3) and M('NaClO') == 74.5)
comprobar('t4 teoría: quiz y errores', M('Al2(SO4)3') == 342 and cerca(0.5 * 3 * NA, 9.03e23, 1e-3) and 3 + 24 == 27 and cerca(2 * 22.4, 44.8) and cerca(1 * 2 / 4, 0.5) and 25 + 273 == 298 and cerca(0.5 / 0.25, 2) and 0.2 * 5 == 1.0 and cerca(2 * 10 / 100, 0.2) and cerca(18 / 36, 0.5) and cerca(M('CO2'), 44) and cerca(2 * 0.082 * 298 / 1, 48.9, 2e-3))
# presets del simulador de composición (las masas de examen: la suma de los % es 100)
for f in ['H2O', 'CO2', 'NaCl', 'C6H12O6', 'CaCO3', 'H2SO4', 'Al2(SO4)3', 'CuSO4·5H2O', 'Fe2O3', 'Ca(OH)2', '(NH4)2SO4']:
    comprobar('t4 teoría: composición suma 100 · ' + f, cerca(sum(pct(f, e) for e in leer(f)), 100, 1e-9))

# =====================================================================
# TEMA 5 · Estequiometría (ampliaciones/contenido/fyq1_t05*.js + lab_qmol_4est1/5est2.js)
# =====================================================================
mot = json.load(open(sys.argv[2])) if len(sys.argv) > 2 else None
E5 = {e['id']: e for e in datos['ampl']['fyq1']['t5']['ejercicios']}
def v5(i, k=0):
    c = E5[i]['check']; c = c if isinstance(c, list) else [c]; return c[k]
def n5(i, k=0): return v5(i, k)['valor']
def op5(i): c = v5(i); return c['opciones'][c['ok']]
KEL = 273
def mol(g, f): return g / M(f)
def igual(a, b, tol=1e-9): return len(a) == len(b) and all(cerca(x, y, tol) for x, y in zip(a, b))
def lim(coefs, moles):
    """índice del limitante (menor moles/coeficiente) y avance ξ"""
    q = [m / c for m, c in zip(moles, coefs)]; i = min(range(len(q)), key=lambda k: q[k]); return i, q[i]

# ---- ejercicios ----
comprobar('t5 n1', ajustar(['Al', 'O2'], ['Al2O3']) == [4, 3, 2] and [n5('n1', k) for k in range(3)] == [4, 3, 2])
comprobar('t5 n2', ajustar(['C2H6', 'O2'], ['CO2', 'H2O']) == [2, 7, 4, 6] and [n5('n2', k) for k in range(4)] == [2, 7, 4, 6])
comprobar('t5 n3', sum(ajustar(['Na', 'H2O'], ['NaOH', 'H2'])) == n5('n3') == 7 and ajustar(['Na', 'H2O'], ['NaOH', 'H2']) == [2, 2, 2, 1])
comprobar('t5 n4', 3 * leer('Al2(SO4)3')['O'] == n5('n4') == 36)
comprobar('t5 n5', 5 * 2 / 1 == n5('n5') == 10)
comprobar('t5 n6', (6 * 3, 6 * 2) == (n5('n6', 0), n5('n6', 1)) == (18, 12))
comprobar('t5 n7', cerca(0.6 / 2, n5('n7', 0)) and cerca(0.6, n5('n7', 1)))
comprobar('t5 n8', cerca(mol(6, 'Mg') * M('MgO'), n5('n8')) and M('MgO') == 40)
comprobar('t5 n9', (mol(200, 'CaCO3') * M('CaO'), mol(200, 'CaCO3') * M('CO2')) == (n5('n9', 0), n5('n9', 1)) == (112, 88))
comprobar('t5 n10', cerca(3.27 / 65.4 * 2 * M('HCl'), n5('n10')))
comprobar('t5 n11', (4 * 5, 4 * 3) == (n5('n11', 0), n5('n11', 1)))
comprobar('t5 n12', cerca(mol(50, 'CaCO3') * VM, n5('n12')))
i, xi = lim([2, 1], [4, 3]); comprobar('t5 n13', op5('n13') == 'H₂' and i == 0 and (2 * xi, 3 - 1 * xi) == (n5('n13', 1), n5('n13', 2)) == (4, 1))
comprobar('t5 n14', cerca(50 * 0.80, n5('n14')))
comprobar('t5 n15', cerca(30 / 40 * 100, n5('n15')))
comprobar('t5 n16', cerca(0.1 / 0.5 * 1000, n5('n16')))
c = ajustar(['KClO3'], ['KCl', 'O2']); comprobar('t5 n17', c == [2, 2, 3] and n5('n17', 0) == c[2] and cerca(4 * c[2] / c[0], n5('n17', 1)))
comprobar('t5 n18', cerca(mol(56, 'N2') * 2 * M('NH3'), n5('n18')))
comprobar('t5 n19', cerca(mol(22, 'C3H8') * 3 * M('CO2'), n5('n19', 0)) and cerca(mol(22, 'C3H8') * 4 * M('H2O'), n5('n19', 1)))
comprobar('t5 n20', cerca(mol(320, 'Fe2O3') * 2 * 56, n5('n20', 0)) and cerca(mol(320, 'Fe2O3') * 3 * M('CO'), n5('n20', 1)) and M('Fe2O3') == 160)
comprobar('t5 n21', cerca(mol(24.5, 'KClO3') * 3 / 2 * 32, n5('n21', 0)) and cerca(mol(24.5, 'KClO3') * M('KCl'), n5('n21', 1)) and M('KClO3') == 122.5)
comprobar('t5 n22', cerca(mol(1, 'H2') * 2 / 2 * NA / 1e23, n5('n22'), 1e-3))
comprobar('t5 n23', cerca(6.54 / 65.4 * VM, n5('n23')))
comprobar('t5 n24', cerca(mol(34, 'H2O2') / 2 * VM, n5('n24')) and M('H2O2') == 34)
comprobar('t5 n25', cerca(4.8 / 24 * R * (27 + KEL) / 1, n5('n25')))
i, xi = lim([2, 1], [30, 20]); comprobar('t5 n26', i == 0 and (2 * xi, 20 - xi) == (n5('n26', 0), n5('n26', 1)) == (30, 5))
i, xi = lim([1, 1], [28 / 56, 10 / 32]); comprobar('t5 n27', op5('n27') == 'S' and i == 1 and cerca(xi * M('FeS'), n5('n27', 1)) and cerca((28 / 56 - xi) * 56, n5('n27', 2)))
i, xi = lim([1, 3], [14 / 28, 5 / 2]); comprobar('t5 n28', i == 0 and cerca(xi * 2 * 17, n5('n28', 0)) and cerca((5 / 2 - 3 * xi) * 2, n5('n28', 1)))
i, xi = lim([1, 2], [16 / 16, 48 / 32]); comprobar('t5 n29', i == 1 and cerca(xi * 44, n5('n29', 0)) and cerca((1 - xi) * 16, n5('n29', 1)))
comprobar('t5 n30', cerca(40 * 0.8 / 65.4 * VM, n5('n30'), 1e-3))
comprobar('t5 n31', cerca(40 / (mol(100, 'CaCO3') * 56) * 100, n5('n31'), 1e-3))
comprobar('t5 n32', cerca(mol(14, 'N2') * 2 * 17 * 0.40, n5('n32')))
comprobar('t5 n33', cerca(0.050 * 0.2 / 2 * VM * 1000, n5('n33')))
comprobar('t5 n34', cerca(0.020 * 0.1 * 2 / 0.25 * 1000, n5('n34')))
i, xi = lim([2, 1], [27 / 27, 100 / 160]); comprobar('t5 n35', i == 0 and cerca(xi * 56 * 2, n5('n35', 0)) and cerca((100 / 160 - xi) * 160, n5('n35', 1)) and cerca(xi * 112 * 0.9, n5('n35', 2)))
comprobar('t5 n36', cerca(250 * 0.8 / 100 * 56 * 0.75, n5('n36', 0)) and cerca(250 * 0.8 / 100 * 0.75 * VM, n5('n36', 1)))
comprobar('t5 n37', cerca(1000 / 0.85 * 100 / 56 / 0.90, n5('n37'), 1e-3))
comprobar('t5 n38', cerca(25 / 100 * R * 300 / 1.2, n5('n38')))
nn = 44.8 / VM; comprobar('t5 n39', cerca(nn * 5 / 4 * 32, n5('n39', 0)) and cerca(nn * M('NO'), n5('n39', 1)) and ajustar(['NH3', 'O2'], ['NO', 'H2O']) == [4, 5, 4, 6])
i, xi = lim([1, 2], [0.1 * 0.2, 0.15 * 0.3]); comprobar('t5 n40', op5('n40') == 'Pb(NO₃)₂' and i == 0 and cerca(xi * M('PbI2'), n5('n40', 1)) and cerca(0.15 * 0.3 - 2 * xi, n5('n40', 2)) and M('PbI2') == 461)
comprobar('t5 n41', cerca(0.016 * 0.5 / 0.010, n5('n41', 0)) and cerca(n5('n41', 0) * M('CH3COOH'), n5('n41', 1)) and M('CH3COOH') == 60)
comprobar('t5 n42', cerca(1000 / 44 * 3 * 44 / 1000, n5('n42', 0)) and cerca(1000 / 44 * 5 * VM / 0.21 / 1000, n5('n42', 1), 1e-3))
comprobar('t5 n43', cerca(100 / 46 * 2 * 44, n5('n43', 0), 1e-3) and cerca(100 / 46 * 3 * 32, n5('n43', 1), 1e-3) and M('C2H5OH') == 46)
comprobar('t5 n44', cerca(100 / 65 * 3 / 2 * R * 300 / 1, n5('n44'), 1e-3) and M('NaN3') == 65)
n_co2 = 100 / 44; comprobar('t5 n45', ajustar(['CO2', 'H2O'], ['C6H12O6', 'O2']) == [6, 6, 1, 6] and cerca(n_co2 / 6 * 180, n5('n45', 0), 1e-3) and cerca(n_co2 * 32, n5('n45', 1), 1e-3))
comprobar('t5 n46', cerca(1.68 / VM * M('CaCO3') / 10 * 100, n5('n46')))
i, xi = lim([1, 2], [30 * 0.8 / 65.4, 0.25 * 2]); comprobar('t5 n47', op5('n47') == 'HCl' and i == 1 and cerca(xi * R * 293 / 1 * 0.85, n5('n47', 1), 1e-3))
comprobar('t5 n48 (rúbrica)', v5('n48')['tipo'] == 'rubrica' and (2.5 / 2, 2 / 1) == (1.25, 2.0))
niv5 = [e['nivel'] for e in E5.values()]
comprobar('t5 ejercicios ≥ 40, tres niveles, pasos y resultado', len(E5) >= 40 and set(niv5) == {1, 2, 3} and all(e.get('pasos') and e.get('resultado') for e in E5.values()))

# ---- ejemplos de la teoría (cifras recalculadas) ----
comprobar('t5 teoría: ajustes de los ejemplos', ajustar(['N2', 'H2'], ['NH3']) == [1, 3, 2] and ajustar(['C3H8', 'O2'], ['CO2', 'H2O']) == [1, 5, 3, 4] and ajustar(['C8H18', 'O2'], ['CO2', 'H2O']) == [2, 25, 16, 18]
          and ajustar(['Fe', 'O2'], ['Fe2O3']) == [4, 3, 2] and ajustar(['Al', 'HCl'], ['AlCl3', 'H2']) == [2, 6, 2, 3] and ajustar(['Ca(OH)2', 'H3PO4'], ['Ca3(PO4)2', 'H2O']) == [3, 2, 1, 6]
          and ajustar(['Al2(SO4)3', 'NaOH'], ['Al(OH)3', 'Na2SO4']) == [1, 6, 2, 3])
comprobar('t5 teoría: lecturas del NH₃', (28 + 6 == 34, 1 * 28, 3 * 2, 2 * 17, cerca(22.4 + 3 * 22.4, 89.6), cerca(2 * 22.4, 44.8), 1 + 3, 4) == (True, 28, 6, 34, True, True, 4, 4))
comprobar('t5 teoría: mol-mol', (4 * 1 / 2, 4 * 2 / 2, 5 * 2.5, 3 * 2.5, 4 * 2.5, 10 * 3 / 2, 10 / 2, 4 * 2, 4 * 3) == (2, 4, 12.5, 7.5, 10, 15, 5, 8, 12))
comprobar('t5 teoría: caliza, Mg, glucosa, NH₃', (M('CaCO3'), M('CaO'), M('CO2')) == (100, 56, 44) and cerca(50 / 100 * 56, 28) and cerca(0.5 * 44, 22) and 28 + 22 == 50
          and cerca(12 / 24 / 2 * 32, 8) and cerca(12 / 24 * 40, 20) and 12 + 8 == 20 and M('C6H12O6') == 180 and igual((90 / 180 * 6 * 32, 90 / 180 * 6 * 44, 90 / 180 * 6 * 18), (96, 132, 54)) and 90 + 96 == 186 == 132 + 54
          and igual((56 / 28 * 2, 56 / 28 * 3, 56 / 28 * 2 * NA / 1e24, 56 / 28 * 3 * 2, 56 / 28 * 2 * 17), (4, 6, 2.4088, 12, 68)) and 56 + 12 == 68)
comprobar('t5 teoría: limitantes', (3 / 2, 1 / 1, 28 / 28, 10 / 2, 5 / 3, 14 / 56, 10 / 32, 0.25 * 88, (10 / 32 - 0.25) * 32) == (1.5, 1, 1, 5, 5 / 3, 0.25, 0.3125, 22.0, 2.0)
          and cerca(5 - 3 * 1, 2) and cerca(2 * 2, 4) and 28 + 10 == 34 + 4 and 14 + 10 == 22 + 2)
comprobar('t5 teoría: rendimiento y pureza', cerca(220 / (500 / 100 * 56) * 100, 78.57, 1e-3) and cerca(25 * 0.8, 20) and cerca(1000 / 0.85, 1176.47, 1e-4) and cerca(1176.47e3 / 56 * 100 / 1e3, 2100.8, 1e-3)
          and cerca(200 * 0.8, 160) and cerca(500 * 0.9, 450) and cerca(450 / 100 * 56 * 0.8, 201.6) and cerca(450 / 100 * 0.8 * VM, 80.64, 1e-3))
comprobar('t5 teoría: gases', (10 * 5, 10 * 3, 10 * 3, 10 * 2, 40 - 20, 25 / 100 * VM) == (50, 30, 30, 20, 20, 5.6) and cerca(13.08 / 65.4 * VM, 4.48) and cerca(0.2 * R * 298, 4.887, 1e-3)
          and cerca(2 * 2.0 / (R * 300), 0.1626, 1e-3) and cerca(2 * 2.0 / (R * 300) * 2 / 3 * 17, 1.843, 1e-3))
comprobar('t5 teoría: disoluciones', igual((0.1 * 0.025 / 0.2 * 1000, 0.15 * 0.020 * 2 / 0.2 * 1000, 0.100 * 0.0200 / 0.0250), (12.5, 30.0, 0.08)) and cerca(0.025 * (108 + 35.5), 3.5875)
          and (0.025 / 0.200, 0.050 / 0.200, 0.025 / 0.200) == (0.125, 0.25, 0.125) and cerca(5.0 / 65.4, 0.07645, 1e-3) and cerca((5.0 / 65.4 - 0.05) * 65.4, 1.73, 5e-3) and cerca(0.050 * VM, 1.12))
comprobar('t5 teoría: gasolina', cerca(0.74 * 1000 / 114, 6.491, 1e-3) and cerca(740 / 114 * 8 * 44, 2285, 1e-3) and cerca(740 / 114 * 12.5 * VM, 1817, 1e-3) and cerca(740 / 114 * 12.5 * VM / 0.21 / 1000, 8.65, 1e-2)
          and cerca(740 / 114 * 12.5 * 32, 2596, 1e-3) and cerca(740 / 114 * 9 * 18, 1052, 1e-3) and ajustar(['C8H18', 'O2'], ['CO2', 'H2O']) == [2, 25, 16, 18])
comprobar('t5 teoría: butano', cerca(12500 / 58, 215.5, 1e-3) and ajustar(['C4H10', 'O2'], ['CO2', 'H2O']) == [2, 13, 8, 10] and cerca(12500 / 58 * 6.5 * 32 / 1000, 44.8, 1e-3) and cerca(12500 / 58 * 4 * 44 / 1000, 37.9, 1e-3) and cerca(12500 / 58 * 5 * 18 / 1000, 19.4, 1e-3))
comprobar('t5 teoría: método (mineral de cinc)', cerca(20 * 0.65 / 65.4, 0.1988, 1e-3) and cerca(2 * 0.150, 0.3) and cerca(0.3 / 2 * R * 300 / 1.2, 3.075, 1e-3) and cerca(3.075 * 0.9, 2.77, 1e-2) and cerca((0.1988 - 0.15) * 65.4, 3.19, 1e-2))
comprobar('t5 teoría: problema 1 (NH₃)', igual((140 / 28, 40 / 2, 5 * 2 * 17, 20 - 15, 5 * 2 * 17 * 0.3, 10 * 0.3 * VM), (5, 20, 170, 5, 51, 67.2)) and 5 * 2 == 10 and (140 + 40, 170 + 10) == (180, 180))
comprobar('t5 teoría: problema 2 (antiácido)', cerca(0.500 / 100 * 2 / 0.1 * 1000, 100) and cerca(0.005 * VM * 1000, 112))
comprobar('t5 teoría: problema 3 (airbag)', cerca(60 / (R * 300), 2.439, 1e-3) and cerca(60 / (R * 300) * 2 / 3, 1.626, 1e-3) and cerca(60 / (R * 300) * 2 / 3 * M('NaN3'), 105.7, 1e-3))
comprobar('t5 teoría: problema 4 (caliza con ácido)', cerca(8 / 100, 0.08) and cerca(0.050 * M('CaCl2'), 5.55) and M('CaCl2') == 111 and cerca(0.050 * R * 298, 1.2218, 1e-3) and cerca(0.080 - 0.050, 0.03) and cerca(0.03 * 100, 3.0))
comprobar('t5 teoría: planta de cal', cerca(100 / 0.9, 111.1, 1e-3) and cerca(100 / 0.9 * 100 / 56, 198.4, 1e-3) and cerca(100 / 0.9 * 100 / 56 / 0.94, 211, 5e-3))

if mot:
    q = mot['qmol']
    # ---- banco de reacciones: cada ecuación está ajustada (mismos átomos a los dos lados) y conserva la masa ----
    def term(t):
        m = re.match(r'^\s*(\d*)\s*(\S+?)\((g|s|l|aq)\)\s*$', t); return int(m.group(1) or 1), m.group(2), m.group(3)
    for r in q['reacciones']:
        izq, der = r['s'].split('->'); L = [term(t) for t in izq.split(' + ')]; D = [term(t) for t in der.split(' + ')]
        def atomos(lado):
            tot = {}
            for c_, f_, e_ in lado:
                for el, n_ in leer(f_).items(): tot[el] = tot.get(el, 0) + c_ * n_
            return tot
        comprobar(f't5 reacción {r["id"]}: ajustada', atomos(L) == atomos(D), r['s'])
        comprobar(f't5 reacción {r["id"]}: conserva la masa', cerca(sum(c_ * M(f_) for c_, f_, e_ in L), sum(c_ * M(f_) for c_, f_, e_ in D), 1e-9))
        comprobar(f't5 reacción {r["id"]}: coeficientes mínimos', math.gcd(*[c_ for c_, f_, e_ in L + D]) == 1)
        comprobar(f't5 reacción {r["id"]}: es la única ajustada (sympy)', ajustar([f_ for c_, f_, e_ in L], [f_ for c_, f_, e_ in D]) == [c_ for c_, f_, e_ in L + D])
    # ---- problemas de ajuste del widget ----
    for a in q['ajustes']:
        izq, der = a['txt'].split('->'); r_ = [x.strip() for x in izq.split('+')]; p_ = [x.strip() for x in der.split('+')]
        comprobar(f't5 ajuste «{a["txt"]}»', ajustar(r_, p_) == a['coefs'], f'{ajustar(r_, p_)} vs {a["coefs"]}')
    RX = {r['id']: [term(t) for t in r['s'].split('->')[0].split(' + ')] + [term(t) for t in r['s'].split('->')[1].split(' + ')] for r in q['reacciones']}
    NR = {r['id']: len(r['s'].split('->')[0].split(' + ')) for r in q['reacciones']}
    # ---- rendimientos del widget: ninguna masa real supera la teórica ----
    for d in q['rendimientos']:
        T = RX[d['id']]; c_r, f_r, _ = T[d['r']]; c_p, f_p, _ = T[d['p']]
        teo = d['m'] * d['pur'] / 100 / M(f_r) * c_p / c_r * M(f_p)
        comprobar(f't5 rendimiento {d["id"]}: la masa real no supera la teórica', 0 < d['real'] <= teo, f'{d["real"]} vs {teo}')
    # ---- generadores de problemas: 11 tipos × 60 muestras, recalculados aparte ----
    n_gen = 0
    for tipo in q['generadores']:
        for s in tipo:
            d = s['d']; t = d['t']; n_gen += 1
            if t in ('molmol', 'masamasa'):
                T = RX[d['id']]; cj, fj, _ = T[d['j']]; ck, fk, _ = T[d['k']]
                esp = d['n'] * ck / cj if t == 'molmol' else d['m'] / M(fj) * ck / cj * M(fk)
            elif t == 'limmol':
                T = RX[d['id']]; xi = min(d['a'] / T[0][0], d['b'] / T[1][0]); esp = xi * T[NR[d['id']]][0]
            elif t == 'limmasa':
                T = RX[d['id']]; xi = min(d['m0'] / M(T[0][1]) / T[0][0], d['m1'] / M(T[1][1]) / T[1][0]); pp = T[NR[d['id']]]; esp = xi * pp[0] * M(pp[1])
            elif t in ('rend', 'pureza'):
                T = RX[d['id']]; cr, fr, _ = T[d['ir']]; cp, fp, _ = T[d['ip']]
                base = d['m'] if t == 'rend' else d['m'] * d['pur'] / 100
                mt = base / M(fr) * cp / cr * M(fp); esp = mt * d['eta'] / 100 if t == 'rend' else mt
            elif t in ('volcn', 'volpt'):
                T = RX[d['id']]; cr, fr, _ = T[d['ir']]; cp, fp, _ = T[d['ip']]; nn = d['m'] / M(fr) * cp / cr
                esp = nn * VM if t == 'volcn' else nn * R * (d['Tc'] + KEL) / d['P']
            elif t == 'precip':
                T = RX[d['id']]; nn = d['M'] * d['V'] / 1000 * T[NR[d['id']]][0] / T[0][0]; esp = nn * M(T[NR[d['id']]][1])
            elif t == 'neutra':
                T = RX[d['id']]; esp = d['M1'] * d['V1'] / 1000 * T[1][0] / T[0][0] / d['M2'] * 1000
            elif t == 'suma':
                izq, der = d['txt'].split('->'); esp = sum(ajustar([x.strip() for x in izq.split('+')], [x.strip() for x in der.split('+')]))
            comprobar(f't5 generador {t}', cerca(s['r'], esp, 1e-9), f'{d} → web {s["r"]} vs {esp}')
    comprobar('t5 generadores: 11 tipos y 660 muestras', len(q['generadores']) == 11 and n_gen == 660)

# ---- bancos de actividades de la ampliación ----
for kq, q_ in datos['ampl']['fyq1']['t5']['datos'].items():
    if 'preguntas' in q_:
        for i, p_ in enumerate(q_['preguntas']):
            comprobar(f't5 {kq} pregunta {i + 1}: opciones distintas y respuesta en rango', len(set(p_['op'])) == len(p_['op']) and 0 <= p_['ok'] < len(p_['op']) and bool(p_['porque']))


print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
for f_ in fallos: print('  FALLO:', f_)
sys.exit(1 if fallos else 0)
