const fetch = require('node-fetch'); // https://www.npmjs.com/package/node-fetch

await fetch('https://serveur-inexistant.xyz');

// TODO: compléter ce code pour qu'il affiche l'erreur de fetch(), sans appeler .catch()
console.log('afficher l\'erreur retournée par fetch au lieu de cette chaîne de caractères');
