#!/usr/bin/env python3
"""
Verificación independiente de Historia de la Filosofía, tema 5 (el helenismo).
Hechos de referencia escritos aquí (no se comparte código con la web): fechas, orden de autores, escuelas,
correspondencia escuela–camino–meta, clasificación de los deseos y el argumento de Epicuro sobre la muerte.
Comprueba: cronología, ficha de vistazo coherente con la teoría, y que cada ejercicio de opción tenga
una única respuesta correcta que coincida con los hechos.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_historia_fil_t5.py /tmp/ampl.json
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


# años a. C. (nacimiento, muerte); d. C. se marcan con signo negativo en el nacimiento/muerte donde haga falta
ALEJANDRO, ARISTOTELES = (356, 323), (384, 322)
ZENON, EPICURO, PIRRON = (334, 262), (341, 270), (365, 275)
LUCRECIO = (99, 55)
CRISIPO = (280, 206)
ACCIO, PORTICO, JARDIN = 31, 301, 306
# d. C.
EPICTETO, MARCO_AURELIO = (50, 135), (121, 180)
# escuela: (fundador, camino, meta)
ESCUELAS = {'estoicismo': ('zenón', 'acept', 'apatía'), 'epicureísmo': ('epicuro', 'limit', 'ataraxia'), 'escepticismo': ('pirrón', 'suspen', 'ataraxia')}
DESEOS = [('natural y necesario', 'satisfac'), ('natural pero no necesario', 'moder'), ('ni natural ni necesario', 'evit')]

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['historia_fil']['t5']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# --- cronología
cierto('Alejandro muere un año antes que Aristóteles', ALEJANDRO[1] - ARISTOTELES[1] == 1)
cierto('Orden de nacimiento: Aristóteles < Pirrón < Epicuro < Zenón (en a. C., mayor = antes)', ARISTOTELES[0] > PIRRON[0] > EPICURO[0] > ZENON[0])
cierto('Epicuro y Zenón son contemporáneos (se solapan sus vidas) y viven tras Alejandro', EPICURO[1] < ZENON[0] + 100 and ZENON[0] < EPICURO[0] and ZENON[1] < EPICURO[1] and ZENON[0] < ALEJANDRO[0])
cierto('Pirrón es de la generación de Alejandro (solapan vidas)', PIRRON[0] > ALEJANDRO[1] and PIRRON[0] < ALEJANDRO[0] + 10 and PIRRON[1] < ALEJANDRO[1])
cierto('Escuelas fundadas tras la muerte de Alejandro/Aristóteles: Jardín (306) y Pórtico (301)', JARDIN < ALEJANDRO[1] and PORTICO < JARDIN and PORTICO < ZENON[0] and JARDIN < EPICURO[0] and PORTICO > ZENON[1] and JARDIN > EPICURO[1])
cierto('Accio (31 a. C.) es posterior a la muerte de Alejandro', ACCIO < ALEJANDRO[1])
cierto('Marco Aurelio, Epicteto: siglos I-II d. C. (en ese orden de nacimiento)', EPICTETO[0] < MARCO_AURELIO[0] and EPICTETO[1] < MARCO_AURELIO[1])
cierto('Lucrecio muere antes de que acabe la época helenística (31 a. C.)', LUCRECIO[1] > ACCIO)

# --- la teoría recoge las fechas
for nombre, (a, b) in [('Zenón de Citio', ZENON), ('Epicuro', EPICURO), ('Pirrón de Elis', PIRRON)]:
    m = re.search(re.escape(nombre) + r'[^()]{0,50}\((?:h\. )?(\d+)–(\d+) a\. C\.\)', limpio(teoria))
    cierto(f'teoría: fechas de {nombre}', bool(m) and (int(m.group(1)), int(m.group(2))) == (a, b))
cierto('teoría: Alejandro (356–323 a. C.)', 'alejandro magno (356–323 a. c.)' in teoria_l)
cierto('teoría: Aristóteles (384–322 a. C.)', 'aristóteles (384–322 a. c.)' in teoria_l)
cierto('teoría: Pórtico h. 301 a. C. y Jardín h. 306 a. C.', 'hacia 301 a. c.' in teoria_l and 'hacia 306 a. c.' in teoria_l)
cierto('teoría: Accio 31 a. C.', '31 a. c.' in teoria_l)
cierto('teoría: Lucrecio 99–55 a. C. y Crisipo h. 280–206 a. C.', 'lucrecio, 99–55 a. c.' in teoria_l and 'crisipo (h. 280–206 a. c.)' in teoria_l)
cierto('teoría: Epicteto h. 50–135, Marco Aurelio 121–180', re.search(r'epicteto[^()]{0,80}\(h\. 50–135 d\. c\.\)', teoria_l) is not None and 'marco aurelio (121–180)' in teoria_l)

# --- ficha de un vistazo
auts = {a['n']: a for a in vz['autores']}
for nombre, (a, b) in [('Zenón de Citio', ZENON), ('Epicuro', EPICURO), ('Pirrón de Elis', PIRRON)]:
    m = re.search(r'(\d+)–(\d+) a\. C\.', auts[nombre]['f'])
    cierto(f'ficha: fechas de {nombre}', bool(m) and (int(m.group(1)), int(m.group(2))) == (a, b))
cierto('ficha: lugares (Chipre, Samos, Élide)', 'Chipre' in auts['Zenón de Citio']['l'] and 'Samos' in auts['Epicuro']['l'] and 'Élide' in auts['Pirrón de Elis']['l'])
cierto('ficha: 6 bloques y 6–10 palabras clave con definición', len(vz['bloques']) == 6 and 6 <= len(vz['claves']) <= 10 and all(len(k) == 2 and k[1].strip() for k in vz['claves']))
cierto('ficha: la cita es de Epicteto, Manual, y aparece igual en la teoría', vz['cita']['autor'] == 'Epicteto' and 'Manual' in vz['cita']['obra'] and vz['cita']['txt'].lower().rstrip('.') in teoria_l)
conecta = limpio(json.dumps(vz['conecta'], ensure_ascii=False))
cierto('ficha: conecta con T1, T3, T4 y T6', all(t in conecta for t in ['(T1)', '(T3)', '(T4)', '(T6)']))
cierto('ficha y teoría usan los mismos términos clave', all(t in teoria_l and t in vz_txt for t in ['logos', 'apatía', 'ataraxia', 'aponía', 'epojé', 'hedonismo', 'tetrafármaco', 'cosmopolitismo', 'clinamen', '323 a. c.', '31 a. c.']))
cierto('ficha: cuadro de resumen menciona aceptar, limitar y suspender', all(t in limpio(' '.join(vz['resumen'])).lower() for t in ['aceptar', 'limitar', 'suspender']))
cierto('ficha: obras clave ajenas a los fundadores atribuidas a autores correctos', all(o in ' '.join(vz['obras']) for o in ['Epicteto', 'Marco Aurelio', 'Epicuro', 'Lucrecio', 'Sexto Empírico']))
# tablas de la ficha
bl = {b['t']: b for b in vz['bloques']}
filas_d = bl['Epicureísmo']['tabla']['filas']
cierto('ficha: epicureísmo — tres tipos de deseos con su acción',
       len(filas_d) == 3 and all(f[0] == d and a in f[1] for f, (d, a) in zip(filas_d, DESEOS)))
for esc, (fund, camino, meta) in ESCUELAS.items():
    fila = next((f for f in bl['Cómo distinguirlas']['tabla']['filas'] if f[0].lower() == esc), None)
    cierto(f'ficha: {esc} → camino y meta', bool(fila) and camino in fila[1].lower() and meta in fila[1].lower())
cierto('ficha: estoicismo — qué depende y qué no', 'juicios' in limpio(json.dumps(bl['Estoicismo']['tabla'], ensure_ascii=False)) and 'muerte' in limpio(json.dumps(bl['Estoicismo']['tabla'], ensure_ascii=False)))

# --- cuadro comparativo de la teoría coincide con ESCUELAS
cuadro = limpio(next(n['html'] for n in T['nuevas'] if n['h'].startswith('6.'))).lower()
for esc, (fund, camino, meta) in ESCUELAS.items():
    cierto(f'teoría: cuadro menciona {fund} y la meta {meta}', fund.split()[0] in cuadro and meta in cuadro)
cierto('teoría: apatía es de los estoicos y ataraxia de epicúreos/escépticos (aviso explícito)', 'la primera es epicúrea y escéptica, la segunda estoica' in teoria_l)

# --- argumento de la muerte: orden de los cinco pasos en la actividad y en el comentario resuelto
pasos = [limpio(x['t']).lower() for x in T['datos']['muerte']['items']]
claves = ['todo bien y todo mal', 'privación de sensación', 'mientras existimos', 'ya no existimos', 'temer']
cierto('orden «muerte»: los 5 pasos en el orden lógico', len(pasos) == 5 and all(c in p for c, p in zip(claves, pasos)))
com = limpio(next(n['html'] for n in T['nuevas'] if n['h'].startswith('7.'))).lower()
pos = [com.find(c) for c in ['todo bien y todo mal están en la sensación', 'ausencia de sensación', 'nunca coinciden', 'temerla no tiene sentido']]
cierto('comentario resuelto: el argumento aparece en orden', all(p >= 0 for p in pos) and pos == sorted(pos))
cierto('comentario: cita fiel («mientras nosotros existimos…»)', 'mientras nosotros existimos, la muerte no está presente, y cuando la muerte está presente, entonces nosotros ya no existimos' in com)

# --- clasificación de deseos (actividad)
dd = T['datos']['deseos']
cierto('clasificar «deseos»: categorías y 3+3+3 ítems', [c.lower() for c in dd['categorias']] == [d for d, _ in DESEOS] and [sum(1 for i in dd['items'] if i['c'] == k) for k in (0, 1, 2)] == [3, 3, 3])
dtxt = {i['t'].lower(): i['c'] for i in dd['items']}
cierto('clasificar «deseos»: fama, poder y riqueza sin límite = ni natural ni necesario', all(dtxt[k] == 2 for k in dtxt if any(x in k for x in ['famoso', 'poder', 'riquezas'])))
cierto('clasificar «deseos»: beber, techo y amigos = natural y necesario', all(dtxt[k] == 0 for k in dtxt if any(x in k for x in ['agua', 'techo', 'amigos'])))
cierto('teoría: misma clasificación (fama, poder, riqueza → evitarlos)', re.search(r'ni naturales ni necesarios.{0,160}fama, poder, riqueza excesiva.{0,40}evitarlos', limpio(teoria).lower()) is not None)
# emparejar «escuelas»
par = dict(T['datos']['escuelas']['pares'])
cierto('emparejar «escuelas»: autor–obra/lugar correctos', par['Zenón de Citio'].startswith('El Pórtico') and par['Epicuro'] == 'El Jardín' and par['Marco Aurelio'] == 'Meditaciones'
       and par['Sexto Empírico'].startswith('Hipotiposis') and par['Lucrecio'].startswith('De la naturaleza') and par['Epicteto'].startswith('Manual'))
cierto('emparejar «escuelas»: respuestas distintas', len({b for _, b in T['datos']['escuelas']['pares']}) == 6)

# --- ejercicios con respuesta de hecho
def correcta(id_, campo=0):
    c = EJ[id_]['check']
    c = c[campo] if isinstance(c, list) else c
    return c['opciones'][c['ok']]

cierto('he1: Zenón', correcta('he1') == 'Zenón de Citio')
cierto('he2: Jardín', correcta('he2') == 'El Jardín')
cierto('he5/he13: términos aceptados', 'apatía' in EJ['he5']['check']['valores'] and 'juicio' in EJ['he13']['check']['valores'])
for i, (esc, (fund, camino, meta)) in enumerate(ESCUELAS.items()):
    cierto(f'he7: {esc}–{fund}', EJ['he7']['check'][i]['etiqueta'].lower() == esc and fund in correcta('he7', i).lower())
    cierto(f'he8: {esc}–camino', EJ['he8']['check'][i]['etiqueta'].lower() == esc and camino in correcta('he8', i).lower())
orden = ' → '.join(n for n, _ in sorted([('Aristóteles', ARISTOTELES), ('Pirrón', PIRRON), ('Epicuro', EPICURO), ('Zenón', ZENON)], key=lambda x: -x[1][0]))
cierto('he11: orden cronológico', correcta('he11') == orden)
cierto('he11: único orden correcto entre las opciones', sum(1 for o in EJ['he11']['check']['opciones'] if o == orden) == 1)
cierto('he12: 323 a. C. y 31 a. C. como final (explicación)', '323' in correcta('he12') and '31 a. c.' in limpio(' '.join(EJ['he12']['pasos'])).lower())
cierto('he6/he29: Alejandro y Marco Aurelio (emperador)', correcta('he6') == 'Con Alejandro Magno' and correcta('he29') == 'Marco Aurelio')
cierto('he10/he25: tipos de deseo', correcta('he10') == 'ni naturales ni necesarios' and correcta('he25') == 'Natural y necesario')
cierto('he36: deseos clasificados', [correcta('he36', i) for i in range(3)] == ['Natural y necesario', 'Natural pero no necesario', 'Ni natural ni necesario'])
cierto('he37: términos griegos', [correcta('he37', i) for i in range(4)] == ['Ausencia de pasiones perturbadoras', 'Ausencia de dolor en el cuerpo', 'Suspensión del juicio', 'Calma del alma']
       and [c['etiqueta'] for c in EJ['he37']['check']] == ['Apatía', 'Aponía', 'Epojé', 'Ataraxia'])
cierto('he22: apatía estoica, ataraxia epicúrea y escéptica', correcta('he22').startswith('La apatía es estoica') and correcta('he34').startswith('Epicuro limita'))
cierto('he30: Demócrito', correcta('he30') == 'Demócrito')
# «encuentra el error»: cronología y ataraxia
ee = T['datos']['errores']['preguntas']
q = ee[4]
cierto('errores q5: «Epicuro nació antes que Aristóteles» es falsa y las otras 3 verdaderas',
       q['op'][q['ok']] == 'Epicuro nació antes que Aristóteles' and not (EPICURO[0] > ARISTOTELES[0]) and ARISTOTELES[1] == 322 and ZENON[0] < ALEJANDRO[0] + 25 and ALEJANDRO[1] == 323)
q = ee[3]
cierto('errores q4: «las polis ganan independencia» es la falsa', q['op'][q['ok']].startswith('Las polis ganan independencia'))
cierto('errores q7: «ataraxia exclusiva de estoicos» es la falsa y la apatía es lo estoico', ee[6]['op'][ee[6]['ok']].startswith('Es un término exclusivo de los estoicos') and ESCUELAS['estoicismo'][2] == 'apatía')

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
