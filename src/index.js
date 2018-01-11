import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';

const parser = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

const genDiff = (pathOldConfig, pathNewConfig) => {
  const oldFile = fs.readFileSync(pathOldConfig, 'utf-8');
  const newFile = fs.readFileSync(pathNewConfig, 'utf-8');
  const fileExt = path.extname(pathOldConfig);
  const parse = parser[fileExt];
  const oldConfigObj = parse(oldFile);
  const newConfigObj = parse(newFile);
  const oldConfigObjKeys = Object.keys(oldConfigObj);
  const newConfigObjKeys = Object.keys(newConfigObj);
  const unitedKeys = _.union(oldConfigObjKeys, newConfigObjKeys);

  const resultArr = unitedKeys.map((el) => {
    if (newConfigObj[el] === oldConfigObj[el]) {
      return `   ${el}: ${newConfigObj[el]}`;
    } else if (!newConfigObjKeys.includes(el)) {
      return `  - ${el}: ${oldConfigObj[el]}`;
    } else if (!oldConfigObjKeys.includes(el)) {
      return `  + ${el}: ${newConfigObj[el]}`;
    }
    return [`  + ${el}: ${newConfigObj[el]}`, `  - ${el}: ${oldConfigObj[el]}`];
  });

  const result = _.flattenDeep(resultArr);
  return `\n{\n ${result.join('\n')}\n}\n`;
};

export default genDiff;
