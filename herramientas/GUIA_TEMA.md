# Guía rápida para ampliar un tema (léela entera; evita tener que leer archivos grandes)

Regla de oro del proyecto: **solo AÑADIR**. Nunca cambiar ni quitar lo original de `pagina.html`, salvo errores conceptuales reales. La teoría se **desarrolla más**, nunca se recorta.

## Estructura
- `ampliaciones/contenido/<asig>_tNN.js` → el contenido del tema (uno o varios archivos por tema; se cargan por orden alfabético).
- `ampliaciones/lab_<nombre>.js` → motores y simuladores (`B.w.<nombre> = function (host) {…}`), uno por familia de temas.
- `sh build.sh` regenera `ampliaciones/bachi.js`, `index.html` y `pagina-autonoma.html`. **No edites esos tres a mano ni los commitees en tu rama de trabajo.**
- Orden de carga: `grafica nucleo ui actividades`, `lab_*.js`, `contenido/*.js`.

## Registrar un tema (`B.registrar(asig, "tN", {…})`, sobrescribe por tema)
```js
var B = global.BACHI, H = B.h, fr = H.fr, ejemplo = H.ejemplo, ojo = H.ojo;
function w(n, ref) { return H.w(n, ref && "fyq1/t2/" + ref); }   // ref = clave en `datos`
var secciones = {};            // índice de sección ORIGINAL → HTML que se AÑADE al final (secciones[0] += "…")
var nuevas = [{ h: "8. Título", html: "…" }];   // secciones nuevas (el h lleva su número)
var datos = { errores: {…}, quiz1: {…} };       // datos de actividades (ver abajo)
var ejercicios = [{ id, nivel: 1|2|3, enunciado, check, pistas: [], pasos: [], resultado }];
var lamina = [{ titulo, items|pasos|tabla|errores, nota }];
B.registrar("asig", "tN", { resumen: [], secciones, nuevas, datos, ejercicios, lamina });
B.registrarSimulacros("asig", [{ id: "sim9", titulo, tipo: "ciencias", bloques: [{ titulo, puntos, enunciado, solucion }] }]); // acumulativo
```
Si el tema ya tiene archivo, **amplíalo** (`secciones[i] +=`, `nuevas.splice(k,0,…)`, `ejercicios.push`, `datos.x.preguntas.push`) antes del `B.registrar`. Renumera solo los títulos de «¿Qué falla aquí?» y «Autocomprobación».

## Helpers de texto
`ejemplo("Título", "Enunciado", ["paso 1", "paso 2"])` · `ojo("aviso")` · `fr("num", "den")` (fracción) · `H.formula("…")` · `H.w("nombre", ref)` monta un widget. HTML libre: `<b>`, `<sub>`, `<sup>`, `&lt;`, `&gt;`, tablas `class='lamina-table'`, `<div class='formula-wrap'><div class='formula'>…</div></div>`.

## Comprobaciones de ejercicio (`check`, objeto o lista de objetos)
`{tipo:"num", etiqueta, valor, tol?, unidad?, ph?}` (tolerancia relativa 0,5 % por defecto) · `{tipo:"expr", etiqueta, expr:"2n+1", dom?, enteros?}` (equivalencia algebraica; `enteros:true` si hay (−1)ⁿ) · `{tipo:"lista", etiqueta, valores:[…]}` (orden indiferente) · `{tipo:"opcion", etiqueta, opciones:[…], ok:índice}` (se barajan solas) · `{tipo:"rubrica", etiqueta, filas, items:[{t,p}]}` (demostraciones).

## Datos de actividades (clave en `datos`, se usa con `w("tipo", "clave")`)
- `quiz`: `{titulo, preguntas:[{q, op:[…], ok, porque}]}` (se barajan).
- `tarjetas`: `{titulo, cartas:[{a, b}]}`.
- `emparejar`: `{titulo, consigna, pares:[[a,b],…]}`.
- `clasificar`: `{titulo, consigna, categorias:[…], items:[{t, c}]}`.
- `orden`: `{titulo, consigna, items:[{t, nota?}]}` (en el orden correcto).
- «Encuentra el error»: es un `quiz` llamado `errores`.

