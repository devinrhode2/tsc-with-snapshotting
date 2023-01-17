/**
 * Calls `callback`, catches any errors and returns `returnValue | Error`
 *
 * TODO: create npm package?
 *
 * See: https://dev.to/devinrhode2/comment/1fcga
 */
export const safeCall = <
  TCallback extends (
    ...args: unknown[]
  ) => unknown,
>(
  callback: TCallback,
): ReturnType<TCallback> | Error => {
  let error = undefined as unknown // it can actually stay undefined, which means no error was thrown
  let returnValue = undefined as
    | ReturnType<TCallback>
    | undefined
  let didThrow = false
  try {
    returnValue =
      callback() as ReturnType<TCallback>
  } catch (e) {
    didThrow = true
    error = e
  }
  if (didThrow) {
    if (!(error instanceof Error)) {
      throw new Error(
        [
          `Caught 💩 which is not an instanceof Error: ${error}`,
          'You should never throw, but if you have no choice, this is how you do it: throw new Error("Whoops");',
          'This gives you accurate stack traces which point back to the original source of the exception.',
        ].join('\n'),
      )
    }
    return error
  }
  return returnValue
}

// test:
function getConstString(a: 'a') {
  const b = 'b' as const
  const returnValue =
    `${b}${a}` as const
  return returnValue
}

let ret = safeCall(getConstString)

// type MaybeNewNodes = [TreeNode[], undefined] | [undefined, Error];

// /**
//  * TS didn't narrow types inside of mutateNodes when directly embedding the validations above
//  * Therefore, pulled it into a different function, to avoid sprinkling assertions below.
//  */
// const getNewNodesInner = (
//   newValues: NewNodeFromServer,
//   primaryNodes: TreeNode[],
// ): MaybeNewNodes => {
//   const primaryNodesCopy = [...primaryNodes];

//   const { id } = newValues;

//   if (id === LoadMoreTreeNodeId) {
//     return [
//       undefined,
//       new Error(
//         `Server appears to have sent \`"id": "${LoadMoreTreeNodeId}"\`, this should never happen`,
//       ),
//     ];
//   }

//   let isTreeUpdated = false;

//   /**
//    * Find `id` and mutate `tree.children .members + .view`
//    */
//   function mutateNodes(tree: TreeNode): boolean {
//     if (tree.type === LoadMoreTreeNodeType) {
//       // LoadMoreTreeNode's have no children to further traverse into.
//       return false;
//     }

//     // Note: id will never be `${LoadMoreTreeNodeId}`
//     if (tree.id && id.includes(tree.id)) {
//       // One example:
//       //   id:
//       //     /account/someco-internal/children
//       //   tree.id:
//       //     /account/someco-internal
//       // legacy tree patching code: https://github.com/SomeCo/tesseract/commit/3734c554b4b2c0655625dec020bfce88c5a1799b
//       if (tree.id === id) {
//         reportError(
//           new Error(
//             [
//               `The "${tree.id}" account appears to be trying to update children`,
//               `with the exact same id. This is not expected.`,
//             ].join(""),
//           ),
//         );
//         // keep isTreeUpdated as false
//         // Stop searching.
//         return true;
//       }

//       if (JSON.stringify(tree.children) !== JSON.stringify(newValues)) {
//         // eslint-disable-next-line no-param-reassign
//         tree.children = newValues;
//         isTreeUpdated = true;
//       }

//       return true;
//     }

//     // Keep trying to traverse tree:
//     // NOTE: may not need optional chaining here, we should remove it once we have e2e type safety.
//     return tree.children?.members?.some((child) => {
//       return mutateNodes(child);
//     });
//   }

//   const isIdFound = primaryNodesCopy.some((node) => {
//     return mutateNodes(node);
//   });

//   if (isIdFound) {
//     if (isTreeUpdated) {
//       return [primaryNodesCopy, undefined];
//     }
//     // Skipped update, nodes have not changed
//     // TODO: change to:
//     // return { warning: 'update_skipped' }
//     return [undefined, undefined];
//   }
//   return [
//     undefined,
//     new Error(
//       [
//         // prettier-preserve-newline
//         "Could not find `id` in tree:",
//         JSON.stringify(newValues, null, 2),
//       ].join("\n"),
//     ),
//   ];
// };
