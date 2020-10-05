//const assert = require('assert');
const expect = require("expect.js");
const { printMessage, runStudentCode } = require("./common/techio");

const EXPECTED_PARIS = require("./common/paris.snapshot.js")

const CODE_FILE = process.env.CODE_FILE; // "1-api-req.js"

let program;

describe("le programme devrait", () => {
  it(`s'exécuter sans erreur et se terminer en 5 secondes`, async () => {
    program = await runStudentCode(CODE_FILE);
  });

  it("écrire dans la console", () => {
    console.log(process.env);
    expect(program.getLogs().length > 0).to.be(true);
  });

  it("n'inclure que du JSON pur dans la sortie standard", () => {
    expect(program.getLogs().join("").trim()).to.match(/^\{/);
  });

  it("afficher la réponse au format JSON, telle quelle", () => {
    JSON.parse(program.getLogs().join("").trim());
  });

  it("afficher la réponse de l'API", () => {
    const json = JSON.parse(program.getLogs().join("").trim());
    //assert(/hello/i.test(logged.join()));
    expect(json).to.eql(EXPECTED_PARIS);
    printMessage(`👌 Nickel ! Ton code valide tout ce qui était demandé !`);
    printMessage(`Tu peux passer à l'exercice suivant.`);
  });
});
