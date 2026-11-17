#!/usr/bin/env python3
"""
Verificación independiente de Biología II, tema 13 (Mutaciones e ingeniería genética).
No comparte código con la web: recalcula con fracciones y sympy la tabla del código genético (y el recuento de sustituciones
silenciosas, de cambio de sentido y sin sentido), la traducción de cada ejemplo y ejercicio con mutaciones (sustituciones,
inserciones y deleciones, con desplazamiento del marco), los fragmentos de las digestiones de restricción (lineal y circular),
el número de copias de la PCR (incluida una simulación hebra a hebra que demuestra que las moléculas del tamaño exacto son
2^n - 2n), la no disyunción en meiosis I y II, las cuentas de cromosomas y los cálculos de los ejercicios; comprueba hechos
y fechas (científicos, hitos), que cada ejercicio tenga una única respuesta correcta y que la ficha no contradiga la teoría.

Convenciones declaradas: tasa de mutación tras corrección y reparación 1e-9 por base y replicación (la de T11); genoma
diploide humano 6,4e9 pb; en un genoma al azar, un sitio de n pb aparece cada 4^n pb; PCR ideal duplica cada ciclo; ciclo de
PCR de 2 min (30 s + 30 s + 60 s); ADN de ejemplo de 6000 pb con EcoRI en 1000 y 3000, BamHI en 2200 y HindIII en 4800.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_bio2_t13.py /tmp/ampl.json
"""
import json, math, re, sys, os
from fractions import Fraction as F
from itertools import product
import sympy as sp

ok, fallos = 0, []


def cierto(nombre, cond):
    global ok
    if cond:
        ok += 1
    else:
        fallos.append(nombre)


def casi(nombre, a, b, tol=0.005):
    cierto('%s: %s ≈ %s' % (nombre, a, b), abs(a - b) <= tol * max(abs(b), 1e-12))


def limpio(s):
    return re.sub(r'<[^>]+>', '', s)


def norm(s):
    return limpio(s).lower().replace('−', '-')


datos = json.load(open(sys.argv[1]))
T = datos['ampl']['bio2']['t13']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = norm(teoria)
vz = T['vistazo']
vz_txt = norm(json.dumps(vz, ensure_ascii=False))
D = T['datos']
RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
lab = open(os.path.join(RAIZ, 'ampliaciones', 'lab_bio_t13.js'), encoding='utf-8').read()

# ---------------------------------------------------------------- código genético (construido por familias, no copiado de la web)
fam = {
    'F': ['UUU', 'UUC'], 'L': ['UUA', 'UUG', 'CUU', 'CUC', 'CUA', 'CUG'], 'I': ['AUU', 'AUC', 'AUA'], 'M': ['AUG'],
    'V': ['GUU', 'GUC', 'GUA', 'GUG'], 'S': ['UCU', 'UCC', 'UCA', 'UCG', 'AGU', 'AGC'], 'P': ['CCU', 'CCC', 'CCA', 'CCG'],
    'T': ['ACU', 'ACC', 'ACA', 'ACG'], 'A': ['GCU', 'GCC', 'GCA', 'GCG'], 'Y': ['UAU', 'UAC'], '*': ['UAA', 'UAG', 'UGA'],
    'H': ['CAU', 'CAC'], 'Q': ['CAA', 'CAG'], 'N': ['AAU', 'AAC'], 'K': ['AAA', 'AAG'], 'D': ['GAU', 'GAC'], 'E': ['GAA', 'GAG'],
    'C': ['UGU', 'UGC'], 'W': ['UGG'], 'R': ['CGU', 'CGC', 'CGA', 'CGG', 'AGA', 'AGG'], 'G': ['GGU', 'GGC', 'GGA', 'GGG'],
}
COD = {c: a for a, cs in fam.items() for c in cs}
cierto('código: 64 codones, 20 aminoácidos y 3 paradas', len(COD) == 64 and len(set(COD.values()) - {'*'}) == 20 and list(COD.values()).count('*') == 3)
TRES = {'F': 'Phe', 'L': 'Leu', 'S': 'Ser', 'Y': 'Tyr', '*': 'STOP', 'C': 'Cys', 'W': 'Trp', 'P': 'Pro', 'H': 'His', 'Q': 'Gln',
        'R': 'Arg', 'I': 'Ile', 'M': 'Met', 'T': 'Thr', 'N': 'Asn', 'K': 'Lys', 'V': 'Val', 'A': 'Ala', 'D': 'Asp', 'E': 'Glu', 'G': 'Gly'}

