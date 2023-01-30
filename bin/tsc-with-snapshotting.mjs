#!/usr/bin/env node

// import { writeFile } from 'fs'

import { execa } from 'execa'

// import {
//   outputFile,
//   outputFileSync,
// } from 'fs-extra/esm'

const tscOptions = ['--watch']
const tscCall = 'yarn tsc ' + tscOptions.join(' ')

console.warn(
  'Running: ' + tscCall,
  'Custom tsc args are not yet supported. In future, all cli flags will be forwarded to `tsc`.',
)

const tscProcess = execa(tscCall, {
  all: true,
  env: {
    // eslint-disable-next-line node/no-process-env
    ...process.env,
    FORCE_COLOR: 'true',
  },
})

// tscProcess.all.on('readable'
// tscProcess.all.on('data'
// tscProcess.all.
tscProcess.all.pipe(process.stdout)
