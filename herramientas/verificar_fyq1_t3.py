#!/usr/bin/env python3
"""
Verificación independiente de Física y Química I · tema 3 (Formulación y nomenclatura inorgánica).

NO comparte código con la web: este script trae su propio nombrador y formulador. A partir de una fórmula
  1. la analiza (átomos, grupos, paréntesis), decide a qué familia pertenece y calcula los números de oxidación
     resolviendo la neutralidad de carga con SUS tablas de valencias;
  2. construye los nombres (sistemática IUPAC 2005, Stock y tradicional) con SUS reglas de prefijos y sufijos
     (hipo-/-oso/-ico/per-, -uro, -ato/-ito, bis/tris…).
Después comprueba, contra eso:
  · cada compuesto del catálogo del motor de la web (fórmula, familia, números de oxidación y los tres nombres);
  · cada respuesta (fórmula o nombre) de los ejercicios de formulación («verif» de cada ejercicio);
  · cada compuesto que aparece en la teoría, los ejemplos, tablas y láminas («verif» del tema);
  · los números de oxidación y las cuentas de los ejercicios numéricos.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      node herramientas/volcar_fyq1.js > /tmp/fyq1_motores.json
      python3 herramientas/verificar_fyq1_t3.py /tmp/ampl.json /tmp/fyq1_motores.json
"""
import json, re, sys, unicodedata
from math import gcd

fallos, ok = [], 0
def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

# =====================================================================
# 1. Datos propios
# =====================================================================
ROM = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
GR = ['', 'mono', 'di', 'tri', 'tetra', 'penta', 'hexa', 'hepta', 'octa', 'nona', 'deca']
BIS = {2: 'bis', 3: 'tris', 4: 'tetrakis', 5: 'pentakis', 6: 'hexakis'}

# metal: (nombre, valencias en sales/hidróxidos/hidruros, valencias solo de óxido, {valencia: adjetivo}, número romano siempre)
METAL = {
    'Li': ('litio', (1,), (), {}, 0), 'Na': ('sodio', (1,), (), {}, 0), 'K': ('potasio', (1,), (), {}, 0), 'Rb': ('rubidio', (1,), (), {}, 0), 'Cs': ('cesio', (1,), (), {}, 0),
    'Be': ('berilio', (2,), (), {}, 0), 'Mg': ('magnesio', (2,), (), {}, 0), 'Ca': ('calcio', (2,), (), {}, 0), 'Sr': ('estroncio', (2,), (), {}, 0), 'Ba': ('bario', (2,), (), {}, 0),
    'Zn': ('cinc', (2,), (), {}, 0), 'Cd': ('cadmio', (2,), (), {}, 0), 'Ag': ('plata', (1,), (), {}, 0), 'Al': ('aluminio', (3,), (), {}, 0),
    'Cu': ('cobre', (1, 2), (), {1: 'cuproso', 2: 'cúprico'}, 0), 'Au': ('oro', (1, 3), (), {1: 'auroso', 3: 'aúrico'}, 0),
    'Fe': ('hierro', (2, 3), (), {2: 'ferroso', 3: 'férrico'}, 0), 'Co': ('cobalto', (2, 3), (), {2: 'cobaltoso', 3: 'cobáltico'}, 0),
    'Ni': ('níquel', (2, 3), (), {2: 'niqueloso', 3: 'niquélico'}, 0), 'Sn': ('estaño', (2, 4), (), {2: 'estannoso', 4: 'estánnico'}, 0),
    'Pb': ('plomo', (2, 4), (), {2: 'plumboso', 4: 'plúmbico'}, 0), 'Hg': ('mercurio', (2,), (), {2: 'mercúrico'}, 1),
    'Pt': ('platino', (2, 4), (), {2: 'platinoso', 4: 'platínico'}, 0),
    'Cr': ('cromo', (2, 3), (6,), {}, 0), 'Mn': ('manganeso', (2, 3, 4), (6, 7), {}, 0),
}
# no metales: (nombre, anión, carga como anión, puesto en el orden IUPAC, adjetivo del hidrácido, números de oxidación positivos, los que forman óxido)
ORDEN = ['B', 'Si', 'C', 'Sb', 'As', 'P', 'N', 'H', 'Te', 'Se', 'S', 'I', 'Br', 'Cl', 'O', 'F']
NOMET = {
    'H': ('hidrógeno', 'hidruro', 1, '', (1,), (1,)), 'B': ('boro', 'boruro', 3, '', (3,), (3,)), 'C': ('carbono', 'carburo', 4, '', (2, 4), (2, 4)),
    'Si': ('silicio', 'siliciuro', 4, '', (4,), (4,)), 'N': ('nitrógeno', 'nitruro', 3, '', (1, 2, 3, 4, 5), (1, 2, 3, 4, 5)),
    'P': ('fósforo', 'fosfuro', 3, '', (3, 5), (3, 5)), 'As': ('arsénico', 'arseniuro', 3, '', (3, 5), (3, 5)), 'Sb': ('antimonio', 'antimoniuro', 3, '', (3, 5), (3, 5)),
    'O': ('oxígeno', 'óxido', 2, '', (), ()), 'S': ('azufre', 'sulfuro', 2, 'sulfhídrico', (2, 4, 6), (4, 6)),
    'Se': ('selenio', 'seleniuro', 2, 'selenhídrico', (4, 6), (4, 6)), 'Te': ('telurio', 'telururo', 2, 'telurhídrico', (4, 6), (4, 6)),
    'F': ('flúor', 'fluoruro', 1, 'fluorhídrico', (), ()), 'Cl': ('cloro', 'cloruro', 1, 'clorhídrico', (1, 3, 5, 7), (1, 3, 5, 7)),
    'Br': ('bromo', 'bromuro', 1, 'bromhídrico', (1, 3, 5, 7), (1, 3, 5, 7)), 'I': ('yodo', 'yoduro', 1, 'yodhídrico', (1, 3, 5, 7), (1, 3, 5, 7)),
}
HIDRURO_NM = {'N': ('azano', 'amoniaco'), 'P': ('fosfano', 'fosfina'), 'As': ('arsano', 'arsina'), 'Sb': ('estibano', 'estibina'),
              'C': ('metano', 'metano'), 'Si': ('silano', 'silano'), 'B': ('borano', 'borano')}
