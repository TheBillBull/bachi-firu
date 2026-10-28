#!/usr/bin/env python3
"""
Verificación independiente (sympy) del tema 10 de Matemáticas II (Estudio y representación de funciones):
  · cada cifra de los ejemplos resueltos de la teoría y de los problemas EvAU,
  · la respuesta de cada ejercicio, recalculada desde el enunciado y comparada con el corrector de la web,
  · los datos de los simuladores (estudio guiado, ramas infinitas, de f′ a f, deducir la fórmula, esbozo coherente),
  · algunas respuestas del test y de «encuentra el error».
No comparte código con la web.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_mates2_t10.py /tmp/ampl.json [otro.json]
(el volcado de los simuladores se genera aquí con herramientas/volcar_mates2_t10.js; el segundo argumento se ignora)
"""
import json, sys, os, re, subprocess
import sympy as sp
from sympy import symbols, Rational as Q, sqrt, exp, log, E, oo, limit, diff, solve, simplify, Abs, S, solveset, Interval, Union

datos = json.load(open(sys.argv[1]))
_raiz = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
sim = json.loads(subprocess.run(['node', os.path.join(_raiz, 'herramientas', 'volcar_mates2_t10.js')],
                                capture_output=True, text=True, check=True, cwd=_raiz).stdout)
T = datos['ampl']['mates2']['t10']
EJ = {e['id']: e for e in T['ejercicios']}
ok = 0
fallos = []
x, a, b, c = symbols('x a b c', real=True)

def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

def num(v): return float(sp.N(v, 15))
def igual(p, q, tol=2e-3):
    p, q = num(p), num(q); return abs(p - q) <= tol * max(1, abs(q))

def parse(s):
    s = s.replace('^', '**')
    s = re.sub(r'\be\*\*', 'E**', s)
    s = re.sub(r'\|([^|]+)\|', r'Abs(\1)', s)
    from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application
    return parse_expr(s, transformations=standard_transformations + (implicit_multiplication_application,),
                      local_dict={'ln': log, 'sqrt': sqrt, 'x': x, 'E': E, 'Abs': Abs, 'log': log, 'exp': exp})

def L(f, pto, dir='+-'): return limit(f, x, pto, dir)
def sg(v):
    v = num(v); return 1 if v > 1e-12 else (-1 if v < -1e-12 else 0)
def sgn(f, p): return sg(sp.N(f.subs(x, p), 30))
def d1(f): return diff(f, x)
def d2(f): return diff(f, x, 2)
def real_roots(expr):
    return sorted([r for r in solve(expr, x) if r.is_real], key=lambda r: num(r))
def en_dom(f, p):
    try:
        v = sp.N(f.subs(x, p), 20)
        return bool(v.is_real and v.is_finite)
    except Exception: return False
def cambio(g, p, h=sp.Rational(1, 10**4)):
    """(signo a la izquierda, signo a la derecha) de g alrededor de p"""
    return sgn(g, p - h), sgn(g, p + h)
def criticos(f):
    """[(x, y, 'máx'|'mín')]: puntos del dominio con f' = 0 donde f' cambia de signo"""
    g = d1(f); r = []
    for p in real_roots(g):
        if not en_dom(f, p): continue
        l, d = cambio(g, p)
        if l > 0 and d < 0: r.append((p, f.subs(x, p), 'máx'))
        elif l < 0 and d > 0: r.append((p, f.subs(x, p), 'mín'))
    return r
def inflexiones(f):
    g = d2(f); r = []
    for p in real_roots(g):
        if not en_dom(f, p): continue
        l, d = cambio(g, p)
        if l * d < 0: r.append((p, f.subs(x, p)))
    return r
def lado(f, s):
    """clasificación de la rama infinita en s·∞ (s = +1 o −1)"""
    inf = oo if s > 0 else -oo
    v = L(f, inf)
    if v.is_finite: return ('hor', v)
    m = L(f / x, inf)
    if m.is_finite and m != 0:
        n = L(f - m * x, inf)
        if n.is_finite: return ('obl', m, n)
    return ('par',)

