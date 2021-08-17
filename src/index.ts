import type { TNode } from '@udecode/plate-core'

import { parseNodes } from './parsers'

export const plateToMarkdown = (input: Array<TNode>): string => {
  return parseNodes(input)
}

export const plateToMarkdownAsync = (input: Array<TNode>): Promise<string> => {
  return new Promise(resolve => {
    const output = parseNodes(input)

    return resolve(output)
  })
}