# Oxoácidos. Por elemento: raíz sin acento (anión y sistemática), raíz con acento de «-ico», raíz de «-oso»,
# y qué prefijo/sufijo corresponde a cada número de oxidación: (nº de oxidación, prefijo, sufijo)
OXOEL = {
    'Cl': ('clor', 'clór', 'clor', [(1, 'hipo', 'oso'), (3, '', 'oso'), (5, '', 'ico'), (7, 'per', 'ico')]),
    'Br': ('brom', 'bróm', 'brom', [(1, 'hipo', 'oso'), (3, '', 'oso'), (5, '', 'ico'), (7, 'per', 'ico')]),
    'I': ('yod', 'yód', 'yod', [(1, 'hipo', 'oso'), (3, '', 'oso'), (5, '', 'ico'), (7, 'per', 'ico')]),
    'S': ('sulf', 'sulfúr', 'sulfur', [(4, '', 'oso'), (6, '', 'ico')]),
    'Se': ('selen', 'selén', 'selenios', [(4, '', 'oso'), (6, '', 'ico')]),
    'Te': ('telur', 'telúr', 'telur', [(4, '', 'oso'), (6, '', 'ico')]),
    'N': ('nitr', 'nítr', 'nitr', [(3, '', 'oso'), (5, '', 'ico')]),
    'P': ('fosf', 'fosfór', 'fosfor', [(3, '', 'oso'), (5, '', 'ico')]),
    'C': ('carbon', 'carbón', 'carbon', [(4, '', 'ico')]),
    'Si': ('silic', 'silíc', 'silic', [(4, '', 'ico')]),
    'B': ('bor', 'bór', 'bor', [(3, '', 'ico')]),
    'Cr': ('crom', 'cróm', 'crom', [(6, '', 'ico')]),
    'Mn': ('mangan', 'mangán', 'mangan', [(6, '', 'ico'), (7, 'per', 'ico')]),
}
# grado de hidratación: óxido + k H₂O. (P y B: «orto» = 3, la forma habitual; Si: 1; «meta» = 1 en P y B; «orto» = 2 en Si)
HIDRAT = {'Cl': (1,), 'Br': (1,), 'I': (1,), 'S': (1,), 'Se': (1,), 'Te': (1,), 'N': (1,), 'C': (1,), 'Cr': (1,), 'Mn': (1,),
          'P': (3, 1), 'B': (3, 1), 'Si': (1, 2)}
DI = ('S', 'P', 'Cr')   # ácidos «di» (pirá-): 2 ácidos − H₂O

