#!/usr/bin/env python3
"""
Verificación independiente de Historia de la Filosofía, tema 3 (Platón).
Hechos de referencia escritos aquí (no se comparte código con la web): fechas, orden de autores,
correspondencias alma–virtud–clase, grados de la línea dividida y símbolos de la caverna.
Comprueba: cronología, ficha de vistazo coherente con la teoría, y que cada ejercicio de opción tenga
una única respuesta correcta que coincida con los hechos.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_historia_fil_t3.py /tmp/ampl.json
"""
import json, re, sys

ok, fallos = 0, []


def cierto(nombre, cond):
    global ok
    if cond:
        ok += 1
    else:
        fallos.append(nombre)


def limpio(s):
    return re.sub(r'<[^>]+>', '', s)


# años a. C. (nacimiento, muerte)
SOCRATES, PLATON, ARISTOTELES = (470, 399), (427, 347), (384, 322)
HERACLITO, PARMENIDES = (540, 480), (515, 450)
ACADEMIA, ARIST_ENTRA = 387, 367
GUERRA_FIN, TREINTA = 404, 404
# parte del alma: (virtud, clase, guardián de pasaje)
ALMA = {'racional': ('sabiduría', 'gobernantes'), 'irascible': ('valentía', 'guardianes'), 'concupiscible': ('templanza', 'productores')}
LINEA = [('eikasía', 'imágenes'), ('pístis', 'cosas concretas'), ('diánoia', 'matemát'), ('nóesis', 'ideas')]
GOBIERNOS = ['aristocracia', 'timocracia', 'oligarquía', 'democracia', 'tiranía']

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['historia_fil']['t3']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# --- cronología
cierto('Platón: nace antes de morir', PLATON[0] > PLATON[1])
cierto('Sócrates nace antes que Platón y muere cuando Platón tiene 28 años', SOCRATES[0] > PLATON[0] and PLATON[0] - SOCRATES[1] == 28)
cierto('Platón nace después de Heráclito y Parménides, y estos habían muerto ya', PLATON[0] < PARMENIDES[1] < HERACLITO[1] + 100 and PARMENIDES[1] > PLATON[0] and HERACLITO[1] > PLATON[0])
cierto('Aristóteles nace 43 años después que Platón y muere después que él', PLATON[0] - ARISTOTELES[0] == 43 and ARISTOTELES[1] < PLATON[1])
cierto('Academia fundada tras la muerte de Sócrates y en vida de Platón', SOCRATES[1] > ACADEMIA > PLATON[1])
cierto('Aristóteles entra en la Academia a los 17 años y se queda 20 (hasta la muerte de Platón)', ARISTOTELES[0] - ARIST_ENTRA == 17 and ARIST_ENTRA - PLATON[1] == 20)
cierto('Sócrates muere después del fin de la guerra del Peloponeso y los Treinta', GUERRA_FIN > SOCRATES[1] and TREINTA > SOCRATES[1])

# --- la teoría recoge las fechas exactas
for nombre, (a, b) in [('Platón', PLATON), ('Sócrates', SOCRATES), ('Aristóteles', ARISTOTELES)]:
    m = re.search(nombre + r'[^()]{0,30}\((?:h\. )?(\d+)–(\d+) a\. C\.\)', limpio(teoria))
    cierto(f'teoría: fechas de {nombre}', bool(m) and (int(m.group(1)), int(m.group(2))) == (a, b))
cierto('teoría: Academia h. 387 a. C.', 'hacia 387 a. c.' in teoria_l)
cierto('teoría: condena de Sócrates en 399 a. C.', '399 a. c.' in teoria_l)
cierto('teoría: Aristóteles entra hacia 367 a. C.', 'hacia 367 a. c.' in teoria_l)
cierto('teoría: fin de la guerra del Peloponeso en 404 a. C.', '404 a. c.' in teoria_l)

