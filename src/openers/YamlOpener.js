import yaml from 'js-yaml';
import fs from 'fs';

export default class {
  constructor(pathOldYaml, pathNewYaml) {
    this.pathOldYaml = pathOldYaml;
    this.pathNewYaml = pathNewYaml;
  }

  openFiles() {
    const oldYaml = fs.readFileSync(this.pathOldYaml);
    const newYaml = fs.readFileSync(this.pathNewYaml);
    const oldYamlObj = yaml.safeLoad(oldYaml);
    const newYamlObj = yaml.safeLoad(newYaml);
    return [oldYamlObj, newYamlObj];
  }
}
