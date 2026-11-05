/* Gabarit commun : head, en-tête, menu, pied de page, barre fixe du téléphone, voile.
   Les conventions data-* sont celles que lisent le socle JavaScript et l'audit (voir le README). */
import { html, brut } from '../../outils/gabarit.mjs';

const navigation = (c) => c.site.navigation.filter((cle) => c.pages[cle] && (c.pages[cle].langues || c.langues).includes(c.l));

function tete(c) {
  const p = c.page, cle = p.cle;
  const titre = c.s(`pages.${cle}.titre`), description = c.s(`pages.${cle}.description`);
  const ici = c.abs(c.url(cle));
  const imagePartage = c.abs(`/assets/partage/${p.partage === false ? 'accueil' : cle}-${c.l}.jpg`);
  const autres = c.alternatives(cle);
  const structure = c.donnees.structure ? JSON.stringify(c.donnees.structure).replace(/</g, '\\u003c') : '';
  return html`<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${titre}</title>
<meta name="description" content="${description}">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="${ici}">
${autres.length > 1 ? autres.map((a) => html`<link rel="alternate" hreflang="${a.l}" href="${c.abs(a.url)}">\n`) : ''}${autres.length > 1 ? html`<link rel="alternate" hreflang="x-default" href="${c.abs(c.alternatives(cle)[0].url)}">` : ''}
<style>${brut(c.critique.css)}</style>
<script>${brut(c.critique.js)}</script>
${(c.site.polices || []).map((f) => html`<link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin>\n`)}<link rel="stylesheet" href="${c.asset('css/socle.css')}">
<link rel="stylesheet" href="${c.asset('js/modules/fil-conducteur/module.css')}">
<link rel="stylesheet" href="${c.asset('js/modules/formulaire-par-etapes/module.css')}">
<link rel="stylesheet" href="${c.asset('js/modules/carte-itineraire-collante/module.css')}">
<link rel="stylesheet" href="${c.asset('css/site.css')}">
<link rel="modulepreload" href="${c.asset('js/site.js')}">
<link rel="modulepreload" href="${c.asset('js/socle/index.js')}">
<script src="/assets/vendor/gsap.min.js" defer></script>
<script src="/assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="/assets/vendor/SplitText.min.js" defer></script>
<script type="module" src="${c.asset('js/site.js')}"></script>
<meta name="theme-color" content="${c.site.couleurs.theme || c.site.couleurs.fond}">
<link rel="icon" href="/assets/images/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${c.site.nom}">
<meta property="og:locale" content="${c.l === 'fr' ? 'fr_FR' : c.l === 'en' ? 'en_GB' : c.l}">
<meta property="og:title" content="${titre}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${ici}">
<meta property="og:image" content="${imagePartage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${c.s(`pages.${p.partage === false ? 'accueil' : cle}.partageAlt`)}">
<meta name="twitter:card" content="summary_large_image">
${structure ? html`<script type="application/ld+json">${brut(structure)}</script>` : ''}
</head>`;
}

function entete(c) {
  const autreLangue = c.alternatives(c.page.cle).filter((a) => a.l !== c.l);
  return html`<header data-entete>
  <div class="entete-rangee">
    <a class="entete-logo" href="${c.url('accueil')}" data-libelle="${c.libelle('accueil')}"${c.page.cle === 'accueil' ? brut(' aria-current="page"') : ''}>
      <img src="/assets/images/logo-240.webp" alt="" width="240" height="219"><span>${c.site.nom}</span>
    </a>
    <nav data-nav aria-label="${c.s('commun.navigation')}">
      <ul>${navigation(c).filter((k) => k !== 'accueil').map((k) => html`<li>${c.lien(k)}</li>`)}</ul>
    </nav>
    <div class="entete-actions">
      ${autreLangue.map((a) => html`<a class="entete-langue" href="${a.url}" hreflang="${a.l}" lang="${a.l}" data-langue="${a.l}" aria-label="${c.s('commun.langueAutre')}">${a.l}</a>`)}
      ${c.site.actionEntete ? html`<a class="bouton" href="${c.url(c.site.actionEntete.page, c.site.actionEntete.ancre || '')}" data-libelle="${c.libelle(c.site.actionEntete.page)}">${c.t('commun.actionEntete')}</a>` : ''}
      <button type="button" data-menu-bouton aria-controls="menu" aria-expanded="false" data-libelle-ouvrir="${c.s('commun.menu')}" data-libelle-fermer="${c.s('commun.fermer')}"><span data-libelle-bouton>${c.t('commun.menu')}</span></button>
    </div>
  </div>
</header>
<div id="menu" data-menu role="dialog" aria-modal="true" aria-label="${c.s('commun.menu')}">
  <ul>${navigation(c).map((k, i) => html`<li style="--i:${i}">${c.lien(k, { classe: 'menu-lien' })}</li>`)}</ul>
  <p><a class="bouton" href="tel:${c.site.contact.telephoneLien}">${c.t('commun.appeler')} ${c.site.contact.telephone}</a></p>
  ${autreLangue.map((a) => html`<p><a class="entete-langue" href="${a.url}" hreflang="${a.l}" lang="${a.l}" data-langue="${a.l}">${c.s('commun.langueAutre')}</a></p>`)}
  <p><button type="button" class="lien" data-calme-bascule data-libelle-reduire="${c.s('commun.calmeReduire')}" data-libelle-retablir="${c.s('commun.calmeRetablir')}" data-libelle-systeme="${c.s('commun.calmeSysteme')}"><span data-libelle-bouton>${c.t('commun.calmeReduire')}</span></button></p>
</div>`;
}