# ======================================================================
# 1. SIMULADOR «ESTUDIO GUIADO»: los datos declarados se recalculan
# ======================================================================
for P in sim['estudio']:
    f = parse(P['ex']); t = P['t']
    if '|' in P['ex']:
        # |x²−4|: se estudia a trozos
        ext = {-2: 'mín', 0: 'máx', 2: 'mín'}
        comprobar(f'estudio {t}: extremos declarados', {e['x']: e['t'] for e in P['ext']} == ext)
        comprobar(f'estudio {t}: valores', all(igual(e['y'], Abs(e['x']**2 - 4)) for e in P['ext']))
        comprobar(f'estudio {t}: derivadas laterales en 2 (−4 y 4)', limit(-((2 + x)**2 - 4) / x, x, 0, '-') == -4 and limit(((2 + x)**2 - 4) / x, x, 0, '+') == 4)
        comprobar(f'estudio {t}: sin inflexiones declaradas', P['inf'] == [])
        continue
    cr = criticos(f)
    comprobar(f'estudio {t}: extremos (x, y, tipo)', len(cr) == len(P['ext']) and all(igual(p[0], e['x']) and igual(p[1], e['y']) and p[2] == e['t'] for p, e in zip(cr, P['ext'])),
              f'sympy={[(num(p[0]), num(p[1]), p[2]) for p in cr]} web={P["ext"]}')
    inf = inflexiones(f)
    comprobar(f'estudio {t}: inflexiones', len(inf) == len(P['inf']) and all(igual(p[0], e['x']) and igual(p[1], e['y']) for p, e in zip(inf, P['inf'])),
              f'sympy={[(num(p[0]), num(p[1])) for p in inf]} web={P["inf"]}')
    for p in P['av']:
        comprobar(f'estudio {t}: vertical en {p}', L(f, p, '+') in (oo, -oo) or L(f, p, '-') in (oo, -oo))
    for s, nm in ((1, '+'), (-1, '-')):
        if not en_dom(f, 10**6 * s): continue
        cl = lado(f, s)
        decl = [r for r in P['rectas'] if r.get('lado', nm) == nm]
        if decl:
            r = decl[0]
            comprobar(f'estudio {t}: recta en {nm}∞', (cl[0] == 'obl' and igual(cl[1], r['m']) and igual(cl[2], r['n'])) or (cl[0] == 'hor' and r['m'] == 0 and igual(cl[1], r['n'])), str(cl))
        else:
            comprobar(f'estudio {t}: sin recta en {nm}∞', cl[0] == 'par', str(cl))
    comprobar(f'estudio {t}: corte con Y (0,0) coherente con el texto', ('(0, 0)' in P['cor']) == (en_dom(f, 0) and f.subs(x, 0) == 0))

# ======================================================================
# 2. SIMULADOR «RAMAS INFINITAS»
# ======================================================================
for P in sim['ramas']:
    f = parse(P['ex'])
    for nm, s in (('mas', 1), ('menos', -1)):
        R = P[nm]
        if R is None:
            comprobar(f'ramas {P["t"]}: {nm} fuera del dominio', not en_dom(f, -10**6)); continue
        cl = lado(f, s)
        if R['tipo'] == 'oblicua': comprobar(f'ramas {P["t"]} {nm}', cl[0] == 'obl' and igual(cl[1], R['m']) and igual(cl[2], R['n']), str(cl))
        elif R['tipo'] == 'horizontal': comprobar(f'ramas {P["t"]} {nm}', cl[0] == 'hor' and igual(cl[1], R['L']), str(cl))
        else:
            comprobar(f'ramas {P["t"]} {nm}', cl[0] == 'par', str(cl))
            m = L(f / x, oo if s > 0 else -oo)
            comprobar(f'ramas {P["t"]} {nm}: dirección', (R['dir'] == 'eje Y' and m in (oo, -oo)) or (R['dir'] == 'eje X' and m == 0))

# ======================================================================
# 3. SIMULADOR «DE f′ A f»
# ======================================================================
for P in sim['fprima']:
    d = parse(P['d']); f0 = parse(P['f0']); X = P['X']
    comprobar(f'fprima {P["t"]}: f0 es primitiva de f′', simplify(d1(f0) - d) == 0)
    cer = [r for r in real_roots(d) if abs(num(r)) < X and cambio(d, r)[0] * cambio(d, r)[1] < 0]
    comprobar(f'fprima {P["t"]}: ceros de f′ con cambio de signo', len(cer) == len(P['ceros']) and all(igual(r, w['x'], 1e-4) for r, w in zip(cer, P['ceros'])) and
              all((cambio(d, r)[0] > 0) == (w['de'] > 0) for r, w in zip(cer, P['ceros'])), f'web={P["ceros"]}')
    ifl = [r for r in real_roots(d1(d)) if abs(num(r)) < X and cambio(d1(d), r)[0] * cambio(d1(d), r)[1] < 0]
    comprobar(f'fprima {P["t"]}: extremos de f′ = inflexiones', len(ifl) == len(P['infl']) and all(igual(r, w['x'], 1e-4) for r, w in zip(ifl, P['infl'])), f'sympy={ifl} web={P["infl"]}')
    tang = [r for r in real_roots(d) if abs(num(r)) < X and cambio(d, r)[0] * cambio(d, r)[1] > 0]
    comprobar(f'fprima {P["t"]}: ceros sin cambio de signo = tang', sorted(num(r) for r in tang) == sorted(P['tang']))

# ======================================================================
# 4. SIMULADOR «DEDUCIR LA FÓRMULA»: el sistema se resuelve aquí de forma independiente
# ======================================================================
FO = sim['formula']
fa, fb, fc = symbols('fa fb fc')
FX = [(fa*x + fb)/(x + fc), x**3 + fa*x**2 + fb*x + fc, (fa*x + fb)*exp(x), fa*log(x) + fb*x]
sist = [
    ([fa, fb, fc], [fc + 2, L(FX[0], oo) - 3, FX[0].subs(x, 0) - 1]),               # vertical x=2, horizontal y=3, pasa por (0,1)
    ([fa, fb, fc], [FX[1].subs(x, 0) - 1, d1(FX[1]).subs(x, 1), d2(FX[1]).subs(x, 2)]),   # f(0)=1, f'(1)=0, f''(2)=0
    ([fa, fb], [FX[2].subs(x, 0) + 1, d1(FX[2]).subs(x, 1)]),                         # f(0)=-1, f'(1)=0
    ([fa, fb], [FX[3].subs(x, 1) + 1, d1(FX[3]).subs(x, 2)]),                         # f(1)=-1, f'(2)=0
]
for P, (vs, eqs), fx in zip(FO, sist, FX):
    s = solve(eqs, vs, dict=True)
    comprobar(f'fórmula {P["t"]}: sistema con solución única', len(s) == 1)
    comprobar(f'fórmula {P["t"]}: solución de la web', all(igual(s[0][v], w) for v, w in zip(vs, P['sol'])), f'sympy={s} web={P["sol"]}')
    comprobar(f'fórmula {P["t"]}: condiciones cumplidas en la solución', all(abs(r) < 1e-9 for r in P['res']))
    comprobar(f'fórmula {P["t"]}: cambiar un parámetro rompe alguna condición', all(any(abs(r) > 1e-9 for r in row) for row in P['pert']))
    sub = {v: w for v, w in zip(vs, P['sol'])}
    comprobar(f'fórmula {P["t"]}: la curva dibujada es la de sympy', all(igual(fx.subs(sub).subs(x, p), w) for p, w in zip((0.5, 1.5, 3, 4), P['f']) if not isinstance(w, str)))
