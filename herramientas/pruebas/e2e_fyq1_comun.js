// Utilidades comunes de las pruebas de comportamiento de fyq1 (temas 8-10).
// contraste(p, selectorContenedor): mide el contraste real (WCAG) del texto de las lecturas, etiquetas y botones
// dentro de los contenedores indicados; devuelve los elementos con contraste menor que `minimo` (por defecto 3).
exports.contraste = async function (p, ambito, minimo = 3) {
  return p.evaluate(({ ambito, minimo }) => {
    const cv = document.createElement('canvas'); cv.width = cv.height = 1;
    const cx = cv.getContext('2d', { willReadFrequently: true });
    const rgba = c => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
    const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const fondo = el => {
      const capas = [];
      for (let e = el; e; e = e.parentElement) { const c = rgba(getComputedStyle(e).backgroundColor); if (c[3] > 0) { capas.push(c); if (c[3] >= 0.99) break; } }
      let base = [255, 255, 255];
      if (!capas.length || capas[capas.length - 1][3] < 0.99) { const bb = rgba(getComputedStyle(document.body).backgroundColor); base = bb[3] > 0 ? [bb[0], bb[1], bb[2]] : [255, 255, 255]; }
      for (let i = capas.length - 1; i >= 0; i--) { const c = capas[i]; base = [0, 1, 2].map(k => c[k] * c[3] + base[k] * (1 - c[3])); }
      return base;
    };
    const malos = []; let total = 0;
    document.querySelectorAll(ambito).forEach(root => {
      root.querySelectorAll('.lec small, .lec b, .w-pie, .chip-btn, .bx-et, .tabla td, table td, table th').forEach(el => {
        if (!el.offsetParent || !el.textContent.trim()) return;
        total++;
        const fg = rgba(getComputedStyle(el).color), bg = fondo(el);
        const f = [0, 1, 2].map(k => fg[k] * fg[3] + bg[k] * (1 - fg[3]));
        const l1 = lum(f), l2 = lum(bg), r = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        if (r < minimo) malos.push({ txt: el.textContent.trim().slice(0, 40), ratio: Math.round(r * 100) / 100, cls: el.className });
      });
    });
    return { total, malos };
  }, { ambito, minimo });
};

// ¿La página está en modo oscuro? (luminancia del fondo del cuerpo)
exports.esOscuro = async function (p) {
  return p.evaluate(() => {
    const cv = document.createElement('canvas'); cv.width = cv.height = 1; const cx = cv.getContext('2d', { willReadFrequently: true });
    cx.fillStyle = getComputedStyle(document.body).backgroundColor; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data;
    return (0.2126 * d[0] + 0.7152 * d[1] + 0.0722 * d[2]) < 110;
  });
};
