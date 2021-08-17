import { NodeType, SlateNode, isLeaf, isLeafNode, Children } from '../utils'
import { parseMarks } from './mark'
import { parseNodes } from '../parsers'

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
  const SUFFIX = '\n\n'

  let content = ''

  if (isLeaf(input)) {
    /*  
      // variation 1
      [
        {
          text: 'wait and hope',
        },
      ],
     */

    content = parseMarks(input)
  } else {
    /*  
      // variation 2
      [
          {
            type: 'p',
            children: [
              {
                text: 'wait and hope',
              },  
            ]
          }
      ]
    */

    const nonLeafNodes: Array<SlateNode> = input.filter((a): a is SlateNode => {
      return !isLeafNode(a)
    })

    content = parseNodes(nonLeafNodes)
  }

  return `${PREFIX}${content}${SUFFIX}`
}

export default parse
