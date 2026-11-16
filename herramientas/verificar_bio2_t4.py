#!/usr/bin/env python3
"""
Verificación independiente de Biología II, tema 4 (Proteínas y enzimas).
No comparte código con la web: recalcula con fracciones/sympy cada cifra de ejemplos y ejercicios
(enlaces peptídicos y agua liberada, masas de péptidos, combinaciones 20^n, nucleótidos por aminoácido,
Hb e insulina, ecuación de Michaelis–Menten con y sin inhibidor, Q10 y los modelos de los tres simuladores),
comprueba hechos y fechas de la ficha, que cada ejercicio de opción tenga una única respuesta correcta que
coincida con los hechos, y que la ficha no contradiga la teoría.

Convenciones declaradas: masas de los aminoácidos libres (g/mol) Gly 75,07, Ala 89,09, Val 117,15, Phe 165,19,
Ser 105,09, Cys 121,16, Asp 133,10, Lys 146,19; agua 18,015 g/mol; masa del péptido = suma − 18,015·(n−1).
Michaelis–Menten: v = Vmax·[S]/(Km+[S]); competitiva: Km' = Km(1+[I]/Ki); no competitiva: Vmax' = Vmax/(1+[I]/Ki).
Temperatura (modelo cualitativo): por debajo del óptimo ×2 cada 10 °C; por encima 2^-((T-Topt)/5)^2. pH: 2^-((pH-opt))^2.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_bio2_t4.py /tmp/ampl.json
"""
import json, math, re, sys
from fractions import Fraction as F
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


datos = json.load(open(sys.argv[1]))
T = datos['ampl']['bio2']['t4']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# ---------------------------------------------------------------- péptidos: enlaces, agua, masas
M = {'Gly': F('75.07'), 'Ala': F('89.09'), 'Val': F('117.15'), 'Phe': F('165.19'), 'Ser': F('105.09'),
     'Cys': F('121.16'), 'Asp': F('133.10'), 'Lys': F('146.19')}
AGUA = F('18.015')


def masa_pep(seq):
    return sum(M[a] for a in seq) - AGUA * (len(seq) - 1)


casi('Gly-Ala: 146,15', float(masa_pep(['Gly', 'Ala'])), 146.15, 0.0005)
casi('Gly-Ala-Ser: 233,22', float(masa_pep(['Gly', 'Ala', 'Ser'])), 233.22, 0.0005)
casi('Ser-Gly-Ala-Cys: 336,37', float(masa_pep(['Ser', 'Gly', 'Ala', 'Cys'])), 336.37, 0.0005)
cierto('n aminoácidos → n−1 enlaces (n=12 → 11)', 12 - 1 == 11)
cierto('150 aa → 149 H2O', 150 - 1 == 149)
cierto('20^3 = 8000 y 20^4 = 160000', 20 ** 3 == 8000 and 20 ** 4 == 160000)
casi('20^100 ≈ 1,3e130', float(sp.log(sp.Integer(20) ** 100, 10)), 130 + math.log10(1.27), 0.0005)
cierto('20^100 > 10^80 (átomos del universo observable)', 20 ** 100 > 10 ** 80)
cierto('99 aa → 297 nt + 3 (stop) = 300', 99 * 3 + 3 == 300)
cierto('300 aa → 903 nucleótidos con stop', 300 * 3 + 3 == 903)
cierto('250 aa · 110 Da = 27,5 kDa', F(250 * 110, 1000) == F('27.5'))
cierto('Hb: 2·141 + 2·146 = 574 aa; 574 − 4 = 570 enlaces', 2 * 141 + 2 * 146 == 574 and 574 - 4 == 570)
cierto('Hb: 574·110 ≈ 63 kDa (real con hemos ≈ 64,5)', abs(574 * 110 / 1000 - 63.14) < 0.01)
cierto('insulina: 21 + 30 = 51 aa; 2 cadenas → 49 enlaces', 21 + 30 == 51 and 51 - 2 == 49)
cierto('3 cadenas de 1000 aa: 3000 − 3 = 2997 enlaces/aguas', 3 * 1000 - 3 == 2997)
cierto('aminoácidos: 9 + 6 + 2 + 3 = 20', 9 + 6 + 2 + 3 == 20)
cierto('esenciales del adulto: 9', len(['His', 'Ile', 'Leu', 'Lys', 'Met', 'Phe', 'Thr', 'Trp', 'Val']) == 9)
cierto('tabla de teoría: 9, 6, 2 y 3 aminoácidos por tipo', all(x in teoria for x in ('Apolar</b> (9)', 'Polar sin carga</b> (6)', 'Ácido</b> (2)', 'Básico</b> (3)')))

