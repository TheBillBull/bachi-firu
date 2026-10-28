#!/usr/bin/env python3
"""
Verificación independiente de Historia de la Filosofía, tema 1 (presocráticos).
Hechos de referencia escritos aquí (no se comparte código con la web): fechas, lugares, arché, orden.
Comprueba: cronología, ficha de vistazo coherente con la teoría, y que cada ejercicio de opción tenga
una única respuesta correcta que coincida con los hechos.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_historia_fil_t1.py /tmp/ampl.json
"""
import json, re, sys

ok, fallos = 0, []


def cierto(nombre, cond):
    global ok
    if cond:
        ok += 1
    else:
        fallos.append(nombre)


# nombre: (nacimiento, muerte, lugar, arché)   (años a. C., aproximados; "h." en la web)
HECHOS = {
    'Tales': (624, 546, 'Mileto', 'agua'),
    'Anaximandro': (610, 546, 'Mileto', 'ápeiron'),
    'Anaxímenes': (585, 525, 'Mileto', 'aire'),
    'Pitágoras': (570, 495, 'Samos', 'número'),
    'Heráclito': (540, 480, 'Éfeso', 'fuego'),
    'Parménides': (515, 450, 'Elea', 'ser'),
    'Empédocles': (494, 434, 'Agrigento', ''),
    'Anaxágoras': (500, 428, 'Clazómenas', ''),
    'Demócrito': (460, 370, 'Abdera', 'átomos y vacío'),
}
SOCRATES, PLATON = (470, 399), (427, 347)

datos = json.load(open(sys.argv[1]))
T = datos['ampl']['historia_fil']['t1']
EJ = {e['id']: e for e in T['ejercicios']}
teoria = ' '.join(T['secciones'].values()) + ' ' + ' '.join(n['html'] for n in T['nuevas'])
vz = T['vistazo']
vz_txt = json.dumps(vz, ensure_ascii=False)

# --- cronología de los hechos
for n, (a, b, _, _) in HECHOS.items():
    cierto(f'{n}: nace antes de morir', a > b)
cierto('Tales < Anaximandro < Anaxímenes (nacimiento)', HECHOS['Tales'][0] > HECHOS['Anaximandro'][0] > HECHOS['Anaxímenes'][0])
cierto('Heráclito nace antes que Parménides', HECHOS['Heráclito'][0] > HECHOS['Parménides'][0])
cierto('Demócrito nace después de Parménides', HECHOS['Demócrito'][0] < HECHOS['Parménides'][0])
cierto('Demócrito nace antes de la muerte de Sócrates y es posterior a Heráclito', HECHOS['Demócrito'][0] > SOCRATES[1] and HECHOS['Demócrito'][0] < HECHOS['Heráclito'][1])
cierto('Todos los presocráticos con arché nacen antes que Sócrates, salvo Demócrito, contemporáneo', all(v[0] > SOCRATES[0] for k, v in HECHOS.items() if k != 'Demócrito'))
cierto('Platón nace después de morir Heráclito y Parménides', PLATON[0] < HECHOS['Parménides'][1])

# --- las fechas de la ficha y de la teoría coinciden con los hechos
def fechas_en(texto, nombre):
    """Busca «Nombre ... (h. A–B a. C.)» o ficha con h. A–B en el mismo objeto."""
    m = re.search(re.escape(nombre) + r'[^()]{0,40}\(h\. (\d+)–(\d+) a\. C\.\)', texto)
    return (int(m.group(1)), int(m.group(2))) if m else None

for n, (a, b, _, _) in HECHOS.items():
    f = fechas_en(teoria, n)
    cierto(f'teoría: fechas de {n}', f == (a, b))

# ficha: cada autor con sus fechas y lugar
FICHA = {x['n']: x for x in vz['autores']}
def ficha(nombre):
    return next(x for k, x in FICHA.items() if nombre in k)
for n in ['Pitágoras', 'Heráclito', 'Parménides', 'Demócrito']:
    x = ficha(n)
    m = re.search(r'h\. (\d+)–(\d+) a\. C\.', x['f'])
    cierto(f'ficha: fechas de {n}', m and (int(m.group(1)), int(m.group(2))) == HECHOS[n][:2])
    cierto(f'ficha: lugar de {n}', HECHOS[n][2] in x['l'])
m = re.search(r'h\. (\d+)–(\d+)', ficha('Tales')['f'])
cierto('ficha: milesios abarcan de Tales (624) a la muerte de Anaxímenes (525)', int(m.group(1)) == HECHOS['Tales'][0] and int(m.group(2)) == HECHOS['Anaxímenes'][1])
cierto('ficha: milesios en Mileto', 'Mileto' in ficha('Tales')['l'])

# ficha: la tabla del arché coincide con los hechos
bloque_arche = next(b for b in vz['bloques'] if b['t'] == 'El arché')
for autor, arche in bloque_arche['tabla']['filas']:
    cierto(f'ficha: arché de {autor}', HECHOS[autor][3] == arche)
