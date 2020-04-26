#!/usr/bin/env node
const path = require('path');
const yargs = require('yargs');
const { Tree } = require('./tree');

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
    const { depth } = argv;
    const tree = new Tree();
    console.log(tree.draw(dir, depth))
  } catch (error) {
    console.log(error);
  }
};

run();
