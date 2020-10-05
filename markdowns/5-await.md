Cours: [adrienjoly.com/cours-nodejs](https://adrienjoly.com/cours-nodejs/02-async) (à consulter pour voir l'énoncé en entier)

<!-- Code source: [GitHub](https://github.com/adrienjoly/cours-nodejs-techio-2). -->

Écrivez un programme Node.js qui:
- récupère les métadonnées au format JSON à propos de la première photo listée sur [jsonplaceholder](https://jsonplaceholder.typicode.com/), en interrogeant [leur API](https://jsonplaceholder.typicode.com/api) à l'aide de la bibliothèque npm [`node-fetch`](https://www.npmjs.com/package/node-fetch) et en utilisant le mot clé `await` au lieu de la fonction `.then()`;
- affiche la réponse donnée par l'API à cette requête, dans la sortie standard, telle quelle.

Modifiez le code ci-dessous puis cliquez sur "Run" pour le tester:

@[await.js]({
  "stubs": ["5-await.js"],
  "command": "node_modules/mocha/bin/mocha 5-await.spec.js"
})

Une fois que les tests passent, réalisez l'exercice suivant.
