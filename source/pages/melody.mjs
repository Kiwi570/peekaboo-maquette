/* Melody & MADEBYMELODY : ouverture centrée sur papier crème, polaroïd épinglé et croquis tracé autour (polaroid),
   parcours en boutonnières, enseignement, tringle des pièces, sur-mesure. */
import { html } from '../../outils/gabarit.mjs';
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

<section class="cic parcours-voyage" id="parcours" data-module="carte-itineraire-collante" data-epingle aria-labelledby="voyage-titre">
  <div class="cic__tete cadre">
    <p class="surtitre">${c.t('melody.parcours.surtitre')}</p>
    <h2 class="cic__titre" id="voyage-titre" data-anime="lignes">${c.t('melody.parcours.titre')}</h2>
    <p class="cic__intro citation-courte">${c.t('melody.parcours.texte')}</p>
  </div>
  <div class="cic__corps cadre">
    <ol class="cic__etapes">${c.donnees.voyage.map((v, i) => html`<li class="cic__etape" id="etape-${i + 1}" data-x="${v.x}" data-y="${v.y}">
      <p class="cic__n"><b>0${i + 1}</b><span>${v.lieu}</span></p>
      <div class="cic__texte"><h3>${v.titre}</h3><p>${v.texte}</p></div>
    </li>`)}</ol>
    <div class="cic__carte" data-tient>
      <div class="cic__plan">
        <svg class="cic__svg" viewBox="0 0 100 75" aria-hidden="true" data-effet="fil-rouge">
          <defs><pattern id="voyage-grille" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M5 0H0V5" fill="none" stroke="#2747a8" stroke-opacity=".12" stroke-width=".2"/></pattern></defs>
          <rect class="cic__fond" width="100" height="75"/>
          <rect width="100" height="75" fill="url(#voyage-grille)"/>
          <g class="voyage-meridiens"><path d="M20 0 V75 M45 0 V75 M70 0 V75 M0 20 H100 M0 45 H100"/></g>
          <path class="voyage-lac" d="M47.2 31.6 C 48.6 29.4, 51.6 27.6, 55 26.6 C 57.6 25.9, 60.4 26.4, 61.2 27.8 C 59.4 28.2, 57.4 28.4, 55.4 29.2 C 52.8 30.2, 50.2 31.6, 48.4 32.8 Z"/>
        </svg>
        <ul class="voyage-villes" aria-hidden="true">${c.donnees.voyage.filter((v, i, t) => t.findIndex((w) => w.lieu === v.lieu) === i).map((v) => html`<li class="voyage-ville" style="left:${v.x + 3}%;top:${((v.y + (v.lieu === 'Genève' ? 6 : -4)) / 75 * 100).toFixed(1)}%">${v.lieu}</li>`)}</ul>
        <p class="cic__compteur">${c.t('melody.parcours.etape')} <b data-cic-n>1</b> / <span data-cic-total>5</span></p>
        <p class="cic__legende" data-tient>${c.t('melody.parcours.legende')}</p>
      </div>
    </div>
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
