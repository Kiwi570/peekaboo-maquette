/* Cours & stages : ouverture scindée sur kraft avec mètre ruban (metre-ruban), fiches cousues, planning filtrable,
   ateliers du weekend (statuts automatiques), stage click!, tissu, conditions, yoga. */
import { html } from '../../outils/gabarit.mjs';
import { etiquette } from './accueil.mjs';
import { croquis } from '../gabarits/dessins.mjs';

export const page = { cle: 'cours', fichier: 'cours', imagePartage: 'grok/cours-ouverture-1280.webp' };

const heure = (h) => { const e = Math.floor(h), m = Math.round((h - e) * 60); return m ? `${e} h ${String(m).padStart(2, '0')}` : `${e} h`; };
/* Échelle repliée : 9 h – 11 h, pli de 11 h à 16 h (aucun cours), puis 16 h – 21 h. */
const pos = (h) => (h <= 11 ? h - 9 : h >= 16 ? 2.6 + (h - 16) : 2 + ((h - 11) / 5) * 0.6) / 7.6;

export default (c) => {
  const P = c.donnees.planning;
  const prix = c.donnees.cours.filter((x) => x.prix);
  const aujourdhui = new Date().toISOString().slice(0, 10);
  return html`
<section class="page-tete tete-cours" id="debut">
  <div class="tete-cours-texte">
    <p class="surtitre" data-anime="gsap">${c.t('cours.tete.surtitre')}</p>
    <h1 data-anime="gsap">${c.t('cours.tete.titre')}</h1>
    <p class="tete-intro" data-anime="gsap">${c.t('cours.tete.texte')}</p>
    <p data-anime="gsap">${c.lien('inscription', { classe: 'bouton', texte: c.t('cours.tete.action'), attrs: 'data-action-principale data-survol="magnetique"' })}</p>
  </div>
  <div class="tete-cours-visuel">
    ${c.media({ nom: 'grok/cours-ouverture', alt: c.s('cours.tete.alt'), cadrage: '62% 50%', priorite: true, classe: 'tete-cours-media', sizes: '(max-width: 760px) 100vw, 50vw' })}
    <div class="metre" data-effet="metre-ruban" data-info-cle data-superpose data-anime="gsap">
      <span class="metre-graduations" aria-hidden="true"></span>
      <ul class="metre-reperes">${prix.map((x) => html`<li class="metre-repere"><strong data-prix>CHF ${x.prix}</strong> <span>${x.etiquette} · ${x.unite}</span></li>`)}</ul>
    </div>
  </div>
</section>

<section class="bloc-page fiches" id="fiches">
  <div class="cadre">
    <div class="tete-section">
      <h2 data-anime="lignes">${c.t('cours.fiches.titre')}</h2>
      <p data-anime>${c.t('cours.fiches.texte')}</p>
    </div>
    <ul class="etiquettes etiquettes--quatre">${c.donnees.cours.map((x) => etiquette(c, x, { id: `fiche-${x.cle}` }))}</ul>
  </div>
</section>

<section class="bloc-page planning" id="planning" data-planning>
  <div class="cadre">
    <div class="tete-section">
      <p class="surtitre">${c.t('cours.planning.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('cours.planning.titre')}</h2>
      <p data-anime>${c.t('cours.planning.texte')}</p>
    </div>
    <div class="filtres" role="group" aria-label="${c.s('cours.planning.filtre')}">
      ${['tous', 'ados', 'adultes', 'yoga'].map((f) => html`<button type="button" class="filtre filtre--${f}" data-filtre="${f}" aria-pressed="${f === 'tous' ? 'true' : 'false'}">${c.t('cours.planning.' + f)}</button>`)}
      <p class="filtres-etat" data-planning-etat data-modele="{n} créneaux affichés" aria-live="polite"></p>
    </div>
    <div class="semaine" data-anime="cascade" data-visuel>
      ${P.jours.map((j, i) => html`<div class="jour">
        <h3 class="jour-nom"><span class="jour-long">${j}</span><span class="jour-court" aria-hidden="true">${P.courts[i]}</span></h3>
        <ul class="jour-creneaux">
          ${P.creneaux.filter((x) => x.jour === i).map((x) => html`<li class="creneau creneau--${x.type}" data-type="${x.type}" style="--debut:${pos(x.debut).toFixed(4)};--duree:${(pos(x.fin) - pos(x.debut)).toFixed(4)}"><strong>${x.titre}</strong> <span>${heure(x.debut)} – ${heure(x.fin)}</span> <span class="creneau-avec">${c.t('cours.planning.avec')} ${x.avec}</span></li>`)}
          <li class="creneau-libre">${c.t('cours.planning.location')}</li>
        </ul>
      </div>`)}
    </div>
    <p class="note-a-completer">${c.t('cours.planning.source')} ${c.t('cours.planning.note')}</p>
    <div class="location" id="location">
      <p class="surtitre">${c.t('cours.location.surtitre')}</p>
      <h3>${c.t('cours.location.titre')}</h3>
      <p>${c.t('cours.location.texte')}</p>
      <p>${c.lien('contact', { ancre: 'formulaire', params: 'sujet=autre', classe: 'lien-fleche', texte: c.t('cours.location.action') })}</p>
    </div>
  </div>
</section>

<section class="bloc-page agenda" id="agenda">
  <div class="cadre">
    <div class="tete-section">
      <p class="surtitre">${c.t('cours.agenda.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('cours.agenda.titre')}</h2>
      <p class="note-a-completer" data-anime>${c.t('cours.agenda.texte')}</p>
    </div>
    <ul class="ateliers" data-anime="cascade">${c.donnees.agenda.map((a) => html`<li class="atelier" id="atelier-${a.cle}">
      ${c.media({ nom: a.image, alt: c.s(`cours.agenda.alt-${a.cle}`), classe: 'atelier-affiche', sizes: '(max-width: 760px) 60vw, 22vw' })}
      <div class="atelier-texte">
        <h3>${a.titre}</h3>
        <p>${a.texte}</p>
        <ul class="dates">${a.dates.map((d) => html`<li class="date" data-date="${d.date}" data-statut="${d.date < aujourdhui ? 'termine' : 'avenir'}">
          <span class="date-statut" data-avenir="${c.s('cours.agenda.avenir')}" data-termine="${c.s('cours.agenda.termine')}" data-aujourdhui="${c.s('cours.agenda.aujourdhui')}">${d.date < aujourdhui ? c.t('cours.agenda.termine') : c.t('cours.agenda.avenir')}</span>
          <span class="date-jour">${d.jour}</span> <span class="date-heure">${d.heure}</span>
          ${c.lien('inscription', { params: `activite=weekend`, classe: 'lien-fleche', texte: c.t('cours.agenda.inscrire') })}
        </li>`)}</ul>
      </div>
    </li>`)}</ul>
  </div>
</section>

<section class="bloc-page stage" id="stage">
  <div class="cadre stage-grille">
    <div class="stage-dessin" data-visuel>${croquis('data-fx="trace" data-effet="trace"')}</div>
    <div>
      <p class="surtitre">${c.t('cours.stage.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('cours.stage.titre')}</h2>
      <p data-anime>${c.t('cours.stage.texte')}</p>
      <ul class="stage-infos" data-anime="cascade"><li>${c.t('cours.stage.horaire')}</li><li data-prix>${c.t('cours.stage.prix')}</li><li>${c.t('cours.stage.datesVide')}</li></ul>
      <p data-anime>${c.lien('inscription', { params: 'activite=stage-click', classe: 'bouton', texte: c.t('cours.stage.inscrire'), attrs: 'data-survol="magnetique"' })}</p>
    </div>
  </div>
</section>

<section class="bloc-page tissu" id="tissu">
  <div class="cadre tissu-grille">
    <div>
      <p class="surtitre">${c.t('cours.tissu.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('cours.tissu.titre')}</h2>
      <p data-anime>${c.t('cours.tissu.texte')}</p>
    </div>
    ${c.media({ nom: 'grok/cours-tissus', alt: c.s('cours.tissu.alt'), classe: 'tissu-media', sizes: '(max-width: 760px) 92vw, 40vw', attrs: 'data-fx="parallaxe"' })}
  </div>
</section>

<section class="bloc-page conditions-page" id="conditions">
  <div class="cadre faq-grille">
    <div>
      <p class="surtitre">${c.t('cours.conditions.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('cours.conditions.titre')}</h2>
      ${c.donnees.faq.map((f) => html`<details class="faq-item" data-anime><summary>${f.q}</summary><p>${f.r}</p></details>`)}
    </div>
    ${c.media({ nom: 'grok/cours-conditions', alt: c.s('cours.conditions.alt'), classe: 'faq-media', sizes: '(max-width: 760px) 92vw, 36vw', attrs: 'data-fx="zoom"' })}
  </div>
</section>

<section class="bloc-page yoga" id="yoga">
  <div class="cadre yoga-grille">
    ${c.media({ nom: 'affiche-yoga', alt: c.s('cours.yoga.alt'), classe: 'yoga-media', sizes: '(max-width: 760px) 92vw, 40vw' })}
    <div>
      <p class="surtitre">${c.t('cours.yoga.surtitre')}</p>
      <h2 data-anime="lignes">${c.t('cours.yoga.titre')}</h2>
      <p data-anime>${c.t('cours.yoga.texte')} <a href="tel:+41782145474">078 214 54 74</a></p>
    </div>
  </div>
</section>

<section class="bloc-page fin-page" id="fin">
  <div class="cadre fin-carte" data-visuel>
    <h2 data-anime="lignes">${c.t('cours.fin.titre')}</h2>
    <p data-anime>${c.t('cours.fin.texte')}</p>
    <p data-anime>${c.lien('inscription', { classe: 'bouton', texte: c.t('cours.fin.action'), attrs: 'data-survol="magnetique"' })}</p>
  </div>
</section>
`;
};
