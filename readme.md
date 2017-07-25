# github-origin-https-to-ssh

> Automatically convert GitHub origin urls from https to ssh

This is an evil shell script that really ought to be done in Javascript with better checks.

## Install

```
npm i -g github-origin-https-to-ssh
```

## Usage

This has been aliased as `https-to-ssh`.

```sh
# In git repo with bad URL
$ https-to-ssh
## All fixed.
```

This also works for enterprise or non-GitHub git remotes.

```sh
$ https-to-ssh github.corporation.org
## All fixed for enterprise
```

## Contribute

Issues and PRs accepted.

## License

Shell script from: https://gist.github.com/m14t/3056747
[MIT](LICENSE) © Richard Littauer 2017
