#!/usr/bin/env sh
set -e

git add -A
git commit -m '华流才是最屌的'

git push -f git@github.com:Matrix-The-One/music.git main:main

cd -