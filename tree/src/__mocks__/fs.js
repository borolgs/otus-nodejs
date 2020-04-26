const path = require('path');

const fs = jest.genMockFromModule('fs');

let mockDirs = {};
let mockFiles = [];
function __setMockFiles(newMockDirs) {
  mockDirs = {};
  mockFiles = [];

  for (filepath of newMockDirs) {
    mockFiles.push(filepath);
    const { dir, base } = path.parse(filepath);
    if (mockDirs.hasOwnProperty(dir)) {
      mockDirs[dir].push(base);
    } else {
      mockDirs[dir] = [base];
    }
  }
}

fs.__setMockFiles = __setMockFiles;

fs.readdirSync = (directoryPath) => {
  const files = mockDirs[directoryPath] || [];
  return files;
}

fs.existsSync = (filepath) => {
  return mockFiles.includes(filepath) || filepath in mockDirs;
};

fs.statSync = (filepath) => {
  return {
    isFile: () => {
      const { ext } = path.parse(filepath);
      return !!ext;
    },
  };
};

module.exports = fs;
