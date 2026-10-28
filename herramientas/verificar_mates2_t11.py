#!/usr/bin/env python3
"""
Verificación independiente (sympy) del tema 11 de Matemáticas II (Cálculo de primitivas):
 - cada ejercicio con respuesta escrita: la F de la web se deriva y debe dar el integrando (o f'' para e44), y debe
   cumplir la condición F(x0) = y0; además, la web (su analizador de expresiones, vía node) y sympy deben leer
   la expresión igual (comprobación de la lectura, no solo de las matemáticas);
 - cada resultado de los ejemplos resueltos de la teoría (derivando) y los datos de los simuladores
   (m2_familia, m2_partes, m2_fracciones).
No comparte código con la web.

Uso:  node herramientas/volcar_ampliaciones.js > /tmp/ampl.json
      python3 herramientas/verificar_mates2_t11.py /tmp/ampl.json
"""
import json, re, sys, subprocess, os
import sympy as sp
from sympy import Rational as Q, symbols, sqrt, sin, cos, tan, exp, log, E, pi, atan, asin, diff, apart, simplify
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application, convert_xor

raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
datos = json.load(open(sys.argv[1]))
T = datos['ampl']['mates2']['t11']
EJ = {e['id']: e for e in T['ejercicios']}
x = symbols('x', real=True)
fallos, ok = [], 0

def comprobar(nombre, cond, detalle=''):
    global ok
    if cond: ok += 1
    else: fallos.append(f'{nombre} {detalle}')

def prim(nombre, F, f, pts=(1.3, 2.2, 3.7)):
    """F es primitiva de f: F'(p) = f(p) en varios puntos."""
    d = diff(F, x)
    try:
        comprobar(nombre, all(abs(float(sp.N(d.subs(x, p))) - float(sp.N(f.subs(x, p)))) <= 1e-9 * max(1, abs(float(sp.N(f.subs(x, p))))) for p in pts), f'F\'≠f en {nombre}')
    except TypeError:
        comprobar(nombre, False, f'no evaluable (dominio) en {nombre}: F={F}')

TR = standard_transformations + (implicit_multiplication_application, convert_xor)
def leer(s):
    s = re.sub(r'(?<![a-z])e(?![a-z])', 'E', s).replace('sen', 'sin').replace('arctg', 'atan').replace('ln', 'log')
    return parse_expr(s, local_dict={'x': x, 'E': E, 'log': log, 'sin': sin, 'cos': cos, 'atan': atan, 'sqrt': sqrt}, transformations=TR)

