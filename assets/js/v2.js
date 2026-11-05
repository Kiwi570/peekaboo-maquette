/* Effets de la v2 (Peekaboo) : fermeture éclair, étapes cousues, tissu vivant (WebGL), fiches qui se retournent,
   prénom brodé, numéro en point de croix. Appelés depuis site.js ; chaque effet porte son data-effet dans la page. */
import { boucle, etat, quand } from './socle/index.js?v=2';

const gsap = window.gsap;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- fermeture-eclair : le voile du socle devient deux pans de tissu et leur tirette ----------
   Le socle anime le voile par v.animate(translateY…) ; on garde ses durées et ses promesses, mais le mouvement
   est celui des pans (le voile lui-même ne bouge plus : transform figé dans site.css). */
export function fermetureEclair() {
  const v = $('[data-voile]');
  if (!v || !v.animate || etat.calme) return;
  const origine = v.animate.bind(v);
  const g = $('.zip-pan--g', v), d = $('.zip-pan--d', v), joint = $('.zip-joint', v), tirette = $('.zip-tirette', v), contenu = $('.voile-contenu', v);
  const courbe = 'cubic-bezier(.65,0,.35,1)';
  v.animate = (images, options = {}) => {
    const duree = options.duration || 450;
    const fin = String((images && images[images.length - 1] && images[images.length - 1].transform) || '');
    const ouvrir = /-100%/.test(fin);
    const o = (delai, part) => ({ duration: duree * part, delay: duree * delai, easing: courbe, fill: 'both' });
    try {
      if (ouvrir) {
        contenu.animate([{ opacity: 1 }, { opacity: 0 }], o(0, 0.25));
        tirette.animate([{ transform: 'translate(-50%, 80vh)' }, { transform: 'translate(-50%, -14vh)' }], o(0, 0.5));
        joint.animate([{ clipPath: 'inset(0 0 0% 0)' }, { clipPath: 'inset(0 0 100% 0)' }], o(0, 0.5));
        g.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-102%)' }], o(0.38, 0.62));
        d.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(102%)' }], o(0.38, 0.62));
      } else {
        g.animate([{ transform: 'translateX(-102%)' }, { transform: 'translateX(0)' }], o(0, 0.55));
        d.animate([{ transform: 'translateX(102%)' }, { transform: 'translateX(0)' }], o(0, 0.55));
        joint.animate([{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)' }], o(0.45, 0.55));
        tirette.animate([{ transform: 'translate(-50%, -14vh)' }, { transform: 'translate(-50%, 80vh)' }], o(0.45, 0.55));
        contenu.animate([{ opacity: 0 }, { opacity: 1 }], o(0.7, 0.3));
      }
    } catch (err) { console.error('[fermeture-eclair]', err); }
    /* Animation neutre sur le voile : le socle attend sa fin, puis l'annule, comme avant. */
    return origine([{ opacity: 1 }, { opacity: 1 }], options);
  };
}

/* ---------- etapes-cousues : ourlet en zigzag entre les photos, et l'outil de chaque étape agit sur la sienne ---------- */
const zigzag = (y, a = 3, n = 12) => {
  const pts = [];
  for (let i = 0; i <= 2 * n; i++) pts.push(`${((i / (2 * n)) * 100).toFixed(2)}% ${(y + (i % 2 ? a : 0)).toFixed(2)}%`);
  return `polygon(${pts.join(', ')}, 100% 100%, 0% 100%)`;
};
export function etapesCousues(tl, cadres) {
  cadres.forEach((cd, i) => {
    const t = 1 + i;
    const ourlet = $('.ourlet', cd);
    const p = { y: 104 };
    /* Hauteur du cadre mesurée au rafraîchissement seulement, jamais pendant le défilement. */
    let haut = cd.offsetHeight;
    window.ScrollTrigger && window.ScrollTrigger.addEventListener('refreshInit', () => { haut = cd.offsetHeight; });
    const poser = () => {
      cd.style.clipPath = zigzag(p.y);
      if (ourlet) ourlet.style.transform = `translateY(${((p.y / 100) * haut - 2).toFixed(1)}px)`;
    };
    tl.fromTo(p, { y: 104 }, { y: -4, duration: 0.6, onUpdate: poser, onStart: poser }, t)
      .fromTo($('.media img', cd), { scale: 1.06 }, { scale: 1, duration: 0.9 }, t);
    if (ourlet) tl.fromTo(ourlet, { opacity: 1 }, { opacity: 0, duration: 0.12 }, t + 0.5);
    const outil = $('.outil', cd);
    if (!outil) return;
    if (cd.classList.contains('etapes-cadre--patron')) {
      tl.fromTo($('.outil-trait', outil), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5 }, t + 0.45)
        .fromTo($('.outil-cran', outil), { opacity: 0 }, { opacity: 1, duration: 0.15 }, t + 0.9);
    }
    if (cd.classList.contains('etapes-cadre--coupe')) {
      const ligne = $('.outil-craie', outil), cis = $('.outil-ciseaux', outil);
      const L = ligne.getTotalLength ? 1 : 0;
      const q = { v: 0 };
      const placer = () => {
        const tot = ligne.getTotalLength(), l = q.v * tot;
        const a = ligne.getPointAtLength(l), b = ligne.getPointAtLength(Math.min(tot, l + 2));
        const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
        cis.setAttribute('transform', `translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) rotate(${ang.toFixed(1)}) scale(1.25)`);
        const o = 10 * Math.abs(Math.sin(q.v * 30));
        $$('.lame', cis).forEach((x, k) => x.setAttribute('transform', `rotate(${k ? o : -o})`));
      };
      if (L) tl.fromTo(ligne, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.25 }, t + 0.4)
        .fromTo(q, { v: 0 }, { v: 1, duration: 0.55, onUpdate: placer, onStart: placer }, t + 0.5);
    }
    if (cd.classList.contains('etapes-cadre--couture')) {
      const masque = $('.outil-masque', outil), chemin = $('.outil-points', outil), aiguille = $('.outil-aiguille', outil);
      const q = { v: 0 };
      const placer = () => {
        const tot = chemin.getTotalLength(), l = q.v * tot;
        const a = chemin.getPointAtLength(l), b = chemin.getPointAtLength(Math.min(tot, l + 2));
        const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
        aiguille.setAttribute('transform', `translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) rotate(${ang.toFixed(1)})`);
        masque.style.strokeDashoffset = String(1 - q.v);
      };
      tl.fromTo(q, { v: 0 }, { v: 1, duration: 0.6, onUpdate: placer, onStart: placer }, t + 0.42);
    }
    if (cd.classList.contains('etapes-cadre--essayage')) {
      tl.fromTo($$('.epingle-corps', outil), { scale: 0, y: -26, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.14, stagger: 0.09, ease: 'back.out(2.4)' }, t + 0.45);
    }
  });
}

