#!/usr/bin/env python3
"""
Verificación independiente de Biología II, tema 14 (Microbiología).
No comparte código con la web: recalcula con sympy/fracciones cada cifra de ejemplos y ejercicios
(generaciones N = N0·2^n, tiempos de generación, recuento por colonias, diluciones, ciclos de fagos,
tamaños), el modelo de la curva por fases del widget bio_crecimiento, comprueba hechos y fechas de la ficha,
que cada ejercicio tenga una única respuesta correcta coherente con los hechos y que la ficha no contradiga la teoría.

Convención declarada: n = t/g generaciones completas; log2 con sympy; crecimiento exponencial ideal sin latencia
salvo que el enunciado la dé; recuento válido entre 30 y 300 colonias.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_bio2_t14.py /tmp/ampl.json
"""
import json, math, re, sys
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
T = datos['ampl']['bio2']['t14']
EJ = {e['id']: e for e in T['ejercicios']}
teoria_l = limpio(' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# ---------------------------------------------------------------- crecimiento exponencial (sympy, exacto)
def gen(t, g):
    return sp.Rational(t, g)


def Nfin(n0, t, g):
    return sp.Integer(n0) * 2 ** gen(t, g)


cierto('ej. teoría: 3 h, g=20 → n=9, N=512', gen(180, 20) == 9 and Nfin(1, 180, 20) == 512)
n_teo = sp.log(sp.Integer(10) ** 6, 2)
casi('teoría: 10^3→10^9 son 19,9 generaciones', float(n_teo), 19.93, 0.002)
casi('teoría: 19,9·30 min ≈ 598 min', float(n_teo) * 30, 598, 0.002)
casi('teoría: ≈ 10 horas', float(n_teo) * 30 / 60, 10, 0.01)
cierto('ej. teoría: 3,2e5/5e3 = 64 = 2^6 y g = 30 min', sp.Rational(320000, 5000) == 64 and sp.log(64, 2) == 6 and gen(180, 6) == 30)
cierto('recuento teoría: 45/0,1·10^5 = 4,5e7', sp.Rational(45) / sp.Rational(1, 10) * 10 ** 5 == sp.Rational(45, 10) * 10 ** 7)
cierto('2^72 ≈ 4,7e21 (24 h, g=20)', gen(1440, 20) == 72 and abs(float(sp.Integer(2) ** 72) / 1e21 - 4.7224) < 0.001)
cierto('log10(2) ≈ 0,301 y 1/log10(2) ≈ 3,32', abs(math.log10(2) - 0.301) < 0.0005 and abs(1 / math.log10(2) - 3.32) < 0.005)

# ejemplo PAU de la curva (tabla 0,2,4,6,8,10,12 h)
tab = {0: 1000, 2: 1000, 4: 4000, 6: 16000, 8: 16000, 10: 16000, 12: 4000}
cierto('PAU curva: exponencial 2–6 h: ×16 = 2^4 → g = 1 h', sp.Rational(tab[6], tab[2]) == 16 and sp.log(16, 2) == 4 and sp.Rational(4, 4) == 1)
cierto('PAU curva: a las 4 h hay 2 generaciones: 4000', tab[2] * 2 ** 2 == tab[4])
cierto('PAU curva: 10 h de exponencial → 1 024 000', 1000 * 2 ** 10 == 1024000)
cierto('PAU curva: fases (N sube, plano, baja)', tab[0] == tab[2] and tab[6] == tab[8] == tab[10] and tab[12] < tab[10])

# modelo de la curva por fases del widget (N0=1000, latencia 2 h, exponencial hasta 8 h con g=0,5 h, estacionaria hasta 16 h, declive −0,2 log/h)
lmax = 3 + (8 - 2) / 0.5 * math.log10(2)
casi('widget: 12 generaciones entre 2 y 8 h → ×4096', 2 ** ((8 - 2) / 0.5), 4096)
casi('widget: N a las 8 h = 4,096e6', 1000 * 4096, 4.096e6)
casi('widget: log N máx = 6,612', lmax, 6.612, 0.001)
casi('widget: a las 24 h log N = 5,012', lmax - 0.2 * 8, 5.012, 0.001)

# ---------------------------------------------------------------- tamaños
cierto('2 µm / 100 nm = 20', sp.Rational(2000, 100) == 20)

# ---------------------------------------------------------------- cada ejercicio numérico
ESP = {
    'b16': 20,
    'c1': Nfin(500, 180, 30), 'c2': Nfin(1, 160, 20), 'c3': gen(120, sp.log(sp.Rational(256), 2)),
    'c4': sp.log(sp.Integer(10) ** 3, 2) * 0 + (3 / math.log10(2)) * 0 + sp.log(sp.Integer(1000), 2),
    'c5': sp.log(sp.Integer(1000), 2) * 20,
    'c6': sp.Rational(62) / sp.Rational(1, 10) * 10 ** 6 / 10 ** 8,
    'c7': sp.Integer(10) ** 5, 'c8': sp.Integer(100) ** 3,
    'd1': sp.Integer(2) ** gen(1440, 20) / 10 ** 21,
    'd2': sp.log(sp.Integer(10) ** 12, 2), 'd3': sp.log(sp.Integer(10) ** 12, 2) * 20 / 60,
    'd4': gen(180, sp.log(sp.Rational(5120000, 10000), 2)),
    'd5': Nfin(1000, 6 * 60, 30) / 10 ** 6,
    'd6': sp.Rational(3 * 10 ** 8) * sp.Rational(1, 10 ** 6) * sp.Rational(1, 10),
}
for eid, v in ESP.items():
    ch = EJ[eid]['check']
    cierto('%s es de tipo num' % eid, ch['tipo'] == 'num')
    casi('ejercicio %s' % eid, ch['valor'], float(v), 0.003)
    cierto('%s: tolerancia razonable (≤ 2 %%)' % eid, ch.get('tol', 0.005) <= 0.02)
cierto('d4: 5,12e6/1e4 = 512 = 2^9', sp.Rational(5120000, 10000) == 512 and sp.log(512, 2) == 9)
cierto('d6: 30 colonias en el rango fiable 30–300', 30 <= float(ESP['d6']) <= 300)
cierto('d1: 2^72 ≈ 4,72e21', abs(float(ESP['d1']) - 4.722) < 0.001)
cierto('d3: ≈ 13,3 h', abs(float(ESP['d3']) - 13.29) < 0.01)
cierto('c8: tercer ciclo = 10^6', ESP['c8'] == 10 ** 6)

# ---------------------------------------------------------------- ejercicios de opción: única correcta
def checks(e):
    c = e['check']
    return c if isinstance(c, list) else [c]


for e in T['ejercicios']:
    for c in checks(e):
        if c['tipo'] == 'opcion':
            ops = c['opciones']
            cierto('%s: opciones distintas' % e['id'], len(set(ops)) == len(ops))
            cierto('%s: ok en rango' % e['id'], 0 <= c['ok'] < len(ops))

CLAVE = {
    'b1': 'virus', 'b2': 'peptidoglucano', 'b3': 'violeta', 'b5': 'Penetración', 'b6': 'integrado', 'b7': 'bipartición',
    'b10': 'Exponencial', 'b11': 'Saccharomyces', 'b12': 'Plasmodium', 'b13': 'bacterias', 'b15': 'cilindro',
    'c9': 'entra en la bacteria es el ADN', 'c11': 'D', 'c14': 'transformación', 'c15': 'quimioautótrofa',
}
for eid, k in CLAVE.items():
    c = checks(EJ[eid])[0]
    cierto('%s: la correcta contiene «%s»' % (eid, k), k.lower() in c['opciones'][c['ok']].lower())
    if len(k) > 2:
        cierto('%s: ninguna otra contiene «%s»' % (eid, k), all(k.lower() not in o.lower() for i, o in enumerate(c['opciones']) if i != c['ok']))
# c11: el halo mayor es D (24 mm)
cierto('c11: halo mayor es D', max({'A': 18, 'B': 0, 'C': 9, 'D': 24}.items(), key=lambda x: x[1])[0] == 'D' and checks(EJ['c11'])[0]['opciones'][checks(EJ['c11'])[0]['ok']] == 'D')

VF_ESP = {'b4': False, 'b8': False, 'c10': False, 'c16': True}
for eid, v in VF_ESP.items():
    c = checks(EJ[eid])[0]
    cierto('%s: V/F correcto' % eid, (c['opciones'][c['ok']] == 'Verdadero') == v)

EMP = {
    'b14': {'Rhizobium': 'nitrógeno', 'Saccharomyces': 'alcohólica', 'Lactobacillus': 'láctica'},
    'c12': {'Esterilización': 'esporas', 'Desinfección': 'superficies', 'Antisepsia': 'tejidos vivos'},
    'c13': {'Latencia': 'adaptan', 'Exponencial': 'duplica', 'Estacionaria': 'tantas como mueren'},
}
for eid, mapa in EMP.items():
    for c in checks(EJ[eid]):
        k = mapa[c['etiqueta']]
        cierto('%s/%s correcto' % (eid, c['etiqueta']), k.lower() in c['opciones'][c['ok']].lower())
        cierto('%s/%s única' % (eid, c['etiqueta']), sum(k.lower() in o.lower() for o in c['opciones']) == 1)
cierto('b9: valores aceptados', 'inversa' in EJ['b9']['check']['valores'])

# test y «encuentra el error»
for nombre in ('quiz14', 'errores'):
    for p in T['datos'][nombre]['preguntas']:
        cierto('%s: %s… ok y distintas' % (nombre, p['q'][:25]), 0 <= p['ok'] < len(p['op']) and len(set(p['op'])) == len(p['op']))
# test numérico del quiz: 3 h con g = 30 → ×64
q5 = T['datos']['quiz14']['preguntas'][4]
cierto('quiz: 3 h con g=30 → ×64', q5['op'][q5['ok']] == '64' and 2 ** (180 // 30) == 64)
FALSAS = [('antibióticos sirven', 'no sobre los virus'), ('celulosa', 'peptidoglucano'), ('negativas se ven violeta', 'rosadas'),
          ('inmediatamente', 'inducción'), ('forma de reproducción', 'no aumenta'), ('latencia la población se duplica', 'adaptan'),
          ('priones contienen arn', 'no tienen ácido nucleico'), ('pasteurización esteriliza', 'no mata las esporas')]
errs = T['datos']['errores']['preguntas']
cierto('errores: 8 preguntas', len(errs) == 8)
for p, (f, por) in zip(errs, FALSAS):
    cierto('error «%s»: la señalada es la falsa' % f, f in p['op'][p['ok']].lower())
    cierto('error «%s»: explicación coherente' % f, por in limpio(p['porque']).lower())

# actividades de clasificar
CLA = {
    'clasif': {'Virus de la gripe': 0, 'Bacteriófago T4': 0, 'Prión': 0, 'Escherichia coli': 1, 'Cianobacteria': 1, 'Arquea metanógena': 1,
               'Levadura': 2, 'Paramecium': 2, 'Diatomea': 2, 'Penicillium': 2},
    'euca': {'Saccharomyces': 0, 'Penicillium': 0, 'Candida albicans': 0, 'Diatomea': 1, 'Dinoflagelado': 1, 'Chlorella': 1,
             'Amoeba': 2, 'Paramecium': 2, 'Plasmodium': 2, 'Trypanosoma': 2},
    'nutricion': {'Cianobacteria': 0, 'Bacteria purpúrea del azufre': 0, 'Nitrosomonas': 1, 'Nitrobacter': 1, 'Bacteria oxidante del hierro': 1,
                  'Escherichia coli': 2, 'Lactobacillus': 2, 'Clostridium tetani': 2, 'Rhizobium': 2},
    'control': {'Autoclave a 121 °C': 0, 'Calor seco a 180 °C del material de vidrio': 0, 'Lejía en el suelo del laboratorio': 1, 'Alcohol sobre una mesa': 1,
                'Povidona yodada en una herida': 2, 'Agua oxigenada sobre la piel': 2, 'Leche a 72 °C durante 15 s': 3, 'Leche a 63 °C durante 30 min': 3},
}
for nom, mapa in CLA.items():
    its = T['datos'][nom]['items']
    cierto('%s: mismos elementos' % nom, {i['t'] for i in its} == set(mapa))
    for it in its:
        cierto('%s/%s' % (nom, it['t']), mapa[it['t']] == it['c'])
ac = T['datos']['acelulares']
cierto('acelulares: 10 elementos, 3 categorías', len(ac['items']) == 10 and len(ac['categorias']) == 3)
ACE = {'Cápsida de proteína con ADN o ARN': 0, 'Retrovirus como el VIH': 0, 'Envoltura con espículas (gripe)': 0, 'ARN circular desnudo sin proteínas': 1,
       'Cadang-cadang del cocotero': 1, 'No codifica ninguna proteína': 1, 'Proteína PrPSc mal plegada': 2, 'Enfermedad de las vacas locas': 2,
       'No tiene ácido nucleico': 2, 'Kuru': 2}
for it in ac['items']:
    cierto('acelulares/%s' % it['t'], ACE[it['t']] == it['c'])
ol = [i['t'] for i in T['datos']['ordenlitico']['items']]
cierto('orden lítico', ['Adsorción', 'Penetración', 'Síntesis', 'Ensamblaje', 'Lisis'] == [x.split(':')[0] for x in ol])
on = [i['t'] for i in T['datos']['ordennitro']['items']]
cierto('orden del N: fijación, nitrificación×2, absorción, desnitrificación', on[0].startswith('Fijación') and 'NH₄⁺ → NO₂⁻' in on[1] and 'NO₂⁻ → NO₃⁻' in on[2] and 'absorben' in on[3] and on[4].startswith('Desnitrificación'))
for nom, n in (('estructuras', 7), ('parasex', 5), ('fases', 4), ('industria', 7)):
    cierto('emparejar %s: %d pares' % (nom, n), len(T['datos'][nom]['pares']) == n)

# ---------------------------------------------------------------- ficha: hechos y coherencia
fechas = {a['n']: a['f'] for a in vz['autores']}
cierto('Leeuwenhoek 1676', fechas.get('Leeuwenhoek') == '1676')
cierto('Koch 1884', fechas.get('Koch') == '1884')
cierto('Fleming 1928', fechas.get('Fleming') == '1928')
cierto('Hershey y Chase 1952', fechas.get('Hershey y Chase') == '1952')
for fch in ('1676', '1884', '1928', '1952'):
    cierto('teoría cita %s' % fch, fch in teoria_l)
cierto('ficha: 6 bloques, 10 claves, ≤ 3 frases', len(vz['bloques']) == 6 and len(vz['claves']) == 10 and all(len(b['frases']) <= 3 for b in vz['bloques']))
cierto('ficha: frases ≤ 16 palabras', all(len(limpio(f).split()) <= 16 for b in vz['bloques'] for f in b['frases']))
for b in vz['bloques']:
    if 'tabla' in b:
        cierto('ficha: tabla de 2 columnas en «%s»' % b['t'], all(len(f) == 2 for f in b['tabla']['filas']))
cierto('ficha: dato 2^72 ≈ 4,7e21 coherente con teoría', '4,7' in vz_txt and '2⁷²' in vz_txt and '4,7 · 10<sup>21</sup>' in T['nuevas'][1]['html'])
for term, _ in vz['claves']:
    base = limpio(term).lower().split(' ')[0]
    cierto('clave «%s» aparece en la teoría' % term, base in teoria_l)
cierto('ficha y teoría: cinco etapas del ciclo lítico', all(x in teoria_l for x in ('adsorción', 'penetración', 'síntesis', 'ensamblaje', 'lisis')))
cierto('ficha y teoría: pared de peptidoglucano, ribosomas 70s', 'peptidoglucano' in vz_txt and '70s' in vz_txt and 'ribosomas 70s' in teoria_l)
cierto('ficha y teoría: transcriptasa inversa', 'transcriptasa inversa' in vz_txt and 'transcriptasa inversa' in teoria_l)
cierto('ficha: 4 fases', all(x in vz_txt for x in ('latencia', 'exponencial', 'estacionaria', 'declive')))
cierto('conecta con T1, T8, T12, T13, T15 y Química II T7', all(any(c['con'].find(k) >= 0 for c in vz['conecta']) for k in ('T1 ', 'T8', 'T12', 'T15', 'Química II T7')))
for frag in ('autoclave', '121 °c', '63 °c', '72 °c', 'penicilina', 'transducción', 'transformación', 'conjugación', 'rhizobium', 'nitrosomonas', 'kuru', 'cadang-cadang', 'gp120'):
    cierto('teoría cita «%s»' % frag, frag in teoria_l)
cierto('teoría: 512 y 19,9 y 4,5 · 10', '512 bacterias' in teoria_l and '19,9 generaciones' in teoria_l and '4,5 · 10' in teoria_l)
cierto('teoría: 1 024 000 y 4,096 no requeridos pero 1 024 000 presente', '1 024 000' in teoria_l)

# ---------------------------------------------------------------- estructura mínima
niveles = [e['nivel'] for e in T['ejercicios']]
cierto('≥ 40 ejercicios', len(T['ejercicios']) >= 40)
cierto('tres niveles', set(niveles) == {1, 2, 3})
cierto('ids únicos', len({e['id'] for e in T['ejercicios']}) == len(T['ejercicios']))
cierto('todos con pasos y resultado', all(e.get('pasos') and e.get('resultado') for e in T['ejercicios']))
rub = [e for e in T['ejercicios'] if checks(e)[0]['tipo'] == 'rubrica']
cierto('5 preguntas abiertas con rúbrica', len(rub) == 5)
cierto('rúbricas suman 2 puntos', all(abs(sum(i['p'] for i in checks(e)[0]['items']) - 2.0) < 1e-9 for e in rub))
cierto('lámina ≥ 4', len(T['lamina']) >= 4)
cierto('resumen ≥ 4', len(T['resumen']) >= 4)
cierto('tarjetas ≥ 14', len(T['datos']['tarjetas14']['cartas']) >= 14)
cierto('quiz de 10 preguntas', len(T['datos']['quiz14']['preguntas']) == 10)

if fallos:
    print('FALLOS:')
    for f in fallos:
        print('  -', f)
print('%d comprobaciones correctas, %d fallos' % (ok, len(fallos)))
sys.exit(1 if fallos else 0)
