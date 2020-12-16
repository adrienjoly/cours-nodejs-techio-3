#!/bin/bash

set -e # stop script on any non-zero exit code

cd nodejs-project
CODE_FILE="1-fs-base.solution.js" node_modules/mocha/bin/mocha 1-fs-base.spec.js
CODE_FILE="2-fs-async.solution.js" node_modules/mocha/bin/mocha 2-fs-async.spec.js
CODE_FILE="3-fs-interm.solution.js" node_modules/mocha/bin/mocha 3-fs-interm.spec.js
CODE_FILE="4-fs-promise.solution.js" node_modules/mocha/bin/mocha 4-fs-promise.spec.js
CODE_FILE="5-fs-await.solution.js" node_modules/mocha/bin/mocha 5-fs-await.spec.js