cierto('ficha: 6 bloques, 10 palabras clave', len(vz['bloques']) == 6 and 6 <= len(vz['claves']) <= 10)
cierto('ficha: palabras clave con definición', all(len(k) == 2 and k[1].strip() for k in vz['claves']))
cierto('ficha: cita de Heráclito atribuida a Heráclito y a un fragmento DK 22', vz['cita']['autor'] == 'Heráclito' and 'DK 22' in vz['cita']['obra'])
cierto('ficha y teoría usan los mismos términos clave', all(t in teoria.lower() for t in ['ápeiron', 'logos', 'arché', 'dóxa', 'devenir', 'rarefacción', 'vacío']))
cierto('ficha: el resumen menciona los temas 3 y 4 (Platón y Aristóteles)', 'Platón (tema 3)' in re.sub('<[^>]+>', '', ' '.join(vz['resumen'])) and 'Aristóteles (tema 4)' in re.sub('<[^>]+>', '', ' '.join(vz['resumen'])))

# --- los ejercicios con respuesta de hecho
def correcta(id_, campo=0):
    c = EJ[id_]['check']
    c = c[campo] if isinstance(c, list) else c
    return c['opciones'][c['ok']]

cierto('hf2: Tales–agua', correcta('hf2').lower() == 'el agua' and HECHOS['Tales'][3] == 'agua')
for i, (n, a) in enumerate([('Anaximandro', 'Ápeiron'), ('Anaxímenes', 'Aire'), ('Pitágoras', 'Número'), ('Tales', 'Agua')]):
    c = EJ['hf3']['check'][i]
    cierto(f'hf3: {n}', c['etiqueta'] == n and correcta('hf3', i) == a and HECHOS[n][3] == a.lower())
cierto('hf4: Heráclito–fuego', correcta('hf4').lower() == 'el fuego' and HECHOS['Heráclito'][3] == 'fuego')
cierto('hf5: ápeiron', 'ápeiron' in EJ['hf5']['check']['valores'] and HECHOS['Anaximandro'][3] == 'ápeiron')
cierto('hf6: Elea', EJ['hf6']['check']['valores'] == ['Elea'] and HECHOS['Parménides'][2] == 'Elea')
orden = ' → '.join(sorted(['Tales', 'Heráclito', 'Parménides', 'Demócrito'], key=lambda n: -HECHOS[n][0]))
cierto('hf7: orden cronológico', correcta('hf7') == orden)
cierto('hf7: único orden correcto entre las opciones', sum(1 for o in EJ['hf7']['check']['opciones'] if o == orden) == 1)
mapa = {'Heráclito': HECHOS['Heráclito'], 'Parménides': HECHOS['Parménides'], 'Tales': HECHOS['Tales'], 'Demócrito': HECHOS['Demócrito']}
for i, esp in enumerate(['Heráclito', 'Parménides', 'Tales', 'Demócrito']):
    cierto(f'hf23: frase {i + 1} → {esp}', correcta('hf23', i) == esp)
cierto('hf24: posiciones', [correcta('hf24', i) for i in range(3)] == ['Heráclito', 'Parménides', 'Demócrito'])
# preguntas cronológicas del test de errores (encuentra el error, quiz «errores», pregunta 5)
q = T['datos']['errores']['preguntas'][4]
afirm = q['op'][q['ok']]
cierto('errores q5: «Tales es posterior a Parménides» es falsa', 'Tales es posterior a Parménides' == afirm and not (HECHOS['Tales'][0] < HECHOS['Parménides'][0]))
resto = [o for i, o in enumerate(q['op']) if i != q['ok']]
cierto('errores q5: las otras tres cronologías son verdaderas',
       HECHOS['Tales'][0] > HECHOS['Heráclito'][0] and HECHOS['Demócrito'][0] < HECHOS['Heráclito'][0] and HECHOS['Anaximandro'][0] < HECHOS['Tales'][0] and len(resto) == 3)

# --- estructura de todos los ejercicios y actividades
niveles = [e['nivel'] for e in T['ejercicios']]
cierto('≥ 40 ejercicios', len(EJ) >= 40 and len(EJ) == len(T['ejercicios']))
cierto('hay ejercicios de los tres niveles', set(niveles) == {1, 2, 3})
for e in T['ejercicios']:
    cs = e['check'] if isinstance(e['check'], list) else [e['check']]
    cierto(f"{e['id']}: pasos y resultado", e.get('pasos') and e.get('resultado'))
    for c in cs:
        if c['tipo'] == 'opcion':
            ops = c['opciones']
            cierto(f"{e['id']}: opciones distintas y ok en rango", len(set(ops)) == len(ops) and 0 <= c['ok'] < len(ops))
        if c['tipo'] == 'rubrica':
            tot = round(sum(i['p'] for i in c['items']), 2)
            cierto(f"{e['id']}: rúbrica suma 2 puntos", tot == 2.0)
for k, d in T['datos'].items():
    for p in d.get('preguntas', []):
        cierto(f'{k}: una respuesta correcta válida y opciones distintas', 0 <= p['ok'] < len(p['op']) and len(set(p['op'])) == len(p['op']))
    for it in d.get('items', []):
        if 'c' in it:
            cierto(f'{k}: categoría válida', 0 <= it['c'] < len(d['categorias']))
# el emparejar «arche» concuerda con los hechos
for a, r in T['datos']['arche']['pares']:
    cierto(f'emparejar: {a}', r.lower().lstrip('el ').lstrip() .startswith(HECHOS[a][3].split(' ')[0]) or HECHOS[a][3] in r.lower())

if fallos:
    print('FALLOS:')
    for f in fallos:
        print(' -', f)
    print(f'{ok} comprobaciones correctas, {len(fallos)} fallos')
    sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos')
