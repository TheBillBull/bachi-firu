#!/usr/bin/env python3
"""
Verificación independiente de Historia de la Filosofía, tema 8 (El Renacimiento y el nacimiento de la ciencia moderna).
Hechos de referencia escritos aquí (sin compartir código con la web): fechas, orden de autores, obras dentro de la
vida del autor, hitos históricos, la cinemática del plano inclinado (cifras de los ejercicios), ejercicios con una
única respuesta correcta y ficha de vistazo coherente con la teoría.

Uso:  python3 herramientas/verificar_historia_fil_t8.py [ampl.json]
      (sin argumento, genera el volcado con node herramientas/volcar_ampliaciones.js)
"""
import json, re, subprocess, sys
from fractions import Fraction

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
PICO, PETRARCA = (1463, 1494), (1304, 1374)
ERASMO, MORO, LEONARDO = (1466, 1536), (1478, 1535), (1452, 1519)
MAQUIAVELO, COPERNICO, GALILEO = (1469, 1527), (1473, 1543), (1564, 1642)
KEPLER, BACON, DESCARTES, TOMAS = (1571, 1630), (1561, 1626), (1596, 1650), (1225, 1274)
BRUNO_HOGUERA = 1600
IMPRENTA, CONSTANTINOPLA, AMERICA, LUTERO = 1450, 1453, 1492, 1517
DISCURSO_PICO, ELOGIO_LOCURA, UTOPIA = 1486, 1511, 1516
PRINCIPE_ESCRITO, PRINCIPE_PUBLICADO = 1513, 1532
OBRA_COPERNICO, INDICE_1616, MENSAJERO, ENSAYADOR, DIALOGO, PROCESO, DISCURSOS = 1543, 1616, 1610, 1623, 1632, 1633, 1638
KEPLER_ELIPSES, NOVUM_ORGANUM, TELESCOPIO_GALILEO = 1609, 1620, 1609

if len(sys.argv) > 1:
    datos = json.load(open(sys.argv[1]))
else:
    datos = json.loads(subprocess.run(['node', 'herramientas/volcar_ampliaciones.js'], capture_output=True, text=True, check=True).stdout)
T = datos['ampl']['historia_fil']['t8']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# --- cronología
cierto('Orden de nacimiento: Pico, Maquiavelo, Copérnico, Galileo, Descartes',
       PICO[0] < MAQUIAVELO[0] < COPERNICO[0] < GALILEO[0] < DESCARTES[0])
cierto('Maquiavelo, Copérnico y Galileo viven 58, 70 y 78 años',
       [MAQUIAVELO[1] - MAQUIAVELO[0], COPERNICO[1] - COPERNICO[0], GALILEO[1] - GALILEO[0]] == [58, 70, 78])
cierto('Hitos en orden: imprenta, Constantinopla, América, Lutero, Copérnico',
       IMPRENTA < CONSTANTINOPLA < AMERICA < LUTERO < OBRA_COPERNICO)
cierto('Copérnico publica su obra el año de su muerte (1543)', OBRA_COPERNICO == COPERNICO[1])
cierto('Copérnico muere antes del nacimiento de Galileo, y no pudo ser juzgado en 1616 ni 1633',
       COPERNICO[1] < GALILEO[0] and COPERNICO[1] < INDICE_1616 < PROCESO)
cierto('Galileo tenía 69 años en 1633 y murió 9 años después (1642)', PROCESO - GALILEO[0] == 69 and GALILEO[1] - PROCESO == 9)
cierto('Obras de Galileo dentro de su vida y en orden: Mensajero, Ensayador, Diálogo, Discursos',
       GALILEO[0] < MENSAJERO < ENSAYADOR < DIALOGO < PROCESO < DISCURSOS < GALILEO[1])