# modelo del widget bio_aminoacidos (n máximo 12) y el ejemplo Gly-Ala-Ser
cierto('widget: 12 residuos → 11 enlaces y 11 H2O; 20^12 ≈ 4,096e15', 20 ** 12 == 4096000000000000)

# ---------------------------------------------------------------- Michaelis–Menten (sympy)
S, Vm, Km = sp.symbols('S Vm Km', positive=True)
v = Vm * S / (Km + S)
cierto('v(S = Km) = Vmax/2', sp.simplify(v.subs(S, Km) - Vm / 2) == 0)
cierto('v(S = 9Km) = 0,9 Vmax', sp.simplify(v.subs(S, 9 * Km) / Vm) == sp.Rational(9, 10))
cierto('v(S = 4Km) = 0,8 Vmax', sp.simplify(v.subs(S, 4 * Km) / Vm) == sp.Rational(4, 5))
cierto('v(S = 19Km) = 0,95 Vmax', sp.simplify(v.subs(S, 19 * Km) / Vm) == sp.Rational(19, 20))
casi('v(S = 0,1Km) = 9,09 %', float(sp.N(v.subs(S, Km / 10) / Vm)), 0.0909, 0.002)
cierto('ley de despeje: 80 % de Vmax → [S] = 4 Km', sp.solve(sp.Eq(S / (Km + S), sp.Rational(4, 5)), S)[0] == 4 * Km)
for s, x in zip((1, 2, 4, 8, 16, 32), (33.3, 50.0, 66.7, 80.0, 88.9, 94.1)):
    cierto('sin inhibidor S=%s → %s' % (s, x), abs(100 * s / (2 + s) - x) < 0.05)
for s, x in zip((1, 2, 4, 8, 16, 32), (14.3, 25.0, 40.0, 57.1, 72.7, 84.2)):
    cierto('con inhibidor competitivo (Km 6) S=%s → %s' % (s, x), abs(100 * s / (6 + s) - x) < 0.05)
cierto('curva con inhibidor: v = 50 en S = 6 (Km aparente 6 = 3·Km)', 100 * 6 / (6 + 6) == 50 and 6 == 3 * 2)
# ejercicios d1–d4, d15, c8, c9
casi('d1: 75', 100 * 6 / (2 + 6), 75)
casi('d3: 66,67', 100 * 12 / (6 + 12), 66.67, 0.001)
casi('d3: sin inhibidor serían 85,7', 100 * 12 / (2 + 12), 85.7, 0.001)
casi('d4: 45', 50 * 18 / (2 + 18), 45)
cierto('d4: nunca supera 50', 50 * 18 / (2 + 18) < 50)
cierto('d2: v = Vmax/2 con S = 3 → Km = 3', 80 / 2 == 40)
# modelo del widget bio_enzima: Km = 2 mM, Vmax = 100·E; competitivo Km·(1+i); no competitivo Vmax/(1+i)
cierto('widget: competitivo i = 2 → Km_ap = 6; v(6) = 50', 2 * (1 + 2) == 6 and 100 * 6 / (6 + 6) == 50)
cierto('widget: no competitivo i = 1 → Vmax_ap = 50; v(2) = 25', 100 / (1 + 1) == 50 and 50 * 2 / (2 + 2) == 25)
cierto('widget: E×2 → Vmax 200, v(2) = 100', 200 * 2 / (2 + 2) == 100)

# ---------------------------------------------------------------- temperatura y pH (modelo del widget bio_factores)
def relT(t, opt):
    return 2 ** ((t - opt) / 10) if t <= opt else 2 ** (-((t - opt) / 5) ** 2)


def relP(p, opt):
    return 2 ** (-((p - opt)) ** 2)


