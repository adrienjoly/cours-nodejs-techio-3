const fetch = require('node-fetch'); // https://www.npmjs.com/package/node-fetch

const res = await fetch('https://jsonplaceholder.typicode.com/photos/1');

// TODO: compléter ce code pour qu'il affiche la réponse en utilisant await au lieu de then()
console.log('afficher la réponse à la requête au lieu de cette chaîne de caractères');
