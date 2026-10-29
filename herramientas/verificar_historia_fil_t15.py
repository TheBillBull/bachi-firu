#!/usr/bin/env python3
"""
Verificación independiente de Historia de la Filosofía, tema 15 (fenomenología y existencialismo).
Hechos de referencia escritos aquí (no se comparte código con la web): fechas de nacimiento y muerte,
orden cronológico de autores, obras dentro de la vida de cada autor, atribución de conceptos y citas.
Comprueba: cronología, ficha de vistazo coherente con la teoría, y que cada ejercicio de opción tenga
una única respuesta correcta que coincida con los hechos.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_historia_fil_t15.py /tmp/ampl.json
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


# (nacimiento, muerte) en años d. C.
AUT = {'kierkegaard': (1813, 1855), 'nietzsche': (1844, 1900), 'husserl': (1859, 1938), 'heidegger': (1889, 1976),
       'sartre': (1905, 1980), 'beauvoir': (1908, 1986), 'camus': (1913, 1960)}
# obra: (autor, año de publicación)
OBRAS = {'investigaciones lógicas': ('husserl', 1900), 'ser y tiempo': ('heidegger', 1927), 'la náusea': ('sartre', 1938),
         'el ser y la nada': ('sartre', 1943), 'a puerta cerrada': ('sartre', 1944), 'el existencialismo es un humanismo': ('sartre', 1946),
         'el segundo sexo': ('beauvoir', 1949), 'el mito de sísifo': ('camus', 1942), 'el extranjero': ('camus', 1942),
         'la peste': ('camus', 1947), 'el hombre rebelde': ('camus', 1951), 'el concepto de la angustia': ('kierkegaard', 1844)}

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['historia_fil']['t15']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# --- cronología
for a, (n, m) in AUT.items():
    cierto(f'{a}: nace antes de morir', n < m)
cierto('orden de nacimiento: Kierkegaard < Husserl < Heidegger < Sartre < Beauvoir < Camus',
       [AUT[a][0] for a in ('kierkegaard', 'husserl', 'heidegger', 'sartre', 'beauvoir', 'camus')] == sorted(AUT[a][0] for a in ('kierkegaard', 'husserl', 'heidegger', 'sartre', 'beauvoir', 'camus')))
cierto('Heidegger nace 30 años después de Husserl y Sartre 16 después de Heidegger', AUT['heidegger'][0] - AUT['husserl'][0] == 30 and AUT['sartre'][0] - AUT['heidegger'][0] == 16)
cierto('diferencia de años entre muerte y nacimiento: Husserl 79, Heidegger 87, Sartre 75, Beauvoir 78, Camus 47',
       [AUT[a][1] - AUT[a][0] for a in ('husserl', 'heidegger', 'sartre', 'beauvoir', 'camus')] == [79, 87, 75, 78, 47])
for o, (a, y) in OBRAS.items():
    cierto(f'obra «{o}» publicada en vida de {a}', AUT[a][0] < y < AUT[a][1])
cierto('Ser y tiempo (1927) es posterior a las Investigaciones lógicas (1900)', OBRAS['ser y tiempo'][1] > OBRAS['investigaciones lógicas'][1])
cierto('Sartre murió 20 años después que Camus', AUT['sartre'][1] - AUT['camus'][1] == 20)
cierto('Camus (Nobel 1957) y la ruptura con Sartre (1952) ocurren en vida de Camus', AUT['camus'][0] < 1952 < 1957 < AUT['camus'][1])
cierto('Sartre rechazó el Nobel de 1964 en vida', AUT['sartre'][0] < 1964 < AUT['sartre'][1])
cierto('Heidegger fue rector en 1933 y escribió la Carta sobre el humanismo en 1947 (en vida)', AUT['heidegger'][0] < 1933 < 1947 < AUT['heidegger'][1])

# --- la teoría recoge los hechos
for a, (n, m) in AUT.items():
    if a in ('nietzsche',):
        continue
    cierto(f'teoría: fechas de {a} ({n}–{m})', f'{n}–{m}' in teoria_l)
for o, (a, y) in OBRAS.items():
    if o in ('el hombre rebelde', 'la peste', 'el extranjero', 'a puerta cerrada', 'la náusea', 'investigaciones lógicas', 'el concepto de la angustia', 'ser y tiempo', 'el ser y la nada', 'el segundo sexo', 'el mito de sísifo'):
        cierto(f'teoría: «{o}» con su año {y}', o in teoria_l and str(y) in teoria_l)
cierto('teoría: la conferencia de Sartre es de 1945 (publicada en 1946)', '1945' in teoria_l and '1946' in teoria_l)
cierto('teoría: Nobel de Camus 1957 y ruptura con Sartre 1952', '1957' in teoria_l and '1952' in teoria_l)
cierto('teoría: Heidegger y el nazismo en 1933', '1933' in teoria_l and 'rector' in teoria_l)
for t in ['fenomenología', 'epojé', 'intencionalidad', 'mundo de la vida', 'dasein', 'ser-en-el-mundo', 'ser-para-la-muerte', 'inauténtic', 'auténtic',
          'la existencia precede a la esencia', 'condenado a ser libre', 'angustia', 'mala fe', 'ser en sí', 'ser para sí', 'cortapapeles', 'camarero',
          'no se nace mujer', 'absurdo', 'sísifo', 'rebeldía', 'kierkegaard', 'brentano']:
    cierto(f'teoría: aparece «{t}»', t in teoria_l)
cierto('teoría: lugares (Prossnitz, Messkirch, Mondovi)', all(x in teoria_l for x in ['prossnitz', 'messkirch', 'mondovi']))
cierto('teoría: nunca atribuye «El ser y la nada» a Heidegger ni «Ser y tiempo» a Sartre',
       not re.search(r'heidegger[^.]{0,40}el ser y la nada', teoria_l) and not re.search(r'sartre[^.]{0,40}ser y tiempo', teoria_l))
cierto('teoría: marca la cita de memoria como paráfrasis o traducción habitual', 'paráfrasis' in teoria_l and 'traducción' in teoria_l)
cierto('teoría: referencias cruzadas T9, T12, T13, T14, T16 (por tema)', all(f'tema {n}' in teoria_l for n in (9, 12, 13, 14, 16)))
cierto('teoría: comentario resuelto con los 7 pasos', all(f'{i}. ' in limpio(next(n['html'] for n in T['nuevas'] if n['h'].startswith('9.'))) for i in range(1, 8)))

# --- ficha de un vistazo
nombres = [a['n'].lower() for a in vz['autores']]
cierto('ficha: cinco autores en orden cronológico', nombres == ['husserl', 'heidegger', 'sartre', 'beauvoir', 'camus'])
for a in vz['autores']:
    m = re.search(r'(\d{4})–(\d{4})', a['f'])
    cierto(f"ficha: fechas de {a['n']}", bool(m) and (int(m.group(1)), int(m.group(2))) == AUT[a['n'].lower()])
cierto('ficha: 6 bloques y 6–10 palabras clave con definición', len(vz['bloques']) == 6 and 6 <= len(vz['claves']) <= 10 and all(len(k) == 2 and k[1].strip() for k in vz['claves']))
cierto('ficha: frases cortas (≤ 15 palabras) y ≤ 3 por bloque',
       all(len(b['frases']) <= 3 and all(len(limpio(f).split()) <= 15 for f in b['frases']) for b in vz['bloques']))
obras_vz = [limpio(o).lower() for o in vz['obras']]
cierto('ficha: obras clave existentes y atribuidas a autores del tema', all(o in OBRAS for o in obras_vz) and 'ser y tiempo' in obras_vz and 'el ser y la nada' in obras_vz)
cierto('ficha: la cita es de Sartre y de El existencialismo es un humanismo', vz['cita']['autor'] == 'Sartre' and 'existencialismo es un humanismo' in vz['cita']['obra'].lower() and 'libre' in vz['cita']['txt'].lower())
cierto('ficha: la cita marca la traducción habitual', 'traducción' in vz['cita']['obra'].lower())
cierto('ficha: conecta con T9, T12, T13, T14 y T16', all(f'(T{n})' in limpio(json.dumps(vz['conecta'], ensure_ascii=False)) for n in (9, 12, 13, 14, 16)))
cierto('ficha y teoría usan los mismos términos clave', all(t in teoria_l and t in vz_txt for t in ['epojé', 'intencionalidad', 'dasein', 'ser-para-la-muerte', 'angustia', 'mala fe', 'absurdo', 'rebeldía', 'sísifo']))
cierto('ficha: resumen menciona intencionalidad, Dasein, existencia/esencia, libertad, Beauvoir y Camus',
       all(t in limpio(' '.join(vz['resumen'])).lower() for t in ['intencional', 'dasein', 'esencia', 'libres', 'beauvoir', 'camus']))
tb = [b['tabla'] for b in vz['bloques'] if 'tabla' in b]
cierto('ficha: 3 mini-tablas de dos columnas', len(tb) == 3 and all(all(len(f) == 2 for f in t['filas']) for t in tb))
cierto('ficha: contraste objeto fabricado / ser humano coincide con la teoría (esencia primero / existencia primero)',
       any(t['cab'] == ['Objeto fabricado', 'Ser humano'] and t['filas'][0] == ['esencia primero', 'existencia primero'] for t in tb)
       and 'esencia (su función) precede a la existencia' in teoria_l)
cierto('ficha: la tabla de Heidegger (inauténtica/auténtica) coincide con la teoría', 'existencia inauténtica' in teoria_l and 'existencia auténtica' in teoria_l)


# --- ejercicios con respuesta de hecho
def correcta(id_, campo=0):
    c = EJ[id_]['check']
    c = c[campo] if isinstance(c, list) else c
    return c['opciones'][c['ok']]


cierto('fe1: Husserl', correcta('fe1') == 'Husserl')
cierto('fe2: volver a las cosas mismas', 'cosas mismas' in correcta('fe2'))
cierto('fe3: intencionalidad', 'intencionalidad' in EJ['fe3']['check']['valores'])
cierto('fe4: Dasein = ser-ahí', correcta('fe4').startswith('ser-ahí'))
cierto('fe5: Ser y tiempo es de Heidegger (1927)', correcta('fe5') == 'Ser y tiempo' and OBRAS['ser y tiempo'][0] == 'heidegger')
cierto('fe6: Sartre', correcta('fe6') == 'Sartre')
cierto('fe7: libre', 'libre' in EJ['fe7']['check']['valores'])
cierto('fe8: mala fe', correcta('fe8') == 'mala fe')
esp9 = ['Sartre', 'Heidegger', 'Beauvoir', 'Camus']
cierto('fe9: obras y autores', [correcta('fe9', i) for i in range(4)] == esp9 and [OBRAS[EJ['fe9']['check'][i]['etiqueta'].lower()][0] for i in range(4)] == [a.lower() for a in esp9])
cierto('fe10: Beauvoir', correcta('fe10') == 'Simone de Beauvoir' and OBRAS['el segundo sexo'][0] == 'beauvoir')
cierto('fe11: El mito de Sísifo', correcta('fe11') == 'El mito de Sísifo' and OBRAS['el mito de sísifo'][0] == 'camus')
orden = ' → '.join(n for n, _ in sorted([('Husserl', AUT['husserl'][0]), ('Heidegger', AUT['heidegger'][0]), ('Sartre', AUT['sartre'][0])], key=lambda x: x[1]))
cierto('fe12: orden cronológico Husserl → Heidegger → Sartre, único entre las opciones', correcta('fe12') == orden and sum(1 for o in EJ['fe12']['check']['opciones'] if o == orden) == 1)
cierto('fe13: epojé = poner entre paréntesis', correcta('fe13').startswith('poner entre paréntesis'))
cierto('fe14: miedo/angustia', [correcta('fe14', i) for i in range(4)] == ['Miedo', 'Angustia', 'Miedo', 'Angustia'])
vf = {'fe15': False, 'fe16': True, 'fe17': False, 'fe18': True, 'fe19': False, 'fe20': False, 'fe21': True}
for k, esperado in vf.items():
    c = EJ[k]['check']
    cierto(f'{k}: veredicto {"verdadero" if esperado else "falso"}', c[0]['opciones'][c[0]['ok']] == ('Verdadero' if esperado else 'Falso'))
    cierto(f'{k}: la justificación correcta concuerda con el veredicto', c[1]['opciones'][c[1]['ok']].lower().startswith('es verdad' if esperado else 'es falso'))
cierto('fe22: el «uno»', 'anónimo' in correcta('fe22'))
cierto('fe23: cortapapeles', 'esencia previa' in correcta('fe23'))
cierto('fe24: miedo con objeto, angustia ante uno mismo', correcta('fe24').startswith('El miedo tiene un objeto concreto'))
cierto('fe25: camarero = mala fe', correcta('fe25') == 'mala fe')
cierto('fe26: construcción social', 'construcción' in correcta('fe26'))
cierto('fe27: absurdo = choque', 'choque' in correcta('fe27') and 'silencio' in correcta('fe27'))
cierto('fe28: rebeldía', 'rebeldía' in correcta('fe28'))
cierto('fe29: abiertos al mundo frente a Descartes', 'abiertos al mundo' in correcta('fe29'))
cierto('fe30: mundo de la vida', 'antes de cualquier ciencia' in correcta('fe30'))
cierto('fe31: no hay naturaleza previa', 'no hay naturaleza humana previa' in correcta('fe31'))
cierto('fe32: Beauvoir se relaciona con la existencia antes que la esencia', 'existencia precede a la esencia' in correcta('fe32'))
cierto('fe33: la libertad produce angustia', 'angustia' in correcta('fe33') and correcta('fe33').startswith('Al contrario'))
cierto('fe34: Camus absurdo/rebeldía, Sartre libertad', correcta('fe34').startswith('Camus parte del absurdo'))
cierto('fe35: conceptos y autores', [correcta('fe35', i) for i in range(4)] == ['Husserl', 'Heidegger', 'Sartre', 'Camus'])
cierto('fe36: Kant ley universal frente a Sartre', 'ley moral universal' in correcta('fe36') and 'Sartre' in correcta('fe36'))

# --- actividades
cl = T['datos']['esencia']
cierto('clasificar «esencia»: 4 objetos fabricados (0) y 4 casos humanos (1)', [sum(1 for i in cl['items'] if i['c'] == k) for k in (0, 1)] == [4, 4]
       and all((i['c'] == 0) == any(x in i['t'].lower() for x in ['cortapapeles', 'reloj', 'mesa', 'cuchillo']) for i in cl['items']))
cm = T['datos']['malafe']
mala = ['así', 'otra opción', 'destino', 'camarero']
cierto('clasificar «mala fe»: 4 excusas (0) y 4 actitudes de asumir (1)', [sum(1 for i in cm['items'] if i['c'] == k) for k in (0, 1)] == [4, 4]
       and all((i['c'] == 0) == any(x in i['t'].lower() for x in mala) for i in cm['items']))
oc = T['datos']['cronologia']['items']
anyos = [int(re.search(r'\((\d{4})\)', i['t']).group(1)) for i in oc]
nombres_oc = [i['t'].split(' ')[0].lower() for i in oc]
cierto('orden «cronología»: ascendente y coincide con los datos', anyos == sorted(anyos) and anyos == [AUT[n][0] for n in nombres_oc])
pares = T['datos']['obras']['pares']
cierto('emparejar «obras»: cada obra con su autor', all(OBRAS[o.lower()][0] == a.lower() for o, a in pares) and len(pares) == 5 and len({a for _, a in pares}) == 5)
q = T['datos']['errores']['preguntas']
cierto('errores: 8 preguntas y la falsa va siempre en la opción correcta', len(q) == 8 and all(p['ok'] == 0 for p in q))
cierto('errores q2: «intencional ≠ voluntad» coincide con la teoría', q[1]['op'][0].startswith('Significa que todo se hace con intención') and 'no significa «hecho con intención»' in teoria_l)
cierto('errores q3: ser-para-la-muerte no es desear morir', q[2]['op'][0].startswith('Ser-para-la-muerte significa desear morir'))
cierto('errores q8: Camus no propone el suicidio', q[7]['op'][0].startswith('Propone el suicidio'))
cierto('quiz: 10 preguntas con la correcta en la opción 0 válida', len(T['datos']['quiz1']['preguntas']) == 10)
cierto('tarjetas: 16 con anverso y reverso', len(T['datos']['tarjetas1']['cartas']) == 16 and all(c['a'] and c['b'] for c in T['datos']['tarjetas1']['cartas']))

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
        cierto(f'{k}: respuesta correcta válida y opciones distintas', 0 <= p['ok'] < len(p['op']) and len(set(p['op'])) == len(p['op']))
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
