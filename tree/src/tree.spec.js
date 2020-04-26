const { Tree, blocks } = require('./tree');
const path = require('path');

jest.mock('fs');

jest.mock('colors');

describe('Tree', () => {
  let tree;
  beforeEach(() => {
    tree = new Tree();
  });

  describe('draw()', () => {
    const MOCK_FILES = [
      path.join('somepath', 'package.json'),
      path.join('somepath', 'readme.md'),
      path.join('somepath', 'src'),
      path.join('somepath', 'src', 'index.js'),
      path.join('somepath', 'src', 'someModule'),
      path.join('somepath', 'src', 'someModule', 'index.js'),
    ];
  
    beforeEach(() => {
      require('fs').__setMockFiles(MOCK_FILES);
    });

    it('shoud draw directory with depth=1', () => {
      const result = tree.draw('somepath', 1);
      expect(result).toBe('\nsomepath\n├── package.json\n├── readme.md\n└── src...\n');
    })

    it('shoud draw directory with depth=2', () => {
      const result = tree.draw('somepath', 2);
      expect(result).toBe('\nsomepath\n├── package.json\n├── readme.md\n└── src\n    ├── index.js\n    └── someModule...\n');
    })

    it('shoud draw directory with depth=null', () => {
      const result = tree.draw('somepath', null);
      expect(result).toBe('\nsomepath\n├── package.json\n├── readme.md\n└── src\n    ├── index.js\n    └── someModule\n        └── index.js\n');
    })
  })

  describe('nextBlock()', () => {
    it('should return root after root', () => {
      expect(tree.nextBlock(blocks.root)).toBe(blocks.root);
    });
    it('should return void after last', () => {
      expect(tree.nextBlock(blocks.last)).toBe(blocks.void);
    });
    it('should return bo by default', () => {
      expect(tree.nextBlock(expect.any(String))).toBe(blocks.bo);
    });
  });

  describe('newRow()', () => {
    it('should update current row', () => {
      tree.newRow(['a', 'b', 'c']);
      expect(tree.currentRow).toBe('abc');
    });

    it('should update current depth', () => {
      tree.newRow(['a', 'b', 'c', 'd']);
      expect(tree.depth).toEqual(4);
    });
  });

  describe('updateRow', () => {
    it('should add block to current row', () => {
      tree.newRow(['a', 'b']);
      tree.updateRow('c');
      expect(tree.currentRow).toBe('abc');
    });
  });

  describe('updateRowWithColor', () => {
    it('should add colored block to current row (same string for test)', () => {
      tree.newRow(['a', 'b']);
      tree.updateRowWithColor('c');
      expect(tree.currentRow).toMatch('abc');
    });
  });

  describe('updateRowWithNextColor', () => {
    it('should add colored block to current row (same string for test)', () => {
      tree.newRow(['a', 'b']);
      tree.updateRowWithNextColor('c');
      expect(tree.currentRow).toMatch('abc');
    });
  });

  describe('colorize()', () => {
    it('should return same string', () => {
      expect(tree.colorize('some string', 0)).toBe('some string');
    });
  });

  describe('commitRow()', () => {
    it('should add current row to tree', () => {
      tree.newRow(['a', 'b']);
      tree.commitRow();
      expect(tree.tree).toEqual('\nab\n');
    });
  });
});
