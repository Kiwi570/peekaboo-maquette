/* Effets propres à Peekaboo (direction « Le patron »). Le socle gère l'ouverture, le voile, l'en-tête, le mode calme,
   les boucles et la bibliothèque d'effets ; ici, seulement ce qui est propre au client, chaque effet marqué data-effet :
   coucou (pan de lin qui se soulève), patron-ciseaux, fil-rouge, etiquettes-cousues, craie (soulignés, via trace),
   croquis-vetement, tringle, metre-ruban, polaroid, tampon, numero-cousu, planning (filtres) et agenda (statuts). */
import { demarrer, boucle, etat } from './socle/index.js?v=2';
import { fermetureEclair, etapesCousues, tissuVivant, fichesRetournees, prenomBrode, pointDeCroix, pointDeCroixFinal } from './v2.js?v=2';

const gsap = window.gsap;
const ST = window.ScrollTrigger;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const page = document.querySelector('main')?.dataset.page || '';
const borne = (v, a, b) => Math.max(a, Math.min(b, v));

/* ---------- coucou : le pan de lin se soulève par un coin (clip-path piloté par k, de 2 à 0) ---------- */
const pan = $('.pan-tissu'), coin = $('.pan-coin');
const panneau = $('.ouverture-panneau');
function soulever(k) {
  if (!pan) return;
  /* Bande de la barre de défilement : rouge tant que le pan couvre la moitié du bord droit, papier ensuite. */
  if (panneau) panneau.dataset.gouttiere = k > 1.5 ? getComputedStyle(document.documentElement).getPropertyValue('--fil').trim() || '#b2261f' : '#f4ecdd';
  const p = (v) => `${(v * 100).toFixed(2)}%`;
  if (k >= 1) {
    const a = k - 1;
    pan.style.clipPath = `polygon(0 0, 100% 0, 100% ${p(a)}, ${p(a)} 100%, 0 100%)`;
    coin.style.clipPath = `polygon(100% ${p(a)}, ${p(a)} 100%, ${p(a)} ${p(a)})`;
  } else if (k > 0) {
    /* Au-delà de la moitié, le pan retourné recouvre ce qui reste : on n'en voit plus que l'envers. */
    pan.style.clipPath = `polygon(0 0, ${p(k)} 0, 0 ${p(k)})`;
    coin.style.clipPath = `polygon(0 0, ${p(k)} 0, 0 ${p(k)})`;
  } else {
    pan.style.clipPath = 'polygon(0 0, 0 0, 0 0)';
    coin.style.clipPath = 'polygon(0 0, 0 0, 0 0)';
  }
}
function coucou(tl, debut = 0, duree = 0.7) {
  const yeux = $$('.pan-oeil');
  const k = { v: 2 };
  tl.fromTo(yeux, { scaleY: 1 }, { scaleY: 0.12, duration: 0.08, yoyo: true, repeat: 1, ease: 'power1.inOut' }, debut + 0.1)
    .fromTo(yeux, { '--regard': '0px' }, { '--regard': '6px', duration: 0.25, ease: 'power2.out' }, debut + 0.05)
    .fromTo(k, { v: 2 }, { v: -0.02, duration: duree, ease: 'power2.inOut', onUpdate: () => soulever(k.v) }, debut + 0.28)
    /* Pan retiré : le panneau devient transparent, la bande de la barre de défilement reprend la couleur du papier. */
    .fromTo('.ouverture-panneau', { opacity: 1 }, { opacity: 0, duration: 0.01 }, debut + 0.28 + duree);
  return debut + 0.28 + duree;
}

