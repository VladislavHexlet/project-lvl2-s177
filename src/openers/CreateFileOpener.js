import YamlOpener from './YamlOpener';
import JsonOpener from './JsonOpener';
import IniOpener from './IniOpener';

export default (firstConfig, secondConfig) => {
  if (firstConfig.match('json')) {
    return new JsonOpener(firstConfig, secondConfig);
  }
  if (firstConfig.match('yaml')) {
    return new YamlOpener(firstConfig, secondConfig);
  }
  return new IniOpener(firstConfig, secondConfig);
};
