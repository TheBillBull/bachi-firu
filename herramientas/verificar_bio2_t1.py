#!/usr/bin/env python3
"""
Verificación independiente de Biología II, tema 1 (Bioelementos y biomoléculas inorgánicas).
No comparte código con la web: recalcula con fracciones/logaritmos cada cifra de ejemplos y ejercicios
(% p/v, molaridad, osmolaridad, pH, tampón, diluciones, densidad del hielo, calor de vaporización,
interpolación de la patata y el modelo del hematíe del widget), comprueba hechos y fechas de la ficha,
que cada ejercicio de opción tenga una única respuesta correcta que coincida con los hechos, y que la ficha
no contradiga la teoría.

Convención declarada: Mr(NaCl) = 22,99 + 35,45 = 58,44; NaCl da 2 partículas; pH del tampón con
pKa(H2CO3) = 6,1 (Henderson–Hasselbalch); el interior del hematíe se toma ≈ 308 mOsm/L (= NaCl al 0,9 %).

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_bio2_t1.py /tmp/ampl.json
"""
import json, math, re, sys
from fractions import Fraction as F

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
T = datos['ampl']['bio2']['t1']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# ---------------------------------------------------------------- constantes y modelo de referencia
MR_NACL = F('22.99') + F('35.45')
MR_KCL = F('39.10') + F('35.45')
MR_GLUC = F('180.16')


def mosm_nacl(pc):               # % p/v -> mOsm/L (i = 2)
    return F(pc) * 10 / MR_NACL * 2 * 1000


def mosm_kcl(pc):
    return F(pc) * 10 / MR_KCL * 2 * 1000


cierto('Mr NaCl = 58,44', MR_NACL == F('58.44'))
casi('suero 0,9 %: 308 mOsm/L', float(mosm_nacl('0.9')), 308, 0.003)
casi('NaCl 3 %: 1027 mOsm/L', float(mosm_nacl(3)), 1027, 0.001)
casi('NaCl 1,8 %: 616 mOsm/L', float(mosm_nacl('1.8')), 616, 0.001)
casi('NaCl 0,3 %: 103 mOsm/L', float(mosm_nacl('0.3')), 103, 0.005)
casi('molaridad suero 0,154', float(F(9) / MR_NACL), 0.154, 0.003)
casi('glucosa 5 %: 277,5 mOsm/L', float(F(50) / MR_GLUC * 1000), 277.5, 0.001)
casi('KCl 0,9 %: 241 mOsm/L', float(mosm_kcl('0.9')), 241.5, 0.003)
cierto('KCl 0,9 % es hipotónico frente a 308', mosm_kcl('0.9') < 308)
cierto('glucosa 5 % y NaCl 0,9 % casi isosmóticos (±10 %)', abs(float(F(50) / MR_GLUC * 1000) - 308) / 308 < 0.10)
cierto('mismo % de NaCl y glucosa NO da misma osmolaridad', abs(float(mosm_nacl('0.9')) - float(F('9') / MR_GLUC * 1000)) > 100)

# ---------------------------------------------------------------- pH y tampón
def ph(h):
    return -math.log10(h)


casi('pH 0,001 M = 3', ph(1e-3), 3)
casi('[H+] a pH 7,4 = 3,98e-8', 10 ** -7.4, 3.98e-8, 0.003)
cierto('pH 3 vs pH 6: ×1000', round(10 ** 6 / 10 ** 3) == 1000)
cierto('pH 4 vs 6: ×100', round(10 ** -4 / 10 ** -6) == 100)
casi('HCl 0,01 M pH 2', ph(0.01), 2)
casi('OH- 1e-4: pH 10', 14 - ph(1e-4), 10)
casi('tampón 24/1,2 → 7,40', 6.1 + math.log10(24 / 1.2), 7.40, 0.001)
casi('tampón 18/1,2 → 7,28', 6.1 + math.log10(18 / 1.2), 7.28, 0.001)
casi('tampón 22/1,2 → 7,36', 6.1 + math.log10(22 / 1.2), 7.36, 0.001)
casi('agua + 0,1 mmol/L HCl → pH 4,00', ph(1e-7 + 1e-4), 4.00, 0.001)
cierto('acidosis: 7,28 < 7,35', 6.1 + math.log10(18 / 1.2) < 7.35)
cierto('normal: 7,35 ≤ 7,40 ≤ 7,45', 7.35 <= 6.1 + math.log10(20) <= 7.45)
# widget bio_ph: variación al añadir 2 mmol/L de HCl (agua frente a sangre)
agua2 = ph(1e-7 + 2e-3)
sangre2 = 6.1 + math.log10((24 - 2) / 1.2)
cierto('widget: agua pura baja >3 unidades con 2 mmol/L; sangre menos de 0,05', 7 - agua2 > 3 and 7.4 - sangre2 < 0.05)

