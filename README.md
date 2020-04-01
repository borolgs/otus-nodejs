# Show as tree
Displays an object as a tree.

```json
{
  "name": 1,
  "items": [
    { "name": 2, "items": [{ "name": 3 }, { "name": 4 }] },
    { "name": 5, "items": [{ "name": 6 }] }
  ]
}
```

->

```
1
├── 2
│   ├── 3
│   └── 4
└── 5
    └── 6
```

## Usage
`git clone https://github.com/borolgs/otus-nodejs.git`  
`npm start example`  
`npm start path/to/json/file`  
