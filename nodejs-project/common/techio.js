exports.printMessage = (message, channel = "Exercice terminé") =>
  console.log('\nTECHIO> message --channel "' + channel + '" "' + message + '"');

exports.countLines = (sourceCode) => sourceCode.split(/[\r\n]+/).length;