/* ---------- patron-ciseaux : le patron se trace, les ciseaux le découpent, la pièce s'envole ---------- */
const REPOS = 'translate(352 478) rotate(-24)';
function patron(tl, t) {
  const trait = $('.patron-trait'), ciseaux = $('.ciseaux'), piece = $('.patron-piece'), revele = $('.patron-revele');
  if (!trait || !ciseaux) return t;
  const L = trait.getTotalLength();
  const lames = $$('.lame', ciseaux);
  const placer = (q) => {
    const l = borne(q, 0, 1) * L;
    const a = trait.getPointAtLength(l), b = trait.getPointAtLength(Math.min(L, l + 2));
    const ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
    ciseaux.setAttribute('transform', `translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) rotate(${ang.toFixed(1)})`);
    const o = 9 * Math.abs(Math.sin(q * 40));
    lames[0]?.setAttribute('transform', `rotate(${-o})`); lames[1]?.setAttribute('transform', `rotate(${o})`);
  };
  const c = { q: 0 };
  tl.fromTo(piece, { opacity: 1, x: 0, y: 0, rotation: 0 }, { opacity: 1, duration: 0.01 }, 0)
    .fromTo(revele, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.62, ease: 'power2.inOut' }, t)
    .fromTo('.patron-reperes', { opacity: 0 }, { opacity: 1, duration: 0.3 }, t + 0.3)
    .fromTo(ciseaux, { opacity: 0 }, { opacity: 1, duration: 0.1 }, t + 0.55)
    .fromTo(c, { q: 0 }, { q: 1, duration: 0.6, ease: 'none', onUpdate: () => placer(c.q), onComplete: () => lames.forEach((x) => x.removeAttribute('transform')) }, t + 0.57)
    .fromTo(piece, { opacity: 1, x: 0, y: 0, rotation: 0 }, { opacity: 0, x: 46, y: -54, rotation: 9, duration: 0.42, ease: 'power2.in' }, t + 1.08)
    .add(() => ciseaux.setAttribute('transform', REPOS), t + 1.2);
  return t + 1.5;
}
function patronFinal() {
  $('.ciseaux')?.setAttribute('transform', REPOS);
  $$('.ciseaux .lame').forEach((x) => x.removeAttribute('transform'));
  if (gsap) gsap.set('.patron-piece, .patron-revele, .patron-reperes, .ciseaux', { clearProps: 'all' });
}

/* ---------- premier écran de l'accueil ---------- */
function heroAccueil(tl, t) {
  if (!$('.hero-mot')) return t;
  tl.fromTo('.hero-mot .lettre', { yPercent: 70, rotation: -8, opacity: 0 }, { yPercent: 0, rotation: 0, opacity: 1, duration: 0.6, stagger: 0.045, ease: 'back.out(1.6)' }, t)
    .fromTo('.hero-coucou', { clipPath: 'inset(-20% 100% -20% 0)', opacity: 1 }, { clipPath: 'inset(-20% 0% -20% 0)', opacity: 1, duration: 0.45, ease: 'power1.inOut' }, t + 0.1)
    .fromTo('.hero-tag, .hero-sous, .hero-intro, .hero-actions', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, t + 0.3);
  return patron(tl, t + 0.15);
}

/* ---------- ouvertures des pages intérieures (chacune la sienne) ---------- */
function ouverturePage(tl, t) {
  if (page === 'cours') {   /* metre-ruban : le mètre se déroule, ses graduations défilent ensuite au défilement */
    tl.fromTo('.metre', { scaleX: 0, opacity: 1 }, { scaleX: 1, opacity: 1, duration: 0.9, ease: 'power3.out' }, t)
      .fromTo('.metre-repere', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.08 }, t + 0.4);
  }
  if (page === 'melody') {  /* polaroid : la photo tombe, l'épingle se plante, le croquis se trace autour */
    tl.fromTo('.polaroid', { y: -60, rotation: -14, opacity: 0 }, { y: 0, rotation: -4, opacity: 1, duration: 0.7, ease: 'back.out(1.4)' }, t)
      .fromTo('.polaroid-epingle', { y: -36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power3.in' }, t + 0.55)
      .fromTo('.tete-croquis path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, stagger: 0.04, ease: 'power2.out' }, t + 0.2);
  }
  if (page === 'inscription') {  /* tampon : le tampon Peekaboo se pose sur la fiche */
    tl.fromTo('.tampon', { scale: 1.8, rotation: -24, opacity: 0 }, { scale: 1, rotation: -9, opacity: 1, duration: 0.42, ease: 'power4.in' }, t + 0.15)
      .fromTo('.fiche-tete', { y: 6 }, { y: 0, duration: 0.25, ease: 'bounce.out' }, t + 0.57);
  }
  if (page === 'contact') {  /* numero-cousu : le contour du numéro se pique point par point */
    tl.fromTo('.numero', { '--p': 0 }, { '--p': 1, duration: 1.1, ease: 'power2.inOut' }, t)
;
    pointDeCroix(tl, t + 0.1);
  }
  if (page === '404') tl.fromTo('.page-404 .media', { rotation: -3, y: 20, opacity: 0 }, { rotation: 0, y: 0, opacity: 1, duration: 0.6 }, t);
  if (page !== 'accueil') tl.fromTo('.page-tete [data-anime="gsap"]:not(.metre):not(.polaroid):not(.tampon):not(.point-de-croix):not(.media)', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out' }, t + 0.1);
  return t + 1.2;
}
function ouverturesFinales() {
  if (!gsap) return;
  pointDeCroixFinal();
  gsap.set('.ouverture-panneau, .metre, .metre-repere, .polaroid, .polaroid-epingle, .tete-croquis path, .tampon, .fiche-tete, .page-404 .media, .page-tete [data-anime="gsap"], .page-tete h1, .hero-mot .lettre, .hero-coucou, .hero-tag, .hero-sous, .hero-intro, .hero-actions', { clearProps: 'all' });
  $$('.numero').forEach((n) => n.style.removeProperty('--p'));
}

/* ---------- effets au défilement ---------- */
function etiquettesCousues() {
  $$('[data-effet="etiquettes-cousues"]').forEach((el, i) => {
    const r = innerWidth < 700 ? 0.8 : 2.5;
    gsap.fromTo(el, { '--p': 0, y: 46, rotation: i % 2 ? r : -r }, { '--p': 1, y: 0, rotation: 0, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 96%', end: 'top 40%', scrub: 0.6 } });
  });
}

function croquisVetement() {
  const section = $('.etapes');
  if (!section) return;
  const traits = $$('.croquis path', section);
  traits.forEach((p) => { p.setAttribute('pathLength', '1'); p.style.strokeDasharray = '1'; });
  const epingle = matchMedia('(min-width: 900px) and (min-height: 700px)').matches;
  if (!epingle) {
    gsap.fromTo(traits, { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: '.etapes-cadre--croquis', start: 'top 90%', end: 'center 45%', scrub: 0.5 } });
    return;
  }
  const cadres = $$('.etapes-cadre:not(.etapes-cadre--croquis)', section);
  const etapes = $$('.etape', section);
  const barre = $('.etapes-progres span', section);
  let actif = -1;
  const activer = (n) => { if (n === actif) return; actif = n; etapes.forEach((e, i) => e.classList.toggle('est-active', i === n)); };
  const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
    trigger: section, start: 'top top', end: () => '+=' + Math.round(innerHeight * 3.2), pin: true, scrub: 0.6, invalidateOnRefresh: true,
    onUpdate: (s) => { activer(Math.min(4, Math.floor(s.progress * 5 - 0.0001 + 0.0001))); },
  } });
  tl.fromTo(traits, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, stagger: 0.04 }, 0);
  etapesCousues(tl, cadres);
  tl.fromTo(barre, { scaleX: 0 }, { scaleX: 1, duration: 5, ease: 'none' }, 0);
  activer(0);
}