def acidos():
    """Todos los oxoácidos que acepta este verificador: {fórmula: dict}, obtenidos como «óxido + k H₂O» (y la forma di: 2 ácidos − H₂O)."""
    r = {}
    for x, (raiz, ico, oso, estados) in OXOEL.items():
        for ox, pref_, suf in estados:
            for k in HIDRAT[x]:
                # ox impar: X₂O_ox + k H₂O = H_{2k}X₂O_{ox+k} = 2 HₖXO_{(ox+k)/2};  ox par: XO_{ox/2} + k H₂O = H_{2k}XO_{ox/2+k}
                nh, nx, no = (k, 1, (ox + k) // 2) if ox % 2 else (2 * k, 1, ox // 2 + k)
                for di in (False, True):
                    if di and x not in DI: continue
                    a = {'x': x, 'nx': nx, 'nh': nh, 'no': no}
                    if di: a = {'x': x, 'nx': 2, 'nh': 2 * nh - 2, 'no': 2 * no - 1}
                    a.update(ox=ox, k=k, di=di, pref=pref_, suf=suf, meta=x in ('P', 'B') and k == 1, orto=x == 'Si' and k == 2)
                    f = 'H' + (str(a['nh']) if a['nh'] > 1 else '') + x + (str(a['nx']) if a['nx'] > 1 else '') + 'O' + (str(a['no']) if a['no'] > 1 else '')
                    r[f] = a
    return r
ACIDOS = acidos()

def adjetivo_acido(a):
    raiz, ico, oso, _ = OXOEL[a['x']]
    base = a['pref'] + (oso + 'oso' if a['suf'] == 'oso' else ico + 'ico')
    if a['suf'] == 'oso' and a['x'] == 'Se': base = a['pref'] + 'selenioso'
    return ('di' if a['di'] else '') + ('meta' if a['meta'] else '') + ('orto' if a['orto'] else '') + base

def anion_trad(a):
    raiz = OXOEL[a['x']][0]
    return ('di' if a['di'] else '') + ('meta' if a['meta'] else '') + ('orto' if a['orto'] else '') + a['pref'] + raiz + ('ito' if a['suf'] == 'oso' else 'ato')

def pref(n, mono=False):
    return GR[n] if (n > 1 or mono) else ''

def anion_sist(a):
    """tetraoxidosulfato, heptaoxidodicromato…"""
    return (pref(a['no']) if a['no'] > 1 else '') + 'oxido' + pref(a['nx']) + OXOEL[a['x']][0] + 'ato'

def estiquiometria(f):
    """'Fe2(SO4)3' → {'Fe': 2, 'S': 3, 'O': 12}"""
    def rec(s):
        cuenta = {}
        i = 0
        while i < len(s):
            if s[i] == '(':
                n, d = 1, 0
                j = i + 1
                while n:
                    if s[j] == '(': n += 1
                    elif s[j] == ')': n -= 1
                    j += 1
                interior = s[i + 1:j - 1]
                m = re.match(r'\d+', s[j:])
                mult = int(m.group()) if m else 1
                j += len(m.group()) if m else 0
                for k, v in rec(interior).items(): cuenta[k] = cuenta.get(k, 0) + v * mult
                i = j
            else:
                m = re.match(r'([A-Z][a-z]?)(\d*)', s[i:])
                if not m: raise ValueError(s)
                cuenta[m.group(1)] = cuenta.get(m.group(1), 0) + (int(m.group(2)) if m.group(2) else 1)
                i += len(m.group())
        return cuenta
    return rec(f)

# =====================================================================
# 2. Nombres
# =====================================================================
def num_romano(m, v):
    nombre, vs, vo, adj, siempre = METAL[m]
    return '(' + ROM[v] + ')' if (len(vs) + len(vo) > 1 or siempre) else ''
def metal_n(m): return METAL[m][0] if m in METAL else 'amonio'

def sist_binario(an, nx, cat, nm, mono_canon):
    """[canónico, …variantes] de 'prefijo+anión de prefijo+catión'"""
    if an == 'óxido':
        formas = {1: 'monóxido', 2: 'dióxido', 3: 'trióxido', 4: 'tetraóxido', 5: 'pentaóxido', 6: 'hexaóxido', 7: 'heptaóxido', 8: 'octaóxido'}
        elid = {4: 'tetróxido', 5: 'pentóxido', 6: 'hexóxido', 7: 'heptóxido', 8: 'octóxido'}
        lista = [formas[nx]] + ([elid[nx]] if nx in elid else [])
        if nx == 1:
            lista = ['monóxido', 'óxido'] if mono_canon else ['óxido', 'monóxido']
    else:
        lista = [pref(nx) + an] if nx > 1 else ([('mono' + an), an] if mono_canon else [an, 'mono' + an])
    return [x + ' de ' + pref(nm) + cat for x in lista]

def interpretar(f, q=0):
    """Devuelve una lista de interpretaciones posibles de la fórmula (normalmente una)."""
    res = []
    if q:   # iones
        return interpretar_ion(f, q)
    at = estiquiometria(f)
    # --- hidrácidos y agua / peróxido de hidrógeno
    m = re.fullmatch(r'H(\d*)(F|Cl|Br|I|S|Se|Te)', f)
    if m:
        n = int(m.group(1) or 1); x = m.group(2)
        if n == NOMET[x][2]:
            nm, an, _, hid, _, _ = NOMET[x]
            res.append(dict(fam='hidracido', oxs={('H', n, 1), (x, 1, -n)},
                            sist=[an + ' de ' + pref(n) + 'hidrógeno'] + ([an + ' de hidrógeno'] if n > 1 else []), stock=[an + ' de hidrógeno'], trad=['ácido ' + hid]))
        return res
    if f == 'H2O':
        return [dict(fam='oxido', oxs={('H', 2, 1), ('O', 1, -2)}, sist=['óxido de dihidrógeno', 'monóxido de dihidrógeno', 'agua'], stock=['óxido de hidrógeno'], trad=['agua'])]
    if f == 'H2O2':
        return [dict(fam='peroxido', oxs={('H', 2, 1), ('O', 2, -1)}, sist=['dióxido de dihidrógeno'], stock=['peróxido de hidrógeno'], trad=['peróxido de hidrógeno'])]
    # --- oxoácidos
    if f in ACIDOS:
        a = ACIDOS[f]
        raiz = OXOEL[a['x']][0]
        res.append(dict(fam='oxoacido', oxs={('H', a['nh'], 1), (a['x'], a['nx'], a['ox']), ('O', a['no'], -2)},
                        sist=[anion_sist(a) + ' de ' + pref(a['nh']) + 'hidrógeno', pref(a['nh']) + 'hidrogeno(' + anion_sist(a) + ')'],
                        stock=[anion_sist(a) + '(' + ROM[a['ox']] + ') de hidrógeno',
                               'ácido ' + (pref(a['no']) if a['no'] > 1 else '') + 'oxo' + pref(a['nx']) + OXOEL[a['x']][1] + 'ico(' + ROM[a['ox']] + ')'],
                        trad=['ácido ' + adjetivo_acido(a)]))
        return res
    # --- hidruros no metálicos (X delante del H en la lista IUPAC)
    m = re.fullmatch(r'(N|P|As|Sb|C|Si|B)H(\d*)', f)
    if m:
        x = m.group(1); n = int(m.group(2) or 1)
        if n == NOMET[x][2] or (x in ('C', 'Si') and n == 4) or (x in ('B',) and n == 3):
            nm = NOMET[x][0]
            sis, tr = HIDRURO_NM[x]
            res.append(dict(fam='hidruroN', oxs={(x, 1, -n), ('H', n, 1)}, sist=[sis, pref(n) + 'hidruro de ' + nm], stock=[], trad=[tr]))
        return res
    # --- compuestos de dos no metales (el primero de la lista IUPAC va delante)
    m = re.fullmatch(r'([A-Z][a-z]?)(\d*)([A-Z][a-z]?)(\d*)', f)
    if m and m.group(1) in NOMET and m.group(3) in NOMET and m.group(1) != 'H':
        x, nx, y, ny = m.group(1), int(m.group(2) or 1), m.group(3), int(m.group(4) or 1)
        if ORDEN.index(x) < ORDEN.index(y) and gcd(nx, ny) == 1:
            neg = NOMET[y][2]
            if (ny * neg) % nx == 0:
                v = ny * neg // nx
                if v in NOMET[x][4] or (y == 'O' and v in NOMET[x][5]):
                    return [nometal_binario(x, nx, y, ny, v)]
        return res
    # --- compuestos iónicos
    return ionico(f)

def nometal_binario(x, nx, y, ny, v):
    nmx = NOMET[x][0]
    an = NOMET[y][1]
    roman = '(' + ROM[v] + ')' if len(NOMET[x][4]) > 1 else ''
    if y == 'O':
        fam = 'oxido'
        sist = sist_binario('óxido', ny, nmx, nx, True)
        stock = ['óxido de ' + nmx + roman] + ([] if roman else ['óxido de ' + nmx + '(' + ROM[v] + ')'])
        trad = []
        adj = ADJ_OXIDO.get((x, v))
        if adj: trad = ['óxido ' + adj]
    else:
        fam = 'salBin'
        sist = sist_binario(an, ny, nmx, nx, True)
        stock = [an + ' de ' + nmx + roman] + ([] if roman else [an + ' de ' + nmx + '(' + ROM[v] + ')'])
        trad = []
    return dict(fam=fam, oxs={(x, nx, v), (y, ny, -NOMET[y][2])}, sist=sist, stock=stock, trad=trad)

# adjetivo de los óxidos de no metales: el mismo que el del ácido normal (sin meta/orto/di); N no lo usa (óxido nítrico = NO)
ADJ_OXIDO = {('C', 2): 'carbonoso'}
for _f, _a in ACIDOS.items():
    if _a['x'] in ('Cr', 'Mn', 'N') or _a['di'] or _a['meta'] or _a['orto']: continue
    ADJ_OXIDO.setdefault((_a['x'], _a['ox']), adjetivo_acido(_a))

def anion_info(texto, na, nc):
    """Todas las lecturas posibles del bloque aniónico: [(clase, datos, carga)]"""
    out = []
    if texto == 'O': out.append(('oxido', None, 2))
    if texto == 'O2': out.append(('peroxido', None, 2))
    if texto == 'OH': out.append(('hidroxido', None, 1))
    if texto == 'H': out.append(('hidruro', None, 1))
    if texto in NOMET and texto not in ('O', 'H'): out.append(('binaria', texto, NOMET[texto][2]))
    m = re.fullmatch(r'(H(\d*))?([A-Z][a-z]?)(\d*)O(\d*)', texto)
    if m:
        h = int(m.group(2) or 1) if m.group(1) else 0
        x = m.group(3); nx = int(m.group(4) or 1); no = int(m.group(5) or 1)
        for ac in ACIDOS.values():
            if ac['x'] == x and ac['nx'] == nx and ac['no'] == no and ac['nh'] - h >= 1:
                out.append(('oxoanion', (ac, h), ac['nh'] - h))
    m = re.fullmatch(r'H(S|Se|Te)', texto)
    if m: out.append(('hidrogeno-X', m.group(1), 1))
    return out

def ionico(f):
    res = []
    m = re.fullmatch(r'(\(NH4\)|NH4|[A-Z][a-z]?)(\d*)(.*)', f)
    if not m: return res
    cat, nc, resto = m.group(1), int(m.group(2) or 1), m.group(3)
    cat = 'NH4' if cat.startswith('(NH4') or cat == 'NH4' else cat
    if cat != 'NH4' and cat not in METAL: return res
    if cat == 'NH4' and m.group(1) == 'NH4' and m.group(2) == '' : pass
    cands = []
    mp = re.fullmatch(r'\((.+)\)(\d+)', resto)
    if mp: cands.append((mp.group(1), int(mp.group(2))))
    else:
        ms = re.fullmatch(r'([A-Z][a-z]?)(\d*)', resto)
        if ms: cands.append((ms.group(1), int(ms.group(2) or 1)))
        cands.append((resto, 1))
    for texto, na in cands:
        for clase, dat, carga in anion_info(texto, na, nc):
            tot = carga * na
            if tot % nc: continue
            v = tot // nc
            if gcd(nc, na) != 1: continue
            if cat == 'NH4':
                if v != 1: continue
            else:
                nm, vs, vo, adj, sie = METAL[cat]
                permitidas = vs + (vo if clase == 'oxido' else ())
                if v not in permitidas: continue
            res.append(sal_ionica(cat, nc, v, clase, dat, na, carga, texto))
    return res

def sal_ionica(cat, nc, v, clase, dat, na, carga, texto):
    nm = metal_n(cat)
    roman = '' if cat == 'NH4' else num_romano(cat, v)
    adj = METAL[cat][3].get(v, '') if cat != 'NH4' else ''
    multi = bool(roman)
    metal_sist = pref(nc) + nm
    def tradicional(base):            # base = nombre del anión
        if adj: return [base + ' ' + adj]
        return [] if (cat != 'NH4' and multi) else [base + ' de ' + nm]
    def stockn(base):
        l = [base + ' de ' + nm + roman]
        if cat != 'NH4' and not roman: l.append(base + ' de ' + nm + '(' + ROM[v] + ')')
        return l
    d = dict()
    if clase == 'oxido':
        d.update(fam='oxido', sist=sist_binario('óxido', na, nm, nc, False), stock=stockn('óxido'), trad=tradicional('óxido'),
                 oxs={(cat, nc, v), ('O', na, -2)})
    elif clase == 'peroxido':
        d.update(fam='peroxido', sist=[({1: 'dióxido', 2: 'tetraóxido', 3: 'hexaóxido'}[na]) + ' de ' + metal_sist],
                 stock=stockn('peróxido'), trad=tradicional('peróxido'), oxs={(cat, nc, v), ('O', 2 * na, -1)})
    elif clase == 'hidroxido':
        d.update(fam='hidroxido', sist=[x for x in ([pref(na) + 'hidróxido'] if na > 1 else ['hidróxido', 'monohidróxido'])], stock=stockn('hidróxido'),
                 trad=tradicional('hidróxido'), oxs={(cat, nc, v), ('O', na, -2), ('H', na, 1)})
        d['sist'] = [x + ' de ' + metal_sist for x in d['sist']]
    elif clase == 'hidruro':
        d.update(fam='hidruroM', sist=[(pref(na) + 'hidruro') + ' de ' + metal_sist], stock=stockn('hidruro'), trad=tradicional('hidruro'), oxs={(cat, nc, v), ('H', na, -1)})
    elif clase == 'binaria':
        an = NOMET[dat][1]
        d.update(fam='salBin', sist=sist_binario(an, na, nm, nc, False), stock=stockn(an), trad=tradicional(an), oxs={(cat, nc, v), (dat, na, -NOMET[dat][2])})
    elif clase == 'oxoanion':
        ac, h = dat
        grupo = lambda x: x if na == 1 else BIS[na] + '(' + x + ')'
        base_sist = (pref(h) + 'hidrogeno' if h else '') + anion_sist(ac)
        base_trad = (pref(h) + 'hidrogeno' if h else '') + anion_trad(ac)
        sist = [grupo(base_sist) + ' de ' + metal_sist]
        if h and na == 1: sist.append(pref(h) + 'hidrogeno(' + anion_sist(ac) + ') de ' + metal_sist)
        stock = stockn(base_trad)
        if not h: stock.append(anion_sist(ac) + '(' + ROM[ac['ox']] + ') de ' + nm + roman)
        trad = tradicional(base_trad)
        if adj: trad.append(stock[0])
        if h:
            tot = ac['nh']
            ex = []
            if h == 1 and tot == 2: ex += [anion_trad(ac) + ' ácido'] + (['bi' + anion_trad(ac)] if ac['x'] in ('C', 'S') else [])
            if h == 1 and tot == 3: ex += [anion_trad(ac) + ' monoácido']
            if h == 2 and tot == 3: ex += [anion_trad(ac) + ' diácido']
            trad += [e + (' ' + adj if adj else ' de ' + nm) for e in ex]
        oxs = {(cat, nc, v), (ac['x'], ac['nx'] * na, ac['ox']), ('O', ac['no'] * na, -2)}
        if h: oxs.add(('H', h * na, 1))
        d.update(fam='salAcida' if h else 'oxisal', sist=sist, stock=stock, trad=trad, oxs=oxs)
    elif clase == 'hidrogeno-X':
        x = dat; an = NOMET[x][1]
        grupo = lambda s: s if na == 1 else BIS[na] + '(' + s + ')'
        d.update(fam='salAcida', sist=[grupo('hidrogeno' + an) + ' de ' + metal_sist], stock=stockn('hidrogeno' + an),
                 trad=tradicional('hidrogeno' + an) + ([stockn('hidrogeno' + an)[0]] if adj else []) + [e + (' ' + adj if adj else ' de ' + nm) for e in [an + ' ácido', 'bi' + an]],
                 oxs={(cat, nc, v), ('H', na, 1), (x, na, -2)})
        if adj: d['trad'] = d['trad']
    return d

def interpretar_ion(f, q):
    n = abs(q)
    cuerpo = f[:len(f) - 1 - (len(str(n)) if n > 1 else 0)]
    res = []
    if q > 0:
        if cuerpo == 'NH4':
            return [dict(fam='ion', oxs={('NH4', 1, 1)}, sist=['ion amonio', 'catión amonio'], stock=['ion amonio', 'catión amonio'], trad=['ion amonio', 'catión amonio'])]
        if cuerpo == 'H3O':
            return [dict(fam='ion', oxs={('H', 3, 1), ('O', 1, -2)}, sist=['ion oxonio', 'catión oxonio', 'ion hidronio', 'catión hidronio'],
                         stock=['ion oxonio', 'catión oxonio', 'ion hidronio', 'catión hidronio'], trad=['ion hidronio', 'catión hidronio', 'ion oxonio'])]
        if cuerpo in METAL:
            nm, vs, vo, adj, sie = METAL[cuerpo]
            if n not in vs: return []
            roman = num_romano(cuerpo, n); carga = '(' + str(n) + '+)'
            stock = ['catión ' + nm + roman, 'ion ' + nm + roman] + ([] if roman else ['catión ' + nm + '(' + ROM[n] + ')'])
            sist = ['ion ' + nm + carga, 'catión ' + nm + carga] + ([] if roman else ['ion ' + nm, 'catión ' + nm])
            trad = ['ion ' + adj[n], 'catión ' + adj[n]] if n in adj else ([] if roman else ['ion ' + nm, 'catión ' + nm])
            return [dict(fam='ion', oxs={(cuerpo, 1, n)}, sist=sist, stock=stock, trad=trad)]
        return []
    # aniones
    cargatxt = '(' + str(n) + '−)'
    if cuerpo in NOMET and cuerpo not in ('O',) and NOMET[cuerpo][2] == n:
        nom = NOMET[cuerpo][1]
        o = ['ion ' + nom, 'anión ' + nom]
        return [dict(fam='ion', oxs={(cuerpo, 1, -n)}, sist=o, stock=o, trad=o)]
    if cuerpo == 'H' and n == 1:
        o = ['ion hidruro', 'anión hidruro']
        return [dict(fam='ion', oxs={('H', 1, -1)}, sist=o, stock=o, trad=o)]
    if cuerpo == 'O' and n == 2:
        o = ['ion óxido', 'anión óxido']
        return [dict(fam='ion', oxs={('O', 1, -2)}, sist=o, stock=o, trad=o)]
    if cuerpo == 'OH' and n == 1:
        o = ['ion hidróxido', 'anión hidróxido']
        return [dict(fam='ion', oxs={('O', 1, -2), ('H', 1, 1)}, sist=o, stock=o, trad=o)]
    if cuerpo == 'O2' and n == 2:
        return [dict(fam='ion', oxs={('O', 2, -1)}, sist=['ion peróxido', 'anión peróxido', 'ion dióxido(2−)'], stock=['ion peróxido', 'anión peróxido'], trad=['ion peróxido', 'anión peróxido'])]
    m = re.fullmatch(r'H(S|Se|Te)', cuerpo)
    if m and n == 1:
        nom = 'hidrogeno' + NOMET[m.group(1)][1]
        o = ['ion ' + nom, 'anión ' + nom]
        return [dict(fam='ion', oxs={('H', 1, 1), (m.group(1), 1, -2)}, sist=o, stock=o, trad=o)]
    for clase, dat, carga in anion_info(cuerpo, 1, 1):
        if clase == 'oxoanion' and carga == n:
            ac, h = dat
            tr = (pref(h) + 'hidrogeno' if h else '') + anion_trad(ac)
            si = (pref(h) + 'hidrogeno' if h else '') + anion_sist(ac) + cargatxt
            oxs = {(ac['x'], ac['nx'], ac['ox']), ('O', ac['no'], -2)}
            if h: oxs.add(('H', h, 1))
            res.append(dict(fam='ion', oxs=oxs, sist=['ion ' + si, 'anión ' + si, 'ion ' + tr, 'anión ' + tr],
                            stock=['ion ' + tr, 'anión ' + tr], trad=['ion ' + tr, 'anión ' + tr]))
    return res

# =====================================================================
# 3. Normalización (la misma idea que usa la web para corregir lo escrito, escrita aparte)
# =====================================================================
SUB = str.maketrans('₀₁₂₃₄₅₆₇₈₉⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻−', '01234567890123456789+--')
def nombre_n(s):
    s = unicodedata.normalize('NFD', s.translate(SUB).lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = re.sub(r'\s*\(\s*', '(', s); s = re.sub(r'\s*\)\s*', ') ', s)
    return re.sub(r'\s+', ' ', s).strip()
def formula_n(s):
    s = re.sub(r'\((aq|g|s|l)\)', '', s.translate(SUB))
    s = re.sub(r'[\s_^{}·]', '', s)
    s = re.sub(r'\((\d*[+-])\)$', r'\1', s)
    m = re.fullmatch(r'(.*?)([+-])(\d+)', s)
    return m.group(1) + m.group(3) + m.group(2) if m else s

# =====================================================================
# 4. Verificaciones
# =====================================================================
def leer(ruta): return json.load(open(ruta, encoding='utf-8'))
ampl = leer(sys.argv[1])
motores = leer(sys.argv[2]) if len(sys.argv) > 2 else None
T3 = ampl['ampl']['fyq1']['t3']
SIS = ('sist', 'stock', 'trad')

def interp_por_formula(f, q=0):
    try: return interpretar(f, q)
    except Exception as e:
        return []

def coincide(js, py):
    """¿Coincide el registro de la web con esta interpretación? (mismo primer nombre y conjunto contenido)"""
    for s in SIS:
        a, b = js.get(s) or [], py[s]
        if bool(a) != bool(b): return False
        if a and (nombre_n(a[0]) != nombre_n(b[0]) or not {nombre_n(x) for x in a} <= {nombre_n(x) for x in b}): return False
    return True

n_cat = 0
fam_cuenta = {}
if motores:
    F = motores['formulacion']
    # --- metales: tabla del motor frente a la propia
    for m in F['metales']:
        py = METAL.get(m['s'])
        comprobar('metal ' + m['s'], py is not None and py[0] == m['n'] and tuple(m['v']) == py[1] and tuple(m['vo']) == py[2], str(m))
    # --- oxoácidos del motor frente a los derivados «óxido + H₂O»
    for a in F['oxo']:
        py = ACIDOS.get(a['f'])
        comprobar('oxoácido ' + a['f'], py is not None and py['ox'] == a['ox'] and py['x'] == a['x'] and adjetivo_acido(py) == a['adj'] and anion_trad(py) == a['an'], str(a))
    # --- catálogo completo
    for r in F['catalogo']:
        n_cat += 1
        interps = interp_por_formula(r['f'], r.get('q', 0))
        fam_cuenta[r['fam']] = fam_cuenta.get(r['fam'], 0) + 1
        if not interps:
            comprobar('catálogo ' + r['f'], False, 'no reconocido por el nombrador independiente'); continue
        oxs_js = {(s, n, o) for s, n, o in r['oxs']}
        bien = [i for i in interps if i['fam'] == r['fam'] and i['oxs'] == oxs_js and coincide(r, i)]
        comprobar('catálogo ' + r['f'], bool(bien), f"web={r['fam']} {r['sist']} {r['stock']} {r['trad']} | py={[ (i['fam'], i['sist'], i['stock'], i['trad']) for i in interps]}")
        # neutralidad de carga
        carga = sum(n * o for s, n, o in r['oxs'])
        comprobar('carga ' + r['f'], carga == r.get('q', 0), f'suma={carga}')

# =====================================================================
# 5. Ejercicios, ejemplos y tablas del tema
# =====================================================================
def acepta_nombre(f, q, sis, texto):
    """¿es `texto` un nombre válido de `f` en el sistema `sis` ('any' = cualquiera)?"""
    ints = interp_por_formula(f, q)
    for i in ints:
        ls = [x for s in SIS for x in i[s]] if sis == 'any' else i[sis]
        if nombre_n(texto) in {nombre_n(x) for x in ls}: return True
    return False

def formula_correcta(f, q, texto):
    return formula_n(texto) == formula_n(f)

def canonico(f, q, sis):
    ints = interp_por_formula(f, q)
    return ints[0][sis][0] if ints and ints[0][sis] else None

def formula_de(r):  # 'Fe2O3' o ion con carga (clave tal como la guarda el motor)
    return r

ejercicios = T3.get('ejercicios', [])
n_verif = 0
ids = set()
for e in ejercicios:
    ids.add(e['id'])
    for v in (e.get('verif') or []):
        n_verif += 1
        f, q, sis, dr = v['f'], v.get('q', 0), v.get('sis', 'any'), v['dir']
        checks = e['check'] if isinstance(e['check'], list) else [e['check']]
        campo = checks[v.get('campo', 0)]
        if dr == 'nf':      # el enunciado da el nombre; la respuesta es la fórmula
            comprobar(f"ej {e['id']} fórmula", any(formula_correcta(f, q, x) for x in campo['valores']) and all(formula_correcta(f, q, x) for x in campo['valores']), f"{f} vs {campo['valores']}")
            if v.get('nombre'):
                comprobar(f"ej {e['id']} nombre del enunciado", acepta_nombre(f, q, sis, v['nombre']), f"{f} [{sis}] {v['nombre']} → {canonico(f, q, sis if sis != 'any' else 'sist')}")
        elif dr == 'fn':    # el enunciado da la fórmula; la respuesta es el nombre
            comprobar(f"ej {e['id']} nombre", all(acepta_nombre(f, q, sis, x) for x in campo['valores']) and len(campo['valores']) > 0,
                      f"{f} [{sis}] {campo['valores']} → py {canonico(f, q, sis if sis != 'any' else 'sist')}")
            if sis != 'any' and sis in SIS:   # además: el nombre canónico debe estar entre los valores
                c = canonico(f, q, sis)
                comprobar(f"ej {e['id']} contiene el nombre de libro", c is not None and nombre_n(c) in {nombre_n(x) for x in campo['valores']}, f"{c} ∉ {campo['valores']}")
            for o in campo.get('otras', []):
                comprobar(f"ej {e['id']} «otras» es de otro sistema", acepta_nombre(f, q, 'any', o) and not acepta_nombre(f, q, sis, o), f"{o}")
        elif dr == 'fam':   # familia
            ints = interp_por_formula(f, q)
            comprobar(f"ej {e['id']} familia", any(i['fam'] == v['fam'] for i in ints), f"{f} → {[i['fam'] for i in ints]}")
        elif dr == 'oxi':   # número de oxidación de un elemento
            ints = interp_por_formula(f, q)
            val = [o for i in ints for (s, n, o) in i['oxs'] if s == v['el']]
            comprobar(f"ej {e['id']} n.º de oxidación de {v['el']}", v['ox'] in val and campo.get('valor', v['ox']) == v['ox'], f"{f}: py {val}, web {v['ox']}")
    if 'cuenta' in e:   # comprobaciones numéricas / de texto con expresión python
        for c in e['cuenta']:
            comprobar(f"ej {e['id']} cuenta", abs(eval(c['py']) - c['val']) < 1e-6, c['py'])

# --- entradas de verificación registradas por el contenido (teoría, ejemplos, tablas, láminas, actividades)
#     {f, q, sis, t}   sis = sist | stock | trad | any: «t» es un nombre válido de f en ese sistema
#     {f, q, sis:'formula'}: la fórmula existe y es neutra
#     {f, q, sis, t, no:true}: «t» NO es un nombre de f (distractor o «incorrecto» deliberado)
#     {f, fam}: f pertenece a esa familia
def entrada(v, donde):
    f, q = v['f'], v.get('q', 0)
    if 'fam' in v and 'sis' not in v:
        ints = interp_por_formula(f, q)
        comprobar(f'{donde} familia {f}', any(i['fam'] == v['fam'] for i in ints), f"{f} → {[i['fam'] for i in ints]}")
        return
    sis, t = v['sis'], v.get('t', '')
    if sis == 'formula':
        ints = interp_por_formula(f, q)
        comprobar(f'{donde} fórmula {f}', len(ints) > 0 and all(sum(n * o for (s, n, o) in i['oxs']) == q for i in ints), f'{f} no se reconoce o no es neutra')
    elif v.get('no'):
        comprobar(f'{donde} «{t}» NO debe ser nombre de {f}', not acepta_nombre(f, q, sis, t), f'{f}: es válido en {sis}')
    else:
        comprobar(f'{donde} {f} [{sis}] «{t}»', acepta_nombre(f, q, sis, t), f"py={canonico(f, q, sis if sis != 'any' else 'sist')}")

ejem = T3.get('verif', [])
for v in ejem: entrada(v, 'texto')

# reglas de la teoría: hechos concretos que se recalculan aquí
for c in T3.get('cuentas', []):
    comprobar('cuenta ' + c['py'], abs(eval(c['py']) - c['val']) < 1e-6, c['py'])

# actividades: tarjetas, emparejar, clasificar, test (pares fórmula ↔ nombre, familias, números de oxidación)
n_act = 0
for k, d in (T3.get('datos') or {}).items():
    for v in d.get('verif', []):
        entrada(v, f'actividad {k}'); n_act += 1
    if d.get('categorias') and d.get('items'):
        for it in d['items']:
            if not it.get('f'): continue
            n_act += 1
            ints = interp_por_formula(it['f'], it.get('q', 0))
            if it.get('fam'): comprobar(f'clasificar {k}: {it["f"]} familia', any(i['fam'] == it['fam'] for i in ints), f"{[i['fam'] for i in ints]}")
            if it.get('el'):
                val = [o for i in ints for (s, n, o) in i['oxs'] if s == it['el']]
                comprobar(f'clasificar {k}: {it["f"]} n.º de oxidación de {it["el"]}', it['ox'] in val and d['categorias'][it['c']].replace('−', '-') == f"{it['ox']:+d}", f"py {val}")
    # coherencia de los pares de «emparejar»: cada par distinto
    if d.get('pares'):
        comprobar(f'emparejar {k}: pares distintos', len({p[0] for p in d['pares']}) == len(d['pares']) and len({p[1] for p in d['pares']}) == len(d['pares']))

# cada campo de texto de un ejercicio debe estar cubierto por una entrada «verif»
sin_verif = []
for e in ejercicios:
    checks = e['check'] if isinstance(e['check'], list) else [e['check']]
    cubiertos = {v.get('campo', 0) for v in (e.get('verif') or []) if v.get('dir') in ('nf', 'fn')}
    for i, c in enumerate(checks):
        if c['tipo'] == 'texto' and i not in cubiertos: sin_verif.append(f"{e['id']} campo {i}")
comprobar('todos los campos de texto de los ejercicios están verificados', not sin_verif, str(sin_verif))

# exploración blanda de la teoría: fórmulas escritas «a mano» que el nombrador reconoce o no (solo informa)
def texto_plano(h):
    h = re.sub(r'<[^>]+>', ' ', h)
    return re.sub(r'\s+', ' ', h.replace('&lt;', '<').replace('&gt;', '>'))
secc = T3.get('secciones') or {}
html = ' '.join(list(secc.values()) + [n['html'] for n in (T3.get('nuevas') or [])])
plano = texto_plano(html)
SUBD = '₀₁₂₃₄₅₆₇₈₉'
cand = set(re.findall(r'(?<![A-Za-zÁ-úñ(])((?:[A-Z][a-z]?[' + SUBD + r']*|\((?:[A-Z][a-z]?[' + SUBD + r']*)+\)[' + SUBD + r']*){2,})(?![a-zá-úñ])', plano))
sin_reconocer, reconocidos = [], 0
for tok in sorted(cand):
    asc = tok.translate(SUB)
    if not re.search(r'\d|\(', asc): continue          # sin subíndices: ruido (siglas, símbolos juntos)
    if interp_por_formula(asc, 0): reconocidos += 1
    else: sin_reconocer.append(tok)
print(f'exploración de la teoría: {reconocidos} fórmulas escritas a mano reconocidas; sin reconocer (revisar a ojo; algunas son moléculas o iones): {len(sin_reconocer)}')
if sin_reconocer: print('   ', ' · '.join(sin_reconocer[:90]))

# exploración blanda 2: nombres entre «…» en la teoría que empiezan como un nombre de compuesto y no están en el catálogo propio
if motores:
    todos = set()
    for r in motores['formulacion']['catalogo']:
        for i in interp_por_formula(r['f'], r.get('q', 0)):
            for s_ in SIS:
                for x in i[s_]: todos.add(nombre_n(x))
    citas = set(re.findall(r'«([^»]{4,80})»', plano))
    raros = []
    for c in sorted(citas):
        w1 = nombre_n(c).split(' ')[0]
        if re.fullmatch(r'(acido|[a-z]*(oxido|hidroxido|hidruro|uro|ato|ito))', w1) and nombre_n(c) not in todos and len(c.split(' ')) <= 8:
            raros.append(c)
    print(f'exploración de nombres entre «…»: {len(citas)} citas; empiezan como nombre de compuesto y no están en el catálogo propio: {len(raros)}')
    if raros: print('   ', ' · '.join(raros[:70]))

n_ej = sum(1 for e in ejercicios if e.get('verif'))
print(f'catálogo del motor: {n_cat} compuestos {fam_cuenta}')
print(f'ejercicios: {len(ejercicios)} ({n_ej} con verificación de fórmula, nombre, familia o n.º de oxidación) · entradas de teoría verificadas: {len(ejem)} · de actividades: {n_act}')
print(f'comprobaciones correctas: {ok} · fallos: {len(fallos)}')
for f_ in fallos[:int(__import__('os').environ.get('MAXF', 25))]: print('  FALLO', f_[:420])
sys.exit(1 if fallos else 0)
