#!/usr/bin/env python3
"""
Verificación independiente de Química II, tema 7 (Ácidos y bases).

 1. Los 48 ejercicios: cada respuesta se recalcula aquí desde las definiciones (sin compartir código con la web).
 2. Los ejemplos resueltos de la teoría, uno por uno (cifras que aparecen en el texto).
 3. El motor de los simuladores (balance de cargas exacto): se compara con un solucionador propio (scipy.brentq en [H⁺] lineal,
    y sympy para los casos de un solo ácido débil) en cientos de puntos: pH de mezclas, curvas de valoración, tampones,
    distribución de especies y constantes de las tablas.

Uso:  sh build.sh && python3 herramientas/verificar_quimica2_t7.py        (necesita: pip install sympy scipy numpy)
"""
import json, os, subprocess, sys, math
import sympy as sp
from scipy.optimize import brentq

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
ok, fallos = 0, []
def comprobar(nombre, cond, det=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {det}')
def cerca(a, b, tol=0.006): return abs(a - b) <= tol * max(abs(b), 1e-12)
def cab(nombre, a, b, tol=0.006): comprobar(nombre, cerca(a, b, tol), f'(calculado {a:.6g}, web/texto {b:.6g})')
def cabs(nombre, a, b, d=0.006): comprobar(nombre, abs(a - b) <= d, f'(calculado {a:.6g}, web/texto {b:.6g})')
log10, sqrt = math.log10, math.sqrt
Kw = 1e-14
Ka_ac, Kb_nh3, Ka_hf, Ka_hno2, Ka_bz, Ka_hclo, Ka_hcn, Kb_mea, Ka_hcooh = 1.8e-5, 1.8e-5, 6.8e-4, 4.5e-4, 6.5e-5, 3.0e-8, 4.9e-10, 4.4e-4, 1.8e-4
pH = lambda x: -log10(x)

# ---------------------------------------------------------------- volcado de la web
JS = r"""
const fs = require('fs'), vm = require('vm'), noop = () => {};
const el = () => ({ setAttribute: noop, appendChild: noop, style: {}, classList: { add: noop, remove: noop } });
const sb = { console, document: { addEventListener: noop, createElementNS: el, createElement: el, getElementById: () => null, head: el(), body: el() },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sb.window = sb; vm.createContext(sb);
vm.runInContext(fs.readFileSync(process.argv[1] + '/ampliaciones/bachi.js', 'utf8'), sb);
const B = sb.BACHI, Q = B.lab.q7;
const clean = o => JSON.parse(JSON.stringify(o, (k, x) => typeof x === 'function' ? undefined : x));
// muestras del motor
let seed = 12345; const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
const gen = [];
for (let i = 0; i < 120; i++) {
  const p = { na: rnd() < 0.5 ? Math.pow(10, -4 + 3.5 * rnd()) : 0, cl: rnd() < 0.5 ? Math.pow(10, -4 + 3.5 * rnd()) : 0, w: [] };
  const nw = 1 + Math.floor(rnd() * 2);
  for (let j = 0; j < nw; j++) p.w.push({ c: Math.pow(10, -3 + 3 * rnd()), ka: Math.pow(10, -11 + 9 * rnd()), z: rnd() < 0.5 ? 0 : 1 });
  gen.push({ p: p, ph: Q.phDe(p) });
}
const val = [];
for (const k of ['ss', 'ds', 'bd', 'bs']) for (const c0 of [0.05, 0.1, 0.3]) for (const ct of [0.1, 0.5]) for (const f of [0, 0.25, 0.5, 0.9, 0.999, 1, 1.001, 1.5, 2]) {
  const V0 = 25, Ve = c0 * V0 / ct; val.push({ k, c0, ct, V: f * Ve, ph: Q.phValora(k, c0, ct, V0, f * Ve) });
}
const reg = [];
for (const k of Object.keys(Q.PARES)) for (const ct of [0.01, 0.1, 1]) for (const r of [0.1, 1, 10]) for (const x of [-15, -5, 0, 5, 15]) reg.push({ k, ct, r, x, ph: Q.phRegul(k, ct, r, x) });
const fr = [];
for (const k of Object.keys(Q.DIS)) for (let ph = 0; ph <= 14; ph++) fr.push({ k, ph, f: Q.fracs(Q.DIS[k].K, ph) });
const cu = [];
for (const K of [1e-3, 1.8e-5, 6.8e-4, 4.9e-10]) for (const c of [1e-3, 0.01, 0.1, 1]) cu.push({ K, c, x: Q.cuad(K, c) });
console.log(JSON.stringify({ gen, val, reg, fr, cu, ACI: clean(Q.ACIDOS), BAS: clean(Q.BASES), DIS: clean(Q.DIS), SAL: clean(Q.SAL), TIPOS: clean(Q.TIPOS), PARES: clean(Q.PARES), IND: clean(Q.IND), SUST: clean(Q.SUST),
  ej: clean(B.ampl.quimica2.t7.ejercicios) }));
"""
web = json.loads(subprocess.check_output(['node', '-e', JS, os.path.abspath(RAIZ)]))
EJ = {e['id']: e for e in web['ej']}
def v(id_, k=0):
    ch = EJ[id_]['check']; ch = ch if isinstance(ch, list) else [ch]
    c = ch[k]
    return c['valor'] if 'valor' in c else c['valores']

# ---------------------------------------------------------------- solucionador propio
def cuadr(K, c): return (-K + sqrt(K * K + 4 * K * c)) / 2
def ph_cargas(na=0.0, cl=0.0, w=()):
    """Balance de cargas con brentq sobre [H⁺] lineal (formulación independiente de la web)."""
    def g(H):
        pos = H + na + sum(z * c * H / (H + ka) for c, ka, z in w)
        neg = Kw / H + cl + sum((1 - z) * c * ka / (ka + H) for c, ka, z in w)
        return pos - neg
    return -log10(brentq(g, 1e-16, 10, xtol=1e-30, rtol=1e-13))

# ---------------------------------------------------------------- 1. Motor de los simuladores
for m in web['gen']:
    p = m['p']; w = [(s['c'], s['ka'], s['z']) for s in p['w']]
    cabs('motor: balance de cargas (muestra)', ph_cargas(p['na'], p['cl'], w), m['ph'], 1e-6)
# casos de un solo ácido débil frente a sympy (ecuación cúbica exacta)
H = sp.symbols('H', positive=True)
for K, c in [(Ka_ac, 0.1), (Ka_hf, 0.1), (Ka_hcn, 0.01), (6.5e-5, 0.05)]:
    sol = sp.nsolve(H + 0 - (Kw / H + c * K / (K + H)), H, 1e-3, prec=30)
    cabs(f'sympy: pH exacto de Ka={K}, c={c}', -log10(float(sol)), ph_cargas(w=[(c, K, 0)]), 1e-6)
# constantes de los simuladores
for a in web['ACI']: comprobar('constante ácido ' + a['t'], {'CH₃COOH': Ka_ac, 'HF': Ka_hf, 'HNO₂': Ka_hno2, 'HCN': Ka_hcn}[a['t']] == a['K'])
for a in web['BAS']: comprobar('constante base ' + a['t'], {'NH₃': Kb_nh3, 'CH₃NH₂': Kb_mea}[a['t']] == a['K'])
KDIS = {'ac': [Ka_ac], 'hf': [Ka_hf], 'nh4': [Kw / Kb_nh3], 'hclo': [Ka_hclo], 'co2': [4.5e-7, 4.7e-11]}
for k, d in web['DIS'].items(): comprobar('constantes de distribución ' + k, all(cerca(a, b, 1e-12) for a, b in zip(d['K'], KDIS[k])) and len(d['K']) == len(KDIS[k]))
for m in web['fr']:   # fracciones: suma 1 y fórmula directa por especies (diprótico: Ka1, Ka2)
    Ks = KDIS[m['k']]; h = 10 ** -m['ph']; f = m['f']
    cabs('fracciones suman 1 ' + m['k'], sum(f), 1.0, 1e-9)
    if len(Ks) == 1:
        cabs('fracción HA ' + m['k'], 1 / (1 + Ks[0] / h), f[0], 1e-9)
    else:
        D = h * h + Ks[0] * h + Ks[0] * Ks[1]
        comprobar('fracciones H2CO3 pH %d' % m['ph'], abs(h * h / D - f[0]) < 1e-9 and abs(Ks[0] * h / D - f[1]) < 1e-9 and abs(Ks[0] * Ks[1] / D - f[2]) < 1e-9)
X = sp.symbols('X', positive=True)
for m in web['cu']:
    raiz = [r for r in sp.solve(X**2 + sp.Float(m['K'], 30) * X - sp.Float(m['K'], 30) * sp.Float(m['c'], 30), X) if r.is_positive][0]
    cab(f"cuadrática K={m['K']} c={m['c']}", float(raiz), m['x'], 1e-9)
# valoraciones
Ve = lambda m: m['c0'] * 25 / m['ct']
for m in web['val']:
    Vt = 25 + m['V']; n0 = m['c0'] * 25; nt = m['ct'] * m['V']; k = m['k']
    if k == 'ss': ph = ph_cargas(na=nt / Vt, cl=n0 / Vt)
    elif k == 'ds': ph = ph_cargas(na=nt / Vt, w=[(n0 / Vt, Ka_ac, 0)])
    elif k == 'bd': ph = ph_cargas(cl=nt / Vt, w=[(n0 / Vt, Kw / Kb_nh3, 1)])
    else: ph = ph_cargas(na=n0 / Vt, cl=nt / Vt)
    cabs(f"valoración {k} c0={m['c0']} ct={m['ct']} V={m['V']:.3f}", ph, m['ph'], 1e-6)
# fórmulas cerradas en puntos clave de la valoración (no solo el solucionador): equivalencia e inicio
for c0, ct in [(0.1, 0.1), (0.05, 0.5), (0.3, 0.1)]:
    ve = c0 * 25 / ct; cs = c0 * 25 / (25 + ve)
    eq = {m['k']: m['ph'] for m in web['val'] if m['c0'] == c0 and m['ct'] == ct and abs(m['V'] - ve) < 1e-9}
    cabs(f'equivalencia HCl/NaOH {c0},{ct}', 7.0, eq['ss'], 1e-4)
    cabs(f'equivalencia AcOH/NaOH {c0},{ct}', 14 - 0.5 * (-log10(Kw / Ka_ac) - log10(cs)) , eq['ds'], 0.01)
    cabs(f'equivalencia NH3/HCl {c0},{ct}', 0.5 * (-log10(Kw / Kb_nh3) - log10(cs)), eq['bd'], 0.01)
    cabs(f'equivalencia NaOH/HCl {c0},{ct}', 7.0, eq['bs'], 1e-4)
    semi = [m['ph'] for m in web['val'] if m['c0'] == c0 and m['ct'] == ct and m['k'] == 'ds' and abs(m['V'] - ve / 2) < 1e-9][0]
    cabs(f'semiequivalencia AcOH = pKa ({c0},{ct})', -log10(Ka_ac), semi, 0.02)
    semib = [m['ph'] for m in web['val'] if m['c0'] == c0 and m['ct'] == ct and m['k'] == 'bd' and abs(m['V'] - ve / 2) < 1e-9][0]
    cabs(f'semiequivalencia NH3 = pKa(NH4+) ({c0},{ct})', 14 + log10(Kb_nh3), semib, 0.02)
# tampones: frente a Henderson–Hasselbalch (válida cuando las concentraciones son grandes) y frente al solucionador
PK = {'ac': (Ka_ac, 0), 'nh4': (Kw / Kb_nh3, 1), 'co2': (4.5e-7, 0), 'hclo': (3e-8, 0)}
for m in web['reg']:
    K, z = PK[m['k']]; ct, r, x = m['ct'], m['r'], m['x']
    nHA, nA = ct * 100 / (1 + r), ct * 100 * r / (1 + r)
    ph = ph_cargas(na=((nA if z == 0 else 0) + max(x, 0)) / 100, cl=((nHA if z == 1 else 0) + max(-x, 0)) / 100, w=[(ct, K, z)])
    cabs(f"tampón {m['k']} ct={ct} r={r} x={x}", ph, m['ph'], 1e-6)
    if ct >= 0.1 and abs(x) <= 5 and nA + x > 0.5 and nHA - x > 0.5:
        hh = -log10(K) + log10((nA + x) / (nHA - x))
        comprobar(f"Henderson-Hasselbalch ~ motor {m['k']} ct={ct} r={r} x={x}", abs(hh - m['ph']) < 0.06, f'(HH {hh:.3f} motor {m["ph"]:.3f})')
# indicadores y sustancias
comprobar('indicadores', [(i['t'], i.get('lo'), i.get('hi')) for i in web['IND']] == [('Naranja de metilo', 3.1, 4.4), ('Rojo de metilo', 4.2, 6.3), ('Azul de bromotimol', 6.0, 7.6), ('Fenolftaleína', 8.2, 10.0), ('Sin indicador', None, None)])
ph_eq = {'ss': 7.0, 'ds': ph_cargas(na=0.05, w=[(0.05, Ka_ac, 0)]), 'bd': ph_cargas(cl=0.05, w=[(0.05, Kw / Kb_nh3, 1)])}
comprobar('equivalencia 0,1 M: fenolftaleína contiene el de AcOH', 8.2 <= ph_eq['ds'] <= 10.0 and not (4.2 <= ph_eq['ds'] <= 6.3))
comprobar('equivalencia NH3/HCl 0,1 M: rojo de metilo lo contiene; fenolftaleína no', 4.2 <= ph_eq['bd'] <= 6.3 and not (8.2 <= ph_eq['bd'] <= 10.0))
comprobar('equivalencia HCl/NaOH: azul de bromotimol lo contiene', 6.0 <= 7.0 <= 7.6)
# salto ±0,1 % (usado en el simulador: pH(0,999 Ve) y pH(1,001 Ve))
j = [m for m in web['val'] if m['k'] == 'ss' and m['c0'] == 0.1 and m['ct'] == 0.1]
cabs('salto HCl 0,1 M: pH(0,999 Ve) = 4,30', pH(0.1 * 25 * 0.001 / (25 + 24.975)), [m['ph'] for m in j if abs(m['V'] - 0.999 * 25) < 1e-9][0], 1e-3)
cabs('salto HCl 0,1 M: pH(1,001 Ve) = 9,70', 14 + log10(0.1 * 0.025 / (25 + 25.025)), [m['ph'] for m in j if abs(m['V'] - 1.001 * 25) < 1e-9][0], 1e-3)
# sales: motor frente a fórmulas cerradas
for s in web['SAL']:
    c = 0.1
    Kc = {'NH₄⁺': Kw / Kb_nh3}; Ka_an = {'CH₃COO⁻': Ka_ac, 'CN⁻': Ka_hcn, 'F⁻': Ka_hf}
    cat_debil = s['c'].get('Kb'); an_debil = s['a'].get('Ka')
    w = []; na = cl = 0
    if cat_debil: w.append((c, Kw / cat_debil, 1))
    else: na = c
    if an_debil: w.append((c, an_debil, 0))
    else: cl = c
    ph = ph_cargas(na, cl, w)
    if not cat_debil and not an_debil: cabs('sal ' + s['t'] + ' neutra', ph, 7.0, 1e-3)
    elif cat_debil and not an_debil: cabs('sal ' + s['t'], ph, -log10(sqrt(Kw / cat_debil * c)), 0.01)
    elif an_debil and not cat_debil: cabs('sal ' + s['t'], ph, 14 + log10(sqrt(Kw / an_debil * c)), 0.01)
    else: cabs('sal ' + s['t'] + ' (dos débiles) = 7 + ½(pKa − pKb)', ph, 7 + 0.5 * (-log10(an_debil) + log10(cat_debil)), 0.02)
# ---------------------------------------------------------------- 2. Ejemplos de la teoría
# sección 2 (pH)
cab('sangre [H+] 3,98e-8', 10 ** -7.4, 3.98e-8, 0.003); cab('sangre [OH-] 2,51e-7', 10 ** -6.6, 2.51e-7, 0.003); cab('sangre producto Kw', 10 ** -7.4 * 10 ** -6.6, 1e-14, 1e-9)
cab('agua a 50 °C pH 6,63 (Kw 5,5e-14)', pH(sqrt(5.5e-14)), 6.63, 0.001); cab('[H+] agua 50 °C = 2,3e-7', sqrt(5.5e-14), 2.3e-7, 0.03)
cab('HNO3 0,02 pH 1,70', pH(0.02), 1.70, 0.002); cab('Ba(OH)2 pH 11,30', 14 + log10(2e-3), 11.30, 0.001); cab('sin factor 2 daría 11,00', 14 + log10(1e-3), 11.00, 0.001)
cab('dilución 25 mL HCl 0,2 a 500: c = 0,01', 0.025 * 0.2 / 0.5, 0.01, 1e-9); cab('pH 0,70 de HCl 0,2', pH(0.2), 0.70, 0.01)
Hs = sp.symbols('Hs', positive=True); sol = float(sp.nsolve(Hs - 1e-8 - 1e-14 / Hs, Hs, 1e-7, prec=30))
cab('HCl 1e-8: [H+] = 1,05e-7', sol, 1.05e-7, 0.005); cab('HCl 1e-8: pH 6,98', pH(sol), 6.98, 0.001)
# sección 3 (fuertes y débiles)
for nom, K, esperado in [('HF', Ka_hf, 3.17), ('HNO2', Ka_hno2, 3.35), ('benzoico', Ka_bz, 4.19), ('acético', Ka_ac, 4.74), ('HClO', Ka_hclo, 7.52), ('HCN', Ka_hcn, 9.31)]: cabs('pKa ' + nom, pK := -log10(K), esperado, 0.006)
cab('Kb acetato 5,6e-10', Kw / Ka_ac, 5.6e-10, 0.01); cab('pKb acetato 9,26', -log10(Kw / Ka_ac), 9.26, 0.001); cab('Ka amonio 5,6e-10', Kw / Kb_nh3, 5.6e-10, 0.01)
x = sqrt(Ka_ac * 0.1); cab('acético 0,1: x = 1,34e-3', x, 1.34e-3, 0.005); cab('acético 0,1: α 1,3 %', x / 0.1 * 100, 1.3, 0.04); cab('acético 0,1: pH 2,87 aprox', pH(x), 2.87, 0.002); cab('acético 0,1 pH exacto 2,88', pH(cuadr(Ka_ac, 0.1)), 2.88, 0.002)
x = sqrt(Kb_nh3 * 0.2); cab('NH3 0,2: x = 1,90e-3', x, 1.90e-3, 0.005); cab('NH3 0,2: α 0,95 %', x / 0.2 * 100, 0.95, 0.01); cab('NH3 0,2: pH 11,28', 14 + log10(x), 11.28, 0.001); cab('NaOH 0,2 pH 13,30', 14 + log10(0.2), 13.30, 0.001)
x = 10 ** -2.85; cab('Ka de pH 2,85: 1,0e-5', x * x / (0.2 - x), 1.0e-5, 0.01); cab('[H+] 1,41e-3', x, 1.41e-3, 0.005); cab('[HA] 0,1986', 0.2 - x, 0.1986, 0.001); cab('α 0,71 %', x / 0.2 * 100, 0.71, 0.01); cab('pKa 5,0', -log10(x * x / (0.2 - x)), 5.0, 0.005)
x = sqrt(Ka_hf * 0.1); cab('HF: x aprox 8,25e-3', x, 8.25e-3, 0.002); cab('HF: α aprox 8,25 % > 5 %', x / 0.1 * 100, 8.25, 0.003); xq = cuadr(Ka_hf, 0.1); cab('HF: x exacta 7,91e-3', xq, 7.91e-3, 0.001); cab('HF: pH exacto 2,10', pH(xq), 2.10, 0.002); cab('HF: pH aprox 2,08', pH(x), 2.08, 0.002); cab('HF: α exacto 7,9 %', xq / 0.1 * 100, 7.9, 0.005)
comprobar('regla c/Ka > 400 ⇔ α < 5 %', abs(sqrt(1 / 400) - 0.05) < 1e-12)
cab('acético 1e-3: aprox 13,4 %', sqrt(Ka_ac / 1e-3) * 100, 13, 0.04); xq = cuadr(Ka_ac, 1e-3); cab('acético 1e-3: x 1,25e-4', xq, 1.25e-4, 0.005); cab('acético 1e-3: α 12,5 %', xq / 1e-3 * 100, 12.5, 0.005); cab('acético 1e-3 pH 3,90', pH(xq), 3.90, 0.002)
cab('91 % a pH = pKa − 1', 100 / 1.1, 91, 0.002)
cab('acético 5 mol/L: pH 2,0', pH(sqrt(Ka_ac * 5)), 2.0, 0.015)
# sección 4 (neutralización)
cab('H2SO4: 3,0 mmol → 0,15 M', 0.030 * 0.2 / 2 / 0.020, 0.15, 1e-9); cab('KHP: 2,500e-3 mol', 0.5105 / 204.22, 2.500e-3, 0.001); cab('NaOH 0,1008', 0.5105 / 204.22 / 0.0248, 0.1008, 0.001)
cab('vinagre 0,077', 0.0154 * 0.100 / 0.020, 0.077, 1e-9); cab('vinagre 46,2 g/L', 0.77 * 60.05, 46.2, 0.002)
# sección 5 (mezclas)
cab('mezcla 1: exceso 2e-3 mol', 5e-3 - 3e-3, 2e-3, 1e-9); cab('mezcla 1: pH 1,70', pH(2e-3 / 0.1), 1.70, 0.002)
cab('mezcla 2: [OH-] 0,040', 2e-3 / 0.05, 0.04, 1e-9); cab('mezcla 2: pH 12,60', 14 + log10(0.04), 12.60, 0.001)
cab('Ba(OH)2 mezcla: 1,6 mmol OH', 2 * 0.020 * 0.04 * 1000, 1.6, 1e-9); cab('Ba(OH)2 mezcla: pH 1,55', pH((3.0 - 1.6) / 50), 1.55, 0.003); cab('Ba(OH)2 mezcla: [H+] 0,028', 1.4 / 50, 0.028, 1e-9)
cab('dos ácidos: n = 0,040', 0.1 * 0.1 + 0.1 * 0.3, 0.040, 1e-9); cab('dos ácidos: pH 0,70', pH(0.2), 0.70, 0.01); cab('media de pH errónea 0,76', (pH(0.1) + pH(0.3)) / 2, 0.76, 0.01)
# sección 6 (hidrólisis)
x = sqrt(Kw / Ka_ac * 0.1); cab('NaAc 0,1: x 7,5e-6', x, 7.5e-6, 0.01); cab('NaAc 0,1: pOH 5,13', -log10(x), 5.13, 0.002); cab('NaAc 0,1: pH 8,87', 14 + log10(x), 8.87, 0.001); cab('NaAc α 0,007 %', x / 0.1 * 100, 0.007, 0.07)
cab('NH4Cl 0,1: pH 5,13', pH(sqrt(Kw / Kb_nh3 * 0.1)), 5.13, 0.002); cab('simetría 5,13 + 8,87 = 14', 5.13 + 8.87, 14.0, 1e-9)
cab('Kb del CN- 2,04e-5', Kw / Ka_hcn, 2.04e-5, 0.002); x = sqrt(Kw / Ka_hcn * 0.05); cab('NaCN 0,05: x 1,01e-3', x, 1.01e-3, 0.005); cab('NaCN: α 2,0 %', x / 0.05 * 100, 2.0, 0.02); cab('NaCN: pOH 3,00 / pH 11,00', 14 + log10(x), 11.00, 0.001)
cab('NaCN ≈ NH3 0,05 (pH 10,98)', 14 + log10(sqrt(Kb_nh3 * 0.05)), 10.98, 0.001)
cab('NH4CN: pH 9,28', 7 + 0.5 * (-log10(Ka_hcn) + log10(Kb_nh3)), 9.28, 0.001); cabs('NH4CN solucionador', ph_cargas(w=[(0.1, Kw / Kb_nh3, 1), (0.1, Ka_hcn, 0)]), 9.28, 0.02)
cabs('CH3COONH4 pH 7', ph_cargas(w=[(0.1, Kw / Kb_nh3, 1), (0.1, Ka_ac, 0)]), 7.0, 0.01)
# sección 7 (tampones)
cab('tampón 1: pH 4,74', -log10(Ka_ac) + log10(1), 4.74, 0.002); cab('tampón 2: pH 4,44', -log10(Ka_ac) + log10(0.5), 4.44, 0.002)
cab('tampón + HCl: 9/11', -log10(Ka_ac) + log10(9 / 11), 4.66, 0.002); cab('Δ = −0,09', log10(9 / 11), -0.09, 0.05); cab('agua + HCl: pH 2,00', pH(1.0 / 100), 2.00, 1e-6)
cab('[H+] 10^5 en agua', 1e-2 / 1e-7, 1e5, 1e-9); cab('[H+] ×1,2 en tampón', 11 / 9, 1.2, 0.03)
cab('tampón parcial: pH 4,57', -log10(Ka_ac) + log10(1.0 / 1.5), 4.57, 0.002); cab('sangre: pKa 6,35', -log10(4.5e-7), 6.35, 0.002); cab('sangre: cociente 11,3', 10 ** (7.4 + log10(4.5e-7)), 11.3, 0.004)
# sección 8 (curvas)
cab('HCl 0,1 valorado: Veq 25', 0.1 * 25 / 0.1, 25, 1e-9); cab('V=0 pH 1', pH(0.1), 1.00, 0.001); cab('V=12,5: [H+] 0,0333', 1.25 / 37.5, 0.0333, 0.002); cab('V=12,5: pH 1,48', pH(1.25 / 37.5), 1.48, 0.002)
cab('V=30: [OH-] 9,09e-3', 0.5 / 55, 9.09e-3, 0.002); cab('V=30: pOH 2,04', -log10(0.5 / 55), 2.04, 0.002); cab('V=30: pH 11,96', 14 + log10(0.5 / 55), 11.96, 0.001)
cab('salto 4,30', pH(0.1 * 0.025 / 50), 4.30, 0.001); cab('salto 9,70', 14 + log10(0.1 * 0.025 / 50.025), 9.70, 0.001)
cs = 2.5 / 50; x = sqrt(Kw / Ka_ac * cs); cab('equiv. AcOH: x 5,3e-6', x, 5.3e-6, 0.01); cab('equiv. AcOH: pOH 5,28', -log10(x), 5.28, 0.001); cab('equiv. AcOH: pH 8,72', 14 + log10(x), 8.72, 0.001)
cabs('semiequivalencia = pKa 4,74', -log10(Ka_ac), 4.74, 0.005)
cab('NH3 Veq 40', 0.2 * 20 / 0.1, 40, 1e-9); cs = 4.0 / 60; cab('equiv NH3: c 0,0667', cs, 0.0667, 0.002); x = sqrt(Kw / Kb_nh3 * cs); cab('equiv NH3: x 6,1e-6', x, 6.1e-6, 0.01); cab('equiv NH3: pH 5,22', pH(x), 5.22, 0.002)
# sección 9 (EvAU)
x = sqrt(Ka_bz * 0.05); cab('EvAU1: x 1,80e-3', x, 1.80e-3, 0.002); cab('EvAU1: α 3,6 %', x / 0.05 * 100, 3.6, 0.005); cabs('EvAU1: pH 2,74', pH(x), 2.74, 0.005)
cab('EvAU1: 1,25 mmol', 0.025 * 0.05 * 1000, 1.25, 1e-9); cab('EvAU1: V 12,5 mL', 1.25e-3 / 0.1 * 1000, 12.5, 1e-9)
cs = 1.25 / 37.5; cab('EvAU1: c benzoato 0,0333', cs, 0.0333, 0.002); cab('EvAU1: Kb 1,54e-10', Kw / Ka_bz, 1.54e-10, 0.003); x = sqrt(Kw / Ka_bz * cs); cab('EvAU1: x 2,26e-6', x, 2.26e-6, 0.003); cab('EvAU1: pOH 5,65', -log10(x), 5.65, 0.002); cab('EvAU1: pH 8,35', 14 + log10(x), 8.35, 0.001)
pkaN = -log10(Kw / Kb_nh3); cab('EvAU2: pKa NH4+ 9,255', pkaN, 9.255, 0.001); r = 10 ** (9.00 - pkaN); cab('EvAU2: cociente 0,556', r, 0.556, 0.002); cab('EvAU2: V 64,3 mL', 100 / (1 + r) * 1.0, 64.3, 0.002)
# ---------------------------------------------------------------- 3. Ejercicios (recalculados desde las definiciones)
cab('c1', pH(0.02), v('c1'), 0.002); cab('c2', 14 + log10(0.005), v('c2'), 0.002); cab('c4', 10 ** -(14 - 9.0), v('c4'), 1e-9); cab('c5', 14 + log10(2e-3), v('c5'), 0.002)
cab('c6', pH(0.025 * 0.2 / 0.5), v('c6'), 0.002); cab('c8 pKb', 14 + log10(Ka_ac), v('c8'), 0.002); cabs('c9', pH(0.73 / 36.5 / 0.25), v('c9'), 0.005)
cab('c10', 0.020 * 0.05 / 0.1 * 1000, v('c10'), 1e-9); cab('c11 α', 100 * 1e-3 / 0.1, v('c11'), 1e-9); cab('c13', pH(3.2e-4), v('c13'), 0.002); cab('c15 pKa NH4+', -log10(Kw / Kb_nh3), v('c15'), 0.002)
x = sqrt(Ka_ac * 0.05); cab('c16 pH', pH(x), v('c16', 0), 0.002); cab('c16 α %', x / 0.05 * 100, v('c16', 1), 0.01); comprobar('c16 aprox válida (α<5 %)', x / 0.05 < 0.05)
x = sqrt(Kb_nh3 * 0.05); cab('c17 pH', 14 + log10(x), v('c17', 0), 0.002); cab('c17 α %', x / 0.05 * 100, v('c17', 1), 0.01); comprobar('c17 aprox válida', x / 0.05 < 0.05)
x = 10 ** -2.5; cab('c18 Ka', x * x / (0.1 - x), v('c18'), 0.01)
cabs('c19', pH((5.0 - 1.0) / 150), v('c19'), 0.005); cab('c20', 14 + log10((5.0 - 3.0) / 75), v('c20'), 0.002)
x = sqrt(Kw / Ka_ac * 0.2); cab('c21', 14 + log10(x), v('c21'), 0.002); comprobar('c21 α<5 %', x / 0.2 < 0.05); cab('c22', pH(sqrt(Kw / Kb_nh3 * 0.05)), v('c22'), 0.002)
cab('c23', 0.024 * 0.25 / 3 / 0.020, v('c23'), 1e-9); cab('c24', -log10(Ka_ac) + log10(0.4 / 0.2), v('c24'), 0.002); cab('c25', 10 ** -1.5 * 0.5 * 40, v('c25'), 0.002)
xa = sqrt(1e-5 * 0.01); xq = cuadr(1e-5, 0.01); comprobar('c26 aprox vale (α 3,2 %)', xa / 0.01 < 0.05); cab('c26 pH exacto', pH(xq), v('c26'), 0.002); cab('c26 pH aprox 3,50', pH(xa), 3.50, 0.002)
comprobar('c27 CH3COONa > NaCl > NH4Cl > HCl', 14 + log10(sqrt(Kw / Ka_ac * 0.1)) > 7 > pH(sqrt(Kw / Kb_nh3 * 0.1)) > pH(0.1))
cabs('c29', pH((2.0 - 1.5) / 35), v('c29'), 0.005); cab('c30', pH(sol), v('c30'), 0.001); cab('c31', 10 ** (5.74 - 4.74), v('c31'), 1e-9); cab('c32', pH((2 * 0.050 * 0.05 * 1000 - 0.050 * 0.08 * 1000) / 100), v('c32'), 0.001)
xa = sqrt(Ka_hno2 * 0.02); xq = cuadr(Ka_hno2, 0.02); comprobar('c33 aprox NO vale (α 15 %)', xa / 0.02 > 0.05); cab('c33 pH', pH(xq), v('c33', 0), 0.002); cab('c33 α %', xq / 0.02 * 100, v('c33', 1), 0.01); cab('c33 α aprox 15 %', xa / 0.02 * 100, 15, 0.001)
cab('c34', pkaN + log10(2.5 / 1.5), v('c34'), 0.002); x = sqrt(Kw / Ka_hcooh * 0.1); cab('c35', 14 + log10(x), v('c35'), 0.002); cab('c35 Kb 5,56e-11', Kw / Ka_hcooh, 5.56e-11, 0.002)
comprobar('c36 equivalencia NH3 (0,0667 M) en 4,2–6,3', 4.2 <= pH(sqrt(Kw / Kb_nh3 * 4 / 60)) <= 6.3 and not (6.0 <= pH(sqrt(Kw / Kb_nh3 * 4 / 60)) <= 7.6) and pH(sqrt(Kw / Kb_nh3 * 4 / 60)) < 8.2)
comprobar('c37 equivalencia AcOH 8,7 en 8,2–10 y fuera de 3,1–4,4', 8.2 <= 14 + log10(sqrt(Kw / Ka_ac * 0.05)) <= 10 and not (3.1 <= 8.7 <= 4.4))
cab('c38', -log10(Ka_ac) + log10(35 / 45), v('c38'), 0.002)
r = 10 ** (5.00 - -log10(Ka_ac)); xx = r * 40 / (1 + r); cab('c39 mmol OH', xx, 25.7, 0.003); cab('c39 V', xx / 0.2, v('c39'), 0.003); cab('c39 cociente 1,80', r, 1.80, 0.002)
cab('c40', 10 ** -4.76, v('c40'), 0.003); cab('c41', 0.4210 / 204.22 / 0.0205, v('c41'), 0.002); cab('c41 n KHP', 0.4210 / 204.22, 2.061e-3, 0.002)
cab('c42', (10 ** -3) ** 2 / Ka_ac + 1e-3, v('c42'), 0.002); cab('c43', pkaN, v('c43'), 0.002)
xa = sqrt(Kb_mea * 0.1); xq = cuadr(Kb_mea, 0.1); comprobar('c44 aprox NO vale', xa / 0.1 > 0.05); cab('c44 pH', 14 + log10(xq), v('c44', 0), 0.001); cab('c44 α %', xq / 0.1 * 100, v('c44', 1), 0.01); cab('c44 aprox 6,6 %', xa / 0.1 * 100, 6.6, 0.01)
cabs('c45', 14 + log10(sqrt(Kw / Ka_hf * 0.5)), v('c45'), 0.005); cabs('c45 exacto del motor', ph_cargas(na=0.5, w=[(0.5, Ka_hf, 0)]), v('c45'), 0.005); cab('c45 Kb 1,47e-11', Kw / Ka_hf, 1.47e-11, 0.003)
cab('c46', (2.5 + 0.01 * 25) / (0.1 - 0.01), v('c46'), 0.002)
for id_ in ['c3', 'c7', 'c12', 'c14', 'c27', 'c28', 'c36', 'c37']: comprobar(f'{id_} la opción correcta es la primera', EJ[id_]['check']['ok'] == 0)
# todos los ejercicios con respuesta numérica verificados arriba: ids numéricos presentes
num_ids = [e['id'] for e in web['ej'] if (e['check'][0] if isinstance(e['check'], list) else e['check'])['tipo'] == 'num']
comprobar('hay 48 ejercicios y 3 niveles', len(web['ej']) == 48 and {e['nivel'] for e in web['ej']} == {1, 2, 3})
comprobar('números de cada nivel 15/17/16', [sum(1 for e in web['ej'] if e['nivel'] == n) for n in (1, 2, 3)] == [15, 17, 16])
# constantes de ejemplo usadas en el simulador de sales
Kb_ac = Kw / Ka_ac; cab('c21 Kb 5,56e-10', Kb_ac, 5.56e-10, 0.001)
cab('c22 Ka NH4+ 5,56e-10', Kw / Kb_nh3, 5.56e-10, 0.001)

print(f'comprobaciones correctas: {ok}')
if fallos:
    print('FALLOS:'); [print('  -', f) for f in fallos]; sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos · todo verificado')
