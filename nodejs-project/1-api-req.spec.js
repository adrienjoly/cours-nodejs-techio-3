const childProcess = require('child_process');
//const assert = require('assert');
const expect = require('expect.js');
const { printMessage } = require('./common/techio');

const logged = [];
let consoleLogAppelé = false;

const CODE_FILE = './1-api-req.js';

describe('le programme devrait', () => {

  it(`s'exécuter sans erreur`, () => new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject('timeout'), 1000);
    // load and run student code
    process = childProcess.fork(CODE_FILE, {
      stdio: [0, 'pipe', 2, 'ipc']
    });
    process.stdout.on('data', (data) => {
      consoleLogAppelé = true;
      data.toString().split(/[\r\n]+/g).forEach(str => logged.push(str));
      console.log(`stdout: ${data}`);
    });
    process.on('close', (code) => {
      clearTimeout(timeout);
      console.log(`child process exited with code ${code}`);
      if (code === 0) {
        resolve();
      } else {
        reject(`child process exited with code ${code}`)
      }
    });
  }));

  it('écrire dans la console', () => {
    //assert(consoleLogAppelé);
    expect(consoleLogAppelé).to.be(true);
  })

  it('afficher le mot "France"', () => {
    //assert(/hello/i.test(logged.join()));
    expect(logged.join(' ').trim()).to.match(/France/i);
    printMessage(`👌 Nickel ! Ton code valide tout ce qui était demandé !`);
    printMessage(`Tu peux passer à l'exercice suivant.`);
  })
});
