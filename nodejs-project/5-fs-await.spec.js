const fs = require("fs");
const esprima = require("esprima"); // ecmascript parser
const expect = require("expect.js");
const {
  printMessage,
  getStubFile,
  getStudentCode,
  runStudentCode,
  deleteFiles,
  filterNodesRecur,
} = require("./common/techio");

const CODE_FILE = process.env.CODE_FILE || getStubFile(__filename);

const trouverDefFonction = (nom, code) => esprima.parseScript(code, { range: true }).body.find(
  ({ type, id, params }) => type === "FunctionDeclaration" && id.name === nom
)

describe("le programme devrait", () => {

  afterEach(() => {
    // clean up txt files created during execution of tests
    deleteFiles(/\.txt$/);
    deleteFiles(/\.tmp$/);
  });

  // exigences des exercices précédents
  
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

  it(`définir la fonction lireFichier(nomFichier)`, async () => {
    const définitionDeFonction = trouverDefFonction("lireFichier", await getStudentCode(CODE_FILE));
    expect(définitionDeFonction).to.be.ok();
    expect(définitionDeFonction.params).to.have.length(1);
  });

  it(`appeler fs.promises.readFile() depuis la fonction lireFichier()`, async () => {
    const définitionDeFonction = trouverDefFonction("lireFichier", await getStudentCode(CODE_FILE));
    // console.log(définitionDeFonction.body.body);
    const appelsReadFile = filterNodesRecur(définitionDeFonction, ({ type, callee }) =>
      type === "CallExpression"
      && callee
      && callee.type === "MemberExpression"
      && callee.object
      && callee.object.type === "MemberExpression"
      && callee.object.object
      && callee.object.object.name === "fs"
      && callee.object.property
      && callee.object.property.name === "promises"
      && callee.property
      && callee.property.name === "readFile"
    );
    expect(appelsReadFile).to.have.length(1);
  });
  
  it(`appeler fs.promises.readFile() seulement depuis la fonction lireFichier()`, async () => {
    const nbMatches = ((await getStudentCode(CODE_FILE)).match(/fs\.promises\.readFile\(/g) || []).length;
    expect(nbMatches).to.be(1);
  });

  it(`transformer le contenu en dehors de la fonction "lireFichier()"`, async () => {
    const studentCode = await getStudentCode(CODE_FILE);
    const définitionDeFonction = trouverDefFonction("lireFichier", studentCode);
    const [ start, end ] = définitionDeFonction.range;
    const studentCodeWithoutFunction = studentCode.substr(0, start) + studentCode.substr(end);
    expect(studentCodeWithoutFunction).to.contain("toLowerCase(");
    const functionImpl = studentCode.substring(...définitionDeFonction.range)
    expect(functionImpl).not.to.contain("toLowerCase(");
  });

  it(`écrire le fichier "résultat.txt" avec fs.promises.writeFile(), en dehors de la fonction "lireFichier()"`, async () => {
    const studentCode = await getStudentCode(CODE_FILE);
    const définitionDeFonction = trouverDefFonction("lireFichier", studentCode);
    const [ start, end ] = définitionDeFonction.range;
    const studentCodeWithoutFunction = studentCode.substr(0, start) + studentCode.substr(end);
    expect(studentCodeWithoutFunction).to.contain("fs.promises.writeFile(");
    const functionImpl = studentCode.substring(...définitionDeFonction.range)
    expect(functionImpl).not.to.contain("fs.promises.writeFile(");
  });

  it(`les promesses rejetées (erreur d'écriture) doivent être interceptées`, async () => {
    await fs.promises.writeFile("minuscules.txt", "bonjour le monde !");
    const programmeAvecFichierInvalide = "programmeAvecFichierInvalide.js.tmp";
    const codeAvecFichierInvalide = (await getStudentCode(CODE_FILE)).replace(/résultat\.txt/g, '');
    await fs.promises.writeFile(programmeAvecFichierInvalide, codeAvecFichierInvalide);
    const execution = await runStudentCode(programmeAvecFichierInvalide, {
      args: [ "minuscules.txt" ],
      tolerateFailure: true, // so runStudentCode() does not rejects if "child process exited with code 1"
    });
    const error = execution.getErrors().join("").trim();
    expect(error).not.to.contain(`Unhandled`);
  })
  
  it(`les promesses rejetées (erreur de lecture) doivent être interceptées`, async () => {
    const fichierInexistant = "fichier-inexistant.txt";
    const execution = await runStudentCode(CODE_FILE, {
      args: [fichierInexistant],
      tolerateFailure: true, // so runStudentCode() does not rejects if "child process exited with code 1"
    });
    const error = execution.getErrors().join("").trim();
    expect(error).not.to.contain(`Unhandled`);
  })
  
  // exigences apportées dans l'exercice 5

  it(`le programme doit utiliser les mots clés await et async`, async () => {
    const studentCode = await getStudentCode(CODE_FILE);
    expect(studentCode).to.contain(`await`);
    expect(studentCode).to.contain(`async`);
  })

  it(`le programme ne doit pas utiliser Promise, resolve, reject, .then() ni .catch()`, async () => {
    const studentCode = await getStudentCode(CODE_FILE);
    expect(studentCode).not.to.contain(`Promise`);
    expect(studentCode).not.to.contain(`resolve`);
    expect(studentCode).not.to.contain(`reject`);
    expect(studentCode).not.to.contain(`.then`);
    expect(studentCode).not.to.contain(`.catch`);
  })
  
  it(`respecter toutes les consignes de l'énoncé`, () => {
    printMessage(`👌 Nickel ! Ton code valide tout ce qui était demandé !`);
    printMessage(`Peaufine ton code pour le rendre plus intelligible avant de passer à l'exercice suivant.`);
  })

});