function tringle() {
  $$('[data-effet="tringle"]').forEach((t) => {
    const pieces = $$('.piece', t);
    const etats = pieces.map((_, i) => ({ a: 0, v: 0, k: 0.7 + (i % 4) * 0.12 }));
    let dernierY = scrollY, dernierX = t.scrollLeft;
    boucle(t, (dt) => {
      const dy = scrollY - dernierY, dx = t.scrollLeft - dernierX;
      dernierY = scrollY; dernierX = t.scrollLeft;
      const pousse = borne((dy * 0.5 + dx * 0.9) / Math.max(dt * 60, 0.5), -40, 40);
      etats.forEach((e, i) => {
        e.v += (-e.a * 32 - e.v * 5.2) * dt - pousse * e.k * 0.9 * dt * 60 * 0.06;
        e.a = borne(e.a + e.v * dt, -16, 16);
        pieces[i].style.transform = Math.abs(e.a) < 0.02 ? '' : `rotate(${e.a.toFixed(2)}deg)`;
      });
    });
  });
}

function galon() {
  const p = $('.galon p');
  if (!p || etat.calme) return;
  let vitesse = 1;
  boucle(p.parentElement, (dt) => {
    const v = ST ? Math.abs(ST.getAll()[0]?.getVelocity?.() || 0) : 0;
    vitesse += (1 + Math.min(5, v / 450) - vitesse) * Math.min(1, dt * 4);
    p.getAnimations().forEach((a) => { a.playbackRate = vitesse; });
  });
}

function metreAuDefilement() {
  const m = $('.metre');
  if (!m) return;
  gsap.fromTo('.metre-graduations', { x: 0 }, { x: -220, ease: 'none', scrollTrigger: { trigger: '.page-tete', start: 'top top', end: 'bottom top', scrub: 0.4 } });
}
function tamponAuDefilement() {
  if (!$('.tampon')) return;
  gsap.fromTo('.tampon-cadre', { rotation: 0 }, { rotation: 14, ease: 'none', scrollTrigger: { trigger: '.page-tete', start: 'top top', end: 'bottom top', scrub: 0.4 } });
}
function polaroidAuDefilement() {
  if (!$('.polaroid')) return;
  gsap.fromTo('.polaroid-cadre', { y: 0, rotation: 0 }, { y: -60, rotation: 4, ease: 'none', scrollTrigger: { trigger: '.page-tete', start: 'top top', end: 'bottom top', scrub: 0.4 } });
}
function numeroAuDefilement() {
  if (!$('.numero')) return;
  gsap.fromTo('.point-de-croix', { x: 0 }, { x: -24, ease: 'none', scrollTrigger: { trigger: '.page-tete', start: 'top top', end: 'bottom top', scrub: 0.4 } });
}

