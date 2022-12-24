This script is a wrapper around the TypeScript compiler that
adds a snapshotting feature, akin to jest.

This is meant to help js codebases with TONS of type errors gain control of the situation.
You pass in typical tsc arguments (run this as a watcher, pre-commit check, or ci/cd check)
And tsc-with-snapshotting will run tsc like normal, but it will parse the tsc errors,
And write those errors into \*.tsc.out files

Example: You have a Foo.jsx file, type errors for that file get written to Foo.jsx.tsc.out
It's your duty to be aware of the state of these files as you are committing and approving PRs.
Typically we'll want number of type errors to go down, but typescript doesn't exactly work like that.
Sometimes there will be more errors, and that's a good thing.

Imagine a software project with 0 tests, and then imagine some testing guru adds 5 tests, but they are all failing.
Assuming the tests are high quality, you'd rather have those 5 failing tests than not.
This can also happen with typescript, number of errors goes up, but, you believe they are meaningful errors,
and the errors are not trivial to solve, or could be worked on by multiple people across the entire codebase
over a longer period of time

Actually, it could support extra cli flags, like --print-diff
The --print-diff cli flag cause tsx-with-snapshotting to print any NEW type errors.
It could actually take in some git --diff-filter flags for how to run the git diff.
See git --diff-filter flags here: https://git-scm.com/docs/git-diff#Documentation/git-diff.txt---diff-filterACDMRTUXB82308203
Since diff-filter only filters based on whole files, tsc-with-snapshotting would need to further process the `git diff` output.
tsc-with-snapshotting would need to look at the characters at the beginning of lines.
Lines starting with `+` would be of most interest.
