#!/usr/bin/env python3
"""
Verificación independiente de Historia de la Filosofía, tema 11 (Rousseau y la Ilustración).
Hechos de referencia escritos aquí (sin compartir código con la web): fechas, obras y años, autores y
sus tesis, etapas del Emilio, pasos del Discurso. Comprueba cronología, que la ficha de vistazo no
contradiga la teoría y que cada ejercicio de opción tenga una única respuesta correcta que coincida
con los hechos.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_historia_fil_t11.py /tmp/ampl.json
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


# (nacimiento, muerte) d. C.
V = {'Hobbes': (1588, 1679), 'Locke': (1632, 1704), 'Montesquieu': (1689, 1755), 'Voltaire': (1694, 1778),
     'Hume': (1711, 1776), 'Rousseau': (1712, 1778), 'Diderot': (1713, 1784), "D'Alembert": (1717, 1783), 'Kant': (1724, 1804)}
OBRAS = {'ciencias': 1750, 'desigualdad': 1755, 'contrato': 1762, 'emilio': 1762, 'espiritu': 1748, 'kant_ilustracion': 1784, 'tolerancia': 1763}
ENCICLOPEDIA = (1751, 1772)
REVOLUCION = 1789
ETAPAS = [('Primera infancia', 2), ('Infancia', 12), ('Preadolescencia', 15), ('Adolescencia', 20)]

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['historia_fil']['t11']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
tl = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# --- cronología
cierto('Rousseau vive 66 años (1712–1778)', V['Rousseau'][1] - V['Rousseau'][0] == 66)
cierto('Voltaire y Rousseau mueren el mismo año', V['Voltaire'][1] == V['Rousseau'][1] == 1778)
cierto('orden de nacimiento: Hobbes, Locke, Montesquieu, Voltaire, Hume, Rousseau, Diderot, D\'Alembert, Kant',
       [k for k, _ in sorted(V.items(), key=lambda x: x[1][0])] == ['Hobbes', 'Locke', 'Montesquieu', 'Voltaire', 'Hume', 'Rousseau', 'Diderot', "D'Alembert", 'Kant'])
for k, (n, m) in V.items():
    cierto(f'{k}: nace antes de morir', n < m)
cierto('obras de Rousseau dentro de su vida y en orden',
       all(V['Rousseau'][0] < OBRAS[o] < V['Rousseau'][1] for o in ('ciencias', 'desigualdad', 'contrato', 'emilio'))
       and OBRAS['ciencias'] < OBRAS['desigualdad'] < OBRAS['contrato'] == OBRAS['emilio'])
cierto('Montesquieu escribe El espíritu de las leyes dentro de su vida', V['Montesquieu'][0] < OBRAS['espiritu'] < V['Montesquieu'][1])
cierto('Voltaire: Tratado sobre la tolerancia dentro de su vida', V['Voltaire'][0] < OBRAS['tolerancia'] < V['Voltaire'][1])
cierto('Kant escribe ¿Qué es la Ilustración? (1784) dentro de su vida', V['Kant'][0] < OBRAS['kant_ilustracion'] < V['Kant'][1])
cierto('La Enciclopedia dura 21 años y Diderot vive antes y después', ENCICLOPEDIA[1] - ENCICLOPEDIA[0] == 21 and V['Diderot'][0] < ENCICLOPEDIA[0] and ENCICLOPEDIA[1] < V['Diderot'][1])
cierto('La Revolución Francesa (1789) es once años posterior a la muerte de Rousseau', REVOLUCION - V['Rousseau'][1] == 11)
cierto('Rousseau tenía 38 años en 1750 y 50 en 1762', OBRAS['ciencias'] - V['Rousseau'][0] == 38 and OBRAS['contrato'] - V['Rousseau'][0] == 50)

# --- la teoría recoge los hechos
for a in ('Hobbes', 'Locke', 'Montesquieu', 'Voltaire', 'Hume', 'Rousseau', 'Diderot', 'Kant'):
    n, m = V[a]
    cierto(f'teoría: {a} ({n}–{m})', f'{n}–{m}' in tl)
cierto("teoría: D'Alembert (1717–1783)", '1717–1783' in tl)
for o, y in [('discurso sobre las ciencias y las artes', '1750'), ('desigualdad', '1755'), ('contrato social', '1762'),
             ('espíritu de las leyes', '1748'), ('¿qué es la ilustración?', '1784'), ('tolerancia', '1763')]:
    cierto(f'teoría: «{o}» y el año {y}', o in tl and y in tl)
cierto('teoría: Enciclopedia 1751–1772', '1751–1772' in tl)
cierto('teoría: Revolución Francesa 1789', '1789' in tl and 'revolución francesa' in tl)
cierto('teoría: nace en Ginebra y muere en 1778', 'ginebra' in tl and 'muere en 1778' in tl.replace('<b>', ''))
cierto('teoría: términos clave',
       all(t in tl for t in ['estado de naturaleza', 'amor de sí', 'amor propio', 'perfectible', 'piedad', 'propiedad privada', 'contrato social',
                             'voluntad general', 'voluntad de todos', 'soberanía', 'inalienable', 'indivisible', 'educación negativa', 'sapere aude',
                             'minoría de edad', 'despotismo ilustrado', 'libertad civil', 'libertad moral', 'religión natural', 'vicario saboyano', 'enciclopedia']))
cierto('teoría: advierte que el estado de naturaleza es hipótesis y que «buen salvaje» no es expresión de Rousseau',
       'hipótesis' in tl and '«buen salvaje» no la usa rousseau' in tl)
cierto('teoría: las dos desigualdades (natural y moral/política)', 'natural o física' in tl and 'moral o política' in tl)
cierto('teoría: la separación de poderes se atribuye a Montesquieu y Locke, no a Rousseau', 'separación de poderes' in tl and 'montesquieu y locke' in tl)
cierto('teoría: las traducciones se marcan como «traducción habitual» o paráfrasis', tl.count('traducción') >= 3 and 'paráfrasis' in tl)
sec = limpio(T['secciones']['1']).lower()
idx = [sec.find(x) for x in ['estado de naturaleza**', 'primeras sociedades', 'propiedad privada**', 'pacto engañoso**', 'despotismo**']]
idx = [sec.find('estado de naturaleza: libres')] + [sec.find(x + ': ') if x != 'propiedad privada' else sec.find('propiedad privada: ') for x in ['primeras sociedades', 'propiedad privada', 'pacto engañoso', 'despotismo']]
cierto('sección 2: los cinco pasos de la desigualdad aparecen en orden', all(i >= 0 for i in idx) and idx == sorted(idx))

# --- ficha de un vistazo
a = vz['autores'][0]
cierto('ficha: Rousseau 1712–1778, Ginebra', a['f'] == '1712–1778' and 'Ginebra' in a['l'])
cierto('ficha: 6 bloques y 6–10 palabras clave con definición', len(vz['bloques']) == 6 and 6 <= len(vz['claves']) <= 10 and all(len(k) == 2 and k[1].strip() for k in vz['claves']))
cierto('ficha: obras con sus años (1750, 1755, 1762, 1762)', [re.search(r'\((\d{4})\)', o).group(1) for o in vz['obras']] == ['1750', '1755', '1762', '1762'])
cierto('ficha: cita del Contrato social, I, 1', vz['cita']['autor'] == 'Rousseau' and 'contrato social' in vz['cita']['obra'].lower() and 'libre' in vz['cita']['txt'] and 'encadenado' in vz['cita']['txt'])
conecta = limpio(json.dumps(vz['conecta'], ensure_ascii=False))
cierto('ficha: conecta con T3–T4, T9, T10, T12 y T13', all(t in conecta for t in ['(T3–T4)', '(T9)', '(T10)', '(T12)', '(T13)']))
cierto('ficha y teoría usan los mismos términos clave',
       all(t in tl and t in vz_txt for t in ['estado de naturaleza', 'amor de sí', 'amor propio', 'perfectible', 'propiedad privada', 'contrato social', 'voluntad general', 'soberanía popular', 'educación negativa', 'sapere aude', 'amoral', 'hipótesis']))
cierto('ficha: tabla voluntad de todos frente a voluntad general', any('tabla' in b and b['tabla']['cab'] == ['Voluntad de todos', 'Voluntad general'] for b in vz['bloques']))
cierto('ficha: resumen menciona sociedad, contrato social, voluntad general y educar', all(t in limpio(' '.join(vz['resumen'])).lower() for t in ['sociedad', 'contrato social', 'voluntad general', 'educar']))


# --- ejercicios con respuesta de hecho
def correcta(id_, campo=0):
    c = EJ[id_]['check']
    c = c[campo] if isinstance(c, list) else c
    return c['opciones'][c['ok']]


esperadas = {
    'ro1': 'Ginebra', 'ro2': '1762', 'ro3': 'atrévete a saber', 'ro5': 'Emilio', 'ro7': "Diderot y D'Alembert",
    'ro10': 'Montesquieu', 'ro11': 'el pueblo', 'ro13': 'Discurso sobre las ciencias y las artes', 'ro28': 'Voltaire',
}
for k, v in esperadas.items():
    cierto(f'{k}: {v}', correcta(k) == v)
cierto('ro1: Rousseau nació en Ginebra en 1712', V['Rousseau'][0] == 1712)
cierto('ro2: 1762 coincide con los hechos', correcta('ro2') == str(OBRAS['contrato']) == str(OBRAS['emilio']))
cierto('ro4: general', 'general' in EJ['ro4']['check']['valores'])
cierto('ro6: años de las cuatro obras', [correcta('ro6', i) for i in range(4)] == [str(OBRAS[x]) for x in ('ciencias', 'desigualdad', 'contrato', 'emilio')])
cierto('ro8: amor de sí, amor propio, piedad', [correcta('ro8', i) for i in range(3)] == ['Amor de sí', 'Amor propio', 'Piedad'])
cierto('ro9: perfectibilidad', 'perfectibilidad' in EJ['ro9']['check']['valores'])
orden = ' → '.join(n for n, _ in sorted([('Locke', V['Locke']), ('Rousseau', V['Rousseau']), ('Kant', V['Kant'])], key=lambda x: x[1][0]))
cierto('ro12: orden cronológico y es el único igual entre las opciones', correcta('ro12') == orden and sum(1 for o in EJ['ro12']['check']['opciones'] if o == orden) == 1)
cierto('ro14: comunidad', 'comunidad' in EJ['ro14']['check']['valores'])
vf = {'ro15': False, 'ro16': True, 'ro17': False, 'ro18': True, 'ro19': False, 'ro20': False, 'ro21': True}
for k, esperado in vf.items():
    c = EJ[k]['check']
    cierto(f'{k}: veredicto {"verdadero" if esperado else "falso"}', c[0]['opciones'][c[0]['ok']] == ('Verdadero' if esperado else 'Falso'))
    cierto(f'{k}: justificación correcta coherente con el veredicto y 4 opciones distintas',
           c[1]['opciones'][c[1]['ok']].lower().startswith('es verdad' if esperado else 'es falso') and len(set(c[1]['opciones'])) == 4)
cierto('ro22: comunidad entera', correcta('ro22').startswith('A la comunidad entera'))
cierto('ro23: diferencia con Hobbes', 'comunidad' in correcta('ro23') and 'libertad' in correcta('ro23'))
cierto('ro24: representación', 'solo es libre al elegir' in correcta('ro24'))
cierto('ro25: 1750 progreso sin mejora moral', 'no ha mejorado' in correcta('ro25') and OBRAS['ciencias'] == 1750)
cierto('ro26: libertad civil', correcta('ro26').startswith('vivir bajo leyes'))
cierto('ro27: despotismo ilustrado', 'sin dar participación' in correcta('ro27'))
cierto('ro28: Voltaire murió el mismo año y nadie más de las opciones', V['Voltaire'][1] == V['Rousseau'][1] and not any(V[x][1] == 1778 for x in ('Diderot', 'Locke', 'Kant')))
cierto('ro29: minoría de edad', 'sin la guía de otro' in correcta('ro29'))
cierto('ro30: desigualdad natural', 'edad' in correcta('ro30') and 'fuerza' in correcta('ro30'))
cierto('ro31: educación negativa', 'proteger' in correcta('ro31'))
cierto('ro32: libertad natural frente a cadenas', 'libertad natural contrasta' in correcta('ro32'))
cierto('ro33: propiedad', 'propiedad privada' in correcta('ro33') and 'origen' in correcta('ro33'))
cierto('ro34: voluntad general no es mayoría', 'bien común' in correcta('ro34'))
cierto('ro35: forzado a ser libre', 'voluntad general' in correcta('ro35') and 'a sí mismo' in correcta('ro35'))
cierto('ro36: autonomía', correcta('ro36').startswith('La autonomía'))
esp37 = ['Soberano absoluto por seguridad', 'Gobierno limitado y derechos naturales', 'Soberanía popular inalienable', 'Separación de poderes', 'Tolerancia y crítica del fanatismo']
cierto('ro37: autores–ideas', [correcta('ro37', i) for i in range(5)] == esp37 and [c['etiqueta'] for c in EJ['ro37']['check']] == ['Hobbes', 'Locke', 'Rousseau', 'Montesquieu', 'Voltaire'])
cierto('ro38: tres libertades', [correcta('ro38', i)[:5] for i in range(3)] == ['Hacer', 'Vivir', 'Obede'])
cierto('ro39: discrepancia con Voltaire', 'progreso' in correcta('ro39') and 'moralmente' in correcta('ro39'))

# --- actividades
cl = T['datos']['naturaleza']
esp = {'comer': 0, 'querer tener más': 1, 'protegerme': 0, 'envidiar': 1, 'dormir': 0, 'presumir': 1, 'compararme': 1, 'buscar refugio': 0}
cierto('clasificar «naturaleza»: amor de sí frente a amor propio, 4 y 4',
       all(esp[next(k for k in esp if it['t'].lower().startswith(k))] == it['c'] for it in cl['items']) and len(cl['items']) == 8
       and [sum(1 for i in cl['items'] if i['c'] == k) for k in (0, 1)] == [4, 4])
od = [limpio(x['t']).lower() for x in T['datos']['ordendesigualdad']['items']]
cierto('orden «desigualdad»: naturaleza, sociedades, propiedad, pacto, despotismo',
       all(od[i].startswith(p) for i, p in enumerate(['estado de naturaleza', 'primeras sociedades', 'propiedad privada', 'pacto', 'despotismo'])))
em = [limpio(x['t']) for x in T['datos']['etapasemilio']['items']]
edades = [int(re.search(r'(\d+) años', e).group(1)) if 'hasta' in e else int(re.search(r'–(\d+) años', e).group(1)) for e in em[:4]]
cierto('orden «Emilio»: etapas en orden creciente de edad', [e.split(' (')[0] for e in em[:4]] == [x[0] for x in ETAPAS] and em[4].startswith('Edad adulta') and edades == [x[1] for x in ETAPAS])
cierto('emparejar «voluntades»: tres pares',
       [tuple(p) for p in T['datos']['voluntades']['pares']] == [('Voluntad particular', 'Lo que le conviene a cada individuo'), ('Voluntad de todos', 'La suma de los intereses particulares'), ('Voluntad general', 'Lo que busca el bien común')])
q = T['datos']['errores']['preguntas'][6]
cierto('errores q7: «Rousseau nació antes que Locke» es la falsa y las otras tres son ciertas',
       q['op'][q['ok']] == 'Rousseau nació antes que Locke' and not (V['Rousseau'][0] < V['Locke'][0]) and V['Locke'][0] == 1632 and V['Rousseau'][1] == 1778 and V['Kant'][0] == 1724)
q = T['datos']['errores']['preguntas'][4]
cierto('errores q5: ceder el poder a un monarca absoluto es lo falso', q['op'][q['ok']].startswith('Cada uno cede sus derechos a un monarca'))
cierto('quiz: Rousseau nació en Ginebra', T['datos']['quiz1']['preguntas'][1]['op'][0] == 'Ginebra' and V['Rousseau'][0] == 1712)

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