/* ---------- planning : filtres (Tous, Ados, Adultes, Yoga), sans vide ni saut ---------- */
function planning() {
  const racine = $('[data-planning]');
  if (!racine) return;
  const boutons = $$('[data-filtre]', racine);
  const params = new URLSearchParams(location.search);
  const appliquer = (f, pousser) => {
    boutons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtre === f)));
    $$('.creneau', racine).forEach((c) => c.classList.toggle('est-estompe', f !== 'tous' && c.dataset.type !== f));
    const n = $$('.creneau:not(.est-estompe)', racine).length;
    const etat = $('[data-planning-etat]', racine);
    if (etat) etat.textContent = etat.dataset.modele.replace('{n}', n);
    if (pousser) { const u = new URL(location.href); if (f === 'tous') u.searchParams.delete('public'); else u.searchParams.set('public', f); history.replaceState(history.state, '', u); }
  };
  boutons.forEach((b) => b.addEventListener('click', () => appliquer(b.dataset.filtre, true)));
  const depart = params.get('public');
  appliquer(boutons.some((b) => b.dataset.filtre === depart) ? depart : 'tous', false);
}

/* ---------- agenda : statuts calculés à l'heure de Nyon ---------- */
function agenda() {
  const jour = new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Zurich', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  $$('[data-date]').forEach((d) => {
    const statut = d.dataset.date < jour ? 'termine' : d.dataset.date === jour ? 'aujourdhui' : 'avenir';
    d.dataset.statut = statut;
    const s = $('.date-statut', d);
    if (s) s.textContent = s.dataset[statut] || s.textContent;
    const lien = $('a', d);
    if (lien && statut === 'termine') lien.hidden = true;
    d.classList.toggle('est-passee', statut === 'termine');
  });
}

/* ---------- modules de la bibliothèque ---------- */
async function modules() {
  const main = $('main');
  if (page === 'accueil' && main) {
    try { const { init } = await import('./modules/fil-conducteur/module.js?v=2'); await init(main, { cadre: '.cadre', onde: 14, boucle: 30, orienter: true, regard: 0.66, rail: false }); main.querySelector('.fic__svg')?.setAttribute('data-effet', 'fil-rouge'); } catch (err) { console.error('[fil-rouge]', err); }
  }
  const carte = $('.cic');
  if (carte) {
    try { const { init } = await import('./modules/carte-itineraire-collante/module.js?v=2'); await init(carte, { lecture: '58%', tension: 0.45, duree: 1.1 }); } catch (err) { console.error('[carte]', err); }
  }
  const fpe = $('.fpe');
  if (fpe) {
    /* Choix déjà fait selon le bouton d'où l'on vient : ?activite=stage-click */
    const voulu = new URLSearchParams(location.search).get('activite');
    if (voulu) { const r = fpe.querySelector(`input[name="activite"][value="${CSS.escape(voulu)}"]`); if (r) r.checked = true; }
    try { const { init } = await import('./modules/formulaire-par-etapes/module.js?v=2'); init(fpe, {}); } catch (err) { console.error('[formulaire]', err); }
  }
}

demarrer({
  preparer() {
    fermetureEclair();
    fichesRetournees();
    prenomBrode();
    tissuVivant();
    agenda();
    planning();
    modules();
    if (!gsap || !ST || etat.calme) return;
    etiquettesCousues();
    croquisVetement();
    tringle();
    galon();
    metreAuDefilement();
    tamponAuDefilement();
    polaroidAuDefilement();
    numeroAuDefilement();
  },
  /* Intro complète, moins de 3 s : le pan de lin se soulève (coucou), puis l'ouverture propre à la page. */
  jouer() {
    if (!gsap) return null;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (page === 'accueil') { coucou(tl, 0, 0.62); heroAccueil(tl, 0.62); }
    else { coucou(tl, 0, 0.6); ouverturePage(tl, 0.75); }
    return tl;
  },
  etatFinal() {
    soulever(-1);
    patronFinal();
    ouverturesFinales();
  },
  /* Arrivée par un lien interne : l'ouverture de la page se joue pendant que le voile se retire. */
  arrivee() {
    if (!gsap) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (page === 'accueil') heroAccueil(tl, 0.05); else ouverturePage(tl, 0.05);
  },
});
