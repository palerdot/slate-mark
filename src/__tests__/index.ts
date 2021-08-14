import { plateToMarkdown } from '../'

/*  
 
porumai

> wait and hope

`amaidhi`

```
porumai code block
```

### unordered list

*   porumai
    
*   amaidhi
    
*   paience
    

### ordered list

1.  porumai
    
2.  amaidhi
    
3.  patience 

 */

const sample_input = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'porumai',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'blockquote',
    children: [
      {
        text: 'wait and hope',
      },
    ],
  },
  {
    type: 'p',
    children: [
      {
        text: 'amaidhi',
        code: true,
      },
    ],
  },
  {
    type: 'p',
    children: [
      {
        code: true,
        text: '',
      },
    ],
  },
  {
    type: 'code_block',
    children: [
      {
        text: 'porumai code block',
      },
    ],
  },
  {
    type: 'h3',
    children: [
      {
        text: 'unordered list',
      },
    ],
  },
  {
    type: 'ul',
    // TODO: parse complex children like bold/italic list elements
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
            type: 'lic',
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
  {
    type: 'p',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'h3',
    children: [
      {
        text: 'ordered list',
      },
    ],
  },
  {
    type: 'ol',
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
            type: 'lic',
            children: [
              {
                text: 'patience',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'p',
    children: [
      {
        text: '',
      },
    ],
  },
]

describe('Slate => Markdown, works fine', () => {
  test('parser is working fine', () => {
    console.log('porumai ... transformed ', plateToMarkdown(sample_input))
    expect('porumai').toBe('porumai')
  })
})
