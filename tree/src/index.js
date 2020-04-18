#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const draw = require('./drawTree');
const yargs = require('yargs');

const checkDirectoryPath = (dirpath) => {
  if (!fs.existsSync(dirpath)) {
    throw new Error(`Directory "${dirpath}" does not exists!`);
  }
};

const run = async () => {
  try {
    const { argv } = yargs
      .usage('Usage: $0 [path/to/directory] [options]')
      .alias('d', 'depth')
      .alias('h', 'help')
      .number('d')
      .default('d', null)
      .describe('d', 'Show depth')
      .demand(1, 'Specifiy directory path!')
      .example('tree .', 'Show current directory')
      .example('tree path/to/directory -d=2', 'Show specified directory with limit the depth');

    const dir = path.resolve(argv._[0]);
    console.log('dir', dir);
    checkDirectoryPath(dir);
    const { depth } = argv;

    console.log(draw(dir, depth));
  } catch (error) {
    console.log(error);
  }
};

run();
