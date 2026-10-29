#!/usr/bin/env python3
"""
Verificación independiente de Historia de la Filosofía, tema 16 (Ortega y Gasset y la filosofía española).
Hechos de referencia escritos aquí (no se comparte código con la web): fechas de nacimiento y muerte,
años de las obras (dentro de la vida del autor y en orden), atribuciones de conceptos a autores,
coherencia de la ficha de vistazo con la teoría y una única respuesta correcta por ejercicio.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_historia_fil_t16.py /tmp/ampl.json
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


# vidas (nacimiento, muerte)
DESCARTES, NIETZSCHE, UNAMUNO, ORTEGA, ZUBIRI, ZAMBRANO = (1596, 1650), (1844, 1900), (1864, 1936), (1883, 1955), (1898, 1983), (1904, 1991)
# obras: (título, año, vida del autor)
OBRAS = [('Meditaciones del Quijote', 1914, ORTEGA), ('España invertebrada', 1921, ORTEGA), ('El tema de nuestro tiempo', 1923, ORTEGA),
         ('La deshumanización del arte', 1925, ORTEGA), ('La rebelión de las masas', 1930, ORTEGA), ('Ideas y creencias', 1940, ORTEGA),
         ('Historia como sistema', 1941, ORTEGA), ('Del sentimiento trágico de la vida', 1912, UNAMUNO), ('Niebla', 1914, UNAMUNO),
         ('Filosofía y poesía', 1939, ZAMBRANO), ('El hombre y lo divino', 1955, ZAMBRANO), ('Sobre la esencia', 1962, ZUBIRI), ('Inteligencia sentiente', 1980, ZUBIRI)]
REVISTA, EXILIO_ORTEGA, EXILIO_ZAMBRANO, GUERRA_CIVIL = 1923, 1936, 1939, (1936, 1939)
CONCEPTO = {'ortega': 'razón vital', 'zambrano': 'razón poética', 'zubiri': 'inteligencia sentiente', 'unamuno': 'sentimiento trágico'}

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['historia_fil']['t16']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# --- cronología
for n, (a, b) in dict(Descartes=DESCARTES, Nietzsche=NIETZSCHE, Unamuno=UNAMUNO, Ortega=ORTEGA, Zubiri=ZUBIRI, Zambrano=ZAMBRANO).items():
    cierto(f'{n}: nace antes de morir', a < b)
cierto('orden de nacimiento: Descartes, Nietzsche, Unamuno, Ortega, Zubiri, Zambrano', DESCARTES[0] < NIETZSCHE[0] < UNAMUNO[0] < ORTEGA[0] < ZUBIRI[0] < ZAMBRANO[0])
cierto('Ortega nació 19 años después que Unamuno y vivió 72 años', ORTEGA[0] - UNAMUNO[0] == 19 and ORTEGA[1] - ORTEGA[0] == 72)
cierto('Zambrano: exilio de 1939 a 1984 (45 años) y vuelve en vida (murió en 1991)', 1984 - EXILIO_ZAMBRANO == 45 and ZAMBRANO[0] < EXILIO_ZAMBRANO < 1984 < ZAMBRANO[1])
for t, y, (a, b) in OBRAS:
    cierto(f'obra «{t}» ({y}) dentro de la vida de su autor', a < y <= b)
anios = [y for t, y, au in OBRAS if au == ORTEGA]
cierto('obras de Ortega en orden cronológico en la lista de referencia', anios == sorted(anios))
cierto('Revista de Occidente (1923) y exilio de Ortega (1936) dentro de su vida', ORTEGA[0] < REVISTA < EXILIO_ORTEGA < ORTEGA[1])
cierto('Zambrano se exilia al terminar la Guerra Civil (1936–1939)', EXILIO_ZAMBRANO == GUERRA_CIVIL[1])

# --- la teoría recoge los hechos
for t, y in [('Meditaciones del Quijote', 1914), ('España invertebrada', 1921), ('El tema de nuestro tiempo', 1923), ('La deshumanización del arte', 1925),
             ('La rebelión de las masas', 1930), ('Ideas y creencias', 1940), ('Del sentimiento trágico de la vida', 1912), ('Filosofía y poesía', 1939)]:
    cierto(f'teoría: «{t}» con su año {y}', f'{t.lower()} ({y})' in teoria_l or f'{t.lower()} ({y},' in teoria_l)
cierto('teoría: años de vida de Ortega 1883–1955 y de Unamuno 1864–1936', '(1883–1955)' in teoria_l and '(1864–1936)' in teoria_l)
cierto('teoría: Zubiri (1898–1983) y Zambrano (1904–1991)', '(1898–1983)' in teoria_l and '(1904–1991)' in teoria_l)
cierto('teoría: Revista de Occidente en 1923 y muerte en Madrid en 1955', 'revista de occidente' in teoria_l and '1923' in teoria_l and 'madrid en 1955' in teoria_l)
cierto('teoría: términos clave presentes', all(t in teoria_l for t in ['circunstancia', 'perspectivismo', 'raciovitalismo', 'razón vital', 'razón histórica', 'realidad radical',
      'ideas y creencias', 'generación', 'hombre-masa', 'minoría', 'razón poética', 'inteligencia sentiente', 'sentimiento trágico', 'quehacer']))
cierto('teoría: la frase de Ortega se atribuye a Meditaciones del Quijote', 'meditaciones del quijote' in teoria_l and 'si no la salvo a ella no me salvo yo' in teoria_l)
cierto('teoría: perspectivismo distinguido del relativismo', 'perspectivismo no es relativismo' in teoria_l)
cierto('teoría: masa y minoría no son clases sociales', 'no es una distinción de clase social' in teoria_l)
cierto('teoría: conexiones con los temas 2, 9, 11, 12, 13, 14 y 15', all(f'tema {n}' in teoria_l or f'(t{n})' in teoria_l for n in (9, 11, 12, 13, 14, 15)) and 'sofistas, tema 2' in teoria_l)
cierto('teoría: atribuciones correctas (Zambrano poesía, Ortega vida, Zubiri sentir)', 'zambrano = poesía, ortega = vida, zubiri = sentir' in teoria_l)

# --- ficha de un vistazo
a = vz['autores'][0]
m = re.search(r'(\d+)–(\d+)', a['f'])
cierto('ficha: fechas de Ortega 1883–1955', (int(m.group(1)), int(m.group(2))) == ORTEGA and 'Madrid' in a['l'])
cierto('ficha: 6 bloques y 6–10 palabras clave con definición', len(vz['bloques']) == 6 and 6 <= len(vz['claves']) <= 10 and all(len(k) == 2 and k[1].strip() for k in vz['claves']))
cierto('ficha: todas las obras son de Ortega según la lista de referencia', all(any(o == t for t, y, au in OBRAS if au == ORTEGA) for o in vz['obras']) and len(vz['obras']) >= 6)
cierto('ficha: la cita es la frase de Meditaciones del Quijote (1914)', vz['cita']['txt'].startswith('Yo soy yo y mi circunstancia') and 'Meditaciones del Quijote' in vz['cita']['obra'] and '1914' in vz['cita']['obra'])
conecta = limpio(json.dumps(vz['conecta'], ensure_ascii=False))
cierto('ficha: conecta con T2, T9, T12, T13, T14 y T15', all(t in conecta for t in ['(T2)', '(T9)', '(T12)', '(T13)', '(T14)', '(T15)']))
cierto('ficha y teoría usan los mismos términos clave', all(t in teoria_l and t in vz_txt for t in ['circunstancia', 'perspectivismo', 'raciovitalismo', 'razón vital', 'razón histórica', 'realidad radical',
      'hombre-masa', 'razón poética', 'inteligencia sentiente', 'novecentismo', 'revista de occidente']))
cierto('ficha: resumen menciona circunstancia, perspectivismo, razón vital y hombre-masa', all(t in limpio(' '.join(vz['resumen'])).lower() for t in ['circunstancia', 'perspectivismo', 'vital', 'hombre-masa']))
cierto('ficha: 2 mini-tablas (perspectivismo; ideas y creencias)', sum(1 for b in vz['bloques'] if b.get('tabla')) == 2)
cierto('ficha: último bloque con Unamuno 1912, Zambrano y Zubiri', all(t in vz_txt for t in ['unamuno', '1912', 'zambrano', 'razón poética', 'zubiri', 'inteligencia sentiente']))
cierto('ficha: exilio de Ortega 1936–1945 coherente con la teoría', '1936–1945' in a['l'] and '(1936–1945)' in teoria_l)


def correcta(id_, campo=0):
    c = EJ[id_]['check']
    c = c[campo] if isinstance(c, list) else c
    return c['opciones'][c['ok']]


# --- ejercicios con respuesta de hecho
cierto('or1: 1883', correcta('or1') == str(ORTEGA[0]))
cierto('or2: Meditaciones del Quijote', correcta('or2') == 'Meditaciones del Quijote')
cierto('or3: Revista de Occidente', correcta('or3') == 'Revista de Occidente' and REVISTA == 1923)
cierto('or4: 1930', correcta('or4') == '1930')
cierto('or5: circunstancia', 'circunstancia' in EJ['or5']['check']['valores'])
cierto('or6: raciovitalismo', 'raciovitalismo' in EJ['or6']['check']['valores'])
cierto('or7: autor–concepto', [EJ['or7']['check'][i]['etiqueta'].lower() for i in range(4)] == ['ortega', 'zambrano', 'zubiri', 'unamuno']
       and all(CONCEPTO[k] in correcta('or7', i).lower() for i, k in enumerate(['ortega', 'zambrano', 'zubiri', 'unamuno'])))
cierto('or8: ideas se tienen; creencias se está', [correcta('or8', 0), correcta('or8', 1)] == ['se tienen', 'se está'])
cierto('or9: actitud vital', correcta('or9') == 'actitud vital')
cierto('or10: historia', 'historia' in EJ['or10']['check']['valores'])
cierto('or11: Novecentismo (nace 1883, después de Unamuno)', correcta('or11') == 'Novecentismo' and ORTEGA[0] > UNAMUNO[0])
orden = ' → '.join(n for n, _ in sorted([('Descartes', DESCARTES), ('Nietzsche', NIETZSCHE), ('Ortega', ORTEGA)], key=lambda x: x[1][0]))
cierto('or12: orden cronológico Descartes → Nietzsche → Ortega, único', correcta('or12') == orden and sum(1 for o in EJ['or12']['check']['opciones'] if o == orden) == 1)
cierto('or13: Guerra Civil', correcta('or13') == 'la Guerra Civil')
cierto('or14: vida como realidad radical', 'mi vida' in correcta('or14'))
vf = {'or15': False, 'or16': True, 'or17': False, 'or18': True, 'or19': False, 'or20': True, 'or21': False}
for k, esperado in vf.items():
    c = EJ[k]['check']
    cierto(f'{k}: veredicto {"verdadero" if esperado else "falso"}', c[0]['opciones'][c[0]['ok']] == ('Verdadero' if esperado else 'Falso'))
    cierto(f'{k}: la justificación correcta coincide con el veredicto', c[1]['opciones'][c[1]['ok']].lower().startswith('es verdad' if esperado else 'es falso'))
cierto('or15–or21: justificaciones correctas con el contenido',
       'hay una verdad' in correcta('or15', 1) and 'época' in correcta('or17', 1) and 'cualquier clase' in correcta('or19', 1) and 'Zambrano' in correcta('or21', 1))
cierto('or22: crítica a Descartes (yo aislado)', 'aislado' in correcta('or22') and 'circunstancia' in correcta('or22'))
cierto('or23: perspectivismo defiende una única verdad', 'única verdad' in correcta('or23'))
cierto('or24: razón histórica narra', 'narrando' in correcta('or24'))
cierto('or25: generación', 'edad parecida' in correcta('or25'))
cierto('or26: Unamuno sentimiento y fe, Ortega razón y vida', 'sentimiento y la fe' in correcta('or26') and 'razón unida a la vida' in correcta('or26'))
cierto('or27: especialista, hombre-masa', correcta('or27') == 'hombre-masa')
cierto('or28: crisis', 'crisis' in correcta('or28'))
cierto('or29: comprender y actuar', 'comprenderla' in correcta('or29'))
cierto('or30: sentir e inteligir un solo acto', 'un solo acto' in correcta('or30'))
cierto('or31–or33: ideas principales coherentes', 'inseparable' in correcta('or31') and 'actitud' in correcta('or32') and 'se tienen' in correcta('or33') and 'no se discuten' in correcta('or33'))
cierto('or34–or35: Nietzsche (vida antes que razón pura) y Marx (historia)', 'vida' in correcta('or34') and 'historia' in correcta('or35'))
cierto('or36–or37: razón como órgano de la vida; vida como punto de partida', 'órgano de la vida' in correcta('or36') and 'vida' in correcta('or37'))
cierto('or38: comparaciones rentables', [correcta('or38', i) for i in range(3)] == ['Descartes o Nietzsche', 'Sofistas o Kant', 'Platón o Marx'])

# --- actividades
cl = T['datos']['ideacreencia']
cierto('clasificar «ideacreencia»: 3 ideas y 3 creencias', [sum(1 for i in cl['items'] if i['c'] == k) for k in (0, 1)] == [3, 3] and cl['categorias'] == ['Idea', 'Creencia'])
creen = [i['t'].lower() for i in cl['items'] if i['c'] == 1]
cierto('clasificar «ideacreencia»: las creencias son supuestos cotidianos (suelo, mañana, existencia de las cosas)',
       any('suelo' in t for t in creen) and any('mañana' in t for t in creen) and any('existiendo' in t for t in creen))
par = {p[0]: p[1] for p in T['datos']['autores']['pares']}
cierto('emparejar «autores»: concepto de cada autor', len(par) == 4 and all(CONCEPTO[k.lower()] in v.lower() for k, v in par.items()))
ob = [x['t'] for x in T['datos']['ordenobras']['items']]
ys = [int(re.search(r'\((\d{4})\)', t).group(1)) for t in ob]
cierto('orden «obras»: años crecientes y coinciden con la referencia', ys == sorted(ys) and all(any(t.startswith(rt) and y == ry for rt, ry, au in OBRAS if au == ORTEGA) for t, y in zip(ob, ys)))
q = T['datos']['errores']['preguntas'][5]
cierto('errores q6: «Ortega es anterior a Unamuno» es la falsa y las otras cronologías son ciertas', q['op'][q['ok']] == 'Ortega es anterior a Unamuno' and not ORTEGA[0] < UNAMUNO[0] and UNAMUNO[0] == 1864 and ORTEGA[0] == 1883 and ORTEGA[1] == 1955)
q = T['datos']['errores']['preguntas'][6]
cierto('errores q7: «Zubiri propone la razón poética» es la falsa', q['op'][q['ok']] == 'Zubiri propone la razón poética')
q = T['datos']['quiz1']['preguntas'][9]
cierto('quiz q10: razón poética es de Zambrano', q['op'][q['ok']] == 'María Zambrano')

# --- estructura
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
