const C = window.CONFIG;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const rnd = (a, b) => a + Math.random() * (b - a);
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

/* =========================================================
   Efectos: partículas (confeti de corazones y destellos)
   ========================================================= */
const cv = $("#fx"), cx = cv.getContext("2d");
let W = 0, H = 0, P = [], raf = 0;
const COLORES = ["#ff8fab", "#ffd27a", "#b9a4ff", "#fff1e0"];
function ajustar() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
addEventListener("resize", ajustar); ajustar();

// Los símbolos se dibujan una sola vez en un "sprite" y luego sólo se copian:
// pintar texto/emoji en cada fotograma era lo que provocaba el lag.
const TAMS = [14, 20, 28];
const GLIFOS = ["♥", "✦", "✧"];
const SPR = new Map();
function sprite(ch, col, tam) {
  const k = ch + col + tam;
  let s = SPR.get(k);
  if (!s) {
    s = document.createElement("canvas");
    s.width = s.height = Math.ceil(tam * 1.5);
    const g = s.getContext("2d");
    g.font = `${tam}px serif`; g.textAlign = "center"; g.textBaseline = "middle";
    g.fillStyle = col; g.fillText(ch, s.width / 2, s.height / 2);
    SPR.set(k, s);
  }
  return s;
}
// prepara todos los sprites cuando el navegador esté libre
setTimeout(() => {
  for (const t of TAMS) {
    sprite("🐢", "", t);
    for (const g of GLIFOS) for (const c of COLORES) sprite(g, c, t);
  }
}, 1200);

const MAX_PART = 90;
function emitir(x, y, n, o = {}) {
  if (reduce) return;
  const tams = o.tams || TAMS;
  for (let i = 0; i < n && P.length < MAX_PART; i++) {
    const a = rnd(0, Math.PI * 2), v = (o.v || 5) * rnd(0.4, 1);
    const tortuga = Math.random() < (o.tortuga ?? 0.12);
    const tam = tams[Math.floor(rnd(0, tams.length))];
    P.push({
      x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - (o.up || 0), g: o.g ?? 0.12,
      vida: 1, dv: rnd(0.014, 0.026),
      s: tortuga ? sprite("🐢", "", tam) : sprite(GLIFOS[Math.floor(rnd(0, GLIFOS.length))], COLORES[Math.floor(rnd(0, COLORES.length))], tam)
    });
  }
  if (!raf && P.length) raf = requestAnimationFrame(paso);
}
function paso() {
  cx.clearRect(0, 0, W, H);
  let n = 0;
  for (const p of P) {
    p.x += p.vx; p.y += p.vy; p.vy += p.g; p.vx *= 0.99; p.vida -= p.dv;
    if (p.vida <= 0 || p.y > H + 40) continue;
    cx.globalAlpha = p.vida;
    cx.drawImage(p.s, p.x - p.s.width / 2, p.y - p.s.height / 2);
    P[n++] = p;
  }
  P.length = n;
  cx.globalAlpha = 1;
  raf = n ? requestAnimationFrame(paso) : 0;
  if (!raf) cx.clearRect(0, 0, W, H);
}
function celebrar() {
  for (let k = 0; k < 3; k++)
    setTimeout(() => emitir(W * rnd(0.2, 0.8), H * rnd(0.3, 0.45), 22, { v: 8, up: 5, g: 0.16 }), k * 260);
}
// destellos suaves al tocar cualquier parte (pocos, para no pesar)
addEventListener("pointerdown", (e) => emitir(e.clientX, e.clientY, 3, { v: 2.5, up: 1, g: 0.05, tams: [14, 20], tortuga: 0.1 }));

/* =========================================================
   Cielo: estrellas, luciérnagas y estrellas fugaces
   ========================================================= */
(function cielo() {
  const c = $("#cielo");
  for (let i = 0; i < 50; i++) {
    const s = document.createElement("i"); s.className = "estrella";
    s.style.cssText = `left:${rnd(0, 100)}%;top:${rnd(0, 100)}%;--s:${rnd(1, 3).toFixed(1)}px;--t:${rnd(2, 6).toFixed(1)}s;--d:${(-rnd(0, 6)).toFixed(1)}s`;
    c.appendChild(s);
  }
  for (let i = 0; i < 9; i++) {
    const f = document.createElement("i"); f.className = "luciernaga";
    f.style.cssText = `left:${rnd(5, 95)}%;top:${rnd(35, 95)}%;--x:${rnd(-90, 90).toFixed(0)}px;--y:${rnd(-120, -30).toFixed(0)}px;--t:${rnd(8, 15).toFixed(1)}s;--d:${(-rnd(0, 12)).toFixed(1)}s`;
    c.appendChild(f);
  }
  if (reduce) return;
  (function fugaz() {
    const s = document.createElement("i"); s.className = "fugaz";
    s.style.left = rnd(5, 55) + "%"; s.style.top = rnd(3, 35) + "%";
    s.addEventListener("animationend", () => s.remove());
    c.appendChild(s);
    setTimeout(fugaz, rnd(8000, 16000));
  })();
})();

/* =========================================================
   Portada: título por letras, mensaje escrito y tiempo juntos
   ========================================================= */
const saludo = `Hola, ${C.nombreElla}`;
$("#saludo").setAttribute("aria-label", saludo);
$("#saludo").innerHTML = [...saludo].map((ch, i) =>
  `<span class="l" aria-hidden="true" style="--i:${i}">${ch === " " ? "&nbsp;" : esc(ch)}</span>`).join("");
$("#firma").textContent = C.tuNombre;

(function escribir() {
  const el = $("#bienvenida"), texto = C.mensajeBienvenida;
  if (reduce) { el.textContent = texto; mostrarJuntos(); return; }
  el.classList.add("escribiendo");
  let i = 0;
  setTimeout(function paso() {
    el.textContent = texto.slice(0, ++i);
    if (i < texto.length) setTimeout(paso, 28);
    else { el.classList.remove("escribiendo"); mostrarJuntos(); }
  }, saludo.length * 70 + 900);
})();

function mostrarJuntos() { $("#contador").classList.add("ver"); }
(function juntos() {
  const el = $("#contador");
  const fecha = (s) => new Date(s && s.length === 10 ? s + "T00:00:00" : s);
  const hitos = [
    { et: "Nos conocimos hace", ini: fecha(C.fechaConocernos) },
    { et: "Estamos juntos hace", ini: fecha(C.fechaInicio) }
  ];
  const dos = (n) => String(n).padStart(2, "0");
  // diferencia en años, meses, días, horas, minutos y segundos (calendario real)
  function diff(ini, fin) {
    let a = fin.getFullYear() - ini.getFullYear(), m = fin.getMonth() - ini.getMonth(), d = fin.getDate() - ini.getDate();
    let h = fin.getHours() - ini.getHours(), mi = fin.getMinutes() - ini.getMinutes(), s = fin.getSeconds() - ini.getSeconds();
    if (s < 0) { s += 60; mi--; }
    if (mi < 0) { mi += 60; h--; }
    if (h < 0) { h += 24; d--; }
    if (d < 0) { m--; d += new Date(fin.getFullYear(), fin.getMonth(), 0).getDate(); }
    if (m < 0) { a--; m += 12; }
    return { a, m, d, h, mi, s };
  }
  function pintar() {
    const ahora = new Date();
    el.innerHTML = hitos.filter((x) => !isNaN(x.ini) && ahora >= x.ini).map((x) => {
      const t = diff(x.ini, ahora);
      const trozos = [[t.a, "año", "años"], [t.m, "mes", "meses"], [t.d, "día", "días"]]
        .filter(([n]) => n > 0)
        .map(([n, s, p]) => `<span><span class="n">${n}</span><span class="u">${n === 1 ? s : p}</span></span>`);
      trozos.push(`<span><span class="n">${dos(t.h)}:${dos(t.mi)}:${dos(t.s)}</span></span>`);
      return `<div class="bloque"><span class="et">${x.et}</span><div class="cuando">${trozos.join("")}</div></div>`;
    }).join("");
  }
  pintar(); setInterval(pintar, 1000);
})();

/* =========================================================
   Tortugas 🐢 (nuestro símbolo)
   Si en tu celular se ven caminando "de espaldas", cambia
   TORTUGA_MIRA a "derecha" (hacia dónde mira el emoji).
   ========================================================= */
