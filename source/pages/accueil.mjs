/* Accueil : intro « coucou ! » (pan de lin qui se soulève, patron tracé puis découpé), étiquettes cousues,
   esprit de l'atelier à la craie, du croquis au vêtement épinglé, Melody, tringle MADEBYMELODY, infos pratiques. */
import { html, brut } from '../../outils/gabarit.mjs';
import { PATRON, ciseaux, croquis, bouton, aiguille, plan } from '../gabarits/dessins.mjs';

export const page = { cle: 'accueil', fichier: 'index', imagePartage: 'grok/accueil-ouverture-1280.webp' };

const lettres = (mot) => [...mot].map((l, i) => html`<span class="lettre" style="--i:${i}">${l}</span>`);

export const etiquette = (c, x, { id = '' } = {}) => html`<li class="etiquette etiquette--${x.teinte}"${id ? brut(` id="${id}"`) : ''} data-effet="etiquettes-cousues">
  <span class="etiquette-couture" aria-hidden="true" data-audit-ignorer></span>
  <span class="etiquette-onglet">${x.etiquette}</span>
  ${c.media({ nom: x.image, alt: x.titre, classe: 'etiquette-media', sizes: '(max-width: 760px) 88vw, 30vw' })}
  <h3 class="etiquette-titre">${x.titre}</h3>
  <p class="etiquette-prix" data-prix>${x.prix ? html`<strong>CHF ${x.prix}</strong> ` : ''}<span>${x.unite}</span></p>
  <p class="etiquette-texte">${x.texte}</p>
  <p class="etiquette-horaire">${x.horaire}</p>
  <p class="etiquette-actions">${c.lien('inscription', { params: `activite=${x.cle}`, classe: 'bouton bouton--petit', texte: c.t('accueil.cours.inscrire') })}</p>
</li>`;

export const tringle = (c, region) => html`<div class="tringle" data-effet="tringle" tabindex="0" role="region" aria-label="${region}">
  <ul class="tringle-liste">${c.donnees.pieces.map((p, i) => html`<li class="piece" style="--i:${i}">
    <svg class="cintre" viewBox="0 0 60 40" aria-hidden="true"><path d="M30 2 q6 0 6 6 q0 5 -6 7 L4 34 L56 34 L30 15"/></svg>
    <span class="piece-etiquette"><span class="piece-trou" aria-hidden="true"></span><span class="piece-nom">${p.nom}</span><span class="piece-type">${p.type}</span><span class="piece-prix" data-prix>CHF ${p.prix}</span></span>
  </li>`)}</ul>
</div>
<p class="tringle-aide" aria-hidden="true"><span class="aide-souris">${c.t('commun.glisserSouris')}</span><span class="aide-doigt">${c.t('commun.glisser')}</span></p>`;

