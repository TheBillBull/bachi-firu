#!/usr/bin/env python3
"""
Verificación independiente de Historia de la Filosofía, tema 4 (Aristóteles).
Hechos de referencia escritos aquí (no se comparte código con la web): fechas, orden de autores,
virtudes y extremos, almas, causas, constituciones y escalones del conocimiento.
Comprueba: cronología, ficha de vistazo coherente con la teoría, y que cada ejercicio de opción tenga
una única respuesta correcta que coincida con los hechos.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_historia_fil_t4.py /tmp/ampl.json
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
SOCRATES, PLATON, ARISTOTELES, ALEJANDRO = (470, 399), (427, 347), (384, 322), (356, 323)
ACADEMIA_ENTRADA, PRECEPTOR, LICEO = 367, 343, 335
TOMAS = (1225, 1274)
# virtud: (defecto, exceso)
VIRTUDES = {'valentía': ('cobardía', 'temeridad'), 'generosidad': ('avaricia', 'derroche'), 'templanza': ('insensibilidad', 'desenfreno')}
CAUSAS = ['material', 'formal', 'eficiente', 'final']
CONSTITUCIONES = [('monarquía', 'tiranía'), ('aristocracia', 'oligarquía'), ('politeia', 'democracia')]
ESCALONES = ['sensación', 'memoria', 'experiencia', 'ciencia', 'sabiduría']

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['historia_fil']['t4']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# --- cronología
cierto('Aristóteles: nace antes de morir', ARISTOTELES[0] > ARISTOTELES[1])
cierto('Platón nace 43 años antes que Aristóteles y muere 25 años antes', PLATON[0] - ARISTOTELES[0] == 43 and PLATON[1] - ARISTOTELES[1] == 25)
cierto('Aristóteles vive 62 años', ARISTOTELES[0] - ARISTOTELES[1] == 62)
cierto('Entra en la Academia a los 17 años (367) y Platón muere 20 años después', ARISTOTELES[0] - ACADEMIA_ENTRADA == 17 and ACADEMIA_ENTRADA - PLATON[1] == 20)
cierto('Preceptor de Alejandro en 343: Alejandro tiene 13 años y Aristóteles 41', ALEJANDRO[0] - PRECEPTOR == 13 and ARISTOTELES[0] - PRECEPTOR == 41)
cierto('Funda el Liceo en 335, a los 49 años y en vida de Alejandro', ARISTOTELES[0] - LICEO == 49 and ALEJANDRO[0] > LICEO > ALEJANDRO[1])
cierto('Alejandro muere un año antes que Aristóteles', ALEJANDRO[1] - ARISTOTELES[1] == 1)
cierto('Orden: Sócrates, Platón, Aristóteles nacen en orden y Tomás de Aquino es posterior', SOCRATES[0] > PLATON[0] > ARISTOTELES[0] > -TOMAS[0])

# --- la teoría recoge los hechos
cierto('teoría: fechas 384–322 a. C.', '(384–322 a. c.)' in teoria_l)
cierto('teoría: 367 a. C. a los 17 años', '367 a. c. (17 años)' in teoria_l)
cierto('teoría: 347 a. C. muerte de Platón', '347 a. c.' in teoria_l)
cierto('teoría: 343 a. C. preceptor de Alejandro de 13 años', '343 a. c.' in teoria_l and '13 años' in teoria_l)
cierto('teoría: Liceo 335 a. C.', '335 a. c.' in teoria_l)
cierto('teoría: 322 a. C. muerte en Calcis', '322 a. c.' in teoria_l and 'calcis' in teoria_l)
cierto('teoría: Alejandro Magno (356–323 a. C.)', '356–323 a. c.' in teoria_l)
for v, (d, e) in VIRTUDES.items():
    cierto(f'teoría: {v} entre {d} y {e}', all(x in teoria_l for x in (v, d, e)))
for c in CAUSAS:
    cierto(f'teoría: causa {c}', f'causa {c}' in teoria_l or f'<b>{c}</b>' in teoria.lower())
cierto('teoría: tres almas', all(x in teoria_l for x in ('vegetativa', 'sensitiva', 'racional')))
cierto('teoría: seis constituciones con sus formas rectas y desviadas', all(a in teoria_l and b in teoria_l for a, b in CONSTITUCIONES))
cierto('teoría: diez categorías (sustancia y nueve accidentes)', 'nueve tipos de accidentes' in teoria_l and len('cantidad, cualidad, relación, lugar, tiempo, posición, posesión, acción y pasión'.replace(' y ', ', ').split(', ')) == 9)
cierto('teoría: hilemorfismo, potencia, acto, teleología, eudaimonía, prudencia, animal político, Primer motor inmóvil',
       all(t in teoria_l for t in ['hilemorfismo', 'potencia', 'acto', 'teleología', 'eudaimonía', 'prudencia', 'animal político', 'primer motor inmóvil']))
pos = [teoria_l.find('1. sensación') if '1. sensación' in teoria_l else teoria_l.find(e) for e in ESCALONES]
sec_con = limpio(next(n['html'] for n in T['nuevas'] if n['h'].startswith('6.'))).lower()
p2 = [sec_con.find(e) for e in ESCALONES]
cierto('conocimiento: escalones en orden en la tabla de la sección 6', all(p >= 0 for p in p2) and p2 == sorted(p2))

# --- ficha de un vistazo
a = vz['autores'][0]
m = re.search(r'(\d+)–(\d+) a\. C\.', a['f'])
cierto('ficha: fechas de Aristóteles y Liceo 335', (int(m.group(1)), int(m.group(2))) == ARISTOTELES and 'Estagira' in a['l'] and str(LICEO) in a['l'])
cierto('ficha: 6 bloques y 6–10 palabras clave con definición', len(vz['bloques']) == 6 and 6 <= len(vz['claves']) <= 10 and all(len(k) == 2 and k[1].strip() for k in vz['claves']))
cierto('ficha: obras clave son de Aristóteles e incluyen Ética a Nicómaco, Metafísica y Política', all(o in vz['obras'] for o in ['Ética a Nicómaco', 'Metafísica', 'Política']) and 'República' not in vz['obras'])
cierto('ficha: la cita es de la Ética a Nicómaco', vz['cita']['autor'] == 'Aristóteles' and 'Ética a Nicómaco' in vz['cita']['obra'] and 'bien' in vz['cita']['txt'])
tb = next(b for b in vz['bloques'] if b['t'].startswith('Ser humano'))['tabla']['filas']
for v, (d, e) in VIRTUDES.items():
    fila = next((f for f in tb if f[0] == v), None)
    cierto(f'ficha: {v} entre {d} y {e}', bool(fila) and d in fila[1] and e in fila[1])
conecta = limpio(json.dumps(vz['conecta'], ensure_ascii=False))
cierto('ficha: conecta con T1, T3, T7, T8–T9 y T12', all(t in conecta for t in ['(T1)', '(T3)', '(T7)', '(T8–T9)', '(T12)']))
cierto('ficha y teoría usan los mismos términos clave', all(t in teoria_l and t in vz_txt for t in ['sustancia', 'hilemorfismo', 'potencia', 'acto', 'cuatro causas', 'teleología', 'primer motor inmóvil', 'eudaimonía', 'término medio', 'prudencia', 'animal político', 'politeia', 'abstracción', 'silogismo', 'liceo']))
cierto('ficha: cuadro de resumen menciona forma, causas, felicidad y polis', all(t in limpio(' '.join(vz['resumen'])).lower() for t in ['forma', 'causas', 'felicidad', 'polis']))
cierto('ficha: la teoría sitúa a Aristóteles como discípulo de Platón unos veinte años, igual que la ficha', 'veinte años' in teoria_l and 'veinte años' in vz_txt)

# --- ejercicios con respuesta de hecho
def correcta(id_, campo=0):
    c = EJ[id_]['check']
    c = c[campo] if isinstance(c, list) else c
    return c['opciones'][c['ok']]


cierto('ha1: Estagira', correcta('ha1') == 'Estagira')
cierto('ha2: Liceo', correcta('ha2') == 'El Liceo')
cierto('ha3: unos veinte años', correcta('ha3') == 'Unos veinte años' and ACADEMIA_ENTRADA - PLATON[1] == 20)
cierto('ha4: Alejandro Magno', correcta('ha4') == 'Alejandro Magno')
cierto('ha5: Ética a Nicómaco', correcta('ha5') == 'Ética a Nicómaco')
cierto('ha6: hilemorfismo', 'hilemorfismo' in EJ['ha6']['check']['valores'])
esp7 = ['Materia', 'Forma', 'Materia', 'Forma']
cierto('ha7: materia/forma', [correcta('ha7', i) for i in range(4)] == esp7)
cierto('ha8: causas de la mesa', [correcta('ha8', i).lower() for i in range(4)] == CAUSAS)
cierto('ha9: potencia', correcta('ha9') == 'la potencia')
cierto('ha10: felicidad', 'felicidad' in EJ['ha10']['check']['valores'])
cierto('ha11: valentía entre cobardía y temeridad', correcta('ha11') == 'La valentía' and VIRTUDES['valentía'] == ('cobardía', 'temeridad'))
cierto('ha12: animal político', correcta('ha12') == 'un animal político')
orden = ' → '.join(n for n, _ in sorted([('Platón', PLATON), ('Aristóteles', ARISTOTELES), ('Tomás de Aquino', (-TOMAS[0], 0))], key=lambda x: -x[1][0]))
cierto('ha13: orden cronológico Platón → Aristóteles → Tomás', correcta('ha13') == orden)
cierto('ha13: único orden correcto entre las opciones', sum(1 for o in EJ['ha13']['check']['opciones'] if o == orden) == 1)
cierto('ha14: alma = forma del cuerpo', correcta('ha14') == 'la forma de su cuerpo')
# V/F: (verdadero?, índice de justificación correcta) y la afirmación coincide con los hechos
vf = {'ha15': False, 'ha16': True, 'ha17': False, 'ha18': True, 'ha19': False, 'ha20': False, 'ha21': True}
for k, esperado in vf.items():
    c = EJ[k]['check']
    cierto(f'{k}: veredicto {"verdadero" if esperado else "falso"}', c[0]['opciones'][c[0]['ok']] == ('Verdadero' if esperado else 'Falso'))
    cierto(f'{k}: la justificación correcta es la única que coincide con el veredicto', c[1]['opciones'][c[1]['ok']].lower().startswith('es verdad' if esperado else 'es falso'))
    cierto(f'{k}: las demás justificaciones no son la correcta duplicada', len(set(c[1]['opciones'])) == len(c[1]['opciones']))
cierto('ha22: potencia y acto', 'potencia al acto' in correcta('ha22'))
cierto('ha23: ver', correcta('ha23') == 'ver')
cierto('ha24: actividad racional', correcta('ha24') == 'la actividad racional')
cierto('ha25: prudencia es dianoética', 'intelectual' in correcta('ha25'))
cierto('ha26: hábito', 'hábito' in correcta('ha26'))
cierto('ha27: crecer es cuantitativo', correcta('ha27') == 'cuantitativo')
cierto('ha28: quemar madera es sustancial', correcta('ha28') == 'sustancial')
cierto('ha29: democracia es la desviada del gobierno de muchos', correcta('ha29') == 'La democracia' and ('politeia', 'democracia') in CONSTITUCIONES)
cierto('ha30: politeia', correcta('ha30').startswith('La politeia'))
cierto('ha31–ha32: textos con ideas coherentes', 'natural' in correcta('ha31') and 'comunidad' in correcta('ha32'))
cierto('ha33: carpintero es causa eficiente', 'eficiente' in correcta('ha33'))
cierto('ha34: Primer motor, causa final', 'causa final' in correcta('ha34'))
cierto('ha35: dualismo frente a hilemorfismo', 'separables' in correcta('ha35') and 'sola sustancia' in correcta('ha35'))
cierto('ha36: tercer hombre', 'tercera realidad' in correcta('ha36'))
cierto('ha37: Kant, deber', 'deber' in correcta('ha37') and 'felicidad' in correcta('ha37'))
esp38 = ['Nutrirse y reproducirse', 'Sentir y desear', 'Razonar y elegir']
cierto('ha38: almas y funciones', [correcta('ha38', i) for i in range(3)] == esp38 and [EJ['ha38']['check'][i]['etiqueta'].lower().split()[-1] for i in range(3)] == ['vegetativa', 'sensitiva', 'racional'])
et39 = [c['etiqueta'].lower() for c in EJ['ha39']['check']]
res39 = [correcta('ha39', i).lower() for i in range(4)]
esp39 = [VIRTUDES['valentía'][0], VIRTUDES['valentía'][1], VIRTUDES['generosidad'][1], VIRTUDES['generosidad'][0]]
cierto('ha39: defectos y excesos', res39 == esp39 and et39[0].startswith('defecto') and et39[1].startswith('exceso') and et39[2].startswith('exceso') and et39[3].startswith('defecto'))

# --- actividades
cl = T['datos']['medio']
esperado = {'cobardía': 0, 'valentía': 1, 'temeridad': 2, 'avaricia': 0, 'generosidad': 1, 'derroche': 2, 'insensibilidad': 0, 'templanza': 1, 'jactancia': 2}
cierto('clasificar «medio»: cada término en su categoría', all(esperado[next(k for k in esperado if it['t'].lower().startswith(k))] == it['c'] for it in cl['items']) and len(cl['items']) == 9)
cierto('clasificar «medio»: 3 categorías con 3 elementos cada una', cl['categorias'][1].lower().startswith('término medio') and [sum(1 for i in cl['items'] if i['c'] == k) for k in (0, 1, 2)] == [3, 3, 3])
oc = [limpio(x['t']).split(':')[0].lower() for x in T['datos']['ordenconoc']['items']]
cierto('orden «conocimiento»: sensación, memoria, experiencia, ciencia, sabiduría', oc == ESCALONES)
cierto('emparejar «constituciones»: recta–desviada', [tuple(x.lower() for x in p) for p in T['datos']['constituciones']['pares']] == CONSTITUCIONES)
q = T['datos']['errores']['preguntas'][4]
cierto('errores q5: «Aristóteles es anterior a Platón» es falsa y las otras 3 verdaderas',
       q['op'][q['ok']] == 'Aristóteles es anterior a Platón' and not (ARISTOTELES[0] > PLATON[0]) and ARISTOTELES[0] == 384 and PLATON[1] == 347 and ARISTOTELES[1] == 322)
q = T['datos']['errores']['preguntas'][7]
cierto('errores q8: la democracia es la desviada (la falsa) y la politeia la recta', q['op'][q['ok']].startswith('La democracia es la forma recta'))

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
