import fs from 'fs';
import _ from 'lodash';

const genDiff = (pathOldJson, pathNewJson) => {
  const oldJson = fs.readFileSync(pathOldJson);
  const newJson = fs.readFileSync(pathNewJson);
  const oldJsonObj = JSON.parse(oldJson);
  const newJsonObj = JSON.parse(newJson);
  const oldJsonObjKeys = Object.keys(oldJsonObj);
  const newJsonObjKeys = Object.keys(newJsonObj);
  const unitedKeys = _.union(oldJsonObjKeys, newJsonObjKeys);

  const resultArr = unitedKeys.map((el) => {
    if (newJsonObj[el] === oldJsonObj[el]) {
      return `   ${el}: ${newJsonObj[el]}`;
    } else if (!newJsonObjKeys.includes(el)) {
      return `  - ${el}: ${oldJsonObj[el]}`;
    } else if (!oldJsonObjKeys.includes(el)) {
      return `  + ${el}: ${newJsonObj[el]}`;
    }
    return [`  + ${el}: ${newJsonObj[el]}`, `  - ${el}: ${oldJsonObj[el]}`];
  });

  const result = _.flattenDeep(resultArr);
  return `\n{\n ${result.join('\n')}\n}\n`;
};

export default genDiff;
