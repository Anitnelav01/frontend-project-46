import yaml from 'js-yaml';

const parser = (data, format) => {
  const parsers = { yml: yaml.load, json: JSON.parse };
  return parsers[format](data);
};

export default parser;