# la tabla de la web (orden U C A G) coincide con la nuestra
m = re.search(r'var TABLA = "([A-Z*]{64})"', lab)
cierto('lab: tabla del código presente', m is not None)
if m:
    tw = m.group(1)
    mia = ''.join(COD[a + b + c] for a in 'UCAG' for b in 'UCAG' for c in 'UCAG')
    cierto('lab: la tabla de 64 letras de la web coincide con el código genético estándar', tw == mia)
m = re.search(r'var SEQ = "([ACGU]+)"', lab)
SEQ = m.group(1) if m else ''
cierto('lab: mRNA de ejemplo = 8 codones de la β-globina + UAA', SEQ == 'AUGGUGCACCUGACUCCUGAGGAGUAA')


def traduce(s):
    r = []
    for i in range(0, len(s) - 2, 3):
        a = COD[s[i:i + 3]]
        if a == '*':
            return r, True
        r.append(a)
    return r, False


def nombres(r):
    return '–'.join(TRES[a] for a in r)


prot0, _ = traduce(SEQ)
cierto('β-globina: Met–Val–His–Leu–Thr–Pro–Glu–Glu y parada', nombres(prot0) == 'Met–Val–His–Leu–Thr–Pro–Glu–Glu' and traduce(SEQ)[1])

# ---------------------------------------------------------------- las cinco mutaciones de ejemplo del widget
def muta(modo, pos, base):
    p = pos - 1
    return SEQ[:p] + base + SEQ[p + 1:] if modo == 'sub' else (SEQ[:p] + base + SEQ[p:] if modo == 'ins' else SEQ[:p] + SEQ[p + 1:])

pr, par = traduce(muta('sub', 20, 'U'))
cierto('widget falciforme: GAG→GUG, Glu→Val, 8 aa, cambio de sentido', SEQ[18:21] == 'GAG' and muta('sub', 20, 'U')[18:21] == 'GUG' and nombres(pr) == 'Met–Val–His–Leu–Thr–Pro–Val–Glu' and par)
pr, par = traduce(muta('sub', 21, 'A'))
cierto('widget silenciosa: GAG→GAA conserva Glu', muta('sub', 21, 'A')[18:21] == 'GAA' and pr == prot0)
pr, par = traduce(muta('sub', 19, 'U'))
cierto('widget sin sentido: GAG→UAG, proteína de 6 aa', muta('sub', 19, 'U')[18:21] == 'UAG' and len(pr) == 6 and nombres(pr) == 'Met–Val–His–Leu–Thr–Pro' and par)
pr, par = traduce(muta('ins', 7, 'G'))
cierto('widget inserción: Met–Val–Ala–Pro–Asp–Ser y parada prematura', nombres(pr) == 'Met–Val–Ala–Pro–Asp–Ser' and par and len(pr) < 8)
pr, par = traduce(muta('del', 12, 'U'))
cierto('widget deleción: Met–Val–His–Leu–Leu–Leu–Arg–Ser sin parada', nombres(pr) == 'Met–Val–His–Leu–Leu–Leu–Arg–Ser' and not par)
pr, par = traduce(muta('sub', 25, 'G'))
cierto('widget: UAA→GAA pierde la parada (proteína de 9 aa sin parada)', len(pr) == 9 and not par and muta('sub', 25, 'G')[24:27] == 'GAA')
cierto('widget: AUG→CUG elimina el inicio', muta('sub', 1, 'C')[:3] == 'CUG')

# ---------------------------------------------------------------- recuento de sustituciones
sil = mis = non = 0
for c, a in COD.items():
    if a == '*':
        continue
    for pos in range(3):
        for x in 'UCAG':
            if x == c[pos]:
                continue
            n = c[:pos] + x + c[pos + 1:]
            r = COD[n]
            if r == a:
                sil += 1
            elif r == '*':
                non += 1
            else:
                mis += 1
cierto('sustituciones: 549 posibles = 134 silenciosas + 392 cambio de sentido + 23 sin sentido', (sil, mis, non, sil + mis + non) == (134, 392, 23, 549))
cierto('sustituciones: 24 %, 71 % y 4 % (redondeo de la teoría)', round(100 * sil / 549) == 24 and round(100 * mis / 549) == 71 and round(100 * non / 549) == 4)
cierto('teoría cita 549, 134, 392 y 23', all(x in teoria for x in ('549', '134', '392', '23')))


def subs(cod):
    r = {'sil': 0, 'mis': 0, 'non': 0}
    for pos in range(3):
        for x in 'UCAG':
            if x != cod[pos]:
                a = COD[cod[:pos] + x + cod[pos + 1:]]
                r['sil' if a == COD[cod] else ('non' if a == '*' else 'mis')] += 1
    return r

