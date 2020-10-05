const expect = require("expect.js");
const { printMessage, getStubFile, getStudentCode, runStudentCode } = require("./common/techio");

const CODE_FILE = process.env.CODE_FILE || getStubFile(__filename);

let program;

describe("le programme devrait", () => {
  it(`s'exécuter sans erreur et se terminer en 5 secondes`, async () => {
    program = await runStudentCode(CODE_FILE);
  });

  it("écrire dans la console", () => {
    expect(program.getLogs().length > 0).to.be(true);
  });

  it("n'inclure que l'erreur telle quelle dans la sortie standard", () => {
    expect(program.getLogs().join("").trim()).to.match(/^FetchError: /);
  });

  it("permettre de savoir que le serveur interrogé n'existe pas", () => {
    expect(program.getLogs().join("")).to.match(/ENOTFOUND/);
  });

  it("utiliser await au lieu de then() et/ou catch() pour récupérer l'erreur de fetch()", async () => {
    const code = await getStudentCode(CODE_FILE);
    expect(code).to.match(/await fetch\(/);
    expect(code).to.not.match(/\.then\(/);
    expect(code).to.not.match(/\.catch\(/);
    printMessage(`👌 Nickel ! Ton code valide tout ce qui était demandé !`);
    printMessage(`Tu peux passer à l'exercice suivant.`);
  });
});
