/* Contact : numéro de téléphone en très grand sur fond rouge fil, contour piqué point par point (numero-cousu),
   bandeau panoramique de l'atelier, accès et plan schématique, formulaire court prérempli par ?sujet=…. */
import { html } from '../../outils/gabarit.mjs';
import { plan } from '../gabarits/dessins.mjs';

export const page = { cle: 'contact', fichier: 'contact', imagePartage: 'grok/contact-bandeau-1280.webp' };

export default (c) => html`
<section class="page-tete tete-contact" id="debut">
  <div class="cadre">
    <p class="surtitre" data-anime="gsap">${c.t('contact.tete.surtitre')}</p>
    <h1 class="tete-contact-titre" data-anime="gsap">${c.t('contact.tete.titre')}</h1>
    <a class="numero" href="tel:${c.site.contact.telephoneLien}" data-effet="numero-cousu" data-action-principale>
      <span class="numero-chiffres" data-anime="gsap">${c.site.contact.telephone}</span>
    </a>
    <p class="tete-contact-texte" data-anime="gsap">${c.t('contact.tete.texte')} <a href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></p>
    <p class="hero-info" data-info-cle data-anime="gsap">${c.t('contact.tete.info')}</p>
  </div>
  ${c.media({ nom: 'grok/contact-bandeau', alt: c.s('contact.tete.alt'), priorite: true, classe: 'tete-contact-media', sizes: '100vw', attrs: 'data-fx="parallaxe"' })}
</section>

<section class="bloc-page acces" id="acces">
  <div class="cadre pratique-grille">
    <div class="pratique-carte">${plan(c)}<p class="pratique-legende">${c.t('contact.infos.plan')}</p></div>
    <div>
      <h2 data-anime="lignes">${c.t('contact.infos.titre')}</h2>
      <address class="pratique-adresse" data-anime><strong>${c.t('accueil.pratique.lieu')}</strong><br>${c.site.contact.adresse}<br>${c.t('contact.infos.repere')}</address>
      <ul class="conditions" data-anime="cascade"><li>${c.t('contact.infos.acces')}</li><li>${c.t('contact.infos.horaires')}</li><li>${c.t('contact.reseaux.yoga')}</li></ul>
      <p class="reseaux" data-anime><a class="lien-fleche" href="${c.site.contact.instagram}" target="_blank" rel="noopener" aria-label="${c.s('commun.instagram')}">Instagram</a> <a class="lien-fleche" href="${c.site.contact.facebook}" target="_blank" rel="noopener" aria-label="${c.s('commun.facebook')}">Facebook</a></p>
    </div>
  </div>
</section>

<section class="bloc-page formulaire-contact" id="formulaire">
  <div class="cadre formulaire-grille">
    <div>
      <h2 data-anime="lignes">${c.t('contact.form.titre')}</h2>
      ${c.media({ nom: 'grok/inscription-ouverture', alt: c.s('inscription.tete.alt'), classe: 'formulaire-media', sizes: '(max-width: 760px) 92vw, 36vw', attrs: 'data-anime="rideau"' })}
    </div>
    <form class="formulaire" data-formulaire novalidate data-anime>
      <div class="fpe__ligne">
        <div class="champ"><label for="c-prenom">${c.t('contact.form.prenom')}</label><input id="c-prenom" name="prenom" autocomplete="given-name" required></div>
        <div class="champ"><label for="c-nom">${c.t('contact.form.nom')}</label><input id="c-nom" name="nom" autocomplete="family-name" required></div>
      </div>
      <div class="fpe__ligne">
        <div class="champ"><label for="c-email">${c.t('contact.form.email')}</label><input id="c-email" name="email" type="email" autocomplete="email" required></div>
        <div class="champ"><label for="c-tel">${c.t('contact.form.tel')}</label><input id="c-tel" name="tel" type="tel" autocomplete="tel"></div>
      </div>
      <div class="champ"><label for="c-sujet">${c.t('contact.form.sujet')}</label>
        <select id="c-sujet" name="sujet" required>
          ${[['enfants-ados', 's1'], ['adultes', 's2'], ['stage-click', 's3'], ['weekend', 's4'], ['sur-mesure', 's5'], ['autre', 's6']].map(([v, k]) => html`<option value="${v}">${c.t('contact.form.' + k)}</option>`)}
        </select></div>
      <div class="champ"><label for="c-message">${c.t('contact.form.message')}</label><textarea id="c-message" name="message" rows="4"></textarea></div>
      <p class="mention-donnees">${c.t('commun.donnees')}</p>
      <p><button type="submit" class="bouton">${c.t('contact.form.envoyer')}</button></p>
      <p data-message-envoi hidden tabindex="-1" data-texte="${c.s('commun.simule')}"></p>
    </form>
  </div>
</section>
`;