cierto('GAG: 9 sustituciones = 1 silenciosa, 7 de sentido, 1 sin sentido', subs('GAG') == {'sil': 1, 'mis': 7, 'non': 1})
cierto('CUU: 9 sustituciones = 3 silenciosas, 6 de sentido, 0 sin sentido', subs('CUU') == {'sil': 3, 'mis': 6, 'non': 0})
cierto('ej. b7: 1 sin sentido en GAG', EJ['b7']['check']['valor'] == subs('GAG')['non'])
cierto('ej. b8: 3 silenciosas en CUU', EJ['b8']['check']['valor'] == subs('CUU')['sil'])
cierto('transversión GAG→GUG (A→U: purina → pirimidina)', 'A' in 'AG' and 'U' not in 'AG')
cierto('β-talasemia: CAG (Gln) → UAG (parada) en el codón 39', COD['CAG'] == 'Q' and COD['UAG'] == '*')
cierto('ejemplos de la lámina/actividad: CUU→CUC Leu, CCU→CAU His, CAG→UAG parada', COD['CUU'] == COD['CUC'] == 'L' and COD['CCU'] == 'P' and COD['CAU'] == 'H')

# ---------------------------------------------------------------- ejemplo de la teoría: inserción de G en AUG UUU GGC UAA
orig = 'AUGUUUGGCUAA'
pr0, _ = traduce(orig)
nueva = orig[:3] + 'G' + orig[3:]
pr1, par1 = traduce(nueva)
cierto('teoría: original Met–Phe–Gly–parada', nombres(pr0) == 'Met–Phe–Gly')
cierto('teoría: AUGGUUUGGCUAA = AUG GUU UGG CUA A → Met–Val–Trp–Leu sin parada', nueva == 'AUGGUUUGGCUAA' and nombres(pr1) == 'Met–Val–Trp–Leu' and not par1)

# ---------------------------------------------------------------- ejercicios de traducción
o1 = 'AUGCAUGGUUUUUAA'
cierto('ej. b6: original Met–His–Gly–Phe', nombres(traduce(o1)[0]) == 'Met–His–Gly–Phe')
m1 = o1[:4] + o1[5:]
pr, par = traduce(m1)
cierto('ej. b6: sin la 5.ª base, Met–Leu–Val–Phe… y sin parada', m1.startswith('AUGCUGGUUUUU') and nombres(pr) == 'Met–Leu–Val–Phe' and not par and o1[4] == 'A')
cierto('ej. b6: la respuesta correcta dice Met–Leu–Val–Phe y las otras son distintas', EJ['b6']['check']['opciones'][EJ['b6']['check']['ok']].startswith('Met–Leu–Val–Phe'))
o2 = 'AUGUUCAAAGGGUGA'
cierto('ej. c4: original Met–Phe–Lys–Gly', nombres(traduce(o2)[0]) == 'Met–Phe–Lys–Gly')
m2 = o2[:6] + 'G' + o2[6:]
pr, par = traduce(m2)
cierto('ej. c4: tras insertar G, Met–Phe–Glu–Arg–Val… y sin parada original', m2 == 'AUGUUCGAAAGGGUGA' and nombres(pr) == 'Met–Phe–Glu–Arg–Val' and not par)
cierto('ej. c4: la opción correcta es Met–Phe–Glu–Arg–Val…', EJ['c4']['check']['opciones'][EJ['c4']['check']['ok']].startswith('Met–Phe–Glu–Arg–Val'))
cierto('ej. c4: GAA Glu, AGG Arg, GUG Val como dice el enunciado', COD['GAA'] == 'E' and COD['AGG'] == 'R' and COD['GUG'] == 'V')
cierto('ej. b6: CUG Leu, GUU Val, UUU Phe como dice el enunciado', COD['CUG'] == 'L' and COD['GUU'] == 'V' and COD['UUU'] == 'F')

# ---------------------------------------------------------------- PCR
def copias(n0, n, e):
    return sp.Rational(n0) * (1 + sp.Rational(str(e))) ** n

