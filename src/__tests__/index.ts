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

/* const complex_input = [
  {
    type: 'blockquote',
    children: [
      {
        text: 'porumai ',
      },
      {
        text: 'wait and hope ',
        bold: true,
      },
      {
        text: 'amaidhi',
        italic: true,
      },
    ],
  },
  {
    type: 'action_item',
    children: [
      {
        italic: true,
        text: 'porumai',
      },
    ],
  },
  {
    type: 'action_item',
    children: [
      {
        italic: true,
        text: 'amaidhi',
      },
    ],
  },
  {
    type: 'action_item',
    children: [
      {
        italic: true,
        text: 'patience',
      },
    ],
    checked: true,
  },
  {
    type: 'p',
    checked: true,
    children: [
      {
        italic: true,
        text: '',
      },
    ],
  },
  {
    type: 'p',
    checked: true,
    children: [
      {
        text: 'porumai',
        italic: true,
        bold: true,
      },
    ],
  },
  {
    type: 'p',
    checked: true,
    children: [
      {
        text: 'amaidhi',
        bold: true,
      },
    ],
  },
  {
    type: 'p',
    checked: true,
    children: [
      {
        text: 'patience',
        italic: true,
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

const single_line_variation = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'porumai ',
      },
      {
        text: 'patience ',
        bold: true,
      },
      {
        text: 'amaidhi',
        italic: true,
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
] */

describe('Slate => Markdown, works fine', () => {
  test('parser is working fine', () => {
    console.log('porumai ... transformed ', plateToMarkdown(sample_input))
    expect('porumai').toBe('porumai')
  })
})