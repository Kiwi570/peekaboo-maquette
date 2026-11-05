/* Page 404 : « Un point a sauté », couture interrompue. */
import { html } from '../../outils/gabarit.mjs';

export const page = { cle: '404', fichier: '404', partage: false };

export default (c) => html`
<section class="page-tete page-404" id="debut">
  ${c.media({ nom: 'grok/404', alt: c.s('introuvable.alt'), priorite: true, classe: 'page-404-media', sizes: '(max-width: 760px) 92vw, 50vw', attrs: 'data-anime="gsap"' })}
  <div class="page-404-texte">
    <h1 data-anime="gsap">${c.t('introuvable.titre')}</h1>
    <p data-anime="gsap">${c.t('introuvable.texte')}</p>
    <p data-anime="gsap">${c.lien('accueil', { classe: 'bouton', texte: c.t('introuvable.retour'), attrs: 'data-action-principale' })} <span class="hero-info" data-info-cle>${c.site.contact.telephone}</span></p>
  </div>
</section>
`;