const TORTUGA_MIRA = "izquierda";
(function tortugas() {
  const flip = TORTUGA_MIRA === "izquierda" ? -1 : 1; // caminan hacia la derecha
  const hacer = (cls, tam, estilo) => {
    const t = document.createElement("span");
    t.className = cls; t.setAttribute("aria-hidden", "true");
    t.style.cssText = `font-size:${tam}px;--flip:${flip};${estilo}`;
    t.innerHTML = "<i>🐢</i>";
    return t;
  };
  // paseando sobre la barra de navegación
  const paseo = document.createElement("div");
  paseo.id = "paseo"; paseo.setAttribute("aria-hidden", "true");
  [[30, 58, 0], [24, 80, -30], [34, 70, -52]].forEach(([tam, seg, ret]) =>
    paseo.appendChild(hacer("tortuga", tam, `animation-duration:${seg}s;animation-delay:${ret}s`)));
  document.body.appendChild(paseo);
  // nadando despacio por el cielo
  const c = $("#cielo");
  for (let i = 0; i < 6; i++)
    c.appendChild(hacer("tortuga nada", rnd(20, 38), `top:${rnd(6, 78).toFixed(0)}%;animation-duration:${rnd(70, 120).toFixed(0)}s;animation-delay:${(-rnd(0, 110)).toFixed(0)}s`));
})();

/* =========================================================
   Navegación (dock inferior)
   ========================================================= */
$$("#dock button").forEach((b) => {
  b.onclick = () => {
    $$("#dock button").forEach((x) => x.classList.remove("on"));
    $$(".panel").forEach((x) => x.classList.remove("on"));
    b.classList.add("on");
    $("#" + b.dataset.t).classList.add("on");
    if (window.actualizarTira) requestAnimationFrame(window.actualizarTira);
    if (window.actualizarMusica) window.actualizarMusica();
    b.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    $("#escenario").scrollIntoView({ behavior: "smooth", block: "start" });
  };
});

/* =========================================================
   Fotos (con imagen de relleno si falta alguna)
   ========================================================= */
function placeholder(i) {
  const c = document.createElement("canvas"); c.width = c.height = 600;
  const g = c.getContext("2d"), hue = (i * 47 + 300) % 360;
  const gr = g.createLinearGradient(0, 0, 600, 600);
  gr.addColorStop(0, `hsl(${hue},70%,72%)`); gr.addColorStop(1, `hsl(${(hue + 50) % 360},70%,55%)`);
  g.fillStyle = gr; g.fillRect(0, 0, 600, 600);
  g.fillStyle = "rgba(255,255,255,.9)"; g.textAlign = "center"; g.textBaseline = "middle";
  g.font = "260px serif"; g.fillText("♥", 300, 270);
  g.font = "bold 38px sans-serif"; g.fillText(`foto ${i + 1}`, 300, 480);
  return c.toDataURL();
}
function cargarFoto(src, i) {
  return new Promise((res) => {
    const im = new Image();
    im.onload = () => res(src); im.onerror = () => res(placeholder(i)); im.src = src;
  });
}
// Las fotos se cargan solo cuando se necesitan (con 30 fotos, cargarlas todas de golpe pesaría mucho)
const fotoCache = new Map();
function foto(i) {
  if (!fotoCache.has(i)) fotoCache.set(i, cargarFoto(C.fotos[i], i));
  return fotoCache.get(i);
}
function dimensiones(src) {
  return new Promise((res) => {
    const im = new Image();
    im.onload = () => res({ w: im.naturalWidth || 1, h: im.naturalHeight || 1 });
    im.onerror = () => res({ w: 1, h: 1 });
    im.src = src;
  });
}
function barajar(a) {
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/* =========================================================
   Cartas
   ========================================================= */
$("#cartasSub").textContent = `Son ${C.cartas.length}. Elige la que necesites y tócala para abrirla.`;
const cartasEl = [];
function abrirCarta(d, abre) {
  if (abre) cartasEl.forEach((o) => o !== d && cerrarCarta(o)); // sólo una abierta a la vez
  d.classList.toggle("abierta", abre);
  $("button", d).setAttribute("aria-expanded", abre);
  if (abre) {
    setTimeout(() => d.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }), 120);
    const r = $(".sello", d).getBoundingClientRect();
    emitir(r.left + 22, r.top + 22, 4, { v: 3, up: 2, g: 0.06, tams: [14, 20] });
  }
}
function cerrarCarta(d) { d.classList.remove("abierta"); $("button", d).setAttribute("aria-expanded", "false"); }

const frag = document.createDocumentFragment();
C.cartas.forEach((c, i) => {
  const d = document.createElement("div");
  d.className = "carta";
  d.style.setProperty("--i", Math.min(i, 6));
  d.style.setProperty("--giro", (i % 2 ? 0.7 : -0.9) + "deg");
  d.innerHTML = `<button type="button" class="carta-cab" aria-expanded="false">
      <span class="sello" aria-hidden="true">♥</span><h3>${esc(c.titulo)}</h3></button>
    <div class="papel"><div><p>${esc(c.texto)}</p><span class="firma">— ${esc(C.tuNombre)}</span></div></div>`;
  $("button", d).onclick = () => abrirCarta(d, !d.classList.contains("abierta"));
  cartasEl.push(d);
  frag.appendChild(d);
});
$("#listaCartas").appendChild(frag);
$("#cartaAzar").onclick = () => abrirCarta(cartasEl[Math.floor(Math.random() * cartasEl.length)], true);

/* =========================================================
   Rompecabezas
   ========================================================= */
let pz = { n: 3, orden: [], img: "", mov: 0, foto: 0, ganado: false, ar: 1, sel: null, token: 0 };

// ---- fotos bloqueadas: se desbloquean al completar rompecabezas
const CLAVE_DESB = "puzzle_desbloqueadas_v1";
let desb = new Set();
try { desb = new Set(JSON.parse(localStorage.getItem(CLAVE_DESB) || "[]")); } catch (e) { desb = new Set(); }
const guardarDesb = () => { try { localStorage.setItem(CLAVE_DESB, JSON.stringify([...desb])); } catch (e) {} };
const PZ_TODAS = !!(C.puzzle && C.puzzle.todasDesbloqueadas);
const PZ_INICIO = Math.max(1, (C.puzzle && C.puzzle.fotosIniciales) || 3);
desb = new Set([...desb].filter((i) => i >= 0 && i < C.fotos.length));
if (PZ_TODAS) C.fotos.forEach((_, i) => desb.add(i));
while (desb.size < Math.min(PZ_INICIO, C.fotos.length)) desb.add(Math.floor(Math.random() * C.fotos.length));
guardarDesb();
const libre = (i) => desb.has(i);

