#!/usr/bin/env bash
#-- Script to automate https://help.github.com/articles/why-is-git-always-asking-for-my-password
# From https://gist.github.com/m14t/3056747

GIT_DOMAIN='github.com'
if [ $# -eq 1 ]
  then
    GIT_DOMAIN=$1
fi

REPO_URL=`git remote -v | grep -m1 '^origin' | sed -Ene's#.*(https://[^[:space:]]*).*#\1#p'`
if [ -z "$REPO_URL" ]; then
  echo "-- ERROR:  Could not identify Repo url."
  echo "   It is possible this repo is already using SSH instead of HTTPS."
  echo "   Current origin:"
  echo "$(git remote -v |  grep -m1 '^origin')"
  exit
fi


USER=`echo $REPO_URL | sed -Ene's#https://'$GIT_DOMAIN'/([^/]*)/(.*).*#\1#p'`
if [ -z "$USER" ]; then
  echo "-- ERROR:  Could not identify User."
  exit
fi

REPO=`echo $REPO_URL | sed -Ene's#https://'$GIT_DOMAIN'/([^/]*)/(.*).*#\2#p'`
if [ -z "$REPO" ]; then
  echo "-- ERROR:  Could not identify Repo."
  exit
fi

NEW_URL=`echo git@$GIT_DOMAIN:$USER/$REPO.git | sed -e 's/\.git\.git/.git/g'`
echo "Changing repo url from "
echo "  '$REPO_URL'"
echo "      to "
echo "  '$NEW_URL'"
echo ""

CHANGE_CMD="git remote set-url origin $NEW_URL"
`$CHANGE_CMD`

echo "Success"