casi('humana a 27 °C: 50 %', relT(27, 37), 0.5)
casi('humana a 42 °C: 50 %', relT(42, 37), 0.5)
casi('humana a 47 °C: 6,25 %', relT(47, 37), 0.0625)
casi('Taq a 62 °C: 50 %', relT(62, 72), 0.5)
casi('pepsina a pH 3: 50 %', relP(3, 2), 0.5)
casi('pepsina a pH 7: casi nula', relP(7, 2) + 1, 1, 0.001)
cierto('el máximo del modelo es 1 en el óptimo', relT(37, 37) == 1 and relP(2, 2) == 1)
cierto('amilasa a pH 2 ≈ 0 (casi inactiva)', relP(2, 6.8) < 0.001)
casi('Q10 = 2: 1,5 → 6 en 20 °C', 1.5 * 2 * 2, 6)
casi('Q10 = 2: 1 → 2 → 4 (teoría)', 1 * 2 * 2, 4)

# ---------------------------------------------------------------- cada ejercicio numérico contra su cálculo independiente
ESPERADO = {
    'b16': 11, 'c1': 149, 'c2': float(masa_pep(['Gly', 'Ala'])), 'c3': 8000, 'c4': 160000,
    'c5': float(masa_pep(['Ser', 'Gly', 'Ala', 'Cys'])), 'c8': 0.5, 'c9': 0.9, 'c14': 6,
    'd1': 75, 'd2': 3, 'd3': 100 * 12 / 18, 'd4': 45, 'd5': 903, 'd6': 27.5, 'd7': 570, 'd8': 49, 'd9': 2997, 'd15': 16,
}
for eid, vv in ESPERADO.items():
    ch = EJ[eid]['check']
    cierto('%s es de tipo num' % eid, ch['tipo'] == 'num')
    casi('ejercicio %s' % eid, ch['valor'], vv, 0.003)
    cierto('%s: tolerancia razonable (≤ 2 %%)' % eid, ch.get('tol', 0.005) <= 0.02)


# ---------------------------------------------------------------- ejercicios de opción: única correcta y coincide con los hechos
def checks(e):
    c = e['check']
    return c if isinstance(c, list) else [c]


for e in T['ejercicios']:
    for c in checks(e):
        if c['tipo'] == 'opcion':
            ops = c['opciones']
            cierto('%s: opciones distintas' % e['id'], len(set(ops)) == len(ops))
            cierto('%s: ok dentro de rango' % e['id'], 0 <= c['ok'] < len(ops))

CLAVE = {
    'b1': 'radical R', 'b2': '20', 'b3': 'agua', 'b5': 'secundarias', 'b7': 'conservan su secuencia', 'b8': 'Hemoglobina',
    'b10': 'proteica', 'b12': 'sitio activo', 'b14': 'se desnaturaliza', 'b15': '≈ 2',
    'c7': 'La A', 'c11': 'Km aparente aumenta', 'c12': 'Vmax disminuye', 'c13': 'desnaturaliza', 'c16': 'Vmax se duplica',
    'c19': 'peptídico', 'c20': 'rompe las proteínas de la gelatina',
    'd10': '37 °C', 'd11': '6,8', 'd12': 'replegarse', 'd14': 'no competitiva',
}
for eid, k in CLAVE.items():
    c = checks(EJ[eid])[0]
    cierto('%s: la correcta contiene «%s»' % (eid, k), k.lower() in c['opciones'][c['ok']].lower())
    if eid not in ('b2', 'd14', 'c7', 'c11', 'c12', 'c13'):
        cierto('%s: ninguna otra contiene «%s»' % (eid, k), all(k.lower() not in o.lower() for i, o in enumerate(c['opciones']) if i != c['ok']))
# en las que la clave puede aparecer negada en otra opción, basta comprobar que la correcta es la primera afirmación contrastada
cierto('b2: 20 es la única opción igual a «20»', sum(o == '20' for o in checks(EJ['b2'])[0]['opciones']) == 1)
cierto('d14: solo una opción dice «no competitiva»', sum('no competitiva' in o.lower() for o in checks(EJ['d14'])[0]['opciones']) == 1)
cierto('c11: la opción de la competitiva dice Km aparente aumenta y Vmax no cambia', 'vmax no cambia' in checks(EJ['c11'])[0]['opciones'][checks(EJ['c11'])[0]['ok']].lower())
cierto('c12: la no competitiva baja la Vmax y la Km no cambia', 'km no cambia' in checks(EJ['c12'])[0]['opciones'][checks(EJ['c12'])[0]['ok']].lower())

