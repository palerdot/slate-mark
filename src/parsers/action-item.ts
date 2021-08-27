import { NodeType, SlateNode, Children, recurseParse } from '../utils'

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
  return node.type === NodeType.ActionItem
}

/*
 * Action Item (parser)
 *
 * Output:
 * [] Unchecked \n'
 * [x] Checked \n
 */

function parse(input: Children, checked: boolean): string {
  const PREFIX = checked ? '* [x] ' : '* [ ] '
  const SUFFIX = '\n'

  const content = recurseParse(input)

  return `${PREFIX}${content}${SUFFIX}`
}

export default parse
