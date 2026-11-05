/* Parcours propres à Peekaboo : filtres du planning (gardés dans l'adresse), inscription préremplie et étapes,
   statuts de l'agenda calculés à l'heure de Nyon. */
export default async function ({ contexte, attendrePret, attendre, BASE, R, T }) {
  const { ctx, page } = await contexte({ taille: T('390×844') });
  try {
    await page.goto(BASE + '/cours?public=ados', { waitUntil: 'load' });
    await attendrePret(page);
    const r1 = await page.evaluate(() => ({
      visibles: [...document.querySelectorAll('.creneau:not(.est-estompe)')].map((c) => c.dataset.type),
      presse: document.querySelector('[data-filtre][aria-pressed="true"]')?.dataset.filtre,
    }));
    if (r1.presse !== 'ados' || !r1.visibles.length || r1.visibles.some((t) => t !== 'ados')) R.echec('planning', `filtre de l'adresse mal appliqué : ${JSON.stringify(r1)}`, { page: '/cours', taille: '390×844' });
    await page.locator('[data-filtre="yoga"]').click();
    await attendre(300);
    const r2 = await page.evaluate(() => ({ url: location.search, n: document.querySelectorAll('.creneau:not(.est-estompe)').length }));
    if (!/public=yoga/.test(r2.url) || r2.n !== 3) R.echec('planning', `filtre Yoga : ${JSON.stringify(r2)} (3 créneaux attendus)`, { page: '/cours', taille: '390×844' });

    const statuts = await page.evaluate(() => [...document.querySelectorAll('[data-date]')].map((d) => [d.dataset.date, d.dataset.statut]));
    const jour = new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Zurich', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    for (const [d, s] of statuts) {
      const attendu = d < jour ? 'termine' : d === jour ? 'aujourdhui' : 'avenir';
      if (s !== attendu) R.echec('agenda', `${d} : statut ${s} au lieu de ${attendu}`, { page: '/cours' });
    }

    await page.goto(BASE + '/inscription?activite=stage-click', { waitUntil: 'load' });
    await attendrePret(page);
    const coche = await page.evaluate(() => document.querySelector('input[name="activite"]:checked')?.value);
    if (coche !== 'stage-click') R.echec('inscription', `activité préremplie : ${coche} au lieu de stage-click`, { page: '/inscription', taille: '390×844' });
    await page.locator('[data-suivant]').click();
    await attendre(500);
    const etape = await page.evaluate(() => [...document.querySelectorAll('.fpe__etape')].findIndex((e) => !e.hidden && getComputedStyle(e).display !== 'none'));
    if (etape !== 1) R.echec('inscription', `après Continuer, étape ${etape + 1} au lieu de 2`, { page: '/inscription', taille: '390×844' });
    await page.locator('[data-suivant]').click();
    await attendre(300);
    const erreurs = await page.locator('[aria-invalid="true"]').count();
    if (!erreurs) R.echec('inscription', 'étape 2 vide acceptée sans erreur', { page: '/inscription', taille: '390×844' });
  } finally { await ctx.close(); }
}