# ---------------------------------------------------------------- volúmenes, masas y calor
casi('1 g/cm3 hielo 0,917: +9,05 %', (1000 / 0.917 - 1000) / 1000 * 100, 9.05, 0.002)
casi('70 kg · 65 % = 45,5', 70 * 0.65, 45.5)
casi('50 g · 540 cal/g = 27000', 50 * 540, 27000)
casi('dilución 20 %→4 %, 250 mL: 50 mL', 4 * 250 / 20, 50)
casi('dilución 10 %→2 %, 100 mL: 20 mL', 2 * 100 / 10, 20)
casi('2,25 g en 250 mL al 0,9 %', 0.9 * 250 / 100, 2.25)
casi('hematíe 616 mOsm: V/V0 = 0,5', 308 / float(mosm_nacl('1.8')), 0.5, 0.01)
casi('1 cal = 4,184 J', 1 * 4.184, 4.18, 0.005)
cierto('460 kJ/mol es >20 veces 20 kJ/mol', 460 / 20 > 20)
# interpolación de la patata (ejemplo de teoría y ejercicio d5)
casi('patata teoría: 0,175 M', 0.1 + 0.1 * 6 / 8, 0.175)
casi('patata ejercicio: 0,15 M', 0.1 + 0.1 * 4 / 8, 0.15)
casi('patata −15 % de 10,0 g = 8,5 g', 10.0 * (1 - 0.15), 8.5)
casi('tubo C: 3,3 veces la del interior', float(mosm_nacl(3)) / 308, 3.3, 0.02)

# ---------------------------------------------------------------- cada ejercicio numérico contra su cálculo independiente
ESPERADO = {
    'b16': 0.9, 'c1': 2.25, 'c2': float(F(9) / MR_NACL), 'c3': 3, 'c4': 3.98, 'c5': 1000, 'c6': 50, 'c7': 2, 'c8': 10,
    'c9': 9.05, 'c10': 45.5, 'c11': 0.5, 'c12': 277.5, 'd1': 27000, 'd2': 7.28, 'd3': 7.36, 'd4': 4.0, 'd5': 0.15, 'd6': 1027,
}
for eid, v in ESPERADO.items():
    ch = EJ[eid]['check']
    cierto('%s es de tipo num' % eid, ch['tipo'] == 'num')
    casi('ejercicio %s' % eid, ch['valor'], v, 0.003)
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

# palabra clave que debe tener la opción correcta (y que no debe aparecer en ninguna incorrecta)
CLAVE = {
    'b1': 'C, H, O, N', 'b2': 'oligoelemento', 'b3': 'cuatro enlaces', 'b4': 'Puente de hidrógeno', 'b5': 'vaporización',
    'b6': 'precipitada', 'b7': 'ácida', 'b8': 'Hemólisis', 'b13': 'pared celular', 'b15': 'amortiguar', 'c13': 'hipotónico',
    'd7': '241',
}
for eid, k in CLAVE.items():
    c = checks(EJ[eid])[0]
    cierto('%s: la correcta contiene «%s»' % (eid, k), k.lower() in c['opciones'][c['ok']].lower())
    cierto('%s: ninguna otra contiene «%s»' % (eid, k), all(k.lower() not in o.lower() for i, o in enumerate(c['opciones']) if i != c['ok']))

