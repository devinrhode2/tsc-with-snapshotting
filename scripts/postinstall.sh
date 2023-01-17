#!/usr/bin/env sh

cp bun.lockb last-good.bun.lockb

# Git does not support in-repo .gitconfig files. This is due to security reasons.
# We could work around this by running:
#   git config --local include.path $(git rev-parse --show-toplevel)/.gitconfig || echo "not a git repo, skipping git blame config"
# But then we suffer from same security issues, and this command won't work on windows without some elbow grease.
#
git config --local core.eol lf && \
git config --local core.autocrlf false && \
git config --local blame.ignoreRevsFile .git-blame-ignore-revs && \
git config --local notes.rewriteRef refs/notes/commits && \
git config --local pull.rebase true && \
git config --local push.useForceIfIncludes true || echo "not a git repo, skipping git config"
