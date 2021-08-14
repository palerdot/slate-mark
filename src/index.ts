import type { TNode } from '@udecode/plate-core'

import { parseNodes } from './parsers'

export const plateToMarkdown = (input: Array<TNode>) => {
  return parseNodes(input)
}
