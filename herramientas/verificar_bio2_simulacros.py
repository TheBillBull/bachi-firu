#!/usr/bin/env python3
"""
Verificación independiente de los simulacros de Biología II (sim6, sim7, sim8).

Cada cifra se recalcula desde los datos del enunciado (fractions / math / sympy) y se comprueba que el valor,
redondeado como en el texto, aparece en la solución de esa pregunta. Además:
  - formato PAU Madrid 2026: 5 preguntas (1 obligatoria competencial + pares 2A/2B ... 5A/5B), 90 min, 2 puntos cada una,
    apartados en múltiplos de 0,1 que suman 2,0; URL oficial citada y «reparto deducido» declarado;
  - la traducción (transcripción, código genético, mutaciones), los sitios de restricción, Hardy-Weinberg, el balance de ATP,
    las probabilidades mendelianas (se enumeran los cruces con fractions) y la χ² se calculan por algoritmo;
  - cobertura de los 16 temas (palabras clave) entre los tres simulacros.

Uso:  sh build.sh && python3 herramientas/verificar_bio2_simulacros.py        (necesita: pip install sympy)
"""
import json, os, re, subprocess, math, itertools
from fractions import Fraction as F
import sympy as sp
from decimal import Decimal, ROUND_HALF_UP

RAIZ = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
ok, fallos = 0, []
def comprobar(nombre, cond, det=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {det}')

JS = r"""
const fs = require('fs'), vm = require('vm'), noop = () => {};
const el = () => ({ setAttribute: noop, appendChild: noop, style: {}, classList: { add: noop, remove: noop } });
const sb = { console, document: { addEventListener: noop, createElementNS: el, createElement: el, getElementById: () => null, head: el(), body: el() },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sb.window = sb; vm.createContext(sb);
vm.runInContext(fs.readFileSync(process.argv[1] + '/ampliaciones/bachi.js', 'utf8'), sb);
console.log(JSON.stringify(sb.BACHI.ampl.bio2._simulacros));
"""
SIM = {s['id']: s for s in json.loads(subprocess.check_output(['node', '-e', JS, RAIZ]))}
comprobar('ids', sorted(SIM) == ['sim6', 'sim7', 'sim8'], str(sorted(SIM)))
def limpio(t): return re.sub(r'<[^>]+>', '', t).replace('&lt;', '<').replace('&gt;', '>').replace(' ', ' ')
def texto(s, i, parte='solucion'): return limpio(SIM[s]['bloques'][i][parte])
def es(x, dec): return f'{x:.{dec}f}'.replace('.', ',')
def en(s, i, cadena, nombre): comprobar(f'{s} p{i} {nombre}', cadena in texto(s, i), f'(falta «{cadena}»)')
def enE(s, i, cadena, nombre): comprobar(f'{s} p{i} enunciado {nombre}', cadena in texto(s, i, 'enunciado'), f'(falta «{cadena}»)')

# ---------------------------------------------------------- estructura
ETIQ = ['Pregunta 1 (obligatoria)', 'Pregunta 2A', 'Pregunta 2B', 'Pregunta 3A', 'Pregunta 3B', 'Pregunta 4A', 'Pregunta 4B', 'Pregunta 5A', 'Pregunta 5B']
for s in SIM.values():
    sid = s['id']
    comprobar(f'{sid} 9 enunciados de 2 puntos', len(s['bloques']) == 9 and all(b['puntos'] == 2 for b in s['bloques']))
    comprobar(f'{sid} etiquetas 1, 2A, 2B, ..., 5B', [b['titulo'].split(' · ')[0] for b in s['bloques']] == ETIQ)
    comprobar(f'{sid} instrucciones: 90 min, 5 preguntas, reparto deducido y URL UAM',
              all(x in s['bloques'][0]['enunciado'] for x in ['90 min', 'Cinco preguntas de 2 puntos', 'reparto deducido', 'uam.es/uam/media/doc/1606968075323', 'uam.es/uam/media/doc/1606850470206']))
    comprobar(f'{sid} título con formato', 'formato PAU Madrid 2026' in s['titulo'] and s['tipo'] == 'ciencias')
    for b in s['bloques']:
        e = limpio(b['enunciado'])
        pts = [float(p.replace(',', '.')) for p in re.findall(r'\((\d,\d+|\d)\)', e)]
        comprobar(f"{sid} {b['titulo'][:12]} apartados suman 2,0", abs(sum(pts) - 2.0) < 1e-9, f'(suman {sum(pts)})')
        comprobar(f"{sid} {b['titulo'][:12]} múltiplos de 0,1 y 3-5 apartados", all(abs(p * 10 - round(p * 10)) < 1e-9 for p in pts) and 3 <= len(pts) <= 5)
        comprobar(f"{sid} {b['titulo'][:12]} tiene solución con a), b)", all(f'{l}) ' in b['solucion'] for l in 'abc'))
        # criterios: los puntos citados por apartado suman 2,0
        if 'Criterios de puntuación' in b['solucion']:
            crit = limpio(b['solucion'].split('Criterios de puntuación')[1])
            comprobar(f"{sid} {b['titulo'][:12]} lleva criterios", True)
            comprobar(f"{sid} {b['titulo'][:12]} criterios con tantos apartados como el enunciado",
                      all(re.search(l + r'\) ', crit) for l in 'abcd'[:len(pts)]) and not re.search(r'\b' + 'abcd'[len(pts)] + r'\) ', crit) if len(pts) < 4 else all(re.search(l + r'\) ', crit) for l in 'abcd'))
            for letra, p in zip('abcd', pts):
                m = re.search(letra + r'\) ([^;]*)', crit)
                nums = [float(x.replace(',', '.')) for x in re.findall(r'\b(\d,\d+)\b', m.group(1))] if m else []
                comprobar(f"{sid} {b['titulo'][:12]} criterio {letra}: ninguna puntuación supera la del apartado ({p})", bool(nums) and max(nums) <= p + 1e-9, f'(criterios {nums})')
        else:
            comprobar(f"{sid} {b['titulo'][:12]} lleva criterios", False)

# ---------------------------------------------------------- utilidades
A = {'C': 12, 'H': 1, 'O': 16}
def pesos(f): return sum(A[el] * (int(n) if n else 1) for el, n in re.findall(r'([A-Z][a-z]?)(\d*)', f))
def ajustar(react, prod):
    els = sorted({e for f in react + prod for e, _ in re.findall(r'([A-Z][a-z]?)(\d*)', f)})
    cols = []
    for k, f in enumerate(react + prod):
        d = {}
        for e, n in re.findall(r'([A-Z][a-z]?)(\d*)', f): d[e] = d.get(e, 0) + (int(n) if n else 1)
        sg = 1 if k < len(react) else -1
        cols.append([sg * d.get(e, 0) for e in els])
    ns = sp.Matrix(cols).T.nullspace()[0]
    ns = ns * sp.ilcm(*[x.q for x in ns])
    return [int(x) for x in ns / sp.igcd(*[int(x) for x in ns])]
R = 0.082

# código genético estándar (tabla completa generada con el orden TCAG)
BASES = 'UCAG'
AAS = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG'
CODON = {a + b + c: AAS[16 * i + 4 * j + k] for i, a in enumerate(BASES) for j, b in enumerate(BASES) for k, c in enumerate(BASES)}
TRES = {'M': 'Met', 'G': 'Gly', 'D': 'Asp', 'E': 'Glu', 'L': 'Leu', 'I': 'Ile', 'C': 'Cys', '*': 'parada'}
COMP = {'A': 'U', 'T': 'A', 'G': 'C', 'C': 'G'}
def traducir(mrna):
    out = []
    for i in range(0, len(mrna) - 2, 3):
        a = CODON[mrna[i:i + 3]]
        if a == '*': break
        out.append(a)
    return out
def peptido(mrna): return '-'.join(TRES[a] for a in traducir(mrna))

# ============================================================ SIM6
S = 'sim6'
# P1: Michaelis-Menten
Vm, Km, Kmi = 100, 2, 6
SS = [0.5, 1, 2, 4, 8, 16]
sin = [Vm * s / (Km + s) for s in SS]; con = [Vm * s / (Kmi + s) for s in SS]
for s_, v in zip(SS, sin): enE(S, 0, es(v, 1), f'v sin I a [S]={s_}')
for s_, v in zip(SS, con): enE(S, 0, es(v, 1), f'v con I a [S]={s_}')
comprobar('sim6 p1 K_m: v([S]=2) = Vmáx/2', sin[2] == 50.0)
comprobar('sim6 p1 Km aparente 6: v(6) = 50', Vm * 6 / (Kmi + 6) == 50.0)
comprobar('sim6 p1 inhibidor competitivo: razón v(con)/v(sin) crece con [S] y Vmáx igual', all(con[i] / sin[i] < con[i + 1] / sin[i + 1] for i in range(5)))
en(S, 0, es(sin[5] / Vm * 100, 1) + ' %', '88,9 % de Vmáx')
en(S, 0, es(Vm * 40 / (Kmi + 40), 1) + ' µmol/min', 'v con I a 40 mM'); en(S, 0, es(Vm * 40 / (Km + 40), 1), 'v sin I a 40 mM')
# P2A: tripalmitina
comprobar('sim6 p2A M(ácido palmítico)=256, glicerol=92, tripalmitina C51H98O6 = 806', (pesos('C16H32O2'), pesos('C3H8O3'), pesos('C51H98O6')) == (256, 92, 806))
comprobar('sim6 p2A 3 R-COOH + glicerol → triéster + 3 H2O (balance de masa)', 92 + 3 * 256 - 3 * 18 == 806)
comprobar('sim6 p2A átomos: C3H8O3 + 3 C16H32O2 = C51H98O6 + 3 H2O',
          (3 + 48, 8 + 96, 3 + 6) == (51, 104, 9) and (51, 98 + 6, 6 + 3) == (51, 104, 9))
en(S, 1, '806 g/mol', 'M tripalmitina'); en(S, 1, es(9.2 / 92, 2) + ' mol', 'n glicerol'); en(S, 1, es(9.2 / 92 * 806, 1) + ' g', 'masa tripalmitina')
# P2B: suero
nacl = 9 / 58.5; glu = 54 / 180
en(S, 2, es(nacl, 3) + ' M', 'molaridad NaCl'); en(S, 2, es(2 * nacl, 3) + ' osmol/L', 'osmolaridad suero'); en(S, 2, es(glu, 3) + ' osmol/L', 'osmolaridad glucosa')
comprobar('sim6 p2B glucosa 54 g/L aprox. isotónica (<3 %)', abs(glu - 2 * nacl) / (2 * nacl) < 0.03, str(abs(glu - 2 * nacl) / (2 * nacl)))
# P3A: balance de ATP aerobio
glic = dict(ATP=2, NADH=2, FADH2=0); pdh = dict(ATP=0, NADH=2, FADH2=0); krebs = dict(ATP=2, NADH=6, FADH2=2)
tot = {k: glic[k] + pdh[k] + krebs[k] for k in glic}
comprobar('sim6 p3A totales 4 ATP, 10 NADH, 2 FADH2', tot == dict(ATP=4, NADH=10, FADH2=2), str(tot))
atp = tot['ATP'] + 2.5 * tot['NADH'] + 1.5 * tot['FADH2']; atp_cl = tot['ATP'] + 3 * tot['NADH'] + 2 * tot['FADH2']
comprobar('sim6 p3A 32 ATP', atp == 32 and atp_cl == 38, f'{atp} {atp_cl}')
en(S, 3, '4 + 25 + 3 = 32 ATP', 'suma'); en(S, 3, '38', 'ATP con 3 y 2'); en(S, 3, f'{int(atp)}/2 = 16 veces', 'cociente'); en(S, 3, '4 ATP/GTP, 10 NADH y 2 FADH₂', 'totales')
# P3B: fotosíntesis (curva de luz)
luz = [0, 10, 20, 40, 80, 120]; neto = [-4, 0, 6, 14, 20, 20]; resp = -neto[0]
bruta = [n + resp for n in neto]
comprobar('sim6 p3B punto de compensación = 10', luz[neto.index(0)] == 10)
comprobar('sim6 p3B bruta 40 = 18, 120 = 24', (bruta[3], bruta[5]) == (18, 24))
comprobar('sim6 p3B saturación: 80 y 120 iguales', neto[4] == neto[5] and neto[3] < neto[4])
en(S, 4, f'14 + 4 = {bruta[3]}', 'bruta 40'); en(S, 4, f'20 + 4 = {bruta[5]}', 'bruta 120'); en(S, 4, '10 unidades', 'compensación')
# Calvin: 6 CO2 → glucosa: 18 ATP y 12 NADPH (3 CO2 → 1 G3P: 9 ATP, 6 NADPH)
comprobar('sim6 p3B Calvin: 6 CO2 → 18 ATP y 12 NADPH (6 vueltas·3 y ·2)', (6 * 3, 6 * 2) == (18, 12))
# P4A: PKU
pk = F(1, 4); sano = 1 - pk
comprobar('sim6 p4A Aa×Aa', sorted(''.join(sorted(a + b)) for a in 'Aa' for b in 'Aa') == ['AA', 'Aa', 'Aa', 'aa'])
comprobar('sim6 p4A 1/4 aa y 1/2 Aa', (pk, F(2, 4)) == (F(1, 4), F(1, 2)))
comprobar('sim6 p4A ningún afectado de 2 = 9/16', sano ** 2 == F(9, 16))
comprobar('sim6 p4A exactamente uno de 2 = 3/8', 2 * pk * sano == F(3, 8))
comprobar('sim6 p4A P(portadora | sana) = 2/3', F(1, 2) / sano == F(2, 3))
for c in ['1/4 (25 %)', '1/2 (50 %)', '9/16', '3/8', '2/3']: en(S, 5, c, 'prob ' + c)
# P4B: transcripción y traducción
molde = 'TACCCTCTAAACATT'                      # 3'→5'
mrna = ''.join(COMP[b] for b in molde)          # 5'→3' del ARNm (se lee en el mismo orden que el molde 3'→5')
comprobar('sim6 p4B ARNm = AUGGGAGAUUUGUAA', mrna == 'AUGGGAGAUUUGUAA', mrna)
en(S, 6, '5′-AUG GGA GAU UUG UAA-3′', 'ARNm'); comprobar('sim6 p4B enunciado tiene el molde', '3′-TAC CCT CTA AAC ATT-5′' in texto(S, 6, 'enunciado'))
comprobar('sim6 p4B péptido Met-Gly-Asp-Leu', peptido(mrna) == 'Met-Gly-Asp-Leu', peptido(mrna)); en(S, 6, 'Met-Gly-Asp-Leu', 'péptido')
comprobar('sim6 p4B (i) GGA→GGG silenciosa', CODON['GGA'] == CODON['GGG'] == 'G')
comprobar('sim6 p4B (ii) GAU→GAA Asp→Glu', (CODON['GAU'], CODON['GAA']) == ('D', 'E'))
comprobar('sim6 p4B (iii) UUG→UAG parada, truncado a 3 aa', CODON['UUG'] == 'L' and CODON['UAG'] == '*' and peptido(mrna[:9] + 'UAG') == 'Met-Gly-Asp')
mdel = mrna[:3] + mrna[4:]
comprobar('sim6 p4B deleción de la G nº 4: Met-Glu-Ile-Cys', mrna[3] == 'G' and peptido(mdel) == 'Met-Glu-Ile-Cys' and mdel[:14] == 'AUGGAGAUUUGUAA', f'{mdel} {peptido(mdel)}')
en(S, 6, 'AUG GAG AUU UGU AA', 'ARNm con deleción'); en(S, 6, 'Met-Glu-Ile-Cys', 'péptido con deleción')
dat = texto(S, 6, 'enunciado')
for cod, aa in [('AUG', 'M'), ('GGA', 'G'), ('GGG', 'G'), ('GAU', 'D'), ('GAA', 'E'), ('GAG', 'E'), ('UUG', 'L'), ('AUU', 'I'), ('UGU', 'C')]:
    comprobar(f'sim6 p4B dato {cod} = {TRES[aa]} (tabla estándar)', f'{cod}' in dat and CODON[cod] == aa)
comprobar('sim6 p4B datos de parada UAA, UAG', CODON['UAA'] == CODON['UAG'] == '*')
# P5A: crecimiento bacteriano
N0, tg = 1e3, 20; n = 180 / tg
en(S, 7, f'{int(n)} generaciones', 'generaciones 3 h'); en(S, 7, es(N0 * 2 ** n / 1e5, 2) + '·10⁵', 'N a 3 h'); comprobar('sim6 p5A N(3 h)=512000', N0 * 2 ** n == 512000)
ng = math.log2(1e9 / N0); t = ng * tg
en(S, 7, es(ng, 2) + ' generaciones', 'n generaciones'); en(S, 7, es(t, 1) + ' min', 't min'); en(S, 7, '6 h 39 min', 't h min'); comprobar('sim6 p5A 6 h 39 min', (int(t // 60), round(t % 60)) == (6, 39), str(t))
en(S, 7, es(t / 60, 1) + ' h', 't h')
# P5B: Hardy-Weinberg
q = math.sqrt(0.04); p = 1 - q
comprobar('sim6 p5B q=0,2, p=0,8; 0,64/0,32/0,04', (round(q, 10), round(p, 10), round(p * p, 10), round(2 * p * q, 10), round(q * q, 10)) == (0.2, 0.8, 0.64, 0.32, 0.04))
comprobar('sim6 p5B 3200/1600/200 individuos', (round(5000 * p * p), round(5000 * 2 * p * q), round(5000 * q * q)) == (3200, 1600, 200))
q2 = (2 * p * q / 2) / (p * p + 2 * p * q)
comprobar('sim6 p5B q tras selección = 0,167', abs(q2 - 1 / 6) < 1e-12 and es(q2, 3) == '0,167')
for c in ['q = 0,2', 'p = 0,8', '0,64', '0,32', '0,04', 'AA = 3200, Aa = 1600, aa = 200', '0,96', es(q2, 3)]: en(S, 8, c, 'HW ' + c)

# ============================================================ SIM7
S = 'sim7'
# P1: citometría
cel = [5500, 2400, 2100]; comprobar('sim7 p1 suman 10000', sum(cel) == 10000)
dur = [c / 10000 * 20 for c in cel]
comprobar('sim7 p1 duraciones 11, 4,8, 4,2 h (suman 20)', [round(d, 10) for d in dur] == [11.0, 4.8, 4.2] and abs(sum(dur) - 20) < 1e-9)
for c in ['11 h', '4,8 h', '4,2 h', '0,55', '0,24', '0,21']: en(S, 0, c, 'fase ' + c)
n_ = 8; comprobar('sim7 p1 metafase mitosis 2n=8: 8 cromosomas y 16 cromátidas; meiosis II: 4 y 8', (n_, 2 * n_, n_ // 2, 2 * (n_ // 2)) == (8, 16, 4, 8))
en(S, 0, '16 cromátidas', 'cromátidas mitosis'); en(S, 0, '4 cromosomas y 8 cromátidas', 'metafase II'); en(S, 0, '2⁴ = 16', 'combinaciones n=4'); comprobar('sim7 p1 2^4=16', 2 ** 4 == 16)
# P2A: tripéptido
M = {'Gly': 75, 'Ala': 89, 'Ser': 105}
comprobar('sim7 p2A M(Gly-Ala-Ser) = 233', sum(M.values()) - 2 * 18 == 233)
comprobar('sim7 p2A 3! = 6 y 20^4 = 160000', len(list(itertools.permutations(M))) == 6 and 20 ** 4 == 160000)
# masas de los aminoácidos libres = fórmula: Gly C2H5NO2, Ala C3H7NO2, Ser C3H7NO3 (N=14)
Ac = {'C': 12, 'H': 1, 'O': 16, 'N': 14}
def pa(f): return sum(Ac[e] * (int(n) if n else 1) for e, n in re.findall(r'([A-Z])(\d*)', f))
comprobar('sim7 p2A masas de aminoácidos 75, 89, 105', (pa('C2H5NO2'), pa('C3H7NO2'), pa('C3H7NO3')) == (75, 89, 105))
en(S, 1, '269 − 36 = 233 g/mol', 'masa'); en(S, 1, '3! = 6', 'permutaciones'); en(S, 1, '160 000', '20^4')
# P2B: Chargaff
total = 2000; Apct = 28
T_ = Apct; GC = 100 - 2 * Apct; G_ = C_ = GC / 2
nA = nT = Apct / 100 * total; nG = nC = G_ / 100 * total
comprobar('sim7 p2B T=28, G=C=22 %; 560/560/440/440', (T_, G_, nA, nT, nG, nC) == (28, 22.0, 560.0, 560.0, 440.0, 440.0))
H = 2 * nA + 3 * nG; comprobar('sim7 p2B H bonds 2440', H == 2440)
nG2 = 0.28 * total; nA2 = (total / 2 - nG2); H2 = 2 * nA2 + 3 * nG2
comprobar('sim7 p2B segundo fragmento: A=T=440, G=C=560, 2560 enlaces y 56 % GC', (nG2, nA2, H2) == (560.0, 440.0, 2560.0) and 2 * 28 == 56 and H2 > H)
for c in ['T = 28 %', 'G = C = 22 %', 'A = T = 0,28·2000 = 560', 'G = C = 0,22·2000 = 440', '1120 + 1320 = 2440', '2560 enlaces', '56 %']: en(S, 2, c, 'Chargaff ' + c)
# P3A: aumento
tam = 45 / 15000 * 1000
comprobar('sim7 p3A tamaño real 3,0 µm', abs(tam - 3.0) < 1e-12); en(S, 3, '45 mm / 15 000 = 3,0·10⁻³ mm = 3,0 µm', 'tamaño real')
# P3B: fermentación alcohólica
comprobar('sim7 p3B C6H12O6 → 2 C2H6O + 2 CO2 ajustada', ajustar(['C6H12O6'], ['C2H6O', 'CO2']) == [1, 2, 2], str(ajustar(['C6H12O6'], ['C2H6O', 'CO2'])))
comprobar('sim7 p3B M etanol 46', pesos('C2H6O') == 46)
ng_ = 90 / 180; net = 2 * ng_; V = net * R * 298
en(S, 4, '90/180 = 0,50 mol', 'n glucosa'); en(S, 4, '46 g', 'masa etanol'); en(S, 4, es(V, 1) + ' L', 'V CO2'); comprobar('sim7 p3B V = 24,4 L', es(V, 1) == '24,4')
en(S, 4, '1,0 mol de ATP', 'ATP netos'); en(S, 4, f'{ng_ * 32:.0f} mol', '16 mol aerobio'); comprobar('sim7 p3B ATP 1,0 vs 16', (ng_ * 2, ng_ * 32) == (1.0, 16.0))
# P4A: Meselson-Stahl (enumeración de hebras)
def generaciones(g):
    mol = [('15', '15')]
    for _ in range(g):
        mol = [m for (a, b) in mol for m in [(a, '14'), (b, '14')]]
    return mol
for g, (h, l) in {1: (1, 0), 2: (F(1, 2), F(1, 2)), 3: (F(1, 4), F(3, 4))}.items():
    mol = generaciones(g)
    hib = F(sum(1 for m in mol if m[0] != m[1]), len(mol)); lig = F(sum(1 for m in mol if m == ('14', '14')), len(mol))
    comprobar(f'sim7 p4A generación {g}: híbrido {h}, ligero {l}', (hib, lig) == (F(h), F(l)), f'{hib} {lig}')
en(S, 5, '100 % híbrido', 'gen 1'); en(S, 5, '50 % híbrido y 50 % ligero', 'gen 2'); en(S, 5, '25 % híbrido y 75 % ligero', 'gen 3'); en(S, 5, '2 de 8', '2 de 8 conservan 15N')
comprobar('sim7 p4A 2 de 8 moléculas con hebra 15N en gen 3', sum(1 for m in generaciones(3) if '15' in m) == 2)
tr = 4.6e6 / 2 / 1000
comprobar('sim7 p4A 2300 s = 38,3 min', tr == 2300 and es(tr / 60, 1) == '38,3'); en(S, 5, '2300 s', 't s'); en(S, 5, '38 min', 't min'); en(S, 5, '2,3·10⁶', 'nt por horquilla')
# P4B: daltonismo y ABO (enumeración de gametos)
def cruce(g1, g2): return [tuple(sorted(a + b)) if False else (a, b) for a in g1 for b in g2]
madre = ['XD', 'Xd']; padre = ['XD', 'Y']
hij = [(m, p) for m in madre for p in padre]
varones = [h for h in hij if h[1] == 'Y']; dalt_v = [h for h in varones if h[0] == 'Xd']
comprobar('sim7 p4B varón daltónico 1/2, cualquier hijo 1/4, hijas daltónicas 0',
          (F(len(dalt_v), len(varones)), F(len(dalt_v), len(hij)), sum(1 for h in hij if h[1] != 'Y' and h[0] == 'Xd' and h[1] == 'Xd')) == (F(1, 2), F(1, 4), 0))
hij2 = [(m, p) for m in ['XD', 'Xd'] for p in ['Xd', 'Y']]; hijas2 = [h for h in hij2 if h[1] != 'Y']
comprobar('sim7 p4B hija daltónica con padre daltónico y madre portadora = 1/2', F(sum(1 for h in hijas2 if h == ('Xd', 'Xd')), len(hijas2)) == F(1, 2))
def fen(g): return 'AB' if set(g) == {'A', 'B'} else ('A' if 'A' in g else ('B' if 'B' in g else 'O'))
abo = [fen((a, b)) for a in ['A', 'o'] for b in ['B', 'o']]
dist = {k: F(abo.count(k), 4) for k in ['AB', 'A', 'B', 'O']}
comprobar('sim7 p4B fenotipos 1/4 cada uno y dos hijos O = 1/16', all(v == F(1, 4) for v in dist.values()) and dist['O'] ** 2 == F(1, 16))
for c in ['1/2', '1/4', '(1/4)² = 1/16']: en(S, 6, c, 'prob ' + c)
# P5A: restricción, PCR, mutación
seq = 'ATGGAATTCCGTAGGCTAGAATTCTTAGC'
comprobar('sim7 p5A enunciado contiene la secuencia', '5′-' + seq + '-3′' in texto(S, 7, 'enunciado'))
sitios = [m.start() for m in re.finditer('(?=GAATTC)', seq)]
cortes = [s + 1 for s in sitios]                      # G↓AATTC
frag = [b - a for a, b in zip([0] + cortes, cortes + [len(seq)])]
comprobar('sim7 p5A 2 sitios; fragmentos 4, 15, 10 (29 nt)', len(seq) == 29 and len(sitios) == 2 and frag == [4, 15, 10], f'{sitios} {frag}')
en(S, 7, '4–9 y 19–24', 'posiciones 1-based'); comprobar('sim7 p5A posiciones 4–9 y 19–24', [(s + 1, s + 6) for s in sitios] == [(4, 9), (19, 24)])
en(S, 7, '4, 15 y 10 nucleótidos', 'fragmentos'); en(S, 7, '4 + 15 + 10 = 29', 'suma')
N = 100 * 2 ** 25
comprobar('sim7 p5A 100·2^25 = 3,36·10⁹', N == 3355443200 and es(N / 1e9, 2) == '3,36'); en(S, 7, '33 554 432', '2^25'); en(S, 7, '3,36·10⁹', 'N final'); comprobar('sim7 p5A 2^25', 2 ** 25 == 33554432)
mu = 1e-9 * 6.4e9; comprobar('sim7 p5A 6,4 mutaciones', abs(mu - 6.4) < 1e-9); en(S, 7, '6,4', 'mutaciones por replicación')
# P5B: vacunación
dias = [0, 7, 14, 28, 35, 42, 56]; tit = [1, 2, 8, 4, 256, 512, 256]
comprobar('sim7 p5B picos 8 y 512: factor 64 = 2^6; título a +7 d: 256 vs 2', (max(tit[:4]), max(tit[4:]), max(tit[4:]) / max(tit[:4]), tit[4], tit[1]) == (8, 512, 64.0, 256, 2) and 2 ** 6 == 64)
en(S, 8, '512/8 = 64 veces', 'factor 64'); en(S, 8, 'el título ya es 256', 'título a 7 d del refuerzo'); en(S, 8, 'era solo 2', 'título a 7 d primera')
comprobar('sim7 p5B los días de la tabla en el enunciado', all(x in texto(S, 8, 'enunciado') for x in ['28 (refuerzo)', '512', '256']))

# ============================================================ SIM8
S = 'sim8'
# P1: Hardy-Weinberg y selección
zonas = {'A': (515, 410, 75), 'B': (900, 98, 2)}
comprobar('sim8 p1 1000 personas por zona', all(sum(v) == 1000 for v in zonas.values()))
qA = F(410 + 2 * 75, 2000); qB = F(98 + 2 * 2, 2000)
comprobar('sim8 p1 q(A)=0,28; q(B)=0,051', (float(qA), float(qB)) == (0.28, 0.051)); en(S, 0, '560/2000 = 0,28', 'q A'); en(S, 0, '102/2000 = 0,051', 'q B')
pA = 1 - float(qA); esp = (pA ** 2 * 1000, 2 * pA * float(qA) * 1000, float(qA) ** 2 * 1000)
comprobar('sim8 p1 esperados A: 518,4 / 403,2 / 78,4', tuple(round(x, 1) for x in esp) == (518.4, 403.2, 78.4), str(esp))
for c in ['518,4', '403,2', '78,4']: en(S, 0, c, 'esperado ' + c)
dif = [abs(o - e) for o, e in zip(zonas['A'], esp)]
comprobar('sim8 p1 diferencias < 8 y χ² < 3,84 (1 g.l.)', max(dif) < 8 and sum((o - e) ** 2 / e for o, e in zip(zonas['A'], esp)) < 3.84, str(dif))
comprobar('sim8 p1 GAG→GTG: Glu→Val', (CODON['GAG'], CODON['GUG']) == ('E', 'V')); en(S, 0, 'GAG → GTG', 'sustitución'); en(S, 0, 'Glu', 'Glu')
# P2A: β-oxidación
C = 16; vueltas = C // 2 - 1; acet = C // 2
comprobar('sim8 p2A 7 vueltas y 8 acetil-CoA', (vueltas, acet) == (7, 8))
krebs_ac = 3 * 2.5 + 1.5 + 1                          # 3 NADH + 1 FADH2 + 1 GTP por acetil-CoA
comprobar('sim8 p2A 10 ATP por acetil-CoA', krebs_ac == 10)
atp_p = acet * 10 + vueltas * 1.5 + vueltas * 2.5 - 2
comprobar('sim8 p2A ATP neto 106', atp_p == 106 and acet * 10 == 80 and vueltas * 1.5 == 10.5 and vueltas * 2.5 == 17.5 and 80 + 10.5 + 17.5 == 108)
comprobar('sim8 p2A ATP/g: 0,41 y 0,18; cociente 2,3', (es(atp_p / 256, 2), es(32 / 180, 2), es(atp_p / 256 / (32 / 180), 1)) == ('0,41', '0,18', '2,3'))
for c in ['7 vueltas', '8 acetil-CoA', '106 ATP netos', '0,41 ATP/g', '0,18 ATP/g', '2,3 veces', '10,5 ATP', '17,5 ATP']: en(S, 1, c, c)
# P2B: sacarosa
comprobar('sim8 p2B M sacarosa 342 y hexosa 180', (pesos('C12H22O11'), pesos('C6H12O6')) == (342, 180) and 2 * 180 - 18 == 342)
ns = 171 / 342; en(S, 2, '171/342 = 0,50 mol', 'n'); en(S, 2, '90 g de glucosa y 90 g de fructosa', 'masas'); comprobar('sim8 p2B 90 g y 171 + 9 = 180', (ns * 180, 171 + ns * 18) == (90.0, 180.0))
# P3A: meiosis
n3 = 3
comprobar('sim8 p3A 2^3 = 8 gametos; 1/8; 64 cigotos', (2 ** n3, F(1, 2) ** n3, (2 ** n3) ** 2) == (8, F(1, 8), 64))
gam = list(itertools.product('MP', repeat=3)); comprobar('sim8 p3A enumeración: 8 gametos, 1 todo materno', len(gam) == 8 and sum(1 for g in gam if set(g) == {'M'}) == 1)
comprobar('sim8 p3A 10·4 = 40 espermatozoides; 10 óvulos y 30 corpúsculos; 2^5 = 32 células', (10 * 4, 10 * 1, 10 * 3, 2 ** 5) == (40, 10, 30, 32))
for c in ['8 gametos distintos', '1/8', '64 cigotos', '40 espermatozoides', '10 óvulos y 30 corpúsculos polares', '32 células']: en(S, 3, c, c)
# P3B: isótopos y balance
comprobar('sim8 p3B 6 CO2 + 6 H2O → C6H12O6 + 6 O2', ajustar(['CO2', 'H2O'], ['C6H12O6', 'O2']) == [6, 6, 1, 6], str(ajustar(['CO2', 'H2O'], ['C6H12O6', 'O2'])))
ng3 = 90 / 180; co2 = 6 * ng3; o2 = 6 * ng3
comprobar('sim8 p3B CO2 3,0 mol = 132 g; O2 3,0 mol = 96 g; balance de masa 132 + 54 = 90 + 96', (co2, co2 * 44, o2 * 32, co2 * 44 + 6 * ng3 * 18, 90 + o2 * 32) == (3.0, 132.0, 96.0, 186.0, 186.0))
for c in ['3,0 mol', '132 g', '96 g', '132 + 54 g de agua = 90 + 96 g']: en(S, 4, c, c)
# P4A: maduración del ARNm
ex = [180, 210, 240, 300, 270]; tot_ex = sum(ex)
comprobar('sim8 p4A exones 1200 nt, intrones 2400 pb (67 %)', tot_ex == 1200 and 3600 - tot_ex == 2400 and round((3600 - tot_ex) / 3600 * 100) == 67 and all(e % 3 == 0 for e in ex))
aa = tot_ex // 3 - 1; comprobar('sim8 p4A 399 aa; 43 890 Da', aa == 399 and aa * 110 == 43890)
aa2 = (tot_ex - 240) // 3 - 1; comprobar('sim8 p4A sin el exón de 240: 960 nt = 320 codones → 319 aa; marco conservado', (tot_ex - 240, (tot_ex - 240) // 3, aa2, 240 % 3) == (960, 320, 319, 0))
for c in ['1200 nt', '2400 pb', '399 aminoácidos', '43 890 Da', '43,9 kDa', '960 nt = 320 codones', '319 aminoácidos']: en(S, 5, c, c)
# P4B: dihíbrido y χ²
gam = [a + b for a in 'Aa' for b in 'Bb']
desc = [(g1, g2) for g1 in gam for g2 in gam]
def fenot(g1, g2):
    A_ = 'A' in (g1[0] + g2[0]); B_ = 'B' in (g1[1] + g2[1]); return ('amar' if A_ else 'verd') + ('lisa' if B_ else 'rug')
cnt = {}
for g1, g2 in desc: cnt[fenot(g1, g2)] = cnt.get(fenot(g1, g2), 0) + 1
comprobar('sim8 p4B 9:3:3:1', (cnt['amarlisa'], cnt['amarrug'], cnt['verdlisa'], cnt['verdrug']) == (9, 3, 3, 1) and len(desc) == 16, str(cnt))
obs = [340, 130, 125, 45]; N4 = sum(obs); expd = [N4 * F(c, 16) for c in (9, 3, 3, 1)]
comprobar('sim8 p4B 640 semillas; esperados 360/120/120/40', N4 == 640 and expd == [360, 120, 120, 40])
chi2 = sum(F((o - e) ** 2) / e for o, e in zip(obs, expd))
comprobar('sim8 p4B χ² = 2,78 < 7,81', es(float(chi2), 2) == '2,78' and chi2 < 7.81, str(float(chi2)))
comprobar('sim8 p4B sumandos 1,11 / 0,83 / 0,21 / 0,63', [str(Decimal(float(F((o - e) ** 2) / e)).quantize(Decimal('0.01'), ROUND_HALF_UP)).replace('.', ',') for o, e in zip(obs, expd)] == ['1,11', '0,83', '0,21', '0,63'])
from scipy.stats import chi2 as _c2  # valor crítico oficial
comprobar('sim8 p4B valor crítico 7,81 (3 g.l., p = 0,05)', round(_c2.ppf(0.95, 3), 2) == 7.81)
for c in ['360', '120', '40', '2,78', '7,81', '3/16', '1/16', '9 : 3 : 3 : 1']: en(S, 6, c, c)
# P5A: bacteriófagos
ufp = 58 / 0.1 * 1e6
comprobar('sim8 p5A 5,8·10⁸ UFP/mL', abs(ufp - 5.8e8) < 1); en(S, 7, '5,8·10⁸ UFP/mL', 'título'); en(S, 7, '580 UFP/mL', '58/0,1')
comprobar('sim8 p5A 100³ = 10⁶', 100 ** 3 == 10 ** 6); en(S, 7, '100³ = 10⁶', 'fagos')
# P5B: Rh
hijos = [a + b for a in 'dd' for b in 'Dd']; rhp = F(sum(1 for h in hijos if 'D' in h), len(hijos))
comprobar('sim8 p5B dd × Dd: 1/2 Rh+; al menos 1 de 2 = 3/4', (rhp, 1 - (1 - rhp) ** 2) == (F(1, 2), F(3, 4)))
en(S, 8, '1 − (1/2)² = 3/4', 'al menos uno')

# ---------------------------------------------------------- cobertura de temas
todo = ' '.join(limpio(b['titulo'] + b['enunciado'] + b['solucion']) for s in SIM.values() for b in s['bloques']).lower()
TEMAS = {'bioelementos y agua': ['bioelemento', 'osmolaridad'], 'glúcidos': ['sacarosa', 'glucosídico'], 'lípidos': ['triglicérido', 'saponificación'],
         'proteínas y enzimas': ['tripéptido', 'inhibición competitiva'], 'ácidos nucleicos': ['chargaff', 'timina'], 'célula': ['endosimbiótica', 'aparato de golgi'],
         'núcleo y ciclo celular': ['citometría', 'metafase'], 'respiración': ['ciclo de krebs', 'β-oxidación'], 'fotosíntesis': ['ciclo de calvin', 'fotólisis'],
         'genética mendeliana': ['tercera ley de mendel', 'fenilcetonuria'], 'base molecular de la herencia': ['meselson', 'semiconservativa'],
         'expresión génica': ['transcripción', 'splicing'], 'mutaciones e ingeniería genética': ['ecori', 'mutación silenciosa'], 'microbiología': ['bacteriófago', 'peptidoglucano'],
         'inmunología': ['células de memoria', 'anti-d'], 'evolución': ['hardy-weinberg', 'selección natural']}
for tema, claves in TEMAS.items():
    comprobar(f'cobertura: {tema}', all(c in todo for c in claves), str([c for c in claves if c not in todo]))

print(f'{ok} comprobaciones correctas, {len(fallos)} fallos' if not fallos else '\n'.join('FALLO: ' + f for f in fallos) + f'\n{ok} comprobaciones correctas, {len(fallos)} fallos')
