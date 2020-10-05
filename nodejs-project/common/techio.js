const childProcess = require("child_process");

exports.printMessage = (message, channel = "Exercice terminé") =>
  console.log('\nTECHIO> message --channel "' + channel + '" "' + message + '"');

exports.countLines = (sourceCode) => sourceCode.split(/[\r\n]+/).length;

exports.runStudentCode = (codeFile) => new Promise((resolve, reject) => {
  const logged = [];
  const timeout = setTimeout(() => reject("timeout"), 5000);
  // load and run student code
  const process = childProcess.fork(codeFile, {
    stdio: [0, "pipe", 2, "ipc"],
  });
  process.stdout.on("data", (data) => {
    consoleLogAppelé = true;
    data
      .toString()
      .split(/[\r\n]+/g)
      .forEach((str) => logged.push(str));
    console.log(`    ℹ️ sortie standard du programme: ${data}`);
  });
  process.on("close", (code) => {
    clearTimeout(timeout);
    if (code === 0) {
      resolve({
        hasLogs: () => logged.length > 0,
        getLogs: () => logged,
      });
    } else {
      reject(`child process exited with code ${code}`);
    }
  });
})