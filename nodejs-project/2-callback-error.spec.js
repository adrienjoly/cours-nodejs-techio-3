const childProcess = require("child_process");
const expect = require("expect.js");
const { printMessage, runStudentCode } = require("./common/techio");

const EXPECTED_PARIS = require("./common/paris.snapshot.js")

const CODE_FILE = process.env.CODE_FILE || "./1-api-req.js";

let program;

describe("le programme devrait", () => {
  it(`s'exécuter sans erreur et se terminer en 5 secondes`, async () => {
    program = await runStudentCode(CODE_FILE);
  });

  it("écrire dans la console", () => {
    expect(program.getLogs().length > 0).to.be(true);
  });

  it("n'inclure que l'erreur telle quelle dans la sortie standard", () => {
    expect(program.getLogs().join("").trim()).to.match(/^Error: /);
  });

  it("permettre de savoir que le serveur interrogé n'existe pas", () => {
    expect(program.getLogs().join("")).to.match(/ENOTFOUND/);
    printMessage(`👌 Nickel ! Ton code valide tout ce qui était demandé !`);
    printMessage(`Tu peux passer à l'exercice suivant.`);
  });
});
