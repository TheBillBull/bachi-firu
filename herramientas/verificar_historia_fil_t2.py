#!/usr/bin/env python3
"""
Verificación independiente de Historia de la Filosofía, tema 2 (sofistas y Sócrates).
Hechos de referencia escritos aquí (no se comparte código con la web): fechas, lugares, atribuciones, orden.
Comprueba: cronología, ficha de vistazo coherente con la teoría, atribuciones de frases y que cada ejercicio
de opción tenga una única respuesta correcta que coincida con los hechos.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_historia_fil_t2.py /tmp/ampl.json
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
    return re.sub('<[^>]+>', '', s)


# nombre: (nacimiento, muerte, lugar de origen)   (años a. C.; "h." = aproximado en la web)
HECHOS = {
    'Protágoras': (490, 420, 'Abdera'),
    'Gorgias': (483, 375, 'Leontinos'),
    'Sócrates': (470, 399, 'Atenas'),
    'Platón': (427, 347, 'Atenas'),
    'Aristóteles': (384, 322, 'Estagira'),
    'Pericles': (495, 429, 'Atenas'),
}
# sucesos: año a. C.
SUCESOS = {'inicio guerra del Peloponeso': 431, 'Las nubes': 423, 'derrota y Treinta Tiranos': 404,
           'restauración de la democracia': 403, 'juicio y muerte de Sócrates': 399}
GUERRA = (431, 404)
GUERRAS_MEDICAS = (490, 479)

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['historia_fil']['t2']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_txt = limpio(teoria)
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False))

# --- cronología de los hechos
for n, (a, b, _) in HECHOS.items():
    cierto(f'{n}: nace antes de morir', a > b)
cierto('Protágoras < Gorgias < Sócrates < Platón < Aristóteles (orden de nacimiento)',
       HECHOS['Protágoras'][0] > HECHOS['Gorgias'][0] > HECHOS['Sócrates'][0] > HECHOS['Platón'][0] > HECHOS['Aristóteles'][0])
cierto('Platón tenía 28 años cuando murió Sócrates (discípulo posible)', HECHOS['Platón'][0] - HECHOS['Sócrates'][1] == 28)
cierto('Aristóteles nace después de morir Sócrates', HECHOS['Aristóteles'][0] < HECHOS['Sócrates'][1])
cierto('Gorgias es contemporáneo de Sócrates (nace después, muere después)', HECHOS['Gorgias'][0] > HECHOS['Sócrates'][0] and HECHOS['Gorgias'][1] < HECHOS['Sócrates'][1])
cierto('la guerra del Peloponeso empieza antes de Las nubes y acaba antes del juicio', GUERRA[0] > SUCESOS['Las nubes'] > GUERRA[1] > SUCESOS['juicio y muerte de Sócrates'])
cierto('Las nubes (423) cae dentro de la vida de Sócrates', HECHOS['Sócrates'][0] > SUCESOS['Las nubes'] > HECHOS['Sócrates'][1])
cierto('Sócrates tenía 47 años en 423 y 71 al morir', HECHOS['Sócrates'][0] - SUCESOS['Las nubes'] == 47 and HECHOS['Sócrates'][0] - HECHOS['Sócrates'][1] == 71)
cierto('las guerras médicas ocurren antes de la guerra del Peloponeso', GUERRAS_MEDICAS[0] > GUERRAS_MEDICAS[1] > GUERRA[0])

# --- las fechas de la teoría coinciden con los hechos (todas las apariciones)
def fechas_en(texto, nombre):
    pat = re.escape(nombre) + r'[^()]{0,45}\((?:h\. )?(\d+)–(\d+) a\. C\.\)'
    return [(int(a), int(b)) for a, b in re.findall(pat, texto)]

for n in ['Protágoras', 'Gorgias', 'Pericles', 'Platón']:
    f = fechas_en(teoria_txt, n)
    cierto(f'teoría: fechas de {n} (al menos una y todas correctas)', f and all(x == HECHOS[n][:2] for x in f))
cierto('teoría: Sócrates 470–399 a. C.', '(470–399 a. C.)' in teoria_txt and 'en el 470 a. C.' in teoria_txt and 'en el 399 a. C.' in teoria_txt)
cierto('teoría: guerra del Peloponeso 431–404', '(431–404 a. C.)' in teoria_txt)
cierto('teoría: guerras médicas 490–479', '(490–479 a. C.)' in teoria_txt)
cierto('teoría: Las nubes 423', 'Las nubes (423 a. C.)' in teoria_txt)
cierto('teoría: Treinta Tiranos 404–403', '(404–403 a. C.)' in teoria_txt and 'en 403 a. C.' in teoria_txt)
cierto('teoría: lugares de origen de Protágoras y Gorgias', 'Protágoras era de Abdera' in teoria_txt and 'Gorgias de Leontinos' in teoria_txt)
cierto('teoría: cita de Protágoras con Teeteto 152a', 'Teeteto' in teoria_txt and '152a' in teoria_txt)
cierto('teoría: Apología 21d y 38a, Critón y Fedón mencionados', all(x in teoria_txt for x in ['21d', '38a', 'Critón', 'Fedón']))
cierto('teoría: acusadores Meleto, Anito y Licón', all(x in teoria_txt for x in ['Meleto', 'Anito', 'Licón']))
cierto('teoría: Aristóteles y la akrasía', 'akrasía' in teoria_txt and 'Aristóteles' in teoria_txt)

# --- la ficha concuerda con los hechos y con la teoría
FICHA = {x['n']: x for x in vz['autores']}
for n in ['Protágoras', 'Gorgias', 'Sócrates']:
    x = FICHA[n]
    m = re.search(r'(?:h\. )?(\d+)–(\d+) a\. C\.', x['f'])
    cierto(f'ficha: fechas de {n}', m and (int(m.group(1)), int(m.group(2))) == HECHOS[n][:2])
    cierto(f'ficha: lugar de {n}', HECHOS[n][2] in x['l'])
cierto('ficha: 6 bloques y entre 6 y 10 palabras clave con definición',
       len(vz['bloques']) == 6 and 6 <= len(vz['claves']) <= 10 and all(len(k) == 2 and k[1].strip() for k in vz['claves']))
cierto('ficha: cita de Sócrates en Apología 38a', vz['cita']['autor'] == 'Sócrates' and '38a' in vz['cita']['obra'] and 'examen' in vz['cita']['txt'])
cierto('ficha: la cita de la ficha figura en la teoría', 'sin examen' in teoria_txt)
tabla_sof = next(b for b in vz['bloques'] if b['t'] == 'Los sofistas')['tabla']['filas']
cierto('ficha: posturas de los sofistas coinciden con la teoría',
       dict(tabla_sof) == {'Protágoras': 'relativismo', 'Gorgias': 'escepticismo', 'Trasímaco': 'ley del más fuerte'}
       and 'Relativismo (subjetivismo)' in teoria_txt and 'Escepticismo' in teoria_txt and 'ley del más fuerte' in teoria_txt)
tabla_met = next(b for b in vz['bloques'] if b['t'] == 'El método')['tabla']
cierto('ficha: método con ironía y mayéutica', tabla_met['cab'] == ['Ironía', 'Mayéutica'])
cierto('ficha: fechas del juicio y la guerra coinciden con la teoría', '399 a. C.' in vz_txt and '431–404 a. C.' in vz_txt)
cierto('ficha y teoría comparten los términos clave',
       all(t.lower() in teoria_txt.lower() for t, _ in vz['claves'] if t != 'Physis / nomos')
       and 'physis' in teoria_txt.lower() and 'nomos' in teoria_txt.lower())
resumen_txt = limpio(' '.join(vz['resumen']))
cierto('ficha: el resumen remite a Platón (tema 3) y Aristóteles (tema 4)', 'Platón' in resumen_txt and 'tema 3' in resumen_txt and 'Aristóteles' in resumen_txt and 'tema 4' in resumen_txt)
cierto('ficha: conecta con T1, T3 y T4', [c['con'] for c in vz['conecta']][:3] == ['Presocráticos (T1):', 'Platón (T3):', 'Aristóteles (T4):'])

# --- los ejercicios con respuesta de hecho
def correcta(id_, campo=0):
    c = EJ[id_]['check']
    c = c[campo] if isinstance(c, list) else c
    return c['opciones'][c['ok']]

cierto('hs4: Protágoras', correcta('hs4') == 'Protágoras')
for i, (et, esp) in enumerate([('Protágoras', 'Relativismo'), ('Gorgias', 'Escepticismo'), ('Trasímaco', 'Ley del más fuerte'), ('Sócrates', 'Ignorancia docta')]):
    cierto(f'hs5: {et}', EJ['hs5']['check'][i]['etiqueta'] == et and correcta('hs5', i) == esp)
cierto('hs6: nomos', EJ['hs6']['check']['valores'] == ['nomos'])
cierto('hs7: mayéutica', 'mayéutica' in EJ['hs7']['check']['valores'])
cierto('hs13: Atenas', EJ['hs13']['check']['valores'] == ['Atenas'] and HECHOS['Sócrates'][2] == 'Atenas')
orden = ' → '.join(sorted(['Protágoras', 'Sócrates', 'Platón', 'Aristóteles'], key=lambda n: -HECHOS[n][0]))
cierto('hs12: orden cronológico', correcta('hs12') == orden)
cierto('hs12: único orden correcto entre las opciones', sum(1 for o in EJ['hs12']['check']['opciones'] if o == orden) == 1)
cierto('hs23: ironía/mayéutica', [EJ['hs23']['check'][i]['ok'] for i in range(3)] == [0, 1, 0])
cierto('hs28: frases', [correcta('hs28', i) for i in range(4)] == ['Protágoras', 'Gorgias', 'Sócrates', 'Trasímaco'])
cierto('hs41: Treinta Tiranos (404) antes del juicio (399)', SUCESOS['derrota y Treinta Tiranos'] > SUCESOS['juicio y muerte de Sócrates'] and correcta('hs41').startswith('Los Treinta Tiranos'))
cierto('hs38: la falsa es «tribunal espartano» (juzgó un tribunal de Atenas)', correcta('hs38').startswith('Sócrates fue condenado por un tribunal espartano'))
cierto('hs36: la falsa es «Gorgias discípulo de Sócrates» (contemporáneo y sofista)', correcta('hs36') == 'Gorgias fue discípulo de Sócrates' and HECHOS['Gorgias'][0] > HECHOS['Sócrates'][0])
cierto('hs17: verdadero con justificación «por ignorancia»', EJ['hs17']['check'][0]['ok'] == 0 and 'ignorancia' in correcta('hs17', 1))
cierto('hs15/16/18: falsas', all(EJ[i]['check'][0]['ok'] == 1 for i in ['hs15', 'hs16', 'hs18']))

# actividades de «ordenar»: ya vienen en el orden correcto
juicio = T['datos']['juicio']['items']
anios = [int(re.match(r'(\d+) a\. C\.', limpio(i['t'])).group(1)) for i in juicio]
cierto('orden «juicio»: años estrictamente decrecientes (de más antiguo a más reciente)', anios == sorted(anios, reverse=True) and len(set(anios)) == len(anios))
cierto('orden «juicio»: cada año coincide con los sucesos de referencia', anios == [SUCESOS['inicio guerra del Peloponeso'], SUCESOS['Las nubes'], SUCESOS['derrota y Treinta Tiranos'], SUCESOS['restauración de la democracia'], SUCESOS['juicio y muerte de Sócrates']])
dial = [limpio(i['t']) for i in T['datos']['dialogo']['items']]
cierto('orden «diálogo»: ironía (pregunta, definición, contraejemplo, aporía) antes de la mayéutica',
       'finge ignorancia' in dial[0] and 'aporía' in dial[3] and 'mayéutica' in dial[4] and 'contraejemplo' in dial[2])
pares = dict(T['datos']['conceptos']['pares'])
cierto('emparejar: pares del tema correctos', pares['Protágoras'].startswith('El hombre, medida') and pares['Gorgias'].startswith('Nada existe') and pares['Trasímaco'].endswith('más fuerte') and 'mayéutica' in pares['Sócrates'] and 'akrasía' in pares['Aristóteles'])
cierto('emparejar: columnas sin repetidos', len(set(pares.values())) == len(pares))
CLAS = {'Enseño retórica': 0, 'Solo busco la verdad': 1, 'La verdad depende': 0, 'Existe una definición universal': 1, 'Las leyes son convenciones': 0, 'Mi sabiduría': 1, 'Nadie obra mal': 1, 'Lo importante es persuadir': 0}
cl = T['datos']['quien']['items']
cierto('clasificar: categorías según la doctrina', all(any(limpio(i['t']).lstrip('«').startswith(k) and i['c'] == v for k, v in CLAS.items()) for i in cl) and len(cl) == len(CLAS))
pregs = T['datos']['errores']['preguntas']
cierto('errores q5: «los presocráticos son posteriores a Sócrates» es falsa', pregs[4]['op'][pregs[4]['ok']].startswith('Los presocráticos son posteriores') and HECHOS['Protágoras'][0] > HECHOS['Sócrates'][0] > HECHOS['Platón'][0] > HECHOS['Aristóteles'][0])
cierto('errores q1: la falsa es que Sócrates cobraba', pregs[0]['op'][pregs[0]['ok']].startswith('Sócrates cobraba'))
cierto('errores q2: la falsa es que Sócrates era escéptico', 'escéptico' in pregs[1]['op'][pregs[1]['ok']])

# --- estructura de todos los ejercicios y actividades
niveles = [e['nivel'] for e in T['ejercicios']]
cierto('≥ 40 ejercicios', len(EJ) >= 40 and len(EJ) == len(T['ejercicios']))
cierto('hay ejercicios de los tres niveles', set(niveles) == {1, 2, 3})
cierto('al menos 3 preguntas abiertas con rúbrica', sum(1 for e in T['ejercicios'] if (e['check'][0] if isinstance(e['check'], list) else e['check'])['tipo'] == 'rubrica') >= 3)
cierto('hay ejercicios de opción, V/F con justificación, emparejar y completar',
       any(isinstance(e['check'], list) and len(e['check']) == 2 and e['check'][0]['opciones'] == ['Verdadero', 'Falso'] for e in T['ejercicios'])
       and any(isinstance(e['check'], list) and len(e['check']) >= 3 for e in T['ejercicios'])
       and any((not isinstance(e['check'], list)) and e['check']['tipo'] == 'texto' for e in T['ejercicios']))
for e in T['ejercicios']:
    cs = e['check'] if isinstance(e['check'], list) else [e['check']]
    cierto(f"{e['id']}: pasos y resultado", e.get('pasos') and e.get('resultado'))
    for c in cs:
        if c['tipo'] == 'opcion':
            ops = c['opciones']
            cierto(f"{e['id']}: opciones distintas y ok en rango", len(set(ops)) == len(ops) and 0 <= c['ok'] < len(ops))
        if c['tipo'] == 'rubrica':
            tot = round(sum(i['p'] for i in c['items']), 2)
            cierto(f"{e['id']}: rúbrica suma 2 puntos", tot == 2.0)
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