fl = 2*log(x) - x
comprobar('fórmula 4: máximo en (2, 2ln2−2)', criticos(fl)[0][2] == 'máx' and igual(fl.subs(x, 2), -0.614) and d2(fl).subs(x, 2) == Q(-1, 2))
fc3 = x**3 - 6*x**2 + 9*x + 1
comprobar('cúbica: máx (1,5), mín (3,1), inflexión (2,3)', [(p[0], p[1], p[2]) for p in criticos(fc3)] == [(1, 5, 'máx'), (3, 1, 'mín')] and [(p[0], p[1]) for p in inflexiones(fc3)] == [(2, 3)])
fr3 = (3*x - 2)/(x - 2)
comprobar('racional: numerador en x=2 vale 4 y hay asíntota', fr3.subs(x, 0) == 1 and (3*2 - 2) == 4 and L(fr3, 2, '+') == oo and L(fr3, oo) == 3)

# ======================================================================
# 5. SIMULADOR «ESBOZO COHERENTE»: un candidato cumple la tabla si y solo si está marcado ok
# ======================================================================
TABS = [
    dict(fp=[(-3, 1), (0, -1), (3, 1)], fpp=[(-3, -1), (-0.5, -1), (0.5, 1), (3, 1)]),
    dict(fp=[(-3, 1), (-1, 1), (0.5, -1), (1.5, -1), (3, 1)], fpp=[(-3, -1), (0.5, -1), (2, 1), (5, 1)], dom1=True),
    dict(fp=[(-1, 1), (0.5, 1), (2, -1), (5, -1)], fpp=[(-1, -1), (1, -1), (3, 1), (6, 1)], hor_inf=True),
]
for k, (Pc, tb) in enumerate(zip(sim['coherente'], TABS)):
    marcados = 0
    for cand in Pc['cand']:
        f = parse(cand['ex'])
        cumple = all(sgn(d1(f), p) == s for p, s in tb['fp']) and all(sgn(d2(f), p) == s for p, s in tb['fpp'])
        if tb.get('dom1'): cumple = cumple and L(f, 1, '+') == oo and L(f, 1, '-') == -oo
        if tb.get('hor_inf'): cumple = cumple and L(f, oo) == 0
        comprobar(f'coherente tabla {k+1}: {cand["ex"]} cumple={cumple} marcado={cand["ok"]}', cumple == cand['ok'])
        marcados += cand['ok']
    comprobar(f'coherente tabla {k+1}: exactamente un esbozo correcto', marcados == 1)

# ======================================================================
# 6. TEORÍA: ejemplos resueltos
# ======================================================================
comprobar('dom √(x²−4x)/(x−1)', solveset(x**2 - 4*x >= 0, x, S.Reals) == Union(Interval(-oo, 0), Interval(4, oo)) and 1 not in solveset(x**2 - 4*x >= 0, x, S.Reals))
comprobar('dom ln(x²−4)', solveset(x**2 - 4 > 0, x, S.Reals) == Union(Interval.open(-oo, -2), Interval.open(2, oo)))
comprobar('ln(x²−4) par', simplify(log((-x)**2 - 4) - log(x**2 - 4)) == 0)
g_, h_, k_ = x/(x**2 + 1), exp(x) + exp(-x), x + exp(x)
comprobar('g impar, h par, k ninguna', simplify(g_.subs(x, -x) + g_) == 0 and simplify(h_.subs(x, -x) - h_) == 0 and simplify(k_.subs(x, -x) - k_) != 0 and simplify(k_.subs(x, -x) + k_) != 0)
comprobar('k(1)=1+e y k(−1)=−1+1/e', k_.subs(x, 1) == 1 + E and k_.subs(x, -1) == -1 + exp(-1))
fs = (x + 1)*(x - 3)/(x - 1)
comprobar('signos de (x+1)(x−3)/(x−1)', [sgn(fs, p) for p in (-2, 0, 2, 4)] == [-1, 1, -1, 1] and fs.subs(x, 0) == 3 and real_roots(fs) == [-1, 3])
fh = (x**2 - x - 2)/(x**2 - 4)
comprobar('hueco: f=(x+1)/(x+2), f(0)=1/2, lím x→2 = 3/4, AV x=−2', simplify(fh - (x + 1)/(x + 2)) == 0 and fh.subs(x, 0) == Q(1, 2) and L(fh, 2) == Q(3, 4) and L(fh, -2, '+') in (oo, -oo) and solve(fh, x) == [-1])
f4 = x**2/(x**2 - 4)
comprobar('x²/(x²−4): AH 1, f−1=4/(x²−4), lados de las verticales',
          L(f4, oo) == 1 and simplify(f4 - 1 - 4/(x**2 - 4)) == 0 and L(f4, 2, '+') == oo and L(f4, 2, '-') == -oo and L(f4, -2, '-') == oo and L(f4, -2, '+') == -oo)