# ================================================================= EJERCICIOS
# id: (integrando, x0, y0)   [e44: f'' y dos condiciones, aparte]
L = log
I = {
 'e1': (6*x**2 - 4*x + 3, 0, 2), 'e2': (sqrt(x) + 1/x**2, 1, 0), 'e3': (5*E**x - 2*cos(x), 0, 1),
 'e4': ((x + 1)**2/x, 1, 0), 'e5': (3/(1 + x**2), 0, 1), 'e6': ((2*x + 1)**3, 0, 0), 'e7': (cos(3*x), 0, 1),
 'e8': (E**(-2*x), 0, 0), 'e9': (1/(3*x + 2), 0, 0), 'e10': (2*x*(x**2 + 3)**4, 0, 0), 'e11': (2*x/(x**2 + 1), 0, 2),
 'e12': (x*E**(x**2), 0, 1), 'e13': (sin(x)*cos(x), 0, 0),
 'e15': (x*sqrt(x**2 + 1), 0, 0), 'e16': (L(x)**2/x, 1, 0), 'e17': (tan(x), 0, 0), 'e18': (cos(x)/(1 + sin(x)**2), 0, 0),
 'e19': (E**x/(E**x + 1), 0, 0), 'e20': (x*sin(x), 0, 0), 'e21': (x*E**(-x), 0, 0), 'e22': (x*L(x), 1, 0),
 'e23': (L(x), 1, 0), 'e24': (1/(x**2 - 1), 2, 0), 'e25': ((4*x - 1)/(x*(x - 1)), 2, 0), 'e26': (1/(x**2 + 4), 0, 1),
 'e27': ((2*x + 3)/(x**2 + 3*x + 5), 0, 0), 'e28': (x**2/(x + 1), 0, 1), 'e29': (sin(x)**2, 0, 0), 'e30': (cos(x)**3, 0, 0),
 'e31': (E**x*sin(x), 0, 0), 'e32': (x**2*E**x, 0, 0), 'e33': (x*sqrt(x + 1), 0, 0), 'e34': (1/(E**x + 1), 0, 0),
 'e35': (E**sqrt(x), 0, 0), 'e36': ((x**2 + 1)/((x - 1)**2*(x + 1)), 2, 0), 'e37': (4/((x - 1)*(x**2 + 1)), 2, 0),
 'e38': ((2*x + 1)/(x**2*(x + 1)), 1, 0), 'e39': (1/(x**2 + 2*x + 5), -1, 0), 'e40': (atan(x), 0, 0),
 'e41': (x/(x**2 + 2*x + 5), -1, 0), 'e42': (1/(x*L(x)), E, 0), 'e43': (L(x)**2, 1, 0), 'e46': (x*atan(x), 0, 0),
}
# puntos de derivación válidos (por defecto 1.3, 2.2, 3.7); algunos integrandos tienen otro dominio
PTS = {'e17': (0.3, 0.7, 1.1), 'e18': (0.3, 0.9, 2.0), 'e2': (0.4, 1.5, 3.0), 'e3': (0.3, 1.1, 2.0), 'e5': (0.3, 1.1, 2.0),
       'e6': (0.3, 1.1, 2.0), 'e7': (0.3, 1.1, 2.0), 'e8': (0.3, 1.1, 2.0), 'e9': (0.3, 1.1, 2.0), 'e10': (0.3, 1.1, 2.0),
       'e11': (0.3, 1.1, 2.0), 'e12': (0.3, 1.1, 1.4), 'e13': (0.3, 1.1, 2.0), 'e15': (0.3, 1.1, 2.0), 'e19': (0.3, 1.1, 2.0),
       'e20': (0.3, 1.1, 2.0), 'e21': (0.3, 1.1, 2.0), 'e26': (0.3, 1.1, 2.0), 'e27': (0.3, 1.1, 2.0), 'e28': (0.3, 1.1, 2.0),
       'e29': (0.3, 1.1, 2.0), 'e30': (0.3, 1.1, 2.0), 'e31': (0.3, 1.1, 2.0), 'e32': (0.3, 1.1, 2.0), 'e33': (0.3, 1.1, 2.0),
       'e34': (0.3, 1.1, 2.0), 'e39': (-0.3, 1.1, 2.0), 'e40': (0.3, 1.1, 2.0), 'e41': (-0.3, 1.1, 2.0), 'e46': (0.3, 1.1, 2.0),
       'e1': (0.3, 1.1, 2.0), 'e16': (0.6, 1.3, 3.0), 'e22': (0.6, 1.3, 3.0), 'e23': (0.6, 1.3, 3.0), 'e43': (0.6, 1.3, 3.0),
       'e4': (0.6, 1.3, 3.0), 'e35': (0.3, 1.3, 3.0), 'e42': (1.5, 2.2, 3.7)}

exprs = {}
for i, (f, x0, y0) in I.items():
    ck = EJ[i]['check']; ck = ck if isinstance(ck, dict) else ck[0]
    comprobar(f'{i} tipo expr', ck['tipo'] == 'expr')
    F = leer(ck['expr'])
    exprs[i] = (ck['expr'], ck['dom'])
    prim(i + ' F\'=f', F, f, PTS.get(i, (1.3, 2.2, 3.7)))
    comprobar(i + f' F({x0})={y0}', abs(float(sp.N(F.subs(x, x0) - y0, 30))) < 1e-9, f'F(x0)={sp.N(F.subs(x, x0))}')

