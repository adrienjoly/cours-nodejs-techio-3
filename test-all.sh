#!/bin/bash

set -e # stop script on any non-zero exit code

cd nodejs-project
CODE_FILE="7-complete.solution.js" node_modules/mocha/bin/mocha 7-complete.spec.js