VF_ESP = {'b4': False, 'b11': False, 'c6': False, 'c15': True, 'd13': False}
for eid, vv in VF_ESP.items():
    c = checks(EJ[eid])[0]
    cierto('%s: V/F correcto' % eid, (c['opciones'][c['ok']] == 'Verdadero') == vv)

EMP = {
    'b9': {'Colágeno': 'Estructural', 'Hemoglobina': 'Transporte', 'Insulina': 'Hormonal', 'Anticuerpo': 'Defensiva'},
    'c10': {'Se parece al sustrato y compite por el sitio activo': 'Competitiva', 'Se une fuera del sitio activo y baja la Vmax': 'No competitiva',
            'Se une con enlace covalente (como la penicilina)': 'Irreversible'},
    'c18': {'De 0 a 37 °C': 'aumenta', 'Muy por encima de su óptimo': 'desnaturaliza', 'Si estaba desnaturalizada y se enfría': 'No recupera'},
}
for eid, mapa in EMP.items():
    for c in checks(EJ[eid]):
        k = mapa[c['etiqueta']]
        cierto('%s/%s correcto' % (eid, c['etiqueta'][:20]), k.lower() in c['opciones'][c['ok']].lower())
        cierto('%s/%s única' % (eid, c['etiqueta'][:20]), sum(k.lower() in o.lower() for o in c['opciones']) == 1 or (eid == 'c10' and c['opciones'].count(k) == 1))

cierto('b6: valores aceptados', 'puentes de hidrogeno' in EJ['b6']['check']['valores'])
cierto('b13: sufijo asa', EJ['b13']['check']['valores'] == ['asa', '-asa'])
cierto('c17: holoenzima', EJ['c17']['check']['valores'] == ['holoenzima'])

# test y «encuentra el error»: única correcta
for nombre in ('quiz1', 'errores'):
    for p in T['datos'][nombre]['preguntas']:
        cierto('%s: %s… ok en rango y opciones distintas' % (nombre, p['q'][:25]), 0 <= p['ok'] < len(p['op']) and len(set(p['op'])) == len(p['op']))
QUIZ_OK = ['radical r', 'condensación', '99 enlaces', 'terciaria', 'rompe enlaces débiles', 'v = vmax/2', 'sitio activo; la vmax no cambia', 'se desnaturaliza']
for p, k in zip(T['datos']['quiz1']['preguntas'], QUIZ_OK):
    cierto('quiz: «%s» contiene «%s»' % (p['q'][:25], k), k in p['op'][p['ok']].lower() or k in limpio(p['porque']).lower() or k.replace(' ', '') in p['op'][p['ok']].lower().replace(' ', ''))
cierto('quiz: 8 preguntas', len(T['datos']['quiz1']['preguntas']) == 8)
FALSAS = [
    ('mismo radical r', 'lo que cambia es el r'), ('consumo de una molécula de agua', 'se libera agua'),
    ('pierde su secuencia', 'secuencia primaria'), ('todas las proteínas tienen estructura cuaternaria', 'varias cadenas'),
    ('se consume', 'se recupera intacta'), ('sin límite', 'tope'), ('el frío desnaturaliza', 'solo ralentiza'),
]
errs = T['datos']['errores']['preguntas']
cierto('errores: 7 preguntas', len(errs) == 7)
for p, (f, por) in zip(errs, FALSAS):
    cierto('error «%s»: la señalada es la falsa' % f, f.lower() in p['op'][p['ok']].lower())
    cierto('error «%s»: explicación coherente' % f, por.lower() in p['porque'].lower())

# actividades de clasificar
AMINO = {'Glicina': 0, 'Alanina': 0, 'Valina': 0, 'Fenilalanina': 0, 'Serina': 1, 'Cisteína': 1, 'Tirosina': 1, 'Glutamina': 1,
         'Ácido aspártico': 2, 'Ácido glutámico': 2, 'Lisina': 3, 'Arginina': 3}
for it in T['datos']['aminoacidos']['items']:
    cierto('aminoácido %s' % it['t'], AMINO[it['t']] == it['c'])
NIVEL = {'Enlace peptídico entre dos aminoácidos': 0, 'Sustituir Glu por Val en la cadena β de la hemoglobina': 0, 'Puentes de H en una hélice α': 1,
         'Lámina β de la fibroína de la seda': 1, 'Puente disulfuro entre dos cisteínas de la misma cadena': 2,
         'Radicales apolares agrupados en el interior de la mioglobina': 2, 'Unión de las cuatro cadenas de la hemoglobina': 3,
         'Dos subunidades que se asocian por enlaces débiles': 3}
