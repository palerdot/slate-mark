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
  List = 'li',
  ListChild = 'lic',
}

// single leaf node
export type LeafChildren = [LeafNode]

export type LeafNode = {
  text: string
  code?: boolean
}

// export type Children = Array<SlateNode> | LeafChildren
export type Children = Array<SlateNode | LeafNode>

export type SlateNode = {
  type: string
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
  if (children.length !== 1) {
    return false
  }

  const onlyChild = children[0]
  const properties = Object.getOwnPropertyNames(onlyChild)
  // let us verify if our property has text
  const hasText = properties.includes('text')
  // let us verify we don't have children property
  const noChildren = !properties.includes('children')

  return children.length === 1 && hasText && noChildren
}

// type predicate to check if it is leaf node
export function isLeafNode(input: LeafNode | SlateNode): input is LeafNode {
  const ownProperties = Object.getOwnPropertyNames(input)

  return ownProperties.includes('text') && !ownProperties.includes('type')
}