f5 = x**2*exp(-x)
comprobar('x²e^{-x}: f′ y extremos', simplify(d1(f5) - x*(2 - x)*exp(-x)) == 0 and [(p[0], p[2]) for p in criticos(f5)] == [(0, 'mín'), (2, 'máx')] and igual(f5.subs(x, 2), 0.541) and simplify(f5.subs(x, 2) - 4*exp(-2)) == 0)
comprobar('x⁴: f″(0)=0, mín en 0', d2(x**4).subs(x, 0) == 0 and criticos(x**4)[0][2] == 'mín')
comprobar('x⁴ sin inflexión, x³ con inflexión', inflexiones(x**4) == [] and [p[0] for p in inflexiones(x**3)] == [0] and d2(x**4) == 12*x**2 and d2(x**3) == 6*x)
fg = exp(-x**2)
comprobar('gaussiana: f″=(4x²−2)e^{-x²}, inflexiones ±√2/2, y=e^{-1/2}', simplify(d2(fg) - (4*x**2 - 2)*exp(-x**2)) == 0 and [p[0] for p in inflexiones(fg)] == [-sqrt(2)/2, sqrt(2)/2] and igual(fg.subs(x, sqrt(2)/2), 0.607))
f7 = x**2/(x - 1)
comprobar('R1: x²/(x−1)', f7.subs(x, -2) == Q(-4, 3) and f7.subs(x, 2) == 4 and simplify(f7 - (x + 1 + 1/(x - 1))) == 0 and L(f7, 1, '+') == oo and L(f7, 1, '-') == -oo and
          simplify(d1(f7) - x*(x - 2)/(x - 1)**2) == 0 and simplify(d2(f7) - 2/(x - 1)**3) == 0 and simplify(d1(x + 1 + 1/(x - 1)) - (1 - 1/(x - 1)**2)) == 0 and
          [(p[0], p[1], p[2]) for p in criticos(f7)] == [(0, 0, 'máx'), (2, 4, 'mín')] and inflexiones(f7) == [])
comprobar('R1: tabla de formas', [(sgn(d1(f7), p), sgn(d2(f7), p)) for p in (-1, 0.5, 1.5, 3)] == [(1, -1), (-1, -1), (-1, 1), (1, 1)])
comprobar('R1: signo f<0 si x<1, f>0 si x>1', [sgn(f7, p) for p in (-3, 0.5, 3)] == [-1, -1, 1])
comprobar('R2: x²/(x²−4) f′, f″, máx (0,0), sin inflexiones',
          simplify(d1(f4) + 8*x/(x**2 - 4)**2) == 0 and simplify(d2(f4) - 8*(3*x**2 + 4)/(x**2 - 4)**3) == 0 and [(p[0], p[1], p[2]) for p in criticos(f4)] == [(0, 0, 'máx')] and inflexiones(f4) == [] and
          [sgn(d2(f4), p) for p in (-3, 0, 3)] == [1, -1, 1])
f8 = x*exp(-x)
comprobar('x e^{-x}', L(f8, oo) == 0 and L(f8, -oo) == -oo and L(f8/x, -oo) == oo and simplify(d1(f8) - (1 - x)*exp(-x)) == 0 and simplify(d2(f8) - (x - 2)*exp(-x)) == 0 and
          igual(f8.subs(x, 1), 0.368) and igual(f8.subs(x, 2), 0.271) and [(p[0], p[2]) for p in criticos(f8)] == [(1, 'máx')] and [p[0] for p in inflexiones(f8)] == [2])
f9 = log(x)/x
comprobar('ln x/x', L(f9, 0, '+') == -oo and L(f9, oo) == 0 and simplify(d1(f9) - (1 - log(x))/x**2) == 0 and simplify(d2(f9) - (2*log(x) - 3)/x**3) == 0 and
          [(p[0], p[2]) for p in criticos(f9)] == [(E, 'máx')] and igual(f9.subs(x, E), 0.368) and [p[0] for p in inflexiones(f9)] == [exp(Q(3, 2))] and
          igual(exp(Q(3, 2)), 4.482) and igual(f9.subs(x, exp(Q(3, 2))), 0.335) and simplify(f9.subs(x, exp(Q(3, 2))) - 3/(2*exp(Q(3, 2)))) == 0)
f10 = x*log(x)
comprobar('x ln x', L(f10, 0, '+') == 0 and L(f10/x, oo) == oo and simplify(d1(f10) - (log(x) + 1)) == 0 and d2(f10) == 1/x and
          criticos(f10)[0][0] == exp(-1) and igual(f10.subs(x, exp(-1)), -0.368) and L(d1(f10), 0, '+') == -oo and L(log(x)/(1/x), 0, '+') == 0 and
          simplify(d1(log(x)) / d1(1/x) + x) == 0)
