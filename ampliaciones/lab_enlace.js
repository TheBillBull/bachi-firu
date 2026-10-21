/* ============================================================
   Bachi para Firu · laboratorio del enlace químico (Física y Química I, tema 2)
   Motor B.lab.enlace (electronegatividad, Lewis, TRPECV, dipolos, red iónica,
   Born–Haber, propiedades, fuerzas intermoleculares) y los simuladores
   q2_deltaen · q2_lewis · q2_vsepr · q2_polaridad
   (q2_red · q2_bornhaber · q2_propiedades · q2_fuerzas · q2_metalico · q2_hibrid están en lab_enlace2.js)
   El motor no toca el DOM: se puede comprobar aparte (Node).
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI, U = B.ui, fmt = B.fmt;
  B.lab = B.lab || {};
  var Q = B.lab.quim, EL = Q.EL;
  var E = B.lab.enlace = {};

  function fil(rot, v, cl) { return U.lec(rot, v, cl); }
  function f2(x) { return fmt(x, 2); }
  E.fil = fil;

  // ------------------------------------------------------------
  // Electronegatividad y tipo de enlace
  // ------------------------------------------------------------
  E.chi = function (s) { var e = Q.porSimbolo(s); return e ? e.en : null; };
  // electrones de valencia de un elemento del bloque s o p (grupo 1–2: el grupo; 13–18: grupo − 10; He: 2)
  E.valencia = function (s) {
    var e = Q.porSimbolo(s); if (!e) return null;
    if (s === "He") return 2;
    return e.g <= 2 ? e.g : e.g - 10;
  };
  // carácter iónico parcial de Pauling: 1 − exp(−Δχ²/4)
  E.pctIonico = function (d) { return 100 * (1 - Math.exp(-d * d / 4)); };
  E.UMBRAL_APOLAR = 0.4; E.UMBRAL_IONICO = 1.7;
  // Dos elementos (números atómicos) → { d, pct, tipo, clave }. Criterio de aula: metal–metal = metálico;
  // metal–no metal con Δχ ≥ 1,7 = iónico; entre no metales, Δχ < 0,4 apolar y ≥ 0,4 polar.
  E.enlace = function (Z1, Z2) {
    var a = EL[Z1 - 1], b = EL[Z2 - 1];
    if (a.t === "noble" || b.t === "noble" || a.en == null || b.en == null) return { d: null, pct: null, tipo: "sin enlace (gas noble)", clave: "noble" };
    var d = Math.abs(a.en - b.en), pct = E.pctIonico(d), esM = function (x) { return x.t === "metal"; };
    var tipo, clave;
    if (esM(a) && esM(b)) { tipo = "metálico"; clave = "metalico"; }
    else if ((esM(a) || esM(b)) && d >= E.UMBRAL_IONICO) { tipo = "iónico"; clave = "ionico"; }
    else if (d < E.UMBRAL_APOLAR) { tipo = "covalente apolar"; clave = "apolar"; }
    else { tipo = "covalente polar"; clave = "polar"; }
    return { d: d, pct: pct, tipo: tipo, clave: clave };
  };

  // ------------------------------------------------------------
  // Geometría molecular (TRPECV): vectores unitarios de los dominios de electrones
  // ------------------------------------------------------------
  function unit(v) { var m = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]); return [v[0] / m, v[1] / m, v[2] / m]; }
  var S3 = Math.sqrt(3) / 2;
  var BASE = {
    2: [[1, 0, 0], [-1, 0, 0]],
    3: [[0, 1, 0], [-S3, -0.5, 0], [S3, -0.5, 0]],
    4: [unit([0, 1, 0]), [Math.sqrt(8 / 9), -1 / 3, 0], [-Math.sqrt(2 / 9), -1 / 3, Math.sqrt(2 / 3)], [-Math.sqrt(2 / 9), -1 / 3, -Math.sqrt(2 / 3)]],
    5: [[0, 1, 0], [0, -1, 0], [1, 0, 0], [-0.5, 0, S3], [-0.5, 0, -S3]],
    6: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]
  };
  // clave "n,m" (n enlaces, m pares libres) → posiciones de los pares enlazantes (b) y libres (l) dentro de la base
  var DEF = {
    "2,0": { sn: 2, b: [0, 1], l: [], nombre: "lineal", hib: "sp", ej: "BeCl₂, CO₂, HCN, C₂H₂", real: "180°" },
    "3,0": { sn: 3, b: [0, 1, 2], l: [], nombre: "trigonal plana", hib: "sp²", ej: "BF₃, SO₃, NO₃⁻, CO₃²⁻, C₂H₄", real: "120°" },
    "2,1": { sn: 3, b: [1, 2], l: [0], nombre: "angular", hib: "sp²", ej: "SO₂, O₃", real: "≈ 119° (SO₂) · 117° (O₃)" },
    "4,0": { sn: 4, b: [0, 1, 2, 3], l: [], nombre: "tetraédrica", hib: "sp³", ej: "CH₄, CCl₄, NH₄⁺, SO₄²⁻", real: "109,5°" },
    "3,1": { sn: 4, b: [1, 2, 3], l: [0], nombre: "pirámide trigonal", hib: "sp³", ej: "NH₃, PCl₃, H₃O⁺", real: "≈ 107° (NH₃)" },
    "2,2": { sn: 4, b: [2, 3], l: [0, 1], nombre: "angular", hib: "sp³", ej: "H₂O, H₂S", real: "≈ 104,5° (H₂O)" },
    "5,0": { sn: 5, b: [0, 1, 2, 3, 4], l: [], nombre: "bipirámide trigonal", hib: "sp³d", ej: "PCl₅", real: "90° y 120°" },
    "4,1": { sn: 5, b: [0, 1, 3, 4], l: [2], nombre: "balancín (tetraedro distorsionado)", hib: "sp³d", ej: "SF₄", real: "≈ 173° y ≈ 102° (SF₄)" },
    "3,2": { sn: 5, b: [0, 1, 4], l: [2, 3], nombre: "forma de T", hib: "sp³d", ej: "ClF₃", real: "≈ 87,5° (ClF₃)" },
    "2,3": { sn: 5, b: [0, 1], l: [2, 3, 4], nombre: "lineal", hib: "sp³d", ej: "XeF₂", real: "180°" },
    "6,0": { sn: 6, b: [0, 1, 2, 3, 4, 5], l: [], nombre: "octaédrica", hib: "sp³d²", ej: "SF₆", real: "90°" },
    "5,1": { sn: 6, b: [0, 1, 2, 4, 5], l: [3], nombre: "pirámide cuadrada", hib: "sp³d²", ej: "BrF₅", real: "≈ 85° (BrF₅)" },
    "4,2": { sn: 6, b: [0, 1, 4, 5], l: [2, 3], nombre: "plana cuadrada", hib: "sp³d²", ej: "XeF₄", real: "90°" }
  };
  var GEOM = {};
  Object.keys(DEF).forEach(function (k) {
    var d = DEF[k], p = k.split(","), base = BASE[d.sn];
    GEOM[k] = { clave: k, n: +p[0], m: +p[1], sn: d.sn, nombre: d.nombre, hib: d.hib, ej: d.ej, real: d.real,
      pos: d.b.map(function (i) { return base[i]; }), lib: d.l.map(function (i) { return base[i]; }) };
  });
  E.GEOM = GEOM;
  E.ordenGeom = ["2,0", "3,0", "2,1", "4,0", "3,1", "2,2", "5,0", "4,1", "3,2", "2,3", "6,0", "5,1", "4,2"];
  E.angulo = function (u, v) { var d = u[0] * v[0] + u[1] * v[1] + u[2] * v[2]; return Math.acos(Math.max(-1, Math.min(1, d))) * 180 / Math.PI; };
  // ángulos distintos entre pares enlazantes (redondeados a 0,1°)
  E.angulosEnlace = function (k) {
    var g = GEOM[k], out = {}, i, j;
    for (i = 0; i < g.pos.length; i++) for (j = i + 1; j < g.pos.length; j++) out[(Math.round(E.angulo(g.pos[i], g.pos[j]) * 10) / 10).toFixed(1)] = 1;
    return Object.keys(out).map(Number).sort(function (a, b) { return a - b; });
  };
  // Giro en torno al eje vertical (ay) y después inclinación (ax); devuelve [x, y, z] con z hacia el observador
  E.gira = function (v, ay, ax) {
    var c = Math.cos(ay), s = Math.sin(ay), x = v[0] * c + v[2] * s, z = -v[0] * s + v[2] * c, y = v[1];
    var c2 = Math.cos(ax), s2 = Math.sin(ax), y2 = y * c2 - z * s2, z2 = y * s2 + z * c2;
    return [x, y2, z2];
  };

  // ------------------------------------------------------------
  // Estructuras de Lewis: átomos (símbolo, posición en el dibujo, pares libres, electrones desapareados) y enlaces [i, j, orden]
  // ------------------------------------------------------------
  function A(s, x, y, lp, ue) { return { s: s, x: x, y: y, lp: lp || 0, ue: ue || 0 }; }
  var MOL = [
    { id: "h2", f: "H2", n: "hidrógeno", q: 0, a: [A("H", 85, 85), A("H", 155, 85)], b: [[0, 1, 1]], nota: "Cada H comparte su único electrón: los dos completan el «octeto» del helio (2 e⁻)." },
    { id: "f2", f: "F2", n: "flúor", q: 0, a: [A("F", 85, 85, 3), A("F", 155, 85, 3)], b: [[0, 1, 1]], nota: "Un enlace sencillo y tres pares libres en cada F: 8 e⁻ alrededor de cada átomo." },
    { id: "o2", f: "O2", n: "oxígeno", q: 0, a: [A("O", 85, 85, 2), A("O", 155, 85, 2)], b: [[0, 1, 2]], nota: "Enlace doble. (La teoría de orbitales moleculares añade que el O₂ real es paramagnético; Lewis no lo predice.)" },
    { id: "n2", f: "N2", n: "nitrógeno", q: 0, a: [A("N", 85, 85, 1), A("N", 155, 85, 1)], b: [[0, 1, 3]], nota: "Enlace triple: muy corto y muy fuerte (945 kJ/mol); por eso el N₂ es tan poco reactivo." },
    { id: "hcl", f: "HCl", n: "cloruro de hidrógeno", q: 0, a: [A("H", 80, 85), A("Cl", 160, 85, 3)], b: [[0, 1, 1]], nota: "Un enlace covalente polar: el par compartido está más cerca del Cl." },
    { id: "h2o", f: "H2O", n: "agua", q: 0, a: [A("O", 120, 58, 2), A("H", 75, 108), A("H", 165, 108)], b: [[0, 1, 1], [0, 2, 1]], g: "2,2", nota: "Dos enlaces y dos pares libres: 4 pares alrededor del O → geometría angular." },
    { id: "nh3", f: "NH3", n: "amoníaco", q: 0, a: [A("N", 120, 58, 1), A("H", 70, 110), A("H", 120, 135), A("H", 170, 110)], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], g: "3,1", nota: "Tres enlaces y un par libre: pirámide trigonal." },
    { id: "ch4", f: "CH4", n: "metano", q: 0, a: [A("C", 120, 85), A("H", 120, 33), A("H", 120, 137), A("H", 68, 85), A("H", 172, 85)], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], g: "4,0", nota: "Cuatro enlaces sencillos, sin pares libres: tetraedro (el dibujo plano no muestra los 109,5°)." },
    { id: "co2", f: "CO2", n: "dióxido de carbono", q: 0, a: [A("O", 52, 85, 2), A("C", 120, 85), A("O", 188, 85, 2)], b: [[0, 1, 2], [1, 2, 2]], g: "2,0", nota: "Dos enlaces dobles: el C no tiene pares libres → molécula lineal." },
    { id: "hcn", f: "HCN", n: "cianuro de hidrógeno", q: 0, a: [A("H", 45, 85), A("C", 115, 85), A("N", 188, 85, 1)], b: [[0, 1, 1], [1, 2, 3]], g: "2,0", nota: "H–C sencillo y C≡N triple: el C tiene solo dos dominios de electrones → lineal." },
    { id: "h2s", f: "H2S", n: "sulfuro de hidrógeno", q: 0, a: [A("S", 120, 58, 2), A("H", 75, 108), A("H", 165, 108)], b: [[0, 1, 1], [0, 2, 1]], g: "2,2", nota: "Como el agua, pero con el S menos electronegativo: no forma puentes de hidrógeno apreciables." },
    { id: "c2h4", f: "C2H4", n: "eteno (etileno)", q: 0, a: [A("C", 95, 85), A("C", 145, 85), A("H", 62, 48), A("H", 62, 122), A("H", 178, 48), A("H", 178, 122)], b: [[0, 1, 2], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]], g: "3,0", nota: "Cada C tiene tres dominios (dos C–H y el C=C): trigonal plano, 120°." },
    { id: "c2h2", f: "C2H2", n: "etino (acetileno)", q: 0, a: [A("H", 35, 85), A("C", 92, 85), A("C", 148, 85), A("H", 205, 85)], b: [[0, 1, 1], [1, 2, 3], [2, 3, 1]], g: "2,0", nota: "Triple enlace C≡C y dos dominios por carbono → lineal, 180°." },
    { id: "ch2o", f: "CH2O", n: "metanal (formaldehído)", q: 0, a: [A("C", 105, 85), A("O", 168, 85, 2), A("H", 70, 48), A("H", 70, 122)], b: [[0, 1, 2], [0, 2, 1], [0, 3, 1]], g: "3,0", nota: "C con tres dominios → trigonal plana; el enlace C=O es polar." },
    { id: "ch3oh", f: "CH3OH", n: "metanol", q: 0, a: [A("C", 85, 85), A("H", 85, 35), A("H", 85, 135), A("H", 35, 85), A("O", 145, 85, 2), A("H", 190, 112)], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [4, 5, 1]], nota: "El grupo O–H permite puentes de hidrógeno: el metanol hierve a 65 °C (el etano, a −89 °C)." },
    { id: "h2o2", f: "H2O2", n: "peróxido de hidrógeno", q: 0, a: [A("H", 55, 115), A("O", 100, 85, 2), A("O", 145, 85, 2), A("H", 190, 115)], b: [[0, 1, 1], [1, 2, 1], [2, 3, 1]], nota: "Enlace sencillo O–O (débil): por eso el agua oxigenada se descompone con facilidad." },
    { id: "bf3", f: "BF3", n: "trifluoruro de boro", q: 0, a: [A("B", 120, 85), A("F", 120, 30, 3), A("F", 72, 113, 3), A("F", 168, 113, 3)], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], g: "3,0", nota: "Octeto incompleto: el B solo tiene 6 e⁻. Por eso el BF₃ es un ácido de Lewis (acepta un par)." },
    { id: "becl2", f: "BeCl2", n: "cloruro de berilio", q: 0, a: [A("Cl", 52, 85, 3), A("Be", 120, 85), A("Cl", 188, 85, 3)], b: [[0, 1, 1], [1, 2, 1]], g: "2,0", nota: "Octeto incompleto: el Be solo tiene 4 e⁻. Geometría lineal." },
    { id: "pcl3", f: "PCl3", n: "tricloruro de fósforo", q: 0, a: [A("P", 120, 58, 1), A("Cl", 68, 110, 3), A("Cl", 120, 137, 3), A("Cl", 172, 110, 3)], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], g: "3,1", nota: "Octeto completo; pirámide trigonal como el NH₃." },
    { id: "pcl5", f: "PCl5", n: "pentacloruro de fósforo", q: 0, a: [A("P", 120, 85), A("Cl", 120, 28, 3), A("Cl", 120, 142, 3), A("Cl", 62, 85, 3), A("Cl", 160, 56, 3), A("Cl", 160, 114, 3)], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [0, 5, 1]], g: "5,0", nota: "Octeto expandido: el P (periodo 3) rodea 10 e⁻ usando orbitales 3d vacíos. Imposible para el N (periodo 2)." },
    { id: "sf6", f: "SF6", n: "hexafluoruro de azufre", q: 0, a: [A("S", 120, 85), A("F", 120, 28, 3), A("F", 169, 57, 3), A("F", 169, 113, 3), A("F", 120, 142, 3), A("F", 71, 113, 3), A("F", 71, 57, 3)], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [0, 5, 1], [0, 6, 1]], g: "6,0", nota: "Octeto expandido: 12 e⁻ alrededor del S. Geometría octaédrica y molécula apolar." },
    { id: "so2", f: "SO2", n: "dióxido de azufre", q: 0, a: [A("S", 120, 58, 1), A("O", 68, 108, 2), A("O", 172, 108, 3)], b: [[0, 1, 2], [0, 2, 1]], g: "2,1", res: 2, nota: "Resonancia: hay dos formas equivalentes (el doble enlace puede estar a cada lado); la real es un híbrido con dos enlaces idénticos." },
    { id: "so3", f: "SO3", n: "trióxido de azufre", q: 0, a: [A("S", 120, 85), A("O", 120, 30, 2), A("O", 72, 113, 2), A("O", 168, 113, 2)], b: [[0, 1, 2], [0, 2, 2], [0, 3, 2]], g: "3,0", nota: "Estructura con tres enlaces dobles (S con 12 e⁻, cargas formales nulas). Trigonal plana y apolar." },
    { id: "o3", f: "O3", n: "ozono", q: 0, a: [A("O", 120, 58, 1), A("O", 68, 108, 2), A("O", 172, 108, 3)], b: [[0, 1, 2], [0, 2, 1]], g: "2,1", res: 2, nota: "Resonancia entre dos formas: los dos enlaces O–O son iguales (128 pm), intermedios entre sencillo y doble." },
    { id: "co", f: "CO", n: "monóxido de carbono", q: 0, a: [A("C", 85, 85, 1), A("O", 155, 85, 1)], b: [[0, 1, 3]], nota: "Triple enlace con cargas formales C⁻ y O⁺ (el dativo O→C completa el octeto del C). Su polaridad real es casi nula." },
    { id: "nh4", f: "NH4^+", n: "ion amonio", q: 1, a: [A("N", 120, 85), A("H", 120, 33), A("H", 120, 137), A("H", 68, 85), A("H", 172, 85)], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], g: "4,0", nota: "Los cuatro enlaces N–H son idénticos: uno de ellos es un enlace dativo (el par lo aportó el N del NH₃)." },
    { id: "h3o", f: "H3O^+", n: "ion hidronio", q: 1, a: [A("O", 120, 58, 1), A("H", 70, 110), A("H", 120, 135), A("H", 170, 110)], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], g: "3,1", nota: "Así se encuentra el H⁺ en el agua: unido a una molécula de H₂O por enlace dativo." },
    { id: "oh", f: "OH^-", n: "ion hidróxido", q: -1, a: [A("O", 85, 85, 3), A("H", 155, 85)], b: [[0, 1, 1]], nota: "El O tiene 8 e⁻ (un enlace y tres pares libres) y la carga −1 es formal sobre el O." },
    { id: "cn", f: "CN^-", n: "ion cianuro", q: -1, a: [A("C", 85, 85, 1), A("N", 155, 85, 1)], b: [[0, 1, 3]], nota: "Isoelectrónico con el N₂ y el CO (10 e⁻ de valencia): triple enlace en los tres." },
    { id: "no3", f: "NO3^-", n: "ion nitrato", q: -1, a: [A("N", 120, 85), A("O", 120, 30, 2), A("O", 72, 113, 3), A("O", 168, 113, 3)], b: [[0, 1, 2], [0, 2, 1], [0, 3, 1]], g: "3,0", res: 3, nota: "Tres formas resonantes equivalentes: los tres enlaces N–O son idénticos y la carga −1 está repartida." },
    { id: "co3", f: "CO3^2-", n: "ion carbonato", q: -2, a: [A("C", 120, 85), A("O", 120, 30, 2), A("O", 72, 113, 3), A("O", 168, 113, 3)], b: [[0, 1, 2], [0, 2, 1], [0, 3, 1]], g: "3,0", res: 3, nota: "Tres formas resonantes: trigonal plano con tres enlaces C–O idénticos (129 pm)." },
    { id: "so4", f: "SO4^2-", n: "ion sulfato", q: -2, a: [A("S", 120, 85), A("O", 120, 28, 2), A("O", 120, 142, 2), A("O", 62, 85, 3), A("O", 178, 85, 3)], b: [[0, 1, 2], [0, 2, 2], [0, 3, 1], [0, 4, 1]], g: "4,0", res: 6, nota: "Forma con cargas formales mínimas (S con 12 e⁻). Los cuatro enlaces S–O son equivalentes por resonancia; geometría tetraédrica." },
    { id: "no", f: "NO", n: "monóxido de nitrógeno", q: 0, a: [A("N", 85, 85, 1, 1), A("O", 155, 85, 2)], b: [[0, 1, 2]], nota: "Radical: número impar de electrones (11), uno queda desapareado en el N. Es muy reactivo y paramagnético." },
    { id: "xef2", f: "XeF2", n: "difluoruro de xenón", q: 0, a: [A("F", 52, 85, 3), A("Xe", 120, 85, 3), A("F", 188, 85, 3)], b: [[0, 1, 1], [1, 2, 1]], g: "2,3", nota: "Los gases nobles pesados sí forman compuestos. Xe con 10 e⁻: tres pares libres en el plano ecuatorial, molécula lineal." },
    { id: "sf4", f: "SF4", n: "tetrafluoruro de azufre", q: 0, a: [A("S", 120, 85, 1), A("F", 120, 28, 3), A("F", 120, 142, 3), A("F", 62, 85, 3), A("F", 178, 85, 3)], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], g: "4,1", nota: "Cinco dominios (cuatro enlaces y un par libre): balancín. El par libre ocupa una posición ecuatorial." },
    { id: "clf3", f: "ClF3", n: "trifluoruro de cloro", q: 0, a: [A("Cl", 120, 85, 2), A("F", 120, 28, 3), A("F", 120, 142, 3), A("F", 182, 85, 3)], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], g: "3,2", nota: "Cinco dominios (tres enlaces y dos pares libres): forma de T, molécula polar." },
    { id: "xef4", f: "XeF4", n: "tetrafluoruro de xenón", q: 0, a: [A("Xe", 120, 85, 2), A("F", 120, 28, 3), A("F", 120, 142, 3), A("F", 62, 85, 3), A("F", 178, 85, 3)], b: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], g: "4,2", nota: "Seis dominios: los dos pares libres quedan opuestos y la molécula es plana cuadrada y apolar." }
  ];
  E.MOL = MOL;
  E.molPorId = function (id) { for (var i = 0; i < MOL.length; i++) if (MOL[i].id === id) return MOL[i]; return null; };

  // Cuentas de una estructura: electrones de valencia, pares, cargas formales y estado del octeto de cada átomo
  E.analizar = function (m) {
    var total = -m.q, orden = [], lp = 0, ue = 0, pe = 0, i;
    m.a.forEach(function (at) { total += E.valencia(at.s); orden.push(0); lp += at.lp; ue += at.ue; });
    m.b.forEach(function (b) { orden[b[0]] += b[2]; orden[b[1]] += b[2]; pe += b[2]; });
    var fc = [], octeto = [], suma = 0;
    m.a.forEach(function (at, k) {
      var nel = 2 * orden[k] + 2 * at.lp + at.ue, esH = at.s === "H" || at.s === "He", obj = esH ? 2 : 8, f = E.valencia(at.s) - (2 * at.lp + at.ue) - orden[k];
      fc.push(f); suma += f;
      octeto.push(nel === obj ? (at.ue % 2 ? "radical" : "completo") : nel < obj ? "incompleto" : "expandido");
      if (at.ue % 2 && nel < obj) octeto[k] = "radical";
    });
    return { total: total, pares: pe, libres: lp, desapareados: ue, cuenta: 2 * (pe + lp) + ue, ok: 2 * (pe + lp) + ue === total, fc: fc, sumaFC: suma, octeto: octeto, orden: orden };
  };
  // Direcciones (rad) de los pares libres de un átomo en el dibujo: se reparten donde hay más hueco
  E.dirPares = function (m, i) {
    var at = m.a[i], fijos = [], libres = [], k, it, j;
    m.b.forEach(function (b) { var o = b[0] === i ? b[1] : b[1] === i ? b[0] : -1; if (o >= 0) fijos.push(Math.atan2(m.a[o].y - at.y, m.a[o].x - at.x)); });
    var n = at.lp + (at.ue ? 1 : 0);
    function dist(a, b) { var d = Math.abs(a - b) % (2 * Math.PI); return d > Math.PI ? 2 * Math.PI - d : d; }
    for (k = 0; k < n; k++) {
      var mejor = 0, md = -1;
      for (j = 0; j < 24; j++) { var c = j * Math.PI / 12, d = 9; fijos.concat(libres).forEach(function (x) { d = Math.min(d, dist(c, x)); }); if (d > md + 1e-9) { md = d; mejor = c; } }
      libres.push(mejor);
    }
    for (it = 0; it < 90; it++) {
      for (k = 0; k < n; k++) {
        var g = 0;
        fijos.concat(libres).forEach(function (x, idx) { if (idx === fijos.length + k) return; var dd = libres[k] - x, den = 1 - Math.cos(dd) + 0.25; g += Math.sin(dd) / (den * den); });
        libres[k] += 0.12 * g;
      }
    }
    return libres;
  };
  // Dibujo SVG: capa 0 = esqueleto (enlaces sencillos), 1 = pares libres y enlaces múltiples, 2 = además cargas formales
  E.lewisSVG = function (m, capa) {
    var an = E.analizar(m), s = '<svg viewBox="0 0 240 170" class="q2-lewis" role="img" aria-label="Estructura de Lewis de ' + m.n + '">', i;
    m.b.forEach(function (b) {
      var p = m.a[b[0]], q = m.a[b[1]], o = capa === 0 ? 1 : b[2], dx = q.x - p.x, dy = q.y - p.y, L = Math.sqrt(dx * dx + dy * dy), nx = -dy / L, ny = dx / L, offs = o === 1 ? [0] : o === 2 ? [-3.2, 3.2] : [-5.5, 0, 5.5];
      offs.forEach(function (d) { s += '<line x1="' + (p.x + nx * d).toFixed(1) + '" y1="' + (p.y + ny * d).toFixed(1) + '" x2="' + (q.x + nx * d).toFixed(1) + '" y2="' + (q.y + ny * d).toFixed(1) + '" class="q2-enl"/>'; });
    });
    m.a.forEach(function (at, k) {
      s += '<circle cx="' + at.x + '" cy="' + at.y + '" r="12.5" class="q2-at"/><text x="' + at.x + '" y="' + (at.y + 5.5) + '" text-anchor="middle" class="q2-sim">' + at.s + "</text>";
      if (capa >= 1 && (at.lp || at.ue)) {
        var d = E.dirPares(m, k);
        d.forEach(function (th, j) {
          var cx = at.x + 22 * Math.cos(th), cy = at.y + 22 * Math.sin(th), px = -Math.sin(th) * 3.6, py = Math.cos(th) * 3.6;
          if (j < at.lp) s += '<circle cx="' + (cx + px).toFixed(1) + '" cy="' + (cy + py).toFixed(1) + '" r="2.3" class="q2-lp"/><circle cx="' + (cx - px).toFixed(1) + '" cy="' + (cy - py).toFixed(1) + '" r="2.3" class="q2-lp"/>';
          else s += '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="2.6" class="q2-ue"/>';
        });
      }
      if (capa >= 2 && an.fc[k] !== 0) s += '<g class="q2-fc ' + (an.fc[k] > 0 ? "pos" : "neg") + '"><circle cx="' + (at.x + 15) + '" cy="' + (at.y - 15) + '" r="7.5"/><text x="' + (at.x + 15) + '" y="' + (at.y - 11.6) + '" text-anchor="middle">' + (an.fc[k] > 0 ? "+" : "−") + (Math.abs(an.fc[k]) > 1 ? Math.abs(an.fc[k]) : "") + "</text></g>";
    });
    return s + "</svg>";
  };

  // ------------------------------------------------------------
  // Polaridad molecular: suma vectorial de los momentos dipolares de enlace (en unidades de Δχ)
  // ------------------------------------------------------------
  var POL = [
    { id: "hcl", f: "HCl", c: "H", l: ["Cl"], g: "1,0", mu: 1.08 }, { id: "hf", f: "HF", c: "H", l: ["F"], g: "1,0", mu: 1.82 },
    { id: "co2", f: "CO2", c: "C", l: ["O", "O"], g: "2,0", mu: 0 }, { id: "becl2", f: "BeCl2", c: "Be", l: ["Cl", "Cl"], g: "2,0", mu: 0 },
    { id: "h2o", f: "H2O", c: "O", l: ["H", "H"], g: "2,2", mu: 1.85 }, { id: "h2s", f: "H2S", c: "S", l: ["H", "H"], g: "2,2", mu: 0.97 },
    { id: "so2", f: "SO2", c: "S", l: ["O", "O"], g: "2,1", mu: 1.63 },
    { id: "bf3", f: "BF3", c: "B", l: ["F", "F", "F"], g: "3,0", mu: 0 }, { id: "so3", f: "SO3", c: "S", l: ["O", "O", "O"], g: "3,0", mu: 0 },
    { id: "nh3", f: "NH3", c: "N", l: ["H", "H", "H"], g: "3,1", mu: 1.47 }, { id: "pcl3", f: "PCl3", c: "P", l: ["Cl", "Cl", "Cl"], g: "3,1", mu: 0.56 },
    { id: "ch4", f: "CH4", c: "C", l: ["H", "H", "H", "H"], g: "4,0", mu: 0 }, { id: "ccl4", f: "CCl4", c: "C", l: ["Cl", "Cl", "Cl", "Cl"], g: "4,0", mu: 0 },
    { id: "ch3cl", f: "CH3Cl", c: "C", l: ["H", "H", "H", "Cl"], g: "4,0", mu: 1.87 }, { id: "ch2cl2", f: "CH2Cl2", c: "C", l: ["H", "H", "Cl", "Cl"], g: "4,0", mu: 1.6 },
    { id: "chcl3", f: "CHCl3", c: "C", l: ["H", "Cl", "Cl", "Cl"], g: "4,0", mu: 1.04 },
    { id: "pcl5", f: "PCl5", c: "P", l: ["Cl", "Cl", "Cl", "Cl", "Cl"], g: "5,0", mu: 0 }, { id: "sf4", f: "SF4", c: "S", l: ["F", "F", "F", "F"], g: "4,1", mu: 0.63 },
    { id: "clf3", f: "ClF3", c: "Cl", l: ["F", "F", "F"], g: "3,2", mu: 0.56 }, { id: "xef2", f: "XeF2", c: "Xe", l: ["F", "F"], g: "2,3", mu: 0 },
    { id: "sf6", f: "SF6", c: "S", l: ["F", "F", "F", "F", "F", "F"], g: "6,0", mu: 0 }, { id: "xef4", f: "XeF4", c: "Xe", l: ["F", "F", "F", "F"], g: "4,2", mu: 0 }
  ];
  E.POL = POL;
  GEOM["1,0"] = { clave: "1,0", n: 1, m: 0, sn: 1, nombre: "diatómica (lineal)", hib: "—", ej: "HCl, HF", real: "—", pos: [[1, 0, 0]], lib: [] };
  E.polPorId = function (id) { for (var i = 0; i < POL.length; i++) if (POL[i].id === id) return POL[i]; return null; };
  // Devuelve { vect: [[x,y,z] por enlace], deltas: [Δχ firmado hacia el ligando], suma: [x,y,z], mag, polar }
  E.dipolo = function (p) {
    var g = GEOM[p.g], xc = E.chi(p.c), suma = [0, 0, 0], deltas = [], vect = [];
    p.l.forEach(function (s, i) {
      var d = E.chi(s) - xc, v = [g.pos[i][0] * d, g.pos[i][1] * d, g.pos[i][2] * d];
      deltas.push(d); vect.push(v); suma[0] += v[0]; suma[1] += v[1]; suma[2] += v[2];
    });
    var mag = Math.sqrt(suma[0] * suma[0] + suma[1] * suma[1] + suma[2] * suma[2]);
    return { vect: vect, deltas: deltas, suma: suma, mag: mag, polar: mag > 0.05 };
  };

  // ------------------------------------------------------------
  // Red iónica: radios (pm), energía reticular de tablas (kJ/mol) y estimación de Kapustinskii
  // ------------------------------------------------------------
  E.CATIONES = [["Li", 1, 76], ["Na", 1, 102], ["K", 1, 138], ["Rb", 1, 152], ["Cs", 1, 167], ["Mg", 2, 72], ["Ca", 2, 100], ["Sr", 2, 118], ["Ba", 2, 135], ["Al", 3, 54]];
  E.ANIONES = [["F", 1, 133], ["Cl", 1, 181], ["Br", 1, 196], ["I", 1, 220], ["O", 2, 140], ["S", 2, 184]];
  // fórmula → [energía reticular de tablas, punto de fusión °C]
  E.RET = {
    LiF: [1036, 845], LiCl: [853, 605], LiBr: [807, 552], LiI: [757, 469], NaF: [923, 993], NaCl: [787, 801], NaBr: [747, 747], NaI: [704, 661],
    KF: [821, 858], KCl: [715, 770], KBr: [682, 734], KI: [649, 681], RbCl: [689, 718], CsCl: [659, 645],
    MgO: [3791, 2852], CaO: [3401, 2613], SrO: [3223, 2430], BaO: [3054, 1923], MgF2: [2957, 1263], CaF2: [2630, 1418], MgCl2: [2526, 714], CaCl2: [2258, 772],
    Li2O: [2799, 1438], Na2O: [2481, 1132], K2O: [2238, 740], Al2O3: [15916, 2072]
  };
  function mcd(a, b) { return b ? mcd(b, a % b) : a; }
  E.KAP = { K: 120250, D: 34.5 };   // kJ·pm/mol y pm
  // Combina un catión y un anión (índices de E.CATIONES / E.ANIONES)
  E.sal = function (ic, ia) {
    var c = E.CATIONES[ic], a = E.ANIONES[ia], g = mcd(c[1], a[1]), x = a[1] / g, y = c[1] / g;      // x cationes, y aniones
    var f = c[0] + (x > 1 ? x : "") + a[0] + (y > 1 ? y : ""), d = c[2] + a[2], nu = x + y;
    var kap = E.KAP.K * nu * c[1] * a[1] / d * (1 - E.KAP.D / d), r = c[2] / a[2];
    var rr = r > 1 ? 1 / r : r;                       // si el catión es mayor que el anión, la regla se aplica al cociente inverso (pequeño/grande)
    var cn = rr < 0.225 ? 3 : rr < 0.414 ? 4 : rr < 0.732 ? 6 : 8;
    return { f: f, x: x, y: y, nu: nu, d: d, kap: kap, razon: r, rr: rr, cn: cn, q: c[1] * a[1], ref: E.RET[f] || null, ind: c[1] * a[1] / d };
  };
  // ------------------------------------------------------------
  // Ciclos de Born–Haber (kJ/mol): sublimación del metal, energías de ionización, atomización del no metal, afinidades, entalpía de formación
  // ------------------------------------------------------------
  E.BH = [
    { f: "NaCl", n: "cloruro de sodio", pasos: [["Sublimación del Na: Na(s) → Na(g)", 107], ["Ionización: Na(g) → Na⁺(g) + e⁻", 496], ["Atomización: ½ Cl₂(g) → Cl(g)", 122], ["Afinidad electrónica: Cl(g) + e⁻ → Cl⁻(g)", -349]], hf: -411 },
    { f: "KCl", n: "cloruro de potasio", pasos: [["Sublimación del K", 89], ["Ionización: K(g) → K⁺(g) + e⁻", 419], ["Atomización: ½ Cl₂(g) → Cl(g)", 122], ["Afinidad electrónica del Cl", -349]], hf: -437 },
    { f: "LiF", n: "fluoruro de litio", pasos: [["Sublimación del Li", 159], ["Ionización: Li(g) → Li⁺(g) + e⁻", 520], ["Atomización: ½ F₂(g) → F(g)", 79], ["Afinidad electrónica del F", -328]], hf: -617 },
    { f: "NaF", n: "fluoruro de sodio", pasos: [["Sublimación del Na", 107], ["Ionización: Na(g) → Na⁺(g) + e⁻", 496], ["Atomización: ½ F₂(g) → F(g)", 79], ["Afinidad electrónica del F", -328]], hf: -574 },
    { f: "MgO", n: "óxido de magnesio", pasos: [["Sublimación del Mg", 148], ["1.ª + 2.ª ionización: Mg(g) → Mg²⁺(g) + 2 e⁻ (738 + 1451)", 2189], ["Atomización: ½ O₂(g) → O(g)", 249], ["1.ª afinidad: O(g) + e⁻ → O⁻(g)", -141], ["2.ª afinidad: O⁻(g) + e⁻ → O²⁻(g) (¡endotérmica!)", 744]], hf: -602 },
    { f: "MgCl2", n: "cloruro de magnesio", pasos: [["Sublimación del Mg", 148], ["1.ª + 2.ª ionización del Mg (738 + 1451)", 2189], ["Atomización: 2 · ½ Cl₂(g) → 2 Cl(g) (2 · 122)", 244], ["Afinidad electrónica de 2 Cl (2 · (−349))", -698]], hf: -641 },
    { f: "CaCl2", n: "cloruro de calcio", pasos: [["Sublimación del Ca", 178], ["1.ª + 2.ª ionización del Ca (590 + 1145)", 1735], ["Atomización: 2 · ½ Cl₂(g) → 2 Cl(g) (2 · 122)", 244], ["Afinidad electrónica de 2 Cl (2 · (−349))", -698]], hf: -795 }
  ];
  // Energía reticular (kJ/mol, positiva) por la ley de Hess: ΔHf = Σ pasos − U
  E.bhU = function (c) { var s = 0; c.pasos.forEach(function (p) { s += p[1]; }); return s - c.hf; };

  // ------------------------------------------------------------
  // Propiedades de sustancias y clasificación
  // ------------------------------------------------------------
  var TIPOS_SUST = { ionico: "sólido iónico", molecular: "sustancia covalente molecular", reticular: "sólido covalente (red)", metalico: "metal" };
  E.TIPOS_SUST = TIPOS_SUST;
  // cs, cf, cd: conduce sólido / fundido / disuelto (null = no se disuelve) · m: maleable
  var SUST = [
    { f: "NaCl", n: "sal común", tipo: "ionico", tf: 801, teb: 1465, cs: false, cf: true, cd: true, sa: "muy soluble", m: false, dur: "duro y frágil" },
    { f: "KBr", n: "bromuro de potasio", tipo: "ionico", tf: 734, teb: 1435, cs: false, cf: true, cd: true, sa: "muy soluble", m: false, dur: "duro y frágil" },
    { f: "MgO", n: "óxido de magnesio", tipo: "ionico", tf: 2852, teb: 3600, cs: false, cf: true, cd: null, sa: "prácticamente insoluble", m: false, dur: "muy duro y frágil" },
    { f: "CaF2", n: "fluorita", tipo: "ionico", tf: 1418, teb: 2533, cs: false, cf: true, cd: null, sa: "prácticamente insoluble", m: false, dur: "duro y frágil" },
    { f: "Fe", n: "hierro", tipo: "metalico", tf: 1538, teb: 2862, cs: true, cf: true, cd: null, sa: "insoluble", m: true, dur: "duro, maleable y dúctil" },
    { f: "Cu", n: "cobre", tipo: "metalico", tf: 1085, teb: 2562, cs: true, cf: true, cd: null, sa: "insoluble", m: true, dur: "maleable y dúctil" },
    { f: "Na", n: "sodio", tipo: "metalico", tf: 98, teb: 883, cs: true, cf: true, cd: null, sa: "reacciona con el agua", m: true, dur: "blando y maleable" },
    { f: "Hg", n: "mercurio", tipo: "metalico", tf: -39, teb: 357, cs: true, cf: true, cd: null, sa: "insoluble", m: true, dur: "líquido a 25 °C" },
    { f: "C (diamante)", n: "diamante", tipo: "reticular", tf: 3550, teb: null, cs: false, cf: false, cd: null, sa: "insoluble", m: false, dur: "el más duro (10 en Mohs)" },
    { f: "SiO2", n: "cuarzo (sílice)", tipo: "reticular", tf: 1713, teb: 2950, cs: false, cf: false, cd: null, sa: "insoluble", m: false, dur: "muy duro" },
    { f: "C (grafito)", n: "grafito", tipo: "reticular", tf: 3652, teb: null, cs: true, cf: true, cd: null, sa: "insoluble", m: false, dur: "blando (capas que se deslizan)" },
    { f: "SiC", n: "carburo de silicio", tipo: "reticular", tf: 2730, teb: null, cs: false, cf: false, cd: null, sa: "insoluble", m: false, dur: "muy duro" },
    { f: "H2O", n: "agua", tipo: "molecular", tf: 0, teb: 100, cs: false, cf: false, cd: false, sa: "(es el disolvente)", m: false, dur: "líquido a 25 °C" },
    { f: "CO2", n: "dióxido de carbono", tipo: "molecular", tf: -57, teb: -78, cs: false, cf: false, cd: false, sa: "poco soluble", m: false, dur: "gas a 25 °C (sublima a −78 °C)" },
    { f: "C12H22O11", n: "sacarosa (azúcar)", tipo: "molecular", tf: 186, teb: null, cs: false, cf: false, cd: false, sa: "muy soluble", m: false, dur: "blando, se descompone al fundir" },
    { f: "C10H8", n: "naftaleno", tipo: "molecular", tf: 80, teb: 218, cs: false, cf: false, cd: null, sa: "insoluble", m: false, dur: "blando" },
    { f: "I2", n: "yodo", tipo: "molecular", tf: 114, teb: 184, cs: false, cf: false, cd: null, sa: "muy poco soluble", m: false, dur: "blando, sublima con facilidad" },
    { f: "S8", n: "azufre", tipo: "molecular", tf: 115, teb: 445, cs: false, cf: false, cd: null, sa: "insoluble", m: false, dur: "blando y quebradizo" },
    { f: "CH4", n: "metano", tipo: "molecular", tf: -182, teb: -162, cs: false, cf: false, cd: null, sa: "insoluble", m: false, dur: "gas a 25 °C" },
    { f: "C2H5OH", n: "etanol", tipo: "molecular", tf: -114, teb: 78, cs: false, cf: false, cd: false, sa: "miscible", m: false, dur: "líquido a 25 °C" },
    { f: "HCl", n: "cloruro de hidrógeno", tipo: "molecular", tf: -114, teb: -85, cs: false, cf: false, cd: true, sa: "muy soluble (se ioniza)", m: false, dur: "gas a 25 °C" }
  ];
  E.SUST = SUST;
  E.clasifica = function (p) {
    if (p.cs) return p.m ? "metalico" : "reticular";
    if (p.cf) return "ionico";
    return p.tf > 1500 ? "reticular" : "molecular";
  };

  // ------------------------------------------------------------
  // Fuerzas intermoleculares: puntos de ebullición normales (°C)
  // ------------------------------------------------------------
  E.FZA = {
    g14: { t: "Hidruros del grupo 14", x: ["CH₄", "SiH₄", "GeH₄", "SnH₄"], y: [-162, -112, -88, -52], per: [2, 3, 4, 5], nota: "Moléculas apolares (tetraedro): solo fuerzas de London, que crecen con el tamaño." },
    g15: { t: "Hidruros del grupo 15", x: ["NH₃", "PH₃", "AsH₃", "SbH₃"], y: [-33, -88, -62, -17], per: [2, 3, 4, 5], nota: "El NH₃ rompe la tendencia: forma puentes de hidrógeno." },
    g16: { t: "Hidruros del grupo 16", x: ["H₂O", "H₂S", "H₂Se", "H₂Te"], y: [100, -60, -41, -2], per: [2, 3, 4, 5], nota: "El H₂O es la anomalía más espectacular de la tabla." },
    g17: { t: "Hidrácidos del grupo 17", x: ["HF", "HCl", "HBr", "HI"], y: [20, -85, -67, -35], per: [2, 3, 4, 5], nota: "El HF forma puentes de hidrógeno muy fuertes (en cadenas)." },
    nobles: { t: "Gases nobles", x: ["He", "Ne", "Ar", "Kr", "Xe"], y: [-269, -246, -186, -153, -108], per: [1, 2, 3, 4, 5], nota: "Átomos sin dipolo: solo London; crece con el número de electrones." },
    halogenos: { t: "Halógenos (X₂)", x: ["F₂", "Cl₂", "Br₂", "I₂"], y: [-188, -34, 59, 184], per: [2, 3, 4, 5], nota: "Moléculas apolares: gas, gas, líquido y sólido a 25 °C según crece la polarizabilidad." },
    alcanos: { t: "Alcanos lineales CₙH₂ₙ₊₂", x: ["CH₄", "C₂H₆", "C₃H₈", "C₄H₁₀", "C₅H₁₂", "C₆H₁₄", "C₇H₁₆", "C₈H₁₈", "C₉H₂₀", "C₁₀H₂₂"], y: [-162, -89, -42, -1, 36, 69, 98, 126, 151, 174], per: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], nota: "Cada CH₂ añade superficie de contacto y electrones: London crece y la temperatura de ebullición sube unos 30 °C por carbono." }
  };
  E.ISOMEROS = [
    { t: "Pentano (3 isómeros C₅H₁₂)", d: [["n-pentano (cadena lineal)", 36], ["isopentano (2-metilbutano)", 28], ["neopentano (2,2-dimetilpropano)", 9.5]], nota: "Más ramificado = más compacto y menos superficie de contacto = menos London = menor temperatura de ebullición." },
    { t: "C₂H₆O: etanol frente a éter dimetílico", d: [["etanol, CH₃CH₂OH (puente de H)", 78], ["éter dimetílico, CH₃OCH₃ (sin puente de H)", -24]], nota: "Misma fórmula molecular, 100 °C de diferencia: el grupo O–H forma puentes de hidrógeno." },
    { t: "Alcohol y alcano de masa parecida", d: [["propano C₃H₈ (M = 44)", -42], ["etanal CH₃CHO (M = 44, dipolo)", 20], ["etanol C₂H₅OH (M = 46, puente de H)", 78]], nota: "Con masa casi igual: solo London < dipolo–dipolo < puente de hidrógeno." }
  ];
  // energías típicas de cada interacción (kJ/mol)
  E.ENERGIAS = [["Enlace iónico (red)", "400–4 000", "entre iones, en el cristal"], ["Enlace covalente", "150–1 000", "dentro de la molécula (C–C 347 · O–H 463 · N≡N 945)"], ["Ion–dipolo", "40–600", "NaCl disuelto en agua"], ["Puente de hidrógeno", "10–40", "H₂O···H₂O ≈ 21"], ["Dipolo–dipolo (Keesom)", "5–25", "HCl···HCl"], ["Dipolo–dipolo inducido (Debye)", "2–10", "HCl···Ar"], ["London (dispersión)", "0,05–40", "crece con el tamaño: He ≈ 0,1 · I₂ ≈ 20"]];

  // ------------------------------------------------------------
  // Hibridación: orbitales híbridos y enlaces σ y π
  // ------------------------------------------------------------
  E.HIB = [
    { k: "sp", n: 2, ang: "180°", puros: 2, geom: "lineal", ej: "BeCl₂, CO₂, HCN, C₂H₂", conf: "2s¹ 2p¹ → 2 sp + 2 p puros" },
    { k: "sp²", n: 3, ang: "120°", puros: 1, geom: "trigonal plana", ej: "BF₃, C₂H₄, CH₂O, NO₃⁻", conf: "2s¹ 2p² → 3 sp² + 1 p puro" },
    { k: "sp³", n: 4, ang: "109,5°", puros: 0, geom: "tetraédrica", ej: "CH₄, NH₃, H₂O, NH₄⁺", conf: "2s¹ 2p³ → 4 sp³" }
  ];
  // enl: [átomo 1, átomo 2, orden]; hib: hibridación de cada átomo central
  E.SIGPI = [
    { f: "CH4", enl: [["C", "H", 1], ["C", "H", 1], ["C", "H", 1], ["C", "H", 1]], hib: { C: "sp³" } },
    { f: "C2H6", enl: [["C", "C", 1], ["C", "H", 1], ["C", "H", 1], ["C", "H", 1], ["C", "H", 1], ["C", "H", 1], ["C", "H", 1]], hib: { C: "sp³" } },
    { f: "C2H4", enl: [["C", "C", 2], ["C", "H", 1], ["C", "H", 1], ["C", "H", 1], ["C", "H", 1]], hib: { C: "sp²" } },
    { f: "C2H2", enl: [["C", "C", 3], ["C", "H", 1], ["C", "H", 1]], hib: { C: "sp" } },
    { f: "N2", enl: [["N", "N", 3]], hib: { N: "sp" } },
    { f: "O2", enl: [["O", "O", 2]], hib: { O: "sp²" } },
    { f: "CO2", enl: [["C", "O", 2], ["C", "O", 2]], hib: { C: "sp" } },
    { f: "HCN", enl: [["H", "C", 1], ["C", "N", 3]], hib: { C: "sp", N: "sp" } },
    { f: "CH2O", enl: [["C", "O", 2], ["C", "H", 1], ["C", "H", 1]], hib: { C: "sp²", O: "sp²" } },
    { f: "H2O", enl: [["O", "H", 1], ["O", "H", 1]], hib: { O: "sp³" } },
    { f: "NH3", enl: [["N", "H", 1], ["N", "H", 1], ["N", "H", 1]], hib: { N: "sp³" } },
    { f: "BF3", enl: [["B", "F", 1], ["B", "F", 1], ["B", "F", 1]], hib: { B: "sp²" } },
    { f: "C6H6", enl: [["C", "C", 1.5], ["C", "C", 1.5], ["C", "C", 1.5], ["C", "C", 1.5], ["C", "C", 1.5], ["C", "C", 1.5], ["C", "H", 1], ["C", "H", 1], ["C", "H", 1], ["C", "H", 1], ["C", "H", 1], ["C", "H", 1]], hib: { C: "sp²" } },
    { f: "CH3COOH", enl: [["C", "H", 1], ["C", "H", 1], ["C", "H", 1], ["C", "C", 1], ["C", "O", 2], ["C", "O", 1], ["O", "H", 1]], hib: { C: "sp³ (CH₃) y sp² (COOH)", O: "sp² y sp³" } }
  ];
  // σ = un enlace σ por cada par de átomos unidos; π = orden − 1 (en el benceno, 3 π deslocalizados repartidos en 6 enlaces C–C de orden 1,5)
  E.sigpi = function (m) {
    var sg = 0, pi = 0;
    m.enl.forEach(function (e) { sg += 1; pi += e[2] - 1; });
    return { sigma: sg, pi: pi };
  };

  // ------------------------------------------------------------
  // Volcado para la verificación independiente (Node)
  // ------------------------------------------------------------
  E.volcar = function () {
    var geom = {}, mol = {}, pol = {}, sales = {}, bh = {}, sp = {};
    Object.keys(GEOM).forEach(function (k) { var g = GEOM[k]; geom[k] = { n: g.n, m: g.m, sn: g.sn, nombre: g.nombre, hib: g.hib, pos: g.pos, lib: g.lib, angulos: g.n > 1 ? E.angulosEnlace(k) : [] }; });
    MOL.forEach(function (m) { var a = E.analizar(m); mol[m.id] = { f: m.f, q: m.q, a: m.a.map(function (x) { return [x.s, x.lp, x.ue]; }), b: m.b, g: m.g || null, analisis: a }; });
    POL.forEach(function (p) { var d = E.dipolo(p); pol[p.id] = { c: p.c, l: p.l, g: p.g, mu: p.mu, suma: d.suma, mag: d.mag, polar: d.polar, deltas: d.deltas }; });
    E.CATIONES.forEach(function (c, i) { E.ANIONES.forEach(function (a, j) { var s = E.sal(i, j); sales[s.f] = { x: s.x, y: s.y, nu: s.nu, d: s.d, kap: s.kap, razon: s.razon, cn: s.cn, ref: s.ref }; }); });
    E.BH.forEach(function (c) { bh[c.f] = { pasos: c.pasos.map(function (p) { return p[1]; }), hf: c.hf, U: E.bhU(c) }; });
    E.SIGPI.forEach(function (m) { sp[m.f] = E.sigpi(m); });
    return { GEOM: geom, MOL: mol, POL: pol, SALES: sales, RET: E.RET, BH: bh, SUST: SUST.map(function (s) { return { f: s.f, tipo: s.tipo, tf: s.tf, cs: s.cs, cf: s.cf, cd: s.cd, m: s.m, clase: E.clasifica(s) }; }),
      FZA: E.FZA, ISOMEROS: E.ISOMEROS, SIGPI: sp, KAP: E.KAP, CATIONES: E.CATIONES, ANIONES: E.ANIONES,
      pares: [[1, 9], [11, 17], [1, 17], [8, 8], [11, 9], [26, 26], [6, 17], [13, 17], [14, 8], [1, 1], [1, 6], [37, 9], [3, 9], [12, 8], [20, 9]].map(function (p) { var r = E.enlace(p[0], p[1]); return [p[0], p[1], r.d, r.pct, r.clave]; }) };
  };

  // ============================================================
  // Q2_DELTAEN: electronegatividad y tipo de enlace
  // ============================================================
  var PRE_EN = [["NaCl", 11, 17], ["HCl", 1, 17], ["H₂", 1, 1], ["O₂", 8, 8], ["HF", 1, 9], ["C–H", 6, 1], ["C–O", 6, 8], ["RbF", 37, 9], ["MgO", 12, 8], ["Al–Cl", 13, 17], ["Fe–Fe", 26, 26], ["Si–O", 14, 8]];
  B.w.q2_deltaen = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Electronegatividad y tipo de enlace entre dos elementos");
    cuerpo.innerHTML = '<div data-pre class="chips"></div><div data-ctl></div><div class="q2-fila"><div class="q2-lienzo q2-en"></div><div class="lectura anch"></div></div><div class="q2-escala"></div><p class="w-pie"></p>';
    var st = { a: 11, b: 17 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lienzo = cuerpo.querySelector(".q2-en"), lectura = cuerpo.querySelector(".lectura"), escala = cuerpo.querySelector(".q2-escala"), pie = cuerpo.querySelector(".w-pie"), sa, sb;
    sa = U.slider(ctl, { et: "Elemento A", min: 1, max: 54, step: 1, val: st.a, on: function (v) { st.a = v; pinta(); }, fmt: function (v) { return v + " · " + EL[v - 1].s; } });
    sb = U.slider(ctl, { et: "Elemento B", min: 1, max: 54, step: 1, val: st.b, on: function (v) { st.b = v; pinta(); }, fmt: function (v) { return v + " · " + EL[v - 1].s; } });
    var COL = { ionico: "#C23B4E", polar: "#E2A400", apolar: "#2E86DE", metalico: "#13804B", noble: "#8A8F9C" };
    function pinta() {
      var a = EL[st.a - 1], b = EL[st.b - 1], r = E.enlace(a.Z, b.Z), s, cx1 = 62, cx2 = 178, ra = Math.min(34, 14 + (a.r || 60) / 5), rb = Math.min(34, 14 + (b.r || 60) / 5), y = 70;
      s = '<svg viewBox="0 0 240 140" class="q2-svg" role="img" aria-label="Enlace entre ' + a.n + " y " + b.n + '">';
      s += '<circle cx="' + cx1 + '" cy="' + y + '" r="' + ra + '" class="q2-nube a"/><circle cx="' + cx2 + '" cy="' + y + '" r="' + rb + '" class="q2-nube b"/>';
      s += '<text x="' + cx1 + '" y="' + (y + 5) + '" text-anchor="middle" class="q2-sim">' + a.s + '</text><text x="' + cx2 + '" y="' + (y + 5) + '" text-anchor="middle" class="q2-sim">' + b.s + "</text>";
      if (r.clave === "ionico") {
        var ca = a.en < b.en ? 1 : 2; // el menos electronegativo cede
        s += '<line x1="' + (ca === 1 ? cx1 + ra : cx2 - rb) + '" y1="' + y + '" x2="' + (ca === 1 ? cx2 - rb : cx1 + ra) + '" y2="' + y + '" class="q2-flecha"/><circle cx="' + (cx1 + cx2) / 2 + '" cy="' + (y - 14) + '" r="3" class="q2-ue"/>';
        s += '<text x="' + cx1 + '" y="' + (y - ra - 6) + '" text-anchor="middle" class="q2-carga">' + (ca === 1 ? "+" : "−") + '</text><text x="' + cx2 + '" y="' + (y - rb - 6) + '" text-anchor="middle" class="q2-carga">' + (ca === 1 ? "−" : "+") + "</text>";
        s += '<text x="120" y="130" text-anchor="middle" class="q2-pie">el electrón pasa de A a B</text>';
      } else if (r.clave === "metalico") {
        for (var k = 0; k < 14; k++) s += '<circle cx="' + (70 + 100 * ((k * 37) % 10) / 10) + '" cy="' + (30 + 80 * ((k * 53) % 10) / 10) + '" r="2.3" class="q2-ue"/>';
        s += '<text x="120" y="130" text-anchor="middle" class="q2-pie">electrones deslocalizados</text>';
      } else if (r.clave !== "noble") {
        var xm = cx1 + (cx2 - cx1) * (a.en / (a.en + b.en)), dxm = xm;
        s += '<circle cx="' + (dxm - 4) + '" cy="' + (y - 5) + '" r="3" class="q2-lp"/><circle cx="' + (dxm - 4) + '" cy="' + (y + 5) + '" r="3" class="q2-lp"/>';
        s += '<ellipse cx="' + (dxm - 4) + '" cy="' + y + '" rx="' + (10 + 12 * (1 - r.d / 3.5)) + '" ry="14" class="q2-par"/>';
        if (r.clave === "polar") { var dm = a.en < b.en ? [1, 2] : [2, 1]; s += '<text x="' + (dm[0] === 1 ? cx1 : cx2) + '" y="' + (y - ra - 6) + '" text-anchor="middle" class="q2-carga">δ+</text><text x="' + (dm[1] === 1 ? cx1 : cx2) + '" y="' + (y - (dm[1] === 1 ? ra : rb) - 6) + '" text-anchor="middle" class="q2-carga">δ−</text>'; }
        s += '<text x="120" y="130" text-anchor="middle" class="q2-pie">el par compartido se desplaza hacia el más electronegativo</text>';
      } else s += '<text x="120" y="130" text-anchor="middle" class="q2-pie">un gas noble no suele formar enlace</text>';
      lienzo.innerHTML = s + "</svg>";
      lectura.innerHTML = fil("Electronegatividades", a.s + " " + (a.en == null ? "—" : f2(a.en)) + " · " + b.s + " " + (b.en == null ? "—" : f2(b.en)), "pen ancho") + fil("Diferencia Δχ", r.d == null ? "—" : f2(r.d), "red") + fil("Carácter iónico (Pauling)", r.pct == null ? "—" : fmt(r.pct, 0) + " %", "ok") +
        fil("Tipo de enlace", r.tipo, "pen ancho") + fil("Tipos de elementos", Q.TIPOS[a.t] + " + " + Q.TIPOS[b.t].toLowerCase(), "ancho");
      // escala de Δχ
      var x = r.d == null ? null : Math.min(100, r.d / 3.5 * 100);
      escala.innerHTML = '<div class="q2-barra"><span class="z1" style="width:' + (0.4 / 3.5 * 100) + '%"></span><span class="z2" style="width:' + ((1.7 - 0.4) / 3.5 * 100) + '%"></span><span class="z3" style="width:' + ((3.5 - 1.7) / 3.5 * 100) + '%"></span>' + (x == null ? "" : '<i class="q2-marca" style="left:' + x + '%"></i>') + '</div><div class="q2-rot"><span style="left:5%">apolar</span><span style="left:30%">polar</span><span style="left:72%">iónico</span></div>';
      pie.innerHTML = "Un par compartido se reparte según la electronegatividad. <b>Δχ &lt; 0,4</b>: covalente apolar · <b>0,4 ≤ Δχ &lt; 1,7</b>: covalente polar · <b>Δχ ≥ 1,7</b> entre un metal y un no metal: iónico · dos metales: metálico. Son fronteras orientativas: en realidad es un continuo (el «carácter iónico» del NaCl es ≈ 70 %, no 100 %).";
    }
    U.fichas(cuerpo.querySelector("[data-pre]"), PRE_EN.map(function (p, i) { return { k: String(i), t: p[0] }; }), "0", function (k) { var p = PRE_EN[+k]; st.a = p[1]; st.b = p[2]; sa.set(st.a); sb.set(st.b); pinta(); });
    pinta();
  };

  // ============================================================
  // Q2_LEWIS: estructuras de Lewis y cuenta de electrones
  // ============================================================
  B.w.q2_lewis = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Estructuras de Lewis: electrones, pares y cargas formales");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ctl></div><div class="q2-fila"><div class="q2-lienzo q2-lw"></div><div class="lectura anch"></div></div><div class="q2-juego"></div><p class="w-pie"></p>';
    var st = { id: "h2o", capa: 2 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lienzo = cuerpo.querySelector(".q2-lw"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), juego = cuerpo.querySelector(".q2-juego");
    var CAPAS = ["1 · esqueleto (átomos unidos con enlaces sencillos)", "2 · pares libres y enlaces múltiples", "3 · cargas formales"];
    U.slider(ctl, { et: "Paso", min: 0, max: 2, step: 1, val: st.capa, on: function (v) { st.capa = v; pinta(); }, fmt: function (v) { return CAPAS[v]; } });
    function pinta() {
      var m = E.molPorId(st.id), an = E.analizar(m), suma = m.a.map(function (x) { return E.valencia(x.s); });
      lienzo.innerHTML = E.lewisSVG(m, st.capa);
      var cuenta = m.a.map(function (x) { return x.s; }).reduce(function (o, s) { o[s] = (o[s] || 0) + 1; return o; }, {}), partes = Object.keys(cuenta).map(function (s) { return (cuenta[s] > 1 ? cuenta[s] + "·" : "") + E.valencia(s); });
      var nf = []; an.fc.forEach(function (f, i) { if (f !== 0) nf.push(m.a[i].s + (f > 0 ? " +" : " −") + Math.abs(f)); });
      var oc = {}; an.octeto.forEach(function (o, i) { if (o !== "completo") oc[o] = (oc[o] || []).concat(m.a[i].s); });
      var ocTxt = Object.keys(oc).length ? Object.keys(oc).map(function (k) { return k + " en " + oc[k].join(", "); }).join("; ") : "todos los átomos cumplen el octeto (el H, el dueto)";
      lectura.innerHTML = fil("Especie", Q.sub(m.f) + " · " + m.n, "pen ancho") + fil("1. Electrones de valencia", partes.join(" + ") + (m.q ? (m.q > 0 ? " − " + m.q : " + " + (-m.q)) : "") + " = " + an.total + " e⁻ (" + (an.total / 2) + " pares)", "ancho") +
        fil("2. Pares enlazantes", String(an.pares)) + fil("3. Pares libres", String(an.libres) + (an.desapareados ? " y " + an.desapareados + " e⁻ desapareado" : "")) +
        fil("Comprobación", "2·(" + an.pares + " + " + an.libres + ")" + (an.desapareados ? " + " + an.desapareados : "") + " = " + an.cuenta + " e⁻ " + (an.ok ? "✓" : "✗"), an.ok ? "ok" : "red") + fil("4. Cargas formales", nf.length ? nf.join(" · ") + " (suma " + (an.sumaFC > 0 ? "+" : "") + an.sumaFC + ")" : "todas 0", "red") +
        fil("Octeto", ocTxt, "ancho") + (m.g ? fil("Geometría del átomo central", E.GEOM[m.g].nombre + " (AX" + E.GEOM[m.g].n + (E.GEOM[m.g].m ? "E" + (E.GEOM[m.g].m > 1 ? E.GEOM[m.g].m : "") : "") + ")", "ancho") : "") + (m.res ? fil("Resonancia", m.res + " formas equivalentes", "ancho") : "");
      pie.innerHTML = m.nota + " <b>Cargas formales</b>: CF = e⁻ de valencia − (e⁻ de pares libres + nº de enlaces); la suma debe dar la carga total. Entre varias estructuras es mejor la de cargas formales más pequeñas y las negativas sobre los átomos más electronegativos.";
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), MOL.map(function (m) { return { k: m.id, t: Q.sub(m.f) }; }), st.id, function (k) { st.id = k; pinta(); });
    // reto: cuenta los electrones de valencia
    var reto = null;
    function nuevo() {
      var cand = MOL.filter(function (m) { return !m.ue; }), m = cand[Math.floor(Math.random() * cand.length)], an = E.analizar(m);
      reto = { m: m, total: an.total, libres: an.libres };
      juego.innerHTML = "<p><b>Reto:</b> ¿cuántos electrones de valencia hay en total en <b>" + Q.sub(m.f) + "</b> (" + m.n + ")? ¿Y cuántos pares libres tiene la estructura?</p><div class='q2-reto'><label>e⁻ de valencia <input type='text' inputmode='numeric' data-t autocomplete='off'></label><label>pares libres <input type='text' inputmode='numeric' data-l autocomplete='off'></label><button type='button' class='chip-btn' data-c>Comprobar</button><button type='button' class='chip-btn' data-n>Otra especie</button></div><p class='q2-msg' aria-live='polite'></p>";
      juego.querySelector("[data-c]").onclick = function () {
        var t = parseInt(juego.querySelector("[data-t]").value, 10), l = parseInt(juego.querySelector("[data-l]").value, 10), msg = juego.querySelector(".q2-msg");
        if (isNaN(t) || isNaN(l)) { msg.innerHTML = "Escribe los dos números."; return; }
        msg.innerHTML = t === reto.total && l === reto.libres ? "<b style='color:var(--ok)'>✓ Correcto.</b> " + reto.total + " e⁻ = " + reto.total / 2 + " pares; " + (reto.total / 2 - E.analizar(reto.m).pares) + " son pares libres." : "<b style='color:var(--red)'>Todavía no.</b> " + (t !== reto.total ? "Suma los electrones de valencia de cada átomo y ajusta por la carga (un anión suma, un catión resta). " : "El total es correcto; ahora resta los pares que forman enlaces: total/2 − pares enlazantes. ") + "Mira la estructura de arriba eligiendo esa especie.";
      };
      juego.querySelector("[data-n]").onclick = nuevo;
    }
    pinta(); nuevo();
  };

  // ============================================================
  // Q2_VSEPR: geometría molecular
  // ============================================================
  function nombreAX(g) { return "AX" + U.sub(g.n) + (g.m ? "E" + (g.m > 1 ? U.sub(g.m) : "") : ""); }
  function lobulo(cx, cy, dx, dy, z, col) {
    var L = Math.sqrt(dx * dx + dy * dy), ang = Math.atan2(dy, dx) * 180 / Math.PI, len = Math.max(10, L), op = 0.35 + 0.25 * (z + 1) / 2;
    return '<ellipse cx="' + (cx + dx * 0.5).toFixed(1) + '" cy="' + (cy + dy * 0.5).toFixed(1) + '" rx="' + Math.max(8, len * 0.42).toFixed(1) + '" ry="9" transform="rotate(' + ang.toFixed(1) + " " + (cx + dx * 0.5).toFixed(1) + " " + (cy + dy * 0.5).toFixed(1) + ')" fill="' + col + '" fill-opacity="' + op.toFixed(2) + '" stroke="' + col + '" stroke-width="1"/>';
  }
  E.vseprSVG = function (k, ay, ax, opts) {
    opts = opts || {};
    var g = GEOM[k], c = [120, 105], R = 74, items = [], s = '<svg viewBox="0 0 240 210" class="q2-svg" role="img" aria-label="Geometría ' + g.nombre + '">';
    g.pos.forEach(function (v, i) { var r = E.gira(v, ay, ax); items.push({ t: "b", r: r, i: i }); });
    g.lib.forEach(function (v, i) { var r = E.gira(v, ay, ax); items.push({ t: "l", r: r, i: i }); });
    items.sort(function (p, q) { return p.r[2] - q.r[2]; });
    var centroHecho = false;
    function centro() { s += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="15" class="q2-central"/>'; centroHecho = true; }
    items.forEach(function (it) {
      if (!centroHecho && it.r[2] >= 0) centro();
      var x = c[0] + R * it.r[0], y = c[1] - R * it.r[1], z = it.r[2];
      if (it.t === "b") {
        s += '<line x1="' + c[0] + '" y1="' + c[1] + '" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '" class="q2-enl" stroke-width="' + (3 + z * 1.4).toFixed(1) + '"/>';
        s += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (11 + z * 2.5).toFixed(1) + '" class="q2-lig"/><text x="' + x.toFixed(1) + '" y="' + (y + 4.5).toFixed(1) + '" text-anchor="middle" class="q2-simx">X</text>';
      } else s += lobulo(c[0], c[1], x - c[0], y - c[1], z, "#E2A400");
    });
    if (!centroHecho) centro();
    s += '<text x="' + c[0] + '" y="' + (c[1] + 5) + '" text-anchor="middle" class="q2-simc q2-sobre">A</text>';
    // ángulos
    if (opts.angulo && g.n > 1) {
      var ang = E.angulosEnlace(k); s += '<text x="8" y="16" class="q2-pie">ángulos ideales: ' + ang.map(function (a) { return fmt(a, 1) + "°"; }).join(" · ") + "</text>";
    }
    return s + "</svg>";
  };
  B.w.q2_vsepr = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "Geometría molecular (TRPECV): enlaces, pares libres y forma");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ctl></div><div class="q2-fila"><div class="q2-lienzo q2-vs"></div><div class="lectura anch"></div></div><p class="w-pie"></p>';
    var st = { k: "3,1", ay: 0.6, ax: 0.35 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lienzo = cuerpo.querySelector(".q2-vs"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie"), slAy, slAx;
    slAy = U.slider(ctl, { et: "Girar", min: 0, max: 360, step: 1, val: Math.round(st.ay * 180 / Math.PI), on: function (v) { st.ay = v * Math.PI / 180; pinta(); }, fmt: function (v) { return v + "°"; } });
    slAx = U.slider(ctl, { et: "Inclinar", min: -60, max: 60, step: 1, val: Math.round(st.ax * 180 / Math.PI), on: function (v) { st.ax = v * Math.PI / 180; pinta(); }, fmt: function (v) { return v + "°"; } });
    function pinta() {
      var g = GEOM[st.k];
      lienzo.innerHTML = E.vseprSVG(st.k, st.ay, st.ax, { angulo: true });
      lectura.innerHTML = fil("Notación", nombreAX(g) + " (" + g.n + (g.n === 1 ? " enlace · " : " enlaces · ") + (g.m === 1 ? "1 par libre" : g.m + " pares libres") + ")", "pen ancho") + fil("Pares de electrones (nº estérico)", String(g.sn), "red") + fil("Geometría molecular", g.nombre, "ok ancho") +
        fil("Hibridación del átomo central", g.hib) + fil("Ángulos", g.real) + fil("Ejemplos", g.ej, "ancho");
      pie.innerHTML = "<b>TRPECV</b>: los pares de electrones de la capa de valencia (enlazantes y libres) se repelen y se colocan lo más lejos posible. La geometría de los <i>pares</i> depende del nº estérico (2 lineal · 3 trigonal · 4 tetraédrica · 5 bipirámide · 6 octaedro) y la forma de la <i>molécula</i> solo cuenta los átomos: los pares libres (lóbulos amarillos) ocupan más espacio que los enlazantes y cierran un poco los ángulos (NH₃ 107°, H₂O 104,5°).";
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), E.ordenGeom.map(function (k) { var g = GEOM[k]; return { k: k, t: nombreAX(g) + " · " + g.nombre }; }), st.k, function (k) { st.k = k; pinta(); });
    pinta();
  };

  // ============================================================
  // Q2_POLARIDAD: momentos dipolares y polaridad de la molécula
  // ============================================================
  B.w.q2_polaridad = function (host) {
    var cuerpo = B.caja(host, "Pruébalo", "¿Molécula polar o apolar? Suma de los dipolos de enlace");
    cuerpo.innerHTML = '<div data-sel class="chips"></div><div data-ctl></div><div class="q2-fila"><div class="q2-lienzo q2-pl"></div><div class="lectura anch"></div></div><p class="w-pie"></p>';
    var st = { id: "h2o", ay: 0.5, ax: 0.3, ver: 1 }, ctl = U.ctl(cuerpo.querySelector("[data-ctl]")), lienzo = cuerpo.querySelector(".q2-pl"), lectura = cuerpo.querySelector(".lectura"), pie = cuerpo.querySelector(".w-pie");
    U.slider(ctl, { et: "Girar", min: 0, max: 360, step: 1, val: 29, on: function (v) { st.ay = v * Math.PI / 180; pinta(); }, fmt: function (v) { return v + "°"; } });
    U.slider(ctl, { et: "Mostrar", min: 0, max: 1, step: 1, val: 1, on: function (v) { st.ver = v; pinta(); }, fmt: function (v) { return v ? "con dipolos" : "solo molécula"; } });
    function flecha(x0, y0, x1, y1, cl, w) {
      var a = Math.atan2(y1 - y0, x1 - x0), s = 8;
      return '<line x1="' + x0.toFixed(1) + '" y1="' + y0.toFixed(1) + '" x2="' + x1.toFixed(1) + '" y2="' + y1.toFixed(1) + '" class="' + cl + '" stroke-width="' + w + '"/><path d="M' + x1.toFixed(1) + " " + y1.toFixed(1) + "L" + (x1 - s * Math.cos(a - 0.4)).toFixed(1) + " " + (y1 - s * Math.sin(a - 0.4)).toFixed(1) + "L" + (x1 - s * Math.cos(a + 0.4)).toFixed(1) + " " + (y1 - s * Math.sin(a + 0.4)).toFixed(1) + 'Z" class="' + cl + ' punta"/>';
    }
    function pinta() {
      var p = E.polPorId(st.id), d = E.dipolo(p), g = GEOM[p.g], c = [120, 105], R = 74, it = [], s = '<svg viewBox="0 0 240 210" class="q2-svg" role="img" aria-label="Dipolos de enlace de ' + p.f + '">';
      p.l.forEach(function (sym, i) { it.push({ t: "b", i: i, r: E.gira(g.pos[i], st.ay, st.ax) }); });
      g.lib.forEach(function (v, i) { it.push({ t: "l", i: i, r: E.gira(v, st.ay, st.ax) }); });
      it.sort(function (a, b) { return a.r[2] - b.r[2]; });
      var hecho = false;
      function centro() { s += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="15" class="q2-central"/>'; hecho = true; }
      it.forEach(function (o) {
        if (!hecho && o.r[2] >= 0) centro();
        var x = c[0] + R * o.r[0], y = c[1] - R * o.r[1], z = o.r[2];
        if (o.t === "b") { var sym = p.l[o.i]; s += '<line x1="' + c[0] + '" y1="' + c[1] + '" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '" class="q2-enl" stroke-width="' + (3 + z * 1.2).toFixed(1) + '"/><circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (11 + z * 2.2).toFixed(1) + '" class="q2-lig"/><text x="' + x.toFixed(1) + '" y="' + (y + 4.5).toFixed(1) + '" text-anchor="middle" class="q2-simx">' + sym + "</text>"; }
        else s += lobulo(c[0], c[1], x - c[0], y - c[1], z, "#E2A400");
      });
      if (!hecho) centro();
      s += '<text x="' + c[0] + '" y="' + (c[1] + 5) + '" text-anchor="middle" class="q2-simc q2-sobre">' + p.c + "</text>";
      if (st.ver) {
        var esc = 30; // px por unidad de Δχ
        d.vect.forEach(function (v) { var r = E.gira(v, st.ay, st.ax), m = Math.sqrt(r[0] * r[0] + r[1] * r[1]); if (m > 0.04) s += flecha(c[0], c[1], c[0] + esc * r[0], c[1] - esc * r[1], "q2-dip", 2.6); });
        var rs = E.gira(d.suma, st.ay, st.ax), ms = Math.sqrt(rs[0] * rs[0] + rs[1] * rs[1]);
        if (d.polar && ms > 0.03) s += flecha(c[0], c[1] + 4, c[0] + esc * 1.35 * rs[0], c[1] + 4 - esc * 1.35 * rs[1], "q2-res", 4.4);
      }
      lienzo.innerHTML = s + "</svg>";
      var dl = []; p.l.forEach(function (x, i) { dl.push(p.c + "–" + x + ": Δχ = " + f2(Math.abs(d.deltas[i])) + (d.deltas[i] > 0 ? " (→ " + x + ")" : d.deltas[i] < 0 ? " (→ " + p.c + ")" : "")); });
      var uniq = dl.filter(function (x, i) { return dl.indexOf(x) === i; });
      lectura.innerHTML = fil("Molécula", Q.sub(p.f) + " · " + (p.g === "1,0" ? "diatómica" : nombreAX(g) + ", " + g.nombre), "pen ancho") + fil("Enlaces", uniq.join("<br>"), "ancho") + fil("Suma vectorial (|Σ μ|, en unidades de Δχ)", f2(d.mag), "red") +
        fil("¿Molécula polar?", d.polar ? "SÍ, polar" : "NO, apolar (los dipolos se anulan)", d.polar ? "red ancho" : "ok ancho") + fil("Momento dipolar experimental", p.mu === 0 ? "0 D" : fmt(p.mu, 2) + " D", "ancho");
      pie.innerHTML = "Cada enlace polar es un vector que apunta hacia el átomo más electronegativo (flechas azules). La molécula es polar si la <b>suma vectorial</b> de todos ellos no es cero (flecha roja): depende de la <b>geometría</b>, no solo de que haya enlaces polares. CO₂, CCl₄, BF₃ o SF₆ tienen enlaces polares y son apolares por simetría. Los pares libres (lóbulos amarillos) rompen la simetría en H₂O, NH₃ o SO₂. 1 D (debye) = 3,34·10⁻³⁰ C·m.";
    }
    U.fichas(cuerpo.querySelector("[data-sel]"), POL.map(function (p) { return { k: p.id, t: Q.sub(p.f) }; }), st.id, function (k) { st.id = k; pinta(); });
    pinta();
  };
})(window);
