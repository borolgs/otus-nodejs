const fs = require('fs');
const path = require('path');
const colors = require('colors');

const blocks = {
  root: '',
  last: '└── ',
  middle: '├── ',
  bo: '│   ',
  void: '    '
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

dir_colors = ['green', 'yellow', 'cyan', 'magenta'];

const colorize = (str, depth) =>
  colors[dir_colors[depth % dir_colors.length]](str);

const isFile = filepath => {
  if (!fs.existsSync(filepath)) {
    return true;
  }
  return fs.statSync(filepath).isFile();
};

const drawTree = (dirpath, depthLimit = 3) => {
  let tree = '\n';
  const updateTree = row => (tree += row + '\n');

  (function walk(filepath, block = blocks.root, row = []) {
    const depth = row.length;
    const { name, ext } = path.parse(filepath);

    let treeRow = row.join('') + colorize(block, depth);

    if (isFile(filepath)) {
      updateTree(treeRow + name + ext);
      return;
    }

    treeRow += colorize(name, depth + 1);

    const childrenNames = fs.readdirSync(filepath);

    const tooDeep = depthLimit != null && depth >= depthLimit;
    if (tooDeep) {
      if (childrenNames.length > 0) {
        treeRow += ' ...'.gray;
      }
      updateTree(treeRow);
      return;
    }

    updateTree(treeRow);

    const nextRowBlock = colorize(getNextBlock(block), depth);
    childrenNames.forEach((name, i) => {
      const isLast = i === childrenNames.length - 1;
      const childBlock = isLast ? blocks.last : blocks.middle;
      const childPath = path.join(filepath, name);
      walk(childPath, childBlock, [...row, nextRowBlock]);
    });
  })(dirpath);

  return tree;
};

module.exports = drawTree;
