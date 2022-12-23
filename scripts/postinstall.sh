#!/usr/bin/env sh

cp bun.lockb last-good.bun.lockb

# Could use this approach, but it seems less secure:
# git config --local include.path $(git rev-parse --show-toplevel)/.gitconfig || echo "not a git repo, skipping git blame config"
# Also, if this code is embeded back into the package.json postinstall string,
# it can fail if it's making certain assumptions about the terminal (i.e. that it's bash, etc)
git config --local core.eol lf && \
git config --local core.autocrlf false && \
git config --local blame.ignoreRevsFile .git-blame-ignore-revs && \
git config --local push.useForceIfIncludes true || echo "not a git repo, skipping git config"
