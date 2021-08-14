import { NodeType, LeafNode, SlateNode, isLeaf } from '../utils'

/*  
  blockquote detection

  {
    type: 'blockquote',
    children: [
      {
        text: 'wait and hope',
      },
    ],
  },

 */
export function isBlockQuote(node: SlateNode): boolean {
  return isLeaf(node.children) && node.type === NodeType.BlockQuote
}

/*
 * blockquote (parser)
 *
 * Output: '> text \n'
 */

function parse({ text }: LeafNode) {
  return `> ${text} \n`
}

export default parse
