#!/usr/bin/env python3
"""
Verificación independiente de Historia de la Filosofía, tema 14 (Nietzsche).
Hechos de referencia escritos aquí (no se comparte código con la web): fechas, orden de autores y obras,
pares de valores de las dos morales, metamorfosis, etapas de la obra.
Comprueba: cronología, ficha de vistazo coherente con la teoría, y que cada ejercicio de opción tenga
una única respuesta correcta que coincida con los hechos.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_historia_fil_t14.py /tmp/ampl.json
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


# años (nacimiento, muerte)
KANT, MARX, NIETZSCHE, ORTEGA, SCHOPENHAUER = (1724, 1804), (1818, 1883), (1844, 1900), (1883, 1955), (1788, 1860)
CATEDRA, DEJA_CATEDRA, COLAPSO = 1869, 1879, 1889
# obras: título -> año (de publicación; las póstumas, de redacción)
OBRAS = {'El nacimiento de la tragedia': 1872, 'Sobre verdad y mentira': 1873, 'Humano, demasiado humano': 1878, 'Aurora': 1881,
         'La gaya ciencia': 1882, 'Así habló Zaratustra': 1883, 'Más allá del bien y del mal': 1886, 'La genealogía de la moral': 1887,
         'El crepúsculo de los ídolos': 1888, 'El anticristo': 1888, 'Ecce homo': 1888}
METAMORFOSIS = [('camello', 'tú debes'), ('león', 'yo quiero'), ('niño', 'sí')]
ORDEN_OBRAS = ['El nacimiento de la tragedia', 'Humano, demasiado humano', 'La gaya ciencia', 'Así habló Zaratustra', 'La genealogía de la moral']

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['historia_fil']['t14']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# --- cronología
cierto('Nietzsche: vive 55 años (nace en octubre, muere en agosto)', NIETZSCHE[1] - NIETZSCHE[0] - 1 == 55)
cierto('catedrático en Basilea con 24 años (nació en octubre de 1844)', CATEDRA - NIETZSCHE[0] - 1 == 24)
cierto('deja la cátedra 10 años después y se derrumba 20 años después de ser catedrático', DEJA_CATEDRA - CATEDRA == 10 and COLAPSO - CATEDRA == 20)
cierto('colapso en Turín a los 44 años y vive 11 años más', COLAPSO - NIETZSCHE[0] - 1 == 44 and NIETZSCHE[1] - COLAPSO == 11)
cierto('todas las obras están dentro de su vida (y de su etapa lúcida, antes de 1889)', all(NIETZSCHE[0] < a < COLAPSO + 1 and a <= 1888 for a in OBRAS.values()))
cierto('orden de las obras de ORDEN_OBRAS por año', [OBRAS[o] for o in ORDEN_OBRAS] == sorted(OBRAS[o] for o in ORDEN_OBRAS) and len(set(OBRAS[o] for o in ORDEN_OBRAS)) == 5)
cierto('orden: Kant, Marx, Nietzsche, Ortega nacen en ese orden', KANT[0] < MARX[0] < NIETZSCHE[0] < ORTEGA[0])
cierto('Schopenhauer nace antes que Nietzsche y muere cuando éste tiene 16 años', SCHOPENHAUER[0] < NIETZSCHE[0] and SCHOPENHAUER[1] - NIETZSCHE[0] == 16)
cierto('Nietzsche es posterior a la muerte de Kant (1804) y coetáneo de Marx', NIETZSCHE[0] > KANT[1] and MARX[0] < NIETZSCHE[0] < MARX[1])

# --- la teoría recoge los hechos
for t in ['1844', '1900', '1869', '1879', '1889', 'röcken', 'basilea', 'turín', 'weimar', '24 años']:
    cierto(f'teoría: {t}', t in teoria_l)
for o, a in OBRAS.items():
    clave = o.lower() if o != 'Sobre verdad y mentira' else 'sobre verdad y mentira'
    cierto(f'teoría: obra «{o}» y su año {a}', clave in teoria_l and str(a) in teoria_l)
cierto('teoría: Así habló Zaratustra 1883–1885', '1883–1885' in teoria_l)
cierto('teoría: La voluntad de poder es póstuma (1901, ampliada en 1906) y la editaron Elisabeth y Peter Gast', all(x in teoria_l for x in ['1901', '1906', 'elisabeth', 'peter gast', 'no la publicó nietzsche']))
cierto('teoría: aforismo 125 (muerte de Dios) y 341 (eterno retorno)', 'aforismo 125' in teoria_l and 'aforismo 341' in teoria_l)
for a, b in METAMORFOSIS:
    cierto(f'teoría: metamorfosis {a} «{b}»', a in teoria_l and b in teoria_l)
cierto('teoría: tres etapas de la obra', all(x in teoria_l for x in ['1.ª · arte y cultura', '2.ª · crítica', '3.ª · madurez']))
cierto('teoría: bueno/malo (señores) y bueno/malvado (esclavos)', 'bueno / malo' in teoria_l and 'bueno / malvado' in teoria_l)
cierto('teoría: conceptos clave', all(t in teoria_l for t in ['apolíneo', 'dionisíaco', 'nihilismo', 'resentimiento', 'genealogía', 'voluntad de poder', 'superhombre', 'eterno retorno', 'perspectivismo', 'amor fati', 'transvaloración', 'último hombre', 'mala conciencia', 'ideal ascético']))
cierto('teoría: nihilismo pasivo y activo', 'nihilismo pasivo' in teoria_l and 'nihilismo activo' in teoria_l)
cierto('teoría: todas las citas están marcadas como traducción habitual o paráfrasis', teoria_l.count('traducción habitual') >= 3 and 'paráfrasis' in teoria_l)
cierto('teoría: comentario resuelto de La gaya ciencia 125', any(n['h'].startswith('10.') and 'aforismo 125' in n['html'] for n in T['nuevas']))
cierto('teoría: el comentario cita a Marx (T13) y Kant (T12)', all(t in limpio(next(n['html'] for n in T['nuevas'] if n['h'].startswith('10.'))) for t in ['Marx (T13)', 'Kant (T12)']))
cierto('teoría: referencias cruzadas a T2, T3, T12, T13, T15, T16', all(t in teoria for t in ['(T13)', '(T15)', '(T12)', '(T3)', '(T2)']) and 'Tema 16' in teoria)
cierto('teoría: 5 secciones originales ampliadas y 6 nuevas (6–11)', len(T['secciones']) == 5 and [n['h'].split('.')[0] for n in T['nuevas']] == ['6', '7', '8', '9', '10', '11'])

# --- ficha de un vistazo
a = vz['autores'][0]
m = re.search(r'(\d+)–(\d+)', a['f'])
cierto('ficha: fechas 1844–1900 y lugares', (int(m.group(1)), int(m.group(2))) == NIETZSCHE and 'Röcken' in a['l'] and 'Basilea' in a['l'] and 'Weimar' in a['l'])
cierto('ficha: 6 bloques y 6–10 palabras clave con definición', len(vz['bloques']) == 6 and 6 <= len(vz['claves']) <= 10 and all(len(k) == 2 and k[1].strip() for k in vz['claves']))
cierto('ficha: obras clave son de Nietzsche y están en la lista de obras', all(any(o.lower().startswith(x.lower()[:20]) for x in OBRAS) for o in vz['obras']) and 'La genealogía de la moral' in vz['obras'])
cierto('ficha: la cita es de Zaratustra, Prólogo, y marcada como traducción habitual', vz['cita']['autor'] == 'Nietzsche' and 'Zaratustra' in vz['cita']['obra'] and 'traducción habitual' in vz['cita']['obra'] and 'superhombre' in vz['cita']['txt'])
cierto('ficha: fechas de la ficha coinciden con la teoría (24 años, 1869, 1889)', all(x in vz_txt for x in ['24 años', '1869', '1889', '1872']))
conecta = limpio(json.dumps(vz['conecta'], ensure_ascii=False))
cierto('ficha: conecta con T2–T3, T12, T13, T15 y T16', all(t in conecta for t in ['(T2–T3)', '(T12)', '(T13)', '(T15)', '(T16)']))
tb = [b['tabla'] for b in vz['bloques'] if 'tabla' in b]
cierto('ficha: dos tablas (apolíneo/dionisíaco y señores/esclavos) con cabeceras correctas', [t['cab'] for t in tb] == [['Apolíneo', 'Dionisíaco'], ['Moral de señores', 'Moral de esclavos']])
filas = ' '.join(' '.join(f) for f in tb[1]['filas']).lower()
cierto('ficha: bueno/malo para señores y bueno/malvado para esclavos', tb[1]['filas'][0] == ['bueno / malo', 'bueno / malvado'] and 'resentimiento' in filas)
cierto('ficha y teoría usan los mismos términos clave', all(t in teoria_l and t in vz_txt for t in ['apolíneo', 'dionisíaco', 'nihilismo', 'superhombre', 'eterno retorno', 'voluntad de poder', 'perspectivismo', 'resentimiento', 'último hombre', 'amor fati']))
cierto('ficha: resumen menciona mundo verdadero, nihilismo, valores y perspectivas', all(t in limpio(' '.join(vz['resumen'])).lower() for t in ['mundo verdadero', 'nihilismo', 'valores', 'interpretación']))
cierto('ficha: claves incluyen los 10 conceptos de la teoría', {k[0] for k in vz['claves']} >= {'Apolíneo', 'Dionisíaco', 'Nihilismo', 'Superhombre', 'Eterno retorno', 'Perspectivismo', 'Voluntad de poder'})


# --- ejercicios con respuesta de hecho
def correcta(id_, campo=0):
    c = EJ[id_]['check']
    c = c[campo] if isinstance(c, list) else c
    return c['opciones'][c['ok']]


cierto('ni1: Röcken', correcta('ni1') == 'Röcken')
cierto('ni2: 24 años', correcta('ni2') == '24 años' and CATEDRA - NIETZSCHE[0] - 1 == 24)
cierto('ni3: El nacimiento de la tragedia es la más antigua', correcta('ni3') == 'El nacimiento de la tragedia' and OBRAS['El nacimiento de la tragedia'] == min(OBRAS[o] for o in ['El nacimiento de la tragedia', 'Así habló Zaratustra', 'La genealogía de la moral', 'La gaya ciencia']))
cierto('ni4: La gaya ciencia', correcta('ni4') == 'La gaya ciencia')
cierto('ni5: Zaratustra', correcta('ni5') == 'Así habló Zaratustra')
cierto('ni6: apolíneo', 'apolíneo' in EJ['ni6']['check']['valores'])
cierto('ni7: apolíneo/dionisíaco', [correcta('ni7', i) for i in range(4)] == ['Apolíneo', 'Dionisíaco', 'Apolíneo', 'Dionisíaco'])
cierto('ni8: moral de esclavos', correcta('ni8') == 'La moral de esclavos')
cierto('ni9: nada', 'nada' in EJ['ni9']['check']['valores'])
cierto('ni10: niño es la tercera metamorfosis', correcta('ni10') == 'El niño' and METAMORFOSIS[2][0] == 'niño')
cierto('ni11: Schopenhauer', correcta('ni11') == 'Schopenhauer' and SCHOPENHAUER[0] < NIETZSCHE[0])
orden = ' → '.join(n for n, _ in sorted([('Kant', KANT), ('Marx', MARX), ('Nietzsche', NIETZSCHE)], key=lambda x: x[1][0]))
cierto('ni12: Kant → Marx → Nietzsche', correcta('ni12') == orden and sum(1 for o in EJ['ni12']['check']['opciones'] if o == orden) == 1)
esp13 = ['Apolíneo y dionisíaco', '«Dios ha muerto»', 'Moral de señores y de esclavos', 'El superhombre']
cierto('ni13: obra–idea', [correcta('ni13', i) for i in range(4)] == esp13)
cierto('ni14: eterno retorno es una prueba, no una promesa', correcta('ni14').startswith('una prueba'))

vf = {'ni15': False, 'ni16': True, 'ni17': False, 'ni18': False, 'ni19': True, 'ni20': False, 'ni21': False}
for k, esperado in vf.items():
    c = EJ[k]['check']
    cierto(f'{k}: veredicto {"verdadero" if esperado else "falso"}', c[0]['opciones'][c[0]['ok']] == ('Verdadero' if esperado else 'Falso'))
    cierto(f'{k}: la justificación correcta es la única que coincide con el veredicto y la razón', c[1]['opciones'][c[1]['ok']].lower().startswith('es verdad' if esperado else 'es falso') and c[1]['ok'] == 0)
    cierto(f'{k}: justificaciones distintas', len(set(c[1]['opciones'])) == len(c[1]['opciones']))
cierto('ni21: La voluntad de poder la editaron en 1901 tras la muerte de Nietzsche (1900)', NIETZSCHE[1] < 1901 and 'póstuma' in correcta('ni21', 1))
cierto('ni22: nihilismo activo crea valores', correcta('ni22').startswith('Destruir los valores muertos'))
cierto('ni23: amor fati', correcta('ni23') == 'Amor fati')
cierto('ni24: uvas verdes', 'uvas' in correcta('ni24'))
cierto('ni25: camello/león/niño', [correcta('ni25', i) for i in range(3)] == ['Camello', 'León', 'Niño'] and [m[1] for m in METAMORFOSIS][:2] == ['tú debes', 'yo quiero'])
cierto('ni26: pares de valores', [correcta('ni26', i) for i in range(2)] == ['Bueno / malo', 'Bueno / malvado'])
cierto('ni27: verdad como construcción del lenguaje', 'lenguaje' in correcta('ni27'))
cierto('ni28: muerte de Dios', 'muerte de Dios' in correcta('ni28'))
cierto('ni29: eterno retorno', correcta('ni29') == 'El eterno retorno')
cierto('ni30: Platón', correcta('ni30') == 'Platón')
cierto('ni31: moral de esclavos', 'esclavos' in correcta('ni31'))
cierto('ni32: Marx condiciones sociales, Nietzsche resentimiento', 'condiciones sociales' in correcta('ni32') and 'resentimiento' in correcta('ni32'))
cierto('ni33: genealogía', 'de dónde vienen los valores' in correcta('ni33'))
cierto('ni34: aún no lo comprenden', 'no comprende' in correcta('ni34'))
cierto('ni35: último hombre', 'último hombre' in correcta('ni35'))
cierto('ni36: superhombre desearía repetir', 'repitiera' in correcta('ni36'))
cierto('ni37: un único mundo', 'único mundo' in correcta('ni37'))
esp38 = ['Inventa un mundo verdadero para despreciar este', 'Nace del resentimiento de los débiles', 'Cree sin pruebas que la verdad vale más que nada', 'Es platonismo para el pueblo']
cierto('ni38: ámbitos y críticas', [correcta('ni38', i) for i in range(4)] == esp38 and [c['etiqueta'] for c in EJ['ni38']['check']] == ['Metafísica', 'Moral tradicional', 'Ciencia', 'Cristianismo'])
cierto('ni39: Schopenhauer niega la voluntad, Nietzsche la afirma', 'afirmar la vida' in correcta('ni39'))

# --- actividades
cl = T['datos']['apodio']
cierto('clasificar «apodio»: 5 apolíneos y 5 dionisíacos con categorías correctas',
       cl['categorias'] == ['Apolíneo', 'Dionisíaco'] and [sum(1 for i in cl['items'] if i['c'] == k) for k in (0, 1)] == [5, 5]
       and {i['t'] for i in cl['items'] if i['c'] == 1} >= {'Música y danza', 'Embriaguez', 'Instinto y desmesura'}
       and {i['t'] for i in cl['items'] if i['c'] == 0} >= {'Escultura', 'Medida y orden', 'Forma clara y límites'})
cl = T['datos']['morales']
cierto('clasificar «morales»: 5 y 5, «malvado» y «resentimiento» son de esclavos, «noble» de señores',
       [sum(1 for i in cl['items'] if i['c'] == k) for k in (0, 1)] == [5, 5]
       and all(i['c'] == 1 for i in cl['items'] if i['t'].startswith(('Malvado', 'Resentimiento', 'Humildad', 'Resignación')))
       and all(i['c'] == 0 for i in cl['items'] if i['t'].startswith(('Orgullo', 'Bueno = noble', 'Fuerza', 'Valentía', 'Afirmación'))))
mt = [limpio(x['t']).split(':')[0].lower() for x in T['datos']['metamorfosis']['items']]
cierto('orden «metamorfosis»: camello, león, niño', mt == [a for a, _ in METAMORFOSIS])
cr = [x['t'] for x in T['datos']['cronologia']['items']]
anios = [int(re.search(r'\((\d{4})', t).group(1)) for t in cr]
cierto('orden «cronología»: las 5 obras en orden de fecha y con sus años verificados',
       anios == sorted(anios) and len(set(anios)) == 5 and [t.split(' (')[0] for t in cr] == ORDEN_OBRAS and all(OBRAS[t.split(' (')[0]] == y for t, y in zip(cr, anios)))
cierto('emparejar «obras»: 5 pares distintos y bien atribuidos', len(T['datos']['obras']['pares']) == 5 and len({p[0] for p in T['datos']['obras']['pares']}) == 5
       and ['El nacimiento de la tragedia', 'Apolíneo y dionisíaco'] in T['datos']['obras']['pares'] and ['La gaya ciencia', '«Dios ha muerto»'] in T['datos']['obras']['pares'])
q = T['datos']['errores']['preguntas'][5]
cierto('errores q6: «Nietzsche es anterior a Kant» es la falsa', q['op'][q['ok']] == 'Nietzsche es anterior a Kant' and not (NIETZSCHE[0] < KANT[0]) and KANT[0] == 1724 and MARX[0] == 1818 and NIETZSCHE[1] == 1900)
q = T['datos']['errores']['preguntas'][6]
cierto('errores q7: el eterno retorno no promete premio', q['op'][q['ok']].startswith('Es una promesa de premio'))
q = T['datos']['errores']['preguntas'][7]
cierto('errores q8: La voluntad de poder es póstuma', q['op'][q['ok']].startswith('La publicó el propio Nietzsche') and 'tras su muerte' in q['op'][1])

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
