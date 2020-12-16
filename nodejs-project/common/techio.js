const fs = require('fs');
const childProcess = require("child_process");

exports.printMessage = (message, channel = "Exercice terminé") =>
  console.log('\nTECHIO> message --channel "' + channel + '" "' + message + '"');

exports.getStubFile = (testFile) => './' + testFile.split('/').pop().replace('.spec.js', '.js');

exports.countLines = (sourceCode) => sourceCode.split(/[\r\n]+/).length;

const removeComments = str => str.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '');

exports.getStudentCode = (codeFile) => new Promise((resolve, reject) => {
  fs.readFile(codeFile, 'utf8', (err, data) => err ? reject(err) : resolve(removeComments(data)));
});

exports.runStudentCode = (codeFile, { args, tolerateFailure } = {}) => new Promise((resolve, reject) => {
  const logs = [];
  const errors = [];
  const timeout = setTimeout(() => reject("timeout"), 5000);
  // load and run student code
  const process = childProcess.fork(codeFile, args, {
    stdio: [0, "pipe", "pipe", "ipc"],
  });
  process.stdout.on("data", (data) => {
    data
      .toString()
      .split(/[\r\n]+/g)
      .forEach((str) => logs.push(str));
    console.log(`    ℹ️ sortie standard du programme: ${data}`);
  });
  process.stderr.on("data", (data) => {
    data
      .toString()
      .split(/[\r\n]+/g)
      .forEach((str) => errors.push(str));
    console.log(`    ℹ️ sortie d'erreurs du programme: ${data}`);
  });
  process.on("close", (code) => {
    clearTimeout(timeout);
    if (code === 0 || tolerateFailure) {
      resolve({
        getLogs: () => logs,
        getErrors: () => errors,
        getExitCode: () => code,
      });
    } else {
      reject(`child process exited with code ${code}`);
    }
  });
});

exports.deleteFiles = (fileRegex) => fs.readdirSync(".")
  .filter(f => fileRegex.test(f))
  .map(f => fs.unlinkSync(f));