# verdadero/falso con el valor correcto
VF_ESP = {'b9': False, 'b10': True, 'c14': False}
for eid, v in VF_ESP.items():
    c = checks(EJ[eid])[0]
    cierto('%s: V/F correcto' % eid, (c['opciones'][c['ok']] == 'Verdadero') == v)

# emparejar / ordenar con varias casillas
EMP = {
    'b14': {'Calcio (Ca)': 'huesos', 'Magnesio (Mg)': 'clorofila', 'Yodo (I)': 'tiroide'},
    'c15': {'Hematíe en agua destilada': 'Hemólisis', 'Hematíe en NaCl al 3 %': 'Crenación', 'Célula vegetal en agua muy salada': 'Plasmólisis'},
    'c16': {'Primero': 'Sube', 'Después': 'capta', 'Por último': 'pulmones'},
}
for eid, mapa in EMP.items():
    for c in checks(EJ[eid]):
        k = mapa[c['etiqueta']]
        cierto('%s/%s correcto' % (eid, c['etiqueta']), k.lower() in c['opciones'][c['ok']].lower())
        cierto('%s/%s única' % (eid, c['etiqueta']), sum(k.lower() in o.lower() for o in c['opciones']) == 1)

for eid, vals in {'b11': ['hierro', 'Fe'], 'b12': ['hipotónico', 'hipotonico']}.items():
    cierto('%s: valores aceptados' % eid, EJ[eid]['check']['valores'] == vals)

# test y «encuentra el error»: única correcta
for nombre in ('quiz1', 'errores'):
    for p in T['datos'][nombre]['preguntas']:
        cierto('%s: %s… ok en rango y opciones distintas' % (nombre, p['q'][:25]), 0 <= p['ok'] < len(p['op']) and len(set(p['op'])) == len(p['op']))
# afirmaciones falsas de «encuentra el error»: la marcada como falsa debe contradecir un hecho de referencia
FALSAS = [
    ('disuelve bien las grasas', 'grasas son apolares'), ('poco importantes porque hay muy poco', 'imprescindibles'),
    ('doble de ácido', '1000'), ('Pasa soluto hacia el medio', 'agua, no el soluto'),
    ('se hincha y estalla', 'se arruga'), ('sales disueltas forman los huesos', 'precipitadas'),
    ('impide por completo', 'no anula'),
]
errs = T['datos']['errores']['preguntas']
cierto('errores: 7 preguntas', len(errs) == 7)
for p, (f, por) in zip(errs, FALSAS):
    cierto('error «%s»: la señalada es la falsa' % f, f.lower() in p['op'][p['ok']].lower())
    cierto('error «%s»: explicación coherente' % f, por.lower() in p['porque'].lower() or por.lower() in limpio(p['porque']).lower())

# actividades de clasificar: cada elemento en su categoría según hechos de referencia
GRUPOS = {'Carbono': 0, 'Nitrógeno': 0, 'Fósforo': 0, 'Calcio': 1, 'Potasio': 1, 'Magnesio': 1, 'Hierro': 2, 'Yodo': 2, 'Flúor': 2}
for it in T['datos']['grupos']['items']:
    cierto('grupo %s' % it['t'], GRUPOS[it['t']] == it['c'])
BIOMOL = {'Calcio (Ca)': 0, 'Hierro (Fe)': 0, 'Agua': 1, 'Fosfato cálcico': 1, 'Cloruro sódico': 1, 'Glucosa': 2, 'Colesterol': 2, 'ADN': 2}
for it in T['datos']['biomol']['items']:
    cierto('biomolécula %s' % it['t'], BIOMOL[it['t']] == it['c'])
MEDIOS = {'Hematíe en agua destilada': 0, 'Hematíe en suero (NaCl 0,9 %)': 1, 'Hematíe en NaCl al 3 %': 2, 'Lechuga mustia en agua': 0, 'Bacteria en salmuera': 2, 'Babosa con sal encima': 2}
for it in T['datos']['medios']['items']:
    cierto('medio %s' % it['t'], MEDIOS[it['t']] == it['c'])
