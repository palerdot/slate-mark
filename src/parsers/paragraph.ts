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
  // To force a line return, place two empty spaces at the end of a line.
  // we have two spaces in first and second line
  const ENDING = `&nbsp;&nbsp;\n`

  return `${recurseParse(input)}${ENDING}`
}

export default parse
