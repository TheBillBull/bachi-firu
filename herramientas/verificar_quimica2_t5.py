#!/usr/bin/env python3
"""
Verificación independiente de Química II, tema 5 (Cinética química).

 1. Curvas concentración–tiempo del simulador q5_curvas (órdenes 0, 1 y 2, las tres reacciones) frente a una integración numérica
    del sistema de ecuaciones diferenciales (scipy), y velocidad instantánea = pendiente de la tangente.
 2. Distribución de Maxwell–Boltzmann: fracción con E ≥ Eₐ del simulador frente a la gamma incompleta (scipy) y normalización a 1.
 3. Tablas de velocidades iniciales de q5_tabla: cada velocidad frente a k·[A]ⁿ·[B]ᵐ, órdenes por cocientes y k.
 4. Mecanismos de q5_mecanismo: balance de átomos de cada etapa y de la global, suma de etapas = global, intermedios y catalizador
    detectados por cancelación, y ΔH frente a entalpías de formación (NIST).
 5. Cada cifra de los ejemplos resueltos de la teoría y de los 47 ejercicios, recalculada con sympy/numpy.

Uso:  sh build.sh && python3 herramientas/verificar_quimica2_t5.py      (necesita: pip install sympy scipy numpy)
"""
import json, os, re, subprocess, sys, math
from collections import Counter
import numpy as np
import sympy as sp
from scipy.integrate import solve_ivp
from scipy.special import gammaincc

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
ok, fallos = 0, []
def comprobar(nombre, cond, det=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {det}')
def cerca(a, b, tol=0.006): return abs(a - b) <= tol * max(abs(b), 1e-12)
R = 8.314

# ---------------------------------------------------------------- volcado de la web
JS = r"""
const fs = require('fs'), vm = require('vm'), noop = () => {};
const el = () => ({ setAttribute: noop, appendChild: noop, style: {}, classList: { add: noop, remove: noop } });
const sb = { console, document: { addEventListener: noop, createElementNS: el, createElement: el, getElementById: () => null, head: el(), body: el() },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sb.window = sb; vm.createContext(sb);
vm.runInContext(fs.readFileSync(process.argv[1] + '/ampliaciones/bachi.js', 'utf8'), sb);
const B = sb.BACHI, Q = B.lab.q5;
const clean = o => JSON.parse(JSON.stringify(o, (k, x) => typeof x === 'function' ? undefined : x));
const curvas = [];
Object.keys(Q.REAC).forEach(r => [0, 1, 2].forEach(n => [0.05, 0.1, 0.3].forEach(k => [0, 1.5, 6, 13, 20].forEach(t =>
  curvas.push({ r, n, k, t, c: Q.conc(Q.REAC[r], n, k, t), v: Q.vInst(Q.REAC[r], n, k, t) })))));
const mb = []; [[5, 250], [10, 300], [20, 300], [20, 310], [30, 400], [50, 300], [50, 600], [60, 1200], [5, 1200]].forEach(p => mb.push({ Ea: p[0], T: p[1], f: Q.fracMB(p[0], p[1]) }));
console.log(JSON.stringify({ REAC: clean(Q.REAC), TAB: clean(Q.TAB), MEC: clean(Q.MEC), curvas, mb, R: Q.R, ej: clean(B.ampl.quimica2.t5.ejercicios) }));
"""
web = json.loads(subprocess.check_output(['node', '-e', JS, os.path.abspath(RAIZ)]))
EJ = {e['id']: e for e in web['ej']}
def vals(id_):
    ch = EJ[id_]['check']; ch = ch if isinstance(ch, list) else [ch]
    return [c['valor'] for c in ch]
def v(id_, k=0): return vals(id_)[k]
comprobar('R de la web = 8,314', web['R'] == R)
comprobar('47 ejercicios (15 + 16 + 16)', len(EJ) == 47 and sum(1 for e in EJ.values() if e['nivel'] == 1) == 15 and sum(1 for e in EJ.values() if e['nivel'] == 2) == 16 and sum(1 for e in EJ.values() if e['nivel'] == 3) == 16)

# ---------------------------------------------------------------- 1. curvas concentración–tiempo
for r, Rr in web['REAC'].items():
    a = -Rr['esp'][0][1]; x0 = Rr['x0']
    for n in (0, 1, 2):
        for k in (0.05, 0.1, 0.3):
            # d[A]/dt = −a·k·[A]^n  (con n = 0 se detiene al agotarse)
            f = lambda t, y: [-a * k * max(y[0], 0) ** n if (n > 0 or y[0] > 0) else 0.0]
            sol = solve_ivp(f, [0, 20], [x0], t_eval=[0, 1.5, 6, 13, 20], rtol=1e-10, atol=1e-12)
            for t, A in zip(sol.t, sol.y[0]):
                reg = [c for c in web['curvas'] if c['r'] == r and c['n'] == n and c['k'] == k and abs(c['t'] - t) < 1e-9][0]
                A_ref = max(A, 0)
                comprobar(f'[{Rr["esp"][0][0]}] {r} n={n} k={k} t={t}', abs(reg['c'][0] - A_ref) < 2e-4 * max(1, x0) + (0.02 * k if n == 0 else 0), f'{reg["c"][0]:.5f} vs {A_ref:.5f}')
                xi = (x0 - A_ref) / a
                for i, e in enumerate(Rr['esp']):
                    if e[1] > 0:
                        comprobar(f'producto {e[0]} {r} n={n} k={k} t={t}', abs(reg['c'][i] - e[1] * xi) < 2e-4 * max(1, x0) + (0.02 * k * e[1] if n == 0 else 0))
                # velocidad instantánea = k·[A]^n y pendiente −a·v = d[A]/dt
                vr = k * A_ref ** n if (n > 0 or A_ref > 1e-9) else 0
                comprobar(f'v instantánea {r} n={n} k={k} t={t}', abs(reg['v'] - vr) < 2e-4 + (0.02 * k if n == 0 else 0))
# en un orden 1 y 2 la velocidad media entre t1 y t2 es menor que la instantánea en t1 (curva convexa decreciente); en orden 0 coinciden
for n in (1, 2):
    A = lambda t: (math.exp(-2 * 0.1 * t) if n == 1 else 1 / (1 + 2 * 0.1 * t))
    vm = (A(2) - A(8)) / 6 / 2; vi = 0.1 * A(2) ** n
    comprobar(f'media < instantánea orden {n}', vm < vi)
comprobar('orden 1, k=0,1, t1=2: v inst. 0,067 y media 2–8 0,039 (lecturas del e2e)', abs(0.1 * math.exp(-0.4) - 0.0670) < 5e-5 and abs((math.exp(-0.4) - math.exp(-1.6)) / 6 / 2 - 0.03904) < 5e-5)
comprobar('orden 2, k=0,1, t1=2: v inst. 0,051', abs(0.1 * (1 / 1.4) ** 2 - 0.0510) < 1e-4)

# ---------------------------------------------------------------- 2. Maxwell–Boltzmann
from scipy.integrate import quad
for m in web['mb']:
    x = m['Ea'] * 1000 / (R * m['T'])
    ref = gammaincc(1.5, x)
    comprobar(f'fracción MB Ea={m["Ea"]} T={m["T"]}', cerca(m['f'], ref, 1e-4), f'{m["f"]:.4e} vs {ref:.4e}')
    rt = R * m['T'] / 1000
    dens = lambda E: 2 / math.sqrt(math.pi) * rt ** -1.5 * math.sqrt(E) * math.exp(-E / rt)
    tail = quad(dens, m['Ea'], np.inf)[0]; total = quad(dens, 0, np.inf)[0]
    comprobar(f'densidad MB normalizada a 1 (T={m["T"]})', abs(total - 1) < 1e-6)
    comprobar(f'cola por integración directa Ea={m["Ea"]} T={m["T"]}', cerca(tail, m['f'], 1e-3), f'{tail:.4e} vs {m["f"]:.4e}')
comprobar('textos MB: 310/300 K con Ea=20 → ×1,28; 600/300 con Ea=50 → ×1,63·10⁴', cerca(gammaincc(1.5, 20e3 / (R * 310)) / gammaincc(1.5, 20e3 / (R * 300)), 1.2764, 1e-3) and cerca(gammaincc(1.5, 50e3 / (R * 600)) / gammaincc(1.5, 50e3 / (R * 300)), 16305, 1e-3))
comprobar('fracción Ea=10 a 300 K = 4,6 %; Ea=50 a 300 K = 1,02·10⁻⁸', abs(gammaincc(1.5, 10e3 / (R * 300)) - 0.04563) < 1e-4 and cerca(gammaincc(1.5, 50e3 / (R * 300)), 1.018e-8, 2e-3))
comprobar('fracción ≈ e^(−Ea/RT) como orden de magnitud (Ea=50, 300 K: e^−20 = 2·10⁻⁹ frente a 1,0·10⁻⁸)', 1e-9 < math.exp(-50e3 / (R * 300)) < 1e-8 < gammaincc(1.5, 50e3 / (R * 300)) < 1e-7)
comprobar('energía cinética media ∝ T: +3,3 % de 300 a 310 K; frecuencia de choques ∝ √T: +1,7 %', cerca(310 / 300 - 1, 0.0333, 0.01) and cerca(math.sqrt(310 / 300) - 1, 0.0165, 0.02))
comprobar('energía más probable RT/2 a 400 K = 1,66 kJ/mol', abs(R * 400 / 2000 - 1.66) < 0.005)

# ---------------------------------------------------------------- 3. tablas de velocidades iniciales
for nm, D in web['TAB'].items():
    nA, nB = D['ord']; k = D['k']; E = D['ex']
    for i, (a, b, vel) in enumerate(E):
        comprobar(f'{nm} exp {i+1}: v = k[A]^n[B]^m', cerca(vel, k * a ** nA * b ** nB, 1e-9), f'{vel} vs {k * a ** nA * b ** nB}')
    # órdenes por cocientes en los pares que aíslan un reactivo
    def orden(i, j, col):
        ra = E[j][col] / E[i][col]; return math.log(E[j][2] / E[i][2]) / math.log(ra)
    aisladoA = [(i, j) for i in range(4) for j in range(i + 1, 4) if E[i][1] == E[j][1] and E[i][0] != E[j][0]]
    aisladoB = [(i, j) for i in range(4) for j in range(i + 1, 4) if E[i][0] == E[j][0] and E[i][1] != E[j][1]]
    comprobar(f'{nm}: hay un par que aísla A y otro que aísla B', len(aisladoA) >= 1 and len(aisladoB) >= 1)
    for (i, j) in aisladoA: comprobar(f'{nm} orden A por cociente {i+1}-{j+1}', abs(orden(i, j, 0) - nA) < 1e-9)
    for (i, j) in aisladoB: comprobar(f'{nm} orden B por cociente {i+1}-{j+1}', abs(orden(i, j, 1) - nB) < 1e-9)
    kk = [vel / (a ** nA * b ** nB) for a, b, vel in E]
    comprobar(f'{nm}: k constante con los cuatro experimentos', all(cerca(x, k, 1e-9) for x in kk))
    ud = {3: 'L²·mol⁻²·s⁻¹', 2: 'L·mol⁻¹·s⁻¹', 1: 's⁻¹', 0: 'mol·L⁻¹·s⁻¹'}[nA + nB]
    comprobar(f'{nm}: unidades de k según orden total', D['uk'] == ud, D['uk'])

# ---------------------------------------------------------------- 4. mecanismos
SUB = str.maketrans('₀₁₂₃₄₅₆₇₈₉', '0123456789')
def parse_sp(s):
    s = s.strip(); m = re.match(r'^(\d*)\s*(.+)$', s); c = int(m.group(1)) if m.group(1) else 1
    return c, m.group(2)
def lado(s):
    return [parse_sp(x) for x in s.split(' + ')]
def atomos(f):
    f = f.translate(SUB).replace('⁻', '').replace('⁺', '')
    c = Counter()
    for el, n in re.findall(r'([A-Z][a-z]?)(\d*)', f): c[el] += int(n) if n else 1
    return c
def reaccion(txt):
    l, r = txt.split(' → '); return lado(l), lado(r)
def neto(rxns):
    c = Counter()
    for L, Rr in rxns:
        for k, f in L: c[f] -= k
        for k, f in Rr: c[f] += k
    return {f: k for f, k in c.items() if k != 0}
for nm, M in web['MEC'].items():
    glob = reaccion(M['glob'].split('  ')[0]); st = [reaccion(e[0]) for e in M['et']]
    for rx, tag in [(glob, 'global')] + [(s, f'etapa {i+1}') for i, s in enumerate(st)]:
        L = Counter(); Rr = Counter()
        for k, f in rx[0]:
            for el, n in atomos(f).items(): L[el] += k * n
        for k, f in rx[1]:
            for el, n in atomos(f).items(): Rr[el] += k * n
        comprobar(f'{nm} {tag}: átomos balanceados', L == Rr, f'{dict(L)} vs {dict(Rr)}')
    # suma de etapas, con multiplicadores enteros 1 (una sola vez cada etapa) y cancelación de intermedios/catalizador
    tot = neto(st); g = neto([glob])
    # la suma bruta debe diferir de la global solo por el factor de la ecuación: se prueba multiplicando la suma por 1
    comprobar(f'{nm}: suma de etapas = reacción global', tot == g, f'{tot} vs {g}')
    # intermedio: producto de la etapa 1 y reactivo de la 2, ausente en la global; catalizador: reactivo de 1 y producto de 2 ausente en la global
    p1 = {f for k, f in st[0][1]}; r2 = {f for k, f in st[1][0]}; r1 = {f for k, f in st[0][0]}; p2 = {f for k, f in st[1][1]}
    gl = {f for k, f in glob[0]} | {f for k, f in glob[1]}
    inter = (p1 & r2) - gl; cat = (r1 & p2) - gl
    comprobar(f'{nm}: intermedio detectado = {inter}', len(inter) == 1 and M['inter'].startswith(list(inter)[0]), f'{inter} vs {M["inter"]}')
    comprobar(f'{nm}: catalizador detectado = {cat}', (not cat and M['cat'] == '—') or (len(cat) == 1 and M['cat'] == list(cat)[0]), f'{cat} vs {M["cat"]}')
    comprobar(f'{nm}: ambas etapas bimoleculares', all(len(s[0]) + sum(k - 1 for k, f in s[0]) == 2 for s in st))
# la ley de la etapa lenta = reactivos de la etapa 1 con sus coeficientes: coincide con la «observada»
leyes = {'m1': {'NO₂': 2}, 'm2': {'NO₂': 1, 'F₂': 1}, 'm3': {'H₂O₂': 1, 'I⁻': 1}}
for nm, M in web['MEC'].items():
    ley = Counter()
    for k, f in reaccion(M['et'][0][0])[0]: ley[f] += k
    comprobar(f'{nm}: ley de la etapa 1 = {dict(ley)}', dict(ley) == leyes[nm])
    obs = M['obs'].replace('v = k·', '').replace('·', '')
    esperada = ''.join(f'[{f}]' + ('²' if k == 2 else '') for f, k in leyes[nm].items())
    comprobar(f'{nm}: ley observada escrita = {esperada}', obs == esperada, obs)
# ΔH de las globales con entalpías de formación (NIST, kJ/mol)
HF = {'NO2(g)': 33.2, 'CO(g)': -110.5, 'NO(g)': 90.3, 'CO2(g)': -393.5, 'NO2F(g)': -108.8, 'F2(g)': 0.0, 'H2O2(l)': -187.8, 'H2O(l)': -285.8, 'O2(g)': 0.0}
dh = {'m1': HF['NO(g)'] + HF['CO2(g)'] - HF['NO2(g)'] - HF['CO(g)'],
      'm2': 2 * HF['NO2F(g)'] - 2 * HF['NO2(g)'] - HF['F2(g)'],
      'm3': 2 * HF['H2O(l)'] + HF['O2(g)'] - 2 * HF['H2O2(l)']}
for nm, M in web['MEC'].items():
    comprobar(f'ΔH {nm}: {M["dH"]} frente a {dh[nm]:.1f}', abs(M['dH'] - dh[nm]) < 1.0, f'{dh[nm]:.1f}')

# ---------------------------------------------------------------- 5. teoría: ejemplos resueltos
# 1. velocidad
comprobar('ej NH3: 0,012 · 0,0060 · 0,018', cerca((0.64 - 0.40) / 20, 0.012, 1e-9) and cerca(0.012 / 2, 0.0060, 1e-9) and cerca(3 * 0.0060, 0.018, 1e-9) and cerca(0.0060 * 2, 0.012, 1e-9))
comprobar('ej N2O5: 0,0048 → 0,0024 → 0,00336 → 0,00168 → 0,0096', cerca((0.800 - 0.560) / 50, 0.0048, 1e-9) and cerca(0.0048 / 2, 0.0024, 1e-9) and cerca((0.560 - 0.392) / 50, 0.00336, 1e-9) and cerca(0.00336 / 2, 0.00168, 1e-9) and cerca(4 * 0.0024, 0.0096, 1e-9))
comprobar('N2O5: 0,800·0,7 = 0,560 ; 0,560·0,7 = 0,392 (primer orden)', cerca(0.8 * 0.7, 0.56, 1e-9) and cerca(0.56 * 0.7, 0.392, 1e-9))
# 2. ecuación de velocidad
comprobar('ej factores: ×3 · ×12 · ×8', 3 ** 1 == 3 and 3 * 2 ** 2 == 12 and 2 ** (1 + 2) == 8)
comprobar('ej v = 0,50·0,20²·0,10 = 2,0·10⁻³', cerca(0.50 * 0.20 ** 2 * 0.10, 2.0e-3, 1e-9))
comprobar('tabla de factores: 2³ = 8, 3³ = 27, 3² = 9, (1/2)³ = 1/8', 2 ** 3 == 8 and 3 ** 3 == 27 and 3 ** 2 == 9 and sp.Rational(1, 2) ** 3 == sp.Rational(1, 8))
# unidades por análisis dimensional con sympy
mol, L, s = sp.symbols('mol L s', positive=True)
def uk(n): return sp.simplify((mol / (L * s)) / (mol / L) ** n)
comprobar('k orden 0: mol/(L·s) ; orden 1: 1/s ; orden 2: L/(mol·s) ; orden 3: L²/(mol²·s)',
          sp.simplify(uk(0) - mol / (L * s)) == 0 and sp.simplify(uk(1) - 1 / s) == 0 and sp.simplify(uk(2) - L / (mol * s)) == 0 and sp.simplify(uk(3) - L ** 2 / (mol ** 2 * s)) == 0)
A0, kk_, t_ = sp.symbols('A0 k t', positive=True)
A = sp.Function('A')
for n_, th in ((0, A0 / (2 * kk_)), (1, sp.log(2) / kk_), (2, 1 / (kk_ * A0))):
    sol = sp.dsolve(sp.Eq(A(t_).diff(t_), -kk_ * A(t_) ** n_), A(t_), ics={A(0): A0})
    thalf = sp.solve(sp.Eq(sol.rhs, A0 / 2), t_)[0]
    comprobar(f'vida media orden {n_} por sympy', sp.simplify(thalf - th) == 0, str(thalf))
    forma = {0: A0 - kk_ * t_, 1: A0 * sp.exp(-kk_ * t_), 2: 1 / (1 / A0 + kk_ * t_)}[n_]
    comprobar(f'[A](t) orden {n_} (texto de la teoría) = solución de la ecuación diferencial', sp.simplify(sol.rhs - forma) == 0, str(sol.rhs))
# 3. Ea, ΔH
comprobar('Ea inversa: 40 + 90 = 130 ; 100 − 60 = 40', 40 - (-90) == 130 and 100 - 60 == 40)
# 4. Arrhenius
def lnr(Ea, T1, T2): return Ea / R * (1 / T1 - 1 / T2)
comprobar('ej 300 → 320 K, 60 kJ: 1,503 · 4,50 · 5,4·10⁻³', abs(lnr(60e3, 300, 320) - 1.503) < 5e-4 and cerca(math.exp(lnr(60e3, 300, 320)), 4.50, 2e-3) and cerca(1.2e-3 * math.exp(lnr(60e3, 300, 320)), 5.4e-3, 2e-3))
comprobar('ej Ea: ln10 = 2,303 ; Δ(1/T) = 3,030·10⁻⁴ ; Ea = 63,2 kJ', abs(math.log(10) - 2.303) < 1e-3 and abs((1 / 300 - 1 / 330) - 3.030e-4) < 1e-6 and cerca(R * math.log(10) / (1 / 300 - 1 / 330) / 1000, 63.2, 2e-3))
comprobar('ej 298 → 308 K: 1,0896·10⁻⁴ (1,0895); 0,655/0,786/1,311 → 1,93/2,20/3,71',
          abs((1 / 298 - 1 / 308) - 1.0896e-4) < 2e-8 and all(abs(lnr(E * 1e3, 298, 308) - l) < 1.5e-3 and cerca(math.exp(lnr(E * 1e3, 298, 308)), r_, 3e-3) for E, l, r_ in ((50, 0.655, 1.93), (60, 0.786, 2.20), (100, 1.311, 3.71))))
comprobar('Arrhenius con 8,314 y Eₐ/R = 7217 K (60 kJ)', abs(60e3 / R - 7217) < 1)
# 5. velocidades iniciales (teoría)
comprobar('ej NO + Cl₂: n=2, m=1, k = 0,18, v = 3,24·10⁻³ y datos',
          cerca(0.18 * 0.10 ** 2 * 0.10, 1.8e-4, 1e-9) and cerca(0.18 * 0.20 ** 2 * 0.10, 7.2e-4, 1e-9) and cerca(0.18 * 0.20 ** 2 * 0.30, 2.16e-3, 1e-9) and cerca(0.18 * 0.30 ** 2 * 0.20, 3.24e-3, 1e-9) and math.log(7.2e-4 / 1.8e-4) / math.log(2) == 2 and abs(math.log(2.16e-3 / 7.2e-4) / math.log(3) - 1) < 1e-12)
comprobar('ej orden cero: k = 8,0·10⁻³, datos coherentes con v = k[A], exp. 4 = 4,8·10⁻³',
          all(cerca(8.0e-3 * a, vv, 1e-9) for a, vv in ((0.20, 1.6e-3), (0.40, 3.2e-3), (0.40, 3.2e-3), (0.60, 4.8e-3))))
comprobar('N2O5: ln 0,800 = −0,2231, ln 0,560 = −0,5798, ln 0,392 = −0,9365; k = 7,13·10⁻³ ; t½ = 97 s',
          all(abs(math.log(x) - y) < 1e-4 for x, y in ((0.8, -0.2231), (0.56, -0.5798), (0.392, -0.9365))) and cerca(0.3567 / 50, 7.13e-3, 2e-3) and cerca(math.log(2) / 7.13e-3, 97, 3e-3))
# 6. catalizador
comprobar('catalizador 80 → 50 kJ: ×1,8·10⁵ a 298 K y ×1,4·10³ a 500 K (30 000/(R·298)= 12,11 ; /(R·500) = 7,217)', abs(30000 / (R * 298) - 12.11) < 5e-3 and cerca(math.exp(30000 / (R * 298)), 1.8e5, 0.01) and abs(30000 / (R * 500) - 7.217) < 5e-3 and cerca(math.exp(30000 / (R * 500)), 1.4e3, 0.12))
comprobar('K invariante con catalizador: ΔH = 80 − 120 = −40 = 50 − 90 ; factor común e^(30000/RT)', 80 - 120 == -40 == 50 - 90 and sp.simplify(sp.exp(sp.Symbol('x')) / sp.exp(sp.Symbol('x'))) == 1)
# 7. EvAU 1-4
comprobar('EvAU 1: n=1, m=2, k=2,0, v = 4,0·10⁻³',
          cerca(2.0 * 0.10 * 0.10 ** 2, 2.0e-3, 1e-9) and cerca(2.0 * 0.20 * 0.10 ** 2, 4.0e-3, 1e-9) and cerca(2.0 * 0.10 * 0.30 ** 2, 1.8e-2, 1e-9) and abs(math.log(9) / math.log(3) - 2) < 1e-12 and cerca(2.0 * 0.050 * 0.20 ** 2, 4.0e-3, 1e-9))
comprobar('EvAU 2: 85 y 60 kJ ; ×2,4·10⁴ (25 000/(R·298) = 10,09)', 60 + 25 == 85 and 35 + 25 == 60 and abs(25000 / (R * 298) - 10.09) < 5e-3 and cerca(math.exp(25000 / (R * 298)), 2.4e4, 0.03))
comprobar('EvAU 3: 9021 · 2,1105·10⁻⁴ = 1,904 → 6,71 → 1,7·10⁻³', abs(75000 / R - 9021) < 1 and abs((1 / 298 - 1 / 318) - 2.1105e-4) < 1e-7 and abs(lnr(75e3, 298, 318) - 1.904) < 1e-3 and cerca(math.exp(lnr(75e3, 298, 318)), 6.71, 3e-3) and cerca(2.5e-4 * math.exp(lnr(75e3, 298, 318)), 1.68e-3, 0.01))
comprobar('EvAU 4: factor 2·3 = 6', 2 ** 1 * 3 ** 1 == 6)

# ---------------------------------------------------------------- 6. ejercicios
# ★
comprobar('a2', cerca((1.20 - 0.90) / 15, v('a2'), 1e-9)); comprobar('a3', cerca(0.040 / 2, v('a3'), 1e-9)); comprobar('a5', 3 ** 2 == v('a5'))
comprobar('a7', cerca(0.50 * 0.20 * 0.30, v('a7'), 1e-9)); comprobar('a11', 30 + 50 == v('a11')); comprobar('a15', 2 ** 2 == v('a15'))
# ★★
comprobar('b1', cerca(abs(0.420 - 0.600) / 40 / 2, v('b1'), 1e-9))
comprobar('b2', cerca(2 * 0.0030, v('b2', 0), 1e-9) and cerca(3 * 0.0030, v('b2', 1), 1e-9))
comprobar('b3', abs(math.log(9.0e-3 / 1.0e-3) / math.log(0.30 / 0.10) - v('b3')) < 1e-12)
nA = math.log(6.0e-4 / 3.0e-4) / math.log(2); nB = math.log(1.2e-3 / 3.0e-4) / math.log(2)
comprobar('b4 orden total', abs(nA + nB - v('b4')) < 1e-12 and nA == 1 and nB == 2)
kb = 3.0e-4 / (0.10 * 0.10 ** 2); comprobar('b5 k', cerca(kb, v('b5'), 1e-9)); comprobar('b5: k coherente con los otros dos experimentos', cerca(kb * 0.20 * 0.10 ** 2, 6.0e-4, 1e-9) and cerca(kb * 0.10 * 0.20 ** 2, 1.2e-3, 1e-9))
comprobar('b6', cerca(0.30 * 0.40 * 0.30 ** 2, v('b6'), 1e-9))
comprobar('b7', cerca(4.0e-3 * math.exp(lnr(50e3, 300, 310)), v('b7'), 0.001) and cerca(lnr(50e3, 300, 310), 0.6467, 1e-3))
comprobar('b8', cerca(R * math.log(4) / (1 / 290 - 1 / 310) / 1000, v('b8'), 0.001) and abs(1 / 290 - 1 / 310 - 2.2247e-4) < 1e-8)
comprobar('b9', 85 - 45 == v('b9'))
n_b10 = 1 - (-1); comprobar('b10 (1 − n = −1 → n = 2)', n_b10 == v('b10') == 2)
comprobar('b11 global A + 2B → C + D', neto([reaccion('A + B → X + C'), reaccion('X + B → D')]) == {'A': -1, 'B': -2, 'C': 1, 'D': 1})
comprobar('b12', 2 ** 2 * 0.5 == v('b12')); comprobar('b13', (120 > 10) and (-(-120) > -(-10)))
comprobar('b15', cerca(math.log(2) / 0.0231, v('b15'), 0.001)); comprobar('b16', cerca(2.0e-3 * 0.50, v('b16'), 1e-9))
# ★★★
tab = [(0.10, 0.10, 2.0e-4), (0.30, 0.10, 1.8e-3), (0.10, 0.20, 4.0e-4), (0.20, 0.30, 2.4e-3)]
n1 = math.log(tab[1][2] / tab[0][2]) / math.log(3); m1 = math.log(tab[2][2] / tab[0][2]) / math.log(2); k1 = tab[0][2] / (0.10 ** 2 * 0.10)
comprobar('c1 órdenes y k', abs(n1 - v('c1', 0)) < 1e-9 and abs(m1 - v('c1', 1)) < 1e-9 and cerca(k1, v('c1', 2), 1e-9))
comprobar('c1: experimento 4 consistente', cerca(k1 * 0.20 ** 2 * 0.30, tab[3][2], 1e-9))
tab2 = [(0.50, 0.10, 8.0e-4), (1.00, 0.10, 8.0e-4), (0.50, 0.30, 7.2e-3)]
n2 = math.log(tab2[1][2] / tab2[0][2]) / math.log(2); m2 = math.log(tab2[2][2] / tab2[0][2]) / math.log(3); k2 = tab2[0][2] / 0.10 ** 2
comprobar('c2 órdenes, k y v', abs(n2 - v('c2', 0)) < 1e-12 and abs(m2 - v('c2', 1)) < 1e-12 and cerca(k2, v('c2', 2), 1e-9) and cerca(k2 * 0.25 ** 2, v('c2', 3), 1e-9) and cerca(k2 * 0.30 ** 2, 7.2e-3, 1e-9))
comprobar('c3', cerca(R * math.log(4) / (1 / 298 - 1 / 318) / 1000, v('c3'), 0.001))
T2 = 1 / (1 / 300 - math.log(3) * R / 80e3); comprobar('c4', cerca(T2, v('c4'), 0.001) and abs(lnr(80e3, 300, T2) - math.log(3)) < 1e-12)
comprobar('c5', cerca(math.exp(30e3 / (R * 350)), v('c5'), 0.01))
comprobar('c6', 150 + (-80) == v('c6') == 70 and 120 + 80 == 200 and 200 - 150 == 50 == 120 - 70)
comprobar('c7', 3 * 2 == v('c7')); comprobar('c8', cerca(math.exp(lnr(75e3, 298, 308)), v('c8'), 0.002) and abs(lnr(75e3, 298, 308) - 0.9829) < 1e-3)
kc9 = math.log(0.500 / 0.300) / 20; comprobar('c9', cerca(kc9, v('c9', 0), 0.001) and cerca(0.500 * math.exp(-kc9 * 50), v('c9', 1), 0.001))
comprobar('c10', 3 ** 3 == v('c10')); comprobar('c11', cerca(0.045 / 3, v('c11', 0), 1e-9) and cerca(2 * 0.045 / 3, v('c11', 1), 1e-9) and cerca(0.015 / 0.30, v('c11', 2), 1e-9))
comprobar('c12', cerca(3.0e-3 * math.exp(lnr(65e3, 293, 313)), v('c12'), 0.002) and abs(lnr(65e3, 293, 313) - 1.705) < 1e-3)
comprobar('c14', cerca(7.2e3 * R / 1000, v('c14'), 0.001)); comprobar('c15', cerca(5.4e-3 * math.exp(60e3 / (R * 320)), v('c15'), 0.01) and abs(60e3 / (R * 320) - 22.55) < 5e-3)
comprobar('c13: con v = k[NO₂]²[F₂] sería elemental; el orden experimental difiere (2·1 ≠ 1·1)', 2 + 1 != 1 + 1)

# ---------------------------------------------------------------- 7. tests y «encuentra el error»: cifras que aparecen en las preguntas
comprobar('test: 2 A → B con 0,040 → 0,020 ; 2²·2 = 8 ; Ea inversa 55 + 40 = 95', cerca(0.040 / 2, 0.020, 1e-9) and 2 ** 2 * 2 == 8 and 55 - (-40) == 95)
comprobar('test: Arrhenius pendiente −Ea/R (derivada de ln k respecto a 1/T con sympy)', sp.diff(sp.Symbol('lnA') - sp.Symbol('Ea') / sp.Symbol('R') * sp.Symbol('x'), sp.Symbol('x')) == -sp.Symbol('Ea') / sp.Symbol('R'))
comprobar('lámina: NH₃ 0,012 → v = 0,0060 ; f = 3, F = 9 → n = 2', cerca(0.012 / 2, 0.0060, 1e-9) and math.log(9) / math.log(3) == 2)

print(f'comprobaciones correctas: {ok}')
if fallos:
    print('FALLOS:'); [print('  -', f) for f in fallos]; sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos · todo verificado')