cierto('Telescopio mejorado en 1609, antes de El mensajero sideral (1610)', TELESCOPIO_GALILEO < MENSAJERO)
cierto('Maquiavelo escribe El Príncipe en vida (1513) y se publica póstumo (1532)', MAQUIAVELO[0] < PRINCIPE_ESCRITO < MAQUIAVELO[1] < PRINCIPE_PUBLICADO)
cierto('Pico escribió el Discurso con 23 años (1486)', DISCURSO_PICO - PICO[0] == 23 and DISCURSO_PICO < PICO[1])
cierto('Erasmo (1511) y Moro (1516): obras dentro de sus vidas', ERASMO[0] < ELOGIO_LOCURA < ERASMO[1] and MORO[0] < UTOPIA < MORO[1])
cierto('Bruno (1600) muere antes del proceso a Galileo, que no fue quemado', BRUNO_HOGUERA < PROCESO)
cierto('Kepler (1609) y Bacon (1620) viven en la época; Descartes nace después de Galileo',
       KEPLER[0] < KEPLER_ELIPSES < KEPLER[1] and BACON[0] < NOVUM_ORGANUM < BACON[1] and GALILEO[0] < DESCARTES[0] < GALILEO[1])
cierto('Tomás de Aquino es anterior a todos los autores del tema', TOMAS[1] < PETRARCA[0] < PICO[0])

# --- la teoría recoge los hechos
for fr in ['1453', '1492', '1517', '1543', '1473–1543', '1564–1642', '1469–1527', '1610', '1616', '1632', '1633', '1638', '1642',
           '1513', '1532', '1486', '1511', '1516', '1623', '1609', '1620', '1600', '1571–1630', '1304–1374', '1463–1494', '1466–1536', '1478–1535', '1452–1519']:
    cierto(f'teoría menciona {fr}', fr in teoria_l)
cierto('teoría: Florencia, Polonia, Ptolomeo, Aristarco', all(t in teoria_l for t in ['florencia', 'polonia', 'ptolomeo', 'aristarco']))
cierto('teoría: 69 años en 1633', '69 años' in teoria_l)
cierto('teoría: virtù, fortuna, zorro y león, razón de estado, verdad efectiva',
       all(t in teoria_l for t in ['virtù', 'fortuna', 'zorro', 'león', 'razón de estado', 'verdad efectiva']))
cierto('teoría: cita de Galileo (El Ensayador) y de Maquiavelo (XV) con marca de traducción habitual',
       'el ensayador' in teoria_l and 'cap. xv' in teoria_l and teoria_l.count('traducción española habitual') >= 2)
cierto('teoría: aclara que Galileo no fue quemado y que no inventó el telescopio', 'no</b> fue quemado' in teoria.lower() or 'no fue quemado' in teoria_l)
cierto('teoría: aclara la caricatura «el fin justifica los medios»', 'el fin justifica los medios' in teoria_l)
cierto('teoría: las citas de memoria están marcadas como traducción o paráfrasis', teoria_l.count('traducción española habitual') + teoria_l.count('parafraseando') >= 3)

# --- ficha de vistazo
nombres = {a['n']: a for a in vz['autores']}
esperado = {'Nicolás Copérnico': COPERNICO, 'Nicolás Maquiavelo': MAQUIAVELO, 'Galileo Galilei': GALILEO}
cierto('ficha: tres autores con fechas verificadas', set(nombres) == set(esperado) and all(
    tuple(int(x) for x in re.match(r'(\d+)–(\d+)', nombres[n]['f']).groups()) == esperado[n] for n in esperado))
cierto('ficha: lugares coherentes', 'Polonia' in nombres['Nicolás Copérnico']['l'] and 'Florencia' in nombres['Nicolás Maquiavelo']['l'] and 'Pisa' in nombres['Galileo Galilei']['l'])
cierto('ficha: 6 bloques y 6–10 palabras clave con definición', len(vz['bloques']) == 6 and 6 <= len(vz['claves']) <= 10 and all(len(k) == 2 and k[1].strip() for k in vz['claves']))
cierto('ficha: 5 obras clave, todas mencionadas en la teoría', len(vz['obras']) == 5 and all(limpio(o).lower() in teoria_l for o in vz['obras']))
cierto('ficha: cita de Galileo (El Ensayador, 1623) marcada como traducción habitual',
       vz['cita']['autor'] == 'Galileo Galilei' and 'El Ensayador' in vz['cita']['obra'] and '1623' in vz['cita']['obra'] and 'traducción habitual' in vz['cita']['obra']
       and vz['cita']['txt'].lower().replace('.', '') in teoria_l.replace('.', '').replace('»', '').replace('«', ''))