function textoFoto() {
  $("#puzzleFotoInfo").innerHTML = `Foto ${pz.foto + 1} de ${C.fotos.length}`;
  const t = C.fotos.length, n = desb.size;
  $("#puzzleDesb").innerHTML = `<span>🔓 ${n} de ${t} fotos desbloqueadas</span><div class="barra-ac"><i style="width:${(n / t) * 100}%"></i></div>`;
}
function elegirFoto(i) {
  if (!libre(i)) return;
  pz.foto = i;
  $$("#puzzleFotos button").forEach((x, k) => x.classList.toggle("on", k === i));
  const b = $$("#puzzleFotos button")[i], tira = $("#puzzleFotos");
  if (b) tira.scrollTo({ left: b.offsetLeft - tira.clientWidth / 2 + b.offsetWidth / 2, behavior: reduce ? "auto" : "smooth" });
  textoFoto();
  puzzleNuevo();
}
// flechas de la tira de fotos: se apagan cuando ya no hay más hacia ese lado
(function flechasTira() {
  const tira = $("#puzzleFotos"), izq = $("#tiraIzq"), der = $("#tiraDer");
  const estado = () => {
    izq.disabled = tira.scrollLeft < 8;
    der.disabled = tira.scrollLeft > tira.scrollWidth - tira.clientWidth - 8;
  };
  const mover = (d) => tira.scrollBy({ left: d * tira.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  izq.onclick = () => mover(-1); der.onclick = () => mover(1);
  tira.addEventListener("scroll", estado, { passive: true });
  addEventListener("resize", estado);
  window.actualizarTira = estado; // se llama al abrir la pestaña (mientras está oculta no se puede medir)
  setTimeout(estado, 300);
})();
// miniaturas: cada una carga su foto solo cuando aparece en pantalla
const verMiniatura = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  verMiniatura.unobserve(e.target);
  foto(+e.target.dataset.i).then((src) => (e.target.style.backgroundImage = `url("${src}")`));
}), { root: $("#puzzleFotos"), rootMargin: "0px 120px" });
const desbEl = document.createElement("div");
desbEl.id = "puzzleDesb"; desbEl.className = "pz-desb";
$("#puzzleFotoInfo").after(desbEl);
const pistaBloq = (i) => {
  const m = $("#puzzleFotoInfo");
  m.textContent = "Esa foto sigue oculta. Completa rompecabezas para descubrirla 🐢";
  setTimeout(() => textoFoto(), 2600);
};
function pintarMini(b, i) {
  const ok = libre(i);
  b.classList.toggle("bloq", !ok);
  b.setAttribute("aria-label", ok ? `Foto ${i + 1}` : `Foto ${i + 1}, bloqueada`);
  b.innerHTML = ok ? "" : '<span class="q">?</span><span class="tg">🐢</span>';
  if (ok) { b.style.backgroundImage = ""; verMiniatura.observe(b); }
}
pz.foto = [...desb].sort((x, y) => x - y)[0];
C.fotos.forEach((_, i) => {
  const b = document.createElement("button");
  b.type = "button"; b.dataset.i = i;
  b.style.setProperty("--r", (i % 5) - 2);
  if (i === pz.foto) b.classList.add("on");
  b.onclick = () => { if (libre(i)) elegirFoto(i); else { b.classList.remove("no"); void b.offsetWidth; b.classList.add("no"); pistaBloq(i); } };
  $("#puzzleFotos").appendChild(b);
  pintarMini(b, i);
});
textoFoto();
$("#puzzleAzar").onclick = () => {
  const pool = [...desb].filter((k) => k !== pz.foto);
  if (!pool.length) return;
  elegirFoto(pool[Math.floor(Math.random() * pool.length)]);
};
// al ganar: se desbloquea una foto nueva
async function desbloquearNueva() {
  const faltan = C.fotos.map((_, i) => i).filter((i) => !libre(i));
  if (!faltan.length) return null;
  const i = faltan[Math.floor(Math.random() * faltan.length)];
  desb.add(i); guardarDesb();
  const b = $$("#puzzleFotos button")[i];
  pintarMini(b, i);
  b.classList.add("recien");
  setTimeout(() => b.classList.remove("recien"), 6000);
  textoFoto();
  return i;
}
async function mostrarDesbloqueo(i) {
  const src = await foto(i);
  const ov = document.createElement("div");
  ov.className = "pz-revela"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-label", "Foto desbloqueada");
  const todas = desb.size >= C.fotos.length;
  ov.innerHTML = `<div class="pz-rev-in">
    <p class="pz-rev-t">${todas ? "¡Desbloqueaste todas las fotos! 🎉" : "¡Desbloqueaste una foto nueva!"}</p>
    <div class="pz-rev-foto"><img alt="" src="${src}"><span class="q">?</span><span class="tg">🐢</span></div>
    <div class="pz-rev-b"><button type="button" class="btn" data-a="ya">Armarla ahora</button><button type="button" class="btn ghost" data-a="luego">Seguir</button></div></div>`;
  document.body.appendChild(ov);
  requestAnimationFrame(() => ov.classList.add("ver"));
  setTimeout(() => ov.classList.add("abre"), 700);
  const cerrar = (armar) => { ov.classList.remove("ver"); setTimeout(() => ov.remove(), 400); if (armar) elegirFoto(i); };
  $('[data-a="ya"]', ov).onclick = () => cerrar(true);
  $('[data-a="luego"]', ov).onclick = () => cerrar(false);
  $('[data-a="ya"]', ov).focus();
}
$$(".seg button").forEach((b) => b.onclick = () => {
  $$(".seg button").forEach((x) => x.classList.toggle("on", x === b));
  pz.n = +b.dataset.n; puzzleNuevo();
});

// Todas las piezas están a la vista. Tocas una y luego otra vecina para intercambiarlas:
// izquierda, derecha, arriba o abajo. (Si prefieres solo izquierda y derecha, cambia esto a true.)
const SOLO_HORIZONTAL = false;
// Cuántos intercambios al azar se hacen para revolver cada nivel (más = más difícil)
const REVUELTA = { 3: 18, 4: 40, 5: 75 };

function vecinas(a, b) {
  const n = pz.n, mismaFila = Math.floor(a / n) === Math.floor(b / n);
  if (mismaFila && Math.abs(a - b) === 1) return true;
  return !SOLO_HORIZONTAL && Math.abs(a - b) === n;
}
function progreso() {
  const bien = pz.orden.filter((v, i) => v === i).length;
  return `${pz.mov} ${pz.mov === 1 ? "movimiento" : "movimientos"} · ${bien} de ${pz.orden.length} en su lugar`;
}
async function puzzleNuevo() {
  const tk = ++pz.token;
  const src = await foto(pz.foto);
  const dm = await dimensiones(src);
  if (tk !== pz.token) return;
  pz.img = src;
  // el tablero toma la forma de la foto (vertical u horizontal), así no se corta ni se deforma
  pz.ar = dm.w / dm.h;
  $("#puzzleMarco").style.setProperty("--ar", pz.ar.toFixed(4));
  const total = pz.n * pz.n;
  // Se revuelve con intercambios entre vecinas (los mismos que hará ella), así siempre tiene solución.
  const n = pz.n, aristas = [];
  for (let p = 0; p < total; p++) {
    if (p % n < n - 1) aristas.push([p, p + 1]);
    if (!SOLO_HORIZONTAL && p + n < total) aristas.push([p, p + n]);
  }
  let orden, minimo = Math.ceil(total * 0.6);
  do {
    orden = [...Array(total).keys()];
    let previa = -1;
    for (let k = 0; k < (REVUELTA[n] || 40); k++) {
      let e; do { e = Math.floor(Math.random() * aristas.length); } while (e === previa);
      const [a, b] = aristas[e]; [orden[a], orden[b]] = [orden[b], orden[a]]; previa = e;
    }
  } while (orden.filter((v, i) => v !== i).length < minimo); // que quede bien revuelto
  pz.orden = orden; pz.mov = 0; pz.ganado = false; pz.sel = null;
  $("#puzzleMarco").classList.remove("ganado");
  $("#puzzleMsg").textContent = "";
  $("#puzzleGuia").style.backgroundImage = `url("${src}")`;
  dibujarPuzzle();
}
function dibujarPuzzle() {
  const t = $("#puzzleTablero"), n = pz.n;
  t.style.gridTemplateColumns = `repeat(${n},1fr)`;
  t.style.gridTemplateRows = `repeat(${n},1fr)`;
  t.innerHTML = "";
  pz.orden.forEach((val, pos) => {
    const d = document.createElement("div");
    const r = Math.floor(val / n), c = val % n;
    d.className = "pieza";
    d.style.backgroundImage = `url("${pz.img}")`;
    d.style.backgroundSize = `${n * 100}% ${n * 100}%`;
    d.style.backgroundPosition = `${(c / (n - 1)) * 100}% ${(r / (n - 1)) * 100}%`;
    d.onclick = () => tocarPieza(pos);
    t.appendChild(d);
  });
  marcarPuzzle();
  $("#puzzleMov").textContent = progreso();
}
// resalta la pieza elegida y con cuáles puede cambiarse
function marcarPuzzle() {
  $$("#puzzleTablero .pieza").forEach((d, pos) => {
    d.classList.toggle("sel", pos === pz.sel);
    d.classList.toggle("vecina", pz.sel !== null && pos !== pz.sel && vecinas(pz.sel, pos));
  });
}
function tocarPieza(pos) {
  if (pz.ganado) return;
  const msg = $("#puzzleMsg");
  if (pz.sel === null) { pz.sel = pos; msg.textContent = ""; }
  else if (pz.sel === pos) { pz.sel = null; }
  else if (vecinas(pz.sel, pos)) { intercambiar(pz.sel, pos); return; }
  else {
    pz.sel = pos; // elige otra pieza como origen
    msg.textContent = SOLO_HORIZONTAL ? "Solo puedes cambiarla con la pieza de su izquierda o su derecha." : "Solo puedes cambiarla con una vecina: izquierda, derecha, arriba o abajo.";
  }
  marcarPuzzle();
}
function intercambiar(a, b) {
  const t = $("#puzzleTablero"), antes = [...t.children].map((d) => d.getBoundingClientRect());
  [pz.orden[a], pz.orden[b]] = [pz.orden[b], pz.orden[a]];
  pz.mov++; pz.sel = null;
  $("#puzzleMsg").textContent = "";
  dibujarPuzzle();
  if (!reduce) { // las dos piezas se deslizan a su nuevo lugar
    const ahora = [...t.children];
    [[a, b], [b, a]].forEach(([nuevo, viejo]) => {
      const r1 = antes[viejo], r2 = antes[nuevo], el = ahora[nuevo];
      el.style.zIndex = 3;
      el.animate(
        [{ transform: `translate(${r1.left - r2.left}px,${r1.top - r2.top}px)` }, { transform: "none" }],
        { duration: 280, easing: "cubic-bezier(.3,1.3,.5,1)" }
      ).onfinish = () => (el.style.zIndex = "");
    });
  }
  if (pz.orden.every((v, i) => v === i)) {
    pz.ganado = true;
    $("#puzzleMarco").classList.add("ganado");
    $("#puzzleMsg").textContent = `Lo armaste en ${pz.mov} movimientos.`;
    celebrar();
    desbloquearNueva().then((i) => { if (i !== null) { $("#puzzleMsg").textContent += " 🔓 ¡Hay una foto nueva desbloqueada!"; setTimeout(() => mostrarDesbloqueo(i), 1100); } });
  }
}
$("#puzzleNuevo").onclick = puzzleNuevo;
const guia = $("#puzzleGuia"), ver = $("#puzzleVer");
["pointerdown"].forEach((ev) => ver.addEventListener(ev, () => guia.classList.add("ver")));
["pointerup", "pointerleave", "pointercancel"].forEach((ev) => ver.addEventListener(ev, () => guia.classList.remove("ver")));
ver.addEventListener("contextmenu", (e) => e.preventDefault());
puzzleNuevo();

