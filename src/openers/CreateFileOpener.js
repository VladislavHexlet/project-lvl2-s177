import YamlOpener from './YamlOpener';
import JsonOpener from './JsonOpener';

export default (firstConfig, secondConfig) => {
  const C = firstConfig.match('json') ? JsonOpener : YamlOpener;
  return new C(firstConfig, secondConfig);
};
