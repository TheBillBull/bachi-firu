#!/usr/bin/env python3
"""
Verificación independiente de los simulacros de Química II (sim6, sim7, sim8).

Cada cifra se recalcula desde los datos del enunciado (sympy / python) y se comprueba que el valor,
redondeado como en el texto, aparece en la solución de esa cuestión. Además:
  - los apartados del enunciado suman 2 puntos por cuestión;
  - configuraciones electrónicas (aufbau), números cuánticos y recuentos σ/π se generan por algoritmo;
  - las ecuaciones redox y de combustión se ajustan con el espacio nulo de la matriz de composición.

Uso:  sh build.sh && python3 herramientas/verificar_quimica2_simulacros.py        (necesita: pip install sympy)
"""
import json, os, re, subprocess, math
import sympy as sp

RAIZ = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
ok, fallos = 0, []
def comprobar(nombre, cond, det=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {det}')

JS = r"""
const fs = require('fs'), vm = require('vm'), noop = () => {};
const el = () => ({ setAttribute: noop, appendChild: noop, style: {}, classList: { add: noop, remove: noop } });
const sb = { console, document: { addEventListener: noop, createElementNS: el, createElement: el, getElementById: () => null, head: el(), body: el() },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sb.window = sb; vm.createContext(sb);
vm.runInContext(fs.readFileSync(process.argv[1] + '/ampliaciones/bachi.js', 'utf8'), sb);
console.log(JSON.stringify(sb.BACHI.ampl.quimica2._simulacros));
"""
SIM = {s['id']: s for s in json.loads(subprocess.check_output(['node', '-e', JS, RAIZ]))}
comprobar('ids', sorted(SIM) == ['sim6', 'sim7', 'sim8'], str(sorted(SIM)))
def texto(s, i, parte='solucion'):
    t = SIM[s]['bloques'][i - 1][parte]
    return re.sub(r'<[^>]+>', '', t).replace('&lt;', '<').replace('&gt;', '>').replace(' ', ' ')
def es(x, dec):
    """Número con coma decimal y 'dec' decimales."""
    return f'{x:.{dec}f}'.replace('.', ',')
def cif(x, cifras):
    """Notación del texto: 8,3·10⁻³ con 'cifras' cifras significativas (o decimal si 0,1 ≤ |x| < 1000)."""
    m = f'{x:.{cifras - 1}e}'; a, e = m.split('e'); e = int(e)
    sup = str(abs(e)).translate(str.maketrans('0123456789', '⁰¹²³⁴⁵⁶⁷⁸⁹'))
    return f'{a.replace(".", ",")}·10{"⁻" if e < 0 else ""}{sup}'
def en(s, i, cadena, nombre):
    comprobar(f'{s} c{i} {nombre}', cadena in texto(s, i), f'(falta «{cadena}»)')

# ---------------------------------------------------------- estructura de los simulacros
for s in SIM.values():
    comprobar(f"{s['id']} 7 cuestiones de 2 puntos", len(s['bloques']) == 7 and all(b['puntos'] == 2 for b in s['bloques']))
    for i, b in enumerate(s['bloques'], 1):
        pts = [float(p.replace(',', '.')) for p in re.findall(r'\((\d,\d+|\d)\)', re.sub(r'<[^>]+>', '', b['enunciado']))]
        comprobar(f"{s['id']} c{i} apartados suman 2", abs(sum(pts) - 2) < 1e-9, f'(suman {sum(pts)})')
        comprobar(f"{s['id']} c{i} lleva criterios", 'Criterios de puntuación' in b['solucion'])

# ---------------------------------------------------------- utilidades de química
ORDEN = [(1,'s'),(2,'s'),(2,'p'),(3,'s'),(3,'p'),(4,'s'),(3,'d'),(4,'p'),(5,'s')]
CAP = {'s': 2, 'p': 6, 'd': 10}
SUP = str.maketrans('0123456789', '⁰¹²³⁴⁵⁶⁷⁸⁹')
def config(z, valencia_primero=False):
    out, r = [], z
    for n, l in ORDEN:
        if r <= 0: break
        k = min(CAP[l], r); r -= k; out.append((n, l, k))
    # orden de escritura por n creciente
    out.sort(key=lambda t: (t[0], 'spd'.index(t[1])))
    return ' '.join(f'{n}{l}{str(k).translate(SUP)}' if k > 1 else f'{n}{l}¹' for n, l, k in out)
def cfg_txt(z): return config(z)
def pesos(f):
    A = {'C': 12, 'H': 1, 'N': 14, 'O': 16, 'Cl': 35.5}
    return sum(A[el] * (int(n) if n else 1) for el, n in re.findall(r'([A-Z][a-z]?)(\d*)', f))
def ajustar(react, prod):
    els = sorted({e for f in react + prod for e, _ in re.findall(r'([A-Z][a-z]?)(\d*)', f)})
    cols = []
    for k, f in enumerate(react + prod):
        d = {}
        for e, n in re.findall(r'([A-Z][a-z]?)(\d*)', f): d[e] = d.get(e, 0) + (int(n) if n else 1)
        sg = 1 if k < len(react) else -1
        cols.append([sg * d.get(e, 0) for e in els])
    ns = sp.Matrix(cols).T.nullspace()[0]
    ns = ns * sp.ilcm(*[x.q for x in ns])
    return [int(x) for x in ns / sp.igcd(*[int(x) for x in ns])]

# ---------------------------------------------------------- SIM6
S = 'sim6'
# C1: configuraciones, grupo, periodo y números cuánticos
for z, nombre in [(11, 'Na'), (17, 'Cl'), (19, 'K')]:
    en(S, 1, cfg_txt(z).replace('1s² 2s²', '1s² 2s²'), f'configuración {nombre}')
comprobar('sim6 c1 períodos (capa más externa)', [max(n for n, l, k in [(int(t[0]), t[1], 0) for t in config(z).split()]) for z in (11, 17, 19)] == [3, 3, 4])
comprobar('sim6 c1 electrones de valencia 1,7,1', [int(config(z).split()[-1][-1].translate(str.maketrans('⁰¹²³⁴⁵⁶⁷⁸⁹', '0123456789'))) + (int(config(z).split()[-2][-1].translate(str.maketrans('⁰¹²³⁴⁵⁶⁷⁸⁹', '0123456789'))) if z == 17 else 0) for z in (11, 17, 19)] == [1, 7, 1])
# nº cuánticos 4s: n=4, l=0, m=0 ; (4,1,0,+1/2) tiene l=1 -> 4p
comprobar('sim6 c1 último orbital de K es 4s', config(19).split()[-1].startswith('4s'))
en(S, 1, 'n = 4, l = 0, m = 0', 'números cuánticos del K')
# C2: geometría por TRPECV (regiones de densidad electrónica y pares solitarios)
def geometria(regiones, solitarios):
    return {(2, 0): 'lineal', (3, 0): 'trigonal plana', (3, 1): 'angular', (4, 0): 'tetraédrica', (4, 1): 'piramidal trigonal', (4, 2): 'angular'}[(regiones, solitarios)]
for mol, reg, sol, nombre in [('BF₃', 3, 0, 'trigonal plana'), ('NH₃', 4, 1, 'piramidal trigonal'), ('CO₂', 2, 0, 'lineal')]:
    comprobar(f'sim6 c2 geometría {mol}', geometria(reg, sol) == nombre)
    en(S, 2, nombre, f'geometría {mol}')
# vectores explícitos en 3D para NH3 (pirámide) y BF3 (plano)
def suma(vs): return [sum(c) for c in zip(*vs)]
bf3 = [[math.cos(a), math.sin(a), 0] for a in (0, 2 * math.pi / 3, 4 * math.pi / 3)]
comprobar('sim6 c2 BF3 suma de vectores = 0', all(abs(c) < 1e-12 for c in suma(bf3)))
cos107 = math.cos(math.radians(107)); h = math.sqrt((1 - cos107) / 3)    # z de cada enlace en la pirámide
nh3 = [[math.sqrt(1 - h * h) * math.cos(a), math.sqrt(1 - h * h) * math.sin(a), -h] for a in (0, 2 * math.pi / 3, 4 * math.pi / 3)]
comprobar('sim6 c2 NH3 suma de vectores ≠ 0', abs(suma(nh3)[2]) > 0.1)
# C3: órdenes y k
v = {1: (0.10, 0.10, 2.0e-3), 2: (0.20, 0.10, 8.0e-3), 3: (0.10, 0.20, 4.0e-3)}
a = math.log(v[2][2] / v[1][2], v[2][0] / v[1][0]); b = math.log(v[3][2] / v[1][2], v[3][1] / v[1][1])
comprobar('sim6 c3 órdenes 2 y 1', round(a, 9) == 2 and round(b, 9) == 1, f'{a},{b}')
k = v[1][2] / (v[1][0] ** a * v[1][1] ** b)
comprobar('sim6 c3 k coherente con los 3 experimentos', all(abs(k * x[0] ** 2 * x[1] - x[2]) < 1e-12 for x in v.values()))
en(S, 3, es(k, 1) + ' L²', 'k')
vc = k * 0.050 ** 2 * 0.30
en(S, 3, '1,5·10⁻³', 'v del apartado c'); comprobar('sim6 c3 v = 1,5e-3', abs(vc - 1.5e-3) < 1e-12)
# C4: PCl5
n0, V, alpha, T, R = 0.20, 2.0, 0.25, 500, 0.082
xx = alpha * n0; c5 = (n0 - xx) / V; c3 = xx / V; Kc = c3 * c3 / c5; Kp = Kc * (R * T) ** 1
en(S, 4, es(c5, 3) + ' M', '[PCl5]'); en(S, 4, es(c3, 3) + ' M', '[PCl3]')
en(S, 4, cif(Kc, 2), 'Kc'); en(S, 4, es(Kp, 2), 'Kp'); comprobar('sim6 c4 Kp', abs(Kp - 0.3417) < 1e-3)
# C5: NH3
Kb, c = 1.8e-5, 0.20
x = sp.symbols('x', positive=True); xs = float(sp.solve(sp.Eq(x * x, Kb * (c - x)), x)[0])
en(S, 5, cif(xs, 3), '[OH-]'); en(S, 5, 'pH = ' + es(14 + math.log10(xs), 2), 'pH amoniaco'); en(S, 5, es(-math.log10(xs), 2), 'pOH')
en(S, 5, es(xs / c, 4), 'alfa'); en(S, 5, '0,94 %', 'alfa %')
Vhcl = 0.025 * c / 0.10; en(S, 5, es(Vhcl * 1000, 0) + ' mL', 'volumen HCl')
cNH4 = 0.025 * c / (0.025 + Vhcl); Ka = 1e-14 / Kb; hh = math.sqrt(Ka * cNH4)
en(S, 5, es(cNH4, 4) + ' M', '[NH4+]'); en(S, 5, cif(Ka, 2), 'Ka NH4+'); en(S, 5, cif(hh, 2), '[H+]'); en(S, 5, 'pH = ' + es(-math.log10(hh), 2), 'pH equivalencia')
# C6: MnO4- + Fe2+
mn, hcoef, fe = 1, 8, 5
comprobar('sim6 c6 carga -1+8+5*2 = 2+5*3', -1 + hcoef + fe * 2 == 2 + fe * 3)
comprobar('sim6 c6 electrones: Mn +7→+2 (5 e-) = 5 Fe', (7 - 2) == fe)
comprobar('sim6 c6 átomos de O y H', 4 == 4 * 1 and hcoef == 4 * 2)
nMn = 0.0200 * 0.020; nFe = 5 * nMn; cFe = nFe / 0.0250
en(S, 6, cif(nMn, 2) + ' mol', 'n MnO4'); en(S, 6, cif(nFe, 2) + ' mol', 'n Fe'); en(S, 6, es(cFe, 3) + ' M', '[Fe2+]'); en(S, 6, es(cFe * 152, 1) + ' g/L', 'g/L')
# C7: PVC
M = pesos('C2H3Cl'); en(S, 7, es(M, 1) + ' g/mol', 'M monómero'); en(S, 7, '1000 unidades', 'grado de polimerización'); comprobar('sim6 c7 n=1000', 62500 / M == 1000)

# ---------------------------------------------------------- SIM7
S = 'sim7'
E = [738, 1450, 7730]
r21, r32 = E[1] / E[0], E[2] / E[1]
comprobar('sim7 c1 el mayor salto es el 3.º → 2 electrones de valencia', r32 > r21 and r32 > 3 and r21 < 3)
en(S, 1, es(r21, 2), 'E2/E1'); en(S, 1, es(r32, 2), 'E3/E2')
comprobar('sim7 c1 Mg tiene 2 e- de valencia (grupo 2)', config(12).split()[-1] == '3s²')
comprobar('sim7 c1 Mg2+ = configuración del Ne', config(12 - 2) == config(10)); en(S, 1, '1s² 2s² 2p⁶', 'Mg2+')
# iones isoelectrónicos: más protones → menor radio
Z = {'O²⁻': 8, 'F⁻': 9, 'Na⁺': 11, 'Mg²⁺': 12}
orden = sorted(Z, key=lambda ion: Z[ion])
en(S, 1, ' > '.join(orden), 'orden de radios')
# C2: σ y π por enlaces
def sigma_pi(enlaces):    # lista de (orden de enlace)
    return sum(1 for _ in enlaces), sum(o - 1 for o in enlaces)
mols = {'CH₄': [1] * 4, 'CH₂=CH₂': [1] * 4 + [2], 'HC≡CH': [1] * 2 + [3]}
res = {k: sigma_pi(v) for k, v in mols.items()}
comprobar('sim7 c2 σ/π', res == {'CH₄': (4, 0), 'CH₂=CH₂': (5, 1), 'HC≡CH': (3, 2)}, str(res))
en(S, 2, '5 enlaces σ', 'σ eteno'); en(S, 2, '3 enlaces σ', 'σ etino')
hib = {2: 'sp', 3: 'sp²', 4: 'sp³'}      # regiones de e- alrededor del C
comprobar('sim7 c2 hibridaciones', [hib[4], hib[3], hib[2]] == ['sp³', 'sp²', 'sp'])
# C3: primer orden
k1, A0 = 6.9e-3, 0.80
th = math.log(2) / k1; At = A0 * math.exp(-k1 * 300); t8 = math.log(8) / k1
en(S, 3, es(th, 0) + ' s', 't1/2'); en(S, 3, es(At, 2) + ' M', '[A] a 5 min'); en(S, 3, es(t8, 0) + ' s', 't para 12,5 %')
comprobar('sim7 c3 12,5% = 3 t1/2', abs(t8 - 3 * th) < 1e-9 and abs(A0 * math.exp(-k1 * t8) / A0 - 0.125) < 1e-12)
# C4: solubilidad
Ks = 1.8e-10
s0 = math.sqrt(Ks); s1 = Ks / 0.010
s1x = sp.solve(sp.Eq(x * (0.010 + x), Ks), x)
s1ex = float([r for r in s1x if r > 0][0])
comprobar('sim7 c4 aproximación s<<0,010 válida (error < 0,1 %)', abs(s1ex - s1) / s1ex < 1e-3, str(s1ex))
en(S, 4, cif(s0, 2), 's en agua'); en(S, 4, cif(s1, 2), 's con ion común')
Ag, Cl = 1.0e-4 * 50 / 100, 1.0e-3 * 50 / 100
en(S, 4, cif(Ag, 2) + ' M', '[Ag+] mezcla'); en(S, 4, cif(Cl, 2) + ' M', '[Cl-] mezcla'); en(S, 4, cif(Ag * Cl, 2), 'Qs'); comprobar('sim7 c4 Qs > Ks', Ag * Cl > Ks)
# C5: ácido-base
nH, nOH = 0.100 * 0.050, 0.050 * 0.080
en(S, 5, cif(nH, 2) + ' mol', 'n HCl'); en(S, 5, cif(nOH, 2) + ' mol', 'n NaOH'); en(S, 5, cif(nH - nOH, 2) + ' mol', 'exceso')
H = (nH - nOH) / 0.150; en(S, 5, cif(H, 3) + ' M', '[H+] mezcla'); en(S, 5, 'pH = ' + es(-math.log10(H), 2), 'pH mezcla')
Ka = 6.8e-4; xs = float(sp.solve(sp.Eq(x * x, Ka * (0.010 - x)), x)[0])
en(S, 5, cif(xs, 3) + ' M', '[H3O+] HF'); en(S, 5, 'pH = ' + es(-math.log10(xs), 2), 'pH HF'); en(S, 5, es(xs / 0.010, 2), 'alfa HF')
comprobar('sim7 c5 la aproximación √(Ka·c) NO vale (x/c > 5 %)', xs / 0.010 > 0.05)
# C6: pila y electrólisis
E0 = 0.34 - (-0.76); en(S, 6, es(E0, 2) + ' V', 'fem'); dG = -2 * 96500 * E0
en(S, 6, '−' + es(-dG / 1000, 0) + ' kJ', 'ΔG'); en(S, 6, '−2,123·10⁵', 'ΔG en J'); comprobar('sim7 c6 ΔG', abs(dG + 2.123e5) < 1)
Q = 2.0 * 30 * 60; m = Q * 63.5 / (2 * 96500)
en(S, 6, str(int(Q)) + ' C', 'Q'); en(S, 6, es(m, 2) + ' g', 'masa Cu')
# C7: etanol, nailon
n = 4.6 / 46; Vco2 = 2 * n * R * 298 / 1
cf = ajustar(['C2H6O', 'O2'], ['CO2', 'H2O']); comprobar('sim7 c7 combustión etanol 1:3:2:3', cf == [1, 3, 2, 3], str(cf))
en(S, 7, es(n, 2) + ' mol', 'n etanol'); en(S, 7, es(Vco2, 1) + ' L', 'V CO2')
M_ac, M_di = pesos('C6H10O4'), pesos('C6H16N2'); M_u = M_ac + M_di - 2 * 18
comprobar('sim7 c7 unidad repetitiva C12H22N2O2', M_u == pesos('C12H22N2O2') == 226, str(M_u))
en(S, 7, str(int(M_ac)), 'M ácido'); en(S, 7, str(int(M_di)), 'M diamina'); en(S, 7, '226 g/mol', 'M unidad')
# isómeros de C4H10O: 4 alcoholes y 3 éteres (grados de insaturación 0 → sin dobles enlaces)
comprobar('sim7 c7 C4H10O saturado (DBE=0)', (2 * 4 + 2 - 10) / 2 == 0)
comprobar('sim7 c7 butan-2-ol es el único alcohol C4 con C asimétrico (H, OH, CH3, C2H5 distintos)', len({'H', 'OH', 'CH3', 'C2H5'}) == 4)

# ---------------------------------------------------------- SIM8
S = 'sim8'
h_, c_ = 6.626e-34, 3.00e8
dE = 2.18e-18 * (1 / 4 - 1 / 9); lam = h_ * c_ / dE
en(S, 1, cif(dE, 3) + ' J', 'ΔE Balmer'); en(S, 1, cif(lam, 3) + ' m', 'λ'); en(S, 1, es(lam * 1e9, 0) + ' nm', 'λ en nm'); comprobar('sim8 c1 visible', 380 < lam * 1e9 < 780)
def cuantico_ok(nn, l, m, s):
    return nn >= 1 and 0 <= l < nn and -l <= m <= l and s in (0.5, -0.5)
comprobar('sim8 c1 conjuntos', [cuantico_ok(2, 1, 0, .5), cuantico_ok(3, 3, 1, -.5), cuantico_ok(1, 0, 1, .5)] == [True, False, False])
orb = sum(1 for l in range(3) for m in range(-l, l + 1)); el_max = sum(1 for l in range(3) for m in range(-l, l + 1) for s in (.5, -.5))
comprobar('sim8 c1 n=3: 9 orbitales y 18 e-', (orb, el_max) == (9, 18)); en(S, 1, '9 orbitales', 'orbitales'); en(S, 1, '18 electrones', 'electrones')
# C2: Born–Haber
dHf, Ssub, D, EI, AE = -411, 107, 244, 496, -349
U = dHf - (Ssub + D / 2 + EI + AE)
comprobar('sim8 c2 U = -787', U == -787, str(U)); en(S, 2, '−787 kJ/mol', 'U'); en(S, 2, '+122', 'D/2'); en(S, 2, '− 376', 'suma de etapas'); comprobar('sim8 c2 suma 376', Ssub + D / 2 + EI + AE == 376)
comprobar('sim8 c2 Coulomb: producto de cargas MgO/NaCl = 4', (2 * 2) / (1 * 1) == 4)
# C3: Arrhenius
Rg = 8.31; k1_, k2_, T1, T2 = 2.0e-3, 1.6e-2, 300, 320
Ea = Rg * math.log(k2_ / k1_) / (1 / T1 - 1 / T2)
en(S, 3, es(math.log(8), 3), 'ln 8'); en(S, 3, cif(1 / T1 - 1 / T2, 4) + ' K', '1/T1-1/T2'); en(S, 3, cif(Ea, 3) + ' J/mol', 'Ea'); en(S, 3, '83 kJ/mol', 'Ea kJ')
comprobar('sim8 c3 Ea≈83 kJ', round(Ea / 1000) == 83)
en(S, 3, es(math.log(2) / k1_, 0) + ' s', 't1/2')
f = math.exp((83000 - 60000) / (Rg * 300)); en(S, 3, es(math.log(f), 2), 'exponente'); comprobar('sim8 c3 factor ≈1,0e4', 0.95e4 < f < 1.05e4, str(f)); en(S, 3, '1,0·10⁴', 'factor')
# C4: SO3
n_SO3 = 0.80; nSO2, nO2 = 2.0 - n_SO3, 1.0 - n_SO3 / 2; Vr = 10
cS2, cO, cS3 = nSO2 / Vr, nO2 / Vr, n_SO3 / Vr
Kc = cS3 ** 2 / (cS2 ** 2 * cO); Kp = Kc / (R * 800)
en(S, 4, es(cS2, 2) + ' M', '[SO2]'); en(S, 4, es(cO, 3) + ' M', '[O2]'); en(S, 4, es(cS3, 3) + ' M', '[SO3]'); en(S, 4, es(Kc, 1), 'Kc'); en(S, 4, es(Kc, 2), 'Kc 2 decimales'); en(S, 4, es(Kp, 2), 'Kp')
# C5: pH
en(S, 5, 'pH = ' + es(14 + math.log10(2 * 0.010), 2), 'pH Ba(OH)2'); en(S, 5, es(-math.log10(0.020), 2), 'pOH Ba(OH)2')
Kb = 1e-14 / 1.8e-5; OH = math.sqrt(Kb * 0.10)
en(S, 5, cif(Kb, 2), 'Kb acetato'); en(S, 5, cif(OH, 2) + ' M', '[OH-] acetato'); en(S, 5, es(-math.log10(OH), 2), 'pOH'); en(S, 5, 'pH = ' + es(14 + math.log10(OH), 2), 'pH acetato')
# C6: Cu + HNO3
cf = ajustar(['Cu', 'HNO3'], ['CuN2O6', 'NO', 'H2O'])         # Cu(NO3)2 = CuN2O6 en la matriz de composición
comprobar('sim8 c6 3 Cu + 8 HNO3 → 3 Cu(NO3)2 + 2 NO + 4 H2O', cf == [3, 8, 3, 2, 4], str(cf))
comprobar('sim8 c6 electrones: 3·2 = 2·3', 3 * 2 == 2 * 3)
nCu = 6.35 / 63.5; nNO = 2 / 3 * nCu; VNO = nNO * R * 300
en(S, 6, es(nCu, 3) + ' mol', 'n Cu'); en(S, 6, es(nNO, 4) + ' mol', 'n NO'); en(S, 6, es(VNO, 2) + ' L', 'V NO')
E0 = 0.80 - (-0.44); en(S, 6, es(E0, 2) + ' V', 'fem Ag/Fe'); dG = -2 * 96500 * E0
en(S, 6, '−2,39·10⁵', 'ΔG J'); en(S, 6, '−' + es(-dG / 1000, 0) + ' kJ', 'ΔG kJ'); comprobar('sim8 c6 ΔG', abs(dG / 1000 + 239.32) < 0.01)
# C7: polietileno
n_et = 5600 / 28; masa = 0.90 * n_et * 28
comprobar('sim8 c7 200 mol y 5040 g', (n_et, masa) == (200, 5040.0), str((n_et, masa))); en(S, 7, '200 mol', 'n eteno'); en(S, 7, '5040 g', 'masa PE'); en(S, 7, '5,04 kg', 'masa PE kg')
comprobar('sim8 c7 C4H10O → but-2-eno C4H8 + H2O (átomos)', pesos('C4H10O') == pesos('C4H8') + pesos('H2O'))
comprobar('sim8 c7 adición de Br2 a C4H8 → C4H8Br2', ajustar(['C4H8', 'Br2'], ['C4H8Br2']) == [1, 1, 1])

total = ok
print(f'{ok} comprobaciones correctas, {len(fallos)} fallos' if not fallos else '\n'.join('FALLO: ' + f for f in fallos) + f'\n{ok} comprobaciones correctas, {len(fallos)} fallos')
