# slate-mark

Slate to Markdown parser. 

Compatible with [plate-editor](https://github.com/udecode/plate/) out of the box. 

## Usage

```javascript
// if using with typescript, import type from '@udecode/plate-core' or `@udecode/plate`
// please make sure your input has similar strucutre to TNode
import type { TNode } from '@udecode/plate-core'
// or 
// import type { TNode } from '@udecode/plate'

import { plateToMarkdown, plateToMarkdownAsync } from 'slate-mark'

// input type is `TNode` (https://plate-api.udecode.io/modules.html#tnode)
const myInput: TNode = [
    {
    type: 'p',
    children: [
      {
        text: 'Hello `universe !!!`',
      },
    ],
  },
  ...
]

// sync version
// output will be a markdown string
const output = plateToMarkdown(myInput)

// async/promise version
plateToMarkdownAsync(myInput)
    .then(result => {
        // result will be a markdown string
    })
```

*Please make sure you have either `@udecode/plate-core` or `@udecode/plate` as your dependency if you are using it with typescript. The input type for the parser utility functions is [TNode](https://plate-api.udecode.io/modules.html#tnode)*