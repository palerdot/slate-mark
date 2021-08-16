import { NodeType, SlateNode, isLeaf, LeafChildren } from '../utils'
import { parseMarks } from './mark'

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
  return node.type === NodeType.BlockQuote && isLeaf(node.children)
}

/*
 * blockquote (parser)
 *
 * Output: '> text \n'
 */

function parse(input: LeafChildren) {
  return `> ${parseMarks(input)} \n`
}

export default parse
