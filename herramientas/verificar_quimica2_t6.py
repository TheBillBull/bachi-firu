#!/usr/bin/env python3
"""
Verificación independiente de Química II, tema 6 (Equilibrio químico), parte nueva (secciones 8 a 16, 5 simuladores y 34 ejercicios).

 1. q6_alfa: α(n₀, V) de las tres reacciones frente a la solución simbólica de la ecuación de K_c (sympy), y α independiente de V si Δn = 0.
 2. q6_inerte: composición tras añadir un gas inerte a V y a P constantes, resuelta con presiones parciales y K_p
    (formulación distinta de la de la web, que usa concentraciones y K_c).
 3. q6_ks / q6_precip: s₀ = (K_s/(mᵐnⁿ))^(1/(m+n)), solubilidad con ion común (polinomio resuelto con sympy) y Q con dilución.
 4. Los 34 ejercicios nuevos (k1–k34): cada valor de comprobación recalculado desde el enunciado con sympy/numpy.
 5. Cada cifra de los ejemplos resueltos de las secciones 8 a 14, recalculada y localizada en el texto.

Uso:  sh build.sh && python3 herramientas/verificar_quimica2_t6.py      (necesita: pip install sympy numpy scipy)
"""
import json, os, re, subprocess, sys, math
import numpy as np
import sympy as sp
from scipy.optimize import brentq

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
ok, fallos = 0, []
def comprobar(nombre, cond, det=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {det}')
def cerca(a, b, tol=0.006): return abs(a - b) <= tol * max(abs(b), 1e-300)
R_J = 8.314
RT = lambda T: 0.082 * T

# ---------------------------------------------------------------- volcado de la web
JS = r"""
const fs = require('fs'), vm = require('vm'), noop = () => {};
const el = () => ({ setAttribute: noop, appendChild: noop, style: {}, classList: { add: noop, remove: noop } });
const sb = { console, document: { addEventListener: noop, createElementNS: el, createElement: el, getElementById: () => null, head: el(), body: el() },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sb.window = sb; vm.createContext(sb);
vm.runInContext(fs.readFileSync(process.argv[1] + '/ampliaciones/bachi.js', 'utf8'), sb);
const B = sb.BACHI, Q = B.lab.q6;
const clean = o => JSON.parse(JSON.stringify(o, (k, x) => typeof x === 'function' ? undefined : x));
const alfas = [];
Object.keys(Q.DISO).forEach(r => [0.2, 0.5, 1, 2].forEach(n0 => [1, 2.5, 10, 20].forEach(V => alfas.push({ r, n0, V, a: Q.alfa(Q.DISO[r], n0, V) }))));
const iner = [];
Object.keys(Q.INER).forEach(r => ['V', 'P'].forEach(c => [0, 0.5, 3, 6].forEach(he => iner.push({ r, c, he, s: Q.inerte(Q.INER[r], c, he) }))));
const sales = [];
Object.keys(Q.SAL).forEach(k => { const S = Q.SAL[k]; sales.push({ k, S, s0: Q.sol0(S), con: [1e-5, 1e-3, 0.1, 1].map(c => ({ c, cat: Q.solIon(S, c, 'cat'), an: Q.solIon(S, c, 'an') })) }); });
console.log(JSON.stringify({ DISO: clean(Q.DISO), INER: clean(Q.INER), alfas, iner, sales, secs: clean(B.ampl.quimica2.t6.nuevas), ej: clean(B.ampl.quimica2.t6.ejercicios), res: clean(B.ampl.quimica2.t6.resumen), lam: clean(B.ampl.quimica2.t6.lamina), datos: clean(B.ampl.quimica2.t6.datos) }));
"""
web = json.loads(subprocess.check_output(['node', '-e', JS, os.path.abspath(RAIZ)]))
EJ = {e['id']: e for e in web['ej']}
TXT = ' '.join(s['html'] for s in web['secs'])
TXT = re.sub(r'<[^>]+>', '', TXT)
def en_texto(nombre, *cadenas):
    for c in cadenas: comprobar(f'texto «{c}» ({nombre})', c in TXT)

# ---------------------------------------------------------------- estructura
niv = lambda n: sum(1 for k, e in EJ.items() if e['nivel'] == n and re.fullmatch(r'k\d+', k))
comprobar('34 ejercicios nuevos k1–k34 (10 ★ + 14 ★★ + 10 ★★★)', sum(1 for k in EJ if re.fullmatch(r'k\d+', k)) == 34 and niv(1) == 10 and niv(2) == 14 and niv(3) == 10)
comprobar('44 ejercicios en total', len(EJ) == 44)
comprobar('secciones nuevas 5 a 16 en orden', [s['h'].split('.')[0] for s in web['secs']] == [str(i) for i in range(5, 17)], str([s['h'][:6] for s in web['secs']]))
comprobar('resumen de 9 puntos', len(web['res']) == 9)
comprobar('láminas: 5 de la parte A + 4 nuevas', len(web['lam']) == 9, len(web['lam']))
for k in ('tarjetas1', 'errores2', 'quiz2', 'emp2', 'clas1', 'orden1'): comprobar('dato ' + k, k in web['datos'])
for k, d in web['datos'].items():
    for q in d.get('preguntas', []):
        comprobar(f'{k}: respuesta correcta dentro del rango', 0 <= q['ok'] < len(q['op']))

# ---------------------------------------------------------------- 1. q6_alfa frente a sympy
x = sp.symbols('x', positive=True)
def alfa_sym(r, n0, V):
    n0, V = sp.Float(n0), sp.Float(V)
    D = web['DISO'][r]; K = sp.Float(D['Kc'])
    a = D['a']
    # moles en el equilibrio: reactivo n0 − a·x; producto i: nu·x
    n = [(n0 - a * x if e['nu'] < 0 else e['nu'] * x) for e in D['esp']]
    Q = sp.Mul(*[(ni / V) ** abs(e['nu']) if e['nu'] > 0 else (ni / V) ** (-abs(e['nu'])) for ni, e in zip(n, D['esp'])])
    sol = [s for s in sp.Poly(sp.together(Q - K).as_numer_denom()[0], x).nroots(n=30) if abs(sp.im(s)) < 1e-12 and 0 < sp.re(s) < float(n0) / a]
    return float(a * sp.re(sol[0]) / n0)
for c in web['alfas']:
    comprobar(f"alfa {c['r']} n0={c['n0']} V={c['V']}", cerca(c['a']['alfa'], alfa_sym(c['r'], c['n0'], c['V']), 1e-6), f"{c['a']['alfa']} vs {alfa_sym(c['r'], c['n0'], c['V'])}")
for n0 in (0.2, 1, 2):
    v = [c['a']['alfa'] for c in web['alfas'] if c['r'] == 'hi' and c['n0'] == n0]
    comprobar(f'alfa HI independiente de V (n0={n0})', max(v) - min(v) < 1e-9)
    v = [c['a']['alfa'] for c in web['alfas'] if c['r'] == 'pcl5' and c['n0'] == n0]
    comprobar(f'alfa PCl5 crece con V (n0={n0})', all(b > a for a, b in zip(v, v[1:])))
# fórmulas de la tabla de la sección 9
for al, P in ((0.5, 1.0), (0.2, 1.0), (0.3, 3.0)):
    n = {'PCl5': 1 - al, 'PCl3': al, 'Cl2': al}; nt = sum(n.values())
    kp = (n['PCl3'] / nt * P) * (n['Cl2'] / nt * P) / (n['PCl5'] / nt * P)
    comprobar(f'Kp = α²P/(1−α²) para A⇌B+C (α={al}, P={P})', cerca(kp, al**2 * P / (1 - al**2), 1e-12))
    n = {'N2O4': 1 - al, 'NO2': 2 * al}; nt = sum(n.values())
    kp = (n['NO2'] / nt * P) ** 2 / (n['N2O4'] / nt * P)
    comprobar(f'Kp = 4α²P/(1−α²) para A⇌2B (α={al}, P={P})', cerca(kp, 4 * al**2 * P / (1 - al**2), 1e-12))
for n0, V, al in ((1, 10, 0.4), (2, 5, 0.25)):
    comprobar('Kc = n0·α²/(V(1−α)) para A⇌B+C', cerca((n0 * al / V) ** 2 / (n0 * (1 - al) / V), n0 * al**2 / (V * (1 - al)), 1e-12))
    comprobar('Kc = 4n0·α²/(V(1−α)) para A⇌2B', cerca((2 * n0 * al / V) ** 2 / (n0 * (1 - al) / V), 4 * n0 * al**2 / (V * (1 - al)), 1e-12))

# ---------------------------------------------------------------- 2. q6_inerte con presiones parciales y K_p
Rg, T = 0.082, 500.0
def eq_kp(esp, Kc, n, P, ninerte):
    """Equilibrio a presión total P y temperatura T con moles n (+ inerte): se resuelve con K_p y fracciones molares."""
    dn = sum(e['nu'] for e in esp)
    Kp = Kc * (Rg * T) ** dn
    def f(xi):
        m = [ni + e['nu'] * xi for ni, e in zip(n, esp)]
        nt = sum(m) + ninerte
        return sum(e['nu'] * math.log(mi / nt * P) for mi, e in zip(m, esp)) - math.log(Kp)
    lo = max(-ni / e['nu'] for ni, e in zip(n, esp) if e['nu'] > 0) + 1e-12
    hi = min(-ni / e['nu'] for ni, e in zip(n, esp) if e['nu'] < 0) - 1e-12
    xi = brentq(f, lo, hi, xtol=1e-14)
    return [ni + e['nu'] * xi for ni, e in zip(n, esp)], Kp
for c in web['iner']:
    D = web['INER'][c['r']]; esp = D['esp']
    n1, Kp = eq_kp(esp, D['Kc'], D['ini'], 1.0, 0)            # P arbitraria solo para obtener n1: la composición depende de V0
    # estado 1: se fija V0 con la ley de los gases: P1 = n_t·R·T/V0
    nt0 = None
    def resuelve_V0():
        # busca la composición de equilibrio a V0 con presiones: P1 desconocida; se itera sobre P1 hasta que V = V0
        def g(logP):
            P = math.exp(logP); m, _ = eq_kp(esp, D['Kc'], D['ini'], P, 0)
            return sum(m) * Rg * T / P - D['V0']
        lp = brentq(g, math.log(1e-4), math.log(1e4)); P = math.exp(lp)
        m, _ = eq_kp(esp, D['Kc'], D['ini'], P, 0)
        return m, P
    m1, P1 = resuelve_V0()
    comprobar(f"inerte {c['r']} {c['c']} He={c['he']}: estado inicial", all(cerca(a, b, 1e-6) for a, b in zip(m1, c['s']['n1'])), f"{m1} vs {c['s']['n1']}")
    if c['c'] == 'V':
        m2 = m1
        comprobar(f"inerte {c['r']} V const.: no cambia", all(cerca(a, b, 1e-6) for a, b in zip(m2, c['s']['n2'])) and cerca(c['s']['qk'], 1, 1e-9))
    else:
        # P constante = P1; con inerte el volumen es (n_t + He)·R·T/P1
        m2, _ = eq_kp(esp, D['Kc'], m1, P1, c['he'])
        V2 = (sum(m1) + c['he']) * Rg * T / P1
        comprobar(f"inerte {c['r']} P const. He={c['he']}: composición", all(cerca(a, b, 1e-5) for a, b in zip(m2, c['s']['n2'])), f"{m2} vs {c['s']['n2']}")
        comprobar(f"inerte {c['r']} P const. He={c['he']}: V justo al añadir He", cerca(V2, c['s']['V2'], 1e-6), f"{V2} vs {c['s']['V2']}")
        Vf = (sum(m2) + c['he']) * Rg * T / P1          # P constante: V final = n_total·RT/P
        comprobar(f"inerte {c['r']} P const. He={c['he']}: V final", cerca(Vf, c['s']['Vf'], 1e-5), f"{Vf} vs {c['s']['Vf']}")
        nt = sum(m1) + c['he']
        qk = math.exp(sum(e['nu'] * math.log(mi / nt * P1) for mi, e in zip(m1, esp)) - math.log(Kp * 1.0)) if False else None
        Kp1 = D['Kc'] * (Rg * T) ** sum(e['nu'] for e in esp)
        qk = math.exp(sum(e['nu'] * math.log(mi / nt * P1) for mi, e in zip(m1, esp))) / Kp1
        comprobar(f"inerte {c['r']} P const. He={c['he']}: Q/K tras añadir", cerca(qk, c['s']['qk'], 1e-5), f"{qk} vs {c['s']['qk']}")
        dn = sum(e['nu'] for e in esp)
        if c['he'] > 0 and dn != 0:
            comprobar(f"inerte {c['r']}: sentido de Le Chatelier (Δn={dn})", (qk < 1) == (dn > 0), f'{qk}')
        if dn == 0:
            comprobar('inerte con Δn = 0: sin desplazamiento', all(cerca(a, b, 1e-6) for a, b in zip(m1, m2)))

# ---------------------------------------------------------------- 3. sales poco solubles
s_ = sp.symbols('s', positive=True)
for e in web['sales']:
    S = e['S']; m, n, Ks = S['m'], S['n'], sp.Float(S['Ks'])
    s0 = [r for r in sp.solve(sp.Eq((m * s_) ** m * (n * s_) ** n, Ks), s_) if r.is_real and r > 0][0]
    comprobar(f"sol0 {e['k']}", cerca(e['s0'], float(s0), 1e-9), f"{e['s0']} vs {s0}")
    for c in e['con']:
        for ion, a in (('cat', (m * s_ + c['c']) ** m * (n * s_) ** n), ('an', (m * s_) ** m * (n * s_ + c['c']) ** n)):
            pol = sp.Poly(sp.expand(a - Ks), s_)
            raices = [float(sp.re(r)) for r in pol.nroots(n=40, maxsteps=500) if abs(sp.im(r)) < 1e-20 and sp.re(r) > 0]
            comprobar(f"solIon {e['k']} {ion} c={c['c']}", len(raices) >= 1 and cerca(c[ion], raices[0], 1e-6), f"{c[ion]} vs {raices}")

# ---------------------------------------------------------------- 4. ejercicios k1–k34
def v(id_, k=0):
    ch = EJ[id_]['check']; ch = ch if isinstance(ch, list) else [ch]
    return ch[k]['valor']
def lista(id_): ch = EJ[id_]['check']; return [c for c in (ch if isinstance(ch, list) else [ch])]
def t(id_, k, esperado, tol=None):
    c = lista(id_)[k]
    comprobar(f'{id_}[{k}] valor del ejercicio = {esperado:.6g}', cerca(c['valor'], esperado, tol or max(c.get('tol', 0.005), 0.0015)), f"web={c['valor']}")
sol_ = lambda eq, var, lo, hi: [float(r) for r in sp.solve(eq, var) if r.is_real and lo < r < hi][0]

t('k1', 0, 0.30**2 / (0.50 * 1.5**3))
t('k2', 0, 280 / RT(1000))
comprobar('k3: opción correcta = H₂ + Cl₂ (única con Δn = 0)', lista('k3')[0]['ok'] == 2 and lista('k3')[0]['opciones'][2].startswith('H₂ + Cl₂'))
t('k4', 0, 2.0**2 / (0.5 * 0.5)); comprobar('k4: 16 < 54 → derecha', 16 < 54 and lista('k4')[1]['ok'] == 0)
t('k5', 0, 0.40**2 / 0.10)
comprobar('k6: catalizador no cambia K', 'no cambia K' in lista('k6')[0]['opciones'][lista('k6')[0]['ok']])
t('k7', 0, math.sqrt(5.0e-13)); t('k8', 0, 1.05e-5**2)
t('k9', 0, (0.60 / 2) / 2.0)
comprobar('k10: calentar una exotérmica favorece la inversa (más NO₂, más pardo)', lista('k10')[0]['ok'] == 0)
t('k11', 0, (0.20 / 2) * (0.20 / 2) / (0.60 / 2))
t('k12', 0, 0.0267 * RT(500))
xx = sp.symbols('xx'); xv = sol_(xx**2 - 4 * (2 - xx) * (1 - xx), xx, 0, 1)
t('k13', 0, xv); t('k13', 1, 100 * xv / 1.0)
n_tot = 1.40; pn = 2.0 * 0.80 / n_tot; pd = 2.0 * 0.60 / n_tot
t('k14', 0, pn**2 / pd)
xh = sol_(xx**2 - (1 / sp.Integer(54)) * (1 - 2 * xx)**2, xx, 0, 0.5)
t('k15', 0, xh); t('k15', 1, 1 - 2 * xh)
t('k16', 0, 0.5 * 0.5)
t('k17', 0, 0.50 * 5.0 / (0.082 * 1200) * 100.09)
t('k18', 0, 0.50 * math.exp(-(-92.2e3 / R_J) * (1 / 500 - 1 / 400)), 0.02)
t('k19', 0, (5.5e-6 / 4) ** (1 / 3))
t('k20', 0, 4 * (0.0160 / 78.07) ** 3, 0.02)
t('k21', 0, 1.1e-10 / 0.020)
c1, c2 = 2.0e-3 * 100 / 200, 2.0e-5 * 100 / 200
t('k22', 0, c1 * c2); comprobar('k22: Q > Ks → precipita', c1 * c2 > 1.8e-10 and lista('k22')[1]['ok'] == 0)
s23 = (1.8e-11 / 4) ** (1 / 3); t('k23', 0, 14 + math.log10(2 * s23), 0.005)
comprobar('k25: Q y sentido', cerca(v('k25', 0), (0.20 / 2.0) ** 2 / ((1.0 / 2.0) * (3.0 / 2.0) ** 3), 0.01) and 0.20 / 2.0 > 0 and lista('k25')[1]['ok'] == 0 and (0.1 ** 2 / (0.5 * 1.5 ** 3)) < 0.080)
# k24
al = 0.20; Kp24 = (2 * al / (1 + al)) ** 2 / ((1 - al) / (1 + al))
a4 = sol_(4 * xx**2 * 4.0 / (1 - xx**2) - Kp24, xx, 0, 1)
t('k24', 0, Kp24); t('k24', 1, a4)
# k26
Kc26 = (0.4 / 10) ** 2 / (0.6 / 10); a26 = sol_(xx**2 / (20 * (1 - xx)) - Kc26, xx, 0, 1)
t('k26', 0, a26)
# k27
Kc27 = (0.60 / 5) ** 2 * (0.30 / 5) / (1.40 / 5) ** 2
t('k27', 0, Kc27); t('k27', 1, Kc27 * RT(1000)); t('k27', 2, 0.60 / 2.0)
# k28
x28 = sol_((1 + xx)**2 - 4 * (1 - xx)**2, xx, 0, 1)
t('k28', 0, 1 - x28); t('k28', 1, 1 + x28)
# k29
Ag_br = 5.0e-13 / 0.010; Ag_cl = 1.8e-10 / 0.010
t('k29', 0, Ag_br); t('k29', 1, 5.0e-13 / Ag_cl)
comprobar('k29: precipita primero el AgBr', Ag_br < Ag_cl)
# k30
t('k30', 0, 14 + math.log10(math.sqrt(3.0e-17 / 0.010)), 0.005)
# k31 con la ecuación completa
s31 = sol_(s_ * (2 * s_ + 0.10)**2 - sp.Float(7.1e-9), s_, 0, 1e-3)
t('k31', 0, s31, 0.01)
# k32
nh3, n2, h2, ntt = 1 - al, al / 2, 3 * al / 2, 1 + al
pp = lambda ni: 2.0 * ni / ntt
t('k32', 0, pp(n2) * pp(h2)**3 / pp(nh3)**2)
# k33
t('k33', 0, -R_J * math.log(0.142 / 4.6e-3) / (1 / 350 - 1 / 298) / 1000, 0.015)
comprobar('k34: P constante + inerte → se descompone algo de NH₃', lista('k34')[0]['ok'] == 1)

# ---------------------------------------------------------------- 5. ejemplos resueltos de la teoría (secciones 8 a 14)
# 8.1
Kp = 1.0**2 / (2.0 * 3.0**3); en_texto('8.1', '0,0185', '31,1', '1681')
comprobar('8.1 Kp = 1/54', cerca(Kp, 1 / 54, 1e-12)); comprobar('8.1 Kc = Kp·(RT)² = 31,1', cerca(Kp * RT(500)**2, 31.13, 0.002))
# 8.2
pn, pd = 3.0 * 4 / 6, 3.0 * 2 / 6; Kp2 = pn**2 / pd; en_texto('8.2', '4,0', '0,122')
comprobar('8.2 Kp = 4,0 y Kc = 0,122', cerca(Kp2, 4.0, 1e-12) and cerca(Kp2 / RT(400), 0.122, 0.002) and cerca(pn + pd, 3.0, 1e-12))
# 9.1
c = 0.10; x91 = c * math.sqrt(0.63) / (1 + math.sqrt(0.63)); en_texto('9.1', '0,0443', '0,0557', '44,3')
comprobar('9.1 x, [CO₂] y % convertido', cerca(x91, 0.0443, 0.002) and cerca(c - x91, 0.0557, 0.002) and cerca(100 * x91 / c, 44.3, 0.002))
comprobar('9.1 Kc con esos valores', cerca(x91**2 / (c - x91)**2, 0.63, 1e-9))
# 9.2
Kp92 = 0.5**2 / (1 - 0.5**2); a92 = sol_(xx**2 / (1 - xx**2) - sp.Rational(1, 3) / 4, xx, 0, 1)
en_texto('9.2', '0,333', '8,13·10⁻³', '0,277')
comprobar('9.2 Kp = 1/3, Kc = 8,13·10⁻³, α(4 atm) = 0,277', cerca(Kp92, 1 / 3, 1e-12) and cerca(Kp92 / RT(500), 8.13e-3, 0.002) and cerca(a92, 0.277, 0.003))
# 10.1
qs = [1 * 1 / (1 * 1), 3 * 3 / (0.5 * 0.5), 4 * 2 / (1 * 2)]
comprobar('10.1 Q = 1, 36, 4 con K = 4', qs == [1, 36, 4] and qs[0] < 4 and qs[1] > 4 and qs[2] == 4)
# 10.2: H₂ + I₂ ⇌ 2HI, K = 54, 1 L
xe = math.sqrt(54) / (2 + math.sqrt(54)); h0, hi0 = 1 - xe, 2 * xe
en_texto('10.2', '0,214', '1,572', '9,5', '0,152', '1,062', '0,062', '1,877', '50x² − 83,4x + 11,56 = 0')
comprobar('10.2 equilibrio inicial', cerca(h0, 0.214, 0.003) and cerca(hi0, 1.572, 0.002))
comprobar('10.2 Q = 9,5', cerca(hi0**2 / ((h0 + 1) * h0), 9.5, 0.006))
raices = sp.Poly(sp.expand((hi0 + 2 * xx)**2 - 54 * (h0 + 1 - xx) * (h0 - xx)), xx).nroots()
a_, b_, c_ = [float(co) for co in sp.Poly(sp.expand(54 * (1.214 - xx) * (0.214 - xx) - (1.572 + 2 * xx)**2), xx).all_coeffs()]   # con los valores redondeados del texto
comprobar('10.2 polinomio 50x² − 83,4x + 11,56', cerca(a_, 50, 1e-9) and cerca(b_, -83.4, 0.002) and cerca(c_, 11.56, 0.002), f'{a_},{b_},{c_}')
y = [float(r) for r in raices if sp.im(r) == 0 and 0 < r < h0][0]
comprobar('10.2 x = 0,152 y composición final', cerca(y, 0.152, 0.005) and cerca(h0 + 1 - y, 1.062, 0.002) and cerca(h0 - y, 0.062, 0.02) and cerca(hi0 + 2 * y, 1.877, 0.002))
comprobar('10.2 comprobación K ≈ 54', cerca((hi0 + 2 * y)**2 / ((h0 + 1 - y) * (h0 - y)), 54, 1e-9))
# 11: van't Hoff N₂O₄
lnr = -(57200 / R_J) * (1 / 320 - 1 / 298); K320 = 4.6e-3 * math.exp(lnr)
en_texto('11.1', '6880', '1,587', '4,89', '2,25·10⁻²')
comprobar('11.1 ΔH/R = 6880, ln = 1,587, K₂/K₁ = 4,89, K₂ = 2,25·10⁻²', cerca(57200 / R_J, 6880, 0.001) and cerca(lnr, 1.587, 0.002) and cerca(math.exp(lnr), 4.89, 0.002) and cerca(K320, 2.25e-2, 0.003))
# 11 (compresión de N₂O₄: Q = 2K)
Kc = 4.6e-3; xe = (-Kc + math.sqrt(Kc**2 + 16 * Kc * 0.1)) / 8; a1, b1 = 0.1 - xe, 2 * xe
comprobar('11 comprimir a la mitad N₂O₄ ⇌ 2 NO₂ (Δn = +1): Q = 2K', cerca((2 * b1)**2 / (2 * a1), 2 * Kc, 1e-9))
# 12.1 / 12.2
en_texto('12.1', '0,33', '0,109'); comprobar('12.1 Kp = 0,33² = 0,109', cerca(0.33 * 0.33, 0.109, 0.003))
en_texto('12.2', '2,50·10⁻³', '0,0250', '2,50 g', '88,0')
n12 = 0.22 * 10 / (0.082 * 1073)
comprobar('12.2 Kc, n(CO₂) y masa de CaCO₃', cerca(0.22 / RT(1073), 2.50e-3, 0.002) and cerca(n12, 0.0250, 0.002) and cerca(n12 * 100.1, 2.50, 0.003) and cerca(RT(1073), 88.0, 0.001))
# 13
s_agcl = math.sqrt(1.8e-10); s_pbi2 = (7.1e-9 / 4) ** (1 / 3)
en_texto('13.1', '1,34·10⁻⁵', '1,92·10⁻³', '1,21·10⁻³', '0,558')
comprobar('13.1 AgCl y PbI₂', cerca(s_agcl, 1.34e-5, 0.003) and cerca(s_agcl * 143.3, 1.92e-3, 0.003) and cerca(s_pbi2, 1.21e-3, 0.003) and cerca(s_pbi2 * 461.0, 0.558, 0.003) and cerca(7.1e-9 / 4, 1.775e-9, 1e-3))
s132 = 0.0216 / 331.7; en_texto('13.2', '6,51·10⁻⁵', '1,10·10⁻¹²')
comprobar('13.2 Ag₂CrO₄', cerca(s132, 6.51e-5, 0.003) and cerca(4 * s132**3, 1.10e-12, 0.01))
comprobar('13 trampa: Ks(Ag₂CrO₄) ≈ 160 veces menor pero s casi 5 veces mayor', cerca(1.8e-10 / 1.1e-12, 164, 0.03) and 4.5 < s132 / s_agcl < 5.0)
# 14
s141 = 1.8e-10 / 0.10; en_texto('14.1', '1,8·10⁻⁹', '7,5·10³')
comprobar('14.1 s = 1,8·10⁻⁹ y factor 7,5·10³', cerca(s141, 1.8e-9, 1e-9) and cerca(s_agcl / s141, 7.5e3, 0.01) and s141 < 0.1 * 0.05)
Q142 = (1.0e-3 / 2) * (1.0e-4 / 2); en_texto('14.2', '2,5·10⁻⁸', '5,0·10⁻⁴', '5,0·10⁻⁵')
comprobar('14.2 Q = 2,5·10⁻⁸ y ≈ 140 veces Ks', cerca(Q142, 2.5e-8, 1e-9) and cerca(Q142 / 1.8e-10, 139, 0.01))
Q143 = 5.0e-3 * (5.0e-3) ** 2; en_texto('14.3', '1,25·10⁻⁷'); comprobar('14.3 Q = 1,25·10⁻⁷ > 7,1·10⁻⁹', cerca(Q143, 1.25e-7, 1e-9) and Q143 > 7.1e-9)
a_cl, a_cro = 1.8e-10 / 0.010, math.sqrt(1.1e-12 / 0.010); cl_f = 1.8e-10 / a_cro
en_texto('14.4', '1,8·10⁻⁸', '1,05·10⁻⁵', '1,7·10⁻⁵', '0,17 %', '99,8 %')
comprobar('14.4 precipitación fraccionada', cerca(a_cl, 1.8e-8, 1e-9) and cerca(a_cro, 1.05e-5, 0.005) and cerca(cl_f, 1.7e-5, 0.01) and cerca(100 * cl_f / 0.010, 0.17, 0.02) and cerca(100 - 100 * cl_f / 0.010, 99.8, 0.001) and a_cl < a_cro)
oh = math.sqrt(1.8e-11 / 0.010); en_texto('14.5', '4,24·10⁻⁵', '9,63')
comprobar('14.5 pH de precipitación del Mg(OH)₂ = 9,63', cerca(oh, 4.24e-5, 0.002) and cerca(14 + math.log10(oh), 9.63, 0.001))

print(f'{ok} comprobaciones correctas, {len(fallos)} fallos' if fallos else f'{ok} comprobaciones correctas, 0 fallos')
if fallos:
    print('FALLOS:'); [print('  -', f) for f in fallos]; sys.exit(1)
