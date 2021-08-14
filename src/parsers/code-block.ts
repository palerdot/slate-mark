import { NodeType, LeafNode, SlateNode, isLeaf } from '../utils'

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

function parse({ text }: LeafNode) {
  const FENCE = '```'

  return `${FENCE}\n${text}\n${FENCE}\n`
}

export default parse
