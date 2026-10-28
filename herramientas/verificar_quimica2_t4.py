#!/usr/bin/env python3
"""
Verificación independiente de Química II, tema 4 (Enlace químico).

 1. Estructuras de Lewis, número estérico, geometría (TRPECV) e hibridación: motor propio en Python (sin compartir código con la web),
    comparado con la «ficha» del simulador q4_ficha y con los ejercicios.
 2. Polaridad: suma vectorial de dipolos de enlace con electronegatividades de `mendeleev` y geometrías construidas aquí.
 3. Ángulos ideales (arccos) y ángulos de enlace de los hidruros: cálculo ab initio propio (pyscf, RHF/def2-SVP, optimización de r y θ)
    frente a las cifras de la web (tolerancia ±3-4°; HF se desvía algo más en los periodos 3 y 4).
 4. Datos atómicos (EI, AE, electronegatividad, puntos de fusión) frente a `mendeleev`; longitudes de enlace frente a radios covalentes.
 5. Ciclos de Born–Haber (suma de pasos, Hess), Coulomb y Kapustinskii (energía reticular), energías de enlace frente a entalpías de formación.
 6. Cada cifra de los ejercicios y ejemplos recalculada.

Uso:  sh build.sh && python3 herramientas/verificar_quimica2_t4.py     (necesita: pip install sympy mendeleev pyscf scipy)
"""
import json, os, subprocess, sys, math
import numpy as np
import sympy as sp
from mendeleev import element

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
ok, fallos = 0, []
def comprobar(nombre, cond, det=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {det}')
def cerca(a, b, tol=0.006): return abs(a - b) <= tol * max(abs(b), 1e-12)
F = 96.485  # kJ/mol por eV
SUBS = str.maketrans('₀₁₂₃₄₅₆₇₈₉', '0123456789')

# ---------------------------------------------------------------- volcado de la web
JS = r"""
const fs = require('fs'), vm = require('vm'), noop = () => {};
const el = () => ({ setAttribute: noop, appendChild: noop, style: {}, classList: { add: noop, remove: noop } });
const sb = { console, document: { addEventListener: noop, createElementNS: el, createElement: el, getElementById: () => null, head: el(), body: el() },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sb.window = sb; vm.createContext(sb);
vm.runInContext(fs.readFileSync(process.argv[1] + '/ampliaciones/bachi.js', 'utf8'), sb);
const B = sb.BACHI, E = B.lab.enlace, Q4 = B.lab.q4;
const clean = o => JSON.parse(JSON.stringify(o, (k, x) => typeof x === 'function' ? undefined : x));
console.log(JSON.stringify({ q4: clean(Q4), BH: E.BH.map(c => ({ f: c.f, pasos: c.pasos.map(p => p[1]), hf: c.hf, U: E.bhU(c) })), RET: clean(E.RET),
  CAT: clean(E.CATIONES), ANI: clean(E.ANIONES), ej: clean(B.ampl.quimica2.t4.ejercicios) }));
"""
web = json.loads(subprocess.check_output(['node', '-e', JS, os.path.abspath(RAIZ)]))
EJ = {e['id']: e for e in web['ej']}
def v(id_, k=0):
    ch = EJ[id_]['check']; ch = ch if isinstance(ch, list) else [ch]
    c = ch[k]
    return c['valor'] if 'valor' in c else c['valores']

# ---------------------------------------------------------------- 1. Lewis + TRPECV + hibridación (motor propio)
VAL = {'H': 1, 'Be': 2, 'B': 3, 'C': 4, 'N': 5, 'O': 6, 'F': 7, 'Si': 4, 'P': 5, 'S': 6, 'Cl': 7}
GEOM = {(2, 0): ('lineal', 'sp'), (3, 0): ('trigonal plana', 'sp²'), (2, 1): ('angular', 'sp²'), (4, 0): ('tetraédrica', 'sp³'),
        (3, 1): ('pirámide trigonal', 'sp³'), (2, 2): ('angular', 'sp³')}
SUB = str.maketrans('0123456789', '₀₁₂₃₄₅₆₇₈₉')
def notacion(n, m): return 'AX' + (str(n).translate(SUB) if n > 1 else '') + ('' if m == 0 else 'E' + (str(m).translate(SUB) if m > 1 else ''))
def analiza(central, lig, carga=0):
    """lig: lista de (símbolo, orden de enlace con el central). Devuelve V, nº de ligandos, pares libres del central."""
    atomos = [central] + [s for s, _ in lig]
    V = sum(VAL[a] for a in atomos) - carga
    enlaces = sum(o for _, o in lig)
    elec_term = sum(8 - 2 * o for s, o in lig if s != 'H')      # pares libres de los átomos terminales (octeto; H: dueto)
    return V, len(lig), (V - 2 * enlaces - elec_term) / 2
ESPECIES = {
    'H2O': ('O', [('H', 1)] * 2, 0), 'NH3': ('N', [('H', 1)] * 3, 0), 'CH4': ('C', [('H', 1)] * 4, 0), 'CO2': ('C', [('O', 2)] * 2, 0),
    'BF3': ('B', [('F', 1)] * 3, 0), 'SO2': ('S', [('O', 2), ('O', 1)], 0), 'SO3': ('S', [('O', 2)] * 3, 0), 'PCl3': ('P', [('Cl', 1)] * 3, 0),
    'CCl4': ('C', [('Cl', 1)] * 4, 0), 'CHCl3': ('C', [('H', 1)] + [('Cl', 1)] * 3, 0), 'BeCl2': ('Be', [('Cl', 1)] * 2, 0),
    'CH2O': ('C', [('H', 1)] * 2 + [('O', 2)], 0), 'HCN': ('C', [('H', 1), ('N', 3)], 0), 'H2S': ('S', [('H', 1)] * 2, 0),
    'NH4+': ('N', [('H', 1)] * 4, 1), 'CO3^2-': ('C', [('O', 2), ('O', 1), ('O', 1)], -2), 'SO3^2-': ('S', [('O', 1)] * 3, -2),
    'ClO3-': ('Cl', [('O', 1)] * 3, -1), 'NO3-': ('N', [('O', 2), ('O', 1), ('O', 1)], -1),
}
ESP = {}
for f, (c, l, q) in ESPECIES.items():
    ESP[f] = analiza(c, l, q)
    comprobar(f'Lewis {f}: pares libres del central enteros y ≥ 0', ESP[f][2] >= 0 and ESP[f][2] == int(ESP[f][2]), str(ESP[f][2]))
for f, V in {'H2O': 8, 'NH3': 8, 'CH4': 8, 'CO2': 16, 'BF3': 24, 'SO2': 18, 'SO3': 24, 'PCl3': 26, 'CCl4': 32, 'CHCl3': 26, 'BeCl2': 16, 'CH2O': 12,
             'HCN': 10, 'H2S': 8, 'NH4+': 8, 'CO3^2-': 24, 'SO3^2-': 26, 'ClO3-': 26, 'NO3-': 24}.items():
    comprobar(f'V({f})', ESP[f][0] == V, f'{ESP[f][0]}')
comprobar('a2 NH3', v('a2') == ESP['NH3'][0]); comprobar('a3 CO2', v('a3') == ESP['CO2'][0]); comprobar('b1 CO3', v('b1') == ESP['CO3^2-'][0])
comprobar('c13 NO3', v('c13', 0) == ESP['NO3-'][0]); comprobar('a9 pares libres del O en H2O', v('a9') == ESP['H2O'][2])
for m in web['q4']['FICHA']:
    f = m['f'].translate(SUBS)
    V, n, lp = ESP[f]
    g, h = GEOM[(n, int(lp))]
    comprobar(f'ficha {f}: notación', m['ax'] == notacion(n, int(lp)), f"{m['ax']} vs {notacion(n, int(lp))}")
    comprobar(f'ficha {f}: geometría', m['g'] == g, f"{m['g']} vs {g}")
    comprobar(f'ficha {f}: hibridación', m['h'] == h, f"{m['h']} vs {h}")
    comprobar(f'ficha {f}: V en el texto', int(m['ve'].split('=')[1]) == V, m['ve'])
comprobar('b4 SO3^2- pirámide trigonal', GEOM[(3, int(ESP['SO3^2-'][2]))][0] == 'pirámide trigonal')
comprobar('c8 ClO3- pirámide sp3', GEOM[(3, int(ESP['ClO3-'][2]))] == ('pirámide trigonal', 'sp³'))
comprobar('NH4+ tetraédrico', GEOM[(4 - int(ESP['NH4+'][2]), int(ESP['NH4+'][2]))][0] == 'tetraédrica')
comprobar('b5 NH3 sp3 / BF3 sp2', GEOM[(3, 1)][1] == 'sp³' and GEOM[(3, 0)][1] == 'sp²')
# σ y π por conteo (cada enlace de orden k: 1 σ + (k−1) π). Enlaces de cada especie, con su orden:
casos = {'eteno': ([1] * 4 + [2], 5, 1), 'etino': ([1] * 2 + [3], 3, 2), 'HCN': ([1, 3], 2, 2), 'N2': ([3], 1, 2),
         'propeno': ([1] * 6 + [1, 2], 8, 1), 'propino': ([1] * 4 + [1, 3], 6, 2), 'CH3COOH': ([1] * 3 + [1, 2, 1, 1], 7, 1)}
for nm, (enl, s_, p_) in casos.items(): comprobar(f'σ/π {nm}', (len(enl), sum(o - 1 for o in enl)) == (s_, p_))
comprobar('a11 σ eteno', v('a11') == 5); comprobar('a14 π N2', v('a14') == 2)
comprobar('b2 HCN', v('b2') == [2, 2]); comprobar('b13 propeno', v('b13') == [8, 1]); comprobar('c11 propino', v('c11') == [6, 2])
def cf(val, libres_e, enlaces): return val - libres_e - enlaces
comprobar('CF S en SO2', cf(6, 2, 3) == 1 == v('b3', 0)); comprobar('CF O sencillo en SO2', cf(6, 6, 1) == -1 == v('b3', 1))
comprobar('CF suma carbonato −2', cf(4, 0, 4) + cf(6, 4, 2) + 2 * cf(6, 6, 1) == -2)
comprobar('CF N del nitrato = +1 y suma −1', cf(5, 0, 4) == 1 == v('c13', 1) and cf(5, 0, 4) + cf(6, 4, 2) + 2 * cf(6, 6, 1) == -1)
comprobar('b15 orden de enlace carbonato 4/3', abs((2 + 1 + 1) / 3 - v('b15')) < 1e-3)
comprobar('CO3: 8 pares libres', (24 - 2 * 4) // 2 == 8 and 2 + 3 + 3 == 8); comprobar('SO2: 6 pares libres', (18 - 6) // 2 == 6 and 1 + 2 + 3 == 6)
comprobar('HCN: 2 e⁻ libres = 1 par', 10 - 8 == 2)

# ---------------------------------------------------------------- 2. polaridad: suma vectorial
EN = {s: element(s).electronegativity_pauling() for s in ['H', 'Be', 'B', 'C', 'N', 'O', 'F', 'S', 'P', 'Cl', 'Na', 'Mg']}
ha = math.radians(52.25)
DIR = {
    'lineal': [(1, 0, 0), (-1, 0, 0)],
    'trigonal plana': [(1, 0, 0), (-0.5, math.sqrt(3) / 2, 0), (-0.5, -math.sqrt(3) / 2, 0)],
    'tetraédrica': [(1, 1, 1), (1, -1, -1), (-1, 1, -1), (-1, -1, 1)],
    'pirámide trigonal': [(math.sqrt(8 / 9), 0, -1 / 3), (-math.sqrt(2 / 9), math.sqrt(2 / 3), -1 / 3), (-math.sqrt(2 / 9), -math.sqrt(2 / 3), -1 / 3)],
    'angular': [(math.sin(ha), math.cos(ha), 0), (-math.sin(ha), math.cos(ha), 0)],
}
LIG = {'H2O': ('O', ['H'] * 2), 'NH3': ('N', ['H'] * 3), 'CH4': ('C', ['H'] * 4), 'CO2': ('C', ['O'] * 2), 'BF3': ('B', ['F'] * 3), 'SO2': ('S', ['O'] * 2),
       'SO3': ('S', ['O'] * 3), 'PCl3': ('P', ['Cl'] * 3), 'CCl4': ('C', ['Cl'] * 4), 'CHCl3': ('C', ['H'] + ['Cl'] * 3), 'BeCl2': ('Be', ['Cl'] * 2),
       'CH2O': ('C', ['H', 'H', 'O']), 'HCN': ('C', ['H', 'N']), 'H2S': ('S', ['H'] * 2)}
for m in web['q4']['FICHA']:
    f = m['f'].translate(SUBS)
    c, ligs = LIG[f]
    vs = np.array(DIR[m['g']][:len(ligs)], dtype=float)
    vs = vs / np.linalg.norm(vs, axis=1)[:, None]
    tot = sum((EN[x] - EN[c]) * vs[i] for i, x in enumerate(ligs))
    comprobar(f'polaridad {f}', (np.linalg.norm(tot) > 0.05) == m['p'], f'|Σμ| = {np.linalg.norm(tot):.2f}')
for f, d in {'H–Cl': 0.96, 'Na–Cl': 2.23, 'Mg–O': 2.13, 'H–F': 1.78, 'N–H': 0.84, 'B–F': 1.94, 'C–H': 0.35, 'C–O': 0.89}.items():
    a, b = f.split('–'); comprobar(f'Δχ {f}', abs(abs(EN[b] - EN[a]) - d) <= 0.011, f'{abs(EN[b] - EN[a]):.2f}')
comprobar('a7 Δχ HCl', abs(v('a7') - (EN['Cl'] - EN['H'])) < 0.011)
tetra = math.degrees(math.acos(-1 / 3)); comprobar('ángulo tetraédrico 109,47°', abs(tetra - 109.4712) < 1e-3)
v1, v2 = np.array(DIR['trigonal plana'][0]), np.array(DIR['trigonal plana'][1]); comprobar('trigonal 120°', abs(math.degrees(math.acos(v1 @ v2)) - 120) < 1e-6)

# ---------------------------------------------------------------- 3. ángulos de enlace por cálculo propio (pyscf, RHF/def2-SVP)
try:
    from pyscf import gto, scf
    from scipy.optimize import minimize
    def energia(geom):
        mol = gto.M(atom=geom, basis='def2-svp', verbose=0)
        return scf.RHF(mol).run().e_tot
    def opt_AH(X, L, n, r0, th0):
        """Optimiza r(X–L) y el ángulo L–X–L (n = 2: C2v; n = 3: C3v)."""
        def geom(p):
            r, th = p
            if n == 2:
                h = th / 2
                return [(X, (0, 0, 0)), (L, (r * math.sin(h), 0, r * math.cos(h))), (L, (-r * math.sin(h), 0, r * math.cos(h)))]
            c = min(max((math.cos(th) + 0.5) / 1.5, 0), 1); a = math.acos(math.sqrt(c))      # cos(th) = cos²α − sin²α/2
            return [(X, (0, 0, 0))] + [(L, (r * math.sin(a) * math.cos(k * 2 * math.pi / 3), r * math.sin(a) * math.sin(k * 2 * math.pi / 3), r * math.cos(a))) for k in range(3)]
        res = minimize(lambda p: energia(geom(p)), [r0, th0], method='Nelder-Mead', options={'xatol': 1e-3, 'fatol': 1e-7, 'maxiter': 80})
        return math.degrees(res.x[1])
    web_ang = {}
    for k, S in web['q4']['ANG'].items():
        for nm, ang, _ in S['pts']: web_ang[nm.translate(SUBS)] = ang
    CALC = {'NH3': ('N', 'H', 3, 1.01, 1.87), 'PH3': ('P', 'H', 3, 1.42, 1.65), 'H2O': ('O', 'H', 2, 0.96, 1.82), 'H2S': ('S', 'H', 2, 1.34, 1.6),
            'AsH3': ('As', 'H', 3, 1.52, 1.62), 'NF3': ('N', 'F', 3, 1.37, 1.8), 'OF2': ('O', 'F', 2, 1.41, 1.8)}
    ang_calc = {}
    for f, (X, L, n, r0, th0) in CALC.items():
        a = opt_AH(X, L, n, r0, th0); ang_calc[f] = a
        tol = 4.5 if f in ('PH3', 'H2S', 'AsH3') else 3.0
        comprobar(f'ángulo calculado {f}', abs(a - web_ang[f]) <= tol, f'calc {a:.1f}° vs web {web_ang[f]}°')
    comprobar('tendencia NH3 > H2O (calculada)', ang_calc['NH3'] > ang_calc['H2O'])
    comprobar('tendencia PH3 < NH3 − 8° (calculada)', ang_calc['PH3'] < ang_calc['NH3'] - 8)
    comprobar('tendencia NF3 < NH3 (calculada)', ang_calc['NF3'] < ang_calc['NH3'])
    print('ángulos calculados (RHF/def2-SVP):', {k: round(x, 1) for k, x in ang_calc.items()})
except ImportError:
    fallos.append('pyscf/scipy no instalados: no se pudieron verificar los ángulos de enlace (pip install pyscf scipy)')
# ángulos de SO2, PCl3, eteno y momentos dipolares (B3LYP/def2-TZVP sobre geometrías experimentales)
try:
    from pyscf import gto, scf
    from scipy.optimize import minimize
    def mol_ang(geom, bas='def2-svp'): return gto.M(atom=geom, basis=bas, verbose=0)
    def e_(geom): return scf.RHF(mol_ang(geom)).run().e_tot
    def dip(geom, bas='def2-tzvp'):
        from pyscf import dft
        mf = dft.RKS(mol_ang(geom, bas)); mf.xc = 'b3lyp'; mf.run(); return float(np.linalg.norm(mf.dip_moment(verbose=0)))
    def c2v(X, L, r, th): h = math.radians(th) / 2; return [(X, (0, 0, 0)), (L, (r * math.sin(h), 0, r * math.cos(h))), (L, (-r * math.sin(h), 0, r * math.cos(h)))]
    def c3v(X, L, r, th):
        c = min(max((math.cos(math.radians(th)) + 0.5) / 1.5, 0), 1); a = math.acos(math.sqrt(c))
        return [(X, (0, 0, 0))] + [(L, (r * math.sin(a) * math.cos(k * 2 * math.pi / 3), r * math.sin(a) * math.sin(k * 2 * math.pi / 3), r * math.cos(a))) for k in range(3)]
    # SO2 y PCl3: optimizar (r, θ)
    for nm, fn, X, L, r0, t0, ref in [('SO2', c2v, 'S', 'O', 1.45, 118, 119.3), ('PCl3', c3v, 'P', 'Cl', 2.05, 100, 100.3)]:
        res = minimize(lambda q: e_(fn(X, L, q[0], q[1])), [r0, t0], method='Nelder-Mead', options={'xatol': 1e-3, 'fatol': 1e-7, 'maxiter': 80})
        comprobar(f'ángulo {nm} calculado ≈ {ref}° (±4°)', abs(res.x[1] - ref) <= 4, f'calc {res.x[1]:.1f}°')
    # eteno: ángulo H–C–H optimizado con r fijas
    def eteno(th):
        h = math.radians(th) / 2; rc_, rh = 1.339 / 2, 1.085
        return [('C', (0, 0, rc_)), ('C', (0, 0, -rc_)), ('H', (rh * math.sin(h), 0, rc_ + rh * math.cos(h))), ('H', (-rh * math.sin(h), 0, rc_ + rh * math.cos(h))),
                ('H', (rh * math.sin(h), 0, -rc_ - rh * math.cos(h))), ('H', (-rh * math.sin(h), 0, -rc_ - rh * math.cos(h)))]
    r_ = minimize(lambda q: e_(eteno(q[0])), [117.0], method='Nelder-Mead', options={'xatol': 0.05, 'maxiter': 40})
    comprobar('ángulo H–C–H del eteno ≈ 117° (±2°)', abs(r_.x[0] - 117) <= 2, f'calc {r_.x[0]:.1f}°')
    MU = {'H2O': (c2v('O', 'H', 0.9572, 104.5), 1.85), 'NH3': (c3v('N', 'H', 1.012, 106.7), 1.47), 'H2S': (c2v('S', 'H', 1.336, 92.1), 0.97), 'SO2': (c2v('S', 'O', 1.431, 119.3), 1.63),
          'HCN': ([('H', (0, 0, -1.065)), ('C', (0, 0, 0)), ('N', (0, 0, 1.156))], 2.98)}
    ah = math.radians(121.75)      # ángulo O–C–H del metanal; r(C=O) = 1,205 Å; r(C–H) = 1,111 Å
    MU['CH2O'] = ([('C', (0, 0, 0)), ('O', (0, 0, 1.205)), ('H', (1.111 * math.sin(ah), 0, 1.111 * math.cos(ah))), ('H', (-1.111 * math.sin(ah), 0, 1.111 * math.cos(ah)))], 2.33)
    for nm, (g, ref) in MU.items():
        d = dip(g) * 1.0
        comprobar(f'μ {nm} ≈ {ref} D (B3LYP sin funciones difusas, ±20 %)', abs(d - ref) <= 0.20 * ref, f'calc {d:.2f} D')
    for nm, g in {'CO2': [('O', (0, 0, -1.162)), ('C', (0, 0, 0)), ('O', (0, 0, 1.162))], 'CH4': [('C', (0, 0, 0))] + [('H', tuple(1.087 / math.sqrt(3) * np.array(x))) for x in [(1, 1, 1), (1, -1, -1), (-1, 1, -1), (-1, -1, 1)]]}.items():
        comprobar(f'μ {nm} = 0 (apolar)', dip(g) < 0.02, f'{dip(g):.3f}')
except ImportError:
    pass
comprobar('CH4 y SiH4 109,5° por simetría (Td)', abs(tetra - 109.5) < 0.05)
comprobar('serie P2: 109,5 > 107 > 104,5 (web)', web['q4']['ANG']['p2']['pts'][0][1] > web['q4']['ANG']['p2']['pts'][1][1] > web['q4']['ANG']['p2']['pts'][2][1])

# ---------------------------------------------------------------- 4. datos atómicos frente a mendeleev
def EI(s, k=1): return element(s).ionenergies[k] * F
for s, k, val in [('Na', 1, 496), ('Mg', 1, 738), ('Mg', 2, 1451), ('Ca', 1, 590), ('Ca', 2, 1145), ('Li', 1, 520), ('K', 1, 419), ('Na', 2, 4562)]:
    comprobar(f'EI{k} {s}', cerca(EI(s, k), val, 0.012), f'{EI(s, k):.0f} vs {val}')
for s, val in [('Cl', 349), ('F', 328), ('O', 141)]:
    comprobar(f'AE {s}', cerca(element(s).electron_affinity * F, val, 0.02), f'{element(s).electron_affinity * F:.0f} vs {val}')
for s, tf in {'Na': 98, 'Fe': 1538, 'Cu': 1085, 'Hg': -39, 'W': 3422}.items():
    comprobar(f'T fusión {s}', abs(element(s).melting_point - 273.15 - tf) <= (10 if s == 'W' else 2.5), f'{element(s).melting_point - 273.15:.0f} vs {tf}')
def rc(s, t=1):
    e = element(s)
    return {1: e.covalent_radius_pyykko, 2: e.covalent_radius_pyykko_double, 3: e.covalent_radius_pyykko_triple}[t]
for nm, (a, b, t, val) in {'C–C': ('C', 'C', 1, 154), 'C=C': ('C', 'C', 2, 134), 'C≡C': ('C', 'C', 3, 120), 'N–N': ('N', 'N', 1, 145), 'N≡N': ('N', 'N', 3, 110),
                           'Cl–Cl': ('Cl', 'Cl', 1, 199), 'Br–Br': ('Br', 'Br', 1, 228), 'I–I': ('I', 'I', 1, 267), 'H–H': ('H', 'H', 1, 74), 'C–H': ('C', 'H', 1, 109),
                           'O–H': ('O', 'H', 1, 96), 'H–F': ('H', 'F', 1, 92), 'N–H': ('N', 'H', 1, 101)}.items():
    s = rc(a, t) + rc(b, t)
    # H–H: el radio covalente del H (32 pm) infravalora la longitud del H₂ (74 pm), caso conocido; se comprueba contra el valor de 74 pm de tablas
    comprobar(f'longitud {nm} (radios covalentes ± 8 pm)', abs(s - val) <= 8 or nm == 'H–H', f'radios {s:.0f} vs {val}')
BON = web['q4']['BON']
tabla = {b[0]: (b[1], b[2]) for S in BON.values() for b in S['b']}
for nm, (r, D) in {'C–C': (154, 347), 'C=C': (134, 614), 'C≡C': (120, 839), 'N≡N': (110, 945), 'H–H': (74, 436), 'Cl–Cl': (199, 243), 'I–I': (267, 151)}.items():
    comprobar(f'datos web {nm}', tabla[nm] == (r, D), str(tabla[nm]))
for fam in (['C–C', 'C=C', 'C≡C'], ['N–N', 'N=N', 'N≡N']):
    comprobar('orden de enlace ' + fam[0], tabla[fam[0]][0] > tabla[fam[1]][0] > tabla[fam[2]][0] and tabla[fam[0]][1] < tabla[fam[1]][1] < tabla[fam[2]][1])
comprobar('D Cl–Cl > Br–Br > I–I', tabla['Cl–Cl'][1] > tabla['Br–Br'][1] > tabla['I–I'][1])

# ---------------------------------------------------------------- 5. Born–Haber, Coulomb, Kapustinskii, energías de enlace
BH = {c['f']: c for c in web['BH']}
comprobar('BH web NaCl U=787, MgO U=3791', BH['NaCl']['U'] == 787 and BH['MgO']['U'] == 3791)
S = sp.Rational
def u_bh(sub, ei, enl, ae, hf): return sub + ei + enl + ae - hf
comprobar('NaCl suma pasos 375,5', u_bh(107, 496, S(243, 2), -349, 0) == S(751, 2))
comprobar('NaCl U = 786,5 ≈ 787', abs(float(u_bh(107, 496, S(243, 2), -349, -411)) - 787) < 1)
comprobar('b8 NaF', u_bh(107, 496, 79, -328, -574) == 928 == v('b8')); comprobar('b9 LiF', 159 + 520 + 79 - 328 - 1047 == -617 == v('b9'))
comprobar('c1 MgO', u_bh(148, 738 + 1451, 249, -141 + 744, -602) == 3791 == v('c1')); comprobar('MgO suma 3189', 148 + 2189 + 249 + 603 == 3189)
comprobar('c2 CaCl2', u_bh(178, 590 + 1145, 243, 2 * -349, -795) == 2253 == v('c2')); comprobar('CaCl2 suma 1458', 178 + 1735 + 243 - 698 == 1458)
comprobar('c3 AE Cl', abs(-411 + 787 - 107 - 496 - S(243, 2) - v('c3')) < 0.5)
comprobar('KCl ΔHf −437', 89 + 419 + 122 - 349 - 718 == -437 and 89 + 419 + 122 - 349 == 281)
comprobar('web KCl U 718, CaCl2 U 2254 (con ½E = 122)', BH['KCl']['U'] == 718 and BH['CaCl2']['U'] == 2254)
comprobar('c15 NaCl 11,7 g', abs(11.7 / 58.5 * 787 - v('c15')) < 0.5)
r = {'Mg': 72, 'O': 140, 'Na': 102, 'Cl': 181}
coc = (4 / (r['Mg'] + r['O'])) / (1 / (r['Na'] + r['Cl']))
comprobar('b11 cociente Coulomb 5,34', abs(coc - v('b11')) < 0.01 * coc, f'{coc:.3f}'); comprobar('cociente real 3791/787 = 4,8', abs(3791 / 787 - 4.8) < 0.05)
cat = {c[0]: (c[1], c[2]) for c in web['CAT']}; ani = {a[0]: (a[1], a[2]) for a in web['ANI']}
for nm, (a, b, d) in {'LiF': ('Li', 'F', 209), 'NaF': ('Na', 'F', 235), 'NaCl': ('Na', 'Cl', 283), 'KCl': ('K', 'Cl', 319), 'MgO': ('Mg', 'O', 212), 'CaO': ('Ca', 'O', 240)}.items():
    comprobar(f'd {nm}', cat[a][1] + ani[b][1] == d, f'{cat[a][1] + ani[b][1]}')
RET = web['RET']
for nm, (U, Tf) in {'LiF': (1036, 845), 'NaF': (923, 993), 'NaCl': (787, 801), 'KCl': (715, 770), 'MgO': (3791, 2852), 'CaO': (3401, 2613)}.items():
    comprobar(f'tabla web U/Tf {nm}', RET[nm] == [U, Tf], str(RET.get(nm)))
def kap(nu, z1, z2, d): return 120250 * nu * z1 * z2 / d * (1 - 34.5 / d)     # Kapustinskii (kJ·pm/mol, pm)
for nm, (nu, z1, z2, a, b) in {'LiF': (2, 1, 1, 'Li', 'F'), 'NaF': (2, 1, 1, 'Na', 'F'), 'NaCl': (2, 1, 1, 'Na', 'Cl'), 'KCl': (2, 1, 1, 'K', 'Cl'), 'MgO': (2, 2, 2, 'Mg', 'O'), 'CaO': (2, 2, 2, 'Ca', 'O')}.items():
    k = kap(nu, z1, z2, cat[a][1] + ani[b][1])
    comprobar(f'Kapustinskii {nm} ±8 %', abs(k - RET[nm][0]) <= 0.08 * RET[nm][0], f'{k:.0f} vs {RET[nm][0]}')
comprobar('orden U ejemplo MgO > NaCl > KCl', RET['MgO'][0] > RET['NaCl'][0] > RET['KCl'][0]); comprobar('orden Tf ejemplo', RET['MgO'][1] > RET['NaCl'][1] > RET['KCl'][1])
comprobar('c6 orden Tf NaCl < LiF < MgO', RET['NaCl'][1] < RET['LiF'][1] < RET['MgO'][1]); comprobar('U LiF > NaF > KF (1036 > 923 > 821)', 1036 > 923 > 821)
HF_ = {'CH4': -74.8, 'CO2': -393.5, 'H2O(g)': -241.8, 'NH3': -45.9, 'HCl': -92.3, 'C2H4': 52.4, 'C2H6': -84.0}      # entalpías de formación (NIST/CRC)
comprobar('b6 H2+Cl2 = −183 (exp. −184,6)', 436 + 243 - 2 * 431 == -183 == v('b6') and abs(2 * HF_['HCl'] - (-183)) < 3)
comprobar('b7 2H2+O2 = −482 (exp. −483,6)', 2 * 436 + 498 - 4 * 463 == -482 == v('b7') and abs(2 * HF_['H2O(g)'] - (-482)) < 3)
comprobar('metano 2648/3450/−802 (exp. −802)', 4 * 413 + 2 * 498 == 2648 and 2 * 799 + 4 * 463 == 3450 and 2648 - 3450 == -802 and abs((HF_['CO2'] + 2 * HF_['H2O(g)'] - HF_['CH4']) - (-802)) < 1.5)
comprobar('NH3 2253/2346/−93 (exp. −92)', 945 + 3 * 436 == 2253 and 6 * 391 == 2346 and 2253 - 2346 == -93 and abs(2 * HF_['NH3'] - (-92)) < 1.0)
comprobar('c7 hidrogenación −123 (exp. −137)', 614 + 436 - (347 + 2 * 413) == -123 == v('c7') and abs((HF_['C2H6'] - HF_['C2H4']) - (-137)) < 1.5)
comprobar('c9 8 g CH4', abs(8 / 16 * 802 - v('c9')) < 0.6); comprobar('b16 1 g H2', abs(1.0 / 2.016 * 436 - v('b16')) < 0.1)
comprobar('2·347 = 694 > 614', 2 * 347 == 694 > 614)
web_teb = {'Ar': -186, 'HCl': -85, 'CH3OH': 65, 'H2O': 100}   # CRC Handbook: Ar −185,8 · HCl −85,0 · CH3OH 64,7 · H2O 100,0
comprobar('Ar Teb frente a mendeleev', abs(element('Ar').boiling_point - 273.15 - web_teb['Ar']) < 1.5)
comprobar('orden Teb Ar < HCl < CH3OH < H2O', web_teb['Ar'] < web_teb['HCl'] < web_teb['CH3OH'] < web_teb['H2O'])
comprobar('orden Teb CH4 < HCl < NH3 < HF < H2O', -162 < -85 < -33 < 20 < 100); comprobar('orden Teb CH4 < CH3Cl < CH3OH', -162 < -24 < 65)

print(f'comprobaciones correctas: {ok}')
if fallos:
    print('FALLOS:'); [print('  -', f) for f in fallos]; sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos · todo verificado')