/* =========================================================
   Memoria
   ========================================================= */
let mem = { abiertas: [], pares: 0, intentos: 0, bloqueo: false, total: 0 };
let memToken = 0, bolsaPremios = [];
function siguientePremio() {
  const lista = C.premios && C.premios.length ? C.premios : ["Ganaste un abrazo 🤗"];
  if (!bolsaPremios.length) bolsaPremios = barajar([...lista]); // no se repite hasta que salgan todos
  return bolsaPremios.pop();
}
function ganarMemoria() {
  const caja = $("#memPremio");
  caja.innerHTML = `<p class="premio-t">¡Completaste todas las parejas en ${mem.intentos} intentos!</p>
    <p class="premio">${esc(siguientePremio())}</p>
    <button class="btn" id="memOtra" type="button">Jugar de nuevo</button>`;
  $("#memOtra").onclick = () => {
    memoriaNueva();
    $("#memTablero").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };
  celebrar();
  setTimeout(() => caja.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }), 350);
}
async function memoriaNueva() {
  const tk = ++memToken;
  // 8 fotos distintas al azar de las que tengas, cada partida cambian
  const idx = barajar([...C.fotos.keys()]).slice(0, Math.min(8, C.fotos.length));
  const fs = await Promise.all(idx.map(foto));
  if (tk !== memToken) return;
  const cartas = barajar([...fs, ...fs]);
  mem = { abiertas: [], pares: 0, intentos: 0, bloqueo: false, total: fs.length };
  const t = $("#memTablero"); t.innerHTML = "";
  $("#memPremio").innerHTML = ""; $("#memInfo").textContent = "0 intentos";
  cartas.forEach((src) => {
    const d = document.createElement("button");
    d.type = "button"; d.className = "mcard"; d.dataset.src = src; d.setAttribute("aria-label", "Carta boca abajo");
    d.innerHTML = `<div class="mi"><div class="cara frente" aria-hidden="true">🐢</div><div class="cara dorso" style="background-image:url('${src}')"></div></div>`;
    d.onclick = () => voltear(d);
    t.appendChild(d);
  });
}
function voltear(d) {
  if (mem.bloqueo || d.classList.contains("vol")) return;
  d.classList.add("vol");
  mem.abiertas.push(d);
  if (mem.abiertas.length < 2) return;
  mem.intentos++;
  $("#memInfo").textContent = `${mem.intentos} ${mem.intentos === 1 ? "intento" : "intentos"}`;
  const [a, b] = mem.abiertas; mem.abiertas = [];
  if (a.dataset.src === b.dataset.src) {
    a.classList.add("ok"); b.classList.add("ok"); mem.pares++;
    if (mem.pares === mem.total) setTimeout(ganarMemoria, 700);
  } else {
    mem.bloqueo = true;
    setTimeout(() => { a.classList.remove("vol"); b.classList.remove("vol"); mem.bloqueo = false; }, 850);
  }
}
$("#memNuevo").onclick = memoriaNueva;
memoriaNueva();

/* =========================================================
   Acertijos por temas (los datos están en acertijos.js)
   ========================================================= */
const TEMAS = window.ACERTIJOS || [];
const CLAVE_AC = "acertijos_estado_v1";
let estadoAc = {}; // id del acertijo -> "ok" (resuelto) | "vista" (se rindió y vio la respuesta)
try { estadoAc = JSON.parse(localStorage.getItem(CLAVE_AC) || "{}"); } catch (e) { estadoAc = {}; }
const guardarAc = () => { try { localStorage.setItem(CLAVE_AC, JSON.stringify(estadoAc)); } catch (e) {} };
const pistasPedidas = {}; // id -> cuántas pistas pidió (0, 1 o 2)
let temaAc = null, acIdx = 0;
const cajaAc = $("#acertijoBox");

const limpiar = (s) => norm(String(s)).replace(/[^a-z0-9:\/ ]+/g, " ").replace(/\s+/g, " ").trim();
function lev(a, b) {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++)
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}
// acepta la respuesta si contiene alguna palabra clave (tolera un par de errores de tipeo)
function acierta(entrada, acepta) {
  const e = limpiar(entrada);
  if (!e) return false;
  const palabras = e.split(" ");
  return acepta.some((t) => {
    const k = limpiar(t);
    if (!k) return false;
    if (/\d/.test(k)) return e.includes(k);
    if ((" " + e + " ").includes(" " + k + " ")) return true;
    if (!k.includes(" ") && k.length >= 5) {
      const tol = k.length >= 8 ? 2 : 1;
      return palabras.some((p) => Math.abs(p.length - k.length) <= tol && lev(p, k) <= tol);
    }
    return false;
  });
}
const hechos = (t) => t.items.filter((x) => estadoAc[x.id]).length;
const resueltos = (t) => t.items.filter((x) => estadoAc[x.id] === "ok").length;

function vistaTemas() {
  temaAc = null;
  const total = TEMAS.reduce((s, t) => s + t.items.length, 0);
  const ok = TEMAS.reduce((s, t) => s + resueltos(t), 0);
  cajaAc.innerHTML = `<div class="ac-total"><span>Llevas <b>${ok}</b> de ${total} acertijos resueltos</span>
      <div class="barra-ac"><i style="width:${total ? (ok / total) * 100 : 0}%"></i></div></div>
    <div class="temas">${TEMAS.map((t, i) => `
      <button type="button" class="tema" data-i="${i}" data-id="${esc(t.id)}" style="--c1:${t.c1};--c2:${t.c2};--i:${i}">
        <span class="tema-ico" aria-hidden="true">${t.icono}</span>
        <span class="tema-txt"><strong>${esc(t.titulo)}</strong><small>${esc(t.sub)}</small></span>
        <span class="tema-prog"><span class="tema-barra"><i style="width:${(resueltos(t) / t.items.length) * 100}%"></i></span>
          <span>${resueltos(t)} de ${t.items.length}</span></span>
      </button>`).join("")}</div>`;
  $$(".tema", cajaAc).forEach((b) => (b.onclick = () => abrirTema(+b.dataset.i)));
}

function abrirTema(i) {
  temaAc = TEMAS[i];
  const pend = temaAc.items.findIndex((x) => !estadoAc[x.id]);
  acIdx = pend >= 0 ? pend : 0;
  vistaTema(null, true);
}

function siguientePendiente() {
  const n = temaAc.items.length;
  for (let k = 1; k <= n; k++) {
    const j = (acIdx + k) % n;
    if (!estadoAc[temaAc.items[j].id]) return j;
  }
  return -1;
}