# e44: f'' = 12x - 6, f'(1) = 3, f(0) = 1
f44 = leer(EJ['e44']['check']['expr'])
comprobar('e44 f\'\'', sp.simplify(diff(f44, x, 2) - (12*x - 6)) == 0)
comprobar('e44 f\'(1)=3 y f(0)=1', diff(f44, x).subs(x, 1) == 3 and f44.subs(x, 0) == 1)
exprs['e44'] = (EJ['e44']['check']['expr'], EJ['e44']['check']['dom'])
# e45: F=(ax+b)e^(2x) primitiva de (6x+5)e^(2x)
a, b = symbols('a b')
sol = sp.solve(sp.Poly(sp.expand(diff((a*x + b)*E**(2*x), x)/E**(2*x) - (6*x + 5)), x).all_coeffs(), [a, b])
c45 = {k['etiqueta']: k['valor'] for k in EJ['e45']['check']}
comprobar('e45 a,b', sol == {a: 3, b: 1} and c45 == {'a =': 3, 'b =': 1})
# e47: F(e) con F(1)=0, f = ln x / x^2
F47 = -(L(x) + 1)/x + 1
prim('e47 F\'=f', F47, L(x)/x**2, (0.6, 1.3, 3.0))
comprobar('e47 F(1)=0 y valor', F47.subs(x, 1) == 0 and abs(float(F47.subs(x, E)) - EJ['e47']['check']['valor']) < 1e-12 and abs(EJ['e47']['check']['valor'] - 0.2642411) < 1e-6)
# e14: la opción correcta es √x
k14 = EJ['e14']['check']; opts = k14['opciones']
comprobar('e14', opts[k14['ok']] == '√x' and sp.simplify(diff(sqrt(x), x) - 1/(2*sqrt(x))) == 0 and
          sp.simplify(diff(2*sqrt(x), x) - 1/(2*sqrt(x))) != 0 and sp.simplify(diff(L(sqrt(x)), x) - 1/(2*sqrt(x))) != 0)
# e48: u = ln x, v = x^3/3, integral nueva = x^2/3, resultado (x^3/3)ln x - x^3/9
prim('e48 resultado', x**3/3*L(x) - x**3/9, x**2*L(x), (0.6, 1.3, 3.0))
comprobar('e48 opción', EJ['e48']['check']['opciones'][EJ['e48']['check']['ok']].startswith('u = ln x'))

# La web y sympy leen igual cada expresión: se evalúan en 7 puntos del dominio y se comparan
script = r"""
const fs=require('fs'),vm=require('vm');
const sb={console,document:{addEventListener(){},getElementById:()=>null,head:{appendChild(){}},createElement:()=>({style:{},setAttribute(){},appendChild(){}}),createElementNS:()=>({setAttribute(){},appendChild(){}})},matchMedia:()=>({matches:false}),localStorage:{getItem:()=>null,setItem(){}},requestAnimationFrame(){}};
sb.window=sb;vm.createContext(sb);
vm.runInContext(fs.readFileSync(process.argv[1]+'/ampliaciones/bachi.js','utf8'),sb);
const M=sb.BACHI.Mate, ent=JSON.parse(fs.readFileSync(0,'utf8')), sal={};
for(const k in ent){const [ex,dom]=ent[k];const r=M.compilar(ex);const v=[];
 for(let i=0;i<7;i++){const t=dom[0]+(dom[1]-dom[0])*(i+0.37)/7;v.push([t,r.ok?r.f(t):null]);}
 sal[k]=v;}
process.stdout.write(JSON.stringify(sal));
"""
out = subprocess.run(['node', '-e', script, raiz], input=json.dumps(exprs), capture_output=True, text=True)
vals = json.loads(out.stdout)
for i, pares in vals.items():
    F = leer(exprs[i][0])
    bien = True
    for t, v in pares:
        try: s = complex(sp.N(F.subs(x, t)))
        except TypeError: print('NO EVALUABLE', i, t, F.subs(x, t)); bien = False; continue
        if v is None or abs(s.imag) > 1e-9 or abs(s.real - v) > 1e-7 * max(1, abs(v)): bien = False
    comprobar(f'{i} lectura web = lectura sympy', bien)

