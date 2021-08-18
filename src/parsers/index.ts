/*
 * Parser
 *
 * - Identifies node type to parse from slate AST
 * - parses the identified node type depending on type to final string
 *
 */
import { SlateNode, isLeaf } from '../utils'

// individual parsers
import paragraphParser, { isParagraph } from './paragraph'
import blockQuoteParser, { isBlockQuote } from './block-quote'
import codeBlockParser, { isCodeBlock } from './code-block'
import headingParser, { isHeading } from './heading'
import listParser, { isList } from './lists'
import actionItemParser, { isActionItem } from './action-item'

// helper function to recursively parse nodes to final markdown
export function parseNodes(nodes: Array<SlateNode>): string {
  return nodes.map(transformNode).join('')
}

// helper function to transform node => string
function transformNode(node: SlateNode): string {
  /*
   * Block level parsing will be done first
   * (List (Unordered/Ordered), Todo list, Code Block, Block Quote, Headings etc)
   * Last Paragraph will be dealt
   */

  // TODO: verify if ordering of nodes matter (though we have strict checking of nodes)
  // for now we are parsing in some random order

  // Lists - Ordered/Unordered
  if (isList(node)) {
    return listParser(node)
  }

  // Block Quote
  if (isBlockQuote(node)) {
    return blockQuoteParser(node.children)
  }

  if (isActionItem(node)) {
    return actionItemParser(node.children, !!node.checked)
  }

  // Code Block
  if (isCodeBlock(node)) {
    return codeBlockParser(node.children)
  }

  // Heading
  if (isHeading(node)) {
    return headingParser(node.children, node.type)
  }

  // first going through leaf nodes
  if (isLeaf(node.children)) {
    // Action item

    // Paragraph
    if (isParagraph(node)) {
      return paragraphParser(node.children)
    }

    // some unhandled leaf node
    return ``
  }

  return ``
}