// aviso: "ok" | "vista" | null  (para mostrar la animación justo después de responder)
function vistaTema(aviso, subir) {
  const t = temaAc, it = t.items[acIdx], est = estadoAc[it.id], pv = pistasPedidas[it.id] || 0;
  const completo = hechos(t) === t.items.length;
  cajaAc.innerHTML = `<div class="ac-tema" style="--c1:${t.c1};--c2:${t.c2}">
    <div class="ac-cab">
      <button class="volver" id="aVolver" type="button">Volver a los temas</button>
      <div class="ac-cab-t"><span class="ac-ico" aria-hidden="true">${t.icono}</span>
        <div><h3>${esc(t.titulo)}</h3><small>${resueltos(t)} resueltos de ${t.items.length}</small></div></div>
    </div>
    <div class="mapa" role="group" aria-label="Acertijos del tema">${t.items.map((x, k) =>
      `<button type="button" class="${[estadoAc[x.id] || "", k === acIdx ? "ahora" : ""].join(" ").trim()}" data-k="${k}" aria-label="Acertijo ${k + 1}${estadoAc[x.id] === "ok" ? ", resuelto" : estadoAc[x.id] ? ", respuesta vista" : ""}">${k + 1}</button>`).join("")}</div>
    <article class="enigma" id="enigma">
      <p class="enigma-n">Acertijo ${acIdx + 1} de ${t.items.length}</p>
      <h3>${esc(it.titulo)}</h3>
      <p class="enigma-t">${esc(it.texto)}</p>
      <div class="pistas-ver" id="pistasVer"></div>
      ${est ? `<div class="resuelto-caja ${est}${aviso ? " nuevo" : ""}">
          <small>${est === "ok" ? (aviso ? "¡Correcto!" : "Ya lo resolviste") : "La respuesta era"}</small>
          <strong>${esc(it.respuesta)}</strong></div>`
        : `<div class="pistas-btns"><button class="btn ghost" id="aPista" type="button"></button></div>
        <div class="fila-resp">
          <input type="text" id="aResp" placeholder="Escribe tu respuesta" autocomplete="off" autocapitalize="none" aria-label="Tu respuesta">
          <button class="btn" id="aOk" type="button">Responder</button>
        </div>
        <p class="ac-msg" id="aMsg" role="status"></p>
        <button class="enlace" id="aRendir" type="button">Me rindo, ver la respuesta</button>`}
      <div class="enigma-nav">
        <button class="enlace" id="aAnt" type="button" ${acIdx === 0 ? "disabled" : ""}>Anterior</button>
        <button class="btn ${est ? "" : "ghost"}" id="aSig" type="button">${completo ? "Terminar tema" : "Siguiente"}</button>
      </div>
    </article>
    ${completo ? `<div class="fin-tema"><h3>Terminaste ${esc(t.titulo)}</h3>
        <p>${resueltos(t)} resueltos y ${t.items.length - resueltos(t)} con la respuesta vista.</p>
        <div class="fin-acc"><button class="btn" id="aTodos" type="button">Ver los otros temas</button>
        <button class="btn ghost" id="aRepetir" type="button">Repetir este tema</button></div></div>` : ""}
  </div>`;

  const pintarPistas = () => {
    const n = pistasPedidas[it.id] || 0;
    $("#pistasVer").innerHTML = it.pistas.slice(0, n).map((p, k) => `<p class="pista-item"><b>Pista ${k + 1}</b>${esc(p)}</p>`).join("");
    const b = $("#aPista");
    if (b) { b.textContent = n === 0 ? "Pedir la pista 1" : n === 1 ? "Pedir la pista 2" : "Ya viste las dos pistas"; b.disabled = n >= 2; }
  };
  pintarPistas();

  $("#aVolver").onclick = () => { vistaTemas(); cajaAc.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); };
  $$(".mapa button", cajaAc).forEach((b) => (b.onclick = () => { acIdx = +b.dataset.k; vistaTema(null, true); }));
  $("#aAnt").onclick = () => { if (acIdx > 0) { acIdx--; vistaTema(null, true); } };
  $("#aSig").onclick = () => {
    const j = siguientePendiente();
    if (j >= 0) { acIdx = j; vistaTema(null, true); }
    else { vistaTema(null, false); $(".fin-tema").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }); }
  };
  if (completo) {
    $("#aTodos").onclick = () => { vistaTemas(); cajaAc.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); };
    $("#aRepetir").onclick = () => {
      t.items.forEach((x) => { delete estadoAc[x.id]; delete pistasPedidas[x.id]; });
      guardarAc(); acIdx = 0; vistaTema(null, true);
    };
  }
  if (!est) {
    $("#aPista").onclick = () => { pistasPedidas[it.id] = Math.min(2, (pistasPedidas[it.id] || 0) + 1); pintarPistas(); };
    const responder = () => {
      const msg = $("#aMsg"), valor = $("#aResp").value;
      if (!valor.trim()) { msg.textContent = "Escribe una respuesta primero."; return; }
      if (acierta(valor, it.acepta)) {
        estadoAc[it.id] = "ok"; guardarAc();
        const r = $("#aOk").getBoundingClientRect();
        emitir(r.left + r.width / 2, r.top, 22, { v: 7, up: 4, g: 0.14 });
        const eraUltimo = hechos(t) === t.items.length;
        vistaTema("ok", false);
        if (eraUltimo) setTimeout(celebrar, 300);
      } else {
        msg.textContent = pv >= 2 ? "Todavía no. Si quieres, puedes ver la respuesta." : "Todavía no. Prueba otra vez o pide una pista.";
        const e = $("#enigma"); e.classList.remove("tiembla"); void e.offsetWidth; e.classList.add("tiembla");
      }
    };
    $("#aOk").onclick = responder;
    $("#aResp").addEventListener("keydown", (e) => e.key === "Enter" && responder());
    let sure = 0;
    $("#aRendir").onclick = (e) => {
      if (!sure) { // pide confirmación para no tocarlo por error
        sure = setTimeout(() => { sure = 0; e.target.textContent = "Me rindo, ver la respuesta"; }, 3500);
        e.target.textContent = "¿Segura? Toca otra vez para verla";
        return;
      }
      clearTimeout(sure);
      estadoAc[it.id] = "vista"; guardarAc();
      vistaTema("vista", false);
    };
  }
  if (subir) cajaAc.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
if (TEMAS.length) vistaTemas();
else cajaAc.innerHTML = `<p class="msg">Falta el archivo acertijos.js</p>`;

/* =========================================================
   Mensajes de voz y videos
   ========================================================= */
const tiempo = (s) => (isFinite(s) && s > 0 ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");
const ICO_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
const ICO_PAUSA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';

/* ---- Mensajes de voz ---- */
const BARRAS = 48;
const CLAVE_VOZ = "audios_escuchados_v1";
let escuchados = {};
try { escuchados = JSON.parse(localStorage.getItem(CLAVE_VOZ) || "{}"); } catch (e) { escuchados = {}; }
const guardarVoz = () => { try { localStorage.setItem(CLAVE_VOZ, JSON.stringify(escuchados)); } catch (e) {} };
const voces = [];
const VELOCIDADES = [1, 1.25, 1.5, 2];

// ondas de relleno (se reemplazan por la onda real del audio cuando se puede leer)
function ondaFalsa(clave) {
  let h = 2166136261;
  for (const ch of clave) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
  const azar = () => { h += 0x6d2b79f5; let t = Math.imul(h ^ (h >>> 15), 1 | h); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  return Array.from({ length: BARRAS }, (_, i) => 0.18 + 0.82 * azar() * Math.pow(Math.sin(Math.PI * (i + 0.5) / BARRAS), 0.5));
}
let ctxAudio = null;
async function ondaReal(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error("sin archivo");
  const buf = await r.arrayBuffer();
  ctxAudio = ctxAudio || new (window.AudioContext || window.webkitAudioContext)();
  const datos = await ctxAudio.decodeAudioData(buf);
  const canal = datos.getChannelData(0), paso = Math.max(1, Math.floor(canal.length / BARRAS)), picos = [];
  for (let i = 0; i < BARRAS; i++) {
    let m = 0;
    for (let j = i * paso, fin = Math.min(canal.length, j + paso), s = Math.max(1, paso >> 7); j < fin; j += s) m = Math.max(m, Math.abs(canal[j]));
    picos.push(m);
  }
  const max = Math.max(...picos) || 1;
  return picos.map((p) => 0.14 + 0.86 * Math.pow(p / max, 0.7));
}
const htmlBarras = (alturas) => alturas.map((a) => `<i style="--h:${Math.round(a * 100)}%"></i>`).join("");

const resumenVoz = $("#vozResumen");
function pintarResumenVoz() {
  const total = C.audios.length, n = C.audios.filter((_, i) => escuchados[i]).length;
  $("#vozCuenta").textContent = n === total && total ? "Escuchaste todos los mensajes" : `Escuchaste ${n} de ${total}`;
  $("#vozBarra").style.width = (total ? (n / total) * 100 : 0) + "%";
}
resumenVoz.innerHTML = `<div class="voz-prog"><span id="vozCuenta"></span><div class="barra-ac"><i id="vozBarra"></i></div></div>
  <label class="interruptor"><input type="checkbox" id="vozSeguidos"><span class="pista-sw" aria-hidden="true"></span><span>Reproducir uno tras otro</span></label>`;

const observarVoz = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  observarVoz.unobserve(e.target);
  const v = voces.find((x) => x.el === e.target);
  if (!v || v.onda) return;
  ondaReal(v.archivo).then((al) => {
    v.onda = true;
    $$(".barras", v.el).forEach((b) => (b.innerHTML = htmlBarras(al)));
  }).catch(() => {});
}), { rootMargin: "120px" });

