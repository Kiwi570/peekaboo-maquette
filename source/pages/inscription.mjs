/* Inscription (page de catégorie) : ouverture compacte sur fond bleu craie quadrillé, tampon Peekaboo (tampon),
   formulaire en quatre étapes (module formulaire-par-etapes), prérempli par ?activite=…, mention nLPD. */
import { html } from '../../outils/gabarit.mjs';

export const page = { cle: 'inscription', fichier: 'inscription', imagePartage: 'grok/inscription-ouverture-1280.webp' };

export default (c) => {
  const F = (k) => c.t('inscription.form.' + k);
  const activites = [...c.donnees.cours.map((x) => ({ v: x.cle, t: x.titre, d: x.prix ? `CHF ${x.prix} ${x.unite}` : x.unite, e: x.etiquette })), { v: 'yoga', t: c.s('cours.yoga.titre'), d: c.s('inscription.form.yogaTexte'), e: c.s('cours.planning.yoga') }, { v: 'autre', t: c.s('inscription.form.autre'), d: c.s('inscription.form.autreTexte'), e: '' }];
  return html`
<section class="page-tete tete-inscription" id="debut">
  <div class="cadre tete-inscription-grille">
    <div class="fiche-tete">
      <p class="surtitre" data-anime="gsap">${c.t('inscription.tete.surtitre')}</p>
      <h1 data-anime="gsap">${c.t('inscription.tete.titre')}</h1>
      <p class="tete-intro" data-anime="gsap">${c.t('inscription.tete.texte')}</p>
      <p class="tete-actions-inscription" data-anime="gsap"><a class="bouton bouton--clair" href="#formulaire" data-sans-transition data-action-principale>${c.t('inscription.tete.action')}</a> <span class="hero-info" data-info-cle>${c.t('inscription.tete.info')}</span></p>
    </div>
    <div class="tampon-cadre" aria-hidden="true" data-effet="tampon" data-visuel>
      <svg class="tampon" viewBox="0 0 160 160" data-anime="gsap"><defs><path id="tampon-cercle" d="M80 80 m-58 0 a58 58 0 1 1 116 0 a58 58 0 1 1 -116 0"/></defs>
        <circle cx="80" cy="80" r="74" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="80" cy="80" r="44" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <text class="tampon-texte"><textPath href="#tampon-cercle" startOffset="0">${c.t('inscription.tete.tamponTour')}</textPath></text>
        <image href="/assets/images/logo-clair-240.webp" x="50" y="53" width="60" height="55"/></svg>
    </div>
    ${c.media({ nom: 'grok/inscription-ouverture', alt: c.s('inscription.tete.alt'), priorite: true, classe: 'tete-inscription-media', sizes: '(max-width: 760px) 92vw, 30vw' })}
  </div>
</section>

<section class="fpe" id="formulaire" data-module="formulaire-par-etapes">
  <div class="cadre fpe-grille">
    <div class="fpe__carton">
      <form class="fpe__form" novalidate data-anime>
        <fieldset class="fpe__etape" data-etape="${c.s('inscription.form.e1')}">
          <legend class="fpe__legende"><h2 class="fpe__titre">${F('e1q')}</h2></legend>
          <div class="fpe__groupe fpe__cartes" data-libelle="${c.s('inscription.form.activite')}">
            ${activites.map((a) => html`<label class="fpe__carte"><input type="radio" name="activite" value="${a.v}" required data-superpose>${a.e ? html`<span class="fpe__carte-texte fpe__carte-onglet">${a.e}</span>` : ''}<span class="fpe__carte-titre">${a.t}</span><span class="fpe__carte-texte" data-prix>${a.d}</span></label>`)}
          </div>
        </fieldset>
        <fieldset class="fpe__etape" data-etape="${c.s('inscription.form.e2')}">
          <legend class="fpe__legende"><h2 class="fpe__titre">${F('e2q')}</h2></legend>
          <div class="fpe__champ"><label for="i-participant">${F('prenomParticipant')}</label><input id="i-participant" name="participant" autocomplete="off" required></div>
          <div class="fpe__champ"><label for="i-age">${F('age')}</label><input id="i-age" name="age" type="number" min="4" max="99" inputmode="numeric" aria-describedby="i-age-aide" required><p class="fpe__aide" id="i-age-aide">${F('ageAide')}</p></div>
          <div class="fpe__groupe fpe__puces" data-libelle="${c.s('inscription.form.niveau')}" role="radiogroup" aria-label="${c.s('inscription.form.niveau')}">
            ${[1, 2, 3].map((n) => html`<label class="fpe__puce"><input type="radio" name="niveau" value="n${n}"${n === 1 ? ' required' : ''} data-superpose><span>${F('n' + n)}</span></label>`)}
          </div>
        </fieldset>
        <fieldset class="fpe__etape" data-etape="${c.s('inscription.form.e3')}">
          <legend class="fpe__legende"><h2 class="fpe__titre">${F('e3q')}</h2></legend>
          <div class="fpe__ligne">
            <div class="fpe__champ"><label for="i-prenom">${F('prenom')}</label><input id="i-prenom" name="prenom" autocomplete="given-name" required></div>
            <div class="fpe__champ"><label for="i-nom">${F('nom')}</label><input id="i-nom" name="nom" autocomplete="family-name" required></div>
          </div>
          <div class="fpe__ligne">
            <div class="fpe__champ"><label for="i-email">${F('email')}</label><input id="i-email" name="email" type="email" autocomplete="email" required></div>
            <div class="fpe__champ"><label for="i-tel">${F('tel')}</label><input id="i-tel" name="tel" type="tel" autocomplete="tel" pattern="[0-9 +().-]{9,}" required></div>
          </div>
          <div class="fpe__champ"><label for="i-message">${F('message')}</label><textarea id="i-message" name="message" rows="3"></textarea></div>
        </fieldset>
        <fieldset class="fpe__etape" data-etape="${c.s('inscription.form.e4')}" data-recap>
          <legend class="fpe__legende"><h2 class="fpe__titre">${F('e4q')}</h2></legend>
          <div class="fpe__recap"></div>
          <label class="fpe__case"><input type="checkbox" name="accord" value="oui" required data-hors-recap data-superpose><span>${F('accord')}</span></label>
          <p class="mention-donnees">${c.t('commun.donnees')}</p>
        </fieldset>
        <div class="fpe__nav"><button type="button" class="bouton bouton--contour" data-precedent>${F('precedent')}</button><button type="button" class="bouton" data-suivant>${F('suivant')}</button><button type="submit" class="bouton">${F('envoyer')}</button></div>
      </form>
      <div class="fpe__fin" hidden tabindex="-1"><h2>${F('fin')}</h2><p data-resume></p><p class="mention-simule">${c.t('commun.simule')}</p><button type="button" class="bouton bouton--contour" data-recommencer>${F('recommencer')}</button></div>
    </div>
    <aside class="rappel" aria-labelledby="rappel-titre">
      ${c.media({ nom: 'grok/cours-conditions', alt: c.s('inscription.rappel.alt'), classe: 'rappel-media', sizes: '(max-width: 900px) 92vw, 320px' })}
      <h2 id="rappel-titre" class="rappel-titre">${c.t('inscription.rappel.titre')}</h2>
      <ul data-anime="cascade">${[1, 2, 3, 4, 5].map((n) => html`<li>${c.t('inscription.rappel.r' + n)}</li>`)}</ul>
      <p>${c.lien('cours', { ancre: 'conditions', classe: 'lien-fleche', texte: c.t('inscription.rappel.lien') })}</p>
      <p class="rappel-contact"><a href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a><br><a href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></p>
    </aside>
  </div>
</section>
`;
};
