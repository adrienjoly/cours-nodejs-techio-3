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

  it(`appeler la fonction writeFileSync()`, async () => {
    const studentCode = await getStudentCode(CODE_FILE);
    expect(studentCode).to.match(/writeFileSync\(/);
  });

  it(`respecter toutes les consignes de l'énoncé`, () => {
    printMessage(`👌 Nickel ! Ton code valide tout ce qui était demandé !`);
    printMessage(`Peaufine ton code pour le rendre plus intelligible avant de passer à l'exercice suivant.`);
  })
});