C.audios.forEach((a, idx) => {
  const el = document.createElement("article");
  el.className = "voz";
  el.style.setProperty("--i", Math.min(idx, 8));
  el.style.setProperty("--flip", TORTUGA_MIRA === "izquierda" ? -1 : 1);
  const base = htmlBarras(ondaFalsa(a.archivo + idx));
  el.innerHTML = `<button class="voz-play" type="button" aria-label="Reproducir ${esc(a.titulo)}"><span class="anillo"></span><span class="voz-ico">${ICO_PLAY}</span></button>
    <div class="voz-cuerpo">
      <div class="voz-cab"><strong>${esc(a.titulo)}</strong><span class="voz-estado" aria-hidden="true"></span></div>
      ${a.nota ? `<p class="voz-nota">${esc(a.nota)}</p>` : ""}
      <div class="onda" role="slider" tabindex="0" aria-label="Posición del mensaje" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
        <span class="barras">${base}</span><span class="barras lleno">${base}</span>
        <span class="cabeza" aria-hidden="true"><i>🐢</i></span>
      </div>
      <div class="voz-pie"><span class="t1">0:00</span><button class="vel" type="button" aria-label="Velocidad">1×</button><span class="t2">0:00</span></div>
    </div>
    <audio preload="metadata" src="${esc(a.archivo)}"></audio>`;
  const au = $("audio", el), btn = $(".voz-play", el), onda = $(".onda", el), ico = $(".voz-ico", el);
  const v = { el, au, archivo: a.archivo, onda: false };
  voces.push(v);
  if (escuchados[idx]) el.classList.add("escuchado");

  const poner = () => {
    const p = au.duration ? (au.currentTime / au.duration) * 100 : 0;
    onda.style.setProperty("--p", p.toFixed(2) + "%");
    onda.setAttribute("aria-valuenow", Math.round(p));
    $(".t1", el).textContent = tiempo(au.currentTime);
  };
  let raf = 0;
  const bucle = () => { poner(); if (!au.paused) raf = requestAnimationFrame(bucle); };
  const marcar = () => {
    if (escuchados[idx]) return;
    escuchados[idx] = 1; guardarVoz(); el.classList.add("escuchado"); pintarResumenVoz();
  };

  btn.onclick = () => (au.paused ? au.play().catch(() => {}) : au.pause());
  au.onplay = () => {
    voces.forEach((o) => o.au !== au && o.au.pause());
    el.classList.add("sonando"); ico.innerHTML = ICO_PAUSA; btn.setAttribute("aria-label", "Pausar " + a.titulo);
    cancelAnimationFrame(raf); raf = requestAnimationFrame(bucle);
    if ("mediaSession" in navigator && window.MediaMetadata)
      navigator.mediaSession.metadata = new MediaMetadata({ title: a.titulo, artist: C.tuNombre, album: "Mensajes de voz" });
  };
  const alto = () => { el.classList.remove("sonando"); ico.innerHTML = ICO_PLAY; btn.setAttribute("aria-label", "Reproducir " + a.titulo); poner(); };
  au.onpause = alto;
  au.onended = () => {
    alto(); marcar(); au.currentTime = 0; poner();
    if ($("#vozSeguidos").checked && voces[idx + 1] && !voces[idx + 1].el.classList.contains("falta")) {
      const sig = voces[idx + 1];
      sig.au.play().catch(() => {});
      sig.el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    }
  };
  au.onloadedmetadata = () => { $(".t2", el).textContent = tiempo(au.duration); poner(); };
  au.ontimeupdate = () => { if (au.duration && au.currentTime / au.duration > 0.85) marcar(); };
  au.onerror = () => {
    el.classList.add("falta"); btn.disabled = true;
    $(".voz-estado", el).textContent = "Todavía falta el archivo";
  };

  // mover la posición tocando o arrastrando la onda
  const buscar = (e) => {
    if (!au.duration) return;
    const r = onda.getBoundingClientRect();
    au.currentTime = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * au.duration;
    poner();
  };
  let arrastrando = false;
  onda.addEventListener("pointerdown", (e) => { arrastrando = true; onda.setPointerCapture(e.pointerId); buscar(e); });
  onda.addEventListener("pointermove", (e) => arrastrando && buscar(e));
  ["pointerup", "pointercancel"].forEach((ev) => onda.addEventListener(ev, () => (arrastrando = false)));
  onda.addEventListener("keydown", (e) => {
    if (!au.duration) return;
    if (e.key === "ArrowRight") { au.currentTime = Math.min(au.duration, au.currentTime + 5); poner(); e.preventDefault(); }
    if (e.key === "ArrowLeft") { au.currentTime = Math.max(0, au.currentTime - 5); poner(); e.preventDefault(); }
  });
  $(".vel", el).onclick = (e) => {
    const k = (VELOCIDADES.indexOf(au.playbackRate) + 1) % VELOCIDADES.length;
    au.playbackRate = VELOCIDADES[k]; e.currentTarget.textContent = VELOCIDADES[k] + "×";
  };

  $("#listaAudios").appendChild(el);
  observarVoz.observe(el);
});
pintarResumenVoz();

/* ---- Videos estilo TikTok ---- */
const CLAVE_LIKE = "videos_corazones_v1";
let likes = {};
try { likes = JSON.parse(localStorage.getItem(CLAVE_LIKE) || "{}"); } catch (e) { likes = {}; }
const guardarLikes = () => { try { localStorage.setItem(CLAVE_LIKE, JSON.stringify(likes)); } catch (e) {} };
const ICO_SON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const ICO_MUDO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="m16 9 5 6m0-6-5 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const ICO_CORAZON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5c0 6.1-8 11-8 11z" fill="currentColor"/></svg>';

const feed = $("#listaVideos");
const marcoVideo = document.createElement("div");
marcoVideo.className = "tk";
marcoVideo.innerHTML = `<div class="tk-feed" id="tkFeed" tabindex="0" aria-label="Videos, desliza hacia arriba para ver el siguiente"></div>
  <div class="tk-top"><span id="tkCuenta">1 / ${C.videos.length}</span>
    <button type="button" class="tk-son" id="tkSon" aria-label="Activar sonido">${ICO_MUDO}<span>Toca para el sonido</span></button></div>
  <div class="tk-pista" id="tkPista"><span>Desliza hacia arriba</span><i></i></div>`;
feed.appendChild(marcoVideo);
const tkFeed = $("#tkFeed", marcoVideo);
let tkSonido = false, tkActual = -1;
const slides = [];

const aplicarSonido = () => {
  slides.forEach((s) => (s.vid.muted = !tkSonido));
  const b = $("#tkSon"); b.classList.toggle("on", tkSonido);
  b.innerHTML = (tkSonido ? ICO_SON : ICO_MUDO) + (tkSonido ? "" : "<span>Toca para el sonido</span>");
  b.setAttribute("aria-label", tkSonido ? "Silenciar" : "Activar sonido");
};
$("#tkSon").onclick = () => { tkSonido = !tkSonido; aplicarSonido(); const s = slides[tkActual]; if (s && tkSonido) s.vid.play().catch(() => {}); };

