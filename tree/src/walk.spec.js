const { checkDirectory, isFile, walk } = require('./walk');
const path = require('path');

jest.mock('fs');

describe('walk', () => {
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

  describe('checkDirectory()', () => {
    it('should throw error if directory does not exists', () => {
      expect(() => checkDirectory('it_is_not_directory')).toThrow();
    })
  })
  

  describe('isFile()', () => {
    it('should return true if path is not directory', () => {
      const filepath = path.join('somepath', 'package.json');
      const result = isFile(filepath);
      expect(result).toBe(true);
    });

    it('should return false if path is directory', () => {
      const dirpath = path.join('somepath', 'src')
      const result = isFile(dirpath);
      expect(result).toBe(false);
    });
  })
  
  describe('walk()', () => {
    it('should call callback 7 times for depthLimit=null', () => {
      const callback = jest.fn();
      walk('somepath', null, callback);
      expect(callback).toHaveBeenCalledTimes(7);
    });
  
    it('should call callback 3 times for depthLimit=1', () => {
      const callback = jest.fn();
      walk('somepath', 1, callback);
      expect(callback).toHaveBeenCalledTimes(4);
    });
  
    it('should call callback 6 times for depthLimit=2', () => {
      const callback = jest.fn();
      walk('somepath', 2, callback);
      expect(callback).toHaveBeenCalledTimes(6);
    });
  
    it('should pass filpath and props to callback', () => {
      const callback = jest.fn();
      walk('somepath', 2, callback);
      callback.mock.calls.forEach((args) => {
        expect(args).toEqual([
          expect.any(String),
          expect.objectContaining({
            isLast: expect.any(Boolean),
            isFile: expect.any(Boolean),
            depth: expect.anything(),
            reachLimit: expect.any(Boolean),
            hasChildren: expect.any(Boolean),
          })
        ]);
      });
    });

    it('should pass specific props to callback for file', () => {
      const callback = jest.fn();
      walk('somepath', 1, callback);
      const callbackArguments = callback.mock.calls[1]; // somepath/package.json
      expect(callbackArguments[1]).toMatchObject({
          isFile: true,
          hasChildren: false
        });
    });

    it('should pass specific props to callback for dir', () => {
      const callback = jest.fn();
      walk('somepath', 1, callback);
      const callbackArguments = callback.mock.calls[0]; // somepath/
      expect(callbackArguments[1]).toMatchObject({
          isFile: false,
          hasChildren: true
        });
    });

    it('should pass props with isLast=true to callback for last item in directory', () => {
      const callback = jest.fn();
      walk('somepath', 1, callback);
      const callbackArguments = callback.mock.calls[3]; // somepath/src/
      expect(callbackArguments[1]).toMatchObject({ isLast: true });
    });

    it('should pass props with depth to each callback', () => {
      const callback = jest.fn();
      walk('somepath', 2, callback);
      const rootCallbackArguments = callback.mock.calls[0]; // somepath/
      expect(rootCallbackArguments[1]).toMatchObject({ depth: 0 });

      const subCallbackArguments = callback.mock.calls[3]; // somepath/src/
      expect(subCallbackArguments[1]).toMatchObject({ depth: 1 });

      const subSubCallbackArguments = callback.mock.calls[4]; // somepath/src/index.js
      expect(subSubCallbackArguments[1]).toMatchObject({ depth: 2 });
    });

    it('should pass props with reachLimit=true to callback if directory depth == depthLimit', () => {
      const callback = jest.fn();
      walk('somepath', 1, callback);
      const callbackArguments = callback.mock.calls[3]; // somepath/src/
      expect(callbackArguments[1]).toMatchObject({ reachLimit: true });
    });

    it('should pass props with parentData={...} to callback from parent directory', () => {
      const callback = jest.fn((filepath, props) => {
        return {hello: `hello from ${filepath}`};
      });
      walk('somepath', 1, callback);
      const callbackArguments = callback.mock.calls[1]; // somepath/package.json
      expect(callbackArguments[1]).toMatchObject({
        parentData: expect.objectContaining({hello: 'hello from somepath'})
      });
    });
  })
});
