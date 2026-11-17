#!/usr/bin/env python3
"""
Verificación independiente de Biología II, tema 12 (Expresión génica).
No comparte código con la web: reconstruye el código genético desde cero (aminoácido → codones), traduce con un
traductor propio todas las secuencias de los ejercicios, del ejemplo resuelto y de los ejemplos del traductor, recalcula
longitudes de ARNm y pre-ARNm, números de codones y nucleótidos, la maduración (exones, intrones, poli-A), los estados
del operón lac (glucosa, lactosa, mutantes) y del trp, y comprueba hechos y fechas, que cada ejercicio tenga una única
respuesta correcta y que la ficha no contradiga la teoría.

Convenciones declaradas: código genético estándar (tabla de 64 codones: 61 con sentido y 3 de parada); cola poli-A de 200 A;
modelo de maduración de 4 exones (90, 120, 60, 150 nt) y 3 intrones (400, 800, 300 nt); ARN polimerasa bacteriana ≈ 40 nt/s.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_bio2_t12.py /tmp/ampl.json
"""
import json, math, os, re, subprocess, sys
from fractions import Fraction as F
from itertools import product

ok, fallos = 0, []


def cierto(nombre, cond):
    global ok
    if cond:
        ok += 1
    else:
        fallos.append(nombre)


def limpio(s):
    return re.sub(r'<[^>]+>', '', s)


def norm(s):
    return limpio(s).lower().replace('−', '-')


datos = json.load(open(sys.argv[1]))
T = datos['ampl']['bio2']['t12']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = norm(teoria)
vz = T['vistazo']
vz_txt = norm(json.dumps(vz, ensure_ascii=False))
D = T['datos']
RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
labruta = os.path.join(RAIZ, 'ampliaciones', 'lab_bio_t12.js')
lab = open(labruta, encoding='utf-8').read()

# ---------------------------------------------------------------- código genético reconstruido desde cero
POR_AA = {
    'Phe': ['UUU', 'UUC'], 'Leu': ['UUA', 'UUG', 'CUU', 'CUC', 'CUA', 'CUG'], 'Ile': ['AUU', 'AUC', 'AUA'], 'Met': ['AUG'],
    'Val': ['GUU', 'GUC', 'GUA', 'GUG'], 'Ser': ['UCU', 'UCC', 'UCA', 'UCG', 'AGU', 'AGC'], 'Pro': ['CCU', 'CCC', 'CCA', 'CCG'],
    'Thr': ['ACU', 'ACC', 'ACA', 'ACG'], 'Ala': ['GCU', 'GCC', 'GCA', 'GCG'], 'Tyr': ['UAU', 'UAC'], 'His': ['CAU', 'CAC'],
    'Gln': ['CAA', 'CAG'], 'Asn': ['AAU', 'AAC'], 'Lys': ['AAA', 'AAG'], 'Asp': ['GAU', 'GAC'], 'Glu': ['GAA', 'GAG'],
    'Cys': ['UGU', 'UGC'], 'Trp': ['UGG'], 'Arg': ['CGU', 'CGC', 'CGA', 'CGG', 'AGA', 'AGG'], 'Gly': ['GGU', 'GGC', 'GGA', 'GGG'],
    'Stop': ['UAA', 'UAG', 'UGA']}
CODON = {c: aa for aa, cs in POR_AA.items() for c in cs}
cierto('código reconstruido: 64 codones distintos, 61 con sentido y 3 de parada',
       len(CODON) == 64 and set(CODON) == {''.join(t) for t in product('UCAG', repeat=3)} and sum(1 for a in CODON.values() if a != 'Stop') == 61
       and sum(1 for a in CODON.values() if a == 'Stop') == 3)
cierto('20 aminoácidos con sentido', len(POR_AA) - 1 == 20)
cierto('degeneración: Leu, Ser y Arg 6; Met y Trp 1; Ile 3; el resto 2 o 4',
       all(len(POR_AA[a]) == 6 for a in ('Leu', 'Ser', 'Arg')) and all(len(POR_AA[a]) == 1 for a in ('Met', 'Trp')) and len(POR_AA['Ile']) == 3
       and sum(len(v) for k, v in POR_AA.items() if k != 'Stop') == 61)
