import genDiff from '../src';


const pathOldJson = '__tests__/__fixtures__/before.json';
const pathNewJson = '__tests__/__fixtures__/after.json';

const pathOldYaml = '__tests__/__fixtures__/before.yaml';
const pathNewYaml = '__tests__/__fixtures__/after.yaml';

it('test json', () => {
  expect(genDiff(pathOldJson, pathNewJson)).toBe(`
{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}
`);
});

it('test yaml', () => {
  expect(genDiff(pathOldYaml, pathNewYaml)).toBe(`
{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}
`);
});