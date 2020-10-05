const expect = require("expect.js");
const { printMessage, getStubFile, getStudentCode, runStudentCode } = require("./common/techio");

const EXPECTED_RESPONSE = require("./common/expected-response.js")

const CODE_FILE = process.env.CODE_FILE || getStubFile(__filename);

let program;

describe("le programme devrait", () => {
  it(`s'exécuter sans erreur et se terminer en 5 secondes`, async () => {
    program = await runStudentCode(CODE_FILE);
  });

  it("écrire dans la console", () => {
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
    expect(json).to.eql(EXPECTED_RESPONSE);
  });

  it("utiliser await au lieu de then() pour récupérer le résultat de fetch()", async () => {
    const code = await getStudentCode(CODE_FILE);
    expect(code).to.match(/await fetch\(/);
    expect(code).to.not.match(/\.then\(/);
    printMessage(`👌 Nickel ! Ton code valide tout ce qui était demandé !`);
    printMessage(`Tu peux passer à l'exercice suivant.`);
  });
});
