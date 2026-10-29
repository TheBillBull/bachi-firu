#!/usr/bin/env python3
"""
Verificación independiente de Historia de la Filosofía, tema 10 (Locke y Hume).
Hechos de referencia escritos aquí (no se comparte código con la web): fechas, orden de autores, obras con su autor,
cualidades primarias y secundarias, derechos naturales, relaciones de ideas / cuestiones de hecho.
Comprueba: cronología, ficha de vistazo coherente con la teoría, y que cada ejercicio de opción tenga
una única respuesta correcta que coincida con los hechos.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_historia_fil_t10.py /tmp/ampl.json
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
DESCARTES, HOBBES, LOCKE, HUME, KANT, NEWTON = (1596, 1650), (1588, 1679), (1632, 1704), (1711, 1776), (1724, 1804), (1643, 1727)
OBRAS = {  # obra: (autor, año de primera publicación)
    'Ensayo sobre el entendimiento humano': ('Locke', 1690),
    'Dos tratados sobre el gobierno civil': ('Locke', 1689),
    'Carta sobre la tolerancia': ('Locke', 1689),
    'Tratado de la naturaleza humana': ('Hume', 1739),
    'Investigación sobre el entendimiento humano': ('Hume', 1748),
    'Investigación sobre los principios de la moral': ('Hume', 1751),
}
VIDA = {'Locke': LOCKE, 'Hume': HUME}
PRIMARIAS = ['extensión', 'figura', 'solidez', 'movimiento']
SECUNDARIAS = ['color', 'sabor', 'olor', 'sonido']
GLORIOSA = 1688
LA_FLECHE = (1735, 1737)

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['historia_fil']['t10']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# --- cronología
cierto('Locke vive 72 años y Hume 65', LOCKE[1] - LOCKE[0] == 72 and HUME[1] - HUME[0] == 65)
cierto('Orden de nacimiento: Hobbes, Descartes, Locke, Hume, Kant', HOBBES[0] < DESCARTES[0] < LOCKE[0] < HUME[0] < KANT[0])
cierto('Locke murió antes de nacer Hume (7 años)', HUME[0] - LOCKE[1] == 7)
cierto('Hume escribió el Tratado (1739) con 28 años', 1739 - HUME[0] == 28)
cierto('Las obras de Locke están dentro de su vida y las de Hume dentro de la suya',
       all(VIDA[a][0] < y <= VIDA[a][1] for _, (a, y) in OBRAS.items()))
cierto('Hume escribió el Tratado en La Flèche (1735–1737), antes de publicarlo en 1739', LA_FLECHE[1] < OBRAS['Tratado de la naturaleza humana'][1])
cierto('Revolución Gloriosa (1688) justo antes de los Dos tratados (1689) y el Ensayo (1690) y en vida de Locke', LOCKE[0] < GLORIOSA < OBRAS['Dos tratados sobre el gobierno civil'][1] < OBRAS['Ensayo sobre el entendimiento humano'][1] < LOCKE[1])
cierto('Kant es posterior a Hume y nace 13 años después', KANT[0] - HUME[0] == 13)

# --- la teoría recoge los hechos
for pat in ['1632', '1704', '1711', '1776', '1596–1650', '1588–1679', '1724–1804', '1739–1740', '1748', '1751', '1779', '1688', '1689', '1690']:
    cierto(f'teoría: aparece {pat}', pat in teoria_l)
cierto('teoría: Hume escribe el Tratado con 28 años en La Flèche', '28 años' in teoria_l and 'la flèche' in teoria_l)
cierto('teoría: lugares de Locke (Wrington, Oates, Holanda 1683–1689)', all(x in teoria_l for x in ['wrington', 'oates', '1683–1689']))
cierto('teoría: Edimburgo', 'edimburgo' in teoria_l)
for o in OBRAS:
    cierto(f'teoría: obra «{o}»', o.lower() in teoria_l)
for q in PRIMARIAS + SECUNDARIAS:
    cierto(f'teoría: cualidad {q}', q in teoria_l)
cierto('teoría: términos clave', all(t in teoria_l for t in ['tabula rasa', 'sensación', 'reflexión', 'impresiones', 'principio de copia', 'conexión necesaria', 'inducción', 'haz', 'emotivismo', 'ley de hume', 'contrato', 'derechos naturales', 'tolerancia', 'resistencia', 'relaciones de ideas', 'cuestiones de hecho']))
cierto('teoría: derechos naturales = vida, libertad y bienes', 'vida, libertad y bienes' in teoria_l)
cierto('teoría: las tres condiciones de la causalidad en Hume', all(x in teoria_l for x in ['contigüidad', 'prioridad temporal', 'conjunción constante']))
cierto('teoría: tres grados de conocimiento en Locke', all(x in teoria_l for x in ['intuitivo', 'demostrativo', 'sensitivo']))
cierto('teoría: tres poderes de Locke', all(x in teoria_l for x in ['legislativo', 'ejecutivo', 'federativo']))
cierto('teoría: los dos límites de la propiedad', 'se estropee' in teoria_l and 'suficiente' in teoria_l)
cierto('teoría: cita de Locke con «papel en blanco» y de Hume «atraparme»', 'papel en blanco' in teoria_l and 'atraparme' in teoria_l)
cierto('teoría: las citas están marcadas como traducción habitual o paráfrasis', teoria_l.count('traducción habitual') >= 2 and 'paráfrasis' in teoria_l)
cierto('teoría: hay 6 secciones nuevas con comentario resuelto', len(T['nuevas']) == 6 and any('comentario' in n['h'].lower() for n in T['nuevas']))

# --- ficha de un vistazo
a = vz['autores']
cierto('ficha: fechas de Locke y Hume', (a[0]['n'], a[0]['f']) == ('John Locke', '1632–1704') and (a[1]['n'], a[1]['f']) == ('David Hume', '1711–1776'))
cierto('ficha: lugares', 'Wrington' in a[0]['l'] and 'Oates' in a[0]['l'] and 'Edimburgo' in a[1]['l'] and 'La Flèche' in a[1]['l'])
cierto('ficha: 6 bloques y 6–10 palabras clave con definición', len(vz['bloques']) == 6 and 6 <= len(vz['claves']) <= 10 and all(len(k) == 2 and k[1].strip() for k in vz['claves']))
cierto('ficha: todas las obras existen y son las del dossier', set(vz['obras']) == set(OBRAS))
cierto('ficha: cita de Locke, Ensayo II', vz['cita']['autor'] == 'Locke' and 'Ensayo' in vz['cita']['obra'] and 'experiencia' in vz['cita']['txt'])
cierto('ficha: bloques frases cortas (≤ 15 palabras) y ≤ 3 frases', all(len(b['frases']) <= 3 and all(len(limpio(f).split()) <= 15 for f in b['frases']) for b in vz['bloques']))
tb = next(b for b in vz['bloques'] if b['t'].startswith('Locke: origen'))['tabla']['filas'][0]
cierto('ficha: primarias y secundarias coinciden con los hechos', all(q in limpio(tb[0]).lower() for q in ['extensión', 'figura', 'movimiento']) and all(q in limpio(tb[1]).lower() for q in ['color', 'sabor', 'olor']))
conecta = limpio(json.dumps(vz['conecta'], ensure_ascii=False))
cierto('ficha: conecta con T9, T4, T11 y T12', all(t in conecta for t in ['(T9)', '(T4)', '(T11)', '(T12)']))
cierto('ficha y teoría usan los mismos términos clave', all(t in teoria_l and t in vz_txt for t in ['tabula rasa', 'sensación', 'reflexión', 'impresión', 'principio de copia', 'conexión necesaria', 'inducción', 'haz de percepciones', 'emotivismo', 'ley de hume', 'contrato', 'derechos naturales', 'resistencia', 'hábito']))
cierto('ficha: cuadro de resumen menciona experiencia, Locke, Hume y probable', all(t in limpio(' '.join(vz['resumen'])).lower() for t in ['experiencia', 'locke', 'hume', 'probable']))
cierto('ficha: derechos = vida, libertad y bienes, igual que la teoría', 'vida, libertad, bienes' in vz_txt or 'vida, libertad y bienes' in vz_txt)

# --- ejercicios con respuesta de hecho
def correcta(id_, campo=0):
    c = EJ[id_]['check']
    c = c[campo] if isinstance(c, list) else c
    return c['opciones'][c['ok']]


cierto('hl1: Locke 1632', correcta('hl1') == str(LOCKE[0]))
cierto('hl2: Tratado 1739–1740', correcta('hl2') == '1739–1740' and OBRAS['Tratado de la naturaleza humana'][1] == 1739)
cierto('hl3: Ensayo es de Locke', correcta('hl3') == OBRAS['Ensayo sobre el entendimiento humano'][0])
cierto('hl4: tabula rasa', 'tabula rasa' in EJ['hl4']['check']['valores'])
cierto('hl5: sensación/reflexión', [correcta('hl5', i) for i in range(4)] == ['Sensación', 'Reflexión', 'Sensación', 'Reflexión'])
cierto('hl6: impresiones', correcta('hl6') == 'impresiones')
cierto('hl7: ideas', correcta('hl7') == 'ideas')
cierto('hl8: extensión es primaria', correcta('hl8').lower().endswith('extensión') and 'extensión' in PRIMARIAS)
cierto('hl9: hábito', 'hábito' in EJ['hl9']['check']['valores'])
cierto('hl10: derechos naturales', correcta('hl10') == 'vida, libertad y bienes')
orden = ' → '.join(n for n, v in sorted([('Descartes', DESCARTES), ('Locke', LOCKE), ('Hume', HUME), ('Kant', KANT)], key=lambda x: x[1][0]))
cierto('hl11: orden cronológico', correcta('hl11') == orden)
cierto('hl11: único orden correcto entre las opciones', sum(1 for o in EJ['hl11']['check']['opciones'] if o == orden) == 1)
cierto('hl12: Dos tratados es de Locke', correcta('hl12') == 'Dos tratados sobre el gobierno civil' and OBRAS[correcta('hl12')][0] == 'Locke')
cierto('hl13: haz de percepciones', correcta('hl13') == 'un haz de percepciones')
cierto('hl14: relaciones de ideas y cuestiones de hecho', [correcta('hl14', i) for i in range(4)] == ['Relación de ideas', 'Cuestión de hecho', 'Relación de ideas', 'Cuestión de hecho'])
vf = {'hl15': False, 'hl16': True, 'hl17': False, 'hl18': True, 'hl19': False, 'hl20': False, 'hl21': True}
for k, esperado in vf.items():
    c = EJ[k]['check']
    cierto(f'{k}: veredicto {"verdadero" if esperado else "falso"}', c[0]['opciones'][c[0]['ok']] == ('Verdadero' if esperado else 'Falso'))
    cierto(f'{k}: la justificación correcta coincide con el veredicto', c[1]['opciones'][c[1]['ok']].lower().startswith('es verdad' if esperado else 'es falso'))
    cierto(f'{k}: justificaciones distintas', len(set(c[1]['opciones'])) == len(c[1]['opciones']))
cierto('hl22: principio de copia', 'impresión' in correcta('hl22'))
cierto('hl23: contradicción', correcta('hl23') == 'una contradicción')
cierto('hl24: costumbre', 'costumbre' in correcta('hl24'))
cierto('hl25: inducción', 'futuro' in correcta('hl25') and 'pasado' in correcta('hl25'))
cierto('hl26: trabajo', correcta('hl26') == 'Del trabajo')
cierto('hl27: emotivismo', 'sentimiento' in correcta('hl27'))
cierto('hl28: ley de Hume', 'es' in correcta('hl28') and 'debe' in correcta('hl28') and 'no se deduce' in correcta('hl28'))
cierto('hl29: Locke ley natural; Hobbes guerra', 'ley natural' in correcta('hl29') and 'Hobbes' in correcta('hl29') and 'guerra' in correcta('hl29'))
cierto('hl30: se observa/no se observa', [correcta('hl30', i) for i in range(4)] == ['Se observa', 'No se observa', 'Se observa', 'No se observa'])
cierto('hl31: relaciones', 'relaciones' in EJ['hl31']['check']['valores'])
cierto('hl32: círculo', 'círculo' in correcta('hl32'))
cierto('hl33: Descartes sustancia, Hume haz', 'Descartes' in correcta('hl33') and 'haz' in correcta('hl33'))
cierto('hl34: Locke admite sustancia oscura, Hume rechaza', correcta('hl34').startswith('Locke la admite') and 'Hume la rechaza' in correcta('hl34'))
cierto('hl35: introspección', 'introspección' in correcta('hl35'))
cierto('hl36: ley de Hume', 'ley de Hume' in correcta('hl36'))
cierto('hl37: límites de la propiedad', 'estropea' in correcta('hl37') and 'suficiente' in correcta('hl37'))
cierto('hl38: Hume critica el pacto', 'nadie firmó' in correcta('hl38') and 'utilidad' in correcta('hl38'))
cierto('hl39: autores', [correcta('hl39', i) for i in range(4)] == ['Locke', 'Hume', 'Locke', 'Hume'])

# --- actividades
cl = T['datos']['cualidades']
esp = {'extensión': 0, 'figura': 0, 'solidez': 0, 'movimiento': 0, 'color': 1, 'sabor': 1, 'olor': 1, 'sonido': 1}
cierto('clasificar «cualidades»: cada una en su categoría', len(cl['items']) == 8 and all(esp[next(k for k in esp if it['t'].lower().startswith(k))] == it['c'] for it in cl['items']))
cierto('clasificar «cualidades»: 4 y 4', [sum(1 for i in cl['items'] if i['c'] == k) for k in (0, 1)] == [4, 4] and cl['categorias'] == ['Primaria', 'Secundaria'])
par = {a: b for a, b in T['datos']['contrato']['pares']}
cierto('emparejar «contrato»: derechos, propiedad, contrato, legislativo y resistencia', par['Derechos naturales'] == 'Vida, libertad y bienes' and 'trabajo' in par['Propiedad'] and 'Consentimiento' in par['Contrato social'] and 'supremo' in par['Poder legislativo'] and 'abusa' in par['Derecho de resistencia'] and len(par) == 5)
q = T['datos']['errores']['preguntas'][7]
cierto('errores q8: «Hume es anterior a Locke» es la falsa y las otras 3 verdaderas', q['op'][q['ok']] == 'Hume es anterior a Locke' and not (HUME[0] < LOCKE[0]) and LOCKE[0] == 1632 and HUME[0] == 1711 and DESCARTES[0] < LOCKE[0])
q = T['datos']['errores']['preguntas'][2]
cierto('errores q3: «las ideas son más vivas» es falsa', q['op'][q['ok']].startswith('Las ideas son más vivas'))
q = T['datos']['errores']['preguntas'][0]
cierto('errores q1: «Locke defiende ideas innatas» es falsa', q['op'][q['ok']].startswith('Defiende que la mente tiene ideas innatas'))

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
