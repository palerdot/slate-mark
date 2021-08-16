import { LeafNode, LeafChildren } from '../utils'

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

function parsePlainText({ text }: LeafNode) {
  return `${text}`
}

function parseBoldText({ text }: LeafNode) {
  return `**${text}**`
}

function parseItalicText({ text }: LeafNode) {
  return `*${text}*`
}

function parseInlineCode({ text }: LeafNode) {
  return `\`${text}\`\n`
}

export function parseMark(input: LeafNode): string {
  let finalText = {
    text: input.text,
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