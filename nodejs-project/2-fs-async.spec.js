const fs = require("fs");
const expect = require("expect.js");
const {
  printMessage,
  getStubFile,
  getStudentCode,
  runStudentCode,
  deleteFiles,
} = require("./common/techio");

const CODE_FILE = process.env.CODE_FILE || getStubFile(__filename);

describe("le programme devrait", () => {

  afterEach(() => {
    // clean up txt files created during execution of tests
    deleteFiles(/\.txt$/);
    deleteFiles(/\.tmp$/);
  });

  it(`appeler la fonction readFile()`, async () => {
    const studentCode = await getStudentCode(CODE_FILE);
    expect(studentCode).to.match(/readFile\(/);
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

  it(`appeler la fonction writeFile()`, async () => {
    const studentCode = await getStudentCode(CODE_FILE);
    expect(studentCode).to.match(/writeFile\(/);
  });

  it(`afficher l'erreur dans la sortie d'erreurs, en cas d'erreur d'écriture de fichier`, async () => {
    await fs.promises.writeFile("minuscules.txt", "bonjour le monde !");
    const programmeAvecFichierInvalide = "programmeAvecFichierInvalide.js.tmp";
    const codeAvecFichierInvalide = (await getStudentCode(CODE_FILE)).replace(/résultat\.txt/g, '');
    await fs.promises.writeFile(programmeAvecFichierInvalide, codeAvecFichierInvalide);
    const execution = await runStudentCode(programmeAvecFichierInvalide, {
      args: [ "minuscules.txt" ],
      tolerateFailure: true, // so runStudentCode() does not rejects if "child process exited with code 1"
    });
    const error = execution.getErrors().join("").trim();
    expect(error).to.match(/Error/);
    expect(error).to.match(/ENOENT/);
    expect(error).to.match(/no such file or directory/);
  });
  
  it(`afficher l'erreur dans la sortie d'erreurs, en cas d'erreur de lecture de fichier`, async () => {
    const fichierInexistant = "fichier-inexistant.txt";
    const execution = await runStudentCode(CODE_FILE, {
      args: [fichierInexistant],
      tolerateFailure: true, // so runStudentCode() does not rejects if "child process exited with code 1"
    });
    const error = execution.getErrors().join("").trim();
    expect(error).to.match(/Error/);
    expect(error).to.match(/ENOENT/);
    expect(error).to.match(/no such file or directory/);
    expect(error).to.match(new RegExp(fichierInexistant));
  });
  
  it(`interrompre l'exécution du programme, en cas d'erreur de lecture de fichier`, async () => {
    const fichierInexistant = "fichier-inexistant.txt";
    const execution = await runStudentCode(CODE_FILE, {
      args: [fichierInexistant],
      tolerateFailure: true, // so runStudentCode() does not rejects if "child process exited with code 1"
    });
    expect(execution.getExitCode()).to.eql(0);
  });

  it(`respecter toutes les consignes de l'énoncé`, () => {
    printMessage(`👌 Nickel ! Ton code valide tout ce qui était demandé !`);
    printMessage(`Tu peux passer à l'exercice suivant.`);
  })
});
