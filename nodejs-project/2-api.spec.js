const fs = require('fs');
const util = require('util');
const childProcess = require('child_process');
const expect = require('expect.js');
const fetch = require('node-fetch');
const { printMessage, countLines } = require('./common/techio');

const CODE_FILE = './2-api.js';

describe('le serveur devrait', () => {

  let server;

  after(() => {
    try {
      server.kill();
    } catch(err) {}
  });

  it(`s'exécuter sans erreur`, () => {
    // load and run student code
    server = childProcess.fork(CODE_FILE);
  });

  it(`accepter une requête HTTP GET à la racine`, async function() {
    this.retries(3);
    await new Promise(resolve => setTimeout(resolve, 1000)); // wait one (more) second
    await fetch('http://localhost:3000/')
  });

  it(`répondre "Bonjour !" quand il reçoit une requête HTTP GET à la racine`, async function() {
    const res = await fetch('http://localhost:3000/')
    expect(await res.text()).to.be('Bonjour !');
  });

  it('être implémenté en moins de 15 lignes de code', async () => {
    const sourceCode = await util.promisify(fs.readFile)(CODE_FILE, 'utf8')
    expect(countLines(sourceCode)).to.be.within(1, 15);
  });

  it('remplir tous les critères demandés', () => {
    printMessage(`👌 Nickel ! Ton code valide tout ce qui était demandé !`);
    printMessage(`Tu peux passer à l'exercice suivant.`);
  });

  // TODO: donner des indices à l'étudiant, en fonction du code qui a été (ou pas) écrit

});