cierto('tripletes: 4^1 = 4 < 20, 4^2 = 16 < 20 ≤ 4^3 = 64', 4 ** 1 < 20 and 4 ** 2 == 16 < 20 <= 4 ** 3 == 64)
# el diccionario del widget (cadena compacta en orden UCAG) coincide con el reconstruido
tabla_js = re.search(r'var TABLA = "([A-Z*]{64})"', lab).group(1)
UNA = {'F': 'Phe', 'L': 'Leu', 'S': 'Ser', 'Y': 'Tyr', 'C': 'Cys', 'W': 'Trp', 'P': 'Pro', 'H': 'His', 'Q': 'Gln', 'R': 'Arg', 'I': 'Ile', 'M': 'Met',
       'T': 'Thr', 'N': 'Asn', 'K': 'Lys', 'V': 'Val', 'A': 'Ala', 'D': 'Asp', 'E': 'Glu', 'G': 'Gly', '*': 'Stop'}
js = {''.join(c): UNA[tabla_js[i]] for i, c in enumerate(product('UCAG', repeat=3))}
cierto('widget: tabla compacta idéntica a la reconstruida (los 64 codones)', js == CODON)
nombres_js = dict(re.findall(r'"?(\w|\*)"?: \["(\w+)", "', lab))
cierto('widget: tres letras de los 21 símbolos correctas', all(nombres_js.get(k) == v for k, v in UNA.items()))
# la tabla impresa en la teoría
fallos_tabla = [c for c, a in CODON.items() if (c + ' <b>' + a + '</b>') not in teoria]
cierto('teoría: tabla del código con los 64 codones correctos (faltan %s)' % fallos_tabla[:3], not fallos_tabla)

# ---------------------------------------------------------------- traductor propio
COMP_ADN = {'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C'}


def codificante_de_molde(molde_3a5):
    return ''.join(COMP_ADN[b] for b in molde_3a5)      # molde escrita 3'→5' → codificante 5'→3'


def aarn(cod):
    return cod.replace('T', 'U')


def traducir(arn):
    i = arn.find('AUG')
    if i < 0:
        return None, []
    prot, par = [], False
    for j in range(i, len(arn) - 2, 3):
        a = CODON[arn[j:j + 3]]
        if a == 'Stop':
            par = True
            break
        prot.append(a)
    return i, prot


def anticodon(codon):
    return ''.join({'A': 'U', 'U': 'A', 'G': 'C', 'C': 'G'}[b] for b in codon)


# ---------------------------------------------------------------- ejemplo resuelto de la teoría
molde = 'TACAAACCGTTTATT'
arn = aarn(codificante_de_molde(molde))
cierto('ejemplo: molde → ARNm AUGUUUGGCAAAUAA', arn == 'AUGUUUGGCAAAUAA' and ('A U G U U U G G C A A A U A A' in teoria) and 'AUGUUUGGCAAAUAA' in teoria)
ini, prot = traducir(arn)
cierto('ejemplo: péptido Met-Phe-Gly-Lys (4 aa, 5 codones)', ini == 0 and prot == ['Met', 'Phe', 'Gly', 'Lys'] and 'Met-Phe-Gly-Lys' in teoria and len(arn) == 15 == 5 * 3)
molde_m = 'TACAAACCGTTTACT'
arn_m = aarn(codificante_de_molde(molde_m))
cierto('ejemplo: la mutación cambia UAA por UGA y el péptido es el mismo', arn_m[-3:] == 'UGA' and CODON['UGA'] == CODON['UAA'] == 'Stop' and traducir(arn_m)[1] == prot)
cierto('ejemplo: 150 aa → 453 nt codificantes y 2453 nt con 2000 nt de intrones', 3 * (150 + 1) == 453 and 453 + 2000 == 2453 and '453 nt' in teoria and '2453 nt' in teoria)
cierto('fórmula 3(n+1) y 3n para n = 100', 3 * (100 + 1) == 303 and 3 * 100 == 300)
# mutaciones de la tabla de la teoría
cierto('mutaciones: GAA→GAG silenciosa (Glu→Glu); GAA→GUA Glu→Val; CAA→UAA Gln→parada',
       CODON['GAA'] == CODON['GAG'] == 'Glu' and CODON['GUA'] == 'Val' and CODON['CAA'] == 'Gln' and CODON['UAA'] == 'Stop'
       and all(x in teoria for x in ('GAA → GAG (Glu → Glu)', 'GAA → GUA (Glu → Val)', 'CAA → UAA (Gln → parada)')))
