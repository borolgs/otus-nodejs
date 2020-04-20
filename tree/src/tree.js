const colors = require('colors');
const path = require('path');
const { walk } = require('./walk');

const blocks = {
  root: '',
  last: '└── ',
  middle: '├── ',
  bo: '│   ',
  void: '    ',
};

dir_colors = ['green', 'yellow', 'cyan', 'magenta'];

class Tree {
  constructor() {
    this.tree = '\n';
    this.depth = 0;
    this.currentRow = null;
  }

  draw(dir, depth) {
    walk(dir, depth, (filepath, props) => {
      const { name, ext } = path.parse(filepath);
      const { depth, isFile, isLast, reachLimit, parentData, hasChildren } = props;
  
      const { row } = parentData || { row: [] };
      this.newRow(row);
  
      const block = depth ? (isLast ? blocks.last : blocks.middle) : blocks.root;
      this.updateRowWithColor(block);
  
      if (isFile) {
        this.updateRow(name + ext);
        this.commitRow();
        return;
      }
  
      this.updateRowWithNextColor(name);
  
      if (reachLimit) {
        if (hasChildren) {
          this.updateRowWithNextColor('...');
        }
        this.commitRow();
        return;
      }
  
      this.commitRow();
  
      const nextRowBlock = this.nextBlock(block);
      return { row: [...row, nextRowBlock] };
    });
    
    return this.tree;
  }
  
  nextBlock(block) {
    let nextBlock;
    switch (block) {
      case blocks.root:
        nextBlock = blocks.root;
        break;
      case blocks.last:
        nextBlock = blocks.void;
        break;
      default:
        nextBlock = blocks.bo;
        break;
    }
    return this.colorize(nextBlock, this.depth);
  }

  newRow(row = []) {
    this.currentRow = row.join('');
    this.depth = row.length;
  }

  updateRow(block) {
    this.currentRow += block;
  }

  updateRowWithColor(block) {
    this.currentRow += this.colorize(block, this.depth);
  }

  updateRowWithNextColor(block) {
    this.currentRow += this.colorize(block, this.depth + 1);
  }

  colorize(str, depth) {
    return colors[dir_colors[depth % dir_colors.length]](str);
  }

  commitRow() {
    this.tree += this.currentRow + '\n';
    this.currentRow = null;
  }
}

module.exports = {
  blocks,
  Tree,
};
