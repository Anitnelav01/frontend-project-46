import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const format = (diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return formatPlain(diff);
    case 'stylish':
      return formatStylish(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
};

export default format;
