import { NodeType, SlateNode, isLeaf, Children, recurseParse } from '../utils'

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
  return (
    isLeaf(node.children) &&
    (node.type === NodeType.Paragraph || node.type === NodeType.Default)
  )
}

/*
 * Paragraph (parser)
 *
 * Output: text + '\n'
 */

function parse(input: Children): string {
  return `${recurseParse(input)}\n`
}

export default parse
