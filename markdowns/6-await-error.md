Cours: [adrienjoly.com/cours-nodejs](https://adrienjoly.com/cours-nodejs/) (à consulter pour voir l'énoncé en entier)

<!-- Code source: [GitHub](https://github.com/adrienjoly/cours-nodejs-techio-2). -->

Sur la base de votre solution précédente, écrivez un programme Node.js qui:
- envoie une requête HTTP GET à un serveur qui n'existe pas;
- affiche dans la sortie standard l'erreur retournée par `await fetch()` suite à l'échec de cette requête.

Modifiez le code ci-dessous puis cliquez sur "Run" pour le tester:

@[await-error.js]({
  "stubs": ["6-await-error.js"],
  "command": "node_modules/mocha/bin/mocha 6-await-error.spec.js"
})

Une fois que les tests passent, réalisez l'exercice suivant.
