// Vuelca a JSON los datos de ampliaciones/ para poder verificarlos con herramientas externas
// (por ejemplo, sympy). Uso: node herramientas/volcar_ampliaciones.js > ampliaciones.json
const fs = require('fs'), vm = require('vm'), path = require('path');
const raiz = path.join(__dirname, '..', 'ampliaciones');
const noop = () => {};
const sandbox = { console, document: { addEventListener: noop, getElementById: () => null, head: { appendChild: noop }, createElement: () => ({ style: {}, setAttribute: noop, appendChild: noop }), createElementNS: () => ({ setAttribute: noop, appendChild: noop }) },
  matchMedia: () => ({ matches: false }), localStorage: { getItem: () => null, setItem: noop }, requestAnimationFrame: noop };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(raiz, 'bachi.js'), 'utf8'), sandbox, { filename: 'bachi.js' });
const B = sandbox.BACHI;
const salida = { ampl: JSON.parse(JSON.stringify(B.ampl, (k, v) => typeof v === 'function' ? undefined : v)), banco: B.lab && B.lab.banco };
process.stdout.write(JSON.stringify(salida));
