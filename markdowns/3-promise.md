Cours: [adrienjoly.com/cours-nodejs](https://adrienjoly.com/cours-nodejs/) (à consulter pour voir l'énoncé en entier)

<!-- Code source: [GitHub](https://github.com/adrienjoly/cours-nodejs-techio-2). -->

Écrivez un programme Node.js qui:
- récupère les coordonnées géographiques de la ville de Paris au format JSON, en interrogeant l'API [geocode.xyz](https://geocode.xyz/api) à l'aide de la bibliothèque npm [`node-fetch`](https://www.npmjs.com/package/node-fetch);
- affiche la réponse donnée par l'API à cette requête, dans la sortie standard, telle quelle.

Modifiez le code ci-dessous puis cliquez sur "Run" pour le tester:

@[fetch-promise.js]({
  "stubs": ["3-promise.js"],
  "command": "node_modules/mocha/bin/mocha 3-promise.spec.js"
})

Une fois que les tests passent, réalisez l'exercice suivant.
