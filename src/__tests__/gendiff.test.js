import genDiff from '..';


const pathOldJson = 'before.json';
const pathNewJson = 'after.json';

it('should work', () => {
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