# ================================================================= TEORÍA: ejemplos resueltos
S = (0.3, 1.1, 2.0)
# sección 1
prim('t1 F=2x3-2x2+x+2', 2*x**3 - 2*x**2 + x + 2, 6*x**2 - 4*x + 1, S)
comprobar('t1 F(1)=3', (2*x**3 - 2*x**2 + x + 2).subs(x, 1) == 3)
f1 = x**3 - x**2 + x + 3
comprobar('t1 f\'\'=6x-2, f\'(0)=1, f(0)=3', sp.expand(diff(f1, x, 2) - (6*x - 2)) == 0 and diff(f1, x).subs(x, 0) == 1 and f1.subs(x, 0) == 3)
# sección 2: tabla y ejemplos
aa = symbols('aa', positive=True)
comprobar('tabla a^x', sp.simplify(diff(aa**x/log(aa), x) - aa**x) == 0)
comprobar('tabla 1/cos2', sp.simplify(diff(tan(x), x) - 1/cos(x)**2) == 0 and sp.simplify(1/cos(x)**2 - 1 - tan(x)**2) == 0)
prim('tabla arcsen', asin(x), 1/sqrt(1 - x**2), (0.2, 0.5, 0.8))
prim('t2 sqrt+3/x2-5/x', Q(2, 3)*x*sqrt(x) - 3/x - 5*L(x), sqrt(x) + 3/x**2 - 5/x)
prim('t2 x2(x3+5)^4', (x**3 + 5)**5/15, x**2*(x**3 + 5)**4)
prim('t2 (2x+3)/(x2+3x-1)', L(x**2 + 3*x - 1), (2*x + 3)/(x**2 + 3*x - 1))
prim('t2 x e^-x2', -E**(-x**2)/2, x*E**(-x**2), S)
prim('t2 cos3x', sin(3*x)/3, cos(3*x), S)
prim('t2 1/(1+4x2)', atan(2*x)/2, 1/(1 + 4*x**2), S)
prim('t2 ln2/x', L(x)**3/3, L(x)**2/x)
prim('t2 1/(x ln x)', L(L(x)), 1/(x*L(x)), (1.5, 2.2, 3.7))
prim('t2 x/sqrt(1-x2)', -sqrt(1 - x**2), x/sqrt(1 - x**2), (0.2, 0.5, 0.8))
# sección 3
prim('t3 x sqrt(x+1)', Q(2, 5)*(x + 1)**Q(5, 2) - Q(2, 3)*(x + 1)**Q(3, 2), x*sqrt(x + 1), S)
prim('t3 1/(e^x+1)', x - L(E**x + 1), 1/(E**x + 1), S)
prim('t3 1/(sqrt x(1+sqrt x))', 2*L(1 + sqrt(x)), 1/(sqrt(x)*(1 + sqrt(x))))
prim('t3 cos/(1+sen2)', atan(sin(x)), cos(x)/(1 + sin(x)**2), S)
prim('t3 e^sqrt x', 2*(sqrt(x) - 1)*E**sqrt(x), E**sqrt(x))
u = symbols('u')
comprobar('t3 e^u: ∫2u e^u = 2(u-1)e^u', sp.simplify(diff(2*(u - 1)*E**u, u) - 2*u*E**u) == 0)
comprobar('t3 1/(u(u+1)) = 1/u - 1/(u+1)', sp.simplify(1/(u*(u + 1)) - (1/u - 1/(u + 1))) == 0)
# sección 4
prim('t4 x ln x', x**2/2*L(x) - x**2/4, x*L(x))
prim('t4 x2 e^x', E**x*(x**2 - 2*x + 2), x**2*E**x, S)
prim('t4 x2 sen x', -x**2*cos(x) + 2*x*sin(x) + 2*cos(x), x**2*sin(x), S)
prim('t4 ln x', x*L(x) - x, L(x))
prim('t4 arctg x', x*atan(x) - L(1 + x**2)/2, atan(x), S)
prim('t4 e^x sen x', E**x*(sin(x) - cos(x))/2, E**x*sin(x), S)
prim('t4 x e^x', (x - 1)*E**x, x*E**x, S)
# sección 5: racionales
prim('t5 1/(x2-1)', L((x - 1)/(x + 1))/2, 1/(x**2 - 1))
prim('t5 (x3+2)/(x2-1)', x**2/2 + Q(3, 2)*L(x - 1) - L(x + 1)/2, (x**3 + 2)/(x**2 - 1))
comprobar('t5 división x3+2', sp.div(x**3 + 2, x**2 - 1, x) == (x, x + 2))
prim('t5 1/(x3-2x2-x+2)', -L(x - 1)/2 + L(x + 1)/6 + L(x - 2)/3, 1/(x**3 - 2*x**2 - x + 2), (2.5, 3.2, 4.0))
comprobar('t5 Ruffini', sp.expand((x - 1)*(x + 1)*(x - 2)) == x**3 - 2*x**2 - x + 2)
prim('t5 (x2+1)/((x-1)^2(x+1))', L(x - 1)/2 - 1/(x - 1) + L(x + 1)/2, (x**2 + 1)/((x - 1)**2*(x + 1)), (1.5, 2.2, 3.7))
prim('t5 1/(x2+2x+5)', atan((x + 1)/2)/2, 1/(x**2 + 2*x + 5), S)
prim('t5 (2x+3)/(x2+2x+5)', L(x**2 + 2*x + 5) + atan((x + 1)/2)/2, (2*x + 3)/(x**2 + 2*x + 5), S)
prim('t5 4/((x-1)(x2+1))', 2*L(x - 1) - L(x**2 + 1) - 2*atan(x), 4/((x - 1)*(x**2 + 1)), (1.5, 2.2, 3.7))
prim('t5 x2/(x+1)', x**2/2 - x + L(x + 1), x**2/(x + 1), S)
# 5: tarjeta de la fracción irreducible: Δ y cuadrado completado
comprobar('t5 x2+2x+5=(x+1)^2+4 y Δ<0', sp.expand((x + 1)**2 + 4) == x**2 + 2*x + 5 and 2**2 - 4*5 < 0)
# sección 6: trigonométricas
prim('t6 sen2', x/2 - sin(2*x)/4, sin(x)**2, S)
prim('t6 cos3', sin(x) - sin(x)**3/3, cos(x)**3, S)
prim('t6 tg2', tan(x) - x, tan(x)**2, (0.3, 0.7, 1.1))
prim('t6 tg', -L(cos(x)), tan(x), (0.3, 0.7, 1.1))
prim('t6 sen cos (a)', sin(x)**2/2, sin(x)*cos(x), S)
prim('t6 sen cos (b)', -cos(x)**2/2, sin(x)*cos(x), S)
prim('t6 sen cos (c)', -cos(2*x)/4, sin(x)*cos(x), S)
comprobar('t6 sen2/2 = -cos2/2 + 1/2', sp.simplify(sin(x)**2/2 - (-cos(x)**2/2 + Q(1, 2))) == 0)
# sección 7
prim('t7 x/(x2+1)', L(x**2 + 1)/2, x/(x**2 + 1), S)
prim('t7 x arctg x', x**2/2*atan(x) - x/2 + atan(x)/2, x*atan(x), S)
prim('t7 x2/(x2+1)', x - atan(x), x**2/(x**2 + 1), S)
# sección 8
Fa = 2 - (x + 1)*E**(-x)
prim('t8 x e^-x por (0,1)', Fa, x*E**(-x), S)
comprobar('t8 F(0)=1', Fa.subs(x, 0) == 1)
sol8 = sp.solve(sp.Poly(sp.expand(diff((a*x + b)*E**x, x)/E**x - (2*x + 3)), x).all_coeffs(), [a, b])
comprobar('t8 a=2,b=1', sol8 == {a: 2, b: 1})
d8 = sp.simplify(diff(x**2/2 + Q(3, 2)*L(x - 1) - L(x + 1)/2, x) - (x**3 + 2)/(x**2 - 1))
comprobar('t8 comprobación', d8 == 0)

