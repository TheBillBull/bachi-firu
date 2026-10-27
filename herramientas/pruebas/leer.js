// Lectura compacta de un tema: secciones, lámina y enunciados de los ejercicios existentes
const D = require('./load.js');
const [,, id, t] = process.argv;
const d = D.ASIGNATURAS_DATA[id], strip = s => String(s).replace(/<\/(p|div|li|tr|td)>/g, ' ').replace(/<[^>]+>/g, '').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/\s+/g, ' ').trim();
console.log('#### ' + id + ' ' + t + ' ' + d.temas.find(x => x.id === t).titulo);
d.content[t].secciones.forEach((s, i) => console.log(`\n[${i}] ${s.h}\n${strip(s.html)}`));
console.log('\n-- LÁMINA:'); (d.lamina[t] || []).forEach(b => console.log('  ' + b.titulo + ': ' + b.items.map(i => i.label + ' = ' + strip(i.formula)).join(' | ')));
console.log('\n-- EJERCICIOS:'); (d.ejercicios[t] || []).forEach((e, i) => console.log(`  ${i + 1}. ${strip(e.enunciado)}  →  ${strip(e.resultado || '')}`));