C.videos.forEach((v, idx) => {
  const el = document.createElement("article");
  el.className = "tk-slide";
  el.innerHTML = `<video playsinline loop muted preload="none" data-src="${esc(v.archivo)}"></video>
    <div class="tk-vacio"><span>🐢</span><p>Todavía falta este video</p></div>
    <div class="tk-sombra"></div>
    <div class="tk-pausa" aria-hidden="true">${ICO_PLAY}</div>
    <div class="tk-corazon-grande" aria-hidden="true">${ICO_CORAZON}</div>
    <div class="tk-lado"><button type="button" class="tk-like${likes[idx] ? " on" : ""}" aria-label="Me encanta" aria-pressed="${!!likes[idx]}">${ICO_CORAZON}</button></div>
    <div class="tk-texto"><strong>${esc(v.titulo)}</strong>${v.nota ? `<p>${esc(v.nota)}</p>` : ""}<small>${esc(C.tuNombre)}</small></div>
    <div class="tk-prog"><i></i></div>`;
  const vid = $("video", el), like = $(".tk-like", el), grande = $(".tk-corazon-grande", el), pausa = $(".tk-pausa", el), prog = $(".tk-prog i", el);
  const s = { el, vid, cargado: false, roto: false };
  slides.push(s);
  vid.muted = true;
  vid.onerror = () => { s.roto = true; el.classList.add("roto"); };
  vid.ontimeupdate = () => { if (vid.duration) prog.style.width = (vid.currentTime / vid.duration) * 100 + "%"; };
  vid.onplaying = () => el.classList.remove("en-pausa");

  const poner = (si) => {
    likes[idx] = si ? 1 : 0; if (!si) delete likes[idx]; guardarLikes();
    like.classList.toggle("on", si); like.setAttribute("aria-pressed", si);
  };
  like.onclick = (e) => { e.stopPropagation(); poner(!likes[idx]); if (likes[idx] && !reduce) { like.animate([{ transform: "scale(1)" }, { transform: "scale(1.4)" }, { transform: "scale(1)" }], { duration: 350 }); } };

  // un toque pausa o reanuda; doble toque da corazón
  let ultimoToque = 0, temporizador = 0;
  el.addEventListener("click", (e) => {
    if (e.target.closest("button")) return;
    const ahora = Date.now();
    if (ahora - ultimoToque < 320) {
      clearTimeout(temporizador); ultimoToque = 0;
      if (!likes[idx]) poner(true);
      grande.classList.remove("va"); void grande.offsetWidth; grande.classList.add("va");
      return;
    }
    ultimoToque = ahora;
    temporizador = setTimeout(() => {
      if (s.roto) return;
      if (vid.paused) { vid.play().catch(() => {}); } else { vid.pause(); el.classList.add("en-pausa"); }
    }, 320);
  });
  tkFeed.appendChild(el);
});

const cargar = (i) => {
  const s = slides[i]; if (!s || s.cargado) return;
  s.cargado = true; s.vid.src = s.vid.dataset.src; s.vid.preload = "auto";
};
const verSlide = new IntersectionObserver((es) => es.forEach((e) => {
  const i = slides.findIndex((s) => s.el === e.target);
  if (i < 0) return;
  const s = slides[i];
  if (e.isIntersecting && e.intersectionRatio >= 0.6) {
    tkActual = i;
    $("#tkCuenta").textContent = `${i + 1} / ${slides.length}`;
    cargar(i); cargar(i + 1);
    slides.forEach((o, k) => k !== i && !o.vid.paused && o.vid.pause());
    s.el.classList.remove("en-pausa");
    s.vid.muted = !tkSonido;
    s.vid.play().catch(() => {});
    if (i > 0) { const p = $("#tkPista"); if (p) p.remove(); }
  } else if (!e.isIntersecting || e.intersectionRatio < 0.4) {
    if (!s.vid.paused) s.vid.pause();
  }
}), { root: tkFeed, threshold: [0, 0.4, 0.6, 0.9] });
slides.forEach((s) => verSlide.observe(s.el));

// al salir de la pestaña de videos todo se pausa; al volver se reanuda el actual
const panelVideos = $("#videos");
new IntersectionObserver((es) => es.forEach((e) => {
  const s = slides[tkActual];
  if (!e.isIntersecting) slides.forEach((o) => !o.vid.paused && o.vid.pause());
  else if (s && !s.el.classList.contains("en-pausa")) s.vid.play().catch(() => {});
})).observe(panelVideos);
document.addEventListener("visibilitychange", () => { if (document.hidden) slides.forEach((o) => !o.vid.paused && o.vid.pause()); });

tkFeed.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    const j = Math.min(slides.length - 1, Math.max(0, tkActual + (e.key === "ArrowDown" ? 1 : -1)));
    slides[j].el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }
});
if (!C.videos.length) feed.innerHTML = '<p class="msg">Aquí irán los videos.</p>';

/* =========================================================
   Razones
   ========================================================= */
const CLAVE_RZ = "razones_vistas_v1";
let vistas = new Set();
try { vistas = new Set(JSON.parse(localStorage.getItem(CLAVE_RZ) || "[]")); } catch (e) { vistas = new Set(); }
const guardarRz = () => { try { localStorage.setItem(CLAVE_RZ, JSON.stringify([...vistas])); } catch (e) {} };
const nRz = C.razones.length;
let rzActual = -1;
const rzHistorial = [];
const rzCielo = $("#cieloRazon"), rzTxt = $("#razonTexto"), rzConst = $("#rzConst");

// constelación: una estrellita por razón, se enciende al descubrirla
C.razones.forEach((r, i) => {
  const b = document.createElement("button");
  b.type = "button"; b.className = "rz-pt"; b.dataset.i = i;
  b.style.setProperty("--d", (i % 7) * 0.35 + "s");
  b.setAttribute("aria-label", "Razón " + (i + 1));
  b.innerHTML = "★";
  b.onclick = () => { if (vistas.has(i)) mostrarRz(i, true); };
  rzConst.appendChild(b);
});
function pintarRz() {
  $$(".rz-pt", rzConst).forEach((b) => {
    const i = +b.dataset.i, v = vistas.has(i);
    b.classList.toggle("on", v); b.classList.toggle("act", i === rzActual);
    b.disabled = !v;
  });
  $("#rzCuenta").textContent = vistas.size >= nRz && nRz ? "Descubriste las " + nRz + " razones, y hay más que no caben aquí" : `Descubriste ${vistas.size} de ${nRz}`;
  $("#razonPrev").disabled = rzHistorial.length < 2;
}
function mostrarRz(i, desdeHistorial) {
  rzActual = i;
  if (!desdeHistorial) { if (rzHistorial[rzHistorial.length - 1] !== i) rzHistorial.push(i); }
  rzTxt.classList.add("off"); $("#rzNum").classList.add("off");
  const poner = () => {
    rzTxt.textContent = C.razones[i];
    $("#rzNum").textContent = `Razón ${i + 1} de ${nRz}`;
    rzTxt.classList.remove("off"); $("#rzNum").classList.remove("off");
    vistas.add(i); guardarRz(); pintarRz();
    const r = rzCielo.getBoundingClientRect();
    emitir(r.left + r.width / 2, r.top + r.height / 2, 12, { v: 4, up: 1, g: 0.04 });
  };
  const est = $("#rzEstrella");
  est.classList.remove("late"); void est.offsetWidth; est.classList.add("late");
  if (!reduce && !desdeHistorial) {
    const f = document.createElement("i"); f.className = "fugaz-r";
    f.addEventListener("animationend", () => f.remove()); rzCielo.appendChild(f);
  }
  setTimeout(poner, reduce ? 0 : desdeHistorial ? 200 : 700);
}
$("#razonBtn").onclick = () => {
  if (!nRz) return;
  let pool = [...Array(nRz).keys()].filter((k) => !vistas.has(k));
  if (!pool.length) pool = [...Array(nRz).keys()].filter((k) => k !== rzActual);
  mostrarRz(pool[Math.floor(Math.random() * pool.length)]);
};
$("#razonPrev").onclick = () => {
  if (rzHistorial.length < 2) return;
  rzHistorial.pop();
  mostrarRz(rzHistorial[rzHistorial.length - 1], true);
};
pintarRz();