function pied(c) {
  return html`<footer class="pied" id="pied">
  <div class="conteneur pied-grille">
    <div>
      <p><strong>${c.site.nom}</strong></p>
      <p>${c.site.contact.adresse}<br>${c.site.contact.repere}<br><a href="tel:${c.site.contact.telephoneLien}">${c.site.contact.telephone}</a><br><a href="mailto:${c.site.contact.email}">${c.site.contact.email}</a></p>
      <p class="pied-reseaux"><a href="${c.site.contact.instagram}" target="_blank" rel="noopener" aria-label="${c.s('commun.instagram')}">Instagram</a> <a href="${c.site.contact.facebook}" target="_blank" rel="noopener" aria-label="${c.s('commun.facebook')}">Facebook</a></p>
    </div>
    <nav aria-label="${c.s('commun.sommaire')}">
      <p><strong>${c.t('commun.sommaire')}</strong></p>
      <ul>${navigation(c).map((k) => html`<li>${c.lien(k)}</li>`)}</ul>
    </nav>
    <div>
      <p><strong>${c.t('commun.confort')}</strong></p>
      <ul>
        <li><button type="button" class="lien" data-calme-bascule data-libelle-reduire="${c.s('commun.calmeReduire')}" data-libelle-retablir="${c.s('commun.calmeRetablir')}" data-libelle-systeme="${c.s('commun.calmeSysteme')}"><span data-libelle-bouton>${c.t('commun.calmeReduire')}</span></button></li>
        <li><a href="#haut" data-sans-transition>${c.t('commun.retourHaut')}</a></li>
      </ul>
    </div>
  </div>
  <div class="conteneur pied-bas"><p>${c.t('commun.maquette')}</p><p>${c.t('commun.legal')}</p><p>© ${c.site.nom}</p></div>
</footer>`;
}

function barre(c) {
  const a = c.site.actionEntete;
  return html`<div data-barre-fixe>
  <a class="bouton bouton--contour" href="tel:${c.site.contact.telephoneLien}">${c.t('commun.appeler')}</a>
  ${a ? html`<a class="bouton" href="${c.url(a.page, a.ancre || '')}" data-libelle="${c.libelle(a.page)}">${c.t('commun.actionEntete')}</a>` : ''}
</div>`;
}

function voile(c) {
  return html`<div data-voile aria-hidden="true" data-effet="fermeture-eclair">
  <span class="zip-pan zip-pan--g"></span><span class="zip-pan zip-pan--d"></span>
  <span class="zip-joint"></span>
  <span class="zip-tirette"><svg viewBox="0 0 40 90"><rect x="8" y="0" width="24" height="22" rx="4"/><path d="M12 22 h16 l-3 60 a5 5 0 0 1 -10 0 z"/><circle cx="20" cy="72" r="4.5"/></svg></span>
  <div class="voile-contenu"><img src="/assets/images/logo-240.webp" alt="" width="240" height="219"><span data-voile-libelle>${c.libelle(c.page.cle)}</span></div>
</div>`;
}

export function page(c, contenu) {
  return html`<!doctype html>
<html lang="${c.l}" data-v="${c.v}"${c.site.curseur ? brut(' data-curseur') : ''}>
${tete(c)}
<body id="haut">
${voile(c)}
<div class="ouverture-panneau" data-ouverture data-gouttiere="${c.site.couleurs.ouverture}" aria-hidden="true">
  <div class="pan-tissu" data-effet="coucou">
    <span class="pan-couture"></span>
    <span class="pan-yeux"><span class="pan-oeil"></span><span class="pan-oeil"></span></span>
    <span class="pan-etiquette"><img src="/assets/images/logo-240.webp" alt="" width="240" height="219"><span>${c.site.nom}</span><small>${c.t('commun.introLigne')}</small></span>
    <span class="pan-coin"></span>
  </div>
</div>
<a class="evitement" href="#contenu">${c.t('commun.evitement')}</a>
${entete(c)}
<main id="contenu" tabindex="-1" data-page="${c.page.cle}"${c.page.sansAction ? brut(' data-sans-action') : ''}${c.page.sansEffet ? brut(' data-sans-effet') : ''}>
${contenu}
</main>
${pied(c)}
${barre(c)}
</body>
</html>`;
}