# ================================================================= SIMULADORES
lab = open(os.path.join(raiz, 'ampliaciones/lab_mates2_t11.js'), encoding='utf8').read()
# m2_familia: F' = f en cada preset
FAM = [(2*x - 3, x**2 - 3*x), (3*x**2 - 4*x + 1, x**3 - 2*x**2 + x), (cos(x), sin(x)), (1/x, L(x)), (x*E**x, (x - 1)*E**x)]
for k, (f, F) in enumerate(FAM): prim(f'familia {k}', F, f, S)
# m2_partes: u, du, dv, v de cada opción (escritos aquí a mano, independientes de la web)
PT = [  # (integrando, [(u, du/dx, dv/dx, v)])
 (x*E**x, [(x, 1, E**x, E**x), (E**x, E**x, x, x**2/2)]),
 (x*L(x), [(L(x), 1/x, x, x**2/2), (x, 1, L(x), x*L(x) - x)]),
 (x**2*sin(x), [(x**2, 2*x, sin(x), -cos(x)), (sin(x), cos(x), x**2, x**3/3)]),
 (atan(x), [(atan(x), 1/(1 + x**2), 1, x)]),
 (E**x*cos(x), [(cos(x), -sin(x), E**x, E**x), (E**x, E**x, cos(x), sin(x))]),
]
n = 0
for f, ops in PT:
    for (u_, du_, dv_, v_) in ops:
        n += 1
        comprobar(f'partes {n}: u·dv = f, u\' = du, v\' = dv', sp.simplify(u_*dv_ - f) == 0 and sp.simplify(diff(u_, x) - du_) == 0 and sp.simplify(diff(v_, x) - dv_) == 0)
