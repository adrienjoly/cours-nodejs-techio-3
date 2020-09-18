const assert = require('assert');
const expect = require('expect.js');

const logged = [];
const actualConsoleLog = console.log;
console.log = function (param) {
  logged.push(param);
  return actualConsoleLog.apply(this, arguments);
};

it(`le programme s'exécute sans erreur`, () => {
  require('./hello-world.js');
});

it('le programme affiche le mot "hello"', () => {
  //assert(/hello/i.test(logged.join()));
  expect(logged.join()).to.match(/hello/i);
})

it('le programme affiche le mot "world"', () => {
  assert(/world/i.test(logged.join()));
})

it('le programme respecte à la lettre le message demandé', () => {
  assert.strictEqual(["Hello World"], logged);
  printMessage(`👌 Nickel ! Ton code valide tout ce qui était demandé !`);
  printMessage(`Tu peux passer à l'exercice suivant.`);
})

function printMessage(channel, message) {
  console.log('\nTECHIO> message --channel "' + channel + '" "' + message + '"');
}