for it in T['datos']['niveles']['items']:
    cierto('nivel %s' % it['t'][:30], NIVEL[it['t']] == it['c'])
CLASES = {'Deshidrogenasa láctica': 0, 'Catalasa': 0, 'Hexoquinasa': 1, 'Amilasa': 2, 'Lipasa': 2, 'Fumarasa': 3, 'Glucosa-fosfato isomerasa': 4, 'ADN ligasa': 5}
for it in T['datos']['clases']['items']:
    cierto('clase %s' % it['t'], CLASES[it['t']] == it['c'])
cierto('6 clases de enzimas', len(T['datos']['clases']['categorias']) == 6)
INH = {'Se parece al sustrato y ocupa el sitio activo': 0, 'Se supera añadiendo mucho sustrato': 0, 'Aumenta la Km y la Vmax no cambia': 0, 'Malonato frente al succinato': 0,
       'Baja la Vmax y la Km no cambia': 1, 'Metal pesado unido a grupos –SH': 1, 'Se une fuera del sitio activo': 1,
       'Penicilina sobre la transpeptidasa bacteriana': 2, 'Aspirina sobre la ciclooxigenasa': 2, 'Se une a la enzima con enlace covalente': 2}
for it in T['datos']['inhibicion']['items']:
    cierto('inhibición %s' % it['t'][:30], INH[it['t']] == it['c'])
ORD = [i['t'] for i in T['datos']['catalisis']['items']]
cierto('orden de la catálisis', 'acerca' in ORD[0] and 'complejo' in ORD[1] and 'energía de activación' in ORD[2] and 'producto' in ORD[3] and 'libre' in ORD[4])
PAR_ENZ = {'Amilasa': 'Almidón', 'Lactasa': 'Lactosa', 'Lipasa': 'Grasas', 'Pepsina': 'Proteínas', 'Catalasa': 'Agua oxigenada', 'Ureasa': 'Urea'}
for a, b in T['datos']['enzimas']['pares']:
    cierto('enzima %s' % a, PAR_ENZ[a].lower() in b.lower())
PAR_COE = {'NAD⁺': 'B₃', 'FAD': 'B₂', 'Coenzima A': 'B₅', 'TPP': 'B₁'}
for a, b in T['datos']['coenzimas']['pares']:
    cierto('coenzima %s' % a, PAR_COE[a] in b)
cierto('emparejar funciones: 6 pares', len(T['datos']['funciones']['pares']) == 6)

# ---------------------------------------------------------------- ficha coherente con la teoría y con los hechos
FECHAS = {'Fischer': '1894', 'Michaelis y Menten': '1913', 'Sumner': '1926', 'Koshland': '1958', 'Anfinsen': '1961'}
for a in vz['autores']:
    if a['n'] in FECHAS:
        cierto('%s %s en la ficha y en la teoría' % (a['n'], a['f']), a['f'] == FECHAS[a['n']] and a['f'] in teoria_l)
cierto('ficha: 6 bloques', len(vz['bloques']) == 6)
cierto('ficha: 10 palabras clave', len(vz['claves']) == 10)
cierto('ficha: ≤ 3 frases por bloque', all(len(b['frases']) <= 3 for b in vz['bloques']))
cierto('ficha: frases cortas (≤ 16 palabras)', all(len(limpio(f).split()) <= 16 for b in vz['bloques'] for f in b['frases']))
for b in vz['bloques']:
    if 'tabla' in b:
        cierto('ficha: tabla de 2 columnas en «%s»' % b['t'], all(len(f) == 2 for f in b['tabla']['filas']))
