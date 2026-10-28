#!/usr/bin/env python3
"""
Verificación independiente de Química II, tema 8 (Oxidación-reducción).

 1. Ajuste: cada ecuación que produce el ajustador de la web (10 reacciones) y cada reacción global que sale de combinar
    dos semirreacciones (todas las parejas de la escala) se comprueba con sympy: los coeficientes son la solución entera
    mínima del sistema de conservación de átomos y de carga (espacio nulo de la matriz de composición).
 2. Datos: potenciales estándar contra una tabla propia (CRC / tablas de selectividad), masas molares y electrones de
    cada sustancia del calculador de Faraday, estequiometría de las valoraciones redox.
 3. Los 52 ejercicios: cada respuesta se recalcula aquí desde las definiciones (sin compartir código con la web).
 4. Los ejemplos resueltos de la teoría, uno por uno (cifras que aparecen en el texto).

Uso:  sh build.sh && python3 herramientas/verificar_quimica2_t8.py        (necesita: pip install sympy)
"""
import json, os, re, subprocess, sys, math
import sympy as sp

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
ok, fallos = 0, []
def comprobar(nombre, cond, det=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {det}')
def cerca(a, b, tol=0.006): return abs(a - b) <= tol * max(abs(b), 1e-12)
def cab(nombre, a, b, tol=0.006): comprobar(nombre, cerca(a, b, tol), f'(calculado {a:.6g}, web/texto {b:.6g})')
F, RT = 96500.0, 0.0592
R_GAS = 0.082

# ---------------------------------------------------------------- volcado de la web
JS = r"""
const fs = require('fs'), vm = require('vm'), noop = () => {};
const el = () => ({ setAttribute: noop, appendChild: noop, style: {}, classList: { add: noop, remove: noop } });
const sb = { console, document: { addEventListener: noop, createElementNS: el, createElement: el, getElementById: () => null, head: el(), body: el() },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sb.window = sb; vm.createContext(sb);
vm.runInContext(fs.readFileSync(process.argv[1] + '/ampliaciones/bachi.js', 'utf8'), sb);
const B = sb.BACHI, Q = B.lab.q8;
const rx = Q.REACCIONES.map(r => { const z = Q.resuelve(r); return { k: r.k, t: r.t, medio: r.medio, texto: z.tot.texto, izq: z.tot.izq, der: z.tot.der, ne: z.L / z.tot.g,
  red: { izq: r.red.izq, der: r.red.der, ca: r.red.ca, cb: r.red.cb }, oxi: { izq: r.oxi.izq, der: r.oxi.der, ca: r.oxi.ca, cb: r.oxi.cb } }; });
const pares = Q.PARES.map(p => ({ k: p.k, t: p.t, E: p.E, n: p.n, ox: p.ox, red: p.red, el: p.el }));
const comb = [];
for (const c of Q.PARES) for (const a of Q.PARES) if (c.k !== a.k) { const z = Q.combina(c, a); comb.push({ c: c.k, a: a.k, izq: z.izq, der: z.der, ne: z.ne, L: z.L }); }
console.log(JSON.stringify({ rx, pares, comb, valora: Q.VALORA, sust: Q.SUST, F: Q.F, pilaK: Q.PILA_K, ej: JSON.parse(JSON.stringify(B.ampl.quimica2.t8.ejercicios)) }));
"""
web = json.loads(subprocess.check_output(['node', '-e', JS, os.path.abspath(RAIZ)]))
EJ = {e['id']: e for e in web['ej']}
def v(id_, k=0):
    ch = EJ[id_]['check']; ch = ch if isinstance(ch, list) else [ch]
    c = ch[k]
    return c['valor'] if 'valor' in c else (c['valores'] if 'valores' in c else c)

# ---------------------------------------------------------------- analizador de fórmulas (independiente de la web)
SUP = {'⁰': 0, '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9}
SUB = {'₀': 0, '₁': 1, '₂': 2, '₃': 3, '₄': 4, '₅': 5, '₆': 6, '₇': 7, '₈': 8, '₉': 9}
def parse(f):
    m = re.search(r'([⁰¹²³⁴⁵⁶⁷⁸⁹]*)([⁺⁻])$', f)
    q = 0
    if m:
        n = int(''.join(str(SUP[c]) for c in m.group(1))) if m.group(1) else 1
        q = n if m.group(2) == '⁺' else -n
        f = f[:m.start()]
    atoms = {}
    for el, sub in re.findall(r'([A-Z][a-z]?)([₀-₉]*)', f):
        atoms[el] = atoms.get(el, 0) + (int(''.join(str(SUB[c]) for c in sub)) if sub else 1)
    return atoms, q
# El H₂O₂ también puede dismutar (H₂O₂ → H₂O + ½ O₂): átomos y carga no bastan, hay que añadir la conservación de electrones
# (Mn +7 → +2 gana 5 e⁻ por MnO₄⁻; cada O del peróxido pasa de −1 a 0 y pierde 1 e⁻ → 5·n(MnO₄⁻) = 2·n(O₂)).
EXTRA = {'MnO₄⁻': 5, 'O₂': -2}
def balanceada(izq, der):
    esp = list(izq) + list(der)
    elems = sorted({e for s in esp for e in parse(s)[0]})
    fila = lambda s: [parse(s)[0].get(e, 0) for e in elems] + [parse(s)[1]]
    A = sp.Matrix([fila(s) for s in izq] + [[-x for x in fila(s)] for s in der]).T      # filas: elementos y carga; columnas: especies
    if 'H₂O₂' in izq:
        A = A.col_join(sp.Matrix([[EXTRA.get(s, 0) for s in izq] + [EXTRA.get(s, 0) for s in der]]))
    nul = A.nullspace()
    if len(nul) != 1: return False, 'espacio nulo de dimensión %d' % len(nul)
    vec = nul[0]; den = sp.ilcm(*[sp.fraction(x)[1] for x in vec]); vec = vec * den
    g = sp.igcd(*[int(x) for x in vec]); vec = vec / g
    if vec[0] < 0: vec = -vec
    coef = [int(x) for x in vec]
    web_c = [izq[s] for s in izq] + [der[s] for s in der]
    return coef == web_c, f'sympy {coef}, web {web_c}'

# ---------------------------------------------------------------- 1. Ajuste
for r in web['rx']:
    good, det = balanceada(r['izq'], r['der'])
    comprobar('ajuste sympy: ' + r['t'], good, det)
# electrones intercambiados: suma de cambios de n.º ox. de los átomos que se reducen en la ecuación global
NOXE = {'mnfe': 5, 'crfe': 6, 'mnox': 10, 'mnh2o2': 10, 'cuno3': 6, 'mncl': 10, 'cri': 6, 'mno2cl': 2, 'mni': 6, 'cl2': 1}
for r in web['rx']: comprobar('electrones de ' + r['t'], r['ne'] == NOXE[r['k']], f"web {r['ne']} esperado {NOXE[r['k']]}")
# todas las parejas de la escala
for m in web['comb']:
    good, det = balanceada(m['izq'], m['der'])
    comprobar(f"combinación {m['c']}/{m['a']}", good, det)

# ---------------------------------------------------------------- 2. Datos
E_TAB = {'li': -3.04, 'na': -2.71, 'mg': -2.37, 'al': -1.66, 'zn': -0.76, 'fe': -0.44, 'ni': -0.25, 'pb': -0.13, 'h': 0.00, 'cu': 0.34, 'i': 0.54,
         'fe3': 0.77, 'ag': 0.80, 'no3': 0.96, 'br': 1.07, 'cr': 1.33, 'cl': 1.36, 'mn': 1.51, 'f': 2.87}
N_TAB = {'li': 1, 'na': 1, 'mg': 2, 'al': 3, 'zn': 2, 'fe': 2, 'ni': 2, 'pb': 2, 'h': 2, 'cu': 2, 'i': 2, 'fe3': 1, 'ag': 1, 'no3': 3, 'br': 2, 'cr': 6, 'cl': 2, 'mn': 5, 'f': 2}
P = {p['k']: p for p in web['pares']}
for k, p in P.items():
    comprobar('E° tabla ' + k, abs(p['E'] - E_TAB[k]) < 1e-9)
    comprobar('n semirreacción ' + k, p['n'] == N_TAB[k])
    # la semirreacción (con sus H⁺ y H₂O) está ajustada en átomos y carga con n electrones
    izq = {s: c for c, s in p['ox']}; der = {s: c for c, s in p['red']}
    ai, qi = {}, 0
    for s, c in izq.items():
        a, q = parse(s); qi += q * c
        for e, x in a.items(): ai[e] = ai.get(e, 0) + x * c
    ad, qd = {}, 0
    for s, c in der.items():
        a, q = parse(s); qd += q * c
        for e, x in a.items(): ad[e] = ad.get(e, 0) + x * c
    comprobar('semirreacción ajustada ' + k, ai == ad and qi - p['n'] == qd, f'{ai} {ad} {qi} {qd}')
comprobar('orden de la tabla: sube la fila de arriba', [P[k]['E'] for k in sorted(P, key=lambda k: P[k]['E'])] == sorted(E_TAB.values()))
# Faraday: masas molares y electrones por unidad
MM = {'Cu': 63.5, 'Ag': 107.9, 'Al': 27.0, 'Zn': 65.4, 'Ni': 58.7, 'Au': 197.0, 'Na': 23.0, 'Cl₂': 71.0, 'H₂': 2.0, 'O₂': 32.0}
for s in web['sust']:
    el = s['t'].split(' ')[0]
    comprobar('M de ' + el, MM[el] == s['M'])
    izq, der = [x.strip() for x in s['sem'].split('⟶')]
    ne = int(re.search(r'(\d*) e⁻', izq if 'e⁻' in izq else der).group(1) or 1)
    comprobar('electrones de ' + el, ne == s['n'], f"semirreacción {s['sem']} → {ne}, web {s['n']}")
# valoraciones: el cociente de electrones coincide con el de coeficientes de la ecuación escrita, y la ecuación está ajustada
for k, vv in web['valora'].items():
    izq, der = [x.strip() for x in vv['ec'].split('⟶')]
    def lado(t):
        d = {}
        for term in t.split(' + '):
            m = re.match(r'(\d*)\s*(.+)', term.strip()); d[m.group(2)] = int(m.group(1) or 1)
        return d
    li, ld = lado(izq), lado(der)
    good, det = balanceada(li, ld)
    comprobar('ecuación de la valoración ' + k, good, det)
    razon = li[vv['an']] / li[vv['tit']]
    comprobar('razón analito:valorante ' + k, abs(razon - vv['ne_t'] / vv['ne_a']) < 1e-12, f'{razon} frente a {vv["ne_t"]}/{vv["ne_a"]}')
M_AN = {'Fe²⁺': 55.85, 'C₂O₄²⁻': 2 * 12.011 + 4 * 15.999, 'H₂O₂': 2 * 1.008 + 2 * 15.999}
for k, vv in web['valora'].items(): cab('M del analito ' + k, vv['M'], M_AN[vv['an']], 0.002)

# ---------------------------------------------------------------- 3. Ejercicios
def fem(c, a): return E_TAB[c] - E_TAB[a]
def masa(M, n, I, t): return M * I * t / (n * F)
cab('c1', 6.0, v('c1')); cab('c2', 5.0, v('c2')); cab('c3', 4.0, v('c3'))
# c1: K2MnO4 → 2 + x - 8 = 0 ; c2: HNO3 ; c3: CO3²⁻
x = sp.symbols('x'); cab('c1 sympy', float(sp.solve(2 * 1 + x + 4 * (-2), x)[0]), v('c1')); cab('c2 sympy', float(sp.solve(1 + x + 3 * (-2), x)[0]), v('c2')); cab('c3 sympy', float(sp.solve(x + 3 * (-2) + 2, x)[0]), v('c3'))
cab('c7', parse('Al³⁺')[1], v('c7')); cab('c8 coef H⁺ (4 H₂O → 8 H)', 4 * parse('H₂O')[0]['H'], v('c8'))
cab('c9', fem('cu', 'zn'), v('c9'))
cab('c12', -2 * F * 1.10 / 1000, v('c12')); cab('c13', 2.0 * 600, v('c13')); cab('c14', 4825 / F, v('c14')); cab('c15', 0.20 / 2 * 63.5, v('c15'))
cab('d1', float(sp.solve(2 * x + 3 * (-2) + 2, x)[0]), v('d1')); cab('d2', float(sp.solve(3 * x + 4 * (-2), x)[0]), v('d2'), 0.001)
cab('d3 (carga)', float(sp.solve(-2 + 14 - x - (2 * 3), x)[0]), v('d3'))
cab('d4', 5, v('d4')); cab('d5', fem('ag', 'al'), v('d5')); cab('d6', E_TAB['cu'] - E_TAB['mg'], v('d6'))
comprobar('d7: Fe³⁺ oxida I⁻', E_TAB['fe3'] - E_TAB['i'] > 0 and EJ['d7']['check']['opciones'][EJ['d7']['check']['ok']].startswith('Sí'))
comprobar('d8: Al el más reductor', min(['al', 'zn', 'cu', 'ag'], key=lambda k: E_TAB[k]) == 'al' and EJ['d8']['check']['opciones'][EJ['d8']['check']['ok']] == 'Al')
cab('d9', masa(63.5, 2, 3.0, 40 * 60), v('d9')); cab('d10', 5.00 * 1 * F / (107.9 * 2.50), v('d10'))
cab('d11', 0.0100 * 0.0200 * 5 / 0.0250, v('d11')); cab('d12', 2 * 1.10 / RT, v('d12'))
cab('d13', 5.0 * 1800 / F / 2 * R_GAS * 298, v('d13'))
comprobar('d14: cátodo H₂', E_TAB['na'] < -0.41 and EJ['d14']['check']['opciones'][EJ['d14']['check']['ok']] == 'H₂')
cab('d15', fem('ag', 'cu'), v('d15'))
comprobar('d16: ánodo Cl₂', EJ['d16']['check']['opciones'][EJ['d16']['check']['ok']] == 'Cl₂')
cab('d17', -3 * F * fem('ag', 'al') / 1000, v('d17'))
# d18: balance de H: 7 H₂O → 14 H, y la carga
cab('d18', 7 * 2, v('d18')); comprobar('d18 carga', -2 + 14 + 6 * 2 == 2 * 3 + 6 * 3)
# EvAU
cab('e1 fem', fem('ag', 'zn'), v('e1', 0)); cab('e1 masa Ag', 0.50 / 65.4 * 2 * 107.9, v('e1', 1))
cab('e2', 0.2500 / 134.0 * 2 / 5 / 0.0187, v('e2'))
cab('e3', 0.0167 * 0.0261 * 6 * 55.85 / 0.5000 * 100, v('e3'))
cab('e4', 0.0150 * 0.0216 * 5 / 2 / 0.0250 * 10 * 34.01, v('e4'))
cab('e5', 1.00 / 63.5 * 2 * 107.9, v('e5'))
cab('e6', 10.0 / 27.0 * 3 * F / 7200, v('e6'))
cab('e7 e⁻', 10.0 * 3600 / F, v('e7', 0)); cab('e7 Cl₂', 10.0 * 3600 / F / 2 * R_GAS * 298, v('e7', 1))
cab('e8', 1000 / 27.0 * 3 * F / 50000, v('e8'))
cab('e9 ΔG', -2 * F * fem('ag', 'cu') / 1000, v('e9', 0)); cab('e9 logK', 2 * fem('ag', 'cu') / RT, v('e9', 1))
cab('e10', 1.00 / (R_GAS * 298) * 63.5, v('e10'))
cab('e11', masa(58.7, 2, 3.0, 1200) / 8.9 / 50 * 1e4, v('e11'))
cab('e12', E_TAB['cu'] - 1.10, v('e12'))
# e13: coeficientes y átomos de la ecuación molecular (Cu(NO₃)₂ tiene 2 N y 6 O)
comprobar('e13: 3 Cu + 8 HNO₃ → 3 Cu(NO₃)₂ + 2 NO + 4 H₂O', v('e13') == [3, 8, 3, 2, 4])
c = v('e13'); comprobar('e13 átomos', c[0] == c[2] and c[1] == 2 * c[4] and c[1] == 2 * c[2] + c[3] and 3 * c[1] == 6 * c[2] + c[3] + c[4])
comprobar('e14: el Fe se oxida más rápido bajo Sn', E_TAB['fe'] < -0.14 and EJ['e14']['check']['opciones'][EJ['e14']['check']['ok']].startswith('El Fe'))
comprobar('e15: primero Cu', E_TAB['cu'] > -0.41 > E_TAB['na'] and EJ['e15']['check']['opciones'][EJ['e15']['check']['ok']] == 'Cu')
cab('e16', 1.33 - 0.77, v('e16')); cab('e17', 0.200 * 0.0250 / 6 / 0.100 * 1000, v('e17')); cab('e18', 0.10 * 0.100 * R_GAS * 298, v('e18'))
# todos los ejercicios están cubiertos
cubiertos = {'c%d' % i for i in range(1, 17)} | {'d%d' % i for i in range(1, 19)} | {'e%d' % i for i in range(1, 19)}
comprobar('todos los ejercicios tienen verificación', set(EJ) == cubiertos, str(set(EJ) ^ cubiertos))

# ---------------------------------------------------------------- 4. Ejemplos de la teoría
# n.º de oxidación
cab('teoría: Mn en KMnO₄', float(sp.solve(1 + x + 4 * (-2), x)[0]), 7); cab('teoría: Cr en Cr₂O₇²⁻', float(sp.solve(2 * x + 7 * (-2) + 2, x)[0]), 6)
cab('teoría: N en NH₄⁺', float(sp.solve(x + 4 - 1, x)[0]), -3); cab('teoría: Fe en Fe₃O₄', float(sp.solve(3 * x - 8, x)[0]), 8 / 3, 0.001)
cab('teoría: S en S₂O₃²⁻', float(sp.solve(2 * x - 6 + 2, x)[0]), 2); cab('teoría: O en H₂O₂', float(sp.solve(2 + 2 * x, x)[0]), -1)
# pilas y potenciales
cab('teoría: Al–Ag fem 2,46', fem('ag', 'al'), 2.46); cab('teoría: Al–Ag ΔG −712 kJ', -3 * F * 2.46 / 1000, -712.2)
cab('teoría: Zn en HCl', 0 - E_TAB['zn'], 0.76); cab('teoría: Cu en HCl', 0 - E_TAB['cu'], -0.34)
cab('teoría: Fe + Cu²⁺', fem('cu', 'fe'), 0.78); cab('teoría: Cu + 2 Ag⁺', fem('ag', 'cu'), 0.46)
cab('teoría: Zn–Cu ΔG', -2 * F * 1.10 / 1000, -212.3); cab('teoría: log K Zn–Cu', 2 * 1.10 / RT, 37.2, 0.002); cab('teoría: K Zn–Cu', 10 ** (2 * 1.10 / RT), 1.4e37, 0.05)
cab('teoría: Cu en HNO₃', E_TAB['no3'] - E_TAB['cu'], 0.62); cab('teoría: Ag en HNO₃', E_TAB['no3'] - E_TAB['ag'], 0.16)
cab('teoría: NaCl fundido', E_TAB['na'] - E_TAB['cl'], -4.07); cab('teoría: CuCl₂(aq)', E_TAB['cu'] - E_TAB['cl'], -1.02)
cab('teoría: pila Zn–Ag', fem('ag', 'zn'), 1.56); cab('teoría: pila combustible ΔG', -4 * F * 1.23 / 1000, -474.8, 0.002)
comprobar('teoría: pila combustible coincide con 2·ΔGf(H₂O) = −474,2 kJ', abs(-4 * F * 1.23 / 1000 - 2 * (-237.1)) < 1.0)
# valoraciones
cab('teoría: Fe²⁺ 0,0920', 5 * 0.0200 * 0.0184 / 0.0200, 0.0920); cab('teoría: Fe²⁺ g/L', 0.0920 * 55.85, 5.14, 0.002)
cab('teoría: H₂O₂ diluida', 5 / 2 * 0.0150 * 0.0216 / 0.0250, 0.0324); cab('teoría: H₂O₂ comercial g/L', 0.324 * 34.01, 11.0, 0.002)
cab('teoría: oxalato → KMnO₄', 0.2500 / 134.0 * 2 / 5 / 0.0187, 0.0399); cab('teoría: Fe en mineral', 0.0167 * 0.0261 * 6 * 55.85 / 0.5 * 100, 29.2)
# Faraday
cab('teoría: Cu 3 A 40 min', masa(63.5, 2, 3.0, 2400), 2.37); cab('teoría: Ag 5 g', 5.00 / 107.9 * F / 2.50, 1789, 0.001); cab('teoría: Al 10 g', 10.0 / 27.0 * 3 * F / 7200, 14.9)
cab('teoría: H₂ del agua', 5.0 * 1800 / F / 2 * R_GAS * 298, 1.14); cab('teoría: O₂ del agua', 5.0 * 1800 / F / 4 * R_GAS * 298, 0.570)
cab('teoría: Cu/Ag en serie', 1.00 * (107.9 / 1) / (63.5 / 2), 3.40)
cab('teoría: Zn–Ag masa Ag', 0.50 / 65.4 * 2 * 107.9, 1.65)
cab('teoría: F = e·N_A', 1.602176634e-19 * 6.02214076e23, 96485, 0.001)

print(f'comprobaciones correctas: {ok}')
if fallos:
    print('FALLOS:'); [print('  -', f) for f in fallos]; sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos · todo verificado')
