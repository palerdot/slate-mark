import { LeafNode, LeafChildren, spacer } from '../utils'

/*
 * Mark (main text parser)
 *
 * Handles
 * - plain text
 * - inline code
 * - bold
 * - italic
 *
 * All the block level parsers (blockquote, code block, paragraph)
 * delegate to mark parser for parsing actual text content
 *
 * Takes care of composite text content (code + bold + italic etc)
 */

function parsePlainText({ text }: LeafNode): string {
  return `${text}`
}

function parseBoldText({ text }: LeafNode): string {
  // edge case:
  // if we have a trailing space, do not wrap it with mark
  if (text.endsWith(' ')) {
    return `**${text.slice(0, -1)}** `
  }

  return `**${text}**`
}

function parseItalicText({ text }: LeafNode): string {
  // edge case:
  // if we have a trailing space, do not wrap it with mark
  if (text.endsWith(' ')) {
    return `*${text.slice(0, -1)}* `
  }

  return `*${text}*`
}

function parseInlineCode({ text }: LeafNode): string {
  // edge case:
  // if we have a trailing space, do not wrap it with mark
  if (text.endsWith(' ')) {
    return `\`${text.slice(0, -1)}\` `
  }

  return `\`${text}\``
}

export function parseMark(input: LeafNode): string {
  const finalText = {
    text: input.text,
  }

  // BUG: EDGE CASE
  // slate collapses individual empty paragraphs into
  // { text: " \n \n \n \n " }
  // also replaces our "<SPACE><SPACE>\n" to "<SPACE>\n"
  const isBlankLine = finalText.text.trim() === ''

  if (isBlankLine && input.text.includes('\n')) {
    // we will return the text as is
    // for as many new lines we are replacing with our spacer
    return input.text
      .split('\n')
      .map(() => spacer)
      .join('')
  }

  // we will deal with empty mark first
  if (isBlankLine) {
    // do not wrap with marks
    // but return exact text (with exact whitespaces)
    return input.text
  }

  // we will go through every iteration

  // Bold
  if (input.bold) {
    finalText.text = parseBoldText(finalText)
  }

  // Italic
  if (input.italic) {
    finalText.text = parseItalicText(finalText)
  }

  // Inline code
  if (input.code) {
    finalText.text = parseInlineCode(finalText)
  }

  // finally we will deal with plain text
  return parsePlainText(finalText)
}

export function parseMarks(input: LeafChildren): string {
  return input.map(parseMark).join('')
}
