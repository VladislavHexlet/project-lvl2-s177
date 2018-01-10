import fs from 'fs';
import ini from 'ini';

export default class {
  constructor(pathOldIni, pathNewIni) {
    this.pathOldIni = pathOldIni;
    this.pathNewIni = pathNewIni;
  }

  openFiles() {
    const oldIni = fs.readFileSync(this.pathOldIni, 'utf-8');
    const newIni = fs.readFileSync(this.pathNewIni, 'utf-8');
    const oldIniObj = ini.parse(oldIni);
    const newIniObj = ini.parse(newIni);
    return [oldIniObj, newIniObj];
  }
}
