// Genera el vault de Obsidian «Bachi Firu» con el mismo contenido que pagina.html.
// Uso:  node obsidian/generar.js
// Crea obsidian/Bachi Firu/ (lo borra antes si ya existía). No toca nada más.
"use strict";
const fs = require("fs");
const path = require("path");
const D = require("./datos.js")();

const SALIDA = path.join(__dirname, "Bachi Firu");
const MATES = []; // todas las fórmulas LaTeX generadas, para comprobarlas con MathJax

// ============================================================
// HTML de los datos → árbol sencillo
// ============================================================
const TAGS = new Set(["p", "b", "strong", "em", "i", "br", "ul", "ol", "li", "table", "tbody", "tr", "td", "th", "div", "span", "sub", "sup"]);

function decode(s) {
  return s.replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
}

function parse(html) {
  const root = { tag: "root", cls: [], children: [] };
  const stack = [root];
  const re = /<(\/?)([a-z0-9]+)((?:\s+[a-z-]+=(?:'[^']*'|"[^"]*"))*)\s*\/?>/gi;
  let last = 0, m;
  const texto = function (s) { if (s) stack[stack.length - 1].children.push({ text: decode(s) }); };
  while ((m = re.exec(html))) {
    const tag = m[2].toLowerCase();
    if (!TAGS.has(tag)) continue; // "x<0 ..." y similares se quedan como texto
    texto(html.slice(last, m.index));
    last = re.lastIndex;
    if (m[1]) {
      for (let i = stack.length - 1; i > 0; i--) if (stack[i].tag === tag) { stack.length = i; break; }
    } else {
      const c = /class=['"]([^'"]*)['"]/.exec(m[3]);
      const node = { tag: tag, cls: c ? c[1].split(/\s+/) : [], children: [] };
      stack[stack.length - 1].children.push(node);
      if (tag !== "br") stack.push(node);
    }
  }
  texto(html.slice(last));
  return root;
}

const tiene = (n, c) => n.cls && n.cls.indexOf(c) >= 0;
const hijo = (n, c) => n.children.filter(h => tiene(h, c))[0] || { children: [] };
const esMates = n => n.tag === "span" && (tiene(n, "frac") || tiene(n, "radical") || tiene(n, "matrix")) ||
  (n.tag === "sup" && tiene(n, "radical-index"));
const BLOQUES = new Set(["p", "ul", "ol", "table", "div"]);

// ============================================================
// Matemáticas → LaTeX (MathJax de Obsidian)
// ============================================================
const TEX_ESPECIAL = {
  "{": "\\{", "}": "\\}", "\\": "\\backslash ", "%": "\\%", "#": "\\#", "$": "\\$", "&": "\\&",
  "_": "\\_", "^": "\\hat{}", "|": "\\vert ", "~": "\\sim ", "<": "\\lt ", ">": "\\gt "
};
function texTexto(s) {
  return s.split(/([  ]{2,}|[{}\\%#$&_^|~<>])/).map(function (trozo) {
    if (!trozo) return "";
    if (/^[  ]{2,}$/.test(trozo)) return "\\quad ";
    if (TEX_ESPECIAL[trozo]) return TEX_ESPECIAL[trozo];
    return "\\text{" + trozo.replace(/ /g, " ") + "}";
  }).join("");
}

function tex(nodos, display) {
  let out = "";
  for (let i = 0; i < nodos.length; i++) {
    const n = nodos[i];
    if (n.text != null) { out += texTexto(n.text); continue; }
    if (tiene(n, "frac")) {
      out += (display ? "\\dfrac{" : "\\frac{") + tex(hijo(n, "num").children, display) + "}{" + tex(hijo(n, "den").children, display) + "}";
    } else if (n.tag === "sup" && tiene(n, "radical-index") && nodos[i + 1] && tiene(nodos[i + 1], "radical")) {
      out += "\\sqrt[" + tex(n.children) + "]{" + tex(hijo(nodos[i + 1], "radical-body").children, display) + "}";
      i++;
    } else if (tiene(n, "radical")) {
      out += "\\sqrt{" + tex(hijo(n, "radical-body").children, display) + "}";
    } else if (tiene(n, "matrix")) {
      const filas = n.children.filter(f => tiene(f, "matrix-row")).map(f =>
        f.children.filter(c => tiene(c, "matrix-cell")).map(c => tex(c.children)).join(" & "));
      out += "\\begin{pmatrix}" + filas.join(" \\\\ ") + "\\end{pmatrix}";
    } else if (n.tag === "sub" || n.tag === "sup") {
      out += (out && !/\\quad $/.test(out) ? "" : "{}") + (n.tag === "sub" ? "_{" : "^{") + tex(n.children) + "}";
    } else if (n.tag === "br") {
      out += "\\quad ";
    } else {
      out += tex(n.children, display);
    }
  }
  return out;
}

function mates(nodos, display) {
  const t = tex(nodos, display);
  MATES.push(t);
  return t;
}

// ============================================================
// HTML → Markdown de Obsidian
// ============================================================
// Negrita y cursiva se marcan con caracteres de control y se resuelven al final,
// cuando ya se ve lo que hay alrededor (** junto a letras y signos no siempre funciona).
const B1 = "", B2 = "", E1 = "", E2 = "";

function escTexto(s, ctx) {
  s = s.replace(/\[\[/g, "\\[\\[").replace(/\]\]/g, "\\]\\]").replace(/<(?=[A-Za-z\/!])/g, "\\<");
  if (ctx && ctx.tabla) s = s.replace(/\|/g, "\\|");
  return s;
}

function inl(nodos, ctx) {
  ctx = ctx || {};
  let out = "";
  for (let i = 0; i < nodos.length; i++) {
    const n = nodos[i];
    if (n.text != null) { out += escTexto(n.text, ctx); continue; }
    if (esMates(n)) {
      const grupo = [n];
      while (nodos[i + 1] && esMates(nodos[i + 1])) grupo.push(nodos[++i]);
      if (n.tag === "sup" && grupo.length === 1 && nodos[i + 1]) grupo.push(nodos[++i]);
      out += "$" + mates(grupo, false) + "$";
    } else if (n.tag === "b" || n.tag === "strong") {
      out += B1 + inl(n.children, ctx) + B2;
    } else if (n.tag === "em" || n.tag === "i") {
      out += E1 + inl(n.children, ctx) + E2;
    } else if (n.tag === "br") {
      out += ctx.brHtml ? "<br>" : "\n";
    } else if (n.tag === "sub" || n.tag === "sup") {
      out += "<" + n.tag + ">" + inl(n.children, ctx) + "</" + n.tag + ">";
    } else {
      out += inl(n.children, ctx);
    }
  }
  return out;
}

const ALNUM = /[\p{L}\p{N}]/u;
function resolverMarcas(s) {
  function envolver(re, marca, tag) {
    let cambio = true;
    while (cambio) {
      cambio = false;
      s = s.replace(re, function (m, dentro, pos, todo) {
        cambio = true;
        const antes = todo[pos - 1] || "", despues = todo[pos + m.length] || "";
        const ini = dentro.match(/^\s*/)[0], fin = dentro.match(/\s*$/)[0], nucleo = dentro.trim();
        if (!nucleo) return dentro;
        const choca = (!ini && ALNUM.test(antes) && !ALNUM.test(nucleo[0])) ||
          (!fin && ALNUM.test(despues) && !ALNUM.test(nucleo[nucleo.length - 1]));
        return ini + (choca ? "<" + tag + ">" + nucleo + "</" + tag + ">" : marca + nucleo + marca) + fin;
      });
    }
  }
  envolver(/([^-]*)/g, "*", "i");
  envolver(/([^]*)/g, "**", "b");
  return s.replace(/[-]/g, "");
}

// Evita que una línea de texto se lea como lista, título o cita.
function escInicioLinea(s) {
  return s.split("\n").map(l => l.replace(/^(\s*)(\d+)([.)])(\s)/, "$1$2\\$3$4").replace(/^(\s*)([-+*#>])(\s|$)/, "$1\\$2$3")).join("\n");
}

function parrafo(nodos, ctx) {
  return escInicioLinea(resolverMarcas(inl(nodos, ctx)).replace(/[ \t]+\n/g, "\n").trim());
}

function celda(nodos) {
  return resolverMarcas(inl(nodos, { tabla: true, brHtml: true })).replace(/\n/g, "<br>").trim() || " ";
}

function tabla(filas) {
  // Las tablas de los apuntes no tienen cabecera: se deja vacía y el CSS la oculta.
  const n = Math.max.apply(null, filas.map(f => f.length));
  const linea = celdas => "| " + celdas.concat(Array(n - celdas.length).fill(" ")).join(" | ") + " |";
  return [linea(Array(n).fill(" ")), linea(Array(n).fill("---"))].concat(filas.map(linea)).join("\n");
}

const TIPO_POSTIT = [
  [/ejemplo|compru[eé]balo|caso/i, "ejemplo"],
  [/truco|consejo|clave|recuerda|regla|pista|examen|memoriza|resumen/i, "truco"],
  [/error|ojo|cuidado|atenci[oó]n|no confund|trampa/i, "ojo"]
];

function citar(texto) {
  return texto.split("\n").map(l => l ? "> " + l : ">").join("\n");
}

function callout(tipo, titulo, cuerpo, plegado) {
  return "> [!" + tipo + "]" + (plegado || "") + (titulo ? " " + titulo : "") + (cuerpo ? "\n" + citar(cuerpo) : "");
}

function postit(n) {
  const hijos = n.children.slice();
  let titulo = "";
  while (hijos[0] && hijos[0].text != null && !hijos[0].text.trim()) hijos.shift();
  if (hijos[0] && hijos[0].tag === "b") {
    const t = resolverMarcas(inl(hijos[0].children)).trim();
    if (/:$/.test(t) && t.length < 70) {
      titulo = t.replace(/:$/, "");
      hijos.shift();
      // Sin el título delante, el texto empieza en mayúscula («antes de…» → «Antes de…»)
      if (hijos[0] && hijos[0].text != null) hijos[0] = { text: hijos[0].text.replace(/^\s+/, "").replace(/^[a-záéíóúñ]/, c => c.toUpperCase()) };
    }
  }
  let tipo = "postit";
  for (const [re, t] of TIPO_POSTIT) if (re.test(titulo)) { tipo = t; break; }
  ESTADISTICA.postits[tipo + " · " + titulo] = (ESTADISTICA.postits[tipo + " · " + titulo] || 0) + 1;
  return callout(tipo, titulo, bloques(hijos).join("\n\n"));
}

function lista(n) {
  let k = 0;
  return n.children.filter(h => h.tag === "li").map(function (li) {
    k++;
    const marca = n.tag === "ol" ? k + ". " : "- ";
    const partes = bloques(li.children, { brHtml: true });
    return marca + partes.join("\n\n").split("\n").join("\n" + " ".repeat(marca.length));
  }).join("\n");
}

function bloques(nodos, ctx) {
  const out = [];
  let suelto = [];
  const vaciar = function () {
    if (suelto.length) { const p = parrafo(suelto, ctx); if (p) out.push(p); suelto = []; }
  };
  for (const n of nodos) {
    if (n.text != null || !BLOQUES.has(n.tag)) { suelto.push(n); continue; }
    vaciar();
    if (n.tag === "p") { const p = parrafo(n.children, ctx); if (p) out.push(p); }
    else if (n.tag === "ul" || n.tag === "ol") out.push(lista(n));
    else if (n.tag === "table") {
      const filas = [];
      (function recoger(x) { x.children.forEach(h => h.tag === "tr" ? filas.push(h.children.filter(c => c.tag === "td" || c.tag === "th").map(c => celda(c.children))) : h.children && recoger(h)); })(n);
      out.push(tabla(filas));
    }
    else if (tiene(n, "callout")) out.push(postit(n));
    else if (tiene(n, "formula-wrap") || tiene(n, "formula")) out.push("$$\n" + mates(tiene(n, "formula") ? n.children : hijo(n, "formula").children, true) + "\n$$");
    else out.push.apply(out, bloques(n.children, ctx));
  }
  vaciar();
  return out;
}

function md(html) { return bloques(parse(html || "").children).join("\n\n"); }
function mdLinea(html) { return resolverMarcas(inl(parse(html || "").children)).trim(); }

// Texto plano con párrafos separados por línea en blanco (textos de comentario e inglés).
function textoPlano(s, ctx) {
  const ps = s.split(/\n{2,}/).map(p => escInicioLinea(escTexto(p.trim(), ctx))).filter(Boolean);
  // Si empieza con un titular (línea corta sin punto final), va en negrita
  if (ps.length > 1 && ps[0].length < 100 && !/\.$/.test(ps[0])) ps[0] = "**" + ps[0] + "**";
  return ps.join("\n\n");
}

// ============================================================
// Utilidades de ficheros y formato
// ============================================================
const ESTADISTICA = { notas: 0, postits: {} };

function nombreArchivo(s) {
  return s.replace(/:/g, " -").replace(/[\\/*?"<>|#^\[\]]/g, "").replace(/\s+/g, " ").trim().replace(/\.+$/, "");
}
function dos(n) { return (n < 10 ? "0" : "") + n; }
function pts(n) { return String(Math.round(n * 100) / 100).replace(".", ",") + (n === 1 ? " pt" : " pts"); }
function yaml(obj) {
  const l = ["---"];
  for (const k in obj) {
    const v = obj[k];
    if (Array.isArray(v)) { l.push(k + ":"); v.forEach(x => l.push("  - " + x)); }
    else l.push(k + ": " + (typeof v === "string" ? JSON.stringify(v) : v));
  }
  l.push("---");
  return l.join("\n");
}
function escribir(rel, contenido) {
  const f = path.join(SALIDA, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, contenido.replace(/\n{3,}/g, "\n\n").trimEnd() + "\n", "utf8");
  if (rel.endsWith(".md")) ESTADISTICA.notas++;
}
function enlace(ruta, texto) { return "[[" + ruta.replace(/\.md$/, "") + (texto ? "|" + texto : "") + "]]"; }
const LAPIZ = "✏️ ";

// ============================================================
// Asignaturas
// ============================================================
const SUBJ = {};
D.SUBJECTS.forEach(s => { SUBJ[s.id] = s; });
const carpeta = id => nombreArchivo(SUBJ[id].nombre);
const portada = id => carpeta(id) + "/" + carpeta(id) + ".md";
function rutaTema(id, t, i) { return carpeta(id) + "/" + dos(i + 1) + " " + nombreArchivo(t.titulo) + ".md"; }

function notaTema(id, t, i) {
  const s = SUBJ[id], A = D.ASIGNATURAS_DATA[id], temas = A.temas;
  const partes = [];
  partes.push(yaml({ asignatura: s.nombre, curso: s.curso, tema: i + 1, visto: false, cssclasses: ["apuntes", id] }));
  partes.push(enlace(portada(id), "← " + s.nombre) + " · Tema " + (i + 1) + " de " + temas.length +
    " · [[#Apuntes]] · [[#Lámina resumen|Lámina]] · [[#Ejercicios resueltos|Ejercicios]] · [[#Vídeos]]");

  partes.push("## Apuntes");
  ((A.content[t.id] || {}).secciones || []).forEach(function (sec) {
    partes.push("### " + mdLinea(sec.h));
    partes.push(md(sec.html));
  });

  const lamina = A.lamina[t.id] || [];
  if (lamina.length) {
    partes.push("## Lámina resumen");
    lamina.forEach(function (b) {
      const filas = b.items.map(it => [celda(parse(it.label).children),
        celda(parse(it.formula).children) + (it.nota ? "<br>" + "*" + celda(parse(it.nota).children) + "*" : "")]);
      let cuerpo = tabla(filas);
      if (b.nota) cuerpo += "\n\n✎ *" + mdLinea(b.nota) + "*";
      partes.push(callout("lamina", mdLinea(b.titulo), cuerpo));
    });
  }

  const ejercicios = A.ejercicios[t.id] || [];
  if (ejercicios.length) {
    partes.push("## Ejercicios resueltos");
    ejercicios.forEach(function (ex, k) {
      partes.push("### Ejercicio " + (k + 1));
      partes.push(md(ex.enunciado));
      const pasos = ex.pasos.map(function (p, j) {
        const marca = (j + 1) + ". ";
        return marca + bloques(parse(p).children, { brHtml: true }).join("\n\n").split("\n").join("\n" + " ".repeat(marca.length));
      }).join("\n");
      const res = ex.resultado ? "\n\n**Resultado:** " + md(ex.resultado) : "";
      partes.push(callout("solucion", "Ver solución", pasos + res, "-"));
    });
  }

  const videos = A.videos[t.id] || [];
  if (videos.length) {
    partes.push("## Vídeos");
    partes.push(videos.map(v => "- [" + mdLinea(v.titulo).replace(/[\[\]]/g, "") + "](" + v.url + ")" + (v.meta ? " · *" + mdLinea(v.meta) + "*" : "")).join("\n"));
  }

  const ant = temas[i - 1], sig = temas[i + 1];
  partes.push("---\n" + [ant ? enlace(rutaTema(id, ant, i - 1), "← " + ant.titulo) : "", sig ? enlace(rutaTema(id, sig, i + 1), sig.titulo + " →") : ""].filter(Boolean).join(" · "));
  escribir(rutaTema(id, t, i), partes.join("\n\n"));
}

function claude(rubrica) {
  return callout("claude", "Para corregir con Claude", "Cuando lo corrijáis juntos: copia esta nota entera (con tus respuestas) en claude.ai y pega delante estas instrucciones.\n\n" + rubrica.split("\n").map(l => escTexto(l)).join("\n"), "-");
}

function notaSimulacro(id, sim, k, total) {
  const s = SUBJ[id];
  const rel = carpeta(id) + "/Simulacros/" + nombreArchivo(sim.titulo) + ".md";
  const partes = [yaml({ asignatura: s.nombre, tipo: "simulacro", cssclasses: ["apuntes", id] })];
  partes.push(enlace(portada(id), "← " + s.nombre) + " · Simulacro " + (k + 1) + " de " + total);
  if (sim.tipo === "ciencias") {
    const suma = sim.bloques.reduce((a, b) => a + b.puntos, 0);
    partes.push(callout("puntos", "Cómo se puntúa en el examen real", sim.bloques.map(b => mdLinea(b.titulo) + " (" + pts(b.puntos) + ")").join(" + ") + " = " + pts(suma).replace(/ pts?$/, " puntos") + ".\n\nEscribe la resolución completa de cada bloque (no solo el resultado), debajo del lápiz " + LAPIZ.trim() + "."));
    sim.bloques.forEach(function (b, i) {
      partes.push("## Bloque " + (i + 1) + " · " + mdLinea(b.titulo) + " — " + pts(b.puntos));
      partes.push(md(b.enunciado));
      partes.push(LAPIZ + "**Tu resolución:**\n\n\n");
      partes.push(callout("solucion", "Ver solución modelo", md(b.solucion), "-"));
    });
    partes.push("---\n" + claude(D.RUBRICA_SIMULACRO_CIENCIAS));
  } else {
    const suma = sim.items.reduce((a, b) => a + b.puntos, 0);
    partes.push(callout("puntos", "Cómo se puntúa en el examen real", sim.items.map(it => (D.ITEM_TIPO_LABEL[it.tipo] || it.tipo) + " (" + pts(it.puntos) + ")").join(" + ") + " = " + pts(suma).replace(/ pts?$/, " puntos") + "."));
    sim.items.forEach(function (it, i) {
      partes.push("## " + (i + 1) + " · " + (D.ITEM_TIPO_LABEL[it.tipo] || it.tipo) + " — " + pts(it.puntos));
      if (it.texto) partes.push(callout("texto", "Texto", textoPlano(it.texto)));
      partes.push("**" + mdLinea(it.enunciado) + "**");
      partes.push(LAPIZ + "**Tu respuesta:**\n\n\n");
      partes.push(callout("solucion", "Puntos clave (para autocorregirte)", md(it.clave), "-"));
    });
    partes.push("---\n" + claude(D.RUBRICA_SIMULACRO_LETRAS));
  }
  escribir(rel, partes.join("\n\n"));
  return rel;
}

function notaPortada(id, simulacros) {
  const s = SUBJ[id], A = D.ASIGNATURAS_DATA[id];
  const partes = [yaml({ curso: s.curso, cssclasses: ["apuntes", id, "portada"] })];
  partes.push(enlace("Inicio", "← Inicio") + " · *" + s.curso + "*");
  partes.push("## Temas\n" + A.temas.map((t, i) => (i + 1) + ". " + enlace(rutaTema(id, t, i), t.titulo)).join("\n"));
  if (simulacros.length) partes.push("## Simulacros de examen\n" + simulacros.map((r, i) => "- " + enlace(r, "Simulacro " + (i + 1))).join("\n"));
  partes.push("## Progreso\nMarca **visto** en las propiedades de cada tema cuando lo termines.\n\n![[Progreso.base#" + s.nombre + "]]");
  escribir(portada(id), partes.join("\n\n"));
}

// ============================================================
// Comentario de texto e Inglés
// ============================================================
function notasRedaccion() {
  const dir = "Comentario de texto";
  const rutas = D.REDACCION_EJERCICIOS.map(function (ex, k) {
    const rel = dir + "/" + (k + 1) + " " + nombreArchivo(ex.titulo) + ".md";
    const partes = [yaml({ tipo: "comentario", cssclasses: ["apuntes", "redaccion"] })];
    partes.push(enlace(dir + "/" + dir, "← Comentario de texto") + " · Texto " + (k + 1) + " de " + D.REDACCION_EJERCICIOS.length);
    partes.push(callout("texto", "Texto propuesto", textoPlano(ex.texto), "+"));
    D.CAMPOS_REDACCION.forEach(function (c) {
      partes.push("## " + c.titulo + " — " + pts(c.pts));
      partes.push("*" + escTexto(c.hint || ex.argumentativo) + "*");
      partes.push(LAPIZ + "\n\n\n");
    });
    partes.push("---\n" + claude(D.RUBRICA_REDACCION));
    escribir(rel, partes.join("\n\n"));
    return rel;
  });
  escribir(dir + "/" + dir + ".md", [
    yaml({ cssclasses: ["apuntes", "redaccion", "portada"] }),
    enlace("Inicio", "← Inicio") + " · *Lengua · Bloque de Comunicación de la EvAU (5 puntos)*",
    "## Textos para practicar\n" + rutas.map((r, i) => (i + 1) + ". " + enlace(r, D.REDACCION_EJERCICIOS[i].titulo)).join("\n"),
    "## Los cinco apartados\n" + D.CAMPOS_REDACCION.map(c => "- **" + c.titulo + "** (" + pts(c.pts) + ")" + (c.hint ? ": " + escTexto(c.hint) : ": defender una postura propia con argumentos, 150-200 palabras.")).join("\n")
  ].join("\n\n"));
}

function notasIngles() {
  const dir = "Inglés";
  const L = ["a", "b", "c", "d", "e", "f"];
  const rutas = D.INGLES_EJERCICIOS.map(function (ex, k) {
    const rel = dir + "/" + (k + 1) + " " + nombreArchivo(ex.titulo) + ".md";
    const partes = [yaml({ tipo: "ingles", cssclasses: ["apuntes", "ingles"] })];
    partes.push(enlace(dir + "/" + dir, "← Inglés") + " · Exam " + (k + 1) + " de " + D.INGLES_EJERCICIOS.length);
    partes.push(callout("texto", "Text", textoPlano(ex.texto), "+"));

    partes.push("## Question 1 — True or False · " + pts(2));
    partes.push("*Decide si es verdadero o falso y copia el fragmento del texto que lo justifica.*");
    ex.p1.forEach((it, i) => partes.push("**" + L[i] + ")** " + escTexto(it.statement) + "\n" + LAPIZ));
    partes.push(callout("solucion", "Respuestas", ex.p1.map((it, i) => "**" + L[i] + ")** " + it.answer + " — “" + escTexto(it.justificacion) + "”").join("\n"), "-"));

    partes.push("## Question 2 — Comprehension · " + pts(2));
    partes.push("*Responde con tus propias palabras, sin copiar frases literales del texto.*");
    ex.p2.forEach((it, i) => partes.push("**" + L[i] + ")** " + escTexto(it.pregunta) + "\n" + LAPIZ));
    partes.push(callout("solucion", "Respuestas modelo", "Con tus palabras vale igual si el sentido es el mismo.\n\n" + ex.p2.map((it, i) => "**" + L[i] + ")** " + escTexto(it.modelo)).join("\n"), "-"));

    partes.push("## Question 3 — Vocabulary · " + pts(1));
    partes.push("*Busca en el párrafo " + ex.p3parrafo + " una palabra o expresión con el mismo significado.*");
    ex.p3.forEach((it, i) => partes.push("**" + L[i] + ")** " + escTexto(it.definicion) + "\n" + LAPIZ));
    partes.push(callout("solucion", "Respuestas", ex.p3.map((it, i) => "**" + L[i] + ")** " + escTexto(it.respuesta)).join("\n"), "-"));

    partes.push("## Question 4 — Grammar · " + pts(2));
    partes.push("*Completa el hueco con la forma correcta de la palabra entre paréntesis, o con otra palabra si hace falta.*");
    ex.p4.forEach((it, i) => partes.push("**" + (i + 1) + ".** " + escTexto(it.enunciado) + "\n" + LAPIZ));
    partes.push(callout("solucion", "Respuestas", ex.p4.map((it, i) => "**" + (i + 1) + ".** " + escTexto(it.respuesta)).join("\n"), "-"));

    partes.push("## Question 5 — Writing · " + pts(3));
    partes.push("**" + escTexto(ex.writingPrompt) + "**");
    partes.push(LAPIZ + "\n\n\n");
    partes.push("---\n" + claude(D.RUBRICA_INGLES));
    escribir(rel, partes.join("\n\n"));
    return rel;
  });
  escribir(dir + "/" + dir + ".md", [
    yaml({ cssclasses: ["apuntes", "ingles", "portada"] }),
    enlace("Inicio", "← Inicio") + " · *Examen de Inglés de la EvAU: texto + 5 preguntas*",
    "## Exámenes para practicar\n" + rutas.map((r, i) => (i + 1) + ". " + enlace(r, D.INGLES_EJERCICIOS[i].titulo)).join("\n")
  ].join("\n\n"));
}

// ============================================================
// Inicio, progreso y configuración del vault
// ============================================================
function notaInicio() {
  const partes = [yaml({ cssclasses: ["apuntes", "inicio"] })];
  partes.push("Tu cuaderno de Bachillerato para la Selectividad: apuntes, láminas, ejercicios resueltos, vídeos y simulacros de examen.");
  D.GRUPOS.forEach(g => partes.push("## " + g.titulo + "\n" + g.ids.map(id => "- " + enlace(portada(id), SUBJ[id].nombre)).join("\n")));
  partes.push("## Práctica EvAU\n- " + enlace("Comentario de texto/Comentario de texto", "Comentario de texto") + "\n- " + enlace("Inglés/Inglés", "Inglés"));
  partes.push("## Tu progreso\n- " + enlace("Progreso.base", "Temas vistos y pendientes"));
  partes.push(callout("truco", "Cómo se usa", [
    "- **Leer:** las notas se abren en modo lectura. Las soluciones están plegadas: toca «Ver solución» cuando lo hayas intentado.",
    "- **Escribir:** toca el lápiz de arriba para pasar a modo edición y escribe debajo de cada " + LAPIZ.trim() + ".",
    "- **Subrayar:** en modo edición, pon el texto entre `==` y `==`. Sale del color de la asignatura.",
    "- **Tema visto:** marca la casilla *visto* de las propiedades, arriba del todo de cada tema."
  ].join("\n")));
  escribir("Inicio.md", partes.join("\n\n"));
}

function baseProgreso() {
  const l = [
    "filters:", "  and:", "    - file.hasProperty(\"visto\")",
    "properties:", "  file.name:", "    displayName: Tema", "  note.visto:", "    displayName: Visto", "  note.asignatura:", "    displayName: Asignatura",
    "views:",
    "  - type: table", "    name: Todas", "    groupBy:", "      property: asignatura", "      direction: ASC",
    "    order:", "      - file.name", "      - visto", "    sort:", "      - property: tema", "        direction: ASC",
    "  - type: table", "    name: Pendientes", "    filters:", "      and:", "        - visto != true", "    groupBy:", "      property: asignatura", "      direction: ASC",
    "    order:", "      - file.name", "      - visto", "    sort:", "      - property: tema", "        direction: ASC"
  ];
  D.SUBJECTS.forEach(function (s) {
    l.push("  - type: table", "    name: " + s.nombre, "    filters:", "      and:", "        - asignatura == " + JSON.stringify(s.nombre),
      "    order:", "      - file.name", "      - visto", "    sort:", "      - property: tema", "        direction: ASC");
  });
  escribir("Progreso.base", l.join("\n"));
}

function configuracion() {
  const obs = ".obsidian/";
  escribir(obs + "app.json", JSON.stringify({ defaultViewMode: "preview", showInlineTitle: true, readableLineLength: true, alwaysUpdateLinks: true, promptDelete: true }, null, 2));
  escribir(obs + "appearance.json", JSON.stringify({ enabledCssSnippets: ["bachi-firu"], accentColor: "#2447D5" }, null, 2));
  escribir(obs + "core-plugins.json", JSON.stringify({
    "file-explorer": true, "global-search": true, "switcher": true, "graph": true, "backlink": true, "canvas": true,
    "outgoing-link": true, "tag-pane": true, "footnotes": false, "properties": true, "page-preview": true,
    "daily-notes": false, "templates": false, "note-composer": true, "command-palette": true, "slash-command": false,
    "editor-status": true, "bookmarks": true, "markdown-importer": false, "zk-prefixer": false, "random-note": false,
    "outline": true, "word-count": true, "slides": false, "audio-recorder": false, "workspaces": false,
    "file-recovery": true, "publish": false, "sync": false, "bases": true, "webviewer": false
  }, null, 2));
  const ahora = Date.now();
  escribir(obs + "bookmarks.json", JSON.stringify({ items: [
    { type: "file", ctime: ahora, path: "Inicio.md", title: "Inicio" },
    { type: "file", ctime: ahora, path: "Progreso.base", title: "Progreso" }
  ] }, null, 2));
  escribir(obs + "snippets/bachi-firu.css", css());
}

function css() {
  const plantilla = fs.readFileSync(path.join(__dirname, "bachi-firu.css"), "utf8");
  const colores = [];
  Object.keys(D.SUBJECT_STYLE).forEach(function (id) {
    colores.push("." + id + " { --hl: " + D.SUBJECT_STYLE[id].hl + "; }");
    colores.push(".inicio a.internal-link[data-href^=\"" + carpeta(id) + "/\"] { --hl: " + D.SUBJECT_STYLE[id].hl + "; }");
  });
  colores.push(".redaccion, .inicio a.internal-link[data-href^=\"Comentario de texto/\"] { --hl: " + D.HL_REDACCION + "; }");
  colores.push(".ingles, .inicio a.internal-link[data-href^=\"Inglés/\"] { --hl: " + D.HL_INGLES + "; }");
  return plantilla.replace("/* @COLORES@ */", colores.join("\n"));
}

// ============================================================
// Se vacía la carpeta (sin borrarla, por si hay una terminal o un explorador abiertos dentro)
fs.mkdirSync(SALIDA, { recursive: true });
fs.readdirSync(SALIDA).forEach(f => fs.rmSync(path.join(SALIDA, f), { recursive: true, force: true }));
Object.keys(D.ASIGNATURAS_DATA).forEach(function (id) {
  const A = D.ASIGNATURAS_DATA[id];
  A.temas.forEach((t, i) => notaTema(id, t, i));
  const sims = (A.simulacros || []).map((sim, k, arr) => notaSimulacro(id, sim, k, arr.length));
  notaPortada(id, sims);
});
notasRedaccion();
notasIngles();
notaInicio();
baseProgreso();
configuracion();
fs.writeFileSync(path.join(__dirname, ".mates.json"), JSON.stringify(MATES), "utf8");

console.log("Notas:", ESTADISTICA.notas, "· fórmulas LaTeX:", MATES.length);
if (process.argv.includes("--postits")) console.log(ESTADISTICA.postits);
