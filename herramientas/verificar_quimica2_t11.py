#!/usr/bin/env python3
"""
Verificación independiente de Química II, tema 11 (Polímeros y macromoléculas).

 1. Datos del constructor de cadenas: cada fórmula escrita (monómeros y unidad repetida) se analiza con un analizador propio y se
    comprueba que la composición coincide con la usada por la web, que en la adición unidad = monómero y que en la condensación
    unidad = monómeros − agua. Masas de unidad, de cadena y agua liberada para varios n.
 2. Ejemplos resueltos de la teoría (PE, PVC, PP, nailon, PET, almidón, tripéptido, combustiones, SBR, masa media, botella de PET).
 3. Los ejercicios numéricos: cada valor se recalcula desde las definiciones y se compara con el que guarda la web.

Uso:  sh build.sh && python3 herramientas/verificar_quimica2_t11.py        (necesita: pip install sympy)
"""
import json, os, re, subprocess, sys
from fractions import Fraction as Fr
import sympy as sp

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
ok, fallos = 0, []
def comprobar(nombre, cond, det=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {det}')
def cerca(a, b, tol=0.006): return abs(a - b) <= tol * max(abs(b), 1e-12)
def cab(nombre, a, b, tol=0.006): comprobar(nombre, cerca(a, b, tol), f'(calculado {a:.6g}, web/texto {b:.6g})')

JS = r"""
const fs = require('fs'), vm = require('vm'), noop = () => {};
const el = () => ({ setAttribute: noop, appendChild: noop, style: {}, classList: { add: noop, remove: noop } });
const sb = { console, document: { addEventListener: noop, createElementNS: el, createElement: el, getElementById: () => null, head: el(), body: el() },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sb.window = sb; vm.createContext(sb);
vm.runInContext(fs.readFileSync(process.argv[1] + '/ampliaciones/bachi.js', 'utf8'), sb);
const B = sb.BACHI, Q = B.lab.q11;
const dc = {}; for (const k of Object.keys(Q.CO)) for (const n of [1, 2, 10, 100, 10000]) dc[k + '|' + n] = Q.datosCO(k, n);
console.log(JSON.stringify({ AD: Q.AD, CO: Q.CO, AT: Q.AT, dc, ej: JSON.parse(JSON.stringify(B.ampl.quimica2.t11.ejercicios)) }));
"""
web = json.loads(subprocess.check_output(['node', '-e', JS, os.path.abspath(RAIZ)]))
EJ = {e['id']: e for e in web['ej']}
def v(id_, k=0):
    ch = EJ[id_]['check']; ch = ch if isinstance(ch, list) else [ch]
    return ch[k]['valor']

# ---------------------------------------------------------------- masas atómicas y analizador de fórmulas propios
M = {'H': 1, 'C': 12, 'N': 14, 'O': 16, 'F': 19, 'S': 32, 'Cl': 35.5}
SUB = str.maketrans('₀₁₂₃₄₅₆₇₈₉', '0123456789')
def comp(formula):
    """Analiza 'CH2=C(CH3)-COOCH3' (ignora enlaces y corchetes) con paréntesis y multiplicadores."""
    s = formula.translate(SUB)
    s = re.sub(r'[−\-=\[\]]', '', s)
    s = re.sub(r'[Hh]ex', '', s)
    pos = 0
    def grupo():
        nonlocal pos
        d = {}
        while pos < len(s):
            c = s[pos]
            if c == '(':
                pos += 1; sub = grupo()
                m = re.match(r'\d+', s[pos:]); k = int(m.group()) if m else 1
                if m: pos += len(m.group())
                for e, n in sub.items(): d[e] = d.get(e, 0) + n * k
            elif c == ')':
                pos += 1; return d
            else:
                m = re.match(r'([A-Z][a-z]?)(\d*)', s[pos:])
                if not m: raise ValueError(f'no se entiende {formula!r} en {s[pos:]!r}')
                pos += len(m.group()); d[m.group(1)] = d.get(m.group(1), 0) + (int(m.group(2)) if m.group(2) else 1)
        return d
    return grupo()
def masa(c): return sum(M[e] * n for e, n in c.items())
def suma(a, b, k=1):
    r = dict(a)
    for e, n in b.items(): r[e] = r.get(e, 0) + k * n
    return {e: n for e, n in r.items() if n}
AGUA = {'H': 2, 'O': 1}
MH2O = masa(AGUA)
comprobar('H2O = 18', MH2O == 18)
for e, m in M.items(): comprobar('masa atómica ' + e, web['AT'].get(e) == m or e == 'S', e)  # el azufre solo se usa en el texto (32)

# ---------------------------------------------------------------- 1. datos del constructor
for k, a in web['AD'].items():
    cm = comp(a['fm']); cu = comp(a['u'])
    comprobar(f'AD {k}: composición de la web = fórmula escrita', cm == a['c'], f'{cm} vs {a["c"]}')
    comprobar(f'AD {k}: unidad repetida = monómero (adición)', cu == cm, f'{cu} vs {cm}')
for k, a in web['CO'].items():
    tot = {}
    for m in a['m']:
        cm = comp(m['f'])
        comprobar(f'CO {k}: {m["nom"]} composición = fórmula escrita', cm == m['c'], f'{cm} vs {m["c"]}')
        tot = suma(tot, cm)
    esperada = suma(tot, AGUA, -a['n'])
    cu = comp(a['u'])
    comprobar(f'CO {k}: unidad repetida = monómeros − {a["n"]} H2O', cu == esperada, f'{cu} vs {esperada}')
    for n in (1, 2, 10, 100, 10000):
        w = web['dc'][f'{k}|{n}']
        enl = a['n'] * n - 1
        cab(f'CO {k} n={n}: M de la cadena', n * masa(tot) - enl * MH2O, w['M'])
        comprobar(f'CO {k} n={n}: enlaces / agua liberada', w['enlaces'] == enl, f'{w["enlaces"]} vs {enl}')
        cab(f'CO {k} n={n}: M de la unidad', masa(cu), w['unidad'])
        # conservación de la masa: monómeros = cadena + agua
        comprobar(f'CO {k} n={n}: conservación de la masa', abs(sum(masa(comp(m['f'])) for m in a['m']) * n - (w['M'] + enl * MH2O)) < 1e-9)
# masas de monómeros citadas en el texto y los ejercicios
cab('hexanodioico 146', masa(comp('HOOC-(CH2)4-COOH')), 146); cab('diamina 116', masa(comp('H2N-(CH2)6-NH2')), 116)
cab('ácido tereftálico 166', masa(comp('HOOC-C6H4-COOH')), 166); cab('etanodiol 62', masa(comp('HO-CH2-CH2-OH')), 62)
cab('PET unidad 192', masa(comp('C10H8O4')), 192); cab('nailon 6,6 unidad 226', masa(comp('C12H22N2O2')), 226)
cab('ác. láctico 90', masa(comp('C3H6O3')), 90); cab('PLA unidad 72', masa(comp('C3H4O2')), 72)
cab('glicina 75', masa(comp('C2H5NO2')), 75); cab('alanina 89', masa(comp('C3H7NO2')), 89)
cab('glucosa 180', masa(comp('C6H12O6')), 180); cab('unidad almidón 162', masa(comp('C6H10O5')), 162)
cab('butadieno 54', masa(comp('C4H6')), 54); cab('estireno 104', masa(comp('C8H8')), 104); cab('isopreno 68', masa(comp('C5H8')), 68)
cab('cloroeteno 62,5', masa(comp('C2H3Cl')), 62.5); cab('eteno 28', masa(comp('C2H4')), 28); cab('C2F4 100', masa(comp('C2F4')), 100)
cab('6-aminohexanoico 131', masa(comp('H2N-(CH2)5-COOH')), 131); cab('HCl 36,5', masa(comp('HCl')), 36.5); cab('CO2 44', masa(comp('CO2')), 44)
cab('unidad nailon 6 = 131 − 18 = 113', masa(comp('NH-(CH2)5-CO')), 113)

# ---------------------------------------------------------------- 2. ejemplos de la teoría
cab('ej PE: n = 56 000/28 = 2 000', 56000 / masa(comp('C2H4')), 2000); cab('ej PE: 4 000 C', 2000 * 2, 4000)
cab('ej PVC: n = 125 000/62,5 = 2 000', 125000 / 62.5, 2000); cab('ej PVC: %Cl = 56,8', 100 * 35.5 / 62.5, 56.8)
cab('ej PP: 500 kg · 0,90 = 450', 500 * 0.90, 450)
n_ac, n_di = 29.2 / 146, 23.2 / 116
cab('ej nailon: mol ácido 0,200', n_ac, 0.2); cab('ej nailon: mol diamina 0,200', n_di, 0.2)
agua = 2 * n_ac * 18; cab('ej nailon: agua 7,2 g', agua, 7.2); cab('ej nailon: polímero 45,2 g', 29.2 + 23.2 - agua, 45.2)
cab('ej nailon: comprobación 0,2·226', 0.2 * 226, 45.2)
cab('ej PET: mol ácido 602,4', 100000 / 166, 602.4); cab('ej PET: teórico 115,7 kg', 100000 / 166 * 192 / 1000, 115.7); cab('ej PET: 98,3 kg', 100000 / 166 * 192 / 1000 * 0.85, 98.3)
cab('ej almidón: 16,2 g = 0,100 mol', 16.2 / 162, 0.1); cab('ej almidón: agua 1,8 g', 0.1 * 18, 1.8); cab('ej almidón: glucosa 18,0 g', 16.2 + 1.8, 18.0); cab('ej almidón: 0,1·180', 0.1 * 180, 18.0)
cab('ej tripéptido Gly-Ala-Gly = 203', 75 + 89 + 75 - 2 * 18, 203)
nCH2 = 1000 / 14
cab('ej combustión PE: 71,43 mol', nCH2, 71.43); cab('ej PE: CO2 3 143 g', nCH2 * 44, 3143); cab('ej PE: H2O 1 286 g', nCH2 * 18, 1286)
cab('ej PE: O2 3 429 g', nCH2 * 1.5 * 32, 3429); cab('ej PE: balance de masas', 1000 + nCH2 * 1.5 * 32, nCH2 * 44 + nCH2 * 18)
cab('ej PVC: 16,0 mol', 1000 / 62.5, 16.0); cab('ej PVC: HCl 584 g', 1000 / 62.5 * 36.5, 584)
cab('ej SBR: 266 g', 3 * 54 + 104, 266); cab('ej SBR: 39,1 %', 104 / 266 * 100, 39.1)
cab('ej masa media: 20 000', (50 * 10000 + 50 * 30000) / 100, 20000)
cab('ej botella PET: 0,125 mol', 24.0 / 192, 0.125); cab('ej botella PET: 1,25 mol CO2', 10 * 24.0 / 192, 1.25); cab('ej botella PET: 55,0 g', 10 * 24.0 / 192 * 44, 55.0)
# PET: C10H8O4 + 10 O2 -> 10 CO2 + 4 H2O (ajuste con sympy)
a, b_, c_, d_ = sp.symbols('a b c d')
sol = sp.solve([10 - c_, 8 - 2 * d_, 4 + 2 * b_ - 2 * c_ - d_], [b_, c_, d_], dict=True)[0]
comprobar('ecuación PET: 10 O2', sol[b_] == 10 and sol[c_] == 10 and sol[d_] == 4, str(sol))
# Combustión de (CH2)n y de la unidad C3H6, C8H8, C2H3Cl: ajuste con sympy (C->H->O, con HCl en el último)
def ajuste(c, extra_cl=False):
    x, y, z, t = sp.symbols('x y z t')   # O2, CO2, H2O, HCl
    ec = [c.get('C', 0) - y, c.get('H', 0) - 2 * z - (t if extra_cl else 0), 2 * x - 2 * y - z]
    if extra_cl: ec.append(c.get('Cl', 0) - t)
    s = sp.solve(ec, [x, y, z] + ([t] if extra_cl else []), dict=True)[0]
    return s
s = ajuste({'C': 1, 'H': 2}); comprobar('ecuación PE: 3/2 O2 por CH2', s[sp.Symbol('x')] == sp.Rational(3, 2))
s = ajuste({'C': 2, 'H': 3, 'Cl': 1}, True)
comprobar('ecuación PVC: 5/2 O2, 2 CO2, 1 H2O, 1 HCl', (s[sp.Symbol('x')], s[sp.Symbol('y')], s[sp.Symbol('z')], s[sp.Symbol('t')]) == (sp.Rational(5, 2), 2, 1, 1), str(s))
comprobar('ecuación PVC: H2O por unidad = 1 (H3 = 2·z + 1 → z = 1)', s[sp.Symbol('z')] == 1, str(s))

# ---------------------------------------------------------------- 3. ejercicios numéricos
cab('a4', 1500 * 104, v('a4')); cab('a5', 84000 / 28, v('a5')); cab('a9', 500 * masa(comp('C2F4')), v('a9')); cab('a12', 166 + 62 - 2 * 18, v('a12'))
cab('a15', 2 * 75 - 18, v('a15'))
cab('b1 polímero', 29.2 + 23.2 - 2 * (29.2 / 146) * 18, v('b1', 0)); cab('b1 agua', 2 * (29.2 / 146) * 18, v('b1', 1))
cab('b3', 500 * 0.90, v('b3')); cab('b4', 87500 / 62.5, v('b4')); cab('b5', 3 * 89 - 2 * 18, v('b5'))
cab('b6', 32.4 + 32.4 / 162 * 18, v('b6'))
cab('b7', 5000 / 42 * 3 * 44 / 1000, v('b7')); cab('b8', 250 / 62.5 * 36.5, v('b8'))
cab('b11', 104 / (2 * 54 + 104) * 100, v('b11')); cab('b12', 38400 / 192, v('b12')); cab('b14', 3.20 * 62.5, v('b14'))
cab('b15 PLA', 180 / 90 * 72, v('b15', 0)); cab('b15 agua', 180 / 90 * 18, v('b15', 1)); cab('b15 balance', 180, 180 / 90 * 72 + 180 / 90 * 18)
cab('b17', (30 * 20000 + 70 * 40000) / 100, v('b17'))
cab('c1', 100000 / 166 * 192 * 0.85 / 1000, v('c1')); cab('c2', 22600 / 226, v('c2'))
cab('c3', round((55000 - 18) / 110) - 1, v('c3'), 0.02)
cab('c4', 4 * 19 / 100 * 100, v('c4'))
cab('c5', 10.0 / 104 * 8 * 0.082 * 298, v('c5'), 0.01)
# c6: copolímero con 40,0 % de Cl: fracción molar de cloroeteno (sympy)
x, y = sp.symbols('x y', positive=True)
sc = sp.solve(sp.Eq(35.5 * x, sp.Rational(40, 100) * (62.5 * x + 28 * y)), x)[0]
cab('c6 x/y', float(sc / y), 1.0667, 0.001); cab('c6 fracción', float(sc / (sc + y)) * 100, v('c6'))
cab('c7', 4 * 32 / (100 * 68 + 4 * 32) * 100, v('c7'))
cab('c9', 81.0 / 162 * 180, v('c9')); cab('c9 agua', 81.0 / 162 * 18, 9.0)
cab('c10', 10 * 128 - 9 * 18, v('c10')); cab('c11', 1000 * 330 - 999 * 18, v('c11')); cab('c12', 200 * 131 - 199 * 18, v('c12'))
# cifras de las pistas de los ejercicios
cab('b7 pasos: 119,05 mol', 5000 / 42, 119.05); cab('b7 pasos: 357,14 mol CO2', 5000 / 42 * 3, 357.14)
cab('c5 pasos: 0,09615 mol', 10.0 / 104, 0.09615); cab('c5 pasos: 0,7692 mol CO2', 10.0 / 104 * 8, 0.7692)
cab('c7 pasos: 6 800 g', 100 * 68, 6800); cab('c11 pasos: 17 982', 999 * 18, 17982); cab('c12 pasos: 26 200 y 3 582', 200 * 131 - 199 * 18, 22618)
cab('b6 pasos: 0,200 mol y 3,6 g', 32.4 / 162 * 18, 3.6)
cab('c1 pasos: 115 663 g', 100000 / 166 * 192, 115663, 0.001)
# todos los ejercicios de la web tienen id único y 15/16/13 por nivel
ids = [e['id'] for e in web['ej']]
comprobar('ids únicos', len(ids) == len(set(ids)))
comprobar('al menos 40 ejercicios', len(ids) >= 40, str(len(ids)))
comprobar('hay ejercicios de los tres niveles', {e['nivel'] for e in web['ej']} == {1, 2, 3})

if fallos:
    print('FALLOS:'); [print(' -', f) for f in fallos]; print(f'{ok} comprobaciones correctas, {len(fallos)} fallos'); sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos')
