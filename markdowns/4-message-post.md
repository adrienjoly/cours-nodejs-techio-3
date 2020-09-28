Cours: [adrienjoly.com/cours-nodejs](https://adrienjoly.com/cours-nodejs/)

<!-- Code source: [GitHub](https://github.com/adrienjoly/playground-r8m63hre). -->

Nous avons à présent un serveur web dont l'API contient deux points d'entrée (*endpoints*):
- `GET /` retourne systématiquement "Bonjour !".
- `GET /hello` retourne une salutation au `nom` fourni en paramètre GET.

Maintenant, on souhaite que l'API réponde un message pertinent à chaque message envoyé par les utilisateurs. Sachant qu'un message peut être trop long pour passer par un paramètre GET, nous allons le passer via le corps d'une requête HTTP POST.

Pour cela, nous allons y ajouter un point d'entrée (*endpoint*) de méthode POST au chemin `/chat`. Celui-ci pourra adapter sa réponse en fonction du contenu passé avec chaque requête. Le contenu devra être passé au format JSON, et le message de l'utilisateur devra être transmis comme valeur de la propriété `msg`.

Exemples / cas d'usage:
- toute requête `POST http://localhost:3000/chat` avec le contenu `{"msg":"ville"}` doit obtenir la réponse "Nous sommes à Paris"
- toute requête `POST http://localhost:3000/chat` avec le contenu `{"msg":"météo"}` doit obtenir la réponse "Il fait beau"

Modifiez le code ci-dessous puis cliquez sur "Run" pour le tester:

@[server.js]({
  "stubs": ["4-message-post.js"],
  "command": "node_modules/mocha/bin/mocha 4-message-post.spec.js"
})

<!-- exigence: doit avoir `express` comme seule dépendance externe -->

<!-- indice: utiliser un middleware pour extraire les données au format JSON -->
