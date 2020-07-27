import colors from 'colors';
import path from 'path';
import { walk } from './walk';

export const blocks = {
  root: '',
  last: '└── ',
  middle: '├── ',
  bo: '│   ',
  void: '    ',
};

const dirColors = ['green', 'yellow', 'cyan', 'magenta'];

export class Tree {
  tree: string;
  depth: number;
  currentRow: any;
  constructor() {
    this.tree = '\n';
    this.depth = 0;
    this.currentRow = null;
  }

  draw(dir: string, depth: number): string {
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

  nextBlock(block: string): string {
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

  newRow(row: string[] = []) {
    this.currentRow = row.join('');
    this.depth = row.length;
  }

  updateRow(block: string) {
    this.currentRow += block;
  }

  updateRowWithColor(block: string) {
    this.currentRow += this.colorize(block, this.depth);
  }

  updateRowWithNextColor(block: string) {
    this.currentRow += this.colorize(block, this.depth + 1);
  }

  colorize(str: string, depth: number): string {
    return colors[dirColors[depth % dirColors.length]](str);
  }

  commitRow() {
    this.tree += this.currentRow + '\n';
    this.currentRow = null;
  }
}
