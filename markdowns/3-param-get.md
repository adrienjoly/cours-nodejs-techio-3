Cours: [adrienjoly.com/cours-nodejs](https://adrienjoly.com/cours-nodejs/)

<!-- Code source: [GitHub](https://github.com/adrienjoly/playground-r8m63hre). -->

Ajouter un point d'entrée `GET /hello` qui acceptera un paramètre `nom`, et ajustera le contenu de la réponse en fonction de la valeur de ce paramètre:

- toute requête à `GET /hello?nom=Sasha` doit obtenir la réponse `Bonjour, Sasha !`
- toute requête à `GET /hello?nom=Michel` doit obtenir la réponse `Bonjour, Michel !`
- toute requête à `GET /hello` doit obtenir la réponse `Quel est votre nom ?`

Modifiez le code ci-dessous puis cliquez sur "Run" pour le tester:

@[server.js]({
  "stubs": ["3-param-get.js"],
  "command": "node_modules/mocha/bin/mocha 3-param-get.spec.js"
})

Une fois que les tests passent, réaliser l'exercice suivant.