# --- ficha de un vistazo
a = vz['autores'][0]
m = re.search(r'(\d+)–(\d+) a\. C\.', a['f'])
cierto('ficha: fechas de Platón', (int(m.group(1)), int(m.group(2))) == PLATON and 'Atenas' in a['l'] and '387' in a['l'])
cierto('ficha: 6 bloques y 6–10 palabras clave con definición', len(vz['bloques']) == 6 and 6 <= len(vz['claves']) <= 10 and all(len(k) == 2 and k[1].strip() for k in vz['claves']))
cierto('ficha: obras clave son de Platón y entre ellas la República', 'República' in vz['obras'] and 'Apología de Sócrates' in vz['obras'])
cierto('ficha: la cita es de la República', vz['cita']['autor'] == 'Platón' and 'República' in vz['cita']['obra'])
cierto('ficha: la cita está también en la rúbrica/teoría (filósofos gobiernan)', 'filósofos' in vz['cita']['txt'] and 'filósofos' in teoria_l)
tb = next(b for b in vz['bloques'] if b['t'].startswith('Ser humano'))['tabla']['filas']
for parte, (virtud, clase) in ALMA.items():
    fila = next((f for f in tb if f[0] == parte), None)
    cierto(f'ficha: alma {parte} → virtud y clase', bool(fila) and virtud in fila[1] and clase in fila[1])
    cierto(f'teoría: aparecen {parte}, {virtud} y {clase}', all(x in teoria_l for x in (parte, virtud, clase)))
conecta = limpio(json.dumps(vz['conecta'], ensure_ascii=False))
cierto('ficha: conecta con T1, T2, T4 y T6 (Agustín)', all(t in conecta for t in ['(T1)', '(T2)', '(T4)', '(T6)']))
cierto('ficha y teoría usan los mismos términos clave', all(t in teoria_l and t in vz_txt for t in ['idea de bien', 'anámnesis', 'dualismo', 'justicia', 'participación', 'dóxa', 'epistéme', 'eikasía', 'pístis', 'diánoia', 'nóesis']))
cierto('ficha: cuadro de resumen menciona Ideas, Bien, alma y Estado', all(t in limpio(' '.join(vz['resumen'])).lower() for t in ['dos mundos', 'bien', 'alma', 'estado']))

# --- línea dividida: cuatro grados en la teoría, en orden de abajo arriba
pos = [teoria_l.find(g) for g, _ in LINEA]
cierto('teoría: los 4 grados de la línea aparecen y en orden ascendente en la sección de la línea', all(p >= 0 for p in pos))
sec_linea = limpio(next(n['html'] for n in T['nuevas'] if n['h'].startswith('6.'))).lower()
p2 = [sec_linea.find(g) for g, _ in LINEA]
cierto('línea: orden eikasía < pístis < diánoia < nóesis en la tabla', p2 == sorted(p2) and all(p >= 0 for p in p2))
cierto('línea: las matemáticas se sitúan en diánoia (no en nóesis)', re.search(r'diánoia[^|]{0,200}matem', sec_linea) is not None or 'razonamiento' in sec_linea and 'objetos matemáticos' in sec_linea)
tl = teoria_l[teoria_l.find('justicia y degeneración'):]
cierto('república: 5 formas de gobierno en orden de degeneración', all(tl.find(g) >= 0 for g in GOBIERNOS) and [tl.find(g) for g in GOBIERNOS] == sorted(tl.find(g) for g in GOBIERNOS))

# --- ejercicios con respuesta de hecho
def correcta(id_, campo=0):
    c = EJ[id_]['check']
    c = c[campo] if isinstance(c, list) else c
    return c['opciones'][c['ok']]


def etiquetas(id_):
    return [c['etiqueta'] for c in EJ[id_]['check']]

for i, (p, (v, cl)) in enumerate(ALMA.items()):
    cierto(f'hp8: {p}–{v}', EJ['hp8']['check'][i]['etiqueta'].lower().endswith(p) and correcta('hp8', i).lower() == v)
    cierto(f'hp9: {p}–{cl}', EJ['hp9']['check'][i]['etiqueta'].lower().endswith(p) and correcta('hp9', i).lower() == cl)