/* ---------- tissu-vivant : le tissu du patron ondule tout seul (vent léger) et sous le curseur ou le doigt ---------- */
const VS = 'attribute vec2 p; varying vec2 v; void main(){ v = p * .5 + .5; gl_Position = vec4(p, 0., 1.); }';
const FS = `precision mediump float;
uniform sampler2D u_img; uniform vec2 u_res; uniform vec2 u_s; uniform vec2 u_o; uniform float u_t; uniform vec2 u_m; uniform float u_f; uniform float u_q;
varying vec2 v;
void main(){
  vec2 uv = v;
  float w = sin(uv.y * 8.0 + u_t * 1.05) * .55 + sin(uv.x * 6.0 - u_t * .75 + uv.y * 3.0) * .45;
  vec2 d = vec2(.0042 * w, .0028 * sin(uv.x * 10.0 + u_t * 1.25)) * u_q;
  vec2 q = (uv - u_m) * vec2(u_res.x / u_res.y, 1.0);
  float r = length(q);
  float onde = sin(r * 34.0 - u_t * 6.5) * exp(-r * 6.5) * u_f;
  d += (q / (r + .0001)) * onde * .013;
  vec4 c = texture2D(u_img, clamp((uv + d) * u_s + u_o, .001, .999));
  float lumiere = 1.0 + w * .03 * u_q + onde * .14;
  gl_FragColor = vec4(c.rgb * lumiere, 1.0);
}`;
export function tissuVivant() {
  const fig = $('.hero-media');
  const img = fig && $('img', fig);
  if (!fig || !img || etat.calme || /[?&]sanswebgl\b/.test(location.search)) return;
  const demarrer = async () => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, premultipliedAlpha: false });
    if (!gl) return;
    const source = new Image();
    source.src = img.currentSrc || img.src;
    try { await source.decode(); } catch { return; }
    canvas.className = 'tissu-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.dataset.souris = '';
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
    const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return;
    const prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, source);
    [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach((k) => gl.texParameteri(gl.TEXTURE_2D, k, gl.CLAMP_TO_EDGE));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    const U = (n) => gl.getUniformLocation(prog, n);
    const u = { res: U('u_res'), s: U('u_s'), o: U('u_o'), t: U('u_t'), m: U('u_m'), f: U('u_f'), q: U('u_q') };
    /* Cadrage identique à l'image (object-fit: cover, object-position du cadrage). */
    const pos = (getComputedStyle(img).objectPosition || '50% 50%').split(' ').map((x) => parseFloat(x) / 100);
    const mesurer = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, matchMedia('(pointer: fine)').matches ? 1.25 : 1, 900 / Math.max(1, r.height));
      canvas.width = Math.max(2, Math.round(r.width * dpr)); canvas.height = Math.max(2, Math.round(r.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      const ac = r.width / r.height, ai = source.naturalWidth / source.naturalHeight;
      const s = ac > ai ? [1, ai / ac] : [ac / ai, 1];
      gl.uniform2f(u.res, r.width, r.height);
      gl.uniform2f(u.s, s[0], s[1]);
      gl.uniform2f(u.o, (1 - s[0]) * (pos[0] || .5), (1 - s[1]) * (1 - (pos[1] || .5)));
    };
    $('picture', fig).after(canvas);
    mesurer();
    new ResizeObserver(mesurer).observe(canvas);
    const souris = { x: .5, y: .5, f: 0, cx: .5, cy: .5 };
    let rect = null;
    const viser = (x, y) => {
      rect = rect || canvas.getBoundingClientRect();
      souris.x = (x - rect.left) / rect.width; souris.y = 1 - (y - rect.top) / rect.height;
      souris.f = Math.min(1, souris.f + .35);
    };
    const zone = fig.closest('.hero-patron') || fig;
    zone.addEventListener('pointermove', (e) => viser(e.clientX, e.clientY), { passive: true });
    zone.addEventListener('pointerenter', () => { rect = canvas.getBoundingClientRect(); }, { passive: true });
    addEventListener('scroll', () => { rect = null; }, { passive: true });
    let premier = true, lent = 0, defile = 0, impair = false;
    addEventListener('scroll', () => { defile = performance.now(); }, { passive: true });
    boucle(canvas, (dt, t) => {
      const debut = performance.now();
      /* Pendant le défilement, le tissu attend ; au repos sans souris, une image sur deux suffit au vent. */
      if (!premier && debut - defile < 180) return;
      impair = !impair;
      if (!premier && souris.f === 0 && impair) return;
      souris.cx += (souris.x - souris.cx) * Math.min(1, dt * 8);
      souris.cy += (souris.y - souris.cy) * Math.min(1, dt * 8);
      souris.f *= Math.exp(-dt * 2.6);
      if (souris.f < .002) souris.f = 0;
      gl.uniform1f(u.t, t); gl.uniform2f(u.m, souris.cx, souris.cy); gl.uniform1f(u.f, souris.f); gl.uniform1f(u.q, 1);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (premier) { premier = false; canvas.classList.add('est-pret'); }
      /* Qualité qui baisse d'elle-même si les images prennent trop de temps. */
      if (performance.now() - debut > 12 && ++lent > 30 && canvas.width > 400) { canvas.width = Math.round(canvas.width * .8); canvas.height = Math.round(canvas.height * .8); gl.viewport(0, 0, canvas.width, canvas.height); lent = 0; }
    }, { lourde: true });
  };
  quand('pret', () => setTimeout(demarrer, 120));
}