PRES = [((x - 1)*E**x, x*E**x), (x**2/2*L(x) - x**2/4, x*L(x)), (-x**2*cos(x) + 2*x*sin(x) + 2*cos(x), x**2*sin(x)),
        (x*atan(x) - L(1 + x**2)/2, atan(x)), (E**x*(sin(x) + cos(x))/2, E**x*cos(x))]
for k, (F, f) in enumerate(PRES): prim(f'partes resultado {k}', F, f, S)
# "nueva integral" de la opción buena: coherencia de la reducción
comprobar('partes x ln x: ∫(x²/2)(1/x) = ∫x/2', sp.simplify(x**2/2*(1/x) - x/2) == 0)
comprobar('partes x2 sen: -x2 cos + 2∫x cos', sp.simplify(diff(-x**2*cos(x) + 2*(x*sin(x) + cos(x)), x) - x**2*sin(x)) == 0)
comprobar('partes e^x cos: eˣcos x + ∫eˣsen x con ∫eˣsen x = eˣsen x - I da 2I = eˣ(sen+cos)',
          sp.simplify(E**x*cos(x) + (E**x*sin(x) - E**x*(sin(x) + cos(x))/2) - E**x*(sin(x) + cos(x))/2) == 0)
# m2_fracciones: valores de A, B, C del simulador, leídos del archivo de la web y recalculados con apart
sols = [[float(v) for v in re.split(r',\s*', m)] for m in re.findall(r'sol: \[([^\]]*)\]', lab)]
CASOS = [  # (fracción, descomposición con parámetros)
 ((5*x + 1)/((x - 1)*(x + 2)), lambda p: p[0]/(x - 1) + p[1]/(x + 2)),
 ((x**2 + 1)/(x**2 - x), lambda p: p[0] + p[1]/x + p[2]/(x - 1)),
 ((x**2 + 1)/((x - 1)**2*(x + 1)), lambda p: p[0]/(x - 1) + p[1]/(x - 1)**2 + p[2]/(x + 1)),
 ((2*x + 1)/(x**2*(x + 1)), lambda p: p[0]/x + p[1]/x**2 + p[2]/(x + 1)),
 (4/((x - 1)*(x**2 + 1)), lambda p: p[0]/(x - 1) + (p[1]*x + p[2])/(x**2 + 1)),
]
comprobar('fracciones: 5 casos en el archivo', len(sols) == 5, str(sols))
for k, ((f, forma), p) in enumerate(zip(CASOS, sols)):
    comprobar(f'fracciones caso {k}: descomposición correcta', sp.simplify(f - forma([Q(v).limit_denominator(100) for v in p])) == 0)
