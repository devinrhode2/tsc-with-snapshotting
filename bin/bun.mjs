import { spawn } from 'bun'

const { stdout } = spawn(
  [
    'yarn',
    'tsc',
    // '--pretty', // I think this ONLY adds color. It may be of interest if it adds formatting.
    '--noEmit',
    // TODO? should this take in a --level option which sets certain tsconfig.json options for you?
    // TODO? ..nah, people should have a tsconfig.json file anyway?
    // TODO: actually pass over cli flags:
    // '--watch'
  ],
  {
    stdin: await fetch(
      'https://raw.githubusercontent.com/oven-sh/bun/main/examples/hashing.js',
    ),
  },
)
