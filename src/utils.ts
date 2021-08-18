import { parseNodes } from './parsers'
import { parseMarks } from './parsers/mark'

export enum NodeType {
  Default = 'p',
  Paragraph = 'paragraph',
  BlockQuote = 'blockquote',
  CodeBlock = 'code_block',

  // headings
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',

  // lists
  UnorderedList = 'ul',
  OrderedList = 'ol',
  ActionItem = 'action_item',
  List = 'li',
  ListChild = 'lic',
}

// single leaf node
export type LeafChildren = Array<LeafNode>

interface Mark {
  code?: boolean
  italic?: boolean
  bold?: boolean
}

export interface LeafNode extends Mark {
  text: string
}

// export type Children = Array<SlateNode> | LeafChildren
export type Children = Array<SlateNode | LeafNode>

export type SlateNode = {
  type: string
  checked?: boolean
  children: Children
}

export type LeafType = {
  type: string
  children: LeafChildren
}

// ref: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
// type predicate to assert if we have a leaf (children)
// leaf node is nothing but [LeafNode]
export function isLeaf(children: Children): children is LeafChildren {
  let isValid = false

  // a node is leaf, if all its children are leaf
  children.forEach(node => {
    isValid = isLeafNode(node)
  })

  return isValid
}

// type predicate to check if it is leaf node
export function isLeafNode(input: LeafNode | SlateNode): input is LeafNode {
  const ownProperties = Object.getOwnPropertyNames(input)

  return ownProperties.includes('text') && !ownProperties.includes('type')
}

// user defined type predicate to return all non leaf nodes
export function getNonLeafNodes(input: Children): Array<SlateNode> {
  return input.filter((a): a is SlateNode => {
    return !isLeafNode(a)
  })
}

// parse nodes recursively
// used by block parsers like blockquote/paragraph etc
export function recurseParse(input: Children): string {
  let content = ''

  if (isLeaf(input)) {
    // dealing with leaf nodes
    content = parseMarks(input)
  } else {
    // we are going one level deep
    // this should cut down recursion
    content = parseNodes(getNonLeafNodes(input))
  }

  return content
}