/* ---------- fiche-retournee : les fiches des cours se retournent (bouton, clavier, toucher) ---------- */
export function fichesRetournees() {
  $$('.fiche').forEach((f) => {
    const b = $('.fiche-tourner', f), lib = $('[data-libelle-bouton]', b), verso = $('.fiche-verso', f), recto = $('.fiche-recto', f);
    if (!b) return;
    f.classList.add('fiche--js');
    verso.setAttribute('inert', '');
    b.addEventListener('click', () => {
      const ouverte = f.classList.toggle('est-retournee');
      b.setAttribute('aria-expanded', String(ouverte));
      lib.textContent = ouverte ? b.dataset.libelleVerso : b.dataset.libelleRecto;
      if (ouverte) { verso.removeAttribute('inert'); recto.setAttribute('inert', ''); } else { recto.removeAttribute('inert'); verso.setAttribute('inert', ''); }
    });
  });
}

/* ---------- prenom-brode : le prénom tapé se brode lettre par lettre sur l'étiquette tissée ---------- */
export function prenomBrode() {
  const champ = $('#i-participant'), g = $('.eb-nom');
  if (!champ || !g) return;
  const NS = 'http://www.w3.org/2000/svg';
  const attente = $('.eb-attente', g);
  let avant = '';
  const rendre = () => {
    const nom = champ.value.trim().slice(0, 18);
    if (nom === avant) return;
    const garde = nom.startsWith(avant) ? avant.length : 0;
    avant = nom;
    attente.style.display = nom ? 'none' : '';
    $$('.eb-lettre', g).forEach((l, i) => { if (i >= garde) l.remove(); });
    const taille = nom.length > 12 ? 38 : nom.length > 8 ? 46 : 54;
    const mesure = document.createElementNS(NS, 'text'); mesure.setAttribute('class', 'eb-lettre-mesure'); mesure.style.fontSize = taille + 'px'; g.appendChild(mesure);
    mesure.textContent = nom; const total = mesure.getComputedTextLength(); let x = -total / 2;
    const lettres = [...nom].map((ch, i) => { mesure.textContent = nom.slice(0, i); return -total / 2 + (i ? mesure.getComputedTextLength() : 0); });
    mesure.remove();
    $$('.eb-lettre', g).forEach((l, i) => { l.setAttribute('x', lettres[i].toFixed(1)); l.style.fontSize = taille + 'px'; });
    [...nom].forEach((ch, i) => {
      if (i < garde) return;
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('class', 'eb-lettre'); t.setAttribute('x', lettres[i].toFixed(1)); t.style.fontSize = taille + 'px';
      t.textContent = ch;
      g.appendChild(t);
      if (!etat.calme && t.animate) {
        t.animate([{ strokeDashoffset: 260, fillOpacity: 0 }, { strokeDashoffset: 0, fillOpacity: 0, offset: .7 }, { strokeDashoffset: 0, fillOpacity: 1 }], { duration: 650, easing: 'ease-out', fill: 'both' });
      }
    });
    x = 0;
  };
  champ.addEventListener('input', rendre);
  rendre();
}

/* ---------- point-de-croix : les croix du numéro se cousent colonne par colonne ---------- */
export function pointDeCroix(tl, t) {
  const svg = $('.point-de-croix');
  if (!svg || !gsap) return;
  tl.fromTo(svg, { opacity: 1 }, { opacity: 1, duration: 0.01 }, t)
    .fromTo($$('.croix', svg), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.18, ease: 'back.out(2)', stagger: { amount: 1.05 } }, t + 0.05);
}
export function pointDeCroixFinal() {
  if (!gsap) return;
  gsap.set('.point-de-croix, .point-de-croix .croix', { clearProps: 'all' });
}
