/* ============================================================
   Bachi para Firu · laboratorio de energía II (Física y Química I, tema 12)
   f12_leerfx: trabajo como área bajo la gráfica fuerza–posición
   (usa el lector de gráficas B.lab.mec1.lector)
   ============================================================ */
(function (global) {
  "use strict";
  var B = global.BACHI;
  var GFX = [
    { k: "A", t: "Fuerza constante", tmax: 10, rg: [0, 9], pts: [[0, 6], [10, 6]], preguntas: [
      { q: "¿Qué trabajo hace la fuerza entre x = 0 y x = 10 m?", op: ["60 J", "6 J", "30 J", "16 J"], ok: 0, por: "El área es un rectángulo: 6 N · 10 m = 60 J." },
      { q: "¿Y entre x = 2 m y x = 5 m?", op: ["18 J", "30 J", "6 J", "12 J"], ok: 0, por: "6 N · (5 − 2) m = 18 J." },
      { q: "Si el cuerpo tiene 3 kg y parte del reposo (sin otras fuerzas), ¿qué velocidad lleva tras los 10 m?", op: ["6,32 m/s", "20 m/s", "4,47 m/s", "10 m/s"], ok: 0, por: "W = ΔE<sub>c</sub>: 60 = ½·3·v² → v² = 40 → v = 6,32 m/s." } ] },
    { k: "B", t: "Muelle: F crece con x", tmax: 0.4, rg: [0, 90], pts: [[0, 0], [0.4, 80]], preguntas: [
      { q: "¿Cuánto vale la constante del muelle (pendiente de la recta)?", op: ["200 N/m", "80 N/m", "0,4 N/m", "32 N/m"], ok: 0, por: "k = F/x = 80/0,4 = 200 N/m." },
      { q: "¿Qué trabajo cuesta estirarlo desde 0 hasta 0,4 m?", op: ["16 J", "32 J", "8 J", "80 J"], ok: 0, por: "Área del triángulo: ½·0,4·80 = 16 J (= ½·k·x²)." },
      { q: "¿Y desde x = 0,2 m hasta x = 0,4 m?", op: ["12 J", "8 J", "16 J", "6 J"], ok: 0, por: "Trapecio: (40 + 80)/2 · 0,2 = 12 J. Es más caro estirar la segunda mitad que la primera (4 J)." } ] },
    { k: "C", t: "Fuerza que cambia de signo", tmax: 10, rg: [-8, 10], pts: [[0, 0], [2, 8], [6, 8], [8, 0], [10, -6]], preguntas: [
      { q: "¿Qué trabajo hace la fuerza entre x = 2 m y x = 6 m?", op: ["32 J", "16 J", "8 J", "48 J"], ok: 0, por: "Rectángulo: 8 N · 4 m = 32 J." },
      { q: "¿Y entre x = 8 m y x = 10 m?", op: ["−6 J", "6 J", "−12 J", "0 J"], ok: 0, por: "La fuerza es negativa (frena): triángulo de ½·2·6 = 6 J con signo menos." },
      { q: "¿Cuál es el trabajo total entre x = 0 y x = 10 m?", op: ["42 J", "48 J", "54 J", "36 J"], ok: 0, por: "8 J (triángulo 0–2) + 32 J + 8 J (triángulo 6–8) − 6 J = 42 J." },
      { q: "Si el cuerpo es de 2 kg y parte del reposo, ¿qué velocidad lleva en x = 10 m?", op: ["6,48 m/s", "9,17 m/s", "4,58 m/s", "21 m/s"], ok: 0, por: "W<sub>neto</sub> = ΔE<sub>c</sub>: 42 = ½·2·v² → v = √42 = 6,48 m/s." } ] }
  ];
  B.w.f12_leerfx = function (host) { B.lab.mec1.lector(host, "Entrenamiento", "El trabajo como área bajo la gráfica F–x", GFX, "x (m)", "F (N)", "El trabajo es el área entre la curva y el eje horizontal (negativa si F &lt; 0). Elige una respuesta en cada apartado."); };
})(window);