orig = 'AUGGAACCC'
fs = orig[:3] + orig[4:]                                          # se pierde la 4.ª base
cierto('cambio de fase: AUGGAACCC sin la 4.ª base = AUG AAC CC; cambian los aminoácidos siguientes',
       fs == 'AUGAACCC' and [CODON[fs[i:i + 3]] for i in range(0, 6, 3)] == ['Met', 'Asn'] and CODON['GAA'] == 'Glu' and 'AUG AAC CC' in teoria)
cierto('Nirenberg: UUU = Phe; poli-A = Lys (AAA); poli-C = Pro (CCC)', CODON['UUU'] == 'Phe' and CODON['AAA'] == 'Lys' and CODON['CCC'] == 'Pro')
cierto('anticodón de AUG es UAC y de GGC es CCG', anticodon('AUG') == 'UAC' and anticodon('GGC') == 'CCG')
cierto('teoría: 5\'-AUG-3\' / 3\'-UAC-5\'', "3'-UAC-5'" in teoria and "5'-AUG-3'" in teoria)

# ---------------------------------------------------------------- widgets: se ejecuta el código real de la web con node y se contrasta
nodo = r"""
const fs=require('fs'),vm=require('vm');
const sb={console};sb.window=undefined;
sb.BACHI={ui:{},w:{},h:{},caja:()=>{}};
vm.createContext(sb);
vm.runInContext(fs.readFileSync(process.argv[1],'utf8'),sb);
const L=sb.BACHI.lab.bio12;
const out={tr:{}, lac:[], trp:[], lon:{}};
for (const [k,s] of Object.entries({corto:'ATGTTTGGCAAAGATTGA',utr:'GGCATGGCCGAGCTGTAAC',stop:'ATGGCTTGGTAATTTGGCCAT'})) {
  const t=L.traducir(L.aARN(s)); out.tr[k]={ini:t.ini,aa:t.aa.map(a=>L.AA[a][0]),parada:t.parada};
}
for (const g of [true,false]) for (const l of [true,false]) for (const m of ['wt','I','O']) out.lac.push([g,l,m,L.estadoLac(g,l,m)]);
for (const t of [true,false]) out.trp.push([t,L.estadoTrp(t)]);
for (const o of [-1,0,1,2,3]) out.lon[o]=L.longitudes(o);
out.anti=['AUG','GGC','UUU'].map(c=>L.anticodon(c));
out.comp=L.comp('TACAAACCG');
process.stdout.write(JSON.stringify(out));
"""
r = subprocess.run(['node', '-e', nodo, labruta], capture_output=True, text=True)
cierto('node ejecuta el laboratorio sin error (%s)' % r.stderr[:80], r.returncode == 0 and r.stdout)
W = json.loads(r.stdout) if r.stdout else {'tr': {}, 'lac': [], 'trp': [], 'lon': {}, 'anti': [], 'comp': ''}
PRE = {'corto': 'ATGTTTGGCAAAGATTGA', 'utr': 'GGCATGGCCGAGCTGTAAC', 'stop': 'ATGGCTTGGTAATTTGGCCAT'}
for k, s in PRE.items():
    i, p = traducir(aarn(s))
    cierto('traductor «%s»: AUG en %s y péptido %s' % (k, i, p), W['tr'].get(k) == {'ini': i, 'aa': p, 'parada': True})
cierto('traductor: 1.er ejemplo = Met-Phe-Gly-Lys-Asp; 2.º = Met-Ala-Glu-Leu con 3 nt antes del AUG; 3.º = Met-Ala-Trp',
       traducir(aarn(PRE['corto']))[1] == ['Met', 'Phe', 'Gly', 'Lys', 'Asp'] and traducir(aarn(PRE['utr'])) == (3, ['Met', 'Ala', 'Glu', 'Leu'])
       and traducir(aarn(PRE['stop']))[1] == ['Met', 'Ala', 'Trp'])
cierto('widget: anticodones AUG→UAC, GGC→CCG, UUU→AAA y molde TACAAACCG → ATGTTTGGC',
       W['anti'] == [anticodon('AUG'), anticodon('GGC'), anticodon('UUU')] and W['comp'] == 'ATGTTTGGC' == codificante_de_molde('TACAAACCG'))

