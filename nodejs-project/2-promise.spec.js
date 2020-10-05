const childProcess = require("child_process");
const expect = require("expect.js");
const { printMessage } = require("./common/techio");

const EXPECTED_PARIS = require("./common/paris.snapshot.js")

const CODE_FILE = process.env.CODE_FILE || "./2-promise.js";

const logged = [];
let consoleLogAppelé = false;

describe("le programme devrait", () => {
  it(`s'exécuter sans erreur et se terminer en 5 secondes`, () =>
    new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject("timeout"), 5000);
      // load and run student code
      const process = childProcess.fork(CODE_FILE, {
        stdio: [0, "pipe", 2, "ipc"],
      });
      process.stdout.on("data", (data) => {
        consoleLogAppelé = true;
        data
          .toString()
          .split(/[\r\n]+/g)
          .forEach((str) => logged.push(str));
        console.log(`    ℹ️ sortie standard du programme: ${data}`);
      });
      process.on("close", (code) => {
        clearTimeout(timeout);
        if (code === 0) {
          resolve();
        } else {
          reject(`child process exited with code ${code}`);
        }
      });
    }));

  it("écrire dans la console", () => {
    expect(consoleLogAppelé).to.be(true);
  });

  it("n'inclure que du JSON pur dans la sortie standard", () => {
    expect(logged.join("").trim()).to.match(/^\{/);
  });

  it("afficher la réponse au format JSON, telle quelle", () => {
    JSON.parse(logged.join("").trim());
  });

  it("afficher la réponse de l'API", () => {
    const json = JSON.parse(logged.join("").trim());
    expect(json).to.eql(EXPECTED_PARIS);
    printMessage(`👌 Nickel ! Ton code valide tout ce qui était demandé !`);
    printMessage(`Tu peux passer à l'exercice suivant.`);
  });
});
