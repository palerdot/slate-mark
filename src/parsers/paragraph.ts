import { NodeType, LeafNode, SlateNode, isLeaf } from '../utils'

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

function parse({ text }: LeafNode) {
  return `${text}\n`
}

export default parse
