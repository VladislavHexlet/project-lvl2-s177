import fs from 'fs';

export default class {
  constructor(pathOldJson, pathNewJson) {
    this.pathOldJson = pathOldJson;
    this.pathNewJson = pathNewJson;
  }

  openFiles() {
    const oldJson = fs.readFileSync(this.pathOldJson);
    const newJson = fs.readFileSync(this.pathNewJson);
    const oldJsonObj = JSON.parse(oldJson);
    const newJsonObj = JSON.parse(newJson);
    return [oldJsonObj, newJsonObj];
  }
}
