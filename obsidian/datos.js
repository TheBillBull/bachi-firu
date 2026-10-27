// Lee los datos de pagina.html para reutilizarlos fuera del navegador (sin DOM).
const fs = require("fs");
const path = require("path");

// Devuelve el valor de un literal `var NOMBRE = [...]` o `{...}` o "texto" del script.
function literal(src, nombre) {
  const i = src.indexOf("var " + nombre + " =");
  if (i < 0) throw new Error("No encuentro " + nombre + " en pagina.html");
  let j = src.indexOf("=", i) + 1;
  const fin = src.indexOf(";\n", j);
  return new Function("return " + src.slice(j, fin))();
}

module.exports = function cargarDatos() {
  const src = fs.readFileSync(path.join(__dirname, "..", "pagina.html"), "utf8");
  // Bloque de datos: desde los ayudantes frac/radical/matrix hasta justo antes del estilo.
  const ini = src.indexOf("  function frac(n, d)");
  const fin = src.indexOf("  var SUBJECT_STYLE");
  const nombres = ["SUBJECTS", "ASIGNATURAS_DATA", "REDACCION_EJERCICIOS", "INGLES_EJERCICIOS",
    "RUBRICA_SIMULACRO_CIENCIAS", "RUBRICA_SIMULACRO_LETRAS", "RUBRICA_INGLES", "RUBRICA_REDACCION"];
  const datos = new Function(src.slice(ini, fin) + "\nreturn {" + nombres.join(",") + "};")();
  ["SUBJECT_STYLE", "HL_REDACCION", "HL_INGLES", "GRUPOS", "ITEM_TIPO_LABEL", "CAMPOS_REDACCION"]
    .forEach(function (n) { datos[n] = literal(src, n); });
  return datos;
};
