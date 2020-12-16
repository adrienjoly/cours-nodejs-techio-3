const fs = require("fs");
const expect = require("expect.js");
const {
  printMessage,
  getStubFile,
  getStudentCode,
  runStudentCode,
} = require("./common/techio");

const CODE_FILE = process.env.CODE_FILE || getStubFile(__filename);

describe("le programme devrait", () => {
  it(`appeler la fonction readFileSync()`, async () => {
    const studentCode = await getStudentCode(CODE_FILE);
    expect(studentCode).to.match(/readFileSync\(/);
  });

  it(`afficher le contenu d'un fichier ne contenant que des minuscules`, async () => {
    const contenuAttendu = "bonjour le monde !";
    const fichierSource = "minuscules.txt";
    await fs.promises.writeFile(fichierSource, contenuAttendu);
    const execution = await runStudentCode(CODE_FILE, { args: [fichierSource] });
    const sortie = execution.getLogs().join("").trim();
    expect(sortie).to.eql(contenuAttendu);
  });

  it(`afficher le contenu d'un fichier après conversion des majuscules en minuscules`, async () => {
    const contenuInitial = "Bonjour le Monde !";
    const contenuAttendu = contenuInitial.toLowerCase();
    const fichierSource = "minuscules.txt";
    await fs.promises.writeFile(fichierSource, contenuInitial);
    const execution = await runStudentCode(CODE_FILE, { args: [fichierSource] });
    const sortie = execution.getLogs().join("").trim();
    expect(sortie).to.eql(contenuAttendu);
  });

  it(`écrire dans le fichier "résultat.txt" le contenu mis en minuscules`, async () => {
    const contenuInitial = "Bonjour le Monde !";
    const contenuAttendu = contenuInitial.toLowerCase();
    const fichierSource = "minuscules.txt";
    const fichierDestination = "résultat.txt";
    await fs.promises.writeFile(fichierSource, contenuInitial);
    await runStudentCode(CODE_FILE, { args: [fichierSource] });
    const contenuDestination = await fs.promises.readFile(fichierDestination, "utf8");
    expect(contenuDestination).to.eql(contenuAttendu);
  });

  /*
  it(`afficher l'erreur dans la sortie d'erreurs, en cas d'erreur de lecture de fichier`, async () => {
    const fichierInexistant = "fichier-inexistant.txt";
    const program = await runStudentCode(CODE_FILE, { args: [fichierInexistant] });
    console.log('coucou')
    const error = program.getErrors().join("").trim();
    console.log({error})
    expect(error).to.match(/Error/);
    expect(error).to.match(/ENOENT/);
    expect(error).to.match(/no such file or directory/);
    expect(error).to.match(fichierInexistant);
  });
  */

  it(`respecter toutes les consignes de l'énoncé`, () => {
    printMessage(`👌 Nickel ! Ton code valide tout ce qui était demandé !`);
    printMessage(`Tu peux passer à l'exercice suivant.`);
  })
});
