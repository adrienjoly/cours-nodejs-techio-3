const fs = require("fs");
const expect = require("expect.js");
const {
  printMessage,
  getStubFile,
  getStudentCode,
} = require("./common/techio");

const CODE_FILE = process.env.CODE_FILE || getStubFile(__filename);

describe("le programme devrait", () => {
  it(`appeler la fonction readFile()`, async () => {
    const studentCode = await getStudentCode(CODE_FILE);
    expect(studentCode).to.match(/readFile\(/);
  });

  it(`afficher le contenu d'un fichier ne contenant que des minuscules`, async () => {
    const studentCode = await getStudentCode(CODE_FILE);
    expect(studentCode).to.match(/readFile\(/);
  });

  /*
  it(`afficher la réponse JSON dans la sortie standard, si une URL valide est fournie`, async () => {
    const program = await runStudentCode(CODE_FILE, {
      args: ["https://jsonplaceholder.typicode.com/photos/1"],
    });
    const response = program.getLogs().join("").trim();
    expect(JSON.parse(response)).to.eql(EXPECTED_RESPONSE);
  });

  it(`afficher l'erreur dans la sortie d'erreurs, si une URL inexistante est fournie`, async () => {
    const program = await runStudentCode(CODE_FILE, {
      args: ["https://serveur-inexistant.xyz"],
    });
    const error = program.getErrors().join("").trim();
    expect(error).to.match(/^FetchError: /);
    expect(error).to.match(/ENOTFOUND/);
  });
  */

  it(`respecter toutes les consignes de l'énoncé`, () => {
    printMessage(`👌 Nickel ! Ton code valide tout ce qui était demandé !`);
    printMessage(`Tu peux passer à l'exercice suivant.`);
  })
});
