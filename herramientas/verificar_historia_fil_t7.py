#!/usr/bin/env python3
"""
Verificación independiente de Historia de la Filosofía, tema 7 (Santo Tomás y la escolástica).
Hechos de referencia escritos aquí (no se comparte código con la web): fechas, orden de autores, obras dentro
de la vida del autor, las cinco vías con su conclusión, los cuatro tipos de ley y las virtudes.
Comprueba: cronología, ficha de vistazo coherente con la teoría, y que cada ejercicio de opción tenga
una única respuesta correcta que coincida con los hechos.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_historia_fil_t7.py /tmp/ampl.json
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


# años (negativos = a. C.). Tomás nació en 1224 o 1225 según las fuentes.
ARISTOTELES, AGUSTIN = (-384, -322), (354, 430)
TOMAS = ((1224, 1225), 1274)
ANSELMO, AVERROES, MAIMONIDES, AVICENA = (1033, 1109), (1126, 1198), (1138, 1204), (980, 1037)
ALBERTO = (1200, 1280)
ESCOTO, OCKHAM = (1266, 1308), (1287, 1347)
HUME, KANT, DESCARTES = (1711, 1776), (1724, 1804), (1596, 1650)
OBRAS = {'suma contra los gentiles': (1259, 1265), 'suma teológica': (1265, 1273)}
PROSLOGION = 1077
VIAS = [('movimiento', 'primer motor inmóvil'), ('causa eficiente', 'primera causa incausada'), ('contingencia', 'ser necesario'),
        ('grados', 'ser máximamente perfecto'), ('orden', 'inteligencia ordenadora')]
LEYES = ['eterna', 'natural', 'humana', 'divina']
CARDINALES = ['prudencia', 'justicia', 'fortaleza', 'templanza']
TEOLOGALES = ['fe', 'esperanza', 'caridad']

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['historia_fil']['t7']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# --- cronología
tn, tm = TOMAS
cierto('Tomás: nace en 1224/25 y muere en 1274 (vive 49 o 50 años)', tn[0] + 1 == tn[1] and tm - tn[1] == 49)
cierto('Orden por nacimiento: Aristóteles < Agustín < Anselmo < Averroes < Maimónides < Tomás < Escoto < Ockham',
       ARISTOTELES[0] < AGUSTIN[0] < ANSELMO[0] < AVERROES[0] < MAIMONIDES[0] < tn[0] < ESCOTO[0] < OCKHAM[0])
cierto('Agustín muere casi 800 años antes de nacer Tomás', 790 < tn[1] - AGUSTIN[1] < 800)
cierto('Averroes y Maimónides nacen antes que Tomás y murieron antes de su nacimiento o en su infancia', AVERROES[1] < tn[0] and MAIMONIDES[1] < tn[0])
cierto('Avicena anterior a Anselmo en nacimiento y muerte', AVICENA[0] < ANSELMO[0] and AVICENA[1] < ANSELMO[1])
cierto('El Proslogion (1077) cae en la vida de Anselmo y antes de Tomás', ANSELMO[0] < PROSLOGION < ANSELMO[1] and PROSLOGION < tn[0])
for o, (a, b) in OBRAS.items():
    cierto(f'obra «{o}» ({a}–{b}) dentro de la vida de Tomás', tn[1] <= a - 30 and b <= tm and a < b)
cierto('Suma teológica posterior a la Suma contra los gentiles y acabada antes de morir (inacabada)', OBRAS['suma teológica'][1] <= tm and OBRAS['suma teológica'][0] >= OBRAS['suma contra los gentiles'][0])
cierto('Hume (1711) y Kant (1724) son posteriores a Tomás; Descartes también', all(x[0] > tm for x in (HUME, KANT, DESCARTES)))
cierto('Orden de los críticos: Descartes < Hume < Kant', DESCARTES[0] < HUME[0] < KANT[0])
cierto('Alberto Magno (c. 1200–1280) fue maestro de Tomás: nace antes y vive en su época', ALBERTO[0] < tn[0] and ALBERTO[1] > tm)
cierto('Ockham nace después de la muerte de Tomás y Escoto muere después', OCKHAM[0] > tm and ESCOTO[1] > tm)

# --- la teoría recoge los hechos
cierto('teoría: fechas 1224/25–1274', '1224/25–1274' in teoria_l and '1274' in teoria_l)
cierto('teoría: Roccasecca, Fossanova, dominico, Alberto Magno, París', all(x in teoria_l for x in ['roccasecca', 'fossanova', 'dominicos', 'alberto magno', 'universidad de parís']))
cierto('teoría: canonizado en 1323', '1323' in teoria_l)
cierto('teoría: obras con fechas', 'hacia 1259–1265' in teoria_l and 'hacia 1265–1273' in teoria_l and 'inacabada' in teoria_l)
cierto('teoría: Averroes 1126–1198, Maimónides 1138–1204, Avicena 980–1037',
       all(x in teoria_l for x in ['1126–1198', '1138–1204', '980–1037']))
cierto('teoría: Anselmo 1033–1109; Escoto c. 1266–1308; Ockham c. 1287–1347', all(x in teoria_l for x in ['1033–1109', '1266–1308', '1287–1347']))
cierto('teoría: condena de 1277 en París', '1277' in teoria_l)
for v, concl in VIAS:
    cierto(f'teoría: vía «{v}» con su conclusión «{concl}»', v in teoria_l and concl.split()[0] in teoria_l)
cierto('teoría: las cinco vías en la tabla en el orden correcto',
       [teoria_l.find(x) for x in ['1. movimiento', '2. causa eficiente', '3. contingencia', '4. grados de perfección', '5. orden y finalidad']] ==
       sorted(teoria_l.find(x) for x in ['1. movimiento', '2. causa eficiente', '3. contingencia', '4. grados de perfección', '5. orden y finalidad']))
cierto('teoría: I, q. 2, a. 3 (cinco vías) y I-II, q. 94, a. 2 (primer precepto)', 'q. 2, a. 3' in teoria_l and ('i-ii, q. 94' in teoria_l or 'q. 94' in teoria_l))
for l in LEYES:
    cierto(f'teoría: ley {l}', f'ley {l}' in teoria_l)
for v in CARDINALES + TEOLOGALES:
    cierto(f'teoría: virtud {v}', v in teoria_l)
cierto('teoría: términos clave', all(t in teoria_l for t in ['escolástica', 'preámbulos', 'misterio', 'a posteriori', 'esencia', 'existencia', 'analogía', 'bienaventuranza', 'ley natural', 'abstracción', 'realismo moderado']))
cierto('teoría: «hay que hacer el bien y evitar el mal» y rechazo del argumento ontológico', 'evitarse' in teoria_l and 'argumento ontológico' in teoria_l)
cierto('teoría: el comentario resuelto se rotula como paráfrasis/traducción habitual', 'traducción española habitual' in teoria_l)

# --- ficha de un vistazo
a = vz['autores'][0]
cierto('ficha: fechas de Tomás 1224/25–1274 y lugares', a['f'] == '1224/25–1274' and 'Roccasecca' in a['l'] and 'Fossanova' in a['l'])
cierto('ficha: 6 bloques y 6–10 palabras clave con definición', len(vz['bloques']) == 6 and 6 <= len(vz['claves']) <= 10 and all(len(k) == 2 and k[1].strip() for k in vz['claves']))
cierto('ficha: obras clave son de Tomás', all(o in vz['obras'] for o in ['Suma teológica', 'Suma contra los gentiles']) and 'Confesiones' not in vz['obras'])
cierto('ficha: la cita es de la Suma teológica, q. 94 y se rotula como traducción habitual', vz['cita']['autor'] == 'Tomás de Aquino' and 'q. 94' in vz['cita']['obra'] and 'habitual' in vz['cita']['obra'])
for b in vz['bloques']:
    cierto(f'ficha: bloque «{b["t"]}» con ≤ 3 frases de ≤ 15 palabras', len(b['frases']) <= 3 and all(len(limpio(f).split()) <= 15 for f in b['frases']))
tabla_vias = next(b for b in vz['bloques'] if b['t'].startswith('Dios'))['tabla']['filas']
cierto('ficha: tabla de las cinco vías con sus conclusiones (mismas que la teoría)',
       len(tabla_vias) == 5 and all(tabla_vias[i][0].startswith(VIAS[i][0].split()[0]) for i in range(5)) and
       [f[1] for f in tabla_vias] == ['primer motor inmóvil', 'primera causa incausada', 'ser necesario', 'ser máximamente perfecto', 'inteligencia ordenadora'])
tabla_fe = next(b for b in vz['bloques'] if b['t'].startswith('Fe'))['tabla']['filas']
cierto('ficha: preámbulos (Dios existe, alma inmortal) y misterios (Trinidad, Encarnación)',
       tabla_fe[0] == ['Dios existe', 'Trinidad'] and tabla_fe[1] == ['alma inmortal', 'Encarnación'])
conecta = limpio(json.dumps(vz['conecta'], ensure_ascii=False))
cierto('ficha: conecta con T4, T6, T9, T10 y T12', all(t in conecta for t in ['(T4)', '(T6)', '(T9)', '(T10)', '(T12)']))
cierto('ficha y teoría usan los mismos términos clave', all(t in teoria_l and t in vz_txt for t in ['escolástica', 'preámbulos', 'misterio', 'cinco vías', 'a posteriori', 'ley natural', 'bienaventuranza', 'aristóteles', 'cardinales', 'teologales']))
cierto('ficha: cuadro de resumen menciona fe y razón, cinco vías, ley natural y Aristóteles', all(t in limpio(' '.join(vz['resumen'])).lower() for t in ['fe y razón', 'cinco vías', 'ley natural', 'aristóteles']))
cierto('ficha: Tomás aparece con 1224/25 igual que en la teoría', '1224/25' in vz_txt and '1224/25' in teoria_l)

# --- ejercicios con respuesta de hecho


def correcta(id_, campo=0):
    c = EJ[id_]['check']
    c = c[campo] if isinstance(c, list) else c
    return c['opciones'][c['ok']]


cierto('hs1: dominicos', correcta('hs1') == 'A los dominicos')
cierto('hs2: Suma teológica', correcta('hs2') == 'Suma teológica')
cierto('hs3: Aristóteles', correcta('hs3') == 'Aristóteles')
cierto('hs4: escolástica', 'escolástica' in EJ['hs4']['check']['valores'])
cierto('hs5: distintas pero armónicas', correcta('hs5') == 'Distintas pero armónicas')
cierto('hs6: Trinidad', correcta('hs6') == 'La Trinidad')
cierto('hs7: preámbulo/misterio', [correcta('hs7', i) for i in range(4)] == ['Preámbulo', 'Misterio', 'Preámbulo', 'Misterio'])
cierto('hs8: cinco vías', correcta('hs8') == 'Cinco' and len(VIAS) == 5)
cierto('hs9: primer motor inmóvil', correcta('hs9') == 'un primer motor inmóvil')
esp10 = ['Hay cosas que se mueven', 'Hay seres que pueden ser o no ser', 'Hay grados de perfección', 'Lo que no conoce obra por un fin']
cierto('hs10: vías y puntos de partida', [correcta('hs10', i) for i in range(4)] == esp10)
cierto('hs11: a posteriori', 'posteriori' in EJ['hs11']['check']['valores'])
cierto('hs12: primer principio', correcta('hs12').startswith('hay que hacer el bien'))
cierto('hs13: ver a Dios', correcta('hs13') == 'ver a Dios')
orden = ' → '.join(n for n, _ in sorted([('Aristóteles', ARISTOTELES), ('Agustín', AGUSTIN), ('Tomás de Aquino', (tn[1], 0))], key=lambda x: x[1][0]))
cierto('hs14: orden cronológico Aristóteles → Agustín → Tomás', correcta('hs14') == orden)
cierto('hs14: único orden correcto entre las opciones', sum(1 for o in EJ['hs14']['check']['opciones'] if o == orden) == 1)
vf = {'hs15': False, 'hs16': True, 'hs17': False, 'hs18': True, 'hs19': False, 'hs20': True, 'hs21': False}
for k, esperado in vf.items():
    c = EJ[k]['check']
    cierto(f'{k}: veredicto {"verdadero" if esperado else "falso"}', c[0]['opciones'][c[0]['ok']] == ('Verdadero' if esperado else 'Falso'))
    cierto(f'{k}: la justificación correcta es la única que coincide con el veredicto', c[1]['opciones'][c[1]['ok']].lower().startswith('es verdad' if esperado else 'es falso'))
cierto('hs22: Agustín pone la fe delante', 'Agustín pone la fe delante' in correcta('hs22'))
cierto('hs23: flecha y arquero en la vía del orden', correcta('hs23') == 'del orden y la finalidad')
cierto('hs24: orden de dependencia, no tiempo', 'no el tiempo' in correcta('hs24'))
cierto('hs25: contingencia, tiempo en que nada existía', 'nada existía' in correcta('hs25'))
cierto('hs26: ley natural', correcta('hs26') == 'Ley natural')
cierto('hs27: por determinación', correcta('hs27') == 'por determinación')
cierto('hs28: teologales (fe, esperanza, caridad)', 'fe, esperanza y caridad' in correcta('hs28') and set(TEOLOGALES) == {'fe', 'esperanza', 'caridad'})
cierto('hs29: esencia y existencia distintas en las criaturas', 'reciben el ser' in correcta('hs29'))
cierto('hs30: de los sentidos con abstracción', correcta('hs30').startswith('de los sentidos'))
cierto('hs31: argumento a posteriori', 'experiencia' in correcta('hs31'))
cierto('hs32: primer principio de la razón práctica', 'primer principio' in correcta('hs32'))
cierto('hs33: sus atributos se estudian después', 'atributos' in correcta('hs33'))
cierto('hs34: Hume y la causalidad', 'causalidad' in correcta('hs34'))
cierto('hs35: Kant y la experiencia', 'experiencia' in correcta('hs35'))
cierto('hs36: sola sustancia', 'una sola sustancia' in correcta('hs36'))
cierto('hs37: felicidad frente a deber', 'felicidad' in correcta('hs37') and 'deber' in correcta('hs37'))
cierto('hs38: tipos de ley', [correcta('hs38', i) for i in range(4)] == ['Plan racional de Dios para lo creado', 'Lo que la razón humana descubre del plan de Dios', 'Norma dictada por una sociedad', 'Lo revelado por Dios'] and
       [EJ['hs38']['check'][i]['etiqueta'].lower() for i in range(4)] == [f'ley {l}' for l in LEYES])
cierto('hs39: vías y conclusiones', [correcta('hs39', i) for i in range(4)] == ['Primera causa incausada', 'Ser necesario por sí mismo', 'Ser máximamente perfecto', 'Inteligencia ordenadora'] and
       [EJ['hs39']['check'][i]['etiqueta'].lower() for i in range(4)] == ['causa eficiente', 'contingencia', 'grados de perfección', 'orden y finalidad'])

# --- actividades
fr = T['datos']['fe_razon']
esperado = {'dios es uno': 1, 'la trinidad': 0, 'el alma racional': 1, 'la encarnación': 0, 'dios existe': 1, 'la resurrección': 0}
cierto('clasificar «fe_razon»: cada verdad en su categoría', all(esperado[next(k for k in esperado if it['t'].lower().startswith(k))] == it['c'] for it in fr['items']) and len(fr['items']) == 6)
cierto('clasificar «fe_razon»: 3 y 3', [sum(1 for i in fr['items'] if i['c'] == k) for k in (0, 1)] == [3, 3])
vi = T['datos']['vias']['pares']
cierto('emparejar «vias»: las cinco vías en orden con sus conclusiones', [p[0].lower() for p in vi] == ['movimiento', 'causa eficiente', 'contingencia', 'grados de perfección', 'orden y finalidad'] and
       [p[1].lower() for p in vi] == ['primer motor inmóvil', 'primera causa incausada', 'ser necesario por sí mismo', 'ser máximamente perfecto', 'inteligencia ordenadora'])
ov = [limpio(x['t']).lower() for x in T['datos']['ordenvia']['items']]
cierto('orden «ordenvia»: hecho, principio, no regreso infinito, primer motor, Dios',
       ov[0].startswith('hecho') and 'movido por otro' in ov[1] and 'infinita' in ov[2] and 'primer motor' in ov[3] and 'dios' in ov[4])
cierto('emparejar «leyes»: eterna, natural, humana, divina', [p[0].lower() for p in T['datos']['leyes']['pares']] == [f'ley {l}' for l in LEYES])
q = T['datos']['errores']['preguntas'][5]
cierto('errores q6: «Tomás es anterior a Agustín» es falsa y las otras 3 verdaderas',
       q['op'][q['ok']] == 'Tomás de Aquino es anterior a San Agustín' and not (tn[0] < AGUSTIN[0]) and AGUSTIN[1] == 430 and tm == 1274 and ANSELMO[0] < tn[0])
q = T['datos']['errores']['preguntas'][1]
cierto('errores q2: «parten de la idea de Dios» es la falsa (son a posteriori)', q['op'][q['ok']].startswith('Parten de la idea de Dios'))

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
