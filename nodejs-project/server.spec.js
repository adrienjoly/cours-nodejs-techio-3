const expect = require('expect.js');
const fetch = require('node-fetch');
const { printMessage } = require('./common/techio');


describe('le serveur devrait', () => {

  it(`s'exécuter sans erreur`, () => {
    require('./server.js'); // load and run student code
  });

  it(`accepter une requête HTTP GET à la racine`, async function() {
    this.retries(3);
    await fetch('http://localhost:3000/')
  })

});

