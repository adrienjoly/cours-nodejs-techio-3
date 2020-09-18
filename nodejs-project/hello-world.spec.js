const assert = require('assert');

const logged = [];
const actualConsoleLog = console.log;
console.log = function (param) {
  logged.push(param);
  return actualConsoleLog.apply(this, arguments);
};

it.serial(`le programme s'exécute sans erreur`, () => {
  require('./hello-world.js');
});

it.serial('le programme affiche le mot "hello"', () => {
  assert(/hello/i, logged.join());
})

it.serial('le programme affiche le mot "world"', () => {
  assert(/world/i, logged.join());
})

it.serial('le programme respecte à la lettre le message demandé', () => {
  assert.strictEqual(["Hello World"], logged);
  printMessage(`👌 Nickel ! Ton code valide tout ce qui était demandé !`);
  printMessage(`Tu peux passer à l'exercice suivant.`);
})

function printMessage(channel, message) {
  console.log('\nTECHIO> message --channel "' + channel + '" "' + message + '"');
}