cierto('ficha: H2N–CH(R)–COOH igual que la teoría', 'h2n–ch(r)–cooh' in vz_txt.replace('₂', '2') and 'h2n–ch(r)–cooh' in teoria_l)
cierto('ficha: enlace –CO–NH– igual que la teoría', '–co–nh–' in vz_txt and '–co–nh–' in teoria_l)
cierto('ficha: n − 1 enlaces igual que la teoría', 'n − 1' in vz_txt and 'n − 1' in teoria_l)
cierto('ficha: cuatro niveles igual que la teoría', all(x in vz_txt and x in teoria_l for x in ('primaria', 'secundaria', 'terciaria', 'cuaternaria')))
cierto('ficha: Glu → Val en la posición 6 de la cadena β (teoría)', 'posición 6' in vz_txt and 'posición 6' in teoria_l and 'valina' in teoria_l)
cierto('ficha: inhibidor competitivo igual / sube; no competitivo baja / igual (teoría)', 'igual / sube' in vz_txt and 'baja / igual' in vz_txt and 'no competitiva' in teoria_l)
cierto('ficha: apoenzima + cofactor = holoenzima (teoría)', 'holoenzima' in vz_txt and 'holoenzima (activa) = apoenzima' in teoria_l)
for term, _ in vz['claves']:
    base = term.lower().split(' ')[0]
    cierto('clave «%s» aparece en la teoría' % term, base in teoria_l)
cierto('conecta con T5 y T11 de Química II y T2/T5/T6 de Biología', all(any(k in c['con'] for c in vz['conecta']) for k in ('Biología T2', 'Biología T5', 'Biología T6', 'Química II T5', 'Química II T11')))

# ---------------------------------------------------------------- teoría: cifras y hechos citados coinciden con los cálculos
for frag in ('233,22 g/mol', '8000 tripéptidos', '1,3·10130', '300 nucleótidos', '2 mm', '3,6 aminoácidos por vuelta', '4,6', '9 en el adulto',
             '141', '146', '574', 'posición 6', '72 °c', '1983', '37 °c', '95 °c', 'quinasas', '0,1 mm', '10 mm', 'tripsinógeno', 'pepsinógeno'):
    cierto('teoría cita «%s»' % frag, frag in teoria_l)
cierto('teoría: Q10 ≈ 2 (duplica cada 10 °C)', 'q10 ≈ 2' in teoria_l and 'duplica por cada 10 °c' in teoria_l)
cierto('teoría: tabla [S]/Km con 9 %, 50 %, 80 %, 90 % y 95 %', all(x in teoria_l for x in ('9 %', '50 %', '80 %', '90 %', '95 %')))
cierto('teoría: seis clases de enzimas', all(x in teoria_l for x in ('oxidorreductasas', 'transferasas', 'hidrolasas', 'liasas', 'isomerasas', 'ligasas')))
cierto('teoría: «desnaturalización no rompe el enlace peptídico»', 'sin romper' in teoria_l or 'no rompe ni uno' in teoria_l)
cierto('teoría: ajuste inducido (Koshland, 1958) y llave-cerradura (Fischer, 1894)', 'koshland, 1958' in teoria_l and 'fischer, 1894' in teoria_l)
cierto('teoría: Anfinsen 1961, Nobel 1972', 'anfinsen' in teoria_l and '1961' in teoria_l and '1972' in teoria_l)
cierto('teoría: Sumner 1926, Nobel 1946', 'sumner' in teoria_l and '1926' in teoria_l and '1946' in teoria_l)
cierto('teoría: Mullis 1983, Nobel 1993', 'mullis, 1983' in teoria_l and '1993' in teoria_l)

# ---------------------------------------------------------------- estructura mínima del tema
niveles = [e['nivel'] for e in T['ejercicios']]
cierto('≥ 40 ejercicios', len(T['ejercicios']) >= 40)
cierto('hay ejercicios de los tres niveles', set(niveles) == {1, 2, 3})
cierto('ids únicos', len({e['id'] for e in T['ejercicios']}) == len(T['ejercicios']))
cierto('todos con pasos y resultado', all(e.get('pasos') and e.get('resultado') for e in T['ejercicios']))
rub = [e for e in T['ejercicios'] if checks(e)[0]['tipo'] == 'rubrica']
cierto('5 preguntas abiertas con rúbrica', len(rub) == 5)
cierto('rúbricas suman 2 puntos', all(abs(sum(i['p'] for i in checks(e)[0]['items']) - 2.0) < 1e-9 for e in rub))
cierto('lámina con ≥ 4 elementos', len(T['lamina']) >= 4)
cierto('resumen con ≥ 4 ideas', len(T['resumen']) >= 4)
cierto('tarjetas ≥ 14', len(T['datos']['tarjetas1']['cartas']) >= 14)

if fallos:
    print('FALLOS:')
    for f in fallos:
        print('  -', f)
print('%d comprobaciones correctas, %d fallos' % (ok, len(fallos)))
sys.exit(1 if fallos else 0)