## Escribir un simulador (`lab_*.js`)
```js
B.w.nombre = function (host) {
  var cuerpo = B.caja(host, "Pruébalo", "Título");               // tarjeta con cabecera
  cuerpo.innerHTML = '<div data-ctl></div><div class="w-plot"></div><div class="lectura anch"></div><p class="w-pie"></p>';
  var ctl = U.ctl(cuerpo.querySelector("[data-ctl]"));
  U.slider(ctl, { et: "Etiqueta", min, max, step, val, on: function (v) {…}, fmt: function (v) { return fmt(v, 1); } });
  U.fichas(el, [{k, t}], kInicial, function (k) {…});             // botones de preset
  var g = new B.Plot(cuerpo.querySelector(".w-plot"), { xmin, xmax, ymin, ymax, w: 600, h: 300, etx, ety, etiqueta });
  // g.limpiar() g.rango() g.curva() g.polilinea(pts,{clase:"c-pen"}) g.punto() g.texto() g.horizontal() g.segmento() g.rect() g.rangoIso(cx,cy,semi)
};
```
Clases de color: `c-pen` (azul), `c-ok` (verde), `c-red`, `c-faint`; zonas `z-ok`, `z-pen`. Lecturas con `F.fil(etiqueta, valor, clase)` (de `B.lab.fun`). `B.fmt(x, dec)` usa coma decimal. **Etiquetas cortas** (móvil de 390 px sin desborde horizontal). Usa variables de color del tema (modo oscuro automático): nunca colores fijos.

## Flujo de trabajo por tema (objetivos mínimos)
≈ 6–8 mil palabras añadidas, ≥ 40 ejercicios (★ ★★ ★★★ y con pasos), ≥ 10 simuladores/actividades, láminas nuevas, test + tarjetas + «encuentra el error».
1. Leer lo original: `node herramientas/pruebas/leer.js <asig> tN` (corto).
2. Escribir motor y widgets → `sh build.sh` → `node herramientas/pruebas/e2e_montaje.js claro escritorio w1,w2 pref` (y `oscuro movil`); mirar capturas **solo de los tipos de widget nuevos**.
3. Escribir el contenido (parche con `python3`, no reescribir archivos enteros).
4. Pruebas automáticas (salida corta, usa `| tail`):
   - `node herramientas/pruebas/e2e_ejercicios.js <asig> tN` → todos los ejercicios aceptan su respuesta correcta.
   - `node herramientas/pruebas/e2e_tema.js <asig> tN <pref> escritorio` y `… movil` → widgets montan, sin desborde, sin errores JS.
   - `node herramientas/pruebas/e2e_regresion.js` → lo original no cambia.
5. Verificación independiente (sympy, sin compartir código con la web): `node herramientas/volcar_ampliaciones.js > /tmp/ampl.json` y `python3 herramientas/verificar_<…>.py /tmp/ampl.json`. Cada cifra de un ejemplo, ejercicio o simulacro se recalcula. **Ha cazado errores reales: no omitir.**
6. Commit en tu rama (trailers `Co-Authored-By` y `Claude-Session` como pide el sistema). Sin push ni PR.

## Ahorro de tokens (importante)
- No releas archivos enteros: `grep -n` + `sed -n a,bp`. No pegues salidas largas (`| tail -5`).
- No hagas más de un ciclo de capturas por widget; confía en las pruebas automáticas para móvil y errores.
- Para terminar un tema basta con cumplir los objetivos de arriba y que todo pase; no pulir sin fin.
- Los archivos generados (`bachi.js`, `index.html`, `pagina-autonoma.html`) no se commitean en ramas de trabajo.
