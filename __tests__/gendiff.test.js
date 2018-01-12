import fs from 'fs';
import genDiff from '../src';

const pathOldJson = '__tests__/__fixtures__/before.json';
const pathNewJson = '__tests__/__fixtures__/after.json';

const pathOldYaml = '__tests__/__fixtures__/before.yaml';
const pathNewYaml = '__tests__/__fixtures__/after.yaml';

const pathOldIni = '__tests__/__fixtures__/before.ini';
const pathNewIni = '__tests__/__fixtures__/after.ini';

const pathToResult = '__tests__/__fixtures__/result.txt';
const result = fs.readFileSync(pathToResult, 'utf-8');

it('test json format', () => {
  expect(genDiff(pathOldJson, pathNewJson)).toBe(result);
});

it('test yaml format', () => {
  expect(genDiff(pathOldYaml, pathNewYaml)).toBe(result);
});

it('test ini format', () => {
  expect(genDiff(pathOldIni, pathNewIni)).toBe(result);
});
