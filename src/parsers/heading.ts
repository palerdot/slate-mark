import { NodeType, SlateNode, isLeaf, Children, recurseParse } from '../utils'

/* 
 'Heading' detection

 {
    type: 'h1/h2/h3/h4/h5/h6',
    children: [
      {
        text: 'porumai heading',
      },
    ],
  },
 */
export function isHeading(node: SlateNode): boolean {
  const headingCheck =
    node.type === NodeType.H1 ||
    node.type === NodeType.H2 ||
    node.type === NodeType.H3 ||
    node.type === NodeType.H4 ||
    node.type === NodeType.H5 ||
    node.type === NodeType.H6

  return isLeaf(node.children) && headingCheck
}

/*
 * Heading (parser)
 *
 * Output:
 * h1 => # text \n
 * h2 => ## text \n
 * h3 => ### text \n
 * h4 => #### text \n
 * h5 => ##### text \n
 * h6 => ###### text \n
 */

function parse(input: Children, type: string): string {
  const text = recurseParse(input)

  // # Heading 1
  if (type === NodeType.H1) {
    return `# ${text}\n`
  }

  // ## Heading 2
  if (type === NodeType.H2) {
    return `## ${text}\n`
  }

  // ### Heading 3
  if (type === NodeType.H3) {
    return `### ${text}\n`
  }

  // #### Heading 4
  if (type === NodeType.H4) {
    return `#### ${text}\n`
  }

  // ##### Heading 5
  if (type === NodeType.H5) {
    return `##### ${text}\n`
  }

  // ###### Heading 6
  if (type === NodeType.H6) {
    return `###### ${text}\n`
  }

  // default
  return `${text}\n`
}

export default parse