cierto('ficha: frases ≤ 15 palabras y ≤ 3 por bloque', all(len(b['frases']) <= 3 and all(len(limpio(f).split()) <= 15 for f in b['frases']) for b in vz['bloques']))
conecta = limpio(json.dumps(vz['conecta'], ensure_ascii=False))
cierto('ficha: conecta con T4, T6–T7, T9, T10 y T12', all(t in conecta for t in ['(T4)', '(T6–T7)', '(T9)', '(T10)', '(T12)']))
cierto('ficha y teoría usan los mismos términos clave', all(t in teoria_l and t in vz_txt for t in [
    'antropocentrismo', 'humanismo', 'geocentrismo', 'heliocentrismo', 'verdad efectiva', 'virtù', 'fortuna', 'telescopio', 'matemátic', 'experiment']))
cierto('ficha y teoría: 1543, 1610, 1633, 1642 y 1513 coinciden', all(a in vz_txt and a in teoria_l for a in ['1543', '1610', '1633', '1642', '1513']))
cierto('ficha: fechas de autores presentes también en la teoría', all(nombres[n]['f'] in teoria_l for n in nombres))
cierto('ficha: resumen menciona teocentrismo, heliocentrismo, método, Maquiavelo y conocimiento',
       all(t in limpio(' '.join(vz['resumen'])).lower() for t in ['teocentrismo', 'heliocentrismo', 'matemática', 'maquiavelo', 'conocimiento']))
cierto('ficha: 3 mini-tablas de dos columnas', sum(1 for b in vz['bloques'] if 'tabla' in b) == 3 and all(len(b['tabla']['cab']) == 2 for b in vz['bloques'] if 'tabla' in b))
cierto('ficha: la claves incluyen «Verdad efectiva» y «Virtù y fortuna» y «Autonomía de la política»', {'Verdad efectiva', 'Virtù y fortuna', 'Autonomía de la política'} <= {k[0] for k in vz['claves']})

# --- cifras de los ejercicios de cinemática (independientes de la web): s = k·t², k = 2 m/s²
k = 2
s = lambda t: k * t * t
cierto('re28: recorrido total en 3 s = 18 m', s(3) == 18)
cierto('re29: tercer segundo = 18 − 8 = 10 m', s(3) - s(2) == 10)
tr = [s(t + 1) - s(t) for t in range(0, 4)]
cierto('re29/regla de impares: trozos 2, 6, 10, 14 en proporción 1 : 3 : 5 : 7', [Fraction(x, tr[0]) for x in tr] == [1, 3, 5, 7])
cierto('teoría: distancias 1, 4, 9, 16 y trozos 1, 3, 5, 7', [t * t for t in range(1, 5)] == [1, 4, 9, 16] and [(t + 1) ** 2 - t * t for t in range(0, 4)] == [1, 3, 5, 7]
       and '1, 4, 9 y 16' in teoria_l and '1, 3, 5 y 7' in teoria_l)
cierto('re28: distractor 6 m = velocidad constante (2·3), distinto de la respuesta', 2 * 3 == 6 != s(3))


def correcta(id_, campo=0):
    c = EJ[id_]['check']
    c = c[campo] if isinstance(c, list) else c
    return c['opciones'][c['ok']]


cierto('re28/re29: la respuesta marcada coincide con el cálculo', correcta('re28') == f'{s(3)} m' and correcta('re29') == f'{s(3) - s(2)} m')

