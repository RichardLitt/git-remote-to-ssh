# PolyHack Toronto

1. I had a problem. `https://` consistently broke for me when I tried to push. This is because I had 2FA enabled and [wasn't using a token](http://olivierlacan.com/posts/why-is-git-https-not-working-on-github/), but I didn't know that yet.

2. Switching the git protocol to `ssh://` solved the problem for me, but I didn't want to do that manually, each time. I work with more git repositories than most people I know, as I do documentation work fairly often. At current count, I have 367 repositories in my `src` folder, and around a thousand repositories on GitHub. Not doing that manually.

3. What kind of protocols are there? https://gist.github.com/grawity/4392747

3. I found a handy shell script online. Let's look at it.

4. But this gives me limited functionality, and doesn't always work. So, I ported to JavaScript.

5. My first thought was using `exec()`, which can be pretty evil. Because I like his work, I decided to use [`execa()`](https://github.com/sindresorhus/execa). So, let's do a simple port.

```js
execa(`git remote -v | grep -m1 '^${remote}' | sed -Ene's#.*(https://[^[:space:]]*).*#\1#p'`)
  .then((res) => console.log(res))
  .catch((err) => console.log('Screw you everything is broken'))
```

Of course, I got this:

```
SyntaxError: Octal escape sequences are not allowed in strict mode.
```

At this point, on my third refactor, I wondered - well, you know, there's probably a better parsing library out there for git, and I probably don't need to use `exec`.

Turns out, super easy for some things

TODO Getting everything

### Editing the Config

But not for others. For editing the config, I still need `exec`

I could use [`git-js`](https://github.com/steveukx/git-js/blob/master/src/git.js#L1245), but that uses it, too. So why bother, for one command?

``
execa(`git remote set-url ${opts.remote} ${newURL}`)
  .then((res) => {
    console.log(`Changed remote url from
    '${oldURL}'
        to
    '${newURL}'`)
  })
  .catch((err) => console.log('All hell broke loose' + err))
```

Because

```sh
> All hell broke looseError: spawn git remote set-url origin git@github.com:RichardLitt/git-remote-to-ssh.git ENOENT
```

Oh. Ok. I don't know what that problem is. So.

### Publishing

It looks like https://github.com/eush77/github-ssh-url actually solves my issue. But it is lame. 

```
'use strict';

var parseGithubUrl = require('parse-github-url');


module.exports = function (user, repo) {
  var uri = repo ? user + '/' + repo : user;
  var gh = parseGithubUrl(uri);
  var path = gh.user + '/' + gh.repo + '.git';
  return 'git@github.com:' + path;
};
```

Mine goes a bit beyond that. It also could have used any of the GitHub parser libraries, likes [`parse-github-repo-url`](https://www.npmjs.com/package/parse-github-repo-url)

So, I'll republish it.

### Irony

I renamed the GitHub repo from `github-origin-https-to-ssh` to `git-remote-to-ssh`, and then manually edited my .gitconfig file to reflect the change. Did I accomplish anything? I've no idea.

