import { NodeType, SlateNode, isLeaf, LeafChildren } from '../utils'
import { parseMarks } from './mark'

/* 
 'Paragraph' detection

 {
    type: 'paragraph',
    children: [
      {
        text: 'porumai',
      },
    ],
  },
 */
export function isParagraph(node: SlateNode): boolean {
  return isLeaf(node.children) && node.type === NodeType.Paragraph
}

/*
 * Paragraph (parser)
 *
 * Output: text + '\n'
 */

function parse(input: LeafChildren) {
  return `${parseMarks(input)}\n`
}

export default parse
