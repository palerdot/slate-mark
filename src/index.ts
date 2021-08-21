import type { TNode } from '@udecode/plate-core'

import { parseNodes } from './parsers'
import { SlateNode, LeafNode, isLeafNode, isLeaf } from './utils'

export const plateToMarkdown = (input: Array<TNode>): string => {
  return parseNodes(input)
}

export const plateToMarkdownAsync = (input: Array<TNode>): Promise<string> => {
  return new Promise(resolve => {
    const output = parseNodes(input)

    return resolve(output)
  })
}

// export extra utils
export { SlateNode, LeafNode, isLeafNode, isLeaf }
