Cours: [adrienjoly.com/cours-nodejs](https://adrienjoly.com/cours-nodejs/) (à consulter pour voir l'énoncé en entier)

<!-- Code source: [GitHub](https://github.com/adrienjoly/cours-nodejs-techio-2). -->

Écrivez un programme Node.js qui:
- récupère les coordonnées géographiques de la ville de Paris au format JSON, en interrogeant l'API [geocode.xyz](https://geocode.xyz/api) à l'aide de la fonction [`http.get()`](https://nodejs.org/api/http.html#http_http_get_options_callback) (fournie par Node.js);
- affiche la réponse donnée par l'API à cette requête, dans la sortie standard, telle quelle.

Modifiez le code ci-dessous puis cliquez sur "Run" pour le tester:

@[https-get.js]({
  "stubs": ["1-api-req.js"],
  "command": "node_modules/mocha/bin/mocha 1-api-req.spec.js"
})

Une fois que les tests passent, réalisez l'exercice suivant.
