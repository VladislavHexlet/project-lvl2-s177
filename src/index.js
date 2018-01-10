import _ from 'lodash';
import CreateFileOpener from './openers/CreateFileOpener';

const genDiff = (pathOldConfig, pathNewConfig) => {
  const fileOpener = CreateFileOpener(pathOldConfig, pathNewConfig);
  const [oldConfigObj, newConfigObj] = fileOpener.openFiles();
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