comprobar('límites «quién gana»', L(x**3*exp(-x), oo) == 0 and L(log(x)/x**3, oo) == 0 and L(exp(x)/x**3, oo) == oo and L(x**3*log(x), 0, '+') == 0)
f11 = x*sqrt(4 - x)
comprobar('x√(4−x)', simplify(d1(f11) - (8 - 3*x)/(2*sqrt(4 - x))) == 0 and simplify(d2(f11) - (3*x - 16)/(4*(4 - x)**Q(3, 2))) == 0 and L(f11/x, -oo) == oo and
          [(p[0], p[2]) for p in criticos(f11)] == [(Q(8, 3), 'máx')] and simplify(f11.subs(x, Q(8, 3)) - 16*sqrt(3)/9) == 0 and igual(f11.subs(x, Q(8, 3)), 3.079) and
          L(d1(f11), 4, '-') == -oo and inflexiones(f11) == [] and sgn(d2(f11), 0) == -1 and sgn(d2(f11), 3.9) == -1 and L(f11, -oo) == -oo and
          f11.subs(x, 0) == 0 and f11.subs(x, 4) == 0)
ds = [limit(((2 + x)**2 - 4) / x, x, 0, '+'), limit(-((2 + x)**2 - 4) / x, x, 0, '-')]
comprobar('|x²−4| a trozos: derivadas laterales en 2 = ±4', ds == [4, -4] and diff(x**2 - 4, x) == 2*x and diff(4 - x**2, x) == -2*x and d2(x**2 - 4) == 2 and d2(4 - x**2) == -2 and
          [sgn(2*x, p) for p in (-3, 3)] == [-1, 1] and [sgn(-2*x, p) for p in (-1, 1)] == [1, -1])
fl_ = log(x)
comprobar('ln|x|: par, f′=1/x, f″=−1/x²', simplify(log(Abs(-x)) - log(Abs(x))) == 0 and d1(fl_) == 1/x and d2(fl_) == -1/x**2 and L(log(Abs(x)), 0) == -oo)
f12 = (x**2 + 1)/(x - 1)
comprobar('(x²+1)/(x−1): oblicua y=x+1', L(f12/x, oo) == 1 and L(f12 - x, oo) == 1 and simplify(f12 - (x + 1 + 2/(x - 1))) == 0 and sp.expand((x - 1)*(x + 1) + 2) == x**2 + 1 and lado(f12, -1) == ('obl', 1, 1))
f13 = sqrt(x**2 + x) - x
comprobar('√(x²+x)−x: dominio, +∞ hor 1/2, −∞ obl y=−2x−1/2', solveset(x**2 + x >= 0, x, S.Reals) == Union(Interval(-oo, -1), Interval(0, oo)) and L(f13, oo) == Q(1, 2) and
          L(f13/x, -oo) == -2 and L(f13 + 2*x, -oo) == -Q(1, 2) and L(x/(sqrt(x**2 + x) - x), -oo) == -Q(1, 2) and L(x/(sqrt(x**2 + x) + x), oo) == Q(1, 2))
fp1 = (x + 1)*(x - 3); f1 = x**3/3 - x**2 - 3*x
comprobar('f′ parábola: vértice (1,−4), f(−1)=5/3, f(3)=−9, f(1)=−11/3', sp.expand(fp1) == x**2 - 2*x - 3 and fp1.subs(x, 1) == -4 and simplify(d1(f1) - fp1) == 0 and f1.subs(x, -1) == Q(5, 3) and f1.subs(x, 3) == -9 and f1.subs(x, 1) == Q(-11, 3) and f1.subs(x, 0) == 0 and
          [(p[0], p[2]) for p in criticos(f1)] == [(-1, 'máx'), (3, 'mín')] and [p[0] for p in inflexiones(f1)] == [1])
fp2 = x*(x - 2)**2
comprobar('f′=x(x−2)²: un extremo, f″=(x−2)(3x−2), dos inflexiones', [sgn(fp2, p) for p in (-1, 1, 3)] == [-1, 1, 1] and sp.expand(d1(fp2) - (x - 2)*(3*x - 2)) == 0 and
          real_roots(d1(fp2)) == [Q(2, 3), 2] and [sgn(d1(fp2), p) for p in (0, 1, 3)] == [1, -1, 1])
f14 = x**3 - 3*x
comprobar('x³−3x: máx (−1,2), mín (1,−2)', [(p[0], p[1], p[2]) for p in criticos(f14)] == [(-1, 2, 'máx'), (1, -2, 'mín')] and [sgn(d1(f14), p) for p in (-2, 0, 2)] == [1, -1, 1])
p1 = (x**2 + 1)/x
comprobar('P1: (x²+1)/x', simplify(p1.subs(x, -x) + p1) == 0 and simplify(d1(p1) - (x**2 - 1)/x**2) == 0 and simplify(d2(p1) - 2/x**3) == 0 and L(p1, 0, '+') == oo and L(p1, 0, '-') == -oo and L(p1 - x, oo) == 0 and
          [(p[0], p[1], p[2]) for p in criticos(p1)] == [(-1, -2, 'máx'), (1, 2, 'mín')] and inflexiones(p1) == [] and lado(p1, 1) == ('obl', 1, 0))
p2 = x**2*log(x)
comprobar('P2: x² ln x', L(p2, 0, '+') == 0 and simplify(d1(p2) - x*(2*log(x) + 1)) == 0 and simplify(d2(p2) - (2*log(x) + 3)) == 0 and criticos(p2)[0][0] == exp(-Q(1, 2)) and criticos(p2)[0][2] == 'mín' and
          simplify(criticos(p2)[0][1] + 1/(2*E)) == 0 and igual(criticos(p2)[0][1], -0.184) and igual(exp(-Q(1, 2)), 0.607) and inflexiones(p2)[0][0] == exp(-Q(3, 2)) and igual(exp(-Q(3, 2)), 0.223) and
          simplify(inflexiones(p2)[0][1] + 3*exp(-3)/2) == 0 and abs(num(inflexiones(p2)[0][1]) + 0.0747) < 1e-3 and L(log(x)/x**-2, 0, '+') == 0)
