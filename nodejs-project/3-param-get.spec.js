const fs = require('fs');
const util = require('util');
const childProcess = require('child_process');
const expect = require('expect.js');
const fetch = require('node-fetch');
const { printMessage, countLines } = require('./common/techio');

const CODE_FILE = './3-param-get.js';

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

  const cases = [
    { path: `/hello?nom=Sasha`, expected: `Bonjour, Sasha !` },
    { path: `/hello?nom=Michel`, expected: `Bonjour, Michel !` },
    { path: `/hello`, expected: `Quel est votre nom ?` },
    { path: `/hello?nom=Coco`, expected: `Bonjour, Coco !` }
  ];
  
  cases.forEach(({ path, expected }) => 
    it(`répondre "${expected}" quand il reçoit une requête HTTP GET ${path}`, async function() {
      const res = await fetch(`http://localhost:3000${path}`)
      expect(await res.text()).to.be(expected);
    })
  );

  it('être implémenté en moins de 30 lignes de code', async () => {
    const sourceCode = await util.promisify(fs.readFile)(CODE_FILE, 'utf8')
    expect(countLines(sourceCode)).to.be.within(1, 30);
  });

  it('remplir tous les critères demandés', () => {
    printMessage(`👌 Nickel ! Ton code valide tout ce qui était demandé !`);
    printMessage(`Tu peux passer à l'exercice suivant.`);
  });
  
});