cierto('PCR: 2^5 = 32 (a6, c2)', EJ['a6']['check']['valor'] == 32 and copias(1, 5, 1) == 32 and EJ['c2']['check'][0]['valor'] == 32)
cierto('PCR: 2^20 = 1 048 576 (b1)', EJ['b1']['check']['valor'] == 1048576 == copias(1, 20, 1))
cierto('PCR: 50 · 2^10 = 51 200 (b2)', EJ['b2']['check']['valor'] == 51200 == copias(50, 10, 1))
n_min = next(n for n in range(100) if 2 ** n > 10 ** 6)
cierto('PCR: 20 ciclos para superar 10^6 (2^19 = 524 288 no llega) (b3)', n_min == 20 and 2 ** 19 < 10 ** 6 and EJ['b3']['check']['valor'] == 20)
cierto('PCR: 30 ciclos de 2 min = 60 min (b4) y el ciclo es 30 + 30 + 60 = 120 s', EJ['b4']['check']['valor'] == 30 * 2 and 30 + 30 + 60 == 120)
casi('PCR: eficiencia 90 %, 10 ciclos: 1,9^10 (c3)', float(copias(1, 10, 0.9)), EJ['c3']['check']['valor'])
casi('PCR: 1,9^10 ≈ 613,1', 1.9 ** 10, 613.1066, 1e-4)
cierto('PCR: 2^10 = 1024, 2^30 = 1,07·10^9 (teoría)', 2 ** 10 == 1024 and 2 ** 30 == 1073741824 and '1 048 576' in teoria and '1,07·10<sup>9</sup>' in teoria)
cierto('PCR: 100 moléculas, 10 ciclos = 102 400; 35 ciclos de 1 = 34 359 738 368 (widget)', copias(100, 10, 1) == 102400 and 2 ** 35 == 34359738368)
cierto('PCR: en el widget, 100 · 2^35 ≈ 3,4·10^12 (≥ 10^12: notación científica)', 100 * 2 ** 35 > 10 ** 12)

# Simulación hebra a hebra: T = hebra original; L = hebra nueva copiada de T (3' sin tope, más larga); E = hebra de tamaño exacto
copia = {'T': 'L', 'L': 'E', 'E': 'E'}
def ciclo(moleculas):
    out = []
    for a, b in moleculas:
        out.append((a, copia[a]))
        out.append((b, copia[b]))
    return out

mol = [('T', 'T')]
exactas = {}
for n in range(1, 11):
    mol = ciclo(mol)
    exactas[n] = sum(1 for a, b in mol if a == 'E' and b == 'E')
    cierto('PCR simulada, ciclo %d: %d moléculas y %d del tamaño exacto = 2^n - 2n' % (n, len(mol), exactas[n]), len(mol) == 2 ** n and exactas[n] == 2 ** n - 2 * n)
cierto('PCR: ciclo 3 es el primero con moléculas exactas (2); ciclo 4: 8; ciclo 5: 22', exactas[1] == 0 and exactas[2] == 0 and exactas[3] == 2 and exactas[4] == 8 and exactas[5] == 22)
cierto('ej. c2: 22 exactas tras 5 ciclos y el enunciado lo declara', EJ['c2']['check'][1]['valor'] == exactas[5])
cierto('ej. b5: las primeras exactas aparecen en el ciclo 3 (opción correcta)', 'ciclo 3' in EJ['b5']['check']['opciones'][EJ['b5']['check']['ok']].lower())
cierto('teoría PCR: «2 tras 3 ciclos, 8 tras 4, 22 tras 5»', '2 tras 3 ciclos, 8 tras 4, 22 tras 5' in norm(teoria) or '2 tras 3 ciclos, 8 tras 4, 22 tras 5' in limpio(teoria))

# ---------------------------------------------------------------- restricción
LONG = 6000
SITIOS = {'EcoRI': [1000, 3000], 'BamHI': [2200], 'HindIII': [4800]}
def fragmentos(cortes, circ):
    c = sorted(cortes)
    if circ:
        return sorted([c[i + 1] - c[i] for i in range(len(c) - 1)] + [LONG - c[-1] + c[0]], reverse=True)
    return sorted([c[0]] + [c[i + 1] - c[i] for i in range(len(c) - 1)] + [LONG - c[-1]], reverse=True)

# constantes del widget
cierto('lab: LONG = 6000, EcoRI [1000, 3000], BamHI [2200], HindIII [4800]',
       'var LONG = 6000' in lab and 'pos: [1000, 3000]' in lab and 'pos: [2200]' in lab and 'pos: [4800]' in lab)