comprobar('P3: a=b=1', solve([a + b - 2, a - b], [a, b]) == {a: 1, b: 1} and d2(p1).subs(x, 1) == 2)
f4_ = x**3/3 - 2*x**2 + 1
comprobar('P4: f′=x²−4x', d1(f4_) == x**2 - 4*x and [(p[0], p[2]) for p in criticos(f4_)] == [(0, 'máx'), (4, 'mín')] and [p[0] for p in inflexiones(f4_)] == [2] and f4_.subs(x, 4) == Q(-29, 3) and igual(f4_.subs(x, 4), -9.67) and f4_.subs(x, 2) == Q(-13, 3) and f4_.subs(x, 0) == 1)
p5a, p5b = -x**2 + 2*x, x**2 - 2*x
comprobar('P5: x|x−2|', limit(p5a.subs(x, 2 + x) / x, x, 0, '-') == -2 and limit(p5b.subs(x, 2 + x) / x, x, 0, '+') == 2 and criticos(p5a)[0][:2] == (1, 1) and sgn(d1(p5a), 0) == 1 and sgn(d1(p5a), 1.5) == -1 and sgn(d1(p5b), 3) == 1 and
          d2(p5a) == -2 and d2(p5b) == 2 and p5a.subs(x, 0) == 0 and sgn(p5a, -1) == -1 and sp.expand(x*(2 - x) - p5a) == 0)

Q1 = T['datos']['quiz1']['preguntas']
def resp(i): return Q1[i]['op'][Q1[i]['ok']]
comprobar('test: dominio ln(x²−4)', resp(0) == '(−∞, −2) ∪ (2, +∞)')
comprobar('test: (x²+1)/x oblicua y = x', resp(2) == 'y = x' and L(p1 - x, oo) == 0)
comprobar('test: x e^{-x} → 0', resp(6) == '0' and L(f8, oo) == 0)
comprobar('test: eˣ rama parabólica Y', 'eje Y' in resp(7) and L(exp(x)/x, oo) == oo)
comprobar('test: cúbica f″(1)=−6', resp(8).startswith('−6') and d2(fc3).subs(x, 1) == -6 and fc3.subs(x, 1) == 5)
comprobar('test: AV de (3x−2)/(x−2)', resp(9) == 'x = 2')
comprobar('errores: x ln x → 0, x³ sin extremo, (x−1)⁴, hueco, vértice de f′',
          L(x*log(x), 0, '+') == 0 and d1(x**3) == 3*x**2 and criticos(x**3) == [] and d2((x - 1)**4) == 12*(x - 1)**2 and inflexiones((x - 1)**4) == [] and
          L((x**2 - 1)/(x - 1), 1) == 2 and simplify((x**2 - 1)/(x - 1) - (x + 1)) == 0 and fp1.subs(x, 1) == -4)
cl = T['datos']['clas']['items']
clas_f = ['(2*x**2+1)/(x**2-3)', 'x*exp(-x)', '(x-1)/(x**2+1)', '(x**2+1)/(x-1)', '(x**3+1)/x**2', 'sqrt(x**2+1)', 'exp(x)', 'log(x)', 'x**2']
tipo_de = {'hor': 0, 'obl': 1, 'par': 2}
comprobar('clasificar: tipos de rama', all(tipo_de[lado(sp.sympify(fs_, locals={'x': x}), 1)[0]] == it['c'] for fs_, it in zip(clas_f, cl)))
EMP = {'3x/(x − 5)': (3*x/(x - 5), ('vert', 5)), '(4x² + 1)/(2x² − 3)': ((4*x**2 + 1)/(2*x**2 - 3), ('hor', 2)), '(x² + 3x)/(x − 1)': ((x**2 + 3*x)/(x - 1), ('obl', 1, 4)),
       'ln x / x': (log(x)/x, ('hor', 0)), '√(x² + x) − x': (f13, ('hor', Q(1, 2))), '(x² + 1)/(x − 1)': (f12, ('obl', 1, 1))}
for par in T['datos']['empar']['pares']:
    f, k = EMP[par[0]]; cl_ = lado(f, 1)
    if k[0] == 'vert': comprobar('empar ' + par[0], L(f, 5, '+') == oo and L(f, oo) == 3 and 'x = 5' in par[1] and 'y = 3' in par[1])
    elif k[0] == 'hor': comprobar('empar ' + par[0], cl_[0] == 'hor' and cl_[1] == k[1] and par[1].startswith('horizontal'))
    else: comprobar('empar ' + par[0], cl_[0] == 'obl' and (cl_[1], cl_[2]) == (k[1], k[2]) and par[1].startswith('oblicua'))

# ======================================================================
# 7. EJERCICIOS: valor esperado calculado aquí desde el enunciado
# ======================================================================
def ck(i):
    c_ = EJ[i]['check']; return c_ if isinstance(c_, list) else [c_]
def nums(i): return [q['valor'] for q in ck(i) if q['tipo'] == 'num']
def opt(i):
    q = ck(i)[0]; return q['opciones'][q['ok']]
