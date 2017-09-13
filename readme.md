# git-remote-to-ssh

[![Greenkeeper badge](https://badges.greenkeeper.io/RichardLitt/git-remote-to-ssh.svg)](https://greenkeeper.io/)

> Automatically convert GitHub origin URLs to the ssh protocol

## Install

```
npm i -g git-remote-to-ssh
```

## Usage

This has been aliased as `git-ssh`.

```sh
Usage
  $ git-remote-to-ssh <input>

Options
  -r, --remote  Specify a different remote

Examples
  $ git-remote-to-ssh
  Remote origin: git@github.com:RichardLitt/git-remote-to-ssh.git
  $ git-remote-to-ssh -r test
  Remote test: git@github.com:RichardLitt/whatever.git
```

## Contribute

Issues and PRs accepted.

## License

[MIT](LICENSE) © Richard Littauer 2017
