/*
 * Parser
 *
 * - Identifies node type to parse from slate AST
 * - parses the identified node type depending on type to final string
 *
 */
import { LeafType, SlateNode, isLeaf } from '../utils'

// individual parsers
import paragraphParser, { isParagraph } from './paragraph'
import inlineCodeParser, { isInlineCode } from './inline-code'
import blockQuoteParser, { isBlockQuote } from './block-quote'
import codeBlockParser, { isCodeBlock } from './code-block'
import headingParser, { isHeading } from './heading'
import listParser, { isList } from './lists'

// helper function to recursively parse nodes to final markdown
export function parseNodes(nodes: Array<SlateNode>): string {
  return nodes.map(transformNode).join('')
}

// helper function to transform node => string
function transformNode(node: SlateNode): string {
  // TODO: verify if ordering of nodes matter (though we have strict checking of nodes)
  // for now we are parsing in random order
  // first going through leaf nodes
  if (isLeaf(node.children)) {
    const leafNode = node.children[0]

    // Paragraph
    if (isParagraph(node)) {
      return paragraphParser(leafNode)
    }

    // Inline Code
    if (isInlineCode(node)) {
      return inlineCodeParser(leafNode)
    }

    // Block Quote
    if (isBlockQuote(node)) {
      return blockQuoteParser(leafNode)
    }

    // Code Block
    if (isCodeBlock(node)) {
      return codeBlockParser(leafNode)
    }

    // Heading
    if (isHeading(node)) {
      return headingParser(node as LeafType)
    }

    // some unhandled leaf node
    return ``
  }

  // Lists - Ordered/Unordered
  if (isList(node)) {
    return listParser(node)
  }

  return ``
}
