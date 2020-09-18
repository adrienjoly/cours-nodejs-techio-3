const express = require('express');

const PORT = 3000;

// TODO: initialiser le serveur applicatif "express"

const app = express();

// TODO: définir le point d'entrée `GET /` qui répond "Bonjour !" à chaque requête reçue

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// TODO: demander au serveur applicatif d'attendre des requêtes depuis le port spécifié plus haut

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
