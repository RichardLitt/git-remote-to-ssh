#!/usr/bin/env node
const execa = require('execa')
const meow = require('meow')

const cli = meow(`
    Usage
      $ https-to-ssh <input>

    Options
      -d, --domain  Specify a different domain (for Enterprise)
      -r, --remote  Specify a different remote

    Examples
      $ foo unicorns --domain github.corp.org
      🌈 unicorns 🌈
`, {
    alias: {
        d: 'domain',
        r: 'remote'
    }
})

// foo(cli.input[0], cli.flags);

const domain = cli.flags.domain || 'github.com'
const remote = cli.flags.remote || 'origin'

execa(`git remote -v | grep -m1 '^${remote}' | sed -Ene's#.*(https://[^[:space:]]*).*#\1#p'`)
  .then((repoURL) => {
    return execa(`echo ${repoURL} | sed -Ene's#https://'${domain}'/([^/]*)/(.*).*#\1#p'`)
      .then((user) => {
        return execa(`echo ${repoURL} | sed -Ene's#https://'${domain}'/([^/]*)/(.*).*#\2#p'`)
          .then((repo) => {
            return execa(`echo git@$domain:${user}/${repo}.git | sed -e 's/\.git\.git/.git/g'`)
              .then((newURL) => {
                console.log(`Changing repo url from
  '${repoURL}'
      to
  '${newURL}'
`)
                return execa(`git remote set-url ${remote} ${newURL}`)
                  .then(res => console.log('Success'))
                  .catch((err) => { console.log('Unable to change at last moment')})
              })
              .catch()
          })
          .catch(err => {
            console.log("-- ERROR:  Could not identify Repo.")
          })
      }).catch(err => {
        console.log("-- ERROR:  Could not identify User.")
      })
  }).catch((err) => {
    console.log(`-- ERROR:  Could not identify Repo url.
  It is possible this repo is already using SSH instead of HTTPS.
  Current remote ${remote}:
  ${execa(`git remote -v |  grep -m1 '^${remote}')`)
    .then(res => console.log(res))}
    `)
  })
