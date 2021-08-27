import {
  NodeType,
  LeafNode,
  SlateNode,
  isLeaf,
  isLeafNode,
  Children,
} from '../utils'
import { parseMarks } from './mark'

type ListChild = {
  type: NodeType.ListChild
  children: [LeafNode]
}

type ListElement = [
  {
    type: NodeType.List
    children: [ListChild]
  }
]

type OrderedList = {
  type: NodeType.OrderedList
  children: ListElement
}

type UnorderedList = {
  type: NodeType.UnorderedList
  children: ListElement
}

// checks if it is a proper list
function isProperListElement(children: Children): children is ListElement {
  if (isLeaf(children)) {
    return false
  }

  let isCorrectType = false

  children.forEach(n => {
    // we should not have a leaf element
    if (isLeafNode(n)) {
      return
    }

    // we should have a 'li' element
    if (n.type !== NodeType.List) {
      return
    }

    // we have List type here
    isCorrectType = checkListType(n.children)
  })

  return isCorrectType
}

// predicate to check if we have a list type
/* 
 'Lists' detection - Ordered, Unordered
/*

{
    type: 'ul',
    children: [
      {
        type: 'li',
        children: [
          {
            type: 'lic',
            children: [
              {
                text: 'porumai',
              },
            ],
          },
        ],
      },
      {
        type: 'li',
        children: [
          {
            type: 'lic',
            children: [
              {
                text: 'amaidhi',
              },
            ],
          },
        ],
      },
      {
        type: 'li',
        children: [
          {
            type: 'lic/p',
            children: [
              {
                text: 'paience',
              },
            ],
          },
        ],
      },
    ],
  },

*/

function checkListType(children: Children): children is ListElement {
  // Checks:

  // - each 'li' should have exactly one 'lic' children / or one 'p' element

  /*  
    children: [
      {
        type: 'lic/p',
        children: [
          {
            text: 'porumai',
          },
        ],
      },
    ],
   */

  // firstLicChild should not be a leaf node
  if (isLeaf(children)) {
    return false
  }

  const hasOneLicChild = children.length === 1
  if (!hasOneLicChild) {
    return false
  }

  const firstLicChild = children[0]

  if (isLeafNode(firstLicChild)) {
    return false
  }

  // should be of type 'lic'
  // or of type 'p'
  const isListChild = firstLicChild.type === NodeType.ListChild
  const isDefaultChild = firstLicChild.type === NodeType.Default
  const isValidChild = isListChild || isDefaultChild

  if (!isValidChild) {
    return false
  }

  // now firstLicChild children will be a leaf type
  if (!isLeaf(firstLicChild.children)) {
    return false
  }

  // I think we have correct list type !!!
  return true
}

function isUnorderedList(node: SlateNode): node is UnorderedList {
  if (node.type !== NodeType.UnorderedList) {
    return false
  }

  return isProperListElement(node.children)
}

function isOrderedList(node: SlateNode): node is OrderedList {
  if (node.type !== NodeType.OrderedList) {
    return false
  }

  return isProperListElement(node.children)
}

export function isList(node: SlateNode): boolean {
  return isUnorderedList(node) || isOrderedList(node)
}

/*
 * List (parser)
 *
 * Ordered List:
 * 1) Item 1
 * 2) Item 2
 * 3) Item 3
 *
 * Unordered List:
 * * Item 1
 * * Item 2
 * * Item 3
 *
 */

function parse(node: SlateNode): string {
  if (!isList(node)) {
    return ``
  }

  if (!isProperListElement(node.children)) {
    return ``
  }

  // we will have a proper list
  // let us extract the list items (with formatting with marks if needed)
  const listItems = node.children.map(n => {
    return parseMarks(n.children[0].children)
  })

  let FINAL_TEXT = ``

  // now we have the list items
  // let us construct the list
  listItems.forEach((text, index) => {
    const prefix = node.type === NodeType.OrderedList ? `${index + 1}.` : '*'
    FINAL_TEXT += `${prefix} ${text}\n`
  })

  return FINAL_TEXT + '\n'
}

export default parse