export default (c) => html`
<section class="hero" id="debut" data-plein-ecran>
  <div class="hero-texte">
    <p class="hero-tag" data-anime="gsap">${c.t('accueil.hero.tag')}</p>
    <h1 class="hero-titre">
      <span class="hero-coucou craie" data-anime="gsap" aria-hidden="true">${c.t('commun.coucou')}</span>
      <span class="visuellement-cache">${c.t('accueil.hero.mot')}</span>
      <span class="hero-mot" aria-hidden="true">${lettres(c.s('accueil.hero.mot'))}</span>
      <span class="hero-sous" data-anime="gsap">${c.t('accueil.hero.sous')}</span>
    </h1>
    <p class="hero-intro" data-anime="gsap">${c.t('accueil.hero.texte')}</p>
    <p class="hero-actions" data-anime="gsap">
      ${c.lien('inscription', { classe: 'bouton', texte: c.t('accueil.hero.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
      <span class="hero-info" data-info-cle>${c.t('accueil.hero.info')}</span>
    </p>
  </div>
  <div class="hero-patron">
    ${c.media({ nom: 'grok/cours-weekend', alt: c.s('accueil.hero.alt'), cadrage: '50% 52%', priorite: true, classe: 'hero-media', sizes: '(max-width: 760px) 80vw, 40vw' })}
    <svg class="patron-svg" viewBox="0 0 400 520" preserveAspectRatio="none" aria-hidden="true" data-effet="patron-ciseaux">
      <defs>
        <pattern id="patron-grille" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#2747a8" stroke-opacity=".16" stroke-width=".8"/></pattern>
        <mask id="patron-masque" maskUnits="userSpaceOnUse" x="-20" y="-20" width="440" height="570"><path class="patron-revele" d="${PATRON}" pathLength="1" fill="none" stroke="#fff" stroke-width="16"/></mask>
      </defs>
      <g class="patron-piece">
        <path d="${PATRON}" class="patron-papier"/>
        <path d="${PATRON}" fill="url(#patron-grille)"/>
        <g class="patron-reperes">
          <path class="droit-fil" d="M200 150 L200 430 M190 164 L200 150 L210 164 M190 416 L200 430 L210 416"/>
          <path class="crans" d="M44 330 L58 334 M356 334 L370 330 M196 509 L196 523 M204 509 L204 523"/>
          <text class="patron-note" x="214" y="300" transform="rotate(90 214 300)">${c.t('accueil.hero.droitFil')}</text>
          <text class="patron-note patron-note--coupe" x="112" y="70">${c.t('accueil.hero.couper')}</text>
        </g>
      </g>
      <path class="patron-trait" d="${PATRON}" mask="url(#patron-masque)"/>
      ${ciseaux()}
    </svg>
    <span class="hero-aiguille" data-fil-point="0.5 0.5" data-fil-sans-perle aria-hidden="true"></span>
  </div>
</section>

<div class="galon-section">
  <div class="galon" id="galon" data-boucle-css data-ruban><p aria-hidden="true"><span>${c.t('accueil.galon')}</span> <span>${c.t('accueil.galon')}</span></p></div>
  <button type="button" class="galon-pause" data-pause-pour="galon" data-libelle-pause="${c.s('commun.pause')}" data-libelle-lecture="${c.s('commun.lecture')}"><span data-libelle-bouton>${c.t('commun.pause')}</span></button>
</div>

<section class="cours" id="cours" data-fil="gauche">
  <div class="cadre">
    <div class="tete-section">
      <p class="surtitre">${c.t('accueil.cours.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('accueil.cours.titre')}</h2>
      <p data-anime>${c.t('accueil.cours.texte')}</p>
    </div>
    <ul class="etiquettes">${c.donnees.cours.filter((x) => x.cle !== 'weekend').map((x) => etiquette(c, x))}</ul>
    <p class="suite" data-anime>${c.lien('cours', { classe: 'lien-fleche', texte: c.t('accueil.cours.plus') })}</p>
  </div>
</section>

<section class="esprit" id="esprit" data-fil="droite">
  <div class="cadre esprit-grille">
    <div class="esprit-texte">
      <p class="surtitre">${c.t('accueil.esprit.surtitre')}</p>
      <h2 class="esprit-phrase" data-anime>${['m1', 'm2', 'm3'].map((m, i) => html`<span class="craie-mot">${c.t('accueil.esprit.' + m)}${i < 2 ? ',' : ''}<svg class="craie-trait" viewBox="0 0 200 24" preserveAspectRatio="none" aria-hidden="true" data-fx="trace" data-effet="craie"><path d="${brut(['M4 14 C 50 6, 120 20, 196 9', 'M4 10 C 60 20, 130 4, 196 14', 'M4 13 C 70 5, 110 21, 196 8'][i])}"/></svg></span> `)}</h2>
      <p data-anime>${c.t('accueil.esprit.texte')}</p>
    </div>
    <div class="esprit-visuel">
      ${c.media({ nom: 'grok/accueil-ouverture', alt: c.s('accueil.esprit.alt'), cadrage: '52% 50%', classe: 'esprit-media', sizes: '(max-width: 760px) 92vw, 44vw', attrs: 'data-fx="onde"' })}
      <p class="note-craie craie" aria-hidden="true" data-superpose>${c.t('accueil.esprit.note')}<svg viewBox="0 0 60 40" data-fx="trace" data-effet="craie"><path d="M4 4 C 20 30, 40 34, 56 20 M46 16 L56 20 L52 30"/></svg></p>
    </div>
  </div>
</section>

<section class="etapes" id="etapes" data-entete-cache aria-label="${c.s('accueil.etapes.region')}">
  <div class="cadre etapes-grille">
    <div class="etapes-texte">
      <p class="surtitre">${c.t('accueil.etapes.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('accueil.etapes.titre')}</h2>
      <p class="etapes-intro" data-anime>${c.t('accueil.etapes.texte')}</p>
      <ol class="etapes-liste" data-anime="cascade">${[1, 2, 3, 4, 5].map((n) => html`<li class="etape${n === 1 ? ' est-active' : ''}" data-etape="${n - 1}"><span class="etape-num">0${n}</span><span><strong>${c.t(`accueil.etapes.e${n}t`)}</strong> ${c.t(`accueil.etapes.e${n}`)}</span></li>`)}</ol>
      <div class="etapes-progres" aria-hidden="true"><span></span></div>
    </div>
    <div class="etapes-scene" data-effet="croquis-vetement" tabindex="0" role="region" aria-label="${c.s('accueil.etapes.region')}">
      <div class="etapes-cadre etapes-cadre--croquis" data-visuel>${croquis()}<span class="etapes-legende craie" aria-hidden="true">${c.t('accueil.etapes.e1t')}</span></div>
      ${['patron', 'coupe', 'couture', 'essayage'].map((n, i) => html`<div class="etapes-cadre">${c.media({ nom: `grok/accueil-etape-${n}`, alt: c.s(`accueil.etapes.e${i + 2}t`), classe: 'etapes-media', sizes: '(max-width: 760px) 70vw, 36vw' })}</div>`)}
    </div>
  </div>
</section>

<section class="melody-bloc" id="melody" data-fil="gauche">
  <div class="cadre melody-grille">
    <div class="melody-texte">
      <p class="surtitre">${c.t('accueil.melody.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('accueil.melody.titre')}</h2>
      <p data-anime>${c.t('accueil.melody.texte')}</p>
      <blockquote class="citation craie-citation" data-anime><p>${c.t('accueil.melody.citation')}</p></blockquote>
      <p class="melody-langues" data-anime>${c.t('accueil.melody.langues')}</p>
      <p data-anime>${c.lien('melody', { classe: 'lien-fleche', texte: c.t('accueil.melody.lien') })}</p>
    </div>
    <ol class="boutonnieres" data-anime="cascade" data-visuel>${c.donnees.parcours.map((p) => html`<li class="boutonniere">${bouton()}<span class="boutonniere-repere">${p.repere}</span><span class="boutonniere-titre">${p.titre}</span></li>`)}</ol>
  </div>
</section>

<section class="marque" id="marque" data-fil="droite">
  <div class="cadre marque-grille">
    <div class="marque-texte">
      <p class="surtitre"><img class="marque-logo" src="/assets/images/madebymelody-480.webp" alt="${c.t('accueil.marque.surtitre')}" width="480" height="72"></p>
      <h2 data-anime="lignes">${c.t('accueil.marque.titre')}</h2>
      <p data-anime>${c.t('accueil.marque.texte')}</p>
      <p class="marque-actions" data-anime>
        <a class="bouton" href="${c.site.contact.boutique}" target="_blank" rel="noopener" aria-label="${c.s('accueil.marque.boutique')}">${c.t('accueil.marque.boutiqueCourt')}</a>
        ${c.lien('melody', { ancre: 'marque', classe: 'lien-fleche', texte: c.t('accueil.marque.plus') })}
      </p>
    </div>
    ${c.media({ nom: 'robe-madebymelody', alt: c.s('accueil.marque.alt'), cadrage: '50% 40%', classe: 'marque-media', sizes: '(max-width: 760px) 80vw, 30vw', attrs: 'data-anime="rideau"' })}
  </div>
  ${tringle(c, c.s('accueil.marque.region'))}
</section>

<section class="pratique" id="pratique" data-fil="gauche">
  <div class="cadre pratique-grille">
    <div class="pratique-carte">${plan(c)}<p class="pratique-legende">${c.t('accueil.pratique.plan')}</p></div>
    <div class="pratique-texte">
      <p class="surtitre">${c.t('accueil.pratique.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('accueil.pratique.titre')}</h2>
      <address class="pratique-adresse" data-anime><strong>${c.t('accueil.pratique.lieu')}</strong><br>${c.site.contact.adresse}<br>${c.t('accueil.pratique.repere')}<br><a href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a> · <a href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></address>
      <ul class="conditions" data-anime="cascade">${[1, 2, 3].map((n) => html`<li><strong>${c.t(`accueil.pratique.c${n}t`)}</strong> ${c.t(`accueil.pratique.c${n}`)}</li>`)}</ul>
      <p data-anime>${c.lien('cours', { ancre: 'conditions', classe: 'lien-fleche', texte: c.t('accueil.pratique.conditions') })}</p>
    </div>
  </div>
</section>

<section class="fin" id="fin" data-fil="gauche">
  <div class="cadre fin-grille">
    ${c.media({ nom: 'grok/accueil-atelier', alt: c.s('accueil.fin.alt'), cadrage: '30% 55%', classe: 'fin-media', sizes: '(max-width: 760px) 92vw, 46vw', attrs: 'data-fx="parallaxe"' })}
    <div>
      <h2 data-anime="lignes">${c.t('accueil.fin.titre')}</h2>
      <p data-anime>${c.t('accueil.fin.texte')}</p>
      <p class="fin-actions" data-anime>
        ${c.lien('inscription', { classe: 'bouton', texte: c.t('accueil.fin.action'), attrs: 'data-survol="magnetique"' })}
        <a class="bouton bouton--contour" href="tel:${c.site.contact.telephoneLien}" data-survol="magnetique">${c.t('accueil.fin.appeler')}</a>
      </p>
    </div>
  </div>
</section>
${aiguille()}
`;
