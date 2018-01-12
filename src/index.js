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


const compare = (oldConfigObj, newConfigObj, repeatN = 1) => {
  const oldConfigObjKeys = Object.keys(oldConfigObj);
  const newConfigObjKeys = Object.keys(newConfigObj);
  const unitedKeys = _.union(oldConfigObjKeys, newConfigObjKeys);
  const indentLength = '  '.repeat(repeatN);
  const resultArr = unitedKeys.map((el) => {
    // console.log(newConfigObj[el]);
    const newEl = newConfigObj[el];
    const oldEl = oldConfigObj[el];
    if (newEl === oldEl) {
      if (newEl instanceof Object) {
        return `${indentLength}  ${el}: ${JSON.stringify(newEl, null, '...')}\n`;
      }
      return `${indentLength}  ${el}: ${newEl}\n`;
    } else if (!newConfigObjKeys.includes(el)) {
      if (oldEl instanceof Object) {
        return `${indentLength}- ${el}: ${JSON.stringify(oldEl, null, '...')}\n`;
      }
      return `${indentLength}- ${el}: ${oldEl}\n`;
    } else if (!oldConfigObjKeys.includes(el)) {
      if (newEl instanceof Object) {
        return `${indentLength}+ ${el}: ${JSON.stringify(newEl, null, '...')}\n`;
      }
      return `${indentLength}+ ${el}: ${newEl}\n`;
    }
    if (newEl instanceof Object) {
      return `${indentLength}  ${el}: {\n ${compare(oldEl, newEl, repeatN + 2)}  ${indentLength}}\n`;
    }
    return [`${indentLength}+ ${el}: ${newEl}`, `\n${indentLength}- ${el}: ${oldEl}\n`];
  });
  return resultArr;
};

const genDiff = (pathOldConfig, pathNewConfig) => {
  const oldFile = fs.readFileSync(pathOldConfig, 'utf-8');
  const newFile = fs.readFileSync(pathNewConfig, 'utf-8');
  const fileExt = path.extname(pathOldConfig);
  const parse = parser[fileExt];
  const oldConfigObj = parse(oldFile);
  const newConfigObj = parse(newFile);
  const diff = compare(oldConfigObj, newConfigObj);

  const result = _.flattenDeep(diff);
  return `\n{\n ${diff.join('')}\n}\n`;
};

export default genDiff;
