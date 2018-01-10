import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const parser = {
  json: jsonFile => JSON.parse(jsonFile),
  yaml: yamlFile => yaml.safeLoad(yamlFile),
  ini: iniFile => ini.parse(iniFile),
};

const genDiff = (pathOldConfig, pathNewConfig) => {
  const oldFile = fs.readFileSync(pathOldConfig, 'utf-8');
  const newFile = fs.readFileSync(pathNewConfig, 'utf-8');
  const fileExt = pathOldConfig.split('.').pop();
  const parserFunc = parser[fileExt];
  const oldConfigObj = parserFunc(oldFile);
  const newConfigObj = parserFunc(newFile);
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