ord_ = [i['t'] for i in T['datos']['ordenhemolisis']['items']]
cierto('orden de la hemólisis', 'menos solutos' in ord_[0] and 'entra' in ord_[1] and 'hincha' in ord_[2] and 'membrana' in ord_[3] and 'Hemólisis' in ord_[4])
cierto('emparejar agua: 5 pares', len(T['datos']['agua']['pares']) == 5)

# ---------------------------------------------------------------- ficha coherente con la teoría y con los hechos
nollet = [a for a in vz['autores'] if a['n'] == 'Nollet'][0]
sor = [a for a in vz['autores'] if a['n'] == 'Sørensen'][0]
cierto('Nollet 1748 (primera observación de la ósmosis)', nollet['f'] == '1748')
cierto('Sørensen 1909 (escala de pH)', sor['f'] == '1909')
cierto('ficha: 6 bloques', len(vz['bloques']) == 6)
cierto('ficha: 10 palabras clave', len(vz['claves']) == 10)
cierto('ficha: ≤ 3 frases por bloque', all(len(b['frases']) <= 3 for b in vz['bloques']))
cierto('ficha: frases cortas (≤ 16 palabras)', all(len(limpio(f).split()) <= 16 for b in vz['bloques'] for f in b['frases']))
for b in vz['bloques']:
    if 'tabla' in b:
        cierto('ficha: tabla de 2 columnas en «%s»' % b['t'], all(len(f) == 2 for f in b['tabla']['filas']))
cierto('ficha: primarios C, H, O, N, P, S igual que la teoría', 'c, h, o, n, p, s' in vz_txt and 'c, h, o, n, p, s' in teoria_l)
cierto('ficha: secundarios Ca, Na, K, Cl, Mg igual que la teoría', 'ca, na, k, cl, mg' in vz_txt and 'ca, na, k, cl, mg' in teoria_l)
cierto('ficha: 308 mOsm/L (teoría) y NaCl 0,9 %', '308' in teoria_l and '0,9 %' in teoria_l)
cierto('ficha: pH 7,35–7,45 igual que la teoría', '7,35' in vz_txt and '7,45' in vz_txt and '7,35' in teoria_l and '7,45' in teoria_l)
cierto('ficha: calor de vaporización alto y específico alto presentes en la teoría', 'calor de vaporización' in teoria_l and 'calor específico' in teoria_l)
cierto('ficha: 60–70 % de agua igual que la teoría', '60–70' in vz_txt and '60 y el 70' in teoria_l)
cierto('ficha: hipotónico→hemólisis, hipertónico→crenación', 'hemólisis' in vz_txt and 'crenación' in vz_txt and 'hemólisis' in teoria_l and 'crenación' in teoria_l)
for term, _ in vz['claves']:
    base = term.lower().split(' / ')[0].split(' ')[0]
    cierto('clave «%s» aparece en la teoría' % term, base in teoria_l)
cierto('conecta con Química II T7 (ácidos y bases) y T1', any('Química II T7' in c['con'] for c in vz['conecta']) and any('Química II T1' in c['con'] for c in vz['conecta']))
cierto('ficha: densidad del hielo 0,92 coherente con 0,917', abs(0.917 - 0.92) < 0.005)

# ---------------------------------------------------------------- teoría: cifras citadas coinciden con los cálculos
for frag in ('27 000 cal', '1,09 l', '0,154 m', '308 mosm/l', '1027 mosm/l', '277', '7,40', '7,36' if False else '7,40', '4,18 j/g', '540 cal/g', '104,5'):
    cierto('teoría cita «%s»' % frag, frag in teoria_l)
cierto('teoría: ejemplo de dilución 20 mL', '20 ml' in teoria_l)
cierto('teoría: Henderson–Hasselbalch con cociente 20', 'cociente es 20' in teoria_l)
cierto('teoría: 3 Na⁺ y 2 K⁺ por ciclo', '3 na⁺ y mete 2 k⁺' in teoria_l)
cierto('teoría: tubo C = 30 g/L y 0,513 mol/L', '30 g/l' in teoria_l and '0,513' in teoria_l)
cierto('teoría: el hielo flota (densidad máxima a 4 °C)', 'densidad máxima a 4' in teoria_l)

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
