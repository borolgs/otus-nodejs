const assert = require('assert');

const blocks = {
  root: '',
  last: '└── ',
  middle: '├── ',
  bo: '│   ',
  void: '    ',
};

const getNextBlock = block => {
  switch (block) {
    case blocks.root:
      return blocks.root;
    case blocks.last:
      return blocks.void;
    default:
      return blocks.bo;
  }
};

const drawTree = node => {
  assert(node.hasOwnProperty('items'), 'Node must have items!');
  assert(Array.isArray(node.items), 'Node.items have to be an array!');

  let tree = '';

  (function walk(node, block = blocks.root, row = []) {
    assert(node.hasOwnProperty('name'), 'Node must have name');

    const { name, items = [] } = node;

    tree += `${row.join('')}${block}${name}\n`;

    const nextRowBlock = getNextBlock(block);
    items.forEach((child, i) => {
      const childBlock = i === items.length - 1 ? blocks.last : blocks.middle;
      walk(child, childBlock, [...row, nextRowBlock]);
    });
  })(node);

  return tree;
};

module.exports = drawTree;
