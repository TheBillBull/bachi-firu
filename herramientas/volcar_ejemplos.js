// Vuelca los ejemplos resueltos (ejemplo(titulo, enunciado, pasos)) de los temas, en texto plano, para revisarlos o verificarlos aparte.
// Uso: node herramientas/volcar_ejemplos.js [asig] [tema] > ejemplos.txt    (p. ej. fyq1 t5; sin argumentos, todos)
const fs = require('fs'), vm = require('vm'), path = require('path');
const raiz = path.join(__dirname, '..', 'ampliaciones');
const noop = () => {};
const sandbox = { console, document: { addEventListener: noop, createElementNS: () => ({ setAttribute: noop, appendChild: noop }) },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sandbox.window = sandbox;
vm.createContext(sandbox);
const leer = f => fs.readFileSync(path.join(raiz, f), 'utf8');
const corre = (f) => vm.runInContext(leer(f), sandbox, { filename: f });
['grafica.js', 'nucleo.js', 'ui.js', 'actividades.js'].forEach(corre);
fs.readdirSync(raiz).filter(f => /^lab_.*\.js$/.test(f)).sort().forEach(corre);
const B = sandbox.BACHI, orig = B.h.ejemplo, strip = s => String(s).replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const [, , asig, tema] = process.argv;
let actual = '';
B.h.ejemplo = function (titulo, enunciado, pasos) {
  console.log(`[${actual}] ${strip(titulo)}\n  Q: ${strip(enunciado)}\n` + (pasos || []).map((p, i) => `  ${i + 1}. ${strip(p)}`).join('\n') + '\n');
  return orig.apply(this, arguments);
};
fs.readdirSync(path.join(raiz, 'contenido')).sort().forEach(f => {
  const m = /^([a-z0-9]+)_t(\d+)/.exec(f);
  if (!m) return;
  if (asig && m[1] !== asig) return;
  if (tema && 't' + parseInt(m[2], 10) !== tema) return;
  actual = f;
  corre('contenido/' + f);
});
