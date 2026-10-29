#!/usr/bin/env python3
"""
Verificación independiente de Historia de la Filosofía, tema 12 (Kant).
Hechos de referencia escritos aquí (sin compartir código con la web): fechas, orden de autores y obras,
clasificación de juicios (analítico/sintético, a priori/a posteriori), categorías, postulados, imperativos.
Comprueba cronología, que la ficha de vistazo no contradiga la teoría y que cada ejercicio tenga una única respuesta correcta.
Uso:  node herramientas/volcar_ampliaciones.js > ampl.json ; python3 herramientas/verificar_historia_fil_t12.py ampl.json
"""
import json, re, sys

ok, fallos = 0, []
def cierto(nombre, cond):
    global ok
    if cond: ok += 1
    else: fallos.append(nombre)
def limpio(s): return re.sub(r'<[^>]+>', '', s)

DESCARTES, LOCKE, HUME, KANT, ROUSSEAU, FEDERICO = (1596, 1650), (1632, 1704), (1711, 1776), (1724, 1804), (1712, 1778), (1740, 1786)
OBRAS = {
    'Crítica de la razón pura': 1781, 'Fundamentación de la metafísica de las costumbres': 1785,
    'Crítica de la razón práctica': 1788, 'Crítica del juicio': 1790, 'Hacia la paz perpetua': 1795,
    'Prolegómenos': 1783, 'Qué es la Ilustración': 1784, 'La religión dentro de los límites de la mera razón': 1793}
