/* Adaptateur : les modules de la bibliothèque (fil-conducteur, formulaire-par-etapes) demandent pret([...]).
   Ici, ils reçoivent le GSAP, le ScrollTrigger, le mode calme et le rafraîchissement regroupé du socle du projet :
   rien n'est chargé deux fois, aucun défilement adouci propre au module. */
import { etat } from '../socle/etat.js?v=2';
import { rafraichir } from '../socle/mesures.js?v=2';

const html = document.documentElement;
const socle = {
  get gsap() { return window.gsap || null; },
  get ScrollTrigger() { return window.ScrollTrigger || null; },
  get SplitText() { return window.SplitText || null; },
  get Flip() { return window.Flip || null; },
  lenis: null,
  get calme() { return !!etat.calme || html.classList.contains('calme'); },
  get souris() { return matchMedia('(hover: hover) and (pointer: fine)').matches; },
  get telephone() { return innerWidth < 700; },
  webgl() { return false; },
  rafraichir,
  mesurer: rafraichir,
};

export async function pret() {
  if (document.readyState === 'loading') await new Promise((r) => document.addEventListener('DOMContentLoaded', r, { once: true }));
  return socle;
}
