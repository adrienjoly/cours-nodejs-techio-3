# Exercices Cours Node.js – Partie 3

Énoncés: [Partie 3 - Programmation asynchrone et requête à d’autres APIs](https://adrienjoly.com/cours-nodejs/03-fs/)

Ces exercices sont utilisables sur la plateforme tech.io: [Node.js](https://tech.io/users/985373/AdrienJoly)

## Execution des tests automatisés

```sh
$ nvm use 12
$ (cd nodejs-project && npm install)
$ git secret reveal
$ ./test-all.sh
```

## (Dé)chiffrage des solutions

### Introduction

Reconnaissables à leur extension `.secret`, les solutions des exercices sont chiffrées à l'aide de [git secret](https://git-secret.io/). (extension de la commande `git` basée sur l'outil de chiffrage GPG)

Chaque développeur désireux d'accéder et/ou de modifier ces fichiers doit y être autorisé par un autre développeur y ayant déjà acccès, en intégrant sa clé publique GPG au porte-clés du projet (incarné par le fichier `.gitsecret/keys/pubring.kbx`).

<!-- TODO À noter qu'une clé GPG a été générée et intégrée afin de permettre le déchiffrage de ces données lors de l'exécution des tests automatisés en environnement d'Intégration Continue (CI). -->

### Commandes usuelles

```sh
$ git secret reveal # pour déchiffrer les fichiers *.secret
$ git secret changes # pour afficher les modifications apportées aux fichiers privées *en clair*
$ git secret hide -d # pour chiffrer puis effacer les fichiers privés *en clair* qui ont été modifiés
```

### Procédure d'ajout d'une clé GPG

Instructions à suivre par le développeur demandant l'accès aux données privées:

1. installer `git secret` (cf [instructions](https://git-secret.io/installation), ex: `sudo apt-get install git-secret`) et `gpg` (si ce n'est pas encore le cas) sur votre machine
2. créer une clé GPG avec `$ gpg --gen-key` (cf [using GPG](https://git-secret.io/#using-gpg))
3. exporter la clé publique (`$ gpg --export --armor your.email@address.com > my-public-key.gpg`) puis l'envoyer à une personne ayant déjà accès aux fichiers chiffrés, pour qu'elle puisse vous y donner droit également (cf procédure fournie ci-dessous)
4. une fois que le fichier `.gitsecret/keys/pubring.kbx` a bien été mis à jour par cette personne, récupérer la dernière version des fichiers (`$ git pull`)
5. exécuter `$ git secret reveal` => les fichiers listés dans `.gitsecret/paths/mapping.cfg` seront déchiffrés
6. pour vérifier que le chiffrage fonctionne également: `$ git secret hide` va modifier les fichiers avec l'extension `.secret`. (vous n'avez pas besoin de créer un commit si vous n'avez pas modifié les fichiers de données après l'étape précédente)

### Notes pour les développeurs autorisés à accéder aux données chiffrées

- Procédure pour donner accès à une personne supplémentaire: [adding someone to a repository](https://git-secret.io/#usage-adding-someone-to-a-repository-using-git-secret)
- Après l'intégration d'une nouvelle clé GPG, penser à rechiffrer les fichiers puis à les pousser sur le dépôt, avec le fichier `.gitsecret/keys/pubring.kbx` à jour.
- Sachant que la version déchiffrée des fichiers privées est ignorée par `git`, il ne faut pas oublier de les chiffrer à nouveau après chaque modification, puis de créer un commit incluant les modifications des fichiers `*.secret`. En réponse à cela, la documentation de `git secret` suggère la mise en place d'un "pre-commit hook" dans `git`.
