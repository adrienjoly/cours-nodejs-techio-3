# Premiers pas avec Node.js et Express

## Objectifs

- Écrire et tester un programme JavaScript minimal avec Node.js
- Développer un serveur Web capable de répondre à une simple requête HTTP GET
- Exécuter et tester ce serveur en local

<!-- Exerciseur: [Tech.io](https://tech.io/playgrounds/55085/decouverte-de-node-js). -->
<!-- Code source: [GitHub](https://github.com/adrienjoly/playground-r8m63hre). -->

## Exercice: Hello World

Écrire un programme JavaScript qui affiche "Hello World" dans la sortie standard. (1 ligne de code)

Modifiez le code ci-dessous puis cliquez sur "Run" pour le tester:

@[Hello World]({
  "stubs": ["hello-world.js"],
  "command": "node_modules/mocha/bin/mocha hello-world.spec.js"
})

Une fois que les tests passent, réaliser l'exercice suivant.

## Exercice: Serveur amnésique

Écrire un serveur Web qui répond "Bonjour !" quand on lui envoie une requête HTTP GET à sa racine (chemin: `/`).

Modifiez le code ci-dessous puis cliquez sur "Run" pour le tester:

@[Hello World]({
  "stubs": ["server.js"],
  "command": "node_modules/mocha/bin/mocha server.spec.js"
})

Une fois que les tests passent, réaliser l'exercice suivant.