# resultados integrados del simulador
FRR = [(2*L(x - 1) + 3*L(x + 2), (5*x + 1)/((x - 1)*(x + 2))), (x - L(x) + 2*L(x - 1), (x**2 + 1)/(x**2 - x)),
       (L(x - 1)/2 - 1/(x - 1) + L(x + 1)/2, (x**2 + 1)/((x - 1)**2*(x + 1))), (L(x) - 1/x - L(x + 1), (2*x + 1)/(x**2*(x + 1))),
       (2*L(x - 1) - L(x**2 + 1) - 2*atan(x), 4/((x - 1)*(x**2 + 1)))]
for k, (F, f) in enumerate(FRR): prim(f'fracciones resultado {k}', F, f, (1.5, 2.2, 3.7))
# la división del caso 2 del simulador
comprobar('fracciones: x2+1 = 1·(x2-x) + (x+1)', sp.expand(x**2 + 1 - (x**2 - x) - (x + 1)) == 0)

# ================================================================= ACTIVIDADES
prim('quiz1 ∫e^{2x}', E**(2*x)/2, E**(2*x), S)
prim('quiz1 ∫(3x2-4x+5)', x**3 - 2*x**2 + 5*x, 3*x**2 - 4*x + 5, S)
prim('quiz1 ∫ln x', x*L(x) - x, L(x))
prim('quiz1 ∫tg2', tan(x) - x, tan(x)**2, (0.3, 0.7, 1.1))
comprobar('quiz1 (1,5) con 2x', (x**2 + 4).subs(x, 1) == 5 and diff(x**2 + 4, x) == 2*x)
comprobar('quiz1 Δ de x2+x+1', 1 - 4 < 0)
comprobar('errores: (x2+1)^4 deriva 8x(x2+1)^3', sp.simplify(diff((x**2 + 1)**4, x) - 8*x*(x**2 + 1)**3) == 0)
comprobar('errores: (x2/2)e^x deriva ≠ x e^x', sp.simplify(diff(x**2/2*E**x, x) - x*E**x) != 0)
comprobar('errores: arctg(x/2) deriva 2/(x2+4)', sp.simplify(diff(atan(x/2), x) - 2/(x**2 + 4)) == 0)
comprobar('errores: ln|cos| deriva -tg', sp.simplify(diff(L(cos(x)), x) + tan(x)) == 0)
comprobar('errores: ∫1/x2 = -1/x', diff(-1/x, x) == 1/x**2)
prim('empar e^(x2)', E**(x**2), 2*x*E**(x**2), S)
prim('empar ln(x2+x)', L(x**2 + x), (2*x + 1)/(x**2 + x), S)
prim('empar sen2x/2', sin(2*x)/2, cos(2*x), S)
prim('empar arctg(x/3)/3', atan(x/3)/3, 1/(x**2 + 9), S)
prim('empar sen2/2', sin(x)**2/2, sin(x)*cos(x), S)

# ================================================================= ESTRUCTURA
niv = {1: 0, 2: 0, 3: 0}
for e in T['ejercicios']: niv[e['nivel']] += 1
comprobar('nº ejercicios', len(EJ) == len(T['ejercicios']) == 48 and niv == {1: 14, 2: 16, 3: 18}, str(niv))
print(f'{ok} comprobaciones correctas, {len(fallos)} fallos' if not fallos else '\n'.join(fallos) + f'\n{ok} comprobaciones correctas, {len(fallos)} fallos')
