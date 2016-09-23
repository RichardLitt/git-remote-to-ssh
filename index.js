#! /usr/local/bin/node
const shell = require("shelljs")
const fs = require('fs')
const fix = fs.readFile('fix_github_https_repo.sh', 'utf8', (err, file) => shell.exec(file))