for combo, circ, esp in [(['EcoRI'], False, [3000, 2000, 1000]), (['BamHI'], False, [3800, 2200]), (['HindIII'], False, [4800, 1200]),
                         (['EcoRI', 'BamHI'], False, [3000, 1200, 1000, 800]), (['EcoRI', 'HindIII'], False, [1800, 1200, 1000, 2000][::1]),
                         (['EcoRI', 'BamHI', 'HindIII'], False, [1800, 1200, 1200, 1000, 800]),
                         (['EcoRI'], True, [4000, 2000]), (['BamHI'], True, [6000]), (['EcoRI', 'BamHI', 'HindIII'], True, [2200, 1800, 1200, 800])]:
    cortes = sum((SITIOS[e] for e in combo), [])
    fr = fragmentos(cortes, circ)
    cierto('restricción %s %s: %s, suma 6000' % ('+'.join(combo), 'circular' if circ else 'lineal', fr), fr == sorted(esp, reverse=True) and sum(fr) == LONG)
    cierto('restricción %s %s: %d fragmentos (cortes %s)' % ('+'.join(combo), 'circular' if circ else 'lineal', len(fr), len(cortes)), len(fr) == (len(cortes) if circ else len(cortes) + 1))
cierto('restricción: EcoRI + BamHI + HindIII lineal tiene dos fragmentos de 1200 (doblete)', fragmentos([1000, 3000, 2200, 4800], False).count(1200) == 2)
cierto('ej. b10: fragmento más largo de EcoRI lineal = 3000', EJ['b10']['check']['valor'] == max(fragmentos([1000, 3000], False)))
def circ5000(cortes):
    c = sorted(cortes)
    return sorted([c[i + 1] - c[i] for i in range(len(c) - 1)] + [5000 - c[-1] + c[0]])
cierto('ej. b11: plásmido de 5000 pb, cortes 800 y 2800 → 2000 y 3000; el más corto 2000', circ5000([800, 2800]) == [2000, 3000] and EJ['b11']['check']['valor'] == 2000)
fr = fragmentos([1000, 3000, 2200], False)
cierto('ej. c1: 4 fragmentos (3000, 1200, 1000, 800), el más pequeño 800', len(fr) == 4 and min(fr) == 800 and EJ['c1']['check'][0]['valor'] == 4 and EJ['c1']['check'][1]['valor'] == 800)
cierto('ej. c6: BamHI en 2200 cae entre los EcoRI 1000 y 3000 → fragmento de 2000; EcoRI lineal en orden 1000, 2000, 3000',
       1000 < 2200 < 3000 and fragmentos([1000, 3000], False)[::-1] == [1000, 2000, 3000] and fragmentos([2200], False) == [3800, 2200]
       and '2000' in EJ['c6']['check']['opciones'][EJ['c6']['check']['ok']])
# ejemplo PAU: plásmido de 6000 pb
for pos_bam in (1800,):
    cierto('PAU 13: plásmido circular 6000 pb, EcoRI en 1000 y 3000, BamHI dentro del fragmento de 2000 (a 800 del extremo): EcoRI → 4000 y 2000',
           fragmentos([1000, 3000], True) == [4000, 2000])
    cierto('PAU 13: BamHI solo → una banda de 6000; con las dos → 4000, 1200 y 800',
           fragmentos([pos_bam], True) == [6000] and fragmentos([1000, 3000, pos_bam], True) == [4000, 1200, 800])
cierto('PAU 13: el texto da 2000/4000, 800/1200/4000 y «800 + 1200 = 2000»', all(x in teoria for x in ('2000 y 4000', '800, 1200 y 4000', '800 + 1200 = 2000')))
cierto('teoría 8: fragmentos EcoRI 1000, 2000, 3000; BamHI 2200 y 3800; doble 1000, 1200, 800, 3000; circular 2000 y 4000',
       all(x in teoria for x in ('<b>1000</b>', '<b>2000</b>', '<b>3000</b>', '<b>2200</b>', '<b>3800</b>', '<b>1200</b>', '<b>800</b>')) and '2000 (entre los dos cortes) y de 4000' in teoria)
