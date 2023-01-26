import { execa } from 'execa'

/**
 * @type {(
 *   cmdString: string,
 *   debug?: 'debug'
 * ) => [
 *   string | undefined,
 *   string | unknown
 * ]}
 */
export const exec = (cmdString, debug) => {
  let exception
  let result
  try {
    let { FORCE_COLOR, ...env } = process.env

    result = execa(cmdString, {
      all: true,
      env: {
        ...env,
        FORCE_COLOR: 'false',
      },
    })
  } catch (e) {
    exception = e
  }
  if (debug === 'debug') {
    console.log(result)
    console.log(exception)
  }
  return [
    result?.stdout,
    // If falsey, provide exception. If no exception, give falsey value.
    result?.stderr ||
      exception ||
      result?.stderr,
  ]
}