# operón lac: modelo propio. nivel 0 ninguna, 1 baja, 2 alta
def lac_modelo(glu, lac, geno):
    represor_activo = (geno != 'I')                     # lacI⁻: sin represor
    operador_ok = (geno != 'O')                         # lacOᶜ: el represor no se une
    inactivado = lac                                    # la alolactosa inactiva al represor
    bloquea = represor_activo and operador_ok and not inactivado
    return (0 if bloquea else (1 if glu else 2))


for g, l, m, est in W['lac']:
    cierto('lac glucosa=%s lactosa=%s %s: nivel %s' % (g, l, m, lac_modelo(g, l, m)), est['nivel'] == lac_modelo(g, l, m) and est['cap'] == (not g)
           and est['bloquea'] == (lac_modelo(g, l, m) == 0))
cierto('lac normal: 4 casos de la tabla de la teoría (ninguna, baja, ninguna, alta)',
       [lac_modelo(g, l, 'wt') for g, l in ((True, False), (True, True), (False, False), (False, True))] == [0, 1, 0, 2]
       and teoria.count('<b>baja</b>') >= 1 and teoria.count('<b>alta</b>') >= 1)
cierto('lac mutantes: lacI⁻ y lacOᶜ sin lactosa están encendidos (constitutivos)',
       lac_modelo(False, False, 'I') == 2 and lac_modelo(False, False, 'O') == 2 and lac_modelo(True, False, 'I') == 1)
for t, est in W['trp']:
    cierto('trp triptófano=%s: %s' % (t, 'apagado' if t else 'encendido'), est['nivel'] == (0 if t else 2) and est['bloquea'] == t)
cierto('operón trp tiene 5 genes (E, D, C, B, A) y el lac 3 (Z, Y, A)', all(g in teoria for g in ('trpE', 'trpD', 'trpC', 'trpB', 'trpA')) and all(g in teoria for g in ('lacZ', 'lacY', 'lacA')))

# maduración
EXON, INTR, POLYA = [90, 120, 60, 150], [400, 800, 300], 200
cierto('widget: usa los exones, intrones y poli-A declarados',
       'EXON = [90, 120, 60, 150]' in lab and 'INTR = [400, 800, 300]' in lab and 'POLYA = 200' in lab)
