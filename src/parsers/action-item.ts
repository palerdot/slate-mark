import { NodeType, SlateNode, isLeaf, LeafChildren } from '../utils'
import { parseMarks } from './mark'

/*  

{
    type: 'action_item',
    children: [
      {
        italic: true,
        text: 'porumai',
      },
    ],
  },
  {
    type: 'action_item',
    children: [
      {
        italic: true,
        text: 'amaidhi',
      },
    ],
  },
  {
    type: 'action_item',
    children: [
      {
        italic: true,
        text: 'patience',
      },
    ],
    checked: true,
  },

*/

export function isActionItem(node: SlateNode): boolean {
  return node.type === NodeType.ActionItem && isLeaf(node.children)
}

/*
 * Action Item (parser)
 *
 * Output:
 * [] Unchecked \n'
 * [x] Checked \n
 */

function parse(input: LeafChildren, checked: boolean) {
  const prefix = checked ? '[x]' : '[]'

  return `${prefix} ${parseMarks(input)}\n`
}

export default parse