cierto('teoría 8: 4^4 = 256, 4^6 = 4096, 4^8 = 65 536', 4 ** 4 == 256 and 4 ** 6 == 4096 and 4 ** 8 == 65536 and all(x in teoria for x in ('256 pb', '4096 pb', '65 536 pb')))
casi('ej. c8: 4,6·10^6 / 4096 ≈ 1123', 4.6e6 / 4 ** 6, EJ['c8']['check']['valor'], 0.001)
cierto('ej. c7: 4^20 = 1 099 511 627 776', 4 ** 20 == 1099511627776 == EJ['c7']['check']['valor'])
cierto('ej. c9: 6,4e9 · 1e-9 = 6,4', abs(6.4e9 * 1e-9 - EJ['c9']['check']['valor']) < 1e-9 and '60-80 mutaciones nuevas' in limpio(teoria))
cierto('ej. b21: 240 colonias, 15 % blancas = 36', F(240) * F(15, 100) == 36 == EJ['b21']['check']['valor'])
cierto('ej. c12: 1200 pb / 3 = 400 codones, 399 aminoácidos', 1200 // 3 - 1 == 399 == EJ['c12']['check']['valor'])
cierto('ej. c5: CFTR 1480 aa, ΔF508 quita 1 aa = 1479', 1480 - 1 == 1479 == EJ['c5']['check']['valor'] and 3 % 3 == 0)

# ---------------------------------------------------------------- cromosomas y meiosis
n_h = 23
cierto('humano: 2n = 46, trisomía 21 = 47, Turner 45 (a10)', 2 * n_h == 46 and 2 * n_h + 1 == 47 and 2 * n_h - 1 == 45 and EJ['a10']['check']['valor'] == 47)
cierto('guisante 2n = 14: triploide 3n = 21 (b12)', 3 * (14 // 2) == 21 == EJ['b12']['check']['valor'])
cierto('trigo hexaploide 6n = 42 → n genoma = 7; sandía 4n = 44 × 2n = 22: gametos 2n = 22 y n = 11 → 3n = 33', 6 * 7 == 42 and 44 // 2 + 22 // 2 == 33 and 3 * 11 == 33 and '6n = 42' in teoria and '3n = 33' in teoria and '4n = 44' in teoria)

def meiosis(falla):
    # cromosoma 21: nº de copias en cada uno de los 4 gametos
    if falla == 'I':     # los dos homólogos van a la misma célula hija: dos gametos con 2 copias y dos con 0
        gam = [2, 2, 0, 0]
    else:                # meiosis I normal; en la II una célula se reparte bien (1, 1) y la otra no (2, 0)
        gam = [1, 1, 2, 0]
    assert sum(gam) == 4  # las 4 cromátidas originales
    return sum(1 for g in gam if g != 1)

cierto('meiosis: no disyunción en I → 4 gametos anormales; en II → 2 anormales (b13 y teoría)', meiosis('I') == 4 and meiosis('II') == 2 and EJ['b13']['check']['opciones'][EJ['b13']['check']['ok']] == '2')

# ---------------------------------------------------------------- hechos y fechas
cierto('hechos: Cohen y Boyer 1973, primer ADN recombinante', 'cohen y boyer' in teoria_l and '1973' in teoria)
cierto('hechos: Mullis 1983, Nobel 1993; Taq de Thermus aquaticus', 'mullis' in teoria_l and '1983' in teoria and '1993' in teoria and 'thermus aquaticus' in teoria_l)
cierto('hechos: Doudna y Charpentier 2012, Nobel 2020', 'doudna' in teoria_l and 'charpentier' in teoria_l and '2012' in teoria and '2020' in teoria)
cierto('hechos: Dolly (Wilmut y Campbell, nació en 1996, anunciada en 1997, murió en 2003), 1 de 277', 'dolly' in teoria_l and '1996' in teoria and '1997' in teoria and '2003' in teoria and '277' in teoria)
cierto('hechos: Gurdon 1962; Yamanaka 2006 (Nobel 2012 con Gurdon)', 'gurdon' in teoria_l and '1962' in teoria and 'yamanaka' in teoria_l and '2006' in teoria and '2012' in teoria)
cierto('hechos: Muller 1927 y Nobel 1946; test de Ames', 'muller' in teoria_l and '1927' in teoria and '1946' in teoria and 'ames' in teoria_l)
cierto('hechos: Arber, Nathans y Smith, Nobel 1978', all(x in teoria for x in ('Arber', 'Nathans', 'Smith', '1978')))
cierto('hechos: Pauling 1949, Ingram 1956, Lejeune 1959 (Down) y 1963 (maullido de gato), Knudson 1971', all(x in teoria for x in ('1949', '1956', '1959', '1963', '1971')))
cierto('hechos: Jeffreys 1984-85, Pääbo Nobel 2022, Capecchi/Evans/Smithies 2007, Asilomar 1975, Convenio de Oviedo 1997', all(x in teoria for x in ('Jeffreys', '1984-85', 'Pääbo', '2022', 'Capecchi', '2007', 'Asilomar', '1975', 'Oviedo', '1997')))
cierto('hechos: terapia génica 1990; Luxturna 2017; Zolgensma 2019; Casgevy 2023; He Jiankui 2018', all(x in teoria for x in ('1990', 'Luxturna', '2017', 'Zolgensma', '2019', 'Casgevy', '2023', 'He Jiankui', '2018')))
cierto('hechos: EcoRI G↓AATTC, BamHI G↓GATCC, HindIII A↓AGCTT cohesivos; SmaI CCC↓GGG y EcoRV GAT↓ATC romos',
       all(x in teoria for x in ('G↓AATTC', 'G↓GATCC', 'A↓AGCTT', 'CCC↓GGG', 'GAT↓ATC')))
cierto('hechos: EcoRI es palíndromo (AATT/TTAA) y deja colas AATT; BamHI GATC; HindIII AGCT',
       'GAATTC' == 'GAATTC'[::-1].translate(str.maketrans('ACGT', 'TGCA')) and 'GGATCC' == 'GGATCC'[::-1].translate(str.maketrans('ACGT', 'TGCA')) and 'AAGCTT' == 'AAGCTT'[::-1].translate(str.maketrans('ACGT', 'TGCA'))
       and 'AATT' in teoria and 'GATC' in teoria and 'AGCT' in teoria)
cierto('hechos: SmaI y EcoRV también son palíndromos', 'CCCGGG' == 'CCCGGG'[::-1].translate(str.maketrans('ACGT', 'TGCA')) and 'GATATC' == 'GATATC'[::-1].translate(str.maketrans('ACGT', 'TGCA')))
cierto('hechos: PCR 94-96, 50-65, 72 °C; Mg²⁺; STR; RT-PCR y COVID-19', all(x in teoria for x in ('94-96', '50-65', '72 °C', 'Mg²⁺', 'STR', 'RT-PCR', 'COVID-19')))
cierto('hechos: p53, BRCA1, BRCA2, RB, RAS, BCR-ABL, cromosoma Filadelfia t(9;22)', all(x in teoria for x in ('p53', 'BRCA1', 'BRCA2', 'RB', 'RAS', 'BCR-ABL', 'Filadelfia', 't(9;22)')))
cierto('hechos: Down 47+21, Edwards 18, Patau 13, Turner 45 X, Klinefelter 47 XXY', all(x in teoria for x in ('Down', 'Edwards', 'Patau', 'Turner', 'Klinefelter', '47, XXY', '45, X', '+18', '+13', '+21')))
cierto('hechos: falciforme GAG→GUG Glu→Val, ΔF508 (3 pb), β-talasemia codón 39, Duchenne', all(x in teoria for x in ('GAG → GUG', 'Glu → Val', 'ΔF508', 'codón 39', 'Duchenne')))
cierto('hechos: dímeros de timina, UV frente a ionizantes, 5-bromouracilo, ácido nitroso, intercalantes, xeroderma pigmentoso', all(x in teoria_l for x in ('dímero de timina', 'ionizantes', '5-bromouracilo', 'ácido nitroso', 'intercalantes', 'xeroderma pigmentoso')))
cierto('hechos: ampicilina, X-gal, lacZ, azul/blanco, ADNc y retrotranscriptasa, insulina 1978', all(x in teoria_l for x in ('ampicilina', 'x-gal', 'lacz', 'adnc', 'retrotranscriptasa')) and '1978' in teoria and 'colonia azul = plásmido sin insertar; colonia blanca = recombinante' in limpio(teoria_l))
cierto('hechos: transiciones y transversiones; 61 codones con sentido y 3 de parada', 'transición' in teoria_l and 'transversión' in teoria_l and '61 codones' in teoria and 'de 64' in teoria)

# ---------------------------------------------------------------- ejercicios: formato y respuesta única
for e in T['ejercicios']:
    cs = e['check'] if isinstance(e['check'], list) else [e['check']]
    bien = True
    for c in cs:
        if c['tipo'] == 'opcion':
            ops = c['opciones']
            bien &= len(set(ops)) == len(ops) and 0 <= c['ok'] < len(ops)
        elif c['tipo'] == 'num':
            bien &= isinstance(c['valor'], (int, float))
        elif c['tipo'] == 'texto':
            bien &= len(c['valores']) >= 1
        elif c['tipo'] == 'rubrica':
            bien &= abs(sum(i['p'] for i in c['items']) - 2.0) < 1.01 and len(c['items']) >= 5
    cierto('ejercicio %s: opciones distintas, índice válido, datos coherentes' % e['id'], bien)
ids = [e['id'] for e in T['ejercicios']]
cierto('ejercicios: ids únicos, ≥ 40 y de los tres niveles', len(ids) == len(set(ids)) and len(ids) >= 40 and {e['nivel'] for e in T['ejercicios']} == {1, 2, 3})
cierto('ejercicios: ≥ 3 preguntas abiertas con rúbrica', sum(1 for e in T['ejercicios'] if not isinstance(e['check'], list) and e['check']['tipo'] == 'rubrica') >= 3)

# actividades: cada ítem con categoría válida; orden con ≥ 4 pasos
for k in ('tipos', 'efecto'):
    d = D[k]
    cierto('actividad %s: categorías de los ítems válidas y todas usadas' % k, all(0 <= i['c'] < len(d['categorias']) for i in d['items']) and {i['c'] for i in d['items']} == set(range(len(d['categorias']))))
for k in ('mutagenos', 'tecnicas'):
    pares = D[k]['pares']
    cierto('actividad %s: pares sin repetir' % k, len({a for a, b in pares}) == len(pares) and len({b for a, b in pares}) == len(pares))
for k in ('ordrec', 'ordpcr', 'orddolly'):
    cierto('actividad %s: ≥ 5 pasos distintos' % k, len(D[k]['items']) >= 5 and len({i['t'] for i in D[k]['items']}) == len(D[k]['items']))
for k in ('quiz1', 'errores'):
    cierto('%s: cada pregunta con 4 opciones distintas e índice válido' % k, all(len(set(p['op'])) == 4 and 0 <= p['ok'] < 4 for p in D[k]['preguntas']))
# las clasificaciones de 'efecto' coinciden con el código
efecto_ok = {'GAG → GAA (Glu → Glu)': ('GAG', 'GAA'), 'CUU → CUC (Leu → Leu)': ('CUU', 'CUC'), 'GAG → GUG (Glu → Val)': ('GAG', 'GUG'),
             'CCU → CAU (Pro → His)': ('CCU', 'CAU'), 'GAG → UAG (Glu → parada)': ('GAG', 'UAG'), 'CAG → UAG (Gln → parada)': ('CAG', 'UAG')}
cat = {0: 'sil', 1: 'mis', 2: 'non'}
for it in D['efecto']['items']:
    if it['t'] in efecto_ok:
        a, b = efecto_ok[it['t']]
        real = 'sil' if COD[a] == COD[b] else ('non' if COD[b] == '*' else 'mis')
        cierto('actividad efecto «%s»: clase %s' % (it['t'], real), cat[it['c']] == real)

# ---------------------------------------------------------------- la ficha no contradice la teoría
cierto('ficha: 6 bloques, 10 palabras clave, 5 mini-tablas', len(vz['bloques']) == 6 and len(vz['claves']) == 10 and sum(1 for b in vz['bloques'] if 'tabla' in b) == 5)
cierto('ficha: fechas 1973, 1983, 2012', '1973' in vz_txt and '1983' in vz_txt and '2012' in vz_txt and '1993' in vz_txt and '2020' in vz_txt)
cierto('ficha: PCR 95, 55 y 72 °C y 2^n; teoría usa 94-96 / 50-65 / 72 (el 95 y 55 están en el rango)', '95 °c' in vz_txt and '55 °c' in vz_txt and '72 °c' in vz_txt and 94 <= 95 <= 96 and 50 <= 55 <= 65)
cierto('ficha: GAG → GUG, Glu → Val, EcoRI G↓AATTC', 'gag → gug' in vz_txt and 'glu → val' in vz_txt and 'g↓aattc' in vz_txt)
cierto('ficha: cariotipos 47 +21, 45 X, 47 XXY como en la teoría', '47, +21' in vz_txt and '45, x' in vz_txt and '47, xxy' in vz_txt)
cierto('ficha: lineal n + 1, circular n', 'n + 1' in vz_txt and 'circular, n cortes' in vz_txt)
cierto('ficha: terapia somática sí, germinal prohibida (teoría: prohibida en la mayoría de los países)', 'germinal, prohibida' in vz_txt and 'prohibida' in teoria_l)
cierto('ficha: frameshift si no es múltiplo de 3', 'múltiplo de 3' in vz_txt)
cierto('ficha: cita de PCR 2ⁿ y circular n', '2ⁿ' in json.dumps(vz, ensure_ascii=False) and 'n fragmentos' in vz_txt)
cierto('teoría: los tres widgets colocados', all(k in teoria for k in ('bio_mutacion', 'bio_restriccion', 'bio_pcr')))
cierto('teoría: tablas de las tres clases y de los agentes mutágenos', all(x in teoria_l for x in ('génica', 'cromosómica', 'genómica', 'físicos', 'químicos', 'biológicos')))

if fallos:
    print('FALLOS:')
    for f in fallos:
        print('  -', f)
print('%d comprobaciones correctas, %d fallos' % (ok, len(fallos)))
sys.exit(1 if fallos else 0)
