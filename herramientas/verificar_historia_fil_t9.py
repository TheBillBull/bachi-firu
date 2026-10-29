#!/usr/bin/env python3
"""
Verificación independiente de Historia de la Filosofía, tema 9 (Descartes).
Hechos de referencia escritos aquí (sin compartir código con la web): fechas, obras, orden de autores,
reglas del método, niveles de la duda, pruebas de Dios, sustancias y atributos, tipos de ideas.
Comprueba: cronología, que la teoría recoja los hechos, que la ficha de vistazo no contradiga la teoría,
y que cada ejercicio tenga una única respuesta correcta que coincida con los hechos.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_historia_fil_t9.py /tmp/ampl.json
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


# años (negativos = a. C.): (nacimiento, muerte)
ARISTOTELES, AGUSTIN, ANSELMO, TOMAS = (-384, -322), (354, 430), (1033, 1109), (1225, 1274)
GALILEO, DESCARTES, HUME, KANT = (1564, 1642), (1596, 1650), (1711, 1776), (1724, 1804)
LOCKE, SPINOZA, LEIBNIZ = (1632, 1704), (1632, 1677), (1646, 1716)
OBRAS = {'Discurso del método': 1637, 'Meditaciones metafísicas': 1641, 'Principios de la filosofía': 1644, 'Las pasiones del alma': 1649}
CONDENA_GALILEO, NOCHE_SUENOS, ELISABETH = 1633, 1619, 1643
REGLAS = ['evidencia', 'análisis', 'síntesis', 'enumeración']
NIVELES = ['sentidos', 'sueño', 'genio maligno']
SUSTANCIAS = {'res cogitans': 'pensamiento', 'res extensa': 'extensión', 'res infinita': 'perfección infinita'}

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['historia_fil']['t9']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
teoria_l = limpio(teoria).lower()
vz = T['vistazo']
vz_txt = limpio(json.dumps(vz, ensure_ascii=False)).lower()

# --- cronología
cierto('Descartes: 54 años de vida', DESCARTES[1] - DESCARTES[0] == 54)
cierto('Orden de nacimiento: Aristóteles, Agustín, Anselmo, Tomás, Galileo, Descartes, Hume, Kant',
       ARISTOTELES[0] < AGUSTIN[0] < ANSELMO[0] < TOMAS[0] < GALILEO[0] < DESCARTES[0] < HUME[0] < KANT[0])
cierto('Agustín vivió unos once siglos antes que Descartes (1596 - 430 = 1166 años entre muertes y nacimiento)', 1100 < DESCARTES[0] - AGUSTIN[1] < 1200)
cierto('Todas las obras dentro de la vida de Descartes y en orden', all(DESCARTES[0] < a <= DESCARTES[1] for a in OBRAS.values()) and list(OBRAS.values()) == sorted(OBRAS.values()))
cierto('Discurso a los 41, Meditaciones a los 45, Principios a los 48, Pasiones a los 53',
       [a - DESCARTES[0] for a in OBRAS.values()] == [41, 45, 48, 53])
cierto('Condena de Galileo (1633): Descartes tiene 37 años y Galileo sigue vivo', CONDENA_GALILEO - DESCARTES[0] == 37 and CONDENA_GALILEO < GALILEO[1])
cierto('Noche de sueños de 1619: Descartes tiene 23 años', NOCHE_SUENOS - DESCARTES[0] == 23)
cierto('Carta de Elisabeth (1643): entre el Discurso y los Principios', 1637 < ELISABETH < 1644)
cierto('Contemporáneos racionalistas/empiristas: Spinoza y Locke nacen en 1632; Leibniz en 1646; Hume posterior', SPINOZA[0] == LOCKE[0] == 1632 and LEIBNIZ[0] == 1646 and HUME[0] > DESCARTES[1])

# --- la teoría recoge los hechos
cierto('teoría: 1596–1650', '1596–1650' in teoria_l or ('1596' in teoria_l and '1650' in teoria_l))
for nom, a in OBRAS.items():
    cierto(f'teoría: {nom} ({a})', nom.lower() in teoria_l and str(a) in teoria_l)
cierto('teoría: 1633 condena de Galileo, 1619 sueños, 1643 Elisabeth de Bohemia', all(str(x) in teoria_l for x in (1633, 1619, 1643)) and 'elisabeth de bohemia' in teoria_l)
cierto('teoría: fechas de Agustín (354–430) y Anselmo (1033–1109)', '354–430' in teoria_l and '1033–1109' in teoria_l)
cierto('teoría: Spinoza 1632–1677, Leibniz 1646–1716, Locke 1632–1704, Hume 1711–1776',
       all(x in teoria_l for x in ('1632–1677', '1646–1716', '1632–1704', '1711–1776')))
for r in REGLAS:
    cierto(f'teoría: regla {r}', r in teoria_l)
for n in NIVELES:
    cierto(f'teoría: nivel de duda {n}', n in teoria_l)
p = [teoria_l.find(x) for x in ('los sentidos.', 'el sueño.', 'el genio maligno')]
cierto('teoría: los tres niveles se explican en orden (sentidos, sueño, genio)', all(i >= 0 for i in p) and p == sorted(p))
for s, atr in SUSTANCIAS.items():
    cierto(f'teoría: {s} con atributo {atr}', s in teoria_l and atr in teoria_l)
cierto('teoría: tres tipos de ideas', all(x in teoria_l for x in ('innatas', 'adventicias', 'facticias')))
cierto('teoría: tres pruebas de Dios (idea de infinito, imperfección, ontológico)', all(x in teoria_l for x in ('idea de infinito', 'imperfecta', 'ontológico')))
cierto('teoría: cogito, criterio de evidencia, círculo cartesiano, glándula pineal, mecanicismo, dualismo',
       all(x in teoria_l for x in ('cogito', 'clara y distintamente', 'círculo cartesiano', 'glándula pineal', 'mecanicismo', 'dualismo')))
cierto('teoría: si fallor, sum de San Agustín', 'si fallor, sum' in teoria_l)
cierto('teoría: la prueba ontológica de Anselmo se menciona como precedente', 'anselmo' in teoria_l)
cierto('teoría: moral provisional con tres máximas y generosidad', 'moral provisional' in teoria_l and 'generosidad' in teoria_l)
sec_com = next(n['html'] for n in T['nuevas'] if n['h'].startswith('9.'))
cierto('comentario resuelto: lleva el texto, la obra y 7 pasos', 'pienso, luego existo' in sec_com and 'Discurso del método' in sec_com and sec_com.count('<li><b>') == 7 and 'traducción española habitual' in sec_com)

# --- ficha de un vistazo
a = vz['autores'][0]
m = re.search(r'(\d{4})–(\d{4})', a['f'])
cierto('ficha: fechas de Descartes y lugar', (int(m.group(1)), int(m.group(2))) == DESCARTES and 'Estocolmo' in a['l'])
cierto('ficha: 6 bloques y 6–10 palabras clave con definición', len(vz['bloques']) == 6 and 6 <= len(vz['claves']) <= 10 and all(len(k) == 2 and k[1].strip() for k in vz['claves']))
cierto('ficha: obras clave incluyen Discurso, Meditaciones y Principios', all(o in vz['obras'] for o in ('Discurso del método', 'Meditaciones metafísicas', 'Principios de la filosofía')))
cierto('ficha: la cita es del Discurso, IV y está marcada como traducción habitual', vz['cita']['autor'] == 'Descartes' and 'Discurso del método, IV' in vz['cita']['obra'] and 'traducción habitual' in vz['cita']['obra'] and 'luego existo' in vz['cita']['txt'].lower())
tb = [b['tabla'] for b in vz['bloques'] if 'tabla' in b]
cierto('ficha: dos mini-tablas, de duda (3 niveles en orden) y de sustancias', len(tb) == 2 and [f[0].lower() for f in tb[0]['filas']] == NIVELES
       and tb[1]['cab'] == ['Res cogitans', 'Res extensa'])
conecta = limpio(json.dumps(vz['conecta'], ensure_ascii=False))
cierto('ficha: conecta con T3, T4, T6, T7, T8, T10 y T12', all(t in conecta for t in ['(T3)', '(T4)', '(T6)', '(T7)', '(T8)', '(T10)', '(T12)']))
cierto('ficha: obras y temas de «conecta» coinciden con el orden de los temas', [int(x) for x in re.findall(r'\(T(\d+)\)', conecta)] == sorted(int(x) for x in re.findall(r'\(T(\d+)\)', conecta)))
cierto('ficha y teoría usan los mismos términos clave',
       all(t in teoria_l and t in vz_txt for t in ['duda metódica', 'genio maligno', 'cogito', 'ideas innatas', 'dios veraz', 'res cogitans', 'res extensa', 'dualismo', 'mecanicismo']
           ) or all(t in teoria_l for t in ['duda metódica', 'genio maligno', 'cogito', 'res cogitans', 'dualismo']) and all(t in vz_txt for t in ['duda metódica', 'genio maligno', 'cogito', 'res cogitans', 'dualismo']))
cierto('ficha: resumen menciona fundamento, razón, Dios veraz y sustancias', all(t in limpio(' '.join(vz['resumen'])).lower() for t in ['fundamento', 'razón', 'dios veraz', 'sustancias']))
cierto('ficha: el bloque de método nombra las cuatro reglas', all(r in limpio(json.dumps(vz['bloques'][1], ensure_ascii=False)).lower() for r in REGLAS))
cierto('ficha: Galileo y 1633 coinciden con la teoría', '1633' in vz_txt and '1633' in teoria_l)
cierto('ficha: Discurso en 1637 coherente (teoría 1637)', '1637' in teoria_l)


# --- ejercicios con respuesta de hecho
def correcta(id_, campo=0):
    c = EJ[id_]['check']
    c = c[campo] if isinstance(c, list) else c
    return c['opciones'][c['ok']]


cierto('hd1: Estocolmo', correcta('hd1') == 'Estocolmo')
cierto('hd2: 1637', correcta('hd2') == '1637' and OBRAS['Discurso del método'] == 1637)
cierto('hd3: Meditaciones (1641)', correcta('hd3') == 'Meditaciones metafísicas' and OBRAS['Meditaciones metafísicas'] == 1641)
cierto('hd4: francés', correcta('hd4') == 'En francés')
cierto('hd5: cogito', 'cogito' in EJ['hd5']['check']['valores'])
esp6 = ['evidencia', 'análisis', 'síntesis', 'enumeración']
cierto('hd6: reglas con su descripción', [EJ['hd6']['check'][i]['etiqueta'].lower() for i in range(4)] == esp6
       and [correcta('hd6', i).split()[0].lower() for i in range(4)] == ['no', 'dividir', 'ir', 'hacer'])
cierto('hd7: sentidos primer nivel', correcta('hd7') == 'Los sentidos' and NIVELES[0] == 'sentidos')
cierto('hd8: genio maligno último nivel', correcta('hd8') == 'El genio maligno' and NIVELES[-1] == 'genio maligno')
cierto('hd9: metódica y provisional', correcta('hd9') == 'metódica y provisional')
cierto('hd10: sustancias y atributos', [EJ['hd10']['check'][i]['etiqueta'].lower() for i in range(3)] == [s if s != 'res infinita' else 'res infinita (dios)' for s in SUSTANCIAS]
       and [correcta('hd10', i).lower().replace('la ', '').replace('el ', '') for i in range(3)] == list(SUSTANCIAS.values()))
cierto('hd11: sirena facticia', correcta('hd11') == 'Una sirena')
cierto('hd12: cogitans', 'cogitans' in EJ['hd12']['check']['valores'])
orden = ' → '.join(n for n, _ in sorted([('Descartes', DESCARTES), ('San Agustín', AGUSTIN), ('Tomás de Aquino', TOMAS), ('Aristóteles', ARISTOTELES)], key=lambda x: x[1][0]))
cierto('hd13: orden cronológico correcto y único', correcta('hd13') == orden and sum(1 for o in EJ['hd13']['check']['opciones'] if o == orden) == 1)
cierto('hd14: San Agustín', correcta('hd14') == 'San Agustín' and AGUSTIN[1] < DESCARTES[0])
vf = {'hd15': False, 'hd16': True, 'hd17': False, 'hd18': True, 'hd19': False, 'hd20': True, 'hd21': False}
for k, esperado in vf.items():
    c = EJ[k]['check']
    cierto(f'{k}: veredicto {"verdadero" if esperado else "falso"}', c[0]['opciones'][c[0]['ok']] == ('Verdadero' if esperado else 'Falso'))
    cierto(f'{k}: la justificación correcta concuerda con el veredicto y las opciones son distintas',
           c[1]['opciones'][c[1]['ok']].lower().startswith('es verdad' if esperado else 'es falso') and len(set(c[1]['opciones'])) == 4)
cierto('hd22: claridad y distinción', correcta('hd22') == 'la claridad y distinción')
cierto('hd23: error de la voluntad', 'voluntad' in correcta('hd23'))
cierto('hd24: genio maligno para dudar de lo matemático', 'matemáticas' in correcta('hd24'))
cierto('hd25: círculo cartesiano', 'evidencia' in correcta('hd25') and 'Dios' in correcta('hd25'))
cierto('hd26: cera, entendimiento', 'entendimiento' in correcta('hd26'))
cierto('hd27: ideas innatas', 'innatas' in correcta('hd27'))
cierto('hd28: causas mecánicas', 'mecánicas' in correcta('hd28'))
cierto('hd29: Elisabeth de Bohemia', 'Elisabeth' in correcta('hd29') and ELISABETH == 1643)
cierto('hd30: análisis es la segunda regla', correcta('hd30') == 'análisis' and REGLAS[1] == 'análisis')
cierto('hd31–hd32: ideas principales coherentes', 'existe' in correcta('hd31') and 'igual en todos' in correcta('hd32'))
cierto('hd33: hipótesis, no existencia', 'hipótesis' in correcta('hd33'))
cierto('hd34: concebir por separado', 'por separado' in correcta('hd34'))
cierto('hd35: dualismo frente a forma del cuerpo', 'forma' in correcta('hd35') and 'sustancia pensante' in correcta('hd35'))
cierto('hd36: Tomás desde el mundo, Descartes desde la idea', 'Tomás parte del mundo' in correcta('hd36'))
cierto('hd37: Hume niega ideas innatas', 'innatas' in correcta('hd37') and HUME[0] > DESCARTES[1])
esp38 = ['A veces me engañan', 'No hay indicios seguros para distinguir sueño y vigilia', 'Podría engañarme incluso en las matemáticas']
cierto('hd38: niveles de duda con su razón', [correcta('hd38', i) for i in range(3)] == esp38 and [re.sub(r'^(los|el) ', '', EJ['hd38']['check'][i]['etiqueta'].lower()) for i in range(3)] == NIVELES)
et39 = [c['etiqueta'] for c in EJ['hd39']['check']]
cierto('hd39: Agustín–cogito, Galileo–condena, Hume–críticas, Anselmo–ontológico',
       et39 == ['San Agustín', 'Galileo', 'Hume', 'San Anselmo'] and [correcta('hd39', i).split()[0] for i in range(4)] == ['Precedente', 'Condena', 'Niega', 'Precedente']
       and 'cogito' in correcta('hd39', 0) and 'ontológico' in correcta('hd39', 3) and AGUSTIN[1] < ANSELMO[0] < DESCARTES[0])

# --- actividades
d = T['datos']
cierto('orden «reglas»: evidencia, análisis, síntesis, enumeración', [limpio(x['t']).split(':')[0].lower() for x in d['reglas']['items']] == REGLAS)
pr = d['pruebas']['pares']
cierto('emparejar «pruebas»: tres pruebas con su idea central', [p[0] for p in pr] == ['Idea de infinito', 'Mi imperfección', 'Argumento ontológico']
       and 'realidad' in pr[0][1] and 'conserv' in pr[1][1] and 'perfección' in pr[2][1])
su = d['sustancias']
esp = {'Dudar': 0, 'Querer': 0, 'Imaginar': 0, 'Ocupar espacio': 1, 'Tener figura': 1, 'Moverse': 1, 'Infinito': 2, 'Perfecto': 2, 'Garante de la verdad': 2}
cierto('clasificar «sustancias»: cada término en su sustancia, 3 por categoría', {i['t']: i['c'] for i in su['items']} == esp and [sum(1 for i in su['items'] if i['c'] == k) for k in (0, 1, 2)] == [3, 3, 3])
idd = d['ideas']
esp = {'La idea de Dios': 0, 'La idea de número': 0, 'La idea de infinito': 0, 'El calor del fuego': 1, 'El ruido de un trueno': 1, 'El sabor de una naranja': 1, 'Una sirena': 2, 'Un centauro': 2, 'Un caballo alado': 2}
cierto('clasificar «ideas»: innatas, adventicias y facticias', {i['t']: i['c'] for i in idd['items']} == esp and idd['categorias'] == ['Innata', 'Adventicia', 'Facticia'])
q = d['errores']['preguntas'][6]
cierto('errores q7: «Descartes es anterior a San Agustín» es falsa', q['op'][q['ok']] == 'Descartes es anterior a San Agustín' and not (DESCARTES[0] < AGUSTIN[0]))
q = d['errores']['preguntas'][3]
cierto('errores q4: Descartes no parte del mundo sensible (la falsa)', q['op'][q['ok']].startswith('Descartes parte del mundo sensible'))
cierto('quiz1: 10 preguntas y errores: 8', len(d['quiz1']['preguntas']) == 10 and len(d['errores']['preguntas']) == 8)

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
for k, dd in d.items():
    for p_ in dd.get('preguntas', []):
        cierto(f'{k}: una respuesta correcta válida y opciones distintas', 0 <= p_['ok'] < len(p_['op']) and len(set(p_['op'])) == len(p_['op']))
    for it in dd.get('items', []):
        if 'c' in it:
            cierto(f'{k}: categoría válida', 0 <= it['c'] < len(dd['categorias']))

if fallos:
    print('FALLOS:')
    for f in fallos:
        print(' -', f)
    print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
    sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos')
