#!/usr/bin/env python3
"""
Verificación independiente de Química II, tema 10 (Reactividad de los compuestos del carbono).

 1. Ecuaciones: combustiones (C→H→O), oxidaciones con dicromato (átomos y carga) y reacciones del tema,
    con sympy (espacio nulo de la matriz de composición).
 2. Simulador de esterificación: la raíz del equilibrio (K = 4) de la web frente a sympy, y los valores del texto.
 3. Simulador de Markovnikov: el carbocatión de cada producto se recalcula contando los carbonos unidos al C⁺.
 4. Simulador del efecto inductivo: pKa frente a una tabla propia (CRC / tablas de selectividad) y razones de Ka.
 5. Los 51 ejercicios (valor numérico recalculado desde las definiciones) y los ejemplos resueltos de la teoría.

Uso:  sh build.sh && python3 herramientas/verificar_quimica2_t10.py        (necesita: pip install sympy)
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
R_GAS = 0.082

JS = r"""
const fs = require('fs'), vm = require('vm'), noop = () => {};
const el = () => ({ setAttribute: noop, appendChild: noop, style: {}, classList: { add: noop, remove: noop } });
const sb = { console, document: { addEventListener: noop, createElementNS: el, createElement: el, getElementById: () => null, head: el(), body: el() },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sb.window = sb; vm.createContext(sb);
vm.runInContext(fs.readFileSync(process.argv[1] + '/ampliaciones/bachi.js', 'utf8'), sb);
const B = sb.BACHI, Q = B.lab.q10;
const eq = []; for (const [a, b] of [[1, 1], [1, 10], [1, 2], [2, 1], [0.5, 5], [3, 7.5], [5, 0.5]]) eq.push([a, b, Q.equilibrio(4, a, b)]);
console.log(JSON.stringify({ pka: Q.PKA, cat: Q.CAT, alq: Q.ALQ, eq, ej: JSON.parse(JSON.stringify(B.ampl.quimica2.t10.ejercicios)) }));
"""
web = json.loads(subprocess.check_output(['node', '-e', JS, os.path.abspath(RAIZ)]))
EJ = {e['id']: e for e in web['ej']}
def v(id_, k=0):
    ch = EJ[id_]['check']; ch = ch if isinstance(ch, list) else [ch]
    c = ch[k]
    return c['valor'] if 'valor' in c else c['valores']

# ---------------------------------------------------------------- masas molares (analizador propio)
AT = {'C': 12, 'H': 1, 'O': 16, 'Br': 80, 'Na': 23, 'N': 14, 'Cl': 35.5}
def comp(f):
    d = {}
    for el, n in re.findall(r'([A-Z][a-z]?)([0-9]*)', f): d[el] = d.get(el, 0) + (int(n) if n else 1)
    return d
def M(f): return sum(AT[e] * n for e, n in comp(f).items())
for f, m in [('C3H6', 42), ('C3H7Br', 123), ('C3H8', 44), ('C2H6O', 46), ('C2H4O2', 60), ('C4H8O2', 88), ('C2H3O2Na', 82), ('C6H6', 78), ('C6H5NO2', 123),
             ('C2H4', 28), ('Br2', 160), ('C2H4Br2', 188), ('C2H2', 26), ('C4H10', 58), ('C3H8O', 60), ('CH2O', 30)]:
    comprobar(f'M({f})', M(f) == m, f'{M(f)} != {m}')

# ---------------------------------------------------------------- 1. ecuaciones: espacio nulo
def nulo(izq, der):
    esp = izq + der
    elems = sorted({e for s, _ in esp for e in s})
    filas = [[(s.get(e, 0) * (1 if i < len(izq) else -1)) for i, (s, _) in enumerate(esp)] for e in elems]
    filas.append([q * (1 if i < len(izq) else -1) for i, (_, q) in enumerate(esp)])      # carga
    ns = sp.Matrix(filas).nullspace()
    if len(ns) != 1: return None
    n = ns[0]; n = n * sp.ilcm(*[x.q for x in n])
    n = n / sp.igcd(*[int(x) for x in n])
    if n[0] < 0: n = -n
    return [int(x) for x in n]
def esp(x): return (comp(x[0]), x[1]) if isinstance(x, tuple) else (comp(x), 0)
def ec(nombre, izq, der, coef):
    r = nulo([esp(x) for x in izq], [esp(x) for x in der])
    comprobar('ecuación ' + nombre, r == coef, f'(sympy {r}, texto {coef})')
ec('propano', ['C3H8', 'O2'], ['CO2', 'H2O'], [1, 5, 3, 4])
ec('etano', ['C2H6', 'O2'], ['CO2', 'H2O'], [2, 7, 4, 6])
ec('butano', ['C4H10', 'O2'], ['CO2', 'H2O'], [2, 13, 8, 10])
ec('metano', ['CH4', 'O2'], ['CO2', 'H2O'], [1, 2, 1, 2])
ec('etanol', ['C2H6O', 'O2'], ['CO2', 'H2O'], [1, 3, 2, 3])
ec('etino', ['C2H2', 'O2'], ['CO2', 'H2O'], [2, 5, 4, 2])
ec('metano incompleta (CO)', ['CH4', 'O2'], ['CO', 'H2O'], [2, 3, 2, 4])
for f in ['C3H8', 'C2H6O', 'C4H10', 'CH4', 'C2H2']:      # fórmula general x + y/4 − z/2
    c = comp(f); x_, y_, z_ = c.get('C', 0), c.get('H', 0), c.get('O', 0)
    r = nulo([esp(f), esp('O2')], [esp('CO2'), esp('H2O')])
    comprobar('fórmula general de la combustión: ' + f, sp.Rational(r[1], r[0]) == x_ + sp.Rational(y_, 4) - sp.Rational(z_, 2))
# oxidaciones con dicromato: la solución de átomos y carga (un solo grado de libertad) coincide con la del texto
ec('etanol→ácido (dicromato)', ['C2H6O', ('Cr2O7', -2), ('H', 1)], ['C2H4O2', ('Cr', 3), 'H2O'], [3, 2, 16, 3, 4, 11])
ec('propan-2-ol→propanona (dicromato)', ['C3H8O', ('Cr2O7', -2), ('H', 1)], ['C3H6O', ('Cr', 3), 'H2O'], [3, 1, 8, 3, 2, 7])
comprobar('electrones etanol→ácido (3·4 = 2·6)', 3 * 4 == 2 * 6); comprobar('electrones propan-2-ol→propanona (3·2 = 1·6)', 3 * 2 == 1 * 6)
ec('benceno nitración', ['C6H6', 'HNO3'], ['C6H5NO2', 'H2O'], [1, 1, 1, 1])
ec('etino + 2 H2', ['C2H2', 'H2'], ['C2H6'], [1, 2, 1])
ec('saponificación', ['C4H8O2', 'NaOH'], ['C2H3O2Na', 'C2H6O'], [1, 1, 1, 1])
ec('esterificación', ['C2H4O2', 'C2H6O'], ['C4H8O2', 'H2O'], [1, 1, 1, 1])
ec('amida', ['C2H4O2', 'CH5N'], ['C3H7NO', 'H2O'], [1, 1, 1, 1])
ec('deshidratación del etanol', ['C2H6O'], ['C2H4', 'H2O'], [1, 1, 1])
ec('propeno + HBr', ['C3H6', 'HBr'], ['C3H7Br'], [1, 1, 1])
ec('eteno + Br2', ['C2H4', 'Br2'], ['C2H4Br2'], [1, 1, 1])

# ---------------------------------------------------------------- 2. equilibrio de esterificación
x = sp.symbols('x', positive=True)
for a, b, xw in web['eq']:
    sol = [s for s in sp.solve(sp.Eq(x * x, 4 * (a - x) * (b - x)), x) if s <= min(a, b) + 1e-12]
    comprobar(f'equilibrio a={a} b={b}', len(sol) == 1 and cerca(float(sol[0]), xw, 1e-6), f'(sympy {sol}, web {xw})')
cab('1:1 → 66,7 %', 100 * (0.4 / 3) / 0.2, 66.7)
cab('masa de éster (11,7 g)', 0.4 / 3 * 88, 11.7)
x10 = [float(s) for s in sp.solve(sp.Eq(x * x, 4 * (1 - x) * (10 - x)), x) if 0 < s < 1][0]
cab('1:10 → 97,4 %', 100 * x10, 97.4)

# ---------------------------------------------------------------- 3. Markovnikov: tipo de carbocatión
# (nº de carbonos sustituyentes en cada carbono sp², sin contar el otro carbono del doble enlace; H de ese carbono)
ALQ = {'propeno': [(0, 2), (1, 1)], 'but1': [(0, 2), (1, 1)], 'mpropeno': [(0, 2), (2, 0)], 'mbut2': [(1, 1), (2, 0)], 'pent2': [(1, 1), (1, 1)], 'but2': [(1, 1), (1, 1)]}
def tipo_cat(nsus): return {1: 'p', 2: 's', 3: 't'}[nsus + 1]       # C⁺ unido a nsus + 1 carbonos
orden = {'t': 0, 's': 1, 'p': 2}
for k, (c1, c2) in ALQ.items():
    wa = web['alq'][k]
    tipos = sorted([tipo_cat(c1[0]), tipo_cat(c2[0])], key=lambda t: orden[t])
    got = sorted([wa['a'][0]] + ([wa['b'][0]] if wa['b'] else []), key=lambda t: orden[t])
    comprobar(f'Markovnikov {k}: tipos de carbocatión', got == (tipos if wa['b'] else tipos[:1]), f'{got} vs {tipos}')
    # el carbocatión principal (a) está en el carbono con MENOS H (recibe el X); su H = hs[1]
    hmin = min(c1[1], c2[1]); hmax = max(c1[1], c2[1])
    comprobar(f'Markovnikov {k}: H en los dos carbonos', sorted(wa['hs']) == sorted([hmin, hmax]), str(wa['hs']))
    if wa['b'] and wa['a'][0] != wa['b'][0]:
        comprobar(f'Markovnikov {k}: el principal es el carbocatión más estable', orden[wa['a'][0]] < orden[wa['b'][0]])
HIA = {'p': 273, 's': 249, 't': 231}        # afinidad al ion hidruro en fase gas (kcal/mol): C2H5+, i-C3H7+, t-C4H9+
for t in 'tsp': comprobar(f'ΔE carbocatión {t} respecto al terciario', HIA[t] - HIA['t'] == web['cat'][t]['E'], f"{HIA[t] - HIA['t']} vs {web['cat'][t]['E']}")

# ---------------------------------------------------------------- 4. pKa
PKA = {'CH₃COOH': 4.76, 'ClCH₂COOH': 2.87, 'Cl₂CHCOOH': 1.35, 'Cl₃CCOOH': 0.66, 'FCH₂COOH': 2.59, 'BrCH₂COOH': 2.90, 'ICH₂COOH': 3.18,
       'butanoico (sin Cl)': 4.82, '2-clorobutanoico': 2.84, '3-clorobutanoico': 4.06, '4-clorobutanoico': 4.52, 'HCOOH': 3.75, 'CH₃CH₂COOH': 4.87, '(CH₃)₃CCOOH': 5.03}
for grupo in web['pka'].values():
    for nom, val in grupo['datos']:
        nom2 = nom.replace(' (sin X)', '')
        comprobar(f'pKa {nom}', nom2 in PKA and PKA[nom2] == val, f'{val}')
cab('Ka(Cl3CCOOH)/Ka(CH3COOH) = 12 600', 10 ** (4.76 - 0.66), 12589, 0.01)
cab('Ka(ClCH2COOH)/Ka(CH3COOH) = 77,6', 10 ** (4.76 - 2.87), 77.6, 0.005)
comprobar('texto: «más de 10 000 veces»', 10 ** (4.76 - 0.66) > 10000)
comprobar('orden F > Cl > Br > I (pKa creciente)', PKA['FCH₂COOH'] < PKA['ClCH₂COOH'] < PKA['BrCH₂COOH'] < PKA['ICH₂COOH'])
comprobar('pKa crece con la distancia', PKA['2-clorobutanoico'] < PKA['3-clorobutanoico'] < PKA['4-clorobutanoico'] < PKA['butanoico (sin Cl)'])
Ka = 10 ** -2.87; xx = (-Ka + math.sqrt(Ka ** 2 + 4 * Ka * 0.1)) / 2
cab('Ka(2,87)', Ka * 1e3, 1.35, 0.01); cab('[H⁺] ácido cloroetanoico 0,10 M', xx, 1.10e-2, 0.01); cab('pH 0,10 M (1,96)', -math.log10(xx), 1.96, 0.003)
cab('pH aproximado (1,93)', -math.log10(math.sqrt(Ka * 0.1)), 1.93, 0.005); cab('x/0,10 = 11 %', xx / 0.1 * 100, 11, 0.05)

# ---------------------------------------------------------------- 5. ejemplos del texto y ejercicios
cab('propano: 6/13,6', 100 * 6 / 13.6, 44.1, 0.003); cab('propano: 7,6/13,6', 100 * 7.6 / 13.6, 55.9, 0.003)
cab('nitrobenceno teórico', 7.8 / 78 * 123, 12.3); cab('nitrobenceno 80 %', 7.8 / 78 * 123 * 0.8, 9.84)
cab('propeno n', 5.0 / 42, 0.119, 0.01); cab('2-bromopropano teórico', 5.0 / 42 * 123, 14.6, 0.005); cab('2-bromopropano 80 %', 5.0 / 42 * 123 * 0.8, 11.7)
cab('n hidrocarburo', 2.1 / 42, 0.050); cab('n Br2', 8.0 / 160, 0.050)
cab('n ácido', 12.0 / 60, 0.200); cab('n etanol', 9.2 / 46, 0.200); cab('x esterificación', 0.4 / 3, 0.133, 0.003)
cab('n éster', 8.8 / 88, 0.100); cab('acetato de sodio', 0.1 * 82, 8.2); cab('V NaOH', 0.1 / 0.5 * 1000, 200)
cab('etanol n', 4.6 / 46, 0.10); cab('dicromato n', 0.1 * 2 / 3, 0.0667, 0.003); cab('dicromato V (mL)', 0.1 * 2 / 3 / 0.10 * 1000, 667, 0.002)
cab('propan-2-ol n', 6.0 / 60, 0.100); cab('dicromato n (2)', 0.1 / 3, 0.0333, 0.003); cab('dicromato V (2) mL', 0.1 / 3 / 0.2 * 1000, 167, 0.003)
n = 10.0 / 44
cab('propano n', n, 0.227, 0.002); cab('O2', 5 * n, 1.14, 0.005); cab('CO2 n', 3 * n, 0.682, 0.002); cab('V CO2', 3 * n * R_GAS * 298, 16.7, 0.003); cab('E propano', n * 2220, 504.5, 0.001)
dH = 2 * -393.5 + 3 * -285.8 - (-277.7)
cab('ΔHc etanol', dH, -1366.7, 0.0005); cab('100 g de etanol', 100 / 46 * -dH, 2971, 0.001); cab('n 100 g etanol', 100 / 46, 2.17, 0.002)
cab('subtotal Hess: −787,0 − 857,4 + 277,7', -787.0 - 857.4 + 277.7, -1366.7, 0.0001)
nb = 1000 / 58
cab('butano n', nb, 17.2, 0.005); cab('O2 butano', 6.5 * nb, 112, 0.005); cab('V O2', 6.5 * nb * 22.4, 2510, 0.002); cab('aire', 6.5 * nb * 22.4 / 0.21, 11950, 0.001)
cab('eteno n', 10 / 28, 0.357, 0.002); cab('Br2 n', 10 / 160, 0.0625); cab('dibromoetano', 10 / 160 * 188, 11.75); cab('eteno sobrante n', 10 / 28 - 10 / 160, 0.295, 0.003); cab('eteno sobrante g', (10 / 28 - 10 / 160) * 28, 8.3, 0.01)
cab('etanol 23 g', 23 / 46, 0.5); cab('eteno real', 0.5 * 0.9, 0.450); cab('V eteno', 0.45 * R_GAS * 298, 11.0, 0.002)
cab('etino n', 5.2 / 26, 0.20); cab('H2', 0.4 * 22.4, 8.96)
comprobar('ΔH hidrogenación (−137)', -1411 + -286 - -1560 == -137)
mC = 2.20 * 12 / 44; mH = 0.90 * 2 / 18; mO = 1.50 - mC - mH
cab('m(C)', mC, 0.600); cab('m(H)', mH, 0.100); cab('m(O)', mO, 0.800)
cab('n(C)', mC / 12, 0.050); cab('n(H)', mH / 1, 0.100); cab('n(O)', mO / 16, 0.050)
comprobar('empírica CH2O → C2H4O2', 60 / M('CH2O') == 2)
cab('% C en CH2O (40,0)', 12 / 30 * 100, 40.0, 0.001); cab('% H (6,7)', 2 / 30 * 100, 6.7, 0.006); cab('% O (53,3)', 16 / 30 * 100, 53.3, 0.001)

def n_(id_, calc, tol=0.006): cab('ejercicio ' + id_, calc, v(id_), tol)
n_('c9', 2); n_('c10', 7); n_('c15', 10 ** -2.87 * 1e3)
n_('m3', 5.0 / 42 * 123 * 0.8); n_('m4', 10.0 / 44 * 3 * R_GAS * 298); n_('m5', 10.0 / 44 * 5, 0.01)
n_('m6', (0.4 / 3) * 88); n_('m7', 23.0 / 46 * 0.9 * R_GAS * 298); n_('m9', 4.6 / 46 * 2 / 3 / 0.10 * 1000)
n_('m10', 2 * -393.5 + 3 * -285.8 + 277.7, 0.0005); n_('m11', 100 / 46 * 1366.7, 0.001)
n_('m12', 1.50 - 2.20 * 12 / 44 - 0.90 * 2 / 18); n_('m13', 4); n_('m14', (8.0 / 160) / (2.1 / 42))
n_('m15', 5.2 / 26 * 2 * 22.4); n_('m16', 2)
n_('m17', 100 * 2 * 3.8 / (6 + 2 * 3.8)); n_('m18', 8.8 / 88 * 82); n_('m19', 8.8 / 88 / 0.50 * 1000)
n_('m20', 10 ** (4.76 - 2.87)); n_('m21', 7.8 / 78 * 123 * 0.8)
n_('d3', 3); n_('d4', 100 * x10, 0.002); n_('d5', 1000 / 58 * 6.5 * 22.4 / 0.21); n_('d6', min(10 / 28, 10 / 160) * 188)
n_('d7', 6.0 / 60 / 3 / 0.200 * 1000); n_('d8', -1411 + -286 + 1560); n_('d9', -math.log10(xx)); n_('d15', 180 / 30)
for id_, esp_ in [('c3', '2-cloropropano'), ('c8', 'acetato de metilo'), ('m1', '2-buteno'), ('m2', '2-bromo-2-metilbutano'), ('m8', '2-buteno')]:
    comprobar('respuesta ' + id_, esp_ in v(id_) or v(id_)[-1] == esp_, str(v(id_)))
comprobar('d1 (b)', v('d1', 1) == ['2-bromopropano']); comprobar('d2 (a)', v('d2', 0) == ['propeno']); comprobar('d2 (b)', 'propanona' in v('d2', 1))
comprobar('d10 (i)', 'propan-1-ol' in v('d10', 0)); comprobar('d10 (ii)', 'propeno' in v('d10', 1))
def opcion(id_, texto):
    c = EJ[id_]['check']; return c['opciones'][c['ok']] == texto
comprobar('c1', opcion('c1', 'sustitución')); comprobar('d12 orden de acidez', opcion('d12', 'propanoico &lt; etanoico &lt; cloroetanoico'))
comprobar('d13', opcion('d13', 'OH⁻ nucleófilo; el C del CH₃Br electrófilo')); comprobar('d14', opcion('d14', 'CH₃COCH₃ + H₂ → CH₃CH(OH)CH₃'))
comprobar('d12: pKa ordenados', PKA['CH₃CH₂COOH'] > PKA['CH₃COOH'] > PKA['ClCH₂COOH'])
comprobar('51 ejercicios', len(EJ) == 51, str(len(EJ)))
comprobar('alquenos del 2-bromobutano (1 + cis + trans = 3)', 1 + 2 == v('d3'))
comprobar('H del propano: 6 primarios + 2 secundarios = 8', 6 + 2 == comp('C3H8')['H'])

print(f'comprobaciones correctas: {ok}')
if fallos:
    print('FALLOS:'); [print('  -', f) for f in fallos]; sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos · todo verificado')
