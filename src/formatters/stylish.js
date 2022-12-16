import _ from 'lodash';

const makeIndent = (depth) => {
  const str = ' ';
  return str.repeat(depth * 4 - 2);
};

const prepareValue = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const getKeys = keys.map((key) => `${makeIndent(depth + 1)}  ${key}: ${prepareValue(value[key], depth + 1)}`);
  return `{\n${getKeys.join('\n')}\n  ${makeIndent(depth)}}`;
};

const formatStylish = (diff) => {
  const iter = (tree, depth) => tree.map((node) => {
    const getValue = (value, sign) => `${makeIndent(depth)}${sign} ${node.key}: ${prepareValue(value, depth)}\n`;
    switch (node.type) {
      case 'added':
        return getValue(node.value, '+');
      case 'deleted':
        return getValue(node.value, '-');
      case 'updated':
        return `${getValue(node.value1, '-')}${getValue(node.value2, '+')}`;
      case 'complex':
        return `${makeIndent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${makeIndent(depth)}  }\n`;
      default:
        return getValue(node.value, ' ');
    }
  });
  return `{\n${iter(diff, 1).join('')}}`;
};

export default formatStylish;