# --- ejercicios con respuesta de hecho
cierto('re1: Dios', correcta('re1') == 'a Dios')
cierto('re2: humanismo', correcta('re2') == 'Humanismo')
cierto('re3: heliocéntrico', correcta('re3') == 'heliocéntrico')
cierto('re4: 1543', correcta('re4') == str(OBRA_COPERNICO))
cierto('re5: telescopio', correcta('re5') == 'El telescopio')
cierto('re6: geo', 'geo' in EJ['re6']['check']['valores'])
cierto('re7: obra–autor', [correcta('re7', i) for i in range(3)] == ['Maquiavelo', 'Copérnico', 'Galileo'])
cierto('re8: matemáticas y experimentación', correcta('re8').startswith('las matemáticas y la experimentación'))
cierto('re9: Florencia', correcta('re9') == 'Florencia')
cierto('re10: matemático', 'matemático' in EJ['re10']['check']['valores'])
orden = ' → '.join(n for n, _ in sorted([('Maquiavelo', MAQUIAVELO), ('Copérnico', COPERNICO), ('Galileo', GALILEO)], key=lambda x: x[1][0]))
cierto('re11: orden Maquiavelo → Copérnico → Galileo', correcta('re11') == orden and sum(1 for o in EJ['re11']['check']['opciones'] if o == orden) == 1)
cierto('re12: Galileo en 1633', correcta('re12') == 'Galileo' and PROCESO == 1633)
cierto('re13: 1492', correcta('re13') == str(AMERICA))
cierto('re14: 1513', correcta('re14') == str(PRINCIPE_ESCRITO))
vf = {'re15': False, 're16': True, 're17': False, 're18': False, 're19': True, 're20': False, 're21': True}
for kk, esp in vf.items():
    c = EJ[kk]['check']
    cierto(f'{kk}: veredicto {"verdadero" if esp else "falso"}', c[0]['opciones'][c[0]['ok']] == ('Verdadero' if esp else 'Falso'))
    cierto(f'{kk}: la justificación correcta coincide con el veredicto', c[1]['opciones'][c[1]['ok']].lower().startswith('es verdad' if esp else 'es falso'))
    cierto(f'{kk}: justificaciones distintas y solo una es la correcta', len(set(c[1]['opciones'])) == len(c[1]['opciones']) and c[1]['ok'] == 0)
cierto('re22: desafío a Aristóteles y al lugar del ser humano', 'Aristóteles' in correcta('re22') and 'ser humano' in correcta('re22'))
cierto('re23: experimentar = provocar el fenómeno', correcta('re23').startswith('Provoca el fenómeno'))
cierto('re24: virtù = capacidad y habilidad', correcta('re24').startswith('la capacidad y habilidad'))
cierto('re25: fortuna = circunstancias', correcta('re25').startswith('las circunstancias'))
cierto('re26: Copérnico hipótesis, Galileo verdadera', correcta('re26').startswith('Copérnico lo planteó') and 'verdadera' in correcta('re26'))
cierto('re27: hacerse a sí mismo', 'hacerse a sí mismo' in correcta('re27'))
cierto('re30: da la razón al experimento', correcta('re30').startswith('da la razón al experimento'))
cierto('re31–re32: textos con ideas coherentes', 'matemático' in correcta('re31') and 'tal como funciona' in correcta('re32'))
cierto('re33: Maquiavelo frente a Tomás', correcta('re33').startswith('Maquiavelo analiza') and 'Tomás' in correcta('re33'))
cierto('re34: Copérnico murió en 1543 sin condena personal', 'murió en 1543' in correcta('re34').lower() and '1616' in correcta('re34') and COPERNICO[1] == 1543)
cierto('re35: criterio mantener el Estado', correcta('re35').startswith('Su criterio es mantener el Estado'))
cierto('re36: sin autoridad medieval hay que justificar', 'autoridad medieval' in correcta('re36'))
cierto('re37: Pico, Maquiavelo, Galileo', [EJ['re37']['check'][i]['etiqueta'] for i in range(3)] == ['Pico della Mirandola', 'Maquiavelo', 'Galileo']
       and [correcta('re37', i).split(':')[0].split(' ')[0] for i in range(3)] == ['Dignidad', 'La', 'El'])
