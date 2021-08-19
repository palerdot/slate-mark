import { NodeType, SlateNode, Children, recurseParse } from '../utils'

/*  
  blockquote detection

  // variation 1
  {
    type: 'blockquote',
    children: [
      {
        text: 'wait and hope',
      },
    ],
  },

  // variation 2
  {
    type: 'blockquote',
    children: [
      {
        type: 'p',
        children: [
          {
            text: 'wait and hope',
          },  
        ]
      }
    ]
  }

 */
export function isBlockQuote(node: SlateNode): boolean {
  return node.type === NodeType.BlockQuote
}

/*
 * blockquote (parser)
 *
 * Output: '> text \n'
 */

function parse(input: Children): string {
  const PREFIX = `> `
  // IMPORTANT: insert two new lines to prevent blank lines
  // following blockquote to be included
  const SUFFIX = `\n\n`

  const content = recurseParse(input)

  return `${PREFIX}${content}${SUFFIX}`
}

export default parse