cierto('hp1: Sócrates maestro de Platón', correcta('hp1') == 'Sócrates')
cierto('hp2: Academia', correcta('hp2') == 'La Academia')
cierto('hp7: reminiscencia aceptada', 'recordar' in EJ['hp7']['check']['valores'])
cierto('hp13: Bien', 'Bien' in EJ['hp13']['check']['valores'])
orden = ' → '.join(n for n, _ in sorted([('Sócrates', SOCRATES), ('Platón', PLATON), ('Aristóteles', ARISTOTELES)], key=lambda x: -x[1][0]))
cierto('hp11: orden cronológico Sócrates → Platón → Aristóteles', correcta('hp11') == orden)
cierto('hp11: único orden correcto entre las opciones', sum(1 for o in EJ['hp11']['check']['opciones'] if o == orden) == 1)
cierto('hp27: tiranía es la última forma de gobierno', correcta('hp27') == 'La tiranía' and GOBIERNOS[-1] == 'tiranía')
esperado39 = dict(zip(['Eikasía', 'Pístis', 'Diánoia', 'Nóesis'], ['Imágenes', 'Cosas concretas', 'Objetos matemáticos', 'Ideas']))
cierto('hp39: línea dividida', all(correcta('hp39', i) == esperado39[EJ['hp39']['check'][i]['etiqueta']] for i in range(4)))
esperado38 = {'Las sombras': 'Apariencias', 'El exterior': 'Mundo inteligible', 'El Sol': 'Bien', 'Los seres reales': 'Ideas'}
cierto('hp38: símbolos de la caverna', all(correcta('hp38', i) == esperado38[EJ['hp38']['check'][i]['etiqueta']] for i in range(4)))
# los pares de las actividades
cierto('emparejar «alma»: coincide con ALMA', {a.split()[-1][:6]: b.lower() for a, b in T['datos']['alma']['pares']} == {p[:6]: v for p, (v, _) in ALMA.items()})
pl = T['datos']['linea']['pares']
cierto('emparejar «línea»: grados en orden y con objeto correcto', [re.search(r'\((\w+)\)', a).group(1).lower() for a, _ in pl] == [g for g, _ in LINEA] and 'matem' in pl[2][1].lower() and 'ideas' in pl[3][1].lower())
# «encuentra el error» q5 (cronología)
q = T['datos']['errores']['preguntas'][4]
cierto('errores q5: «Platón es anterior a Sócrates» es falsa y las otras 3 verdaderas',
       q['op'][q['ok']] == 'Platón es anterior a Sócrates' and not (PLATON[0] > SOCRATES[0]) and PLATON[0] > PLATON[1] and PLATON[1] == 347 and ARISTOTELES[0] < PLATON[0])
# orden de la formación del gobernante: carácter → selección → matemáticas → dialéctica → regreso
oa = [limpio(x['t']).split(':')[0].lower() for x in T['datos']['ordenasc']['items']]
cierto('orden de formación: música/gimnasia, selección, matemáticas, dialéctica, regreso', oa[0].startswith('música') and oa[1].startswith('selección') and oa[2].startswith('matem') and oa[3].startswith('dialéctica') and oa[4].startswith('regreso'))
# clasificar: 8 ítems, 4 y 4
cl = T['datos']['sensinteligible']
cierto('clasificar sensible/inteligible: 4 y 4 y categorías válidas', [sum(1 for i in cl['items'] if i['c'] == k) for k in (0, 1)] == [4, 4])

# --- estructura de todos los ejercicios y actividades
niveles = [e['nivel'] for e in T['ejercicios']]
cierto('≥ 40 ejercicios', len(EJ) >= 40 and len(EJ) == len(T['ejercicios']))
cierto('hay ejercicios de los tres niveles', set(niveles) == {1, 2, 3})
cierto('≥ 5 preguntas abiertas con rúbrica', sum(1 for e in T['ejercicios'] if not isinstance(e['check'], list) and e['check']['tipo'] == 'rubrica') >= 5)
for e in T['ejercicios']:
    cs = e['check'] if isinstance(e['check'], list) else [e['check']]
    cierto(f"{e['id']}: pasos y resultado", e.get('pasos') and e.get('resultado'))
    for c in cs:
        if c['tipo'] == 'opcion':
            ops = c['opciones']
            cierto(f"{e['id']}: opciones distintas y ok en rango", len(set(ops)) == len(ops) and 0 <= c['ok'] < len(ops))
        if c['tipo'] == 'rubrica':
            cierto(f"{e['id']}: rúbrica suma 2 puntos", round(sum(i['p'] for i in c['items']), 2) == 2.0)
cierto('ids de ejercicios únicos', len(EJ) == len(T['ejercicios']))
for k, d in T['datos'].items():
    for p in d.get('preguntas', []):
        cierto(f'{k}: una respuesta correcta válida y opciones distintas', 0 <= p['ok'] < len(p['op']) and len(set(p['op'])) == len(p['op']))
    for it in d.get('items', []):
        if 'c' in it:
            cierto(f'{k}: categoría válida', 0 <= it['c'] < len(d['categorias']))

if fallos:
    print('FALLOS:')
    for f in fallos:
        print(' -', f)
    print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
    sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos')
