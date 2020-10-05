const https = require('https');

https.get('https://serveur-inexistant.xyz', (res) => {
  // TODO: récupérer le code d'erreur de l'API puis l'afficher
  console.log('afficher l\'erreur à la place de cette chaîne de caractères');
});
