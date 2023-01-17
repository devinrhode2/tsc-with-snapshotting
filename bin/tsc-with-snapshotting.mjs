#!/usr/bin/env node

// import { writeFile } from 'fs'

// import {
//   outputFile,
//   outputFileSync,
// } from 'fs-extra/esm'

import { execa } from 'execa'

// /**
//  * @type {(
//  *   cmdString: string,
//  *   debug?: 'debug'
//  * ) => [
//  *   string | undefined,
//  *   string | unknown
//  * ]}
//  */
// export const exec = (
//   cmdString,
//   debug,
// ) => {
//   let exception
//   let result
//   try {
//     let { FORCE_COLOR, ...env } =
//       process.env
//     result = execa(cmdString, {
//       all: true,
//       env: {
//         ...env,
//         FORCE_COLOR: 'false',
//       },
//     })
//   } catch (e) {
//     exception = e
//   }
//   if (debug === 'debug') {
//     console.log(result)
//     console.log(exception)
//   }
//   return [
//     result?.stdout,
//     // If falsey, provide exception. If no exception, give falsey value.
//     result?.stderr ||
//       exception ||
//       result?.stderr,
//   ]
// }

const tscOptions = '--watch'
const tscCall = 'yarn tsc ' + tscOptions
console.warn(
  'Running' + tscCall + '.',
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
tscProcess.all.pipe(process.stdout)

// process.stdin.on('readable', () => {
//   let chunk
//   console.log(
//     'Stream is readable (new data received in buffer)',
//   )
//   while (
//     null !==
//     (chunk = process.stdin.read())
//   ) {
//     console.log(
//       'Read ',
//       chunk.length,
//       'bytes of data:\n',
//       chunk.toString(),
//     )
//   }
// })
// process.stdin.on('end', () => {
//   console.log('Reached end of stream.')
// })
