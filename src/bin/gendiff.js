#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

const firstArg = process.argv[2];
const secondArg = process.argv[3];

console.log(genDiff(firstArg, secondArg));
