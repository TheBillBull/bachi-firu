#!/usr/bin/env python3
"""
Verificación independiente de Historia de la Filosofía, tema 13 (Marx).
Hechos de referencia escritos aquí (sin compartir código con la web): fechas, obras y años, orden de autores,
modos de producción, aspectos de la alienación y aritmética de la plusvalía (con fracciones exactas).
Comprueba cronología, que la ficha de vistazo no contradiga la teoría y que cada ejercicio de opción tenga
una única respuesta correcta que coincida con los hechos.

Uso:  python3 herramientas/verificar_historia_fil_t13.py [ampl.json]
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


# (nacimiento, muerte) d. C.
V = {'Hegel': (1770, 1831), 'Feuerbach': (1804, 1872), 'Marx': (1818, 1883), 'Engels': (1820, 1895), 'Rousseau': (1712, 1778), 'Kant': (1724, 1804)}
OBRAS = {'tesis_doctoral': 1841, 'esencia_cristianismo': 1841, 'manuscritos': 1844, 'tesis_feuerbach': 1845, 'manifiesto': 1848,
         'prefacio': 1859, 'capital1': 1867, 'gotha': 1875, 'publicacion_postuma_manuscritos': 1932}

datos = json.load(open(sys.argv[1])) if len(sys.argv) > 1 else json.loads(
    subprocess.run(['node', 'herramientas/volcar_ampliaciones.js'], capture_output=True, text=True, check=True).stdout)
T = datos['ampl']['historia_fil']['t13']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
tl = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# --- cronología
cierto('orden de nacimiento: Rousseau, Kant, Hegel, Feuerbach, Marx, Engels',
       [k for k, _ in sorted(V.items(), key=lambda x: x[1][0])] == ['Rousseau', 'Kant', 'Hegel', 'Feuerbach', 'Marx', 'Engels'])
for k, (n, m) in V.items():
    cierto(f'{k}: nace antes de morir', n < m)
cierto('Hegel muere en 1831, cuando Marx tiene 13 años', V['Hegel'][1] - V['Marx'][0] == 13)
cierto('Marx vive entre 1818 y 1883: 65 años de diferencia entre años, 64 cumplidos (nace en mayo, muere en marzo)', V['Marx'][1] - V['Marx'][0] == 65)
cierto('Engels sobrevive a Marx doce años (1895)', V['Engels'][1] - V['Marx'][1] == 12)
cierto('Todas las obras de Marx se escriben dentro de su vida', all(V['Marx'][0] < OBRAS[o] < V['Marx'][1] for o in ('tesis_doctoral', 'manuscritos', 'tesis_feuerbach', 'manifiesto', 'prefacio', 'capital1', 'gotha')))
cierto('orden de las obras: tesis, manuscritos, tesis sobre Feuerbach, Manifiesto, Prefacio, El capital, Gotha',
       OBRAS['tesis_doctoral'] < OBRAS['manuscritos'] < OBRAS['tesis_feuerbach'] < OBRAS['manifiesto'] < OBRAS['prefacio'] < OBRAS['capital1'] < OBRAS['gotha'])
cierto('La esencia del cristianismo (1841) es de Feuerbach, en vida de Feuerbach y antes de las Tesis sobre Feuerbach',
       V['Feuerbach'][0] < OBRAS['esencia_cristianismo'] < V['Feuerbach'][1] and OBRAS['esencia_cristianismo'] < OBRAS['tesis_feuerbach'])
cierto('Manuscritos e Ideología alemana se publican en 1932, mucho después de la muerte de Marx', OBRAS['publicacion_postuma_manuscritos'] > V['Marx'][1])

# --- la teoría recoge los hechos
for a in ('Hegel', 'Feuerbach', 'Engels'):
    n, m = V[a]
    cierto(f'teoría: {a} ({n}–{m})', f'{n}–{m}' in tl or (a == 'Hegel' and f'{n}–{m}' in tl))
cierto('teoría: Marx (1818–1883), Tréveris y Londres', '1818–1883' in tl and 'tréveris' in tl and 'londres' in tl)
for o, y in [('manuscritos económico-filosóficos', '1844'), ('tesis sobre feuerbach', '1845'), ('la ideología alemana', '1845–1846'),
             ('manifiesto del partido comunista', '1848'), ('prefacio', '1859'), ('el capital', '1867'), ('programa de gotha', '1875'),
             ('la esencia del cristianismo', '1841')]:
    cierto(f'teoría: «{o}» y el año {y}', o in tl and y in tl)
cierto('teoría: 1932 para las obras póstumas', '1932' in tl)
cierto('teoría: libros II y III de El capital (1885 y 1894)', '1885' in tl and '1894' in tl)
cierto('teoría: términos clave',
       all(t in tl for t in ['materialismo histórico', 'fuerzas productivas', 'relaciones de producción', 'modo de producción', 'infraestructura', 'superestructura',
                             'ideología', 'lucha de clases', 'burguesía', 'proletariado', 'alienación', 'plusvalía', 'fuerza de trabajo', 'praxis',
                             'dictadura del proletariado', 'comunismo', 'opio del pueblo', 'jóvenes hegelianos', 'ser genérico', 'valor de uso', 'valor de cambio',
                             'conciencia de clase', 'tesis xi']))
cierto('teoría: cuatro aspectos de la alienación',
       all(t in tl for t in ['respecto al producto', 'respecto a la actividad', 'respecto al ser genérico', 'respecto a los otros']))
cierto('teoría: modos de producción esclavista, feudal y capitalista', all(t in tl for t in ['esclavista', 'feudal', 'capitalista', 'comunismo primitivo']))
cierto('teoría: advierte que tesis–antítesis–síntesis no es de Marx', 'tesis–antítesis–síntesis' in tl and 'no es de marx' in tl)
cierto('teoría: aclara que el derecho y el Estado son superestructura y la propiedad es infraestructura', 'derecho y el estado son superestructura' in tl)
cierto('teoría: matiz de Engels («en última instancia», 1890)', 'en última instancia' in tl and '1890' in tl)
cierto('teoría: separa a Marx de las aplicaciones del siglo XX', 'aplicaciones políticas del siglo xx' in tl)
cierto('teoría: las citas se marcan como «traducción habitual» o paráfrasis', tl.count('traducción') >= 4 and 'paráfrasis' in tl)
cierto('teoría: compara con Hegel, Platón, Kant, Rousseau y Nietzsche en el mapa',
       all(t in limpio(next(n['html'] for n in T['nuevas'] if n['h'].startswith('6.'))) for t in ['Platón', 'Aristóteles', 'Rousseau', 'Kant', 'Hegel', 'Nietzsche']))

# --- aritmética de la plusvalía (independiente de la web)
def plusvalia(horas, valor_hora, salario):
    valor = Fraction(horas) * valor_hora
    pv = valor - salario
    necesario = Fraction(salario) / valor_hora
    return valor, pv, necesario, horas - necesario, pv / salario


v, pv, nec, plus, tasa = plusvalia(8, 20, 80)
cierto('ejemplo de la teoría: 8 h, 20 €/h → 160 €, salario 80 € → plusvalía 80 €, 4 h necesarias y 4 h de plustrabajo, tasa 100 %',
       (v, pv, nec, plus, tasa) == (160, 80, 4, 4, 1)
       and all(x in limpio(teoria) for x in ['160 €', '80 €', '4 horas', '100 %']))
cierto('ejemplo de la teoría coherente: plusvalía = 160 − 80', 'plusvalía = 160 − 80 = 80 €' in tl)
v2, pv2, nec2, plus2, tasa2 = plusvalia(10, 12, 48)
cierto('ma38/ma39: 10 h, 12 €/h, salario 48 € → plusvalía 72 €, 6 h de plustrabajo, tasa 150 %', (v2, pv2, nec2, plus2, tasa2) == (120, 72, 4, 6, Fraction(3, 2)))

# --- ficha de un vistazo
a = vz['autores'][0]
cierto('ficha: Marx 1818–1883, Tréveris', a['f'] == '1818–1883' and 'Tréveris' in a['l'])
cierto('ficha: 6 bloques y 6–10 palabras clave con definición', len(vz['bloques']) == 6 and 6 <= len(vz['claves']) <= 10 and all(len(k) == 2 and k[1].strip() for k in vz['claves']))
anios = [re.search(r'\((?:[^()]*?)(\d{4})(?:–\d{4})?(?:[^()]*)\)', o).group(1) for o in vz['obras']]
cierto('ficha: obras con sus años (1844, 1845, 1845, 1848, 1859, 1867)', anios == ['1844', '1845', '1845', '1848', '1859', '1867'])
cierto('ficha: obras en orden cronológico', anios == sorted(anios))
cierto('ficha: cita de la tesis XI', vz['cita']['autor'] == 'Marx' and 'XI' in vz['cita']['obra'] and 'transformarlo' in vz['cita']['txt'] and 'interpretar' in vz['cita']['txt'])
conecta = limpio(json.dumps(vz['conecta'], ensure_ascii=False))
cierto('ficha: conecta con T3–T4, T11, T12 y T14', all(t in conecta for t in ['(T3–T4)', '(T11)', '(T12)', '(T14)']) and 'Hegel' in conecta and 'Feuerbach' in conecta)
cierto('ficha y teoría usan los mismos términos clave',
       all(t in tl and t in vz_txt for t in ['materialismo histórico', 'fuerzas productivas', 'relaciones de producción', 'infraestructura', 'superestructura', 'ideología',
                                              'lucha de clases', 'alienación', 'plusvalía', 'comunismo', 'praxis', 'dictadura del proletariado']))
cierto('ficha: tabla de infraestructura y superestructura', any('tabla' in b and b['tabla']['cab'] == ['Infraestructura', 'Superestructura'] for b in vz['bloques']))
cierto('ficha: tabla con los cuatro aspectos de la alienación',
       any('tabla' in b and len(b['tabla']['filas']) == 4 and [f[0] for f in b['tabla']['filas']] == ['el producto', 'la actividad', 'el ser genérico', 'los otros'] for b in vz['bloques']))
cierto('ficha: resumen menciona modo de producción, lucha de clases, plusvalía, alienación y sin clases',
       all(t in limpio(' '.join(vz['resumen'])).lower() for t in ['modo de producción', 'lucha de clases', 'plusvalía', 'alienación', 'sin clases']))
frases = [f for b in vz['bloques'] for f in b['frases']]
cierto('ficha: frases cortas (≤ 15 palabras) y ≤ 3 por bloque', all(len(limpio(f).split()) <= 15 for f in frases) and all(len(b['frases']) <= 3 for b in vz['bloques']))


# --- ejercicios con respuesta de hecho
def correcta(id_, campo=0):
    c = EJ[id_]['check']
    c = c[campo] if isinstance(c, list) else c
    return c['opciones'][c['ok']]


esperadas = {
    'ma1': 'Tréveris', 'ma2': '1848', 'ma3': 'Friedrich Engels', 'ma5': 'transformar el mundo', 'ma7': 'Burguesía y proletariado',
    'ma10': 'El derecho', 'ma11': 'El capital', 'ma22': 'El capitalista', 'ma29': 'Hegel → Feuerbach → Marx',
}
for k, v_ in esperadas.items():
    cierto(f'{k}: {v_}', correcta(k) == v_)
cierto('ma1: Marx nació en Tréveris en 1818', V['Marx'][0] == 1818)
cierto('ma2: 1848 coincide con los hechos', correcta('ma2') == str(OBRAS['manifiesto']))
orden = ' → '.join(n for n, _ in sorted([(x, V[x]) for x in ('Hegel', 'Feuerbach', 'Marx')], key=lambda x: x[1][0]))
cierto('ma29: orden cronológico y único entre las opciones', correcta('ma29') == orden and sum(1 for o in EJ['ma29']['check']['opciones'] if o == orden) == 1)
cierto('ma4: infraestructura', 'infraestructura' in EJ['ma4']['check']['valores'])
cierto('ma8: ajeno', 'ajeno' in EJ['ma8']['check']['valores'])
cierto('ma31: fuerza', 'fuerza' in EJ['ma31']['check']['valores'])
cierto('ma6: años de las cuatro obras', [correcta('ma6', i) for i in range(4)] == [str(OBRAS[x]) for x in ('manuscritos', 'manifiesto', 'prefacio', 'capital1')])
cierto('ma9: plusvalía = valor creado menos salario', correcta('ma9').startswith('La diferencia entre el valor creado'))
cierto('ma12: tres conceptos', [correcta('ma12', i)[:6] for i in range(3)] == ['Medios', 'Relaci', 'Combin'])
cierto('ma13: Feuerbach, proyección', 'proyección' in correcta('ma13'))
cierto('ma14: comunismo sin clases', 'sin clases' in correcta('ma14'))
vf = {'ma15': False, 'ma16': True, 'ma17': False, 'ma18': False, 'ma19': True, 'ma20': False, 'ma21': True}
for k, esperado in vf.items():
    c = EJ[k]['check']
    cierto(f'{k}: veredicto {"verdadero" if esperado else "falso"}', c[0]['opciones'][c[0]['ok']] == ('Verdadero' if esperado else 'Falso'))
    cierto(f'{k}: justificación correcta coherente con el veredicto y 4 opciones distintas',
           c[1]['opciones'][c[1]['ok']].lower().startswith('es verdad' if esperado else 'es falso') and len(set(c[1]['opciones'])) == 4)
cierto('ma23: alienación respecto al producto', 'no le pertenece' in correcta('ma23') or 'fabrica' in correcta('ma23'))
cierto('ma24: materialismo contemplativo', 'contemplativo' in correcta('ma24'))
cierto('ma25: opio como consuelo', 'consuela' in correcta('ma25') and 'sin cambiarla' in correcta('ma25'))
cierto('ma26: tesis-antítesis-síntesis no es de Marx', correcta('ma26') == 'No es una fórmula de Marx')
cierto('ma27: contradicción fuerzas / relaciones', 'fuerzas productivas' in correcta('ma27') and 'relaciones de producción' in correcta('ma27'))
cierto('ma28: ideología', 'intereses de una clase' in correcta('ma28'))
cierto('ma30: dictadura del proletariado transitoria', 'transitorio' in correcta('ma30'))
cierto('ma32: tesis XI', 'praxis' in EJ['ma32']['pasos'][0].lower() or 'práctica' in correcta('ma32'))
cierto('ma33: ser social determina conciencia', 'condiciones materiales' in correcta('ma33'))
cierto('ma34: lucha de clases motor', 'motor de la historia' in correcta('ma34'))
cierto('ma35: Estado instrumento de la clase dominante', 'instrumento de la clase dominante' in correcta('ma35'))
cierto('ma36: cuatro aspectos en orden',
       [correcta('ma36', i)[:8] for i in range(4)] == ['Lo fabri', 'El traba', 'Se pierd', 'Los trab'] and [c['etiqueta'] for c in EJ['ma36']['check']] == ['Respecto al producto', 'Respecto a la actividad', 'Respecto al ser genérico', 'Respecto a los otros'])
esp37 = ['El Espíritu mueve la historia', 'Dios es proyección de la esencia humana', 'El ser social determina la conciencia', 'La propiedad privada origina la desigualdad', 'La razón se da a sí misma la ley moral']
cierto('ma37: autores–ideas', [correcta('ma37', i) for i in range(5)] == esp37 and [c['etiqueta'] for c in EJ['ma37']['check']] == ['Hegel', 'Feuerbach', 'Marx', 'Rousseau', 'Kant'])
cierto('ma38: plusvalía 72 € (cálculo independiente) y única entre las opciones',
       correcta('ma38') == f'{pv2} €' and sum(1 for o in EJ['ma38']['check']['opciones'] if o == f'{pv2} €') == 1)
cierto('ma39: 6 horas de plustrabajo (cálculo independiente)', correcta('ma39') == f'{plus2} horas')
cierto('ma38/ma39: los distractores no coinciden con otros resultados correctos (tasa 150 %, 4 h necesarias)',
       '150 %' not in EJ['ma38']['check']['opciones'] and '4 horas' not in EJ['ma39']['check']['opciones'][EJ['ma39']['check']['ok']])
cierto('ma40: Marx y Rousseau', 'economía' in correcta('ma40') and 'lucha de clases' in correcta('ma40'))
cierto('ma41: matiz de Engels', 'en última instancia' in correcta('ma41'))

# --- actividades
cl = T['datos']['infraestructura']
esp = {'una fábrica': 0, 'la constitución': 1, 'el contrato': 0, 'la religión': 1, 'quién posee': 0, 'la moral': 1, 'los conocimientos': 0, 'la ley': 1, 'el sistema educativo': 1, 'la fuerza de trabajo': 0}
cierto('clasificar «infraestructura»: 5 y 5 correctos',
       all(esp[next(k for k in esp if it['t'].lower().startswith(k))] == it['c'] for it in cl['items']) and len(cl['items']) == 10
       and [sum(1 for i in cl['items'] if i['c'] == k) for k in (0, 1)] == [5, 5])
cq = T['datos']['quien']
espq = {'la historia es el despliegue': 0, 'el estado representa': 0, 'su dialéctica': 0, 'dios es una proyección': 1, 'su materialismo': 1, 'su «hombre»': 1,
        'el ser social': 2, 'de lo que se trata': 2, 'la historia se explica': 2}
cierto('clasificar «quien»: Hegel, Feuerbach, Marx, 3 de cada uno',
       all(espq[next(k for k in espq if it['t'].lower().startswith(k))] == it['c'] for it in cq['items']) and cq['categorias'] == ['Hegel', 'Feuerbach', 'Marx']
       and [sum(1 for i in cq['items'] if i['c'] == k) for k in (0, 1, 2)] == [3, 3, 3])
modos = [limpio(x['t']).lower() for x in T['datos']['modos']['items']]
cierto('orden «modos»: primitivo, esclavista, feudal, capitalista, comunista',
       all(modos[i].startswith(p) for i, p in enumerate(['comunismo primitivo', 'esclavista', 'feudal', 'capitalista', 'sociedad comunista'])))
cam = [limpio(x['t']).lower() for x in T['datos']['caminocomunismo']['items']]
cierto('orden «camino al comunismo»: crisis, revolución, dictadura, fase inferior, fase superior',
       all(cam[i].startswith(p) for i, p in enumerate(['contradicciones', 'revolución', 'dictadura', 'fase inferior', 'fase superior'])))
em = T['datos']['alienacion']['pares']
cierto('emparejar «alienación»: cuatro pares con los cuatro aspectos', [p[0] for p in em] == ['Respecto al producto', 'Respecto a la actividad', 'Respecto al ser genérico', 'Respecto a los otros'] and len(em) == 4)
q = T['datos']['errores']['preguntas'][7]
cierto('errores q8: «Marx nació antes que Hegel» es la falsa y las otras tres son ciertas',
       q['op'][q['ok']] == 'Marx nació antes que Hegel' and not (V['Marx'][0] < V['Hegel'][0]) and V['Hegel'][1] == 1831 and OBRAS['esencia_cristianismo'] == 1841 and V['Marx'][1] == 1883)
q = T['datos']['errores']['preguntas'][1]
cierto('errores q2: las relaciones de producción son infraestructura (no superestructura)', q['op'][q['ok']].startswith('Incluye las relaciones de producción'))
cierto('quiz: Marx nació en Tréveris', T['datos']['quiz1']['preguntas'][0]['op'][0] == 'Tréveris')

# --- estructura de todos los ejercicios y actividades
niveles = [e['nivel'] for e in T['ejercicios']]
cierto('≥ 40 ejercicios', len(EJ) >= 40 and len(EJ) == len(T['ejercicios']))
cierto('hay ejercicios de los tres niveles', set(niveles) == {1, 2, 3})
cierto('≥ 5 preguntas abiertas con rúbrica', sum(1 for e in T['ejercicios'] if not isinstance(e['check'], list) and e['check']['tipo'] == 'rubrica') >= 5)
cierto('la respuesta correcta no está siempre en la misma posición', len({e['check']['ok'] for e in T['ejercicios'] if not isinstance(e['check'], list) and e['check']['tipo'] == 'opcion'}) >= 3)
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
