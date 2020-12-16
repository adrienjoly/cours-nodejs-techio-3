#!/bin/bash

set -e # stop script on any non-zero exit code

cd nodejs-project
CODE_FILE="1-fs-base.solution.js" node_modules/mocha/bin/mocha 1-fs-base.spec.js
CODE_FILE="2-fs-async.solution.js" node_modules/mocha/bin/mocha 2-fs-async.spec.js
