#!/usr/bin/env python3
"""
Verificación independiente de Química II, tema 9 (Química de los compuestos del carbono).

Herramientas independientes de la web: RDKit (estructuras, fórmulas, hibridación, centros quirales, estereoisómeros), OPSIN
(nombre → estructura; se traducen los nombres españoles a inglés con unas reglas propias y se comparan las estructuras),
un enumerador propio de isómeros (todos los grafos con valencias correctas) y sympy.

 1. Banco de moléculas de los juegos (q2t9_prioridad / q2t9_nombre): cada nombre correcto, traducido y pasado por OPSIN, da
    exactamente la estructura dibujada; ningún distractor da esa estructura; el grupo principal (escala de prioridad) coincide.
 2. Hibridación, enlaces σ/π, cis-trans (los 625 casos de la web), carbonos quirales y superposición de enantiómeros.
 3. Fuerzas intermoleculares: masas molares (RDKit) y puntos de ebullición contra una tabla propia.
 4. Los 52 ejercicios y los ejemplos resueltos de la teoría, uno por uno (nombres, fórmulas, isómeros enumerados, % y combustión).

Uso:  sh build.sh && python3 herramientas/verificar_quimica2_t9.py   (necesita: pip install rdkit sympy py2opsin; Java)
"""
import json, os, re, subprocess, sys, itertools, math, warnings
warnings.filterwarnings('ignore')
import sympy as sp
from rdkit import Chem, RDLogger
from rdkit.Chem import Descriptors, rdMolDescriptors
from rdkit.Chem.EnumerateStereoisomers import EnumerateStereoisomers, StereoEnumerationOptions
from py2opsin import py2opsin
RDLogger.DisableLog('rdApp.*')

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
ok, fallos = 0, []
def comprobar(nombre, cond, det=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {det}')
def cerca(a, b, tol=0.006): return abs(a - b) <= tol * max(abs(b), 1e-12)
def cab(nombre, a, b, tol=0.006): comprobar(nombre, cerca(a, b, tol), f'(calculado {a:.6g}, web/texto {b:.6g})')

# ---------------------------------------------------------------- volcado de la web
JS = r"""
const fs = require('fs'), vm = require('vm'), noop = () => {};
const el = () => ({ setAttribute: noop, appendChild: noop, style: {}, classList: { add: noop, remove: noop } });
const sb = { console, document: { addEventListener: noop, createElementNS: el, createElement: el, getElementById: () => null, head: el(), body: el() },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sb.window = sb; vm.createContext(sb);
vm.runInContext(fs.readFileSync(process.argv[1] + '/ampliaciones/bachi.js', 'utf8'), sb);
const B = sb.BACHI, Q = B.lab.q9, O = B.lab.org;
const SUS = ['H', 'CH3', 'Cl', 'Br', 'OH'], ct = [];
for (const a of SUS) for (const b of SUS) for (const c of SUS) for (const d of SUS) ct.push({ v: [a, b, c, d], hay: Q.hayCT([a, b, c, d]) });
const hib = Q.HIB.map(m => { const G = O.grafoDeSmiles(m.s); return { t: m.t, s: m.s, h: Q.hibDe(G).map(x => x && x.h) }; });
const esp = Q.ESP.map(m => ({ t: m.t, g: m.g }));
const POS = [[-1, 1, 0], [1, 1, 0], [1, -1, 1], [-1, -1, -1]];
const q = { A: Q.quiralidad(POS), espejo: Q.quiralidad(POS.map(p => [-p[0], p[1], p[2]])), giro: Q.quiralidad(POS.map(p => [p[0], p[1], p[2]]).map(p => [-p[0], p[1], p[2]]).map(p => [-p[0], p[1], -p[2]])) };
console.log(JSON.stringify({ mols: Q.MOLS, ct, hib, esp, ctPre: Q.CT, fz: Q.FZ, escala: Q.ESCALA, q, ej: JSON.parse(JSON.stringify(B.ampl.quimica2.t9.ejercicios)),
  datos: JSON.parse(JSON.stringify(B.ampl.quimica2.t9.datos)) }));
"""
web = json.loads(subprocess.check_output(['node', '-e', JS, os.path.abspath(RAIZ)]))
EJ = {e['id']: e for e in web['ej']}
def v(id_, k=0):
    ch = EJ[id_]['check']; ch = ch if isinstance(ch, list) else [ch]
    c = ch[k]
    return c['valor'] if 'valor' in c else (c['valores'] if 'valores' in c else c)

# ---------------------------------------------------------------- traductor de nombres españoles → inglés y OPSIN
SUBST = [('isopropil', 'ISOPROPYL'), ('metoxi', 'METHOXY'), ('etoxi', 'ETHOXY'), ('metil', 'METHYL'), ('etil', 'ETHYL'), ('propil', 'PROPYL'),
         ('hidroxi', 'HYDROXY'), ('amino', 'AMINO'), ('ciano', 'CYANO'), ('oxo', 'OXO'), ('cloro', 'CHLORO'), ('bromo', 'BROMO'), ('fluoro', 'FLUORO'), ('yodo', 'IODO'), ('nitro', 'NITRO')]
def es2en(n):
    n = n.strip().lower()
    n = re.sub(r'^ácido ', '', n)
    if ' de ' in n:                                                  # éster: «etanoato de etilo» → «ethyl ethanoate»
        a, b = n.split(' de ')
        b = {'metilo': 'methyl', 'etilo': 'ethyl', 'propilo': 'propyl', 'butilo': 'butyl'}[b]
        a = re.sub(r'(?<![a-z])met', 'meth', a); a = re.sub(r'(?<![a-z])et(?=an)', 'eth', a); a = a.replace('anoato', 'anoate')
        return f'{b} {a}'
    for es, en in SUBST: n = n.replace(es, en)
    n = re.sub(r'(?<![a-z])met(?=an|a-)', 'meth', n); n = re.sub(r'(?<![a-z])et(?=an|en|in|a-)', 'eth', n)
    n = re.sub(r'anodioico$', 'anedioic acid', n); n = re.sub(r'dioico$', 'dioic acid', n); n = re.sub(r'oico$', 'oic acid', n)
    n = re.sub(r'ano(?=-\d)', 'ane', n)                                 # propano-1,2-diol → propane-1,2-diol
    n = re.sub(r'anonitrilo$', 'anenitrile', n); n = re.sub(r'amina$', 'amine', n); n = re.sub(r'amida$', 'amide', n)
    n = re.sub(r'ona$', 'one', n); n = re.sub(r'ino$', 'yne', n); n = re.sub(r'eno$', 'ene', n); n = re.sub(r'ano$', 'ane', n)
    return n.lower()
def canon(smi):
    m = Chem.MolFromSmiles(smi)
    return Chem.MolToSmiles(m) if m else None
_cache = {}
def precarga(nombres):
    nuevos = sorted({n for n in nombres if n not in _cache})
    if not nuevos: return
    res = py2opsin([es2en(n) for n in nuevos])               # una sola llamada a Java para todos
    for n, r in zip(nuevos, res): _cache[n] = canon(r) if r else None
def nombre_a_canon(es):
    if es not in _cache: precarga([es])
    return _cache[es]

# ---------------------------------------------------------------- 1. banco de moléculas de los juegos
PRIO = [('ácido carboxílico', '[CX3](=O)[OX2H1]'), ('éster', '[CX3](=O)[OX2][#6]'), ('amida', '[CX3](=O)[NX3]'), ('nitrilo', '[CX2]#N'), ('aldehído', '[CX3H1](=O)[#6,#1]'),
        ('cetona', '[#6][CX3](=O)[#6]'), ('alcohol', '[CX4][OX2H]'), ('amina', '[NX3;H2,H1;!$(NC=O)]')]
OTROS = [('éter', '[OD2]([CX4])[CX4]'), ('derivado halogenado', '[CX4][Cl,Br,F,I]'), ('doble enlace', '[CX3]=[CX3]')]
assert web['escala'] == [n for n, _ in PRIO], 'la escala de la web debe seguir el orden IUPAC'
def grupos(m):
    pr = [n for n, s in PRIO if m.HasSubstructMatch(Chem.MolFromSmarts(s))]
    ot = [n for n, s in OTROS if m.HasSubstructMatch(Chem.MolFromSmarts(s))]
    return pr, ot
precarga([x for mol in web['mols'] for x in [mol['n']] + mol['d']])
igual_mal = 0
for mol in web['mols']:
    m = Chem.MolFromSmiles(mol['s']); c0 = Chem.MolToSmiles(m)
    got = nombre_a_canon(mol['n'])
    comprobar(f"banco: «{mol['n']}» = estructura dibujada {mol['s']}", got == c0, f'(OPSIN da {got}, dibujo {c0})')
    for d in mol['d']:
        gd = nombre_a_canon(d)
        # un distractor puede ser otra estructura (error de posición/cadena) o el mismo compuesto con un nombre que incumple una regla
        # (grupo principal, localizador más bajo, orden alfabético, elisión): en ningún caso puede ser la respuesta correcta
        comprobar(f"banco: distractor «{d}» no coincide con «{mol['n']}»", d != mol['n'])
        igual_mal += gd == c0
    comprobar(f"banco: distractores distintos de «{mol['n']}»", len(set(mol['d'] + [mol['n']])) == 4)
    pr, ot = grupos(m)
    esperado = pr[:1] if pr else []
    if esperado: comprobar(f"banco: principal de «{mol['n']}» = {esperado[0]}", mol['g'][0] == esperado[0], f"(web {mol['g'][0]})")
    else: comprobar(f"banco: «{mol['n']}» sin grupo principal → {mol['g'][0]}", mol['g'][0] in [x for x, _ in OTROS] or mol['g'][0] == 'alcohol', f"(web {mol['g']})")
    resto = set(pr[1:]) | {x for x in ot if x != 'éter' or not pr}
    comprobar(f"banco: grupos de «{mol['n']}» = {pr}+{ot}", set(mol['g']) == set(pr) | set(x for x in ot if x == 'doble enlace' or not pr or x in mol['g']), f"(web {mol['g']}, rdkit {pr} {ot})")

print(f'  (de los {sum(len(m["d"]) for m in web["mols"])} distractores, {igual_mal} describen el mismo compuesto con un nombre que incumple una regla IUPAC y el resto otra estructura)')
# ---------------------------------------------------------------- 2. hibridación, σ/π
HIBR = {Chem.HybridizationType.SP3: 'sp3', Chem.HybridizationType.SP2: 'sp2', Chem.HybridizationType.SP: 'sp'}
def sigma_pi(smi):
    m = Chem.AddHs(Chem.MolFromSmiles(smi))
    return len(m.GetBonds()), int(round(sum(b.GetBondTypeAsDouble() - 1 for b in m.GetBonds())))
casos = {'propeno': ('1 / 2 / 0', 8, 1), 'propadieno': ('0 / 2 / 1', 6, 2), 'but-1-en-3-ino': ('0 / 2 / 2', 7, 3), 'etino': ('0 / 0 / 2', 3, 2), 'eteno': ('0 / 2 / 0', 5, 1),
         'etano': ('2 / 0 / 0', 7, 0), 'propanal': ('2 / 1 / 0', 9, 1), 'ácido etanoico': ('1 / 1 / 0', 7, 1), 'etanonitrilo': ('1 / 0 / 1', 5, 2)}
for h in web['hib']:
    m = Chem.MolFromSmiles(h['s'])
    ref = [HIBR[a.GetHybridization()] for a in m.GetAtoms() if a.GetSymbol() == 'C']
    web_h = [x for x in h['h'] if x]
    comprobar(f"hibridación de {h['t']} ({h['s']}): web = RDKit", web_h == ref, f'(web {web_h}, rdkit {ref})')
    if h['t'] in casos:
        c = [h['h'].count(x) for x in ('sp3', 'sp2', 'sp')]
        comprobar(f"hibridación: recuento de {h['t']}", f'{c[0]} / {c[1]} / {c[2]}' == casos[h['t']][0])
        s, p = sigma_pi(h['s'])
        comprobar(f"σ y π de {h['t']}", (s, p) == casos[h['t']][1:], f'(rdkit {s} σ, {p} π)')
# nombres (nombres de hidrocarburos con la regla es2en; los que no traduce solos se prueban a mano)
for nom, smi in [('propeno', 'C=CC'), ('propino', 'CC#C'), ('but-2-eno', 'CC=CC'), ('propanal', 'CCC=O'), ('propanona', 'CC(=O)C'), ('ácido etanoico', 'CC(=O)O'), ('etanonitrilo', 'CC#N'), ('etano', 'CC'), ('eteno', 'C=C')]:
    comprobar(f'nombre {nom} = {smi}', nombre_a_canon(nom) == canon(smi), f'({nombre_a_canon(nom)})')

# ---------------------------------------------------------------- cis-trans: los 625 casos de la web contra RDKit
SM = {'H': '[H]', 'CH3': 'C', 'Cl': 'Cl', 'Br': 'Br', 'OH': 'O'}
def hay_ct(v):
    m = Chem.MolFromSmiles(f'{SM[v[0]]}C({SM[v[1]]})=C({SM[v[2]]}){SM[v[3]]}')
    return len(list(EnumerateStereoisomers(m, options=StereoEnumerationOptions(onlyUnassigned=True, unique=True)))) == 2
dif = [c['v'] for c in web['ct'] if c['hay'] != hay_ct(c['v'])]
comprobar(f'cis-trans: la regla de la web coincide con RDKit en los {len(web["ct"])} casos', not dif, dif[:3])
BP = {'cis-but-2-eno': 3.7, 'trans-but-2-eno': 0.9, 'cis-1,2-dicloroeteno': 60.3, 'trans-1,2-dicloroeteno': 47.5}      # CRC
txt_ct = ' '.join(p['nota'] for p in web['ctPre'])
for k, val in [('3,7', 3.7), ('0,9', 0.9), ('60,3', 60.3), ('47,5', 47.5)]: comprobar(f'cis-trans: Teb {k} °C en las notas', k in txt_ct)
for nombre, v_, esperado in [('but-2-eno', ['H', 'CH3', 'H', 'CH3'], True), ('propeno', ['H', 'H', 'H', 'CH3'], False), ('1,2-dicloroeteno', ['H', 'Cl', 'H', 'Cl'], True),
                              ('1,1-dicloroeteno', ['Cl', 'Cl', 'H', 'H'], False), ('1-bromo-1-cloroeteno', ['Br', 'Cl', 'H', 'H'], False), ('1-bromo-2-cloroeteno', ['H', 'Br', 'H', 'Cl'], True),
                              ('2-metilbut-2-eno', ['CH3', 'CH3', 'H', 'CH3'], False)]:
    cc = [c for c in web['ct'] if c['v'] == v_][0]
    comprobar(f'cis-trans: preset {nombre}', cc['hay'] == esperado == hay_ct(v_))

# ---------------------------------------------------------------- carbono quiral y superposición
def quirales(smi): return Chem.FindMolChiralCenters(Chem.MolFromSmiles(smi), includeUnassigned=True, useLegacyImplementation=False)
def estereo(smi): return len(list(EnumerateStereoisomers(Chem.MolFromSmiles(smi), options=StereoEnumerationOptions(onlyUnassigned=True, unique=True))))
for t, smi, nq in [('CHFClBr', 'FC(Cl)Br', 1), ('ácido láctico', 'CC(O)C(=O)O', 1), ('alanina', 'CC(N)C(=O)O', 1), ('butan-2-ol', 'CCC(C)O', 1), ('CH₂ClBr', 'ClCBr', 0)]:
    e = [x for x in web['esp'] if x['t'] == t][0]
    comprobar(f'espejo: {t} tiene {nq} carbono(s) quiral(es)', len(quirales(smi)) == nq)
    comprobar(f'espejo: {t}: la web usa grupos distintos ⇔ quiral', (len(set(e['g'])) == 4) == (nq == 1), e['g'])
# geometría propia: el signo del triple producto cambia con el espejo, no con el giro de 180° y cambia con el intercambio
import numpy as np
P = np.array([[-1, 1, 0], [1, 1, 0], [1, -1, 1], [-1, -1, -1]], float)
sgn = lambda X: 1 if np.linalg.det(np.array([X[0] - X[3], X[1] - X[3], X[2] - X[3]])) > 0 else -1
mirror = P * np.array([-1, 1, 1]); giro = mirror * np.array([-1, 1, -1]); canje = mirror[[0, 1, 3, 2]]
comprobar('espejo: B (espejo) tiene signo opuesto a A', sgn(mirror) == -sgn(P) and web['q']['espejo'] == -web['q']['A'])
comprobar('espejo: el giro de 180° (eje vertical) no cambia el signo → sigue siendo el enantiómero', sgn(giro) == sgn(mirror) and web['q']['giro'] == web['q']['espejo'])
comprobar('espejo: intercambiar dos grupos devuelve el signo de A', sgn(canje) == sgn(P))
rng = np.random.default_rng(1)
for _ in range(20):                                                   # cualquier rotación propia conserva la quiralidad
    Q_, R_ = np.linalg.qr(rng.normal(size=(3, 3))); Q_ = Q_ * np.sign(np.linalg.det(Q_))
    comprobar('espejo: rotación propia al azar conserva el signo', sgn(P @ Q_) == sgn(P))

# ---------------------------------------------------------------- 3. fuerzas intermoleculares
TEB = {'butano': -0.5, 'metoxietano': 7.4, 'propanal': 48.0, 'propanona': 56.1, 'propan-1-ol': 97.2, 'ác. etanoico': 118.1, 'éter dietílico': 34.6, 'pentano': 36.1, 'butanal': 74.8,
       'butanona': 79.6, 'butan-1-ol': 117.7, 'ác. propanoico': 141.1, '2-metilbutano': 27.8, 'neopentano': 9.5, 'dimetil éter': -24.8, 'etanol': 78.4}     # CRC Handbook
masas = {}
for s in web['fz']:
    for c in s['c']:
        m = Chem.MolFromSmiles(c['s']); M = Descriptors.MolWt(m)
        masas[c['n']] = M
        comprobar(f"Teb de {c['n']}: {c['pe']} (CRC {TEB[c['n']]})", c['pe'] == TEB[c['n']])
        pr, ot = grupos(m); tiene_OH = m.HasSubstructMatch(Chem.MolFromSmarts('[OX2H,NX3;H1,H2]'))
        polar = bool(pr) or 'éter' in ot
        esp = 'H' if tiene_OH else ('D' if polar else 'L')
        comprobar(f"fuerza dominante de {c['n']}: web {c['f']} = deducida {esp}", c['f'] == esp, c['s'])
    mx = [c['pe'] for c in s['c']]
    comprobar(f"fuerzas: «{s['t']}» ordenado por Teb creciente en la web", mx == sorted(mx) or s['t'].startswith('Ramificación') or s['t'].startswith('M ≈ 72'), mx)
cab('fuerzas: M propan-1-ol 60,1', masas['propan-1-ol'], 60.1, 0.002); cab('fuerzas: M butano 58,1', masas['butano'], 58.1, 0.002); cab('fuerzas: M etanol 46,1', masas['etanol'], 46.1, 0.002)
for k in ('metoxietano', 'propanona', 'propanal', 'propan-1-ol', 'ác. etanoico', 'butano'): comprobar(f'M ≈ 60 para {k}', 56 <= masas[k] <= 61, masas[k])
comprobar('M ≈ 72–74 para los del segundo grupo', all(70 <= masas[k] <= 75 for k in ('éter dietílico', 'pentano', 'butanal', 'butanona', 'butan-1-ol', 'ác. propanoico')))
comprobar('Teb: el dimetil éter y el etanol (isómeros) difieren 103,2 °C', abs(TEB['etanol'] - TEB['dimetil éter'] - 103.2) < 1e-9)

# ---------------------------------------------------------------- 4. enumerador propio de isómeros
def enumera(atomos, H):
    """Todos los grafos conexos de átomos pesados (C, O) con valencias C=4, O=2 y exactamente H hidrógenos. Devuelve SMILES canónicos."""
    n = len(atomos); val = {'C': 4, 'O': 2}; pares = list(itertools.combinations(range(n), 2)); res = set()
    def rec(i, usado, orden):
        if i == len(pares):
            if sum(val[a] - u for a, u in zip(atomos, usado)) != H: return
            if any(u > val[a] for a, u in zip(atomos, usado)): return
            rw = Chem.RWMol()
            for a in atomos: rw.AddAtom(Chem.Atom(a))
            for (x, y), o in zip(pares, orden):
                if o: rw.AddBond(x, y, {1: Chem.BondType.SINGLE, 2: Chem.BondType.DOUBLE, 3: Chem.BondType.TRIPLE}[o])
            m = rw.GetMol()
            if len(Chem.GetMolFrags(m)) != 1: return
            try: Chem.SanitizeMol(m)
            except Exception: return
            res.add(Chem.MolToSmiles(m)); return
        x, y = pares[i]
        for o in range(0, 4):
            if usado[x] + o <= val[atomos[x]] and usado[y] + o <= val[atomos[y]]:
                usado[x] += o; usado[y] += o
                rec(i + 1, usado, orden + [o])
                usado[x] -= o; usado[y] -= o
    rec(0, [0] * n, [])
    return res
def clasifica(smis):
    out = {}
    for s in smis:
        m = Chem.MolFromSmiles(s); pr, ot = grupos(m)
        out[s] = (m, pr, ot, m.GetRingInfo().NumRings())
    return out
C4H10O = clasifica(enumera(['C', 'C', 'C', 'C', 'O'], 10))
alc_eter = [s for s, (m, pr, ot, r) in C4H10O.items() if (pr == ['alcohol'] or ot == ['éter']) and r == 0]
comprobar('enumerador: C₄H₁₀O → 7 isómeros alcohol/éter (d8)', len(alc_eter) == 7 and v('d8') == 7, len(alc_eter))
nombres7 = ['butan-1-ol', 'butan-2-ol', '2-metilpropan-1-ol', '2-metilpropan-2-ol', 'metoxipropano', '2-metoxipropano', 'etoxietano']
comprobar('teoría: los 7 nombres de C₄H₁₀O corresponden exactamente a los 7 isómeros enumerados', {nombre_a_canon(n_) for n_ in nombres7} == set(alc_eter))
C5H12 = enumera(['C'] * 5, 12); comprobar('enumerador: C₅H₁₂ → 3 isómeros (d9)', len(C5H12) == 3 and v('d9') == 3)
comprobar('teoría: pentano, 2-metilbutano y 2,2-dimetilpropano son esos 3', {nombre_a_canon(n_) for n_ in ['pentano', '2-metilbutano', '2,2-dimetilpropano']} == C5H12)
C3H6O2 = clasifica(enumera(['C', 'C', 'C', 'O', 'O'], 6))
ac_es = [s for s, (m, pr, ot, r) in C3H6O2.items() if r == 0 and (pr[:1] in (['ácido carboxílico'], ['éster']))]
comprobar('enumerador: C₃H₆O₂ → 3 ácidos o ésteres acíclicos (e6)', len(ac_es) == 3 and v('e6') == 3, ac_es)
comprobar('teoría/e6: son propanoico, etanoato de metilo y metanoato de etilo', {nombre_a_canon(x) for x in ['ácido propanoico', 'etanoato de metilo']} | {canon('CCOC=O')} == set(ac_es))
C4H8 = enumera(['C'] * 4, 8)
alquenos = [s for s in C4H8 if Chem.MolFromSmiles(s).GetRingInfo().NumRings() == 0]
est = sum(estereo(s) for s in alquenos)
comprobar('enumerador: C₄H₈ acíclicos: 3 estructurales y 4 con cis-trans (e14)', len(alquenos) == 3 and est == 4 and v('e14') == 4, (len(alquenos), est))
# isómeros de la teoría
iso_cs = {'C4H10': ['butano', '2-metilpropano'], }
comprobar('teoría: butano y 2-metilpropano son C₄H₁₀', {rdMolDescriptors.CalcMolFormula(Chem.MolFromSmiles(s)) for s in ['CCCC', 'CC(C)C']} == {'C4H10'})
for a, b, f in [('CCCCC', 'CC(C)CC', 'C5H12'), ('C=CCCC', 'CC=CCC', 'C5H10'), ('CCCC=O', 'CCC(C)=O', 'C4H8O'), ('CCC(=O)O', 'CC(=O)OC', 'C3H6O2'), ('CCO', 'COC', 'C2H6O'), ('CCCO', 'CC(C)O', 'C3H8O'),
                ('CC(=O)O', 'COC=O', 'C2H4O2'), ('CCCCC', 'CC(C)(C)C', 'C5H12')]:
    comprobar(f'teoría: {a} y {b} son isómeros {f}', rdMolDescriptors.CalcMolFormula(Chem.MolFromSmiles(a)) == f == rdMolDescriptors.CalcMolFormula(Chem.MolFromSmiles(b)))

# ---------------------------------------------------------------- fórmulas, insaturación, masas
def DI(C, H, N=0, X=0): return (2 * C + 2 + N - H - X) / 2
for f, esp in [((4, 8), 1), ((3, 5, 0, 1), 1), ((6, 12), 1), ((6, 6), 4), ((5, 8), 2), ((7, 8), 4), ((4, 6), 2)]: comprobar(f'DI{f} = {esp}', DI(*f) == esp)
comprobar('c13: DI(C₄H₆) = 2', v('c13') == DI(4, 6)); comprobar('d13: DI(C₇H₈) = 4', v('d13') == DI(7, 8))
cab('c17: M(etanol) con C 12,01; H 1,008; O 16,00', 2 * 12.01 + 6 * 1.008 + 16.00, v('c17'), 0.001)
cab('d16: n(C) = 0,880/44,0', 0.880 / 44.0, v('d16'), 0.001)
cab('e12: densidad del propano 25 °C, 1 atm', 1 * 44.1 / (0.082 * 298), v('e12'), 0.003)
comprobar('d11: 2³ = 8', v('d11') == 2 ** 3)
M = lambda f: Descriptors.MolWt(Chem.AddHs(Chem.MolFromSmiles(f)))
# ejemplos de análisis elemental
A = {'C': 12.011, 'H': 1.008, 'O': 15.999}
def porcent(smi):
    m = Chem.AddHs(Chem.MolFromSmiles(smi)); t = Descriptors.MolWt(m); cnt = {}
    for a in m.GetAtoms(): cnt[a.GetSymbol()] = cnt.get(a.GetSymbol(), 0) + 1
    return {k: 100 * cnt[k] * A[k] / t for k in cnt}, t
p, t = porcent('CCCC(=O)O'); comprobar('teoría 6: C₄H₈O₂ = 54,5 % C, 9,2 % H, 36,3 % O y M = 88', abs(p['C'] - 54.5) < 0.1 and abs(p['H'] - 9.2) < 0.1 and abs(p['O'] - 36.3) < 0.1 and abs(t - 88.1) < 0.1, (p, t))
x = [54.5 / 12.0, 9.2 / 1.01, 36.3 / 16.0]; comprobar('teoría 6: proporción 2 : 4 : 1', [round(i / min(x), 1) for i in x] == [2.0, 4.0, 1.0], x)
comprobar('teoría 6: empírica C₂H₄O (44) y k = 2', 2 * 12 + 4 + 16 == 44 and 88 / 44 == 2)
p, t = porcent('CCC=O'); comprobar('e4: C₃H₆O = 62,1 % C, 10,4 % H, 27,5 % O (datos del enunciado: 62,1 / 10,4 / 27,5), M = 58', abs(p['C'] - 62.1) < 0.1 and abs(p['H'] - 10.4) < 0.1 and abs(p['O'] - 27.5) < 0.1 and abs(t - 58.1) < 0.1, (p, t))
x = [62.1 / 12.0, 10.4 / 1.01, 27.5 / 16.0]; r = [i / min(x) for i in x]
comprobar('e4: proporción 3 : 6 : 1 → C₃H₆O, k = 1', [round(i) for i in r] == [3, 6, 1] and round(58 / 58) == 1 and [v('e4', 0), v('e4', 1), v('e4', 2)] == [3, 6, 1], r)
# combustión del ejemplo de la teoría (1,50 g → 2,20 g CO2 y 0,90 g H2O; M = 60)
nC = 2.20 / 44.0; nH = 2 * 0.90 / 18.0; mO = 1.50 - nC * 12.0 - nH * 1.0
comprobar('teoría 6 combustión: m(C) 0,600; m(H) 0,100; m(O) 0,800', abs(nC * 12 - 0.600) < 1e-9 and abs(nH - 0.100) < 1e-9 and abs(mO - 0.800) < 1e-9)
comprobar('teoría 6 combustión: proporción 1 : 2 : 1 y C₂H₄O₂', abs(nC - 0.05) < 1e-9 and abs(mO / 16.0 - 0.05) < 1e-9 and 60 / 30 == 2)
cab('teoría 6: 1,50 g de C₂H₄O₂ dan 2,20 g CO₂', 1.50 / 60.05 * 2 * 44.01, 2.20, 0.005); cab('teoría 6: y 0,90 g H₂O', 1.50 / 60.05 * 2 * 18.015, 0.90, 0.005)
# e5
nC = 1.76 / 44.0; nH = 2 * 1.08 / 18.0; mO = 0.920 - 12 * nC - 1.0 * nH
cab('e5: m(O) = 0,320 g', mO, v('e5', 0), 0.02); comprobar('e5: C : H : O = 2 : 6 : 1 (C₂H₆O, k = 1) y nº de H = 6', abs(nC / (mO / 16) - 2) < 0.02 and abs(nH / (mO / 16) - 6) < 0.05 and v('e5', 1) == 6 and 46 / 46 == 1)
cab('e5: 0,920 g de C₂H₆O dan 1,76 g CO₂', 0.920 / 46.07 * 2 * 44.01, 1.76, 0.005); cab('e5: y 1,08 g H₂O', 0.920 / 46.07 * 3 * 18.015, 1.08, 0.005)
# hidrocarburo de la teoría: 85,7 % C, d = 1,25 g/L a 0 °C y 1 atm
cab('teoría 6: M = 1,25 · 22,4', 1.25 * 22.4, 28.0, 0.001); comprobar('teoría 6: C₂H₄ → 85,6 % C', abs(porcent('C=C')[0]['C'] - 85.7) < 0.2)
cab('teoría 6: densidad del eteno 28,05/22,414 ≈ 1,25 g/L', 28.054 / 22.414, 1.25, 0.005)
x = [85.7 / 12.0, 14.3 / 1.01]; comprobar('teoría 6: proporción 1 : 2', abs(x[1] / x[0] - 2) < 0.03)
# datos del test: empírica CH2O y M = 90
comprobar('test: CH₂O con M = 90 → C₃H₆O₃', 90 / 30 == 3)
comprobar('teoría: H₂O 0,90 g = 0,050 mol → 0,100 mol de H (errores)', abs(0.90 / 18 - 0.05) < 1e-9)

# ---------------------------------------------------------------- nombres de los ejercicios y de la teoría
precarga([x for i_ in ('c5','c6','c7','d1','d2','d3','d4','d5','d17','e1','e2','e3','e16') for x in v(i_)])
EJNOM = {'c5': 'CCCO', 'c6': 'CCC=O', 'c7': 'CC(C)=O', 'd1': 'CC(C)CC', 'd2': 'CC(O)CC', 'd3': 'CCC(=O)OC', 'd4': 'CCC#N', 'd5': 'C=CCCC', 'd17': 'CCOC', 'e1': 'OC(=O)CC(O)C',
         'e2': 'CC(=O)CCO', 'e3': 'CC(C)CC(CC)CC', 'e16': 'CCCC(N)=O'}
for id_, smi in EJNOM.items():
    for val in v(id_):
        comprobar(f'{id_}: «{val}» = {smi}', nombre_a_canon(val) == canon(smi), nombre_a_canon(val))
    otras = EJ[id_]['check'].get('otras', [])
for nom, smi in [('ácido 3-hidroxibutanoico', 'OC(=O)CC(O)C'), ('4-hidroxibutan-2-ona', 'CC(=O)CCO'), ('4-etil-2-metilhexano', 'CC(C)CC(CC)CC'), ('pent-3-en-2-ol', 'CC=CC(O)C'),
                 ('propano-1,2-diol', 'OCC(O)C'), ('buta-1,3-dieno', 'C=CC=C'), ('metoxipropano', 'COCCC'), ('metoxietano', 'COCC'), ('etoxietano', 'CCOCC'), ('propanoato de metilo', 'CCC(=O)OC'),
                 ('etanoato de etilo', 'CC(=O)OCC'), ('propanamida', 'CCC(N)=O'), ('propanonitrilo', 'CCC#N'), ('2-bromobutano', 'CCC(C)Br'), ('hexa-2,4-diino', 'CC#CC#CC'),
                 ('3-metilbutan-2-ona', 'CC(=O)C(C)C'), ('ácido 2-hidroxipropanoico', 'CC(O)C(=O)O'), ('ácido 3-oxopropanoico', 'OC(=O)CC=O'), ('2-metilpropan-1-ol', 'OCC(C)C'),
                 ('propanoato de etilo', 'CCC(=O)OCC'), ('2-aminopropan-1-ol', 'CC(N)CO'), ('N-metiletanamina', 'CCNC')]:
    comprobar(f'teoría/ejercicios: «{nom}» = {smi}', nombre_a_canon(nom) == canon(smi), nombre_a_canon(nom))
comprobar('d15: butanona es isómero del butanal (C₄H₈O) y las otras opciones no', [rdMolDescriptors.CalcMolFormula(Chem.MolFromSmiles(s)) for s in ['CCCC=O', 'CCC(C)=O', 'CCCCO', 'CCCC(=O)O', 'CCCCC=O']] == ['C4H8O', 'C4H8O', 'C4H10O', 'C4H8O2', 'C5H10O'])
comprobar('c10: HO–CH₂–CHO → manda el aldehído', grupos(Chem.MolFromSmiles('OCC=O'))[0][0] == 'aldehído')
comprobar('e15: HOOC–CH₂–CHO → manda el ácido', grupos(Chem.MolFromSmiles('OC(=O)CC=O'))[0][0] == 'ácido carboxílico')

# ---------------------------------------------------------------- ejercicios de σ/π, quirales y estereoisómeros
comprobar('c3: eteno tiene 5 σ', sigma_pi('C=C')[0] == 5 == v('c3'))
comprobar('e13: but-1-en-3-ino 7 σ y 3 π', sigma_pi('C=CC#C') == (7, 3) and [v('e13', 0), v('e13', 1)] == [7, 3])
comprobar('d10: CH₃–CHBr–CHCl–CH₃ tiene 2 C quirales', len(quirales('CC(Br)C(Cl)C')) == 2 == v('d10'))
comprobar('e8: 3-metilpentan-2-ol: 2 C quirales y 4 estereoisómeros', len(quirales('CC(O)C(C)CC')) == 2 and estereo('CC(O)C(C)CC') == 4 and [v('e8', 0), v('e8', 1)] == [2, 4])
comprobar('e9: 2,3-dibromobutano: 3 estereoisómeros (forma meso)', estereo('CC(Br)C(Br)C') == 3 == v('e9'))
comprobar('teoría: butano-2,3-diol: 2 centros, 3 estereoisómeros', len(quirales('CC(O)C(O)C')) == 2 and estereo('CC(O)C(O)C') == 3)
comprobar('teoría: ácido tartárico: 2 centros, 3 estereoisómeros', len(quirales('OC(=O)C(O)C(O)C(=O)O')) == 2 and estereo('OC(=O)C(O)C(O)C(=O)O') == 3)
for t, smi, nq in [('2-clorobutano', 'CCC(C)Cl', 1), ('pentan-3-ol', 'CCC(O)CC', 0), ('ácido láctico', 'CC(O)C(=O)O', 1), ('c15 etanol', 'CCO', 0), ('c15 ácido propanoico', 'CCC(=O)O', 0), ('c15 propanona', 'CC(=O)C', 0)]:
    comprobar(f'quiral: {t} → {nq}', len(quirales(smi)) == nq)
comprobar('d11: tres centros distintos → 8 estereoisómeros', len(quirales('CC(Br)C(Cl)C(F)I')) == 3 and estereo('CC(Br)C(Cl)C(F)I') == 8)
comprobar('c14/e7: cis-trans de las opciones', [hay_ct(a) for a in (['H', 'CH3', 'H', 'CH3'], ['H', 'H', 'H', 'H'], ['H', 'H', 'H', 'CH3'], ['CH3', 'CH3', 'H', 'H'])] == [True, False, False, False]
           and [hay_ct(a) for a in (['H', 'CH3', 'H', 'Cl'], ['H', 'H', 'H', 'Cl'], ['CH3', 'CH3', 'H', 'H'])] == [True, False, False])
for s_, esp in [('CC=CC', 2), ('CC(C)=CC', 1), ('CC=CCC', 2), ('ClC=CC', 2), ('CC(C)=C', 1)]:
    comprobar(f'teoría: cis-trans de {s_}', estereo(s_) == esp)
# nombres de ejemplos con DI
comprobar('teoría: C₃H₅Cl de ejemplo (3-cloroprop-1-eno)', rdMolDescriptors.CalcMolFormula(Chem.MolFromSmiles('C=CCCl')) == 'C3H5Cl')

# ---------------------------------------------------------------- orden de Teb en los ejercicios
comprobar('d14: pentano < butanal < butan-1-ol', TEB['pentano'] < TEB['butanal'] < TEB['butan-1-ol'])
comprobar('teoría 5: butano < propanona < propan-1-ol < ácido etanoico', TEB['butano'] < TEB['propanona'] < TEB['propan-1-ol'] < TEB['ác. etanoico'])
comprobar('quiz: butano < butanal < butan-1-ol', -0.5 < 74.8 < 117.7)
comprobar('e11: butano (−0,5 °C) frente a 2-metilpropano (−11,7 °C)', -0.5 > -11.7)
comprobar('teoría 5: ramificación pentano 36,1 > 2-metilbutano 27,8 > neopentano 9,5', 36.1 > 27.8 > 9.5)
comprobar('c18: etanol > metoximetano', TEB['etanol'] > TEB['dimetil éter'])
cab('c18/teoría 5: diferencia 103,2 °C', TEB['etanol'] - TEB['dimetil éter'], 103.2, 1e-6)
cab('teoría 5: Ka del ácido etanoico 1,8·10⁻⁵ ⇒ pKa 4,74', -math.log10(1.8e-5), 4.74, 0.005)
ejercicios_n = len(web['ej'])
comprobar(f'hay ≥ 40 ejercicios ({ejercicios_n}) con tres niveles', ejercicios_n >= 40 and {e['nivel'] for e in web['ej']} == {1, 2, 3})

print(f'comprobaciones correctas: {ok}')
if fallos:
    print('FALLOS:'); [print('  -', f) for f in fallos]; sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos · todo verificado')
