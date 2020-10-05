const fetch = require('node-fetch'); // https://www.npmjs.com/package/node-fetch

// TODO: compléter l'appel à fetch() pour afficher l'erreur obtenue
fetch('https://serveur-inexistant.xyz');

console.log('afficher l\'erreur au lieu de cette chaîne de caractères');
