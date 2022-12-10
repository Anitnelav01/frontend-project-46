import yaml from 'js-yaml';

const parsers = {
  yml: yaml.load,
  yaml: yaml.load,
  json: JSON.parse,
};

const parse = (data, format) => parsers[format](data);

export default parse;
