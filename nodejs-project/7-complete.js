const fetch = require('node-fetch'); // https://www.npmjs.com/package/node-fetch

const url = 'URL à recupérer depuis process.argv'; // TODO

// TODO: afficher "please provide a URL" dans la sortie d'erreur si aucune URL n'a été fournie

await fetch(url);

// TODO: afficher réponse à la requête dans la sortie standard, ou erreur obtenue dans la sortie d'erreurs