for o, esp in (('-1', None), ('0', 0), ('1', 1), ('2', 2), ('3', 3)):
    omit = None if esp is None else esp
    ex = sum(e for i, e in enumerate(EXON) if i != omit)
    L = W['lon'][o]
    cierto('maduración omite exón %s: pre %d, exones %d, madura %d, codones %d' % (omit, 1920, ex, ex + POLYA, ex // 3),
           L['pre'] == sum(EXON) + sum(INTR) == 1920 and L['ex'] == ex and L['madura'] == ex + POLYA and L['aa'] == ex / 3 and ex % 3 == 0)
cierto('maduración: 420 nt de exones = 140 codones; sin el exón 2 → 300 (100); sin el 3 → 360 (120)',
       sum(EXON) == 420 and 420 // 3 == 140 and (420 - 120) // 3 == 100 and (420 - 60) // 3 == 120)
cierto('maduración: 1500 nt de intrones', sum(INTR) == 1500)

# ---------------------------------------------------------------- ejercicios con secuencias
def seq(txt, patron):
    return re.search(patron, limpio(txt)).group(1)


val = lambda e: EJ[e]['check']['valor']
tv = lambda e: [norm(v) for v in EJ[e]['check']['valores']]
op = lambda e, i=0: (EJ[e]['check'] if not isinstance(EJ[e]['check'], list) else EJ[e]['check'][i])
opok = lambda e, i=0: op(e, i)['opciones'][op(e, i)['ok']]
opts = lambda e, i=0: op(e, i)['opciones']


def tres(prot):
    return '-'.join(prot)


cod = seq(EJ['b8']['enunciado'], r"5'-([ACGT]+)-3'")
cierto('b8: codificante %s → ARNm %s' % (cod, aarn(cod)), norm(aarn(cod)) in tv('b8') and cod == 'ATGGCA')
mol = seq(EJ['b9']['enunciado'], r"3'-([ACGT]+)-5'")
cierto('b9: molde %s → ARNm %s' % (mol, aarn(codificante_de_molde(mol))), norm(aarn(codificante_de_molde(mol))) in tv('b9'))
cierto('b14: AUG → metionina', CODON['AUG'] == 'Met' and 'metionina' in tv('b14'))
cierto('b16: 4^3 = 64', val('b16') == 4 ** 3 == 64)
cierto('c1: 100 aa → 300 nt; c2: 100 aa + parada → 303 nt', val('c1') == 3 * 100 and val('c2') == 3 * 101)
a3 = seq(EJ['c3']['enunciado'], r"5'-([ACGU]+)-3'")
i3, p3 = traducir(a3)
cierto('c3: %s → %s' % (a3, tres(p3)), opok('c3') == tres(p3) and sum(o == tres(p3) for o in opts('c3')) == 1 and i3 == 0 and len(set(opts('c3'))) == 4)
m4 = seq(EJ['c4']['enunciado'], r"3'-([ACGT]+)-5'")
a4 = aarn(codificante_de_molde(m4))
i4, p4 = traducir(a4)
ingenuo = [CODON[aarn(m4)[j:j + 3]] for j in range(0, len(m4), 3)]
cierto('c4: %s → %s → %s' % (m4, a4, tres(p4)), opok('c4') == tres(p4) and sum(o == tres(p4) for o in opts('c4')) == 1 and 'Tyr-Phe-Pro-Ile' in opts('c4') and tres(ingenuo) == 'Tyr-Phe-Pro-Ile')
cierto('c5: anticodón de GGC = CCG', 'ccg' in tv('c5') and anticodon('GGC') == 'CCG')
cierto('c6: GAA y GAG codifican Glu (es falso que cambie)', EJ['c6']['check'][0]['ok'] == 1 and CODON['GAA'] == CODON['GAG'] and 'glutámico' in EJ['c6']['check'][1]['opciones'][EJ['c6']['check'][1]['ok']])
cierto('c7: 150 + 210 + 90 = 450; c8: + 500 + 700 = 1650; c9: 450/3 − 1 = 149',
       val('c7') == 150 + 210 + 90 == 450 and val('c8') == 450 + 500 + 700 == 1650 and val('c9') == 450 // 3 - 1 == 149 and 450 % 3 == 0)
cierto('c12: con glucosa y sin lactosa el lac está apagado (falso que esté activo)', lac_modelo(True, False, 'wt') == 0 and EJ['c12']['check'][0]['ok'] == 1)
cierto('c13: lacI⁻ sin lactosa fabrica la enzima siempre', lac_modelo(True, False, 'I') > 0 and 'se fabrica aunque no haya lactosa' in opok('c13').lower())
cierto('c16: 1200 / 40 = 30 s', val('c16') == F(1200, 40) == 30)
cierto('d1: (250 + 1)·3 + 80 + 220 = 1053; d2: 1053 + 1900 = 2953', val('d1') == 3 * 251 + 80 + 220 == 1053 and val('d2') == 1053 + 1900 == 2953)
a5 = seq(EJ['d3']['enunciado'], r"5'-([ACGU]+)-3'")
i5, p5 = traducir(a5)
lectura1 = [CODON[a5[j:j + 3]] for j in range(0, len(a5) - 2, 3)]
cierto('d3: %s → AUG en %d → %s; trampa leyendo desde el nt 1 = %s' % (a5, i5 + 1, tres(p5), tres([x for x in lectura1])),
       i5 == 2 and opok('d3') == tres(p5) and sum(o == tres(p5) for o in opts('d3')) == 1 and 'Ala-Trp-Asn-Pro-Ser' in opts('d3') and tres(lectura1) == 'Ala-Trp-Asn-Pro-Ser')
a6 = seq(EJ['d4']['enunciado'], r"5'-([ACGU]+)-3'")
cierto('d4: original %s = Met-Glu-Gln-Phe' % a6, traducir(a6)[1] == ['Met', 'Glu', 'Gln', 'Phe'])
mut = a6[:6] + 'U' + a6[7:]                                       # base 7 (C) pasa a U
cierto('d4: la base 7 es C y la mutada da Met-Glu (sin sentido)', a6[6] == 'C' and traducir(mut)[1] == ['Met', 'Glu'] and CODON[mut[6:9]] == 'Stop'
       and EJ['d4']['check'][0]['opciones'][EJ['d4']['check'][0]['ok']] == 'Met-Glu' and EJ['d4']['check'][1]['opciones'][EJ['d4']['check'][1]['ok']] == 'Sin sentido')
cierto('d4: otros péptidos de las opciones no coinciden con el correcto', sum(o == 'Met-Glu' for o in opts('d4', 0)) == 1)
cierto('d5: 120 aa → 119 enlaces', val('d5') == 120 - 1)
cierto('d6: U del ARNm = A de la molde = 28 % (suman 100)', val('d6') == 28 and 28 + 22 + 30 + 20 == 100)
cierto('d7: lacI⁻ (represor difusible) la complementa; lacOᶜ no', opok('d7').startswith('lacI⁻') and lac_modelo(True, False, 'I') > 0)
cierto('d8: la copia lacI⁺ aporta represor difusible → regulación normal', EJ['d8']['check'][0]['ok'] == 0 and 'difusible' in EJ['d8']['check'][1]['opciones'][EJ['d8']['check'][1]['ok']])
cierto('b11/b12/b15: intrones, extremo 3′ y alolactosa', opok('b11') == 'Los intrones' and opok('b12') == "3'" and 'alolactosa' in opok('b15'))

# ---------------------------------------------------------------- estructura de los ejercicios
niveles = {1: 0, 2: 0, 3: 0}
ids = set()
for e in T['ejercicios']:
    niveles[e['nivel']] += 1
    cierto('id único %s' % e['id'], e['id'] not in ids)
    ids.add(e['id'])
    chk = e['check'] if isinstance(e['check'], list) else [e['check']]
    for c in chk:
        if c['tipo'] == 'opcion':
            o = c['opciones']
            cierto('%s: opciones distintas y ok válido' % e['id'], len(set(o)) == len(o) and 0 <= c['ok'] < len(o))
        elif c['tipo'] == 'texto':
            cierto('%s: valores de texto' % e['id'], len(c['valores']) >= 1)
        elif c['tipo'] == 'num':
            cierto('%s: valor numérico' % e['id'], isinstance(c['valor'], (int, float)))
        elif c['tipo'] == 'rubrica':
            cierto('%s: rúbrica con 5 ítems y pesos que suman 2' % e['id'], len(c['items']) == 5 and abs(sum(i['p'] for i in c['items']) - 2.0) < 1e-9)
cierto('≥ 40 ejercicios: %d (%s)' % (len(T['ejercicios']), niveles), len(T['ejercicios']) >= 40 and all(v >= 10 for v in niveles.values()))
cierto('5 preguntas abiertas con rúbrica', sum(1 for e in T['ejercicios'] if not isinstance(e['check'], list) and e['check']['tipo'] == 'rubrica') == 5)

# ---------------------------------------------------------------- actividades
PRO = {'Splicing de intrones': 1, 'ARNm policistrónico': 0, 'Ribosomas 70S': 0, 'Ribosomas 80S': 1, 'Transcripción y traducción simultáneas': 0,
       'Caperuza y cola poli-A': 1, 'Primer aminoácido: formilmetionina': 0, 'Factores de transcripción generales': 1, 'Código genético de tripletes': 2,
       "Síntesis del ARN en sentido 5'→3'": 2}
cierto('proeuc: cada ítem en la categoría correcta (hechos de la teoría)', {i['t']: i['c'] for i in D['proeuc']['items']} == PRO)
OPER = {'Inducible': 0, 'Reprimible': 1, 'La alolactosa inactiva al represor': 0, 'El triptófano activa al represor (correpresor)': 1, 'Regulación positiva por CAP-AMPc': 0,
        'Está encendido cuando falta el triptófano': 1, 'Tiene promotor, operador y genes estructurales': 2, 'El represor se une al operador para apagarlo': 2,
        'Controla una ruta de síntesis': 1, 'Controla una ruta de degradación': 0}
cierto('operones: cada ítem en la categoría correcta', {i['t']: i['c'] for i in D['operones']['items']} == OPER)
cierto('operones coherente con el modelo: trp encendido sin Trp y lac apagado sin lactosa', W['trp'][1][1]['nivel'] == 2 and lac_modelo(True, False, 'wt') == 0)
for k in ('proeuc', 'operones'):
    its = D[k]['items']
    cierto('%s: ítems únicos y todas las categorías usadas' % k, len({i['t'] for i in its}) == len(its) and set(i['c'] for i in its) == set(range(len(D[k]['categorias']))))
for k in ('arn', 'codigo'):
    pr = D[k]['pares']
    cierto('%s: 6 pares con claves y valores distintos' % k, len(pr) == 6 and len({p[0] for p in pr}) == 6 and len({p[1] for p in pr}) == 6)
cierto('codigo: AUG inicio y metionina; UAA, UAG y UGA de parada', any(p[0] == 'AUG' and 'metionina' in p[1] for p in D['codigo']['pares'])
       and any(p[0] == 'UAA, UAG y UGA' and 'parada' in p[1] for p in D['codigo']['pares']) and CODON['AUG'] == 'Met')
od = [i['t'] for i in D['ordentrad']['items']]
cierto('ordentrad: subunidad pequeña/AUG → grande → entra ARNt → enlace → translocación → liberación',
       'pequeña' in od[0] and 'grande' in od[1] and 'sitio A' in od[2] and 'enlace peptídico' in od[3] and 'translocación' in od[4] and 'parada' in od[5] and len(od) == 6)
for k in ('quiz1', 'errores'):
    for i, q in enumerate(D[k]['preguntas']):
        cierto('%s[%d]: opciones distintas y ok válido' % (k, i), len(set(q['op'])) == len(q['op']) and 0 <= q['ok'] < len(q['op']) and q.get('porque'))
cierto('errores: todas preguntan por la afirmación FALSA', all('FALSA' in q['q'] for q in D['errores']['preguntas']))
q1 = D['quiz1']['preguntas']
cierto('quiz1[1]: ATGGCA → AUGGCA y es la única opción correcta', q1[1]['op'][q1[1]['ok']] == "5'-" + aarn('ATGGCA') + "-3'" and "5'-UACCGU-3'" in q1[1]['op'])
cierto('quiz1[4]: anticodón de AUG = 3\'-UAC-5\' (única)', q1[4]['op'][q1[4]['ok']] == "3'-" + anticodon('AUG') + "-5'" and sum(o == "3'-UAC-5'" for o in q1[4]['op']) == 1)
cierto('quiz1: 8 preguntas y las correctas esperadas',
       len(q1) == 8 and 'ARN polimerasa' == q1[0]['op'][q1[0]['ok']] and 'intrones' in q1[2]['op'][q1[2]['ok']] and 'varios codones' in q1[3]['op'][q1[3]['ok']]
       and 'factor de liberación' in q1[5]['op'][q1[5]['ok']] and 'represor' in q1[6]['op'][q1[6]['ok']] and 'ADN a partir de su ARN' in q1[7]['op'][q1[7]['ok']])
ER = {0: 'cebador', 1: 'intrones no se transcriben', 2: 'varios aminoácidos', 3: 'ARNt reconoce el codón de parada', 4: 'glucosa inactiva', 5: 'núcleo', 6: 'nunca puede pasar'}
for i, k in ER.items():
    q = D['errores']['preguntas'][i]
    cierto('errores[%d]: la falsa contiene «%s»' % (i, k), norm(k) in norm(q['op'][q['ok']]))
cierto('tarjetas: 15 cartas con a y b', len(D['tarjetas1']['cartas']) == 15 and all(c['a'] and c['b'] for c in D['tarjetas1']['cartas']))

# ---------------------------------------------------------------- hechos y fechas
HECHOS = [('Crick', '1958'), ('Temin y Baltimore', '1970'), ('Prusiner', '1982'), ('Nirenberg y Matthaei', '1961'), ('Jacob y Monod', '1961'), ('Brenner', '1961')]
for n, a in HECHOS:
    cierto('hecho %s %s en la teoría' % (n, a), n.lower() in teoria_l and a in teoria)
cierto('Nobel: Jacob y Monod 1965; Nirenberg, Khorana y Holley 1968', '1965' in teoria and '1968' in teoria and all(x in teoria_l for x in ('khorana', 'holley')))
cierto('hechos: ribosomas 70S (30S+50S) y 80S (40S+60S); formilmetionina; Shine-Dalgarno',
       all(x in teoria for x in ('70S', '30S', '50S', '80S', '40S', '60S')) and 'formilmetionina' in teoria_l and 'shine-dalgarno' in teoria_l)
cierto('hechos: sitios A, P y E; peptidil transferasa; factor de liberación; translocación',
       all(x in teoria_l for x in ('peptidil transferasa', 'factor de liberación', 'translocación', 'sitio a')) and 'exit' in teoria_l)
cierto('hechos: caperuza (7-metilguanosina) en 5\', cola poli-A en 3\', splicing y espliceosoma, splicing alternativo',
       all(x in teoria_l for x in ('7-metilguanosina', 'poli-a', 'espliceosoma', 'splicing alternativo')))
cierto('hechos: alolactosa, CAP, AMPc, represor, operador, β-galactosidasa, permeasa, correpresor',
       all(x in teoria_l for x in ('alolactosa', 'cap', 'ampc', 'represor', 'operador', 'β-galactosidasa', 'permeasa', 'correpresor')))
cierto('hechos: tres ARN polimerasas eucariotas (I ARNr, II ARNm, III ARNt) y factor sigma', all(x in teoria for x in ('factor sigma', 'ARNr', 'ARNt')) and 'tres (i: arnr; ii: arnm; iii: arnt)' in teoria_l)
cierto('hechos: transcriptasa inversa, VIH, ARN replicasa, priones', all(x in teoria_l for x in ('transcriptasa inversa', 'vih', 'replicasa', 'priones')))
cierto('hechos: mitocondrias, UGA = triptófano (excepción de universalidad)', 'mitocondrias' in teoria_l and 'uga codifica triptófano' in teoria_l and CODON['UGA'] == 'Stop' and CODON['UGG'] == 'Trp')
cierto('teoría: 3 widgets colocados', all(k in teoria for k in ('bio_maduracion', 'bio_traductor', 'bio_operon')))
cierto('teoría: 15–20 aa/s en E. coli y ARNt de 75–90 nt (órdenes de magnitud declarados)', '15–20' in teoria and '75–90' in teoria)

# ---------------------------------------------------------------- la ficha no contradice la teoría
cierto('ficha: 6 bloques, 10 palabras clave, 4 mini-tablas', len(vz['bloques']) == 6 and len(vz['claves']) == 10 and sum(1 for b in vz['bloques'] if 'tabla' in b) == 4)
cierto('ficha: fechas 1958 y 1961 coherentes con la teoría', '1958' in vz_txt and '1961' in vz_txt and 'crick' in vz_txt and 'jacob y monod' in vz_txt and 'nirenberg y matthaei' in vz_txt)
cierto('ficha: 64 codones, 61 con sentido y 3 de parada', '64' in vz_txt and '61 con sentido' in vz_txt and '3 de parada' in vz_txt and 4 ** 3 == 64)
cierto('ficha: AUG inicio, UAA, UAG, UGA parada, UUU Phe', 'aug' in vz_txt and 'uaa, uag, uga' in vz_txt and 'uuu' in vz_txt and CODON['UUU'] == 'Phe')
cierto('ficha: transcripción 5\'→3\' y U en lugar de T', "5'→3'" in vz_txt and 'la t pasa a u' in vz_txt and 'no necesita cebador' in vz_txt)
cierto('ficha: caperuza 5\', poli-A 3\', splicing, retrovirus VIH', all(x in vz_txt for x in ('caperuza 5', 'poli-a en 3', 'splicing', 'vih')))
cierto('ficha: lac inducible y trp reprimible; lac se enciende con lactosa y sin glucosa; trp sin triptófano',
       'lac (inducible)' in vz_txt and 'trp (reprimible)' in vz_txt and 'hay lactosa y falta glucosa' in vz_txt and 'falta triptófano' in vz_txt
       and lac_modelo(False, True, 'wt') == 2 and W['trp'][1][1]['nivel'] == 2)
cierto('ficha: cada palabra clave aparece también en la teoría',
       all(norm(k).split('/')[0].strip() in teoria_l for k, _ in vz['claves'] if k != 'Exón / intrón') and 'exón' in teoria_l and 'intrón' in teoria_l)
cierto('ficha: palabras clave con definición no vacía y sin duplicados', all(d for _, d in vz['claves']) and len({k for k, _ in vz['claves']}) == 10)

if fallos:
    print('FALLOS:')
    for f in fallos:
        print('  -', f)
print('%d comprobaciones correctas, %d fallos' % (ok, len(fallos)))
sys.exit(1 if fallos else 0)
