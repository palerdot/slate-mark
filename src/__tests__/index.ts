import { plateToMarkdown, plateToMarkdownAsync } from '../'

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
    type: 'p',
    children: [
      {
        text: '',
      },
    ],
  },
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
  {
    type: 'action_item',
    children: [
      {
        // italic: true,
        text: 'porumai',
      },
    ],
  },
  {
    type: 'action_item',
    children: [
      {
        // italic: true,
        text: 'amaidhi',
      },
    ],
  },
  {
    type: 'action_item',
    children: [
      {
        // italic: true,
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
  // block quote variation
  {
    type: 'blockquote',
    children: [
      {
        type: 'p',
        children: [
          {
            text: 'wait and hope ... (nested paragraph within blockquote)',
          },
        ],
      },
    ],
  },
  // block quote variation
  {
    type: 'blockquote',
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
  // single line variation
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
]

const EXPECTED = `
porumai

> wait and hope

\`amaidhi\`

\`\`\`
porumai code block
\`\`\`

### unordered list
* porumai
* amaidhi
* patience


### ordered list
1. porumai
2. amaidhi
3. patience


[ ] porumai
[ ] amaidhi
[x] patience

> wait and hope ... (nested paragraph within blockquote)


> porumai **patience** *amaidhi*

porumai **patience** *amaidhi*

`

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
  test('parser is working fine (sync)', () => {
    console.log('porumai ... transformed ', plateToMarkdown(sample_input))
    expect(plateToMarkdown(sample_input)).toEqual(EXPECTED)
  })

  test('parser is working fine (async)', () => {
    // make sure to return the assertion
    // ref: https://jestjs.io/docs/asynchronous
    return expect(plateToMarkdownAsync(sample_input)).resolves.toEqual(EXPECTED)
  })
})
