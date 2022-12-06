import formatStylish from './stylish.js';
import formatJson from './json.js';
import formatPlain from './plain.js';

const format = (diff, formatName) => {
  const formatters = {
    plain: formatPlain,
    json: formatJson,
    stylish: formatStylish,
  };
  const formatter = formatters[formatName];
  return formatter(diff);
};

export default format;
