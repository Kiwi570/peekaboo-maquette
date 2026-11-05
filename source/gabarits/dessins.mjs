/* Dessins SVG communs (patron, ciseaux, croquis, boutons, plan) : décor dessiné en code, réutilisé par les pages. */
import { html, brut } from '../../outils/gabarit.mjs';

/* Pièce de patron d'une robe trapèze, dans un repère 400 × 520. */
export const PATRON_D = 'M100 30 L150 18 Q200 70 250 18 L300 30 Q296 118 332 150 L384 496 Q200 528 16 496 L68 150 Q104 118 100 30 Z';
export const PATRON = brut(PATRON_D);

export const CISEAUX_LAMES = `
  <g class="lame lame-a"><path d="M-4 -2.2 L58 -5 Q62 -3.6 58 -1.6 L-4 2 Z"/><path class="branche" d="M-4 -1 L-14 -9"/><ellipse class="anneau" cx="-22" cy="-13" rx="10" ry="7" transform="rotate(-24 -22 -13)"/></g>
  <g class="lame lame-b"><path d="M-4 2.2 L58 5 Q62 3.6 58 1.6 L-4 -2 Z"/><path class="branche" d="M-4 1 L-14 9"/><ellipse class="anneau" cx="-22" cy="13" rx="10" ry="7" transform="rotate(24 -22 13)"/></g>
  <circle class="pivot" r="2.6"/>
`;
export const ciseaux = () => brut(`<g class="ciseaux" transform="translate(352 478) rotate(-24)" aria-hidden="true">${CISEAUX_LAMES}</g>`);

/* Croquis de mode au trait : une robe sur cintre, sans personnage ni visage. */
export const croquis = (attrs = '') => brut(`<svg class="croquis" viewBox="0 0 300 400" aria-hidden="true" ${attrs}>
  <g fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M150 22 q-8 0 -8 8 q0 7 8 9"/>
    <path d="M150 39 L84 74 L216 74 Z"/>
    <path d="M110 74 Q118 96 112 120 Q150 132 188 120 Q182 96 190 74"/>
    <path d="M112 120 Q122 150 118 178 Q150 188 182 178 Q178 150 188 120"/>
    <path d="M118 178 Q96 270 58 368 Q150 392 242 368 Q204 270 182 178"/>
    <path d="M136 186 Q128 280 112 378"/><path d="M164 186 Q172 280 188 378"/><path d="M150 188 L150 384"/>
    <path d="M96 300 q24 6 48 0 q24 -6 60 2" stroke-dasharray="4 6"/>
  </g>
</svg>`);

/* Bouton cousu à quatre trous. */
export const bouton = (cls = '') => brut(`<svg class="bouton-cousu ${cls}" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17"/><circle class="bord" cx="20" cy="20" r="13"/><circle class="trou" cx="15" cy="15" r="2.4"/><circle class="trou" cx="25" cy="15" r="2.4"/><circle class="trou" cx="15" cy="25" r="2.4"/><circle class="trou" cx="25" cy="25" r="2.4"/><path class="fil-x" d="M15 15 L15 25 M25 15 L25 25"/></svg>`);

/* Aiguille (objet au bout du fil conducteur), pointe vers la droite, centrée sur 0 0. */
export const aiguille = () => brut(`<template data-fil-objet><g class="aiguille-fil"><path d="M-26 -1.6 L18 -1.2 L26 0 L18 1.2 L-26 1.6 Q-30 0 -26 -1.6 Z" fill="#8d8f94"/><ellipse cx="-21" cy="0" rx="3.2" ry=".8" fill="#f4ecdd"/></g></template>`);

/* Plan schématique d'accès : seuls l'atelier et la bibliothèque des jeunes, voisins, sont représentés. */
export const plan = (c) => html`<svg class="plan" viewBox="0 0 520 380" role="img" aria-label="${c.s('accueil.pratique.carte')}" data-visuel data-fx="trace">
  <defs><pattern id="plan-grille" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M26 0H0V26" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="1"/></pattern></defs>
  <rect width="520" height="380" fill="url(#plan-grille)"/>
  <path class="plan-chemin" d="M-10 300 C 120 280, 200 250, 290 196 S 470 110, 540 96" fill="none" stroke="currentColor" stroke-opacity=".28" stroke-width="22" stroke-linecap="round"/>
  <g><path data-fx-trait d="M-10 300 C 120 280, 200 250, 290 196 S 470 110, 540 96" fill="none" stroke="var(--fil)" stroke-width="2.5" stroke-dasharray="8 7"/></g>
  <g class="plan-bati">
    <rect x="282" y="204" width="200" height="94" rx="6"/>
    <rect class="plan-atelier" x="140" y="112" width="184" height="78" rx="6"/>
  </g>
  <text x="382" y="246" text-anchor="middle" class="plan-texte">${c.t('commun.planBiblio1')}</text>
  <text x="382" y="274" text-anchor="middle" class="plan-texte">${c.t('commun.planBiblio2')}</text>
  <text x="232" y="160" text-anchor="middle" class="plan-texte plan-texte--fort">${c.site.nom}</text>
  <text x="24" y="338" class="plan-texte plan-texte--petit" transform="rotate(-6 24 338)">${c.t('commun.planRue')}</text>
  <g class="plan-epingle" transform="translate(231 104)"><path d="M0 0 C -14 -16 -14 -34 0 -38 C 14 -34 14 -16 0 0 Z"/><circle cy="-24" r="6" fill="#f4ecdd"/></g>
</svg>`;