cierto('re38: virtù, fortuna, razón de Estado', [EJ['re38']['check'][i]['etiqueta'] for i in range(3)] == ['Virtù', 'Fortuna', 'Razón de Estado']
       and [correcta('re38', i) for i in range(3)][0].startswith('Capacidad') and correcta('re38', 1).startswith('Circunstancias') and correcta('re38', 2).startswith('Actuar contra'))
cierto('re39: plano inclinado', correcta('re39').startswith('Medir con un plano inclinado'))
cierto('re40: 1 : 3 : 5 : 7', correcta('re40').endswith('1 : 3 : 5 : 7') and tr == [2, 6, 10, 14])
cierto('re41: única opción anterior a 1564 es 1543', correcta('re41').endswith('(1543)') and OBRA_COPERNICO < GALILEO[0] < MENSAJERO)

# --- actividades
cl = T['datos']['mentalidad']
cierto('clasificar «mentalidad»: 6 rasgos, 3 y 3', len(cl['items']) == 6 and [sum(1 for i in cl['items'] if i['c'] == kk) for kk in (0, 1)] == [3, 3])
esp = {'Dios como centro': 0, 'El ser humano y su dignidad': 1, 'Modelo: la Biblia': 0, 'Modelo: los clásicos': 1, 'Política subordinada': 0, 'Política como técnica': 1}
cierto('clasificar «mentalidad»: cada rasgo en su época', all(esp[next(kk for kk in esp if it['t'].startswith(kk))] == it['c'] for it in cl['items']))
cierto('emparejar «autores»', [tuple(p) for p in T['datos']['autores']['pares']] == [
    ('Copérnico', 'Heliocentrismo'), ('Galileo', 'Libro de la naturaleza'), ('Maquiavelo', 'Verdad efectiva'), ('Pico della Mirandola', 'Dignidad del hombre')])
anios = [int(re.match(r'(\d+)', x['t']).group(1)) for x in T['datos']['camino']['items']]
cierto('orden «camino»: cronológico y coherente con los hitos verificados', anios == sorted(anios) and anios == [CONSTANTINOPLA, AMERICA, OBRA_COPERNICO, MENSAJERO, PROCESO])
q = T['datos']['errores']['preguntas']
cierto('errores: la falsa de Galileo es «inventó el telescopio» y la de la hoguera «fue quemado vivo»',
       q[1]['op'][q[1]['ok']].startswith('Inventó el telescopio') and q[2]['op'][q[2]['ok']].startswith('Fue quemado vivo'))
cierto('errores: la falsa de Copérnico es «fue condenado durante su vida»', q[3]['op'][q[3]['ok']].startswith('Fue condenado por la Inquisición durante su vida'))
cierto('errores: la falsa de Maquiavelo es la cita literal', q[5]['op'][q[5]['ok']].startswith('Escribió literalmente'))
cierto('quiz: q3 es 1543 y q8 Maquiavelo', T['datos']['quiz1']['preguntas'][2]['op'][0] == '1543' and T['datos']['quiz1']['preguntas'][7]['op'][0] == 'Maquiavelo')

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
for kk, d in T['datos'].items():
    for p in d.get('preguntas', []):
        cierto(f'{kk}: una respuesta correcta válida y opciones distintas', 0 <= p['ok'] < len(p['op']) and len(set(p['op'])) == len(p['op']))
    for it in d.get('items', []):
        if 'c' in it:
            cierto(f'{kk}: categoría válida', 0 <= it['c'] < len(d['categorias']))

if fallos:
    print('FALLOS:')
    for f in fallos:
        print(' -', f)
    print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
    sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos')