/* =========================================================
   Música de fondo
   ========================================================= */
(() => {
  const M = C.musica || {};
  const lista = (M.canciones || []).filter((c) => c && c.archivo);
  const normal = M.volumen ?? 0.35, bajo = M.volumenBajo ?? 0.08;
  const entrada = $("#entrada"), btn = $("#musicaBtn");
  document.body.classList.add("con-entrada");
  entrada.hidden = false;

  // ---- pantalla de bienvenida
  const nombre = C.nombreElla;
  const tit = $("#entradaTitulo");
  tit.setAttribute("aria-label", "Hola, " + nombre);
  tit.innerHTML = [...("Hola, " + nombre)].map((ch, i) => `<span class="ch" aria-hidden="true" style="--k:${i}">${ch === " " ? "&nbsp;" : esc(ch)}</span>`).join("");
  const dias = Math.floor((Date.now() - new Date(C.fechaInicio + "T00:00:00").getTime()) / 86400000);
  const cd = $("#entradaDias");
  if (dias > 0) cd.textContent = `Llevamos ${dias} ${dias === 1 ? "día" : "días"} juntos`; else cd.hidden = true;
  const corazones = $("#entradaCorazones");
  for (let i = 0; i < 14; i++) {
    const h = document.createElement("i");
    h.textContent = i % 3 === 0 ? "🐢" : "♥";
    h.style.cssText = `left:${(Math.random() * 100).toFixed(0)}%;font-size:${(12 + Math.random() * 16).toFixed(0)}px;animation-duration:${(9 + Math.random() * 9).toFixed(1)}s;animation-delay:${(-Math.random() * 14).toFixed(1)}s`;
    corazones.appendChild(h);
  }

  if (!lista.length) { entrada.hidden = true; document.body.classList.remove("con-entrada"); return; }

  // ---- reproductor
  let pista = 0, au = null, silenciada = false, factor = 1, vocesSonando = 0, activa = false;
  const estado = lista.map(() => "?");
  const enVideos = () => $("#videos").classList.contains("on");
  const objetivo = () => (silenciada || enVideos() || document.hidden ? 0 : (vocesSonando > 0 ? bajo : normal) * factor);

  // panel de música
  const panel = document.createElement("div");
  panel.id = "musicaPanel"; panel.className = "musica-panel"; panel.hidden = true;
  panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", "Música");
  panel.innerHTML = `<div class="mp-cab"><strong>Música</strong><button type="button" class="mp-x" aria-label="Cerrar">✕</button></div>
    <ul class="mp-lista"></ul>
    <div class="mp-ctrl">
      <button type="button" class="mp-ant" aria-label="Canción anterior"><svg viewBox="0 0 24 24"><path d="M6 5v14M19 5v14l-10-7z"/></svg></button>
      <button type="button" class="mp-pp" aria-label="Pausar la música"></button>
      <button type="button" class="mp-sig" aria-label="Siguiente canción"><svg viewBox="0 0 24 24"><path d="M18 5v14M5 5v14l10-7z"/></svg></button>
    </div>
    <label class="mp-vol"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/></svg><input type="range" min="0" max="100" value="100" aria-label="Volumen de la música"></label>
    <p class="mp-nota">Se baja sola mientras suena un mensaje de voz y se pausa en Videos.</p>`;
  document.body.appendChild(panel);
  const ul = $(".mp-lista", panel), pp = $(".mp-pp", panel);
  lista.forEach((c, k) => {
    const li = document.createElement("li");
    li.innerHTML = `<button type="button" class="mp-item"><span class="mp-eq" aria-hidden="true"><i></i><i></i><i></i></span><span class="mp-t"><b>${esc(c.titulo || "Canción " + (k + 1))}</b><small></small></span></button>`;
    $("button", li).onclick = () => elegir(k);
    ul.appendChild(li);
  });
  const ICO_P = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>', ICO_Q = '<svg viewBox="0 0 24 24"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';

  function pintar() {
    $$(".mp-item", ul).forEach((b, k) => {
      b.classList.toggle("act", k === pista);
      b.classList.toggle("falta", estado[k] === "falta");
      b.disabled = estado[k] === "falta";
      $("small", b).textContent = estado[k] === "falta" ? "Falta el archivo" : k === pista ? (au && !au.paused && !silenciada ? "Sonando" : "Elegida") : "";
    });
    const suena = au && !au.paused && !silenciada;
    pp.innerHTML = suena ? ICO_Q : ICO_P;
    pp.setAttribute("aria-label", suena ? "Pausar la música" : "Reproducir la música");
    btn.classList.toggle("off", !suena);
    btn.classList.toggle("suena", !!suena);
  }

  let fade = 0;
  function ir() {
    if (!au) return;
    cancelAnimationFrame(fade);
    const paso = () => {
      const t = objetivo(), d = t - au.volume;
      if (t > 0 && au.paused && activa) au.play().catch(() => {});
      if (Math.abs(d) < 0.01) {
        au.volume = Math.max(0, Math.min(1, t));
        if (t === 0 && !au.paused) au.pause();
        pintar(); return;
      }
      au.volume = Math.max(0, Math.min(1, au.volume + Math.sign(d) * Math.min(Math.abs(d), 0.02)));
      fade = requestAnimationFrame(paso);
    };
    fade = requestAnimationFrame(paso);
  }
  function elegir(k) {
    if (estado[k] === "falta") return;
    pista = (k + lista.length) % lista.length;
    au.src = lista[pista].archivo;
    au.load();
    activa = true; silenciada = false;
    au.play().catch(() => {});
    pintar(); ir();
  }
  function otra(paso) {
    for (let n = 1; n <= lista.length; n++) {
      const k = (pista + paso * n + lista.length * n) % lista.length;
      if (estado[k] !== "falta") return elegir(k);
    }
  }
  function iniciar() {
    au = new Audio();
    au.preload = "auto"; au.volume = 0;
    au.loop = lista.length === 1;
    au.addEventListener("ended", () => otra(1));
    au.addEventListener("play", pintar); au.addEventListener("pause", pintar);
    au.addEventListener("error", () => {
      estado[pista] = "falta";
      if (estado.every((x) => x === "falta")) { btn.hidden = true; panel.hidden = true; return; }
      otra(1);
    });
    // revisa cuáles archivos existen
    lista.forEach((c, k) => {
      const t = new Audio(); t.preload = "metadata";
      t.onloadedmetadata = () => { if (estado[k] === "?") estado[k] = "ok"; pintar(); };
      t.onerror = () => { estado[k] = "falta"; pintar(); };
      t.src = c.archivo;
    });
    btn.hidden = false;
    elegir(0);
  }
  function cerrarEntrada() {
    entrada.classList.add("sale");
    document.body.classList.remove("con-entrada");
    setTimeout(() => (entrada.hidden = true), 900);
    iniciar();
  }
  $("#entradaBtn").onclick = cerrarEntrada;
  $("#entradaBtn").focus({ preventScroll: true });

  const abrir = (si) => { panel.hidden = !si; btn.setAttribute("aria-expanded", si); if (si) $(".mp-item.act, .mp-item", panel)?.focus?.(); };
  btn.onclick = () => abrir(panel.hidden);
  $(".mp-x", panel).onclick = () => { abrir(false); btn.focus(); };
  document.addEventListener("keydown", (e) => e.key === "Escape" && !panel.hidden && abrir(false));
  document.addEventListener("pointerdown", (e) => { if (!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)) abrir(false); });
  pp.onclick = () => {
    if (!au) return;
    if (silenciada || au.paused) { silenciada = false; activa = true; au.play().catch(() => {}); } else { silenciada = true; }
    ir(); pintar();
  };
  $(".mp-sig", panel).onclick = () => otra(1);
  $(".mp-ant", panel).onclick = () => otra(-1);
  $(".mp-vol input", panel).oninput = (e) => { factor = e.target.value / 100; ir(); };

  // cuando suena un mensaje de voz, la música baja
  const cuenta = () => { vocesSonando = $$(".voz.sonando").length; ir(); };
  ["play", "pause", "ended"].forEach((ev) => document.addEventListener(ev, (e) => {
    if (e.target.closest && e.target.closest(".voz")) setTimeout(cuenta, 0);
  }, true));
  document.addEventListener("visibilitychange", ir);
  window.actualizarMusica = () => requestAnimationFrame(ir);
})();
