// Carga los datos de pagina.html sin ejecutar el render.
const fs = require('fs'), vm = require('vm');
const src = fs.readFileSync(require('path').join(process.env.BACHI_RAIZ || require('path').join(__dirname, '..', '..'), 'pagina.html'), 'utf8').split('\n');
// localizar inicio del script y el final de la zona de datos
const iStart = src.findIndex(l => l.trim() === '(function () {');
const iEnd = src.findIndex(l => l.includes('var LS_ULTIMA'));
const body = src.slice(iStart + 1, iEnd).join('\n');
const code = `(function(){ "use strict";\n${body}\nreturn {SUBJECTS, ASIGNATURAS_DATA, REDACCION_EJERCICIOS, INGLES_EJERCICIOS, SUBJECT_STYLE, GRUPOS, RUBRICA_SIMULACRO_CIENCIAS, RUBRICA_SIMULACRO_LETRAS, RUBRICA_INGLES, RUBRICA_REDACCION};\n})()`;
module.exports = vm.runInNewContext(code, { document: {}, window: {}, console });