JUICIOS = {  # (analítico?, a priori?)
    'todos los cuerpos son extensos': (True, True), 'todos los cuerpos son pesados': (False, False),
    '7 + 5 = 12': (False, True), 'todo suceso tiene una causa': (False, True), 'hoy llueve en madrid': (False, False),
    'los solteros no están casados': (True, True), 'el agua hierve a 100 °c al nivel del mar': (False, False),
    'la línea recta es la más corta entre dos puntos': (False, True), 'hoy hace frío': (False, False)}

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['historia_fil']['t12']
EJ = {e['id']: e for e in T['ejercicios']}
teoria_l = limpio(' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# --- cronología
import datetime
cierto('Kant murió a los 79 años (22-IV-1724 a 12-II-1804)', (datetime.date(1804, 2, 12) - datetime.date(1724, 4, 22)).days // 365 == 79 and KANT[1] - KANT[0] == 80)
cierto('Orden de nacimiento: Descartes, Locke, Hume, Rousseau, Kant', DESCARTES[0] < LOCKE[0] < HUME[0] < ROUSSEAU[0] < KANT[0])
cierto('Todas las obras caen dentro de su vida', all(KANT[0] < y <= KANT[1] for y in OBRAS.values()))
cierto('Orden de las Críticas: pura < práctica < juicio', OBRAS['Crítica de la razón pura'] < OBRAS['Crítica de la razón práctica'] < OBRAS['Crítica del juicio'])
cierto('Crítica de la razón pura a los 57 años', 1781 - KANT[0] == 57)
cierto('«Silencio» de 1770 a 1781 = 11 años', 1781 - 1770 == 11)
cierto('Federico II reina 1740–1786, dentro de la vida de Kant y antes de 1794', KANT[0] < FEDERICO[0] and FEDERICO[1] < 1794 < KANT[1])
for pat in ['1724', '1804', '1781', '1784', '1785', '1788', '1790', '1793', '1795', '1770', '1740 a 1786', 'königsberg', '57 años', '1794']:
    cierto(f'teoría: aparece {pat}', pat in teoria_l)
for o in ['crítica de la razón pura', 'fundamentación de la metafísica de las costumbres', 'crítica de la razón práctica', 'crítica del juicio', 'hacia la paz perpetua', '¿qué es la ilustración?']:
    cierto(f'teoría: obra «{o}»', o in teoria_l)
cierto('teoría: términos clave', all(t in teoria_l for t in ['giro', 'copernic', 'analítico', 'sintético', 'a priori', 'a posteriori', 'fenómeno', 'noúmeno', 'estética trascendental', 'analítica trascendental', 'dialéctica trascendental', 'imperativo categórico', 'hipotético', 'autonomía', 'heteronomía', 'buena voluntad', 'postulados', 'bien supremo', 'sapere aude', 'minoría de edad', 'uso público', 'paz perpetua', 'paralogismos', 'antinomias', 'regulativo', 'apercepción']))
cats = ['unidad', 'pluralidad', 'totalidad', 'realidad', 'negación', 'limitación', 'sustancia', 'causa', 'acción recíproca', 'posibilidad', 'existencia', 'necesidad']
cierto('teoría: las 12 categorías en 4 grupos', len(cats) == 12 and all(c in teoria_l for c in cats) and all(g in teoria_l for g in ['cantidad', 'cualidad', 'relación', 'modalidad']))
cierto('teoría: formulaciones (ley universal, ley de la naturaleza, humanidad como fin, autonomía)', all(f in teoria_l for f in ['ley universal', 'ley de la naturaleza', 'humanidad como fin', 'reino de los fines']))
cierto('teoría: postulados libertad, inmortalidad y Dios', all(f in teoria_l for f in ['libertad', 'inmortalidad', 'dios', 'debes, luego puedes']))
cierto('teoría: los tres artículos definitivos', all(f in teoria_l for f in ['republicana', 'federación de estados libres', 'hospitalidad universal']))
cierto('teoría: citas marcadas como traducción habitual o paráfrasis', teoria_l.count('traducción habitual') >= 3 and 'paráfrasis' in teoria_l)
cierto('teoría: 6 secciones nuevas con comentario resuelto', len(T['nuevas']) == 6 and any('comentario' in n['h'].lower() for n in T['nuevas']))

# --- ficha de un vistazo
a = vz['autores'][0]
cierto('ficha: Kant 1724–1804, Königsberg', (a['n'], a['f']) == ('Immanuel Kant', '1724–1804') and 'Königsberg' in a['l'])
cierto('ficha: 6 bloques y 6–10 palabras clave con definición', len(vz['bloques']) == 6 and 6 <= len(vz['claves']) <= 10 and all(len(k) == 2 and k[1].strip() for k in vz['claves']))
cierto('ficha: frases ≤ 15 palabras y ≤ 3 por bloque', all(len(b['frases']) <= 3 and all(len(limpio(f).split()) <= 15 for f in b['frases']) for b in vz['bloques']))
cierto('ficha: obras existen en la teoría', all(o.lower() in teoria_l or o.lower().strip('¿?') in teoria_l for o in vz['obras']))
conecta = limpio(json.dumps(vz['conecta'], ensure_ascii=False))
cierto('ficha: conecta con T3, T4, T9, T10 y T11', all(t in conecta for t in ['(T3)', '(T4)', '(T9)', '(T10)', '(T11)']))
cierto('ficha y teoría usan los mismos términos clave', all(t in teoria_l and t in vz_txt for t in ['giro copernicano', 'fenómeno', 'noúmeno', 'imperativo categórico', 'autonomía', 'postulados', 'bien supremo', 'sapere aude', 'categorías', 'regulativo']))
cierto('ficha: cita de la Fundamentación sobre la ley universal', vz['cita']['autor'] == 'Kant' and 'Fundamentación' in vz['cita']['obra'] and 'ley universal' in vz['cita']['txt'] and 'traducción habitual' in vz['cita']['obra'])
tb = next(b for b in vz['bloques'] if b['t'] == 'Conocimiento')['tabla']['filas']
cierto('ficha: analítico explica / sintético amplía', 'explica' in tb[0][0] and 'amplía' in tb[0][1])

# --- ejercicios con respuesta de hecho
def correcta(id_, campo=0):
    c = EJ[id_]['check']; c = c[campo] if isinstance(c, list) else c
    return c['opciones'][c['ok']]
cierto('kt1: 1724', correcta('kt1') == str(KANT[0]))
cierto('kt2: Königsberg', correcta('kt2') == 'Königsberg')
cierto('kt3: Hume', correcta('kt3') == 'Hume' and HUME[1] < KANT[1])
cierto('kt4: Crítica de la razón pura = 1781', correcta('kt4') == 'Crítica de la razón pura' and OBRAS[correcta('kt4')] == 1781)
cierto('kt5: copernicana', 'copernicana' in EJ['kt5']['check']['valores'])
cierto('kt6: analítico/sintético', [correcta('kt6', i) for i in range(4)] == ['Analítico' if JUICIOS[j.lower()][0] else 'Sintético' for j in ['Todos los cuerpos son extensos', 'Todos los cuerpos son pesados', 'Los solteros no están casados', 'Hoy llueve en Madrid']])
cierto('kt7: a priori/a posteriori', [correcta('kt7', i) for i in range(4)] == ['A priori' if JUICIOS[j.lower()][1] else 'A posteriori' for j in ['7 + 5 = 12', 'El agua hierve a 100 °C al nivel del mar', 'Todo suceso tiene una causa', 'Hoy hace frío']])
cierto('kt8: sintéticos a priori', correcta('kt8') == 'sintéticos a priori')
cierto('kt9/kt10: fenómeno y noúmeno', 'aparece' in correcta('kt9') and 'cosa en sí' in correcta('kt10'))
cierto('kt11: espacio y tiempo', correcta('kt11') == 'espacio y tiempo')
cierto('kt12: 12 categorías', correcta('kt12') == '12' and len(cats) == 12)
cierto('kt13: deontológica', correcta('kt13').startswith('deontológica'))
cierto('kt14: categórico', 'categórico' in EJ['kt14']['check']['valores'])
cierto('kt15: sapere aude', correcta('kt15').startswith('Ten el valor'))
vf = {'kt16': False, 'kt17': True, 'kt18': False, 'kt19': True, 'kt20': False, 'kt21': False, 'kt22': True, 'kt23': False}
for k, esperado in vf.items():
    c = EJ[k]['check']
    cierto(f'{k}: veredicto', c[0]['opciones'][c[0]['ok']] == ('Verdadero' if esperado else 'Falso'))
    cierto(f'{k}: justificación coherente con el veredicto', c[1]['opciones'][c[1]['ok']].lower().startswith('es verdad' if esperado else 'es falso'))
    cierto(f'{k}: justificaciones distintas', len(set(c[1]['opciones'])) == len(c[1]['opciones']))
cierto('kt24: facultades', [correcta('kt24', i) for i in range(4)] == ['Sensibilidad', 'Entendimiento', 'Razón', 'Sensibilidad'])
cierto('kt25: imperativos', [correcta('kt25', i) for i in range(4)] == ['Hipotético', 'Categórico', 'Hipotético', 'Categórico'])
cierto('kt26: usos público/privado', [correcta('kt26', i) for i in range(4)] == ['Uso público', 'Uso privado', 'Uso público', 'Uso privado'])
cierto('kt27: Dios', 'dios' in EJ['kt27']['check']['valores'])
cierto('kt28: autonomía', 'autonomía' in EJ['kt28']['check']['valores'])
cierto('kt29: pereza y cobardía', correcta('kt29') == 'la pereza y la cobardía')
cierto('kt30: humanidad como fin', 'humanidad' in correcta('kt30'))
cierto('kt31: suma construida en la intuición', 'intuición' in correcta('kt31') and 'no está contenido' in correcta('kt31'))
cierto('kt32: categoría', 'categoría' in correcta('kt32'))
cierto('kt33: ideas exceden la experiencia', 'exceden la experiencia' in correcta('kt33'))
cierto('kt34: promesa falsa destruye la práctica de prometer', 'prometer' in correcta('kt34'))
cierto('kt35: formal vs material', 'cómo' in correcta('kt35') and 'felicidad' in correcta('kt35'))
cierto('kt36: deber presupone libertad', 'presupone la libertad' in correcta('kt36'))
cierto('kt37: conforme pero no por deber', correcta('kt37').startswith('conforme al deber'))
cierto('kt38: regulativo', 'orientan' in correcta('kt38'))
orden = 'Razón pura → razón práctica → juicio'
cierto('kt39: orden de las Críticas', correcta('kt39') == orden and sum(1 for o in EJ['kt39']['check']['opciones'] if o == orden) == 1)
cierto('kt40: razón y deber', correcta('kt40') == 'la razón y el deber')

# --- actividades
D = T['datos']
esp = {'espacio': 0, 'tiempo': 0, 'intuición': 0, 'causalidad': 1, 'sustancia': 1, 'categorías': 1, 'idea de dios': 2, 'idea de alma': 2, 'antinomias': 2}
cierto('clasificar «facultades»', all(esp[i['t'].lower()] == i['c'] for i in D['facultades']['items']) and len(D['facultades']['items']) == 9 and D['facultades']['categorias'] == ['Sensibilidad', 'Entendimiento', 'Razón'])
cierto('clasificar «imperativos»: hipotéticos empiezan por «Si quieres»', all((i['t'].startswith('Si quieres')) == (i['c'] == 0) for i in D['imperativos']['items']))
par = dict(map(tuple, D['postulados']['pares']))
cierto('emparejar «postulados»', 'debes, luego puedes' in par['Libertad'] and 'santidad' in par['Inmortalidad del alma'] and 'virtud y felicidad' in par['Existencia de Dios'] and 'virtud' in par['Bien supremo'].lower() and 'ley' in par['Autonomía'])
ob = [re.search(r'\((\d{4})\)', i['t']).group(1) for i in D['obras']['items']]
cierto('orden «obras»: cronológico y años correctos', ob == sorted(ob) and [int(x) for x in ob] == [1781, 1784, 1785, 1788, 1795])
cierto('orden «prueba»: formular, universalizar, comprobar, concluir', D['prueba']['items'][0]['t'].startswith('Formula') and D['prueba']['items'][1]['t'].startswith('Imagina') and D['prueba']['items'][3]['t'].startswith('Si hay'))
q = D['errores']['preguntas']
cierto('errores: la falsa es la primera opción en las 8', all(p['ok'] == 0 for p in q) and len(q) == 8)
cierto('errores q8: razón práctica anterior a la pura es falsa', q[7]['op'][0].startswith('La Crítica de la razón práctica es anterior') and OBRAS['Crítica de la razón práctica'] > OBRAS['Crítica de la razón pura'])
cierto('errores q1/q4/q7', q[0]['op'][0] == 'Es un empirista como Hume' and q[3]['op'][0].startswith('Demuestra que Dios no existe') and q[6]['op'][0].startswith('La minoría de edad es falta de inteligencia'))
cierto('quiz: 10 preguntas', len(D['quiz1']['preguntas']) == 10)

# --- estructura
niveles = [e['nivel'] for e in T['ejercicios']]
cierto('≥ 40 ejercicios', len(EJ) >= 40 and len(EJ) == len(T['ejercicios']))
cierto('tres niveles', set(niveles) == {1, 2, 3})
cierto('≥ 5 preguntas abiertas con rúbrica', sum(1 for e in T['ejercicios'] if not isinstance(e['check'], list) and e['check']['tipo'] == 'rubrica') >= 5)
for e in T['ejercicios']:
    cs = e['check'] if isinstance(e['check'], list) else [e['check']]
    cierto(f"{e['id']}: pasos y resultado", e.get('pasos') and e.get('resultado'))
    for c in cs:
        if c['tipo'] == 'opcion':
            cierto(f"{e['id']}: opciones distintas y ok en rango", len(set(c['opciones'])) == len(c['opciones']) and 0 <= c['ok'] < len(c['opciones']))
        if c['tipo'] == 'rubrica':
            cierto(f"{e['id']}: rúbrica suma 2 puntos", round(sum(i['p'] for i in c['items']), 2) == 2.0)
for k, d in D.items():
    for p in d.get('preguntas', []):
        cierto(f'{k}: ok válido y opciones distintas', 0 <= p['ok'] < len(p['op']) and len(set(p['op'])) == len(p['op']))
    for it in d.get('items', []):
        if 'c' in it: cierto(f'{k}: categoría válida', 0 <= it['c'] < len(d['categorias']))

# --- widgets de lab_filo_t12.js: sus clasificaciones coinciden con los hechos de referencia
src = open('ampliaciones/lab_filo_t12.js', encoding='utf8').read()
for m in re.finditer(r't: "([^"]+)", an: (\d), ap: (\d)', src):
    t = m.group(1).lower()
    if t in JUICIOS:
        cierto(f'widget filo_juicios: «{t}»', JUICIOS[t] == (m.group(2) == '1', m.group(3) == '1'))
cierto('widget filo_juicios: 8 juicios', len(re.findall(r't: "[^"]+", an: \d, ap: \d', src)) == 8)
cierto('widget filo_universal: 5 máximas, 4 de Kant y 1 cotidiana', src.count('res: "Contradicción') == 5 and 'Ejemplo nuestro' in src)

if fallos:
    print('FALLOS:')
    for f in fallos: print(' -', f)
    print(f'{ok} comprobaciones correctas, {len(fallos)} fallos'); sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos')
