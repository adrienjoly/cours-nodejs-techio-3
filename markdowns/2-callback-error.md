Cours: [adrienjoly.com/cours-nodejs](https://adrienjoly.com/cours-nodejs/02-async) (à consulter pour voir l'énoncé en entier)

<!-- Code source: [GitHub](https://github.com/adrienjoly/cours-nodejs-techio-2). -->

Sur la base de votre solution précédente, écrivez un programme Node.js qui:
- envoie une requête HTTP GET à un serveur qui n'existe pas;
- affiche dans la sortie standard l'erreur retournée par `https.get()` suite à l'échec de cette requête.

Modifiez le code ci-dessous puis cliquez sur "Run" pour le tester:

@[callback-error.js]({
  "stubs": ["2-callback-error.js"],
  "command": "node_modules/mocha/bin/mocha 2-callback-error.spec.js"
})

Une fois que les tests passent, réalisez l'exercice suivant.
