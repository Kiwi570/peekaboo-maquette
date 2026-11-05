# Peekaboo — maquette v2

Maquette du futur site des ateliers Peekaboo (Nyon) : direction « Le patron ».
Adresse prévue : https://peekaboo-maquette.vercel.app (noindex, pour ne pas concurrencer peekaboo-nyon.com).

## Pages

| Page | Ouverture | Effets propres |
|---|---|---|
| Accueil `/` | pan de lin rouge « coucou ! » qui se soulève, patron tracé puis découpé aux ciseaux sur la photo | coucou, patron-ciseaux, tissu-vivant (WebGL), fil-rouge (module fil-conducteur, titres noués), etiquettes-cousues, craie, croquis-vetement (étapes cousues, section épinglée), tringle |
| Cours & stages `/cours` | scindée sur kraft, mètre ruban qui porte les trois tarifs | metre-ruban, fiche-retournee, planning filtrable (adresse `?public=ados`), agenda à statuts automatiques |
| Melody `/melody` | centrée sur papier, polaroïd épinglé, croquis tracé autour | polaroid, carte du voyage (module carte-itineraire-collante), tringle |
| Inscription `/inscription` | compacte sur bleu craie quadrillé, tampon Peekaboo | tampon, prenom-brode, formulaire en 4 étapes (module formulaire-par-etapes), prérempli par `?activite=` |
| Contact `/contact` | numéro brodé en point de croix, contour piqué | point-de-croix, numero-cousu, formulaire prérempli par `?sujet=` |
| 404 | « Un point a sauté » | — |

Entre les pages : fermeture-eclair (le voile du socle habillé de deux pans et d'une tirette, `assets/js/v2.js`).

## Fabriquer

```
node outils/generer.mjs                     pages HTML depuis donnees/ et source/
node <bibliotheque>/images/produire.mjs plan-images.json
node <bibliotheque>/images/partage.mjs      images de partage 1200×630
node _audit/audit.mjs                       audit standard
```
Ne jamais modifier les pages `.html` à la main : elles sont réécrites par `generer.mjs`.

## À fournir par Peekaboo (à compléter)

- **Mentions légales** : raison sociale ou nom, adresse, numéro IDE (ou équivalent), responsable de la publication.
- **Politique de confidentialité** (nLPD suisse) : données recueillies par les formulaires, finalité, durée de conservation, droits.
- **Hébergeur** : Vercel Inc., adresse à vérifier sur vercel.com au moment de la mise en ligne.
- **Assurances et qualifications** à afficher, s'il y en a ; détail des « divers prix de mode » de Melody.
- **Photos réelles** : Melody (portrait), l'atelier, des réalisations d'élèves (avec l'accord des parents pour les enfants), d'autres pièces MADEBYMELODY.
- **Planning** : âges de chaque cours, horaires du yoga (le planning et le flyer de Heidi ne donnent pas les mêmes), tarifs du yoga et des ateliers du weekend.
- **Stages et ateliers** : dates des prochains stages « click! », année des ateliers bois et de Noël, jour exact du 28 novembre (l'affiche dit dimanche).
- **Location de l'atelier** : conditions et tarifs.
- **Accès** : transports publics, stationnement, horaires d'ouverture.
- **Adresse** : le numéro 3 vient de madebymelody.ch, il est absent de peekaboo-nyon.com : à confirmer.
- **Prix MADEBYMELODY** : relevés sur madebymelody.ch le 5 novembre 2026, à vérifier.
- **Crédits des illustrations générées** : toutes les images marquées « Illustration générée » ont été créées par IA (Grok).

## Incohérences relevées sur le site actuel

Téléphone écrit « +41 076… » (le 0 ne s'écrit pas après +41) · menus Contact et Couture/Stylisme qui renvoient à l'accueil · tarifs sans devise · planning seulement en image · Instagram de Heidi au nom « nadiahypnose » · images de banque d'images et une image générée pour MADEBYMELODY · pas de mentions légales.

## À la mise en ligne définitive

- Retirer : `noindex` (balise robots dans `source/gabarits/commun.mjs`, en-tête X-Robots-Tag dans `vercel.json`), formulaires simulés (brancher un vrai envoi), mentions « à compléter », plan schématique (remplacer par une vraie carte).
- Garder : la mention « Illustration générée » sur chaque image créée par IA.
