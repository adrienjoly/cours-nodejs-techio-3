const childProcess = require("child_process");
//const assert = require('assert');
const expect = require("expect.js");
const { printMessage } = require("./common/techio");

const logged = [];
let consoleLogAppelé = false;

const CODE_FILE = process.env.CODE_FILE || "./1-api-req.js";

describe("le programme devrait", () => {
  it(`s'exécuter sans erreur et se terminer en 5 secondes`, () =>
    new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject("timeout"), 5000);
      // load and run student code
      const process = childProcess.fork(CODE_FILE, {
        // warning: causes "TypeError: Cannot read property 'SHOW_ABSOLUTE_PATHS' of undefined" when using mocha-clean
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
    //assert(consoleLogAppelé);
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
    //assert(/hello/i.test(logged.join()));
    expect(json).to.eql({
      standard: {
        addresst: {},
        city: "Paris",
        prov: "FR",
        countryname: "France",
        postal: {},
        confidence: "0.3",
      },
      longt: "2.34280",
      alt: {
        loc: {
          longt: "2.34506",
          prov: "FR",
          city: "Paris",
          countryname: "France",
          postal: "75018",
          region: {},
          latt: "48.89090",
        },
      },
      elevation: {},
      latt: "48.85756",
    });
    printMessage(`👌 Nickel ! Ton code valide tout ce qui était demandé !`);
    printMessage(`Tu peux passer à l'exercice suivant.`);
  });
});