def espera(i, vals, tol=2e-3):
    w = nums(i)
    comprobar(f'{i} valores', len(w) == len(vals) and all(igual(p, q, tol) for p, q in zip(w, vals)), f'web={w} sympy={[num(v) for v in vals]}')
def espera_lista(i, vals):
    w = sorted(ck(i)[0]['valores']); v = sorted(num(q) for q in vals)
    comprobar(f'{i} lista', ck(i)[0]['tipo'] == 'lista' and len(w) == len(v) and all(igual(p, q) for p, q in zip(w, v)), f'web={w} sympy={v}')
def mx(f): return [p for p in criticos(f) if p[2] == 'máx']
def mn(f): return [p for p in criticos(f) if p[2] == 'mín']
def verificado(i, cond): comprobar(f'{i} (comprobación adicional)', cond)

fa1 = x**2 - 6*x + 8
espera_lista('a1', real_roots(fa1))
comprobar('a1 dominio', solveset(fa1 >= 0, x, S.Reals) == Union(Interval(-oo, 2), Interval(4, oo)))
fa2 = x**3/(x**2 + 1); comprobar('a2 impar', opt('a2') == 'Impar' and simplify(fa2.subs(x, -x) + fa2) == 0)
espera('a3', [((x**2 - 9)/(x + 1)).subs(x, 0)])
espera_lista('a4', real_roots(x**2 - 5*x + 6))
verificado('a4', all((r + 4) != 0 for r in real_roots(x**2 - 5*x + 6)))
espera('a5', [5]); verificado('a5', L(3*x/(x - 5), 5, '+') == oo)
espera('a6', [L((4*x**2 + 1)/(2*x**2 - 3), oo)])
fa7 = (x**2 + 3*x)/(x - 1); espera('a7', [lado(fa7, 1)[1], lado(fa7, 1)[2]])
fa8 = x**3 - 12*x; espera('a8', [mx(fa8)[0][0], mx(fa8)[0][1]])
fa9 = x*exp(x); espera('a9', [mn(fa9)[0][0], mn(fa9)[0][1]])
espera('a10', [inflexiones(x**3 - 6*x**2)[0][0]])
espera('a11', [criticos(log(x)/x)[0][0]])
comprobar('a12 eˣ rama parabólica Y', 'eje Y' in opt('a12') and lado(exp(x), 1) == ('par',) and L(exp(x)/x, oo) == oo)
fa13 = x**4 - 4*x**3; espera('a13', [3]); verificado('a13', [p[0] for p in criticos(fa13)] == [3] and cambio(d1(fa13), 0)[0] * cambio(d1(fa13), 0)[1] > 0)
fa14 = (x - 1)*(x + 2); espera('a14', [-2]); verificado('a14', [sgn(fa14, p) for p in (-3, 0, 2)] == [1, -1, 1])
comprobar('a15 inflexión', opt('a15').endswith('punto de inflexión') or opt('a15') == 'Un punto de inflexión' and cambio(d1(x*(2 - x)), 1)[0] > 0 > cambio(d1(x*(2 - x)), 1)[1])
fb1 = x**2/(x + 2); espera('b1', [mx(fb1)[0][1]]); verificado('b1', mx(fb1)[0][0] == -4)
espera('b2', [lado(fb1, 1)[1], lado(fb1, 1)[2]]); verificado('b2', sp.expand((x + 2)*(x - 2) + 4) == x**2)
comprobar('b3 cóncava en (−∞,−2)', opt('b3') == 'Cóncava' and simplify(d2(fb1) - 8/(x + 2)**3) == 0 and sgn(d2(fb1), -3) == -1)
fb4 = 2*x/(x**2 + 1); espera('b4', [mx(fb4)[0][1]]); espera('b5', [max(p[0] for p in inflexiones(fb4))])
verificado('b5', sorted(num(p[0]) for p in inflexiones(fb4)) == sorted([-num(sqrt(3)), 0, num(sqrt(3))]))
espera('b6', [inflexiones(fa9)[0][0]])
fb7 = exp(-x**2); espera('b7', [max(p[0] for p in inflexiones(fb7))]); espera('b8', [inflexiones(fb7)[0][1]])
espera('b9', [mn(f10)[0][1]])
fb10 = log(x**2 + 1); espera('b10', [max(p[0] for p in inflexiones(fb10))]); espera('b11', [fb10.subs(x, 1)])
espera('b12', [mx(f11)[0][0]]); espera('b13', [mx(f11)[0][1]])
espera('b14', [2]); verificado('b14', ds == [4, -4] and [num(e['x']) for e in sim['estudio'][5]['ext'] if e['t'] == 'mín'] == [-2, 2])
espera('b15', [1]); verificado('b15', mx(p5a)[0][:2] == (1, 1))
espera('b16', [L(f13, oo)]); espera('b17', [lado(f13, -1)[1], lado(f13, -1)[2]])
s18 = solve([c - 1, L((a*x + b)/(x + c), oo) - 2, b/c - 3], [a, b, c], dict=True)[0]; espera('b18', [s18[a], s18[b], s18[c]])
fb19 = a*x**3 + b*x**2
s19 = solve([d1(fb19).subs(x, 2), fb19.subs(x, 2) + 4], [a, b], dict=True)[0]
fs19 = fb19.subs(s19); espera('b19', [s19[a], s19[b], inflexiones(fs19)[0][0]]); verificado('b19', mn(fs19)[0][:2] == (2, -4))
s20 = solve([((a*x + b)*exp(x)).subs(x, 0) + 1, d1((a*x + b)*exp(x)).subs(x, 1)], [a, b], dict=True)[0]; espera('b20', [s20[a], s20[b]])
espera('b21', [1]); verificado('b21', len(criticos(sp.integrate(x*(x - 2)**2, x))) == 1)
fb22 = sp.integrate(x**3 - 3*x**2, x); espera('b22', [max(p[0] for p in inflexiones(fb22))]); verificado('b22', sp.expand(d2(fb22) - 3*x*(x - 2)) == 0)
fb23 = (x**2 + x + 1)/(x - 1); espera('b23', [lado(fb23, 1)[2]]); verificado('b23', lado(fb23, 1)[1] == 1)
espera('b24', [mn(fb23)[0][1]]); verificado('b24', simplify(mn(fb23)[0][0] - (1 + sqrt(3))) == 0 and simplify(mn(fb23)[0][1] - (3 + 2*sqrt(3))) == 0)
fb25 = (x**2 - 1)/(x**2 - 3*x + 2); espera('b25', [1]); verificado('b25', L(fb25, 2, '+') in (oo, -oo) and L(fb25, 1) == -2)
fc1 = x**3/(x**2 - 1); espera('c1', [mn(fc1)[0][0]]); espera('c2', [mn(fc1)[0][1]]); verificado('c2', simplify(mn(fc1)[0][1] - 3*sqrt(3)/2) == 0)
comprobar('c3 inflexión en 0 con f′ sin cambio', opt('c3').startswith('Un punto de inflexión') and cambio(d1(fc1), 0)[0] == cambio(d1(fc1), 0)[1] and 0 in [p[0] for p in inflexiones(fc1)] and d1(fc1).subs(x, 0) == 0)
espera('c4', [mx(f5)[0][1]]); espera('c5', [max(p[0] for p in inflexiones(f5))])
fc6 = log(x)/x**2; espera('c6', [mx(fc6)[0][0]]); espera('c7', [mx(fc6)[0][1]]); espera('c8', [inflexiones(fc6)[0][0]])
verificado('c6-8 exactos', mx(fc6)[0][0] == sqrt(E) and simplify(mx(fc6)[0][1] - 1/(2*E)) == 0 and inflexiones(fc6)[0][0] == exp(Q(5, 6)))
espera('c9', [limit((exp(-x) - 1)/x, x, 0, '+')]); verificado('c9', limit((exp(x) - 1)/x, x, 0, '-') == 1)
fc10 = sqrt(x**2 + 1) - x; espera('c10', [lado(fc10, -1)[1]]); verificado('c10', lado(fc10, -1)[2] == 0 and L(fc10, oo) == 0)
comprobar('c11 f′<0 y f″>0', opt('c11').startswith('Estrictamente decreciente') and all(sgn(d1(fc10), p) == -1 and sgn(d2(fc10), p) == 1 for p in (-5, -1, 0, 1, 5)))
s12 = solve(d1(x + a/x).subs(x, 2), a)[0]; espera('c12', [s12]); espera('c13', [(x + s12/x).subs(x, 2)]); verificado('c12', mn((x + s12/x))[0][0] == 2)
s14 = solve([d1(a*x + b/x).subs(x, 2), (a*x + b/x).subs(x, 2) - 4], [a, b], dict=True)[0]; espera('c14', [s14[a], s14[b]])
espera('c15', [mn(p2)[0][1]]); espera('c16', [inflexiones(p2)[0][0]])
espera('c17', [f4_.subs(x, 4)]); verificado('c17', f4_.subs(x, 0) == 1 and d1(f4_) == x**2 - 4*x)
fc18 = 2*x/(x**2 - 1)
na = sum(1 for p in (-1, 1) if L(fc18, p, '+') in (oo, -oo) or L(fc18, p, '-') in (oo, -oo)) + (1 if L(fc18, oo) == 0 and L(fc18, -oo) == 0 else 0)
espera('c18', [na])
espera('c19', [mn(parse('e^x/x'))[0][1]])
fc20 = (x**2 - 1)/(x**2 + 1); espera('c20', [max(p[0] for p in inflexiones(fc20))]); espera('c21', [inflexiones(fc20)[0][1]]); verificado('c20', simplify(fc20.subs(x, -x) - fc20) == 0 and inflexiones(fc20)[1][0] == sqrt(3)/3 and inflexiones(fc20)[0][1] == -Q(1, 2))

# cada ejercicio tiene alguna verificación
src = open(__file__, encoding='utf8').read()
cubiertos = set(re.findall(r"(?:espera|espera_lista|verificado)\('([a-c]\d+)'", src)) | set(re.findall(r"comprobar\('([a-c]\d+)\b", src))
comprobar('todos los ejercicios cubiertos', set(EJ) <= cubiertos, str(sorted(set(EJ) - cubiertos)))
comprobar('más de 40 ejercicios y los tres niveles', len(EJ) >= 40 and {e['nivel'] for e in EJ.values()} == {1, 2, 3})

if fallos:
    print('FALLOS:'); [print(' ·', f_) for f_ in fallos]
    print(f'{ok} comprobaciones correctas, {len(fallos)} fallos'); sys.exit(1)
print(f'{ok} comprobaciones correctas, 0 fallos')
