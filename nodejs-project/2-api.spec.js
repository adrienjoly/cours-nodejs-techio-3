const childProcess = require('child_process');
const expect = require('expect.js');
const fetch = require('node-fetch');
const { printMessage } = require('./common/techio');


describe('le serveur devrait', () => {

  let server;

  after(() => {
    try {
      server.kill();
    } catch(err) {}
  });

  it(`s'exécuter sans erreur`, () => {
    // load and run student code
    // require('./server.js');
    server = childProcess.fork('./2-api.js');
  });

  it(`accepter une requête HTTP GET à la racine`, async function() {
    this.retries(3);
    await new Promise(resolve => setTimeout(resolve, 1000)); // wait one (more) second
    await fetch('http://localhost:3000/')
  })

  it(`répond "Bonjour !" quand il reçoit une requête HTTP GET à la racine`, async function() {
    const res = await fetch('http://localhost:3000/')
    expect(await res.text()).to.be('Bonjour !');
    printMessage(`👌 Nickel ! Ton code valide tout ce qui était demandé !`);
    printMessage(`Tu peux passer à l'exercice suivant.`);
  })

  // TODO: donner des indices à l'étudiant, en fonction du code qui a été (ou pas) écrit

});

