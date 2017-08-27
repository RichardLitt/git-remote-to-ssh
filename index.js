#!/usr/bin/env node
const meow = require('meow')
const parse = require('parse-git-config')
const hostedGitInfo = require("hosted-git-info")
const simpleGit = require('simple-git')

const cli = meow(`
    Usage
      $ git-remote-to-ssh <input>

    Options
      -r, --remote  Specify a different remote

    Examples
      $ git-remote-to-ssh
      Remote origin: git@github.com:RichardLitt/git-remote-to-ssh.git
      $ git-remote-to-ssh -r test
      Remote test: git@github.com:RichardLitt/whatever.git
`, {
  alias: {
    r: 'remote'
  }
})

const opts = {
  remote: cli.flags.remote || 'origin'
}

// Get the .gitconfig file as a JSON object
var config = parse.sync();
// Show me the remote
var oldURL = config[`remote "${opts.remote}"`].url
// TODO What if the remote is bogus?
var info = hostedGitInfo.fromUrl(oldURL)
// Convert to ssh
var newURL = info.ssh()
// Set the URL using git
simpleGit().remote(['set-url', opts.remote, newURL], (err, res) => {
  if (err) console.log('All hell broke loose ' + err)
  console.log(`Remote ${opts.remote}: ${newURL}`)
})
