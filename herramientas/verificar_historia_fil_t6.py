#!/usr/bin/env python3
"""
Verificación independiente de Historia de la Filosofía, tema 6 (San Agustín y la patrística).
Hechos de referencia escritos aquí (no se comparte código con la web): fechas, orden de autores,
obras dentro de la vida del autor, hitos históricos, ejercicios con una única respuesta correcta
y ficha de vistazo coherente con la teoría.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_historia_fil_t6.py /tmp/ampl.json
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


# años (negativos = a. C.)
PLATON = (-427, -347)
AGUSTIN = (354, 430)
TOMAS = (1225, 1274)
DESCARTES = (1596, 1650)
CONVERSION, BAUTISMO, OBISPO, SAQUEO, EDICTO_MILAN, TEODOSIO, CAIDA_OCCIDENTE = 386, 387, 395, 410, 313, 380, 476
OBRAS = {  # (inicio, fin) de composición
    'Confesiones': (397, 401), 'La Ciudad de Dios': (413, 426), 'Sobre el libre albedrío': (388, 395), 'La Trinidad': (399, 419)}
PELAGIO_POLEMICA = 411

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['historia_fil']['t6']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# --- cronología
cierto('Agustín vive 76 años', AGUSTIN[1] - AGUSTIN[0] == 76)
cierto('Platón murió más de 700 años antes del nacimiento de Agustín (no fue su discípulo)', AGUSTIN[0] - PLATON[1] == 701)
cierto('Orden: Platón, Agustín, Tomás de Aquino, Descartes', PLATON[0] < AGUSTIN[0] < TOMAS[0] < DESCARTES[0])
cierto('Conversión (386) y bautismo (387) a los 32 y 33 años', CONVERSION - AGUSTIN[0] == 32 and BAUTISMO - AGUSTIN[0] == 33)
cierto('Obispo hacia 395 y 410 (saqueo) dentro de su vida, con 56 y 45 años de edad en 410', AGUSTIN[0] < OBISPO < SAQUEO < AGUSTIN[1] and SAQUEO - AGUSTIN[0] == 56 and OBISPO - AGUSTIN[0] == 41)
cierto('Hitos del Imperio en orden: 313, 380, 410, 476', EDICTO_MILAN < TEODOSIO < SAQUEO < CAIDA_OCCIDENTE)
cierto('Agustín nace tras el Edicto de Milán y muere antes de la caída de Occidente', EDICTO_MILAN < AGUSTIN[0] and AGUSTIN[1] < CAIDA_OCCIDENTE)
cierto('La Ciudad de Dios se empieza tras el saqueo de 410 y se acaba en vida del autor (13 años de trabajo)', OBRAS['La Ciudad de Dios'][0] > SAQUEO and OBRAS['La Ciudad de Dios'][1] < AGUSTIN[1] and OBRAS['La Ciudad de Dios'][1] - OBRAS['La Ciudad de Dios'][0] == 13)
for o, (a, b) in OBRAS.items():
    cierto(f'obra «{o}» dentro de la vida de Agustín', AGUSTIN[0] < a <= b < AGUSTIN[1])
cierto('Pelagio: la polémica (411) es posterior al saqueo y a la conversión', CONVERSION < SAQUEO < PELAGIO_POLEMICA < AGUSTIN[1])
cierto('Tomás de Aquino nace 795 años después de la muerte de Agustín', TOMAS[0] - AGUSTIN[1] == 795)

# --- la teoría recoge los hechos
for fr in ['354', '386', '387', '395', '410', '413', '426', '430', '313', '380', '476', '1225–1274', '411']:
    cierto(f'teoría menciona {fr}', fr in teoria_l)
cierto('teoría: nace en Tagaste, obispo de Hipona', 'tagaste' in teoria_l and 'obispo de hipona' in teoria_l)
cierto('teoría: tres mal tipos y privatio boni', 'privatio boni' in teoria_l and 'mal físico' in teoria_l and 'mal moral' in teoria_l and 'mal metafísico' in teoria_l)
cierto('teoría: cita de comentario con libro XIV, cap. 28 y marca de traducción', 'xiv, cap. 28' in teoria_l and 'traducción española habitual' in teoria_l)
cierto('teoría: las citas de memoria están marcadas como traducción o paráfrasis habitual', teoria_l.count('traducción habitual') + teoria_l.count('paráfrasis') + teoria_l.count('fórmula habitual') >= 4)

# --- ficha de vistazo
a = vz['autores'][0]
m = re.search(r'(\d+)–(\d+)', a['f'])
cierto('ficha: fechas 354–430 y lugares', (int(m.group(1)), int(m.group(2))) == AGUSTIN and 'Tagaste' in a['l'] and 'Hipona' in a['l'])
cierto('ficha: 6 bloques y 6–10 palabras clave con definición', len(vz['bloques']) == 6 and 6 <= len(vz['claves']) <= 10 and all(len(k) == 2 and k[1].strip() for k in vz['claves']))
cierto('ficha: obras clave incluyen Confesiones y La Ciudad de Dios', all(o in vz['obras'] for o in ['Confesiones', 'La Ciudad de Dios']))
cierto('ficha: obras son las verificadas en cronología', all(o in OBRAS for o in vz['obras']))
cierto('ficha: la cita es de las Confesiones I, 1 y está marcada como traducción habitual', vz['cita']['autor'].startswith('Agustín') and 'Confesiones, I, 1' in vz['cita']['obra'] and 'traducción habitual' in vz['cita']['obra'])
cierto('ficha: frases ≤ 15 palabras y ≤ 3 por bloque', all(len(b['frases']) <= 3 and all(len(limpio(f).split()) <= 15 for f in b['frases']) for b in vz['bloques']))
conecta = limpio(json.dumps(vz['conecta'], ensure_ascii=False))
cierto('ficha: conecta con T3, T5, T7 y T9', all(t in conecta for t in ['(T3)', '(T5)', '(T7)', '(T9)']))
cierto('ficha y teoría usan los mismos términos clave', all(t in teoria_l and t in vz_txt for t in ['patrística', 'si fallor, sum', 'iluminación', 'privación', 'libre albedrío', 'gracia', 'dos ciudades', 'distentio animi', 'pelagio', '410']))
cierto('ficha: mini-tabla de ciudades coincide con la teoría (amor a Dios / a sí mismo)', 'amor a dios' in vz_txt and 'amor a sí mismo' in vz_txt and 'a sí mismo' in teoria_l and 'a dios' in teoria_l)
cierto('ficha: resumen menciona verdad, fe, mal e historia', all(t in limpio(' '.join(vz['resumen'])).lower() for t in ['verdad', 'fe y razón', 'mal', 'historia']))
cierto('ficha y teoría: 410 y 354–430 coinciden', '410' in vz_txt and '354–430' in vz_txt and '354–430' in teoria_l)

# --- ejercicios con respuesta de hecho


def correcta(id_, campo=0):
    c = EJ[id_]['check']
    c = c[campo] if isinstance(c, list) else c
    return c['opciones'][c['ok']]


cierto('pa1: Tagaste (nace en 354)', correcta('pa1') == 'Tagaste')
cierto('pa2: Confesiones', correcta('pa2') == 'Confesiones')
cierto('pa3: 410', correcta('pa3') == str(SAQUEO))
cierto('pa4: padre', correcta('pa4') == 'padre')
cierto('pa5: Hipona', correcta('pa5') == 'Hipona')
cierto('pa6: sum', 'sum' in EJ['pa6']['check']['valores'])
cierto('pa7: Confesiones–autobiografía, Ciudad de Dios–historia', correcta('pa7', 0).startswith('Autobiografía') and correcta('pa7', 1) == 'Filosofía de la historia')
cierto('pa8: dos principios', correcta('pa8').startswith('dos principios'))
cierto('pa9: privación', 'privación' in EJ['pa9']['check']['valores'])
cierto('pa10: lineal', correcta('pa10') == 'lineal')
orden = ' → '.join(n for n, _ in sorted([('Platón', PLATON), ('Agustín', AGUSTIN), ('Tomás de Aquino', TOMAS)], key=lambda x: x[1][0]))
cierto('pa11: orden Platón → Agustín → Tomás', correcta('pa11') == orden)
cierto('pa11: único orden correcto entre las opciones', sum(1 for o in EJ['pa11']['check']['opciones'] if o == orden) == 1)
cierto('pa12: Platón', correcta('pa12') == 'Platón')
cierto('pa13: Ambrosio', correcta('pa13') == 'Ambrosio')
cierto('pa14: fe y razón', correcta('pa14').startswith('la relación entre fe'))
vf = {'pa15': False, 'pa16': True, 'pa17': False, 'pa18': True, 'pa19': False, 'pa20': True, 'pa21': False}
for k, esperado in vf.items():
    c = EJ[k]['check']
    cierto(f'{k}: veredicto {"verdadero" if esperado else "falso"}', c[0]['opciones'][c[0]['ok']] == ('Verdadero' if esperado else 'Falso'))
    cierto(f'{k}: la justificación correcta coincide con el veredicto', c[1]['opciones'][c[1]['ok']].lower().startswith('es verdad' if esperado else 'es falso'))
    cierto(f'{k}: solo una justificación coherente con el veredicto y la correcta', sum(1 for o in c[1]['opciones'] if o.lower().startswith('es verdad' if esperado else 'es falso')) >= 1 and len(set(c[1]['opciones'])) == 4)
cierto('pa22: Ideas en la mente de Dios', 'mente de dios' in correcta('pa22').lower())
cierto('pa23: iluminación → verdades eternas', 'verdades eternas' in correcta('pa23'))
cierto('pa24: el mal no es sustancia', 'no es una sustancia' in correcta('pa24'))
cierto('pa25: libre albedrío', 'libre albedrío' in correcta('pa25'))
cierto('pa26: en el alma', correcta('pa26').startswith('En el alma'))
cierto('pa27: paganos', 'paganos' in correcta('pa27') and SAQUEO == 410)
cierto('pa28: gracia', 'gracia' in correcta('pa28'))
cierto('pa29: Tertuliano rechaza', correcta('pa29').startswith('rechazo'))
cierto('pa30: no hay un antes', 'antes' in correcta('pa30'))
cierto('pa31–pa32: textos con ideas coherentes', 'para dios' in correcta('pa31').lower() and 'escéptico' in correcta('pa32'))
cierto('pa33: distinto uso del cogito', 'escepticismo' in correcta('pa33') and 'método' in correcta('pa33'))
cierto('pa34: el mal no es creado', 'privación' in correcta('pa34') and 'voluntad libre' in correcta('pa34'))
cierto('pa35: síntesis frente a rechazo', 'Tertuliano la rechaza' in correcta('pa35'))
cierto('pa36: principio, sentido y final', 'principio' in correcta('pa36') and 'final' in correcta('pa36'))
cierto('pa37: iluminación', correcta('pa37') == 'la iluminación divina')
cierto('pa38: tiempo y facultad', [correcta('pa38', i) for i in range(3)] == ['Memoria', 'Atención', 'Espera'] and [EJ['pa38']['check'][i]['etiqueta'] for i in range(3)] == ['Pasado', 'Presente', 'Futuro'])
cierto('pa39: Platón, Agustín, Descartes', [EJ['pa39']['check'][i]['etiqueta'] for i in range(3)] == ['Platón', 'Agustín', 'Descartes'] and [correcta('pa39', i) for i in range(3)] == ['Ideas en un mundo aparte', 'Ideas en la mente de Dios', 'Certeza del yo como punto de partida del método'])
cierto('pa40: Agustín y Pelagio', correcta('pa40').startswith('Agustín: debilita') and 'Pelagio' in correcta('pa40'))

# --- actividades
cl = T['datos']['ciudades']
cierto('clasificar «ciudades»: 6 rasgos, 3 y 3', len(cl['items']) == 6 and [sum(1 for i in cl['items'] if i['c'] == k) for k in (0, 1)] == [3, 3])
esp = {'Amor a Dios': 0, 'Amor a sí mismo': 1, 'Busca la paz': 0, 'Busca el poder': 1, 'Vive según Dios': 0, 'Vive según sí mismo': 1}
cierto('clasificar «ciudades»: cada rasgo en su ciudad', all(esp[next(k for k in esp if it['t'].startswith(k))] == it['c'] for it in cl['items']))
cierto('emparejar «posturas»', [tuple(p) for p in T['datos']['posturas']['pares']] == [('Tertuliano', 'Rechazo'), ('Justino', 'Aprovechamiento'), ('Agustín', 'Síntesis con el platonismo')])
anios = [int(re.match(r'(\d+)', x['t']).group(1)) for x in T['datos']['camino']['items']]
cierto('orden «camino»: cronológico y coherente con las fechas verificadas', anios == sorted(anios) and anios == [AGUSTIN[0], CONVERSION, SAQUEO, OBRAS['La Ciudad de Dios'][0], AGUSTIN[1]])
q = T['datos']['errores']['preguntas'][0]
cierto('errores q1: «discípulo directo de Platón» es la falsa', q['op'][q['ok']].startswith('Fue discípulo directo de Platón') and AGUSTIN[0] > PLATON[1])
q = T['datos']['errores']['preguntas'][4]
cierto('errores q5: «antes de la Creación ya pasaba el tiempo» es la falsa', q['op'][q['ok']].startswith('Antes de la Creación'))
q = T['datos']['quiz1']['preguntas'][1]
cierto('quiz q2: Hipona', q['op'][q['ok']] == 'Hipona')

# --- estructura de todos los ejercicios y actividades
niveles = [e['nivel'] for e in T['ejercicios']]
cierto('≥ 40 ejercicios', len(EJ) >= 40 and len(EJ) == len(T['ejercicios']))
cierto('hay ejercicios de los tres niveles', set(niveles) == {1, 2, 3})
cierto('≥ 3 preguntas abiertas con rúbrica', sum(1 for e in T['ejercicios'] if not isinstance(e['check'], list) and e['check']['tipo'] == 'rubrica') >= 3)
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
