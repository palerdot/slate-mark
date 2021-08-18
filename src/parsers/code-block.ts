import { NodeType, SlateNode, isLeaf, Children, recurseParse } from '../utils'

/* 
 'Code Block' detection

 {
    type: 'code_block',
    children: [
      {
        text: 'porumai code block',
      },
    ],
  },
 */
export function isCodeBlock(node: SlateNode): boolean {
  return isLeaf(node.children) && node.type === NodeType.CodeBlock
}

/*
 * Code Block (parser)
 *
 * Output:
 * ```
 * text
 * ```
 * \n
 */

function parse(input: Children): string {
  const FENCE = '```'
  const content = recurseParse(input)

  return `${FENCE}\n${content}\n${FENCE}\n\n`
}

export default parse
