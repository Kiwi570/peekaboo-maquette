/* Melody & MADEBYMELODY : ouverture centrée sur papier crème, polaroïd épinglé et croquis tracé autour (polaroid),
   parcours en boutonnières, enseignement, tringle des pièces, sur-mesure. */
import { html } from '../../outils/gabarit.mjs';
import { bouton } from '../gabarits/dessins.mjs';
import { tringle } from './accueil.mjs';

export const page = { cle: 'melody', fichier: 'melody', imagePartage: 'grok/melody-ouverture-1280.webp' };

export default (c) => html`
<section class="page-tete tete-melody" id="debut">
  ${c.media({ nom: 'grok/melody-ouverture', alt: c.s('melody.tete.altFond'), priorite: true, classe: 'tete-melody-fond', sizes: '100vw' })}
  <div class="tete-melody-contenu">
    <div class="polaroid-cadre" data-effet="polaroid">
      <svg class="tete-croquis" viewBox="0 0 400 300" aria-hidden="true"><g fill="none" stroke="#2747a8" stroke-width="2" stroke-linecap="round">
        <path pathLength="1" d="M30 250 C 60 120, 120 60, 200 40 S 350 90, 372 240"/><path pathLength="1" d="M60 270 q 140 30 280 0"/>
        <path pathLength="1" d="M18 70 l 30 18 M380 60 l -28 22 M8 180 l 28 -6 M392 170 l -26 -8"/></g></svg>
      <figure class="polaroid" data-visuel data-anime="gsap">
        <span class="polaroid-epingle" aria-hidden="true"></span>
        <img src="/assets/images/madebymelody-808.webp" alt="" width="808" height="122" class="polaroid-logo">
        <figcaption class="craie">${c.t('melody.tete.polaroid')}</figcaption>
      </figure>
    </div>
    <p class="surtitre" data-anime="gsap">${c.t('melody.tete.surtitre')}</p>
    <h1 data-anime="gsap">${c.t('melody.tete.titre')}</h1>
    <p class="tete-intro" data-anime="gsap">${c.t('melody.tete.texte')}</p>
    <p class="tete-actions" data-anime="gsap">${c.lien('melody', { ancre: 'marque', classe: 'bouton', texte: c.t('melody.tete.action'), attrs: 'data-action-principale' })} <span class="hero-info" data-info-cle>${c.t('melody.tete.info')}</span></p>
  </div>
</section>

<section class="bloc-page parcours" id="parcours">
  <div class="cadre">
    <div class="tete-section">
      <p class="surtitre">${c.t('melody.parcours.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('melody.parcours.titre')}</h2>
      <p data-anime>${c.t('melody.parcours.texte')}</p>
    </div>
    <ol class="frise" data-visuel>
      <svg class="frise-fil" viewBox="0 0 10 100" preserveAspectRatio="none" aria-hidden="true" data-fx="trace" data-effet="fil-rouge"><path data-fx-trait d="M5 0 C 9 20, 1 30, 5 50 S 9 80, 5 100" fill="none" stroke="#b2261f" stroke-width="2.4" vector-effect="non-scaling-stroke"/></svg>
      ${c.donnees.parcours.map((p, i) => html`<li class="frise-etape${i % 2 ? ' frise-etape--droite' : ''}" data-anime>${bouton()}<span class="boutonniere-repere">${p.repere}</span><strong>${p.titre}</strong><span>${p.texte}</span></li>`)}
    </ol>
  </div>
</section>

<section class="bloc-page enseigner" id="enseigner">
  <div class="cadre enseigner-grille">
    ${c.media({ nom: 'grok/accueil-etape-coupe', alt: c.s('melody.enseigner.alt'), classe: 'enseigner-media', sizes: '(max-width: 760px) 92vw, 40vw', attrs: 'data-fx="parallaxe"' })}
    <div>
      <p class="surtitre">${c.t('melody.enseigner.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('melody.enseigner.titre')}</h2>
      <p data-anime>${c.t('melody.enseigner.texte')}</p>
      <blockquote class="citation" data-anime><p>${c.t('accueil.melody.citation')}</p></blockquote>
      <p data-anime>${c.t('melody.enseigner.langues')}</p>
    </div>
  </div>
</section>

<section class="bloc-page marque" id="marque">
  <div class="cadre marque-grille">
    <div class="marque-texte">
      <p class="surtitre"><img class="marque-logo" src="/assets/images/madebymelody-480.webp" alt="${c.t('melody.marque.surtitre')}" width="480" height="72"></p>
      <h2 data-anime="lignes">${c.t('melody.marque.titre')}</h2>
      <p data-anime>${c.t('melody.marque.texte')}</p>
      <p data-anime>${c.t('melody.marque.vente')}</p>
      <p class="marque-actions" data-anime><a class="bouton" href="${c.site.contact.boutique}" target="_blank" rel="noopener" aria-label="${c.s('melody.marque.boutique')}">${c.t('accueil.marque.boutiqueCourt')}</a> <a class="lien-fleche" href="${c.site.contact.instagramMarque}" target="_blank" rel="noopener" aria-label="${c.s('melody.marque.instagram')}">Instagram</a></p>
    </div>
    ${c.media({ nom: 'robe-madebymelody', alt: c.s('accueil.marque.alt'), cadrage: '50% 40%', classe: 'marque-media', sizes: '(max-width: 760px) 80vw, 30vw', attrs: 'data-anime="rideau"' })}
  </div>
  ${tringle(c, c.s('melody.marque.region'))}
  <p class="cadre note-prix">${c.t('melody.marque.prix')}</p>
</section>

<section class="bloc-page mesure" id="sur-mesure">
  <div class="cadre mesure-grille">
    <div>
      <p class="surtitre">${c.t('melody.mesure.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('melody.mesure.titre')}</h2>
      <p data-anime>${c.t('melody.mesure.texte')}</p>
      <ol class="mesure-etapes" data-anime="cascade">${[1, 2, 3, 4].map((n) => html`<li><span>0${n}</span> ${c.t('melody.mesure.e' + n)}</li>`)}</ol>
      <p data-anime>${c.lien('contact', { ancre: 'formulaire', params: 'sujet=sur-mesure', classe: 'bouton', texte: c.t('melody.mesure.action'), attrs: 'data-survol="magnetique"' })}</p>
    </div>
    ${c.media({ nom: 'grok/melody-sur-mesure', alt: c.s('melody.mesure.alt'), classe: 'mesure-media', sizes: '(max-width: 760px) 80vw, 36vw', attrs: 'data-anime="rideau"' })}
  </div>
</section>

<section class="bloc-page fin-page" id="fin">
  <div class="cadre fin-carte" data-visuel>
    <h2 data-anime="lignes">${c.t('melody.fin.titre')}</h2>
    <p data-anime>${c.t('melody.fin.texte')}</p>
    <p data-anime>${c.lien('contact', { ancre: 'formulaire', params: 'sujet=sur-mesure', classe: 'bouton', texte: c.t('melody.fin.action') })}</p>
  </div>
</section>
`;
