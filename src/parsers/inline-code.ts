import { NodeType, LeafNode, SlateNode, isLeaf } from '../utils'

/*
  'Inline code' detection
  {
    type: 'p',
    children: [
      {
        text: 'amaidhi',
        code: true,
      },
    ],
  },
 */
export function isInlineCode(node: SlateNode): boolean {
  return (
    isLeaf(node.children) &&
    node.type === NodeType.Default &&
    node.children[0].code === true
  )
}

/*
 * Inline code (parser)
 *
 * Output: `text` + \n
 */

function parse({ text }: LeafNode) {
  return `\`${text}\`\n`
}

export default parse
