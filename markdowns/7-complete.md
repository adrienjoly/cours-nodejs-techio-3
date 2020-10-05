Cours: [adrienjoly.com/cours-nodejs](https://adrienjoly.com/cours-nodejs/) (à consulter pour voir l'énoncé en entier)

<!-- Code source: [GitHub](https://github.com/adrienjoly/cours-nodejs-techio-2). -->

Sur la base de votre solution précédente, écrivez un programme Node.js qui:
- récupérera sous forme d'argument l'URL à laquelle envoyer une requête;
- si aucun argument n'est trouvé, affichera "please provide a URL" dans la sortie d'erreurs;
- sinon, il enverra la requête à l'aide de [`node-fetch`](https://www.npmjs.com/package/node-fetch) et `await`;
- en cas de succès, il affichera la réponse dans la sortie standard;
- en cas d'échec, il affichera l'erreur obtenue dans la sortie d'erreurs.

Modifiez le code ci-dessous puis cliquez sur "Run" pour le tester:

@[get.js]({
  "stubs": ["7-complete.js"],
  "command": "node_modules/mocha/bin/mocha 7-complete.spec.js"
})

Une fois que les tests passent, réalisez l'exercice suivant.
